# 🔝 PRIORIDADES — 5 de agosto de 2026, NOCHE (estado en vivo)

**⛔ LO PRIMERO DE LA PRÓXIMA SESIÓN: DESPLEGAR. El arreglo de las guías está
COMMITEADO Y PROBADO PERO NO ESTÁ EN VIVO, y Christián no puede imprimir sus guías
hasta que lo esté.**

- Backend `4bd6a7a` (⚠️ ojo: `server.py` viajó dentro de `7401e89`, de otra sesión — ver abajo)
- Sitio `4a89f35`
- Pruebas: backend **1,473 en 26 s**, todas verdes. Build del sitio limpio, imports en verde, i18n cuadrada en los 3 idiomas.

```bash
cd "/Users/christian/Documents/Exygen Peptides" && ./publicar.sh
```
⚠️ `publicar.sh` vive en la RAÍZ del proyecto, no dentro de `novapeptidos-UI.nosync`
(ahí sólo está `desplegar.sh`, que publica el sitio solo).

---

## ✅ CERRADO HOY — Las guías: el botón perdido y el «enviado» que mentía

Christián, 5-ago: *«no puedo imprimir las guías, teníamos un botón específico para eso
y ya no está»*, *«ese botón debe estar bien visible y fácil de encontrar en los paneles
de admin y distribuidor con cada pedido de cada cliente»* y *«no puede aparecer un envío
como enviado a menos que en verdad se haya enviado… el de Fabiola aún no lo envío yo»*.

Eran **tres cosas distintas con la misma raíz**: el sistema daba por ciertas cosas que
no le constaban.

### 1. El botón se escondía justo donde habría servido
`tiene_etiqueta` (servidor) y `hayEtiqueta()` (pantalla) exigían `label_provider`, con
el razonamiento de que *«una guía tecleada a mano no tiene PDF»*. **Es falso**:
`etiquetas._rescatar()` le pregunta a la paquetería **por número de rastreo**, así que
una guía comprada en la cuenta de la casa y luego capturada a mano —lo de todos los
días— sí tiene papel. Ahora basta con que haya número. Cuando de verdad no hay PDF, el
servidor contesta **409 `estado: manual`** y el botón lo explica en una línea, en vez de
desaparecer. Un botón invisible se ve igual que una app rota.

### 2. Estaba enterrado a dos clics
Vivía dentro de la ficha del pedido. Quien despacha veinte paquetes no abre veinte
fichas. Ahora se pinta **en el renglón de la tabla**, en el Panel de Administración y en
el del Distribuidor — donde **no existía en absoluto**.

### 3. Tener guía no es haber enviado
Capturar el número empujaba el pedido a `enviado` y estampaba `shipped_at`. Comprar la
guía es un trámite de escritorio; el paquete de Fabiola llevaba días en la mesa y el
tablero lo daba por salido — y al cliente le llegaba *«Tu pedido va en camino»*.

Ahora **el estado no se mueve solo**. `guias.etapa_de_envio()` **deduce**
`sin_guia | guia_generada | enviado | entregado` de lo que ya está guardado, y el
renglón lo pinta: **«Guía Generada · Sin Enviar»** en ámbar contra **«Enviado»** en
verde. El aviso al cliente se partió en dos: `avisar_de_la_guia()` («ya tienes guía»,
al capturar) y `avisar_del_envio()` («va en camino», cuando sale de verdad).

⛔ **`guia_generada` NO se metió al vocabulario de estados, a propósito.** Habría
obligado a tocar `loyalty.PAID_STATUSES`, `cobrado.ESTADOS_PAGADOS` y
`coa_store.PAID_STATUSES`, y **cada uno de esos es una decisión de dinero**. Se deduce,
que además es lo honesto: la verdad de si algo salió es `shipped_at`, no una etiqueta
que alguien pudo no mover.

**Las 5 pruebas que fallaron fijaban la conducta vieja** y se reescribieron con el
porqué. Se sumaron 5 candados nuevos en `test_etiquetas.py`, incluido uno que lee el
código y truena si alguien vuelve a meter el auto-`enviado`.

---

## ✅ RESUELTO — El pedido EX-20260801-2402 (Fabiola Hernández Rodríguez)

Consultado en producción el 5-ago (base **`exygen`**, no `nova_peptides`):

