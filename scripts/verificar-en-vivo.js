#!/usr/bin/env node
/**
 * ¿EL SITIO SE VE, O NADA MÁS CONTESTA?
 * =====================================
 *
 * Un 200 no significa nada. Cloudflare devuelve el mismo `index.html` de 7 KB
 * para todas las rutas: si el bundle de JavaScript truena, la portada sigue
 * contestando 200 y el cliente ve una hoja en blanco. Eso ya pasó, y por eso
 * este archivo NO mira códigos HTTP: abre un navegador de verdad, espera a que
 * React pinte, y comprueba que se pueda VER y PICAR lo que da de comer.
 *
 * Qué revisa (y por qué):
 *
 *   1. Portada en escritorio y en teléfono chico — que React monte, que no haya
 *      un error de JavaScript sin atrapar, y que los dos botones del hero
 *      ("Ver catálogo" y "Empieza aquí") existan, se vean y NADIE los tape.
 *   2. La puerta RUO — que la casilla y el botón de aceptar se puedan alcanzar
 *      en una pantalla de 320 px de alto útil. El 2026-07-31 no se podía: el
 *      aviso era más alto que un iPhone SE y no dejaba bajar, así que en esos
 *      teléfonos el sitio entero estaba muerto y nadie se había enterado.
 *   3. Catálogo — que la rejilla traiga productos de verdad, no cero.
 *   4. Una ficha de producto — título, precio y botón de agregar al carrito.
 *
 * Uso
 * ---
 *   node scripts/verificar-en-vivo.js                       # contra el sitio vivo
 *   node scripts/verificar-en-vivo.js --sitio=http://...    # contra otro
 *   node scripts/verificar-en-vivo.js --hash=main.abc123.js # además, exige ese bundle
 *
 * Códigos de salida — los usa desplegar.sh para decidir:
 *   0  todo bien
 *   1  EL SITIO ESTÁ ROTO   -> marcha atrás automática
 *   2  no se pudo comprobar (falta el navegador, se cayó la red) -> NO se toca
 *      nada y hay que mirar a mano. Un "no sé" jamás debe pasar por un "sí".
 */
const arg = (n, d) => {
  const m = process.argv.find((a) => a.startsWith(`--${n}=`));
  return m ? m.slice(n.length + 3) : d;
};

const SITIO = (arg('sitio', process.env.EXYGEN_SITE || 'https://exygenlabs.com')).replace(/\/$/, '');
const HASH = arg('hash', '');
const SILENCIO = process.argv.includes('--callado');

const fallas = [];
const notas = [];
const mal = (q) => fallas.push(q);
const bien = (q) => notas.push(q);

// El teléfono más apretado que hay que aguantar: 320 px de ancho y 480 de alto
// útil (un iPhone 5/SE con la barra del navegador puesta). Se prueba el caso
// PEOR a propósito — el 2026-07-31 la puerta RUO no se podía aceptar aquí y el
// sitio entero estaba muerto para esos teléfonos, sin que nadie se enterara.
const MOVIL = { width: 320, height: 480 };
const ESCRITORIO = { width: 1280, height: 800 };

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('⚠️  No hay playwright instalado: no se puede comprobar el pintado.');
  console.error('   npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

/** Abre una pestaña limpia y devuelve {page, ctx, errores}. */
async function pestana(browser, viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(String(e).slice(0, 180)));
  page.on('requestfailed', (r) => {
    // Sólo importan los recursos NUESTROS. Que se caiga el píxel de Meta o
    // PostHog no es una tienda rota. `/cdn-cgi/` tampoco: es la telemetría que
    // Cloudflare inyecta sola y que se cancela al cerrar la pestaña.
    const u = r.url();
    if (u.includes('exygenlabs.com') && !u.includes('/cdn-cgi/')) errores.push(`no cargó ${u.slice(0, 90)}`);
  });
  return { ctx, page, errores };
}

/**
 * ¿Se ve Y se puede picar? Devuelve 'OK' o el motivo, en cristiano.
 *
 * Esta función viaja al navegador (page.evaluate), así que no puede usar nada
 * de este archivo. El `scrollIntoView` es a propósito: un botón que está abajo
 * del doblez NO está roto — está abajo. Roto es el que no se alcanza NUNCA, o
 * el que algo tapa.
 */
