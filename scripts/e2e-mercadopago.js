#!/usr/bin/env node
/**
 * PRUEBA E2E DE PAGOS CON TARJETA (Mercado Pago · Checkout Pro) — contra el sitio EN VIVO.
 *
 * Por qué existe: hasta el 2026-07-26 el checkout tenía un formulario de tarjeta
 * que validaba los datos en el navegador y LOS TIRABA A LA BASURA. Nadie cobraba
 * y el cliente se iba creyendo que había pagado. Esta prueba existe para que eso
 * no pueda volver a pasar sin que nos enteremos.
 *
 * Qué prueba, en orden:
 *   1. El backend ofrece tarjeta en el checkout (o sea: la llave sirve).
 *   2. Una compra REAL con method=tarjeta devuelve un enlace de Mercado Pago.
 *   3. Ese enlace es una página de cobro de verdad, no un 404.
 *   4. La URL del webhook que registramos en Mercado Pago EXISTE. Este es el
 *      punto que ya nos falló una vez: con la ruta equivocada el cobro funciona
 *      pero el aviso se pierde y el pedido se queda 'pendiente' para siempre.
 *   5. El webhook RECHAZA firmas falsas y peticiones sin firma.
 *   6. El webhook ACEPTA la firma buena y deja el pedido en 'confirmado'.
 *      Esto SOLO corre si existe MERCADOPAGO_WEBHOOK_SECRET en
 *      ~/.config/exygen/mercadopago.env. Si no está, se reporta como NO
 *      VERIFICADO: nunca se da por bueno en silencio.
 *   7. Limpieza: el pedido de prueba se borra y el inventario se repone.
 *
 *   node scripts/e2e-mercadopago.js
 */
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const API = process.env.API_BASE || 'https://api.exygenlabs.com/api';
const WEBHOOK = `${API}/payments/mercadopago/webhook`;

let bien = 0;
let mal = 0;
let sinVerificar = 0;
const pendientes = [];

const ok = (t, extra) => { bien++; console.log(`  OK    ${t}${extra ? `  — ${extra}` : ''}`); };
const falla = (t, extra) => { mal++; console.log(`  FALLA ${t}${extra ? `  — ${extra}` : ''}`); };
const revisar = (cond, t, extra) => (cond ? ok(t, extra) : falla(t, extra));
const nover = (t, porque) => { sinVerificar++; console.log(`  ----  ${t}  — NO VERIFICADO: ${porque}`); };

