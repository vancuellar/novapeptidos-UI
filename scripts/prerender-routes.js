#!/usr/bin/env node
/**
 * Escribe un index.html real por cada ruta del sitio, para que GitHub Pages
 * las sirva con 200 en vez de 404.
 *
 * EL PROBLEMA: GitHub Pages solo tiene index.html en la raíz. Cualquier otra ruta
 * cae en 404.html — que sí trae la aplicación, así que el visitante ve la página
 * bien... pero el servidor responde **404**. Google toma ese 404 al pie de la letra
 * y NO indexa el catálogo, ni las fichas de producto, ni /aprende. Es decir: todo
 * el contenido del sitio es invisible en las búsquedas (auditoría del 2026-07-25).
 *
 * LA SOLUCIÓN: copiar index.html a build/<ruta>/index.html para cada ruta conocida.
 * Pages sirve esos archivos con 200 y Google ya los puede indexar. La aplicación
 * es la misma; solo cambia el código de respuesta.
 *
 * De paso se le pone a cada página su propio <title> y <meta description>, porque
 * un catálogo entero con el mismo título tampoco posiciona.
 */
const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '..', 'build');
const SITE = 'https://exygenlabs.com';

// Rutas fijas del sitio, con el título y la descripción que verá Google.
//
// OJO (auditoría 2026-07-26): esta lista tenía siete direcciones que NO existen
// en App.js (`contacto`, `terminos`, `privacidad`, `envios`, `devoluciones`,
// `compendio`, `distribuidores`). Se generaba una página con 200 y buen título
// para cada una... y al abrirla la aplicación mostraba "404, esta página se nos
// evaporó". Mientras tanto, las direcciones REALES del pie de página
// (`/info/*`, `/compuestos`, `/asesor`, `/educacion`, cada guía de `/aprende`)
// no se generaban y contestaban 404 de verdad. Por eso ahora:
//   1. las rutas de `/aprende` y `/info` se leen de `src/data/`, no se escriben a mano;
//   2. `verificarRutas()` compara todo contra App.js y REVIENTA la compilación
//      si alguien vuelve a inventar una dirección.
const STATIC_ROUTES = [
  ['catalogo', 'Catálogo de péptidos de investigación', 'Más de 190 péptidos de investigación (RUO) con pureza HPLC y certificado de análisis por lote.'],
  ['aprende', 'Aprende sobre péptidos', 'Guías, protocolos y preguntas frecuentes sobre péptidos de investigación.'],
  ['compuestos', 'Fichas de compuestos', 'Referencia técnica de cada péptido del catálogo: qué es, qué se estudia y cómo se maneja.'],
  ['tutoriales', 'Tutoriales en video', 'Videos guiados para usar la plataforma y entender los protocolos.'],
  ['calculadora', 'Calculadora de reconstitución', 'Calcula la dosis y el volumen exacto para reconstituir tu vial.'],
  ['asesor', 'Asesor de péptidos', 'Responde unas preguntas y te armamos un plan de investigación con los compuestos que encajan.'],
  ['educacion', 'Centro educativo', 'Material de formación sobre péptidos de investigación, manejo de material y control de calidad.'],
  ['distribuidor', 'Programa de distribuidores', 'Gana comisiones revendiendo péptidos de investigación.'],
  ['comparativa', '¿Por qué Exygen Labs?', 'Qué damos nosotros y qué dan los demás vendedores de péptidos de investigación, renglón por renglón.'],
  ['login', 'Iniciar sesión', 'Entra a tu cuenta de Exygen Labs.'],
  ['registro', 'Crear cuenta', 'Crea tu cuenta para comprar y seguir tus pedidos.'],
  // Las de abajo se generan para que no den 404 si alguien recarga la página,
  // pero NO entran al mapa del sitio (ver NO_INDEXAR).
  ['carrito', 'Tu carrito', 'Revisa tu pedido antes de finalizar la compra.'],
  ['checkout', 'Finalizar compra', 'Completa tu pedido de forma segura.'],
  // Página ESCONDIDA del video de invitación a distribuidores: se genera para
  // que el enlace que reparte Christián por WhatsApp/correo no dé 404, pero NO
  // sale en el mapa del sitio ni en Google (está en NO_INDEXAR).
  ['invitacion', 'Conviértete en distribuidor', 'Una invitación de Exygen Labs.'],
  ['cuenta', 'Mi cuenta', 'Tus pedidos, certificados y herramientas de cliente.'],
  ['recuperar', 'Recuperar contraseña', 'Te mandamos un enlace para restablecer tu contraseña.'],
  ['restablecer', 'Restablecer contraseña', 'Elige una contraseña nueva.'],
  ['confirmar', 'Confirmar correo', 'Confirma tu dirección de correo.'],
  ['activar', 'Activar cuenta', 'Activa tu cuenta de Exygen Labs.'],
];

