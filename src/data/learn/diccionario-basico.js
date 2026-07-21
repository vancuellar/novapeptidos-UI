// Glosario en lenguaje llano, con ejemplos numéricos. RUO.
const page = {
  slug: 'diccionario-basico',
  title: 'Diccionario para no perderte',
  subtitle:
    'Treinta y tres términos que vas a encontrar en etiquetas, certificados y artículos, explicados sin jerga y con un ejemplo con números en cada uno.',
  badge: 'Glosario',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'Cómo usar esta página',
      paragraphs: [
        'La mitad de la confusión con péptidos no es química: es vocabulario. Un COA, la etiqueta de un vial y un resumen de artículo usan doce palabras técnicas en tres renglones, y si una sola se te escapa, el párrafo entero deja de tener sentido.',
        'Aquí está cada término en español normal, con un ejemplo concreto. Usa el buscador de arriba para ir directo al que te trabó. Si buscas la definición formal, con estructura química y referencias, esa vive en el glosario técnico.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Nota de cumplimiento',
      body:
        'Varios términos de esta lista (dosis, titulación, protocolo, ciclo, subcutáneo, intramuscular) aparecen porque los vas a leer en la literatura científica y necesitas entenderlos. Definirlos no es recomendarlos. Todo el material del catálogo es de uso exclusivo en investigación (RUO), no está aprobado para consumo humano ni animal, y aquí no damos protocolos de administración ni consejo médico.',
    },
    {
      type: 'glossary',
      title: 'Glosario en español simple',
      items: [
        {
          term: 'Péptido',
          plain: 'Una cadena corta de aminoácidos pegados en fila, como cuentas en un hilo. Suele funcionar como mensajero: se acopla en algún lado y dispara una respuesta.',
          example: 'Epithalon tiene 4 aminoácidos y pesa unos 390 Da. La convención dice péptido hasta 50 aminoácidos; arriba de eso ya es proteína.',
        },
        {
          term: 'Aminoácido',
          plain: 'La pieza básica con la que se arman péptidos y proteínas. Hay 20 estándar y cada uno tiene una "cola" distinta que le da su carácter.',
          example: 'Cada aminoácido aporta en promedio unos 110 Da al peso de la cadena, así que un péptido de 3,300 Da tiene alrededor de 30 residuos.',
        },
        {
          term: 'Liofilizado',
          plain: 'El polvo seco del vial. Se congeló el producto y se le sacó el agua al vacío para que aguante guardado mucho tiempo.',
          example: 'El proceso congela alrededor de −40 °C y baja la presión para que el hielo pase directo a vapor. En seco el material dura meses; en solución, semanas.',
        },
        {
          term: 'Reconstituir',
          plain: 'Volver a disolver ese polvo en un líquido estéril para poder medirlo con una jeringa.',
          example: 'Un vial de 10 mg más 2 mL de agua bacteriostática queda a 5 mg/mL. El polvo suele disolverse solo en menos de un minuto.',
        },
        {
          term: 'Agua bacteriostática',
          plain: 'Agua estéril con un conservador que impide que crezcan bacterias, para poder entrar al vial varias veces sin contaminarlo.',
          example: 'Lleva 0.9% de alcohol bencílico. Se vende en frascos de 10 mL y 30 mL; con 30 mL reconstituyes 15 viales usando 2 mL en cada uno.',
        },
        {
          term: 'Agua estéril para inyección',
          plain: 'Agua estéril sin conservador. Sirve igual para disolver, pero el vial se usa una vez y se desecha.',
          example: 'Una solución preparada con agua estéril se usa el mismo día; con agua bacteriostática la ventana práctica ronda los 28 días en refrigeración.',
        },
        {
          term: 'Subcutáneo (SC)',
          plain: 'En el tejido graso que está justo bajo la piel. Es la vía que más aparece descrita en los estudios, porque la absorción resulta lenta y pareja.',
          example: 'En la literatura suele usarse aguja corta de 4 a 8 mm y volúmenes menores a 1 mL por sitio. Término informativo: no describimos administración en personas.',
        },
        {
          term: 'Intramuscular (IM)',
          plain: 'Dentro del músculo. Otra vía descrita en estudios; la absorción es más rápida que la subcutánea porque el músculo tiene más riego sanguíneo.',
          example: 'En los reportes suele implicar aguja de 25 a 38 mm y volúmenes de hasta 2 a 3 mL. Igual que arriba: es vocabulario de literatura, no una indicación.',
        },
        {
          term: 'Jeringa de insulina',
          plain: 'Jeringa chica marcada en unidades en vez de mililitros. Es la única forma práctica de medir volúmenes pequeños sin adivinar.',
          example: 'La estándar es de 1 mL dividido en 100 unidades, con aguja 29G a 31G. Cada rayita equivale a 0.01 mL.',
        },
        {
          term: 'Unidades (UI) en la jeringa',
          plain: 'Cada rayita de la escala. Ojo: mide volumen, no cantidad de péptido. Cuánto producto hay en 10 unidades depende de qué tan diluido lo dejaste.',
          example: 'En una jeringa de 100 UI, 20 unidades son 0.2 mL. A 5 mg/mL eso son 1 mg; a 2 mg/mL, esas mismas 20 unidades son 0.4 mg.',
        },
        {
          term: 'mg vs mcg',
          plain: 'Miligramo y microgramo. Un miligramo son mil microgramos. Es el error de cuenta que más viales arruina.',
          example: '0.25 mg = 250 mcg. Un vial de 10 mg contiene 10,000 mcg. Si confundes las unidades, te equivocas por un factor de 1,000.',
        },
        {
          term: 'Concentración',
          plain: 'Cuánto producto hay en cada mililitro de líquido. Se escribe mg/mL.',
          example: '10 mg en 2 mL son 5 mg/mL; los mismos 10 mg en 5 mL son 2 mg/mL. Es el mismo péptido, solo más repartido.',
        },
        {
          term: 'Dosis',
          plain: 'La cantidad de compuesto usada en una aplicación dentro de un experimento. En los artículos casi siempre viene por kilo de peso del modelo.',
          example: 'Un estudio puede reportar 10 mcg/kg en un modelo animal: en un ratón de 25 g eso son 0.25 mcg. Los datos de modelos no se trasladan directo a nada más.',
        },
        {
          term: 'Titulación',
          plain: 'Subir la cantidad poco a poco en un diseño experimental en lugar de empezar arriba, para observar dónde aparecen los efectos.',
          example: 'Un diseño típico prueba 0.25, 0.5, 1.0 y 2.0 mg semanales en fases de cuatro semanas cada una y compara los grupos.',
        },
        {
          term: 'Protocolo',
          plain: 'El plan escrito de un experimento: qué se usa, cuánto, cada cuándo, por cuánto tiempo y qué se mide.',
          example: 'Un protocolo publicado especifica algo como "8 semanas, medición basal y cada 2 semanas, n = 24 sujetos divididos en 3 grupos".',
        },
        {
          term: 'Ciclo',
          plain: 'Un periodo definido de uso seguido de una pausa, dentro de un diseño de estudio.',
          example: 'En la literatura verás esquemas del tipo 8 semanas activas y 4 de descanso, para observar si la respuesta se mantiene o disminuye.',
        },
        {
          term: 'Vial',
          plain: 'El frasquito de vidrio con tapón de goma y sello de aluminio donde viene el producto.',
          example: 'Los formatos van de 2 mg a 100 mg. Un vial de 10 mL sellado admite decenas de pinchazos si el tapón se limpia con alcohol al 70% cada vez.',
        },
        {
          term: 'Alícuota',
          plain: 'Una porción medida que separas del total para no tener que abrir el frasco principal cada vez.',
          example: 'Repartir 5 mL de solución en 10 tubos de 0.5 mL antes de congelar evita descongelar todo el lote en cada uso.',
        },
        {
          term: 'COA',
          plain: 'Certificado de análisis: el documento del laboratorio que dice qué salió al analizar ese lote exacto.',
          example: 'Un COA reporta, por ejemplo, pureza por HPLC de 98.7%, peso molecular confirmado de 3,364 Da y el número de lote impreso en tu etiqueta.',
        },
        {
          term: 'HPLC',
          plain: 'La técnica que separa los componentes de una muestra empujándola a presión por una columna. Sirve para ver qué tanto de lo que hay es el compuesto que dice ser.',
          example: 'Las siglas son cromatografía líquida de alta resolución. Opera a presiones de cientos de bares y el resultado se lee como picos: el área del pico principal da el porcentaje de pureza.',
        },
        {
          term: 'Espectrometría de masas',
          plain: 'La técnica que pesa la molécula. Confirma que lo que tienes es de verdad la secuencia esperada y no otra cosa.',
          example: 'Si el peso teórico de la secuencia es 1,619 Da y el equipo mide 1,619.8 Da, la identidad queda confirmada.',
        },
        {
          term: 'Pureza',
          plain: 'Qué porcentaje del contenido es realmente el compuesto objetivo. El resto son residuos del proceso de fabricación.',
          example: 'Pureza de 99% en un vial de 10 mg significa 9.9 mg del compuesto y 0.1 mg de subproductos como cadenas incompletas.',
        },
        {
          term: 'GLP-1',
          plain: 'Un péptido que el intestino libera al comer y que participa en las señales de saciedad y en el manejo de glucosa. Muchos compuestos de investigación imitan su acción.',
          example: 'El GLP-1 natural dura muy poco en circulación, del orden de 2 minutos. Los análogos sintéticos se diseñan justo para durar más.',
        },
        {
          term: 'GH y secretagogo',
          plain: 'GH es la hormona de crecimiento. Un secretagogo no es la hormona: es una molécula que le pide a la glándula que libere la suya.',
          example: 'La somatropina es GH directa, de 191 aminoácidos. Ipamorelin, en cambio, tiene 5 aminoácidos y actúa como señal para que la hipófisis libere GH propia.',
        },
        {
          term: 'Receptor',
          plain: 'La cerradura en la superficie de la célula. El péptido es la llave: si encaja, se abre una respuesta adentro.',
          example: 'Un receptor puede responder a concentraciones nanomolares, es decir del orden de 0.000000001 moles por litro. Por eso bastan cantidades diminutas.',
        },
        {
          term: 'Vida media',
          plain: 'El tiempo que tarda en desaparecer la mitad de lo que había. Después de cuatro o cinco vidas medias, prácticamente ya no queda nada.',
          example: 'Si la vida media es de 6 horas, a las 12 horas queda una cuarta parte y a las 24 horas queda alrededor del 6%.',
        },
        {
          term: 'Biodisponibilidad',
          plain: 'Qué fracción de lo que aplicaste llega realmente a circulación. Por vía intravenosa es 100% por definición; por otras vías, menos.',
          example: 'Un péptido con 3% de biodisponibilidad oral entrega 0.3 mg de cada 10 mg administrados: el resto lo destruye la digestión.',
        },
        {
          term: 'Sinergia',
          plain: 'Que dos compuestos juntos den más que la suma de cada uno por separado. Se afirma mucho más de lo que se demuestra.',
          example: 'Si A da 10 y B da 10, la suma esperada es 20; hablar de sinergia exige medir 30 en un experimento con control, no suponerlo.',
        },
        {
          term: 'Stack',
          plain: 'Combinación de dos o más compuestos usados en el mismo estudio. Es jerga de foros, no un término formal.',
          example: 'Una presentación combinada frecuente es BPC-157 5 mg más TB-500 5 mg en el mismo vial, que se reconstituye como una sola unidad de 10 mg totales.',
        },
        {
          term: 'In vitro / in vivo',
          plain: 'In vitro es en tubo o placa, fuera de un organismo. In vivo es dentro de uno vivo. Lo que funciona en placa muchas veces no se repite en organismo completo.',
          example: 'Un resultado in vitro sobre células a 10 micromolar puede ser irrelevante si en un organismo la molécula nunca alcanza ni la centésima parte de esa concentración.',
        },
        {
          term: 'Preclínico',
          plain: 'La etapa de investigación anterior a cualquier prueba en humanos: cultivos celulares y modelos animales.',
          example: 'De cada 100 compuestos que se ven bien en preclínico, alrededor de 10 llegan a fase clínica y aproximadamente 1 completa el camino regulatorio.',
        },
        {
          term: 'Lote',
          plain: 'El identificador de la tanda de producción exacta de tu vial. Sirve para trazabilidad.',
          example: 'Un código como LT-20260415-07 permite pedir el COA de esa producción específica, no el de otra corrida del mismo compuesto.',
        },
        {
          term: 'RUO',
          plain: 'Research Use Only: uso exclusivo en investigación. Significa que el material no está aprobado ni destinado a consumo humano ni animal.',
          example: 'La leyenda va impresa en cada etiqueta. Ningún producto RUO cuenta con aprobación de COFEPRIS o FDA para uso terapéutico.',
        },
        {
          term: 'Degradación',
          plain: 'Que la molécula se rompa o se deforme y deje de servir. La causan agua, calor, luz, oxígeno y agitación fuerte.',
          example: 'Por eso el polvo va a 2–8 °C, la solución también, y cada ciclo de congelar y descongelar el mismo vial cobra una parte del producto.',
        },
        {
          term: 'Agregación',
          plain: 'Que las moléculas se peguen entre sí formando grumos. Deja de haber péptido funcional aunque la cantidad total no cambie.',
          example: 'Se ve como turbidez o partículas flotando en una solución que antes estaba transparente. Suele venir de agitar el vial en vez de girarlo con suavidad.',
        },
      ],
    },
    {
      type: 'cards',
      title: 'Si quieres ir más a fondo',
      intro: 'Este glosario es la versión llana. Aquí está el resto.',
      items: [
        {
          title: 'Vocabulario técnico: el idioma de un COA',
          body: 'Las mismas ideas con nomenclatura formal, estructura química y referencias a la literatura.',
          to: '/aprende/glosario-tecnico-tecnico',
          cta: 'Ver versión técnica',
        },
        {
          title: 'Empieza aquí',
          body: 'Tu primera vez con un vial: qué llega, qué material necesitas y el recorrido completo en 8 pasos.',
          to: '/aprende/empieza-aqui',
          cta: 'Leer la guía',
        },
        {
          title: 'Péptidos explicados desde cero',
          body: 'De aminoácido a molécula funcional, clasificación por grupo y por qué se estudian.',
          to: '/aprende/peptidos-explicados',
          cta: 'Leer fundamentos',
        },
        {
          title: 'Calculadora de reconstitución',
          body: 'Convierte miligramos, mililitros y unidades de jeringa sin hacer cuentas a mano.',
          to: '/calculadora',
          cta: 'Abrir calculadora',
        },
      ],
    },
  ],
  related: [
    { to: '/aprende/empieza-aqui', title: 'Empieza aquí', desc: 'Tu primera vez con un vial, en 5 minutos.' },
    { to: '/aprende/peptidos-explicados', title: 'Péptidos explicados desde cero', desc: 'Fundamentos de química y clasificación.' },
    { to: '/aprende/reconstitucion-paso-a-paso', title: 'Cómo reconstituir', desc: 'Del polvo a la solución, con volúmenes reales.' },
    { to: '/info/calidad', title: 'Calidad y COA', desc: 'Qué se mide en cada lote y cómo leerlo.' },
  ],
};

export default page;
