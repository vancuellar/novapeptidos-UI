import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, FlaskConical, ShieldCheck, Truck, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeSelector from '@/components/ThemeSelector';
import api from '@/lib/api';
import { fallbackCategories } from '@/data/fallbackCatalog';
import { localizeCategories } from '@/i18n/catalog';

const Header = () => {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    api.get('/categories').then((r) => setCategories(r.data)).catch(() => setCategories(fallbackCategories));
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/catalogo?search=${encodeURIComponent(search)}`);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Trust topbar */}
      <div className="bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))] border-b border-border text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center sm:justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.coa')}</div>
          <div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-[hsl(var(--primary))]" /> {t('header.shipping')}</div>
          <div className="hidden sm:flex items-center gap-2 font-mono-tech">{t('header.ruo')}</div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card/90 supports-[backdrop-filter]:backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="header-mobile-menu-button"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader><SheetTitle className="flex items-center gap-2"><FlaskConical className="h-5 w-5 text-[hsl(var(--primary))]" /> Nova Peptides</SheetTitle></SheetHeader>
              <form onSubmit={submitSearch} className="mt-4">
                <Input placeholder={t('header.searchShort')} value={search} onChange={(e) => setSearch(e.target.value)} data-testid="site-search-input-mobile" />
              </form>
              <nav className="mt-6 flex flex-col gap-1">
                <Link to="/catalogo" onClick={() => setMobileOpen(false)} className="py-2 font-medium">{t('header.allCatalog')}</Link>
                {localizeCategories(categories, language).map((c) => (
                  <Link key={c.slug} to={`/catalogo?category=${c.slug}`} onClick={() => setMobileOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">{c.name}</Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4">
                <LanguageSelector />
                <ThemeSelector />
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2 shrink-0" data-testid="header-logo">
            <div className="h-9 w-9 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
              <FlaskConical className="h-5 w-5 text-[hsl(var(--primary-foreground))]" />
            </div>
            <div className="leading-tight">
              <div className="font-heading font-bold text-lg tracking-tight">Nova Peptides</div>
              <div className="text-[10px] text-muted-foreground -mt-1 hidden sm:block">{t('header.brandTagline')}</div>
            </div>
          </Link>

          <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder={t('header.searchLong')} value={search} onChange={(e) => setSearch(e.target.value)} data-testid="site-search-input" />
            </div>
          </form>

          <div className="flex items-center gap-1 ml-auto">
            <div className="hidden lg:flex items-center gap-2 mr-1">
              <LanguageSelector />
              <ThemeSelector />
            </div>
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

        {/* Category nav */}
        <div className="hidden lg:block border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center gap-6 overflow-x-auto">
            <Link to="/catalogo" className="text-sm font-medium whitespace-nowrap hover:text-[hsl(var(--primary))]">{t('header.all')}</Link>
            {localizeCategories(categories, language).map((c) => (
              <Link key={c.slug} to={`/catalogo?category=${c.slug}`} className="text-sm text-muted-foreground whitespace-nowrap hover:text-[hsl(var(--primary))]" data-testid={`nav-category-${c.slug}`}>{c.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
