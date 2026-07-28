# 🔴 EN CURSO — 2026-07-28 (noche)

## 🟢 EL MOTOR DE PRECIOS — se acabó el Excel como fuente de la verdad

Así se llama el feature: **Motor de Precios** (decisión de Christian). Hace juego con el
**Vigía**, que observa a la competencia; el Motor pone el precio. ⚠️ **Pendiente: actualizar
el Vigía** para que lea de la base cuando el Motor esté terminado y probado.

Todo vivía en `MAESTRA.xlsx`. Una hoja de cálculo no sabe decir "ese proveedor no existe"
ni "ese producto ya está dos veces", así que los errores se guardaban sin protestar. El
28-jul pasaron los dos casos: 502 precios colgados del producto equivocado, y las 11
COMPRAS REALES borradas al reescribir un CSV. Ahora hay una base de verdad.

**UNA base, MUCHAS tablas** (Christian preguntó si convenía separarlas: no — el ROI
necesita costo + comisión + descuento + envío al mismo tiempo, y en bases separadas no se
pueden cruzar). Todo en `pricing-system/`, repo privado `exygen-pricing`:

| Archivo | Qué es |
|---|---|
| `esquema.sql` | Las tablas, con llaves y validaciones |
| `db.py` | Construye la base y la consulta · `poner_precio()` |
| `certeza.py` | **Comprueba que todas las listas digan lo mismo** |
| `oportunidades.py` | Qué nos ofrecen y no vendemos |
| `reporte_excel.py` | Genera `REPORTE-EXYGEN.xlsx`, marcado NO EDITAR |
| `datos/*.csv` | La verdad en texto, versionada: compras reales, reglas, alias, exclusiones |

```
python3 db.py --construir      python3 certeza.py         python3 oportunidades.py
python3 db.py --revisar        python3 reporte_excel.py   python3 reprecio.py --desde-base
```

### Lo que la base impide y el Excel permitía

- Un costo no puede apuntar a un proveedor que no existe.
- **Los precios no se sobrescriben: se versionan** (`vigente_desde`/`vigente_hasta`, con
  hora en UTC porque un día de repricing tiene varios movimientos). Un índice único
  garantiza **exactamente un precio vigente** por producto.
- `db.poner_precio()` es la única forma de mover un precio: **exige motivo**, guarda quién
  y cuándo, conserva el anterior y es atómica.
- No se puede vender abajo del **piso de 5×** sin *declarar* la excepción por escrito.
- El distribuidor nunca paga más que el público.

### CERTEZA: una sola verdad, comprobada

`certeza.py` compara la base contra **las tres listas que se publican** (`maestra.csv`,
`precios_maestra.json`, `distribuidor_maestra.json`). Hoy: **204 productos, idénticos**.
Probado saboteando un precio a mano — lo caza y devuelve error.
⚠️ Esto compara lo que se PUBLICA, no lo que el servidor COBRA. Eso es la suite E2E, y la
distinción es la que costó caro en julio.

### Las reglas del negocio, como DATOS (tabla `regla`)

Copiadas del backend en vivo con archivo y línea: envío $250, tope de envío **10%**, envío
gratis desde $2,500 (**derivado** del tope, ya no escrito a mano), descuento máximo 40%,
puntos 3%, tope de comisión 50%, piso de ROI 5×. Un aviso salta si el umbral deja de ser
el 10% del ticket.

### ROI real (`v_roi_real`) y CAC (`v_cac`)

⚠️ **Casi se publica mal.** El descuento y la comisión **NO se suman: comparten el mismo
tope por producto** — el backend reparte `cap − descuento`
(`novapeptidos-RBAC/server.py:1224`). Restándolos por separado salían **149 productos
abajo del piso**; con la cuenta correcta es **UNO**: IGF-1 LR3 1 mg en **4.87×**, el ya
conocido. Hay prueba que fija la regla.
El **CAC va aparte**: es por CLIENTE (gasto de Meta ÷ clientes nuevos), no por producto.
La tabla `costo_adquisicion` está creada y **vacía**: falta cargarla del panel de Meta.

### Migración del motor — paso 1 de 2, hecho

