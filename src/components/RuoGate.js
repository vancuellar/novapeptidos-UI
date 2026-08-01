import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { BrandMark } from '@/components/BrandLogo';
import { useLanguage } from '@/context/LanguageContext';

// Aviso de uso exclusivo en investigación y de mayoría de edad, la primera vez
// que alguien entra al sitio. Es una puerta de verdad: no se puede cerrar ni
// esquivar, hay que aceptar para seguir. Se recuerda en el navegador, así que
// solo aparece una vez por dispositivo.
const STORAGE_KEY = 'exygen_ruo_ack';

/**
 * Cuándo aceptó esta persona la puerta (ISO), o '' si no hay rastro.
 *
 * Lo usa el checkout: el pedido guarda esa constancia. Antes el checkout volvía a
 * pedir la MISMA aceptación con una casilla en letra chica —y sin marcarla el botón
 * de pagar parecía muerto—, así que la casilla se quitó y quedó esto, que es lo
 * único que de verdad aportaba: la prueba de que aceptó y cuándo.
 */
// ⛔ EL AVISO SE ACEPTA UNA VEZ Y YA. NO SE PREGUNTA CADA VISITA.
//
// Christián, 2026-08-01: "no debería haber necesidad de picarle a la cajita
// cada vez que entro". Tenía razón y eran DOS fallas encadenadas:
//
//   1. `accept()` guardaba en `sessionStorage` cuando `localStorage` estaba
//      bloqueado, pero la comprobación de arranque SÓLO miraba `localStorage`.
//      Quien navegara en privado, o con las cookies restringidas, aceptaba y
//      el aviso le volvía a salir al instante siguiente.
//   2. Y lo que pega a casi todo nuestro tráfico, que es iPhone: **Safari borra
//      el `localStorage` a los 7 días** de no volver al sitio. El cliente que
//      compra una vez al mes se topaba la puerta SIEMPRE.
//
// Por eso ahora se deja rastro en tres lados y se acepta cualquiera de ellos.
// La cookie de primera parte es la que sobrevive a Safari; las otras dos se
// quedan porque una cookie se puede bloquear por separado.
const COOKIE_DIAS = 365;

const leerCookie = () => {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + STORAGE_KEY + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  } catch {
    return '';
  }
};

