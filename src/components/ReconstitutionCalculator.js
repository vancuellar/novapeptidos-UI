import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from '@/components/ui/command';
import { Syringe, Droplet, FlaskConical, Search, Check, ChevronsUpDown, RotateCcw, Copy, Link2, FileDown, ShoppingBag, CalendarClock, AlertTriangle } from 'lucide-react';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { vidaUtilDe } from '@/data/vidaUtilReconstituido';
import { useLanguage } from '@/context/LanguageContext';

// Jeringas de insulina más comunes en México. units = ml * (units/ml).
const SYRINGES = [
  { id: 'u100', label: 'U-100 (1 mL = 100 u)', perMl: 100, maxMl: 1 },
  { id: 'u100-05', label: 'U-100 · 0.5 mL', perMl: 100, maxMl: 0.5 },
  { id: 'u100-03', label: 'U-100 · 0.3 mL', perMl: 100, maxMl: 0.3 },
];

// ⛔ LAS SUGERENCIAS DE DOSIS SE ENCIENDEN POR PRODUCTO, NO EN BLOQUE.
//
// Historia (Christian, 2026-07-26, con una clienta leyendo la pantalla): las
// cifras que mostrábamos no tenían una sola fuente coherente detrás. Se auditó y
// el commit que las metió decía que la frecuencia se asignó "por CLASE de
// péptido" — se agrupó por familia y se le puso una frecuencia a cada familia,
// sin investigar producto por producto. 63 de 110 productos, cero fuentes.
//
// Se apagaron todas. Encenderlas de vuelta en bloque repetiría el error, así que
// ahora cada producto se enciende SOLO si trae `start_levels.fuente` anotada.
// Eso hace imposible que una cifra sin respaldo llegue a la pantalla: si nadie
// la investigó, no aparece. Y la fuente se muestra al cliente.
//
// Para encender un producto: investígalo, escribe sus `start_levels` (con `freq`
// por nivel si aplica) y agrega `fuente` con las URLs. Nada más.
//
// Lo que NUNCA se apagó es la aritmética: el cliente pone su vial, su agua y SU
// dosis, y la calculadora le dice cuántas rayitas. Eso es conversión de
// unidades, no una recomendación.
const tieneFuente = (p) => Boolean(p && p.start_levels && p.start_levels.fuente);

// Productos del catálogo que se venden por mg (para pre-cargar el vial).
export const mgProducts = fallbackProducts
  .filter((p) => (p.variants || []).some((v) => /mg/i.test(v.presentation)))
  .map((p) => ({
    name: p.name,
    slug: p.slug,
    variants: p.variants.filter((v) => /mg/i.test(v.presentation)).map((v) => parseFloat(v.presentation)),
    // Con el interruptor apagado el producto viaja SIN dosis ni frecuencia, así
    // que todo lo que las pinta río abajo se apaga solo. Un solo lugar que tocar.
    startDose: tieneFuente(p) ? p.start_dose : null,
    startUnit: p.start_unit,
    startLevels: tieneFuente(p) ? p.start_levels : null,  // puede traer .freq, .agua_ml y .fuente
    startFreq: tieneFuente(p) ? p.start_freq : null,
  }));

// Cada cuándo se aplica, en lenguaje llano. Referencia RUO por clase de péptido;
// no es pauta médica. El código vive en el catálogo (start_freq).
const FREQ_PHRASES = {
  weekly:      { es: '1 vez por semana',   en: 'once a week',   pt: '1 vez por semana' },
  daily:       { es: '1 vez al día',       en: 'once a day',    pt: '1 vez ao dia' },
  daily_2x:    { es: '2 veces al día (mañana y noche)', en: 'twice a day (morning and night)', pt: '2 vezes ao dia (manhã e noite)' },
  '2x_week':   { es: '2 veces por semana',  en: 'twice a week',  pt: '2 vezes por semana' },
  '3x_week':   { es: '3 veces por semana',  en: '3 times a week', pt: '3 vezes por semana' },
  eod:         { es: 'un día sí y un día no', en: 'every other day', pt: 'em dias alternados' },
  as_needed:   { es: 'solo cuando lo necesites', en: 'only when you need it', pt: 'só quando precisar' },
  daily_cycle: { es: '1 vez al día, en ciclos de 10 a 20 días', en: 'once a day, in 10–20 day cycles', pt: '1 vez ao dia, em ciclos de 10 a 20 dias' },
  mt:          { es: '1 vez al día para empezar; al lograr el tono, 1–2 por semana', en: 'once a day to start; then 1–2 times a week', pt: '1 vez ao dia para começar; depois 1–2 vezes por semana' },
};
const freqPhrase = (code, lang) => (FREQ_PHRASES[code] ? (FREQ_PHRASES[code][lang] || FREQ_PHRASES[code].es) : '');

// La frecuencia puede ser POR NIVEL, no por producto. Salió de NAD+ (2026-07-26):
// las fuentes parecían contradecirse —unas decían diaria y otras 2-3 por semana—
// pero describen FASES distintas. Al empezar se usa dosis baja y diaria; en
// mantenimiento, dosis más alta y espaciada. Guardar una sola frecuencia por
// producto no puede representar eso, y por eso el dato se veía contradictorio.
// Misma estructura en TB-500 (carga y mantenimiento).
//
// `start_levels.freq` = {inicial, tipica, avanzada}. Si no está, se usa la
// frecuencia del producto para los tres, como antes.
const freqDeNivel = (levels, nivel, freqProducto) =>
  (levels && levels.freq && levels.freq[nivel]) || freqProducto || '';

// La FASE que describe la fuente (inicio / mantenimiento). Es descripción, no
// instrucción: se dice qué fase describe la literatura para ese nivel, NUNCA
// cuánto tiempo quedarse en él ni cuándo subir — eso es titulación y la decide
// un médico. Si la fuente no habla de fases, la columna queda vacía.
const FASES = {
  inicio:        { es: 'Inicio',        en: 'Start-up',    pt: 'Início' },
  mantenimiento: { es: 'Mantenimiento', en: 'Maintenance', pt: 'Manutenção' },
  carga:         { es: 'Carga',         en: 'Loading',     pt: 'Carga' },
};
const faseDeNivel = (levels, nivel, lang) => {
  const code = levels && levels.fase && levels.fase[nivel];
  if (!code) return '';
  const f = FASES[code];
  return f ? (f[lang] || f.es) : '';
};
// Frase "para empezar" en lenguaje simple (para que la entienda cualquiera).
const START_LEAD = { es: 'Para empezar', en: 'To start', pt: 'Para começar' };
const START_APPLY = { es: 'Luego aplica', en: 'Then apply', pt: 'Depois aplique' };
// Primer paso: cuánta agua lleva el vial. Iba en otro recuadro y se perdía.
const START_WATER = { es: 'Ponle', en: 'Add', pt: 'Coloque' };
const START_WATER_TAIL = {
  es: 'de agua bacteriostática al vial.',
  en: 'of bacteriostatic water to the vial.',
  pt: 'de água bacteriostática no frasco.',
};
const START_UNITS = { es: 'rayitas', en: 'units', pt: 'risquinhos' };

const MIN_UNITS = 2;                       // menos de esto no se puede medir en la jeringa

// CUÁNTAS APLICACIONES CABEN EN UNA SEMANA, según la frecuencia del catálogo.
// Con esto y las dosis que rinde el vial sale cuánto le dura al cliente.
//
// Tres frecuencias se quedan FUERA a propósito (null): `as_needed` no tiene
// ritmo, `mt` cambia de ritmo a mitad del camino y `daily_cycle` alterna ciclos
// con descansos. En esos tres el vial se gasta a un ritmo que no podemos
// prometer, y un número inventado aquí se convierte en un consejo de compra
// equivocado. Se sigue diciendo cuántas dosis rinde, que eso sí es aritmética.
const DOSIS_POR_SEMANA = {
  weekly: 1,
  daily: 7,
  daily_2x: 14,
  '2x_week': 2,
  '3x_week': 3,
  eod: 3.5,
  as_needed: null,
  mt: null,
  daily_cycle: null,
};