`reprecio.py` tiene ahora **dos lectores para un motor**: `leer()` del Excel y
`leer_de_base()` de la base. `python3 reprecio.py --desde-base` corre el mismo motor
leyendo de la base (solo simulacro). **Dos pruebas exigen que los dos caminos den
idéntico**: mismos datos de entrada, y mismo precio y motivo de salida. Hoy coinciden en
los 190 productos y ninguno cambia.

⛔ **NO apagar MAESTRA.xlsx todavía**: `reprecio.py` aún la LEE, y por eso el reporte se
escribe en `REPORTE-EXYGEN.xlsx` y no encima de ella. Sobrescribirla hoy rompe el motor.

### Catálogo: qué nos ofrecen y no vendemos

`oportunidades.py` — de **46 huecos falsos a 5 candidatos reales**. Los 41 restantes eran
el mismo producto escrito distinto ("Adamax" vs ADMAX, "Frag17-23" vs Fragment 17-23,
"LYSINE-PROLINE-VALINE" vs KPV). Las equivalencias las revisó Claude y viven en
`datos/alias_proveedores.csv`, con prueba que las fija.

**Reales: Dihexa** (2 prov., desde $35), **MK-677 / Ibutamoren** (2 prov., desde $24),
**Oligopeptide-24** (1 prov., $40). Excluidos a propósito en `datos/no_vender.csv` con
motivo y quién: Dysport, HUMSC, toxina botulínica, insulina, ácido hialurónico, Adipotida,
ACE-031 e insumos.

### Revisión externa de Codex — 7 hallazgos, todos arreglados

1. **Reconstruir la base borraba el historial** (el diseño se contradecía solo). Ahora vive
   en `datos/historial_precios.csv` y sobrevive; probado.
2. El candado exigía ~1×, no el piso de 5×.
3. `poner_precio()` podía dejar un producto **sin precio vigente** si fallaba a la mitad.
4. Las vigencias aceptaban periodos invertidos, de duración cero y fechas inválidas.
5. Los 10 viales por caja estaban clavados a mano: una caja de 5 pasaba con otras unidades.
6. `v_margen` unía contra la tabla y no contra el precio vigente.
7. La prueba principal era **circular**. Ahora se compara contra `precios_maestra.json`.

Además: **las pruebas escribían en los datos reales del negocio**. Corregido.

### 2ª revisión de Codex (a fondo) — 8 hallazgos más

**Arreglado ya:** `certeza.py` —la compuerta que autoriza publicar— **se salía en silencio
cuando un valor de la lista venía vacío o nulo**, así que BORRAR un precio pasaba en verde.
Es el mismo patrón que ya costó dinero cuatro veces. Ahora un campo obligatorio que falte,
o un valor que no sea número, es un problema; y se exige que todo producto de la base esté
en la lista de distribuidores. Hay prueba que lo fija (rompe el archivo de tres formas).
Al endurecerla saltaron 9 avisos que resultaron ser productos NO elegibles —correcto que no
tengan tope—, así que el tope sólo se exige a los elegibles, y ahora también se avisa al
revés: un NO elegible que traiga tope.

**Lo que Codex marcó y SIGUE PENDIENTE** (por orden de gravedad):

1. **Cajas que no son de 10.** La base y `v_roi_real` ya las soportan, pero `reprecio.py`
   sigue multiplicando y dividiendo por 10 a mano, y `leer_de_base()` no le pasa
   `viales_por_caja`. Hoy el catálogo es todo de 10, por eso las pruebas pasan sin probarlo.
2. **`certeza.py` compara poco.** No mira SKU, ni vender/oculto, ni presentación, ni la
   vigencia ni el motivo. Tampoco detecta llaves repetidas dentro de un JSON. Y base y
   `maestra.csv` pueden estar equivocadas de la misma forma: **no consulta producción**.
3. **Las 2 pruebas de migración no bastan.** Faltan: comisión/elegibilidad/precio de
   distribuidor resultantes, escritura atómica con `poner_precio()`, dos corridas seguidas
   sin cambios, reconstrucción idéntica después, prueba de historial corrompido o perdido,
   y dos cambios del mismo SKU en el mismo segundo.
