import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Widget colapsable "Tienda de Confianza". (Christian, 2026-07-30)
//
// Reemplaza al viejo TrustBadges en los tres lugares donde de verdad se
// decide la compra: la portada (pegado al hero), la ficha de producto y el
// checkout. Es EL MISMO componente en los tres — una sola fuente de verdad
// para lo que prometemos, con un solo diseño que aprender.
//
// El diseño copia la idea de un widget de confianza que Christian vio en un
// proveedor: tarjeta con acento verde, colapsada muestra un resumen de tres
// columnas, y al tocarla se abre una lista de "certificaciones" con paloma
// verde. La diferencia es el contenido: cada renglón de la lista tiene que
// ser verdad hoy. Nada de montos de seguro ni "compra protegida" — no
// existen. Lo que sí existe: pureza por HPLC, pasarela de pago segura,
// conexión HTTPS y aviso de privacidad publicado.
//
// El verde es SOLO de este widget — el resto del sitio usa azul (var
// --primary/--success). Es un acento deliberado, no el color de marca.
const TrustWidget = ({ className = '', defaultOpen = false }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  const columnas = [
    { value: t('trustWidget.col1.value'), label: t('trustWidget.col1.label') },
    { value: t('trustWidget.col2.value'), label: t('trustWidget.col2.label') },
    { value: t('trustWidget.col3.value'), label: t('trustWidget.col3.label') },
  ];

  // Cuatro certificaciones, y las cuatro se pueden comprobar hoy mismo:
  // pureza y pago ya viven en trust.* (mismo texto que el bloque viejo),
  // SSL se ve en el candado del navegador, y la privacidad tiene su propia
  // página. Ninguna promesa de devoluciones, garantías o seguros que no
  // tenemos.
  const certificaciones = [
    { id: 'payment', label: t('trust.payment.title') },
    { id: 'purity', label: t('trust.purity.title') },
    { id: 'ssl', label: t('trustWidget.check.ssl') },
    { id: 'privacy', label: t('trustWidget.check.privacy'), href: '/info/privacidad' },
  ];

  return (
    <div
      className={`rounded-xl border border-green-600/25 border-l-4 border-l-green-600 bg-green-600/[0.05] dark:bg-green-500/[0.07] dark:border-green-500/30 dark:border-l-green-500 overflow-hidden ${className}`}
      data-testid="trust-widget"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t('trustWidget.toggleCollapse') : t('trustWidget.toggleExpand')}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-3 sm:px-4 text-left"
        data-testid="trust-widget-toggle"
      >
        <span className="flex items-center gap-2 min-w-0">
          <ShieldCheck className="h-[18px] w-[18px] shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
          <span className="font-heading font-bold text-sm text-green-700 dark:text-green-400 truncate">{t('trust.title')}</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-green-600/70 dark:text-green-400/70 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div className="grid grid-cols-3 divide-x divide-green-600/15 dark:divide-green-500/15 border-t border-green-600/15 dark:border-green-500/15">
        {columnas.map((c, i) => (
          <div key={i} className="px-1.5 py-2.5 text-center">
            <div className="text-[13px] sm:text-sm font-bold leading-tight">{c.value}</div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground leading-tight mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {open && (
        <div id={panelId} className="border-t border-green-600/15 dark:border-green-500/15" data-testid="trust-widget-panel">
          <div className="px-3.5 sm:px-4 py-2 bg-green-600/10 dark:bg-green-500/10">
            <p className="text-[11px] sm:text-xs font-semibold text-green-700 dark:text-green-400">{t('trustWidget.panelTitle')}</p>
          </div>
          <ul className="px-3.5 sm:px-4 py-2.5 space-y-2">
            {certificaciones.map((c) => {
              const fila = (
                <>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
                  <span className="text-xs sm:text-[13px]">{c.label}</span>
                </>
              );
              return (
                <li key={c.id} className="flex items-center gap-2" data-testid={`trust-widget-check-${c.id}`}>
                  {c.href ? (
                    <Link to={c.href} className="flex items-center gap-2 hover:underline">{fila}</Link>
                  ) : fila}
                </li>
              );
            })}
          </ul>
          <p className="px-3.5 sm:px-4 pb-3 pt-1 text-[10.5px] leading-relaxed text-muted-foreground">
            {t('trust.ruo')}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrustWidget;
