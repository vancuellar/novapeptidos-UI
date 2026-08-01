import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MinusCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FlagUS } from '@/components/Flags';
import { useLanguage } from '@/context/LanguageContext';
import { VISIBLE_CATEGORIES, fallbackProducts } from '@/data/fallbackCatalog';

// Comparativa contra otros vendedores.
//
// Vivía dentro de la portada. Salió de ahí el 2026-07-31 (Christián: adelgazar el
// home en móvil) y se mudó a su propia página. NADA se borró: es la MISMA tabla,
// con los MISMOS textos (`home.why.*`), y desde el pie de página se llega a ella.
// En escritorio la portada la sigue enseñando; en teléfono ya no.
const PRESENTACIONES = fallbackProducts.reduce((n, p) => n + (p.variants?.length || 1), 0);
const COMPUESTOS = fallbackProducts.length;
const CATEGORIAS = VISIBLE_CATEGORIES.length;

// La tabla es idéntica a la de la portada, incluido el orden de los renglones:
// origen y catálogo arriba, que son los dos que de verdad nos separan.
export const usarRenglones = (t) => [
  { label: t('home.why.r8'), others: 'partial', flag: 'us' },
  { label: t('home.why.r7', { presentaciones: PRESENTACIONES }), others: 'no' },
  { label: t('home.why.r1'), others: 'no' },
  { label: t('home.why.r2'), others: 'partial' },
  { label: t('home.why.r3'), others: 'partial' },
  { label: t('home.why.r4'), others: 'partial' },
  { label: t('home.why.r5'), others: 'no' },
  { label: t('home.why.r6'), others: 'partial' },
];

const Comparativa = () => {
  const { t } = useLanguage();
  const filas = usarRenglones(t);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
      <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-foreground">{t('nav.home')}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{t('home.whyTitle')}</span>
      </nav>

      <header className="mb-8">
        <div className="kicker">{t('home.whyKicker')}</div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight mt-2">{t('home.whyTitle')}</h1>
        <p className="text-base text-muted-foreground mt-3 max-w-3xl leading-relaxed">{t('home.whySubtitle')}</p>
      </header>

      {/* Mismos anchos de columna que traía en la portada: en teléfono van fijos
          (56 y 88 px) para que el encabezado "Otros vendedores" no se coma la
          mitad de la pantalla; de sm en adelante vuelven a 'auto'. */}
      <Card className="overflow-hidden shadow-none">
        <div className="grid grid-cols-[1fr_3.5rem_5.5rem] sm:grid-cols-[1fr_auto_auto] text-sm">
          <div className="px-3.5 sm:px-5 py-3.5 bg-[hsl(var(--secondary))]"> </div>
          <div className="px-2 sm:px-8 py-3.5 text-[11px] sm:text-sm font-heading font-bold text-[hsl(var(--primary))] bg-[hsl(var(--accent))] text-center sm:whitespace-nowrap">Exygen Labs</div>
          <div className="px-2 sm:px-8 py-3.5 text-[11px] sm:text-sm font-medium text-muted-foreground bg-[hsl(var(--secondary))] text-center sm:whitespace-nowrap">{t('home.why.others')}</div>
          {filas.map((row, i) => (
            <React.Fragment key={i}>
              <div className="px-3.5 sm:px-5 py-3.5 border-t border-border min-w-0">
                {row.label}{row.flag === 'us' && <>{' '}<FlagUS /></>}
              </div>
              <div className="px-3 sm:px-8 py-3.5 border-t border-border bg-[hsl(var(--accent))]/40 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
              </div>
              <div className="px-3 sm:px-8 py-3.5 border-t border-border flex items-center justify-center">
                {row.others === 'partial'
                  ? <span className="text-xs text-muted-foreground">{t('home.why.partial')}</span>
                  : <MinusCircle className="h-5 w-5 text-muted-foreground/50" />}
              </div>
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* Las tres cuentas que sostienen la afirmación del catálogo. Salieron de la
          portada móvil (ahí quedó sólo la mención) y aterrizaron aquí, que es donde
          alguien SÍ vino a comparar. */}
      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold">{t('home.leadTitle')}</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
          {t('home.leadBody', { presentaciones: PRESENTACIONES, categorias: CATEGORIAS })}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
          {[
            { n: PRESENTACIONES, l: t('home.leadStat1') },
            { n: COMPUESTOS, l: t('home.leadStat2') },
            { n: CATEGORIAS, l: t('home.leadStat3') },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-card px-4 py-5 text-center">
              <div className="font-heading text-3xl sm:text-4xl font-bold text-[hsl(var(--primary))] leading-none">{s.n}</div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-muted-foreground mt-2.5 leading-snug">{s.l}</div>
            </div>
          ))}
        </div>
        <Link to="/catalogo" className="btn-resend mt-7" data-testid="comparativa-catalog-button">
          {t('home.leadCta', { presentaciones: PRESENTACIONES })} <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <p className="text-xs text-muted-foreground leading-relaxed mt-10">{t('trust.ruo')}</p>
    </div>
  );
};

export default Comparativa;
