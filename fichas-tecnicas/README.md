# Fichas técnicas

Genera una ficha técnica en PDF por compuesto, a partir de las monografías del
sitio más una tabla de identidad química verificada.

## Reglas de contenido (no negociables)

Son las mismas de las monografías, más una propia:

- Nada de dosis, pautas de administración ni volúmenes de reconstitución.
- Nada de farmacocinética humana, indicaciones, beneficios ni contraindicaciones.
- Ningún sello ni referencia a FDA, COFEPRIS u otra agencia.
- **Una ficha que sale a un cliente nunca dice "pendiente" ni "por verificar".**
  Si un dato no está verificado, la fila no se imprime. Regla de Christian,
  2026-07-26.

Los valores analíticos (pureza, identidad, contenido) NO van en la ficha: viven
en el certificado del lote, que es el único documento que puede acreditarlos.

## Cómo se usa

```bash
python3 cosechar_pubchem.py    # 1. identidad desde la API de PubChem
python3 consolidar.py          # 2. mezcla manual + PubChem + investigación asistida
python3 build_fichas.py        # 3. genera los PDF en pdf/
python3 build_fichas.py ghk-cu # solo uno
```

## Los archivos

| | |
|---|---|
| `datos_identidad_manual.json` | Verificado a mano, con doble comprobación. Manda sobre todo lo demás. |
| `cosecha_pubchem.json` | Salida de la API de PubChem. Incluye `descartados`: los match falsos que detectaron los controles (hCG devolvía un compuesto de 232 Da, MGF devolvía trifluoruro de magnesio, EPO 848 Da). |
| `datos_identidad_lote2.json` | Investigación asistida. Solo se acepta el campo que cite una fuente real; "catálogo interno" no es una fuente química. |
| `datos_identidad.json` | El consolidado que lee `build_fichas.py`. Se regenera, no se edita a mano. |

## De dónde sale cada dato

Todo CAS, fórmula, peso molecular y secuencia debe venir de PubChem, UniProt,
Guide to Pharmacology, DrugBank o el artículo primario, y queda anotado en el
campo `fuentes` de cada compuesto. Si no se puede verificar, va en `null`.
Nunca se estima ni se copia de una tienda de péptidos.

Al cruzar la cosecha de PubChem contra la investigación asistida, 161 campos
coincidieron y ninguno se contradijo. Ese cruce es la comprobación mutua.

## Publicar

Los PDF se copian a `/opt/exygen/fichas` en el servidor (montado en el
contenedor como `/data/fichas`). No hay registro que mantener: el nombre del
archivo es la convención, `FICHA-TECNICA-<SLUG>.pdf`.
