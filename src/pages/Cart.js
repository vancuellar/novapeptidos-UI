import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

const Cart = () => {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const shipping = subtotal >= 2500 || subtotal === 0 ? 0 : 199;

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-6">{t('cart.title')}</h1>
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
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive h-7" onClick={() => removeItem(item.product_id)} data-testid="cart-remove-item-button"><Trash2 className="h-3.5 w-3.5 mr-1" /> {t('cart.remove')}</Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-4">
          <Card className="p-5 sticky top-32">
            <h3 className="font-heading font-semibold mb-4">{t('cart.summary')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span data-testid="cart-subtotal">{formatMXN(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span>{shipping === 0 ? t('common.free') : formatMXN(shipping)}</span></div>
              {shipping > 0 && <p className="text-xs text-muted-foreground">{t('cart.freeShippingLine')}</p>}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-heading font-bold text-lg"><span>{t('common.total')}</span><span>{formatMXN(subtotal + shipping)}</span></div>
            <Button className="w-full mt-5" size="lg" onClick={() => navigate('/checkout')} data-testid="cart-go-to-checkout-button">{t('cart.checkout')} <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
            <Button asChild variant="ghost" className="w-full mt-2"><Link to="/catalogo">{t('cart.keepShopping')}</Link></Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