```
order_number: EX-20260801-2402   ·  Fabiola Hernández Rodríguez  ·  $2,316  ·  pagado
carrier: DHL   ·   tracking_number: 8764271821
label_url: ''  ·  label_provider: ''      <- GUÍA TECLEADA A MANO
status: 'enviado'  ·  shipped_at: 2026-08-04T23:53:41   <- LA MENTIRA, ya escrita
```

**SÍ tiene número de guía** (DHL 8764271821), y por eso el botón se escondía: `label_provider`
vacío era exactamente la condición rota. Con el despliegue de hoy el botón ya aparece.

⚠️ **PERO NO HAY PDF QUE IMPRIMIR.** Esa guía no se compró por una paquetería nuestra
(`label_provider` vacío), así que `_rescatar()` no tiene a quién preguntarle y el botón
va a contestar «esa guía se capturó a mano». **El PDF hay que sacarlo de DHL.**

⚠️ **EL DATO VIEJO SIGUE MAL.** El pedido quedó marcado `enviado` con `shipped_at` del
4-ago por el bug de ayer, y Christián dice que **no lo ha enviado**. El arreglo evita que
vuelva a pasar, pero **no corrige lo ya escrito**: hay que ponerle `status: confirmado` y
borrar `shipped_at`. **Pendiente de su OK** (es un pedido real y pagado).

## ⛔ PENDIENTE 1 (viejo) — quedaba sin diagnosticar

Christián lo pidió por número y **no se pudo mirar**: el clasificador de permisos
bloqueó el acceso de sólo lectura a Mongo en producción
(`sudo docker exec app-mongo-1 mongosh …`), dos veces, con dos formas distintas.

**No se sabe si ese pedido tiene número de guía.** Si lo tiene, con el despliegue de
arriba el botón aparece y se imprime. Si NO lo tiene, no hay nada que imprimir y lo que
toca es comprarle la guía.

Para desbloquearlo hace falta que Christián autorice ese comando (una regla de Bash en
`.claude/settings.json`), o que lo mire él en el Panel.

## ⛔ PENDIENTE 2 — El tablero del Asesor de Negocio (lo que pidió DESPUÉS)

*«necesito que el asesor de negocios pueda ver en tiempo real TODO sobre clientes, sus
nombres de pila, sus pedidos, sus números de guía, TODO, TODO, TODO, el status de sus
pagos, envíos, etc.»*

**NO SE EMPEZÓ.** Lo que ya está listo para construirlo encima:
- `guias.etapa_de_envio()` da la verdad del envío sin inventar.
- `etapa_envio` y `tiene_etiqueta` ya viajan en la lista de pedidos y en la ficha.
- El chat del asesor vive en `chat_negocio.py` (backend) y `ChatNegocio.js` (sitio).

Lo que falta decidir con él: si el asesor **lee** los datos (una vista) o si el **chat**
los contesta en lenguaje natural. Y **cuánto ve de cada cliente** — hoy los datos de
contacto van tras un interruptor por persona (`_contacto_del_cliente`), que existe por
una razón: no todo el mundo ve el teléfono de todos.

## ⚠️ AVISO — Otra sesión se llevó `server.py` en su commit

`7401e89` («El CAC de Meta…», 11:51:41) se publicó **42 segundos antes** que `4bd6a7a`
(11:52:23) y **arrastró los cambios de `server.py` de esta sesión**. Es exactamente el
accidente que documenta el `CLAUDE.md`. **No hubo daño** —el trabajo estaba completo y
las 1,473 pruebas pasaron— pero conviene saberlo al leer el historial: los cambios de
las guías en `server.py` **no están en el commit que los explica**.

---
# 🔝 PRIORIDADES — 5 de agosto de 2026, TARDE (estado en vivo)

**Pruebas en verde las dos suites: backend 1,467 en 26 s · motor de precios 425 en 1 m 26 s.**
Nada se desplegó en esta tanda: lo de hoy es guiones, medición y una compuerta arreglada.

## ✅ 1a. `./publicar.sh --rapido` — HECHO

Mira `git diff` y **salta el lado que no cambió**, que es donde están los minutos:
si sólo tocaste `src/` del sitio, el backend no se despliega y sus **2 m 35 s de SSH
no ocurren** — el reloj queda en el 1 m 14 s del sitio solo.

