// Fundamentos: química de péptidos, clasificación funcional y por qué se estudian. RUO.
const page = {
  slug: 'peptidos-explicados',
  title: 'Péptidos explicados desde cero',
  subtitle:
    'De aminoácido a molécula funcional: qué es un péptido, en qué se diferencia de una proteína, cómo se clasifican por función y por qué llegan como polvo liofilizado.',
  badge: 'Fundamentos',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'La definición corta',
      paragraphs: [
        'Un péptido es una cadena corta de aminoácidos unidos en fila. Nada más. Lo que cambia entre un péptido y otro es cuáles aminoácidos son y en qué orden van, y ese orden es lo que determina qué forma toma la molécula y con qué receptores puede interactuar.',
        'La convención más usada es que un péptido tiene entre 2 y 50 aminoácidos. Por arriba de eso ya se habla de proteína. La frontera es práctica, no una ley de la naturaleza: la insulina, con 51 aminoácidos en dos cadenas, aparece descrita a veces como péptido y a veces como proteína pequeña.',
        'El cuerpo humano fabrica cientos de péptidos propios y los usa como mensajeros: le dicen a un tejido que libere una hormona, a una célula que empiece a reparar, a un circuito que se active o se apague. Por eso son un objeto de estudio tan denso en farmacología y biología celular.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Marco de uso',
      body:
        'Todo el material del catálogo es de uso exclusivo en investigación (RUO). No está aprobado ni destinado para consumo humano ni animal. Esta página explica química y mecanismos según la literatura publicada; no es orientación médica ni una recomendación de uso.',
    },
    {
      type: 'steps',
      title: 'De aminoácido a péptido, en cuatro pasos',
      intro: 'Así se construye la molécula, del ladrillo más pequeño a la forma final.',
      items: [
        {
          title: 'El ladrillo: el aminoácido',
          body:
            'Cada aminoácido tiene la misma estructura base —un grupo amino (NH2), un grupo carboxilo (COOH) y un carbono central— más una cadena lateral que lo hace único. Existen 20 aminoácidos estándar codificados genéticamente; su cadena lateral define si es hidrofóbico, cargado, ácido o básico.',
          note: 'Ejemplo: la glicina tiene la cadena lateral más pequeña posible (un solo hidrógeno) y el triptófano una de las más voluminosas, con un anillo doble.',
        },
        {
          title: 'La unión: el enlace peptídico',
          body:
            'El grupo carboxilo de un aminoácido reacciona con el grupo amino del siguiente, se libera una molécula de agua y queda un enlace CO-NH. Ese enlace es rígido y plano, con carácter parcial de doble enlace, lo que restringe cómo puede girar la cadena. Es una unión covalente fuerte, no una atracción débil.',
          note: 'A la reacción se le llama condensación: dos aminoácidos entran, sale una molécula de agua y queda un dipéptido.',
        },
        {
          title: 'El orden: la secuencia',
          body:
            'La cadena se escribe siempre del extremo N-terminal (amino libre) al C-terminal (carboxilo libre), y se representa con letras o abreviaturas de tres letras. Cambiar un solo aminoácido de posición produce una molécula distinta, con actividad distinta. La secuencia es la estructura primaria.',
          note: 'Con 20 aminoácidos posibles en cada posición, un péptido de 10 residuos admite 20^10 secuencias: más de 10 billones de combinaciones.',
        },
        {
          title: 'La forma: estructura tridimensional',
          body:
            'La cadena no queda estirada. Se pliega sobre sí misma por puentes de hidrógeno, interacciones entre cadenas laterales y a veces puentes disulfuro entre cisteínas, y adopta motivos como la hélice alfa o la lámina beta. Esa forma en el espacio es lo que encaja o no encaja en un receptor. Calor, pH extremo o agitación mecánica pueden desarmarla, y un péptido desplegado pierde actividad aunque su secuencia siga intacta.',
          note: 'Por eso el manejo importa: agitar el vial con fuerza no rompe el enlace peptídico, pero sí puede arruinar la conformación.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Ficha molecular: los números reales',
      intro: 'Parámetros típicos de un péptido de investigación, para calibrar la escala de lo que manejas.',
      columns: ['Parámetro', 'Valor típico', 'Nota'],
      rows: [
        ['Longitud', '2 a 50 aminoácidos', 'Por encima de 50 se habla de proteína'],
        ['Peso molecular', 'aprox. 500 a 5,000 Da', 'Un aminoácido promedio aporta unos 110 Da a la cadena'],
        ['Enlace que une residuos', 'Peptídico, CO-NH', 'Covalente, plano y rígido; libera H2O al formarse'],
        ['Aminoácidos estándar', '20', 'Más análogos sintéticos no naturales en péptidos de diseño'],
        ['Vida media en circulación', 'minutos a horas según la molécula', 'Modificaciones como acetilación o PEGilación la alargan'],
        ['Presentación de laboratorio', 'Polvo liofilizado, 2 a 100 mg por vial', 'Se reconstituye antes de usar'],
        ['Solubilidad habitual', 'Agua o solución acuosa', 'Algunos requieren ácido acético diluido o solventes específicos'],
      ],
      note: 'Da = dalton, la unidad de masa molecular. Un péptido de 3,500 Da pesa unas 3,500 veces un átomo de hidrógeno.',
    },
    {
      type: 'table',
      title: 'Péptido, proteína, colágeno y péptido cosmético',
      intro: 'Cuatro cosas que se confunden en cuanto sales de la literatura técnica.',
      columns: ['Qué es', 'Tamaño', 'Cómo actúa', 'Ejemplo'],
      rows: [
        [
          'Péptido',
          '2 a 50 aminoácidos',
          'Suele actuar como señal: se une a un receptor y dispara una respuesta',
          'Epithalon, con 4 aminoácidos',
        ],
        [
          'Proteína',
          'Más de 50 aminoácidos, a veces miles',
          'Función estructural, enzimática o de transporte, con plegamiento complejo',
          'Somatropina (HGH 191AA), con 191 residuos',
        ],
        [
          'Colágeno hidrolizado',
          'Mezcla de fragmentos, sin secuencia definida',
          'Se consume como fuente de aminoácidos; no es una molécula única de señalización',
          'Polvo de colágeno de suplemento',
        ],
        [
          'Péptido cosmético tópico',
          'Cadena corta, a menudo unida a un lípido o a un metal',
          'Aplicación en superficie; el reto es la penetración a través de la barrera cutánea',
          'Matrixyl, SNAP-8, GHK-Cu',
        ],
      ],
      note: 'La diferencia entre colágeno de suplemento y un péptido de investigación no es de grado: son categorías distintas de material.',
    },
    {
      type: 'table',
      title: 'Clasificación funcional por grupo',
      intro:
        'La forma más útil de ordenar el catálogo no es por tamaño sino por lo que hacen. Los ejemplos son compuestos que manejamos, listados solo como referencia de categoría.',
      columns: ['Grupo', 'Qué hace en términos generales', 'Ejemplos del catálogo'],
      rows: [
        [
          'Hormonales / análogos de incretina',
          'Imitan o modulan hormonas endógenas y sus ejes de señalización',
          'Semaglutida, Tirzepatida, Retatrutida, Liraglutida',
        ],
        [
          'Señalización y reparación tisular',
          'Participan en cascadas de migración celular, angiogénesis y remodelado de matriz',
          'BPC-157, TB-500, KPV, ARA-290',
        ],
        [
          'Nootrópicos y neuropéptidos',
          'Actúan sobre circuitos del sistema nervioso central, sueño y respuesta al estrés',
          'Semax, Selank, DSIP, Cerebrolysin, P21',
        ],
        [
          'Secretagogos de hormona de crecimiento',
          'Estimulan la liberación pulsátil de GH desde la hipófisis en modelos estudiados',
          'Ipamorelin, CJC-1295, Hexarelin, GHRP-2, GHRP-6, Sermorelina',
        ],
        [
          'Bioreguladores peptídicos cortos',
          'Cadenas de 2 a 4 aminoácidos estudiadas por su interacción con ADN y regulación de expresión génica',
          'Epithalon, Thymalin, Pinealon, Crystagen',
        ],
        [
          'Metabólicos y mitocondriales',
          'Estudiados en vías de metabolismo energético y función mitocondrial',
          'MOTS-c, SS-31, Humanin, NAD+, 5-AMINO-1MQ',
        ],
        [
          'Cosméticos y dérmicos',
          'Investigados en formulación tópica sobre piel, cabello y matriz dérmica',
          'GHK-Cu, AHK-Cu, Matrixyl, SNAP-8',
        ],
      ],
      note: 'Un mismo compuesto puede caer en dos grupos. La clasificación es una herramienta de navegación, no una etiqueta rígida.',
    },
    {
      type: 'list',
      title: 'Por qué se estudian tanto',
      intro: 'Hay razones concretas por las que los péptidos concentran tanta investigación desde los años ochenta.',
      items: [
        'Selectividad: al ser copias o variantes de mensajeros que el cuerpo ya usa, tienden a unirse a un receptor específico en lugar de repartirse por todo el organismo como muchas moléculas pequeñas.',
        'Potencia por masa: actúan en concentraciones nanomolares, es decir cantidades diminutas producen una señal medible en el modelo estudiado.',
        'Degradación limpia en el organismo: al final se rompen en aminoácidos, que son metabolitos comunes, en lugar de dejar productos exóticos.',
        'Síntesis controlada: la síntesis en fase sólida permite fabricar una secuencia exacta y verificarla por HPLC y espectrometría de masas, con pureza reportada por lote.',
        'Modificabilidad: cambiar un aminoácido, acetilar el extremo o agregar una cadena de PEG altera la estabilidad y la duración sin rediseñar la molécula entera.',
        'La contraparte honesta: son frágiles al calor y a las proteasas, no sobreviven bien al tracto digestivo y muchos requieren vías de administración específicas en modelos. Esa fragilidad es justo lo que hace difícil traducir resultados de laboratorio a aplicaciones.',
      ],
    },
    {
      type: 'prose',
      title: 'Qué significa liofilizado',
      paragraphs: [
        'Liofilizar es secar por congelación al vacío. El péptido se disuelve, se congela a temperaturas del orden de −40 °C y luego se baja la presión para que el hielo pase directo a vapor sin pasar por líquido, un proceso llamado sublimación. Queda una matriz porosa seca con el producto dentro.',
        'Se hace por una razón simple: en solución, un péptido se degrada por hidrólisis, oxidación y agregación en cuestión de días o semanas. En seco y en frío, la misma molécula aguanta meses o años porque sin agua las reacciones de degradación casi no ocurren.',
        'Esa es la razón de que el vial llegue como polvo y de que tú tengas que reconstituirlo. También explica por qué la humedad es el enemigo del vial cerrado: si abres el frasco recién sacado del refrigerador, el aire tibio condensa agua adentro y arranca la degradación antes de tiempo.',
        'El aspecto del liofilizado varía: pastilla compacta, escamas, o una película casi invisible pegada al vidrio. Las tres son normales y no dicen nada sobre la pureza. Para eso está el certificado de análisis del lote.',
      ],
    },
    {
      type: 'list',
      title: 'Cómo se fabrican y cómo se verifican',
      intro: 'Resumen del camino de producción, porque el COA que recibes solo tiene sentido si sabes qué mide.',
      items: [
        'Síntesis en fase sólida (SPPS): la cadena se construye aminoácido por aminoácido sobre un soporte de resina, protegiendo y desprotegiendo grupos reactivos en cada ciclo.',
        'Corte y purificación: el péptido se separa de la resina y se purifica por HPLC en fase reversa, que separa las moléculas según su afinidad por la columna.',
        'Confirmación de identidad: la espectrometría de masas verifica que el peso molecular obtenido coincida con el teórico de esa secuencia.',
        'Pureza reportada: el COA da un porcentaje, típicamente entre 98% y 99%. El resto son subproductos de síntesis, no otro compuesto activo.',
        'Liofilización, llenado y sellado del vial con tapón de goma y sello de aluminio, cada tanda con su número de lote.',
      ],
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Cuál es la diferencia real entre un péptido y una proteína?',
          a: 'Fundamentalmente el tamaño y, con él, la complejidad del plegamiento. Por convención, hasta 50 aminoácidos es péptido y arriba es proteína. Las proteínas suelen tener estructura terciaria y cuaternaria elaborada; los péptidos, al ser cortos, tienen conformaciones más simples y suelen actuar como señales más que como estructuras o enzimas.',
        },
        {
          q: '¿El colágeno que se vende como suplemento es un péptido?',
          a: 'Es una mezcla de fragmentos de colágeno hidrolizado, no una molécula única con secuencia definida. Se comporta como fuente de aminoácidos, no como un mensajero que se une a un receptor específico. Es una categoría distinta de la de un péptido de investigación de secuencia conocida.',
        },
        {
          q: '¿Por qué los péptidos no funcionan bien por vía oral en los estudios?',
          a: 'Porque el aparato digestivo está diseñado precisamente para romper enlaces peptídicos: el ácido gástrico y las proteasas degradan la cadena antes de que llegue a circulación. Existen estrategias de formulación con potenciadores de absorción y modificaciones químicas para sortearlo, pero es un problema técnico abierto.',
        },
        {
          q: '¿Qué significa que un péptido sea "sintético"?',
          a: 'Que se fabricó en laboratorio en lugar de extraerse de un tejido. La secuencia puede ser idéntica a la natural o llevar modificaciones deliberadas. Sintético no implica inferior: la síntesis controlada suele dar mayor pureza y trazabilidad que un extracto biológico.',
        },
        {
          q: '¿Qué quiere decir la pureza de 99% del COA?',
          a: 'Que en el análisis por HPLC, el 99% del área bajo la curva corresponde al pico del compuesto objetivo. El 1% restante son impurezas de síntesis, como cadenas truncadas o formas oxidadas. La pureza no dice nada sobre potencia biológica, solo sobre composición química.',
        },
        {
          q: '¿Los péptidos del catálogo se pueden consumir?',
          a: 'No. Son materiales de investigación (RUO), no aprobados ni destinados a consumo humano ni animal. No proporcionamos protocolos de administración ni consejo médico de ningún tipo. Para cualquier tema de salud, consulta a un profesional certificado.',
        },
      ],
    },
    {
      type: 'cards',
      title: 'Continúa por aquí',
      intro: 'Rutas naturales después de los fundamentos.',
      items: [
        {
          title: 'Glosario en español simple',
          body: 'Treinta términos técnicos traducidos, cada uno con un ejemplo numérico concreto.',
          to: '/aprende/diccionario-basico',
          cta: 'Ver glosario',
        },
        {
          title: 'Empieza aquí',
          body: 'Si nunca has manejado un vial: qué llega, qué material hace falta y el recorrido completo.',
          to: '/aprende/empieza-aqui',
          cta: 'Leer la guía',
        },
        {
          title: 'Calidad y certificados',
          body: 'Cómo se prueba cada lote por HPLC y espectrometría de masas, y dónde consultar el COA.',
          to: '/info/calidad',
          cta: 'Ver calidad',
        },
        {
          title: 'Catálogo por categoría',
          body: 'Los grupos funcionales de esta página, con los compuestos disponibles de cada uno.',
          to: '/catalogo',
          cta: 'Explorar catálogo',
        },
      ],
    },
  ],
  related: [
    { to: '/aprende/empieza-aqui', title: 'Empieza aquí', desc: 'Tu primera vez con un vial, en 5 minutos.' },
    { to: '/aprende/diccionario-basico', title: 'Diccionario básico', desc: 'Cada término explicado en llano y con un ejemplo numérico.' },
    { to: '/aprende/reconstitucion-paso-a-paso', title: 'Cómo reconstituir', desc: 'Del polvo a la solución, con volúmenes reales.' },
    { to: '/info/calidad', title: 'Calidad y COA', desc: 'Qué se mide en cada lote y cómo leerlo.' },
  ],
};

export default page;
