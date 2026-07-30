/**
 * ENVÍO PARTIDO — cuántas piezas salen ya y cuántas hay que mandar pedir.
 *
 * ⛔ LA REGLA DE LA CASA (Christián, 2026-07-30): ninguna venta se bloquea por
 * inventario. «Si piden 40 y solo tengo 20, se mandan los 20 y se mandan pedir los otros
 * 20.» Lo que hay sale ya (2 a 5 días hábiles) y el resto llega alrededor de una semana
 * después. Aquí no se impide nada: se CUENTA, para poder AVISAR antes de pagar.
 *
 * La cuenta tiene que dar lo MISMO que la del servidor (`_disponible_de` en server.py):
 * lo menor entre el contador del catálogo y las piezas reales de `/api/stock`. Si las dos
 * cuentas se separan, el cliente ve un aviso y recibe otra cosa — que es peor que no
 * avisar.
 */

/** El slug del producto PADRE: el del renglón sin su presentación pegada.
 *  'orexin-a-10-mg' + '10 mg' -> 'orexin-a'   (igual que `_familia_del_slug` del servidor) */
const familiaDelSlug = (slug, presentacion) => {
  const s = (slug || '').trim().toLowerCase();
  const cola = (presentacion || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return cola && s.endsWith(`-${cola}`) ? s.slice(0, -(cola.length + 1)) : s;
};

/**
 * TODAS las formas en que `/api/stock` puede tener guardada esta presentación.
 *
 * ⛔ NO ES UNA SOLA. El Panel guarda el inventario con la llave del producto AGRUPADO
 * (`fallback-orexin-a::10 mg`), pero el carrito guarda el id de la PRESENTACIÓN (un UUID)
 * y a veces el SKU. Probar una sola llave es lo que hacía que el aviso no apareciera
 * nunca: `662781a5-...::10 mg` no existe en el mapa y el renglón se veía como "no sé".
 * Es el mismo resolvedor que `llaves_de_inventario_vivo` en el servidor, y tienen que
 * seguir siendo el mismo: si cada lado busca distinto, el aviso y el cobro se separan.
 */
export const llavesDeStock = (item) => {
  const pres = (item.presentation || '').trim();
  const llaves = [];
  if (pres) {
    const familia = familiaDelSlug(item.slug, pres);
    for (const base of [familia ? `fallback-${familia}` : '', familia, (item.slug || '').trim(), item.product_id]) {
      if (base) llaves.push(`${base}::${pres}`);
    }
  }
  if (item.product_id) llaves.push(item.product_id);
  if (item.sku) llaves.push(item.sku);
  return llaves;
};

/**
 * Las piezas EN MANO de un renglón del carrito.
 *
 * `null` cuando no se puede saber (todavía no llega `/api/stock`, o esa presentación no
 * lleva renglón capturado). "No sé" no es "no hay": sin dato no se inventa un aviso.
 */
export const enManoDe = (item, stockMap) => {
  const delCatalogo = Number.isFinite(Number(item.stock)) ? Math.max(0, Number(item.stock)) : null;
  if (!stockMap) return null;
  const llave = llavesDeStock(item).find((k) => stockMap[k]);
  if (!llave) return delCatalogo;
  const real = Math.max(0, Number(stockMap[llave].qty) || 0);
  return delCatalogo === null ? real : Math.min(delCatalogo, real);
};

/**
 * El desglose de lo que NO alcanza, renglón por renglón.
 * Devuelve `[{ product_id, name, pedidas, enMano, porSurtir }]` — vacío si todo sale ya.
 *
 * Se suman los renglones del MISMO producto antes de comparar: el carrito puede traerlo
 * repetido y, sin agrupar, cada renglón se mide contra el inventario completo y el aviso
 * sale corto.
 */
export const desgloseSobrePedido = (items, stockMap) => {
  if (!stockMap || !items?.length) return [];
  const porProducto = new Map();
  for (const item of items) {
    const clave = item.product_id;
    const previo = porProducto.get(clave);
    if (previo) previo.pedidas += Number(item.quantity) || 0;
    else porProducto.set(clave, { item, pedidas: Number(item.quantity) || 0 });
  }
  const faltantes = [];
  for (const [clave, { item, pedidas }] of porProducto) {
    const enMano = enManoDe(item, stockMap);
    if (enMano === null || pedidas <= enMano) continue;
    faltantes.push({
      product_id: clave,
      name: item.name,
      pedidas,
      enMano,
      porSurtir: pedidas - enMano,
    });
  }
  return faltantes;
};

/** ¿Este producto/presentación se vende hoy únicamente sobre pedido? */
export const esSoloSobrePedido = (item, stockMap) => enManoDe(item, stockMap) === 0;
