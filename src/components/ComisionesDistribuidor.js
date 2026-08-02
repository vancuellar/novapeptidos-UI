import React, { useCallback, useEffect, useState } from 'react';
import { Loader2, HandCoins, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api, { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import useRefrescoAlVolver from '@/hooks/useRefrescoAlVolver';

/* LA BOLSA DE COMISIONES del distribuidor (Christián, 2026-08-01): ganado,
   pagado, por pagar, y el botón para SOLICITAR el pago.

   ⛔ ESTA PANTALLA NO CALCULA NI UN PESO: los cuatro números vienen juntos de
   `/distributor/comisiones` (la misma suma que el resto del panel — sólo ventas
   COBRADAS). Los candados viven en el servidor: no se puede pedir de más ni
   pedir dos veces; aquí sólo se pinta el motivo cuando rebota. */

const ESTADO_COLORES = {
  solicitado: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  pagado: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
  rechazado: 'bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))] border border-[hsl(var(--destructive))]/30',
};

export default function ComisionesDistribuidor() {
  const { t, language } = useLanguage();
  const [datos, setDatos] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const cargar = useCallback(() => {
    api.get('/distributor/comisiones').then((r) => setDatos(r.data)).catch(() => {});
  }, []);
  useEffect(cargar, [cargar]);
  // Al volver a la pestaña se refresca sola (Christián, 2026-08-02).
  useRefrescoAlVolver(cargar);

  const fecha = (iso) => (iso ? new Date(iso).toLocaleDateString(language, {
    day: '2-digit', month: 'short', year: 'numeric',
  }) : '—');

  const solicitar = async () => {
    setEnviando(true);
    try {
      await api.post('/distributor/comisiones/solicitar', {});
      toast.success(t('comisiones.solicitada'));
      cargar();
    } catch (e) {
      toast.error(e?.response?.data?.detail || t('comisiones.error'));
    } finally {
      setEnviando(false);
    }
  };

  if (!datos) return null;

  const pendiente = datos.solicitud_pendiente;
  const historial = (datos.historial || []).slice(0, 8);

  return (
    <Card className="p-4 space-y-3" data-testid="dist-comisiones">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <h3 className="font-heading font-semibold flex items-center gap-2">
          <HandCoins className="h-4 w-4" />{t('comisiones.titulo')}
        </h3>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm ml-auto">
          <span>
            <span className="text-muted-foreground">{t('comisiones.ganado')} </span>
            <span className="font-semibold tabular-nums">{formatMXN(datos.ganado)}</span>
          </span>
          <span>
            <span className="text-muted-foreground">{t('comisiones.pagado')} </span>
            <span className="font-semibold tabular-nums">{formatMXN(datos.pagado)}</span>
          </span>
          <span data-testid="dist-comisiones-por-pagar">
            <span className="text-muted-foreground">{t('comisiones.porPagar')} </span>
            <span className="font-heading font-bold text-[hsl(var(--primary))] tabular-nums">
              {formatMXN(datos.por_pagar)}
            </span>
          </span>
        </div>
      </div>

      {pendiente ? (
        <p className="text-sm text-muted-foreground flex items-center gap-2" data-testid="dist-comisiones-pendiente">
          <Clock className="h-4 w-4 shrink-0" />
          {t('comisiones.enCamino', { monto: formatMXN(pendiente.amount) })}
        </p>
      ) : datos.por_pagar > 0 && (
        <Button size="sm" className="gap-2" onClick={solicitar} disabled={enviando}
          data-testid="dist-comisiones-solicitar">
          {enviando ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <HandCoins className="h-3.5 w-3.5" />}
          {t('comisiones.solicitar', { monto: formatMXN(datos.por_pagar) })}
        </Button>
      )}

      {historial.length > 0 && (
        <div className="space-y-1.5" data-testid="dist-comisiones-historial">
          <p className="text-xs text-muted-foreground font-medium">{t('comisiones.historial')}</p>
          {historial.map((p) => (
            <div key={p.id} className="flex items-center gap-2 text-xs">
              <Badge className={`${ESTADO_COLORES[p.status] || ''} text-[10px]`}>
                {t(`comisiones.estado.${p.status}`)}
              </Badge>
              <span className="tabular-nums font-medium">{formatMXN(p.amount)}</span>
              <span className="text-muted-foreground">{fecha(p.resolved_at || p.requested_at)}</span>
              {p.reference && <span className="text-muted-foreground">· {p.reference}</span>}
              {p.motivo && <span className="text-muted-foreground">· {p.motivo}</span>}
              {p.status === 'pagado' && <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--success))]" />}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
