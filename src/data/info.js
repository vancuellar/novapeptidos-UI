// Índice de las páginas de políticas y soporte (/info/*). Mismo esquema de
// secciones tipadas que las guías de "Aprende", renderizado por SectionRenderer.
// Términos y privacidad siguen viviendo en las traducciones (texto legal plano).

import envios from '@/data/info/envios';
import devoluciones from '@/data/info/devoluciones';
import calidad from '@/data/info/calidad';
import contacto from '@/data/info/contacto';
import soporte from '@/data/info/soporte';
import rastreo from '@/data/info/rastreo';

const PAGES = [envios, devoluciones, calidad, contacto, soporte, rastreo];

export const INFO_PAGES = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
export default INFO_PAGES;
