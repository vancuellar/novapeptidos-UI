# -*- coding: utf-8 -*-
"""
Consolida datos_identidad.json a partir de tres fuentes, en este orden de
prioridad (lo primero gana):

  1. datos_identidad_manual.json  - lo verificado a mano con doble comprobacion
  2. cosecha_pubchem.json         - la API de PubChem (formula, peso, CAS, IUPAC)
  3. datos_identidad_lote2.json   - lo que aporto Codex, solo para llenar huecos

Los descartados de la cosecha (matches falsos de PubChem) NO entran.
Las mezclas y extractos entran con todo en null y una nota que explica por que.
"""
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))
J = lambda n: json.load(open(os.path.join(BASE, n), encoding="utf-8"))

cosecha = J("cosecha_pubchem.json")
codex = {k: v for k, v in J("datos_identidad_lote2.json").items() if not k.startswith("_")}
manual = {k: v for k, v in J("datos_identidad_manual.json").items()
          if not k.startswith("_")}


def productos_del_catalogo():
    """slug + nombre de TODO el catálogo del sitio, leído de fallbackCatalog.js."""
    import re
    src = open(os.path.join(os.path.dirname(BASE), "src/data/fallbackCatalog.js"),
               encoding="utf-8").read()
    m = re.search(r"export const fallbackProducts = (\[[\s\S]*?\n\]);", src)
    return json.loads(m.group(1))

# El nombre IUPAC de un peptido largo es una cadena ilegible: solo se conserva
# para moleculas pequenas, donde si aporta.
LIMITE_IUPAC = 160

NOTA_MEZCLA = ("Es una presentación comercial que reúne varios componentes. Como mezcla no "
               "tiene número CAS, fórmula molecular ni peso molecular propios: la identidad "
               "corresponde a cada componente por separado. Cualquier caracterización analítica "
               "debe hacerse componente por componente.")
NOTA_EXTRACTO = ("No es una molécula única sino una preparación de composición compleja, por lo "
                 "que no tiene fórmula ni peso molecular propios. La reproducibilidad entre lotes "
                 "depende del proceso de fabricación y debe verificarse en el certificado del lote.")
NOTA_CELULAR = ("Es material celular, no un compuesto químico: no aplica identidad molecular. "
                "La caracterización se hace por marcadores de superficie, viabilidad, esterilidad "
                "y ausencia de micoplasma, y consta en el certificado del lote.")
NOTA_SIN_ID = ("La identidad química de este material no está resuelta en literatura revisada por "
               "pares. Hasta contar con fórmula o secuencia exacta, número CAS y certificado de "
               "identidad del lote, esta ficha no le atribuye mecanismo ni actividad.")

CLASIF = {
    "cerebrolysin": NOTA_EXTRACTO, "thymalin": NOTA_EXTRACTO,
    "hmg": NOTA_EXTRACTO, "lemon-bottle": NOTA_EXTRACTO, "lipo-c": NOTA_MEZCLA,
    "mic-lipo-c-b12": NOTA_MEZCLA, "humsc-celulas-madre-100-mil": NOTA_CELULAR,
    "admax": NOTA_SIN_ID, "ptd-1": NOTA_SIN_ID, "peg-mgf": NOTA_SIN_ID,
}
for s in ("klow-bpc-ghk-cu-tb-500-kpv", "glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg",
          "bpc-157-10mg-tb-500-10mg", "bpc-157-5mg-tb-500-5mg",
          "cjc-1295-no-dac-5mg-ipamorelin-5mg", "tesamorelin-10-ipamorelin-5",
          "retatrutide-20mg-tirzepatide-40mg", "cagri-sema-2-5mg-2-5mg"):
    CLASIF[s] = NOTA_MEZCLA


def vacio(nombre):
    return {"nombre": nombre, "nombre_quimico": None, "sinonimos": [],
            "cas_complejo": None, "cas_peptido_libre": None, "formula": None,
            "peso_molecular": None, "formula_peptido_libre": None,
            "peso_peptido_libre": None, "secuencia": None, "residuos": None,
            "apariencia": None, "solubilidad": None, "categoria": None,
            "fuentes": {}}


