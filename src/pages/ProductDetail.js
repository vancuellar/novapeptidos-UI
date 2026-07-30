import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Minus, Plus, ShoppingCart, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { track } from '@/lib/track';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ProductCard from '@/components/ProductCard';
import TrustBadges from '@/components/TrustBadges';
import api, { formatMXN } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { getFallbackProductBySlug, getFallbackProductsByCategory } from '@/data/fallbackCatalog';
import { productImage, hasProductPhoto, isBrandImage } from '@/data/productImages';
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
  const [stockMap, setStockMap] = useState(null);
  // La monografía larga son 212 kB de texto para los ~75 productos que la tienen
  // escrita, y vive MUY abajo en la ficha (dentro de la pestaña "Descripción").
  // Si viaja con la página, el precio y el botón de comprar esperan por ella. Se
  // pide aparte: la ficha pinta de inmediato y el texto entra en cuanto llega.
  const [monograph, setMonograph] = useState(null);

  useEffect(() => {
    setLoading(true);
    setQty(1);
    setVariantIdx(0);
    window.scrollTo(0, 0);
    // El catalogo curado es la fuente de verdad (mismos ids que el inventario vivo).
    const fallbackProduct = getFallbackProductBySlug(slug);
    setProduct(fallbackProduct || null);
    setRelated(fallbackProduct ? getFallbackProductsByCategory(fallbackProduct.category).filter((p) => p.slug !== slug).slice(0, 4) : []);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    api.get('/stock').then((r) => setStockMap(r.data || null)).catch(() => setStockMap(null));
  }, []);

  // ARRANCA EN LA PRESENTACIÓN QUE MÁS LE CONVIENE AL CLIENTE. (Fable 5, 2026-07-27)
  //
  // Antes arrancaba SIEMPRE en la primera del arreglo, que es la más chica. En NAD+
  // eso significaba abrir en 100 mg a $8.39/mg cuando el de 500 mg cuesta $2.52/mg —
  // y encima el default salía "en ~1 semana" mientras el de 500 estaba EN MANO. O sea
  // que le poníamos enfrente el peor precio Y el más lento.
  //
  // Ahora abre en la de mejor precio por mg, prefiriendo las que están en mano. El
  // `ref` es para que esto pase UNA vez por producto: si el cliente elige otra, no se
  // la volvemos a cambiar cuando llegue la respuesta del inventario.
  const yaEligio = useRef('');
  useEffect(() => {
    const vs = product?.variants || [];
    if (!product || vs.length < 2 || yaEligio.current === product.slug) return;
    const porMg = (v) => {
      const mg = parseFloat(v.presentation);
      return mg > 0 ? v.price / mg : Infinity;
    };
    const enMano = (v) => {
      const e = stockMap ? stockMap[`${product.id}::${v.presentation}`] : null;
      return !!(e && e.in_hand && e.qty > 0);
    };
    const candidatas = vs.map((v, i) => ({ i, valor: porMg(v), mano: enMano(v) }));
    const conMano = candidatas.filter((c) => c.mano);
    const pool = conMano.length ? conMano : candidatas;
    const mejor = pool.reduce((a, b) => (b.valor < a.valor ? b : a));
    if (stockMap) yaEligio.current = product.slug;   // ya con inventario: decisión final
    setVariantIdx(mejor.i);
  }, [product, stockMap]);

  // Medición del embudo. Va con los demás hooks (antes de cualquier return):
  // si se pone después de un return condicional, React truena.
  useEffect(() => { if (product?.slug) track('product_view', { product: product.slug }); }, [product?.slug]);

  // Monografía a parte (ver el useState de arriba). `vigente` evita que una
  // respuesta vieja pise la ficha nueva si cambias de producto rápido.
  useEffect(() => {
    let vigente = true;
    setMonograph(null);
    if (!product?.slug) return undefined;
    import(/* webpackChunkName: "monografias" */ '@/data/productMonographs')
      .then(({ monographFor }) => { if (vigente) setMonograph(monographFor(product.slug)); })
      .catch(() => {});
    return () => { vigente = false; };
  }, [product?.slug]);

  if (loading) return <div className="max-w-[1280px] mx-auto px-4 py-10"><Skeleton className="h-96 rounded-xl" /></div>;
  if (!product) return <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">{t('product.notFound')} <Link to="/catalogo" className="text-[hsl(var(--primary))]">{t('product.backToCatalog')}</Link></div>;

  const localizedProduct = localizeProduct(product, language);
  const localizedRelated = localizeProducts(related, language);
  const variants = product.variants || [];
  const active = variants[variantIdx] || { price: localizedProduct.price, presentation: localizedProduct.presentation, stock: localizedProduct.stock, batch_number: localizedProduct.batch_number };
  // Los insumos y la calculadora solo tienen sentido en lo que llega en polvo y se
  // dosifica por mg. El agua bacteriostática no se ofrece a sí misma.
  const esLiofilizado = /liofiliz/i.test(localizedProduct.form || '')
    && /mg/i.test(active.presentation || '')
    && product.slug !== 'agua-bacteriostatica';
  const stockKey = variants.length ? `${product.id}::${active.presentation}` : product.id;
  const stockEntry = stockMap ? stockMap[stockKey] : null;
  // Siempre se puede comprar: en mano = inmediato; si no, ~1 semana (Christian resurte expres).
  const inHand = !!(stockEntry && stockEntry.in_hand && stockEntry.qty > 0);
  // ⛔ Y EN CERO TAMBIÉN SE VENDE, sobre pedido (Christián, 2026-07-30). Lo que cambia es
  // la leyenda, nunca el botón: Retatrutida 120 mg y Vitamina D3 llegaron a estar en el
  // catálogo sin poder comprarse porque su contador decía 0.
  const enCero = (stockEntry ? Number(stockEntry.qty) || 0 : Number(active.stock) || 0) <= 0;
  const specs = [
    { label: t('common.purity'), value: localizedProduct.purity, testid: 'pdp-purity' },
    { label: t('common.presentation'), value: active.presentation },
    { label: t('common.form'), value: localizedProduct.form },
    { label: t('common.batchNumber'), value: active.batch_number, testid: 'pdp-lot-number' },
  ];
  // El id que va al carrito DEBE existir en el catalogo real: usamos el id o el
  // SKU de la presentacion. Antes se inventaba "id::5 mg" y el backend no lo
  // encontraba al cobrar (bug de checkout, 2026-07-25).
  const addToCart = () => addItem({
    ...localizedProduct,
    id: active.id || active.sku || product.id,
    sku: active.sku || product.sku,
    name: variants.length ? `${localizedProduct.name} ${active.presentation}` : localizedProduct.name,
    price: active.price,
    presentation: active.presentation,
    stock: active.stock,
  }, qty);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <img src={productImage(localizedProduct, active)} alt={`${localizedProduct.name} ${active.presentation || ''}`.trim()} className="w-full object-cover aspect-square transition-transform duration-300 ease-out hover:scale-110" />
          </div>
          {isBrandImage(localizedProduct, active) && (
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground text-center">{t('product.brandPhotoNote')}</p>
          )}
          {hasProductPhoto(localizedProduct, active) && (
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground text-center">{t('product.photoNote')}</p>
          )}
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
          {/* PRECIO POR MG EN CADA BOTÓN. (Fable 5, 2026-07-27)
              El cliente veía tres botones que solo cambiaban el precio total, así que
              elegía el más barato de etiqueta — que casi siempre es el PEOR valor.
              Caso medido: NAD+ 100 mg sale a $8.39/mg y el de 500 mg a $2.52/mg.
              Poner la cifra al lado no cambia ni un precio y sube el ticket solo. */}
          {variants.length > 1 && (
            <div className="mt-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">Presentación</div>
              <div className="flex flex-wrap gap-2" data-testid="pdp-variant-selector">
                {variants.map((v, i) => {
                  const mg = parseFloat(v.presentation);
                  const porMg = mg > 0 ? v.price / mg : null;
                  const mejor = porMg != null && porMg === Math.min(...variants
                    .map((x) => (parseFloat(x.presentation) > 0 ? x.price / parseFloat(x.presentation) : Infinity)));
                  return (
                    <button key={v.presentation} type="button" onClick={() => setVariantIdx(i)} data-testid="pdp-variant-option"
                      className={`px-3.5 py-2 rounded-lg border text-sm font-medium transition-colors text-left ${i === variantIdx ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]' : 'border-border text-foreground hover:border-[hsl(var(--primary))]/50'}`}>
                      <div className="flex items-center gap-1.5">
                        {v.presentation}
                        {mejor && <span className="text-[10px] uppercase tracking-wide font-semibold text-[hsl(var(--success))]">mejor valor</span>}
                      </div>
                      {porMg != null && /mg/i.test(v.presentation) && (
                        <div className="text-[11px] font-normal text-muted-foreground tabular-nums">
                          {formatMXN(Math.round(porMg * 100) / 100)}/mg
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mt-4 font-heading text-3xl font-bold" data-testid="pdp-price">{formatMXN(active.price)}</div>
          {localizedProduct.tiers?.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">{t('product.volumePricing', { tiers: localizedProduct.tiers.map((tier) => t('common.piecesFrom', { price: formatMXN(tier.price), qty: tier.min_qty })).join(' · ') })}</div>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{localizedProduct.short_description}</p>

          <div className="mt-5" data-testid="pdp-availability">
            {inHand
              ? <span className="text-sm text-[hsl(var(--success))]">✓ {t('product.inHandStock', { stock: stockEntry.qty })}</span>
              : <Badge variant="outline" className="border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]" data-testid="pdp-sobre-pedido">{enCero ? t('backorder.badge') : t('product.oneWeekShip')}</Badge>}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} data-testid="pdp-qty-decrease"><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-medium" data-testid="pdp-qty">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} data-testid="pdp-qty-increase"><Plus className="h-4 w-4" /></Button>
            </div>
            <Button className="flex-1" size="lg" onClick={addToCart} data-testid="pdp-add-to-cart-button"><ShoppingCart className="h-4 w-4 mr-2" /> {t('product.addToCart')}</Button>
          </div>

          {/* LO QUE HACE FALTA PARA USAR ESTE VIAL. (Fable 5, 2026-07-27)
              Vendemos el agua bacteriostática a $179 y no la ofrecíamos en la ficha del
              péptido que la necesita: "Productos relacionados" enseñaba otros péptidos
              caros, no lo que hace falta para usar el que está viendo. Y la calculadora
              existía sin estar enlazada desde el único momento en que sirve. */}
          {esLiofilizado && (
            <div className="mt-5 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4" data-testid="pdp-insumos">
              <div className="text-sm font-medium mb-1">Para usar este vial vas a necesitar</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Llega liofilizado (en polvo): hay que reconstituirlo con agua bacteriostática
                antes de poder medir una dosis.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link to="/producto/agua-bacteriostatica">
                  <Button variant="outline" size="sm" data-testid="pdp-insumo-agua">
                    <FlaskConical className="h-3.5 w-3.5 mr-1.5" /> Agua bacteriostática
                  </Button>
                </Link>
                <Link to={`/calculadora?p=${encodeURIComponent(product.name)}&v=${parseFloat(active.presentation) || ''}`}>
                  <Button variant="outline" size="sm" data-testid="pdp-calculadora">
                    ¿Cuánto te rinde? Calcúlalo →
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3">
            {specs.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-[hsl(var(--secondary))] p-3">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="font-mono-tech text-sm font-medium" data-testid={s.testid}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* TIENDA DE CONFIANZA, JUSTO DONDE SE DUDA. (Fable 5, 2026-07-29)
              Aquí había tres señales sueltas y minúsculas — "certificado en tu
              cuenta", "envío 2–5 días", "empaque discreto" — en letra de 12 px que
              nadie lee. Se sustituyen por el bloque completo, que dice esas mismas
              tres cosas y además las que faltaban: pureza por HPLC, origen EUA,
              formas de pago y WhatsApp. No se duplica nada: lo que se ve arriba
              (pureza, lote, presentación) son DATOS de este vial; esto son las
              condiciones de la tienda.
              Sin RUO propio: en esta página ya va en recuadro ámbar a la izquierda
              y en la etiqueta junto al título. */}
          <TrustBadges className="mt-6" showRuo={false} />
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
          <TabsContent value="desc" className="mt-4 max-w-3xl">
            <p className="text-sm leading-relaxed text-muted-foreground">{localizedProduct.description}</p>
            {/* Monografía larga: solo la tienen los productos que la tienen escrita.
                Vive en productMonographs.js porque el catálogo se regenera. */}
            {monograph && (
              <div className="mt-8 space-y-7" data-testid="product-monograph">
                {monograph.sections.map((sec) => (
                  <section key={sec.title}>
                    <h3 className="font-heading text-base font-semibold mb-2">{sec.title}</h3>
                    <div className="space-y-3">
                      {sec.paragraphs.map((par, i) => (
                        <p key={i} className="text-sm leading-relaxed text-muted-foreground">{par}</p>
                      ))}
                    </div>
                  </section>
                ))}
                <p className="text-xs leading-relaxed text-muted-foreground border-t border-border pt-4">
                  Uso exclusivo en investigación (RUO). No es un medicamento ni un suplemento, no está
                  destinado a consumo humano ni animal, y esta ficha no contiene indicaciones de dosis
                  ni de administración.
                </p>
              </div>
            )}
          </TabsContent>
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
