import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Eye } from 'lucide-react';
import { formatMXN } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { productImage } from '@/data/productImages';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const out = product.stock <= 0;
  const variants = product.variants || [];
  const hasVariants = variants.length > 0;       // al menos una presentación con precio propio
  const showSelector = variants.length > 1;      // dropdown solo si hay varias
  const [variantIdx, setVariantIdx] = useState(0);
  const active = hasVariants ? variants[variantIdx] : null;
  const price = active ? active.price : product.price;
  const presentationLabel = showSelector ? `${variants.length} ${t('product.card.presentations')}` : (active?.presentation || product.presentation);

  const add = () => {
    if (hasVariants) {
      addItem({
        ...product,
        id: `${product.id}::${active.presentation}`,
        name: `${product.name} ${active.presentation}`,
        price: active.price,
        presentation: active.presentation,
        stock: active.stock,
      });
    } else {
      addItem(product);
    }
  };

  return (
    <Card data-testid="product-card" className="group overflow-hidden border-border bg-card text-card-foreground shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[hsl(var(--primary))]/40 transition-all duration-200 flex flex-col">
      <Link to={`/producto/${product.slug}`} className="block relative">
        <div className="bg-[hsl(var(--secondary))] overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <img src={productImage(product)} alt={product.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" loading="lazy" />
          </AspectRatio>
        </div>
        {product.purity && (
          <span className="absolute top-2.5 left-2.5 rounded-md bg-[#0b0d0c]/85 text-[#d8e9e0] font-mono-tech text-[10px] px-2 py-1 tracking-wide">
            HPLC {product.purity}
          </span>
        )}
        {product.is_new && (
          <span className="absolute top-2.5 right-2.5 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-[10px] font-semibold px-2 py-1">{t('product.new')}</span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Badge variant="outline" className="text-[10px] border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]" data-testid="product-card-ruo-badge">RUO</Badge>
        </div>
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-heading font-semibold tracking-tight leading-snug hover:text-[hsl(var(--primary))]">{product.name}</h3>
        </Link>
        <div className="mt-1 text-xs text-muted-foreground font-mono-tech">{presentationLabel} · {t('product.card.purity', { purity: product.purity })}</div>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 flex-1">{product.short_description}</p>

        {showSelector && (
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
            <Select value={String(variantIdx)} onValueChange={(v) => setVariantIdx(Number(v))}>
              <SelectTrigger className="h-9" data-testid="product-card-variant-select"><SelectValue /></SelectTrigger>
              <SelectContent>
                {variants.map((v, i) => <SelectItem key={v.presentation} value={String(i)}>{v.presentation} · {formatMXN(v.price)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="font-heading text-lg font-bold" data-testid="product-card-price">{formatMXN(price)} <span className="text-[11px] font-mono-tech font-normal text-muted-foreground">MXN</span></span>
          {out
            ? <span className="text-xs text-muted-foreground">{t('product.outOfStock')}</span>
            : <span className="inline-flex items-center gap-1.5 text-xs text-[hsl(var(--success))]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" /> {t('product.card.inStock')}</span>}
        </div>
        <div className="mt-3 flex gap-2">
          <Button className="flex-1" disabled={out} onClick={add} data-testid="product-card-add-to-cart-button">
            <ShoppingCart className="h-4 w-4 mr-1.5" /> {t('product.card.add')}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/producto/${product.slug}`)} data-testid="product-card-view-details-link" aria-label={t('product.card.view')}>
            <Eye className="h-4 w-4 sm:mr-1.5" /> <span className="hidden sm:inline">{t('product.card.view')}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
