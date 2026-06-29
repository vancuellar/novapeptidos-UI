export const LANGUAGES = [
  { code: 'es-MX', label: 'Español (MX)', shortLabel: 'ES', flag: '🇲🇽' },
  { code: 'en-US', label: 'English (US)', shortLabel: 'EN', flag: '🇺🇸' },
];

export const DEFAULT_LANGUAGE = 'es-MX';

export const translations = {
  'es-MX': {
    'header.coa': 'COA por lote disponible',
    'header.shipping': 'Envío nacional en México · Gratis desde $2,500 MXN',
    'header.ruo': 'Solo para uso en investigación (RUO)',
    'header.brandTagline': 'Péptidos de investigación · México',
    'header.searchShort': 'Buscar péptidos...',
    'header.searchLong': 'Buscar BPC-157, Ipamorelin, TB-500...',
    'header.allCatalog': 'Todo el catálogo',
    'header.all': 'Todo',
    'header.account': 'Mi cuenta',
    'header.admin': 'Panel admin',
    'header.logout': 'Cerrar sesión',
    'controls.language': 'Idioma',
    'controls.theme': 'Tema',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.system': 'Sistema',
  },
  'en-US': {
    'header.coa': 'Lot-specific COA available',
    'header.shipping': 'Mexico-wide shipping · Free from $2,500 MXN',
    'header.ruo': 'Research use only (RUO)',
    'header.brandTagline': 'Research peptides · Mexico',
    'header.searchShort': 'Search peptides...',
    'header.searchLong': 'Search BPC-157, Ipamorelin, TB-500...',
    'header.allCatalog': 'Full catalog',
    'header.all': 'All',
    'header.account': 'My account',
    'header.admin': 'Admin panel',
    'header.logout': 'Sign out',
    'controls.language': 'Language',
    'controls.theme': 'Theme',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  },
};

export function getTranslation(language, key) {
  return translations[language]?.[key] || translations[DEFAULT_LANGUAGE][key] || key;
}
