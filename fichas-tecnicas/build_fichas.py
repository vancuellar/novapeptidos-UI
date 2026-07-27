# -*- coding: utf-8 -*-
"""
Genera las fichas técnicas de Exygen Labs en PDF, una por compuesto.

Reglas de contenido (RUO, no negociables — son las mismas de las monografías):
  - Nada de dosis, pautas de administración ni volúmenes de reconstitución.
  - Nada de farmacocinética humana, indicaciones, beneficios ni contraindicaciones.
  - Ningún sello ni referencia a FDA, COFEPRIS u otra agencia.
  - Ningún dato analítico que no venga de un informe real del lote. Si falta,
    la ficha lo dice: "Pendiente". Nunca se rellena con un número inventado.

Uso:
    python3 build_fichas.py                 # todas las que haya en datos_identidad.json
    python3 build_fichas.py ghk-cu          # solo una
"""
import json, os, re, subprocess, sys, base64

BASE = os.path.dirname(os.path.abspath(__file__))
# La carpeta vive DENTRO del repo del sitio: el padre ya es la raiz de la UI.
UI = os.path.dirname(BASE)
SALIDA = os.path.join(BASE, "pdf")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

MARFIL = "#f6f3ec"
TINTA = "#132763"   # azul Exygen (hsl 225 68% 23%)
GRIS = "#5b6472"


def b64(ruta):
    with open(ruta, "rb") as f:
        return base64.b64encode(f.read()).decode()


def monografia(slug):
    """Saca tagline y secciones de productMonographs.js sin ejecutar JS."""
    src = open(os.path.join(UI, "src/data/productMonographs.js"), encoding="utf-8").read()
    m = re.search(r"^  '?" + re.escape(slug) + r"'?: \{$", src, re.M)
    if not m:
        raise KeyError(f"no hay monografia para {slug}")
    fin = src.index("\n  },", m.end())
    bloque = src[m.end():fin]
    tag = re.search(r"tagline: '([^']*)'", bloque)
    secciones = []
    for tm in re.finditer(r"title: '([^']*)',\s*paragraphs: \[(.*?)\],?\s*\}", bloque, re.S):
        titulo = tm.group(1)
        parrafos = re.findall(r"'((?:[^'\\]|\\.)*)'", tm.group(2))
        secciones.append((titulo, [p.replace("\\'", "'") for p in parrafos]))
    return (tag.group(1) if tag else ""), secciones


def catalogo(slug):
    """Presentaciones y almacenamiento desde fallbackCatalog.js."""
    src = open(os.path.join(UI, "src/data/fallbackCatalog.js"), encoding="utf-8").read()
    i = src.index("fallbackProducts")
    i = src.index("[", i)
    prof = 0
    for j in range(i, len(src)):
        if src[j] == "[":
            prof += 1
        elif src[j] == "]":
            prof -= 1
            if prof == 0:
                fin = j + 1
                break
    for p in json.loads(src[i:fin]):
        if p.get("slug") == slug:
            return p
    return {}


def qf(formula):
    """Formatea una formula molecular con subindices y superindice de carga."""
    if not formula:
        return formula
    out = re.sub(r"(?<=[A-Za-z])(\d+)", r"<sub>\1</sub>", formula)
    out = re.sub(r"([+-])(?=\s|$|\))", r"<sup>\1</sup>", out)
    return out


def fila(k, v):
    """Si el dato no esta verificado la fila NO se imprime. Una ficha que sale a
    un cliente nunca dice "pendiente": o el dato esta, o no aparece."""
    if not v or not str(v).strip():
        return ""
    return f'<tr><th>{k}</th><td>{v}</td></tr>' 


