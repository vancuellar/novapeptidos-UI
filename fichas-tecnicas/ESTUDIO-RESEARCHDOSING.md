# Estudio de ResearchDosing.com frente a la calculadora de Exygen Labs

**Fecha de revisión:** 27 de julio de 2026  
**Alcance:** contenido público accesible de ResearchDosing.com y código local actual de Exygen Labs.  
**Regla de lectura:** cuando una cifra no tiene una fuente rastreable o no fue visible, se indica expresamente.

## Resumen ejecutivo

La diferencia de agua no es una diferencia de dosis clínica. Es una elección de concentración:

- ResearchDosing indica **2.5 mL** para un vial de Retatrutida de 40 mg: **16 mg/mL**.
- Exygen indica **4 mL**: **10 mg/mL**.
- Para una dosis de 8 mg, ResearchDosing obtiene 50 unidades U-100 y Exygen 80 unidades. En ambos casos se administran los mismos 8 mg.

La página pública actual de ResearchDosing **no muestra 4.8 mg para Retatrutida**. Muestra 2, 4, 6, 8, 10 y 12 mg. Por ello, la cifra de 4.8 mg observada en la calculadora del competidor no pudo atribuirse a ResearchDosing con la evidencia disponible.

La hipótesis `4.8 mg × 8 = 38.4 mg` es aritméticamente correcta, pero no prueba el origen de la cifra. Un vial de 40 mg permitiría ocho aplicaciones completas y dejaría 1.6 mg. No se encontró ensayo de Retatrutida que use 4.8 mg ni una explicación de ResearchDosing basada en dividir el vial en ocho.

El problema principal de ResearchDosing es de trazabilidad: publica pautas muy concretas, calendarios, contraindicaciones y combinaciones sin bibliografía visible en la página de Retatrutida. Parte de sus dosis coincide con el ensayo Fase 2, pero otras —6 y 10 mg, ciclos de 16 semanas, lavado de 8 semanas y reglas de escalamiento— no están sustentadas allí.

Exygen es más prudente al encender sugerencias solo cuando existe una fuente anotada y al negarse a indicar cuándo subir de nivel. Sin embargo, la anotación actual de Retatrutida todavía debe mejorar: menciona el ensayo y dos sitios secundarios, pero no enlaza directamente el artículo primario ni distingue con claridad qué respalda la dosis y qué respalda el volumen de agua.

## 1. Cómo está hecha ResearchDosing.com

### Estructura visible

El sitio está montado en WordPress y presenta:

1. **Inicio.**
2. **Dosing Instructions / Dosing Information:** índice alfabético de compuestos inyectables, orales y tópicos.
3. **Fichas individuales:** por ejemplo, Retatrutida, Semaglutida, Tirzepatida, BPC-157 y NAD+.
4. **Prep & Injection Guide:** almacenamiento, tipos de jeringa, reconstitución e inyección.
5. **FAQs.**
6. **About, Contact, Privacy, Terms y Research Use Disclaimer.**
7. **Índice funcional:** agrupa compuestos por pérdida de peso, músculo, energía, estética, recuperación, inmunomodulación, cognición y función hormonal/sexual.

La página índice enumeró aproximadamente un centenar de entradas y mezclas. No se contó cada ficha como un compuesto único porque hay duplicados por vía de administración y enlaces repetidos.

### Puerta de acceso

En las páginas revisadas aparece una capa llamada **Private Access Agreement**. Solicita:

- indicar de qué sitio viene el visitante;
- marcar aceptación de no compartir ni redistribuir el sitio, sus enlaces o contenido;
- pulsar “Continue”.

El contenido textual de varias páginas fue recuperable públicamente por el índice web, incluida la ficha completa de Retatrutida. Sin embargo, el navegador interactivo no estuvo disponible durante esta revisión y no se aceptó la puerta. Por eso:

- sí se pudo revisar el texto público indexado;
- no se pudo comprobar visualmente el comportamiento de la puerta;
- no se pudo verificar si, al continuar, aparecen elementos adicionales;
- no se pudo comprobar el nombre técnico o la versión del plugin;
- no se debe asumir que el contenido indexado representa todo lo disponible para un visitante autorizado.

### ¿Tiene calculadora interactiva?

**No se encontró una calculadora interactiva propia en ResearchDosing.com.** La ficha de Retatrutida presenta tablas estáticas de equivalencias por vial. El índice público y la búsqueda del dominio tampoco mostraron una ruta de calculadora.

Esto es distinto de `researchpeptidedosing.com`, que sí tiene una calculadora interactiva, pero es otro dominio y no se usó como evidencia sobre ResearchDosing.

