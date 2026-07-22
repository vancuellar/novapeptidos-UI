import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from '@/components/ui/command';
import { Syringe, Droplet, FlaskConical, Search, Check, ChevronsUpDown, RotateCcw, Copy, Link2, FileDown, ShoppingBag, CalendarClock } from 'lucide-react';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { useLanguage } from '@/context/LanguageContext';

// Jeringas de insulina más comunes en México. units = ml * (units/ml).
const SYRINGES = [
  { id: 'u100', label: 'U-100 (1 mL = 100 u)', perMl: 100, maxMl: 1 },
  { id: 'u100-05', label: 'U-100 · 0.5 mL', perMl: 100, maxMl: 0.5 },
  { id: 'u100-03', label: 'U-100 · 0.3 mL', perMl: 100, maxMl: 0.3 },
];

// Productos del catálogo que se venden por mg (para pre-cargar el vial).
export const mgProducts = fallbackProducts
  .filter((p) => (p.variants || []).some((v) => /mg/i.test(v.presentation)))
  .map((p) => ({
    name: p.name,
    slug: p.slug,
    variants: p.variants.filter((v) => /mg/i.test(v.presentation)).map((v) => parseFloat(v.presentation)),
    startDose: p.start_dose,      // dosis de referencia RUO (o null)
    startUnit: p.start_unit,
    startLevels: p.start_levels,  // {inicial, tipica, avanzada, unit} o null
    startFreq: p.start_freq,      // código de frecuencia RUO (o null)
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
// Frase "para empezar" en lenguaje simple (para que la entienda cualquiera).
const START_LEAD = { es: 'Para empezar', en: 'To start', pt: 'Para começar' };
const START_APPLY = { es: 'aplica', en: 'apply', pt: 'aplique' };

const MIN_UNITS = 2;                       // menos de esto no se puede medir en la jeringa

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

const Stat = ({ icon: Icon, label, value, unit }) => (
  <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-4">
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Icon className="h-3.5 w-3.5" /> {label}</div>
    <div className="text-lg font-semibold tabular-nums">{value} <span className="text-xs font-normal text-muted-foreground">{unit}</span></div>
  </div>
);

// Jeringa de insulina realista con graduación. units = cuánto se jala; maxUnits = tope de la jeringa.
// Si `onChange` está presente, se puede arrastrar/tocar para fijar las unidades (modo interactivo).
const SyringeSVG = ({ units, maxUnits, onChange }) => {
  const VB = 380, VBH = 120;                          // viewBox
  const X0 = 46, X1 = 322, W = X1 - X0;               // barril (más grande)
  const cy = 54, top = 34, bot = 74;                  // barril alto y claro
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
      {/* aguja */}
      <line x1="6" y1={cy} x2="30" y2={cy} stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" />
      <path d={`M30 ${cy - 10} L46 ${top} L46 ${bot} L30 ${cy + 10} Z`} fill="hsl(var(--muted-foreground))" opacity="0.5" />
      {/* barril */}
      <rect x={X0} y={top} width={W} height={bot - top} rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
      {/* líquido */}
      <rect x={X0} y={top + 2} width={Math.max(0, fillW)} height={bot - top - 4} rx="4" fill="hsl(var(--primary))" opacity="0.85" />
      {/* graduación: mayor (con número), media (10/30/50/70/90) resaltada, menor */}
      {ticks.map((u) => {
        const major = u % step === 0;
        const medium = !major && u % 10 === 0;
        const len = major ? 11 : medium ? 9 : 6;
        const sw = major ? 1.6 : medium ? 1.5 : 1;
        const op = major ? 0.9 : medium ? 0.8 : 0.4;
        return <line key={u} x1={tx(u)} y1={bot} x2={tx(u)} y2={bot + len} stroke="hsl(var(--muted-foreground))" strokeWidth={sw} opacity={op} />;
      })}
      {ticks.filter((u) => u % step === 0).map((u) => (
        <text key={u} x={tx(u)} y={bot + 28} textAnchor="middle" fontSize="13" fill="hsl(var(--muted-foreground))" fontFamily="ui-monospace,monospace">{u}</text>
      ))}
      {/* émbolo */}
      <rect x={px - 3} y={top - 6} width="6" height={bot - top + 12} rx="2" fill="hsl(var(--foreground))" opacity="0.78" />
      <line x1={px} y1={cy} x2={VB - 10} y2={cy} stroke="hsl(var(--foreground))" strokeWidth="3.5" opacity="0.5" />
      <rect x={VB - 14} y={top - 12} width="8" height={bot - top + 24} rx="3" fill="hsl(var(--foreground))" opacity="0.7" />
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
  const [mode, setMode] = useState('suggest');          // 'suggest' | 'known'
  const [product, setProduct] = useState('');
  const [vialMg, setVialMg] = useState(10);
  const [waterMl, setWaterMl] = useState(2);
  const [dose, setDose] = useState(250);
  const [doseUnit, setDoseUnit] = useState('mcg');       // 'mcg' | 'mg'
  const [syringe, setSyringe] = useState(SYRINGES[0]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const currentProduct = mgProducts.find((x) => x.name === product);
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
    // agua exacta para que cada dosis ≈ 20 rayitas (cómodo de leer), dentro de [1, 5] mL
    let w = (20 * mg * 1000) / (doseMcg * syringe.perMl);
    w = Math.round(Math.min(WMAX, Math.max(WMIN, w)) * 10) / 10;   // precisión 0.1 mL
    const conc = (mg * 1000) / w;
    const drawMl = doseMcg / conc;
    const pick = { w, units: drawMl * syringe.perMl, drawMl, conc };
    // opciones redondas (1–5 mL) que caben y se miden, por si prefiere un número entero
    const rows = [1, 2, 3, 4, 5]
      .map((W) => ({ w: W, units: unitsAt(W), drawMl: (doseMcg * W) / (mg * 1000), conc: (mg * 1000) / W }))
      .filter((r) => r.units >= MIN_UNITS && r.units <= maxU);
    return { pick, rows, tooSmall, tooBig };
  }, [mg, doseMcg, syringe]);

  const pickProduct = (name, presetMg) => {
    setProduct(name);
    setPickerOpen(false);
    const p = mgProducts.find((x) => x.name === name);
    const vial = presetMg || (p && p.variants.length ? Math.min(...p.variants) : null);
    if (vial) setVialMg(vial);
    // Dosis de referencia (RUO) si existe; si no, unidad automática + valor
    // genérico ajustado para que se pueda medir en la jeringa con este vial.
    if (full && p && p.startDose != null) {
      setDoseUnit(p.startUnit === 'mg' ? 'mg' : 'mcg');
      setDose(p.startDose);
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

  // Cargar estado desde el enlace compartido (una vez)
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    if (!syncUrl) return;
    const p = params.get('p');
    if (p && mgProducts.some((x) => x.name === p)) {
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
                {mgProducts.map((p) => (
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

      <div className="grid lg:grid-cols-5 gap-5 items-start">
        {/* Entradas */}
        <Card className="p-6 space-y-5 lg:col-span-2">

          <div>
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

          {/* Agua: solo en modo "ya sé mi agua" */}
          {mode === 'known' && (
            <div>
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

          <div>
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
            {levels && (
              <div className="flex flex-wrap gap-2 mt-2" data-testid="calc-levels">
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
            {full && hasRef && <p className="text-[11px] text-muted-foreground mt-1.5">{t('calc.refNote')}</p>}
          </div>

          <div>
            <Label className="text-sm mb-1.5 block">{t('calc.syringe')}</Label>
            <Select value={syringe.id} onValueChange={(id) => setSyringe(SYRINGES.find((s) => s.id === id))}>
              <SelectTrigger data-testid="calc-syringe"><SelectValue /></SelectTrigger>
              <SelectContent>
                {SYRINGES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Registrar seguimiento de consumo (solo área de clientes) */}
          {full && onTrack && res && (
            <Button variant="outline" className="w-full" data-testid="calc-track"
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
        <Card className="p-7 flex flex-col lg:col-span-3">
          {/* Resumen en una frase: cuánto + cada cuándo (referencia RUO). */}
          {full && currentProduct?.startFreq && (parseFloat(dose) > 0) && (
            <div className="mb-5 rounded-xl border border-[hsl(var(--primary))]/40 bg-[hsl(var(--primary))]/10 p-4" data-testid="calc-plain-summary">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{START_LEAD[language] || START_LEAD.es} · RUO</div>
              <div className="text-lg leading-snug">
                {START_APPLY[language] || START_APPLY.es}{' '}
                <span className="font-bold text-[hsl(var(--primary))]">{dose} {effUnit}</span>,{' '}
                <span className="font-bold text-[hsl(var(--primary))]">{freqPhrase(currentProduct.startFreq, language)}</span>.
              </div>
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
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t('calc.addWater')}</div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-6xl font-bold tabular-nums text-[hsl(var(--primary))]" data-testid="calc-suggest-water">{suggest.pick.w}</span>
                  <span className="text-lg text-muted-foreground mb-1">mL {t('calc.ofWater')}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4" data-testid="calc-suggest-units">
                  {t('calc.thenEachDose')} <span className="font-semibold text-foreground">{suggest.pick.units.toFixed(1)} {t('calc.units')}</span> ({suggest.pick.drawMl.toFixed(3)} mL)
                </div>
                <SyringeSVG units={suggest.pick.units} maxUnits={maxUnits} />

                {/* Otras opciones de agua (tradeoff concentración) */}
                {full && (
                  <div className="mt-5">
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
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Stat icon={FlaskConical} label={t('calc.conc')} value={(suggest.pick.conc / 1000).toFixed(1)} unit="mg/mL" />
                  <Stat icon={Droplet} label={t('calc.dosesPerVial')} value={Math.floor((mg * 1000) / doseMcg)} unit={t('calc.doses')} />
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
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{t('calc.draw')}</div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-6xl font-bold tabular-nums text-[hsl(var(--primary))]" data-testid="calc-units">{known.units.toFixed(1)}</span>
                  <span className="text-lg text-muted-foreground mb-1">{t('calc.units')}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">= {known.drawMl.toFixed(3)} mL {t('calc.inSyringe')}</div>
                <SyringeSVG units={known.units} maxUnits={maxUnits} onChange={setDrawUnits} />
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <span>{t('calc.dragHint')}</span>
                  <Input type="number" min="0" step="0.5" value={Number(known.units.toFixed(1))} onChange={(e) => setDrawUnits(Number(e.target.value))}
                    data-testid="calc-units-input" className="h-8 w-20 text-sm" />
                  <span>{t('calc.units')}</span>
                </div>
                {known.overfill && <div className="text-xs text-muted-foreground mt-2">{t('calc.overfill')}</div>}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Stat icon={FlaskConical} label={t('calc.conc')} value={(known.conc / 1000).toFixed(1)} unit="mg/mL" />
                  <Stat icon={Droplet} label={t('calc.dosesPerVial')} value={known.dosesPerVial} unit={t('calc.doses')} />
                </div>
              </>
            )
          )}
          <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed">{t('calc.disclaimer')}</p>
        </Card>
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
