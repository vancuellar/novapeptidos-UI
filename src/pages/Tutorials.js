import React from 'react';
import { GraduationCap, Store, User, PlayCircle, TrendingUp, Bell, Ticket, Users, Truck, ShoppingBag, FileText, Calculator, Coins, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

const BASE = process.env.PUBLIC_URL || '';

const VIDEOS = [
  {
    src: `${BASE}/videos/tutorial-1-panel-distribuidor.mp4`,
    title: 'Tu panel de distribuidor: resumen y cómo subir de nivel',
    duration: '1:02',
    audience: 'Distribuidores', role: 'dist',
  },
  {
    src: `${BASE}/videos/tutorial-2-mis-codigos.mp4`,
    title: 'Tus códigos de referido',
    duration: '0:40',
    audience: 'Distribuidores', role: 'dist',
  },
  {
    src: `${BASE}/videos/tutorial-3-mis-clientes.mp4`,
    title: 'Tus clientes y tu red',
    duration: '0:30',
    audience: 'Distribuidores', role: 'dist',
  },
  {
    src: `${BASE}/videos/tutorial-4-pedidos-y-ventas.mp4`,
    title: 'Pedidos, envíos y tus ventas',
    duration: '0:35',
    audience: 'Distribuidores', role: 'dist',
  },
  {
    src: `${BASE}/videos/tutorial-5-novedades.mp4`,
    title: 'Novedades: tu centro de avisos',
    duration: '0:30',
    audience: 'Distribuidores', role: 'dist',
  },
  {
    src: `${BASE}/videos/tutorial-6-comprar-con-codigo.mp4`,
    title: 'Comprar con código de referido',
    duration: '0:33',
    audience: 'Clientes', role: 'client',
  },
  {
    src: `${BASE}/videos/tutorial-7-cuenta-pedidos-puntos.mp4`,
    title: 'Tu cuenta: pedidos y puntos de lealtad',
    duration: '0:39',
    audience: 'Clientes', role: 'client',
  },
  {
    src: `${BASE}/videos/tutorial-8-herramientas.mp4`,
    title: 'Herramientas: calculadora, certificados y más',
    duration: '0:37',
    audience: 'Clientes', role: 'client',
  },
  {
    src: `${BASE}/videos/tutorial-9-calculadora.mp4`,
    title: 'La calculadora de reconstitución, paso a paso',
    duration: '0:50',
    audience: 'Clientes', role: 'client',
  },
  {
    src: `${BASE}/videos/tutorial-10-reconstitucion.mp4`,
    title: 'Cómo reconstituir tu vial con agua bacteriostática',
    duration: '1:06',
    audience: 'Todos', role: 'client',
  },
];

// Guía escrita del panel de distribuidor
const DIST_GUIDE = [
  {
    icon: TrendingUp,
    title: 'Resumen',
    body: [
      'Es la primera pantalla de tu panel. Arriba ves tus cuatro números clave: Mis ganancias (lo que has ganado en comisiones), Ventas (el total vendido con tus códigos), Pedidos y Clientes.',
      'En la tarjeta "Tu nivel" ves tu nivel actual y tu comisión. Para subir al siguiente nivel necesitas cumplir dos metas al mismo tiempo: la meta de ventas de tu equipo y la meta de reclutas activos en tu red. Las dos barras te muestran exactamente cuánto te falta. Cuando cumples ambas, Exygen aprueba tu ascenso.',
      'Más abajo, la gráfica "Ganancias por mes" muestra cómo ha evolucionado tu negocio mes a mes.',
    ],
  },
  {
    icon: Bell,
    title: 'Novedades',
    body: [
      'Tu centro de avisos. Aquí llegan notificaciones automáticas cuando: un pedido tuyo o de tus clientes se entrega, recibes un pago, un producto está por agotarse, se registra una venta nueva con tu código, o subes de nivel.',
      'También aparecen los avisos oficiales que Exygen publica para distribuidores. El número junto a la pestaña te dice cuántos avisos no has leído.',
    ],
  },
  {
    icon: Ticket,
    title: 'Mis códigos',
    body: [
      'Aquí viven tus códigos de referido. Cada código muestra el descuento que le da a tu cliente y la comisión que te deja a ti.',
      'Los códigos se generan automáticamente según tu nivel y, por seguridad, se renuevan cada 90 días — el sistema te avisa cuando hay uno nuevo. Puedes copiar cualquier código con un clic y compartirlo por donde quieras.',
      'Muy importante: una venta se te atribuye únicamente cuando el cliente escribe tu código al comprar. Sin código, la venta no cuenta para ti.',
    ],
  },
  {
    icon: Users,
    title: 'Mis clientes',
    body: [
      'La lista de todas las personas que han comprado con tus códigos: cuántas compras llevan, cuándo fue la última y cuánta comisión te han generado.',
      'Si tienes equipo, aquí también ves a tus reclutas, su nivel y sus ventas. Recuerda que tus reclutas activos cuentan para tu ascenso de nivel.',
    ],
  },
  {
    icon: Truck,
    title: 'Pedidos y envíos',
    body: [
      'El seguimiento de cada pedido: pagado, confirmado, enviado y entregado, con su número de guía para rastrearlo. Puedes copiar la guía con un clic.',
      'Usa los filtros de periodo y estado para encontrar cualquier pedido rápido.',
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Mis ventas',
    body: [
      'El detalle de cada venta: fecha, producto, cliente y tu comisión. Filtra por periodo (este mes, últimos 90 días, este año) y por estado.',
      'Abajo siempre ves el total ganado en el periodo que elegiste — así sabes exactamente cuánto has ganado y de dónde viene.',
    ],
  },
  {
    icon: FileText,
    title: 'Certificados',
    body: [
      'La biblioteca de certificados de análisis (COA) de los productos. Cada lote tiene su análisis de laboratorio para que puedas compartirlo con tus clientes cuando te lo pidan.',
    ],
  },
];

// Guía escrita de la cuenta de cliente
const CLIENT_GUIDE = [
  {
    icon: Package,
    title: 'Pedidos',
    body: [
      'El estado de cada compra: pagado, confirmado, enviado y entregado, con su número de guía para rastrear el paquete.',
      'Si compraste con el código de un distribuidor, tu descuento ya quedó aplicado desde el checkout.',
    ],
  },
  {
    icon: Bell,
    title: 'Novedades',
    body: [
      'Aquí te avisamos cuando tu pedido sale, cuando llega, y cuando hay promociones o avisos importantes de Exygen.',
    ],
  },
  {
    icon: Calculator,
    title: 'Herramientas',
    body: [
      'Tu cuenta incluye herramientas de investigación sin costo. La calculadora de reconstitución te dice cuánto diluyente usar y cuánto cargar en la jeringa, con dosis de referencia tomadas de la literatura científica cuando existen.',
      'También tienes acceso al material educativo de la sección Aprende.',
    ],
  },
  {
    icon: Coins,
    title: 'Puntos de lealtad',
    body: [
      'Si eres parte del programa de lealtad, en tu cuenta ves tu saldo de puntos y su historial. Los puntos no caducan nunca. Si devuelves una compra, los puntos de esa compra se revierten.',
    ],
  },
  {
    icon: FileText,
    title: 'Certificados y laboratorio',
    body: [
      'Consulta el certificado de análisis (COA) del lote de cada producto que compraste, con su análisis de laboratorio.',
    ],
  },
  {
    icon: User,
    title: 'Perfil',
    body: [
      'Tus datos personales, dirección de envío y opciones de seguridad de tu cuenta.',
    ],
  },
];

const GuideAccordion = ({ items, prefix }) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((s, i) => (
      <AccordionItem key={s.title} value={`${prefix}-${i}`} data-testid={`tutorial-section-${prefix}-${i}`}>
        <AccordionTrigger className="text-left">
          <span className="flex items-center gap-3">
            <s.icon className="h-5 w-5 text-[hsl(var(--primary))]" />
            <span className="font-semibold">{s.title}</span>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed pl-8">
            {s.body.map((p, j) => <p key={j}>{p}</p>)}
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default function Tutorials() {
  const { t } = useLanguage();
  const { user } = useAuth();
  // Tutoriales = solo miembros. Visitantes ven únicamente la invitación a entrar.
  // La guía y videos de distribuidor solo se muestran a distribuidores/admin.
  const isDist = !!user && ['distributor', 'admin'].includes(user.role);
  const videos = VIDEOS.filter((v) => v.role !== 'dist' || isDist);

  if (!user) {
    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2" data-testid="tutorials-title">
          <GraduationCap className="h-6 w-6 text-[hsl(var(--primary))]" /> {t('tutorials.title')}
        </h1>
        <p className="text-muted-foreground text-sm mb-8">{t('tutorials.subtitle')}</p>
        <Card className="p-10 text-center" data-testid="tutorials-login-gate">
          <PlayCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h2 className="font-heading font-semibold text-lg mb-2">{t('tutorials.membersTitle')}</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-5">{t('tutorials.membersBody')}</p>
          <a href={`${BASE}/login`} className="inline-flex items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold px-6 py-2.5 text-sm hover:opacity-90 transition-opacity" data-testid="tutorials-login-cta">
            {t('tutorials.membersCta')}
          </a>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2" data-testid="tutorials-title">
        <GraduationCap className="h-6 w-6 text-[hsl(var(--primary))]" /> {t('tutorials.title')}
      </h1>
      <p className="text-muted-foreground text-sm mb-8">{t('tutorials.subtitle')}</p>

      {/* Videos */}
      <div className="mb-10">
        <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('tutorials.videos')}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {videos.map((v) => (
            <Card key={v.src} className="overflow-hidden" data-testid="tutorial-video-card">
              <video controls preload="metadata" className="w-full aspect-video bg-black" src={v.src} />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px]">{v.audience}</Badge>
                  <span className="text-[11px] text-muted-foreground">{v.duration}</span>
                </div>
                <div className="text-sm font-semibold leading-snug">{v.title}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Guía distribuidor */}
      {isDist && (
      <Card className="p-6 mb-6" data-testid="tutorials-distributor-guide">
        <h2 className="font-heading text-lg font-bold mb-1 flex items-center gap-2">
          <Store className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('tutorials.distGuide')}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">{t('tutorials.distGuideSub')}</p>
        <GuideAccordion items={DIST_GUIDE} prefix="dist" />
      </Card>
      )}

      {/* Guía cliente */}
      <Card className="p-6" data-testid="tutorials-client-guide">
        <h2 className="font-heading text-lg font-bold mb-1 flex items-center gap-2">
          <User className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('tutorials.clientGuide')}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">{t('tutorials.clientGuideSub')}</p>
        <GuideAccordion items={CLIENT_GUIDE} prefix="client" />
      </Card>
    </div>
  );
}
