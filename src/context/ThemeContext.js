import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const THEMES = ['light', 'dark', 'system'];

const STORAGE_KEY = 'nova-theme';
const ThemeContext = createContext(null);

const normalizeTheme = (value) => {
  return THEMES.includes(value) ? value : 'system';
};

const systemPrefersDark = () => {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'system';
    return normalizeTheme(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark());
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem(STORAGE_KEY, theme);
    };

    applyTheme();

    if (theme !== 'system') return undefined;
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    media?.addEventListener?.('change', applyTheme);
    return () => media?.removeEventListener?.('change', applyTheme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    themes: THEMES,
    setTheme: (nextTheme) => setThemeState(normalizeTheme(nextTheme)),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
};
