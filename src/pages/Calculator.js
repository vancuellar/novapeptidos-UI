import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Syringe, CalendarClock, ShoppingBag, FileDown } from 'lucide-react';
import ReconstitutionCalculator from '@/components/ReconstitutionCalculator';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

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

      <div className="mt-8 text-center">
        <Link to="/catalogo"><Button variant="outline">{t('calc.browse')}</Button></Link>
      </div>
    </div>
  );
};

export default Calculator;