// Péptidos que se dosifican en mg (GLP-1/incretinas + unos pocos). El resto va en mcg.
const MG_DOSED = /tirzepat|retatrut|semaglut|cagrilint|mazdut|survodut|liraglut|dulaglut|nad|carnit|glutat|humanin|reta|sema|tirze|klow|glow|tesamorelin|tb-500|ghk/i;
const unitFor = (name) => (MG_DOSED.test(name || '') ? 'mg' : 'mcg');
// dosis inicial neutral según unidad (solo un punto de partida, RUO)
const defaultDose = (unit) => (unit === 'mg' ? 2 : 250);
// Punto de partida MEDIBLE para péptidos sin dosis de referencia: si el default
// no alcanza ni 2 rayitas con 5 mL de agua (viales grandes, p.ej. blends de
// 80 mg), se sube a un número redondo que sí se pueda medir en la jeringa.
// Es solo aritmética de medición, no una dosis sugerida.
const measurableDefault = (unit, vialMg) => {
  const base = defaultDose(unit);
  const minMcg = 4 * (vialMg || 0);            // 2 rayitas con 5 mL en U-100
  const baseMcg = unit === 'mg' ? base * 1000 : base;
  if (!vialMg || baseMcg >= minMcg) return base;
  if (unit === 'mg') return Math.ceil((minMcg / 1000) * 2) / 2;   // a 0.5 mg
  return Math.ceil(minMcg / 50) * 50;                              // a 50 mcg
};

// Cuánta agua sugerir para ESTE vial. Es aritmética de medición, no criterio
// clínico: se busca dejar el vial en una concentración donde la dosis caiga en
// rayitas fáciles de leer.
//
// El caso que lo motivó (Christian, 2026-07-26): Paz compró NAD+ **500 mg** y la
// calculadora sugería 2 mL para todo. Eso deja 250 mg/mL, así que una dosis de
// 100 mg son 40 rayitas y cada rayita vale 2.5 mg — cualquier temblor de pulso
// pesa. Con 5 mL queda en 100 mg/mL: **los miligramos son las rayitas directo**
// (100 mg = 100 unidades) y cada rayita vale 1 mg. Las fuentes de NAD+ también
// reconstituyen con 3–5 mL, no con 2.
//
// Tope de 5 mL: es lo que caben los viales normales de 10 mL sin llenarlos.
const AGUA_MAX_ML = 5;

// ⚠️ Se apunta al VOLUMEN DE LA INYECCIÓN, no a la concentración.
// Primer intento (y error): se buscó dejar todo en 100 mg/mL para que los mg
// fueran las rayitas directo. Suena cómodo, pero en el vial de 500 mg eso daba
// 5 mL de agua y una dosis de 50 mg salía en **0.5 mL** — media jeringa por
// aplicación. Christian lo cachó de inmediato. Medir fácil no sirve de nada si
// la inyección se vuelve enorme.
//
// La regla buena: elegir el agua para que la dosis de referencia caiga cerca de
// **0.3 mL (30 rayitas)** — cómodo de inyectar y fácil de leer.
//
// OJO (corregido 2026-07-31): esta regla es el PLAN B, para los viales donde
// nadie publicó cuánta agua lleva. Cuando la fuente sí lo dice, manda la fuente
// (ver paso 1 de `aguaSugerida`). El NAD+ 500 mg estuvo en 3 mL justificado
// aquí como "lo que publica la literatura", y era falso: la propia hoja de
// paciente que cita el producto (Extension Health) dice **"500 mg / 5 mL"** por
// escrito, o sea 100 mg/mL. Los 3 mL daban 166.7 mg/mL, una concentración que
// no usa nadie en el mercado, y hacían que 50 mg fueran 30 rayitas — quien
// jalara 50 se ponía 83 mg (67% de más). Ya está en 5 mL en el catálogo.
const DRAW_OBJETIVO_ML = 0.3;

const aguaSugerida = (vialMg, p) => {
  // 1) Si la fuente dice cuánta agua lleva ESTE vial, esa manda. La fórmula de
  //    abajo es una aproximación razonable; una cifra investigada no se pisa con
  //    una aproximación. (NAD+ 500 mg: la fuente dice **5 mL** = 100 mg/mL, así
  //    los mg son las rayitas directo. El "se come la jeringa entera" ya no
  //    aplica: el nivel avanzado topa en 50 mg = 0.5 mL, media jeringa.)
  const dicha = p?.startLevels?.agua_ml?.[String(vialMg)];
  if (dicha) return dicha;

  // 2) Sin fuente: se elige el agua para que la dosis TÍPICA caiga cerca de
  //    0.3 mL (30 rayitas). Se ancla en la típica y no en la inicial porque es
  //    el centro del rango: anclar en la más baja deja la más alta fuera de la
  //    jeringa.
  const unidad = p?.startUnit || unitFor(p?.name);
  const dosis = p?.startLevels?.tipica ?? p?.startLevels?.inicial ?? p?.startDose;
  if (!vialMg || !dosis || unidad !== 'mg') return 2;   // viales chicos de mcg: 2 mL
  const ml = (vialMg * DRAW_OBJETIVO_ML) / dosis;
  return Math.min(AGUA_MAX_ML, Math.max(1, Math.round(ml * 2) / 2));   // a medios mL
};

const Stat = ({ icon: Icon, label, value, unit }) => (
  <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-4">
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Icon className="h-3.5 w-3.5" /> {label}</div>
    <div className="text-lg font-semibold tabular-nums">{value} <span className="text-xs font-normal text-muted-foreground">{unit}</span></div>
  </div>
);

