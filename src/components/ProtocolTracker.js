import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarClock, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

// Cada cuánto se aplica. El backend solo necesita dosis por semana.
const FREQUENCIES = [
  { value: 7, key: 'daily' },
  { value: 5, key: 'fiveWeek' },
  { value: 3, key: 'threeWeek' },
  { value: 2, key: 'twoWeek' },
  { value: 1, key: 'weekly' },
  { value: 0.5, key: 'biweekly' },
];

/**
 * Seguimiento de consumo: con la dosis y la frecuencia calculamos cuándo se
 * acaba el vial y avisamos para recomprar. El cálculo lo hace el servidor.
 */
const ProtocolTracker = ({ protocols, onChange }) => {
  const { language, t } = useLanguage();
  const [busy, setBusy] = useState(false);

  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString(language, { day: 'numeric', month: 'short', year: 'numeric' }) : '—');

  const setFrequency = async (p, doses_per_week) => {
    setBusy(true);
    try {
      await api.put(`/me/protocols/${p.id}`, { doses_per_week });
      await onChange();
    } catch { toast.error(t('track.error')); } finally { setBusy(false); }
  };

  const setVials = async (p, vials) => {
    if (!(vials >= 1)) return;
    setBusy(true);
    try {
      await api.put(`/me/protocols/${p.id}`, { vials });
      await onChange();
    } catch { toast.error(t('track.error')); } finally { setBusy(false); }
  };

  const remove = async (p) => {
    setBusy(true);
    try {
      await api.delete(`/me/protocols/${p.id}`);
      toast.success(t('track.removed'));
      await onChange();
    } catch { toast.error(t('track.error')); } finally { setBusy(false); }
  };

  if (protocols.length === 0) {
    return (
      <Card className="p-10 text-center text-sm text-muted-foreground" data-testid="track-empty">
        <CalendarClock className="h-8 w-8 mx-auto mb-3 opacity-40" />
        {t('track.empty')}
      </Card>
    );
  }

  return (
    <div className="space-y-3" data-testid="track-list">
      {protocols.map((p) => (
        <Card key={p.id} className={`p-5 ${p.needs_repurchase ? 'border-[hsl(var(--warning-border))]' : ''}`} data-testid="track-row">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div className="font-heading font-semibold">{p.product_name}</div>
              <div className="text-xs text-muted-foreground">
                {p.vial_mg} mg · {p.dose} {p.dose_unit} {t('track.perDose')}
                {p.water_ml ? ` · ${p.water_ml} mL ${t('calc.water').toLowerCase()}` : ''}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {p.needs_repurchase && (
                <Badge className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))] text-[10px]">
                  <AlertTriangle className="h-3 w-3 mr-1" /> {t('track.reorderSoon')}
                </Badge>
              )}
              <Button variant="ghost" size="icon" onClick={() => remove(p)} disabled={busy} data-testid="track-remove">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Barra de material restante */}
          {p.pct_left != null && (
            <>
              <div className="h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden mb-2">
                <div className="h-full bg-[hsl(var(--primary))] transition-all" style={{ width: `${p.pct_left}%` }} />
              </div>
              <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground mb-4">
                <span data-testid="track-doses-left">{t('track.dosesLeft', { left: p.doses_left, total: p.total_doses })}</span>
                <span data-testid="track-runs-out">{t('track.runsOut', { days: p.days_left, date: fmtDate(p.runs_out_at) })}</span>
              </div>
            </>
          )}

          <div className="grid sm:grid-cols-3 gap-3 items-end">
            <div>
              <Label className="text-xs mb-1.5 block">{t('track.frequency')}</Label>
              <Select value={String(p.doses_per_week)} onValueChange={(v) => setFrequency(p, Number(v))}>
                <SelectTrigger className="h-9" data-testid="track-frequency"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FREQUENCIES.map((f) => <SelectItem key={f.key} value={String(f.value)}>{t(`track.freq.${f.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1.5 block">{t('track.vials')}</Label>
              <Input type="number" min="1" className="h-9" defaultValue={p.vials} data-testid="track-vials"
                onBlur={(e) => Number(e.target.value) !== p.vials && setVials(p, Number(e.target.value))} />
            </div>
            {p.needs_repurchase && (
              <Link to={p.product_slug ? `/producto/${p.product_slug}` : '/catalogo'}>
                <Button variant="outline" className="w-full h-9" data-testid="track-reorder">
                  <RefreshCw className="h-4 w-4 mr-1.5" /> {t('track.reorder')}
                </Button>
              </Link>
            )}
          </div>
        </Card>
      ))}
      <p className="text-[11px] text-muted-foreground leading-relaxed">{t('track.disclaimer')}</p>
    </div>
  );
};

export default ProtocolTracker;
