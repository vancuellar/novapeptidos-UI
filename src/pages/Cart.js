import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, BadgePercent, Tag, X, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart, isNetPriceItem } from '@/context/CartContext';
import api, { formatMXN } from '@/lib/api';
import AvisoSobrePedido from '@/components/AvisoSobrePedido';
import TrustWidget from '@/components/TrustWidget';
import { desgloseSobrePedido } from '@/lib/sobrePedido';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { useLanguage } from '@/context/LanguageContext';

const BAC = fallbackProducts.find((p) => p.slug === 'agua-bacteriostatica');

// ¿Este renglón del carrito es agua bacteriostática? Por slug/SKU — el id ya es
// un uuid real y el regex viejo sobre product_id dejó de reconocerla.
const isBac = (item) => /agua-bacteriostatica|AGUABACTERIOST/i.test(
  `${item.slug || ''} ${item.sku || ''} ${item.product_id || ''}`);

// Cuánta agua pide un vial según su tamaño (mg). Regla práctica de
// reconstitución: chico ~2 mL, mediano ~3 mL, grande (60-100 mg, blends) ~4 mL.
const waterPerVial = (mg) => (mg <= 15 ? 2 : mg <= 40 ? 3 : 4);

// Plan inteligente: suma los mL que necesita el carrito y sugiere la
// presentación correcta — 1 de 3 mL si alcanza, o N de 10 mL si no.
const buildBacPlan = (items) => {
  if (!BAC?.variants?.length) return null;
  let vials = 0;
  let ml = 0;
  for (const item of items) {
    if (isBac(item)) continue;   // el agua no se reconstituye a sí misma
    const match = /([\d.]+)\s*mg/i.exec(item.presentation || '');
    if (!match) continue;   // cápsulas, mL, etc.: no se reconstituyen
    vials += item.quantity;
    ml += waterPerVial(parseFloat(match[1])) * item.quantity;
  }
  if (!vials) return null;
  const v3 = BAC.variants.find((v) => v.presentation.startsWith('3'));
  const v10 = BAC.variants.find((v) => v.presentation.startsWith('10'));
  const variant = ml <= 3 && v3 ? v3 : (v10 || v3);
  const qty = ml <= 3 ? 1 : Math.max(1, Math.ceil(ml / 10));
  return { vials, ml, qty, variant, size: variant.presentation };
};

