import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, FlaskConical, Truck, BadgeCheck, ArrowRight, HeartPulse, Activity, Flame, Hourglass,
  Brain, Sparkles, Layers, CheckCircle2, MinusCircle, FileCheck2, ScanSearch, Landmark, CreditCard,
  ChevronLeft, ChevronRight, Building2, Mail, Bitcoin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import api from '@/lib/api';
import { fallbackCategories } from '@/data/fallbackCatalog';
import { getFeaturedProducts } from '@/data/featured';
import { useLanguage } from '@/context/LanguageContext';
import { localizeCategories, localizeProducts } from '@/i18n/catalog';

const ICONS = { HeartPulse, Activity, Flame, Hourglass, Brain, Sparkles, Layers, FlaskConical };

// Un archivo por vial (botellas que mandó Christian): cada uno se levanta solo
// al pasar el cursor y lleva al catálogo. Alturas escalonadas para la silueta.
// Orden de Christian: Reta al centro y al frente; NAD y KLOW a sus lados como
// principales; Tirze y Sema en las esquinas.
const HERO_VIALS = [
  { slug: 'vial-tirzepatide', name: 'Tirzepatida 20mg', product: 'tirzepatida', w: 13 },
  { slug: 'vial-nad', name: 'NAD+ 500mg', product: 'nad-plus', w: 14.5 },
  { slug: 'vial-retatrutide', name: 'Retatrutida 40mg', product: 'retatrutida', w: 16 },
  { slug: 'vial-klow', name: 'KLOW 80mg', product: 'klow-bpc-ghk-cu-tb-500-kpv', w: 14.5 },
  { slug: 'vial-semaglutide', name: 'Semaglutida 10mg', product: 'semaglutida', w: 13 },
].map((v) => ({ ...v, src: `${process.env.PUBLIC_URL}/images/hero/${v.slug}.webp` }));

// Compounds shown in the scrolling ticker under the hero
const TICKER_ITEMS = [
  'BPC-157', 'TB-500', 'Ipamorelin', 'CJC-1295', 'Semaglutida', 'Tirzepatida',
  'Epithalon', 'NAD+', 'Semax', 'Selank', 'DSIP', 'GHK-Cu',
];

