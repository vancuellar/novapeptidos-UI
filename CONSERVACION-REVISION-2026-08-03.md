# Revisión con fuentes: `/aprende/conservacion` — la recomendación de congelar alícuotas

**Fecha:** 3 de agosto de 2026
**Archivo revisado:** `src/data/learn/conservacion.js` (página `/aprende/conservacion`, "actualizado 19 de julio de 2026")
**Motivo:** el pendiente del proyecto dice *«aún recomienda congelar alícuotas (SIN RESPALDO)»*.
**Estado:** NO se modificó ningún archivo. Esto es una propuesta. Decide el dueño.

---

## 0. Veredicto en una línea

El consejo **no es un invento** —es literalmente el protocolo que publican Bachem y Thermo Fisher—
pero **está aplicado al diluyente equivocado**. Esos fabricantes disuelven el péptido en **agua estéril
o amortiguador**. Nuestra página declara ella misma (línea 120) que la columna de "reconstituido"
**asume agua bacteriostática**, que lleva **alcohol bencílico al 0.9 %**, y ese es justo el tipo de
solución que la literatura de formulación dice **que no se congele**.

O sea: la página se contradice a sí misma, y el consejo tal como está publicado puede echar a perder
material caro.

---

## 1. Qué dice hoy la página (citas textuales)

### 1.1 Tabla "Temperatura × estado" (líneas 33-44)

Fila **−20 °C**:

> `'−20 °C (congelador)'`
> `'24 a 36 meses; muchos compuestos siguen dentro de especificación más allá'`
> **`'Alícuotas de un solo uso: meses. Nunca recongelar'`**  ← columna *Reconstituido*
> `'Inventario y reserva de largo plazo. Es donde debe vivir lo que no vas a tocar este mes.'`

Fila **−80 °C**:

> `'−80 °C (ultracongelador)'`
> `'Años; el límite práctico deja de ser la temperatura'`
> **`'Alícuotas: 6 a 12 meses según compuesto'`**  ← columna *Reconstituido*

Nota al pie de esa tabla (línea 65):

> `'Regla mnemotécnica: el polvo se mide en años, la solución en semanas, el ambiente en días. Cuando dudes entre dos casillas, elige la más fría.'`

### 1.2 El ancla del problema — nota de la tabla por familia (línea 120)

> `'La columna de "reconstituido" asume agua bacteriostática, temperatura estable de 2–8 °C y protección de la luz. Cambia cualquiera de las tres condiciones y los plazos se acortan.'`

La página **ya sabe** que el diluyente es agua bacteriostática. Y aun así, en otras seis partes manda
al congelador esa misma solución.

### 1.3 Lista "Recomendado" (líneas 127 y 129)

> `'Guarda el liofilizado a −20 °C en un congelador que no tenga ciclo de descongelación automática.'` ← **correcto, es el polvo**
> **`'Alicuota antes de congelar la solución, en volúmenes que se consuman de una sola vez.'`** ← **el problema**

### 1.4 Lista "Evitar sin excepciones" (línea 144)

> `{ text: 'Ciclos repetidos de congelación y descongelación: los cristales de hielo cortan mecánicamente las cadenas y concentran solutos localmente.', bad: true }`

### 1.5 Sección completa "Alicuotar: el hábito que más material salva" (líneas 272-276)

> Título: `'Alicuotar: el hábito que más material salva'`
>
> **(274)** `'Si un vial reconstituido va a durar más de dos o tres semanas de uso, la solución no es guardarlo mejor: es no tenerlo abierto tanto tiempo. Alicuotar consiste en repartir la solución recién preparada en varios viales estériles pequeños, cada uno con el volumen de una sola sesión, y congelarlos.'`
>
> **(275)** `'La ganancia es doble. Primero, cada vial se descongela una sola vez, así que no hay ciclos repetidos de congelación. Segundo, el septo de cada alícuota se perfora una sola vez, lo que reduce a mínimos el riesgo de contaminación.'`
>
> **(276)** `'El costo es de unos minutos de trabajo adicional el día de la reconstitución, hecho en condiciones limpias y con todo etiquetado. Comparado con perder la mitad de un vial de 10 mg, la aritmética no admite discusión.'`

### 1.6 FAQ "¿Puedo congelar la solución reconstituida?" (líneas 314-316)

