import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Package, User, LogOut, ShoppingBag, DollarSign, MapPin, CreditCard, LockKeyhole, Eye, EyeOff, Syringe, Truck, ExternalLink, Lock, FlaskConical, FileText } from 'lucide-react';
import ReconstitutionCalculator, { mgProducts } from '@/components/ReconstitutionCalculator';
import ProtocolTracker from '@/components/ProtocolTracker';
import LabReports from '@/components/LabReports';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CoaLibrary from '@/components/CoaLibrary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import api, { formatMXN, PAYMENT_METHODS } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const STATUS_COLORS = {
  pendiente: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  confirmado: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  enviado: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-border',
  entregado: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
  cancelado: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-border',
};

const EMPTY_ADDR = { address: '', city: '', state: '', postal_code: '' };

const AddressFields = ({ value, onChange, t, testid }) => (
  <div className="grid sm:grid-cols-2 gap-3">
    <div className="sm:col-span-2"><Label>{t('profile.addr.street')}</Label><Input className="mt-1.5" value={value.address} onChange={(e) => onChange({ ...value, address: e.target.value })} data-testid={`${testid}-street`} /></div>
    <div><Label>{t('profile.addr.city')}</Label><Input className="mt-1.5" value={value.city} onChange={(e) => onChange({ ...value, city: e.target.value })} /></div>
    <div><Label>{t('profile.addr.state')}</Label><Input className="mt-1.5" value={value.state} onChange={(e) => onChange({ ...value, state: e.target.value })} /></div>
    <div><Label>{t('profile.addr.zip')}</Label><Input className="mt-1.5" value={value.postal_code} onChange={(e) => onChange({ ...value, postal_code: e.target.value })} /></div>
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

const Account = () => {
  const { user, loading, logout, refreshUser } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [protocols, setProtocols] = useState([]);
  const [saving, setSaving] = useState(false);
  const [params, setParams] = useSearchParams();

  // datos personales
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [phone, setPhone] = useState('');
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
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const loadProtocols = useCallback(
    () => api.get('/me/protocols').then((r) => setProtocols(r.data)).catch(() => {}),
    [],
  );

  useEffect(() => {
    if (user) {
      api.get('/orders/me').then((r) => setOrders(r.data)).catch(() => {});
      loadProtocols();
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setShipping({ ...EMPTY_ADDR, ...(user.shipping_address || {}) });
      setBilling({ ...EMPTY_ADDR, ...(user.billing_address || {}) });
      setSameBilling(!user.billing_address || !user.billing_address.address);
      setPreferredPayment(user.preferred_payment || '');
    }
  }, [user, loadProtocols]);

  if (!user) return null;

  const validOrders = orders.filter((o) => o.status !== 'cancelado');
  const totalSpent = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const emailChanged = email.trim().toLowerCase() !== (user.email || '').toLowerCase();

  // Las herramientas se desbloquean con la primera compra pagada. "Confirmado"
  // es el momento en que se verifica el pago (tarjeta o SPEI), así que ese
  // estado y los posteriores cuentan; "pendiente" y "cancelado" no.
  const PAID_STATUSES = ['confirmado', 'enviado', 'entregado'];
  const paidOrders = orders.filter((o) => PAID_STATUSES.includes(o.status));
  const toolsUnlocked = paidOrders.length > 0;

  // Péptidos que este cliente ya compró, para pre-cargar la calculadora.
  // Solo los que el catálogo maneja en mg (los únicos que se reconstituyen).
  const purchased = (() => {
    const seen = new Map();
    for (const o of paidOrders) {
      for (const it of o.items || []) {
        const match = mgProducts.find((p) => p.name.toLowerCase() === (it.name || '').toLowerCase());
        if (!match) continue;
        const mg = parseFloat(it.presentation) || (match.variants.length ? Math.min(...match.variants) : 0);
        const key = `${match.name}::${mg}`;
        if (!seen.has(key)) seen.set(key, { name: match.name, mg });
      }
    }
    return [...seen.values()];
  })();

  const trackProtocol = async (payload) => {
    try {
      await api.post('/me/protocols', { ...payload, doses_per_week: 7, vials: 1 });
      await loadProtocols();
      toast.success(t('track.added'));
    } catch { toast.error(t('track.error')); }
  };

  const saveProfile = async () => {
    if (!name.trim()) { toast.error(t('profile.toast.nameRequired')); return; }
    if (emailChanged && !emailPassword) { toast.error(t('profile.toast.passwordForEmail')); return; }
    setSaving(true);
    try {
      await api.put('/auth/profile', {
        name,
        phone,
        email: emailChanged ? email.trim() : undefined,
        current_password: emailChanged ? emailPassword : undefined,
        shipping_address: shipping,
        billing_address: sameBilling ? shipping : billing,
        preferred_payment: preferredPayment,
      });
      await refreshUser();
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
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{t('account.title')}</h1>
          <p className="text-muted-foreground text-sm">{user.name} · {user.email}</p>
        </div>
        <Button variant="destructive" onClick={() => { logout(); navigate('/'); }} data-testid="account-logout-button"><LogOut className="h-4 w-4 mr-1.5" /> {t('account.signOut')}</Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs"><ShoppingBag className="h-4 w-4" /> {t('account.stats.orders')}</div>
          <div className="font-heading text-xl font-bold mt-1">{orders.length}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs"><DollarSign className="h-4 w-4" /> {t('account.stats.spent')}</div>
          <div className="font-heading text-xl font-bold mt-1">{formatMXN(totalSpent)}</div>
        </Card>
      </div>

      <Tabs value={params.get('tab') || 'orders'} onValueChange={(v) => setParams(v === 'orders' ? {} : { tab: v }, { replace: true })}>
        <TabsList>
          <TabsTrigger value="orders"><Package className="h-4 w-4 mr-1.5" /> {t('account.ordersTab')}</TabsTrigger>
          <TabsTrigger value="tools"><Syringe className="h-4 w-4 mr-1.5" /> {t('account.toolsTab')}</TabsTrigger>
          <TabsTrigger value="labs"><FlaskConical className="h-4 w-4 mr-1.5" /> {t('account.labsTab')}</TabsTrigger>
          <TabsTrigger value="coas"><FileText className="h-4 w-4 mr-1.5" /> {t('account.coasTab')}</TabsTrigger>
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-1.5" /> {t('account.profileTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="mt-5 space-y-8">
          {!toolsUnlocked ? (
            <Card className="p-10 text-center" data-testid="tools-locked">
              <Lock className="h-8 w-8 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-heading font-semibold text-lg mb-2">{t('account.tools.lockedTitle')}</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {orders.length === 0 ? t('account.tools.lockedNoOrders') : t('account.tools.lockedPending')}
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-5">
                <Link to="/calculadora"><Button variant="outline">{t('account.tools.publicCalc')}</Button></Link>
                <Link to="/catalogo"><Button>{t('account.exploreCatalog')}</Button></Link>
              </div>
            </Card>
          ) : (
            <>
              <section>
                <h3 className="font-heading font-semibold text-lg mb-1">{t('calc.title')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('account.tools.calcHint')}</p>
                <ReconstitutionCalculator variant="full" purchased={purchased} onTrack={trackProtocol} syncUrl={false} />
              </section>

              <section>
                <h3 className="font-heading font-semibold text-lg mb-1">{t('account.tools.trackTitle')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('account.tools.trackHint')}</p>
                <ProtocolTracker protocols={protocols} onChange={loadProtocols} />
              </section>
            </>
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-5">
          {orders.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground">{t('account.noOrders')} <Button variant="link" onClick={() => navigate('/catalogo')}>{t('account.exploreCatalog')}</Button></Card>
          ) : (
            <div className="space-y-3" data-testid="account-orders-table">
              {orders.map((o) => (
                <Card key={o.id} className="p-4" data-testid="account-order-row">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-mono-tech font-medium">{o.order_number}</div>
                      <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString(language)} · {t('common.items', { count: o.items.length })}</div>
                      {o.tracking_number && (
                        <div className="flex flex-wrap items-center gap-2 text-xs mt-1.5" data-testid="account-tracking">
                          <Truck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
                          <span className="text-muted-foreground">{o.carrier}</span>
                          <span className="font-mono-tech">{o.tracking_number}</span>
                          {o.tracking_url && (
                            <a href={o.tracking_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[hsl(var(--primary))] hover:underline">
                              <ExternalLink className="h-3 w-3" /> {t('distributor.track')}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={STATUS_COLORS[o.status]}>{t(`status.${o.status}`)}</Badge>
                      <span className="font-heading font-bold">{formatMXN(o.total)}</span>
                      <Dialog>
                        <DialogTrigger asChild><Button variant="outline" size="sm" data-testid="account-open-order-button">{t('account.detail')}</Button></DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>{t('account.orderTitle', { number: o.order_number })}</DialogTitle></DialogHeader>
                          <div className="space-y-2 text-sm">
                            {o.items.map((it) => <div key={it.product_id} className="flex justify-between"><span className="text-muted-foreground">{it.quantity} × {it.name}</span><span>{formatMXN(it.price * it.quantity)}</span></div>)}
                            <Separator className="my-2" />
                            <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span>{o.shipping === 0 ? t('common.free') : formatMXN(o.shipping)}</span></div>
                            <div className="flex justify-between font-bold"><span>{t('common.total')}</span><span>{formatMXN(o.total)}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">{t('common.payment')}</span><span>{t(`payment.${o.payment_method}.label`)}</span></div>
                            <div className="text-xs text-muted-foreground mt-2">{t('account.shipTo', { address: o.customer.address, city: o.customer.city, state: o.customer.state, postalCode: o.customer.postal_code })}</div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="coas" className="mt-5">
          <CoaLibrary locked={!toolsUnlocked} />
        </TabsContent>

        <TabsContent value="labs" className="mt-5">
          {!toolsUnlocked ? (
            <Card className="p-10 text-center" data-testid="labs-locked">
              <Lock className="h-8 w-8 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-heading font-semibold text-lg mb-2">{t('account.tools.lockedTitle')}</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {orders.length === 0 ? t('account.tools.lockedNoOrders') : t('account.tools.lockedPending')}
              </p>
            </Card>
          ) : <LabReports />}
        </TabsContent>

        <TabsContent value="profile" className="mt-5 space-y-4">
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
                <div><Label>{t('profile.phone')}</Label><Input type="tel" className="mt-1.5" value={phone} onChange={(e) => setPhone(e.target.value)} data-testid="profile-phone-input" /></div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
