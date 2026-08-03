import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Minus, Plus, ShoppingCart, FlaskConical, Bitcoin, Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { track } from '@/lib/track';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ProductCard from '@/components/ProductCard';
import TrustWidget from '@/components/TrustWidget';
import api, { formatMXN } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { getFallbackProductBySlug, getFallbackProductsByCategory } from '@/data/fallbackCatalog';
import { productImage, hasProductPhoto, isBrandImage } from '@/data/productImages';
import { useLanguage } from '@/context/LanguageContext';
import { localizeProduct, localizeProducts } from '@/i18n/catalog';

// FICHA DE PRODUCTO — SIMPLIFICADA. (Fable 5, 2026-07-30)
//
// Christián: "Simplifica todo. Me da miedo de tanta información. Hay muchísimo
// ruido en las páginas individuales de los productos. Muchísimo."
//
// Qué se hizo, con la vara de Apple (aire, jerarquía, lo esencial primero):
//
//   ARRIBA sólo lo que hace falta para decidir y comprar — foto, nombre,
//   presentación, pureza, precio, disponibilidad, botón. Nada más.
//
//   ABAJO, en tres acordeones CERRADOS: Descripción (con la monografía larga
//   dentro, que sola medía 1,300 px en móvil y salía ABIERTA de fábrica),
//   Especificaciones y Envíos.
//
//   FUERA lo repetido: la tarjeta de especificaciones vivía DOS veces en la misma
//   pantalla (rejilla arriba + pestaña abajo) — ahora vive una sola vez. Y el
//   "Número de lote" se quitó por orden de Christián: era un valor decorativo
//   (NP-…) que no corresponde a ningún lote real; los lotes reales van en el COA.
//
//   El aviso RUO NO se toca: sigue visible arriba (etiqueta junto al título y
//   recuadro ámbar bajo el botón de comprar), sólo que compactado.

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stockMap, setStockMap] = useState(null);
  // La monografía larga son 212 kB de texto para los ~75 productos que la tienen
  // escrita, y vive MUY abajo en la ficha (dentro del acordeón "Descripción").
  // Si viaja con la página, el precio y el botón de comprar esperan por ella. Se
  // pide aparte: la ficha pinta de inmediato y el texto entra en cuanto llega.
  const [monograph, setMonograph] = useState(null);
  // La foto en grande (Christián, 2026-08-03).
  const [zoom, setZoom] = useState(false);

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

  // La foto en grande: se cierra con Escape y bloquea el scroll del fondo mientras
  // está abierta. Sin lo segundo, el dedo mueve la página por detrás de la imagen.
  useEffect(() => {
    if (!zoom) return undefined;
    const salir = (e) => { if (e.key === 'Escape') setZoom(false); };
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', salir);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener('keydown', salir);
    };
  }, [zoom]);

  // Al cambiar de presentación la foto cambia: se cierra para no dejar en pantalla
  // el vial que ya no se está mirando.
  useEffect(() => { setZoom(false); }, [variantIdx, slug]);

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

  if (loading) return <div className="max-w-[1180px] mx-auto px-4 py-10"><Skeleton className="h-96 rounded-xl" /></div>;
  if (!product) return <div className="max-w-[1180px] mx-auto px-4 py-20 text-center">{t('product.notFound')} <Link to="/catalogo" className="text-[hsl(var(--primary))]">{t('product.backToCatalog')}</Link></div>;

  const localizedProduct = localizeProduct(product, language);
  const localizedRelated = localizeProducts(related, language);
  const variants = product.variants || [];
  const active = variants[variantIdx] || { price: localizedProduct.price, presentation: localizedProduct.presentation, stock: localizedProduct.stock };
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
  // UNA sola tabla de especificaciones, y vive dentro del acordeón. Antes se pintaba
  // dos veces en la misma pantalla (rejilla de tarjetas + pestaña) con los mismos
  // cuatro datos. El "Número de lote" salió por completo (ver el comentario de arriba).
  const specs = [
    { label: t('common.purity'), value: localizedProduct.purity, testid: 'pdp-purity', mono: true },
    { label: t('common.presentation'), value: active.presentation, mono: true },
    { label: t('common.form'), value: localizedProduct.form, mono: true },
    { label: t('product.tabs.storage'), value: localizedProduct.storage },
  ].filter((s) => s.value);
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
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Breadcrumb className="mb-6 sm:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">{t('common.home')}</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalogo">{t('common.catalog')}</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{localizedProduct.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        {/* ------------------------------------------------------------- foto */}
        <div className="lg:sticky lg:top-24">
          {/* La foto se abre en grande al picarle (Christián, 2026-08-03, copiando
              lo que hace Nexaph). Es un <button> y no un <div> con onClick a
              propósito: así se llega con el tabulador y se abre con Enter, que es
              lo que necesita quien no usa ratón. */}
          <button type="button" onClick={() => setZoom(true)} data-testid="pdp-image-open"
            aria-label={t('product.zoomOpen')}
            className="block w-full rounded-3xl border border-border bg-[hsl(var(--secondary))] overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]">
            <img src={productImage(localizedProduct, active)} alt={`${localizedProduct.name} ${active.presentation || ''}`.trim()} className="w-full object-cover aspect-square transition-transform duration-300 ease-out hover:scale-105" />
          </button>
          {isBrandImage(localizedProduct, active) && (
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground text-center">{t('product.brandPhotoNote')}</p>
          )}
          {hasProductPhoto(localizedProduct, active) && (
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground text-center">{t('product.photoNote')}</p>
          )}
        </div>

        {/* --------------------------------------------------- caja de compra */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3 w-3" /> {t('product.coaVerified')}</Badge>
            <Badge variant="outline" className="border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]">RUO</Badge>
            {localizedProduct.is_new && <Badge className="bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))]">{t('product.new')}</Badge>}
          </div>

          <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-bold tracking-tight leading-tight" data-testid="pdp-title">{localizedProduct.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground font-mono-tech">{active.presentation} · {t('product.purityLine', { purity: localizedProduct.purity })}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{localizedProduct.short_description}</p>

          {/* PRECIO POR MG EN CADA BOTÓN. (Fable 5, 2026-07-27)
              El cliente veía tres botones que solo cambiaban el precio total, así que
              elegía el más barato de etiqueta — que casi siempre es el PEOR valor.
              Caso medido: NAD+ 100 mg sale a $8.39/mg y el de 500 mg a $2.52/mg.
              Poner la cifra al lado no cambia ni un precio y sube el ticket solo. */}
          {variants.length > 1 && (
            <div className="mt-7">
              <div className="text-xs font-medium text-muted-foreground mb-2">{t('common.presentation')}</div>
              <div className="flex flex-wrap gap-2" data-testid="pdp-variant-selector">
                {variants.map((v, i) => {
                  const mg = parseFloat(v.presentation);
                  const porMg = mg > 0 ? v.price / mg : null;
                  const mejor = porMg != null && porMg === Math.min(...variants
                    .map((x) => (parseFloat(x.presentation) > 0 ? x.price / parseFloat(x.presentation) : Infinity)));
                  return (
                    <button key={v.presentation} type="button" onClick={() => setVariantIdx(i)} data-testid="pdp-variant-option"
                      className={`px-3.5 py-2 rounded-xl border text-sm font-medium transition-colors text-left ${i === variantIdx ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]' : 'border-border text-foreground hover:border-[hsl(var(--primary))]/50'}`}>
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

          <div className="mt-7 font-heading text-3xl font-bold tabular-nums" data-testid="pdp-price">{formatMXN(active.price)}</div>
          {localizedProduct.tiers?.length > 0 && (
            <div className="mt-1.5 text-xs text-muted-foreground">{t('product.volumePricing', { tiers: localizedProduct.tiers.map((tier) => t('common.piecesFrom', { price: formatMXN(tier.price), qty: tier.min_qty })).join(' · ') })}</div>
          )}

          <div className="mt-3" data-testid="pdp-availability">
            {inHand
              ? <span className="text-sm text-[hsl(var(--success))]">✓ {t('product.inHandStock', { stock: stockEntry.qty })}</span>
              : <Badge variant="outline" className="border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]" data-testid="pdp-sobre-pedido">{enCero ? t('backorder.badge') : t('product.oneWeekShip')}</Badge>}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-xl">
              <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} data-testid="pdp-qty-decrease"><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-medium" data-testid="pdp-qty">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} data-testid="pdp-qty-increase"><Plus className="h-4 w-4" /></Button>
            </div>
            <Button className="flex-1 rounded-xl" size="lg" onClick={addToCart} data-testid="pdp-add-to-cart-button"><ShoppingCart className="h-4 w-4 mr-2" /> {t('product.addToCart')}</Button>
          </div>

          {/* EL ESCALÓN DE VOLUMEN, donde se decide la compra (Christián, 2026-08-02).
              El 12% desde 3 piezas ya lo cobraba el servidor, pero nadie lo veía —
              y un descuento que el cliente no sabe que existe no gana ninguna venta.
              Certified anuncia el suyo en Meta; éste va pegado al selector de cantidad,
              que es el único lugar donde el número de piezas todavía se puede cambiar.
              Los insumos no llevan descuento, así que ahí no se promete nada. */}
          {active.descuentable !== false && (
            <p className={`mt-3 text-xs ${qty >= 3 ? 'text-[hsl(var(--success))]' : 'text-muted-foreground'}`}
               data-testid="pdp-volume-nudge">
              {qty >= 3 ? t('product.volumeApplied') : t('product.volumeNudge')}
            </p>
          )}

          {/* LA FRANJA DEL 5% EN CRIPTO (Christián, 2026-08-03).
              ⛔ Este 5% SE COBRA DE VERDAD: lo aplica el servidor en create_order
              (ver descuento_cripto.py en el backend). No es un adorno — si algún día
              se apaga la regla del backend, hay que apagar esta franja el mismo día,
              o el banner promete algo que la caja no cumple. Los insumos no llevan
              descuento comercial, pero éste SÍ les toca: no sale del margen del
              producto sino de la comisión de pasarela que el pedido no paga. */}
          <div className="mt-3 rounded-xl border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-3.5 py-2.5 flex items-center gap-2.5"
               data-testid="pdp-crypto-nudge">
            <Bitcoin className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
            <span className="text-[13px] font-medium leading-snug">{t('product.cryptoDiscount')}</span>
          </div>

          {/* Compra segura, con los métodos que de verdad aceptamos. Sin logos de
              marca: pintar los de Visa y Mastercard sin licencia es un problema que
              no hace falta tener, y el texto dice lo mismo. */}
          <div className="mt-4 rounded-xl border border-border bg-secondary/30 px-3.5 py-3" data-testid="pdp-safe-checkout">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-[0.14em] text-muted-foreground">
              <Lock className="h-3 w-3" />
              {t('product.safeCheckout')}
            </div>
            <p className="text-center text-[11.5px] text-muted-foreground mt-1.5 leading-snug">
              {t('product.safeCheckoutMethods')}
            </p>
          </div>

          {/* RUO COMPACTO, PERO ARRIBA Y VISIBLE. (Fable 5, 2026-07-30)
              Era un recuadro de 85 px en la columna de la foto. Ahora es una franja
              de dos renglones justo bajo el botón de comprar: el mismo texto legal,
              en el momento exacto en que se decide. No se toca ni una palabra. */}
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] px-3 py-2 text-[11px] leading-relaxed">
            <FlaskConical className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>{t('product.ruoWarning')}</span>
          </p>

          {/* LO QUE HACE FALTA PARA USAR ESTE VIAL. (Fable 5, 2026-07-27)
              Vendemos el agua bacteriostática a $179 y no la ofrecíamos en la ficha del
              péptido que la necesita. Se conserva, ya sin el párrafo que explicaba lo
              mismo que dice la etiqueta "Forma: Liofilizado" en Especificaciones. */}
          {esLiofilizado && (
            <div className="mt-6" data-testid="pdp-insumos">
              <div className="text-xs font-medium text-muted-foreground mb-2">Para usar este vial vas a necesitar</div>
              <div className="flex flex-wrap gap-2">
                <Link to="/producto/agua-bacteriostatica">
                  <Button variant="outline" size="sm" className="rounded-xl" data-testid="pdp-insumo-agua">
                    <FlaskConical className="h-3.5 w-3.5 mr-1.5" /> Agua bacteriostática
                  </Button>
                </Link>
                <Link to={`/calculadora?p=${encodeURIComponent(product.name)}&v=${parseFloat(active.presentation) || ''}`}>
                  <Button variant="outline" size="sm" className="rounded-xl" data-testid="pdp-calculadora">
                    ¿Cuánto te rinde? Calcúlalo →
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------ todo lo demás, cerrado
          Tres renglones cerrados en vez de cuatro pestañas con una abierta de fábrica.
          La monografía —el bloque más largo de la ficha— ya no cae encima de nadie:
          la abre quien la quiera leer.
          Dos columnas en escritorio (Christian, 2026-07-30): IZQUIERDA la
          Tienda de Confianza — colapsada es una sola línea discreta, nada de
          bloque grande —, DERECHA los acordeones. En móvil se apilan, el
          widget primero: es la señal de confianza antes del detalle técnico. */}
      <div className="mt-12 sm:mt-16 grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        <TrustWidget />
        <Accordion type="single" collapsible className="border-t border-border max-w-2xl">
          <AccordionItem value="desc">
            <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">{t('product.tabs.description')}</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{localizedProduct.description}</p>
              {/* Monografía larga: solo la tienen los productos que la tienen escrita.
                  Vive en productMonographs.js porque el catálogo se regenera. Va DENTRO
                  de "Descripción" y no en un renglón propio para no volver a llenar la
                  ficha de encabezados: es el mismo tema, sólo que largo. */}
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
                    Uso exclusivo en investigación (RUO), en laboratorio y ensayos in vitro. No es un
                    medicamento ni un suplemento, y esta ficha no contiene indicaciones de dosis ni de
                    administración.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specs">
            <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">{t('product.tabs.specs')}</AccordionTrigger>
            <AccordionContent>
              <dl className="divide-y divide-border">
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6 py-2.5 text-sm">
                    <dt className="text-muted-foreground shrink-0">{s.label}</dt>
                    <dd className={`text-right ${s.mono ? 'font-mono-tech' : 'text-muted-foreground'}`} data-testid={s.testid}>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping">
            <AccordionTrigger className="text-[15px] font-semibold hover:no-underline">{t('product.tabs.shipping')}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{t('product.shippingText')}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {related.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h2 className="font-heading text-xl font-bold mb-5">{t('product.related')}</h2>
          {/* En móvil dos, no cuatro: las otras dos añadían ~450 px de scroll a una
              página que ya venía larguísima. En escritorio se ven las cuatro. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {localizedRelated.map((p, i) => (
              <div key={p.id} className={i >= 2 ? 'hidden lg:block' : ''}><ProductCard product={p} /></div>
            ))}
          </div>
        </div>
      )}

      {/* LA FOTO EN GRANDE (Christián, 2026-08-03).
          Se cierra picando el fondo, la ✕ o Escape — las tres, porque en teléfono
          la ✕ queda lejos del pulgar y en escritorio nadie busca un botón para
          cerrar una imagen. `stopPropagation` en la foto para que picarla no la
          cierre: es lo que uno hace para verla mejor. */}
      {zoom && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 cursor-zoom-out"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
          aria-label={localizedProduct.name}
          data-testid="pdp-image-modal"
        >
          <button type="button" onClick={() => setZoom(false)} data-testid="pdp-image-close"
            aria-label={t('product.zoomClose')}
            className="absolute top-4 right-4 rounded-full border border-border bg-card/80 p-2.5 hover:bg-card transition-colors">
            <X className="h-5 w-5" />
          </button>
          <figure className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={productImage(localizedProduct, active)}
              alt={`${localizedProduct.name} ${active.presentation || ''}`.trim()}
              className="w-full h-auto max-h-[82vh] object-contain rounded-2xl cursor-default"
            />
            <figcaption className="text-center text-[12px] text-muted-foreground mt-3">
              {localizedProduct.name} · {active.presentation}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
