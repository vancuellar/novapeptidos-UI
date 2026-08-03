# 🤝 HANDOFF MAESTRO — 3 de agosto de 2026 (mañana)

**Estado:** backend desplegado con el techo de comisiones · motor `51eaa15` ·
sitio: ⚠️ el último despliegue quedó CORRIENDO al cerrar la sesión — **lo primero que
hay que hacer es comprobar que el sitio en vivo trae los rangos corregidos**
(`curl -s https://exygenlabs.com/ | grep -oE "main\.[a-f0-9]+\.js"` y comparar).
Compuertas del cierre: backend **1,408 pruebas** · motor **425** · auditoría del sitio
**95/0**.

## ✅ LO CERRADO ESTA SESIÓN (además del handoff anterior, que sigue abajo)

**COMISIONES — techo de 35% y dos niveles secretos** (`pyramid.py`).
Decisión de Christián en dos tiempos: primero «topar las comisiones a 35% máximo», y
después «dejar Elite y Diamond, pero como secretos desbloqueables».
- Escalera **VISIBLE**: junior0 30 · junior1 30 · senior 30 · **master 35**.
- **SECRETOS** (no se anuncian, los otorga Christián): **elite 40 · diamond 43**.
- Excepción por persona: **María Neunfeld**, emparejada por CORREO y no por nombre.
  Vive en una lista a la vista (`SIN_TECHO`) para poder auditar quién pasa el techo.
- El techo se aplica **al final** de `effective_rate`, después del nivel y de la tasa
  manual: si no, el panel de admin sería la puerta por la que alguien cobra 50%.
- ⚠️ CAMBIO REAL: una manual de 40% en nivel visible ahora paga 35%, y un vendedor
  con manual de 40% que da 35% de descuento ya no se queda 5 puntos sino CERO.
  Cinco pruebas viejas se actualizaron con su razón escrita.

**POR QUÉ 35% Y NO OTRA COSA** (se midió antes de decidir, con el ROI CON TODO):
63 de 188 productos no llegaban al piso de 5×. Cashback 3%→1% rescataba **2**;
techo 35% rescataba **5**; las dos juntas **11**. Christián eligió el techo y **dejó
el cashback en 3%**: el cashback lo ve todo cliente y recortarlo se sentía en toda la
tienda para rescatar dos renglones.
⛔ **PENDIENTE DE DECISIÓN**: la tercera vía, que es la que de verdad resuelve —bajar
la comisión producto por producto hasta donde cada uno aguante— deja **125 sin tocar,
57 salvados y sólo 6 fuera del canal** (ácido acético 3/5/10 ml, agua bacteriostática
3 ml, HGH 191AA 10 y 12 IU: casi todos insumos, donde el flete se come el margen).
Los 6 tienen flete DECLARADO, así que la decisión se sostiene con datos reales.

**EL 5% DE CRIPTO, AHORA VISIBLE.** Christián lo cachó: elegía cripto y el total no
bajaba. El servidor SÍ lo cobraba; lo que faltaba era que la pantalla lo restara.
- **Se RESTA** en el checkout, con su renglón «Pago en cripto (−5%)».
- **Se ANUNCIA** en carrito, hoja de cotización y mensaje de WhatsApp: ahí todavía no
  hay método de pago, y descontar algo no elegido sería prometer un total que la caja
  no va a cobrar.
- Verificado en vivo: $4,723 → **$4,487**.
- Se encadena, no se suma: primero el descuento comercial y el 5% sobre lo que queda
  (25%+5% encadenado = 28.75% efectivo, **$125 a favor de la casa** en $10,000).
- El naranja **#F7931A** (Bitcoin) va a pelo y no como variable del tema: no es color
  de marca, es el de una moneda, y debe verse igual en claro y en oscuro.
⛔ SI SE APAGA `descuento_cripto.py`, HAY QUE APAGAR LAS CUATRO PANTALLAS EL MISMO DÍA.

**HERO**: cuarto dato = **5% · Extra pagando en cripto**, en blanco y ABRIENDO la fila
(Christián: «que sea un número en lugar de texto», y el azul se reserva para la pureza).
Queda: 5% · 187 · 3–5 días · ≥99%.

**FICHA**: la foto se abre en grande **con acercar y alejar** (1× a 3× en pasos de
0.5×, se cierra con fondo/✕/Escape) · franja del 5% en naranja Bitcoin · sello
«Compra segura» sin logos de marca (usarlos sin licencia es un problema que no hace
falta tener).

**RANGOS DE PRESENTACIÓN — el síntoma y la causa.**
`alta_producto.py` recalculaba el rango «5 mg – 20 mg» SÓLO al dar de alta un producto
nuevo; al AGREGARLE una presentación a uno existente actualizaba el precio y se
olvidaba del rango. Pinealon anunciaba «5 mg – 10 mg» con variantes hasta 20 mg;
Retatrutida «10 mg – 100 mg» llegando a 120; HCG empezaba en 2,000 IU teniendo 1,000.
Corregidos los 3 y arreglada la causa (`rango_de_presentaciones`, ordena por mg porque
una presentación nueva puede entrar EN MEDIO). Barrido de los 50 productos con más de
una variante: cero desfasados.

**/aprende — la solución reconstituida NO va al congelador.** Las dos guías
(conservación y reconstitución) mandaban a congelar en diez lugares y la FAQ contestaba
«Sí». Con agua bacteriostática (0.9% de alcohol bencílico) la congelación concentra el
conservador y agrava la agregación: Xu ZT et al., Int J Pharm 688:126433 (2026), PMID
41325828 — ⚠️ es sobre un anticuerpo monoclonal, no un péptido, y así queda dicho — más
la etiqueta FDA de Ozempic §16 «Do not freeze». También se quitó un error de ciencia
(«los cristales de hielo CORTAN las cadenas»: el hielo no rompe enlaces) y se suavizó
el renglón que hacía tirar material bueno por un olvido de horas.
Y DOS PREGUNTAS NUEVAS del caso que señaló Christián: el vial grande que no se acaba de
una vez (porque se toma en porciones mayores o se reparte) y la cuenta honesta de
cuándo conviene un vial grande y cuándo dos medianos.

