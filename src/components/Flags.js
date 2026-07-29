import React from 'react';

// El logo OFICIAL de WhatsApp (Christian, 2026-07-28). Lucide no lo trae —su
// MessageCircle es un globito genérico— y el logo es marca registrada, así que se
// dibuja tal cual: el globo con la bocina dentro. `currentColor` para que tome el
// color del texto donde se use; en el botón flotante se pinta de verde.
export const WhatsAppIcon = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} data-testid="icono-whatsapp">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24Zm-4.52 4.4c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.41 5.4 4.65 2.64 1.04 3.17.83 3.75.78.58-.05 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.36-.31-.16-1.86-.92-2.14-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.24-.68.08-.31-.16-1.33-.49-2.53-1.56-.93-.83-1.56-1.86-1.75-2.17-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.7-1.71-.96-2.34-.25-.61-.51-.53-.7-.54h-.6Z" />
  </svg>
);

// Banderas chiquitas en SVG inline (a color, esquinas redondeadas). NO se usan
// emojis de bandera porque en Windows no se ven, ni imágenes externas.
// Viven aquí y no dentro del pie porque el hero también las usa: la marca dice
// "Fabricado en EUA" en los dos lugares y tienen que verse idénticas.

export const FlagMX = () => (
  <svg viewBox="0 0 21 14" aria-hidden="true" className="inline-block h-[13px] w-auto shrink-0 align-[-2px]" data-testid="flag-mx">
    <defs><clipPath id="flagmx-clip"><rect width="21" height="14" rx="2" /></clipPath></defs>
    <g clipPath="url(#flagmx-clip)">
      <rect width="7" height="14" fill="#006847" />
      <rect x="7" width="7" height="14" fill="#FFFFFF" />
      <rect x="14" width="7" height="14" fill="#CE1126" />
      {/* Escudo simplificado: a este tamaño el águila real no se distingue. */}
      <circle cx="10.5" cy="7" r="1.7" fill="#B8860B" opacity="0.9" />
      <path d="M9.1 8.4c.9.7 1.9.7 2.8 0" stroke="#006847" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

export const FlagUS = () => (
  <svg viewBox="0 0 21 14" aria-hidden="true" className="inline-block h-[13px] w-auto shrink-0 align-[-2px]" data-testid="flag-us">
    <defs><clipPath id="flagus-clip"><rect width="21" height="14" rx="2" /></clipPath></defs>
    <g clipPath="url(#flagus-clip)">
      <rect width="21" height="14" fill="#FFFFFF" />
      {[0, 4, 8, 12].map((y) => <rect key={y} y={y} width="21" height="2" fill="#B22234" />)}
      <rect width="9.2" height="7" fill="#3C3B6E" />
      {[1.6, 4.6, 7.6].map((x) => [1.6, 3.5, 5.4].map((y) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.55" fill="#FFFFFF" />
      )))}
    </g>
  </svg>
);
