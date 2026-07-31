import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TrustBadges from '@/components/TrustBadges';
import { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

// "Mis Pedidos": las compras que hizo ESTA persona (no las de sus clientes).
//
// Vive aquí —y no dentro de Mi cuenta— porque el MISMO bloque se muestra en los
// dos tableros: el del cliente y el del distribuidor. El distribuidor también
// compra, y antes tenía que salirse de su panel a /cuenta para ver sus propios
// pedidos: justo la información regada que Christián pidió juntar (2026-07-30).
const STATUS_COLORS = {
  pendiente: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  confirmado: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  enviado: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-border',
  entregado: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
  cancelado: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-border',
};

const OrdersPanel = ({ orders = [] }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      {orders.length === 0 ? (
        <Card className="p-10 text-center text-muted-foreground">
          {t('account.noOrders')}
          <Button variant="link" onClick={() => navigate('/catalogo')}>{t('account.exploreCatalog')}</Button>
        </Card>
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
                        {o.items.map((it) => (
                          <div key={it.product_id} className="flex justify-between gap-3">
                            <span className="text-muted-foreground">
                              {it.quantity} × {it.name}
                              {it.quantity > 1 && <span className="text-xs"> ({formatMXN(it.price)} c/u)</span>}
                            </span>
                            <span className="whitespace-nowrap">{formatMXN(it.price * it.quantity)}</span>
                          </div>
                        ))}
                        <Separator className="my-2" />
                        <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span>{formatMXN(o.subtotal)}</span></div>
                        {o.discount > 0 && (
                          <div className="flex justify-between text-[hsl(var(--success))]" data-testid="account-order-discount">
                            <span>{t('account.orderDiscount', { pct: Math.round((o.discount_rate || 0) * 100) })}</span>
                            <span>−{formatMXN(o.discount)}</span>
                          </div>
                        )}
                        {o.points_used > 0 && (
                          <div className="flex justify-between text-[hsl(var(--success))]">
                            <span>{t('account.orderPoints', { points: o.points_used })}</span>
                            <span>−{formatMXN(o.points_used)}</span>
                          </div>
                        )}
                        <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span>{o.shipping === 0 ? t('cart.shippingQuoted') : formatMXN(o.shipping)}</span></div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold text-base"><span>{t('common.total')}</span><span>{formatMXN(o.total)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">{t('common.payment')}</span><span>{t(`payment.${o.payment_method}.label`)}</span></div>
                        <div className="text-xs text-muted-foreground mt-2">{t('account.shipTo', { address: o.customer.address, city: o.customer.city, state: o.customer.state, postalCode: o.customer.postal_code })}</div>
                        {/* ⛔ CÓMO VOLVER A LOS DATOS DE PAGO. Christián, 2026-07-31:
                            «que pueda volver a verlos las veces que haga falta».
                            La CLABE y la ficha de OXXO viven en la ficha del pedido,
                            pero desde aquí NO HABÍA NI UN ENLACE: para volver a
                            verlas había que teclear la URL a mano. Un pedido
                            pendiente de pago sin camino de regreso a cómo pagarlo es
                            una venta que se cae sola. */}
                        {o.status === 'pendiente' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full"
                            onClick={() => navigate(`/pedido/${o.order_number}`)}
                            data-testid="account-order-payment-details"
                          >
                            {t('account.seePaymentDetails')}
                          </Button>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Va al pie de los pedidos, con o sin pedidos: al que ya compró le
          recuerda qué recibe, y al que todavía no, le contesta las dudas
          justo donde iba a irse. */}
      <TrustBadges className="mt-6" />
    </>
  );
};

export default OrdersPanel;
