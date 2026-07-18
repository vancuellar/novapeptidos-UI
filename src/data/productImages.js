// Fotos reales de vial con etiqueta Exygen Labs (en public/images/products/<slug>.jpg).
// Para los productos sin foto propia se usa la imagen del catálogo (image_url).
const BASE = process.env.PUBLIC_URL || '';

const WITH_PHOTO = new Set([
  'bpc-157', 'tb-500', 'cjc-1295-sin-dac', 'cagrilintida', 'ghk-cu', 'ipamorelin',
  'melanotan-2', 'nad-plus', 'pt-141', 'retatrutida', 'semaglutida', 'tesamorelina',
  'tirzepatida', 'agua-bacteriostatica',
]);

export const productImage = (product) => {
  if (product && WITH_PHOTO.has(product.slug)) return `${BASE}/images/products/${product.slug}.jpg`;
  return product ? product.image_url : undefined;
};

// True cuando el producto usa una foto de vial real (con un gramaje visible en la etiqueta).
export const hasProductPhoto = (product) => !!product && WITH_PHOTO.has(product.slug);
