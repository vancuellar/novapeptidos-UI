import React from 'react';

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
