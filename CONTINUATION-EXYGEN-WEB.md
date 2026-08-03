# 🤝 HANDOFF MAESTRO — 3 de agosto de 2026 (noche)

**Estado:** TODO DESPLEGADO Y VERIFICADO. Backend en el EC2 con la SOLICITUD DE GUÍA
(commit `2c3d967`, suite **1,424** en verde). Sitio desplegándose con la UI de la guía
(`842b94f`) y el arreglo de i18n de llaves simples (`9b1c6fb`); antes ya estaba
`main.ccad70b0.js` con el botón «Seguir comprando» y la auditoría de rangos. Auditoría
del sitio: **97/0**.

## ✅ LO CERRADO ESTA SESIÓN (noche)

**SOLICITUD DE GUÍA DE ENVÍO PARA DISTRIBUIDORES** (encargo de Christián del 3-ago). Antes
sólo el admin podía comprar una guía; cuando no se autogeneraba, la única salida era que
Christián la comprara a mano. Ahora:
- **El distribuidor** ve el botón «Solicitar Guía» junto a SUS pedidos **pagados y sin
  guía** (usa `cobrado.esta_pagado`, la regla única de ingreso). Si ya la pidió, aparece
  «Guía Solicitada» apagado. Sin pagar, el botón no existe.
- **Christián** ve la franja «Solicitudes De Guía» en el Panel → Pedidos (sólo cuando hay
  pendientes) y **aprueba o rechaza**. Aprobar lleva confirmación: cuesta dinero de verdad.
- **Al aprobar**, la guía se compra por `comprar_guia_del_pedido` — el MISMO camino del
  pago automático —, así que el correo al cliente, el candado de doble compra y los frenos
  de gasto (tope $400/$600, sin empaque, paquetería caída) son idénticos. Si un freno
  detiene la compra, la solicitud SIGUE pendiente (502 con el motivo): aprobar sin comprar
  sería mentir. Si el pedido ya tenía guía al aprobar, no se compra dos veces.
- **Candados**: sólo pedidos propios (`referred_by` o 403), una solicitud a la vez por
  pedido, `deny_view_as` en todo lo que escribe (espiar un panel jamás puede volverse
  gastar dinero de otro). Módulo puro `guia_solicitudes.py`, colección `label_requests`,
  16 pruebas nuevas (`test_guia_solicitudes.py`, ya en `pytest.ini`).
- **Verificación en vivo**: los 3 endpoints nuevos responden bien en producción (200 con
  su forma, 401 sin sesión, 404 en inexistentes). El lazo COMPLETO (solicitar→aprobar→
  guía asignada→correo) está cubierto por las 16 pruebas de integración que pegan a las
  rutas reales de FastAPI. ⚠️ **NO se compró una guía de verdad en vivo**: habría gastado
  ~$150 MXN en una guía a un domicilio de prueba que no se envía, y el paso de compra
  reusa la función del pago automático que ya tiene sus propias pruebas en verde. Si
  Christián quiere la compra real de punta a punta, se corre `scratchpad/e2e_solicitud_guia.py`
  (necesita confirmar el correo de la cuenta de prueba, que llega con el token corrupto
  por la codificación del email — se abre el enlace a mano).
- ⚠️ **LIMPIEZA PENDIENTE**: quedaron 2 cuentas de prueba SIN verificar y SIN pedidos
  (`christiancuellar+e2e.guia.e356a5@gmail.com` y
  `christian+e2e.guia.1a6227@intertaxlegal.com`). No pueden entrar y no hay pedido que
  barrer; no existe endpoint de admin para borrar usuarios, así que quítalas desde el
  Panel/base cuando puedas. NO toqué la base por fuera de la app a propósito.

**BUG DE i18n — placeholders de llave simple salían literales** (`9b1c6fb`). El botón de
comisiones decía literalmente «Solicitar Pago De {monto}». `interpolate` sólo sustituye
llaves DOBLES; 10 claves usaban simples. Se doblaron en los 3 idiomas. Hallazgo: dos
claves de reportes (`storageLine`, `expiring`) NO pasaban args a `t()` — `ReportesSemanales.js`
hacía su propio `.replace('{n}',…)`; se alinearon al mecanismo estándar (por eso también
se tocó ese componente). Auditoría 97/0.

