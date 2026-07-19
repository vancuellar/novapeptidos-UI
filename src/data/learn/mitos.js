const page = {
  slug: 'mitos',
  title: 'Mitos que circulan y qué dice de verdad la evidencia',
  subtitle:
    'Diez afirmaciones que se repiten en foros, grupos y publicaciones de venta, revisadas una por una contra lo que realmente se sabe —y contra lo que todavía no se sabe.',
  badge: 'Evidencia',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'warn',
      title: 'Uso exclusivo en investigación (RUO)',
      body:
        'Los compuestos que se mencionan son para investigación in vitro y uso analítico de laboratorio. No son para consumo humano ni animal, no son medicamentos y esta página no da indicaciones de administración ni consejo médico. Se discuten mecanismos, química, calidad del material y el estado de la literatura.',
    },
    {
      type: 'prose',
      title: 'Por qué hace falta una página así',
      paragraphs: [
        'La información sobre péptidos circula en un terreno raro: hay literatura científica seria, hay marketing agresivo y hay experiencia anecdótica repetida hasta sonar a dato. Los tres se mezclan en el mismo hilo de foro y salen indistinguibles.',
        'Lo que sigue no es una defensa ni un ataque a estos compuestos. Es una separación de tres cosas: lo que está razonablemente establecido, lo que es preliminar y lo que simplemente es falso. Cuando la respuesta honesta sea "no se sabe", eso es lo que vas a leer.',
      ],
    },
    {
      type: 'faq',
      title: 'Los diez mitos, uno por uno',
      items: [
        {
          q: 'Mito 1: "Más dosis, más resultado"',
          a:
            'Es la extrapolación lineal que casi nunca se cumple en biología. La mayoría de los péptidos actúan sobre receptores, y los receptores se saturan: llegado cierto punto, añadir más ligando no aumenta la señal porque ya no hay sitios libres. Peor todavía, la estimulación sostenida induce desensibilización y regulación a la baja del receptor —la célula literalmente retira receptores de la superficie—, de modo que el efecto puede disminuir mientras la concentración sube. Varias familias de péptidos muestran además curvas dosis-respuesta en forma de campana en modelos in vitro: hay una ventana donde funcionan y por encima de ella el efecto cae. En términos de investigación, esto significa que la dosis es un parámetro que se determina experimentalmente, no algo que se escala por intuición.',
        },
        {
          q: 'Mito 2: "Los péptidos son esteroides"',
          a:
            'Son clases químicas distintas con mecanismos distintos. Los esteroides anabólicos son moléculas lipídicas derivadas del colesterol, con cuatro anillos de carbono fusionados; atraviesan la membrana celular, se unen a receptores intracelulares y modifican directamente la transcripción de genes. Los péptidos son cadenas de aminoácidos unidas por enlaces amida; son hidrofílicos, no cruzan la membrana y actúan sobre receptores de superficie que disparan cascadas de señalización. La confusión viene de que algunos péptidos de investigación se estudian en contextos de crecimiento tisular, igual que algunos esteroides. Coincidir en el campo de estudio no los vuelve la misma cosa, del mismo modo que un martillo y un desarmador no son lo mismo por usarse ambos en carpintería. Dicho esto: distinto no significa inocuo. Ver mito 8.',
        },
        {
          q: 'Mito 3: "Si no lo sientes en 3 días, no sirve"',
          a:
            'Esto confunde percepción subjetiva con actividad biológica, y confunde la escala de tiempo de una molécula con la del proceso que modula. Muchos péptidos tienen vidas medias en plasma de minutos a pocas horas, pero actúan iniciando procesos —síntesis proteica, remodelación de matriz extracelular, angiogénesis— que se miden en semanas. En modelos animales de reparación tisular, las diferencias histológicas relevantes suelen aparecer entre la segunda y la sexta semana, no al tercer día. Además, la ausencia de sensación no dice nada: la mayoría de las rutas de señalización no producen ninguna experiencia consciente. En investigación, esta es justamente la razón por la que se usan marcadores objetivos y grupos de control en lugar de impresiones.',
        },
        {
          q: 'Mito 4: "Todos los péptidos se guardan igual"',
          a:
            'Falso, y es el mito que más material desperdicia. La estabilidad depende de la secuencia concreta: un péptido con metionina o cisteína se oxida con facilidad; uno con asparagina o glutamina es susceptible de desamidación; uno con triptófano o tirosina es fotosensible. Los análogos de GLP-1 forman fibrillas con la agitación mucho más rápido que un péptido corto de cinco residuos. La forma también manda: un liofilizado a −20 °C dura años, y esa misma molécula reconstituida dura semanas a 2–8 °C. Y el diluyente cambia el cálculo: algunos compuestos toleran mal el alcohol bencílico del agua bacteriostática. Lo correcto es leer la ficha de cada compuesto; la guía de conservación tiene la referencia por familia.',
        },
        {
          q: 'Mito 5: "99 % de pureza lo dice cualquiera"',
          a:
            'Tiene una parte cierta y una parte peligrosa. La cierta: un número impreso en una página web no vale nada por sí solo. La peligrosa: concluir que entonces la pureza da igual. Lo que separa un dato de una afirmación es la trazabilidad. Un porcentaje de pureza solo significa algo si viene acompañado del método analítico (HPLC en fase reversa es el estándar, y el porcentaje se calcula por área de pico), del cromatograma real, de la confirmación de identidad por espectrometría de masas, del número de lote y de la fecha del análisis, idealmente de un laboratorio tercero. Sin cromatograma no hay forma de saber si ese 99 % excluye sal residual, agua o contraiones, y esos suelen ser una fracción nada trivial del peso del vial. La pregunta correcta no es "¿es 99 %?" sino "¿me muestras el cromatograma de este lote?".',
        },
        {
          q: 'Mito 6: "El agua estéril y la bacteriostática son lo mismo"',
          a:
            'No lo son, y la diferencia es un ingrediente concreto: el agua bacteriostática lleva alcohol bencílico al 0.9 %, es decir 9 mg por mL, y el agua estéril para inyección no lleva nada. El alcohol bencílico es un conservador bacteriostático: no esteriliza ni mata todo lo que entre, pero inhibe la multiplicación microbiana, lo que permite perforar el septo del mismo vial varias veces a lo largo de días. El agua estéril es la opción para uso inmediato de un solo pinchazo, o cuando el compuesto es incompatible con el alcohol bencílico —algunos péptidos y proteínas grandes muestran menor estabilidad en su presencia. Usar agua estéril en un vial que vas a perforar diez veces durante dos semanas es exponerse a contaminación microbiana sin ninguna barrera.',
        },
        {
          q: 'Mito 7: "Puedes mezclar todo en el mismo vial"',
          a:
            'Es una idea de conveniencia que ignora tres problemas reales. Primero, compatibilidad química: cada péptido tiene su rango de pH y su vehículo óptimo, y al juntarlos uno puede precipitar al otro o acelerar su degradación por catálisis cruzada. Segundo, cinética: dos compuestos con vidas medias distintas en solución dejan de estar en la proporción que creías a los pocos días, así que la mezcla cambia de composición sola. Tercero, y decisivo en investigación: si mezclas, pierdes la capacidad de atribuir cualquier resultado a un compuesto concreto, y también la de rastrear el problema cuando algo falla. Un vial mezclado no tiene lote, no tiene concentración verificable y no tiene interpretación limpia.',
        },
        {
          q: 'Mito 8: "Si es natural, no tiene riesgos"',
          a:
            'La naturalidad no es una categoría de seguridad. La toxina botulínica, la ricina y la amanitina son perfectamente naturales. Y en el caso de los péptidos hay un matiz adicional: que una secuencia exista en el cuerpo humano no significa que administrarla desde fuera reproduzca su papel fisiológico, porque el cuerpo la produce en un tejido específico, en una cantidad específica y en un momento específico, bajo retroalimentación. Introducir la misma molécula sin ese contexto es una intervención farmacológica, no una restauración. Además, la mayoría de estos compuestos son análogos sintéticos modificados precisamente para resistir la degradación, es decir, deliberadamente distintos de lo natural. Y para muchos de ellos no existen datos de seguridad a largo plazo en humanos: no es que digan que es seguro, es que no se ha estudiado.',
        },
        {
          q: 'Mito 9: "Más caro es mejor"',
          a:
            'El precio correlaciona con el costo real solo en parte. Sí encarecen legítimamente: la síntesis en fase sólida de secuencias largas, las purificaciones sucesivas por HPLC preparativa, las pruebas de terceros lote por lote, el llenado y liofilizado en condiciones controladas, y la cadena de frío. Pero también encarecen el margen de marca, el empaque y la publicidad, que no aportan nada a lo que hay dentro del vial. En el otro extremo, un precio muy por debajo del mercado sí es señal: la purificación es la etapa cara del proceso y saltársela es la manera obvia de abaratar. La forma de resolverlo no es mirar el precio, sino pedir el certificado de análisis del lote y compararlo. Lo que se paga es la documentación verificable, no la etiqueta.',
        },
        {
          q: 'Mito 10: "Un COA sin lote sirve igual"',
          a:
            'No sirve. Un certificado de análisis es un documento sobre un lote de producción concreto —una síntesis, una purificación, un llenado— y sin ese número no hay manera de saber si corresponde al vial que tienes en la mano. Un COA sin lote puede ser de hace tres años, de otra síntesis, o de un lote de muestra hecho para exhibir. La comprobación mínima es que el número impreso en la etiqueta del vial coincida con el del documento. Y ya que estás ahí, revisa que el COA traiga fecha de análisis, método declarado, cromatograma de HPLC legible, resultado de espectrometría de masas con la masa esperada, y el nombre del laboratorio que lo firmó. Un PDF con un logo y un porcentaje no es un certificado; es una imagen.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Lo que se dice / lo que se sabe',
      intro: 'Resumen en dos columnas para revisar rápido.',
      columns: ['Lo que se dice', 'Lo que se sabe'],
      rows: [
        [
          'Más dosis, más resultado',
          'Los receptores se saturan y se desensibilizan; hay curvas en campana. La dosis se determina experimentalmente, no se escala por intuición.',
        ],
        [
          'Los péptidos son esteroides',
          'Clases químicas distintas: cadenas de aminoácidos sobre receptores de superficie frente a moléculas lipídicas sobre receptores intracelulares.',
        ],
        [
          'Si no lo sientes en 3 días, no sirve',
          'La sensación no mide actividad biológica. Los procesos que modulan se observan en semanas, con marcadores objetivos y controles.',
        ],
        [
          'Todos se guardan igual',
          'La estabilidad depende de la secuencia, de la forma (polvo o solución) y del diluyente. Los plazos varían de años a días.',
        ],
        [
          '99 % de pureza lo dice cualquiera',
          'Cierto que el número solo no vale; falso que la pureza dé igual. Lo que vale es el cromatograma de HPLC del lote, con masa confirmada.',
        ],
        [
          'Agua estéril y bacteriostática son lo mismo',
          'La bacteriostática lleva 0.9 % de alcohol bencílico como conservador; la estéril no lleva nada y es para un solo uso.',
        ],
        [
          'Puedes mezclar todo en el mismo vial',
          'Riesgo de incompatibilidad química, deriva de proporciones por vidas medias distintas y pérdida total de trazabilidad.',
        ],
        [
          'Si es natural, no tiene riesgos',
          'Natural no equivale a seguro, y la mayoría son análogos sintéticos modificados. Para muchos no hay datos de seguridad a largo plazo.',
        ],
        [
          'Más caro es mejor',
          'El precio mezcla costo real y margen de marca. Lo verificable es el COA del lote, no la etiqueta ni el empaque.',
        ],
        [
          'Un COA sin lote sirve igual',
          'Sin número de lote el documento no se puede vincular a tu vial. Exige lote, fecha, método, cromatograma y laboratorio firmante.',
        ],
      ],
      note:
        'Cuando una afirmación no aparezca aquí, la prueba sigue siendo la misma: pide el dato verificable detrás.',
    },
    {
      type: 'list',
      title: 'Señales de que estás leyendo marketing y no información',
      intro: 'Patrones que se repiten en la publicidad de esta categoría.',
      items: [
        { text: 'Promesas de resultados concretos y garantizados en un plazo cerrado.', bad: true },
        { text: 'Pureza declarada sin cromatograma, sin lote y sin fecha de análisis.', bad: true },
        { text: 'Testimonios personales presentados como si fueran evidencia clínica.', bad: true },
        { text: 'Citas de estudios en ratones redactadas como si fueran hallazgos en humanos.', bad: true },
        { text: 'Frases del tipo "sin ningún efecto secundario" o "totalmente seguro".', bad: true },
        { text: 'Protocolos de dosificación publicados por un vendedor, no por una fuente científica.', bad: true },
        { text: 'Urgencia artificial: existencias limitadas, precio que sube mañana, oferta de hoy.', bad: true },
      ],
    },
    {
      type: 'list',
      title: 'Cómo evaluar una afirmación por tu cuenta',
      intro: 'Cinco preguntas que filtran la mayoría del ruido.',
      items: [
        '¿En qué modelo se observó? No es lo mismo un cultivo celular que un roedor, ni un roedor que un ensayo clínico controlado.',
        '¿Cuántos sujetos y con qué control? Un estudio abierto de doce participantes no sostiene una afirmación general.',
        '¿Quién lo financió y quién lo publicó? Revisado por pares no es garantía, pero un preprint patrocinado por el vendedor es otra categoría.',
        '¿Se ha replicado? Un hallazgo único, por elegante que sea, sigue siendo un hallazgo único.',
        '¿La afirmación distingue entre mecanismo plausible y efecto demostrado? Que una ruta exista no implica que activarla produzca el resultado prometido.',
      ],
    },
    {
      type: 'prose',
      title: 'Lo que sí está razonablemente establecido',
      paragraphs: [
        'Para no dejar la impresión de que todo es humo: hay bloques sólidos. Los mecanismos moleculares de varias de estas familias están bien caracterizados a nivel de receptor y de cascada de señalización; eso es bioquímica reproducida en muchos laboratorios.',
        'Los análogos de incretinas son el caso con evidencia clínica más robusta, con ensayos aleatorizados grandes publicados y revisados. En el otro extremo, buena parte de los péptidos de reparación tisular y de los bioreguladores se apoya en modelos animales y en estudios humanos pequeños, muchos de una sola región y sin replicación independiente.',
        'Decir esto no descalifica la investigación preliminar: así empieza toda la ciencia. Lo que no se vale es presentar el segundo grupo con el lenguaje de certeza del primero.',
      ],
    },
    {
      type: 'cards',
      title: 'Para seguir con lo práctico',
      intro: 'Las dos guías operativas del sitio y la referencia de calidad.',
      items: [
        {
          title: 'Cómo reconstituir',
          body: 'Procedimiento en 7 pasos, tabla de concentraciones y los seis errores que arruinan el material.',
          to: '/aprende/como-reconstituir',
          cta: 'Ver guía',
        },
        {
          title: 'Conservación y estabilidad',
          body: 'Temperaturas, plazos reales por familia y los signos de degradación que se ven a simple vista.',
          to: '/aprende/conservacion',
          cta: 'Ver guía',
        },
        {
          title: 'Calidad y certificados',
          body: 'Cómo se lee un COA, qué debe traer y por qué el número de lote es lo primero que hay que verificar.',
          to: '/info/calidad',
          cta: 'Ver calidad',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'La conclusión, sin adornos',
      body:
        'Ninguno de estos mitos se sostiene por mala fe generalizada: se sostienen porque son simples y las respuestas reales no lo son. La prueba práctica es siempre la misma —pide el dato verificable: el lote, el cromatograma, el método, el modelo experimental. Si detrás de una afirmación no hay ninguno de los cuatro, lo que tienes no es información, es una opinión con formato de dato.',
    },
  ],
  related: [
    {
      to: '/aprende/como-reconstituir',
      title: 'Cómo reconstituir',
      desc: 'El procedimiento de laboratorio paso a paso, con tiempos y cifras.',
    },
    {
      to: '/aprende/conservacion',
      title: 'Conservación y estabilidad',
      desc: 'Cuánto dura cada estado, por familia de compuesto, y cómo detectar degradación.',
    },
    {
      to: '/info/calidad',
      title: 'Calidad y certificados',
      desc: 'Qué exigirle a un COA antes de confiar en un lote.',
    },
  ],
};

export default page;
