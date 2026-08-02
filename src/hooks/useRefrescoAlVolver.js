import { useEffect, useRef } from 'react';

/* REFRESCAR AL VOLVER A LA PESTAÑA (Christián, 2026-08-02: «I want the panels
   to refresh alone when you return to the tab»).

   El caso que lo pidió: el admin borra un pedido, y el panel del distribuidor
   que quedó abierto en otra pestaña lo seguía enseñando hasta recargar a mano.
   Los datos viven en UNA tabla — lo que faltaba era volver a preguntarle.

   Escucha `focus` y `visibilitychange` con un freno de 8 segundos: cambiar de
   pestaña rápido dispara varios eventos seguidos y sin freno se ametralla la
   API con peticiones idénticas. */
export default function useRefrescoAlVolver(refrescar, minimoMs = 8000) {
  const ultimaVez = useRef(Date.now());
  // La última versión del callback, sin re-suscribir los listeners en cada
  // pintado (el callback captura estado que cambia, los eventos no).
  const cb = useRef(refrescar);
  cb.current = refrescar;
  useEffect(() => {
    const alVolver = () => {
      if (document.visibilityState !== 'visible') return;
      const ahora = Date.now();
      if (ahora - ultimaVez.current < minimoMs) return;
      ultimaVez.current = ahora;
      cb.current();
    };
    window.addEventListener('focus', alVolver);
    document.addEventListener('visibilitychange', alVolver);
    return () => {
      window.removeEventListener('focus', alVolver);
      document.removeEventListener('visibilitychange', alVolver);
    };
  }, [minimoMs]);
}
