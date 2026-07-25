import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { track } from '@/lib/track';
import api from '@/lib/api';
import { productImage } from '@/data/productImages';
import { fallbackProducts } from '@/data/fallbackCatalog';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

// Insumos (agua bacteriostática, viales, jeringas): NUNCA entran a ningún
// descuento. Se venden casi al costo (Christian, 2026-07-25). Misma lista que
// NO_DISCOUNT_CATEGORIES en el backend.
const NO_DISCOUNT_CATEGORIES = ['suministros', 'accesorios'];

// Tope de comisión POR PRODUCTO: cuánto descuento aguanta sin comerse el ROI.
// Se busca por id/SKU en el catálogo, no en lo que quedó guardado en el carrito,
// para que un carrito viejo del navegador también calcule bien.
const CAPS = (() => {
  const map = {};
  for (const p of fallbackProducts) {
    const cats = p.categories || [p.category];
    const blocked = cats.some((c) => NO_DISCOUNT_CATEGORIES.includes(c));
    for (const v of p.variants || []) {
      const info = {
        cap: v.commission_cap == null ? 0.5 : v.commission_cap,
        eligible: v.distributor_eligible !== false && !blocked,
      };
      if (v.id) map[v.id] = info;
      if (v.sku) map[v.sku] = info;
    }
  }
  return map;
})();

/** Descuento REAL de un renglón: el menor entre el pedido y el tope del producto.
 *  0 si el producto no participa (insumos, HGH neto, no elegibles). */
export const itemDiscountRate = (item, rate) => {
  if (isNetPriceItem(item)) return 0;
  const info = CAPS[item.product_id] || CAPS[item.sku] || { cap: 0.5, eligible: true };
  if (!info.eligible) return 0;
  return Math.min(rate || 0, info.cap);
};

// Productos a PRECIO NETO (sin descuento alguno, regla de Christian 2026-07-22):
// la familia HGH — no así el HGH Fragment, que sí tiene margen.
export const isNetPriceItem = (item) => {
  // Miramos id, slug Y nombre: en producción el product_id es un UUID que no
  // dice "hgh"; el nombre ("HGH 40 IU") y el slug (hgh-40-iu) sí.
  const key = `${item.product_id || ''} ${item.slug || ''} ${item.name || ''}`.toLowerCase();
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
        sku: product.sku || '',
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
    track('add_to_cart', { product: product.sku || product.id, value: (product.price || 0) * qty });
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
    .filter((i) => itemDiscountRate(i, 1) > 0)
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
  // Renglón por renglón: cada producto recibe lo que su tope aguanta, ni más.
  const discount = items.reduce(
    (sum, i) => sum + Math.round(i.price * i.quantity * itemDiscountRate(i, discountRate)), 0);
  // Los que recibieron MENOS de lo pedido, para avisarle al cliente.
  const cappedItems = items
    .map((i) => ({ ...i, applied: itemDiscountRate(i, discountRate) }))
    .filter((i) => i.applied < discountRate - 1e-9);
  const nextTier = discountableSubtotal < 35000 ? { min: 35000, rate: 0.15 } : null;

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal, count, discount, discountRate, discountSource, cappedItems, nextTier, distCode, distRate, applyDistCode, clearDistCode }}>
      {children}
    </CartContext.Provider>
  );
};
