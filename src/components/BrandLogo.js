import React from 'react';

// Logo oficial de Exygen Labs (estructura del dipéptido + wordmark + subtítulo).
// En dark theme se invierte a blanco monocromo. `nameOnly` usa el recorte con
// SOLO "EXYGEN LABS" (sin molécula ni "RESEARCH PEPTIDES") — es exclusivo de
// la barra superior por orden de Christian (2026-07-20); no usarlo en otro lado.
const LOGO_SRC = process.env.PUBLIC_URL + '/images/exygen-logo.png';
const LOGO_NAME_SRC = process.env.PUBLIC_URL + '/images/exygen-logo-wordmark.png';
// "EXYGEN LABS" + "RESEARCH PEPTIDES", sin la molécula.
const LOGO_TEXT_SRC = process.env.PUBLIC_URL + '/images/exygen-logo-name.png';

// `noMolecule` deja el nombre y el subtítulo, sin la estructura del dipéptido.
// Lo usa el aviso RUO de la primera visita (orden de Christian, 2026-07-20).
export const BrandMark = ({ className = 'h-8', noMolecule = false }) => (
  <img
    src={noMolecule ? LOGO_TEXT_SRC : LOGO_SRC}
    alt="Exygen Labs"
    className={`${className} w-auto object-contain dark:brightness-0 dark:invert`}
  />
);

// La molécula sola, en un mosaico redondeado estilo Resend (su tile con la R).
// Colores del tema: átomos en el color del texto, enlace y caja en el acento.
export const MoleculeTile = ({ className = 'h-14 w-14' }) => (
  <div className={`${className} rounded-2xl border border-border bg-card flex items-center justify-center shadow-sm`}>
    <svg viewBox="0 0 32 32" className="h-3/5 w-3/5" role="img" aria-label="Exygen Labs">
      <rect x="6.5" y="6.5" width="19" height="19" rx="3.5" fill="none"
        stroke="hsl(var(--primary))" strokeWidth="1.6" strokeDasharray="3.2 2.6" />
      <circle cx="11.6" cy="20.2" r="2.5" fill="currentColor" />
      <circle cx="20.4" cy="11.8" r="2.5" fill="currentColor" />
      <line x1="11.6" y1="20.2" x2="20.4" y2="11.8" stroke="hsl(var(--primary))" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  </div>
);

const BrandLogo = ({ compact = false, nameOnly = false }) => (
  <img
    src={nameOnly ? LOGO_NAME_SRC : LOGO_SRC}
    alt="Exygen Labs — Research Peptides"
    data-testid="brand-logo"
    className={`w-auto object-contain dark:brightness-0 dark:invert ${compact ? (nameOnly ? 'h-3.5 sm:h-4' : 'h-8 sm:h-9') : 'h-10'}`}
  />
);

export default BrandLogo;
