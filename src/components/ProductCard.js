import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ShoppingCart, ShieldCheck } from 'lucide-react';
import { formatMXN } from '@/lib/api';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const out = product.stock <= 0;

  return (
    <Card data-testid="product-card" className="group overflow-hidden border-border bg-card text-card-foreground shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200 flex flex-col">
      <Link to={`/producto/${product.slug}`} className="block">
        <div className="bg-[hsl(var(--secondary))] overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300" loading="lazy" />
          </AspectRatio>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Badge variant="secondary" className="text-[10px] gap-1" data-testid="product-card-coa-badge"><ShieldCheck className="h-3 w-3" /> COA</Badge>
          <Badge variant="outline" className="text-[10px] border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))]" data-testid="product-card-ruo-badge">RUO</Badge>
          {product.is_new && <Badge className="text-[10px] bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))]">Nuevo</Badge>}
        </div>
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-heading font-semibold tracking-tight leading-snug hover:text-[hsl(var(--primary))]">{product.name}</h3>
        </Link>
        <div className="mt-1 text-xs text-muted-foreground font-mono-tech">{product.presentation} · Pureza {product.purity}</div>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 flex-1">{product.short_description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-heading text-lg font-bold" data-testid="product-card-price">{formatMXN(product.price)}</span>
          {out ? <span className="text-xs text-muted-foreground">Agotado</span> : <span className="text-xs text-[hsl(var(--success))]">En stock</span>}
        </div>
        <div className="mt-3 flex gap-2">
          <Button className="flex-1" disabled={out} onClick={() => addItem(product)} data-testid="product-card-add-to-cart-button">
            <ShoppingCart className="h-4 w-4 mr-1.5" /> Agregar
          </Button>
          <Button variant="outline" onClick={() => navigate(`/producto/${product.slug}`)} data-testid="product-card-view-details-link">Ver</Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
