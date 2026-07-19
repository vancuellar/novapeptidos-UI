const page = {
  slug: 'pureza-hplc',
  title: 'Pureza por HPLC: qué mide realmente ese 99%',
  subtitle:
    'Cómo funciona la cromatografía líquida de alta resolución aplicada a péptidos, de dónde salen las impurezas y qué preguntarle a cualquier proveedor antes de creerle un número.',
  badge: 'Técnica',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'Qué es la HPLC y para qué la usamos',
      paragraphs: [
        'HPLC significa cromatografía líquida de alta resolución. La idea es vieja y simple: si empujas una mezcla a través de un material que retiene distinto a cada componente, los componentes salen en momentos distintos y puedes contarlos por separado. Lo de "alta resolución" viene de hacerlo a presión alta, con partículas muy pequeñas y muy uniformes, lo que separa mucho mejor que una columna de gravedad.',
        'Aplicada a péptidos, la HPLC hace dos trabajos. En modo preparativo, purifica: se recoge la fracción que contiene el péptido correcto y se descarta el resto. En modo analítico, mide: se inyecta una cantidad mínima y se cuantifica qué proporción de la muestra es el pico principal. Ese segundo uso es el que produce el número de pureza que aparece en el certificado de análisis.',
        'Importante desde el principio: la HPLC mide proporciones de lo que el detector alcanza a ver. No mide identidad. Para eso hace falta espectrometría de masas, que se explica en la guía de control de calidad.',
      ],
    },
    {
      type: 'prose',
      title: 'Fase reversa: qué separa y por qué',
      paragraphs: [
        'Casi todo el análisis de péptidos se hace en fase reversa (RP-HPLC). El nombre viene de que invierte la polaridad de la cromatografía clásica: aquí la columna es apolar y el disolvente es polar. La columna estándar es sílice con cadenas de dieciocho carbonos injertadas en la superficie, de ahí el nombre C18. Esa superficie es, en esencia, grasa inmovilizada.',
        'El mecanismo es hidrofobicidad. Un péptido con muchos residuos apolares —leucina, isoleucina, valina, fenilalanina, triptófano— se siente cómodo pegado a las cadenas C18 y se queda ahí. Uno con muchos residuos cargados o polares —lisina, arginina, ácido aspártico, serina— prefiere el agua y avanza rápido. La separación es, literalmente, una competencia entre pegarse a la grasa o quedarse en el agua.',
        'Para despegar lo que se pegó se usa un gradiente: se empieza con mucha agua y se va subiendo poco a poco la proporción de acetonitrilo, que es un disolvente orgánico. Conforme el disolvente se vuelve menos polar, va arrancando de la columna primero a las moléculas menos hidrofóbicas y después a las más. Cada una sale en su momento y produce su pico.',
        'La consecuencia práctica es que dos péptidos que se parecen mucho en secuencia salen en tiempos parecidos, y ahí es donde el método tiene que estar bien diseñado. Un cambio de un solo aminoácido puede mover el pico apenas unas décimas de minuto; si el gradiente es demasiado rápido, esas décimas desaparecen y dos sustancias distintas se cuentan como una sola.',
      ],
    },
    {
      type: 'table',
      title: 'Parámetros típicos de un método analítico para péptidos',
      intro:
        'Estos son valores habituales en análisis de rutina. No son la única configuración válida, pero sí el punto de comparación: un método que se aleja mucho de esto debería justificar por qué.',
      columns: ['Parámetro', 'Valor típico', 'Por qué'],
      rows: [
        [
          'Columna',
          'C18, 250 × 4.6 mm, partícula 5 µm, poro 100–300 Å',
          'El C18 da la retención hidrofóbica necesaria. 250 mm de largo da más platos teóricos, es decir, más capacidad de separar picos vecinos. Para péptidos grandes se prefiere poro amplio (300 Å) para que la molécula entre al poro y no se quede fuera.',
        ],
        [
          'Fase móvil A',
          'Agua con 0.1% de ácido trifluoroacético (TFA)',
          'El TFA acidifica el medio, protona los grupos básicos del péptido y forma pares iónicos que mejoran mucho la forma del pico. Sin él, los picos salen anchos y con cola.',
        ],
        [
          'Fase móvil B',
          'Acetonitrilo con 0.1% de TFA',
          'El acetonitrilo es el disolvente orgánico que despega el péptido de la columna. Se le pone el mismo 0.1% de TFA para que la línea base no se desplace al cambiar la proporción durante el gradiente.',
        ],
        [
          'Gradiente',
          'De 5% a 65% de B en 30 min (≈2% B/min)',
          'Una rampa suave da tiempo a que impurezas de estructura parecida se separen del pico principal. Gradientes de 10 minutos son rápidos y baratos, pero esconden impurezas cercanas.',
        ],
        [
          'Flujo',
          '1.0 mL/min',
          'Es el flujo estándar para columnas de 4.6 mm de diámetro interno. Más flujo acorta la corrida pero empeora la resolución; menos flujo la mejora y alarga el análisis.',
        ],
        [
          'Detección UV',
          '214–220 nm',
          'A esa longitud de onda absorbe el enlace peptídico mismo, así que todos los péptidos se ven, tengan o no aminoácidos aromáticos. A 280 nm solo se ven los que llevan triptófano, tirosina o fenilalanina, y muchas impurezas quedarían invisibles.',
        ],
        [
          'Temperatura de columna',
          '25–30 °C, controlada',
          'La retención depende de la temperatura. Si no se controla, el tiempo de retención se mueve entre corridas y las comparaciones dejan de ser válidas.',
        ],
        [
          'Volumen de inyección',
          '20 µL',
          'Suficiente para tener señal y poco para no sobrecargar la columna. Inyectar de más aplana y ensancha el pico principal, y eso enmascara impurezas que quedan debajo.',
        ],
        [
          'Preparación de muestra',
          'Disolución y filtración a 0.22 µm',
          'Cualquier partícula sólida tapa la columna o el frit de entrada. El filtro de 0.22 µm elimina material insoluble antes de inyectar y protege equipo que cuesta mucho más que la muestra.',
        ],
        [
          'Concentración de muestra',
          '≈0.5–1.0 mg/mL',
          'Rango donde el detector responde de forma lineal. Por arriba se satura y el porcentaje de pureza sale inflado; por abajo, las impurezas menores se pierden en el ruido.',
        ],
      ],
      note:
        'Un método reportado de forma completa incluye, como mínimo: columna con dimensiones y tamaño de partícula, composición de ambas fases móviles, perfil del gradiente con tiempos, flujo, temperatura y longitud de onda de detección. Si falta alguno, el número de pureza no es reproducible.',
    },
    {
      type: 'prose',
      title: 'Qué es un pico de impureza',
      paragraphs: [
        'Un pico de impureza es cualquier pico distinto del principal. El software del cromatógrafo integra el área de todos y calcula la pureza como el área del pico principal dividida entre el área total, por cien. Si el pico principal ocupa 992,000 de un área total de 1,000,000, la pureza es 99.2%.',
        'El detalle que casi nadie menciona: solo se cuentan las impurezas que absorben a la longitud de onda usada y que efectivamente salen de la columna dentro del tiempo de la corrida. Sales inorgánicas, agua y disolventes residuales prácticamente no se ven a 214 nm. Por eso un lote puede reportar 99% de pureza cromatográfica y aun así tener, en masa, una fracción importante de material que no es péptido.',
      ],
    },
    {
      type: 'list',
      title: 'De dónde salen las impurezas',
      intro:
        'Casi todas se generan durante la síntesis o el manejo posterior, y cada tipo deja una firma reconocible en el cromatograma y en el espectro de masas.',
      items: [
        'Deleción: un ciclo de acoplamiento falló y la cadena quedó sin un aminoácido interno. La masa baja exactamente el residuo faltante y el pico suele salir muy cerca del principal, porque la molécula es casi idéntica. Es la impureza más difícil de separar y la más peligrosa de ignorar.',
        'Truncamiento: la cadena se detuvo antes de terminar y quedó un fragmento más corto. Al ser más pequeño y normalmente menos hidrofóbico, tiende a salir antes que el pico principal.',
        'Oxidación: metionina, cisteína o triptófano capturaron oxígeno, casi siempre por exposición al aire o por almacenamiento en solución. Suma 16 Da por átomo de oxígeno y el pico suele adelantarse, porque el producto oxidado es más polar.',
        'Contraión: el TFA de la purificación queda asociado al péptido como trifluoroacetato. No aparece como pico a 214 nm, pero sí pesa en la balanza y puede representar entre 5% y 20% de la masa del polvo.',
        'Agua residual: el polvo liofilizado es higroscópico y absorbe humedad del ambiente, sobre todo si el vial se abre en frío y se condensa agua dentro. Tampoco se ve por UV y también resta al contenido neto de péptido.',
        'Productos de degradación: hidrólisis, desamidación de asparagina o glutamina, o formación de dímeros por puentes disulfuro. Aparecen cuando el material lleva tiempo mal almacenado y cambian el perfil respecto al COA original.',
        { text: 'Un cromatograma con un solo pico y nada más no es prueba de perfección: puede ser una corrida demasiado corta, un detector saturado o una escala que aplana lo pequeño.', bad: true },
      ],
    },
    {
      type: 'prose',
      title: 'Por qué "99%" sin método declarado no significa nada',
      paragraphs: [
        'El porcentaje de pureza no es una propiedad de la molécula: es el resultado de una medición. Cambia el método y cambia el número, con la misma muestra en el mismo laboratorio el mismo día.',
        'Piensa en el gradiente. Con una rampa de 30 minutos, una impureza de deleción se separa del pico principal y se integra aparte: la muestra sale 97.8%. Con una rampa de 8 minutos, esa misma impureza queda debajo del hombro del pico principal, el software integra todo junto y la misma muestra sale 99.4%. Nadie mintió en la aritmética. El método fue el que decidió el resultado.',
        'Lo mismo pasa con la longitud de onda. A 280 nm solo se ven los componentes con aminoácidos aromáticos; cualquier impureza sin ellos desaparece del cálculo y la pureza aparente sube. Y con la carga de columna: inyectar demasiado ensancha el pico principal hasta enterrar a sus vecinos.',
        'De ahí la regla: un número de pureza sin método declarado es una afirmación sin unidades. No es comparable entre proveedores, no es verificable y no sirve para decidir. Exige el método o exige el cromatograma; idealmente los dos.',
      ],
    },
    {
      type: 'list',
      title: 'Qué preguntarle a cualquier proveedor',
      intro:
        'Estas preguntas se contestan en un correo. La calidad de las respuestas te dice más del proveedor que su página web.',
      items: [
        '¿Me pueden enviar el COA del lote específico que me van a mandar, no el de un lote anterior?',
        '¿Qué método de HPLC usaron? Necesito columna, gradiente con tiempos, flujo y longitud de onda de detección.',
        '¿Puedo ver el cromatograma completo, con la escala sin recortar y el tiempo total de corrida?',
        '¿Confirmaron identidad por espectrometría de masas? ¿Cuál fue la masa teórica y cuál la observada?',
        '¿Cuál es el contenido neto de péptido, además de la pureza cromatográfica? ¿Con qué contraión está el material?',
        '¿Cuál es la fecha de análisis del lote y cuándo se sintetizó?',
        '¿El análisis lo hicieron ustedes o un laboratorio externo? ¿Cuál?',
        { text: 'Si la respuesta es "todos nuestros productos son 99%+" sin documento por lote, esa es la respuesta: no hay análisis por lote.', bad: true },
        { text: 'Si mandan un PDF sin número de lote, o el mismo PDF que ya circulaba en otro sitio, no lo aceptes.', bad: true },
      ],
    },
    {
      type: 'prose',
      title: 'Pureza cromatográfica vs. contenido neto de péptido',
      paragraphs: [
        'Son dos preguntas distintas y se confunden todo el tiempo. La pureza cromatográfica pregunta: de todo lo que el detector vio, ¿qué fracción es el péptido correcto? El contenido neto de péptido pregunta: de la masa total del polvo en el vial, ¿cuántos miligramos son péptido de verdad?',
        'Un ejemplo con números. Un vial rotulado con 5 mg de material, con 99% de pureza cromatográfica. Si el contenido neto de péptido es 80%, dentro hay unos 4.0 mg de péptido; el resto es trifluoroacetato y agua. Ambos datos son correctos y no se contradicen: el 99% habla de la composición de lo que absorbe UV, el 80% habla de la masa del polvo.',
        'Para trabajo cualitativo la diferencia suele ser irrelevante. Para cualquier cálculo de concentración molar, curva de calibración o comparación cuantitativa entre lotes, usar la masa nominal en lugar del contenido neto introduce un error sistemático de hasta 20%, y ese error se arrastra a todos los resultados.',
        'El contenido neto se determina por análisis de aminoácidos o por cuantificación UV con coeficiente de extinción conocido, y no siempre viene en el COA de rutina. Si tu experimento lo necesita, pídelo explícitamente.',
      ],
    },
    {
      type: 'table',
      title: 'Los dos números, lado a lado',
      intro: 'Misma muestra, dos preguntas diferentes.',
      columns: ['', 'Pureza cromatográfica', 'Contenido neto de péptido'],
      rows: [
        ['Qué responde', 'De lo detectado, ¿qué fracción es el péptido correcto?', 'De la masa del polvo, ¿cuánto es péptido?'],
        ['Cómo se mide', 'RP-HPLC con detección UV a 214–220 nm', 'Análisis de aminoácidos o cuantificación UV con coeficiente de extinción'],
        ['Qué NO ve', 'Sales, contraión, agua residual, disolventes', 'Impurezas peptídicas de estructura parecida'],
        ['Valor típico', '95–99%+', '70–90% del peso del polvo'],
        ['Cuándo es crítico', 'Siempre; define si el lote se libera', 'Cuando el cálculo de concentración tiene que ser exacto'],
      ],
      note:
        'Si alguien te ofrece un solo número y te dice que resume ambas cosas, no es así: son mediciones independientes.',
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Material de investigación',
      body:
        'Todo lo descrito aquí se refiere a la caracterización química de insumos de investigación (RUO). Los productos de Exygen Labs no son medicamentos, no están destinados a consumo humano ni animal y no deben usarse con fines diagnósticos o terapéuticos.',
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Por qué se usa TFA si contamina la masa del polvo?',
          a: 'Porque mejora muchísimo la forma del pico: sin él, los picos de péptidos salen anchos y con cola, y la separación empeora al punto de que el número de pureza deja de ser confiable. El costo es que el trifluoroacetato queda como contraión. Existen alternativas, como el ácido fórmico —preferido cuando el análisis se acopla a espectrometría de masas, porque el TFA suprime la señal— pero da picos con peor forma. Es un intercambio conocido y aceptado en el análisis de rutina.',
        },
        {
          q: '¿Un pico único garantiza que el péptido es el correcto?',
          a: 'No. Un pico único solo dice que hay un componente dominante entre lo que el detector alcanzó a ver. Una secuencia con un aminoácido equivocado, o una deleción purificada, puede dar un pico perfectamente limpio. La única forma de confirmar identidad es medir la masa por espectrometría y compararla con la masa calculada de la secuencia declarada.',
        },
        {
          q: '¿Por qué mi resultado no coincide exactamente con el del proveedor?',
          a: 'Porque el número depende del método, y ningún laboratorio replica exactamente la columna, el gradiente y la longitud de onda de otro. Diferencias de 0.2 a 0.5 puntos porcentuales entre laboratorios son normales. Diferencias de varios puntos, o un perfil de picos claramente distinto, sí ameritan preguntar: puede ser el método, pero también degradación durante el transporte o un lote distinto al documentado.',
        },
        {
          q: '¿Cuánto cambia el resultado si acorto el gradiente?',
          a: 'Bastante, y siempre hacia arriba. Un gradiente rápido comprime la escala de tiempo y las impurezas de estructura parecida al péptido principal dejan de resolverse; el software integra el conjunto como un solo pico. Es la manera más común de reportar cifras infladas sin falsificar nada. Si comparas dos proveedores, compara primero sus gradientes.',
        },
        {
          q: '¿Qué es un hombro en un pico y por qué importa?',
          a: 'Un hombro es un bulto asimétrico en el flanco del pico principal: una impureza que casi se separó pero no del todo. Importa porque el software puede no reconocerlo como pico independiente y sumarlo al principal, subiendo la pureza reportada. Ver el cromatograma es la única forma de detectarlo; el porcentaje solo no lo revela. Si ves hombros, pide una corrida con gradiente más lento.',
        },
        {
          q: '¿Sirve de algo la HPLC para saber si mi material se degradó?',
          a: 'Sí, y es su mejor uso después de la compra. Si corres el material con el mismo método del COA y aparecen picos nuevos que no estaban, o el pico principal bajó su proporción, tienes evidencia directa de degradación. Es la razón por la que conviene guardar el cromatograma original: sin punto de partida no hay comparación posible. Requiere acceso a un equipo de HPLC, que no todos los laboratorios pequeños tienen.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Pide el método, no solo el número',
      body:
        'Escríbenos a hola@exygenlabs.com con el producto y el número de lote y te enviamos el COA con el método de HPLC completo. No tenemos galería pública de certificados todavía; se entregan por correo, bajo solicitud, siempre del lote que te corresponde.',
    },
  ],
  related: [
    {
      to: '/aprende/control-calidad',
      title: 'Control de calidad de un lote',
      desc: 'El recorrido completo de la síntesis a la liberación, y cómo leer un COA sin ser químico.',
    },
    {
      to: '/aprende/legalidad',
      title: '¿Es legal comprar péptidos de investigación en México?',
      desc: 'Marco aplicable, condiciones de uso como insumo de investigación y qué cambia al importar.',
    },
    {
      to: '/catalogo',
      title: 'Catálogo',
      desc: 'Cada producto se libera con análisis por lote; el COA se solicita por correo.',
    },
  ],
};

export default page;
