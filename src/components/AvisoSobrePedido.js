import React from 'react';
import { Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * EL AVISO DE ENVÍO PARTIDO — el cliente lo ve ANTES de pagar.
 *
 * Ninguna venta se bloquea por inventario (Christián, 2026-07-30): lo que hay sale ya y
 * el resto se manda pedir. Pero eso solo es honesto si se dice a tiempo. Una entrega que
 * llega partida sin haberlo anunciado no es un detalle logístico: es una promesa rota, y
 * el cliente se entera una semana después.
 *
 * Se usa en el carrito y en el checkout con `lineas` calculadas por `desgloseSobrePedido`,
 * y en la confirmación con las que devuelve el pedido (`backorder_items` del servidor).
 */
const AvisoSobrePedido = ({ lineas, testid = 'aviso-sobre-pedido' }) => {
  const { t } = useLanguage();
  if (!lineas?.length) return null;
  return (
    <div
      className="rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] p-4 text-[hsl(var(--warning-foreground))]"
      data-testid={testid}
    >
      <div className="flex items-start gap-2.5">
        <Truck className="h-4 w-4 mt-0.5 shrink-0" />
        <div className="min-w-0">
          <div className="text-sm font-semibold">{t('backorder.title')}</div>
          <p className="mt-1 text-xs leading-relaxed opacity-90">{t('backorder.intro')}</p>
          <ul className="mt-2 space-y-1 text-xs">
            {lineas.map((l) => (
              <li key={l.product_id} className="leading-relaxed">
                {(l.enMano ?? l.en_mano) > 0
                  ? t('backorder.line', {
                      name: l.name,
                      now: l.enMano ?? l.en_mano,
                      asked: l.pedidas,
                      later: l.porSurtir ?? l.por_surtir,
                    })
                  : t('backorder.lineAll', {
                      name: l.name,
                      later: l.porSurtir ?? l.por_surtir,
                    })}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] leading-relaxed opacity-80">
            {t('backorder.now')}
            <br />
            {t('backorder.later')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvisoSobrePedido;
