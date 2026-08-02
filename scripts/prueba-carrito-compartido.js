#!/usr/bin/env node
/* EL CARRITO COMPARTIDO TIENE QUE SOBREVIVIR AL CHECKOUT.
 * =======================================================
 * Ésta es la prueba que nadie estaba haciendo, y por eso llegó a producción el
 * fallo que Christián encontró el 2026-08-01:
 *
 *   «Compartí el link del carrito y cuando le di a pagar se borró todo.»
 *
 * La verificación de aquel día se hizo POR API —y por API todo pasa, porque el
 * servidor siempre estuvo bien— y abriendo el enlace de pago pegado en la barra del
 * navegador, que también pasa, porque ahí hay una carga completa de la página. El
 * único camino que se rompía era el del cliente de verdad: abrir `/carrito/<token>` y
 * apretar «Comprar Ahora», que es una navegación de las de adentro (sin recarga).
 *
 * Así que esta prueba hace EXACTAMENTE eso, en un navegador de verdad:
 *
 *   1. Abre `/carrito/<token>` como lo abriría el cliente: sin sesión, sin cuenta.
 *   2. Comprueba que ve sus productos, sus cortesías y su total.
 *   3. ⛔ Comprueba que el CÓDIGO DEL OBSEQUIO no está en la página.
 *   4. Aprieta «Comprar Ahora».
 *   5. ⛔ Comprueba que en el checkout SIGUEN sus productos —no «Tu carrito está
 *      vacío»—, que el token del carrito viajó y que el código del distribuidor
 *      quedó aplicado (sin él la venta no es de nadie).
 *
 * El servidor NO hace falta: sus respuestas se sirven desde aquí (`page.route`), que
 * es lo correcto para una prueba de esta pantalla — lo que se está probando es el
 * navegador, no la API, y ya hay pruebas de la API en el backend.
 *
 * Cómo se corre:
 *     npm run build && npm run prueba:carrito
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.join(__dirname, '..', 'build');
const TOKEN = 'tokendepruebaf0f0f0f0f0f0f0f0f0f0';
// El código interno del obsequio. NO tiene por qué existir en el navegador: se busca
// en el HTML de las dos pantallas y si aparece, la prueba truena.
const CODIGO_DE_OBSEQUIO = 'DGIFT-NOSEENSENA';

const PRODUCTOS = [
  { id: 'prod-reta-60', sku: 'RETA-60MG', name: 'Retatrutida 60 mg', slug: 'retatrutida-60-mg',
    presentation: '60 mg', price: 5429, stock: 20, category: 'perdida-peso' },
  { id: 'prod-bpc-10', sku: 'BPC-10MG', name: 'BPC-157 10 mg', slug: 'bpc-157-10-mg',
    presentation: '10 mg', price: 899, stock: 12, category: 'recuperacion' },
];

// Lo que devolvería `/api/carrito/{token}` — armado con la MISMA lista blanca del
// servidor (`regalos.vista_publica`): aquí no hay `gift_code` porque allá tampoco.
const CARRITO = {
  token: TOKEN,
  folio: 'COT-260801-0001',
  client_name: 'Cliente de Prueba',
  currency: 'MXN',
  lines: [
    { product_id: 'prod-reta-60', name: 'Retatrutida 60 mg', quantity: 1,
      unit_price: 4886, list_price: 5429, amount: 4886 },
    { product_id: 'prod-bpc-10', name: 'BPC-157 10 mg', quantity: 1,
      unit_price: 809, list_price: 899, amount: 809 },
  ],
  gifts: [
    { tipo: 'producto', name: 'Agua bacteriostática 30 ml', quantity: 2 },
    { tipo: 'envio', name: '', quantity: 1 },
  ],
  list_total: 6328,
  discount: 633,
  discount_rate: 0.1,
  shipping: 0,
  shipping_free: true,
  total: 5695,
  ref: 'MONICAF-PRUEBA',
  expires_at: '2099-01-01T00:00:00+00:00',
};

const CONFIG_PAGOS = {
  crypto_enabled: true, card_enabled: true, oxxo_enabled: true,
  shipping_charged: true, shipping_flat: 250, free_shipping_from: 2500,
  shipping_cap_rate: 0.05, shipping_cost_estimate: 165, shipping_quote_enabled: false,
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
    // Una sola página: lo que no es un archivo real cae en el index (como Cloudflare).
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
    if (ruta === `/carrito/${TOKEN}`) return json(CARRITO);
    if (ruta === '/products') return json(PRODUCTOS);
    if (ruta === '/payments/config') return json(CONFIG_PAGOS);
    if (ruta === '/stock') return json({ 'prod-reta-60': 20, 'prod-bpc-10': 12 });
    if (ruta.startsWith('/discount-code/')) {
      return json({ code: 'MONICAF-PRUEBA', discount_rate: 0.1, min_order: 0 });
    }
    if (ruta === '/auth/me') return json({}, 401);
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
  console.log(`\nCarrito compartido → checkout   (${sitio})\n`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  // El aviso de entrada ya aceptado: no es lo que se está probando y taparía los clics.
  await ctx.addInitScript(() => {
    try { localStorage.setItem('exygen_ruo_ack', new Date().toISOString()); } catch { /* nada */ }
  });
  const page = await ctx.newPage();
  await montarApi(page);

  try {
    // ---- 1. el cliente abre el enlace que le mandaron por WhatsApp ----
    await page.goto(`${sitio}/carrito/${TOKEN}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-testid="carrito-compartido"]', { timeout: 20000 });
    const htmlCarrito = await page.content();
    revisar(htmlCarrito.includes('Retatrutida 60 mg'), 'el carrito compartido enseña sus productos');
    revisar((await page.locator('[data-testid="carrito-cortesia"]').count()) === 2,
      'enseña las dos cortesías');
    revisar(!htmlCarrito.includes(CODIGO_DE_OBSEQUIO) && !htmlCarrito.includes('DGIFT'),
      '⛔ el código del obsequio NO aparece en el carrito compartido');

    // ---- 2. aprieta «Comprar Ahora» ----
    await page.click('[data-testid="carrito-comprar"]');
    await page.waitForURL('**/checkout**', { timeout: 20000 });

    // ---- 3. ⛔ el carrito TIENE que seguir ahí ----
    await page.waitForSelector('[data-testid="checkout-summary"], text=Retatrutida 60 mg', { timeout: 20000 })
      .catch(() => {});
    // Se espera a que la hidratación acabe: los renglones salen del catálogo real.
    await page.waitForFunction(
      () => !document.body.innerText.includes('vacío')
        && document.body.innerText.includes('Retatrutida 60 mg'),
      null, { timeout: 20000 },
    ).catch(() => {});

    const texto = await page.evaluate(() => document.body.innerText);
    revisar(!/carrito está vacío|cart is empty|carrinho está vazio/i.test(texto),
      '⛔ el checkout NO dice «tu carrito está vacío»');
    revisar(texto.includes('Retatrutida 60 mg') && texto.includes('BPC-157 10 mg'),
      '⛔ los dos productos llegaron al checkout');

    const guardado = await page.evaluate(() => ({
      token: sessionStorage.getItem('exygen_carrito_compartido'),
      codigo: localStorage.getItem('np_dist_code'),
      renglones: JSON.parse(localStorage.getItem('np_cart') || '[]').length,
    }));
    revisar(guardado.token === TOKEN,
      '⛔ el token del carrito compartido viajó (las cortesías se aplican al cobrar)',
      `token=${guardado.token}`);
    revisar(guardado.renglones === 2, 'el carrito del navegador tiene los dos renglones',
      `renglones=${guardado.renglones}`);
    revisar(guardado.codigo === 'MONICAF-PRUEBA',
      'el código del distribuidor quedó aplicado (la venta se le atribuye)',
      `codigo=${guardado.codigo}`);

    const htmlCheckout = await page.content();
    revisar(!htmlCheckout.includes('DGIFT'),
      '⛔ el código del obsequio NO aparece en el checkout');
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
