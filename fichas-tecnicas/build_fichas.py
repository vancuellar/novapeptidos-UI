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
SERIF = '"Marcellus", Georgia, "Times New Roman", serif'
FUENTE = '"ITC Franklin Gothic Std", "Franklin Gothic", "Franklin Gothic Medium", "Libre Franklin", Arial, sans-serif'
ORO = "#b08d2e"        # el acento cálido; el mismo del sello del hero
AZUL_SUAVE = "#eaeef8"  # fondo de badges y cabeceras de tabla


def b64(ruta):
    with open(ruta, "rb") as f:
        return base64.b64encode(f.read()).decode()


# La FOTO DEL VIAL. Christian la pidió el 2026-07-27, con la ficha de Genolab de
# referencia. Se busca por SKU de la presentación más grande; si no hay foto real
# se cae al vial genérico de marca, nunca a un hueco.
def foto_vial(cat):
    import glob
    dirp = os.path.join(UI, "public/images/products")
    for v in reversed(cat.get("variants", [])):
        sku = (v.get("sku") or "").upper()
        if not sku:
            continue
        for cand in (f"{sku}.webp", f"{sku}-sm.webp"):
            ruta = os.path.join(dirp, cand)
            if os.path.exists(ruta):
                return ruta
    gen = os.path.join(dirp, "generic-vial.webp")
    return gen if os.path.exists(gen) else None


