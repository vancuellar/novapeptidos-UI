import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Plus, Pencil, Trash2, DollarSign, Users, Clock, TrendingUp, MapPin, Phone, Receipt, Store, Copy, Boxes, Truck, RefreshCw, MailCheck } from 'lucide-react';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import api, { formatMXN } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const STATUSES = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'];
const STATUS_COLORS = {
  pendiente: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  confirmado: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  enviado: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-border',
  entregado: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
  cancelado: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-border',
};
const EMPTY = { name: '', slug: '', category: '', short_description: '', description: '', presentation: '', form: 'Liofilizado', purity: '99%', price: 0, stock: 0, image_url: '', coa_url: '', batch_number: '', storage: 'Conservar a -20 C, protegido de la luz.', featured: false, is_new: false };

// Todas las presentaciones del catalogo curado (key = id::presentacion, igual que el carrito)
const STOCK_VARIANTS = fallbackProducts.flatMap((p) => {
  const vs = p.variants?.length ? p.variants : [{ presentation: p.presentation }];
  return vs.map((v) => ({
    key: p.variants?.length ? `${p.id}::${v.presentation}` : p.id,
    name: p.name,
    presentation: v.presentation || '',
  }));
});

const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 8,
  fontSize: 12,
  color: 'hsl(var(--foreground))',
};

// Resultado de una invitación. Con el correo saliente apagado el admin
// necesita el enlace en pantalla para poder compartirlo el mismo.
const InviteResult = ({ created, t, copyText }) => (
  created.invitation_sent ? (
    <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-3">
      <div className="flex items-start gap-2">
        <MailCheck className="h-4 w-4 mt-0.5 text-[hsl(var(--primary))] shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">{t('admin.invite.linkSent')}</p>
      </div>
    </div>
  ) : (
    <div className="rounded-lg border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]/10 p-3" data-testid="invite-manual-link">
      <p className="text-xs leading-relaxed mb-2">{t('admin.invite.emailOff')}</p>
      <button onClick={() => copyText(created.invitation_link, t('admin.invite.linkCopied'))}
        className="text-xs font-mono-tech break-all text-left inline-flex items-start gap-2 hover:text-[hsl(var(--primary))]">
        {created.invitation_link} <Copy className="h-3.5 w-3.5 shrink-0 mt-0.5" />
      </button>
    </div>
  )
);

