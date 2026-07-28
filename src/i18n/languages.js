// Los tres idiomas del sitio, en un archivo diminuto aparte.
//
// Está separado de translations.js a propósito: el cargador (./loader.js) y el
// catálogo (./catalog.js) necesitan saber cuál es el idioma de casa, y si lo
// pidieran a translations.js se armaría un círculo de importaciones.

export const LANGUAGES = [
  { code: 'es-MX', label: 'Espanol (MX)', shortLabel: 'ES', flag: '🇲🇽' },
  { code: 'en-US', label: 'English (US)', shortLabel: 'EN', flag: '🇺🇸' },
  { code: 'pt-BR', label: 'Português (BR)', shortLabel: 'PT', flag: '🇧🇷' },
];

export const DEFAULT_LANGUAGE = 'es-MX';

export const normalizeLanguage = (value) =>
  (LANGUAGES.some((language) => language.code === value) ? value : DEFAULT_LANGUAGE);
