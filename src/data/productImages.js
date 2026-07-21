// Fotos reales de vial con etiqueta Exygen Labs (en public/images/products/<slug>.jpg).
// Reta, KLOW, Tirze y Sema se rehicieron el 2026-07-20 con las botellas nuevas
// (etiqueta con la molécula a la izquierda) sobre el mismo fondo de la foto de
// NAD+, para que todas las destacadas se vean de la misma serie.
// Los productos que todavía no tienen su foto propia usan una imagen de marca:
// una fila de nuestros viales. Antes traían fotos genéricas de banco de imágenes
// (laboratorios de stock) que no eran nuestras ni decían nada del producto.
// Se irán sustituyendo por la foto real de cada vial conforme se tomen.
const BASE = process.env.PUBLIC_URL || '';

const WITH_PHOTO = new Set([
  'bpc-157', 'tb-500', 'cjc-1295-sin-dac', 'cagrilintida', 'ghk-cu', 'ipamorelin',
  'melanotan-2', 'nad-plus', 'pt-141', 'retatrutida', 'semaglutida', 'tesamorelina',
  'tirzepatida', 'agua-bacteriostatica', 'klow-bpc-ghk-cu-tb-500-kpv',
]);

// Imagen de marca para el resto del catálogo: varios viales nuestros, no uno
// solo, justo para que se lea como "así son nuestros viales" y no como si el
// producto fuera el de la etiqueta que se alcanza a ver.
export const BRAND_VIAL_IMAGE = `${BASE}/images/products/_exygen-vial.jpg`;

export const productImage = (product) => {
  if (!product) return undefined;
  if (WITH_PHOTO.has(product.slug)) return `${BASE}/images/products/${product.slug}.jpg`;
  return BRAND_VIAL_IMAGE;
};

// True cuando el producto usa una foto de vial real (con un gramaje visible en la etiqueta).
export const hasProductPhoto = (product) => !!product && WITH_PHOTO.has(product.slug);

// True cuando se está mostrando la imagen de marca y no la foto del producto.
// Se usa para avisar que la imagen es ilustrativa.
export const isBrandImage = (product) => !!product && !WITH_PHOTO.has(product.slug);
