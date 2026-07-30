import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import api, { esCaidaDeApi } from '@/lib/api';
import { guardarConfig, configDeRespaldo } from '@/lib/authConfig';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// Entrar con Outlook (cuenta Microsoft), calcado del flujo de Google:
// el servidor dice si está encendido (y con qué client id público), y si el
// servidor no contesta se usa el último client id bueno guardado en el
// navegador (ver lib/authConfig.js), para que el botón NUNCA se esfume sin
// explicación. El navegador va a login.microsoftonline.com, regresa
// a /login con un ID token en el fragmento (#id_token=...), y ese token se
// verifica EN EL SERVIDOR contra las llaves públicas de Microsoft.
//
// El nonce se guarda antes de irse y se compara al volver: un token que no
// trae NUESTRO nonce no se manda al servidor.

const NONCE_KEY = 'np_ms_nonce';

const nonceNuevo = () => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

// El payload del JWT sin verificar firma — SOLO para comparar el nonce local;
// la verificación de verdad (firma, emisor, audiencia, expiración) es del backend.
const payloadDe = (token) => {
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(b64))));
  } catch { return {}; }
};

const EMPTY_CONSENTS = { age_confirmed: false, privacy_accepted: false, promos: false, marketing_email: false };

const ConsentBox = ({ checked, onChange, testid, children }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} data-testid={testid}
      className="h-5 w-5 mt-0.5 shrink-0 accent-black dark:accent-white cursor-pointer" />
    <span className="text-sm leading-relaxed">{children}</span>
  </label>
);

const monoLink = 'text-foreground underline underline-offset-4 decoration-black/25 hover:decoration-black dark:decoration-white/25 dark:hover:decoration-white transition-colors';

