import React, { useEffect, useState } from 'react';
import { CloudOff } from 'lucide-react';
import { suscribirse, apiCaida } from '@/lib/estadoApi';
import { useLanguage } from '@/context/LanguageContext';

// Aviso global cuando el servidor no contesta.
//
// El 30 de julio de 2026 la API se cayó y la página se quedó muda: los botones
// de login desaparecidos, el carrito sin responder, y ni una palabra que
// explicara por qué. La gente pensó que la tienda estaba rota.
//
// Esta barra dice la verdad sin alarmar, y sobre todo aclara lo importante:
// EL CATÁLOGO SIGUE AHÍ. Se puede seguir mirando producto.
//
// TRES DECISIONES DE DISEÑO, a propósito:
//
// 1. NO es `sticky`. El header ya es sticky (top-0, z-40) y ViewAsBanner
//    también (top-0, z-50): un tercer sticky en top-0 se encabalgaría con los
//    otros dos. Este aviso fluye con la página y se va al bajar.
// 2. NO toca el `overflow` del body. Regla de oro de Christián: cualquier
//    overflow en el body convierte al body en contenedor de scroll y despega
//    el header sticky. Aquí no hay nada de eso.
// 3. NO bloquea nada. Sin modal, sin capa encima, sin botones. Se lee y ya.
const AvisoDeIntermitencia = () => {
  const { t } = useLanguage();
  const [caida, setCaida] = useState(apiCaida());

  useEffect(() => suscribirse(setCaida), []);

  if (!caida) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="aviso-intermitencia"
      className="w-full border-b border-amber-500/25 bg-amber-500/10 text-amber-900 dark:text-amber-200"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-center">
        <CloudOff className="h-4 w-4 shrink-0" aria-hidden />
        <p className="text-xs sm:text-sm leading-snug">{t('aviso.intermitencia')}</p>
      </div>
    </div>
  );
};

export default AvisoDeIntermitencia;
