const page = {
  slug: 'conservacion',
  title: 'Conservación y estabilidad de péptidos',
  subtitle:
    'Qué temperatura usar, cuánto dura realmente cada estado, cómo reconocer material degradado y qué hacer cuando se va la luz o hay que mover el inventario.',
  badge: 'Guía',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'warn',
      title: 'Uso exclusivo en investigación (RUO)',
      body:
        'Los compuestos mencionados son para investigación in vitro y uso analítico de laboratorio. No son para consumo humano ni animal, no son medicamentos y nada de lo aquí escrito constituye indicación de administración ni consejo médico. Se habla de manejo, almacenamiento y estabilidad química del material.',
    },
    {
      type: 'prose',
      title: 'La regla de fondo: el enemigo es el agua',
      paragraphs: [
        'Casi toda la degradación de un péptido necesita agua para ocurrir. La hidrólisis del enlace peptídico, la desamidación de asparagina y glutamina, la agregación de cadenas que se despliegan: todas esas rutas requieren moléculas de agua móviles alrededor de la proteína.',
        'Por eso el liofilizado dura tanto. Al quitarle el agua por sublimación al vacío, el péptido queda atrapado en una matriz sólida donde no hay movilidad molecular suficiente para reaccionar. La velocidad de degradación no se vuelve cero, pero baja uno o dos órdenes de magnitud.',
        'La segunda variable es la temperatura. Como regla práctica de cinética química, cada 10 °C menos aproximadamente reduce a la mitad la velocidad de las reacciones de degradación. De ahí que la diferencia entre 25 °C y 4 °C sea enorme, y la diferencia entre 4 °C y −20 °C lo sea otra vez.',
        'La tercera es la luz. Residuos aromáticos como triptófano, tirosina y fenilalanina, más la metionina y la cisteína, absorben en el ultravioleta cercano y se oxidan. Un vial ámbar o guardado en su caja de cartón resuelve el problema completo sin costo.',
      ],
    },
    {
      type: 'table',
      title: 'Temperatura × estado: cuánto dura cada cosa',
      intro:
        'Cifras de referencia general para péptidos sintéticos de cadena corta a media. Cada lote tiene su ficha técnica y manda sobre esta tabla.',
      columns: ['Temperatura', 'Liofilizado (polvo)', 'Reconstituido (solución)', 'Uso recomendado'],
      rows: [
        [
          '−20 °C (congelador)',
          '24 a 36 meses; muchos compuestos siguen dentro de especificación más allá',
          'Alícuotas de un solo uso: meses. Nunca recongelar',
          'Inventario y reserva de largo plazo. Es donde debe vivir lo que no vas a tocar este mes.',
        ],
        [
          '−80 °C (ultracongelador)',
          'Años; el límite práctico deja de ser la temperatura',
          'Alícuotas: 6 a 12 meses según compuesto',
          'Solo si ya tienes el equipo. Para la mayoría de los laboratorios no aporta sobre −20 °C.',
        ],
        [
          '2–8 °C (refrigerador)',
          '12 a 24 meses',
          '2 a 4 semanas como referencia; compuestos lábiles, menos',
          'El estado de trabajo. Aquí va el vial que estás usando y el que abrirás pronto.',
        ],
        [
          '20–25 °C (ambiente)',
          '2 a 4 semanas sin pérdida apreciable; tolera tránsito de días',
          'Horas a pocos días; se pierde potencia de forma medible',
          'Solo tránsito y manipulación en la mesa. Nunca almacenamiento.',
        ],
        [
          '> 30 °C',
          'Degradación acelerada en días',
          'Degradación rápida, franca; suele haber turbidez visible',
          'Ninguno. Si un envío quedó expuesto, documenta la excepción antes de usar el material.',
        ],
      ],
      note:
        'Regla mnemotécnica: el polvo se mide en años, la solución en semanas, el ambiente en días. Cuando dudes entre dos casillas, elige la más fría.',
    },
    {
      type: 'prose',
      title: 'Por qué el liofilizado aguanta tanto más',
      paragraphs: [
        'La liofilización congela la muestra y luego sublima el hielo directamente a vapor bajo vacío, sin pasar por líquido. Lo que queda es una torta porosa con muy poca agua residual —típicamente por debajo del 3 % en peso.',
        'Con esa cantidad de agua, las moléculas están inmovilizadas en un estado vítreo. Los reactivos no se encuentran, y las reacciones que sí ocurren son lentísimas. Es el mismo principio por el que un grano de café seco dura meses y un café servido se echa a perder en horas.',
        'Una vez que añades el diluyente, todo eso se acaba de golpe. El péptido queda libre en solución, expuesto a hidrólisis, a oxidación por oxígeno disuelto, a agregación y —si el diluyente no lleva conservador— a crecimiento microbiano. Por eso la ventana de estabilidad pasa de años a semanas y por eso vale la pena reconstituir solo lo que se va a usar.',
      ],
    },
    {
      type: 'table',
      title: 'Referencia por familia de compuesto',
      intro:
        'Distintas familias tienen distinta fragilidad. Estas son condiciones de manejo típicas; siempre verifica la ficha del lote específico.',
      columns: ['Familia', 'Ejemplos representativos', 'Liofilizado', 'Reconstituido', 'Notas de manejo'],
      rows: [
        [
          'GLP-1 e incretinas',
          'Semaglutida, tirzepatida, liraglutida, exenatida (referencias de investigación)',
          '−20 °C, protegido de la luz; 2–8 °C para uso próximo',
          '2–8 °C, 3 a 4 semanas',
          'Muy sensibles a la agitación: forman fibrillas y espuma con facilidad. Girar, nunca sacudir.',
        ],
        [
          'Factores de crecimiento y secretagogos',
          'Ipamorelina, CJC-1295, sermorelina, hexarelina, GHRP-2 y GHRP-6',
          '−20 °C; estables 24 meses o más',
          '2–8 °C, 2 a 3 semanas',
          'Cadenas cortas y relativamente robustas, pero el ciclo repetido de sacar y meter al refrigerador les pega.',
        ],
        [
          'Cognitivos y neuroactivos',
          'Semax, Selank, Dihexa, P21, Cerebrolisina (referencias de investigación)',
          '−20 °C, oscuridad estricta',
          '2–8 °C, 2 a 3 semanas',
          'Muchos incluyen triptófano o metionina y son especialmente fotosensibles. Vial ámbar o caja cerrada.',
        ],
        [
          'Señalización tisular y reparación',
          'BPC-157, TB-500, GHK-Cu, KPV, Larazotide',
          '−20 °C; el liofilizado tolera bien el tránsito a temperatura ambiente',
          '2–8 °C, 3 a 4 semanas',
          'Los complejos de cobre como GHK-Cu tienen color azul propio: no lo confundas con degradación. Sí vigila cambios de tono.',
        ],
        [
          'Bioreguladores peptídicos',
          'Epitalon, Thymalin, Thymosin alfa-1, Vilon, Pinealon',
          '−20 °C; muy estables en seco',
          '2–8 °C, 2 a 4 semanas',
          'Péptidos cortos y estables, pero con evidencia clínica todavía preliminar. Conservar bien no vuelve concluyente a la literatura.',
        ],
      ],
      note:
        'La columna de "reconstituido" asume agua bacteriostática, temperatura estable de 2–8 °C y protección de la luz. Cambia cualquiera de las tres condiciones y los plazos se acortan.',
    },
    {
      type: 'list',
      title: 'Recomendado',
      intro: 'Prácticas que alargan la vida útil sin costo relevante.',
      items: [
        'Guarda el liofilizado a −20 °C en un congelador que no tenga ciclo de descongelación automática.',
        'Mantén el vial en su caja de cartón original o en un contenedor opaco: la protección de la luz es gratis.',
        'Alicuota antes de congelar la solución, en volúmenes que se consuman de una sola vez.',
        'Coloca un termómetro con registro de mínimos y máximos dentro del refrigerador y revísalo semanal.',
        'Guarda los viales al fondo del estante, nunca en la puerta.',
        'Etiqueta cada vial reconstituido con compuesto, lote, concentración, fecha y hora.',
        'Templa el vial a temperatura ambiente antes de abrirlo, para evitar condensación interna.',
        'Lleva una bitácora de inventario con fecha de recepción y fecha de apertura de cada lote.',
        'Antes de cada uso, inspecciona la solución contra luz blanca sobre fondo oscuro y sobre fondo claro.',
        'Usa una aguja nueva cada vez que perfores el septo de un vial en uso.',
      ],
    },
    {
      type: 'list',
      title: 'Evitar sin excepciones',
      intro: 'Cada uno de estos tiene un mecanismo de daño concreto detrás.',
      items: [
        { text: 'Ciclos repetidos de congelación y descongelación: los cristales de hielo cortan mecánicamente las cadenas y concentran solutos localmente.', bad: true },
        { text: 'Agitación vigorosa: la interfaz aire-líquido despliega las moléculas y las agrega de forma irreversible.', bad: true },
        { text: 'Calor para acelerar la disolución: por encima de 30 °C la degradación se dispara en horas.', bad: true },
        { text: 'Guardar solución reconstituida a temperatura ambiente más de un día.', bad: true },
        { text: 'Usar un vial cuya etiqueta ya no es legible o cuyo lote no puedes rastrear.', bad: true },
        { text: 'Mezclar restos de dos viales del mismo compuesto en uno solo: se pierde la trazabilidad de lote y se suma la contaminación de ambos.', bad: true },
        { text: 'Ignorar un cambio de aspecto porque "seguramente no es nada".', bad: true },
        { text: 'Guardar viales en la puerta del refrigerador, donde la temperatura oscila varios grados en cada apertura.', bad: true },
        { text: 'Exponer el material a luz solar directa o a las lámparas UV del banco de trabajo.', bad: true },
        { text: 'Rellenar o completar un vial con diluyente nuevo para "estirarlo".', bad: true },
      ],
    },
    {
      type: 'table',
      title: '6 signos de degradación y qué tan grave es cada uno',
      intro:
        'Inspección visual antes de cada uso. Toma treinta segundos y ahorra experimentos completos.',
      columns: ['Signo', 'Qué está pasando', 'Severidad', 'Qué hacer'],
      rows: [
        [
          'Turbidez o aspecto lechoso',
          'Agregación de cadenas peptídicas que se desplegaron; el material formó partículas en suspensión',
          'Alta',
          'Desechar. La turbidez no se revierte y la concentración real ya no corresponde a la etiqueta.',
        ],
        [
          'Amarillamiento de una solución que era incolora',
          'Oxidación, reacciones tipo Maillard con azúcares residuales o fotodegradación',
          'Alta',
          'Desechar. Verifica primero que el compuesto no tenga color propio, como los complejos de cobre.',
        ],
        [
          'Precipitado o partículas en el fondo',
          'El péptido salió de solución por exceso de concentración, cambio de pH o degradación avanzada',
          'Alta',
          'Desechar. No intentes redisolver agitando: eso solo dispersa material ya dañado.',
        ],
        [
          'Espuma que persiste más de 15 minutos',
          'Desnaturalización en la interfaz aire-líquido, típicamente por agitación',
          'Media a alta',
          'Si la espuma no baja sola, considera el vial comprometido para trabajo cuantitativo.',
        ],
        [
          'Olor perceptible al abrir',
          'Descomposición avanzada, contaminación microbiana o ambas',
          'Alta',
          'Desechar de inmediato y revisar el resto del inventario del mismo lote y estante.',
        ],
        [
          'Pérdida de actividad sin cambio visible',
          'Degradación química sin señal óptica; el vial se ve perfecto y ya no rinde igual',
          'Media, y la más traicionera',
          'Por eso se fecha todo. Respeta la ventana de 2 a 4 semanas aunque la solución se vea impecable.',
        ],
      ],
      note:
        'Ante la duda, el vial se desecha. Un vial cuesta lo que cuesta; un experimento con material degradado cuesta el experimento, el tiempo y la confianza en los datos.',
    },
    {
      type: 'steps',
      title: 'Qué hacer si se va la luz',
      intro:
        'Un apagón de horas no necesariamente arruina el inventario, pero improvisar sí. Este es el orden.',
      items: [
        {
          title: 'No abras el congelador ni el refrigerador',
          body:
            'Un congelador cerrado y lleno mantiene temperatura útil de 24 a 48 horas; medio vacío, unas 24. Un refrigerador cerrado aguanta cerca de 4 horas. Cada apertura tira ese presupuesto.',
          note: 'Si el congelador está a medio llenar, rellénalo con botellas de agua congelada: la masa térmica es lo que compra tiempo.',
        },
        {
          title: 'Registra la hora exacta del corte',
          body:
            'Anótala en la bitácora. Cuando vuelva la corriente vas a necesitar saber cuántas horas estuvo fuera de rango para decidir sobre cada lote.',
        },
        {
          title: 'Si el corte va a superar las 12 horas, mueve al hielo',
          body:
            'Hielera con hielo seco para lo que estaba a −20 °C; hielera con hielo de agua y bolsas de gel para lo que estaba a 2–8 °C. El hielo seco sublima: usa guantes aislantes y no lo guardes en recinto cerrado sin ventilación.',
        },
        {
          title: 'Al volver la luz, verifica antes de reabrir',
          body:
            'Espera a que el equipo recupere temperatura estable antes de meter y sacar cosas. Revisa el termómetro de mínimos y máximos: es el dato que te dice qué tan mal estuvo, no tu memoria.',
        },
        {
          title: 'Documenta y decide lote por lote',
          body:
            'Liofilizado que estuvo unas horas a temperatura ambiente casi siempre sigue siendo válido. Solución reconstituida que superó 25 °C por más de un día es material dudoso. Deja constancia escrita de la excepción para cualquier resultado que salga después.',
        },
      ],
    },
    {
      type: 'steps',
      title: 'Qué hacer para un viaje o un traslado',
      intro:
        'Mover material entre sitios es donde más inventario se pierde, casi siempre por falta de plan.',
      items: [
        {
          title: 'Traslada en seco siempre que puedas',
          body:
            'El liofilizado tolera 2 a 4 semanas a temperatura ambiente sin pérdida apreciable. Si tienes la opción de mover el polvo y reconstituir en destino, esa es la decisión correcta.',
        },
        {
          title: 'Empaca con margen térmico',
          body:
            'Hielera rígida, bolsas de gel congeladas y un separador de cartón entre el gel y los viales para que el vidrio no toque directamente la superficie helada. Rellena huecos: el aire vacío es el que se calienta.',
        },
        {
          title: 'Mete un registrador de temperatura',
          body:
            'Un indicador de umbral desechable o un data logger pequeño. Sin ese dato, al llegar solo tienes suposiciones sobre si el material sigue siendo válido.',
        },
        {
          title: 'Nunca lo factures en bodega de avión ni lo dejes en el coche',
          body:
            'Una bodega de carga puede bajar por debajo de cero sin control, y un coche estacionado al sol supera fácilmente los 50 °C. Ambos escenarios están fuera de cualquier especificación.',
        },
        {
          title: 'Al llegar, guarda primero y revisa después',
          body:
            'Mete todo a su temperatura objetivo en cuanto llegues, y solo entonces lee el registrador, inspecciona los viales y anota el traslado en bitácora.',
        },
      ],
    },
    {
      type: 'prose',
      title: 'Alicuotar: el hábito que más material salva',
      paragraphs: [
        'Si un vial reconstituido va a durar más de dos o tres semanas de uso, la solución no es guardarlo mejor: es no tenerlo abierto tanto tiempo. Alicuotar consiste en repartir la solución recién preparada en varios viales estériles pequeños, cada uno con el volumen de una sola sesión, y congelarlos.',
        'La ganancia es doble. Primero, cada vial se descongela una sola vez, así que no hay ciclos repetidos de congelación. Segundo, el septo de cada alícuota se perfora una sola vez, lo que reduce a mínimos el riesgo de contaminación.',
        'El costo es de unos minutos de trabajo adicional el día de la reconstitución, hecho en condiciones limpias y con todo etiquetado. Comparado con perder la mitad de un vial de 10 mg, la aritmética no admite discusión.',
      ],
    },
    {
      type: 'cards',
      title: 'Sigue por aquí',
      intro: 'Lo que conviene leer antes o después de esta guía.',
      items: [
        {
          title: 'Cómo reconstituir',
          body: 'El procedimiento completo en 7 pasos, con tiempos, tabla de concentraciones y los errores que arruinan el material.',
          to: '/aprende/como-reconstituir',
          cta: 'Ver procedimiento',
        },
        {
          title: 'Calculadora',
          body: 'Convierte mg de vial y mL de diluyente en concentración y alícuotas, sin hacer cuentas a mano.',
          to: '/calculadora',
          cta: 'Abrir calculadora',
        },
        {
          title: 'Calidad y certificados',
          body: 'Qué mirar en un COA, por qué el número de lote es lo primero y cómo se verifica la pureza declarada.',
          to: '/info/calidad',
          cta: 'Ver calidad',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes',
      items: [
        {
          q: 'Mi envío llegó a temperatura ambiente. ¿Está echado a perder?',
          a:
            'Casi con seguridad no, si llegó liofilizado. El polvo tolera de 2 a 4 semanas a 20–25 °C sin pérdida apreciable, y nuestros envíos nacionales llegan en 3 a 5 días hábiles. Guárdalo en frío al recibirlo, revisa que la torta se vea normal y anota la fecha de recepción. Si el paquete estuvo expuesto a calor extremo, documenta la excepción antes de usarlo.',
        },
        {
          q: '¿Puedo congelar la solución reconstituida?',
          a:
            'Sí, con una condición: alicuota primero en volúmenes de un solo uso y no recongeles nada. Un ciclo de congelación y descongelación es tolerable para la mayoría de los péptidos; tres o cuatro ya se notan como pérdida de potencia y a veces como turbidez.',
        },
        {
          q: '¿Un refrigerador doméstico sirve?',
          a:
            'Sirve para almacenamiento de trabajo a 2–8 °C si respetas dos cosas: nada en la puerta, y un termómetro de mínimos y máximos dentro para confirmar que de verdad se mantiene en rango. Los refrigeradores domésticos oscilan más de lo que indica su perilla, sobre todo si se abren mucho.',
        },
        {
          q: 'El vial se ve perfecto pero lleva dos meses reconstituido. ¿Lo uso?',
          a:
            'No para trabajo cuantitativo. La pérdida de actividad es el modo de degradación que no deja señal visible: la solución sigue transparente e incolora mientras la concentración efectiva ya bajó. Ese es exactamente el motivo de fechar cada vial y respetar la ventana de 2 a 4 semanas.',
        },
        {
          q: '¿La luz importa de verdad o es exageración?',
          a:
            'Importa, y de forma desigual según el compuesto. Los péptidos con triptófano, tirosina, metionina o cisteína se oxidan bajo UV y bajo luz blanca intensa; otros son bastante indiferentes. Como no siempre sabrás la composición exacta, guardar todo en oscuridad es la política barata y correcta.',
        },
        {
          q: '¿Sirve de algo un ultracongelador de −80 °C?',
          a:
            'Para inventario a muy largo plazo y para alícuotas de solución, sí aporta. Para la mayoría de los laboratorios, −20 °C ya coloca la degradación por debajo del umbral que importa, y el dinero rinde más invirtiéndolo en un termómetro con registro, viales ámbar y disciplina de etiquetado que en el equipo.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Lo que hay que recordar',
      body:
        'Seco y congelado dura años; frío y en solución dura semanas; templado dura días. Alicuota antes de congelar, protege de la luz, no agites, fecha todos los viales y desecha ante cualquier duda. Con eso resuelves el noventa por ciento de las pérdidas de material.',
    },
  ],
  related: [
    {
      to: '/aprende/como-reconstituir',
      title: 'Cómo reconstituir',
      desc: 'Los 7 pasos con tiempos concretos y la tabla de concentraciones por vial.',
    },
    {
      to: '/aprende/mitos',
      title: 'Mitos y evidencia',
      desc: 'Diez creencias que circulan sobre péptidos, revisadas contra lo que de verdad se sabe.',
    },
    {
      to: '/calculadora',
      title: 'Calculadora',
      desc: 'Concentración, microgramos por unidad y volumen por alícuota en un paso.',
    },
  ],
};

export default page;
