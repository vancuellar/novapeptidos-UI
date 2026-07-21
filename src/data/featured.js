// Productos destacados de la home, curados a mano (orden de Christian).
//
// Va en archivo aparte a propósito: el campo `featured` de `fallbackCatalog.js`
// lo genera `gen_catalog.py` y se sobrescribe en cada corrida del sistema de
// precios. Esta lista manda sobre ese campo.
//
// Criterio: primero los productos estrella (Retatrutida, NAD+, KLOW, 5-AMINO-1MQ)
// y después los que la competencia mexicana no ofrece o casi no ofrece, que es
// lo que nos diferencia. Para cambiar el orden, basta reordenar esta lista.
import { fallbackProducts } from '@/data/fallbackCatalog';

export const FEATURED_SLUGS = [
  'retatrutida',                    // el estrella de la casa
  'nad-plus',
  'klow-bpc-ghk-cu-tb-500-kpv',     // mezcla de 4 péptidos, poco común
  '5-amino-1mq',
  'slu-pp-332',                     // agonista ERR, casi nadie lo tiene en México
  '10-amino-1mq',                   // el análogo, todavía más raro
  'b7-33',                          // análogo monomérico de relaxina, muy poco común
  'foxo4',                          // senolítico, catálogo corto en el mercado
];

/** Destacados de la home, en el orden de FEATURED_SLUGS. */
export const getFeaturedProducts = () =>
  FEATURED_SLUGS
    .map((slug) => fallbackProducts.find((p) => p.slug === slug))
    .filter(Boolean);

export default getFeaturedProducts;
