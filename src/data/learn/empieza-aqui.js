// Guía de entrada para quien nunca ha manejado un vial de péptido. RUO.
const page = {
  slug: 'empieza-aqui',
  title: 'Tu primera vez con péptidos, en 5 minutos',
  subtitle:
    'Qué te va a llegar, qué material necesitas y cómo se maneja un vial de principio a fin. Escrito para quien nunca ha abierto uno.',
  badge: 'Empieza aquí',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'warn',
      title: 'Antes de nada: qué es esto y qué no es',
      body:
        'Todo lo que vendemos es material de investigación (RUO, Research Use Only). Se usa en laboratorio, en experimentos in vitro o en modelos, y no está aprobado ni destinado a consumo humano ni animal. En esta guía te explicamos el manejo del material en la mesa de trabajo: reconstituir, medir, guardar y desechar. No vas a encontrar aquí dosis para personas, protocolos de administración ni promesas de resultados, porque eso sería consejo médico y no lo damos.',
    },
    {
      type: 'prose',
      title: 'En una frase',
      paragraphs: [
        'Un péptido de investigación llega como un polvo blanco seco dentro de un frasquito de vidrio sellado. Ese polvo no se puede medir ni manipular tal cual: primero se disuelve en un líquido estéril, y de ahí se toman volúmenes exactos con una jeringa graduada para tus experimentos.',
        'Todo el proceso son tres momentos: recibes y guardas, reconstituyes, y luego mides y almacenas. El resto de esta página desarma cada momento en pasos concretos.',
        'Si nunca has hecho esto, léela completa una vez antes de abrir nada. Toma cinco minutos y te ahorra echar a perder un vial.',
      ],
    },
    {
      type: 'list',
      title: 'Qué llega en el paquete',
      intro: 'Un pedido típico incluye esto y nada más. No trae agua ni jeringas salvo que las hayas agregado al carrito.',
      items: [
        'El vial de vidrio con el péptido liofilizado: entre 2 mg y 100 mg de polvo según el producto, con tapón de goma y sello de aluminio de color.',
        'Etiqueta con el nombre del compuesto, la cantidad en mg, el número de lote y la leyenda RUO.',
        'Empaque con material aislante y, en pedidos que lo requieren, gel refrigerante. El gel llega tibio con frecuencia y eso no arruina el producto: el polvo liofilizado tolera varios días fuera de refrigeración.',
        'Acceso al certificado de análisis (COA) del lote, con el resultado de HPLC y espectrometría de masas.',
        'En algunos formatos, un vial adicional de agua bacteriostática si la compraste por separado.',
      ],
    },
    {
      type: 'list',
      title: 'Qué material extra necesitas',
      intro: 'Nada de esto es exótico. Es lo mínimo para trabajar limpio y medir bien.',
      items: [
        'Agua bacteriostática: agua estéril con 0.9% de alcohol bencílico. Se usa para disolver el polvo y el conservador permite reusar el vial varias veces. Un frasco de 30 mL alcanza para muchos viales.',
        'Agua estéril para inyección o solución salina 0.9%: alternativa sin conservador, para cuando el compuesto no tolera el alcohol bencílico o cuando el experimento requiere que no haya aditivos. Se usa una sola vez y se desecha.',
        'Jeringas de insulina de 1 mL (100 unidades) con aguja fina, calibre 29G a 31G. La escala en unidades es lo que hace posible medir 0.05 mL sin adivinar.',
        'Jeringa más grande, de 3 mL o 5 mL, para pasar el diluyente al vial cómodamente.',
        'Toallitas con alcohol isopropílico al 70% para limpiar los tapones de goma antes de cada pinchazo.',
        'Etiquetas o cinta y un marcador permanente para anotar concentración y fecha en cada vial reconstituido.',
        { text: 'No uses agua de garrafón, agua purificada de tienda ni agua hervida. No son estériles y contaminan el vial.', bad: true },
        { text: 'No uses jeringas graduadas solo en mililitros con marcas de 0.1 mL: no tienen resolución para volúmenes pequeños.', bad: true },
      ],
    },
    {
      type: 'steps',
      title: 'El recorrido completo, de principio a fin',
      intro: 'Ocho pasos. Si es tu primera vez, hazlos en este orden exacto.',
      items: [
        {
          title: 'Recibe y revisa',
          body:
            'Abre el paquete, revisa que el vial no venga estrellado y que el sello de aluminio esté intacto. El polvo puede verse como una pastilla compacta, como escamas o como una película pegada a la pared del vidrio: las tres formas son normales en un liofilizado.',
          note: 'Si el vial llega roto o el sello violado, tómale foto antes de tocar nada y repórtalo.',
        },
        {
          title: 'Guarda el polvo hasta que lo vayas a usar',
          body:
            'Sin reconstituir, el liofilizado se conserva en refrigeración a 2–8 °C, protegido de la luz. Para plazos largos, congelador a −20 °C. En seco es estable meses; el enemigo real es la humedad, no unas horas a temperatura ambiente.',
        },
        {
          title: 'Deja que el vial llegue a temperatura ambiente',
          body:
            'Sácalo del refrigerador y espera 15 a 20 minutos antes de abrirlo. Si lo abres frío, se condensa humedad del aire dentro del vial y eso sí degrada el polvo.',
        },
        {
          title: 'Calcula cuánto diluyente vas a poner',
          body:
            'La concentración final es simplemente miligramos entre mililitros. Un vial de 10 mg con 2 mL de agua queda a 5 mg/mL, es decir 0.05 mg por cada unidad de una jeringa de insulina de 100 UI. Más agua no significa menos producto: es el mismo péptido, más diluido y por lo tanto más fácil de medir con precisión.',
          note: 'Usa la calculadora del sitio para no hacer esta cuenta a mano.',
        },
        {
          title: 'Reconstituye despacio',
          body:
            'Retira la tapita de plástico, limpia el tapón de goma con alcohol al 70% y deja secar. Carga el volumen calculado de agua bacteriostática y clava la aguja en el tapón en ángulo, dirigiendo el chorro contra la pared de vidrio, no directo sobre el polvo. Suelta el líquido en 5 a 10 segundos.',
          note: 'El polvo suele disolverse solo en menos de un minuto. Si queda algo, gira el vial entre los dedos. Nunca lo agites como coctelera: la espuma y el corte mecánico rompen la molécula.',
        },
        {
          title: 'Etiqueta el vial reconstituido',
          body:
            'Anota concentración, diluyente y fecha. Por ejemplo: "5 mg/mL, agua bacteriostática, 19 jul". En dos semanas no vas a recordar cuál era cuál, y dos viales sin etiqueta son dos viales perdidos.',
        },
        {
          title: 'Guarda en frío y usa la ventana correcta',
          body:
            'Ya en solución, siempre refrigerado a 2–8 °C y protegido de la luz. Con agua bacteriostática, la ventana práctica de uso son alrededor de 28 días, algunos compuestos menos. Con agua estéril sin conservador, se usa el mismo día. Nunca congeles y descongeles repetidamente una solución: cada ciclo degrada producto.',
        },
        {
          title: 'Registra y desecha bien',
          body:
            'Lleva bitácora de lote, concentración, fechas y volúmenes usados. Las agujas van a contenedor rígido para punzocortantes, nunca a la basura común ni al drenaje.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Ejemplos de reconstitución para que veas los números',
      intro: 'Tres casos comunes. La columna final asume una jeringa de insulina de 1 mL marcada en 100 unidades.',
      columns: ['Vial', 'Diluyente', 'Concentración', 'Cuánto hay en 10 unidades'],
      rows: [
        ['5 mg', '2 mL', '2.5 mg/mL', '0.25 mg (250 mcg)'],
        ['10 mg', '2 mL', '5 mg/mL', '0.5 mg (500 mcg)'],
        ['10 mg', '5 mL', '2 mg/mL', '0.2 mg (200 mcg)'],
        ['50 mg', '5 mL', '10 mg/mL', '1 mg (1,000 mcg)'],
      ],
      note: 'Regla mental: en una jeringa de 100 UI, 100 unidades = 1 mL, y 10 unidades = 0.1 mL. Siempre.',
    },
    {
      type: 'list',
      title: 'Los 5 errores más comunes de la primera vez',
      intro: 'Los vemos una y otra vez. Todos son evitables.',
      items: [
        { text: 'Agitar el vial para que se disuelva más rápido. Hacer espuma daña el péptido. Se gira con suavidad y ya.', bad: true },
        { text: 'Disparar el agua directo sobre el polvo a presión. Ese golpe también degrada. El chorro va contra la pared del vidrio.', bad: true },
        { text: 'Confundir mg con mcg. Son mil veces de diferencia: 0.25 mg son 250 mcg. Es el error de cálculo que más viales arruina.', bad: true },
        { text: 'Abrir el vial recién sacado del refrigerador. Se condensa agua adentro y el polvo se apelmaza.', bad: true },
        { text: 'No etiquetar. A los pocos días tienes viales idénticos y ya no sabes cuál tiene qué concentración.', bad: true },
      ],
    },
    {
      type: 'glossary',
      title: 'Mini glosario: 8 palabras que vas a ver en todos lados',
      items: [
        {
          term: 'Liofilizado',
          plain: 'El polvo seco que viene en el vial. Se le quitó el agua por congelación al vacío para que aguante guardado.',
          example: 'Un vial de 10 mg de liofilizado puede pesar tan poco que el polvo casi no se ve en el fondo.',
        },
        {
          term: 'Reconstituir',
          plain: 'Volver a disolver ese polvo en un líquido para poder medirlo.',
          example: 'Meter 2 mL de agua bacteriostática a un vial de 10 mg es reconstituirlo a 5 mg/mL.',
        },
        {
          term: 'Agua bacteriostática',
          plain: 'Agua estéril con un conservador que impide que crezcan bacterias, así puedes entrar al vial varias veces.',
          example: 'Contiene 0.9% de alcohol bencílico y se vende en frascos de 10 mL o 30 mL.',
        },
        {
          term: 'Concentración',
          plain: 'Cuánto producto hay en cada mililitro de líquido.',
          example: '10 mg disueltos en 2 mL dan 5 mg/mL.',
        },
        {
          term: 'Unidad (UI)',
          plain: 'Cada rayita de una jeringa de insulina. No es una cantidad de péptido, es una medida de volumen.',
          example: 'En una jeringa de 100 unidades, 20 unidades son 0.2 mL.',
        },
        {
          term: 'mcg',
          plain: 'Microgramo: la milésima parte de un miligramo.',
          example: '0.5 mg son 500 mcg. Un vial de 10 mg tiene 10,000 mcg.',
        },
        {
          term: 'Lote',
          plain: 'El número que identifica la tanda de producción exacta de tu vial.',
          example: 'Con el lote impreso en la etiqueta puedes pedir el COA que le corresponde a ese vial y no a otro.',
        },
        {
          term: 'COA',
          plain: 'Certificado de análisis: el papel del laboratorio que dice qué pureza salió en la prueba.',
          example: 'Un COA típico reporta pureza por HPLC de 98.5% y confirma el peso molecular por espectrometría de masas.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Preguntas de primerizo',
      items: [
        {
          q: '¿Puedo usar agua del garrafón o agua purificada de la tienda?',
          a: 'No. No es estéril, trae minerales y microorganismos, y contamina el vial al instante. Usa agua bacteriostática o agua estéril para inyección. Es barata y es el insumo menos indicado para ahorrar.',
        },
        {
          q: 'Mi vial llegó y el gel refrigerante venía tibio. ¿Se echó a perder?',
          a: 'Casi con seguridad no. El polvo liofilizado es estable varios días a temperatura ambiente; por eso se envía seco. Lo que sí importa es que el vial esté sellado e íntegro. Guárdalo en refrigeración al recibirlo.',
        },
        {
          q: 'El polvo se ve como una costra pegada a la pared del vidrio. ¿Está mal?',
          a: 'Es normal. Durante la liofilización el material puede quedar como pastilla compacta, escamas o película en la pared. Lo que importa es que se disuelva de forma clara y sin grumos al agregar el diluyente.',
        },
        {
          q: '¿Cuánta agua le pongo? ¿Hay una cantidad correcta?',
          a: 'No hay una sola correcta. Más agua diluye más y hace la medición más fácil y precisa; menos agua concentra. La regla práctica es elegir el volumen que deje tus mediciones habituales en un rango cómodo de la jeringa, típicamente entre 10 y 40 unidades. La calculadora del sitio te lo resuelve.',
        },
        {
          q: '¿Cuánto dura una vez reconstituido?',
          a: 'Con agua bacteriostática, refrigerado a 2–8 °C y protegido de la luz, la ventana práctica ronda los 28 días. Algunos compuestos son menos estables y conviene usarlos antes. Con agua estéril sin conservador, se usa el mismo día.',
        },
        {
          q: '¿Puedo congelar la solución ya reconstituida?',
          a: 'Se puede para almacenamiento largo, pero solo si la divides en alícuotas de un uso cada una. Lo que degrada el producto son los ciclos repetidos de congelar y descongelar el mismo vial.',
        },
        {
          q: 'Me quedó un poco de espuma al mezclar. ¿Lo tiro?',
          a: 'Un poco de burbuja fina que se asienta sola en unos minutos no es alarma. El problema es la espuma abundante producto de agitar fuerte, que sí indica que la molécula pasó por estrés mecánico. Déjalo reposar en refrigeración y evita agitar la próxima vez.',
        },
        {
          q: '¿Esto lo puedo usar en mí o en una mascota?',
          a: 'No. Es material de investigación, no está aprobado para consumo humano ni animal y nosotros no damos orientación de administración ni consejo médico. Para cualquier tema de salud, consulta a un profesional certificado.',
        },
      ],
    },
    {
      type: 'cards',
      title: 'Siguiente paso',
      intro: 'Ya que entendiste el panorama, aquí está el detalle.',
      items: [
        {
          title: 'Cómo reconstituir, paso a paso',
          body: 'La guía técnica completa: volúmenes, técnica de inyección del diluyente, conservación y errores de laboratorio.',
          to: '/aprende/como-reconstituir',
          cta: 'Ver la guía',
        },
        {
          title: 'Calculadora de reconstitución',
          body: 'Metes miligramos del vial y mililitros de diluyente, y te devuelve la concentración y las unidades de la jeringa.',
          to: '/calculadora',
          cta: 'Abrir calculadora',
        },
        {
          title: 'Glosario en español simple',
          body: 'Treinta términos traducidos a lenguaje normal, cada uno con un ejemplo numérico.',
          to: '/aprende/glosario-simple',
          cta: 'Ver glosario',
        },
        {
          title: 'Qué son los péptidos',
          body: 'Los fundamentos: de aminoácido a péptido, clasificación por función y por qué se estudian.',
          to: '/aprende/que-son-los-peptidos',
          cta: 'Leer fundamentos',
        },
      ],
    },
  ],
  related: [
    { to: '/aprende/como-reconstituir', title: 'Cómo reconstituir', desc: 'Procedimiento detallado con volúmenes y tiempos.' },
    { to: '/aprende/glosario-simple', title: 'Glosario simple', desc: 'Las palabras raras, traducidas con ejemplos.' },
    { to: '/aprende/que-son-los-peptidos', title: 'Qué son los péptidos', desc: 'Fundamentos de química y clasificación.' },
    { to: '/info/calidad', title: 'Calidad y COA', desc: 'Cómo probamos cada lote y dónde ver los resultados.' },
  ],
};

export default page;