> `q: '¿Puedo congelar la solución reconstituida?'`
> `a: 'Sí, con una condición: alicuota primero en volúmenes de un solo uso y no recongeles nada. Un ciclo de congelación y descongelación es tolerable para la mayoría de los péptidos; tres o cuatro ya se notan como pérdida de potencia y a veces como turbidez.'`

### 1.7 FAQ "¿Sirve de algo un ultracongelador de −80 °C?" (líneas 334-336)

> `a: 'Para inventario a muy largo plazo y para alícuotas de solución, sí aporta. Para la mayoría de los laboratorios, −20 °C ya coloca la degradación por debajo del umbral que importa, y el dinero rinde más invirtiéndolo en un termómetro con registro, viales ámbar y disciplina de etiquetado que en el equipo.'`

### 1.8 Callout final "Lo que hay que recordar" (línea 345)

> `'Seco y congelado dura años; frío y en solución dura semanas; templado dura días. Alicuota antes de congelar, protege de la luz, no agites, fecha todos los viales y desecha ante cualquier duda. Con eso resuelves el noventa por ciento de las pérdidas de material.'`

**Total: 8 lugares que empujan a congelar la solución reconstituida.**

---

## 2. Qué dice la evidencia

### 2.1 Lo que SÍ respalda "alicuotar y congelar" — pero con OTRO diluyente

**Bachem** (fabricante suizo de péptidos, fuente primaria), *Handling and Storage Guidelines for Peptides*:

> "For storage, peptide solutions should be aliquoted and kept frozen below −15 °C."
> "The long-term storage of peptide solutions is not recommended, especially when the peptide contains Asn, Gln, Cys, Met, or Trp residues."

**Thermo Fisher Scientific**, *Handling and Storage Instruction — Custom Peptides* (PDF oficial):

> "Upon receipt, please prepare single-use aliquots (if necessary) and store the products immediately at –20°C."
> **"Always use sterile water or buffer (PBS, Tris or phosphate, pH 7) for preparation of solutions."**
> "Peptide solutions should be used up immediately as they are unstable (the lower the concentration, the more unstable)."
> "Repeated thawing and freezing must be avoided. **Any remaining solutions should be re-lyophilized for longer storage.**"

👉 **Conclusión:** el protocolo de alicuotar-y-congelar es real y es estándar de industria.
Pero el disolvente que esos protocolos suponen es **agua estéril o amortiguador**, nunca agua
bacteriostática. Ninguna de las dos guías menciona conservadores. Así que el pendiente que decía
"SIN RESPALDO" es **medio cierto**: respaldo hay, pero no para nuestro caso de uso.

### 2.2 Lo que CONTRADICE congelar agua bacteriostática

**(a) Fuente primaria, revisada por pares, directa al punto:**

Xu ZT, Yang CH, Liu W, Qian C, Fang WJ. *"Benzyl alcohol exacerbates freeze–thaw-induced aggregation
of trastuzumab: elucidating mechanisms and formulation implications for clinical practice."*
**International Journal of Pharmaceutics**, vol. 688 (2026), art. 126433.
DOI 10.1016/j.ijpharm.2025.126433 · PMID 41325828.

Del resumen, textual:

> "Key findings revealed severe destabilization of trastuzumab upon freeze-thaw cycles, with benzyl
> alcohol **synergistically exacerbating damage** through three mechanisms: disruption of higher-order
> structure in solution; **cryoconcentration-enhanced benzyl alcohol interactions during freezing**
> coupled with micro-ice crystal formation; and thawing-induced stresses including interfacial
> exposure and methionine oxidation."
>
> **"The study emphasizes avoiding frozen storage of benzyl alcohol-containing biologics and
> maintaining reconstituted products at 2–8 °C."**

Esa última frase es exactamente lo contrario de lo que dice nuestra página.

**(b) El alcohol bencílico daña aun SIN congelar:**

Zhang Y, Roy S, Jones LS, Krishnan S, Kerwin BA, Chang BS, Manning MC, Randolph TW, Carpenter JF.
*"Mechanism for benzyl alcohol-induced aggregation of recombinant human interleukin-1 receptor
antagonist in aqueous solution."* **J Pharm Sci**, 2004. PMID 15514986 · DOI 10.1002/jps.20219.

