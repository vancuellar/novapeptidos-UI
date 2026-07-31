import React from 'react';
import { Store } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { WHATSAPP_URL } from '@/lib/contact';

const BASE = process.env.PUBLIC_URL || '';

// PÁGINA ESCONDIDA a propósito (Christián, 2026-07-30 noche): el video de
// invitación a distribuidores NO se enseña en ninguna página del sitio ni sale
// en Google (ver NO_INDEXAR en prerender-routes.js). El enlace lo reparte
// SOLO Christián, por WhatsApp o correo, a los prospectos que él elige.
// Cualquiera CON el enlace la ve — no pide cuenta: su público todavía no la tiene.
const SUFIJO = { 'en-US': '-en', 'pt-BR': '-pt' };
const video = (language) =>
  `${BASE}/videos/conviertete-en-distribuidor${SUFIJO[language] || ''}.mp4`;

export default function Invitacion() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="overflow-hidden" data-testid="invitacion-card">
        {/* key = src: al cambiar de idioma el <video> se vuelve a montar con el archivo correcto */}
        <video key={video(language)} controls preload="metadata" className="w-full aspect-video bg-black" src={video(language)} data-testid="invitacion-video" />
        <div className="p-6 text-center">
          <h1 className="font-heading font-semibold text-lg mb-2 flex items-center justify-center gap-2">
            <Store className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('tutorials.prospect.title')}
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-5">{t('tutorials.prospect.body')}</p>
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(t('tutorials.prospect.wa'))}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#25d366] text-[#0b1a10] font-semibold px-6 py-2.5 text-sm hover:opacity-90 transition-opacity"
            data-testid="invitacion-cta"
          >
            {t('tutorials.prospect.cta')}
          </a>
        </div>
      </Card>
    </div>
  );
}
