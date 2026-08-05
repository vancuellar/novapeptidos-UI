/* TURNSTILE — el escudo antibots del checkout, sin que el cliente se entere.
 *
 * Christián, 2026-08-05, después de los pedidos de broma («Hola», hola@gmail.com,
 * teléfono 123-456-7890): «entrale ahora pues».
 *
 * ⛔ NO ES UN CAPTCHA. Nadie tiene que buscar semáforos en fotos ni escribir letras
 * torcidas. Cloudflare mira cómo se comporta el navegador y entrega un `token` solo,
 * en silencio. Lo normal es que el cliente no vea absolutamente nada.
 *
 * ⛔⛔ Y SI ALGO FALLA, LA COMPRA SIGUE. Es lo mismo que hace el servidor
 * (`turnstile.py` falla abierto) y por la misma razón: la regla madre es VENDER
 * SIEMPRE. Si el guion de Cloudflare no carga, si tarda, o si no hay sitekey
 * configurada, esto devuelve cadena vacía y el checkout continúa como si nada. El
 * servidor decidirá qué hacer con un pedido sin token — y lo que hace es MARCARLO,
 * no rechazarlo.
 *
 * Sin `REACT_APP_TURNSTILE_SITEKEY` el módulo entero es un no-op: el sitio se
 * comporta exactamente como antes de que esto existiera. Encenderlo es poner una
 * variable, no reescribir el checkout.
 */

const SITEKEY = process.env.REACT_APP_TURNSTILE_SITEKEY || '';
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

// Cuánto se le espera a Cloudflare antes de seguir sin token. Corto: esto corre con
// el cliente mirando el botón de pagar, y un escudo no puede ser el cuello de una venta.
const ESPERA_MAX_MS = 6000;

let cargando = null;

export const turnstileEncendido = () => Boolean(SITEKEY);

/** Mete el guion de Cloudflare una sola vez. Nunca revienta hacia arriba. */
function cargarGuion() {
  if (window.turnstile) return Promise.resolve(true);
  if (cargando) return cargando;
  cargando = new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);      // sin escudo, pero con tienda
    document.head.appendChild(s);
  });
  return cargando;
}

/**
 * Un token fresco, o cadena vacía si no se pudo.
 *
 * Se pide EN EL MOMENTO de mandar el pedido y no al abrir la página: los tokens de
 * Turnstile caducan a los 5 minutos, y alguien que llena su dirección con calma tarda
 * más que eso. Pedirlo al abrir era garantizar que llegara vencido justo a quien se
 * toma su tiempo — o sea, al cliente cuidadoso.
 */
export async function tokenDeTurnstile() {
  if (!SITEKEY) return '';
  try {
    const listo = await cargarGuion();
    if (!listo || !window.turnstile) return '';
    return await new Promise((resolve) => {
      // El reloj corre pase lo que pase: si Cloudflare no contesta, se sigue sin token.
      const reloj = setTimeout(() => resolve(''), ESPERA_MAX_MS);
      const fin = (valor) => { clearTimeout(reloj); resolve(valor || ''); };
      // Un contenedor propio y oculto: no ocupa lugar ni mueve el diseño del checkout.
      const caja = document.createElement('div');
      caja.style.display = 'none';
      document.body.appendChild(caja);
      try {
        window.turnstile.render(caja, {
          sitekey: SITEKEY,
          callback: (t) => { fin(t); caja.remove(); },
          'error-callback': () => { fin(''); caja.remove(); },
          'timeout-callback': () => { fin(''); caja.remove(); },
        });
      } catch (e) {
        caja.remove();
        fin('');
      }
    });
  } catch (e) {
    return '';                              // jamás detiene una compra
  }
}
