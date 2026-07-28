// El Motor de Precios, resumido para verlo sin abrir una terminal.
//
// Christian lo pidió simple: seis bloques, de un vistazo, y nada que haya que
// interpretar. Todo lo que sale aquí ya lo calcula la base del motor — este panel
// NO vuelve a hacer ninguna cuenta. Si un número de aquí discutiera con el de la
// terminal, ya no se sabría cuál creer, y ese fue exactamente el problema que la
// base vino a resolver: cuatro listas con cuatro ideas del mismo precio.
//
// De dónde salen los datos: `/admin/motor-precios` del backend, DETRÁS DE SESIÓN DE
// ADMIN. Esto no es un detalle: la foto lleva el costo de cada producto, el nombre de
// cada proveedor y el margen. En su primera versión era un archivo en `public/` y así
// habría quedado servido en abierto en el sitio — cualquiera con el enlace veía a
// cuánto compramos y a quién.
//
// Es una FOTO, no una conexión en vivo: la base del motor vive en la Mac de Christian,
// y desde ahí se sube. Por eso la fecha se enseña en rojo cuando ya tiene días — un
// tablero que parece vivo y está viejo es peor que no tener tablero.
//
// SOLO LECTURA. Desde aquí no se mueve ningún precio (eso viene después, cuando el
// motor escriba en la base en vez de en el Excel).
import React, { useEffect, useState } from 'react';
import {
  AlertTriangle, CheckCircle2, Gauge, PackageSearch, RefreshCw,
  ShoppingBasket, TrendingDown, History, Lightbulb,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';

const pesos = (n) => `$${Math.round(Number(n) || 0).toLocaleString('es-MX')}`;
const dolares = (n) => `$${Math.round(Number(n) || 0).toLocaleString('en-US')}`;
const veces = (n) => `${(Number(n) || 0).toFixed(2)}×`;

// Cuántos días tiene la foto. Se calcula en días enteros a propósito: al minuto
// no le sirve a nadie, y "hace 3 días" sí cambia lo que Christian haría con esto.
const diasDe = (texto) => {
  if (!texto) return null;
  const t = Date.parse(String(texto).replace(' ', 'T'));
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86400000);
};

const Bloque = ({ icon: I, titulo, nota, children, alerta }) => (
  <Card className={`p-5 ${alerta ? 'border-red-500/40' : ''}`}>
    <div className="flex items-center gap-2 mb-1">
      <I className={`h-4 w-4 ${alerta ? 'text-red-600' : 'text-[hsl(var(--primary))]'}`} />
      <h3 className="font-heading font-semibold text-sm">{titulo}</h3>
    </div>
    {nota && <p className="text-[11px] text-muted-foreground mb-3">{nota}</p>}
    {children}
  </Card>
);

