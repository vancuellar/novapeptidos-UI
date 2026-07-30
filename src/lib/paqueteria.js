/**
 * ¿DE QUÉ PAQUETERÍA ES ESTE NÚMERO DE GUÍA?
 *
 * ⛔ POR QUÉ EXISTE (Christián, 2026-07-30). Poner una guía eran tres pasos: abrir un
 * formulario, ELEGIR la paquetería de una lista y pegar el número. Elegir la paquetería
 * es trabajo que la máquina puede hacer sola —los formatos se distinguen— y equivocarse
 * ahí manda al cliente a rastrear su paquete al sitio equivocado.
 *
 * La detección es una SUGERENCIA, nunca una imposición: siempre queda el selector para
 * corregirla, y `seguro:false` avisa cuando el formato es ambiguo (10 dígitos los usan
 * varias). Nombres exactamente como los espera `CARRIER_TRACKING_URLS` del backend, que
 * es quien arma la liga de rastreo; si aquí se escribieran distinto, la liga saldría
 * vacía y el cliente se quedaría sin a dónde ir.
 */

// Los mismos nombres, y en el mismo orden, que enseña el selector.
export const PAQUETERIAS = [
  'FedEx', 'DHL', 'Estafeta', 'UPS', 'Paquete Express', 'Redpack', 'Correos de México',
];

// Se comparan siempre en MAYÚSCULAS y sin espacios ni guiones: la gente pega el número
// como se lo mandaron por WhatsApp, con espacios cada cuatro dígitos.
export const limpiarGuia = (valor) => String(valor || '').toUpperCase().replace(/[\s-]/g, '');

const REGLAS = [
  // 1Z + 16 caracteres es UPS y sólo UPS. No hay forma de confundirlo.
  { re: /^1Z[0-9A-Z]{16}$/, quien: 'UPS', seguro: true },
  // Formato postal universal (UPU): RR123456789MX. Correos de México.
  { re: /^[A-Z]{2}\d{9}MX$/, quien: 'Correos de México', seguro: true },
  { re: /^[A-Z]{2}\d{9}[A-Z]{2}$/, quien: 'Correos de México', seguro: false },
  // DHL eCommerce: JVGL… / JJD…
  { re: /^(JVGL|JJD)[0-9A-Z]+$/, quien: 'DHL', seguro: true },
  // Paquete Express marca sus guías con letras al frente.
  { re: /^(PQ|PE|PX)\d{6,}$/, quien: 'Paquete Express', seguro: true },
  { re: /^(RP|RED)\d{6,}$/, quien: 'Redpack', seguro: true },
  // FedEx: 12, 15, 20 o 22 dígitos. Ninguna otra de las que usamos llega a esos largos.
  { re: /^\d{12}$/, quien: 'FedEx', seguro: true },
  { re: /^\d{15}$/, quien: 'FedEx', seguro: true },
  { re: /^\d{20}$/, quien: 'FedEx', seguro: true },
  { re: /^\d{22}$/, quien: 'FedEx', seguro: true },
  // Estafeta alfanumérica de 22.
  { re: /^(?=.*[A-Z])[0-9A-Z]{22}$/, quien: 'Estafeta', seguro: true },
  // 11 dígitos: DHL (su waybill clásico).
  { re: /^\d{11}$/, quien: 'DHL', seguro: true },
  // ⚠️ 10 dígitos los usan Estafeta Y DHL. Se sugiere Estafeta —es la que más sale de
  // aquí— pero marcado como NO seguro para que la pantalla invite a confirmarla.
  { re: /^\d{10}$/, quien: 'Estafeta', seguro: false },
  // Redpack numérico de 9.
  { re: /^\d{9}$/, quien: 'Redpack', seguro: false },
];

/**
 * Devuelve { quien, seguro } o null si el número todavía no dice nada.
 * `quien` siempre es uno de PAQUETERIAS.
 */
export function detectarPaqueteria(numero) {
  const g = limpiarGuia(numero);
  if (g.length < 8) return null;          // demasiado corto: aún está tecleando
  for (const r of REGLAS) {
    if (r.re.test(g)) return { quien: r.quien, seguro: r.seguro };
  }
  return null;
}

export default detectarPaqueteria;
