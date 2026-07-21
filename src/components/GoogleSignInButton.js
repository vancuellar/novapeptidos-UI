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
      className="h-5 w-5 mt-0.5 shrink-0 accent-[hsl(var(--primary))] cursor-pointer" />
    <span className="text-sm leading-relaxed">{children}</span>
  </label>
);

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

  return (
    <div className={enabled ? 'mt-5' : 'hidden'} data-testid="google-signin">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">{t('auth.google.divider')}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div ref={slotRef} className="flex justify-center" />

      <Dialog open={!!pendingCredential} onOpenChange={(open) => { if (!open) setPendingCredential(''); }}>
        <DialogContent className="max-w-md" data-testid="google-consent-dialog">
          <DialogHeader><DialogTitle>{t('auth.google.consentTitle')}</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('auth.google.consentNote')}</p>
          <div className="space-y-3">
            <ConsentBox checked={consents.age_confirmed} onChange={setConsent('age_confirmed')} testid="google-consent-age">
              {t('auth.consent.age')}{' '}
              <Link to="/info/terminos" target="_blank" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.service')}</Link>
            </ConsentBox>
            <ConsentBox checked={consents.privacy_accepted} onChange={setConsent('privacy_accepted')} testid="google-consent-privacy">
              {t('auth.consent.privacy')}{' '}
              <Link to="/info/privacidad" target="_blank" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.privacy')}</Link>
            </ConsentBox>
            <ConsentBox checked={consents.promos} onChange={setConsent('promos')} testid="google-consent-promos">
              {t('auth.consent.promos')}
            </ConsentBox>
            <ConsentBox checked={consents.marketing_email} onChange={setConsent('marketing_email')} testid="google-consent-email">
              {t('auth.consent.email')}
            </ConsentBox>
          </div>
          <Button size="lg" className="w-full" onClick={submitConsents} disabled={submitting || !canCreate} data-testid="google-consent-submit">
            {submitting ? t('auth.register.loading') : t('auth.consent.submit')}
          </Button>
          {!canCreate && <p className="text-xs text-muted-foreground text-center">{t('auth.consent.required')}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoogleSignInButton;
