import React, { useCallback, useEffect, useState } from 'react';
import { Truck, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import api, { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import AvisoSobrePedido from '@/components/AvisoSobrePedido';
import HojaDeGuia from '@/components/HojaDeGuia';
import BotonImprimirGuia from '@/components/BotonImprimirGuia';

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
 *
 * ⛔ «YA NO ESTÁ» NO ES «ALGO FALLÓ» (Christián, 2026-08-01). Todos los errores decían lo
 * mismo —«No se pudo abrir el pedido»— así que un aviso de la campanita que apuntaba a un
 * pedido ya borrado parecía una falla del sistema, y el aviso huérfano se quedaba ahí para
 * siempre. Ahora un 404 se dice como lo que es (ese pedido ya se borró) y trae el botón
 * para quitar el aviso; cualquier otro error sigue siendo «no se pudo, inténtalo de nuevo».
 * `onQuitarAviso` sólo lo manda la campanita: desde una lista de pedidos no hay aviso que
 * quitar y el botón ni se pinta.
 */
const FichaPedido = ({ orderNumber, open, onClose, admin = false, onQuitarAviso }) => {
  const { t, language } = useLanguage();
  const [pedido, setPedido] = useState(null);
  // { tipo: 'borrado' | 'ajeno' | 'falla', texto }
  const [error, setError] = useState(null);
  // Poner la guía SIN salir de aquí: esta ficha se abre desde la campanita, desde la
  // ficha del cliente y desde las listas, así que es el único lugar por donde pasan
  // todos los caminos que llevan a un pedido (Christián, 2026-07-30).
  const [guiaAbierta, setGuiaAbierta] = useState(false);

  const cargar = useCallback(() => {
    const ruta = admin
      ? `/admin/orders/${orderNumber}/detalle`
      : `/distributor/orders/${orderNumber}`;
    api.get(ruta)
      .then((r) => setPedido(r.data))
      .catch((e) => {
        // El 404 del servidor es la única forma de saber que el pedido ya no existe, y
        // se distingue solo: EX-20260731-2316 (borrado) contesta 404 y EX-20260730-5930
        // contesta 200. Sin red no hay `e.response`, y eso NO es un pedido borrado.
        const codigo = e.response?.status;
        if (codigo === 404) setError({ tipo: 'borrado', texto: t('order.detail.deleted') });
        else if (codigo === 403) setError({ tipo: 'ajeno', texto: t('order.detail.forbidden') });
        else setError({ tipo: 'falla', texto: t('order.detail.error') });
      });
  }, [orderNumber, admin, t]);

  useEffect(() => {
    if (!open || !orderNumber) return;
    setPedido(null);
    setError(null);
    cargar();
  }, [open, orderNumber, cargar]);

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

        {error && (
          <div className="space-y-3" data-testid="ficha-pedido-aviso">
            {/* Un pedido borrado no es una falla: se dice en gris, no en rojo de alarma. */}
            <p className={`text-sm ${error.tipo === 'borrado' ? 'text-muted-foreground' : 'text-destructive'}`}
              data-testid="ficha-pedido-error">{error.texto}</p>
            {/* LA SALIDA. Sin este botón el aviso huérfano se queda en el buzón para
                siempre: apunta a un pedido que ya no existe y no hay forma de cerrarlo. */}
            {error.tipo === 'borrado' && onQuitarAviso && (
              <Button variant="outline" size="sm" data-testid="ficha-pedido-quitar-aviso"
                onClick={() => { onQuitarAviso(); onClose(); }}>
                <Trash2 className="h-4 w-4 mr-1.5" /> {t('order.detail.removeNotice')}
              </Button>
            )}
          </div>
        )}
        {!pedido && !error && <Skeleton className="h-64 rounded-lg" />}

        {pedido && (
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1.5">{t('order.detail.what')}</div>
              <div className="rounded-lg border border-border divide-y divide-border">
                {/* Esta ficha no trae el id de producto por renglón, solo el nombre — se
                    empareja por nombre para la nota chiquita (ya no el bloque grande de
                    "dos entregas"). Es lo mismo que ve el cliente, aquí para consulta. */}
                {pedido.items.map((it, i) => {
                  const sobrePedido = (pedido.backorder_items || []).some(
                    (b) => (b.name || '').trim().toLowerCase() === (it.name || '').trim().toLowerCase());
                  return (
                    <div key={i} className="flex items-center justify-between gap-3 p-2.5">
                      <div className="min-w-0">
                        <div className="truncate">{it.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {it.presentation} · {formatMXN(it.unit_price)} c/u
                        </div>
                        {sobrePedido && <AvisoSobrePedido testid="ficha-pedido-item-sobre-pedido" />}
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-semibold">×{it.quantity}</div>
                        <div className="text-xs text-muted-foreground">{formatMXN(it.line_total)}</div>
                      </div>
                    </div>
                  );
                })}
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
              {/* Un toque y sube la hoja de la guía. El mismo botón para el admin y para
                  el distribuidor; cada quien guarda por la ruta que le toca. */}
              <Button variant="outline" size="sm" className="w-full mt-3"
                onClick={() => setGuiaAbierta(true)} data-testid="ficha-pedido-guia">
                <Truck className="h-4 w-4 mr-1.5" />
                {pedido.tracking_number ? t('guia.edit') : t('guia.add')}
              </Button>
              {/* IMPRIMIR LA GUÍA — sin salir a la página de la paquetería (Christián,
                  2026-07-31: «quiero manejar TODO desde nuestra app»). Sale sólo cuando
                  hay etiqueta que traer: una guía tecleada a mano no tiene PDF nuestro.
                  Cada quien pide por SU ruta; el candado lo pone el servidor. */}
              {pedido.tiene_etiqueta && (
                <div className="flex items-center gap-2 mt-2">
                  <BotonImprimirGuia testid="ficha-pedido-imprimir" className="flex-1"
                    ruta={admin
                      ? `/admin/orders/${pedido.order_number}/etiqueta`
                      : `/distributor/orders/${pedido.order_number}/etiqueta`} />
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>

      <HojaDeGuia pedido={pedido} open={guiaAbierta} onClose={() => setGuiaAbierta(false)}
        onGuardada={cargar} />
    </Dialog>
  );
};

export default FichaPedido;