// Lo que no debe salir en buscadores: carrito, pago y todo lo de la cuenta.
// Esta misma lista alimenta el `Disallow` de robots.txt, así que el mapa del
// sitio y robots.txt nunca se pueden contradecir.
const NO_INDEXAR = ['carrito', 'checkout', 'cuenta', 'recuperar', 'restablecer', 'confirmar', 'activar', 'admin', 'invitacion'];

// Lee slug / título / subtítulo de cada archivo de `src/data/<carpeta>/`.
// Se hace con expresiones regulares en vez de `import` porque estos archivos
// usan el alias `@/` de la aplicación, que Node no sabe resolver.
function leerPaginas(carpeta, prefijoUrl) {
  const dir = path.join(__dirname, '..', 'src', 'data', carpeta);
  if (!fs.existsSync(dir)) return [];
  const campo = (src, nombre) => {
    const m = src.match(new RegExp(`${nombre}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`));
    return m ? m[1].replace(/\\'/g, "'") : '';
  };
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => {
      const src = fs.readFileSync(path.join(dir, f), 'utf8');
      const slug = campo(src, 'slug') || f.replace(/\.js$/, '');
      const titulo = campo(src, 'title') || slug;
      const desc = (campo(src, 'subtitle') || titulo).slice(0, 160);
      return [`${prefijoUrl}/${slug}`, titulo, desc];
    })
    .sort((a, b) => a[0].localeCompare(b[0]));
}

