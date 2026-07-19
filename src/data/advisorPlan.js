// Motor del plan del asesor. Reglas propias sobre NUESTRO catálogo — nada de
// esto sale de un modelo de lenguaje, así que el resultado es reproducible y
// se puede auditar. Todo es material de investigación (RUO): no son pautas de uso.

import { fallbackProducts } from '@/data/fallbackCatalog';

export const MAX_OBJ = 3;

// ── Objetivos, sub-parámetros y ranking de compuestos (nombres reales del catálogo) ──
export const OBJECTIVES = [
  {
    id: 'peso', iconKey: 'Flame', title: 'Pérdida de peso', tag: 'Composición corporal y metabolismo',
    params: ['Saciedad y apetito', 'Grasa visceral', 'Acelerar metabolismo', 'Preservar masa magra', 'Sensibilidad a la insulina', 'Reducir antojos'],
    peps: ['Tirzepatida', 'Semaglutida', 'Retatrutida', 'Cagrilintida', 'MOTS-c', '5-AMINO-1MQ', 'AOD-9604'],
    combos: ['Cagri + Sema (2.5mg + 2.5mg)', 'Retatrutide 20mg + Tirzepatide 40mg'],
    strategy: 'atacar el apetito y el gasto energético a la vez, y sostener la masa magra mientras baja el peso',
  },
  {
    id: 'composicion', iconKey: 'Dumbbell', title: 'Composición corporal', tag: 'Masa magra, fuerza y secretagogos de GH',
    params: ['Masa muscular', 'Fuerza', 'Recuperación post-entreno', 'Definición'],
    peps: ['CJC-1295 (sin DAC)', 'Ipamorelin', 'Tesamorelina', 'IGF-1 LR3', 'Sermorelina', 'GHRP-6 Acetate', 'Follistatin'],
    combos: ['CJC-1295 no DAC 5mg + Ipamorelin 5mg', 'Tesamorelin 10 + Ipamorelin 5'],
    strategy: 'estimular el pulso natural de hormona de crecimiento y acompañarlo con recuperación',
  },
  {
    id: 'longevidad', iconKey: 'Hourglass', title: 'Longevidad celular', tag: 'Anti-envejecimiento y reparación',
    params: ['Telómeros', 'Función mitocondrial', 'Sirtuinas', 'Reparación celular'],
    peps: ['Epithalon', 'NAD+', 'GHK-Cu', 'MOTS-c', 'SS-31', 'Humanin', 'Thymalin'],
    combos: ['KLOW (BPC + GHK-Cu + TB-500 + KPV)'],
    strategy: 'trabajar la vía mitocondrial y la reparación celular en paralelo',
  },
  {
    id: 'recuperacion', iconKey: 'HeartPulse', title: 'Recuperación y reparación tisular', tag: 'Tendones, ligamentos y articulaciones',
    params: ['Tendones y ligamentos', 'Articulaciones', 'Mucosa intestinal', 'Cicatrización'],
    peps: ['BPC-157', 'TB-500', 'GHK-Cu', 'KPV'],
    combos: ['BPC-157 5mg + TB-500 5mg', 'BPC-157 10mg + TB-500 10mg', 'GLOW (BPC-157 10mg + GHK-Cu 50mg + TB-500 10mg)'],
    strategy: 'combinar angiogénesis y migración celular, que es donde la sinergia está mejor documentada',
  },
  {
    id: 'sueno', iconKey: 'Moon', title: 'Calidad del sueño', tag: 'Ondas delta y descanso profundo',
    params: ['Sueño profundo', 'Conciliar el sueño', 'Descanso reparador'],
    peps: ['DSIP', 'Epithalon', 'Melatonina'],
    combos: [],
    strategy: 'priorizar la arquitectura del sueño profundo antes que la sedación',
  },
  {
    id: 'cognicion', iconKey: 'Brain', title: 'Función cognitiva', tag: 'Memoria, enfoque y neuroplasticidad',
    params: ['Memoria', 'Enfoque', 'Neuroprotección', 'Manejo del estrés'],
    peps: ['Semax', 'Selank', 'NAD+', 'Cerebrolysin', 'P21'],
    combos: [],
    strategy: 'separar el eje de enfoque del eje de ansiedad, porque responden a compuestos distintos',
  },
  {
    id: 'piel', iconKey: 'Sparkles', title: 'Piel y cabello', tag: 'Colágeno, elasticidad y densidad capilar',
    params: ['Colágeno', 'Elasticidad', 'Densidad capilar', 'Bronceado'],
    peps: ['GHK-Cu', 'AHK-Cu', 'Melanotan I', 'Matrixyl'],
    combos: ['GLOW (BPC-157 10mg + GHK-Cu 50mg + TB-500 10mg)'],
    strategy: 'apoyar la síntesis de colágeno de forma sostenida, que es lo que da resultados visibles',
  },
  {
    id: 'libido', iconKey: 'HeartHandshake', title: 'Libido y salud sexual', tag: 'Deseo y respuesta sexual',
    params: ['Deseo', 'Respuesta sexual', 'Eje hormonal'],
    peps: ['PT-141', 'Kisspeptina-10', 'Gonadorelin Acetate', 'Oxitocina'],
    combos: [],
    strategy: 'trabajar la vía central del deseo, no solo la respuesta vascular',
  },
  {
    id: 'bienestar', iconKey: 'Zap', title: 'Bienestar general', tag: 'Energía, ánimo y vitalidad',
    params: ['Energía', 'Ánimo', 'Vitalidad'],
    peps: ['NAD+', 'MOTS-c', 'Selank', 'Glutatión', 'Vitamina B12'],
    combos: [],
    strategy: 'empezar por el metabolismo energético celular antes de tocar nada más',
  },
  {
    id: 'inmunidad', iconKey: 'ShieldPlus', title: 'Inmunidad y antiinflamatorio', tag: 'Defensas y modulación inflamatoria',
    params: ['Defensas', 'Modulación inflamatoria', 'Antiviral'],
    peps: ['Thymosin Alpha-1', 'Thymalin', 'KPV', 'TB-500', 'LL-37'],
    combos: [],
    strategy: 'modular en lugar de estimular, que es la diferencia entre apoyar y sobrecargar',
  },
];

