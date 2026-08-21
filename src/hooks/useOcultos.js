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

/**
 * EL CATÁLOGO DEL SITIO ESTÁ AGRUPADO POR FAMILIA, y ahí estuvo el error.
 *
 * `fallbackCatalog` no guarda un renglón por presentación: guarda UNA "Retatrutida"
 * con nueve variantes dentro. Esa familia no tiene `sku`, y su `slug` es
 * `retatrutida` — mientras que lo que se esconde son las PRESENTACIONES
 * (`RETATRUTIDA-5MG`, slug `retatrutida-5-mg`). Preguntar por la familia no acertaba
 * nunca, y el catálogo seguía pintando los 97 productos como si nada.
 *
 * Lo correcto es filtrar POR DENTRO:
 *   · se quitan las variantes escondidas;
 *   · si no queda ninguna, la familia entera desaparece;
 *   · y si quedan algunas, se recalcula el rango que anuncia («5 mg – 120 mg» sería
 *     mentira cuando sólo quedan tres) y el precio de entrada.
 */
export function filtrarCatalogo(productos, ocultos) {
  if (!ocultos || !ocultos.size) return productos;
  const out = [];
  for (const p of productos || []) {
    const variantes = p.variants || [];
    if (!variantes.length) {
      if (!estaOculto(ocultos, p)) out.push(p);
      continue;
    }
    const vivas = variantes.filter((v) => !estaOculto(ocultos, v));
    if (!vivas.length) continue;                       // familia entera escondida
    if (vivas.length === variantes.length) { out.push(p); continue; }
    const precios = vivas.map((v) => v.price).filter((x) => x > 0);
    out.push({
      ...p,
      variants: vivas,
      price: precios.length ? Math.min(...precios) : p.price,
      presentation: vivas.length === 1
        ? vivas[0].presentation
        : `${vivas[0].presentation} – ${vivas[vivas.length - 1].presentation}`,
    });
  }
  return out;
}
