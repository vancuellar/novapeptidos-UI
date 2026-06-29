import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Plus, Pencil, Trash2, DollarSign, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import api, { formatMXN, PAYMENT_LABELS, STATUS_LABELS } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const STATUSES = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'];
const EMPTY = { name: '', slug: '', category: '', short_description: '', description: '', presentation: '', form: 'Liofilizado', purity: '99%', price: 0, stock: 0, image_url: '', coa_url: '', batch_number: '', storage: 'Conservar a -20 C, protegido de la luz.', featured: false, is_new: false };

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => { if (!loading && (!user || user.role !== 'admin')) navigate('/login'); }, [user, loading, navigate]);

  const loadAll = useCallback(() => {
    api.get('/admin/stats').then((r) => setStats(r.data)).catch(() => {});
    api.get('/products').then((r) => setProducts(r.data)).catch(() => {});
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => {});
    api.get('/admin/orders').then((r) => setOrders(r.data)).catch(() => {});
  }, []);

  useEffect(() => { if (user?.role === 'admin') loadAll(); }, [user, loadAll]);

  if (!user || user.role !== 'admin') return null;

  const openNew = () => { setEditing(null); setForm({ ...EMPTY, category: categories[0]?.slug || '' }); setDialogOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...p }); setDialogOpen(true); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const save = async () => {
    if (!form.name || !form.category || !form.price) { toast.error('Nombre, categoria y precio son obligatorios'); return; }
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock), slug: form.slug || slugify(form.name) };
    try {
      if (editing) {
        await api.put(`/admin/products/${editing.id}`, payload);
        toast.success('Producto actualizado');
      } else {
        await api.post('/admin/products', payload);
        toast.success('Producto creado');
      }
      setDialogOpen(false);
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error al guardar');
    }
  };

  const remove = async (p) => {
    if (!window.confirm(`Eliminar "${p.name}"?`)) return;
    try { await api.delete(`/admin/products/${p.id}`); toast.success('Producto eliminado'); loadAll(); }
    catch { toast.error('Error al eliminar'); }
  };

  const updateStatus = async (order, status) => {
    try { await api.put(`/admin/orders/${order.id}/status`, { status }); toast.success('Estado actualizado'); loadAll(); }
    catch { toast.error('Error al actualizar'); }
  };

  const STAT_CARDS = stats ? [
    { i: DollarSign, t: 'Ingresos', v: formatMXN(stats.revenue) },
    { i: ShoppingBag, t: 'Pedidos', v: stats.total_orders },
    { i: Clock, t: 'Pendientes', v: stats.pending_orders },
    { i: Package, t: 'Productos', v: stats.total_products },
    { i: Users, t: 'Clientes', v: stats.total_users },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2"><LayoutDashboard className="h-6 w-6 text-[hsl(var(--primary))]" /> Panel de administracion</h1>
      <p className="text-muted-foreground text-sm mb-6">Gestiona productos, inventario y pedidos de Nova Peptides</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {STAT_CARDS.map((s, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs"><s.i className="h-4 w-4" /> {s.t}</div>
            <div className="font-heading text-xl font-bold mt-1">{s.v}</div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products"><Package className="h-4 w-4 mr-1.5" /> Productos</TabsTrigger>
          <TabsTrigger value="orders"><ShoppingBag className="h-4 w-4 mr-1.5" /> Pedidos</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold">{products.length} productos</h3>
            <Button onClick={openNew} data-testid="admin-add-product-button"><Plus className="h-4 w-4 mr-1.5" /> Nuevo producto</Button>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-products-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead><TableHead>Categoria</TableHead><TableHead>Pureza</TableHead>
                  <TableHead>Stock</TableHead><TableHead>Precio</TableHead><TableHead>Lote</TableHead><TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}{p.featured && <Badge variant="secondary" className="ml-2 text-[10px]">Destacado</Badge>}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{categories.find((c) => c.slug === p.category)?.name || p.category}</TableCell>
                    <TableCell className="font-mono-tech text-xs">{p.purity}</TableCell>
                    <TableCell><Badge variant="outline" className={p.stock <= 5 ? 'text-[hsl(var(--warning-foreground))] border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]' : ''}>{p.stock}</Badge></TableCell>
                    <TableCell>{formatMXN(p.price)}</TableCell>
                    <TableCell className="font-mono-tech text-xs">{p.batch_number}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)} data-testid="admin-edit-product-button"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(p)} className="text-destructive" data-testid="admin-delete-product-button"><Trash2 className="h-4 w-4" /></Button>
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
                  <TableHead>Pedido</TableHead><TableHead>Cliente</TableHead><TableHead>Total</TableHead>
                  <TableHead>Pago</TableHead><TableHead>Fecha</TableHead><TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Sin pedidos aun</TableCell></TableRow>
                ) : orders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono-tech text-xs">{o.order_number}</TableCell>
                    <TableCell><div className="text-sm">{o.customer.full_name}</div><div className="text-xs text-muted-foreground">{o.customer.email}</div></TableCell>
                    <TableCell className="font-medium">{formatMXN(o.total)}</TableCell>
                    <TableCell className="text-xs">{PAYMENT_LABELS[o.payment_method] || o.payment_method}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString('es-MX')}</TableCell>
                    <TableCell>
                      <Select value={o.status} onValueChange={(v) => updateStatus(o, v)}>
                        <SelectTrigger className="w-36 h-8" data-testid="admin-update-order-status-select"><SelectValue /></SelectTrigger>
                        <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>)}</SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Editar producto' : 'Nuevo producto'}</DialogTitle></DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><Label>Nombre *</Label><Input className="mt-1.5" value={form.name} onChange={(e) => set('name', e.target.value)} data-testid="admin-product-name-input" /></div>
            <div><Label>Categoria *</Label>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                <SelectContent>{categories.map((c) => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Presentacion</Label><Input className="mt-1.5" value={form.presentation} onChange={(e) => set('presentation', e.target.value)} placeholder="10 mg / vial" /></div>
            <div><Label>Precio (MXN) *</Label><Input type="number" className="mt-1.5" value={form.price} onChange={(e) => set('price', e.target.value)} data-testid="admin-product-price-input" /></div>
            <div><Label>Stock</Label><Input type="number" className="mt-1.5" value={form.stock} onChange={(e) => set('stock', e.target.value)} data-testid="admin-stock-input" /></div>
            <div><Label>Pureza</Label><Input className="mt-1.5" value={form.purity} onChange={(e) => set('purity', e.target.value)} placeholder="99%" /></div>
            <div><Label>Numero de lote</Label><Input className="mt-1.5" value={form.batch_number} onChange={(e) => set('batch_number', e.target.value)} /></div>
            <div className="sm:col-span-2"><Label>URL de imagen</Label><Input className="mt-1.5" value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></div>
            <div className="sm:col-span-2"><Label>Descripcion corta</Label><Input className="mt-1.5" value={form.short_description} onChange={(e) => set('short_description', e.target.value)} /></div>
            <div className="sm:col-span-2"><Label>Descripcion completa</Label><Textarea className="mt-1.5" value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} id="feat" /><Label htmlFor="feat">Destacado</Label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_new} onChange={(e) => set('is_new', e.target.checked)} id="new" /><Label htmlFor="new">Nuevo</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={save} data-testid="admin-save-product-button">{editing ? 'Guardar cambios' : 'Crear producto'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
