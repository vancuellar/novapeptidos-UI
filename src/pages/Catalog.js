import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/ProductCard';
import { formatMXN } from '@/lib/api';
import { fallbackCategories, fallbackProducts } from '@/data/fallbackCatalog';
import { useLanguage } from '@/context/LanguageContext';
import { localizeCategories, localizeProducts } from '@/i18n/catalog';

const Filters = ({ categories, selectedCat, setCat, inStock, setInStock, priceMax, setPriceMax, priceCeiling, onClear, t }) => (
  <div className="space-y-6">
    <div>
      <h4 className="font-semibold text-sm mb-3">{t('catalog.category')}</h4>
      <div className="space-y-2">
        <button onClick={() => setCat('')} className={`block text-sm ${!selectedCat ? 'text-[hsl(var(--primary))] font-medium' : 'text-muted-foreground'}`}>{t('catalog.allCategories')}</button>
        {categories.map((c) => (
          <button key={c.slug} onClick={() => setCat(c.slug)} data-testid={`filter-category-${c.slug}`} className={`block text-sm text-left ${selectedCat === c.slug ? 'text-[hsl(var(--primary))] font-medium' : 'text-muted-foreground hover:text-foreground'}`}>{c.name}</button>
        ))}
      </div>
    </div>
    <div>
      <h4 className="font-semibold text-sm mb-3">{t('catalog.maxPrice')}</h4>
      <Slider value={[priceMax]} min={500} max={priceCeiling} step={100} onValueChange={(v) => setPriceMax(v[0])} data-testid="catalog-price-slider" />
      <div className="text-xs text-muted-foreground mt-2">{t('catalog.upTo', { price: formatMXN(priceMax) })}</div>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="instock" checked={inStock} onCheckedChange={setInStock} data-testid="filter-in-stock" />
      <Label htmlFor="instock" className="text-sm">{t('catalog.inStockOnly')}</Label>
    </div>
    <Button variant="outline" className="w-full" onClick={onClear} data-testid="catalog-clear-filters-button"><X className="h-4 w-4 mr-1.5" /> {t('catalog.clearFilters')}</Button>
  </div>
);

const Catalog = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(params.get('search') || '');
  const [selectedCat, setSelectedCat] = useState(params.get('category') || '');
  const [inStock, setInStock] = useState(false);
  // Techo del filtro = producto más caro del catálogo, redondeado al millar (para no esconder los caros).
  const priceCeiling = useMemo(() => {
    const max = Math.max(5000, ...fallbackProducts.map((p) => p.price || 0));
    return Math.ceil(max / 1000) * 1000;
  }, []);
  const [priceMax, setPriceMax] = useState(priceCeiling);
  const [sort, setSort] = useState('relevance');
  const { language, t } = useLanguage();

  useEffect(() => {
    // El catálogo curado (generado desde la maestra) es la fuente de verdad.
    setCategories(fallbackCategories);
  }, []);

  useEffect(() => {
    setSearch(params.get('search') || '');
    setSelectedCat(params.get('category') || '');
  }, [params]);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    // Sin acentos y sin la vocal final de cada palabra: "Retatrutide" (inglés) encuentra "Retatrutida".
    const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const stem = (s) => norm(s).replace(/([a-z]{3})[aeo]\b/g, '$1');
    let list = [...fallbackProducts];
    if (selectedCat) list = list.filter((product) => (product.categories || [product.category]).includes(selectedCat));
    if (search) {
      const needle = stem(search).trim();
      list = list.filter((product) => stem(`${product.name} ${product.short_description || ''} ${product.description || ''}`).includes(needle));
    }
    if (inStock) list = list.filter((product) => product.stock > 0);
    list = list.filter((product) => product.price <= priceMax);
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    setProducts(list);
    setLoading(false);
  }, [selectedCat, search, inStock, priceMax, priceCeiling, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const setCat = (c) => { setSelectedCat(c); const np = new URLSearchParams(params); if (c) np.set('category', c); else np.delete('category'); setParams(np); };
  const clearFilters = () => { setSelectedCat(''); setSearch(''); setInStock(false); setPriceMax(priceCeiling); setParams(new URLSearchParams()); };
  const localizedCategories = localizeCategories(categories, language);
  const localizedProducts = localizeProducts(products, language);
  const catName = localizedCategories.find((c) => c.slug === selectedCat)?.name;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{catName || (search ? t('catalog.resultsFor', { search }) : t('catalog.title'))}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t('catalog.ruoLine')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <Input placeholder={t('catalog.searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)} className="md:max-w-xs" data-testid="catalog-search-input" />
        <div className="flex gap-3 ml-auto">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" data-testid="catalog-open-filters-button"><SlidersHorizontal className="h-4 w-4 mr-1.5" /> {t('catalog.filters')}</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader><SheetTitle>{t('catalog.filters')}</SheetTitle></SheetHeader>
              <div className="mt-6"><Filters categories={localizedCategories} selectedCat={selectedCat} setCat={setCat} inStock={inStock} setInStock={setInStock} priceMax={priceMax} setPriceMax={setPriceMax} priceCeiling={priceCeiling} onClear={clearFilters} t={t} /></div>
            </SheetContent>
          </Sheet>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]" data-testid="catalog-sort-select"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">{t('catalog.sort.relevance')}</SelectItem>
              <SelectItem value="price_asc">{t('catalog.sort.priceAsc')}</SelectItem>
              <SelectItem value="price_desc">{t('catalog.sort.priceDesc')}</SelectItem>
              <SelectItem value="newest">{t('catalog.sort.newest')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="hidden md:block md:col-span-3">
          <Card className="p-5 sticky top-32"><Filters categories={localizedCategories} selectedCat={selectedCat} setCat={setCat} inStock={inStock} setInStock={setInStock} priceMax={priceMax} setPriceMax={setPriceMax} priceCeiling={priceCeiling} onClear={clearFilters} t={t} /></Card>
        </aside>
        <div className="md:col-span-9">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-xl" />)}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">{t('catalog.empty')}</div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">{t('catalog.productCount', { count: products.length })}</div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" data-testid="catalog-grid">{localizedProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
