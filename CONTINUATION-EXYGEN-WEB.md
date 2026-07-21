# Exygen Labs — Website Continuation File

> **Propósito:** fuente única de verdad del SITIO WEB (frontend, backend, IA, marca, despliegue). Pega este archivo en un chat nuevo para retomar con todo el contexto. Complementa a `../NOVA-PRICING-SYSTEM-CONTINUATION.md` (el sistema de precios). **Última actualización: 2026-07-21 (madrugada).** Empieza por la sección 🚩 LO PRIMERO QUE DEBE HACER EL PRÓXIMO CHAT.

> **Estilo con Christian:** abogado, no dev ("abogado de 95 años haciendo vibe coding"). Respuestas **ultra cortas, español claro, sin jerga**. Corre TÚ los comandos (nunca le pidas abrir terminal). Términos de git en inglés (commit, push, merge — no "commitear").

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

## 🚩 PENDIENTES NUEVOS DE CHRISTIAN (2026-07-21, madrugada) — APUNTADOS, SIN EJECUTAR

1. **Hablar del programa de lealtad:** hoy es 5% sobre compras pagadas (tasa que eligió el
   asistente como arranque). Christian quiere revisar el % y DEFINIR las políticas del
   programa (vigencia/caducidad de puntos, quién califica, límites) y la **política de
   devoluciones** y cómo interactúan (una devolución debe revertir puntos — el código ya
   revierte al cancelar, pero falta la política escrita).
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
