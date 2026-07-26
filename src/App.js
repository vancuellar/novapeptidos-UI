import React, { useEffect, useLayoutEffect } from 'react';
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
import Catalog from '@/pages/Catalog';
import Calculator from '@/pages/Calculator';
import NotFound from '@/pages/NotFound';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Login from '@/pages/Login';
import Account from '@/pages/Account';
import Distributor from '@/pages/Distributor';
import Tutorials from '@/pages/Tutorials';
import ViewAsBanner from '@/components/ViewAsBanner';
import WhatsAppButton from '@/components/WhatsAppButton';
import { track } from '@/lib/track';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import ConfirmEmail from '@/pages/ConfirmEmail';
import ActivateAccount from '@/pages/ActivateAccount';
import Admin from '@/pages/Admin';
import InfoPage from '@/pages/InfoPage';
import Education from '@/pages/Education';
import Advisor from '@/pages/Advisor';
import LearnHub from '@/pages/LearnHub';
import LearnPage from '@/pages/LearnPage';
import Compendium from '@/pages/Compendium';

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
                <main className="min-h-[70vh]">
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
