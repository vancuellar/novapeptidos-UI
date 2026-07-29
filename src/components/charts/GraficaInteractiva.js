import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';

/**
 * GraficaInteractiva — envoltorio de pan/zoom estilo TradingView para cualquier
 * gráfica de Recharts. Sustituye a <ResponsiveContainer> y recibe UNA gráfica
 * (AreaChart, BarChart, ComposedChart, LineChart...) como hijo.
 *
 * Escritorio:
 *  - Arrastrar sobre la gráfica: moverse por los datos (pan).
 *  - Rueda: zoom del eje X (o del eje de categorías en layout vertical).
 *  - Shift + rueda: zoom del eje Y.
 *  - Rueda o arrastre SOBRE un eje: ajusta solo ese eje.
 *  - Doble clic o botón "Reiniciar": vista completa.
 *
 * Celular:
 *  - Un dedo en horizontal: pan. El scroll vertical de la página sigue vivo
 *    (touch-action: pan-y).
 *  - Pellizco horizontal: zoom X. Pellizco vertical: zoom Y.
 *
 * Implementación: el eje X se controla recortando `data` a una ventana de
 * índices (funciona con ejes de categorías); el eje Y se controla inyectando
 * `domain` + `allowDataOverflow` en los <YAxis> hijos. Sin librerías nuevas.
 */

const MIN_POINTS = 2; // mínimo de puntos visibles al acercar en X

function flatChildren(children) {
  const out = [];
  React.Children.forEach(children, (c) => {
    if (Array.isArray(c)) out.push(...flatChildren(c));
    else if (c !== null && c !== undefined && c !== false) out.push(c);
  });
  return out;
}

