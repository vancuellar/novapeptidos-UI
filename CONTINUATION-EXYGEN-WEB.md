# Exygen Labs — Website Continuation File

> **Propósito:** fuente única de verdad del SITIO WEB (frontend, backend, IA, marca, despliegue). Pega este archivo en un chat nuevo para retomar con todo el contexto. Complementa a `../NOVA-PRICING-SYSTEM-CONTINUATION.md` (el sistema de precios). **Última actualización: 2026-07-19.**

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
- **Llave Gemini (capa gratuita; Christian decidió NO rotarla — no volver a mencionarlo):** `AIzaSyC3BdqQQlp2vZRIr2GhRwiI0gnjDhKVU54`. Se pone como env `GEMINI_API_KEY`.
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

## 10. ROADMAP — PRÓXIMA SESIÓN (orden de Christian, 2026-07-19)

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
