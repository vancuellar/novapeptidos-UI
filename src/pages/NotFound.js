import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, FlaskConical, Home, Calculator } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  const links = [
    { to: '/', icon: Home, label: t('nf.home') },
    { to: '/catalogo', icon: FlaskConical, label: t('nf.catalog') },
    { to: '/calculadora', icon: Calculator, label: t('nf.calc') },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
      {/* Vial vacío estilizado + 404 */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <span className="font-heading text-[7rem] sm:text-[9rem] leading-none font-bold tracking-tight text-[hsl(var(--primary))]/15 select-none">404</span>
        <FlaskConical className="absolute h-14 w-14 text-[hsl(var(--primary))]" strokeWidth={1.5} />
      </div>

      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-wrap-balance">{t('nf.title')}</h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t('nf.body')}</p>

      {/* Buscar en catálogo */}
      <form action="/catalogo" method="get" className="mt-8 flex max-w-md mx-auto gap-2" data-testid="nf-search">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input name="search" placeholder={t('nf.searchPlaceholder')}
            className="w-full h-10 pl-9 pr-3 rounded-md border border-[hsl(var(--border))] bg-transparent text-sm focus:outline-none focus:border-[hsl(var(--primary))]" />
        </div>
        <Button type="submit">{t('nf.searchBtn')}</Button>
      </form>

      {/* Accesos rápidos */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {links.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to}>
            <Button variant="outline" className="gap-2"><Icon className="h-4 w-4" /> {label}</Button>
          </Link>
        ))}
      </div>

      <p className="text-[11px] text-muted-foreground mt-12">{t('nf.ruo')}</p>
    </div>
  );
};

export default NotFound;