const Cart = () => {
  const { items, addItem, updateQty, removeItem, subtotal, discount, discountRate, discountSource, cappedItems, lineDiscounts, regla5Items, compraPropia, nextTier, shipping, envioGratis, faltaParaEnvioGratis, envioGratisDesde, distCode, distRate, codeMin, codeMinMet, applyDistCode, clearDistCode } = useCart();
  // Qué descuento lleva CADA renglón (regla de 5): con dos tasas en el mismo
  // carrito, un porcentaje solo arriba ya no explica el total.
  const porRenglon = Object.fromEntries((lineDiscounts || []).map((l) => [l.product_id, l]));
  const faltantes = Object.fromEntries((regla5Items || []).map((r) => [r.product_id, r]));
  // El inventario REAL, para poder avisar del envío partido ANTES de pagar. Si no
  // contesta se queda en null y no se inventa ningún aviso: "no sé" no es "no hay".
  const [stockMap, setStockMap] = useState(null);
  useEffect(() => {
    api.get('/stock').then((r) => setStockMap(r.data || null)).catch(() => setStockMap(null));
  }, []);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [bacOpen, setBacOpen] = useState(false);
  const afterDiscount = subtotal - discount;
  const totalConEnvio = afterDiscount + shipping;

  const hasBac = items.some(isBac);
  const bacPlan = buildBacPlan(items);
  // Qué renglones van sobre pedido, para la nota chiquita debajo de CADA uno
  // (ya no el bloque grande de "dos entregas").
  const sobrePedidoIds = new Set(desgloseSobrePedido(items, stockMap).map((l) => l.product_id));

  const goCheckout = () => navigate('/checkout');
  const onCheckoutClick = () => {
    // Solo recordamos el agua si hay viales que de verdad se reconstituyen.
    if (bacPlan && !hasBac) setBacOpen(true);
    else goCheckout();
  };
  const addBacAndCheckout = () => {
    const v = bacPlan.variant;
    // El id DEBE existir en el catálogo real (id o SKU de la presentación). Antes se
    // inventaba "id::10 mL": el backend no lo encontraba, el agua se saltaba la regla
    // de "los insumos no llevan descuento" y sí se descontaba (bug, 2026-07-25).
    addItem({ ...BAC, id: v.id || v.sku || BAC.id, sku: v.sku, name: `${BAC.name} ${v.presentation}`, price: v.price, presentation: v.presentation, stock: v.stock }, bacPlan.qty);
    setBacOpen(false);
    goCheckout();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-14 w-14 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-heading text-2xl font-bold">{t('cart.emptyTitle')}</h1>
        <p className="text-muted-foreground mt-2">{t('cart.emptyBody')}</p>
        <Button asChild className="mt-6"><Link to="/catalogo">{t('home.viewCatalog')}</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-4">{t('cart.title')}</h1>
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-border bg-[hsl(var(--secondary))] px-4 py-2.5 text-xs sm:text-sm" data-testid="cart-tier-banner">
        <span className="inline-flex items-center gap-1.5 font-medium"><BadgePercent className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('discount.bannerTitle')}</span>
        <span className="rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-medium px-2.5 py-0.5">−10% {t('discount.launch')}</span>
        <span className="rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-medium px-2.5 py-0.5">−15% {t('discount.from20k')}</span>
        <span className="text-muted-foreground">{t('discount.noCode')}</span>
      </div>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-3" data-testid="cart-items-table">
          {items.map((item) => (
            <Card key={item.product_id} className="p-4 flex gap-4 items-center">
              <img src={item.image_url || null} alt={item.name} className="h-20 w-20 rounded-lg object-cover border border-border bg-[hsl(var(--secondary))]" />
              <div className="flex-1 min-w-0">
                <Link to={`/producto/${item.product_id}`} className="font-medium hover:text-[hsl(var(--primary))] line-clamp-1">{item.name}</Link>
                <div className="text-xs text-muted-foreground font-mono-tech mt-0.5">{item.presentation}</div>
                <div className="font-heading font-semibold mt-1">{formatMXN(item.price)}</div>
                {isNetPriceItem(item) && (
                  <div className="text-[11px] text-muted-foreground mt-0.5" data-testid="cart-net-price-note">{t('cart.netPrice')}</div>
                )}
                {sobrePedidoIds.has(item.product_id) && (
                  <AvisoSobrePedido testid="cart-item-sobre-pedido" />
                )}
                {/* REGLA DE 5: qué precio lleva ESTE renglón, y el empujón cuando le
                    faltan piezas. Sólo se ve en compras propias de distribuidor. */}
                {compraPropia && porRenglon[item.product_id]?.applied > 0 && (
                  <div className={`text-[11px] mt-1 font-medium ${porRenglon[item.product_id].esPrecioDistribuidor ? 'text-[hsl(var(--success))]' : 'text-muted-foreground'}`} data-testid="cart-line-rate">
                    {porRenglon[item.product_id].esPrecioDistribuidor
                      ? t('regla5.distPrice', { rate: Math.round(porRenglon[item.product_id].applied * 100) })
                      : t('regla5.clientPrice', { rate: Math.round(porRenglon[item.product_id].applied * 100) })}
                  </div>
                )}
                {faltantes[item.product_id] && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5 px-2.5 py-1.5 text-[11px] leading-snug text-[hsl(var(--primary))]" data-testid="cart-regla5-nudge">
                    <span>{t('regla5.nudge', { n: faltantes[item.product_id].quantity, min: faltantes[item.product_id].minimo, faltan: faltantes[item.product_id].faltan })}</span>
                    <button type="button" onClick={() => updateQty(item.product_id, faltantes[item.product_id].minimo)} className="shrink-0 rounded-md border border-[hsl(var(--primary))]/40 px-2 py-0.5 font-medium transition-colors hover:bg-[hsl(var(--primary))] hover:text-white" data-testid="cart-regla5-add">
                      {t('regla5.add', { faltan: faltantes[item.product_id].faltan })}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center border border-border rounded-lg">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQty(item.product_id, item.quantity - 1)} data-testid="cart-qty-decrease-button"><Minus className="h-3.5 w-3.5" /></Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQty(item.product_id, item.quantity + 1)} data-testid="cart-qty-increase-button"><Plus className="h-3.5 w-3.5" /></Button>
                </div>
                <Button variant="destructive" size="sm" className="h-7" onClick={() => removeItem(item.product_id)} data-testid="cart-remove-item-button"><Trash2 className="h-3.5 w-3.5 mr-1" /> {t('cart.remove')}</Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-4">
          <Card className="p-5 sticky top-32">
            <h3 className="font-heading font-semibold mb-4">{t('cart.summary')}</h3>
            <div className="mb-4">
              {distCode ? (
                <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--success))]/40 bg-[hsl(var(--success))]/10 px-3 py-2 text-sm" data-testid="cart-distcode-applied">
                  <span className="inline-flex items-center gap-1.5 text-[hsl(var(--success))] font-medium"><Tag className="h-3.5 w-3.5" /> {t('discount.codeApplied', { code: distCode, rate: Math.round(distRate * 100) })}</span>
                  <button type="button" onClick={clearDistCode} className="rounded-md p-1 bg-destructive/10 text-destructive transition-colors hover:bg-destructive hover:text-white" data-testid="cart-distcode-remove"><X className="h-4 w-4" /></button>
                </div>
              ) : (
                <form onSubmit={async (e) => { e.preventDefault(); if (await applyDistCode(code)) setCode(''); }} className="flex gap-2">
                  <Input placeholder={t('discount.codePlaceholder')} value={code} onChange={(e) => setCode(e.target.value)} className="h-9" data-testid="cart-distcode-input" />
                  <Button type="submit" variant="outline" className="h-9" data-testid="cart-distcode-apply">{t('discount.apply')}</Button>
                </form>
              )}
              {distCode && !codeMinMet && (
                <p className="text-[11px] text-destructive mt-1.5" data-testid="cart-code-min">
                  {t('discount.codeMin', { amount: formatMXN(codeMin) })}
                </p>
              )}
              <p className="text-[11px] text-muted-foreground mt-1.5">{t('discount.noStack')}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span data-testid="cart-subtotal">{formatMXN(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[hsl(var(--success))]"><span>{discountSource === 'self' ? t('discount.lineSelf', { rate: Math.round(discountRate * 100) }) : discountSource === 'code' ? t('discount.lineCode', { code: distCode, rate: Math.round(discountRate * 100) }) : t('discount.line', { rate: Math.round(discountRate * 100) })}</span><span data-testid="cart-discount">− {formatMXN(discount)}</span></div>}
              {discountSource === 'auto' && nextTier && <p className="text-xs text-muted-foreground">{t('discount.nextTier', { amount: formatMXN(nextTier.min - subtotal), rate: Math.round(nextTier.rate * 100) })}</p>}
              {/* Regla de 5, en el resumen: qué le falta al carrito para bajar de precio. */}
              {regla5Items.length > 0 && (
                <div className="rounded-lg border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground" data-testid="cart-regla5-summary">
                  <span className="font-medium text-[hsl(var(--primary))]">{t('regla5.title', { min: regla5Items[0].minimo })}</span>{' '}
                  {t('regla5.body', { min: regla5Items[0].minimo })}
                  <ul className="mt-1.5 space-y-0.5">
                    {regla5Items.map((i) => (
                      <li key={i.product_id} className="flex justify-between gap-2">
                        <span className="truncate">{i.name}</span>
                        <span className="shrink-0 font-mono-tech">{i.quantity}/{i.minimo} · {t('regla5.missing', { faltan: i.faltan })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cappedItems.length > 0 && (
                <div className="rounded-lg border border-border bg-[hsl(var(--secondary))] px-3 py-2 text-[11px] leading-relaxed text-muted-foreground" data-testid="cart-capped-notice">
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
              {/* Envío en cero puede querer decir DOS cosas y el cliente tiene
                  derecho a saber cuál: que se lo ganó (mínima cumplida y el tope del
                  5% tapa la guía) o que el pedido no cobra envío y se cotiza aparte.
                  Antes las dos decían "Se cotiza por separado" — y arriba de la
                  mínima eso era falso: el envío iba gratis. (2026-07-31) */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('common.shipping')}</span>
                {shipping > 0
                  ? <span data-testid="cart-shipping">{formatMXN(shipping)}</span>
                  : envioGratis
                    ? <span className="text-[hsl(var(--success))] font-medium" data-testid="cart-shipping">{t('checkout.shipping.free')}</span>
                    : <span className="text-muted-foreground text-xs text-right" data-testid="cart-shipping">{t('cart.shippingQuoted')}</span>}
              </div>
              {faltaParaEnvioGratis > 0 && (
                <p className="text-xs text-[hsl(var(--primary))]" data-testid="cart-free-shipping-hint">
                  {t('cart.freeShippingAt', { amount: formatMXN(faltaParaEnvioGratis) })}
                </p>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-heading font-bold text-lg"><span>{t('common.total')}</span><span data-testid="cart-total">{formatMXN(totalConEnvio)}</span></div>
            <Button className="w-full mt-5" size="lg" onClick={onCheckoutClick} data-testid="cart-go-to-checkout-button">{t('cart.checkout')} <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
            <Button asChild variant="ghost" className="w-full mt-2"><Link to="/catalogo">{t('cart.keepShopping')}</Link></Button>
          </Card>
          {/* Widget colapsable de confianza, junto al botón de pagar (Christian,
              2026-07-30) — mismo componente que el checkout y la ficha de
              producto. */}
          <TrustWidget className="mt-4" />
        </div>
      </div>

      {/* Recordatorio de agua bacteriostática (estilo Exoma/Certified) */}
      <Dialog open={bacOpen} onOpenChange={setBacOpen}>
        <DialogContent className="max-w-md text-center" data-testid="bac-water-modal">
          <DialogHeader>
            <div className="mx-auto h-12 w-12 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center mb-2"><Droplet className="h-6 w-6 text-[hsl(var(--primary))]" /></div>
            <DialogTitle className="text-center">{t('bac.title')}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{t('bac.body')}</p>
          {bacPlan && (
            <div className="rounded-lg border border-border bg-[hsl(var(--secondary))]/60 px-3 py-2.5 text-sm" data-testid="bac-smart-line">
              {t('bac.smart', { vials: bacPlan.vials, ml: bacPlan.ml, qty: bacPlan.qty, size: bacPlan.size })}
            </div>
          )}
          <div className="rounded-lg border border-border bg-[hsl(var(--secondary))]/60 px-3 py-2 text-xs text-muted-foreground">{t('bac.note')}</div>
          <div className="flex flex-col gap-2 mt-2">
            <Button onClick={addBacAndCheckout} data-testid="bac-add-button"><Droplet className="h-4 w-4 mr-1.5" /> {t('bac.add', { qty: bacPlan?.qty || 1, size: bacPlan?.size || '', price: formatMXN((bacPlan?.variant.price || 0) * (bacPlan?.qty || 1)) })}</Button>
            <Button variant="outline" onClick={() => { setBacOpen(false); goCheckout(); }} data-testid="bac-skip-button">{t('bac.skip')}</Button>
            <Button variant="ghost" onClick={() => setBacOpen(false)}>{t('bac.back')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
