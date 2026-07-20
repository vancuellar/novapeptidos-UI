import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import SectionRenderer from '@/components/SectionRenderer';
import { LEARN_PAGES } from '@/data/learn';

const LearnPage = () => {
  const { slug } = useParams();
  const page = LEARN_PAGES[slug];
  if (!page) return <Navigate to="/aprende" replace />;

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

      <SectionRenderer sections={page.sections} />

      <div className="space-y-8 mt-8">
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
  );
};

export default LearnPage;
