import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Truck, BadgeCheck, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-border bg-card text-card-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3 hover:text-[hsl(var(--primary))] transition-colors">
              <div className="h-8 w-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center"><FlaskConical className="h-4 w-4 text-[hsl(var(--primary-foreground))]" /></div>
              <span className="font-heading font-bold">Nova Peptides</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('footer.description')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t('footer.catalogTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalogo" className="hover:text-foreground">{t('header.allCatalog')}</Link></li>
              <li><Link to="/catalogo?category=recuperacion-tejidos" className="hover:text-foreground">{t('footer.recovery')}</Link></li>
              <li><Link to="/catalogo?category=hormona-crecimiento" className="hover:text-foreground">{t('footer.growth')}</Link></li>
              <li><Link to="/catalogo?category=stacks" className="hover:text-foreground">Stacks / Combos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t('footer.infoTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/info/envios" className="hover:text-foreground">{t('footer.shipping')}</Link></li>
              <li><Link to="/info/devoluciones" className="hover:text-foreground">{t('footer.returns')}</Link></li>
              <li><Link to="/info/calidad" className="hover:text-foreground">{t('footer.quality')}</Link></li>
              <li><Link to="/info/terminos" className="hover:text-foreground">{t('footer.terms')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hola@novapeptides.mx</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +52 55 0000 0000</li>
            </ul>
            <div className="flex gap-3 mt-4 text-[hsl(var(--primary))]">
              <ShieldCheck className="h-5 w-5" /><BadgeCheck className="h-5 w-5" /><Truck className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs leading-relaxed bg-[hsl(var(--warning))] border border-[hsl(var(--warning-border))] text-[hsl(var(--warning-foreground))] rounded-lg p-3">
            <strong>{t('footer.legalTitle')}</strong> {t('footer.legalBody')}
          </p>
          <p className="text-xs text-muted-foreground mt-4 text-center">© {new Date().getFullYear()} {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
