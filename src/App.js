import React, { Suspense, lazy, useEffect, useLayoutEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChatWidget from '@/components/AIChatWidget';
import RuoGate from '@/components/RuoGate';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import ViewAsBanner from '@/components/ViewAsBanner';
import WhatsAppButton from '@/components/WhatsAppButton';
import { track } from '@/lib/track';

// ---------------------------------------------------------------------------
//  Una página = un archivo que se descarga cuando hace falta (2026-07-28)
// ---------------------------------------------------------------------------
// Antes TODO viajaba en un solo archivo de 2.35 MB: quien entraba a ver un vial
// se bajaba también el Panel de Administración, la calculadora, las trece guías
// de /aprende, las nueve páginas de políticas y las librerías de gráficas. En un
// celular con mala señal eso son entre 3 y 13 segundos de pantalla en blanco.
//
// `lazy()` parte el archivo por página. La portada se queda pegada al archivo
// principal a propósito: es donde cae la mayoría, y separarla sólo añadiría un
// viaje de red extra sin ahorrar nada. `NotFound` también, porque pesa nada y
// tiene que poder pintarse siempre.
//
// `webpackPrefetch` = "bájatelo cuando el navegador esté ocioso, no ahora".
// Catálogo y ficha de producto lo llevan porque son el camino natural desde la
// portada: cuando el visitante hace clic, el archivo ya está en su máquina.
const Catalog = lazy(() => import(/* webpackChunkName: "catalogo", webpackPrefetch: true */ '@/pages/Catalog'));
const ProductDetail = lazy(() => import(/* webpackChunkName: "producto", webpackPrefetch: true */ '@/pages/ProductDetail'));
const Cart = lazy(() => import(/* webpackChunkName: "carrito" */ '@/pages/Cart'));
const Checkout = lazy(() => import(/* webpackChunkName: "checkout" */ '@/pages/Checkout'));
const OrderConfirmation = lazy(() => import(/* webpackChunkName: "pedido" */ '@/pages/OrderConfirmation'));
const Calculator = lazy(() => import(/* webpackChunkName: "calculadora" */ '@/pages/Calculator'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ '@/pages/Login'));
const Account = lazy(() => import(/* webpackChunkName: "cuenta" */ '@/pages/Account'));
const Distributor = lazy(() => import(/* webpackChunkName: "distribuidor" */ '@/pages/Distributor'));
const Tutorials = lazy(() => import(/* webpackChunkName: "tutoriales" */ '@/pages/Tutorials'));
const ForgotPassword = lazy(() => import(/* webpackChunkName: "recuperar" */ '@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import(/* webpackChunkName: "restablecer" */ '@/pages/ResetPassword'));
const ConfirmEmail = lazy(() => import(/* webpackChunkName: "confirmar" */ '@/pages/ConfirmEmail'));
const ActivateAccount = lazy(() => import(/* webpackChunkName: "activar" */ '@/pages/ActivateAccount'));
const Admin = lazy(() => import(/* webpackChunkName: "admin" */ '@/pages/Admin'));
const InfoPage = lazy(() => import(/* webpackChunkName: "info" */ '@/pages/InfoPage'));
const Education = lazy(() => import(/* webpackChunkName: "educacion" */ '@/pages/Education'));
const Advisor = lazy(() => import(/* webpackChunkName: "asesor" */ '@/pages/Advisor'));
const LearnHub = lazy(() => import(/* webpackChunkName: "aprende" */ '@/pages/LearnHub'));
const LearnPage = lazy(() => import(/* webpackChunkName: "aprende-pagina" */ '@/pages/LearnPage'));
const Compendium = lazy(() => import(/* webpackChunkName: "compuestos" */ '@/pages/Compendium'));

// RED DE SEGURIDAD DEL PARTIDO EN TROZOS.
//
// Ahora cada página es un archivo aparte con el número de versión en el nombre
// (catalogo.3f0da78b.chunk.js). Cuando publicamos una versión nueva, los
// archivos viejos desaparecen del servidor. Quien tuviera el sitio abierto desde
// antes sigue pidiendo los viejos: el archivo contesta 404, `lazy()` revienta y
// sin esto se quedaría mirando una pantalla en blanco para siempre.
//
// Aquí se atrapa ese caso y se recarga la página UNA vez (la marca va en
// sessionStorage para no entrar en un bucle de recargas si el fallo es otro).
// Al recargar, el HTML trae los nombres nuevos y todo sigue.
class ReintentoDeCarga extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roto: false };
  }

  static getDerivedStateFromError() {
    return { roto: true };
  }

  componentDidCatch(error) {
    const esTrozoQueYaNoExiste = /Loading chunk|Importing a module script failed|Failed to fetch dynamically imported module|error loading dynamically imported module/i
      .test(String(error && error.message));
    const yaRecargue = sessionStorage.getItem('exygen-recarga-por-trozo');
    if (esTrozoQueYaNoExiste && !yaRecargue) {
      sessionStorage.setItem('exygen-recarga-por-trozo', '1');
      window.location.reload();
    }
  }

  render() {
    if (this.state.roto) {
      return (
        <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">No pudimos cargar esta página.</p>
          <button type="button" onClick={() => window.location.reload()}
            className="mt-4 underline text-[hsl(var(--primary))]">Reintentar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lo que se ve mientras llega el archivo de la página. NUNCA pantalla negra:
// un armazón gris que respira, con la misma anchura y márgenes que el contenido
// real, para que al aparecer no salte nada. La barra superior y el pie NO entran
// aquí — esos ya están pintados y no se mueven.
const PageSkeleton = () => (
  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-busy="true" aria-live="polite">
    <div className="h-8 w-2/3 max-w-md rounded-md bg-muted animate-pulse" />
    <div className="mt-3 h-4 w-1/2 max-w-sm rounded bg-muted animate-pulse" />
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
      ))}
    </div>
  </div>
);

// /login es una pantalla independiente al estilo del alta de Resend (siempre
// oscura, sin barra ni pie): el sitio no debe asomarse detrás.
const STANDALONE_ROUTES = ['/login', '/registro'];

// Cada cambio de página cuenta como visita (entra al embudo).
const TrackPageViews = () => {
  const { pathname } = useLocation();
  useEffect(() => { track('visit'); }, [pathname]);
  return null;
};

// Al abrir cualquier página, empezar ARRIBA. Christian lo pidió DOS veces, así
// que aquí queda el porqué de cada línea.
//
// Es una app de una sola página: al cambiar de ruta el navegador no reposiciona
// nada por su cuenta. Si venías a media pantalla del catálogo, la ficha del
// producto abría a media pantalla y se veía rota.
//
// La primera versión llamaba a `window.scrollTo(0,0)` desde un `useEffect` y aun
// así "a veces" abría abajo. Dos motivos:
//
// 1. El `useEffect` corre DESPUÉS de pintar:
//    el navegador alcanza a dibujar la página nueva en la posición vieja y luego
//    brinca. En una página larga eso se ve como si hubiera abierto abajo.
//    `useLayoutEffect` corre ANTES de pintar, así que nadie alcanza a ver nada.
//
// 2. `scrollRestoration = 'manual'`. Por defecto el navegador guarda la posición
//    y la repone él solo, peleando con lo que hacemos aquí. Ganaba a veces él y a
//    veces nosotros — de ahí que "a veces" abriera abajo.
//
// 3. Se mueven los TRES: `window`, `html` y `body`. Cuál de ellos scrollea
//    depende del CSS, y ese CSS ya cambió una vez (ver la regla del header
//    pegado). Moverlos todos cuesta nada y sobrevive al próximo cambio.
//
// Sigue dependiendo de `pathname` A SECAS, sin `search`: filtrar u ordenar el
// catálogo cambia la query pero NO es una página nueva, y ahí brincar estorba.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  useLayoutEffect(() => {
    if (navType === 'POP') return;      // "atrás"/"adelante": el navegador manda
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [pathname, navType]);

  return null;
};