def main():
    final = dict(manual)          # los tres hechos a mano mandan
    v = cosecha["verificados"]

    for slug, r in v.items():
        if slug in final:
            continue
        e = vacio(r["nombre"])
        e["formula"] = r["formula"]
        e["peso_molecular"] = f'{float(r["peso"]):.2f} g/mol' if r["peso"] else None
        e["cas_complejo"] = r["cas"]
        if r.get("iupac") and len(r["iupac"]) <= LIMITE_IUPAC:
            e["nombre_quimico"] = r["iupac"]
        e["fuentes"] = {k: f'PubChem CID {r["cid"]}'
                        for k, val in (("formula", r["formula"]),
                                       ("peso_molecular", r["peso"]),
                                       ("cas_complejo", r["cas"])) if val}
        final[slug] = e

    # mezclas, extractos, material celular y los de identidad no resuelta.
    # ⛔ Esto leía un archivo suelto del /tmp de una sesión vieja de Claude, que ya no
    # existe: el script llevaba días tronando con FileNotFoundError y nadie podía
    # reconsolidar identidades (lo cazó el alta de Adipotida, 2026-07-31). El mapa
    # slug -> nombre sale del catálogo del sitio, que es donde de verdad vive.
    todos = {p["slug"]: p["name"] for p in productos_del_catalogo()}
    for slug, nota in CLASIF.items():
        if slug not in todos:
            continue
        e = final.get(slug) or vacio(todos[slug])
        e["nota_nomenclatura"] = nota
        final[slug] = e

    # Codex solo llena huecos, nunca sobreescribe, y SOLO si cito una fuente real.
    # "catalogo interno de Exygen" no es una fuente quimica: eso se rechaza.
    FUENTE_OK = ("pubchem", "uniprot", "guidetopharmacology", "guide to pharmacology",
                 "drugbank", "chembl", "cas registry", "pmid", "pubmed")
    rellenos, rechazos = 0, 0
    for slug, c in codex.items():
        if slug not in final:
            continue
        fu = c.get("fuentes") or {}
        for campo in ("cas_complejo", "formula", "peso_molecular", "secuencia",
                      "residuos", "apariencia", "solubilidad", "categoria",
                      "nombre_quimico"):
            if final[slug].get(campo) or not c.get(campo):
                continue
            src = str(fu.get(campo) or "")
            if not any(t in src.lower() for t in FUENTE_OK):
                rechazos += 1
                continue
            final[slug][campo] = c[campo]
            final[slug].setdefault("fuentes", {})[campo] = src
            rellenos += 1
        if c.get("sinonimos") and not final[slug].get("sinonimos"):
            final[slug]["sinonimos"] = c["sinonimos"]

    # los que quedaron sin NADA y sin nota no pueden salir como ficha
    sin_nada = [s for s, e in final.items()
                if not any(e.get(f) for f in ("cas_complejo", "formula", "peso_molecular",
                                              "secuencia", "nota_nomenclatura"))]
    for s in sin_nada:
        final.pop(s)

    final["_comentario"] = ("Consolidado de datos_identidad_manual.json (verificado a mano), "
                           "cosecha_pubchem.json (API de PubChem) y datos_identidad_lote2.json "
                           "(Codex, solo relleno de huecos). Los matches falsos de PubChem estan "
                           "en la clave 'descartados' de cosecha_pubchem.json y NO entran aqui. "
                           "Un campo en null NO se imprime en la ficha.")
    json.dump(final, open(os.path.join(BASE, "datos_identidad.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)

    n = len([k for k in final if not k.startswith("_")])
    print(f"compuestos con ficha posible: {n}")
    print(f"huecos rellenados por Codex (con fuente real): {rellenos}")
    print(f"aportes de Codex RECHAZADOS por no citar fuente: {rechazos}")
    print(f"descartados por falta total de datos: {len(sin_nada)}")
    if sin_nada:
        print("  ->", ", ".join(sorted(sin_nada)))


main()