```bash
./publicar.sh --rapido
```

- **La regla dura del dinero está ESCRITA, no adivinada**: `rutas-del-dinero.txt` en la
  raíz. Un archivo tocado que case con cualquiera de esos patrones obliga a la **suite
  completa Y a publicar los dos lados** (un precio nuevo en el sitio con el catálogo
  viejo en la base es la falla). Si el archivo falta, `--rapido` no salta nada.
- **Contra qué compara**: `.ultimo-publicado` (el commit que quedó en vivo), que el
  propio guion anota **sólo cuando ese lado salió en verde**. Sin marca no adivina:
  publica los dos, completos. La marca está en `.gitignore` de los dos repos — lo que
  está en vivo no es un hecho del repo, es de esta máquina.
- **`--sin-pruebas` NO gana** sobre la regla del dinero: si tocaste `comisiones.py`, las
  pruebas vuelven aunque lo pidas. Probado.
- **8 casos probados** en simulacro (sin publicar): nada cambió · sólo texto del sitio ·
  sólo un archivo inocuo del backend · ruta del dinero en el backend · ruta del dinero en
  el sitio · `--sin-pruebas` sobre ruta del dinero · sin la lista · marca inválida.

⚠️ **Lo que `--rapido` NO hace, a propósito: escoger un subconjunto de pytest.** La suite
completa ya tarda 26 segundos, así que recortarla **no gana reloj** y sí abre la puerta a
que una prueba de dinero no corra. Cuando el backend entra, entra con las 1,467.

## 📏 1b. El cuello del backend: YA SE SABE DÓNDE NO ESTÁ

`actualizar-exygen-backend.sh` ahora **cronometra cada paso** e imprime el desglose al
final (sale hasta si el despliegue falla). Medido hoy con `--estado`:

| Paso | Segundos |
|---|---|
| Averiguar tu IP | 0 |
| Abrir el puerto 22 | 2 |
| Llave temporal + EC2 Instance Connect | 2 |

**Todo el baile de SSH y security group son 4 segundos.** O sea que de los 2 m 35 s,
~2 m 30 s pasan **dentro de `/opt/exygen/app/deploy.sh`, en el servidor**: `git pull` +
`docker build` + levantar el color + verificar salud + los 20 s de gracia.

⛔ **Pendiente y por qué no se cerró hoy:** para partir esos 2 m 30 s hay que leer
`deploy.sh` en el servidor, y **el SSH quedó bloqueado en esta sesión** (el clasificador
de permisos lo negó). El próximo despliegue real ya va a imprimir el desglose solo.
Sospecha principal: el `docker build` sin caché de capas. `GRACIA=0` quita 20 s gratis.

## 💭 1c. GitHub Actions — el veredicto, con el número medido

**No compra reloj, compra no-esperar.** Los 2 m 30 s son del servidor y en GHA serían
los mismos o peores (el runner arranca frío, sin caché de Docker local). Lo que cambia es
que **haces push y te vas**: hoy Christián se queda mirando la terminal 3 minutos.

- Free en repos privados: **2,000 min/mes**. A ~3 min por despliegue son ~600 al mes.
- **Cloudflare Pages construye el sitio solo desde el repo** (500 builds/mes gratis) sin
  gastar un minuto de GHA: eso se lleva la mitad del trabajo de encima.
- JADA ya está migrando a GHA (ver la memoria `project_gha_deploy_migration`): conviene
  copiar ese patrón —CI compila, el servidor sólo descarga— en vez de inventar otro.

## ✅ 2. TOP PRIORITY: las comisiones — RECALCULADAS. **La tabla del 3-ago SIGUE VÁLIDA.**

Guion nuevo: **`pricing-system/comision_maxima.py`** (no escribe nada).

```bash
cd pricing-system && .venv/bin/python comision_maxima.py        # o --todos, o --csv
```

**El resultado del recálculo con los precios de HOY es idéntico al del 3-ago:**
**63 bajo el piso · 57 se salvan bajando su comisión · 6 salen del canal.** Los diez
recortes más fuertes salen al dígito iguales (HGH 191AA 15 iu → 3%, agua bacteriostática
10 ml → 3%, HCG 2,000 IU → 5%, L-Carnitine 2 mg → 8%, Lemon Bottle → 11%, Sermorelina
2 mg → 12%, HGH 24 iu → 15%, Oxytocin → 16%, Triptorelin y PT-141 → 17%).

