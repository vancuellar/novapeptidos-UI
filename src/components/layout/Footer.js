import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, BadgeCheck, Mail, Phone, Landmark, CreditCard } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BrandLogo from '@/components/BrandLogo';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-border bg-card text-card-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <Link to="/" className="inline-flex items-center mb-4">
              <BrandLogo />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('footer.description')}</p>
            <div className="flex gap-3 mt-5 text-[hsl(var(--primary))]">
              <ShieldCheck className="h-5 w-5" /><BadgeCheck className="h-5 w-5" /><Truck className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('footer.catalogTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/catalogo" className="hover:text-foreground transition-colors">{t('header.allCatalog')}</Link></li>
              <li><Link to="/catalogo?category=recuperacion-tejidos" className="hover:text-foreground transition-colors">{t('footer.recovery')}</Link></li>
              <li><Link to="/catalogo?category=hormona-crecimiento" className="hover:text-foreground transition-colors">{t('footer.growth')}</Link></li>
              <li><Link to="/catalogo?category=stacks" className="hover:text-foreground transition-colors">Stacks / Combos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('nav.learn')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/aprende/empieza-aqui" className="hover:text-foreground transition-colors">Empieza aquí</Link></li>
              <li><Link to="/aprende/como-reconstituir" className="hover:text-foreground transition-colors">Cómo reconstituir</Link></li>
              <li><Link to="/compendio" className="hover:text-foreground transition-colors">Compendio</Link></li>
              <li><Link to="/aprende/preguntas-frecuentes" className="hover:text-foreground transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/aprende" className="hover:text-foreground transition-colors">Todas las guías</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('footer.infoTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/info/envios" className="hover:text-foreground transition-colors">{t('footer.shipping')}</Link></li>
              <li><Link to="/info/devoluciones" className="hover:text-foreground transition-colors">{t('footer.returns')}</Link></li>
              <li><Link to="/info/calidad" className="hover:text-foreground transition-colors">{t('footer.quality')}</Link></li>
              <li><Link to="/info/terminos" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/info/privacidad" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[hsl(var(--primary))]" /> hola@exygenlabs.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[hsl(var(--primary))]" /> +52 (994) 494-6889</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {[{ i: CreditCard, l: 'Visa · MC · Amex' }, { i: Landmark, l: 'SPEI' }].map((p, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-[hsl(var(--secondary))] px-2.5 py-1.5 text-[11px]">
                  <p.i className="h-3 w-3 text-[hsl(var(--primary))]" /> {p.l}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.coa')}</span>
            <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.shipping')}</span>
          </div>
          <p className="text-xs leading-relaxed rounded-lg border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] p-3.5">
            <strong>{t('footer.legalTitle')}</strong> {t('footer.legalBody')}
          </p>
          <p className="text-xs text-muted-foreground mt-5 text-center font-mono-tech">© {new Date().getFullYear()} {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
