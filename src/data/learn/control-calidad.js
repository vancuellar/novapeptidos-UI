const page = {
  slug: 'control-calidad',
  title: 'Control de calidad: cómo se verifica un lote de péptidos',
  subtitle:
    'El recorrido completo de un lote, de la síntesis a la liberación, y cómo leer los datos analíticos sin ser químico. Material exclusivo para investigación.',
  badge: 'Guía',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'Por qué el control de calidad decide todo',
      paragraphs: [
        'Un péptido de investigación no se juzga por la etiqueta ni por la foto del vial. Se juzga por dos preguntas: ¿es realmente la molécula que dice ser? y ¿qué proporción del material es esa molécula y no otra cosa? La primera es identidad, la segunda es pureza. Un lote puede tener 99% de pureza y aun así ser inútil si lo que está purísimo no es la secuencia que pediste.',
        'En un experimento, un lote mal caracterizado no produce un resultado equivocado de forma evidente: produce un resultado que parece válido y que nadie puede reproducir. Por eso el control de calidad no es papeleo, es la parte del proceso que hace que tus datos signifiquen algo.',
        'Aquí explicamos, paso a paso, qué le pasa a un lote antes de que se pueda vender, qué documentos lo respaldan y cómo interpretarlos. Todo el material descrito es de uso exclusivo en investigación (RUO): no es para consumo humano ni animal, ni para uso diagnóstico o terapéutico.',
      ],
    },
    {
      type: 'steps',
      title: 'De la síntesis a la liberación en 5 pasos',
      intro:
        'Este es el recorrido estándar de un lote de péptido sintético. Cada paso genera evidencia que después aparece en el certificado de análisis.',
      items: [
        {
          title: 'Síntesis en fase sólida (SPPS)',
          body:
            'El péptido se construye aminoácido por aminoácido sobre una resina sólida, normalmente con química Fmoc. Cada ciclo tiene tres momentos: se quita el grupo protector del extremo libre, se acopla el siguiente aminoácido y se lava el exceso. Un péptido de 30 residuos son unos 30 ciclos encadenados. Al final se corta la cadena de la resina, se quitan los protectores laterales y se precipita el producto crudo, que todavía trae subproductos. De ahí pasa a purificación preparativa, casi siempre por HPLC de fase reversa, y luego a liofilización: el polvo blanco o casi blanco que llega al vial.',
          note:
            'Regla práctica: si cada ciclo rinde 99%, después de 30 ciclos el rendimiento teórico es ~74%. Por eso las cadenas largas son más difíciles y más caras, y por eso la purificación no es opcional.',
        },
        {
          title: 'Recepción y muestreo',
          body:
            'El lote llega identificado con número de lote, secuencia declarada, masa nominal por vial y fecha de síntesis. Se registra la entrada, se revisa el aspecto del polvo (color, textura, si hay signos de humedad o de fusión por calor durante el transporte) y se toma una muestra representativa. El muestreo importa: se analiza una porción, pero se libera todo el lote, así que la muestra tiene que reflejar el conjunto. Los viales que se abren para muestreo no vuelven al inventario vendible.',
          note: 'Sin número de lote no hay trazabilidad. Un producto sin lote es un producto sin historia.',
        },
        {
          title: 'Pureza por RP-HPLC',
          body:
            'La muestra se disuelve, se filtra y se inyecta en un cromatógrafo líquido de alta resolución en fase reversa. La columna separa los componentes de la mezcla según su afinidad, y un detector UV registra cada uno como un pico. El área del pico principal frente al área total de todos los picos da el porcentaje de pureza cromatográfica. Este es el número que la gente cita como "99%", y solo tiene sentido si viene acompañado del método usado.',
          note: 'Detalle en la guía dedicada: pureza por HPLC.',
        },
        {
          title: 'Identidad por espectrometría de masas',
          body:
            'La cromatografía dice cuánto hay de cada cosa, no qué son. Para eso está la espectrometría de masas: se ioniza la muestra (habitualmente por electrospray, ESI) y se mide la relación masa/carga de los iones. El resultado se compara con la masa monoisotópica o promedio calculada a partir de la secuencia declarada. Si la masa observada coincide con la teórica dentro de la tolerancia del equipo, se confirma la identidad. Si no coincide, no importa qué tan bonito salió el cromatograma: el lote no se libera.',
          note:
            'Una diferencia de +16 Da suele indicar oxidación; -18 Da, pérdida de agua; una diferencia igual a la masa de un aminoácido, una deleción en la secuencia.',
        },
        {
          title: 'Liberación con COA',
          body:
            'Con los datos de pureza e identidad en mano se decide si el lote se libera. Se emite el certificado de análisis (COA), que consolida: número de lote, secuencia, fórmula molecular, masa teórica y observada, pureza con el método declarado, aspecto, contenido de agua o contraión cuando aplica, condiciones de conservación y fecha de análisis. A partir de ahí el lote entra a inventario etiquetado como material de investigación.',
          note: 'Cada lote nuevo se analiza de nuevo. Un COA no se hereda de un lote anterior.',
        },
      ],
    },
    {
      type: 'prose',
      title: 'Cómo se lee un cromatograma sin ser químico',
      paragraphs: [
        'Un cromatograma es una gráfica sencilla: el eje horizontal es tiempo, en minutos, y el eje vertical es cuánta señal ve el detector en ese instante. Al inicio no pasa nada y la línea corre plana. Cuando un componente de la muestra sale de la columna, la línea sube, hace un pico y vuelve a bajar. Cada pico es una sustancia distinta.',
        'Piénsalo como una carrera: se inyecta la mezcla, todas las moléculas arrancan juntas y cada una tarda distinto en cruzar la meta según lo mucho que se pegue a la columna. Las que se pegan poco salen temprano; las que se pegan mucho, tarde.',
      ],
    },
    {
      type: 'glossary',
      title: 'Las cuatro cosas que hay que mirar',
      items: [
        {
          term: 'Tiempo de retención',
          plain:
            'El minuto en el que aparece el pico. Es la "huella" de una sustancia bajo un método concreto: si repites el mismo método, la misma molécula sale más o menos en el mismo minuto.',
          example:
            'Un péptido puede salir a 12.4 min en un gradiente de 5 a 65% de acetonitrilo en 30 minutos. Si mañana sale a 12.5 min con el mismo método, es normal; si sale a 8 min, algo cambió — la muestra, la columna o el método.',
        },
        {
          term: 'Área bajo la curva',
          plain:
            'El tamaño del pico, medido como superficie, no como altura. Es lo proporcional a la cantidad de esa sustancia que detectó el equipo. La pureza sale de comparar áreas, no alturas.',
          example:
            'Si el área total de todos los picos es 1,000,000 unidades y el pico principal tiene 992,000, la pureza cromatográfica es 99.2%.',
        },
        {
          term: 'Resolución de picos',
          plain:
            'Qué tan bien separados están dos picos vecinos. Si se traslapan, el software no puede repartir bien las áreas y el porcentaje de pureza deja de ser confiable.',
          example:
            'Una resolución (Rs) de 1.5 o más entre el pico principal y su impureza más cercana se considera separación de línea base. Por debajo de 1.0 los picos se montan y el número de pureza queda inflado o subestimado.',
        },
        {
          term: 'Línea base',
          plain:
            'La línea de fondo cuando no está saliendo nada. Debe ser plana y estable. Si sube, ondula o tiene ruido, el software puede confundir ruido con picos pequeños o perderlos.',
          example:
            'Una deriva ascendente durante el gradiente suele venir del propio disolvente o del TFA, y se corrige ajustando la línea base antes de integrar. Una base ruidosa esconde impurezas del 0.1–0.3%.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Bandas de pureza y qué significa cada una',
      intro:
        'La pureza no es un aprobado/reprobado, es un rango. Lo que corresponde depende de para qué se va a usar el material dentro del laboratorio.',
      columns: ['Banda', 'Etiqueta', 'Qué significa en la práctica'],
      rows: [
        [
          '≥ 99%',
          'Grado investigación',
          'Menos del 1% del material es algo distinto al péptido declarado. Es lo apropiado para trabajo cuantitativo, curvas de respuesta, comparación entre lotes y cualquier ensayo donde una impureza activa arruinaría la interpretación. Es también lo más caro, porque exige más pasos de purificación y más rendimiento perdido.',
        ],
        [
          '95 – 99%',
          'Grado estándar',
          'Hasta 5 de cada 100 partes son otra cosa: subproductos de síntesis, sales o agua. Sirve para trabajo exploratorio, montaje de métodos, pruebas de estabilidad y ensayos cualitativos. Para resultados que se van a publicar o comparar entre lotes conviene subir de banda o, como mínimo, conocer el perfil de impurezas.',
        ],
        [
          '< 95%',
          'No recomendado',
          'Más del 5% es material no identificado. El problema no es solo que "falte" péptido: es que no sabes qué es ese 5% ni si interfiere. En Exygen no liberamos lotes por debajo de esta línea.',
        ],
      ],
      note:
        'Ojo: estos porcentajes son de pureza cromatográfica, no de contenido neto de péptido. Un lote 99% puro puede ser, en masa, 80% péptido y el resto contraión y agua. Son dos números distintos y ambos importan.',
    },
    {
      type: 'prose',
      title: 'Por qué la identidad importa tanto como la pureza',
      paragraphs: [
        'La pureza responde "¿qué tan limpio está?" y la identidad responde "¿limpio de qué?". Son independientes. Un proceso de síntesis puede fallar en un solo acoplamiento y producir una secuencia con un aminoácido de menos; esa molécula equivocada se purifica igual de bien que la correcta y sale como un pico único, alto y limpio. El cromatograma dirá 99%. La molécula seguirá siendo la equivocada.',
        'La espectrometría de masas es lo que cierra esa puerta. Al medir la masa real y contrastarla con la masa calculada de la secuencia declarada, detecta deleciones, truncamientos, oxidaciones y modificaciones que la cromatografía sola no distingue. Por eso un COA que reporta pureza pero no reporta masa observada está contando media historia.',
        'Regla corta: pureza sin identidad no vale. Identidad sin pureza tampoco. Se piden juntas o no se piden.',
      ],
    },
    {
      type: 'list',
      title: 'Qué es y qué NO es un certificado de análisis',
      intro:
        'El COA es un documento técnico con un alcance específico. Confundir ese alcance es la fuente número uno de malentendidos.',
      items: [
        'ES: el registro de los análisis hechos a un lote concreto, con su número de lote identificado.',
        'ES: la confirmación de identidad por masa y de pureza por un método declarado.',
        'ES: información de aspecto, conservación recomendada y fecha en que se hicieron las pruebas.',
        'ES: un documento que se emite por lote, y solo aplica a ese lote.',
        { text: 'NO ES una autorización sanitaria, un registro ante autoridad ni una aprobación de ningún organismo regulatorio.', bad: true },
        { text: 'NO ES un aval de seguridad, ni una indicación de que el material pueda usarse en personas o animales.', bad: true },
        { text: 'NO ES un certificado de esterilidad ni de ausencia de endotoxinas, salvo que esas pruebas aparezcan explícitamente en el documento.', bad: true },
        { text: 'NO ES transferible a otro lote, aunque sea del mismo producto y del mismo proveedor.', bad: true },
        { text: 'NO ES válido si no dice qué método se usó para medir la pureza.', bad: true },
      ],
    },
    {
      type: 'list',
      title: 'Señales de alerta al revisar un COA',
      intro: 'Si ves cualquiera de estas cosas, pregunta antes de comprar.',
      items: [
        { text: 'No aparece número de lote, o el mismo documento se usa para todos los lotes del producto.', bad: true },
        { text: 'Dice "pureza 99%" sin especificar HPLC, columna, gradiente ni longitud de onda de detección.', bad: true },
        { text: 'Trae el porcentaje pero no incluye el cromatograma ni el espectro de masas.', bad: true },
        { text: 'La masa observada no aparece, o aparece sin la masa teórica para comparar.', bad: true },
        { text: 'Faltan fechas: sin fecha de análisis no sabes si el dato tiene un mes o cuatro años.', bad: true },
        { text: 'El logotipo del laboratorio está pixelado o el PDF parece editado sobre otro documento.', bad: true },
        'Bien: lote identificado, secuencia, fórmula, masa teórica y observada, método de HPLC completo, cromatograma legible y fecha.',
      ],
    },
    {
      type: 'steps',
      title: 'Cómo pedir el COA de tu lote',
      intro:
        'Todavía no tenemos galería pública de certificados. Los COA se entregan bajo solicitud, por correo, y siempre corresponden al lote que se te va a enviar o que ya recibiste.',
      items: [
        {
          title: 'Escríbenos a hola@exygenlabs.com',
          body:
            'Asunto sugerido: "Solicitud de COA". Es el único canal por el que emitimos certificados; así queda registro escrito de qué documento se entregó y para qué lote.',
        },
        {
          title: 'Incluye los datos del producto',
          body:
            'Nombre del producto y presentación. Si ya lo recibiste, agrega el número de lote impreso en la etiqueta del vial. Si todavía no compras, dilo: te enviamos el COA del lote vigente en inventario.',
          note: 'Un producto puede tener varios lotes en circulación. El número de lote es lo que hace que te llegue el documento correcto.',
        },
        {
          title: 'Recibe el PDF y revísalo contra la etiqueta',
          body:
            'Verifica que el lote del PDF sea idéntico al del vial, que la secuencia coincida con lo que pediste y que la fecha de análisis esté presente. Si algo no cuadra, respóndenos el mismo correo antes de usar el material.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Uso exclusivo en investigación',
      body:
        'Todos los materiales de Exygen Labs son insumos de investigación (RUO). No son medicamentos, no están destinados a consumo humano ni animal, y no deben usarse con fines diagnósticos o terapéuticos. El COA documenta la caracterización química de un lote; no autoriza ni sugiere ningún uso en organismos vivos.',
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Puedo ver los COA sin escribirles?',
          a: 'Todavía no. No tenemos un repositorio público de certificados; preferimos decirlo con claridad en lugar de anunciar una galería que no existe. Los COA se entregan por correo, bajo solicitud, escribiendo a hola@exygenlabs.com. Cuando publiquemos una biblioteca en línea lo anunciaremos en el sitio.',
        },
        {
          q: '¿El COA es del lote que me van a mandar?',
          a: 'Sí. Si ya compraste, pide el certificado con el número de lote de tu etiqueta. Si aún no compras, te mandamos el del lote vigente en inventario, que es el que saldría en tu pedido. Si entre tu solicitud y tu envío entra un lote nuevo, pídenos el actualizado y te lo reenviamos.',
        },
        {
          q: '¿Qué diferencia hay entre 99% y 98%?',
          a: 'En masa, un punto porcentual. En interpretación, depende de qué sea ese punto. Si el 1% adicional de impureza es una deleción inactiva, probablemente no afecte tu ensayo. Si es una variante activa o un análogo estructural, sí puede. Por eso conviene mirar el cromatograma completo y no solo el número: importa cuántos picos secundarios hay y qué tan grandes son.',
        },
        {
          q: '¿Por qué el peso del vial no cuadra con el péptido que hay dentro?',
          a: 'Porque el polvo liofilizado no es péptido puro en masa. Trae el contraión de la purificación (con frecuencia trifluoroacetato) y agua residual absorbida. Un vial rotulado con 5 mg de material puede contener alrededor de 4 mg de péptido neto. La pureza cromatográfica y el contenido neto de péptido son dos mediciones distintas; si tu cálculo necesita masa exacta de péptido, pide el dato de contenido neto.',
        },
        {
          q: '¿Cada cuánto se reanalizan los lotes?',
          a: 'Cada lote se analiza al ingresar y ese es el análisis que respalda su liberación. Para lotes que permanecen mucho tiempo en inventario, lo prudente es reanalizar pureza antes de seguir vendiendo, porque la degradación depende de la secuencia y de las condiciones de almacenamiento. Si te preocupa la antigüedad de un lote específico, pregúntanos la fecha de análisis: viene en el COA.',
        },
        {
          q: '¿Puedo mandar el material a analizar por mi cuenta?',
          a: 'Sí, y es una práctica sana. Un laboratorio independiente con capacidad de HPLC y espectrometría de masas puede confirmar identidad y pureza. Toma en cuenta que los números pueden variar unas décimas entre laboratorios: distinta columna, distinto gradiente y distinta longitud de onda dan integraciones ligeramente distintas. Una diferencia de 0.2–0.5 puntos entre laboratorios es normal; una diferencia de varios puntos, o una masa que no coincide, sí es motivo para escribirnos.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: '¿Dudas con un lote concreto?',
      body:
        'Escríbenos a hola@exygenlabs.com con el número de lote y el producto. Contestamos con el COA correspondiente y, si hace falta, con el cromatograma para que lo revises tú mismo.',
    },
  ],
  related: [
    {
      to: '/aprende/pureza-hplc',
      title: 'Pureza por HPLC',
      desc: 'Cómo funciona la cromatografía de fase reversa y por qué un "99%" sin método declarado no dice nada.',
    },
    {
      to: '/aprende/legalidad',
      title: '¿Es legal comprar péptidos de investigación en México?',
      desc: 'El marco aplicable, las condiciones que mantienen el material como insumo de investigación y qué cambia al importar.',
    },
    {
      to: '/info/calidad',
      title: 'Nuestro estándar de calidad',
      desc: 'Qué exigimos a cada lote antes de liberarlo a inventario.',
    },
  ],
};

export default page;
