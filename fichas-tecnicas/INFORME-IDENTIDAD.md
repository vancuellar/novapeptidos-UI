# Informe de identidad química — lote 2

## Resultado

- Registros entregados: **70** (55 de `verificados` y los 15 casos del residuo).
- Identidades químicas centrales completas: **51**.
- Registros con uno o más datos centrales en `null`: **19**.
- Todos los registros conservan exactamente el esquema pedido.

“Completa” significa que se verificaron nombre, CAS, fórmula, masa y, cuando corresponde, secuencia y residuos. `apariencia` y `solubilidad` se dejaron en `null` cuando no había una fuente autorizada específica para el material y la forma del lote.

## Registros parciales y motivo

- `cjc-1295-sin-dac`: identidad, fórmula, masa y secuencia verificadas; CAS en `null` por conflicto registral.
- `foxo4`, `pe-22-28`, `p21` y `ptd-dbm`: PubChem verifica estructura, fórmula y masa, pero no se transcribió una secuencia textual sin respaldo primario inequívoco.
- `mazdutida` y `survodutide`: PubChem verifica fórmula y masa; la secuencia completa con todas sus modificaciones no quedó accesible en una fuente primaria inequívoca.
- `botulinum-toxin`: el nombre no indica serotipo ni cepa.
- `dysport`: es una formulación biológica y no una molécula pura.
- `igf-1-lr3`: se verificaron identidad, CAS, masa aproximada y 83 residuos, pero no una transcripción primaria completa de la secuencia.
- `peg-mgf`: no se publica el sitio de pegilación ni el tamaño del PEG; no existe una identidad molecular única verificable.
- `b7-33`: se verificaron secuencia y 27 residuos; no se encontró CAS, fórmula o masa en una fuente permitida.
- `humsc-celulas-madre`: material celular, sin identidad química molecular.
- `dulaglutida`: glicoproteína de fusión; la etiqueta da unos 63 kDa y 596 residuos totales, pero no una fórmula molecular única.
- `follistatin`: el catálogo no especifica isoforma; no se asignó FST288, FST303 o FST315 por suposición.
- `gdf-8`: precursor y dímero maduro son formas distintas; se informó el dímero maduro (2 × 109 residuos) sin inventar fórmula.
- `hcg`: heterodímero glicosilado de 92 + 145 residuos; no tiene fórmula molecular única.
- `mgf`: el nombre puede significar la isoforma IGF-1Ec o su péptido E; se registró la secuencia del péptido E descrito en la monografía y se dejaron sin asignar CAS, fórmula y masa.
- `epo`: secuencia madura de 165 residuos verificada; la glicosilación impide una fórmula molecular única.

## Discrepancias y aclaraciones importantes

1. **HGH Fragment 176-191:** los **1859.1 g/mol** de PubChem CID 172966176 son el complejo con ácido acético. El fragmento humano nativo libre empieza con **Phe** (`FLRIVQCRSVEGSCGF`) y pesa **1799.1 g/mol** (CID 16131230). El valor esperado “~1817” corresponde a la variante **AOD-9604**, que empieza con **Tyr**; PubChem le da **1815.1 g/mol** con su puente disulfuro (CID 71300630). Son moléculas distintas.
2. **Fragment 17-23 y TB-500:** PubChem los representa como el mismo material molecular, **Ac-LKKTETQ**, CAS **885340-08-9**. No son dos identidades químicas distintas en este catálogo.
3. **CJC-1295:** la forma con DAC es PubChem CID 91971820, CAS **446262-90-4**. PubChem marca **863288-34-0** como CAS antiguo/deprecado de esa estructura. Aunque fuentes comerciales lo reasignan a Modified GRF(1-29), ninguna fuente permitida confirmó formalmente esa reasignación; por eso el CAS de la forma sin DAC quedó en `null`.
4. **B7-33:** algunos resúmenes lo llaman péptido de 26 aminoácidos, pero la secuencia primaria publicada `VIKLSGRELVRAQIAISGMSTWSKRSL` contiene **27 residuos**.
5. **Vitamina B12:** `b12` y `vitamina-b12` quedaron ambas identificadas como **cianocobalamina**, CAS **68-19-9**. “Cobalamina” sin especificar sería ambiguo.
6. **GHRP-6 acetate:** CAS **87616-84-0** corresponde al péptido registrado. No se inventó una estequiometría de acetato para una sal no definida por el catálogo.
7. **PNC-27:** el nombre histórico no equivale al número total de residuos de la construcción publicada; la secuencia completa con el dominio penetrante contiene **32 residuos**.

## Alcance de las fuentes

Se usaron PubChem, UniProt, etiquetas regulatorias y artículos primarios. No se utilizaron tiendas de péptidos como fuente de identidad. Cuando una fuente aceptada no permitió verificar un dato, el campo quedó en `null` con la explicación correspondiente.
