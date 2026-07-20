import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut, LayoutDashboard, ChevronDown, Search, X, Moon, Sun, Home, LayoutGrid, BadgeCheck, GraduationCap, MessageCircle, Calculator, Sparkles, FlaskConical, Flame, Activity, HeartPulse, Hourglass, HeartHandshake, Brain, ShieldPlus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import BrandLogo from '@/components/BrandLogo';
import api from '@/lib/api';
import { fallbackCategories } from '@/data/fallbackCatalog';
import { localizeCategories } from '@/i18n/catalog';

const navLinkClass = 'inline-flex items-center gap-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors';

// Iconos + ejemplos por categoría para el menú móvil (estilo Exoma).
const CAT_ICONS = {
  'perdida-peso': Flame, 'hormona-crecimiento': Activity, 'recuperacion': HeartPulse,
  'longevidad': Hourglass, 'sexual-hormonal': HeartHandshake, 'nootropicos': Brain,
  'estetica': Sparkles, 'bioreguladores': ShieldPlus, 'suministros': FlaskConical, 'otros': Package,
};
const CAT_EXAMPLES = {
  'perdida-peso': 'Retatrutida, Tirzepatida, Semaglutida', 'recuperacion': 'BPC-157, TB-500, GHK-Cu',
  'hormona-crecimiento': 'CJC-1295, Ipamorelin, Tesamorelina', 'longevidad': 'Epithalon, NAD+, Glutatión',
  'sexual-hormonal': 'PT-141, Kisspeptina, Melanotan II', 'nootropicos': 'Semax, Selank, DSIP',
  'estetica': 'GHK-Cu, Melanotan II', 'bioreguladores': 'Timosina α-1, LL-37',
  'suministros': 'Agua bacteriostática', 'otros': 'Especialidad',
};
const CAT_TOP = new Set(['perdida-peso', 'recuperacion']);
const WHATSAPP_URL = 'https://wa.me/5219944946889';

// Menú "Herramientas": todo lo que NO es el catálogo, en dos columnas.
// El catálogo lista los péptidos; aquí vive el resto. Sin duplicar nada.
const TOOL_GROUPS = [
  {
    titleKey: 'nav.group.tools',
    items: [
      { to: '/asesor', labelKey: 'nav.advisor', descKey: 'nav.advisor.desc' },
      { to: '/calculadora', labelKey: 'nav.calculator', descKey: 'nav.calculator.desc' },
      { to: '/compuestos', labelKey: 'nav.compounds', descKey: 'nav.compounds.desc' },
      { to: '/aprende', labelKey: 'nav.guides', descKey: 'nav.guides.desc' },
    ],
  },
  {
    titleKey: 'nav.group.info',
    items: [
      { to: '/educacion', labelKey: 'nav.education', descKey: 'nav.education.desc' },
      { to: '/info/calidad', labelKey: 'footer.quality', descKey: 'nav.quality.desc' },
      { to: '/info/envios', labelKey: 'footer.shipping', descKey: 'nav.shipping.desc' },
      { to: '/info/devoluciones', labelKey: 'footer.returns', descKey: 'nav.returns.desc' },
    ],
  },
];

