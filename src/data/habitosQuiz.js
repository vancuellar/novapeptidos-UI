// Cuestionario de Hábitos del panel del cliente (pedido de Christián,
// 2026-07-30): evalúa estilo de vida y devuelve recomendaciones BÁSICAS de
// dieta y hábitos que acompañan una rutina de bienestar — agua, sueño,
// ejercicio, menos ultraprocesados/azúcar, proteína, alcohol, estrés y
// constancia. Nada de consejo médico ni dosis. El texto base en español lo
// redactó Codex; en/pt traducidos con el mismo tono. Los tres idiomas viven
// juntos aquí (regla dura: ningún texto en un solo idioma).
//
// Puntaje: cada respuesta vale 0 (mal), 1 (regular) o 2 (bien); máx 16.

const ES = {
  intro: 'Contesta 8 preguntas rápidas y te decimos qué hábitos ya te acompañan y cuáles conviene ajustar.',
  cta: 'Ver mis recomendaciones',
  reset: 'Volver a contestar',
  scoreLabel: 'Tu base de hábitos',
  preguntas: [
    { id: 'agua', texto: '¿Cuánta agua tomas al día?', opciones: [
      { v: 0, t: 'Casi nada, sobre todo refresco o café' },
      { v: 1, t: 'Unos cuantos vasos, sin fijarme' },
      { v: 2, t: '2 litros o más, casi todos los días' }] },
    { id: 'sueno', texto: '¿Cómo duermes normalmente?', opciones: [
      { v: 0, t: 'Menos de 6 horas o muy desvelado' },
      { v: 1, t: '6-7 horas, con altibajos' },
      { v: 2, t: '7-8 horas con horario más o menos fijo' }] },
    { id: 'ejercicio', texto: '¿Qué tanto te mueves a la semana?', opciones: [
      { v: 0, t: 'Casi nada, vida sentada' },
      { v: 1, t: 'Algo de caminata o ejercicio 1-2 veces' },
      { v: 2, t: 'Ejercicio o caminata 3+ veces por semana' }] },
    { id: 'alimentacion', texto: '¿Qué tan seguido comes ultraprocesados, frituras o azúcar?', opciones: [
      { v: 0, t: 'Diario o casi diario' },
      { v: 1, t: 'Varias veces por semana' },
      { v: 2, t: 'De vez en cuando, como excepción' }] },
    { id: 'proteina', texto: '¿Incluyes proteína en tus comidas principales (huevo, pollo, pescado, leguminosas)?', opciones: [
      { v: 0, t: 'Rara vez me fijo en eso' },
      { v: 1, t: 'En una comida al día' },
      { v: 2, t: 'En casi todas mis comidas' }] },
    { id: 'alcohol', texto: '¿Cómo andas con el alcohol?', opciones: [
      { v: 0, t: 'Varias veces por semana' },
      { v: 1, t: 'Social, 1-2 veces por semana' },
      { v: 2, t: 'Poco o nada' }] },
    { id: 'estres', texto: '¿Cómo manejas el estrés del día a día?', opciones: [
      { v: 0, t: 'Me trae de bajada casi siempre' },
      { v: 1, t: 'Hay rachas pesadas' },
      { v: 2, t: 'Tengo mis válvulas de escape y funcionan' }] },
    { id: 'constancia', texto: 'Cuando empiezas un hábito nuevo, ¿qué pasa?', opciones: [
      { v: 0, t: 'Me cuesta mantenerlo' },
      { v: 1, t: 'Soy constante por temporadas' },
      { v: 2, t: 'Lo mantengo la mayoría de los días' }] },
  ],
  niveles: [
    { min: 0, titulo: 'Buen momento para empezar', resumen: 'Hay varias oportunidades sencillas para sentirte mejor. Elige uno o dos cambios pequeños y sostenibles para comenzar.' },
    { min: 8, titulo: 'Vas construyendo una buena base', resumen: 'Ya tienes hábitos favorables. Reforzar los puntos menos constantes puede ayudarte a mantener un mejor equilibrio.' },
    { min: 13, titulo: 'Base de hábitos sólida', resumen: 'Tus hábitos acompañan bien una rutina de bienestar. Mantén la constancia y ajusta con calma cuando sea necesario.' },
  ],
  consejos: {
    agua: { bajo: 'Ten una botella a la vista y toma agua con cada comida. Reparte el consumo durante el día.', bien: 'Muy bien: mantenerte hidratado favorece tu energía y tu rutina diaria.' },
    sueno: { bajo: 'Busca un horario regular para dormir y reduce las pantallas antes de acostarte.', bien: 'Tu descanso es una gran base. Conserva horarios regulares siempre que sea posible.' },
    ejercicio: { bajo: 'Empieza con caminatas cortas o una actividad que disfrutes. La constancia importa más que la intensidad.', bien: 'Excelente: sigue combinando movimiento, descanso y actividades que disfrutes.' },
    alimentacion: { bajo: 'Cambia poco a poco frituras, dulces y ultraprocesados por alimentos frescos y comidas sencillas.', bien: 'Vas muy bien: mantener bajos los ultraprocesados y azúcares apoya una alimentación equilibrada.' },
    proteina: { bajo: 'Incluye una fuente de proteína que disfrutes en tus comidas principales, como huevo, pescado, pollo, leguminosas o lácteos.', bien: 'Buen hábito: una alimentación con proteína adecuada ayuda a mantener una rutina equilibrada.' },
    alcohol: { bajo: 'Prueba reducir la frecuencia o la cantidad y alterna cada bebida con agua.', bien: 'Muy bien: mantener el alcohol al mínimo favorece el descanso, la hidratación y la constancia.' },
    estres: { bajo: 'Reserva unos minutos para respirar, caminar o desconectarte. Una pausa breve también cuenta.', bien: 'Excelente: sigue usando las actividades que te ayudan a recuperar la calma.' },
    constancia: { bajo: 'Elige un cambio pequeño y repítelo a la misma hora cada día. Avanzar poco a poco también es progreso.', bien: 'Tu constancia es una fortaleza. Mantén una rutina flexible para que sea sostenible.' },
  },
  disclaimer: 'Contenido informativo para bienestar general y uso exclusivo en investigación (RUO). No sustituye la evaluación, el diagnóstico ni el consejo de un profesional de la salud.',
};

