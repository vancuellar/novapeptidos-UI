import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '@/lib/api';

export const THEMES = ['light', 'dark', 'system'];

const STORAGE_KEY = 'nova-theme';
// Por defecto el sitio abre en oscuro (orden de Christian, 2026-07-20).
// Solo aplica a quien nunca ha elegido tema: la eleccion guardada manda.
const DEFAULT_THEME = 'dark';
const ThemeContext = createContext(null);

const normalizeTheme = (value) => {
  return THEMES.includes(value) ? value : DEFAULT_THEME;
};

const systemPrefersDark = () => {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
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

  // La cuenta manda al INICIAR sesión: AuthContext avisa con este evento si el
  // usuario trae tema preferido (María: oscuro). No pasa por setTheme para no
  // re-guardar en la cuenta lo que la cuenta acaba de decir.
  useEffect(() => {
    const onPrefs = (e) => { if (e.detail?.theme) setThemeState(normalizeTheme(e.detail.theme)); };
    window.addEventListener('exygen-account-prefs', onPrefs);
    return () => window.removeEventListener('exygen-account-prefs', onPrefs);
  }, []);

  const value = useMemo(() => ({
    theme,
    themes: THEMES,
    setTheme: (nextTheme) => {
      const next = normalizeTheme(nextTheme);
      setThemeState(next);
      // Con sesión abierta, la elección viaja a la cuenta: así el próximo
      // login abre con lo que la persona dejó, no con el default del admin.
      if (localStorage.getItem('np_token')) api.put('/auth/me/prefs', { theme: next }).catch(() => {});
    },
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
};
