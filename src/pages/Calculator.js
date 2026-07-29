import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Syringe, CalendarClock, ShoppingBag, FileDown, Scale } from 'lucide-react';
import ReconstitutionCalculator from '@/components/ReconstitutionCalculator';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// Convertidor por peso corporal (mejora analizada, 2026-07-29). Mucha literatura
// dosifica en mcg por kg; el visitante pesa en kilos y quiere el total. Es una
// multiplicación, pero hacérsela evita el error de un cero de más — que en una
// jeringa es la diferencia entre 10 y 100 rayitas. Informativo, no recomendación.
const PesoCorporal = () => {
  const { t } = useLanguage();
  const [kg, setKg] = useState('');
  const [porKg, setPorKg] = useState('');
  const totalMcg = (parseFloat(kg) || 0) * (parseFloat(porKg) || 0);
  return (
    <Card className="p-5 mt-6" data-testid="calc-peso-corporal">
      <h2 className="font-heading font-semibold flex items-center gap-2 mb-1">
        <Scale className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('calc.peso.title')}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">{t('calc.peso.body')}</p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="block text-xs text-muted-foreground mb-1">{t('calc.peso.kg')}</span>
          <Input type="number" min="0" className="w-28" value={kg}
            onChange={(e) => setKg(e.target.value)} data-testid="calc-peso-kg" />
        </label>
        <label className="text-sm">
          <span className="block text-xs text-muted-foreground mb-1">{t('calc.peso.porKg')}</span>
          <Input type="number" min="0" className="w-32" value={porKg}
            onChange={(e) => setPorKg(e.target.value)} data-testid="calc-peso-porkg" />
        </label>
        <div className="text-sm py-2" data-testid="calc-peso-total">
          {totalMcg > 0 ? (
            <>
              <span className="text-muted-foreground">{t('calc.peso.total')}: </span>
              <span className="font-heading font-bold text-lg">
                {totalMcg >= 1000 ? `${(totalMcg / 1000).toLocaleString('es-MX', { maximumFractionDigits: 2 })} mg` : `${Math.round(totalMcg)} mcg`}
              </span>
              <span className="text-xs text-muted-foreground ml-2">({Math.round(totalMcg).toLocaleString('es-MX')} mcg)</span>
            </>
          ) : <span className="text-muted-foreground">{t('calc.peso.hint')}</span>}
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground mt-3">{t('calc.peso.ruo')}</p>
    </Card>
  );
};

// Fórmulas y preguntas frecuentes (mejora analizada, 2026-07-29). Texto plano en
// la página por SEO: las búsquedas reales son "cómo reconstituir un péptido",
// "cuántas unidades son X mg". El JSON-LD de FAQPage se lo dice a Google.
const FAQS = ['reconstituir', 'rayitas', 'agua', 'guardar', 'jeringa'];
const FormulasYFaq = () => {
  const { t } = useLanguage();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((k) => ({
      '@type': 'Question',
      name: t(`calc.faq.${k}.q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`calc.faq.${k}.a`) },
    })),
  };
  return (
    <div className="mt-10" data-testid="calc-faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="font-heading text-2xl font-bold tracking-tight mb-3">{t('calc.formulas.title')}</h2>
      <Card className="p-5 mb-6">
        <ul className="space-y-2 text-sm font-mono-tech">
          <li>{t('calc.formulas.f1')}</li>
          <li>{t('calc.formulas.f2')}</li>
          <li>{t('calc.formulas.f3')}</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3">{t('calc.formulas.nota')}</p>
      </Card>
      <h2 className="font-heading text-2xl font-bold tracking-tight mb-3">{t('calc.faq.title')}</h2>
      <div className="space-y-3">
        {FAQS.map((k) => (
          <Card key={k} className="p-5">
            <h3 className="font-semibold text-sm mb-1.5">{t(`calc.faq.${k}.q`)}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(`calc.faq.${k}.a`)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Lo que gana el cliente al entrar a su cuenta. La versión pública es a propósito
// más simple: sirve para resolver una duda suelta, no para planear un protocolo.
const MEMBER_PERKS = [
  { icon: Syringe, key: 'full' },
  { icon: ShoppingBag, key: 'purchases' },
  { icon: CalendarClock, key: 'refill' },
  { icon: FileDown, key: 'export' },
];

const Calculator = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="max-w-[1280px] mx-auto px-3 sm:px-5 py-6">
      <div className="mb-5">
        <h1 className="font-heading text-4xl font-bold tracking-tight">{t('calc.title')}</h1>
        <p className="text-base text-muted-foreground mt-2 max-w-3xl">{t('calc.publicSubtitle')}</p>
      </div>

      {/* Puente al área de clientes: la versión completa vive ahí */}
      <Card className="p-5 mb-6 border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5" data-testid="calc-upsell">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-[260px]">
            <h2 className="font-heading font-semibold flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('calc.upsell.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('calc.upsell.body')}</p>
            <ul className="grid sm:grid-cols-2 gap-2 mt-3">
              {MEMBER_PERKS.map(({ icon: Icon, key }) => (
                <li key={key} className="flex items-start gap-2 text-sm">
                  <Icon className="h-4 w-4 mt-0.5 text-[hsl(var(--primary))] shrink-0" />
                  <span>{t(`calc.upsell.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link to={user ? '/cuenta?tab=tools' : '/login'} className="shrink-0">
            <Button data-testid="calc-upsell-cta">
              {user ? t('calc.upsell.goTools') : t('calc.upsell.signIn')}
            </Button>
          </Link>
        </div>
      </Card>

      <ReconstitutionCalculator variant="basic" />

      <PesoCorporal />
      <FormulasYFaq />

      <div className="mt-8 text-center">
        <Link to="/catalogo"><Button variant="outline">{t('calc.browse')}</Button></Link>
      </div>
    </div>
  );
};

export default Calculator;
