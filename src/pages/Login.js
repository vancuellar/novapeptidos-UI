import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, MailCheck, Fingerprint, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { MoleculeMark } from '@/components/BrandLogo';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { passkeysSupported, loginWithPasskey } from '@/lib/webauthn';

// Casilla de consentimiento, monocroma. Etiqueta clicable completa: en móvil
// el cuadrito solo es un blanco de 20 px y la gente falla el toque.
const Consent = ({ checked, onChange, testid, children }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} data-testid={testid}
      className="h-5 w-5 mt-0.5 shrink-0 accent-white cursor-pointer" />
    <span className="text-sm leading-relaxed">{children}</span>
  </label>
);

// El nombre de la marca dentro del título, como en el logotipo: MAYÚSCULAS
// con espaciado. Funciona en los 3 idiomas porque todos dicen "Exygen Labs".
const BrandTitle = ({ text }) => {
  const [pre, post] = text.split('Exygen Labs');
  return (
    <>
      {pre}
      <span className="uppercase tracking-[0.12em] whitespace-nowrap">Exygen&nbsp;Labs</span>
      {post}
    </>
  );
};

// Enlace monocromo estilo Resend: texto claro, subrayado tenue.
const monoLink = 'text-foreground underline underline-offset-4 decoration-white/25 hover:decoration-white transition-colors';
// CTA monocromo estilo Resend: gris oscuro con borde tenue, nada de color.
const monoCta = 'w-full h-12 rounded-xl bg-[#1e1f22] border border-white/10 text-white text-sm font-semibold hover:bg-[#2a2b2f] transition-colors disabled:opacity-40 disabled:pointer-events-none';

