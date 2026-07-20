import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FlaskConical, ChevronRight, ArrowRight } from 'lucide-react';
import { fallbackProducts, fallbackCategories } from '@/data/fallbackCatalog';
import { formatMXN } from '@/lib/api';

const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// El compendio se arma del mismo catálogo curado que vende el sitio: así nunca
// documenta un compuesto que no existe ni queda desfasado de los precios.
const ENTRIES = fallbackProducts.map((p) => {
  const variants = (p.variants || []).filter((v) => Number.isFinite(v.price));
  const doses = variants.map((v) => v.presentation).filter(Boolean);
  const from = variants.length ? Math.min(...variants.map((v) => v.price)) : p.price;
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    summary: p.short_description || p.description || '',
    presentations: doses.length ? doses : [p.presentation].filter(Boolean),
    purity: p.purity,
    form: p.form,
    storage: p.storage,
    from,
    refDose: p.start_dose != null ? `${p.start_dose} ${p.start_unit || ''}`.trim() : null,
    search: norm(`${p.name} ${p.slug} ${p.short_description} ${p.category}`),
  };
}).sort((a, b) => a.name.localeCompare(b.name, 'es'));

const CATEGORY_LABEL = Object.fromEntries(fallbackCategories.map((c) => [c.slug, c.name]));
const CATEGORIES = [...new Set(ENTRIES.map((e) => e.category))]
  .map((slug) => ({ slug, name: CATEGORY_LABEL[slug] || slug, count: ENTRIES.filter((e) => e.category === slug).length }))
  .sort((a, b) => b.count - a.count);

const Compendium = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('todas');

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return ENTRIES.filter((e) => (category === 'todas' || e.category === category) && (!q || e.search.includes(q)));
  }, [query, category]);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
      <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
        <Link to="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/aprende" className="hover:text-foreground">Aprende</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Fichas de compuestos</span>
      </nav>

      <header className="mb-6">
        <div className="inline-flex items-center gap-2 text-[hsl(var(--primary))] mb-2">
          <FlaskConical className="h-5 w-5" />
          <span className="text-xs font-medium uppercase tracking-wide">Fichas de compuestos</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">Fichas técnicas de compuestos</h1>
        <p className="text-base text-muted-foreground mt-3 max-w-3xl leading-relaxed">
          Ficha de referencia de cada compuesto que manejamos: presentaciones disponibles, forma,
          pureza declarada, conservación y dosis de referencia de investigación. Material exclusivo
          para uso en investigación (RUO).
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[['Compuestos', ENTRIES.length], ['Categorías', CATEGORIES.length], ['Pureza declarada', '≥ 99%']].map(([label, value]) => (
          <Card key={label} className="p-4">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="font-heading text-xl font-bold mt-1">{value}</div>
          </Card>
        ))}
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por nombre o por lo que estudia…" data-testid="compendium-search" />
      </div>

      <div className="flex flex-wrap gap-2 mb-3" data-testid="compendium-filters">
        <button onClick={() => setCategory('todas')}
          className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${category === 'todas' ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/40'}`}>
          Todas ({ENTRIES.length})
        </button>
        {CATEGORIES.map((c) => (
          <button key={c.slug} onClick={() => setCategory(c.slug)}
            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${category === c.slug ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/40'}`}>
            {c.name} ({c.count})
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-5" data-testid="compendium-count">
        Mostrando {filtered.length} de {ENTRIES.length} compuestos
      </p>

      {filtered.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">
          Ningún compuesto coincide. Prueba con otro término o quita el filtro de categoría.
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((e) => (
            <Card key={e.slug} className="p-4 flex flex-col" data-testid="compendium-entry">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className="font-heading text-sm font-semibold leading-snug">{e.name}</h2>
                <Badge className="bg-[hsl(var(--muted))] text-muted-foreground border border-border text-[10px] shrink-0">
                  {CATEGORY_LABEL[e.category] || e.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{e.summary}</p>
              <dl className="text-[11px] mt-3 space-y-1">
                <div className="flex gap-2"><dt className="text-muted-foreground w-24 shrink-0">Presentaciones</dt><dd>{e.presentations.join(' · ') || '—'}</dd></div>
                <div className="flex gap-2"><dt className="text-muted-foreground w-24 shrink-0">Forma</dt><dd>{e.form || '—'}</dd></div>
                <div className="flex gap-2"><dt className="text-muted-foreground w-24 shrink-0">Pureza</dt><dd>{e.purity || '—'}</dd></div>
                {e.refDose && <div className="flex gap-2"><dt className="text-muted-foreground w-24 shrink-0">Dosis ref.</dt><dd>{e.refDose}</dd></div>}
                {Number.isFinite(e.from) && <div className="flex gap-2"><dt className="text-muted-foreground w-24 shrink-0">Desde</dt><dd className="font-medium">{formatMXN(e.from)}</dd></div>}
              </dl>
              <Link to={`/producto/${e.slug}`} className="inline-flex items-center gap-1 text-xs text-[hsl(var(--primary))] mt-3 hover:underline">
                Ver ficha completa <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-5 mt-8 bg-[hsl(var(--muted))]/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <span className="font-semibold">¿No sabes por dónde empezar?</span> El asesor te arma un plan según tu objetivo.
          </div>
          <div className="flex gap-2">
            <Link to="/aprende"><Button variant="outline" size="sm">Ir a Aprende</Button></Link>
            <Link to="/asesor"><Button size="sm">Armar mi plan</Button></Link>
          </div>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
        La dosis de referencia es un punto de partida de la literatura de investigación, no una pauta de uso.
        Los certificados de análisis del lote están disponibles bajo solicitud en hola@exygenlabs.com.
      </p>
    </div>
  );
};

export default Compendium;
