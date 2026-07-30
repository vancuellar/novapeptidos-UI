import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Package, User, ShoppingBag, DollarSign, Syringe, Lock, FlaskConical, BookOpen, Coins, Bell, GraduationCap } from 'lucide-react';
import ToolsPanel, { herramientasDesbloqueadas } from '@/components/ToolsPanel';
import LabReports from '@/components/LabReports';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardSidebar, { alTope } from '@/components/layout/DashboardSidebar';
import CoaLibrary from '@/components/CoaLibrary';
import FichaLibrary from '@/components/FichaLibrary';
import NotificationsFeed from '@/components/NotificationsFeed';
import OrdersPanel from '@/components/panels/OrdersPanel';
import PointsPanel from '@/components/panels/PointsPanel';
import ProfilePanel from '@/components/panels/ProfilePanel';
import TutorialsPanel from '@/components/panels/TutorialsPanel';
import api, { formatMXN } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// ---------------------------------------------------------------------------
//  Mi cuenta = EL menú del cliente (2026-07-30)
// ---------------------------------------------------------------------------
// Antes la información del cliente estaba regada: pedidos aquí, tutoriales en
// una página suelta, los puntos escondidos dentro de una ventanita. Ahora todo
// cuelga de UN solo menú, catalogado por temas. Lo que cambia de sitio no se
// borra: cada bloque se mudó a un componente compartido (OrdersPanel,
// PointsPanel, ProfilePanel, TutorialsPanel) que también usa el distribuidor.
//
// El apartado de Difusión NO aparece aquí ni puede aparecer: vive en el Panel
// de Administración y sólo entra quien tiene ese permiso (María).
const Account = () => {
  const { user, loading, refreshUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [notifUnread, setNotifUnread] = useState(0);
  const [loyalty, setLoyalty] = useState({ eligible: false, balance: 0, ledger: [] });
  const [params, setParams] = useSearchParams();
  // Abrir ARRIBA al cambiar de pestaña, venga el cambio de donde venga (sidebar,
  // link interno o URL directa). ScrollToTop no ve cambios que son sólo de query.
  const tabActiva = params.get('tab') || 'orders';
  useLayoutEffect(() => { alTope(); }, [tabActiva]);

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate('/login'); return; }
    // Un menú por rol: el distribuidor tiene el suyo, con TODO esto adentro
    // (sus pedidos, sus puntos, su perfil). Si se quedara aquí volvería a
    // haber dos tableros para la misma persona, que es justo lo que se quitó.
    if (user.role === 'distributor') {
      const tab = params.get('tab');
      navigate(tab ? `/distribuidor?tab=${tab}` : '/distribuidor', { replace: true });
    }
  }, [user, loading, navigate, params]);

  useEffect(() => {
    if (user) {
      api.get('/orders/me').then((r) => setOrders(r.data)).catch(() => {});
      api.get('/me/points').then((r) => setLoyalty(r.data)).catch(() => {});
      api.get('/me/notifications').then((r) => setNotifUnread(r.data.unread || 0)).catch(() => {});
    }
  }, [user]);

  if (!user || user.role === 'distributor') return null;

  const validOrders = orders.filter((o) => o.status !== 'cancelado');
  const totalSpent = validOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Las herramientas (calculadora completa, seguimiento, hábitos) y las
  // bibliotecas se desbloquean con la primera compra pagada; admin y
  // distribuidores entran sin comprar. La regla vive en ToolsPanel porque el
  // mismo bloque se muestra también en el tablero de distribuidor.
  const toolsUnlocked = herramientasDesbloqueadas(user, orders);

  // El menú, catalogado. Antes de la primera compra pagada se muestra recortado:
  // sólo lo que sí puede usar (pedidos —necesarios para pagar o subir el
  // comprobante SPEI—, avisos, tutoriales y su perfil). El resto aparece solo
  // cuando se confirma su primer pago.
  const menu = [
    { value: 'orders', icon: Package, label: t('account.ordersTab') },
    { value: 'news', icon: Bell, label: t('news.tab') + (notifUnread ? ` (${notifUnread})` : '') },
    ...(loyalty.eligible ? [{ value: 'points', icon: Coins, label: t('account.pointsTab') }] : []),
    { grupo: t('dash.group.resources') },
    ...(toolsUnlocked ? [
      { value: 'tools', icon: Syringe, label: t('account.toolsTab') },
      // OCULTO por orden de Christián (2026-07-30) hasta nuevo aviso — no borrar:
      // { value: 'coas', icon: FileText, label: t('account.coasTab') },
      { value: 'fichas', icon: BookOpen, label: t('account.fichasTab') },
      { value: 'labs', icon: FlaskConical, label: t('account.labsTab') },
    ] : []),
    { value: 'tutoriales', icon: GraduationCap, label: t('header.tutorials') },
    { grupo: t('dash.group.account') },
    { value: 'profile', icon: User, label: t('account.profileTab') },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{t('account.title')}</h1>
        <p className="text-muted-foreground text-sm">{user.name} · {user.email}</p>
      </div>

      <Tabs value={tabActiva} onValueChange={(v) => setParams(v === 'orders' ? {} : { tab: v }, { replace: true })}
        className="lg:flex lg:gap-8 lg:items-start">
        <DashboardSidebar activeTab={tabActiva} items={menu} />
        <div className="min-w-0 flex-1">

      <div className={`grid grid-cols-2 ${loyalty.eligible ? 'sm:grid-cols-3' : ''} gap-3 mb-6`}>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs"><ShoppingBag className="h-4 w-4" /> {t('account.stats.orders')}</div>
          <div className="font-heading text-xl font-bold mt-1">{orders.length}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs"><DollarSign className="h-4 w-4" /> {t('account.stats.spent')}</div>
          <div className="font-heading text-xl font-bold mt-1">{formatMXN(totalSpent)}</div>
        </Card>
        {/* La tarjeta ya no abre una ventanita con el historial: lleva a la
            pestaña "Mis Puntos", que es donde vive ahora — un solo lugar. */}
        {loyalty.eligible && (
          <Card onClick={() => setParams({ tab: 'points' }, { replace: true })}
            className="p-4 col-span-2 sm:col-span-1 cursor-pointer hover:border-[hsl(var(--primary))]/40 transition-colors" data-testid="account-points-card">
            <div className="flex items-center gap-2 text-muted-foreground text-xs"><Coins className="h-4 w-4" /> {t('loyalty.title')}</div>
            <div className="font-heading text-xl font-bold mt-1">{loyalty.balance}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{t('loyalty.cardNote')}</div>
          </Card>
        )}
      </div>

        <TabsContent value="orders" className="mt-5">
          <OrdersPanel orders={orders} />
        </TabsContent>

        <TabsContent value="news" className="mt-5">
          <h3 className="font-heading font-semibold mb-4">{t('news.tab')}</h3>
          <NotificationsFeed onSeen={() => setNotifUnread(0)} />
        </TabsContent>

        <TabsContent value="points" className="mt-5">
          <PointsPanel loyalty={loyalty} />
        </TabsContent>

        <TabsContent value="tools" className="mt-5 space-y-8">
          <ToolsPanel unlocked={toolsUnlocked} orders={orders} />
        </TabsContent>

        {/* Certificados: la entrada del menú está OCULTA por orden de Christián
            (2026-07-30), pero la pestaña sigue viva y accesible por URL para
            poder devolverla en cuanto avise. No borrar. */}
        <TabsContent value="coas" className="mt-5">
          <CoaLibrary locked={!toolsUnlocked} />
        </TabsContent>

        <TabsContent value="fichas" className="mt-5">
          <FichaLibrary locked={!toolsUnlocked} />
        </TabsContent>

        <TabsContent value="labs" className="mt-5">
          {!toolsUnlocked ? (
            <Card className="p-10 text-center" data-testid="labs-locked">
              <Lock className="h-8 w-8 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-heading font-semibold text-lg mb-2">{t('account.tools.lockedTitle')}</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {orders.length === 0 ? t('account.tools.lockedNoOrders') : t('account.tools.lockedPending')}
              </p>
            </Card>
          ) : <LabReports />}
        </TabsContent>

        <TabsContent value="tutoriales" className="mt-5">
          <TutorialsPanel />
        </TabsContent>

        <TabsContent value="profile" className="mt-5">
          <ProfilePanel user={user} onUserChange={refreshUser} />
        </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Account;
