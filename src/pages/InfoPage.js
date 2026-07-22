import { WHATSAPP_URL } from '@/lib/contact';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import SectionRenderer from '@/components/SectionRenderer';
import { INFO_PAGES } from '@/data/info';
import { useLanguage } from '@/context/LanguageContext';

// Todas las páginas de /info/* son ricas. Esta rama queda solo como red por si
// se enlaza un slug que no exista todavía.
const LEGAL_PAGES = [];

const InfoPage = () => {
  const { page } = useParams();
  const { t } = useLanguage();
  const rich = INFO_PAGES[page];

  if (rich) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-foreground">Inicio</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{rich.title}</span>
        </nav>

        <header className="mb-8">
          {rich.badge && <Badge className="bg-[hsl(var(--muted))] text-muted-foreground border border-border mb-3">{rich.badge}</Badge>}
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">{rich.title}</h1>
          {rich.subtitle && <p className="text-base text-muted-foreground mt-3 max-w-3xl leading-relaxed">{rich.subtitle}</p>}
          {rich.updated && <p className="text-xs text-muted-foreground mt-3">Última revisión: {rich.updated}</p>}
        </header>

        <SectionRenderer sections={rich.sections} />

        <div className="space-y-8 mt-8">
          {rich.related?.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-semibold mb-3">También te puede servir</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {rich.related.map((r) => (
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
                <span className="font-semibold">¿Sigue sin resolverse?</span> Escríbenos con tu número de pedido y lo vemos contigo.
              </div>
              <div className="flex gap-2">
                <a href="mailto:hola@exygenlabs.com"><Button variant="outline" size="sm">Escribir correo</Button></a>
                {WHATSAPP_URL && <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Button size="sm">WhatsApp</Button></a>}
              </div>
            </div>
          </Card>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Todos los productos de Exygen Labs son exclusivamente para uso en investigación (RUO): no son para consumo
            humano ni animal, ni para diagnóstico o tratamiento. Nada de este contenido es consejo médico.
          </p>
        </div>
      </div>
    );
  }

  // Términos y privacidad: párrafos planos desde las traducciones.
  const hasLegal = LEGAL_PAGES.includes(page);
  const title = hasLegal ? t(`info.${page}.title`) : t('info.defaultTitle');
  const body = hasLegal ? t(`info.${page}.body`) : t('info.notFound');

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight mb-6">{title}</h1>
      <Card className="p-6 space-y-4">
        {body.map((p, i) => <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>)}
      </Card>
      <Link to="/catalogo" className="inline-block mt-6 text-[hsl(var(--primary))] text-sm">{t('info.backToCatalog')}</Link>
    </div>
  );
};

export default InfoPage;
