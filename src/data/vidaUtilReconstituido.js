// CUÁNTO AGUANTA UN VIAL YA MEZCLADO CON AGUA.
//
// Este archivo tiene UN solo número a propósito. Se investigó compuesto por
// compuesto (ver INVESTIGACION-VIDA-UTIL-RECONSTITUIDO.md, 2026-07-31) y el
// resultado fue que **no existe** un dato publicado de estabilidad en solución
// para casi nada de lo que vendemos: ni Bachem, ni GenScript, ni Sigma, ni
// AnaSpec publican días a 2-8 °C. Todos dicen "poco, congela alícuotas". El
// "4 a 6 semanas" que circula en tiendas de péptidos no tiene fuente localizable.
//
// Lo que SÍ tiene fuente es el otro reloj, el que además casi siempre gana: el
// del VIAL, no el del péptido. Desde el primer piquete al tapón, el vial es un
// contenedor multidosis abierto, y USP <797> lo corta en 28 días. Ese límite
// está respaldado por el ensayo de eficacia antimicrobiana USP <51>, y coincide
// con lo que la FDA aprueba para los productos reconstituidos comparables:
// Humatrope 28 días, Genotropin 28, Norditropin 4 semanas, Mounjaro 30.
//
// ⛔ NO metas aquí una tabla por compuesto sin fuente nueva. Es la misma
// trampa que ya se pagó con las dosis: cifras "por familia" que nadie podía
// respaldar. Si mañana aparece un dato publicado para un compuesto, se agrega
// en `EXCEPCIONES` con su URL y se dice de dónde salió.
//
// ⚠️ Los 56 días de Ozempic y los 30 de Saxenda NO se extrapolan: son plumas
// formuladas y selladas en fábrica, no un vial que uno reconstituye en casa.

export const VIDA_UTIL_DIAS = 28;
export const VIDA_UTIL_SEMANAS = 4;

// La fuente se enseña al cliente en los tres idiomas, así que se deja en
// nombres propios y sin prosa: lo que la envuelve ("De dónde sale este plazo:")
// vive en i18n y sí se traduce.
export const VIDA_UTIL_FUENTE = 'USP <797> · FDA: Humatrope, Genotropin, Norditropin';

// Con agua ESTÉRIL (la que no lleva conservador) el límite se desploma a 24 h.
// Es la diferencia real entre las dos aguas y la razón de vender la
// bacteriostática. Fuente: Genotropin — cartucho con conservador 28 días,
// MiniQuick sin conservador 24 horas.
export const VIDA_UTIL_AGUA_ESTERIL_DIAS = 1;

// Datos publicados que se apartan de la regla. Por ahora sólo uno, y es a la
// baja: la etiqueta de Egrifta (tesamorelina) dice desechar la solución si no
// se usa enseguida. La clave es el `slug` del catálogo.
export const EXCEPCIONES = {
  tesamorelina: { dias: 0, fuente: 'FDA: Egrifta SV' },
};

/**
 * Días que aguanta el vial de ESTE producto una vez mezclado, en refrigerador.
 * Devuelve también de dónde salió el número, porque se enseña al cliente.
 */
export const vidaUtilDe = (slug) => {
  const ex = slug && EXCEPCIONES[slug];
  if (ex) return { dias: ex.dias, semanas: ex.dias / 7, fuente: ex.fuente, esRegla: false };
  return { dias: VIDA_UTIL_DIAS, semanas: VIDA_UTIL_SEMANAS, fuente: VIDA_UTIL_FUENTE, esRegla: true };
};
