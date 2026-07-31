// Datos del COTIZADOR del distribuidor.
//
// ⛔ REGLA DE ORO (Christián, 2026-07-30): ni el distribuidor ni el cliente ven
// JAMÁS el costo real, el proveedor ni el ROI. Aquí sólo hay tres cosas: el
// precio PÚBLICO (el mismo catálogo que ya trae el sitio), cuánto descuento
// aguanta cada producto, y hasta cuánto puede dar este distribuidor. El costo no
// entra a este archivo y no debe entrar nunca.
import { useEffect, useMemo, useState } from 'react';
import { fallbackProducts } from '@/data/fallbackCatalog';
import api from '@/lib/api';

// Insumos (agua bacteriostática, viales, jeringas): NUNCA llevan descuento. Es la
// misma lista que `NO_DISCOUNT_CATEGORIES` en el backend.
const CATEGORIAS_SIN_DESCUENTO = new Set(['suministros', 'accesorios']);

// Techo del descuento que recibe un CLIENTE. Es a lo más que llega el respaldo
// local, porque el catálogo público ya no dice cuánto aguanta de verdad cada
// producto (Christián, 2026-07-30): eso sólo lo sabe el servidor. Quedarse corto
// es lo correcto — el cotizador nunca promete de más.
const TECHO_DESCUENTO_CLIENTE = 0.15;

// Con la base del canal en 30% (BASE_RATE), el descuento máximo de cualquier
// distribuidor es 25%. Es el PISO del esquema, no una adivinanza: sólo se usa si
// el servidor no contesta, para que el cotizador siga sirviendo sin inventar.
export const TASA_SI_NO_CONTESTA = 0.25;

// Familia HGH (no el Fragment): precio NETO siempre, cero descuento. Copia fiel
// de `es_hgh_neto` en el backend — si las dos se separan, el cotizador promete
// lo que la caja no respeta.
export const esHghNeto = (id, nombre) => {
  const k = `${id || ''} ${nombre || ''}`.toLowerCase();
  return k.includes('hgh') && !k.includes('fragment');
};

// Tope de UN producto según el catálogo PÚBLICO que ya viaja en el navegador.
//
// Es sólo la red por si el servidor no contesta, y a propósito se queda CORTA: el
// catálogo público ya no publica el tope real (dice cuánto margen aguanta cada
// producto), así que aquí lo máximo es el techo de cliente. Sin servidor el
// distribuidor cotiza hasta 15% en vez de 25% — molesto, pero jamás promete un
// descuento que la caja no le vaya a respetar.
export const topeLocal = (producto, variante) => {
  if (CATEGORIAS_SIN_DESCUENTO.has(producto.category)) return 0;
  if (variante.descuentable === false) return 0;
  if (esHghNeto(variante.id || variante.sku, `${producto.name} ${variante.presentation || ''}`)) return 0;
  const publicado = Number(variante.max_descuento_cliente);
  return Number.isFinite(publicado)
    ? Math.max(0, Math.min(TECHO_DESCUENTO_CLIENTE, publicado))
    : TECHO_DESCUENTO_CLIENTE;
};

// El catálogo aplanado que necesita el cotizador: una línea por PRESENTACIÓN,
// que es lo que se vende y lo que tiene precio propio.
export const catalogoCotizable = (topes) => {
  const out = [];
  for (const p of fallbackProducts) {
    for (const v of p.variants || []) {
      const precio = Number(v.price) || Number(p.price) || 0;
      if (!precio) continue;
      // El carrito nombra al producto con su id o con su SKU; el servidor manda
      // los topes con las dos llaves, así que se busca por las dos.
      const delServidor = topes ? (topes[v.id] ?? topes[v.sku]) : undefined;
      out.push({
        id: v.id || v.sku,
        name: v.presentation ? `${p.name} ${v.presentation}` : p.name,
        presentation: v.presentation || p.presentation || '',
        price: precio,
        discount_cap: delServidor ?? topeLocal(p, v),
      });
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name, 'es'));
};

// Lo que el cotizador le pide al servidor: los topes por producto y su tasa.
// Nada más. La ruta es de distribuidor autenticado y devuelve dos números por
// renglón; no hay forma de que salga un costo por aquí.
export const useDatosDelCotizador = () => {
  const [topes, setTopes] = useState(null);
  const [tasaMaxima, setTasaMaxima] = useState(0);

  useEffect(() => {
    let vivo = true;
    api.get('/distributor/quote-caps')
      .then((r) => {
        if (!vivo) return;
        const mapa = {};
        for (const fila of r.data?.caps || []) mapa[fila.product_id] = fila.discount_cap;
        setTopes(mapa);
        setTasaMaxima(Number(r.data?.max_discount) || TASA_SI_NO_CONTESTA);
      })
      .catch(() => { if (vivo) setTasaMaxima(TASA_SI_NO_CONTESTA); });
    return () => { vivo = false; };
  }, []);

  const catalogo = useMemo(() => catalogoCotizable(topes), [topes]);
  return { catalogo, tasaMaxima };
};