export default function GraficaInteractiva({ height, minWidth, children, className = '' }) {
  const chart = React.Children.only(children);
  const data = useMemo(() => chart.props.data || [], [chart.props.data]);
  const vertical = chart.props.layout === 'vertical';
  const n = data.length;

  // Ventana X en fracciones [0..1] sobre los índices, y dominios Y por eje.
  const [win, setWin] = useState([0, 1]);
  const [yDoms, setYDoms] = useState({});

  const rootRef = useRef(null);
  const stateRef = useRef({});

  // Si cambian los datos (otro filtro, otro rango), volver a la vista completa.
  const dataSig = `${n}|${n ? JSON.stringify(data[0]) : ''}`;
  useEffect(() => { setWin([0, 1]); setYDoms({}); }, [dataSig]);

  const kids = useMemo(() => flatChildren(chart.props.children), [chart.props.children]);

  // Geometría estimada: anchos de ejes Y, alto del eje X y de la leyenda.
  const geo = useMemo(() => {
    const m = chart.props.margin || {};
    let leftW = m.left || 0;
    let rightW = m.right || 0;
    let topH = m.top || 0;
    let bottomH = m.bottom || 0;
    let leftAxisId = null;
    let rightAxisId = null;
    kids.forEach((c) => {
      if (c.type === YAxis && !c.props.hide) {
        const w = c.props.width || 60;
        const id = c.props.yAxisId !== undefined ? c.props.yAxisId : 0;
        if (c.props.orientation === 'right') { rightW += w; if (rightAxisId === null) rightAxisId = id; }
        else { leftW += w; if (leftAxisId === null) leftAxisId = id; }
      }
      if (c.type === XAxis && !c.props.hide) bottomH += c.props.height || 30;
      if (c.type === Legend) bottomH += 28;
    });
    return { leftW, rightW, topH, bottomH, leftAxisId, rightAxisId };
  }, [kids, chart.props.margin]);

  // Series por eje Y (para calcular el dominio base al primer zoom/pan de Y).
  const axisSeries = useMemo(() => {
    const map = {};
    kids.forEach((c) => {
      if (c.type === XAxis || c.type === YAxis) return;
      const dk = c.props && c.props.dataKey;
      if (dk === undefined || typeof dk === 'object') return;
      const id = c.props.yAxisId !== undefined ? c.props.yAxisId : 0;
      (map[id] = map[id] || []).push(dk);
    });
    return map;
  }, [kids]);

  const yAxisDomainProp = useMemo(() => {
    const map = {};
    kids.forEach((c) => {
      if (c.type === YAxis) {
        const id = c.props.yAxisId !== undefined ? c.props.yAxisId : 0;
        map[id] = c.props.domain;
      }
    });
    return map;
  }, [kids]);

  // Ventana de índices visibles.
  const [i0, i1] = useMemo(() => {
    if (n <= 1) return [0, Math.max(0, n - 1)];
    let a = Math.round(win[0] * (n - 1));
    let b = Math.round(win[1] * (n - 1));
    if (b - a < MIN_POINTS - 1) {
      const mid = Math.round((a + b) / 2);
      a = Math.max(0, mid - 1);
      b = Math.min(n - 1, a + MIN_POINTS - 1);
      a = Math.max(0, b - (MIN_POINTS - 1));
    }
    return [a, b];
  }, [win, n]);

  const visible = useMemo(() => data.slice(i0, i1 + 1), [data, i0, i1]);
  const modified = i0 > 0 || i1 < n - 1 || Object.keys(yDoms).length > 0;

  // ---- utilería de dominios -------------------------------------------------

  const baseYDomain = useCallback((axisId) => {
    const keys = axisSeries[axisId] || [];
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = i0; i <= i1; i += 1) {
      const row = data[i];
      keys.forEach((k) => {
        const v = Number(row && row[k]);
        if (Number.isFinite(v)) { if (v < lo) lo = v; if (v > hi) hi = v; }
      });
    }
    if (!Number.isFinite(lo)) { lo = 0; hi = 1; }
    if (lo === hi) { lo -= 1; hi += 1; }
    const span = hi - lo;
    if (yAxisDomainProp[axisId]) return [lo - span * 0.05, hi + span * 0.05];
    return [Math.min(0, lo), hi + span * 0.05];
  }, [axisSeries, data, i0, i1, yAxisDomainProp]);

  const allYIds = useCallback(() => {
    const ids = new Set(Object.keys(axisSeries));
    kids.forEach((c) => {
      if (c.type === YAxis) ids.add(String(c.props.yAxisId !== undefined ? c.props.yAxisId : 0));
    });
    return [...ids];
  }, [axisSeries, kids]);

  // Refs siempre frescos para los listeners nativos.
  stateRef.current = { win, yDoms, n, geo, vertical, baseYDomain, allYIds, height };

  const clampWin = (a, b) => {
    const span = Math.min(1, Math.max(b - a, 0.000001));
    let na = a;
    if (na < 0) na = 0;
    if (na + span > 1) na = 1 - span;
    return [na, na + span];
  };

  const zoomX = useCallback((anchorFrac, factor) => {
    const S = stateRef.current;
    if (S.n <= MIN_POINTS) return;
    setWin(([a, b]) => {
      const anchor = a + anchorFrac * (b - a);
      const minSpan = (MIN_POINTS - 1) / (S.n - 1);
      let na = anchor - (anchor - a) * factor;
      let nb = anchor + (b - anchor) * factor;
      if (nb - na < minSpan) {
        const mid = (na + nb) / 2;
        na = mid - minSpan / 2;
        nb = mid + minSpan / 2;
      }
      if (na < 0) na = 0;
      if (nb > 1) nb = 1;
      return clampWin(na, nb);
    });
  }, []);

  const panX = useCallback((dFrac) => {
    setWin(([a, b]) => clampWin(a + dFrac * (b - a), b + dFrac * (b - a)));
  }, []);

  const zoomY = useCallback((ids, anchorT, factor) => {
    const S = stateRef.current;
    setYDoms((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        const dom = prev[id] || S.baseYDomain(id);
        const [lo, hi] = dom;
        const val = hi - anchorT * (hi - lo);
        let nlo = val - (val - lo) * factor;
        let nhi = val + (hi - val) * factor;
        if (nhi - nlo < 1e-9) return;
        next[id] = [nlo, nhi];
      });
      return next;
    });
  }, []);

  const panY = useCallback((ids, dT) => {
    const S = stateRef.current;
    setYDoms((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        const dom = prev[id] || S.baseYDomain(id);
        const span = dom[1] - dom[0];
        next[id] = [dom[0] + dT * span, dom[1] + dT * span];
      });
      return next;
    });
  }, []);

  const reset = useCallback(() => { setWin([0, 1]); setYDoms({}); }, []);

  // Zona bajo el cursor: 'plot' | 'yleft' | 'yright' | 'xaxis'
  const hitZone = useCallback((x, y, rect) => {
    const { leftW, rightW, bottomH } = stateRef.current.geo;
    if (x < leftW) return 'yleft';
    if (x > rect.width - rightW) return 'yright';
    if (y > rect.height - bottomH) return 'xaxis';
    return 'plot';
  }, []);

  const plotSize = (rect) => {
    const { leftW, rightW, topH, bottomH } = stateRef.current.geo;
    return {
      w: Math.max(40, rect.width - leftW - rightW),
      h: Math.max(40, rect.height - topH - bottomH),
      topH,
      leftW,
    };
  };

  // ---- listeners nativos (wheel no puede ser pasivo, pinch necesita preventDefault)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      const S = stateRef.current;
      if (!S.n) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const zone = hitZone(x, y, rect);
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      const factor = Math.exp(Math.max(-40, Math.min(40, delta)) * 0.005);
      const { w, h, topH, leftW } = plotSize(rect);
      const tx = Math.min(1, Math.max(0, (x - leftW) / w));
      const ty = Math.min(1, Math.max(0, (y - topH) / h));

      if (S.vertical) { zoomX(ty, factor); return; }
      if (zone === 'yleft' && S.geo.leftAxisId !== null) zoomY([S.geo.leftAxisId], ty, factor);
      else if (zone === 'yright' && S.geo.rightAxisId !== null) zoomY([S.geo.rightAxisId], ty, factor);
      else if (e.shiftKey) zoomY(S.allYIds(), ty, factor);
      else zoomX(tx, factor);
    };

    const onTouchStart = (e) => {
      // Con dos dedos tomamos el gesto (pellizco); con uno, que mande touch-action.
      if (e.touches.length === 2) e.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
    };
  }, [hitZone, zoomX, zoomY]);

  // ---- arrastre y pellizco con Pointer Events ------------------------------
  const pointers = useRef(new Map());
  const dragRef = useRef(null);
  const pinchRef = useRef(null);

  const onPointerDown = (e) => {
    const el = rootRef.current;
    if (!el || !stateRef.current.n) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { el.setPointerCapture(e.pointerId); } catch (_) { /* no-op */ }
    if (pointers.current.size === 1) {
      const rect = el.getBoundingClientRect();
      dragRef.current = {
        zone: hitZone(e.clientX - rect.left, e.clientY - rect.top, rect),
        moved: false,
      };
    } else {
      dragRef.current = null; // dos dedos = pellizco, no arrastre
    }
  };

  const onPointerMove = (e) => {
    const el = rootRef.current;
    if (!el || !pointers.current.has(e.pointerId)) return;
    const prev = pointers.current.get(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const S = stateRef.current;
    const rect = el.getBoundingClientRect();
    const { w, h } = plotSize(rect);

    if (pointers.current.size === 2) {
      // Pellizco: el eje dominante del gesto decide qué eje se ajusta.
      const pts = [...pointers.current.values()];
      const dx = Math.abs(pts[0].x - pts[1].x);
      const dy = Math.abs(pts[0].y - pts[1].y);
      const last = pinchRef.current || { dx, dy };
      pinchRef.current = { dx, dy };
      if (S.vertical || dy > dx) {
        if (last.dy > 8 && dy > 8) {
          const f = last.dy / dy;
          if (S.vertical) zoomX(0.5, f);
          else zoomY(S.allYIds(), 0.5, f);
        }
      } else if (last.dx > 8 && dx > 8) {
        zoomX(0.5, last.dx / dx);
      }
      return;
    }

    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
    drag.moved = true;

    if (S.vertical) {
      panX(-dy / h);
      return;
    }
    if (drag.zone === 'yleft' && S.geo.leftAxisId !== null) { panY([S.geo.leftAxisId], dy / h); return; }
    if (drag.zone === 'yright' && S.geo.rightAxisId !== null) { panY([S.geo.rightAxisId], dy / h); return; }
    if (drag.zone === 'xaxis') { panX(-dx / w); return; }
    // Sobre la gráfica: pan X siempre; pan Y solo en los ejes ya ajustados.
    if (dx !== 0) panX(-dx / w);
    const zoomedIds = Object.keys(S.yDoms);
    if (dy !== 0 && zoomedIds.length > 0) panY(zoomedIds, dy / h);
  };

  const endPointer = (e) => {
    pointers.current.delete(e.pointerId);
    pinchRef.current = null;
    if (pointers.current.size === 0) dragRef.current = null;
  };

  // ---- clonado del hijo con la ventana y los dominios ----------------------
  const mappedChildren = React.Children.map(chart.props.children, function inject(c) {
    if (Array.isArray(c)) return c.map(inject);
    if (!React.isValidElement(c)) return c;
    if (c.type === YAxis && !vertical) {
      const id = c.props.yAxisId !== undefined ? c.props.yAxisId : 0;
      const dom = yDoms[id];
      if (dom) {
        const extra = { domain: dom, allowDataOverflow: true };
        // Sin formateador propio, los ticks del dominio ajustado salen con
        // decimales larguísimos; se redondean a algo legible.
        if (!c.props.tickFormatter) {
          extra.tickFormatter = (v) => {
            const a = Math.abs(v);
            const dec = a >= 100 ? 0 : a >= 10 ? 1 : 2;
            return Number(v.toFixed(dec)).toLocaleString();
          };
        }
        return React.cloneElement(c, extra);
      }
    }
    return c;
  });

  const chartEl = React.cloneElement(chart, { data: visible }, mappedChildren);

  const touchAction = vertical ? (modified ? 'none' : 'pan-y') : 'pan-y';

  return (
    <div
      ref={rootRef}
      className={`relative select-none ${className}`}
      style={{ touchAction, minWidth, cursor: dragRef.current && dragRef.current.moved ? 'grabbing' : 'grab' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onDoubleClick={reset}
      data-testid="grafica-interactiva"
    >
      {modified && (
        <button
          type="button"
          onClick={reset}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute top-1 right-1 z-10 rounded-md border border-border bg-background/85 px-2 py-0.5 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm hover:text-foreground"
          data-testid="grafica-reiniciar"
        >
          Reiniciar
        </button>
      )}
      <ResponsiveContainer width="100%" height={height} minWidth={minWidth}>
        {chartEl}
      </ResponsiveContainer>
    </div>
  );
}
