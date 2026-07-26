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

// --------------------------------------------------------------------------
//  Pestañas de la vitrina (Christian, 2026-07-26)
// --------------------------------------------------------------------------
// Cambian QUÉ se muestra, no cómo. La idea es dar razón para quedarse en la
// portada, no controles de vista: para ordenar y filtrar ya está el catálogo,
// que es donde viven los 99 productos.
//
// La primera pestaña es la lista curada de siempre. Las demás salen del catálogo
// y se cortan a 8 para que la fila no se vuelva infinita.
const TOPE = 8;

const porCategoria = (cat) => fallbackProducts
  .filter((p) => p.category === cat || (p.categories || []).includes(cat))
  .slice(0, TOPE);

export const FEATURED_TABS = [
  { key: 'destacados', labelKey: 'home.tab.featured', get: getFeaturedProducts },
  {
    key: 'nuevos',
    labelKey: 'home.tab.new',
    get: () => fallbackProducts.filter((p) => p.is_new).slice(0, TOPE),
  },
  { key: 'peso', labelKey: 'home.tab.weight', get: () => porCategoria('perdida-peso') },
  { key: 'recuperacion', labelKey: 'home.tab.recovery', get: () => porCategoria('recuperacion') },
  { key: 'hgh', labelKey: 'home.tab.growth', get: () => porCategoria('hormona-crecimiento') },
];

/** Los productos de una pestaña. Si por lo que sea queda vacía, cae a los curados. */
export const getTabProducts = (key) => {
  const tab = FEATURED_TABS.find((t) => t.key === key) || FEATURED_TABS[0];
  const lista = tab.get();
  return lista.length ? lista : getFeaturedProducts();
};

export default getFeaturedProducts;
