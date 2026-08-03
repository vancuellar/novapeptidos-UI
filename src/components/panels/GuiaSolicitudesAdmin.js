import React, { useCallback, useEffect, useState } from 'react';
import { Loader2, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api, { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import useRefrescoAlVolver from '@/hooks/useRefrescoAlVolver';

/* SOLICITUDES DE GUÍA (Christián, 2026-08-03): el distribuidor pidió que la
   casa compre la guía de un pedido YA PAGADO y sin número de rastreo. Aquí el
   admin las ve y decide: APROBAR compra la guía con dinero de la casa (por eso
   el confirm), RECHAZAR la regresa con motivo. Mismo idioma visual que las
   solicitudes de pago de comisiones (ComisionesAdmin).

   ⛔ Los candados viven en el SERVIDOR: si un freno detiene la compra contesta
   502 con el motivo y la solicitud SIGUE pendiente — aquí sólo se pinta el
   detalle tal cual. Sin pendientes, esta franja no existe. */

export default function GuiaSolicitudesAdmin({ onCambio }) {
  const { t, language } = useLanguage();
  const [datos, setDatos] = useState(null);
  // La solicitud que está en vuelo (aprobando o rechazando): bloquea SUS botones.
  const [ocupado, setOcupado] = useState(null);

  const cargar = useCallback(() => {
    api.get('/admin/guia-solicitudes').then((r) => setDatos(r.data)).catch(() => {});
  }, []);
  useEffect(cargar, [cargar]);
  // Al volver a la pestaña se refresca sola (Christián, 2026-08-02).
  useRefrescoAlVolver(cargar);

  const fecha = (iso) => (iso ? new Date(iso).toLocaleDateString(language, {
    day: '2-digit', month: 'short', year: 'numeric',
  }) : '—');

  const aprobar = async (s) => {
    // Confirm obligatorio: aprobar COMPRA la guía, es dinero de verdad.
    if (!window.confirm(t('guia.solicitud.confirmar', { order: s.order_number }))) return;
    setOcupado(s.id);
    try {
      const { data } = await api.post('/admin/guia-solicitudes/aprobar', { solicitud_id: s.id });
      toast.success(t(data.ya_tenia_guia ? 'guia.solicitud.yaTenia' : 'guia.solicitud.aprobada',
        { tracking: data.tracking_number || '—' }));
      cargar();
      // El pedido ya trae guía: que la tabla de Pedidos de abajo también lo vea.
      onCambio?.();
    } catch (e) {
      // 502 = un freno detuvo la compra; la solicitud se queda pendiente.
      toast.error(e?.response?.data?.detail || t('guia.solicitud.error'));
    } finally {
      setOcupado(null);
    }
  };

  const rechazar = async (s) => {
    const motivo = window.prompt(t('guia.solicitud.motivoRechazo'));
    // Cancelar el prompt es arrepentirse, no rechazar sin motivo.
    if (motivo === null) return;
    setOcupado(s.id);
    try {
      await api.post('/admin/guia-solicitudes/rechazar', { solicitud_id: s.id, motivo: motivo.trim() });
      toast.success(t('guia.solicitud.rechazada'));
      cargar();
    } catch (e) {
      toast.error(e?.response?.data?.detail || t('guia.solicitud.error'));
    } finally {
      setOcupado(null);
    }
  };

  // Sólo interesan las PENDIENTES: sin ellas la franja no se pinta. El
  // historial (aprobadas/rechazadas) vive en la ficha de cada pedido.
  const pendientes = (datos?.solicitudes || []).filter((s) => s.status === 'solicitada');
  if (pendientes.length === 0) return null;

  return (
    <Card className="p-4 mb-4 space-y-3" data-testid="admin-guia-solicitudes">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
          <Truck className="h-4 w-4" />{t('guia.solicitud.tituloAdmin')}
        </h3>
        <Badge className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]"
          data-testid="admin-guia-pendientes">
          {t('guia.solicitud.pendientes', { n: pendientes.length })}
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <Table data-testid="admin-guia-solicitudes-tabla">
          <TableHeader>
            <TableRow>
              <TableHead>{t('admin.table.order')}</TableHead>
              <TableHead>{t('admin.dist.name')}</TableHead>
              <TableHead>{t('admin.table.date')}</TableHead>
              <TableHead>{t('common.total')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendientes.map((s) => (
              <TableRow key={s.id} data-testid="admin-guia-solicitud-fila">
                <TableCell>
                  <span className="font-mono-tech text-xs">{s.order_number}</span>
                  {/* Sin pagar no debería llegar aquí (el backend lo frena), pero
                      si llega, que se VEA antes de gastar en la guía. */}
                  {!s.order_paid && (
                    <Badge className="ml-2 bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))] text-[10px]">
                      {t('admin.pay.unpaid')}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm">{s.distributor_name || '—'}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{fecha(s.requested_at)}</TableCell>
                <TableCell className="tabular-nums">{formatMXN(s.order_total)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-1.5 justify-end">
                    <Button variant="outline" size="sm" className="h-8"
                      disabled={ocupado === s.id} onClick={() => aprobar(s)}
                      data-testid="admin-guia-aprobar">
                      {ocupado === s.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : t('guia.solicitud.aprobar')}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-destructive"
                      disabled={ocupado === s.id} onClick={() => rechazar(s)}
                      data-testid="admin-guia-rechazar">
                      {t('guia.solicitud.rechazar')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
