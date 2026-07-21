import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';
import {
  Upload, FlaskConical, Trash2, Sparkles, AlertTriangle, TrendingUp, Plus, Loader2, FileText,
} from 'lucide-react';
import api from '@/lib/api';

const STATUS_STYLE = {
  alto: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  bajo: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  normal: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
};
const STATUS_LABEL = { alto: 'Arriba del rango', bajo: 'Abajo del rango', normal: 'En rango' };

const CHART_TOOLTIP_STYLE = {
  backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))',
  borderRadius: 8, fontSize: 12, color: 'hsl(var(--foreground))',
};

// El aviso va arriba, abajo y dentro del diálogo de la explicación. No es
// decorativo: es lo que separa "te ayudo a entender" de "te estoy diagnosticando".
const Disclaimer = ({ text, big }) => (
  <Card className={`p-4 border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))]/10 ${big ? '' : 'text-xs'}`}>
    <div className="flex gap-3">
      <AlertTriangle className="h-5 w-5 shrink-0 text-[hsl(var(--warning-foreground))] mt-0.5" />
      <div>
        {big && <div className="font-semibold text-sm mb-1">Esto no es un diagnóstico médico</div>}
        <p className={`${big ? 'text-sm' : 'text-xs'} leading-relaxed text-muted-foreground`}>{text}</p>
      </div>
    </div>
  </Card>
);

const EMPTY_MARKER = { key: '', label: '', value: '', unit: '', reference: '' };