// Representative compounds shown as tags on each category card
const CATEGORY_CHIPS = {
  'recuperacion-tejidos': ['BPC-157', 'TB-500', '+2'],
  'hormona-crecimiento': ['Ipamorelin', 'CJC-1295', '+3'],
  metabolicos: ['Semaglutida', 'Tirzepatida', '+2'],
  longevidad: ['Epithalon', 'NAD+', '+1'],
  nootropicos: ['Semax', 'Selank', '+2'],
  bienestar: ['DSIP', 'GHK-Cu', '+1'],
  stacks: ['BPC + TB-500', 'Ipa + CJC', '+1'],
  accesorios: ['Agua bact.', 'Jeringas', '+2'],
};

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hoveredVial, setHoveredVial] = useState(null);
  const carouselRef = useRef(null);
  const { language, t } = useLanguage();

  const scrollCarousel = (dir) => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  useEffect(() => {
    // Los destacados son una lista curada nuestra (src/data/featured.js), no lo
    // que diga el backend: el campo `featured` del catálogo lo regenera el
    // script de precios y se perdería el orden que eligió Christian.
    setFeatured(getFeaturedProducts());
    api.get('/categories')
      .then((r) => setCategories(Array.isArray(r.data) ? r.data : fallbackCategories))
      .catch(() => setCategories(fallbackCategories));
  }, []);

  // Italic-serif accent = la frase después de la coma (o las últimas 2 palabras si no hay coma).
  const heroTitleRaw = t('home.heroTitle');
  const commaIdx = heroTitleRaw.indexOf(',');
  const heroLead = commaIdx >= 0 ? heroTitleRaw.slice(0, commaIdx + 1) : heroTitleRaw.split(' ').slice(0, -2).join(' ');
  const heroAccent = commaIdx >= 0 ? heroTitleRaw.slice(commaIdx + 1).trim() : heroTitleRaw.split(' ').slice(-2).join(' ');

  const whyRows = [
    { label: t('home.why.r1'), others: 'no' },
    { label: t('home.why.r2'), others: 'partial' },
    { label: t('home.why.r3'), others: 'partial' },
    { label: t('home.why.r4'), others: 'partial' },
    { label: t('home.why.r5'), others: 'no' },
    { label: t('home.why.r6'), others: 'partial' },
  ];

  return (
    <div>
      {/* ===== Hero — clean typography + real vial photo ===== */}
      {/* El hero empieza DETRÁS de la barra (que es transparente al tope), para
          que los haces de luz corran hasta el borde superior de la pantalla y
          la barra se funda con el hero, como en Resend. */}
      <section className="bg-background relative overflow-hidden -mt-[60px] pt-[60px]">
        <div className="hero-beams" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-16 relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="kicker">{t('home.kicker')}</div>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-[3.6rem] font-bold tracking-tight leading-[1.04] mt-6">
                {heroLead}
                {/* "lote por lote" va en su propio renglon, debajo. */}
                <span className="hero-title-accent block">{heroAccent}</span>
              </h1>
              {/* Márgenes de Resend: subtítulo pegado al título (8px) y 32px antes de los botones. */}
              <p className="mt-3 text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t('home.heroBody')}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/catalogo" className="btn-resend" data-testid="hero-catalog-button">
                  {t('home.viewCatalog')} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/aprende/empieza-aqui" className="btn-resend-ghost">{t('home.startHere')}</Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="hero-vials w-full max-w-[540px]">
                <div className="hero-vials-glow" />
                {/* Anchos en % del contenedor (max 540px): la fila ocupa el mismo
                    espacio que la foto grupal anterior, sin desbordarse.
                    El hover se maneja en estado, no solo en CSS, porque el vial
                    apuntado crece y los vecinos se encogen: es un efecto de la
                    fila completa, como el dock de macOS. */}
                <div className="relative flex items-end justify-center gap-0.5 sm:gap-1"
                  onMouseLeave={() => setHoveredVial(null)}>
                  {HERO_VIALS.map((v, i) => {
                    const state = hoveredVial === null ? 'idle'
                      : hoveredVial === i ? 'active'
                      : Math.abs(hoveredVial - i) === 1 ? 'near' : 'far';
                    return (
                      <Link
                        key={v.slug}
                        to={`/producto/${v.product}`}
                        className={`hero-vial-link hero-vial-${state} block`}
                        style={{ width: `${v.w}%` }}
                        title={v.name}
                        onMouseEnter={() => setHoveredVial(i)}
                        onFocus={() => setHoveredVial(i)}
                        data-testid={`hero-vial-${v.slug}`}
                      >
                        <img src={v.src} alt={v.name} className="hero-vial" />
                        <span className="hero-vial-label">{v.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ===== Compound ticker ===== */}
        <div className="ticker py-3.5 relative" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {TICKER_ITEMS.map((name) => (
                  <span key={`${dup}-${name}`} className="flex items-center font-mono-tech text-[11px] uppercase tracking-[0.22em] ticker-item">
                    <span className="px-6">{name}</span>
                    <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative">
          <div className="mt-4 flex flex-wrap gap-x-12 gap-y-6 pt-4">
            <div>
              <div className="font-heading text-3xl font-bold">≥99%</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.typicalPurity')} · HPLC</div>
            </div>
            <div className="border-l border-border pl-12">
              <div className="font-heading text-3xl font-bold">22+</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.products')}</div>
            </div>
            <div className="border-l border-border pl-12">
              <div className="font-heading text-3xl font-bold">{t('home.shippingValue')}</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.nationalShipping')}</div>
            </div>
            <div className="border-l border-border pl-12">
              <div className="font-heading text-3xl font-bold text-[hsl(var(--primary))]">COA</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.coa.batch')} NP-BPC5-2401 · 99.4%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="border-b border-border bg-card">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ i: ShieldCheck, t: t('home.trust.coa.title'), d: t('home.trust.coa.desc') }, { i: BadgeCheck, t: t('home.trust.purity.title'), d: t('home.trust.purity.desc') }, { i: Truck, t: t('home.trust.shipping.title'), d: t('home.trust.shipping.desc') }, { i: FlaskConical, t: t('home.trust.support.title'), d: t('home.trust.support.desc') }].map((b, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center shrink-0"><b.i className="h-5 w-5 text-[hsl(var(--primary))]" /></div>
              <div><div className="font-semibold text-sm">{b.t}</div><div className="text-xs text-muted-foreground">{b.d}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <div className="kicker">{t('home.categoriesKicker')}</div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-2">{t('home.categoriesTitle')}</h2>
          <p className="text-muted-foreground text-sm mt-1">{t('home.categoriesSubtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {localizeCategories(categories, language).map((c) => {
            const Icon = ICONS[c.icon] || FlaskConical;
            const chips = CATEGORY_CHIPS[c.slug] || [];
            return (
              <Link key={c.slug} to={`/catalogo?category=${c.slug}`} data-testid={`home-category-${c.slug}`} className="group">
                <Card className="p-5 h-full flex flex-col shadow-none hover:border-foreground/25 transition-colors duration-200 bg-card text-card-foreground rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center shrink-0"><Icon className="h-5 w-5 text-[hsl(var(--primary))]" /></div>
                    <h3 className="font-heading font-semibold text-sm leading-snug">{c.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                  {chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {chips.map((chip) => (
                        <span key={chip} className="font-mono-tech text-[10px] rounded bg-[hsl(var(--secondary))] border border-border px-1.5 py-0.5 text-muted-foreground">{chip}</span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--primary))]">
                    {t('home.explore')} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== Featured products ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="kicker">{t('home.featuredKicker')}</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-2">{t('home.featuredTitle')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('home.featuredSubtitle')}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => scrollCarousel(-1)} aria-label="previous" data-testid="featured-prev">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => scrollCarousel(1)} aria-label="next" data-testid="featured-next">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="ghost"><Link to="/catalogo">{t('home.viewAll')} <ArrowRight className="h-4 w-4 ml-1.5" /></Link></Button>
          </div>
        </div>
        <div ref={carouselRef} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {localizeProducts(featured, language).map((p) => (
            <div key={p.id} className="snap-start shrink-0 w-[65vw] xs:w-[240px] sm:w-[260px] max-w-[260px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== Before your first order — 3 education cards ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-12">
          <div className="kicker">{t('home.eduKicker')}</div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-2">{t('home.eduTitle')}</h2>
          <p className="text-muted-foreground text-sm mt-1">{t('home.eduSubtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: FlaskConical, title: t('home.edu1.title'), body: t('home.edu1.body'), to: '/info/terminos' },
            { icon: FileCheck2, title: t('home.edu2.title'), body: t('home.edu2.body'), to: '/info/calidad' },
            { icon: ScanSearch, title: t('home.edu3.title'), body: t('home.edu3.body'), to: '/info/calidad' },
          ].map((s, i) => (
            <Link key={i} to={s.to} className="group" data-testid={`home-edu-${i + 1}`}>
              <div className="rounded-xl border border-border bg-card p-5 h-full hover:border-foreground/25 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <s.icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <span className="font-mono-tech text-muted-foreground/60 text-sm">0{i + 1}</span>
                </div>
                <h3 className="font-heading font-semibold mt-4">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[hsl(var(--primary))]">
                  {t('home.explore')} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Traceability — light band, 3 steps ===== */}
      <section className="bg-[hsl(var(--secondary))] border-y border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="kicker">{t('home.transparencyKicker')}</div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-2">{t('home.transparencyTitle')}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{t('home.transparencyBody')}</p>
          </div>
          <div className="mt-9 grid md:grid-cols-3 gap-4">
            {[
              { icon: ScanSearch, text: t('home.transparency.bullet2') },
              { icon: FileCheck2, text: t('home.transparency.bullet1') },
              { icon: ShieldCheck, text: t('home.transparency.bullet3') },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <s.icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <span className="font-mono-tech text-muted-foreground/60 text-sm">0{i + 1}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-8"><Link to="/info/calidad">{t('home.learnProcess')}</Link></Button>
        </div>
      </section>

      {/* ===== Why Exygen — comparison ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-12">
          <div className="kicker">{t('home.whyKicker')}</div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-2">{t('home.whyTitle')}</h2>
          <p className="text-muted-foreground text-sm mt-1">{t('home.whySubtitle')}</p>
        </div>
        <Card className="overflow-hidden shadow-none">
          <div className="grid grid-cols-[1fr_auto_auto] text-sm">
            <div className="px-5 py-3.5 bg-[hsl(var(--secondary))]"> </div>
            <div className="px-5 sm:px-8 py-3.5 font-heading font-bold text-[hsl(var(--primary))] bg-[hsl(var(--accent))] text-center whitespace-nowrap">Exygen Labs</div>
            <div className="px-5 sm:px-8 py-3.5 font-medium text-muted-foreground bg-[hsl(var(--secondary))] text-center whitespace-nowrap">{t('home.why.others')}</div>
            {whyRows.map((row, i) => (
              <React.Fragment key={i}>
                <div className="px-5 py-3.5 border-t border-border">{row.label}</div>
                <div className="px-5 sm:px-8 py-3.5 border-t border-border bg-[hsl(var(--accent))]/40 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                </div>
                <div className="px-5 sm:px-8 py-3.5 border-t border-border flex items-center justify-center">
                  {row.others === 'partial'
                    ? <span className="text-xs text-muted-foreground">{t('home.why.partial')}</span>
                    : <MinusCircle className="h-5 w-5 text-muted-foreground/50" />}
                </div>
              </React.Fragment>
            ))}
          </div>
        </Card>
      </section>

      {/* ===== Wholesale / B2B ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-2xl border border-border bg-[hsl(var(--secondary))] px-6 py-10 sm:px-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
              <Building2 className="h-3.5 w-3.5 text-[hsl(var(--primary))]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--primary))]">{t('home.b2bKicker')}</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-4">{t('home.b2bTitle')}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg">{t('home.b2bBody')}</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <Button asChild className="rounded-full h-12 px-7 uppercase tracking-[0.14em] text-xs font-bold" data-testid="b2b-quote-button">
              <a href="mailto:hola@exygenlabs.com?subject=Mayoreo"><Mail className="h-4 w-4 mr-2" /> {t('home.b2bCta1')}</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full h-12 px-7 uppercase tracking-[0.14em] text-xs font-semibold">
              <Link to="/catalogo">{t('home.b2bCta2')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Payments ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-2xl border border-border bg-card px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-heading font-semibold">{t('home.paymentsTitle')}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{t('home.paymentsNote')}</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[{ i: Landmark, l: 'SPEI' }, { i: CreditCard, l: 'Visa · Mastercard · Amex' }, { i: Bitcoin, l: 'Cripto' }].map((p, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-[hsl(var(--secondary))] px-3 py-2 text-xs font-medium">
                <p.i className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {p.l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RUO notice ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] p-5 flex items-start gap-3">
          <FlaskConical className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed"><strong>{t('home.heroRuo')}</strong> {t('home.ruoNotice')}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
