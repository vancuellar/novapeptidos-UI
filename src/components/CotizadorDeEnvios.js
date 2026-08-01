import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Truck, Loader2, Search, Plus, Minus, Trash2, Globe, Package, Clock, History,
  AlertTriangle, BadgeCheck,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api from '@/lib/api';
import { catalogoCotizable } from '@/lib/cotizador';
import { useLanguage } from '@/context/LanguageContext';

/* COTIZADOR DE ENVÍOS — «¿cuánto cuesta mandar esto a tal código postal?»

   ⛔ POR QUÉ EXISTE (Christián, 2026-08-01). Hasta hoy el envío sólo se cotizaba
   dentro del checkout (atado a un carrito) o sobre un pedido ya hecho. Pero la
   pregunta llega ANTES del pedido, cuando un cliente escribe por WhatsApp. Sin esta
   pantalla había que armar un carrito de mentira o adivinar.

   ⛔ UN SOLO COMPONENTE PARA LOS DOS TABLEROS. Lo que cambia entre el admin y el
   distribuidor NO se decide aquí: se decide en el SERVIDOR, que tiene dos rutas y
   recorta la del distribuidor con una lista blanca. Este archivo pinta lo que le
   llega; si el bloque `casa` no viene, no se pinta — porque no existe, no porque
   esté escondido. Ocultar un dato con CSS es dejarlo servido en la consola del
   navegador (ver `_solo_lo_del_distribuidor` y `test_cotizador_envios.py`).

   ⛔ NINGÚN NÚMERO SE CALCULA AQUÍ. Ni el peso, ni la tarifa, ni lo que paga el
   cliente. Todo viene contestado por el servidor. Ya costó dinero creerle un precio
   al navegador (2026-07-27). */

const pesos = (n) => `$${Number(n || 0).toLocaleString('es-MX', {
  minimumFractionDigits: 2, maximumFractionDigits: 2,
})}`;

// Un bulto que se captura a mano arranca vacío a propósito: un valor de ejemplo se
// queda puesto y alguien acaba cotizando la caja de otro.
const BULTO_VACIO = { peso_kg: '', largo_cm: '', ancho_cm: '', alto_cm: '', mercancia: '' };

