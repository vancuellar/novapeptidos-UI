import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, BadgeCheck, Mail, Phone, Landmark, CreditCard, Bitcoin, Store, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { INSTAGRAM_URL, FACEBOOK_URL } from '@/lib/contact';
import BrandLogo from '@/components/BrandLogo';

// Banderas chiquitas en SVG inline (a color, esquinas redondeadas). NO se usan
// emojis de bandera porque en Windows no se ven, ni imágenes externas.
const FlagMX = () => (
  <svg viewBox="0 0 21 14" aria-hidden="true" className="h-[13px] w-auto shrink-0" data-testid="footer-flag-mx">
    <defs><clipPath id="flagmx-clip"><rect width="21" height="14" rx="2" /></clipPath></defs>
    <g clipPath="url(#flagmx-clip)">
      <rect width="7" height="14" fill="#006847" />
      <rect x="7" width="7" height="14" fill="#FFFFFF" />
      <rect x="14" width="7" height="14" fill="#CE1126" />
      {/* Escudo simplificado: a este tamaño el águila real no se distingue. */}
      <circle cx="10.5" cy="7" r="1.7" fill="#B8860B" opacity="0.9" />
      <path d="M9.1 8.4c.9.7 1.9.7 2.8 0" stroke="#006847" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);
const FlagUS = () => (
  // inline-block y align para que se siente bien DENTRO del párrafo.
  <svg viewBox="0 0 21 14" aria-hidden="true" className="inline-block h-[13px] w-auto shrink-0 align-[-2px]" data-testid="footer-flag-us">
    <defs><clipPath id="flagus-clip"><rect width="21" height="14" rx="2" /></clipPath></defs>
    <g clipPath="url(#flagus-clip)">
      <rect width="21" height="14" fill="#FFFFFF" />
      {[0, 4, 8, 12].map((y) => <rect key={y} y={y} width="21" height="2" fill="#B22234" />)}
      <rect width="9.2" height="7" fill="#3C3B6E" />
      {[1.6, 4.6, 7.6].map((x) => [1.6, 3.5, 5.4].map((y) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.55" fill="#FFFFFF" />
      )))}
    </g>
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-border bg-card text-card-foreground">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-[10px] pb-0">
        {/* Orden pedido por Christian: sellos y aviso RUO ARRIBA de los links;
            debajo de los links no va NADA más que el copyright. Los sellos van
            centrados verticalmente entre la línea divisoria (10px arriba) y el
            aviso RUO (10px abajo). */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground mb-[10px]">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.coa')}</span>
          <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.shipping')}</span>
        </div>
        <p className="text-xs leading-relaxed rounded-lg border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] p-3.5 mb-10">
          <strong>{t('footer.legalTitle')}</strong> {t('footer.legalBody')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div>
            {/* El logo del pie SOLO sube al tope de la página actual (orden de
                Christian): no navega al home como el de la barra. */}
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center mb-4 origin-left transition-transform duration-200 hover:scale-110" data-testid="footer-logo" aria-label={t('footer.backToTop')}>
              <BrandLogo />
            </button>
            {/* La mención de EUA va DENTRO del párrafo, como la trae Certified
                (Christian, 2026-07-28): la bandera aparece junto a "Estados
                Unidos" en la propia frase, no como etiqueta aparte. Solo se
                habla de materia prima y abastecimiento — nunca de planta,
                laboratorio propio ni FDA. */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.descriptionPre')} <FlagUS /> {t('footer.descriptionPost')}
            </p>
            <div className="flex items-center gap-3 mt-5 text-[hsl(var(--primary))]">
              <ShieldCheck className="h-5 w-5" /><BadgeCheck className="h-5 w-5" /><Truck className="h-5 w-5" />
              {/* Redes sociales: se vuelven enlaces en cuanto Christian ponga las
                  URLs en src/lib/contact.js. */}
              <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
              {INSTAGRAM_URL ? (
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity" data-testid="footer-instagram"><Instagram className="h-5 w-5" /></a>
              ) : (
                <Instagram className="h-5 w-5 opacity-70" data-testid="footer-instagram" />
              )}
              {FACEBOOK_URL ? (
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity" data-testid="footer-facebook"><Facebook className="h-5 w-5" /></a>
              ) : (
                <Facebook className="h-5 w-5 opacity-70" data-testid="footer-facebook" />
              )}
            </div>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('footer.catalogTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/catalogo" className="hover:text-foreground transition-colors">{t('header.allCatalog')}</Link></li>
              <li><Link to="/catalogo?category=recuperacion" className="hover:text-foreground transition-colors">{t('footer.recovery')}</Link></li>
              <li><Link to="/catalogo?category=hormona-crecimiento" className="hover:text-foreground transition-colors">{t('footer.growth')}</Link></li>
              <li><Link to="/catalogo?category=stacks" className="hover:text-foreground transition-colors">{t('footer.stacks')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('nav.learn')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/aprende/empieza-aqui" className="hover:text-foreground transition-colors">{t('footer.startHere')}</Link></li>
              <li><Link to="/aprende/reconstitucion-paso-a-paso" className="hover:text-foreground transition-colors">{t('footer.howToReconstitute')}</Link></li>
              <li><Link to="/compuestos" className="hover:text-foreground transition-colors">{t('footer.compendium')}</Link></li>
              <li><Link to="/aprende/preguntas-frecuentes" className="hover:text-foreground transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to="/aprende" className="hover:text-foreground transition-colors">{t('footer.allGuides')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('nav.tools')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/asesor" className="hover:text-foreground transition-colors">{t('nav.advisor')}</Link></li>
              <li><Link to="/calculadora" className="hover:text-foreground transition-colors">{t('nav.calculator')}</Link></li>
              <li><Link to="/tutoriales" className="hover:text-foreground transition-colors">{t('nav.tutorials')}</Link></li>
              <li><Link to="/educacion" className="hover:text-foreground transition-colors">{t('nav.education')}</Link></li>
              <li><Link to="/cuenta" className="hover:text-foreground transition-colors">{t('header.account')}</Link></li>
              <li><Link to="/carrito" className="hover:text-foreground transition-colors">{t('nav.cart')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('footer.infoTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/info/envios" className="hover:text-foreground transition-colors">{t('footer.shipping')}</Link></li>
              <li><Link to="/info/devoluciones" className="hover:text-foreground transition-colors">{t('footer.returns')}</Link></li>
              <li><Link to="/info/calidad" className="hover:text-foreground transition-colors">{t('footer.quality')}</Link></li>
              <li><Link to="/info/preparacion" className="hover:text-foreground transition-colors">{t('footer.prep')}</Link></li>
              <li><Link to="/info/contacto" className="hover:text-foreground transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/info/soporte" className="hover:text-foreground transition-colors">{t('nav.support')}</Link></li>
              <li><Link to="/info/rastreo" className="hover:text-foreground transition-colors">{t('nav.orderStatus')}</Link></li>
              <li><Link to="/info/terminos" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/info/privacidad" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="kicker mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {/* Teléfono oculto (2026-07-22): Christian dará un número nuevo no
                  ligado a él. Al tenerlo, restaurar aquí el <li> con formato
                  +52 (XXX) XXX-XXXX y liga tel:. */}
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[hsl(var(--primary))]" /> hola@exygenlabs.com</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {[{ i: CreditCard, l: 'Visa · MC · Amex' }, { i: Landmark, l: 'SPEI' }, { i: Store, l: 'OXXO' }, { i: Bitcoin, l: 'Cripto' }].map((p, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-[hsl(var(--secondary))] px-2.5 py-1.5 text-[11px]">
                  <p.i className="h-3 w-3 text-[hsl(var(--primary))]" /> {p.l}
                </span>
              ))}
            </div>
            {/* "Envíos en todo México" vive DEBAJO de los métodos de pago
                (Christian, 2026-07-28), con su bandera a color. */}
            <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
              <FlagMX /> {t('footer.flagMexico')}
            </div>
          </div>
        </div>
        {/* Última línea, como peptides.mx: copyright a la IZQUIERDA y leyenda
            RUO a la DERECHA en el mismo renglón; en teléfono se apilan. */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-y-1.5 pt-8 sm:pt-6 pb-1">
          <p className="text-xs text-muted-foreground text-center sm:text-left font-mono-tech leading-none">© {new Date().getFullYear()} {t('footer.rights')}</p>
          <p className="text-xs text-muted-foreground text-center sm:text-right font-mono-tech leading-none" data-testid="footer-ruo-line">{t('footer.ruoLine')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
