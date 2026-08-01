import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, BadgeCheck, Mail, Phone, Landmark, CreditCard, Bitcoin, Store, Instagram, Facebook, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { INSTAGRAM_URL, FACEBOOK_URL, WHATSAPP_URL, WHATSAPP_HANDLE } from '@/lib/contact';
import { FlagMX, FlagUS, WhatsAppIcon } from '@/components/Flags';
import BrandLogo from '@/components/BrandLogo';
import useEsMovil from '@/hooks/useEsMovil';

// COLUMNA DE ENLACES DEL PIE.
//
// En escritorio es lo de siempre: el título y su lista, todo a la vista.
// En teléfono el título se vuelve un botón que abre y cierra la lista
// (Christián, 2026-07-31: "compactar el pie, no quitarlo"). El pie medía 1,702 px
// en un celular —dos pantallas completas, el 16% de la portada— por tener
// veintitantos enlaces apilados. Colapsados ocupan un renglón cada uno y NO se
// pierde ni un enlace: siguen ahí, a un toque.
//
// ⛔ Sin `overflow` en ningún lado: el header pegajoso se muere si alguien mete
// overflow en un contenedor alto (regla de oro de Christián).
const ColumnaDeEnlaces = ({ titulo, esMovil, children, testid }) => {
  const [abierta, setAbierta] = useState(false);
  if (!esMovil) {
    return (
      <div>
        <h4 className="kicker mb-4">{titulo}</h4>
        <ul className="space-y-2.5 text-sm text-muted-foreground">{children}</ul>
      </div>
    );
  }
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        data-testid={testid}
        className="w-full flex items-center justify-between gap-2 py-3 text-left"
      >
        <span className="kicker">{titulo}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${abierta ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {abierta && <ul className="space-y-2.5 text-sm text-muted-foreground pb-4">{children}</ul>}
    </div>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  const esMovil = useEsMovil();

  return (
    // mt-6 y no mt-16: la portada termina en la banda de pagos y juntos dejaban
    // un hueco enorme (Christian, 2026-07-28).
    <footer className="mt-6 border-t border-border bg-card text-card-foreground">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-[10px] pb-0">
        {/* Orden pedido por Christian: sellos y aviso RUO ARRIBA de los links;
            debajo de los links no va NADA más que el copyright. Los sellos van
            centrados verticalmente entre la línea divisoria (10px arriba) y el
            aviso RUO (10px abajo). */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground mb-[10px]">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.coa')}</span>
          <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.shipping')}</span>
        </div>
        {/* El aviso legal y los métodos de pago viven en el MISMO recuadro
            (Christian, 2026-07-28): "Pagos seguros y protegidos" era una sección
            aparte y se sentía repetido con el pie. Una sola caja, más corta. */}
        {/* Azul y negro, no amarillo (Christian, 2026-07-28): el amarillo de
            advertencia le daba tono de alerta a algo que sólo es informativo, y
            rompía con la paleta oscura del sitio. Fondo oscuro de la casa, filo
            azul de marca a la izquierda y el título en azul. */}
        <div className="rounded-lg border border-border border-l-[3px] border-l-[hsl(var(--primary))] bg-[hsl(var(--secondary))] text-muted-foreground p-3.5 mb-6 lg:mb-10">
          <p className="text-xs leading-relaxed">
            <strong className="text-[hsl(var(--primary))]">{t('footer.legalTitle')}</strong> {t('footer.legalBody')}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3 pt-3 border-t border-border">
            <span className="text-[11px] font-semibold text-foreground">{t('footer.paymentsInline')}</span>
            {[{ i: CreditCard, l: 'Visa · MC · Amex' }, { i: Landmark, l: 'SPEI' }, { i: Store, l: 'OXXO' }, { i: Bitcoin, l: 'Cripto' }].map((p, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[11px]">
                <p.i className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {p.l}
              </span>
            ))}
          </div>
        </div>
        {/* En teléfono los bloques van pegados (las columnas plegables ya traen su
            propia línea divisoria); en escritorio, la misma rejilla de seis de
            siempre con su gap-8. */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ${esMovil ? 'gap-0' : 'gap-8'}`}>
          <div className={esMovil ? 'mb-4' : undefined}>
            {/* El logo del pie SOLO sube al tope de la página actual (orden de
                Christian): no navega al home como el de la barra. */}
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center mb-4 origin-left transition-transform duration-200 hover:scale-110" data-testid="footer-logo" aria-label={t('footer.backToTop')}>
              <BrandLogo />
            </button>
            {/* La mención de EUA va DENTRO del párrafo, como la trae Certified
                (Christian, 2026-07-28): la bandera aparece junto a "Estados
                Unidos" en la propia frase, no como etiqueta aparte. Solo se
                dice "fabricados en laboratorios de Estados Unidos" (orden de
                Christian, 2026-07-28) — laboratorios de terceros: nunca se dice
                planta PROPIA, laboratorio PROPIO, domicilio en EUA ni FDA. */}
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
          <ColumnaDeEnlaces titulo={t('footer.catalogTitle')} esMovil={esMovil} testid="footer-col-catalogo">
              <li><Link to="/catalogo" className="hover:text-foreground transition-colors">{t('header.allCatalog')}</Link></li>
              <li><Link to="/catalogo?category=recuperacion" className="hover:text-foreground transition-colors">{t('footer.recovery')}</Link></li>
              <li><Link to="/catalogo?category=hormona-crecimiento" className="hover:text-foreground transition-colors">{t('footer.growth')}</Link></li>
              <li><Link to="/catalogo?category=stacks" className="hover:text-foreground transition-colors">{t('footer.stacks')}</Link></li>
              {/* Lo que salió de la portada en teléfono aterriza aquí, para que se
                  pueda llegar igual que antes (Christián, 2026-07-31). */}
              <li><Link to="/comparativa" className="hover:text-foreground transition-colors" data-testid="footer-comparativa">{t('footer.comparison')}</Link></li>
              <li><Link to="/distribuidor" className="hover:text-foreground transition-colors" data-testid="footer-mayoreo">{t('footer.wholesale')}</Link></li>
          </ColumnaDeEnlaces>
          <ColumnaDeEnlaces titulo={t('nav.learn')} esMovil={esMovil} testid="footer-col-aprende">
              <li><Link to="/aprende/empieza-aqui" className="hover:text-foreground transition-colors">{t('footer.startHere')}</Link></li>
              <li><Link to="/aprende/reconstitucion-paso-a-paso" className="hover:text-foreground transition-colors">{t('footer.howToReconstitute')}</Link></li>
              <li><Link to="/aprende/como-verificamos-cada-lote" className="hover:text-foreground transition-colors" data-testid="footer-trazabilidad">{t('footer.traceability')}</Link></li>
              <li><Link to="/educacion" className="hover:text-foreground transition-colors" data-testid="footer-fotos-laboratorio">{t('footer.labPhotos')}</Link></li>
              <li><Link to="/compuestos" className="hover:text-foreground transition-colors">{t('footer.compendium')}</Link></li>
              <li><Link to="/aprende/preguntas-frecuentes" className="hover:text-foreground transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to="/aprende" className="hover:text-foreground transition-colors">{t('footer.allGuides')}</Link></li>
          </ColumnaDeEnlaces>
          <ColumnaDeEnlaces titulo={t('nav.tools')} esMovil={esMovil} testid="footer-col-herramientas">
              <li><Link to="/asesor" className="hover:text-foreground transition-colors">{t('nav.advisor')}</Link></li>
              <li><Link to="/calculadora" className="hover:text-foreground transition-colors">{t('nav.calculator')}</Link></li>
              <li><Link to="/tutoriales" className="hover:text-foreground transition-colors">{t('nav.tutorials')}</Link></li>
              <li><Link to="/educacion" className="hover:text-foreground transition-colors">{t('nav.education')}</Link></li>
              <li><Link to="/cuenta" className="hover:text-foreground transition-colors">{t('header.account')}</Link></li>
              <li><Link to="/carrito" className="hover:text-foreground transition-colors">{t('nav.cart')}</Link></li>
          </ColumnaDeEnlaces>
          <ColumnaDeEnlaces titulo={t('footer.infoTitle')} esMovil={esMovil} testid="footer-col-info">
              <li><Link to="/info/envios" className="hover:text-foreground transition-colors">{t('footer.shipping')}</Link></li>
              <li><Link to="/info/devoluciones" className="hover:text-foreground transition-colors">{t('footer.returns')}</Link></li>
              <li><Link to="/info/calidad" className="hover:text-foreground transition-colors">{t('footer.quality')}</Link></li>
              <li><Link to="/info/preparacion" className="hover:text-foreground transition-colors">{t('footer.prep')}</Link></li>
              <li><Link to="/info/contacto" className="hover:text-foreground transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/info/soporte" className="hover:text-foreground transition-colors">{t('nav.support')}</Link></li>
              <li><Link to="/info/rastreo" className="hover:text-foreground transition-colors">{t('nav.orderStatus')}</Link></li>
              <li><Link to="/info/terminos" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/info/privacidad" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link></li>
          </ColumnaDeEnlaces>
          <div className={esMovil ? 'pt-4' : undefined}>
            <h4 className="kicker mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {/* Teléfono oculto (2026-07-22): Christian dará un número nuevo no
                  ligado a él. Al tenerlo, restaurar aquí el <li> con formato
                  +52 (XXX) XXX-XXXX y liga tel:. */}
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[hsl(var(--primary))]" /> hola@exygenlabs.com</li>
              {/* ===== Mónica Flores — la cara del negocio, en chiquito ===== */}
              {/* Movida aquí, DEBAJO del correo (Christián, 2026-07-30): antes vivía
                  suelta al final del home, sobre la sección B2B. Mónica es la
                  representante de ventas REAL (Christián, 2026-07-28). Sin foto no se
                  inventa una: iniciales y nombre de verdad. Se enseña el USUARIO
                  (@exygenlabs), no el número — pero el enlace SÍ va al wa.me del
                  número, que es lo único que abre la conversación en cualquier
                  teléfono. */}
              <li className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm" data-testid="home-representante">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))]/15 border border-[hsl(var(--primary))]/30 font-heading text-[11px] font-bold text-[hsl(var(--primary))]">
                  MF
                </span>
                <span className="font-medium text-foreground">{t('home.rep.name')}</span>
                <span>· {t('home.rep.role')} ·</span>
                {WHATSAPP_URL && (
                  <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(t('home.rep.prefill'))}`}
                    target="_blank" rel="noreferrer" data-testid="home-rep-whatsapp"
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> {WHATSAPP_HANDLE}
                  </a>
                )}
              </li>
              {/* ⛔ Aquí había un SEGUNDO enlace de WhatsApp suelto
                  (data-testid="footer-whatsapp", Christian 2026-07-28). Al mover a
                  Mónica Flores al footer (2026-07-30) quedaron dos ligas pegadas
                  con el mismo @exygenlabs y el mismo wa.me. Se quitó el suelto y se
                  conservó el de Mónica, que trae nombre y rol de la representante.
                  NO volver a agregar un WhatsApp aparte en este bloque. */}
            </ul>
            {/* ⛔ Aquí estaban repetidos los cuatro métodos de pago (Christian,
                2026-07-28): la portada ya los enseña justo arriba, en "Pagos
                seguros y protegidos", y verlos dos veces seguidas se sentía
                duplicado. Se quedó solo el envío, que ahí no se dice. */}
            <div className="flex items-center gap-1.5 mt-5 text-xs text-muted-foreground">
              <FlagMX /> {t('footer.flagMexico')}
            </div>
          </div>
        </div>
        {/* Última línea, como peptides.mx: copyright a la IZQUIERDA y leyenda
            RUO a la DERECHA en el mismo renglón; en teléfono se apilan. */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-y-1.5 pt-5 sm:pt-6 pb-1">
          <p className="text-xs text-muted-foreground text-center sm:text-left font-mono-tech leading-none">© {new Date().getFullYear()} {t('footer.rights')}</p>
          <p className="text-xs text-muted-foreground text-center sm:text-right font-mono-tech leading-none" data-testid="footer-ruo-line">{t('footer.ruoLine')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