const LabReports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState(null);      // estudio extraído, pendiente de confirmar
  const [sex, setSex] = useState('');
  const [interpretation, setInterpretation] = useState(null);
  const [chartKey, setChartKey] = useState('');
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const r = await api.get('/me/labs');
      setData(r.data);
    } catch { /* el candado de la pestaña ya explica el caso sin datos */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const r = await api.post('/me/labs/extract', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (!r.data.markers?.length) {
        toast.error('No encontramos valores en el archivo. Prueba con una foto más nítida o captúralos a mano.');
      }
      setDraft({ ...r.data, markers: r.data.markers.length ? r.data.markers : [{ ...EMPTY_MARKER }] });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'No pudimos leer el archivo');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const startManual = () => setDraft({
    lab_name: '', taken_at: new Date().toISOString().slice(0, 10), markdown: '',
    markers: [{ ...EMPTY_MARKER }],
  });

  const setMarker = (i, patch) => setDraft((d) => ({
    ...d, markers: d.markers.map((m, j) => (j === i ? { ...m, ...patch } : m)),
  }));

  const saveDraft = async () => {
    const markers = draft.markers
      .filter((m) => m.label.trim() && m.value !== '' && Number.isFinite(Number(m.value)))
      .map((m) => ({ ...m, value: Number(m.value) }));
    if (!markers.length) { toast.error('Captura al menos un valor numérico'); return; }
    setBusy(true);
    try {
      await api.post('/me/labs', { ...draft, markers, sex });
      setDraft(null);
      await load();
      toast.success('Estudio guardado');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'No pudimos guardar el estudio');
    } finally { setBusy(false); }
  };

  const remove = async (id) => {
    setBusy(true);
    try { await api.delete(`/me/labs/${id}`); await load(); toast.success('Estudio eliminado'); }
    catch { toast.error('No pudimos eliminar el estudio'); }
    finally { setBusy(false); }
  };

  const explain = async (report) => {
    setBusy(true);
    try {
      const r = await api.post(`/me/labs/${report.id}/interpret`);
      setInterpretation({ ...r.data, report });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'No pudimos generar la explicación');
    } finally { setBusy(false); }
  };

  // Marcadores con al menos dos mediciones: son los únicos que vale la pena graficar.
  const trendable = useMemo(() => {
    const series = data?.series || {};
    return Object.keys(series)
      .filter((k) => series[k].length >= 2)
      .map((k) => ({ key: k, label: data.relevant_markers.find((m) => m.key === k)?.label || k }));
  }, [data]);

  useEffect(() => {
    if (trendable.length && !trendable.some((t) => t.key === chartKey)) setChartKey(trendable[0].key);
  }, [trendable, chartKey]);

  if (loading) return <Card className="p-10 text-center text-sm text-muted-foreground">Cargando…</Card>;

  const relevant = data?.relevant_markers || [];
  const reports = data?.reports || [];
  const chartMarker = relevant.find((m) => m.key === chartKey);

  if (!relevant.length) {
    return (
      <Card className="p-10 text-center" data-testid="labs-no-scope">
        <FlaskConical className="h-8 w-8 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="font-heading font-semibold text-lg mb-2">Todavía no hay marcadores que revisar</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Esta herramienta se acota a los péptidos que compraste o registraste en tu seguimiento:
          solo te mostramos los marcadores que tienen que ver con esas vías, no un panel genérico.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Disclaimer big text={data.disclaimer} />

      {/* Qué marcadores le tocan a este cliente y por qué */}
      <Card className="p-5">
        <h4 className="font-heading font-semibold text-sm mb-1">Los marcadores que te tocan</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Salen de las vías de tus compuestos. Si subes un estudio con otros valores, los guardamos,
          pero no los evaluamos ni los comentamos.
        </p>
        <div className="flex flex-wrap gap-1.5" data-testid="labs-relevant">
          {relevant.map((m) => (
            <span key={m.key} title={m.plain}
              className="text-[11px] rounded-full border border-[hsl(var(--border))] px-2.5 py-1 text-muted-foreground">
              {m.label}
            </span>
          ))}
        </div>
      </Card>

      {/* Subir o capturar */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="font-heading font-semibold text-sm">Agregar un estudio</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sube el PDF o una foto y leemos los valores por ti. El archivo no se guarda: solo los números.
            </p>
          </div>
          <div className="flex gap-2">
            <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden"
              onChange={(e) => upload(e.target.files?.[0])} data-testid="labs-file-input" />
            <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={busy} data-testid="labs-upload">
              {busy ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Upload className="h-4 w-4 mr-1.5" />}
              Subir PDF o foto
            </Button>
            <Button variant="outline" onClick={startManual} disabled={busy} data-testid="labs-manual">
              <Plus className="h-4 w-4 mr-1.5" /> Capturar a mano
            </Button>
          </div>
        </div>
      </Card>

      {/* Gráfica de evolución */}
      {trendable.length > 0 && chartMarker && (
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h4 className="font-heading font-semibold text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[hsl(var(--primary))]" /> Cómo va cambiando
            </h4>
            <Select value={chartKey} onValueChange={setChartKey}>
              <SelectTrigger className="w-56 h-9" data-testid="labs-chart-marker"><SelectValue /></SelectTrigger>
              <SelectContent>
                {trendable.map((t) => <SelectItem key={t.key} value={t.key}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.series[chartKey]} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickLine={false} axisLine={false} width={52} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                domain={['auto', 'auto']} />
              <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [`${v} ${chartMarker.unit}`, chartMarker.label]} />
              {(() => {
                // Banda verde = rango de referencia, tomada del último estudio que lo traiga.
                const withRange = reports.flatMap((r) => r.markers).find((m) => m.key === chartKey && m.ref_low != null);
                return withRange ? (
                  <ReferenceArea y1={withRange.ref_low} y2={withRange.ref_high}
                    fill="hsl(var(--success))" fillOpacity={0.12} strokeOpacity={0} />
                ) : null;
              })()}
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-muted-foreground mt-2">
            La banda verde es el rango de referencia de {chartMarker.label.toLowerCase()}.
          </p>
        </Card>
      )}

      {/* Estudios guardados */}
      {reports.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground" data-testid="labs-empty">
          <FileText className="h-8 w-8 mx-auto mb-3 opacity-40" />
          Todavía no has subido ningún estudio.
        </Card>
      ) : reports.map((r) => (
        <Card key={r.id} className="p-5" data-testid="labs-report">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div className="font-heading font-semibold">{r.taken_at || '—'}</div>
              <div className="text-xs text-muted-foreground">
                {r.lab_name || 'Laboratorio no especificado'} · {r.markers.length} marcadores evaluados
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => explain(r)} disabled={busy} data-testid="labs-explain">
                {busy ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1.5" />}
                Explicar mis resultados
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(r.id)} disabled={busy} data-testid="labs-delete">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] text-xs text-muted-foreground">
                  <th className="text-left py-2 pr-4 font-medium">Marcador</th>
                  <th className="text-left py-2 pr-4 font-medium">Resultado</th>
                  <th className="text-left py-2 pr-4 font-medium">Referencia</th>
                  <th className="text-left py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {r.markers.map((m, i) => (
                  <tr key={i} className="border-b border-[hsl(var(--border))] last:border-0">
                    <td className="py-2 pr-4">
                      <div className="font-medium">{m.label}</div>
                      {m.plain && <div className="text-[11px] text-muted-foreground leading-snug max-w-md">{m.plain}</div>}
                    </td>
                    <td className="py-2 pr-4 tabular-nums whitespace-nowrap">{m.value} <span className="text-muted-foreground text-xs">{m.unit}</span></td>
                    <td className="py-2 pr-4 text-xs text-muted-foreground whitespace-nowrap">
                      {m.ref_low != null ? `${m.ref_low} – ${m.ref_high}` : (m.reference || '—')}
                    </td>
                    <td className="py-2">
                      {m.status && <Badge className={`${STATUS_STYLE[m.status]} text-[10px] whitespace-nowrap`}>{STATUS_LABEL[m.status]}</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}

      <Disclaimer text={data.disclaimer} />

      {/* Confirmar el estudio extraído antes de guardarlo */}
      <Dialog open={!!draft} onOpenChange={(v) => !v && setDraft(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {draft && (
            <>
              <DialogHeader><DialogTitle>Revisa los valores antes de guardar</DialogTitle></DialogHeader>
              <p className="text-xs text-muted-foreground">
                Léelos contra tu hoja y corrige lo que haga falta. Un dígito mal capturado cambia todo.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Fecha del estudio</Label>
                  <Input type="date" className="mt-1.5 h-9" value={draft.taken_at}
                    onChange={(e) => setDraft({ ...draft, taken_at: e.target.value })} data-testid="labs-draft-date" />
                </div>
                <div>
                  <Label className="text-xs">Laboratorio</Label>
                  <Input className="mt-1.5 h-9" value={draft.lab_name}
                    onChange={(e) => setDraft({ ...draft, lab_name: e.target.value })} />
                </div>
                <div>
                  <Label className="text-xs">Sexo biológico</Label>
                  <Select value={sex || undefined} onValueChange={setSex}>
                    <SelectTrigger className="mt-1.5 h-9" data-testid="labs-draft-sex"><SelectValue placeholder="Elige" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground mt-1">Varios rangos cambian según el sexo.</p>
                </div>
              </div>

              <div className="space-y-2 mt-2">
                {draft.markers.map((m, i) => (
                  <div key={i} className="grid grid-cols-[1fr_90px_80px] gap-2">
                    <Input className="h-9 text-sm" placeholder="Marcador" value={m.label}
                      onChange={(e) => setMarker(i, { label: e.target.value })} data-testid="labs-draft-label" />
                    <Input className="h-9 text-sm" placeholder="Valor" inputMode="decimal" value={m.value}
                      onChange={(e) => setMarker(i, { value: e.target.value })} data-testid="labs-draft-value" />
                    <Input className="h-9 text-sm" placeholder="Unidad" value={m.unit}
                      onChange={(e) => setMarker(i, { unit: e.target.value })} />
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={() => setDraft({ ...draft, markers: [...draft.markers, { ...EMPTY_MARKER }] })}>
                  <Plus className="h-4 w-4 mr-1.5" /> Agregar renglón
                </Button>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setDraft(null)}>Cancelar</Button>
                <Button onClick={saveDraft} disabled={busy} data-testid="labs-draft-save">Guardar estudio</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Explicación de la IA */}
      <Dialog open={!!interpretation} onOpenChange={(v) => !v && setInterpretation(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {interpretation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[hsl(var(--primary))]" /> Qué significan tus resultados
                </DialogTitle>
              </DialogHeader>
              <Disclaimer big text={interpretation.disclaimer} />
              <div className="text-sm leading-relaxed whitespace-pre-wrap" data-testid="labs-interpretation">
                {interpretation.interpretation}
              </div>
              <Disclaimer text="Si algo de esto te preocupa, llévale la hoja original a un profesional de la salud. Esta explicación no sustituye una consulta." />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LabReports;
