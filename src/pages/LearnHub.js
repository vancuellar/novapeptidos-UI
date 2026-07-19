import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sparkles, BookOpen, FlaskConical, Syringe, Snowflake, ShieldCheck, Microscope,
  Scale, HelpCircle, Baby, Layers, Library, Target, Calculator,
} from 'lucide-react';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { LEARN_PAGES } from '@/data/learn';

const GROUPS = [
  {
    title: 'Empieza aquí, sin jerga',
    desc: 'Si es tu primera vez, este es el orden correcto.',
    items: [
      { slug: 'empieza-aqui', icon: Baby },
      { slug: 'peptidos-explicados', icon: BookOpen },
      { slug: 'terminos-sin-jerga', icon: Library },
      { slug: 'preguntas-principiantes', icon: HelpCircle },
    ],
  },
  {
    title: 'Manejo del material',
    desc: 'Lo operativo: preparar, guardar y no echar a perder un vial.',
    items: [
      { slug: 'reconstitucion-paso-a-paso', icon: Syringe },
      { slug: 'conservacion', icon: Snowflake },
      { slug: 'protocolos', icon: Layers },
      { slug: 'mitos', icon: Sparkles },
    ],
  },
  {
    title: 'Calidad y cumplimiento',
    desc: 'Cómo verificamos lo que vendemos y en qué marco se mueve.',
    items: [
      { slug: 'como-verificamos-cada-lote', icon: ShieldCheck },
      { slug: 'que-significa-99-por-ciento', icon: Microscope },
      { slug: 'legalidad', icon: Scale },
      { slug: 'preguntas-frecuentes', icon: HelpCircle },
    ],
  },
];

const TOOLS = [
  { to: '/asesor', icon: Target, title: 'Asesor de péptidos', desc: 'Responde tres pasos y te armamos un plan con compuestos, duración, viales y costo.' },
  { to: '/calculadora', icon: Calculator, title: 'Calculadora de reconstitución', desc: 'Cuánta agua agregar y cuántas rayitas jalar en la jeringa.' },
  { to: '/compuestos', icon: FlaskConical, title: 'Fichas de compuestos', desc: 'Ficha técnica de cada compuesto del catálogo, con buscador y filtros.' },
  { to: '/educacion', icon: BookOpen, title: 'Literatura y fuentes', desc: 'Referencias reales revisadas por pares sobre los compuestos que manejamos.' },
];

const LearnHub = () => {
  const available = new Set(Object.keys(LEARN_PAGES));
  const compoundCount = fallbackProducts.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 text-[hsl(var(--primary))] mb-2">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs font-medium uppercase tracking-wide">Aprende</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">Todo sobre péptidos de investigación</h1>
        <p className="text-base text-muted-foreground mt-3 max-w-3xl leading-relaxed">
          Desde qué es un péptido hasta cómo se lee un cromatograma. Escrito para que sirva:
          con cifras, temperaturas y tiempos reales, no con generalidades.
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          ['Guías', Object.keys(LEARN_PAGES).length],
          ['Compuestos en catálogo', compoundCount],
          ['Herramientas', TOOLS.length],
          ['Pureza declarada', '≥ 99%'],
        ].map(([label, value]) => (
          <Card key={label} className="p-4">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="font-heading text-xl font-bold mt-1">{value}</div>
          </Card>
        ))}
      </div>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold mb-1">Herramientas</h2>
        <p className="text-sm text-muted-foreground mb-4">Lo que resuelve dudas más rápido que leer.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {TOOLS.map(({ to, icon: Icon, title, desc }) => (
            <Link key={to} to={to} className="rounded-xl border border-[hsl(var(--border))] p-4 hover:border-[hsl(var(--primary))] transition-colors flex gap-3">
              <Icon className="h-5 w-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold">{title}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {GROUPS.map((group) => {
        const items = group.items.filter((i) => available.has(i.slug));
        if (!items.length) return null;
        return (
          <section key={group.title} className="mb-10">
            <h2 className="font-heading text-xl font-semibold mb-1">{group.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{group.desc}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map(({ slug, icon: Icon }) => {
                const page = LEARN_PAGES[slug];
                return (
                  <Link key={slug} to={`/aprende/${slug}`} data-testid="learn-hub-card"
                    className="rounded-xl border border-[hsl(var(--border))] p-4 hover:border-[hsl(var(--primary))] transition-colors flex gap-3">
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{page.title}</div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-3">{page.subtitle}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <Card className="p-5 bg-[hsl(var(--muted))]/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <span className="font-semibold">¿Ya sabes qué buscas?</span> Ve directo al catálogo.
          </div>
          <div className="flex gap-2">
            <Link to="/asesor"><Button variant="outline" size="sm">Armar mi plan</Button></Link>
            <Link to="/catalogo"><Button size="sm">Ver catálogo</Button></Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LearnHub;
