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
const STATIC_ROUTES = [
  ['catalogo', 'Catálogo de péptidos de investigación', 'Más de 190 péptidos de investigación (RUO) con pureza HPLC y certificado de análisis por lote.'],
  ['carrito', 'Tu carrito', 'Revisa tu pedido antes de finalizar la compra.'],
  ['checkout', 'Finalizar compra', 'Completa tu pedido de forma segura.'],
  ['aprende', 'Aprende sobre péptidos', 'Guías, protocolos y preguntas frecuentes sobre péptidos de investigación.'],
  ['tutoriales', 'Tutoriales en video', 'Videos guiados para usar la plataforma y entender los protocolos.'],
  ['compendio', 'Compendio de péptidos', 'Referencia técnica de cada compuesto del catálogo.'],
  ['calculadora', 'Calculadora de reconstitución', 'Calcula la dosis y el volumen exacto para reconstituir tu vial.'],
  ['contacto', 'Contacto', 'Escríbenos para dudas sobre productos, pedidos o el programa de distribuidores.'],
  ['login', 'Iniciar sesión', 'Entra a tu cuenta de Exygen Labs.'],
  ['registro', 'Crear cuenta', 'Crea tu cuenta para comprar y seguir tus pedidos.'],
  ['distribuidores', 'Programa de distribuidores', 'Gana comisiones revendiendo péptidos de investigación.'],
  ['terminos', 'Términos del servicio', 'Términos y condiciones de uso de Exygen Labs.'],
  ['privacidad', 'Aviso de privacidad', 'Cómo tratamos tus datos personales.'],
  ['envios', 'Envíos y entregas', 'Tiempos, cobertura y costos de envío.'],
  ['devoluciones', 'Devoluciones', 'Política de devoluciones y reembolsos.'],
];

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
  let n = 0;

  for (const [ruta, titulo, desc] of STATIC_ROUTES) {
    escribir(ruta, conMeta(base, titulo, desc, `${SITE}/${ruta}`));
    n++;
  }

  const productos = leerCatalogo();
  const urls = [];
  for (const p of productos) {
    const variantes = p.variants && p.variants.length ? p.variants : [null];
    for (const v of variantes) {
      const slug = v && v.slug ? v.slug : p.slug;
      if (!slug) continue;
      const nombre = v ? `${p.name} ${v.presentation}` : p.name;
      const desc = p.short_description || `${p.name} — péptido de investigación (RUO) con pureza HPLC.`;
      const ruta = `producto/${slug}`;
      escribir(ruta, conMeta(base, nombre, desc, `${SITE}/${ruta}`));
      urls.push(`${SITE}/${ruta}`);
      n++;
    }
    if (p.slug && !urls.includes(`${SITE}/producto/${p.slug}`)) {
      escribir(`producto/${p.slug}`, conMeta(base, p.name,
        p.short_description || `${p.name} — péptido de investigación (RUO).`,
        `${SITE}/producto/${p.slug}`));
      urls.push(`${SITE}/producto/${p.slug}`);
      n++;
    }
  }

  // Mapa del sitio, para que Google encuentre todo sin adivinar.
  const hoy = new Date().toISOString().slice(0, 10);
  const todas = [SITE + '/', ...STATIC_ROUTES.map(([r]) => `${SITE}/${r}`), ...urls];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Set(todas)].map((u) => `  <url><loc>${u}</loc><lastmod>${hoy}</lastmod></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(BUILD, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /checkout\nDisallow: /cuenta\n\nSitemap: ${SITE}/sitemap.xml\n`);

  console.log(`Prerender: ${n} rutas escritas + sitemap con ${new Set(todas).size} URLs.`);
}

main();
