// Medición del embudo de venta: visita → ver producto → carrito → checkout → compra.
// Sirve para saber si la publicidad trae gente Y si esa gente compra.
// No guarda datos personales: solo un id de sesión anónimo y el origen del tráfico.
import { API } from '@/lib/api';

const SESSION_KEY = 'np_track_session';
const SESSION_SEEN = 'np_track_session_visto';
const VISITOR_KEY = 'np_track_visitor';
const ORIGIN_KEY = 'np_track_origin';

// Una SESIÓN termina a los 30 minutos sin actividad — es el estándar de la
// industria y lo que entiende cualquiera por "una visita".
//
// ⚠️ Antes el id se guardaba para siempre: quien volvía un mes después seguía
// contando como la MISMA sesión. O sea que "sesiones" no eran sesiones, eran
// dispositivos que alguna vez entraron — y la conversión del panel salía
// inflada, porque se dividía entre un número artificialmente chico
// (170 visitas repartidas en solo 16 "sesiones"). Christian, 2026-07-26.
const SESSION_MINUTOS = 30;

const nuevoId = (p) => p + Math.random().toString(36).slice(2) + Date.now().toString(36);

const sessionId = () => {
  try {
    const ahora = Date.now();
    const visto = Number(localStorage.getItem(SESSION_SEEN) || 0);
    let id = localStorage.getItem(SESSION_KEY);
    if (!id || !visto || ahora - visto > SESSION_MINUTOS * 60 * 1000) {
      id = nuevoId('s-');
      localStorage.setItem(SESSION_KEY, id);
    }
    localStorage.setItem(SESSION_SEEN, String(ahora));
    return id;
  } catch { return 'anon'; }
};

// El VISITANTE sí es para siempre: sirve para saber si alguien vuelve, y para
// que una compra se le siga atribuyendo al anuncio que lo trajo semanas antes.
const visitorId = () => {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = nuevoId('v-');
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch { return 'anon'; }
};

// El origen (utm / referrer) se guarda en la PRIMERA visita y se conserva:
// si alguien llega por un anuncio y compra tres páginas después, la venta
// sigue contando para ese anuncio. Esto es "primer toque" a propósito: el
// anuncio que TRAJO al cliente es el que merece el crédito, no la última
// pestaña que tenía abierta.
//
// ⚠️ `fbclid` es la pieza que salva la medición cuando el anuncio NO trae utm.
// Meta se lo pega SIEMPRE a los enlaces de sus anuncios, aunque nadie lo haya
// etiquetado. Sin él, todo lo que venga de una publicación impulsada cae en
// "facebook (sin utm)" y es imposible saber de QUÉ campaña salió.
const VACIO = {
  utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: '',
  fbclid: '', referrer: '', landing_path: '', first_seen: '',
};

const origin = () => {
  try {
    const guardado = localStorage.getItem(ORIGIN_KEY);
    if (guardado) {
      // Los visitantes viejos traen el formato corto: se completa sin perder su origen.
      const o = JSON.parse(guardado);
      return { ...VACIO, ...o };
    }
    const q = new URLSearchParams(window.location.search);
    const o = {
      ...VACIO,
      utm_source: q.get('utm_source') || '',
      utm_medium: q.get('utm_medium') || '',
      utm_campaign: q.get('utm_campaign') || '',
      utm_content: q.get('utm_content') || '',   // el ANUNCIO concreto dentro de la campaña
      utm_term: q.get('utm_term') || '',
      fbclid: q.get('fbclid') || '',
      referrer: document.referrer || '',
      landing_path: window.location.pathname || '',
      first_seen: new Date().toISOString(),
    };
    localStorage.setItem(ORIGIN_KEY, JSON.stringify(o));
    return o;
  } catch { return { ...VACIO }; }
};

// Lo que necesita el checkout para dejar escrito en el PEDIDO de dónde salió el
// cliente. Sin esto, el gasto de Meta y las ventas viven en dos mundos que no se
// tocan, y el "costo por cliente" no se puede calcular: solo adivinar.
export const attribution = () => {
  try {
    return { ...origin(), visitor_id: visitorId(), session_id: sessionId() };
  } catch { return { ...VACIO, visitor_id: '', session_id: '' }; }
};

// El mismo evento se le avisa a Meta (Facebook/Instagram) para que su
// publicidad aprenda a quién mostrarle los anuncios. Nombres estandar de Meta.
const META = {
  visit: 'PageView',
  product_view: 'ViewContent',
  add_to_cart: 'AddToCart',
  // El nombre bueno es `checkout_start`: es el que el backend acepta
  // (EVENT_TYPES en server.py). `checkout` se queda como alias porque el mapa
  // viejo lo usaba y no cuesta nada seguir entendiéndolo.
  checkout_start: 'InitiateCheckout',
  checkout: 'InitiateCheckout',
  purchase: 'Purchase',
};

const avisarAMeta = (type, extra) => {
  try {
    if (typeof window.fbq !== 'function') return;
    const nombre = META[type];
    if (!nombre) return;
    const datos = {};
    if (extra.value) { datos.value = Number(extra.value) || 0; datos.currency = 'MXN'; }
    if (extra.product) datos.content_ids = [String(extra.product)];
    if (type === 'product_view' || type === 'add_to_cart') datos.content_type = 'product';
    window.fbq('track', nombre, datos);
    // El checkout no tiene evento propio: la visita a /checkout lo es.
    if (type === 'visit' && window.location.pathname === '/checkout') {
      window.fbq('track', 'InitiateCheckout');
    }
  } catch { /* medir nunca debe estorbar */ }
};

// Nunca debe romper la página ni frenar la navegación: falla en silencio.
export const track = (type, extra = {}) => {
  avisarAMeta(type, extra);
  try {
    const body = JSON.stringify({ type, session_id: sessionId(), visitor_id: visitorId(), path: window.location.pathname, ...origin(), ...extra });
    // sendBeacon sobrevive al cambio de página (clave para medir la compra).
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API}/events`, new Blob([body], { type: 'application/json' }));
      return;
    }
    fetch(`${API}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* medir nunca debe estorbar */ }
};
