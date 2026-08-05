import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Store, Users, DollarSign, TrendingUp, ShoppingBag, Copy, Percent, Truck, ExternalLink, BookOpen, Award, Ticket, RefreshCw, Bell, Syringe, Package, Coins, User, GraduationCap, FlaskConical, Megaphone, ChevronRight, Calculator, Sparkles, FileText, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import GraficaInteractiva from '@/components/charts/GraficaInteractiva';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardSidebar, { alTope } from '@/components/layout/DashboardSidebar';
import CoaLibrary from '@/components/CoaLibrary';
import FichaPedido from '@/components/FichaPedido';
import FichaCliente from '@/components/FichaCliente';
import HojaDeGuia from '@/components/HojaDeGuia';
import BotonImprimirGuia from '@/components/BotonImprimirGuia';
import FichaLibrary from '@/components/FichaLibrary';
import LabReports from '@/components/LabReports';
import NotificationsFeed from '@/components/NotificationsFeed';
import ToolsPanel, { herramientasDesbloqueadas } from '@/components/ToolsPanel';
import CotizadorDistribuidor from '@/components/CotizadorDistribuidor';
import ComisionesDistribuidor from '@/components/ComisionesDistribuidor';
import useRefrescoAlVolver from '@/hooks/useRefrescoAlVolver';
// ⛔ EL MISMO componente que ve el admin. Lo que cambia —si se ven o no los números
// de la casa— lo decide el SERVIDOR con el token, no este archivo: la ruta del
// distribuidor recorta la respuesta con una lista blanca antes de mandarla.
import CotizadorDeEnvios from '@/components/CotizadorDeEnvios';
import ChatNegocio from '@/components/ChatNegocio';
// ⛔ ACUERDO DE DISTRIBUIDOR — apagado en el backend por omisión. Mientras lo
// esté, `useAcuerdo` devuelve `requiere_aceptacion: false` y ni la pantalla ni
// la tarjeta de Perfil se pintan: el panel se ve exactamente igual que hoy.
import PantallaDeAcuerdo, { useAcuerdo, AcuerdoEnPerfil, AvisoDeAcuerdoPendiente } from '@/components/AcuerdoDistribuidor';
import OrdersPanel from '@/components/panels/OrdersPanel';
import StatCard from '@/components/panels/StatCard';
import PointsPanel from '@/components/panels/PointsPanel';
import ProfilePanel from '@/components/panels/ProfilePanel';
import TutorialsPanel from '@/components/panels/TutorialsPanel';
// MIS COTIZACIONES: las que ya generó, para reenviarlas sin rearmarlas — y para ver
// cuáles ya se pagaron (Christián, 2026-08-01). Va pegado al Cotizador porque es su
// otra mitad: uno arma el papel, el otro guarda los que ya salieron.
import MisCotizaciones from '@/components/panels/MisCotizaciones';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api, { formatMXN } from '@/lib/api';
import { useDatosDelCotizador } from '@/lib/cotizador';
import { tieneDifusion } from '@/lib/roles';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// ---------------------------------------------------------------------------
//  El panel del distribuidor = SU único menú (2026-07-30)
// ---------------------------------------------------------------------------
// Antes su información vivía en dos sitios: el negocio aquí y lo suyo propio
// (sus pedidos, sus puntos, su perfil) en /cuenta, más los tutoriales en una
// tercera página. Ahora todo cuelga de este menú, catalogado por temas, y
// /cuenta lo manda para acá. Los bloques compartidos con el cliente son
// literalmente los mismos componentes, para que nunca se separen.
//
// ⚠️ DIFUSIÓN: el apartado de publicidad NO es del canal de distribución. Sólo
// se pinta —y sólo como enlace al Panel de Administración, que es donde vive—
// cuando `tieneDifusion(user)` dice que sí: hoy eso es el admin y María, que lo
// tiene por `extra_roles`. Ningún otro distribuidor lo ve, y el backend le
// contesta 403 aunque escriba la dirección a mano.
const STATUS_COLORS = {
  pendiente: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  confirmado: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  enviado: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-border',
  entregado: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
  cancelado: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-border',
};

// El nombre del cliente, en cualquier lista, abre SU ficha. Un solo botón para las
// tres tablas (Mis Clientes, Ventas y Envíos) para que las tres se comporten igual;
// si el renglón no trae `id` —un pedido viejo sin correo— se pinta como texto y ya.
const NombreDeCliente = ({ id, name, titulo, onOpen, children }) => (
  id ? (
    <button type="button" onClick={() => onOpen(id)} title={titulo} data-testid="dist-open-client"
      className="text-left text-sm font-medium underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
      {name || '—'}{children}
    </button>
  ) : <span className="text-sm">{name || '—'}{children}</span>
);

const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 8,
  fontSize: 12,
  color: 'hsl(var(--foreground))',
};