> "benzyl alcohol caused minor perturbation of the tertiary structure of the protein without changing
> its secondary structure" — interactúa por vía hidrofóbica y **favorece estados parcialmente
> desplegados propensos a agregar**.

Roy S. *et al.*, *"Effects of benzyl alcohol on aggregation of recombinant human interleukin-1-receptor
antagonist in reconstituted lyophilized formulations."* **J Pharm Sci**, 2005. PMID 15614819.

> "Reconstitution of dried solids with 0.9% benzyl alcohol caused a **greater degree of protein
> aggregation than reconstitution with water**."

**(c) Mecanismo físico, comprobable con números:**

- Punto de fusión del alcohol bencílico: **−15.2 °C**. A −20 °C en el congelador, el conservador puro
  está **sólido**.
- Solubilidad en agua: **3.5 g/100 mL a 20 °C**, 4.29 g/100 mL a 25 °C.
- El agua bacteriostática lo lleva al **0.9 g/100 mL**, o sea a una cuarta parte de la saturación.

Al congelarse, el agua se va a hielo y todo lo demás queda apretado en la fracción líquida que sobra
(**criocongelación / cryoconcentration**). Ese factor de concentración es de varias veces, así que el
alcohol bencílico rebasa su límite de solubilidad y **se separa en fase**: deja de estar repartido
parejo. Ese es el mecanismo que el trabajo de Xu 2026 mide directamente.

Literatura general de congelación de proteínas (revisiones sobre *freeze-concentration* y desnaturalización
en la interfaz hielo-agua) coincide en los mecanismos: criocongelación, cristalización de sales
amortiguadoras con **saltos de pH de 2.8 a 3.9 unidades** al bajar de 4 °C a −20 °C, y adsorción /
despliegue de las cadenas en la superficie del hielo.

**(d) La etiqueta del propio diluyente:**

*Bacteriostatic Water for Injection, USP* (Hospira / Pfizer, ficha en DailyMed): agua para inyección con
**0.9 % (9 mg/mL) de alcohol bencílico como conservador**, con instrucción de guardar a
**20–25 °C, temperatura ambiente controlada USP**. No es un producto de congelador.

**(e) La etiqueta de un péptido real de las familias que vendemos:**

FDA · OZEMPIC (semaglutida), *Prescribing Information*, sección 16 — textual:

> "Prior to first use, the OZEMPIC® pen should be stored in a refrigerator between 2°C to 8°C.
> **Do not store in the freezer** or directly adjacent to the refrigerator cooling element.
> **Do not freeze OZEMPIC® and do not use OZEMPIC® if it has been frozen.**"
>
> "After first use of the OZEMPIC® pen, the pen can be stored for **56 days** at controlled room
> temperature 15°C to 30°C or in a refrigerator 2°C to 8°C. **Do not freeze.**"

Es el análogo comercial más cercano a lo que vendemos —un péptido GLP-1, en solución acuosa, en un
vial de múltiples entradas— y el fabricante prohíbe congelarlo en términos absolutos. Nuestra propia
tabla por familia (línea 87) ya pone GLP-1 en "2–8 °C, 3 a 4 semanas", coherente con esto. Pero la
tabla general de arriba (línea 36) manda al congelador.

**(f) El estándar que respalda nuestra ventana de semanas:**

USP ⟨797⟩ *Pharmaceutical Compounding — Sterile Preparations*: un envase multidosis **con conservador
antimicrobiano**, una vez perforado, tiene una fecha límite de uso de **28 días**, sujeto a la prueba de
eficacia antimicrobiana USP ⟨51⟩.

👉 Esos 28 días son **exactamente** la ventana de "2 a 4 semanas" que ya trae nuestra página. Esa parte
está bien y **no hay que tocarla**. Es más: son la razón por la que alicuotar no compra nada aquí —
el conservador ya cubre múltiples perforaciones del mismo vial durante 28 días.

### 2.3 researchdosing.com (fuente válida del proyecto)

Coincide con la corrección propuesta y es más restrictivo que nuestra página en lo de congelar:

- Recomienda **no congelar de rutina** la solución reconstituida.
- Si de plano se va a guardar más de 1–2 meses, dice usar **una solución amortiguada (pH 5–6) en lugar
  de agua bacteriostática**, y congelar **una sola vez**.
