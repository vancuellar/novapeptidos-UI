import { useEffect, useState } from 'react';
import api from '@/lib/api';

/**
 * QUÉ PRODUCTOS NO SE PINTAN — por dato, no por código.
 *
 * Christián, 2026-08-05: «esconde todos los otros compuestos de los que no tenemos
 * stock».
 *
 * ⛔ EL PROBLEMA QUE RESUELVE. El catálogo del sitio vive en `fallbackCatalog.js`,
 * dentro del bundle: hasta hoy, esconder un producto obligaba a BORRARLO A MANO de
 * ese archivo y volver a desplegar. Así se escondieron los 17 de antes. Con esto,
 * esconder vuelve a ser un dato: se marca en el Panel y el sitio deja de pintarlo en
 * la siguiente carga.
 *
 * ⛔ FALLA ABIERTO, A PROPÓSITO. Mientras la respuesta no llega —y para siempre, si
 * el servidor no contesta— el conjunto va VACÍO, o sea que no se esconde nada y la
 * tienda se ve completa. Enseñar de más un segundo es infinitamente mejor que
 * enseñar una tienda vacía por un error nuestro. Es la misma regla de vender siempre.
 */
export default function useOcultos() {
  const [ocultos, setOcultos] = useState(() => new Set());

  useEffect(() => {
    let vivo = true;
    api.get('/catalogo/ocultos')
      .then((r) => {
        if (!vivo) return;
        const d = r.data || {};
        // Se guardan las TRES formas de nombrar un producto (sku, slug e id) en un
        // solo conjunto: cada pantalla tiene a la mano una distinta, y así ninguna
        // se queda sin poder preguntar.
        setOcultos(new Set([...(d.skus || []), ...(d.slugs || []), ...(d.ids || [])]));
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  return ocultos;
}

/** ¿Este producto está escondido? Pregunta por sus tres nombres posibles. */
export const estaOculto = (ocultos, p) => Boolean(
  p && ocultos && ocultos.size && (
    (p.sku && ocultos.has(p.sku))
    || (p.slug && ocultos.has(p.slug))
    || (p.id && ocultos.has(p.id))
    || (p.product_id && ocultos.has(p.product_id))));
