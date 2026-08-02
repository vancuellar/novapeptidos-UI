#!/usr/bin/env node
/* MIS COTIZACIONES — Y EL PASO DE COTIZACIÓN A VENTA, EN UN NAVEGADOR DE VERDAD.
 * ============================================================================
 * Encargo de Christián (2026-08-01), textual:
 *
 *   «necesito que las cotizaciones generadas se guarden en el panel del distribuidor
 *    por si necesita reenviarlas, que no las tenga que volver a generar de cero. Y,
 *    una vez pagadas dejan de ser cotizaciones y se transforman en ventas.»
 *
 * Y la advertencia que vino con el encargo: «La vez pasada se probó sólo por API y
 * salió roto a producción — no repitas eso.» Así que esto abre el panel en Chromium,
 * pica la pestaña y lee la tabla como la leería Mónica.
 *
 * Qué se comprueba:
 *   1. La pestaña «Mis Cotizaciones» existe en el menú del distribuidor.
 *   2. La tabla enseña folio, cliente, fecha, total y estado.
 *   3. ⛔ Una cotización PAGADA sale como VENTA, con su número de pedido — y en UN
 *      solo renglón: no queda la cotización por un lado y la venta por otro.
 *   4. El enlace para reenviar ya trae el fragmento (`#d=…`) que prellena el
 *      checkout del cliente: reenviar es copiar y pegar, no rearmar.
 *   5. ⛔ El código del obsequio no aparece por ningún lado — ni siquiera para ella.
 *   6. El filtro por estado separa lo que falta cobrar de lo que ya se vendió.
 *
 * El servidor NO hace falta: sus respuestas se sirven desde aquí (`page.route`). Lo
 * que se prueba es la pantalla; la API ya tiene sus pruebas en el backend
 * (`test_cotizaciones_y_prellenado.py`).
 *
 * Cómo se corre:
 *     npm run build && npm run prueba:cotizaciones
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.join(__dirname, '..', 'build');

// El código interno del obsequio. NO tiene por qué existir en el navegador: si el
// servidor lo mandara, esta prueba lo pescaría en el HTML.
const CODIGO_DE_OBSEQUIO = 'DGIFT-NOSEENSENA';

const DISTRIBUIDORA = {
  id: 'u-monica', name: 'Mónica', email: 'monica@exygenlabs.com',
  role: 'distributor', distributor_code: 'MONICAF-30-AB12', language: 'es',
};

// Lo que devolvería `/api/distributor/quotes`: las tres vidas de una cotización.
const COTIZACIONES = {
  quotes: [
    {
      token: 'tok-venta', folio: 'COT-260801-0003',
      full_name: 'Christian Cuellar', email: 'christiancuellar@gmail.com',
      phone: '9982440119', address: 'Frac. Selvamar, Solidaridad, Quintana Roo',
      created_at: '2026-08-01T10:00:00+00:00', expires_at: '2026-08-31T10:00:00+00:00',
      vencida: false, total: 7200, list_total: 9000, discount: 1800,
      discount_rate: 0.2, shipping: 0, lines: 1, gifts: 1,
      estado: 'venta', order_number: 'EX-20260801-0007', order_total: 7200,
      order_status: 'confirmado', paid_at: '2026-08-01T11:00:00+00:00',
      url: 'https://exygenlabs.com/carrito/tok-venta#d=llave-de-prueba',
    },
    {
      token: 'tok-pedido', folio: 'COT-260801-0002',
      full_name: 'Ana Ruiz', email: 'ana@x.mx', phone: '', address: '',
      created_at: '2026-08-01T09:00:00+00:00', expires_at: '2026-08-31T09:00:00+00:00',
      vencida: false, total: 3400, list_total: 4000, discount: 600,
      discount_rate: 0.15, shipping: 0, lines: 2, gifts: 0,
      estado: 'pedido', order_number: 'EX-20260801-0004', order_total: 3400,
      order_status: 'pendiente', paid_at: '',
      url: 'https://exygenlabs.com/carrito/tok-pedido',
    },
    {
      token: 'tok-papel', folio: 'COT-260801-0001',
      full_name: 'Luis Pérez', email: '', phone: '', address: '',
      created_at: '2026-08-01T08:00:00+00:00', expires_at: '2026-08-31T08:00:00+00:00',
      vencida: false, total: 1200, list_total: 1200, discount: 0,
      discount_rate: 0, shipping: 250, lines: 1, gifts: 0,
      estado: 'cotizacion', order_number: '', order_total: 0,
      order_status: '', paid_at: '',
      url: 'https://exygenlabs.com/carrito/tok-papel',
    },
  ],
  cotizaciones: 1, pedidos: 1, ventas: 1, vendido: 7200,
};

// ----------------------------------------------------------- servidor del sitio
function servirBuild() {
  if (!fs.existsSync(path.join(RAIZ, 'index.html'))) {
    console.error('No hay build/. Corre primero:  npm run build');
    process.exit(2);
  }
  const TIPOS = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain',
  };
  const server = http.createServer((req, res) => {
    const limpia = decodeURIComponent((req.url || '/').split('?')[0]);
    let archivo = path.join(RAIZ, path.normalize(limpia).replace(/^(\.\.[/\\])+/, ''));
    if (!fs.existsSync(archivo) || fs.statSync(archivo).isDirectory()) {
      archivo = path.join(RAIZ, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    fs.createReadStream(archivo).pipe(res);
  });
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)));
}

// ------------------------------------------------------------- el API de mentira
async function montarApi(page) {
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    const ruta = url.pathname.replace(/^.*\/api/, '');
    const json = (cuerpo, status = 200) => route.fulfill({
      status, contentType: 'application/json', body: JSON.stringify(cuerpo),
    });
    if (ruta === '/auth/me') return json(DISTRIBUIDORA);
    if (ruta === '/distributor/quotes') return json(COTIZACIONES);
    // El resumen completo: la portada del panel lo lee entero y sin `monthly`
    // revienta antes de llegar a la pestaña que se está probando.
    if (ruta === '/distributor/summary') {
      return json({
        distributor_code: 'MONICAF-30-AB12', commission_rate: 0.3,
        customer_discount_rate: 0.1, earnings_total: 0, sales_total: 0,
        sales_count: 0, clients_count: 0, own_earnings: 0, override_earnings: 0,
        monthly: [], level: null,
      });
    }
    if (ruta === '/distributor/codes') return json({ codes: [], rotate_days: 30 });
    if (ruta === '/acuerdo/distribuidor') return json({ requiere_aceptacion: false });
    if (ruta === '/me/notifications') return json({ unread: 0 });
    if (ruta === '/me/points') return json({ eligible: false, balance: 0 });
    if (ruta === '/payments/config') return json({ shipping_charged: true, shipping_flat: 250, free_shipping_from: 2500 });
    if (['/distributor/clients', '/distributor/sales', '/distributor/orders',
      '/orders/me', '/products'].includes(ruta)) return json([]);
    if (ruta === '/distributor/best-sellers') return json({ ranking: [] });
    return json({});
  });
}

const revisiones = [];
function revisar(ok, que, detalle = '') {
  revisiones.push({ ok, que, detalle });
  console.log(`${ok ? '  ok  ' : ' FALLA'}  ${que}${detalle ? `  — ${detalle}` : ''}`);
}

(async () => {
  const server = await servirBuild();
  const sitio = `http://127.0.0.1:${server.address().port}`;
  console.log(`\nMis Cotizaciones → cotización que se vuelve venta   (${sitio})\n`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('exygen_ruo_ack', new Date().toISOString());
      localStorage.setItem('np_token', 'token-de-prueba');   // sesión de distribuidora
    } catch { /* nada */ }
  });
  const page = await ctx.newPage();
  await montarApi(page);

  try {
    // ---- 1. Mónica entra a su panel, a su pestaña de cotizaciones ----
    await page.goto(`${sitio}/distribuidor?tab=cotizaciones`, { waitUntil: 'domcontentloaded' });
    // `DEPURAR=1 npm run prueba:cotizaciones` cuenta QUÉ pasó cuando la pantalla no
    // pinta. Sin esto, un fallo aquí es un «timeout» sin pista: el panel entero se
    // cae con cualquier campo que falte en las respuestas de mentira de arriba.
    if (process.env.DEPURAR) {
      page.on('console', (m) => console.log('  [consola]', m.type(), m.text().slice(0, 200)));
      await page.waitForTimeout(5000);
      console.log('  [url]', page.url());
      console.log('  [texto]', (await page.evaluate(() => document.body.innerText)).slice(0, 600));
    }
    await page.waitForSelector('[data-testid="mis-cotizaciones"]', { timeout: 30000 });
    await page.waitForSelector('[data-testid="cotizaciones-fila"]', { timeout: 20000 });

    const filas = await page.locator('[data-testid="cotizaciones-fila"]').count();
    revisar(filas === 3, 'la lista guarda sus tres cotizaciones', `filas=${filas}`);

    const texto = await page.evaluate(() => document.body.innerText);
    revisar(texto.includes('COT-260801-0001') && texto.includes('COT-260801-0003'),
      'cada renglón trae su folio');
    revisar(texto.includes('Christian Cuellar') && texto.includes('Ana Ruiz'),
      'cada renglón trae a su cliente');

    // ---- 2. ⛔ LA PAGADA YA NO ES COTIZACIÓN: ES VENTA ----
    const ventas = await page.locator('[data-testid="cotizacion-estado-venta"]').count();
    const papeles = await page.locator('[data-testid="cotizacion-estado-cotizacion"]').count();
    const pedidos = await page.locator('[data-testid="cotizacion-estado-pedido"]').count();
    revisar(ventas === 1, '⛔ la cotización pagada aparece como VENTA', `ventas=${ventas}`);
    revisar(papeles === 1 && pedidos === 1,
      'la que sigue en papel y la que ya tiene pedido sin cobrar se distinguen',
      `cotizacion=${papeles} pedido=${pedidos}`);
    revisar(texto.includes('EX-20260801-0007'),
      '⛔ la venta viene amarrada a su número de pedido');
    // ⛔ Un solo renglón por cotización: no está duplicada como cotización Y venta.
    const vecesFolio = (texto.match(/COT-260801-0003/g) || []).length;
    revisar(vecesFolio === 1, '⛔ la cotización vendida NO está duplicada en el panel',
      `apariciones=${vecesFolio}`);

    // ---- 3. Reenviar sin rearmar ----
    const acciones = page.locator('[data-testid="cotizaciones-fila"]').first();
    revisar((await acciones.locator('[data-testid="cotizacion-whatsapp"]').count()) === 1
      && (await acciones.locator('[data-testid="cotizacion-copiar"]').count()) === 1
      && (await acciones.locator('[data-testid="cotizacion-correo"]').count()) === 1,
      'se puede reenviar por WhatsApp, copiando el enlace y por correo');
    const enlace = await acciones.locator('[data-testid="cotizacion-abrir"]').getAttribute('href');
    revisar((enlace || '').includes('/carrito/tok-venta'),
      'y se vuelve a abrir sin rearmarla', enlace || '(sin enlace)');
    revisar((enlace || '').includes('#d='),
      '⛔ el enlace guardado conserva la llave que prellena el checkout de su cliente');

    // ---- 4. ⛔ El código del obsequio no se le enseña ni a ella ----
    const html = await page.content();
    revisar(!html.includes('DGIFT') && !html.includes(CODIGO_DE_OBSEQUIO),
      '⛔ el código del obsequio NO aparece en el panel');

    // ---- 5. El filtro separa lo cobrado de lo que falta ----
    await page.click('[data-testid="cotizaciones-filtro"]');
    await page.click('[role="option"]:has-text("Venta")');
    await page.waitForFunction(
      () => document.querySelectorAll('[data-testid="cotizaciones-fila"]').length === 1,
      null, { timeout: 10000 },
    ).catch(() => {});
    const trasFiltro = await page.locator('[data-testid="cotizaciones-fila"]').count();
    revisar(trasFiltro === 1, 'el filtro deja ver sólo las ventas', `filas=${trasFiltro}`);
  } catch (e) {
    revisar(false, 'la prueba llegó hasta el final', String(e && e.message).slice(0, 200));
  } finally {
    await browser.close();
    server.close();
  }

  const fallas = revisiones.filter((r) => !r.ok);
  console.log(`\n${revisiones.length - fallas.length}/${revisiones.length} en verde\n`);
  process.exit(fallas.length ? 1 : 0);
})();
