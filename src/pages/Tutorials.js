import React from 'react';
import { Navigate } from 'react-router-dom';
import { GraduationCap, PlayCircle, Store } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { WHATSAPP_URL } from '@/lib/contact';

const BASE = process.env.PUBLIC_URL || '';

// El video de invitación a distribuidores es para PROSPECTOS (gente sin
// cuenta), así que NO vive detrás del login como los tutoriales: es un archivo
// estático en public/videos, hecho con el pipeline de siempre
// (Media/Videos/pipeline/record-distribuidor.js) en los tres idiomas.
const PROSPECT_SUFFIX = { 'en-US': '-en', 'pt-BR': '-pt' };
const prospectVideo = (language) =>
  `${BASE}/videos/conviertete-en-distribuidor${PROSPECT_SUFFIX[language] || ''}.mp4`;

// /tutoriales ya NO es un tablero paralelo (2026-07-30).
//
// Los tutoriales son UNA PESTAÑA del menú de cada rol: el distribuidor los ve en
// su panel y el cliente en su cuenta. Esta página se queda por dos motivos: es
// un enlace del pie que Google indexa, y es la puerta para quien todavía no
// tiene cuenta. Al miembro lo manda a SU pestaña, para que toda su información
// se encuentre en un solo menú.
export default function Tutorials() {
  const { t, language } = useLanguage();
  const { user, loading } = useAuth();

  // Mientras se sabe quién es, no se decide nada: si no, el miembro alcanza a
  // ver el letrero de "inicia sesión" antes de que lo manden a su pestaña.
  if (loading) return null;

  if (user) {
    const destino = ['distributor', 'admin'].includes(user.role) ? '/distribuidor' : '/cuenta';
    return <Navigate to={`${destino}?tab=tutoriales`} replace />;
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2" data-testid="tutorials-title">
        <GraduationCap className="h-6 w-6 text-[hsl(var(--primary))]" /> {t('tutorials.title')}
      </h1>
      <p className="text-muted-foreground text-sm mb-8">{t('tutorials.subtitle')}</p>
      <Card className="p-10 text-center mb-6" data-testid="tutorials-login-gate">
        <PlayCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h2 className="font-heading font-semibold text-lg mb-2">{t('tutorials.membersTitle')}</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-5">{t('tutorials.membersBody')}</p>
        <a href={`${BASE}/login`} className="inline-flex items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold px-6 py-2.5 text-sm hover:opacity-90 transition-opacity" data-testid="tutorials-login-cta">
          {t('tutorials.membersCta')}
        </a>
      </Card>

      {/* Invitación a distribuidores: el único video ABIERTO de la página,
          porque su público todavía no tiene cuenta. */}
      <Card className="overflow-hidden" data-testid="tutorials-prospect-card">
        {/* key = src: al cambiar de idioma el <video> se vuelve a montar con el archivo correcto */}
        <video key={prospectVideo(language)} controls preload="metadata" className="w-full aspect-video bg-black" src={prospectVideo(language)} data-testid="tutorials-prospect-video" />
        <div className="p-6 text-center">
          <h2 className="font-heading font-semibold text-lg mb-2 flex items-center justify-center gap-2">
            <Store className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('tutorials.prospect.title')}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-5">{t('tutorials.prospect.body')}</p>
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(t('tutorials.prospect.wa'))}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#25d366] text-[#0b1a10] font-semibold px-6 py-2.5 text-sm hover:opacity-90 transition-opacity"
            data-testid="tutorials-prospect-cta"
          >
            {t('tutorials.prospect.cta')}
          </a>
        </div>
      </Card>
    </div>
  );
}