- Los ciclos repetidos de congelación-descongelación son *«one of the fastest way to diminish the
  efficacy of your peptides»*.
- Solución refrigerada: **60–90 días** para la mayoría (30–45 para NAD+ y AOD-9604) — más generoso que
  nuestras 2–4 semanas.
- Guardar en recipientes opacos y herméticos, y **nunca en la puerta del refrigerador**.
- Al comprar varios viales, reconstituir **uno solo** y dejar el resto en frío.

👉 Ese último punto es la recomendación correcta y nuestra página **no la tiene**.

### 2.4 Distinción de calidad de fuentes (importante)

| Nivel | Fuentes usadas |
|---|---|
| **Primaria — revisada por pares** | Xu 2026 (Int J Pharm), Zhang 2004 y Roy 2005 (J Pharm Sci) |
| **Primaria — regulatoria / normativa** | Etiqueta FDA de Ozempic §16, etiqueta USP de Bacteriostatic Water for Injection, USP ⟨797⟩ y ⟨51⟩ |
| **Primaria — fabricante de péptidos** | Bachem, Thermo Fisher (PDF oficial), GenScript (no respondió, se cita a través de su guía pública) |
| **Fuente del proyecto** | researchdosing.com |
| **NO usado como evidencia** | foros, blogs de tiendas de péptidos, resúmenes de vendedores. Aparecieron en las búsquedas y **coinciden** con la conclusión, pero no sostienen nada por sí solos. |

---

## 3. Qué está derechamente MAL y puede costarle material al cliente

Ordenado por gravedad.

### 🔴 1 — La FAQ contesta "Sí" a una pregunta cuya respuesta es "mejor no" (líneas 314-316)

Es lo peor de la página, porque es la pregunta exacta que hace el cliente y recibe un sí rotundo.
Un cliente que congela su vial de semaglutida o tirzepatida reconstituida en agua bacteriostática
está haciendo justo lo que el fabricante del análogo comercial prohíbe por escrito.

### 🔴 2 — Fila −20 °C de la tabla principal (línea 36): "Alícuotas de un solo uso: meses"

Le promete **meses** de vida a una solución con conservador metida al congelador. Ni Bachem
(que habla de semanas y desaconseja el almacenamiento largo en solución) ni la evidencia de alcohol
bencílico sostienen eso con este diluyente.

### 🟠 3 — Contradicción interna, y la página no la resuelve

La línea 120 declara agua bacteriostática. Las líneas 36, 42, 129, 274, 316, 336 y 345 mandan a
congelar. Un cliente atento se da cuenta y pierde confianza en toda la guía.

### 🟠 4 — El mecanismo citado en la línea 144 es falso

> *«los cristales de hielo cortan mecánicamente las cadenas»*

El hielo **no corta enlaces covalentes**. Los mecanismos reales, documentados, son:
adsorción y despliegue en la interfaz hielo-agua, criocongelación de solutos, saltos de pH por
cristalización de sales, y —con este diluyente— la separación de fase del alcohol bencílico.
No es peligroso, pero es el argumento con el que la página justifica todo lo demás, y es incorrecto.

### 🟠 5 — El "beneficio doble" de alicuotar es medio falso (línea 275)

> *«el septo de cada alícuota se perfora una sola vez, lo que reduce a mínimos el riesgo de contaminación»*

Al revés. El agua bacteriostática existe **precisamente** para tolerar perforaciones repetidas
(USP ⟨797⟩: 28 días). Trasvasar solución a otros viales fuera de una campana de flujo laminar
—que el cliente no tiene— **abre el sistema cerrado** y añade el riesgo que se dice evitar. La página
además da por hecho que el cliente tiene viales estériles vacíos a la mano.

### 🟡 6 — "Guardar solución reconstituida a temperatura ambiente más de un día" está en "Evitar SIN EXCEPCIONES" (línea 147)

Es demasiado tajante y **hace que el cliente tire material bueno**. La etiqueta de Ozempic permite
56 días a 15–30 °C después de la primera entrada. Un olvido de una noche no arruina un vial;
convertirlo en costumbre sí. Como está redactado, un cliente que dejó el vial fuera se siente
obligado a desecharlo.

### 🟡 7 — La nota mnemotécnica (línea 65) remata con "elige la más fría"

