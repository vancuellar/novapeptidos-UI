import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Target, User, Sparkles, MessageCircle, ArrowLeft, ArrowRight, Check,
  Flame, Dumbbell, Hourglass, HeartPulse, Moon, Brain, Droplet, HeartHandshake, Zap, ShieldPlus, RotateCcw, Syringe, ChevronRight,
} from 'lucide-react';
import { fallbackProducts } from '@/data/fallbackCatalog';
import { formatMXN } from '@/lib/api';

// ── Objetivos (áreas) con sub-parámetros y péptidos recomendados (nombres reales del catálogo). ──
// El orden de `peps` es el ranking de recomendación. `combos` son stacks (para el enfoque "Stack").
const OBJECTIVES = [
  {
    id: 'peso', icon: Flame, title: 'Pérdida de peso', tag: 'Composición corporal y metabolismo',
    params: ['Saciedad y apetito', 'Grasa visceral', 'Acelerar metabolismo', 'Preservar masa magra', 'Sensibilidad a la insulina', 'Reducir antojos'],
    peps: ['Tirzepatida', 'Semaglutida', 'Retatrutida', 'Cagrilintida', 'MOTS-c', '5-AMINO-1MQ', 'AOD-9604'],
    combos: ['Cagri + Sema (2.5mg + 2.5mg)', 'Retatrutide 20mg + Tirzepatide 40mg'],
  },
  {
    id: 'composicion', icon: Dumbbell, title: 'Composición corporal', tag: 'Masa magra, fuerza y secretagogos de GH',
    params: ['Masa muscular', 'Fuerza', 'Recuperación post-entreno', 'Definición'],
    peps: ['CJC-1295 (sin DAC)', 'Ipamorelin', 'Tesamorelina', 'IGF-1 LR3', 'Sermorelina', 'GHRP-6 Acetate', 'Follistatin'],
    combos: ['CJC-1295 no DAC 5mg + Ipamorelin 5mg', 'Tesamorelin 10 + Ipamorelin 5'],
  },
  {
    id: 'longevidad', icon: Hourglass, title: 'Longevidad celular', tag: 'Anti-envejecimiento y reparación',
    params: ['Telómeros', 'Función mitocondrial', 'Sirtuinas', 'Reparación celular'],
    peps: ['Epithalon', 'NAD+', 'GHK-Cu', 'MOTS-c', 'SS-31', 'Humanin', 'Thymalin'],
    combos: ['KLOW (BPC + GHK-Cu + TB-500 + KPV)'],
  },
  {
    id: 'recuperacion', icon: HeartPulse, title: 'Recuperación y reparación tisular', tag: 'Tendones, ligamentos y articulaciones',
    params: ['Tendones y ligamentos', 'Articulaciones', 'Mucosa intestinal', 'Cicatrización'],
    peps: ['BPC-157', 'TB-500', 'GHK-Cu', 'KPV'],
    combos: ['BPC-157 5mg + TB-500 5mg', 'BPC-157 10mg + TB-500 10mg', 'GLOW (BPC-157 10mg + GHK-Cu 50mg + TB-500 10mg)'],
  },
  {
    id: 'sueno', icon: Moon, title: 'Calidad del sueño', tag: 'Ondas delta y descanso profundo',
    params: ['Sueño profundo', 'Conciliar el sueño', 'Descanso reparador'],
    peps: ['DSIP', 'Epithalon', 'Melatonina'],
    combos: [],
  },
  {
    id: 'cognicion', icon: Brain, title: 'Función cognitiva', tag: 'Memoria, enfoque y neuroplasticidad',
    params: ['Memoria', 'Enfoque', 'Neuroprotección', 'Manejo del estrés'],
    peps: ['Semax', 'Selank', 'NAD+', 'Cerebrolysin', 'P21'],
    combos: [],
  },
  {
    id: 'piel', icon: Sparkles, title: 'Piel y cabello', tag: 'Colágeno, elasticidad y densidad capilar',
    params: ['Colágeno', 'Elasticidad', 'Densidad capilar', 'Bronceado'],
    peps: ['GHK-Cu', 'AHK-Cu', 'Melanotan I', 'Matrixyl'],
    combos: ['GLOW (BPC-157 10mg + GHK-Cu 50mg + TB-500 10mg)'],
  },
  {
    id: 'libido', icon: HeartHandshake, title: 'Libido y salud sexual', tag: 'Deseo y respuesta sexual',
    params: ['Deseo', 'Respuesta sexual', 'Eje hormonal'],
    peps: ['PT-141', 'Kisspeptina-10', 'Gonadorelin Acetate', 'Oxitocina'],
    combos: [],
  },
  {
    id: 'bienestar', icon: Zap, title: 'Bienestar general', tag: 'Energía, ánimo y vitalidad',
    params: ['Energía', 'Ánimo', 'Vitalidad'],
    peps: ['NAD+', 'MOTS-c', 'Selank', 'Glutatión', 'Vitamina B12'],
    combos: [],
  },
  {
    id: 'inmunidad', icon: ShieldPlus, title: 'Inmunidad y antiinflamatorio', tag: 'Defensas y modulación inflamatoria',
    params: ['Defensas', 'Modulación inflamatoria', 'Antiviral'],
    peps: ['Thymosin Alpha-1', 'Thymalin', 'KPV', 'TB-500', 'LL-37'],
    combos: [],
  },
];

