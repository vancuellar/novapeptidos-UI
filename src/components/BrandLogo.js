import React from 'react';

// Nova Peptides brand mark: hexagonal "molecule" with bonded nodes.
// Renders in the parent's currentColor so it works on light and dark surfaces.
export const BrandMark = ({ className = 'h-9 w-9' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M20 3.5 33.5 11.4v15.7L20 35 6.5 27.1V11.4L20 3.5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="20" cy="3.5" r="3" fill="currentColor" />
    <circle cx="33.5" cy="27.1" r="3" fill="currentColor" />
    <circle cx="6.5" cy="27.1" r="3" fill="currentColor" />
    <path d="M13.5 26V14.5l13 11.5V14.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Full lockup: mark + wordmark. `tone` controls wordmark contrast surface.
const BrandLogo = ({ tagline, compact = false }) => (
  <span className="flex items-center gap-2.5">
    <span className="h-9 w-9 rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center shrink-0">
      <BrandMark className="h-6 w-6" />
    </span>
    <span className="leading-none">
      <span className="block font-heading font-bold text-lg tracking-tight">
        Nova<span className="text-[hsl(var(--primary))]"> Peptides</span>
      </span>
      {!compact && tagline && (
        <span className="block font-mono-tech text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground mt-1">{tagline}</span>
      )}
    </span>
  </span>
);

export default BrandLogo;