def render(slug, ident):
    tagline, secciones = monografia(slug)
    cat = catalogo(slug)
    logo = b64(os.path.join(UI, "public/images/exygen-logo.png"))

    presentaciones = "".join(
        f"<li><b>{v['presentation']}</b> · SKU {v.get('sku', '—')}</li>"
        for v in cat.get("variants", [])
    ) or "<li>—</li>"

    ids = [
        fila("Nombre del producto", ident["nombre"]),
        fila("Nombre químico", ident["nombre_quimico"]),
        fila("Sinónimos", "; ".join(ident.get("sinonimos") or [])),
        fila("Número CAS", ident.get("cas_complejo")),
    ]
    if ident.get("cas_peptido_libre"):
        ids.append(fila(ident.get("etiqueta_cas_libre") or "CAS del péptido libre",
                        ident["cas_peptido_libre"]))
    ids += [
        fila("Fórmula molecular", qf(ident.get("formula"))),
        fila("Peso molecular", ident.get("peso_molecular")),
    ]
    if ident.get("formula_peptido_libre"):
        ids.append(fila(ident.get("etiqueta_forma_libre") or "Fórmula del péptido libre",
                        f'{qf(ident["formula_peptido_libre"])} · {ident.get("peso_peptido_libre") or ""}'))
    if ident.get("secuencia"):
        etq = f'Secuencia ({ident["residuos"]} residuos)' if ident.get("residuos") else "Secuencia"
        ids.append(fila(etq, f'<span class="seq">{ident["secuencia"]}</span>'))
    ids += [
        fila("Clase", ident.get("categoria")),
        fila("Apariencia esperada", ident.get("apariencia")),
        fila("Solubilidad", ident.get("solubilidad")),
    ]

    nota = ""
    if ident.get("nota_nomenclatura"):
        nota = f'<div class="aviso"><b>Nota de nomenclatura.</b> {ident["nota_nomenclatura"]}</div>'

    # la leyenda RUO ya va en su propio recuadro al pie: no se repite en el cuerpo
    ruo = "producto exclusivo para investigaci"

    cuerpo = ""
    for titulo, parrafos in secciones:
        if titulo.lower().startswith("manejo"):
            continue
        utiles = [p for p in parrafos if not p.lower().startswith(ruo)]
        if not utiles:
            continue
        cuerpo += f'<h2>{titulo}</h2>' + "".join(f"<p>{p}</p>" for p in utiles)

    manejo = ""
    for titulo, parrafos in secciones:
        if titulo.lower().startswith("manejo"):
            manejo = "".join(f"<p>{p}</p>" for p in parrafos
                             if not p.lower().startswith("producto exclusivo para investigaci"))

    fuentes = "".join(
        f"<li><b>{k.replace('_', ' ')}:</b> {v}</li>"
        for k, v in (ident.get("fuentes") or {}).items()
    )

    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