**Por qué no se movió:** las 22 bajadas del 4-ago fueron de las seis familias más
vendidas, y **ninguna de ésas estaba bajo el piso**. Los 63 son el resto del catálogo
—insumos y presentaciones chicas donde el flete se come el margen— y a ésos no les
cambió el precio. La advertencia del CONTINUATION («está medida sobre precios viejos»)
era razonable pero resultó no aplicar.

### ⚠️ Y el «42 de 188» NO contradecía al 63: son dos preguntas distintas

Medido hoy, mismos precios, sólo cambiando el supuesto de comisión:

| Comisión | Bajo el piso |
|---|---|
| la de hoy (la mayoría al 40%) | **63** de 188 |
| topada al 35% | 58 |
| **topada al 30%** | **42** |

O sea: **42 es el catálogo DESPUÉS de bajar las comisiones al 30% (el punto 5)**, no una
corrección del 63. Los dos números eran ciertos y decían cosas diferentes.

### Los 6 que salen del canal (ni con comisión 0% llegan a 5×)

Ácido acético 3/5/10 ml · agua bacteriostática 3 ml · HGH 191AA 10 y 12 iu.
Sigue siendo cierto que **sólo el ácido acético 5 ml tiene flete DECLARADO**; los otros
cinco usan el supuesto alto de $350/caja.

⛔ **Nada aplicado. Espera tu sí.**

## ✅ 3. Ocultar los tres productos — NO HAY NADA QUE OCULTAR (verificado)

**Tirzepatida 5 mg, Tirzepatida 15 mg y Retatrutida 50 mg NO EXISTEN en ningún lado:**
no están en el catálogo público (188 productos), **ni en el admin** (202, o sea ni
ocultos), ni en `fallbackCatalog.js` del sitio. En la maestra están las tres, marcadas
**«No · dominada»**, que es justamente por lo que nunca se dieron de alta.

Dos cosas que el CONTINUATION decía mal y quedan corregidas:

1. **«No tienen costo capturado» es falso**: las tres lo tienen (Tirze 5 mg $402,
   Tirze 15 mg $682, Reta 50 mg $3,115 por caja). El motivo real es «dominada».
2. **«La de 15 mg costaba $1,679, MENOS que la de 10 mg» tampoco cuadra**: la de 10 mg
   está en $1,459. Lo que sí pasó fue con **Retatrutida**, y ésas —5 mg y 15 mg— **ya
   están ocultas** en el backend desde antes, junto con Dysport y otras 12.

## ⛔ 4 y 5 — TE TOCA DECIDIR, no hay código que escribir antes

- **Extender el punto medio a los 188** cambiando la regla en `reprecio.py`
  (`precio_base`), no producto por producto. Ojo: 42 ya están bajo el piso.
- **Bajar las comisiones al 30% en la maestra.** Hoy el tope del 30% sólo se usó para
  MEDIR; los productos siguen con su comisión vieja (la mayoría al 40%). El reporte de
  `comision_maxima.py` trae aparte **los 77 que ya aguantan el piso pero traen en la
  maestra una comisión ARRIBA de lo que su escalera autoriza** — ésos son este pendiente.

## 🔧 De pasada: una compuerta que se ponía roja SOLA cada medianoche

`test_precios.py::test_el_csv_esta_al_dia_con_la_maestra` comparaba el texto completo de
`maestra.csv` contra una corrida nueva del generador. Pero el generador baja el precio de
la competencia **en vivo** y estampa en `competencia_capturada` **el día en que corre**:
el CSV commiteado quedaba «atrás» al cambiar la fecha del calendario **aunque no se
hubiera movido un solo precio**. Hoy 5-ago las 142 filas con competencia diferían en eso
y en NADA más — verificado columna por columna.

Una compuerta que se pone roja por el reloj se aprende a ignorar, y el día que sí haya un
precio movido nadie la mira. Ahora exige lo de verdad —**ninguna cifra del dinero puede
diferir**— y el sello de la foto se avisa aparte sin tumbar la suite. Comprobado que
sigue atrapando un precio o una comisión movidos, y que la prueba **no escribe** en
`maestra.csv` (redirige la escritura a un buffer: una prueba no toca archivos del dinero).