// Tabla mínima. Sin ordenamientos ni filtros: es un resumen para decidir, no una
// hoja de cálculo. Lo que necesite exprimirse se exprime en la terminal.
const Tabla = ({ cols, filas, vacio }) => {
  if (!filas || filas.length === 0) {
    return <p className="text-xs text-muted-foreground py-2">{vacio}</p>;
  }
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs">
        <thead>
          <tr className="text-muted-foreground border-b border-[hsl(var(--border))]">
            {cols.map((c) => (
              <th key={c.k} className={`font-normal py-1.5 px-1 ${c.der ? 'text-right' : 'text-left'}`}>{c.t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i} className="border-b border-[hsl(var(--border))]/40 last:border-0">
              {cols.map((c) => (
                <td key={c.k} className={`py-1.5 px-1 ${c.der ? 'text-right font-mono-tech' : ''} ${c.fuerte ? 'font-medium' : ''}`}>
                  {c.pinta ? c.pinta(f) : (f[c.k] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function MotorPrecios() {
  const [d, setD] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/admin/motor-precios')
      .then((r) => setD(r.data))
      .catch((e) => setError(e.response?.status === 404
        ? 'Todavía no se ha subido ninguna foto del motor.'
        : (e.response?.data?.detail || e.message)));
  }, []);

  if (error) {
    return (
      <Card className="p-6 border-red-500/40">
        <div className="flex items-center gap-2 text-red-600 font-heading font-semibold text-sm">
          <AlertTriangle className="h-4 w-4" /> No pude leer la foto del motor
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {error} Se genera y se sube desde la Mac con{' '}
          <code>python3 pricing-system/publicar_dashboard_precios.py --subir</code>.
        </p>
      </Card>
    );
  }
  if (!d) return <p className="text-sm text-muted-foreground py-6">Cargando el motor…</p>;

  const dias = diasDe(d.generado);
  const vieja = dias !== null && dias >= 2;
  const s = d.semaforo || {};
  const filo = d.al_filo || {};
  const caro = d.pagando_de_mas || {};
  const rep = d.reponer || {};
  const opos = d.oportunidades || {};

  return (
    <div className="space-y-4">
      {/* Frescura primero: sin saber de cuándo es la foto, nada de lo de abajo se
          puede usar para decidir. */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-muted-foreground">
          {d.a_la_venta} a la venta de {d.productos} en la maestra
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[11px] ${vieja ? 'bg-red-500/15 text-red-600' : 'bg-[hsl(var(--muted))] text-muted-foreground'}`}>
          {vieja ? `Foto de hace ${dias} días — vuelve a generarla` : `Foto del ${d.generado}`}
        </span>
      </div>

      {/* 1. Semáforo de certeza */}
      <Bloque
        icon={s.ok ? CheckCircle2 : AlertTriangle}
        alerta={!s.ok}
        titulo={s.ok ? 'Todas las listas dicen lo mismo' : 'HAY PRECIOS QUE NO CUADRAN'}
        nota="La base, el maestro, el sitio y el backend, comparados uno contra otro."
      >
        <p className="text-xs">{s.resumen}</p>
        {!s.ok && (
          <ul className="mt-2 space-y-1">
            {(s.problemas || []).map((p, i) => (
              <li key={i} className="text-xs text-red-600">· {p}</li>
            ))}
          </ul>
        )}
      </Bloque>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* 2. Los que están al filo */}
        <Bloque
          icon={Gauge}
          alerta={filo.abajo_del_piso > 0}
          titulo={`Al filo del ROI · ${filo.abajo_del_piso || 0} abajo de ${veces(filo.piso)}`}
          nota="ROI REAL: lo que queda DESPUÉS del descuento máximo que puede llevarse ese producto. De lista todos se ven sanos."
        >
          <Tabla
            vacio="Ninguno cerca del piso."
            filas={filo.filas}
            cols={[
              { k: 'nombre', t: 'Producto', fuerte: true,
                pinta: (f) => `${f.nombre} ${f.presentacion}` },
              { k: 'roi_de_lista', t: 'De lista', der: true, pinta: (f) => veces(f.roi_de_lista) },
              { k: 'roi_real', t: 'Real', der: true,
                pinta: (f) => (
                  <span className={f.roi_real < filo.piso ? 'text-red-600 font-semibold' : ''}>
                    {veces(f.roi_real)}
                  </span>
                ) },
            ]}
          />
        </Bloque>

        {/* 3. Dónde estás pagando de más */}
        <Bloque
          icon={TrendingDown}
          titulo={`Pagando de más · ${dolares(caro.de_mas_usd_total)} por caja`}
          nota="A quién le compras hoy, y con quién saldría más barato. Ojo: a varios no se les sabe el envío."
        >
          <Tabla
            vacio="No hay nada más barato en otro lado."
            filas={caro.filas}
            cols={[
              { k: 'producto', t: 'Producto', fuerte: true,
                pinta: (f) => `${f.producto} ${f.presentacion}` },
              { k: 'le_compra_a', t: 'Le compras a' },
              { k: 'con_quien', t: 'Más barato' },
              { k: 'de_mas_usd', t: 'De más', der: true,
                pinta: (f) => <span className="text-red-600">{dolares(f.de_mas_usd)}</span> },
            ]}
          />
        </Bloque>

        {/* 4. Qué reponer */}
        <Bloque
          icon={ShoppingBasket}
          alerta={!!rep.error}
          titulo="Qué reponer"
          nota="Sólo de lo que tienes CONTIGO. Lo demás es bajo pedido: no hay nada que reponer porque no lo tienes."
        >
          {rep.error ? (
            <p className="text-xs text-red-600">{rep.error}</p>
          ) : (
            <>
              <Tabla
                vacio={`Nada por reponer: ninguno de los ${rep.en_mano || 0} que tienes contigo baja de ${rep.minimo} piezas.`}
                filas={rep.por_reponer}
                cols={[
                  { k: 'nombre', t: 'Producto', fuerte: true,
                    pinta: (f) => `${f.nombre} ${f.presentacion}` },
                  { k: 'piezas', t: 'Quedan', der: true,
                    pinta: (f) => (f.piezas <= 0 ? <span className="text-red-600">AGOTADO</span> : f.piezas) },
                  { k: 'proveedor', t: 'Cómprale a' },
                  { k: 'whatsapp', t: '', der: true,
                    pinta: (f) => (f.whatsapp
                      ? <a className="text-[hsl(var(--primary))] underline" href={f.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                      : '—') },
                ]}
              />
              {(rep.por_reponer || []).length > 0 && (
                <p className="text-[11px] text-muted-foreground mt-2">
                  El mensaje va escrito, pero no se manda solo: un pedido es dinero que sale.
                </p>
              )}
            </>
          )}
        </Bloque>

        {/* 5. Qué te ofrecen y no vendes */}
        <Bloque
          icon={Lightbulb}
          titulo={`Te lo ofrecen y no lo vendes · ${opos.total || 0}`}
          nota={`Ordenado por cuántos proveedores lo tienen: más proveedores, más real. ${opos.excluidos || 0} excluidos a propósito.`}
        >
          <Tabla
            vacio="Nada nuevo que no estés vendiendo ya."
            filas={opos.filas}
            cols={[
              { k: 'nombre', t: 'Producto', fuerte: true },
              { k: 'cuantos', t: 'Prov.', der: true },
              { k: 'mejor_usd', t: 'Caja', der: true, pinta: (f) => dolares(f.mejor_usd) },
              { k: 'gana_caja_mxn', t: 'Dejaría', der: true,
                pinta: (f) => <span className="text-[hsl(var(--success))]">{pesos(f.gana_caja_mxn)}</span> },
            ]}
          />
        </Bloque>
      </div>

      {/* 6. Movimientos de precio */}
      <Bloque
        icon={History}
        titulo="Últimos movimientos de precio"
        nota="Con su motivo y quién lo hizo. Sin el motivo esto sería una lista de números cambiando solos."
      >
        <Tabla
          vacio={d.movimientos?.nota || 'Todavía no hay movimientos con motivo escrito.'}
          filas={d.movimientos?.filas}
          cols={[
            { k: 'nombre', t: 'Producto', fuerte: true,
              pinta: (f) => `${f.nombre} ${f.presentacion}` },
            { k: 'precio_publico_mxn', t: 'Quedó en', der: true,
              pinta: (f) => pesos(f.precio_publico_mxn) },
            { k: 'motivo', t: 'Por qué' },
            { k: 'quien', t: 'Quién' },
            { k: 'vigente_desde', t: 'Cuándo', der: true,
              pinta: (f) => String(f.vigente_desde || '').slice(0, 10) },
          ]}
        />
      </Bloque>

      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
        <PackageSearch className="h-3 w-3" />
        Sólo lectura. Los precios se mueven con el motor (<code>reprecio.py</code>), nunca a mano —
        y menos desde una pantalla.
        <RefreshCw className="h-3 w-3 ml-2" />
        Para refrescar: <code>python3 pricing-system/publicar_dashboard_precios.py --subir</code>
      </p>
    </div>
  );
}