// Red de seguridad: ninguna ruta generada puede faltar en App.js.
function verificarRutas(rutas) {
  const app = fs.readFileSync(path.join(__dirname, '..', 'src', 'App.js'), 'utf8');
  const declaradas = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
  const exactas = new Set(declaradas.filter((r) => !r.includes(':') && r !== '*').map((r) => r.replace(/^\//, '')));
  const conParametro = declaradas.filter((r) => r.includes(':')).map((r) => r.replace(/^\//, '').split('/:')[0]);
  const huerfanas = rutas.filter((r) => !exactas.has(r) && !conParametro.some((p) => r.startsWith(`${p}/`)));
  if (huerfanas.length) {
    console.error('Prerender ABORTADO: estas direcciones no existen en App.js y darían un 404 con cara de página buena:');
    huerfanas.forEach((r) => console.error(`  /${r}`));
    process.exit(1);
  }
}

function leerCatalogo() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fallbackCatalog.js'), 'utf8');
  const m = src.match(/export const fallbackProducts = (\[[\s\S]*?\n\]);/);
  if (!m) return [];
  // eslint-disable-next-line no-eval
  return eval(m[1]);
}

// El orden de "relevancia" del catálogo, copiado de `pages/Catalog.js`.
// Tiene que ser el MISMO: si el HTML previo lista los productos en otro orden
// que React, al montar la página todo se recoloca y se ve como un salto.
const FLAGSHIP_ORDER = ['retatrutida', 'nad-plus', 'klow-bpc-ghk-cu-tb-500-kpv', 'ghk-cu'];

// LA PRESENTACIÓN CON LA QUE ABRE LA FICHA. Copiado de `pages/ProductDetail.js`:
// no abre en la primera del vial, abre en la de MEJOR PRECIO POR MG (Fable 5,
// 2026-07-27). Con un solo tamaño no hay nada que elegir.
//
// Esto costó caro descubrirlo: el HTML previo decía "$1,189" (la de 5 mg de
// Retatrutida) y un segundo después React pintaba "$7,679" (la de 100 mg, que es
// la de mejor valor). Dos precios distintos en la misma pantalla es lo peor que
// puede pasar en este proyecto, así que aquí se calcula igual que allá.
//
// La ficha además prefiere las presentaciones que están EN MANO, y eso sale de
// una llamada al inventario que aquí no existe. No importa: sin inventario la
// ficha pinta primero esta misma, que es lo que tiene que coincidir.
function variantePorOmision(p) {
  const vs = p.variants || [];
  if (vs.length < 2) return vs[0] || { presentation: p.presentation, price: p.price };
  const porMg = (v) => {
    const mg = parseFloat(v.presentation);
    return mg > 0 ? v.price / mg : Infinity;
  };
  return vs.reduce((a, b) => (porMg(b) < porMg(a) ? b : a));
}

// Destacados de la portada, leídos de `src/data/featured.js` para no tener dos
// listas que se puedan desincronizar.
function leerDestacados() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'featured.js'), 'utf8');
  const m = src.match(/export const FEATURED_SLUGS = \[([\s\S]*?)\];/);
  if (!m) return [];
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
}

const escapar = (s) => String(s || '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// EXACTAMENTE el mismo formato que `formatMXN` de `src/lib/api.js`. Si aquí
// saliera "$1,279.00" y React pintara "$1,279", se vería parpadear el precio.
const pesos = (v) => new Intl.NumberFormat('es-MX', {
  style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0,
}).format(v || 0);

// --------------------------------------------------------------------------
//  Pintado previo: el CONTENIDO de verdad dentro del HTML (2026-07-28)
// --------------------------------------------------------------------------
// Ésta es la razón por la que Certified enseña algo en 2 segundos pesando 26 MB
// y nosotros tardábamos entre 3 y 13: a ellos WooCommerce les manda el HTML ya
// escrito; a nosotros nos llegaba un <div> vacío y había que descargar y
// ejecutar 2.35 MB de JavaScript antes de ver una sola letra.
//
// Somos un sitio estático en GitHub Pages, así que nuestro equivalente de
// "armado en el servidor" es ARMADO AL COMPILAR: aquí. Cada una de las 135
// rutas se queda con su nombre, su precio y su texto ya escritos en el HTML.
//
// ⚠️ Los precios salen de `fallbackCatalog.js` — la MISMA fuente que lee la
// ficha (`variants[0].price`, que es la presentación que abre seleccionada).
// No inventes aquí un precio ni lo saques de otro lado: un precio del HTML que
// no cuadre con el que pinta React es lo más grave que puede pasar en este
// proyecto.
//
// El bloque se esconde solo (regla CSS de public/index.html) en cuanto React
// pinta algo dentro de #root.
function cuerpoPrevio(titulo, descripcion, extra = '') {
  return '<div class="pp-cuerpo">'
    + `<h1 class="pp-titulo">${escapar(titulo)}</h1>`
    + extra
    + (descripcion ? `<p class="pp-desc">${escapar(descripcion)}</p>` : '')
    + '</div>';
}

// Rejilla de productos con nombre y precio, para la portada y el catálogo.
function listaPrevia(productos, tope) {
  const filas = productos.slice(0, tope).map((p) => {
    const v = (p.variants || [])[0] || {};
    const precio = v.price != null ? v.price : p.price;
    return '<li class="pp-item">'
      + `<span class="pp-nombre">${escapar(p.name)}</span>`
      + `<span class="pp-tam">${escapar(v.presentation || p.presentation || '')}</span>`
      + `<span class="pp-mini-precio">${pesos(precio)}</span>`
      + '</li>';
  }).join('');
  return `<ul class="pp-lista">${filas}</ul>`;
}

function escribir(ruta, html) {
  const dir = path.join(BUILD, ruta);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// Sustituye el cuerpo genérico del pintado previo (el de public/index.html) por
// el de esta ruta. Si el hueco no está, es que alguien lo borró del HTML: se
// aborta en vez de publicar 135 páginas vacías sin que nadie se entere.
const HUECO_PREVIO = /<div class="pp-cuerpo">[\s\S]*?<\/div>/;

function conMeta(base, titulo, descripcion, url, previo) {
  let html = base
    .replace(/<title>[^<]*<\/title>/, `<title>${escapar(titulo)} | Exygen Labs</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/,
             `<meta name="description" content="${escapar(descripcion)}"/>`)
    .replace('</head>', `<link rel="canonical" href="${url}"/></head>`);
  if (previo) html = html.replace(HUECO_PREVIO, previo);
  return html;
}

function main() {
  const indexPath = path.join(BUILD, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('No hay build/index.html — corre la compilación primero.');
    process.exit(1);
  }
  const base = fs.readFileSync(indexPath, 'utf8');
  if (!HUECO_PREVIO.test(base)) {
    console.error('Prerender ABORTADO: no encuentro el bloque .pp-cuerpo del pintado previo en build/index.html.');
    console.error('Sin él las 135 páginas saldrían con el HTML vacío y volveríamos a los 3-13 segundos en blanco.');
    console.error('Revisa que public/index.html siga teniendo <div id="pintado-previo"> con su <div class="pp-cuerpo">.');
    process.exit(1);
  }

  const catalogo = leerCatalogo().filter((p) => p.slug);

  // Una pagina por PRODUCTO (no por presentacion): la ficha ya trae el selector
  // de tamanos, y 195 URLs casi identicas se pelearian entre si en Google.
  //
  // Cuarto elemento = el HTML que se ve ANTES de que cargue nada. Ojo: el <h1>
  // lleva `p.name` a secas, igual que la ficha; el título con las presentaciones
  // entre paréntesis es sólo para Google. El precio y el tamaño salen de
  // `variantePorOmision`, que es la que la ficha abre seleccionada.
  const productos = catalogo.map((p) => {
    const tamanos = (p.variants || []).map((v) => v.presentation).filter(Boolean);
    const primera = variantePorOmision(p) || {};
    const precio = primera.price != null ? primera.price : p.price;
    const desc = p.short_description || `${p.name} — péptido de investigación (RUO) con pureza HPLC y certificado por lote.`;
    return [
      `producto/${p.slug}`,
      tamanos.length > 1 ? `${p.name} (${tamanos.join(', ')})` : p.name,
      desc,
      cuerpoPrevio(p.name, p.description || desc,
        `<p class="pp-precio">${pesos(precio)}</p>`
        + `<p class="pp-tam">${escapar(primera.presentation || p.presentation || '')}`
        + `${p.purity ? ` · ${escapar(p.purity)}` : ''}</p>`),
    ];
  });

  // El catálogo abre con el orden de "relevancia" (estrellas primero) y sin
  // ningún filtro puesto: se reproduce aquí para que el HTML previo liste lo
  // mismo y en el mismo orden que la página al montar.
  const rank = (p) => {
    const i = FLAGSHIP_ORDER.indexOf(p.slug);
    return i === -1 ? FLAGSHIP_ORDER.length : i;
  };
  const enOrden = [...catalogo].sort((a, b) => rank(a) - rank(b));

  const estaticas = STATIC_ROUTES.map(([ruta, titulo, desc]) => [
    ruta, titulo, desc,
    ruta === 'catalogo'
      ? cuerpoPrevio(titulo, desc, listaPrevia(enOrden, 24))
      : cuerpoPrevio(titulo, desc),
  ]);

  const todasLasRutas = [
    ...estaticas,
    // Las guías y las políticas ya traen título y bajada de verdad en `src/data/`.
    ...leerPaginas('learn', 'aprende').map(([r, t, d]) => [r, t, d, cuerpoPrevio(t, d)]),
    ...leerPaginas('info', 'info').map(([r, t, d]) => [r, t, d, cuerpoPrevio(t, d)]),
    ...productos,
  ];

  verificarRutas(todasLasRutas.map(([r]) => r));

  for (const [ruta, titulo, desc, previo] of todasLasRutas) {
    escribir(ruta, conMeta(base, titulo, desc, `${SITE}/${ruta}`, previo));
  }

  // La portada también: nombre y precio de los destacados, ya escritos en el HTML.
  const porSlug = Object.fromEntries(catalogo.map((p) => [p.slug, p]));
  const destacados = leerDestacados().map((s) => porSlug[s]).filter(Boolean);
  fs.writeFileSync(indexPath, base.replace(HUECO_PREVIO, cuerpoPrevio(
    'Exygen Labs',
    'Péptidos de investigación (RUO) con pureza HPLC y certificado de análisis por lote. Envíos a todo México.',
    listaPrevia(destacados, 6),
  )));

  // Mapa del sitio, para que Google encuentre todo sin adivinar. Fuera lo privado.
  const hoy = new Date().toISOString().slice(0, 10);
  const indexables = todasLasRutas.map(([r]) => r).filter((r) => !NO_INDEXAR.includes(r.split('/')[0]));
  const todas = [...new Set([SITE + '/', ...indexables.map((r) => `${SITE}/${r}`)])];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${todas.map((u) => `  <url><loc>${u}</loc><lastmod>${hoy}</lastmod></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(BUILD, 'robots.txt'),
    `User-agent: *\nAllow: /\n${NO_INDEXAR.map((r) => `Disallow: /${r}`).join('\n')}\n\nSitemap: ${SITE}/sitemap.xml\n`);

  console.log(`Prerender: ${todasLasRutas.length} rutas escritas + sitemap con ${todas.length} URLs.`);
}

main();
