// ---------------------------------------------------------------------------
//  Un idioma = un archivo que se baja cuando hace falta (2026-07-28)
// ---------------------------------------------------------------------------
// Antes los TRES idiomas viajaban juntos en el archivo principal: 186 kB de
// texto, de los cuales el visitante mexicano —que es casi todo el tráfico— sólo
// usaba un tercio. Se bajaba el inglés y el portugués completos para leer una
// portada en español.
//
// Ahora:
//   · el ESPAÑOL va pegado al archivo principal (import normal, arriba). Es el
//     idioma de casa: tiene que estar en pantalla sin un segundo viaje de red.
//   · el INGLÉS y el PORTUGUÉS son archivos aparte que el navegador sólo pide
//     cuando alguien los elige, o cuando vuelve al sitio con ese idioma ya
//     guardado. Una vez bajados se quedan en memoria: el segundo cambio de
//     idioma es instantáneo.
//
// Los textos del catálogo (nombres y descripciones de productos y categorías)
// viajan en el MISMO archivo que los textos de la interfaz de ese idioma: son
// dos importaciones con el mismo `webpackChunkName`, así que webpack las junta
// en un solo archivo y es un solo viaje de red por idioma. Importa que lleguen
// juntos: si llegaran por separado, la página se pintaría medio traducida.
//
// Regla de oro de todo esto: NUNCA se cambia el idioma en pantalla antes de
// tener sus textos en memoria. Mientras baja, el usuario sigue leyendo el
// idioma anterior, entero. Así no hay ni parpadeo ni claves crudas.

import { DEFAULT_LANGUAGE } from './languages';
import esMX from './es-MX';

export const STORAGE_KEY = 'nova-language';

// Lo que ya está en memoria. El español está desde el primer instante.
const textos = { [DEFAULT_LANGUAGE]: esMX };
const catalogos = {};
const enCamino = {};

const descargas = {
  'en-US': () => Promise.all([
    import(/* webpackChunkName: "idioma-en" */ './en-US'),
    import(/* webpackChunkName: "idioma-en" */ './catalog-en-US'),
  ]),
  'pt-BR': () => Promise.all([
    import(/* webpackChunkName: "idioma-pt" */ './pt-BR'),
    import(/* webpackChunkName: "idioma-pt" */ './catalog-pt-BR'),
  ]),
};

/** ¿Están ya en memoria los textos de este idioma? (sin esperar a nada) */
export const idiomaListo = (code) => Boolean(textos[code]);

/** Los textos de la interfaz. Si el idioma no llegó, se contesta en español. */
export const textosDe = (code) => textos[code] || textos[DEFAULT_LANGUAGE];

/** Los textos del catálogo. En español no hay: el catálogo ya viene en español. */
export const catalogoDe = (code) => catalogos[code] || null;

/**
 * Baja un idioma. Devuelve una promesa que se cumple cuando ya está en memoria.
 * Llamarla dos veces no baja nada dos veces.
 */
export function cargarIdioma(code) {
  if (idiomaListo(code)) return Promise.resolve();
  const descargar = descargas[code];
  // Idioma que no conocemos: nos quedamos con el de casa, sin romper nada.
  if (!descargar) return Promise.resolve();
  if (!enCamino[code]) {
    enCamino[code] = descargar().then(([interfaz, catalogo]) => {
      // Se mezcla sobre el español: si algún día faltara una clave en inglés,
      // sale el texto en español y NUNCA 'home.heroBody' en pantalla.
      textos[code] = { ...esMX, ...interfaz.default };
      catalogos[code] = catalogo.default;
    }).catch((error) => {
      // Se borra la marca para poder reintentar (pasa cuando publicamos una
      // versión nueva y el archivo viejo ya no existe en el servidor).
      delete enCamino[code];
      throw error;
    });
  }
  return enCamino[code];
}

/** Empieza a bajar un idioma sin que a nadie le importe cuándo termina. */
export const adelantarIdioma = (code) => { cargarIdioma(code).catch(() => {}); };

/** El idioma que el visitante dejó elegido la última vez. */
export function idiomaGuardado() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE;
  } catch {
    // Navegación privada con el almacenamiento capado: idioma de casa.
    return DEFAULT_LANGUAGE;
  }
}
