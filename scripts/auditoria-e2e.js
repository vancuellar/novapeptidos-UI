#!/usr/bin/env node
/**
 * Auditoría de extremo a extremo de exygenlabs.com.
 *
 * Revisa lo que de verdad duele si se rompe: que las páginas respondan (y que
 * Google las pueda leer), que ninguna categoría abra vacía, que el catálogo del
 * sitio cobre lo mismo que el backend, que el Admin esté cerrado, y que las
 * reglas de dinero cobren lo que deben.
 *
 * Cómo correrla
 * -------------
 *   npm run auditoria             # solo lectura: seguro, no toca nada
 *   npm run auditoria:completa    # + Admin y COMPRAS REALES (se borran solas)
 *
 * Las compras reales necesitan la contraseña del admin en el entorno. NUNCA se
 * escribe aquí: este repositorio es público.
 *
 *   export EXYGEN_ADMIN_EMAIL='admin@exygenlabs.com'
 *   export EXYGEN_ADMIN_PASSWORD='...'
 *
 * Devuelve código 1 si algo falla, para poder colgarla de una tarea diaria.
 *
 * Historia: nació el 2026-07-25 y en su primera corrida encontró dos cosas
 * serias — que Google veía 404 en TODAS las rutas menos la portada (el sitio era
 * invisible en las búsquedas) y que se podían vender 99,999 piezas de algo con 34
 * en existencia. Por eso vale la pena correrla seguido.
 */
const fs = require('fs');
const path = require('path');

const SITE = process.env.EXYGEN_SITE || 'https://exygenlabs.com';
const API = process.env.EXYGEN_API || 'https://api.exygenlabs.com/api';
const RAIZ = path.join(__dirname, '..');
const CON_COMPRAS = process.argv.includes('--compras');

const resultados = [];
const ok = (nombre, detalle = '') => resultados.push({ bien: true, nombre, detalle });
const mal = (nombre, detalle = '') => resultados.push({ bien: false, nombre, detalle });
const revisar = (cond, nombre, detalle) => (cond ? ok : mal)(nombre, detalle);
const j = (r) => r.json();

const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');

// Lee un arreglo exportado de fallbackCatalog.js sin tener que importar React.
function leerDelCatalogo(nombreExport) {
  const src = fs.readFileSync(path.join(RAIZ, 'src/data/fallbackCatalog.js'), 'utf8');
  const re = new RegExp(`export const ${nombreExport} = (\\[[\\s\\S]*?\\n\\]);`);
  const m = src.match(re);
  // eslint-disable-next-line no-eval
  return m ? eval(m[1]) : [];
}

// Saca los enlaces internos del pie de página tal como están escritos en el
// código. Antes esta auditoría traía una lista a mano que resultó ser de
// direcciones inventadas (/contacto, /terminos, /devoluciones): contestaban 200
// y por eso la auditoría daba 37/37... mientras 14 de los 23 enlaces reales del
// pie contestaban 404 a Google. Leyéndolos del Footer eso ya no puede pasar.
function enlacesDelPie() {
  const src = fs.readFileSync(path.join(RAIZ, 'src/components/layout/Footer.js'), 'utf8');
  const rutas = [...src.matchAll(/<Link to="([^"]+)"/g)].map((m) => m[1].split('?')[0]);
  return [...new Set(rutas)];
}

