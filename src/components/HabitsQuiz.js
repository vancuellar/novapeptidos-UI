// Cuestionario de Hábitos (panel del cliente): 8 preguntas de estilo de vida
// → una base de hábitos con recomendaciones básicas de dieta y rutina que
// acompañan el bienestar general. Sin consejo médico y sin dosis: eso vive en
// el disclaimer. El contenido (3 idiomas) está en src/data/habitosQuiz.js.
import React, { useState } from 'react';
import { HeartPulse, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { habitosQuiz, HABITOS_MAX } from '@/data/habitosQuiz';

const HabitsQuiz = () => {
  const { language } = useLanguage();
  const quiz = habitosQuiz(language);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(false);

  const contestadas = Object.keys(respuestas).length;
  const completas = contestadas === quiz.preguntas.length;
  const puntos = Object.values(respuestas).reduce((a, b) => a + b, 0);
  // El nivel que corresponde: el de `min` más alto que el puntaje alcanza.
  const nivel = [...quiz.niveles].reverse().find((n) => puntos >= n.min) || quiz.niveles[0];

  if (resultado) {
    return (
      <Card className="p-6" data-testid="habits-quiz-result">
        <div className="flex items-center gap-2 mb-1">
          <HeartPulse className="h-5 w-5 text-[hsl(var(--primary))]" />
          <span className="text-xs font-mono-tech uppercase tracking-[0.14em] text-muted-foreground">{quiz.scoreLabel}: {puntos}/{HABITOS_MAX}</span>
        </div>
        <h4 className="font-heading font-semibold text-lg mb-1">{nivel.titulo}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{nivel.resumen}</p>
        <div className="space-y-3 mb-5">
          {quiz.preguntas.map((p) => {
            const v = respuestas[p.id] ?? 0;
            const c = quiz.consejos[p.id];
            const bien = v === 2;
            return (
              <div key={p.id} className={`rounded-lg border p-3 text-sm leading-relaxed ${bien ? 'border-[hsl(var(--success))]/40' : 'border-border'}`}>
                <span className={`mr-2 ${bien ? 'text-[hsl(var(--success))]' : 'text-[hsl(var(--primary))]'}`}>{bien ? '✓' : '→'}</span>
                {bien ? c.bien : c.bajo}
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{quiz.disclaimer}</p>
        <Button variant="outline" size="sm" onClick={() => { setRespuestas({}); setResultado(false); }} data-testid="habits-quiz-reset">
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> {quiz.reset}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6" data-testid="habits-quiz">
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{quiz.intro}</p>
      <div className="space-y-5">
        {quiz.preguntas.map((p, i) => (
          <div key={p.id}>
            <div className="text-sm font-semibold mb-2">{i + 1}. {p.texto}</div>
            <div className="flex flex-col sm:flex-row gap-2">
              {p.opciones.map((o) => (
                <button key={o.v} type="button" data-testid={`habits-${p.id}-${o.v}`}
                  onClick={() => setRespuestas((r) => ({ ...r, [p.id]: o.v }))}
                  className={`flex-1 rounded-lg border px-3 py-2 text-xs text-left transition-colors ${respuestas[p.id] === o.v
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10'
                    : 'border-border hover:bg-secondary'}`}>
                  {o.t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-6 w-full sm:w-auto" disabled={!completas} onClick={() => setResultado(true)} data-testid="habits-quiz-submit">
        {quiz.cta}{!completas ? ` (${contestadas}/${quiz.preguntas.length})` : ''}
      </Button>
    </Card>
  );
};

export default HabitsQuiz;