export const EXPERIENCE = [
  { id: 'inicial', title: 'Principiante', desc: 'Primeras investigaciones. Dosis de referencia inicial.' },
  { id: 'tipica', title: 'Intermedio', desc: 'Con experiencia. Dosis de referencia típica.' },
  { id: 'avanzada', title: 'Avanzado', desc: 'Amplia experiencia. Rango superior de referencia.' },
];

export const FOCUS = [
  { id: 'simple', title: 'Molécula simple', desc: 'Un péptido a la vez, más fácil de controlar.' },
  { id: 'stack', title: 'Stack combinado', desc: 'Combinaciones sinérgicas por objetivo.' },
];

export const DURATIONS = [
  { id: 4, title: '4 semanas', desc: 'Protocolo corto' },
  { id: 8, title: '8 semanas', desc: 'Protocolo estándar' },
  { id: 12, title: '12 semanas', desc: 'Protocolo completo' },
  { id: 16, title: '16 semanas', desc: 'Protocolo extendido' },
];

// El presupuesto acota cuántos compuestos entran al plan.
export const BUDGETS = [
  { id: 'bajo', title: 'Hasta $3,000', suffix: 'MXN/mes', desc: 'Protocolo esencial', max: 2 },
  { id: 'medio', title: '$3,000 – $6,000', suffix: 'MXN/mes', desc: 'Protocolo completo', max: 3 },
  { id: 'alto', title: '$6,000 – $10,000', suffix: 'MXN/mes', desc: 'Protocolo amplio', max: 4 },
  { id: 'libre', title: '$10,000 o más', suffix: 'MXN/mes', desc: 'Sin límite de compuestos', max: 6 },
];

