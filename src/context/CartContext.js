import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { productImage } from '@/data/productImages';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

// Productos a PRECIO NETO (sin descuento alguno, regla de Christian 2026-07-22):
// la familia HGH — no así el HGH Fragment, que sí tiene margen.
export const isNetPriceItem = (item) => {
  const key = `${item.product_id || ''} ${item.slug || ''}`.toLowerCase();
  return key.includes('hgh') && !key.includes('fragment');
};

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
        slug: product.slug,
        // Misma imagen que muestra el catálogo (foto de vial real o imagen de categoría).
        image_url: productImage(product) || product.image_url,
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
  // Orden de Christian (2026-07-21): se quitó el escalón del 20% y el 15% sube
  // a $35,000, para no competir con los descuentos de sus distribuidores.
  const DISCOUNT_TIERS = [
    { min: 35000, rate: 0.15 },
    { min: 0, rate: 0.10 },
  ];
  // Familia HGH (no el Fragment): precio neto SIEMPRE — su margen no aguanta
  // ningún descuento (Christian, 2026-07-22). El servidor aplica la misma regla.
  const discountableSubtotal = items
    .filter((i) => !isNetPriceItem(i))
    .reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tier = DISCOUNT_TIERS.find((d) => discountableSubtotal >= d.min) || DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1];
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
  const discount = Math.round(discountableSubtotal * discountRate);
  const nextTier = discountableSubtotal < 35000 ? { min: 35000, rate: 0.15 } : null;

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count, discount, discountRate, discountSource, nextTier, distCode, distRate, applyDistCode, clearDistCode }}>
      {children}
    </CartContext.Provider>
  );
};
