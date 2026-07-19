import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, LogOut, ShoppingBag, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import api, { formatMXN } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const STATUS_COLORS = {
  pendiente: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  confirmado: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  enviado: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-border',
  entregado: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
  cancelado: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-border',
};

const Account = () => {
  const { user, loading, logout } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) api.get('/orders/me').then((r) => setOrders(r.data)).catch(() => {});
  }, [user]);

  if (!user) return null;

  const validOrders = orders.filter((o) => o.status !== 'cancelado');
  const totalSpent = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{t('account.title')}</h1>
          <p className="text-muted-foreground text-sm">{user.name} · {user.email}</p>
        </div>
        <Button variant="outline" onClick={() => { logout(); navigate('/'); }}><LogOut className="h-4 w-4 mr-1.5" /> {t('account.signOut')}</Button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs"><ShoppingBag className="h-4 w-4" /> {t('account.stats.orders')}</div>
          <div className="font-heading text-xl font-bold mt-1">{orders.length}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs"><DollarSign className="h-4 w-4" /> {t('account.stats.spent')}</div>
          <div className="font-heading text-xl font-bold mt-1">{formatMXN(totalSpent)}</div>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders"><Package className="h-4 w-4 mr-1.5" /> {t('account.ordersTab')}</TabsTrigger>
          <TabsTrigger value="profile"><User className="h-4 w-4 mr-1.5" /> {t('account.profileTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-5">
          {orders.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground">{t('account.noOrders')} <Button variant="link" onClick={() => navigate('/catalogo')}>{t('account.exploreCatalog')}</Button></Card>
          ) : (
            <div className="space-y-3" data-testid="account-orders-table">
              {orders.map((o) => (
                <Card key={o.id} className="p-4" data-testid="account-order-row">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-mono-tech font-medium">{o.order_number}</div>
                      <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString(language)} · {t('common.items', { count: o.items.length })}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={STATUS_COLORS[o.status]}>{t(`status.${o.status}`)}</Badge>
                      <span className="font-heading font-bold">{formatMXN(o.total)}</span>
                      <Dialog>
                        <DialogTrigger asChild><Button variant="outline" size="sm" data-testid="account-open-order-button">{t('account.detail')}</Button></DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>{t('account.orderTitle', { number: o.order_number })}</DialogTitle></DialogHeader>
                          <div className="space-y-2 text-sm">
                            {o.items.map((it) => <div key={it.product_id} className="flex justify-between"><span className="text-muted-foreground">{it.quantity} × {it.name}</span><span>{formatMXN(it.price * it.quantity)}</span></div>)}
                            <Separator className="my-2" />
                            <div className="flex justify-between"><span className="text-muted-foreground">{t('common.shipping')}</span><span>{o.shipping === 0 ? t('common.free') : formatMXN(o.shipping)}</span></div>
                            <div className="flex justify-between font-bold"><span>{t('common.total')}</span><span>{formatMXN(o.total)}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">{t('common.payment')}</span><span>{t(`payment.${o.payment_method}.label`)}</span></div>
                            <div className="text-xs text-muted-foreground mt-2">{t('account.shipTo', { address: o.customer.address, city: o.customer.city, state: o.customer.state, postalCode: o.customer.postal_code })}</div>
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
            <div><div className="text-xs text-muted-foreground">{t('account.name')}</div><div className="font-medium">{user.name}</div></div>
            <div><div className="text-xs text-muted-foreground">{t('account.email')}</div><div className="font-medium">{user.email}</div></div>
            <div><div className="text-xs text-muted-foreground">{t('account.accountType')}</div><div className="font-medium capitalize">{user.role === 'admin' ? t('account.admin') : t('account.customer')}</div></div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
