import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Landmark, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import api, { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const { t } = useLanguage();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${orderNumber}`).then((r) => setOrder(r.data)).catch(() => {});
  }, [orderNumber]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-8 text-center">
        <CheckCircle2 className="h-16 w-16 mx-auto text-[hsl(var(--success))] mb-4" />
        <h1 className="font-heading text-2xl font-bold">{t('order.received')}</h1>
        <p className="text-muted-foreground mt-2">{t('order.receivedBody', { number: orderNumber })}</p>
        {order && (
          <div className="mt-6 text-left">
            <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
              {order.items.map((it) => (
                <div key={it.product_id} className="flex justify-between"><span className="text-muted-foreground">{it.quantity} × {it.name}</span><span>{formatMXN(it.price * it.quantity)}</span></div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span>{formatMXN(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span>{order.shipping === 0 ? t('common.free') : formatMXN(order.shipping)}</span></div>
              <div className="flex justify-between font-bold"><span>{t('common.total')}</span><span>{formatMXN(order.total)}</span></div>
              <Separator className="my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">{t('order.paymentMethod')}</span><span>{t(`payment.${order.payment_method}.label`) || order.payment_method}</span></div>
            </div>
            {order.payment_method === 'spei' && order.spei && (
              <div className="mt-4 rounded-lg border border-[hsl(var(--primary))]/30 bg-[hsl(var(--accent))] p-4 text-left" data-testid="spei-instructions">
                <div className="flex items-center gap-2 font-heading font-semibold mb-2"><Landmark className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('spei.title')}</div>
                <p className="text-xs text-muted-foreground mb-3">{t('spei.instructions')}</p>
                <div className="space-y-2 text-sm">
                  {[
                    [t('spei.beneficiary'), order.spei.beneficiary],
                    [t('spei.bank'), order.spei.bank],
                    ['CLABE', order.spei.clabe],
                    [t('spei.amount'), formatMXN(order.total)],
                    [t('spei.reference'), order.order_number],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-2 border-b border-border pb-1.5">
                      <span className="text-muted-foreground text-xs">{label}</span>
                      <button type="button" onClick={() => { navigator.clipboard?.writeText(String(value)); toast.success(t('spei.copied')); }}
                        className="inline-flex items-center gap-1.5 font-mono-tech font-medium hover:text-[hsl(var(--primary))]">
                        {value} <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">{t('spei.confirmNote')}</p>
              </div>
            )}
            <div className="mt-4 rounded-lg bg-[hsl(var(--warning))] border border-[hsl(var(--warning-border))] text-[hsl(var(--warning-foreground))] p-3 text-xs leading-relaxed">
              <strong>{t('order.noteTitle')}</strong> {t('order.noteBody')}
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild><Link to="/catalogo">{t('cart.keepShopping')}</Link></Button>
          <Button asChild variant="outline"><Link to="/cuenta"><Package className="h-4 w-4 mr-1.5" /> {t('order.viewMyOrders')}</Link></Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
