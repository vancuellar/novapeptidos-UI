import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Teléfono: 10 dígitos con formato estilo (55) 1234-5678 — así lo quiere
// Christian en todo el sitio. Si pegan el número con +52 / 52, se lo quitamos.
export function formatPhoneMX(value) {
  let d = (value || '').replace(/\D/g, '');
  if (d.length > 10 && d.startsWith('52')) d = d.slice(2);
  d = d.slice(0, 10);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
}

export const phoneDigits = (value) => (value || '').replace(/\D/g, '');
