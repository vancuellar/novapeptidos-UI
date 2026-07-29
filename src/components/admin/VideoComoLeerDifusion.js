// Video tutorial de las métricas de difusión (Embudo, Marketing y Anuncios),
// para Christián y María. Vive solo dentro del Admin — la ruta ya exige rol
// admin — y el archivo se sirve del backend con token: el servidor únicamente
// se lo da a un admin (TUTORIAL_ADMIN_ONLY), así que ni clientes ni
// distribuidores pueden verlo aunque adivinen la URL.
import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { API } from '@/lib/api';

const VideoComoLeerDifusion = () => {
  // La etiqueta <video> no manda headers: el token de sesión viaja como query.
  const src = `${API}/tutorials/tutorial-12-metricas-difusion.mp4?token=${encodeURIComponent(localStorage.getItem('np_token') || '')}`;
  return (
    <Card className="p-4 mb-6" data-testid="mkt-video-como-leer">
      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
        <PlayCircle className="h-4 w-4 text-[hsl(var(--primary))]" /> Cómo leer estas métricas (video, 3:37)
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        El Embudo, esta pestaña de Marketing y la de Anuncios, explicados sin tecnicismos —
        incluye por qué el ingreso del embudo no es dinero cobrado y por qué hoy WhatsApp es el canal.
      </p>
      <video controls preload="metadata" className="w-full max-w-3xl aspect-video bg-black rounded-lg" src={src} />
    </Card>
  );
};

export default VideoComoLeerDifusion;
