import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Landmark, ShieldCheck, Package, UserRound, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import api, { formatMXN, PAYMENT_METHODS } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = { CreditCard, Landmark };

// ---- utilidades de tarjeta (SOLO en el navegador; el numero jamas sale de aqui) ----
const onlyDigits = (s) => (s || '').replace(/\D/g, '');
const formatCardNumber = (s) => onlyDigits(s).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ').trim();
const formatExpiry = (s) => {
  const d = onlyDigits(s).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
const luhnOk = (num) => {
  const d = onlyDigits(num);
  if (d.length < 15 || d.length > 16) return false;
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i]);
    if (i % 2 === 1) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
  }
  return sum % 10 === 0;
};
const expiryOk = (exp) => {
  const m = /^(\d{2})\/(\d{2})$/.exec(exp);
  if (!m) return false;
  const month = Number(m[1]);
  if (month < 1 || month > 12) return false;
  const year = 2000 + Number(m[2]);
  const now = new Date();
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
};

const Checkout = () => {
  const { items, subtotal, discount, discountRate, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('tarjeta');
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    full_name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    address: user?.shipping_address?.address || '', city: user?.shipping_address?.city || '',
    state: user?.shipping_address?.state || '', postal_code: user?.shipping_address?.postal_code || '',
    notes: '',
  });
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const sectionRefs = { 0: useRef(null), 1: useRef(null), 2: useRef(null) };

  const afterDiscount = subtotal - discount;
  const total = afterDiscount; // el envío se cotiza y cobra por separado
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setC = (k, v) => setCard((c) => ({ ...c, [k]: v }));

  if (items.length === 0) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">{t('checkout.empty')}</p><Button className="mt-4" onClick={() => navigate('/catalogo')}>{t('home.viewCatalog')}</Button></div>;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.address) {
      toast.error(t('checkout.toast.required'));
      return;
    }
    if (!consent) { toast.error(t('checkout.toast.consent')); return; }
    if (payment === 'tarjeta') {
      if (!luhnOk(card.number)) { toast.error(t('checkout.toast.cardNumber')); return; }
      if (!expiryOk(card.expiry)) { toast.error(t('checkout.toast.cardExpiry')); return; }
      if (onlyDigits(card.cvc).length < 3) { toast.error(t('checkout.toast.cardCvc')); return; }
      if (!card.name.trim()) { toast.error(t('checkout.toast.cardName')); return; }
    }
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({ product_id: i.product_id, name: i.name, price: i.price, quantity: i.quantity, presentation: i.presentation, image_url: i.image_url })),
        customer: form,
        payment_method: payment,
        shipping: 0,
        discount,
        // Seguridad: los datos de la tarjeta NUNCA se envian ni se guardan en nuestro servidor.
      };
      const res = await api.post('/orders', payload);
      clearCart();
      toast.success(t('checkout.toast.success'));
      navigate(`/pedido/${res.data.order_number}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || t('checkout.toast.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const contactDone = !!(form.full_name && form.email && form.phone);
  const shippingDone = contactDone && !!form.address;
  const stepActive = [true, contactDone, shippingDone];
  const steps = [{ i: UserRound, l: t('checkout.step1') }, { i: MapPin, l: t('checkout.step2') }, { i: CreditCard, l: t('checkout.step3') }];
  const goTo = (idx) => sectionRefs[idx].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const sectionHeader = (n, title, subtitle) => (
    <div className="flex items-start gap-3 mb-4">
      <span className="h-7 w-7 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/30 flex items-center justify-center text-sm font-bold shrink-0">{n}</span>
      <div>
        <h3 className="font-heading font-semibold leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t('checkout.title')}</h1>
      {!user && (
        <p className="text-sm text-muted-foreground mb-4" data-testid="checkout-login-hint">
          {t('checkout.haveAccount')} <Link to="/login" className="text-[hsl(var(--primary))] font-medium hover:underline">{t('checkout.loginLink')}</Link> · {t('checkout.guestOk')}
        </p>
      )}
      <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-6 text-xs sm:text-sm" data-testid="checkout-stepper">
        {steps.map((s, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <div className={`h-px w-8 sm:w-14 transition-colors ${stepActive[idx] ? 'bg-[hsl(var(--primary))]' : 'bg-border'}`} />}
            <button type="button" onClick={() => goTo(idx)} className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${stepActive[idx] ? 'text-[hsl(var(--primary))]' : 'text-muted-foreground hover:text-foreground'}`} data-testid={`checkout-step-${idx + 1}`} data-active={stepActive[idx]}>
              <span className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${stepActive[idx] ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--secondary))] border border-border'}`}><s.i className="h-3 w-3" /></span>
              {s.l}
            </button>
          </React.Fragment>
        ))}
      </div>
      <form onSubmit={submit} className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-5 scroll-mt-36" ref={sectionRefs[0]} data-testid="checkout-section-contact">
            {sectionHeader(1, t('checkout.step1'), t('checkout.contactHint'))}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>{t('checkout.fullName')}</Label><Input className="mt-1.5" value={form.full_name} onChange={(e) => set('full_name', e.target.value)} data-testid="checkout-name-input" /></div>
              <div><Label>{t('checkout.email')}</Label><Input type="email" className="mt-1.5" value={form.email} onChange={(e) => set('email', e.target.value)} data-testid="checkout-email-input" /></div>
              <div><Label>{t('checkout.phone')}</Label><Input className="mt-1.5" value={form.phone} onChange={(e) => set('phone', e.target.value)} data-testid="checkout-phone-input" /></div>
            </div>
          </Card>

          <Card className="p-5 scroll-mt-36" ref={sectionRefs[1]} data-testid="checkout-section-shipping">
            {sectionHeader(2, t('checkout.step2'), t('checkout.shippingHint'))}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>{t('checkout.address')}</Label><Input className="mt-1.5" value={form.address} onChange={(e) => set('address', e.target.value)} data-testid="checkout-address-input" /></div>
              <div><Label>{t('checkout.city')}</Label><Input className="mt-1.5" value={form.city} onChange={(e) => set('city', e.target.value)} data-testid="checkout-city-input" /></div>
              <div><Label>{t('checkout.state')}</Label><Input className="mt-1.5" value={form.state} onChange={(e) => set('state', e.target.value)} data-testid="checkout-state-input" /></div>
              <div><Label>{t('checkout.postalCode')}</Label><Input className="mt-1.5" value={form.postal_code} onChange={(e) => set('postal_code', e.target.value)} data-testid="checkout-postal-code-input" /></div>
              <div className="sm:col-span-2"><Label>{t('checkout.notes')}</Label><Textarea className="mt-1.5" value={form.notes} onChange={(e) => set('notes', e.target.value)} data-testid="checkout-notes-input" /></div>
            </div>
          </Card>

          <Card className="p-5 scroll-mt-36" ref={sectionRefs[2]} data-testid="checkout-section-payment">
            {sectionHeader(3, t('checkout.step3'), t('checkout.paymentHint'))}
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3" data-testid="checkout-payment-method-radio">
              {PAYMENT_METHODS.map((m) => {
                const Icon = ICONS[m.icon] || CreditCard;
                return (
                  <Label key={m.id} htmlFor={m.id} className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${payment === m.id ? 'border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--ring))] ring-offset-1' : 'border-border hover:bg-[hsl(var(--secondary))]'}`} data-testid={`checkout-payment-${m.id}`}>
                    <RadioGroupItem value={m.id} id={m.id} />
                    <div className="h-9 w-9 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center"><Icon className="h-4 w-4 text-[hsl(var(--primary))]" /></div>
                    <div><div className="font-medium text-sm">{t(`payment.${m.id}.label`)}</div><div className="text-xs text-muted-foreground">{t(`payment.${m.id}.desc`)}</div></div>
                  </Label>
                );
              })}
            </RadioGroup>

            {payment === 'tarjeta' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4" data-testid="checkout-card-fields">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label>{t('checkout.card.number')}</Label>
                    <div className="relative mt-1.5">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9 font-mono-tech" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={card.number} onChange={(e) => setC('number', formatCardNumber(e.target.value))} data-testid="checkout-card-number" />
                    </div>
                  </div>
                  <div>
                    <Label>{t('checkout.card.expiry')}</Label>
                    <Input className="mt-1.5 font-mono-tech" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" value={card.expiry} onChange={(e) => setC('expiry', formatExpiry(e.target.value))} data-testid="checkout-card-expiry" />
                  </div>
                  <div>
                    <Label>CVC</Label>
                    <Input className="mt-1.5 font-mono-tech" inputMode="numeric" autoComplete="cc-csc" type="password" maxLength={4} placeholder="123" value={card.cvc} onChange={(e) => setC('cvc', onlyDigits(e.target.value).slice(0, 4))} data-testid="checkout-card-cvc" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>{t('checkout.card.name')}</Label>
                    <Input className="mt-1.5" autoComplete="cc-name" value={card.name} onChange={(e) => setC('name', e.target.value)} data-testid="checkout-card-name" />
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {t('checkout.card.secureNote')}</p>
              </div>
            )}

            {payment === 'spei' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-spei-note">
                {t('checkout.speiNote')}
              </div>
            )}

            <label className="mt-5 flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer" data-testid="checkout-consent">
              <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>
                {t('checkout.consentText')}{' '}
                <Link to="/info/privacidad" className="text-[hsl(var(--primary))] hover:underline">{t('auth.terms.privacy')}</Link> ·{' '}
                <Link to="/info/terminos" className="text-[hsl(var(--primary))] hover:underline">{t('auth.terms.service')}</Link> ·{' '}
                <Link to="/info/envios" className="text-[hsl(var(--primary))] hover:underline">{t('footer.shipping')}</Link> ·{' '}
                <Link to="/info/devoluciones" className="text-[hsl(var(--primary))] hover:underline">{t('footer.returns')}</Link>
              </span>
            </label>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-5 sticky top-32" data-testid="checkout-order-summary">
            <h3 className="font-heading font-semibold mb-4">{t('checkout.orderSummary')}</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((i) => (
                <div key={i.product_id} className="flex gap-3 items-center text-sm">
                  <img src={i.image_url} alt={i.name} className="h-12 w-12 rounded-md object-cover border border-border" />
                  <div className="flex-1 min-w-0"><div className="line-clamp-1">{i.name}</div><div className="text-xs text-muted-foreground">x{i.quantity}</div></div>
                  <div>{formatMXN(i.price * i.quantity)}</div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span>{formatMXN(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[hsl(var(--success))]"><span>{t('discount.line', { rate: Math.round(discountRate * 100) })}</span><span>− {formatMXN(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span className="text-muted-foreground">{t('cart.shippingTBD')}</span></div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-heading font-bold text-lg"><span>{t('common.total')}</span><span>{formatMXN(total)}</span></div>
            <Button type="submit" className="w-full mt-5" size="lg" disabled={submitting} data-testid="checkout-place-order-button">
              {submitting ? t('common.loading') : (payment === 'tarjeta' ? t('checkout.payAmount', { amount: formatMXN(total) }) : t('checkout.placeOrder'))}
            </Button>
            <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> {t('checkout.securePayment')}</span>
              <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" /> {t('checkout.coaByLot')}</span>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
