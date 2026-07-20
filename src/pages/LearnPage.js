import React, { useState, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ChevronRight, Check, AlertTriangle, Info, Search, Ban, ArrowRight,
} from 'lucide-react';
import { LEARN_PAGES } from '@/data/learn';

const TONE = {
  info: { icon: Info, cls: 'border-[hsl(var(--primary))]/40 bg-[hsl(var(--primary))]/5', ic: 'text-[hsl(var(--primary))]' },
  warn: { icon: AlertTriangle, cls: 'border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]/10', ic: 'text-[hsl(var(--warning-foreground))]' },
  danger: { icon: Ban, cls: 'border-[hsl(var(--destructive))]/40', ic: 'text-[hsl(var(--destructive))]' },
};

const Prose = ({ section }) => (
  <div className="space-y-3">
    {section.paragraphs.map((p, i) => (
      <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>
    ))}
  </div>
);

const ListBlock = ({ section }) => (
  <>
    {section.intro && <p className="text-sm text-muted-foreground mb-3">{section.intro}</p>}
    <ul className="space-y-2">
      {section.items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text;
        const bad = typeof item === 'object' && item.bad;
        const Icon = bad ? Ban : Check;
        return (
          <li key={i} className="flex gap-2 text-sm">
            <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${bad ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--primary))]'}`} />
            <span className="leading-relaxed">{text}</span>
          </li>
        );
      })}
    </ul>
  </>
);

