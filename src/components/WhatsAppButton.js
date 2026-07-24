import React from 'react';
import { WHATSAPP_URL } from '@/lib/contact';
import { useLanguage } from '@/context/LanguageContext';

// Botón flotante de WhatsApp. Abre un chat a nuestro número (el del iPhone) con
// un mensaje ya redactado. No hay API ni bot: es el link wa.me, gratis.
// Se apaga solo si WHATSAPP_URL está en null.
export default function WhatsAppButton() {
  const { t } = useLanguage();
  if (!WHATSAPP_URL) return null;
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(t('whatsapp.prefill'))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="whatsapp-fab"
      aria-label={t('whatsapp.aria')}
      title={t('whatsapp.aria')}
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-[#25D366] shadow-[var(--shadow-md)] flex items-center justify-center hover:scale-105 transition-transform"
    >
      {/* Isotipo de WhatsApp (SVG propio, sin dependencias) */}
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="#fff" aria-hidden="true">
        <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.19 1.62 6.02L4 29l8.13-1.58a12.02 12.02 0 0 0 3.9.65h.01C22.68 28.07 28 22.67 28 16.03 28 9.4 22.68 3 16.04 3zm0 21.9h-.01c-1.2 0-2.38-.32-3.4-.93l-.24-.14-4.82.94.96-4.7-.16-.25a9.94 9.94 0 0 1-1.52-5.28c0-5.5 4.48-9.98 9.99-9.98 2.67 0 5.17 1.04 7.06 2.93a9.9 9.9 0 0 1 2.92 7.06c0 5.5-4.48 9.98-9.99 9.98zm5.48-7.48c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/>
      </svg>
    </a>
  );
}
