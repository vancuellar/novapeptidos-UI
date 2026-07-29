// Video tutorial de las métricas de difusión (Embudo, Marketing y Anuncios),
// para Christián y María. Vive solo dentro del Admin y el archivo se sirve del
// backend con token: el servidor únicamente se lo da a quien lleva la difusión
// (admin, o rol marketing propio o extra), así que ni clientes ni
// distribuidores comunes pueden verlo aunque adivinen la URL.
//
// Con el sitio en portugués se sirve la versión narrada en pt-BR (María);
// la pantalla grabada sigue en español porque la pestaña Marketing aún no
// está traducida.
import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { API } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

const VideoComoLeerDifusion = () => {
  const { language } = useLanguage();
  const esPT = language === 'pt-BR';
  const archivo = esPT ? 'tutorial-12-metricas-difusao-pt.mp4' : 'tutorial-12-metricas-difusion.mp4';
  const dura = esPT ? '3:41' : '3:37';
  // La etiqueta <video> no manda headers: el token de sesión viaja como query.
  const src = `${API}/tutorials/${archivo}?token=${encodeURIComponent(localStorage.getItem('np_token') || '')}`;
  return (
    <Card className="p-4 mb-6" data-testid="mkt-video-como-leer">
      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
        <PlayCircle className="h-4 w-4 text-[hsl(var(--primary))]" />
        {esPT ? `Como ler estas métricas (vídeo, ${dura})` : `Cómo leer estas métricas (video, ${dura})`}
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        {esPT
          ? 'O Funil, esta aba de Marketing e a de Anúncios, explicados sem tecnicismos — incluindo por que a receita do funil não é dinheiro cobrado e por que hoje o WhatsApp é o canal.'
          : 'El Embudo, esta pestaña de Marketing y la de Anuncios, explicados sin tecnicismos — incluye por qué el ingreso del embudo no es dinero cobrado y por qué hoy WhatsApp es el canal.'}
      </p>
      <video controls preload="metadata" className="w-full max-w-3xl aspect-video bg-black rounded-lg" src={src} key={archivo} />
    </Card>
  );
};

export default VideoComoLeerDifusion;
