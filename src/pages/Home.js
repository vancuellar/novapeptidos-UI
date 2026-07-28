import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, FlaskConical, Truck, BadgeCheck, ArrowRight, HeartPulse, Activity, Flame, Hourglass,
  Brain, Sparkles, Layers, CheckCircle2, MinusCircle, FileCheck2, ScanSearch, Landmark, CreditCard,
  ChevronLeft, ChevronRight, Building2, Mail, Bitcoin, Globe, Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import api from '@/lib/api';
import { VISIBLE_CATEGORIES, fallbackProducts } from '@/data/fallbackCatalog';
import { FEATURED_TABS, getTabProducts } from '@/data/featured';
import { useLanguage } from '@/context/LanguageContext';
import { localizeCategories, localizeProducts } from '@/i18n/catalog';

const ICONS = { HeartPulse, Activity, Flame, Hourglass, Brain, Sparkles, Layers, FlaskConical };

// EL NÚMERO QUE SOSTIENE LA AFIRMACIÓN (Christian, 2026-07-28).
// "Somos el distribuidor de péptidos más grande de México" es un adjetivo, y un
// adjetivo lo escribe cualquiera. Lo que no puede escribir cualquiera es la cuenta:
// hoy vendemos 193 presentaciones contra 183 de Exoma y 47 de Certified/PepMex, o
// sea el catálogo más amplio de los que se miden. Por eso la frase nunca sale sola
// en la portada: siempre lleva la cifra pegada.
//
// La cifra se CUENTA del catálogo del sitio, no se escribe a mano. Si mañana se
// oculta un producto (pasó con Dysport y HUMSC), el número baja solo y la portada
// nunca queda prometiendo un catálogo que ya no existe.
const PRESENTACIONES = fallbackProducts.reduce((n, p) => n + (p.variants?.length || 1), 0);
const COMPUESTOS = fallbackProducts.length;
const CATEGORIAS = VISIBLE_CATEGORIES.length;

// Un archivo por vial (botellas que mandó Christian): cada uno se levanta solo
// al pasar el cursor y lleva al catálogo. Alturas escalonadas para la silueta.
// Orden de Christian: Reta al centro y al frente; NAD y KLOW a sus lados como
// principales; Tirze y Sema en las esquinas.
// Son DIEZ y se ven CINCO a la vez: el carrusel va rotando (Christian, 2026-07-26).
// Los cinco primeros son los de siempre y conservan su orden — Reta al centro y
// al frente, NAD y KLOW a los lados, Tirze y GHK-Cu en las esquinas.
const HERO_VIALS = [
  { slug: 'vial-tirzepatide', name: 'Tirzepatida 20mg', product: 'tirzepatida' },
  { slug: 'vial-nad', name: 'NAD+ 500mg', product: 'nad-plus' },
  { slug: 'vial-retatrutide', name: 'Retatrutida 40mg', product: 'retatrutida' },
  { slug: 'vial-klow', name: 'KLOW 80mg', product: 'klow-bpc-ghk-cu-tb-500-kpv' },
  // GHK-Cu sube a los cinco de arriba y Semaglutida baja al grupo que rota
  // (Christian, 2026-07-26): la competencia empuja mucho GHK-Cu y nosotros ya lo
  // vendemos tres veces sin darle protagonismo — suelto, dentro de GLOW y dentro
  // de KLOW. Semaglutida sigue en el carrusel, solo que ya no fija.
  { slug: 'vial-ghkcu', name: 'GHK-Cu 50mg', product: 'ghk-cu' },
  // Los de abajo son los que dan variedad: entran conforme el carrusel gira.
  // Son de familias distintas a propósito (reparación, hormona de crecimiento,
  // estética, nootrópicos, sueño, salud sexual, metabólicos).
  { slug: 'vial-bpc157', name: 'BPC-157 10mg', product: 'bpc-157' },
  { slug: 'vial-tb500', name: 'TB-500 10mg', product: 'tb-500' },
  { slug: 'vial-ipamorelin', name: 'Ipamorelin 5mg', product: 'ipamorelin' },
  { slug: 'vial-cjc1295', name: 'CJC-1295 5mg', product: 'cjc-1295-sin-dac' },
  { slug: 'vial-tesamorelina', name: 'Tesamorelina 10mg', product: 'tesamorelina' },
  { slug: 'vial-semaglutide', name: 'Semaglutida 10mg', product: 'semaglutida' },
  { slug: 'vial-semax', name: 'Semax 10mg', product: 'semax' },
  { slug: 'vial-dsip', name: 'DSIP 5mg', product: 'dsip' },
  { slug: 'vial-pt141', name: 'PT-141 10mg', product: 'pt-141' },
  { slug: 'vial-cagrilintida', name: 'Cagrilintida 5mg', product: 'cagrilintida' },
].map((v) => ({ ...v, src: `${process.env.PUBLIC_URL}/images/hero/${v.slug}.webp` }));

