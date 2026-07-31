// ARCHIVO DE REPORTES SEMANALES DE PUBLICIDAD
//
// Orden de Christián (2026-07-31): "este video de publicidad debe estar en mi
// página de Marketing e irse archivando por fecha, semana con semana".
//
// Arriba, el video de la semana. Abajo, la evolución semana a semana y la lista
// de todas las semanas archivadas, de la más nueva a la más vieja.
//
// LO QUE IMPORTA NO ES EL VIDEO. Nadie va a ver cincuenta y dos videos de cinco
// minutos. Lo que hace útil el archivo es que cada semana guarda sus CIFRAS
// —gasto, clics, conversaciones de WhatsApp, compras, costo por conversación— y
// con eso se puede ver si la cosa mejora o empeora sin abrir un solo video. Por
// eso la gráfica y la tabla de evolución van antes que la lista de archivos.
//
// El MP4 no está en git ni en ninguna carpeta pública: vive en disco del
// servidor y sale por una ruta que exige sesión de admin o de difusión. La
// etiqueta <video> no manda headers, así que el token va en la URL — el candado
// real es el rol, que el servidor revisa en cada petición.
import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import GraficaInteractiva from '@/components/charts/GraficaInteractiva';
import { PlayCircle, Download, FileText, Archive, HardDrive, AlertTriangle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api, { API } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

const mmss = (s) => {
  const n = Math.round(Number(s) || 0);
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
};
const mb = (b) => `${((Number(b) || 0) / 1e6).toFixed(1)} MB`;
const gb = (b) => (Number(b) || 0) >= 1e9 ? `${((Number(b) || 0) / 1e9).toFixed(2)} GB` : mb(b);
// Un dato que falta NO es cero. Cero se lee como "no gastó nada"; la raya es
// "esa semana no se midió". La misma regla que en el resto del panel.
const dato = (v, fmt) => (v === null || v === undefined ? '—' : fmt(v));
const usd = (n) => `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
const num = (n) => Number(n).toLocaleString('es-MX');

const urlVideo = (semana, descargar) =>
  `${API}/admin/marketing/reportes/${semana}/video?token=${encodeURIComponent(localStorage.getItem('np_token') || '')}${descargar ? '&descargar=1' : ''}`;

const ReportesSemanales = () => {
  const { t } = useLanguage();
  const [d, setD] = useState(null);
  const [viendo, setViendo] = useState('');      // qué semana está en el reproductor
  const [texto, setTexto] = useState(null);      // el reporte escrito, si lo abrió

  const cargar = useCallback(() => {
    api.get('/admin/marketing/reportes')
      .then((r) => {
        setD(r.data);
        setViendo((v) => v || r.data.reportes?.[0]?.semana || '');
      })
      .catch(() => toast.error(t('admin.reportes.error')));
  }, [t]);

  useEffect(() => { cargar(); }, [cargar]);

  const abrirTexto = (semana) => {
    if (texto?.semana === semana) { setTexto(null); return; }
    api.get(`/admin/marketing/reportes/${semana}/texto`)
      .then((r) => setTexto(r.data))
      .catch(() => toast.error(t('admin.reportes.error')));
  };

  if (!d) return <Card className="p-6 text-sm text-muted-foreground">{t('admin.reportes.loading')}</Card>;

  const reportes = d.reportes || [];
  if (reportes.length === 0) {
    return (
      <Card className="p-6 mb-6" data-testid="reportes-semanales-vacio">
        <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
          <Archive className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('admin.reportes.title')}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{t('admin.reportes.empty')}</p>
      </Card>
    );
  }

  const actual = reportes.find((r) => r.semana === viendo) || reportes[0];
  const anteriores = reportes.filter((r) => r.semana !== actual.semana);
  // La evolución se lee de izquierda a derecha: la más vieja primero.
  const evolucion = [...reportes].reverse().map((r) => ({ semana: r.semana, ...r.cifras }));
  const porVencer = d.almacen?.por_vencer || [];

  return (
    <div className="space-y-6 mb-8" data-testid="reportes-semanales">
      {/* ------------------------------------------------ el video de la semana */}
      <Card className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-sm flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('admin.reportes.title')}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {actual.titulo || `${actual.desde} → ${actual.hasta}`}
              {actual.duracion_seg > 0 && <> · <Clock className="h-3 w-3 inline -mt-0.5" /> {mmss(actual.duracion_seg)}</>}
              {actual.tamano_bytes > 0 && <> · {mb(actual.tamano_bytes)}</>}
            </p>
          </div>
          <div className="flex gap-2">
            {actual.tiene_texto && (
              <Button size="sm" variant="outline" onClick={() => abrirTexto(actual.semana)} data-testid="reportes-texto">
                <FileText className="h-3.5 w-3.5 mr-1.5" /> {t('admin.reportes.readText')}
              </Button>
            )}
            {actual.tiene_video && (
              <Button size="sm" variant="outline" asChild data-testid="reportes-descargar">
                <a href={urlVideo(actual.semana, true)}>
                  <Download className="h-3.5 w-3.5 mr-1.5" /> {t('admin.reportes.download')}
                </a>
              </Button>
            )}
          </div>
        </div>

        {actual.resumen && <p className="text-sm mb-3">{actual.resumen}</p>}

        {actual.tiene_video ? (
          <video controls preload="metadata" key={actual.semana}
                 className="w-full max-w-3xl aspect-video bg-black rounded-lg"
                 src={urlVideo(actual.semana)} data-testid="reportes-video" />
        ) : (
          <p className="text-xs text-muted-foreground">{t('admin.reportes.noVideo')}</p>
        )}

        {texto?.semana === actual.semana && (
          <pre className="mt-4 max-h-96 overflow-auto rounded-lg bg-[hsl(var(--secondary))] p-3 text-[11px] whitespace-pre-wrap font-mono-tech">
            {texto.markdown}
          </pre>
        )}
      </Card>

      {/* --------------------------------------------- la evolución semana a semana */}
      {evolucion.length > 1 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-1">{t('admin.reportes.trendTitle')}</h4>
          <p className="text-xs text-muted-foreground mb-3">{t('admin.reportes.trendSub')}</p>
          <div className="overflow-x-auto">
            <GraficaInteractiva height={260} minWidth={420}>
              <ComposedChart data={evolucion} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="semana" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="l" dataKey="conversaciones_wa" name={t('admin.reportes.waShort')} fill="hsl(var(--primary))" />
                <Line yAxisId="r" dataKey="gasto_usd" name={t('admin.reportes.spendShort')} stroke="#f59e0b" dot strokeWidth={2} />
                <Line yAxisId="r" dataKey="costo_conversacion_usd" name={t('admin.reportes.cpcShort')} stroke="#dc2626" dot strokeWidth={2} />
              </ComposedChart>
            </GraficaInteractiva>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h4 className="font-semibold text-sm mb-1">{t('admin.reportes.tableTitle')}</h4>
        <p className="text-xs text-muted-foreground mb-3">{t('admin.reportes.tableSub')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left py-2">{t('admin.reportes.colWeek')}</th>
                <th className="text-right">{t('admin.reportes.colSpend')}</th>
                <th className="text-right">{t('admin.reportes.colClicks')}</th>
                <th className="text-right">{t('admin.reportes.colWa')}</th>
                <th className="text-right">{t('admin.reportes.colCostWa')}</th>
                <th className="text-right">{t('admin.reportes.colAttrib')}</th>
                <th className="text-right">{t('admin.reportes.colVisits')}</th>
                <th className="text-right">{t('admin.reportes.colOrders')}</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((r) => (
                <tr key={r.semana} className="border-b border-border/50">
                  <td className="py-2 font-medium whitespace-nowrap">{r.semana}
                    <span className="text-muted-foreground font-normal"> · {r.hasta || ''}</span></td>
                  <td className="text-right">{dato(r.cifras.gasto_usd, usd)}</td>
                  <td className="text-right">{dato(r.cifras.clics, num)}</td>
                  <td className="text-right font-semibold">{dato(r.cifras.conversaciones_wa, num)}</td>
                  <td className="text-right">{dato(r.cifras.costo_conversacion_usd, usd)}</td>
                  <td className="text-right">{dato(r.cifras.compras_atribuidas, num)}</td>
                  <td className="text-right">{dato(r.cifras.visitas, num)}</td>
                  <td className="text-right">{dato(r.cifras.compras_sitio, num)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ------------------------------------------------------ semanas anteriores */}
      {anteriores.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
            <Archive className="h-4 w-4" /> {t('admin.reportes.archiveTitle')}
          </h4>
          <p className="text-xs text-muted-foreground mb-3">{t('admin.reportes.archiveSub')}</p>
          <div className="space-y-2">
            {anteriores.map((r) => (
              <div key={r.semana} className="flex flex-wrap items-start gap-3 rounded-lg border border-border p-2.5">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">
                    {r.semana} <span className="text-muted-foreground font-normal">· {r.desde} → {r.hasta}</span>
                  </div>
                  {r.resumen && <div className="text-xs text-muted-foreground mt-0.5">{r.resumen}</div>}
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {r.duracion_seg > 0 && <>{mmss(r.duracion_seg)} · </>}
                    {r.tiene_video ? mb(r.tamano_bytes) : t('admin.reportes.noVideoShort')}
                  </div>
                </div>
                <div className="flex gap-2">
                  {r.tiene_video && (
                    <Button size="sm" variant="outline" onClick={() => { setViendo(r.semana); setTexto(null); }}
                            data-testid={`reportes-ver-${r.semana}`}>
                      <PlayCircle className="h-3.5 w-3.5 mr-1.5" /> {t('admin.reportes.watch')}
                    </Button>
                  )}
                  {r.tiene_video && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={urlVideo(r.semana, true)}><Download className="h-3.5 w-3.5" /></a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* --------------------------------------------------- disco y retención */}
      <Card className="p-4">
        <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
          <HardDrive className="h-4 w-4" /> {t('admin.reportes.storageTitle')}
        </h4>
        <p className="text-xs text-muted-foreground">
          {t('admin.reportes.storageLine')
            .replace('{semanas}', num(d.almacen.semanas))
            .replace('{ocupa}', gb(d.almacen.bytes))
            .replace('{anual}', gb(d.almacen.proyeccion_anual_bytes))
            .replace('{retencion}', num(d.retencion.semanas))}
        </p>
        {porVencer.length > 0 && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-700 p-2.5 text-xs mt-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              {t('admin.reportes.expiring').replace('{n}', num(porVencer.length))} {porVencer.join(', ')}
            </span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReportesSemanales;
