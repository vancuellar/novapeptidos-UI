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
import { useAcuerdo, AcuerdoEnActivacion } from '@/components/AcuerdoDistribuidor';

/**
 * Activación desde una invitación del admin. El invitado elige su propia
 * contraseña; al hacerlo su correo queda confirmado. Nunca viaja una
 * contraseña por correo.
 *
 * ⛔ ACUERDO DE DISTRIBUIDOR. Si quien activa es distribuidor Y el interruptor
 * del backend está encendido, aquí se le enseña el acuerdo completo con una
 * casilla NO premarcada: es el momento en que entra al canal, así que es el
 * momento de firmar. Apagado —como está hoy— `estado.activo` es false y esta
 * pantalla es exactamente la de siempre.
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
  // ⛔ La casilla del acuerdo. Arranca en false SIEMPRE (art. 93 Bis del Código
  // de Comercio: el consentimiento es un acto del usuario, no un descuido).
  const [aceptaAcuerdo, setAceptaAcuerdo] = useState(false);
  const { estado: acuerdo } = useAcuerdo();

  useEffect(() => {
    if (!token) { setState('error'); setError(t('activate.noToken')); return; }
    api.get(`/auth/invitation/${token}`)
      .then((r) => { setInvite(r.data); setState('ready'); })
      .catch((err) => { setState('error'); setError(err.response?.data?.detail || t('activate.invalid')); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const isDistributor = invite?.role === 'distributor';
  // Sólo se le pide firmar si el backend lo tiene encendido Y viene al canal.
  const pideAcuerdo = Boolean(acuerdo?.activo && isDistributor);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) { toast.error(t('auth.reset.mismatch')); return; }
    if (pideAcuerdo && !aceptaAcuerdo) { toast.error(t('acuerdo.mustCheck')); return; }
    setSaving(true);
    try {
      const r = await api.post('/auth/activate', {
        token,
        password,
        // Van siempre, pero el servidor las ignora con el interruptor apagado.
        acepta_acuerdo: pideAcuerdo && aceptaAcuerdo,
        acuerdo_version: acuerdo?.version || null,
      });
      adoptSession(r.data.token, r.data.user);
      toast.success(t('activate.done'));
      navigate(r.data.user.role === 'distributor' ? '/distribuidor' : '/cuenta');
    } catch (err) {
      toast.error(err.response?.data?.detail || t('activate.failed'));
    } finally { setSaving(false); }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-14">
      {/* La tarjeta se ensancha SÓLO cuando hay que leer un contrato: 20
          cláusulas en una columna de móvil no se leen, se abandonan. */}
      <Card className={`w-full p-8 ${pideAcuerdo ? 'max-w-2xl' : 'max-w-md'}`} data-testid="activate-card">
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
              {/* ⛔ El acuerdo, sólo si el interruptor está encendido y viene al
                  canal. Apagado no se pinta nada y el formulario es el de siempre. */}
              <AcuerdoEnActivacion estado={acuerdo} mostrar={isDistributor}
                marcada={aceptaAcuerdo} onChange={setAceptaAcuerdo} />
              <Button type="submit" size="lg" className="w-full"
                disabled={saving || (pideAcuerdo && !aceptaAcuerdo)} data-testid="activate-submit">
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
