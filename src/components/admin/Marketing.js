// Área de marketing del Admin: lo que Meta COBRA contra lo que el sitio VENDE.
//
// La cifra que manda aquí es el COSTO POR CLIENTE CON COMPRA HECHA — no el costo
// por clic, que es el número con el que Meta se luce. Y solo cuenta a los
// clientes NUEVOS: si alguien que ya compraba vuelve a comprar, esa venta no la
// consiguió el anuncio, y contarla abarataría el costo artificialmente.
//
// Todo lo que no se pudo atribuir se muestra APARTE, nunca repartido entre las
// campañas: repartirlo haría que todas se vieran mejor de lo que son.
import React, { useEffect, useState, useCallback } from 'react';
import { ResponsiveContainer, BarChart, Bar, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { AlertTriangle, ArrowLeft, Copy, RefreshCw, Link2, Sparkles, Users, DollarSign, Target, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { toast } from 'sonner';

// TODO EN DÓLARES (Christian, 2026-07-26). Meta le cobra en USD y sus costos con
// proveedores están en USD; las ventas se convierten con el TC fijo de la
// maestra (17.5), el mismo con el que se fijaron los precios. Usar otro haría
// que este panel discutiera con la maestra sobre el mismo producto.
const money = (n) => `$${(Number(n) || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const pesos = (n) => `$${Math.round(Number(n) || 0).toLocaleString('es-MX')} MXN`;
const num = (n) => (Number(n) || 0).toLocaleString('es-MX');

// Un CAC nulo NO es cero. Cero se lee como "gratis"; nulo es "todavía no trae
// clientes". Confundirlos cuesta dinero, así que se pintan distinto.
const cac = (v) => (v === null || v === undefined ? '—' : money(v));

const VEREDICTO = {
  'gana': { txt: 'Gana', c: 'bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]' },
  'apenas': { txt: 'Apenas sale', c: 'bg-amber-500/15 text-amber-600' },
  'pierde': { txt: 'Pierde', c: 'bg-red-500/15 text-red-600' },
  'no trae clientes': { txt: 'No trae clientes', c: 'bg-red-500/15 text-red-600' },
  'sin datos': { txt: 'Falta información', c: 'bg-[hsl(var(--muted))] text-muted-foreground' },
};

const Chip = ({ v }) => {
  const s = VEREDICTO[v] || VEREDICTO['sin datos'];
  return <span className={`rounded-full px-2 py-0.5 text-[11px] whitespace-nowrap ${s.c}`}>{s.txt}</span>;
};

const Kpi = ({ icon: I, label, value, hint, fuerte }) => (
  <Card className={`p-4 ${fuerte ? 'border-[hsl(var(--primary))]' : ''}`}>
    <div className="flex items-center gap-2 text-muted-foreground text-xs"><I className="h-4 w-4" /> {label}</div>
    <div className={`font-heading font-bold mt-1 ${fuerte ? 'text-2xl text-[hsl(var(--primary))]' : 'text-xl'}`}>{value}</div>
    {hint && <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>}
  </Card>
);

// Aviso de frescura. Christian pidió ver SIEMPRE lo más actual: si por lo que
// sea estamos mostrando un archivo viejo, tiene que gritarlo, no disimularlo.
const Frescura = ({ estado, onRefrescar, cargando }) => {
  const vivo = estado?.fuente === 'meta_en_vivo';
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className={`rounded-full px-2 py-0.5 ${vivo ? 'bg-[hsl(var(--success))]/15 text-[hsl(var(--success))]' : 'bg-red-500/15 text-red-600'}`}>
        {vivo ? 'En vivo desde Meta' : 'NO es dato de hoy'}
      </span>
      {vivo && (
        <span className="text-muted-foreground">
          Actualizado hace {estado.edad_segundos < 60 ? 'menos de un minuto' : `${Math.round(estado.edad_segundos / 60)} min`} · incluye lo de hoy
        </span>
      )}
      <Button size="sm" variant="outline" onClick={onRefrescar} disabled={cargando} data-testid="mkt-refrescar">
        <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${cargando ? 'animate-spin' : ''}`} /> Actualizar
      </Button>
      {estado?.aviso && (
        <div className="w-full flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 p-2.5">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> <span>{estado.aviso}</span>
        </div>
      )}
    </div>
  );
};

