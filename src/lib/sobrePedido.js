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

/** La llave con la que `/api/stock` guarda una presentación. Igual que en ProductDetail. */
export const llaveDeStock = (item) =>
  item.presentation ? `${item.product_id}::${item.presentation}` : item.product_id;

/**
 * Las piezas EN MANO de un renglón del carrito.
 *
 * `null` cuando no se puede saber (todavía no llega `/api/stock`, o esa presentación no
 * lleva renglón capturado). "No sé" no es "no hay": sin dato no se inventa un aviso.
 */
export const enManoDe = (item, stockMap) => {
  const delCatalogo = Number.isFinite(Number(item.stock)) ? Math.max(0, Number(item.stock)) : null;
  if (!stockMap) return null;
  // El carrito manda a veces el id de la presentación y a veces su SKU: se prueban las
  // dos llaves, igual que el servidor.
  const fila = stockMap[llaveDeStock(item)]
    || (item.sku ? stockMap[item.sku] : null)
    || stockMap[item.product_id];
  if (!fila) return delCatalogo;
  const real = Math.max(0, Number(fila.qty) || 0);
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
