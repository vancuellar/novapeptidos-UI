// Medición del embudo de venta: visita → ver producto → carrito → checkout → compra.
// Sirve para saber si la publicidad trae gente Y si esa gente compra.
// No guarda datos personales: solo un id de sesión anónimo y el origen del tráfico.
import { API } from '@/lib/api';

const SESSION_KEY = 'np_track_session';
const ORIGIN_KEY = 'np_track_origin';

const sessionId = () => {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = 's-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch { return 'anon'; }
};

// El origen (utm / referrer) se guarda en la PRIMERA visita y se conserva:
// si alguien llega por un anuncio y compra tres páginas después, la venta
// sigue contando para ese anuncio.
const origin = () => {
  try {
    const guardado = localStorage.getItem(ORIGIN_KEY);
    if (guardado) return JSON.parse(guardado);
    const q = new URLSearchParams(window.location.search);
    const o = {
      utm_source: q.get('utm_source') || '',
      utm_medium: q.get('utm_medium') || '',
      utm_campaign: q.get('utm_campaign') || '',
      referrer: document.referrer || '',
    };
    localStorage.setItem(ORIGIN_KEY, JSON.stringify(o));
    return o;
  } catch { return { utm_source: '', utm_medium: '', utm_campaign: '', referrer: '' }; }
};

// El mismo evento se le avisa a Meta (Facebook/Instagram) para que su
// publicidad aprenda a quién mostrarle los anuncios. Nombres estandar de Meta.
const META = {
  visit: 'PageView',
  product_view: 'ViewContent',
  add_to_cart: 'AddToCart',
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
    const body = JSON.stringify({ type, session_id: sessionId(), path: window.location.pathname, ...origin(), ...extra });
    // sendBeacon sobrevive al cambio de página (clave para medir la compra).
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API}/events`, new Blob([body], { type: 'application/json' }));
      return;
    }
    fetch(`${API}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* medir nunca debe estorbar */ }
};
