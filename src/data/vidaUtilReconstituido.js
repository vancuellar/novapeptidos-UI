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
// ─────────────────────────────────────────────────────────────────────────────
// SEGUNDA VUELTA (2026-08-01). SE BUSCÓ SUBIRLO A 6-8 SEMANAS Y NO SE PUDO.
//
// Christián lo pidió con razón: los 28 días salían de un límite MICROBIOLÓGICO
// y nadie había investigado a fondo la estabilidad QUÍMICA en refrigeración. Se
// investigó a fondo (ver TITULACION-Y-VIDA-UTIL-2026-08-01.md). El número se
// queda en 28, ahora por cuatro motivos, cada uno suficiente por sí solo:
//
//  1. **USP <797> §14.5 y §16.1 no lo dejan subir, ni con estudios.** Un
//     preparado multidosis, una vez picado, no se usa más allá de su fecha
//     asignada **o 28 días, lo que resulte MENOR**. La propia hoja de USP sobre
//     fechas de caducidad explica que uno de los cambios de fondo del capítulo
//     fue justamente quitar la posibilidad de extenderlas. Los 90 días
//     refrigerados de Categoría 3 son vida útil SIN ABRIR; en cuanto se pica el
//     tapón, el reloj vuelve a 28.
//  2. **Los 56 días que todo el mundo cita son de Ozempic, que es otro
//     producto**: solución acuosa ya formulada, con fenol, amortiguadores y un
//     expediente de estabilidad completo detrás. No es un vial que uno
//     reconstituye en casa. De tirzepatida ni siquiera existe una fecha de uso
//     aprobada en contenedor multidosis: Mounjaro se vende en pluma y vial de
//     UNA sola dosis.
//  3. **El precedente más parecido a lo que vendemos apunta hacia ABAJO.**
//     Omnitrope 5.8 mg es una hormona peptídica liofilizada que el propio
//     paciente reconstituye con agua bacteriostática (alcohol bencílico) en un
//     vial multidosis — el caso idéntico al nuestro. La FDA le dio **21 días**,
//     no 28 ni 42.
//     https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=58d84ffa-4056-4e36-ad67-7bd4aef444a5
//  4. **Los estudios de 56 y 90 días no existen.** El más citado ("Patel et al.,
//     Int J Pharm Compd 2023: la tirzepatida pierde <2 % en 30 días") ⛔ ES UNA
//     CITA FALSA: no está en PubMed, y ningún artículo de estabilidad que esa
//     revista publicó en 2023 trata de un GLP-1. Sólo vive en sitios de
//     afiliados. NO SE USA JAMÁS, ni "como referencia".
//
// ⚠️ Y UN MATIZ QUE CORTA PARA EL OTRO LADO: tampoco se puede decir "el péptido
// está perfecto, lo único que se acaba es la limpieza del vial". De la fuerza de
// estos péptidos a 2-8 °C nadie publicó un número —no hay un solo estudio con
// brazo en refrigeración—, y el alcohol bencílico del agua bacteriostática,
// según la literatura de agregación de proteínas, EMPEORA la química en vez de
// mejorarla (Roy S et al., J Pharm Sci 2005;94(2):382-96, PMID 15614819). Los 28
// días son el único plazo defendible por los dos lados: es el que tiene fuente y
// es el que nadie ha demostrado que se pueda estirar.
//
// ⛔ NO CONGELAR, Y NO RECOMENDARLO. Ninguna etiqueta de la FDA permite congelar
// una solución ya reconstituida —Ozempic, Victoza, Byetta y Forteo llegan a
// decir "no lo use si se congeló"—, el agua bacteriostática no lleva
// crioprotector, y los ciclos de congelar y descongelar agregan proteína
// (Jain K et al., Sci Rep 2021;11:11332, PMID 34059716: hasta 14.4 % de agregado
// en tres ciclos). Hasta el 2026-08-01 la calculadora sugería alicuotar y
// congelar; se quitó por esto. ⚠️ /aprende/conservacion todavía lo recomienda:
// hay que revisarlo aparte.
// ─────────────────────────────────────────────────────────────────────────────
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
// MiniQuick sin conservador 24 horas. Mismo patrón en Fuzeon: sin conservador,
// reconstituido, 24 horas.
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
