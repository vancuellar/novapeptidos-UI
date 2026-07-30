import React from 'react';
import { BadgeCheck, FileText, Globe, Truck, Lock, MessageCircle, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from '@/lib/contact';

// Bloque de señales de confianza ("Tienda de confianza").
//
// Nace copiando la IDEA del competidor chino (cell-cpeptides), que pone un bloque
// de garantías junto a los pedidos del cliente. La diferencia es el contenido: ellos
// prometen devoluciones a 30 días, garantía de 3 meses y envío gratis mundial.
// Nosotros NO prometemos nada de eso — nuestras ventas son finales y el envío se
// cotiza aparte — así que aquí sólo van hechos que el sitio ya sostiene en otra
// parte (pureza por HPLC, certificado por lote, origen EUA, 2 a 5 días, formas de
// pago, WhatsApp). Si algún día se agrega un sello, tiene que poder comprobarse.
//
// El aviso RUO va SIEMPRE visible al pie del bloque, no escondido: es lo que separa
// un catálogo de investigación de una farmacia.

const SELLOS = [
  { id: 'purity', Icono: BadgeCheck },
  { id: 'coa', Icono: FileText },
  { id: 'origin', Icono: Globe },
  { id: 'shipping', Icono: Truck },
  { id: 'payment', Icono: Lock },
  { id: 'support', Icono: MessageCircle, url: WHATSAPP_URL },
];

const TrustBadges = ({ variant = 'panel', className = '' }) => {
  const { t } = useLanguage();
  const compacto = variant === 'compact';

  const params = { phone: WHATSAPP_DISPLAY };

  const filas = SELLOS.map(({ id, Icono, url }) => {
    const titulo = t(`trust.${id}.title`);
    const cuerpo = (
      <div className="flex items-start gap-3">
        <span
          className={`${compacto ? 'h-8 w-8' : 'h-9 w-9'} shrink-0 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center`}
          aria-hidden="true"
        >
          <Icono className={`${compacto ? 'h-4 w-4' : 'h-[18px] w-[18px]'} text-[hsl(var(--primary))]`} />
        </span>
        <div className="min-w-0">
          <div className={`font-semibold leading-snug ${compacto ? 'text-[13px]' : 'text-sm'}`}>{titulo}</div>
          {!compacto && (
            <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">
              {t(`trust.${id}.desc`, params)}
            </div>
          )}
        </div>
      </div>
    );

    // El único sello que lleva enlace es el de soporte: abre la conversación de
    // WhatsApp. Los demás son afirmaciones, no botones.
    return url ? (
      <a
        key={id}
        href={url}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg -m-1 p-1 hover:bg-[hsl(var(--muted))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {cuerpo}
      </a>
    ) : (
      <div key={id}>{cuerpo}</div>
    );
  });

  return (
    <Card className={`p-4 sm:p-5 ${className}`} data-testid="trust-badges">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-[18px] w-[18px] text-[hsl(var(--success))] shrink-0" aria-hidden="true" />
        <h2 className="font-heading text-base font-bold tracking-tight">{t('trust.title')}</h2>
      </div>
      {!compacto && <p className="mt-1 text-xs text-muted-foreground">{t('trust.subtitle')}</p>}

      {/* Móvil primero: una columna. A partir de sm, dos. Nunca overflow — el
          header pegajoso se muere si alguien mete overflow en un contenedor alto. */}
      <div className={`mt-4 grid gap-4 ${compacto ? 'grid-cols-1' : 'sm:grid-cols-2 sm:gap-x-6'}`}>
        {filas}
      </div>

      <p className="mt-4 pt-3 border-t border-border text-[11px] leading-relaxed text-muted-foreground">
        {t('trust.ruo')}
      </p>
    </Card>
  );
};

export default TrustBadges;
