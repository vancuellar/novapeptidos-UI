import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('np_cart') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('np_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) => i.product_id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        presentation: product.presentation,
        image_url: product.image_url,
        stock: product.stock,
      }];
    });
    toast.success('Agregado al carrito', { description: product.name });
  };

  const updateQty = (productId, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => i.product_id === productId ? { ...i, quantity: qty } : i));
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  // Códigos de descuento
  const PROMOS = { INTRO10: 0.10 };
  const [promo, setPromo] = useState(() => (localStorage.getItem('np_promo') || ''));
  useEffect(() => { localStorage.setItem('np_promo', promo); }, [promo]);
  const discountRate = PROMOS[promo] || 0;
  const discount = Math.round(subtotal * discountRate);
  const applyPromo = (code) => {
    const c = (code || '').trim().toUpperCase();
    if (PROMOS[c]) {
      setPromo(c);
      toast.success('Código aplicado', { description: `${Math.round(PROMOS[c] * 100)}% de descuento` });
      return true;
    }
    toast.error('Código no válido');
    return false;
  };
  const clearPromo = () => setPromo('');

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count, promo, discount, discountRate, applyPromo, clearPromo }}>
      {children}
    </CartContext.Provider>
  );
};
