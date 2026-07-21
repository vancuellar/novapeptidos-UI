import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, ShieldCheck, Truck, Lock, MailCheck, Fingerprint, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { MoleculeTile } from '@/components/BrandLogo';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { passkeysSupported, loginWithPasskey } from '@/lib/webauthn';

// Casilla de consentimiento. Etiqueta clicable completa: en móvil el cuadrito
// solo es un blanco de 20 px y la gente falla el toque.
const Consent = ({ checked, onChange, testid, children }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} data-testid={testid}
      className="h-5 w-5 mt-0.5 shrink-0 accent-[hsl(var(--primary))] cursor-pointer" />
    <span className="text-sm leading-relaxed">{children}</span>
  </label>
);

// Pantalla de entrada al estilo del alta de Resend (gusto explícito de
// Christian): logo, título grande, enlace para cambiar de modo, Google arriba,
// divisor "o" y el formulario directo sobre el fondo, sin tarjeta.
const Login = () => {
  const { login, register, adoptSession } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { pathname } = useLocation();
  // Como Resend: /login y /registro son paginas separadas. El viejo
  // /login?tab=signup sigue funcionando: manda a /registro.
  const mode = pathname === '/registro' ? 'signup' : 'login';

  useEffect(() => {
    if (pathname === '/login' && params.get('tab') === 'signup') {
      navigate('/registro', { replace: true });
    }
  }, [pathname, params, navigate]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regConfirm, setRegConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');   // registrado, falta confirmar
  const [unverified, setUnverified] = useState('');       // intento de entrar sin confirmar
  const [totpToken, setTotpToken] = useState('');         // cuenta con 2FA: falta el codigo
  const [totpCode, setTotpCode] = useState('');
  // Los dos primeros son obligatorios; los otros dos son opt-in real (nacen apagados).
  const [consents, setConsents] = useState({
    age_confirmed: false, privacy_accepted: false,
    promos: false, marketing_email: false,
  });
  const setConsent = (key) => (e) => setConsents((prev) => ({ ...prev, [key]: e.target.checked }));
  const canRegister = consents.age_confirmed && consents.privacy_accepted;

  const switchMode = (next) => navigate(next === 'signup' ? '/registro' : '/login');

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUnverified('');
    try {
      const result = await login(email, password);
      if (result?.needs_totp) {
        setTotpToken(result.pre_token);
        setTotpCode('');
        return;
      }
      toast.success(t('auth.toast.welcome'));
      navigate(result.role === 'admin' ? '/admin' : '/cuenta');
    } catch (err) {
      if (err.response?.status === 403) setUnverified(email.trim());
      else toast.error(err.response?.data?.detail || t('auth.toast.loginError'));
    } finally { setLoading(false); }
  };

  const submitTotp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/totp', { pre_token: totpToken, code: totpCode });
      adoptSession(res.data.token, res.data.user);
      toast.success(t('auth.toast.welcome'));
      navigate(res.data.user.role === 'admin' ? '/admin' : '/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.toast.loginError'));
      if (err.response?.status === 401 && /expiro|expired/i.test(err.response?.data?.detail || '')) setTotpToken('');
    } finally { setLoading(false); }
  };

  const passkeyLogin = async () => {
    setLoading(true);
    try {
      const data = await loginWithPasskey();
      adoptSession(data.token, data.user);
      toast.success(t('auth.toast.welcome'));
      navigate(data.user.role === 'admin' ? '/admin' : '/cuenta');
    } catch (err) {
      // Cancelar el dialogo del sistema no es un error que regañar.
      if (err?.name !== 'NotAllowedError') {
        toast.error(err.response?.data?.detail || t('passkey.loginFailed'));
      }
    } finally { setLoading(false); }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (regPassword !== regConfirm) { toast.error(t('auth.reset.mismatch')); return; }
    if (!canRegister) { toast.error(t('auth.consent.required')); return; }
    setLoading(true);
    try {
      const res = await register(regName, regEmail, regPassword, consents);
      // Si el servidor no exige confirmacion (correo saliente apagado) ya viene
      // la sesion lista: entramos directo en vez de pedir un correo que no llegara.
      if (res?.pending_verification === false && res.token) {
        adoptSession(res.token, res.user);
        toast.success(t('auth.toast.created'));
        navigate('/cuenta');
        return;
      }
      setPendingEmail(regEmail.trim());
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.toast.registerError'));
    } finally { setLoading(false); }
  };

  const resendVerification = async (address) => {
    setLoading(true);
    try {
      await api.post('/auth/resend-verification', { email: address, language });
      toast.success(t('verify.resent'));
    } catch { toast.error(t('verify.resendFailed')); }
    finally { setLoading(false); }
  };

  const passwordField = (value, onChange, show, setShow, testid) => (
    <div className="relative mt-1.5">
      <Input type={show ? 'text' : 'password'} className="pr-10 h-12 rounded-lg" placeholder="••••••••" minLength={6} value={value} onChange={onChange} data-testid={testid} required />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={t(show ? 'auth.hidePassword' : 'auth.showPassword')}>
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  const termsLine = (
    <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
      {t('auth.terms.pre')}{' '}
      <Link to="/info/terminos" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.service')}</Link>{' '}
      {t('auth.terms.and')}{' '}
      <Link to="/info/privacidad" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.privacy')}</Link>.
    </p>
  );

  return (
    // Pantalla independiente SIEMPRE oscura, como el alta de Resend (orden de
    // Christian, 2026-07-21): clase `dark` propia para que todos los tokens
    // del tema se resuelvan en oscuro aunque el sitio esté en claro, lienzo
    // negro y un resplandor suave arriba a la derecha.
    <div className="dark min-h-screen flex items-center justify-center px-4 py-14 relative overflow-hidden bg-[#020204] text-foreground">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-15%] h-[560px] w-[560px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle at center, hsl(225 72% 60% / 0.55), transparent 65%)' }} />
      <div className="w-full max-w-md relative">
        {/* Como Resend: SOLO la molécula en su mosaico, título grande y el
            enlace para cambiar de modo. Sin wordmark y sin link de "Inicio"
            (órdenes de Christian, 2026-07-21). */}
        <div className="flex flex-col items-center text-center mb-9">
          <MoleculeTile className="h-14 w-14 mb-7 text-foreground" />
          <h1 className="font-brand text-3xl sm:text-4xl tracking-tight">
            {mode === 'signup' ? t('auth.resend.signupTitle') : t('auth.resend.loginTitle')}
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            {mode === 'signup' ? t('auth.resend.haveAccount') : t('auth.resend.noAccount')}{' '}
            <button type="button" data-testid="auth-switch-mode"
              onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}
              className="font-semibold text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors">
              {mode === 'signup' ? t('auth.login.title') : t('auth.register.title')}
            </button>.
          </p>
        </div>

        {/* Cuenta con 2FA (admin): la contrasena ya paso, falta el codigo. */}
        {totpToken ? (
          <Card className="p-8 rounded-2xl shadow-sm text-center" data-testid="totp-step">
            <KeyRound className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--primary))]" />
            <h2 className="font-heading text-xl font-bold mb-2">{t('totp.title')}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('totp.body')}</p>
            <form onSubmit={submitTotp} className="mt-6 space-y-3">
              <Input inputMode="numeric" autoComplete="one-time-code" maxLength={6} autoFocus
                className="h-12 rounded-lg text-center text-xl tracking-[0.4em] font-mono-tech"
                value={totpCode} onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                data-testid="totp-code-input" required />
              <Button type="submit" size="lg" className="w-full h-12 rounded-xl" disabled={loading || totpCode.length !== 6} data-testid="totp-submit">
                {loading ? t('auth.login.loading') : t('totp.submit')}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setTotpToken('')}>{t('verify.backToLogin')}</Button>
            </form>
          </Card>
        ) : pendingEmail ? (
          <Card className="p-8 rounded-2xl shadow-sm text-center" data-testid="register-pending">
            <MailCheck className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--primary))]" />
            <h2 className="font-heading text-xl font-bold mb-2">{t('verify.sentTitle')}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('verify.sentBody', { email: pendingEmail })}
            </p>
            <p className="text-xs text-muted-foreground mt-3">{t('verify.spamHint')}</p>
            <div className="flex flex-col gap-2 mt-6">
              <Button variant="outline" onClick={() => resendVerification(pendingEmail)} disabled={loading} data-testid="register-resend">
                {loading ? t('verify.sending') : t('verify.resendCta')}
              </Button>
              <Button variant="ghost" onClick={() => setPendingEmail('')}>{t('verify.backToLogin')}</Button>
            </div>
          </Card>
        ) : (
        <div>
          {unverified && (
            <div className="mb-6 rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]/10 p-4" data-testid="login-unverified">
              <p className="text-sm leading-relaxed">{t('verify.blockedBody')}</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => resendVerification(unverified)} disabled={loading} data-testid="login-resend">
                {loading ? t('verify.sending') : t('verify.resendCta')}
              </Button>
            </div>
          )}

          <GoogleSignInButton />

          {mode === 'login' ? (
            <form onSubmit={submitLogin} className="space-y-4">
              <div>
                <Label>{t('auth.email')}</Label>
                <Input type="email" className="mt-1.5 h-12 rounded-lg" placeholder={t('auth.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email-input" required />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>{t('auth.password')}</Label>
                  <Link to="/recuperar" className="text-xs text-[hsl(var(--primary))] font-medium hover:underline" data-testid="login-forgot-link">{t('auth.forgotLink')}</Link>
                </div>
                {passwordField(password, (e) => setPassword(e.target.value), showPassword, setShowPassword, 'login-password-input')}
              </div>
              <Button type="submit" size="lg" className="w-full h-12 rounded-xl" disabled={loading} data-testid="login-submit-button">{loading ? t('auth.login.loading') : t('auth.login.submit')}</Button>
              {passkeysSupported() && (
                <button type="button" onClick={passkeyLogin} disabled={loading} data-testid="login-passkey-button"
                  className="w-full inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5">
                  <Fingerprint className="h-4 w-4" /> {t('passkey.loginCta')}
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={submitRegister} className="space-y-4">
              <div>
                <Label>{t('auth.name')}</Label>
                <Input className="mt-1.5 h-12 rounded-lg" value={regName} onChange={(e) => setRegName(e.target.value)} data-testid="register-name-input" required />
              </div>
              <div>
                <Label>{t('auth.email')}</Label>
                <Input type="email" className="mt-1.5 h-12 rounded-lg" placeholder={t('auth.emailPlaceholder')} value={regEmail} onChange={(e) => setRegEmail(e.target.value)} data-testid="register-email-input" required />
              </div>
              <div>
                <Label>{t('auth.password')}</Label>
                {passwordField(regPassword, (e) => setRegPassword(e.target.value), showRegPassword, setShowRegPassword, 'register-password-input')}
                <p className="text-xs text-muted-foreground mt-1.5">{t('auth.passwordHint')}</p>
              </div>
              <div>
                <Label>{t('auth.confirmPassword')}</Label>
                {passwordField(regConfirm, (e) => setRegConfirm(e.target.value), showRegPassword, setShowRegPassword, 'register-confirm-input')}
              </div>

              <div className="space-y-3 pt-2" data-testid="register-consents">
                <Consent checked={consents.age_confirmed} onChange={setConsent('age_confirmed')} testid="consent-age">
                  {t('auth.consent.age')}{' '}
                  <Link to="/info/terminos" target="_blank" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.service')}</Link>
                </Consent>
                <Consent checked={consents.privacy_accepted} onChange={setConsent('privacy_accepted')} testid="consent-privacy">
                  {t('auth.consent.privacy')}{' '}
                  <Link to="/info/privacidad" target="_blank" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.privacy')}</Link>
                </Consent>
                <Consent checked={consents.promos} onChange={setConsent('promos')} testid="consent-promos">
                  {t('auth.consent.promos')}
                </Consent>
                <Consent checked={consents.marketing_email} onChange={setConsent('marketing_email')} testid="consent-email">
                  {t('auth.consent.email')}
                </Consent>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('auth.consent.statement')}
              </p>

              <Button type="submit" size="lg" className="w-full h-12 rounded-xl" disabled={loading || !canRegister} data-testid="register-submit-button">
                {loading ? t('auth.register.loading') : t('auth.consent.submit')}
              </Button>
              {!canRegister && <p className="text-xs text-muted-foreground text-center">{t('auth.consent.required')}</p>}
            </form>
          )}

          {termsLine}
        </div>
        )}

        <div className="mt-7 flex items-center justify-center gap-x-5 gap-y-2 flex-wrap text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('auth.login.bullet1')}</span>
          <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('auth.login.bullet2')}</span>
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('auth.securePayment')}</span>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {t('auth.backToSite')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