## ✅ CERRADO ANTES (tarde) — botón, rangos, vigía y prompts

**Botón «Seguir comprando»** visible (`4c6c05a`) · **auditoría de rangos + B12** (`7887bfc`,
ambos ya en `main.ccad70b0.js`). El prompt del VIGÍA programado (regla cero: sin scripts no
hay veredicto — corre `./vigia.sh`; sus 4 falsas alarmas documentadas) y los 3 prompts de
Codex (AUDITORIA, CAPTURISTA, ROBUSTEZ) al día del 3-ago (commit `c29096b` del motor).

## ✅ LO CERRADO ESTA SESIÓN (tarde)

**VIGÍA DE PRECIOS — el reporte del agente externo era FALSA ALARMA en sus 3 puntos.**
Se verificó corriendo `./vigia.sh` (7 pasos, datos frescos): EN VERDE.
1. «Certified se movió en Reta 30 y Glutatión 1500» — NO se movió: la maestra ya traía
   $4,800 y $1,580. Reta 30 a $4,299 es deliberado (la escalera lo topa: no puede rebasar
   al 40 mg de $4,309) y Glutatión $1,499 = exactamente Exoma. Documentado en
   `base_del_precio` de la maestra.
2. «9 productos debajo de Exoma» — son la excepción autorizada (14 productos donde Exoma
   cobra MÁS que Certified; ahí manda Certified −$10).
3. «87 que no vendemos» — ya lo vigila `auditar_cobertura.py`; mucho es exclusión
   deliberada (orales, SARMs, no-péptidos). Lo aprovechable vive en el pendiente de
   oportunidades.
Es la SEGUNDA falsa alarma de un vigía externo sin snapshot (la primera: las «83
violaciones» del 27-jul). Regla anotada en memoria: esos reportes se verifican con
`./vigia.sh`, nunca se actúan directo.

**BOTÓN «SEGUIR COMPRANDO» (commit `4c6c05a`, sin desplegar).** De `variant="ghost"`
(texto suelto, invisible en oscuro) a `variant="outline"` con borde primario al 40% y
texto primario, mismo idioma visual de los botones secundarios de la ficha y la regla
de 5. Verificado en navegador en tema claro y oscuro; «Finalizar compra» sigue mandando.

**AUDITORÍA DE RANGOS (commit `7887bfc`, era el pendiente 11).** `npm run auditoria`
gana la función `rangosDePresentacion()` en `scripts/auditoria-e2e.js`: ordena variantes
por cantidad NUMÉRICA (cachando miles con coma y unidad pegada, «10,000IU»), arma el
rango esperado copiando las cadenas extremas (no inventa formato) y compara contra lo
anunciado. Probado con casos sintéticos (rango viejo de Pinealon, variante en medio,
unidades mezcladas): todo detectado. **Hallazgo real de la primera corrida:** B12
anunciaba «1 mg» y es «1 mg/mL (10 mL)» — corregido en `fallbackCatalog.js`.

**COMISIONES PRODUCTO POR PRODUCTO Y LAS 5 ESCALERAS — propuesta concreta lista, NADA
APLICADO.** Vive en `pricing-system.nosync/PROPUESTA-COMISIONES-Y-ESCALERAS-2026-08-03.md`
(commit `4b05c01` de ese repo). Reproducido con la vara CON TODO: 63 bajo el piso,
**57 se salvan bajando su comisión** (tabla completa con la comisión exacta que aguanta
cada uno) y **6 salen del canal** (ácido acético 3/5/10 ml, agua bacteriostática 3 ml,
HGH 10/12 iu). ⚠️ CORRECCIÓN al handoff de la mañana: NO es cierto que los 6 tengan
flete declarado — solo el ácido acético 5 ml (Bainuo); los otros 5 usan el supuesto de
$350/caja. Las 5 escaleras torcidas, medidas con la ley de volumen: HCG 2,000 IU
regalado ($639 → curva ~$1,018), HGH 24 iu regalado ($1,139 → ~$1,663), HGH Fragment
12 mg subir $20 ($2,709 → $2,729), L-Carnitine 400/600/1,200 mg 29–47% abajo de curva,
y MOTS-c 40 mg que SOLO se arregla BAJANDO ($2,309 → ~$2,189: necesitaría excepción del
trinquete con motivo). Orden de aplicación cuando haya sí: subidas a
`subidas_autorizadas.json` → `reprecio.py` → cadena completa → recalcular comisiones
DESPUÉS de las subidas (varios productos están en las dos listas).

