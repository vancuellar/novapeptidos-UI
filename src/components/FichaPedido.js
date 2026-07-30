import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import api, { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import AvisoSobrePedido from '@/components/AvisoSobrePedido';

/**
 * LA FICHA DE UN PEDIDO — qué compró y qué pasó con su dinero.
 *
 * ⛔ EL CANDADO NO VIVE AQUÍ. El servidor exige que el pedido traiga el `referred_by` del
 * distribuidor que pregunta y contesta 403 si no (`/distributor/orders/{numero}`). Esta
 * pantalla solo pinta lo que el servidor decidió entregar: si el candado viviera en el
 * navegador, se abriría tecleando el número de pedido de otro en la barra de direcciones.
 *
 * `ruta` la decide quien la usa: el distribuidor pide la suya (filtrada) y el admin la de
 * admin (ve todas). Son dos rutas distintas a propósito.
 */
const FichaPedido = ({ orderNumber, open, onClose, admin = false }) => {
  const { t, language } = useLanguage();
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !orderNumber) return;
    setPedido(null);
    setError(null);
    const ruta = admin
      ? `/admin/orders/${orderNumber}/detalle`
      : `/distributor/orders/${orderNumber}`;
    api.get(ruta)
      .then((r) => setPedido(r.data))
      .catch((e) => setError(e.response?.status === 403
        ? t('order.detail.forbidden')
        : t('order.detail.error')));
  }, [open, orderNumber, admin, t]);

  const fecha = (v) => (v ? new Date(v).toLocaleString(language) : '—');
  const fila = (etiqueta, valor, fuerte = false) => (
    <div className="flex justify-between gap-3 py-0.5">
      <span className="text-muted-foreground">{etiqueta}</span>
      <span className={`text-right ${fuerte ? 'font-semibold' : ''}`}>{valor}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" data-testid="ficha-pedido">
        <DialogHeader>
          <DialogTitle className="font-mono-tech text-base">{orderNumber}</DialogTitle>
        </DialogHeader>

        {error && <p className="text-sm text-destructive" data-testid="ficha-pedido-error">{error}</p>}
        {!pedido && !error && <Skeleton className="h-64 rounded-lg" />}

        {pedido && (
          <div className="space-y-4 text-sm">
            {pedido.backorder_items?.length > 0 && (
              <AvisoSobrePedido lineas={pedido.backorder_items} testid="ficha-pedido-sobre-pedido" />
            )}

            <div>
              <div className="text-xs font-semibold mb-1.5">{t('order.detail.what')}</div>
              <div className="rounded-lg border border-border divide-y divide-border">
                {pedido.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-2.5">
                    <div className="min-w-0">
                      <div className="truncate">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {it.presentation} · {formatMXN(it.unit_price)} c/u
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-semibold">×{it.quantity}</div>
                      <div className="text-xs text-muted-foreground">{formatMXN(it.line_total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold mb-1.5">{t('order.detail.money')}</div>
              {fila(t('common.subtotal'), formatMXN(pedido.subtotal))}
              {pedido.discount > 0 && fila(
                pedido.discount_code
                  ? t('order.detail.discountWithCode', { code: pedido.discount_code, rate: Math.round((pedido.discount_rate || 0) * 100) })
                  : t('order.detail.discount', { rate: Math.round((pedido.discount_rate || 0) * 100) }),
                `− ${formatMXN(pedido.discount)}`)}
              {pedido.points_used > 0 && fila(t('order.detail.pointsUsed'), `− ${formatMXN(pedido.points_used)}`)}
              {/* Envío gratis NO quiere decir que no costó: se dice lo que absorbió la casa. */}
              {fila(t('common.shipping'), pedido.shipping_free
                ? t('order.detail.shippingFree', { amount: formatMXN(pedido.shipping_absorbed || 0) })
                : formatMXN(pedido.shipping))}
              {fila(t('common.total'), formatMXN(pedido.total), true)}
              {pedido.points_earned > 0 && fila(t('order.detail.pointsEarned'), pedido.points_earned)}
              <Separator className="my-2" />
              {/* Pagado ≠ entregado: son dos preguntas distintas y aquí se contestan las dos. */}
              {fila(t('order.detail.paid'), pedido.paid
                ? <span className="text-[hsl(var(--success))] font-semibold">{t('order.detail.paidYes', { when: fecha(pedido.paid_at) })}</span>
                : <span className="text-[hsl(var(--warning-foreground))] font-semibold">{t('order.detail.paidNo', { amount: formatMXN(pedido.por_cobrar || 0) })}</span>)}
              {fila(t('order.detail.method'), t(`payment.${pedido.payment_method}.label`) || pedido.payment_method)}
              {pedido.my_commission != null && fila(
                t('order.detail.myCommission'),
                <span className="text-[hsl(var(--primary))] font-semibold">{formatMXN(pedido.my_commission)}</span>)}
            </div>

            <div>
              <div className="text-xs font-semibold mb-1.5">{t('order.detail.delivery')}</div>
              {fila(t('order.detail.status'), <Badge variant="outline" className="text-[10px]">{t(`status.${pedido.status}`)}</Badge>)}
              {fila(t('order.detail.placed'), fecha(pedido.created_at))}
              {pedido.carrier && fila(t('order.detail.carrier'), pedido.carrier)}
              {pedido.tracking_number && fila(t('order.detail.tracking'),
                pedido.tracking_url
                  ? <a href={pedido.tracking_url} target="_blank" rel="noreferrer" className="text-[hsl(var(--primary))] underline">{pedido.tracking_number}</a>
                  : <span className="font-mono-tech">{pedido.tracking_number}</span>)}
              {pedido.delivered_at && fila(t('order.detail.delivered'), fecha(pedido.delivered_at))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FichaPedido;
