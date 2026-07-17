import React from 'react';

// Exygen Labs brand mark: two fused hexagons ("molécula") with filled nodes and
// dotted bonds. Renders in the parent's currentColor so it works on light and dark.
export const BrandMark = ({ className = 'h-8 w-12' }) => (
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M22 28 L42 17 L62 28 L62 51 L42 62 L22 51 Z" stroke="currentColor" strokeWidth="2.2" />
    <path d="M62 28 L82 17 L102 28 L102 51 L82 62 L62 51" stroke="currentColor" strokeWidth="2.2" />
    <path d="M27 31 L27 48" stroke="currentColor" strokeWidth="2.2" />
    <path d="M97 31 L97 48" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="42" cy="17" r="4.5" fill="currentColor" />
    <circle cx="82" cy="17" r="4.5" fill="currentColor" />
    <circle cx="62" cy="28" r="4.5" fill="currentColor" />
    <circle cx="62" cy="51" r="4.5" fill="currentColor" />
    <circle cx="42" cy="62" r="4.5" fill="currentColor" />
    <circle cx="82" cy="62" r="4.5" fill="currentColor" />
    <path d="M42 17 L42 4" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M82 17 L82 4" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M42 62 L42 76" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M82 62 L82 76" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M102 28 L114 21" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M102 51 L114 58" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" />
  </svg>
);

// Full lockup (aprobado 7a): wordmark "EXYGEN LABS" (Marcellus) + subtítulo
// "RESEARCH PEPTIDES" (JetBrains Mono) + molécula a la derecha. Hereda el color
// de texto del tema (tinta en light, marfil en dark).
const BrandLogo = ({ compact = false }) => (
  <span className="inline-flex items-start gap-0 text-[hsl(var(--foreground))]" data-testid="brand-logo">
    <span className="flex flex-col items-center gap-[3px]">
      <span
        style={{ fontFamily: "'Marcellus', serif", letterSpacing: '.08em' }}
        className={`whitespace-nowrap leading-none ${compact ? 'text-[19px]' : 'text-[26px]'}`}
      >
        EXYGEN LABS
      </span>
      <span
        style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '.32em' }}
        className={`whitespace-nowrap pl-[.32em] text-muted-foreground ${compact ? 'text-[6px]' : 'text-[9px]'}`}
      >
        RESEARCH PEPTIDES
      </span>
    </span>
    <BrandMark className={compact ? 'w-9 h-6 -ml-1 -mt-1 shrink-0' : 'w-[52px] h-9 -ml-1.5 -mt-1.5 shrink-0'} />
  </span>
);

export default BrandLogo;
