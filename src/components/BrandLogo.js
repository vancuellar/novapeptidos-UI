import React from 'react';

// Logo oficial de Exygen Labs (estructura del dipéptido + wordmark + subtítulo).
// En dark theme se invierte a blanco monocromo. `nameOnly` usa el recorte con
// SOLO "EXYGEN LABS" (sin molécula ni "RESEARCH PEPTIDES") — es exclusivo de
// la barra superior por orden de Christian (2026-07-20); no usarlo en otro lado.
const LOGO_SRC = process.env.PUBLIC_URL + '/images/exygen-logo.png';
const LOGO_NAME_SRC = process.env.PUBLIC_URL + '/images/exygen-logo-wordmark.png';

export const BrandMark = ({ className = 'h-8' }) => (
  <img src={LOGO_SRC} alt="Exygen Labs" className={`${className} w-auto object-contain dark:brightness-0 dark:invert`} />
);

const BrandLogo = ({ compact = false, nameOnly = false }) => (
  <img
    src={nameOnly ? LOGO_NAME_SRC : LOGO_SRC}
    alt="Exygen Labs — Research Peptides"
    data-testid="brand-logo"
    className={`w-auto object-contain dark:brightness-0 dark:invert ${compact ? (nameOnly ? 'h-5 sm:h-6' : 'h-8 sm:h-9') : 'h-10'}`}
  />
);

export default BrandLogo;