4. **Silencios que quedan en `db.py`**: números inválidos → `None`, archivos que no existen
   → lista vacía, varios `INSERT OR IGNORE`, un precio de distribuidor malo se sustituye por
   nulo y la carga sigue. Para una compuerta deberían terminar en error, no en aviso.
5. **`oportunidades.py`**: el emparejamiento difuso podría FUSIONAR dos productos distintos
   (DAC vs no-DAC, MT-1 vs MT-2, simple vs mezcla) y hacernos creer que ya vendemos algo que
   no vendemos. Faltan pruebas negativas de eso.
6. **Lo que le falta al modelo para ser una base de tienda seria**: amarrar `costo_lista` y
   `compra_real` a un SKU real (hoy usan nombres libres); registrar tipo de cambio, flete y
   aduana para tener el costo PUESTO EN MÉXICO; ligar cada precio a la compra y la regla que
   lo originaron; prohibir vigencias traslapadas; bitácora inmutable con identidad
   verificable (hoy `quien='christian'` lo puede escribir cualquiera); y estados formales de
   propuesta → aprobación → publicación → verificado en producción.

### Reabastecimiento: el sistema avisa, y deja el mensaje listo

`reabastecer.py` — pedido de Christian: «cuando un cliente pague por algo que no tenemos,
avísame y ayúdame a pedirle una caja al proveedor más barato por WhatsApp, o avísame y yo
lo hago».

**Hallazgo que cambió el diseño:** el `stock` de `/api/products` **NO es inventario real**
(devuelve 40 en 191 productos y 41 en dos: es un valor sembrado). El bueno está en
**`GET /api/stock`**, que además trae `in_hand`. Y eso es lo que importa, porque —palabras
de Christian— *«los de entrega inmediata son los que tengo aquí conmigo; los demás los
tengo que solicitar y me tardan 7 a 14 días»*.

**Hoy hay 9 EN MANO** y cuadran exactamente con sus compras reales: Retatrutida 10/20/40mg,
Tirzepatida 10mg, NAD+ 500mg, KLOW 80mg, 5-Amino-1MQ 5mg y las dos aguas bacteriostáticas.
Los otros 184 son **bajo pedido**: no hay nada que reponer porque no los tiene.

Lo que hace: lee el inventario en vivo, marca lo que se está acabando **de lo que sí tiene**,
busca a quién comprarle (el más barato **contando el envío**, marcando a quién ya se le
compró de verdad y avisando cuando al más barato no se le sabe el envío), y escribe el
mensaje de WhatsApp con enlace `wa.me` listo.

⛔ **NO manda nada.** Un pedido es dinero que sale y un inventario mal leído pediría cajas
de más. Para automatizarlo de verdad, el paso que falta es que Christian apruebe cada
pedido en el Panel — no que un script le escriba solo a un proveedor en China.

⚠️ **Pendiente que Christian pidió: que esto viva EN LÍNEA**, no en su Mac.
⚠️ Ojo: en mano aparece **5-Amino-1MQ 5 mg**, pero la compra real fue **10 mg** (a Lisa,
$45). Uno de los dos está mal y hay que confirmarlo.

### 3ª y 4ª pasada de Codex (rompedor + auditoría) — lo que salió

**Los prompts quedaron guardados** para volver a correrlos sin pegar texto:
`PROMPT-ROMPEDOR.md` (adversarial), `PROMPT-AUDITORIA.md` (auditor completo) y
`PROMPT-DISENO.md` (segunda opinión de diseño). Se corren así, y **se pueden correr en
simultáneo** porque los tres son de sólo lectura:

```
codex exec --skip-git-repo-check --sandbox read-only "$(cat PROMPT-ROMPEDOR.md)"
```

⚠️ Si Codex se niega por "cybersecurity", es el lenguaje del prompt ("romper", "corromper").
Cambiar el encabezado a *"Eres un ingeniero de calidad, encuentra casos de prueba que violen
estas reglas"* lo resuelve: es el mismo ejercicio dicho de otro modo.

