import React from 'react';

// Logo oficial de Exygen Labs (estructura del dipéptido + wordmark + subtítulo).
// En dark theme se invierte a blanco monocromo.
const LOGO_SRC = process.env.PUBLIC_URL + '/images/exygen-logo.png';

export const BrandMark = ({ className = 'h-8' }) => (
  <img src={LOGO_SRC} alt="Exygen Labs" className={`${className} w-auto object-contain dark:brightness-0 dark:invert`} />
);

const BrandLogo = ({ compact = false }) => (
  <img
    src={LOGO_SRC}
    alt="Exygen Labs — Research Peptides"
    data-testid="brand-logo"
    className={`w-auto object-contain dark:brightness-0 dark:invert ${compact ? 'h-8 sm:h-9' : 'h-10'}`}
  />
);

export default BrandLogo;
