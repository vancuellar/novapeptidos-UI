import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, ShieldCheck, Truck, Lock, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { BrandMark } from '@/components/BrandLogo';

// Casilla de consentimiento. Etiqueta clicable completa: en móvil el cuadrito
// solo es un blanco de 20 px y la gente falla el toque.
const Consent = ({ checked, onChange, testid, children }) => (
  <label className="flex items-start gap-3 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} data-testid={testid}
      className="h-5 w-5 mt-0.5 shrink-0 accent-[hsl(var(--primary))] cursor-pointer" />
    <span className="text-sm leading-relaxed">{children}</span>
  </label>
);

const Login = () => {
  const { login, register, adoptSession } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
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
  // Los dos primeros son obligatorios; los otros tres son opt-in real (nacen apagados).
  const [consents, setConsents] = useState({
    age_confirmed: false, privacy_accepted: false,
    promos: false, marketing_email: false, marketing_sms: false,
  });
  const setConsent = (key) => (e) => setConsents((prev) => ({ ...prev, [key]: e.target.checked }));
  const canRegister = consents.age_confirmed && consents.privacy_accepted;

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUnverified('');
    try {
      const user = await login(email, password);
      toast.success(t('auth.toast.welcome'));
      navigate(user.role === 'admin' ? '/admin' : '/cuenta');
    } catch (err) {
      if (err.response?.status === 403) setUnverified(email.trim());
      else toast.error(err.response?.data?.detail || t('auth.toast.loginError'));
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
      <Input type={show ? 'text' : 'password'} className="pr-10" placeholder="••••••••" minLength={6} value={value} onChange={onChange} data-testid={testid} required />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={t(show ? 'auth.hidePassword' : 'auth.showPassword')}>
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );

  const termsLine = (
    <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
      {t('auth.terms.pre')}{' '}
      <Link to="/info/terminos" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.service')}</Link>{' '}
      {t('auth.terms.and')}{' '}
      <Link to="/info/privacidad" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.privacy')}</Link>.
    </p>
  );

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-14 relative">
      {/* Vuelta al inicio arriba a la izquierda, como en el alta de Resend. */}
      <Link to="/" data-testid="auth-back-home"
        className="absolute left-4 top-6 sm:left-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> {t('common.home')}
      </Link>

      <div className="w-full max-w-md">
        {/* Marca centrada + título grande: proporciones del alta de Resend,
            con nuestro logo y nuestros colores. */}
        <div className="flex flex-col items-center text-center mb-8">
          <BrandMark className="h-9 mb-6" />
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">{t('auth.portal.title')}</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs">{t('auth.portal.subtitle')}</p>
        </div>

        {/* Registrado: falta abrir el enlace del correo para poder entrar. */}
        {pendingEmail ? (
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
        <Card className="p-6 sm:p-8 rounded-2xl shadow-sm">
          {unverified && (
            <div className="mb-5 rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]/10 p-4" data-testid="login-unverified">
              <p className="text-sm leading-relaxed">{t('verify.blockedBody')}</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => resendVerification(unverified)} disabled={loading} data-testid="login-resend">
                {loading ? t('verify.sending') : t('verify.resendCta')}
              </Button>
            </div>
          )}
          <Tabs defaultValue={params.get('tab') === 'signup' ? 'signup' : 'login'}>
            <TabsList className="w-full">
              <TabsTrigger value="login" className="flex-1" data-testid="auth-tab-login">{t('auth.login.title')}</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1" data-testid="auth-tab-signup">{t('auth.register.title')}</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={submitLogin} className="space-y-4">
                <div>
                  <Label>{t('auth.email')}</Label>
                  <Input type="email" className="mt-1.5" placeholder={t('auth.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email-input" required />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label>{t('auth.password')}</Label>
                    <Link to="/recuperar" className="text-xs text-[hsl(var(--primary))] font-medium hover:underline" data-testid="login-forgot-link">{t('auth.forgotLink')}</Link>
                  </div>
                  {passwordField(password, (e) => setPassword(e.target.value), showPassword, setShowPassword, 'login-password-input')}
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={loading} data-testid="login-submit-button">{loading ? t('auth.login.loading') : t('auth.login.submit')}</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={submitRegister} className="space-y-4">
                <div>
                  <Label>{t('auth.name')}</Label>
                  <Input className="mt-1.5" value={regName} onChange={(e) => setRegName(e.target.value)} data-testid="register-name-input" required />
                </div>
                <div>
                  <Label>{t('auth.email')}</Label>
                  <Input type="email" className="mt-1.5" placeholder={t('auth.emailPlaceholder')} value={regEmail} onChange={(e) => setRegEmail(e.target.value)} data-testid="register-email-input" required />
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
                  <Consent checked={consents.promos} onChange={setConsent('promos')} testid="consent-promos">
                    {t('auth.consent.promos')}
                  </Consent>
                  <Consent checked={consents.marketing_email} onChange={setConsent('marketing_email')} testid="consent-email">
                    {t('auth.consent.email')}
                  </Consent>
                  <Consent checked={consents.marketing_sms} onChange={setConsent('marketing_sms')} testid="consent-sms">
                    {t('auth.consent.sms')}
                  </Consent>
                  <Consent checked={consents.privacy_accepted} onChange={setConsent('privacy_accepted')} testid="consent-privacy">
                    {t('auth.consent.privacy')}{' '}
                    <Link to="/info/privacidad" target="_blank" className="text-[hsl(var(--primary))] font-medium hover:underline underline-offset-2">{t('auth.terms.privacy')}</Link>
                  </Consent>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('auth.consent.statement')}
                </p>

                <Button type="submit" size="lg" className="w-full" disabled={loading || !canRegister} data-testid="register-submit-button">
                  {loading ? t('auth.register.loading') : t('auth.consent.submit')}
                </Button>
                {!canRegister && <p className="text-xs text-muted-foreground text-center">{t('auth.consent.required')}</p>}
              </form>
            </TabsContent>
          </Tabs>

          {termsLine}
        </Card>
        )}

        <div className="mt-6 flex items-center justify-center gap-x-5 gap-y-2 flex-wrap text-xs text-muted-foreground">
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
