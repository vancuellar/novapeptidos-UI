import React from 'react';
import { Coins } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

// "Mis Puntos": saldo y movimientos del programa de lealtad.
//
// Antes esto vivía DENTRO de una ventanita que se abría desde una tarjeta de
// Mi cuenta, y el distribuidor no lo veía por ningún lado. Ahora es una pestaña
// del menú —una sola— y los dos tableros la muestran igual (2026-07-30).
const PointsPanel = ({ loyalty }) => {
  const { t } = useLanguage();
  const balance = loyalty?.balance || 0;
  const ledger = loyalty?.ledger || [];

  return (
    <div className="space-y-4" data-testid="points-panel">
      <Card className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <Coins className="h-4 w-4" /> {t('loyalty.title')}
        </div>
        <div className="font-heading text-3xl font-bold mt-1" data-testid="points-balance">
          {balance} <span className="text-sm font-normal text-muted-foreground">{t('loyalty.unit')}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-2xl">{t('loyalty.explain')}</p>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-semibold mb-4">{t('loyalty.historyTitle')}</h3>
        {ledger.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('loyalty.empty')}</p>
        ) : (
          <div className="space-y-2">
            {ledger.map((e) => (
              <div key={e.id} className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                <div>
                  <div>{t(`loyalty.type.${e.type}`)}</div>
                  <div className="text-xs text-muted-foreground">{e.order_number} · {(e.created_at || '').slice(0, 10)}</div>
                </div>
                <div className={`font-medium ${e.points > 0 ? 'text-[hsl(var(--success))]' : 'text-muted-foreground'}`}>
                  {e.points > 0 ? '+' : ''}{e.points}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default PointsPanel;
