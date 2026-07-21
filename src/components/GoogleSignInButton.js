import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

// El script de Google Identity Services se carga una sola vez por sesión,
// y solo si el servidor dice que Google Sign-In está encendido.
let gsiPromise = null;
const loadGsi = () => {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!gsiPromise) {
    gsiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return gsiPromise;
};

const GoogleSignInButton = () => {
  const { adoptSession } = useAuth();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const slotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    let cancelled = false;

    const onCredential = async (response) => {
      try {
        const res = await api.post('/auth/google', {
          credential: response.credential,
          language,
          distributor_code: localStorage.getItem('np_dist_code') || null,
        });
        adoptSession(res.data.token, res.data.user);
        toast.success(t('auth.toast.welcome'));
        navigate(res.data.user.role === 'admin' ? '/admin' : '/cuenta');
      } catch (err) {
        toast.error(err.response?.data?.detail || t('auth.toast.loginError'));
      }
    };

    (async () => {
      try {
        const cfg = await api.get('/auth/google/config');
        if (cancelled || !cfg.data?.enabled || !cfg.data?.client_id) return;
        await loadGsi();
        if (cancelled || !slotRef.current) return;
        window.google.accounts.id.initialize({
          client_id: cfg.data.client_id,
          callback: onCredential,
        });
        window.google.accounts.id.renderButton(slotRef.current, {
          type: 'standard',
          theme: isDark ? 'filled_black' : 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          width: slotRef.current.offsetWidth || 320,
          locale: language,
        });
        setEnabled(true);
      } catch {
        // Sin config o sin red: simplemente no se muestra el botón.
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, isDark]);

  return (
    <div className={enabled ? 'mt-5' : 'hidden'} data-testid="google-signin">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t('auth.google.divider')}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div ref={slotRef} className="flex justify-center" />
    </div>
  );
};

export default GoogleSignInButton;