## 📋 PENDIENTES (renumerados)

**Decisiones de Christián:**
1. ⛔ **CAMBIAR LA CONTRASEÑA DE ADMIN** — `Exygenlabs2026` viajó por chat el 3-ago.
   **Lo más urgente de la lista.**
2. **Dar el sí (o no) a la PROPUESTA de comisiones producto por producto** — ya está
   medida y escrita, solo falta la decisión (ver arriba).
3. **Dar el sí (o no) a las 5 escaleras** — propuesta concreta en el mismo documento;
   ojo con MOTS-c 40 mg, que es bajada y pide excepción del trinquete.
4. **AHK-Cu 20 mg**: no cabe sin subir antes el de 50 mg ($889 → ~$1,400).
5. **Glutatión 600**, **Semaglutida 50 mg**, **HGH hacia arriba** (del handoff anterior;
   el Glutatión 600 y los HGH chicos aparecen también en la propuesta de comisiones).

**Trabajo:**
6. ~~DESPLEGAR los 2 commits acumulados~~ **HECHO el 3-ago tarde** (`main.ccad70b0.js`,
   14 comprobaciones en verde).
7. **Huecos de catálogo**: Survodutida 2 y 5 mg, Dulaglutida 5 mg, **PDA** y el
   **Deadpool Blend** (BPC-157/TB4/Cartalax) con otro proveedor que no sea Nexaph.
8. **142 productos que los proveedores ofrecen y no vendemos** (`oportunidades.py`) —
   ~16% falsos por nombres; recalcular precios sugeridos con la ley de volumen.
   El MK-677 NO conviene (WADA, avisos de la FDA).
9. **La lista NUEVA de P42** (139 péptidos del 1-ago): falta el .xlsx original.
10. **Envíos**: remitente definitivo y Estafeta por API (los pesos ya se hicieron).
11. **Arte del vial de 5-Amino-1MQ** y **llave de OpenAI** + copiar los 77 PDF al EC2.
12. **DMARC**: endurecer (hoy `p=none`).
13. **Maquilador de llenado estéril en México** — prompt entregado para chat aparte.
    **El número que decide es el mínimo de lote.**

---

# 🤝 HANDOFF ANTERIOR — 3 de agosto de 2026 (mañana)

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
10. **El botón «Seguir comprando» del carrito casi no se ve** (Christián, 3-ago, con
    captura). Hoy es azul oscuro sobre fondo oscuro, justo debajo de «Finalizar
    compra», que es azul brillante: el contraste entre los dos se come al segundo.
    No es sólo estética — es la salida hacia el catálogo, y de ahí sale el carrito
    más grande. Archivo: `src/pages/Cart.js` (el `variant` del segundo Button).
11. **`npm run auditoria` no revisa los rangos de presentación** — quedó propuesto
    añadirlo para que un rango desfasado se cace solo, y NO se hizo.
12. **Arte del vial de 5-Amino-1MQ** y **llave de OpenAI** + copiar los 77 PDF al EC2.
13. **DMARC**: endurecer (hoy `p=none`).
14. **Maquilador de llenado estéril en México** — prompt entregado para chat aparte.
    Materia prima a granel a $200 USD/gramo = $3.50/mg contra $8.49 hoy. **El número
    que decide es el mínimo de lote.**

---

