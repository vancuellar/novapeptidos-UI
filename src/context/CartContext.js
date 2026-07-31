import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { track } from '@/lib/track';
import api, { esCaidaDeApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { productImage } from '@/data/productImages';
import { fallbackProducts } from '@/data/fallbackCatalog';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

// Insumos (agua bacteriostática, viales, jeringas): NUNCA entran a ningún
// descuento. Se venden casi al costo (Christian, 2026-07-25). Misma lista que
// NO_DISCOUNT_CATEGORIES en el backend.
const NO_DISCOUNT_CATEGORIES = ['suministros', 'accesorios'];

// LA REGLA DE 5 (Christián, 2026-07-30): piezas del MISMO producto que hacen falta
// para que una compra propia de distribuidor pague precio de distribuidor. Debajo de
// eso se paga precio de cliente. Mismo número que
// `descuentos.MINIMO_PARA_PRECIO_DISTRIBUIDOR` en el backend, que es quien manda.
export const MINIMO_PRECIO_DISTRIBUIDOR = 5;

// Lo que el catálogo PÚBLICO dice de cada producto sobre descuentos.
//
// ⛔ Ya NO trae el tope de comisión (Christián, 2026-07-30): ese número dice cuánto
// margen aguanta el producto y no tiene por qué viajar en el bundle que baja
// cualquier visitante. Lo que queda es lo justo para que el carrito no le prometa
// al cliente un total que la caja no le va a cobrar:
//   · `descuentable: false` — aquí no hay descuento (insumos, HGH neto, lo que no
//     participa del canal). Eso el cliente lo ve igual en su carrito.
//   · `max_descuento_cliente` — sólo aparece si el producto aguanta MENOS que el
//     techo de cliente (15%). Con el catálogo de hoy no aparece en ninguno.
//
// El tope de verdad lo sirve el servidor a quien tiene descuento propio
// (`/distributor/quote-caps`), y la caja lo recalcula siempre: ella es la verdad.
const TOPE_SI_NO_SE_SABE = 0.5;

const CAPS = (() => {
  const map = {};
  for (const p of fallbackProducts) {
    const cats = p.categories || [p.category];
    const blocked = cats.some((c) => NO_DISCOUNT_CATEGORIES.includes(c));
    for (const v of p.variants || []) {
      const info = {
        cap: v.max_descuento_cliente == null ? TOPE_SI_NO_SE_SABE : v.max_descuento_cliente,
        eligible: v.descuentable !== false && !blocked,
      };
      if (v.id) map[v.id] = info;
      if (v.sku) map[v.sku] = info;
    }
  }
  return map;
})();

/** Descuento REAL de un renglón: el menor entre el pedido y el tope del producto.
 *  0 si el producto no participa (insumos, HGH neto, no elegibles).
 *
 *  `topesReales` es opcional: el mapa {product_id: tope} que el servidor le da a
 *  quien compra con su propia tasa. Cuando viene, MANDA — es el mismo número que
 *  va a usar la caja. Sin él se usa lo que dice el catálogo público, que alcanza
 *  de sobra para cualquier descuento de cliente. */
export const itemDiscountRate = (item, rate, topesReales = null) => {
  if (isNetPriceItem(item)) return 0;
  if (topesReales) {
    const real = topesReales[item.product_id] ?? topesReales[item.sku];
    if (real != null) return Math.min(rate || 0, real);
  }
  const info = CAPS[item.product_id] || CAPS[item.sku]
    || { cap: TOPE_SI_NO_SE_SABE, eligible: true };
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

  // COMPRA PROPIA de un distribuidor: compra para sí mismo con SU comisión máxima
  // como descuento (Christian, 2026-07-25). Ese descuento ES su comisión, cobrada
  // por adelantado — no gana comisión encima. Sigue acotado al tope de cada producto.
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selfRate, setSelfRate] = useState(0);
  useEffect(() => {
    if (!user || user.role !== 'distributor') { setSelfRate(0); return; }
    if (typeof user.self_discount_rate === 'number') { setSelfRate(user.self_discount_rate); return; }
    // El login devuelve un usuario mínimo; pedimos su tasa a /auth/me.
    api.get('/auth/me').then((r) => setSelfRate(r.data.self_discount_rate || 0)).catch(() => {});
  }, [user]);

  // Los topes REALES por producto, para quien compra con su propia tasa.
  //
  // El catálogo público ya no los trae (dicen cuánto margen aguanta cada producto).
  // A un cliente no le hacen falta: su descuento nunca pasa del techo de 15% y
  // ningún producto descuentable aguanta menos que eso. Pero un distribuidor compra
  // al 30% o más, y ahí sí hay productos que topan antes — sin este dato su carrito
  // le enseñaría un total más barato del que la caja le va a cobrar.
  const [topesReales, setTopesReales] = useState(null);
  useEffect(() => {
    if (!user || !['distributor', 'admin'].includes(user.role)) { setTopesReales(null); return; }
    api.get('/distributor/quote-caps')
      .then((r) => {
        const mapa = {};
        for (const f of r.data?.caps || []) mapa[f.product_id] = f.discount_cap;
        setTopesReales(mapa);
      })
      .catch(() => {});   // sin ellos el carrito sigue calculando con lo público
  }, [user]);

  // Atajo para no repetir `topesReales` en cada cuenta de abajo.
  const tasaDeRenglon = (item, rate) => itemDiscountRate(item, rate, topesReales);

  const [distCode, setDistCode] = useState(() => localStorage.getItem('np_dist_code') || '');
  const [distRate, setDistRate] = useState(() => Number(localStorage.getItem('np_dist_rate')) || 0);
  // Monto mínimo del cupón (los de recuperación de carrito exigen comprar lo mismo
  // o más). Se guarda para que el carrito no muestre un descuento que no se va a cobrar.
  const [codeMin, setCodeMin] = useState(() => Number(localStorage.getItem('np_dist_min')) || 0);
  useEffect(() => {
    localStorage.setItem('np_dist_code', distCode);
    localStorage.setItem('np_dist_rate', String(distRate));
    localStorage.setItem('np_dist_min', String(codeMin));
  }, [distCode, distRate, codeMin]);

  const applyDistCode = async (code) => {
    const c = (code || '').trim().toUpperCase();
    if (!c) return false;
    try {
      const r = await api.get(`/discount-code/${encodeURIComponent(c)}`);
      setDistCode(r.data.code);
      setDistRate(r.data.discount_rate || 0);
      setCodeMin(Number(r.data.min_order) || 0);
      const min = Number(r.data.min_order) || 0;
      toast.success(`Código ${r.data.code} aplicado`, {
        description: min > 0
          ? `${Math.round((r.data.discount_rate || 0) * 100)}% en compras desde $${min.toLocaleString('es-MX')}`
          : `${Math.round((r.data.discount_rate || 0) * 100)}% de descuento`,
      });
      return true;
    } catch (err) {
      // Si el servidor NO contestó, no se sabe si el código vale: decirle
      // "no válido" al cliente sería mentirle y quemar el cupón.
      toast.error(esCaidaDeApi(err) ? t('cart.codigo.mantenimiento') : t('cart.codigo.invalido'));
      return false;
    }
  };
  const clearDistCode = () => { setDistCode(''); setDistRate(0); setCodeMin(0); };

  // ENLACE CON CÓDIGO (?ref=): lo que reparte el distribuidor desde su cotizador.
  // Sin esto el enlace sería adorno — el cliente entraría, compraría, y la venta
  // no sería de nadie porque nunca escribió el código a mano.
  //
  // Se hace UNA vez por carga y sin ruido: si el código ya está puesto no se
  // toca, y si el servidor no lo reconoce no se le grita nada al cliente (él no
  // escribió ese código, llegó pegado en un enlace).
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (!ref || distCode) return;
    api.get(`/discount-code/${encodeURIComponent(ref.trim().toUpperCase())}`)
      .then((r) => {
        setDistCode(r.data.code);
        setDistRate(r.data.discount_rate || 0);
        setCodeMin(Number(r.data.min_order) || 0);
      })
      .catch(() => {});
    // Sólo al entrar: el código de un enlace no se vuelve a pedir en cada cambio.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // COTIZACIÓN → CARRITO (?pedido=): el enlace que arma el cotizador del
  // distribuidor (y el correo del servidor) trae los renglones como
  // `id:cantidad,id:cantidad`. Al abrirlo, el carrito se llena SOLO y el cliente
  // aterriza a un paso de pagar, en vez de en el catálogo pelón.
  //
  // ⛔ Del enlace sólo se toman QUÉ producto y CUÁNTOS. Nombre, precio e imagen
  // salen del catálogo real (el del servidor; el empacado si el servidor no
  // contesta) — y al cobrar, el precio lo vuelve a poner el servidor de todos
  // modos. Un enlace manipulado no puede ni inventar productos ni cambiar un peso.
  //
  // El carrito se REEMPLAZA, no se suma: el enlace es la cotización que el
  // cliente ya leyó, y su carrito debe decir exactamente lo mismo que la hoja.
  const [hidratando, setHidratando] = useState(
    () => new URLSearchParams(window.location.search).has('pedido'),
  );
  useEffect(() => {
    const crudo = new URLSearchParams(window.location.search).get('pedido');
    if (!crudo) return;
    // `id:qty` por renglón; cantidades 1–999 y máximo 40 renglones, como el cotizador.
    const pedidos = [];
    for (const parte of crudo.split(',').slice(0, 40)) {
      const [id, q] = parte.split(':');
      const qty = Math.min(999, Math.max(1, Math.round(Number(q)) || 1));
      if (!id) continue;
      const ya = pedidos.find((p) => p.id === id);
      if (ya) ya.qty = Math.min(999, ya.qty + qty); else pedidos.push({ id, qty });
    }
    if (!pedidos.length) { setHidratando(false); return; }
    (async () => {
      let productos;
      try {
        const r = await api.get('/products');
        productos = Array.isArray(r.data) && r.data.length ? r.data : fallbackProducts;
      } catch { productos = fallbackProducts; }
      // Una entrada por PRESENTACIÓN (que es lo que se vende), buscable por id y por SKU.
      const porLlave = {};
      for (const p of productos) {
        const variantes = p.variants?.length ? p.variants
          : [{ id: p.id, sku: p.sku, presentation: p.presentation, price: p.price, stock: p.stock }];
        for (const v of variantes) {
          const item = {
            product_id: v.id || v.sku || p.id,
            sku: v.sku || p.sku || '',
            name: p.variants?.length && v.presentation ? `${p.name} ${v.presentation}` : p.name,
            price: Number(v.price) || Number(p.price) || 0,
            presentation: v.presentation || p.presentation,
            slug: p.slug,
            image_url: productImage(p) || p.image_url,
            stock: v.stock ?? p.stock,
          };
          if (v.id) porLlave[v.id] = item;
          if (v.sku) porLlave[v.sku] = item;
        }
      }
      const renglones = pedidos
        .map(({ id, qty }) => (porLlave[id] && porLlave[id].price > 0
          ? { ...porLlave[id], quantity: qty } : null))
        .filter(Boolean);
      if (renglones.length) {
        setItems(renglones);
        toast.success(t('cart.cotizacionCargada'));
      }
      setHidratando(false);
    })();
    // Una vez por carga, igual que el ?ref= de arriba.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si el cupón exige un mínimo y el carrito no llega, NO se aplica — igual que
  // en el servidor, para que el total en pantalla sea el que se cobra.
  const codeMinMet = !codeMin || discountableSubtotal >= codeMin;
  const codeRate = items.length && distCode && codeMinMet ? distRate : 0;
  const ownRate = items.length ? selfRate : 0;
  // PRECIO DE CLIENTE de esta compra: la promo automática o su código, lo que sea
  // mejor. Es lo que pagan los renglones que no llegan al mínimo de la regla de 5.
  const baseRate = Math.max(autoRate, codeRate);
  // LA REGLA DE 5 (Christián, 2026-07-30). En una COMPRA PROPIA de distribuidor, el
  // precio de distribuidor sólo baja en los renglones con 5 o más piezas del MISMO
  // producto; de 1 a 4 se paga precio de cliente. Es por producto, no por carrito:
  // cinco de Retatrutida 20, no cinco surtidas. El servidor aplica exactamente lo
  // mismo (descuentos.py) — esta pantalla sólo lo enseña antes de pagar.
  const compraPropia = ownRate > baseRate + 1e-9;
  const askedRateOf = (i) => (!compraPropia || i.quantity >= MINIMO_PRECIO_DISTRIBUIDOR)
    ? Math.max(baseRate, ownRate) : baseRate;
  // Renglón por renglón: cada producto recibe lo que su tope aguanta, ni más.
  const discount = items.reduce(
    (sum, i) => sum + Math.round(i.price * i.quantity * tasaDeRenglon(i, askedRateOf(i))), 0);
  // La MAYOR tasa del carrito — la que se enseña en el renglón del resumen. Con un
  // carrito parejo (todo lo que existía antes de la regla) vale lo de siempre.
  const discountRate = items.length ? Math.max(...items.map(askedRateOf)) : 0;
  const discountSource = compraPropia && discountRate > baseRate + 1e-9 ? 'self'
    : (codeRate > autoRate ? 'code' : 'auto');
  // Qué descuento lleva CADA renglón. Con dos tasas en el mismo carrito, un solo
  // porcentaje arriba ya no explica el total: el desglose tiene que verse.
  const lineDiscounts = items.map((i) => {
    const asked = askedRateOf(i);
    return {
      product_id: i.product_id, name: i.name, quantity: i.quantity,
      asked, applied: tasaDeRenglon(i, asked),
      esPrecioDistribuidor: compraPropia && asked > baseRate + 1e-9,
    };
  });
  // Los que recibieron MENOS de lo pedido, para avisarle al cliente.
  const cappedItems = lineDiscounts.filter((i) => i.applied < i.asked - 1e-9);
  // EL EMPUJÓN, no el portazo: los productos a los que les faltan piezas para el
  // precio de distribuidor. Fuera los que no cambiarían nada de todos modos (los
  // insumos y el HGH nunca llevan descuento: ahí "agrega 2 más" sería una mentira).
  const regla5Items = !compraPropia ? [] : items
    .filter((i) => i.quantity < MINIMO_PRECIO_DISTRIBUIDOR
      && tasaDeRenglon(i, Math.max(baseRate, ownRate)) > tasaDeRenglon(i, baseRate) + 1e-9)
    .map((i) => ({
      product_id: i.product_id, name: i.name, quantity: i.quantity,
      faltan: MINIMO_PRECIO_DISTRIBUIDOR - i.quantity, minimo: MINIMO_PRECIO_DISTRIBUIDOR,
    }))
    .sort((a, b) => a.faltan - b.faltan);
  const nextTier = discountableSubtotal < 35000 ? { min: 35000, rate: 0.15 } : null;

  // ENVÍO — LA POLÍTICA DE CHRISTIÁN DEL 2026-07-31, en sus palabras: «gratis siempre
  // y cuando el ticket supere los $2,500 de compra mínima y/o [el envío] no sea mayor
  // a 5% del total de la compra. Primero se debe cumplir la compra mínima».
  //
  // ⛔ ESTA PANTALLA NO DECIDE NADA. El número que se cobra lo pone el servidor al
  // crear el pedido; aquí se REPITE la cuenta con los parámetros que el propio
  // servidor manda en /payments/config. Es la misma lección de siempre: cuando el
  // sitio calcula el dinero por su cuenta, tarde o temprano enseña un total distinto
  // del que se cobra, y eso ya costó dinero. Por eso el default mientras carga la
  // configuración es "no se cobra": es el estado en el que nada se promete de más.
  const [envio, setEnvio] = useState({ shipping_charged: false, shipping_flat: 250, free_shipping_from: 2500 });
  useEffect(() => {
    api.get('/payments/config')
      .then((r) => { if (r.data?.free_shipping_from) setEnvio(r.data); })
      .catch(() => {});
  }, []);
  const pagaMercancia = subtotal - discount;
  const cobraEnvio = envio.shipping_charged === true;
  // ⛔ EL TOPE NO SE INVENTA AQUÍ. Si el servidor no lo manda —porque todavía trae la
  // versión anterior—, esta pantalla NO se pone creativa: se comporta como antes,
  // gratis al cruzar la compra mínima. Adivinar el 5% contra un servidor que sigue
  // regalando el envío arriba de $2,500 haría que el carrito cobrara $100 que la caja
  // no cobra, que es justo la clase de mentira que ya costó dinero. El día que el
  // backend despliegue, el número llega solo y la pantalla se alinea sin tocar nada.
  const topeCrudo = Number(envio.shipping_cap_rate);
  const topeEnvio = Number.isFinite(topeCrudo) && topeCrudo > 0 ? topeCrudo : 0;
  const costoGuia = Number(envio.shipping_cost_estimate) || Number(envio.shipping_flat) || 0;
  // Los dos candados, EN ORDEN: 1º la compra mínima —abajo de ella se paga la tarifa
  // plana por barata que salga la guía—; 2º el tope —la casa absorbe hasta el 5% de
  // lo que el cliente paga y él pone la diferencia—.
  //
  // Se dejó como FUNCIÓN y no como número suelto porque el checkout mide sobre una
  // cifra distinta: ahí el cliente puede pagar parte con puntos, y el servidor cobra
  // el envío sobre lo que quedó DESPUÉS de los puntos. Con un número fijo desde el
  // carrito, un pedido que baja de la mínima al canjear puntos seguía enseñando
  // envío gratis mientras la caja lo cobraba. (2026-07-31)
  const calcularEnvio = React.useCallback((paga) => {
    if (!cobraEnvio || !items.length) return 0;
    if (paga < envio.free_shipping_from) return envio.shipping_flat;
    if (topeEnvio <= 0) return 0;                    // servidor sin tope: regla de antes
    return Math.max(0, Math.round(costoGuia - paga * topeEnvio));
  }, [cobraEnvio, items.length, envio.free_shipping_from, envio.shipping_flat, costoGuia, topeEnvio]);
  const shipping = calcularEnvio(pagaMercancia);
  // DÓNDE EL ENVÍO LLEGA A $0 DE VERDAD. No basta con cruzar la mínima: el tope tiene
  // que alcanzar a tapar la guía completa. Con $250 de guía y 5%, eso pasa hasta los
  // $5,000. Decirle al cliente "te faltan $X para envío gratis" apuntando a $2,500,
  // cuando la caja le va a cobrar $100, es exactamente la mentira que no se hace aquí.
  const envioGratisDeVerdadDesde = topeEnvio > 0
    ? Math.max(envio.free_shipping_from, Math.ceil(costoGuia / topeEnvio))
    : envio.free_shipping_from;
  const faltaParaEnvioGratis = cobraEnvio && shipping > 0 && envioGratisDeVerdadDesde > 0
    ? Math.max(0, envioGratisDeVerdadDesde - pagaMercancia)
    : 0;
  // Envío en cero PORQUE se ganó, no porque el cobro esté apagado. Son dos cosas muy
  // distintas en pantalla: una dice "Gratis" y la otra "Se cotiza por separado".
  const envioGratis = cobraEnvio && items.length > 0 && shipping === 0;

  return (
    <CartContext.Provider value={{ items, hidratando, addItem, updateQty, removeItem, clearCart, subtotal, count, discount, discountRate, discountSource, cappedItems, lineDiscounts, regla5Items, compraPropia, baseRate, nextTier, shipping, calcularEnvio, cobraEnvio, envioGratis, faltaParaEnvioGratis, envioGratisDesde: envio.free_shipping_from, envioGratisDeVerdadDesde, topeEnvio, distCode, distRate, codeMin, codeMinMet, applyDistCode, clearDistCode }}>
      {children}
    </CartContext.Provider>
  );
};
