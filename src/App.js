import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AIChatWidget from '@/components/AIChatWidget';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import Calculator from '@/pages/Calculator';
import NotFound from '@/pages/NotFound';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Account from '@/pages/Account';
import Distributor from '@/pages/Distributor';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Admin from '@/pages/Admin';
import InfoPage from '@/pages/InfoPage';
import Education from '@/pages/Education';
import Advisor from '@/pages/Advisor';
import LearnHub from '@/pages/LearnHub';
import LearnPage from '@/pages/LearnPage';
import Compendium from '@/pages/Compendium';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
                <Header />
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
                    <Route path="/registro" element={<Register />} />
                    <Route path="/recuperar" element={<ForgotPassword />} />
                    <Route path="/restablecer" element={<ResetPassword />} />
                    <Route path="/cuenta" element={<Account />} />
                    <Route path="/distribuidor" element={<Distributor />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/info/:page" element={<InfoPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <AIChatWidget />
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
