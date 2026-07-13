import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FlaskConical, Calculator, ExternalLink, ShieldAlert, Activity, Sparkles, Database } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Literatura curada. URLs verificadas (revistas revisadas por pares / registros de ensayos).
// El título es el nombre del trabajo (académico, en inglés); `tag` es una etiqueta corta.
const SECTIONS = [
  {
    key: 'metabolic',
    icon: Activity,
    refs: [
      {
        title: 'Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1)',
        src: 'New England Journal of Medicine, 2022',
        url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2206038',
      },
      {
        title: 'Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)',
        src: 'New England Journal of Medicine, 2021',
        url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2032183',
      },
    ],
  },
  {
    key: 'repair',
    icon: FlaskConical,
    refs: [
      {
        title: 'Stable Gastric Pentadecapeptide BPC 157 and Wound Healing',
        src: 'Frontiers in Pharmacology, 2021',
        url: 'https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2021.627533/full',
      },
      {
        title: 'Thymosin Beta-4 and TB-500 in Tissue Healing and Musculoskeletal Repair: A Scoping Review',
        src: 'Applied Sciences (MDPI), 2026',
        url: 'https://www.mdpi.com/2076-3417/16/12/6202',
      },
    ],
  },
  {
    key: 'skin',
    icon: Sparkles,
    refs: [
      {
        title: 'GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration',
        src: 'BioMed Research International (PMC), 2015',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4508379/',
      },
      {
        title: 'The Potential of GHK as an Anti-Aging Peptide',
        src: 'Aging and Disease (PMC), 2022',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8789089/',
      },
    ],
  },
  {
    key: 'databases',
    icon: Database,
    refs: [
      {
        title: 'PubMed — biblioteca de literatura biomédica (NIH)',
        src: 'National Library of Medicine',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
      },
      {
        title: 'ClinicalTrials.gov — registro público de ensayos clínicos',
        src: 'U.S. National Institutes of Health',
        url: 'https://clinicaltrials.gov/',
      },
    ],
  },
];

const Education = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-2 text-[hsl(var(--primary))] mb-2">
        <BookOpen className="h-5 w-5" />
        <span className="text-xs font-medium uppercase tracking-wide">{t('nav.education')}</span>
      </div>
      <h1 className="font-heading text-3xl font-bold tracking-tight mb-3">{t('edu.title')}</h1>
      <p className="text-sm leading-relaxed text-muted-foreground mb-8">{t('edu.subtitle')}</p>

      {/* Aviso RUO */}
      <Card className="p-5 mb-8 border-[hsl(var(--primary))]/30 bg-[hsl(var(--muted))]/40">
        <div className="flex gap-3">
          <ShieldAlert className="h-5 w-5 shrink-0 text-[hsl(var(--primary))] mt-0.5" />
          <div>
            <h2 className="font-heading text-sm font-semibold mb-1">{t('edu.ruoTitle')}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{t('edu.ruoBody')}</p>
          </div>
        </div>
      </Card>

      {/* Qué son */}
      <section className="mb-8">
        <h2 className="font-heading text-lg font-semibold mb-3">{t('edu.whatTitle')}</h2>
        <div className="space-y-3">
          {t('edu.whatBody').map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>
          ))}
        </div>
      </section>

      {/* Cómo empezar */}
      <Card className="p-6 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-5 w-5 text-[hsl(var(--primary))]" />
          <h2 className="font-heading text-lg font-semibold">{t('edu.startTitle')}</h2>
        </div>
        <ul className="space-y-2 mb-4">
          {t('edu.startBody').map((p, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="text-[hsl(var(--primary))] font-semibold shrink-0">{i + 1}.</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Button asChild size="sm">
          <Link to="/calculadora">{t('edu.startCta')}</Link>
        </Button>
      </Card>

      {/* Literatura */}
      <section>
        <h2 className="font-heading text-lg font-semibold mb-1">{t('edu.libTitle')}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-6">{t('edu.libIntro')}</p>

        <div className="space-y-6">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.key}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <h3 className="font-heading text-sm font-semibold">{t(`edu.cat.${sec.key}`)}</h3>
                </div>
                <div className="space-y-2">
                  {sec.refs.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 rounded-xl border border-[hsl(var(--border))] p-3 hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--muted))]/30 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium leading-snug">{r.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{r.src}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground mt-6">{t('edu.libNote')}</p>
      </section>

      <Link to="/catalogo" className="inline-block mt-8 text-[hsl(var(--primary))] text-sm">{t('info.backToCatalog')}</Link>
    </div>
  );
};

export default Education;
