// LA ETIQUETA DE ENVÍO, DE UN BOTÓN A LA IMPRESORA.
//
// ⛔ POR QUÉ ESTE ARCHIVO (Christián, 2026-07-31): «¿Puedes hacer que recibamos la
// guía para imprimir en nuestro panel? Quiero manejar TODO desde nuestra app».
// Antes había un enlace crudo a la página de la paquetería, y sólo para el admin.
//
// Tres decisiones que conviene no deshacer:
//
//   1. EL PDF SE PIDE CON SESIÓN, no con una liga. Por eso se baja con `api` (que
//      lleva el token) como BLOB, y no se pone la URL en un `<a href>`: una etiqueta
//      trae el nombre y el domicilio completo del cliente, y el servidor es quien
//      decide si esta persona puede verla.
//
//   2. SE IMPRIME EN UN IFRAME, no abriendo una pestaña. Igual que la hoja de
//      cotización (`hojaCotizacion.js`): un documento limpio, sin el sitio alrededor,
//      y el diálogo de impresión sale solo. Un clic, no cinco.
//
//   3. SIEMPRE HAY PLAN B. Si el navegador no deja imprimir desde el iframe —Safari
//      con ciertos PDF, o un bloqueador—, queda la misma hoja abierta en pestaña
//      nueva para verla y guardarla. Nunca se queda alguien con el paquete en la
//      mano y sin papel.
import api from '@/lib/api';

/* Trae el PDF de la guía y devuelve una URL de blob (local, del navegador).
   `ruta` la decide quien llama: el admin la suya, el distribuidor la suya.

   ⛔ EL PDF PUEDE NO EXISTIR TODAVÍA. La paquetería contesta el número de rastreo al
   instante y publica el papel unos segundos después (pasó en la primera compra real).
   El servidor contesta 409 en ese caso; aquí se reintenta solo, avisando por
   `alEsperar` para que el botón diga «Generando…» en vez de mentir con un error.   */
export async function traerEtiqueta(ruta, { intentos = 3, espera = 4000, alEsperar } = {}) {
  for (let i = 0; i < intentos; i += 1) {
    try {
      const r = await api.get(ruta, { responseType: 'blob' });
      return URL.createObjectURL(r.data);
    } catch (e) {
      // 409 = «todavía se está generando». Cualquier otra cosa es un error de verdad
      // y se sube tal cual: reintentar un 403 sólo hace esperar a quien ya perdió.
      if (e.response?.status !== 409 || i === intentos - 1) throw e;
      alEsperar && alEsperar(i + 1);
      await new Promise((r2) => setTimeout(r2, espera));
    }
  }
  throw new Error('sin etiqueta');
}

/* IMPRIMIR. Devuelve true si se alcanzó a abrir el diálogo del navegador.

   El iframe NO se quita de inmediato a propósito: si muere antes de que la persona
   pique "Imprimir", el diálogo se cancela solo (le pasa a Safari). Se queda un minuto
   escondido y luego se recoge, junto con la URL del blob.                          */
export function imprimirEtiqueta(url) {
  return new Promise((resolve) => {
    const marco = document.createElement('iframe');
    marco.setAttribute('aria-hidden', 'true');
    marco.style.cssText =
      'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    let listo = false;
    const recoger = () => setTimeout(() => marco.remove(), 60000);
    const lanzar = () => {
      if (listo) return;
      listo = true;
      try {
        marco.contentWindow.focus();
        marco.contentWindow.print();
        resolve(true);
      } catch {
        resolve(false);
      }
      recoger();
    };
    marco.onload = lanzar;
    marco.onerror = () => { if (!listo) { listo = true; resolve(false); recoger(); } };
    // Plazo máximo: un PDF que no termina de pintarse no puede dejar el botón girando
    // para siempre. Si no cargó, se contesta que no y el que llama abre la pestaña.
    setTimeout(() => { if (!listo) { listo = true; resolve(false); recoger(); } }, 6000);
    document.body.appendChild(marco);
    marco.src = url;
  });
}

/* ¿ESTE PEDIDO TIENE ETIQUETA QUE IMPRIMIR? Misma regla que el servidor
   (`tiene_etiqueta` en _detalle_de_pedido): hay papel si la guía la compramos
   NOSOTROS. Una guía tecleada a mano no tiene PDF que traer, y ofrecer un botón que
   no puede cumplir es peor que no ofrecerlo.

   La ficha del pedido no usa esto —el servidor ya le manda el sí/no resuelto—; esto es
   para las pantallas del admin, que trabajan con el pedido crudo.                   */
/* ⛔ BASTA CON QUE HAYA NÚMERO DE GUÍA (Christián, 2026-08-05: «no puedo imprimir las
   guías, teníamos un botón específico para eso y ya no está»).

   Aquí se exigía además `label_provider`, con el razonamiento de que una guía tecleada
   a mano no tiene PDF. Es falso: el servidor le pregunta a la paquetería POR NÚMERO DE
   RASTREO, así que una guía comprada en la cuenta de la casa y capturada a mano —lo
   normal— sí tiene papel. El botón se escondía justo en los pedidos donde imprimir
   habría funcionado, y desde afuera eso se ve igual que una app rota.

   Si de verdad no hay PDF, el servidor contesta 409 `estado: manual` y el botón lo
   explica en una línea. Es el gemelo de `server._detalle_de_pedido.tiene_etiqueta`. */
export const hayEtiqueta = (pedido) => Boolean(
  pedido && (pedido.tiene_etiqueta || pedido.label_url
    || String(pedido.tracking_number || '').trim()));

/* PLAN B: la misma hoja en una pestaña, para verla y guardarla. */
export function abrirEtiqueta(url) {
  window.open(url, '_blank', 'noopener');
}
