// Pruebas de la aritmética de la escalera.
//
// Lo que se protege aquí es la cuenta que le decimos al cliente: cuánto le dura
// el vial si va SUBIENDO la dosis, que es lo que hace una persona de verdad. El
// caso que abrió el tema es el de Christián: Retatrutida, vial de 120 mg.

import {
  escaleraDe,
  planDeEscalera,
  duracionDeEscalera,
  duracionADosisFija,
  DOSIS_POR_SEMANA,
} from './escalera';

const RETA = {
  unit: 'mg',
  escalera: {
    unit: 'mg',
    freq: 'weekly',
    quien: 'Ensayo Fase 2 (NEJM 2023)',
    tipo: 'ensayo',
    pasos: [
      { dosis: 2, semanas: 4 },
      { dosis: 4, semanas: 4 },
      { dosis: 8, semanas: 4 },
      { dosis: 12 },
    ],
  },
};

describe('escaleraDe — sin dato anotado no hay plan', () => {
  test('producto sin escalera devuelve null', () => {
    expect(escaleraDe({ unit: 'mg' }, 'weekly')).toBeNull();
    expect(escaleraDe(null, 'weekly')).toBeNull();
  });

  test('una escalera de un solo escalón no es una escalera', () => {
    expect(escaleraDe({ escalera: { quien: 'x', pasos: [{ dosis: 2, semanas: 4 }] } }, 'weekly')).toBeNull();
  });

  test('sin `quien` no se muestra: no publicamos escaleras anónimas', () => {
    expect(escaleraDe({ escalera: { pasos: [{ dosis: 2, semanas: 4 }, { dosis: 4 }] } }, 'weekly')).toBeNull();
  });

  test('los escalones sin dosis se caen solos', () => {
    const e = escaleraDe({ escalera: { quien: 'x', pasos: [{ dosis: 2, semanas: 4 }, { semanas: 4 }, { dosis: 4 }] } }, 'weekly');
    expect(e.pasos).toHaveLength(2);
  });

  test('hereda la frecuencia del producto cuando la escalera no trae la suya', () => {
    expect(escaleraDe(RETA, 'weekly').freq).toBe('weekly');
    expect(escaleraDe({ escalera: { ...RETA.escalera, freq: undefined } }, 'daily').freq).toBe('daily');
  });

  test('el último escalón siempre queda abierto: ahí es donde uno se queda', () => {
    const e = escaleraDe({ escalera: { ...RETA.escalera, pasos: [{ dosis: 2, semanas: 4 }, { dosis: 4, semanas: 8 }] } }, 'weekly');
    expect(e.pasos[1].semanas).toBeNull();
  });
});

describe('planDeEscalera — en qué semana toca cada escalón', () => {
  test('Retatrutida: 1-4, 5-8, 9-12 y de la 13 en adelante', () => {
    const plan = planDeEscalera(escaleraDe(RETA, 'weekly'));
    expect(plan.map((p) => [p.dosis, p.desde, p.hasta])).toEqual([
      [2, 1, 4],
      [4, 5, 8],
      [8, 9, 12],
      [12, 13, null],
    ]);
  });

  test('sin escalera, plan vacío', () => {
    expect(planDeEscalera(null)).toEqual([]);
  });
});

