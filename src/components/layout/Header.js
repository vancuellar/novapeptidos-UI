import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, LogOut, LayoutDashboard, ChevronDown, Search, X, Moon, Sun } from 'lucide-react';
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
import BrandLogo, { BrandMark } from '@/components/BrandLogo';
import api from '@/lib/api';
import { fallbackCategories } from '@/data/fallbackCatalog';
import { localizeCategories } from '@/i18n/catalog';

const navLinkClass = 'inline-flex items-center gap-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors';

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
    api.get('/categories').then((r) => setCategories(Array.isArray(r.data) ? r.data : fallbackCategories)).catch(() => setCategories(fallbackCategories));
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
      <Link to="/carrito" className="block bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-center text-[11px] sm:text-xs py-1.5 px-4 font-medium tracking-wide hover:opacity-95 transition-opacity" data-testid="promo-banner">
        🎉 Precio de lanzamiento — usa el código <span className="font-bold underline underline-offset-2">INTRO10</span> y obtén 10% de descuento en tu primer pedido
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
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle asChild>
                  <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                    <BrandMark className="h-5 w-5 text-[hsl(var(--primary))]" /> Nova Peptides
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <form onSubmit={submitSearch} className="mt-4">
                <Input placeholder={t('header.searchShort')} value={search} onChange={(e) => setSearch(e.target.value)} data-testid="site-search-input-mobile" />
              </form>
              <nav className="mt-6 flex flex-col gap-1">
                <Link to="/catalogo" onClick={() => setMobileOpen(false)} className="py-2 font-medium">{t('nav.catalog')}</Link>
                {localizeCategories(categories, language).map((c) => (
                  <Link key={c.slug} to={`/catalogo?category=${c.slug}`} onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">{c.name}</Link>
                ))}
                <Link to="/asesor" onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">{t('nav.advisor')}</Link>
                <Link to="/calculadora" onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">{t('nav.calculator')}</Link>
                <Link to="/educacion" onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">{t('nav.education')}</Link>
                <Link to="/info/calidad" onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">{t('footer.quality')}</Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Primary nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/catalogo" className={navLinkClass} data-testid="nav-catalog">{t('nav.catalog')}</Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={navLinkClass} data-testid="nav-tools">
                {t('nav.tools')} <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem onClick={() => navigate('/asesor')} data-testid="nav-asesor">{t('nav.advisor')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/calculadora')} data-testid="nav-calculadora">{t('nav.calculator')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/educacion')} data-testid="nav-educacion">{t('nav.education')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/info/calidad')}>{t('footer.quality')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/info/envios')}>{t('footer.shipping')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/info/devoluciones')}>{t('footer.returns')}</DropdownMenuItem>
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); navigate('/'); }} data-testid="header-logout-button"><LogOut className="h-4 w-4 mr-2" /> {t('header.logout')}</DropdownMenuItem>
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