const Header = () => {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const { language, languages, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(Array.isArray(r.data) && r.data.length ? r.data : fallbackCategories)).catch(() => setCategories(fallbackCategories));
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/catalogo?search=${encodeURIComponent(search)}`);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const currentLang = languages.find((l) => l.code === language);
  // Resolve "system" to the actual applied theme, then toggle to the opposite.
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-40">
      <Link to="/catalogo" className="block bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-center text-[11px] sm:text-xs py-1.5 px-4 font-medium tracking-wide hover:opacity-95 transition-opacity" data-testid="promo-banner">
        🎉 {t('discount.launchBanner')}
      </Link>
      <div className="bg-background/70 supports-[backdrop-filter]:backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Left: nav links (desktop) / menu (mobile) */}
          <div className="flex items-center gap-8 justify-self-start">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="header-mobile-menu-button"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[22rem] max-w-[92vw] p-0 flex flex-col">
              <SheetHeader className="px-5 pt-5 pb-3">
                <SheetTitle asChild>
                  <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                    <BrandLogo compact />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-5 pb-4">
                <form onSubmit={submitSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 h-11 rounded-xl" placeholder={t('header.searchShort')} value={search} onChange={(e) => setSearch(e.target.value)} data-testid="site-search-input-mobile" />
                </form>

                {/* Cuadrícula de accesos con iconos */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {[
                    { to: '/', icon: Home, label: t('nav.home') },
                    { to: '/catalogo', icon: LayoutGrid, label: t('nav.catalog') },
                    { to: user ? '/cuenta' : '/login', icon: User, label: t('header.account') },
                    { to: '/educacion', icon: GraduationCap, label: t('nav.education') },
                  ].map((it) => (
                    <Link key={it.label} to={it.to} onClick={() => setMobileOpen(false)} className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 py-3 hover:border-[hsl(var(--primary))]/40 transition-colors">
                      <it.icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-center leading-tight">{it.label}</span>
                    </Link>
                  ))}
                </div>

                <Link to="/info/calidad" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 px-4 py-3 hover:border-[hsl(var(--primary))]/40 transition-colors">
                  <span className="h-9 w-9 rounded-lg bg-[hsl(var(--secondary))] flex items-center justify-center"><BadgeCheck className="h-4 w-4 text-[hsl(var(--primary))]" /></span>
                  <span className="font-semibold">{t('footer.quality')}</span>
                </Link>

                {/* Péptidos por categoría */}
                <div className="mt-6 mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t('nav.byCategory')}</div>
                <div className="grid grid-cols-2 gap-2">
                  {localizeCategories(categories, language).filter((c) => c.slug !== 'suministros' && c.slug !== 'otros').map((c) => {
                    const Icon = CAT_ICONS[c.slug] || Package;
                    return (
                      <Link key={c.slug} to={`/catalogo?category=${c.slug}`} onClick={() => setMobileOpen(false)} className="relative rounded-xl border border-border p-3 hover:border-[hsl(var(--primary))]/40 hover:bg-[hsl(var(--secondary))]/40 transition-colors">
                        {CAT_TOP.has(c.slug) && <span className="absolute top-2 right-2 rounded-full bg-[hsl(var(--primary))]/12 text-[hsl(var(--primary))] text-[8px] font-bold px-1.5 py-0.5">TOP</span>}
                        <Icon className="h-4 w-4 text-[hsl(var(--primary))] mb-1.5" />
                        <div className="font-semibold text-[13px] leading-tight">{c.name}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{CAT_EXAMPLES[c.slug]}</div>
                      </Link>
                    );
                  })}
                </div>

                {/* Recursos y herramientas */}
                <div className="mt-6 mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t('nav.resources')}</div>
                <div className="flex flex-col gap-1">
                  {[
                    { to: '/asesor', icon: MessageCircle, label: t('nav.advisor') },
                    { to: '/calculadora', icon: Calculator, label: t('nav.calculator') },
                    { to: '/educacion', icon: GraduationCap, label: t('nav.education') },
                    { to: '/info/envios', icon: Package, label: t('footer.shipping') },
                    { to: '/info/devoluciones', icon: ShieldPlus, label: t('footer.returns') },
                  ].map((it) => (
                    <Link key={it.label} to={it.to} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm hover:bg-[hsl(var(--secondary))]/60 transition-colors">
                      <it.icon className="h-4 w-4 text-muted-foreground" /> {it.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contactar experto — WhatsApp, fijo abajo */}
              <div className="border-t border-border p-4">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#1fa855] hover:bg-[#188c46] text-white font-semibold py-3.5 transition-colors" data-testid="mobile-whatsapp">
                  <MessageCircle className="h-5 w-5" /> {t('nav.contactExpert')}
                </a>
              </div>
            </SheetContent>
          </Sheet>

          {/* Primary nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/catalogo" className={navLinkClass} data-testid="nav-catalog">{t('nav.catalog')}</Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={navLinkClass} data-testid="nav-tools">
                {t('nav.tools')} <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[560px] p-0">
                <div className="grid grid-cols-2 divide-x divide-border">
                  {TOOL_GROUPS.map((group) => (
                    <div key={group.titleKey} className="p-4">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">{t(group.titleKey)}</div>
                      <ul className="space-y-0.5">
                        {group.items.map((it) => (
                          <li key={it.to}>
                            <button onClick={() => navigate(it.to)} data-testid="nav-tool-link"
                              className="w-full text-left rounded-md px-2 py-1.5 hover:bg-[hsl(var(--muted))] transition-colors">
                              <div className="text-sm font-medium">{t(it.labelKey)}</div>
                              <div className="text-[11px] text-muted-foreground">{t(it.descKey)}</div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          </div>

          {/* Center: logo */}
          <Link to="/" className="shrink-0 justify-self-center" data-testid="header-logo">
            <BrandLogo compact />
          </Link>

          <div className="flex items-center gap-0.5 justify-self-end">
            {/* Expanding search */}
            {searchOpen ? (
              <form onSubmit={submitSearch} className="hidden md:flex items-center">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input ref={searchRef} className="pl-9 h-9" placeholder={t('header.searchLong')} value={search} onChange={(e) => setSearch(e.target.value)} data-testid="site-search-input" />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)}><X className="h-4 w-4" /></Button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={() => setSearchOpen(true)} data-testid="header-search-button">
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-2 font-mono-tech text-xs uppercase tracking-[0.1em]" data-testid="language-selector">
                  {currentLang ? currentLang.shortLabel : 'ES'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                  {languages.map((item) => (
                    <DropdownMenuRadioItem key={item.code} value={item.code}>
                      <span className="inline-flex items-center gap-2"><span aria-hidden="true">{item.flag}</span> {item.label}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle: shows the theme you'll switch TO */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} data-testid="theme-selector" aria-label={t('controls.theme')}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Profile */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="header-account-button"><User className="h-5 w-5" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="truncate">{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/cuenta')}><User className="h-4 w-4 mr-2" /> {t('header.account')}</DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')} data-testid="header-admin-link"><LayoutDashboard className="h-4 w-4 mr-2" /> {t('header.admin')}</DropdownMenuItem>
                  )}
                  {['distributor', 'admin'].includes(user.role) && (
                    <DropdownMenuItem onClick={() => navigate('/distribuidor')} data-testid="header-distributor-link"><LayoutDashboard className="h-4 w-4 mr-2" /> {t('header.distributor')}</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); navigate('/'); }} data-testid="header-logout-button" className="text-destructive focus:text-destructive [&_svg]:text-destructive"><LogOut className="h-4 w-4 mr-2" /> {t('header.logout')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => navigate('/login')} data-testid="header-account-button"><User className="h-5 w-5" /></Button>
            )}

            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/carrito')} data-testid="header-cart-button">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center bg-[hsl(var(--primary))]" data-testid="header-cart-count">{count}</Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
