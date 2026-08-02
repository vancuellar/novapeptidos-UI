// LA ESCALERA: SUBIR LA DOSIS POR ESCALONES, NO QUEDARSE EN UNO.
//
// Por qué existe este archivo (Christián, 2026-08-01): «Te pedí y es SUPER
// importante que consideres la titulación. El usuario empieza con X cantidad y
// DEBE ir aumentando a Y cantidad según sus metas.»
//
// Hasta hoy la calculadora enseñaba tres niveles sueltos —inicial, típica,
// avanzada— y calculaba la duración del vial de CADA UNO por separado, como si
// la persona fuera a quedarse toda la vida en el mismo escalón. Nadie hace eso.
// La persona real empieza abajo, se queda unas semanas, sube, se queda otras
// semanas, sube otra vez. Y un vial rinde muy distinto si vas subiendo:
//
//   Retatrutida, vial de 120 mg, una vez por semana
//     · clavado en 2 mg  → 60 semanas
//     · clavado en 12 mg → 10 semanas
//     · subiendo 2 → 4 → 8 → 12, cuatro semanas en cada escalón → 17 semanas
//
// Ninguno de los dos primeros números es el que vive esa persona. El tercero sí.
//
// ⛔ MISMA REGLA QUE LAS DOSIS: SIN CALENDARIO ANOTADO, NO HAY PLAN.
// Este archivo es SOLO aritmética. No inventa escalones, no rellena semanas que
// nadie publicó, no deduce el calendario de una familia de péptidos. Si el
// producto no trae `start_levels.escalera` en el catálogo, todo esto se apaga
// solo y la calculadora sigue dando la duración por nivel, como antes.

// CUÁNTAS APLICACIONES CABEN EN UNA SEMANA, según la frecuencia del catálogo.
// Con esto y las dosis que rinde el vial sale cuánto le dura al cliente.
//
// Tres frecuencias se quedan FUERA a propósito (null): `as_needed` no tiene
// ritmo, `mt` cambia de ritmo a mitad del camino y `daily_cycle` alterna ciclos
// con descansos. En esos tres el vial se gasta a un ritmo que no podemos
// prometer, y un número inventado aquí se convierte en un consejo de compra
// equivocado. Se sigue diciendo cuántas dosis rinde, que eso sí es aritmética.
export const DOSIS_POR_SEMANA = {
  weekly: 1,
  daily: 7,
  daily_2x: 14,
  '2x_week': 2,
  '3x_week': 3,
  eod: 3.5,
  as_needed: null,
  mt: null,
  daily_cycle: null,
};

// Un escalón vale para la cuenta si trae una dosis que se pueda sumar. Las
// `semanas` sí pueden faltar en el ÚLTIMO escalón: ese es el de mantenimiento,
// donde uno se queda, y por definición no tiene fecha de salida.
const pasoValido = (p) => p && Number(p.dosis) > 0;

/**
 * La escalera del producto, ya normalizada, o `null` si no la tiene.
 *
 * `levels` es el `start_levels` del catálogo. Se exige que traiga:
 *   · `escalera.pasos`  — al menos dos escalones con dosis
 *   · `escalera.quien`  — quién lo publica (se le enseña al cliente)
 * Sin eso no hay plan: preferimos el hueco a una escalera anónima.
 */
export const escaleraDe = (levels, freqProducto) => {
  const e = levels && levels.escalera;
  if (!e || !Array.isArray(e.pasos)) return null;
  const pasos = e.pasos.filter(pasoValido);
  if (pasos.length < 2 || !e.quien) return null;
  const unit = e.unit || levels.unit || 'mg';
  const freq = e.freq || freqProducto || '';
  return {
    unit,
    freq,
    quien: e.quien,
    tipo: e.tipo || 'manual',      // 'etiqueta' | 'ensayo' | 'manual'
    fuente: e.fuente || '',
    aviso: e.aviso || '',
    pasos: pasos.map((p, i) => ({
      dosis: Number(p.dosis),
      // El último escalón es donde uno se queda. Aunque el dato traiga semanas,
      // la cuenta lo trata como abierto: si sobra vial, se sigue gastando ahí.
      semanas: i === pasos.length - 1 ? null : (Number(p.semanas) > 0 ? Number(p.semanas) : null),
      nota: p.nota || '',
    })),
  };
};

// Los mg que pesa una aplicación de ese escalón (todo se contabiliza en mg,
// que es como viene el vial).
//
// Sólo se sabe convertir mg y mcg. Las UI (somatropina) NO se convierten: cada
// fabricante tiene su propia equivalencia y adivinarla aquí sería exactamente el
// tipo de cifra sin fuente que este catálogo dejó de publicar. Para esos
// productos se enseña el plan, pero no se promete una duración de vial.
const mgDe = (dosis, unit) => {
  if (unit === 'mg') return dosis;
  if (unit === 'mcg') return dosis / 1000;
  return null;
};