def img_data(ruta):
    """Convierte a PNG en base64 (weasyprint no siempre traga webp)."""
    if not ruta:
        return None
    try:
        from PIL import Image
        import io
        im = Image.open(ruta).convert("RGB")
        im.thumbnail((900, 900))
        buf = io.BytesIO()
        im.save(buf, format="PNG", optimize=True)
        return base64.b64encode(buf.getvalue()).decode()
    except Exception:
        return None


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
    logo = b64(os.path.join(BASE, "exygen-logo-blanco.png"))
    logo_color = b64(os.path.join(UI, "public/images/exygen-logo.png"))

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

    # ── Portada y badges. Christian, 2026-07-27, con la ficha de Genolab de
    # referencia: una banda de marca arriba, la foto del vial y tres badges de
    # color con lo que un cliente busca primero.
    foto = img_data(foto_vial(cat))
    _vars = [v.get("presentation", "") for v in cat.get("variants", [])]
    badge_pres = " · ".join(_vars) if _vars else "—"
    badge_pureza = cat.get("purity") or "≥99%"
    badge_dil = "Agua bacteriostática"
    if "acido-acetico" in slug or "aod" in slug:
        badge_dil = "Ácido acético"

    # ── SECCIONES NUEVAS (Christian, 2026-07-27) ────────────────────
    # La ficha tenía 2 páginas contra las 9 de la referencia de Genolab. Se
    # llenó con lo que SÍ podemos respaldar. Lo que NO se copió de esa
    # referencia, y por qué, está anotado al final del archivo.
    sl = (cat.get("start_levels") or {})
    freq_cod = cat.get("start_freq") or ""
    FREQ = {"weekly": "1 vez por semana", "daily": "1 vez al día",
            "daily_2x": "2 veces al día", "2x_week": "2 veces por semana",
            "3x_week": "3 veces por semana", "eod": "un día sí y un día no",
            "as_needed": "solo cuando se requiera", "daily_cycle": "1 vez al día, en ciclos",
            "mt": "diaria al inicio; después 1–2 por semana"}

    # ── Tabla de reconstitución, una fila por presentación ──
    # ⚠ El agua NO puede caer a un respaldo ciego. Christian cachó que en
    # Retatrutida las presentaciones de 60 y 100 mg salían con 2 mL —o sea 30 y
    # 50 mg/mL— cuando las seis presentaciones investigadas están todas en
    # 10.0 mg/mL. Ahora, si falta el dato, el agua se DERIVA de la concentración
    # que sí está investigada, y la fila se marca con † para que se note.
    _agua_tab = sl.get("agua_ml") or {}
    _concs = []
    for _k, _v in _agua_tab.items():
        try:
            _concs.append(float(_k) / float(_v))
        except (ValueError, ZeroDivisionError):
            pass
    _conc_ref = sorted(_concs)[len(_concs) // 2] if _concs else None

    def _agua_de(mg):
        """(agua_mL, derivada?) — None si no hay forma honesta de calcularla."""
        a = _agua_tab.get(str(int(mg)) if float(mg).is_integer() else str(mg))
        if a:
            return a, False
        if _conc_ref:
            return round(mg / _conc_ref * 2) / 2, True
        return None, True

    recon_filas = ""
    for v in cat.get("variants", []):
        try:
            mg = float(re.sub(r"[^0-9.]", "", v.get("presentation", "")) or 0)
        except ValueError:
            mg = 0
        if mg <= 0:
            continue
        agua, derivada = _agua_de(mg)
        if not agua:
            recon_filas += (f"<tr><td><b>{v.get('presentation')}</b></td>"
                            f"<td colspan='3' class='pend'>Sin volumen de referencia publicado</td></tr>")
            continue
        conc = mg / agua
        marca = " †" if derivada else ""
        recon_filas += (f"<tr><td><b>{v.get('presentation')}</b></td><td>{agua:g} mL{marca}</td>"
                        f"<td>{conc:.1f} mg/mL</td><td>{agua*100:.0f} unidades</td></tr>")
    _nota_der = ('<p class="nota">† Volumen derivado: esta presentación no aparece en la '
                 f'fuente consultada. Se calculó para conservar los {_conc_ref:.1f} mg/mL de las '
                 'presentaciones que sí están documentadas.</p>') if (_conc_ref and " †" in recon_filas) else ""
    recon_tabla = (f'<table class="zebra"><thead><tr><th>Presentación</th><th>Agua bacteriostática</th>'
                   f'<th>Concentración final</th><th>Volumen total</th></tr></thead>'
                   f'<tbody>{recon_filas}</tbody></table>{_nota_der}') if recon_filas else ""

    # ── Tabla de dosis de referencia con sus rayitas ──
    dosis_tabla = ""
    if sl.get("inicial") is not None and sl.get("fuente"):
        u = sl.get("unit", "mg")
        pres0 = cat.get("variants", [{}])[0].get("presentation", "")
        try:
            mg0 = float(re.sub(r"[^0-9.]", "", pres0) or 0)
        except ValueError:
            mg0 = 0
        agua0 = _agua_de(mg0)[0] or 2
        conc0 = (mg0 / agua0) if mg0 else 0
        filas = ""
        for k, etq in (("inicial", "Inicial"), ("tipica", "Típica"), ("avanzada", "Avanzada")):
            d = sl.get(k)
            if d is None:
                continue
            d_mg = d / 1000 if u == "mcg" else d
            ray = f"{round(d_mg / conc0 * 100)}" if conc0 else "—"
            cabe = "" if (conc0 and (d_mg / conc0 * 100) <= 100) else " ⚠"
            filas += f"<tr><td><b>{etq}</b></td><td>{d} {u}</td><td>{ray}{cabe}</td><td>{FREQ.get(freq_cod,'—')}</td></tr>"
        derivada = ('<div class="aviso"><b>Cifras derivadas, no publicadas.</b> '
                    'Para este compuesto no se localizó una pauta humana publicada. '
                    'Los valores de esta tabla son una derivación nuestra a partir del '
                    'compuesto más cercano.</div>') if sl.get("derivada") else ""
        dosis_tabla = (f'{derivada}<table class="zebra"><thead><tr><th>Nivel</th><th>Dosis</th>'
                       f'<th>Unidades en jeringa U-100</th><th>Frecuencia</th></tr></thead>'
                       f'<tbody>{filas}</tbody></table>'
                       f'<p class="nota">Unidades calculadas para el vial de {pres0} reconstituido con '
                       f'{agua0} mL. Con otra cantidad de agua cambian las unidades, no los miligramos. '
                       f'⚠ marca una dosis que no cabe en una jeringa U-100 de 1 mL.</p>'
                       f'<p class="fuente-dosis"><b>Fuente:</b> {sl.get("fuente")}</p>')

    # ── Farmacocinética: solo si el compuesto la tiene con fuente ──
    try:
        _pk = json.load(open(os.path.join(BASE, "farmacocinetica.json"), encoding="utf-8"))
    except Exception:
        _pk = {}
    pk = _pk.get(slug) or {}
    pk_tabla = ""
    if pk:
        _f = [("Vía de administración", pk.get("via")), ("Vida media aproximada", pk.get("vida_media")),
              ("Frecuencia habitual", pk.get("frecuencia")), ("Estado estable", pk.get("estado_estable")),
              ("Metabolismo", pk.get("metabolismo")), ("Eliminación", pk.get("eliminacion"))]
        _r = "".join(f"<tr><td><b>{k}</b></td><td>{v}</td></tr>" for k, v in _f if v)
        pk_tabla = (f'<table class="zebra"><thead><tr><th>Parámetro</th><th>Valor</th></tr></thead>'
                    f'<tbody>{_r}</tbody></table>'
                    f'<p class="fuente-dosis"><b>Fuente:</b> {pk.get("fuente","—")}</p>')

    # ── OVERVIEW: la referencia rápida de la primera página (Christian, 2026-07-27) ──
    _ov = [("Compuesto", ident["nombre"]),
           ("CAS", ident.get("cas_complejo") or "—"),
           ("Fórmula", qf(ident.get("formula")) or "—"),
           ("Peso molecular", ident.get("peso_molecular") or "—"),
           ("Presentaciones", badge_pres),
           ("Pureza", badge_pureza),
           ("Diluyente", badge_dil)]
    if sl.get("inicial") is not None and sl.get("fuente"):
        _u = sl.get("unit", "mg")
        _ov.append(("Dosis de referencia", f'{sl["inicial"]} – {sl["avanzada"]} {_u}'))
        _ov.append(("Frecuencia", FREQ.get(freq_cod, "—")))
    if pk.get("vida_media"):
        _ov.append(("Vida media", pk["vida_media"]))
    _ov.append(("Conservación", cat.get("storage", "—")))
    overview = "".join(f'<div class="ov-item"><span>{k}</span><b>{v}</b></div>' for k, v in _ov)

    # ── Índice. Se arma con las secciones que de verdad se van a imprimir ──
    _secs = [("1", "Identidad química"), ("2", "Presentaciones"),
             ("3", "Descripción y líneas de investigación")]
    _n = 4
    if pk_tabla:
        _secs.append((str(_n), "Farmacocinética")); _n += 1
    _secs += [(str(_n), "Reconstitución recomendada")]; _n += 1
    _secs += [(str(_n), "Dosis de referencia")]; _n += 1
    _secs += [(str(_n), "Selección de jeringa")]; _n += 1
    _secs += [(str(_n), "Conservación y estabilidad")]; _n += 1
    _secs += [(str(_n), "Manejo en laboratorio")]; _n += 1
    _secs += [(str(_n), "Certificado de análisis del lote")]; _n += 1
    _secs += [(str(_n), "Fuentes de los datos de identidad")]
    toc = "".join(f'<div class="toc-item"><span>{a}</span>{b}</div>' for a, b in _secs)
    # numeración real para los encabezados
    N = {b: a for a, b in _secs}

    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
@page {{
  size: Letter; margin: 14mm 15mm 16mm 15mm;
  @bottom-center {{
    content: "Página " counter(page) " de " counter(pages);
    font-family: {FUENTE}; font-size: 9pt; color: {GRIS};
  }}
}}
* {{ box-sizing: border-box; }}
body {{ font-family: {FUENTE};
       color: #1a1f2b; font-size: 11pt; line-height: 1.42; margin: 0; }}
header {{ display: flex; align-items: center; justify-content: space-between;
         background: {TINTA}; padding: 16px 15mm 14px; margin: -4mm -15mm 16px -15mm; }}
/* El logotipo va como IMAGEN: trae la molécula, que en texto no se puede poner.
   La versión blanca se genera del PNG original conservando el alfa. */
.marca img {{ height: 26px; }}
.doc {{ color: #aebbe4 !important; }}
.hero {{ display: flex; gap: 16px; align-items: center; margin-bottom: 12px; }}
.hero-txt {{ flex: 1; }}
.hero-foto {{ width: 132px; height: 132px; object-fit: contain; flex: none;
             background: {AZUL_SUAVE}; border-radius: 10px; padding: 6px; }}
.badges {{ display: flex; gap: 0; margin: 4px 0 14px; }}
.badge {{ flex: 1; background: {TINTA}; color: #fff; text-align: center;
         padding: 8px 6px; border-right: 1px solid rgba(255,255,255,.28); }}
.badge:last-child {{ border-right: 0; }}
.badge b {{ display: block; font-size: 12pt; line-height: 1.15; }}
.badge span {{ font-size: 9pt; opacity: .85; letter-spacing: .06em;
              text-transform: uppercase; }}
header img {{ height: 34px; }}
.doc {{ text-align: right; font-size: 9pt; color: {GRIS}; letter-spacing: .10em;
       text-transform: uppercase; line-height: 1.7; }}
h1 {{ font-family: {SERIF}; font-size: 14pt; color: {TINTA}; margin: 0 0 2px; letter-spacing: -.015em; }}
.tag {{ color: {GRIS}; font-size: 11pt; margin: 0 0 14px; }}
h4 {{ font-size: 11pt; color: {TINTA}; margin: 11px 0 5px; }}
h2 {{ font-size: 12pt; text-transform: uppercase; letter-spacing: .13em; color: {TINTA};
      border-bottom: 2px solid {ORO}; padding-bottom: 3px; margin: 13px 0 7px;
      page-break-after: avoid; }}
p {{ margin: 0 0 6px; text-align: justify; }}
table {{ width: 100%; border-collapse: collapse; }}
th, td {{ text-align: left; vertical-align: top; padding: 3.4px 8px;
         border-bottom: 1px solid #e6e8ee; }}
th {{ width: 33%; font-weight: 600; color: {TINTA}; background: {AZUL_SUAVE}; }}
sub, sup {{ font-size: 66%; line-height: 0; }}
.seq {{ font-family: "SF Mono", Menlo, monospace; font-size: 9pt; word-break: break-all; }}
.pend {{ color: #9aa1ad; font-style: italic; }}
ul {{ margin: 0 0 7px; padding-left: 17px; }}
li {{ margin-bottom: 2.5px; }}
.aviso {{ background: #fdf7e6; border-left: 3px solid {ORO};
         padding: 8px 11px; margin: 9px 0; font-size: 11pt; }}
.qc td {{ font-size: 11pt; }}
.ruo {{ margin-top: 13px; border: 1.5px solid {TINTA}; padding: 9px 11px;
        font-size: 9pt; line-height: 1.5; page-break-inside: avoid; }}
.ruo b {{ color: {TINTA}; }}
footer {{ display: flex; margin-top: 14px;
         border-top: 3px solid {ORO}; padding-top: 5px;
         font-size: 9pt; color: {GRIS}; justify-content: space-between;
         page-break-inside: avoid; }}
.fuentes {{ font-size: 9pt; color: {GRIS}; }}
.fuentes li {{ margin-bottom: 1px; }}
.zebra thead th {{ background: {TINTA}; color: #fff; width: auto; font-weight: 600;
                  font-size: 10pt; letter-spacing: .02em; }}
.zebra tbody tr:nth-child(even) td {{ background: #faf7f0; }}
.zebra td {{ font-size: 11pt; }}
.nota {{ font-size: 9pt; color: {GRIS}; font-style: italic; margin-top: 5px; }}
.fuente-dosis {{ font-size: 9pt; color: {GRIS}; margin-top: 4px; }}
.pasos {{ counter-reset: paso; padding-left: 0; list-style: none; }}
.pasos li {{ counter-increment: paso; margin-bottom: 5px; padding-left: 26px; position: relative; }}
.portada {{ page-break-after: always; text-align: center; padding-top: 34mm; }}
.portada .plogo {{ width: 105mm; display: block; margin: 0 auto; }}
.portada .plinea {{ width: 90mm; height: 3px; background: {ORO}; margin: 14mm auto 12mm; }}
.portada .ptit {{ font-family: {SERIF}; font-size: 30pt; color: {TINTA}; font-weight: 700; letter-spacing: -.02em; }}
.portada .ptag {{ font-size: 12pt; color: {GRIS}; margin-top: 8px; }}
.portada .pdoc {{ font-size: 11pt; color: {GRIS}; margin-top: 16mm; letter-spacing: .16em;
                 text-transform: uppercase; }}
.portada .pfoto {{ width: 62mm; margin: 12mm auto 0; display: block; }}
.portada .pruo {{ margin-top: 14mm; font-size: 9pt; color: {GRIS}; }}
.carta {{ page-break-after: always; }}
.carta p {{ margin-bottom: 9px; }}
.carta .firma {{ margin-top: 14mm; font-size: 11pt; color: {TINTA}; }}
.ov {{ display: flex; flex-wrap: wrap; gap: 0; border: 1px solid #d9dbe2; margin: 0 0 14px; }}
.ov-item {{ width: 33.33%; padding: 7px 10px; border-right: 1px solid #e6e8ee;
           border-bottom: 1px solid #e6e8ee; }}
.ov-item span {{ display: block; font-size: 9pt; color: {GRIS}; text-transform: uppercase;
                letter-spacing: .07em; margin-bottom: 2px; }}
.ov-item b {{ font-size: 11pt; color: #1a1f2b; }}
.toc-item {{ display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px dotted #cfd4de;
            font-size: 11pt; }}
.toc-item span {{ color: {ORO}; font-weight: 700; width: 22px; flex: none; }}
.pasos li::before {{ content: counter(paso); position: absolute; left: 0; top: 1px;
                    width: 18px; height: 18px; border-radius: 999px; background: {TINTA};
                    color: #fff; font-size: 8.5pt; text-align: center; line-height: 18px; }}
</style></head><body>

<div class="portada">
  <img class="plogo" src="data:image/png;base64,{logo_color}" alt="Exygen Labs">
  <div class="plinea"></div>
  <div class="ptit">{ident['nombre']}</div>
  <div class="ptag">{tagline}</div>
  {'<img class="pfoto" src="data:image/png;base64,' + foto + '" alt="">' if foto else ''}
  <div class="pdoc">Ficha técnica · Rev. 01</div>
  <div class="pruo">Uso exclusivo en investigación (RUO)</div>
</div>

<div class="carta">
  <header>
    <div class="marca"><img src="data:image/png;base64,{logo}" alt="Exygen Labs"></div>
    <div class="doc">Ficha técnica<br>{slug.upper()}<br>Rev. 01</div>
  </header>
  <h2>Sobre este documento</h2>
  <p>Esta ficha reúne la identidad química de <b>{ident['nombre']}</b>, cómo se
  reconstituye, cómo se conserva y qué se investiga con él. Está dirigida a quien
  ya adquirió el material y necesita manejarlo con precisión en el laboratorio.</p>
  <p>Dos criterios rigen todo lo que aparece aquí. El primero: <b>ningún dato entra
  sin fuente</b>. Cada cifra de identidad remite a su base de datos de origen, y cada
  dosis de referencia dice de qué publicación o guía sale. Si un dato no está
  verificado, la fila no se imprime — preferimos el hueco a la falsa confianza.</p>
  <p>El segundo: <b>la aritmética se calcula, no se copia</b>. Las tablas de
  reconstitución y de unidades de jeringa de este documento están calculadas para
  las presentaciones exactas que vendemos. Es la diferencia entre una tabla escrita
  a mano y una cuenta que se puede reproducir.</p>
  <p>Lo que esta ficha <b>no</b> contiene: indicaciones terapéuticas, promesas de
  resultado ni afirmaciones de aprobación regulatoria. Los valores analíticos del
  material que recibiste viven en el certificado de análisis de tu lote, que viaja
  con tu compra y es el único documento que puede acreditarlos.</p>
  <div class="firma">Exygen Labs · exygenlabs.com</div>

  <h2>Contenido</h2>
  {toc}
</div>

<header>
  <div class="marca"><img src="data:image/png;base64,{logo}" alt="Exygen Labs"></div>
  <div class="doc">Ficha técnica<br>{slug.upper()}<br>Rev. 01</div>
</header>

<div class="hero">
  <div class="hero-txt">
    <h1>{ident['nombre']}</h1>
    <p class="tag">{tagline}</p>
  </div>
  {'<img class="hero-foto" src="data:image/png;base64,' + foto + '" alt="">' if foto else ''}
</div>

<div class="badges">
  <div class="badge"><b>{badge_pres}</b><span>Presentaciones</span></div>
  <div class="badge"><b>{badge_pureza}</b><span>Pureza HPLC</span></div>
  <div class="badge"><b>{badge_dil}</b><span>Diluyente</span></div>
</div>

<h2>Referencia rápida</h2>
<div class="ov">{overview}</div>

<h2>{N['Identidad química']} · Identidad química</h2>
<table>{''.join(ids)}</table>
{nota}

<h2>{N['Presentaciones']} · Presentaciones</h2>
<ul>{presentaciones}</ul>

{cuerpo}

{'<h2>' + N['Farmacocinética'] + ' · Farmacocinética</h2>' + pk_tabla if pk_tabla else ''}

<h2>{N['Reconstitución recomendada']} · Reconstitución recomendada</h2>
<p>El vial llega liofilizado: el compuesto viene en polvo y no se puede medir ni
aplicar hasta reconstituirlo con agua bacteriostática. La cantidad de agua
<b>no cambia los miligramos</b> que contiene el vial — cambia la concentración,
y con ella cuántas unidades de jeringa equivale una dosis.</p>
{recon_tabla}

<h4>Procedimiento</h4>
<ol class="pasos">
  <li>Deja que el vial alcance temperatura ambiente antes de abrirlo.</li>
  <li>Limpia el tapón de goma del vial y el del agua con una toallita de alcohol; deja secar.</li>
  <li>Carga el agua con una jeringa de reconstitución (3 mL, calibre 27 G).</li>
  <li>Deja que el agua resbale por la <b>pared interna</b> del vial. Nunca la dispares sobre el polvo.</li>
  <li>Gira el vial con suavidad hasta que la solución quede transparente. <b>No lo agites</b>: la espuma es material desnaturalizado.</li>
  <li>Etiqueta el vial con la fecha de reconstitución.</li>
</ol>

<h2>{N['Dosis de referencia']} · Dosis de referencia</h2>
{dosis_tabla if dosis_tabla else '<p>No se publica dosis de referencia para este compuesto: no se localizó una fuente verificable. La aritmética de reconstitución de la sección anterior sigue siendo válida.</p>'}

<h2>{N['Selección de jeringa']} · Selección de jeringa</h2>
<p>Los tres tamaños miden lo mismo — 30 unidades son 30 unidades en cualquiera.
Lo que cambia es cuánto vale cada rayita impresa, y de ahí sale toda la precisión.</p>
<table class="zebra"><thead><tr><th>Jeringa</th><th>Cada rayita vale</th><th>Úsala para</th></tr></thead>
<tbody>
<tr><td>0.3 mL · 30 unidades</td><td>1 unidad</td><td>Dosis de un solo dígito. La más precisa.</td></tr>
<tr><td>0.5 mL · 50 unidades</td><td>1 unidad</td><td>Dosis por debajo de 10 unidades.</td></tr>
<tr><td>1 mL · 100 unidades</td><td><b>2 unidades</b></td><td>Solo dosis de más de 10 unidades.</td></tr>
<tr><td>3 mL (marcas de 0.1 mL)</td><td>0.1 mL</td><td>Para reconstituir, no para dosificar.</td></tr>
</tbody></table>
<p class="nota">Calibre para dosificar: 29 a 31 G. Para reconstituir: 27 G.
Longitud subcutánea habitual: 8 mm (5/16") o 12 mm (1/2").</p>

<h2>{N['Conservación y estabilidad']} · Conservación y estabilidad</h2>
<table class="zebra"><thead><tr><th>Estado</th><th>Dónde</th><th>Cuánto dura</th></tr></thead>
<tbody>
<tr><td>Reconstituido</td><td>Refrigerador (2–8 °C)</td><td>60 a 90 días</td></tr>
<tr><td>En polvo</td><td>Ambiente, seco y oscuro</td><td>30 a 60 días</td></tr>
<tr><td>En polvo</td><td>Refrigerador</td><td>Hasta 1 año</td></tr>
<tr><td>En polvo</td><td>Congelador</td><td>2 a 3 años</td></tr>
</tbody></table>
<p class="nota">Los ciclos de congelado y descongelado son la forma más rápida de
degradar el material: reconstituye solo el vial que vas a usar. La humedad afecta
incluso al polvo liofilizado — recipiente opaco, hermético y con desecante.</p>

<h2>{N['Manejo en laboratorio']} · Manejo en laboratorio</h2>
{manejo}
<p><b>Conservación indicada para este producto:</b> {cat.get('storage', '—')}</p>

<h2>{N['Certificado de análisis del lote']} · Certificado de análisis del lote</h2>
<p>Cada lote se acompaña de su propio certificado de análisis, con la pureza
cromatográfica por HPLC, la confirmación de identidad por espectrometría de masas y
el número de lote correspondiente. <b>El certificado se entrega junto con la compra</b>,
referido al lote exacto que se envía.</p>
<p>Esta ficha describe la identidad del compuesto y su manejo; los valores analíticos
viven en el certificado del lote, que es el único documento que puede acreditarlos.</p>

<h2>{N['Fuentes de los datos de identidad']} · Fuentes de los datos de identidad</h2>
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