// Jeringa de insulina. units = cuánto se jala; maxUnits = tope de la jeringa.
// Si `onChange` está presente, se puede arrastrar/tocar para fijar las unidades.
//
// Rediseñada el 2026-07-27 a petición de Christian ("más estilizada, más
// sofisticada"). La anterior eran tres rectángulos planos. Lo que cambia:
//   · proporciones de jeringa de verdad — barril largo y delgado, no un ladrillo
//   · cristal con degradado y un brillo arriba, en vez de un gris sólido
//   · el líquido lleva menisco (el borde curvo que hace de verdad un líquido)
//   · graduación DENTRO del barril, como en una jeringa real, y no colgando
//   · aletas para los dedos y émbolo con vástago en cruz
// La aritmética y el arrastre no se tocaron: sigue siendo el mismo cálculo.
const SyringeSVG = ({ units, maxUnits, onChange }) => {
  const uid = React.useId().replace(/:/g, '');        // ids únicos para los degradados
  const VB = 420, VBH = 132;                          // viewBox
  const X0 = 74, X1 = 330, W = X1 - X0;               // barril
  const cy = 58, top = 40, bot = 76;                  // más delgado que antes
  const svgRef = React.useRef(null);
  const interactive = typeof onChange === 'function';
  const unitsFromEvent = (e) => {
    const svg = svgRef.current; if (!svg) return null;
    const r = svg.getBoundingClientRect();
    const scale = r.width / VB;
    const frac = (e.clientX - (r.left + X0 * scale)) / (W * scale);
    return Math.max(0, Math.min(maxUnits, Math.round(frac * maxUnits)));
  };
  const handle = (e) => { const u = unitsFromEvent(e); if (u != null) onChange(u); };
  const onDown = (e) => { if (!interactive) return; e.currentTarget.setPointerCapture?.(e.pointerId); handle(e); };
  const onMove = (e) => { if (interactive && e.buttons === 1) handle(e); };
  const frac = Math.max(0, Math.min(1, units / maxUnits));
  const fillW = W * frac;
  const px = X0 + fillW;                              // borde del émbolo
  const step = maxUnits <= 30 ? 5 : maxUnits <= 50 ? 10 : 20;   // números
  const minor = maxUnits <= 30 ? 1 : maxUnits <= 50 ? 2 : 5;    // rayitas
  const ticks = [];
  for (let u = 0; u <= maxUnits + 0.001; u += minor) ticks.push(Math.round(u));
  const tx = (u) => X0 + (u / maxUnits) * W;
  return (
    <svg ref={svgRef} viewBox={`0 0 ${VB} ${VBH}`} width="100%" role="img" aria-label={`Jeringa: ${units.toFixed(1)} unidades`} data-testid="calc-fill"
      onPointerDown={onDown} onPointerMove={onMove}
      style={{ cursor: interactive ? 'ew-resize' : 'default', touchAction: 'none' }}>
      <defs>
        {/* El cristal. Con `--muted` quedaba MÁS OSCURO que la página y el barril
            se veía como una losa negra; con el color del texto a muy poca
            opacidad se lee como vidrio en tema claro y en oscuro. */}
        <linearGradient id={`vidrio-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(var(--foreground))" stopOpacity="0.10" />
          <stop offset="50%"  stopColor="hsl(var(--foreground))" stopOpacity="0.04" />
          <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.13" />
        </linearGradient>
        <linearGradient id={`liquido-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="hsl(var(--primary))" stopOpacity="0.80" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.62" />
        </linearGradient>
        {/* Recorta el líquido a la forma del barril: así el menisco no se sale
            por las esquinas redondeadas. */}
        <clipPath id={`barril-${uid}`}>
          <rect x={X0} y={top} width={W} height={bot - top} rx="7" />
        </clipPath>
      </defs>

      {/* Aguja. ⚠️ Iba con un degradado VERTICAL sobre una línea de 2 px de alto:
          el degradado la dejaba casi transparente y la aguja desaparecía. Va con
          color sólido. */}
      <line x1="12" y1={cy} x2="46" y2={cy} stroke="hsl(var(--muted-foreground))" strokeWidth="1.6"
            strokeLinecap="round" opacity="0.8" />
      <path d={`M12 ${cy + 0.8} L21 ${cy - 1.6}`} stroke="hsl(var(--muted-foreground))" strokeWidth="1.6"
            strokeLinecap="round" opacity="0.55" />
      {/* cono: de la aguja al barril, en degradado suave y no como un bloque */}
      <path d={`M46 ${cy - 3} L62 ${cy - 5} L${X0} ${top + 4} L${X0} ${bot - 4} L62 ${cy + 5} L46 ${cy + 3} Z`}
            fill="hsl(var(--muted-foreground))" opacity="0.22" />
      <path d={`M62 ${cy - 5} L${X0} ${top + 4} L${X0} ${cy} L62 ${cy}Z`} fill="#fff" opacity="0.06" />

      {/* barril de cristal */}
      <rect x={X0} y={top} width={W} height={bot - top} rx="7" fill={`url(#vidrio-${uid})`}
            stroke="hsl(var(--border))" strokeWidth="1.25" />

      <g clipPath={`url(#barril-${uid})`}>
        {/* líquido + menisco (el borde curvo de un líquido de verdad) */}
        {fillW > 0 && (
          <>
            <rect x={X0} y={top} width={fillW} height={bot - top} fill={`url(#liquido-${uid})`} />
            <ellipse cx={px} cy={cy} rx="4.5" ry={(bot - top) / 2} fill="hsl(var(--primary))" opacity="0.55" />
          </>
        )}
        {/* brillo del cristal, encima del líquido */}
        <rect x={X0} y={top + 2.5} width={W} height="4" rx="2" fill="#fff" opacity="0.14" />
      </g>

      {/* graduación DENTRO del barril, como en una jeringa real */}
      {ticks.map((u) => {
        const major = u % step === 0;
        const medium = !major && u % 10 === 0;
        const len = major ? 13 : medium ? 9 : 5.5;
        return <line key={u} x1={tx(u)} y1={top} x2={tx(u)} y2={top + len}
                     stroke="hsl(var(--foreground))" strokeWidth={major ? 1.3 : 0.9}
                     opacity={major ? 0.55 : medium ? 0.4 : 0.22} />;
      })}
      {ticks.filter((u) => u % step === 0).map((u) => (
        <text key={u} x={tx(u)} y={bot + 17} textAnchor="middle" fontSize="11" letterSpacing="0.4"
              fill="hsl(var(--muted-foreground))" fontFamily="ui-monospace,SFMono-Regular,monospace">{u}</text>
      ))}

      {/* aletas para los dedos, arriba y abajo del final del barril */}
      <rect x={X1 - 2} y={top - 8} width="6" height="9" rx="2.5" fill="hsl(var(--muted-foreground))" opacity="0.4" />
      <rect x={X1 - 2} y={bot - 1} width="6" height="9" rx="2.5" fill="hsl(var(--muted-foreground))" opacity="0.4" />
      {/* émbolo: tapón dentro del barril + vástago + apoyo del pulgar */}
      <rect x={px - 3} y={top + 1.5} width="6" height={bot - top - 3} rx="2.5" fill="hsl(var(--foreground))" opacity="0.6" />
      <line x1={px} y1={cy} x2={VB - 16} y2={cy} stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
      <rect x={VB - 18} y={top - 11} width="7" height={bot - top + 22} rx="3.5" fill="hsl(var(--foreground))" opacity="0.45" />
    </svg>
  );
};

/**
 * Calculadora de reconstitución.
 *
 * `variant='basic'` (pública): un solo modo, sin dosis de referencia, sin
 * compartir/PDF y sin ajustar la jeringa arrastrando.
 * `variant='full'` (área de clientes): todo, más los péptidos que el cliente
 * ya compró (`purchased`) y el botón para registrar seguimiento (`onTrack`).
 */
const ReconstitutionCalculator = ({ variant = 'full', purchased = [], onTrack, syncUrl = true }) => {
  const { t, language } = useLanguage();
  const full = variant === 'full';

  // ⚠️ El cliente solo debe ver SUS péptidos (orden de Christian, 2026-07-26).
  // `purchased` existía pero solo pintaba unos atajos: el selector seguía
  // listando los 195 productos del catálogo, así que a una clienta que compró
  // NAD+ y Retatrutida se le sugerían dosis de compuestos que nunca compró.
  // En el área privada la lista se acota a lo suyo; la calculadora pública
  // (variant !== 'full') sigue mostrando el catálogo, que para eso es pública.
  const listaProductos = useMemo(() => {
    if (!full || !purchased.length) return mgProducts;
    const mios = new Set(purchased.map((p) => (p.name || p).toString().toLowerCase()));
    const solo = mgProducts.filter((p) => mios.has(p.name.toLowerCase()));
    return solo.length ? solo : mgProducts;
  }, [full, purchased]);
  const [mode, setMode] = useState('suggest');          // 'suggest' | 'known'
  const [product, setProduct] = useState('');
  const [vialMg, setVialMg] = useState(10);
  const [waterMl, setWaterMl] = useState(2);
  const [dose, setDose] = useState(250);
  const [doseUnit, setDoseUnit] = useState('mcg');       // 'mcg' | 'mg'
  const [syringe, setSyringe] = useState(SYRINGES[0]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const currentProduct = listaProductos.find((x) => x.name === product);
  const currentVariants = (currentProduct?.variants || []).slice().sort((a, b) => a - b);
  const hasRef = currentProduct?.startDose != null;
  const levels = full ? currentProduct?.startLevels || null : null;
  const mcgDisabled = product && unitFor(product) === 'mg';   // péptido mg-dosado → mcg apagado
  const effUnit = mcgDisabled ? 'mg' : doseUnit;
  // Nivel de referencia activo (inicial | tipica | avanzada), derivado de la
  // dosis actual. Se guarda con el seguimiento porque la reconstitución cambia.
  const activeLevel = levels
    ? ['inicial', 'tipica', 'avanzada'].find((k) => effUnit === levels.unit && Number(dose) === levels[k]) || ''
    : '';
  const doseMcg = (parseFloat(dose) || 0) * (effUnit === 'mg' ? 1000 : 1);
  const mg = parseFloat(vialMg) || 0;

  // MODO "ya sé mi agua": rayitas a jalar
  const known = useMemo(() => {
    const ml = parseFloat(waterMl) || 0;
    if (mg <= 0 || ml <= 0 || doseMcg <= 0) return null;
    const conc = (mg * 1000) / ml;
    const drawMl = doseMcg / conc;
    const units = drawMl * syringe.perMl;
    return {
      units, drawMl, conc,
      dosesPerVial: Math.floor((mg * 1000) / doseMcg),
      fillPct: Math.min(100, (drawMl / syringe.maxMl) * 100),
      overfill: drawMl > syringe.maxMl,
      tooSmall: units < MIN_UNITS,
    };
  }, [mg, waterMl, doseMcg, syringe]);

  // MODO "sugiéreme el agua": calcula el agua EXACTA para que la dosis caiga en una lectura cómoda.
  const suggest = useMemo(() => {
    if (mg <= 0 || doseMcg <= 0) return null;
    const maxU = syringe.perMl * syringe.maxMl;
    const unitsAt = (w) => (doseMcg * w * syringe.perMl) / (mg * 1000);
    const WMIN = 1, WMAX = 5;                       // agua real (bac water hasta 10 mL, vial hasta ~5)
    const tooSmall = unitsAt(WMAX) < MIN_UNITS;     // ni con 5 mL se mide
    const tooBig = unitsAt(WMIN) > maxU;            // ni con 1 mL cabe
    // Si la FUENTE dice cuánta agua lleva este vial, esa manda — igual que en
    // aguaSugerida(). Este modo la estaba pisando con su propia aproximación:
    // NAD+ 500 mg tiene 3 mL investigados y aquí salía 2 mL (2026-07-26).
    // Una cifra investigada no se sustituye por una fórmula.
    const dicha = currentProduct?.startLevels?.agua_ml?.[String(vialMg)];
    // agua exacta para que cada dosis ≈ 20 rayitas (cómodo de leer), dentro de [1, 5] mL
    let w = dicha || (20 * mg * 1000) / (doseMcg * syringe.perMl);
    w = Math.round(Math.min(WMAX, Math.max(WMIN, w)) * 10) / 10;   // precisión 0.1 mL
    const conc = (mg * 1000) / w;
    const drawMl = doseMcg / conc;
    const pick = { w, units: drawMl * syringe.perMl, drawMl, conc };
    // opciones redondas (1–5 mL) que caben y se miden, por si prefiere un número entero
    const rows = [1, 2, 3, 4, 5]
      .map((W) => ({ w: W, units: unitsAt(W), drawMl: (doseMcg * W) / (mg * 1000), conc: (mg * 1000) / W }))
      .filter((r) => r.units >= MIN_UNITS && r.units <= maxU);
    return { pick, rows, tooSmall, tooBig };
  }, [mg, doseMcg, syringe, currentProduct, vialMg]);

  // La presentación que el cliente compró de ese producto, si la compró. Se usa
  // como arranque por defecto: no le limita las demás, solo evita que tenga que
  // corregir el gramaje cada vez que entra.
  const mgComprado = (name) => {
    const mio = purchased.find((p) => (p.name || '').toLowerCase() === (name || '').toLowerCase());
    return mio && mio.mg ? mio.mg : null;
  };

  const pickProduct = (name, presetMg) => {
    setProduct(name);
    setPickerOpen(false);
    const p = listaProductos.find((x) => x.name === name);
    const vial = presetMg || mgComprado(name)
      || (p && p.variants.length ? Math.min(...p.variants) : null);
    if (vial) {
      setVialMg(vial);
      setWaterMl(aguaSugerida(vial, p));
    }
    // SIEMPRE SE ABRE EN EL NIVEL INICIAL, NUNCA EN EL TÍPICO.
    //
    // `start_dose` no siempre es el nivel más bajo: en NAD+ vale 50 mg, que es
    // la TÍPICA, y la calculadora abría ahí. A un cliente que compra por primera
    // vez le estábamos poniendo enfrente el nivel de en medio como si fuera el
    // punto de partida. Si va a equivocarse el default, que se equivoque por
    // abajo. El cliente puede subir de nivel con un clic; lo que no puede es
    // deshacer una inyección. (Christian, 2026-07-26)
    const inicial = p?.startLevels?.inicial;
    if (full && p && (inicial != null || p.startDose != null)) {
      setDoseUnit((p.startLevels?.unit || p.startUnit) === 'mg' ? 'mg' : 'mcg');
      setDose(inicial != null ? inicial : p.startDose);
    } else {
      const u = unitFor(name);
      setDoseUnit(u);
      setDose(measurableDefault(u, vial));
    }
  };

  const applyWater = (w) => { setWaterMl(w); setMode('known'); };

  // Modo "ya sé mi agua": el usuario ajusta cuánto jala (rayitas) y se recalcula la DOSIS.
  // Concentración = vial/agua (fija); dosis y dosis-por-vial se actualizan solas.
  const setDrawUnits = (u) => {
    const water = Number(waterMl) || 0;
    if (mg <= 0 || water <= 0 || !(u >= 0)) return;
    const conc = (mg * 1000) / water;            // mcg/mL
    const newMcg = (u / syringe.perMl) * conc;    // rayitas → mL → mcg
    const val = effUnit === 'mg' ? newMcg / 1000 : newMcg;
    setDose(Number(val.toFixed(effUnit === 'mg' ? 2 : 0)));
  };

  // Resultado activo (para copiar / PDF), según el modo
  const res = mode === 'suggest'
    ? (suggest && suggest.pick && !suggest.tooBig && !suggest.tooSmall
        ? { water: suggest.pick.w, units: suggest.pick.units, drawMl: suggest.pick.drawMl, conc: suggest.pick.conc } : null)
    : (known ? { water: Number(waterMl), units: known.units, drawMl: known.drawMl, conc: known.conc } : null);
  const dosesPerVial = doseMcg ? Math.floor((mg * 1000) / doseMcg) : 0;

  // ¿CUÁNTO LE DURA EL VIAL, Y LE CONVIENE ESE TAMAÑO?
  //
  // Lo pidió Christián (2026-07-31) con este ejemplo: "un vial de 120 mg de RT,
  // si la persona toma 5 mg a la semana, le dura 24 semanas, y eso es más de la
  // vida útil del péptido ya reconstituido". Comprar el vial grande sale más
  // barato por miligramo, pero si la mitad se va a echar a perder dentro del
  // refrigerador el ahorro es falso — y eso hoy no se lo decía nadie.
  //
  // Se calcula al NIVEL QUE TIENE PUESTO, no a uno promedio: la frecuencia
  // cambia por nivel (NAD+, TB-500 tienen carga y mantenimiento), así que la
  // única duración honesta es la de la dosis que está mirando. Los tres niveles
  // salen en su propia columna de la tabla de abajo.
  const duracion = useMemo(() => {
    const codigo = freqDeNivel(levels, activeLevel, currentProduct?.startFreq);
    const porSemana = DOSIS_POR_SEMANA[codigo];
    if (!porSemana || !dosesPerVial) return null;
    const vida = vidaUtilDe(currentProduct?.slug);
    const semanas = dosesPerVial / porSemana;
    const semanasDe = (v) => Math.floor((v * 1000) / doseMcg) / porSemana;
    // La presentación MÁS GRANDE que sí se alcanza a usar a tiempo. Se prefiere
    // la mayor porque el miligramo sale más barato: la idea es que no compre de
    // menos, no empujarlo al vial chiquito.
    const cabe = currentVariants.filter((v) => semanasDe(v) <= vida.semanas);
    return {
      semanas,
      dias: semanas * 7,
      vida,
      sePasa: semanas > vida.semanas,
      sugerido: cabe.length ? cabe[cabe.length - 1] : null,
    };
  }, [levels, activeLevel, currentProduct, dosesPerVial, doseMcg, currentVariants]);

  // "24 semanas" o "9 días": debajo de dos semanas los días se leen mejor.
  const duracionTexto = (semanas) => (semanas >= 2
    ? `${Math.round(semanas)} ${t('calc.dura.weeks')}`
    : `${Math.round(semanas * 7)} ${t('calc.dura.days')}`);

  // Arranque en lo suyo (área privada): si el cliente ya compró, la calculadora
  // abre con su primer péptido y EN LA PRESENTACIÓN QUE COMPRÓ, en vez de en
  // blanco. Sigue pudiendo cambiar a cualquier otro gramaje del selector.
  const yaArranco = useRef(false);
  useEffect(() => {
    if (!full || yaArranco.current || product || !purchased.length) return;
    yaArranco.current = true;
    const primero = purchased[0];
    if (primero && primero.name) pickProduct(primero.name, primero.mg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full, purchased.length, product]);

  // Cargar estado desde el enlace compartido (una vez)
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    if (!syncUrl) return;
    const p = params.get('p');
    if (p && listaProductos.some((x) => x.name === p)) {
      setProduct(p);
      const g = (k, f) => { const v = params.get(k); if (v != null) f(v); };
      g('v', (v) => setVialMg(Number(v)));
      g('d', (v) => setDose(Number(v)));
      g('u', (v) => setDoseUnit(v === 'mg' ? 'mg' : 'mcg'));
      g('w', (v) => setWaterMl(Number(v)));
      g('s', (v) => { const sy = SYRINGES.find((x) => x.id === v); if (sy) setSyringe(sy); });
      g('m', (v) => { if (v === 'known' || v === 'suggest') setMode(v); });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareUrl = () => {
    const q = new URLSearchParams({ p: product, v: vialMg, d: dose, u: effUnit, w: res ? res.water : waterMl, s: syringe.id, m: mode });
    return `${window.location.origin}${window.location.pathname}?${q.toString()}`;
  };
  const summaryText = () => {
    const L = [`${product} — ${t('calc.title')} (RUO)`, `${t('calc.vial')}: ${vialMg} mg`, `${t('calc.dose')}: ${dose} ${effUnit}`];
    if (res) {
      L.push(`${t('calc.water')}: ${res.water} mL`);
      L.push(`${t('calc.draw')}: ${res.units.toFixed(1)} ${t('calc.units')} (${res.drawMl.toFixed(3)} mL)`);
      L.push(`${t('calc.conc')}: ${(res.conc / 1000).toFixed(1)} mg/mL · ${dosesPerVial} ${t('calc.doses')}`);
    }
    L.push('exygenlabs.com — ' + t('calc.disclaimer'));
    return L.join('\n');
  };
  const resetAll = () => {
    setProduct(''); setVialMg(10); setWaterMl(2); setDose(250); setDoseUnit('mcg'); setSyringe(SYRINGES[0]); setMode('suggest'); setPickerOpen(false);
    if (syncUrl) setParams({});
  };
  const doCopy = async () => { try { await navigator.clipboard.writeText(summaryText()); toast.success(t('calc.copied')); } catch { toast.error(t('calc.copyFail')); } };
  const doLink = async () => { try { await navigator.clipboard.writeText(shareUrl()); toast.success(t('calc.linkCopied')); } catch { toast.error(t('calc.copyFail')); } };
  const doPDF = () => window.print();

  const ActionBtn = ({ onClick, icon: Icon, label, testid }) => (
    <button type="button" onClick={onClick} data-testid={testid}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))] transition">
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );

  const maxUnits = syringe.perMl * syringe.maxMl;

  // La dosis que el cliente tiene puesta, ¿cabe en la jeringa que eligió?
  //
  // ⛔ AQUÍ NO SE SUGIERE CAMBIAR EL AGUA. (Christian, 2026-07-27)
  // La primera versión decía "ponle 3 mL y sí cabe". Christian lo paró: no
  // quiere que al cliente se le diga que le mueva al agua para que le quepa la
  // dosis. Técnicamente el agua NO cambia los miligramos que se aplican —solo
  // la concentración—, pero la salida correcta para el cliente es la que no
  // toca la preparación: jeringa más grande, o repartir la dosis en dos.
  // Y si ya trae la de 1 mL, cambiarle el agua no lo salvaría de todos modos.
  // ¿SE PUEDE MEDIR ESA DOSIS EN LA JERINGA QUE ELIGIÓ?
  //
  // Sale de la guía de preparación de researchdosing.com y es puro dato físico, no
  // criterio clínico: en una jeringa de 1 mL cada rayita impresa vale DOS unidades,
  // así que una dosis de 6 unidades no se puede medir bien ahí. En las de 0.3 y
  // 0.5 mL cada rayita vale UNA unidad.
  //
  // Es un hueco que teníamos: la calculadora decía "3 rayitas" con la U-100 de 1 mL
  // puesta por defecto y esas 3 rayitas no existen en esa jeringa.
  const RAYITA_VALE_2 = syringe.maxMl >= 1;
  const noSeMide = res && res.units > 0 && res.units < 10 && RAYITA_VALE_2
    ? { units: res.units, sugerida: SYRINGES.find((s) => s.maxMl === 0.3) }
    : null;

  const noCabe = (() => {
    if (!res || !(res.units > maxUnits)) return null;
    const total = Math.round(res.units);
    const mayorDisponible = SYRINGES.some((s) => s.perMl * s.maxMl > maxUnits && (doseMcg / res.conc) * s.perMl <= s.perMl * s.maxMl);
    // Reparto en dos: mitad y mitad, con el sobrante en la primera.
    const mitad = Math.ceil(total / 2);
    return { agua: res.water, rayitas: total, mayorDisponible, mitad, resto: total - mitad };
  })();

  return (
    <>
      {/* Péptidos que el cliente ya compró — atajo de un clic */}
      {full && purchased.length > 0 && (
        <Card className="p-4 mb-4" data-testid="calc-purchased">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <ShoppingBag className="h-3.5 w-3.5" /> {t('calc.yourPeptides')}
          </div>
          <div className="flex flex-wrap gap-2">
            {purchased.map((p) => (
              <button key={`${p.name}-${p.mg}`} type="button" onClick={() => pickProduct(p.name, p.mg)}
                data-testid="calc-purchased-chip"
                className={`px-3 py-1.5 rounded-full text-sm border transition ${product === p.name && Number(vialMg) === p.mg ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-transparent' : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]'}`}>
                {p.name}{p.mg ? ` · ${p.mg} mg` : ''}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* PASO 1 obligatorio: buscar y elegir producto */}
      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <Label className="text-sm font-medium">{t('calc.step1')}</Label>
          {product && full && (
            <div className="flex items-center gap-0.5" data-testid="calc-actions">
              <ActionBtn onClick={resetAll} icon={RotateCcw} label={t('calc.reset')} testid="calc-reset" />
              <ActionBtn onClick={doCopy} icon={Copy} label={t('calc.copy')} testid="calc-copy" />
              {syncUrl && <ActionBtn onClick={doLink} icon={Link2} label={t('calc.link')} testid="calc-link" />}
              <ActionBtn onClick={doPDF} icon={FileDown} label={t('calc.pdf')} testid="calc-pdf" />
            </div>
          )}
        </div>
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <button type="button" role="combobox" data-testid="calc-product"
              className="w-full flex items-center justify-between rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2.5 text-sm hover:border-[hsl(var(--primary))] transition">
              <span className={`flex items-center gap-2 ${product ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                <Search className="h-4 w-4 opacity-60" /> {product || t('calc.productPlaceholder')}
              </span>
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
            <Command>
              <CommandInput placeholder={t('calc.searchPlaceholder')} data-testid="calc-search" />
              <CommandList>
                <CommandEmpty>{t('calc.noResults')}</CommandEmpty>
                {listaProductos.map((p) => (
                  <CommandItem key={p.name} value={p.name} onSelect={() => pickProduct(p.name)}>
                    <Check className={`mr-2 h-4 w-4 ${product === p.name ? 'opacity-100' : 'opacity-0'}`} />
                    {p.name}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Card>

      {!product ? (
        <Card className="p-10 flex flex-col items-center justify-center text-center gap-2 text-sm text-muted-foreground" data-testid="calc-empty">
          <Syringe className="h-8 w-8 opacity-40" />
          {t('calc.pickFirst')}
        </Card>
      ) : (
      <>
      {/* Selector de modo — solo en la versión completa */}
      {full && (
        <div className="inline-flex rounded-full border border-[hsl(var(--border))] p-1 mb-6">
          {[['suggest', t('calc.modeSuggest')], ['known', t('calc.modeKnown')]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)} data-testid={`calc-mode-${id}`}
              className={`px-4 py-1.5 rounded-full text-sm transition ${mode === id ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'text-muted-foreground hover:text-foreground'}`}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ⛔ UNA SOLA COLUMNA. NO VOLVER A LAS DOS. (Christian, 2026-07-27)

          Estuvo en `grid lg:grid-cols-5`: controles en 2/5 y resultado en 3/5.
          Medido en produccion, la tarjeta izquierda daba 391 px de alto y la
          derecha 1,174 — tres veces mas. No era un detalle de estilo: los
          controles son cuatro campos cortos y el resultado se lleva el resumen,
          la jeringa, las opciones de agua, las estadisticas y la cuadricula de
          niveles. Ninguna reparticion de columnas empata eso, porque el
          contenido no es simetrico. Ya se intento taparlo haciendo la izquierda
          `sticky` (PR #119) y la queja siguio igual.

          Ahora el flujo es vertical y TODO va a lo ancho, que es justamente lo
          que Christian elogio de la cuadricula de niveles. Los campos se
          reparten en horizontal dentro de su propia tarjeta, asi que el ancho se
          aprovecha sin dejar una columna a medio llenar. */}
      <div className="space-y-5">
        {/* PASO 2 — los datos del vial, en una fila a lo ancho */}
        <Card className="p-6" data-testid="calc-controles">
          <div className="flex flex-wrap gap-5">

            <div className="flex-1 min-w-[200px]">
              <Label className="text-sm mb-1.5 block">{t('calc.vial')}</Label>
              <div className="flex flex-wrap gap-2" data-testid="calc-vial">
                {currentVariants.map((v) => (
                  <button key={v} type="button" onClick={() => setVialMg(v)} data-testid={`calc-vial-${v}`}
                    className={`px-3.5 py-1.5 rounded-full text-sm border transition ${Number(vialMg) === v ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-transparent' : 'border-[hsl(var(--border))] text-muted-foreground hover:border-[hsl(var(--primary))]'}`}>
                    {v} mg
                  </button>
                ))}
              </div>
            </div>

            {/* La jeringa manda sobre las RAYITAS de toda la cuadrícula, así que
                se elige aquí arriba y no al final. Estaba hasta abajo, después de
                la dosis: el cliente leía rayitas calculadas con una jeringa que
                quizá no era la suya. (Christian, 2026-07-26) */}
            <div className="flex-1 min-w-[220px]">
              <Label className="text-sm mb-1.5 block">{t('calc.syringe')}</Label>
              <Select value={syringe.id} onValueChange={(id) => setSyringe(SYRINGES.find((s) => s.id === id))}>
                <SelectTrigger data-testid="calc-syringe"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SYRINGES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Agua: solo en modo "ya sé mi agua" */}
            {mode === 'known' && (
              <div className="flex-1 min-w-[220px]">
                <Label className="text-sm mb-1.5 block">{t('calc.water')}</Label>
                <div className="relative">
                  <Input type="number" min="0" step="1" value={waterMl} onChange={(e) => setWaterMl(e.target.value)} data-testid="calc-water" className="pr-10" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">mL</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((w) => (
                    <button key={w} onClick={() => setWaterMl(w)} data-testid={`calc-water-${w}`}
                      className={`px-3 py-1 rounded-full text-xs border transition ${Number(waterMl) === w ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-transparent' : 'border-[hsl(var(--border))] text-muted-foreground hover:border-[hsl(var(--primary))]'}`}>
                      {w} mL
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex-1 min-w-[220px]">
              <Label className="text-sm mb-1.5 block">{t('calc.dose')}</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input type="number" min="0" value={dose} onChange={(e) => setDose(e.target.value)} data-testid="calc-dose" />
                </div>
                <div className="inline-flex rounded-md border border-[hsl(var(--border))] overflow-hidden">
                  {['mcg', 'mg'].map((u) => {
                    const disabled = u === 'mcg' && mcgDisabled;   // los mg-dosados no usan mcg
                    return (
                      <button key={u} disabled={disabled} onClick={() => !disabled && setDoseUnit(u)} data-testid={`calc-doseunit-${u}`}
                        title={disabled ? t('calc.mcgDisabled') : undefined}
                        className={`px-3 text-sm ${disabled ? 'opacity-30 cursor-not-allowed' : doseUnit === u ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'text-muted-foreground'}`}>{u}</button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Los niveles de referencia van en su propio renglón, no apretados
              dentro de la casilla de la dosis: son botones con texto largo
              ("Inicial · 2 mg") y ahí abajo se partían en dos líneas. */}
          {levels && (
            <div className="flex flex-wrap gap-2 mt-5" data-testid="calc-levels">
              {[['inicial', t('calc.lvlBasic')], ['tipica', t('calc.lvlTypical')], ['avanzada', t('calc.lvlAdvanced')]].map(([k, label]) => {
                const active = effUnit === levels.unit && Number(dose) === levels[k];
                return (
                  <button key={k} type="button" onClick={() => { setDoseUnit(levels.unit === 'mg' ? 'mg' : 'mcg'); setDose(levels[k]); }}
                    data-testid={`calc-lvl-${k}`}
                    className={`px-3 py-1.5 rounded-full text-xs border transition ${active ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-transparent' : 'border-[hsl(var(--border))] text-muted-foreground hover:border-[hsl(var(--primary))]'}`}>
                    {label} · {levels[k]} {levels.unit}
                  </button>
                );
              })}
            </div>
          )}
          {levels?.orientativa && (
            <p className="text-[11px] text-[hsl(var(--warning-foreground))] mt-2" data-testid="calc-orientative-note">
              {t('calc.orientativeNote')}
            </p>
          )}
          {full && hasRef && <p className="text-[11px] text-muted-foreground mt-2">{t('calc.refNote')}</p>}

          {/* Registrar seguimiento de consumo (solo área de clientes) */}
          {full && onTrack && res && (
            <Button variant="outline" className="mt-5 w-full sm:w-auto" data-testid="calc-track"
              onClick={() => onTrack({
                product_name: product,
                product_slug: currentProduct?.slug || '',
                vial_mg: Number(vialMg),
                dose: Number(dose),
                dose_unit: effUnit,
                water_ml: Number(res.water),
                level: activeLevel,
              })}>
              <CalendarClock className="h-4 w-4 mr-1.5" /> {t('calc.track')}
            </Button>
          )}
        </Card>

        {/* Resultado */}
        <Card className="p-7 flex flex-col">
          {/* Resumen en una frase: cuánto + cada cuándo (referencia RUO). */}
          {full && currentProduct?.startFreq && (parseFloat(dose) > 0) && (
            <div className="mb-5 rounded-xl border border-[hsl(var(--primary))]/40 bg-[hsl(var(--primary))]/10 p-4" data-testid="calc-plain-summary">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{START_LEAD[language] || START_LEAD.es} · RUO</div>
              {/* El agua va en la MISMA frase. Antes vivía en otro recuadro y
                  quedaba la duda de cuánta ponerle al vial para empezar
                  (Christian, 2026-07-26, con NAD+ 500 mg). Es el primer paso
                  real: sin reconstituir no hay dosis que aplicar. */}
              {res && res.water > 0 && (
                <div className="text-lg leading-snug mb-1">
                  {START_WATER[language] || START_WATER.es}{' '}
                  <span className="font-bold text-[hsl(var(--primary))]">{res.water} mL</span>{' '}
                  {START_WATER_TAIL[language] || START_WATER_TAIL.es}
                </div>
              )}
              <div className="text-lg leading-snug">
                {START_APPLY[language] || START_APPLY.es}{' '}
                <span className="font-bold text-[hsl(var(--primary))]">{dose} {effUnit}</span>,{' '}
                <span className="font-bold text-[hsl(var(--primary))]">{freqPhrase(freqDeNivel(levels, activeLevel, currentProduct.startFreq), language)}</span>
                {res && res.units > 0 && (
                  <> — <span className="font-bold text-[hsl(var(--primary))]">{res.units.toFixed(0)} {START_UNITS[language] || START_UNITS.es}</span></>
                )}.
              </div>
            </div>
          )}
          {/* ¿CABE LA DOSIS EN LA JERINGA? Salió del estudio de researchdosing:
              con 4 mL de agua una dosis de 12 mg de Retatrutida son 120 rayitas
              y no cabe en una U-100. Antes solo se insinuaba con un ⚠️ rojo en
              una columna de la tabla; aquí se dice con todas sus letras.
              La salida NUNCA es cambiarle el agua — ver el comentario de
              `noCabe` arriba. */}
          {noCabe && (
            <div className="mb-5 rounded-xl border border-[hsl(var(--warning-foreground))]/40 bg-[hsl(var(--warning-foreground))]/10 p-4 text-sm leading-relaxed"
                 data-testid="calc-no-cabe">
              <strong>Esta dosis no cabe en una sola jeringa.</strong>{' '}
              Son <strong>{noCabe.rayitas} rayitas</strong> y tu {syringe.label} llega a {maxUnits}.
              {' '}{noCabe.mayorDisponible
                ? <>Usa una jeringa más grande, o aplica la dosis completa en dos jeringas ({noCabe.mitad} y {noCabe.resto} rayitas).</>
                : <>Aplica la dosis completa en dos jeringas: <strong>{noCabe.mitad}</strong> y <strong>{noCabe.resto}</strong> rayitas.</>}
              {' '}No le cambies el agua al vial para que quepa.
            </div>
          )}
          {/* EL VIAL LE DURA MÁS DE LO QUE AGUANTA YA MEZCLADO.
              ⛔ Sin espantar: no se dice que "se echa a perder" ni se habla de
              perder potencia. Se dice cuánto rinde, cuánto se recomienda usarlo
              y cuál presentación le cuadra. Es una recomendación de compra, no
              una alarma sanitaria. */}
          {duracion?.sePasa && (
            <div className="mb-5 rounded-xl border border-[hsl(var(--primary))]/40 bg-[hsl(var(--primary))]/10 p-4 text-sm leading-relaxed"
                 data-testid="calc-vida-util">
              <strong>{t('calc.dura.avisoTitle')}</strong>{' '}
              {t('calc.dura.avisoBody', {
                vial: vialMg,
                dura: duracionTexto(duracion.semanas),
                vida: duracionTexto(duracion.vida.semanas),
              })}
              {' '}
              {duracion.sugerido
                ? t('calc.dura.avisoSugerido', { mg: duracion.sugerido })
                : t('calc.dura.avisoPorciones')}
              <div className="text-[11px] text-muted-foreground mt-2">
                {t('calc.dura.fuente', { fuente: duracion.vida.fuente })}
              </div>
            </div>
          )}
          {noSeMide && (
            <div className="mb-5 rounded-xl border border-[hsl(var(--warning-foreground))]/40 bg-[hsl(var(--warning-foreground))]/10 p-4 text-sm leading-relaxed"
                 data-testid="calc-no-se-mide">
              <strong>Esta dosis no se puede medir bien en esa jeringa.</strong>{' '}
              Son <strong>{noSeMide.units.toFixed(1)} rayitas</strong>, y en una jeringa de 1 mL
              cada rayita impresa vale <strong>dos</strong> unidades: las dosis de menos de 10 no
              caen en una raya.
              {noSeMide.sugerida && <> Usa la de <strong>0.3 mL</strong>, donde cada rayita vale una.</>}
            </div>
          )}
          {mode === 'suggest' ? (
            !suggest ? (
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground text-center">
                <div><Syringe className="h-8 w-8 mx-auto mb-2 opacity-40" />{t('calc.enterValues')}</div>
              </div>
            ) : (suggest.tooSmall || suggest.tooBig || !suggest.pick) ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-sm" data-testid="calc-note">
                <Syringe className="h-8 w-8 opacity-40" />
                <p className="text-muted-foreground">{suggest.tooBig ? t('calc.tooBigBody') : t('calc.tooSmallBody')}</p>
              </div>
            ) : (
              <>
                {/* A ancho completo la cifra grande y la jeringa se ponen lado a
                    lado: si se apilan, el numero de 6xl deja media pantalla
                    vacia a su derecha. */}
                <div className="grid lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t('calc.addWater')}</div>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-6xl font-bold tabular-nums text-[hsl(var(--primary))]" data-testid="calc-suggest-water">{suggest.pick.w}</span>
                      <span className="text-lg text-muted-foreground mb-1">mL {t('calc.ofWater')}</span>
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid="calc-suggest-units">
                      {t('calc.thenEachDose')} <span className="font-semibold text-foreground">{suggest.pick.units.toFixed(1)} {t('calc.units')}</span> ({suggest.pick.drawMl.toFixed(3)} mL)
                    </div>
                  </div>
                  <SyringeSVG units={suggest.pick.units} maxUnits={maxUnits} />
                </div>

                <div className="grid lg:grid-cols-2 gap-5 mt-5">
                  {/* Otras opciones de agua (tradeoff concentración) */}
                  {full && (
                    <div>
                      <div className="text-xs text-muted-foreground mb-2">{t('calc.otherWaters')}</div>
                      <div className="grid grid-cols-5 gap-2" data-testid="calc-options">
                        {suggest.rows.map((r) => (
                          <button key={r.w} onClick={() => applyWater(r.w)}
                            className={`rounded-lg border p-2 text-center transition ${r.w === suggest.pick.w ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10' : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]'}`}>
                            <div className="text-sm font-semibold">{r.w} mL</div>
                            <div className="text-[11px] text-muted-foreground">{r.units.toFixed(0)} {t('calc.units')}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className={`grid ${duracion ? 'grid-cols-3' : 'grid-cols-2'} gap-3 self-end`}>
                    <Stat icon={FlaskConical} label={t('calc.conc')} value={(suggest.pick.conc / 1000).toFixed(1)} unit="mg/mL" />
                    <Stat icon={Droplet} label={t('calc.dosesPerVial')} value={Math.floor((mg * 1000) / doseMcg)} unit={t('calc.doses')} />
                    {duracion && (
                      <Stat icon={CalendarClock} label={t('calc.dura.label')}
                        value={duracion.semanas >= 2 ? Math.round(duracion.semanas) : Math.round(duracion.dias)}
                        unit={duracion.semanas >= 2 ? t('calc.dura.weeks') : t('calc.dura.days')} />
                    )}
                  </div>
                </div>

              </>
            )
          ) : (
            /* MODO ya sé mi agua */
            !known ? (
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground text-center">
                <div><Syringe className="h-8 w-8 mx-auto mb-2 opacity-40" />{t('calc.enterValues')}</div>
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t('calc.draw')}</div>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-6xl font-bold tabular-nums text-[hsl(var(--primary))]" data-testid="calc-units">{known.units.toFixed(1)}</span>
                      <span className="text-lg text-muted-foreground mb-1">{t('calc.units')}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">= {known.drawMl.toFixed(3)} mL {t('calc.inSyringe')}</div>
                  </div>
                  <div>
                    <SyringeSVG units={known.units} maxUnits={maxUnits} onChange={setDrawUnits} />
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <span>{t('calc.dragHint')}</span>
                      <Input type="number" min="0" step="0.5" value={Number(known.units.toFixed(1))} onChange={(e) => setDrawUnits(Number(e.target.value))}
                        data-testid="calc-units-input" className="h-8 w-20 text-sm" />
                      <span>{t('calc.units')}</span>
                    </div>
                  </div>
                </div>
                {/* Rebase de jeringa: era letra chiquita gris y nadie la veía — es
                    justo el error que llena la jeringa dos veces sin darse cuenta.
                    Ahora es una alarma ámbar con el número exacto del faltante. */}
                {known.overfill && (
                  <div className="mt-3 rounded-lg border border-amber-500/50 bg-amber-500/10 px-3 py-2.5 flex items-start gap-2" data-testid="calc-overfill-warning">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-semibold text-amber-600 dark:text-amber-400">{t('calc.overfillTitle')}</span>{' '}
                      <span className="text-muted-foreground">
                        {t('calc.overfillDetail', {
                          necesita: known.drawMl.toFixed(2),
                          cabe: syringe.maxMl,
                        })} {t('calc.overfill')}
                      </span>
                    </div>
                  </div>
                )}
                <div className={`grid ${duracion ? 'grid-cols-3 lg:max-w-[760px]' : 'grid-cols-2 lg:max-w-[560px]'} gap-3 mt-4`}>
                  <Stat icon={FlaskConical} label={t('calc.conc')} value={(known.conc / 1000).toFixed(1)} unit="mg/mL" />
                  <Stat icon={Droplet} label={t('calc.dosesPerVial')} value={known.dosesPerVial} unit={t('calc.doses')} />
                  {duracion && (
                    <Stat icon={CalendarClock} label={t('calc.dura.label')}
                      value={duracion.semanas >= 2 ? Math.round(duracion.semanas) : Math.round(duracion.dias)}
                      unit={duracion.semanas >= 2 ? t('calc.dura.weeks') : t('calc.dura.days')} />
                  )}
                </div>
              </>
            )
          )}
          <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed">{t('calc.disclaimer')}</p>
        </Card>

        {/* ⚠️ Esta cuadrícula decía "va a ancho completo" y era mentira: seguía
            DENTRO de la tarjeta de resultados, o sea dentro de la columna de 3/5.
            Por eso la tarjeta derecha medía 1,174 px contra 391 de la izquierda —
            la tabla entera colgaba de ella. Ahora sí es hermana de la tarjeta,
            fuera de las dos columnas (que además ya no existen). Un comentario no
            mueve un elemento; hay que medirlo. (2026-07-27) */}
        {full && levels && (
          <Card className="p-0 overflow-hidden" data-testid="calc-tabla-niveles">
            <div className="bg-[hsl(var(--secondary))] px-5 py-3 text-sm">
              Tu vial de <strong>{vialMg} mg</strong> con <strong>{res ? res.water : waterMl} mL</strong> de agua bacteriostática
              {' '}queda en <strong>{(vialMg / (Number(res ? res.water : waterMl) || 1)).toFixed(1)} mg/mL</strong>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))] text-muted-foreground">
                    <th className="text-left px-5 py-2.5 font-medium text-[11px] uppercase tracking-wider">Nivel</th>
                    <th className="text-left px-5 font-medium text-[11px] uppercase tracking-wider">Fase</th>
                    <th className="text-right px-5 font-medium text-[11px] uppercase tracking-wider">Dosis</th>
                    <th className="text-right px-5 font-medium text-[11px] uppercase tracking-wider">Rayitas</th>
                    <th className="text-right px-5 font-medium text-[11px] uppercase tracking-wider whitespace-nowrap">Cada cuándo</th>
                    {/* Aquí es donde se ve la escalera completa: al subir de nivel
                        el vial se gasta más rápido, y con la frecuencia cambiando
                        por nivel la cuenta no es proporcional. */}
                    <th className="text-right px-5 font-medium text-[11px] uppercase tracking-wider whitespace-nowrap">{t('calc.dura.label')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[['inicial', t('calc.lvlBasic')], ['tipica', t('calc.lvlTypical')], ['avanzada', t('calc.lvlAdvanced')]].map(([k, label]) => {
                    const agua = Number(res ? res.water : waterMl) || 1;
                    const conc = vialMg / agua;                       // mg/mL
                    const mgNivel = levels.unit === 'mg' ? levels[k] : levels[k] / 1000;
                    const rayitas = Math.round((mgNivel / conc) * syringe.perMl);
                    const cabe = rayitas <= syringe.perMl * syringe.maxMl;
                    // El nivel que el cliente tiene puesto se resalta: si no, hay
                    // que adivinar cuál de los tres renglones es el suyo.
                    const activo = k === activeLevel;
                    return (
                      <tr key={k}
                          className={`border-b border-[hsl(var(--border))]/50 last:border-0 ${activo ? 'bg-[hsl(var(--primary))]/10' : ''}`}
                          data-testid={`calc-fila-${k}`}>
                        <td className="px-5 py-3">
                          <span className={activo ? 'font-semibold text-[hsl(var(--primary))]' : ''}>{label}</span>
                        </td>
                        <td className="px-5 text-muted-foreground">{faseDeNivel(levels, k, language) || '—'}</td>
                        <td className="text-right px-5 tabular-nums font-medium whitespace-nowrap">{levels[k]} {levels.unit}</td>
                        <td className={`text-right px-5 tabular-nums font-semibold ${cabe ? '' : 'text-red-600'}`}>
                          {rayitas}{cabe ? '' : ' ⚠️'}
                        </td>
                        <td className="text-right px-5 text-muted-foreground whitespace-nowrap">
                          {freqPhrase(freqDeNivel(levels, k, currentProduct?.startFreq), language) || '—'}
                        </td>
                        {(() => {
                          const porSemana = DOSIS_POR_SEMANA[freqDeNivel(levels, k, currentProduct?.startFreq)];
                          const dosisNivel = Math.floor(vialMg / mgNivel);
                          if (!porSemana || !dosisNivel) return <td className="text-right px-5 text-muted-foreground">—</td>;
                          const semanas = dosisNivel / porSemana;
                          const pasa = semanas > vidaUtilDe(currentProduct?.slug).semanas;
                          return (
                            <td className={`text-right px-5 tabular-nums whitespace-nowrap ${pasa ? 'text-[hsl(var(--warning-foreground))]' : 'text-muted-foreground'}`}
                                data-testid={`calc-dura-${k}`}>
                              {duracionTexto(semanas)}
                            </td>
                          );
                        })()}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* De dónde salió cada cifra. Va a la vista a propósito: la razón por
                la que estas sugerencias estuvieron apagadas es que nadie podía
                saber en qué se basaban. Si un producto no trae fuente anotada, se
                dice — es preferible el hueco a la falsa confianza. */}
            {/* DOSIS DERIVADA: se avisa en su propio renglón y en color, no escondido en
                la letra chica de la fuente. Es la diferencia entre "esto lo reporta
                alguien" y "esto lo dedujimos nosotros", y el cliente tiene que poder
                notarla de un vistazo. (Christian, 2026-07-27) */}
            {levels.derivada && (
              <div className="px-5 py-3 text-xs leading-relaxed border-t border-[hsl(var(--warning-foreground))]/40 bg-[hsl(var(--warning-foreground))]/10"
                   data-testid="calc-dosis-derivada">
                <strong>Estas cifras son una derivación nuestra, no un dato publicado.</strong>{' '}
                Para este compuesto no encontramos ninguna pauta humana publicada — ni ensayo,
                ni ficha de farmacia, ni manual de dosificación. Los demás productos del
                catálogo citan su fuente; este no puede.
              </div>
            )}
            <div className="px-5 py-3 text-xs text-muted-foreground leading-relaxed border-t border-[hsl(var(--border))]">
              {levels.fuente
                ? <>Fuente: {levels.fuente}</>
                : <span className="text-[hsl(var(--warning-foreground))]">Sin fuente anotada para este producto.</span>}
              {' · '}Referencia de investigación (RUO), no es una pauta médica.
              Consulta a un médico y hazte análisis antes de decidir cualquier dosis.
            </div>
            {/* "¿Y CUÁNDO PASO AL SIGUIENTE NIVEL?" — la pregunta que siempre sigue.
                Antes se contestaba solo con "eso lo decide un médico" y ahí se
                cortaba. Christian lo cambió (2026-07-27): decir que lo IDEAL es el
                médico, pero no dejar el hueco — el hueco lo llena el cliente
                inventando, o se va a copiarlo de un foro sin saber quién lo firma.

                Por eso las referencias salen CON NOMBRE Y APELLIDO y con su nivel
                de respaldo a la vista: un ensayo publicado no vale lo mismo que un
                manual de vendedores, y el cliente tiene que poder notar cuál es
                cuál. Si un producto no trae `titulacion` anotada no se inventa: se
                queda solo el párrafo del médico. Misma regla que `fuente`. */}
            <div className="px-5 py-3 text-xs leading-relaxed border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40"
                 data-testid="calc-titulacion">
              {/* ⛔ NO ESCRIBIR "TITULACIÓN". (Christian, 2026-07-27)
                  Es el término médico correcto, pero al cliente le suena a química de
                  laboratorio. Se dice en llano: "cuándo subir la dosis". */}
              <strong>Cuándo subir la dosis: lo ideal es que lo decida un médico</strong>{' '}
              con tus análisis en la mano. Depende de ti, no de una tabla. Descarga esta
              ficha y llévasela.
              {Array.isArray(levels.titulacion) && levels.titulacion.length > 0 && (
                <>
                  {' '}Mientras tanto, como <strong>referencia</strong>, esto es lo que
                  reporta cada fuente:
                  <ul className="mt-2 space-y-1.5" data-testid="calc-titulacion-fuentes">
                    {levels.titulacion.map((r) => (
                      <li key={r.quien} className="flex gap-2">
                        <span className="text-[hsl(var(--primary))]">•</span>
                        <span>
                          <strong>{r.quien}:</strong> {r.dice}
                          {r.aviso && <span className="text-[hsl(var(--warning-foreground))]"> ⚠️ {r.aviso}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Card>
        )}
      </div>
      </>
      )}

      {/* Resumen imprimible (solo se ve al imprimir / Guardar como PDF) */}
      {full && (
        <div id="calc-print">
          <div className="cp-brand">Exygen Labs</div>
          <h2>{t('calc.title')}</h2>
          {product && (
            <div className="cp-rows">
              <div><span>{t('calc.product')}</span><b>{product}</b></div>
              <div><span>{t('calc.vial')}</span><b>{vialMg} mg</b></div>
              <div><span>{t('calc.dose')}</span><b>{dose} {effUnit}</b></div>
              {res && <div><span>{t('calc.water')}</span><b>{res.water} mL</b></div>}
              {res && <div className="cp-hi"><span>{t('calc.draw')}</span><b>{res.units.toFixed(1)} {t('calc.units')} ({res.drawMl.toFixed(3)} mL)</b></div>}
              <div><span>{t('calc.syringe')}</span><b>{syringe.label}</b></div>
              {res && <div><span>{t('calc.conc')}</span><b>{(res.conc / 1000).toFixed(1)} mg/mL</b></div>}
              {res && <div><span>{t('calc.dosesPerVial')}</span><b>{dosesPerVial} {t('calc.doses')}</b></div>}
            </div>
          )}
          <p className="cp-ruo">{t('calc.disclaimer')}</p>
          <p className="cp-src">exygenlabs.com</p>
        </div>
      )}
      <style>{`
        #calc-print{display:none}
        @media print{
          body *{visibility:hidden !important}
          #calc-print,#calc-print *{visibility:visible !important}
          #calc-print{display:block !important;position:absolute;left:0;top:0;width:100%;padding:40px;color:#111;font-family:ui-sans-serif,system-ui,sans-serif}
          #calc-print .cp-brand{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#0E7C6B;font-weight:700}
          #calc-print h2{font-size:24px;margin:4px 0 20px}
          #calc-print .cp-rows{border-top:2px solid #0E7C6B;max-width:520px}
          #calc-print .cp-rows>div{display:flex;justify-content:space-between;gap:24px;padding:10px 2px;border-bottom:1px solid #e5e5e5;font-size:14px}
          #calc-print .cp-rows>div span{color:#555}
          #calc-print .cp-rows>div b{font-variant-numeric:tabular-nums}
          #calc-print .cp-hi b{color:#0E7C6B;font-size:17px}
          #calc-print .cp-ruo{max-width:520px;margin-top:20px;font-size:11px;color:#666;line-height:1.5}
          #calc-print .cp-src{font-size:12px;color:#0E7C6B;font-weight:600;margin-top:4px}
        }
      `}</style>
    </>
  );
};

export default ReconstitutionCalculator;