## ✔️ La guía de Fabiola: YA SE COMPRÓ

Christián la compró (5-ago). El pendiente de `enviosinternacionales` queda cerrado.

---

# 🔝 PRIORIDADES — 5 de agosto de 2026, MAÑANA (el planteamiento original)

## ⚡ VELOCIDAD DE PUBLICAR — hecho lo grande, falta lo último

Orden textual: *«tiene que estar up and running en 1 minuto, 2 tops para un sitio
tan pequeño»* y *«no entiendo por qué tienes que hacer las 1,467 pruebas cada vez
que hacemos un cambio por pequeño o grande que sea. Super dislike!!!»*.

### Lo que ya está hecho y medido

| | Antes | Ahora |
|---|---|---|
| Pruebas del backend | **3 m 38 s** | **26 s** |
| Sitio completo (auditoría + build + despliegue + verificación) | ~3 m | **1 m 14 s** |
| Backend completo | ~5 m | 3 m |

**1. `./publicar.sh` en la raíz del proyecto.** Backend y sitio ya no se esperan:
arrancan a la vez y el reloj es el del más lento, no la suma.

```bash
./publicar.sh                # los dos, en paralelo
./publicar.sh --sitio        # sólo el sitio (1 m 14 s)
./publicar.sh --backend      # sólo el backend
./publicar.sh --sin-pruebas  # salta pytest — sólo copy, nunca dinero
```

**2. Las pruebas, 8 veces más rápidas.** Dos causas, y la grande no era la obvia:
- **UNA sola prueba se llevaba 121 de los 132 segundos.** No era lenta: abre y
  cierra la app (`with TestClient(app)`) y los eventos de ARRANQUE hablan con
  Mongo, que en pruebas no existe. Cada uno esperaba su tiempo de espera. El 92%
  del reloj era arranque esperando a una base que no está. Ahora los seis arranques
  se frenan solos dentro de pytest (`_en_pruebas` en `server.py`, mira
  `PYTEST_CURRENT_TEST`). En producción esa variable no existe: el arranque real no
  cambia ni una línea.
- **Corrían de una en una.** `pytest-xdist` con `-n auto`, ya por omisión en
  `pytest.ini`.

⚠️ Detalle que costó en `publicar.sh`: el resultado se lee con `PIPESTATUS`, no con
`$?`. Con el pipe a `tail`, `$?` es el de `tail` y **siempre sale 0** — una suite en
rojo se habría publicado en verde.

### ⛔ LO QUE FALTA (y es lo que pidió Christián)

**No correr las 1,467 pruebas para cada cambio.** Hoy ya sólo son 26 s, así que dejó
de ser el cuello — pero la queja es correcta. Lo que hay que construir:

1. **`publicar.sh --rapido`**: que mire `git diff --name-only` y decida solo:
   - sólo `src/` del sitio → ni siquiera arrancar el backend;
   - sólo textos/i18n → auditoría del sitio y ya;
   - cualquier cosa que toque **precios, cobros, comisiones o envíos** → suite
     completa, sin excepción. Esa lista de rutas «del dinero» hay que escribirla
     explícita, no adivinarla.
2. **El cuello real ahora es el despliegue del backend: 2 m 35 s** (SSH + abrir el
   puerto 22 + levantar el color nuevo + verificar salud). Ahí está el minuto que
   falta. Vale medir qué parte pesa: si es el `docker build`, cachear capas.
3. **GitHub Actions** (Christián preguntó por el costo): en repos privados el plan
   Free trae **2,000 minutos/mes gratis**, y JADA ya está en GitHub. Con despliegues
   de ~3 min alcanza para ~600 al mes. Lo que de verdad cambia no es el reloj sino
   **que no haya que esperarlo**: se hace push y el CI trabaja solo. Cloudflare Pages
   además puede construir solo desde el repo (500 builds/mes gratis) sin gastar
   minutos de GitHub.

## 1️⃣ TOP PRIORITY: las comisiones producto por producto

La propuesta del 3-ago que quedó pendiente y que **ya está medida**:
`pricing-system.nosync/PROPUESTA-COMISIONES-Y-ESCALERAS-2026-08-03.md`.

