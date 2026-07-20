import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

// Carrito flotante abajo a la derecha, en pila con el botón del chat.
// Salió de la barra superior (a Christian no le convencía en el extremo
// derecho) y así la barra queda tan limpia como la de Resend.
const CartFab = () => {
  const { count } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useLanguage();

  // En el carrito y el checkout estorba; ahí no se muestra.
  if (pathname === '/carrito' || pathname === '/checkout') return null;

  return (
    <button
      onClick={() => navigate('/carrito')}
      aria-label={t('cart.title')}
      data-testid="cart-fab"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-card border border-border shadow-[var(--shadow-md)] flex items-center justify-center text-foreground hover:scale-105 transition-transform"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span
          data-testid="cart-fab-count"
          className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-[11px] font-bold flex items-center justify-center"
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default CartFab;