// Pantallas de entrada y registro al estilo Resend (gusto explícito de
// Christian): SIEMPRE oscuras, monocromas y extremadamente minimalistas.
// El registro pide solo nombre/correo/contraseña; los consentimientos son el
// PASO SIGUIENTE (diálogo), no un formulario kilométrico.
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
  const [loading, setLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');   // registrado, falta confirmar
  const [unverified, setUnverified] = useState('');       // intento de entrar sin confirmar
  const [totpToken, setTotpToken] = useState('');         // cuenta con 2FA: falta el codigo
  const [totpCode, setTotpCode] = useState('');
  const [consentOpen, setConsentOpen] = useState(false);  // paso 2 del registro
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

  // Paso 1 del registro: solo valida el formulario y abre los consentimientos.
  const openConsents = (e) => {
    e.preventDefault();
    setConsentOpen(true);
  };

  // Paso 2: con las casillas obligatorias marcadas, ahora sí se crea la cuenta.
  const submitRegister = async () => {
    if (!canRegister) { toast.error(t('auth.consent.required')); return; }
    setLoading(true);
    try {
      const res = await register(regName, regEmail, regPassword, consents);
      setConsentOpen(false);
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
      <Link to="/info/terminos" className={monoLink}>{t('auth.terms.service')}</Link>{' '}
      {t('auth.terms.and')}{' '}
      <Link to="/info/privacidad" className={monoLink}>{t('auth.terms.privacy')}</Link>.
    </p>
  );

  return (
    // Pantalla independiente SIEMPRE oscura, como el alta de Resend (orden de
    // Christian): clase `dark` propia para que todos los tokens del tema se
    // resuelvan en oscuro aunque el sitio esté en claro, lienzo negro y un
    // resplandor suave arriba a la derecha.
    <div className="dark min-h-screen flex items-center justify-center px-4 py-14 relative overflow-hidden bg-[#020204] text-foreground">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-15%] h-[560px] w-[560px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle at center, hsl(0 0% 85% / 0.35), transparent 65%)' }} />
      {/* Vuelta al sitio arriba a la izquierda: aquí no hay barra superior. */}
      <Link to="/" data-testid="auth-back-home"
        className="absolute left-4 top-6 sm:left-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> {t('auth.backToSite')}
      </Link>

      <div className="w-full max-w-md relative">
        <div className="flex flex-col items-center text-center mb-9">
          <MoleculeMark className="h-12 mb-7" />
          <h1 className="font-brand text-3xl sm:text-4xl tracking-tight">
            <BrandTitle text={mode === 'signup' ? t('auth.resend.signupTitle') : t('auth.resend.loginTitle')} />
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            {mode === 'signup' ? t('auth.resend.haveAccount') : t('auth.resend.noAccount')}{' '}
            <button type="button" data-testid="auth-switch-mode"
              onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}
              className={`font-semibold ${monoLink}`}>
              {mode === 'signup' ? t('auth.login.title') : t('auth.register.title')}
            </button>.
          </p>
        </div>

        {/* Cuenta con 2FA (admin): la contrasena ya paso, falta el codigo. */}
        {totpToken ? (
          <Card className="p-8 rounded-2xl shadow-sm text-center" data-testid="totp-step">
            <KeyRound className="h-10 w-10 mx-auto mb-4 text-foreground" />
            <h2 className="font-heading text-xl font-bold mb-2">{t('totp.title')}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('totp.body')}</p>
            <form onSubmit={submitTotp} className="mt-6 space-y-3">
              <Input inputMode="numeric" autoComplete="one-time-code" maxLength={6} autoFocus
                className="h-12 rounded-lg text-center text-xl tracking-[0.4em] font-mono-tech"
                value={totpCode} onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                data-testid="totp-code-input" required />
              <button type="submit" className={monoCta} disabled={loading || totpCode.length !== 6} data-testid="totp-submit">
                {loading ? t('auth.login.loading') : t('totp.submit')}
              </button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setTotpToken('')}>{t('verify.backToLogin')}</Button>
            </form>
          </Card>
        ) : pendingEmail ? (
          <Card className="p-8 rounded-2xl shadow-sm text-center" data-testid="register-pending">
            <MailCheck className="h-10 w-10 mx-auto mb-4 text-foreground" />
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
            <div className="mb-6 rounded-xl border border-border bg-secondary/40 p-4" data-testid="login-unverified">
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
                  <Link to="/recuperar" className="text-xs text-muted-foreground hover:text-foreground transition-colors" data-testid="login-forgot-link">{t('auth.forgotLink')}</Link>
                </div>
                {passwordField(password, (e) => setPassword(e.target.value), showPassword, setShowPassword, 'login-password-input')}
              </div>
              <button type="submit" className={monoCta} disabled={loading} data-testid="login-submit-button">{loading ? t('auth.login.loading') : t('auth.login.submit')}</button>
              {passkeysSupported() && (
                <button type="button" onClick={passkeyLogin} disabled={loading} data-testid="login-passkey-button"
                  className="w-full inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5">
                  <Fingerprint className="h-4 w-4" /> {t('passkey.loginCta')}
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={openConsents} className="space-y-4">
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
              </div>
              <button type="submit" className={monoCta} disabled={loading} data-testid="register-submit-button">
                {t('auth.register.title')}
              </button>
            </form>
          )}

          {termsLine}
        </div>
        )}

      </div>

      {/* Paso 2 del registro: los consentimientos. El dialogo se monta en un
          portal fuera de este arbol, por eso lleva su propia clase `dark`. */}
      <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
        <DialogContent className="dark max-w-md bg-[#0d0d0f] border-white/10 text-foreground" data-testid="register-consent-dialog">
          <DialogHeader><DialogTitle className="font-brand">{t('auth.google.consentTitle')}</DialogTitle></DialogHeader>
          <div className="space-y-3" data-testid="register-consents">
            <Consent checked={consents.age_confirmed} onChange={setConsent('age_confirmed')} testid="consent-age">
              {t('auth.consent.age')}{' '}
              <Link to="/info/terminos" target="_blank" className={monoLink}>{t('auth.terms.service')}</Link>
            </Consent>
            <Consent checked={consents.privacy_accepted} onChange={setConsent('privacy_accepted')} testid="consent-privacy">
              {t('auth.consent.privacy')}{' '}
              <Link to="/info/privacidad" target="_blank" className={monoLink}>{t('auth.terms.privacy')}</Link>
            </Consent>
            <Consent checked={consents.promos} onChange={setConsent('promos')} testid="consent-promos">
              {t('auth.consent.promos')}
            </Consent>
            <Consent checked={consents.marketing_email} onChange={setConsent('marketing_email')} testid="consent-email">
              {t('auth.consent.email')}
            </Consent>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{t('auth.consent.statement')}</p>
          <button type="button" className={monoCta} onClick={submitRegister} disabled={loading || !canRegister} data-testid="register-consent-submit">
            {loading ? t('auth.register.loading') : t('auth.consent.submit')}
          </button>
          {!canRegister && <p className="text-xs text-muted-foreground text-center">{t('auth.consent.required')}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
