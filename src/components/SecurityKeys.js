import React, { useEffect, useState } from 'react';
import { Fingerprint, KeyRound, Trash2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { passkeysSupported, platformAuthAvailable, registerPasskey, passkeyErrorKey } from '@/lib/webauthn';

// Sección de seguridad de Mi cuenta: llaves de acceso para todos y, SOLO para
// admins, el segundo factor por código (decisión de Christian, 2026-07-21).
const SecurityKeys = ({ user, onUserChange }) => {
  const { t } = useLanguage();
  const [keys, setKeys] = useState([]);
  const [busy, setBusy] = useState(false);
  // TOTP (solo admin)
  const [setup, setSetup] = useState(null);      // {qr, otpauth, secret} durante el alta
  const [code, setCode] = useState('');
  const [totpOn, setTotpOn] = useState(!!user?.totp_enabled);

  useEffect(() => {
    api.get('/me/passkeys').then((r) => setKeys(r.data)).catch(() => {});
  }, []);

  const addKey = async () => {
    setBusy(true);
    try {
      const list = await registerPasskey(t('passkey.defaultName'));
      setKeys(list);
      toast.success(t('passkey.added'));
    } catch (err) {
      if (err?.name !== 'NotAllowedError') {
        toast.error(err.response?.data?.detail || t(passkeyErrorKey(err)));
      }
    } finally { setBusy(false); }
  };

  const removeKey = async (id) => {
    try {
      const res = await api.delete(`/me/passkeys/${id}`);
      setKeys(res.data);
      toast.success(t('passkey.removed'));
    } catch { toast.error(t('common.error')); }
  };

  const startTotp = async () => {
    setBusy(true);
    try {
      const res = await api.post('/me/totp/setup');
      setSetup(res.data);
      setCode('');
    } catch (err) { toast.error(err.response?.data?.detail || t('common.error')); }
    finally { setBusy(false); }
  };

  const confirmTotp = async () => {
    setBusy(true);
    try {
      await api.post('/me/totp/enable', { code });
      setTotpOn(true);
      setSetup(null);
      toast.success(t('totp.enabled'));
      onUserChange?.();
    } catch (err) { toast.error(err.response?.data?.detail || t('common.error')); }
    finally { setBusy(false); }
  };

  const disableTotp = async () => {
    setBusy(true);
    try {
      await api.post('/me/totp/disable', { code });
      setTotpOn(false);
      setCode('');
      toast.success(t('totp.disabled'));
      onUserChange?.();
    } catch (err) { toast.error(err.response?.data?.detail || t('common.error')); }
    finally { setBusy(false); }
  };

  return (
    <>
      <Card className="p-6" data-testid="security-passkeys">
        <h3 className="font-heading font-semibold mb-1 flex items-center gap-2">
          <Fingerprint className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('passkey.title')}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t('passkey.explain')}</p>
        {keys.length > 0 && (
          <div className="space-y-2 mb-4">
            {keys.map((k) => (
              <div key={k.id} className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm">
                <div>
                  <div className="font-medium">{k.name}</div>
                  <div className="text-xs text-muted-foreground">{(k.created_at || '').slice(0, 10)}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeKey(k.id)} aria-label={t('passkey.remove')}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        {passkeysSupported() ? (
          <Button variant="outline" onClick={addKey} disabled={busy} data-testid="passkey-add-button">
            <Fingerprint className="h-4 w-4 mr-1.5" /> {t('passkey.addCta')}
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">{t('passkey.unsupported')}</p>
        )}
      </Card>

      {user?.role === 'admin' && (
        <Card className="p-6" data-testid="security-totp">
          <h3 className="font-heading font-semibold mb-1 flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('totp.cardTitle')}
            {totpOn && <Badge className="ml-2 bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]"><ShieldCheck className="h-3 w-3 mr-1" /> {t('totp.on')}</Badge>}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t('totp.explain')}</p>

          {!totpOn && !setup && (
            <Button variant="outline" onClick={startTotp} disabled={busy} data-testid="totp-setup-button">{t('totp.setupCta')}</Button>
          )}

          {!totpOn && setup && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">{t('totp.scan')}</p>
              <img src={setup.qr} alt="QR" className="h-44 w-44 rounded-lg border border-border bg-white p-2" />
              <p className="text-xs text-muted-foreground break-all">{t('totp.manual')}: <span className="font-mono-tech">{setup.secret}</span></p>
              <div className="flex gap-2 items-center">
                <Input inputMode="numeric" maxLength={6} className="w-36 text-center tracking-[0.3em] font-mono-tech"
                  value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} data-testid="totp-enable-code" />
                <Button onClick={confirmTotp} disabled={busy || code.length !== 6} data-testid="totp-enable-button">{t('totp.confirmCta')}</Button>
                <Button variant="ghost" onClick={() => setSetup(null)}>{t('common.cancel')}</Button>
              </div>
            </div>
          )}

          {totpOn && (
            <div className="flex gap-2 items-center">
              <Input inputMode="numeric" maxLength={6} className="w-36 text-center tracking-[0.3em] font-mono-tech"
                value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} data-testid="totp-disable-code" />
              <Button variant="outline" onClick={disableTotp} disabled={busy || code.length !== 6} data-testid="totp-disable-button">{t('totp.disableCta')}</Button>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default SecurityKeys;
