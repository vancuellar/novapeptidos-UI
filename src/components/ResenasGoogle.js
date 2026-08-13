import React, { useEffect, useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

/**
 * LAS RESEÑAS DE GOOGLE en la portada — las de verdad, no testimonios inventados.
 *
 * Christián, 2026-08-05: «necesito que me construyas una sección en el home que
 * muestre nuestros reviews de Facebook y/o Google» → «Sí tiene Google Business,
 * conéctalo a la API».
 *
 * ⛔ SI NO HAY RESEÑAS, NO HAY SECCIÓN. Ni título, ni recuadro vacío, ni «pronto
 * habrá opiniones». Una portada sin testimonios se ve perfectamente bien; una con
 * un hueco que dice que nadie ha opinado, no. Mientras Christián no pegue las dos
 * llaves, el servidor contesta vacío y aquí no se pinta absolutamente nada.
 *
 * ⚠️ EL CRÉDITO A GOOGLE NO ES ADORNO, LO EXIGEN SUS TÉRMINOS: el nombre del autor,
 * su foto y una liga a la reseña en Google Maps. No se pueden reescribir, recortar
 * ni enseñar como testimonios anónimos de la casa. Por eso el texto va tal cual
 * viene y cada tarjeta lleva su liga.
 */
const Estrellas = ({ n }) => (
  <div className="flex gap-0.5" aria-label={`${n} de 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i <= n
        ? 'fill-[hsl(var(--warning))] text-[hsl(var(--warning))]'
        : 'text-muted-foreground/30'}`} />
    ))}
  </div>
);

const ResenasGoogle = () => {
  const { t } = useLanguage();
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    let vivo = true;
    // Si falla, se queda en null y la sección no existe. La portada NUNCA se rompe
    // por unos testimonios.
    api.get('/resenas')
      .then((r) => { if (vivo) setDatos(r.data); })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  const resenas = datos?.resenas || [];
  if (!resenas.length) return null;

  return (
    <section className="border-b border-border" data-testid="home-resenas">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="font-heading text-2xl font-semibold">{t('resenas.title')}</h2>
            {/* El promedio y el total salen de Google, no de nosotros: son su número
                y por eso se dice de dónde viene. */}
            {datos.promedio > 0 && (
              <p className="text-sm text-muted-foreground mt-1" data-testid="home-resenas-promedio">
                {t('resenas.summary', { promedio: datos.promedio, n: datos.cuantas })}
              </p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resenas.map((r, i) => (
            <Card key={`${r.autor}-${i}`} className="p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {r.foto ? (
                  <img src={r.foto} alt="" loading="lazy" width="36" height="36"
                    className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center text-xs font-semibold">
                    {(r.autor || '?').charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{r.autor}</div>
                  <div className="flex items-center gap-2">
                    <Estrellas n={r.estrellas} />
                    <span className="text-[11px] text-muted-foreground">{r.cuando}</span>
                  </div>
                </div>
              </div>
              {/* Tal cual lo escribió el cliente. No se edita ni se recorta el texto
                  de nadie: eso sería inventarle palabras a una persona real. */}
              <p className="text-sm text-muted-foreground leading-relaxed">{r.texto}</p>
              {r.liga && (
                <a href={r.liga} target="_blank" rel="noreferrer"
                  className="text-xs text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-1 mt-auto">
                  <ExternalLink className="h-3 w-3" /> {t('resenas.verEnGoogle')}
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResenasGoogle;
