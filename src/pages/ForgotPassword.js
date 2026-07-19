import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

const ForgotPassword = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email, language: (language || 'es').slice(0, 2) });
      setSent(true);
    } catch {
      toast.error(t('auth.forgot.error'));
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <Card className="p-6">
        {sent ? (
          <div className="text-center py-4" data-testid="forgot-sent">
            <MailCheck className="h-10 w-10 mx-auto text-[hsl(var(--primary))]" />
            <h1 className="font-heading text-xl font-bold mt-4">{t('auth.forgot.sentTitle')}</h1>
            <p className="text-sm text-muted-foreground mt-2">{t('auth.forgot.sentBody', { email })}</p>
            <Button asChild className="mt-6 w-full"><Link to="/login">{t('auth.forgot.backToLogin')}</Link></Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1"><KeyRound className="h-5 w-5 text-[hsl(var(--primary))]" /><h1 className="font-heading text-xl font-bold">{t('auth.forgot.title')}</h1></div>
            <p className="text-sm text-muted-foreground">{t('auth.forgot.subtitle')}</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div><Label>{t('auth.email')}</Label><Input type="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="forgot-email-input" required /></div>
              <Button type="submit" className="w-full" disabled={loading} data-testid="forgot-submit-button">{loading ? t('auth.forgot.loading') : t('auth.forgot.submit')}</Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4 text-center"><Link to="/login" className="text-[hsl(var(--primary))] font-medium">{t('auth.forgot.backToLogin')}</Link></p>
          </>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