@page {{ size: Letter; margin: 14mm 15mm 14mm 15mm; }}
* {{ box-sizing: border-box; }}
body {{ font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
       color: #1a1f2b; font-size: 9.3pt; line-height: 1.45; margin: 0; }}
header {{ display: flex; align-items: flex-end; justify-content: space-between;
         border-bottom: 2.5px solid {TINTA}; padding-bottom: 7px; margin-bottom: 14px; }}
header img {{ height: 34px; }}
.doc {{ text-align: right; font-size: 7.4pt; color: {GRIS}; letter-spacing: .10em;
       text-transform: uppercase; line-height: 1.7; }}
h1 {{ font-size: 20pt; color: {TINTA}; margin: 0 0 2px; letter-spacing: -.015em; }}
.tag {{ color: {GRIS}; font-size: 10pt; margin: 0 0 14px; }}
h2 {{ font-size: 8.2pt; text-transform: uppercase; letter-spacing: .13em; color: {TINTA};
      border-bottom: 1px solid #d9dbe2; padding-bottom: 3px; margin: 13px 0 7px;
      page-break-after: avoid; }}
p {{ margin: 0 0 6px; text-align: justify; }}
table {{ width: 100%; border-collapse: collapse; }}
th, td {{ text-align: left; vertical-align: top; padding: 3.4px 8px;
         border-bottom: 1px solid #e6e8ee; }}
th {{ width: 33%; font-weight: 600; color: {TINTA}; background: {MARFIL}; }}
sub, sup {{ font-size: 66%; line-height: 0; }}
.seq {{ font-family: "SF Mono", Menlo, monospace; font-size: 7.4pt; word-break: break-all; }}
.pend {{ color: #9aa1ad; font-style: italic; }}
ul {{ margin: 0 0 7px; padding-left: 17px; }}
li {{ margin-bottom: 2.5px; }}
.aviso {{ background: {MARFIL}; border-left: 3px solid {TINTA};
         padding: 8px 11px; margin: 9px 0; font-size: 8.6pt; }}
.qc td {{ font-size: 8.6pt; }}
.ruo {{ margin-top: 13px; border: 1.5px solid {TINTA}; padding: 9px 11px;
        font-size: 8pt; line-height: 1.5; page-break-inside: avoid; }}
.ruo b {{ color: {TINTA}; }}
footer {{ display: flex; margin-top: 14px;
         border-top: 1px solid #d9dbe2; padding-top: 5px;
         font-size: 7pt; color: {GRIS}; justify-content: space-between;
         page-break-inside: avoid; }}
.fuentes {{ font-size: 7.6pt; color: {GRIS}; }}
.fuentes li {{ margin-bottom: 1px; }}
</style></head><body>

<header>
  <img src="data:image/png;base64,{logo}" alt="Exygen Labs">
  <div class="doc">Ficha técnica<br>{slug.upper()}<br>Rev. 01</div>
</header>

<h1>{ident['nombre']}</h1>
<p class="tag">{tagline}</p>

<h2>1 · Identidad química</h2>
<table>{''.join(ids)}</table>
{nota}

<h2>2 · Presentaciones</h2>
<ul>{presentaciones}</ul>

{cuerpo}

<h2>Conservación y manejo en laboratorio</h2>
{manejo}
<p><b>Conservación:</b> {cat.get('storage', '—')}</p>

<h2>Certificado de análisis del lote</h2>
<p>Cada lote se acompaña de su propio certificado de análisis, con la pureza
cromatográfica por HPLC, la confirmación de identidad por espectrometría de masas y
el número de lote correspondiente. <b>El certificado se entrega junto con la compra</b>,
referido al lote exacto que se envía.</p>
<p>Esta ficha describe la identidad del compuesto y su manejo; los valores analíticos
viven en el certificado del lote, que es el único documento que puede acreditarlos.</p>

<h2>Fuentes de los datos de identidad</h2>
<ul class="fuentes">{fuentes}</ul>

<div class="ruo">
  <b>Producto exclusivo para uso en investigación (RUO).</b>
  No es un medicamento ni un producto sanitario. No está destinado a uso en seres humanos
  ni en animales, ni a aplicaciones diagnósticas, terapéuticas, alimentarias o cosméticas.
  Esta ficha describe la identidad del compuesto, lo que se investiga con él y cómo se
  maneja en el laboratorio; no contiene indicaciones, dosis, pautas de administración ni
  afirmaciones de eficacia. No emite afirmación alguna de aprobación, registro, licencia
  ni autorización sanitaria en ninguna jurisdicción.
</div>

<footer>
  <span>Exygen Labs · exygenlabs.com</span>
  <span>Ficha técnica {ident['nombre']} · Rev. 01 · Uso exclusivo en investigación</span>
</footer>
</body></html>"""


def main():
    datos = json.load(open(os.path.join(BASE, "datos_identidad.json"), encoding="utf-8"))
    slugs = sys.argv[1:] or [k for k in datos if not k.startswith("_")]
    os.makedirs(SALIDA, exist_ok=True)
    fallos = []
    for slug in slugs:
        try:
            html = render(slug, datos[slug])
        except KeyError as e:
            fallos.append((slug, str(e)))
            continue
        rh = os.path.join(SALIDA, f"ficha-{slug}.html")
        open(rh, "w", encoding="utf-8").write(html)
        pdf = os.path.join(SALIDA, f"FICHA-TECNICA-{slug.upper()}.pdf")
        subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                        f"--print-to-pdf={pdf}", f"file://{rh}"],
                       check=True, capture_output=True)
        print("→", os.path.basename(pdf))
    if fallos:
        print("\nSIN FICHA (falta monografía):")
        for slug, e in fallos:
            print(f"  {slug}: {e}")


main()