export const CONDITIONS = [
  { id: 'ninguna', title: 'Ninguna de las anteriores' },
  { id: 'diabetes', title: 'Diabetes' },
  { id: 'hipertension', title: 'Hipertensión' },
  { id: 'cardiaca', title: 'Enfermedad cardíaca' },
  { id: 'tiroides', title: 'Problemas de tiroides' },
  { id: 'cancer', title: 'Historial de cáncer' },
  { id: 'autoinmune', title: 'Enfermedad autoinmune' },
  { id: 'higado_rinon', title: 'Problemas hepáticos o renales' },
  { id: 'embarazo', title: 'Embarazo o lactancia' },
  { id: 'hormonal', title: 'Terapia hormonal actual' },
];

// Aviso por condición. Nunca decimos "puedes" o "no puedes": remitimos al profesional.
const CONDITION_WARNINGS = {
  diabetes: 'Registraste diabetes. Los compuestos que actúan sobre la vía GLP-1/GIP modifican la glucosa; cualquier investigación en ese contexto tiene que revisarla un profesional de la salud antes.',
  hipertension: 'Registraste hipertensión. Varios de estos compuestos tienen efectos vasculares documentados; consúltalo con un profesional de la salud.',
  cardiaca: 'Registraste enfermedad cardíaca. Es imprescindible la valoración de un profesional de la salud antes de cualquier protocolo.',
  tiroides: 'Registraste problemas de tiroides. El eje endocrino está interconectado; consúltalo con quien lleva tu tratamiento.',
  cancer: 'Registraste historial de cáncer. Los factores de crecimiento (GH, IGF-1 y secretagogos) están expresamente contraindicados en ese contexto sin supervisión oncológica.',
  autoinmune: 'Registraste enfermedad autoinmune. Los inmunomoduladores pueden alterar tu tratamiento actual; revísalo con tu especialista.',
  higado_rinon: 'Registraste problemas hepáticos o renales. El metabolismo y la eliminación cambian; requiere valoración profesional.',
  embarazo: 'Registraste embarazo o lactancia. No existe evidencia de seguridad en ese contexto para ninguno de estos compuestos.',
  hormonal: 'Registraste terapia hormonal actual. Puede haber interacción con el eje endocrino; coméntalo con tu médico tratante.',
};

// Cada cuánto se aplica cada familia. Determina cuántos viales pide el ciclo.
const FREQUENCY_RULES = [
  { re: /tirzepat|retatrut|semaglut|cagrilint|mazdut|survodut|dulaglut|cagri/i, perWeek: 1, label: '1 vez por semana' },
  { re: /liraglut/i, perWeek: 7, label: 'diario' },
  { re: /epithalon|epitalon|thymalin|thymosin/i, perWeek: 7, label: 'diario, en tandas cortas' },
  { re: /bpc|tb-?500|ghk|kpv|glow|klow/i, perWeek: 7, label: 'diario' },
  { re: /cjc|ipamorel|sermorel|tesamorel|ghrp|hexarel/i, perWeek: 5, label: '5 días por semana' },
  { re: /pt-?141|melanotan|oxitocin|kisspept|gonadorel/i, perWeek: 2, label: 'según la investigación, no a diario' },
  { re: /dsip|melatonin/i, perWeek: 5, label: 'por la noche, 5 días por semana' },
  { re: /nad|mots|ss-?31|humanin|glutat|amino-?1mq/i, perWeek: 3, label: '3 veces por semana' },
];

const frequencyFor = (name) => FREQUENCY_RULES.find((r) => r.re.test(name || '')) || { perWeek: 3, label: '3 veces por semana' };

// Momento del día sugerido, por familia.
const TIMING_RULES = [
  { re: /cjc|ipamorel|sermorel|tesamorel|ghrp|hexarel/i, timing: 'en ayunas, antes de dormir' },
  { re: /dsip|melatonin|epithalon|epitalon/i, timing: 'por la noche' },
  { re: /semax|selank|p21|cerebrol|dihexa/i, timing: 'por la mañana' },
  { re: /tirzepat|retatrut|semaglut|cagrilint|mazdut|survodut/i, timing: 'el mismo día cada semana' },
];
const timingFor = (name) => (TIMING_RULES.find((r) => r.re.test(name || ''))?.timing) || 'a la misma hora cada día';

