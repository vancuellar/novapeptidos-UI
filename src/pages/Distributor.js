import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Users, DollarSign, TrendingUp, ShoppingBag, Copy, Percent, Truck, ExternalLink } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
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

const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 8,
  fontSize: 12,
  color: 'hsl(var(--foreground))',
};

const Distributor = () => {
  const { user, loading } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [period, setPeriod] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderPeriod, setOrderPeriod] = useState('all');
  const [orderStatus, setOrderStatus] = useState('all');

  useEffect(() => {
    if (!loading && (!user || !['distributor', 'admin'].includes(user.role))) navigate('/login');
  }, [user, loading, navigate]);

  const loadAll = useCallback(() => {
    api.get('/distributor/summary').then((r) => setSummary(r.data)).catch(() => {});
    api.get('/distributor/clients').then((r) => setClients(r.data)).catch(() => {});
    api.get('/distributor/sales').then((r) => setSales(r.data)).catch(() => {});
    api.get('/distributor/orders').then((r) => setOrders(r.data)).catch(() => {});
  }, []);

  useEffect(() => { if (user) loadAll(); }, [user, loadAll]);

  if (!user || !['distributor', 'admin'].includes(user.role)) return null;

  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString(language) : '—');
  const fmtMonth = (m) => new Date(`${m}-02T00:00:00`).toLocaleDateString(language, { month: 'short', year: '2-digit' });

  const copyCode = () => {
    if (summary?.distributor_code) {
      navigator.clipboard?.writeText(summary.distributor_code);
      toast.success(t('distributor.codeCopied'));
    }
  };

  // Filtro de ventas por periodo y estado (del lado del cliente).
  const inPeriod = (iso, p) => {
    if (p === 'all' || !iso) return true;
    const d = new Date(iso);
    const now = new Date();
    if (p === 'month') return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    if (p === 'year') return d.getFullYear() === now.getFullYear();
    if (p === '90d') return (now - d) / 86400000 <= 90;
    return true;
  };
  const filteredSales = sales.filter((o) => inPeriod(o.created_at, period) && (statusFilter === 'all' || o.status === statusFilter));
  const filteredOrders = orders.filter((o) => inPeriod(o.created_at, orderPeriod) && (orderStatus === 'all' || o.status === orderStatus));

  const copyTracking = (n) => {
    navigator.clipboard?.writeText(n);
    toast.success(t('distributor.copyTracking'));
  };
  const filteredEarnings = filteredSales.filter((o) => o.status !== 'cancelado').reduce((s, o) => s + (o.commission || 0), 0);

  const STAT_CARDS = summary ? [
    { i: DollarSign, t: t('distributor.stats.earnings'), v: formatMXN(summary.earnings_total) },
    { i: TrendingUp, t: t('distributor.stats.sales'), v: formatMXN(summary.sales_total) },
    { i: ShoppingBag, t: t('distributor.stats.orders'), v: summary.sales_count },
    { i: Users, t: t('distributor.stats.clients'), v: summary.clients_count },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2"><Store className="h-6 w-6 text-[hsl(var(--primary))]" /> {t('distributor.title')}</h1>
          <p className="text-muted-foreground text-sm">{t('distributor.subtitle', { name: user.name })}</p>
        </div>
        {summary && (
          <Card className="p-3 flex items-center gap-3">
            <div>
              <div className="text-[11px] text-muted-foreground">{t('distributor.yourCode')}</div>
              <div className="font-mono-tech font-bold text-lg tracking-wide">{summary.distributor_code || '—'}</div>
            </div>
            <Button variant="outline" size="icon" onClick={copyCode} title={t('distributor.copy')}><Copy className="h-4 w-4" /></Button>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {STAT_CARDS.map((s, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs"><s.i className="h-4 w-4" /> {s.t}</div>
            <div className="font-heading text-xl font-bold mt-1">{s.v}</div>
          </Card>
        ))}
      </div>

      {summary && (
        <Card className="p-4 mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Percent className="h-4 w-4 text-[hsl(var(--primary))]" />
          {t('distributor.commissionNote', { rate: Math.round((summary.commission_rate || 0) * 100) })}{summary.customer_discount_rate > 0 && <> · {t('distributor.customerDiscountNote', { rate: Math.round(summary.customer_discount_rate * 100) })}</>}
        </Card>
      )}

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview"><TrendingUp className="h-4 w-4 mr-1.5" /> {t('distributor.overviewTab')}</TabsTrigger>
          <TabsTrigger value="clients"><Users className="h-4 w-4 mr-1.5" /> {t('distributor.clientsTab')}</TabsTrigger>
          <TabsTrigger value="orders"><Truck className="h-4 w-4 mr-1.5" /> {t('distributor.ordersTab')}</TabsTrigger>
          <TabsTrigger value="sales"><ShoppingBag className="h-4 w-4 mr-1.5" /> {t('distributor.salesTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          {!summary || summary.monthly.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground">{t('distributor.noData')}</Card>
          ) : (
            <Card className="p-5">
              <h3 className="font-heading font-semibold mb-4">{t('distributor.earningsByMonth')}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={summary.monthly} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="month" tickFormatter={fmtMonth} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tickLine={false} axisLine={false} width={44} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelFormatter={fmtMonth} formatter={(v, name) => (name === 'earnings' ? [formatMXN(v), t('distributor.stats.earnings')] : [formatMXN(v), t('distributor.stats.sales')])} />
                  <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#earn)" activeDot={{ r: 4 }} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="clients" className="mt-5">
          <h3 className="font-heading font-semibold mb-4">{t('distributor.clientsCount', { count: clients.length })}</h3>
          <Card className="overflow-x-auto">
            <Table data-testid="distributor-clients-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('distributor.table.client')}</TableHead><TableHead>{t('distributor.table.orders')}</TableHead>
                  <TableHead>{t('distributor.table.spent')}</TableHead><TableHead>{t('distributor.table.myEarnings')}</TableHead>
                  <TableHead>{t('distributor.table.since')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t('distributor.noClients')}</TableCell></TableRow>
                ) : clients.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell><div className="text-sm font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{c.email}</div></TableCell>
                    <TableCell>{c.orders_count}</TableCell>
                    <TableCell>{formatMXN(c.total_spent)}</TableCell>
                    <TableCell className="font-medium text-[hsl(var(--primary))]">{formatMXN(c.my_earnings)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(c.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-5 space-y-4">
          <p className="text-sm text-muted-foreground">{t('distributor.ordersHint')}</p>
          <div className="flex flex-wrap items-center gap-3" data-testid="distributor-orders-filters">
            <Select value={orderPeriod} onValueChange={setOrderPeriod}>
              <SelectTrigger className="w-44 h-9" data-testid="distributor-orders-period"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('distributor.filter.allTime')}</SelectItem>
                <SelectItem value="month">{t('distributor.filter.thisMonth')}</SelectItem>
                <SelectItem value="90d">{t('distributor.filter.last90')}</SelectItem>
                <SelectItem value="year">{t('distributor.filter.thisYear')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={orderStatus} onValueChange={setOrderStatus}>
              <SelectTrigger className="w-40 h-9" data-testid="distributor-orders-status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('distributor.filter.allStatus')}</SelectItem>
                {['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'].map((s) => <SelectItem key={s} value={s}>{t(`status.${s}`)}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="ml-auto text-sm text-muted-foreground">{t('distributor.ordersCount', { count: filteredOrders.length })}</div>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="distributor-orders-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('distributor.table.order')}</TableHead>
                  <TableHead>{t('distributor.table.client')}</TableHead>
                  <TableHead>{t('distributor.table.items')}</TableHead>
                  <TableHead>{t('distributor.table.destination')}</TableHead>
                  <TableHead>{t('admin.table.status')}</TableHead>
                  <TableHead>{t('distributor.table.shipping')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">{t('distributor.noOrders')}</TableCell></TableRow>
                ) : filteredOrders.map((o) => (
                  <TableRow key={o.order_number}>
                    <TableCell>
                      <div className="font-mono-tech text-xs">{o.order_number}</div>
                      <div className="text-[11px] text-muted-foreground">{fmtDate(o.created_at)} · {formatMXN(o.total)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{o.customer_name}</div>
                      {o.customer_phone && <div className="text-[11px] text-muted-foreground">{o.customer_phone}</div>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[220px]">
                      {o.items.map((it, i) => (
                        <div key={i}>{it.quantity}× {it.name}{it.presentation ? ` · ${it.presentation}` : ''}</div>
                      ))}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.destination || '—'}</TableCell>
                    <TableCell>
                      <Badge className={`${STATUS_COLORS[o.status]} text-[10px]`}>{t(`status.${o.status}`)}</Badge>
                      {o.delivered_at
                        ? <div className="text-[11px] text-muted-foreground mt-1">{t('distributor.deliveredOn', { date: fmtDate(o.delivered_at) })}</div>
                        : o.shipped_at
                          ? <div className="text-[11px] text-muted-foreground mt-1">{t('distributor.shippedOn', { date: fmtDate(o.shipped_at) })}</div>
                          : null}
                    </TableCell>
                    <TableCell className="text-xs">
                      {o.tracking_number ? (
                        <div className="space-y-1">
                          <div className="text-muted-foreground">{o.carrier || '—'}</div>
                          <button type="button" onClick={() => copyTracking(o.tracking_number)}
                            className="font-mono-tech hover:text-[hsl(var(--primary))] transition">{o.tracking_number}</button>
                          {o.tracking_url && (
                            <a href={o.tracking_url} target="_blank" rel="noreferrer"
                              className="flex items-center gap-1 text-[hsl(var(--primary))] hover:underline">
                              <ExternalLink className="h-3 w-3" /> {t('distributor.track')}
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">{o.eta || t('distributor.noTracking')}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center gap-3" data-testid="distributor-sales-filters">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-44 h-9" data-testid="distributor-period-filter"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('distributor.filter.allTime')}</SelectItem>
                <SelectItem value="month">{t('distributor.filter.thisMonth')}</SelectItem>
                <SelectItem value="90d">{t('distributor.filter.last90')}</SelectItem>
                <SelectItem value="year">{t('distributor.filter.thisYear')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 h-9" data-testid="distributor-status-filter"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('distributor.filter.allStatus')}</SelectItem>
                {['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'].map((s) => <SelectItem key={s} value={s}>{t(`status.${s}`)}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="ml-auto text-sm">
              <span className="text-muted-foreground">{t('distributor.filter.earnedInPeriod')} </span>
              <span className="font-heading font-bold text-[hsl(var(--primary))]" data-testid="distributor-filtered-earnings">{formatMXN(filteredEarnings)}</span>
              <span className="text-muted-foreground"> · {t('common.items', { count: filteredSales.length })}</span>
            </div>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="distributor-sales-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('distributor.table.order')}</TableHead><TableHead>{t('distributor.table.client')}</TableHead>
                  <TableHead>{t('distributor.table.date')}</TableHead><TableHead>{t('common.total')}</TableHead>
                  <TableHead>{t('distributor.table.commission')}</TableHead><TableHead>{t('admin.table.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">{t('distributor.noSales')}</TableCell></TableRow>
                ) : filteredSales.map((o) => (
                  <TableRow key={o.order_number}>
                    <TableCell className="font-mono-tech text-xs">{o.order_number}</TableCell>
                    <TableCell className="text-sm">{o.customer_name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(o.created_at)}</TableCell>
                    <TableCell>{formatMXN(o.total)}</TableCell>
                    <TableCell className="font-medium text-[hsl(var(--primary))]">{formatMXN(o.commission)}</TableCell>
                    <TableCell><Badge className={`${STATUS_COLORS[o.status]} text-[10px]`}>{t(`status.${o.status}`)}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Distributor;