const MicrosoftSignInButton = () => {
  const { adoptSession } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [clientId, setClientId] = useState('');
  const [pendingCredential, setPendingCredential] = useState('');
  const [consents, setConsents] = useState(EMPTY_CONSENTS);
  const [submitting, setSubmitting] = useState(false);
  const setConsent = (key) => (e) => setConsents((prev) => ({ ...prev, [key]: e.target.checked }));
  const canCreate = consents.age_confirmed && consents.privacy_accepted;

  const finishLogin = (data) => {
    adoptSession(data.token, data.user);
    toast.success(t('auth.toast.welcome'));
    navigate(data.user.role === 'admin' ? '/admin' : '/cuenta');
  };

  const postCredential = async (credential, extra = {}) => api.post('/auth/microsoft', {
    credential,
    language,
    distributor_code: localStorage.getItem('np_dist_code') || null,
    ...extra,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // El botón sobrevive a la caída del servidor: si no contesta, se usa el
      // último client_id bueno (o el horneado en el build). Antes desaparecía
      // sin explicación (caída del 30/07/2026).
      try {
        const res = await api.get('/auth/microsoft/config');
        if (res.data?.client_id) guardarConfig('microsoft', res.data);
        if (!cancelled && res.data?.enabled && res.data?.client_id) setClientId(res.data.client_id);
      } catch {
        const respaldo = configDeRespaldo('microsoft');
        if (!cancelled && respaldo?.enabled && respaldo?.client_id) setClientId(respaldo.client_id);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Al volver de Microsoft: el token viene en el fragmento de la URL.
  useEffect(() => {
    const hash = window.location.hash || '';
    if (!hash.includes('id_token=')) return;
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get('id_token');
    if (params.get('state') !== 'outlook' || !token) return;
    // Limpiar la URL de inmediato: el token no debe quedarse en el historial.
    window.history.replaceState(null, '', window.location.pathname);
    const nonce = sessionStorage.getItem(NONCE_KEY);
    sessionStorage.removeItem(NONCE_KEY);
    if (!nonce || payloadDe(token).nonce !== nonce) return; // no lo pedimos nosotros
    (async () => {
      try {
        const res = await postCredential(token);
        if (res.data.needs_consent) {
          setConsents(EMPTY_CONSENTS);
          setPendingCredential(token);
          return;
        }
        finishLogin(res.data);
      } catch (err) {
        toast.error(esCaidaDeApi(err)
          ? t('auth.toast.mantenimiento')
          : (err.response?.data?.detail || t('auth.toast.loginError')));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const irAMicrosoft = () => {
    const nonce = nonceNuevo();
    sessionStorage.setItem(NONCE_KEY, nonce);
    const u = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize');
    u.search = new URLSearchParams({
      client_id: clientId,
      response_type: 'id_token',
      redirect_uri: `${window.location.origin}/login`,
      response_mode: 'fragment',
      scope: 'openid profile email',
      nonce,
      state: 'outlook',
    }).toString();
    window.location.assign(u.toString());
  };

  const submitConsents = async () => {
    if (!canCreate) { toast.error(t('auth.consent.required')); return; }
    setSubmitting(true);
    try {
      const res = await postCredential(pendingCredential, consents);
      setPendingCredential('');
      finishLogin(res.data);
    } catch (err) {
      toast.error(esCaidaDeApi(err)
          ? t('auth.toast.mantenimiento')
          : (err.response?.data?.detail || t('auth.toast.loginError')));
    } finally { setSubmitting(false); }
  };

  if (!clientId) return null;

  // Mismo estilo monocromo que el botón de Google, con las cuatro ventanas.
  return (
    <div className="flex-1 min-w-0" data-testid="microsoft-signin">
      <button type="button" onClick={irAMicrosoft} data-testid="microsoft-signin-button"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl text-sm font-semibold transition-colors border border-border bg-card text-foreground hover:bg-secondary dark:border-white/10 dark:bg-[#1e1f22] dark:text-white dark:hover:bg-[#2a2b2f] whitespace-nowrap">
        <svg viewBox="0 0 23 23" className="h-[18px] w-[18px]" aria-hidden fill="currentColor">
          <rect x="1" y="1" width="10" height="10" />
          <rect x="12" y="1" width="10" height="10" />
          <rect x="1" y="12" width="10" height="10" />
          <rect x="12" y="12" width="10" height="10" />
        </svg>
        {t('auth.microsoft.cta')}
      </button>

      <Dialog open={!!pendingCredential} onOpenChange={(open) => { if (!open) setPendingCredential(''); }}>
        <DialogContent className="max-w-md bg-popover dark:bg-[#0d0d0f] border-border dark:border-white/10 text-foreground" data-testid="microsoft-consent-dialog">
          <DialogHeader><DialogTitle className="font-brand">{t('auth.google.consentTitle')}</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('auth.microsoft.consentNote')}</p>
          <div className="space-y-3">
            <ConsentBox checked={consents.age_confirmed} onChange={setConsent('age_confirmed')} testid="microsoft-consent-age">
              {t('auth.consent.age')}{' '}
              <Link to="/info/terminos" target="_blank" className={monoLink}>{t('auth.terms.service')}</Link>
            </ConsentBox>
            <ConsentBox checked={consents.privacy_accepted} onChange={setConsent('privacy_accepted')} testid="microsoft-consent-privacy">
              {t('auth.consent.privacy')}{' '}
              <Link to="/info/privacidad" target="_blank" className={monoLink}>{t('auth.terms.privacy')}</Link>
            </ConsentBox>
            <ConsentBox checked={consents.promos} onChange={setConsent('promos')} testid="microsoft-consent-promos">
              {t('auth.consent.promos')}
            </ConsentBox>
            <ConsentBox checked={consents.marketing_email} onChange={setConsent('marketing_email')} testid="microsoft-consent-email">
              {t('auth.consent.email')}
            </ConsentBox>
          </div>
          <button type="button" onClick={submitConsents} disabled={submitting || !canCreate} data-testid="microsoft-consent-submit"
            className="w-full h-12 rounded-xl text-sm font-semibold transition-colors border border-transparent bg-foreground text-background hover:bg-foreground/85 dark:border-white/10 dark:bg-[#1e1f22] dark:text-white dark:hover:bg-[#2a2b2f] disabled:opacity-40 disabled:pointer-events-none">
            {submitting ? t('auth.register.loading') : t('auth.consent.submit')}
          </button>
          {!canCreate && <p className="text-xs text-muted-foreground text-center">{t('auth.consent.required')}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MicrosoftSignInButton;