Aplicada a la columna de solución, empuja al congelador. Contradice la corrección.

---

## 4. Correcciones propuestas — texto listo para pegar

> Nota de estilo: nada de esto menciona administración, dosis ni pautas en personas; nada dice la
> frase prohibida; nada menciona herramientas de IA. Todo es manejo de material.

### ✏️ EDICIÓN 1 — línea 36 · tabla principal, fila −20 °C, columna *Reconstituido*

**Hoy:**
```
'Alícuotas de un solo uso: meses. Nunca recongelar',
```
**Propuesto:**
```
'No recomendado con agua bacteriostática. Solo con agua estéril o amortiguador sin conservador, en alícuotas de un solo uso',
```
*Fuente:* Xu 2026 (Int J Pharm 688:126433) · Thermo Fisher, guía de manejo de péptidos personalizados.

---

### ✏️ EDICIÓN 2 — línea 37 · misma fila, columna *Uso recomendado*

**Hoy:**
```
'Inventario y reserva de largo plazo. Es donde debe vivir lo que no vas a tocar este mes.',
```
**Propuesto:**
```
'Inventario y reserva de largo plazo, en polvo. Es donde debe vivir el vial que no vas a reconstituir este mes.',
```
*Fuente:* Bachem, *Handling and Storage Guidelines* · Thermo Fisher (*"any remaining solutions should be re-lyophilized for longer storage"*).

---

### ✏️ EDICIÓN 3 — línea 42 · fila −80 °C, columna *Reconstituido*

**Hoy:**
```
'Alícuotas: 6 a 12 meses según compuesto',
```
**Propuesto:**
```
'Mismo criterio que −20 °C: solo sin conservador y en alícuotas de un solo uso',
```
*Fuente:* igual que edición 1. El problema no es cuán frío está: es congelar.

---

### ✏️ EDICIÓN 4 — línea 65 · nota al pie de la tabla principal

**Hoy:**
```
'Regla mnemotécnica: el polvo se mide en años, la solución en semanas, el ambiente en días. Cuando dudes entre dos casillas, elige la más fría.',
```
**Propuesto:**
```
'Regla mnemotécnica: el polvo se mide en años, la solución en semanas, el ambiente en días. El congelador es para el polvo; la solución reconstituida vive en el refrigerador.',
```
*Fuente:* Xu 2026 · etiqueta FDA de Ozempic §16.

---

### ✏️ EDICIÓN 5 — línea 120 · nota de la tabla por familia (añadir una frase al final)

**Hoy:**
```
'La columna de "reconstituido" asume agua bacteriostática, temperatura estable de 2–8 °C y protección de la luz. Cambia cualquiera de las tres condiciones y los plazos se acortan.',
```
**Propuesto:**
```
'La columna de "reconstituido" asume agua bacteriostática, temperatura estable de 2–8 °C y protección de la luz. Cambia cualquiera de las tres condiciones y los plazos se acortan. El alcohol bencílico que lleva ese diluyente es también el motivo por el que esa solución no va al congelador.',
```
*Fuente:* etiqueta USP de Bacteriostatic Water for Injection (0.9 % de alcohol bencílico, guardar a 20–25 °C) · Xu 2026.

---

### ✏️ EDICIÓN 6 — línea 129 · lista "Recomendado"

**Hoy:**
```
'Alicuota antes de congelar la solución, en volúmenes que se consuman de una sola vez.',
```
**Propuesto:**
```
'Reconstituye un vial a la vez y deja el resto en polvo: conservar polvo es fácil, conservar solución no.',
```
*Fuente:* researchdosing.com (reconstituir un solo vial y guardar los demás en frío) · Thermo Fisher.

---

### ✏️ EDICIÓN 7 — línea 144 · lista "Evitar sin excepciones"

**Hoy:**
```
{ text: 'Ciclos repetidos de congelación y descongelación: los cristales de hielo cortan mecánicamente las cadenas y concentran solutos localmente.', bad: true },
```
**Propuesto (reemplaza, y corrige el mecanismo):**
```
{ text: 'Congelar la solución reconstituida en agua bacteriostática: el conservador se concentra y se separa de forma despareja al formarse el hielo, y la interfaz hielo-agua despliega y agrega las cadenas. Si ya está reconstituida, va al refrigerador.', bad: true },
```
*Fuente:* Xu 2026 (criocongelación + microcristales de hielo + oxidación de metionina al descongelar) · propiedades físicas del alcohol bencílico (funde a −15.2 °C; solubilidad 3.5 g/100 mL a 20 °C frente al 0.9 % de la formulación).

