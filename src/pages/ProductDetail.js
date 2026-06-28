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

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    window.scrollTo(0, 0);
    api.get(`/products/${slug}`).then((r) => {
      setProduct(r.data);
      api.get(`/products?category=${r.data.category}`).then((rr) => setRelated(rr.data.filter((p) => p.slug !== slug).slice(0, 4)));
    }).catch(() => setProduct(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-10"><Skeleton className="h-96 rounded-xl" /></div>;
  if (!product) return <div className="max-w-6xl mx-auto px-4 py-20 text-center">Producto no encontrado. <Link to="/catalogo" className="text-[hsl(var(--primary))]">Volver al catálogo</Link></div>;

  const out = product.stock <= 0;
  const specs = [
    { label: 'Pureza', value: product.purity, testid: 'pdp-purity' },
    { label: 'Presentación', value: product.presentation },
    { label: 'Forma', value: product.form },
    { label: 'Número de lote', value: product.batch_number, testid: 'pdp-lot-number' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Inicio</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalogo">Catálogo</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="rounded-2xl border border-border bg-[hsl(var(--secondary))] overflow-hidden">
            <img src={product.image_url} alt={product.name} className="w-full object-cover aspect-square" />
          </div>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 p-3 flex items-start gap-2 text-xs leading-relaxed">
            <FlaskConical className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Solo para uso en investigación (RUO). No destinado a diagnóstico, tratamiento, cura o prevención de enfermedades.</span>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3 w-3" /> COA verificado</Badge>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-900">RUO</Badge>
            {product.is_new && <Badge className="bg-sky-600">Nuevo</Badge>}
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight" data-testid="pdp-title">{product.name}</h1>
          <p className="mt-2 text-muted-foreground font-mono-tech text-sm">{product.presentation} · Pureza {product.purity}</p>
          <div className="mt-4 font-heading text-3xl font-bold" data-testid="pdp-price">{formatMXN(product.price)}</div>
          {product.tiers?.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">Precio por volumen: {product.tiers.map((t) => `${formatMXN(t.price)} desde ${t.min_qty} pzas`).join(' · ')}</div>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.short_description}</p>

          <div className="mt-5">
            {out ? <Badge variant="outline" className="text-muted-foreground">Agotado</Badge> : <span className="text-sm text-emerald-700">✓ En stock ({product.stock} disponibles)</span>}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} data-testid="pdp-qty-decrease"><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-medium" data-testid="pdp-qty">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} data-testid="pdp-qty-increase"><Plus className="h-4 w-4" /></Button>
            </div>
            <Button className="flex-1" size="lg" disabled={out} onClick={() => addItem(product, qty)} data-testid="pdp-add-to-cart-button"><ShoppingCart className="h-4 w-4 mr-2" /> Agregar al carrito</Button>
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
              <Button variant="outline" className="mt-4 w-full" data-testid="pdp-open-coa-button"><FileText className="h-4 w-4 mr-2" /> Ver Certificado de Análisis (COA)</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Certificado de Análisis (COA)</DialogTitle></DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="rounded-lg border border-border p-4 bg-[hsl(var(--secondary))]">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Producto</span><span className="font-medium">{product.name}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Número de lote</span><span className="font-mono-tech">{product.batch_number}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Pureza (HPLC)</span><span className="font-mono-tech">{product.purity}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Método</span><span>HPLC / MS</span></div>
                </div>
                <p className="text-xs text-muted-foreground">Verifica que el lote del vial coincida con el del COA. El documento completo en PDF está disponible bajo solicitud.</p>
                <Button asChild variant="outline" className="w-full"><a href={product.coa_url} target="_blank" rel="noreferrer">Descargar PDF</a></Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Truck className="h-4 w-4" /> Envío 2-5 días</span>
            <span className="flex items-center gap-1.5"><Package className="h-4 w-4" /> Empaque discreto</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="desc">
          <TabsList>
            <TabsTrigger value="desc">Descripción</TabsTrigger>
            <TabsTrigger value="specs">Especificaciones</TabsTrigger>
            <TabsTrigger value="storage">Almacenamiento</TabsTrigger>
            <TabsTrigger value="shipping">Envíos</TabsTrigger>
          </TabsList>
          <TabsContent value="desc" className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-3xl">{product.description}</TabsContent>
          <TabsContent value="specs" className="mt-4">
            <div className="max-w-xl divide-y divide-border border border-border rounded-lg">
              {specs.map((s) => <div key={s.label} className="flex justify-between px-4 py-2.5 text-sm"><span className="text-muted-foreground">{s.label}</span><span className="font-mono-tech">{s.value}</span></div>)}
            </div>
          </TabsContent>
          <TabsContent value="storage" className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-3xl">{product.storage}</TabsContent>
          <TabsContent value="shipping" className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-3xl">Realizamos envíos a todo México en 2 a 5 días hábiles según la zona. Envío gratis en compras desde $2,500 MXN. Empaque discreto y con control de temperatura cuando aplica.</TabsContent>
        </Tabs>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-heading text-xl font-bold mb-5">Productos relacionados</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
