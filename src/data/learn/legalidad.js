const page = {
  slug: 'legalidad',
  title: '¿Es legal comprar péptidos de investigación en México?',
  subtitle:
    'Qué dice el marco aplicable, qué condiciones mantienen un material dentro del terreno de insumo de investigación y qué cambia cuando hay importación. Información general, no asesoría legal.',
  badge: 'Marco legal',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'Respuesta directa, con sus matices',
      paragraphs: [
        'En México no existe una prohibición general sobre la adquisición de péptidos sintéticos destinados a investigación. Adquirirlos como insumo de laboratorio, para uso in vitro o en desarrollo analítico, es una actividad que ocurre de forma habitual y que el marco sanitario no proscribe por sí misma. Esa es la parte simple.',
        'La parte que importa es que la legalidad no depende de la molécula, sino del uso, la presentación y las afirmaciones que la acompañan. La misma sustancia puede ser un reactivo de investigación perfectamente ordinario o un producto sujeto a regulación sanitaria estricta, según cómo se etiquete, cómo se promocione y para qué se destine. Un péptido vendido como reactivo, etiquetado para investigación y sin ninguna afirmación sobre salud, se mueve en un terreno distinto al de ese mismo péptido vendido con promesas de efectos en el cuerpo humano: eso segundo lo convierte, en los hechos, en un producto que pretende ser medicamento, y los medicamentos requieren registro sanitario.',
        'Por eso la respuesta honesta no es "sí es legal" ni "no es legal", sino: es legal en tanto se mantenga como lo que es. Las condiciones que sostienen esa clasificación se explican más abajo, y no son cosméticas: son la diferencia entre un insumo de investigación y un producto sin registro ofrecido al público.',
      ],
    },
    {
      type: 'list',
      title: 'Los 4 puntos clave',
      intro: 'Si te llevas solo cuatro ideas de esta página, que sean estas.',
      items: [
        'No hay prohibición general para adquirir péptidos sintéticos como insumo de investigación. Lo que está regulado con rigor es la fabricación, importación y comercialización de medicamentos y productos destinados a la salud humana.',
        'El uso declarado define el régimen. Investigación y análisis in vitro es una cosa; administración a personas es otra completamente distinta, y esa segunda vía requiere autorizaciones sanitarias que un comprador particular no tiene.',
        'La publicidad es parte del producto desde el punto de vista regulatorio. Una etiqueta impecable acompañada de promesas terapéuticas en el sitio web o en redes no salva nada: la autoridad valora el conjunto del mensaje al público.',
        'La importación agrega una capa. Cruzar mercancía por aduana suma requisitos de clasificación arancelaria, documentación de origen y, según el caso, permisos sanitarios; comprar dentro de México a un proveedor que ya resolvió esa parte es distinto a importar por cuenta propia.',
        { text: 'No trates una etiqueta "RUO" como un permiso para uso personal. No lo es: es exactamente lo contrario, una restricción de uso.', bad: true },
      ],
    },
    {
      type: 'prose',
      title: 'Marco aplicable, en términos generales',
      paragraphs: [
        'Cuatro cuerpos normativos y autoridades tocan esta actividad en México. Los describimos en términos generales y correctos, sin citar números de artículo: las referencias precisas cambian con las reformas y deben verificarse en el texto vigente con un abogado.',
      ],
    },
    {
      type: 'table',
      title: 'Quién regula qué',
      intro: 'Cada instancia mira una dimensión distinta de la misma operación.',
      columns: ['Marco / autoridad', 'Qué abarca', 'Por qué te afecta'],
      rows: [
        [
          'Ley General de Salud',
          'Es la ley marco en materia sanitaria. Define qué se considera medicamento, insumo para la salud y remedio, y establece que los productos destinados a la salud humana requieren autorización antes de comercializarse. También encuadra la investigación en salud y el control de sustancias psicotrópicas y estupefacientes, listados que no incluyen a los péptidos de investigación comunes.',
          'Determina si lo que compras cae en la categoría de medicamento —con todo lo que eso implica— o en la de insumo de laboratorio. La frontera la marca el destino declarado y la presentación, no la fórmula química.',
        ],
        [
          'COFEPRIS',
          'Es la autoridad sanitaria federal. Otorga registros sanitarios, autoriza importaciones de productos sujetos a control, vigila la publicidad de productos relacionados con la salud y puede ordenar suspensiones, aseguramientos y alertas cuando algo se ofrece como si fuera medicamento sin serlo.',
          'Es la instancia que en la práctica interviene si un producto de investigación se promociona con claims de salud. Su criterio no se centra en la molécula, sino en cómo se presenta al público.',
        ],
        [
          'PROFECO',
          'Protege al consumidor: veracidad de la información comercial, cumplimiento de lo ofrecido, condiciones de venta, garantías y publicidad no engañosa.',
          'Aplica a la transacción en sí. La descripción del producto, la pureza declarada, los tiempos de entrega y la política de devoluciones tienen que corresponder con la realidad.',
        ],
        [
          'LFPDPPP (datos personales)',
          'Regula el tratamiento de datos personales por particulares: aviso de privacidad, finalidades legítimas, consentimiento cuando corresponde y derechos de acceso, rectificación, cancelación y oposición.',
          'Aplica a los datos que entregas al comprar: nombre, dirección de envío, correo, información de la institución. Un proveedor serio te dice qué recaba, para qué y cómo ejercer tus derechos.',
        ],
      ],
      note:
        'Además de lo federal pueden concurrir normas oficiales mexicanas sobre etiquetado y manejo de sustancias químicas, disposiciones aduaneras cuando hay importación y regulación institucional propia si el material entra a una universidad, hospital o centro de investigación. Verifica siempre el texto vigente.',
    },
    {
      type: 'steps',
      title: 'Las 3 condiciones que mantienen el material como insumo de investigación',
      intro:
        'Estas tres cosas, juntas, son las que sostienen la clasificación. Falla una y el material empieza a parecerse regulatoriamente a otra cosa.',
      items: [
        {
          title: 'Etiquetado RUO explícito y visible',
          body:
            'RUO significa "research use only": exclusivamente para uso en investigación. La leyenda debe estar en la etiqueta del vial y en la documentación, no escondida en un pie de página del sitio. Debe decir con claridad que el material no está destinado a consumo humano ni animal, ni a uso diagnóstico o terapéutico. El etiquetado también debe identificar el producto, el lote y las condiciones de conservación.',
          note:
            'La leyenda RUO no es un descargo de responsabilidad decorativo. Es la declaración de destino del producto, y tiene que ser congruente con todo lo demás.',
        },
        {
          title: 'Cero afirmaciones terapéuticas, en cualquier canal',
          body:
            'Nada de prometer que algo cura, previene, mejora el rendimiento, rejuvenece, adelgaza o trata cualquier condición. Esto abarca el sitio, las fichas de producto, el correo, las redes sociales, los testimonios de clientes publicados y las respuestas de atención a clientes. Tampoco valen las insinuaciones: dosis "sugeridas" para personas, comparaciones con medicamentos o instrucciones de administración humana son, en la práctica, afirmaciones terapéuticas aunque no usen el verbo "curar".',
          note:
            'Se puede explicar química, mecanismos moleculares, manejo en laboratorio, conservación y qué reporta la literatura científica. No se puede recomendar uso en organismos vivos.',
        },
        {
          title: 'Documentación analítica por lote',
          body:
            'Cada lote debe tener su caracterización: identidad confirmada por espectrometría de masas y pureza determinada por un método declarado, normalmente RP-HPLC. Eso es lo que sustenta que el material es un reactivo caracterizado y no un polvo sin identidad. También es lo que permite trazabilidad si alguna vez hay una pregunta sobre un envío concreto.',
          note: 'Sin número de lote y sin análisis, no hay forma de defender que el material es un insumo de investigación.',
        },
      ],
    },
    {
      type: 'prose',
      title: 'Qué cambia si se importa',
      paragraphs: [
        'Comprar dentro de México a un proveedor nacional y traer mercancía del extranjero por cuenta propia son operaciones distintas, aunque el producto sea el mismo. La importación es un acto de comercio exterior y activa requisitos adicionales.',
        'En una importación entra en juego la clasificación arancelaria de la mercancía, que determina qué regulaciones no arancelarias aplican; la documentación de origen y factura; y, según cómo se clasifique el producto y cuál sea su destino declarado, la posible exigencia de permiso o aviso sanitario. Los reactivos de laboratorio suelen tener un tratamiento distinto al de los productos destinados a la salud humana, pero esa distinción hay que sostenerla con documentos, no con la intención.',
        'En la práctica, los envíos internacionales de este tipo de material se detienen en aduana con más frecuencia de lo que la gente espera, y no siempre por algo grave: basta una descripción ambigua en la factura, la falta de una ficha técnica o una clasificación arancelaria dudosa. El resultado suele ser retención, requerimiento de información adicional, devolución al origen o, en el peor caso, aseguramiento de la mercancía.',
        'Por eso, para un laboratorio o investigador en México, comprar a un proveedor nacional que ya resolvió la parte de importación no es solo comodidad: traslada esa carga documental y ese riesgo operativo a quien tiene la estructura para manejarlo. Si vas a importar tú, lo sensato es hacerlo con un agente aduanal y con asesoría legal específica, no con la ficha del producto y buena fe.',
      ],
    },
    {
      type: 'list',
      title: 'Qué hace Exygen Labs para cumplir',
      intro: 'Nuestras prácticas, por escrito, para que puedas verificarlas.',
      items: [
        'Etiquetamos todo el material como de uso exclusivo en investigación (RUO), con la leyenda de no apto para consumo humano ni animal en el vial y en la documentación.',
        'No hacemos ni permitimos afirmaciones terapéuticas en ningún canal: ni sitio, ni fichas, ni redes, ni correo, ni atención a clientes. Nuestro contenido educativo explica química, mecanismos y manejo de laboratorio, nunca uso en personas.',
        'No publicamos dosis, protocolos de administración humana ni comparaciones con medicamentos.',
        'Analizamos cada lote antes de liberarlo: identidad por espectrometría de masas y pureza por RP-HPLC con método declarado. Cada lote tiene número propio y trazabilidad.',
        'Entregamos el certificado de análisis del lote correspondiente bajo solicitud, por correo, escribiendo a hola@exygenlabs.com. Todavía no tenemos galería pública de COA; cuando la tengamos lo anunciaremos aquí.',
        'Publicamos aviso de privacidad conforme a la legislación mexicana de datos personales: qué datos recabamos, para qué y cómo ejercer tus derechos de acceso, rectificación, cancelación y oposición.',
        'Describimos con veracidad lo que vendemos: presentación, pureza, condiciones de envío y política de devoluciones corresponden con lo que efectivamente entregamos.',
        { text: 'No vendemos con fines de consumo humano ni animal, y no asesoramos sobre uso en organismos vivos. Si esa es la intención de la compra, no somos el proveedor adecuado.', bad: true },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'La leyenda RUO es una restricción, no un permiso',
      body:
        'Se malentiende con frecuencia. "Exclusivamente para investigación" no significa "úsalo bajo tu responsabilidad": significa que el producto no fue evaluado, autorizado ni destinado para uso en personas o animales, y que cualquier uso fuera del laboratorio queda fuera de lo que el producto es. No hay etiqueta que convierta un reactivo en medicamento.',
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Necesito ser una institución para comprar?',
          a: 'No siempre, y depende del proveedor y del producto. Muchos reactivos de investigación se venden a laboratorios privados, consultorías y personas que trabajan en proyectos de investigación sin pertenecer a una universidad. Lo que sí es constante es el destino: el material se adquiere como insumo de investigación. Si tu contexto es institucional, revisa también las reglas internas de tu institución, que suelen ser más estrictas que la ley y pueden exigir registro del material, resguardo y aprobación de comité.',
        },
        {
          q: '¿Comprar para uso personal es legal?',
          a: 'Adquirir un reactivo etiquetado para investigación y usarlo en el propio cuerpo saca el material de la categoría en la que fue vendido y lo coloca en un terreno completamente distinto, sin ninguna evaluación de seguridad, autorización sanitaria ni supervisión médica detrás. No podemos ni queremos orientar sobre eso: no vendemos con esa finalidad, no damos consejo médico y no es un uso para el que el producto exista. Si tu interés es de salud, la conversación correcta es con un médico, no con un proveedor de reactivos.',
        },
        {
          q: '¿COFEPRIS puede intervenir en la venta de reactivos de investigación?',
          a: 'Puede intervenir cuando un producto se ofrece al público como si fuera un producto para la salud sin serlo, o cuando la publicidad atribuye efectos terapéuticos a algo que no cuenta con registro sanitario. El detonante habitual no es la existencia del reactivo, sino el mensaje que lo acompaña. Un catálogo técnico sin claims de salud y un catálogo con promesas de resultados corporales reciben lecturas muy distintas.',
        },
        {
          q: '¿Los péptidos de investigación son sustancias controladas en México?',
          a: 'Los péptidos sintéticos que se comercializan como reactivos de investigación no forman parte de los listados de estupefacientes y psicotrópicos sujetos a control especial. Dicho eso, los listados y las disposiciones se actualizan, y hay moléculas que sí están sujetas a control por otras vías o cuya regulación cambia. Si tienes duda sobre una sustancia específica, verifica el estatus vigente con un abogado o directamente con la autoridad antes de operar.',
        },
        {
          q: '¿Qué pasa si mi paquete se queda en aduana?',
          a: 'Si compras dentro de México a un proveedor nacional, tu envío es doméstico y no cruza aduana, así que este escenario no aplica. Si importas por cuenta propia, lo habitual es un requerimiento de información: factura detallada, ficha técnica, certificado de análisis y justificación del destino de investigación. Responder rápido y con documentación completa resuelve muchos casos; sin documentos, el desenlace más común es la devolución al origen. Un agente aduanal es la figura indicada para llevar ese trámite.',
        },
        {
          q: '¿Qué documentación debo conservar como comprador?',
          a: 'Factura o comprobante de compra, el certificado de análisis del lote, la etiqueta o fotografía del vial con su número de lote, y el registro interno de para qué proyecto se adquirió el material. Si trabajas en una institución, guarda también la autorización interna correspondiente. No es burocracia: es lo que permite reconstruir el origen de un reactivo si alguna vez se cuestiona un resultado o el material mismo.',
        },
        {
          q: '¿El certificado de análisis tiene valor legal?',
          a: 'Es un documento técnico, no una autorización. Acredita que un lote fue caracterizado analíticamente y respalda la trazabilidad, lo cual es relevante para sostener que el material es un reactivo identificado. Pero no equivale a un registro sanitario ni autoriza ningún uso: no convierte al producto en medicamento ni habilita su administración a nadie.',
        },
        {
          q: '¿Qué pasa con mis datos personales al comprar?',
          a: 'La legislación mexicana de protección de datos en posesión de particulares obliga a informarte, mediante aviso de privacidad, qué datos se recaban, con qué finalidades y cómo ejercer tus derechos de acceso, rectificación, cancelación y oposición. En una compra de este tipo se recaban típicamente nombre, correo, dirección de envío y datos de facturación. Un proveedor que no publica aviso de privacidad, o que no responde a una solicitud sobre tus datos, está incumpliendo algo básico.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'danger',
      title: 'Esto es información general, no asesoría legal',
      body:
        'Este contenido describe el marco regulatorio mexicano en términos generales, con fines informativos y educativos. No constituye asesoría legal ni sustituye la opinión de un abogado sobre tu situación particular, y no crea relación abogado-cliente. La normatividad cambia y su aplicación depende de hechos concretos: antes de tomar decisiones con consecuencias jurídicas —especialmente si vas a importar, distribuir o comercializar— consulta a un profesional del derecho y verifica el texto vigente de las disposiciones aplicables. Contenido revisado el 19 de julio de 2026.',
    },
  ],
  related: [
    {
      to: '/aprende/control-calidad',
      title: 'Control de calidad de un lote',
      desc: 'Qué análisis respaldan la trazabilidad de un reactivo y qué es —y qué no es— un certificado de análisis.',
    },
    {
      to: '/aprende/pureza-hplc',
      title: 'Pureza por HPLC',
      desc: 'Cómo se mide la pureza de un péptido y por qué el método declarado importa tanto como el número.',
    },
    {
      to: '/info/envios',
      title: 'Envíos',
      desc: 'Cómo enviamos dentro de México, condiciones de transporte y tiempos.',
    },
  ],
};

export default page;
