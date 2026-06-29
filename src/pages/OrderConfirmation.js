import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import api, { formatMXN, PAYMENT_LABELS } from '@/lib/api';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${orderNumber}`).then((r) => setOrder(r.data)).catch(() => {});
  }, [orderNumber]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Card className="p-8 text-center">
        <CheckCircle2 className="h-16 w-16 mx-auto text-[hsl(var(--success))] mb-4" />
        <h1 className="font-heading text-2xl font-bold">¡Pedido recibido!</h1>
        <p className="text-muted-foreground mt-2">Tu pedido <span className="font-mono-tech font-medium text-foreground">{orderNumber}</span> fue registrado correctamente.</p>
        {order && (
          <div className="mt-6 text-left">
            <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
              {order.items.map((it) => (
                <div key={it.product_id} className="flex justify-between"><span className="text-muted-foreground">{it.quantity} × {it.name}</span><span>{formatMXN(it.price * it.quantity)}</span></div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatMXN(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>{order.shipping === 0 ? 'Gratis' : formatMXN(order.shipping)}</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span>{formatMXN(order.total)}</span></div>
              <Separator className="my-2" />
              <div className="flex justify-between"><span className="text-muted-foreground">Método de pago</span><span>{PAYMENT_LABELS[order.payment_method] || order.payment_method}</span></div>
            </div>
            <div className="mt-4 rounded-lg bg-[hsl(var(--warning))] border border-[hsl(var(--warning-border))] text-[hsl(var(--warning-foreground))] p-3 text-xs leading-relaxed">
              <strong>Nota:</strong> Los métodos de pago se muestran como propuesta. Aún no se procesa el cobro en línea; nuestro equipo te contactará para coordinar el pago y el envío.
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild><Link to="/catalogo">Seguir comprando</Link></Button>
          <Button asChild variant="outline"><Link to="/cuenta"><Package className="h-4 w-4 mr-1.5" /> Ver mis pedidos</Link></Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
