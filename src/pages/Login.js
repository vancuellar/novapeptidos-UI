import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FlaskConical, Eye, EyeOff, Mail, LockKeyhole, User, Zap, ShieldCheck, PackageSearch, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const BENEFIT_ICONS = [Zap, ShieldCheck, PackageSearch];

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

  const eyeButton = (show, setShow) => (
    <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={t(show ? 'auth.hidePassword' : 'auth.showPassword')}>
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  const iconInput = (Icon, props, eye = null) => (
    <div className="relative mt-1.5">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input {...props} className={`pl-9 ${eye ? 'pr-10' : ''}`} />
      {eye}
    </div>
  );

  const termsLine = (
    <div className="text-center text-xs text-muted-foreground mt-5">
      {t('auth.terms.pre')}<br />
      <Link to="/info/terminos" className="text-[hsl(var(--primary))] font-medium underline underline-offset-2">{t('auth.terms.service')}</Link> {t('auth.terms.and')} <Link to="/info/privacidad" className="text-[hsl(var(--primary))] font-medium underline underline-offset-2">{t('auth.terms.privacy')}</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Panel lateral estilo comunidad */}
        <div className="hidden md:block">
          <div className="flex items-center gap-2 mb-6"><div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center"><FlaskConical className="h-5 w-5 text-[hsl(var(--primary-foreground))]" /></div><span className="font-heading font-bold text-xl">Exygen Labs</span></div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight leading-tight">{t('auth.side.title')}</h2>
          <p className="mt-4 text-muted-foreground max-w-sm">{t('auth.side.subtitle')}</p>
          <div className="mt-8 space-y-3 max-w-md">
            {[1, 2, 3].map((n, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <Card key={n} className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-[hsl(var(--secondary))] border border-border flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-[hsl(var(--primary))]" /></div>
                  <span className="text-sm font-medium">{t(`auth.side.benefit${n}`)}</span>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((letter) => (
                <div key={letter} className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] border border-border flex items-center justify-center text-[10px] font-medium text-muted-foreground">{letter}</div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{t('auth.side.hplc')}</span>
          </div>
        </div>

        {/* Tarjeta de acceso */}
        <div>
          <Card className="p-6 sm:p-8">
            <Tabs defaultValue="login">
              <TabsList className="w-full">
                <TabsTrigger value="login" className="flex-1" data-testid="auth-tab-login">{t('auth.login.title')}</TabsTrigger>
                <TabsTrigger value="signup" className="flex-1" data-testid="auth-tab-signup">{t('auth.register.title')}</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <form onSubmit={submitLogin} className="space-y-4">
                  <div>
                    <Label>{t('auth.email')}</Label>
                    {iconInput(Mail, { type: 'email', placeholder: t('auth.emailPlaceholder'), value: email, onChange: (e) => setEmail(e.target.value), 'data-testid': 'login-email-input', required: true })}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <Label>{t('auth.password')}</Label>
                      <Link to="/recuperar" className="text-xs text-[hsl(var(--primary))] font-medium" data-testid="login-forgot-link">{t('auth.forgotLink')}</Link>
                    </div>
                    {iconInput(LockKeyhole, { type: showPassword ? 'text' : 'password', placeholder: '••••••••', value: password, onChange: (e) => setPassword(e.target.value), 'data-testid': 'login-password-input', required: true }, eyeButton(showPassword, setShowPassword))}
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading} data-testid="login-submit-button"><CheckCircle2 className="h-4 w-4 mr-2" /> {loading ? t('auth.login.loading') : t('auth.login.submit')}</Button>
                </form>
                {termsLine}
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <form onSubmit={submitRegister} className="space-y-4">
                  <div>
                    <Label>{t('auth.name')}</Label>
                    {iconInput(User, { value: regName, onChange: (e) => setRegName(e.target.value), 'data-testid': 'register-name-input', required: true })}
                  </div>
                  <div>
                    <Label>{t('auth.email')}</Label>
                    {iconInput(Mail, { type: 'email', placeholder: t('auth.emailPlaceholder'), value: regEmail, onChange: (e) => setRegEmail(e.target.value), 'data-testid': 'register-email-input', required: true })}
                  </div>
                  <div>
                    <Label>{t('auth.password')}</Label>
                    {iconInput(LockKeyhole, { type: showRegPassword ? 'text' : 'password', placeholder: '••••••••', minLength: 6, value: regPassword, onChange: (e) => setRegPassword(e.target.value), 'data-testid': 'register-password-input', required: true }, eyeButton(showRegPassword, setShowRegPassword))}
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading} data-testid="register-submit-button"><CheckCircle2 className="h-4 w-4 mr-2" /> {loading ? t('auth.register.loading') : t('auth.register.submit')}</Button>
                </form>
                {termsLine}
              </TabsContent>
            </Tabs>
          </Card>
          <div className="text-center mt-6">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> {t('auth.backToSite')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
