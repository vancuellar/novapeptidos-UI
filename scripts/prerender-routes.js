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
  ['login', 'Iniciar sesión', 'Entra a tu cuenta de Exygen Labs.'],
  ['registro', 'Crear cuenta', 'Crea tu cuenta para comprar y seguir tus pedidos.'],
  // Las de abajo se generan para que no den 404 si alguien recarga la página,
  // pero NO entran al mapa del sitio (ver NO_INDEXAR).
  ['carrito', 'Tu carrito', 'Revisa tu pedido antes de finalizar la compra.'],
  ['checkout', 'Finalizar compra', 'Completa tu pedido de forma segura.'],
  ['cuenta', 'Mi cuenta', 'Tus pedidos, certificados y herramientas de cliente.'],
  ['recuperar', 'Recuperar contraseña', 'Te mandamos un enlace para restablecer tu contraseña.'],
  ['restablecer', 'Restablecer contraseña', 'Elige una contraseña nueva.'],
  ['confirmar', 'Confirmar correo', 'Confirma tu dirección de correo.'],
  ['activar', 'Activar cuenta', 'Activa tu cuenta de Exygen Labs.'],
];

// Lo que no debe salir en buscadores: carrito, pago y todo lo de la cuenta.
// Esta misma lista alimenta el `Disallow` de robots.txt, así que el mapa del
// sitio y robots.txt nunca se pueden contradecir.
const NO_INDEXAR = ['carrito', 'checkout', 'cuenta', 'recuperar', 'restablecer', 'confirmar', 'activar', 'admin'];

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

const escapar = (s) => String(s || '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function escribir(ruta, html) {
  const dir = path.join(BUILD, ruta);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function conMeta(base, titulo, descripcion, url) {
  return base
    .replace(/<title>[^<]*<\/title>/, `<title>${escapar(titulo)} | Exygen Labs</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/,
             `<meta name="description" content="${escapar(descripcion)}"/>`)
    .replace('</head>', `<link rel="canonical" href="${url}"/></head>`);
}

function main() {
  const indexPath = path.join(BUILD, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('No hay build/index.html — corre la compilación primero.');
    process.exit(1);
  }
  const base = fs.readFileSync(indexPath, 'utf8');

  // Una pagina por PRODUCTO (no por presentacion): la ficha ya trae el selector
  // de tamanos, y 195 URLs casi identicas se pelearian entre si en Google.
  const productos = leerCatalogo().filter((p) => p.slug).map((p) => {
    const tamanos = (p.variants || []).map((v) => v.presentation).filter(Boolean);
    return [
      `producto/${p.slug}`,
      tamanos.length > 1 ? `${p.name} (${tamanos.join(', ')})` : p.name,
      p.short_description || `${p.name} — péptido de investigación (RUO) con pureza HPLC y certificado por lote.`,
    ];
  });

  const todasLasRutas = [
    ...STATIC_ROUTES,
    ...leerPaginas('learn', 'aprende'),   // las 13 guías de /aprende
    ...leerPaginas('info', 'info'),       // envíos, devoluciones, calidad, contacto, soporte, rastreo, términos, privacidad
    ...productos,
  ];

  verificarRutas(todasLasRutas.map(([r]) => r));

  for (const [ruta, titulo, desc] of todasLasRutas) {
    escribir(ruta, conMeta(base, titulo, desc, `${SITE}/${ruta}`));
  }

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
