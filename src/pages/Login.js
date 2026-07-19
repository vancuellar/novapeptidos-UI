import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Truck, BadgeCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const Login = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="flex items-center gap-2 mb-4"><div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center"><FlaskConical className="h-5 w-5 text-[hsl(var(--primary-foreground))]" /></div><span className="font-heading font-bold text-xl">Exygen Labs</span></div>
          <h2 className="font-heading text-2xl font-bold tracking-tight">{t('auth.login.sideTitle')}</h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('auth.login.bullet1')}</li>
            <li className="flex gap-2"><Truck className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('auth.login.bullet2')}</li>
            <li className="flex gap-2"><BadgeCheck className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('auth.login.bullet3')}</li>
          </ul>
        </div>
        <Card className="p-6">
          <h1 className="font-heading text-2xl font-bold">{t('auth.login.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t('auth.login.subtitle')}</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><Label>{t('auth.email')}</Label><Input type="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="login-email-input" required /></div>
            <div>
              <Label>{t('auth.password')}</Label>
              <div className="relative mt-1.5">
                <Input type={showPassword ? 'text' : 'password'} className="pr-10" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="login-password-input" required />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={t(showPassword ? 'auth.hidePassword' : 'auth.showPassword')} data-testid="login-toggle-password">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-right mt-1.5">
                <Link to="/recuperar" className="text-xs text-[hsl(var(--primary))] font-medium" data-testid="login-forgot-link">{t('auth.forgotLink')}</Link>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading} data-testid="login-submit-button">{loading ? t('auth.login.loading') : t('auth.login.submit')}</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4 text-center">{t('auth.login.noAccount')} <Link to="/registro" className="text-[hsl(var(--primary))] font-medium">{t('auth.login.register')}</Link></p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
