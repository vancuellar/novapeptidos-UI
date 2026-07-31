#!/usr/bin/env node
/**
 * Vuelve a bajar del backend los datos de dinero de `src/data/fallbackCatalog.js`.
 *
 * Por qué existe
 * --------------
 * `fallbackCatalog.js` se llama "de respaldo" y NO lo es: la ficha de producto, el
 * catálogo y la portada leen SIEMPRE de ahí (`getFallbackProductBySlug`,
 * `fallbackProducts`). Del API en vivo sólo viene el inventario (`/stock`). O sea
 * que este archivo es EL precio que ve el cliente, y si se separa del backend la
 * caja cobra otra cosa.
 *
 * Hasta hoy se editaba a mano y se desincronizaba en silencio. El 2026-07-31 se
 * encontraron dos presentaciones de 5-amino-1MQ (10 mg y 50 mg) con el UUID viejo:
 * el backend las recreó el 26 de julio, el sitio se quedó con el id anterior y
 * estuvo cinco días mandando al carrito un `product_id` que ya no existía. Los
 * precios sí estaban bien — pero nadie lo sabía, porque nadie lo comparaba.
 *
 * Cómo se usa
 * -----------
 *   node scripts/sincronizar-catalogo.js              # sólo mira y reporta (seguro)
 *   node scripts/sincronizar-catalogo.js --escribir   # además arregla el archivo
 *
 * Sin `--escribir` no toca nada. Sale con código 1 si encontró diferencias, para
 * poder colgarlo de una tarea diaria igual que la auditoría.
 *
 * Qué toca y qué NO
 * -----------------
 * TOCA sólo lo que manda el backend, casando por SKU: `price`, `id`,
 * `presentation` y `descuentable` de cada variante (y el `price` del producto
 * cuando venía siguiendo al de su primera variante).
 *
 * NO da de alta ni de baja productos. Un SKU nuevo en el backend necesita
 * descripción, categorías y escalera de dosis — eso lo escribe una persona. El
 * script los enumera y ahí se queda.
 */
const fs = require('fs');
const path = require('path');

const API = process.env.EXYGEN_API || 'https://api.exygenlabs.com/api';
const ARCHIVO = path.join(__dirname, '..', 'src/data/fallbackCatalog.js');
const ESCRIBIR = process.argv.includes('--escribir');

// El arreglo se lee y se vuelve a escribir con JSON.stringify(…, 2). Se comprobó
// que la ida y vuelta es IDÉNTICA byte a byte sobre el archivo de hoy: lo generó
// un script, no una persona, así que no hay comentarios ni comillas simples que
// perder. `verificarIdaYVuelta` lo vuelve a comprobar en cada corrida — si algún
// día alguien mete un comentario a mano dentro del arreglo, el script se planta en
// vez de aplanárselo.
const RE_ARREGLO = /export const fallbackProducts = (\[[\s\S]*?\n\]);/;

function leer() {
  const src = fs.readFileSync(ARCHIVO, 'utf8');
  const m = src.match(RE_ARREGLO);
  if (!m) { console.error('No encontré `export const fallbackProducts` en el archivo.'); process.exit(2); }
  // eslint-disable-next-line no-eval
  const prods = eval(m[1]);
  if (JSON.stringify(prods, null, 2) !== m[1]) {
    console.error('El arreglo tiene formato escrito a mano (comentarios, comillas simples…).');
    console.error('No lo reescribo para no aplanártelo. Arréglalo a mano o normaliza el formato.');
    process.exit(2);
  }
  return { src, prods };
}

async function main() {
  const { src, prods } = leer();

  const r = await fetch(`${API}/products?limit=500`);
  if (!r.ok) { console.error(`El API contestó ${r.status}. No sincronizo a ciegas.`); process.exit(2); }
  const d = await r.json();
  const vivos = d.products || d;
  if (!Array.isArray(vivos) || vivos.length < 190) {
    console.error(`El API devolvió ${vivos.length} productos: muy pocos. Me planto.`);
    process.exit(2);
  }
  const porSku = {};
  for (const p of vivos) if (p.sku) porSku[p.sku] = p;

  const cambios = [];
  const huerfanos = [];
  const enSitio = new Set();

  for (const p of prods) {
    const precioViejoDelProducto = p.price;
    const seguiaALaPrimera = (p.variants || []).length > 0 && p.price === p.variants[0].price;

    for (const v of (p.variants || [])) {
      enSitio.add(v.sku);
      const b = porSku[v.sku];
      if (!b) { huerfanos.push(`${p.slug} / ${v.sku}`); continue; }

      const campos = [
        ['price', v.price, Math.round(b.price * 100) / 100],
        ['id', v.id, b.id],
        ['presentation', v.presentation, b.presentation],
        ['descuentable', v.descuentable !== false, b.descuentable !== false],
      ];
      for (const [campo, actual, nuevo] of campos) {
        if (actual === nuevo) continue;
        cambios.push(`${v.sku}  ${campo}: ${JSON.stringify(actual)} → ${JSON.stringify(nuevo)}`);
        v[campo] = nuevo;
      }
    }

    // El precio "de portada" del producto es el de su presentación más chica. Sólo
    // se mueve si venía siguiéndola: si alguien lo puso a mano, se respeta.
    if (seguiaALaPrimera && p.price !== p.variants[0].price) {
      cambios.push(`${p.slug}  price (del producto): ${precioViejoDelProducto} → ${p.variants[0].price}`);
      p.price = p.variants[0].price;
    }
  }

  const soloBackend = Object.keys(porSku).filter((s) => !enSitio.has(s));

  const linea = (t, xs) => {
    console.log(`\n${t} (${xs.length})`);
    xs.forEach((x) => console.log('   ' + x));
  };
  console.log(`Catálogo del API: ${vivos.length} SKUs — catálogo del sitio: ${enSitio.size}`);
  linea('Diferencias de dinero (esto sí se arregla solo)', cambios);
  if (huerfanos.length) linea('⚠ SKU en el sitio que el backend YA NO vende — a mano', huerfanos);
  if (soloBackend.length) linea('⚠ SKU que el backend vende y el sitio NO enseña — a mano', soloBackend);

  if (!cambios.length) {
    console.log('\n=== El sitio y el backend dicen lo mismo. ===');
    return huerfanos.length || soloBackend.length ? process.exit(1) : undefined;
  }
  if (!ESCRIBIR) {
    console.log(`\n=== ${cambios.length} diferencias. No escribí nada (corre con --escribir). ===`);
    return process.exit(1);
  }

  fs.writeFileSync(ARCHIVO, src.replace(RE_ARREGLO,
    // `$` en un precio o en un texto rompería el reemplazo: se escapa.
    () => `export const fallbackProducts = ${JSON.stringify(prods, null, 2)};`), 'utf8');
  console.log(`\n=== ${cambios.length} diferencias escritas en src/data/fallbackCatalog.js ===`);
  console.log('Revísalas con `git diff` antes de commitear.');
  return undefined;
}

main().catch((e) => { console.error('El sincronizador se cayó:', e.message); process.exit(2); });