### Qué pide y qué devuelve

La ficha pública de Retatrutida no pide variables al usuario. Publica combinaciones predeterminadas:

- cantidad del vial;
- agua bacteriostática a agregar;
- dosis en mg;
- equivalencia en unidades de jeringa U-100;
- frecuencia semanal;
- instrucciones de inicio y aumento.

No devuelve dinámicamente concentración, mililitros por aplicación, dosis por vial, advertencias por capacidad de jeringa ni resultados recalculados al cambiar una entrada.

## 2. Comparación campo por campo

| Campo o función | ResearchDosing | Exygen Labs | Evaluación |
|---|---|---|---|
| Tipo de herramienta | Fichas y tablas estáticas por compuesto | Calculadora interactiva | Exygen permite adaptar el cálculo al vial real. |
| Selección de compuesto | Índice alfabético y por función | Buscador dentro de la calculadora | Ambos facilitan localizar; ResearchDosing muestra mayor amplitud editorial. |
| Tamaño del vial | Solo presentaciones publicadas en cada ficha | Presentaciones reales del catálogo | Exygen está ligado a lo que vende. |
| Agua bacteriostática | Cantidad fija por presentación | Sugerida o introducida por el usuario; opciones de 1–5 mL | Exygen explica mejor el efecto de cambiar el agua. |
| Dosis | Lista fija dentro de la ficha | Entrada libre; niveles sugeridos solo con fuente anotada | Exygen separa aritmética de recomendación. |
| Unidades de dosis | Principalmente mg o mcg según ficha | mg y mcg; bloquea mcg en productos dosificados en mg | Exygen reduce errores de unidad. |
| Tipo de jeringa | Guía separada sobre 30, 50 y 100 unidades; la tabla expresa U-100 | Selector U-100 de 0.3, 0.5 y 1 mL | Exygen recalcula según capacidad y dibuja la jeringa. |
| Resultado en unidades | Enteros estáticos | Decimal y dibujo de llenado | Exygen conserva más precisión. |
| Concentración | Implícita | Visible en mg/mL | Exygen es más claro. |
| Volumen por aplicación | No visible en mL en la tabla de Retatrutida | Visible en mL y unidades | Exygen es más completo. |
| Dosis por vial | No visible en la ficha de Retatrutida | Calculado y visible | Exygen es más transparente. |
| Frecuencia | Una vez cada 7 días | Una vez por semana para los niveles con fuente | Coinciden en frecuencia. |
| Niveles | 2, 4, 6, 8, 10 y 12 mg | Inicial 2, típica 4, avanzada 8 mg | ResearchDosing ofrece más puntos, pero no demuestra la fuente de todos. |
| Calendario de aumento | Sí: mínimo cuatro semanas en cada dosis y aumento de 2 mg | No: declara que cuándo subir es decisión clínica | Exygen cumple mejor la regla de no titular. |
| Fuentes junto a las cifras | No se encontraron citas, DOI ni enlaces de estudio en la ficha | Muestra el campo `fuente` | Exygen es mejor en intención y visibilidad; la fuente actual debe hacerse más precisa. |
| Avisos | RUO, efectos adversos, interacciones, contraindicaciones, almacenamiento e inyección | RUO, consulta médica, límites de medición y capacidad de jeringa | ResearchDosing cubre más temas; Exygen evita convertirlos en pauta clínica. |
| Compartir e imprimir | No se verificó una función propia | Copiar, enlace y PDF en versión completa | Exygen facilita llevar el cálculo al médico. |
| Acceso | Puerta de acuerdo privado | Versión pública básica y versión completa para clientes | Exygen separa funciones sin ocultar la aritmética básica. |

## 3. Retatrutida en ResearchDosing

### Presentaciones y agua visibles

| Vial solicitado | Agua indicada por ResearchDosing | Concentración resultante | Estado de verificación |
|---:|---:|---:|---|
| 10 mg | 1 mL | 10 mg/mL | Visible |
| 15 mg | — | — | No aparece en la ficha pública revisada |
| 20 mg | — | — | No aparece en la ficha pública revisada |
| 30 mg | 2.5 mL | 12 mg/mL | Visible |
| 40 mg | 2.5 mL | 16 mg/mL | Visible |
| 60 mg | 2.5 mL | 24 mg/mL | Visible |

No se encontró explicación de por qué 30, 40 y 60 mg usan todos 2.5 mL ni una fuente técnica para esos volúmenes.

### Dosis y esquema publicados

La ficha indica:

- una aplicación cada siete días;
- empezar en 2 mg semanales si nunca se ha usado otro GLP;
- empezar en 4 mg semanales si ya se usó otro GLP y hubo al menos un aumento;
- mantener cada dosis un mínimo de cuatro semanas;
- aumentar gradualmente en pasos de 2 mg;
- equivalencias para 2, 4, 6, 8, 10 y 12 mg;
- ciclos usuales de 16 semanas seguidos de al menos 8 semanas de lavado.

La misma página contiene una tensión interna: dice que el ciclo no es necesario, pero lo recomienda para evitar desensibilización. No aporta una cita para esa afirmación.

### Equivalencias publicadas

| Vial y agua | 2 mg | 4 mg | 6 mg | 8 mg | 10 mg | 12 mg |
|---|---:|---:|---:|---:|---:|---:|
| 10 mg + 1 mL | 20 u | 40 u | 60 u | 80 u | 100 u | No publicado |
| 30 mg + 2.5 mL | 16 u | 32 u | 50 u | 66 u | 84 u | 100 u |
| 40 mg + 2.5 mL | 12 u | 25 u | 38 u | 50 u | 62 u | 75 u |
| 60 mg + 2.5 mL | 8 u | 17 u | 25 u | 33 u | 42 u | 50 u |

ResearchDosing redondea varias equivalencias a unidades enteras. Por ejemplo, con 40 mg en 2.5 mL:

- 2 mg son exactamente 12.5 unidades, pero publica 12;
- 6 mg son 37.5, pero publica 38;
- 10 mg son 62.5, pero publica 62.

Esto produce pequeñas diferencias entre la dosis escrita y la realmente extraída. Exygen muestra una cifra decimal en el resultado principal, lo cual es más fiel a la aritmética.

Hay además una discrepancia mayor en la tabla de 30 mg: con 2.5 mL, una dosis de 4 mg equivale a **33.3 unidades**, no a las 32 publicadas. Extraer 32 unidades entregaría 3.84 mg. No se pudo determinar si es un error de captura, redondeo o cálculo.

### ¿Cuántas dosis dice que rinde cada vial?

**ResearchDosing no lo dice en la ficha pública de Retatrutida.** Solo publica equivalencias de mg a unidades.

La cantidad de aplicaciones completas puede calcularse como `mg del vial ÷ mg por aplicación`, pero ese cálculo es nuestro, no una afirmación del sitio:

| Vial | A 2 mg | A 4 mg | A 6 mg | A 8 mg | A 10 mg | A 12 mg |
|---:|---:|---:|---:|---:|---:|---:|
| 10 mg | 5 | 2 | 1 | 1 | 1 | 0 |
| 15 mg | 7 | 3 | 2 | 1 | 1 | 1 |
| 20 mg | 10 | 5 | 3 | 2 | 2 | 1 |
| 30 mg | 15 | 7 | 5 | 3 | 3 | 2 |
| 40 mg | 20 | 10 | 6 | 5 | 4 | 3 |
| 60 mg | 30 | 15 | 10 | 7 | 6 | 5 |

La tabla cuenta solo aplicaciones completas y no presupone que el remanente sea utilizable.

## 4. De dónde salen sus dosis

### Lo que sí se puede rastrear

El ensayo Fase 2 publicado en *The New England Journal of Medicine* estudió dosis objetivo semanales de **1, 4, 8 y 12 mg**. Algunos grupos iniciaron en 2 mg o 4 mg y escalaron en intervalos de cuatro semanas. Esto respalda que 1, 2, 4, 8 y 12 mg aparezcan en la conversación científica, aunque 2 mg fue dosis inicial en ciertos grupos y no uno de los cuatro niveles objetivo principales.

Fuente primaria:

- Jastreboff et al., “Triple–Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial”, NEJM, DOI: [10.1056/NEJMoa2301972](https://www.nejm.org/doi/full/10.1056/NEJMoa2301972)
- Registro del ensayo: [NCT04881760](https://clinicaltrials.gov/study/NCT04881760)

### Lo que no se puede rastrear en la página

La ficha de ResearchDosing no presenta bibliografía, DOI, notas al pie ni enlaces a ensayos. No se encontró respaldo visible para:

- usar 6 mg y 10 mg como niveles intermedios;
- empezar en 4 mg por haber usado previamente otro GLP;
- aumentar obligatoriamente cada cuatro semanas en pasos de 2 mg;
- ciclos de 16 semanas y lavado mínimo de 8 semanas;
- la afirmación de que fraccionar causa desensibilización más rápida;
- las recomendaciones de combinaciones o “stacks”;
- los volúmenes de agua de 1 y 2.5 mL;
- numerosas afirmaciones adicionales sobre cicatrización, colágeno, angiogénesis y regeneración muscular.

El sitio declara en “About Us” que busca información científicamente fundada y que su equipo incluye personas con antecedentes en farmacología, química e investigación aplicada. Esa declaración no sustituye una referencia comprobable para cada cifra.

### Veredicto sobre 4.8 mg y ocho aplicaciones

1. `4.8 × 8 = 38.4 mg`: correcto.
2. Quedarían 1.6 mg de un vial nominal de 40 mg.
3. La ficha pública actual de ResearchDosing no contiene 4.8 mg.
4. El ensayo Fase 2 citado no estudió 4.8 mg.
5. ResearchDosing tampoco publica “ocho dosis por vial” para Retatrutida.

**Veredicto:** no hay evidencia suficiente para afirmar que ResearchDosing inventó 4.8 mg dividiendo el vial en ocho. Tampoco hay evidencia para atribuir 4.8 mg a un ensayo de Retatrutida. Si Certified-PepMex muestra 4.8 mg y ocho aplicaciones, el origen de esa cifra permanece **no verificado** y parece provenir de otra regla, fuente o cálculo no identificado.

La coincidencia aritmética es una señal válida para investigar, pero no basta para demostrar intención ni procedencia.

## 5. Comparación específica del vial de 40 mg

| Campo | ResearchDosing | Exygen |
|---|---:|---:|
| Agua | 2.5 mL | 4 mL |
| Concentración | 16 mg/mL | 10 mg/mL |
| Dosis inicial mostrada | 2 mg | 2 mg |
| Dosis de referencia adicionales | 4, 6, 8, 10 y 12 mg | 4 y 8 mg |
| 2 mg en U-100 | Publica 12 u; exacto 12.5 u | 20 u |
| 4 mg en U-100 | 25 u | 40 u |
| 8 mg en U-100 | 50 u | 80 u |
| Dosis completas a 8 mg | No lo muestra; matemáticamente 5 | Muestra 5 |
| Fuente visible | Ninguna en la ficha | Campo `fuente` visible |

Los 2.5 mL de ResearchDosing hacen más pequeñas las extracciones y permiten que 12 mg quepan en una jeringa U-100: 75 unidades. Los 4 mL de Exygen hacen que las dosis de 2, 4 y 8 mg correspondan a 20, 40 y 80 unidades, números muy fáciles de leer, pero 12 mg requerirían 120 unidades y no cabrían en una sola jeringa de 1 mL.

Ninguno de esos volúmenes proviene del ensayo clínico: el ensayo estudia cantidades administradas, no establece cómo reconstituir viales comerciales de 40 mg. Por tanto, el agua debe presentarse como una elección de medición y capacidad, no como “la reconstitución del ensayo”.

## 6. Qué hace mejor cada uno

### ResearchDosing hace mejor

- Amplia cobertura editorial de compuestos, mezclas y vías de administración.
- Fichas que reúnen mecanismo, efectos adversos, interacciones, precauciones, almacenamiento, reconstitución y equivalencias.
- Guía separada y clara sobre jeringas de 30, 50 y 100 unidades.
- Tablas directas que alguien puede leer sin configurar una calculadora.
- Para el vial de 40 mg, el volumen elegido mantiene hasta 12 mg dentro de una jeringa U-100.

### Exygen hace mejor

- Calcula con la presentación, agua, dosis y jeringa reales.
- Muestra concentración, mL, unidades, dibujo de jeringa y aplicaciones por vial.
- Conserva decimales y advierte cuando una extracción es demasiado pequeña o no cabe.
- Permite que el usuario escriba su propia dosis sin convertir automáticamente el cálculo en recomendación.
- Solo enciende niveles sugeridos si el producto tiene fuente anotada.
- Muestra la fuente junto a las cifras.
- Declara expresamente que cuándo subir de nivel es una decisión clínica.
- La versión de clientes se limita a los productos comprados y permite copiar, compartir, imprimir y registrar seguimiento.

## 7. Qué deberíamos adoptar

Sin romper la regla dura de Exygen:

1. **Agregar una guía breve de preparación y jeringas**, separada de las dosis: diferencia entre 0.3, 0.5 y 1 mL; graduaciones de una o dos unidades; almacenamiento y manejo básico con fuentes verificables.
2. **Explicar el criterio del agua.** Mostrar que más agua reduce la concentración y aumenta las unidades, y que el objetivo es una lectura medible que quepa en la jeringa.
3. **Mostrar el límite de cada opción de agua.** Para 40 mg, explicar que 2.5 mL permite 12 mg en 75 unidades, mientras 4 mL hace simples 2/4/8 mg pero 12 mg no cabe en una sola U-100.
4. **Fortalecer la fuente de Retatrutida.** Enlazar directamente NEJM y ClinicalTrials.gov; identificar por separado:
   - dosis objetivo del ensayo;
   - dosis iniciales usadas en ciertos grupos;
   - frecuencia semanal;
   - volumen de agua, que es una elección técnica de medición y no una dosis del ensayo.
5. **Incluir efectos adversos e interacciones solo con fuente primaria o regulatoria**, dejando claro que Retatrutida sigue en investigación y no tiene una etiqueta regulatoria aprobada que pueda usarse como pauta.
6. **Mantener tablas listas para leer**, pero generadas por la calculadora y con decimales cuando el redondeo cambie la cantidad real.
7. **Añadir “fuente por cifra”**, no una sola frase general: cada dosis, frecuencia y afirmación importante debe poder rastrearse.

## 8. Qué no deberíamos adoptar

- No copiar 4.8 mg mientras su origen siga sin verificarse.
- No copiar 6 o 10 mg solo porque completan una secuencia visual de 2 mg.
- No publicar calendarios de cuatro semanas ni indicar cuándo aumentar.
- No recomendar ciclos, lavados o combinaciones sin evidencia verificable.
- No presentar un volumen de agua como si fuera parte del protocolo clínico.
- No redondear 12.5 unidades a 12 sin mostrar la diferencia.
- No usar un aviso “solo investigación” como sustituto de evidencia.
- No copiar afirmaciones de beneficios, contraindicaciones o desensibilización sin rastrear su fuente.
- No ocultar contenido esencial detrás de un acuerdo ambiguo.

## 9. Riesgos y puntos que Exygen debe corregir o aclarar

La regla de Exygen es superior, pero la implementación actual de Retatrutida no es todavía una trazabilidad perfecta:

- `fuente` menciona “Ensayo Fase 2” y dos sitios secundarios, pero no contiene el DOI ni enlaces completos.
- Los niveles 2/4/8 simplifican la literatura: 2 mg fue dosis inicial para determinados grupos; 4 y 8 mg sí fueron dosis objetivo; también existieron 1 y 12 mg.
- `agua_ml` fija 10 mg/mL para los viales de 5–40 mg, pero la anotación no identifica una fuente que ordene esos volúmenes.
- La palabra “fuente” puede hacer pensar que la misma referencia respalda dosis, frecuencia y agua, aunque eso no está demostrado.

Recomendación: mantener las sugerencias visibles solo después de dividir la evidencia en campos explícitos, por ejemplo `fuente_dosis`, `fuente_frecuencia` y `criterio_agua`.

## 10. Lo que no se pudo verificar

- El contenido adicional que pudiera aparecer después de aceptar la puerta privada.
- El comportamiento visual e interactivo de la puerta.
- El nombre y la versión exactos del plugin de acceso.
- La existencia de una calculadora no indexada o accesible solo tras la puerta.
- Los valores de agua para viales de 15 y 20 mg en ResearchDosing.
- Que ResearchDosing publique 4.8 mg para Retatrutida en alguna versión privada, anterior o no indexada.
- El origen exacto de los 4.8 mg mostrados por Certified-PepMex.
- Que 4.8 mg se haya elegido para producir ocho aplicaciones.
- Una fuente clínica o regulatoria para 4.8 mg de Retatrutida.
- Una fuente visible para los volúmenes de agua publicados por ResearchDosing.
- Una fuente visible para sus dosis de 6 y 10 mg, ciclos, lavados y recomendaciones de combinaciones.
- La identidad, credenciales individuales o revisión editorial de los autores de ResearchDosing.

## Fuentes consultadas

### ResearchDosing

- [Dosing Information](https://researchdosing.com/dosing-information/)
- [Retatrutide](https://researchdosing.com/retatrutide/)
- [Prep & Injection Guide](https://researchdosing.com/prep-injection-guide/)
- [About Us](https://researchdosing.com/about-us/)
- [Research Use Disclaimer](https://researchdosing.com/research-use-disclaimer/)

### Fuentes primarias de Retatrutida

- [Artículo Fase 2 en NEJM](https://www.nejm.org/doi/full/10.1056/NEJMoa2301972)
- [PubMed: PMID 37366315](https://pubmed.ncbi.nlm.nih.gov/37366315/)
- [ClinicalTrials.gov: NCT04881760](https://clinicaltrials.gov/study/NCT04881760)

### Exygen revisado

- `novapeptidos-UI/src/components/ReconstitutionCalculator.js`
- `novapeptidos-UI/src/data/fallbackCatalog.js`
