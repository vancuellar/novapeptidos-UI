// Puerta de entrada a los textos del sitio.
//
// Los textos ya no viven aquí: están en un archivo por idioma (./es-MX.js,
// ./en-US.js, ./pt-BR.js) y quien decide cuál se baja es ./loader.js. Este
// archivo se queda con lo de siempre —`t()`, la lista de idiomas— para que
// nadie más tenga que enterarse de la mudanza.

import { DEFAULT_LANGUAGE, LANGUAGES, normalizeLanguage } from './languages';
import { textosDe } from './loader';

export { DEFAULT_LANGUAGE, LANGUAGES, normalizeLanguage };
export { cargarIdioma, idiomaListo, adelantarIdioma, idiomaGuardado, STORAGE_KEY } from './loader';

const interpolate = (value, params = {}) => {
  if (typeof value !== 'string') return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? '');
};

export function getTranslation(language, key, params) {
  const dictionary = textosDe(language);
  // Doble red: si al idioma pedido le faltara una clave, se contesta en
  // español; y si tampoco estuviera, la clave pelada. Lo último no debe pasar
  // nunca y la auditoría lo vigila ('ningún texto sale como clave cruda').
  const value = dictionary[key] ?? textosDe(DEFAULT_LANGUAGE)[key] ?? key;
  if (Array.isArray(value)) return value.map((item) => interpolate(item, params));
  return interpolate(value, params);
}
