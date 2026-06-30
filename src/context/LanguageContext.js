import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, getTranslation, LANGUAGES } from '@/i18n/translations';

const STORAGE_KEY = 'nova-language';
const LanguageContext = createContext(null);

const normalizeLanguage = (value) => {
  return LANGUAGES.some((language) => language.code === value) ? value : DEFAULT_LANGUAGE;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    return normalizeLanguage(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => ({
    language,
    languages: LANGUAGES,
    setLanguage: (nextLanguage) => setLanguageState(normalizeLanguage(nextLanguage)),
    t: (key, params) => getTranslation(language, key, params),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
};