**63 productos bajo el piso de 5× · 57 se salvan bajando su comisión · 6 salen del
canal** (ácido acético 3/5/10 ml, agua bacteriostática 3 ml, HGH 191AA 10 y 12 iu).
La tabla trae la comisión exacta que aguanta cada uno. ⚠️ De los 6 que saldrían,
sólo el ácido acético 5 ml tiene flete DECLARADO; los otros 5 usan el supuesto de
$350/caja.

⚠️ **Ese número se movió**: con los precios nuevos del punto medio ya aplicados,
hoy son **42 de 188 bajo el piso** (con la comisión topada al 30%). Hay que
**recalcular la propuesta antes de aplicarla** — la tabla del 3-ago está medida
sobre los precios viejos.

## 2️⃣ Ocultar tres productos

**Tirzepatida 5 mg y 15 mg y Retatrutida 50 mg.** Torcían la escalera (la de 15 mg
costaba $1,679, MENOS que la de 10 mg) y **no tienen costo capturado**, así que
nadie puede medir si son rentables. No se borran: quedan con SKU e historial, como
Dysport. Con `ocultar_productos.js` o el `hidden` del backend.

## 3️⃣ Extender el punto medio a TODO el catálogo

**Después** de resolver lo de las comisiones, no antes. Cambiando **la regla del
motor** (`reprecio.py`, `precio_base`), no producto por producto: son 188. Hoy la
fórmula se pega a «Certified −$10» y el punto medio es otro número.

## 4️⃣ Bajar las comisiones al 30% en la maestra

Hoy el tope del 30% sólo se usó para **medir** el piso; los productos siguen con su
comisión vieja (la mayoría en 40%).

---

# ✅ CERRADO — 4 de agosto de 2026: LA BAJADA AL PUNTO MEDIO, APLICADA

**En vivo y verificado.** Sitio `main.2aeee3fa.js` (14 comprobaciones; la ficha de
Retatrutida ya muestra $3,739) · backend con los 22 precios · **vigía EN VERDE los 7
pasos** · **425 pruebas** del motor en verde · auditoría del sitio **97/0**.

## Qué se aplicó

Las **seis familias más vendidas** (Tirzepatida, Retatrutida, GLOW, KLOW, GHK-Cu,
NAD+) al **punto medio entre Exoma y Certified**, con la escalera enderezada y el
piso de 5× medido con la comisión al 30%. **22 precios**; la lista de esas familias
bajó de **$78,678 a $65,018**. Las bajadas más grandes: Tirzepatida 60 mg
−$1,100, Tirzepatida 120 mg −$1,330, Retatrutida 100 mg −$1,250.

## 📊 EL ROI DEL CATÁLOGO COMPLETO (188 presentaciones, ya con los precios nuevos)

| Vara | Promedio | Mediana | Rango |
|---|---|---|---|
| ROI típico (comisión de hoy) | **7.38×** | 6.35× | 2.37× – 25.87× |
| Peor caso express | 7.19× | 6.19× | 2.37× – 25.53× |
| **CON TODO** (+pasarela y flete) | **6.62×** | 5.74× | 2.20× – 23.77× |
| CON TODO + comisión al 30% | **7.51×** | 6.57× | 2.52× – 27.20× |

⚠️ **42 de 188 siguen bajo el piso de 5× con la vara CON TODO**, aun topando la
comisión al 30%. NO son de las seis familias que se bajaron (ésas quedaron todas
arriba): son el resto del catálogo, sobre todo insumos y presentaciones chicas donde
el flete se come el margen. Es el pendiente de las comisiones producto por producto
(`PROPUESTA-COMISIONES-Y-ESCALERAS-2026-08-03.md`).

## Lo que hubo que construir para poder aplicarlo

`aplicar_precios_decididos.py` — **la cuarta puerta**. Las tres que había no servían:
`reprecio.py` produce la fórmula (que se pega a «Certified −$10»),
`aplicar_subidas_autorizadas.py` **sólo sube** a propósito, y las excepciones del
trinquete dejan pasar una bajada **al precio que propone la fórmula**, que aquí no
era el punto medio. La única salida que quedaba era teclear los números en el Excel.
Sus tres candados: exige `quien: christian`, se niega si la maestra ya no está donde
la decisión dice que estaba, y **vuelve a medir el piso de 5× con el costo de hoy**.

