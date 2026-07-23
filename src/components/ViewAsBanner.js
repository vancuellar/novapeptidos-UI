import React from 'react';
import { Eye, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// Barra fija cuando el admin está viendo el sitio como otro usuario.
// Salir = restaurar su propio token (se guardó al entrar) y recargar.
export default function ViewAsBanner() {
  const { user } = useAuth();
  const { t } = useLanguage();
  if (!user?.view_as) return null;

  const exit = () => {
    const admin = localStorage.getItem('np_token_admin');
    if (admin) localStorage.setItem('np_token', admin);
    else localStorage.removeItem('np_token');
    localStorage.removeItem('np_token_admin');
    window.location.href = '/admin';
  };

  return (
    <div className="sticky top-0 z-50 bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border-b border-[hsl(var(--warning-border))]"
      data-testid="view-as-banner">
      <div className="max-w-[1280px] mx-auto px-4 h-10 flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2 min-w-0">
          <Eye className="h-4 w-4 shrink-0" />
          <span className="truncate">{t('viewAs.banner', { name: user.name })}</span>
        </span>
        <button onClick={exit} className="shrink-0 inline-flex items-center gap-1.5 font-semibold hover:opacity-80"
          data-testid="view-as-exit">
          <X className="h-4 w-4" /> {t('viewAs.exit')}
        </button>
      </div>
    </div>
  );
}