const EN = {
  intro: 'Answer 8 quick questions and we’ll tell you which habits are already on your side and which ones to adjust.',
  cta: 'See my recommendations',
  reset: 'Answer again',
  scoreLabel: 'Your habits base',
  preguntas: [
    { id: 'agua', texto: 'How much water do you drink per day?', opciones: [
      { v: 0, t: 'Almost none — mostly soda or coffee' },
      { v: 1, t: 'A few glasses, without tracking' },
      { v: 2, t: '2 liters or more, most days' }] },
    { id: 'sueno', texto: 'How do you usually sleep?', opciones: [
      { v: 0, t: 'Less than 6 hours, or very irregular' },
      { v: 1, t: '6-7 hours, with ups and downs' },
      { v: 2, t: '7-8 hours on a fairly steady schedule' }] },
    { id: 'ejercicio', texto: 'How much do you move per week?', opciones: [
      { v: 0, t: 'Almost none — mostly sitting' },
      { v: 1, t: 'Some walking or exercise 1-2 times' },
      { v: 2, t: 'Exercise or walks 3+ times a week' }] },
    { id: 'alimentacion', texto: 'How often do you eat ultra-processed food, fried food or sugar?', opciones: [
      { v: 0, t: 'Daily or almost daily' },
      { v: 1, t: 'Several times a week' },
      { v: 2, t: 'Occasionally, as an exception' }] },
    { id: 'proteina', texto: 'Do your main meals include protein (eggs, chicken, fish, legumes)?', opciones: [
      { v: 0, t: 'I rarely pay attention to that' },
      { v: 1, t: 'In one meal a day' },
      { v: 2, t: 'In almost every meal' }] },
    { id: 'alcohol', texto: 'How about alcohol?', opciones: [
      { v: 0, t: 'Several times a week' },
      { v: 1, t: 'Social — once or twice a week' },
      { v: 2, t: 'Little or none' }] },
    { id: 'estres', texto: 'How do you handle day-to-day stress?', opciones: [
      { v: 0, t: 'It gets the best of me most days' },
      { v: 1, t: 'There are rough stretches' },
      { v: 2, t: 'I have outlets that work for me' }] },
    { id: 'constancia', texto: 'When you start a new habit, what happens?', opciones: [
      { v: 0, t: 'It’s hard for me to keep it up' },
      { v: 1, t: 'I’m consistent in streaks' },
      { v: 2, t: 'I keep it up most days' }] },
  ],
  niveles: [
    { min: 0, titulo: 'A good moment to start', resumen: 'There are several simple opportunities to feel better. Pick one or two small, sustainable changes to begin.' },
    { min: 8, titulo: 'You’re building a good base', resumen: 'You already have favorable habits. Reinforcing the least consistent ones can help you keep a better balance.' },
    { min: 13, titulo: 'A solid habits base', resumen: 'Your habits support a wellness routine well. Keep the consistency and adjust calmly when needed.' },
  ],
  consejos: {
    agua: { bajo: 'Keep a bottle in sight and drink water with every meal. Spread it across the day.', bien: 'Great: staying hydrated supports your energy and daily routine.' },
    sueno: { bajo: 'Aim for a regular sleep schedule and cut back on screens before bed.', bien: 'Your rest is a great foundation. Keep regular hours whenever possible.' },
    ejercicio: { bajo: 'Start with short walks or an activity you enjoy. Consistency matters more than intensity.', bien: 'Excellent: keep combining movement, rest and activities you enjoy.' },
    alimentacion: { bajo: 'Gradually swap fried food, sweets and ultra-processed items for fresh, simple meals.', bien: 'You’re doing well: keeping ultra-processed food and sugar low supports a balanced diet.' },
    proteina: { bajo: 'Add a protein source you enjoy to your main meals — eggs, fish, chicken, legumes or dairy.', bien: 'Good habit: adequate protein helps keep a balanced routine.' },
    alcohol: { bajo: 'Try lowering the frequency or the amount, and alternate every drink with water.', bien: 'Great: keeping alcohol to a minimum supports rest, hydration and consistency.' },
    estres: { bajo: 'Set aside a few minutes to breathe, walk or disconnect. A short pause counts too.', bien: 'Excellent: keep using the activities that help you find your calm.' },
    constancia: { bajo: 'Pick one small change and repeat it at the same time every day. Small steps are still progress.', bien: 'Your consistency is a strength. Keep your routine flexible so it stays sustainable.' },
  },
  disclaimer: 'Informational content for general wellness and research use only (RUO). It does not replace the evaluation, diagnosis or advice of a healthcare professional.',
};

