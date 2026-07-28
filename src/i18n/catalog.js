// Nombres y descripciones del catálogo traducidos.
//
// El catálogo llega del backend en español; esto sólo lo pisa cuando el
// visitante lee en inglés o en portugués. Por eso los datos ya no viven aquí:
// se fueron a ./catalog-en-US.js y ./catalog-pt-BR.js, que se bajan junto con
// los textos de su idioma y NUNCA en español (ver ./loader.js).
//
// Si el idioma todavía no llegó, `catalogoDe` contesta null y estas funciones
// devuelven el producto tal cual —en español— en vez de dejar huecos. En la
// práctica no pasa: el idioma no se cambia en pantalla hasta tenerlo entero.

import { catalogoDe } from './loader';

export const localizeCategory = (category, language) => ({
  ...category,
  ...(catalogoDe(language)?.categories[category.slug] || {}),
});

export const localizeProduct = (product, language) => ({
  ...product,
  ...(catalogoDe(language)?.products[product.slug] || {}),
});

export const localizeCategories = (categories, language) => categories.map((category) => localizeCategory(category, language));
export const localizeProducts = (products, language) => products.map((product) => localizeProduct(product, language));