const SiteChrome = ({ children }) => {
  const { pathname } = useLocation();
  if (STANDALONE_ROUTES.includes(pathname)) return null;
  return children;
};

function App() {
  // Protección de fotos: sin clic derecho sobre imágenes (el CSS ya quita
  // arrastre y selección). No detiene capturas de pantalla — nada lo hace.
  useEffect(() => {
    const blockImgMenu = (e) => { if (e.target?.tagName === 'IMG') e.preventDefault(); };
    document.addEventListener('contextmenu', blockImgMenu);
    return () => document.removeEventListener('contextmenu', blockImgMenu);
  }, []);
  return (
    <div className="App">
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
                <ScrollToTop />
                <TrackPageViews />
                <SiteChrome><ViewAsBanner /><Header /></SiteChrome>
                <main className="min-h-[70vh] pb-24 sm:pb-0">
                  <ReintentoDeCarga>
                  <Suspense fallback={<PageSkeleton />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogo" element={<Catalog />} />
                    <Route path="/calculadora" element={<Calculator />} />
                    <Route path="/educacion" element={<Education />} />
                    <Route path="/asesor" element={<Advisor />} />
                    <Route path="/aprende" element={<LearnHub />} />
                    <Route path="/aprende/:slug" element={<LearnPage />} />
                    <Route path="/compuestos" element={<Compendium />} />
                    <Route path="/producto/:slug" element={<ProductDetail />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/pedido/:orderNumber" element={<OrderConfirmation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Login />} />
                    <Route path="/recuperar" element={<ForgotPassword />} />
                    <Route path="/restablecer" element={<ResetPassword />} />
                    <Route path="/confirmar" element={<ConfirmEmail />} />
                    <Route path="/activar" element={<ActivateAccount />} />
                    <Route path="/cuenta" element={<Account />} />
                    <Route path="/distribuidor" element={<Distributor />} />
                    <Route path="/tutoriales" element={<Tutorials />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/info/:page" element={<InfoPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  </Suspense>
                  </ReintentoDeCarga>
                </main>
                <SiteChrome><Footer /></SiteChrome>
                <RuoGate />
                <SiteChrome><AIChatWidget /></SiteChrome>
                <SiteChrome><WhatsAppButton /></SiteChrome>
                <Toaster position="top-right" richColors closeButton duration={2500} />
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