// ── Índice del catálogo ──
const byName = {};
fallbackProducts.forEach((p) => { byName[p.name.trim().toLowerCase()] = p; });
export const findProduct = (name) => byName[name.trim().toLowerCase()];

export const minPriceVariant = (p) => {
  const vs = (p.variants || []).filter((v) => Number.isFinite(v.price));
  if (!vs.length) return { presentation: p.presentation, price: p.price };
  return vs.reduce((a, b) => (b.price < a.price ? b : a));
};

export const doseText = (p, level) => {
  const L = p.start_levels;
  if (L && L[level] != null) return { value: L[level], unit: L.unit, text: `${L[level]} ${L.unit}` };
  if (p.start_dose != null) return { value: p.start_dose, unit: p.start_unit || '', text: `${p.start_dose} ${p.start_unit || ''}`.trim() };
  return null;
};

/**
 * Arma el plan completo a partir de las respuestas.
 * Devuelve un objeto con todas las secciones ya calculadas.
 */
export function buildPlan({ selected, experience, focus, weeks, budget, conditions }) {
  const budgetCfg = BUDGETS.find((b) => b.id === budget) || BUDGETS[1];
  const objectives = selected.map((id) => OBJECTIVES.find((o) => o.id === id)).filter(Boolean);

  // Candidatos en orden: el primer péptido de cada objetivo, luego el segundo, etc.
  // Así un plan de 2 objetivos cubre ambos antes de profundizar en uno solo.
  const ranked = [];
  const maxDepth = Math.max(0, ...objectives.map((o) => o.peps.length));
  for (let depth = 0; depth < maxDepth; depth++) {
    for (const obj of objectives) {
      const names = focus === 'stack' && obj.combos.length ? [...obj.combos, ...obj.peps] : obj.peps;
      const name = names[depth];
      if (!name) continue;
      const product = findProduct(name);
      if (!product || ranked.some((r) => r.product.slug === product.slug)) continue;
      ranked.push({ product, objective: obj, depth });
    }
  }

  const chosen = ranked.slice(0, budgetCfg.max).map((entry, index) => {
    const { product, objective, depth } = entry;
    const dose = doseText(product, experience);
    const freq = frequencyFor(product.name);
    const doseMg = dose ? (dose.unit === 'mcg' ? dose.value / 1000 : dose.value) : 0;
    const totalMg = doseMg * freq.perWeek * weeks;

    // Elegimos la presentación que sale más barata PARA TODO EL CICLO, no la del
    // vial más barato: 7 viales de 2 mg cuestan más que uno de 10 mg.
    const options = (product.variants || []).filter((v) => Number.isFinite(v.price));
    const priced = (options.length ? options : [{ presentation: product.presentation, price: product.price }])
      .map((v) => {
        const mgPerVial = parseFloat(v.presentation) || 0;
        const vials = totalMg > 0 && mgPerVial > 0 ? Math.max(1, Math.ceil(totalMg / mgPerVial)) : 1;
        return { variant: v, vialMg: mgPerVial, vials, cost: vials * v.price };
      });
    const best = priced.reduce((a, b) => (b.cost < a.cost || (b.cost === a.cost && b.vials < a.vials) ? b : a));
    const { variant, vialMg, vials } = best;

    return {
      product,
      objective,
      variant,
      vialMg,
      dose,
      frequency: freq.label,
      dosesPerWeek: freq.perWeek,
      timing: timingFor(product.name),
      vials,
      cycleCost: best.cost,
      priority: depth === 0 && index < objectives.length ? 'esencial' : index < budgetCfg.max - 1 ? 'recomendado' : 'opcional',
      reason: `Cubre ${objective.title.toLowerCase()}: ${objective.strategy}.`,
    };
  });

  const cycleTotal = chosen.reduce((s, c) => s + c.cycleCost, 0);
  const perDay = weeks > 0 ? Math.round(cycleTotal / (weeks * 7)) : 0;
  const perMonth = weeks > 0 ? Math.round((cycleTotal / weeks) * 4) : 0;

  const activeConditions = (conditions || []).filter((c) => c !== 'ninguna');
  const warnings = activeConditions.map((c) => CONDITION_WARNINGS[c]).filter(Boolean);

  const goalList = objectives.map((o) => o.title.toLowerCase());
  const strategy = objectives.length === 1
    ? `Tu plan se concentra en ${goalList[0]}. La idea es ${objectives[0].strategy}, sin dispersar el presupuesto en compuestos que no aportan a eso.`
    : `Tu plan cubre ${goalList.slice(0, -1).join(', ')} y ${goalList[goalList.length - 1]}. Priorizamos un compuesto por objetivo antes de profundizar en cualquiera, para que ninguna de tus áreas se quede sin cubrir.`;

  const checkpoints = [
    { week: 2, expect: 'Ya deberías tener la rutina de reconstitución y aplicación resuelta, sin dudas de cuánta agua ni cuántas rayitas.', flag: 'Si el vial se ve turbio, amarillento o con partículas, no lo uses: eso es degradación.' },
    { week: Math.max(4, Math.round(weeks * 0.35)), expect: 'Primeras señales medibles en el objetivo principal. Anótalas con números, no con sensaciones.', flag: 'Cero cambio medible y molestias persistentes: para y replantea antes de seguir gastando.' },
    { week: Math.max(6, Math.round(weeks * 0.7)), expect: 'Es el punto donde se decide si el protocolo continúa igual o se ajusta.', flag: 'Si tuviste que subir la dosis para sentir lo mismo, el problema no se arregla subiendo más.' },
    { week: weeks, expect: 'Cierre del ciclo. Compara contra tu punto de partida y decide con datos si repites.', flag: 'No encadenes un ciclo tras otro sin una pausa y sin revisar tus marcadores.' },
  ].filter((c, i, arr) => arr.findIndex((x) => x.week === c.week) === i && c.week <= weeks);

  return {
    objectives,
    weeks,
    budget: budgetCfg,
    chosen,
    cycleTotal,
    perDay,
    perMonth,
    strategy,
    checkpoints,
    warnings,
    firstTwoWeeks: [
      'Reconstituye un solo vial. No prepares todo el ciclo de golpe: reconstituido dura semanas, liofilizado dura meses.',
      'Usa siempre la dosis de referencia más baja de tu nivel durante los primeros días, aunque el plan permita más.',
      'Aplica a la misma hora. La consistencia vale más que la dosis exacta para poder interpretar lo que pasa.',
      'Anota desde el día uno: peso, medidas, sueño y energía. Sin punto de partida no hay forma de saber si funcionó.',
    ],
    whatNotToDo: [
      'No arranques dos compuestos nuevos el mismo día: si algo pasa, no vas a saber cuál fue.',
      'No subas la dosis porque "no sientes nada" en la primera semana. Casi nada actúa así de rápido.',
      'No guardes el vial reconstituido fuera del refrigerador ni lo congeles otra vez.',
      'No reutilices jeringas ni agujas, ni compartas el vial de agua bacteriostática.',
      'No sustituyas con esto ninguna indicación de tu médico ni dejes un tratamiento en curso.',
    ],
    ifTight: chosen.length > 1
      ? `Si el presupuesto se aprieta, quédate solo con ${chosen[0].product.name}. Es el compuesto que sostiene el objetivo principal; los demás suman, pero no son el eje.`
      : 'Tu plan ya está en lo mínimo indispensable. Por debajo de esto, conviene esperar y arrancar completo en lugar de hacerlo a medias.',
    ifMore: ranked[chosen.length]
      ? `Si pudieras subir el presupuesto, el siguiente en la lista es ${ranked[chosen.length].product.name}, que refuerza ${ranked[chosen.length].objective.title.toLowerCase()}.`
      : 'Con este presupuesto ya cubres todo lo que nuestro catálogo aporta a tus objetivos. Más compuestos no mejorarían el plan.',
    honestLimits: `Un ciclo de ${weeks} semanas da tiempo a ver tendencias, no milagros. Todo esto es material de investigación: no está aprobado para uso en personas y ninguna cifra de arriba es una promesa de resultado. Sin sueño, comida y entrenamiento en orden, ningún compuesto compensa la diferencia.`,
  };
}