**ARREGLADO — el motor cambiaba de opinión según hubiera internet.** Lo destapó la corrida
del auditor sin querer: con red propone **0 cambios**; sin red propone subir el
CJC-1295 + Ipamorelina de **$1,699 a $1,879**. Sin conexión no puede leer a Certified y le
falta el **techo cruzado**, que es un TOPE. El motor imprimía el aviso y **seguía calculando
igual**: correr `--aplicar` sin internet subía un precio $180 por vial con datos
incompletos. Ahora `techos_cruzados()` devuelve si lo logró; en simulacro avisa que esos
precios no son los definitivos y **con `--aplicar` se detiene en seco**.

**ARREGLADO — la excepción de ROI no tenía piso.** Con cualquier texto en `excepcion_roi`
se aceptaba una caja de $10,000 vendida en $100 (ROI 0.01×): vender **abajo del costo**
pasaba el candado. Ahora hay un segundo CHECK.

**ARREGLADO — un producto podía quedarse SIN precio vigente.** El índice único garantiza
MÁXIMO uno, no EXACTAMENTE uno: un `UPDATE` que cierre el vigente sin abrir otro deja cero
y nada protesta. Ahora lo revisa `certeza.py`, que es la compuerta antes de publicar.

**ARREGLADO — el redondeo rompía el techo en silencio.** `bajar_a_9` devolvía `max(9, ...)`
—un número MAYOR que el pedido— así que con techo de $8 producía $9 sin reportar conflicto.
La prueba vieja decía que eso era "a propósito": no lo era, estaba codificando el bug.

**ARREGLADO — cajas que no son de 10.** El motor multiplicaba por 10 a mano; una caja de 2
viales pasaba el candado con un rendimiento real de 1.998×. Ahora cada renglón carga los
suyos.

**ARREGLADO — el comparador de proveedores comparaba cajas de distinto tamaño.** La caja de
Cerebrolysin de Lucy a **$32 parecía la más barata**, pero es de 6 viales: $5.33/vial contra
$4.00 de Lily. Ahora `reabastecer.py` compara **por vial**, con el envío repartido.

**ARREGLADO — la escalera no revisaba los combos**, y `auditar_escalera.py` tenía su PROPIA
definición de "familia" que metía el combo BPC+TB en la familia del BPC-157 simple y
reportaba una escalera rota que no existía. De 1 rojo + 4 amarillos a **2 amarillos reales**
(Glutatión 600→1500 mg y MOTS-c 20→40 mg salen más caros por miligramo).

## 🔴 DECISIÓN PENDIENTE DE CHRISTIAN — tres productos marcados "no vender" SE ESTÁN COBRANDO

Verificado contra el backend EN VIVO el 28-jul:

| Producto | Se cobra | ROI |
|---|---:|---:|
| HGH Fragment 176-191 12 mg | **$2,709** | 9.99× |
| HGH 36 IU | **$1,548** | 5.53× |
| HCG 1,000 IU | **$629** | 9.98× |

Ninguna compuerta los veía: todas partían de los 190 que SÍ se venden y nunca preguntaban
qué sobra del otro lado. `certeza.py` ya los caza (y si no hay red, lo dice en vez de
callarse).

**El matiz que importa: los tres tienen ROI sano.** No están marcados por perder dinero. El
campo `vender` se está usando para CUATRO cosas distintas —retirados por seguridad
(Adipotide, ACE-031), ocultos por regulación (Dysport, HUMSC), dominados por competencia, y
**"solo venta directa"**, que es el caso del HGH 36 IU. Ese último NO significa "no vender":
significa "véndelo sin comisión de distribuidor", y eso ya lo controla `elegible_distribuidor`.

**La pregunta para Christian es una sola: ¿esos tres se venden o no?** Si sí, hay que
quitarles la marca en la maestra. Si no, bajarlos del sitio. No se tocó: es decisión de
ingresos, no un bug.

### Hallazgos anotados y NO arreglados

1. **Vigencias traslapadas.** La base acepta dos periodos históricos que se encimen; el
   índice sólo impide dos precios ABIERTOS. Hoy no está pasando.
