// Foto del vial de cada producto.
//
// UNA FOTO POR SKU, no por producto (Christian, 2026-07-26). La etiqueta lleva el
// gramaje impreso, así que si alguien elige 15 mg y ve un vial de 10 mg, el error
// se ve. Por eso `productImage` recibe la presentación activa: la foto cambia
// junto con el selector.
//
// Los archivos son WebP con transparencia en `public/images/products/<SKU>.webp`,
// generados por `pricing-system/generar_viales.py` + `publicar_viales_web.py`
// sobre el vial en blanco que mandó Christian. Antes el catálogo traía fotos de
// banco de imágenes: 98 productos compartían exactamente la misma.
import { VIAL_SKUS } from './vialImages';

const BASE = process.env.PUBLIC_URL || '';

// Imagen de marca para el resto del catálogo: varios viales nuestros, no uno
// solo, justo para que se lea como "así son nuestros viales" y no como si el
// producto fuera el de la etiqueta que se alcanza a ver.
export const BRAND_VIAL_IMAGE = `${BASE}/images/products/_exygen-vial.jpg`;

/** El SKU que corresponde a la presentación elegida (o la primera del producto). */
const skuDe = (product, variant) => {
  if (variant && variant.sku) return variant.sku;
  const vs = (product && product.variants) || [];
  return vs.length ? vs[0].sku : product && product.sku;
};

/**
 * @param product   el producto del catálogo
 * @param variant   la presentación seleccionada (opcional); si no viene, la primera
 * @param tarjeta   true para la versión chica (catálogo)
 *
 * ⚠️ El catálogo DEBE pedir la chica. Son 99 tarjetas en una página, se ven a
 * ~284 px, y con la de 760 el navegador descomprimía 2.3 MB por tarjeta — 218 MB
 * en total — mientras el cliente bajaba, y el scroll se atrancaba.
 */
export const productImage = (product, variant, tarjeta = false) => {
  if (!product) return undefined;
  const sku = skuDe(product, variant);
  if (sku && VIAL_SKUS.has(sku)) {
    return `${BASE}/images/products/${sku}${tarjeta ? '-sm' : ''}.webp`;
  }
  return BRAND_VIAL_IMAGE;
};

// True cuando el producto usa una foto de vial real (con su gramaje en la etiqueta).
export const hasProductPhoto = (product, variant) => {
  if (!product) return false;
  const sku = skuDe(product, variant);
  return !!sku && VIAL_SKUS.has(sku);
};

// True cuando se está mostrando la imagen de marca y no la foto del producto.
// Se usa para avisar que la imagen es ilustrativa.
export const isBrandImage = (product, variant) => !hasProductPhoto(product, variant);