const EXPERIENCE = [
  { id: 'inicial', title: 'Principiante', desc: 'Primeras investigaciones. Dosis de referencia inicial.' },
  { id: 'tipica', title: 'Intermedio', desc: 'Con experiencia. Dosis de referencia típica.' },
  { id: 'avanzada', title: 'Avanzado', desc: 'Amplia experiencia. Rango superior de referencia.' },
];

const FOCUS = [
  { id: 'simple', title: 'Molécula simple', desc: 'Un péptido a la vez, más fácil de controlar.' },
  { id: 'stack', title: 'Stack combinado', desc: 'Combinaciones sinérgicas por objetivo.' },
];

const MAX_OBJ = 3;

// Índice del catálogo por nombre (normalizado) para resolver recomendaciones a productos reales.
const byName = {};
fallbackProducts.forEach((p) => { byName[p.name.trim().toLowerCase()] = p; });
const findProduct = (name) => byName[name.trim().toLowerCase()];

const minPrice = (p) => Math.min(...(p.variants || []).map((v) => v.price).filter((n) => Number.isFinite(n)), p.price || Infinity);

const doseText = (p, level) => {
  const L = p.start_levels;
  if (L && L[level] != null) return `${L[level]} ${L.unit}`;
  if (p.start_dose != null) return `${p.start_dose} ${p.start_unit || ''}`.trim();
  return null;
};

