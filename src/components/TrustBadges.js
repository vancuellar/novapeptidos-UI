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

// DÓNDE VIVE ESTE BLOQUE. (Fable 5, 2026-07-29)
//
// Christian pidió el bloque, se construyó… y nunca lo vio, con razón: sólo salía
// en "Mis Pedidos" (hay que iniciar sesión) y en el checkout (hay que traer algo
// en el carrito). O sea, en los dos únicos lugares donde el cliente YA confió.
// Ahora sale también donde se decide la compra: la portada (variante `strip`, la
// misma franja que ya existía, no una sección nueva) y la ficha de producto.
//
// Las tres variantes:
//   panel   — tarjeta completa con descripciones (cuenta, ficha de producto).
//   compact — sólo títulos, una columna (columna angosta del checkout).
//   strip   — franja horizontal de la portada, con textos cortos.
const TrustBadges = ({ variant = 'panel', className = '', showRuo = true }) => {
  const { t } = useLanguage();
  const compacto = variant === 'compact';
  const franja = variant === 'strip';

  const params = { phone: WHATSAPP_DISPLAY };

  const filas = SELLOS.map(({ id, Icono, url }) => {
    // En la franja de la portada los textos son de un renglón (`home.trust.*`):
    // seis columnas no aguantan "Certificado del lote que recibiste queda en…".
    const titulo = franja ? t(`home.trust.${id}.title`) : t(`trust.${id}.title`);
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
              {franja ? t(`home.trust.${id}.desc`) : t(`trust.${id}.desc`, params)}
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

  const encabezado = (
    <>
      <div className={`flex items-center gap-2 ${franja ? 'flex-wrap' : ''}`}>
        <ShieldCheck className="h-[18px] w-[18px] text-[hsl(var(--success))] shrink-0" aria-hidden="true" />
        <h2 className="font-heading text-base font-bold tracking-tight">{t('trust.title')}</h2>
        {/* En la franja el subtítulo va al lado, no debajo: la portada no puede
            crecer dos renglones por un bloque que es de apoyo, no protagonista. */}
        {franja && <span className="text-xs text-muted-foreground">{t('trust.subtitle')}</span>}
      </div>
      {!compacto && !franja && <p className="mt-1 text-xs text-muted-foreground">{t('trust.subtitle')}</p>}
    </>
  );

  const rejilla = (
    // Móvil primero: una columna (dos en la franja). Nunca overflow — el header
    // pegajoso se muere si alguien mete overflow en un contenedor alto.
    <div
      className={`grid gap-4 ${
        franja
          ? 'mt-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
          : compacto
            ? 'mt-4 grid-cols-1'
            : 'mt-4 sm:grid-cols-2 sm:gap-x-6'
      }`}
    >
      {filas}
    </div>
  );

  // El aviso RUO va SIEMPRE visible, salvo donde YA está gritando arriba (la
  // ficha de producto lo trae en recuadro ámbar y en la etiqueta del título):
  // repetirlo tres veces en la misma pantalla lo vuelve ruido y deja de leerse.
  const ruo = showRuo ? (
    <p className="mt-4 pt-3 border-t border-border text-[11px] leading-relaxed text-muted-foreground">
      {t('trust.ruo')}
    </p>
  ) : null;

  // La franja de la portada no es tarjeta: vive dentro de una sección con su
  // propio fondo y sus propias líneas. Una tarjeta dentro de la banda se vería
  // como un parche pegado encima.
  if (franja) {
    return (
      <div className={className} data-testid="trust-badges">
        {encabezado}
        {rejilla}
        {ruo}
      </div>
    );
  }

  return (
    <Card className={`p-4 sm:p-5 ${className}`} data-testid="trust-badges">
      {encabezado}
      {rejilla}
      {ruo}
    </Card>
  );
};

export default TrustBadges;
