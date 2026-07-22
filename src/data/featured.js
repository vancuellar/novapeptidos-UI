// Productos destacados de la home, curados a mano (orden de Christian).
//
// Va en archivo aparte a propósito: el campo `featured` de `fallbackCatalog.js`
// lo genera `gen_catalog.py` y se sobrescribe en cada corrida del sistema de
// precios. Esta lista manda sobre ese campo.
//
// Criterio (Christian, 2026-07-22): SOLO productos que ya tienen su foto
// individual del vial con el logotipo y diseño nuevos. Se van agregando más
// conforme lleguen las fotos. Para cambiar el orden, basta reordenar esta lista.
import { fallbackProducts } from '@/data/fallbackCatalog';

export const FEATURED_SLUGS = [
  'retatrutida',                    // el estrella de la casa
  'nad-plus',
  'klow-bpc-ghk-cu-tb-500-kpv',     // mezcla de 4 péptidos, poco común
  'tirzepatida',
  'semaglutida',
  'agua-bacteriostatica',
  // Siguientes: agregar aquí conforme lleguen las fotos individuales nuevas.
];

/** Destacados de la home, en el orden de FEATURED_SLUGS. */
export const getFeaturedProducts = () =>
  FEATURED_SLUGS
    .map((slug) => fallbackProducts.find((p) => p.slug === slug))
    .filter(Boolean);

export default getFeaturedProducts;
