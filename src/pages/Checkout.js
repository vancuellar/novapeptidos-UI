import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Landmark, ShieldCheck, Package, UserRound, MapPin, ChevronDown, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { track, attribution } from '@/lib/track';
import api, { formatMXN, PAYMENT_METHODS } from '@/lib/api';
import { phoneValid } from '@/lib/utils';
import { CountrySelect, PhoneField, composePhone, parsePhone } from '@/components/CountryPhoneFields';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = { CreditCard, Landmark, Bitcoin };

// Ya no hay utilidades de tarjeta: el numero se teclea en la pagina de Mercado
// Pago, no aqui. Se borraron con el formulario (Christian, 2026-07-26).

const Checkout = () => {
  const { items, subtotal, discount, discountRate, discountSource, cappedItems, shipping, faltaParaEnvioGratis, distCode, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('spei');
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const savedPhone = parsePhone(user?.phone);
  const [phoneCountry, setPhoneCountry] = useState(savedPhone.country);
  const [form, setForm] = useState({
    full_name: user?.name || '', email: user?.email || '', phone: savedPhone.national,
    address: user?.shipping_address?.address || '', city: user?.shipping_address?.city || '',
    state: user?.shipping_address?.state || '', postal_code: user?.shipping_address?.postal_code || '',
    country: user?.shipping_address?.country || 'MX',
    notes: '',
  });
  const [loyalty, setLoyalty] = useState({ eligible: false, balance: 0 });
  const [usePoints, setUsePoints] = useState(false);
  const [cryptoOn, setCryptoOn] = useState(false);
  const [cardOn, setCardOn] = useState(false);

  // Cripto (BTCPay) solo aparece si el servidor lo tiene encendido.
  useEffect(() => {
    api.get('/payments/config').then((r) => {
      setCryptoOn(!!r.data?.crypto_enabled);
      setCardOn(!!r.data?.card_enabled);
    }).catch(() => {});
  }, []);
  // La TARJETA solo aparece si Mercado Pago esta configurado. Antes salia siempre
  // — y por defecto — con un formulario que pedia el numero, lo validaba y lo
  // TIRABA: nadie cobraba y el cliente se iba creyendo que habia pagado.
  const methods = PAYMENT_METHODS.filter(
    (m) => (m.id !== 'cripto' || cryptoOn) && (m.id !== 'tarjeta' || cardOn),
  );
  // Si el metodo elegido deja de estar disponible, cae al primero que si este.
  useEffect(() => {
    if (methods.length && !methods.some((m) => m.id === payment)) setPayment(methods[0].id);
  }, [methods, payment]);
  const sectionRefs = { 0: useRef(null), 1: useRef(null), 2: useRef(null) };

  // Puntos de lealtad: solo cuentas de cliente (el servidor decide quién participa).
  useEffect(() => {
    if (!user) return;
    api.get('/me/points')
      .then((res) => setLoyalty(res.data))
      .catch(() => {});
  }, [user]);

  // Registra el intento de compra mientras llena sus datos: si no cierra, queda
  // como 'pendiente' y la IA le da seguimiento (Christian, 2026-07-25). Se manda
  // con retraso para no pegarle al servidor en cada tecla.
  useEffect(() => {
    if (!items.length) return;
    const email = (form.email || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    const t = setTimeout(() => {
      api.post('/checkout/intento', {
        email,
        name: form.full_name || '',
        phone: form.phone || '',
        items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price, sku: i.sku || '' })),
        subtotal,
        total: subtotal - discount,
        session_id: localStorage.getItem('np_track_session') || '',
      }).catch(() => {});
    }, 2500);
    return () => clearTimeout(t);
  }, [form.email, form.full_name, form.phone, items, subtotal, discount]);

  const afterDiscount = subtotal - discount;
  const pointsApplied = usePoints && loyalty.eligible
    ? Math.min(loyalty.balance, Math.floor(afterDiscount)) : 0;
  const total = afterDiscount - pointsApplied + shipping;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (items.length === 0) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">{t('checkout.empty')}</p><Button className="mt-4" onClick={() => navigate('/catalogo')}>{t('home.viewCatalog')}</Button></div>;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.address) {
      toast.error(t('checkout.toast.required'));
      return;
    }
    if (!phoneValid(form.phone, phoneCountry)) {
      toast.error(t('checkout.toast.phone'));
      return;
    }
    if (!consent) { toast.error(t('checkout.toast.consent')); return; }
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({ product_id: i.sku || i.product_id, name: i.name, price: i.price, quantity: i.quantity, presentation: i.presentation, image_url: i.image_url })),
        customer: { ...form, phone: composePhone(phoneCountry, form.phone) },
        payment_method: payment,
        shipping,
        discount,
        distributor_code: distCode || null,
        points_to_use: pointsApplied,
        // De dónde salió este cliente (primer toque: utm/fbclid de su PRIMERA visita).
        // Va en el pedido para poder sacar el costo por cliente que SÍ compró: sin
        // esto, el gasto de Meta y las ventas no se pueden cruzar por campaña.
        attribution: attribution(),
        // Seguridad: los datos de la tarjeta NUNCA se envian ni se guardan en nuestro servidor.
      };
      const res = await api.post('/orders', payload);
      track('purchase', { value: res.data.total || 0, order_number: res.data.order_number || '' });
      clearCart();
      toast.success(t('checkout.toast.success'));
      // El servidor devuelve el enlace de la pasarela y ahí paga el cliente:
      // Mercado Pago para tarjeta, NOWPayments/BTCPay para cripto. De regreso lo
      // trae la URL de retorno a /pedido/... El pedido NO se da por pagado aquí:
      // eso solo pasa cuando la pasarela avisa por su webhook.
      const pasarela = res.data.card_checkout_url || res.data.crypto_checkout_url;
      if (pasarela) {
        window.location.href = pasarela;
        return;
      }
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
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <div><Label>{t('checkout.phone')}</Label><PhoneField country={phoneCountry} onCountryChange={setPhoneCountry} value={form.phone} onChange={(v) => set('phone', v)} testid="checkout-phone-input" /></div>
            </div>
          </Card>

          <Card className="p-5 scroll-mt-36" ref={sectionRefs[1]} data-testid="checkout-section-shipping">
            {sectionHeader(2, t('checkout.step2'), t('checkout.shippingHint'))}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>{t('checkout.address')}</Label><Input className="mt-1.5" value={form.address} onChange={(e) => set('address', e.target.value)} data-testid="checkout-address-input" /></div>
              <div><Label>{t('checkout.city')}</Label><Input className="mt-1.5" value={form.city} onChange={(e) => set('city', e.target.value)} data-testid="checkout-city-input" /></div>
              <div><Label>{t('checkout.state')}</Label><Input className="mt-1.5" value={form.state} onChange={(e) => set('state', e.target.value)} data-testid="checkout-state-input" /></div>
              <div><Label>{t('checkout.postalCode')}</Label><Input className="mt-1.5" value={form.postal_code} onChange={(e) => set('postal_code', e.target.value)} data-testid="checkout-postal-code-input" /></div>
              <div><Label>{t('checkout.country')}</Label><CountrySelect value={form.country} onChange={(v) => set('country', v)} testid="checkout-country-select" /></div>
              <div className="sm:col-span-2"><Label>{t('checkout.notes')}</Label><Textarea className="mt-1.5" value={form.notes} onChange={(e) => set('notes', e.target.value)} data-testid="checkout-notes-input" /></div>
            </div>
          </Card>

          <Card className="p-5 scroll-mt-36" ref={sectionRefs[2]} data-testid="checkout-section-payment">
            {sectionHeader(3, t('checkout.step3'), t('checkout.paymentHint'))}
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3" data-testid="checkout-payment-method-radio">
              {methods.map((m) => {
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

            {/* La tarjeta ya NO se teclea aquí: al confirmar mandamos al cliente a
                la página de Mercado Pago. Antes había un formulario que pedía el
                número, lo validaba con Luhn y lo TIRABA — nadie cobraba. Además,
                así los datos de la tarjeta nunca tocan nuestro servidor. */}
            {payment === 'tarjeta' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-card-note">
                {t('checkout.cardNote')}
              </div>
            )}

            {payment === 'spei' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-spei-note">
                {t('checkout.speiNote')}
              </div>
            )}

            {payment === 'cripto' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-crypto-note">
                {t('checkout.cryptoNote')}
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
            <button type="button" onClick={() => setSummaryOpen((v) => !v)} className="w-full flex items-center justify-between mb-4" data-testid="checkout-summary-toggle">
              <h3 className="font-heading font-semibold">{t('common.items', { count: items.length })}</h3>
              <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--primary))] font-medium">{summaryOpen ? t('checkout.hideDetail') : t('checkout.viewDetail')} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} /></span>
            </button>
            {summaryOpen && (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((i) => (
                    <div key={i.product_id} className="flex gap-3 items-center text-sm">
                      <img src={i.image_url || null} alt={i.name} className="h-12 w-12 rounded-md object-cover border border-border" />
                      <div className="flex-1 min-w-0"><div className="line-clamp-1">{i.name}</div><div className="text-xs text-muted-foreground">x{i.quantity}</div></div>
                      <div>{formatMXN(i.price * i.quantity)}</div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </>
            )}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span>{formatMXN(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[hsl(var(--success))]"><span>{discountSource === 'self' ? t('discount.lineSelf', { rate: Math.round(discountRate * 100) }) : discountSource === 'code' ? t('discount.lineCode', { code: distCode, rate: Math.round(discountRate * 100) }) : t('discount.line', { rate: Math.round(discountRate * 100) })}</span><span>− {formatMXN(discount)}</span></div>}
              {cappedItems.length > 0 && (
                <div className="rounded-lg border border-border bg-[hsl(var(--secondary))] px-3 py-2 text-[11px] leading-relaxed text-muted-foreground" data-testid="checkout-capped-notice">
                  <span className="font-medium text-foreground">{t('discount.cappedTitle')}</span>{' '}
                  {t('discount.cappedBody')}
                  <ul className="mt-1.5 space-y-0.5">
                    {cappedItems.map((i) => (
                      <li key={i.product_id} className="flex justify-between gap-2">
                        <span className="truncate">{i.name}</span>
                        <span className="shrink-0 font-mono-tech">{i.applied > 0 ? `−${Math.round(i.applied * 100)}%` : t('discount.cappedNone')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pointsApplied > 0 && <div className="flex justify-between text-[hsl(var(--success))]"><span>{t('loyalty.line')}</span><span>− {formatMXN(pointsApplied)}</span></div>}
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('common.shipping')}</span>
                {shipping > 0
                  ? <span>{formatMXN(shipping)}</span>
                  : <span className="text-[hsl(var(--success))]">{t('cart.shippingFree')}</span>}
              </div>
              {faltaParaEnvioGratis > 0 && (
                <p className="text-xs text-[hsl(var(--primary))]">{t('cart.freeShippingAt', { amount: formatMXN(faltaParaEnvioGratis) })}</p>
              )}
            </div>
            {loyalty.eligible && loyalty.balance > 0 && (
              <label className="mt-4 flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3 cursor-pointer" data-testid="checkout-use-points">
                <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)}
                  className="h-4 w-4 mt-0.5 shrink-0 accent-[hsl(var(--primary))] cursor-pointer" />
                <span className="text-xs leading-relaxed">
                  <span className="font-medium">{t('loyalty.use', { points: loyalty.balance })}</span><br />
                  <span className="text-muted-foreground">{t('loyalty.useNote')}</span>
                </span>
              </label>
            )}
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
