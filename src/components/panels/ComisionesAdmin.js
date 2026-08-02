import React, { useCallback, useEffect, useState } from 'react';
import { HandCoins, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api, { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import useRefrescoAlVolver from '@/hooks/useRefrescoAlVolver';

/* COMISIONES — qué se le debe a cada quien y qué ya se pagó (Christián,
   2026-08-01). El servidor manda los números resueltos (`/admin/comisiones`,
   misma suma que el panel del distribuidor); aquí sólo se registra el pago con
   su referencia o se rechaza una solicitud con motivo. ⛔ Registrar NO mueve
   dinero: deja el recibo de un pago que ya se hizo por fuera (SPEI, efectivo). */

export default function ComisionesAdmin() {
  const { t } = useLanguage();
  const [datos, setDatos] = useState(null);
  // El formulario abierto por renglón: {id, amount, reference, enviando}.
  const [pago, setPago] = useState(null);

  const cargar = useCallback(() => {
    api.get('/admin/comisiones').then((r) => setDatos(r.data)).catch(() => {});
  }, []);
  useEffect(cargar, [cargar]);
  // Al volver a la pestaña se refresca sola (Christián, 2026-08-02).
  useRefrescoAlVolver(cargar);

  const registrar = async () => {
    const monto = Number(pago?.amount);
    if (!Number.isFinite(monto) || monto <= 0) { toast.error(t('comisiones.montoInvalido')); return; }
    setPago((p) => ({ ...p, enviando: true }));
    try {
      await api.post('/admin/comisiones/pagar', {
        distributor_id: pago.id, amount: monto, reference: (pago.reference || '').trim(),
      });
      toast.success(t('comisiones.pagoRegistrado'));
      setPago(null);
      cargar();
    } catch (e) {
      toast.error(e?.response?.data?.detail || t('comisiones.error'));
      setPago((p) => (p ? { ...p, enviando: false } : p));
    }
  };

  const rechazar = async (fila) => {
    const motivo = window.prompt(t('comisiones.motivoRechazo')) || '';
    try {
      await api.post('/admin/comisiones/rechazar', {
        payout_id: fila.solicitud_pendiente.id, motivo: motivo.trim(),
      });
      toast.success(t('comisiones.rechazada'));
      cargar();
    } catch (e) {
      toast.error(e?.response?.data?.detail || t('comisiones.error'));
    }
  };

  if (!datos) return null;
  // Sólo interesan los que tienen movimiento: deber $0 sin solicitud no es noticia.
  const filas = (datos.distribuidores || []).filter(
    (d) => d.por_pagar > 0 || d.solicitud_pendiente || d.pagado > 0);
  if (filas.length === 0) return null;

  return (
    <Card className="p-4 mb-4 space-y-3" data-testid="admin-comisiones">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
          <HandCoins className="h-4 w-4" />{t('comisiones.tituloAdmin')}
        </h3>
        <span className="ml-auto text-sm">
          <span className="text-muted-foreground">{t('comisiones.porPagarTotal')} </span>
          <span className="font-heading font-bold text-[hsl(var(--primary))] tabular-nums"
            data-testid="admin-comisiones-total">
            {formatMXN(datos.por_pagar_total)}
          </span>
        </span>
      </div>
      <div className="overflow-x-auto">
        <Table data-testid="admin-comisiones-tabla">
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.dist.name')}</TableHead>
              <TableHead>{t('comisiones.ganado')}</TableHead>
              <TableHead>{t('comisiones.pagado')}</TableHead>
              <TableHead>{t('comisiones.porPagar')}</TableHead>
              <TableHead>{t('comisiones.solicitud')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filas.map((d) => (
              <TableRow key={d.id} data-testid="admin-comisiones-fila">
                <TableCell>
                  <div className="text-sm font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground font-mono-tech">{d.distributor_code}</div>
                </TableCell>
                <TableCell className="tabular-nums">{formatMXN(d.ganado)}</TableCell>
                <TableCell className="tabular-nums">{formatMXN(d.pagado)}</TableCell>
                <TableCell className="tabular-nums font-medium text-[hsl(var(--primary))]">
                  {formatMXN(d.por_pagar)}
                </TableCell>
                <TableCell>
                  {d.solicitud_pendiente ? (
                    <Badge className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]"
                      data-testid="admin-comisiones-solicitud">
                      {formatMXN(d.solicitud_pendiente.amount)}
                    </Badge>
                  ) : <span className="text-xs text-muted-foreground">—</span>}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {d.por_pagar > 0 && (
                      <Button variant="outline" size="sm" className="h-8"
                        onClick={() => setPago({
                          id: d.id,
                          amount: d.solicitud_pendiente?.amount || d.por_pagar,
                          reference: '', enviando: false,
                        })}
                        data-testid="admin-comisiones-pagar">
                        {t('comisiones.registrarPago')}
                      </Button>
                    )}
                    {d.solicitud_pendiente && (
                      <Button variant="ghost" size="sm" className="h-8 text-destructive"
                        onClick={() => rechazar(d)} data-testid="admin-comisiones-rechazar">
                        {t('comisiones.rechazar')}
                      </Button>
                    )}
                  </div>
                  {pago?.id === d.id && (
                    <div className="mt-2 flex flex-col sm:flex-row gap-2" data-testid="admin-comisiones-form">
                      <Input type="number" inputMode="decimal" min="1" value={pago.amount}
                        onChange={(e) => setPago((p) => ({ ...p, amount: e.target.value }))}
                        className="sm:w-32 h-8 text-xs" data-testid="admin-comisiones-monto" />
                      <Input value={pago.reference} placeholder={t('comisiones.referencia')}
                        onChange={(e) => setPago((p) => ({ ...p, reference: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !pago.enviando) registrar(); }}
                        className="sm:w-48 h-8 text-xs" data-testid="admin-comisiones-referencia" />
                      <Button size="sm" className="h-8" onClick={registrar} disabled={pago.enviando}
                        data-testid="admin-comisiones-confirmar">
                        {pago.enviando ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : t('comisiones.confirmar')}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0"
                        onClick={() => setPago(null)} aria-label={t('common.close')}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
