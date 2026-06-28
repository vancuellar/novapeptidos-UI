import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import api, { formatMXN, PAYMENT_LABELS, STATUS_LABELS } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const STATUS_COLORS = {
  pendiente: 'bg-amber-100 text-amber-900', confirmado: 'bg-sky-100 text-sky-900',
  enviado: 'bg-indigo-100 text-indigo-900', entregado: 'bg-emerald-100 text-emerald-900',
  cancelado: 'bg-slate-100 text-slate-700',
};

const Account = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) api.get('/orders/me').then((r) => setOrders(r.data)).catch(() => {});
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">Mi cuenta</h1>
          <p className="text-muted-foreground text-sm">{user.name} · {user.email}</p>
        </div>
        <Button variant="outline" onClick={() => { logout(); navigate('/'); }}><LogOut className="h-4 w-4 mr-1.5" /> Salir</Button>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders"><Package className="h-4 w-4 mr-1.5" /> Mis pedidos</TabsTrigger>
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-1.5" /> Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-5">
          {orders.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground">Aún no tienes pedidos. <Button variant="link" onClick={() => navigate('/catalogo')}>Explorar catálogo</Button></Card>
          ) : (
            <div className="space-y-3" data-testid="account-orders-table">
              {orders.map((o) => (
                <Card key={o.id} className="p-4" data-testid="account-order-row">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-mono-tech font-medium">{o.order_number}</div>
                      <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString('es-MX')} · {o.items.length} artículo(s)</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={STATUS_COLORS[o.status]}>{STATUS_LABELS[o.status]}</Badge>
                      <span className="font-heading font-bold">{formatMXN(o.total)}</span>
                      <Dialog>
                        <DialogTrigger asChild><Button variant="outline" size="sm" data-testid="account-open-order-button">Detalle</Button></DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Pedido {o.order_number}</DialogTitle></DialogHeader>
                          <div className="space-y-2 text-sm">
                            {o.items.map((it) => <div key={it.product_id} className="flex justify-between"><span className="text-muted-foreground">{it.quantity} × {it.name}</span><span>{formatMXN(it.price * it.quantity)}</span></div>)}
                            <Separator className="my-2" />
                            <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>{o.shipping === 0 ? 'Gratis' : formatMXN(o.shipping)}</span></div>
                            <div className="flex justify-between font-bold"><span>Total</span><span>{formatMXN(o.total)}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Pago</span><span>{PAYMENT_LABELS[o.payment_method]}</span></div>
                            <div className="text-xs text-muted-foreground mt-2">Envío a: {o.customer.address}, {o.customer.city} {o.customer.state} {o.customer.postal_code}</div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          <Card className="p-6 space-y-3">
            <div><div className="text-xs text-muted-foreground">Nombre</div><div className="font-medium">{user.name}</div></div>
            <div><div className="text-xs text-muted-foreground">Correo</div><div className="font-medium">{user.email}</div></div>
            <div><div className="text-xs text-muted-foreground">Tipo de cuenta</div><div className="font-medium capitalize">{user.role === 'admin' ? 'Administrador' : 'Cliente'}</div></div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