Y la otra mitad: **`reprecio.py` ahora RESPETA esos precios**. Sin eso la siguiente
corrida los revertía — medido: **15 de las 22 bajadas volvían a subir**.

## ⛔ TRES EXCEPCIONES DECLARADAS (no son fallas del vigía)

1. **NAD+ 500 mg $1,339** — ARRIBA de Certified ($1,260). Orden textual de Christián:
   «ponlo en escalera coherente aunque quedemos arriba de alguien mas». El 100 mg no
   baja de $669 sin romper el piso, así que la escalera obliga a este número.
2. **KLOW 80 mg $2,909** — ARRIBA de Certified ($2,880) por **aritmética del punto
   medio**: Exoma cobra $2,940, así que el medio cae arriba del más barato.
3. **NAD+ 1000 mg $1,809** — DEBAJO de Exoma ($1,899) porque ahí lo pone su propia
   escalera, no por seguirle el precio a Exoma.

Viven en `reprecio.EXCEPCIONES_TECHO` y su motivo va a la columna «base del precio»
de la maestra, que es de donde los auditores leen la autorización.
`check_competitors.py` lee **la misma lista** que el motor: una sola verdad.

## Se ocultan (pendiente: NO se hizo)

⚠️ **Tirzepatida 5 mg y 15 mg y Retatrutida 50 mg** siguen VISIBLES. Torcían la
escalera y no tienen costo capturado. Falta correr `ocultar_productos.js` o poner su
`hidden` en el backend.

## 🕐 LO QUE SIGUE

1. **Ocultar esos 3 productos.**
2. **Extender el punto medio a TODO el catálogo** (lo pidió el 4-ago). Son 188
   productos: conviene cambiar la regla en `reprecio.py` (`precio_base`), no producto
   por producto. Ojo: 42 ya están bajo el piso de 5×.
3. **Bajar las comisiones al tope de 30% en la maestra** (hoy el tope sólo se usó
   para MEDIR el piso; los productos siguen con su comisión vieja de 40%).
4. **La guía de Fabiola**: enviosinternacionales tenía la cuenta sin verificar
   («Unverified headquarter»). Christián subió ID y selfie el 4-ago y está en
   revisión. En cuanto pase: **Estafeta Express $221.59, 1 día**, pedido
   `EX-20260801-2402`. Skydropx sigue en **saldo $0**.

## ✅ Lo demás que se cerró hoy (4-ago)

- **El embudo dice la verdad.** Decía 17 compras y $87,193 con 3 pedidos pagados y
  $9,973 en caja. Cuatro fallas encadenadas, todas por creerle al evento del
  navegador. Ahora **1,618 visitas → 3 compras**, ingreso desde `orders`.
- **Se puede corregir el domicilio de un pedido** antes de que salga
  (`PUT /admin/orders/{id}/direccion`); con guía comprada se niega (409).
- **La cotización del panel usa el SOBRE de verdad** (12×15×1), no una caja de
  20×15×10 que no existe.
- **El chat elige motor solo**, de más barato a más caro: **Kimi → GPT → Claude**.
- **Reglas actualizadas** en el vigía programado y en los 3 prompts de Codex.

---

# ✅ CERRADO — 3 de agosto de 2026 (noche, segunda tanda del asesor)

**Todo desplegado y verificado.** Backend `e6eb23d` (suite **1,455** en verde) · sitio
`main.b1830668.js` (14 comprobaciones).

1. **LA CUOTA DEL CHAT — arreglada de raíz.** Christián pegó las llaves de GPT, Claude
   y Kimi y el chat SEGUÍA diciendo «se acabó la cuota»: `AI_PROVIDER_FALLBACK` venía
   en `gemini` por omisión y el proveedor también era `gemini`, o sea «si falla
   Gemini, usa Gemini» — un respaldo que no existía. Ahora, **si nadie eligió respaldo
   a mano, se toma solo** el primer motor con llave distinto del proveedor: pegar la
   llave BASTA, sin editar variables en el servidor. Y el orden es **de más barato a
   más caro** (Christián: «que el más barato responda primero»): **Kimi → GPT →
   Claude**, porque el respaldo entra el día de más tráfico y saltar al más caro haría
   que el pico de demanda fuera también el de la factura. Se salta solo el motor que no
   traiga nombre de modelo (moriría con «falta AI_MODEL_NAME»). Verificado en vivo: el
   asesor responde 200. ⚠️ Kimi **no se agota**: es de pago por uso (centavos); el que
   se agota es el plan gratis de Gemini (20/día).
