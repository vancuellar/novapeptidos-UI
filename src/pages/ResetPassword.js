import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

const ResetPassword = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) { toast.error(t('auth.reset.mismatch')); return; }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      toast.success(t('auth.reset.done'));
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.detail || t('auth.reset.error'));
    } finally { setLoading(false); }
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">{t('auth.reset.noToken')}</p>
          <Button asChild className="mt-4 w-full"><Link to="/recuperar">{t('auth.forgot.title')}</Link></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-1"><LockKeyhole className="h-5 w-5 text-[hsl(var(--primary))]" /><h1 className="font-heading text-xl font-bold">{t('auth.reset.title')}</h1></div>
        <p className="text-sm text-muted-foreground">{t('auth.reset.subtitle')}</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label>{t('auth.reset.newPassword')}</Label>
            <div className="relative mt-1.5">
              <Input type={show ? 'text' : 'password'} className="pr-10" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} data-testid="reset-password-input" required />
              <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={t(show ? 'auth.hidePassword' : 'auth.showPassword')}>
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div><Label>{t('auth.reset.confirmPassword')}</Label><Input type={show ? 'text' : 'password'} className="mt-1.5" value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6} data-testid="reset-confirm-input" required /></div>
          <Button type="submit" className="w-full" disabled={loading} data-testid="reset-submit-button">{loading ? t('auth.reset.loading') : t('auth.reset.submit')}</Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
