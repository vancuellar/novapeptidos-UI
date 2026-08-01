import { useEffect, useState } from 'react';

// ¿Estamos en teléfono?
//
// Christián pidió adelgazar la portada SOLO en móvil (2026-07-31): en escritorio
// se queda exactamente igual. El corte es 1024 px porque ése es el punto donde la
// portada YA cambia de composición: el hero pasa a dos columnas (`lg:` de Tailwind)
// y las rejillas se abren. Por debajo de 1024 la página ya venía apilada — o sea,
// "móvil" en el sentido en que la ve el visitante.
//
// Se resuelve en JavaScript y no con `hidden lg:block` a propósito: las secciones
// que se quitan traen SIETE fotos de laboratorio (402 KB). Con `display:none` el
// navegador todavía puede pedirlas; si no están en el DOM, no las pide nunca.
//
// Durante el prerender (que corre en escritorio) devuelve `false`, así que el HTML
// que ve Google sigue trayendo la portada completa. Nada de SEO se pierde.
export const CORTE_MOVIL = 1024;

export default function useEsMovil(corte = CORTE_MOVIL) {
  const consulta = `(max-width: ${corte - 1}px)`;
  const [esMovil, setEsMovil] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(consulta).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(consulta);
    const alCambiar = (e) => setEsMovil(e.matches);
    setEsMovil(mq.matches);
    // `addEventListener` no existe en Safari viejo; `addListener` sí.
    if (mq.addEventListener) mq.addEventListener('change', alCambiar);
    else mq.addListener(alCambiar);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', alCambiar);
      else mq.removeListener(alCambiar);
    };
  }, [consulta]);

  return esMovil;
}
