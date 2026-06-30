import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const Register = () => {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error(t('auth.toast.passwordLength')); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success(t('auth.toast.created'));
      navigate('/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.toast.registerError'));
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center"><FlaskConical className="h-5 w-5 text-[hsl(var(--primary-foreground))]" /></div><span className="font-heading font-bold text-xl">Nova Peptides</span></div>
        <h1 className="font-heading text-2xl font-bold">{t('auth.register.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('auth.register.subtitle')}</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><Label>{t('auth.name')}</Label><Input className="mt-1.5" value={form.name} onChange={(e) => set('name', e.target.value)} data-testid="register-name-input" required /></div>
          <div><Label>{t('auth.email')}</Label><Input type="email" className="mt-1.5" value={form.email} onChange={(e) => set('email', e.target.value)} data-testid="register-email-input" required /></div>
          <div><Label>{t('auth.password')}</Label><Input type="password" className="mt-1.5" value={form.password} onChange={(e) => set('password', e.target.value)} data-testid="register-password-input" required /></div>
          <Button type="submit" className="w-full" disabled={loading} data-testid="register-submit-button">{loading ? t('auth.register.loading') : t('auth.register.submit')}</Button>
        </form>
        <p className="text-sm text-muted-foreground mt-4 text-center">{t('auth.register.haveAccount')} <Link to="/login" className="text-[hsl(var(--primary))] font-medium">{t('auth.register.loginLink')}</Link></p>
      </Card>
    </div>
  );
};

export default Register;
