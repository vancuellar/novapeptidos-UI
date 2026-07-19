import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, ShieldCheck, Truck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrandMark } from '@/components/BrandLogo';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const Login = () => {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(t('auth.toast.welcome'));
      navigate(user.role === 'admin' ? '/admin' : '/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.toast.loginError'));
    } finally { setLoading(false); }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(regName, regEmail, regPassword);
      toast.success(t('auth.toast.created'));
      navigate('/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.toast.registerError'));
    } finally { setLoading(false); }
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
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
          <BrandMark className="h-9 mb-5" />
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{t('auth.portal.title')}</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">{t('auth.portal.subtitle')}</p>
        </div>

        <Card className="p-6 sm:p-8 rounded-2xl shadow-sm">
          <Tabs defaultValue="login">
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
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={loading} data-testid="register-submit-button">{loading ? t('auth.register.loading') : t('auth.register.submit')}</Button>
              </form>
            </TabsContent>
          </Tabs>

          {termsLine}
        </Card>

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
