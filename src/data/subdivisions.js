// Las entidades federativas de México, el único país al que enviamos hoy
// (Christian, 2026-07-28).
//
// Por qué existe: el estado se tecleaba a mano y cada quien escribía lo suyo —
// "CDMX", "Cd. de México", "DF", "Distrito Federal" son la MISMA entidad y la
// paquetería las trata como cuatro. Con una lista cerrada el dato sale limpio y
// se puede agrupar por estado sin adivinar.
//
// Se guarda el NOMBRE COMPLETO, no la abreviatura: es lo que ya viven los pedidos
// viejos ("Yucatán") y lo que entiende cualquier guía de envío. Cambiar a códigos
// partiría el historial en dos.
//
// Solo México a propósito: el envío es nacional y no tiene caso mantener las
// divisiones de países a los que no mandamos nada. Cualquier otro país que quede
// en una dirección vieja del perfil sigue con texto libre, y así nadie se queda
// sin poder escribir su región.

// Las 32 entidades federativas. Se usan los nombres de uso común (los que trae
// una guía de envío), no los constitucionales largos: "Coahuila" y no "Coahuila
// de Zaragoza", porque es lo que el cliente busca al teclear.
const MX = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango',
  'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
  'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
];

export const SUBDIVISIONS = { MX };

/** La lista del país, o `null` si ese país va con texto libre. */
export const subdivisionsFor = (iso) => SUBDIVISIONS[(iso || '').toUpperCase()] || null;

/**
 * Traduce lo que ya estaba escrito a una opción de la lista.
 *
 * Hace falta porque los clientes de siempre tienen guardado "CDMX" o "D.F." y, si
 * el desplegable no lo reconoce, el campo aparece VACÍO y el cliente cree que se
 * le borró la dirección. Compara sin acentos ni puntos, y trae de la mano los
 * apodos que de verdad se usan.
 */
const ALIAS = {
  cdmx: 'Ciudad de México', df: 'Ciudad de México', 'distrito federal': 'Ciudad de México',
  'ciudad de mexico': 'Ciudad de México', 'mexico df': 'Ciudad de México',
  edomex: 'Estado de México', mexico: 'Estado de México', 'estado de mexico': 'Estado de México',
  'coahuila de zaragoza': 'Coahuila', 'michoacan de ocampo': 'Michoacán',
  'veracruz de ignacio de la llave': 'Veracruz', 'nuevo leon': 'Nuevo León',
  'queretaro de arteaga': 'Querétaro',
};

const plano = (s) => (s || '').toString().trim().toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\./g, '').replace(/\s+/g, ' ');

export const matchSubdivision = (iso, valor) => {
  const lista = subdivisionsFor(iso);
  if (!lista || !valor) return '';
  const buscado = plano(valor);
  const exacto = lista.find((s) => plano(s) === buscado);
  if (exacto) return exacto;
  const apodo = ALIAS[buscado];
  return apodo && lista.includes(apodo) ? apodo : '';
};