const escribirCookie = (valor) => {
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(valor)}; Max-Age=${COOKIE_DIAS * 24 * 60 * 60}; Path=/; SameSite=Lax${secure}`;
  } catch { /* sin cookies: quedan los otros dos */ }
};

const leerDe = (almacen) => {
  try { return almacen.getItem(STORAGE_KEY) || ''; } catch { return ''; }
};

export const ruoAcceptedAt = () => leerDe(localStorage) || leerDe(sessionStorage) || leerCookie();

// No se puede exigir aceptar algo que no se deja leer: en estas rutas el aviso
// NO se muestra, para que Terminos y Privacidad sean legibles aunque nadie haya
// aceptado todavia. Dentro del aviso se enlazan en pestana nueva.
const ALWAYS_READABLE = ['/info/terminos', '/info/privacidad'];
const BASE = process.env.PUBLIC_URL || '';

const RuoGate = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [accepted, setAccepted] = useState(true);   // se asume aceptado hasta comprobar
  const [checked, setChecked] = useState(false);    // la casilla: sin marcar no hay botón

  useEffect(() => {
    // Se pregunta por los TRES rastros, no sólo por localStorage: es justo lo
    // que hacía que el aviso volviera a salir.
    const ya = ruoAcceptedAt();
    setAccepted(!!ya);
    // Si aceptó antes de que existiera la cookie, se le pone ahora para que no
    // le vuelva a salir cuando Safari le limpie el localStorage.
    if (ya && !leerCookie()) escribirCookie(ya);
  }, []);

  const open = !accepted && !ALWAYS_READABLE.includes(pathname);

  // Mientras la puerta está abierta se bloquea el scroll del fondo: si no, se
  // puede leer y navegar el sitio por detrás del aviso.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const accept = () => {
    // Se guarda la FECHA, no un "sí": es la constancia que después viaja en el
    // pedido. Si el navegador no deja escribir en localStorage se intenta en la
    // sesión, para no perder el rastro de quien navega en modo privado.
    const cuando = new Date().toISOString();
    // Se escribe en los tres, sin depender de que ninguno funcione: basta con
    // que UNO sobreviva para no volver a preguntarle.
    try { localStorage.setItem(STORAGE_KEY, cuando); } catch { /* bloqueado */ }
    try { sessionStorage.setItem(STORAGE_KEY, cuando); } catch { /* bloqueado */ }
    escribirCookie(cuando);
    setAccepted(true);
  };

  if (!open) return null;

  return (
    // TAMAÑO: este aviso tiene que caber ENTERO, sin scroll, en 320x568 (el
    // teléfono más chico que existe). No es capricho de diseño —
    //
    //   Hasta el 2026-07-31 medía 970 px: un intro largo, tres puntos con icono
    //   y una casilla que repetía los tres puntos. En un iPhone SE el botón de
    //   "Entiendo y acepto" quedaba FUERA de la pantalla y, como el aviso
    //   bloquea el scroll del fondo, no había forma de bajar: el sitio entero
    //   era inalcanzable en esos teléfonos. Ese día Christian pidió además
    //   copiar la brevedad del aviso de Certified (el suyo mide 343 px).
    //
    // Quedan CUATRO cosas y ninguna más: qué es esto, la edad, la casilla y el
    // botón. Si añades un renglón, vuelve a medirlo en 320x568.
    // La capa scrollea igual (`overflow-y-auto` + `items-start`) como red de
    // seguridad para tipografías grandes del sistema; el recuadro se centra
    // solo cuando sobra alto (`my-auto`).
    <div
      className="fixed inset-0 z-[100] overflow-y-auto flex items-start justify-center px-4 py-5 bg-background/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ruo-gate-title"
      data-testid="ruo-gate"
    >
      <div className="w-full max-w-sm my-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-md)] p-5">
        <BrandMark className="h-6 mx-auto mb-4" noMolecule />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-2.5 py-0.5 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--primary))]">
          {t('ruo.gate.badge')}
        </span>

        <h2 id="ruo-gate-title" className="font-heading text-xl font-bold tracking-tight mt-2">
          {t('ruo.gate.title')}
        </h2>
        <p className="text-[13px] text-muted-foreground leading-snug mt-1.5">
          {t('ruo.gate.intro')}
        </p>

        {/* Aceptar es un acto, no un clic de paso: la casilla deja constancia
            de la edad y del propósito, que es lo que viaja con el pedido. */}
        <label className="mt-3.5 flex items-start gap-2.5 cursor-pointer rounded-xl border border-border bg-secondary/40 p-3" data-testid="ruo-gate-checkbox">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)}
            className="h-5 w-5 mt-px shrink-0 accent-[hsl(var(--primary))] cursor-pointer" />
          <span className="text-[13px] leading-snug font-medium">{t('ruo.gate.checkbox')}</span>
        </label>

        <button onClick={accept} disabled={!checked} data-testid="ruo-gate-accept"
          className="btn-resend w-full mt-3 disabled:opacity-40 disabled:pointer-events-none">
          {t('ruo.gate.accept')}
        </button>

        {/* En pestana nueva: asi se pueden leer sin perder el aviso ni tener
            que aceptar a ciegas lo que todavia no se ha leido. */}
        <p className="text-[11px] text-muted-foreground leading-snug text-center mt-3">
          {t('ruo.gate.termsPre')}{' '}
          <a href={`${BASE}/info/terminos`} target="_blank" rel="noreferrer" data-testid="ruo-gate-terms"
            className="text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-0.5">
            {t('auth.terms.service')}<ExternalLink className="h-2.5 w-2.5" />
          </a>
          {' '}{t('auth.terms.and')}{' '}
          <a href={`${BASE}/info/privacidad`} target="_blank" rel="noreferrer" data-testid="ruo-gate-privacy"
            className="text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-0.5">
            {t('auth.terms.privacy')}<ExternalLink className="h-2.5 w-2.5" />
          </a>
        </p>

        <a href="https://www.google.com" className="block text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors mt-2" data-testid="ruo-gate-leave">
          {t('ruo.gate.leave')}
        </a>
      </div>
    </div>
  );
};

export default RuoGate;
