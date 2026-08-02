import React, { useCallback, useEffect, useState } from 'react';
import {
  FileText, Loader2, Copy, Share2, Mail, ExternalLink, RefreshCw, X,
  Trash2, Archive, ArchiveRestore,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api, { formatMXN } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import useRefrescoAlVolver from '@/hooks/useRefrescoAlVolver';

/* MIS COTIZACIONES — la lista que se guarda en el panel del distribuidor.

   Encargo de Christián (2026-08-01), textual: «necesito que las cotizaciones
   generadas se guarden en el panel del distribuidor por si necesita reenviarlas, que
   no las tenga que volver a generar de cero. Y, una vez pagadas dejan de ser
   cotizaciones y se transforman en ventas.»

   ⛔ ESTA PANTALLA NO CALCULA NI UN PESO ni decide ningún estado: todo viene
   resuelto de `/distributor/quotes`. El estado se DEDUCE en el servidor mirando si
   hay un pedido con ese token y si ese pedido está cobrado, así que no hay dos
   verdades que se puedan desincronizar.

   ⛔ Y AQUÍ NO HAY NINGÚN CÓDIGO DE OBSEQUIO QUE ENSEÑAR: el servidor no lo manda,
   ni siquiera a la propia distribuidora. Si lo viera, se lo podría pasar al cliente.

   El enlace que se copia y se reenvía ya trae su fragmento (`#d=…`), que es lo que
   hace que el checkout del cliente llegue con sus datos puestos. */

const COLORES = {
  cotizacion: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  pedido: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  venta: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
};

const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function MisCotizaciones() {
  const { t, language } = useLanguage();
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('all');
  // A quién se le reenvía por correo. Se abre por renglón: {token, email, enviando}.
  const [correo, setCorreo] = useState(null);
  // LA SELECCIÓN (Christián, 2026-08-01): tokens palomeados para archivar o
  // borrar de un jalón. Vive como arreglo — son a lo más 200 renglones.
  const [seleccion, setSeleccion] = useState([]);
  const [operando, setOperando] = useState(false);
  const enArchivadas = filtro === 'archivadas';

  const cargar = useCallback(() => {
    setCargando(true);
    setSeleccion([]);
    api.get('/distributor/quotes', { params: enArchivadas ? { archivadas: 1 } : {} })
      .then((r) => setDatos(r.data))
      .catch(() => setDatos(null))
      .finally(() => setCargando(false));
  }, [enArchivadas]);
  useEffect(cargar, [cargar]);
  // Al volver a la pestaña, la lista se refresca sola (Christián, 2026-08-02).
  useRefrescoAlVolver(cargar);

  // Archivar / borrar / desarchivar lo seleccionado. La regla del borrado vive en
  // el servidor: una cotización que ya es venta NO se borra — se archiva y aquí
  // sólo se avisa (`protegidas`).
  const lote = async (accion, tokens) => {
    if (!tokens.length || operando) return;
    if (accion === 'borrar'
      && !window.confirm(t('cotizaciones.borrarConfirm', { count: tokens.length }))) return;
    setOperando(true);
    try {
      const { data } = await api.post('/distributor/quotes/lote', { tokens, accion });
      if (data.protegidas > 0) toast.info(t('cotizaciones.protegidas', { count: data.protegidas }));
      if (data.borradas > 0) toast.success(t('cotizaciones.borradas', { count: data.borradas }));
      if (data.archivadas > 0) toast.success(t('cotizaciones.archivadas', { count: data.archivadas }));
      if (data.desarchivadas > 0) toast.success(t('cotizaciones.desarchivadas', { count: data.desarchivadas }));
      cargar();
    } catch {
      toast.error(t('cotizador.correoError'));
    } finally {
      setOperando(false);
    }
  };

  const alternar = (token) => setSeleccion((s) => (
    s.includes(token) ? s.filter((x) => x !== token) : [...s, token]));

  const fecha = (iso) => (iso ? new Date(iso).toLocaleDateString(language, {
    day: '2-digit', month: 'short', year: 'numeric',
  }) : '—');

  const copiar = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('cotizador.carritoCopiado'));
    } catch { /* sin portapapeles (http, permisos): el enlace se ve y se puede marcar */ }
  };

  // Mismo criterio que el cotizador: wa.me SIN destinatario abre la lista de
  // contactos y ella elige a quién. El texto dice lo mismo que la hoja.
  const porWhatsApp = (q) => {
    const texto = [
      `*EXYGEN LABS* — ${t('cotizador.docTitulo')} ${q.folio || ''}`.trim(),
      q.full_name ? `${t('cotizador.docPara')} ${q.full_name}` : '',
      '',
      `*${t('cotizador.total')}: ${formatMXN(q.total)}*`,
      '',
      `${t('cotizador.waVerCotizacion')} ${q.url}`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
  };

  const enviarCorreo = async () => {
    const destino = (correo?.email || '').trim();
    if (!CORREO_RE.test(destino)) { toast.error(t('cotizador.correoInvalido')); return; }
    setCorreo((c) => ({ ...c, enviando: true }));
    try {
      await api.post(`/distributor/quotes/${encodeURIComponent(correo.token)}/email`,
        { email: destino, language });
      toast.success(t('cotizador.correoEnviado', { email: destino }));
      setCorreo(null);
    } catch (e) {
      const motivo = e?.response?.data?.detail?.error;
      toast.error(motivo === 'correo_apagado' ? t('cotizador.correoApagado')
        : e?.response?.status === 429 ? t('cotizador.correoDemasiados')
          : t('cotizador.correoError'));
      setCorreo((c) => (c ? { ...c, enviando: false } : c));
    }
  };

  if (cargando) {
    return (
      <div className="py-16 flex justify-center" data-testid="cotizaciones-cargando">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const todas = datos?.quotes || [];
  const filas = (filtro === 'all' || enArchivadas) ? todas : todas.filter((q) => q.estado === filtro);
  const todasSel = filas.length > 0 && filas.every((q) => seleccion.includes(q.token));

  return (
    <div className="space-y-4" data-testid="mis-cotizaciones">
      {/* El resumen de arriba: cuántas siguen siendo papel y cuántas ya se cobraron. */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={filtro} onValueChange={setFiltro}>
          <SelectTrigger className="w-52 h-9" data-testid="cotizaciones-filtro"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('cotizaciones.filtro.todas')}</SelectItem>
            <SelectItem value="cotizacion">{t('cotizaciones.estado.cotizacion')}</SelectItem>
            <SelectItem value="pedido">{t('cotizaciones.estado.pedido')}</SelectItem>
            <SelectItem value="venta">{t('cotizaciones.estado.venta')}</SelectItem>
            <SelectItem value="archivadas">{t('cotizaciones.filtro.archivadas')}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 gap-2" onClick={cargar}
          data-testid="cotizaciones-recargar">
          <RefreshCw className="h-3.5 w-3.5" />{t('cotizaciones.actualizar')}
        </Button>
        {/* LOS BOTONES DEL LOTE (Christián, 2026-08-01): aparecen al palomear.
            En el cajón de archivadas, «archivar» se vuelve «desarchivar». */}
        {seleccion.length > 0 && (
          <div className="flex items-center gap-1.5" data-testid="cotizaciones-lote">
            {enArchivadas ? (
              <Button variant="outline" size="sm" className="h-9 gap-1.5" disabled={operando}
                onClick={() => lote('desarchivar', seleccion)} data-testid="cotizaciones-desarchivar">
                <ArchiveRestore className="h-3.5 w-3.5" />{t('cotizaciones.desarchivar')}
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="h-9 gap-1.5" disabled={operando}
                onClick={() => lote('archivar', seleccion)} data-testid="cotizaciones-archivar">
                <Archive className="h-3.5 w-3.5" />{t('cotizaciones.archivar')}
              </Button>
            )}
            <Button variant="outline" size="sm" disabled={operando}
              className="h-9 gap-1.5 text-destructive hover:bg-destructive hover:text-white hover:border-destructive"
              onClick={() => lote('borrar', seleccion)} data-testid="cotizaciones-borrar">
              <Trash2 className="h-3.5 w-3.5" />{t('cotizaciones.borrar')} ({seleccion.length})
            </Button>
          </div>
        )}
        <div className="ml-auto text-sm" data-testid="cotizaciones-resumen">
          <span className="text-muted-foreground">{t('cotizaciones.vendido')} </span>
          <span className="font-heading font-bold text-[hsl(var(--primary))]">
            {formatMXN(datos?.vendido || 0)}
          </span>
          <span className="text-muted-foreground">
            {' '}· {t('cotizaciones.resumen', {
              cotizaciones: datos?.cotizaciones || 0, ventas: datos?.ventas || 0,
            })}
          </span>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <Table data-testid="cotizaciones-tabla">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox checked={todasSel} disabled={filas.length === 0}
                  onCheckedChange={(v) => setSeleccion(v ? filas.map((q) => q.token) : [])}
                  aria-label={t('cotizaciones.seleccionarTodas')}
                  data-testid="cotizaciones-sel-todas" />
              </TableHead>
              <TableHead>{t('cotizaciones.col.folio')}</TableHead>
              <TableHead>{t('cotizaciones.col.cliente')}</TableHead>
              <TableHead>{t('cotizaciones.col.fecha')}</TableHead>
              <TableHead>{t('common.total')}</TableHead>
              <TableHead>{t('admin.table.status')}</TableHead>
              <TableHead>{t('cotizaciones.col.acciones')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-10"
                  data-testid="cotizaciones-vacio">
                  {t('cotizaciones.vacio')}
                </TableCell>
              </TableRow>
            ) : filas.map((q) => (
              <TableRow key={q.token} data-testid="cotizaciones-fila">
                <TableCell>
                  <Checkbox checked={seleccion.includes(q.token)}
                    onCheckedChange={() => alternar(q.token)}
                    aria-label={q.folio || q.token}
                    data-testid="cotizaciones-sel" />
                </TableCell>
                <TableCell className="font-mono-tech text-xs">{q.folio || '—'}</TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{q.full_name || '—'}</div>
                  {q.email && <div className="text-xs text-muted-foreground">{q.email}</div>}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{fecha(q.created_at)}</TableCell>
                <TableCell className="tabular-nums">
                  {/* Cuando ya es venta manda el total del PEDIDO: es el dinero que
                      de verdad entró, no el del papel. */}
                  {formatMXN(q.estado === 'venta' ? q.order_total : q.total)}
                </TableCell>
                <TableCell>
                  <Badge className={COLORES[q.estado]} data-testid={`cotizacion-estado-${q.estado}`}>
                    {t(`cotizaciones.estado.${q.estado}`)}
                  </Badge>
                  {q.order_number && (
                    <div className="text-[11px] text-muted-foreground font-mono-tech mt-1">
                      {q.order_number}
                    </div>
                  )}
                  {q.vencida && q.estado === 'cotizacion' && (
                    <div className="text-[11px] text-muted-foreground mt-1">
                      {t('cotizaciones.vencida')}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Button variant="outline" size="sm" className="h-8 gap-1.5"
                      onClick={() => porWhatsApp(q)} data-testid="cotizacion-whatsapp">
                      <Share2 className="h-3.5 w-3.5" />{t('cotizaciones.whatsapp')}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1.5"
                      onClick={() => copiar(q.url)} data-testid="cotizacion-copiar">
                      <Copy className="h-3.5 w-3.5" />{t('cotizador.carritoCopiar')}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1.5"
                      onClick={() => setCorreo({ token: q.token, email: q.email || '', enviando: false })}
                      data-testid="cotizacion-correo">
                      <Mail className="h-3.5 w-3.5" />{t('cotizaciones.correo')}
                    </Button>
                    <a href={q.url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[hsl(var(--primary))] hover:underline px-1"
                      data-testid="cotizacion-abrir">
                      <ExternalLink className="h-3.5 w-3.5" />{t('cotizaciones.abrir')}
                    </a>
                    {/* El bote por renglón: borra ESTA. La regla de la venta que
                        no se borra vive en el servidor; aquí sólo se confirma. */}
                    <Button variant="ghost" size="sm" disabled={operando}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => lote('borrar', [q.token])}
                      aria-label={t('cotizaciones.borrar')}
                      data-testid="cotizacion-borrar-una">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  {correo?.token === q.token && (
                    <div className="mt-2 flex flex-col sm:flex-row gap-2" data-testid="cotizacion-correo-form">
                      <Input type="email" inputMode="email" value={correo.email}
                        onChange={(e) => setCorreo((c) => ({ ...c, email: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !correo.enviando) enviarCorreo(); }}
                        placeholder="cliente@correo.com" className="sm:w-64 h-8 text-xs" />
                      <Button size="sm" className="h-8 gap-1.5" onClick={enviarCorreo}
                        disabled={correo.enviando} data-testid="cotizacion-correo-enviar">
                        {correo.enviando ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : <Mail className="h-3.5 w-3.5" />}
                        {t('cotizador.enviar')}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0"
                        onClick={() => setCorreo(null)} aria-label={t('common.close')}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <p className="text-xs text-muted-foreground flex items-start gap-1.5">
        <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        {t('cotizaciones.nota')}
      </p>
    </div>
  );
}
