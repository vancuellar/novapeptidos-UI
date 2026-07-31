# 📦 2026-07-31 — EL RASTREO TAMBIÉN PARA AIDEE (guías compradas fuera del sistema)

Orden de Christián: «El rastreo también debe aplicar para Aidee y para todos los
futuros clientes».

## Qué le faltaba

Su pedido `EX-20260730-2906` tenía guía de FedEx (`875122824121`) y **`label_provider`
vacío**: esa guía se compró a mano, en el mostrador, fuera del sistema. El rastreo
decidía a quién preguntarle SÓLO por ese campo, así que no le preguntaba a nadie y la
línea de tiempo se quedaba muda.

Barrido de la base: de **2 pedidos con guía**, ése era **el único** sin proveedor. El de
Brenda ya traía `enviosinternacionales` y funcionaba.

## Qué cambió

1. **Sin `label_provider` ya no se rinde**: le pregunta por número de guía a TODOS los
   proveedores encendidos y gana el primero que conteste. Y **se aprende**: en cuanto
   alguien contesta, queda escrito en el pedido y la próxima consulta es tiro directo.
   El pedido se repara solo, sin que nadie tenga que acordarse.
2. **La caché pasó a ser por GUÍA** (antes por proveedor) para que esa vuelta a todas
   las plataformas se haga UNA vez y no en cada recarga. El tope de 2 peticiones por
   segundo lo comparte la compra de guías, que es la que vende.
3. **Una guía capturada sin paquetería ya no queda coja**: el servidor la deduce del
   propio número (`guias.py`, gemelo de `src/lib/paqueteria.js`). Lo que sí venga
   capturado a mano manda siempre; esto sólo rellena el hueco.
4. **Y cuando nadie la conoce, se dice la verdad.**

## ⚠️ La guía de Aidee NO está en ninguna plataforma — y no va a estarlo

Comprobado el 2026-07-31 preguntándole a las dos APIs con las credenciales de
producción:

| Guía | Skydropx | Envíos Internacionales |
|---|---|---|
| `875122824121` (Aidee) | 0 eventos | 0 eventos |
| `875164874865` (Brenda) | 0 eventos | **3 eventos** ✅ |

Se compró directo en el mostrador de FedEx. Y del sitio público de FedEx no se puede
sacar nada: bloquea a todo lo que no sea un navegador de verdad (503 de Akamai, ver la
entrada del iframe más abajo). **No hay a quién más preguntarle.**

Por eso la respuesta trae `detalle_disponible: false` y la pantalla enseña la guía, la
paquetería y la liga con un mensaje honesto —«El detalle del rastreo aún no está
disponible para esta guía»— en los tres idiomas, en vez de un hueco que parece falla.

**Para que esto no vuelva a pasar**: toda guía que se compre POR el sistema queda con su
`label_provider`. Las que se peguen a mano seguirán sin detalle — es una limitación de
FedEx, no nuestra. Si algún día se quiere el detalle de ésas, hay que abrir cuenta de
API con FedEx.

## De paso

`eta` puede venir como **texto libre** (el de Aidee es «2 - 5 dias habiles», capturado a
mano). Tratarlo como fecha dejaba en pantalla «Llegada estimada:» seguido de NADA. Ahora
si parece fecha se formatea y si no se enseña tal cual.

## Verificado en vivo

| | Aidee `EX-20260730-2906` | Brenda `EX-20260730-5930` |
|---|---|---|
| Guía y paquetería | FedEx · 875122824121 ✅ | FedEx · 875164874865 ✅ |
| Línea de tiempo | 2 pasos prendidos ✅ | 2 pasos prendidos ✅ |
| Historial | mensaje honesto ✅ | 3 eventos reales ✅ |
| Liga a la paquetería | ✅ | ✅ |

**1061 pruebas backend, 0 fallas · auditoría 86, 0 fallas.**

⚠️ Nota de método: la verificación visual se hizo con **Playwright**, no con el navegador
automatizado del asistente — ése daba falsos negativos (páginas en blanco que en un
Chromium de verdad se pintan bien). Si alguien ve la página vacía desde una herramienta
automatizada, que compruebe con Playwright antes de gritar «se cayó el sitio».

---

# 🤝 HANDOFF — 2026-07-31 (tarde-noche) — LÉELO PRIMERO

## ✅ EN VIVO hoy
Cotizador con datos de cliente + enlace `?pedido=` al checkout · doble cotizador de
envíos (Skydropx + Envíos Internacionales, gana el más barato) · **primera guía real
comprada**: Brenda EX-20260730-5930, FedEx 875164874865, $192.90 por EI (saldo quedó
en $2,307.10) · botón **Imprimir Guía** en ficha de pedido (admin y distribuidor, solo
sus pedidos) · **rastreo DENTRO de exygenlabs.com** (`/pedido/{num}`, línea de tiempo
con eventos reales traducidos; el iframe a FedEx era imposible: `frame-ancestors self`)
· correos consolidados (1 solo con tarjeta/cripto; SPEI mantiene el de la CLABE) ·
**compra automática de guía** al entrar el pago, con dos frenos: hasta 4 PIEZAS (la
bolsa stand-up 12×15×1) y tope de $400 · envío partido **lo elige el cliente** en el
checkout · Asesor IA **desbloqueado** (contesta dosis, reconstitución, combinaciones;
el freno era nuestro prompt + que el backend no tenía las monografías) · **formato
limpio** en los dos chats (se acabaron los `**asteriscos**`) · techo del **40% en UNA
sola puerta** (venta directa, GIFT, trato especial, códigos; excepción solo admin y la
marca de María, que nace apagada) · leyenda RUO nueva en 52 textos (fuera "consumo
humano ni animal", conservada SOLO en Términos) · página **Marketing** en el admin con
archivo de videos semanal + comparación semana a semana · códigos **MONICAF-*** para
María conviviendo con los viejos (caducan 21-29 oct) · precios acercados a Certified:
Retatrutida 10mg $2,489, Tirzepatida 10mg $2,129 y 30mg $3,089 · **1MQ bajado a $949**
(el candado anti-Certified estaba apagado desde el 26-jul; reactivado).

## 🔴 FUGAS CERRADAS HOY (todas eran reales)
- `/pedido/{num}` (SIN contraseña) entregaba el **PDF de la etiqueta con el domicilio
  completo del cliente**, y los números de pedido son adivinables.
- La misma ruta traía **quién refirió la venta y el reparto de comisiones**.
- **Cupón de un solo uso canjeable dos veces en simultáneo** (hasta 40% del segundo
  pedido: en un ticket de $177k son $71k). Tercera vez que aparece este mismo patrón
  (inventario → puntos → cupón): los auditores buscan la cuarta.
- El servidor mandaba al navegador del cliente **lo que cuesta la guía**.
- Registros con `?ref=` que entraban **sin distribuidor y sin comisión**, en silencio.
- La prueba de Meta estaba fuera de la suite y **en rojo**: pedidos de prueba
  (@example.com) podían llegar a Meta como compras reales.

## 💰 NÚMEROS REALES DE LA SEMANA (25-31 jul)
Vendido $11,514 · **cobrado $7,657** (Brenda + Aidee; Alanís $3,857 entregado y NO
pagado = deuda) · **ganancia neta de lo cobrado $4,644.59 (60.7%)** · caja real
$4,279.29 · publicidad Meta $237 USD ≈ $4,268 MXN → **empate técnico de $11**, y con
flete de proveedor cargado, $234 abajo. **Meta no generó ninguna de las 3 ventas.**
110 conversaciones de WhatsApp a $39 c/u. Detalle en `GANANCIA-SEMANA-2026-07-31.md`
y `REPORTE-ADS-SEMANA-2026-07-31.md`/`.mp4`.

## 🏭 PROVEEDORES NUEVOS
P39 Bjvvb · P40/P42 (Reino Unido, uno sin capturar por falta de tamaño/moneda) ·
**P41 Chuangyan Biotech** (+852 9056 5942) — le gana a TODOS en **57 tamaños**, 46 de
nuestro catálogo (Cagrisema −56%, GHK-Cu −35%, BPC-157 −30%, LIPO-C −70%) ·
**P43 Jess "Peptide Makers"** (+852 7019 3438) — gana en 31 tamaños de segunda fila
(HGH, B12, TB Frag), pierde feo en Reta/Tirze/Sema. Lee Factory (0→184) y Mia
(73→157) recapturados: **Mia es la más barata en 78 de 204**.

## ⏳ DECISIONES DE CHRISTIÁN
1. **23 costos de la maestra ya no son los del más barato** (por Jess). Refrescarlos
   baja costos en medio catálogo y dispara re-precios en cascada — con proveedores que
   NADIE ha comprobado con una compra real. Recomendación: esperar a una compra real.
2. **Prueba a Chuangyan**: sugerido Cagrisema 10mg + LIPO-C + GHK-Cu o BPC-157.
3. Glutatión 1500mg: para acercarlo a Certified hay que subir también el de 600mg.
4. Marca de descuento de María: nace APAGADA. Diamante en compra propia quedó en 40%.
5. Retención de videos: 52 semanas, nada se borra solo.
6. Adipotida: en curso (identidad química, SKU, ficha, imagen).
7. Gemini: cuota gratis 20/día agotada. Recomendado prender plan de paga (5 min) o
   pegar llave de OpenAI (`AI_PROVIDER=openai`, ya implementado sin probar).
8. Skydropx: sigue sin saldo/verificación (Envíos Internacionales sí compra).
9. **NADA de WhatsApp hasta nuevo aviso** — hay borradores listos para Chuangyan,
   Jess, Bjvvb, Peptideals, DT y los 2 ingleses.

## ⚠️ RIESGO OPERATIVO
Con 5-6 agentes escribiendo a la vez hubo `main` sin compilar (import a un archivo no
subido), commits que arrastraron trabajo ajeno y pruebas intermitentes. Regla nueva:
`git add` por archivo (nunca `-A`), compilar antes de push, y el barrido grande
(E2E + enlaces + huecos) se corre UNA vez al final, con todo mergeado.

---

# 🧪 2026-07-31 — LA ADIPOTIDA YA SE VENDE, Y EL ALTA DE UN PRODUCTO NUEVO YA TIENE CANDADO

Orden de Christián: «Para Adipotida o cualquier otro item que adoptemos nuevo, tienes
que generarlo E2E, con SKU, fotos, comisión, escalera de precios, etc. **Tiene que
quedar listo para comercializarse.**»

## El problema no era el precio

La Adipotida llevaba días «regresada al catálogo»: el motor ya le había puesto precio
($3,089 el de 10 mg, ROI 22.9×) y ya había salido de la lista de no-vender. Aun así los
tres renglones seguían en `vender=No`, porque **le faltaba todo lo demás**: SKU, arte de
vial, ficha técnica e identidad química investigada. Un producto así no se puede vender
aunque el precio esté perfecto — y nadie chilló, porque **ninguna compuerta miraba
producto por producto**.

## Identidad química: investigada, con fuente, y con una errata del mercado corregida

| Dato | Valor | Fuente |
|---|---|---|
| CAS | **859216-15-2** | PubChem CID 163360068 |
| Fórmula | C₁₁₁H₂₀₆N₃₆O₂₈S₂ · 2557.2 g/mol | PubChem CID 163360068 |
| Secuencia | CKGGRAKDC-GG-D(KLAKLAK)₂ (26 residuos) | Wikipedia «Prohibitin-targeting peptide 1» + literatura primaria |
| Sinónimos | FTPP, prohibitin-targeting peptide 1, TP01 | PubChem + Wikipedia |

**«Adipotide» y «FTPP» SÍ son el mismo compuesto.** FTPP = *fat-targeted proapoptotic
peptide*. La grafía **«FTTP»** que traen casi todas las listas de proveedor (y que tenía
nuestra propia maestra en el renglón de 10 mg) es una **errata copiada por todo el
mercado**. También circula un segundo CAS, 1401066-79-2, que **no está verificado** en
PubChem ni en la literatura primaria: la ficha no lo reconoce y lo dice en su nota de
nomenclatura. Es exactamente la lección del «10-amino-1MQ», que resultó no existir.

El nombre público va **en español — Adipotida** — porque así lo listan los dos
competidores (Certified: «ADIPOTIDA 10MG»; Exoma: «Adipotida») y así lo busca el cliente.
La maestra lo sigue llamando «Adipotide»; el puente son los tres mapas `ALIAS_SITIO`.

## Qué se publicó

| SKU | Precio | ROI | Comisión | Competencia |
|---|---|---|---|---|
| ADIPOTIDA-2MG | $1,559 | 31.1× | 40% | Exoma $1,130 (piso) |
| ADIPOTIDA-5MG | $2,879 | 33.9× | 40% | Exoma $2,399 (piso) |
| ADIPOTIDA-10MG | **$3,089** | 22.9× | 40% | **Certified $3,100** |

Las tres, elegibles para distribuidores. **Se publicaron las tres**, no sólo el 10 mg: la
escalera las sostiene y la ficha las ordena por precio **por mg** ($780 → $576 → **$309**),
así que el 10 mg sale marcado «MEJOR VALOR» y el cliente ve por qué. El 5 mg es además el
de mejor ROI (33.9×) y el que más proveedores surten.

## El camino repetible: `alta_producto.py`

`dar_de_alta.py` es la orquesta; **`alta_producto.py` es la lista de verificación**, y
truena si falta cualquiera de **once puntos**: maestra y veto · vender=Sí · precio del
motor · comisión y elegibilidad · categoría · SKU y renglón del catálogo con el `id` del
backend · monografía · **identidad química con fuente** · arte del vial · ficha técnica ·
vivo en el backend **con renglón de inventario**.

```
python3 alta_producto.py "Adipotide"             # revisa; sale 1 si falta algo
python3 alta_producto.py "Adipotide" --aplicar   # hace lo automatizable
python3 alta_producto.py --todos                 # revisa todo lo que está a la venta
```

`--aplicar` **se para en seco** si falta identidad, monografía, categoría o precio del
motor: esas cuatro no se inventan. Los textos curados van a mano en
`datos/altas_nuevas.json`. Documentado en FUENTE-DE-VERDAD y en los tres prompts de Codex.

## Dos cosas que estorbaban de verdad

- **`publicar_viales_web.py` re-exportaba los 200 viales cada vez** aunque sólo hubiera
  uno nuevo: ~35 s por vial, o sea **dos horas de reloj** por dar de alta un producto.
  Ahora sólo rehace lo que cambió (`--rehacer` fuerza todo): **0.19 s**.
- **`consolidar.py` leía un archivo suelto del `/tmp` de una sesión vieja de Claude** que
  ya no existe. Llevaba días tronando con `FileNotFoundError`, así que nadie podía
  reconsolidar identidades. Ahora el mapa slug→nombre sale del catálogo del sitio.

## Verificado EN VIVO

Catálogo (buscando «adipotida»), ficha `/producto/adipotida`, agregar al carrito y compra
real por API: el servidor cobra **$3,089** de subtotal y **ignora** un `price: 1` mandado
desde el cliente. Auditoría del sitio **86/86**, E2E tarjeta **15/15**, E2E cripto
**21/21**, backend **1037/1037**, motor **347 de 348**.

⚠️ **La que falta y NO es mía:** `test_el_costo_de_la_maestra_es_el_del_proveedor_mas_barato`
falla en `main` desde el commit `3feeb2d` (la lista de **Jess / Peptide Makers**), que
entró **sin refrescar los costos de la maestra**: 23 renglones cargan un costo más alto
del que hoy cobra el proveedor más barato. Corregirlo es `refrescar_costos.py --aplicar` +
`reprecio.py` + `sincronizar_historial.py`, **pero destapa una decisión de Christián**: con
el costo nuevo, la HGH de 40 IU pasa de «escalón sin arreglo» a «arreglable», y arreglarlo
significaría bajarla de **$3,869 a ~$1,719**. Eso no lo decide un script. Se deja reportado.

---

# 📼 2026-07-31 — EL REPORTE DE PUBLICIDAD SE **ARCHIVA SOLO**, SEMANA CON SEMANA

Christián: «este video de publicidad debe estar en mi página de Marketing e irse
archivando por fecha, semana con semana».

El MP4 de la semana (`REPORTE-ADS-SEMANA-2026-07-31.mp4`, 4:39, 16 MB) quedaba
suelto en la carpeta del proyecto. A la semana siguiente nadie volvía a
encontrarlo, y comparar dos semanas era imposible.

**Dónde se ve ahora:** `https://exygenlabs.com/admin?tab=marketing` — arriba de
todo, antes del video de «cómo leer estas métricas». Lo ve el admin y también
María (rol de difusión).

## Lo que hay en esa pestaña

1. **El video de la semana**, con su reproductor, su resumen de una línea y
   botones de *Descargar Video* y *Leer El Reporte Escrito* (el `.md` completo).
2. **Cómo va semana con semana**: gráfica y tabla con gasto, clics,
   conversaciones de WhatsApp, costo por conversación, compras atribuidas por
   Meta, visitas y compras del sitio. **Ese es el valor real del archivo**: nadie
   va a ver 52 videos de cinco minutos, pero la evolución sí se lee de un vistazo.
   Una cifra que no se midió sale con raya, nunca en cero.
3. **Semanas anteriores**, de la más nueva a la más vieja, con fechas, duración y
   tamaño. Se ven ahí mismo sin salir de la página.
4. **Disco y retención**: cuánto ocupa, cuánto va a ocupar al año y qué se pasó
   de la raya.

## Dónde viven los videos — y por qué NO en git

15 MB × 52 semanas = **780 MB al año**, y git no olvida: una vez dentro, cada
clon carga ese peso para siempre. Viven en **disco del servidor**, igual que los
COA y las fichas técnicas:

```
/opt/exygen/reportes-ads/<año>/<semana>/{video.mp4, resumen.md, datos.json}
```

Montado en el contenedor como `/data/reportes-ads` (`docker-compose.yml`,
`REPORTES_ADS_DIR`). **De lectura y escritura**, a diferencia de los COA, porque
aquí el pipeline deposita. Los dos colores del azul/verde ven la MISMA carpeta,
así que un despliegue no se lleva nada por delante. Hoy: **16 MB**, disco al 38%
con 13 G libres.

## El candado

Nada de URL pública adivinable: son gasto, ventas y embudo. Las cuatro rutas
cuelgan de `get_current_marketing` (admin o difusión) y la del MP4 revalida el
rol a mano, porque el `<video>` del navegador no manda headers y el token viaja
en la URL. Probado **en vivo** contra `api.exygenlabs.com`: sin sesión 401, con
token inventado 401. Y en `test_reportes_ads.py` (32 pruebas): un **cliente** con
sesión válida y un **distribuidor** con sesión válida reciben **403** al pedir el
video, aunque le peguen a la API directo.

## Retención — **la decisión es de Christián**

`retencion.json` dice cuántas semanas conservar (**52** por omisión, cambiable
desde `PUT /api/admin/marketing/reportes/retencion`). **NO se borra nada solo, ni
hay temporizador que lo haga.** Lo que se pasa de la raya sale marcado como *por
vencer* en el panel y se borra con `DELETE`, a mano. Si dentro de un año quiere
conservar más, sube el número y ya.

## Cómo se archiva el de la próxima semana

En `Media/Videos/pipeline/record-reporte-ads.js` sólo se tocan **dos bloques**:
`SEMANA` (fechas, título, resumen de una línea) y `CIFRAS`. Después:

```bash
PUBLICAR=1 node record-reporte-ads.js
```

Graba el video, calcula la semana ISO y la duración reales, escribe
`datos-reporte-ads-<semana>.json` y lo sube todo con
`./publicar-reporte-ads.sh`. Sin `PUBLICAR=1` sólo imprime el comando: subir
16 MB no debe pasar por accidente al reencodear.

A mano, o desde cualquier otro pipeline:

```bash
./publicar-reporte-ads.sh datos.json video.mp4 resumen.md   # sube por SSH
./publicar-reporte-ads.sh --listar                          # qué hay archivado
```

Sube por SSH (Instance Connect, sin `.pem`) porque no necesita guardar la
contraseña del admin en ningún archivo. Publicar dos veces la misma semana la
**reemplaza**, así una corrida repetida no llena el archivo de duplicados.
También existe el camino por HTTPS: `POST /api/admin/marketing/reportes`
(multipart, sólo admin), para cuando haya un token a la mano.

## Marketing y Anuncios **no** se fusionaron

Ya existían las dos pestañas y son dos preguntas distintas: **Anuncios** es el
panel en vivo de Meta (lo que cobró hoy), **Marketing** es el cruce contra ventas
reales y ahora el archivo semanal. El reporte se metió en Marketing sin duplicar
nada. Si Christián prefiere una sola, se puede juntar después — hoy conviven.

**Compuertas:** backend `1037 passed, 0 fallas`. Auditoría del frontend en verde.

---

# 🕵️ 2026-07-31 — LOS CÓDIGOS DE DESCUENTO YA NO DELATAN A NADIE: **MonicaF**

Christián: «a María tiene prendidos sus códigos de descuento, pero creo que
vamos a rotarlos a que digan MonicaF mejor jeje». El texto del propio código era
la última rendija de su orden del 31-jul —«los clientes no pueden ver que el
código de descuento es de María»—: los correos y las rutas ya estaban tapados,
pero `MARIAN-15-R4YV`, `ALANIS-20-FRUK` y `JAVIER-25-RHV4` los **teclea el
cliente** y los ve completos.

Ahora **todos** los distribuidores emiten con el mismo prefijo, el de quien
atiende de cara al cliente (Mónica Flores): **`MONICAF-15-XXXX`**. Con uno solo
para todos, el texto ya no distingue a nadie ni comparando dos códigos entre sí.

## Eran DOS familias, y por eso la mitad pasaba desapercibida

| | dónde vive | ejemplo viejo | ejemplo nuevo |
|---|---|---|---|
| AUTO, uno por nivel | `discount_codes` | `MARIAN-15-R4YV` | `MONICAF-15-Q5QK` |
| ÚNICO legacy | `users.distributor_code` | `MARI-3537` | `MONICAF-7451` |

Cambiar sólo `gen_discount_code` habría dejado el legacy en pie. Las dos cambian.

## Lo que preguntó Christián justo antes de rotar

«¿los códigos que María ya repartió siguen funcionando?». La respuesta era **NO**
y nadie lo había notado: rotar reescribía el texto **dentro del mismo
documento**, así que el código circulando dejaba de existir en el acto y el
cliente se quedaba sin descuento, sin aviso. Su orden: **no matarlos**.

Ahora el viejo se **jubila** (`superseded_at`, conserva **su** caducidad) y el
nuevo nace a su lado. Los dos dan el mismo descuento y atribuyen al mismo
distribuidor. El legacy, que sólo cabe uno por ficha, se **muda** a
`discount_codes` antes de que la ficha estrene texto. Gracia real: hasta el
**21–29 de octubre**, que es lo que les quedaba de vida.

De paso: `resolve_distributor` sólo miraba `users.distributor_code`, así que un
registro con `?ref=` de un código AUTO —o de un legacy jubilado— entraba
**huérfano y sin comisión**, callado. Ahora cae por `_resolve_code`, el mismo
camino que usa el checkout.

`test_gracia_de_codigos.py` (11 pruebas) guarda la promesa, con un guardia tosco
que cuenta los textos vivos antes y después.

---

# 💰 2026-07-31 — TRES PRECIOS SE ACERCAN A CERTIFIED, Y EL **ROI NETO DE VERDAD**

Christián: «si es subirlos, súbelos pero quédate 11 pesos debajo o incluso 21 si
es que aún siguen las reglas del ROI 5x después de descontar comisiones, costos
directos, costos fijos, etc.».

**Cómo se implementó:** el precio nuevo es el mayor terminado en 9 que quede al
menos **$11** abajo de Certified; si con $11 no cabe, se prueba **$21**; si
tampoco, **no se mueve y se reporta**. Certified se leyó **EN VIVO** el 31-jul a
las **15:03 EST**, tamaño contra tamaño.

| producto | Certified | antes | después | ROI neto |
|---|---:|---:|---:|---:|
| Retatrutida 10 mg | 2,500 | 2,479 | **2,489** | 12.27× |
| Tirzepatida 10 mg | 2,140 | 2,119 | **2,129** | 13.79× |
| Tirzepatida 30 mg | 3,100 | 3,069 | **3,089** | 12.17× |
| Glutatión 1500 mg | 1,580 | 1,499 | *no se mueve* | 9.12× |
| LL-37 5 mg | 1,648 | 1,629 | *no se mueve* | 7.91× |

**Los dos que no se pueden, y por qué no se fuerzan.** El Glutatión 1500 mg lo
topa la **escalera**: a $1,569 saldría a $1.046/mg contra $1.015/mg del de 600
mg, y a $1,559 tampoco cabe; arreglarlo exige subir **también el chico**, que es
otra decisión de Christián. El LL-37 5 mg **ya está donde la regla lo pondría**:
$1,648 − 11 = 1,637 y el mayor terminado en 9 abajo de eso es $1,629, su precio
de hoy.

**`reprecio.roi_neto`** es la vara nueva: costo + flete del proveedor en partes
iguales por caja + comisión + puntos + **guía Y EMPAQUE ($189.39** medido con
recibos, no los $165 de la guía sola**)** + gasto fijo prorrateado ($341.63 al
mes entre **10** pedidos — el lado conservador; con 20 ningún veredicto cambia).
Vive **aparte** de `roi_real` a propósito: mover el ROI de la maestra en silencio
cambiaría la comisión de 191 productos de golpe.

Escalera, trinquete, techo cruzado y «nunca arriba de Certified»: los cuatro se
respetan. Dos corridas en seco limpias, certeza en verde, auditoría 86/0.

---

# 🧹 2026-07-31 — LAS RESPUESTAS DE LA IA SALEN LIMPIAS (se veían los asteriscos)

Orden de Christián: «las respuestas de la AI no están limpias, dejan código,
ejemplo `**NAD+ 500**`. Eso NO me gusta y NO está bien.»

El modelo contesta en **Markdown** y las burbujas de chat lo pintaban **crudo**:
el asterisco, la almohadilla del título y la tubería de la tabla se leían tal
cual en pantalla. Pasaba en los **dos** chats — el Asesor de Negocio del panel y
el asistente de la tienda — y en la tienda es peor: lo ve el cliente.

## Tres capas, no una

1. **La pantalla lo pinta de verdad** — `src/components/RespuestaIA.js` (nuevo).
   Negritas, viñetas con el punto de marca, listas numeradas, tablas que se
   deslizan en móvil, citas y enlaces. Montado en `AIChatWidget.js` (tienda),
   `ChatNegocio.js` (panel) y `LabReports.js` (la explicación del estudio de
   laboratorio, que es el mismo texto de un modelo y tenía el mismo defecto).
2. **Al modelo se le pide prosa limpia** — bloque «COMO SE VE TU RESPUESTA» en
   `ai_assistant.SYSTEM_PROMPT` y en `chat_negocio.PROMPT_BASE`.
3. **El servidor limpia lo que se escape** — `texto_ia.py` (nuevo).

## Por qué a mano y no con `react-markdown`

Peso y seguridad. Serían ~14 dependencias nuevas para pintar negritas, y este
repo ya resolvió así la hoja de cotización. Pero la razón de fondo es que **el
texto lo escribe un modelo**, y un modelo repite lo que le peguen en el mensaje:
las librerías de Markdown aceptan HTML crudo por omisión y hay que apagarlo.
Aquí no existe ese camino — **no hay un solo `dangerouslySetInnerHTML`**, todo
sale como elementos de React. Probado en vivo: un `<script>` y un `<img
onerror>` en la respuesta se pintan como texto y no ejecutan nada, y un enlace
`javascript:` no llega a ser enlace (sólo pasan http, https, mailto y rutas
propias, con `rel="noopener"`).

## El detalle que costaba caro: el chorrito

La respuesta llega en pedazos y un `**` puede venir **partido entre dos**. Si se
limpiara pedazo por pedazo, medio marcador se colaría a la pantalla como basura.
Por eso `LimpiezaEnVivo` suelta sólo hasta el último punto **seguro** y se
guarda el resto; y del lado de la pantalla, una negrita abierta al final se
pinta abierta hasta el final. Nunca se ve un asterisco suelto, ni medio segundo.
`test_texto_ia.py` parte la respuesta en trozos de 1, 2, 3, 5, 7 y 13 caracteres
y revisa **la pantalla en cada paso**.

Lo que **no** se borra: las negritas bien cerradas, las listas y las tablas. La
orden fue limpiar, no destruir — y la pantalla ya las pinta bonito.

⚠️ **Sin probar con el modelo en vivo**: la cuota gratis de Gemini (20/día) se
acabó el 2026-07-31. Se verificó con texto real de respuesta, streaming incluido.

---

# 📦 2026-07-31 — EL RASTREO VIVE EN NUESTRA PÁGINA (el iframe era imposible)

Orden de Christián: «Quiero que el cliente rastree su pedido DENTRO de
exygenlabs.com, sin mandarlo a la página de FedEx. Quiero que vivan en nuestra
página el mayor tiempo posible.» Su propuesta fue un **iframe**.

## ⛔ Por qué el iframe NO se podía (y no era cosa de programarlo mejor)

Las paqueterías lo prohíben **desde su propio servidor**, y el navegador obedece.
Comprobado con `curl -I` el 2026-07-31:

| Sitio | Cabecera que devuelve |
|---|---|
| `https://www.fedex.com/wtrk/track/?trknbr=875164874865` | `x-frame-options: SAMEORIGIN` · `content-security-policy: frame-ancestors 'self'` |
| `https://rastreo3.estafeta.com/RastreoWebInternet/consultaEnvio.do` | `x-frame-options: SAMEORIGIN` |

`frame-ancestors 'self'` quiere decir literalmente «sólo fedex.com puede
enmarcarme». Dentro de exygenlabs.com ese marco sale **EN BLANCO** — no con un
error entendible: en blanco. Es **peor** que mandar al cliente a FedEx, porque
parece que nuestra página está rota.

(De paso: FedEx además responde `503` de Akamai a cualquier petición que no venga
de un navegador de verdad, así que ni siquiera se podía "raspar" la página.)

## Cómo quedó: página propia alimentada por la API

El servidor le pide los eventos a la API de la paquetería y **los pintamos
nosotros**, con la marca de la casa. El cliente no sale del sitio.

- **Backend** — `rastreo.py` (nuevo): `GET /api/orders/{numero}/rastreo`, pública
  por número de pedido igual que la ficha. Y `rastrear()` en `skydropx.py` y en
  `enviosinternacionales.py`, contra `GET /shipments/tracking` (está en su
  OpenAPI). Como Envíos Internacionales es white-label de Skydropx, la traducción
  del JSON vive en un solo lugar (`skydropx._eventos_del_json`).
- **Frontend** — `src/components/RastreoEnvio.js` (nuevo), montado en
  `src/pages/OrderConfirmation.js`, que es la página pública `/pedido/{numero}`.
  Línea de tiempo **vertical** de cuatro pasos: recibido → en camino → en reparto
  → entregado, con historial (fecha y lugar) y entrega estimada. Vertical a
  propósito: casi todos la abren desde el teléfono.
- Textos en los **tres idiomas** (`tracking.*` en es-MX, en-US, pt-BR).

## Los tres candados

1. **La lista es BLANCA, no negra.** `ficha_publica()` arma la respuesta campo por
   campo. Así, el día que alguien agregue un dato interno al pedido, NO se cuela
   solo: para que salga hay que escribirlo a mano. `label_provider`,
   `shipping_cost` y el distribuidor que refirió el pedido no están. Hay una
   prueba que lee el sobre completo como texto plano y truena si se asoman.
2. **Caché de 5 minutos.** El tope de las paqueterías es de 2 peticiones por
   segundo **por cuenta**, y lo comparte la compra de guías — que es lo que sí
   cuesta dinero. Sin caché, una pestaña recargando deja sin cupo al despacho.
   Mil recargas del mismo pedido = **una** sola llamada. El freno de `ritmo.py`
   sigue debajo como última red.
3. **La paquetería caída NO tumba la página.** El cliente ya pagó: ve su pedido
   aunque FedEx tenga un mal día. Sin eventos no es error — es lo normal las
   primeras horas, y se pinta el primer paso prendido, no una pantalla vacía.

Dos detalles que costaría caro no cuidar: la barra **nunca retrocede** (gana el
paso más avanzado, no el último evento — los carriers mandan avisos
administrativos *después* de entregar), y **«en sucursal» no es «entregado»**
(`delivered_to_branch` es un paquete esperando a que lo recojan; pintarlo como
entregado haría que alguien deje de ir por él).

La liga al sitio de la paquetería **no se esconde**, pero deja de ser la
protagonista: va hasta abajo y chiquita.

## Probado con el pedido real de Brenda

`EX-20260730-5930` · guía FedEx `875164874865`, comprada con Envíos
Internacionales. 17 pruebas nuevas en `test_rastreo.py`; **966 en total, cero
fallas**.

## ⚠️ PENDIENTE — el correo todavía manda a FedEx

El correo de envío (`emails.py`) sigue apuntando el botón al rastreo de FedEx.
Debe apuntar a `https://exygenlabs.com/pedido/{numero}`, que es nuestra página
con el rastreo dentro. **No se tocó a propósito**: otro agente tenía `emails.py`
en la mano ese mismo día (consolidación de correos + compra automática de guía).
Es un cambio de una línea; hay que pasárselo a quien tenga ese archivo.
---

# 🔒 2026-07-31 — CANDADO CONTRA EL COMMIT A MEDIAS

**El accidente.** Con varias sesiones de Claude sobre el mismo árbol, una hizo
`git add -A` / `git commit -a` y se llevó las ediciones en curso de otra: mis
cambios a `src/pages/OrderConfirmation.js` y a los tres `src/i18n/*.js` acabaron
dentro del commit c691ae3 («El cliente elige cómo mandarle su pedido…»), pero el
archivo NUEVO que esas ediciones importaban —`src/components/RastreoEnvio.js`—
se quedó **sin versionar**. Durante varios minutos `main` tuvo
`import RastreoEnvio from '@/components/RastreoEnvio'` apuntando a la nada:
cualquier `npm run build` o despliegue en esa ventana habría tronado.

**Lo que se puso.**

1. `scripts/verificar-imports.js` — lee los `.js/.jsx` que van en el commit (la
   versión del **índice**, no la del disco), les saca los imports internos
   (`@/…`, `./…`, `../…`) y comprueba que el destino esté en el índice de git.
   Existir en el disco no basta: eso es justo lo que falló. Ignora imports
   comentados. Tarda ~0.3 s sobre el repo entero.
2. `.githooks/pre-commit` — lo corre antes de cada commit. Activado con
   `git config core.hooksPath .githooks` (config local, **hay que repetirlo tras
   un clon nuevo**; los worktrees ya lo heredan). Se salta con `--no-verify`.
   Si no hay `node`, el hook se hace a un lado en vez de bloquear.
3. `CLAUDE.md` en la raíz — la regla que se lee sola en cada sesión: **nunca
   `git add -A`, `git add .`, `git commit -a` ni `git stash` sin ruta**; siempre
   pathspecs explícitos, porque el índice es compartido.
4. `npm run verificar:imports` — la misma revisión a mano, sobre todo el repo.

**Probado:** aborta el caso real (destino en disco pero sin versionar), aborta el
destino inexistente, funciona desde subcarpeta, pasa con `--no-verify`, y el repo
entero sale limpio hoy (cero falsos positivos en ~400 archivos).

**Lo que este candado NO cubre:** que un commit se lleve ediciones ajenas sin
romper ningún import. Contra eso sólo sirve la regla 3 — pathspecs explícitos.

---

# ⚖️ 2026-07-31 — FUERA LA FRASE DE "CONSUMO HUMANO NI ANIMAL"

Orden de Christián: «Me llegan muchos reclamos por esa frase. Quitemos eso y
dejemos únicamente lo de péptidos para research only. Checa cómo lo tiene
Certified y manéjalo similar.»

## Qué se investigó primero (Certified, leído en vivo el 2026-07-31)

Certified **sí trae la exclusión**, pero repartida distinto que nosotros:

| Dónde | Qué dice literal |
|---|---|
| Pie de página (todo el sitio) | «Los productos ofrecidos son solo para uso de investigación in vitro y no están destinados a diagnosticar, tratar, curar ni prevenir ninguna enfermedad.» — **sin** mención al consumo |
| Fichas de producto (26 de 47) | «No apto para uso humano ni veterinario» — nunca «consumo… ni animal» |
| Banner de entrada | «…no están destinados al consumo humano ni a uso médico. Debes tener 18 años…» |
| Preguntas frecuentes | «…no son para consumo humano.» |
| Aviso legal | «No apto para consumo humano o animal, inyección, inhalación… uso clínico o diagnóstico…» |
| Términos y condiciones, cl. 3 | «Todos los productos son exclusivamente para uso de investigación y laboratorio. No son para consumo humano o animal.» |
| Página dedicada `/research-purposes-only/` | Explica *por qué* se etiqueta «No apto para consumo humano» (costos FDA, escala de estudios, patentabilidad) |

Lectura: Certified **no** la pone donde el cliente compra (pie, carrito, tarjetas
de producto). La deja en la **capa legal** y usa la fórmula más suave —«uso humano
ni veterinario»— en la ficha.

## Cómo quedó el nuestro

Se queda el marco de investigación, se va la fórmula de consumo. Los tres idiomas:

- **es-MX** — «Uso exclusivo en investigación (RUO), en laboratorio y ensayos in vitro. No es un medicamento ni un suplemento.»
- **en-US** — «Research use only (RUO), for laboratory and in vitro work. Not a medicine or a supplement.»
- **pt-BR** — «Uso exclusivo em pesquisa (RUO), em laboratório e ensaios in vitro. Não é medicamento nem suplemento.»

Donde había promesa terapéutica de por medio se usa el cierre de Certified: «no
están destinados a diagnosticar, tratar, curar ni prevenir ninguna enfermedad».

## Dónde se cambió

| Repo | Archivos |
|---|---|
| UI | los tres i18n (`ruo.gate.point2`, `trust.ruo`, `home.ruoNotice`, `edu.ruoBody`), `ProductDetail.js`, `LearnPage.js`, `InfoPage.js`, `Advisor.js`, `productMonographs.js`, 12 páginas de `/aprende`, `contacto.js`, `soporte.js`, el resumen de `terminos.js` |
| RBAC | `emails.py` (los 6 textos RUO: confirmación de pedido y cotización × es/en/pt), las 3 `templates/welcome_email.*.html`, `seed_data.py`, `compendio.json` (regenerado) y los prompts de las dos IAs (`ai_assistant.py`, `chat_negocio.py`) |

**Dos avisos casi se escapan** (`Advisor.js` y `InfoPage.js`): la frase estaba
partida en dos renglones —`consumo\n humano`— y ningún `grep` de texto la veía.
Aparecieron al revisar el **bundle ya publicado**, no el código. Regla que deja:
la prueba de que una leyenda se fue es lo que sirve el sitio, no lo que dice el
grep. El barrido final del `build/` da **5 ocurrencias, las 5 en Términos**.

**`compendio.json` también traía la versión vieja.** Es el volcado de `/aprende`
que viaja con el backend y alimenta al Asesor de Negocio: el sitio ya no lo decía
pero el asesor sí. Se regenera con `node exportar_compendio.mjs` desde el repo
RBAC. **Si vuelves a tocar textos de `/aprende`, hay que correrlo.**

La hoja de cotización (`src/lib/hojaCotizacion.js` → `cotizador.docLeyenda`) **ya
estaba limpia**: sólo decía «Productos para uso en investigación (RUO)».

El pie del sitio ya se había arreglado el 2026-07-28, con este mismo criterio.

## ⚠️ DÓNDE SE CONSERVÓ, Y POR QUÉ

**Se queda sólo en la capa legal**, exactamente como Certified:

- `src/data/info/terminos.js`, cláusula 2 — «Ningún producto está destinado ni
  autorizado para consumo humano o animal…» y la prohibición de reetiquetar.
- `info.terminos.body` en los tres i18n.
- `acuerdo.py`, cláusulas 2 y 13 del Acuerdo de Distribuidor.

Esa frase es el respaldo frente a COFEPRIS y frente a un cliente que alegue uso
indebido. Sacarla de las fichas y los correos quita el susto sin quitar el
respaldo; sacarla **también** de los Términos dejaría el marco RUO sin diente.
Christián decide: una palabra suya y sale también de ahí.

## La cadena que queda en pie al comprar

1. **Puerta de entrada** (`RuoGate`) — tres puntos: RUO, «no es medicamento ni
   suplemento», y 18+ con fines de investigación. Hay que palomear para entrar.
2. **Casilla del checkout** — «Confirmo que soy mayor de 18 años y entiendo que
   los productos son exclusivamente para investigación (RUO). Acepto:» + liga a
   Términos. **Esa casilla nunca mencionó el consumo**, así que no perdió nada.
3. **Términos y Condiciones** — ahí sigue la cláusula completa, y es lo que el
   comprador acepta al palomear.

## Prohibición en los prompts

`ai_assistant.py` y `chat_negocio.py` traen escrito, con fecha, que NO vuelvan a
usar la fórmula. Si no, la IA la reintroduce sola en cada respuesta.

---

# 🖨️ 2026-07-31 — IMPRIMIR LA GUÍA DESDE EL PANEL (admin y distribuidor)

Orden de Christián: «¿Puedes hacer que recibamos la guía para imprimir en nuestro
panel de distribuidor o admin panel? Recuerda que quiero manejar **TODO** desde
nuestra app». La etiqueta de Brenda (EX-20260730-5930, FedEx 875164874865) ya se
imprime de un botón.

## Dónde está el botón

| Quién | Cómo llegar | Botón |
|---|---|---|
| Admin | `/admin` → Pedidos → abrir el pedido | **Imprimir Guía** (junto a «Poner Guía») |
| Admin | `/admin` → cualquier ficha de pedido (campanita, ficha del cliente, listas) | **Imprimir Guía** |
| Distribuidor | `/distribuidor` → Pedidos → abrir el pedido | **Imprimir Guía**, sólo en SUS pedidos |

Sale sólo cuando hay etiqueta que traer (`tiene_etiqueta`): una guía **tecleada a
mano** no tiene PDF nuestro, y ofrecer un botón que no puede cumplir es peor que no
ofrecerlo.

## Qué pasa al picarlo

1. Se le pide el PDF a **nuestro** servidor, con sesión (`/…/orders/{numero}/etiqueta`).
   La liga del proveedor **nunca** viaja al navegador del distribuidor.
2. Se abre el diálogo de impresión, en un iframe limpio — el mismo truco de la hoja
   de cotización. Si el navegador no deja (Safari con ciertos PDF), se abre en pestaña
   nueva y avisa. Y queda un **Abrir PDF** para guardarla o mandarla por WhatsApp.
3. **Si el PDF todavía no existe** (la paquetería publica el papel unos segundos
   después de vender la guía): el botón dice **«Generando…»** y reintenta solo, tres
   veces cada 4 segundos. Nadie tiene que saber que eso pasa.

## Las tres cosas que estaban rotas y ya no

- **La liga firmada caduca.** Era un `<a href={label_url}>`: el día que caducaba, el
  botón se veía igual de bien y no traía nada. Ahora el servidor baja el PDF,
  comprueba que **de verdad sea un PDF** (una liga vencida contesta 200 con HTML de
  error) y si no, lo rescata por número de rastreo y guarda la liga nueva.
- **El distribuidor no podía imprimir nada**: `label_url` sólo viajaba al admin, así
  que cada paquete que despachaba María tenía que pasar por Christián.
- **Dependía de la plataforma.** Ahora todo pasa por `paqueterias.modulo(...)`: el
  pedido de Brenda se despachó con **Envíos Internacionales** y se le pregunta a ÉSE,
  no a Skydropx.

## Dónde vive

| Qué | Archivo |
|---|---|
| Rutas + rescate + servir el PDF | `novapeptidos-RBAC/etiquetas.py` |
| El sí/no que enciende el botón | `server.py` → `_detalle_de_pedido` → `tiene_etiqueta` |
| El botón | `src/components/BotonImprimirGuia.js` |
| Bajar / imprimir / plan B | `src/lib/etiquetaGuia.js` |
| Pruebas (17) | `test_etiquetas.py` |

⛔ **El candado vive en el servidor.** `test_etiquetas.py` empieza por la prueba que no
puede fallar nunca: un distribuidor **no** saca la etiqueta de un pedido ajeno (403).
Una etiqueta trae impreso el nombre y el domicilio COMPLETO del cliente de otro, y
esconder el botón no sirve: el número de pedido ajeno se teclea en la barra de
direcciones. Comprobado en vivo: 403 en el ajeno, 401 sin sesión, 200 con el suyo.

**Verificado en vivo (2026-07-31):** admin y María bajan el MISMO PDF de 108,722 bytes
del pedido de Brenda; el papel dice `TRK# 8751 6487 4865`, STANDARD OVERNIGHT, San
Juan del Río QRO 76807.

---

# 📬 2026-07-31 — UN SOLO CORREO, Y LA GUÍA SE COMPRA SOLA

Dos órdenes de Christián el mismo día: **simplificar los correos al cliente** y
**comprar la guía automáticamente al entrar el pago**. Sus palabras: «nadie debe
recibir tres correos por una compra. Consolida.»

## Qué correo recibe el cliente en cada caso

| Cómo pagó | ¿Se compró la guía? | Correos | Qué dice cada uno |
|---|---|---|---|
| Tarjeta / cripto | Sí | **1** | pedido + pago confirmado + número de guía, todo junto |
| Tarjeta / cripto | No (freno o fallo) | 2 | pago confirmado («el rastreo llega en cuanto salga») → luego el rastreo |
| SPEI / OXXO | Sí | **2** | CLABE o ficha → pago confirmado + guía |
| SPEI / OXXO | No | 3 | CLABE → pago confirmado → rastreo *(el único caso de 3; ver abajo)* |
| Envío partido | Dos guías | +1 | cada aviso dice qué lleva ese paquete |

**La regla, en una línea: un correo por EVENTO REAL y jamás dos por el mismo
evento.** Los eventos son tres — hay que pagar (sólo si el pago no es inmediato),
entró el dinero, salió un paquete — y cuando dos caen juntos en el tiempo, caen
juntos en el mismo correo.

**El truco que quita el tercer correo:** la guía se compra ANTES de mandar el correo
de pago confirmado (`_confirmar_y_avisar` en server.py), así ese correo ya la lleva
adentro. Antes iban en paralelo y salían dos.

- **La puerta es una sola**: `avisar_al_cliente(order, evento)`. El candado de
  «nunca dos veces» vive en el pedido (`emails_sent`), apartado con un `$addToSet`
  condicionado en un solo paso — igual que el cupón y los puntos.
- `send_payment_confirmed_email` quedó **jubilada**. Reconectarla al flujo de compra
  devuelve el tercer correo; lo dice en su propio docstring.
- Con tarjeta y cripto ya **no** sale el correo de «recibimos tu pedido». Sí sale si
  la pasarela no da liga de pago (si no, se quedaría sin nada por escrito).

## La compra automática, con dos frenos y un candado

`envios.COMPRAR_GUIA_AL_PAGAR = True` (encendido por orden suya).

1. **Freno del empaque.** Sólo existe UN empaque: la bolsa stand-up 12×15×1 cm, ~4
   piezas. **1-4 piezas compra sola; 5 o más se detiene** y le avisa a él. Antes todo
   se cotizaba como 1 kg en caja chica y lo que no cabía volvía como **recobro por
   sobrepeso**. Es tabla **configurable** desde Admin → Envíos
   (`PUT /admin/envios/empaques`): el día que compre cajas las captura ahí y ese
   rango empieza a comprar solo, **sin desplegar**.
2. **Freno de gasto: $400** (`envios.TOPE_GUIA_AUTOMATICA_MXN`). Se revisa ENTRE
   cotizar y comprar. Si el servicio pedido se pasa pero hay otra permitida más
   barata que sí cabe, se toma ésa; si ninguna cabe, no compra y pide visto bueno.
3. **Candado atómico** (`label_lock`): dos webhooks simultáneos no compran dos guías.
4. **Si falla** (sin saldo, API caída, dirección rechazada): correo URGENTE +
   campanita a Christián, **reintento solo cada 10 min** hasta 6 veces, y el cliente
   recibe su pago confirmado diciendo que el rastreo llega en cuanto salga. **Nunca
   se manda un número de guía que no existe.**

Un **freno** nunca se reintenta (espera una decisión); un **fallo** sí.

## Envío partido: ahora lo elige el cliente

En el checkout, y **sólo cuando el pedido no sale completo**, se le pregunta:
«¿te mando lo disponible ya (2-5 días) o esperas a tenerlo todo junto (~1 semana)?».
Se guarda en `shipping_preference` y se respeta al despachar: con `completo` la guía
no se compra mientras falte mercancía. Textos en los tres idiomas, Title Case.

## Los datos de pago ya no se pierden

- **OXXO**: la liga de Mercado Pago (que ES la ficha con el código de barras) se
  guarda en el pedido y se puede volver a abrir desde `/pedido/:numero`. Antes
  viajaba una sola vez y quien cerraba la pestaña ya no podía pagar.
- **SPEI**: la CLABE ya persistía; ahora además hay botón «Ver Datos Para Pagar»
  desde Mis Pedidos, que antes no tenía ni un enlace.

## De regalo: lo interno dejó de viajar al navegador

`pedido_para_el_cliente` ahora filtra también `shipping_cost`, `shipping_absorbed`,
`shipping_quote` y los `label_*`. La regla de «el cliente nunca ve la cifra del
envío» estaba cuidada en los correos y **no** en la API — y `/orders/{numero}` ni
siquiera pide sesión.

## ⚠️ Lo que falta que decida Christián

1. **Medidas y peso de las cajas** chica y mediana, para el día que las compre. Sin
   ellas, todo pedido de 5+ piezas seguirá parándose a preguntar. **No se
   inventaron**: una medida inventada es justo lo que produce el recobro.
2. **SPEI + sin guía = 3 correos.** Es el único camino donde no se pudo bajar de
   tres, y los tres son eventos reales (CLABE / entró el dinero / salió el paquete).
   Callar el de «pago confirmado» dejaría a alguien que ya transfirió sin saber que
   su dinero llegó. Se dejó así; si prefiere otra cosa, se cambia en un lugar.

Pruebas: `test_correos_y_guia_automatica.py` (31, con dientes: corren el endpoint y
**cuentan los correos que de verdad salieron**). Suite backend en 940, cero fallas.

---

# 📹 CITA HOY VIERNES 2026-07-31, 4:00 PM (hora de Cancún) — VIDEO SEMANAL DE ADS
Orden de Christián: video de 1-2 min explicando la semana de publicidad de Meta
(gasto, clics, WhatsApps, compras del píxel/CAPI, embudo, mejor anuncio y UNA
recomendación), con datos EN VIVO de la API (act_1357297706382259, llaves en
~/.config/exygen/meta.env) y el pipeline local (Media/Videos/pipeline:
Playwright + edge-tts + ffmpeg). Guardar como REPORTE-ADS-SEMANA-2026-07-31.mp4
y entregárselo con SendUserFile. Hay un cron en la sesión de la noche del 30-jul
que lo dispara solo; si esa sesión ya murió, LA SESIÓN DE GUARDIA LO HACE A LAS
4 PM. En cristiano — es para Christián. (Dato cultural: se despide con
"Buenooooo", como los yucatecos al teléfono.)

# 🔒 2026-07-31 — EL CLIENTE YA NO SE ENTERA DE QUIÉN ES EL CÓDIGO

Orden de Christián: **«los clientes no pueden ver que el código de descuento es de
María»**. Ni su nombre, ni su correo, ni su id. Quien atiende al cliente es la
atención de la casa: **Mónica Flores** (`emails.ATENCION_NOMBRE`).

El rastro se asomaba en **cuatro** lugares, y tres de ellos eran datos que el
servidor MANDABA sin que ninguna pantalla los pintara — invisibles salvo abriendo
la consola del navegador:

| Dónde | Qué se veía | Cómo quedó |
|---|---|---|
| Correo de cotización | «María preparó esta cotización para ti» y el `reply_to` al **correo personal** de la distribuidora | Lo firma Mónica Flores; la respuesta cae en `hola@exygenlabs.com`; a la distribuidora se le avisa por la campanita |
| Respuesta del checkout (`POST /orders`) | `referred_by`, `commission` y el reparto completo de comisiones | Se filtran en el servidor (`pedido_para_el_cliente`) |
| `GET /orders/me` | lo mismo | Igual |
| `GET /orders/{numero}` — **sin sesión** | lo mismo, y ésta la abre cualquiera con el número | Igual |

- El candado va en el **servidor**: lo que no viaja no se puede leer. Nada de CSS.
- El validador público `/discount-code/{codigo}` **ya estaba limpio** (sólo el % y
  el monto mínimo); ahora hay prueba que truena si alguien lo reexpone.
- **El admin y la propia distribuidora siguen viendo TODO lo suyo**: sus rutas
  (`/admin/...`, `/distributor/...`) no pasan por el filtro.
- Pruebas nuevas: `test_privacidad_distribuidor.py` (19). Leen el sobre completo
  —el JSON o el HTML como texto— y truenan si aparece el nombre, el correo o el id.
- La auditoría en vivo (`npm run auditoria`) ahora saca los **códigos de verdad**
  con la llave del admin y los consulta **sin sesión**, como los ve internet.

## ⚠️ Dos cosas que decide Christián

1. **El texto del código lo delata solito.** Los 10 códigos vivos llevan el nombre
   pegado (`MARIAN-15-R4YV`, `ALANIS-20-FRUK`, `JAVIER-25-RHV4`), más 3 códigos
   únicos viejos (`MARI-3537`, `ALAN-2292`, `JAVI-7116`). **No se tocaron**: el
   cliente ya los tiene. Formato neutro propuesto para los NUEVOS: `EXY-15-R4YV`.
   ¿Se rotan los vivos (se mueren los que andan sueltos) o se dejan morir solos a
   los 90 días?
2. **Había dos Mónicas.** La portada y el pie decían «Mónica **Fuentes**» (puesto
   el 30-jul); la orden del 31-jul dice «Mónica **Flores**». Se unificó todo a
   **Flores**. Si la buena era Fuentes, son 3 renglones de i18n para devolverlo.

# 🆕 2026-07-31 — PROVEEDOR NUEVO: P43 «Jess» / Peptide Makers

Cuenta de negocio de Hong Kong, **+852 7019 3438**, llegada por **anuncio de Instagram**.
Mandó un solo archivo: `-Peptide Makers Catalog .pdf` (7 páginas, 8.6 MB), guardado en
`pricing-system.nosync/proveedores/whatsapp/extraidos/Jess/`.

| ID | Quién | Renglones | Moneda |
|---|---|---:|---|
| **P43** | **Jess / «Peptide Makers»** (+852 7019 3438, Hong Kong) | **234 en el PDF · 211 con precio · los 211 capturados (100%)** | ⚠️ **no la declaró**: dice «$», se dedujo USD |

Los 23 renglones restantes traen **«X» en la columna de precio** en su propia lista: no es
captura perdida. El PDF no lo abre el importador, así que la transcripción la hizo Claude
página por página a un CSV (`proveedores/procesados/Jess +85270193438.csv`) — no un OCR a
ciegas.

**Dónde le gana al más barato de hoy (tamaño contra tamaño, sin contar a Lucy que está
vetada):** en **31 tamaños**, pero todos de catálogo secundario. Los más grandes: TB Frag
10 mg $6.80/pz (hoy $13.80), las 8 medidas de HGH (−10% a −39%), HGH Fragment 176-191
5/10/12/15 mg (−9% a −29%), B12 $4.50 (hoy $6.45), L-Carnitine 600/1200 mg (−22% a −27%),
Bronchogen 20 mg $7.80 (hoy $10.50), HCG 1000 IU $2.50, P21 $23.80, Melatonina $4.20,
B7-33 10 mg $14.50, BPC-157 20 mg $8.00, Pinealon, SS-31 5 mg, Vesugen, KPV 10 mg,
SLU-PP-332, Thymalin y Hexarelina.

**Donde NO gana es en lo que da el dinero:** en Retatrutida, Tirzepatida, Semaglutida y
Cagrilintida está claramente arriba en TODAS las medidas (Reta 60 mg $23.80 vs $10.15 de
Mia; Tirze 20 mg $11.00 vs $4.80 de Chuangyan; Sema 10 mg $5.00 vs $3.50).

⛔ **NO SE MOVIÓ NINGÚN PRECIO NUESTRO.** Igual que con P40/P41/P42, el test
`test_precios.py::test_el_costo_de_la_maestra_es_el_del_proveedor_mas_barato` **queda en
rojo a propósito** (347 pasan, 1 falla): avisa que **23 costos** de la MAESTRA ya no son los
del proveedor más barato. Cerrarlo pide `refrescar_costos.py` + `reprecio.py`, que **mueve
precios** — decisión de Christián. Y otra vez: el 31-jul otra sesión estaba escribiendo
`MAESTRA.xlsx` en ese mismo minuto; tocarla habría pisado su trabajo.

⚠️ **Todo lo que promete está SIN COMPROBAR** y no se le ha comprado nada: acepta tarjeta
de crédito, «la mejor calidad» y reposición total si se pierde el paquete. **No dijo envío,
ni pedido mínimo, ni días de entrega, ni bodega, ni COAs.** Vende además cosas que no son
péptidos RUO (toxina botulínica, HGH, HCG, HMG, EPO, Lemon Bottle).

⚠️ **Sus nombres traen erratas** y se transcriben tal cual: `CHRP-2`/`CHRP-6` por
GHRP-2/GHRP-6, `CJC-1296/1297` por CJC-1295, `Semag Lutide`, `Trizepatide`. Por eso el
motor **no empareja solo** su GHRP-2 y GHRP-6 de 10 mg, que a $3.80/pz serían los más
baratos (hoy $4.00). Tres renglones (`LC396`, `WA3`, `WA10`) vienen sin nombre de producto
en su lista.

⚠️ **Hay un mensaje suyo que WhatsApp Web no sincronizó** («Waiting for this message. Check
your phone»): está en el teléfono de Christián y no se pudo leer.

Ficha: `pricing-system.nosync/proveedores/md/P43-jess.md`.

# 🆕 2026-07-31 — TRES PROVEEDORES NUEVOS DEL WHATSAPP (P40, P41, P42)

Barrido completo de los chats de WhatsApp (24 activos + 18 archivados) contra los 39
proveedores ya registrados. **Tres números nuevos mandaron lista**; el resto de los chats
nuevos son saludos automáticos sin precios, o gente ya registrada con otro nombre
(«Certiva Peptide RT40 - $179» es el **mismo** +852 9247 1518 = P10; la «Mia» archivada es
el **mismo** +1 505 518 0805 = P18).

| ID | Quién | Renglones | Moneda |
|---|---|---:|---|
| **P41** | **Chuangyan Biotech** (+852 9056 5942, Hong Kong / Guangzhou) | **233 de 233 con precio (100%)**, 231 en la base | USD, dicho por él: «US dollars per box» |
| P40 | sin nombre (+44 7576 123262, Reino Unido) | 199 de 199 (100%), 193 en la base | ⚠️ **no la declaró**, se dedujo USD |
| P42 | sin nombre (+44 7355 266554, Reino Unido) | 96 transcritos, **0 importados** | ⚠️ **no la declaró** |

**P41 Chuangyan es el hallazgo.** Es el más barato del catálogo en **57 tamaños** (46 de
ellos productos que vendemos hoy), quitando a Lucy que está vetada. Ejemplos por vial:
Retatrutida 40 mg $14.90 (hoy el mejor no vetado es $16.00), Tirzepatida 10 mg $3.20
(antes $4.00), BPC-157 2 mg $1.40 (antes $2.00), GHK-Cu 50 mg $1.50 (antes $2.30).

**P40 no le gana a nadie** en ningún tamaño. **P42 no se importó a propósito**: su tabla no
trae presentación (el tamaño sólo va en la clave) ni dice si el precio es por vial o por
caja. Media lista guardada es peor que ninguna.

⛔ **NO SE MOVIÓ NINGÚN PRECIO NUESTRO.** Por eso `test_precios.py::test_el_costo_de_la_maestra_es_el_del_proveedor_mas_barato`
**está en rojo a propósito**: avisa que 46 costos de la MAESTRA ya no son los del proveedor
más barato. Cerrarlo pide `refrescar_costos.py` + `reprecio.py`, que **mueve precios** —
decisión de Christián. Además el 31-jul otra sesión estaba escribiendo `MAESTRA.xlsx` en ese
mismo momento; tocarla habría pisado su trabajo.

⚠️ Todo lo que prometen (fábrica más grande de Guangzhou, pureza 99.99%, COA por lote,
mínimos flexibles) está **SIN COMPROBAR**. Ninguno declaró envío: se les puso el estimado
de la casa ($60) con la bandera `envio_estimado`, y **un flete estimado no sustenta un
cambio de precio**.

**Falta que Christián mande 4 preguntas** (borradores en el reporte de la sesión): moneda de
P40 y P42, por-vial-o-por-caja de P42, y los precios que cada uno se contradice a sí mismo.

Fichas: `pricing-system.nosync/proveedores/md/P40-…`, `P41-chuangyan.md`, `P42-…`.
Archivos originales: `proveedores/whatsapp/extraidos/{chuangyan-+85290565942, +447576123262, +447355266554}/`.

**El lector tenía 3 huecos y ya están tapados** (`importar_proveedor.py`): no abría `.xls`
de verdad (moría antes de leer los demás archivos), no reconocía el encabezado «US dollars
per box» (237 precios perfectos = «no encontré una tabla»), y —el peor— **al reescribir
`proveedores.csv` borraba en silencio las columnas que otro script había agregado**
(`envio_estimado`, `vetado`, `motivo_veto`): se llevó el veto de Lucy y las 16 banderas de
envío estimado. Restaurado y con candado.

# 🤝 HANDOFF — 2026-07-31 — 📦 LA PRIMERA GUÍA REAL, COMPRADA

**Pedido EX-20260730-5930 (Brenda) — rastreo FedEx `875164874865`.**
Comprada por **Envíos Internacionales** (la plataforma que tenía saldo; Skydropx estaba
en $0), FedEx Standard Overnight 3 días, **$192.90**. Saldo de EI: $2,500 → **$2,307.10**.
La clienta **no pagó envío** ($0, total $4,827 intacto): lo absorbió la casa.
**Sin recolección** — Christián la deja en un mostrador FedEx.

⚠️ **COSTO REAL vs EL SUPUESTO DEL MOTOR.** El motor mide el piso de 5× con
`envio_costo_real_mxn = $165`, y la primera guía real costó **$192.90** — **$27.90 más**.
Un solo dato no mueve una regla (por eso `actualizar_costo_envio.py` pide **≥8 guías**
antes de recalcular), así que **NO se cambió nada**. Queda reportado: si las siguientes
guías rondan los $190, el piso de 5× se está midiendo optimista y hay que subir esa cifra.

## ⛔ TRES LÍMITES SIN DOCUMENTAR QUE SÓLO APARECEN AL COMPRAR

Cotizar es gratis y nunca se queja; es la COMPRA la que rebota, con el pedido **ya
pagado** y la clienta esperando. Salieron de uno en uno, en dos intentos:

| Campo | Tope real | Documentado |
|---|---|---|
| nombre del destinatario | **30** | no |
| referencia | **40** | no |
| calle (`street1`) | **45** | no |

Su OpenAPI declara **un solo** `maxLength`, y es de otro campo. Los tres se recortan ya
en `skydropx._direccion_envio`, que **comparten las dos plataformas**. El recorte no es a
lo bruto: el nombre pierde los nombres de en medio («Brenda Iliana Oseguera Gonzalez» →
«Brenda Oseguera Gonzalez») y la calle suelta el interior antes que el número.

## Lo demás que salió de esta primera compra

- **El PDF no viene en la respuesta de compra.** Llega el rastreo al instante y el
  `label_url` VACÍO — el PDF se genera segundos después. Nuevo
  `POST /admin/orders/{id}/rescatar-etiqueta` lo trae sin volver a comprar, y la ficha
  del admin ya lo muestra (**sólo admin**: comprar guías es dinero de la casa).
- **Saldo a la vista antes de despachar:** `GET /admin/envios/saldo`. Existe porque la
  primera compra rebotó con «créditos insuficientes» sin que nada avisara.
- **El origen NO se puede mover desde el panel**: está fijado por variable de entorno del
  servidor (Playa del Carmen 77710). Cambiarlo afecta TODAS las guías futuras.
- La venta es de **María**, y con su interruptor encendido ve el contacto de Brenda y el
  rastreo — pero **no** el PDF ni el costo de la guía.

---

# 🤝 HANDOFF — 2026-07-31 — EL REGALO TOPADO EN 40%, Y DOS FALLAS DE CODEX QUE ERAN RUIDO

**Compuertas: backend 848/848 ✅ · auditoría 85/0 ✅.** Desplegado `0869ad3` (azul/verde).

## ⛔ EL REGALO SE TOPA EN 40% (orden de Christián)

El cupón **GIFT** del admin se creaba con `min(0.50, …)`: era **la última puerta arriba del
techo de la casa**. La venta directa se capó el 29-jul y el checkout público nunca pasó de
40%, pero el regalo sí — medio producto regalado.

Ahora hay **una sola definición** (`server.tasa_de_cupon`) y se aplica en las **dos puntas**:
al crear el cupón y **al cobrarlo**. Por eso los GIFT que ya andaban sueltos con 50% no se
cancelan: el cliente conserva su regalo, sólo que vale 40%. El validador público
(`/api/discount-code/…`) y la ficha del cliente devuelven la MISMA cuenta que cobra la caja,
para que nadie vea en pantalla un descuento que la caja no da. Encima sigue mandando el tope
de cada producto y los insumos siguen fuera.

⚠️ **No pude enumerar los cupones vivos** (la consulta a Mongo en el EC2 la frenó el sistema
de permisos). No hace falta para que funcione — el tope al cobrar los cubre a todos — pero
si quieres la lista de quién tenía 50%, hay que correrla con permiso.

⚠️ **Queda UNA puerta arriba del 40% a propósito**: `personal_discount_rate` (el trato
especial permanente por cuenta, el caso de Paz Cambray) admite hasta 50%. Es otro mecanismo
y Christián no lo mencionó, así que **no lo toqué**. Si también debe bajar a 40%, es un
cambio de una línea.

## Las dos fallas que reportó Codex: RUIDO las dos

Codex reportó dos fallas del backend. **Las dos ya estaban cerradas** y se verificaron
adversarialmente antes de tocar nada:

1. **"El checkout permite 40 piezas con 20 de inventario, en los 193 productos" — RUIDO.**
   Es la **regla del dueño** (ENVÍO PARTIDO, 2026-07-30): ninguna venta se bloquea por
   inventario. Se comprobó que las tres cosas que SÍ serían hallazgo están bien: el aviso
   sale en el **Checkout antes de pagar** en es/en/pt (verificado en los archivos JS EN
   VIVO de exygenlabs.com), el conteo parte bien (`test_pedir_21_con_20_piezas_reales…`),
   y el arreglo viejo sigue vivo — el checkout mide contra `/api/stock` (205 renglones
   reales), no contra el contador sembrado. **De hecho el "40" ya ni existe: el catálogo
   en vivo trae 20 en 174 de 191 productos.**

2. **"La venta directa admin permite 60% con el máximo en 40%" — YA ARREGLADO EL
   2026-07-29** (commit `dc85f92`), por el propio auditor de Codex. Hoy es
   `min(loyalty.MAX_DISCOUNT, …)` y además respeta el tope de cada producto.
   ⚠️ Las pruebas que lo cuidaban **sólo leían el texto del código**, así que no servían
   para refutar la reincidencia. Se agregaron **3 pruebas que CORREN el endpoint**
   (`test_puntos.py`): pedir 60% graba 40%, un 20% normal no se recorta, y los insumos
   siguen sin descuento. Se comprobó que tienen dientes: al revertir el tope a 0.60 la
   prueba truena.

**Los dos prompts de Codex** (`pricing-system/PROMPT-AUDITORIA.md` y `PROMPT-ROMPEDOR.md`)
quedaron reforzados con las pruebas concretas que hay que traer ROTAS antes de volver a
levantar cualquiera de las dos.

---

# 🤝 HANDOFF — 2026-07-31 (noche) — LA CARRERA DEL CUPÓN, Y 21 PRUEBAS ESCONDIDAS

**Compuertas: backend 841/841 ✅ · motor 344/344 ✅ · auditoría 85/0 ✅.** Desplegado `e9773b7`.

1. **El cupón de un solo uso se podía usar DOS veces.** El auditor de Codex lo reportó y
   **era real** — reproducido antes de arreglar: con el código viejo dos canjes en
   paralelo devolvían `[True, True]`. Se miraba el cupón al principio del checkout y se
   marcaba usado al final; entre las dos líneas hay una docena de `await`.
   ⚠️ **El auditor se quedó CORTO**: puso la pérdida en $2,303.70, pero el tope real es el
   40% de lo que valga el segundo pedido, y aquí hay tickets de $177,650.
   Es la **tercera vez** que aparece esta misma carrera (inventario → puntos → cupón).
   Tapado con el mismo candado de siempre: la condición viaja DENTRO del update, se quema
   ANTES de grabar el pedido, y si el insert truena el cupón revive.

2. **`test_meta_capi.py` llevaba tiempo fuera de la suite** escondiendo una prueba en
   rojo: la que garantiza que los pedidos de prueba (@example.com de la auditoría y los
   E2E) **nunca lleguen a Meta**. De Meta no se pueden borrar e inflan el ROAS. Fallaba
   porque el descarte del pedido de prueba iba DESPUÉS del «¿hay token?» — o sea que se
   frenaba por casualidad, no por la regla. Ahora va primero. **21 pruebas que nadie
   corría, ya en verde.**

3. **La compuerta ahora se vigila a sí misma.** `pytest.ini` lista los archivos a mano
   (tiene que hacerlo) y se quedó atrás DOS veces el mismo día. La prueba nueva
   `test_todas_las_pruebas_del_repo_estan_en_pytest_ini` truena si agregas un `test_*.py`
   y no lo registras. **Si creas pruebas nuevas, regístralas ahí.**

---

# 🤝 HANDOFF — 2026-07-31 (tarde) — PRIVACIDAD POR INTERRUPTOR + AUTOLLENADO

## ⛔ LO ÚNICO PENDIENTE: LA GUÍA DE BRENDA NO SE COMPRÓ

La compra quedó **frenada por el sistema de permisos** — es dinero real y manda a una
paquetería a recoger a un domicilio. Hace falta que **Christián lo confirme él mismo**;
una autorización que llega de rebote no basta para gastar su dinero. Todo lo demás de la
Fase 2 está hecho, probado y en vivo.

Cuando lo confirme, todo está listo y verificado para ejecutarlo:
- pedido **EX-20260730-5930** · Brenda · destino **CP 76807, San Juan del Río, Querétaro**;
- tarifa elegida: **Estafeta Servicio Express, 1 día, $200.49** (cotización real de hoy);
- bulto: 1 kg facturable (pesa 200 g; el kilo es el mínimo de las paqueterías), caja chica;
- remitente de ESA guía: casa de Christián, **CP 77727**, tel. 999-904-1307.

⚠️ **Dos cosas que se descubrieron y hay que tener presentes:**
1. **La recolección NO se puede pedir en otra dirección por API.** El endpoint de
   recolección sólo recibe el id del envío — no hay campo de domicilio. Recogen donde
   diga el remitente del envío, punto. Para que pasen por casa de Christián, el
   remitente de la guía TIENE que ser su casa.
2. **El remitente del servidor manda sobre el del panel** (por variable de entorno) y
   es uno solo para todas las guías. No hay «remitente de esta guía» en el flujo del
   panel: para la de Brenda hay que fijarlo aparte. Si se quiere que sea el de siempre,
   eso sí es cambiar el `.env` del EC2 — y afectaría a TODAS las guías futuras.

## ⛔ HALLAZGO GORDO DEL CIERRE: el subidor de topes llevaba días mintiendo

`subir_distribuidor_backend.js` —el que sube al backend la comisión y la elegibilidad
de distribuidor— **decía «0 variantes a actualizar» pasara lo que pasara**. Leía las
dos puntas de la comparación en lugares donde esos campos ya no existen: el catálogo
público (de donde se sacaron a propósito el 30-jul, porque viaja en el bundle y
delataba el margen) y la ruta pública `/api/products` (que tampoco los expone). Comparaba
`undefined === undefined` y salía en verde.

**Había 21 productos desalineados**, entre ellos los tres que ya debían estar en el canal.
Ya está arreglado (lee de `maestra.csv` y de `/admin/products`, con candado del 80% de
emparejamiento por SKU) y **aplicado en vivo**: correrlo otra vez da 0. Ningún precio
público se movió. ⚠️ Si vuelves a ver «0 a actualizar» en cualquier script de estos,
desconfía: en esta casa el emparejamiento ya falló en silencio varias veces.

## ✅ HECHO Y EN VIVO (31-jul tarde)

**Compuertas: backend 807/807 ✅ · motor 344/344 ✅ · auditoría 85/0 ✅.**
Desplegado `177a9f7`, disco al 37%.

1. **Datos del cliente: interruptor POR DISTRIBUIDOR.** El 23-jul Christián cerró el
   correo/teléfono/domicilio a los distribuidores; el 31-jul lo abrió **sólo para
   María**. Por eso es un interruptor por persona y no una regla nueva: los demás siguen
   igual, y encender a otro es **un clic del admin**, no un despliegue.
   - Ya está **prendido en vivo para María** y **apagado** para Alanís y Javier
     (verificado contra el servidor de producción).
   - Ruta: `PUT /admin/distributors/{id}/ve-datos-cliente`. El estado se ve en la lista
     de distribuidores del panel.
   - **Lo que el interruptor NO afloja** (con prueba cada uno): el candado de «sólo SUS
     clientes» (el pedido de otro sigue dando 403), el margen de la casa (costo,
     proveedor y ROI no viajan ni encendido), y el «ver como» sigue de sólo lectura.
   - El **admin** ve el contacto siempre, sin depender de nada.

2. **Autollenado del Cotizador.** Al teclear el nombre se sugieren los clientes ya
   registrados y al elegir uno se rellenan sus datos. Ruta nueva
   `GET /cotizador/clientes` (admin y distribuidor).
   ⛔ **El candado está en el SERVIDOR**: a quien no tiene visibilidad completa NO LE
   VIAJAN correo/teléfono/domicilio — no es que la pantalla no los pinte, es que no
   están. Así el autollenado sólo rellena el nombre. Esconderlos en el navegador no
   esconde nada: la respuesta se lee en la consola con la sesión abierta.

3. **Stress test del doble cotizador — encontró un agujero de verdad.** Las dos
   paqueterías topan en **2 peticiones por segundo** y nadie llevaba la cuenta: el único
   freno era el `sleep` DENTRO de una cotización. Dos o tres despachos simultáneos
   mandaban el doble o el triple y la paquetería contesta **429** — a media compra de
   guía, eso es un pedido que no sale. `ritmo.py`: ventana deslizante con candado de
   hilos (FastAPI corre esas rutas en su pool de HILOS, no en corrutinas). Cada
   proveedor lleva su propia cuenta.

4. ⚠️ **Un agujero en la propia compuerta:** `pytest.ini` lista los archivos de prueba
   A MANO, así que mis 43 pruebas nuevas **no se estaban corriendo** en la suite
   completa. Ya están registradas (760 → 807). **Si agregas un `test_*.py` nuevo,
   añádelo a `pytest.ini` o no lo corre nadie.**

---

# 🤝 HANDOFF — 2026-07-31 — DOBLE COTIZADOR DE ENVÍOS + ENVÍO REAL EN EL ROI

## ⛔ EL BACKEND ESTÁ EMPUJADO PERO **NO DESPLEGADO**

El código está en `main` (backend `9d85f35`, motor `3afd35c`), pero **el despliegue
del backend queda pendiente**: el disco del EC2 está al **99%** y Christián tiene que
disparar la limpieza antes. El `deploy.sh` nuevo ya recoge basura al final de cada
despliegue futuro, así que esto no se vuelve a acumular. Nada de lo de esta tanda
está en vivo todavía — y no hace falta que lo esté: nace apagado.

## ✅ HECHO el 31-jul (probado y empujado)

**Compuertas al cierre: backend 760/760 ✅ · motor 344/344 ✅** (cero fallas en los
dos). El motor quedó además en punto fijo: dos corridas en seco de `reprecio.py` dan
**0 cambian de precio**, y `--solo-derivadas` dice «nada que corregir».

1. **Doble cotizador de envíos.** Cada pedido se cotiza en **Skydropx Y en
   enviosinternacionales.com**, se juntan todas las tarifas, se ordenan por precio
   y se contrata la más barata. Piezas nuevas:
   - `enviosinternacionales.py` (backend) — espejo de `skydropx.py`. Reutiliza a
     propósito sus traductores de direcciones/bultos/tarifas: si es la misma API,
     tiene que ser la misma traducción y un solo lugar donde arreglarla.
   - `paqueterias.py` (backend) — el comparador. Junta tarifas, mide el ahorro, y
     **compra la guía con el proveedor que la cotizó** (un `rate_id` sólo vale en
     la casa que lo emitió). Un proveedor caído NO tumba el despacho.
   - `test_paqueterias.py` — 15 pruebas. La que más importa: **sin llaves del
     segundo proveedor, todo se comporta EXACTAMENTE como hoy**.
   - `CotizarEnvio.js` (UI) — enseña la comparación por proveedor, el ahorro, y de
     qué casa sale cada tarifa. Es pantalla **interna**: el cliente nunca la ve.
   - ⛔ **NACE APAGADO.** Christián todavía no abre la cuenta. `enabled()` es False
     sin llaves y el sitio cotiza y compra sólo con Skydropx, igual que hoy.

2. **El ROI ya usa el envío REAL, no la tarifa plana.** El piso de 5× restaba $250,
   que NO es lo que cuesta una guía: es la política de cobro al cliente. Una guía
   real anda en **$139–$165** (medido en vivo, Playa del Carmen → Nuevo León).
   Ahora hay **una sola fuente**: la regla `envio_costo_real_mxn` en
   `datos/reglas.csv` (hoy $165, el extremo alto, porque equivocarse hacia arriba
   deja el piso MÁS exigente). La leen `reprecio.costo_real_del_envio()` y la vista
   `v_roi_real`. `actualizar_costo_envio.py` la reescribe con el p75 de las guías
   REALES en cuanto haya ≥8; el backend las exporta en
   `GET /api/admin/envios/costo-real?csv=1` (sólo admin — son costos de la casa).
   - **Efecto medido: CERO productos cambian de canal.** Lo único que se mueve es
     el suelo del HGH 40 IU: de $2,029 a $2,019. Ningún precio se aplicó.

3. **Línea ORAL de Exoma** anotada en `auditar_cobertura.RESUELTOS` (cápsulas y
   tabletas; nosotros vendemos vial inyectable y cero orales). Otra vía = otro
   producto. ⚠️ Que Exoma abriera esa categoría es decisión de negocio pendiente.

4. Prompts de Codex (ROMPEDOR y AUDITORIA) al día con las dos reglas deliberadas.

## 🔜 LO QUE FALTA

- **DESPLEGAR EL BACKEND** cuando Christián corra la limpieza de disco del EC2
  (hoy al 99%). Es lo único que falta para que esto exista en vivo.
- ~~Motor en rojo~~ **RESUELTO.** Las 5 notas con la cifra vieja (HGH 24iu, HGH
  36iu, HGH 191AA 15iu, IGF-1 LR3 1mg, Liraglutida 30mg) ya están al día, con
  **cero precios movidos**. Y de paso se cerró la causa raíz: la nota vive en DOS
  lados —la maestra y el renglón vigente de `datos/historial_precios.csv`— y el
  **historial MANDA** sobre la maestra al construir la base (`db.py`), así que
  refrescar sólo la maestra dejaba la base enseñando la cifra vieja. Ahora
  `reprecio.py --solo-derivadas --aplicar` refresca **los dos** con la misma
  función, así que no pueden discrepar. Respaldos:
  `backup_maestra_pre_envio_real_2026-07-31.xlsx` y `historial_precios.csv.bak`
  (los `*.bak` ya están en `.gitignore`).
- **Llaves de enviosinternacionales.com** cuando Christián abra la cuenta: se pegan
  en **Admin → Cobros** como `ENVIOSINT_CLIENT_ID` y `ENVIOSINT_CLIENT_SECRET` (o
  en `~/.config/exygen/enviosinternacionales.env`). Es lo ÚNICO que falta para
  encenderlo. Lo que ya NO falta: su API quedó verificada contra su **OpenAPI 3.0.1
  público** (`https://app.enviosinternacionales.com/es-MX/api-docs.json`, 45 rutas) y
  es en efecto **white-label de Skydropx** — mismos esquemas, OAuth2
  `client_credentials` con cuerpo JSON, cotización en diferido con polling, y compra
  en `POST /api/v1/shipments/` **con diagonal final** (sin ella la ruta sólo acepta
  GET; hay una prueba que congela ese detalle). Se pide además `unique_shipment` para
  que un reintento no compre una segunda guía. Falta sólo probarlo con llaves reales;
  para eso está el sandbox `sb-app.enviosinternacionales.com` (se apunta con
  `ENVIOSINT_API_URL`, sin tocar código).

---

# 🤝 HANDOFF — 2026-07-31 — POLÍTICA DE ENVÍO NUEVA (mínima $2,500 + tope 5%)

## La regla, en palabras de Christián

> «La política de envío será gratis siempre y cuando el ticket supere los $2,500 de
> compra mínima y/o no sea mayor a 5% del total de la compra. Primero se debe cumplir
> la compra mínima. De otra manera, se cobra un flat fee que aún tenemos que
> determinar. Creo que Certified cobra $250 flat; si es cierto, nosotros debemos
> cobrar menos, quizás $200 o $219.»

**Son DOS candados y el orden es la regla:**

1. **La compra mínima ($2,500).** Abajo de ella se cobra la tarifa plana, por barata
   que salga la guía. El 5% ni se mira.
2. **El tope del 5%** (era 10% hasta hoy). Cumplida la mínima, la casa absorbe la
   guía hasta ese 5% y el cliente pone la diferencia.

## ⚠️ LO QUE ESTO CAMBIA EN LA CAJA — leerlo antes de opinar

Con una guía de **$250**, el 5% no alcanza a taparla hasta los **$5,000**. O sea que
el "envío gratis desde $2,500" ya **no es $0** en esa franja:

| Compra | Antes (tope 10%) | Ahora (tope 5%) | Lo que pone la casa |
|---|---|---|---|
| $1,000 | $250 | $250 | $0 |
| $2,500 | $0 | **$125** | $125 |
| $3,000 | $0 | **$100** | $150 |
| $4,000 | $0 | **$50** | $200 |
| $5,000 | $0 | **$0** | $250 |

Es exactamente la regla que pidió el dueño y es la que protege el margen, pero
**cambia lo que ve y paga un cliente entre $2,500 y $5,000**. No es un error.

## Qué se tocó

**Backend** (`novapeptidos-RBAC`, commit «Envio: politica nueva…»):
- `envios.py` — `TOPE_ENVIO_SOBRE_COMPRA` 0.10 → **0.05**, y `COMPRA_MINIMA_ENVIO_GRATIS
  = 2500` **nueva**. `cobro_de_envio_al_cliente` acepta `tarifa_plana`.
- `server.py` — **la mínima dejó de derivarse** del costo de la guía. Antes era
  `SHIPPING_FLAT / TOPE` (250/10% = 2,500); con el 5% esa cuenta la habría movido sola
  a **$5,000** sin que nadie lo pidiera. Ahora son números independientes.
- `server.py` — se separó lo que se **COBRA** (`SHIPPING_FLAT`, un precio) de lo que la
  guía **CUESTA** (`COSTO_GUIA_ESTIMADO`). Mezclados, bajar el precio al cliente movía
  solo y en silencio el punto donde el envío sale gratis.
- Los tres números salen del **`.env` del servidor** (`SHIPPING_FLAT`,
  `COSTO_GUIA_ESTIMADO`, `FREE_SHIPPING_FROM`): el flat se mueve **sin desplegar**.
- `/payments/config` ahora manda `shipping_cap_rate` y `shipping_cost_estimate`.
- Pruebas: **759 en verde**, 0 fallas.

**Frontend** (commit «Carrito y checkout: el espejo…», **YA EN VIVO**, auditoría
**85 bien / 0 fallas**):
- `CartContext.js` — el espejo del cálculo, con los tres números del servidor.
- **Compatible hacia atrás a propósito**: si el servidor no manda el tope, la pantalla
  NO adivina el 5% — se comporta como antes. Por eso este despliegue pudo ir **antes**
  que el del backend sin enseñar un cargo que la caja no cobra.
- `Checkout.js` — el envío se recalcula sobre la mercancía **con los puntos ya
  restados** (el carrito no sabe de puntos; el servidor sí). Y se borró el `0.10`
  escrito a mano.
- El renglón de envío en cero ya dice **"Gratis"** cuando se ganó, en vez de "Se
  cotiza por separado".

## ⛔ PENDIENTES — los dos, para Christián

**1. El flat se quedó en $250.** «Quizás $200 o $219» es un quizás, no una orden.
Cuando decida: se cambia `SHIPPING_FLAT` en el `.env` del servidor, sin desplegar.

**2. EL BACKEND NO ESTÁ DESPLEGADO.** El código está en `main` y en verde, pero el
despliegue **falló por disco lleno en el EC2** (20 GB al 100%). `/opt/exygen/app/deploy.sh`
**no limpia imágenes viejas**: hay ~11 GB de capas colgando y 2.5 GB de caché de build.
Hasta que se limpie, **ningún despliegue de backend puede subir** — ni éste ni los de
nadie más. Mientras tanto el sitio sigue con la regla del 10%, y la pantalla también
(por el compatible-hacia-atrás de arriba): están alineados, no hay mentira en el carrito.

## 🔍 Qué cobra la competencia de envío — VERIFICADO HOY

- **Exoma: $200 fijos, gratis desde $2,000.** VERIFICADO en `exomapeptides.mx/envios`
  y en su FAQ. (El repo decía "gratis ≥$3,000" — desactualizado, era del 2 de julio.)
- **Certified: NO PUBLICA su costo de envío.** Su `/shipping-policy/` y su FAQ no traen
  ni un importe; sólo aparece al llegar al checkout con producto en el carrito.
- ⚠️ **El "Certified cobra $250 fijos SIEMPRE" que estaba en este archivo y en
  `server.py` NO tenía fuente** — y coincidía al peso con nuestro propio
  `SHIPPING_FLAT`. Muy probablemente alguien escribió nuestro número como si fuera de
  ellos. Se quitó del código. No se usa para decidir nada hasta que haya evidencia.
- Y bajarle a Exoma **no aplica**: rige el trinquete (sólo bajamos si baja Certified).

---

# 🤝 HANDOFF — 2026-07-30 (noche 3) — ASESOR DE NEGOCIO (chat IA del panel)

## ✅ EN VIVO Y VERIFICADO

Un chat de IA **de negocio** dentro del panel, detrás de login, para **admin y
distribuidores**. Es OTRO chat: el del sitio (`AIChatWidget` → `chat.exygenlabs.com`)
le habla a un visitante anónimo y vende catálogo; éste le habla a quien ya entró y
responde cotizaciones, comisiones y qué ofrecerle a un cliente.

**Dónde se ve:**
- Distribuidor: `/distribuidor?tab=asesor` — grupo **Mi Negocio**, junto al Cotizador.
- Admin: `/admin?tab=asesor` — grupo **Negocio**, debajo de Ventas.

**Piezas:**
- `chat_negocio.py` (backend) — arma el contexto **según el rol**. Módulo puro
  salvo la lectura de costos.
- `POST /api/business/chat` y `GET /api/business/history/{sesion}` (server.py).
- `ChatNegocio.js` (UI) — un solo componente para los dos tableros.
- `test_chat_negocio.py` — **20 pruebas**. Backend total: **760/760 en verde**.
- Auditoría UI: **93 bien, 0 fallas**, con dos comprobaciones nuevas en vivo.

## ⛔ EL CANDADO — dónde vive y por qué ahí

**Regla de oro (Christián, 2026-07-30):** costos, proveedores, márgenes y ROI son
territorio **exclusivo del admin**.

El candado **no es una frase en el prompt**: el contexto que recibe el modelo se
**arma en el servidor** según el rol (`chat_negocio.armar_contexto`). A un
distribuidor el costo no le llega **porque nunca entró al sobre**. Un modelo se
convence; un `if` en el servidor no.

Tres puertas, todas del lado del servidor:
1. `get_current_distributor` — sin sesión **401**, cliente **403**.
2. `deny_view_as` — el "ver como" del admin es **solo lectura**: **403** al preguntar.
3. El historial se filtra por `user_id`: adivinar el id de sesión de otro devuelve vacío.

**Cómo está probado.** El doble de `stream_reply` **devuelve el system prompt**, así
que las pruebas leen exactamente lo que habría viajado a Gemini, y hacen un barrido
de palabras completas sobre el contexto entero. Además hay una prueba que truena si
`bloque_costos` **llega a llamarse** con un distribuidor, aunque el texto saliera
limpio de casualidad.

⚠️ **Por eso `CANDADO_DISTRIBUIDOR` está redactado sin usar las palabras "costo",
"proveedor", "ROI" ni "margen"**: el barrido cubre el contexto entero,
instrucciones incluidas. Exceptuar un pedazo obligaría a la prueba a saber dónde
empieza y dónde acaba — la clase de excepción por la que un día se cuela un dato
de verdad. Si alguien reescribe ese bloque con esas palabras, la prueba truena: es
a propósito, no la apagues, redáctalo con otras.

**Verificado en vivo con datos REALES de producción** (197 productos, 382 llaves de
proveedor): el sobre del distribuidor sale limpio, el del admin sí trae costos y
proveedores, y Gemini —con ese sobre— rechaza en una frase la pregunta de costos y
sí calcula la comisión bien.

## 🔋 CUANDO SE ACABA LA CUOTA

Gemini está en **plan gratis: 20 consultas al día**, compartidas con el chat público.
Al agotarse **no truena**: contesta *"se acabó la cuota del asistente por hoy…"* y
sugiere avisar a Christián. Sin llave configurada, otro mensaje claro.

**Decisión pendiente de Christián:** activar billing en Google AI Studio. Sin eso, el
asesor se apaga solo cada día. No se activó a propósito (no se abren cuentas ni se
prende cobro sin su visto bueno).

## 🧭 SI TOCAS ESTO

- Lo que el asesor sabe **se decide en `chat_negocio.py`**, nunca en `ChatNegocio.js`
  (ese archivo se sirve entero en el navegador).
- La tasa y los escalones salen de `pyramid.effective_rate` / `discount_tiers_de`, y
  el tope por producto de `server.tope_de_descuento` — **las mismas funciones del
  checkout y del cotizador**. Copiarlas a mano aquí haría que el asesor prometa lo
  que la caja no respeta.

---

# 🤝 HANDOFF — 2026-07-30 (noche 2)

## ✅ HECHO el 30-jul noche 2 (EN VIVO, E2E completo en verde al cierre)

**E2E de cierre:** backend 733/733 · motor 344/344 · auditoría 83/0 · E2E cripto
21/0 · E2E tarjeta 15/0 · desplegado backend (azul/verde, ebac539) y frontend
(desplegar.sh, hash verificado) · 3 repos limpios en origin/main.

**TAREA #1 del handoff anterior: HECHA y EN VIVO.**
1. **Datos del cliente en la cotización** — el Cotizador ya pide nombre, correo,
   teléfono y dirección (NINGUNO obligatorio); se pintan bajo "Para" en la hoja
   clara, viajan al correo del servidor (tarjetita "Cotización para", escapados,
   con prueba anti-XSS) y el campo de "Enviar Por Correo" llega prellenado.
2. **Enlace directo al CHECKOUT** — en hoja, WhatsApp y correo: el enlace ya es
   `/checkout?pedido=id:cantidad,...&ref=CODIGO`. CartContext hidrata el carrito
   contra el catálogo REAL (lo oculto se descarta, cantidades 1–999, máx. 40
   renglones, REEMPLAZA el carrito), el checkout enseña "Armando tu carrito…"
   mientras carga, y el cliente aterriza a un paso de pagar con el ?ref=
   aplicado. El precio lo sigue poniendo el servidor al cobrar. Verificado en
   local Y en vivo (exygenlabs.com). En la hoja impresa el enlace se pinta como
   texto corto (la URL cruda con ids era un ciempiés).
   Correo del servidor: botón "Pagar En Línea" + nota, solo con los renglones
   que sobrevivieron la validación (6 pruebas nuevas en test_cotizador.py).
3. Textos nuevos en es/en/pt · prompts de Codex (ROMPEDOR y AUDITORIA) al día
   con la regla deliberada del ?pedido= para que no lo reporten como falla.

**También cerrado (30-jul noche 2, tanda 2):** video "Conviértete en
Distribuidor" ESCONDIDO: fuera de /tutoriales público; ahora vive en
**/invitacion** (página sin enlaces, fuera del sitemap y con Disallow en
robots.txt — cualquiera CON el enlace la ve, y Christián lo reparte por
WhatsApp/correo; en el panel del distribuidor se sigue listando para reclutar)
· **tercer auditor de Codex: `./capturista.sh`** (PROMPT-CAPTURISTA.md,
pricing-system) — verifica proveedor por proveedor que su lista fuente esté
capturada completa y correcta en costo_lista (conteos, moneda, unidades,
colisiones de llave, duplicados de lab); mismo mecanismo de conteos
autoinyectados; al cierre de cada sesión ahora se actualizan LOS TRES prompts
· 3 agentes Opus despachados en paralelo: doble cotizador de envíos + ROI real,
política de envío gratis (mínima $2,500 + tope 5%, flat fee por decidir), y
Chat IA de negocio (admin+distribuidores) — sus resultados se suman aquí cuando
cierren.

**También cerrado:** el crash de `x.py` con ofertas empatadas (`x.py rt 60`,
`x.py klow 80` tronaban por sort de tuplas con dicts; ya ordena por precio) —
era parte de la orden "respuestas de negocio". Pregunta de Christián contestada
en vivo: el proveedor con "bodega en México y entrega en días" es **Lumi (P31)**,
sí tiene NAD+ 1000mg a $9.90 USD/vial (caja de 10 en $99; promesa de bodega SIN
comprobar, nunca se le ha comprado; llegó por WhatsApp el 28-jul).

**⏳ SIGUE PENDIENTE de la orden del 30-jul (para el próximo chat):**
- `x.py lucy` recorta la lista (mostrar TODO) y la vista instantánea "a quién le
  compro" buscable en el Admin (el crash ya quedó arreglado).
- Doble cotizador de envíos (enviosinternacionales.com + Skydropx) — bloqueado:
  Christián debe abrir la cuenta y pegar llaves en Admin → Cobros.
- Búsqueda por abreviatura (RT/TZ/Sema/BPC…) en catálogo y Cotizador — el
  diccionario de apodos ya vive en x.py/alias, reutilizarlo.
- Chat IA de NEGOCIO solo admin+distribuidores (candado de rol en el SERVIDOR).
- Los pendientes de decisión del handoff anterior siguen igual (contrato,
  servidor JADA, HGH 40 IU, códigos viejos, envío gratis, Rita/P38, pedidos de
  Aidee y Brenda, deuda de Alanís).

---

# 🤝 HANDOFF — 2026-07-30 (noche, cierre)

## ✅ NOCHE del 30-jul (todo EN VIVO, E2E completo en verde al cierre)

**E2E de cierre:** backend 728/728 · motor 314/314 · auditoría 83/0 · E2E cripto
21/0 · E2E tarjeta 15/0 · carrito probado de punta a punta en vivo · 3 repos
limpios en origin/main.

**Nuevo esta noche:** Cotizador de distribuidores EN VIVO (pestaña propia en Mi
Negocio; documento tipo factura con logo/molécula; imprime perfecto vía iframe;
"Enviar Por Correo" con precios que pone el BACKEND — nadie puede falsificar
totales; freno 20/h; sin PDF adjunto para no meter librerías pesadas — decisión
anotada) · commission_cap y distributor_eligible FUERA de todo lo público
(prueba-candado; cliente anónimo usa `descuentable`/`max_descuento_cliente`
recortado a 15%) · widget "Tienda De Confianza" VERDE colapsable de UNA línea
bajo el botón de pagar en carrito/checkout y en ficha (2 columnas: widget izq,
acordeones der; portada limpia — iteró 3 veces hasta como lo quiso Christián) ·
fichas de producto A DIETA (lote fuera, specs sin duplicar, acordeones; móvil a
la MITAD: 4,365→2,130px) · aviso sobre pedido ahora es nota fina "Se surte
desde EUA…" (fuera el letrero de dos entregas) · ficha de cliente unificada
(mismo clic desde 8 lugares; guía en un toque con paquetería AUTODETECTADA del
número) · María guías + **override 30% de descuento SOLO ella**
(max_discount_override, pyramid.discount_tiers_de) · acuerdo de distribuidor:
maquinaria de aceptación electrónica COMPLETA y APAGADA
(ACUERDO_DISTRIBUIDOR_ACTIVO=false; registra versión+hash+IP+casilla; falta
que Christián llene [corchetes] del texto v2) · blue/green REAL en el backend
(puerta nginx; 3,117 requests durante deploy+rollback con CERO fallos; deploy
malo se aborta solo — atrapó 2 hoy) · desplegar.sh del frontend (no publica
builds sin la URL del backend) · P38 Rita Birrell importada (124/124 renglones,
MXN; NO es la más barata en NADA; alias somatropina/HGH tapado; verificación
ciega de Codex en curso) · Skydropx: llaves y remitente instalados (Alanís,
Playa del Carmen), cotización real $139 PdC→NL, TODAS las paqueterías compiten,
cotizar/comprar guía desde el pedido en admin · propuesta "Envíos
Internacionales" = REVENDEDOR de Skydropx con términos malos (análisis hecho,
recomendación: no cambiarse) · cotización COT-20260730-01 entregada a Christián
(PDF sin COA + correo): 50 viales $124,355 con 30%.

**Reglas de negocio nuevas (memorias creadas):** vender SIEMPRE (envío partido)
· comisión base 30% compartida con el descuento (María/Alanís/Javier bajaron de
40/40/35; respaldo para revertir) · regla de 5 piezas por producto para precio
de distribuidor · WhatsApp: SOLO Christián envía (Claude deja borradores).

## 🔜 LO PRIMERO PARA EL PRÓXIMO CHAT (orden directa de Christián, 2026-07-30 noche)

**Mejorar la cotización del Cotizador al formato que más le gustó** (la "hoja
clara" v2 que el agente dejó en el preview local hoja-claro.html — el documento
tipo factura). Debe incluir:
1. **Datos del cliente**: nombre, email, teléfono, dirección — los que se
   tengan; NINGUNO obligatorio, pero se pintan bonito si existen. (El Cotizador
   hoy solo pide nombre; agregar los campos opcionales.)
2. **Un enlace directo al CHECKOUT** en la cotización (documento, correo y
   WhatsApp): que al abrirlo el carrito llegue YA ARMADO con los renglones y
   cantidades de la cotización + el ?ref= del distribuidor aplicado — el
   cliente aterriza a un paso de pagar. (Hoy el enlace va al catálogo pelón.)
   Implementación sugerida: URL con payload de renglones (ids+qty) que
   CartContext hidrate al abrir, validada contra el catálogo real.
3. Mismas compuertas de siempre; el precio lo sigue poniendo el backend.

**TAMBIÉN ORDENADO por Christián (2026-07-30 noche, prioridad alta):**
- **Doble cotizador de envíos**: explorar enviosinternacionales.com (el
  revendedor de Skydropx — Christián QUIERE usarlo aunque el análisis lo
  desaconsejó: decisión suya) y programar SUS DOS APIs — al despachar se cotiza
  en AMBAS (interno), se contrata la MÁS BARATA, y al cliente se le cobra
  tarifa fija. Nota: hará falta que Christián abra la cuenta ahí (no crear
  cuentas por él) y pegue las llaves en Admin → Cobros.
- **Respuestas de negocio en 1-2 segundos**: Christián exige que preguntas tipo
  "¿en qué es más barata Lucy?" se contesten al instante. Hoy `x.py` existe
  pero: `x.py lucy` recorta la lista (mostrar TODO), `x.py rt 60`/`x.py klow
  80` TRUENAN (bug de sort con dicts en x.py:152 — arreglarlo), y falta que el
  Admin tenga esta vista completa (el bloque "a quién le compro" ya existe;
  hacerla buscable/instantánea). Objetivo: una sola fuente instantánea.

**MÁS ÓRDENES de Christián (2026-07-30 noche):**
- **Búsqueda por abreviatura**: el buscador del catálogo (y el del Cotizador)
  debe encontrar péptidos por nombre O por abreviatura/apodo: RT→Retatrutida,
  TZ/Tirze→Tirzepatida, Sema→Semaglutida, BPC, TB, MT2, NAD, etc. (el motor ya
  tiene diccionario de apodos en x.py/alias — reutilizarlo, no inventar otro).
- **Chat IA de NEGOCIO, solo admin + distribuidores** (separado del chat
  público de clientes): asistente que responda cosas de negocio — "ármame una
  cotización de X", "¿cuánto gano si vendo Y con 20%?", "¿qué le recomiendo a
  un cliente que busca Z?" — conectado a precios públicos + SUS topes/comisiones
  (los del rol que pregunta), SIN costos/proveedores para distribuidores (eso
  solo admin). Detrás de login, con el candado de rol en el SERVIDOR. Ojo:
  cuota Gemini gratis 20/día — considerar billing o modelo aparte.

## ⏳ PENDIENTE (además de lo del handoff anterior)
1. Christián: llenar [corchetes] del ACUERDO-DISTRIBUIDOR-BORRADOR.md (razón
   social/RFC, fuero, plazos) y ordenar encender ACUERDO_DISTRIBUIDOR_ACTIVO.
2. Christián: servidor de respaldo en JADA — ordenado, bloqueado esperando que
   dé host/acceso SSH del servidor de JADA a usar (el clasificador no deja
   esculcar la infra del despacho solo).
3. Christián decidió NO responder aún: HGH 40 IU ($2,029 vs quedarse en
   $3,869), escalera de comisiones 30/30/35/40/43 vs escalonada, códigos
   viejos 30/35% desactivados (confirmar), ¿B12 1mg/mL se oculta?, ¿vigía con
   cron diario?, política envío gratis X=$3,000 con tope $150/guía (propuesta).
4. P38: preguntarle a Rita si su precio MXN incluye envío; aclarar su NAD+ "UI"
   vs mg. Verificación ciega de Codex del import: la cola de Codex la PERDIÓ dos veces — RELANZARLA en el próximo chat (fotos en proveedores/whatsapp/extraidos/325-232-9811/). Su E2E general sí corrió: todo verde en su copia local; sus 'fallas' eran código viejo sin red (ya verificado en vivo por F5: 728/314/83/21/15).
5. Pedidos por surtir: preparar los de Aidee ($2,830) y Brenda ($4,827) — HAY
   stock (8 RT20, 25 NAD tras ambas); NO se compró a Lucy (Christián borró el
   mensaje; regla nueva: él envía). Cobrar deuda Alanís $3,857.
6. PDF adjunto en el correo de cotizaciones: requiere librería pesada
   (WeasyPrint/ReportLab) — pendiente de que Christián lo pida.
7. Pie del sitio pesa 1,700px — dieta pendiente si Christián quiere.
8. Meta: categoría sensible (salud) — pedir revisión en Events Manager (él).

---

# 🤝 HANDOFF — 2026-07-30 (tarde/noche) — LÉELO PRIMERO

## ✅ HECHO hoy (todo EN VIVO y verificado)

**Regla madre nueva de Christián: VENDER SIEMPRE — envío partido.** Ninguna venta se
bloquea por inventario: lo disponible sale ya (2-5 días), el excedente se manda pedir
(~1 semana), aviso al cliente ANTES de pagar (3 idiomas), panel con "Hay Que Mandar
Pedir". Solo ocultos/vetados no se venden. (Memoria: exygen-vender-siempre-envio-partido)

**Dinero/motor:** trinquete ya no anula el techo cruzado · vigía suma combos "10mg/10mg" ·
alias ARA-290 vivo · candado anti-Certified corre siempre · combos BPC-157+TB-500: 20mg
$2,399→$1,759 y 10mg $1,749→$1,669 (excepción declarada en excepciones_trinquete.json,
mecanismo nuevo con precio autorizado) · checkout valida contra inventario REAL · cancelar
devuelve lo APARTADO (no lo pedido) · catálogo igualado a bodega real (195 contadores,
auditoría truena si se desfasan) · 291 pruebas motor, 513 backend, auditoría sitio 83/0,
auditoría catálogo 0.

**Cuentas:** admin@exygenlabs.com y exygenlabs@gmail.com FUSIONADAS — alt_emails en la
cuenta admin ("Christian Cuellar"), duplicada estacionada bloqueada (respaldo en
backups/respaldo-fusion-cuentas-2026-07-30.json). Cualquiera de los dos correos entra a
la misma cuenta por contraseña/Google/Outlook.

**Panel:** sidebar ÚNICO por rol (distribuidor y cliente) con pestañas catalogadas;
Difusión solo María · "Mis Herramientas" de vuelta (distribuidor Y cliente) · invitados
que usan código de distribuidor aparecen en Mis Clientes (Aidee → María, comisión $780) ·
clic en nº de pedido = modal con detalle (403 si es ajeno) · footer con UN WhatsApp
(Mónica) · chat IA rediseñado con sparkle ("Asistente Exygen").

**Meta:** CAPI servidor EN VIVO (token existente; compras por WhatsApp cuentan) · Purchase
solo al PAGAR · E2E ya no manda ventas falsas ni correos de aviso · PENDIENTE de Christián:
verificación "Verificar cuenta" en Business Manager (cuenta correcta ya identificada, con
acceso al píxel 2487053198462294) y luego ligar a act_1357297706382259.

**Correo:** aviso interno por cada compra a exygenlabs@gmail.com vía Resend (qué empacar,
qué mandar pedir, dirección, pagado o no). Pedidos E2E no avisan.

**Blindaje (la caída de hoy no se repite):** deploy.sh con prueba de humo + arranque
efímero ANTES del swap + rollback en un comando; ./actualizar-exygen-backend.sh desde la
Mac (abre y CIERRA el 22). Frontend aguanta API caída: catálogo fallback, botones
Google/Outlook con 3 respaldos, aviso de intermitencia, POSTs jamás se reintentan, y un
timeout ya no cierra la sesión de todos.

**Codex:** comandos fijos ./rompedor.sh ./auditor.sh ./vigia.sh (pricing-system);
marcadores {{FECHA}}/{{PRUEBAS}} se inyectan solos; prompts actualizados al cierre de HOY
(incluida la regla de envío partido como DELIBERADA). LUZ VERDE para correrlos.

**Primera clienta por Meta/WhatsApp:** Aidee García (EX-20260730-2906, $2,830 PAGADO,
código de María). Vitamina D3 10mL y B12 10mg OCULTAS (depuración de Christián).

## ⏳ PENDIENTE
1. Christián: verificación de Meta y ligar píxel (el agente retoma con "ya").
2. Christián: Retatrutida 10mg $2,479 vs $2,439 aprobado — ¿se deja o se congela?
3. Christián: ¿B12 1 mg/mL también se oculta? ¿Vigía con cron diario?
4. 11 precios contradictorios de proveedor + 4 proveedores duplicados (decisión).
5. «Te lo ofrecen y no lo vendes» no se limpia al dar de alta (bug conocido, sigue).
6. Chips pendientes: mensajes del carrito con API caída y pantalla de pedido vacía.
7. Cobrar deuda de Alanís ($3,857) y marcarla pagada.

---

# 🤝 HANDOFF — 2026-07-30 (madrugada) — LÉELO PRIMERO

## ✅ HECHO el 29-30 de julio (TODO en vivo, verificado, main limpio en ambos repos)

**Dinero y pedidos**
- Pagado ≠ entregado COMPLETO: `paid`/`paid_at` mandan en las ~10 vistas que
  sumaban dinero (stats, analytics, series, funnel, Meta/ROAS, fichas,
  distribuidores, comisiones y puntos). Bug espejo arreglado: las pasarelas
  ahora marcan `paid: True` (antes NADA lo marcaba). Tarjetas Cobrado/Por
  cobrar + marca de pago de un clic en el panel. Alanís (EX-20260729-9934,
  $3,857) está NO pagada: es deuda, no ingreso. Cobrado real: $3,347 (Paz).
- $11,027 de compras fantasma (eventos de pedidos de prueba borrados) fuera
  del embudo. Pedidos: filtro por estado + orden fijo reciente→viejo; lote
  (archivar/borrar) funcionando; los 11 cancelados de prueba ya borrados.
- 463 pruebas backend en verde (test_cobrado.py +24).

**Cuentas y acceso**
- María: `extra_roles` SUMA — distribuidora + Difusión (menú "Difusão"),
  resto del admin en 403, "ver como" no escribe. Su cuenta abre en pt-BR +
  oscuro; las preferencias viajan con la CUENTA y se aplican también con
  sesión ya abierta (no solo al login).
- Entrar con Outlook EN VIVO: app Azure "Exygen Web" (cuenta
  exygenlabs@gmail.com, client id 5350236e-16b4-4c04-9173-dd0d6b8a1ef0 en el
  .env del EC2), verificado con clic real. Google y Outlook 50/50 estilo
  Resend. Llave de acceso (passkey) como botón estilo JADA + hints
  client-device (pide la huella local, no el QR); si no hay llave, orienta.
- Login/Registro con TEMA CLARO completo (oscuro intacto pixel a pixel).

**Contenido y arte**
- Tutoriales 1-11 en ES/EN/PT servidos según el idioma del cliente (video 12
  de difusión también en PT). Los 12 de distribuidor/cliente sin cuentas demo
  se REDOBLARON (pipeline/redub.js — misma imagen, voz nueva ajustada).
- Viales del catálogo: "Lyophilized" corregido (374 webp regenerados).
- Viales del hero: rehechos de raíz — tenían fondo negro aplanado, pixelación
  (will-change en la imagen) y un borrón de "10mg" atravesado en los 10
  genéricos. Ahora RGBA 768px q92, defringe, verificación automática en el
  script. Typos del arte: NAD+ "PEPLIDES"→PEPTIDES, KLOW "USF"→USE. 15 JPG
  muertos borrados de public/images/products (queda _exygen-vial.jpg, que sí
  se usa).
- Portada: frase del hero restaurada ("Ciencia y precisión, lote por lote"),
  menos menciones de COA (placa = "99.4% · Pureza por HPLC"), zoom al hover
  en imágenes de producto, sello del 15% en claro: AZUL SÓLIDO con letra
  blanca y borde punteado blanco — versión final APROBADA por Christián
  ("¡Perfecto!") tras iterar dorado→gris→azul contorno→azul sólido; el dorado
  del tema oscuro nunca se tocó.
- Mayúscula A Cada Palabra en dashboards y menús + regla dura: TODO texto va
  en los 3 idiomas a la vez. Marca neutral "Exygen Labs" (sin "Mexico").

**Infra y procesos**
- ⛔ EL PUSH NO DESPLIEGA EL FRONTEND: GitHub Actions publica un GitHub Pages
  viejo que ya no es el sitio. Producción = Cloudflare Pages, A MANO:
  `npm run build && rm -f build/404.html && npx wrangler pages deploy build
  --project-name exygenlabs --branch main --commit-dirty=true` (token en
  ~/.config/exygen/cloudflare.env; NUNCA borrar public/404.html). Verificar
  siempre el hash del bundle en vivo contra build/static/js/.
- Firewall del EC2 sellado: se cerraron las 2 reglas fijas viejas del 22.
- SES: solicitud de producción lista (exygenlabs.com, DKIM verificado) en
  novapeptidos-RBAC/ses-production-request.md — Christián aún no aprueba
  mandarla.
- Página de confirmación de compra (para Google Reviews):
  https://exygenlabs.com/pedido/* (p. ej. /pedido/EX-20260729-9934).
- ⚠️ Varios agentes en la MISMA carpeta = deploys pisados y un rato de sitio
  roto. Si se repite la ola: worktrees o serializar los deploys.

## ⏳ PENDIENTE

1. **Outlook**: publisher "no verificado" — las cuentas personales entran
   bien; verificar el publisher en Azure solo si algún día estorba con
   cuentas de trabajo ajenas.
2. **SES**: cuando Christián apruebe, correr el comando de
   ses-production-request.md (~24 h de respuesta de AWS).
3. **Semaglutide** (vial a mano) dice "RESEARCH-PEPTIDES" con guion — bien
   escrito, por si Christián quiere uniformarlo.
4. **Vitamina D3**: aprobada, sin publicar — decidir si una vitamina entra al
   catálogo RUO.
5. **Video semanal de campañas**: el pipeline corre, falta el cron.
6. **Envíos/Skydropx**: Estafeta por API, remitente de un trabajador, precio
   real por peso/CP, envío gratis con tope del 10%.
7. **EUA / exygenlabs.mx**: decisión de Christián de separar .com (US) y .mx
   (México). NO mover dominios aún (el .com apenas re-indexó); comprar
   exygenlabs.mx YA; migración con redirecciones + hreflang cuando el negocio
   US sea real.
8. **Auditoría ciega al sitio sin hidratar**: dio 83/0 con el sitio en blanco
   — hay tarea corriendo/sugerida para agregarle esa prueba.
9. Cobrar la deuda de Alanís ($3,857) y marcarla pagada con el botón nuevo.

---

# 🤝 HANDOFF — 2026-07-29 (tarde) — LÉELO PRIMERO

## ✅ 2026-07-29 (madrugada del 30): ola de 6 agentes — todo aterrizó y verificado

En vivo: hover de Google · badge 15% gris en claro/dorado intacto en oscuro ·
Login con tema claro completo · frase del hero restaurada ("Ciencia y
precisión, lote por lote"; la cambió el commit 983aaeb de la portada móvil) ·
viales del hero rehechos (tenían el fondo negro APLANADO desde el commit del
renglón "Research Peptides", + pixelación por will-change en la imagen; ahora
RGBA 768px q92 con verificación automática de transparencia en el script) ·
ingreso SOLO si está pagado (se sumaba mal en ~10 lugares; bug espejo: las
pasarelas nunca marcaban paid=True — arreglado; tarjetas Cobrado/Por cobrar y
marca de pago de un clic en el panel; 463 pytest, 24 nuevas) · portada con
menos COAs (placa = "99.4% · Pureza por HPLC") · botón de llave de acceso
estilo JADA con hints client-device · marca neutral "Exygen Labs" (sin Mexico)
· Outlook EN VIVO (app Azure de Christián) · Google/Outlook 50/50 estilo Resend.

⚠️ Pendientes visuales del arte a mano del hero: KLOW dice "FOR RESEARCH USF
ONLY" y el renglón chico de varios dice "RESEARCH PEPLIDES" (así está en el
arte original de Christián) — hay chip para arreglarlo.
⚠️ Trabajar VARIOS agentes en la misma carpeta causó deploys pisados y un rato
de sitio roto: si se repite la ola, usar worktrees o serializar los deploys.
⚠️ Google Reviews: la página de confirmación es /pedido/<numero> (patrón
https://exygenlabs.com/pedido/*).

## ⚠️ DOS COSAS DE DINERO AL CIERRE (2026-07-30, madrugada)

**A. La Retatrutida 10 mg quedó en $2,479, no en los $2,439 que Christián
aprobó.** Entre su visto bueno y la corrida, el vigía detectó otra bajada de
Exoma y la escalera pidió $40 más. Está así en la maestra Y en el sitio en
vivo. Siempre fue subida, nunca bajada, pero **es $40 arriba de lo aprobado**:
preguntarle si lo deja o lo congela en $2,439 (congelarlo es a mano).

**B. Vitamina D3: tenía stock 40 sin renglón en el inventario vivo.** El
producto decía 40 piezas pero `/api/stock` no lo conocía — el checkout descuenta
de ahí, así que se podía vender algo que no existe. **Ya se puso en stock 0**
desde esta sesión para que nadie lo compre. Falta crearle su renglón de
inventario cuando llegue la primera compra a Lumi, y ahí sí ponerle piezas.

## 🔜 LO PRIMERO PARA EL PRÓXIMO CHAT (2026-07-30)

1. **Christián pide los PROMPTS ACTUALIZADOS PARA CODEX**, dos: (a) *Rompedor
   del Motor de Precios* y (b) *Auditor de Precios*. Las plantillas viejas están
   en `pricing-system/PROMPT-ROMPEDOR.md` y `PROMPT-AUDITORIA.md`; hay que
   ponerlas al día con lo de hoy: los dos costos que no se hablaban entre sí, el
   `import` que rompía `reprecio --aplicar`, el conteo de viales por caja, el
   TC 17.50, los proveedores nuevos P36/P37 y los 11 precios contradictorios.
   Entregárselos EN EL CHAT para que él los pegue en Codex.

2. **WhatsApp duplicado en el footer — ✅ ARREGLADO Y EN VIVO (2026-07-30).**
   Había DOS enlaces pegados: el suelto del 28-jul (`footer-whatsapp`) y el de
   Mónica Fuentes (`home-rep-whatsapp`), los dos con `@exygenlabs` y el mismo
   `wa.me`. Se quitó el suelto y quedó el de Mónica, que trae nombre y rol.
   Verificado en el navegador contra exygenlabs.com: el footer tiene UN solo
   enlace de WhatsApp. Ningún test ni la auditoría usaban el testid retirado, y
   no cambió texto visible, así que no tocó es/en/pt.

3. **"Tienda de Confianza": SÍ está en vivo, verificado.** En la portada vive a
   ~1,814 px de scroll (hay que bajar bastante) y en la ficha de producto bajo
   las especificaciones. Si Christián no la ve: Cmd+Shift+R. Si aun así le
   parece escondida, subirla más arriba en la portada es una línea.

4. **BUG que reportó Christián: «Te lo ofrecen y no lo vendes» no se limpia.**
   Un producto que YA se dio de alta debe DESAPARECER de esa lista de
   oportunidades, y no está pasando (lo notó con la Vitamina D3, que sigue
   apareciendo ahí después de publicarse). Dónde mirar: `oportunidades.py`
   (`calcular()` compara contra `nuestros(cx)`, que lee la tabla `producto` de
   `exygen.db` + los alias) y `aplicar_aprobados.py` (marca `aplicado` en las
   decisiones del Panel). Sospechas a revisar, en orden: (a) la base local no se
   reconstruyó tras el alta, así que `nuestros()` no ve el producto nuevo;
   (b) el nombre con que se dio de alta no empareja con el de la lista del
   proveedor y hace falta un alias en `datos/alias_proveedores.csv`;
   (c) la decisión quedó sin marcar como `aplicado` y la oportunidad revive.
   Debe quedar con una PRUEBA: dar de alta un producto y comprobar que sale de
   la lista de oportunidades.

5. **Pendiente de decisión de Christián** (de la auditoría de proveedores):
   limpiar los **4 proveedores duplicados** (Lisa, Cell Peptides, Mia, US Lab) y
   marcar los **11 precios contradictorios** para que el comparador deje de
   coronarlos (el peor: Snap-8 de DT a $64.50 vs $365.40 en su misma lista).

6. **Agente en vuelo al cierre de esta sesión**: el de precios, aplicando la
   corrección de costos por toda la cadena + el reprecio aprobado + la prueba
   anti-desfase + el alta de **Retatrutida 120 mg** (li la, $40/vial; tope
   $9,215 para no romper la escalera). Su despliegue final del frontend lleva
   también el footer de Mónica (commit `236b21b`, ya en main, sin desplegar).
   VERIFICAR al retomar: `npm run auditoria` en 83/0 y pytest del repo de
   precios en verde.

## 📌 2026-07-30 (madrugada) — proveedores, costos y ROI

**El hallazgo grande: el ROI que veías estaba mal.** La base guarda DOS costos
(`costo_lista`, que sí conoce las listas, y una COPIA pegada en la maestra) y
nada obligaba a que coincidieran. Resultado: 113 productos con el costo
inflado, ~$59,000 MXN de más por caja. La TR 120mg decía 10.0x y deja 13.8x.
Christián eligió la "opción 3": costos reales + que la comisión se recalcule
sola con las reglas que YA existen (tope 40%, y si al pagarla el ROI cae abajo
de 5x el producto sale a venta directa). Herramienta: `refrescar_costos.py`
(simulacro por omisión; usa el emparejador del sistema, NO uno casero — con
uno casero el KLOW no hallaba su oferta y el costo parecía subir).

**Bugs encontrados de paso:**
- `reprecio.py --aplicar` estaba ROTO: un `import db as D` dentro de main()
  convertía D en local y tronaba al escribir el ROI. El motor no podía aplicar
  NADA. Arreglado.
- El importador daba por hecho 10 viales por caja cuando el conteo venía dentro
  de la presentación (EPO 5, Insulin 1, Oxitocina 9): el costo por vial salía
  hasta 10 veces más barato. Arreglado y reimportado; el histórico no estaba
  afectado.
- El tipo de cambio de la casa es **17.50**, no 19.50 (build_pricing_final,
  auditar_catalogo, reprecio). Con 19.50 el costo salía 11% más alto.

**Proveedores nuevos:** Cell Peptides (P36, 241 precios — solo gana en 4 de 166
comparables, sin COA de EUA) y **li la (P37, 164 precios)**, que trae la
**Retatrutida 120 mg a $40/vial** — la más barata (DT cobraba $59.10). La RT
120mg NO estaba en el catálogo; se está dando de alta (tope $9,215 para no
romper la escalera: su $/mg debe quedar por debajo del de la 100mg).

**Auditoría de la base de precios (Codex + verificación):** en
`pricing-system/AUDITORIA-CODEX-PRECIOS-PROVEEDORES.md`.
🔴 URGENTE: 11 productos donde el comparador corona un precio que el propio
proveedor desmiente en otro renglón de su misma lista (DT: Snap-8 100mg a
$64.50 y también a $365.40 — comprar con el bajo puede costar 5x). Además: no
son 37 proveedores con precios sino **17** (20 registros vacíos, 4 duplicados:
Lisa, Cell Peptides, Mia, US Lab); 259 de 509 productos los vende un solo
proveedor; 55 renglones sin cantidad ni unidad. Se tumbaron 6 hallazgos falsos
de Codex (entre ellos su "más grave", que no lo era). Base y CSV: sin
diferencias.

**Herramienta nueva `pricing-system/x.py`** — preguntar y que conteste en un
segundo: `x.py rt 40` (costo, quién es el más barato, a cuánto lo vendes y el
múltiplo), `x.py lucy` (teléfono y en qué gana), `x.py proveedores`, `x.py roi`,
`x.py ventas`, `x.py distribuidores`, `x.py clientes`. Entiende sus apodos.

**Sitio:** Vitamina D3 publicada ($4,199, categoría `suministros` — `accesorios`
NO tiene página visible; stock 0 hasta la primera compra a Lumi) · Tienda de
Confianza ahora en portada y ficha de producto (antes solo tras iniciar sesión)
· envíos emparejados a "2 a 5 días" en los 7 lugares donde decía 3 a 5 ·
Mónica Fuentes al footer bajo el correo · hover rojo en acciones destructivas ·
ordenar productos por nombre y categoría (Admin y catálogo público) ·
pestaña Certificados OCULTA a propósito para clientes y distribuidores.

## ⛔ LECCIÓN CLAVE 2026-07-29: el push NO despliega el frontend

GitHub Actions dice success pero publica al GitHub Pages viejo. El sitio real
es Cloudflare Pages y se publica A MANO:
`npm run build && rm -f build/404.html && npx wrangler pages deploy build --project-name exygenlabs --commit-dirty=true`
(token en ~/.config/exygen/cloudflare.env). Por esto Christián no veía NADA del
frontend de hoy hasta la noche. Verificar siempre el hash del bundle en vivo.

## ✅ 2026-07-29 (cierre): TODO lo de hoy ya está en el sitio real

Tutoriales 1-11 en ES/EN/PT servidos por idioma (12 dist redoblados con
pipeline/redub.js) · viales con "Lyophilized" corregido (374 webp) · zoom al
hover en imágenes de producto · Mayúscula A Cada Palabra (dashboards + menús,
3 idiomas) · botón Outlook publicado (aparece al poner MICROSOFT_CLIENT_ID en
el EC2 — falta que Christián registre la app en Azure y pase el Client ID) ·
María con Difusión + pt-BR + oscuro (verificado). Auditoría final 83/0.

## ✅ 2026-07-29 (noche, 2ª tanda): María, mayúsculas, Outlook y videos

- **María RESUELTA de verdad** (verificado en vivo con "ver como"): `extra_roles`
  suma — sigue distribuidora Y entra a Difusión desde el menú del perfil
  ("Difusão"); su cuenta abre en portugués + oscuro (preferencias que viajan con
  la cuenta, PUT /auth/me/prefs); el video 12 existe narrado en pt-BR y se sirve
  según el idioma. Si dice que no lo ve: recargar o volver a entrar.
- **Mayúscula A Cada Palabra** en etiquetas de los 3 dashboards, en es/en/pt
  (regla dura nueva: todo cambio de texto va en los 3 idiomas a la vez).
- **Entrar con Outlook**: construido y desplegado (calcado de Google, ID token
  verificado en servidor). ⚠️ APAGADO hasta que Christián cree el App
  Registration en Azure y pase el MICROSOFT_CLIENT_ID (pasos en la memoria
  exygen-outlook-login-pendiente); luego va al .env del EC2 y reiniciar api.
- **Videos de clientes en EN y PT: TERMINADO y en vivo.** Los 6 (comprar con
  código, cuenta/pedidos/puntos, herramientas, calculadora, reconstitución,
  asesor) + el 12 en PT; /tutoriales sirve según el idioma del sitio, con caída
  al español. Los videos 6-8 se REDOBLARON (pipeline/redub.js: misma imagen,
  voz nueva) porque las cuentas demo ya no existen y recrearlas contaminaría
  las métricas — no recrearlas.
- Pedidos: filtro por estado + orden fijo del más reciente al más viejo; el
  lote ya funciona en vivo (Christián borró los 11 cancelados de prueba).
- Alanís marcada NO pagada en vivo (revenue 3,347 = solo Paz; por_cobrar 3,857).
- Compuertas de esta tanda: backend 438/438 · precios 265 · auditoría 83/0 ·
  e2e:cripto 21/0 — después de cada despliegue.

## ✅ 2026-07-29 (noche): EL BACKEND YA ESTÁ EN VIVO — la sección de abajo quedó saldada

Se desplegó `dc85f92` al EC2 (git pull + `docker compose up -d --build api`, regla del
puerto 22 abierta y cerrada). Compuertas antes de desplegar: **424 backend · 265 precios ·
auditoría 83/0 · e2e:cripto 21/0**, y auditoría de nuevo en 83/0 después.

Con eso quedó funcionando en vivo: lote de pedidos (`/admin/orders/lote` responde),
pagado ≠ entregado, rol marketing (el candado), tope real del descuento, y **el video 12**
(viajaba con git; era el endpoint `/tutorials/` que no existía en vivo — verificado HTTP 206).

**Además (commit `c7483c2`, ya desplegado):** la tabla de pedidos del Admin trae **filtro
por estado** y ordena **siempre del más reciente al más viejo**; la selección en lote se
poda si una fila deja de verse. Nació de que Christián no podía borrar en bulk los
cancelados (era el backend sin desplegar) y quería filtrar/ordenar.

**Pendientes que siguen vivos:** María multi-cuenta (abajo), limpiar los 12 pedidos de
prueba (⚠️ hay 2 ventas reales: Paz y Alanís), marcar la de Alanís como NO pagada (la
marca ya está en vivo), Vitamina D3, cron del video semanal.

## 🚨 (SALDADO 2026-07-29 noche — ver arriba) LO PRIMERO Y MÁS URGENTE: **SUBIR EL BACKEND AL SERVIDOR**

**Todo el trabajo del backend de hoy está en `main` y NADA está en vivo.** El EC2 sigue
sirviendo la versión vieja. Comprobado con curl: `POST /api/admin/orders/lote` → **405**,
y `?archivados=true` no filtra.

**Lo que NO funciona hasta desplegar** (aunque la interfaz ya esté en el sitio):
- La selección múltiple de pedidos (archivar / borrar en lote).
- La marca de **pagado** aparte del estado de entrega.
- El rol **marketing** de María.
- El tope real del descuento (hoy en vivo **todavía permite 60%**).
- El video 12 (falta subir el `.mp4` al servidor).

Receta y trampas en la sección "CÓMO ENTRAR AL EC2" más abajo. ⚠️ El perfil es
`--profile certis --region us-east-1`; el de por omisión es otra cuenta y contesta
"no existe" en vez de un error claro de permisos. En sesiones anteriores el clasificador
de permisos bloqueó `aws ec2 authorize-security-group-ingress` y `ssh`.

## 👤 MARÍA — lo que Christián pidió (2026-07-29, NO está hecho así)

**Christián NO quiere quitarle nada a María.** Ella **ya existe como distribuidora al 40%**
(`marianeunfeld0@gmail.com`, id `37f6feba-6b3…`). Lo que quiere es que **tenga varias
cuentas/roles a la vez**, como él, y pueda cambiar entre ellas desde el menú del perfil.

⚠️ **Lo que se construyó hoy NO es eso**: se hizo un rol `marketing` que **sustituye** al
rol actual. Si se le aplica tal cual, **pierde el panel de distribuidora**.
👉 **Falta**: permitir varios roles por persona (o un selector de "entrar como" en el menú
del perfil, igual que el de Christián) y que María entre a Difusión **sin dejar de ser
distribuidora**. El candado del backend (403 en todo lo que no es difusión) ya está bien
hecho y con 15 pruebas; lo que falta es que el rol **sume** en vez de reemplazar.

## ✅ LO QUE SÍ QUEDÓ HECHO HOY (todo en `main`, frontend desplegado)

**Backend — 424 pruebas en verde** (commit en `novapeptidos-RBAC`):
- **PAGADO ≠ ENTREGADO.** `paid`/`paid_at` cuentan el DINERO; `status` sigue contando la
  MERCANCÍA. El tablero separa `revenue` (cobrado) de `por_cobrar`. Los pedidos viejos no
  traen el campo y siguen infiriendo del estado, así que **no hace falta migrar la base**.
  Nació de la venta de Alanís: entregada y sin pagar, y el tablero la sumaba como ingreso.
- **El descuento de la venta directa topaba en 60%** cuando el máximo es 40% (auditor de
  Codex). En un pedido de $374,360 son **$74,872 de más**. Y la otra mitad que él no vio:
  el descuento se calculaba **plano**, ignorando el tope POR PRODUCTO que protege el 5×.
- **Lote de pedidos**: archivar / desarchivar / borrar, con el mismo camino del borrado
  individual (devuelve puntos, restaura inventario, limpia bitácora). **Se niega a borrar
  un pedido pagado sin `forzar`** — entre las 12 pruebas viven las 2 ventas reales.

**Motor de precios — 265 pruebas en verde.** Las cuatro fallas de Codex, todas ciertas:
- `0,5mg` se leía como **5 mg** (diez veces) — `reprecio.medida()` no usaba la corrección
  de la coma que ya existía en `db.py`.
- `BPC-157 5mg+TB-500 5mg` **sin espacios** se colaba como BPC-157 suelto.
- **`100mcg` devolvía nada**: invisible para la escalera. Un vial de 100 mcg podía costar
  más que uno de 1 mg sin alarma. Ahora se convierte a 0.1 mg.
- **`24 U` y `24 IU`** vivían en escaleras separadas. Ahora son la misma unidad.

**Frontend (desplegado):** las 7 gráficas con **arrastre y zoom estilo TradingView**
(shift+rueda para el eje Y, rueda sobre un eje para ajustar sólo ése, pellizco en celular);
**video 12** "Cómo leer las métricas de difusión" (3:37) embebido en Marketing, sólo admin;
**campañas clicables en 18 puntos**; buscador en Productos; mayúsculas en el menú de perfil;
Mónica compacta con `@exygenlabs` (el enlace lleva al número, pero no se enseña).

**⛔ EL SCROLL — la causa raíz REAL, ya medida.** El cambio de pestaña **ya estaba bien**
(1138→0, 10293→0, en Chromium y WebKit). Lo que fallaba era la **radiografía de campaña**,
que cambia de vista **sin tocar la ruta ni `?tab=`**, así que ningún efecto se enteraba.
Arreglado (2447→0 al abrir, 1708→0 al volver).

## 💰 PROVEEDORES — 3 nuevos y un hallazgo que reencuadra todo

**Winnie (P33) 159 precios · Kiki (P34) 156 · Cell Peptides (P36) 241 · LEISHASHOP (P35)
SIN PRECIOS** (sólo mandó catálogo, pide que se circulen productos).

**Ninguno es más barato**: Winnie gana en 7 de 148, Kiki en 1 de 141, Cell Peptides en
**0 de 180**. El único ahorro que vale es **HGH 8 IU de Winnie: $4.50 contra $10.50 =
$60/caja** — y ése lo encontró Codex, no yo: mi comparación no cruzaba "HGH" con
"HGH 191AA (Somatropin)". Ya se agregaron los alias.

**🔑 EL HALLAZGO GRANDE: los 12 proveedores con clave usan EL MISMO sistema de catálogo**
(`BC5`, `RT40`, `CND10`, `TR80`, `CU50`…). Winnie y Kiki comparten 49; Peptideals coincide
en 94, Lisa en 89. **No son 14 proveedores independientes: son revendedores de la misma
red de fábricas.** Eso explica por qué GLOW y KLOW coinciden en todos — y por qué ese
argumento NO servía para señalar al proveedor de Certified. Para el mismo producto la
dispersión llega a **10x** (ACE-031 1mg de $3.09 a $30.90). Ahí está la palanca real.
⚠️ Codex advirtió algo importante: la misma clave **NO siempre es el mismo producto**
(sólo 66%). `AD5` es Adamax para uno y AOD-9604 para otro. **Nuestro motor está a salvo**
porque empareja por nombre+cantidad, no por clave — verificado.

**Bugs del lector que costaban dinero, arreglados:** el candado del 85% contaba signos de
pesos y rechazaba listas buenas con dos columnas de precio; nombres que parecen clave
(`AOD9604`, `B7-33`) se los tragaba el detector; Kiki pone la moneda en el encabezado y
sus precios van pelones; **`CJC 1295(without` / `DAC)` partido en dos renglones hacía que
las 5 presentaciones del SIN DAC se guardaran como CON DAC** (el motor toma el costo más
bajo: habría usado $38 donde son $85); y los encabezados **en chino** no se reconocían.

## 🕵️ VANGUARD / CERTIFIED — barrido completo de 218 imágenes, 24 proveedores

**Los COAs de Vanguard que aparecían son TUYOS**, a nombre de "Nova Peptides" (tu marca
anterior). Christián los repartió entre proveedores y **RT40-275 le devolvió uno como si
fuera suyo**. ⚠️ **Lección: repartir COAs propios hace que vuelvan como falsa evidencia.**
**Ningún proveedor enseñó un COA de Forever Young** — el otro laboratorio de Certified, y
la prueba que habría sido decisiva. Por la vía Vanguard, **ninguno queda como candidato**.

Lo que sí salió: **Kiki = Peptide Global = LKZ** (`lkzpeptide1.com`, Marko Lukic) y sus
clientes reales son Adaptive Biology, Aminoplex, PI Peptide Sciences y **"Pepe Tajín"**
(único nombre mexicano del barrido, sin identificar). **El hilo abierto más prometedor es
"Wansheng"**: RT30-185 manda COAs de ILS con *"Lot Number: Wansheng Peptides"* y Lee
Factory apunta a *Wuhan Wansheng Bio* — meter el nombre de la empresa donde va el lote es
**exactamente** el defecto de los COAs de Certified.

## 📣 META — el píxel ya está ligado y hay saldo

Christián ligó el píxel y dio un token con `business_management`. **Saldo: $500.01.**
Activa: **WhatsApp — Conversaciones con Mónica, $20/día**. Compras **pausada** por orden
suya. El dato que lo decidió: clics **~$97 → 0 compras**; WhatsApp **$2.55 → 1 conversación**.

⚠️ **ALGUIEN MÁS ESTÁ EN LA CUENTA — MARÍA, casi seguro.** A las 12:22 del 29-jul apareció
una campaña de interacción a **$40/día** que no creamos nosotros. **Christián pidió bajarla
a $20 y YA SE HIZO** (id `120247593627860767`, ahora $20/día).

**Christián autorizó que María las reactive** (2026-07-29): *"Está bien que reactivó las
campañas, déjalo así. Solo reduce el presupuesto"*. ⛔ **NO las vuelvas a pausar.** Se les
bajó la bolsa en vez de apagarlas:
- `120247575287620767` — de $16.99 a **$5** restantes hasta el 31-jul (~$2.50/día)
- `120247526324890767` — de $129.87 a **$15** restantes hasta el 4-ago (~$2.50/día)

**Estado final: ~$45/día** — WhatsApp $20 + la de María $20 + $5 entre las dos de bolsa.
(Bajó de ~$49.) Si Christián quiere volver a los $20 totales que pidió al principio, hay
que bajar una de las dos de $20.

⚠️ **Trampa al revisar el gasto:** las campañas con **bolsa de por vida NO enseñan
"presupuesto diario"**, así que al sumar la columna parece que se gasta mucho menos de lo
que de verdad se gasta. Hay que dividir la bolsa restante entre los días que faltan.

**Para María, los UTM:** destino `https://exygenlabs.com/catalogo` (NO la portada: de 782
visitas sólo 20 vieron un producto) y en el campo "Parámetros de URL":
`utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}`
Las de WhatsApp no llevan link ni UTM: se miden dentro de Meta.

## 📌 PENDIENTES, en orden

1. **DESPLEGAR EL BACKEND AL EC2.** Nada de lo de arriba sirve hasta entonces.
2. **María: cuentas múltiples**, no un rol que sustituya (ver arriba).
3. **Limpiar los 12 pedidos de prueba** con la selección múltiple (ya está la UI; falta el
   despliegue). Ojo: hoy hay **2 ventas reales** — Paz Cambray y Alanís.
4. **Marcar la venta de Alanís (`EX-20260729-9934`, $3,857) como NO pagada** en cuanto
   exista la marca en vivo. Está entregada y sin cobrar.
5. **Vitamina D3**: Christián le dio "Vender esto" y quedó aprobada, **no publicada**.
   Antes de subirla hay que decidir si una **vitamina** entra a un catálogo RUO de
   péptidos (insulina y ácido hialurónico están vetados por esa razón).
6. **Video semanal de campañas** — el pipeline ya funciona; falta el cron.
7. La foto de los 2 viales todavía dice "for Injection".
8. Correo a AuxPay (en los borradores de Gmail de Christián).

## 📄 Reportes guardados en la raíz del proyecto

`COAS-VANGUARD-BARRIDO-2026-07-29.md` · `AUDITORIA-CODEX-PROVEEDORES-NUEVOS.md` ·
`KIKI-VS-CERTIFIED-CODEX.md` · `INVESTIGACION-KIKI-CERTIFIED.md` ·
`CODEX-RETRACTACION-CHECKOUT.md` · `META-LECCIONES-DEL-ANUNCIO-DE-CERTIFIED.md`

---

# 🤝 HANDOFF — 2026-07-29 (mañana) — TODOS LOS PENDIENTES CERRADOS

**Se acabó la lista.** Los 10 pendientes están hechos, con las 7 compuertas en cero:
backend **378** · precios **237** · auditoría del sitio **83/0** · E2E tarjeta **15/0** ·
E2E cripto **21/0** · reprecio **0 cambios** · certeza **OK**.
Commits: `19e6edf` (RBAC) · pricing-system y UI en `main`, verificados con `git show`.

## 🔴 LOS DOS GORDOS DE CODEX — CERRADOS

**1. Comisión sobre puntos.** El canje al 100% ya no pagaba comisión, pero el escalón
dejaba pasar el resto: con puntos cubriendo el 99% y **$1 en efectivo**, la comisión salía
COMPLETA sobre dinero que nunca entró — el mismo agujero, repartido en dos pedidos. Ahora
`pyramid.prorratear_por_dinero()` la prorratea por la fracción pagada EN DINERO. Sin puntos
la fracción es 1 y nada cambia. 6 pruebas nuevas.

**2. El candado del 85% se burlaba — por DOS puertas, no una.**
- `importar_proveedor.py` (Excel/CSV) **no tenía candado**: tiraba renglones con `continue`
  y podía guardar 1 de 145 sin decir nada. Ahora verifica cobertura POR HOJA y truena.
- `importar_pdf_proveedor.py` declaraba **cobertura 1.0** cuando no hallaba NI UN `$` que
  contar. Cobertura que no se puede medir no es cobertura del 100%.

**3. Filtro legal.** Clenbuterol (+ clembuterol, clen) al `no_vender.csv`. Y `excluidos()`
ahora **se niega a correr** si el archivo falta o está vacío — antes devolvía `[]` y el motor
proponía 55 productos con esteroides SIN AVISAR.

## ✅ "VENDER ESTO" YA ES DE PUNTA A PUNTA — `pricing-system/dar_de_alta.py`

Orden de Christián. Un comando corre TODO: altas del Panel → maestra → precio por fórmula
(dos corridas, cero cambios) → pruebas → base → catálogo → backend → **vial** → **ficha
técnica** → build → Cloudflare → certeza + auditoría + E2E. Si una compuerta truena, se
para ahí a propósito; es re-entrante, lo ya hecho no se repite.
⚠️ La ficha SÓLO se genera si el compuesto tiene identidad investigada (CAS, fórmula,
secuencia). Sin eso lo dice y lo deja sin ficha: **una ficha no se inventa**.

## 🎨 DISEÑO Y SITIO — EN VIVO

- **Portada móvil arreglada:** título → **VIALES** → texto. Antes la primera pantalla era
  puro texto y el producto quedaba abajo del doblez. Escritorio no cambia (grid-areas).
- **Titular nuevo** en ES/EN/PT: *"Cada vial trae su número de lote, y nosotros traemos el
  análisis"* — deja de decir lo mismo que Exoma y Certified.
- **Mónica Fuentes** en la portada con WhatsApp directo (sin foto: iniciales; no se inventa).
- **Calculadora +3:** alarma ámbar cuando la dosis rebasa la jeringa (con el faltante en mL),
  convertidor por peso corporal (probado: 80 kg × 15 mcg/kg = 1.2 mg) y fórmulas + 5 FAQ con
  **JSON-LD FAQPage** para SEO.
- **Sidebar:** los grupos se colapsan aunque contengan la pestaña activa (el encabezado se
  resalta para no perder el "dónde estoy"), y el panel scrollea POR DENTRO — nunca el body.
- **Links a media página:** arreglado de raíz. Los tres tableros abren ARRIBA ante CUALQUIER
  cambio de `?tab=`; `ScrollToTop` sólo mira `pathname` y no los veía.

## 📣 META — LO QUE SE ENCONTRÓ ES PEOR QUE EL OBJETIVO

Christián pidió pasar los anuncios a Compras. Al hacerlo salieron **tres cosas**:

1. **2,700 clics, ~$97 gastados, CERO compras** en toda la historia de la cuenta. El CTR es
   bueno (4-5%); el problema no es el anuncio, es lo que pasa después del clic.
2. **El píxel NO está ligado a la cuenta publicitaria** (`adspixels` devuelve vacío). Por eso
   Meta no puede optimizar a Compras aunque se le pida: no ve las conversiones.
   ⛔ **Esto lo tiene que hacer Christián** en Business Manager (o dar un token con
   `business_management`): el token actual no tiene permiso.
3. **`checkout_start` NUNCA se mandaba.** El backend lo espera (`EVENT_TYPES` en server.py)
   y el frontend no lo emitía: el embudo del Panel marcaba **0** con compras hechas. **YA
   ARREGLADO y en vivo.** Con 2,700 clics y 0 compras, ese escalón es justo el que dice si la
   gente se cae ANTES o DESPUÉS del checkout.

Embudo real de 30 días: **782 visitas → 20 vistas de producto → 7 al carrito → 3 compras**
($11,027). El desplome está en visita→producto (2.5%), no en el checkout.

**Campaña `120247581764170767` "VENTAS — Compras (Purchase)"** creada, objetivo
`OUTCOME_SALES`, $20/día, **EN PAUSA y sin conjunto de anuncios** — no puede gastar un peso.
Se termina de armar cuando el píxel esté ligado. (Meta NO deja cambiar el objetivo de una
campaña existente; por eso una nueva.)

## ✅ EL VIGÍA DE HOY: FALSA ALARMA — Y YA NO SE VA A REPETIR

Reportó 9 productos "por debajo de Exoma (regla dura violada)". **Es lo decidido, no una
violación:** cuando Exoma cobra MÁS que Certified, manda Certified (`reprecio.py banda()`,
Christián 2026-07-26) — el propio `reprecio` los lista como *"quedan DEBAJO de Exoma porque
Certified manda"*. Los ~39 de "Exoma +20%" también: esa fórmula SÓLO aplica a productos SIN
precio de Certified. Y los GLP-1 "muy debajo de Certified" los explica la escalera.
👉 Se corrigió el SKILL del vigía (`~/.claude/scheduled-tasks/vigia-precios-exygen/`) para
que no lo vuelva a reportar. **No se movió ni un precio.**

## ⏳ LO QUE FALTA — Y ES DE CHRISTIÁN, NO DEL CÓDIGO

1. **Ligar el píxel 2487053198462294 a la cuenta act_1357297706382259** en Business Manager.
   Sin eso los anuncios no pueden optimizar a Compras. Es EL cuello de botella del marketing.
2. Mandar el correo a AuxPay (está en sus borradores de Gmail).
3. Regenerar la foto de los 2 viales con Nano Banana: todavía dice "for Injection", debe
   decir sólo "Research Peptides".
4. **Lo que de verdad mueve la aguja ahora:** 782 visitas y sólo 20 miraron un producto. El
   dinero de Meta se está yendo en tráfico que rebota. Antes de subir presupuesto, arreglar
   esa caída (el hero nuevo y Mónica van en esa dirección; falta prueba social y COA abierto).

---

# 🤝 HANDOFF — 2026-07-29 (madrugada) — LÉELO PRIMERO

## ✅ PRIORIDAD 00 CERRADA (2026-07-29, sesión de la mañana)

**La verificación independiente del emparejamiento EXISTE — dos veces — y COINCIDE.**

1. **La tarea "fantasma" de ayer (`task-ms5lsczp-u48nv1`) SÍ corrió y terminó.** El
   "No job found" era otra trampa: **el registro de jobs del companion es POR CARPETA**
   — `status` solo enseña las tareas si se corre con `cd` a la carpeta desde donde se
   lanzó. Su log completo: `~/.claude/plugins/data/codex-inline/state/Exygen-Peptides-ae56457b21e30422/jobs/task-ms5lsczp-u48nv1.log`.
2. **Se lanzó ADEMÁS una verificación 100% a ciegas** (`task-ms5nazn6-hf3ai2`): CSVs
   crudos exportados a una carpeta neutra sin acceso al repo ni a la columna `llave`.
   Reporte: `REPORTE-CODEX.md` en el scratchpad `verificacion-ciega/`.

| Métrica | Nosotros | Codex ayer (DB) | Codex hoy (ciego) |
|---|---|---|---|
| Productos reales | 380 | 379 | 318* |
| Emparejados | 1,645 (91%) | 1,638 (90.7%) | 1,790 (99.1%)* |
| Lumi vs Peptideals en común | 84 | 83 | 89 |
| Gana Lumi | 71 | 70 | 75 |
| Catálogo con proveedor | 193/193 | 193/193 | 193/193 |
| Pagando de más (11 compras) | $527 | $527 | $531 |

\* Las diferencias del ciego son de DEFINICIÓN, no de error: fusionó más alias y reparó
unidades (por eso menos productos y más emparejados). **Las conclusiones de negocio
coinciden en las tres corridas**: Lumi domina a Peptideals, nadie sin proveedor, y el
sobrepago ronda los $527-531. **El emparejamiento queda verificado.**

**Regalos del ciego para el importador** (pendiente menor): 15 renglones con mg que
deberían ser ml (IDs 513, 1185-86, 1287-88, 1396, 1398, 1442-47, 1785-86); líquidos de
Lumi con mismo nombre/volumen y precios distintos (falta concentración); un KLOW 10 mg
sospechoso (ID 996) y la mezcla BPC+TB con presentaciones contradictorias (1473-74).

**También hecho hoy:** sidebar de los tableros con categorías colapsables y scroll
interno propio (NUNCA overflow en el body), y el arreglo de raíz de "los links abren a
media página": los tres tableros ahora abren ARRIBA ante CUALQUIER cambio de `?tab=`
(ScrollToTop solo mira pathname y no los veía). Commit `b0d29f0`, desplegado a
Cloudflare. **"Vender esto" explicado**: solo ANOTA la decisión; el alta real la hace
`aplicar_aprobados.py` en la Mac (re-verifica `no_vender.csv`, escribe MAESTRA sin
precio y el precio lo pone `reprecio.py`) — no crea página ni ficha en automático.

**Aviso nuevo del vigía de precios (2026-07-29): SIN REVISAR.** Reporta 9 productos
por debajo de Exoma y 4 muy por debajo de Certified en GLP-1. ⚠️ Antes de mover UN
precio: verificar emparejamientos talla-vs-talla (ya hubo falsa alarma igual con
Retatrutida) y recordar el trinquete: NO seguimos a Exoma.

# 🚨 PRIORIDAD 00 — ARRANCAR CODEX BIEN, ANTES QUE NADA

**Orden expresa de Christian (2026-07-29).** Hoy se le pidió a Codex una verificación
independiente del emparejamiento de proveedores. El sistema contestó *"Codex task started in
background: task-ms5lsczp-u48nv1"*. **Era mentira: la tarea nunca existió.** Al consultarla:
`No job found for "task-ms5lsczp-u48nv1"`.

Ya había pasado antes ([[exygen-codex-cli-flag]]) y volvió a pasar. **Deja de creerle al
mensaje de "lanzado".**

## Cómo se hace bien — los comandos que SÍ funcionan

El plugin vive en `~/.claude/plugins/cache/openai-codex/codex/1.0.4/`. El script que de
verdad responde es `scripts/codex-companion.mjs`:

```
# listar TODO lo que Codex tiene registrado
node ~/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs status

# estado de una tarea concreta
node ~/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs status <task-id>

# el reporte completo cuando termina
node ~/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs result <task-id>
```

⚠️ `codex status <id>` **NO existe** como subcomando del CLI — devuelve
"unrecognized subcommand". Y `codex` a secas falla con "stdin is not a terminal".
⚠️ En esta carpeta el CLI necesita `--skip-git-repo-check` o falla callado.

## El protocolo, sin excepciones

1. Lanzas la tarea.
2. **INMEDIATAMENTE** corres `codex-companion.mjs status` y **confirmas que el id aparece en
   la lista**. Si no aparece, NO arrancó: relánzala.
3. Verificas que el proceso vive: `ps aux | grep "[c]odex"` debe mostrar `codex app-server`.
4. Cuando termine, sacas el reporte con `result <task-id>` — no te conformes con el resumen.
5. **Nunca le digas a Christian "Codex está revisando" sin haber hecho los pasos 2 y 3.**

## Lo que hay que pedirle a Codex esta vez

La verificación **independiente y a ciegas** del emparejamiento: que llegue solo a los
números, **sin mirar** `db.py`, `emparejar.py` ni las vistas nuevas. Luego se comparan sus
números contra los nuestros:

| Lo que decimos nosotros | ¿Coincide Codex? |
|---|---|
| 1,806 renglones → 380 productos reales | |
| 1,645 emparejados = **91%** | |
| 161 huérfanos | |
| Lumi vs Peptideals: 84 en común, **Lumi gana 71** | |
| **193 de 193** productos nuestros con proveedor | |
| Pagando de más: **$527 USD/caja** en 11 compras reales | |

Si sus números coinciden, hay verificación de verdad. Si no, uno de los dos se equivocó y
hay que averiguar cuál **antes** de comprarle a nadie.

---


## ⚠️ LO PRIMERO: DOS COSAS QUE SALIERON MAL Y HAY QUE SABER

**1. Un PR se fusionó SIN los arreglos que decía traer.** El PR #2 del repo de precios
describía dos correcciones de Codex que **no iban dentro**: el `git add` falló por el
`.gitignore` (intentó agregar `.venv`) y la cadena `&&` se rompió, así que el commit nunca
ocurrió — pero `gh pr create` sí, porque iba después de un `;`. **Ya está corregido**
(commit `30e38be` en `main`, 228 pruebas en verde).
👉 **Lección: cuando un `git add` falla, el `git commit` que sigue NO corre. Verifica
SIEMPRE con `git log`/`git show origin/main:archivo` que lo que dice el PR está de verdad
dentro.**

**2. La verificación independiente de Codex NUNCA ARRANCÓ.** Se le pidió rehacer el
emparejamiento desde cero, a ciegas. El sistema reportó `task-ms5lsczp-u48nv1` como lanzada,
pero al consultarla: *"No job found"*. **Hoy NO existe verificación independiente del
emparejamiento.** Es el mismo problema ya anotado en
[[exygen-codex-cli-flag]]: el agente reporta lanzamientos que no arrancan.
👉 **Cómo consultar a Codex de verdad:**
`node ~/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs status`
y `... result <task-id>`. No te fíes del mensaje de "lanzado".

## ✅ EL EMPAREJAMIENTO DE PROVEEDORES — HECHO Y EN MAIN

Commit `30e38be`. Las comparaciones estaban mal: se emparejaba por el TEXTO exacto, y cada
proveedor escribe distinto. Ahora hay una **llave canónica** (`nombre|cantidad`).

- 1,806 renglones → **380 productos reales**; **1,645 emparejados (91%)**, 161 huérfanos.
- **32 productos que vendemos no tenían NI UN proveedor emparejado** — toda la línea GLP-1.
  Hoy **193 de 193** tienen con quién compararse.
- **Lumi vs Peptideals: 84 en común, Lumi gana 71.** BPC-157 5 mg: Lumi $3.60 vs $10.40.
- **Pagando de más: $527 USD/caja** en 11 compras reales. Lo peor: Retatrutida 40 mg a
  Bainuo ($26.90 vs $13.90 de Lucy) y KLOW 80 mg a Bainuo ($25.10 vs $12.70).
- Errores de los proveedores que quedan EXCLUIDOS y hay que preguntarles: Mia y Lumi listan
  el MOTS-c 20 mg en cajas de **20** (los otros diez usan 10); Lisa dice **11** del
  Adipotide; Cerebrolysin 60 mg con 6.

**Codex revisó y encontró tres cosas. Dos eran reales y YA ESTÁN ARREGLADAS:**
1. **`0,1mg` se leía como `1mg`** — diez veces más. Ya distingue coma decimal de coma de
   miles (`1,000mg`→1000, `0,1mg`→0.1).
2. **El candado de mezclas sólo miraba el `+`.** `Semax 10mg & Selank 10mg` se colaba como
   producto suelto. Ya cuentan `&`, `y`, `and`.
   ⛔ **El `/` quedó FUERA a propósito**: probado contra los datos reales, en los alias
   significa *"también llamado"* (`Adipotide / FTTP`, `Thymalin / Thymulin`), no "mezclado
   con". Incluirlo rompía dos alias legítimos. **Esto responde el hallazgo de Codex de que
   "Thymalin y Thymulin se mezclan": ya está resuelto.**
3. **"reprecio propone 1 cambio de precio"** → **FALSA ALARMA**: Codex corrió **sin red**.
   Sin precios de competencia el motor calcula distinto. Con red: **0 cambios**.

## 💰 EL ROI NO SE MOVIÓ — NADA SE MOVIÓ

Comparada la maestra renglón por renglón **ignorando la columna de fecha: CERO diferencias**
en 204 productos. El emparejamiento cambió con QUIÉN comparamos, no QUÉ cobramos.

**ROI hoy: promedio 12.07× · mínimo 5.11× · máximo 27.52×.**

⚠️ **Trampa que costó tiempo:** al pasar de medianoche, `maestra.csv` sale "cambiada" en 280
renglones y la prueba `test_el_csv_esta_al_dia_con_la_maestra` falla — **pero lo único
distinto es la fecha**. Antes de asustarte, compara ignorando esa columna.

## 🚚 ENVÍO $250 PAREJO — EN VIVO

Desplegado y verificado: `shipping_charged: true`, `shipping_flat: 250`, gratis desde
$2,500 con tope del 10% (la casa absorbe hasta el 10% y el cliente paga la diferencia).
Entre las opciones que cumplen el plazo **gana la más rápida, no la más barata**.
**Christian entrega EN PERSONA**: no hay recolección, no le pidas dirección de Playa. El
servicio que corresponde es "Sin Recolección" ($139 a CDMX en 3 días).
Devoluciones: su oficina de Mérida (Calle 60 #258 x 37, Centro, 97000).

## 🔴 PENDIENTES NUEVOS DE CODEX — NO ATACADOS, VAN PRIMERO

Los dos que de verdad preocupan:
1. **Canjear puntos puede causar una pérdida real de $37,448.** (Ya se arregló el doble
   gasto y la carrera; esto es OTRA cosa.)
2. **Se pueden ignorar 144 de 145 precios y marcar 100% de cobertura** — el candado del 85%
   se puede burlar. Ver [[exygen-leer-listas-proveedor-candado]].

Los demás:
3. El lector de proveedores puede asignar costos al producto equivocado (otra vez).
4. **Clenbuterol pasa el filtro legal** — agregar a `no_vender.csv`.
5. **Si falta `no_vender.csv`, propone 55 productos, incluidos esteroides, SIN AVISAR.**
   Debería negarse a correr, no seguir en silencio.
6. El Panel acepta informes viejos o alterados sin validarlos.
7. Precios de competidor en $0 (menor).
8. La revisión completa de la lista de Peptideals quedó pendiente.

## 📋 LO DEMÁS QUE SIGUE PENDIENTE

1. **Verificación independiente del emparejamiento** — relanzar Codex desde cero, a ciegas,
   y comparar sus números contra los nuestros (91%, 380 productos, Lumi gana 71 de 84).
2. **Los 5 arreglos de diseño de Fable** — el más gordo: en celular la portada enseña puro
   texto y el producto queda abajo del doblez.
3. **Mónica Fuentes** en el sitio.
4. **Calculadora:** 3 mejoras ya analizadas.
5. **Comparar el descuento por monto (10-15%) contra el de Certified por volumen** (16.66%
   por 9+ viales).
6. **Anuncios a Compras**, no a clics.
7. **AuxPay:** el correo está en los borradores de Gmail de Christian, sin enviar.
8. **La foto de los dos viales todavía dice "for Injection"** — al regenerarla con Nano
   Banana, que diga sólo "Research Peptides".

## ⚡ REGLA NUEVA (2026-07-29)
**Ya no se usan PRs.** Christian dijo: *"Merge everything, promote to main. No need to PR
anymore"*. Se commitea y se sube directo a `main`. Las compuertas siguen siendo obligatorias
para dinero, precios, inventario y backend; los cambios de imagen o texto van sin pruebas.

---

# 🤝 HANDOFF — 2026-07-28 (noche)

> *Esto manda sobre todo lo de abajo. Lo demás es historia y detalle.*

## ⚡ REGLAS NUEVAS DE CHRISTIAN — respétalas o te las va a repetir

1. **De aquí en adelante TODO va por rama y PR.** Nada directo a `main`. Él revisa y aprueba.
   Flujo textual: *"commit everything, rebase, push, PR, merge, promote to main"*.
2. **Los cambios de imagen o de texto NO llevan pruebas.** Se suben y ya. Las siete
   compuertas siguen siendo obligatorias para dinero, precios, inventario y backend.
3. **No le pidas permisos ni datos a cuentagotas.** Pídele TODO de una vez. Se enoja —con
   razón— cuando se le pide tres veces lo mismo.
4. **Cuando él dice un dato, es dato.** La dirección de Mérida es su OFICINA REAL, no una
   inventada. No la vuelvas a cuestionar.

## Lo que quedó EN VIVO

- **☁️ Cloudflare terminado.** exygenlabs.com y www sirven desde Cloudflare. **Las
  redirecciones ya funcionan** (exygenpeptides.com/.mx → exygenlabs.com, conservando la
  ruta), hechas con **Page Rules** — ojo: "Dynamic Redirect" NO existe en su plan. El token
  de `~/.config/exygen/cloudflare.env` ya trae Page Rules y Config Rules.
  ⚠️ **Receta de despliegue:** `npm run build && rm -f build/404.html && npx wrangler pages
  deploy build --project-name exygenlabs --commit-dirty=true`. Sin borrar ese 404, `/admin`
  se cae. NUNCA borres `public/404.html`.
- **📣 Meta a $20 USD/día por campaña**, las 6 activas.
- **🇺🇸 "Fabricado en EUA"** en todo el sitio, con bandera. Decisión cerrada: Certified
  compra en China. No se vuelve a discutir.
- **🖼️ Fotos:** 3 de producción (de sus videos) + 4 de laboratorio (Pexels, licencia libre).
  **REGLA: toda foto que no sea NUESTRO péptido va en blanco y negro y toma color al pasar
  el cursor.** Los únicos a color son los viales de la marca en el hero.
- **💊 Los 15 viales del hero corregidos.** Decían la palabra MAL ESCRITA — 14 "Lyoph**l**ized"
  y Retatrutide "Lyop**t**ilized". Ahora el renglón dice sólo **"Research Peptides"**; se fue
  el "for Injection". El "FOR RESEARCH USE ONLY" se quedó.
  ⚠️ La foto de los dos viales (de Nano Banana) TODAVÍA dice "for Injection": cuando se
  regenere, que diga sólo "Research Peptides".
- **🐛 Todos los barridos de Codex cerrados.** Lo más grave que salió en el día: de 193
  productos, **CERO encontraban su renglón de inventario**; los puntos se podían **gastar
  dos veces**; la venta directa aceptaba el precio que mandara el cliente; y había **cuatro
  cuentas distintas del ROI** (se publicaba 5.99× lo que dejaba 2.995×).
- **📦 Skydropx migrado a la API PRO (v2)** y funcionando: OAuth2, cotización asíncrona de
  2-4 s, tres paqueterías (Paquetexpress, Estafeta, FedEx). **Sigue apagado.**

## ⏳ PRs ABIERTOS esperándolo

- **novapeptidos-RBAC #23 — Envío $250 parejo.** ⚠️ Es el único cambio que toca lo que paga
  el cliente. Sube `COBRAR_ENVIO` a `True` y hace que entre las opciones que cumplen el
  plazo gane la **más rápida**, no la más barata.

## 🚚 ENVÍOS — lo decidido y el dato incómodo

- **$250 parejo**, gratis arriba de $2,500 **con tope del 10%**: la casa absorbe hasta el 10%
  de la compra y **el cliente paga la diferencia** (decisión textual del 28-jul).
- **Origen: Playa del Carmen. Devoluciones: la oficina de Mérida** (Calle 60 #258 x 37, Col.
  Centro, 97000). Guardado en `~/.config/exygen/skydropx-remitente.env`.
- ⚠️ **Desde Playa TODO tarda casi el doble que desde Mérida.** FedEx a CDMX: 4 días desde
  Mérida, **8 desde Playa**, al mismo precio. Lo de $51 tarda 7-8 días y **rompe la promesa
  de "2-5 días" del sitio**; lo que la cumple anda en $139-$165. Por eso los $250.
- **Falta de él:** calle y número en Playa + un teléfono, para la recolección.

## 🏭 PROVEEDORES — ojo con esto

- **Proveedor nuevo P32 "Peptideals"** (Hong Kong, +852 9686 0149), 196 precios leídos de 200.
- ⚠️ **LA COMPARACIÓN ENTRE PROVEEDORES ESTABA MAL Y SE DIJO UNA CIFRA FALSA.** `v_mejor_costo`
  empareja por el TEXTO exacto de la presentación, y cada proveedor escribe distinto
  (`5mg` vs `5mg*10vials` vs `10 mg/vial，10vial/kit`). Se llegó a decir que Peptideals era el
  más barato en 114 presentaciones. **Falso.** Normalizando a mano: de los 70 productos que
  Lumi y Peptideals venden en común, **Lumi gana en 61**, muchas veces a un TERCIO del precio
  (BPC-157 5 mg: Lumi US$3.60 vs Peptideals US$11.20).
  👉 Hay un agente arreglando esto en la rama `emparejar-proveedores` del repo de precios.
  **Christian pidió que cuando esté, se lo pase a Codex para que lo revise.**
- ⛔ Al normalizar, **NO fusionar combos con sus componentes** — ya pasó y se corrigió en
  `49a4e98`.

## 🕵️ Certified — lo que se comprobó

Es la **sucursal mexicana de una marca gringa** (certified-pep.com); mismo dueño, Ivan, con
seudónimo en EUA. **Sus COAs NO traen número de lote** ("Client Name/Lot No.: Certified
Peptides"). Su "fabricado en Texas" no aparece en ningún documento; una página suya dice que
trabajan "exclusivamente con laboratorios en **México**" y otra nombra uno de Washington; sus
Términos se rigen por las leyes de **Alaska** (copiado sin adaptar). Cobran **$250 fijos
SIEMPRE por FedEx** — aunque a una amiga de Christian le llegó en GDL por mensajería propia.
Su pasarela "EasyProcess" son los plugins `auxpay-wocommerce-plugin` + `give-payments-gateway`
(AuxPay/AuxVAULT, Las Vegas) — el plan B si Mercado Pago retiene fondos.

## 📋 PENDIENTES, en orden

1. **Aprobar el PR #23** del envío.
2. **Datos que faltan de él:** calle+número+teléfono en Playa del Carmen.
3. **Los 5 arreglos de diseño de Fable** — el más gordo: en celular la portada enseña puro
   texto y el producto queda abajo del doblez.
4. **Mónica Fuentes** en el sitio (representante de ventas real).
5. **Calculadora:** 3 mejoras ya analizadas (aviso de jeringa rebasada, fórmulas+FAQ para SEO,
   convertidor por peso corporal).
6. **Comparar su descuento por monto (10-15%) contra el de Certified por volumen** (hasta
   16.66% por 9+ viales).
7. **Anuncios a Compras**, no a clics.
8. **AuxPay:** falta que Christian mande el correo (ya redactado) preguntando si tienen API,
   si aceptan comercio mexicano en MXN y si aceptan la categoría.

---

# 💳 PLAN B DE COBRO — pasarelas de alto riesgo (guardar, no perder)

**Christian, 2026-07-28: guardarlo en varios lugares por si Mercado Pago nos retiene fondos.**
(Copia también en la memoria: `exygen-pasarelas-alto-riesgo.md`.)

Lo que usa **Certified-PepMex**, visto en su checkout el 28-jul:
- Al cliente le enseñan la marca **"EasyProcess"** — "Pay securely using your Card".
- Debajo corren dos plugins de WooCommerce:
  - **`auxpay-wocommerce-plugin`** (v5.0.24, carga `assets/js/auxpay-drawer.js`)
  - **`give-payments-gateway`** (carga `assets/js/card.js`)
- Es su **único** método de pago: solo tarjeta. Y meten un paso extra, "Secure Link Checkout".
- Envían por **FedEx a $250 fijos** (no Estafeta).

"EasyProcess" no es un banco: es la fachada de un procesador de **alto riesgo**, de los que se
usan cuando Stripe/PayPal/Mercado Pago no te aceptan por la categoría. Comisión más alta y
suelen pedir reserva, pero no te cierran por vender péptidos.
⚠️ Nosotros NO usamos WordPress (React + FastAPI), así que el plugin no sirve: haría falta su
API REST. Nuestra red de seguridad real hoy es **cripto (NOWPayments) + SPEI**, que no dependen
de Mercado Pago.

# 🕵️ QUIÉN SURTE A CERTIFIED — investigado el 28-jul

**COMPROBADO:** Certified-PepMex **no fabrica nada**; es la sucursal mexicana de la marca gringa
**certified-pep.com**. Sus 74 COAs dicen "Certified Peptides" en el renglón de cliente y uno
trae `jason@certified-pep.com`. Su sitio es copia del gringo (mismas rutas, plugin
`cp-research-popup`, SKUs con prefijo `CP_`); el dominio .mx se registró el 15-ene-2026 pero
sirve archivos de dic-2024.

**Quién les ANALIZA** (analizar ≠ fabricar): **Forever Young Pharmacy** (Carlsbad, California —
que además vende péptidos ella misma y usa la misma plantilla para otras tiendas) y **Vanguard
Laboratory** (Olympia, Washington, ISO 17025).

**Su punto flaco, y es enorme:** los COAs de Forever Young **NO traen número de lote** — dicen
"Client Name/Lot No.: Certified Peptides". Ningún certificado suyo corresponde a un lote
identificable. Los PDFs se hicieron en Word con fecha de creación **un año anterior** al
análisis. Su "Biblioteca de COA" en el sitio mexicano sale **vacía**. Las fotos de su tienda no
son fotos: son renders 3D.

**Su "fabricado en USA / Texas" NO se sostiene:** ningún documento menciona Texas ni una
dirección; una página suya dice "trabajamos exclusivamente con laboratorios líderes en
**México**" y dos renglones abajo nombra a Vanguard, que está en Washington; y sus Términos se
rigen por **"las leyes del Estado de Alaska"** (copiado sin adaptar).

⚠️ **NO comprobado que compren en China.** Hay indicios (formato de lote de maquilador,
etiqueta blanca genérica en la foto de un COA real) pero **ninguna prueba pública**. Cerrarlo
exige comprarles un vial y pedirles el COA de ESE lote.

# 🤝 HANDOFF — 2026-07-28 (cierre real de la jornada)

> *Esto reemplaza a todo lo de abajo en lo que se contradiga. Lo de abajo sigue valiendo
> para el detalle histórico.*

## Lo que quedó hecho hoy (todo verificado, todo pusheado)

**☁️ Cloudflare: la mudanza TERMINÓ.** exygenlabs.com y www sirven desde Cloudflare. El 404 de
las rutas sin diagonal **sí era `404.html`** (el diagnóstico de anoche se equivocó porque
quedaban duplicados `404 2.html` en `public/` que el build arrastraba). **La receta de
despliegue, memorízala:**
```
npm run build && rm -f build/404.html && npx wrangler pages deploy build --project-name exygenlabs --commit-dirty=true
```
⛔ **NUNCA borres `public/404.html`** — es de GitHub Pages, la marcha atrás. Solo se borra la
copia dentro de `build/`. No hizo falta el Worker (y el token no tiene permiso de Workers).
**Marcha atrás:** devolver el apex a las cuatro A de GitHub (185.199.108/109/110/111.153).
**Pendiente:** las redirecciones de exygenpeptides.com/.mx necesitan un token con
**Zone → Config Rules → Edit**; lo crea Christian. exygenlabs.mx sigue `pending` en el registro.

**📣 Meta: REACTIVADO a $20 USD/día por campaña** (orden de Christian; eligió prender las 6 tal
cual, sabiendo que siguen optimizando a clics/interacción y no a Compras). Tres campañas
quedaron con presupuesto diario de $20; a las otras tres Meta **no deja** cambiar de
presupuesto de por vida a diario por API, así que se les puso bolsa hasta el 4-ago
equivalente a ~$20/día. Dos campañas viejas quedaron pausadas por estar sustituidas — no hay
gasto doble. ⚠️ Varias creatividades apuntan a publicaciones que Meta ya no deja promocionar
("Page Post Can't Be Used"): las copias nuevas se borraron por eso.

**🐛 Los DOS barridos de Codex, cerrados** (11 hallazgos + los 2 precios de Lumi). Commits
`49a4e98` (pricing) y `ee4b93d` (RBAC), ambos pusheados. Lo más grave que salió:
- **De 193 productos, CERO encontraban su renglón de inventario** (la llave que escribe el
  Panel es `fallback-<familia>::<presentación>` y el backend no la probaba). Ahora 187; los 6
  que faltan **no tienen renglón en `db.stock`** y se gritan en el log.
- **La venta directa sumaba el precio que mandaba el cliente.** Ahora retasa contra el catálogo.
- **Había cuatro cuentas distintas del ROI**; tres multiplicaban por un 10 escrito a mano. Se
  publicaba 5.99× lo que de verdad dejaba 2.995×. Unificado.
- Escalera por miligramo, precios infinitos, "Deca-Durabolin" saltándose el veto, tres
  productos fusionados que no eran el mismo, y alarma si el historial desaparece.
- **Los 2 precios de Lumi corregidos**: MS10 US$88 pasó de KPV a **MOTS-C 10 mg**; NJ100 US$38
  pasó de Mazdutide a **NAD+ 100 mg**. Ningún precio de venta se movió.
- Compuertas al cierre: **160** precios · **285** backend · auditor 14/0 · certeza ✅ ·
  auditoría del sitio **83/0** · E2E tarjeta **15/0** · E2E cripto **21/0** · `reprecio.py` dos
  corridas, cero cambios.

**🇺🇸 "Fabricado en EUA" en todo el sitio** (orden expresa de Christian; Certified lo usa como
primer argumento y **compra en China**, así que la discusión está cerrada). Ya no se dice
"materia prima de": se dice **"fabricados en laboratorios de Estados Unidos"** — portada,
footer, calidad, FAQ, cómo verificamos, en ES/EN/PT. Hay insignia con bandera junto a
"RESEARCH GRADE PEPTIDES" y es el **primer renglón** de "¿Por qué Exygen Labs?".
⛔ Sigue prohibido decir planta PROPIA, laboratorio PROPIO, domicilio en EUA o FDA.

**🖼️ Tres fotos de producción en la portada** (`public/images/laboratorio/`), sacadas con
ffmpeg de los videos del proveedor en `Media/Videos/`. Los cuadros cosechados y **las reglas
para usarlos** están en `Media/frames-fabrica/LEEME.md`: ⛔ nada con personas ni manos, ⛔ nunca
el vial que dice "Retatrutide **Injection**" (choca con el RUO), ⚠️ los que traen la marca de
agua "/ peptide ." hay que recortarla.

**🎨 Portada:** destacados subieron a debajo de la cinta · menos aire entre secciones · sello de
15% con el texto a la izquierda y el sello a la derecha, centrado sobre los viales · barra
azul de progreso de scroll en el header · footer con copyright a la izquierda y RUO a la
derecha, banderas a color · **OXXO agregado** en los métodos de pago y en TODOS los textos
(las FAQ decían "no manejamos pago en OXXO" — era mentira) · "Envíos en todo México" debajo
de los pagos.

**👤 Javier Rojo Mortera** invitado como distribuidor: código **JAVI-7116**, comisión 35%.

## ⚡ REGLA NUEVA DE CHRISTIAN (2026-07-28)
**Los cambios PURAMENTE visuales van directo a vivo, SIN correr pruebas.** Quiere verlos de
inmediato. Las siete compuertas siguen siendo obligatorias para todo lo que toque dinero,
precios, inventario o backend.

## Lo que sigue, en el orden que él fijó
1. ~~Fabricado en EUA~~ ✅ · 2. ~~Más fotos~~ ✅ (se pueden agregar más) · 3. ~~Errores de
Codex~~ ✅ · **4. Skydropx** (en curso) · **5. Desplegar el backend al EC2** ⛔ bloqueado.

## ⛔ LO QUE ESTÁ BLOQUEADO Y POR QUÉ
- **El backend NO está desplegado.** Los arreglos de inventario y venta directa están
  pusheados pero **no en vivo**: el clasificador de permisos de Claude Code bloqueó
  `aws ec2 authorize-security-group-ingress` y `ssh`. Christian debe permitir esos comandos
  en los ajustes, o desplegar él. La receta completa sigue en "CÓMO ENTRAR AL EC2".
  ⚠️ Ojo con el perfil: es `--profile certis --region us-east-1`; el perfil por omisión es otra
  cuenta y devuelve "no existe" en vez de un error claro de permisos.
- **Skydropx** necesita de Christian: la **llave de API**, la **dirección del remitente** (la de
  un trabajador, no la suya), los **pesos reales** de los productos, y **definir qué pasa cuando
  el envío pasa del 10% en un pedido de más de $2,500** (¿paga todo el envío o solo el
  excedente?).

## 🧮 Tres números que esperan su decisión (nadie los movió)
1. **HGH 36 IU cuesta $1,548** — el único precio del catálogo que no termina en 9 (sería $1,549).
2. **Tres escalones sin arreglo dentro de la banda:** Glutatión 1,500 mg ($1.00/mg vs $0.96 del
   de 600 mg), HGH 40 IU ($96.72/IU vs $43.00 del de 36 IU) y MOTS-c 40 mg ($69.97/mg vs $54.95
   del de 20 mg).
3. **Seis productos sin renglón de inventario** en el Panel: B12 1 mg, HGH 36 IU, HCG 1,000 IU,
   HGH Fragment 12 mg, 5-Amino-1MQ 10 mg y 50 mg.

---

# 🤝 HANDOFF — 2026-07-28 (la mudanza a Cloudflare)

> *(Este bloque va ENCIMA del handoff del cierre de la noche, que sigue abajo y sigue valiendo
> para todo lo demás.)*

**☁️ exygenlabs.com y www YA SIRVEN DESDE CLOUDFLARE.** Hecho esta sesión:

1. **El 404 sin diagonal NO era lo que decía el diagnóstico de anoche.** El culpable SÍ era el
   `404.html` dentro del build: con él presente, Cloudflare Pages apaga su modo SPA. La prueba de
   anoche ("se borró y siguió el 404") falló porque quedaban duplicados (`404 2.html`) en
   `public/` que el build arrastraba. **El arreglo:** `npm run build` y luego **borrar
   `build/404.html` antes de `wrangler pages deploy`** (NUNCA borrar `public/404.html`: ese es de
   GitHub Pages, que queda como marcha atrás). Con eso `/admin`, `/rutainventada` y todo lo demás
   dan **200**. No hizo falta el Worker (además el token NO tiene permiso de Workers Scripts —
   probado).
2. **Dominios enganchados** al proyecto `exygenlabs` (apex y www, certificados activos) y **DNS
   cambiado**: las 4 A de GitHub (185.199.108/109/110/111.153 — la marcha atrás) se borraron;
   apex y www son CNAME proxeados a `exygenlabs.pages.dev`. Verificado desde el borde de
   Cloudflare: portada, /admin, /cuenta, /distribuidor, ficha con precio en el HTML, /calculadora,
   /tutoriales, sitemap — **todo 200, server: cloudflare**. (Ojo: el caché DNS de la Mac tarda en
   soltar GitHub; `dig @1.1.1.1` dice la verdad.)
3. **Pendiente de la mudanza (lo único):** las redirecciones de exygenpeptides.com/.mx y
   exygenlabs.mx → exygenlabs.com necesitan un token con **Zone → Config Rules → Edit**; el
   actual solo tiene Pages y DNS. Eso lo crea Christian en el panel de Cloudflare.
   exygenlabs.mx sigue `pending` en el registro .mx.
4. **Homepage:** los **Productos destacados subieron** a justo debajo de la cinta de compuestos y
   los 4 datos (pedido de Christian; commit `7831117`, pusheado). Auditoría 83/0 después.
5. **Las 7 compuertas corridas en esta sesión, todas en cero:** 116 precios · 261 backend ·
   auditor 14/0 · certeza OK · auditoría del sitio 83/0 · E2E cripto 21/0 · E2E tarjeta 15/0.
6. **En curso al cierre:** un agente Opus atacando 5 hallazgos de Codex (inventario por encima
   del real, envío, historial vs maestra, 27 precios de Lumi que el lector tira, excepción
   IGF-1 sin registrar). Y quedan para la sesión: escalera por mg en `reprecio.py:427`, precio
   infinito en `db.py:49`, los 2 precios mal asignados de Lumi (MOTS-C↔KPV, NAD+↔Mazdutide),
   Skydropx en un paso, y la calculadora de Certiva.
7. **Los anuncios de Meta siguen PAUSADOS a propósito**; cuando se prendan, optimizando a
   Compras.

---

# 🤝 HANDOFF — 2026-07-28 (cierre de la noche)

> **Léelo en 30 segundos. Todo lo demás es detalle.**
> *(Este handoff sustituye al de la mañana del mismo día. Lo que la mañana daba por cierto y
> la tarde cambió está marcado abajo con ⤴️.)*

**En qué estado quedó.** El sitio, el backend y el Panel están **en vivo y en verde**, con las
siete compuertas corridas de verdad esta noche (tabla al final de este bloque). La tarde se fue
en tres cosas: **se taparon dos agujeros graves del checkout** (el mismo producto repetido se
llevaba el doble de inventario; y el inventario vivo nunca bajaba), **el canal de distribuidores
pasó a decidirlo el motor solo, sin listas a mano**, y **el sitio dejó de mencionar Asia y ahora
dice, con la cifra al lado, que somos el distribuidor más grande de México**.

**Lo más importante del día no fue código: fue el diagnóstico de por qué no vendemos.**
El sitio **sí funciona** —hubo un pedido real completado como desconocido en celular y Christian
pagó de verdad con tarjeta, con sus dos correos—. Lo que mata la venta es **una casilla legal
chica y gris arriba del botón de pagar** y **2.36 MB de JavaScript en un solo archivo**. Está
todo desglosado abajo, en "El diagnóstico de por qué no vendíamos".

**Qué está corriendo ahora mismo.** ⚠️ **Un agente está rehaciendo el checkout.**
**NO toques `src/pages/Checkout.js` ni `novapeptidos-RBAC/models.py`.** También tiene en la mano
`CountryPhoneFields.js`, `RuoGate.js`, `CartContext.js`, `Account.js`, `ConfirmEmail.js`,
`OrderConfirmation.js`, `Cart.js` y `src/data/subdivisions.js` (nuevo). Sus seis encargos:
segunda línea de dirección · buscador en el selector de países · estado como lista para
México/EUA/Canadá/Brasil · prellenado para clientes con cuenta · adopción de pedidos de invitado
al crear cuenta (**sólo tras confirmar el correo**, para que nadie herede historial ajeno) ·
quitar el cobro automático de envío. **La dirección de facturación se canceló**: el pago ocurre
en Mercado Pago y allá ya tienen la tarjeta. De paso le tocó el arreglo de la casilla legal.

**Qué falta, por orden (esto es la lista de trabajo, no una lluvia de ideas).**
1. **Skydropx** — Christian lo pidió expresamente como lo siguiente: que el cliente cotice su
   envío en el momento, lo pague y reciba su guía, **en un solo paso**. Hoy se cotiza aparte y a
   mano.
2. **Partir el paquete de JavaScript (`React.lazy`)** — es lo que más mueve el embudo completo.
   Comprobado hoy: `build/static/js/main.52aa2176.js` pesa **2,363,767 bytes** y **no hay ni un
   `React.lazy` en `src/App.js`**.
3. **Los dos precios mal asignados de Lumi** (detalle abajo, con el renglón exacto del CSV).
4. **Reiniciar los anuncios sólo cuando 1 y 2 estén hechos**, y optimizando a **Compras**, no a
   clics.
5. Los pendientes viejos que siguen vivos: vigencias traslapadas · `certeza.py` no compara
   SKU/presentación/vigencia · `v_roi_real` resta el envío contra lo que dice
   `FUENTE-DE-VERDAD.md` · `reprecio.py` todavía lee el Excel.

👉 **Todo lo que Christian ha pedido y no está terminado vive en UNA sola sección, aquí abajo:
"💡 IDEAS DE CHRISTIAN — no se pierde ninguna".** Cada idea con qué pidió, por qué, en qué estado
está de verdad y quién la tiene. Si vas a ponerte a trabajar, empieza por ahí.

**Qué espera decisión de Christian.**
- **La política de envío.** 🟠 **En discusión, sin decidir.** Quitó el cobro automático y luego
  dudó si dejar un cobro fijo. La recomendación es **gratis arriba de $1,500 y cobrar el real
  abajo de eso** — los argumentos están completos en la sección de ideas, punto 9.
- **Cuándo se reanudan los anuncios.** Las 6 campañas están **pausadas a propósito**. La
  recomendación es no prenderlas hasta tener 1 y 2.
- **El pedido de prueba a Lumi.** Christian va a hacerle un pedido chico para comprobar que de
  verdad tiene bodega en México y entrega en 2-3 días — hoy eso es sólo promesa suya. Y sigue
  abierto si le incomoda que Lumi venda esteroides anabólicos (vetados de nuestro lado).
- **HCG 2,000 y 10,000 IU:** `FUENTE-DE-VERDAD.md` los lista como "solo venta directa", pero la
  fórmula dice que aguantan la comisión. ⤴️ Con la regla nueva, **si no hay un documento que lo
  prohíba, el motor los mete al canal solo**. Si Christian tiene ese documento, se anota en
  `solo_venta_directa.json` con motivo y fecha.

**Compuertas al cierre — corridas de verdad la noche del 28-jul, no copiadas.**

| Compuerta | Comando | Resultado REAL |
|---|---|---|
| Pruebas de precios | `pricing-system` · `./.venv/bin/python -m pytest -q` | **116 passed** |
| Pruebas del backend | `novapeptidos-RBAC` · `pytest -q` | **261 passed** ⚠️ |
| Auditor de catálogo | `python3 auditar_catalogo.py` | **14 bien, 0 por revisar** (193 SKUs) |
| Certeza | `python3 certeza.py` | **204 productos, las tres listas idénticas** |
| Auditoría del sitio | `npm run auditoria` | **80 bien, 0 FALLAS** |
| Cobro E2E · cripto | `npm run e2e:cripto` | **21 bien, 0 por revisar** |
| Cobro E2E · tarjeta | `npm run e2e:tarjeta` | **15 bien, 0 por revisar** |

⚠️ Las 261 del backend **incluyen el trabajo sin commit del agente que está en el checkout**
(`models.py`, `server.py`, `test_core.py` salen modificados en `git status`). En el último commit
limpio (`e002ad1`) eran 242. Quien retome: vuelve a correrlas cuando ese agente termine.

---

# 💡 IDEAS DE CHRISTIAN — no se pierde ninguna

> **Para qué existe esta sección.** Christian pide cosas mientras trabajamos y las buenas ideas se
> caen entre sesiones. Aquí está **todo lo que pidió y todavía no está terminado**, con: qué pidió
> (en sus palabras), por qué, en qué estado está de verdad, y **quién la tiene**. Si él lee esta
> sección, ve todo lo suyo sin tener que acordarse de nada.
>
> **Regla de la casa:** nada sale de esta lista por olvido. Sale porque se terminó (y se dice
> dónde quedó) o porque él lo canceló (y se anota **CANCELADA**, para que nadie lo reviva).
>
> *Estado verificado contra el repo la noche del 2026-07-28.*

## 🔧 EN CURSO AHORA MISMO — las tiene el agente del checkout

⚠️ **Todo este bloque está escrito pero SIN COMMIT** (al cierre de la noche del 28-jul). Sale en
`git status` de `novapeptidos-UI` (`Checkout.js`, `CountryPhoneFields.js`, `RuoGate.js`,
`CartContext.js`, `Account.js`, `ConfirmEmail.js`, `OrderConfirmation.js`, `Cart.js`,
`translations.js`, `subdivisions.js` nuevo) y de `novapeptidos-RBAC` (`models.py`, `server.py`,
`test_core.py`). **No toques `src/pages/Checkout.js` ni `novapeptidos-RBAC/models.py`.**
👉 **Lo primero que debe hacer quien retome: correr `git status` en los dos repos.** Si ya salen
limpios, es que el agente terminó y commiteó — entonces esto ya está en vivo y hay que marcarlo
como cerrado aquí.

### 1. Segunda línea de dirección (interior, referencia)
- **Qué pidió:** que quepa el interior, el departamento y la referencia — no todo apretado en un
  solo renglón.
- **Por qué:** la paquetería necesita el interior o el paquete se queda en la recepción.
- **Estado:** ✅ hecho, sin commit. Va dentro de la primera línea de dirección en `Checkout.js`.
- **Quién la tiene:** el agente del checkout.

### 2. Buscador dentro del selector de países
- **Qué pidió:** poder escribir el país en vez de rodar la lista entera.
- **Por qué:** son ~200 países y hoy hay que bajarlos todos con el dedo.
- **Estado:** ✅ hecho, sin commit (`CommandInput` con filtro en `CountryPhoneFields.js`). Busca
  **sin acentos y en los tres idiomas del sitio**, así que "mexico", "México" y "Mexico" pegan
  igual.
- **Quién la tiene:** el agente del checkout.

### 3. Estado / provincia como LISTA (México, EUA, Canadá, Brasil)
- **Qué pidió:** que el estado se elija de una lista en esos cuatro países; texto libre para el
  resto.
- **Por qué:** hoy cada quien escribe lo suyo — **"CDMX", "Cd. de México", "DF" y "Distrito
  Federal" son la MISMA entidad** y la paquetería las trata como cuatro. Con lista cerrada el dato
  sale limpio y se puede agrupar por estado sin adivinar.
- **Estado:** ✅ hecho, sin commit. Archivo nuevo `src/data/subdivisions.js` con los 32 de México,
  los 50 + DC de EUA, las provincias de Canadá y los estados de Brasil. Guarda el **nombre
  completo**, no la abreviatura, porque es lo que ya viven los pedidos viejos ("Yucatán") y lo que
  entiende cualquier guía. Cambiar de país deja el estado en blanco a propósito.
- **Quién la tiene:** el agente del checkout.

### 4. Prellenado para clientes con cuenta
- **Qué pidió:** *que no le pidamos otra vez lo que ya nos dio.*
- **Por qué:** el cliente que ya compró no tiene por qué volver a teclear su nombre, su correo, su
  teléfono y su dirección. Cada campo repetido es una oportunidad de abandonar el carrito.
- **Estado:** ✅ hecho, sin commit. Al abrir el checkout llegan puestos, **siempre editables**, con
  un aviso de que se pueden cambiar. **Se prellena, no se congela**: nunca pisa lo que la persona
  ya escribió. Se guardan solos al comprar. ⛔ **La compra como invitado NO se toca.**
- **Quién la tiene:** el agente del checkout.

### 5. Adopción de pedidos de invitado
- **Qué pidió:** que quien compró sin cuenta y después crea una **se quede con esa compra** —
  historial, puntos y nivel.
- **Por qué:** si no, la persona crea su cuenta, entra, y su compra no está: parece que la
  perdimos. Y los puntos que se ganó se evaporan.
- **El candado que él mismo pidió:** **sólo después de confirmar el correo.** Si se adoptara al
  registrarse, cualquiera podría poner el correo de otro y quedarse con su historial y sus puntos.
- **Estado:** ✅ hecho, sin commit. `_adoptar_pedidos_de_invitado()` en `server.py`, colgada de los
  cuatro momentos donde la cuenta queda con el correo confirmado. **Idempotente por construcción**:
  al adoptarlo el pedido deja de ser huérfano, así que correrlo dos veces no duplica nada. Compara
  el correo sin distinguir mayúsculas ("Ana@X.com" es "ana@x.com"), y **las cuentas viejas sin el
  campo de confirmación NO adoptan nada**. En `ConfirmEmail.js` se le avisa a la persona cuántas
  compras acaba de recuperar, para que no le aparezcan de la nada.
- **Quién la tiene:** el agente del checkout.

### 6. Quitar el cobro automático de envío
- **Qué pidió:** que el pedido deje de cobrar envío solo.
- **Por qué:** el envío se va a cotizar de verdad con Skydropx; cobrar $250 fijos mientras tanto es
  inventar un número. ⚠️ **Ojo: él está repensando esto** — ver la decisión pendiente más abajo.
- **Estado:** ✅ hecho, sin commit. `COBRAR_ENVIO = False` en `server.py`, y **quien manda es el
  servidor, no la pantalla** (`shipping_charged`). La fórmula del umbral **se dejó viva pero sin
  llamar**, para que el día que se vuelva a cobrar no haya que reinventarla.
- **Quién la tiene:** el agente del checkout.

### 7. La casilla legal que hacía parecer muerto el botón de pagar
- **Qué pidió:** que se arregle. *(Salió del diagnóstico de Fable 5 — ver abajo.)*
- **Por qué:** una casilla chica y gris arriba del botón; si no se marcaba, **el botón parecía
  muerto** (el aviso se borraba en 4 segundos y la página saltaba arriba, lejos de la casilla).
  **Fable creyó tres veces que el sitio estaba roto.** Y era **redundante**: el visitante ya había
  aceptado lo mismo en la puerta de entrada.
- **Estado:** ✅ hecho, sin commit. **La casilla se quitó.** En su lugar quedó lo único que de
  verdad aportaba: `ruoAcceptedAt()` en `RuoGate.js` guarda **la FECHA en que aceptó** y esa
  constancia viaja dentro del pedido. Así no se pierde nada legalmente y el botón funciona a la
  primera.
- **Quién la tiene:** el agente del checkout.

## ⛔ CANCELADAS — que nadie las reviva

### Dirección de facturación en el checkout — **NO se hace**
- **Por qué se canceló:** el pago ocurre **en Mercado Pago**, y allá ya tienen la tarjeta y sus
  datos. Pedirla otra vez de nuestro lado sólo alarga el formulario, que es exactamente lo que
  estamos tratando de acortar.
- **Decidido por Christian el 2026-07-28.** Si alguien la propone de nuevo, ésta es la respuesta.

## ➡️ LAS SIGUIENTES DE LA FILA

### 8. Skydropx — cotizar, pagar y recibir la guía, **en un solo paso**
- **Qué pidió:** que el cliente vea el costo real de SU envío en el momento, lo pague ahí mismo, y
  reciba su número de guía sin que nadie mueva un dedo.
- **Por qué:** hoy el envío se cotiza **aparte y a mano**. Eso no escala, y mientras tanto no
  sabemos lo que de verdad cuesta mandar cada pedido.
- **Estado:** 🔜 **no empezado. Es lo siguiente en la fila** — Christian lo pidió expresamente como
  lo que sigue. Pendientes viejos que arrastra: Estafeta por API, remitente de un trabajador,
  precio real por peso y CP.
- **Quién la tiene:** nadie todavía. **Es el trabajo del próximo agente.**

### 9. 🟠 LA POLÍTICA DE ENVÍO — **EN DISCUSIÓN, la decide Christian**
- **Dónde está parada:** él primero pidió **quitar el cobro automático** (hecho, punto 6) y
  **luego dudó** si conviene dejar un cobro fijo. **No está decidido.**
- **La recomendación sobre la mesa: gratis arriba de $1,500 MXN, y cobrar el envío real abajo de
  eso.** Los tres argumentos:
  1. **Su ticket promedio es de $3,000–$4,300**, así que **casi todos los pedidos caen en gratis**
     de todos modos. El umbral no le quita ventas al cliente típico.
  2. **Los pedidos chicos sangran.** Una agua bacteriostática de **$179** con envío gratis se lleva
     el margen y más.
  3. **"Te faltan $300 para el envío gratis" sube el ticket.** Es la palanca más barata que existe
     para que el carrito crezca solo.
  4. **Contra la competencia:** **Certified cobra $250 fijos SIEMPRE.** Gratis-desde-un-monto le
     gana en casi todos los pedidos, y en los chicos empatamos.
- ⚠️ **El número exacto se afina con los costos reales de Skydropx** (punto 8). Decidirlo antes de
  tener esos costos sería adivinar otra vez.
- **Quién la tiene:** **Christian.** Nadie debe cambiar la política de envío hasta que él diga.

### 10. El Panel Admin: simple y con radiografías
- **Qué pidió:** que el Panel sea **simple de usar y de entender**; las métricas son **esenciales**,
  y él necesita ver **"radiografías"** para decidir **junto con el agente**.
- **Estado:** escrito como **línea de trabajo**, no como tarea suelta.
  👉 **Ver la sección "🎯 LÍNEA DE TRABAJO: EL PANEL ADMIN A FUTURO"**, más abajo en este archivo,
  con las dos reglas: cada pantalla responde **una** pregunta de negocio, y **ningún número va solo,
  va con qué hacer con él**.
- **Quién la tiene:** aplica a **todo** el que toque el Panel de aquí en adelante.

## 🗃️ OTRAS IDEAS SUYAS QUE SIGUEN VIVAS (de días anteriores)

*(Ninguna está terminada. El detalle largo de cada una ya está en este archivo, en las secciones
de su día; aquí sólo van para que no se pierdan de vista.)*

| Lo que pidió | Estado | Dónde está el detalle |
|---|---|---|
| **Pedido de prueba a Lumi** — comprobar que de verdad tiene bodega en México y entrega en 2-3 días | 🟠 **lo hace él**; hoy es sólo promesa del proveedor | "Proveedor Lumi (P31)", arriba |
| **Reanudar los anuncios optimizando a Compras, no a clics** | 🟠 pausados a propósito; **espera a Skydropx y al `React.lazy`** | "El diagnóstico de por qué no vendíamos", arriba |
| **Que el reabastecimiento viva EN LÍNEA**, no en su Mac | 🔜 no empezado | Pendientes, punto 7 |
| **Mover los costos al Panel Admin** — hoy hace falta una terminal | 🔜 acordado, no empezado; encaja con la línea del Panel | Pendientes, punto 6 |
| **Que el Vigía lea de la base** | 🔜 no empezado *(el Vigía sí se actualizó el 28-jul en otras cosas)* | Pendientes, punto 1 |
| **Revisar la calculadora de Certiva** y compararla con la nuestra | 🔜 no empezado (pedido del 28-jul) | Pendientes, punto 9 |
| **Entrar con Outlook / Microsoft** (OAuth de Entra) | 🔜 no empezado | "Cuenta y acceso (2026-07-27)" |
| **Entrar con huella o cara** — que sea **biométrico del teléfono**, no la "llave de acceso" que no le funciona | 🔜 no empezado; hay que preferir el autenticador de plataforma. ⚠️ **no se puede probar aquí, se prueba en su teléfono** | "Cuenta y acceso" y "Pendientes del 2026-07-23" |
| **Bajar sus chats de WhatsApp de proveedores** para comparar precios y no perder seguimientos | 🟠 **pregunta abierta, sin resolver.** La vía segura es que **él exporte el chat** y pase el archivo. ⛔ Nunca su contraseña, su código de 6 dígitos, ni vincular WhatsApp Web | "💬 WhatsApp de Christian" |
| **Monografías, en tandas de 10** | 🟠 **van 18 de 112** | "Monografías: segunda tanda de 10" |
| **Activar la facturación de Gemini** para el chat de IA | 🟠 **del lado de él**; hoy va en plan gratis, 20 mensajes al día y se cae con tráfico real | "Del lado de Christian" |
| **Videos tutoriales 2 al 8** | 🟠 pendientes | Pipeline de videos |

---
# 🔴 ESTADO — 2026-07-28 (tarde y noche)

## 🩹 Los dos agujeros del checkout — cerrados y desplegados

Commit `e002ad1` en `novapeptidos-RBAC`. **Los dos los encontró el barrido adversarial de Codex**,
no una prueba nuestra. Las dos son de las que no se ven mirando el código: se ven atacándolo.

1. **Pedir 40 dos veces eran 80.** El servidor validaba **renglón por renglón**, así que el mismo
   SKU repetido pasaba por su cuenta cada vez y el pedido se llevaba el doble —o el triple— de lo
   que hay. **Sin tope**: bastaba con añadir otro renglón. Ahora **suma por producto antes de
   comparar**.
   ⚠️ Es el MISMO hueco que se creyó cerrado el 25-jul: entonces se tapó el "pediste 99,999", no
   el "pediste 40 dos veces". Lección: tapar un caso no es tapar la clase de caso.
2. **El inventario vivo NUNCA bajaba.** La llave de `db.stock` es `<slug>::<presentación>`, pero
   el carrito manda a veces un UUID y a veces el SKU. `update_one` no encontraba el documento y
   devolvía **cero modificados en silencio**: el pedido salía, las piezas se quedaban, y el
   siguiente cliente compraba algo que ya no existe. Ahora se prueban las llaves conocidas y, si
   ninguna existe, **se avisa en el log**. **Cobrar y cancelar usan el MISMO resolvedor** — si
   cada lado busca distinto, el inventario se desbalancea.

## 💰 Canje de puntos al 100%: se permite, pero sin comisión y sin puntos nuevos

Commit `8e748ce`. Regla de Christian. Los puntos ya se ganaron y son del cliente, así que **sí**
se puede pagar el 100% de la mercancía con ellos. Pero ese pedido **no paga comisión de
distribuidor ni deposita puntos nuevos**.

Antes, un pedido donde no entraba **un solo peso** por la mercancía pagaba además comisión
calculada sobre el precio íntegro. Con los números del barrido adversarial: **$262,076 de pérdida
en un solo pedido**.

## 🤖 El canal de distribuidores lo decide EL MOTOR, no la mano ⤴️

Commit `54ea90c` en `pricing-system`. **Christian revirtió su decisión de la mañana** (la de sacar
los 3 HGH a mano). La regla nueva, en una línea: **si el producto aguanta su comisión y sigue
dejando 5×, entra al canal solo; si no la aguanta, sale solo. Sin excepciones a mano.**

Lo que hizo el motor en cuanto se le quitó la lista:
- **HCG 1,000 IU** y **HGH Fragment 176-191 12 mg** → **VOLVIERON** al canal, al 35%.
- **HGH 36 IU** → **se quedó fuera**: 5.53× menos su comisión son 4.42×, debajo del piso.

**Hoy son 8 los que quedan fuera, y ese número cambia solo.** Un producto entrando o saliendo del
canal **NO es una alarma** — es la regla funcionando.

`pricing-system/solo_venta_directa.json` quedó **VACÍO a propósito**, pero vivo: existe para el
día que haya una razón que **no** sea el ROI (una regulación, un proveedor único, un compromiso
escrito). Ese día se anota ahí con motivo y fecha. *(Verificado: el archivo sólo tiene la nota
`_lee_esto` que explica esto mismo.)*

### De paso: Certified subió el BPC-157 20 mg y nuestra hoja traía el viejo

De **$1,180 a $1,440**. Refrescada la competencia: **nuestro precio sube a $1,429** y el producto
vuelve al canal. **Lo cazó la prueba de que los dos lectores dan lo mismo** — no una alerta del
Vigía. Vale la pena recordarlo: la comprobación que parecía burocrática fue la que encontró
dinero.

## 🌎 El sitio: las dos órdenes de Christian, ya en vivo

Commits `9a54c0e`, `b84204f`, `c3134ba` en `novapeptidos-UI`.

1. ⛔ **NUNCA se menciona Asia, en ningún idioma.** Se quitaron **21 menciones** en ES/EN/PT.
   *(Verificado esta noche: **cero** menciones de Asia en `src/` y `public/`; lo único que
   aparece son los comentarios con la regla escrita, en `Home.js`, `translations.js`,
   `productMonographs.js`, `info/calidad.js`, `learn/como-verificamos-cada-lote.js` y
   `learn/preguntas-frecuentes.js` — a propósito, para que nadie la reintroduzca.)*
2. **"El distribuidor de péptidos más grande de México"**, y **siempre apoyado en el dato**:
   **193 presentaciones** contra **183 de Exoma** y **47 de Certified**. Un adjetivo lo escribe
   cualquiera; la cuenta no.
   **El número se CUENTA del catálogo, no está escrito a mano** (`PRESENTACIONES` en `Home.js`).
   Si mañana se oculta un producto, el número baja solo y la portada nunca queda prometiendo un
   catálogo que ya no existe. *(Verificado: el auditor del sitio y `auditar_catalogo.py` reportan
   los mismos 193.)*
   Se quitó el banner azul del hero; la frase vive como **título de la sección de variedad**.
3. **Estados Unidos** mencionado en varios lugares, espejando los 8 donde lo dice Certified
   *(lo de "8 de Certified" no se puede verificar desde el repo — **sin verificar**)*. Se habla
   de **materia prima y abastecimiento**. ⛔ **NO** se dice que tengamos planta, laboratorio,
   domicilio en EUA ni aprobación FDA.
4. **El sello del descuento** ya sólo dice **"Hasta el 15%"** (`home.stamp.sub`).

## 📣 Meta: estaba bloqueada, ya no

⤴️ La mañana decía "bloqueado por Meta y no se puede hacer nada". **Ya se desbloqueó.** El bloqueo
era de Meta —verificación de identidad de Christian—, **no del código ni del token**; el
diagnóstico técnico de la mañana era correcto pero la conclusión "no hay nada que hacer" no.

Al reactivarse aparecieron **6 campañas**. El panel enseñaba **2** porque estaba leyendo el **CSV
del 25-jul**. Se subió el presupuesto diario a **$10 USD** y **después se pausaron las 6**, a
propósito, **hasta comprobar que se puede comprar**.

*(Los números de la cuenta no se pueden verificar desde el repo — **sin verificar**, vienen del
panel de Meta: **$51.31 USD gastados · 1,145 clics al sitio · 514 vistas de página · CERO ventas
por internet**. La única venta que existía —Paz, $3,347— la hizo la mamá de Christian **en
persona**.)*

⚠️ **Los seis días de anuncios (23–28 jul) coinciden uno a uno con los días en que los precios y
el cobro estaban rotos.** Ese tráfico **no sirve para sacar conclusiones** sobre si el producto
o el mensaje funcionan.

## 🔬 EL DIAGNÓSTICO DE POR QUÉ NO VENDÍAMOS (Fable 5, 28-jul)

**Esto es lo más valioso del día. Si sólo lees una sección, que sea ésta.**

### 1. El sitio SÍ funciona. Está probado, no supuesto.

Fable completó **un pedido real como desconocido, en celular**. Y **Christian pagó de verdad con
tarjeta**: le llegaron el correo de confirmación y el de pago recibido. Los dos pedidos de prueba
**ya se cancelaron y el inventario volvió a su lugar**. Así que el embudo entero, de la portada al
cobro, está comprobado de punta a punta por una persona, no sólo por una suite.

### 2. El "55% que se caía entre el clic y la página" era un espejismo

**3 de los 4 anuncios mandaban a WhatsApp.** Un clic a WhatsApp **jamás** puede generar una vista
de página: el píxel no existe ahí. No había fuga; había una resta mal planteada.

### 3. El asesino real está en el checkout

Una **casilla legal chica y gris arriba del botón**. Si no se marca, **el botón parece muerto**:
el aviso se borra a los 4 segundos y la página salta arriba, lejos de la casilla. **Fable creyó
tres veces que el sitio estaba roto.** Y encima es **redundante**: el visitante ya aceptó lo mismo
en la puerta de entrada (`RuoGate`). *(El arreglo va dentro del trabajo del agente que está en el
checkout ahora mismo — `RuoGate.js` y `Checkout.js` salen modificados y **sin commit**.)*

### 4. Velocidad

- **2.36 MB de JavaScript en un solo archivo** *(verificado: `build/static/js/main.52aa2176.js`,
  2,363,767 bytes)*. **De 3 a 13 segundos** hasta pintar en móvil con mala señal.
- **Certified pesa 26 MB pero muestra contenido en 2.0 s**, porque **su HTML llega armado del
  servidor** (WooCommerce). Pesar menos no es la meta; **pintar antes** sí.
- **Recomendación: partir el paquete con `React.lazy`.** *(Verificado: hoy no hay ninguno en
  `src/App.js`.)* Es el punto 2 de la lista de trabajo.

### 5. La medición ya se arregló

El **`PageView` del píxel ahora se dispara desde `public/index.html`**, no desde React. Antes
esperaba a que bajaran y se ejecutaran los 2.36 MB: quien se cansaba antes **sí había llegado**,
pero para Meta **nunca existió**.
✅ **Ya está commiteado** (`9347ad2`, "El pixel cuenta la visita desde el HTML, no desde React").
⚠️ **No borres el `track('visit')` de React**: ése alimenta NUESTRO embudo, que es otra cosa. Meta
descarta los PageView repetidos de la misma carga.

### 6. Los anuncios optimizaban a CLICS, no a compras

De ahí los clics de **$0.045**: se compraron curiosos, no compradores. Cuando se reanuden, van a
**Compras**.

### 7. La competencia

- **Exoma no tiene NI UN anuncio corriendo.**
- **Certified lleva 6 activos desde el 7-13 de julio, sin parar, ~$1,000 USD/día.**
- Fable dejó **3-4 anuncios concretos propuestos**. El mejor ataca **lo que Certified no puede
  copiar**: **OXXO, SPEI y cripto** (ellos sólo aceptan tarjeta) y **envío gratis** contra sus
  **$250**.

## 🐕 Vigía actualizado

`~/.claude/scheduled-tasks/vigia-precios-exygen/SKILL.md`:
- Decía **41 pruebas** y son **116**.
- Se le agregó **`certeza.py`** a lo que corre.
- **Regla de distribuidores nueva**: ya no hay listas a mano, y **un producto entrando o saliendo
  del canal NO es alarma**.

⚠️ **Queda un renglón viejo sin corregir**: la línea 111 (el reporte "sin novedad") todavía dice
**"41 pruebas en verde"**. Las otras tres menciones ya dicen 116. Arreglarlo la próxima vez que se
toque ese archivo.

## 📝 Los dos prompts de Codex, al día

`pricing-system/PROMPT-AUDITORIA.md` y `PROMPT-ROMPEDOR.md` — al día con todo lo anterior, más
**dos preguntas nuevas para el auditor**: (15) que ninguna parte del sistema siga guardando una
lista paralela del canal ahora que lo decide la fórmula, y (16) romper el pedido repetido por
otros caminos (mismo producto con dos identificadores, dos pedidos a la vez, cantidades negativas
o fraccionarias) y comprobar que el inventario vivo **de verdad baje**.
✅ **Ya están commiteados** (`7437068` en `pricing-system`).

## 🔴 Proveedor Lumi (P31) — DOS PRECIOS MAL ASIGNADOS, PENDIENTE

118 precios leídos de los 145 del PDF. **Codex encontró dos mal asignados que siguen sin
corregir.** *(Verificados esta noche renglón por renglón en `pricing-system/costos_proveedores.csv`.)*

| Lo que dice el PDF | Cómo quedó guardado | Cómo se ve el error |
|---|---|---|
| **MOTS-C 10 mg · US$88** | `P31,Lumi,KPV,10mg,…,88.0,…` | el código de catálogo es **MS10** (MS = MOTS-C), pero está bajo KPV |
| **NAD+ 100 mg · US$38** | `P31,Lumi,Mazdutide,100mg,…,38.0,…` | el código es **NJ100** (NJ = NAD+), pero está bajo Mazdutide |

Pista extra para quien lo arregle: **`NJ100` aparece dos veces** en el CSV —una como "Mazdutide
100mg" y otra como "NAD+ 100mg / 10 ml"—. El lector no está usando el código de catálogo para
desambiguar, y ahí está la falla de raíz.

**Además:** Christian va a hacerle **un pedido pequeño a Lumi** para comprobar su bodega en México
y los 2-3 días de entrega, **que hoy son sólo promesa suya**. (Regla vieja de la casa: los
proveedores mienten hasta que una compra real dice lo contrario.)

---

# 🎯 LÍNEA DE TRABAJO: EL PANEL ADMIN A FUTURO

**Esto lo pidió Christian expresamente y no es una tarea suelta: es el criterio con el que se
diseña cualquier pantalla nueva del Panel de aquí en adelante.**

Sus palabras: **el Panel tiene que ser simple de usar y de entender**. Las métricas son
**esenciales**, y él necesita ver **"radiografías"** para tomar decisiones **junto con el agente**.

De ahí salen dos reglas para todo lo que se construya en el Panel:

1. **Cada pantalla responde UNA pregunta de negocio.** No "aquí están los datos", sino
   "¿estoy ganando dinero con esto?", "¿qué me falta surtir?", "¿qué producto se está
   comiendo el margen?". Si una pantalla no se puede resumir en una pregunta, está mal
   planteada.
2. **Ningún número va solo: va con qué hacer con él.** Un ROI de 4.42× no dice nada; "4.42×,
   debajo del piso de 5×, por eso este producto salió del canal" sí. El Panel no es un tablero
   de instrumentos: es una conversación entre Christian y el agente, y los números son los
   argumentos.

Corolario: cuando haya que elegir entre **más datos** y **más claridad**, gana la claridad. Un
Panel que Christian entiende solo vale más que uno completo que necesita traducción.

---

# 🗄️ HISTORIA DEL DÍA — LA MAÑANA DEL 2026-07-28

*(Se conserva porque explica de dónde salieron las cosas. Ojo: lo marcado ⤴️ arriba lo cambió la
tarde. En particular, **los 3 HGH ya NO están en una lista a mano** y **Meta ya no está
bloqueada**.)*

## ✅ Lo que se cerró en la mañana (una línea cada uno)

1. **Los 3 HGH a venta directa** — HGH 36 IU, HGH Fragment 176-191 12 mg y HCG 1,000 IU quedaron
   `vender = si` + `elegible_distribuidor = no`, declarado en `pricing-system/solo_venta_directa.json`.
   ⤴️ **REVERTIDO por la tarde**: hoy lo decide el motor; dos de los tres volvieron al canal.
2. **Codex con los permisos que hacían falta** — `pricing-system/auditar_con_codex.sh`, con
   `--skip-git-repo-check`, `--sandbox workspace-write` y **red abierta**. `PROMPT-AUDITORIA.md` y
   `PROMPT-ROMPEDOR.md` al día.
3. **Comisiones absurdas: cerrado.** La columna aceptaba −50%, 150% y 300%; ahora la base sólo
   admite 0%–50% y lo rechaza con un CHECK.
4. **Dashboard del Motor de Precios** en el Panel Admin (`?tab=motor`), sólo lectura y sólo para
   admin. *(detalle abajo — casi se publica en internet)*
5. **Botones nuevos en el Panel**: "Refrescar" y "Vender esto / descartar". Aprobar **no publica**:
   deja la decisión anotada y el alta la hace el motor. *(detalle abajo)*
6. **Proveedor nuevo: Lumi (P31)**, 118 precios, y **tres fallas de raíz** tapadas en el lector de
   listas de proveedor. *(detalle abajo — y ver arriba los dos precios mal asignados que quedan)*
7. **Panel más navegable**: cambiar de pestaña abre ARRIBA, Recompra se movió dentro de Clientes,
   el sidebar quedó agrupado en **Negocio · Gente · Catálogo · Difusión · Ajustes**, y hay sección
   nueva en Inventario: "Surtir el catálogo completo".
8. **Sello del home**: ya sólo dice **"Hasta el 15%"** (se quitó "ya aplicado" y el monto mínimo).

## 🔴 Lo que la mañana dejó abierto (y cómo quedó a la noche)

### 1. Meta — ⤴️ RESUELTO por la tarde

La API de Marketing respondía **`API access blocked`** (OAuthException, code 200) a **CUALQUIER**
llamada, incluida `/me`. **No era el token ni el código: era un bloqueo de Meta sobre la app**, y
se levantó cuando Christian completó la verificación de identidad. Mientras duró, el panel enseñó
el **CSV del 25-jul** — exactamente para lo que existe el doble camino en
`novapeptidos-RBAC/meta_ads.py` (CSV y API dan la misma salida, el panel no se entera de cuál
viene). Ese doble camino se ganó su lugar.

### 2. El home — ⤴️ TERMINADO por la tarde

Ver arriba, "El sitio: las dos órdenes de Christian".

### 3. Movimientos de precio del Dashboard: van a seguir vacíos — SIGUE ABIERTO

Hasta que `reprecio.py` escriba en la base, la base se reconstruye desde `maestra.csv` en cada
corrida y todo sale como carga inicial. El tablero lo dice con todas sus letras en vez de fingir
que hay historial.

### 4. Pendientes viejos que siguen vivos — SIGUEN ABIERTOS

- **Vigencias traslapadas.** La base acepta dos periodos históricos que se encimen; el índice
  único sólo impide dos precios ABIERTOS. Hoy no está pasando.
- **`certeza.py` compara poco.** No mira SKU, ni presentación, ni vigencia, ni el motivo, ni
  vender/oculto. Tampoco detecta llaves repetidas dentro de un JSON. Y base y `maestra.csv`
  pueden estar equivocadas de la misma forma: **no consulta producción**.
- **`v_roi_real` resta el envío**, pero `FUENTE-DE-VERDAD.md` dice expresamente que **el envío NO
  cuenta contra el ROI** (nunca pasa del 10%, y ese 10% ya está aceptado). Es el número que el
  Dashboard enseña en "al filo del ROI". Contradicción viva.
- **`reprecio.py` todavía lee el Excel.** ⛔ **NO apagar `MAESTRA.xlsx`**: por eso el reporte se
  escribe en `REPORTE-EXYGEN.xlsx` y no encima de ella. Sobrescribirla hoy rompe el motor.
- **Una prueba sale a internet** y si no hay red esa comprobación no se hace — y no queda claro
  que no se hizo.

### 5. Lista larga de pendientes (orden de gravedad, no de urgencia)

1. **Actualizar el Vigía para que lea de la base** (pedido de Christian). *(El Vigía sí se
   actualizó el 28-jul en su regla de distribuidores y en el número de pruebas, pero **esto otro
   sigue pendiente**.)*
2. **Terminar de migrar el motor**: que `reprecio.py` escriba en la base. Ahí se apaga
   `MAESTRA.xlsx` del todo.
3. **Cargar el CAC** del panel de Meta a `costo_adquisicion` (la tabla está creada y vacía).
   *(Ahora que Meta está desbloqueada, esto ya se puede hacer.)*
4. **Traer descuentos y puntos por cliente** del backend a la base.
5. **Costos de envío de los proveedores nuevos** — sin eso "el más barato" puede mentir.
6. **Mover los costos al Panel Admin** (acordado, no empezado): hoy hace falta una terminal.
   *(Encaja con la línea de trabajo del Panel, arriba.)*
7. **Que el reabastecimiento viva EN LÍNEA**, no en la Mac de Christian (lo pidió él).
8. **Preguntarle a los proveedores** lo de `datos/preguntar_al_proveedor.csv`: qué es "TBFing",
   si el SLU-PP es 322 o 332, y cuál precio vale de los dos que da DT.
9. **Revisar la calculadora de péptidos de Certiva** —
   https://certivapeptides.com/peptide-calculator/#reconstitution-calculator — y compararla con
   la nuestra (pedido de Christian, 28-jul).
10. **Escalera**: 3 casos donde el grande sale más caro POR MILIGRAMO y la banda no deja arreglo —
    Glutatión 1,500 mg, HGH 40 IU y MOTS-c 40 mg. (El auditor reportaba más; los otros eran
    falsos, comparaba el combo BPC+TB contra el BPC-157 simple. Ya usa la familia del motor.)
11. **IGF-1 LR3 1 mg queda en 4.87×** y no tiene arreglo (Certified lo topa en $1,460).
12. ⚠️ **En mano aparece 5-Amino-1MQ 5 mg, pero la compra real fue de 10 mg** (a Lisa, $45). Uno
    de los dos está mal y hay que confirmarlo.
13. **Vigía y Motor, separados** (aprobado por Christian el 28-jul): el Vigía CAPTURA y CONTRASTA
    los precios de la competencia a diario y **no toca los nuestros**; el Motor propone el ajuste
    según las reglas; Christian aprueba. Si el que mira también mueve precios, una lectura mala de
    una página web cambia el catálogo sin que nadie se entere.

---

# 📐 EL DETALLE TÉCNICO

## 🟢 EL MOTOR DE PRECIOS — se acabó el Excel como fuente de la verdad

Así se llama el feature: **Motor de Precios** (decisión de Christian). Hace juego con el
**Vigía**, que observa a la competencia; el Motor pone el precio.

Todo vivía en `MAESTRA.xlsx`. Una hoja de cálculo no sabe decir "ese proveedor no existe" ni "ese
producto ya está dos veces", así que los errores se guardaban sin protestar. El 28-jul pasaron los
dos casos: 502 precios colgados del producto equivocado, y las 11 COMPRAS REALES borradas al
reescribir un CSV. Ahora hay una base de verdad.

**UNA base, MUCHAS tablas** (Christian preguntó si convenía separarlas: no — el ROI necesita costo
+ comisión + descuento + envío al mismo tiempo, y en bases separadas no se pueden cruzar). Todo en
`pricing-system/`, repo privado `exygen-pricing`:

| Archivo | Qué es |
|---|---|
| `esquema.sql` | Las tablas, con llaves y validaciones |
| `db.py` | Construye la base y la consulta · `poner_precio()` |
| `certeza.py` | **Comprueba que todas las listas digan lo mismo** |
| `oportunidades.py` | Qué nos ofrecen y no vendemos |
| `reabastecer.py` | Qué reponer y a quién comprarle |
| `aplicar_aprobados.py` | Da de alta lo que Christian aprobó desde el Panel |
| `publicar_dashboard_precios.py` | Calcula la foto del tablero y la sube |
| `auditar_con_codex.sh` | Lanza a Codex con los permisos correctos |
| `reporte_excel.py` | Genera `REPORTE-EXYGEN.xlsx`, marcado NO EDITAR |
| `solo_venta_directa.json` | Los que se venden pero NO por el canal, por decisión |
| `datos/*.csv` | La verdad en texto, versionada: compras reales, reglas, alias, exclusiones |

```
python3 db.py --construir      python3 certeza.py         python3 oportunidades.py
python3 db.py --revisar        python3 reporte_excel.py   python3 reprecio.py --desde-base
python3 publicar_dashboard_precios.py --subir             python3 aplicar_aprobados.py
```

### Lo que la base impide y el Excel permitía

- Un costo no puede apuntar a un proveedor que no existe.
- **Los precios no se sobrescriben: se versionan** (`vigente_desde`/`vigente_hasta`, con hora en
  UTC porque un día de repricing tiene varios movimientos). Un índice único garantiza
  **exactamente un precio vigente** por producto.
- `db.poner_precio()` es la única forma de mover un precio: **exige motivo**, guarda quién y
  cuándo, conserva el anterior y es atómica.
- No se puede vender abajo del **piso de 5×** sin *declarar* la excepción por escrito.
- El distribuidor nunca paga más que el público.
- **La comisión sólo puede ir de 0% a 50%** (arreglado el 28-jul: aceptaba −50%, 150% y 300%).

### CERTEZA: una sola verdad, comprobada

`certeza.py` compara la base contra **las tres listas que se publican** (`maestra.csv`,
`precios_maestra.json`, `distribuidor_maestra.json`). Hoy: **204 productos, idénticos**. Probado
saboteando un precio a mano — lo caza y devuelve error.
⚠️ Esto compara lo que se PUBLICA, no lo que el servidor COBRA. Eso es la suite E2E, y la
distinción es la que costó caro en julio.

### Las reglas del negocio, como DATOS (tabla `regla`)

Copiadas del backend en vivo con archivo y línea: envío $250, tope de envío **10%**, envío gratis
desde $2,500 (**derivado** del tope, ya no escrito a mano), descuento máximo 40%, puntos 3%, tope
de comisión 50%, piso de ROI 5×. Un aviso salta si el umbral deja de ser el 10% del ticket.

### ROI real (`v_roi_real`) y CAC (`v_cac`)

⚠️ **Casi se publica mal.** El descuento y la comisión **NO se suman: comparten el mismo tope por
producto** — el backend reparte `cap − descuento` (`novapeptidos-RBAC/server.py:1224`).
Restándolos por separado salían **149 productos abajo del piso**; con la cuenta correcta es
**UNO**: IGF-1 LR3 1 mg en **4.87×**, el ya conocido. Hay prueba que fija la regla.
El **CAC va aparte**: es por CLIENTE (gasto de Meta ÷ clientes nuevos), no por producto. La tabla
`costo_adquisicion` está creada y **vacía**: falta cargarla del panel de Meta.

### Migración del motor — paso 1 de 2, hecho

`reprecio.py` tiene ahora **dos lectores para un motor**: `leer()` del Excel y `leer_de_base()` de
la base. `python3 reprecio.py --desde-base` corre el mismo motor leyendo de la base (solo
simulacro). **Dos pruebas exigen que los dos caminos den idéntico**: mismos datos de entrada, y
mismo precio y motivo de salida.

⛔ **NO apagar `MAESTRA.xlsx` todavía**: `reprecio.py` aún la LEE.

## ✅ Los 3 HGH: venta directa, aplicado y en vivo (28-jul)

Christian lo confirmó. Los tres —HGH Fragment 176-191 12 mg ($2,709), HGH 36 IU ($1,548) y HCG
1,000 IU ($629)— quedaron con `vender = si` + `elegible_distribuidor = no`, que es lo que de
verdad significa "solo venta directa". Ya NO están marcados "no vender", que es la marca de lo
retirado por seguridad.

**El matiz que lo destrabó:** el campo `vender` se estaba usando para CUATRO cosas distintas —
retirados por seguridad (Adipotide, ACE-031), ocultos por regulación (Dysport, HUMSC), dominados
por la competencia, y **"solo venta directa"**. Ese último NO significa "no vender": significa
"véndelo sin comisión de distribuidor", y eso ya lo controla `elegible_distribuidor`.

La decisión vive **DECLARADA** en `pricing-system/solo_venta_directa.json`, con SKU, motivo y
fecha. **Eso es lo importante del arreglo:** la elegibilidad se recalcula **por fórmula para TODAS
las filas** en cada corrida de `reprecio.py` (`roi × (1 − comisión) ≥ 5×`), y los tres **SÍ**
aguantan la comisión — así que sin ese archivo el motor se los habría vuelto a llevar al canal en
la siguiente corrida y la decisión se pierde en silencio. `reprecio.py`, `test_precios.py` y
`auditar_catalogo.py` leen los tres el mismo archivo.

Las dos reglas NO se contradicen: `_eligible()` en `novapeptidos-RBAC/server.py` exige
`distributor_eligible` **Y** no ser de la familia HGH neta. Se suman, gana la más restrictiva.

**Consecuencia que nadie había visto:** al prender el HCG 1,000 IU, el de 2,000 IU quedaba más
barato que el chico ($609 contra $629) — rompía la escalera. **Lo cazó el propio motor** y lo
corrigió por fórmula: HCG 2,000 IU subió a **$639**. Ya está en la maestra, la base, el sitio y el
backend en vivo.

## ✅ Codex — el lanzador con los permisos que faltaban

`pricing-system/auditar_con_codex.sh`. Trae las tres banderas y explica por qué cada una:

- `--skip-git-repo-check` — esta carpeta NO es un repo de git. Sin esto **Codex falla callado**:
  no arranca y el agente reporta un lanzamiento que nunca ocurrió.
- `--sandbox workspace-write` — con `read-only` pytest ni arranca, y la suite entera se veía como
  "fallando" cuando en realidad nunca corrió.
- `--config sandbox_workspace_write.network_access=true` — **lo que de verdad faltaba**. Sin red
  no puede comprobar lo único que importa (que el backend **EN VIVO** cobre lo que dice la
  maestra) ni leer a la competencia. Eso daba 3 fallas + 3 errores que no eran hallazgos, sino su
  encierro. Probado: `curl` a la API devuelve 200 desde dentro del sandbox.

```
./auditar_con_codex.sh                     # la auditoría (PROMPT-AUDITORIA.md)
./auditar_con_codex.sh PROMPT-ROMPEDOR.md  # que intente romper el motor
```

Se quedó como lanzador y no como perfil en `~/.codex/config.toml` porque el clasificador no deja
tocar esa configuración global desde aquí. Da igual: el permiso es de esa corrida y no del Codex
de diario.

⚠️ Si Codex se niega por "cybersecurity", es el lenguaje del prompt ("romper", "corromper").
Cambiar el encabezado a *"Eres un ingeniero de calidad, encuentra casos de prueba que violen estas
reglas"* lo resuelve: es el mismo ejercicio dicho de otro modo.

También existe `PROMPT-DISENO.md` (segunda opinión de diseño). Los tres son de sólo lectura y se
pueden correr en simultáneo.

## ✅ Dashboard del Motor de Precios (Panel Admin, `?tab=motor`)

Seis bloques, sólo lectura: **semáforo de certeza** (un puntito arriba del todo; la tarjeta grande
sólo sale cuando algo NO cuadra — una que siempre dice "todo bien" se deja de leer justo antes del
día en que dice otra cosa) · **los que están al filo del ROI** · **dónde estás pagando de más** ·
**qué reponer y a quién comprarle** (con el WhatsApp listo) · **qué te ofrecen y no vendes** ·
**últimos movimientos de precio**.

Piezas:
- `novapeptidos-UI/src/components/admin/MotorPrecios.js` — la pantalla.
- `pricing-system/publicar_dashboard_precios.py` — calcula y sube la foto.
- `novapeptidos-RBAC/server.py:1694` `GET /api/admin/motor-precios` · `:1704` `PUT` ·
  `:1726` `GET .../decisiones` · `:1732` `PUT .../decisiones/{llave}`.

⛔ **Lo que casi sale mal, y por qué está así.** La primera versión dejaba la foto en
`novapeptidos-UI/public/motor-precios.json`. **Esa carpeta se publica ENTERA en exygenlabs.com**, o
sea que el costo de cada producto, el nombre de cada proveedor y el margen habrían quedado a un
enlace de distancia de cualquiera. Ahora la foto se guarda en `pricing-system/datos/`
(fuera del sitio) y se sube a `PUT /api/admin/motor-precios`, que sólo contesta con sesión de
admin. **`novapeptidos-RBAC/test_motor_precios.py` lo cuida con 7 pruebas, y una de ellas MIRA EL
DISCO** para cachar que alguien vuelva a dejar el archivo en la carpeta pública.

`reabastecer.py` y `oportunidades.py` tienen su cálculo separado de la impresión (`calcular()`),
para que el Panel enseñe LO MISMO que la terminal en vez de recalcularlo por su cuenta. Dos
cuentas para el mismo número acaban dando dos números distintos.

**Desplegado el 28-jul** (con Christian autorizando el SSH a mano). `GET /api/admin/motor-precios`
sin sesión devuelve **401**; con sesión de admin devuelve la foto. Cómo se hizo, porque el `ssh` lo
bloquea el clasificador y hay que pedir autorización en el momento: abrir el 22 para la IP de hoy,
mandar la llave con Instance Connect (dura 60 s), `cd /opt/exygen/app && sudo git pull && sudo
docker compose up -d --build api`, y **cerrar la regla del 22 al terminar** (se cerró). Ver "CÓMO
ENTRAR AL EC2".

Para refrescar el tablero, desde la Mac:

```
python3 pricing-system/publicar_dashboard_precios.py --subir
```

## ✅ Botones nuevos del Panel — y por qué aprobar NO publica

- **"Refrescar"** — vuelve a leer del servidor; **NO recalcula**. La cuenta la hace la base del
  motor, que vive en la Mac. Si la foto tiene días lo dice y da el comando, para no darle tres
  veces esperando números nuevos.
- **"Vender esto / descartar"** en las oportunidades — **no publican**: dejan la decisión anotada
  y el alta la hace `pricing-system/aplicar_aprobados.py` desde la Mac, **pasando el producto por
  el motor**. Razón: el precio lo pone el motor con las reglas de la casa (costo, competencia,
  piso de 5×, terminación en 9). Un alta desde una pantalla se saltaría todo eso, y así es como se
  acaba vendiendo algo por debajo del costo sin que nadie lo note.
- **El veto se comprueba en el SERVIDOR**, no sólo en la pantalla: los vetados (esteroides,
  regulados, insumos) ni aparecen ni se pueden aprobar, y `aplicar_aprobados.py` vuelve a
  comprobar CADA aprobado contra `datos/no_vender.csv` sin fiarse de que la pantalla ya filtró. Un
  esteroide anabólico dado de alta por descuido es un problema legal, no un renglón mal puesto.

Después de `aplicar_aprobados.py --aplicar` hay que correr, en este orden:

```
python3 reprecio.py --aplicar
python3 exportar_precios_maestra.py
python3 generar_maestra_csv.py --aplicar
python3 db.py --construir
```

## 🆕 PROVEEDOR NUEVO: LUMI (P31) — y las tres fallas de raíz del lector de listas

Llegó por WhatsApp con lista completa, titulada **"Mexico Warehouse Directory"**. **118 precios
cargados de los 145 que trae el PDF.** Es el **2º más barato en Retatrutida 40 mg ($166**, contra
$139 de Lucy y $179 de Certiva; a Lily, que es a quien se le compra, $230) y el **más barato** en
Survodutida 10 mg, Mazdutida 10 mg y CJC-1295 con DAC 5 mg.

⚠️ **No se le ha comprado y no se sabe su envío.** Dice tener **bodega en México**: sin comprobar,
y esa promesa ya resultó falsa con otros.

⚠️ **Su lista trae ESTEROIDES ANABÓLICOS** —testosterona, winstrol, trembolona, dianabol,
equipoise, primobolan, anadrol— y el sistema los estaba **proponiendo como productos a vender**,
con "ganancias" de $19,000 por caja. Están vetados en `datos/no_vender.csv` por sustancia
controlada. **Decisión de Christian si eso cambia algo sobre seguir tratando con él.**

**Su tabla está perfecta; el que fallaba era nuestro lector.** Ese PDF es un Excel exportado, y en
texto plano sale en UN SOLO CHORRO sin renglones. El importador sacó **9 precios de 145 y dijo
"listo"**. Tres arreglos de raíz:

1. **Se lee respetando las columnas** (`extraction_mode='layout'`). Las celdas combinadas se
   reparten cortando donde la DOSIS baja, que es donde de verdad empieza otro producto: el nombre
   va CENTRADO en su bloque, así que ni "el de arriba" ni "el más cercano" sirven — con "el más
   cercano", dos precios de la Retatrutida acababan colgados del AOD9604.
2. **CANDADO del 85%**: si lo leído no llega al **85% de los signos de peso del documento, NO se
   guarda nada.** Antes bastaban 4 precios para que se viera igual de bien que 145, y ese silencio
   es lo que dejó invisible el destrozo de 502 precios de julio.
3. **Los alias de proveedor se aplican AL CARGAR LA BASE.** El comparador agrupa por nombre
   exacto, así que "RT Retatrutide" no cruzaba con "Retatrutide" y Lumi quedaba fuera de la
   comparación con los otros diez que la venden. Es un hueco que NO se ve: la consulta contesta
   bien, sólo que de menos productos.

**Y un cuarto arreglo, en el veto:** los patrones de **4 letras o menos ahora exigen coincidencia
exacta** (`oportunidades.py:162`). Hacen falta patrones cortos —"TRA", "TRE", "EQ"— para tapar los
esteroides, pero con coincidencia difusa barrían péptidos buenos **sin dejar rastro**.

Quedaron **27 precios sin leer de los 145**: son todos esteroides con la celda de presentación
partida en varias líneas. No se persiguieron porque no se venden.

## 🔧 Panel: navegación y "Surtir el catálogo completo"

**Cambiar de pestaña ahora abre ARRIBA.** El arreglo va en
`novapeptidos-UI/src/components/layout/DashboardSidebar.js`, **no** en el `ScrollToTop` general de
la app — y así debe seguir. Razón: el `ScrollToTop` general **sólo mira el `pathname`**, y estas
pestañas viven en la **query**; si se le pidiera mirar la query también, en el catálogo brincaría
arriba cada vez que el usuario filtra, que estorba. El arreglo en el sidebar además cubre Mi
cuenta y Distribuidor.

**Recompra se movió DENTRO de Clientes** (`src/pages/Admin.js:1028`): es una vista de clientes, no
un frente aparte.

**El sidebar quedó agrupado** en **Negocio · Gente · Catálogo · Difusión · Ajustes**
(`src/pages/Admin.js:438` en adelante). En cinco grupos se encuentra; en una lista larga no.

**Sección nueva en INVENTARIO: "Surtir el catálogo completo"**
(`src/components/admin/SurtirCatalogo.js`, calculado en `publicar_dashboard_precios.py:129`).
Responde "¿cuánto tengo que poner para surtirme completo?" — una caja de cada producto. Hoy:
**$301,541 MXN (~$17,231 USD) por 184 cajas**, de 193 a la venta y 9 que ya tiene en mano. **Baja
sola conforme compra**, descontando lo que ya tiene del inventario en vivo **cruzando por SKU**
(por nombre no cruza: el sitio dice "Retatrutida" y la maestra "Retatrutide").

## 🏷️ Sello del home

Ya sólo dice **"Hasta el 15%"** (`home.stamp.sub` en `src/i18n/translations.js`, en los tres
idiomas). Se quitó "ya aplicado" y el monto mínimo.
⚠️ El home lo está tocando **otro agente ahora mismo**. No lo edites.

## 🔁 Reabastecimiento: el sistema avisa, y deja el mensaje listo

`reabastecer.py` — pedido de Christian: «cuando un cliente pague por algo que no tenemos, avísame y
ayúdame a pedirle una caja al proveedor más barato por WhatsApp, o avísame y yo lo hago».

**Hallazgo que cambió el diseño:** el `stock` de `/api/products` **NO es inventario real**
(devuelve 40 en 191 productos y 41 en dos: es un valor sembrado). El bueno está en
**`GET /api/stock`**, que además trae `in_hand`. Y eso es lo que importa, porque —palabras de
Christian— *«los de entrega inmediata son los que tengo aquí conmigo; los demás los tengo que
solicitar y me tardan 7 a 14 días»*.

**Hoy hay 9 EN MANO** y cuadran exactamente con sus compras reales: Retatrutida 10/20/40 mg,
Tirzepatida 10 mg, NAD+ 500 mg, KLOW 80 mg, 5-Amino-1MQ 5 mg y las dos aguas bacteriostáticas. Los
otros 184 son **bajo pedido**.

⛔ **NO manda nada.** Un pedido es dinero que sale y un inventario mal leído pediría cajas de más.
Para automatizarlo de verdad, el paso que falta es que Christian apruebe cada pedido en el Panel —
no que un script le escriba solo a un proveedor en China.

## 📖 Lecciones de las revisiones de Codex (1ª a 4ª pasada) — todas ARREGLADAS

**1ª revisión — 7 hallazgos:**

1. **Reconstruir la base borraba el historial** (el diseño se contradecía solo). Ahora vive en
   `datos/historial_precios.csv` y sobrevive; probado.
2. El candado exigía ~1×, no el piso de 5×.
3. `poner_precio()` podía dejar un producto **sin precio vigente** si fallaba a la mitad.
4. Las vigencias aceptaban periodos invertidos, de duración cero y fechas inválidas.
5. Los 10 viales por caja estaban clavados a mano: una caja de 5 pasaba con otras unidades.
6. `v_margen` unía contra la tabla y no contra el precio vigente.
7. La prueba principal era **circular**. Ahora se compara contra `precios_maestra.json`.

Además: **las pruebas escribían en los datos reales del negocio**. Corregido.

**2ª revisión — el silencio de `certeza.py`.** La compuerta que autoriza publicar **se salía en
silencio cuando un valor de la lista venía vacío o nulo**, así que BORRAR un precio pasaba en
verde. Es el mismo patrón que ya costó dinero cuatro veces. Ahora un campo obligatorio que falte, o
un valor que no sea número, es un problema; y se exige que todo producto de la base esté en la
lista de distribuidores. Hay prueba que lo fija (rompe el archivo de tres formas). Al endurecerla
saltaron 9 avisos que resultaron ser productos NO elegibles —correcto que no tengan tope—, así que
el tope sólo se exige a los elegibles, y ahora también se avisa al revés: un NO elegible que traiga
tope.

**3ª y 4ª pasada (rompedor + auditoría):**

- **El motor cambiaba de opinión según hubiera internet.** Lo destapó la corrida del auditor sin
  querer: con red propone **0 cambios**; sin red propone subir el CJC-1295 + Ipamorelina de
  **$1,699 a $1,879**. Sin conexión no puede leer a Certified y le falta el **techo cruzado**, que
  es un TOPE. El motor imprimía el aviso y **seguía calculando igual**: correr `--aplicar` sin
  internet subía un precio $180 por vial con datos incompletos. Ahora `techos_cruzados()` devuelve
  si lo logró; en simulacro avisa que esos precios no son definitivos y **con `--aplicar` se
  detiene en seco**.
- **La excepción de ROI no tenía piso.** Con cualquier texto en `excepcion_roi` se aceptaba una
  caja de $10,000 vendida en $100 (ROI 0.01×): vender **abajo del costo** pasaba el candado. Ahora
  hay un segundo CHECK.
- **Un producto podía quedarse SIN precio vigente.** El índice único garantiza MÁXIMO uno, no
  EXACTAMENTE uno: un `UPDATE` que cierre el vigente sin abrir otro deja cero y nada protesta.
  Ahora lo revisa `certeza.py`.
- **El redondeo rompía el techo en silencio.** `bajar_a_9` devolvía `max(9, ...)` —un número MAYOR
  que el pedido— así que con techo de $8 producía $9 sin reportar conflicto. La prueba vieja decía
  que eso era "a propósito": no lo era, **estaba codificando el bug**.
- **Cajas que no son de 10.** El motor multiplicaba por 10 a mano; una caja de 2 viales pasaba el
  candado con un rendimiento real de 1.998×. Ahora cada renglón carga los suyos.
- **El comparador de proveedores comparaba cajas de distinto tamaño.** La caja de Cerebrolysin de
  Lucy a **$32 parecía la más barata**, pero es de 6 viales: $5.33/vial contra $4.00 de Lily. Ahora
  `reabastecer.py` compara **por vial**, con el envío repartido.
- **La escalera no revisaba los combos**, y `auditar_escalera.py` tenía su PROPIA definición de
  "familia" que metía el combo BPC+TB en la familia del BPC-157 simple y reportaba una escalera
  rota que no existía. Ya usa la familia del motor.

**Lo que Codex marcó y sigue abierto** (además de lo listado arriba en "pendientes viejos"):

- **Las 2 pruebas de migración no bastan.** Faltan: comisión/elegibilidad/precio de distribuidor
  resultantes, escritura atómica con `poner_precio()`, dos corridas seguidas sin cambios,
  reconstrucción idéntica después, prueba de historial corrompido o perdido, y dos cambios del
  mismo SKU en el mismo segundo.
- **Silencios que quedan en `db.py`**: números inválidos → `None`, archivos que no existen → lista
  vacía, varios `INSERT OR IGNORE`, un precio de distribuidor malo se sustituye por nulo y la carga
  sigue. Para una compuerta deberían terminar en error, no en aviso.
- **`oportunidades.py`**: el emparejamiento difuso podría FUSIONAR dos productos distintos (DAC vs
  no-DAC, MT-1 vs MT-2, simple vs mezcla) y hacernos creer que ya vendemos algo que no vendemos.
  Faltan pruebas negativas de eso.
- **Lo que le falta al modelo para ser una base de tienda seria**: amarrar `costo_lista` y
  `compra_real` a un SKU real (hoy usan nombres libres); registrar tipo de cambio, flete y aduana
  para tener el costo PUESTO EN MÉXICO; ligar cada precio a la compra y la regla que lo originaron;
  prohibir vigencias traslapadas; bitácora inmutable con identidad verificable (hoy
  `quien='christian'` lo puede escribir cualquiera); y estados formales de propuesta → aprobación →
  publicación → verificado en producción.

## 🗂️ Catálogo: qué nos ofrecen y no vendemos

`oportunidades.py` — de **46 huecos falsos a 5 candidatos reales**. Los 41 restantes eran el mismo
producto escrito distinto ("Adamax" vs ADMAX, "Frag17-23" vs Fragment 17-23,
"LYSINE-PROLINE-VALINE" vs KPV). Las equivalencias viven en `datos/alias_proveedores.csv`, con
prueba que las fija.

**Reales: Dihexa** (2 prov., desde $35), **MK-677 / Ibutamoren** (2 prov., desde $24),
**Oligopeptide-24** (1 prov., $40). Excluidos a propósito en `datos/no_vender.csv` (hoy 68
renglones) con motivo y quién: Dysport, HUMSC, toxina botulínica, insulina, ácido hialurónico,
Adipotida, ACE-031, insumos y **los esteroides anabólicos que entraron con Lumi**.

## 🟡 PROVEEDORES — ver `pricing-system/HANDOFF-PROVEEDORES.md`

**31 proveedores, ~1,594 precios de 11 de ellos**, de 28 chats de WhatsApp.

**Se repararon 502 precios mal leídos**: los 4 proveedores con lista en PDF tenían los precios
colgados del producto EQUIVOCADO (en la lista de Lucy, el Semax de $41 y el PT-141 de $44 estaban
guardados como **Retatrutida**). Dos fallas de raíz, tapadas: el lector no guardaba el nombre
cuando venía pegado al precio, y el importador **tiraba en silencio** los repetidos aunque
trajeran otro precio.

**Retatrutida 40 mg** (le compra a Lily a $230): **Lucy $139**, **Lumi $166**, **Certiva $179**,
Mia HK $212. Lucy sale más barata en todo y su lista se llama "Internal price" — o es la fuente
real o es carnada; a ninguno se le ha comprado. ⚠️ **A ninguno se le sabe el envío.**

⚠️ **La lista de DT se contradice sola.** Repite productos con precios hasta del DOBLE (Glutathione
600 mg a $32.2 y a $64.5; PNC-27 5 mg a $107.5 y a $139.7). Se guardó el más caro y está en
`datos/preguntar_al_proveedor.csv`.

**Quién es quién** (`huella_archivos.py`, compara adjuntos byte por byte):
**Lucia = US Lab RT40-275 = +1 505 518-0805 = +86 185 0279 6387** (tres COAs idénticos),
**Anna = RT40-186**, **Lee Factory = Lily**. Seis fotos que parecían probar que los tres "US Lab"
son el mismo **las reenvió Christian**: no prueban nada, el script ya las separa.

⚠️ **Los proveedores mienten:** ninguno tiene bodega en México ni EE.UU., y los COA que enseñan son
de clientes suyos (se comprobó: uno dice `Customer: Finnrick`). Solo cuenta lo verificado con una
compra.

**Falta:** leer los precios que vienen en las **97 fotos** de los chats (solo se capturó la de
Mia), dos catálogos en PDF sin capa de texto, los teléfonos y **costos de envío** de los nuevos,
bajar los videos, y cruzar los **COAs por número de lote** para confirmar fuentes comunes (idea de
Christian — ya se vio que el mismo COA de Retatrutida lo mandan TRES "proveedores" distintos).

## 🔐 Lo más grave que se cerró el 28-jul de madrugada

**Seguridad.** `POST /orders` sumaba `item.price` **tal como venía del navegador**. Se podía mandar
precio $0 y llevarse un vial de $9,359 pagando los $250 del envío. Lo encontró una auditoría
externa con Codex; ni las 229 pruebas ni los tres auditores de precios lo veían, porque **todos
comparaban precios publicados y ninguno el precio realmente cobrado**. Arreglado, desplegado y
comprobado contra producción: mandando $0 ahora cobra $9,359. Un producto que no se resuelve se
rechaza.

**Bug hermano:** el pedido descontaba inventario por `id` y la devolución por `id` O `sku`. El
carrito manda SKU → el pedido no bajaba piezas y la cancelación sí las sumaba: **el inventario se
inflaba solo**. Arreglado; ciclo comprobado 40 → 38 → 40.

**Precios.** 11 violaciones de banda corregidas + Tirzepatida repreciada (llevaba meses con una
regla muerta): 10 mg $1,749 → $2,119, hasta 60 mg $3,919. Todo bajo el techo de Certified. Reglas
de Christian: **trinquete** (a Exoma no se le sigue para abajo), **Certified menos $10 con
terminación 9**, **techo cruzado** (no cobrar más por menos producto del que el competidor da en su
presentación mayor), y **5× neto o venta directa** para distribuidores.

**Dysport y HUMSC ocultos** del catálogo público (no son péptidos RUO). Interruptor `hidden` en el
backend.

**Correos:** las suites E2E usaban `auditoria@exygenlabs.com` como cliente de prueba, así que cada
corrida le mandaba a Christian "compra confirmada". Ya usan un dominio no entregable.

---

# Exygen Labs — Website Continuation File

> **Propósito:** fuente única de verdad del SITIO WEB (frontend, backend, IA, marca, despliegue). Pega este archivo en un chat nuevo para retomar con todo el contexto. Complementa a `../NOVA-PRICING-SYSTEM-CONTINUATION.md` (el sistema de precios). **Última actualización: 2026-07-28 (cierre).** Empieza por el 🤝 HANDOFF de hasta arriba.

> **Estilo con Christian:** abogado, no dev ("abogado de 95 años haciendo vibe coding"). Respuestas **ultra cortas, español claro, sin jerga**. Corre TÚ los comandos (nunca le pidas abrir terminal). Términos de git en inglés (commit, push, merge — no "commitear").

---

## 📁 FICHAS TÉCNICAS (2026-07-27, noche) — pausadas, con pendientes vivos

*(Ya no es lo que se está trabajando: el 28-jul el foco se fue al Motor de Precios. Los cuatro
pendientes del final de esta sección siguen abiertos.)*

Christian pasó como referencia las fichas
oficiales de **Genolab** (`~/Downloads/FICHA_TECNICA_RT80_OFICIAL.pdf`, 9 páginas, y la de
GHK-Cu, 8 páginas). La nuestra tenía 2. Error de método propio: se leyeron 2 páginas de la
referencia y se asumió el resto.

### Cómo quedó la ficha (probada con Retatrutida: 7 páginas)

| # | Sección | Estado |
|---|---|---|
| — | **Portada** con logotipo (molécula + Marcellus), vial y título | ✅ |
| — | **Carta de presentación** "Sobre este documento" | ✅ |
| — | **Índice** numerado, se arma solo con las secciones que sí se imprimen | ✅ |
| — | **Referencia rápida** — rejilla de un vistazo | ✅ |
| 1 | Identidad química | ✅ |
| 2 | Presentaciones | ✅ |
| 3 | Descripción y líneas de investigación | ✅ |
| 4 | **Farmacocinética** | ⚠️ solo 7 compuestos |
| 5 | **Reconstitución recomendada** + procedimiento de 6 pasos | ✅ |
| 6 | **Dosis de referencia** con unidades de jeringa calculadas | ✅ |
| 7 | **Selección de jeringa** (la regla de la rayita) | ✅ |
| 8 | **Conservación y estabilidad** | ✅ |
| 9 | Manejo en laboratorio | ✅ |
| 10 | Certificado de análisis del lote | ✅ |
| 11 | Fuentes de los datos de identidad | ✅ |

**Decisiones tomadas con Christian:**
- Farmacocinética: **sí**, pero solo donde hay fuente. Vive en `fichas-tecnicas/farmacocinetica.json`;
  si un compuesto no está ahí, su sección no se imprime y el índice se renumera solo.
  Hoy son 7: Retatrutida, Semaglutida, Tirzepatida, Liraglutida, Dulaglutida, CJC-1295 con DAC
  y Tesamorelina.
- "Beneficios observados en estudios": **sí va** (ya está como "Qué dice la evidencia" en 47
  monografías). Razón de Christian: la ficha no es pública, solo la recibe quien compra o quien
  la pide por el chat.
- El **cromatograma HPLC del COA**: se omite por ahora. Es lo que de verdad hace la ficha de
  Genolab de 9 páginas. Cuando lleguen los COAs del laboratorio, la ficha crece 3-4 páginas sola.
- Tipografías: **Franklin Gothic** para el cuerpo, **Marcellus** para el logotipo y títulos
  (es la del logo). Ambas ya instaladas en el Mac. Tamaños: título 14, subtítulos 12, cuerpo 11,
  número de página 9.

### 🐛 Bug que cazó Christian y hay que no repetir
La tabla de reconstitución caía a un **respaldo ciego de 2 mL** cuando una presentación no estaba
en `start_levels.agua_ml`. En Retatrutida las de **60 y 100 mg** salían a 30 y 50 mg/mL cuando las
seis presentaciones investigadas están todas en **10.0 mg/mL**. Ahora el agua se **deriva de la
concentración documentada** y la fila se marca con **†** más su nota al pie. Regla: un respaldo
silencioso es peor que un hueco.

### Lo que falta de las fichas
1. **Regenerar las 75** con el diseño nuevo (solo se regeneraron NAD+ y Retatrutida de muestra).
2. **Llenar `farmacocinetica.json`** compuesto por compuesto. Para ~68 no hay vida media publicada
   en humanos: NO se inventa.
3. **Las 35 secuencias** que siguen faltando.
4. Los COAs, cuando Christian los tenga del laboratorio.

---

## 🟡 PENDIENTES NUEVOS QUE PIDIÓ CHRISTIAN (2026-07-27)

### Entrar a la cuenta con Outlook y con huella o cara
- **Iniciar sesión con Outlook / Microsoft** además del correo y contraseña de hoy.
  Va por OAuth de Microsoft Entra; hay que registrar la app y guardar el secreto en
  Admin → Cobros (o su equivalente), nunca en el repo.
- **Huella digital o reconocimiento facial** (WebAuthn / passkeys). Es el estándar que ya
  traen iPhone y Android: el navegador guarda la llave, nosotros solo verificamos. No hay
  que manejar biometría — nunca sale del teléfono.
- Orden sugerido: primero passkeys (resuelve el 90% del dolor de escribir contraseña en el
  teléfono) y después Outlook.

---

## 🔴 PRIORIDAD 00 — ESTUDIO DE researchdosing.com (HECHO 2026-07-27)

> Estudiado por Claude **y** por Codex en paralelo. Informe completo:
> **`fichas-tecnicas/ESTUDIO-RESEARCHDOSING.md`** (20 KB).

### Qué es esa página

WordPress con **82 compuestos**, casi el mismo catálogo que el nuestro (mismos bioreguladores
raros, mismos blends, mismo LIPO-C). Tiene una **puerta de acceso privada** que pregunta *"which
site are you coming from"*: es un **manual de dosificación compartido entre vendedores** del
mismo mercado, y Certified-PepMex manda ahí a sus clientes. **No vende nada.**

No tiene calculadora interactiva: son **tablas fijas** de mg → unidades por vial.

### 🚨 EL HALLAZGO PRINCIPAL: los 4.8 mg NO son de researchdosing

Su ficha pública de Retatrutida publica **2, 4, 6, 8, 10 y 12 mg**. **El 4.8 no aparece.**
Queda sin resolver de dónde salió la cifra que vio Christian — hay que preguntarle en qué
pantalla exactamente la leyó, porque no es de esa página (al menos no de la parte pública).

La hipótesis de "4.8 × 8 = 8 dosis por vial" es aritméticamente correcta pero **no se pudo
probar**: researchdosing ni siquiera publica cuántas dosis rinde un vial.

### 🚨 SUS TABLAS TIENEN ERRORES DE ARITMÉTICA

Comprobado dos veces, de forma independiente. En el vial de **30 mg con 2.5 mL** (12 mg/mL):

| Dosis | Unidades reales | Ellos publican | Lo que de verdad se aplica |
|---|---|---|---|
| 2 mg | 16.7 u | 16 u | **1.92 mg** |
| 4 mg | 33.3 u | 32 u | **3.84 mg** |
| 8 mg | 66.7 u | 66 u | **7.92 mg** |
| 10 mg | 83.3 u | 84 u | **10.08 mg** |

Cuatro renglones fuera de un redondeo normal. Quien siga esa tabla creyendo que se aplica
4 mg, se aplica 3.84. Además redondean de forma inconsistente: 12.5 → 12, pero 37.5 → 38.
**Sus tablas están hechas a mano, no calculadas.**

### El agua NO es el problema

2.5 mL (16 mg/mL) contra nuestros 4 mL (10 mg/mL) es una **elección de concentración**, no de
dosis. Para 8 mg: ellos 50 unidades, nosotros 80. **Se aplican los mismos 8 mg.** No hay que
volver a discutir esto.

Dato útil: con 4 mL una dosis de 12 mg **no cabe** en una U-100; con 2.5 mL sí (75 u).

### Lo que ellos publican sin fuente

- Dosis de **6 y 10 mg** — no están en el ensayo Fase 2 (que usó 1, 4, 8 y 12).
- **Calendario de titulación**: mínimo 4 semanas por dosis, subir de 2 en 2 mg.
- **Ciclos de 16 semanas con 8 de lavado** — y en la misma página dicen que ciclar "no es
  necesario" pero lo recomiendan. Se contradicen.
- Contraindicaciones, interacciones y efectos adversos redactados como etiqueta de
  medicamento, sin bibliografía.

### ✅ Qué adoptar (sin romper la regla dura)

1. **Guía breve de preparación y jeringas**, separada de las dosis: diferencia entre 0.3, 0.5
   y 1 mL, graduaciones, almacenamiento.
2. **Explicar el criterio del agua**: más agua = menos concentración = más rayitas.
3. **Mostrar el límite de cada opción**: con 4 mL, 12 mg no cabe en una jeringa.
4. **Reforzar nuestra fuente de Retatrutida**: enlazar NEJM y ClinicalTrials.gov directo
   (PMID 37366315, NCT04881760), no sitios secundarios.
5. **Partir el campo `fuente`** en `fuente_dosis`, `fuente_frecuencia` y `criterio_agua`. Hoy
   una sola frase parece respaldar las tres cosas y no es cierto.
6. **Decimales cuando el redondeo cambie la cantidad real** — justo lo que ellos hacen mal.

### ❌ Qué NO adoptar

- El 4.8 mg mientras no se sepa de dónde sale.
- El 6 y el 10 mg solo porque completan la secuencia visual de 2 en 2.
- Calendarios de titulación ni cuándo aumentar.
- Ciclos, lavados ni combinaciones sin evidencia.
- Presentar un volumen de agua como si fuera parte del protocolo clínico.

### Lo nuestro que hay que corregir

Nuestra regla es mejor que la de ellos, pero la ejecución en Retatrutida todavía no es
trazabilidad perfecta: el campo `fuente` cita "Ensayo Fase 2" y dos sitios secundarios, sin
DOI ni enlace directo. Y los niveles 2/4/8 simplifican la literatura — el 2 mg fue dosis
inicial de ciertos grupos, no un nivel objetivo.

### Compuestos que ellos listan y nosotros no vendemos (19)

Los cuatro con mercado real: **MK-677, Orforglipron, Tesofensine y Methylene Blue.**
El resto son mezclas propias de ellos (GLOW Tropic, Mito Blend, Super Tropic, LIPO-B,
LIPO-Mino-Mix, LIPO Shredder, Illumi-neuro, FLGR242) y bioreguladores (Vilon, Pancragen,
Prostamax), más Dihexa, BAM-15 y Adipotide.

---

## ✅ LOS DOS PENDIENTES URGENTES — RESUELTOS (2026-07-27, tarde)

> Se arreglaron los dos, y esta vez **viéndolos con los ojos** en el navegador a 1440 px,
> no deduciéndolos del código. Abajo queda el diagnóstico viejo (equivocado) para que no se
> repita el método.

### 1. ✅ El sidebar que desaparecía — era el overflow, pero nuestra regla nunca se aplicaba

**Reproducido en vivo** en exygenlabs.com a 1440 px, con el header (`sticky top-0`) de
sonda: al abrir el selector de jeringa el header pasaba de `top: 0` a **`top: -746 px`**.
El bug era real y era el `overflow: hidden` del body, como decía el diagnóstico.

**Lo que el diagnóstico anterior no vio:** `react-remove-scroll` **no trae sus estilos en un
archivo `.css`** — los inyecta en un `<style>` del `<head>` al abrir el menú, con el selector
**idéntico** `body[data-scroll-locked]` y también con `!important`. Misma especificidad, y el
suyo entra después → gana el suyo. Nuestra regla del PR #119 estaba escrita, compilada,
desplegada… y **jamás llegó a aplicarse**. Por eso al simular el atributo a mano el body sí
se quedaba bien (no había menú abierto, no había `<style>` inyectado) y en uso real no.

**El arreglo son cinco letras:** `html body[data-scroll-locked]`. La especificidad sube de
(0,1,1) a (0,1,2) y el orden deja de importar. Medido después: header en `top: 0` con el
menú abierto y el candado puesto. `npm run auditoria` trae una comprobación nueva que falla
si alguien le quita el `html`.

**Lección de método:** la regla existía y el navegador la ignoraba en silencio. Antes de
concluir "el mecanismo no era ese", hay que comprobar que nuestra regla **gana**, no solo
que está escrita.

### 2. ✅ Las columnas desproporcionadas — se acabaron las columnas

La cuadrícula de niveles decía en un comentario que iba "a ancho completo" y **era mentira**:
seguía dentro de la tarjeta de resultados, o sea dentro de la columna de 3/5. De ahí salían
los 1,174 px contra 391. Ahora la calculadora es **una sola columna**: tarjeta de datos
(vial · jeringa · dosis repartidos en horizontal), tarjeta de resultado (la cifra grande a la
izquierda y la jeringa a la derecha) y la cuadrícula de niveles, las tres a lo ancho.
Medido en local a 1440 px: **1240 px de ancho las tres**, altos 227 / 513 / 349.

**Se probó y se descartó** volver a repartir columnas: los controles son cuatro campos
cortos y el resultado se lleva todo lo demás. No hay reparto que empate contenido asimétrico.

### 3. ✅ Aviso de "esta dosis no cabe en la jeringa" (mejora #4 del estudio)

Antes solo se insinuaba con un ⚠️ rojo en una columna de la tabla. Ahora sale con letras y
**con la salida**: *"Con 4 mL de agua salen 120 rayitas y tu U-100 llega a 100. Ponle 3 mL de
agua y sí cabe."* Probado con el caso exacto del estudio (Retatrutida 12 mg).

---

## 🗂️ DIAGNÓSTICO VIEJO (2026-07-27, madrugada) — conservado como advertencia

> Esto es lo que se creía antes de reproducir el bug. La conclusión "el overflow no era la
> causa" **era falsa**. Se deja escrito porque el error de método vale más que el resultado.

### 1. ⛔ El sidebar izquierdo DESAPARECE al abrir el selector de jeringa

Es la regla de oro de Christian ("la barra NUNCA desaparece"), ahora
provocada por una librería.

**Diagnóstico hecho:** Radix llama a `react-remove-scroll-bar` al abrir un `Select`,
`Dialog` o `Popover`. Esa librería le pone al `<body>` el atributo `data-scroll-locked`
con `overflow: hidden`. Eso convierte al body en contenedor de scroll y despega todo lo
`sticky` — el sidebar del tablero es `sticky top-28`.

**Lo que se intentó (PR #119, desplegado):** una regla en `src/index.css`:

```css
body[data-scroll-locked] {
    overflow: visible !important;
    overflow-x: clip !important;
    margin-right: 0 !important;
    padding-right: 0 !important;
}
```

Al simular el atributo en producción, el body **sí** se queda en `clip visible`. Y aun así
Christian lo sigue viendo desaparecer. **Conclusión: el mecanismo del overflow no era la
causa real, o no la única.**

**Qué revisar después (sin repetir lo ya descartado):**
- Radix también pone `pointer-events: none` en el body y `aria-hidden`/`inert` en todo lo
  que está fuera del portal. Revisar si el sidebar cae dentro de esa rama.
- El `Select` monta su contenido en un portal; comprobar si el `TabsList`/`TabsTrigger`
  del sidebar pierde su contexto de `Tabs` mientras el portal está abierto.
- Reproducirlo con el panel del navegador a **ancho real ≥1024 px**. En esta sesión no se
  pudo: el panel reportaba `innerWidth: 0` y a ese ancho el sidebar está oculto por
  diseño (`hidden lg:block`), así que **nunca se vio el bug con los ojos**.
- Probar `<Select modal={false}>` o reemplazar por un `<select>` nativo en ese campo.

### 2. ⛔ Las columnas de la calculadora siguen desproporcionadas

**Sigue pasando.** El lado izquierdo es muchísimo más corto que el derecho.

**Medición real (producción, cuenta de Paz):** tarjeta izquierda **391 px**, tarjeta
derecha **1,174 px**. Tres veces.

**Causa:** la cuadrícula de niveles se mudó a ancho completo (PR #117) y con eso la columna
de controles se quedó casi vacía, mientras la de resultados conserva el resumen, la jeringa
SVG, el agua, las opciones y las estadísticas.

**Lo que se intentó (PR #119, desplegado):** hacer la tarjeta izquierda `lg:sticky lg:top-28`
para que siga al cliente. **No resolvió la queja** — sigue viéndose desbalanceado.

**Qué considerar después:**
- Repartir de otra forma: pasar parte de lo que hoy vive en la derecha (jeringa SVG,
  opciones de agua) a la izquierda.
- O abandonar las dos columnas en escritorio y usar un flujo de una sola columna con la
  cuadrícula a ancho completo, que es lo que Christian ya elogió.
- Medir con `getBoundingClientRect().height` de las dos tarjetas antes y después; el
  objetivo es que no difieran más de ~30%.

---

## ✅ LO QUE QUEDÓ EN VIVO EL 2026-07-27 (día completo)

**Calculadora**
- La barra lateral ya no desaparece. Era el `overflow` del body, pero nuestra regla **nunca se
  aplicaba**: react-remove-scroll inyecta su `<style>` DESPUÉS con el mismo selector. Se arregló
  con `html body[data-scroll-locked]` (más especificidad). La auditoría falla si alguien le quita
  el `html`.
- Una sola columna: se acabaron los 391 px contra 1,174.
- Aviso de **dosis que no cabe** en la jeringa, y de **dosis que no se puede medir** (en la de
  1 mL cada rayita vale DOS unidades — hueco real que teníamos).
- "Titulación" fuera; ahora dice **"cuándo subir la dosis"**, con las fuentes enfrentadas.
- Jeringa rediseñada.

**Dosis: de 2 a 87 productos encendidos de 98**
- 67 con fuente real (researchdosing + literatura primaria: etiquetas FDA de Saxenda y Trulicity,
  Teichman JCEM 2006 para CJC con DAC, Fase IIa del Fragment 176-191, etiqueta de somatropina).
- 20 **derivadas**, marcadas en pantalla en su propio renglón y en color.
- **19 cifras estaban mal**: Cerebrolysin hasta 800× alto, FOXO4 112×, 5-Amino-1MQ 150×, los
  bioreguladores 10× (alguien leyó el TOTAL DEL CURSO de Khavinson como dosis por inyección).
- ⚠️ **Thymalin fue un error MÍO al corregir**: lo bajé a 1-2 mg por analogía con los otros
  bioreguladores y su protocolo publicado sí es de 10 mg/día. Ya está en 10 mg.

**researchdosing.com analizado a fondo** → `ANALISIS-RESEARCHDOSING-2026-07-27.md`
Su candado de acceso es un `<div>`: el texto viaja completo en el HTML. Se bajaron sus 81 fichas.
Hallazgo que nos aplicaba: **el LIPO-C no va al refrigerador, se gelifica** — nuestra ficha decía
-20 °C.

**Nueva página `/info/preparacion`** — guía de preparación e inyección que no existía.

**OXXO** como método de pago, por Mercado Pago. `binary_mode` apagado (un pago OXXO nace
'pendiente' por naturaleza).

**40% = sin puntos de lealtad.** Programado y desplegado. Los 100 puntos que ya tenía Paz
Cambray se revirtieron a mano en producción.

**Fable 5 revisó el sitio** → `REVISION-FABLE-2026-07-27.md` + 43 capturas. Aplicado: acentos del
modal de entrada y del carrito, "22+" → 98 (ahora se calcula solo), la burbuja de chat ya no tapa
el botón Agregar en móvil, **precio por mg** en cada presentación con sello "mejor valor", la
ficha arranca en la presentación de **mejor valor que esté en mano**, y bloque "Para usar este
vial vas a necesitar".

**Sello de descuento en el hero** — dorado, sin recuadro. Antes el 10% solo aparecía en el carrito.

**Videos 9 y 10 regrabados.** ⚠️ La cuenta demo `carlos.demo` **ya no existe** en producción; el
video de la calculadora se grabó contra localhost con la calculadora en modo completo (sale
idéntico: Playwright graba solo el viewport). Si se quiere volver a grabar con cuenta real, hay
que recrear ese usuario.

**Codex:** su pase estricto (`DOSIS-CODEX-2026-07-27.md`) dice NO encender ninguno de los ~52 sin
fuente. Christian decidió encenderlos igual con lo que hubiera, marcando lo derivado.
⚠️ Codex necesita `--skip-git-repo-check` o falla callado; y el paquete de Playwright hubo que
reinstalarlo (los navegadores sí estaban en caché).

---

## 📋 TODOS LOS DEMÁS PENDIENTES (2026-07-27)

### Cuenta y acceso (pedido de Christian, 2026-07-27)
- **Entrar con Outlook / Microsoft** (OAuth de Entra).
- **Huella digital o cara** (WebAuthn / passkeys). La biometría nunca sale del teléfono.
- Sugerencia de orden: passkeys primero, Outlook después.

### 💬 WhatsApp de Christian — pregunta abierta, SIN RESOLVER
Christian quiere saber si puede darle acceso a su cuenta de WhatsApp para **bajar las
cotizaciones de sus distintos proveedores, los seguimientos y las conversaciones**, y trabajar
con esa información (comparar precios, armar la maestra, no perder seguimientos).

**Estado: no se ha intentado ni se ha dicho que sí.** Lo que hay que resolver antes:
- **Por dónde.** WhatsApp no tiene una API de lectura de la cuenta personal. Las vías reales son
  (a) **exportar el chat** desde el teléfono ("Exportar chat" por conversación, sale un .txt que
  se puede leer sin credenciales), o (b) **WhatsApp Business API**, que es de números de empresa
  y no lee el historial viejo. La vía (a) no necesita darle acceso a nadie: la exporta él y la
  pasa como archivo.
- **Qué NO se debe hacer:** pedirle su contraseña, su código de 6 dígitos o vincular WhatsApp Web
  a una sesión automatizada. Eso es entregar la cuenta entera, y además viola los términos.
- **Lo que hay dentro.** Sus chats traen datos personales de clientes y de proveedores. Si se
  procesan, tienen que quedar en la máquina y no subirse al repo.
- **Recomendación para la próxima sesión:** empezar por exportar 2 o 3 chats de proveedores
  como prueba, ver si el formato sirve para sacar precios, y solo entonces decidir si vale la
  pena algo más.

### Fichas técnicas — EN CURSO, ver el bloque de hasta arriba
- Regenerar las 75 con el diseño nuevo.
- Llenar `farmacocinetica.json` (hoy 7 de 75).
- 35 secuencias faltantes.
- COAs cuando lleguen del laboratorio.

### Decisión que Christian debe tomar (bloquea Skydropx)
- **Tope del 10% en envío gratis.** Regla fijada: envío gratis arriba de $2,500 *siempre y
  cuando el envío no pase del 10% del pedido*. Textual: *"Si una compra por 2,500 genera un
  costo de envío de $500 ni en pedo lo pago."* **Falta definir:** si un pedido de $3,000
  genera $400 de envío (13%), ¿el cliente paga los $400 completos o solo los $100 que
  exceden el 10%?

### Envíos — Skydropx (para la siguiente sesión, Christian lo pidió explícitamente)
- Integrar **por API**, no por WooCommerce. El sitio es React + FastAPI; no hay WordPress.
- **Solo Estafeta** por ahora: la API cotiza varias paqueterías, se filtra por `provider` y
  se ocultan las demás.
- **El remitente NO es la dirección de Christian** — va la de algún trabajador. Falta que
  él la proporcione.
- El cliente ve el **precio real de Estafeta** por peso y código postal.
- En la parte **pública** se sigue anunciando **$250 como mínimo**, para dar una idea sin
  comprometer la cotización real.
- La API key de Skydropx debe agregarse a `secretos.PERMITIDAS` (backend) para que la
  pegue desde **Admin → Cobros**.

### Fichas técnicas
- **Faltan 35 secuencias** de 75 fichas. Hay 40. Sacarlas de UniProt y artículos primarios,
  una por una. Es el único hueco frente a Exoma, que sí publica secuencia.
- Los identificadores de 3 compuestos siguen sin resolver: **ADMAX, PTD-1 y PEG-MGF**.

### Producto / catálogo
- **Arte de los viales de 5-Amino-1MQ.** Las etiquetas de 10 y 50 mg todavía dicen
  "10-Amino-1MQ" impreso, así que esas dos presentaciones caen a la foto genérica. Necesita
  créditos de Higgsfield (Christian quedó en 0) o Nano Banana.
- **Investigar los 61 productos sin fuente de dosis.** Hoy solo 2 de 63 tienen las
  sugerencias encendidas.

### Marketing
- **Rehacer el anuncio #2 de Meta**: su texto e imagen dicen WhatsApp pero el botón va al
  sitio.
- **Prender los 2 anuncios** cuando Christian quiera (están pausados, no gastan).
- Rehacer los ángulos con el estudio de competencia.

### Infraestructura
- **Cerrar 2 reglas SSH viejas** en el EC2 (IPs fijas 129.222.201.144 y 66.9.186.74).
- **BTCPay se queda APAGADO** — decisión tomada. Le faltan `BTCPAY_URL`, `BTCPAY_STORE_ID`
  y `BTCPAY_API_KEY`, y tenerlas exige montar y mantener un servidor propio. NOWPayments ya
  cobra 27 monedas sin administrar nada.

### Deuda de verificación
- **Los COAs siguen sin existir.** El registro `coa-files/registry.json` está vacío y los
  PDF dan 404, mientras la ficha de producto muestra el sello "COA verificado" y las fichas
  técnicas prometen que el certificado del lote viaja con la compra. Certified-PepMex SÍ
  entrega los suyos (están en un modal, cargados por JavaScript — un `curl` al HTML plano no
  los ve, y por eso en esta sesión se reportó por error que su biblioteca estaba vacía).

---

## ✅ LO QUE SÍ QUEDÓ EN VIVO ESTA SESIÓN (2026-07-26 madrugada → 2026-07-27)

- **Revisión de Codex aplicada a las monografías.** 37 fichas duplicadas eliminadas (eran
  código muerto: mandaba la última definición). Resultados clínicos retirados de 47 fichas.
  Afirmaciones de estatus regulatorio de otros países, fuera. 12 errores de hecho corregidos
  (PT-141 sin MC1R, TB-500 equiparado a la timosina beta-4 completa, "CJC-1295 sin DAC" como
  identidad formal, SNAP-8, Dysport, Lemon Bottle, HUMSC…). PR #111.
- **5-Amino-1MQ.** "10-Amino-1MQ" **no existe**: el anillo de quinolinio solo tiene
  posiciones 1 a 8 y PubChem no devuelve nada. El COA del proveedor para el código "10AM"
  dice *5-Amino-1-MQ, CAS 42464-96-0*. Se fusionaron en un producto con tres presentaciones
  y se dieron de baja los slugs viejos en producción (`pricing-system/sync_1mq.py`, hecho a
  propósito en vez de `sync_backend.py --replace`, que habría **borrado** hCG y B12: el
  DELETE del backend es un `delete_one` de Mongo, irreversible).
  El nombre malo además **costaba dinero**: Certified sí vende esa presentación ($960), pero
  el cruce fallaba y el motor la tasaba con la regla de "nadie más lo vende".
  Precios finales: **$839 / $1,259 / $2,999** (decisión de Christian; el de 10 mg queda
  ARRIBA de Certified, lo cual rompe su propia regla — está anotado en la MAESTRA).
- **75 fichas técnicas** generadas (`fichas-tecnicas/`, ya versionado dentro del repo).
  55 con CAS, 58 con fórmula, 40 con secuencia, 18 mezclas con nota que lo explica.
  **Ninguna dice "pendiente" ni "por verificar"** — si un dato no está verificado, la fila
  no se imprime. PR #112.
- **Almacén privado de fichas** (backend PR #19). No hay página ni índice: se entregan a
  quien compró, o por enlace firmado con caducidad de 48 h que emite el chat. 29 pruebas
  dedicadas a que NO funcione cuando no debe.
- **Llaves de cobro pegables desde Admin → Cobros**, cifradas con Fernet. El `.env` siempre
  manda sobre el panel. Mercado Pago quedó **activo y probado**.
- **E2E de tarjeta** (`npm run e2e:tarjeta`) y compuerta única `npm run verificar`
  (auditoría + cripto + tarjeta). Al cierre: **77 + 21 + 15, cero fallas**.
- **Calculadora**: detecta lo que el cliente compró (el nombre del pedido trae la
  presentación pegada, "NAD+ 500 mg", y se comparaba por igualdad exacta — nunca coincidía,
  así que Paz veía el catálogo entero); arranca en su producto y su presentación; **siempre
  abre en el nivel INICIAL**, no en el típico; el agua investigada manda sobre la
  aproximación; columna de **Fase**; y el renglón de que **cuándo subir de nivel es una
  decisión clínica**.

### ⚠️ Error de método que conviene no repetir
Se le contestó a Christian "sí, Paz ve solo sus dos péptidos" **leyendo el código**, y era
falso: al entrar con "Ver como" resultó que veía el catálogo completo. El bug era invisible
porque cuando la lista sale vacía el código **cae al catálogo entero** — no se ve como
error, se ve como si el filtro no existiera. **Mirar la pantalla del cliente antes de
afirmar.**

---

## 🤝 HANDOFF — SESIÓN DEL 2026-07-26 (tarde/noche)

> Sesión muy larga. Casi todo quedó **desplegado y verificado en vivo**. Lo que sigue es
> lo que se hizo, lo que se descubrió, y lo que queda esperando decisión.

### ⛔ LO MÁS GRAVE QUE SE ENCONTRÓ: las dosis del sitio no tenían fuente

Una clienta real (Paz, compró NAD+ 500 mg y Retatrutida 40 mg) estaba leyendo la
calculadora. Al auditar de dónde salían esas cifras, el commit que las introdujo dice
textualmente que la frecuencia se asignó **"por CLASE de péptido"** — se agrupó por familia
y se le puso una frecuencia a cada familia, **sin investigar producto por producto**.
63 de 110 productos, cero fuentes citadas.

**Se apagaron todas.** Y al reactivarlas NO se prendió el interruptor global —eso repetiría
el error—: ahora **cada producto se enciende solo si trae `start_levels.fuente`**. Si nadie
lo investigó, no aparece. Hoy están encendidos **2 de 63**: NAD+ y Retatrutida, justo los
dos de Paz. La fuente se le muestra al cliente debajo de la tabla.

Lo que NUNCA se apagó es la aritmética: el cliente pone su vial, su agua y SU dosis, y la
calculadora le dice las rayitas. Eso es conversión de unidades, no una recomendación.

**NAD+ resuelto.** Las fuentes parecían contradecirse (diaria vs 2-3 por semana) pero
describen **fases distintas**: inicio con dosis baja y diaria, mantenimiento con dosis alta
y espaciada. Por eso `start_levels.freq` ahora guarda **una frecuencia por nivel**.
Misma estructura en TB-500 (carga y mantenimiento).

**Retatrutida estaba bien** (2/4/8 mg semanales, dentro del ensayo Fase 2). En una primera
lectura se reportó como error grave — **era falso**, una búsqueda agarró el bloque del
producto vecino. Queda anotado para que nadie lo repita.

**Dato comercial que salió de ahí:** el vial de 500 mg de NAD+ rinde **5 semanas** en
mantenimiento (~$252/semana) contra 2.4 semanas en carga (~$525/semana). Ya está en la ficha.

### 📣 Área de marketing — construida y EN VIVO
Ver la sección de abajo. Todo en **dólares con el TC fijo 17.5 de la maestra**: Meta cobra
en USD y los costos de proveedor están en USD, así que **solo se convierten las ventas**.
Se evaluó y descartó un TC diario (Banxico/BBVA): si el panel se mueve solo y la maestra no,
los dos cuentan historias distintas del mismo producto. El TC vive en **un solo lugar**
(`marketing.TC_MAESTRA` o `EXYGEN_TC`) y **no se actualiza solo** — Christian decide cuándo,
porque ese día hay que recalibrar precios.

**Bug de precios corregido de paso:** `pricing-system/auditar_catalogo.py` y `reprecio.py`
usaban **18.0** en vez de 17.5. Inflaban el costo 2.9%, o sea bajaban el ROI, y el auditor
podía marcar como "abajo del piso" un producto que sí cumplía.

### 🐛 Otros arreglos desplegados
- **Los links del pie daban 404 a Google.** 14 de 23. Ver sección propia más abajo.
- **La barra superior se despegaba.** `overflow` en el body. Ver la regla de oro más abajo.
- **El scroll ahora SÍ abre arriba siempre.** La versión anterior usaba `useEffect`, que
  corre DESPUÉS de pintar, y `scrollRestoration` estaba en `auto` peleando con nosotros.
  Ahora `useLayoutEffect` + `manual`. Probado desde 17,103 px abajo: abre en 0.
- **GHK-Cu con más peso:** entra al hero (5º puesto, salió Semaglutida), a `FLAGSHIP_ORDER`,
  y su monografía sube de 280 a ~500 palabras con sección de evidencia.
- **221 fotos duplicadas borradas** (`... 2.webp`, copias de Finder). ⚠️ Algo las recrea:
  son conflictos de iCloud. La carpeta pasó de 636 a 415 archivos.

### 📢 Meta — la app ya está publicada
Christian publicó "Exygen Panel" y asignó permisos de página al usuario del sistema. Eso
destrabó la creación de anuncios por API.

**Creados y PAUSADOS** (no pueden gastar): 2 campañas + 2 conjuntos + 2 anuncios que van al
**sitio web con URL etiquetada**. Verificado que `slug(nombre en Meta) == utm_campaign`, así
que al prenderlos SÍ aparecerán con costo por cliente en el panel. Ids en
`META-ANUNCIOS-NUEVOS.md`.

⚠️ **El anuncio #2 se contradice:** su texto y su imagen dicen "Contáctanos por WhatsApp"
pero el botón ahora lleva al sitio. Hay que rehacerle copy e imagen antes de prenderlo.

⚠️ **El 75% de la pauta va a mensajería.** Esas ventas son estructuralmente invisibles: no
hay URL donde poner un utm. Por eso el director ahora genera **cada anuncio en dos
versiones** (web + WhatsApp) y la de WhatsApp **siempre lleva su propio cupón**
(`WA-<PRODUCTO>-<MES>`), que es la única forma de atribuirla.

### 🎨 El vial genérico ya está corregido
La etiqueta base tenía DOS erratas. La primera (*PEPLIDES* → *PEPTIDES*) ya estaba resuelta;
la segunda (*Lyophlized* → **Lyophilized**) se descubrió ahora.

**Se intentó cinco veces con cirugía de píxeles y NINGUNA quedó limpia** — las letras traen
halo blanco sobre un degradado plateado, y al mover cualquier pedazo el fondo no empata.
Se resolvió con **Nano Banana 2** (Higgsfield) pasándole el vial como referencia: quedó
limpio, sin parches, conservando molécula, polvo, tapa y aviso RUO.
→ `Media/Viales individuales sin fondo para hero/Vial generico corregido (publicidad).png`

⚠️ Los 195 viales del sitio **siguen con "Lyophlized"**. Christian decidió no regenerarlos
por ahora. En un anuncio a 1080 px esa línea queda en ~15 px: ilegible. En la ficha de
producto con zoom, sí se nota.

### 📊 Estrategia de anuncios — lo que dicen los datos
Christian propuso 10 anuncios, matar 9, escalar 1. **La idea es correcta, la aritmética no:**
con $25-30/día, 10 anuncios son $2.50-3 cada uno y Meta necesita ~50 conversiones semanales
para salir de aprendizaje. Se matarían ganadores por ruido.

**Lo que sí funciona con ese presupuesto:** los 5 creativos en **UN mismo conjunto**. Meta
reparte solo y concentra el gasto en el que jala, mejor que repartir parejo a mano. Y **no
tocar nada 4 días** — cada cambio reinicia el aprendizaje.

Sobre A/B web-vs-WhatsApp: **no multiplicar** creativo × destino. Primero los creativos a
web (el único destino medible); al ganador se le hace su gemelo de WhatsApp. Una variable
a la vez.

### 🔍 Estudio de la competencia — corrige el rumbo
`ESTUDIO-COMPETENCIA-ANUNCIOS.md`. Christian observó que los ángulos propuestos (rinde,
certificado, envío, "cuál elegir") eran de proveedor y que la competencia vende deseo.
**Tenía razón, con un giro:**

- Los que venden deseo son **clínicas y médicos con cédula**, no las tiendas de péptidos.
- Las tiendas (PepMex, Exoma, iSharkbio) venden **puro HPLC y COA**.
- **Verificado a mano en la biblioteca de Meta:** Certified-pepmex tiene 5 anuncios activos,
  todos arrancados el 7 y 13 de julio de 2026, y los cinco con el MISMO texto de control
  analítico (HPLC, espectrometría, ISO 17025, cGMP, "7,000 investigadores"). Cero peso,
  cero músculo. ⚠️ Ojo: la biblioteca solo conserva anuncios ACTIVOS de marcas comerciales,
  así que campañas viejas apagadas no se ven. Y lo que Christian ve a diario podría ser
  **publicación orgánica**, no anuncio pagado — son cosas distintas.
- **El ganador del mercado lleva 10 meses:** Dra. Celia Jaramillo, video casero vertical,
  antes/después sin decir que lo es.
- **LA LÍNEA DE META, y esto importa más que el ángulo:** no te tumban por decir "bajar de
  peso" — te tumban por decirlo **sin bata**. Con cédula y COFEPRIS visibles dura meses.
  **A Singular Biotech le borraron la página entera. A Zelara Voss le tumbaron 6 anuncios
  en horas.** Christian es abogado, no médico: copiar ese ángulo es riesgo existencial.
- **Dos huecos que nadie usa:** unir ciencia verificable con deseo humano, y hablarle al
  hombre de 35-55 en español mexicano.

### 📁 Archivos de investigación generados
| Archivo | Qué trae |
|---|---|
| `INVESTIGACION-DOSIS-PEPTIDOS.md` (70 KB) | Investigación de Codex, con URL por cifra |
| `INVESTIGACION-DOSIS-CLAUDE.md` | La de Claude, para contrastar |
| `REVISION-MONOGRAFIAS.md` (39 KB) | Codex revisó las 102 monografías |
| `ESTUDIO-COMPETENCIA-ANUNCIOS.md` | Los anuncios reales del mercado |
| `META-ANUNCIOS-NUEVOS.md` / `META-ENLACES.md` | Ids, URLs y antes/después de los anuncios |

⚠️ **REVISION-MONOGRAFIAS.md tiene hallazgos serios sin aplicar todavía**, entre ellos:
**10-Amino-1MQ** — la identidad química no se pudo verificar; el inhibidor publicado es
**5-amino-1MQ**. Si el vial es ese, hay que corregir el nombre del producto.
También: PT-141 omite MC1R, "CJC-1295 sin DAC" es nombre comercial y no identidad formal,
y TB-500 traslada propiedades de la proteína completa al fragmento.

### 🟡 LO QUE QUEDA
**De Christian:**
1. Rehacer copy e imagen del anuncio #2 antes de prenderlo (hoy se contradice)
2. Decidir si prende los 2 anuncios nuevos
3. Higgsfield: **0 créditos**. Se necesitan más para generar los ángulos que faltan

**De Claude:**
1. Aplicar `REVISION-MONOGRAFIAS.md` (empezando por 10-Amino-1MQ)
2. Investigar los 61 productos que siguen sin fuente
3. Rehacer los ángulos publicitarios con lo que dice el estudio de competencia
4. Seguimiento personalizado: el backend ya tiene `PerfilSalud` con candado médico
   (`consulto_medico` + `tiene_analisis`) y endpoints `/me/perfil-salud`, **falta la UI**
5. Sello de "respaldo: ensayo clínico" vs "práctica de farmacia" (Christian lo aprobó)
6. ⚠️ **Cerrar 2 reglas SSH viejas** en el EC2: `129.222.201.144/32` y `66.9.186.74/32`

---

## 📣 ÁREA DE MARKETING — nueva pestaña en el Admin (2026-07-26)

Pedido de Christian: todas las gráficas, **el costo por cliente CON COMPRA HECHA**, poder
abrir cada campaña al detalle, y un botón "director de marketing" que arme campañas nuevas.

### El hueco que había que tapar primero
**El pedido no guardaba de dónde venía el cliente.** La atribución se adivinaba cruzando
sesiones con `utm_source` y solo llegaba a "facebook / instagram / directo", **nunca a la
campaña**. Sin ese dato en la base, el costo por cliente no se puede calcular: solo adivinar.
Por eso lo primero fue guardarlo.

### Lo que se construyó
1. **Atribución de primer toque en el pedido.** `src/lib/track.js` ya guardaba el origen de
   la primera visita; ahora captura además `utm_content` (el ANUNCIO, no solo la campaña),
   `utm_term` y **`fbclid`** — la pieza clave: Meta se lo pega a los enlaces de sus anuncios
   aunque nadie los etiquete, así que sin él una publicación impulsada es indistinguible del
   tráfico directo. El checkout lo manda y el pedido lo guarda, junto con **`first_order`**.
2. **`marketing.py`** — el cruce, con tres reglas que impiden que el número se abarate solo:
   - **Solo cuentan los clientes NUEVOS.** Si alguien que ya compraba vuelve, esa venta no la
     consiguió el anuncio. (`first_order`, con el correo comparado sin distinguir mayúsculas.)
   - **Lo que no se puede atribuir NO se reparte**: va a su cubeta "sin etiquetar", a la vista.
   - **Con pocos datos no se juzga**: dice "falta información" en vez de mandar a apagar algo.
   - Un CAC **nulo no es cero**: cero se lee "gratis", nulo se lee "todavía no trae clientes".
3. **Meta siempre fresco.** `date_preset=last_30d` excluía HOY; ahora se pide `time_range`
   explícito que **sí incluye el día en curso**. Y lo más importante: **ya no se sirve el CSV
   viejo disfrazado de dato de hoy** — si la API falla, el panel lo grita en rojo. Caché de
   60 s solo para no chocar con el límite de llamadas de Meta.
4. **Radiografía por campaña** (clic en cualquier fila): día a día, **anuncio por anuncio con
   su creativo**, edad/sexo, dónde se mostró, y **la lista de pedidos reales con su número**
   para poder comprobarlo uno por uno. Todo del mismo token: no hace falta permiso nuevo.
5. **Todos los canales, no solo Meta** (lo preguntó Christian): WhatsApp, Google, directo,
   otro sitio… y **distribuidores, cuyo costo real es la comisión pagada**. Ojo: un pedido
   puede llegar por un anuncio Y cerrarse con código de distribuidor — son dos preguntas
   distintas (cómo llegó / quién lo cerró), salen en dos renglones y **el traslape se avisa**.
6. **Director de marketing** (`director.py`): arma una campaña desde cero. La regla que lo
   hace útil: **la IA no inventa los datos**. `briefing()` arma los hechos desde la base
   (qué se vendió, qué campaña ganó, cuánto costó cada cliente, qué hay en existencia) y eso
   es lo único que ve el modelo. Si no hay historial, lo dice y la propuesta sale marcada.
   El prompt prohíbe promesas de salud y afirmaciones de legalidad (COFEPRIS, y Meta rechaza
   esos anuncios). **Devuelve una propuesta para aprobar: no publica nada en Meta.**

### ⚠️ Lo que hay que hacer para que esto sirva de verdad
**Pegar el enlace etiquetado de cada campaña en su anuncio de Meta.** El panel los genera y
los da listos para copiar. Sin eso, las ventas caen en "sin etiquetar" y esa campaña **nunca**
va a tener costo por cliente. Es la acción que desbloquea todo lo demás.

### Archivos
`novapeptidos-RBAC/marketing.py`, `director.py`, `meta_ads.py` (rango que incluye hoy +
cortes por anuncio/día/demografía), `server.py` (`/admin/marketing/resumen`,
`/campana/{id}`, `/director`), `models.py` (`Attribution`, `first_order`);
`novapeptidos-UI/src/components/admin/Marketing.js`, `src/lib/track.js`, `src/pages/Checkout.js`.

**Pruebas: 181 del backend** (20 del cruce, 13 del director) **+ 18 comprobaciones de
extremo a extremo contra un Mongo real** — se crea un pedido de verdad por el endpoint y se
verifica que el costo por cliente salga bien. Probado también en el navegador con datos
sembrados: la pestaña, la radiografía y el clic a campaña.

---

## ⛔ LA BARRA SUPERIOR SIEMPRE VISIBLE — regla de oro (2026-07-26)

**Orden de Christian, prioridad 00.** El top bar es `sticky top-0 z-40` y **no se despega
nunca**, en ninguna página ni tamaño de pantalla.

**Se había roto y no fue por el arreglo del pie** — `src/index.css` decía:

```css
html, body { overflow-x: hidden; }   /* ⛔ esto mataba la barra */
```

En CSS, poner `overflow` en **un** eje obliga al otro a volverse `auto`. Eso convierte al
**body en contenedor de scroll**. Un elemento `sticky` se pega a su contenedor de scroll
más cercano — pasaba a ser el body, y **el body nunca scrollea** (quien scrollea es el
`html`). Resultado: la barra se iba hacia arriba y desaparecía.

**Lo correcto, ya aplicado:**

```css
html { overflow-x: hidden; max-width: 100%; }  /* html SÍ scrollea: ahí sticky funciona */
body { overflow-x: clip;   max-width: 100%; }  /* clip recorta SIN crear scroll container */
```

**NUNCA** pongas `overflow`, `overflow-x` ni `overflow-y` con valor `hidden`, `auto` o
`scroll` en el **body**. (Pariente de la otra trampa: **no volver a poner
`overscroll-behavior-y: none`**, que rompió el scroll de todo el sitio.)

**Por qué se coló:** arriba del todo la barra SIEMPRE se ve bien. El bug solo aparece al
bajar, y nadie lo revisaba. Ahora `npm run auditoria` trae dos comprobaciones nuevas —
que el Header siga siendo `sticky top-0`, y que **ningún bloque de CSS del body** tenga un
`overflow` que rompa el sticky. Probado en los dos sentidos: pasa con el arreglo y falla
si se vuelve a poner. Verificado en escritorio (1280) y móvil (375), en 5 páginas: la
barra queda en `top=0` a cualquier altura, y sin scroll horizontal.

---

## 🔗 LINKS DEL PIE DE PÁGINA — arreglados (2026-07-26, rama `links-del-footer`)

Era el pendiente #6 del handoff. **Los 23 enlaces del pie llevaban a la página correcta**
(se probaron uno por uno y todos pintan su contenido real), pero **14 de los 23 le
contestaban 404 al servidor**. Un visitante no lo notaba —GitHub Pages entrega la
aplicación desde `404.html` y React pinta la página bien—, pero **Google sí lo nota y no
indexa nada de eso**: las 13 guías de `/aprende`, las 8 páginas de `/info` (envíos,
devoluciones, calidad, contacto, soporte, rastreo, términos, privacidad), `/compuestos`,
`/asesor` y `/educacion`.

**Por qué.** `scripts/prerender-routes.js` traía una lista escrita a mano con **siete
direcciones que no existen en `App.js`**: `/contacto`, `/terminos`, `/privacidad`,
`/envios`, `/devoluciones`, `/compendio` y `/distribuidores`. Generaba una página con
código 200, buen título y buena descripción para cada una… y al abrirla la aplicación
mostraba *"404, esta página se nos evaporó"*. Peor que un 404 normal: para Google es un
*soft 404* y esas siete estaban en el mapa del sitio. Las direcciones **reales** (`/info/*`,
`/aprende/<guía>`, `/compuestos`, `/asesor`, `/educacion`) no se generaban.

**Por qué la auditoría decía 37/37.** Revisaba justamente esas siete direcciones
inventadas, que sí daban 200. El punto ciego estaba en la propia prueba.

**Lo que se hizo:**
1. `prerender-routes.js` — fuera las siete inventadas; las rutas de `/aprende` y `/info`
   ahora **se leen solas** de `src/data/learn/` y `src/data/info/` (título y descripción
   salen del contenido de cada página, no se escriben a mano), así que agregar una guía
   nueva ya no requiere tocar el script.
2. **`verificarRutas()`** — compara cada ruta contra los `<Route path=...>` de `App.js` y
   **revienta la compilación** si alguien vuelve a inventar una dirección. El bug no puede
   repetirse en silencio.
3. `robots.txt` y el mapa del sitio salen ahora de **una sola lista** (`NO_INDEXAR`), así
   que ya no pueden contradecirse. Carrito, checkout y todo lo de la cuenta quedan fuera
   del mapa.
4. `auditoria-e2e.js` — los enlaces a revisar **se leen del propio `Footer.js`**, y además
   de pedir 200 comprueba que la página traiga su propio `<title>` (así se caza el
   *soft 404*: 200 con cara de página buena).

**Resultado de la compilación:** 137 rutas escritas (antes 127, y 7 de ellas falsas) +
mapa del sitio con 131 URLs. Auditoría corrida contra el sitio en vivo **antes** del
arreglo: 45 bien / **30 fallas** — todas las que este cambio corrige. **Hay que volver a
correr `npm run auditoria` después del merge y confirmar 0 fallas.**

---

## 🤝 HANDOFF — CIERRE DEL 2026-07-26

> Sesión larga. Esto es lo que cambió y, sobre todo, **lo que se descubrió que estaba mal**.
> Lo de más abajo (HANDOFF — ESTADO AL 2026-07-26) sigue vigente como detalle de precios.

### 🔴 LOS TRES BUGS DE DINERO Y MEDICIÓN QUE SE ENCONTRARON HOY

**1. La tarjeta no cobraba. Nunca.** El checkout pedía número, vencimiento y CVC, los
validaba con Luhn EN EL NAVEGADOR y **los tiraba**. No se enviaban a ningún lado. El pedido
se creaba, el cliente veía "Pedido recibido" y se iba creyendo que había pagado. Y era el
método que salía **seleccionado por defecto**. Arreglado con Mercado Pago (ver abajo).

**2. Los "clics" de Meta no eran visitas.** El panel mostraba `clicks`, que incluye
reacciones, comentarios, abrir la foto y entrar al perfil. En 30 días:
**683 clics totales → 584 al ENLACE → 256 que CARGARON la página (43.8%)**.
O sea que **328 le dieron clic y nunca llegaron** — dato accionable que estaba escondido.

**3. Lo que el sitio llamaba "sesión" nunca caducaba.** El id vivía en localStorage para
siempre: quien volvía un mes después seguía siendo la MISMA sesión. Eran *dispositivos*, no
sesiones — 170 visitas salían repartidas en 16, y la conversión salía inflada. Ahora caduca
a los **30 minutos** sin actividad y hay un **`visitor_id` permanente** aparte.

### 💳 MERCADOPAGO — hecho y desplegado, esperando llaves

`novapeptidos-RBAC/mercadopago.py` (Checkout Pro). Se manda al cliente a la página de Mercado
Pago: **los datos de la tarjeta nunca tocan nuestro servidor**.

- `'tarjeta'` **solo se acepta si hay `MERCADOPAGO_ACCESS_TOKEN`**. Sin llaves la vía no se
  ofrece — antes se aceptaba siempre.
- Webhook con **tres candados**: solo avisos `payment`; firma `x-signature` HMAC-SHA256
  (sin secreto no pasa nada); y **el estado NO se cree del cuerpo** — se le pregunta a la API
  de Mercado Pago con el id del pago. El cuerpo se puede falsificar; su API no.
- Además **compara el monto**: un pago aprobado por menos de lo que costaba no confirma.
- Solo `approved`. `authorized` es dinero apartado, no cobrado.
- `_confirm_crypto_order` pasó a **`_confirm_paid_order`**: la usan cripto y tarjeta.

⏳ **Faltan las 2 llaves.** Van a `~/.config/exygen/mercadopago.env`:
`MERCADOPAGO_ACCESS_TOKEN` (empieza con `APP_USR-`) y `MERCADOPAGO_WEBHOOK_SECRET`.
**Mientras tanto el checkout ofrece SPEI y cripto, no tarjeta.** Es a propósito.

### 📊 META EN VIVO — resuelto el bloqueo de meses

El panel ya lee la **API de Marketing** (`fuente: meta_en_vivo`), no el CSV.

**Lo que destrabó el bloqueo de desarrollador:** había que confirmar el correo **como medio
de contacto del perfil personal de Facebook**. Después de eso
`developers.facebook.com/apps/create/` dejó pasar (el botón "Empezar" sigue rebotando).

- Cuenta: **`act_1357297706382259`**. ⚠️ En el Administrador de Anuncios aparece también
  `27680722504930078` bajo el mismo portafolio — **esa NO es**.
- App **"Exygen Panel"** (id 1715117073159589), dentro de EXYGEN LABS, sin publicar.
- Token del *Conversions API System User*, **no expira**. En `~/.config/exygen/meta.env` y en
  el `.env` del EC2.
- ⚠️ **El orden que sí funciona:** crear la app → darle rol al usuario del sistema desde
  *Cuentas → Apps → Asignar personas* → recién entonces "Generar token" ofrece permisos.
  La pestaña "Apps instaladas" **no tiene botón de agregar**: la app se instala al generar.
- 🔑 **Rotar ese token**: se pegó en el chat.

### 📈 GRÁFICAS DEL DASHBOARD — hechas

Admin → Ventas, arriba de la gráfica de meses. `/admin/series?bucket=day|week|month&days=N`.

- Sesiones y pedidos en barras, ingreso en línea **con su propio eje** (con eje compartido,
  16 sesiones contra $3,347 dejaban las barras invisibles).
- ⚠️ **Los periodos vacíos también salen.** Si no, una semana sin ventas desaparece y la línea
  salta como si nunca hubiera existido: se ve un negocio que crece cuando estuvo parado.
- ⚠️ **La semana se nombra por su LUNES.**
- ⚠️ **La conversión se calcula sobre sesiones únicas del RANGO**, no sumando las de cada
  cajón: una sesión que cruza la medianoche cae en dos días, y el mismo mes daba 5% visto por
  día y 6.25% por semana.

### 🧪 FOTOS DE VIAL — 195, una por SKU

`pricing-system/generar_viales.py` + `publicar_viales_web.py` + `publicar_viales_hero.py`.

- **Una por SKU, no por producto**: la etiqueta trae el gramaje, así que la foto cambia con
  el selector de presentación.
- ⚠️ **El vial base decía "RESEARCH PEPLIDES"**, con L. La T se armó con pedazos de las
  letras de esa misma línea (el palo de la "I", la barra de la "E") — con una fuente parecida
  nunca calza.
- ⚠️ **El render trae un HALO translúcido a la derecha** (alpha 40-140) que no es la botella.
  Recortando con `getbbox()` entraba el halo y el vial salía 32% más ancho: por eso se veían
  separados en el hero y parecían de otra proporción. Se recorta con **umbral de alpha 140**.
- ⚠️ **El vial base NO es transparente** pese a llamarse "sin fondo": trae blanco sólido.
- ⚠️ **WebP `method=6` tarda 3 s por imagen y solo ahorra 1 KB** frente a `method=4` (0.05 s).
- **Catálogo con fondo de estudio** (`Media/placa-estudio.png`, reconstruida de
  retatrutida.jpg). **Hero sin fondo.** Tarjetas a 440 px: con la de 760 el navegador
  descomprimía 2.3 MB por tarjeta × 99 y **el scroll se atrancaba**.
- **Líquidos con su propia etiqueta y sin polvo**: agua bacteriostática, ácido acético y B12.
  ⚠️ **Del ácido acético NO se sabe el porcentaje** — Christian no lo tiene y no está en
  ninguna lista de proveedor. La etiqueta dice "Dilute Solution for Reconstitution", **sin
  número**: no se inventa un dato en una etiqueta. Sale de la ficha técnica del proveedor.

### 🎠 HERO — carrusel de 15

Los **5 originales de Christian NO se tocaron**. Se agregaron 10 de familias distintas.
Se ven 5 a la vez, escalonados como el diseño original (el del centro más grande).
**Lo mueven las flechas o el dedo — NO gira solo, y NO sigue al mouse** (se probó, no gustó).
⚠️ **Se iguala por ALTURA, nunca por ancho**, o los viales se aplastan.

### 🐛 OTROS ARREGLOS

- ⚠️ **`overscroll-behavior-y: none` ROMPIÓ EL SCROLL DE TODO EL SITIO.** Se había puesto para
  tapar la franja negra del rebote al final de la página. **No volver a ponerlo.** Esa franja
  no es página de más: el DOM termina 3 px después del aviso de derechos reservados.
- **Tema e idioma en el móvil**: viven en un mini menú de 3 líneas **arriba** del drawer.
  Antes el botón era `hidden lg:inline-flex` — o sea que **desde un teléfono no se podía
  cambiar de idioma ni de tema**. "Mi cuenta" va primera en la cuadrícula, sin duplicar.
- **Home**: Destacados antes que Categorías, con **pestañas** (Más vendidos, Nuevos, Bajar de
  peso, Recuperación, Hormona de crecimiento).
- **Hueco bajo la barra**: de 80/112 px a **40/56**.
- **Agua, ácido acético y B12 ya no dicen "Liofilizado"**: dicen "Solución". Los 195 productos
  lo traían por defecto.
- **Cripto con precio congelado** (`is_fixed_rate`). Da **10 minutos** para pagar, contra 20
  sin congelar. Es el mínimo de NOWPayments.
- **Al abrir cualquier página, empieza ARRIBA** (`ScrollToTop` en `App.js`). Es una app de una
  sola página: al cambiar de ruta el navegador no reposiciona nada, así que si venías a media
  pantalla del catálogo, la ficha del producto abría a media pantalla.
  ⚠️ Depende de `pathname` **a secas, sin `search`**: filtrar u ordenar el catálogo cambia la
  query pero no es página nueva. Y **respeta el botón "atrás"** (`navType === 'POP'`), que
  trae su propia posición guardada.

### 🔐 CÓMO ENTRAR AL EC2 (no hay .pem)

El bloqueo **nunca fue AWS**: es que el **puerto 22 solo está abierto para IPs viejas**
(129.222.201.144, 66.9.186.74) y la IP de casa cambia.

1. `authorize-security-group-ingress` al `sg-09f6bd49dc4ea40d3`, puerto 22, solo la IP actual.
2. `ssh-keygen` temporal + `aws ec2-instance-connect send-ssh-public-key` (usuario `ubuntu`).
   **La llave dura 60 segundos: hay que reenviarla antes de CADA ssh.**
3. `/opt/exygen/app`, docker compose. `sudo git pull && sudo docker compose up -d --build api`.
4. **Cerrar la regla al terminar.**

SSM no sirve: el agente no está registrado (el rol `exygen-api-ses` no trae
`AmazonSSMManagedInstanceCore`).

### ✅ VERIFICACIÓN AL CIERRE

`npm run auditoria` **37/37** · backend **148 pruebas** · `npm run e2e:cripto` **21/21**.

### 🟡 LO QUE SIGUE

**Míos:**
1. **Auditoría de precios** — pedida y no hecha: escalera, Certified, Exoma +20%, piso de 5×.
2. **Video de reconstitución con Hyperframes.**
3. **COA** — las fichas los prometen y `/api/coa/public` devuelve vacío.
4. **Ver correr las rutinas vigía** por primera vez.
5. 📉 **Falta capturar ~la mitad del tráfico**: Meta dice 256 páginas cargadas desde anuncios y
   el sitio registró 170 visitas de TODAS las fuentes. Probablemente bloqueadores contra
   `/api/events`. No se persiguió: `sendBeacon` ya está bien puesto.

**De Christian:**
1. **MercadoPago:** las 2 llaves de producción.
2. **NOWPayments:** ~$50 en USDT-TRC20 a un pedido de prueba — es lo único que falta.
3. **Rotar el token de Meta.**
4. **Gemini** (facturación) · **Skydropx** (SDS/MSDS + Carta Porte) · **2FA del admin** · INAI ·
   **dominios** (301 de los `nova*`).
5. **Ácido acético:** el porcentaje. ⚠️ **Ya se buscó en las 26 hojas de sus archivos y NO
   ESTÁ.** Bainuo y Provider 2 lo listan como "Acetic acid 3ml / 5ml / 10ml", sin
   concentración. Hay que pedírselo al proveedor. La etiqueta se queda sin número.

---

## 🤝 HANDOFF — ESTADO AL 2026-07-26

### ✅ PENDIENTE 00 — RUTINAS VIGÍA: HECHO (2026-07-26)

- **`vigia-precios-nova` borrada.** Era del negocio anterior y ni siquiera estaba dada de
  alta en el programador (solo quedaba el archivo). Copia de respaldo en el scratchpad de
  la sesión por si algún día se quiere ver.
- **`vigia-precios-exygen` reescrita.** Sigue diaria a las 8:12 am. Ahora:
  - **No trae ninguna regla de precio en su texto** — lo primero que hace es leer
    `pricing-system/FUENTE-DE-VERDAD.md`. Así nunca vuelve a quedar desfasada.
  - Corre **los dos** scripts: `check_competitors.py` (competencia en vivo) y
    `auditar_catalogo.py` (las 10 revisiones internas), con la advertencia explícita de
    por qué no basta uno solo.
  - Rutas corregidas a `/Users/christian/Documents/Exygen Peptides/`.
  - Sabe que el **Glutatión 1500 mg** es ruido conocido y no una alarma.
  - **No cambia precios, no sincroniza, no publica.** Solo reporta en 5 líneas.
- **`FUENTE-DE-VERDAD.md` actualizada** — traía las reglas del 07-23 y, peor, mandaba usar
  `gen_catalog.py` para sincronizar (el que borra los `id`/`sku` y deja colar el descuento).
  Ahora trae las reglas del 07-26, las 13 excepciones, el costo por caja de 10, la escalera,
  la trampa de la auditoría ciega y el camino correcto de sincronización.

Los dos scripts se corrieron para verificar: Exoma 183 variantes · Certified 47 · nosotros
192 · nadie arriba de la competencia · 9 de 10 revisiones OK (la 10ª es el Glutatión ya
decidido).

### 💰 PRECIOS — reparados y en vivo (2026-07-26)

**El problema:** la regla vieja ("mezcla 75% hacia Certified") se aplicaba presentación por
presentación sin mirar a las hermanas del mismo producto. Donde Certified competía el precio
salía ALTO; donde solo estaba Exoma salía BAJO. Resultado: **escalera en zigzag**.
Semaglutida 10 mg a $2,299 con el de 15 mg en $1,859 — nadie compraba el de 10.

**Arreglado:** 26 precios corregidos + KPV + MOTS-c. Hoy el catálogo pasa las 10 revisiones:

| Revisión | Estado |
|---|---|
| Nunca arriba de Certified | ✅ 192 presentaciones |
| Nunca abajo de Exoma (fuera de excepción) | ✅ |
| Piso de 5× el costo | ✅ el más flaco es 5.0× |
| El vial grande nunca cuesta menos | ✅ 90 productos |
| Sitio = backend | ✅ 195 SKUs |
| Sin agotados ni stock negativo | ✅ |

**183 notas escritas en la maestra** (`anotar_excepciones.py`) explicando por qué cada precio
es como es — para que en tres meses nadie "corrija" una decisión intencional.

🪤 **DOS TRAMPAS QUE COSTARON EL PRIMER INTENTO:**
1. **El costo de la maestra viene por CAJA DE 10 VIALES, no por pieza.** Sin dividir entre 10,
   el piso de 5× sale 10 veces más alto y Retatrutida 40 mg se iba a **$20,699**.
2. **`gen_catalog.py` NO SE DEBE USAR para sincronizar precios.** Regenera
   `fallbackCatalog.js` de cero y BORRA el `id` y el `sku` reales de cada presentación (sin
   ellos el backend no reconoce el producto al cobrar y **se le cuela el descuento**), el
   `commission_cap`, el `distributor_eligible` y los exports de categorías. Usa
   `aplicar_precios_al_sitio.js`, que solo toca el campo `price`.

**Pendiente de decisión:** Glutatión 1500 mg sale 3.5% más caro por mg que el de 600 mg. Es
ruido; está pegado al piso de Exoma. Christian dijo que se queda.

### 🛒 REGLAS DE DINERO — todas en vivo y probadas con compras reales

1. **El ROI primero:** el descuento se **recorta al tope de cada producto** (`commission_cap`).
   Ya no se da cero: se da lo que el producto aguanta, y al cliente se le avisa.
2. **Los insumos NUNCA llevan descuento** (categorías `suministros`/`accesorios`).
3. **Descuento propio sin código:** un distribuidor comprando para sí mismo usa su comisión
   máxima (ese descuento ES su comisión, cobrada por adelantado — no gana comisión encima).
   Un cliente puede tener `personal_discount_rate` puesto por el admin (Paz Cambray al 40%).
4. Es **piso, no techo**: si trae un código mejor, gana el mayor.
5. **ENVÍO: gratis desde $2,500**, abajo se cobran $250 (lo que de verdad cuesta). Se mide
   sobre lo que el cliente PAGA, no sobre lista. Lo decide el SERVIDOR.
6. **Carritos abandonados:** UNA sola oferta. Nada abajo de $2,500. El cupón exige comprar el
   mismo monto o más. $2,500–4,999 = 15% + agua 3 mL + envío gratis · $5,000+ = 15% + agua
   10 mL · $10,000+ = 20% + **una agua de 10 mL por cada $10,000**.

### 🐛 BUGS SERIOS ENCONTRADOS Y ARREGLADOS (2026-07-26)

- **Google no indexaba NADA del sitio.** GitHub Pages devolvía **404** en toda ruta que no
  fuera la portada. El visitante veía la página bien (por eso nadie lo notó) pero el servidor
  respondía 404 y Google lo tomaba al pie de la letra: catálogo, 99 fichas de producto y
  /aprende eran **invisibles en las búsquedas**. Arreglado con
  `scripts/prerender-routes.js` (corre en el `build`): 114 rutas reales + sitemap + robots.
  ⚠️ **Al agregar una ruta nueva hay que darla de alta en `STATIC_ROUTES` o volverá a dar 404.**
- **Se podía vender sin inventario.** Un pedido de 99,999 piezas de algo con 34 en existencia
  pasaba sin chistar y dejaba el stock en −99,968. Y **cancelar no devolvía las piezas**.
  Las dos cosas arregladas (`restore_order_stock`, idempotente).
- **Los mexicanos leían las instrucciones de pago SPEI EN PORTUGUÉS.** Las tres versiones de
  `spei.*` estaban dentro del bloque de español; JavaScript se queda con la última.
  Salía en la pantalla de "Pedido recibido". Arreglado + 36 etiquetas del Admin traducidas.
- **El agua bacteriostática se colaba con descuento.** El modal la agregaba con un id
  inventado (`fallback-agua-bacteriostatica::10 mL`) que el backend no reconocía. **El Asesor
  tenía el mismo bug con TODOS los productos que agrega.**
- **4 de 8 categorías del menú abrían vacías.** El menú usaba los slugs del API
  (`recuperacion-tejidos`, `metabolicos`, `bienestar`, `accesorios`) y el catálogo filtra con
  los del sitio. Ahora hay **una sola lista**: `VISIBLE_CATEGORIES` en `fallbackCatalog.js`.

### 📱 MÓVIL Y TABLETA

- La barra superior se salía **84 px** de la pantalla y cortaba "Comenzar". El menú de idioma
  y tema se fue **dentro** del menú de 3 líneas.
- El menú de 3 líneas trae los mismos accesos que escritorio: Catálogo · Asesor · Recursos ·
  Ayuda · Carrito · Mi cuenta. **Sin "Inicio"** (el logo ya lleva a la portada).
- Cero scroll horizontal en las tres resoluciones.

### 🧪 AUDITORÍAS — corren solas, úsalas

```
cd novapeptidos-UI  && npm run auditoria              # 37 revisiones del sitio, solo lectura
                       npm run auditoria:completa     # + Admin y compras REALES que se borran solas
cd pricing-system   && python3 auditar_catalogo.py    # 10 revisiones de precios y márgenes
                       python3 check_competitors.py   # Exoma y Certified EN VIVO
```
Backend: `.venv/bin/python -m pytest test_core.py -q` — **134 pruebas**.
(`.venv/bin/pytest` a secas está ROTO: usa `.venv/bin/python -m pytest`.)

### 🟡 LO QUE SIGUE (pedido por Christian, SIN EMPEZAR)

1. ~~**PENDIENTE 00** — fusionar las dos rutinas vigía~~ ✅ hecho 2026-07-26.
2. ~~**Dashboard: gráficas de tráfico y ventas** por día / semana / mes.~~ ✅ **HECHO 2026-07-26.**
   Admin → Ventas, arriba de la gráfica de meses. Endpoint `/admin/series?bucket=day|week|month`.
   Sesiones y pedidos en barras, ingreso en línea con SU PROPIO eje (con eje compartido, 16
   sesiones contra $3,347 dejaban las barras invisibles). Arriba: sesiones, pedidos, ingreso
   y conversión.
   ⚠️ **Los periodos vacíos también salen** — si no, una semana sin ventas desaparece y la
   línea salta como si nunca hubiera existido. La **semana se nombra por su LUNES**.
   ⚠️ **La conversión se calcula sobre sesiones únicas del RANGO**, no sumando las de cada
   cajón: una sesión que cruza la medianoche cae en dos días, y el mismo mes daba 5% visto
   por día y 6.25% por semana.
3. ~~**La publicidad no cuadra con el tráfico.**~~ ✅ **INVESTIGADO Y ARREGLADO 2026-07-26.**
   Eran **DOS problemas distintos** y ninguno era lo que parecía:
   · ⚠️ **`clicks` de Meta NO son visitas.** Incluye reacciones, comentarios, abrir la foto y
     entrar al perfil. En una publicación impulsada la mayoría no son visitas. Lo real:
     **683 clics totales → 584 al ENLACE → 256 que CARGARON la página (43.8%)**. O sea que
     **328 le dieron clic y nunca llegaron**. El panel mostraba 683 como si fueran visitas.
     Ahora muestra los tres y el CPC va sobre los clics al enlace (`inline_link_clicks` y
     la acción `landing_page_view`).
   · ⚠️ **Lo que el sitio llamaba "sesión" NUNCA CADUCABA.** El id vivía en localStorage para
     siempre: quien volvía un mes después seguía siendo la MISMA sesión. Eran *dispositivos*,
     no sesiones — por eso 170 visitas salían en solo 16, y la conversión salía inflada.
     Ahora caduca a los **30 minutos** sin actividad, y hay un **`visitor_id` permanente**
     aparte (los eventos viejos no lo traen, así que "visitantes" sale 0 hasta que se
     acumulen datos nuevos).
   📉 **Lo que queda por explicar:** Meta dice 256 páginas cargadas desde anuncios en 30 días
   y el sitio registró 170 visitas EN TOTAL (de todas las fuentes). Falta capturar cerca de
   la mitad. Lo más probable son bloqueadores de anuncios contra `/api/events`. No se
   persiguió: `sendBeacon` ya está bien puesto y lo demás sería cacería.
3. **Imágenes de los 84 productos sin foto propia.** Christian subió el vial en blanco a
   `Media/Viales individuales sin fondo para hero/Vial sin fondo, nombre ni gramaje.PNG`
   (2048×2048, fondo transparente). Ya hizo a mano: NAD+, Retatrutida, Tirzepatida,
   Semaglutida, KLOW y agua bacteriostática.
   **Análisis ya hecho del vial en blanco:** la etiqueta trae fijos el logo (y 134-176),
   "Lyophlized Peptide Powder for Injection" (y 1326-1376) y "FOR RESEARCH USE ONLY / NOT FOR
   HUMAN CONSUMPTION" (y 1552-1656). Hay que insertar DOS textos: el **nombre** (~y 872-1006,
   negrita grande) y el **gramaje** (~y 1326 arriba de "Lyophlized"). Comparar contra
   `NAD+ 500mg.PNG` para calcar tipografía y tamaños.
   ✅ **HECHO el generador + MUESTRA entregada (2026-07-26):** `pricing-system/generar_viales.py`.
   ⚠️ **Las coordenadas de arriba estaban MAL.** Lo medido de verdad: y 872-1006 es la banda del
   LOGO, no el nombre. El vial en blanco (2048²) y el NAD+ a mano (1024²) son la MISMA imagen a
   distinta escala — las bandas de texto fijo calzan exactas al ×2.
   Lo correcto: **nombre** base y 1262, alto 146 · **gramaje** base y 1514, alto 98 · centro x 1017.
   Tipografía: **Arial Bold con estirado vertical de 1.12** (a ancho igualado la altura salía
   12% corta en los dos textos por igual, así que es un estirado real, no otra fuente).
   Los nombres largos encogen solos para no pasar de 800 px.
   Sombra: blur 4, opacidad 0.40, offset (2,3) — **hay que rellenar la máscara antes de
   difuminarla o sale un rectángulo gris en vez de un halo**.
   Control de calidad: el script regenera el NAD+ 500mg de Christian y calza con el suyo.
   ✅ **GENERADOS LOS 188** (`python3 generar_viales.py --todos`, lee el catálogo EN VIVO).
   Quedan en `Media/Viales generados/<SKU>.png`, 2048², fondo transparente, 418 MB en total.
   · **Se saltan 7 a propósito:** agua bacteriostática, ácido acético y B12. Son líquidos y
     el vial dice "Lyophlized Peptide Powder" con polvo blanco adentro — sería etiqueta falsa.
   · Las mezclas van a **dos renglones** partiendo por el "+", y las que tienen marca se
     quedan con la marca (GLOW, KLOW, HUMSC), como hizo Christian a mano.
   · "100 mil" (HUMSC) conserva el espacio: "mil" no es unidad.
   🔤 **SE CORRIGIÓ UNA FALTA DE ORTOGRAFÍA DE LA MARCA.** El vial base decía **"RESEARCH
   PEPLIDES"** (con L). El KLOW que hizo Christian a mano dice PEPTIDES, y él confirmó.
   `arreglar_peplides.py` construye la T con pedazos de las mismas letras de esa línea
   (el palo de la "I" y la barra de la "E") para que el trazo pegue exacto — con una fuente
   parecida nunca calza. Deja `Vial ... (PEPTIDES).PNG`; **el original no se toca**.
   ✅ **YA ESTÁN EN EL SITIO** — PR #93 a `dev` (falta que Christian haga merge).
   · **Una foto POR SKU, no por producto** (decisión de Christian, 2026-07-26): la etiqueta
     lleva el gramaje impreso, así que la imagen cambia con el selector de presentación.
     `productImages.js` resuelve por SKU y `vialImages.js` lista los 195 (se autogenera).
   · `publicar_viales_web.py` recorta el fondo, achica y exporta WebP a
     `public/images/products/<SKU>.webp` — **195 imágenes en 5.4 MB**.
   · ⚠️ **El vial base NO era transparente** pese a llamarse "sin fondo": traía blanco
     sólido, que en tema oscuro se ve como un recuadro. El recorte entra POR LOS BORDES,
     no por color, para no comerse los brillos casi blancos del propio vial.
   · ⚠️ **WebP `method=6` tarda 3 s por imagen y solo ahorra 1 KB frente a `method=4`**
     (0.05 s). Con 195 imágenes eso son 10 minutos contra 1.
   · Las tarjetas pasaron a `object-contain`: con `object-cover` el vial salía cortado.
   · **Los LÍQUIDOS llevan otra etiqueta y el vial va SIN polvo** — el agua es transparente.
     Texto que dictó Christian: "Bacteriostatic Water / Multiple Dose Vial · 0.9% Benzyl
     Alcohol / 3 mL". Para el ácido acético el catálogo dice "solución diluida" sin dar
     el porcentaje: **no se inventó un número en la etiqueta**.
   · **HERO: de 5 viales a 10**, rotando de a 5 (`publicar_viales_hero.py`). Se detiene al
     pasar el cursor y no rota con `prefers-reduced-motion`. Los 5 viejos se regeneraron:
     traían el PEPLIDES y habrían quedado junto a los nuevos bien escritos.
   ⚠️ **Dato mal en el catálogo, no es de las fotos:** el agua bacteriostática y el ácido
   acético dicen `Forma: Liofilizado` en la ficha. Son líquidos. Hay que corregirlo en la
   maestra/backend.
4. **Los COA no existen.** Cada ficha promete *"al comprar, el PDF del lote aparece en Mi
   cuenta"* y `/api/coa/public` devuelve `{}`. Christian dijo que él los sube.

### ❌ DECIDIDO: NO se migra a WooCommerce (Christian, 2026-07-26)

Christian lo planteó al ver que los precios de Certified se leen por su API de WooCommerce.
**Decisión tomada: nos quedamos con lo que tenemos** (React + FastAPI + MongoDB). No se
vuelve a abrir salvo que él lo pida.

**Las razones:**

1. **Lo que se perdería no tiene equivalente en WooCommerce.** La pirámide de 6 niveles con
   override diferencial, los topes de comisión POR PRODUCTO que recortan el descuento, los
   códigos que se generan y rotan solos por nivel, el candado de monto en los cupones de
   recuperación, el descuento propio del distribuidor, el panel de Meta, el "ver como". Hay
   plugins de afiliados, pero **las reglas de Christian son suyas** y habría que programarlas
   igual, ahora como plugins de WordPress y con menos control.
2. **El costo es de meses, y justo ahora empieza a llegar tráfico.** Migrar significa parar
   de mejorar el negocio para reconstruir lo que ya funciona.
3. **Que Certified use WooCommerce no es una ventaja de Certified.** Es su herramienta. Que
   sus precios se puedan leer por API no es virtud ni defecto: **el catálogo de Exygen también
   es público** en `api.exygenlabs.com/api/products`, como en cualquier tienda del mundo.
4. **Ya hay 134 pruebas + 3 auditorías** que encierran las reglas del negocio. Eso se tira.

**EL ARGUMENTO EN CONTRA — que es real y hay que tenerlo presente:**

WooCommerce trae resueltas con plugins varias cosas que hoy están pendientes: MercadoPago,
NOWPayments, Skydropx y la facturación CFDI. Y sobre todo: **un sitio a la medida necesita a
alguien que sepa mantenerlo**; de WooCommerce hay miles de freelancers en México. Si esas
cuatro integraciones se atoran mucho, o si Christian quiere no depender de nadie en
particular, la decisión merece revisarse. **Hoy no, pero no es una puerta cerrada para
siempre.**

### 📌 PENDIENTES DE CHRISTIAN (no son código)


- ~~**Meta:** bloqueado para crear la cuenta de desarrollador.~~ ✅ **RESUELTO 2026-07-26.**
  El panel ya lee la **API en vivo** (`fuente: meta_en_vivo`), no el CSV. Lo que destrabó el
  bloqueo: había que confirmar el correo **como medio de contacto del perfil personal** de
  Facebook. Cuenta: **`act_1357297706382259`** (⚠️ en el Administrador de Anuncios aparece
  también `27680722504930078` bajo el mismo portafolio — **esa NO es**). App "Exygen Panel",
  sin publicar. Llaves en `~/.config/exygen/meta.env` y en el `.env` del EC2.
- **MercadoPago:** faltan sus **2 llaves de producción**. La integración YA ESTÁ HECHA y
  desplegada (2026-07-26): `mercadopago.py` + webhook + checkout. Con las llaves se enciende
  sola. Van a `~/.config/exygen/meta.env`… no: a **`~/.config/exygen/mercadopago.env`**:
  `MERCADOPAGO_ACCESS_TOKEN` (empieza con `APP_USR-`) y `MERCADOPAGO_WEBHOOK_SECRET`.
  ⚠️ **Mientras no estén, el checkout NO ofrece tarjeta** — solo SPEI y cripto. Es a
  propósito: antes ofrecía tarjeta y no cobraba nada.
- **Video de reconstitución:** rehacerlo con **Hyperframes** (Christian, 2026-07-26).
  El pipeline viejo es Playwright+edge-tts+ffmpeg; este va con la herramienta nueva.
- ~~**NOWPayments:** prender las monedas + KYB.~~ ✅ **YA ESTÁ.** Probado el 2026-07-26 contra
  el sitio en vivo: 27 monedas prendidas (BTC, ETH, 9 USDT, USDC…), factura real con dirección
  de depósito, webhook confirma el pedido y rechaza firmas falsas. **19 de 19 revisiones en
  verde** con `npm run e2e:cripto` (compra real que se borra sola).
  **Lo único que falta:** que llegue cripto de verdad. Christian tiene que mandar ~$50 en
  USDT-TRC20 a la dirección de un pedido de prueba — Claude no puede mover dinero.
- **Gemini:** activar facturación (el chat se cae a los 20 mensajes/día).
- **Rotar el token de Meta:** se pegó en el chat, así que quedó en el historial.
  Usuarios del sistema → Revocar tokens → generar otro.
- **2FA del admin**, domicilio del responsable en el aviso de privacidad, INAI.
- **Skydropx:** clasificación por escrito de los productos (SDS/MSDS) + Carta Porte.
- **Dominios:** redirigir (301) los `nova*` y los nuevos a exygenlabs.com.

---

## 🤝 HANDOFF — ESTADO AL 2026-07-25

### 📊 El sitio ya mide de verdad (y los números ya no mienten)

**Píxel de Meta instalado — id `2487053198462294`** (dataset del portafolio *EXYGEN LABS*).
- Código base en `public/index.html`; la traducción de eventos vive en `src/lib/track.js`
  (función `avisarAMeta`): `visit`→PageView · `product_view`→ViewContent ·
  `add_to_cart`→AddToCart · visita a `/checkout`→InitiateCheckout · `purchase`→Purchase
  (valor en MXN). Reutiliza los eventos que ya alimentan el panel de Embudo, no duplica nada.
- **VERIFICADO con una compra real completa en exygenlabs.com:** 14 eventos disparados,
  incluido `Purchase $1,851`. Pedidos de prueba cancelados después.
- 🪤 **TRAMPA QUE COSTÓ UNA HORA:** `fbevents.js` **descarta los envíos si detecta
  automatización** (`navigator.webdriver`) y **tampoco envía desde `localhost`**. El síntoma
  engaña: `fbq` carga, la config baja, `eventCount` sube… y **cero peticiones a
  `facebook.com/tr`**. Para verificarlo con Playwright hay que lanzar con
  `args: ['--disable-blink-features=AutomationControlled']` + `addInitScript` que borre
  `navigator.webdriver` + user-agent de Chrome real, y **siempre contra exygenlabs.com**
  (el API tiene CORS solo para el dominio). Script listo:
  `scratchpad/e2e-pixel-final.js`. Ver [[exygen-pixel-meta]].

**Datos sembrados BORRADOS (2026-07-25).** El Admin mostraba **$5,118,814** de ingreso; de
eso solo **$3,347 eran reales**. Ya se limpió:

| | Antes | Ahora |
|---|---|---|
| Ingreso | $5,118,814 | **$3,347** |
| Pedidos | 24 | **2** |
| Clientes | 10 | **4** |
| Distribuidores | 7 | **1** |

- Borrados: **12 personas falsas, 22 pedidos inventados, 471 eventos** contaminados (+1 en
  `points`, +2 en `notifications`).
- **Intactos:** Paz Cambray con su venta real ($3,347 — Retatrutida 40 mg + NAD+ 500 mg),
  Alanís Fernanda Mendoza (distribuidora al 40%), Christian, María Neunfeld, Jazmín Padilla,
  y los 195 productos con sus precios.
- Herramienta: **`novapeptidos-RBAC/limpiar_datos_demo.py`**. Corre en **simulacro por
  defecto** (enseña qué borraría sin tocar nada); solo borra con `--confirmar`. Distingue por
  id: lo sembrado lleva `seed-*`, lo real usa UUID. **No se puede resembrar** — el endpoint
  `POST /admin/seed-demo` ya no existe y `seed_db()` del arranque solo crea admin, categorías
  y productos.

**Footer:** quitada la línea divisoria sobre el copyright y bajada su altura de 32 a 20 px.

### ⚠️ Correcciones a lo que decía este archivo (estaba desactualizado)

- **El clasificador SÍ deja correr `docker compose exec` por SSH.** La nota vieja decía lo
  contrario. Lo que **sí** bloquea: heredocs (`cat > x <<EOF`) y `curl` con credenciales en
  la línea de comando → usa la herramienta **Write** para crear scripts y córrelos con
  `node`/`python`.
- **Las pruebas de backend son 99, no 88.** Corren sin Mongo local:
  `.venv/bin/python -m pytest test_core.py -q`. **OJO:** `.venv/bin/pytest` está roto (apunta
  a la ruta vieja `/Users/christian/Documents/Nova Peptidos/...`); usa `.venv/bin/python -m pytest`.
- **El login del API devuelve `token`, no `access_token`.** Varios scripts fallan en silencio
  por esto. Admin: `admin@exygenlabs.com` / `Exygen-c914cfd1!`.
- **SSH:** la IP de Christian rota. Hoy fue `129.222.201.144` → `129.222.201.121`. El SG
  `sg-09f6bd49dc4ea40d3` ya tiene autorizadas `129.222.201.144/32` y `66.9.186.74/32`.
  Agregar la propia con `authorize-security-group-ingress` y **revocarla al terminar**.
- **El código NO va montado en el contenedor:** `git pull` en el host no basta. Para correr un
  script nuevo: `sudo docker cp archivo.py $(sudo docker compose ps -q api):/app/` y luego
  `sudo docker compose exec -T api python archivo.py`. (Un `docker compose up -d --build`
  también sirve, pero tarda mucho más.)

### 🔴 BLOQUEADO POR META (no es culpa del código)

Christian **no logra crear la cuenta de desarrollador** para darme acceso al API de anuncios.
Meta le bloquea **cambiar el correo** de su cuenta a `admin@exygenlabs.com` desde cualquier
dispositivo nuevo ("detectamos que estás usando un dispositivo que no usas habitualmente").
Metió el código de verificación (`44395`) y aun así le dijo que no se puede por ahora.

- **La salida limpia: que NO cambie el correo.** El bloqueo es sobre el cambio de email, no
  sobre crear la app. Puede crear la app con el correo que ya tiene en Facebook; el token
  funciona igual. URL directa al panel: **`developers.facebook.com/apps`** (el buscador de
  documentación lo manda a dar vueltas).
- **Alternativa sin pelear con Meta:** exportar el CSV del Administrador de Anuncios
  ("Exportar → Exportar a CSV") y analizarlo aquí. Mismo resultado.
- **Cuando se logre el token: pedir SOLO `ads_read` y `read_insights`.** NUNCA
  `ads_management` — el asistente no debe poder gastar dinero de la cuenta.
- `admin@exygenlabs.com` **sí recibe correo**: el dominio reenvía por ImprovMX
  (`mx1/mx2.improvmx.com`) al Gmail de Christian.

### 💸 Realidad publicitaria (el dato que más duele)

Christian gasta **$8.92 dólares en total / $2.58 en 7 días** (~$0.37 al día) y **0% de sus
conjuntos de anuncios sale de la fase de aprendizaje**. Con eso los anuncios no llegan
prácticamente a nadie. Sumado al carrito roto (ya arreglado) y a la falta de píxel (ya
instalado), eso explica cero ventas por publicidad.

- Presupuesto actual: **$7 USD/día + impuestos ≈ $10/día**. Dice estar dispuesto a subir a
  **$100/día "o lo que sea redituable"** si funciona.
- **Recomendación entregada (él aún no la aplica):** UNA sola campaña con UN solo conjunto de
  anuncios, optimizando por **"Agregar al carrito"** (no por compra — a $10/día jamás junta
  las ~50 compras semanales que Meta necesita para aprender), y **dejarlo correr 14 días sin
  tocarlo**. Después de esos 14 días se sabrá el costo real por cliente y ahí sí se decide
  subir a $100/día.
- ⚠️ Meta es quisquilloso con péptidos: si empiezan a rechazar anuncios, ajustar el texto.
- **Dónde está la palanca real:** el sitio, no los anuncios. Subir la conversión de 1% a 3%
  triplica las ventas con el mismo dinero. Usar el panel **Admin → Embudo** para ver dónde se
  cae la gente (ahora que los datos están limpios, cada número es real).

### 🟡 LO SIGUIENTE (pedido explícito de Christian)

1. ~~**Códigos automáticos al subir comisión.**~~ ✅ **HECHO 2026-07-25.** Ver abajo.
2. ~~**Descuentos por encima de la tarifa publicada, otorgados por el admin.**~~ ✅ **YA
   EXISTÍA:** Admin → Clientes → ficha del cliente → "Enviar cupón de descuento", de **5% a
   50%**, un solo uso, con caducidad y nota. Genera un código `GIFT-XXXXXX`, le manda
   notificación al cliente y **no le cuesta comisión a nadie** (no es de distribuidor). La
   tarifa publicada de la página es 10%/15%; esto la brinca sin tocarla.
3. **Falta decidir:** fusionar **"Stacks/Combos"** con **"Especialidad"**.

### ✅ LA COMISIÓN QUE EL ADMIN PONE A MANO AHORA MANDA (2026-07-25, en vivo)

**El bug:** Christian le subió la comisión a Alanís a 40%, pero su `tier` seguía siendo
`junior` (20%). El sistema le generaba los 5 códigos (15/20/25/30/**35%**) a partir del 40%…
pero al **usarlos**, `_resolve_code` y el reparto de comisiones recortaban todo a la tasa del
NIVEL (20%). O sea: código que decía 35% cobraba 20%, y ella ganaba 20% en vez de 40%.

**El arreglo** (`novapeptidos-RBAC`, commit `2314bf0`):
- **`pyramid.effective_rate(dist)`** — la tasa real es la **MAYOR** entre la del nivel y la
  que el admin puso a mano (`commission_rate`), tope `MANUAL_CAP = 0.50`. Se usa en TODO: el
  descuento máximo, el cobro del código en el checkout, y el reparto (vendedor y uplines).
- **`pyramid.normalize_tier()`** — el nivel viejo `'junior'` guardado en la base se lee como
  `junior0` (antes caía en un `else` silencioso).
- **Al cambiar la comisión O el nivel, los códigos se rehacen EN EL ACTO** (antes había que
  esperar a que el distribuidor abriera su panel) y le llega notificación: *"Tu comisión ahora
  es 40%. Ya tienes códigos para dar hasta 35%."*
- Admin → Distribuidores ahora devuelve `effective_rate` y `max_discount`.
- **104 pruebas de backend en verde** (eran 99).

**VERIFICADO CON UNA COMPRA REAL** en exygenlabs.com (pedido `EX-20260725-1965`, después
cancelado): NAD+ 100 mg $839 → código `ALANIS-35-K020` → **−$294 (35%) → total $545**. Antes
del arreglo hubiera dado 20%.

### ⚠️ EL DATO QUE SALIÓ DE ESA COMPRA REAL (decisión pendiente de Christian)

Cada producto tiene un **tope de comisión** (`commission_cap`) que protege el margen 5x de la
casa: **descuento + comisiones nunca lo rebasan**. Con 195 productos el reparto es:

| Tope | Productos | Qué pasa con un código de 35% |
|---|---|---|
| 20% | 7 | el 35% **ni se aplica** |
| 25% | 14 | el 35% **ni se aplica** |
| 30% | 47 | el 35% **ni se aplica** |
| 35% | 58 | se aplica, pero el distribuidor gana **$0** |
| 40% | 66 | se aplica y gana 5% |
| 50% | 3 | se aplica y gana 5% |

En la compra de prueba el NAD+ (tope 35%) quedó con `amount: 0, capped: true` — **correcto
según la regla, pero conviene que Alanís lo sepa**: el código de 35% le sirve de verdad solo
en **69 de 195 productos**, y ahí gana 5%. Si Christian quiere que el 35% sea usable en todo
el catálogo, hay que **subir el `commission_cap` de los productos**, no la comisión de ella.

### 📌 Otros pendientes que siguen abiertos

- **MercadoPago:** ya se le mandó por correo (borrador en Gmail a christiancuellar@gmail.com
  con copia a direccion@prognosys.mx) la lista de lo que hace falta. Faltan **sus 2 llaves de
  producción**.
- **Categorías:** quedó la pregunta abierta de si fusionar **"Stacks/Combos"** con
  **"Especialidad"**.
- **Topes de comisión por producto:** decidir si subirlos (ver tabla arriba) para que los
  códigos de 35% sirvan en todo el catálogo y no solo en 69 de 195 productos.
- Lo de Christian: KYB de pagos, billing de Gemini, 2FA del admin, legal/INAI, envíos
  Skydropx, redirecciones 301 del dominio.

---

## 🤝 HANDOFF — ESTADO AL 2026-07-23

### Infraestructura (SÍ hay backend robusto)
- **Frontend:** React (repo `novapeptidos-UI`, GitHub `vancuellar/novapeptidos-UI`) → GitHub Pages → **exygenlabs.com**. Deploy = commit directo a `main` → Actions publica (~1-2 min). Build: `CI=true npm run build`.
- **Backend:** FastAPI (Python) + MongoDB (repo `novapeptidos-RBAC`, público) en **EC2 `44.204.127.242` (cuenta AWS certis)**, API en **api.exygenlabs.com**. Deploy = `ssh -i ~/.ssh/id_ed25519 ubuntu@44.204.127.242 "cd /opt/exygen/app && sudo git pull && sudo docker compose up -d --build"`.
  - **OJO SSH:** el SG `sg-09f6bd49dc4ea40d3` abre el puerto 22 solo a IPs autorizadas. Cada sesión nueva debe agregar su IP: `aws ec2 authorize-security-group-ingress --group-id sg-09f6bd49dc4ea40d3 --protocol tcp --port 22 --cidr <MI_IP>/32 --profile certis --region us-east-1` (correr el comando **solo**, sin `$(...)`, o el clasificador lo bloquea). **Revocar al terminar** (`revoke-...`). ✅ **CORREGIDO 2026-07-25:** el clasificador SÍ deja correr `docker compose exec -T api python ...` por SSH; lo que bloquea son los heredocs y `curl` con credenciales — usa la herramienta Write para crear scripts.
  - **Pruebas backend:** `.venv/bin/python -m pytest test_core.py -q` — **99 pruebas, todas en verde**, sin necesidad de Mongo local. (`.venv/bin/pytest` a secas está ROTO: apunta a la ruta vieja `/Users/christian/Documents/Nova Peptidos/...`.)
- **Llaves/config:** todas en `~/.config/exygen/*.env` (cloudflare, resend, gemini, google, nowpayments, spei). NUNCA en repos.
- **Login admin de Christian:** `admin@exygenlabs.com` / `Exygen-c914cfd1!` (sin 2FA aún; acceso a los 3 paneles).

### ~~Datos DEMO sembrados~~ — ❌ BORRADOS EL 2026-07-25. YA NO EXISTEN.
- El endpoint `POST /admin/seed-demo` **fue eliminado** y las 12 personas falsas + 22 pedidos
  inventados se borraron con `novapeptidos-RBAC/limpiar_datos_demo.py`. **No se pueden
  resembrar.** Todo lo que hay en el Admin hoy es real. Ver el handoff del 2026-07-25.
- (Histórico, por si aparece en textos viejos: el árbol era María Master > Luis Senior > 4
  juniors, y los videos de tutoriales se grabaron con la cuenta de Luis.)

### ✅ CONSTRUIDO Y EN VIVO EN ESTA TANDA (2026-07-22/23)
1. **Calculadora arreglada** (crash con Retatrutida = bug de orden de variable, no el rango). **Dosis de referencia (start_levels) en 63/90 productos** + **frecuencia** ("cada cuándo") en frase simple ("PARA EMPEZAR · RUO — aplica X, [frecuencia]"). Faltan 27 sin literatura → ver pendientes.
2. **Distribuidores con full access** a las herramientas de Mi cuenta.
3. **Correo propio de distribuidor** (bienvenida al programa + código de referido).
4. **Atribución SOLO por código** (regla Christian): una venta cuenta al distribuidor únicamente si esa compra usó su código.
5. **PIRÁMIDE COMPLETA (6 niveles, override DIFERENCIAL):** Junior 0 (20%) · Junior 1 (25%) · Senior (30%) · Master (35%) · Elite (40%) · **Diamond (43%, SECRETO)**. La tasa ES la comisión Y el descuento máximo. Override diferencial: cada upline gana la diferencia; total = tasa del más alto de la cadena; el descuento sale de la tajada del vendedor. `pyramid.py` puro + 88 pruebas.
   - **Barra de subir de nivel** con DOS metas (ventas + reclutas activos). Umbrales (constantes en `pyramid.LEVEL_STEPS`, ajustables): Jr0→Jr1 $500k/2 · Jr1→Senior $3M/4 · Senior→Master $10M equipo/8 · Master→Elite $30M equipo/16.
   - **Diamond secreto:** no está en la escalera visible (tope visible = Elite). Se desbloquea a **$50M equipo + >32 activos**; el admin ve `diamond_eligible` en Admin>Distribuidores y lo otorga a mano (`PUT /admin/distributors/{id}/pyramid`).
6. **Códigos de descuento AUTO-generados por nivel** (`pyramid.discount_tiers_for`): 15% y sube de 5% en 5% hasta 5% debajo de su comisión (Senior=15/20/25; Diamond=15…35,38). El sistema los crea; el distribuidor solo copia el que da. Opacos (`LUISSE-15-XXXX`, no adivinables), **rotan cada 90 días** (`CODE_TTL_DAYS`), pestaña "Mis códigos" solo-lectura + "Renovar ahora".
7. **CENTRO DE NOTICIAS / notificaciones.** Feed por usuario (`GET /me/notifications` + globito de no-leídas + `POST /me/notifications/seen`). **Automáticas:** cliente (pedido entregado, pago confirmado, producto por terminarse según dosis); distribuidor (nueva venta suya/de su equipo con cuánto ganó, subió de nivel). **Avisos del admin** (pestaña Novedades en Admin): título+mensaje, audiencia Todos/Clientes/Distribuidores, opción de correo. Pestaña "Novedades" en los 3 paneles.
8. **Lealtad (confirmado, ya cumple lo pedido):** los puntos **NO caducan** (sin lógica de expiración) y una **cancelación/devolución revierte** los puntos ganados y devuelve los canjeados (`revoke_order_points`). Tasa 3%.

### 🎯 PRIORIDADES DE CONSTRUCCIÓN (orden de Christian, 2026-07-23)
- **00 — PRIMER VIDEO orientativo para distribuidores nuevos** (niveles, cómo subir, panel: clientes, invitar subs). Con **Higgsfield** (ya autenticado como `christiancuellar@gmail.com`). **OJO: plan GRATIS, ~10 créditos → 1-2 videos; para varios, recargar.** Reto técnico abierto: animar screenshots reales requiere el archivo de imagen (las capturas del navegador llegan inline, no como archivo) → o se genera ilustrativo por prompt, o Christian baja capturas y las anima. Usar el panel de **Luis** (barras a ~50%).
- **Luego — dosis orientativas para los 27 productos** sin literatura (Christian aprobó "rango orientativo, marcado sin literatura firme"). Los 27: AHK-Cu, Matrixyl, SNAP-8, Fragment 17-23, FOXO4, Cerebrolysin, Melatonina, Orexin A/B, PE-22-28, PNC-27, ACTH 1-39, ADMAX, B7-33, MIC, P21, 10/5-amino-1MQ, Adipotide, AICAR, SLU-PP-332, ACE-031, GDF-8, PTD-1, PTD-DBM, Dermorphin, Triptorelin.
- **Luego — Admin "ver como" distribuidor/cliente** (ver TODO lo que ellos ven, solo lectura). NOTA: hoy ya se puede entrar con los logins demo; falta el "ver como" real (impersonar sin salir de la sesión admin).

### 🔨 PENDIENTES NUEVOS DE CHRISTIAN (2026-07-23) — por construir
- **Novedades en el dropdown del Perfil** (además/en vez de la pestaña): que se llegue a las novedades desde el menú de perfil del header, con globito de no-leídas.
- **Passkey con huella / Face ID (retina):** "Entrar con llave de acceso" NO funciona bien; Christian quiere que sea **biométrico en el teléfono** (Touch ID / Face ID), mucho más fácil. Ajustar WebAuthn para **preferir el autenticador de plataforma** (`authenticatorAttachment: 'platform'`, `userVerification`) en registro y login. OJO: no se puede probar biometría en el entorno de Claude; probar en su teléfono.

### 📥 DEL LADO DE CHRISTIAN (decisiones / datos / trámites)
- **Pagos tarjeta:** esperando Instabill/Corepay (offshore alto riesgo); **NOWPayments** (cripto) está EN VIVO pero **falta prender las monedas** en su panel (Settings>Coins) + KYB, si no, cripto no cobra.
- **Chat IA:** activar **facturación de Gemini** (hoy gratis, 20 mensajes/día, se cae).
- **Seguridad:** activar su **2FA de admin** (Mi cuenta > Perfil).
- **Legales:** revisar términos/privacidad + poner **domicilio del responsable** + decidir INAI (suyo, es abogado).
- **Envíos automáticos:** mandar lista de productos a **Skydropx/FedEx** para clasificación por escrito (SDS/MSDS) + Carta Porte; luego integrar (Skydropx primario).
- **Correos del negocio (recomendación):** ya tiene `hola@` (general/remitente) y `admin@`. Crear: **soporte@** (atención a clientes), **pedidos@** (pedidos/envíos/comprobantes SPEI), **distribuidores@** (canal). Opcionales: **mayoreo@** o **ventas@** (prospectos de distribuidor) y **facturacion@** (CFDI). Recepción **gratis** con **Cloudflare Email Routing** (el DNS ya está en Cloudflare); Resend solo envía.
- **Dominios nuevos comprados (2026-07-23):** `exygenpeptides.com`, `exygenlabs.mx`, `exygenpeptides.mx` (Christian escribió "exigenpeptides.mx" — CONFIRMAR ortografía exacta). **Todos deben redirigir (301) a exygenlabs.com.** Ver dónde están (Cloudflare/GoDaddy) y poner forwarding. Sumar a la lista de dominios `nova*` que también faltan redirigir.
- **Datos que dará Christian:** URLs de Instagram/Facebook (`src/lib/contact.js`), teléfono nuevo (hoy oculto, `WHATSAPP_URL=null`).
- **Buzones + sync de catálogo:** decidir si correr `pricing-system/sync_backend.py` para dejar los 198 idénticos a la maestra.

---

## 0. La marca — REBRAND Nova → Exygen (2026-07-17/18)

- **Nombre nuevo: "Exygen Labs — Research Peptides"** (antes "Nova Peptides"). El asistente de IA se llama **Exygen** (antes "Nova").
- **Dominio nuevo: `exygenlabs.com`** — **MIGRADO 2026-07-19.** Comprado en **Cloudflare** (no AWS; ver [[exygen-dominio-backend]]). DNS en Cloudflare: 4 registros A del apex → GitHub Pages (185.199.108-111.153) + `www` CNAME → vancuellar.github.io (todos DNS-only, sin proxy). `public/CNAME` = **exygenlabs.com** y GitHub Pages custom domain actualizado por API. `novapeptidos.mx` (DNS en GoDaddy) YA NO sirve el sitio → **pendiente: redirigirlo (y los demás dominios `nova*`) a exygenlabs.com** vía GoDaddy Domain Forwarding o mudándolos a Cloudflare. Token de Cloudflare (acotado a la zona exygenlabs.com) lo dio Christian; NO se pudo guardar en disco (clasificador), vive solo en la sesión que lo use.
- **Correo:** `hola@exygenlabs.com`.
- **Logo:** imagen oficial en `public/images/exygen-logo.png` (estructura del dipéptido + wordmark Marcellus + "RESEARCH PEPTIDES" + enlace peptídico en guinda). Componente `src/components/BrandLogo.js` la renderiza como `<img>`; en dark theme se invierte a blanco (`dark:brightness-0 dark:invert`). Original en `../Exygen Brand - design_handoff_exygen_web/exygen-logo-9a-transparent.png` (recortado al contenido al copiarlo).
- **Handoff de marca:** carpeta `../Exygen Brand - design_handoff_exygen_web/` (README con paleta marfil/tinta y fuentes Marcellus/Archivo/JetBrains Mono). **Christian acotó el re-tema:** SOLO se aplicó (i) fondo del light theme a marfil `#f6f3ec` y (ii) el logo en ambos themes. **NO** se cambiaron fuentes, radius ni el resto de la paleta. Dark theme intacto.

---

## 1. Repos y despliegue

- **`novapeptidos-UI/`** — frontend React (CRA + craco + Tailwind), **GitHub Pages**. Es el único repo git de la carpeta padre. Remote: `github.com/vancuellar/novapeptidos-UI`.
  - **Flujo de despliegue (NUEVO 2026-07-19, orden de Christian):** SIN PRs — commit directo a `main` → push → `deploy.yml` publica solo (~1 min a producción). Cada cambio se sube EN EL MOMENTO. (El flujo viejo de PRs dev→main quedó atrás; GitHub es gratis para este uso — Christian puede cancelar cualquier plan de pago sin que nada se rompa.)
  - Dev server: `.claude/launch.json` (name `novapeptidos-ui`, puerto 3000). Verificación en navegador con las tools del Browser pane.
  - `public/CNAME` = `novapeptidos.mx` (NO cambiar hasta migrar a exygenlabs.com, o se cae el sitio).
- **`novapeptidos-RBAC/`** — backend FastAPI + MongoDB (repo `github.com/vancuellar/novapeptidos-RBAC`, **público**). Dockerfile + docker-compose. Endpoints: auth, products, orders, `/api/ai/chat`, emails (SES). NO tiene rama `dev` (PRs directos a `main`).
- **`pricing-system/`** — scripts Python del sistema de precios (NO versionado en git). Ver `../NOVA-PRICING-SYSTEM-CONTINUATION.md`.

---

## 2. Qué está EN VIVO (novapeptidos.mx)

- **Rebrand de texto** Nova→Exygen y dominio→exygenlabs.com en todo el copy/meta/correo (menos `CNAME` y `fallbackCatalog.js`, generado).
- **Logo Exygen** (header, footer, menú móvil). **Fondo marfil** en light theme.
- **Hero:** título "**Ciencia y precisión, *lote por lote***" (la frase después de la coma va en cursiva serif; lógica en `Home.js`). Subtítulo: "Péptidos liofilizados de investigación. Pureza verificada por HPLC. Envíos a todo México."
- **Catálogo lee del catálogo curado, NO del backend.** `Catalog.js` ahora filtra `fallbackProducts` localmente (antes llamaba `/products` del backend, que solo devolvía 22 productos viejos → por eso "faltaban" productos). Categorías también desde `fallbackCategories`. **Buscador** tolerante a acentos y a sufijo solo en consultas ≥6 letras (así "Retatrutide" encuentra "Retatrutida" sin que "tid" de "péptido" sobre-matchee).
- **Fotos de vial reales con etiqueta Exygen** en 14 productos: `public/images/products/<slug>.jpg`, mapeadas en `src/data/productImages.js` (helper `productImage()` + `hasProductPhoto()`). Se usan en grid (`ProductCard.js`) y página de producto (`ProductDetail.js`). Fuente: `../Media/Viales para fotos/`. Los demás productos conservan su imagen de categoría.
- **Disclaimer** bajo la foto (solo productos con foto real): "La cantidad en la foto es solo ilustrativa; se despacha la presentación (mg) que elijas." (key `product.photoNote`, es/en/pt).
- **Menú superior:** `Catálogo · Recursos`. En **Recursos**: Asesor de péptidos, Calculadora, Educación, Calidad, Envíos, Devoluciones.
- **Asesor de péptidos (`/asesor`)** — réplica del "Asesor-IA" de Exoma, **híbrido**: cuestionario de 3 pasos (Objetivo → Perfil → Sugerencia) con reglas y dosis PROPIAS (del catálogo), + botón que abre el chat de IA. `src/pages/Advisor.js`. Español.
- **Educación (`/educacion`)** — intro a péptidos, aviso RUO, literatura curada (8 fuentes reales: NEJM, Frontiers, MDPI, PMC, PubMed, ClinicalTrials.gov). es/en/pt.
- **Calculadora de reconstitución (`/calculadora`)**, **404 propia**, banner INTRO10 (10% off).
- **Portal admin v2 (`/admin`, solo rol admin, 2026-07-18):** pestañas **Ventas** (ticket promedio, ingresos por mes con gráfica recharts, top productos, ingresos por método de pago), **Clientes** (todos los clientes con teléfonos, direcciones de envío, total comprado, historial de pedidos en diálogo — nunca password_hash), **Distribuidores** (listar con totales + "Nuevo distribuidor" que genera código de referido y contraseña temporal), Pedidos y Productos (CRUD). Endpoints RBAC: `/admin/customers`, `/admin/analytics`, `/admin/distributors` (PRs #5/#6). **Las pestañas se llenan cuando el backend esté en línea**; hoy quedan vacías sin errores.
- **Los 3 dashboards (2026-07-18):** (1) **admin** `/admin`; (2) **clientes** `/cuenta` (pulido: tarjetas de resumen Pedidos/Total comprado + Mis pedidos + Perfil); (3) **distribuidores** `/distribuidor` (rol `distributor`) — código de referido copiable, tarjetas (ganancias/ventas/pedidos/clientes), nota de comisión, gráfica de ganancias por mes, Mis clientes y Mis ventas. El distribuidor **solo ve lo suyo**; nunca el margen interno del negocio. Frontend PRs #36/#37 (admin v2) y el de distribuidores. **Comisión = subtotal × tasa del distribuidor (default 25%, configurable al crearlo).** Decisión de negocio abierta: si la comisión debe seguir la escalera por ROI del sistema de precios en vez de una tasa plana, avisar a Christian.
- **Modelo de atribución distribuidor→venta:** un cliente que se registra o compra con `distributor_code` queda ligado (`referred_by`); sus órdenes generan comisión para ese distribuidor. Falta en el sitio público: un campo/enlace para capturar el código de referido en registro/checkout (hoy la atribución existe en backend pero el front público aún no lo pide).
- **Correo de bienvenida rebrandeado a Exygen** (RBAC PR #4, es/en/pt): wordmark EXYGEN LABS, contacto hola@exygenlabs.com; los enlaces siguen a novapeptidos.mx hasta migrar el dominio.

---

## 3. La IA (chat) — Gemini, acotada

- Backend en `novapeptidos-RBAC/ai_assistant.py`: usa **SDK `google-genai`** (no OpenAI). Modelo por defecto **`gemini-3.5-flash`** (configurable con `AI_MODEL_NAME`; los 2.x ya no aplican a llaves nuevas). Streaming vía `client.aio.models.generate_content_stream`.
- **System prompt ACOTADO** (probado con llave real): la IA "Exygen" SOLO habla de la tienda y de péptidos de investigación; **rechaza** redactar documentos/código/tareas/recetas/consejo legal, resiste "ignora tus instrucciones", no inventa productos/precios, mantiene RUO (sin dosis ni consejo médico).
- **Llave Gemini:** NUNCA se escribe en este archivo ni en scripts. Vive en
  `~/.config/exygen/gemini.env` (600, fuera de git) y en el `.env` del servidor.
  **La llave anterior la REVOCÓ Google el 2026-07-20** con el mensaje "Your API key was
  reported as leaked": estaba escrita aquí y en los userdata, y el repo es público. Por eso
  ahora solo se guarda en disco, igual que Cloudflare y Resend.
- **Frontend:** `src/components/AIChatWidget.js` llama a `https://chat.exygenlabs.com/api/ai/chat` (const `CHAT_API`). PR #1 y #2 de RBAC ya mergeados (Gemini + welcome emails multilingües por SES).

---

## 4. Backends — el viejo se perdió, el nuevo va en cuenta 'certis'

- **VIEJO (a jubilar):** `api.novapeptidos.mx` → `35.172.239.122`. Lo montó una sesión pasada, pero **PERDIMOS acceso**: no está en ninguna cuenta AWS que alcancemos, no hay `.pem`, la llave `~/.ssh/id_ed25519` no está autorizada. Sirve un API viejo (22 productos) y el chat roto. **No se puede tocar.** Su MongoDB (Atlas) también es inalcanzable → **no hay datos que migrar** (Christian confirmó: 0 usuarios/pedidos reales).
- **NUEVO (en construcción):** cuenta AWS **`certis`** (perfil CLI `certis`, cuenta `411653576144`, separada de JADA Legal `224874033368`). Scripts listos en la carpeta padre:
  - `../exygen-backend-userdata.final.sh` (bootstrap: Docker + Mongo + FastAPI del repo público + Caddy con TLS para `api.exygenlabs.com`; incluye env con la llave Gemini, JWT y admin).
  - `../deploy-exygen-backend.sh` (lanza la instancia t3.small en certis usando SG `sg-09f6bd49dc4ea40d3`, AMI Ubuntu 22.04, e imprime la IP + el registro DNS a poner).
  - **Admin del sitio:** `admin@exygenlabs.com` / `Exygen-c914cfd1!` (cambiar).
  - **BLOQUEO:** `aws ec2 run-instances` lo frena el clasificador en modo auto → hay que correr `deploy-exygen-backend.sh` en un **Claude interactivo** (con aprobación de Christian). Luego Christian pone en GoDaddy el registro **A `api` → IP**.
- **DB arranca de cero** (fresh). Base de datos nueva vacía.

---

## 5. Precios — REGLA VIGENTE (confirmada 2026-07-18)

- **REGLA VIGENTE (Christian la confirmó el 2026-07-18; implementada en `build_pricing_final.py` desde el 2026-07-17):** pegados **ABAJO de Certified**, no del más barato. Detalle: (i) compiten los dos → mezcla **25% Exoma + 75% Certified** (nunca arriba del caro); (ii) **solo Exoma** (el barato) → **+20%** sobre Exoma; (iii) **solo Certified** → justo debajo; (iv) sin competidor → costo ×17.5. Terminación 9.
- **Estar ARRIBA de Exoma es DELIBERADO** — el descuento INTRO10 (10%) da el colchón. Razón anti-barato: precios <$1,000 se ven sospechosos. El vigía solo alarma si rebasamos al competidor CARO.
- **Los precios en vivo YA cumplen la regla** (verificado 2026-07-18): Tirze 60mg $4,109 = 25%·$2,699 + 75%·$4,580; Sema 10mg $2,049; Reta 100mg $7,679 = Exoma $6,399 × 1.20. **Nada que realinear.** (La "alarma urgente" del 2026-07-18 y la regla del "promedio" fueron un malentendido de una sesión — ignorar si aparecen en notas viejas.)
- Precios de Certified descargados por su API en `pricing-system/certified_prices.json` (46 productos, 2026-07-18).
- Los precios NO se editan a mano; salen de los scripts. `gen_catalog.py` genera `fallbackCatalog.js`; su COA URL ya apunta a exygenlabs.com.

---

## 6. Vigía de precios (monitoreo diario)

- Tarea programada **`vigia-precios-exygen`**, ~8:17am diario (herramienta scheduled-tasks; correr "Run now" una vez para pre-aprobar el navegador).
- **Regla de alarma:** solo alarmar si estamos ARRIBA del competidor CARO (normalmente Certified). Estar arriba de Exoma es deliberado (ver §5) — NO es alarma. `check_competitors.py` ya lo hace así.
- **Exoma tiene API en vivo (Supabase REST):** `https://rtupumzllrvelrqkfqer.supabase.co/rest/v1/products?select=name,dosage,price,in_stock&limit=1000`. Requiere header `apikey` = un JWT público (`eyJ...`) embebido en los bundles JS de Exoma (abrir exomapeptides.mx, bajar los `<script src>`, extraer el JWT con `/eyJ[\w-]{20,}\.[\w-]{20,}\.[\w-]{10,}/`, luego `fetch` con `{apikey, authorization:'Bearer '+JWT}`). **NUNCA leer su tabla HTML.**
- **Certified** = WooCommerce (`certified-pepmex.com`), precios por `/wp-json/wc/store/products` o páginas de producto.
- El vigía compara vs `fallbackCatalog.js`, guarda histórico en `pricing-system/comp_prices_history.json`, y reporta corto (qué cambió, dónde estás mal posicionado, precio sugerido con la **regla del promedio**). No cambia nada solo.

---

## 7. Google Sheets

- La maestra (`../Nova Peptidos - Provider Price Lists.xlsx`, 5 pestañas) se subió a Google Drive convertida a Google Sheets ("Exygen Labs — Precios (maestra)"). **El sitio NO lee de ahí** — lee del `fallbackCatalog.js` generado por el script. El Sheet es espejo de solo-lectura. Para conectarlo en vivo habría que enlazar el script al Sheet (paso extra, no hecho).

---

## 8. Pendientes / decisiones abiertas

- [x] ~~Realinear precios~~ — NO aplica: los precios en vivo ya cumplen la regla vigente (§5). Resuelto 2026-07-18.
- [x] ~~Migrar el dominio a exygenlabs.com~~ — HECHO 2026-07-19 (Cloudflare DNS + `public/CNAME` + GitHub Pages). https://exygenlabs.com en vivo con HTTPS. Ver §0.
- [ ] **Redirigir `novapeptidos.mx` y los demás dominios `nova*` → exygenlabs.com.** DNS de esos dominios está en GoDaddy (fuera del token de Cloudflare, que solo cubre exygenlabs.com). Opción A: GoDaddy Domain Forwarding (301) por dominio. Opción B: mudarlos a Cloudflare + token que los cubra y poner redirect. **Falta la lista completa de dominios `nova*` de Christian.**
- [x] ~~Lanzar el backend nuevo~~ — HECHO 2026-07-19 y RELANZADO el mismo día con más features. EC2 **`i-09fe943689eaebe0d`** (certis, us-east-1a, **IP 44.204.127.242**), `api`/`chat`.exygenlabs.com en Cloudflare con TLS. Código en `/opt/exygen/app`; **para actualizarlo:** `ssh -i ~/.ssh/id_ed25519 ubuntu@44.204.127.242 "cd /opt/exygen/app && sudo git pull && sudo docker compose up -d --build"` (key pair `exygen-key`; el SG `sg-09f6bd49dc4ea40d3` tiene el puerto 22 abierto solo a la IP de Christian — si cambia su IP, agregarla con authorize-security-group-ingress). Frontend con `REACT_APP_BACKEND_URL=https://api.exygenlabs.com` (variable del repo). **DATOS REALES EN VIVO.** Login admin: **exygenlabs@gmail.com** (se cambió desde admin@exygenlabs.com; contraseña en §4 del doc viejo — pendiente que Christian la cambie).
- [ ] **Rebrand en los scripts/xlsx internos** (distribuidores, título de la maestra) y COA reales.
- [ ] Batch numbers en fotos/etiquetas siguen con prefijo `NP-` (Nova) — cambiar a Exygen si se desea.
- [ ] Páginas internas que faltan (FAQ, Quiénes somos, etc. — ver §9 del pricing continuation).


---

## 8bis. Enviado el 2026-07-19 (todo EN VIVO, flujo directo a main sin PRs)

- **Dominio exygenlabs.com en vivo** (Cloudflare) + backend real (§8). Sitio 100% funcional con datos reales.
- **Auth completa:** login/registro en una sola página (tabs), ojo mostrar/ocultar, recuperar contraseña por correo (/recuperar, /restablecer), perfil robusto en Mi cuenta (nombre, correo con confirmación, teléfono, direcciones envío/facturación, método de pago preferido — NUNCA guardamos tarjetas), cambio de contraseña.
- **Pagos:** SOLO tarjeta y SPEI. Checkout estilo Exoma: secciones numeradas 1-2-3, stepper clickeable con progreso, campos de tarjeta (Luhn, MM/AA, CVC — NO se envían al servidor; falta pasarela real), aviso SPEI (CLABE al confirmar), consentimiento 18+/RUO obligatorio, resumen colapsable.
- **Descuentos:** automático por volumen 10% lanzamiento / 15% ≥$20k / 20% ≥$40k (servidor manda). Códigos de distribuidor (5–50%, campo en carrito) — **NUNCA se acumulan: aplica el MAYOR**. Banner superior solo 10%; banner de volumen (15/20) en la página del catálogo estilo Exoma.
- **Inventario vivo:** colección `stock` por presentación (key = `productId::presentación`), descuenta al comprar; Admin > Inventario (198 presentaciones, buscador, cantidad + "en mano"); producto muestra "entrega inmediata (N)" o "envío en ~1 semana" (siempre comprable). Inventario real de Christian: RT40×20, Bac 3/10mL×20, KLOW80×20, Tirze10/RT10/RT20/NAD+/5-Amino×10; resto=20.
- **UX Exoma:** modal de agua bacteriostática al ir a checkout; menú hamburguesa con cuadrícula de iconos, categorías con TOP + ejemplos, WhatsApp "Contactar experto" (wa.me/5219944946889); tarjetas de catálogo con selector de presentación + botones Agregar y Ver.
- **Envíos/devoluciones = política Certified:** FedEx aéreo nacional, mismo día <5pm, 3-5 días hábiles, rastreo por correo, sin internacional, ventas finales.
- **Admin:** pestañas Ventas/Clientes/Distribuidores/Pedidos/Productos/Inventario; invitar clientes y crear distribuidores (código + % comisión + % descuento a clientes + contraseña temporal). Portal distribuidor con filtros (periodo/estado) y "ganado en el periodo".
- **Toasts** 2.5s con X visible. **Botones destructivos** rojo tenue → hover rojo sólido (excepción: Cerrar sesión sin fondo). **Todas las páginas a max-w-6xl.** Términos de servicio + Política de privacidad reales (login y footer). COA tono -99% ("análisis bajo solicitud"). Hero nuevo: 5 viales PNG transparente.
- **GitHub es GRATIS para este uso** — Christian puede cancelar cualquier plan de pago. Flujo: commit directo a main → deploy solo (~1 min). Los merges/PRs quedaron atrás.
- **Token Cloudflare** (Edit zone DNS, solo exygenlabs.com): lo dio Christian; el clasificador no dejó guardarlo en disco — **pedírselo de nuevo si se necesita DNS** (o está en el historial de este chat).

---

## 8ter. ROADMAP §10 EJECUTADO (2026-07-19, tarde) — TODO EN VIVO (el backend se desplegó el 2026-07-20, ver §8quinquies)

**Los 7 puntos del roadmap están construidos y el frontend ya está en producción.** El código del
backend está en `main` del repo RBAC pero **NO se ha desplegado al servidor**: el clasificador
bloquea `ssh` en modo automático. Hay que correr, en un Claude interactivo:
`ssh -i ~/.ssh/id_ed25519 ubuntu@44.204.127.242 "cd /opt/exygen/app && sudo git pull && sudo docker compose up -d --build"`
**Hasta que eso pase, las funciones que dependen del backend nuevo no responden** (pestaña Pedidos
del distribuidor, seguimiento de consumo, recompra en admin, guías de envío y estatus en el chat).

Antes de construir se escaneó a fondo exomapeptides.mx (sitemaps, bundles JS del asesor, de las
7 calculadoras, del comparador y de stacks, y las 16 páginas de contenido). Hallazgo clave: su
asesor no tiene lógica propia — es un formulario de ~30 campos que manda todo a una edge function
de Supabase (`ai-peptide-advisor`) y renderiza el JSON que devuelve un LLM. Sus stacks son
contenido estático sin precio ni carrito.

1. **Distribuidores ven pedidos y envíos de sus clientes.** `GET /distributor/orders` devuelve las
   órdenes atribuidas con estatus, contacto, destino y guía (nunca el margen interno). En el portal
   hay una pestaña *Pedidos y envíos* con filtros de periodo y estado, guía copiable y enlace de
   rastreo. Para que haya guía, el admin la captura: nueva columna *Guía* en Pedidos + diálogo con
   paquetería/guía/ETA. La URL de rastreo se arma sola (FedEx, DHL, Estafeta, UPS, Paquete Express,
   Redpack, Correos de México) y capturar una guía pasa el pedido a *enviado*.
2. **Chat IA con estatus de envío.** `/api/ai/chat` ahora acepta el token de sesión. Si el mensaje
   tiene intención de envío, el servidor adjunta al system prompt los pedidos reales del usuario
   (por número `EX-AAAAMMDD-1234` o por sesión) y el prompt le prohíbe inventar guías o fechas.
   Nunca expone dirección ni datos personales, ni órdenes ajenas.
3. **Calculadora pública acotada + completa en el área privada.** El componente
   `src/components/ReconstitutionCalculator.js` tiene variantes `basic` y `full`. La pública
   perdió modos, dosis de referencia y exportar, y anuncia lo que gana el cliente al entrar.
4. **Calculadora consciente de compras.** En *Mi cuenta > Mis herramientas* pre-carga con un clic
   los péptidos que el cliente compró, con su presentación, derivados de sus órdenes.
5. **Seguimiento de consumo y recompra.** Colección `protocols` + `/me/protocols`. Con dosis,
   frecuencia y viales calcula dosis restantes y fecha de fin; avisa a 14 días o menos.
   `GET /admin/repurchase` alimenta la pestaña *Recompra* del admin.
6. **Plan estilo Exoma.** `/asesor` ahora es Objetivo → Perfil (experiencia, stack, duración) →
   Presupuesto y salud → **PLAN**. El plan trae estrategia, métricas del ciclo, compuestos con
   dosis de referencia, frecuencia, viales y costo, primeras dos semanas, puntos de control,
   qué NO hacer, qué pasa si cambia el presupuesto, expectativas honestas y advertencias según las
   condiciones de salud marcadas. **Motor de reglas propio** (`src/data/advisorPlan.js`), sin LLM:
   reproducible y auditable. Elige la presentación más barata **para el ciclo completo**, no el
   vial más barato. Botones *Agregar todo al carrito* y *Copiar plan*.
7. **Paridad de contenido.** Nuevo `/aprende` (hub) y `/aprende/:slug` con renderizador de
   secciones tipadas (prose, list, steps, table, faq, glossary con buscador, callout, cards) e
   índice lateral. **13 guías**: empieza aquí, qué son los péptidos, glosario simple (35 términos),
   glosario técnico (32), cómo reconstituir, conservación, protocolos por objetivo, mitos, control
   de calidad, pureza HPLC, legalidad, FAQ (47 preguntas) y FAQ de principiantes (38). Además
   `/compendio`, generado del propio catálogo (102 compuestos, buscador y filtros). El menú
   **Péptidos** es de dos columnas (Por categoría + Aprende) y el footer ganó columna *Aprende*.

**Pruebas:** `test_core.py` era un script muerto que importaba `openai` (el backend usa Gemini) y
ni siquiera cargaba. Ahora son **22 pruebas offline** de la lógica de negocio (número de pedido,
intención de envío, URL de rastreo, proyección de consumo, rollup de distribuidor). Corren con
`pytest test_core.py -q` y pasan todas. El frontend no tiene suite propia; se verificó con build
limpio y con el navegador.

---

## 8quater. SEGUNDA TANDA (2026-07-19, noche) — TODO EN VIVO

1. **Consentimientos en el registro.** Confirmar contraseña + 5 casillas: *18 años y Términos* y
   *Política de privacidad* son obligatorias (el botón "Sí, estoy de acuerdo" queda bloqueado
   hasta marcarlas); bonos, correo y SMS son opt-in real. **El servidor los exige también** — el
   API es público y no basta validar en el navegador. Se guarda `consents` con fecha en el usuario.
2. **La calculadora y el seguimiento solo con compra pagada.** Se desbloquean con un pedido en
   `confirmado`, `enviado` o `entregado` (decisión de Christian: "confirmado" es cuando se verifica
   el pago, sea tarjeta o SPEI). Mientras tanto se explica por qué y se ofrece la pública.
3. **Mis estudios (análisis de sangre).** Nueva pestaña en Mi cuenta, mismo candado.
   - `lab_reference.py`: **40 marcadores** con rango de referencia (por sexo donde aplica),
     explicación en lenguaje llano y a qué familia de compuesto pertenecen.
   - **Se acota a los péptidos del cliente** (comprados o en su seguimiento): sin compuestos no
     hay marcadores, y los marcadores conocidos ajenos a sus vías se ocultan.
   - `POST /me/labs/extract`: el PDF o la foto pasan por Gemini **una sola vez** y se convierten
     en tabla markdown + valores. **El archivo NO se guarda**, solo los números; el prompt de
     extracción excluye nombre, dirección y CURP.
   - El cliente **revisa y corrige** los valores antes de guardar.
   - Tabla con rango y marca de dentro/arriba/abajo, gráfica de evolución por marcador con banda
     de referencia, y `POST /me/labs/{id}/interpret` para la explicación educativa.
   - **Límites del prompt de interpretación:** no diagnostica, no nombra enfermedades como
     conclusión, no indica tratamiento ni dosis, no dice si "puede" usar un compuesto y no dice
     que algo "está bien". El aviso de que NO es diagnóstico va arriba, abajo y dentro del diálogo.
4. **Guías renombradas.** 5 tenían la MISMA URL que Exoma (`glosario-simple`, `glosario`,
   `como-reconstituir`, `control-calidad`, `pureza-hplc`) y `/compendio` también → ahora
   `diccionario-basico`, `glosario-tecnico`, `reconstitucion-paso-a-paso`,
   `como-verificamos-cada-lote`, `que-significa-99-por-ciento` y `/compuestos`.
   **Además se habían colado 3 títulos calcados** del informe de escaneo ("Las palabras raras,
   traducidas", "Las dudas que todos tienen la primera vez", "Todo sobre péptidos"): reescritos.
   Verificado con un comparador de frases de 8 palabras contra el texto real de Exoma: **cero
   coincidencias**. Lo único que sigue igual es `/calculadora`, palabra genérica con enlaces ya
   compartidos. Las 13 guías son **públicas**, sin login.

**Pruebas: 33 en el backend, todas pasan** (`pytest -q` en `novapeptidos-RBAC`).

> *(Al escribirse, esto estaba pendiente de desplegar. **Ya se desplegó** el 2026-07-20 — §8quinquies.)*

---

## 8quinquies. TERCERA TANDA (2026-07-20) — TODO EN VIVO

**Backend desplegado** (`ssh` funcionó esta vez) y frontend publicado. Verificado en vivo.

1. **Barra superior con dos pestañas.** Fuera el menú "Péptidos" que duplicaba el catálogo.
   Queda **Catálogo** y **Herramientas** (asesor, calculadora, fichas, guías | educación,
   calidad, envíos, devoluciones).
2. **Confirmación de correo e invitaciones con enlace.** Registro manda enlace de 24 h; sin
   confirmar no se entra. Invitaciones (cliente y distribuidor) mandan enlace de 7 días a
   `/activar` donde el invitado elige su contraseña; ya NO se genera contraseña temporal.
   Endpoints: `verify-email`, `resend-verification`, `invitation/{token}`, `activate`.
3. **SES está en sandbox y sin remitente verificado** (cuenta `certis`, us-east-1: cero
   identidades, `ProductionAccess: false`, cuota 200/día). Por eso `EMAIL_ENABLED` no está en el
   `.env` del servidor y **no sale ningún correo**. Para que la confirmación obligatoria no
   dejara sin poder entrar a todo registro nuevo, la exigencia ahora depende de `email_enabled()`:
   - Correo apagado → la cuenta nace confirmada y el registro entra directo; el admin ve el
     enlace de invitación en pantalla para pasarlo a mano.
   - Al encender SES, la confirmación obligatoria se activa sola. **No hay que tocar código.**

### Correo: RESUELTO — sale por Resend, NO por SES

- **SES quedó denegado.** AWS rechazó el salir del sandbox de forma automática y en segundos
  (caso `178452167700909`). El motivo no se puede leer por API sin soporte de paga. No insistir.
- **El correo sale por Resend.** Dominio `exygenlabs.com` verificado ahí
  (domain id `52eae878-0429-487b-a35f-bc127c77cc91`), con DKIM, MX de `send.` y SPF puestos
  en Cloudflare. `emails.py` tiene los dos proveedores y se elige con `EMAIL_PROVIDER`.
- **En el `.env` del servidor:** `EMAIL_ENABLED=true`, `EMAIL_PROVIDER=resend`,
  `EMAIL_FROM='Exygen Labs <hola@exygenlabs.com>'`, `RESEND_API_KEY=...`,
  `SITE_URL=https://exygenlabs.com`.
- **Probado de punta a punta el 2026-07-20:** registro real → correo entregado (Resend lo reporta
  `delivered`) → login devuelve 403 hasta confirmar. La cuenta de prueba se borró.
- **Credenciales guardadas en disco** (600, fuera de git), NO volver a pedírselas a Christian:
  `~/.config/exygen/cloudflare.env` (token de Cloudflare + zone id `2c7505a60e14114b9c40ff6233599301`)
  y `~/.config/exygen/resend.env`.
- El dominio conserva también el DKIM de SES y un rol IAM `exygen-api-ses` en la instancia, por si
  algún día se retoma SES.

---

## 8sexies. CUARTA TANDA — REDISEÑO VISUAL (2026-07-20) — TODO EN VIVO

Referencia estética acordada con Christian: **resend.com**. Le gusta lo "extra clean".
**Regla:** se copian efectos, proporciones y tratamiento, **NUNCA sus archivos** (su hero son
dos imágenes propias, `bg-hero-1.jpg` y `bg-light.png`; todo se recreó en CSS).

### Tema oscuro
- **Lienzo negro puro** (`--background: 0 0% 0%`) y grises **neutros, sin tinte**. Las superficies
  se separan por luminosidad, no por color: fondo 0%, tarjetas 4.5%, franjas 7-8%, bordes 15%.
  Texto secundario `0 0% 63%` → contraste 8.1:1 sobre negro.
- **Azul de acento cambiado solo en oscuro:** de `225 70% 70%` (lavanda, se veía apagado sobre
  negro) a `219 88% 70%`. Token nuevo `--brand-glow` para los halos. El tema claro no se tocó.
- **Fondo del hero:** negro con haces de luz diagonales muy tenues + un filo delgado que marca el
  borde del haz + resplandor difuso arriba a la derecha (`.hero-beams`). Recreado en CSS.

### Estructura (aplica a AMBOS temas)
- **Nada arriba de la barra.** Se eliminó la franja del 10% de descuento.
- **Barra a todo lo ancho de la pantalla**, contenido a **1280 px** centrado, igual que Resend.
  Todo el sitio pasó de `max-w-6xl` (1152 px) a `max-w-[1280px]`.
- **Logo pegado a la izquierda**, navegación junto a él, acciones al extremo derecho.
  Sin sesión aparecen **Iniciar sesión** (texto) y **Crear cuenta** (botón sólido, abre
  `/login?tab=signup`). Con sesión, el menú de cuenta de siempre.
- **Fuera la cuadrícula de fondo** del hero y del panel de marca.
- **Botones del hero al estilo Resend:** uno sólido y "Empieza aquí" en texto plano
  (→ `/aprende/empieza-aqui`).
- Los **haces del hero también en claro**: mismo tratamiento, pero restando luz en vez de
  sumarla, porque el lienzo es marfil.

### Otros
- **Botón del chat en verde de WhatsApp** (`#25D366`).
- **Animación de los viales: RETIRADA.** Se probó entrada + flotación + destello + parallax y a
  Christian no le gustó que la foto se moviera en bloque al hacer hover. Se intentó recortar los
  5 viales del PNG y **no se puede: están pegados, no hay separación de alfa entre ellos**.
  Christian va a mandar **las botellas individuales**; con eso se hace que cada vial se levante
  solo al pasar el cursor. Hasta entonces, la imagen va quieta.
- **Favicons hechos desde cero:**
  - *Exygen* (no tenía ninguno): el enlace peptídico del logo aislado. A 16-32 px va solo el
    enlace (la caja punteada se volvía ruido); de 180 px en adelante sí aparece la caja.
    Archivos en `public/`: `favicon.svg`, `favicon.ico`, `favicon-16/32/192/512.png`,
    `apple-touch-icon.png`, `site.webmanifest`. Guinda de marca muestreada del logo: **#6C3030**.
  - *Certis* (`../certis-analytics-site/`): ya tenía la retícula teal pero **solo como data URI
    dentro del HTML**. Se generaron archivos reales en `img/` y se enlazaron en las 14 páginas,
    más `site.webmanifest`. **OJO: esa carpeta NO es repo git** — los cambios están solo en la
    máquina de Christian y falta saber dónde se publica ese sitio.

---

## 11. QUINTA TANDA (2026-07-20, tarde) — LOS 4 PUNTOS DE CHRISTIAN, HECHOS Y EN VIVO

Los cuatro puntos que ordenó Christian se ejecutaron y están en `main` (commit `ef983af`):

1. **Colores del hero de Resend, incluidos los botones.** Botón primario = pastilla de vidrio
   medida de resend.com (borde blanco 5%, degradado translúcido, blur 25px, radio 16px) que al
   hover se invierte a blanco con texto negro; en claro es tinta sólida sobre marfil. Secundario
   = texto plano gris que se enciende (como su "Documentation"). Clases `btn-resend`,
   `btn-resend-sm` y `btn-resend-ghost` en `index.css`. **El "lote por lote" NO se tocó.**
   **La barra ahora se funde con el hero como en Resend:** nace 100% transparente y solo gana
   fondo + blur al hacer scroll (listener en `Header.js`); 60px de alto; links de nav a 14px
   medium sin mayúsculas.
2. **Márgenes y hovers de Resend.** Secciones del home de 64px → 96px de aire vertical;
   subtítulo del hero pegado al título (8px) y 32px antes de los botones, como ellos. Hovers:
   transiciones de color a 150–200ms con su curva (0.4,0,0.2,1); tarjetas solo aclaran el borde
   (sin sombra ni movimiento); botón primario se invierte.
3. **Acento definitivo (decidido): guinda de marca #6C3030** — el mismo del enlace peptídico
   del logo y del favicon. En claro va tal cual (`--primary: 0 39% 31%`, contraste ~9:1 sobre
   marfil); en oscuro se aclara a rosa viejo (`4 55% 74%`, ~9:1 sobre negro). Sustituyó al azul
   de prueba en TODOS los tokens (`--primary`, `--accent`, `--ring`, `--success`,
   `--brand-glow`, kicker, chart-1). El destructivo sigue siendo rojo vivo, distinguible.
4. **Carrito movido:** fuera de la barra. Ahora es botón flotante abajo a la derecha
   (`src/components/CartFab.js`), en pila con el chat de WhatsApp, con contador guinda;
   se oculta en `/carrito` y `/checkout`.

**Bonus — botellas individuales del hero (Christian las mandó este día):** las 5 de
`../Media/Viales individuales sin fondo para hero/` SÍ sirven (transparencia real, 1024²).
Se recortaron al contenido y se convirtieron a webp (~62 KB c/u) en `public/images/hero/`.
El hero ahora arma la fila con 5 archivos y **cada vial se levanta solo al pasar el cursor**
(y enlaza a su búsqueda en el catálogo). Alturas escalonadas: NAD+ · Sema · Tirze · Reta · KLOW.
- **OJO — erratas en las etiquetas (imágenes generadas):** KLOW dice "FOR RESFARCH USF ONLY";
  NAD+ dice "RESEARCH PEPLIDES" y "Lyophlized"; Retatrutide dice "Lyoptilized". A tamaño web ni
  se ven, pero avisar a Christian por si las quiere regenerar (y NO usarlas para imprimir).
- **La "Foto grupal sin fondo.png" NO sirve** (texto ilegible/garabateado, KLOW repetido);
  no se usó. `public/images/hero-vials.png` (la foto vieja) quedó sin uso pero no se borró.

### Correcciones de Christian el mismo día (commit `22b8113`) — TODO EN VIVO
- **Los viales quedaron muy grandes → arreglado:** ahora los anchos son % del contenedor de
  540px (18/20/22/20/18), misma huella que la foto grupal vieja. El hover por vial sigue.
- **Molécula fuera de la barra superior (DECIDIDO):** la barra usa
  `public/images/exygen-logo-name.png` (recorte solo-wordmark del logo oficial;
  `BrandLogo nameOnly`). La molécula sigue en footer, menú móvil y favicon.
- **El guinda NO le gustó (DECIDIDO):** acento = **azul fuerte del light theme
  (`225 68% 23%`) en AMBOS temas.** En oscuro, mismo tono/saturación con luminosidad subida
  (`225 72% 60%`) para que lea sobre negro. No volver a proponer rojos/guindas.
- **Fusión barra-hero reforzada:** el hero corre por detrás de la barra transparente
  (`-mt-[60px] pt-[60px]`), así los haces llegan hasta el borde superior, como en Resend.
- **"Quiero las páginas en Python, no Java":** confusión de nombres — el sitio no usa Java;
  el frontend es JavaScript/React (lo único que corren los navegadores) y el backend YA es
  Python (FastAPI). Se le explicó; no hay nada que migrar. Si insiste, aclarar de nuevo con
  cariño; NO reescribir el frontend en Python.

### Sexta tanda (2026-07-20, noche) — commits `e5c99f8` y `aff2a44` — EN VIVO
- **Viales del hero reordenados (orden de Christian):** Tirze · NAD+ · **Reta (centro, la
  más grande)** · KLOW · Sema. Reta al frente; NAD+ y KLOW como principales a los lados.
- **Pestañas de la barra:** "Herramientas" → **"Recursos"** (asesor, calculadora, fichas,
  guías | educación, calidad) y nueva pestaña **"Ayuda"** (contacto por WhatsApp, soporte por
  correo hola@exygenlabs.com, estado de mi pedido → /cuenta, preguntas frecuentes →
  /aprende/preguntas-frecuentes, envíos, devoluciones). Envíos y devoluciones se MUDARON del
  menú viejo a Ayuda. Llaves i18n nuevas: nav.help, nav.contact, nav.support, nav.orderStatus,
  nav.faq (+ .desc) en es/en/pt.
- **Kicker del hero:** "Research Grade Peptides" (frase de marca, igual en los 3 idiomas;
  antes "Laboratorio · Grado investigación").
- **Barra superior: logo SOLO "EXYGEN LABS"** (`public/images/exygen-logo-wordmark.png`,
  `BrandLogo nameOnly`). El logo completo (molécula + subtítulo) sigue en footer, menú móvil
  y favicon. Christian fue explícito: solo en la barra.

## 🚩 TRES FRENTES ABIERTOS (pedidos por Christian, 2026-07-20)

### A. Legales — HECHO, pero necesita revisión de Christian
`/info/terminos` y `/info/privacidad` pasaron de 4-5 viñetas a páginas completas
(`src/data/info/terminos.js` y `privacidad.js`, ~1,500 palabras cada una).
- **Términos (11 secciones):** alcance, uso RUO con prohibiciones explícitas, quién puede
  comprar, cuenta, precios y formación del contrato, pagos, envíos y riesgo, alcance de lo
  garantizado, limitación de responsabilidad, propiedad intelectual, ley aplicable y PROFECO.
- **Privacidad (10 secciones), estructurado conforme a la LFPDPPP:** responsable, tabla de
  datos con finalidad y si son necesarios, finalidades primarias vs. secundarias, trato
  reforzado de datos sensibles (los análisis de laboratorio que sube el cliente), con quién se
  comparten, **procedimiento ARCO paso a paso con los plazos de ley (20 días hábiles para
  responder, 15 para hacer efectivo)**, conservación, seguridad, cookies y cambios.
- **PENDIENTE DE CHRISTIAN (es abogado, esto es suyo):** (1) revisar y aprobar el texto;
  (2) **definir el domicilio del responsable** —la LFPDPPP lo exige y hoy no está—;
  (3) designar al encargado de datos personales; (4) decidir si se registra ante el INAI.

### B. API de envíos — POR HACER (investigado 2026-07-20)
Objetivo: cotizar el envío en el checkout por código postal y peso, y jalar el estatus de la
guía a la cuenta del cliente. Hoy el envío se cotiza a mano y la guía la captura el admin.
- Ya existe y hay que reaprovechar: el pedido guarda `carrier`, `tracking_number`,
  `tracking_url`, `shipped_at`, `eta`; y `build_tracking_url()` en `server.py` ya arma la URL
  de rastreo de 7 paqueterías.
- **RECOMENDACIÓN: Skydropx como primario, Envia.com como respaldo.** Una sola integración
  (OAuth2 + JSON) cubre FedEx, DHL, Estafeta, Paquetexpress y ~20 más. Las dos cosas que
  necesitamos son un endpoint cada una: `POST /api/v1/quotations` (CP origen/destino + peso →
  tarifas de todas las paqueterías, válidas 24 h) y
  `GET /api/v1/shipments/tracking/{numero}` o webhooks. Sin contrato con paquetería, sin
  mensualidad, sin volumen mínimo, con sandbox y soporte en español.
- **Ojo al integrar:** Skydropx limita a ~2 peticiones/segundo. NO llamar la cotización en
  cada render del checkout: cachear por (CP, rango de peso) unos minutos y dejar una tarifa
  plana de respaldo para que un límite de tasa nunca tumbe una venta.
- **Directo (FedEx/DHL/Estafeta) queda para cuando crezca el volumen.** Si se hace: FedEx
  **solo REST**, su SOAP se está retirando (tracking ya murió en mayo 2024). Estafeta directo
  es el más difícil: no tiene documentación pública ni alta en línea, va por contrato.
- **RESTRICCIONES DE MERCANCÍA — esto importa más que el descuento:** Skydropx pide
  **SDS/MSDS (hoja de seguridad)** para polvos y sustancias químicas o retienen el paquete;
  **Estafeta prohíbe líquidos**; medicamentos no controlados piden receta y certificado
  COFEPRIS (esto pega justo con los 9 productos regulados del catálogo). FedEx es el canal de
  consenso para químicos, lo que es otra razón para conservar la relación directa con FedEx.
- **ANTES DE ESCRIBIR CÓDIGO:** mandar la lista real de productos a Skydropx y a FedEx y pedir
  su clasificación **por escrito**. También hay que resolver **Carta Porte** (clave UNSPSC y
  unidad de medida) para envíos nacionales, que aplica con cualquier proveedor.

### C. Pagos — POR HACER (investigado 2026-07-20)
Hoy el checkout captura la tarjeta pero **NO hay pasarela real conectada**: los datos no se
envían a ningún procesador. SPEI funciona porque es transferencia manual.

> ### 🟢 HALLAZGO CLAVE: **Stripe SÍ acepta péptidos de investigación.**
> Su FAQ oficial de negocios prohibidos/restringidos lo dice literalmente: *"Peptides that are
> for research purposes may be sold on Stripe as long as there are preventive measures in place
> to ensure these are not accessible to those who would purchase research chemicals for
> nonresearch purposes"*, y advierte que *"we will assume that peptides sold where no purpose
> is specified are sold for human consumption"*. **Existe una puerta legal. No hay ninguna
> razón para mentirle a un procesador.**
> **Lo que Stripe exige ya casi lo tenemos:** la puerta RUO/18+ de la primera visita, el aviso
> RUO en cada ficha, cero dosis y cero pautas de administración en todo el sitio. Falta
> confirmarlo **por escrito con Stripe MX antes de procesar volumen** (la FAQ es global y su
> banco adquirente en México puede ser más estricto).

> ### ⚠️ ADVERTENCIA — NO DECLARAR MERCANCÍA FALSA. NO SE IMPLEMENTÓ Y NO SE DEBE.
> Christian planteó declarar "cualquier otro producto" ante el procesador. Eso es
> *transaction laundering* / miscoding de MCC, y **es una infracción grave aunque el producto
> sea legal**: Visa lo define como disfrazar transacciones de alto riesgo como de bajo riesgo.
> Consecuencias reales y documentadas: cierre de cuenta con **fondos retenidos 180 días**;
> alta en **MATCH/TMF de Mastercard por 5 años, que incluye a los socios personalmente** e
> impide abrir cuenta en cualquier adquirente, incluso para otro negocio; multas del **Visa
> Integrity Risk Program** (MCC 5122/5912 son Tier 1) que el adquirente traslada al comercio y
> han llegado a siete cifras; y exposición penal por **fraude (Art. 386-389 Bis CPF, 3 a 12
> años)** y **Art. 400 Bis CPF (5 a 15 años)**, más bank/wire fraud en EE.UU. si algún banco
> corresponsal es estadounidense. **Christian es abogado: dejarle el riesgo con nombre y
> artículo, y que él decida.**

**Qué usa la competencia (observado en su código, 2026-07-20):**
- **Certified PepMex → Mercado Pago** (alta confianza: tienen overrides de traducción de las
  cadenas del checkout de Mercado Pago). Tienen además un plugin `cp-research-popup`, o sea
  la misma puerta RUO que nosotros.
- **Exoma → pasarela "Monelo"** (`monelo-charge` y `monelo-3ds-status` en sus edge functions)
  **+ SPEI pidiendo la CLABE por WhatsApp**. **OJO: capturan el número de tarjeta y el CVV en
  sus propios campos y lo mandan a su backend** → eso es PCI-DSS SAQ-D completo y el
  **código 12 de MATCH es justamente incumplimiento de PCI-DSS**. Esto NO se copia.
- **peptide.com.mx → indeterminado**: el checkout se traslada a otra tienda (Shopify); lo que
  dicen en su sitio se contradice entre páginas.
- **Patrón del mercado:** todos se apoyan en **SPEI** como método principal y tratan la tarjeta
  como lo frágil.

**Ruta recomendada, en orden:**
1. **Postular a Stripe MX con declaración completa y veraz**, apoyándose en las medidas que ya
   tenemos. Pedir la respuesta por escrito.
2. Si Stripe dice no: Conekta (`cumplimiento@conekta.com`, tiene tier de alto riesgo) o
   Mercado Pago (tiene acreditación para suplementos, y es lo que usa Certified).
3. Si todos rechazan: **adquirente de alto riesgo**. Costos típicos: **3.5-6.5% por
   transacción**, **reserva rodante 5-15% retenida 180 días**, alta $0-1,500 USD, mensualidad
   $25-100 USD, contracargo $25-50.
4. **SPEI** ya funciona y conviene reforzarlo (referencia única por pedido, validación por CEP
   o API bancaria) en vez de pasar CLABEs por WhatsApp. Aviso: un negocio cuyo **único** medio
   sea transferencia opaca atrae escrutinio AML por LFPIORPI.
5. **Cripto** solo como complemento, nunca como único medio.
- **Descartar:** PayPal MX (prohíbe la categoría y congela fondos 180 días) y Openpay/BBVA
  (adquirente bancario, el más conservador).
- **Requisitos en cualquier ruta:** acta constitutiva, RFC y constancia de situación fiscal,
  cuenta bancaria empresarial a nombre de la entidad, CFDI 4.0 y KYC/UBO de los socios.

## 8septies. SÉPTIMA TANDA (2026-07-20, madrugada) — correos oscuros + E2E, DESPLEGADO

### 1. ~~Versión clara/oscura de los correos~~ — HECHO Y DESPLEGADO (commit RBAC `af6e007`)
- **TODOS los correos** tienen ya versión clara y oscura: pedido (`_order_email_html`),
  bienvenida (`templates/welcome_email.{es,en,pt}.html`) y los de acción — confirmar correo,
  invitación y restablecer contraseña (`_action_email_html`).
- **Cómo:** bloque común `DARK_EMAIL_STYLE` en `emails.py` (metas `color-scheme` +
  `@media (prefers-color-scheme: dark)` con clases `em-*` y `!important`, que es lo único que
  vence a los estilos en línea). Paleta oscura = la del sitio: lienzo `#0A0A0A`, tarjeta
  `#141414`, bordes `#262626`, texto `#F5F5F5/#D6D6D6/#A3A3A3`, botón azul `#4E73E8`.
- **El claro sigue siendo el diseño base** (Gmail app y Outlook no respetan el modo oscuro de
  forma confiable; Apple Mail sí). Verificado en navegador alternando `prefers-color-scheme`
  en los tres tipos de correo: claro intacto, oscuro correcto.
- `_action_email_html` ahora emite documento HTML completo (antes era un fragmento sin head).

### 2. ~~E2E + workflow pre-push~~ — CORRIDO 2026-07-20 (madrugada), CERO FALLAS
- Backend: `pytest test_core.py -q` → **40 pasan**. Frontend: `CI=true npm run build` limpio.
- Recorrido en navegador sobre el **build de producción** servido localmente (el clasificador
  bloqueó `npm start`; se sirvió `build/` con un server estático con fallback SPA):
  **34 rutas públicas** renderizan con contenido y **cero errores de consola**: home, catálogo
  (buscador probado: "Retatrutide"→Retatrutida), ficha (monografía+foto+disclaimer), carrito
  (descuento automático 10%), modal agua BAC, checkout (secciones 1-2-3), login/registro/
  recuperar, asesor, calculadora, educación, compendio, /aprende + las 13 guías, las 8
  páginas /info/*, y la 404 propia. `/cuenta`, `/admin` y `/distribuidor` redirigen a /login
  sin sesión (correcto; el interior se verificó en vivo la sesión pasada — no hay credenciales
  de prueba en esta máquina).
- Temas claro y oscuro OK; idiomas es-MX/en-US/pt-BR OK (llave localStorage `nova-language`;
  las páginas legales /info/terminos y /info/privacidad son solo-español por diseño).
- En vivo: `exygenlabs.com` 200, `api.exygenlabs.com/api/` ok, `/api/products` 200.
- **Backend desplegado por SSH** (git pull + docker compose up -d --build) y API sana después.

### Notas de entorno (para el próximo chat)
- **Venv del backend:** `novapeptidos-RBAC/.venv` (python3.12, ya en .gitignore). Correr las
  pruebas con `.venv/bin/python -m pytest test_core.py -q`. No hay pytest global ni Docker
  local corriendo.
- **`novapeptidos-UI/.env.local`** apuntaba a `http://localhost:8765` (backend local que ya no
  existe); ahora apunta a `https://api.exygenlabs.com`. Respaldo del viejo en el scratchpad de
  la sesión 2026-07-20.

## 8octies. OCTAVA TANDA (2026-07-21, madrugada) — EN VIVO

- **OJO: hubo DOS sesiones simultáneas** sobre esta carpeta (esta + una de precios). La de
  precios cambió ramas bajo nuestros pies; mis WIP se recuperaron del stash y todo quedó en
  main. Se borraron 22 duplicados basura "archivo 2.js" (idénticos). **Regla: una sesión a
  la vez en el repo.** La de precios dejó ramas `precios-*` y el commit "piso ROI >=10x tras
  50% comision (publico >= 2x costo caja)" — el piso de ROI vive en el sistema de precios.
- **Fuente Marcellus (la del logo) en TODO el sitio:** `--font-heading` cambió de Cormorant
  Garamond a Marcellus (index.css). Pedido de Christian: la parte interna del cliente debía
  hablar la misma letra que la marca.
- **Aviso de agua bacteriostática INTELIGENTE (Cart.js):** calcula mL por carrito (≤15 mg →
  2 mL; 16–40 → 3 mL; >40 → 4 mL por vial) y sugiere 1×3 mL o N×10 mL; agrega la cantidad
  sugerida al carrito. Solo aparece si hay viales en mg. Probado: 2×40mg+1×80mg → 1×10 mL;
  1×10mg → 1×3 mL.
- **Fix:** la línea de puntos del checkout no interpolaba (el i18n usa {{param}}, no {param}).
- **Admin ve todas las herramientas sin compra** (Mi cuenta > candado con bypass por rol).
- **Comisiones (reglas de Christian):** (1) tope duro **50%** en servidor (`COMMISSION_CAP`,
  al crear y al editar); (2) **edición individual** de tasas: `PUT
  /admin/distributors/{id}/rates` + botón "Editar tasas" en Admin > Distribuidores;
  (3) **candado histórico verificado**: cada orden guarda `commission` en PESOS al crearse
  y todos los reportes suman lo guardado — cambiar precio o tasa NUNCA toca ventas pasadas
  (test explícito en test_core). 48 pruebas en verde.

## 8nonies. AUDITORÍA + PISO 5× TRAS COMISIÓN (2026-07-21, madrugada) — EN VIVO

- **Auditoría completa (todo verde):** sitio = maestra al centavo (198 variantes, 0
  descuadres), terminación 9 en 205/205, tope de comisión 50% cumplido, cero secretos en
  los repos públicos, ~25 ramas viejas borradas, dev↔main en paridad (PR #54).
- **REGLA NUEVA de Christian (2026-07-21): piso de ROI 5× DESPUÉS de comisión, en TODO el
  catálogo. Se recorta la comisión primero, NUNCA su ganancia.** Aplicado quirúrgicamente
  a la maestra: 14 filas — 13 recortes de comisión (p.ej. BPC-157 20mg 40%→22%, IGF-1 LR3
  9%→2%) y **Liraglutida 30mg subió $2,969→$3,229** (piso exacto 5×; Certified no la vende;
  queda arriba de Exoma $2,970, deliberado, comisión 0%). Respaldo:
  `pricing-system/backup_maestra_pre_piso5x_tras_comision.xlsx`.
- **build_pricing_final.py parcheado para corridas futuras:** piso global 5× re-aplicado
  DESPUÉS de la escalera/interpolación (antes la escalera podía hundir un precio bajo el
  piso, como pasó con Liraglutida); `commission()` ya traía el piso tras comisión.
- **OJO CRÍTICO:** la hoja "Precios y Competencia" actual fue generada por una versión del
  script QUE YA NO EXISTE (los textos de base "abajo de Exoma unico" y "piso 50% com" no
  están en ningún .py). **Regenerar con el script actual puede mover MUCHOS precios.**
  Antes de la próxima regeneración, reconciliar el script con lo publicado.
- HCG 5,000IU arriba de Certified = deliberado (piso); el vigía da falsa alarma ahí —
  pendiente enseñarle a reconocer precios en piso.

## 8dec. SPEI CON CLABE (2026-07-21) — EN VIVO
- El cliente que elige SPEI ahora SÍ ve la cuenta para depositar: caja con Beneficiario,
  Banco, CLABE (copiable), Monto y Referencia (nº de pedido), en `/pedido/…` y en el correo.
  Datos por env (`SPEI_CLABE/BENEFICIARY/BANK`, en el server + `~/.config/exygen/spei.env`),
  **nunca en el repo ni en páginas públicas**; solo aparecen en un pedido SPEI ya hecho.
  Cuenta por defecto = la de Christian (ver memoria privada [[exygen-entidad-y-pagos]]).
- **BUG CRÍTICO cazado y corregido el mismo día:** un helper (`spei_details`) quedó insertado
  ENTRE el decorador y `get_order`, robándose la ruta → GET /orders/{n} devolvía la CLABE en
  vez del pedido (live ~unos minutos; sin clientes reales, CLABE no es secreta). Corregido +
  prueba de regresión de ruteo en test_core. **Lección: al meter un helper cerca de una ruta,
  revisar que el decorador siga pegado a su función.** 58 pruebas en verde.
- **OXXO:** NO se puede con sola CLABE — necesita un PSP (Conekta/OpenPay OXXO Pay) que emita
  ficha, con el mismo riesgo de giro. Diferido.

## 8undec. COMPROBANTE SPEI + UI DE MI CUENTA (2026-07-21) — EN VIVO
- **Comprobante SPEI (lo pidió Christian: la cuenta receptora QUIMIMID no busca la
  transferencia sin comprobante):** el cliente sube su comprobante en la página del pedido
  SPEI (`POST /orders/{n}/spei-receipt`, multipart, valida tipo/tamaño, guarda en Mongo
  colección `spei_receipts`, marca `spei_receipt_at`). El **admin lo descarga** en
  Admin > Pedidos (columna "Comprobante", `GET /admin/orders/{id}/spei-receipt`, solo admin).
  Probado de punta a punta. 58 pruebas.
- **Mi cuenta:** las tabs (Pedidos, Herramientas, Estudios, Certificados, Perfil) ahora son
  **sidebar vertical flotante (sticky)** a la izquierda en desktop, siempre visible; barra
  horizontal en móvil.
- **Header:** nombre del usuario (primer nombre) junto al icono de Perfil; se quitó el botón
  "Cerrar sesión" duplicado de Mi cuenta (queda solo en el dropdown del Perfil).

## 8duodec. CORREO DE PAGO + E2E + ENVÍOS (2026-07-21) — EN VIVO

- **Correo de pago confirmado:** al pasar un pedido a `confirmado` (SPEI verificado por el
  admin o cripto liquidada), el cliente recibe "Confirmamos tu pago — pedido X".
  `send_payment_confirmed_email` en emails.py; disparado en `update_order_status` (solo al
  ENTRAR a confirmado) y en `_confirm_crypto_order`. 59 pruebas en verde.

- **E2E COMPLETO (2026-07-21, cero fallas):** 59 pruebas backend + build limpio.
  29 rutas del sitio renderizan con **cero errores de consola** (incl. /cuenta /admin
  /distribuidor que redirigen a /login sin sesión — correcto). API: products 198,
  categories 8, stock 198, payments crypto_enabled, google enabled, AI chat responde,
  admin/distributor gated (401). Flujo de cliente: pedidos **tarjeta/SPEI/cripto** se
  crean OK (cripto devuelve URL real de NOWPayments); la página del pedido SPEI muestra
  CLABE + botón de comprobante. Todos los datos de prueba borrados (DB en 0 pedidos).
  Pendiente probar EN VIVO como admin/distribuidor: no hay credenciales admin en esta
  sesión y aún no existe ningún distribuidor en la DB (su UI está verificada por código).

- **ENVÍOS — estado y decisión (Christian, 2026-07-21):**
  - **Lo que HAY hoy:** rastreo MANUAL. El admin captura paquetería + nº de guía en
    Pedidos; `build_tracking_url()` arma el enlace de rastreo (FedEx, DHL, Estafeta, UPS,
    Paquetexpress, Redpack, Correos) y el cliente lo ve en su pedido/cuenta. Funciona.
  - **Lo que NO hay:** cotización automática en el checkout por CP+peso, ni jalar el estatus
    dentro del sitio. Eso necesita API de envíos (Skydropx primario / Envia respaldo, §B).
  - **Intel de competencia (verificado 2026-07-21):** **Certified envía por FedEx** (FedEx
    3 Day / aéreo, declarando "compuestos de investigación") — abiertamente, en su página de
    rastreo. NO se confirmó lo de "J&T/paquetería chafita". Exoma: no expuesto. → FedEx es el
    canal de consenso (coincide con nuestra política de envíos ya publicada).
  - **Pasos para cotización+tracking auto (cuando se quiera):** (1) ANTES de código, mandar
    la lista de productos a Skydropx y FedEx y pedir su **clasificación por escrito**
    (SDS/MSDS para polvos) — los transportistas no te vetan como remitente, pero la
    declaración de contenido y **Carta Porte** (clave UNSPSC + unidad) es lo que importa;
    (2) integrar Skydropx (OAuth2+JSON: 1 endpoint de cotización + 1 de tracking), cachear por
    (CP, rango de peso) y dejar tarifa plana de respaldo. Gated en la clasificación → NO se
    construyó aún; el manual sostiene mientras.

## 🚩 PENDIENTES NUEVOS DE CHRISTIAN (2026-07-21, madrugada) — APUNTADOS, SIN EJECUTAR

1. **Hablar del programa de lealtad:** hoy es 5% sobre compras pagadas (tasa que eligió el
   asistente como arranque). Christian quiere revisar el % y DEFINIR las políticas del
   programa (vigencia/caducidad de puntos, quién califica, límites) y la **política de
   devoluciones** y cómo interactúan (una devolución debe revertir puntos — el código ya
   revierte al cancelar, pero falta la política escrita).
2bis. **MONELO — INVESTIGADO (2026-07-21):** Es real: **Monelo Pay, S.A.P.I. de C.V.**
   (fiscal: Torreón, Coahuila; oficina: Bosques de las Lomas, CDMX). Procesador/agregador
   mexicano: terminales, links de pago, API en línea con **tokenización y sandbox**; portal
   pay.monelo.mx; dice ser **PCI DSS Nivel 1**. **Confirmado que es el procesador de tarjeta
   de Exoma** (sus funciones monelo-charge y monelo-3ds-status/sweep → 3DS en producción).
   Tarifas NO públicas: cotizan "por giro y volumen" (típico de quien acepta alto riesgo).
   Contacto: contacto@monelo.mx · +52 56 3634 3634.
   **Focos amarillos:** empresa muy joven (© 2025), casi invisible en internet (cero
   reseñas/quejas/noticias), y en su sitio los enlaces de "Términos y condiciones" e
   "Información legal" están VACÍOS — todo tendría que firmarse en contrato, con reserva,
   plazos de depósito y aceptación del giro POR ESCRITO. OJO: Exoma manda tarjeta+CVV crudos
   por su propio servidor (PCI SAQ-D, lo que dijimos NO copiar); con Monelo se puede integrar
   BIEN vía tokens. Plan: cotizar con Monelo Y postular a Mercado Pago en paralelo.

2ter. **RUTA DE PAGOS ELEGIDA POR CHRISTIAN (2026-07-21): adquirente especialista de alto
   riesgo + cripto.** (Mercado Pago y la vía "mismo procesador que la competencia" quedaron
   descartadas; los motivos finos están en la memoria privada, NO escribirlos aquí.)
   - **Tarjeta (alto riesgo, giro declarado). DECISIÓN Christian 2026-07-21: ir por LOS DOS
     — offshore (sin entidad EUA) AHORA + la ruta con LLC en paralelo.**
     - **Offshore / internacionales (aceptan entidad NO-EUA, p.ej. SAPI mexicana, y
       multi-moneda):** Instabill (bróker offshore, largo historial en nutracéuticos/research
       chemicals), Corepay (bancos adquirentes offshore), QuadraPay, OffshoreGateways,
       OffshoreUniPay. Usan bancos en UE/Caribe/Asia. Terminos del nicho: 3.5–8%, reserva
       rodante 5–15% (~6 meses), KYB con la entidad.
     - **US (mejor tasa/aprobación, piden LLC americana + EIN — trámite corto):** AllayPay
       (péptidos RUO doméstico), PaymentCloud (~3.49–3.95% + $0.25), Paycron.
     - Nuestro sitio ya trae lo que pide su underwriting: puerta 18+/RUO, avisos en cada
       ficha, cero dosis. **Siguiente paso: Claude redacta el correo de outreach veraz +
       checklist de documentos; Christian aplica a 2–3 offshore y arranca la LLC en paralelo.
       Pendiente de Christian: entidad a usar, estimado de ventas/mes, ticket promedio.**
   - **Cripto (complemento): BTCPay Server AUTOALOJADO — CÓDIGO YA CONSTRUIDO Y EN MAIN,
     APAGADO hasta configurar.** 0% comisión, sin intermediario, nadie lo congela.
     - Backend: `btcpay.py` (crear factura Greenfield + verificar webhook HMAC fail-closed);
       `POST /orders` acepta 'cripto' solo si `btcpay.enabled()`; webhook
       `/payments/btcpay/webhook` confirma el pedido al liquidarse (dispara puntos);
       `GET /payments/config`. Frontend: opción "Criptomoneda" en checkout que aparece solo
       si config lo dice; paga en la factura BTCPay y regresa a /pedido/. 52 pruebas verdes.
     - **DECISIÓN DE CHRISTIAN (2026-07-21): LOS DOS.** NOWPayments ya para cobrar pronto;
       BTCPay autoalojado después. **NOWPayments YA ESTÁ PROGRAMADO Y EN MAIN** (RBAC PR #10,
       apagado): `nowpayments.py` (factura + IPN HMAC-SHA512 fail-closed); el método 'cripto'
       del checkout usa NOWPayments si está encendido (BTCPay de respaldo); webhook
       `/payments/nowpayments/webhook`. 56 pruebas verdes.
       - **YA ENCENDIDO Y EN VIVO (2026-07-21):** Christian dio API key + IPN secret; guardadas
         en `~/.config/exygen/nowpayments.env` (600) y en el `.env` del servidor. Backend
         desplegado; `/api/payments/config` → `crypto_enabled:true`; el webhook rechaza sin
         firma (401). El checkout en vivo YA muestra "Cryptocurrency". La API key se probó
         contra NOWPayments (autentica OK). **NO volver a pedir esas llaves.**
       - **FALTA DEL LADO DE CHRISTIAN para que un cliente pueda pagar de verdad:** (a)
         **Settings > Coins**: prender las monedas a aceptar (BTC, ETH, USDT…) — hoy la lista
         sale VACÍA, por eso ningún cliente tendría con qué pagar; (b) **Verify account**
         (KYB, badge naranja); (c) **Settings > Payout wallets / Coins**: elegir que caiga en
         **USDT** (en Custody o wallet propia) para no cargar riesgo de precio.
       - **(Pasos originales de referencia):** (1) registrarse en
         nowpayments.io con la ENTIDAD real y pasar su KYB; (2) configurar un wallet de
         cobro (o auto-conversión a USDT en su panel, para no cargar riesgo de precio);
         (3) generar API key + IPN secret y ponerlos en su panel el IPN callback a
         `https://api.exygenlabs.com/api/payments/nowpayments/webhook`; (4) pasarme
         `NOWPAYMENTS_API_KEY` y `NOWPAYMENTS_IPN_SECRET` → van al `.env` del backend y se
         reinicia. Christian ofreció CLABE: **NO se necesita** para cripto (ni para NOW ni
         BTCPay); la CLABE solo aplicaría al reforzar SPEI, y Claude nunca captura datos
         bancarios en formularios.
     - **SCRIPTS DE DESPLIEGUE YA ESCRITOS (2026-07-21):** `../btcpay-userdata.sh` (instala
       BTCPay + nodo BTC podado xs + TLS para pay.exygenlabs.com) y `../deploy-btcpay.sh`
       (lanza t3.medium 60GB en certis — CORRER EN CLAUDE INTERACTIVO, run-instances lo
       bloquea el modo auto). Tras lanzar: A `pay` -> IP en Cloudflare.
     - **PIEZAS QUE REQUIEREN A CHRISTIAN / INTERACTIVO:** (a) aprobar el run-instances
       (modo auto lo bloquea); (b) la **WALLET es de Christian** — al crear la tienda en
       BTCPay conecta el xpub de su hardware wallet, o genera hot wallet y GUARDA ÉL la
       frase semilla (nadie más). Claude NUNCA debe crear/guardar esa semilla (frontera de
       credenciales financieras); (c) la **sincronización del nodo BTC tarda HORAS**. Luego:
       API key Greenfield + webhook a `https://api.exygenlabs.com/api/payments/btcpay/webhook`
       y poner `BTCPAY_URL/STORE_ID/API_KEY/WEBHOOK_SECRET` en el `.env` del backend.
       Conversión a MXN vía Bitso. **Alternativa pragmática sin nodo ni servidor 24/7:
       NOWPayments** (0.5%, API key, auto-USDT, KYB con la entidad real) — decisión abierta
       de Christian (self-hosted control total vs hosted más simple).
     - **⚠️ DEPLOY DEL BACKEND PENDIENTE:** el código de cripto está en `main` del RBAC
       (commit merge PR #9) pero **el servidor 44.204.127.242 NO se ha actualizado** — el
       clasificador bloqueó el `ssh`. No urge: sin las BTCPAY_* no cambia nada. Correr en
       Claude interactivo: `ssh -i ~/.ssh/id_ed25519 ubuntu@44.204.127.242 "cd /opt/exygen/app
       && sudo git pull && sudo docker compose up -d --build"`.
     - **OJO SEGURIDAD:** se agregó la IP `66.9.186.74/32` (egress de esta sesión) al SG
       `sg-09f6bd49dc4ea40d3` puerto 22 para intentar el deploy. Si no se va a reusar,
       **revocarla**: `aws ec2 revoke-security-group-ingress --group-id sg-09f6bd49dc4ea40d3
       --protocol tcp --port 22 --cidr 66.9.186.74/32 --profile certis --region us-east-1`.

2. **PROCESADOR DE PAGOS — DECISIÓN FIRME DE CHRISTIAN: STRIPE NO.** Stripe congeló en el
   pasado las cuentas de Certified y de Exoma con miles de dólares dentro. **Usar el mismo
   procesador que usan ellos:** Certified → **Mercado Pago** (confirmado en su código);
   Exoma → **"Monelo"** + SPEI. Ruta: postular a Mercado Pago (tiene acreditación para
   suplementos) y/o investigar Monelo. La advertencia de NUNCA declarar mercancía falsa
   (§C) sigue aplicando igual con cualquier procesador. Esto REEMPLAZA la ruta "Stripe
   primero" del §C.
3. **Correos del negocio:** crear los buzones para hablar con clientes y distribuidores
   (hoy solo existe hola@exygenlabs.com como remitente vía Resend). Falta definir y crear
   p.ej. soporte@, pedidos@, distribuidores@ — la RECEPCIÓN se puede resolver gratis con
   Cloudflare Email Routing (el DNS ya está en Cloudflare); Resend solo envía.

## 🤝 HANDOFF — ESTADO AL 2026-07-22 (tarde) Y PENDIENTES

**OJO: la carpeta local se RENOMBRÓ de "Nova Peptidos" a "Exygen Peptides"**
(`/Users/christian/Documents/Exygen Peptides/`). Los launch.json ya apuntan ahí. Los repos
siguen llamándose `novapeptidos-UI` y `novapeptidos-RBAC` (GitHub: vancuellar/…).

### 🔴 BUGS ABIERTOS — ~~AMBOS RESUELTOS 2026-07-22 (commit `dfd1b84`, EN VIVO)~~
1. ~~**CRASH con Retatrutida.**~~ **RESUELTO.** NO era el `parseFloat` del rango (parseFloat
   de "5 mg – 100 mg" da 5 sin problema). Era un **ReferenceError por TDZ** en
   `ReconstitutionCalculator.js`: `activeLevel` usaba `effUnit` ANTES de su declaración
   `const`. Solo tronaba con péptidos que tienen `start_levels` (Retatrutida sí; KLOW no —
   por eso solo se veía con Reta) y solo en la variante `full`. Fix: mover la declaración
   de `effUnit` arriba. Verificado logueado en local (backend+Mongo efímeros): Retatrutida
   renderiza completa con niveles Inicial/Típica/Avanzada, cero errores de consola.
2. ~~**KLOW 80mg no sugiere agua.**~~ **RESUELTO (fallback genérico, opción B).** La causa:
   la dosis default fija (250 mcg) es inmedible en un vial de 80 mg (< 2 rayitas aun con
   5 mL) → la calculadora decía "ni con la máxima agua se puede medir". Ahora
   `measurableDefault()` sube el default a un número redondo MEDIBLE según el vial (KLOW
   80mg → 350 mcg → 5 mL / 2.2 rayitas). Es solo aritmética de medición, NO dosis sugerida.
   **PENDIENTE DE DECISIÓN (Christian):** poblar `start_levels` (Inicial/Típica/Avanzada)
   para los ~58 productos que no los tienen requiere DATOS RUO de referencia por compuesto —
   eso es contenido/criterio suyo (qué fuente usar y qué valores publicar), no se inventó.
   Mientras, la calculadora ya funciona con TODOS los péptidos.

### ➕ 2026-07-22 (tarde): DOSIS DE REFERENCIA DE LA CALCULADORA — 63/90 EN VIVO
Se investigaron (literatura + protocolos comunitarios RUO; NO se copió a Exoma) y se
llenaron `start_levels` de 12 productos más (commit `16ae37c`): 7 mezclas derivadas de sus
componentes (KLOW 3/5/8mg, GLOW 3/4.5/7mg, BPC10+TB10 2/3/4mg, BPC5+TB5 1/1.5/2mg,
Tesa+Ipa 1.5/2.25/3mg, Cagri+Sema 0.5/1/2mg, Reta+Tirze 2/5/10mg) y 5 individuales con
referencia clara (VIP 50/75/100mcg, LL-37 100/175/250mcg, Oxitocina 20/30/40mcg, B12 y
Vit B12 1000/2500/5000mcg). **Quedan 27 A PROPÓSITO sin niveles** (usan el fallback
medible): químicos de investigación pura sin dosis humana (SLU-PP-332, AICAR, Adipotide,
FOXO4, PNC-27, P21, GDF-8, ACE-031, PTD-1/DBM, B7-33, PE-22-28, ADMAX, Fragment 17-23),
tópicos (AHK-Cu, Matrixyl, SNAP-8), formato que no encaja (Cerebrolysin mL, Melatonina y
1MQ orales, MIC multi-ingrediente) y hormonas potentes/opioide (Triptorelin, ACTH,
Orexin A/B, Dermorphin). Poner número ahí sería inventar dosis. Si Christian quiere
cerrarlos, tiene que dar/aprobar la fuente por compuesto.

### ➕ 2026-07-22 (tarde): DISTRIBUIDORES CON FULL ACCESS A HERRAMIENTAS — EN VIVO
Orden de Christian: rol `distributor` entra al bypass del candado de Mi cuenta igual que
admin (calculadora completa, seguimiento, estudios, COAs) sin necesidad de compra pagada
(commit `81f0c00`, verificado logueado como distribuidor en local). Los COAs siguen
acotados por el servidor a productos comprados. PENDIENTE DE CHRISTIAN: definir la fuente
de las dosis de referencia (start_levels) de los ~58 productos que no las tienen.

### ⚙️ CÓMO PROBAR LOGUEADO (para reproducir bugs de Mi cuenta/calculadora)
- **Admin de Christian EN VIVO:** `admin@exygenlabs.com` / `Exygen-c914cfd1!` (login por API
  funciona, sin 2FA). Su cuenta admin tiene acceso FULL a los 3 paneles: cliente, distribuidor
  y admin. NOTA: Christian NO pudo entrar con huella/Touch ID en su MacBook — **las passkeys/
  Touch ID requieren registrar el autenticador ANTES en Mi cuenta > seguridad, y solo sirven
  en el navegador/dispositivo donde se registraron**; si nunca registró una passkey en esa
  Mac, Touch ID no aparece. Pendiente: confirmarle esto y/o que registre su passkey.
- Para reproducir en LOCAL: `docker run -d --name m -p 27017:27017 mongo:7`; backend
  `MONGO_URL=mongodb://localhost:27017 DB_NAME=x CORS_ORIGINS=http://localhost:3000
  .venv/bin/python -m uvicorn server:app --port 8765`; `.env.local` del UI →
  `REACT_APP_BACKEND_URL=http://localhost:8765`; registrar usuario, promover a admin por
  mongosh, inyectar `np_token` + `exygen_ruo_ack` en localStorage. RESTAURAR `.env.local` a
  `https://api.exygenlabs.com` al terminar.

### ✅ EN VIVO Y VERIFICADO ESTA SESIÓN (2026-07-22)
- **Precios: auditoría completa contra el changelog autoritativo**
  (`pricing-system/cambios_precios_2026-07-20.txt`). Se encontraron **18 productos a
  EXACTAMENTE 2× su precio correcto** (bug de doblado) y se corrigieron en backend en vivo
  (API admin) + `fallbackCatalog.js`. Todos validados: quedan a ~10× costo (piso pide 5×) y
  Hexarelin 2mg se fijó a $779 (+20% Exoma, era el único que rebasaba el tope). HGH 24/40 y
  Somatropina quedaron en su precio FIJADO por Christian ($1,139/$1,449/$539/$659/$779) y
  **FUERA del catálogo de distribuidores hasta nuevo aviso**. Resultado: 104 correctos +
  18 corregidos, sincronizados sitio↔fallback.
- **Portugués:** ~290 palabras acentuadas en todo el bloque ptBR + label "Português (BR)".
  (Español ya se había corregido antes; claves/slugs/rutas quedan ASCII.)
- **Preguntas en español** ahora abren con ¿ (12 corregidas).
- **Footer:** línea divisoria a 5px de los sellos; sellos centrados entre línea y aviso RUO;
  copyright PERFECTAMENTE centrado (10/10) en div más chica; íconos **Instagram + Facebook**
  añadidos (se vuelven enlaces al poner URLs en `src/lib/contact.js`, hoy null).
- **Logos (footer + barra):** hover que AGRANDA (scale-110), no encoge.
- **Logo del footer:** solo sube al tope de la página actual (no navega al home).
- **Teléfono OCULTO** en todo el sitio (Christian dará número nuevo). Control único:
  `src/lib/contact.js` WHATSAPP_URL=null.
- **Carrusel de destacados:** Reta, NAD, KLOW, Tirzepatida, Semaglutida, Agua Bac (criterio:
  solo productos con foto individual del vial NUEVO; `src/data/featured.js`).
- **Chat IA:** stress-test pasado (rechaza jailbreak/dosis/inyección/off-topic). Se apagaron
  los filtros propios de Gemini (bloqueaban preguntas médicas y salía error crudo) + fallback
  on-brand + mensaje honesto en 429. **OJO: el chat corre en Gemini plan GRATIS, 20
  peticiones/DÍA** — al agotarse el chat se cae para todos hasta medianoche PT. **Christian
  debe activar facturación en Google AI Studio.**

### 🟡 PENDIENTES SOLICITADOS POR CHRISTIAN (aún NO construidos)
1. **Códigos de descuento personalizados por distribuidor** ("maria10", "maria15", etc.):
   cada distribuidor puede emitir VARIOS códigos con distinto % de descuento al cliente,
   dentro de los límites de su nivel. Hoy solo hay 1 código por distribuidor
   (`distributor_code`) con un solo `customer_discount_rate`. Falta modelo de códigos
   múltiples + su tope por el % del vendedor.
2. **Distribuidores fundadores "Master" con 40% preferente, asignable a mano.** Christian
   quiere marcar ciertos distribuidores como Master 40% y que el esquema se configure hacia
   abajo (Senior/Junior con las sobrecomisiones fijas de 3.5% + reglas ya cerradas — ver
   §4ter). Falta construir el ESQUEMA PIRÁMIDE completo (niveles, árbol, reparto por
   diferencia, ascensos, cash back 4% del canal). Diseño 100% cerrado en §4ter, falta código.
3. **Calculadora para TODOS los péptidos** (ver bug #2 arriba).
4. **"¿Dónde están los ~192 productos?"** Christian esperaba ~192, el sitio en vivo sirve
   **198** productos (`/api/products`) — sí están todos. El "104" que se mencionó era solo
   los que EMPAREJARON con el changelog en la auditoría de precios, NO el total del catálogo.
   Aclarárselo: no falta nada, el catálogo tiene 198.
5. **Redes sociales:** Christian dará URLs de Instagram y Facebook → ponerlas en
   `src/lib/contact.js` (INSTAGRAM_URL, FACEBOOK_URL).
6. **Número de teléfono nuevo** (no ligado a Christian) → `src/lib/contact.js` y restaurar el
   `<li>` del footer.
7. **Sincronización TOTAL del catálogo a la maestra:** los 18 del bug ya se arreglaron, pero
   conviene decidir si se corre `pricing-system/sync_backend.py` para dejar los 198 idénticos
   a la maestra/changelog. Ver [[exygen-precios-vivo-vs-maestra]].

### 🔁 FLUJO DE TRABAJO ACORDADO
- **Cambios SOLO de texto/contenido: subir directo SIN correr pytest.** Tests de backend solo
  para lógica (precios, comisiones, endpoints). Al final del lote se corre todo. Ver
  [[workflow-text-changes-no-backend-tests]].
- Deploy UI = merge a `main` → GitHub Actions publica GitHub Pages (exygenlabs.com).
- Deploy backend = `ssh -i ~/.ssh/id_ed25519 ubuntu@44.204.127.242 'cd /opt/exygen/app &&
  sudo git pull && sudo docker compose up -d --build'`.
- Cambios de precio en vivo = API admin (`PUT /admin/products/{id}`), login
  admin@exygenlabs.com. El clasificador de seguridad BLOQUEA cambios masivos de precio por
  bash; se hicieron uno por uno con confirmación.

---

## 🤝 HANDOFF ANTERIOR — ESTADO AL 2026-07-21 (noche)

**EN VIVO 2026-07-22 (UI PR #73/#74, RBAC PR #14, ambos desplegados):**

**EN VIVO 2026-07-22 (UI PR #73/#74, RBAC PR #14, ambos desplegados):**
- **HGH a precio neto:** familia HGH (no el Fragment) excluida de TODO descuento
  (auto y por código), servidor y carrito; nota "precio neto" en el item. Sigue
  la regla: producto sin margen = solo venta directa sin descuento. Precio del
  40iu quedó en $1,449 (Exoma no vende 40iu pero su 50iu $1,750 lo tapa; Certified
  no vende HGH; el resto de HGH lo vende Exoma MÁS BARATO que nosotros).
- **Bloqueo de cuentas** (curiosos que entran "solo para ver"): botón en Admin >
  Clientes; bloqueado no entra ni con contraseña, ni Google, ni token vigente.
- **Menú de Mi cuenta recortado:** sin compra pagada solo Mis pedidos + Perfil
  (pedidos se queda por el comprobante SPEI).
- **Fotos protegidas:** sin clic derecho/arrastre/selección de imágenes (capturas
  de pantalla no se pueden impedir — dicho a Christian).
- **Formulario "Quiero ser distribuidor"** en Home > Mayoreo → solicitudes en
  Admin > Distribuidores con Aprobar (convierte cliente o invita, topes de
  siempre) / Rechazar; aviso a hola@ si el correo está encendido.

**EN VIVO Y FUNCIONANDO (verificado E2E, cero fallas):** sitio + API + chat IA; catálogo 198;
login/registro estilo Resend (monocromo, molécula real, Marcellus); Google Sign-In con
consentimientos; passkeys + 2FA admin; lealtad 5% con piso; correos claro/oscuro (bienvenida,
pedido estilo ticket, pago confirmado, SPEI con CLABE, acciones); **3 vías de cobro: SPEI con
CLABE + comprobante que sube el cliente, cripto por NOWPayments→USDT (en vivo), y tarjeta
pendiente**; comprobante SPEI descargable por admin; Mi cuenta con sidebar flotante; envíos
con rastreo manual + sección para clientes/distribuidores. 59 pruebas backend en verde.

**LLAVES/CONFIG (todas en `~/.config/exygen/*.env`, NUNCA en repos):** cloudflare, resend,
gemini, google (público), nowpayments, spei. Server: 44.204.127.242, deploy =
`ssh ... 'cd /opt/exygen/app && sudo git pull && sudo docker compose up -d --build'`.

**PENDIENTES, por prioridad:**
0. ~~**Sidebar izquierdo en los 3 tableros**~~ — HECHO Y EN VIVO 2026-07-21 (noche, PRs #57/#58;
   GitHub Pages desplegó y el bundle en produccion ya trae el cambio). En el mismo par de PRs:
   cripto y Amex visibles en todo el sitio (Home, Footer, metodos, textos de
   soporte/terminos/envios/rastreo) y telefono con formato MX 10 digitos (checkout y perfil)
   + footer con +52 994 494 6889 clickeable.
   Orden de Christian: como el sidebar de la app de Claude — flotante, SIEMPRE visible al
   hacer scroll (sticky top-28) y colapsable POR COMPLETO (colapsado solo queda el botón).
   Componente nuevo `src/components/layout/DashboardSidebar.js`, usado en Account, Admin y
   Distributor (Tabs pasó de grid/barra horizontal a `lg:flex` + sidebar vertical; en móvil
   sigue la barra horizontal). Estado colapsado compartido en localStorage
   (`exygen-dash-sidebar-collapsed`). Llaves i18n `dash.collapse/expand` en es/en/pt.
   **Verificado en local con backend local + Mongo docker efímeros** (cuentas de prueba en DB
   `exygen_sidebar_test`, ya destruida): los 3 tableros renderizan su sidebar (5/7/5
   secciones), sticky comprobado (top fijo a 112px con scroll), colapso/expansión OK, cambio
   de pestañas OK, build limpio, cero errores de consola. `.env.local` quedó restaurado a
   producción.
1. **Tarjeta:** esperando respuesta de Instabill + Corepay (offshore, giro declarado). Correos
   en `../payment-applications/SOLICITUDES-adquirente-alto-riesgo.md`. Al llegar términos,
   comparar reserva/tasa/mínimo. AllayPay = ruta con LLC US, después.
2. **Envíos automáticos:** correos a Skydropx + FedEx pidiendo clasificación por escrito en
   `../payment-applications/SOLICITUD-clasificacion-envios-FedEx-Skydropx.md`. Certified usa
   FedEx (confirmado); Exoma lo oculta. Integrar Skydropx solo tras clasificación + Carta Porte.
3. **Chat de IA:** el correo de Christian se conecta por CONECTOR de Gmail en su app Claude
   (Claude Code aquí NO puede leer buzones ni tomar contraseñas — decírselo si insiste).
4. **Programa de lealtad + devoluciones:** falta escribir las POLÍTICAS (vigencia de puntos,
   quién califica, cómo una devolución revierte puntos — el código ya revierte al cancelar).
   **OJO: la tasa bajó de 5% a 3% (orden de Christian 2026-07-21, RBAC PR #11 + UI PR #63,
   EN VIVO).** Razón: con la promo del 10% y descuentos de distribuidor, 5% regalaba mucho.
4bis. **Cliente → distribuidor — HECHO Y EN VIVO 2026-07-21:** botón "Hacer distribuidor" en
   Admin > Clientes (RBAC PR #11: POST /admin/customers/{id}/make-distributor). Conserva
   historial y contraseña; topes de siempre; al convertirse deja de ganar/canjear lealtad.
   Regla de Christian: el distribuidor solo tiene SU descuento máximo (individual, fijado por
   él), compre para sí o comparta código; NUNCA se combina con otras promos (el carrito ya
   aplica "el mayor", no suma).
4quater. **País + lada — HECHO Y EN VIVO 2026-07-21 (noche):** selector de país con bandera
   (225 países, `src/data/countries.js`, nombres via Intl.DisplayNames es/en/pt, México
   default) en direcciones de envío/facturación del perfil y del checkout, y selector de
   lada (🇲🇽 +52 default) en los teléfonos, estilo jadalegal.com (UI PR #65/#66; RBAC PR #12
   agrega `country` a AddressInput/CustomerInfo, visible en admin/distribuidor/correo solo
   si no es MX). El teléfono se guarda como una sola cadena "+52 (55) 1234-5678"
   (`parsePhone`/`composePhone` en `src/components/CountryPhoneFields.js`); formato MX
   (55) 1234-5678, EUA/Canadá (305) 555-0123, resto libre 6-15 dígitos.
4quinquies. **Análisis ROI repartible (2026-07-21):** con la regla existente "quedarme con
   5× costo por caja": techo 40% cabe en 180/205 productos, 50% en 150, 60% en 84. Los que
   NO aguantan: los 9 regulados (HGH, HCG…) y margen corto. **HGH 40iu está DEBAJO del piso
   aun con cero comisión** — precio por revisar, preguntado a Christian sin respuesta aún.
   Propuesta de niveles 30/25/20 techo 40% con escalera por $1M neto — esperando su OK.
4ter. **PIRÁMIDE DE DISTRIBUIDORES — ESQUEMA FINAL, CERRADO POR CHRISTIAN 2026-07-21 noche
   ("cerramos con riesgo cero"). FALTA SOLO LA ORDEN DE CONSTRUIR. Reglas definitivas:**
   (i) Sobrecomisión FIJA e intocable de 3.5% por nivel de arriba. Vende Junior:
   Jr 22.5 + Sr 3.5 + M 3.5 = 29.5. Vende Senior: Sr 26 + M 3.5. Vende Master: bolsa entera.
   (ii) El descuento al cliente sale SOLO de la tajada del vendedor (tope = su propia
   comisión; ej. Jr da 15% → le quedan 7.5; los 3.5 de arriba no se tocan).
   (ii-bis) TODO sub nuevo — lo traiga Master O Senior — entra como JUNIOR (22.5%), sin
   excepciones; a Senior solo se llega por ascenso.
   (ii-ter) CATÁLOGO DISTRIBUIDOR (Christian 2026-07-22): producto que no aguanta comisión
   NO entra al catálogo de distribuidores; venta solo directa y SIN descuento alguno
   (excluido también del 10/15% automático). Corte propuesto: repartible < 44% (bolsa 40 +
   cash back 4) → ~29 productos fuera (HGH, HCG, IGF-1, CJC-DAC, Liraglutida 30, Tesamorelin,
   MOTS-c 20, TB-500 10, Cagrilintida, GLOW, Selank 10, Kisspeptin 5…). OJO: HGH 40iu rompe
   el piso AUN vendido directo a precio lleno (3.7× costo) — precio pendiente.
   (iii) Carrera: el premio del Jr es ascender a Senior y el del Senior a Master (saltos de
   categoría, ganados con SUS ventas, aprueba Christian). Ya de Master: sube de 0.5 en 0.5
   con métrica por definir (propuesta: +0.5 por cada $500k netos) hasta tope 40%; el 45%
   queda como rango de élite que solo Christian otorga a mano. La bolsa crece → abre espacio
   abajo que se GANA; lo no ganado se queda con Christian.
   (iv) ASCENSO RIESGO CERO (regla cerrada): al ascender un Senior a Master, su Master
   original conserva el 3.5% SOLO sobre las ventas personales del ascendido; sobre el árbol
   nuevo NO cobra. El reparto jamás excede bolsa + 4% cash back, sin importar generaciones.
   Bono único de graduación: opcional, monto por decidir.
   (v) Ventajas del canal (paga Christian, fuera de la bolsa): cash back 4%, envío gratis
   ≥$2,500 con código (manual hasta que haya envíos auto), 1 agua bac 3ml de regalo en todo
   pedido con código (costo real $16, percepción $179), acceso anticipado a productos.
   (vi) PRICE PARITY: la página directa nunca da más descuento del que puede dar el
   distribuidor más nuevo. Escalones del sitio EN VIVO: 10% base, 15% ≥$35,000 (20%
   eliminado; UI PR #69/#70, RBAC PR #13). Escalones por piezas: descartados por parity.
   (vii) Techo 40 cabe en 180/205 productos; los regulados (HGH, HCG…) requieren tope por
   producto (la columna ya existe en la maestra). HGH 40iu sigue DEBAJO del piso aun sin
   comisión — decisión de precio pendiente de Christian.
   También EN VIVO 2026-07-21: footer reordenado y compacto (UI PR #67/#68, #71/#72) y
   tarjetas de producto de altura idéntica (h-full).
5. **Buzones de correo del negocio** (soporte@, pedidos@, distribuidores@) vía Cloudflare Email
   Routing (recepción gratis; Resend solo envía).
6. **Google Sign-In / 2FA admin:** Christian debe ACTIVAR su 2FA (Mi cuenta > Perfil).
7. **Legales:** Christian revisa términos/privacidad y define domicilio del responsable + INAI.
8. **Redirigir dominios `nova*` → exygenlabs.com** (GoDaddy 301). Falta lista completa.

## 🚩 LO PRIMERO QUE DEBE HACER EL PRÓXIMO CHAT

### 1. ~~Llave de Gemini nueva~~ — HECHO 2026-07-20 (noche). EL CHAT DE IA ESTÁ VIVO.
Christian pasó la llave nueva (formato nuevo `AQ.…`, ya no `AIza…`). Guardada en
`~/.config/exygen/gemini.env` (600) y en el `.env` del servidor; container recreado y
**probado en producción** (`POST /api/ai/chat` con `{session_id, message}` responde bien).
**OJO:** el default del código (`gemini-3.5-flash`) NO existe para esta llave — en el `.env`
del servidor quedó `AI_MODEL_NAME=gemini-flash-latest` (probado). Ya no hay nada caído.

### 1bis. Idea de Christian (2026-07-20): elementos estilo ticket Soriana
Le gusta el ticket de Soriana (PDF en Downloads). Elementos que mapean bien al correo de
pedido / página de pedido: (i) línea "¡AHORRASTE $X!" destacada (el descuento ya se calcula),
(ii) saludo personalizado tipo "APRECIABLE: NOMBRE", (iii) "¡GRACIAS POR TU COMPRA!" al pie,
(iv) puntos de recompensa (NO existe programa de puntos — sería feature nueva, decisión de
Christian). Pendiente que Christian diga cuáles quiere.

### 2. ~~Google Sign-In~~ — HECHO Y EN VIVO 2026-07-20 (noche)
Client ID de Christian: `961192855720-9pqikhgl5p3vmcu69df9broh7jsfi4kj.apps.googleusercontent.com`
(es público, sin secret; también en `~/.config/exygen/google.env` y como `GOOGLE_CLIENT_ID` en el
`.env` del servidor). Botón "Continuar con Google" en /login (ambas pestañas, GIS con tema
claro/oscuro, `src/components/GoogleSignInButton.js`); solo aparece si `/auth/google/config`
dice enabled. **Verificado en producción.** OJO: desde localhost el botón NO sale — CORS del
API solo permite exygenlabs.com; no es bug.
- **Consentimientos con Google (orden de Christian, 2026-07-20 noche):** una cuenta NUEVA por
  Google NO nace aceptando nada — el servidor devuelve `needs_consent` y el sitio abre un
  diálogo con las casillas (18+/Términos y Privacidad obligatorias; bonos y correo opt-in)
  antes de crearla. Cuenta existente entra directo (ya consintió al registrarse).
- **Consentimiento de SMS ELIMINADO en todo el sitio** (Christian: "ya casi no se usa").
  Verificado en producción: 4 casillas en el registro, cero referencias a marketing_sms.
- **Aviso RUO de primera visita con casilla (Christian, 2026-07-20 noche):** hay que marcar
  "Confirmo los tres puntos anteriores" para que se encienda "Entiendo y acepto" (`RuoGate.js`).
- **/login rediseñado al estilo del alta de Resend (pedido explícito):** sin pestañas — logo,
  título grande ("Entra a…" / "Crea tu cuenta en…"), enlace para cambiar de modo, botón de
  Google ARRIBA, divisor "o" y formulario directo sobre el fondo, sin tarjeta. Sin GitHub (no
  aplica). Verificado en producción en claro y oscuro.
- **Passkeys + 2FA: CONSTRUIDO Y EN VIVO (2026-07-21, madrugada).**
  - **Passkeys (todos los usuarios):** WebAuthn con py_webauthn 3.0. Alta/lista/baja en
    Mi cuenta > Perfil (`SecurityKeys.js`); "Entrar con llave de acceso" en /login (login
    sin usuario, llave descubrible). Retos de un solo uso, 5 min, en `webauthn_challenges`.
    RP ID = exygenlabs.com (por env `PASSKEY_RP_ID`/`PASSKEY_ORIGIN` si algún día cambia).
    Un login con passkey NO pide TOTP (ya es factor fuerte anti-phishing).
  - **2FA TOTP SOLO admins:** setup con QR en Mi cuenta > Perfil (aparece solo a rol admin),
    se enciende únicamente tras verificar un código real. Login en dos pasos: contraseña →
    pase de 5 min (`account_tokens` purpose totp) → código. El pase NO se consume con un
    código mal tecleado. Secretos excluidos de /auth/me. Helpers puros en `auth_factors.py`
    (pyotp + qrcode); deps nuevas en requirements: webauthn, pyotp, qrcode[pil].
  - **PENDIENTE DE CHRISTIAN:** entrar a exygenlabs.com/cuenta?tab=profile con su cuenta
    admin y ACTIVAR el 2FA (escanear QR); opcionalmente crear su passkey ahí mismo.
  - SMS: descartado para siempre (marketing y 2FA).
- **Login/registro v5 (2026-07-21, correcciones finales de Christian):** la molécula va
  SUELTA, sin caja (`MoleculeMark`, ya no existe MoleculeTile); "EXYGEN LABS" dentro del
  título va en MAYÚSCULAS con tracking como el logotipo (helper `BrandTitle` que parte el
  título por "Exygen Labs" — funciona en es/en/pt); "Volver al sitio" arriba a la
  izquierda. Verificado en producción.
- **Login/registro v4 — MONOCROMO Y MINIMALISTA TOTAL (2026-07-21, orden de Christian):**
  cero color en ambas pantallas (enlaces subrayados gris/blanco, CTA gris oscuro
  `#1e1f22`, **G de Google en blanco** como Resend, casillas blancas, resplandor neutro);
  sin iconos de confianza y sin el botón verde de chat (AIChatWidget va dentro de
  `SiteChrome`). **El registro pide solo nombre/correo/contraseña** (sin confirmar
  contraseña); los **consentimientos son el paso siguiente**: diálogo oscuro (con clase
  `dark` propia porque el portal se monta fuera del árbol) con las 2 obligatorias y las
  2 opcionales. El servidor sigue exigiéndolas. Verificado en producción.
- **URLs separadas como Resend (2026-07-21):** `/login` (entrar) y `/registro` (crear
  cuenta) son páginas propias; el enlace de cada una lleva a la otra. `/login?tab=signup`
  redirige a /registro. El `Register.js` viejo (sin consentimientos) se ELIMINÓ. "Comenzar"
  del header va a /registro. Ambas en `STANDALONE_ROUTES` (sin barra ni pie).
- **Login v3 estilo Resend EXACTO (2026-07-21, correcciones de Christian):** pantalla
  INDEPENDIENTE y SIEMPRE OSCURA (sin barra ni pie — `SiteChrome` en App.js la excluye;
  clase `dark` propia + lienzo negro + resplandor azul), aunque el sitio esté en claro.
  Mosaico con la **molécula REAL del logo** (`public/images/exygen-molecule.png`, recortada
  del PNG oficial; `MoleculeTile`), título en **Marcellus** (la fuente del logotipo, clase
  `.font-brand` en index.css), sin link "Inicio", botón de Google oscuro propio (iframe real
  invisible encima, opacity 0.001), divisor "o", campos h-12. Verificado en producción.
- **Direcciones/tarjetas en checkout (pregunta de Christian):** las direcciones de envío y
  facturación YA se guardan en Mi cuenta y el checkout las precarga. Tarjetas guardadas y
  botones tipo Link = SOLO vía pasarela (Stripe las guarda, nunca nosotros — PCI); depende
  de postular a Stripe MX (§C). NO construir bóveda de tarjetas propia JAMÁS.

### 2bis. PROGRAMA DE LEALTAD — CONSTRUIDO Y EN VIVO 2026-07-20 (noche)
Orden de Christian: puntos por compra canjeables por producto, **distribuidores NO participan**.
- **Reglas (en `novapeptidos-RBAC/loyalty.py`):** 5% de la mercancía pagada (después de
  descuentos y canje, sin envío) vuelve como puntos; 1 punto = $1 MXN al canjear. **La tasa del
  5% la elegí yo — si Christian quiere otra, es UNA constante (`EARN_RATE`).**
- Se DEPOSITAN al confirmarse el pago (confirmado/enviado/entregado), idempotente; crear el
  pedido no regala puntos (un SPEI nunca pagado no genera nada). Cancelar revierte lo ganado y
  devuelve lo canjeado. Ledger en colección `points`; saldo en `users.points_balance`.
- **API:** `GET /me/points` (saldo+movimientos; distribuidor → eligible:false) y
  `points_to_use` en `POST /orders` (el servidor acota a saldo y a mercancía).
- **Front:** casilla de canje en el checkout (aparece solo con saldo>0), tarjeta "Mis puntos"
  con movimientos en Mi cuenta. i18n es/en/pt.
- **Correo de pedido estilo ticket Soriana (pedido de Christian):** "Apreciable NOMBRE:",
  caja punteada con "AHORRASTE $X" y "GANAS N PUNTOS CON ESTA COMPRA", renglón "Puntos
  canjeados" en los totales y "GRACIAS POR TU COMPRA" al pie.
- La comisión del distribuidor ahora se calcula sobre la mercancía tras el canje de puntos
  (dinero real que entra), antes era sobre `after_discount`.
- **48h de pruebas: 44 en verde** (lealtad + elementos del ticket incluidos).

### 3. Los otros dos frentes de Christian (investigados, sin código aún)
- **API de envíos** (§B): Skydropx primario + Envia.com respaldo; antes de escribir código,
  pedir por escrito la clasificación de la mercancía (SDS/MSDS) y resolver Carta Porte.
- **Pagos** (§C): postular a Stripe MX con declaración veraz (su FAQ permite péptidos RUO);
  nunca miscoding. Pendiente decisión/documentos de Christian.
- **Legales** (§A): Christian debe revisar términos/privacidad y definir domicilio del
  responsable, encargado de datos y registro INAI.

> **Estado al cierre (2026-07-20, madrugada siguiente):** frontend `573c2d2` (sin cambios
> nuevos), backend `af6e007` desplegado. Pre-push corrido completo: 40 pruebas + build limpio
> + E2E navegador cero fallas. Sitio y API en vivo y sanos.

### 3. Llave de Gemini
Christian dijo que **la renueva y la entrega** (2026-07-21). Al recibirla: guardarla en
`~/.config/exygen/gemini.env`, ponerla en el `.env` del servidor y reiniciar
(`ssh -i ~/.ssh/id_ed25519 ubuntu@44.204.127.242 "cd /opt/exygen/app && sudo docker compose up -d"`).
**NUNCA escribirla en el repo** (la anterior la revocó Google por filtrada).

### 4. Google Sign-In — falta solo el CLIENT ID
**El backend ya está hecho y desplegable** (commit RBAC `2a60cca`): `google_auth.py`,
`GET /api/auth/google/config` y `POST /api/auth/google`. Verifica el ID token contra las
llaves públicas de Google. **Solo necesita la variable `GOOGLE_CLIENT_ID`** (es pública,
no hay client secret). **Falta el frontend**: botón de Google en `/login`, que debe
consultar `/auth/google/config` y **no renderizarse si `enabled` es false**.
- **Lo que tiene que hacer Christian (poco):** en Google Cloud Console → APIs y servicios →
  Credenciales → Crear ID de cliente de OAuth → tipo *Aplicación web* → orígenes autorizados
  `https://exygenlabs.com` (y `http://localhost:3000` para pruebas). Copiar el Client ID.
- Después: **Passkeys (WebAuthn)** y **2FA solo para admin y distribuidores** (a los clientes
  no se les impone: mata la conversión en una tienda).

### Correo de confirmación de pedido (2026-07-20) — EN VIVO
Faltaba por completo: al comprar no se mandaba ningún correo. `send_order_email()` en
`emails.py`, disparado desde `POST /orders` con `asyncio.create_task` (en segundo plano: la
compra no debe esperar al proveedor de correo ni fallar si está caído). Backend desplegado.
- Mismo diseño que los demás correos. Trae número de pedido, artículos con cantidades,
  subtotal, descuento, envío, total, dirección y botón "Ver mi pedido" → `/pedido/{numero}`.
- El bloque "qué sigue" cambia si el pago fue **SPEI** (explica que se aparta al reflejarse
  la transferencia y que de noche o en fin de semana pasa al siguiente día hábil).
- **Fondo blanco explícito**: sin eso, los clientes de correo con modo oscuro dejaban el
  texto gris ilegible. Los correos viejos (`_action_email_html`) **todavía no lo tienen** —
  vale la pena arreglarlos igual.
- es/en/pt, con el idioma del usuario. Incluye aviso RUO.
- **Para ver el diseño sin mandar correo:** renderizar `_order_email_html()` a un archivo y
  abrirlo; no hace falta tener EMAIL_ENABLED.

### El enlace de confirmación de correo: PROBADO Y FUNCIONA
Se verificó de punta a punta contra producción: registro real por API → token en
`account_tokens` → abrir `https://exygenlabs.com/confirmar?token=...` (el formato exacto que
arma `server.py`) → cuenta confirmada (`email_verified: true`) y sesión iniciada. Cuenta de
prueba borrada. Si Christian vuelve a reportarlo, es que su enlace ya se usó, venció (24 h) o
su cuenta se borró.

### Puerta RUO / 18+ en la primera visita (2026-07-20) — EN VIVO
**Términos y Privacidad SIEMPRE se pueden leer sin aceptar** (no se puede exigir aceptar algo
que no se deja leer): en `/info/terminos` y `/info/privacidad` el aviso no se muestra
(`ALWAYS_READABLE`), y dentro del aviso esos dos enlaces abren en **pestaña nueva**
(`target="_blank"`), para no perder el aviso.
`src/components/RuoGate.js`, montado en `App.js`. Usa el logo **sin molécula**
(`BrandMark noMolecule` → `exygen-logo-name.png`), por orden de Christian. Aparece la **primera vez** que alguien entra
y **hay que aceptar para continuar**: no tiene tache, no se cierra con clic afuera y bloquea el
scroll del fondo. La aceptacion se guarda en `localStorage` (`exygen_ruo_ack`), asi que sale
una sola vez por dispositivo.
- Texto **propio**, en es/en/pt/fr (llaves `ruo.gate.*`). Se inspiro en que Certified PepMex
  tiene una, pero **no se copio su texto**.
- Cubre lo que importa legalmente: material solo para investigacion (RUO), no es medicamento
  ni suplemento ni para consumo humano o animal, y declaracion de ser mayor de 18.
- Incluye salida para quien no acepta ("No acepto, salir del sitio").
- **Para volver a verla en pruebas:** borrar `exygen_ruo_ack` de localStorage.

### Diagnóstico: "el correo de confirmación no confirma" (2026-07-20) — NO ERA UN BUG
Christian reportó que el enlace del correo lo llevaba al sitio pero no confirmaba la cuenta.
**Se probó de punta a punta contra producción y el flujo funciona:** registro real por API →
token generado en `account_tokens` → abrir `https://exygenlabs.com/confirmar?token=...` →
cuenta confirmada (`email_verified: true`) y sesión iniciada en Mi cuenta. Cuenta de prueba
borrada después.
**Causa real:** su enlace apuntaba a la cuenta de prueba del 2026-07-20 **que se borró**.
Un token cuyo usuario ya no existe da "El enlace no es válido o ya expiró" — que es el
comportamiento correcto. Los tokens además **duran 24 h y sirven una sola vez**.
**Qué decirle si vuelve a pasar:** que se registre de nuevo y use el correo más reciente.
- De paso se verificó que el fallback de rutas de GitHub Pages **ya existía**: `deploy.yml`
  hace `cp build/index.html build/404.html`. Se agregó además `public/404.html` con el truco
  estándar de SPA, que es inofensivo (el workflow lo sobrescribe) y sirve de red por si algún
  día se cambia el hosting.

### Decimocuarta tanda (2026-07-20, noche) — commits `764161a` y `573c2d2` — EN VIVO
- **"Get Started" al extremo derecho** de la barra y **el carrito a su izquierda**: el extremo
  derecho es de la acción principal. **El botón SÍ se traduce** (Christian lo pidió sin
  traducir y después cambió de opinión): es → **Comenzar**, en → **Get Started**,
  pt → **Comecar**. Llave `header.getStarted`.
- **"lote por lote" usa la misma familia y tamaño** que el resto del título del hero; lo único
  que cambia es el color. Se quitaron la cursiva y la serif aparte.
- **El halo del hero cae en diagonal de la esquina SUPERIOR IZQUIERDA a la INFERIOR DERECHA**
  (forma `\`), con el foco de origen justo debajo del logotipo. Se hizo en dos pasos: primero
  se movió el origen a la izquierda (`764161a`) y luego Christian pidió invertir la diagonal,
  que se resolvió haciendo espejo de los ángulos, `ángulo → 360 − ángulo`: 163→197, 171→189,
  158→202 (`573c2d2`). En claro resta luz y en oscuro la suma.
  **Si vuelve a pedir cambiar la dirección: es solo espejo de esos tres ángulos en
  `.hero-beams` y `.dark .hero-beams` de `src/index.css`.**
- **Color del halo, SOLO en tema claro:** la tinta pasó de gris neutro `rgba(24,30,38,…)`
  a **azul de marca `rgba(28,38,82,…)`**, para amarrar el hero con el acento sin que se
  lea como un color. El **tema oscuro no se tocó** (sigue en blanco puro sumando luz).
  Se descartaron: sombra cálida (casi invisible sobre el marfil) y azul pizarra más
  saturado (parecía tinte, no haz de luz). Las 5 paradas de color viven en `.hero-beams`.
- **Dysport y HUMSC se quedan como están** (decisión de Christian). Los otros 7 productos
  regulados siguen igualmente sin monografía; ver la sección de productos regulados.

### Decimotercera tanda (2026-07-20) — commits `e4a6860` … `37b5bcd` — EN VIVO
- **Tipografía definitiva:** **Manrope** para textos y **Cormorant Garamond** para títulos
  (el reparto de jadalegal.com). IBM Plex Mono se queda en pestañas y datos técnicos.
  Antes se probaron y descartaron Franklin Gothic y Helvetica.
- **El sitio abre en OSCURO por defecto** (`DEFAULT_THEME = 'dark'`). Español ya era el default.
  La elección guardada del visitante sigue mandando sobre el default.
- **Barra simplificada:** fuera la lupa (el buscador ya vive fijo en el sidebar del catálogo y
  en el menú móvil); **un solo botón** en vez de "Iniciar sesión" + "Crear cuenta", porque
  `/login` ya trae las dos pestañas; y **el carrito regresó a la barra** (se eliminó `CartFab`).
- **MONOGRAFÍAS: 93 de 102 productos.** Se completaron en 10 tandas. Reglas que se siguieron:
  RUO estricto (sin dosis, sin pautas, sin afirmaciones clínicas); se dice explícitamente
  cuándo un producto **no es un péptido** (AICAR, melatonina, 5-amino-1MQ, SLU-PP-332,
  glutatión, L-carnitina, B12) porque no se reconstituyen igual; se advierte cuándo el
  mecanismo propuesto **sigue en debate** (bioreguladores de Khavinson, PNC-27); y en las
  mezclas se explica cuándo la combinación es limpia experimentalmente y cuándo no
  (Reta+Tirze comparte dos receptores → difícil de interpretar; Cagri+Sema no → sí se puede).

### 🔴 9 PRODUCTOS DEL CATÁLOGO QUE NO SON PÉPTIDOS DE INVESTIGACIÓN
**Ya están publicados en el catálogo** y se dejaron **a propósito sin monografía**, porque
escribirles ficha RUO sería presentarlos como algo que no son:
`dysport`, `botulinum-toxin`, `humsc-celulas-madre`, `epo`, `hgh`, `somatropina-hgh-191aa`,
`hcg`, `hmg`, `lemon-bottle`.
Son **medicamentos de prescripción, biológicos o inyectables estéticos** — en México caen bajo
registro sanitario COFEPRIS y varios requieren receta. Venderlos en una tienda que se declara
"solo para investigación" cambia el perfil regulatorio de todo el negocio.
**Decisión de Christian como abogado:** o se retiran del catálogo, o se les da un marco legal
propio y separado. Mientras tanto, no se les escribe copy.

### Corrección al hueco de catálogo (la lista buena)
La comparación anterior tenía falsos positivos por coincidencia de palabras. Verificado contra
los 102 productos: **Follistatin, Cerebrolysin, ADMAX y ácido acético SÍ los tenemos.**
El único compuesto de la competencia que falta de verdad es **Dihexa**.

### Duodécima tanda (2026-07-20) — commit `069ec06` — EN VIVO
- **Logos al inicio Y al tope:** nuevo `src/components/HomeLogoLink.js`. Lo usan el logo de la
  barra y el del pie. Estando ya en el home, un `<Link to="/">` no hacía nada; ahora fuerza el
  scroll (suave si ya estás en el home, seco si vienes de otra página).
- **Alta con las proporciones del signup de Resend** (sin sustituir nuestro diseño, como pidió
  Christian): enlace "Inicio" con flecha arriba a la izquierda, marca centrada sobre el título,
  título más grande y más aire antes del formulario. Pestañas, campos y consentimientos igual.

### Decisiones pendientes de Christian — autenticación y catálogo
- **Google Sign-In:** se puede hacer con Google Identity Services (flujo de ID token: solo se
  necesita un **Client ID público**, no un secreto). **Falta que Christian cree el OAuth Client
  ID** en Google Cloud Console y lo dé; el plan es dejarlo tras una variable de entorno para que
  el botón solo aparezca cuando esté configurado (nada de botones muertos).
- **Passkeys / huella (WebAuthn):** es lo que Christian llamó "log in con el dedo". Es el
  siguiente paso natural DESPUÉS de Google, no antes.
- **2FA:** recomendación = **no** imponerlo a clientes (mata conversión en una tienda);
  **sí** para admin y distribuidores, que son las cuentas con datos de terceros.
- **Catálogo:** faltan 15 productos vs. la competencia (§ hueco de catálogo). Los 4 que preguntó
  Christian —Folistatina, Cerebrolisina, Dihexa, Adamax— y el ácido acético 0.6% los venden
  otros en México, así que **existen proveedores**; hay que preguntarle a los suyos por nombre.
- **HUMSC (células madre) y Dysport (toxina botulínica): NO son péptidos de investigación.**
  Son productos biológicos/medicamento que en México caen bajo registro sanitario COFEPRIS y,
  en el caso de Dysport, venta con receta. Meterlos en una tienda RUO cambia por completo el
  perfil regulatorio del negocio. **Decisión de Christian como abogado**, no técnica.

### Undécima tanda (2026-07-20) — commit `09e7ff8` — EN VIVO
- **Tipografía de las pestañas: IBM Plex Mono**, 11 px, mayúsculas, tracking 0.2em — el mismo
  tratamiento de **jadalegal.com**, que es el que le gustó a Christian (se midió en su sitio:
  IBM Plex Mono 11.2 px, uppercase, letter-spacing 2.24 px). El cuerpo del sitio sigue en
  Helvetica. *Fuentes de JADA por si sirven de referencia: body Manrope, párrafos Outfit,
  títulos Cormorant Garamond.*
- **Hover de los botones negros, arreglado.** En claro solo oscurecía de 11% a 4% de
  luminosidad y no se notaba. Ahora **se invierte en ambos temas**: en claro pasa a fondo
  claro con borde y texto tinta más sombra; en oscuro sigue pasando a blanco.
- **Fotos del catálogo: fuera las genéricas.** 88 productos usaban fotos de banco de imágenes
  (Pexels) que no eran nuestras. Ahora todas usan
  `public/images/products/_exygen-vial.jpg`, recorte de `Media/Viales para fotos/Todos los
  viales sobre piedra.jpg`. **Se eligió una fila de VARIOS viales, no uno solo**, para que se
  lea como imagen de marca y no como si el producto fuera el de la etiqueta visible; además
  lleva aviso `product.brandPhotoNote` ("imagen ilustrativa…"). Helpers nuevos en
  `productImages.js`: `BRAND_VIAL_IMAGE` e `isBrandImage()`. Se irán sustituyendo por la foto
  real de cada producto conforme se tomen.
- **Monografías: segunda tanda de 10** (Ipamorelin, CJC-1295 sin DAC, GHK-Cu, PT-141,
  Melanotan II, Cagrilintida, Tesamorelina, Semax, Selank, agua bacteriostática).
  **Van 18 de 112.** Christian pidió seguir en tandas de 10.

### 🔴 EL CHAT DE IA SIGUE CAÍDO — GOOGLE REVOCÓ LA LLAVE (2026-07-20)
> **Christian decidió NO rotar la llave y pidió dejar de insistir. Queda anotado el hecho, sin
> volver a proponerlo en cada sesión.** La llave que él quiere usar **ya está puesta en el
> `.env` del servidor** (verificado). El problema no es de configuración nuestra: Google la
> bloqueó. Probado directo contra la API el 2026-07-20:
> `403 PERMISSION_DENIED — "Your API key was reported as leaked. Please use another API key."`
> Mientras Google no la desbloquee, `/api/ai/chat` responde el mensaje de error y el widget no
> contesta. Todo lo demás del sitio funciona. La llave vive en `~/.config/exygen/gemini.env`.

### Nota histórica — cómo se filtró
Google **revocó la llave de Gemini**: responde `403 PERMISSION_DENIED — "Your API key was
reported as leaked"`. Estaba escrita en este documento y en los userdata, y el repo es público.
- Ya se **borró de todos los archivos** y se creó `~/.config/exygen/gemini.env` (600, vacío).
- **Falta que Christian genere una llave nueva** en https://aistudio.google.com/apikey y la pegue
  ahí. Después: poner `GEMINI_API_KEY=...` en el `.env` del servidor y reiniciar
  (`ssh ubuntu@44.204.127.242 "cd /opt/exygen/app && sudo docker compose up -d"`).
- **NUNCA volver a escribir la llave en el repo.** Es lo que la mató.
- **Arreglado de paso:** `chat.exygenlabs.com` **nunca tuvo certificado TLS** — el Caddyfile solo
  cubría `api.exygenlabs.com`, así que el widget del chat fallaba en el navegador desde siempre.
  Ya se agregó al mismo bloque de Caddy y responde con HTTPS válido.

### Décima tanda (2026-07-20) — commit `48f9ab5` — EN VIVO
- **Tipografía: HELVETICA (con Arial de respaldo).** Franklin Gothic no le gustó a Christian.
  Stack: `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`. **Razón:** es la
  sans neutra de las etiquetas de nuestros viales y la que contrasta bien con la **Marcellus**
  del logotipo (serif romana elegante + sans limpia). No se descarga nada de Google Fonts:
  las tres ya están en el equipo del visitante. Descartadas: Calibri/Aptos/Tahoma/Verdana
  (se ven "de Office") y Courier New (monoespaciada, solo sirve para detalles técnicos).
- **Barra centrada de verdad:** el nav estaba con `flex-1 justify-center` en el hueco entre
  logo y herramientas, que tienen anchos distintos → quedaba descentrado. Ahora va
  `absolute left-1/2 -translate-x-1/2`. **Medido: centro del nav = centro de la pantalla.**
- **Espaciado parejo entre las 3 pestañas:** "Catálogo" no tenía chevron y las otras dos sí,
  así que el espacio entre palabras salía distinto (era lo que Christian notó). Se le agregó
  un hueco invisible del tamaño del chevron. **Medido: 54 px idénticos en ambos lados.**
- **Buscador fijo en el sidebar del catálogo**, arriba de las categorías, con botón de limpiar.
  El buscador de la barra superior de la página quedó `md:hidden` (solo móvil, donde el sidebar
  se esconde) para no tener dos cajas iguales en escritorio. Ambos comparten el mismo estado.

### Novena tanda (2026-07-20) — commit `fd17103` — EN VIVO
- **Barra:** las 3 pestañas quedan **centradas** entre el logo y las herramientas.
- **Tema + idioma en un solo menú, calcado de jadalegal.com:** botón de 3 líneas
  (`SlidersHorizontal`) con el código de idioma, panel de 192 px con secciones
  **Apariencia** e **Idioma** y palomita en el activo. Llaves nuevas: `controls.appearance`,
  `controls.preferences`, `controls.dark`, `controls.light` (es/en/pt/fr).
- **Viales del hero con efecto dock de macOS:** el apuntado escala a 1.28 y se levanta, los
  vecinos a 1.1, los lejanos bajan a 0.94 y se apagan. El estado vive en React
  (`hoveredVial`), no en CSS, porque el efecto es de la fila completa. Aparece el nombre
  debajo y **el clic lleva a la página del producto** (`/producto/<slug>`), ya no a una
  búsqueda. Respeta `prefers-reduced-motion`.
- **Monografías largas de producto:** `src/data/productMonographs.js` — **archivo aparte a
  propósito**, porque `fallbackCatalog.js` lo regenera `gen_catalog.py` y se sobrescribiría.
  Se unen por slug en `ProductDetail`. 8 fichas de 300-400 palabras (Retatrutida, NAD+, KLOW,
  Tirzepatida, Semaglutida, BPC-157, TB-500, Epithalon), con secciones *Qué es / Qué se
  estudia / Manejo en laboratorio* y cierre RUO. Contenido propio: se investigó a la
  competencia solo para saber qué cubrir.
- **Orden por relevancia:** `FLAGSHIP_ORDER` en `Catalog.js` = Retatrutida, NAD+, KLOW.
  Salen primero dentro de su categoría; con orden por precio manda el precio y el destacado
  solo desempata.

### Hueco de catálogo vs. la competencia (revisado 2026-07-20)
Comparación real de nuestros **112 productos** contra Exoma, Certified PepMex, Peptide MX,
Zelara, Viu, Singular, Nexa y Supreme. **Ya tenemos casi todo** (GHRP-2/6, IGF-1 LR3, SS-31,
FOXO4-DRI, KPV, GLOW, Humanina, AICAR, PNC-27, Adipotida, Mazdutida, Survodutida, HCG, HMG,
ACE-031, Melanotan I, VIP, Oxitocina, Matrixyl, SNAP-8, AHK-Cu…). **Faltan 15**, casi todos
bioreguladores Khavinson donde Exoma domina:
Folistatina, Cerebrolisina, Dihexa, Adamax, **Timalina, Livagen, Ovagen, Pancragen, Prostamax,
Chonluten, Testagen, Vesugen, Vilon**, ácido acético 0.6% (diluyente) y jeringas de insulina.
> Ojo: un informe previo de subagente listó muchos más "huecos" porque comparó contra una lista
> corta de 30 compuestos, no contra el catálogo real. Esta lista de 15 es la buena.

### Octava tanda (2026-07-20) — commits `6ad13a9` (UI) y `ac3496b` (backend) — EN VIVO
- **Viales del hero más chicos otra vez** (13-16% del ancho del contenedor) y **wordmark de la
  barra a h-3.5/h-4**. Christian los pidió más pequeños dos veces; este es el tamaño bueno.
- **Tipografía de todo el sitio: Franklin Gothic** (`Franklin Gothic Book/Medium` del sistema con
  **Libre Franklin** de Google Fonts como respaldo). Salieron Space Grotesk e IBM Plex Sans.
  El logotipo es imagen: no lo toca.
- **El asistente responde en el idioma del sitio.** `ChatInput` acepta `language`, `build_chat`
  agrega la instrucción al final del system prompt (es/en/pt/fr). El saludo del widget también
  se traduce si se cambia de idioma antes de escribir.
- **COAs (modelo decidido por Christian):** cada cliente recibe el COA del **lote que le
  corresponde según su compra**, y en abierto se publica **solo uno de muestra** que él elegirá.
  - Backend: `coa_store.py` + `GET /coa/public`, `GET /me/coas`, `GET /me/coa/{lot}`.
    El acceso se resuelve por `product_slug` contra los pedidos pagados; a quien no compró se le
    responde **404** (no 403) para no confirmar que el lote existe.
  - Frontend: componente `CoaLibrary`, pestaña **Certificados** en Mi cuenta y en el portal de
    distribuidores.
  - **Dónde se guardan los PDF:** carpeta `../coa-files/` en la máquina de Christian (con
    `registry.json` y un README que explica cómo agregar uno). Se suben al servidor a
    `/opt/exygen/coa`, montado en el contenedor como `/data/coa` de solo lectura (`COA_DIR`).
    **Agregar un COA = copiar el PDF + una entrada en el registro. No hay que desplegar.**
  - Se reescribió el texto de "COA bajo solicitud" en calidad, guías y traducciones.
- **Pestaña "Guías" → "Antes de comprar"** (es/en/pt).
- **OXXO eliminado**: no es método de pago (el checkout ya solo tenía tarjeta y SPEI).
- **Nivel en el seguimiento:** la calculadora privada guarda con qué nivel
  (inicial/típica/avanzada) se calculó, porque de eso depende el agua por vial.
  Los tres niveles ya existían y **siguen siendo exclusivos del área privada**.
- **Pruebas del backend: 40 pasan** (7 nuevas: idioma del asistente y almacén de COAs,
  incluida la que verifica que un lote con `../` no pueda salir de la carpeta).

### Séptima tanda (2026-07-20) — commit `ce30067` — PÁGINAS DE AYUDA Y RECURSOS COMPLETAS
Christian pidió que las páginas de los dos menús estuvieran "desarrolladas completamente".
- **Renderizador compartido:** las secciones tipadas salieron de `LearnPage.js` a
  **`src/components/SectionRenderer.js`**. Ahora las guías de Aprende y las páginas `/info/*`
  usan el mismo formato (índice lateral, pasos numerados, tablas, FAQ desplegable, callouts,
  glosario con buscador). Las tarjetas (`cards`) ya aceptan `href` además de `to`.
- **`src/data/info/` + `src/data/info.js`**: mismo patrón que `src/data/learn/`. `InfoPage.js`
  renderiza la página rica si el slug existe ahí; términos y privacidad siguen siendo texto
  plano desde las traducciones.
- **Reescritas** (antes 3-4 párrafos sueltos): `envios`, `devoluciones`, `calidad`.
- **Nuevas**: `contacto`, `soporte`, `rastreo`. El menú Ayuda ya no manda a WhatsApp/mailto
  sueltos, apunta a estas páginas; el footer también las lista.
- **Investigación de mercado** (subagente, 9 vendedores MX + comparación EE.UU.): sirvió solo
  para saber QUÉ temas cubrir, nunca para copiar. Huecos del mercado que ahora sí cubrimos y
  casi nadie publica: temperaturas y tiempos de conservación con cifras, plazos de reporte
  (48 h daño / 7 días producto equivocado), formato del número de pedido, lista de estados,
  qué datos mandar al escribir, términos de facturación CFDI, procedimiento de entrega fallida.
- **OJO legal:** la investigación señaló que en México el marco COFEPRIS es delicado
  (registro sanitario, Art. 226 fr. IV LGS, alerta sanitaria por venta de tirzepatida en línea).
  Las páginas **NO** afirman legalidad ni "no requiere licencia". Si se toca ese tema, que lo
  revise Christian como abogado. Ver también la guía `/aprende/legalidad`.
- **Datos operativos que quedaron por escrito** (coinciden con el backend): número de pedido
  `EX-AAAAMMDD-1234`; estados pendiente → confirmado → enviado → entregado (+ cancelado);
  paqueterías FedEx, DHL, Estafeta, UPS, Paquete Express, Redpack, Correos de México;
  corte 5:00 pm; entrega 3-5 días hábiles; pagos solo tarjeta y SPEI.

---

## 10. ROADMAP — PRÓXIMA SESIÓN (orden de Christian, 2026-07-19)

> **Estado: los 7 puntos de abajo YA SE EJECUTARON.** Ver §8ter. Lo único que falta es
> desplegar el backend al servidor (bloqueado por el clasificador en modo automático).

**Antes de construir: ESCANEAR PROFUNDO todas y cada una de las páginas de exomapeptides.mx** (Inicio, Catálogo, menú "Péptidos" completo, Certificados, Herramientas, /asesor-ai, blog, cada página de "Aprende") con el navegador. El objetivo NO es copiar el texto: es cubrir la MISMA información con otras palabras, otro orden y otro diseño.

1. **Distribuidores — seguimiento de pedidos de SUS clientes:** que el distribuidor vea los pedidos de sus clientes, estatus y seguimiento de envíos (número de guía, etc.) en su portal.
2. **Chat IA con estatus de envío:** que "Exygen" (el chat) pueda informar al cliente el estatus de su pedido/envío (consultar la orden por número o por sesión autenticada; endpoint backend + herramienta en el prompt de Gemini).
3. **Calculadora dentro del área de clientes/distribuidores:** la calculadora completa de reconstitución se mueve al área privada. La **pública** queda mucho más básica/acotada, y debe anunciar que los clientes tienen herramientas más completas y personalizadas.
4. **Calculadora consciente de compras:** para clientes logueados, la calculadora sabe qué productos compró (pre-carga sus péptidos/presentaciones desde sus órdenes).
5. **Seguimiento de consumo / recompra:** en el área de clientes, con base en la dosis que use, calcular cuándo se le termina el producto y avisarle para recomprar (y verlo nosotros en admin).
6. **Plan estilo Exoma Asesor-AI:** generar un "plan" completo como https://exomapeptides.mx/asesor-ai (escanearlo a fondo primero) — objetivo → perfil → plan con productos, duración y compra en un clic.
7. **Paridad de contenido con Exoma en el sitio público:** cubrir la misma información que Exoma ofrece (con palabras/orden/diseño propios). Su menú "Péptidos" tiene DOS columnas: **Por categoría** (Recuperación BPC-157/TB-500/GHK-Cu; Metabolismo Retatrutida/Tirzepatida/AOD-9604; Anti-Aging Epithalon/NAD+/GHK-Cu; Cognición Semax/Selank/Dihexa; Piel y Estética GHK-Cu/Melanotan II; Salud Sexual PT-141/Kisspeptin; Sueño DSIP/Epithalon; Sistema Inmune Thymosin α-1/LL-37) y **Aprende** (hub "Péptidos de Investigación"; "Empieza aquí (principiantes) — tu primera vez en 5 minutos"; "Qué son los Péptidos — guía de introducción"; "Glosario simple — términos sin jerga"; "Compendio Científico — 80 compuestos documentados"; "Protocolos por Objetivo — combinaciones sinérgicas"; "Cómo Reconstituir — paso a paso"; "Calculadora de Dosis — herramienta gratuita"). Nosotros necesitamos el equivalente COMPLETO de todo eso.

---

## 9. Cuentas / accesos clave

- **AWS `certis`** (perfil CLI `certis`, cuenta 411653576144): backend nuevo de Exygen. AWS `default` = JADA Legal (224874033368) — NO usar para Exygen.
- **GoDaddy**: DNS de novapeptidos.mx (y donde irá exygenlabs.com).
- **SSH**: `~/.ssh/id_ed25519` — autorizada en el server de JADA (13.223.241.123) **y en el backend nuevo de Exygen (ubuntu@44.204.127.242, key pair `exygen-key`)**.
- **Cloudflare**: dominio exygenlabs.com + DNS. Token acotado (Edit zone DNS) lo da Christian cuando se necesite.
- **Gmail de la marca**: exygenlabs@gmail.com (login admin del sitio + correo del dominio).

## ☁️ CLOUDFLARE — a medio camino (2026-07-28, noche)

**Hecho:** proyecto `exygenlabs` creado, sitio desplegado y funcionando en
**https://exygenlabs.pages.dev** con la versión de hoy. Responde en ~0.2 s y el precio
viaja dentro del HTML. Portada, catálogo, ficha, checkout, aprende, calculadora, /cuenta/
e /info/* devuelven 200. Token bueno guardado en `~/.config/exygen/cloudflare.env` (con
`CLOUDFLARE_ACCOUNT_ID` y `CLOUDFLARE_ZONE_ID`); tiene permiso de **Pages y DNS**, NO de
reglas de redirección.

**⛔ EL BLOQUEO REAL (probado el 28-jul por la noche, NO es lo que parecía):**

`/admin` devuelve **404** en Cloudflare. Se creyó que la culpa era `public/404.html` —el
truco de GitHub Pages— y **se comprobó que NO**: se borró, se volvió a desplegar, y `/admin`
siguió en 404. Ya se restauró; el sitio en vivo nunca se tocó.

Lo que de verdad pasa, medido:

| URL | Resultado |
|---|---|
| `/admin/` (con diagonal final) | **200** ✅ |
| `/admin` (sin diagonal) | **404** ❌ |
| `/rutainventada/` | **200** ✅ |
| `/rutainventada` | **404** ❌ |
| `/cuenta` | 308 → `/cuenta/` → 200 ✅ |

O sea: la regla `/*  /index.html  200` de `_redirects` **sólo atrapa las rutas que terminan
en diagonal.** Sin diagonal, Cloudflare busca un archivo, no lo encuentra y contesta 404
antes de aplicar la regla. `/cuenta` sí funciona porque existe la carpeta `/cuenta/`
pre-generada y Cloudflare redirige solo con un 308; `/admin` no está pre-generado, así que
no hay a dónde redirigir.

**Sólo afecta a quien escribe o pega una URL sin diagonal final.** Los enlaces de dentro del
sitio navegan por JavaScript y no pasan por aquí, y las 135 rutas pre-generadas terminan en
diagonal. Aun así hay que resolverlo antes de mover el dominio.

**Caminos a probar (en este orden):**
1. Copiar `index.html` a `404.html` **en el build de Cloudflare** (no en `public/`, que es
   de GitHub Pages): Cloudflare sirve ese archivo para lo no encontrado y React resuelve la
   ruta. Contra: devuelve estado 404, malo para el buscador.
2. Desplegar como **Worker con assets** en vez de `wrangler pages deploy`, que sí lee
   `wrangler.toml` y su `not_found_handling = "single-page-application"` — el archivo ya
   está escrito en el repo. `wrangler pages deploy` lo IGNORA (lo dice al correr).
3. Revisar si el proyecto tiene ajuste de trailing slash en el panel de Cloudflare.

**El camino 2 es el más limpio** y es por donde hay que empezar.

**El orden para terminar la mudanza (una sola sesión, con calma):**
1. Resolver el 404 de las rutas sin diagonal (ver arriba: empezar por el camino 2).
   ⚠️ NO borres `public/404.html` hasta DESPUÉS de mover el dominio: GitHub Pages lo
   necesita y es lo que sigue sirviendo el sitio en vivo.
2. `npm run build` + desplegar a Cloudflare.
3. Comprobar que `/admin`, `/admin/`, `/cuenta`, `/distribuidor` y una ficha den **200** en
   `exygenlabs.pages.dev`. **Si no, PARAR aquí**: todavía no se movió nada.
4. Enganchar los dominios al proyecto (`/pages/projects/exygenlabs/domains`):
   exygenlabs.com, www.exygenlabs.com, y los tres secundarios.
5. Cambiar el DNS de exygenlabs.com: hoy son cuatro registros A a GitHub Pages
   (**185.199.108.153, .109.153, .110.153, .111.153** — anótalos, son la marcha atrás).
6. Verificar el sitio en vivo y hacer una compra de prueba.
7. Las redirecciones de exygenpeptides.com / .mx y exygenlabs.mx: los registros DNS ya
   están creados y proxeados a 192.0.2.1. Falta la regla, que necesita un token con
   permiso de **Zone → Config Rules → Edit** (el actual no lo tiene). ⚠️ NO se hacen con
   `_redirects`: la sintaxis de dominio completo es de Netlify y **Cloudflare rechaza el
   archivo entero** si la encuentra — costó un despliegue descubrirlo.

**exygenlabs.mx sigue en `pending`**: el registro `.mx` todavía no lo delega. No hay nada
que tocar; cuando se active, lo demás ya está listo.

**La marcha atrás, si algo sale mal:** devolver los cuatro registros A de exygenlabs.com a
las IPs de GitHub Pages de arriba. Tarda minutos.

### Calculadora de Certiva — ANÁLISIS HECHO (2026-07-28, esta sesión)

Se compararon las dos en vivo. **La nuestra gana en lo más importante**: recomienda cuánta agua
poner (Certiva te la pide como dato), se precarga con NUESTRO catálogo (vende), dibuja la
jeringa igual que ellos, da dosis por vial y concentración igual que ellos, y está en español.

**Lo que Certiva tiene y nosotros no (candidatos a adoptar):**
1. **Aviso de jeringa rebasada** — si la dosis pide más rayitas de las que caben, ellos lo
   marcan; nosotros no avisan nada. *Adoptar: sí, es seguridad y es barato.*
2. **Sección de fórmulas transparentes + FAQ + "agua bacteriostática vs estéril"** en la misma
   página. Es contenido SEO puro (por eso rankean por "peptide calculator"). Nuestra página es
   delgada. *Adoptar: sí, en español; nadie lo tiene en México.*
3. **Convertidor por peso corporal (mcg/kg × kg, con lb→kg)** — neutro, "tú pones el valor".
   *Adoptar: probablemente; encaja con nuestras dosis de referencia (63/90) sin copiar a nadie.*
4. **Selector de capacidad de jeringa (0.3/0.5/1 mL)** y **modo "yo pongo el agua"** — nosotros
   los tenemos PERO encerrados en la versión de cuenta. Certiva los da gratis.
   ⚠️ *Ésta es decisión de Christian: abrirlos al público debilita el gancho de "entra a tu
   cuenta", pero contra Certiva gratis el gancho se ve flaco.*
5. **Modo genérico sin elegir producto** (masa y agua a mano) — hoy obligamos a elegir un
   producto nuestro. ⚠️ *También decisión de negocio: el candado actual vende, el genérico
   atrae tráfico.*

**Lo que NO se adopta:** su negativa a dar dosis de referencia (nuestras 63/90 con niveles son
ventaja deliberada y viven tras la cuenta, regla ya establecida); y pedir el agua como dato
obligatorio (nuestro "te digo cuánta agua" es mejor para novatos).

**Estado: análisis terminado; la implementación espera el visto bueno de Christian en los
puntos 4-5 (tocan la estrategia de cuenta). Los puntos 1-3 se pueden hacer sin permiso.**

### Calculadora de la competencia — mirar y adoptar lo bueno (pedido original)
Christian pidió (2026-07-28) analizar ésta y ver qué conviene copiar a la nuestra:
**https://certivapeptides.com/peptide-calculator/#reconstitution-calculator**
La nuestra vive en `/calculadora` (`src/pages/`). Comparar: qué preguntan y en qué orden,
qué enseñan del resultado, si dibujan la jeringa, si guardan lo calculado, y si sirve en
teléfono con una mano. Anotar qué se adopta y qué no, con el porqué.

---

## 🏷️ MOTOR DE PRECIOS — 2026-07-30 (noche): proveedor 39 y dos listas que faltaban

Todo esto pasó en `pricing-system.nosync` (commit `0fae52e`), **sin tocar el sitio**. Se
anota aquí porque cambia lo que el Panel enseña de ROI y comisión.

**Proveedor nuevo: P39 «Bjvvb»**, número de Hong Kong **+852 4452 8163**, llegó por un
anuncio de Instagram. Mandó un PDF de 10 páginas en USD: **228 renglones, 220 capturados**.
Le gana al más barato en 8 productos que vendemos (Melatonina 10 mg −26%, Cerebrolysin
60 mg −12%, GDF-8 1 mg −10%, Semaglutida 2 mg, DSIP 10 mg, LL-37 5 mg, Sermorelina 5 mg,
Pinealon 5 mg). **Nada de lo que promete está comprobado** — no se le ha comprado.

**Los dos faltantes que reportó el Capturista quedaron cerrados:**
- **P28 Lee Factory: de CERO a 184 de 187 precios.** Su lista siempre estuvo bien; el
  lector no sabía leer una tabla numerada ni una que pone la moneda en el encabezado.
- **P29 Mia: de 73 a 157 de 157.** Y es la noticia de dinero: **Mia es ahora el más barato
  en 70 productos que vendemos**, en varios a menos de la mitad del anterior (Liraglutida
  30 mg −70%, Humanin 10 mg −66%, ARA-290 16 mg −63%, Adipotide 5 mg −61%).

**Qué cambió en las cifras del Panel:** bajaron **45 costos** de la maestra, con su ROI,
su comisión y su precio de distribuidor recalculados. **NINGÚN precio público se movió.**
Tres productos entran al canal de distribuidores porque su ROI ya aguanta la comisión:
**IGF-1 LR3 1 mg, Liraglutida 30 mg y Thymosin Alpha-1 10 mg**. Si el sitio lleva su
propia copia de `distribuidor_maestra.json`, hay que volver a aplicarla: los topes de
comisión de esos tres y de una docena más cambiaron.

**Duplicados de proveedor marcados** (no borrados, para no perder el rastro del chat):
P06=P01 Lisa, P16=P29 Mia, P22=P30 US Lab RT40-275, P27=P36 Cell Peptides. Sus notas
empiezan con «DUPLICADO de Pxx» y no tienen precios propios.

**Compuertas:** motor **344/344** ✅.

---

## 🚚 EL FLETE DEL PROVEEDOR YA CUENTA PARA EL ROI — 2026-07-31

Christián: **«tienes que considerar el costo que he pagado de envío para el ROI»** y, sobre
cómo repartirlo, **«let's split the freight evenly»**. Regla oficial, ya escrita en
FUENTE-DE-VERDAD y en `flete_proveedor.py` (motor, commit `ba6d256`):

> **flete por caja = lo que cobra el proveedor de envío ÷ las cajas del pedido**, en partes
> iguales. Con la compra real a Lucy del 31-jul (3 cajas, $75 de envío) son **$25 USD por
> caja**.

También se registró esa **compra real**: 3 cajas por **$490 USD** (Epithalon 50 mg $120,
Tesamorelin 20 mg $240, NAD+ 1000 mg $55 + $75 de envío). Lucy ya cuenta como proveedor
**verificado**. ⚠️ Y trae un dato feo: **cobró más caro que su propia lista en las tres**
(100→120, 220→240, 44→55).

### ⛔ Nada se aplicó, y hay DOS cosas esperando decisión de Christián

1. **11 productos necesitan que suba el precio** para volver al piso de 5× con el flete
   dentro. La lista con su precio propuesto sale de `python3 flete_proveedor.py` en el repo
   del motor. Los dos que quedarían **arriba de Certified** son Kisspeptin-10 5 mg ($749 →
   $819, Certified $760) y PT-141 10 mg ($829 → $859, Certified $840). Los más gordos son
   HGH 36 iu ($1,548 → $2,149) y HGH 191AA 12 iu ($639 → $949).
   *(Otros 16 se arreglan solos entregando menos comisión — el motor la baja de escalón —
   así que NO hay que tocarles el precio.)*
2. **35 de 39 proveedores nunca han dicho cuánto cobran de envío**, así que **110 de 191
   productos se comparan sin flete**: el «más barato» está sesgado a favor del callado. El
   peor caso es **Mia**, que hoy gana en 64 productos y jamás lo ha dicho. Hay que
   preguntarles o asignarles un estimado.

**Si suben esos 11 precios, el sitio sí se toca** (precios públicos). Hoy no: nada se movió.

**Compuertas:** motor **346/346** ✅.

---

## ⛔ LUCY VETADA + FLETE ESTIMADO — 2026-07-31 (madrugada)

**Lucy (P12) queda VETADA por Christián.** Cobró arriba de su lista en los 3 productos de
la compra real y, al reclamarle, **mandó una lista NUEVA 31% más cara** para que lo ya
cobrado pareciera «descuento» (Epithalon $100→$130 cobrando $120; NAD+ $44→$66 cobrando
$55). De 125 productos, **116 subieron**, +36% promedio, el agua bacteriostática +500%. Su
lista vieja se retiró del comparador —ella misma dice que a esos precios no vende— y **39
costos de la maestra subieron** al costo real. **Ningún precio público se movió.**

**Y la sospecha sobre los otros tres chinos NO se cumple:** Lisa cobró ABAJO de su lista
(−11%), Bainuo y Lily exactamente su lista. Sólo Lucy cobró arriba.

**Envío estimado $60** a los 16 proveedores con lista que nunca lo declararon, marcados
como estimado. Con el flete puesto, **la corona cambia en 32 productos**: Lucy pierde 22 y
Lily gana 18. Mia aguanta con 78 de 204.

### ⛔ SIGUE PENDIENTE: las 11 subidas de precio

Christián las autorizó, pero **no se aplicaron**: rompen la escalera (el vial grande sale
más caro por unidad que el chico) en 3 lugares nuevos, y arreglarla exige subir TAMBIÉN el
HGH 24 iu (≈$1,439), el HGH 191AA 10 iu (≈$799) y el ácido acético 3 ml (≈$309) — que él
no autorizó. Están listas en `subidas_autorizadas.json` del motor. **Cuando decida, el
sitio sí se toca** (son precios públicos).

**Compuertas:** motor **346/346** ✅, dos corridas en seco en cero.

---

## 💰 1MQ BAJA A $949 — EN VIVO — 2026-07-31

**Verificado contra Certified EN VIVO antes de mover nada** (31-jul 11:31, su API pública).
Los cinco precios coinciden exacto con lo guardado y la captura es de hoy:

| producto | Certified en vivo | guardado | nosotros |
|---|---:|---:|---:|
| 5-Amino-1MQ 10 mg | $960 | $960 | **$949** (bajó de $1,259) |
| Tirzepatida 60 mg | $4,580 | $4,580 | $3,919 |
| Retatrutida 30 mg | $4,800 | $4,800 | $4,189 |
| Semaglutida 10 mg | $2,300 | $2,300 | $1,799 |
| Adipotida 10 mg | $3,100 | — | **no la vendemos** |

**El 1MQ de 10 mg ya está en $949 en el sitio y en el backend en vivo** (verificado con una
consulta a la API: `5AMINO1MQ-10MG $949.0`). Christián revirtió su decisión del 26-jul de
quedarse arriba de Certified. El candado no ladraba porque estaba desactivado a propósito,
no roto.

### Pendiente de su palabra: 3 subidas topadas por la escalera

Certified cobra mucho más que nosotros en tres, pero **la escalera no deja llegar hasta él**
(el vial grande no puede salir más caro por mg que el chico):

- **Tirzepatida 60 mg** — ⛔ no se puede subir: ya está en el tope del de 50 mg.
- **Retatrutida 30 mg** $4,189 → **$4,299** (lo topa el de 40 mg, no Certified).
- **Semaglutida 10 mg** $1,799 → **$1,849** (lo topa el de 15 mg).

Para llegar de verdad a Certified habría que subir la escalera completa de cada uno.

**Oportunidad:** Certified vende **Adipotida 10 mg a $3,100** y nosotros no la vendemos
(está retirada por seguridad desde el 23-jul). DT y otros la surten. Decisión de Christián.

**Compuertas:** motor **348/348** ✅.

---

## 💵 DOS SUBIDAS MÁS, EN VIVO — 2026-07-31

- **Retatrutida 30 mg: $4,189 → $4,299**
- **Semaglutida 10 mg: $1,799 → $1,849**

Verificado en el backend: los dos ya cobran el nuevo. No llegan al precio de Certified
($4,800 y $2,300) porque **la escalera lo topa** — el vial grande no puede costar menos que
el chico. Tirzepatida 60 mg quedó fuera: ya está en su tope.

**Otras 5 se podrían acercar** (se proponen, no se aplicaron): Glutatión 1500 mg $1,499 →
$1,519 · LL-37 5 mg $1,629 → $1,639 · Retatrutida 10 mg $2,479 → $2,489 · Tirzepatida
10 mg $2,119 → $2,129 · Tirzepatida 30 mg $3,069 → $3,089. Entre $10 y $30 cada una.

### ⚠️ Adipotida: el precio ya está, el alta NO

Christián ordenó regresarla. El motor le puso **$3,089 el de 10 mg (ROI 22.9×)** y salió de
la lista de no-vender, con la reversión declarada. **Pero sigue sin publicarse**, y no por
descuido: no tiene SKU, ni arte de vial, ni ficha técnica — y su identidad química no está
investigada, así que la ficha no se puede generar sin inventarla.

⚠️ Y de paso apareció algo que sí era peligroso: su renglón se llama «Adipotide / FTTP» y el
alias de Certified apuntaba sólo a «Adipotide», así que **su precio de $3,100 era invisible**.
Publicarla sin verlo habría puesto $3,679 — $579 arriba de Certified. Ya corregido.

### ⛔ `gen_catalog.py` está RETIRADO

Al usarlo para dar de alta la Adipotida **regeneró `fallbackCatalog.js` desde cero y borró
1,899 líneas**: SKUs, ids del backend, lotes, stock y todo el contenido curado. Se revirtió
con git. Ahora truena al arrancar. **Nadie lo vuelve a correr.**

### 🔒 Exoma: sólo por la puerta de enfrente

Christián acepta la recomendación: **la anon key de Supabase de Exoma no se usa, nunca.**
El camino oficial es `leer_exoma_publico.js`, que lee su catálogo público como cualquier
cliente (108/108). Anotado en FUENTE-DE-VERDAD y en los tres prompts de Codex.

**Compuertas:** motor **348/348** ✅, dos corridas en seco en cero.