// ------------------------------------------------- barra superior siempre visible
// REGLA DE ORO de Christian: el top bar NUNCA se despega. Es `sticky top-0`, y lo
// unico que lo mata es poner `overflow` en el BODY: al ponerlo, el body se vuelve
// contenedor de scroll, el sticky se pega a EL en vez de al html — y como el body
// no scrollea, la barra se va hacia arriba y desaparece. Paso el 2026-07-26 con
// `html, body { overflow-x: hidden }`. Se revisa aqui porque en la portada arriba
// del todo la barra SIEMPRE se ve bien: el bug solo aparece al bajar.
function barraSuperior() {
  const header = fs.readFileSync(path.join(RAIZ, 'src/components/layout/Header.js'), 'utf8');
  revisar(/className="sticky top-0/.test(header), 'barra superior pegada (sticky top-0)');

  // Sin comentarios: si no, el propio comentario que explica el bug se cuenta como bug.
  const css = fs.readFileSync(path.join(RAIZ, 'src/index.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  // Bloques cuyo selector menciona al body, con overflow que crea scroll container.
  const culpables = [...css.matchAll(/([^{}]*)\{([^{}]*)\}/g)]
    .map(([, sel, cuerpo]) => [sel.trim().split(/[\n}]/).pop().trim(), cuerpo])
    .filter(([sel, cuerpo]) => /(^|[\s,>+~])body\b/.test(` ${sel}`)
      && /overflow(-x|-y)?\s*:\s*[^;]*\b(hidden|auto|scroll)\b/.test(cuerpo))
    .map(([sel]) => sel);
  revisar(culpables.length === 0, 'body sin overflow que rompa el sticky', culpables.join(' | '));

  // La misma regla, pero contra Radix. react-remove-scroll INYECTA en el <head>
  // un <style> con `body[data-scroll-locked]{overflow:hidden!important}` al abrir
  // un Select o un Dialog. Nuestro contra-veneno tiene que ganarle, y con el
  // mismo selector NO le gana: mismo peso, y el suyo se inyecta despues. Por eso
  // lleva `html` delante. Si alguien lo quita, el bug vuelve en silencio — que es
  // exactamente lo que paso entre el 26 y el 27 de julio de 2026.
  revisar(/html\s+body\[data-scroll-locked\]/.test(css),
    'el candado de Radix se neutraliza con especificidad (html body[data-scroll-locked])');
}

// ---------------------------------------------------------------- páginas
async function paginas() {
  // Con diagonal final: GitHub Pages redirige /catalogo -> /catalogo/ (301, normal).
  const rutas = ['/', '/checkout/', '/login/', '/registro/', '/producto/nad-plus/',
                 '/producto/bpc-157/', '/sitemap.xml', '/robots.txt',
                 ...enlacesDelPie().map((r) => (r.endsWith('/') ? r : `${r}/`))];
  for (const r of [...new Set(rutas)]) {
    const res = await fetch(SITE + r);
    revisar(res.status === 200, `página ${r}`, String(res.status));
  }
  // Un 200 no basta: la aplicación puede pintar su propio "404" con código 200.
  // Eso es lo que pasaba en /terminos y /contacto. Aquí se cazan esos casos.
  for (const r of [...new Set(rutas)].filter((x) => !x.endsWith('.xml') && !x.endsWith('.txt'))) {
    const html = await (await fetch(SITE + r)).text();
    const titulo = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    // La portada y las páginas sin prerender comparten el título genérico.
    revisar(r === '/' || !/^Exygen Labs Mexico$/.test(titulo), `sin prerender ${r}`, titulo);
  }
  // Cada página con SU título: si todas comparten uno, Google no las distingue.
  const titulos = new Set();
  for (const r of ['/catalogo/', '/aprende/', '/producto/nad-plus/', '/producto/bpc-157/']) {
    const html = await (await fetch(SITE + r)).text();
    titulos.add((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  }
  revisar(titulos.size === 4, 'cada página con su propio título', [...titulos].join(' / '));
}

// ------------------------------------------------------------- categorías
function categorias() {
  const cats = leerDelCatalogo('fallbackCategories');
  const prods = leerDelCatalogo('fallbackProducts');
  const src = fs.readFileSync(path.join(RAIZ, 'src/data/fallbackCatalog.js'), 'utf8');
  // eslint-disable-next-line no-eval
  const ocultas = eval((src.match(/export const HIDDEN_CATEGORIES = (\[[^\]]*\]);/) || [0, '[]'])[1]);

  const cuenta = {};
  for (const p of prods) {
    for (const c of (p.categories || [p.category])) if (c) cuenta[c] = (cuenta[c] || 0) + 1;
  }
  const visibles = cats.filter((c) => (cuenta[c.slug] || 0) > 0 && !ocultas.includes(c.slug));

  const vacias = visibles.filter((c) => !cuenta[c.slug]);
  revisar(vacias.length === 0, 'ninguna categoría abre vacía', vacias.map((c) => c.slug).join(','));

  const sinCasa = prods.filter((p) => !(p.categories || [p.category])
    .some((c) => visibles.some((v) => v.slug === c)));
  revisar(sinCasa.length === 0, 'todo producto cae en alguna categoría visible',
          sinCasa.map((p) => p.name).join(', '));

  // Enlaces sembrados a mano que apunten a una categoría que ya no existe.
  const rotos = [];
  for (const f of ['src/components/layout/Footer.js', 'src/components/layout/Header.js', 'src/pages/Home.js']) {
    const txt = fs.readFileSync(path.join(RAIZ, f), 'utf8');
    for (const m of txt.matchAll(/catalogo\?category=([a-z0-9-]+)/g)) {
      if (!cuenta[m[1]]) rotos.push(`${f}: ${m[1]}`);
    }
  }
  revisar(rotos.length === 0, 'enlaces de categoría apuntan a algo real', rotos.join(' | '));
  return { cuenta, prods };
}

// ----------------------------------------------------------------- idioma
function idioma() {
  // Texto en español escrito a mano dentro del footer: no cambia al elegir otro
  // idioma. Ya pasó una vez con "Empieza aquí", "Todas las guías", etc.
  const ftr = fs.readFileSync(path.join(RAIZ, 'src/components/layout/Footer.js'), 'utf8');
  const fijos = [...ftr.matchAll(/>([A-ZÁÉÍÓÚÑ][a-záéíóúñ][^<>{}]{4,})</g)].map((m) => m[1].trim());
  revisar(fijos.length === 0, 'footer sin texto en español fijo', fijos.join(' | '));

  // El menú de 3 líneas debe traer los mismos accesos que la barra de escritorio.
  const hdr = fs.readFileSync(path.join(RAIZ, 'src/components/layout/Header.js'), 'utf8');
  const ini = hdr.indexOf('grid-cols-3 gap-2');
  const bloque = ini < 0 ? '' : hdr.slice(ini, hdr.indexOf('].map((it)', ini));
  const esperados = ['nav.catalog', 'nav.advisor', 'nav.tools', 'nav.help', 'nav.cart', 'header.account'];
  const faltan = esperados.filter((k) => !bloque.includes(k));
  revisar(faltan.length === 0 && !bloque.includes('nav.home'), 'accesos del menú móvil',
          faltan.length ? 'faltan ' + faltan.join(',') : (bloque.includes('nav.home') ? 'sigue el enlace de Inicio' : '6 accesos, sin Inicio'));
}

// ------------------------------------------------------------ traducciones
function traducciones() {
  const tr = leer('src/i18n/translations.js');
  const bloque = (n) => {
    const i = tr.indexOf(`const ${n} = {`);
    return tr.slice(i, tr.indexOf('\n};', i));
  };
  const claves = (txt) => [...txt.matchAll(/^\s*'([^']+)':/gm)].map((m) => m[1]);

  const es = bloque('esMX'), en = bloque('enUS'), pt = bloque('ptBR');
  const kEs = new Set(claves(es));

  for (const [nombre, txt] of [['inglés', en], ['portugués', pt]]) {
    const faltan = [...kEs].filter((k) => !claves(txt).includes(k));
    revisar(faltan.length === 0, `traducción al ${nombre} completa`,
            faltan.length ? `${faltan.length} sin traducir: ${faltan.slice(0, 5).join(', ')}` : '');
  }

  // Clave repetida DENTRO de un idioma: JavaScript se queda con la ultima y el
  // texto sale en otro idioma sin que nadie se de cuenta. Ya paso con las
  // instrucciones de pago SPEI: los mexicanos las leian en portugues.
  for (const [nombre, txt] of [['español', es], ['inglés', en], ['portugués', pt]]) {
    const ks = claves(txt);
    const rep = [...new Set(ks.filter((k, i) => ks.indexOf(k) !== i))];
    revisar(rep.length === 0, `sin claves repetidas en ${nombre}`, rep.slice(0, 6).join(', '));
  }

  // Un texto que se pide y no existe sale como 'nav.loQueSea' en pantalla.
  const usadas = new Set();
  for (const f of ['src/pages', 'src/components']) {
    const walk = (d) => {
      for (const x of fs.readdirSync(path.join(RAIZ, d))) {
        const rel = `${d}/${x}`;
        if (fs.statSync(path.join(RAIZ, rel)).isDirectory()) walk(rel);
        else if (/\.jsx?$/.test(x)) {
          for (const m of leer(rel).matchAll(/\bt\('([^']+)'/g)) usadas.add(m[1]);
        }
      }
    };
    walk(f);
  }
  const inventadas = [...usadas].filter((k) => !kEs.has(k));
  revisar(inventadas.length === 0, 'ningún texto sale como clave cruda', inventadas.slice(0, 8).join(', '));
}

// -------------------------------------------------- catálogo: sitio vs API
async function catalogo({ prods }) {
  const d = await j(await fetch(`${API}/products?limit=500`));
  const vivos = d.products || d;
  revisar(vivos.length >= 190, 'catálogo del API', `${vivos.length} productos`);
  revisar(vivos.every((p) => p.price > 0), 'todos con precio',
          vivos.filter((p) => !(p.price > 0)).map((p) => p.sku).join(','));
  revisar(vivos.every((p) => p.sku), 'todos con SKU');

  const porSku = {};
  for (const p of vivos) if (p.sku) porSku[p.sku] = p;

  // Lo más importante de todo: el sitio le enseña un precio al cliente y el
  // backend le cobra otro si estos dos se separan.
  const difPrecio = [];
  const difTope = [];
  const huerfanos = [];
  for (const p of prods) {
    for (const v of (p.variants || [])) {
      const b = porSku[v.sku];
      if (!b) { huerfanos.push(v.sku); continue; }
      if (Math.round(v.price) !== Math.round(b.price)) {
        difPrecio.push(`${v.sku}: sitio $${v.price} vs API $${b.price}`);
      }
      const cf = v.commission_cap == null ? 0.5 : v.commission_cap;
      const cb = b.commission_cap == null ? 0.5 : b.commission_cap;
      if (Math.abs(cf - cb) > 0.001) difTope.push(`${v.sku}: ${cf} vs ${cb}`);
    }
  }
  revisar(difPrecio.length === 0, 'precios del sitio = backend', difPrecio.slice(0, 5).join(' | '));
  revisar(difTope.length === 0, 'topes del sitio = backend', difTope.slice(0, 5).join(' | '));
  revisar(huerfanos.length === 0, 'SKUs del sitio existen en el backend', huerfanos.slice(0, 5).join(','));
  return porSku;
}

// ------------------------------------------------------------------ Admin
async function admin(porSku) {
  const email = process.env.EXYGEN_ADMIN_EMAIL;
  const password = process.env.EXYGEN_ADMIN_PASSWORD;

  // Cerrado sin llave: esto se revisa SIEMPRE, con o sin credenciales.
  for (const ep of ['/admin/orders', '/admin/customers', '/admin/intentos']) {
    const r = await fetch(API + ep);
    revisar(r.status === 401 || r.status === 403, `bloqueado sin token ${ep}`, String(r.status));
  }
  if (!email || !password) {
    console.log('\n(sin EXYGEN_ADMIN_EMAIL / EXYGEN_ADMIN_PASSWORD: me salto el Admin y las compras)');
    return;
  }

  const tok = (await j(await fetch(`${API}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }))).token;
  revisar(!!tok, 'login admin');
  if (!tok) return;
  const h = { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' };

  for (const ep of ['/admin/orders', '/admin/customers', '/admin/distributors', '/admin/funnel',
                    '/admin/meta/dashboard', '/admin/intentos', '/admin/stats']) {
    const r = await fetch(API + ep, { headers: h });
    revisar(r.status === 200, `admin ${ep}`, String(r.status));
  }

  if (!CON_COMPRAS) {
    console.log('(sin --compras: me salto las compras reales)');
    return;
  }
  await reglasDeDinero(porSku, h);
}

// -------------------------------------- reglas de dinero, con compras reales
async function reglasDeDinero(porSku, h) {
  const item = (sku, cantidad = 1) => {
    const p = porSku[sku];
    return { product_id: p.id, name: p.name, price: p.price, quantity: cantidad,
             presentation: p.presentation, image_url: '' };
  };
  const comprar = async (items, codigo) => j(await fetch(`${API}/orders`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items,
      // OJO: example.com es un dominio reservado y NO ENTREGABLE, a propósito.
      // Con 'auditoria@exygenlabs.com' cada corrida le mandaba a Christian un
      // "compra confirmada" y un "pago confirmado" a su buzón real — y esta
      // suite se corre antes de CADA push (2026-07-27). No lo cambies a un
      // correo que alguien lea.
      customer: { full_name: 'Auditoría E2E', email: 'e2e-no-responder@example.com',
                  phone: '+52 5512345678', address: 'x', city: 'Mérida', state: 'Yucatán',
                  postal_code: '97000', country: 'MX', notes: 'AUDITORÍA — se borra sola' },
      payment_method: 'spei', shipping: 0, distributor_code: codigo || null,
    }),
  }));
  const aBorrar = [];

  // Los insumos nunca llevan descuento.
  const agua = await comprar([item('AGUABACTERIOST-10ML')]);
  aBorrar.push(agua);
  revisar(agua.discount === 0, 'el agua no lleva descuento', `$${agua.discount}`);

  // El descuento se recorta al tope de cada producto (primero el ROI).
  const conTope = await comprar([item('AHKCU-50MG')]);
  aBorrar.push(conTope);
  revisar(conTope.discount === Math.round(porSku['AHKCU-50MG'].price * 0.10),
          'descuento automático correcto', `$${conTope.discount}`);
  revisar(Math.round(conTope.total) === Math.round(conTope.subtotal - conTope.discount),
          'total = subtotal − descuento', `${conTope.subtotal} − ${conTope.discount} = ${conTope.total}`);

  // Un código que no existe no puede dar descuento de distribuidor.
  const falso = await comprar([item('NAD-1000MG')], 'NOEXISTE-99-XXXX');
  aBorrar.push(falso);
  revisar(falso.discount_rate <= 0.10, 'código inválido cae al automático', String(falso.discount_rate));

  // No se vende lo que no hay.
  const exceso = await comprar([item('NAD-1000MG', 99999)]);
  if (exceso.order_number) {
    aBorrar.push(exceso);
    mal('bloquea compra sobre el stock', 'DEJÓ comprar 99,999');
  } else {
    ok('bloquea compra sobre el stock', String(exceso.detail || '').slice(0, 70));
  }

  // Limpieza: la auditoría no deja basura en los números de Christian.
  for (const o of aBorrar) {
    if (o && o.id) await fetch(`${API}/admin/orders/${o.id}`, { method: 'DELETE', headers: h });
  }
  const d = await j(await fetch(`${API}/admin/intentos`, { headers: h }));
  for (const it of (d.intentos || []).filter((i) => /auditoria@exygenlabs/.test(i.email || ''))) {
    await fetch(`${API}/admin/intentos/${it.id}`, { method: 'DELETE', headers: h });
  }
  const quedan = (await j(await fetch(`${API}/admin/orders`, { headers: h })));
  const lista = quedan.orders || quedan;
  revisar(!lista.some((o) => /Auditoría E2E/.test((o.customer || {}).full_name || '')),
          'la auditoría no dejó pedidos de prueba');
}

// ------------------------------------------------------------------ correr
async function main() {
  console.log(`Auditoría de ${SITE}${CON_COMPRAS ? '  (con compras reales)' : '  (solo lectura)'}\n`);
  barraSuperior();
  await paginas();
  const cat = categorias();
  idioma();
  traducciones();
  const porSku = await catalogo(cat);
  await admin(porSku);

  console.log(resultados.map((r) => `${r.bien ? 'OK   ' : 'FALLA'}  ${r.nombre}${r.detalle ? '  — ' + r.detalle : ''}`).join('\n'));
  const fallas = resultados.filter((r) => !r.bien);
  console.log(`\n=== ${resultados.length - fallas.length} bien, ${fallas.length} ${fallas.length === 1 ? 'FALLA' : 'FALLAS'} ===`);
  if (fallas.length) process.exit(1);
}

main().catch((e) => { console.error('La auditoría se cayó:', e.message); process.exit(1); });
