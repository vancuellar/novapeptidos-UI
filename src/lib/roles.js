// Papeles que SUMAN. María es distribuidora Y lleva la difusión: su rol
// principal no cambia; 'marketing' le llega en extra_roles. Esconder pestañas
// aquí es cortesía — la seguridad vive en el backend (403 fuera de difusión).

/** ¿Puede entrar a las pestañas de difusión (Embudo, Marketing, Anuncios)? */
export const tieneDifusion = (user) =>
  !!user && (['admin', 'marketing'].includes(user.role) || (user.extra_roles || []).includes('marketing'));

/** ¿Solo difusión? (no es admin: dentro del panel ve únicamente esas pestañas) */
export const soloDifusion = (user) =>
  !!user && user.role !== 'admin' && tieneDifusion(user);
