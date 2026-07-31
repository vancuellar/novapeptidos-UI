import React from 'react';
import { Navigate } from 'react-router-dom';
import { GraduationCap, PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

const BASE = process.env.PUBLIC_URL || '';

// El video de invitación a distribuidores YA NO VIVE AQUÍ (Christián,
// 2026-07-30 noche): se movió a /invitacion, una página escondida que no se
// enlaza desde ningún lado — el enlace lo reparte él por WhatsApp o correo.
// Ver src/pages/Invitacion.js.

// /tutoriales ya NO es un tablero paralelo (2026-07-30).
//
// Los tutoriales son UNA PESTAÑA del menú de cada rol: el distribuidor los ve en
// su panel y el cliente en su cuenta. Esta página se queda por dos motivos: es
// un enlace del pie que Google indexa, y es la puerta para quien todavía no
// tiene cuenta. Al miembro lo manda a SU pestaña, para que toda su información
// se encuentre en un solo menú.
export default function Tutorials() {
  const { t } = useLanguage();
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
    </div>
  );
}