function sondaClicable(sel) {
  const el = document.querySelector(sel);
  if (!el) return 'no existe';
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  if (r.width < 2 || r.height < 2) return 'mide 0';
  if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.05) return 'invisible';
  el.scrollIntoView({ block: 'center' });
  const r2 = el.getBoundingClientRect();
  const cx = r2.left + r2.width / 2;
  const cy = r2.top + r2.height / 2;
  if (cx < 0 || cy < 0 || cx > window.innerWidth || cy > window.innerHeight) return 'no se alcanza ni con scroll';
  const encima = document.elementFromPoint(cx, cy);
  if (!encima) return 'nada en ese punto';
  if (encima !== el && !el.contains(encima) && !encima.contains(el)) {
    return 'lo tapa ' + encima.tagName + '.' + String(encima.className).slice(0, 45);
  }
  return 'OK';
}

async function abrir(page, ruta) {
  await page.goto(`${SITIO}${ruta}${ruta.includes('?') ? '&' : '?'}cb=${Date.now()}`, {
    waitUntil: 'domcontentloaded', timeout: 45000,
  });
  await page.waitForSelector('#root > *', { timeout: 25000 });
  await page.waitForTimeout(900);
}

/** La puerta RUO del primer ingreso: hay que poder aceptarla. */
async function pasarLaPuerta(page, donde) {
  const hay = await page.$('[data-testid="ruo-gate"]');
  if (!hay) return true;
  const casilla = await page.evaluate(sondaClicable, '[data-testid="ruo-gate-checkbox"] input');
  const boton = await page.evaluate(sondaClicable, '[data-testid="ruo-gate-accept"]');
  if (casilla !== 'OK' || boton !== 'OK') {
    mal(`${donde}: la puerta RUO NO se puede aceptar (casilla: ${casilla} / botón: ${boton}) — el sitio queda inservible`);
    return false;
  }
  try {
    await page.check('[data-testid="ruo-gate-checkbox"] input', { timeout: 6000 });
    await page.click('[data-testid="ruo-gate-accept"]', { timeout: 6000 });
    await page.waitForTimeout(700);
    bien(`${donde}: la puerta RUO se acepta`);
    return true;
  } catch (e) {
    mal(`${donde}: no se pudo aceptar la puerta RUO (${String(e).slice(0, 90)})`);
    return false;
  }
}

async function revisarPortada(browser, viewport, donde) {
  const { ctx, page, errores } = await pestana(browser, viewport);
  try {
    await abrir(page, '/');
    if (!(await pasarLaPuerta(page, donde))) return;

    const h1 = await page.$eval('h1', (e) => e.textContent.trim()).catch(() => '');
    if (h1.length < 10) mal(`${donde}: la portada no tiene título (h1="${h1}")`);
    else bien(`${donde}: título "${h1.slice(0, 40)}…"`);

    // El SEGUNDO botón del hero va al Asesor, no a la guía (Christián,
    // 2026-07-31: "me gustaría cambiar que te lleve al asesor un botón
    // directo, porque está muy escondido"). Esta prueba se quedó pidiendo
    // /aprende/empieza-aqui y tumbó un despliegue sano el 31 de julio: el
    // sitio hacía lo correcto y la prueba lo llamaba roto. Se buscan por
    // data-testid y no por clase, que las clases se mueven con el diseño.
    for (const [nombre, sel] of [
      ['Ver catálogo', '[data-testid="hero-catalog-button"]'],
      ['Arma Mi Plan', '[data-testid="hero-advisor-button"]'],
    ]) {
      const r = await page.evaluate(sondaClicable, sel);
      if (r !== 'OK') mal(`${donde}: el botón "${nombre}" del hero — ${r}`);
      else bien(`${donde}: botón "${nombre}" visible y clicable`);
    }

    // Y que de verdad LLEVE a donde dice.
    try {
      await page.click('[data-testid="hero-advisor-button"]', { timeout: 8000 });
      await page.waitForTimeout(1800);
      if (!page.url().includes('/asesor')) mal(`${donde}: "Arma Mi Plan" no llevó al asesor (quedó en ${page.url()})`);
      else bien(`${donde}: "Arma Mi Plan" abre el asesor`);
    } catch (e) {
      mal(`${donde}: no se pudo picar "Arma Mi Plan" (${String(e).slice(0, 90)})`);
    }

    if (errores.length) mal(`${donde}: errores de JavaScript → ${errores.slice(0, 2).join(' | ')}`);
  } catch (e) {
    mal(`${donde}: la portada no pintó (${String(e).slice(0, 120)})`);
  } finally {
    await ctx.close();
  }
}

