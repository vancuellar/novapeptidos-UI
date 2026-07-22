import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Teléfono con paréntesis y guion — así lo quiere Christian en todo el sitio.
// México: (55) 1234-5678 · EUA/Canadá: (555) 123-4567 · otros países: solo
// dígitos (hasta 15). Si pegan el número con la lada delante, se la quitamos.
export function formatPhoneIntl(value, iso = 'MX') {
  let d = (value || '').replace(/\D/g, '');
  if (iso === 'MX') {
    if (d.length > 10 && d.startsWith('52')) d = d.slice(2);
    d = d.slice(0, 10);
    if (d.length <= 2) return d.length ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  if (iso === 'US' || iso === 'CA') {
    if (d.length > 10 && d.startsWith('1')) d = d.slice(1);
    d = d.slice(0, 10);
    if (d.length <= 3) return d.length ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }
  return d.slice(0, 15);
}

// Compatibilidad con el nombre viejo (solo México).
export const formatPhoneMX = (value) => formatPhoneIntl(value, 'MX');

export const phoneDigits = (value) => (value || '').replace(/\D/g, '');

// ¿El número está completo para su país? MX/US/CA exigen 10; el resto 6-15.
export const phoneValid = (value, iso = 'MX') => {
  const n = phoneDigits(value).length;
  return ['MX', 'US', 'CA'].includes(iso) ? n === 10 : n >= 6 && n <= 15;
};
