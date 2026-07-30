// ¿Está viva la API? Un solo lugar donde preguntarlo.
//
// El 30 de julio de 2026 el backend se cayó en bucle y la página quedó
// inservible: sin login, sin catálogo, sin ventas. La regla de Christián es
// que eso NO vuelva a pasar — que el backend se caiga no justifica que la
// gente no pueda usar la página.
//
// Este módulo es el termómetro. No hace peticiones por su cuenta: el
// interceptor de `api.js` le avisa cuando una llamada muere por red y cuando
// vuelve a haber respuesta. El aviso global escucha aquí.

// Cuántos fallos seguidos de red hacen falta para dar la alarma. Uno solo no:
// una petición perdida en un túnel del metro no es "la API está caída".
const FALLOS_PARA_LA_ALARMA = 2;

let fallosSeguidos = 0;
let caida = false;
const oyentes = new Set();

const avisar = () => {
  oyentes.forEach((fn) => {
    try { fn(caida); } catch { /* un oyente roto no tumba a los demás */ }
  });
};

/** La llamada murió sin respuesta del servidor (red, DNS, timeout, 502/503/504). */
export const registrarFallo = () => {
  fallosSeguidos += 1;
  if (!caida && fallosSeguidos >= FALLOS_PARA_LA_ALARMA) {
    caida = true;
    avisar();
  }
};

/** Hubo respuesta del servidor: está vivo, aunque el código sea 400 o 401. */
export const registrarExito = () => {
  fallosSeguidos = 0;
  if (caida) {
    caida = false;
    avisar();
  }
};

export const apiCaida = () => caida;

/** Devuelve la función para darse de baja. */
export const suscribirse = (fn) => {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
};

// Solo para las pruebas: volver a empezar.
export const _reiniciar = () => {
  fallosSeguidos = 0;
  caida = false;
  oyentes.clear();
};
