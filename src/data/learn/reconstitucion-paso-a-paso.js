const page = {
  slug: 'reconstitucion-paso-a-paso',
  title: 'Del polvo a la solución: reconstitución paso a paso',
  subtitle:
    'Procedimiento de laboratorio, paso a paso y con cifras, para pasar un vial de polvo liofilizado a una solución estable y homogénea sin degradar el material.',
  badge: 'Guía operativa',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'warn',
      title: 'Uso exclusivo en investigación (RUO)',
      body:
        'Todo el material descrito aquí es para investigación in vitro y uso analítico de laboratorio. No es para consumo humano ni animal, no es un medicamento y esta guía no contiene ni sustituye indicaciones de administración ni consejo médico. Los procedimientos son de manejo de material en banco de trabajo.',
    },
    {
      type: 'prose',
      title: 'Qué es reconstituir y por qué importa tanto',
      paragraphs: [
        'Un péptido liofilizado es el mismo péptido al que se le quitó el agua por congelación al vacío. Queda como una torta o un polvo blanco, a veces casi invisible pegado al fondo del vial. En ese estado es químicamente muy estable: sin agua libre no hay hidrólisis, y las reacciones de degradación se frenan casi por completo.',
        'Reconstituir es devolverle el agua de forma controlada. En ese momento el péptido pasa de tener una vida útil de años a tenerla de semanas, y todo lo que se haga mal en esos dos minutos —chorro directo sobre el polvo, agitación fuerte, diluyente equivocado, temperatura de choque— se paga en pérdida de material y en resultados que no se pueden reproducir.',
        'La buena noticia: el procedimiento es corto, no requiere equipo especial y, hecho con orden, es completamente reproducible entre lotes y entre operadores.',
      ],
    },
    {
      type: 'list',
      title: 'Material necesario',
      intro: 'Todo debe estar a la mano antes de destapar nada. Interrumpir el procedimiento a media reconstitución es la fuente más común de contaminación.',
      items: [
        'Vial de péptido liofilizado, todavía sellado y con su etiqueta de lote legible.',
        'Diluyente: agua bacteriostática (agua estéril con 0.9 % de alcohol bencílico) o agua estéril para inyección, según el uso previsto y la compatibilidad del compuesto.',
        'Jeringa de precisión con graduación fina; para volúmenes de 0.3 a 1 mL una jeringa U-100 permite leer al 0.01 mL.',
        'Toallitas con alcohol isopropílico al 70 % para desinfectar ambos septos.',
        'Guantes de nitrilo limpios y superficie de trabajo despejada y desinfectada.',
        'Gradilla o soporte para que el vial quede vertical y no ruede.',
        'Etiquetas o cinta de laboratorio y marcador indeleble de punta fina.',
        'Contenedor rígido para punzocortantes, al alcance del brazo.',
        'Opcional pero muy recomendable: cronómetro y bitácora de laboratorio para registrar volumen, hora y lote.',
      ],
    },
    {
      type: 'table',
      title: 'Parámetros clave antes de empezar',
      intro: 'Estos son los números que definen todo el procedimiento. Vale la pena tenerlos anotados en la bitácora antes de abrir el primer vial.',
      columns: ['Parámetro', 'Valor típico', 'Por qué importa'],
      rows: [
        [
          'Temperatura de almacenamiento del liofilizado',
          '−20 °C para largo plazo; 2–8 °C para semanas; hasta 25 °C tolera días en tránsito',
          'El polvo seco es robusto. La congelación profunda es para inventario, no para el vial que estás usando esta semana.',
        ],
        [
          'Estabilidad una vez reconstituido',
          '2–8 °C, de 2 a 4 semanas como referencia general; algunos compuestos frágiles, menos',
          'Es la ventana real de trabajo. Pasado ese plazo la concentración deja de ser confiable aunque la solución se vea bien.',
        ],
        [
          'Volumen típico de diluyente',
          '1 a 3 mL por vial, según el mg del vial y la concentración que quieras',
          'Menos volumen concentra más y hace difícil medir alícuotas pequeñas; más volumen diluye y facilita la precisión.',
        ],
        [
          'Diluyente estándar',
          'Agua bacteriostática: agua estéril + 0.9 % de alcohol bencílico',
          'El alcohol bencílico es un conservador bacteriostático: no esteriliza, pero inhibe el crecimiento microbiano y permite perforar el septo varias veces.',
        ],
        [
          'Agua estéril simple',
          'Sin conservador',
          'Sirve para uso inmediato o de un solo pinchazo. No protege frente a contaminación en usos repetidos.',
        ],
        [
          'Tiempo de disolución',
          '5 a 10 minutos en reposo tras añadir el agua',
          'La disolución no es instantánea. Agitar para acelerarla es exactamente lo que no hay que hacer.',
        ],
        [
          'Temperatura del vial al reconstituir',
          'Ambiente, 20–25 °C',
          'Añadir agua sobre un vial helado favorece condensación y disolución desigual.',
        ],
      ],
      note:
        'Los valores son referencias generales de manejo. Cada compuesto tiene su propia ficha técnica y su certificado de análisis: si hay conflicto, manda la ficha del lote.',
    },
    {
      type: 'prose',
      title: 'Agua bacteriostática frente a agua estéril',
      paragraphs: [
        'El agua bacteriostática es agua para inyección a la que se le añadió alcohol bencílico al 0.9 % —es decir, 9 mg de alcohol bencílico por cada mL. Ese conservador no mata todo lo que entre: inhibe la multiplicación bacteriana. Por eso un vial reconstituido con agua bacteriostática tolera varias perforaciones del septo a lo largo de días sin convertirse en un caldo de cultivo.',
        'El agua estéril para inyección no lleva nada. Es la opción cuando el compuesto es incompatible con el alcohol bencílico o cuando la solución se va a usar completa en una sola sesión. Si perforas un vial con agua estéril varias veces a lo largo de una semana, estás jugando con la esterilidad del contenido.',
        'Hay un matiz que conviene tener presente: algunos péptidos y algunas proteínas más grandes muestran menor estabilidad en presencia de alcohol bencílico. Cuando la ficha del compuesto lo indique, se usa agua estéril y se ajusta el plan de trabajo para consumir el vial rápido.',
      ],
    },
    {
      type: 'steps',
      title: 'Procedimiento en 7 pasos',
      intro:
        'Léelo completo una vez antes de empezar. El tiempo total es de unos 15 minutos, de los cuales 10 son de espera.',
      items: [
        {
          title: 'Deja templar el vial (15–30 minutos)',
          body:
            'Saca el vial del refrigerador o del congelador y déjalo en la gradilla, cerrado, hasta que alcance temperatura ambiente. Desde −20 °C calcula 30 minutos; desde 2–8 °C, unos 15. Templa también el diluyente.',
          note:
            'Si abres un vial helado, la humedad del aire se condensa dentro y empiezas a hidratar el polvo antes de tiempo, de forma desigual.',
        },
        {
          title: 'Desinfecta los dos septos (30 segundos)',
          body:
            'Retira la tapa de plástico de ambos viales. Limpia el tapón de goma del péptido y el del agua con una toallita de isopropílico al 70 %, frotando unos 10 segundos cada uno, y deja que se sequen al aire.',
          note:
            'Dejar secar no es un detalle estético: el alcohol húmedo arrastrado hacia dentro por la aguja es una vía de contaminación química.',
        },
        {
          title: 'Carga el volumen exacto de diluyente (1 minuto)',
          body:
            'Con la jeringa, extrae el volumen que decidiste en la tabla de concentraciones. Sostén la jeringa vertical, golpea suavemente el cuerpo para subir las burbujas y expúlsalas hasta que el líquido llegue a la marca exacta. Una burbuja de 0.05 mL en un vial de 1 mL es un error del 5 % en toda la serie.',
        },
        {
          title: 'Deja escurrir el agua por la pared del vial (60–90 segundos)',
          body:
            'Inclina el vial del péptido unos 45 grados, apoya la punta de la aguja contra la pared interna de vidrio y empuja el émbolo despacio, para que el agua baje resbalando por la pared y llegue al polvo por abajo. Nunca dispares el chorro directo sobre la torta liofilizada.',
          note:
            'El impacto del chorro rompe mecánicamente las cadenas peptídicas y genera espuma. Es el error más caro de toda la guía.',
        },
        {
          title: 'Espera la disolución en reposo (5–10 minutos)',
          body:
            'Retira la aguja, deja el vial de pie en la gradilla y no lo toques. La mayoría de los péptidos se disuelven solos en ese lapso. Si a los 10 minutos sigue viéndose polvo, espera otros 10 antes de intervenir.',
        },
        {
          title: 'Gira suave, sin agitar (10–15 segundos)',
          body:
            'Si queda residuo, toma el vial entre los dedos y hazlo girar con movimientos circulares lentos, o rueda el vial entre las palmas. Movimiento suave y continuo. Jamás lo sacudas como si fuera un frasco de jarabe.',
          note:
            'Agitar crea interfaz aire-líquido y espuma; en esa interfaz las moléculas se desnaturalizan y pierden actividad. La espuma persistente es señal de daño, no de mezcla.',
        },
        {
          title: 'Refrigera de inmediato',
          body:
            'Guárdalo enseguida a 2–8 °C, en la parte trasera del refrigerador y protegido de la luz. El vial ya viene etiquetado con producto, lote y caducidad; solo añade la fecha de reconstitución y la concentración resultante (mg/mL), que son los datos que cambian al reconstituir.',
          note:
            'Anotar la fecha de reconstitución evita la duda de si el vial sigue siendo válido semanas después.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Concentraciones resultantes',
      intro:
        'Cruza los miligramos del vial con los mililitros de agua que añades. La tercera columna es la concentración; la cuarta, cuántos microgramos hay en cada unidad de una jeringa U-100 (1 unidad = 0.01 mL).',
      columns: ['Vial (mg)', 'Agua añadida (mL)', 'Concentración (mg/mL)', 'Por unidad U-100 (mcg)'],
      rows: [
        ['2 mg', '1 mL', '2 mg/mL', '20 mcg'],
        ['2 mg', '2 mL', '1 mg/mL', '10 mcg'],
        ['5 mg', '1 mL', '5 mg/mL', '50 mcg'],
        ['5 mg', '2 mL', '2.5 mg/mL', '25 mcg'],
        ['5 mg', '2.5 mL', '2 mg/mL', '20 mcg'],
        ['10 mg', '1 mL', '10 mg/mL', '100 mcg'],
        ['10 mg', '2 mL', '5 mg/mL', '50 mcg'],
        ['10 mg', '3 mL', '3.33 mg/mL', '33.3 mcg'],
        ['15 mg', '3 mL', '5 mg/mL', '50 mcg'],
        ['20 mg', '2 mL', '10 mg/mL', '100 mcg'],
      ],
      note:
        'La aritmética es simple: concentración = mg del vial ÷ mL de agua. Y microgramos por unidad = concentración en mg/mL × 10. Si prefieres no hacerla a mano, la calculadora del sitio hace las dos operaciones y te devuelve las alícuotas.',
    },
    {
      type: 'cards',
      title: 'Herramientas relacionadas',
      intro: 'Dos atajos para no calcular a mano ni improvisar el almacenamiento.',
      items: [
        {
          title: 'Calculadora de reconstitución',
          body: 'Metes los mg del vial y los mL de agua; te devuelve mg/mL, mcg por unidad U-100 y el volumen por alícuota.',
          to: '/calculadora',
          cta: 'Abrir calculadora',
        },
        {
          title: 'Conservación y estabilidad',
          body: 'Temperaturas, plazos reales por familia de compuesto y signos de degradación que deberías reconocer a simple vista.',
          to: '/aprende/conservacion',
          cta: 'Ver guía de conservación',
        },
      ],
    },
    {
      type: 'list',
      title: '6 errores comunes y por qué arruinan el material',
      intro: 'No son manías de laboratorio: cada uno tiene un mecanismo concreto detrás.',
      items: [
        {
          text:
            'Disparar el chorro de agua directo sobre la torta liofilizada. La fuerza del impacto rompe la estructura tridimensional del péptido y genera espuma; el material dañado ya no se recupera ni esperando ni girando el vial.',
          bad: true,
        },
        {
          text:
            'Agitar el vial para que se disuelva más rápido. La agitación crea burbujas, y en la superficie de cada burbuja las moléculas se despliegan y se agregan. El resultado se ve como espuma persistente y se mide como pérdida de actividad.',
          bad: true,
        },
        {
          text:
            'Reconstituir el vial recién sacado del congelador. El choque térmico condensa humedad dentro del vial y produce una disolución desigual, con zonas sobreconcentradas que precipitan.',
          bad: true,
        },
        {
          text:
            'Usar agua estéril simple en un vial que vas a perforar diez veces a lo largo de dos semanas. Sin conservador, cada perforación es una oportunidad de contaminación microbiana, y una solución contaminada se degrada rápido además de invalidar cualquier ensayo.',
          bad: true,
        },
        {
          text:
            'No etiquetar con la fecha y el volumen añadido. Sin ese dato no sabes la concentración real ni cuántos días lleva reconstituido; todos los cálculos posteriores quedan sin base y el vial se vuelve inutilizable para trabajo serio.',
          bad: true,
        },
        {
          text:
            'Dejar el vial reconstituido en la puerta del refrigerador o expuesto a la luz. La puerta oscila varios grados cada vez que se abre, y esos ciclos térmicos, más la fotodegradación de residuos sensibles como triptófano o metionina, aceleran la pérdida de potencia.',
          bad: true,
        },
      ],
    },
    {
      type: 'list',
      title: 'Buenas prácticas que sí valen la pena',
      intro: 'Cosas pequeñas que separan un procedimiento reproducible de uno improvisado.',
      items: [
        'Reconstituye un solo vial a la vez. Dos viales abiertos en la mesa son un intercambio de etiquetas esperando a ocurrir.',
        'Prepara y desinfecta la superficie de trabajo antes de sacar nada del refrigerador.',
        'Elige el volumen de diluyente pensando en la alícuota más pequeña que vas a medir: si esa alícuota cae por debajo de 5 unidades en U-100, diluye más.',
        'Anota todo en bitácora en el momento, no al final del día: compuesto, lote, volumen, concentración, hora e iniciales.',
        'Si vas a usar el material a lo largo de meses, considera alicuotar en viales estériles separados y congelar; así descongelas solo lo que necesitas.',
        'Inspecciona la solución contra luz blanca antes de cada uso: debe estar transparente, sin partículas ni fibras.',
        'Mantén un termómetro con registro de mínimos y máximos dentro del refrigerador. Un refrigerador doméstico oscila más de lo que promete.',
        'Desecha las agujas y jeringas en el contenedor rígido inmediatamente, sin reencapuchar.',
      ],
    },
    {
      type: 'prose',
      title: 'Cuando el polvo no se disuelve',
      paragraphs: [
        'Primero, verifica lo obvio: ¿pasaron ya 10 minutos completos de reposo? Muchos casos de "no se disuelve" son casos de impaciencia. Si el tiempo se cumplió y sigue habiendo material sin disolver, gira el vial suavemente durante 15 segundos y espera otros 10 minutos.',
        'Si aún así queda residuo, puede tratarse de un compuesto con baja solubilidad en agua a esa concentración. La salida habitual es bajar la concentración añadiendo más diluyente, o usar el vehículo que indique la ficha técnica del compuesto. Algunos péptidos muy hidrofóbicos requieren un ajuste de pH o un cosolvente antes del agua.',
        'Lo que no debe hacerse es calentar el vial, meterlo al ultrasonido sin saber si el compuesto lo tolera, o agitarlo con fuerza. Las tres cosas resuelven la apariencia del problema y destruyen el contenido. Si la ficha del lote no aclara la solubilidad, es mejor consultar antes que improvisar.',
      ],
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes',
      items: [
        {
          q: '¿Cuánta agua le pongo si no me dan una instrucción específica?',
          a:
            'Elige el volumen en función de la alícuota más pequeña que vayas a medir, no al revés. Con un vial de 5 mg y 2 mL de agua quedas en 2.5 mg/mL, es decir 25 mcg por unidad U-100: cómodo para medir alícuotas de 50 a 500 mcg con buena precisión. Si necesitaras alícuotas de 10 mcg, ese mismo vial pide 5 mL de agua.',
        },
        {
          q: '¿Puedo usar agua purificada o agua destilada del laboratorio?',
          a:
            'No para material destinado a ensayo. El agua destilada de uso general no es estéril ni está libre de endotoxinas ni de partículas. Usa agua estéril para inyección o agua bacteriostática, que además viene con su propio certificado.',
        },
        {
          q: '¿Cuánto dura el vial una vez reconstituido?',
          a:
            'Como referencia general, de 2 a 4 semanas a 2–8 °C con agua bacteriostática. No es una garantía: depende del compuesto, de la concentración y de cuántas veces se perfore el septo. Compuestos particularmente lábiles pueden perder potencia medible en pocos días. La guía de conservación tiene los plazos por familia.',
        },
        {
          q: 'Se me formó espuma al reconstituir. ¿Sirve todavía?',
          a:
            'Depende de cuánta y de si desaparece. Un poco de espuma que se disuelve sola en unos minutos suele ser irrelevante. Una capa que persiste media hora indica desnaturalización en la interfaz aire-líquido y, con ella, pérdida de material activo. Ese vial ya no es confiable para cuantificar.',
        },
        {
          q: '¿Puedo congelar un vial que ya reconstituí?',
          a:
            'Se puede, pero con reservas. Cada ciclo de congelación y descongelación somete al péptido a estrés mecánico por formación de cristales de hielo y a concentración local de solutos. Si vas a congelar, alicuota primero en volúmenes de un solo uso y no descongeles el mismo vial más de una vez. Mejor todavía: guarda el liofilizado congelado y reconstituye solo lo que vas a usar.',
        },
        {
          q: '¿Por qué el vial se ve vacío si pagué por 10 mg de polvo?',
          a:
            'Porque 10 mg de un liofilizado ocupan muy poco y muchas veces quedan como una película translúcida pegada al fondo o a la pared. Es normal. La forma de verificar el contenido no es mirando el vial, sino leyendo el certificado de análisis del lote impreso en la etiqueta.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Un principio que resume toda la guía',
      body:
        'Frío, lento y anotado. El vial templado antes de abrirse, el agua resbalando por la pared, el reposo respetado, el giro suave y la etiqueta escrita en el momento. Ninguno de esos cinco pasos cuesta dinero y los cinco juntos son la diferencia entre resultados reproducibles y material desperdiciado.',
    },
  ],
  related: [
    {
      to: '/aprende/conservacion',
      title: 'Conservación y estabilidad',
      desc: 'Temperaturas, plazos por familia de compuesto y cómo reconocer material degradado.',
    },
    {
      to: '/calculadora',
      title: 'Calculadora de reconstitución',
      desc: 'Convierte mg de vial y mL de agua en mg/mL y microgramos por unidad U-100.',
    },
    {
      to: '/info/calidad',
      title: 'Calidad y certificados',
      desc: 'Qué contiene un COA, cómo se lee y por qué el número de lote es lo primero que hay que mirar.',
    },
  ],
};

export default page;
