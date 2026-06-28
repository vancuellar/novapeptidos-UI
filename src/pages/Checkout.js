import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, Store, Landmark, Truck, ShieldCheck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import api, { formatMXN, PAYMENT_METHODS } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const ICONS = { Wallet, CreditCard, Store, Landmark, Truck };

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('mercado_pago');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: user?.name || '', email: user?.email || '', phone: '', address: '',
    city: '', state: '', postal_code: '', notes: '',
  });

  const shipping = subtotal >= 2500 ? 0 : 199;
  const total = subtotal + shipping;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (items.length === 0) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">Tu carrito está vacío.</p><Button className="mt-4" onClick={() => navigate('/catalogo')}>Ver catálogo</Button></div>;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone || !form.address) {
      toast.error('Completa los campos obligatorios');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({ product_id: i.product_id, name: i.name, price: i.price, quantity: i.quantity, presentation: i.presentation, image_url: i.image_url })),
        customer: form,
        payment_method: payment,
        shipping,
      };
      const res = await api.post('/orders', payload);
      clearCart();
      toast.success('Pedido realizado con éxito');
      navigate(`/pedido/${res.data.order_number}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error al crear el pedido');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-6">Finalizar compra</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-5">
            <h3 className="font-heading font-semibold mb-4">Datos de contacto y envío</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>Nombre completo *</Label><Input className="mt-1.5" value={form.full_name} onChange={(e) => set('full_name', e.target.value)} data-testid="checkout-name-input" /></div>
              <div><Label>Correo electrónico *</Label><Input type="email" className="mt-1.5" value={form.email} onChange={(e) => set('email', e.target.value)} data-testid="checkout-email-input" /></div>
              <div><Label>Teléfono *</Label><Input className="mt-1.5" value={form.phone} onChange={(e) => set('phone', e.target.value)} data-testid="checkout-phone-input" /></div>
              <div className="sm:col-span-2"><Label>Dirección (calle y número) *</Label><Input className="mt-1.5" value={form.address} onChange={(e) => set('address', e.target.value)} data-testid="checkout-address-input" /></div>
              <div><Label>Ciudad / Municipio</Label><Input className="mt-1.5" value={form.city} onChange={(e) => set('city', e.target.value)} data-testid="checkout-city-input" /></div>
              <div><Label>Estado</Label><Input className="mt-1.5" value={form.state} onChange={(e) => set('state', e.target.value)} data-testid="checkout-state-input" /></div>
              <div><Label>Código postal</Label><Input className="mt-1.5" value={form.postal_code} onChange={(e) => set('postal_code', e.target.value)} data-testid="checkout-postal-code-input" /></div>
              <div className="sm:col-span-2"><Label>Notas (opcional)</Label><Textarea className="mt-1.5" value={form.notes} onChange={(e) => set('notes', e.target.value)} data-testid="checkout-notes-input" /></div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-heading font-semibold mb-1">Método de pago</h3>
            <p className="text-xs text-muted-foreground mb-4">Los métodos se muestran como propuesta (sin procesamiento real por ahora).</p>
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3" data-testid="checkout-payment-method-radio">
              {PAYMENT_METHODS.map((m) => {
                const Icon = ICONS[m.icon] || CreditCard;
                return (
                  <Label key={m.id} htmlFor={m.id} className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${payment === m.id ? 'border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--ring))] ring-offset-1' : 'border-border hover:bg-[hsl(var(--secondary))]'}`} data-testid={`checkout-payment-${m.id}`}>
                    <RadioGroupItem value={m.id} id={m.id} />
                    <div className="h-9 w-9 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center"><Icon className="h-4 w-4 text-[hsl(var(--primary))]" /></div>
                    <div><div className="font-medium text-sm">{m.label}</div><div className="text-xs text-muted-foreground">{m.desc}</div></div>
                  </Label>
                );
              })}
            </RadioGroup>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-5 sticky top-32" data-testid="checkout-order-summary">
            <h3 className="font-heading font-semibold mb-4">Resumen del pedido</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((i) => (
                <div key={i.product_id} className="flex gap-3 items-center text-sm">
                  <img src={i.image_url} alt={i.name} className="h-12 w-12 rounded-md object-cover border border-border" />
                  <div className="flex-1 min-w-0"><div className="line-clamp-1">{i.name}</div><div className="text-xs text-muted-foreground">x{i.quantity}</div></div>
                  <div>{formatMXN(i.price * i.quantity)}</div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatMXN(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>{shipping === 0 ? 'Gratis' : formatMXN(shipping)}</span></div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-heading font-bold text-lg"><span>Total</span><span>{formatMXN(total)}</span></div>
            <Button type="submit" className="w-full mt-5" size="lg" disabled={submitting} data-testid="checkout-place-order-button">{submitting ? 'Procesando...' : 'Realizar pedido'}</Button>
            <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Pago seguro</span>
              <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" /> COA por lote</span>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
