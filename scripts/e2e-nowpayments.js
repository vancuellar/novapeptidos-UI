#!/usr/bin/env node
/**
 * PRUEBA E2E DE PAGOS EN CRIPTO (NOWPayments) — de punta a punta, contra el sitio EN VIVO.
 *
 * Qué prueba, en orden:
 *   1. La llave de NOWPayments sirve y la cuenta tiene monedas prendidas.
 *   2. Nuestro backend ofrece cripto en el checkout.
 *   3. Una compra REAL con method=cripto devuelve un enlace de pago de NOWPayments.
 *   4. Esa factura es de verdad: se le pide una dirección de depósito y la da.
 *   5. El webhook RECHAZA una firma falsa (si no, cualquiera confirma pedidos gratis).
 *   6. El webhook ACEPTA la firma buena y deja el pedido en 'confirmado'.
 *   7. Limpieza: el pedido de prueba se borra y el inventario se repone.
 *
 * Necesita las llaves en ~/.config/exygen/nowpayments.env y el admin en admin.env.
 *
 *   node scripts/e2e-nowpayments.js
 */
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const API = process.env.API_BASE || 'https://api.exygenlabs.com/api';
const NP = 'https://api.nowpayments.io/v1';

let bien = 0;
let mal = 0;
const pendientes = [];

const ok = (t, extra) => { bien++; console.log(`  OK    ${t}${extra ? `  — ${extra}` : ''}`); };
const falla = (t, extra) => { mal++; console.log(`  FALLA ${t}${extra ? `  — ${extra}` : ''}`); };
const revisar = (cond, t, extra) => (cond ? ok(t, extra) : falla(t, extra));

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

/** La firma tal como la arma NOWPayments: HMAC-SHA512 del JSON con las llaves ORDENADAS. */
function firmar(payload, secreto) {
  const ordenado = JSON.stringify(payload, Object.keys(payload).sort());
  return crypto.createHmac('sha512', secreto).update(ordenado).digest('hex');
}

