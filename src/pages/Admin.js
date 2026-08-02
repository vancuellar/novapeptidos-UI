import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Eye, LayoutDashboard, Package, ShoppingBag, Plus, Pencil, Trash2, DollarSign, Users, Clock, TrendingUp, Phone, Receipt, Store, Copy, Boxes, Truck, RefreshCw, MailCheck, Ban, Megaphone, BarChart3, Upload, ShoppingCart, Target, KeyRound, Gauge, Search, Archive, ArchiveRestore, HandCoins, CircleCheck, CircleAlert, ArrowUp, ArrowDown, ArrowUpDown, Sparkles, MessageCircle, FlaskConical } from 'lucide-react';
import Marketing from '@/components/admin/Marketing';
import WhatsApp from '@/components/admin/WhatsApp';
import EmbudoPorDispositivo from '@/components/admin/EmbudoPorDispositivo';
import ReportesSemanales from '@/components/admin/ReportesSemanales';
import VideoComoLeerDifusion from '@/components/admin/VideoComoLeerDifusion';
import MotorPrecios from '@/components/admin/MotorPrecios';
import SurtirCatalogo from '@/components/admin/SurtirCatalogo';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { AreaChart, Area, BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import GraficaInteractiva from '@/components/charts/GraficaInteractiva';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardSidebar, { alTope } from '@/components/layout/DashboardSidebar';
import StatCard from '@/components/panels/StatCard';
import ComisionesAdmin from '@/components/panels/ComisionesAdmin';
import GatewayCredentials from '@/components/GatewayCredentials';
import AjustesEnvio from '@/components/AjustesEnvio';
// El mismo cotizador que ve el distribuidor; al admin el servidor le manda además
// los números de la casa (lo que cuesta la guía y lo que absorbe).
import CotizadorDeEnvios from '@/components/CotizadorDeEnvios';
import CotizarEnvio from '@/components/CotizarEnvio';
import FichaPedido from '@/components/FichaPedido';
import FichaCliente from '@/components/FichaCliente';
import AdminAnnouncements from '@/components/AdminAnnouncements';
import NotificationsFeed from '@/components/NotificationsFeed';
import HojaDeGuia from '@/components/HojaDeGuia';
import BotonImprimirGuia from '@/components/BotonImprimirGuia';
import { hayEtiqueta } from '@/lib/etiquetaGuia';
import ChatNegocio from '@/components/ChatNegocio';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import api, { formatMXN } from '@/lib/api';
import { tieneDifusion, soloDifusion } from '@/lib/roles';
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

// Las únicas pestañas del rol 'marketing' (difusión). El backend rechaza con
// 403 cualquier otra ruta para ese rol, así que esta lista es solo la vista.
const TABS_DIFUSION = ['funnel', 'marketing', 'whatsapp', 'meta'];

// ¿Este pedido pasa los filtros de la tabla? UNA sola definición, que usan la
// lista y la limpieza de la selección en lote. Si se separaran, la barra en lote
// acabaría actuando sobre pedidos que ya no se ven.
// ⛔ El estado cuenta el viaje de la MERCANCÍA; `pagado` cuenta el DINERO. Son
// cosas distintas a propósito (ver cobrado.py en el backend): hay pedidos
// ENTREGADOS y sin cobrar. Por eso son dos filtros, no uno.
const pasaFiltros = (o, estado, pago, surtir) => {
  if (estado !== 'todos' && o.status !== estado) return false;
  // "Por surtir": los pedidos que esperan mercancía que hay que mandar pedir. Un
  // cancelado ya no espera nada, así que no cuenta.
  if (surtir && (!o.backorder_items?.length || o.status === 'cancelado')) return false;
  if (pago === 'pagados') return !!o.pagado;
  // "Por cobrar" = vivo y sin pagar. Un cancelado ya no se debe.
  if (pago === 'deuda') return !o.pagado && o.status !== 'cancelado';
  return true;
};

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

// Encabezado de columna que ordena al hacer clic (nombre, categoría, precio,
// stock en la tabla de Productos del Admin). La flecha solo aparece en la
// columna activa; el resto muestra un icono neutro para avisar que también
// se puede tocar.
const SortableTableHead = ({ campo, activo, dir, onClick, children, testId }) => {
  const esActivo = activo === campo;
  const Icono = esActivo ? (dir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <TableHead
      role="button"
      tabIndex={0}
      onClick={() => onClick(campo)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(campo); } }}
      data-testid={testId}
      className="cursor-pointer select-none hover:text-foreground"
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <Icono className={`h-3.5 w-3.5 ${esActivo ? '' : 'opacity-40'}`} />
      </span>
    </TableHead>
  );
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
  // Buscar por nombre, correo o teléfono. Con los invitados adentro la lista crece
  // sola (todo el que compra entra), y sin buscador hay que bajar hasta encontrarlo.
  const [buscaCliente, setBuscaCliente] = useState('');
  const [analytics, setAnalytics] = useState(null);
  // Tráfico y ventas a lo largo del tiempo (Christian): el panel tenía totales
  // pero no series, así que no se veía si algo sube o baja.
  const [serie, setSerie] = useState(null);
  const [serieBucket, setSerieBucket] = useState('day');
  const [funnel, setFunnel] = useState(null);
  const [orderOpen, setOrderOpen] = useState(null);   // pedido abierto para prepararlo
  // La ficha de UN pedido, abierta desde el número dentro de la ficha de un cliente o de
  // un distribuidor: qué compró y qué pasó con su dinero, sin salir de donde está.
  const [fichaPedido, setFichaPedido] = useState(null);
  const [orderKill, setOrderKill] = useState(null);   // pedido que se va a BORRAR
  // Selección múltiple en Pedidos (Christián, 2026-07-29): limpiar las pruebas de
  // un golpe y archivar lo viejo. El candado de los pagados vive en el backend;
  // aquí sólo se le da la cara: NUNCA se manda `forzar` sin que él lo pida.
  const [sel, setSel] = useState([]);                       // ids marcados en la tabla
  const [verArchivados, setVerArchivados] = useState(false);
  const [archivados, setArchivados] = useState([]);
  const [loteKill, setLoteKill] = useState(null);           // confirmación de borrado en lote
  const [loteBusy, setLoteBusy] = useState(false);
  // El SIMULACRO del barrido de pruebas: qué se llevaría y qué no, antes de tocar nada.
  const [barrido, setBarrido] = useState(null);
  const [intentos, setIntentos] = useState(null);    // carritos que no se cerraron
  const [meta, setMeta] = useState(null);
  const [metaBusy, setMetaBusy] = useState(false);
  const [funnelDays, setFunnelDays] = useState(30);
  // LA FICHA DEL CLIENTE. Sólo se guarda su id: el contenido lo arma el servidor y lo
  // pinta <FichaCliente>, el MISMO componente que usa el panel del distribuidor
  // (Christián, 2026-07-30). Antes esta pantalla tenía su propia copia de la ficha y
  // enseñaba cosas distintas a las que enseñaba el distribuidor sobre la misma persona.
  const [clienteAbierto, setClienteAbierto] = useState(null);
  const [params, setParams] = useSearchParams();
  // Abrir ARRIBA al cambiar de pestaña, venga el cambio de donde venga: del sidebar,
  // de un link dentro del contenido o de la URL directa. El onClick del sidebar no
  // alcanza — muchos links cambian sólo la query y ScrollToTop no los ve.
  // Difusión (María): SOLO Embudo, Marketing y Meta. Puede llegarle por rol
  // propio ('marketing') o como rol EXTRA que suma sobre el de distribuidora.
  // Esconderle las demás pestañas aquí es cortesía, no seguridad: la seguridad
  // vive en el backend, que le contesta 403 a todo lo que no sea difusión.
  const esMarketing = soloDifusion(user);
  const tabPedida = params.get('tab') || (esMarketing ? 'funnel' : 'sales');
  const tab = esMarketing && !TABS_DIFUSION.includes(tabPedida) ? 'funnel' : tabPedida;
  useLayoutEffect(() => { alTope(); }, [tab]);

  // ⛔ LOS FILTROS DE PEDIDOS VIVEN EN LA URL (2026-07-30). Antes eran estado local,
  // y por eso una tarjeta del tablero no podía llevarte a "los que faltan por
  // cobrar": sólo podía llevarte a la lista completa y tú le ponías el filtro a
  // mano. Con el filtro en la dirección, la tarjeta aterriza YA FILTRADA y
  // refrescar la página no lo pierde.
  //   ?estado=pendiente   estado de la MERCANCÍA
  //   ?pago=pagados|deuda estado del DINERO (son cosas distintas: ver cobrado.py)
  const filtroStatus = params.get('estado') || 'todos';
  const filtroPago = params.get('pago') || 'todos';
  // Pedidos que esperan mercancía por mandar pedir (tarjeta "Por Surtir").
  const filtroSurtir = params.get('surtir') === '1';
  // Cambia un filtro dejando el resto como está.
  const setFiltroPedidos = (patch) => {
    const next = new URLSearchParams(params);
    next.set('tab', 'orders');
    Object.entries(patch).forEach(([k, v]) => {
      if (!v || v === 'todos') next.delete(k); else next.set(k, v);
    });
    setParams(next, { replace: true });
  };
  // Tarjeta → Pedidos con el filtro puesto. Siempre sobre los ACTIVOS y sin
  // arrastrar filtros viejos: quien toca "Por Cobrar" quiere ver eso, no eso
  // cruzado con lo que traía puesto de antes.
  const irAPedidos = (patch = {}) => {
    setVerArchivados(false);
    setSel([]);
    const next = new URLSearchParams({ tab: 'orders' });
    if (patch.estado) next.set('estado', patch.estado);
    if (patch.pago) next.set('pago', patch.pago);
    if (patch.surtir) next.set('surtir', '1');
    setParams(next, { replace: true });
    alTope();
  };
  // Tarjeta → otra pestaña, sin filtros que poner.
  const irAPestana = (v) => { setParams(v === 'sales' ? {} : { tab: v }, { replace: true }); alTope(); };
  const [distOpen, setDistOpen] = useState(null);               // ficha del distribuidor {detalle}
  const [shippingOpen, setShippingOpen] = useState(null);
  const [repurchase, setRepurchase] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [stockMap, setStockMap] = useState({});
  const [stockFilter, setStockFilter] = useState('');
  // Buscador del catálogo (Christián, 2026-07-29). Con 193 productos, encontrar uno
  // a ojo es imposible. Busca por nombre, categoría, SKU y lote: quien busca "reta"
  // quiere el producto, pero quien pega un número de lote está rastreando un pedido.
  const [productFilter, setProductFilter] = useState('');
  // Orden de la tabla de Productos (Christián lo pidió: nombre, categoría, precio,
  // stock). null = orden natural (como viene del backend). Un solo criterio a la
  // vez; volver a tocar la misma columna alterna A-Z / Z-A.
  const [productSort, setProductSort] = useState({ campo: null, dir: 'asc' });
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
  // Solicitudes "Quiero ser distribuidor" del formulario público del home.
  const [applications, setApplications] = useState([]);
  const [appTarget, setAppTarget] = useState(null);
  const [appForm, setAppForm] = useState({ commission: 25, customerDiscount: 10 });
  const [appResult, setAppResult] = useState(null);
  // Conversión de un cliente existente a distribuidor (conserva su historial).
  const [convertTarget, setConvertTarget] = useState(null);
  const [convertForm, setConvertForm] = useState({ commission: 25, customerDiscount: 10 });
  const [convertDone, setConvertDone] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => { if (!loading && !tieneDifusion(user)) navigate('/login'); }, [user, loading, navigate]);

  const loadAll = useCallback(() => {
    // Difusión: lo único que el rol marketing tiene permitido pedir.
    api.get('/admin/funnel?days=30').then((r) => setFunnel(r.data)).catch(() => {});
    api.get('/admin/meta/dashboard').then((r) => setMeta(r.data)).catch(() => {});
    if (esMarketing) return;  // el resto se lo negaría el backend con 403
    api.get('/admin/stats').then((r) => setStats(r.data)).catch(() => {});
    api.get('/products').then((r) => setProducts(r.data)).catch(() => {});
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => {});
    api.get('/admin/orders').then((r) => setOrders(r.data)).catch(() => {});
    api.get('/admin/repurchase').then((r) => setRepurchase(r.data)).catch(() => {});
    api.get('/admin/customers').then((r) => setCustomers(r.data)).catch(() => {});
    api.get('/admin/analytics').then((r) => setAnalytics(r.data)).catch(() => {});
    api.get('/admin/intentos').then((r) => setIntentos(r.data)).catch(() => {});
    api.get('/admin/distributors').then((r) => setDistributors(r.data)).catch(() => {});
    api.get('/admin/distributor-applications').then((r) => setApplications(r.data)).catch(() => {});
    api.get('/stock').then((r) => setStockMap(r.data || {})).catch(() => {});
  }, [esMarketing]);

  useEffect(() => { if (tieneDifusion(user)) loadAll(); }, [user, loadAll]);

  // Los archivados se piden hasta que alguien los quiere ver: casi nunca hacen falta.
  const cargarArchivados = useCallback(
    () => api.get('/admin/orders?archivados=true').then((r) => setArchivados(r.data)).catch(() => {}), []);
  useEffect(() => { if (verArchivados && user?.role === 'admin') cargarArchivados(); }, [verArchivados, user, cargarArchivados]);

  // Si una fila deja de verse (cambió de estado con un filtro puesto), sale de la
  // selección: la barra en lote no debe actuar sobre pedidos invisibles.
  useEffect(() => {
    const lista = verArchivados ? archivados : orders;
    const visibles = new Set(lista.filter((o) => pasaFiltros(o, filtroStatus, filtroPago, filtroSurtir)).map((o) => o.id));
    setSel((s) => (s.every((id) => visibles.has(id)) ? s : s.filter((id) => visibles.has(id))));
  }, [orders, archivados, filtroStatus, filtroPago, filtroSurtir, verArchivados]);

  // La serie va aparte porque se recarga al cambiar de día/semana/mes, y no
  // tiene por qué volver a pedir todo el panel para eso. El rango se estira con
  // el periodo: 30 días sueltos, 12 semanas o 12 meses.
  useEffect(() => {
    if (user?.role !== 'admin') return;
    const dias = serieBucket === 'day' ? 30 : serieBucket === 'week' ? 84 : 365;
    api.get(`/admin/series?bucket=${serieBucket}&days=${dias}`)
      .then((r) => setSerie(r.data)).catch(() => {});
  }, [user, serieBucket]);

  if (!tieneDifusion(user)) return null;

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


  const updateStatus = async (order, status) => {
    try { await api.put(`/admin/orders/${order.id}/status`, { status }); toast.success(t('admin.toast.statusUpdated')); loadAll(); }
    catch { toast.error(t('admin.toast.statusError')); }
  };

  // ⛔ PAGADO ≠ ENTREGADO. Christián entrega en persona y a veces cobra después, así que
  // el estado de la mercancía y el del dinero se marcan por separado. Sin este botón la
  // separación no serviría de nada: no habría manera de decirle al sistema que ya
  // cobraste, y todo lo nuevo se quedaría eternamente en "por cobrar".
  const marcarPago = async (order, pagado) => {
    try {
      await api.put(`/admin/orders/${order.id}/pago`, { pagado });
      toast.success(pagado ? t('admin.toast.markedPaid') : t('admin.toast.markedUnpaid'));
      loadAll();
    } catch { toast.error(t('admin.toast.statusError')); }
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

  // "Ver como": guarda el token de admin, entra con el token temporal (solo lectura).
  const viewAs = async (u) => {
    try {
      const r = await api.post(`/admin/view-as/${u.id}`);
      localStorage.setItem('np_token_admin', localStorage.getItem('np_token'));
      localStorage.setItem('np_token', r.data.token);
      window.location.href = r.data.role === 'distributor' ? '/distribuidor' : '/cuenta';
    } catch (e) { toast.error(e.response?.data?.detail || t('admin.ficha.loadError')); }
  };
  const openDistProfile = async (d) => {
    try { const r = await api.get(`/admin/distributors/${d.id}/detail`); setDistOpen(r.data); }
    catch { toast.error(t('admin.ficha.loadError')); }
  };
  // Abrir la ficha de un cliente es SÓLO recordar a quién: cupones, puntos, descuento
  // permanente y notas viven dentro de <FichaCliente> para no tener dos versiones.
  // `invitado:<correo>` es la llave del que compró sin cuenta (el caso de Aidee).
  const abrirCliente = (idOCorreo) => setClienteAbierto(idOCorreo || null);
  // ⛔ TODO EL QUE COMPRA ES CLIENTE (Christián, 2026-07-31). La lista ya trae a los
  // que compraron SIN cuenta, así que se busca por lo que se tiene de ellos: nombre,
  // correo y teléfono. Sin acentos y sin mayúsculas, que es como la gente teclea.
  //
  // Sin `useMemo` a prop\u00f3sito: arriba de esta l\u00ednea hay salidas tempranas, y un hook
  // despu\u00e9s de un `return` condicional rompe el orden de los hooks. Filtrar unos
  // cientos de renglones en cada tecla no se nota; un hook condicional s\u00ed.
  const sinAcentos = (s) => String(s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const buscaClienteNorm = sinAcentos(buscaCliente).trim();
  const clientesFiltrados = !buscaClienteNorm ? customers : customers.filter(
    (c) => sinAcentos([c.name, c.email, ...(c.phones || [])].join(' ')).includes(buscaClienteNorm));
  const clienteDelPedido = (o) => o?.user_id
    || (o?.customer?.email ? `invitado:${String(o.customer.email).trim().toLowerCase()}` : null);
  // Sube el CSV del Administrador de Anuncios. Cuando Christian consiga el token
  // de Meta, el panel cambia solo de fuente y esto queda como respaldo.
  const subirMetaCsv = async (file) => {
    if (!file) return;
    setMetaBusy(true);
    try {
      const csv = await file.text();
      const r = await api.post('/admin/meta/import', { csv });
      toast.success(t('admin.meta.imported', { n: r.data.imported }));
      const d = await api.get('/admin/meta/dashboard'); setMeta(d.data);
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
    finally { setMetaBusy(false); }
  };
  // Borrar es para siempre y no hay deshacer: por eso pasa por confirmacion.
  const deleteOrder = async () => {
    const o = orderKill;
    try {
      await api.delete(`/admin/orders/${o.id}`);
      toast.success(t('admin.order.deleted', { n: o.order_number }));
      setOrderKill(null); setOrderOpen(null);
      loadAll();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
  };

  // ---- Pedidos en lote: archivar / desarchivar / borrar varios de un golpe ----
  // La tabla enseña activos O archivados, nunca revueltos. Siempre del más
  // reciente al más viejo, y con filtro por estado para limpiar por tandas.
  const fechaPedido = (o) => { const n = Date.parse(o.created_at); return Number.isNaN(n) ? 0 : n; };
  const pedidosVista = (verArchivados ? archivados : orders)
    .filter((o) => pasaFiltros(o, filtroStatus, filtroPago, filtroSurtir))
    .slice()
    .sort((a, b) => fechaPedido(b) - fechaPedido(a));
  const toggleSel = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const todosSel = pedidosVista.length > 0 && pedidosVista.every((o) => sel.includes(o.id));
  // ¿Hay basura de pruebas? Se miran activos Y archivados: archivar no desmarca, y el
  // barrido del servidor tampoco distingue — si no, un pedido de prueba archivado se
  // quedaría marcado para siempre sin botón que lo barra.
  const selPedidos = pedidosVista.filter((o) => sel.includes(o.id));
  const hayPruebas = [...orders, ...archivados].some((o) => o.es_prueba);
  const selTodosPrueba = selPedidos.length > 0 && selPedidos.every((o) => o.es_prueba);

  // `forzar` SOLO puede venir del botón explícito del diálogo de protegidos,
  // nunca de un flujo automático: entre los pedidos de prueba vive la única
  // venta real, y el candado del backend existe justo para ella.
  const lote = async (ids, accion, forzar = false) => {
    setLoteBusy(true);
    try {
      const r = await api.post('/admin/orders/lote', { ids, accion, forzar });
      const { hechos, protegidos } = r.data;
      if (hechos > 0) toast.success(t(`admin.lote.done.${accion}`, { n: hechos }));
      if (accion === 'borrar' && protegidos?.length && !forzar) {
        // Los que el backend rechazó se enseñan con nombre y monto; el forzado
        // se reintenta SOLO con ellos, no con toda la selección original.
        const numeros = new Set(protegidos.map((p) => p.order_number));
        const idsProt = pedidosVista.filter((o) => numeros.has(o.order_number)).map((o) => o.id);
        setLoteKill({ protegidos, ids: idsProt });
      } else {
        setLoteKill(null);
      }
      setSel([]);
      loadAll();
      cargarArchivados();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
    finally { setLoteBusy(false); }
  };
  // ---- PEDIDOS DE PRUEBA: marcarlos y barrerlos ----
  // ⛔ Quien prueba comprando en producción limpia lo que ensució, en la misma sesión
  // (Christián, 2026-08-01). Marcar es sólo una etiqueta —no borra nada y se quita
  // igual—; el que borra es el barrido, y el barrido NO puede tocar una venta real:
  // sólo mira lo etiquetado, y de eso aparta lo que huela a venta (pagado, surtido, con
  // comprobante o con guía). La decisión la toma el servidor, aquí sólo se pinta.
  const marcarPrueba = async (ids, esPrueba) => {
    setLoteBusy(true);
    try {
      await Promise.all(ids.map((id) => api.put(`/admin/orders/${id}/prueba`, { es_prueba: esPrueba })));
      toast.success(t(esPrueba ? 'admin.prueba.marked' : 'admin.prueba.unmarked', { n: ids.length }));
      setSel([]);
      loadAll();
      cargarArchivados();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
    finally { setLoteBusy(false); }
  };

  // Dos pasos siempre: primero el SIMULACRO (que no toca nada) para enseñar qué se va y
  // qué se queda, y sólo entonces el botón que borra.
  const verBarrido = async () => {
    setLoteBusy(true);
    try {
      const r = await api.post('/admin/orders/barrer-pruebas', { simulacro: true });
      setBarrido(r.data);
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
    finally { setLoteBusy(false); }
  };
  const barrerPruebas = async () => {
    setLoteBusy(true);
    try {
      const r = await api.post('/admin/orders/barrer-pruebas', { simulacro: false });
      toast.success(t('admin.prueba.done', { n: r.data.borrados }));
      setBarrido(null);
      setSel([]);
      loadAll();
      cargarArchivados();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
    finally { setLoteBusy(false); }
  };

  const recargarIntentos = () => api.get('/admin/intentos').then((r) => setIntentos(r.data)).catch(() => {});
  const mandarOferta = async (it) => {
    try {
      const r = await api.post(`/admin/intentos/${it.id}/oferta`);
      toast.success(r.data.codigo ? t('admin.try.sentCode', { code: r.data.codigo }) : t('admin.try.sentNote'));
      recargarIntentos();
    } catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
  };
  const borrarIntento = async (it) => {
    try { await api.delete(`/admin/intentos/${it.id}`); recargarIntentos(); }
    catch (e) { toast.error(e.response?.data?.detail || 'Error'); }
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

  const resolveApplication = async (app, action) => {
    if (action === 'rechazar' && !window.confirm(t('admin.apps.rejectConfirm', { name: app.name }))) return;
    try {
      const body = action === 'aprobar'
        ? { action, commission_rate: Math.max(0, Math.min(50, Number(appForm.commission) || 0)) / 100,
            customer_discount_rate: Math.max(5, Math.min(50, Number(appForm.customerDiscount) || 10)) / 100 }
        : { action };
      const r = await api.put(`/admin/distributor-applications/${app.id}`, body);
      if (action === 'aprobar') setAppResult(r.data); else { setAppTarget(null); toast.success(t('admin.apps.rejected')); }
      loadAll();
    } catch (err) {
      toast.error(err.response?.data?.detail || t('admin.toast.saveError'));
    }
  };

  const toggleBlocked = async (c) => {
    const blocking = !c.blocked;
    if (blocking && !window.confirm(t('admin.block.confirm', { name: c.name }))) return;
    try {
      await api.put(`/admin/customers/${c.id}/blocked`, { blocked: blocking });
      toast.success(t(blocking ? 'admin.block.done' : 'admin.block.undone'));
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

  // ⛔ COBRADO Y POR COBRAR, LADO A LADO. "Ingresos" era todo lo no cancelado, así que
  // la venta de Alanís —entregada y a deber— se veía como dinero en la cuenta. Las dos
  // cifras van juntas a propósito: si la deuda no se enseñara, un pedido fiado
  // desaparecería del tablero y nadie se acordaría de cobrarlo.
  //
  // Y cada una es un ACCESO DIRECTO a su propio dato (Christián, 2026-07-30): se
  // toca y aterriza en la lista YA FILTRADA. Antes eran seis números muertos.
  const STAT_CARDS = stats ? [
    { i: DollarSign, t: t('admin.stats.revenue'), v: formatMXN(stats.revenue),
      id: 'admin-stat-cobrado', go: () => irAPedidos({ pago: 'pagados' }) },
    { i: HandCoins, t: t('admin.stats.receivable'), v: formatMXN(stats.por_cobrar || 0),
      alerta: (stats.por_cobrar || 0) > 0,
      id: 'admin-stat-por-cobrar', go: () => irAPedidos({ pago: 'deuda' }) },
    { i: ShoppingBag, t: t('admin.stats.orders'), v: stats.total_orders,
      id: 'admin-stat-pedidos', go: () => irAPedidos() },
    { i: Clock, t: t('admin.stats.pending'), v: stats.pending_orders,
      id: 'admin-stat-pendientes', go: () => irAPedidos({ estado: 'pendiente' }) },
    // ⛔ LO QUE HAY QUE MANDAR PEDIR, EN LA PORTADA (Christián, 2026-07-30): «quiero
    // poder entrar a mi Admin Panel y ahí tener todo lo que necesito». Vivía sólo en
    // el correo y dentro de cada ficha: para enterarse había que abrir pedido por
    // pedido. Se toca y aterriza en la lista ya filtrada, con el proveedor a la vista.
    { i: Boxes, t: t('admin.stats.toOrder'),
      // El número es CUÁNTOS PEDIDOS esperan mercancía, que es la pregunta de
      // Christián. Las piezas exactas están en la lista, ya filtrada, a un toque.
      v: stats.pedidos_por_surtir || 0,
      alerta: (stats.pedidos_por_surtir || 0) > 0,
      id: 'admin-stat-por-surtir', go: () => irAPedidos({ surtir: true }) },
    { i: Package, t: t('admin.stats.products'), v: stats.total_products,
      id: 'admin-stat-productos', go: () => irAPestana('products') },
    { i: Users, t: t('admin.stats.customers'), v: stats.total_users,
      id: 'admin-stat-clientes', go: () => irAPestana('customers') },
  ] : [];

  const productosFiltrados = (() => {
    const q = productFilter.trim().toLowerCase();
    let lista = products;
    if (q) {
      // Cada palabra tiene que aparecer en ALGÚN campo: así "reta 40" encuentra
      // "Retatrutida 40 mg" sin exigir que se escriba igualito.
      const palabras = q.split(/\s+/);
      lista = products.filter((p) => {
        const heno = [p.name, p.category, p.sku, p.batch_number, p.presentation]
          .filter(Boolean).join(' ').toLowerCase();
        return palabras.every((w) => heno.includes(w));
      });
    }
    if (!productSort.campo) return lista;
    const signo = productSort.dir === 'asc' ? 1 : -1;
    const nombreDe = (p) => categories.find((c) => c.slug === p.category)?.name || p.category || '';
    // Copia: nunca ordenar el arreglo original (products) in-place.
    return [...lista].sort((a, b) => {
      let cmp;
      if (productSort.campo === 'name') {
        cmp = (a.name || '').localeCompare(b.name || '', 'es', { sensitivity: 'base' });
      } else if (productSort.campo === 'category') {
        cmp = nombreDe(a).localeCompare(nombreDe(b), 'es', { sensitivity: 'base' });
        // Empate en categoría: por nombre, para que el resultado sea estable y predecible.
        if (cmp === 0) cmp = (a.name || '').localeCompare(b.name || '', 'es', { sensitivity: 'base' });
      } else if (productSort.campo === 'price') {
        cmp = (a.price || 0) - (b.price || 0);
      } else if (productSort.campo === 'stock') {
        cmp = (a.stock || 0) - (b.stock || 0);
      } else {
        cmp = 0;
      }
      return cmp * signo;
    });
  })();

  // Al tocar un encabezado: si ya es el campo activo, alterna A-Z/Z-A; si es
  // otro campo, empieza en A-Z (o menor-a-mayor para precio/stock).
  const toggleProductSort = (campo) => {
    setProductSort((prev) => prev.campo === campo
      ? { campo, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
      : { campo, dir: 'asc' });
  };

  const payMax = analytics?.by_payment?.[0]?.revenue || 1;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2"><LayoutDashboard className="h-6 w-6 text-[hsl(var(--primary))]" /> {t('admin.title')}</h1>
      <p className="text-muted-foreground text-sm mb-6">{t('admin.subtitle')}</p>

      <Tabs value={tab} onValueChange={(v) => setParams(v === 'sales' ? {} : { tab: v }, { replace: true })} className="lg:flex lg:gap-8 lg:items-start">
        {/* Agrupado por lo que uno viene a hacer, no por el orden en que se fueron
            construyendo las pestañas. Catorce entradas seguidas se leen como una lista
            de nada; en cinco grupos se encuentra sin leer. Recompra ya no está aquí:
            vive DENTRO de Clientes, que es lo que es. */}
        <DashboardSidebar activeTab={tab} items={esMarketing ? [
          // Rol marketing: nada más difusión. El embudo también cuenta como
          // difusión aquí, aunque para el admin viva en "Negocio".
          { grupo: 'Difusión' },
          { value: 'funnel', icon: Filter, label: t('admin.funnelTab') },
          { value: 'marketing', icon: Target, label: 'Marketing' },
          { value: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
          { value: 'meta', icon: BarChart3, label: t('admin.metaTab') },
        ] : [
          { grupo: 'Negocio' },
          { value: 'sales', icon: TrendingUp, label: t('admin.salesTab') },
          // El Asesor de Negocio. Es el MISMO componente que ve el distribuidor;
          // lo que cambia es el contexto que le arma el servidor: al admin sí le
          // entran costos, proveedores y la foto del motor (chat_negocio.py).
          { value: 'asesor', icon: Sparkles, label: t('negocio.chat.tab') },
          { value: 'orders', icon: ShoppingBag, label: t('admin.ordersTab') },
          { value: 'funnel', icon: Filter, label: t('admin.funnelTab') },
          { value: 'intentos', icon: ShoppingCart, label: t('admin.tryTab') },
          { grupo: 'Gente' },
          { value: 'customers', icon: Users, label: t('admin.customersTab') },
          { value: 'distributors', icon: Store, label: t('admin.distributorsTab') },
          { grupo: 'Catálogo' },
          { value: 'products', icon: Package, label: t('admin.productsTab') },
          { value: 'stock', icon: Boxes, label: t('admin.stockTab') },
          { value: 'motor', icon: Gauge, label: 'Motor de Precios' },
          { grupo: 'Difusión' },
          { value: 'marketing', icon: Target, label: 'Marketing' },
          // De la conversación a la venta: lo único que puede demostrar si el
          // dinero de WhatsApp regresa (110 conversaciones, 0 compras medidas).
          { value: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
          { value: 'meta', icon: BarChart3, label: t('admin.metaTab') },
          { value: 'news', icon: Megaphone, label: t('adminNews.tab') },
          { grupo: 'Ajustes' },
          { value: 'pagos', icon: KeyRound, label: 'Cobros' },
          { value: 'envios', icon: Truck, label: 'Envíos' },
        ]} />
        <div className="min-w-0 flex-1">

        {!esMarketing && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {STAT_CARDS.map((s) => (
            /* La deuda se pinta en ámbar sólo cuando existe: en cero es un dato más,
               con saldo es un pendiente que hay que ver desde la puerta. */
            <StatCard key={s.id} icon={s.i} label={s.t} value={s.v} onClick={s.go} testid={s.id}
              valueClass={s.alerta ? 'text-[hsl(var(--warning-foreground))]' : ''} />
          ))}
        </div>
        )}

        <TabsContent value="news" className="mt-5 space-y-8">
          {/* ⛔ LOS AVISOS DEL ADMIN NO SE VEÍAN EN NINGÚN LADO. La campanita del
              encabezado le contaba las no leídas —«Entró Un Pedido EX-…»— pero lo mandaba
              a esta pestaña, que sólo tenía el formulario para MANDAR avisos a los demás.
              Sus propias novedades vivían únicamente en la base. Aquí está su feed, el
              mismo componente que ven el cliente y el distribuidor, y desde él se abre el
              pedido y la ficha de quien compró (Christián, 2026-07-30). */}
          <NotificationsFeed />
          <AdminAnnouncements />
        </TabsContent>

        <TabsContent value="pagos" className="mt-5">
          <GatewayCredentials />
        </TabsContent>

        {/* Asesor de Negocio: aquí sí puede preguntar de costos, proveedores y
            márgenes — el servidor arma ese contexto SÓLO cuando el rol es admin. */}
        <TabsContent value="asesor" className="mt-5">
          <ChatNegocio />
        </TabsContent>

        {/* Primero el COTIZADOR —«¿cuánto sale mandar esto a Mérida?», que es la
            pregunta de todos los días y hasta hoy exigía armar un carrito— y debajo
            el remitente y las cajas, que se capturan una vez y no se vuelven a tocar. */}
        <TabsContent value="envios" className="mt-5 space-y-8">
          <CotizadorDeEnvios rol="admin" />
          <AjustesEnvio />
        </TabsContent>

        <TabsContent value="stock" className="mt-5">
          {/* Cuánto costaría surtirse completo. Va arriba del inventario porque es la
              pregunta que se hace al mirarlo: cuánto falta por comprar. */}
          <SurtirCatalogo />
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

        <TabsContent value="intentos" className="mt-5 space-y-4">
          <div>
            <h3 className="font-heading font-semibold">{t('admin.try.title')}</h3>
            <p className="text-xs text-muted-foreground max-w-2xl">{t('admin.try.sub', { min: formatMXN(intentos?.minimo_para_cupon || 2500) })}</p>
          </div>

          {!intentos || intentos.intentos.length === 0 ? (
            <Card className="p-6" data-testid="admin-try-empty"><p className="text-sm">{t('admin.try.empty')}</p></Card>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.try.pending')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{intentos.pendientes}</div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.try.atStake')}</div>
                  <div className="font-heading text-xl font-bold mt-1 text-[hsl(var(--primary))]">{formatMXN(intentos.valor_pendiente)}</div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.try.recovered')}</div>
                  <div className="font-heading text-xl font-bold mt-1 text-[hsl(var(--success))]">{intentos.recuperados}</div></Card>
              </div>

              <Card className="overflow-x-auto">
                <Table data-testid="admin-try-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.table.customer')}</TableHead>
                      <TableHead>{t('admin.try.cart')}</TableHead>
                      <TableHead>{t('common.total')}</TableHead>
                      <TableHead>{t('admin.table.status')}</TableHead>
                      <TableHead>{t('admin.try.offer')}</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {intentos.intentos.map((it) => (
                      <TableRow key={it.id}>
                        <TableCell>
                          <div className="text-sm">{it.name || '—'}</div>
                          <div className="text-xs text-muted-foreground break-all">{it.email}</div>
                          {it.phone && <div className="text-xs text-muted-foreground">{it.phone}</div>}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-xs">
                          {(it.items || []).map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                        </TableCell>
                        <TableCell className="font-medium">{formatMXN(it.total)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] uppercase ${it.status === 'convertido' ? 'text-[hsl(var(--success))]' : ''}`}>
                            {t(`admin.try.status.${it.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {it.offer_code ? (
                            <div>
                              <div className="font-mono-tech">{it.offer_code}</div>
                              <div className="text-muted-foreground">{Math.round((it.offer_rate || 0) * 100)}% · min {formatMXN(it.offer_min_order || 0)}</div>
                              {it.offer_perk_text && <div className="text-muted-foreground">+ {it.offer_perk_text}</div>}
                            </div>
                          ) : it.contacted ? (
                            <span className="text-muted-foreground">{t('admin.try.followedUp')}</span>
                          ) : it.status === 'pendiente' ? (
                            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => mandarOferta(it)} data-testid="admin-try-send">
                              {t('admin.try.sendNow')}
                            </Button>
                          ) : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive hover:text-white"
                            onClick={() => borrarIntento(it)} data-testid="admin-try-delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </>
          )}
        </TabsContent>

        {/* El área de marketing vive en su propio archivo: mete gráficas,
            radiografía por campaña y el director, y aquí adentro Admin.js ya
            pasaba de 1700 líneas. */}
        <TabsContent value="marketing" className="mt-5">
          {/* EL REPORTE DE LA SEMANA VA PRIMERO (Christián, 2026-07-31): "este
              video de publicidad debe estar en mi página de Marketing e irse
              archivando por fecha, semana con semana". Arriba el video de esta
              semana, y abajo la evolución y el archivo de las anteriores. */}
          <ReportesSemanales />
          {/* El video que explica cómo leer Embudo, Marketing y Anuncios: es la
              puerta de entrada para quien no vive en estos números. */}
          <VideoComoLeerDifusion />
          <Marketing />
        </TabsContent>

        {/* ¿Las conversaciones de WhatsApp venden? Pestaña propia porque es la
            pregunta que decide el presupuesto de la semana, y porque necesita su
            propio botón para crear el código que reparte Mónica. */}
        <TabsContent value="whatsapp" className="mt-5">
          <WhatsApp />
        </TabsContent>

        {/* El Motor de Precios, resumido. Vive en su propio archivo por lo mismo que
            Marketing: seis bloques con sus tablas no caben aquí sin volver Admin.js
            ilegible. */}
        <TabsContent value="motor" className="mt-5">
          <MotorPrecios />
        </TabsContent>

        <TabsContent value="meta" className="mt-5 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-heading font-semibold">{t('admin.meta.title')}</h3>
              <p className="text-xs text-muted-foreground max-w-2xl">{t('admin.meta.sub')}</p>
            </div>
            <label className="inline-flex items-center gap-2 text-xs rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-[hsl(var(--muted))]/40" data-testid="admin-meta-upload">
              <Upload className="h-4 w-4" />
              {metaBusy ? t('admin.meta.uploading') : t('admin.meta.upload')}
              <input type="file" accept=".csv,text/csv" className="hidden"
                onChange={(e) => subirMetaCsv(e.target.files?.[0])} />
            </label>
          </div>

          {(!meta || meta.fuente === 'sin_datos') ? (
            <Card className="p-6" data-testid="admin-meta-empty">
              <p className="text-sm">{t('admin.meta.empty')}</p>
            </Card>
          ) : (
            <>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className={`rounded-full px-2 py-0.5 ${meta.fuente === 'meta_en_vivo' ? 'bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]' : 'bg-[hsl(var(--muted))]'}`}>
                  {meta.fuente === 'meta_en_vivo' ? t('admin.meta.live') : t('admin.meta.fromCsv')}
                </span>
                {meta.resumen.date_start && <span>{meta.resumen.date_start} → {meta.resumen.date_end}</span>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3" data-testid="admin-meta-kpis">
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.meta.spend')}</div>
                  <div className="font-heading text-xl font-bold mt-1">${meta.resumen.spend.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">{meta.resumen.currency}</span></div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.meta.reach')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{meta.resumen.reach.toLocaleString()}</div></Card>
                {/* ⚠️ "Clics" de Meta son TODOS: reacciones, comentarios, abrir la foto,
                    entrar al perfil. En una publicación impulsada la mayoría NO son
                    visitas. Por eso aquí se muestran los clics AL ENLACE y, aparte,
                    cuántos ALCANZARON a cargar la página — que es lo que de verdad
                    llegó al sitio. Entre uno y otro se cae mucha gente. */}
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.meta.linkClicks')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{(meta.resumen.link_clicks ?? meta.resumen.clicks).toLocaleString()}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{t('admin.meta.allClicks', { n: meta.resumen.clicks.toLocaleString() })}</div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.meta.landings')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{(meta.resumen.landing_page_views ?? 0).toLocaleString()}</div>
                  {meta.resumen.landing_rate > 0 && (
                    <div className="text-[11px] text-muted-foreground mt-0.5">{meta.resumen.landing_rate}% {t('admin.meta.ofClicks')}</div>
                  )}</Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.meta.cpc')}</div>
                  <div className="font-heading text-xl font-bold mt-1">${meta.resumen.cpc.toFixed(3)}</div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.meta.purchases')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{meta.resumen.purchases}</div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.meta.siteRevenue')}</div>
                  <div className="font-heading text-xl font-bold mt-1 text-[hsl(var(--primary))]">{formatMXN(meta.sitio.ingreso)}</div></Card>
              </div>

              {meta.recomendaciones?.length > 0 && (
                <div className="space-y-2" data-testid="admin-meta-advice">
                  {meta.recomendaciones.map((r, i) => (
                    <Card key={i} className={`p-4 border-l-4 ${r.level === 'alto' ? 'border-l-destructive' : r.level === 'medio' ? 'border-l-[hsl(var(--warning-border))]' : 'border-l-[hsl(var(--success))]'}`}>
                      <div className="font-medium text-sm">{r.title}</div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.body}</p>
                    </Card>
                  ))}
                </div>
              )}

              {meta.apagar?.length > 0 && (
                <Card className="p-4 border-destructive/40" data-testid="admin-meta-kill">
                  <div className="text-sm font-medium mb-2">{t('admin.meta.killTitle')}</div>
                  {meta.apagar.map((k, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex justify-between gap-3 py-0.5">
                      <span className="truncate">{k.campaign}</span>
                      <span className="shrink-0">${k.spend} — {k.razon}</span>
                    </div>
                  ))}
                </Card>
              )}

              <Card className="overflow-x-auto">
                <Table data-testid="admin-meta-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('admin.meta.campaign')}</TableHead>
                      <TableHead>{t('admin.meta.spend')}</TableHead>
                      <TableHead>{t('admin.meta.impressions')}</TableHead>
                      <TableHead>{t('admin.meta.clicks')}</TableHead>
                      <TableHead>{t('admin.meta.cpc')}</TableHead>
                      <TableHead>{t('admin.meta.purchases')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meta.campanas.map((c, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm max-w-xs truncate" title={c.campaign}>
                          {c.status === 'active' && <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--success))] mr-2" />}
                          {c.campaign}
                        </TableCell>
                        <TableCell className="font-mono-tech text-xs">${c.spend}</TableCell>
                        <TableCell className="font-mono-tech text-xs">{c.impressions.toLocaleString()}</TableCell>
                        <TableCell className="font-mono-tech text-xs">{c.clicks.toLocaleString()}</TableCell>
                        <TableCell className="font-mono-tech text-xs">{c.cpc ? '$' + c.cpc.toFixed(3) : '—'}</TableCell>
                        <TableCell className="font-mono-tech text-xs">{c.purchases || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="funnel" className="mt-5 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-heading font-semibold">{t('admin.funnel.title')}</h3>
              <p className="text-xs text-muted-foreground">{t('admin.funnel.sub')}</p>
            </div>
            <div className="flex gap-2">
              {[7, 30, 90].map((d) => (
                <button key={d} onClick={() => { setFunnelDays(d); api.get(`/admin/funnel?days=${d}`).then((r) => setFunnel(r.data)).catch(() => {}); }}
                  data-testid={`funnel-days-${d}`}
                  className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${funnelDays === d ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'border-border hover:bg-[hsl(var(--muted))]/40'}`}>
                  {t('admin.funnel.days', { n: d })}
                </button>
              ))}
            </div>
          </div>

          {funnel?.sin_datos && (
            <Card className="p-6 border-[hsl(var(--warning-border))]" data-testid="funnel-empty">
              <p className="text-sm">{t('admin.funnel.empty')}</p>
            </Card>
          )}

          {funnel && !funnel.sin_datos && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.funnel.visits')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{funnel.embudo[0]?.sesiones || 0}</div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.funnel.conversion')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{funnel.conversion_total}%</div></Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.funnel.revenue')}</div>
                  <div className="font-heading text-xl font-bold mt-1">{formatMXN(funnel.ingreso)}</div>
                  {/* Compras cuyo pedido ya se borró (los 12 de prueba). Si no se dijera,
                      el embudo enseñaría compras con $0 de ingreso y parecería un error. */}
                  {(funnel.ingreso_sin_pedido || 0) > 0 && (
                    <div className="text-[11px] text-muted-foreground mt-1" data-testid="funnel-sin-pedido">
                      {t('admin.funnel.noOrder', { monto: formatMXN(funnel.ingreso_sin_pedido) })}
                    </div>
                  )}
                </Card>
                <Card className="p-4"><div className="text-xs text-muted-foreground">{t('admin.stats.receivable')}</div>
                  <div className={`font-heading text-xl font-bold mt-1${(funnel.por_cobrar || 0) > 0 ? ' text-[hsl(var(--warning-foreground))]' : ''}`}>{formatMXN(funnel.por_cobrar || 0)}</div></Card>
              </div>

              <Card className="p-5" data-testid="funnel-steps">
                <h4 className="font-heading font-semibold mb-1">{t('admin.funnel.stepsTitle')}</h4>
                <p className="text-xs text-muted-foreground mb-4">{t('admin.funnel.stepsSub')}</p>
                <div className="space-y-3">
                  {funnel.embudo.map((e, i) => {
                    const top = funnel.embudo[0]?.sesiones || 1;
                    const prev = i > 0 ? funnel.embudo[i - 1].sesiones : null;
                    const caida = prev && prev > 0 ? Math.round((1 - e.sesiones / prev) * 100) : null;
                    const LABELS = { visit: 'Visitaron el sitio', product_view: 'Vieron un producto', add_to_cart: 'Agregaron al carrito', checkout_start: 'Empezaron el pago', purchase: 'Compraron' };
                    return (
                      <div key={e.paso}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{LABELS[e.paso] || e.paso}</span>
                          <span className="text-muted-foreground">
                            {e.sesiones}
                            {caida !== null && caida > 0 && <span className="text-[hsl(var(--destructive))] ml-2">−{caida}%</span>}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                          <div className="h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: `${Math.round((e.sesiones / top) * 100)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* El mismo embudo partido por aparato. Va JUSTO debajo del embudo
                  general a propósito: el número de arriba es el promedio de los de
                  abajo, y verlos separados es lo único que dice si adelgazar la
                  portada móvil sirvió. */}
              <EmbudoPorDispositivo funnel={funnel} />

              <Card className="p-5" data-testid="funnel-sources">
                <h4 className="font-heading font-semibold mb-1">{t('admin.funnel.sourcesTitle')}</h4>
                <p className="text-xs text-muted-foreground mb-4">{t('admin.funnel.sourcesSub')}</p>
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>{t('admin.funnel.source')}</TableHead>
                    <TableHead>{t('admin.funnel.visits')}</TableHead>
                    <TableHead>{t('admin.funnel.purchases')}</TableHead>
                    <TableHead>{t('admin.funnel.conversion')}</TableHead>
                    <TableHead>{t('admin.funnel.revenue')}</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {funnel.por_origen.length === 0 ? (
                      <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-6">{t('admin.funnel.noSources')}</TableCell></TableRow>
                    ) : funnel.por_origen.map((o) => (
                      <TableRow key={o.origen}>
                        <TableCell className="text-sm font-medium">{o.origen}</TableCell>
                        <TableCell>{o.visitas}</TableCell>
                        <TableCell>{o.compras}</TableCell>
                        <TableCell className={o.conversion > 0 ? 'text-[hsl(var(--success))]' : 'text-muted-foreground'}>{o.conversion}%</TableCell>
                        <TableCell>{formatMXN(o.ingreso)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {funnel.top_vistos.length > 0 && (
                <Card className="p-5" data-testid="funnel-top-viewed">
                  <h4 className="font-heading font-semibold mb-3">{t('admin.funnel.topViewed')}</h4>
                  <div className="space-y-2">
                    {funnel.top_vistos.map((v) => (
                      <div key={v.producto} className="flex justify-between text-sm">
                        <span className="truncate">{v.producto}</span>
                        <span className="text-muted-foreground">{v.vistas}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="sales" className="mt-5">
          {!analytics || analytics.monthly.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground">{t('admin.sales.noData')}</Card>
          ) : (
            <div className="space-y-4" data-testid="admin-sales">
              {/* También son accesos directos: el ticket promedio abre la lista de
                  pedidos, y cada estado abre la lista YA FILTRADA por ese estado. */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={Receipt} label={t('admin.sales.avgTicket')} value={formatMXN(analytics.avg_ticket)}
                  testid="admin-stat-ticket" onClick={() => irAPedidos()} />
                {STATUSES.filter((s) => analytics.by_status[s]).slice(0, 3).map((s) => (
                  <StatCard key={s} label={t(`status.${s}`)} value={analytics.by_status[s]}
                    testid={`admin-stat-estado-${s}`} onClick={() => irAPedidos({ estado: s })} />
                ))}
              </div>

              {/* Tráfico y ventas en el tiempo. Christian lo pidió tres veces: el
                  panel tenía totales pero no series, y sin serie no se ve si algo
                  sube o baja. Las visitas van en barras y el ingreso en línea, con
                  su propio eje: si compartieran eje, 16 visitas contra $3,347 harían
                  que las barras no se vieran. */}
              <Card className="p-5" data-testid="admin-serie">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="font-heading font-semibold">{t('admin.series.title')}</h3>
                  <div className="flex gap-1 rounded-lg border border-border p-0.5">
                    {['day', 'week', 'month'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSerieBucket(b)}
                        data-testid={`admin-serie-${b}`}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          serieBucket === b
                            ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {t(`admin.series.${b}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {!serie || !serie.serie?.length ? (
                  <div className="py-10 text-center text-sm text-muted-foreground">{t('admin.sales.noData')}</div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
                      <div>
                        <div className="text-muted-foreground text-xs">{t('admin.series.sessions')}</div>
                        <div className="font-heading text-xl font-bold mt-0.5">{serie.totales.sesiones}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">{t('admin.series.orders')}</div>
                        <div className="font-heading text-xl font-bold mt-0.5">{serie.totales.pedidos}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">{t('admin.series.revenue')}</div>
                        <div className="font-heading text-xl font-bold mt-0.5">{formatMXN(serie.totales.ingreso)}</div>
                      </div>
                      {/* La deuda al lado del ingreso: son las dos mitades de la misma
                          venta y sumarlas sería volver al número que engañaba. */}
                      <div data-testid="admin-serie-por-cobrar">
                        <div className="text-muted-foreground text-xs">{t('admin.stats.receivable')}</div>
                        <div className={`font-heading text-xl font-bold mt-0.5${(serie.totales.por_cobrar || 0) > 0 ? ' text-[hsl(var(--warning-foreground))]' : ''}`}>{formatMXN(serie.totales.por_cobrar || 0)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">{t('admin.series.conversion')}</div>
                        <div className="font-heading text-xl font-bold mt-0.5">{serie.totales.conversion}%</div>
                      </div>
                    </div>

                    <GraficaInteractiva height={280}>
                      <ComposedChart data={serie.serie} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
                        <XAxis dataKey="periodo" tickLine={false} axisLine={false} minTickGap={24}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis yAxisId="izq" tickLine={false} axisLine={false} width={36} allowDecimals={false}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis yAxisId="der" orientation="right" tickLine={false} axisLine={false} width={52}
                          tickFormatter={(v) => (v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`)}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip
                          contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
                          formatter={(v, n) => ((n === t('admin.series.revenue') || n === t('admin.stats.receivable')) ? formatMXN(v) : v)} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar yAxisId="izq" dataKey="sesiones" name={t('admin.series.sessions')} fill="hsl(var(--primary))" fillOpacity={0.35} radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="izq" dataKey="pedidos" name={t('admin.series.orders')} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="der" type="monotone" dataKey="ingreso" name={t('admin.series.revenue')} stroke="hsl(var(--info))" strokeWidth={2} dot={false} />
                        {/* Punteada, para que se lea distinto: es dinero prometido, no cobrado. */}
                        <Line yAxisId="der" type="monotone" dataKey="por_cobrar" name={t('admin.stats.receivable')} stroke="hsl(var(--warning-foreground))" strokeWidth={2} strokeDasharray="4 3" dot={false} />
                      </ComposedChart>
                    </GraficaInteractiva>
                  </>
                )}
              </Card>

              <Card className="p-5">
                <h3 className="font-heading font-semibold mb-4">{t('admin.sales.monthly')}</h3>
                <GraficaInteractiva height={260}>
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
                    <Tooltip contentStyle={CHART_TOOLTIP_STYLE} labelFormatter={fmtMonth} formatter={(v, name) => {
                      if (name === 'revenue') return [formatMXN(v), t('admin.stats.revenue')];
                      if (name === 'por_cobrar') return [formatMXN(v), t('admin.stats.receivable')];
                      return [v, t('admin.stats.orders')];
                    }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#rev)" activeDot={{ r: 4 }} />
                    {/* Lo entregado y sin cobrar, en su propia línea. Antes iba sumado
                        dentro de `revenue` y por eso julio decía $7,204 en vez de $3,347. */}
                    <Area type="monotone" dataKey="por_cobrar" stroke="hsl(var(--warning-foreground))" strokeWidth={2} strokeDasharray="4 3" fill="none" activeDot={{ r: 4 }} />
                  </AreaChart>
                </GraficaInteractiva>
              </Card>

              <div className="grid lg:grid-cols-2 gap-4">
                <Card className="p-5">
                  <h3 className="font-heading font-semibold mb-4">{t('admin.sales.topProducts')}</h3>
                  <GraficaInteractiva height={Math.max(180, analytics.top_products.length * 34)}>
                    <BarChart data={analytics.top_products} layout="vertical" margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" width={170} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} />
                      <Tooltip cursor={{ fill: 'hsl(var(--muted))', opacity: 0.35 }} contentStyle={CHART_TOOLTIP_STYLE} formatter={(v, name, item) => [`${formatMXN(v)} · ${t('admin.sales.units', { count: item.payload.units })}`, null]} />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={14} />
                    </BarChart>
                  </GraficaInteractiva>
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
          <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
            <h3 className="font-heading font-semibold">
              {buscaCliente
                ? t('admin.customers.showing', { shown: clientesFiltrados.length, count: customers.length })
                : t('admin.customersCount', { count: customers.length })}
            </h3>
            <Button onClick={() => { setInviteCreated(null); setInviteDialogOpen(true); }} data-testid="admin-invite-customer-button"><Plus className="h-4 w-4 mr-1.5" /> {t('admin.inviteCustomer')}</Button>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={buscaCliente} onChange={(e) => setBuscaCliente(e.target.value)}
              placeholder={t('admin.customers.search')} className="pl-9"
              data-testid="admin-customers-search" />
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-customers-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.table.customer')}</TableHead><TableHead>{t('admin.table.phone')}</TableHead>
                  <TableHead>{t('admin.table.ordersCount')}</TableHead><TableHead>{t('admin.table.totalSpent')}</TableHead><TableHead>{t('admin.stats.receivable')}</TableHead>
                  <TableHead>{t('admin.table.lastOrder')}</TableHead><TableHead>{t('admin.table.registered')}</TableHead><TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesFiltrados.length === 0 ? (
                  <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    {customers.length === 0 ? t('admin.noCustomers') : t('admin.customers.noMatch')}
                  </TableCell></TableRow>
                ) : clientesFiltrados.map((c) => (
                  <TableRow key={c.id} className={c.blocked ? 'opacity-60' : ''}>
                    <TableCell>
                      {/* El nombre Y el correo abren la ficha: es el gesto natural y el
                          que ya existe en las otras listas. El botón "Detalle" se queda
                          para quien lo busca donde siempre estuvo. */}
                      <button type="button" onClick={() => abrirCliente(c.id)} title={t('ficha.open')}
                        data-testid="admin-open-client" className="text-left">
                        <div className="text-sm font-medium underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
                          {c.name}{c.blocked && <Badge variant="outline" className="ml-2 text-[10px] text-destructive border-destructive/40">{t('admin.block.badge')}</Badge>}
                        </div>
                        <div className="text-xs text-muted-foreground break-all">{c.email}</div>
                      </button>
                      {/* ⛔ CON CUENTA O INVITADO, dicho con todas sus letras. Los dos son
                          clientes; lo que cambia es que del invitado no hay perfil que
                          bloquear, invitar ni convertir — sólo lo que dejó al comprar. */}
                      {c.guest ? (
                        <Badge variant="outline" className="mt-1 text-[10px]" title={t('admin.customers.guestHint')}
                          data-testid="admin-customer-guest">{t('distributor.client.guest')}</Badge>
                      ) : (
                        <Badge variant="outline" className={`mt-1 text-[10px] ${c.email_verified ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--warning-foreground))]'}`} data-testid="customer-invite-status">
                          {c.email_verified ? t('admin.ficha.inviteOk') : t('admin.ficha.invitePending')}
                        </Badge>
                      )}
                      {/* Compró como invitado con un correo que YA tiene cuenta. NO se
                          fusiona a ciegas: se avisa y Christián decide. */}
                      {c.posible_duplicado_de && (
                        <div className="mt-1 text-[10px] text-[hsl(var(--warning-foreground))]"
                          data-testid="admin-customer-duplicado">
                          {t('admin.customers.duplicateOf', { name: c.posible_duplicado_de.name })}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">{c.phones?.[0] || '—'}</TableCell>
                    <TableCell>{c.orders_count}</TableCell>
                    <TableCell className="font-medium">{formatMXN(c.total_spent)}</TableCell>
                    {/* "Gastado" es lo que PAGÓ. Lo que debe va aparte: antes iba sumado
                        y un cliente fiado se veía como el que mejor paga. */}
                    <TableCell className={(c.por_cobrar || 0) > 0 ? 'font-medium text-[hsl(var(--warning-foreground))]' : 'text-muted-foreground'} data-testid="admin-cliente-por-cobrar">
                      {(c.por_cobrar || 0) > 0 ? formatMXN(c.por_cobrar) : '—'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(c.last_order_at)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(c.created_at)}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {/* Sin cuenta no hay nada que convertir, bloquear ni "ver como":
                          esos botones necesitan un usuario detrás. La FICHA sí, siempre:
                          es justo lo que el invitado no tenía. */}
                      {!c.guest && c.role !== 'distributor' && (
                        <Button variant="ghost" size="sm" className="mr-1" data-testid="admin-convert-distributor-button"
                          onClick={() => { setConvertDone(null); setConvertForm({ commission: 25, customerDiscount: 10 }); setConvertTarget(c); }}>
                          <Store className="h-3.5 w-3.5 mr-1" /> {t('admin.convert.button')}
                        </Button>
                      )}
                      {!c.guest && (
                        <>
                          <Button variant="ghost" size="sm" className={`mr-1 ${c.blocked ? 'text-[hsl(var(--success))]' : 'text-destructive hover:bg-destructive hover:text-white'}`}
                            onClick={() => toggleBlocked(c)} data-testid="admin-block-customer-button">
                            <Ban className="h-3.5 w-3.5 mr-1" /> {t(c.blocked ? 'admin.block.unblock' : 'admin.block.block')}
                          </Button>
                          <Button variant="ghost" size="sm" className="mr-1" onClick={() => viewAs(c)} data-testid="admin-view-as-customer">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm" onClick={() => abrirCliente(c.id)} data-testid="admin-open-customer-button">{t('account.detail')}</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        
          {/* Recompra vive DENTRO de Clientes: es una vista de clientes —quien esta por
              quedarse sin producto— y como pestana aparte se miraba una vez y nunca mas. */}
          <div className="mt-10 space-y-4" data-testid="admin-recompra">
            <h3 className="font-heading font-semibold flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-[hsl(var(--primary))]" />
              {t('admin.repurchaseTab')}
            </h3>
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
                    <TableCell>
                      <button type="button" onClick={() => abrirCliente(r.user_id)} title={t('ficha.open')}
                        data-testid="admin-open-client" className="text-left">
                        <div className="text-sm underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">{r.customer_name}</div>
                        <div className="text-xs text-muted-foreground break-all">{r.customer_email}</div>
                      </button>
                    </TableCell>
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
                  </div>
        </TabsContent>

        <TabsContent value="distributors" className="mt-5">
          {/* La bolsa de comisiones: qué se debe y qué ya se pagó, con el registro
              de cada pago. Solo aparece cuando hay movimiento. */}
          <ComisionesAdmin />
          {applications.filter((a) => a.status === 'pendiente').length > 0 && (
            <Card className="p-4 mb-4 border-[hsl(var(--warning-border))]" data-testid="admin-applications">
              <h3 className="font-heading font-semibold text-sm mb-3">{t('admin.apps.title', { count: applications.filter((a) => a.status === 'pendiente').length })}</h3>
              <div className="space-y-2">
                {applications.filter((a) => a.status === 'pendiente').map((a) => (
                  <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border last:border-0 pb-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{a.name} <span className="text-xs text-muted-foreground font-normal">· {a.email}{a.phone ? ` · ${a.phone}` : ''}{a.kind ? ` · ${t(`b2b.kind.${a.kind}`)}` : ''}</span></div>
                      {a.message && <div className="text-xs text-muted-foreground line-clamp-2 max-w-xl">{a.message}</div>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" onClick={() => { setAppResult(null); setAppForm({ commission: 25, customerDiscount: 10 }); setAppTarget(a); }} data-testid="admin-app-approve">{t('admin.apps.approve')}</Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-white hover:border-destructive" onClick={() => resolveApplication(a, 'rechazar')} data-testid="admin-app-reject">{t('admin.apps.reject')}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
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
                    <TableCell><div className="text-sm font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.email}</div>
                      <Badge variant="outline" className={`mt-1 text-[10px] ${d.email_verified ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--warning-foreground))]'}`} data-testid="dist-invite-status">
                        {d.email_verified ? t('admin.ficha.inviteOk') : t('admin.ficha.invitePending')}
                      </Badge></TableCell>
                    <TableCell><button onClick={() => copyText(d.distributor_code, t('distributor.codeCopied'))} className="font-mono-tech text-xs inline-flex items-center gap-1 hover:text-[hsl(var(--primary))]">{d.distributor_code} <Copy className="h-3 w-3" /></button></TableCell>
                    <TableCell>{Math.round((d.commission_rate || 0) * 100)}%</TableCell>
                    <TableCell>{Math.round((d.customer_discount_rate || 0) * 100)}%</TableCell>
                    <TableCell>{d.clients_count}</TableCell>
                    <TableCell>{formatMXN(d.sales_total)}</TableCell>
                    <TableCell className="font-medium text-[hsl(var(--primary))]">{formatMXN(d.earnings)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-1" onClick={() => openDistProfile(d)} data-testid={`admin-dist-profile-${d.distributor_code}`}>
                        {t('admin.ficha.open')}
                      </Button>
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
          {/* Activos / Archivados + la barra de acciones en lote cuando hay algo marcado */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex gap-1">
              <Button size="sm" variant={!verArchivados ? 'default' : 'outline'}
                onClick={() => { setVerArchivados(false); setSel([]); }} data-testid="admin-ver-activos">
                {t('admin.lote.active')}
              </Button>
              <Button size="sm" variant={verArchivados ? 'default' : 'outline'}
                onClick={() => { setVerArchivados(true); setSel([]); }} data-testid="admin-ver-archivados">
                <Archive className="h-3.5 w-3.5 mr-1.5" /> {t('admin.lote.archived')}
              </Button>
              <Select value={filtroStatus} onValueChange={(v) => { setFiltroPedidos({ estado: v }); setSel([]); }}>
                <SelectTrigger className="w-40 h-8 ml-2" data-testid="admin-filtro-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t('admin.filter.allStatuses')}</SelectItem>
                  {STATUSES.map((s) => <SelectItem key={s} value={s}>{t(`status.${s}`)}</SelectItem>)}
                </SelectContent>
              </Select>
              {/* El DINERO, aparte de la mercancía. Aquí aterrizan las tarjetas
                  "Cobrado" y "Por Cobrar" del tablero, ya con el filtro puesto. */}
              <Select value={filtroPago} onValueChange={(v) => { setFiltroPedidos({ pago: v }); setSel([]); }}>
                <SelectTrigger className="w-44 h-8 ml-2" data-testid="admin-filtro-pago"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">{t('admin.filter.allPayments')}</SelectItem>
                  <SelectItem value="pagados">{t('admin.filter.onlyPaid')}</SelectItem>
                  <SelectItem value="deuda">{t('admin.filter.onlyDebt')}</SelectItem>
                </SelectContent>
              </Select>
              {/* BARRER LAS PRUEBAS. Sólo sale cuando hay algo marcado como prueba: si
                  nadie ensució, no hay botón que invite a borrar. */}
              {hayPruebas && (
                <Button size="sm" variant="outline" className="ml-2" disabled={loteBusy}
                  onClick={verBarrido} data-testid="admin-barrer-pruebas">
                  <FlaskConical className="h-3.5 w-3.5 mr-1.5" /> {t('admin.prueba.sweep')}
                </Button>
              )}
            </div>
            {sel.length > 0 && (
              <div className="flex flex-wrap items-center gap-2" data-testid="admin-lote-bar">
                <span className="text-sm text-muted-foreground">{t('admin.lote.selected', { n: sel.length })}</span>
                {/* Marcar / desmarcar como prueba. Es una etiqueta, no un borrado: por eso
                    va en gris junto a archivar y no en rojo junto a borrar. */}
                {selTodosPrueba ? (
                  <Button size="sm" variant="outline" disabled={loteBusy} data-testid="admin-lote-desmarcar-prueba"
                    onClick={() => marcarPrueba(sel, false)}>
                    <FlaskConical className="h-3.5 w-3.5 mr-1.5" /> {t('admin.lote.unmarkTest')}
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled={loteBusy} data-testid="admin-lote-marcar-prueba"
                    onClick={() => marcarPrueba(sel, true)}>
                    <FlaskConical className="h-3.5 w-3.5 mr-1.5" /> {t('admin.lote.markTest')}
                  </Button>
                )}
                {!verArchivados ? (
                  <Button size="sm" variant="outline" onClick={() => lote(sel, 'archivar')} disabled={loteBusy} data-testid="admin-lote-archivar">
                    <Archive className="h-3.5 w-3.5 mr-1.5" /> {t('admin.lote.archive')}
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => lote(sel, 'desarchivar')} disabled={loteBusy} data-testid="admin-lote-desarchivar">
                    <ArchiveRestore className="h-3.5 w-3.5 mr-1.5" /> {t('admin.lote.unarchive')}
                  </Button>
                )}
                <Button size="sm" variant="destructive" disabled={loteBusy} data-testid="admin-lote-borrar"
                  onClick={() => setLoteKill({ pedidos: pedidosVista.filter((o) => sel.includes(o.id)) })}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> {t('admin.lote.delete')}
                </Button>
              </div>
            )}
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-orders-table">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <Checkbox checked={todosSel} disabled={pedidosVista.length === 0}
                      onCheckedChange={(v) => setSel(v ? pedidosVista.map((o) => o.id) : [])}
                      aria-label={t('admin.lote.selectAll')} data-testid="admin-sel-todo" />
                  </TableHead>
                  <TableHead>{t('admin.table.order')}</TableHead><TableHead>{t('admin.table.customer')}</TableHead><TableHead>{t('common.total')}</TableHead>
                  <TableHead>{t('admin.table.payment')}</TableHead><TableHead>{t('admin.table.paid')}</TableHead><TableHead>{t('admin.table.date')}</TableHead><TableHead>{t('admin.table.status')}</TableHead>
                  <TableHead>{t('admin.table.receipt')}</TableHead>
                  <TableHead>{t('admin.table.tracking')}</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidosVista.length === 0 ? (
                  <TableRow><TableCell colSpan={11} className="text-center text-muted-foreground py-8">{t('admin.noOrders')}</TableCell></TableRow>
                ) : pedidosVista.map((o) => (
                  <TableRow key={o.id} data-state={sel.includes(o.id) ? 'selected' : undefined}>
                    <TableCell>
                      <Checkbox checked={sel.includes(o.id)} onCheckedChange={() => toggleSel(o.id)}
                        aria-label={o.order_number} data-testid="admin-sel-pedido" />
                    </TableCell>
                    <TableCell>
                      <button type="button" onClick={() => setOrderOpen(o)} data-testid="admin-open-order"
                        className="font-mono-tech text-xs underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
                        {o.order_number}
                      </button>
                      {/* ENVÍO PARTIDO: este pedido no sale completo de la bodega. Se
                          marca en la LISTA, no solo adentro, porque si hay que comprarle
                          al proveedor eso se decide viendo los pedidos del día. */}
                      {o.backorder && (
                        <div className="mt-1">
                          <Badge variant="outline" data-testid="admin-order-backorder-badge"
                            className="text-[10px] border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]">
                            {t('admin.order.backorderBadge')}
                          </Badge>
                        </div>
                      )}
                      {/* MARCADO COMO PRUEBA. Se ve en la lista, no sólo adentro: si no
                          se ve, nadie se acuerda de barrerlo. */}
                      {o.es_prueba && (
                        <div className="mt-1">
                          <Badge variant="outline" data-testid="admin-order-prueba-badge"
                            className="text-[10px] border-dashed text-muted-foreground">
                            {t('admin.prueba.badge')}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    {/* La columna Cliente de PEDIDOS abre la misma ficha que la lista de
                        Clientes. Incluidos los que compraron sin cuenta: ahí el nombre
                        era texto muerto y no había forma de llegar a esa persona. */}
                    <TableCell>
                      <button type="button" onClick={() => abrirCliente(clienteDelPedido(o))} title={t('ficha.open')}
                        data-testid="admin-open-client" className="text-left">
                        <div className="text-sm underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">{o.customer.full_name}</div>
                        <div className="text-xs text-muted-foreground break-all">{o.customer.email}</div>
                      </button>
                    </TableCell>
                    <TableCell className="font-medium">{formatMXN(o.total)}</TableCell>
                    <TableCell className="text-xs">{t(`payment.${o.payment_method}.label`) || o.payment_method}</TableCell>
                    {/* El servidor manda `pagado` ya resuelto (los pedidos viejos no
                        traen el campo `paid` y se infiere allá, no aquí). Un clic lo
                        cambia: es el único lugar donde se dice "ya me pagó". */}
                    <TableCell>
                      <button type="button" onClick={() => marcarPago(o, !o.pagado)}
                        data-testid="admin-toggle-pago"
                        title={o.pagado ? t('admin.pay.markUnpaid') : t('admin.pay.markPaid')}
                        className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition hover:opacity-80"
                        style={o.pagado
                          ? { background: 'hsl(var(--success) / 0.12)', borderColor: 'hsl(var(--success))', color: 'hsl(var(--success))' }
                          : { background: 'hsl(var(--warning) / 0.15)', borderColor: 'hsl(var(--warning-border))', color: 'hsl(var(--warning-foreground))' }}>
                        {o.pagado ? <CircleCheck className="h-3.5 w-3.5" /> : <CircleAlert className="h-3.5 w-3.5" />}
                        {o.pagado ? t('admin.pay.paid') : t('admin.pay.unpaid')}
                      </button>
                    </TableCell>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive hover:text-white"
                        onClick={() => setOrderKill(o)} title={t('admin.order.delete')} data-testid="admin-delete-order">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                          <Truck className="h-3.5 w-3.5 mr-1.5" /> {t('guia.add')}
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
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
            {/* El conteo enseña CUÁNTOS SE VEN de cuántos hay: con el buscador puesto,
                un "193 productos" fijo mientras la tabla muestra 3 se lee como un error. */}
            <h3 className="font-heading font-semibold">
              {productFilter.trim()
                ? `${productosFiltrados.length} de ${products.length}`
                : t('admin.productsCount', { count: products.length })}
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input className="w-64 pl-8" placeholder={t('admin.products.search')}
                  value={productFilter} onChange={(e) => setProductFilter(e.target.value)}
                  data-testid="admin-products-search" />
              </div>
              <Button onClick={openNew} data-testid="admin-add-product-button"><Plus className="h-4 w-4 mr-1.5" /> {t('admin.newProduct')}</Button>
            </div>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="admin-products-table">
              <TableHeader>
                <TableRow>
                  <SortableTableHead campo="name" activo={productSort.campo} dir={productSort.dir} onClick={toggleProductSort} testId="admin-sort-name">{t('admin.table.name')}</SortableTableHead>
                  <SortableTableHead campo="category" activo={productSort.campo} dir={productSort.dir} onClick={toggleProductSort} testId="admin-sort-category">{t('admin.table.category')}</SortableTableHead>
                  <TableHead>{t('admin.table.purity')}</TableHead>
                  <SortableTableHead campo="stock" activo={productSort.campo} dir={productSort.dir} onClick={toggleProductSort} testId="admin-sort-stock">{t('admin.table.stock')}</SortableTableHead>
                  <SortableTableHead campo="price" activo={productSort.campo} dir={productSort.dir} onClick={toggleProductSort} testId="admin-sort-price">{t('admin.table.price')}</SortableTableHead>
                  <TableHead>{t('admin.table.batch')}</TableHead><TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productosFiltrados.map((p) => (
                  <TableRow key={p.id}>
                    {/* El nombre abre la FICHA PÚBLICA del producto, en otra pestaña
                        (Christián, 2026-07-31). Era texto muerto: para leer la
                        descripción que ve el cliente había que salirse del panel,
                        ir al catálogo y buscarlo a mano. El lápiz sigue siendo el
                        que edita; esto sólo es para ver. Va en pestaña nueva a
                        propósito: quien revisa fichas revisa varias seguidas y no
                        debe perder la tabla ni el filtro que traía puesto. */}
                    <TableCell className="font-medium">
                      {p.slug ? (
                        <a href={`/producto/${p.slug}`} target="_blank" rel="noopener noreferrer"
                          data-testid="admin-open-product"
                          className="underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
                          {p.name}
                        </a>
                      ) : p.name}
                      {p.featured && <Badge variant="secondary" className="ml-2 text-[10px]">{t('admin.featured')}</Badge>}
                    </TableCell>
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
        </div>
      </Tabs>

      {/* LA HOJA DE LA GUÍA — la MISMA que usan el distribuidor, la ficha del cliente
          y la ficha del pedido. Aquí arriba se le cuelga lo que sólo es del admin:
          cotizar con Skydropx y COMPRAR la guía (dinero de la casa). Los campos de
          captura ya no se copian: si mañana se agrega uno, se agrega en un solo lado. */}
      <HojaDeGuia pedido={shippingOpen} open={!!shippingOpen}
        onClose={() => setShippingOpen(null)} onGuardada={loadAll}>
        {shippingOpen && (
          <CotizarEnvio order={shippingOpen} onComprada={() => { setShippingOpen(null); loadAll(); }} />
        )}
      </HojaDeGuia>


      <Dialog open={!!orderKill} onOpenChange={(v) => !v && setOrderKill(null)}>
        <DialogContent className="max-w-md" data-testid="admin-delete-order-dialog">
          {orderKill && (
            <>
              <DialogHeader><DialogTitle>{t('admin.order.deleteTitle')}</DialogTitle></DialogHeader>
              <p className="text-sm text-muted-foreground">
                {t('admin.order.deleteBody', {
                  n: orderKill.order_number,
                  name: orderKill.customer?.full_name || '',
                  total: formatMXN(orderKill.total),
                })}
              </p>
              <p className="text-xs text-muted-foreground">{t('admin.order.deleteHint')}</p>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => setOrderKill(null)}>{t('common.cancel')}</Button>
                <Button variant="destructive" size="sm" onClick={deleteOrder} data-testid="admin-delete-order-confirm">
                  <Trash2 className="h-4 w-4 mr-1.5" /> {t('admin.order.deleteConfirm')}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Borrado EN LOTE: primero la lista completa de lo que se va; si el backend
          protege ventas pagadas, se enseñan con nombre y monto y el forzado es un
          segundo botón aparte. Jamás se fuerza en automático. */}
      <Dialog open={!!loteKill} onOpenChange={(v) => !v && setLoteKill(null)}>
        <DialogContent className="max-w-md" data-testid="admin-lote-dialog">
          {loteKill && (loteKill.protegidos ? (
            <>
              <DialogHeader><DialogTitle>{t('admin.lote.protectedTitle')}</DialogTitle></DialogHeader>
              <p className="text-sm text-muted-foreground">{t('admin.lote.protectedBody', { n: loteKill.protegidos.length })}</p>
              <div className="rounded-lg border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]/10 p-3 space-y-1.5 text-xs max-h-56 overflow-y-auto" data-testid="admin-lote-protegidos">
                {loteKill.protegidos.map((p) => (
                  <div key={p.order_number} className="flex items-center justify-between gap-2">
                    <span className="font-mono-tech shrink-0">{p.order_number}</span>
                    <span className="truncate flex-1">{p.cliente}</span>
                    <Badge variant="outline" className="text-[10px] uppercase shrink-0">{t(`status.${p.status}`)}</Badge>
                    <span className="font-medium shrink-0">{formatMXN(p.total)}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{t('admin.lote.forceHint')}</p>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => setLoteKill(null)}>{t('common.cancel')}</Button>
                <Button variant="destructive" size="sm" disabled={loteBusy || !loteKill.ids?.length}
                  onClick={() => lote(loteKill.ids, 'borrar', true)} data-testid="admin-lote-forzar">
                  <Trash2 className="h-4 w-4 mr-1.5" /> {t('admin.lote.force', { n: loteKill.protegidos.length })}
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader><DialogTitle>{t('admin.lote.deleteTitle', { n: loteKill.pedidos.length })}</DialogTitle></DialogHeader>
              <div className="rounded-lg border border-border p-3 space-y-1.5 text-xs max-h-56 overflow-y-auto" data-testid="admin-lote-lista">
                {loteKill.pedidos.map((o) => (
                  <div key={o.id} className="flex items-center justify-between gap-2">
                    <span className="font-mono-tech shrink-0">{o.order_number}</span>
                    <span className="truncate flex-1">{o.customer?.full_name}</span>
                    <span className="font-medium shrink-0">{formatMXN(o.total)}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{t('admin.lote.deleteHint')}</p>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => setLoteKill(null)}>{t('common.cancel')}</Button>
                <Button variant="destructive" size="sm" disabled={loteBusy}
                  onClick={() => lote(loteKill.pedidos.map((o) => o.id), 'borrar')} data-testid="admin-lote-confirmar">
                  <Trash2 className="h-4 w-4 mr-1.5" /> {t('admin.lote.deleteConfirm', { n: loteKill.pedidos.length })}
                </Button>
              </div>
            </>
          ))}
        </DialogContent>
      </Dialog>

      {/* BARRIDO DE PRUEBAS. Lo que se ve aquí es el SIMULACRO que contestó el servidor:
          los que se va a llevar, y los que NO va a tocar con el motivo de cada uno. El
          botón de borrar sólo aparece si hay algo que borrar. */}
      <Dialog open={!!barrido} onOpenChange={(v) => !v && setBarrido(null)}>
        <DialogContent className="max-w-md" data-testid="admin-barrido-dialog">
          {barrido && (
            <>
              <DialogHeader><DialogTitle>{t('admin.prueba.sweepTitle')}</DialogTitle></DialogHeader>
              {barrido.numeros?.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground">{t('admin.prueba.sweepBody', { n: barrido.numeros.length })}</p>
                  <div className="rounded-lg border border-border p-3 space-y-1 text-xs max-h-40 overflow-y-auto" data-testid="admin-barrido-lista">
                    {barrido.numeros.map((n) => <div key={n} className="font-mono-tech">{n}</div>)}
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground" data-testid="admin-barrido-vacio">{t('admin.prueba.none')}</p>
              )}
              {barrido.protegidos?.length > 0 && (
                <>
                  <p className="text-xs text-muted-foreground">{t('admin.prueba.protected', { n: barrido.protegidos.length })}</p>
                  <div className="rounded-lg border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]/10 p-3 space-y-1.5 text-xs max-h-40 overflow-y-auto" data-testid="admin-barrido-protegidos">
                    {barrido.protegidos.map((p) => (
                      <div key={p.order_number} className="flex items-center justify-between gap-2">
                        <span className="font-mono-tech shrink-0">{p.order_number}</span>
                        <span className="truncate flex-1">{p.cliente}</span>
                        {/* El motivo viaja como clave y se traduce aquí: el Panel habla tres idiomas. */}
                        <span className="shrink-0">{(p.motivos || []).map((m) => t(`admin.prueba.motivo.${m}`)).join(' · ')}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => setBarrido(null)}>{t('common.cancel')}</Button>
                {barrido.numeros?.length > 0 && (
                  <Button variant="destructive" size="sm" disabled={loteBusy}
                    onClick={barrerPruebas} data-testid="admin-barrido-confirmar">
                    <Trash2 className="h-4 w-4 mr-1.5" /> {t('admin.prueba.sweepConfirm', { n: barrido.numeros.length })}
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Hoja de empaque: qué meter en la caja y a dónde mandarla. */}
      <Dialog open={!!orderOpen} onOpenChange={(v) => !v && setOrderOpen(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" data-testid="admin-order-detail-dialog">
          {orderOpen && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono-tech text-base">{orderOpen.order_number}</span>
                  <Badge variant="outline" className="text-[10px] uppercase">{t(`status.${orderOpen.status}`)}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                {/* ⛔ LO QUE HAY QUE MANDAR PEDIR. Va ARRIBA de la lista de empaque: si
                    quien prepara no lo ve primero, manda el paquete incompleto sin saberlo
                    y nadie le compra al proveedor lo que falta. */}
                {orderOpen.backorder_items?.length > 0 && (
                  <Card className="p-3 border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]"
                    data-testid="admin-order-backorder">
                    <div className="text-xs font-semibold mb-2">{t('admin.order.backorderTitle')}</div>
                    <div className="space-y-1.5">
                      {orderOpen.backorder_items.map((b, i) => (
                        <div key={i} className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate">{b.name}</div>
                            {/* A QUIÉN COMPRARLE. Sin esto la tarjeta decía QUÉ mandar
                                pedir y había que ir a buscar el proveedor a otra parte,
                                con el pedido ya vendido. */}
                            {b.proveedor ? (
                              <div className="text-[11px] opacity-90 break-words" data-testid="admin-order-proveedor">
                                {t('admin.order.buyFrom', { proveedor: b.proveedor })}
                                {b.telefono
                                  ? <> · <a href={b.whatsapp || `tel:${b.telefono}`} className="underline">{b.telefono}</a></>
                                  : <> · {t('admin.order.noPhone')}</>}
                                {b.costo_vial_usd ? ` · $${Number(b.costo_vial_usd).toFixed(2)} USD/${t('admin.order.perVial')}` : ''}
                              </div>
                            ) : (
                              <div className="text-[11px] font-medium" data-testid="admin-order-sin-proveedor">
                                {t('admin.order.noSupplier')}
                              </div>
                            )}
                          </div>
                          <div className="shrink-0 text-right text-xs">
                            <div>{t('admin.order.backorderNow', { n: b.en_mano })}</div>
                            <div className="font-bold">{t('admin.order.backorderOrder', { n: b.por_surtir })}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] opacity-80">{t('admin.order.backorderHint')}</div>
                  </Card>
                )}
                <div>
                  <div className="text-xs font-semibold mb-2">{t('admin.order.pack')}</div>
                  <Card className="divide-y divide-border" data-testid="admin-order-items">
                    {(orderOpen.items || []).map((it, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 p-3">
                        <div className="min-w-0">
                          <div className="font-medium truncate">{it.name}</div>
                          <div className="text-xs text-muted-foreground font-mono-tech">{it.presentation}</div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="font-heading text-lg font-bold">×{it.quantity}</div>
                          <div className="text-xs text-muted-foreground">{formatMXN(it.price * it.quantity)}</div>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Card className="p-3 space-y-1" data-testid="admin-order-address">
                    <div className="text-xs font-semibold mb-1">{t('admin.order.shipTo')}</div>
                    <div className="font-medium">{orderOpen.customer?.full_name}</div>
                    <div className="text-xs text-muted-foreground">{orderOpen.customer?.address}</div>
                    <div className="text-xs text-muted-foreground">
                      {[orderOpen.customer?.city, orderOpen.customer?.state, orderOpen.customer?.postal_code].filter(Boolean).join(', ')}
                    </div>
                    <div className="text-xs text-muted-foreground">{orderOpen.customer?.country}</div>
                    <div className="pt-1 text-xs"><Phone className="h-3 w-3 inline mr-1" />{orderOpen.customer?.phone}</div>
                    <div className="text-xs break-all">{orderOpen.customer?.email}</div>
                    <Button variant="outline" size="sm" className="h-7 text-xs mt-2"
                      onClick={() => { navigator.clipboard?.writeText(
                        [orderOpen.customer?.full_name, orderOpen.customer?.address,
                         [orderOpen.customer?.city, orderOpen.customer?.state, orderOpen.customer?.postal_code].filter(Boolean).join(', '),
                         orderOpen.customer?.country, orderOpen.customer?.phone].filter(Boolean).join('\n'));
                        toast.success(t('admin.order.copied')); }}
                      data-testid="admin-order-copy-address">
                      <Copy className="h-3 w-3 mr-1.5" /> {t('admin.order.copyAddress')}
                    </Button>
                  </Card>

                  <Card className="p-3 space-y-1.5" data-testid="admin-order-money">
                    <div className="text-xs font-semibold mb-1">{t('admin.order.payment')}</div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t('common.subtotal')}</span><span>{formatMXN(orderOpen.subtotal)}</span></div>
                    {orderOpen.discount > 0 && (
                      <div className="flex justify-between text-xs text-[hsl(var(--success))]">
                        <span>{t('admin.order.discount')} ({Math.round((orderOpen.discount_rate || 0) * 100)}%)</span>
                        <span>− {formatMXN(orderOpen.discount)}</span>
                      </div>
                    )}
                    {orderOpen.points_used > 0 && (
                      <div className="flex justify-between text-xs text-[hsl(var(--success))]"><span>{t('loyalty.line')}</span><span>− {formatMXN(orderOpen.points_used)}</span></div>
                    )}
                    <Separator className="my-1" />
                    <div className="flex justify-between font-heading font-bold"><span>{t('common.total')}</span><span>{formatMXN(orderOpen.total)}</span></div>
                    <div className="text-xs text-muted-foreground pt-1">{t(`payment.${orderOpen.payment_method}.label`) || orderOpen.payment_method}</div>
                    <div className="text-xs text-muted-foreground">{new Date(orderOpen.created_at).toLocaleString(language)}</div>
                  </Card>
                </div>

                {orderOpen.customer?.notes && (
                  <Card className="p-3" data-testid="admin-order-notes">
                    <div className="text-xs font-semibold mb-1">{t('admin.order.notes')}</div>
                    <p className="text-xs text-muted-foreground whitespace-pre-wrap">{orderOpen.customer.notes}</p>
                  </Card>
                )}

                {/* La guía que compró Skydropx sola al confirmarse el pago. El PDF
                    es lo único que le falta al admin para despachar: el número y el
                    rastreo ya se ven arriba, en la columna de envío. */}
                {orderOpen.label_error && (
                  <p className="text-xs text-destructive" data-testid="admin-order-label-error">
                    {t('admin.shipping.labelError')} {orderOpen.label_error}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => { const o = orderOpen; setOrderOpen(null); openShipping(o); }} data-testid="admin-order-ship">
                    <Truck className="h-4 w-4 mr-1.5" /> {orderOpen.tracking_number ? t('guia.edit') : t('guia.add')}
                  </Button>
                  {/* IMPRIMIR LA GUÍA, no «abrir la página de la paquetería»
                      (Christián, 2026-07-31). Era un enlace crudo al `label_url`, que
                      es una URL FIRMADA y caduca: el día que caducaba, el botón se veía
                      igual de bien y no traía nada. Ahora el PDF lo sirve la casa y se
                      rescata solo si hace falta. Ver components/BotonImprimirGuia.js. */}
                  {hayEtiqueta(orderOpen) && (
                    <BotonImprimirGuia testid="admin-order-label"
                      ruta={`/admin/orders/${orderOpen.order_number}/etiqueta`} />
                  )}
                  {orderOpen.spei_receipt_at && (
                    <Button variant="outline" size="sm" onClick={() => openReceipt(orderOpen.id)}>
                      <Receipt className="h-4 w-4 mr-1.5" /> {t('admin.receipt.view')}
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" className="ml-auto" onClick={() => setOrderKill(orderOpen)} data-testid="admin-order-delete">
                    <Trash2 className="h-4 w-4 mr-1.5" /> {t('admin.order.delete')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!distOpen} onOpenChange={(v) => !v && setDistOpen(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto" data-testid="admin-dist-profile-dialog">
          {distOpen && (() => { const d = distOpen.distributor; return (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">{d.name}
                  <Badge variant="outline" className="text-[10px] uppercase">{d.tier || 'junior'}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-5 text-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="rounded-lg border border-border p-2"><div className="text-[11px] text-muted-foreground">{t('admin.dist.commission')}</div><div className="font-semibold">{Math.round((d.commission_rate || 0) * 100)}%</div></div>
                  <div className="rounded-lg border border-border p-2"><div className="text-[11px] text-muted-foreground">{t('admin.dist.sales')}</div><div className="font-semibold">{formatMXN(d.sales_total)}</div></div>
                  <div className="rounded-lg border border-border p-2"><div className="text-[11px] text-muted-foreground">{t('admin.dist.earnings')}</div><div className="font-semibold text-[hsl(var(--primary))]">{formatMXN(d.earnings)}</div></div>
                  <div className="rounded-lg border border-border p-2"><div className="text-[11px] text-muted-foreground">{t('admin.dist.clients')}</div><div className="font-semibold">{d.clients_count}</div></div>
                </div>
                <div className="text-xs text-muted-foreground">{d.email} · <span className="font-mono-tech">{d.distributor_code}</span></div>
                <div className="rounded-xl border border-border p-3 space-y-2" data-testid="admin-dist-notes-box">
                  <div className="text-xs font-semibold">{t('admin.ficha.notes')}</div>
                  <Textarea rows={3} defaultValue={d.admin_notes || ''} id="dist-notes-area" data-testid="admin-dist-notes-input" />
                  <Button size="sm" variant="outline" onClick={async () => {
                    try {
                      await api.put(`/admin/distributors/${d.id}/notes`, { notes: document.getElementById('dist-notes-area').value });
                      toast.success(t('admin.ficha.notesSaved')); loadAll();
                    } catch { toast.error('Error'); }
                  }} data-testid="admin-dist-notes-save">{t('admin.ficha.saveNotes')}</Button>
                </div>
                <div>
                  <Button variant="outline" size="sm" onClick={() => { setDistOpen(null); openRates(d); }} data-testid="admin-ficha-edit-rates">
                    <Pencil className="h-3.5 w-3.5 mr-1" /> {t('admin.dist.editRates')}
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2" onClick={() => viewAs(d)} data-testid="admin-view-as-dist">
                    <Eye className="h-3.5 w-3.5 mr-1" /> {t('viewAs.button')}
                  </Button>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1">{t('admin.ficha.codes')}</div>
                  {distOpen.codes.length === 0 ? <div className="text-xs text-muted-foreground">—</div> : distOpen.codes.map((c) => (
                    <div key={c.id} className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0">
                      <span className="font-mono-tech">{c.code}</span>
                      <span>{Math.round((c.discount_rate || 0) * 100)}%</span>
                      <span className="text-muted-foreground">{c.expires_at ? fmtDate(c.expires_at) : '—'}</span>
                      <Badge variant="outline" className="text-[10px]">{c.active ? t('admin.ficha.couponActive') : t('admin.ficha.couponExpired')}</Badge>
                    </div>
                  ))}
                </div>
                {distOpen.subdistributors.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold mb-1">{t('admin.ficha.subs')}</div>
                    {distOpen.subdistributors.map((sd) => (
                      <div key={sd.id} className="flex items-center justify-between gap-2 text-xs py-1.5 border-b border-border last:border-0">
                        <div><div className="font-medium">{sd.name}</div><div className="text-muted-foreground">{sd.email}</div></div>
                        <Badge variant="outline" className="text-[10px] uppercase">{sd.tier}</Badge>
                        <span>{formatMXN(sd.sales_total)}</span>
                        <span className="text-muted-foreground">{sd.clients_count} {t('admin.ficha.clientsShort')}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold mb-1">{t('admin.ficha.clients')}</div>
                  {distOpen.clients.length === 0 ? <div className="text-xs text-muted-foreground">{t('admin.customer.noOrders')}</div> : distOpen.clients.map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-2 text-xs py-1.5 border-b border-border last:border-0">
                      {/* También desde la ficha del distribuidor: sus clientes se abren. */}
                      <button type="button" onClick={() => abrirCliente(c.id)} title={t('ficha.open')}
                        data-testid="admin-open-client" className="text-left min-w-0">
                        <div className="font-medium underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">{c.name}</div>
                        <div className="text-muted-foreground break-all">{c.email}</div>
                      </button>
                      <span>{c.orders} {t('admin.ficha.ordersShort')}</span>
                      <span>{formatMXN(c.total)}</span>
                      <span className="text-[hsl(var(--primary))]">{formatMXN(c.commission)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold mb-1">{t('admin.ficha.recentSales')}</div>
                  {distOpen.sales.slice(0, 12).map((o) => (
                    <div key={o.order_number} className="flex items-center justify-between gap-2 text-xs py-1 border-b border-border last:border-0">
                      {/* Aquí el número tampoco se podía abrir: mismo gesto que en todas
                          las demás listas, mismo modal de detalle. */}
                      <button type="button" onClick={() => setFichaPedido(o.order_number)}
                        data-testid="admin-ficha-open-order"
                        className="font-mono-tech underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
                        {o.order_number}
                      </button>
                      <span className="text-muted-foreground">{fmtDate(o.created_at)}</span>
                      <Badge className={`${STATUS_COLORS[o.status]} text-[10px]`}>{t(`status.${o.status}`)}</Badge>
                      <span>{formatMXN(o.total)}</span>
                      <span className="text-[hsl(var(--primary))]">{formatMXN(o.commission)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ); })()}
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

      {/* Aprobar una solicitud del formulario público: convierte al cliente o manda invitación. */}
      <Dialog open={!!appTarget} onOpenChange={(open) => { if (!open) { setAppTarget(null); setAppResult(null); } }}>
        <DialogContent className="max-w-sm" data-testid="admin-app-dialog">
          <DialogHeader><DialogTitle>{t('admin.apps.approveTitle')}</DialogTitle></DialogHeader>
          {appResult ? (
            <div className="space-y-4 text-sm">
              <div className="font-medium">{appTarget?.name}<span className="text-muted-foreground font-normal"> · {appTarget?.email}</span></div>
              {appResult.distributor_code && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{t('admin.dist.shareCode')}</div>
                  <button onClick={() => copyText(appResult.distributor_code, t('distributor.codeCopied'))} className="font-mono-tech font-bold text-lg inline-flex items-center gap-2 hover:text-[hsl(var(--primary))]">{appResult.distributor_code} <Copy className="h-4 w-4" /></button>
                </div>
              )}
              {appResult.invited && <InviteResult created={appResult} t={t} copyText={copyText} />}
              {appResult.converted && <p className="text-xs text-muted-foreground">{t('admin.apps.convertedNote')}</p>}
              {appResult.already && <p className="text-xs text-muted-foreground">{t('admin.apps.alreadyNote')}</p>}
              <DialogFooter><Button onClick={() => { setAppTarget(null); setAppResult(null); }}>{t('admin.dist.close')}</Button></DialogFooter>
            </div>
          ) : appTarget && (
            <>
              <div className="space-y-4">
                <div className="text-sm font-medium">{appTarget.name}<span className="text-muted-foreground font-normal"> · {appTarget.email}</span></div>
                <div>
                  <Label>{t('admin.dist.commission')} (%)</Label>
                  <Input type="number" min="0" max="50" className="mt-1.5" value={appForm.commission}
                    onChange={(e) => setAppForm((f) => ({ ...f, commission: e.target.value }))} data-testid="admin-app-commission" />
                </div>
                <div>
                  <Label>{t('admin.dist.customerDiscount')} (%)</Label>
                  <Input type="number" min="5" max="50" className="mt-1.5" value={appForm.customerDiscount}
                    onChange={(e) => setAppForm((f) => ({ ...f, customerDiscount: e.target.value }))} data-testid="admin-app-discount" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAppTarget(null)}>{t('common.cancel')}</Button>
                <Button onClick={() => resolveApplication(appTarget, 'aprobar')} data-testid="admin-app-approve-save">{t('admin.apps.approve')}</Button>
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
      {/* LA ficha del cliente: la misma que ve el distribuidor, con lo que a cada quien
          le toca. Se abre desde Clientes, Pedidos, Recompra y la ficha del distribuidor. */}
      <FichaCliente clientId={clienteAbierto} open={!!clienteAbierto}
        onClose={() => setClienteAbierto(null)} />
      <FichaPedido orderNumber={fichaPedido} open={!!fichaPedido} admin
        onClose={() => setFichaPedido(null)} />
    </div>
  );
};

export default Admin;
