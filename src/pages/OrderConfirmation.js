import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Landmark, Copy, Upload, FileCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import api, { esCaidaDeApi, formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import AvisoSobrePedido from '@/components/AvisoSobrePedido';
// El rastreo se ve AQUÍ y no en la página de FedEx (Christián, 2026-07-31). El iframe
// que él propuso no se puede: las paqueterías mandan `x-frame-options: SAMEORIGIN` y el
// marco sale en blanco. Ver RastreoEnvio.js.
import RastreoEnvio from '@/components/RastreoEnvio';
import { track } from '@/lib/track';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const { t } = useLanguage();
  const [order, setOrder] = useState(null);
  // '' | 'caida' | 'error'. Antes el catch era silencioso y con la API caída la
  // página enseñaba el check verde SIN monto, SIN instrucciones SPEI y sin decir
  // nada: una confirmación vacía que parecía completa.
  const [fallo, setFallo] = useState('');
  const [uploading, setUploading] = useState(false);
  const [receiptUp, setReceiptUp] = useState(false);
  const fileRef = useRef(null);
  const purchaseAvisado = useRef(false);
  // Qué renglones van sobre pedido, para la nota chiquita debajo de CADA uno
  // (ya no el bloque grande de "dos entregas").
  const sobrePedidoIds = new Set((order?.backorder_items || []).map((b) => b.product_id));

  useEffect(() => {
    api.get(`/orders/${orderNumber}`)
      .then((r) => { setOrder(r.data); setReceiptUp(!!r.data.spei_receipt_at); setFallo(''); })
      .catch((err) => setFallo(esCaidaDeApi(err) ? 'caida' : 'error'));
  }, [orderNumber]);

  // ⛔ EL `Purchase` DE META SALE AQUÍ Y SOLO SI YA SE PAGÓ. Se disparaba al CREAR el
  // pedido, y un pedido creado no es una venta: SPEI, cripto y OXXO nacen pendientes y
  // muchos no se pagan nunca. Así, cada carrito abandonado en la pasarela contaba como
  // compra, el ROAS salía inflado y Meta aprendía a buscar gente que no paga.
  //
  // Para tarjeta el cliente vuelve a esta página ya aprobado y se dispara aquí. Para los
  // asíncronos (cripto, OXXO, SPEI) puede que el dinero entre cuando ya cerró la pestaña:
  // ésos los cubre el servidor por la Conversions API (`meta_capi.py`) en cuanto llega el
  // webhook. Los DOS mandan el mismo `purchase-<número>` y Meta los une en uno solo — sin
  // ese id compartido, la venta contaría doble.
  //
  // El `useRef` evita repetirlo si el componente se vuelve a renderizar: la deduplicación
  // de Meta es por evento, no una licencia para gritar.
  useEffect(() => {
    if (!order || !order.paid || purchaseAvisado.current) return;
    purchaseAvisado.current = true;
    track('purchase', { value: order.total || 0, order_number: order.order_number || '' });
  }, [order]);

  const uploadReceipt = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      await api.post(`/orders/${orderNumber}/spei-receipt`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setReceiptUp(true);
      toast.success(t('spei.receiptOk'));
    } catch (err) {
      toast.error(err.response?.data?.detail || t('common.error'));
    } finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

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
                <div key={it.product_id}>
                  <div className="flex justify-between"><span className="text-muted-foreground">{it.quantity} × {it.name}</span><span>{formatMXN(it.price * it.quantity)}</span></div>
                  {/* La nota chiquita, pegada a SU producto: ya no el bloque grande de
                      "dos entregas" arriba de todo. */}
                  {sobrePedidoIds.has(it.product_id) && (
                    <AvisoSobrePedido testid="order-item-sobre-pedido" />
                  )}
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span>{formatMXN(order.subtotal)}</span></div>
              {/* Ya no se cobra envio en el pedido: se cotiza aparte. Los pedidos viejos que si lo pagaron siguen enseñando su monto. */}
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span>{order.shipping === 0 ? t('cart.shippingQuoted') : formatMXN(order.shipping)}</span></div>
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
                <div className="mt-3 pt-3 border-t border-border">
                  {receiptUp ? (
                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--success))]" data-testid="spei-receipt-done">
                      <FileCheck2 className="h-4 w-4" /> {t('spei.receiptDone')}
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground mb-2">{t('spei.receiptAsk')}</p>
                      <input ref={fileRef} type="file" accept="application/pdf,image/*" className="hidden" onChange={uploadReceipt} data-testid="spei-receipt-input" />
                      <Button variant="outline" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()} data-testid="spei-receipt-upload">
                        <Upload className="h-4 w-4 mr-1.5" /> {uploading ? t('spei.receiptUploading') : t('spei.receiptCta')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
            {/* ⛔ LA FICHA DE OXXO SE PODÍA PERDER PARA SIEMPRE. La URL de Mercado
                Pago —que ES la ficha con el código de barras— viajaba una sola vez
                en la respuesta del checkout y no se guardaba en ningún lado: quien
                cerraba esa pestaña antes de pagar ya no tenía cómo volver a ella.
                Ahora el servidor la guarda en el pedido y desde aquí se recupera las
                veces que haga falta, que es lo que pidió Christián (2026-07-31). */}
            {order.payment_method === 'oxxo' && order.card_checkout_url
              && order.status === 'pendiente' && (
              <div className="mt-4 rounded-lg border border-[hsl(var(--primary))]/30 bg-[hsl(var(--accent))] p-4 text-left" data-testid="oxxo-voucher">
                <div className="flex items-center gap-2 font-heading font-semibold mb-2">
                  <Landmark className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('oxxo.title')}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{t('oxxo.instructions')}</p>
                <Button asChild variant="outline" size="sm">
                  <a href={order.card_checkout_url} target="_blank" rel="noopener noreferrer" data-testid="oxxo-voucher-link">
                    {t('oxxo.openVoucher')}
                  </a>
                </Button>
              </div>
            )}
            {/* Dónde va el paquete, sin salir de exygenlabs.com. Se pinta solo cuando
                el pedido ya está pagado: antes de eso no hay nada que rastrear y un
                bloque de envío encima de unas instrucciones de pago sólo confunde. */}
            {order.paid && <RastreoEnvio orderNumber={orderNumber} />}
            <div className="mt-4 rounded-lg bg-[hsl(var(--warning))] border border-[hsl(var(--warning-border))] text-[hsl(var(--warning-foreground))] p-3 text-xs leading-relaxed">
              <strong>{t('order.noteTitle')}</strong> {t('order.noteBody')}
            </div>
          </div>
        )}
        {!order && fallo && (
          <div className="mt-6 rounded-lg bg-[hsl(var(--warning))] border border-[hsl(var(--warning-border))] text-[hsl(var(--warning-foreground))] p-3 text-sm leading-relaxed text-left" data-testid="order-load-error">
            {t(fallo === 'caida' ? 'order.detalleCaida' : 'order.detalleError')}
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