2. **Backend del asesor** (en vivo): renombrar (`PUT /business/chats/{sid}/nombre`,
   colección `business_chat_sessions`) · búsqueda (`GET /business/chats/buscar?q=&anio=&mes=`,
   AND multi-palabra sin acentos, snippet centrado en la coincidencia; sin criterio 400)
   · archivado a markdown (`POST .../archivar` consolida N mensajes en UN documento
   `business_chat_archive`; escribe ANTES de borrar, así un tropiezo duplica pero nunca
   pierde; archivado = solo lectura, **409** al escribirle) · `GET .../md` exporta.
   Verificado en producción: 200/200/200 y **404 en chat ajeno**.
3. **Pantalla del asesor** (en vivo): el globito azul de IA lleva DIRECTO al Asesor
   para admin y distribuidor (para clientes sigue siendo el chat público) · WhatsApp
   flotante OCULTO para admin y distribuidor · lapicito para renombrar (vacío = título
   automático) · buscador con debounce y resalte + selects de Año y Mes · archivar con
   vista de solo lectura · lista agrupada por Hoy / Ayer / Esta Semana / Semana Pasada /
   Este Mes / mes / año, con los archivados en su cajón al final.
4. **La casilla «Recordar mi elección»** del aviso de entrada ya NO viene premarcada
   (commit `44efd4e`, verificado en el navegador con las 3 casillas apagadas).

⚠️ **LECCIÓN DEL DÍA (árbol compartido).** Con dos agentes trabajando a la vez, un
`git add` de rutas explícitas **igual se llevó** el trabajo a medias del otro dentro
del commit `7a42032` — porque el otro agente ya tenía SUS archivos en el índice. El
`git add` explícito NO protege de eso: lo que protege es mirar `git status` y hacer
`git commit -- <rutas>` (que ignora lo demás del índice). Aquí no hubo daño (la suite
salió en verde y todo estaba completo), pero el próximo puede publicar código a medias.

# 🤝 HANDOFF MAESTRO — 3 de agosto de 2026 (noche)

**Estado:** TODO DESPLEGADO Y VERIFICADO. Backend en el EC2 al commit `25ca835` (suite
**1,429** en verde) · sitio en vivo `main.6ee99df8.js` (14 comprobaciones). Trae: la
SOLICITUD DE GUÍA completa, el ASESOR DE NEGOCIO con chats múltiples + aviso al 85%, el
arreglo de i18n, el botón «Seguir comprando» y la auditoría de rangos. Auditoría del
sitio: **97/0**.

## ✅ LO CERRADO ESTA SESIÓN (noche)

**ASESOR DE NEGOCIO — chats múltiples, memoria y rediseño** (Christián, 3-ago noche;
backend `25ca835`, frontend `80dba5b`).
- **El «olvido» tenía causa**: solo viajaban los últimos 8 mensajes al modelo. Ahora
  viaja lo que quepa en un presupuesto de 48k caracteres
  (`chat_negocio.PRESUPUESTO_CHARS`), y ese MISMO número alimenta el aviso.
- **Chats múltiples**: botón «Nuevo Chat» + desplegable «Chats Anteriores»
  (`GET /business/chats`: título = primer mensaje, % de memoria por chat). El chat
  actual vive en localStorage como antes; el servidor filtra por `user_id`.
- **Aviso al 85%**: franja discreta con botón «Nuevo Chat» cuando el chat usó ≥85% de
  su memoria (header `X-Contexto-Pct` + `aviso_pct` del backend); a ≥100 avisa que ya
  se olvidan los mensajes viejos. Nunca bloquea.
- **Diseño ultra minimalista** (pidió «como Claude Chat»): columna central angosta, sin
  gradientes ni tarjetas, usuario en burbuja sutil, asesor en texto plano, input en
  píldora, chips discretos. Claro/oscuro y móvil verificados.
- **Prompt**: dosis/titulación SIN filtros con lenguaje simple (técnico solo si lo
  piden) y sin trabajos de otro oficio (contratos, etc.). El candado de costos del
  distribuidor NO se tocó (sus pruebas siguen en verde; 80 en el módulo).

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