---

### ✏️ EDICIÓN 8 — línea 144 (bis) · **añadir** un renglón nuevo justo después

```
{ text: 'Congelar y descongelar la misma solución más de una vez, sea cual sea el diluyente: cada ciclo suma agregación y no se revierte.', bad: true },
```
*Fuente:* Thermo Fisher (*"Repeated thawing and freezing must be avoided"*) · researchdosing.com.

---

### ✏️ EDICIÓN 9 — línea 147 · suavizar el renglón de temperatura ambiente

**Hoy:**
```
{ text: 'Guardar solución reconstituida a temperatura ambiente más de un día.', bad: true },
```
**Propuesto:**
```
{ text: 'Dejar la solución reconstituida fuera del refrigerador como rutina. Un olvido de unas horas rara vez arruina el vial: anótalo y sigue. Lo que cobra factura es que se vuelva costumbre.', bad: true },
```
*Fuente:* etiqueta FDA de Ozempic §16 (56 días a 15–30 °C tras la primera entrada). Evita que el cliente tire material bueno por un descuido.

---

### ✏️ EDICIÓN 10 — líneas 272-276 · **reescribir la sección completa**

**Título hoy:** `'Alicuotar: el hábito que más material salva'`
**Título propuesto:** `'Alicuotar: cuándo sirve de verdad y cuándo estorba'`

**Párrafos propuestos (reemplazan los tres actuales):**

```
'Alicuotar es repartir la solución recién preparada en varios recipientes estériles, cada uno con lo de una sola sesión. En un laboratorio que disuelve el péptido en agua estéril o en un amortiguador sin conservador y lo guarda congelado, es la práctica estándar: los fabricantes de péptidos recomiendan exactamente eso, alicuotar y mantener por debajo de −15 °C, para que ninguna porción pase por más de un ciclo de congelación.',

'Con agua bacteriostática la cuenta cambia. Ese diluyente lleva alcohol bencílico al 0.9 %, y su razón de ser es justamente permitir que el mismo vial se perfore muchas veces sin contaminarse. Ahí alicuotar no compra protección: la protección ya viene en el diluyente. Y trasvasar solución de un vial a otro fuera de una campana de flujo laminar abre el sistema cerrado y suma el riesgo que se pretendía evitar. Además, al congelarse, ese conservador se concentra en la poca agua que queda líquida y deja de estar repartido parejo.',

'La regla práctica es más simple que alicuotar: reconstituye un vial a la vez y deja los demás en polvo a −20 °C. El polvo aguanta años; la solución, semanas. Si de verdad necesitas guardar solución más de un mes, entonces no uses agua bacteriostática: usa agua estéril o un amortiguador sin conservador, reparte en alícuotas de un solo uso y congela una sola vez. Y si te sobra material del que no vas a alcanzar a usar, comprar dos viales chicos en lugar de uno grande sale más barato que tirar la mitad del grande.',
```

*Fuentes:* Bachem (*"peptide solutions should be aliquoted and kept frozen below −15 °C"*) · Thermo Fisher (*"always use sterile water or buffer"* + *"prepare single-use aliquots… store at −20 °C"*) · Xu 2026 · USP ⟨797⟩ (28 días para envase multidosis con conservador) · researchdosing.com (amortiguador pH 5–6 si se va a congelar, y congelar una sola vez).

---

### ✏️ EDICIÓN 11 — líneas 314-316 · FAQ "¿Puedo congelar la solución reconstituida?"

