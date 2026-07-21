const page = {
  slug: 'protocolos',
  title: 'Protocolos por objetivo: qué se combina con qué y por qué',
  subtitle:
    'Seis objetivos de investigación, los compuestos que suelen agruparse en cada uno y el mecanismo que explica por qué juntos tienen sentido.',
  badge: 'Guía',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'Qué es un stack y por qué importa la sinergia',
      paragraphs: [
        'Un stack es un conjunto de compuestos que se investigan juntos porque atacan el mismo objetivo desde vías distintas. La idea no es acumular productos, sino cubrir pasos diferentes de un mismo proceso biológico: si un compuesto activa la construcción de tejido y otro dirige a las células al sitio de la lesión, cada uno hace algo que el otro no puede hacer solo.',
        'La sinergia real ocurre cuando los mecanismos son complementarios, no redundantes. Dos agonistas del mismo receptor no se suman: compiten por los mismos sitios de unión y, pasado el punto de saturación, lo único que crece es el ruido y la probabilidad de efectos fuera de blanco. Por eso un buen stack se juzga por su mapa de mecanismos, no por el número de viales.',
        'También conviene ser honesto con el nivel de evidencia. Dentro de un mismo stack puedes tener un fármaco con ensayos clínicos fase 3 al lado de un compuesto con solo estudios en roedores. Eso no invalida el stack, pero sí obliga a interpretar los resultados sabiendo cuál pieza está bien caracterizada y cuál no.',
        'Lo que sigue son marcos de razonamiento para diseño experimental, no pautas de uso. En las tablas describimos el papel de cada compuesto dentro del protocolo y su mecanismo conocido; no hay dosis ni esquemas de administración porque este material es exclusivamente de investigación.',
      ],
    },
    {
      type: 'prose',
      title: '1. Recuperación tisular',
      paragraphs: [
        'La reparación de un tejido es una secuencia: primero hay que controlar la inflamación para que no siga destruyendo, luego llevar células reparadoras al sitio, después construir matriz nueva y al final remodelarla. Un stack de recuperación cubre esos cuatro momentos con piezas distintas.',
        'BPC-157 y TB-500 se agrupan porque hacen cosas complementarias: uno favorece la formación de vasos nuevos y la señalización local de reparación, el otro moviliza el citoesqueleto y facilita que las células migren hacia la lesión. GHK-Cu entra en la fase de construcción, empujando síntesis de colágeno y remodelado, y KPV se encarga del lado antiinflamatorio sin los efectos sistémicos de un corticoide.',
        'La evidencia es desigual: la mayor parte viene de modelos animales de lesión tendinosa, muscular e intestinal. Es consistente y abundante en roedores, pero escasa en humanos, y así hay que interpretarla.',
      ],
    },
    {
      type: 'table',
      title: 'Stack de recuperación tisular',
      intro: 'Cada compuesto ocupa una fase distinta del proceso de reparación.',
      columns: ['Compuesto', 'Papel en el protocolo', 'Mecanismo'],
      rows: [
        [
          'BPC-157',
          'Base del stack; señalización local de reparación en tejido blando y mucosa digestiva.',
          'Regula al alza la vía VEGFR2-Akt-eNOS, promueve angiogénesis y modula el eje óxido nítrico; en modelos animales acelera cierre de lesión tendinosa e intestinal.',
        ],
        [
          'TB-500',
          'Complemento móvil; facilita que las células lleguen al sitio dañado.',
          'Fragmento sintético de timosina beta-4 que secuestra actina G y regula la polimerización del citoesqueleto, permitiendo migración celular y diferenciación de progenitores.',
        ],
        [
          'GHK-Cu',
          'Fase de construcción y remodelado de matriz, sobre todo dérmica.',
          'Tripéptido que quela cobre (II) y actúa como cofactor de lisil oxidasa; estimula síntesis de colágeno tipo I y elastina y modula metaloproteinasas de matriz.',
        ],
        [
          'KPV',
          'Control antiinflamatorio local sin inmunosupresión amplia.',
          'Tripéptido terminal de la alfa-MSH; inhibe la translocación nuclear de NF-kB y reduce la producción de citocinas proinflamatorias como TNF-alfa e IL-6.',
        ],
      ],
      note:
        'BPC-157 y TB-500 son las dos piezas que más se solapan en tiempo pero no en mecanismo: una construye el terreno vascular, la otra mueve las células sobre él.',
    },
    {
      type: 'prose',
      title: '2. Metabolismo y peso',
      paragraphs: [
        'Este es el terreno con la evidencia clínica más sólida del catálogo, y también el que más exige orden. Los incretínicos (tirzepatida, retatrutida) actúan sobre receptores de GLP-1, GIP y, en el caso de retatrutida, también glucagón: son moléculas potentes con farmacología bien documentada en ensayos de fase 3.',
        'La lógica del stack es no apilar agonistas del mismo receptor, sino sumar mecanismos distintos. Cagrilintida no toca GLP-1: es un análogo de amilina que actúa por la vía de saciedad del área postrema, y por eso combina bien con un incretínico en vez de competir con él. MOTS-c y 5-AMINO-1MQ trabajan del lado celular, no del apetito: uno sobre sensibilidad a insulina vía AMPK y otro sobre el reciclaje de NAD+ en adipocitos.',
        'Advertencia importante: tirzepatida y retatrutida no se combinan entre sí. Ambas son agonistas incretínicos y sumarlas no aumenta el efecto, aumenta la carga sobre la misma vía. En un diseño experimental se compara una contra otra, no se apilan.',
      ],
    },
    {
      type: 'table',
      title: 'Stack metabólico',
      intro: 'Vías de saciedad central, señalización incretínica y metabolismo celular.',
      columns: ['Compuesto', 'Papel en el protocolo', 'Mecanismo'],
      rows: [
        [
          'Tirzepatida',
          'Eje principal del protocolo metabólico; no se combina con retatrutida.',
          'Agonista dual de los receptores de GIP y GLP-1; retrasa el vaciamiento gástrico, potencia la secreción de insulina dependiente de glucosa y actúa sobre centros hipotalámicos de apetito.',
        ],
        [
          'Retatrutida',
          'Alternativa al eje principal, con componente de gasto energético.',
          'Agonista triple GIP/GLP-1/glucagón; al sumar el receptor de glucagón añade movilización hepática de lípidos y aumento del gasto energético a la acción incretínica.',
        ],
        [
          'Cagrilintida',
          'Segunda vía de saciedad, complementaria y no redundante con el incretínico.',
          'Análogo de amilina de acción prolongada; actúa sobre receptores de amilina y calcitonina en el área postrema, prolongando la señal de saciedad posprandial por una ruta distinta a GLP-1.',
        ],
        [
          'MOTS-c',
          'Capa celular: sensibilidad a insulina y uso de sustrato en músculo.',
          'Péptido codificado en el ADN mitocondrial; activa la vía AMPK y la ruta de folato-metionina, favoreciendo captación de glucosa y oxidación de ácidos grasos en músculo esquelético.',
        ],
        [
          '5-AMINO-1MQ',
          'Objetivo del tejido adiposo; disponibilidad de NAD+ local.',
          'Inhibidor selectivo de nicotinamida N-metiltransferasa (NNMT); al frenar la metilación de nicotinamida preserva el reservorio de NAD+ en adipocitos y modula la lipogénesis.',
        ],
      ],
      note:
        'Regla dura de este bloque: un solo agonista incretínico a la vez. Tirzepatida o retatrutida, nunca las dos.',
    },
    {
      type: 'prose',
      title: '3. Longevidad',
      paragraphs: [
        'Los protocolos de longevidad no persiguen un síntoma sino marcadores del envejecimiento celular: longitud de telómeros, función mitocondrial, disponibilidad de NAD+ e integridad de la matriz extracelular. Por eso son los stacks más heterogéneos: cada pieza mira un reloj distinto.',
        'Epithalon apunta al eje telómero-pineal, NAD+ repone el cofactor que se agota con la edad y del que dependen sirtuinas y reparación de ADN, MOTS-c aporta señalización mitocondrial, SS-31 protege específicamente la membrana interna de la mitocondria y GHK-Cu cubre el lado estructural, que también envejece.',
        'Aquí hay que ser especialmente honestos con la evidencia. Buena parte de los datos de Epithalon viene de trabajos rusos difíciles de replicar, y los estudios de NAD+ y sus precursores son prometedores pero todavía discuten cuánto llega realmente a la célula según la vía. Es un campo interesante, no un campo resuelto.',
      ],
    },
    {
      type: 'table',
      title: 'Stack de longevidad',
      intro: 'Cinco relojes biológicos distintos: telómeros, NAD+, mitocondria, membrana y matriz.',
      columns: ['Compuesto', 'Papel en el protocolo', 'Mecanismo'],
      rows: [
        [
          'Epithalon',
          'Eje telomérico y regulación pineal; suele usarse en ventanas cortas y espaciadas.',
          'Tetrapéptido derivado del extracto pineal; en modelos celulares se asocia a inducción de actividad telomerasa y a normalización de ritmos de melatonina y cortisol. Evidencia mayormente preclínica y de replicación limitada.',
        ],
        [
          'NAD+',
          'Repone el cofactor central del metabolismo redox y de la reparación del ADN.',
          'Dinucleótido esencial para sirtuinas (SIRT1, SIRT3) y PARPs; su disponibilidad cae con la edad y limita la reparación de ADN y la señalización mitocondrial.',
        ],
        [
          'MOTS-c',
          'Señal mitocondrial al núcleo; refuerza la respuesta al estrés metabólico.',
          'Péptido mitocondrial que activa AMPK y transloca al núcleo para modular genes de respuesta antioxidante y metabólica.',
        ],
        [
          'SS-31',
          'Protección dirigida de la maquinaria de producción de energía.',
          'Tetrapéptido con afinidad por cardiolipina en la membrana mitocondrial interna; estabiliza la cadena de transporte de electrones y reduce la fuga de especies reactivas de oxígeno.',
        ],
        [
          'GHK-Cu',
          'Lado estructural: la matriz extracelular también envejece.',
          'Modula cientos de genes relacionados con remodelado tisular y transporte de cobre; estimula colágeno y elastina y participa en la respuesta antioxidante.',
        ],
      ],
      note:
        'MOTS-c aparece también en el stack metabólico. Si ya está en un protocolo, no se duplica en el otro.',
    },
    {
      type: 'prose',
      title: '4. Cognición',
      paragraphs: [
        'Los stacks cognitivos separan dos cosas que suelen confundirse: el sustrato (¿la neurona tiene con qué trabajar?) y la señal (¿qué neurotransmisor está modulando la conducta?). Un protocolo bien armado toca ambas.',
        'Semax y Selank vienen de la misma escuela y son deliberadamente complementarios: Semax empuja el lado de factores neurotróficos y atención, mientras que Selank va sobre el eje GABA-serotonina y el componente ansiolítico. Uno sube el tono, el otro baja el ruido. Cerebrolysin aporta una mezcla de fragmentos peptídicos con actividad neurotrófica, y NAD+ cubre el sustrato energético neuronal.',
        'La evidencia clínica más consistente es la de Cerebrolysin, con ensayos en deterioro cognitivo y en fase post-ictus, aunque con resultados discutidos. Semax y Selank tienen uso clínico regional en Rusia y literatura limitada en revistas occidentales.',
      ],
    },
    {
      type: 'table',
      title: 'Stack cognitivo',
      intro: 'Neurotrofismo, modulación de neurotransmisores y sustrato energético.',
      columns: ['Compuesto', 'Papel en el protocolo', 'Mecanismo'],
      rows: [
        [
          'Semax',
          'Componente activador; atención y tono cognitivo.',
          'Análogo del fragmento ACTH(4-10) sin actividad hormonal; eleva la expresión de BDNF y NGF en hipocampo y modula los sistemas dopaminérgico y serotoninérgico.',
        ],
        [
          'Selank',
          'Contrapeso ansiolítico; baja el ruido sin sedar.',
          'Análogo de tuftsina; modula la expresión de receptores GABA-A y la enzima que degrada encefalinas, con efecto sobre el balance serotoninérgico.',
        ],
        [
          'NAD+',
          'Sustrato energético para tejido con alta demanda metabólica.',
          'Cofactor esencial de la producción de ATP neuronal y de las sirtuinas implicadas en supervivencia celular y reparación de ADN.',
        ],
        [
          'Cerebrolysin',
          'Aporte neurotrófico de amplio espectro; la pieza con más ensayos clínicos del stack.',
          'Mezcla de péptidos de bajo peso molecular derivados de tejido cerebral porcino, con actividad tipo factor neurotrófico sobre supervivencia y plasticidad sináptica.',
        ],
      ],
      note:
        'Semax y Selank se investigan juntos precisamente porque sus efectos son opuestos y complementarios; no son intercambiables.',
    },
    {
      type: 'prose',
      title: '5. Eje de hormona de crecimiento',
      paragraphs: [
        'Este es el stack donde más importa entender la fisiología antes de combinar. La secreción de hormona de crecimiento se controla por dos vías paralelas: la de GHRH, que dice cuánta se libera, y la de la grelina/GHSR, que dispara el pulso. Un secretagogo de cada vía se potencian; dos de la misma vía compiten.',
        'De ahí sale la combinación clásica: CJC-1295 sin DAC (análogo de GHRH, de vida media corta, que respeta la pulsatilidad natural) con ipamorelin (agonista selectivo de GHSR, sin el arrastre sobre cortisol y prolactina que tienen secretagogos más viejos). Tesamorelina es otro análogo de GHRH, con evidencia clínica en grasa visceral, y por eso mismo no se combina con CJC-1295: es la misma vía.',
        'IGF-1 LR3 está en otro nivel del eje: es el efector distal, no un secretagogo. Meterlo junto a los secretagogos rompe el bucle de retroalimentación que se está intentando estudiar, así que en diseño experimental se usa como brazo separado, no como complemento.',
      ],
    },
    {
      type: 'table',
      title: 'Stack del eje GH',
      intro: 'Dos vías de secreción paralelas más el efector distal.',
      columns: ['Compuesto', 'Papel en el protocolo', 'Mecanismo'],
      rows: [
        [
          'CJC-1295 sin DAC',
          'Vía GHRH; determina la amplitud del pulso conservando la pulsatilidad fisiológica.',
          'Análogo de GHRH (mod GRF 1-29) de vida media corta; se une al receptor de GHRH en la hipófisis anterior y aumenta la liberación de GH sin elevar el nivel basal de forma sostenida.',
        ],
        [
          'Ipamorelin',
          'Vía GHSR; dispara el pulso. Es el socio natural del análogo de GHRH.',
          'Agonista selectivo del receptor de secretagogo de GH (grelina); induce liberación de GH con mínima repercusión sobre cortisol, prolactina y apetito.',
        ],
        [
          'Tesamorelina',
          'Alternativa a CJC-1295 dentro de la misma vía; la mejor documentada clínicamente.',
          'Análogo estabilizado de GHRH con ensayos clínicos en reducción de tejido adiposo visceral en lipodistrofia asociada a VIH.',
        ],
        [
          'IGF-1 LR3',
          'Efector distal; se estudia como brazo aparte, no encima de los secretagogos.',
          'Variante recombinante de IGF-1 con baja afinidad por las proteínas transportadoras IGFBP, lo que prolonga su vida media libre y su acción sobre el receptor de IGF-1.',
        ],
      ],
      note:
        'Elige un análogo de GHRH, no dos: CJC-1295 sin DAC o tesamorelina, nunca ambos en el mismo protocolo.',
    },
    {
      type: 'prose',
      title: '6. Inmunidad',
      paragraphs: [
        'Los protocolos inmunológicos buscan modulación, no estimulación a ciegas. Un sistema inmune sobreactivado no es un sistema inmune mejor: la meta es afinar la respuesta, subir lo que está deprimido y bajar lo que está inflamando de más.',
        'Thymosin Alpha-1 es la pieza central: actúa sobre la maduración de linfocitos T y tiene aprobación regulatoria en varios países como inmunomodulador. Thymalin es un extracto peptídico tímico que se estudia en la misma dirección, con evidencia mucho más limitada y sobre todo de origen ruso. KPV aporta el freno antiinflamatorio y LL-37 el brazo antimicrobiano directo, con actividad de barrera.',
        'Al ser mecanismos que empujan en direcciones distintas (uno estimula la respuesta adaptativa, otro apaga inflamación), este es el stack donde más se nota la ventaja de introducir un compuesto a la vez: si metes todo junto, no vas a poder leer qué movió qué.',
      ],
    },
    {
      type: 'table',
      title: 'Stack inmunológico',
      intro: 'Respuesta adaptativa, modulación tímica, freno inflamatorio y defensa de barrera.',
      columns: ['Compuesto', 'Papel en el protocolo', 'Mecanismo'],
      rows: [
        [
          'Thymosin Alpha-1',
          'Núcleo del stack; la pieza con respaldo regulatorio en varios países.',
          'Péptido de 28 aminoácidos de origen tímico; actúa sobre receptores tipo Toll (TLR2, TLR9) en células dendríticas y favorece la maduración y diferenciación de linfocitos T.',
        ],
        [
          'Thymalin',
          'Complemento tímico de acción más amplia; evidencia sobre todo preclínica.',
          'Complejo de péptidos extraídos de timo bovino; se asocia a normalización de poblaciones de linfocitos T y a regulación de la relación CD4/CD8.',
        ],
        [
          'KPV',
          'Freno de la inflamación sin apagar la respuesta adaptativa.',
          'Fragmento C-terminal de alfa-MSH; bloquea la vía NF-kB y reduce citocinas proinflamatorias, con efecto documentado sobre inflamación de mucosa intestinal.',
        ],
        [
          'LL-37',
          'Brazo antimicrobiano y de defensa de barrera.',
          'Única catelicidina humana; péptido catiónico que desestabiliza membranas bacterianas por interacción electrostática y además actúa como quimioatrayente de neutrófilos y monocitos.',
        ],
      ],
      note:
        'KPV aparece también en el stack de recuperación tisular por la misma razón: su blanco, NF-kB, es común a inflamación local y sistémica.',
    },
    {
      type: 'list',
      title: 'Reglas generales para combinar',
      intro:
        'Aplican a los seis stacks. Son de diseño experimental: sirven para que los resultados sean interpretables.',
      items: [
        'Introduce un compuesto a la vez, dejando una ventana entre uno y otro. Si metes tres el mismo día y algo cambia, no vas a saber cuál lo movió.',
        'No dupliques mecanismo. Dos agonistas del mismo receptor compiten por los mismos sitios de unión; el efecto no se suma, la saturación llega igual y el ruido aumenta.',
        'No combines un fragmento con su molécula completa. TB-500 es un fragmento de timosina beta-4 y KPV es un fragmento de alfa-MSH: ponerlos junto a la molécula entera es competir contra ti mismo.',
        'Un solo análogo de GHRH por protocolo, y un solo agonista incretínico por protocolo. Son las dos colisiones más frecuentes del catálogo.',
        'Revisa si un compuesto ya está en otro stack que corras en paralelo. MOTS-c, GHK-Cu y KPV se repiten entre objetivos y es fácil duplicarlos sin darse cuenta.',
        { text: 'Armar un stack de seis compuestos desde el día uno.', bad: true },
        { text: 'Combinar tirzepatida con retatrutida "para reforzar".', bad: true },
        { text: 'Sumar CJC-1295 y tesamorelina en el mismo protocolo.', bad: true },
        { text: 'Mezclar dos compuestos en la misma jeringa para ahorrar pasos.', bad: true },
        { text: 'Cambiar dos variables a la vez y atribuirle el resultado a la que más te gusta.', bad: true },
      ],
    },
    {
      type: 'steps',
      title: 'Cómo se arma un protocolo, en orden',
      intro: 'La secuencia que recomendamos antes de comprar nada.',
      items: [
        {
          title: 'Define el objetivo en una frase medible',
          body:
            'No "mejorar recuperación", sino qué marcador vas a observar y con qué lo vas a medir. Si no puedes escribirlo, todavía no tienes protocolo.',
        },
        {
          title: 'Elige el compuesto ancla',
          body:
            'El de mecanismo más central y mejor documentado para tu objetivo. Ese es el que corre solo primero, sin acompañantes.',
        },
        {
          title: 'Mapea los mecanismos antes de sumar',
          body:
            'Escribe el receptor o la vía de cada candidato. Si dos comparten vía, uno sale del protocolo.',
          note: 'Este paso es el que evita el 90% de los stacks mal armados.',
        },
        {
          title: 'Introduce el segundo compuesto con ventana de por medio',
          body:
            'Deja pasar suficiente tiempo para poder atribuir cualquier cambio a la nueva variable y no al arrastre de la anterior.',
        },
        {
          title: 'Registra todo con fecha y lote',
          body:
            'Lote, fecha de reconstitución, concentración y observaciones. El seguimiento de consumo de /cuenta te lleva parte de esa contabilidad y te avisa cuándo se va a acabar un vial.',
        },
        {
          title: 'Cierra el ciclo antes de cambiar de stack',
          body:
            'Termina de leer los datos del protocolo actual antes de arrancar otro. Los protocolos encimados no se pueden interpretar.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'danger',
      title: 'Solo para investigación (RUO)',
      body:
        'Los compuestos descritos aquí son reactivos de investigación. No son medicamentos, no están aprobados para consumo humano ni animal y esta página no contiene ni contendrá pautas de administración en personas. Todo lo anterior describe mecanismos y lógica de diseño experimental, no tratamiento. Cualquier decisión clínica corresponde a un profesional de la salud.',
    },
    {
      type: 'cards',
      title: 'Siguiente paso',
      intro: 'Si ya tienes claro el objetivo, aquí lo aterrizas.',
      items: [
        {
          title: 'Asesor de protocolo',
          body:
            'Contesta unas preguntas sobre tu objetivo y te devolvemos un plan con compuestos, razonamiento y presentaciones.',
          to: '/asesor',
          cta: 'Armar mi plan',
        },
        {
          title: 'Catálogo completo',
          body: 'Fichas por compuesto con pureza, presentación, nivel de evidencia y disponibilidad.',
          to: '/catalogo',
          cta: 'Ver catálogo',
        },
      ],
    },
  ],
  related: [
    {
      to: '/aprende/preguntas-principiantes',
      title: 'Lo que nadie te explica en tu primer pedido',
      desc: 'Manejo del material, reconstitución y conservación, explicado desde cero.',
    },
    {
      to: '/aprende/preguntas-frecuentes',
      title: 'Preguntas frecuentes',
      desc: 'Pedidos, pagos, descuentos por volumen, envíos FedEx y reposiciones.',
    },
    {
      to: '/calculadora',
      title: 'Calculadora de reconstitución',
      desc: 'Miligramos, volumen de diluyente y unidades de jeringa, sin errores de regla de tres.',
    },
  ],
};

export default page;
