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
 *   6. ⛔ Y que el checkout llega CON SUS DATOS PUESTOS: nombre, correo, teléfono y
 *      domicilio, los que su distribuidora capturó al armar la cotización
 *      (Christián, 2026-08-01: «su nombre, email, teléfono, dirección, NADA se
 *      guardó»). Los datos NO vienen del carrito público —esa ruta no los
 *      devuelve— sino de `POST /carrito/<token>/datos`, que exige la segunda llave
 *      del enlace; aquí se comprueba además que esa llamada LLEVA la llave que iba
 *      en el fragmento y que el carrito público NO trae ni un dato personal.
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

// LA SEGUNDA LLAVE — la que abre los datos del cliente. Viaja en el FRAGMENTO del
// enlace (`#d=`), que el navegador nunca manda al servidor.
const LLAVE = 'llave-de-prueba-192-bits-abcdefgh';
// Los datos que Mónica capturó por su cliente al armar la cotización. Son los del
// ejemplo real que mandó Christián.
const DATOS = {
  full_name: 'Christian Cuellar',
  email: 'christiancuellar@gmail.com',
  phone: '9982440119',
  address: 'Frac. Selvamar, Priv. La Ceiba, Casa 6, Solidaridad, Quintana Roo, 77727',
};

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
const llamadasDeDatos = [];

async function montarApi(page) {
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    const ruta = url.pathname.replace(/^.*\/api/, '');
    const json = (cuerpo, status = 200) => route.fulfill({
      status, contentType: 'application/json', body: JSON.stringify(cuerpo),
    });
    // ⛔ LOS DATOS DEL CLIENTE — sólo con la segunda llave, igual que el servidor.
    // Se apunta cada intento para poder comprobar QUÉ llave mandó el navegador.
    if (ruta === `/carrito/${TOKEN}/datos`) {
      let clave = '';
      try { clave = JSON.parse(route.request().postData() || '{}').clave || ''; } catch { /* nada */ }
      llamadasDeDatos.push(clave);
      return clave === LLAVE ? json(DATOS) : json({ detail: 'No hay datos para ese carrito' }, 404);
    }
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
    await page.goto(`${sitio}/carrito/${TOKEN}#d=${LLAVE}`, { waitUntil: 'domcontentloaded' });
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

    // ---- 4. ⛔ EL PRELLENADO: los cuatro datos, ya puestos ----
    // Se espera al formulario lleno: los datos llegan de una llamada aparte.
    await page.waitForFunction(
      (correo) => document.querySelector('[data-testid="checkout-email-input"]')?.value === correo,
      DATOS.email, { timeout: 20000 },
    ).catch(() => {});
    const puesto = async (testid) => page.locator(`[data-testid="${testid}"]`).inputValue().catch(() => '');
    const nombre = await puesto('checkout-name-input');
    const correo = await puesto('checkout-email-input');
    const telefono = await puesto('checkout-phone-input');
    const domicilio = await puesto('checkout-address-input');
    revisar(nombre === DATOS.full_name, '⛔ el checkout llega con el NOMBRE puesto', `«${nombre}»`);
    revisar(correo === DATOS.email, '⛔ el checkout llega con el CORREO puesto', `«${correo}»`);
    revisar(telefono.replace(/\D/g, '') === DATOS.phone,
      '⛔ el checkout llega con el TELÉFONO puesto', `«${telefono}»`);
    revisar(domicilio === DATOS.address, '⛔ el checkout llega con el DOMICILIO puesto',
      `«${domicilio.slice(0, 40)}…»`);
    revisar((await page.locator('[data-testid="checkout-prefilled-cotizacion"]').count()) === 1,
      'se le avisa que los datos vienen de su cotización (y son editables)');

    // ---- 5. ⛔ LA PRIVACIDAD: de dónde NO salieron esos datos ----
    revisar(llamadasDeDatos.includes(LLAVE),
      '⛔ el navegador pidió los datos CON la segunda llave del fragmento',
      `intentos=${llamadasDeDatos.length}`);
    const carritoPublico = JSON.stringify(CARRITO);
    revisar(!carritoPublico.includes(DATOS.email) && !carritoPublico.includes(DATOS.phone)
      && !carritoPublico.includes(DATOS.address),
      '⛔ el carrito PÚBLICO no lleva correo, teléfono ni domicilio');
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