**Hoy:**
```
a: 'Sí, con una condición: alicuota primero en volúmenes de un solo uso y no recongeles nada. Un ciclo de congelación y descongelación es tolerable para la mayoría de los péptidos; tres o cuatro ya se notan como pérdida de potencia y a veces como turbidez.',
```
**Propuesto:**
```
a: 'Si la reconstituiste con agua bacteriostática, mejor no. Ese diluyente lleva alcohol bencílico al 0.9 %, y la congelación lo empeora todo: al formarse el hielo, el conservador queda apretado en la poca agua que sigue líquida, se reparte de forma despareja y favorece que las cadenas se agreguen. La literatura de formulación es explícita en evitar el almacenamiento congelado de preparaciones con alcohol bencílico y mantenerlas entre 2 y 8 °C. Guárdala en el refrigerador y respeta la ventana de semanas. Congelar solución solo tiene sentido con agua estéril o un amortiguador sin conservador, en alícuotas de un solo uso y una sola congelación.',
```
*Fuente:* Xu ZT *et al.*, Int J Pharm 688 (2026) 126433, PMID 41325828 — *"The study emphasizes avoiding frozen storage of benzyl alcohol-containing biologics and maintaining reconstituted products at 2–8 °C."*

---

### ✏️ EDICIÓN 12 — líneas 334-336 · FAQ "¿Sirve de algo un ultracongelador de −80 °C?"

**Hoy:**
```
a: 'Para inventario a muy largo plazo y para alícuotas de solución, sí aporta. …',
```
**Propuesto:**
```
a: 'Para inventario en polvo a muy largo plazo, sí aporta. Para solución reconstituida en agua bacteriostática, no: el problema no es qué tan frío está el congelador, es congelar. Para la mayoría de los laboratorios, −20 °C ya coloca la degradación del polvo por debajo del umbral que importa, y el dinero rinde más invirtiéndolo en un termómetro con registro, viales ámbar y disciplina de etiquetado que en el equipo.',
```
*Fuente:* Xu 2026 · Bachem.

---

### ✏️ EDICIÓN 13 — línea 345 · callout final "Lo que hay que recordar"

**Hoy:**
```
'Seco y congelado dura años; frío y en solución dura semanas; templado dura días. Alicuota antes de congelar, protege de la luz, no agites, fecha todos los viales y desecha ante cualquier duda. Con eso resuelves el noventa por ciento de las pérdidas de material.',
```
**Propuesto:**
```
'Seco y congelado dura años; frío y en solución dura semanas; templado dura días. El polvo al congelador y la solución al refrigerador, nunca al revés. Reconstituye un vial a la vez, protege de la luz, no agites, fecha todos los viales y desecha ante cualquier duda. Con eso resuelves el noventa por ciento de las pérdidas de material.',
```
*Fuente:* síntesis de todo lo anterior.

---

### 🔎 Revisar de paso (no urgente)

- Línea 292 y línea 362: la tarjeta y el enlace a la **Calculadora** hablan de "alícuotas".
  Si se aprueba la edición 10, conviene revisar que la calculadora no siga sugiriendo alicuotar
  para congelar. No es un error de esta página, pero queda inconsistente.
- Línea 287 (`/aprende/reconstitucion-paso-a-paso`): **hay que revisar esa página también**, porque
  es donde probablemente vive el mismo consejo, y esta guía la enlaza dos veces.

---

## 5. Respuesta directa a las 4 preguntas

**1. ¿Es correcto congelar péptidos reconstituidos en agua bacteriostática?**
No. Sí hay un problema específico y está medido: la congelación concentra el alcohol bencílico en la
fracción de agua que no llega a congelarse (criocongelación), y a esa concentración el conservador
—que funde a −15.2 °C y solo se disuelve hasta ~3.5 g/100 mL— se separa de fase y deja de estar
repartido parejo. El resultado documentado es **más agregación**, no menos, y el efecto bacteriostático
deja de estar garantizado en todo el volumen. Al descongelar se suman exposición interfacial y
oxidación de metionina.

**2. ¿Qué dicen las fuentes serias?**
Bachem, Thermo Fisher y GenScript sí dicen "alicuotar y congelar por debajo de −15 / −20 °C", pero
sobre soluciones en **agua estéril o amortiguador**, y Thermo agrega explícitamente que si sobra
solución para guardar largo, se vuelve a liofilizar. La literatura revisada por pares sobre alcohol
bencílico (Xu 2026; Zhang 2004; Roy 2005) va en el sentido contrario para nuestro diluyente. La
etiqueta FDA de un GLP-1 comercial dice "no congelar" sin matices. Los foros y blogs de tiendas
coinciden, pero no cuentan como evidencia.