function envFile(nombre) {
  const p = path.join(os.homedir(), '.config', 'exygen', nombre);
  const out = {};
  if (!fs.existsSync(p)) return out;
  for (const linea of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(linea);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

const j = async (r) => { try { return await r.json(); } catch { return {}; } };

/**
 * La firma tal como la arma Mercado Pago: HMAC-SHA256 sobre la plantilla
 * `id:<data.id>;request-id:<x-request-id>;ts:<ts>;`.
 * OJO: el id va en MINÚSCULAS. Con mayúsculas la firma no cuadra y todos los
 * pagos se rechazarían en silencio.
 */
function firmar(dataId, requestId, ts, secreto) {
  const plantilla = `id:${String(dataId).toLowerCase()};request-id:${requestId};ts:${ts};`;
  return crypto.createHmac('sha256', secreto).update(plantilla).digest('hex');
}

(async () => {
  const env = envFile('mercadopago.env');
  const admin = envFile('admin.env');
  const SECRETO = env.MERCADOPAGO_WEBHOOK_SECRET;

  console.log(`\n=== E2E MERCADO PAGO · ${API} ===\n`);

  // ------------------------------------------------------- 1. el backend
  console.log('1) Nuestro backend');
  const cfg = await j(await fetch(`${API}/payments/config`));
  revisar(cfg.card_enabled === true, 'el checkout ofrece tarjeta', JSON.stringify(cfg));

  // ------------------------------------------------------- 2. compra REAL
  console.log('\n2) Compra real con tarjeta');
  const productos = await j(await fetch(`${API}/products`));
  const catalogo = productos.products || productos;
  const prod = (Array.isArray(catalogo) ? catalogo : []).find((p) => (p.stock || 0) > 2 && p.price > 500);
  if (!prod) { falla('hay un producto con inventario para probar'); process.exit(1); }
  ok('producto de prueba', `${prod.name} $${prod.price}`);

  const pedido = await j(await fetch(`${API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ product_id: prod.id, name: prod.name, price: prod.price, quantity: 1,
                presentation: prod.presentation || '', image_url: '' }],
      // OJO: example.com es un dominio reservado y NO ENTREGABLE, a propósito.
      // Con 'auditoria@exygenlabs.com' cada corrida le mandaba a Christian un
      // "compra confirmada" y un "pago confirmado" a su buzón real — y esta
      // suite se corre antes de CADA push (2026-07-27). No lo cambies a un
      // correo que alguien lea.
      customer: { full_name: 'E2E Tarjeta', email: 'e2e-no-responder@example.com',
                  phone: '+52 5512345678', address: 'x', city: 'Mérida', state: 'Yucatán',
                  postal_code: '97000', country: 'MX', notes: 'E2E TARJETA — se borra sola' },
      payment_method: 'tarjeta', shipping: 0,
    }),
  }));
  if (!pedido.order_number) { falla('se creó el pedido', JSON.stringify(pedido).slice(0, 200)); process.exit(1); }
  pendientes.push(pedido);
  ok('se creó el pedido', `${pedido.order_number} · $${pedido.total}`);

  const url = pedido.card_checkout_url || '';
  revisar(/mercadopago\.com/.test(url), 'devolvió enlace de pago de Mercado Pago', url ? url.slice(0, 70) : '(vacío)');
  revisar(pedido.status === 'pendiente', "queda 'pendiente' hasta que llegue el dinero", pedido.status);

  // Si no hay enlace, la llave no sirve: no tiene sentido seguir.
  if (!/mercadopago\.com/.test(url)) {
    falla('la llave de Mercado Pago sirve',
          'sin enlace de cobro. Revisa el access token en Admin → Cobros');
  }

  // ------------------------------------------------------- 3. el enlace es real
  console.log('\n3) El enlace es cobrable de verdad');
  if (/mercadopago\.com/.test(url)) {
    const pref = (/pref_id=([\w-]+)/.exec(url) || [])[1];
    revisar(!!pref, 'el enlace trae id de preferencia', pref);
    // Mercado Pago responde 403 a clientes automatizados: eso NO significa que
    // la preferencia no exista. Lo que delata una preferencia inválida es un 404
    // o un 400. Por eso se comprueba así y no con un 200 estricto.
    const pagina = await fetch(url, { redirect: 'follow' });
    revisar(![404, 400].includes(pagina.status), 'la preferencia existe en Mercado Pago',
            `HTTP ${pagina.status}${pagina.status === 403 ? ' (bloquea bots, esperado)' : ''}`);
  }

  // ------------------------------------------------------- 4. la URL del webhook existe
  // Esta comprobación nació de un error real: se registró
  // /api/webhooks/mercadopago (404) en vez de /api/payments/mercadopago/webhook.
  console.log('\n4) La URL del webhook que registramos existe');
  const rRuta = await fetch(WEBHOOK, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
  });
  revisar(rRuta.status !== 404, 'la ruta del webhook responde (no 404)', `HTTP ${rRuta.status}`);
  const rMala = await fetch(`${API}/webhooks/mercadopago`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
  });
  revisar(rMala.status === 404, 'la ruta equivocada sigue siendo 404 (por si alguien la registra)',
          `HTTP ${rMala.status}`);

  // ------------------------------------------------------- 5. seguridad del webhook
  console.log('\n5) El webhook y la seguridad');
  const dataId = '1234567890';
  const ts = Math.floor(Date.now() / 1000);
  const reqId = 'e2e-exygen';
  const cuerpo = JSON.stringify({ type: 'payment', data: { id: dataId } });

  const rFalsa = await fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-request-id': reqId,
               'x-signature': `ts=${ts},v1=${'a'.repeat(64)}` },
    body: cuerpo,
  });
  revisar(rFalsa.status === 401, 'RECHAZA una firma falsa', `HTTP ${rFalsa.status}`);

  const rSin = await fetch(WEBHOOK, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo,
  });
  revisar(rSin.status === 401, 'RECHAZA un webhook sin firma', `HTTP ${rSin.status}`);

  // ------------------------------------------------------- 6. firma buena
  if (!SECRETO) {
    nover('ACEPTA la firma buena y confirma el pedido',
          'falta MERCADOPAGO_WEBHOOK_SECRET en ~/.config/exygen/mercadopago.env');
    nover("el pedido pasa a 'confirmado' con un aviso real de Mercado Pago",
          'depende de la comprobación anterior');
  } else {
    const firma = firmar(dataId, reqId, ts, SECRETO);
    const rBuena = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-request-id': reqId,
                 'x-signature': `ts=${ts},v1=${firma}` },
      body: cuerpo,
    });
    // La firma buena tiene que PASAR el filtro. Como el id 1234567890 no es un
    // pago real, lo que sigue es un 502 al consultar la API de Mercado Pago:
    // eso es correcto y hace que reintente. Lo que NO puede pasar es un 401.
    revisar(rBuena.status !== 401, 'la firma buena PASA el filtro',
            `HTTP ${rBuena.status}${rBuena.status === 502 ? ' (no pudo consultar un pago inexistente, esperado)' : ''}`);

    // Y esta es la propiedad que de verdad protege el dinero: aun teniendo la
    // clave secreta, un aviso inventado NO puede confirmar un pedido, porque el
    // estado se le pregunta a la API de Mercado Pago y no se lee del cuerpo.
    const tras = await j(await fetch(`${API}/orders/${pedido.order_number}`));
    revisar(tras.status === 'pendiente',
            'un aviso firmado con un pago falso NO confirma el pedido',
            `sigue en '${tras.status}'`);
  }

  // ------------------------------------------------------- limpieza
  console.log('\n6) Limpieza');
  const login = await j(await fetch(`${API}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: admin.EXYGEN_ADMIN_EMAIL, password: admin.EXYGEN_ADMIN_PASSWORD }),
  }));
  if (!login.token) falla('el admin pudo entrar para limpiar', JSON.stringify(login).slice(0, 120));
  const h = { Authorization: `Bearer ${login.token || ''}` };
  let borrados = 0;
  for (const o of pendientes) {
    const r = await fetch(`${API}/admin/orders/${o.id}`, { method: 'DELETE', headers: h });
    if (r.status === 200) borrados++;
  }
  revisar(borrados === pendientes.length, 'se borró el pedido de prueba', `${borrados}/${pendientes.length}`);

  const stockDespues = await j(await fetch(`${API}/products`));
  const p2 = ((stockDespues.products || stockDespues) || []).find((p) => p.id === prod.id);
  revisar(p2 && p2.stock === prod.stock, 'el inventario volvió a su lugar',
          `antes ${prod.stock} · ahora ${p2 && p2.stock}`);

  const cola = sinVerificar ? `, ${sinVerificar} SIN VERIFICAR` : '';
  console.log(`\n=== ${bien} bien, ${mal} por revisar${cola} ===\n`);
  process.exit(mal ? 1 : 0);
})().catch((e) => { console.error('\nSE CAYÓ LA PRUEBA:', e.message); process.exit(1); });
