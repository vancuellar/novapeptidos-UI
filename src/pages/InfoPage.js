import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const PAGES = ['envios', 'devoluciones', 'calidad', 'terminos'];

const InfoPage = () => {
  const { page } = useParams();
  const { t } = useLanguage();
  const hasPage = PAGES.includes(page);
  const title = hasPage ? t(`info.${page}.title`) : t('info.defaultTitle');
  const body = hasPage ? t(`info.${page}.body`) : t('info.notFound');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold tracking-tight mb-6">{title}</h1>
      <Card className="p-6 space-y-4">
        {body.map((p, i) => <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>)}
      </Card>
      <Link to="/catalogo" className="inline-block mt-6 text-[hsl(var(--primary))] text-sm">{t('info.backToCatalog')}</Link>
    </div>
  );
};

export default InfoPage;