const PT = {
  intro: 'Responda 8 perguntas rápidas e dizemos quais hábitos já estão do seu lado e quais vale ajustar.',
  cta: 'Ver minhas recomendações',
  reset: 'Responder de novo',
  scoreLabel: 'Sua base de hábitos',
  preguntas: [
    { id: 'agua', texto: 'Quanta água você bebe por dia?', opciones: [
      { v: 0, t: 'Quase nada — mais refrigerante ou café' },
      { v: 1, t: 'Alguns copos, sem prestar atenção' },
      { v: 2, t: '2 litros ou mais, quase todos os dias' }] },
    { id: 'sueno', texto: 'Como você costuma dormir?', opciones: [
      { v: 0, t: 'Menos de 6 horas, ou muito irregular' },
      { v: 1, t: '6-7 horas, com altos e baixos' },
      { v: 2, t: '7-8 horas com horário mais ou menos fixo' }] },
    { id: 'ejercicio', texto: 'Quanto você se movimenta por semana?', opciones: [
      { v: 0, t: 'Quase nada — vida sentada' },
      { v: 1, t: 'Alguma caminhada ou exercício 1-2 vezes' },
      { v: 2, t: 'Exercício ou caminhada 3+ vezes por semana' }] },
    { id: 'alimentacion', texto: 'Com que frequência você come ultraprocessados, frituras ou açúcar?', opciones: [
      { v: 0, t: 'Todo dia ou quase' },
      { v: 1, t: 'Várias vezes por semana' },
      { v: 2, t: 'De vez em quando, como exceção' }] },
    { id: 'proteina', texto: 'Suas refeições principais têm proteína (ovo, frango, peixe, leguminosas)?', opciones: [
      { v: 0, t: 'Raramente presto atenção nisso' },
      { v: 1, t: 'Em uma refeição por dia' },
      { v: 2, t: 'Em quase todas as refeições' }] },
    { id: 'alcohol', texto: 'E o álcool, como anda?', opciones: [
      { v: 0, t: 'Várias vezes por semana' },
      { v: 1, t: 'Social — 1-2 vezes por semana' },
      { v: 2, t: 'Pouco ou nada' }] },
    { id: 'estres', texto: 'Como você lida com o estresse do dia a dia?', opciones: [
      { v: 0, t: 'Ele me derruba quase sempre' },
      { v: 1, t: 'Tem fases pesadas' },
      { v: 2, t: 'Tenho minhas válvulas de escape e funcionam' }] },
    { id: 'constancia', texto: 'Quando você começa um hábito novo, o que acontece?', opciones: [
      { v: 0, t: 'Custa manter' },
      { v: 1, t: 'Sou constante por temporadas' },
      { v: 2, t: 'Mantenho na maioria dos dias' }] },
  ],
  niveles: [
    { min: 0, titulo: 'Bom momento para começar', resumen: 'Há várias oportunidades simples para se sentir melhor. Escolha uma ou duas mudanças pequenas e sustentáveis para começar.' },
    { min: 8, titulo: 'Você está construindo uma boa base', resumen: 'Você já tem hábitos favoráveis. Reforçar os pontos menos constantes pode ajudar a manter um melhor equilíbrio.' },
    { min: 13, titulo: 'Base de hábitos sólida', resumen: 'Seus hábitos acompanham bem uma rotina de bem-estar. Mantenha a constância e ajuste com calma quando necessário.' },
  ],
  consejos: {
    agua: { bajo: 'Deixe uma garrafa à vista e beba água em cada refeição. Distribua ao longo do dia.', bien: 'Muito bem: manter-se hidratado favorece sua energia e sua rotina diária.' },
    sueno: { bajo: 'Busque um horário regular para dormir e reduza as telas antes de deitar.', bien: 'Seu descanso é uma ótima base. Mantenha horários regulares sempre que possível.' },
    ejercicio: { bajo: 'Comece com caminhadas curtas ou uma atividade que goste. Constância importa mais que intensidade.', bien: 'Excelente: continue combinando movimento, descanso e atividades que goste.' },
    alimentacion: { bajo: 'Troque aos poucos frituras, doces e ultraprocessados por alimentos frescos e refeições simples.', bien: 'Muito bem: manter baixos os ultraprocessados e o açúcar apoia uma alimentação equilibrada.' },
    proteina: { bajo: 'Inclua uma fonte de proteína que goste nas refeições principais — ovo, peixe, frango, leguminosas ou laticínios.', bien: 'Bom hábito: proteína adequada ajuda a manter uma rotina equilibrada.' },
    alcohol: { bajo: 'Experimente reduzir a frequência ou a quantidade e alterne cada bebida com água.', bien: 'Muito bem: manter o álcool no mínimo favorece o descanso, a hidratação e a constância.' },
    estres: { bajo: 'Reserve alguns minutos para respirar, caminhar ou desconectar. Uma pausa breve também conta.', bien: 'Excelente: continue usando as atividades que ajudam você a recuperar a calma.' },
    constancia: { bajo: 'Escolha uma mudança pequena e repita no mesmo horário todos os dias. Avançar aos poucos também é progresso.', bien: 'Sua constância é uma força. Mantenha uma rotina flexível para que seja sustentável.' },
  },
  disclaimer: 'Conteúdo informativo para bem-estar geral e uso exclusivo em pesquisa (RUO). Não substitui a avaliação, o diagnóstico nem o conselho de um profissional de saúde.',
};

const QUIZ = { 'es-MX': ES, 'en-US': EN, 'pt-BR': PT };

export const habitosQuiz = (language) => QUIZ[language] || ES;
export const HABITOS_MAX = 16;
