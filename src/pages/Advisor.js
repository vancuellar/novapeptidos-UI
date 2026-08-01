import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Target, User, Sparkles, MessageCircle, ArrowLeft, ArrowRight, Check, Wallet, HeartPulse as Health,
  Flame, Dumbbell, Hourglass, HeartPulse, Moon, Brain, Droplet, HeartHandshake, Zap, ShieldPlus,
  RotateCcw, Syringe, ChevronRight, ShoppingCart, CalendarDays, AlertTriangle, Ban, TrendingDown,
  TrendingUp, ClipboardList, Copy,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatMXN } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import {
  OBJECTIVES, EXPERIENCE, FOCUS, DURATIONS, BUDGETS, CONDITIONS, MAX_OBJ, SEX, AGE, ACTIVITY, SLEEP, DIET, HABITS, buildPlan,
} from '@/data/advisorPlan';

const ICONS = { Flame, Dumbbell, Hourglass, HeartPulse, Moon, Brain, Sparkles, HeartHandshake, Zap, ShieldPlus, Droplet };

const PRIORITY_LABEL = { esencial: 'Esencial', recomendado: 'Recomendado', opcional: 'Opcional' };
const PRIORITY_STYLE = {
  esencial: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
  recomendado: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  opcional: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-border',
};

const STEPS = ['Objetivo', 'Perfil', 'Presupuesto y salud'];

const Section = ({ icon: Icon, title, children, tone }) => (
  <Card className={`p-5 ${tone === 'danger' ? 'border-[hsl(var(--destructive))]/40' : tone === 'warn' ? 'border-[hsl(var(--warning-border))]' : ''}`}>
    <h3 className="font-heading font-semibold flex items-center gap-2 mb-3">
      <Icon className={`h-4 w-4 ${tone === 'danger' ? 'text-[hsl(var(--destructive))]' : 'text-[hsl(var(--primary))]'}`} /> {title}
    </h3>
    {children}
  </Card>
);