const copiar = (txt) => {
  navigator.clipboard?.writeText(txt).then(
    () => toast.success('Enlace copiado'),
    () => toast.error('No se pudo copiar'));
};

// ---------------------------------------------------------------- radiografía
const Radiografia = ({ id, dias, onVolver }) => {
  const [d, setD] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let vivo = true;
    setD(null); setError('');
    api.get(`/admin/marketing/campana/${id}?days=${dias}`)
      .then((r) => vivo && setD(r.data))
      .catch((e) => vivo && setError(e?.response?.data?.detail || 'No se pudo abrir la campaña.'));
    return () => { vivo = false; };
  }, [id, dias]);

  if (error) return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onVolver}><ArrowLeft className="h-4 w-4 mr-1.5" /> Volver</Button>
      <Card className="p-6 text-sm text-muted-foreground">{error}</Card>
    </div>
  );
  if (!d) return <Card className="p-6 text-sm text-muted-foreground">Abriendo la campaña…</Card>;

  const c = d.campana;
  return (
    <div className="space-y-6" data-testid="mkt-radiografia">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onVolver}><ArrowLeft className="h-4 w-4 mr-1.5" /> Volver</Button>
        <h3 className="font-heading font-semibold text-lg">{c.campana}</h3>
        <Chip v={c.veredicto} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Kpi icon={DollarSign} label="Gastado" value={money(c.gasto)} hint="USD" />
        <Kpi icon={Users} label="Clientes nuevos" value={num(c.clientes_nuevos)} hint={`${c.pedidos} pedidos en total`} />
        <Kpi icon={Target} label="Costo por cliente" value={cac(c.cac)} fuerte hint="solo primera compra" />
        <Kpi icon={TrendingUp} label="Ingreso atribuido" value={money(c.ingreso)} />
        <Kpi icon={TrendingUp} label="Por cada dólar" value={c.roas === null ? '—' : `$${c.roas}`} hint="ingreso ÷ gasto" />
      </div>

      {d.dia_a_dia?.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-3">Día a día</h4>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={240} minWidth={420}>
              <ComposedChart data={d.dia_a_dia} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="l" dataKey="clics_enlace" name="Clics al enlace" fill="hsl(var(--primary))" />
                <Line yAxisId="r" dataKey="gasto" name="Gasto" stroke="#f59e0b" dot={false} strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {d.anuncios?.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-1">Anuncio por anuncio</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Dentro de una campaña que “va mal” casi siempre hay un anuncio que gana y otro que se está comiendo el dinero.
          </p>
          <div className="space-y-2">
            {d.anuncios.map((a) => (
              <div key={a.ad_id} className="flex items-start gap-3 rounded-lg border border-border p-2.5">
                {a.miniatura
                  ? <img src={a.miniatura} alt="" className="h-14 w-14 rounded object-cover shrink-0" />
                  : <div className="h-14 w-14 rounded bg-[hsl(var(--secondary))] shrink-0" />}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{a.anuncio}</div>
                  {a.titulo && <div className="text-xs text-muted-foreground truncate">{a.titulo}</div>}
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {money(a.gasto)} · {num(a.clics_enlace)} clics · {num(a.paginas_cargadas)} llegaron · CPC {money(a.cpc)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {[['A quién se le mostró', d.por_edad_sexo], ['Dónde se mostró', d.por_plataforma]].map(([titulo, filas]) => (
          filas?.length > 0 && (
            <Card key={titulo} className="p-4">
              <h4 className="font-semibold text-sm mb-3">{titulo}</h4>
              <div className="space-y-1.5">
                {filas.slice(0, 8).map((f) => (
                  <div key={f.segmento} className="flex items-center justify-between text-xs">
                    <span className="truncate">{f.segmento}</span>
                    <span className="text-muted-foreground whitespace-nowrap ml-3">
                      {money(f.gasto)} · {num(f.clics_enlace)} clics
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )
        ))}
      </div>

      <Card className="p-4">
        <h4 className="font-semibold text-sm mb-1">Los pedidos que salieron de aquí</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Con número de pedido, para poder comprobarlo uno por uno. Esto es lo que hace verificable todo lo de arriba.
        </p>
        {d.pedidos?.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía ningún pedido atribuido a esta campaña.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-muted-foreground border-b border-border">
                <tr><th className="text-left py-1.5">Pedido</th><th className="text-left">Cuándo</th>
                  <th className="text-left">Cliente</th><th className="text-right">Total</th></tr>
              </thead>
              <tbody>
                {d.pedidos.map((o) => (
                  <tr key={o.order_number} className="border-b border-border/50">
                    <td className="py-1.5 font-mono-tech">{o.order_number}</td>
                    <td>{(o.created_at || '').slice(0, 10)}</td>
                    <td>{o.nuevo ? 'Nuevo' : 'Ya compraba'}</td>
                    <td className="text-right">{money(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Link2 className="h-4 w-4" /> Enlace para esta campaña</h4>
        <div className="flex items-center gap-2">
          <code className="text-[11px] bg-[hsl(var(--secondary))] rounded px-2 py-1.5 flex-1 overflow-x-auto whitespace-nowrap">{d.enlace_sugerido}</code>
          <Button size="sm" variant="outline" onClick={() => copiar(d.enlace_sugerido)}><Copy className="h-3.5 w-3.5" /></Button>
        </div>
      </Card>
    </div>
  );
};

// ------------------------------------------------------- director de marketing
// El botón que Christian pidió: arma una campaña desde cero con lo aprendido.
// La IA no inventa los datos — el servidor le pasa un briefing con los hechos
// reales — y lo que sale es una PROPUESTA, no algo que se publique solo.
const Director = () => {
  const [objetivo, setObjetivo] = useState('conseguir clientes nuevos');
  const [presupuesto, setPresupuesto] = useState('');
  const [p, setP] = useState(null);
  const [brief, setBrief] = useState(null);
  const [enlace, setEnlace] = useState('');
  const [pensando, setPensando] = useState(false);

  const armar = () => {
    setPensando(true); setP(null);
    api.post('/admin/marketing/director', {
      objetivo, presupuesto_mxn: Number(presupuesto) || 0, days: 90,
    })
      .then((r) => { setP(r.data.propuesta); setBrief(r.data.briefing); setEnlace(r.data.enlace); })
      .catch((e) => toast.error(e?.response?.data?.detail || 'La IA no pudo armar la campaña'))
      .finally(() => setPensando(false));
  };

  const seguro = brief?.confianza?.suficiente;

  return (
    <Card className="p-4 border-[hsl(var(--primary))]" data-testid="mkt-director">
      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" /> Director de marketing
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Arma una campaña nueva desde cero con lo aprendido de tus campañas, tus productos y tus clientes reales.
        Sale una propuesta para que la apruebes: no publica nada en Meta.
      </p>

      <div className="flex flex-wrap items-end gap-2 mb-3">
        <div className="flex-1 min-w-[220px]">
          <label className="text-[11px] text-muted-foreground">Qué quieres lograr</label>
          <input className="w-full mt-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
                 value={objetivo} onChange={(e) => setObjetivo(e.target.value)}
                 placeholder="conseguir clientes nuevos" data-testid="mkt-objetivo" />
        </div>
        <div className="w-36">
          <label className="text-[11px] text-muted-foreground">Presupuesto (MXN)</label>
          <input className="w-full mt-1 rounded-md border border-border bg-transparent px-2.5 py-1.5 text-sm"
                 value={presupuesto} onChange={(e) => setPresupuesto(e.target.value.replace(/\D/g, ''))}
                 placeholder="opcional" inputMode="numeric" />
        </div>
        <Button onClick={armar} disabled={pensando} data-testid="mkt-armar">
          <Sparkles className={`h-4 w-4 mr-1.5 ${pensando ? 'animate-pulse' : ''}`} />
          {pensando ? 'Armando…' : 'Armar campaña'}
        </Button>
      </div>

      {p?.error && <p className="text-xs text-red-600">{p.error}</p>}

      {p && !p.error && (
        <div className="space-y-4 border-t border-border pt-4">
          {/* Lo primero que se lee es qué tan confiable es esto. */}
          <div className={`flex items-start gap-2 rounded-lg p-2.5 text-xs ${seguro
            ? 'border border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/10'
            : 'border border-amber-500/30 bg-amber-500/10 text-amber-700'}`}>
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              {p.advertencia || (seguro ? 'Basada en tu historial.' : 'Con poco historial: tómala como punto de partida.')}
              {brief?.confianza?.por_que?.length > 0 && <> ({brief.confianza.por_que.join('; ')})</>}
            </span>
          </div>

          <div>
            <h5 className="font-heading font-bold text-lg">{p.nombre}</h5>
            <p className="text-xs text-muted-foreground mt-1">{p.por_que}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <Card className="p-3">
              <div className="text-muted-foreground mb-1">Producto</div>
              <div className="font-medium">{p.producto?.nombre}</div>
              <div className="text-muted-foreground mt-1">{p.producto?.por_que}</div>
            </Card>
            <Card className="p-3">
              <div className="text-muted-foreground mb-1">A quién</div>
              <div className="font-medium">{p.publico?.quien}</div>
              <div className="text-muted-foreground mt-1">
                {p.publico?.edad} · {p.publico?.ubicacion}
                {p.publico?.intereses?.length > 0 && <> · {p.publico.intereses.join(', ')}</>}
              </div>
            </Card>
            <Card className="p-3">
              <div className="text-muted-foreground mb-1">Presupuesto</div>
              <div className="font-medium">{money(p.presupuesto?.diario_mxn)}/día × {p.presupuesto?.dias} días</div>
              <div className="text-muted-foreground mt-1">
                ≈ {p.presupuesto?.clientes_esperados} clientes. {p.presupuesto?.en_que_me_baso}
              </div>
            </Card>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-1">Ángulo</div>
            <p className="text-sm">{p.angulo}</p>
          </div>

          {p.anuncios?.length > 0 && (
            <div>
              <div className="text-xs text-muted-foreground mb-2">Los anuncios a probar</div>
              <div className="grid md:grid-cols-3 gap-3">
                {p.anuncios.map((a, i) => (
                  <Card key={i} className="p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[hsl(var(--secondary))] px-2 py-0.5">{a.formato}</span>
                      <Button size="sm" variant="ghost" className="h-6 px-1.5"
                              onClick={() => copiar(`${a.gancho}\n\n${a.texto}\n\n${a.llamado}`)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="font-medium">{a.gancho}</div>
                    {a.titulo && <div className="text-muted-foreground">{a.titulo}</div>}
                    <p>{a.texto}</p>
                    <div className="text-[hsl(var(--primary))]">{a.llamado}</div>
                    {a.idea_visual && <div className="text-muted-foreground italic">Visual: {a.idea_visual}</div>}
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-3 text-xs">
            <Card className="p-3">
              <div className="text-muted-foreground mb-1">Qué medir</div>
              <ul className="list-disc pl-4 space-y-0.5">{(p.que_medir || []).map((m, i) => <li key={i}>{m}</li>)}</ul>
            </Card>
            <Card className="p-3">
              <div className="text-muted-foreground mb-1">Cuándo apagarla</div>
              <p>{p.cuando_apagar}</p>
              {p.siguiente_prueba && <p className="mt-1.5 text-muted-foreground">Después: {p.siguiente_prueba}</p>}
            </Card>
          </div>

          {enlace && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground shrink-0">Enlace para el anuncio</span>
              <code className="text-[11px] bg-[hsl(var(--secondary))] rounded px-2 py-1 flex-1 overflow-x-auto whitespace-nowrap">{enlace}</code>
              <Button size="sm" variant="outline" onClick={() => copiar(enlace)}><Copy className="h-3.5 w-3.5" /></Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

// ------------------------------------------------------------------- resumen
const Marketing = () => {
  const [dias, setDias] = useState(30);
  const [d, setD] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [abierta, setAbierta] = useState(null);

  const cargar = useCallback(() => {
    setCargando(true);
    api.get(`/admin/marketing/resumen?days=${dias}`)
      .then((r) => setD(r.data))
      .catch(() => toast.error('No se pudo cargar el marketing'))
      .finally(() => setCargando(false));
  }, [dias]);

  useEffect(() => { cargar(); }, [cargar]);

  // Christian pidió ver SIEMPRE lo más actual: se refresca solo cada minuto, que
  // es justo la caché del servidor (más seguido solo gastaría llamadas a Meta).
  useEffect(() => {
    const t = setInterval(cargar, 60000);
    return () => clearInterval(t);
  }, [cargar]);

  if (abierta) return <Radiografia id={abierta} dias={dias} onVolver={() => { setAbierta(null); cargar(); }} />;
  if (!d) return <Card className="p-6 text-sm text-muted-foreground">Cargando marketing…</Card>;

  const T = d.total || {};
  const conCac = (d.campanas || []).filter((c) => c.cac !== null);

  return (
    <div className="space-y-6" data-testid="mkt-resumen">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading font-semibold">Marketing</h3>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Lo que Meta cobra contra lo que el sitio de verdad vende, <strong>todo en dólares</strong> (Meta
            te cobra en USD y tus costos de proveedor están en USD; las ventas se convierten a 17.50, el mismo
            tipo de cambio de la maestra de precios). El costo por cliente cuenta solo a quien compró por
            PRIMERA vez: si alguien que ya compraba vuelve, esa venta no la trajo el anuncio.
          </p>
        </div>
        <div className="flex gap-1">
          {[7, 30, 90].map((n) => (
            <Button key={n} size="sm" variant={dias === n ? 'default' : 'outline'} onClick={() => setDias(n)}>{n}d</Button>
          ))}
        </div>
      </div>

      <Frescura estado={d} onRefrescar={cargar} cargando={cargando} />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Kpi icon={DollarSign} label="Gastado en anuncios" value={money(T.gasto)} hint="USD, tal como cobra Meta" />
        <Kpi icon={Users} label="Clientes nuevos" value={num(T.clientes_nuevos)} hint={`${num(T.pedidos)} pedidos en total`} />
        <Kpi icon={Target} label="Costo por cliente" value={cac(T.cac)} fuerte hint="con compra hecha" />
        <Kpi icon={TrendingUp} label="Ingreso atribuido" value={money(T.ingreso)} hint={`${pesos(T.ingreso * (d.tc || 17.5))} · TC ${d.tc || 17.5}`} />
        <Kpi icon={TrendingUp} label="Por cada dólar" value={T.roas === null ? '—' : `$${T.roas}`} hint="ingreso ÷ gasto" />
      </div>

      {d.sin_etiquetar?.pedidos > 0 && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-700 p-3 text-xs">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            <strong>{d.sin_etiquetar.pedidos} pedidos ({money(d.sin_etiquetar.ingreso)}) llegaron de Meta sin etiqueta</strong>, así que
            no se sabe de qué campaña salieron. No se reparten entre las campañas —eso las haría verse mejor de lo que son—,
            pero sí cuentan en el total. Se arregla pegando el enlace etiquetado de cada campaña (abajo) en su anuncio.
          </span>
        </div>
      )}

      {/* No solo Meta. Christian preguntó por distribuidores, WhatsApp y demás:
          aquí está cada venta por dónde llegó, y el costo donde se conoce. */}
      {d.canales?.por_origen?.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-1">De dónde llega cada venta</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Solo Meta y los distribuidores tienen un costo que podamos saber (la pauta y la comisión).
            Los demás canales no salen gratis: es que su costo no está registrado en ningún lado, y poner
            cero los haría verse como el mejor negocio del mundo.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-muted-foreground border-b border-border">
                <tr><th className="text-left py-2">Canal</th><th className="text-right">Pedidos</th>
                  <th className="text-right">Clientes nuevos</th><th className="text-right">Ingreso</th>
                  <th className="text-right">Costo</th><th className="text-right">Costo/cliente</th></tr>
              </thead>
              <tbody>
                {d.canales.por_origen.map((c) => (
                  <tr key={c.canal} className="border-b border-border/50">
                    <td className="py-2 font-medium capitalize">{c.canal}</td>
                    <td className="text-right">{num(c.pedidos)}</td>
                    <td className="text-right">{num(c.clientes_nuevos)}</td>
                    <td className="text-right">{money(c.ingreso)}</td>
                    <td className="text-right">{c.costo === null ? 'no medido' : money(c.costo)}</td>
                    <td className="text-right font-semibold">{cac(c.cac)}</td>
                  </tr>
                ))}
                {d.canales.distribuidores?.pedidos > 0 && (
                  <tr className="border-b border-border/50 bg-[hsl(var(--secondary))]/40">
                    <td className="py-2 font-medium">Distribuidores <span className="font-normal text-muted-foreground">(quién cerró)</span></td>
                    <td className="text-right">{num(d.canales.distribuidores.pedidos)}</td>
                    <td className="text-right">{num(d.canales.distribuidores.clientes_nuevos)}</td>
                    <td className="text-right">{money(d.canales.distribuidores.ingreso)}</td>
                    <td className="text-right">{money(d.canales.distribuidores.comisiones)}</td>
                    <td className="text-right font-semibold">{cac(d.canales.distribuidores.cac)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {d.canales.traslape_meta_distribuidor > 0 && (
            <p className="text-[11px] text-muted-foreground mt-2">
              ⚠️ {d.canales.traslape_meta_distribuidor} de esos pedidos llegaron por un anuncio Y se cerraron
              con código de distribuidor, así que aparecen en los dos renglones. Son dos preguntas distintas
              —cómo llegó y quién lo cerró— por eso no se suman.
            </p>
          )}
        </Card>
      )}

      {conCac.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-1">Cuánto cuesta un cliente en cada campaña</h4>
          <p className="text-xs text-muted-foreground mb-3">Más bajo es mejor. Solo salen las campañas que ya trajeron al menos un cliente nuevo.</p>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={260} minWidth={420}>
              <BarChart data={conCac} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="campana" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => money(v)} />
                <Bar dataKey="cac" name="Costo por cliente">
                  {conCac.map((c) => (
                    <Cell key={c.slug} fill={c.veredicto === 'gana' ? 'hsl(var(--success))'
                      : c.veredicto === 'pierde' ? '#dc2626' : 'hsl(var(--primary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {d.campanas?.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-1">Gasto contra ingreso, campaña por campaña</h4>
          <p className="text-xs text-muted-foreground mb-3">Si la barra naranja le gana a la azul, esa campaña está costando más de lo que trae.</p>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={260} minWidth={420}>
              <BarChart data={d.campanas} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="campana" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => money(v)} />
                <Legend />
                <Bar dataKey="gasto" name="Gastado" fill="#f59e0b" />
                <Bar dataKey="ingreso" name="Ingreso" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <h4 className="font-semibold text-sm mb-1">Todas las campañas</h4>
        <p className="text-xs text-muted-foreground mb-3">Haz clic en cualquiera para abrir su radiografía completa.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left py-2">Campaña</th>
                <th className="text-right">Gastado</th>
                <th className="text-right">Clics</th>
                <th className="text-right">Clientes nuevos</th>
                <th className="text-right">Costo/cliente</th>
                <th className="text-right">Ingreso</th>
                <th className="text-right">Por dólar</th>
                <th className="text-left pl-3">Veredicto</th>
              </tr>
            </thead>
            <tbody>
              {d.campanas.map((c) => (
                <tr key={c.slug}
                    className={`border-b border-border/50 ${c.campaign_id ? 'cursor-pointer hover:bg-[hsl(var(--secondary))]' : ''}`}
                    onClick={() => c.campaign_id && setAbierta(c.campaign_id)}
                    data-testid={`mkt-campana-${c.slug}`}>
                  <td className="py-2 font-medium">{c.campana}</td>
                  <td className="text-right">{money(c.gasto)}</td>
                  <td className="text-right">{num(c.clics_enlace)}</td>
                  <td className="text-right">{num(c.clientes_nuevos)}</td>
                  <td className="text-right font-semibold">{cac(c.cac)}</td>
                  <td className="text-right">{money(c.ingreso)}</td>
                  <td className="text-right">{c.roas === null ? '—' : `$${c.roas}`}</td>
                  <td className="pl-3"><Chip v={c.veredicto} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {d.enlaces?.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-1 flex items-center gap-2"><Link2 className="h-4 w-4" /> Enlaces etiquetados</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Pega el enlace de cada campaña en su anuncio de Meta. Sin esto, sus ventas caen en “sin etiqueta”
            y esa campaña nunca va a tener costo por cliente.
          </p>
          <div className="space-y-1.5">
            {d.enlaces.map((e) => (
              <div key={e.slug} className="flex items-center gap-2">
                <span className="text-xs w-40 truncate shrink-0">{e.campana}</span>
                <code className="text-[11px] bg-[hsl(var(--secondary))] rounded px-2 py-1 flex-1 overflow-x-auto whitespace-nowrap">{e.url}</code>
                <Button size="sm" variant="outline" onClick={() => copiar(e.url)}><Copy className="h-3.5 w-3.5" /></Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Director />
    </div>
  );
};

export default Marketing;