const CotizadorDeEnvios = ({ rol = 'distributor' }) => {
  const { t } = useLanguage();
  const esAdmin = rol === 'admin';
  const base = esAdmin ? '/admin/shipping/cotizador' : '/distributor/shipping/cotizador';

  const [pais, setPais] = useState('MX');
  const [cp, setCp] = useState('');
  const [estado, setEstado] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [modo, setModo] = useState('items');
  const [busqueda, setBusqueda] = useState('');
  const [renglones, setRenglones] = useState([]);      // {id, name, price, qty}
  const [bulto, setBulto] = useState(BULTO_VACIO);
  const [cargando, setCargando] = useState(false);
  const [res, setRes] = useState(null);
  const [historial, setHistorial] = useState([]);

  // El catálogo público que ya viaja en el navegador: sirve para ELEGIR qué se
  // manda. El peso de cada pieza no está aquí ni tiene por qué estarlo — lo pone el
  // servidor contra el catálogo real cuando cotiza.
  const catalogo = useMemo(() => catalogoCotizable(null), []);

  const cargarHistorial = useCallback(() => api.get(`${base}/historial`)
    .then((r) => setHistorial(r.data?.historial || []))
    .catch(() => {}), [base]);

  useEffect(() => { cargarHistorial(); }, [cargarHistorial]);

  const sugerencias = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (q.length < 2) return [];
    return catalogo.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 6);
  }, [busqueda, catalogo]);

  const agregar = (p) => {
    setRenglones((rs) => (rs.some((r) => r.id === p.id)
      ? rs.map((r) => (r.id === p.id ? { ...r, qty: r.qty + 1 } : r))
      : [...rs, { id: p.id, name: p.name, price: p.price, qty: 1 }]));
    setBusqueda('');
  };
  const mover = (id, d) => setRenglones((rs) => rs
    .map((r) => (r.id === id ? { ...r, qty: Math.max(0, r.qty + d) } : r))
    .filter((r) => r.qty > 0));
  const quitar = (id) => setRenglones((rs) => rs.filter((r) => r.id !== id));

  const fueraDeMexico = pais !== 'MX';
  const listo = cp.trim().length >= 5
    && (fueraDeMexico || (modo === 'items' ? renglones.length > 0 : Number(bulto.peso_kg) > 0));

  const cotizar = async () => {
    setCargando(true);
    setRes(null);
    try {
      const r = await api.post(base, {
        postal_code: cp.trim(),
        state: estado.trim(),
        city: ciudad.trim(),
        country: pais,
        mode: modo,
        items: modo === 'items'
          ? renglones.map((x) => ({
            product_id: x.id, name: x.name, price: x.price, quantity: x.qty,
            presentation: '', image_url: '',
          }))
          : [],
        peso_kg: Number(bulto.peso_kg) || 0,
        largo_cm: Number(bulto.largo_cm) || 0,
        ancho_cm: Number(bulto.ancho_cm) || 0,
        alto_cm: Number(bulto.alto_cm) || 0,
        merchandise_mxn: Number(bulto.mercancia) || 0,
      });
      setRes(r.data || null);
      if (r.data?.detail && !(r.data?.opciones || []).length) toast.message(r.data.detail);
      cargarHistorial();
    } catch (e) {
      toast.error(e?.response?.data?.detail || t('cotizadorEnvio.error'));
    } finally {
      setCargando(false);
    }
  };

  const reusar = (h) => {
    setPais(h.country === 'MX' ? 'MX' : 'XX');
    setCp(h.postal_code || '');
    setEstado(h.state || '');
    setCiudad(h.city || '');
  };

  const opciones = res?.opciones || [];
  const cobro = res?.cobro || {};
  const casa = res?.casa;

  return (
    <div className="space-y-5" data-testid="cotizador-envios">
      <div>
        <h3 className="font-heading font-semibold text-base flex items-center gap-2">
          <Truck className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('cotizadorEnvio.title')}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {esAdmin ? t('cotizadorEnvio.casa.subtitle') : t('cotizadorEnvio.subtitle')}
        </p>
      </div>

      {/* ------------------------------------------------------ a dónde va */}
      <Card className="p-5 space-y-4">
        <h4 className="font-heading font-semibold text-sm flex items-center gap-2">
          <Globe className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('cotizadorEnvio.destination')}
        </h4>
        <div className="grid gap-3 sm:grid-cols-4">
          <div>
            <Label className="text-xs mb-1 block">{t('cotizadorEnvio.country')}</Label>
            {/* Un `select` de HTML y no el de Radix: son dos opciones y este se puede
                leer y picar sin JavaScript de por medio. */}
            <select value={pais} onChange={(e) => setPais(e.target.value)}
              data-testid="cotizador-pais"
              className="flex h-10 w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-sm">
              <option value="MX">{t('cotizadorEnvio.country.mx')}</option>
              <option value="XX">{t('cotizadorEnvio.country.other')}</option>
            </select>
          </div>
          <div>
            <Label className="text-xs mb-1 block">{t('cotizadorEnvio.postalCode')}</Label>
            <Input value={cp} onChange={(e) => setCp(e.target.value.replace(/\D/g, '').slice(0, 5))}
              inputMode="numeric" placeholder="06700" data-testid="cotizador-cp" />
          </div>
          <div>
            <Label className="text-xs mb-1 block">{t('cotizadorEnvio.state')}</Label>
            <Input value={estado} onChange={(e) => setEstado(e.target.value)}
              data-testid="cotizador-estado" />
          </div>
          <div>
            <Label className="text-xs mb-1 block">{t('cotizadorEnvio.city')}</Label>
            <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)}
              data-testid="cotizador-ciudad" />
          </div>
        </div>

        {/* ⛔ SE AVISA ANTES DE PREGUNTAR. Las paqueterías contratadas no salen de
            México; dejar la rueda girando hasta que la API conteste que no es
            hacerle perder el tiempo a quien tiene al cliente esperando. */}
        {fueraDeMexico && (
          <p className="text-sm flex items-start gap-2 rounded-md border border-[hsl(var(--warning))] p-3"
            data-testid="cotizador-sin-cobertura">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--warning-foreground))]" />
            <span>{t('cotizadorEnvio.noCoverage')}</span>
          </p>
        )}
      </Card>

      {/* ------------------------------------------------------ qué se manda */}
      {!fueraDeMexico && (
        <Card className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-heading font-semibold text-sm flex items-center gap-2">
              <Package className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('cotizadorEnvio.what')}
            </h4>
            <div className="flex gap-1 rounded-md border border-[hsl(var(--border))] p-0.5">
              {[['items', t('cotizadorEnvio.mode.items')], ['manual', t('cotizadorEnvio.mode.manual')]]
                .map(([v, label]) => (
                  <button key={v} type="button" onClick={() => setModo(v)}
                    data-testid={`cotizador-modo-${v}`}
                    className={`px-3 py-1.5 text-xs rounded ${modo === v
                      ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                      : 'text-muted-foreground'}`}>
                    {label}
                  </button>
                ))}
            </div>
          </div>

          {modo === 'items' ? (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-9" placeholder={t('cotizadorEnvio.search')}
                  data-testid="cotizador-buscar" />
                {sugerencias.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-lg">
                    {sugerencias.map((p) => (
                      <button key={p.id} type="button" onClick={() => agregar(p)}
                        className="flex w-full items-center justify-between px-3 py-2 text-sm text-left hover:bg-[hsl(var(--muted))]">
                        <span>{p.name}</span>
                        <Plus className="h-3.5 w-3.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">{t('cotizadorEnvio.searchHint')}</p>
              {renglones.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t('cotizadorEnvio.empty')}</p>
              ) : (
                <div className="space-y-1.5" data-testid="cotizador-renglones">
                  {renglones.map((r) => (
                    <div key={r.id} className="flex items-center gap-2 text-sm">
                      <span className="flex-1 min-w-0 truncate">{r.name}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7"
                        onClick={() => mover(r.id, -1)} aria-label="-">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-mono-tech">{r.qty}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7"
                        onClick={() => mover(r.id, 1)} aria-label="+">
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7"
                        onClick={() => quitar(r.id)} aria-label={t('cotizadorEnvio.remove')}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-4">
                {[['peso_kg', t('cotizadorEnvio.weight')], ['largo_cm', t('cotizadorEnvio.length')],
                  ['ancho_cm', t('cotizadorEnvio.width')], ['alto_cm', t('cotizadorEnvio.height')]]
                  .map(([k, label]) => (
                    <div key={k}>
                      <Label className="text-xs mb-1 block">{label}</Label>
                      <Input value={bulto[k]} inputMode="decimal" data-testid={`cotizador-${k}`}
                        onChange={(e) => setBulto((b) => ({ ...b, [k]: e.target.value }))} />
                    </div>
                  ))}
              </div>
              <div className="sm:max-w-xs">
                <Label className="text-xs mb-1 block">{t('cotizadorEnvio.merchandise')}</Label>
                <Input value={bulto.mercancia} inputMode="decimal" data-testid="cotizador-mercancia"
                  onChange={(e) => setBulto((b) => ({ ...b, mercancia: e.target.value }))} />
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {t('cotizadorEnvio.merchandiseHint')}
                </p>
              </div>
            </>
          )}
        </Card>
      )}

      <Button onClick={cotizar} disabled={!listo || cargando} data-testid="cotizador-cotizar">
        {cargando ? <Loader2 className="h-4 w-4 animate-spin" /> : t('cotizadorEnvio.quote')}
      </Button>

      {/* ------------------------------------------------------ la respuesta */}
      {res && res.cobertura === false && (
        <Card className="p-4 border-[hsl(var(--warning))]" data-testid="cotizador-respuesta-sin-cobertura">
          <p className="text-sm flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--warning-foreground))]" />
            <span>{res.detail}</span>
          </p>
        </Card>
      )}

      {res && res.cobertura !== false && opciones.length === 0 && (
        <Card className="p-4" data-testid="cotizador-sin-tarifas">
          <p className="text-sm text-muted-foreground">{res.detail}</p>
        </Card>
      )}

      {opciones.length > 0 && (
        <Card className="p-5 space-y-4" data-testid="cotizador-resultado">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-heading font-semibold text-sm">{t('cotizadorEnvio.results')}</h4>
            <span className="text-xs text-muted-foreground">
              {t('cotizadorEnvio.weightQuoted', { kg: res.peso_kg })}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="py-1.5 pr-3 font-medium">{t('cotizadorEnvio.carrier')}</th>
                  <th className="py-1.5 pr-3 font-medium">{t('cotizadorEnvio.service')}</th>
                  <th className="py-1.5 pr-3 font-medium">{t('cotizadorEnvio.days')}</th>
                  <th className="py-1.5 font-medium text-right">{t('cotizadorEnvio.price')}</th>
                </tr>
              </thead>
              <tbody>
                {opciones.map((o, i) => (
                  <tr key={`${o.carrier}-${o.service}-${i}`}
                    data-testid={o.recomendada ? 'cotizador-ganadora' : undefined}
                    className={`border-t border-[hsl(var(--border))] ${o.recomendada ? 'font-semibold' : ''}`}>
                    <td className="py-2 pr-3">
                      <span className="inline-flex items-center gap-1.5">
                        {o.carrier}
                        {o.recomendada && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-normal rounded-full px-2 py-0.5 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                            <BadgeCheck className="h-3 w-3" /> {t('cotizadorEnvio.cheapest')}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-muted-foreground">{o.service}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{o.days || '—'}</td>
                    <td className="py-2 text-right font-mono-tech">{pesos(o.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lo que se le COBRA al cliente con la política vigente. Es lo que decide si
              este envío se come el margen, y por eso va pegado a la tabla. */}
          <div className="rounded-md bg-[hsl(var(--muted))]/50 p-4 space-y-1.5"
            data-testid="cotizador-cobro">
            <h5 className="font-heading font-semibold text-xs">{t('cotizadorEnvio.charge.title')}</h5>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('cotizadorEnvio.charge.merchandise')}</span>
              <span className="font-mono-tech">{pesos(cobro.mercancia)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('cotizadorEnvio.charge.customerPays')}</span>
              <span className="font-mono-tech font-semibold" data-testid="cotizador-cliente-paga">
                {cobro.gratis ? t('cotizadorEnvio.charge.free') : pesos(cobro.cliente_paga)}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground pt-1">
              {cobro.falta_para_gratis > 0
                ? t('cotizadorEnvio.charge.missing', {
                  monto: pesos(cobro.falta_para_gratis), desde: pesos(cobro.envio_gratis_desde),
                })
                : t('cotizadorEnvio.charge.freeFrom', { desde: pesos(cobro.envio_gratis_desde) })}
            </p>
            {/* ⛔ Un renglón que el catálogo del servidor no reconoce suma cero al
                importe de compra — y su precio NO se toma del navegador, que es la
                regla. Decirlo evita leer como bueno un «paga el cliente» que va corto. */}
            {cobro.productos_sin_precio > 0 && (
              <p className="text-[11px] text-[hsl(var(--warning-foreground))] pt-1"
                data-testid="cotizador-sin-precio">
                {t('cotizadorEnvio.charge.unknown', { n: cobro.productos_sin_precio })}
              </p>
            )}
          </div>

          {/* ⛔ SÓLO EL ADMIN. Si `casa` no viene, este bloque no existe: no está
              escondido, no llegó. El servidor decide, no esta pantalla. */}
          {casa && (
            <div className="rounded-md border border-[hsl(var(--border))] p-4 space-y-1.5"
              data-testid="cotizador-casa">
              <h5 className="font-heading font-semibold text-xs">{t('cotizadorEnvio.casa.title')}</h5>
              {[[t('cotizadorEnvio.casa.cost'), pesos(casa.costo_guia)],
                [t('cotizadorEnvio.casa.absorbs'), pesos(casa.absorbe)],
                [t('cotizadorEnvio.casa.cap'), pesos(casa.tope_absorcion)]].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono-tech">{v}</span>
                  </div>
              ))}
              {casa.fuera_de_tope > 0 && (
                <p className="text-[11px] text-[hsl(var(--warning-foreground))] pt-1">
                  {t('cotizadorEnvio.casa.overCap', { monto: pesos(casa.fuera_de_tope) })}
                </p>
              )}
              <p className="text-[11px] text-muted-foreground pt-1">
                {casa.se_compra_sola
                  ? t('cotizadorEnvio.casa.autoYes', { tope: pesos(casa.tope_guia_automatica) })
                  : t('cotizadorEnvio.casa.autoNo', { tope: pesos(casa.tope_guia_automatica) })}
              </p>
              {res.ahorro?.comparados > 1 && (
                <p className="text-[11px] text-muted-foreground">
                  {t('cotizadorEnvio.casa.savings', { monto: pesos(res.ahorro.ahorro_mxn) })}
                </p>
              )}
            </div>
          )}
        </Card>
      )}

      {/* ------------------------------------------------------ historial corto */}
      <Card className="p-5">
        <h4 className="font-heading font-semibold text-sm flex items-center gap-2 mb-3">
          <History className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('cotizadorEnvio.history')}
        </h4>
        {historial.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('cotizadorEnvio.historyEmpty')}</p>
        ) : (
          <div className="space-y-1" data-testid="cotizador-historial">
            {historial.map((h) => (
              <button key={h.id} type="button" onClick={() => reusar(h)}
                className="flex w-full flex-wrap items-center gap-x-3 gap-y-0.5 rounded px-2 py-1.5 text-left text-xs hover:bg-[hsl(var(--muted))]/60">
                <span className="font-mono-tech font-semibold">{h.postal_code}</span>
                <span className="text-muted-foreground">{h.city || h.state || '—'}</span>
                <span className="text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />{h.peso_kg} kg
                </span>
                <span className="ml-auto">{h.carrier} · {pesos(h.price)}</span>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CotizadorDeEnvios;
