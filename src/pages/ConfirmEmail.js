import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, MailWarning, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

/** Confirma el correo desde el enlace y deja la sesión iniciada. */
const ConfirmEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { adoptSession } = useAuth();
  const { t, language } = useLanguage();
  const [state, setState] = useState('checking');   // checking | ok | error
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const ran = useRef(false);                         // el token se consume una vez

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const token = params.get('token');
    if (!token) { setState('error'); setError(t('verify.noToken')); return; }
    api.post('/auth/verify-email', { token })
      .then((r) => {
        adoptSession(r.data.token, r.data.user);
        setState('ok');
        setTimeout(() => navigate(r.data.user.role === 'admin' ? '/admin' : '/cuenta'), 1600);
      })
      .catch((err) => {
        setState('error');
        setError(err.response?.data?.detail || t('verify.failed'));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resend = async () => {
    if (!email.trim()) { toast.error(t('verify.needEmail')); return; }
    setSending(true);
    try {
      await api.post('/auth/resend-verification', { email: email.trim(), language });
      toast.success(t('verify.resent'));
    } catch { toast.error(t('verify.resendFailed')); }
    finally { setSending(false); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-14">
      <Card className="w-full max-w-md p-8 text-center" data-testid="confirm-card">
        {state === 'checking' && (
          <>
            <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-[hsl(var(--primary))]" />
            <p className="text-sm text-muted-foreground">{t('verify.checking')}</p>
          </>
        )}

        {state === 'ok' && (
          <>
            <CheckCircle2 className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--success))]" />
            <h1 className="font-heading text-xl font-bold mb-2">{t('verify.okTitle')}</h1>
            <p className="text-sm text-muted-foreground">{t('verify.okBody')}</p>
          </>
        )}

        {state === 'error' && (
          <>
            <MailWarning className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--warning-foreground))]" />
            <h1 className="font-heading text-xl font-bold mb-2">{t('verify.errorTitle')}</h1>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <div className="text-left space-y-2">
              <Label className="text-sm">{t('verify.resendLabel')}</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')} data-testid="confirm-resend-email" />
              <Button className="w-full" onClick={resend} disabled={sending} data-testid="confirm-resend">
                {sending ? t('verify.sending') : t('verify.resendCta')}
              </Button>
            </div>
            <Link to="/login" className="inline-block mt-6 text-sm text-[hsl(var(--primary))] hover:underline">
              {t('verify.backToLogin')}
            </Link>
          </>
        )}
      </Card>
    </div>
  );
};

export default ConfirmEmail;