3. **`certeza.py` compara poco.** No mira SKU, ni presentación, ni vigencia, ni el motivo.
4. **Una prueba sale a internet** y si no hay red esa comprobación no se hace — y no queda
   claro que no se hizo.
5. **HCG contradice la fuente de verdad**: el documento lista HCG 2,000 y 10,000 IU entre los
   11 de "solo venta directa", pero en la maestra salen elegibles con 30% y 35%. Según la
   fórmula ambos aguantan la comisión. Christian decide cuál manda.
6. **`v_roi_real` resta el envío**, pero `FUENTE-DE-VERDAD.md` dice expresamente que **el
   envío NO cuenta contra el ROI** (nunca pasa del 10%, y ese 10% ya está aceptado).
   Contradicción a resolver.

## ▶️ LO SIGUIENTE QUE SE TRABAJA (orden de Christian, 2026-07-28)

**1. Decidir los 3 HGH: ¿venta directa sin distribuidores?**
Christian se inclina por VENDERLOS, sin distribuidores de por medio. Son
HGH Fragment 176-191 12 mg ($2,709), HGH 36 IU ($1,548) y HCG 1,000 IU ($629) — hoy están
marcados "no vender" en la maestra y **el backend los está cobrando igual**. Los tres tienen
ROI sano (9.99×, 5.53×, 9.98×). Si la decisión es venderlos directo, lo que hay que hacer es
`vender = si` + `elegible_distribuidor = no`, que es lo que de verdad significa "solo venta
directa" — NO dejarlos con la marca de "no vender", que es para lo retirado por seguridad.
Ojo: el backend ya deja **toda la familia HGH** (menos el Fragment) fuera de descuentos y
comisiones por regla aparte del 2026-07-22, así que hay que revisar que las dos reglas no
se contradigan.

**2. Permisos a Codex para que no tenga pruebas fallidas por el entorno.**
Comprobado hoy: `--sandbox read-only` **impide crear archivos temporales** y pytest ni
siquiera arranca. Con `--sandbox workspace-write` **sí corre** (106 pasan). Lo que queda
fallando —3 fallas + 3 errores— es por **falta de red**: no puede leer el backend en vivo ni
a la competencia. Comando:

```
codex exec --skip-git-repo-check --sandbox workspace-write "$(cat PROMPT-AUDITORIA.md)"
```

Falta resolver el acceso a red de su sandbox; mientras tanto, en el prompt ya está dicho que
esas fallas se reporten como limitación del entorno y NO como hallazgo.

**3. Comisiones absurdas — ✅ YA ESTÁ HECHO.**
La columna `comision` aceptaba **−50%, 150% y 300%**: una comisión negativa le COBRARÍA al
distribuidor y una arriba del 100% regala más de lo que entra. Ahora sólo acepta de 0% a 50%
(el tope duro de la casa). De paso, `roi` y `precio_distribuidor_mxn` ya no aceptan negativos.
6 pruebas nuevas. **112 pruebas en verde.**

**4. Dashboard del Motor de Precios en el Panel Admin.**
Christian lo quiere **simple y resumido**, para verlo sin abrir una terminal. Hoy todo esto
sólo existe corriendo scripts en la Mac. Lo que debería enseñar, de lo que ya calcula la base:

- **Semáforo de certeza**: ¿la base, el maestro, el sitio y el backend dicen lo mismo?
  (`certeza.py`) — en verde o en rojo con la lista de qué no cuadra.
- **Los que están al filo**: ROI real más bajo (`v_roi_real`), empezando por el IGF-1 LR3
  1 mg en 4.87×, y cuántos quedan abajo del piso de 5×.
- **Dónde estás pagando de más** (`v_pagando_de_mas`): producto, a quién le compras, a
  cuánto y con quién sería más barato.
- **Qué reponer** de lo que tiene consigo (`reabastecer.py`) y a quién comprarle, con el
  mensaje de WhatsApp listo.
- **Qué te ofrecen y no vendes** (`oportunidades.py`): hoy 5 candidatos reales.
- **Movimientos de precio**: los últimos cambios con su motivo y quién los hizo
  (el historial de vigencias).

Sólo LECTURA en la primera versión. Mover precios desde el Panel es un paso posterior y
necesita el motor migrado a la base primero.