/**
 * EL PLAN, sin mirar el vial: en qué semana empieza y termina cada escalón.
 *
 * Devuelve `[{ dosis, unit, semanas, desde, hasta }]`, donde `hasta` es `null`
 * en el último (ahí se queda). Es lo que se le enseña al cliente en cristiano:
 * «semanas 1 a 4: 2 mg · semanas 5 a 8: 4 mg · de la 13 en adelante: 12 mg».
 */
export const planDeEscalera = (escalera) => {
  if (!escalera) return [];
  let semana = 1;
  return escalera.pasos.map((p) => {
    const desde = semana;
    const hasta = p.semanas ? semana + p.semanas - 1 : null;
    if (p.semanas) semana += p.semanas;
    return { dosis: p.dosis, unit: escalera.unit, semanas: p.semanas, desde, hasta, nota: p.nota };
  });
};

/**
 * CUÁNTO DURA EL VIAL SI VAS SUBIENDO, que es la pregunta de verdad.
 *
 * Se recorre escalón por escalón descontando del vial lo que se gasta en cada
 * uno. Si el vial se acaba a media escalera, se dice hasta dónde alcanzó: no se
 * redondea hacia arriba ni se promete un escalón que no se va a poder pagar.
 *
 * @param escalera  la que devuelve `escaleraDe`
 * @param vialMg    tamaño del vial en mg
 * @returns null si no se puede contar (frecuencia sin ritmo fijo, vial vacío),
 *          o `{ semanas, dias, tramos, alcanzaFinal, semanasDeSubida, aplicaciones }`
 */
export const duracionDeEscalera = (escalera, vialMg) => {
  if (!escalera) return null;
  const porSemana = DOSIS_POR_SEMANA[escalera.freq];
  const total = Number(vialMg);
  if (!porSemana || !(total > 0)) return null;
  if (mgDe(1, escalera.unit) == null) return null;   // unidad que no sabemos convertir

  let restante = total;
  let semanas = 0;
  let aplicaciones = 0;
  let semanasDeSubida = 0;          // lo que tarda en llegar al último escalón
  const tramos = [];

  for (let i = 0; i < escalera.pasos.length; i++) {
    const paso = escalera.pasos[i];
    const porDosis = mgDe(paso.dosis, escalera.unit);
    if (!(porDosis > 0)) continue;
    const ultimo = i === escalera.pasos.length - 1;

    // Cuántas aplicaciones pide este escalón. El último no pide un número: pide
    // "todo lo que quede".
    const pedidas = ultimo ? Infinity : Math.round(paso.semanas * porSemana);
    const posibles = Math.floor(restante / porDosis + 1e-9);
    const hechas = Math.min(pedidas, posibles);

    if (hechas > 0) {
      const semanasTramo = hechas / porSemana;
      tramos.push({
        dosis: paso.dosis,
        unit: escalera.unit,
        desde: semanas + 1,
        semanas: semanasTramo,
        aplicaciones: hechas,
        completo: hechas === pedidas || ultimo,
      });
      semanas += semanasTramo;
      aplicaciones += hechas;
      restante -= hechas * porDosis;
    }
    if (!ultimo) semanasDeSubida = semanas;
    if (posibles <= pedidas) break;      // aquí se acabó el vial
  }

  const ultimoTramo = tramos[tramos.length - 1];
  return {
    semanas,
    dias: semanas * 7,
    tramos,
    aplicaciones,
    // ¿Le alcanza siquiera para llegar a la dosis en la que se va a quedar?
    alcanzaFinal: Boolean(ultimoTramo && ultimoTramo.dosis === escalera.pasos[escalera.pasos.length - 1].dosis),
    semanasDeSubida,
    mgSobrante: restante,
  };
};

/**
 * Cuánto dura el vial a UNA dosis fija (lo de siempre). Vive aquí para que la
 * cuenta de la escalera y la de la dosis fija se prueben en el mismo lugar y no
 * se separen sin que nadie se dé cuenta.
 */
export const duracionADosisFija = ({ vialMg, dosisMcg, freq }) => {
  const porSemana = DOSIS_POR_SEMANA[freq];
  const dosisPorVial = dosisMcg > 0 ? Math.floor((Number(vialMg) * 1000) / dosisMcg) : 0;
  if (!porSemana || !dosisPorVial) return null;
  const semanas = dosisPorVial / porSemana;
  return { semanas, dias: semanas * 7, dosisPorVial };
};