const Distributor = () => {
  const { user, loading, refreshUser } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [bestSellers, setBestSellers] = useState([]);
  const [clients, setClients] = useState([]);
  // El número de pedido se puede abrir: la ficha la sirve el servidor, que valida que ese
  // pedido sea SUYO (403 si no). Aquí solo se guarda cuál está abierto.
  const [pedidoAbierto, setPedidoAbierto] = useState(null);
  // Y el nombre del cliente abre SU ficha — la misma que ve el admin, recortada por el
  // servidor a lo que a un distribuidor le toca (Christián, 2026-07-30). Antes el nombre
  // era texto muerto en tres listas distintas.
  const [clienteAbierto, setClienteAbierto] = useState(null);
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  // FILTRO DE FECHA DE LA PESTAÑA CLIENTES (Christián, 2026-08-01): «totales de
  // comisión por cliente, con filtro de fecha: semana, 30 días, mes, año, todo».
  // El recorte lo hace el SERVIDOR (los pedidos no viajan a esta pantalla);
  // aquí sólo se guarda cuál botón está prendido y se vuelve a pedir la lista.
  const [periodoClientes, setPeriodoClientes] = useState('todo');
  const [period, setPeriod] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderPeriod, setOrderPeriod] = useState('all');
  const [orderStatus, setOrderStatus] = useState('all');
  // Captura de guía de un pedido SUYO. Es el formulario que se abre; el permiso
  // de tocar ESE pedido lo decide el servidor (403 si no trae su código).
  const [guiaOpen, setGuiaOpen] = useState(null);
  // La solicitud de guía que va en vuelo (por número de pedido): bloquea SU botón.
  const [solicitandoGuia, setSolicitandoGuia] = useState(null);
  const [codes, setCodes] = useState([]);
  const [rotateDays, setRotateDays] = useState(30);
  const [notifUnread, setNotifUnread] = useState(0);
  const [loyalty, setLoyalty] = useState({ eligible: false, balance: 0, ledger: [] });
  // Catálogo y tope de descuento del Cotizador — su propia pestaña en Mi Negocio
  // (Christián, 2026-07-30: antes vivía adentro de "Mis Herramientas", pero es
  // herramienta de VENTA, no de consumo propio).
  const { catalogo: catalogoCotizador, tasaMaxima: tasaMaximaCotizador } = useDatosDelCotizador();
  // Los pedidos que ÉL compró (no los de sus clientes): con ellos la calculadora
  // de "Mis Herramientas" pre-carga sus propios péptidos, y son los que ve en
  // su pestaña "Mis Pedidos".
  const [misPedidos, setMisPedidos] = useState([]);
  // El acuerdo: si hay que firmarlo, qué versión, y cuándo lo firmó. La pantalla
  // se abre SOLA en cuanto el servidor dice que falta firmar; cerrarla no es
  // aceptar (queda el aviso arriba) y vuelve a abrirse en la siguiente visita.
  const { estado: acuerdo, setEstado: setAcuerdo } = useAcuerdo();
  const [acuerdoAbierto, setAcuerdoAbierto] = useState(false);
  useEffect(() => { if (acuerdo?.requiere_aceptacion) setAcuerdoAbierto(true); },
    [acuerdo?.requiere_aceptacion]);
  const [params, setParams] = useSearchParams();
  // Abrir ARRIBA al cambiar de pestaña, venga el cambio de donde venga (sidebar,
  // link interno o URL directa). ScrollToTop no ve cambios que son sólo de query.
  const tabActiva = params.get('tab') || 'overview';
  useLayoutEffect(() => { alTope(); }, [tabActiva]);

  useEffect(() => {
    if (!loading && (!user || !['distributor', 'admin'].includes(user.role))) navigate('/login');
  }, [user, loading, navigate]);

  const loadCodes = useCallback(() => {
    api.get('/distributor/codes').then((r) => { setCodes(r.data.codes || []); setRotateDays(r.data.rotate_days || 30); }).catch(() => {});
  }, []);

  const loadAll = useCallback(() => {
    api.get('/distributor/summary').then((r) => setSummary(r.data)).catch(() => {});
    api.get('/distributor/best-sellers').then((r) => setBestSellers(r.data.ranking || [])).catch(() => {});
    api.get('/distributor/sales').then((r) => setSales(r.data)).catch(() => {});
    api.get('/distributor/orders').then((r) => setOrders(r.data)).catch(() => {});
    api.get('/me/notifications').then((r) => setNotifUnread(r.data.unread || 0)).catch(() => {});
    api.get('/me/points').then((r) => setLoyalty(r.data)).catch(() => {});
    api.get('/orders/me').then((r) => setMisPedidos(r.data)).catch(() => {});
    loadCodes();
  }, [loadCodes]);

  const rotateAll = async () => {
    try { await api.post('/distributor/codes/rotate'); loadCodes(); toast.success(t('distributor.codes.renewed')); }
    catch { toast.error(t('distributor.codes.error')); }
  };
  const copyText = (txt) => { navigator.clipboard?.writeText(txt); toast.success(t('distributor.codes.copied')); };

  useEffect(() => { if (user) loadAll(); }, [user, loadAll]);
  // La lista de clientes va aparte de `loadAll`: cambiar el filtro de fecha sólo
  // vuelve a pedir ESTA lista, no las otras siete llamadas del panel.
  const cargarClientes = useCallback(() => {
    if (!user) return;
    api.get('/distributor/clients', { params: { periodo: periodoClientes } })
      .then((r) => setClients(r.data)).catch(() => {});
  }, [user, periodoClientes]);
  useEffect(cargarClientes, [cargarClientes]);
  // Al VOLVER a la pestaña, el panel se refresca solo (Christián, 2026-08-02):
  // lo que otro borró o cambió mientras tanto ya no se queda pintado.
  useRefrescoAlVolver(() => { if (user) { loadAll(); cargarClientes(); } });

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

  // ---------------------------------------------------------------------
  //  Capturar la guía de un pedido suyo (Christián, 2026-07-30)
  // ---------------------------------------------------------------------
  // Antes sólo el admin podía teclear el número de guía, así que cada paquete
  // que despachaba un distribuidor tenía que pasar por Christián para que el
  // cliente recibiera su rastreo. Aquí sólo van los CAMPOS DE ENVÍO: ni precios,
  // ni pagos, ni estatus. Cotizar y COMPRAR guía (dinero de la casa) se queda
  // en el Panel de Administración.
  //
  // La captura en sí vive en <HojaDeGuia>, compartida con el Panel: aquí sólo se dice
  // CUÁL pedido. La paquetería ya no se pre-elige a mano ('Estafeta' de cajón hacía que
  // media plataforma guardara Estafeta sin mirar): la adivina el número que se pega.
  const abrirGuia = (o) => setGuiaOpen({
    order_number: o.order_number,
    carrier: o.carrier || '',
    tracking_number: o.tracking_number || '',
    tracking_url: o.tracking_url || '',
  });

  // ---------------------------------------------------------------------
  //  Solicitar que LA CASA compre la guía (Christián, 2026-08-03)
  // ---------------------------------------------------------------------
  // «Un botón "solicitar guía" junto al cliente al que le falte número de
  // guía, siempre y cuando ya haya pagado.» Sin pagar, el botón NO existe
  // (nada de botones grises que confundan); con la solicitud en camino se
  // pinta la etiqueta y ya. El candado de verdad vive en el servidor: aquí
  // sólo se pide, y si rebota se enseña su motivo tal cual.
  const solicitarGuia = async (o) => {
    setSolicitandoGuia(o.order_number);
    try {
      await api.post(`/distributor/orders/${o.order_number}/solicitar-guia`);
      toast.success(t('guia.solicitud.enviada'));
      // Se marca en memoria: el fondo de la lista no cambió, sólo esta bandera.
      setOrders((prev) => prev.map((x) => (
        x.order_number === o.order_number ? { ...x, guia_solicitada: true } : x)));
    } catch (e) {
      toast.error(e?.response?.data?.detail || t('guia.solicitud.error'));
    } finally {
      setSolicitandoGuia(null);
    }
  };

  const filteredEarnings = filteredSales.filter((o) => o.status !== 'cancelado').reduce((s, o) => s + (o.commission || 0), 0);

  // Cambiar de pestaña desde una tarjeta. Las cifras del resumen son ACCESOS
  // DIRECTOS (Christián, 2026-07-30): se tocan y llevan a la pestaña donde vive
  // ese dato, en su propio menú.
  const irA = (v) => { setParams(v === 'overview' ? {} : { tab: v }, { replace: true }); alTope(); };

  const STAT_CARDS = summary ? [
    // Sus ganancias y sus ventas son la misma tabla vista por dos columnas:
    // las dos abren "Mis Ventas", que es donde está el detalle con comisión.
    { i: DollarSign, t: t('distributor.stats.earnings'), v: formatMXN(summary.earnings_total),
      id: 'dist-stat-ganancias', go: () => irA('sales') },
    { i: TrendingUp, t: t('distributor.stats.sales'), v: formatMXN(summary.sales_total),
      id: 'dist-stat-ventas', go: () => irA('sales') },
    // "Pedidos" abre "Pedidos Y Envíos": es la misma venta, pero mirándola por
    // dónde va la caja, que es lo que uno quiere al tocar ese número.
    { i: ShoppingBag, t: t('distributor.stats.orders'), v: summary.sales_count,
      id: 'dist-stat-pedidos', go: () => irA('envios') },
    { i: Users, t: t('distributor.stats.clients'), v: summary.clients_count,
      id: 'dist-stat-clientes', go: () => irA('clients') },
  ] : [];

  // Barra de nivel: dos metas (ventas + reclutas activos).
  const level = summary?.level;
  const tierName = (tk) => t(`distributor.level.tier.${tk}`);
  const ProgressBar = ({ pct }) => (
    <div className="h-2.5 w-full rounded-full bg-[hsl(var(--muted))] overflow-hidden">
      <div className="h-full rounded-full bg-[hsl(var(--primary))] transition-all" style={{ width: `${Math.round((pct || 0) * 100)}%` }} />
    </div>
  );

  // El menú, catalogado por lo que uno viene a hacer: primero lo del día a día,
  // luego su negocio, luego sus propias compras, luego lo que consulta, y al
  // final su cuenta. Difusión sólo existe para quien la lleva.
  const menu = [
    { value: 'overview', icon: TrendingUp, label: t('distributor.overviewTab') },
    { value: 'news', icon: Bell, label: t('news.tab') + (notifUnread ? ` (${notifUnread})` : '') },
    { grupo: t('dash.group.business') },
    { value: 'codes', icon: Ticket, label: t('distributor.codesTab') },
    { value: 'clients', icon: Users, label: t('distributor.clientsTab') },
    // El Cotizador es herramienta de VENTA (Christián, 2026-07-30): arma el
    // presupuesto que le manda a SU cliente. Antes vivía adentro de "Mis
    // Herramientas"; aquí tiene más lógica, junto a Clientes y Ventas.
    { value: 'cotizador', icon: Calculator, label: t('distributor.cotizadorTab') },
    // Las cotizaciones YA GENERADAS. Christián: «que no las tenga que volver a
    // generar de cero», y «una vez pagadas dejan de ser cotizaciones y se
    // transforman en ventas».
    { value: 'cotizaciones', icon: FileText, label: t('cotizaciones.tab') },
    // El Asesor de Negocio va junto al Cotizador porque es su hermano: uno arma
    // el papel, el otro contesta la pregunta de antes de armarlo. ⛔ Lo que el
    // asesor sabe lo decide el SERVIDOR según el rol del token: aquí no hay nada
    // que ocultar ni que enseñar (ver ChatNegocio.js y chat_negocio.py).
    { value: 'asesor', icon: Sparkles, label: t('negocio.chat.tab') },
    // El Cotizador de Envíos, junto a los otros dos: la pregunta «¿cuánto sale
    // mandarlo a Mérida?» llega en la misma conversación en la que se arma el
    // presupuesto, y hasta hoy sólo se podía contestar armando un carrito.
    { value: 'cotizador-envio', icon: Truck, label: t('cotizadorEnvio.title') },
    { value: 'sales', icon: ShoppingBag, label: t('distributor.salesTab') },
    { value: 'envios', icon: Truck, label: t('distributor.ordersTab') },
    { grupo: t('dash.group.purchases') },
    { value: 'orders', icon: Package, label: t('account.ordersTab') },
    ...(loyalty.eligible ? [{ value: 'points', icon: Coins, label: t('account.pointsTab') }] : []),
    { grupo: t('dash.group.resources') },
    // Mismas herramientas que en Mi cuenta (calculadora completa, seguimiento y
    // cuestionario de hábitos): el distribuidor las tiene aquí sin salir de su
    // tablero. Es el mismo componente, no una copia.
    { value: 'tools', icon: Syringe, label: t('account.toolsTab') },
    // OCULTO por orden de Christián (2026-07-30) hasta nuevo aviso — no borrar:
    // { value: 'coas', icon: FileText, label: t('account.coasTab') },
    { value: 'fichas', icon: BookOpen, label: t('account.fichasTab') },
    { value: 'labs', icon: FlaskConical, label: t('account.labsTab') },
    { value: 'tutoriales', icon: GraduationCap, label: t('header.tutorials') },
    { grupo: t('dash.group.account') },
    { value: 'profile', icon: User, label: t('account.profileTab') },
    // ⚠️ SÓLO quien lleva la difusión (hoy: el admin y María). Es un enlace al
    // Panel de Administración, no una pestaña de este tablero.
    ...(tieneDifusion(user) ? [
      { grupo: t('header.difusion') },
      { value: 'difusion', icon: Megaphone, label: t('dash.difusionLink'), to: '/admin' },
    ] : []),
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2"><Store className="h-6 w-6 text-[hsl(var(--primary))]" /> {t('distributor.title')}</h1>
          <p className="text-muted-foreground text-sm">{t('distributor.subtitle', { name: user.name })}</p>
        </div>
        {summary && (
          /* El código también lleva a sus datos: tocarlo abre "Mis Códigos". El
             botón de copiar sigue aparte —como una fila de iOS: el renglón navega,
             el botón de la orilla hace lo suyo— y NUNCA anidado dentro del otro
             botón, que sería HTML inválido y rompe el teclado. */
          <Card className="p-3 flex items-center gap-3">
            <button type="button" onClick={() => irA('codes')} data-testid="dist-stat-codigo"
              aria-label={`${t('distributor.yourCode')}: ${summary.distributor_code || '—'} — ${t('dash.card.open')}`}
              className="group -m-1.5 p-1.5 rounded-lg text-left cursor-pointer transition duration-200 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-[hsl(var(--muted))]/60 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]">
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                {t('distributor.yourCode')}
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 opacity-40 transition duration-200 motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:opacity-70" />
              </div>
              <div className="font-mono-tech font-bold text-lg tracking-wide">{summary.distributor_code || '—'}</div>
            </button>
            <Button variant="outline" size="icon" onClick={copyCode} title={t('distributor.copy')}><Copy className="h-4 w-4" /></Button>
          </Card>
        )}
      </div>

      {/* ⛔ El aviso del acuerdo, arriba de TODO el panel y en todas las pestañas:
          es lo primero que se lee y no se va hasta que firma. Apagado no existe. */}
      <AvisoDeAcuerdoPendiente estado={acuerdo} onAbrir={() => setAcuerdoAbierto(true)} />

      <Tabs value={tabActiva} onValueChange={(v) => setParams(v === 'overview' ? {} : { tab: v }, { replace: true })}
        className="lg:flex lg:gap-8 lg:items-start">
        <DashboardSidebar activeTab={tabActiva} items={menu} />
        {/* ALINEADO CON EL MENÚ (Christián, 2026-08-01): «alinea el borde superior
            de la calculadora con el borde superior del left sidebar».
            Cada pestaña trae `mt-5`, que en TELÉFONO sí hace falta —ahí el menú es
            una barra horizontal y el contenido va debajo—, pero en ESCRITORIO el
            menú está al lado, así que esos 20 px dejaban la primera tarjeta caída
            respecto al panel de la izquierda. Se anula aquí, en el contenedor, y no
            pestaña por pestaña: son catorce y la siguiente que alguien agregue
            volvería a nacer desalineada. */}
        <div className="min-w-0 flex-1 lg:[&>[role=tabpanel]]:mt-0">

        {/* Los números, el nivel y la nota de comisión son el RESUMEN: viven en
            su pestaña y no encima de todas las demás. Antes se repetían aunque
            estuvieras editando tu dirección. */}
        <TabsContent value="overview" className="mt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {STAT_CARDS.map((s) => (
              <StatCard key={s.id} icon={s.i} label={s.t} value={s.v} onClick={s.go} testid={s.id} />
            ))}
          </div>

          {level && (
            <Card className="p-5 mb-4" data-testid="distributor-level-card">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Award className="h-5 w-5 text-[hsl(var(--primary))]" />
                <span className="text-xs text-muted-foreground">{t('distributor.level.title')}</span>
                <Badge className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-xs px-2.5 py-0.5">{tierName(level.current)}</Badge>
                <span className="text-xs text-muted-foreground">{t('distributor.level.rate', { rate: Math.round((summary.commission_rate || 0) * 100) })}</span>
              </div>

              {level.kind === 'top' ? (
                <p className="text-sm">{t('distributor.level.top', { tier: tierName(level.current), rate: Math.round((level.rate || 0) * 100) })}</p>
              ) : (
                <>
                  <p className="text-sm font-medium mb-3">{t('distributor.level.toNextTitle', { next: tierName(level.next) })}</p>
                  {/* Meta 1: ventas */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{t('distributor.level.salesLabel', { basis: t(level.sales.basis === 'team' ? 'distributor.level.basisTeam' : 'distributor.level.basisPersonal') })}</span>
                      <span className="font-mono-tech text-muted-foreground">{t('distributor.level.progressOf', { current: formatMXN(level.sales.value), target: formatMXN(level.sales.target) })}</span>
                    </div>
                    <ProgressBar pct={level.sales.progress} />
                  </div>
                  {/* Meta 2: reclutas activos */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{t('distributor.level.recruitsLabel')}</span>
                      <span className="font-mono-tech text-muted-foreground">{t('distributor.level.progressOf', { current: level.recruits.value, target: level.recruits.target })}</span>
                    </div>
                    <ProgressBar pct={level.recruits.progress} />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {level.qualifies ? t('distributor.level.qualifies') : t('distributor.level.approve')}
                    {level.manual && <> · {t('distributor.level.manual')}</>}
                  </p>
                </>
              )}

              {(summary.override_earnings > 0 || summary.own_earnings > 0) && (
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 pt-3 border-t border-[hsl(var(--border))] text-sm">
                  <span className="text-muted-foreground">{t('distributor.level.ownEarnings')}: <span className="font-semibold text-foreground">{formatMXN(summary.own_earnings)}</span></span>
                  <span className="text-muted-foreground">{t('distributor.level.overrideEarnings')}: <span className="font-semibold text-foreground">{formatMXN(summary.override_earnings)}</span></span>
                </div>
              )}
            </Card>
          )}

          {summary && (
            <Card className="p-4 mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Percent className="h-4 w-4 text-[hsl(var(--primary))]" />
              {t('distributor.commissionNote', { rate: Math.round((summary.commission_rate || 0) * 100) })}{summary.customer_discount_rate > 0 && <> · {t('distributor.customerDiscountNote', { rate: Math.round(summary.customer_discount_rate * 100) })}</>}
            </Card>
          )}

          {!summary || summary.monthly.length === 0 ? (
            <Card className="p-10 text-center text-muted-foreground">{t('distributor.noData')}</Card>
          ) : (
            <Card className="p-5">
              <h3 className="font-heading font-semibold mb-4">{t('distributor.earningsByMonth')}</h3>
              <GraficaInteractiva height={280}>
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
              </GraficaInteractiva>
            </Card>
          )}

          {bestSellers.length > 0 && (
            <Card className="p-5 mt-4" data-testid="distributor-best-sellers">
              <h3 className="font-heading font-semibold mb-1 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('distributor.bestSellers')}
              </h3>
              <p className="text-xs text-muted-foreground mb-4">{t('distributor.bestSellersSub')}</p>
              <div className="space-y-2">
                {bestSellers.map((p, i) => {
                  const max = bestSellers[0].units || 1;
                  return (
                    <div key={p.name} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-5 shrink-0">{i + 1}.</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2 text-sm">
                          <span className="truncate">{p.name}</span>
                          <span className="text-muted-foreground whitespace-nowrap">{t('common.items', { count: p.units })}</span>
                        </div>
                        <div className="h-1.5 mt-1 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                          <div className="h-full rounded-full bg-[hsl(var(--primary))]" style={{ width: `${Math.round((p.units / max) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="news" className="mt-5">
          <h3 className="font-heading font-semibold mb-4">{t('news.tab')}</h3>
          <NotificationsFeed onSeen={() => setNotifUnread(0)} />
        </TabsContent>

        <TabsContent value="codes" className="mt-5 space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-heading font-semibold">{t('distributor.codes.title')}</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{t('distributor.codes.autoHint', { days: rotateDays })}</p>
            </div>
            <Button variant="outline" size="sm" onClick={rotateAll} data-testid="distributor-rotate-codes"><RefreshCw className="h-4 w-4 mr-1.5" /> {t('distributor.codes.rotateNow')}</Button>
          </div>
          <Card className="overflow-x-auto">
            <Table data-testid="distributor-codes-table">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('distributor.codes.discount')}</TableHead>
                  <TableHead>{t('distributor.codes.code')}</TableHead>
                  <TableHead className="text-right">{t('distributor.codes.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">{t('distributor.codes.none')}</TableCell></TableRow>
                ) : codes.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell><span className="font-heading text-lg font-bold text-[hsl(var(--primary))]">{Math.round(c.discount_rate * 100)}%</span> <span className="text-xs text-muted-foreground">{t('distributor.codes.off')}</span></TableCell>
                    <TableCell>
                      <button type="button" onClick={() => copyText(c.code)} className="font-mono-tech font-medium hover:text-[hsl(var(--primary))] transition inline-flex items-center gap-1.5">
                        {c.code} <Copy className="h-3.5 w-3.5" />
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => copyText(c.code)}><Copy className="h-4 w-4 mr-1.5" /> {t('distributor.codes.copy')}</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="mt-5">
          <h3 className="font-heading font-semibold mb-2">{t('distributor.clientsCount', { count: clients.length })}</h3>
          {/* EL FILTRO DE FECHA (Christián, 2026-08-01). Recorta lo que se SUMA
              (pedidos, gastado, comisión), no la lista: un cliente sin compras en
              el periodo sigue ahí, con ceros. El corte lo hace el servidor. */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3" data-testid="dist-clientes-periodos">
            {['semana', '30dias', 'mes', 'ano', 'todo'].map((p) => (
              <Button key={p} type="button" size="sm"
                variant={periodoClientes === p ? 'default' : 'outline'}
                className="h-8 px-3"
                onClick={() => setPeriodoClientes(p)}
                data-testid={`dist-clientes-periodo-${p}`}>
                {t(`distributor.periodo.${p}`)}
              </Button>
            ))}
            {/* El total del periodo, a la vista: la suma de la columna de comisión. */}
            <span className="ml-auto text-sm text-muted-foreground" data-testid="dist-clientes-comision-total">
              {t('distributor.comisionPeriodo')}{' '}
              <span className="font-semibold text-[hsl(var(--primary))] tabular-nums">
                {formatMXN(clients.reduce((s, c) => s + (c.my_earnings || 0), 0))}
              </span>
            </span>
          </div>
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
                    <TableCell>
                      <NombreDeCliente id={c.id} name={c.name} titulo={t('ficha.open')}
                        onOpen={setClienteAbierto} />
                      {/* Compró con SU código pero sin cuenta. Sigue siendo su cliente
                          (Christián, 2026-07-30): la comisión ya se le pagó. Se marca para
                          que sepa que a esa persona hay que contactarla por fuera. */}
                      {c.guest && (
                        <Badge variant="outline" className="mt-1 text-[10px]" data-testid="dist-client-guest">
                          {t('distributor.client.guest')}
                        </Badge>
                      )}
                    </TableCell>
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

        {/* Cotizador: su herramienta de venta, en Mi Negocio junto a Clientes y
            Ventas — no en "Mis Herramientas", que es para su propio consumo.
            El componente no cambió, sólo se re-monta aquí (Christián, 2026-07-30). */}
        <TabsContent value="cotizador" className="mt-5">
          {/* `nombreDistribuidor` va a la HOJA que ella imprime y comparte, para que
              su cliente sepa con quién trata (Christián, 2026-08-01). ⛔ NO viaja al
              correo que manda el servidor: ahí sigue firmando la atención de la casa. */}
          <CotizadorDistribuidor catalogo={catalogoCotizador} tasaMaxima={tasaMaximaCotizador}
            codigo={summary?.distributor_code || user.distributor_code || ''}
            nombreDistribuidor={user.name || ''} />
        </TabsContent>

        {/* MIS COTIZACIONES. ⛔ Sólo las SUYAS: el servidor filtra por el id del
            token, no por ningún parámetro que se pueda escribir a mano. Y el código
            del obsequio no llega ni aquí — si ella lo viera, se lo podría pasar al
            cliente, que es justo lo que no puede pasar. */}
        <TabsContent value="cotizaciones" className="mt-5">
          <MisCotizaciones />
        </TabsContent>

        {/* El Asesor de Negocio. El componente es el MISMO que ve el admin; lo
            que cambia —qué datos entran a la conversación— lo decide el servidor
            con el token, no este archivo. */}
        <TabsContent value="asesor" className="mt-5">
          <ChatNegocio />
        </TabsContent>

        {/* Cotizador de Envíos. ⛔ Lo que este panel recibe NO trae lo que la casa
            paga de guía: el servidor recorta la respuesta antes de mandarla (ver
            `_solo_lo_del_distribuidor` y `test_cotizador_envios.py`). Aquí no hay
            nada que esconder porque no llega. */}
        <TabsContent value="cotizador-envio" className="mt-5">
          <CotizadorDeEnvios rol="distributor" />
        </TabsContent>

        <TabsContent value="sales" className="mt-5 space-y-4">
          {/* La bolsa de comisiones ARRIBA de las ventas: es el dinero que esas
              ventas le dejan, y aquí vive el botón de solicitar su pago. */}
          <ComisionesDistribuidor />
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
                  <TableHead>{t('distributor.table.shipping')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">{t('distributor.noSales')}</TableCell></TableRow>
                ) : filteredSales.map((o) => (
                  <TableRow key={o.order_number}>
                    <TableCell>
                      <button type="button" onClick={() => setPedidoAbierto(o.order_number)}
                        data-testid="dist-open-order"
                        className="font-mono-tech text-xs underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
                        {o.order_number}
                      </button>
                    </TableCell>
                    <TableCell>
                      <NombreDeCliente id={o.client_id} name={o.customer_name} titulo={t('ficha.open')}
                        onOpen={setClienteAbierto} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{fmtDate(o.created_at)}</TableCell>
                    <TableCell>{formatMXN(o.total)}</TableCell>
                    <TableCell className="font-medium text-[hsl(var(--primary))]">{formatMXN(o.commission)}</TableCell>
                    <TableCell><Badge className={`${STATUS_COLORS[o.status]} text-[10px]`}>{t(`status.${o.status}`)}</Badge></TableCell>
                    {/* La guía también desde Ventas: es la lista que más mira, y hasta
                        hoy había que cambiarse a Envíos sólo para teclear el número. */}
                    <TableCell>
                      <Button variant={o.tracking_number ? 'ghost' : 'outline'} size="sm" className="h-8 text-xs"
                        onClick={() => abrirGuia(o)} data-testid="dist-shipping-open">
                        <Truck className="h-3.5 w-3.5 mr-1.5" />
                        {o.tracking_number ? t('guia.edit') : t('guia.add')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Pedidos de SUS CLIENTES. Se llama `envios` desde el 2026-07-30 porque
            `orders` pasó a ser lo mismo que en Mi cuenta —los pedidos que él
            compró— y así una misma dirección significa lo mismo en los dos
            tableros. */}
        <TabsContent value="envios" className="mt-5 space-y-4">
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
                  <TableHead>{t('admin.table.status')}</TableHead>
                  <TableHead>{t('distributor.table.shipping')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">{t('distributor.noOrders')}</TableCell></TableRow>
                ) : filteredOrders.map((o) => (
                  <TableRow key={o.order_number}>
                    <TableCell>
                      <button type="button" onClick={() => setPedidoAbierto(o.order_number)}
                        data-testid="dist-open-order"
                        className="font-mono-tech text-xs underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
                        {o.order_number}
                      </button>
                      <div className="text-[11px] text-muted-foreground">{fmtDate(o.created_at)} · {formatMXN(o.total)}</div>
                    </TableCell>
                    <TableCell>
                      <NombreDeCliente id={o.client_id} name={o.customer_name} titulo={t('ficha.open')}
                        onOpen={setClienteAbierto} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{t('common.items', { count: o.items_count || 0 })}</TableCell>
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
                      {/* ⛔ IMPRIMIR LA GUÍA, AQUÍ MISMO (Christián, 2026-08-05: «bien
                          visible y fácil de encontrar en los paneles de admin y
                          distribuidor con cada pedido de cada cliente»). En el panel del
                          distribuidor NO EXISTÍA: sólo estaba dentro de la ficha, y ahí
                          escondido tras una condición que fallaba con las guías tecleadas
                          a mano — o sea, casi siempre. El candado sigue en el servidor:
                          `/distributor/...` sólo sirve etiquetas de SUS pedidos. */}
                      {o.tracking_number && (
                        <div className="mt-2 flex flex-col items-start gap-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                            (o.etapa_envio || 'guia_generada') === 'guia_generada'
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                              : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'}`}
                            data-testid="dist-etapa-envio">
                            {t(`envio.etapa.${o.etapa_envio || 'guia_generada'}`)}
                          </span>
                          <BotonImprimirGuia testid="dist-list-label"
                            ruta={`/distributor/orders/${o.order_number}/etiqueta`} />
                        </div>
                      )}
                      {/* Él despachó el paquete: que capture él la guía. Un pedido
                          cancelado ya no se manda a ningún lado. */}
                      {o.status !== 'cancelado' && (
                        <Button variant="outline" size="sm" data-testid="dist-shipping-open"
                          className="mt-2 h-7 px-2 text-[11px] whitespace-nowrap"
                          onClick={() => abrirGuia(o)}>
                          <Truck className="h-3 w-3 mr-1" />
                          {o.tracking_number ? t('guia.edit') : t('guia.add')}
                        </Button>
                      )}
                      {/* SOLICITAR GUÍA a la casa: sólo pedidos PAGADOS y sin
                          número. Con la solicitud en camino, etiqueta y ya. */}
                      {!o.tracking_number && o.status !== 'cancelado' && (
                        o.guia_solicitada ? (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-[10px]" data-testid="dist-guia-solicitada">
                              {t('guia.solicitud.etiqueta')}
                            </Badge>
                          </div>
                        ) : o.paid ? (
                          <div className="mt-1.5">
                            <Button variant="outline" size="sm" data-testid="dist-solicitar-guia"
                              className="h-7 px-2 text-[11px] whitespace-nowrap"
                              disabled={solicitandoGuia === o.order_number}
                              onClick={() => solicitarGuia(o)}>
                              {solicitandoGuia === o.order_number
                                ? <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                : <Truck className="h-3 w-3 mr-1" />}
                              {t('guia.solicitud.boton')}
                            </Button>
                          </div>
                        ) : null
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Lo suyo propio: el mismo bloque que ve el cliente en Mi cuenta. */}
        <TabsContent value="orders" className="mt-5">
          <OrdersPanel orders={misPedidos} />
        </TabsContent>

        <TabsContent value="points" className="mt-5">
          <PointsPanel loyalty={loyalty} />
        </TabsContent>

        <TabsContent value="tools" className="mt-5 space-y-8">
          <ToolsPanel unlocked={herramientasDesbloqueadas(user, misPedidos)} orders={misPedidos} />
        </TabsContent>

        {/* Certificados: la entrada del menú está OCULTA por orden de Christián
            (2026-07-30), pero la pestaña sigue viva y accesible por URL para
            poder devolverla en cuanto avise. No borrar. */}
        <TabsContent value="coas" className="mt-5">
          <CoaLibrary />
        </TabsContent>

        <TabsContent value="fichas" className="mt-5">
          <FichaLibrary catalogoCompleto />
        </TabsContent>

        <TabsContent value="labs" className="mt-5">
          <LabReports />
        </TabsContent>

        <TabsContent value="tutoriales" className="mt-5">
          <TutorialsPanel />
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          {/* Su copia del acuerdo vive en Perfil: es su papel, va con sus datos.
              Apagado no se pinta (AcuerdoEnPerfil mira `estado.aplica`). */}
          <AcuerdoEnPerfil estado={acuerdo} />
          <div className={acuerdo?.aplica ? 'mt-4' : ''}>
            <ProfilePanel user={user} onUserChange={refreshUser} />
          </div>
        </TabsContent>
        </div>
      </Tabs>
      {/* ⛔ LA PANTALLA DEL ACUERDO. Va al final y por encima de todo: el panel
          queda cargado por debajo, así que al aceptar desaparece sin recargar.
          Con el interruptor APAGADO `requiere_aceptacion` es false y no pinta
          absolutamente nada — hoy este componente devuelve null siempre. */}
      <PantallaDeAcuerdo estado={acuerdo} abierta={acuerdoAbierto}
        onCerrar={() => setAcuerdoAbierto(false)}
        onAceptado={(nuevo) => { setAcuerdo(nuevo); setAcuerdoAbierto(false); loadAll(); }} />
      <FichaPedido orderNumber={pedidoAbierto} open={!!pedidoAbierto}
        onClose={() => setPedidoAbierto(null)} />
      <FichaCliente clientId={clienteAbierto} open={!!clienteAbierto}
        onClose={() => setClienteAbierto(null)} />

      {/* LA HOJA DE LA GUÍA — la misma que usan el Panel, la ficha del cliente y la
          ficha del pedido. SOLO envío: aquí no hay precios, ni pagos, ni estatus, ni
          compra de guías (eso es dinero de la casa y vive en el Panel). El servidor
          vuelve a revisar que el pedido sea suyo: si no, contesta 403. */}
      <HojaDeGuia pedido={guiaOpen} open={!!guiaOpen}
        onClose={() => setGuiaOpen(null)} onGuardada={loadAll} />
    </div>
  );
};

export default Distributor;
