import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

const EMPTY_CONSENTS = { age_confirmed: false, privacy_accepted: false, promos: false, marketing_email: false };

const ConsentBox = ({ checked, onChange, testid, children }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} data-testid={testid}
      className="h-5 w-5 mt-0.5 shrink-0 accent-white cursor-pointer" />
    <span className="text-sm leading-relaxed">{children}</span>
  </label>
);

const monoLink = 'text-foreground underline underline-offset-4 decoration-white/25 hover:decoration-white transition-colors';

const GoogleSignInButton = () => {
  const { adoptSession } = useAuth();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const slotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  // Cuenta nueva por Google: los consentimientos los marca la persona, no Google.
  const [pendingCredential, setPendingCredential] = useState('');
  const [consents, setConsents] = useState(EMPTY_CONSENTS);
  const [submitting, setSubmitting] = useState(false);
  const setConsent = (key) => (e) => setConsents((prev) => ({ ...prev, [key]: e.target.checked }));
  const canCreate = consents.age_confirmed && consents.privacy_accepted;

  const isDark = theme === 'dark' ||
    (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  const finishLogin = (data) => {
    adoptSession(data.token, data.user);
    toast.success(t('auth.toast.welcome'));
    navigate(data.user.role === 'admin' ? '/admin' : '/cuenta');
  };

  const postCredential = async (credential, extra = {}) => api.post('/auth/google', {
    credential,
    language,
    distributor_code: localStorage.getItem('np_dist_code') || null,
    ...extra,
  });

  useEffect(() => {
    let cancelled = false;

    const onCredential = async (response) => {
      try {
        const res = await postCredential(response.credential);
        if (res.data.needs_consent) {
          // Cuenta nueva: pedir las casillas antes de crearla.
          setConsents(EMPTY_CONSENTS);
          setPendingCredential(response.credential);
          return;
        }
        finishLogin(res.data);
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
          shape: 'rectangular',
          width: 400,
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

  const submitConsents = async () => {
    if (!canCreate) { toast.error(t('auth.consent.required')); return; }
    setSubmitting(true);
    try {
      const res = await postCredential(pendingCredential, consents);
      setPendingCredential('');
      finishLogin(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.toast.loginError'));
    } finally { setSubmitting(false); }
  };

  // Estilo Resend: botón oscuro propio con la G de color, y el botón real de
  // Google (un iframe que no se puede re-estilizar) invisible ENCIMA, para que
  // el clic de verdad caiga en Google. Va arriba del formulario, con el
  // divisor "o" separándolo de los campos.
  return (
    <div className={enabled ? 'mb-6' : 'hidden'} data-testid="google-signin">
      <div className="relative h-12 w-full">
        {/* Monocromo como Resend: la G en blanco, sin colores. */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#1e1f22] text-sm font-semibold text-white">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden fill="currentColor">
            <path d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81zM12 24c3.24 0 5.96-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.14-4.06 1.14-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24zM5.29 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.29a12 12 0 0 0 0 10.76l4-3.1zM12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.29 6.62l4 3.1C6.23 6.88 8.88 4.77 12 4.77z" />
          </svg>
          {t('auth.google.cta')}
        </div>
        {/* El iframe de Google, invisible pero clicable, cubriendo el botón. */}
        <div ref={slotRef} className="absolute inset-0 overflow-hidden opacity-[0.001] [&>div]:!w-full [&_iframe]:!w-full" />
      </div>
      <div className="flex items-center gap-3 mt-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t('auth.google.divider')}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Dialog open={!!pendingCredential} onOpenChange={(open) => { if (!open) setPendingCredential(''); }}>
        {/* El dialogo vive en un portal fuera del arbol oscuro del login:
            lleva su propia clase `dark` para quedarse monocromo. */}
        <DialogContent className="dark max-w-md bg-[#0d0d0f] border-white/10 text-foreground" data-testid="google-consent-dialog">
          <DialogHeader><DialogTitle className="font-brand">{t('auth.google.consentTitle')}</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('auth.google.consentNote')}</p>
          <div className="space-y-3">
            <ConsentBox checked={consents.age_confirmed} onChange={setConsent('age_confirmed')} testid="google-consent-age">
              {t('auth.consent.age')}{' '}
              <Link to="/info/terminos" target="_blank" className={monoLink}>{t('auth.terms.service')}</Link>
            </ConsentBox>
            <ConsentBox checked={consents.privacy_accepted} onChange={setConsent('privacy_accepted')} testid="google-consent-privacy">
              {t('auth.consent.privacy')}{' '}
              <Link to="/info/privacidad" target="_blank" className={monoLink}>{t('auth.terms.privacy')}</Link>
            </ConsentBox>
            <ConsentBox checked={consents.promos} onChange={setConsent('promos')} testid="google-consent-promos">
              {t('auth.consent.promos')}
            </ConsentBox>
            <ConsentBox checked={consents.marketing_email} onChange={setConsent('marketing_email')} testid="google-consent-email">
              {t('auth.consent.email')}
            </ConsentBox>
          </div>
          <button type="button" onClick={submitConsents} disabled={submitting || !canCreate} data-testid="google-consent-submit"
            className="w-full h-12 rounded-xl bg-[#1e1f22] border border-white/10 text-white text-sm font-semibold hover:bg-[#2a2b2f] transition-colors disabled:opacity-40 disabled:pointer-events-none">
            {submitting ? t('auth.register.loading') : t('auth.consent.submit')}
          </button>
          {!canCreate && <p className="text-xs text-muted-foreground text-center">{t('auth.consent.required')}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoogleSignInButton;
