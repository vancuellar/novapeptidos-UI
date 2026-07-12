import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Minus, Plus, ShoppingCart, FileText, Truck, Package, FlaskConical, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ProductCard from '@/components/ProductCard';
import api, { formatMXN } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { getFallbackProductBySlug, getFallbackProductsByCategory } from '@/data/fallbackCatalog';
import { useLanguage } from '@/context/LanguageContext';
import { localizeProduct, localizeProducts } from '@/i18n/catalog';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    setVariantIdx(0);
    window.scrollTo(0, 0);
    api.get(`/products/${slug}`).then((r) => {
      if (!r.data || typeof r.data !== 'object' || !r.data.slug) throw new Error('unexpected product response');
      setProduct(r.data);
      api.get(`/products?category=${r.data.category}`).then((rr) => setRelated(Array.isArray(rr.data) ? rr.data.filter((p) => p.slug !== slug).slice(0, 4) : []));
    }).catch(() => {
      const fallbackProduct = getFallbackProductBySlug(slug);
      setProduct(fallbackProduct || null);
      setRelated(fallbackProduct ? getFallbackProductsByCategory(fallbackProduct.category).filter((p) => p.slug !== slug).slice(0, 4) : []);
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-10"><Skeleton className="h-96 rounded-xl" /></div>;
  if (!product) return <div className="max-w-6xl mx-auto px-4 py-20 text-center">{t('product.notFound')} <Link to="/catalogo" className="text-[hsl(var(--primary))]">{t('product.backToCatalog')}</Link></div>;

  const localizedProduct = localizeProduct(product, language);
  const localizedRelated = localizeProducts(related, language);
  const variants = product.variants || [];
  const active = variants[variantIdx] || { price: localizedProduct.price, presentation: localizedProduct.presentation, stock: localizedProduct.stock, batch_number: localizedProduct.batch_number };
  const out = (active.stock ?? 0) <= 0;
  const specs = [
    { label: t('common.purity'), value: localizedProduct.purity, testid: 'pdp-purity' },
    { label: t('common.presentation'), value: active.presentation },
    { label: t('common.form'), value: localizedProduct.form },
    { label: t('common.batchNumber'), value: active.batch_number, testid: 'pdp-lot-number' },
  ];
  const addToCart = () => addItem({
    ...localizedProduct,
    id: variants.length ? `${product.id}::${active.presentation}` : product.id,
    name: variants.length ? `${localizedProduct.name} ${active.presentation}` : localizedProduct.name,
    price: active.price,
    presentation: active.presentation,
    stock: active.stock,
  }, qty);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">{t('common.home')}</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalogo">{t('common.catalog')}</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{localizedProduct.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="rounded-2xl border border-border bg-[hsl(var(--secondary))] overflow-hidden">
            <img src={localizedProduct.image_url} alt={localizedProduct.name} className="w-full object-cover aspect-square" />
          </div>
          <div className="mt-4 rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] p-3 flex items-start gap-2 text-xs leading-relaxed">
            <FlaskConical className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{t('product.ruoWarning')}</span>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3 w-3" /> {t('product.coaVerified')}</Badge>
            <Badge variant="outline" className="border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]">RUO</Badge>
            {localizedProduct.is_new && <Badge className="bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))]">{t('product.new')}</Badge>}
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight" data-testid="pdp-title">{localizedProduct.name}</h1>
          <p className="mt-2 text-muted-foreground font-mono-tech text-sm">{active.presentation} · {t('product.purityLine', { purity: localizedProduct.purity })}</p>
          {variants.length > 1 && (
            <div className="mt-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">Presentación</div>
              <div className="flex flex-wrap gap-2" data-testid="pdp-variant-selector">
                {variants.map((v, i) => (
                  <button key={v.presentation} type="button" onClick={() => setVariantIdx(i)} data-testid="pdp-variant-option"
                    className={`px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-colors ${i === variantIdx ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]' : 'border-border text-foreground hover:border-[hsl(var(--primary))]/50'}`}>
                    {v.presentation}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 font-heading text-3xl font-bold" data-testid="pdp-price">{formatMXN(active.price)}</div>
          {localizedProduct.tiers?.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">{t('product.volumePricing', { tiers: localizedProduct.tiers.map((tier) => t('common.piecesFrom', { price: formatMXN(tier.price), qty: tier.min_qty })).join(' · ') })}</div>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{localizedProduct.short_description}</p>

          <div className="mt-5">
            {out ? <Badge variant="outline" className="text-muted-foreground">{t('product.outOfStock')}</Badge> : <span className="text-sm text-[hsl(var(--success))]">✓ {t('product.inStock', { stock: active.stock })}</span>}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} data-testid="pdp-qty-decrease"><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-medium" data-testid="pdp-qty">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} data-testid="pdp-qty-increase"><Plus className="h-4 w-4" /></Button>
            </div>
            <Button className="flex-1" size="lg" disabled={out} onClick={addToCart} data-testid="pdp-add-to-cart-button"><ShoppingCart className="h-4 w-4 mr-2" /> {t('product.addToCart')}</Button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-[hsl(var(--secondary))] p-3">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="font-mono-tech text-sm font-medium" data-testid={s.testid}>{s.value}</div>
              </div>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 w-full" data-testid="pdp-open-coa-button"><FileText className="h-4 w-4 mr-2" /> {t('product.viewCoa')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{t('product.coaTitle')}</DialogTitle></DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="rounded-lg border border-border p-4 bg-[hsl(var(--secondary))]">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">{t('common.product')}</span><span className="font-medium">{localizedProduct.name}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">{t('common.batchNumber')}</span><span className="font-mono-tech">{localizedProduct.batch_number}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">{t('common.purity')} (HPLC)</span><span className="font-mono-tech">{localizedProduct.purity}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">{t('common.method')}</span><span>HPLC / MS</span></div>
                </div>
                <p className="text-xs text-muted-foreground">{t('product.coaHelp')}</p>
                <Button asChild variant="outline" className="w-full"><a href={localizedProduct.coa_url} target="_blank" rel="noreferrer">{t('product.downloadPdf')}</a></Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Truck className="h-4 w-4" /> {t('product.fastShipping')}</span>
            <span className="flex items-center gap-1.5"><Package className="h-4 w-4" /> {t('product.discreetPackaging')}</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="desc">
          <TabsList>
            <TabsTrigger value="desc">{t('product.tabs.description')}</TabsTrigger>
            <TabsTrigger value="specs">{t('product.tabs.specs')}</TabsTrigger>
            <TabsTrigger value="storage">{t('product.tabs.storage')}</TabsTrigger>
            <TabsTrigger value="shipping">{t('product.tabs.shipping')}</TabsTrigger>
          </TabsList>
          <TabsContent value="desc" className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-3xl">{localizedProduct.description}</TabsContent>
          <TabsContent value="specs" className="mt-4">
            <div className="max-w-xl divide-y divide-border border border-border rounded-lg">
              {specs.map((s) => <div key={s.label} className="flex justify-between px-4 py-2.5 text-sm"><span className="text-muted-foreground">{s.label}</span><span className="font-mono-tech">{s.value}</span></div>)}
            </div>
          </TabsContent>
          <TabsContent value="storage" className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-3xl">{localizedProduct.storage}</TabsContent>
          <TabsContent value="shipping" className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-3xl">{t('product.shippingText')}</TabsContent>
        </Tabs>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-heading text-xl font-bold mb-5">{t('product.related')}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">{localizedRelated.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