async function revisarCatalogoYFicha(browser) {
  const { ctx, page, errores } = await pestana(browser, ESCRITORIO);
  try {
    await abrir(page, '/catalogo');
    await pasarLaPuerta(page, 'catálogo');
    await page.waitForTimeout(1200);

    const tarjetas = await page.$$eval('[data-testid="catalog-grid"] > *', (n) => n.length).catch(() => 0);
    if (tarjetas < 5) { mal(`catálogo: sólo ${tarjetas} productos en la rejilla (debería haber decenas)`); return; }
    bien(`catálogo: ${tarjetas} productos pintados`);

    const ruta = await page.$eval('[data-testid="catalog-grid"] a[href*="/producto"]', (a) => a.getAttribute('href')).catch(() => null);
    if (!ruta) { mal('catálogo: ninguna tarjeta enlaza a una ficha'); return; }

    await abrir(page, ruta);
    const titulo = await page.$eval('[data-testid="pdp-title"]', (e) => e.textContent.trim()).catch(() => '');
    const precio = await page.$eval('[data-testid="pdp-price"]', (e) => e.textContent.trim()).catch(() => '');
    const carrito = await page.evaluate(sondaClicable, '[data-testid="pdp-add-to-cart-button"]');
    if (!titulo) mal(`ficha ${ruta}: sin título`);
    if (!/\d/.test(precio)) mal(`ficha ${ruta}: sin precio (leí "${precio}")`);
    if (carrito !== 'OK') mal(`ficha ${ruta}: el botón de agregar al carrito — ${carrito}`);
    if (titulo && /\d/.test(precio) && carrito === 'OK') bien(`ficha ${ruta}: "${titulo.slice(0, 30)}" a ${precio}, se puede agregar`);

    if (errores.length) mal(`catálogo/ficha: errores de JavaScript → ${errores.slice(0, 2).join(' | ')}`);
  } catch (e) {
    mal(`catálogo/ficha: no pintó (${String(e).slice(0, 120)})`);
  } finally {
    await ctx.close();
  }
}

(async () => {
  if (HASH) {
    // Cloudflare no cambia de versión de golpe en TODOS los bordes: durante
    // unos segundos unas peticiones traen el bundle nuevo y otras el viejo.
    // Con una sola lectura esto se caía en falso — pasó el 2026-07-31: las 14
    // pruebas de pintado salieron bien, esta lectura pescó el bundle viejo,
    // y el script dio marcha atrás a un despliegue bueno sin necesidad.
    // Ahora se pide que el hash aparezca CINCO veces seguidas: eso es haber
    // propagado, no haber tenido suerte.
    const SEGUIDAS = 5;
    let racha = 0, ultimoVisto = '', fallo = null;
    for (let i = 0; i < 60 && racha < SEGUIDAS; i++) {
      try {
        const r = await fetch(`${SITIO}/?cb=${Date.now()}-${i}`, { signal: AbortSignal.timeout(20000) });
        const html = await r.text();
        if (html.includes(HASH)) racha++;
        else {
          racha = 0;
          ultimoVisto = (html.match(/main\.[a-z0-9]+\.js/) || ['¿?'])[0];
        }
      } catch (e) {
        fallo = e;
        racha = 0;
      }
      if (racha < SEGUIDAS) await new Promise((s) => setTimeout(s, 2000));
    }
    if (racha >= SEGUIDAS) {
      bien(`el bundle en vivo es ${HASH} (${SEGUIDAS} lecturas seguidas)`);
    } else if (fallo && !ultimoVisto) {
      console.error('⚠️  No se pudo leer el HTML en vivo:', String(fallo).slice(0, 120));
      process.exit(2);
    } else {
      mal(`el bundle en vivo no es ${HASH} tras 2 minutos (se sirve ${ultimoVisto})`);
    }
  }

  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.error('⚠️  No arrancó el navegador:', String(e).slice(0, 160));
    console.error('   npx playwright install chromium');
    process.exit(2);
  }

  try {
    await revisarPortada(browser, ESCRITORIO, 'escritorio');
    await revisarPortada(browser, MOVIL, 'teléfono 320×480');
    await revisarCatalogoYFicha(browser);
  } finally {
    await browser.close();
  }

  if (!SILENCIO) notas.forEach((n) => console.log(`  ✅ ${n}`));
  if (fallas.length) {
    console.error(`\n⛔ ${SITIO} ESTÁ ROTO — ${fallas.length} problema(s):`);
    fallas.forEach((f) => console.error(`  ⛔ ${f}`));
    process.exit(1);
  }
  console.log(`\n✅ ${SITIO} se ve y se puede usar (${notas.length} comprobaciones).`);
  process.exit(0);
})().catch((e) => {
  console.error('⚠️  La comprobación se cayó sola:', String(e).slice(0, 200));
  process.exit(2);
});