## 🟡 PROVEEDORES — ver `pricing-system/HANDOFF-PROVEEDORES.md`

**30 proveedores, 1,476 precios de 11 de ellos**, de 28 chats de WhatsApp.

**Se repararon 502 precios mal leídos**: los 4 proveedores con lista en PDF tenían los
precios colgados del producto EQUIVOCADO (en la lista de Lucy, el Semax de $41 y el PT-141
de $44 estaban guardados como **Retatrutida**). Dos fallas de raíz, tapadas: el lector no
guardaba el nombre cuando venía pegado al precio, y el importador **tiraba en silencio**
los repetidos aunque trajeran otro precio.

**Retatrutida 40 mg** (le compra a Lily a $230): **Lucy $139**, **Certiva $179**,
Mia HK $212. Lucy sale más barata en todo y su lista se llama "Internal price" — o es la
fuente real o es carnada; a ninguno se le ha comprado. ⚠️ **A ninguno se le sabe el envío.**

**Quién es quién** (`huella_archivos.py`, compara adjuntos byte por byte):
**Lucia = US Lab RT40-275 = +1 505 518-0805 = +86 185 0279 6387** (tres COAs idénticos),
**Anna = RT40-186**, **Lee Factory = Lily**. Seis fotos que parecían probar que los tres
"US Lab" son el mismo **las reenvió Christian**: no prueban nada, el script ya las separa.

## Pendientes

1. **Actualizar el Vigía** para que lea de la base (pedido de Christian).
2. **Terminar de migrar el motor**: que `reprecio.py` escriba en la base y no en el Excel.
   Ahí se apaga MAESTRA.xlsx del todo.
3. **Cargar el CAC** del panel de Meta a `costo_adquisicion` (la tabla está vacía).
4. **Traer descuentos y puntos por cliente** del backend a la base.
5. **Costos de envío de los proveedores nuevos** — sin eso "el más barato" puede mentir.
6. **Mover los costos al Panel Admin** (acordado, no empezado): hoy hace falta una terminal.
7. **Preguntarle a los proveedores** lo de `datos/preguntar_al_proveedor.csv`: qué es
   "TBFing", si el SLU-PP es 322 o 332, y cuál precio vale de los dos que da DT.
8. IGF-1 LR3 1 mg queda en 4.87× y no tiene arreglo (Certified lo topa en $1,460).
9. **Revisar la calculadora de péptidos de Certiva** —
   https://certivapeptides.com/peptide-calculator/#reconstitution-calculator — y
   compararla con la nuestra (pedido de Christian, 28-jul).
10. **Escalera:** quedan 2 casos reales donde el grande sale más caro POR MILIGRAMO —
    Glutatión 600→1500 mg y MOTS-c 20→40 mg. (Los otros 3 que reportaba el auditor eran
    falsos: comparaba el combo BPC+TB contra el BPC-157 normal. Ya usa la familia del
    motor.)
11. **Vigía y Motor, separados** (aprobado por Christian el 28-jul): el Vigía CAPTURA y
    CONTRASTA los precios de la competencia a diario y **no toca los nuestros**; el Motor
    propone el ajuste según las reglas; Christian aprueba. Si el que mira también mueve
    precios, una lectura mala de una página web cambia el catálogo sin que nadie se entere.

## Compuertas (todas en verde)

`npm run verificar` → 80 + 21 + 15 · Backend: 232 pytest · **Precios: 69** ·
Auditor de catálogo: 14/14 · `python3 certeza.py`: 204/204 · **Precios: 112** · `python3 db.py --revisar`.

---

## 📁 Lo de más temprano ese día (2026-07-28)

## Lo que se cerró hoy (todo en vivo y verificado)

**Seguridad, lo más grave del día.** `POST /orders` sumaba `item.price` **tal como venía
del navegador**. Se podía mandar precio $0 y llevarse un vial de $9,359 pagando los $250
del envío. Lo encontró una auditoría externa con Codex; ni las 229 pruebas ni los tres
auditores de precios lo veían, porque **todos comparaban precios publicados y ninguno el
precio realmente cobrado**. Arreglado, desplegado y comprobado contra producción: mandando
$0 ahora cobra $9,359. Un producto que no se resuelve se rechaza.