const Steps = ({ section }) => (
  <>
    {section.intro && <p className="text-sm text-muted-foreground mb-4">{section.intro}</p>}
    <ol className="space-y-4">
      {section.items.map((s, i) => (
        <li key={i} className="flex gap-3">
          <span className="h-7 w-7 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-xs font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
          <div>
            <div className="text-sm font-semibold">{s.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{s.body}</p>
            {s.note && <p className="text-xs text-[hsl(var(--primary))] mt-1">{s.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  </>
);

const TableBlock = ({ section }) => (
  <>
    {section.intro && <p className="text-sm text-muted-foreground mb-3">{section.intro}</p>}
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full text-sm border-collapse min-w-[520px]">
        <thead>
          <tr className="border-b-2 border-[hsl(var(--primary))]">
            {section.columns.map((c) => <th key={c} className="text-left py-2 pr-4 font-semibold">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, i) => (
            <tr key={i} className="border-b border-[hsl(var(--border))] last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`py-2 pr-4 align-top ${j === 0 ? 'font-medium' : 'text-muted-foreground'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {section.note && <p className="text-xs text-muted-foreground mt-3">{section.note}</p>}
  </>
);

const Faq = ({ section }) => (
  <div className="divide-y divide-[hsl(var(--border))]">
    {section.items.map((f, i) => (
      <details key={i} className="group py-3" data-testid="learn-faq-item">
        <summary className="flex items-start justify-between gap-3 cursor-pointer list-none text-sm font-medium">
          <span>{f.q}</span>
          <ChevronRight className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground transition-transform group-open:rotate-90" />
        </summary>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
      </details>
    ))}
  </div>
);

// Glosario con buscador en vivo: sin él, 30 términos son una pared de texto.
const Glossary = ({ section }) => {
  const [query, setQuery] = useState('');
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return section.items;
    return section.items.filter((it) => norm(it.term).includes(q) || norm(it.plain).includes(q));
  }, [query, section.items]);

  return (
    <>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca un término…" data-testid="learn-glossary-search" />
      </div>
      <p className="text-xs text-muted-foreground mb-4" data-testid="learn-glossary-count">
        Mostrando {filtered.length} de {section.items.length} términos
      </p>
      <div className="space-y-4">
        {filtered.map((it) => (
          <div key={it.term} className="border-l-2 border-[hsl(var(--primary))] pl-3">
            <div className="text-sm font-semibold">{it.term}</div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{it.plain}</p>
            {it.example && <p className="text-xs text-muted-foreground mt-1"><span className="text-[hsl(var(--primary))] font-medium">Ejemplo:</span> {it.example}</p>}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">Ningún término coincide con esa búsqueda.</p>}
      </div>
    </>
  );
};

const Callout = ({ section }) => {
  const tone = TONE[section.tone] || TONE.info;
  const Icon = tone.icon;
  return (
    <Card className={`p-4 ${tone.cls}`}>
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${tone.ic}`} />
        <div>
          {section.title && <div className="text-sm font-semibold mb-1">{section.title}</div>}
          <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
        </div>
      </div>
    </Card>
  );
};

const Cards = ({ section }) => (
  <>
    {section.intro && <p className="text-sm text-muted-foreground mb-3">{section.intro}</p>}
    <div className="grid sm:grid-cols-2 gap-3">
      {section.items.map((c) => (
        <Link key={c.to} to={c.to} className="rounded-xl border border-[hsl(var(--border))] p-4 hover:border-[hsl(var(--primary))] transition-colors">
          <div className="text-sm font-semibold">{c.title}</div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.body}</p>
          <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--primary))] mt-2">{c.cta || 'Abrir'} <ArrowRight className="h-3 w-3" /></span>
        </Link>
      ))}
    </div>
  </>
);

const RENDERERS = { prose: Prose, list: ListBlock, steps: Steps, table: TableBlock, faq: Faq, glossary: Glossary, callout: Callout, cards: Cards };

const LearnPage = () => {
  const { slug } = useParams();
  const page = LEARN_PAGES[slug];
  if (!page) return <Navigate to="/aprende" replace />;

  // El índice solo vale la pena cuando hay suficientes secciones con título.
  const titled = page.sections.filter((s) => s.title);
  const showToc = titled.length >= 4;
  const anchor = (title) => title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
      <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/aprende" className="hover:text-foreground">Aprende</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{page.title}</span>
      </nav>

      <header className="mb-8">
        {page.badge && <Badge className="bg-[hsl(var(--muted))] text-muted-foreground border border-border mb-3">{page.badge}</Badge>}
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">{page.title}</h1>
        {page.subtitle && <p className="text-base text-muted-foreground mt-3 max-w-3xl leading-relaxed">{page.subtitle}</p>}
        {page.updated && <p className="text-xs text-muted-foreground mt-3">Última revisión: {page.updated}</p>}
      </header>

      <div className={showToc ? 'grid lg:grid-cols-[220px_1fr] gap-8 items-start' : ''}>
        {showToc && (
          <nav className="hidden lg:block sticky top-24" data-testid="learn-toc">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">En esta página</div>
            <ul className="space-y-1.5">
              {titled.map((s) => (
                <li key={s.title}>
                  <a href={`#${anchor(s.title)}`} className="text-sm text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors block leading-snug">{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="space-y-8 min-w-0">
          {page.sections.map((section, i) => {
            const Renderer = RENDERERS[section.type];
            if (!Renderer) return null;
            if (section.type === 'callout') return <Renderer key={i} section={section} />;
            return (
              <section key={i} id={section.title ? anchor(section.title) : undefined} className="scroll-mt-24">
                {section.title && <h2 className="font-heading text-xl font-semibold mb-3">{section.title}</h2>}
                <Renderer section={section} />
              </section>
            );
          })}

          {page.related?.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">Continúa por aquí</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {page.related.map((r) => (
                  <Link key={r.to} to={r.to} className="rounded-xl border border-[hsl(var(--border))] p-4 hover:border-[hsl(var(--primary))] transition-colors">
                    <div className="text-sm font-semibold">{r.title}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <Card className="p-5 bg-[hsl(var(--muted))]/40">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm">
                <span className="font-semibold">¿Listo para empezar?</span> Revisa el catálogo o deja que el asesor te arme un plan.
              </div>
              <div className="flex gap-2">
                <Link to="/asesor"><Button variant="outline" size="sm">Armar mi plan</Button></Link>
                <Link to="/catalogo"><Button size="sm">Ver catálogo</Button></Link>
              </div>
            </div>
          </Card>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Contenido educativo. Todos los productos de Exygen Labs son exclusivamente para uso en investigación (RUO):
            no son para consumo humano ni animal, ni para diagnóstico o tratamiento. Nada de esto es consejo médico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