const Advisor = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  // ATAJO: /asesor?rapido=1 (Christián, 2026-07-31).
  //
  // El botón del hero de la portada entra por aquí. Se midió el 31 de julio: el
  // "Plan rápido" son 2 toques y 2.1 segundos hasta un plan con tres productos,
  // precio, dosis y "Agregar todo al carrito"; la ruta larga son 67 opciones en
  // tres pasos. El problema era que el botón del atajo sólo APARECÍA después de
  // elegir un objetivo, así que quien llegaba de fuera ni sabía que existía.
  //
  // Con `?rapido=1` el botón se ve desde el primer momento (apagado hasta que se
  // elija un objetivo) y arriba se explica en un renglón qué hay que hacer. El
  // resto del asesor no cambia: sin el parámetro, todo se comporta igual que antes.
  const [searchParams] = useSearchParams();
  const modoRapido = searchParams.get('rapido') === '1';

  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);          // ids de objetivos
  const [params, setParams] = useState({});              // {objId: [param,...]}
  const [experience, setExperience] = useState('inicial');
  const [focus, setFocus] = useState('simple');
  const [weeks, setWeeks] = useState(8);
  const [budget, setBudget] = useState('medio');
  const [conditions, setConditions] = useState([]);
  const [sex, setSex] = useState('na');
  const [age, setAge] = useState('30-44');
  const [activity, setActivity] = useState('ligero');
  const [sleep, setSleep] = useState('buena');
  const [diet, setDiet] = useState('equilibrada');
  const [habits, setHabits] = useState(['ninguno']);
  const toggleHabit = (id) => setHabits((prev) => {
    if (id === 'ninguno') return prev.includes('ninguno') ? [] : ['ninguno'];
    const next = prev.filter((x) => x !== 'ninguno');
    return next.includes(id) ? next.filter((x) => x !== id) : [...next, id];
  });
  const [notes, setNotes] = useState('');
  const [excluded, setExcluded] = useState([]);          // slugs que el usuario desmarcó

  const toggleObjective = (id) => setSelected((prev) => {
    if (prev.includes(id)) return prev.filter((x) => x !== id);
    return prev.length >= MAX_OBJ ? prev : [...prev, id];
  });

  const toggleParam = (objId, param) => setParams((prev) => {
    const cur = prev[objId] || [];
    return { ...prev, [objId]: cur.includes(param) ? cur.filter((x) => x !== param) : [...cur, param] };
  });

  // "Ninguna" es excluyente con el resto.
  const toggleCondition = (id) => setConditions((prev) => {
    if (id === 'ninguna') return prev.includes('ninguna') ? [] : ['ninguna'];
    const next = prev.filter((x) => x !== 'ninguna');
    return next.includes(id) ? next.filter((x) => x !== id) : [...next, id];
  });

  const reset = () => {
    setStep(1); setSelected([]); setParams({}); setExperience('inicial'); setFocus('simple');
    setWeeks(8); setBudget('medio'); setConditions([]); setNotes(''); setExcluded([]);
    setSex('na'); setAge('30-44'); setActivity('ligero'); setSleep('buena'); setDiet('equilibrada'); setHabits(['ninguno']);
  };

  const openChat = () => document.querySelector('[data-testid="ai-chat-open-button"]')?.click();

  const plan = useMemo(
    () => (selected.length ? buildPlan({ selected, experience, focus, weeks, budget, conditions, sex, age, activity, sleep, diet, habits }) : null),
    [selected, experience, focus, weeks, budget, conditions, sex, age, activity, sleep, diet, habits],
  );

  const included = plan ? plan.chosen.filter((c) => !excluded.includes(c.product.slug)) : [];
  const includedTotal = included.reduce((s, c) => s + c.cycleCost, 0);

  const addPlanToCart = () => {
    if (!included.length) { toast.error('Selecciona al menos un compuesto'); return; }
    included.forEach((c) => {
      const hasVariants = (c.product.variants || []).length > 0;
      // El id que va al carrito DEBE existir en el catálogo real: usamos el id o el
      // SKU de la presentación. Antes se inventaba "id::5 mg", el backend no lo
      // encontraba al cobrar y el producto se saltaba su tope (bug, 2026-07-25).
      addItem(hasVariants ? {
        ...c.product,
        id: c.variant.id || c.variant.sku || c.product.id,
        sku: c.variant.sku || c.product.sku,
        name: `${c.product.name} ${c.variant.presentation}`,
        price: c.variant.price,
        presentation: c.variant.presentation,
        stock: c.variant.stock,
      } : c.product, c.vials);
    });
    navigate('/carrito');
  };

  const copyPlan = async () => {
    const lines = [
      `Mi plan Exygen — ${plan.weeks} semanas`,
      plan.strategy,
      '',
      ...included.map((c) => `• ${c.product.name} ${c.variant.presentation} — ${c.dose ? `${c.dose.text}, ` : ''}${c.frequency} · ${c.vials} vial(es) · ${formatMXN(c.cycleCost)}`),
      '',
      `Total del ciclo: ${formatMXN(includedTotal)}`,
      'exygenlabs.com — material exclusivo para investigación (RUO).',
    ];
    try { await navigator.clipboard.writeText(lines.join('\n')); toast.success('Plan copiado'); }
    catch { toast.error('No se pudo copiar'); }
  };

  const canNext = step === 1 ? selected.length > 0 : step === 3 ? conditions.length > 0 : true;
  const progress = Math.round((Math.min(step, 3) / 3) * 100);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-[hsl(var(--primary))] mb-2">
          <Target className="h-5 w-5" />
          <span className="text-xs font-medium uppercase tracking-wide">Asesor de péptidos</span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Arma tu plan</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
          Responde tres pasos y te armamos un plan completo con compuestos, duración, viales y costo.
          Todo es material exclusivo para investigación (RUO).
        </p>
      </div>

      {step <= 3 && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-3 rounded-xl border border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/40 p-3">
              <Target className="h-5 w-5 text-[hsl(var(--primary))] shrink-0" />
              <div><div className="text-sm font-semibold">Cuestionario</div><div className="text-xs text-muted-foreground">Tu plan en 3 pasos</div></div>
            </div>
            <button onClick={openChat} data-testid="advisor-open-chat"
              className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-3 text-left hover:bg-[hsl(var(--muted))]/20 transition-colors">
              <MessageCircle className="h-5 w-5 text-[hsl(var(--primary))] shrink-0" />
              <div><div className="text-sm font-semibold">Chat</div><div className="text-xs text-muted-foreground">Pregunta libre a la IA</div></div>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-2">
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
          <p className="text-xs text-muted-foreground mb-6">Paso {step} de 3: {STEPS[step - 1]}</p>
        </>
      )}

      {/* ── Paso 1: Objetivo ── */}
      {step === 1 && (
        <div>
          <div className="flex items-center gap-2 mb-1"><Target className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">¿Cuál es tu objetivo?</h2></div>
          <div className="flex items-center justify-between mb-1 gap-3">
            <p className="text-sm text-muted-foreground">Elige hasta {MAX_OBJ} áreas. {selected.length}/{MAX_OBJ} seleccionadas.</p>
            {(selected.length > 0 || modoRapido) && (
              <button onClick={() => selected.length && setStep(4)} disabled={!selected.length} data-testid="advisor-simple-mode"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--primary))] text-[hsl(var(--primary))] text-xs font-semibold px-3 py-1.5 hover:bg-[hsl(var(--primary))] hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[hsl(var(--primary))]">
                <Zap className="h-3.5 w-3.5" /> Plan rápido
              </button>
            )}
          </div>
          {modoRapido && (
            <p className="text-xs text-[hsl(var(--primary))] font-medium mb-1" data-testid="advisor-hint-rapido">
              Atajo: toca tu objetivo y luego «Plan rápido». Son dos toques y ya tienes tu plan con precios.
            </p>
          )}
          <p className="text-[11px] text-muted-foreground mb-4">Modo simple: plan al instante con valores estándar (nivel principiante, 8 semanas). Para afinar dosis, presupuesto y salud, sigue los 3 pasos.</p>
          <div className="space-y-2">
            {OBJECTIVES.map((o) => {
              const Icon = ICONS[o.iconKey] || Sparkles;
              const on = selected.includes(o.id);
              const dimmed = !on && selected.length >= MAX_OBJ;
              return (
                <div key={o.id} className={`rounded-xl border transition-colors ${on ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))]'} ${dimmed ? 'opacity-40' : ''}`}>
                  <button onClick={() => !dimmed && toggleObjective(o.id)} data-testid="advisor-objective" className="w-full flex items-center gap-3 p-3 text-left">
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
                <button key={e.id} onClick={() => setExperience(e.id)} data-testid="advisor-experience"
                  className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${experience === e.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>
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
                <button key={f.id} onClick={() => setFocus(f.id)} data-testid="advisor-focus"
                  className={`rounded-xl border p-3 text-left transition-colors ${focus === f.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>
                  <div className="text-sm font-semibold">{f.title}</div><div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1"><CalendarDays className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">¿Cuánto quieres que dure?</h2></div>
            <p className="text-sm text-muted-foreground mb-4">Con esto calculamos cuántos viales necesitas y cuánto cuesta el ciclo.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DURATIONS.map((d) => (
                <button key={d.id} onClick={() => setWeeks(d.id)} data-testid="advisor-duration"
                  className={`rounded-xl border p-3 text-left transition-colors ${weeks === d.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>
                  <div className="text-sm font-semibold">{d.title}</div><div className="text-xs text-muted-foreground mt-0.5">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Estilo de vida — personaliza el plan */}
          <div>
            <div className="flex items-center gap-2 mb-1"><ClipboardList className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">Tu estilo de vida</h2></div>
            <p className="text-sm text-muted-foreground mb-4">Nos ayuda a afinar las recomendaciones y las advertencias. Nada de esto es obligatorio.</p>

            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold mb-2">Sexo biológico</div>
                <div className="grid grid-cols-3 gap-2">
                  {SEX.map((o) => (
                    <button key={o.id} onClick={() => setSex(o.id)} data-testid="advisor-sex"
                      className={`rounded-lg border px-2 py-2 text-xs transition-colors ${sex === o.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30 font-semibold' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>{o.title}</button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold mb-2">Edad</div>
                <div className="grid grid-cols-4 gap-2">
                  {AGE.map((o) => (
                    <button key={o.id} onClick={() => setAge(o.id)} data-testid="advisor-age"
                      className={`rounded-lg border px-2 py-2 text-xs transition-colors ${age === o.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30 font-semibold' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>{o.title}</button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold mb-2">Nivel de actividad física</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ACTIVITY.map((o) => (
                    <button key={o.id} onClick={() => setActivity(o.id)} data-testid="advisor-activity"
                      className={`rounded-lg border p-2.5 text-left transition-colors ${activity === o.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>
                      <div className="text-xs font-semibold">{o.title}</div><div className="text-[11px] text-muted-foreground">{o.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="text-xs font-semibold mb-2">¿Cómo duermes?</div>
                  <div className="grid grid-cols-3 gap-2">
                    {SLEEP.map((o) => (
                      <button key={o.id} onClick={() => setSleep(o.id)} data-testid="advisor-sleep"
                        className={`rounded-lg border px-2 py-2 text-xs transition-colors ${sleep === o.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30 font-semibold' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>{o.title}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold mb-2">Tu alimentación</div>
                  <div className="grid grid-cols-2 gap-2">
                    {DIET.map((o) => (
                      <button key={o.id} onClick={() => setDiet(o.id)} data-testid="advisor-diet"
                        className={`rounded-lg border px-2 py-2 text-xs transition-colors ${diet === o.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30 font-semibold' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>{o.title}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold mb-2">Hábitos (marca los que apliquen)</div>
                <div className="flex flex-wrap gap-2">
                  {HABITS.map((o) => {
                    const on = habits.includes(o.id);
                    return (
                      <button key={o.id} onClick={() => toggleHabit(o.id)} data-testid="advisor-habit"
                        className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${on ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/40'}`}>{o.title}</button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Paso 3: Presupuesto y salud ── */}
      {step === 3 && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1"><Wallet className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">Tu presupuesto</h2></div>
            <p className="text-sm text-muted-foreground mb-4">Define cuántos compuestos entran al plan.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BUDGETS.map((b) => (
                <button key={b.id} onClick={() => setBudget(b.id)} data-testid="advisor-budget"
                  className={`rounded-xl border p-3 text-left transition-colors ${budget === b.id ? 'border-[hsl(var(--primary))] bg-[hsl(var(--muted))]/30' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/20'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold">{b.title}</div>
                    <Badge className="bg-[hsl(var(--muted))] text-muted-foreground border border-border text-[10px]">hasta {b.max}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{b.suffix} · {b.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1"><Health className="h-4 w-4 text-[hsl(var(--primary))]" /><h2 className="font-heading text-lg font-semibold">Información de salud</h2></div>
            <p className="text-sm text-muted-foreground mb-4">Marca al menos una opción. Solo la usamos para mostrarte las advertencias que te aplican; no sale de tu navegador.</p>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((c) => {
                const on = conditions.includes(c.id);
                return (
                  <button key={c.id} onClick={() => toggleCondition(c.id)} data-testid="advisor-condition"
                    className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${on ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]/40'}`}>
                    {c.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold mb-1">Algo más que debamos saber</h2>
            <p className="text-sm text-muted-foreground mb-3">Opcional. Si nos escribes tu meta concreta, el chat puede afinar mejor la conversación.</p>
            <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={280} data-testid="advisor-notes"
              placeholder="Ej. quiero bajar 8 kg, o recuperar de una tendinitis de hombro..." />
          </div>
        </div>
      )}

      {/* ── Paso 4: EL PLAN ── */}
      {step === 4 && plan && (
        <div className="space-y-5">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold">Tu plan está listo</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {plan.objectives.map((o) => o.title).join(' · ')} · nivel {EXPERIENCE.find((e) => e.id === experience)?.title.toLowerCase()}
            </p>
          </div>

          <Section icon={Target} title="La estrategia">
            <p className="text-sm leading-relaxed">{plan.strategy}</p>
          </Section>

          {plan.lifestyleNotes && plan.lifestyleNotes.length > 0 && (
            <Section icon={ClipboardList} title="Ajustado a tu estilo de vida">
              <ul className="space-y-2.5" data-testid="advisor-lifestyle-notes">
                {plan.lifestyleNotes.map((n, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ['Duración', `${plan.weeks} semanas`],
              ['Compuestos', included.length],
              ['Ciclo completo', formatMXN(includedTotal)],
              ['Por día', formatMXN(plan.weeks ? Math.round(includedTotal / (plan.weeks * 7)) : 0)],
            ].map(([label, value]) => (
              <Card key={label} className="p-4">
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="font-heading text-xl font-bold mt-1">{value}</div>
              </Card>
            ))}
          </div>

          <Section icon={Syringe} title="Compuestos elegidos">
            <p className="text-xs text-muted-foreground mb-3">Desmarca lo que no quieras y el total se ajusta solo.</p>
            <div className="space-y-2" data-testid="advisor-plan-products">
              {plan.chosen.map((c) => {
                const off = excluded.includes(c.product.slug);
                return (
                  <div key={c.product.slug} className={`rounded-xl border p-3 transition-colors ${off ? 'opacity-50 border-[hsl(var(--border))]' : 'border-[hsl(var(--primary))]/40'}`}>
                    <div className="flex items-start gap-3">
                      <button type="button" data-testid="advisor-toggle-product"
                        onClick={() => setExcluded((prev) => off ? prev.filter((s) => s !== c.product.slug) : [...prev, c.product.slug])}
                        className={`h-5 w-5 mt-0.5 rounded-md border flex items-center justify-center shrink-0 ${off ? 'border-[hsl(var(--border))]' : 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))]'}`}>
                        {!off && <Check className="h-3.5 w-3.5 text-white" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold">{c.product.name} {c.variant.presentation}</span>
                          <Badge className={`${PRIORITY_STYLE[c.priority]} text-[10px]`}>{PRIORITY_LABEL[c.priority]}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{c.reason}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                          {c.dose && <span className="text-[hsl(var(--primary))] font-medium">Dosis ref.: {c.dose.text}</span>}
                          <span className="text-muted-foreground">{c.frequency}</span>
                          <span className="text-muted-foreground">{c.timing}</span>
                          <span className="text-muted-foreground">{c.vials} vial{c.vials > 1 ? 'es' : ''} para {plan.weeks} semanas</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                          <Link to={`/producto/${c.product.slug}`} className="inline-flex items-center gap-0.5 hover:underline">Ver producto <ChevronRight className="h-3 w-3" /></Link>
                          <Link to={`/calculadora?p=${encodeURIComponent(c.product.name)}`} className="inline-flex items-center gap-0.5 hover:underline">Calcular reconstitución <ChevronRight className="h-3 w-3" /></Link>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-semibold whitespace-nowrap">{formatMXN(c.cycleCost)}</div>
                        <div className="text-[11px] text-muted-foreground">ciclo completo</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section icon={ClipboardList} title="Las primeras dos semanas">
            <ul className="space-y-2">
              {plan.firstTwoWeeks.map((line) => (
                <li key={line} className="flex gap-2 text-sm"><Check className="h-4 w-4 mt-0.5 text-[hsl(var(--primary))] shrink-0" /><span>{line}</span></li>
              ))}
            </ul>
          </Section>

          <Section icon={CalendarDays} title="Puntos de control">
            <div className="space-y-3">
              {plan.checkpoints.map((c) => (
                <div key={c.week} className="border-l-2 border-[hsl(var(--primary))] pl-3">
                  <div className="text-sm font-semibold">Semana {c.week}</div>
                  <p className="text-sm text-muted-foreground mt-0.5"><span className="text-foreground font-medium">Deberías notar:</span> {c.expect}</p>
                  <p className="text-sm text-muted-foreground mt-0.5"><span className="text-[hsl(var(--destructive))] font-medium">Bandera roja:</span> {c.flag}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Ban} title="Lo que NO debes hacer" tone="danger">
            <ul className="space-y-2">
              {plan.whatNotToDo.map((line) => (
                <li key={line} className="flex gap-2 text-sm"><Ban className="h-4 w-4 mt-0.5 text-[hsl(var(--destructive))] shrink-0" /><span>{line}</span></li>
              ))}
            </ul>
          </Section>

          <Section icon={Wallet} title="Si tu presupuesto cambia">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium flex items-center gap-1.5 mb-1"><TrendingDown className="h-4 w-4 text-muted-foreground" /> Si está apretado</div>
                <p className="text-sm text-muted-foreground">{plan.ifTight}</p>
              </div>
              <div>
                <div className="text-sm font-medium flex items-center gap-1.5 mb-1"><TrendingUp className="h-4 w-4 text-[hsl(var(--primary))]" /> Si pudieras subirlo</div>
                <p className="text-sm text-muted-foreground">{plan.ifMore}</p>
              </div>
            </div>
          </Section>

          {plan.warnings.length > 0 && (
            <Section icon={AlertTriangle} title="Advertencias que te aplican" tone="warn">
              <ul className="space-y-2" data-testid="advisor-warnings">
                {plan.warnings.map((w) => (
                  <li key={w} className="flex gap-2 text-sm"><AlertTriangle className="h-4 w-4 mt-0.5 text-[hsl(var(--warning-foreground))] shrink-0" /><span>{w}</span></li>
                ))}
              </ul>
            </Section>
          )}

          <Section icon={Target} title="Expectativas honestas">
            <p className="text-sm leading-relaxed text-muted-foreground">{plan.honestLimits}</p>
          </Section>

          {/* Barra de compra */}
          <Card className="p-4 sticky bottom-4 shadow-[var(--shadow-md)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">{included.length} compuesto{included.length === 1 ? '' : 's'} · {plan.weeks} semanas</div>
                <div className="font-heading text-2xl font-bold">{formatMXN(includedTotal)}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={copyPlan} data-testid="advisor-copy"><Copy className="h-4 w-4 mr-1.5" /> Copiar plan</Button>
                <Button variant="outline" onClick={openChat}><MessageCircle className="h-4 w-4 mr-1.5" /> Preguntar</Button>
                <Button onClick={addPlanToCart} disabled={!included.length} data-testid="advisor-add-all">
                  <ShoppingCart className="h-4 w-4 mr-1.5" /> Agregar todo al carrito
                </Button>
              </div>
            </div>
          </Card>

          <p className="text-xs text-muted-foreground">
            Este plan lo arma nuestro motor de reglas con los datos que diste y los precios reales del catálogo.
            Es orientativo y educativo: los productos son exclusivamente para investigación (RUO), en laboratorio
            y ensayos in vitro, y nada de esto sustituye la opinión de un profesional de la salud.
          </p>
        </div>
      )}

      {/* Navegación */}
      <div className="flex items-center justify-between mt-8">
        {step > 1 ? (
          <Button variant="ghost" onClick={() => setStep(step - 1)} data-testid="advisor-back"><ArrowLeft className="h-4 w-4 mr-1.5" /> Anterior</Button>
        ) : <span />}
        {step < 3 ? (
          <Button onClick={() => canNext && setStep(step + 1)} disabled={!canNext} data-testid="advisor-next">Siguiente <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
        ) : step === 3 ? (
          <Button onClick={() => canNext && setStep(4)} disabled={!canNext} data-testid="advisor-generate">
            <Sparkles className="h-4 w-4 mr-1.5" /> Generar mi plan
          </Button>
        ) : (
          <Button variant="outline" onClick={reset} data-testid="advisor-reset"><RotateCcw className="h-4 w-4 mr-1.5" /> Empezar de nuevo</Button>
        )}
      </div>
    </div>
  );
};

export default Advisor;
