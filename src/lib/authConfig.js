// Configuración de "Entrar con Google" y "Entrar con Outlook", a prueba de caídas.
//
// EL PROBLEMA QUE ESTO ARREGLA
// ---------------------------
// Los dos botones preguntaban al servidor, al vuelo, si estaban encendidos y
// con qué client_id. Si el servidor no contestaba, el `catch` no hacía nada y
// el botón simplemente NO SE DIBUJABA. El 30 de julio de 2026, con la API
// caída, la gente abrió /login y los dos botones se habían esfumado, sin una
// palabra de explicación. Parecía que la tienda los había quitado.
//
// LA SOLUCIÓN: tres fuentes, en orden de confianza.
//   1. El servidor, si contesta. Es la verdad, y se guarda para la próxima.
//   2. Lo último bueno que contestó, guardado en el navegador.
//   3. Los client_id horneados en el build, como último respaldo.
//
// Los client_id NO son secretos: viajan en la URL de Google y de Microsoft en
// cada inicio de sesión, y cualquiera los ve en las herramientas del navegador.
// El secreto de verdad (verificar la firma del token) vive en el servidor y
// nunca sale de ahí. Hornearlos aquí no abre ningún hueco.
//
// Con la API caída el login TERMINARÁ fallando —el token hay que verificarlo
// contra el servidor—, pero fallará con un mensaje claro de mantenimiento en
// lugar de desaparecer sin dejar rastro.

// Respaldo horneado en el build. Se puede sobreescribir con variables de
// entorno al construir, sin tocar el código.
const HORNEADO = {
  google: process.env.REACT_APP_GOOGLE_CLIENT_ID
    || '961192855720-9pqikhgl5p3vmcu69df9broh7jsfi4kj.apps.googleusercontent.com',
  microsoft: process.env.REACT_APP_MICROSOFT_CLIENT_ID
    || '5350236e-16b4-4c04-9173-dd0d6b8a1ef0',
};

const LLAVE = (proveedor) => `np_cfg_${proveedor}`;

/** Guarda la última respuesta buena del servidor. */
export const guardarConfig = (proveedor, cfg) => {
  if (!cfg || !cfg.client_id) return;
  try {
    localStorage.setItem(LLAVE(proveedor), JSON.stringify({
      enabled: cfg.enabled !== false,
      client_id: cfg.client_id,
      guardado: Date.now(),
    }));
  } catch { /* modo incógnito o almacenamiento lleno: no es grave */ }
};

/** Lo último que contestó el servidor, si es que contestó alguna vez. */
export const configCacheada = (proveedor) => {
  try {
    const crudo = localStorage.getItem(LLAVE(proveedor));
    if (!crudo) return null;
    const cfg = JSON.parse(crudo);
    return cfg?.client_id ? cfg : null;
  } catch { return null; }
};

/**
 * El client_id de respaldo: primero lo último bueno del servidor, y si nunca
 * hubo, el horneado en el build. Nunca devuelve vacío para un proveedor que
 * sabemos que existe.
 */
export const configDeRespaldo = (proveedor) => {
  const guardada = configCacheada(proveedor);
  if (guardada) return { ...guardada, deRespaldo: true };
  const horneado = HORNEADO[proveedor];
  return horneado
    ? { enabled: true, client_id: horneado, deRespaldo: true }
    : null;
};
