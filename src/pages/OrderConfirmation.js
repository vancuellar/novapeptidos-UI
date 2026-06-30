import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
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
