# -*- coding: utf-8 -*-
"""
Cosecha identidad quimica desde PubChem para el catalogo de Exygen.

No adivina: consulta la API REST de PubChem por nombre, y si el nombre no
resuelve deja el compuesto en la lista de pendientes para revision manual.
Los pesos moleculares y formulas salen de PubChem; el CAS se toma de la lista
de sinonimos SOLO si tiene forma de CAS y PubChem lo devuelve para ese CID.

    python3 cosechar_pubchem.py           # cosecha y escribe el JSON parcial
"""
import json, os, re, time, urllib.parse, urllib.request

BASE = os.path.dirname(os.path.abspath(__file__))
PEND = "/private/tmp/claude-501/-Users-christian-Documents-Exygen-Peptides/9d8b0320-1b99-49ec-999d-2fd648f3ee19/scratchpad/pendientes.txt"
API = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{}/property/MolecularFormula,MolecularWeight,IUPACName/JSON"
SYN = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{}/synonyms/JSON"
CAS_RE = re.compile(r"^\d{2,7}-\d{2}-\d$")

# Nombres de consulta por slug. El catalogo esta en espanol y trae nombres
# comerciales; PubChem entiende el nombre internacional. Se prueban en orden.
ALIAS = {
    "semaglutida": ["semaglutide"], "tirzepatida": ["tirzepatide"],
    "liraglutida": ["liraglutide"], "dulaglutida": ["dulaglutide"],
    "cagrilintida": ["cagrilintide"], "mazdutida": ["mazdutide"],
    "survodutide": ["survodutide"], "sermorelina": ["sermorelin"],
    "tesamorelina": ["tesamorelin"], "melatonina": ["melatonin"],
    "oxitocina": ["oxytocin"], "glutation": ["glutathione"],
    "triptorelin-acetate": ["triptorelin"], "gonadorelin-acetate": ["gonadorelin"],
    "ghrp-2-acetate": ["GHRP-2", "pralmorelin"], "ghrp-6-acetate": ["GHRP-6"],
    "hexarelin-acetate": ["hexarelin"], "kisspeptina-10": ["kisspeptin-10"],
    "l-carnitine": ["L-carnitine"], "b12": ["cyanocobalamin"],
    "vitamina-b12": ["cyanocobalamin"], "acido-acetico": ["acetic acid"],
    "adipotide": ["adipotide"], "epithalon": ["epithalon", "epitalon"],
    "thymosin-alpha-1": ["thymalfasin"], "ll-37": ["LL-37"],
    "igf-1-lr3": ["IGF-1 LR3"], "mots-c": ["MOTS-c"], "ss-31": ["elamipretide"],
    "ara-290": ["cibinetide"], "slu-pp-332": ["SLU-PP-332"],
    "aicar": ["AICAR", "acadesine"], "foxo4": ["FOXO4-DRI"],
    "ahk-cu": ["AHK-Cu", "Ala-His-Lys copper"], "kpv": ["Lys-Pro-Val"],
    "snap-8": ["acetyl octapeptide-3"], "matrixyl": ["palmitoyl pentapeptide-4"],
    "5-amino-1mq": ["5-amino-1-methylquinolinium"],
    "pt-141": ["bremelanotide"], "melanotan-2": ["melanotan II"],
    "melanotan-i": ["afamelanotide"], "aod-9604": ["AOD9604"],
    "dsip": ["delta sleep-inducing peptide"], "selank": ["selank"],
    "semax": ["semax"], "humanin": ["humanin"], "p21": ["P021"],
    "pe-22-28": ["PE 22-28"], "dermorphin": ["dermorphin"],
    "pnc-27": ["PNC-27"], "b7-33": ["B7-33"], "orexin-a": ["orexin A"],
    "orexin-b": ["orexin B"], "acth-1-39": ["corticotropin"],
    "hcg": ["chorionic gonadotropin"], "epo": ["erythropoietin"],
    "vip": ["vasoactive intestinal peptide"], "gdf-8": ["myostatin"],
    "ace-031": ["ACE-031"], "follistatin": ["follistatin"],
    "peg-mgf": [], "mgf": ["mechano growth factor"],
    "hgh-fragment-176-191": ["HGH fragment 176-191"],
    "botulinum-toxin": ["botulinum toxin type A"],
    "triptorelina": ["triptorelin"],
}

# Compuestos que por naturaleza NO tienen identidad quimica unica.
SIN_IDENTIDAD = {
    "klow-bpc-ghk-cu-tb-500-kpv", "glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg",
    "bpc-157-10mg-tb-500-10mg", "bpc-157-5mg-tb-500-5mg",
    "cjc-1295-no-dac-5mg-ipamorelin-5mg", "tesamorelin-10-ipamorelin-5",
    "retatrutide-20mg-tirzepatide-40mg", "cagri-sema-2-5mg-2-5mg",
    "lipo-c", "mic-lipo-c-b12", "lemon-bottle", "admax", "ptd-1",
    "cerebrolysin", "thymalin", "humsc-celulas-madre-100-mil",
    "agua-bacteriostatica", "hmg", "hgh", "somatropina-hgh-191aa",
    "bronchogen", "cardiogen", "cartalax", "cortagen", "crystagen", "pinealon",
}


def get(url):
    try:
        with urllib.request.urlopen(url, timeout=25) as r:
            return json.loads(r.read())
    except Exception:
        return None


def consultar(nombre):
    d = get(API.format(urllib.parse.quote(nombre)))
    if not d:
        return None
    props = d.get("PropertyTable", {}).get("Properties") or []
    if not props:
        return None
    p = props[0]
    cas = None
    s = get(SYN.format(p["CID"]))
    if s:
        sinos = s["InformationList"]["Information"][0].get("Synonym", [])
        cas = next((x for x in sinos if CAS_RE.match(x)), None)
    return {
        "cid": p["CID"], "formula": p.get("MolecularFormula"),
        "peso": p.get("MolecularWeight"), "iupac": p.get("IUPACName"), "cas": cas,
    }


def main():
    filas = [l.split("|") for l in open(PEND).read().split("\n") if l.strip()]
    ok, sin_id, fallidos = {}, [], []

    for slug, nombre in filas:
        if slug in SIN_IDENTIDAD:
            sin_id.append((slug, nombre))
            continue
        candidatos = ALIAS.get(slug, []) + [nombre, slug.replace("-", " ")]
        r = None
        usado = None
        for c in candidatos:
            if not c:
                continue
            r = consultar(c)
            if r:
                usado = c
                break
            time.sleep(0.22)
        if r:
            ok[slug] = {"nombre": nombre, "consulta": usado, **r}
            print(f"  OK   {slug:42} CID {r['cid']:>10}  CAS {r['cas'] or '-'}")
        else:
            fallidos.append((slug, nombre))
            print(f"  --   {slug:42} no resolvio en PubChem")
        time.sleep(0.22)

    json.dump({"verificados": ok,
               "sin_identidad_por_naturaleza": sin_id,
               "no_resueltos": fallidos},
              open(os.path.join(BASE, "cosecha_pubchem.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print(f"\nverificados: {len(ok)} | mezclas/extractos: {len(sin_id)} | sin resolver: {len(fallidos)}")


main()