**PESOS DE ENVÍO REALES** (208 productos). El vial es casi puro vidrio: masas de la
norma ISO 8362-1 publicadas por SCHOTT (2R 4.4 g, 3R 5.5 g, 10R 9.5 g) más cierre,
etiqueta y burbuja. Un vial de 10 mg pasa de 50 g supuestos a **9 g**.
⚠️ **No cambia lo que se paga hoy**: para 1, 3 y 10 viales la paquetería cobra su
mínimo de 1 kg igual. El cambio empieza a los **21 viales**. Lo que sí vale desde ya:
el paquete reporta **peso facturable** (el mayor entre real y volumétrico) y dar de
alta sin peso **avisa** en vez de estimar en silencio. `datos/envios_reales.csv` está
VACÍO: no hay ni un envío real registrado con peso facturado.

**PROVEEDORES.** 5 de los 20 sin lista quedaron indexados (**381 precios**); los otros
15 no tienen qué leer (nueve nunca mandaron precio, dos son duplicados de otros ya
cargados, el resto no dice si es por vial o por caja). **RT40-185(b) resultó ser el
MISMO catálogo que Jess** (227 renglones idénticos). Sólo dos costos mejoran de verdad:
Cerebrolysin 60 mg (−$174/caja) y ACE-031 (−$35/caja).

**YANG (+852, Hong Kong) — de alta como P48 con 173 precios, en estado OBSERVADO.**
Estado NUEVO que no existía (antes sólo «limpio» o «vetado»): a Yang **sí se le puede
comprar, pero NO puede fijar nuestro costo** mientras nadie le haya comprado — el motor
lo salta y grita cuando lo hace. Sería el más barato en sólo 2 de 207 productos.
⛔ Sus banderas: los 18 COAs son de **«Onyx Research»** (un cliente suyo; él escribió
«We have COAs from customer feedback»), el archivo `Ipamorelin 10mg (2).pdf` trae el
lote **ONRESSEM404** — un COA de SEMAGLUTIDA con nombre de Ipamorelina —, y no contestó
si reembolsa ni si acepta PayPal. A FAVOR: precio en el puesto 4 de 26 en RT 40 mg,
**único que ofrece muestras** (7 viales por $50 de envío) y **único que ofrece las tapas
flip-off del color de la casa**.
⛔ SI SE LE PRUEBA: las muestras llegan A CHRISTIÁN primero, NUNCA directo a Vanguard
(muestra dorada: si él elige qué se analiza, el COA no dice nada del pedido comercial).

**PNC-27 10 mg dado de alta** a **$3,139** (no a los $2,909 calculados: Exoma sí lo
vende, así que mandó la regla normal y no la ley de volumen). ROI 6.75x con todo.
**SLU-PP-332 10 mg NO se dio de alta**: sólo Yang lo hace viable.

**NEXAPH auditado**: no es proveedor, es tienda al público. 4.25x más caro, cero de 43.
Lo bueno que sí tiene: verifica cada lote con **Janoshik** — idea para copiar.

## 📋 PENDIENTES

**Decisiones de Christián:**
1. ⛔ **CAMBIAR LA CONTRASEÑA DE ADMIN** — `Exygenlabs2026` viajó por chat el 3-ago y
   pudo usarse para registrarse en el portal de Nexaph. **Lo más urgente de la lista.**
2. **Las comisiones producto por producto** (57 salvados / 6 fuera del canal, arriba).
3. **AHK-Cu 20 mg**: no cabe sin subir antes el de 50 mg ($889 → ~$1,400).
4. **5 familias con la escalera torcida**: HCG, HGH, HGH Fragment, L-Carnitine, MOTS-c.
5. **Glutatión 600**, **Semaglutida 50 mg**, **HGH hacia arriba** (del handoff anterior).

**Trabajo:**
6. **Huecos de catálogo**: Survodutida 2 y 5 mg, Dulaglutida 5 mg, **PDA** y el
   **Deadpool Blend** (BPC-157/TB4/Cartalax) — sólo Nexaph lo cotiza y a precio caro:
   hay que buscarlo con otro proveedor.
7. **142 productos que los proveedores ofrecen y no vendemos** (`oportunidades.py`).
   ⚠️ ~16% son falsos por nombres mal emparejados (se verificaron 25 de 142), y los
   precios sugeridos usan «costo × 10», que YA NO llega al piso de 5x — hay que
   recalcularlos con la ley de volumen. El MK-677 sale primero por precio pero **NO
   conviene**: no es péptido, está en la lista de la WADA y la FDA lo ha advertido.
8. **La lista NUEVA de P42** (139 péptidos del 1-ago): falta el .xlsx original.
9. **Envíos**: remitente definitivo y Estafeta por API (los pesos ya se hicieron).
10. **`npm run auditoria` no revisa los rangos de presentación** — quedó propuesto
    añadirlo para que un rango desfasado se cace solo, y NO se hizo.
11. **Arte del vial de 5-Amino-1MQ** y **llave de OpenAI** + copiar los 77 PDF al EC2.
12. **DMARC**: endurecer (hoy `p=none`).
13. **Maquilador de llenado estéril en México** — prompt entregado para chat aparte.
    Materia prima a granel a $200 USD/gramo = $3.50/mg contra $8.49 hoy. **El número
    que decide es el mínimo de lote.**

---