// Cuántos se ven a la vez y qué altura tiene cada POSICIÓN — no cada vial.
// Como el carrusel de apps de Apple (Christian, 2026-07-26): el del centro es el
// más grande, sus vecinos algo menos y los de las orillas los más chicos. Al girar,
// la botella que va llegando al centro es la que crece. El escalón es de la FILA,
// no de la botella: por eso las alturas van por índice de posición.
//
// ⚠️ Se iguala por ALTURA, nunca por ancho. Los cinco viales originales de Christian
// son más angostos (aspecto 0.45) que los generados (0.66): cuando la medida era el
// ancho, los nuevos salían aplastados y flacos.
//
// Las alturas salen de los anchos del diseño original (13% / 14.5% / 16% del
// contenedor) divididos entre el aspecto del vial: 540 px de contenedor en pantalla
// grande, 343 en teléfono.
const HERO_VISIBLES = 5;
const HERO_ALTURAS = [
  { movil: 99, grande: 155 },
  { movil: 110, grande: 173 },
  { movil: 121, grande: 191 },
  { movil: 110, grande: 173 },
  { movil: 99, grande: 155 },
];

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
  const [featuredTab, setFeaturedTab] = useState(FEATURED_TABS[0].key);
  const [categories, setCategories] = useState([]);
  const [hoveredVial, setHoveredVial] = useState(null);
  const [vialOffset, setVialOffset] = useState(0);
  const carouselRef = useRef(null);
  const { language, t } = useLanguage();
  // Solicitud "Quiero ser distribuidor" (sección Mayoreo). Christian aprueba en su Admin.
  const [b2bOpen, setB2bOpen] = useState(false);
  const [b2bSent, setB2bSent] = useState(false);
  const [b2bSending, setB2bSending] = useState(false);
  const [b2bForm, setB2bForm] = useState({ name: '', email: '', phone: '', kind: '', message: '' });
  const setB2b = (k, v) => setB2bForm((f) => ({ ...f, [k]: v }));
  const submitB2b = async () => {
    if (!b2bForm.name.trim() || !/.+@.+\..+/.test(b2bForm.email)) { toast.error(t('b2b.form.required')); return; }
    setB2bSending(true);
    try {
      await api.post('/distributor-applications', b2bForm);
      setB2bSent(true);
    } catch (err) {
      toast.error(err.response?.data?.detail || t('b2b.form.error'));
    } finally { setB2bSending(false); }
  };

  const scrollCarousel = (dir) => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  useEffect(() => {
    // Los destacados son una lista curada nuestra (src/data/featured.js), no lo
    // que diga el backend: el campo `featured` del catálogo lo regenera el
    // script de precios y se perdería el orden que eligió Christian.
    setFeatured(getTabProducts(featuredTab));
    // Las categorias salen del catalogo del sitio, NO del API: el API devuelve
    // slugs viejos que ningun producto usa y esas tarjetas abrian vacias.
    setCategories(VISIBLE_CATEGORIES);
  }, [featuredTab]);

  // El carrusel NO gira solo: lo mueve el cliente con las flechas o deslizando
  // (Christian, 2026-07-26). Así puede detenerse en el vial que le interese sin
  // que se le vaya.
  const girarViales = (dir) => setVialOffset(
    (o) => (o + dir + HERO_VIALS.length) % HERO_VIALS.length,
  );

  // Deslizar con el dedo en el teléfono. 40 px para no confundir un toque con
  // un arrastre.
  const tocoRef = useRef(null);
  const alTocar = (e) => { tocoRef.current = e.touches[0].clientX; };
  const alSoltar = (e) => {
    if (tocoRef.current === null) return;
    const corrido = e.changedTouches[0].clientX - tocoRef.current;
    if (Math.abs(corrido) > 40) girarViales(corrido < 0 ? 1 : -1);
    tocoRef.current = null;
  };

  // El mouse NO mueve el carrusel. Se probo el 2026-07-26 (avanzaba un vial cada
  // 140 px de recorrido) y a Christian no le gusto como se sentia: se mueve solo
  // con las flechas, o deslizando el dedo en el telefono.
  const alSalirDeLaFila = () => setHoveredVial(null);

  const vialesVisibles = Array.from({ length: HERO_VISIBLES }, (_, i) => ({
    ...HERO_VIALS[(vialOffset + i) % HERO_VIALS.length],
    alto: HERO_ALTURAS[i],
  }));

  const heroTitleRaw = t('home.heroTitle');
  const commaIdx = heroTitleRaw.indexOf(',');
  const heroLead = commaIdx >= 0 ? heroTitleRaw.slice(0, commaIdx + 1) : heroTitleRaw.split(' ').slice(0, -2).join(' ');
  const heroAccent = commaIdx >= 0 ? heroTitleRaw.slice(commaIdx + 1).trim() : heroTitleRaw.split(' ').slice(-2).join(' ');

  // Los dos primeros renglones son los que de verdad nos separan y por eso van
  // ARRIBA, no al final: Certified abre su comparativa con "fabricado en EE. UU."
  // y aquí el origen se leía hasta el último lugar, donde casi nadie llega.
  // El del catálogo va con 'no' porque no es cuestión de grado: el más amplio es
  // uno solo. El del origen va con 'partial' porque algún competidor sí dice de
  // dónde viene su material. (Christian, 2026-07-28.)
  const whyRows = [
    { label: t('home.why.r8'), others: 'partial' },
    { label: t('home.why.r7', { presentaciones: PRESENTACIONES }), others: 'no' },
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
        {/* El aire de arriba ya incluye los 60px de la barra (la sección los repone
            con pt-[60px]). Era pt-20/pt-28 = 80px en móvil y 112 en escritorio entre
            la barra y "RESEARCH GRADE PEPTIDES". Christian los pidió a la mitad:
            40 y 56 (2026-07-26). */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-16 relative">
          {/* El titulo va ARRIBA de los viales tambien en telefono
              (Christian, 2026-07-26). */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-center">
            <div>
              <div className="kicker">{t('home.kicker')}</div>
              <h1 className="font-heading text-[2.1rem] sm:text-5xl lg:text-[3.6rem] font-bold tracking-tight leading-[1.08] mt-6 break-words">
                {heroLead}
                {/* "lote por lote" va en su propio renglon, debajo. */}
                <span className="hero-title-accent block">{heroAccent}</span>
              </h1>
              {/* Márgenes de Resend: subtítulo pegado al título (8px) y 32px antes de los botones. */}
              <p className="mt-3 text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t('home.heroBody')}
              </p>
              {/* SELLO DE DESCUENTO. (Christian, 2026-07-27; cifra actualizada 2026-07-28)
                  El 10% se aplicaba solo en el carrito, así que el visitante se
                  enteraba hasta el final — o nunca. Aquí se anuncia de entrada,
                  con forma de sello estampado y no de banner de descuento, que es
                  lo que baja el tono de una marca.
                  El sello enseña el TECHO (15%) porque es lo que hace mirar, y el
                  renglón de abajo dice el rango completo (10 al 15%) para que nadie
                  llegue al carrito esperando 15% y se encuentre 10. */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link to="/catalogo" className="btn-resend" data-testid="hero-catalog-button">
                  {t('home.viewCatalog')} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/aprende/empieza-aqui" className="btn-resend-ghost">{t('home.startHere')}</Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* SELLO DE DESCUENTO. (Christian, 2026-07-28): vive del lado
                  derecho del hero, ARRIBA de los viales — no encima de ellos.
                  El sello enseña el TECHO (15%) porque es lo que hace mirar, y
                  el renglón de al lado dice el rango completo (10 al 15%) para
                  que nadie llegue al carrito esperando 15 y se encuentre 10. */}
              {/* self-end: alineado a la DERECHA de la columna (Christian, 2026-07-28). */}
              <div className="inline-flex items-center gap-3.5 mb-5 self-center lg:self-end" data-testid="hero-sello-descuento">
                <div className="sello">
                  <span className="sello-hasta">hasta</span>
                  <span className="sello-pct">15%</span>
                  <span className="sello-off">OFF</span>
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-foreground">{t('home.stamp.title')}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t('home.stamp.sub')}</div>
                </div>
              </div>
              <div className="hero-vials w-full max-w-[540px]">
                <div className="hero-vials-glow" />
                {/* Quince viales, cinco a la vista. Las flechas (o el dedo) los van
                    corriendo: entran los de atrás y se ocultan los de adelante.
                    El hover se maneja en estado, no solo en CSS, porque el vial
                    apuntado crece y los vecinos se encogen: es un efecto de la
                    fila completa, como el dock de macOS. */}
                <button
                  type="button"
                  aria-label={t('common.previous')}
                  onClick={() => girarViales(-1)}
                  className="hero-vial-flecha hero-vial-flecha-izq"
                  data-testid="hero-vial-prev"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label={t('common.next')}
                  onClick={() => girarViales(1)}
                  className="hero-vial-flecha hero-vial-flecha-der"
                  data-testid="hero-vial-next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="relative flex items-end justify-center gap-0.5 sm:gap-1"
                  onMouseLeave={alSalirDeLaFila}
                  onTouchStart={alTocar}
                  onTouchEnd={alSoltar}>
                  {vialesVisibles.map((v, i) => {
                    const state = hoveredVial === null ? 'idle'
                      : hoveredVial === i ? 'active'
                      : Math.abs(hoveredVial - i) === 1 ? 'near' : 'far';
                    return (
                      <Link
                        key={v.slug}
                        to={`/producto/${v.product}`}
                        className={`hero-vial-link hero-vial-${state} block shrink-0`}
                        style={{ '--vial-h-movil': `${v.alto.movil}px`, '--vial-h-grande': `${v.alto.grande}px` }}
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
        {/* pb-12 y no pb-24: los destacados vienen justo abajo y con los dos
            colchones juntos quedaba un hueco enorme (Christian, 2026-07-28). */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative">
          {/* Centrado bajo el carrusel de compuestos (Christian, 2026-07-28). Antes
              colgaba a la izquierda y quedaba desalineado con la cinta que corre
              arriba, que sí ocupa todo el ancho. En pantalla chica siguen siendo dos
              columnas —a un ancho de teléfono, cuatro cifras en fila no se leen— pero
              el bloque entero va centrado. `justify-center` en la fila y `text-center`
              en cada dato, para que el número y su etiqueta compartan eje. */}
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 pt-4 text-center sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12">
            <div>
              <div className="font-heading text-3xl font-bold">≥99%</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.typicalPurity')} · HPLC</div>
            </div>
            {/* Aquí decía "96 Productos". Pesa más la cuenta de PRESENTACIONES: es
                mayor, es la que de verdad mide la variedad (un mismo compuesto en
                tres tamaños son tres cosas distintas para quien compra) y es la que
                usa el sello de arriba, así que las dos cifras concuerdan. */}
            <div>
              <div className="font-heading text-3xl font-bold">{PRESENTACIONES}</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.presentations')}</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold">{t('home.shippingValue')}</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.nationalShipping')}</div>
            </div>
            <div>
              <div className="font-heading text-3xl font-bold text-[hsl(var(--primary))]">COA</div>
              <div className="font-mono-tech text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground mt-1.5">{t('home.coa.batch')} NP-BPC5-2401 · 99.4%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured products ===== */}
      {/* Subieron aquí, JUSTO debajo de la cinta de compuestos y los cuatro datos
          del hero (Christian, 2026-07-28): los péptidos son el único producto y el
          enfoque de la marca, así que el producto se enseña antes que los sellos.
          pt-8 arriba (el hero ya trae su pb-12) y pb-24 abajo, donde sí hay corte. */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="flex items-end justify-between mb-6">
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
        {/* Pestañas: cambian QUÉ se muestra, no cómo (Christian, 2026-07-26).
            Para ordenar y filtrar está el catálogo; aquí la idea es dar razón
            para quedarse. Se deslizan a lo ancho en el teléfono. */}
        <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist" data-testid="featured-tabs">
          {FEATURED_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={featuredTab === tab.key}
              onClick={() => setFeaturedTab(tab.key)}
              data-testid={`featured-tab-${tab.key}`}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                featuredTab === tab.key
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-semibold'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-[hsl(var(--primary))]/40'
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div ref={carouselRef} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {localizeProducts(featured, language).map((p) => (
            <div key={p.id} className="snap-start shrink-0 w-[65vw] xs:w-[240px] sm:w-[260px] max-w-[260px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      {/* Son CINCO sellos desde el 2026-07-28: entró el del origen en Estados Unidos.
          La rejilla pasa de 4 a 5 columnas en pantalla grande y se queda en 2 y 3 en
          las chicas — con cinco, el último renglón deja un hueco, que es preferible a
          apretar cinco tarjetas en una fila de teléfono. */}
      <section className="border-b border-border bg-card">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[{ i: ShieldCheck, t: t('home.trust.coa.title'), d: t('home.trust.coa.desc') }, { i: BadgeCheck, t: t('home.trust.purity.title'), d: t('home.trust.purity.desc') }, { i: Globe, t: t('home.trust.origin.title'), d: t('home.trust.origin.desc') }, { i: Truck, t: t('home.trust.shipping.title'), d: t('home.trust.shipping.desc') }, { i: FlaskConical, t: t('home.trust.support.title'), d: t('home.trust.support.desc') }].map((b, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center shrink-0"><b.i className="h-5 w-5 text-[hsl(var(--primary))]" /></div>
              <div><div className="font-semibold text-sm">{b.t}</div><div className="text-xs text-muted-foreground">{b.d}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== El catálogo más grande de México ===== */}
      {/* Va INMEDIATAMENTE después de la barra de confianza (los destacados quedan
          arriba, pegados al hero, desde el 2026-07-28):
          el visitante acaba de leer las garantías y lo siguiente que tiene que saber
          es por qué comprar aquí y no en la otra tienda. La respuesta es la variedad,
          y la variedad se demuestra con las tres cuentas de la derecha, no con
          adjetivos. La tarjeta de abajo es el origen: laboratorios de Estados Unidos.
          ⛔ NUNCA se menciona Asia, en ningún idioma — orden expresa de Christian
          (2026-07-28). Y tampoco se inventa una fábrica propia que no tenemos. */}
      <section className="border-b border-border" data-testid="home-liderazgo">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="kicker">{t('home.leadKicker')}</div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2.4rem] font-bold tracking-tight leading-[1.12] mt-2">
              {t('home.leadTitle')}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              {t('home.leadBody', { presentaciones: PRESENTACIONES, categorias: CATEGORIAS })}
            </p>
            <Link to="/catalogo" className="btn-resend mt-7" data-testid="lead-catalog-button">
              {t('home.leadCta', { presentaciones: PRESENTACIONES })} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
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
            <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))] p-5" data-testid="home-origen-eua">
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-[hsl(var(--primary))] shrink-0" />
                <h3 className="font-heading font-semibold text-sm">{t('home.leadUsa.title')}</h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{t('home.leadUsa.body')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
          {/* Cuatro pasos desde el 2026-07-28: entró el origen. Rastrear el lote sirve
              de poco si no se dice de qué laboratorio salió, así que va como paso más
              y la rejilla pasa de 3 a 4 columnas (2 en tableta, para que no se aplasten). */}
          <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ScanSearch, text: t('home.transparency.bullet2') },
              { icon: FileCheck2, text: t('home.transparency.bullet1') },
              { icon: Globe, text: t('home.transparency.bullet4') },
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
        {/* En teléfono esta tabla ya se salía de su tarjeta y, como la tarjeta recorta
            lo que sobra, la columna "Otros vendedores" quedaba cortada a la mitad.
            Pasaba desde antes y con los renglones nuevos se notó más. El arreglo:
            en pantalla chica los encabezados pueden partirse en dos renglones y los
            costados van más justos; de sm en adelante todo queda como estaba.

            Y en teléfono las dos columnas de la derecha van a ANCHO FIJO, no 'auto'.
            Con 'auto' las dimensionaba el encabezado "Otros vendedores", que se
            comía más de la mitad de la pantalla y dejaba la columna del texto tan
            angosta que el renglón del origen en Estados Unidos —el más largo y el
            que Christian quiere que se lea primero— caía en diez líneas. Fijando
            56 y 88 px el encabezado se parte en dos renglones (que es justo lo que
            ya permitía el arreglo anterior) y el texto recupera casi el doble de
            ancho. De sm en adelante vuelve a 'auto' y no cambia nada. */}
        <Card className="overflow-hidden shadow-none">
          <div className="grid grid-cols-[1fr_3.5rem_5.5rem] sm:grid-cols-[1fr_auto_auto] text-sm">
            <div className="px-3.5 sm:px-5 py-3.5 bg-[hsl(var(--secondary))]"> </div>
            {/* En teléfono los encabezados van en 11 px y con los costados justos:
                "vendedores" es la palabra más larga y con 14 px se salía de su
                celda, y como la tarjeta recorta, se leía cortada. */}
            <div className="px-2 sm:px-8 py-3.5 text-[11px] sm:text-sm font-heading font-bold text-[hsl(var(--primary))] bg-[hsl(var(--accent))] text-center sm:whitespace-nowrap">Exygen Labs</div>
            <div className="px-2 sm:px-8 py-3.5 text-[11px] sm:text-sm font-medium text-muted-foreground bg-[hsl(var(--secondary))] text-center sm:whitespace-nowrap">{t('home.why.others')}</div>
            {whyRows.map((row, i) => (
              <React.Fragment key={i}>
                <div className="px-3.5 sm:px-5 py-3.5 border-t border-border min-w-0">{row.label}</div>
                <div className="px-3 sm:px-8 py-3.5 border-t border-border bg-[hsl(var(--accent))]/40 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                </div>
                <div className="px-3 sm:px-8 py-3.5 border-t border-border flex items-center justify-center">
                  {/* "Parcial" también se parte si hace falta: en 320 px cada píxel cuenta. */}
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
            <Button className="rounded-full h-12 px-7 uppercase tracking-[0.14em] text-xs font-bold" data-testid="b2b-apply-button"
              onClick={() => { setB2bSent(false); setB2bOpen(true); }}>
              <Mail className="h-4 w-4 mr-2" /> {t('b2b.cta')}
            </Button>
            <Button asChild variant="outline" className="rounded-full h-12 px-7 uppercase tracking-[0.14em] text-xs font-semibold">
              <Link to="/catalogo">{t('home.b2bCta2')}</Link>
            </Button>
          </div>
        </div>

        {/* Solicitud de distribuidor: llega al Admin de Christian, nada se aprueba solo. */}
        <Dialog open={b2bOpen} onOpenChange={setB2bOpen}>
          <DialogContent className="max-w-md" data-testid="b2b-dialog">
            <DialogHeader><DialogTitle>{t('b2b.form.title')}</DialogTitle></DialogHeader>
            {b2bSent ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid="b2b-sent">{t('b2b.form.sent')}</p>
                <DialogFooter><Button onClick={() => setB2bOpen(false)}>{t('admin.dist.close')}</Button></DialogFooter>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div><Label>{t('b2b.form.name')}</Label><Input className="mt-1.5" value={b2bForm.name} onChange={(e) => setB2b('name', e.target.value)} data-testid="b2b-name" /></div>
                  <div><Label>{t('b2b.form.email')}</Label><Input type="email" className="mt-1.5" value={b2bForm.email} onChange={(e) => setB2b('email', e.target.value)} data-testid="b2b-email" /></div>
                  <div><Label>{t('b2b.form.phone')}</Label><Input type="tel" className="mt-1.5" value={b2bForm.phone} onChange={(e) => setB2b('phone', e.target.value)} data-testid="b2b-phone" /></div>
                  <div>
                    <Label>{t('b2b.form.kind')}</Label>
                    <Select value={b2bForm.kind || undefined} onValueChange={(v) => setB2b('kind', v)}>
                      <SelectTrigger className="mt-1.5" data-testid="b2b-kind"><SelectValue placeholder={t('admin.select')} /></SelectTrigger>
                      <SelectContent>
                        {['clinica', 'laboratorio', 'revendedor', 'otro'].map((k) => <SelectItem key={k} value={k}>{t(`b2b.kind.${k}`)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>{t('b2b.form.message')}</Label><Textarea className="mt-1.5" rows={3} value={b2bForm.message} onChange={(e) => setB2b('message', e.target.value)} data-testid="b2b-message" /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setB2bOpen(false)}>{t('common.cancel')}</Button>
                  <Button onClick={submitB2b} disabled={b2bSending} data-testid="b2b-submit">{b2bSending ? t('common.loading') : t('b2b.form.send')}</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* ===== Payments ===== */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-2xl border border-border bg-card px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-heading font-semibold">{t('home.paymentsTitle')}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{t('home.paymentsNote')}</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[{ i: Landmark, l: 'SPEI' }, { i: CreditCard, l: 'Visa · Mastercard · Amex' }, { i: Store, l: 'OXXO' }, { i: Bitcoin, l: 'Cripto' }].map((p, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-[hsl(var(--secondary))] px-3 py-2 text-xs font-medium">
                <p.i className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {p.l}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
