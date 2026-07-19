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

  // Descuento AUTOMÁTICO por volumen (sin código): 10% lanzamiento, 15% ≥ $20k, 20% ≥ $40k.
  // El backend aplica la misma regla; esto es solo para mostrarlo en vivo.
  const DISCOUNT_TIERS = [
    { min: 40000, rate: 0.20 },
    { min: 20000, rate: 0.15 },
    { min: 0, rate: 0.10 },
  ];
  const tier = DISCOUNT_TIERS.find((d) => subtotal >= d.min) || DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1];
  const discountRate = items.length ? tier.rate : 0;
  const discount = Math.round(subtotal * discountRate);
  const nextTier = subtotal < 20000 ? { min: 20000, rate: 0.15 } : subtotal < 40000 ? { min: 40000, rate: 0.20 } : null;

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count, discount, discountRate, nextTier }}>
      {children}
    </CartContext.Provider>
  );
};