const Advisor = () => {
  const [mode, setMode] = useState('cuestionario');
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);        // ids de objetivos
  const [params, setParams] = useState({});            // {objId: [param,...]}
  const [experience, setExperience] = useState('inicial');
  const [focus, setFocus] = useState('simple');

  const toggleObjective = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_OBJ) return prev;
      return [...prev, id];
    });
  };
  const toggleParam = (objId, param) => {
    setParams((prev) => {
      const cur = prev[objId] || [];
      return { ...prev, [objId]: cur.includes(param) ? cur.filter((x) => x !== param) : [...cur, param] };
    });
  };

  const reset = () => { setStep(1); setSelected([]); setParams({}); setExperience('inicial'); setFocus('simple'); };
  const openChat = () => { document.querySelector('[data-testid="ai-chat-open-button"]')?.click(); };

  // ── Motor de recomendación (reglas nuestras). ──
  const results = useMemo(() => {
    return selected.map((objId) => {
      const obj = OBJECTIVES.find((o) => o.id === objId);
      const names = focus === 'stack' && obj.combos.length
        ? [...obj.combos, ...obj.peps]
        : obj.peps;
      const products = names
        .map(findProduct)
        .filter(Boolean)
        .filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i)
        .slice(0, 3);
      return { obj, products };
    });
  }, [selected, focus]);

  const canNext = step === 1 ? selected.length > 0 : true;
  const progress = Math.round((step / 3) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-[hsl(var(--primary))] mb-2">
          <Target className="h-5 w-5" />
          <span className="text-xs font-medium uppercase tracking-wide">Asesor de péptidos</span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Encuentra tu péptido</h1>
        <p className="text-sm text-muted-foreground mt-2">Responde y te sugerimos compuestos con nuestra dosis de referencia. Solo para uso en investigación (RUO).</p>
      </div>

      {/* Selector de modo */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => setMode('cuestionario')}
          className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${mode === 'cuestionario' ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/40' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}
        >
          <Target className="h-5 w-5 text-[hsl(var(--primary))] shrink-0" />
          <div><div className="text-sm font-semibold">Cuestionario</div><div className="text-xs text-muted-foreground">Sugerencia en 3 pasos</div></div>
        </button>
        <button
          onClick={openChat}
          className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-3 text-left hover:bg-[hsl(var(--muted))]/20 transition-colors"
        >
          <MessageCircle className="h-5 w-5 text-[hsl(var(--primary))] shrink-0" />
          <div><div className="text-sm font-semibold">Chat</div><div className="text-xs text-muted-foreground">Pregunta libre a la IA</div></div>
        </button>
      </div>

      {/* Barra de progreso */}
      <div className="flex items-center gap-3 mb-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${step >= n ? 'bg-[hsl(var(--primary))] text-white' : 'bg-[hsl(var(--muted))] text-muted-foreground'}`}>
            {step > n ? <Check className="h-4 w-4" /> : n}
          </div>
        ))}
        <div className="flex-1 h-1.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
          <div className="h-full bg-[hsl(var(--primary))] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">{progress}%</span>
      </div>

      {/* ── Paso 1: Objetivo ── */}
      {step === 1 && (
        <div>
          <div className="flex items-center gap-2 mb-1"><Target className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">¿Cuál es tu objetivo?</h2></div>
          <p className="text-sm text-muted-foreground mb-4">Elige hasta {MAX_OBJ} áreas. {selected.length}/{MAX_OBJ} seleccionadas.</p>
          <div className="space-y-2">
            {OBJECTIVES.map((o) => {
              const Icon = o.icon;
              const on = selected.includes(o.id);
              const dimmed = !on && selected.length >= MAX_OBJ;
              return (
                <div key={o.id} className={`rounded-xl border transition-colors ${on ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))]'} ${dimmed ? 'opacity-40' : ''}`}>
                  <button onClick={() => !dimmed && toggleObjective(o.id)} className="w-full flex items-center gap-3 p-3 text-left">
                    <Icon className="h-5 w-5 text-[hsl(var(--primary))] shrink-0" />
                    <div className="flex-1 min-w-0"><div className="text-sm font-semibold">{o.title}</div><div className="text-xs text-muted-foreground">{o.tag}</div></div>
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 ${on ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))]'}`}>{on && <Check className="h-3.5 w-3.5 text-white" />}</div>
                  </button>
                  {on && (
                    <div className="px-3 pb-3 pt-0">
                      <div className="text-xs text-muted-foreground mb-2">¿Qué te interesa más? (opcional)</div>
                      <div className="flex flex-wrap gap-2">
                        {o.params.map((param) => {
                          const psel = (params[o.id] || []).includes(param);
                          return (
                            <button key={param} onClick={() => toggleParam(o.id, param)} className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${psel ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/40'}`}>{param}</button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Paso 2: Perfil ── */}
      {step === 2 && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1"><User className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">Tu nivel de experiencia</h2></div>
            <p className="text-sm text-muted-foreground mb-4">Ajusta la dosis de referencia que te mostramos.</p>
            <div className="space-y-2">
              {EXPERIENCE.map((e) => (
                <button key={e.id} onClick={() => setExperience(e.id)} className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${experience === e.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>
                  <div className={`h-4 w-4 rounded-full border-4 shrink-0 ${experience === e.id ? 'border-[hsl(var(--primary))]' : 'border-[hsl(var(--muted))]'}`} />
                  <div><div className="text-sm font-semibold">{e.title}</div><div className="text-xs text-muted-foreground">{e.desc}</div></div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1"><Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">¿Simple o stack?</h2></div>
            <p className="text-sm text-muted-foreground mb-4">Un solo compuesto o una combinación por objetivo.</p>
            <div className="grid grid-cols-2 gap-3">
              {FOCUS.map((f) => (
                <button key={f.id} onClick={() => setFocus(f.id)} className={`rounded-xl border p-3 text-left transition-colors ${focus === f.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>
                  <div className="text-sm font-semibold">{f.title}</div><div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Paso 3: Resultado ── */}
      {step === 3 && (
        <div>
          <div className="flex items-center gap-2 mb-1"><Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">Tu sugerencia</h2></div>
          <p className="text-sm text-muted-foreground mb-5">Basada en tus objetivos y nivel <span className="font-medium">{EXPERIENCE.find((e) => e.id === experience)?.title.toLowerCase()}</span>. Dosis de referencia RUO — verifica siempre la literatura.</p>

          <div className="space-y-6">
            {results.map(({ obj, products }) => (
              <div key={obj.id}>
                <div className="flex items-center gap-2 mb-2"><obj.icon className="h-4 w-4 text-[hsl(var(--primary))]" /><h3 className="font-heading text-sm font-semibold">{obj.title}</h3></div>
                {products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sin sugerencia directa; explora la categoría en el catálogo.</p>
                ) : (
                  <div className="space-y-2">
                    {products.map((p) => {
                      const dose = doseText(p, experience);
                      const price = minPrice(p);
                      return (
                        <div key={p.slug} className="rounded-xl border border-[hsl(var(--border))] p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-sm font-semibold">{p.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{p.short_description || 'Compuesto de investigación (RUO).'}</div>
                            </div>
                            {Number.isFinite(price) && <div className="text-sm font-semibold whitespace-nowrap">Desde {formatMXN(price)}</div>}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs">
                            {dose && <span className="inline-flex items-center gap-1 text-[hsl(var(--primary))] font-medium"><Syringe className="h-3.5 w-3.5" /> Dosis ref.: {dose}</span>}
                            <Link to={`/producto/${p.slug}`} className="inline-flex items-center gap-0.5 hover:underline">Ver producto <ChevronRight className="h-3 w-3" /></Link>
                            <Link to={`/calculadora?p=${encodeURIComponent(p.name)}`} className="inline-flex items-center gap-0.5 hover:underline">Calcular reconstitución <ChevronRight className="h-3 w-3" /></Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Card className="p-4 mt-6 bg-[hsl(var(--muted))]/40 border-[hsl(var(--primary))]/30">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="text-sm"><span className="font-semibold">¿Dudas específicas?</span> Pregúntale a nuestro asistente.</div>
              <Button size="sm" variant="outline" onClick={openChat}><MessageCircle className="h-4 w-4 mr-1.5" /> Abrir chat</Button>
            </div>
          </Card>
          <p className="text-xs text-muted-foreground mt-4">Esta sugerencia es orientativa y educativa (RUO). No es consejo médico ni una prescripción.</p>
        </div>
      )}

      {/* Navegación */}
      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <Button variant="ghost" onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4 mr-1.5" /> Anterior</Button>
        ) : <span />}
        {step < 3 ? (
          <Button onClick={() => canNext && setStep(step + 1)} disabled={!canNext}>Siguiente <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
        ) : (
          <Button variant="outline" onClick={reset}><RotateCcw className="h-4 w-4 mr-1.5" /> Empezar de nuevo</Button>
        )}
      </div>
    </div>
  );
};

export default Advisor;
