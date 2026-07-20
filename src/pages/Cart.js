import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, BadgePercent, Tag, X, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/context/CartContext';
import { formatMXN } from '@/lib/api';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { useLanguage } from '@/context/LanguageContext';

const BAC = fallbackProducts.find((p) => p.slug === 'agua-bacteriostatica');
const BAC_VARIANT = BAC?.variants?.[0]; // 3 mL, el más económico

const Cart = () => {
  const { items, addItem, updateQty, removeItem, subtotal, discount, discountRate, discountSource, nextTier, distCode, distRate, applyDistCode, clearDistCode } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [bacOpen, setBacOpen] = useState(false);
  const afterDiscount = subtotal - discount; // el envío se cotiza por separado

  const hasBac = items.some((i) => /agua-bacteriostatica/.test(i.product_id));
  const needsBac = items.some((i) => !/agua-bacteriostatica/.test(i.product_id));

  const goCheckout = () => navigate('/checkout');
  const onCheckoutClick = () => {
    if (needsBac && !hasBac && BAC_VARIANT) setBacOpen(true);
    else goCheckout();
  };
  const addBacAndCheckout = () => {
    addItem({ ...BAC, id: `${BAC.id}::${BAC_VARIANT.presentation}`, name: `${BAC.name} ${BAC_VARIANT.presentation}`, price: BAC_VARIANT.price, presentation: BAC_VARIANT.presentation, stock: BAC_VARIANT.stock });
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
        <span className="rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-medium px-2.5 py-0.5">−20% {t('discount.from40k')}</span>
        <span className="text-muted-foreground">{t('discount.noCode')}</span>
      </div>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-3" data-testid="cart-items-table">
          {items.map((item) => (
            <Card key={item.product_id} className="p-4 flex gap-4 items-center">
              <img src={item.image_url} alt={item.name} className="h-20 w-20 rounded-lg object-cover border border-border bg-[hsl(var(--secondary))]" />
              <div className="flex-1 min-w-0">
                <Link to={`/producto/${item.product_id}`} className="font-medium hover:text-[hsl(var(--primary))] line-clamp-1">{item.name}</Link>
                <div className="text-xs text-muted-foreground font-mono-tech mt-0.5">{item.presentation}</div>
                <div className="font-heading font-semibold mt-1">{formatMXN(item.price)}</div>
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
              <p className="text-[11px] text-muted-foreground mt-1.5">{t('discount.noStack')}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span data-testid="cart-subtotal">{formatMXN(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[hsl(var(--success))]"><span>{discountSource === 'code' ? t('discount.lineCode', { code: distCode, rate: Math.round(discountRate * 100) }) : t('discount.line', { rate: Math.round(discountRate * 100) })}</span><span data-testid="cart-discount">− {formatMXN(discount)}</span></div>}
              {discountSource === 'auto' && nextTier && <p className="text-xs text-muted-foreground">{t('discount.nextTier', { amount: formatMXN(nextTier.min - subtotal), rate: Math.round(nextTier.rate * 100) })}</p>}
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span className="text-muted-foreground">{t('cart.shippingTBD')}</span></div>
              <p className="text-xs text-muted-foreground">{t('cart.freeShippingLine')}</p>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-heading font-bold text-lg"><span>{t('common.total')}</span><span data-testid="cart-total">{formatMXN(afterDiscount)}</span></div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{t('cart.plusShipping')}</p>
            <Button className="w-full mt-5" size="lg" onClick={onCheckoutClick} data-testid="cart-go-to-checkout-button">{t('cart.checkout')} <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
            <Button asChild variant="ghost" className="w-full mt-2"><Link to="/catalogo">{t('cart.keepShopping')}</Link></Button>
          </Card>
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
          <div className="rounded-lg border border-border bg-[hsl(var(--secondary))]/60 px-3 py-2 text-xs text-muted-foreground">{t('bac.note')}</div>
          <div className="flex flex-col gap-2 mt-2">
            <Button onClick={addBacAndCheckout} data-testid="bac-add-button"><Droplet className="h-4 w-4 mr-1.5" /> {t('bac.add', { price: formatMXN(BAC_VARIANT?.price || 0) })}</Button>
            <Button variant="outline" onClick={() => { setBacOpen(false); goCheckout(); }} data-testid="bac-skip-button">{t('bac.skip')}</Button>
            <Button variant="ghost" onClick={() => setBacOpen(false)}>{t('bac.back')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