describe('duracionDeEscalera — cuánto dura el vial subiendo', () => {
  const esc = escaleraDe(RETA, 'weekly');

  test('EL CASO DE CHRISTIÁN: vial de 120 mg de Retatrutida rinde 17 semanas siguiendo el plan', () => {
    // 2 mg × 4 = 8 · 4 mg × 4 = 16 · 8 mg × 4 = 32 → 56 mg en 12 semanas.
    // Quedan 64 mg: a 12 mg por semana alcanzan 5 aplicaciones más (60 mg).
    const d = duracionDeEscalera(esc, 120);
    expect(d.semanas).toBe(17);
    expect(d.aplicaciones).toBe(17);
    expect(d.alcanzaFinal).toBe(true);
    expect(d.mgSobrante).toBeCloseTo(4, 6);
  });

  test('la escalera no es ni la dosis baja ni la alta: cae en medio', () => {
    const baja = duracionADosisFija({ vialMg: 120, dosisMcg: 2000, freq: 'weekly' });
    const alta = duracionADosisFija({ vialMg: 120, dosisMcg: 12000, freq: 'weekly' });
    const plan = duracionDeEscalera(esc, 120);
    expect(baja.semanas).toBe(60);
    expect(alta.semanas).toBe(10);
    expect(plan.semanas).toBeGreaterThan(alta.semanas);
    expect(plan.semanas).toBeLessThan(baja.semanas);
  });

  test('vial chico: se dice hasta dónde alcanzó, no se promete el escalón final', () => {
    // 10 mg: 4 semanas a 2 mg (8 mg) y ya sólo queda para media aplicación de 4.
    const d = duracionDeEscalera(esc, 10);
    expect(d.semanas).toBe(4);
    expect(d.alcanzaFinal).toBe(false);
    expect(d.tramos).toHaveLength(1);
    expect(d.tramos[0].completo).toBe(true);
  });

  test('vial de 20 mg: llega al segundo escalón pero no lo termina', () => {
    // 8 mg en el primero, quedan 12 → 3 aplicaciones de 4 mg = 3 semanas.
    const d = duracionDeEscalera(esc, 20);
    expect(d.semanas).toBe(7);
    expect(d.tramos[1].aplicaciones).toBe(3);
    expect(d.tramos[1].completo).toBe(false);
    expect(d.alcanzaFinal).toBe(false);
  });

  test('las semanas de subida son las que tarda en llegar a la dosis de quedarse', () => {
    expect(duracionDeEscalera(esc, 120).semanasDeSubida).toBe(12);
  });

  test('vial enorme: todo el sobrante se gasta en el escalón de mantenimiento', () => {
    // 56 mg de subida + (1000-56)/12 = 78 aplicaciones → 12 + 78 = 90 semanas.
    const d = duracionDeEscalera(esc, 1000);
    expect(d.semanas).toBe(90);
    expect(d.tramos[3].aplicaciones).toBe(78);
  });

  test('frecuencia diaria: 4 semanas son 28 aplicaciones, no 4', () => {
    const diaria = escaleraDe({
      escalera: { unit: 'mcg', freq: 'daily', quien: 'x', pasos: [{ dosis: 100, semanas: 4 }, { dosis: 200 }] },
    }, 'daily');
    const d = duracionDeEscalera(diaria, 10);   // 10 mg = 10 000 mcg
    // 28 × 100 mcg = 2 800 mcg. Quedan 7 200 → 36 aplicaciones de 200 = 7 200.
    expect(d.tramos[0].aplicaciones).toBe(28);
    expect(d.tramos[0].semanas).toBe(4);
    expect(d.tramos[1].aplicaciones).toBe(36);
    expect(d.semanas).toBeCloseTo(4 + 36 / 7, 6);
  });

  test('un día sí y un día no: 3.5 aplicaciones por semana', () => {
    const eod = escaleraDe({
      escalera: { unit: 'mg', freq: 'eod', quien: 'x', pasos: [{ dosis: 1, semanas: 4 }, { dosis: 2 }] },
    }, 'eod');
    const d = duracionDeEscalera(eod, 100);
    expect(d.tramos[0].aplicaciones).toBe(14);      // 4 × 3.5
    expect(d.tramos[0].semanas).toBe(4);
  });

  test('frecuencia sin ritmo fijo: no se inventa una duración', () => {
    for (const freq of ['as_needed', 'mt', 'daily_cycle']) {
      const e = escaleraDe({ escalera: { unit: 'mg', freq, quien: 'x', pasos: [{ dosis: 1, semanas: 4 }, { dosis: 2 }] } }, freq);
      expect(duracionDeEscalera(e, 100)).toBeNull();
      expect(DOSIS_POR_SEMANA[freq]).toBeNull();
    }
  });

  test('sin vial no hay cuenta', () => {
    expect(duracionDeEscalera(esc, 0)).toBeNull();
    expect(duracionDeEscalera(esc, null)).toBeNull();
    expect(duracionDeEscalera(null, 120)).toBeNull();
  });

  test('la cuenta nunca gasta más miligramos de los que trae el vial', () => {
    for (const mg of [1, 5, 10, 20, 30, 40, 60, 100, 120, 250]) {
      const d = duracionDeEscalera(esc, mg);
      if (!d) continue;
      const gastado = d.tramos.reduce((s, tr) => s + tr.aplicaciones * tr.dosis, 0);
      expect(gastado).toBeLessThanOrEqual(mg + 1e-9);
      expect(d.mgSobrante).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('duracionADosisFija — lo de siempre, sin tocar', () => {
  test('120 mg a 5 mg por semana son 24 semanas', () => {
    expect(duracionADosisFija({ vialMg: 120, dosisMcg: 5000, freq: 'weekly' }).semanas).toBe(24);
  });

  test('mcg y frecuencia diaria', () => {
    const d = duracionADosisFija({ vialMg: 5, dosisMcg: 250, freq: 'daily' });
    expect(d.dosisPorVial).toBe(20);
    expect(d.semanas).toBeCloseTo(20 / 7, 6);
  });

  test('sin ritmo fijo devuelve null', () => {
    expect(duracionADosisFija({ vialMg: 10, dosisMcg: 500, freq: 'as_needed' })).toBeNull();
  });
});
