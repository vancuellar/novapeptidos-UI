import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, MailWarning, Store, User } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Activación desde una invitación del admin. El invitado elige su propia
 * contraseña; al hacerlo su correo queda confirmado. Nunca viaja una
 * contraseña por correo.
 */
const ActivateAccount = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { adoptSession } = useAuth();
  const { t } = useLanguage();
  const token = params.get('token');
  const [invite, setInvite] = useState(null);
  const [state, setState] = useState('loading');    // loading | ready | error
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) { setState('error'); setError(t('activate.noToken')); return; }
    api.get(`/auth/invitation/${token}`)
      .then((r) => { setInvite(r.data); setState('ready'); })
      .catch((err) => { setState('error'); setError(err.response?.data?.detail || t('activate.invalid')); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) { toast.error(t('auth.reset.mismatch')); return; }
    setSaving(true);
    try {
      const r = await api.post('/auth/activate', { token, password });
      adoptSession(r.data.token, r.data.user);
      toast.success(t('activate.done'));
      navigate(r.data.user.role === 'distributor' ? '/distribuidor' : '/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || t('activate.failed'));
    } finally { setSaving(false); }
  };

  const isDistributor = invite?.role === 'distributor';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-14">
      <Card className="w-full max-w-md p-8" data-testid="activate-card">
        {state === 'loading' && (
          <div className="text-center">
            <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-[hsl(var(--primary))]" />
            <p className="text-sm text-muted-foreground">{t('activate.loading')}</p>
          </div>
        )}

        {state === 'error' && (
          <div className="text-center">
            <MailWarning className="h-10 w-10 mx-auto mb-4 text-[hsl(var(--warning-foreground))]" />
            <h1 className="font-heading text-xl font-bold mb-2">{t('activate.errorTitle')}</h1>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <Link to="/login" className="text-sm text-[hsl(var(--primary))] hover:underline">{t('verify.backToLogin')}</Link>
          </div>
        )}

        {state === 'ready' && invite && (
          <>
            <div className="text-center mb-6">
              <div className="h-12 w-12 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center mx-auto mb-3">
                {isDistributor ? <Store className="h-6 w-6 text-[hsl(var(--primary))]" /> : <User className="h-6 w-6 text-[hsl(var(--primary))]" />}
              </div>
              <h1 className="font-heading text-xl font-bold">{t('activate.title', { name: invite.name })}</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {isDistributor ? t('activate.subtitleDistributor') : t('activate.subtitle')}
              </p>
              <p className="text-sm font-medium mt-2">{invite.email}</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label>{t('activate.choosePassword')}</Label>
                <div className="relative mt-1.5">
                  <Input type={show ? 'text' : 'password'} className="pr-10" minLength={6} required
                    value={password} onChange={(e) => setPassword(e.target.value)} data-testid="activate-password" />
                  <button type="button" onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={t(show ? 'auth.hidePassword' : 'auth.showPassword')}>
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{t('auth.passwordHint')}</p>
              </div>
              <div>
                <Label>{t('auth.confirmPassword')}</Label>
                <Input type={show ? 'text' : 'password'} className="mt-1.5" minLength={6} required
                  value={confirm} onChange={(e) => setConfirm(e.target.value)} data-testid="activate-confirm" />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={saving} data-testid="activate-submit">
                {saving ? t('activate.saving') : t('activate.cta')}
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
};

export default ActivateAccount;