(async () => {
  const env = envFile('nowpayments.env');
  const admin = envFile('admin.env');
  const KEY = env.NOWPAYMENTS_API_KEY;
  const IPN = env.NOWPAYMENTS_IPN_SECRET;

  console.log(`\n=== E2E NOWPAYMENTS · ${API} ===\n`);
  if (!KEY || !IPN) {
    console.log('  FALLA  faltan NOWPAYMENTS_API_KEY / NOWPAYMENTS_IPN_SECRET en ~/.config/exygen/nowpayments.env');
    process.exit(1);
  }

  // ---------------------------------------------------- 1. la cuenta de NOWPayments
  console.log('1) La cuenta de NOWPayments');
  const estado = await j(await fetch(`${NP}/status`));
  revisar(estado.message === 'OK', 'la API de NOWPayments responde', estado.message);

  const monedas = await j(await fetch(`${NP}/merchant/coins`, { headers: { 'x-api-key': KEY } }));
  const lista = monedas.selectedCurrencies || [];
  revisar(lista.length > 0, 'hay monedas PRENDIDAS en la cuenta', `${lista.length} monedas`);
  revisar(lista.some((c) => /^USDT/.test(c)), 'acepta USDT (la que no se mueve de precio)',
          lista.filter((c) => /^USDT/.test(c)).join(', '));

  // ---------------------------------------------------- 2. nuestro backend
  console.log('\n2) Nuestro backend');
  const cfg = await j(await fetch(`${API}/payments/config`));
  revisar(cfg.crypto_enabled === true, 'el checkout ofrece cripto', JSON.stringify(cfg));

  // ---------------------------------------------------- 3. compra REAL
  console.log('\n3) Compra real con cripto');
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
      customer: { full_name: 'E2E Cripto', email: 'auditoria@exygenlabs.com',
                  phone: '+52 5512345678', address: 'x', city: 'Mérida', state: 'Yucatán',
                  postal_code: '97000', country: 'MX', notes: 'E2E CRIPTO — se borra sola' },
      payment_method: 'cripto', shipping: 0,
    }),
  }));
  if (!pedido.order_number) { falla('se creó el pedido', JSON.stringify(pedido).slice(0, 200)); process.exit(1); }
  pendientes.push(pedido);
  ok('se creó el pedido', `${pedido.order_number} · $${pedido.total}`);

  const url = pedido.crypto_checkout_url || '';
  revisar(/nowpayments\.io/.test(url), 'devolvió enlace de pago de NOWPayments', url || '(vacío)');
  revisar(pedido.status === 'pendiente', "queda 'pendiente' hasta que llegue el dinero", pedido.status);

  // ---------------------------------------------------- 4. la factura es real
  console.log('\n4) La factura es cobrable de verdad');
  const iid = (/[?&]iid=(\d+)/.exec(url) || [])[1];
  revisar(!!iid, 'el enlace trae id de factura', iid);
  let pago = {};
  if (iid) {
    pago = await j(await fetch(`${NP}/invoice-payment`, {
      method: 'POST',
      headers: { 'x-api-key': KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ iid: Number(iid), pay_currency: 'usdttrc20',
                             order_description: 'E2E Exygen' }),
    }));
    revisar(!!pago.pay_address, 'NOWPayments da dirección de depósito', pago.pay_address);
    revisar(Number(pago.pay_amount) > 0, 'convierte MXN a cripto',
            `$${pago.price_amount} MXN = ${pago.pay_amount} USDT`);
    revisar(String(pago.order_id) === String(pedido.order_number),
            'la factura trae NUESTRO número de pedido', pago.order_id);
    // Precio congelado (Christian, 2026-07-26): si esto se apaga, un cliente lento
    // nos puede pagar menos pesos de los que costaba el pedido.
    revisar(pago.is_fixed_rate === true, 'el precio queda CONGELADO', String(pago.is_fixed_rate));
    if (pago.created_at && pago.valid_until) {
      const min = Math.round((new Date(pago.valid_until) - new Date(pago.created_at)) / 60000);
      revisar(min > 0 && min <= 20, 'la ventana para pagar es corta', `${min} minutos`);
    }
  }

  // ---------------------------------------------------- 5. firma falsa
  console.log('\n5) El webhook y la seguridad');
  const evento = { payment_id: pago.payment_id || 1, payment_status: 'finished',
                   order_id: pedido.order_number, price_amount: pedido.total,
                   price_currency: 'mxn', pay_currency: 'usdttrc20' };
  const rFalsa = await fetch(`${API}/payments/nowpayments/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-nowpayments-sig': 'a'.repeat(128) },
    body: JSON.stringify(evento),
  });
  revisar(rFalsa.status === 401, 'RECHAZA una firma falsa', `HTTP ${rFalsa.status}`);

  const rSin = await fetch(`${API}/payments/nowpayments/webhook`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(evento),
  });
  revisar(rSin.status === 401, 'RECHAZA un webhook sin firma', `HTTP ${rSin.status}`);

  // ---------------------------------------------------- 6. firma buena
  const cuerpo = JSON.stringify(evento);
  const rBuena = await fetch(`${API}/payments/nowpayments/webhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-nowpayments-sig': firmar(evento, IPN) },
    body: cuerpo,
  });
  revisar(rBuena.status === 200, 'ACEPTA la firma buena', `HTTP ${rBuena.status}`);

  // ---------------------------------------------------- 7. el pedido quedó pagado
  console.log('\n6) El pedido quedó pagado');
  const vista = await j(await fetch(`${API}/orders/${pedido.order_number}`));
  revisar(vista.status === 'confirmado', "el pedido pasó a 'confirmado'", vista.status);
  revisar(!!vista.paid_at, 'quedó la fecha de pago', vista.paid_at || '(vacía)');

  // ---------------------------------------------------- limpieza
  console.log('\n7) Limpieza');
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

  console.log(`\n=== ${bien} bien, ${mal} por revisar ===\n`);
  process.exit(mal ? 1 : 0);
})().catch((e) => { console.error('\nSE CAYÓ LA PRUEBA:', e.message); process.exit(1); });