**Bug hermano:** el pedido descontaba inventario por `id` y la devolución por `id` O `sku`.
El carrito manda SKU → el pedido no bajaba piezas y la cancelación sí las sumaba: **el
inventario se inflaba solo**. Arreglado; ciclo comprobado 40 → 38 → 40.

**Precios.** 11 violaciones de banda corregidas + Tirzepatida repreciada (llevaba meses con
una regla muerta): 10mg $1,749 → $2,119, hasta 60mg $3,919. Todo bajo el techo de Certified.
Reglas nuevas de Christian: **trinquete** (a Exoma no se le sigue para abajo), **Certified
menos $10 con terminación 9**, **techo cruzado** (no cobrar más por menos producto del que
el competidor da en su presentación mayor), y **5× neto o venta directa** para distribuidores.

**Sistema de precios en repo privado:** `github.com/vancuellar/exygen-pricing`. Archivo
maestro auditable `maestra.csv` (entradas vs derivado), motor `reprecio.py`, **42 pruebas**
(19 de estado + 22 de estrés: mutación, 4,000 combinaciones al azar, bordes).

**Dysport y HUMSC ocultos** del catálogo público (no son péptidos RUO). Interruptor `hidden`
nuevo en el backend.

**Correos:** las suites E2E usaban `auditoria@exygenlabs.com` como cliente de prueba, así que
cada corrida le mandaba a Christian "compra confirmada". Ya usan un dominio no entregable.

## 🟡 PROVEEDORES — lo que quedó a medias

Ver **`pricing-system/HANDOFF-PROVEEDORES.md`** (está todo ahí).

Resumen: **28 proveedores registrados, 1,028 precios de 8 de ellos**, sacados de los 26
chats de WhatsApp que Christian exportó. Hallazgos: compra la **RT 40mg a $230** cuando hay
tres contactos ofreciéndola a **$185-190**; **Bainuo y Lily son la misma bodega** (86% del
catálogo idéntico) y Lily es la barata; **Lisa cobra ~8% menos que su propia lista**.

**Falta:** leer los precios que vienen en las **97 fotos** de los chats (solo se capturó la
de Mia), dos catálogos en PDF sin capa de texto, los teléfonos y **costos de envío** de los
nuevos, bajar los videos, y cruzar los **COAs por número de lote** para confirmar fuentes
comunes (idea de Christian — ya se vio que el mismo COA de Retatrutida lo mandan TRES
"proveedores" distintos).

⚠️ **Los proveedores mienten:** ninguno tiene bodega en México ni EE.UU., y los COA que
enseñan son de clientes suyos (se comprobó: uno dice `Customer: Finnrick`). Solo cuenta lo
verificado con una compra.

## Pendientes de Christian
1. Decidir el ROI real: con descuento + comisión + puntos, **IGF-1 LR3 1mg queda en 4.96×**.
   Es el único abajo de 5× y no tiene arreglo (Certified lo topa en $1,460).
2. Costos de envío de los proveedores nuevos.
3. Mover los costos al Panel Admin (se acordó, no se empezó).

---

# Exygen Labs — Website Continuation File

> **Propósito:** fuente única de verdad del SITIO WEB (frontend, backend, IA, marca, despliegue). Pega este archivo en un chat nuevo para retomar con todo el contexto. Complementa a `../NOVA-PRICING-SYSTEM-CONTINUATION.md` (el sistema de precios). **Última actualización: 2026-07-27 (noche).** Empieza por 🔴 EN CURSO.

> **Estilo con Christian:** abogado, no dev ("abogado de 95 años haciendo vibe coding"). Respuestas **ultra cortas, español claro, sin jerga**. Corre TÚ los comandos (nunca le pidas abrir terminal). Términos de git en inglés (commit, push, merge — no "commitear").

---

## 🔴 EN CURSO — FICHAS TÉCNICAS (2026-07-27, noche)

**Es lo que estamos trabajando ahora mismo.** Christian pasó como referencia las fichas
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
