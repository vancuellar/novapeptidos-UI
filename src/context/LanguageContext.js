import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_LANGUAGE, getTranslation, LANGUAGES, normalizeLanguage } from '@/i18n/translations';
import { adelantarIdioma, cargarIdioma, idiomaGuardado, idiomaListo, STORAGE_KEY } from '@/i18n/loader';
import api from '@/lib/api';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // Lo que el visitante dejó elegido. Se lee UNA vez, al pintar por primera
  // vez: si se leyera dentro de un efecto ya lo habría pisado el efecto de
  // abajo, que guarda el idioma en curso.
  const guardado = useRef(typeof window === 'undefined' ? DEFAULT_LANGUAGE : idiomaGuardado()).current;

  const [language, setLanguageState] = useState(() => {
    const code = normalizeLanguage(guardado);
    // Si el idioma guardado todavía no está en memoria se arranca en español y
    // se corrige en cuanto llegue (efecto de más abajo). En la práctica no se
    // ve: src/index.js espera a tenerlo antes de pintar nada.
    return idiomaListo(code) ? code : DEFAULT_LANGUAGE;
  });

  // Hay un cambio de idioma bajando. Se expone por si alguna pantalla quiere
  // enseñar que está trabajando; el texto NO se toca hasta que llega.
  const [cambiando, setCambiando] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  // Red de seguridad: si se pintó en español teniendo otro idioma guardado
  // (el archivo tardó más de la cuenta), se corrige solo al llegar.
  useEffect(() => {
    const code = normalizeLanguage(guardado);
    if (code === DEFAULT_LANGUAGE || idiomaListo(code)) return undefined;
    let vivo = true;
    cargarIdioma(code)
      .then(() => { if (vivo) setLanguageState(code); })
      .catch(() => {}); // se queda en español: nada de pantalla rota
    return () => { vivo = false; };
  }, [guardado]);

  // La cuenta manda al INICIAR sesión: AuthContext avisa con este evento si el
  // usuario trae idioma preferido (María: portugués). Se baja el archivo entero
  // antes de cambiar, igual que siempre, y NO se re-guarda en la cuenta.
  useEffect(() => {
    const onPrefs = (e) => {
      const code = e.detail?.language && normalizeLanguage(e.detail.language);
      if (!code || !e.detail?.language) return;
      if (idiomaListo(code)) { setLanguageState(code); return; }
      cargarIdioma(code).then(() => setLanguageState(code)).catch(() => {});
    };
    window.addEventListener('exygen-account-prefs', onPrefs);
    return () => window.removeEventListener('exygen-account-prefs', onPrefs);
  }, []);

  const value = useMemo(() => ({
    language,
    languages: LANGUAGES,
    languageLoading: cambiando,

    // EL IDIOMA NO SE PINTA A MEDIAS. Primero se baja el archivo del idioma
    // nuevo y sólo cuando está entero en memoria cambia la pantalla. Mientras
    // tanto se sigue leyendo el idioma anterior, completo: ni un parpadeo ni
    // una clave cruda. La segunda vez ya está en memoria y el cambio es
    // instantáneo, sin viaje de red.
    setLanguage: (nextLanguage) => {
      const code = normalizeLanguage(nextLanguage);
      if (code === language) return;
      // Con sesión abierta, la elección viaja a la cuenta: el próximo login
      // abre con lo que la persona dejó, no con el default del admin.
      const guardarEnCuenta = () => {
        if (localStorage.getItem('np_token')) api.put('/auth/me/prefs', { language: code }).catch(() => {});
      };
      if (idiomaListo(code)) { setLanguageState(code); guardarEnCuenta(); return; }
      setCambiando(true);
      cargarIdioma(code)
        .then(() => { setLanguageState(code); guardarEnCuenta(); })
        .catch(() => {}) // no se pudo bajar: nos quedamos donde estábamos
        .finally(() => setCambiando(false));
    },

    // Adelanta la descarga cuando el visitante abre el menú de idiomas, para
    // que el PRIMER cambio también se sienta instantáneo.
    preloadLanguage: adelantarIdioma,

    t: (key, params) => getTranslation(language, key, params),
  }), [language, cambiando]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
};