const Admin = () => {
  const { user, loading } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [customerOpen, setCustomerOpen] = useState(null);
  const [shippingOpen, setShippingOpen] = useState(null);
  const [repurchase, setRepurchase] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const [stockFilter, setStockFilter] = useState('');
  const [distForm, setDistForm] = useState({ name: '', email: '', commission: 25, customerDiscount: 10 });
  // Edición de tasas por distribuidor. Solo hacia adelante: lo ya vendido
  // conserva su comisión congelada en cada orden.
  const [ratesDist, setRatesDist] = useState(null);
  const [ratesForm, setRatesForm] = useState({ commission: 25, customerDiscount: 10 });
  const [distDialogOpen, setDistDialogOpen] = useState(false);
  const [distCreated, setDistCreated] = useState(null);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '' });
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteCreated, setInviteCreated] = useState(null);
  // Conversión de un cliente existente a distribuidor (conserva su historial).
  const [convertTarget, setConvertTarget] = useState(null);
  const [convertForm, setConvertForm] = useState({ commission: 25, customerDiscount: 10 });
  const [convertDone, setConvertDone] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => { if (!loading && (!user || user.role !== 'admin')) navigate('/login'); }, [user, loading, navigate]);

  const loadAll = useCallback(() => {
    api.get('/admin/stats').then((r) => setStats(r.data)).catch(() => {});
    api.get('/products').then((r) => setProducts(r.data)).catch(() => {});
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => {});
    api.get('/admin/orders').then((r) => setOrders(r.data)).catch(() => {});
    api.get('/admin/repurchase').then((r) => setRepurchase(r.data)).catch(() => {});
    api.get('/admin/customers').then((r) => setCustomers(r.data)).catch(() => {});
    api.get('/admin/analytics').then((r) => setAnalytics(r.data)).catch(() => {});
    api.get('/admin/distributors').then((r) => setDistributors(r.data)).catch(() => {});
    api.get('/stock').then((r) => setStockMap(r.data || {})).catch(() => {});
  }, []);

  useEffect(() => { if (user?.role === 'admin') loadAll(); }, [user, loadAll]);

  if (!user || user.role !== 'admin') return null;

  const openNew = () => { setEditing(null); setForm({ ...EMPTY, category: categories[0]?.slug || '' }); setDialogOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...p }); setDialogOpen(true); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const save = async () => {
    if (!form.name || !form.category || !form.price) { toast.error(t('admin.toast.required')); return; }
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock), slug: form.slug || slugify(form.name) };
    try {
      if (editing) {
        await api.put(`/admin/products/${editing.id}`, payload);
        toast.success(t('admin.toast.updated'));
      } else {
        await api.post('/admin/products', payload);
        toast.success(t('admin.toast.created'));
      }
      setDialogOpen(false);
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.detail || t('admin.toast.saveError'));
    }
  };

  const remove = async (p) => {
    if (!window.confirm(t('admin.confirmDelete', { name: p.name }))) return;
    try { await api.delete(`/admin/products/${p.id}`); toast.success(t('admin.toast.deleted')); loadAll(); }
    catch { toast.error(t('admin.toast.deleteError')); }
  };

  const openShipping = (order) => setShippingOpen({
    id: order.id,
    order_number: order.order_number,
    carrier: order.carrier || 'FedEx',
    tracking_number: order.tracking_number || '',
    tracking_url: order.tracking_url || '',
    eta: order.eta || '',
  });

  const saveShipping = async () => {
    const { id, ...body } = shippingOpen;
    delete body.order_number;
    try {
      await api.put(`/admin/orders/${id}/shipping`, body);
      toast.success(t('admin.shipping.saved'));
      setShippingOpen(null);
      loadAll();
    } catch { toast.error(t('admin.shipping.error')); }
  };

  const updateStatus = async (order, status) => {
    try { await api.put(`/admin/orders/${order.id}/status`, { status }); toast.success(t('admin.toast.statusUpdated')); loadAll(); }
    catch { toast.error(t('admin.toast.statusError')); }
  };

  const createDistributor = async () => {
    if (!distForm.name || !distForm.email) { toast.error(t('admin.toast.required')); return; }
    try {
      const r = await api.post('/admin/distributors', {
        name: distForm.name,
        email: distForm.email,
        commission_rate: Math.max(0, Math.min(100, Number(distForm.commission) || 0)) / 100,
        customer_discount_rate: Math.max(5, Math.min(50, Number(distForm.customerDiscount) || 10)) / 100,
      });
      setDistCreated(r.data);
      setDistForm({ name: '', email: '', commission: 25, customerDiscount: 10 });
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.detail || t('admin.toast.saveError'));
    }
  };

  const copyText = (text, msg) => { navigator.clipboard?.writeText(text); toast.success(msg); };

  // Abre el comprobante SPEI del cliente (endpoint solo-admin; el api client
  // manda el token, por eso lo bajamos como blob en vez de un <a href>).
  const openReceipt = async (orderId) => {
    try {
      const res = await api.get(`/admin/orders/${orderId}/spei-receipt`, { responseType: 'blob' });
      window.open(URL.createObjectURL(res.data), '_blank');
    } catch { toast.error(t('admin.receipt.none')); }
  };

  const openRates = (d) => {
    setRatesForm({
      commission: Math.round((d.commission_rate || 0) * 100),
      customerDiscount: Math.round((d.customer_discount_rate || 0) * 100),
    });
    setRatesDist(d);
  };

  const saveRates = async () => {
    try {
      await api.put(`/admin/distributors/${ratesDist.id}/rates`, {
        // Tope 50% también aquí; el servidor lo vuelve a exigir.
        commission_rate: Math.max(0, Math.min(50, Number(ratesForm.commission) || 0)) / 100,
        customer_discount_rate: Math.max(5, Math.min(50, Number(ratesForm.customerDiscount) || 10)) / 100,
      });
      toast.success(t('admin.dist.ratesSaved'));
      setRatesDist(null);
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.detail || t('admin.toast.saveError'));
    }
  };

  const convertToDistributor = async () => {
    try {
      const r = await api.post(`/admin/customers/${convertTarget.id}/make-distributor`, {
        commission_rate: Math.max(0, Math.min(50, Number(convertForm.commission) || 0)) / 100,
        customer_discount_rate: Math.max(5, Math.min(50, Number(convertForm.customerDiscount) || 10)) / 100,
      });
      setConvertDone(r.data);
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.detail || t('admin.toast.saveError'));
    }
  };

  const inviteCustomer = async () => {
    if (!inviteForm.name || !inviteForm.email) { toast.error(t('admin.toast.required')); return; }
    try {
      const r = await api.post('/admin/customers/invite', inviteForm);
      setInviteCreated(r.data);
      setInviteForm({ name: '', email: '' });
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.detail || t('admin.toast.saveError'));
    }
  };

  const saveStock = async (key, patch) => {
    const prev = stockMap[key] || { qty: 0, in_hand: false };
    const next = { ...prev, ...patch };
    setStockMap((m) => ({ ...m, [key]: next }));
    try { await api.put('/admin/stock', { key, ...next }); }
    catch { setStockMap((m) => ({ ...m, [key]: prev })); toast.error(t('admin.toast.saveError')); }
  };

  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString(language) : '—');
  const fmtMonth = (m) => new Date(`${m}-02T00:00:00`).toLocaleDateString(language, { month: 'short', year: '2-digit' });

  const STAT_CARDS = stats ? [
    { i: DollarSign, t: t('admin.stats.revenue'), v: formatMXN(stats.revenue) },
    { i: ShoppingBag, t: t('admin.stats.orders'), v: stats.total_orders },
    { i: Clock, t: t('admin.stats.pending'), v: stats.pending_orders },
    { i: Package, t: t('admin.stats.products'), v: stats.total_products },
    { i: Users, t: t('admin.stats.customers'), v: stats.total_users },
  ] : [];

  const payMax = analytics?.by_payment?.[0]?.revenue || 1;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2"><LayoutDashboard className="h-6 w-6 text-[hsl(var(--primary))]" /> {t('admin.title')}</h1>
      <p className="text-muted-foreground text-sm mb-6">{t('admin.subtitle')}</p>

      <Tabs defaultValue="sales" className="lg:flex lg:gap-8 lg:items-start">
        <DashboardSidebar items={[
          { value: 'sales', icon: TrendingUp, label: t('admin.salesTab') },
          { value: 'customers', icon: Users, label: t('admin.customersTab') },
          { value: 'distributors', icon: Store, label: t('admin.distributorsTab') },
          { value: 'orders', icon: ShoppingBag, label: t('admin.ordersTab') },
          { value: 'products', icon: Package, label: t('admin.productsTab') },
          { value: 'stock', icon: Boxes, label: t('admin.stockTab') },
          { value: 'repurchase', icon: RefreshCw, label: t('admin.repurchaseTab') },
        ]} />
        <div className="min-w-0 flex-1">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {STAT_CARDS.map((s, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs"><s.i className="h-4 w-4" /> {s.t}</div>
              <div className="font-heading text-xl font-bold mt-1">{s.v}</div>
            </Card>
          ))}
        </div>

        <TabsContent value="stock" className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="font-heading font-semibold">{t('admin.stock.title', { count: STOCK_VARIANTS.length })}</h3>
            <Input className="w-64" placeholder={t('admin.stock.search')} value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} data-testid="admin-stock-search" />
          </div>
          <p className="text-xs text-muted-foreground mb-3">{t('admin.stock.hint')}</p>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-stock-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.table.name')}</TableHead><TableHead>{t('admin.presentation')}</TableHead>
                  <TableHead>{t('admin.stock.qty')}</TableHead><TableHead>{t('admin.stock.inHand')}</TableHead>
                  <TableHead>{t('admin.stock.shownAs')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STOCK_VARIANTS
                  .filter((v) => (v.name + ' ' + v.presentation).toLowerCase().includes(stockFilter.toLowerCase()))
                  .map((v) => {
                    const s = stockMap[v.key] || { qty: 0, in_hand: false };
                    const inHand = s.in_hand && s.qty > 0;
                    return (
                      <TableRow key={v.key}>
                        <TableCell className="font-medium text-sm">{v.name}</TableCell>
                        <TableCell className="font-mono-tech text-xs">{v.presentation}</TableCell>
                        <TableCell>
                          <Input type="number" min="0" className="w-20 h-8" value={s.qty}
                            onChange={(e) => saveStock(v.key, { qty: Math.max(0, Number(e.target.value) || 0) })} />
                        </TableCell>
                        <TableCell>
                          <input type="checkbox" className="h-4 w-4 accent-[hsl(var(--primary))]" checked={!!s.in_hand}
                            onChange={(e) => saveStock(v.key, { in_hand: e.target.checked })} />
                        </TableCell>
                        <TableCell>
                          {inHand
                            ? <span className="text-xs text-[hsl(var(--success))]">✓ {t('admin.stock.immediate')}</span>
                            : <span className="text-xs text-muted-foreground">{t('admin.stock.oneWeek')}</span>}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-5">
          {!analytics || analytics.monthly.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground">{t('admin.sales.noData')}</Card>
          ) : (
            <div className="space-y-4" data-testid="admin-sales">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs"><Receipt className="h-4 w-4" /> {t('admin.sales.avgTicket')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{formatMXN(analytics.avg_ticket)}</div>
                </Card>
                {STATUSES.filter((s) => analytics.by_status[s]).slice(0, 3).map((s) => (
                  <Card key={s} className="p-4">
                    <div className="text-muted-foreground text-xs">{t(`status.${s}`)}</div>
                    <div className="font-heading text-xl font-bold mt-1">{analytics.by_status[s]}</div>
                  </Card>
                ))}
              </div>

              <Card className="p-5">
                <h3 className="font-heading font-semibold mb-4">{t('admin.sales.monthly')}</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={analytics.monthly} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
                    <XAxis dataKey="month" tickFormatter={fmtMonth} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} width={44} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelFormatter={fmtMonth} formatter={(v, name) => (name === 'revenue' ? [formatMXN(v), t('admin.stats.revenue')] : [v, t('admin.stats.orders')])} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#rev)" activeDot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid lg:grid-cols-2 gap-4">
                <Card className="p-5">
                  <h3 className="font-heading font-semibold mb-4">{t('admin.sales.topProducts')}</h3>
                  <ResponsiveContainer width="100%" height={Math.max(180, analytics.top_products.length * 34)}>
                    <BarChart data={analytics.top_products} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={170} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} />
                      <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.35 }} contentStyle={CHART_TOOLTIP_STYLE} formatter={(v, name, item) => [`${formatMXN(v)} · ${t('admin.sales.units', { count: item.payload.units })}`, null]} />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-5">
                  <h3 className="font-heading font-semibold mb-4">{t('admin.sales.byPayment')}</h3>
                  <div className="space-y-3">
                    {analytics.by_payment.map((p) => (
                      <div key={p.method}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t(`payment.${p.method}.label`) || p.method}</span>
                          <span className="font-medium">{formatMXN(p.revenue)}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: `${Math.max(4, (p.revenue / payMax) * 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="customers" className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold">{t('admin.customersCount', { count: customers.length })}</h3>
            <Button onClick={() => { setInviteCreated(null); setInviteDialogOpen(true); }} data-testid="admin-invite-customer-button"><Plus className="h-4 w-4 mr-1.5" /> {t('admin.inviteCustomer')}</Button>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-customers-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.table.customer')}</TableHead><TableHead>{t('admin.table.phone')}</TableHead>
                  <TableHead>{t('admin.table.ordersCount')}</TableHead><TableHead>{t('admin.table.totalSpent')}</TableHead>
                  <TableHead>{t('admin.table.lastOrder')}</TableHead><TableHead>{t('admin.table.registered')}</TableHead><TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">{t('admin.noCustomers')}</TableCell></TableRow>
                ) : customers.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell><div className="text-sm font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{c.email}</div></TableCell>
                    <TableCell className="text-xs">{c.phones?.[0] || '—'}</TableCell>
                    <TableCell>{c.orders_count}</TableCell>
                    <TableCell className="font-medium">{formatMXN(c.total_spent)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(c.last_order_at)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(c.created_at)}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {c.role !== 'distributor' && (
                        <Button variant="ghost" size="sm" className="mr-1" data-testid="admin-convert-distributor-button"
                          onClick={() => { setConvertDone(null); setConvertForm({ commission: 25, customerDiscount: 10 }); setConvertTarget(c); }}>
                          <Store className="h-3.5 w-3.5 mr-1" /> {t('admin.convert.button')}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => setCustomerOpen(c)} data-testid="admin-open-customer-button">{t('account.detail')}</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="distributors" className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold">{t('admin.distributorsCount', { count: distributors.length })}</h3>
            <Button onClick={() => { setDistCreated(null); setDistDialogOpen(true); }} data-testid="admin-add-distributor-button"><Plus className="h-4 w-4 mr-1.5" /> {t('admin.newDistributor')}</Button>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-distributors-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.dist.name')}</TableHead><TableHead>{t('admin.dist.code')}</TableHead>
                  <TableHead>{t('admin.dist.commission')}</TableHead><TableHead>{t('admin.dist.customerDiscountCol')}</TableHead><TableHead>{t('admin.dist.clients')}</TableHead>
                  <TableHead>{t('admin.dist.sales')}</TableHead><TableHead>{t('admin.dist.earnings')}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {distributors.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">{t('admin.dist.noDistributors')}</TableCell></TableRow>
                ) : distributors.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell><div className="text-sm font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.email}</div></TableCell>
                    <TableCell><button onClick={() => copyText(d.distributor_code, t('distributor.codeCopied'))} className="font-mono-tech text-xs inline-flex items-center gap-1 hover:text-[hsl(var(--primary))]">{d.distributor_code} <Copy className="h-3 w-3" /></button></TableCell>
                    <TableCell>{Math.round((d.commission_rate || 0) * 100)}%</TableCell>
                    <TableCell>{Math.round((d.customer_discount_rate || 0) * 100)}%</TableCell>
                    <TableCell>{d.clients_count}</TableCell>
                    <TableCell>{formatMXN(d.sales_total)}</TableCell>
                    <TableCell className="font-medium text-[hsl(var(--primary))]">{formatMXN(d.earnings)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => openRates(d)} data-testid={`admin-dist-edit-${d.distributor_code}`}>
                        <Pencil className="h-3.5 w-3.5 mr-1" /> {t('admin.dist.editRates')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-5">
          <Card className="overflow-x-auto">
            <Table data-testid="admin-orders-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.table.order')}</TableHead><TableHead>{t('admin.table.customer')}</TableHead><TableHead>{t('common.total')}</TableHead>
                  <TableHead>{t('admin.table.payment')}</TableHead><TableHead>{t('admin.table.date')}</TableHead><TableHead>{t('admin.table.status')}</TableHead>
                  <TableHead>{t('admin.table.receipt')}</TableHead>
                  <TableHead>{t('admin.table.tracking')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">{t('admin.noOrders')}</TableCell></TableRow>
                ) : orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono-tech text-xs">{o.order_number}</TableCell>
                    <TableCell><div className="text-sm">{o.customer.full_name}</div><div className="text-xs text-muted-foreground">{o.customer.email}</div></TableCell>
                    <TableCell className="font-medium">{formatMXN(o.total)}</TableCell>
                    <TableCell className="text-xs">{t(`payment.${o.payment_method}.label`) || o.payment_method}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString(language)}</TableCell>
                    <TableCell>
                      {o.spei_receipt_at ? (
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => openReceipt(o.id)} data-testid="admin-view-receipt">
                          <Receipt className="h-3.5 w-3.5 mr-1.5 text-[hsl(var(--success))]" /> {t('admin.receipt.view')}
                        </Button>
                      ) : o.payment_method === 'spei' ? (
                        <span className="text-xs text-muted-foreground">{t('admin.receipt.pending')}</span>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      <Select value={o.status} onValueChange={(v) => updateStatus(o, v)}>
                        <SelectTrigger className="w-36 h-8" data-testid="admin-update-order-status-select"><SelectValue /></SelectTrigger>
                        <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{t(`status.${s}`)}</SelectItem>)}</SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {o.tracking_number ? (
                        <button type="button" onClick={() => openShipping(o)} data-testid="admin-edit-tracking"
                          className="text-xs text-left hover:text-[hsl(var(--primary))] transition">
                          <div className="text-muted-foreground">{o.carrier || '—'}</div>
                          <div className="font-mono-tech">{o.tracking_number}</div>
                        </button>
                      ) : (
                        <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => openShipping(o)} data-testid="admin-add-tracking">
                          <Truck className="h-3.5 w-3.5 mr-1.5" /> {t('admin.shipping.add')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold">{t('admin.productsCount', { count: products.length })}</h3>
            <Button onClick={openNew} data-testid="admin-add-product-button"><Plus className="h-4 w-4 mr-1.5" /> {t('admin.newProduct')}</Button>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-products-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.table.name')}</TableHead><TableHead>{t('admin.table.category')}</TableHead><TableHead>{t('admin.table.purity')}</TableHead>
                  <TableHead>{t('admin.table.stock')}</TableHead><TableHead>{t('admin.table.price')}</TableHead><TableHead>{t('admin.table.batch')}</TableHead><TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}{p.featured && <Badge variant="secondary" className="ml-2 text-[10px]">{t('admin.featured')}</Badge>}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{categories.find((c) => c.slug === p.category)?.name || p.category}</TableCell>
                    <TableCell className="font-mono-tech text-xs">{p.purity}</TableCell>
                    <TableCell><Badge variant="outline" className={p.stock <= 5 ? 'text-[hsl(var(--warning-foreground))] border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]' : ''}>{p.stock}</Badge></TableCell>
                    <TableCell>{formatMXN(p.price)}</TableCell>
                    <TableCell className="font-mono-tech text-xs">{p.batch_number}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)} data-testid="admin-edit-product-button"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon" onClick={() => remove(p)} className="ml-1" data-testid="admin-delete-product-button"><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="repurchase" className="mt-5 space-y-4">
          <p className="text-sm text-muted-foreground">{t('admin.repurchase.hint')}</p>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-repurchase-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('distributor.table.client')}</TableHead>
                  <TableHead>{t('calc.product')}</TableHead>
                  <TableHead>{t('admin.repurchase.daysLeft')}</TableHead>
                  <TableHead>{t('admin.repurchase.runsOut')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repurchase.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">{t('admin.repurchase.empty')}</TableCell></TableRow>
                ) : repurchase.map((r, i) => (
                  <TableRow key={i} className={r.needs_repurchase ? 'bg-[hsl(var(--warning))]/10' : ''}>
                    <TableCell><div className="text-sm">{r.customer_name}</div><div className="text-xs text-muted-foreground">{r.customer_email}</div></TableCell>
                    <TableCell className="text-sm">{r.product_name}</TableCell>
                    <TableCell className={r.needs_repurchase ? 'font-semibold text-[hsl(var(--primary))]' : ''}>
                      {t('admin.repurchase.days', { count: r.days_left })}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(r.runs_out_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        </div>
      </Tabs>

      <Dialog open={!!shippingOpen} onOpenChange={(v) => !v && setShippingOpen(null)}>
        <DialogContent className="max-w-md">
          {shippingOpen && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Truck className="h-5 w-5" /> {t('admin.shipping.title')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-xs text-muted-foreground font-mono-tech">{shippingOpen.order_number}</div>
                <div>
                  <Label className="text-sm mb-1.5 block">{t('admin.shipping.carrier')}</Label>
                  <Select value={shippingOpen.carrier} onValueChange={(v) => setShippingOpen({ ...shippingOpen, carrier: v })}>
                    <SelectTrigger data-testid="admin-shipping-carrier"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['FedEx', 'DHL', 'Estafeta', 'UPS', 'Paquete Express', 'Redpack', 'Correos de México'].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block">{t('admin.shipping.number')}</Label>
                  <Input value={shippingOpen.tracking_number} data-testid="admin-shipping-number"
                    onChange={(e) => setShippingOpen({ ...shippingOpen, tracking_number: e.target.value })} />
                  <p className="text-[11px] text-muted-foreground mt-1">{t('admin.shipping.autoUrl')}</p>
                </div>
                <div>
                  <Label className="text-sm mb-1.5 block">{t('admin.shipping.eta')}</Label>
                  <Input value={shippingOpen.eta} placeholder="3-5 días hábiles" data-testid="admin-shipping-eta"
                    onChange={(e) => setShippingOpen({ ...shippingOpen, eta: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShippingOpen(null)}>{t('common.cancel')}</Button>
                <Button onClick={saveShipping} data-testid="admin-shipping-save">{t('common.saveChanges')}</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!customerOpen} onOpenChange={(v) => !v && setCustomerOpen(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {customerOpen && (
            <>
              <DialogHeader><DialogTitle>{customerOpen.name}</DialogTitle></DialogHeader>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">{t('account.email')}</div>
                  <div className="font-medium">{customerOpen.email}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t('admin.customer.since', { date: fmtDate(customerOpen.created_at) })}</div>
                </div>
                {customerOpen.phones?.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Phone className="h-3 w-3" /> {t('admin.customer.phones')}</div>
                    {customerOpen.phones.map((p) => <div key={p} className="font-mono-tech text-xs">{p}</div>)}
                  </div>
                )}
                {customerOpen.addresses?.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><MapPin className="h-3 w-3" /> {t('admin.customer.addresses')}</div>
                    {customerOpen.addresses.map((a) => <div key={a} className="text-xs mb-1">{a}</div>)}
                  </div>
                )}
                <Separator />
                <div>
                  <div className="text-xs text-muted-foreground mb-2">{t('admin.customer.orders')} · {formatMXN(customerOpen.total_spent)}</div>
                  {customerOpen.orders?.length === 0 ? (
                    <div className="text-muted-foreground text-xs">{t('admin.customer.noOrders')}</div>
                  ) : customerOpen.orders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between gap-2 py-1.5 border-b border-border last:border-0">
                      <div>
                        <div className="font-mono-tech text-xs">{o.order_number}</div>
                        <div className="text-[11px] text-muted-foreground">{fmtDate(o.created_at)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${STATUS_COLORS[o.status]} text-[10px]`}>{t(`status.${o.status}`)}</Badge>
                        <span className="font-medium text-xs">{formatMXN(o.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={inviteDialogOpen} onOpenChange={(v) => { setInviteDialogOpen(v); if (!v) setInviteCreated(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{inviteCreated ? t('admin.invite.createdTitle') : t('admin.inviteCustomer')}</DialogTitle></DialogHeader>
          {inviteCreated ? (
            <div className="space-y-4 text-sm">
              <div className="font-medium">{inviteCreated.name}<span className="text-muted-foreground font-normal"> · {inviteCreated.email}</span></div>
              <InviteResult created={inviteCreated} t={t} copyText={copyText} />
              <DialogFooter><Button onClick={() => { setInviteDialogOpen(false); setInviteCreated(null); }}>{t('admin.dist.close')}</Button></DialogFooter>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div><Label>{t('admin.dist.name')}</Label><Input className="mt-1.5" value={inviteForm.name} onChange={(e) => setInviteForm((f) => ({ ...f, name: e.target.value }))} data-testid="admin-invite-name-input" /></div>
                <div><Label>{t('admin.dist.email')}</Label><Input type="email" className="mt-1.5" value={inviteForm.email} onChange={(e) => setInviteForm((f) => ({ ...f, email: e.target.value }))} data-testid="admin-invite-email-input" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>{t('common.cancel')}</Button>
                <Button onClick={inviteCustomer} data-testid="admin-send-invite-button">{t('admin.invite.send')}</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={distDialogOpen} onOpenChange={(v) => { setDistDialogOpen(v); if (!v) setDistCreated(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{distCreated ? t('admin.dist.createdTitle') : t('admin.newDistributor')}</DialogTitle></DialogHeader>
          {distCreated ? (
            <div className="space-y-4 text-sm">
              <div className="font-medium">{distCreated.name}<span className="text-muted-foreground font-normal"> · {distCreated.email}</span></div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">{t('admin.dist.shareCode')}</div>
                <button onClick={() => copyText(distCreated.distributor_code, t('distributor.codeCopied'))} className="font-mono-tech font-bold text-lg inline-flex items-center gap-2 hover:text-[hsl(var(--primary))]">{distCreated.distributor_code} <Copy className="h-4 w-4" /></button>
              </div>
              <InviteResult created={distCreated} t={t} copyText={copyText} />
              <DialogFooter><Button onClick={() => { setDistDialogOpen(false); setDistCreated(null); }}>{t('admin.dist.close')}</Button></DialogFooter>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div><Label>{t('admin.dist.name')}</Label><Input className="mt-1.5" value={distForm.name} onChange={(e) => setDistForm((f) => ({ ...f, name: e.target.value }))} data-testid="admin-distributor-name-input" /></div>
                <div><Label>{t('admin.dist.email')}</Label><Input type="email" className="mt-1.5" value={distForm.email} onChange={(e) => setDistForm((f) => ({ ...f, email: e.target.value }))} data-testid="admin-distributor-email-input" /></div>
                <div><Label>{t('admin.dist.commission')}</Label><Input type="number" min="0" max="100" className="mt-1.5" value={distForm.commission} onChange={(e) => setDistForm((f) => ({ ...f, commission: e.target.value }))} /></div>
                <div><Label>{t('admin.dist.customerDiscount')}</Label><Input type="number" min="5" max="50" className="mt-1.5" value={distForm.customerDiscount} onChange={(e) => setDistForm((f) => ({ ...f, customerDiscount: e.target.value }))} /><p className="text-xs text-muted-foreground mt-1">{t('admin.dist.customerDiscountHint')}</p></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDistDialogOpen(false)}>{t('common.cancel')}</Button>
                <Button onClick={createDistributor} data-testid="admin-create-distributor-button">{t('admin.dist.create')}</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Convertir un cliente existente en distribuidor (conserva historial y contraseña). */}
      <Dialog open={!!convertTarget} onOpenChange={(open) => { if (!open) { setConvertTarget(null); setConvertDone(null); } }}>
        <DialogContent className="max-w-sm" data-testid="admin-convert-dialog">
          <DialogHeader><DialogTitle>{t('admin.convert.title')}</DialogTitle></DialogHeader>
          {convertDone ? (
            <div className="space-y-4 text-sm">
              <div className="font-medium">{convertDone.name}<span className="text-muted-foreground font-normal"> · {convertDone.email}</span></div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">{t('admin.dist.shareCode')}</div>
                <button onClick={() => copyText(convertDone.distributor_code, t('distributor.codeCopied'))} className="font-mono-tech font-bold text-lg inline-flex items-center gap-2 hover:text-[hsl(var(--primary))]" data-testid="admin-convert-code">{convertDone.distributor_code} <Copy className="h-4 w-4" /></button>
              </div>
              <DialogFooter><Button onClick={() => { setConvertTarget(null); setConvertDone(null); }}>{t('admin.dist.close')}</Button></DialogFooter>
            </div>
          ) : convertTarget && (
            <>
              <div className="space-y-4">
                <div className="text-sm font-medium">{convertTarget.name}<span className="text-muted-foreground font-normal"> · {convertTarget.email}</span></div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t('admin.convert.note')}</p>
                <div>
                  <Label>{t('admin.dist.commission')} (%)</Label>
                  <Input type="number" min="0" max="50" className="mt-1.5" value={convertForm.commission}
                    onChange={(e) => setConvertForm((f) => ({ ...f, commission: e.target.value }))} data-testid="admin-convert-commission" />
                </div>
                <div>
                  <Label>{t('admin.dist.customerDiscount')} (%)</Label>
                  <Input type="number" min="5" max="50" className="mt-1.5" value={convertForm.customerDiscount}
                    onChange={(e) => setConvertForm((f) => ({ ...f, customerDiscount: e.target.value }))} data-testid="admin-convert-discount" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setConvertTarget(null)}>{t('common.cancel')}</Button>
                <Button onClick={convertToDistributor} data-testid="admin-convert-save">{t('admin.convert.confirm')}</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Ajuste de tasas de UN distribuidor. Solo afecta ventas futuras. */}
      <Dialog open={!!ratesDist} onOpenChange={(open) => { if (!open) setRatesDist(null); }}>
        <DialogContent className="max-w-sm" data-testid="admin-rates-dialog">
          <DialogHeader><DialogTitle>{t('admin.dist.editRatesTitle', { name: ratesDist?.name || '' })}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t('admin.dist.commission')} (%)</Label>
              <Input type="number" min="0" max="50" className="mt-1.5" value={ratesForm.commission}
                onChange={(e) => setRatesForm((f) => ({ ...f, commission: e.target.value }))} data-testid="admin-rates-commission" />
              <p className="text-xs text-muted-foreground mt-1">{t('admin.dist.commissionCap')}</p>
            </div>
            <div>
              <Label>{t('admin.dist.customerDiscount')} (%)</Label>
              <Input type="number" min="5" max="50" className="mt-1.5" value={ratesForm.customerDiscount}
                onChange={(e) => setRatesForm((f) => ({ ...f, customerDiscount: e.target.value }))} data-testid="admin-rates-discount" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t('admin.dist.ratesForwardNote')}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRatesDist(null)}>{t('common.cancel')}</Button>
            <Button onClick={saveRates} data-testid="admin-rates-save">{t('admin.dist.ratesSave')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? t('admin.editProduct') : t('admin.newProduct')}</DialogTitle></DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><Label>{t('admin.nameRequired')}</Label><Input className="mt-1.5" value={form.name} onChange={(e) => set('name', e.target.value)} data-testid="admin-product-name-input" /></div>
            <div><Label>{t('admin.categoryRequired')}</Label>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder={t('admin.select')} /></SelectTrigger>
                <SelectContent>{categories.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>{t('admin.presentation')}</Label><Input className="mt-1.5" value={form.presentation} onChange={(e) => set('presentation', e.target.value)} placeholder="10 mg / vial" /></div>
            <div><Label>{t('admin.priceRequired')}</Label><Input type="number" className="mt-1.5" value={form.price} onChange={(e) => set('price', e.target.value)} data-testid="admin-product-price-input" /></div>
            <div><Label>{t('admin.stock')}</Label><Input type="number" className="mt-1.5" value={form.stock} onChange={(e) => set('stock', e.target.value)} data-testid="admin-stock-input" /></div>
            <div><Label>{t('common.purity')}</Label><Input className="mt-1.5" value={form.purity} onChange={(e) => set('purity', e.target.value)} placeholder="99%" /></div>
            <div><Label>{t('admin.batchNumber')}</Label><Input className="mt-1.5" value={form.batch_number} onChange={(e) => set('batch_number', e.target.value)} /></div>
            <div className="sm:col-span-2"><Label>{t('admin.imageUrl')}</Label><Input className="mt-1.5" value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></div>
            <div className="sm:col-span-2"><Label>{t('admin.shortDescription')}</Label><Input className="mt-1.5" value={form.short_description} onChange={(e) => set('short_description', e.target.value)} /></div>
            <div className="sm:col-span-2"><Label>{t('admin.fullDescription')}</Label><Textarea className="mt-1.5" value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} id="feat" /><Label htmlFor="feat">{t('admin.featured')}</Label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_new} onChange={(e) => set('is_new', e.target.checked)} id="new" /><Label htmlFor="new">{t('product.new')}</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>{t('common.cancel')}</Button>
            <Button onClick={save} data-testid="admin-save-product-button">{editing ? t('common.saveChanges') : t('common.createProduct')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