**3. researchdosing.com** coincide: desaconseja congelar de rutina, y si hay que congelar, dice cambiar
a amortiguador pH 5–6 y congelar una sola vez. También aporta el consejo que nos falta: reconstituir
un solo vial y dejar el resto sin tocar.

**4. ¿Cuál es la recomendación correcta?**

| Cuánto va a durar | Qué hacer |
|---|---|
| **2 a 4 semanas** | **Refrigerar a 2–8 °C.** No congelar. Al fondo del estante, nunca en la puerta, en su caja o en vial ámbar, y con la fecha escrita. |
| **Más de un mes** | **No lo tengas en solución.** Reconstituye un vial a la vez y deja el resto en polvo a −20 °C. |
| **Si de plano hay que congelar solución** | Solo con **agua estéril o amortiguador sin conservador** (no agua bacteriostática), en alícuotas de un solo uso, **una sola congelación**. |

**¿Alicuotar sirve o es consejo copiado?** Sirve **de verdad** en el escenario de congelador con
diluyente sin conservador — es protocolo publicado por fabricantes, no un mito. Pero **aplicado al
agua bacteriostática en un refrigerador doméstico no aporta nada y resta**: el conservador ya cubre
las perforaciones repetidas durante 28 días, y el trasvase abre el sistema. En nuestro caso, el
consejo correcto es reconstituir de a un vial, no alicuotar.

---

## 6. Fuentes

**Revisadas por pares**
1. Xu ZT, Yang CH, Liu W, Qian C, Fang WJ. *Benzyl alcohol exacerbates freeze–thaw-induced aggregation of trastuzumab: elucidating mechanisms and formulation implications for clinical practice.* Int J Pharm 688 (2026) 126433. DOI 10.1016/j.ijpharm.2025.126433 · PMID 41325828.
2. Zhang Y, Roy S, Jones LS, *et al.* *Mechanism for benzyl alcohol-induced aggregation of recombinant human interleukin-1 receptor antagonist in aqueous solution.* J Pharm Sci, 2004. PMID 15514986 · DOI 10.1002/jps.20219.
3. Roy S, *et al.* *Effects of benzyl alcohol on aggregation of recombinant human interleukin-1-receptor antagonist in reconstituted lyophilized formulations.* J Pharm Sci, 2005. PMID 15614819.
4. Literatura de revisión sobre criocongelación, desnaturalización en la interfaz hielo-agua y saltos de pH por cristalización de amortiguadores durante la congelación (Int J Pharm / Eur J Pharm Biopharm).

**Regulatorias y normativas**
5. FDA · Novo Nordisk. *OZEMPIC (semaglutide) injection — Prescribing Information*, §16 *How Supplied/Storage and Handling*. https://www.novo-pi.com/ozempic.pdf
6. DailyMed · Hospira/Pfizer. *Bacteriostatic Water for Injection, USP* — 0.9 % de alcohol bencílico; conservar a 20–25 °C. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=87d6e9dc-fe3b-4593-ac9a-d7493d1959c7
7. USP ⟨797⟩ *Pharmaceutical Compounding — Sterile Preparations* (fecha límite de uso de 28 días para envase multidosis con conservador) y USP ⟨51⟩ *Antimicrobial Effectiveness Testing*.

**Fabricantes de péptidos**
8. Bachem. *Handling and Storage Guidelines for Peptides.* https://www.bachem.com/knowledge-center/peptide-guide/handling-and-storage-guidelines-for-peptides/
9. Bachem. *Care and Handling of Peptides* (nota técnica).
10. Thermo Fisher Scientific. *Handling and Storage Instruction — Custom Peptides* (PDF). https://documents.thermofisher.com/TFS-Assets/BID/Reference-Materials/handling-storage-instructions-custom-peptides.pdf
11. GenScript. *Peptide Storage and Handling Guidelines.* https://www.genscript.com/peptide_storage_and_handling.html
12. Sigma-Aldrich / Merck. *Handling and Storage Guidelines for Peptides and Proteins* y *Storage and Handling — Synthetic Peptides Guidelines* (PDF).

**Propiedades físicas**
13. Alcohol bencílico: punto de fusión −15.2 °C; solubilidad en agua 3.5 g/100 mL (20 °C), 4.29 g/100 mL (25 °C).

**Fuente del proyecto**
14. researchdosing.com — guía de preparación y almacenamiento.
