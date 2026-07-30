import React, { useEffect, useState } from 'react';
import { User, MapPin, CreditCard, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SecurityKeys from '@/components/SecurityKeys';
import { toast } from 'sonner';
import api, { PAYMENT_METHODS } from '@/lib/api';
import { CountrySelect, PhoneField, StateField, composePhone, parsePhone } from '@/components/CountryPhoneFields';
import { useLanguage } from '@/context/LanguageContext';

// "Perfil": datos personales, direcciones, forma de pago preferida y seguridad.
//
// Vive aquí porque el MISMO bloque se muestra en los dos tableros. El
// distribuidor tenía que salirse de su panel a /cuenta sólo para cambiar su
// teléfono o su dirección; ahora lo tiene bajo su propio menú (2026-07-30).
const EMPTY_ADDR = { address: '', address_2: '', city: '', state: '', postal_code: '', country: 'MX' };

// Los mismos campos que el checkout, a propósito: si aquí faltara la segunda línea,
// editar el perfil BORRARÍA el interior que el cliente escribió al comprar.
const AddressFields = ({ value, onChange, t, testid }) => (
  <div className="grid sm:grid-cols-2 gap-3">
    <div className="sm:col-span-2"><Label>{t('profile.addr.street')}</Label><Input className="mt-1.5" value={value.address} onChange={(e) => onChange({ ...value, address: e.target.value })} data-testid={`${testid}-street`} /></div>
    <div className="sm:col-span-2"><Label>{t('checkout.address2')}</Label><Input className="mt-1.5" value={value.address_2 || ''} onChange={(e) => onChange({ ...value, address_2: e.target.value })} placeholder={t('checkout.address2Placeholder')} data-testid={`${testid}-street2`} /></div>
    <div><Label>{t('profile.addr.city')}</Label><Input className="mt-1.5" value={value.city} onChange={(e) => onChange({ ...value, city: e.target.value })} /></div>
    <div><Label>{t('profile.addr.state')}</Label><StateField country={value.country} value={value.state} onChange={(v) => onChange({ ...value, state: v })} testid={`${testid}-state`} /></div>
    <div><Label>{t('profile.addr.zip')}</Label><Input className="mt-1.5" value={value.postal_code} onChange={(e) => onChange({ ...value, postal_code: e.target.value })} /></div>
    {/* Cambiar de país limpia el estado: "Yucatán" no existe en Canadá. */}
    <div><Label>{t('profile.addr.country')}</Label><CountrySelect value={value.country} onChange={(v) => onChange({ ...value, country: v, state: '' })} testid={`${testid}-country`} /></div>
  </div>
);

const PasswordInput = ({ value, onChange, show, setShow, t, testid }) => (
  <div className="relative mt-1.5">
    <Input type={show ? 'text' : 'password'} className="pr-10" value={value} onChange={onChange} minLength={6} data-testid={testid} />
    <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={t(show ? 'auth.hidePassword' : 'auth.showPassword')}>
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  </div>
);

const ProfilePanel = ({ user, onUserChange }) => {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);

  // datos personales
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('MX');
  // direcciones
  const [shipping, setShipping] = useState(EMPTY_ADDR);
  const [billing, setBilling] = useState(EMPTY_ADDR);
  const [sameBilling, setSameBilling] = useState(true);
  // pago
  const [preferredPayment, setPreferredPayment] = useState('');
  // seguridad
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name || '');
    setEmail(user.email || '');
    const saved = parsePhone(user.phone);
    setPhone(saved.national);
    setPhoneCountry(saved.country);
    setShipping({ ...EMPTY_ADDR, ...(user.shipping_address || {}) });
    setBilling({ ...EMPTY_ADDR, ...(user.billing_address || {}) });
    setSameBilling(!user.billing_address || !user.billing_address.address);
    setPreferredPayment(user.preferred_payment || '');
  }, [user]);

  if (!user) return null;

  const emailChanged = email.trim().toLowerCase() !== (user.email || '').toLowerCase();

  const saveProfile = async () => {
    if (!name.trim()) { toast.error(t('profile.toast.nameRequired')); return; }
    if (emailChanged && !emailPassword) { toast.error(t('profile.toast.passwordForEmail')); return; }
    setSaving(true);
    try {
      await api.put('/auth/profile', {
        name,
        phone: composePhone(phoneCountry, phone),
        email: emailChanged ? email.trim() : undefined,
        current_password: emailChanged ? emailPassword : undefined,
        shipping_address: shipping,
        billing_address: sameBilling ? shipping : billing,
        preferred_payment: preferredPayment,
      });
      await onUserChange?.();
      setEmailPassword('');
      toast.success(t('profile.toast.saved'));
    } catch (err) {
      toast.error(err.response?.data?.detail || t('profile.toast.saveError'));
    } finally { setSaving(false); }
  };

  const changePassword = async () => {
    if (newPass !== confirmPass) { toast.error(t('auth.reset.mismatch')); return; }
    setSaving(true);
    try {
      await api.post('/auth/change-password', { current_password: curPass, new_password: newPass });
      setCurPass(''); setNewPass(''); setConfirmPass('');
      toast.success(t('profile.toast.passwordChanged'));
    } catch (err) {
      toast.error(err.response?.data?.detail || t('profile.toast.saveError'));
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <Card className="p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><User className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('profile.personal')}</h3>
          <div className="space-y-3">
            <div><Label>{t('account.name')}</Label><Input className="mt-1.5" value={name} onChange={(e) => setName(e.target.value)} data-testid="profile-name-input" /></div>
            <div><Label>{t('account.email')}</Label><Input type="email" className="mt-1.5" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="profile-email-input" /></div>
            {emailChanged && (
              <div>
                <Label>{t('profile.confirmWithPassword')}</Label>
                <PasswordInput value={emailPassword} onChange={(e) => setEmailPassword(e.target.value)} show={showCur} setShow={setShowCur} t={t} testid="profile-email-password" />
              </div>
            )}
            <div><Label>{t('profile.phone')}</Label><PhoneField country={phoneCountry} onCountryChange={setPhoneCountry} value={phone} onChange={setPhone} testid="profile-phone-input" /></div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><CreditCard className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('profile.payment')}</h3>
          <Label>{t('profile.preferredPayment')}</Label>
          <Select value={preferredPayment || undefined} onValueChange={setPreferredPayment}>
            <SelectTrigger className="mt-1.5" data-testid="profile-payment-select"><SelectValue placeholder={t('admin.select')} /></SelectTrigger>
            <SelectContent>{PAYMENT_METHODS.map((m) => <SelectItem key={m.id} value={m.id}>{t(`payment.${m.id}.label`)}</SelectItem>)}</SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-3">{t('profile.paymentNote')}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><MapPin className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('profile.shippingAddress')}</h3>
        <AddressFields value={shipping} onChange={setShipping} t={t} testid="profile-shipping" />
        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" id="sameBilling" className="h-4 w-4 accent-[hsl(var(--primary))]" checked={sameBilling} onChange={(e) => setSameBilling(e.target.checked)} />
          <Label htmlFor="sameBilling">{t('profile.sameBilling')}</Label>
        </div>
        {!sameBilling && (
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-3">{t('profile.billingAddress')}</h4>
            <AddressFields value={billing} onChange={setBilling} t={t} testid="profile-billing" />
          </div>
        )}
      </Card>

      <div className="flex justify-end">
        <Button onClick={saveProfile} disabled={saving} data-testid="profile-save-button">{saving ? t('profile.saving') : t('profile.save')}</Button>
      </div>

      <Card className="p-6">
        <h3 className="font-heading font-semibold mb-4 flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('profile.security')}</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          <div><Label>{t('profile.currentPassword')}</Label><PasswordInput value={curPass} onChange={(e) => setCurPass(e.target.value)} show={showCur} setShow={setShowCur} t={t} testid="profile-current-password" /></div>
          <div><Label>{t('auth.reset.newPassword')}</Label><PasswordInput value={newPass} onChange={(e) => setNewPass(e.target.value)} show={showNew} setShow={setShowNew} t={t} testid="profile-new-password" /></div>
          <div><Label>{t('auth.reset.confirmPassword')}</Label><PasswordInput value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} show={showNew} setShow={setShowNew} t={t} testid="profile-confirm-password" /></div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={changePassword} disabled={saving || !curPass || !newPass} data-testid="profile-change-password-button">{t('profile.changePassword')}</Button>
        </div>
      </Card>

      <SecurityKeys user={user} onUserChange={onUserChange} />
    </div>
  );
};

export default ProfilePanel;
