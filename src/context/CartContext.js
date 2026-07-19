import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';

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
  // Código de distribuidor: da su propio % (5–50%). NUNCA se acumulan: aplica el MAYOR.
  // El backend aplica la misma regla; esto es solo para mostrarlo en vivo.
  const DISCOUNT_TIERS = [
    { min: 40000, rate: 0.20 },
    { min: 20000, rate: 0.15 },
    { min: 0, rate: 0.10 },
  ];
  const tier = DISCOUNT_TIERS.find((d) => subtotal >= d.min) || DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1];
  const autoRate = items.length ? tier.rate : 0;

  const [distCode, setDistCode] = useState(() => localStorage.getItem('np_dist_code') || '');
  const [distRate, setDistRate] = useState(() => Number(localStorage.getItem('np_dist_rate')) || 0);
  useEffect(() => { localStorage.setItem('np_dist_code', distCode); localStorage.setItem('np_dist_rate', String(distRate)); }, [distCode, distRate]);

  const applyDistCode = async (code) => {
    const c = (code || '').trim().toUpperCase();
    if (!c) return false;
    try {
      const r = await api.get(`/discount-code/${encodeURIComponent(c)}`);
      setDistCode(r.data.code);
      setDistRate(r.data.discount_rate || 0);
      toast.success(`Código ${r.data.code} aplicado`, { description: `${Math.round((r.data.discount_rate || 0) * 100)}% de descuento` });
      return true;
    } catch {
      toast.error('Código no válido');
      return false;
    }
  };
  const clearDistCode = () => { setDistCode(''); setDistRate(0); };

  const codeRate = items.length && distCode ? distRate : 0;
  const discountRate = Math.max(autoRate, codeRate);
  const discountSource = codeRate > autoRate ? 'code' : 'auto';
  const discount = Math.round(subtotal * discountRate);
  const nextTier = subtotal < 20000 ? { min: 20000, rate: 0.15 } : subtotal < 40000 ? { min: 40000, rate: 0.20 } : null;

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count, discount, discountRate, discountSource, nextTier, distCode, distRate, applyDistCode, clearDistCode }}>
      {children}
    </CartContext.Provider>
  );
};
