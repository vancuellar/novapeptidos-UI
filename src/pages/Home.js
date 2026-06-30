import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FlaskConical, Truck, BadgeCheck, ArrowRight, HeartPulse, Activity, Flame, Hourglass, Brain, Sparkles, Layers, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import api from '@/lib/api';
import { fallbackCategories, getFallbackFeaturedProducts } from '@/data/fallbackCatalog';
import { useLanguage } from '@/context/LanguageContext';
import { localizeCategories, localizeProducts } from '@/i18n/catalog';

const ICONS = { HeartPulse, Activity, Flame, Hourglass, Brain, Sparkles, Layers, FlaskConical };

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    api.get('/products?featured=true')
      .then((r) => setFeatured(r.data.slice(0, 8)))
      .catch(() => setFeatured(getFallbackFeaturedProducts()));
    api.get('/categories')
      .then((r) => setCategories(r.data))
      .catch(() => setCategories(fallbackCategories));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient bg-grain border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-card text-card-foreground border border-border px-3 py-1 text-xs font-medium mb-5">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--success))]" /> {t('home.badge')}
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">{t('home.heroTitle')}</h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">{t('home.heroBody')} <span className="font-medium text-foreground">{t('home.heroRuo')}</span></p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" data-testid="hero-catalog-button"><Link to="/catalogo">{t('home.viewCatalog')} <ArrowRight className="h-4 w-4 ml-1.5" /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/info/calidad">{t('home.verifyPurity')}</Link></Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <div><div className="font-heading text-2xl font-bold">>=99%</div><div className="text-xs text-muted-foreground">{t('home.typicalPurity')}</div></div>
                <div><div className="font-heading text-2xl font-bold">22+</div><div className="text-xs text-muted-foreground">{t('home.products')}</div></div>
                <div><div className="font-heading text-2xl font-bold">2-5 dias</div><div className="text-xs text-muted-foreground">{t('home.nationalShipping')}</div></div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.pexels.com/photos/9259964/pexels-photo-9259964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt={t('home.labAlt')} className="rounded-2xl border border-border shadow-[var(--shadow-md)] w-full object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ i: ShieldCheck, t: t('home.trust.coa.title'), d: t('home.trust.coa.desc') }, { i: BadgeCheck, t: t('home.trust.purity.title'), d: t('home.trust.purity.desc') }, { i: Truck, t: t('home.trust.shipping.title'), d: t('home.trust.shipping.desc') }, { i: FlaskConical, t: t('home.trust.support.title'), d: t('home.trust.support.desc') }].map((b, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center shrink-0"><b.i className="h-5 w-5 text-[hsl(var(--primary))]" /></div>
              <div><div className="font-semibold text-sm">{b.t}</div><div className="text-xs text-muted-foreground">{b.d}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{t('home.categoriesTitle')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('home.categoriesSubtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {localizeCategories(categories, language).map((c) => {
            const Icon = ICONS[c.icon] || FlaskConical;
            return (
              <Link key={c.slug} to={`/catalogo?category=${c.slug}`} data-testid={`home-category-${c.slug}`}>
                <Card className="p-5 h-full hover:shadow-[var(--shadow-md)] hover:border-[hsl(var(--primary))] transition-all duration-200 bg-card text-card-foreground">
                  <div className="h-11 w-11 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center mb-3"><Icon className="h-5 w-5 text-[hsl(var(--primary))]" /></div>
                  <h3 className="font-heading font-semibold text-sm">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{t('home.featuredTitle')}</h2>
            <p className="text-muted-foreground text-sm mt-1">{t('home.featuredSubtitle')}</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex"><Link to="/catalogo">{t('home.viewAll')} <ArrowRight className="h-4 w-4 ml-1.5" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {localizeProducts(featured, language).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Transparency / COA banner */}
      <section className="bg-[hsl(var(--secondary))] border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8 items-center">
          <img src="https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt={t('home.coaAlt')} className="rounded-2xl border border-border w-full object-cover aspect-[16/10]" />
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{t('home.transparencyTitle')}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{t('home.transparencyBody')}</p>
            <ul className="mt-5 space-y-3">
              {['home.transparency.bullet1', 'home.transparency.bullet2', 'home.transparency.bullet3'].map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm"><ShieldCheck className="h-5 w-5 text-[hsl(var(--primary))] shrink-0" /> {t(key)}</li>
              ))}
            </ul>
            <Button asChild className="mt-6"><Link to="/info/calidad">{t('home.learnProcess')}</Link></Button>
          </div>
        </div>
      </section>

      {/* RUO notice */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] p-5 flex items-start gap-3">
          <FlaskConical className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed"><strong>{t('home.heroRuo')}</strong> {t('home.ruoNotice')}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
