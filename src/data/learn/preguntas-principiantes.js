const page = {
  slug: 'preguntas-principiantes',
  title: 'Lo que nadie te explica en tu primer pedido',
  subtitle:
    'Las preguntas que casi nadie hace por pena, ordenadas por el momento en que aparecen: antes de comprar, cuando llega la caja, al preparar el material y durante el protocolo.',
  badge: 'Principiantes',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'Nadie nace sabiendo esto',
      paragraphs: [
        'El 90% de los correos que recibimos en la primera compra son la misma media docena de dudas: el polvo no se ve, el vial parece vacío, el líquido se puso turbio, la aguja se dobló. Ninguna es tonta y todas tienen una explicación física sencilla.',
        'Esta página está ordenada por el recorrido, no por tema. Empieza donde estés: si ya te llegó la caja y no sabes qué hacer, brinca a la segunda sección.',
        'Un recordatorio antes de entrar: todo esto es material de investigación. Aquí hablamos de manejo de laboratorio (reconstituir, medir, conservar, registrar), nunca de administración en personas o animales. Para eso no somos la fuente correcta.',
      ],
    },
    {
      type: 'faq',
      title: 'Antes de comprar',
      items: [
        {
          q: '¿Qué es exactamente un péptido, en cristiano?',
          a: 'Es una cadena corta de aminoácidos: las mismas piezas con las que se construyen las proteínas, pero muchas menos. Una proteína puede tener cientos; un péptido típico de catálogo tiene entre 5 y 40. Por ser cortos son muy específicos: encajan en un receptor concreto y no en todo el organismo a la vez.',
        },
        {
          q: '¿Por qué vienen en polvo y no ya listos en líquido?',
          a: 'Porque en agua el péptido se degrada en semanas y en polvo aguanta meses o años. El liofilizado es el mismo material al que se le quitó el agua congelándolo al vacío. Se manda seco y estable, y el agua se le agrega cuando ya está en tu mesa de trabajo.',
        },
        {
          q: '¿Qué necesito además del vial? No quiero que me falte algo.',
          a: 'Cuatro cosas: agua bacteriostática (o estéril, según el caso), jeringas de insulina graduadas, toallitas con alcohol isopropílico y un espacio en el refrigerador. Todo eso está en /catálogo y conviene pedirlo en el mismo pedido para no pagar dos envíos.',
        },
        {
          q: '¿Cómo elijo entre 5 mg y 10 mg del mismo compuesto?',
          a: 'Por cuánto material vas a ocupar antes de que el vial reconstituido pierda vigencia. Un vial más grande sale más barato por miligramo, pero si tarda mucho en consumirse, lo que ahorras lo pierdes en material degradado. Corre los números en /calculadora antes de decidir.',
        },
        {
          q: '¿Está bien pedir el COA antes de comprar?',
          a: 'Está perfecto, y es señal de que sabes qué estás haciendo. Pídelo a hola@exygenlabs.com. Si un proveedor se pone raro cuando le pides el certificado de análisis, esa es toda la información que necesitas sobre ese proveedor.',
        },
        {
          q: 'Me da miedo pedir mucho la primera vez, ¿empiezo chico?',
          a: 'Sí. No hay pedido mínimo. Un vial y su material de apoyo es un primer pedido perfectamente razonable: te sirve para familiarizarte con el manejo antes de comprometer dinero en volumen.',
        },
        {
          q: 'Vi tres compuestos que suenan bien, ¿pido los tres?',
          a: 'No de golpe. Si arrancas con tres a la vez y algo sale raro, no vas a saber cuál fue. La regla básica de cualquier protocolo serio es introducir una variable a la vez. En /asesor te ayudamos a ordenar por dónde empezar.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Cuando llega el paquete',
      items: [
        {
          q: '¿Por qué el vial se ve vacío? Juraría que no trae nada.',
          a: 'Es lo más normal del mundo. Cinco miligramos de polvo es aproximadamente lo que cabe en la cabeza de un alfiler, y la liofilización deja el material como una película translúcida pegada al vidrio. Ponlo a contraluz y ladéalo: casi siempre se alcanza a ver el anillo o la costra. Aunque no la veas, el contenido está garantizado por peso, no por volumen aparente.',
        },
        {
          q: 'El polvo se quedó pegado en la tapa, ¿se echó a perder?',
          a: 'No. Con las vibraciones del transporte es normal que parte del liofilizado se despegue y suba al tapón. No se perdió nada: cuando agregues el diluyente y gires el vial, ese material se disuelve igual. No lo sacudas para bajarlo, solo reconstituye normal y luego gira suave hasta que el vidrio quede limpio.',
        },
        {
          q: 'Llegó a temperatura ambiente, ¿está arruinado?',
          a: 'No. El péptido liofilizado es estable a temperatura ambiente durante el tiempo que dura el tránsito, por eso se manda por aéreo sin hielo. Lo que sí conviene es meterlo al refrigerador en cuanto lo desempaques, para que empiece a contar su vida útil larga.',
        },
        {
          q: '¿Cuál es lo primero que debo hacer al abrir la caja?',
          a: 'Cuatro pasos: revisa que ningún vial venga roto o con el engargolado flojo, verifica que los productos coincidan con tu pedido, anota el número de lote de cada etiqueta en tu bitácora y mete todo al refrigerador. Si algo viene dañado, foto de inmediato y escríbenos dentro de las primeras 48 horas.',
        },
        {
          q: '¿Le quito el sello de aluminio al vial?',
          a: 'Solo el disco central de plástico o aluminio que cubre el centro del tapón. El anillo engargolado que sujeta el tapón al vidrio no se quita nunca: es lo que mantiene el cierre hermético. La aguja atraviesa la goma, no hace falta destapar nada más.',
        },
        {
          q: '¿En qué parte del refrigerador lo guardo?',
          a: 'En el cuerpo del refri, entre 2 y 8 grados, no en la puerta (ahí la temperatura sube cada vez que abres) y no pegado a la pared del fondo, donde a veces se congela. Guárdalo en su caja o en un contenedor opaco: la luz también degrada.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Al preparar el material',
      items: [
        {
          q: '¿Qué es reconstituir y por qué se hace así?',
          a: 'Reconstituir es devolverle el agua al polvo para tener una solución de concentración conocida. Se hace con volumen medido y calculado, no a ojo, porque de ese volumen depende cuánto compuesto hay en cada marca de la jeringa. La cuenta la hace por ti /calculadora.',
        },
        {
          q: '¿Cuál es la diferencia entre agua bacteriostática y agua estéril?',
          a: 'El agua bacteriostática trae alcohol bencílico al 0.9%, que inhibe el crecimiento bacteriano y permite pinchar el vial varias veces durante días. El agua estéril para inyección no trae conservador: sirve para un solo uso, porque en cuanto entra aire y aguja deja de ser confiable. Para un vial de varias tomas, bacteriostática.',
        },
        {
          q: '¿Cómo meto el agua sin arruinar el polvo?',
          a: 'Limpia el tapón con alcohol, carga el volumen calculado y clava la aguja en ángulo para que el chorro escurra por la pared de vidrio, no directo sobre el liofilizado. El impacto del chorro sobre el polvo y la espuma que genera son las dos formas más comunes de maltratar un péptido.',
        },
        {
          q: 'No se disuelve todo, ¿lo agito?',
          a: 'No. Nunca agites un vial de péptido. Gíralo despacio entre los dedos o déjalo reposar unos minutos en el refrigerador; casi todos terminan de disolverse solos. Si agitas, generas espuma, y la espuma es proteína desnaturalizándose en la interfase aire-líquido.',
        },
        {
          q: 'Quedó turbio o con grumitos, ¿lo tiro?',
          a: 'Primero dale tiempo: mucha turbidez inicial se aclara en 10 o 15 minutos. Si después de reposar sigue turbio, con hilos o con partículas que no se van, ese material ya no es confiable para trabajar. Anótalo con su número de lote y escríbenos, porque puede ser un problema de lote y eso sí entra en reposición.',
        },
        {
          q: '¿Puedo usar la misma jeringa dos veces?',
          a: 'No. Una jeringa, un uso. La aguja se despunta desde el primer pinchazo y una punta despuntada rasga la goma del tapón, lo que suelta pedacitos de septo dentro de tu solución y arruina el cierre hermético. Además, cada reingreso es una oportunidad de contaminación. Las jeringas son la parte más barata de todo esto: no las reutilices.',
        },
        {
          q: '¿Cómo sé cuánto hay en cada marca de la jeringa?',
          a: 'Depende de tres números: los miligramos del vial, los mililitros de agua que le pusiste y la escala de tu jeringa. Una jeringa de insulina de 1 mL tiene 100 unidades, así que cada unidad es 0.01 mL. Mete tus datos en /calculadora y te da la equivalencia exacta; anótala en la etiqueta del vial con plumón.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Durante el protocolo',
      items: [
        {
          q: '¿Cuánto dura el vial ya reconstituido?',
          a: 'Mucho menos que en polvo. En refrigeración de 2 a 8 grados se habla de semanas, no de meses, y varía por compuesto: los más estables aguantan cerca de un mes, los más frágiles bastante menos. Escribe en la etiqueta la fecha en que lo reconstituiste; sin esa fecha vas a andar adivinando.',
        },
        {
          q: 'Se me olvidó anotar la fecha de reconstitución, ¿qué hago?',
          a: 'Revisa tu pedido en /cuenta para acotar desde cuándo lo tienes y, si no logras ubicar la fecha, trátalo como material vencido. El seguimiento de consumo de /cuenta existe justo para esto: registra el vial cuando lo abres y te lleva la cuenta, incluido el aviso de cuándo se te va a acabar.',
        },
        {
          q: 'Se me quedó fuera del refri toda la noche, ¿lo tiro?',
          a: 'Depende del compuesto y de cuántas horas fueron. Unas horas a temperatura ambiente rara vez arruinan una solución; un día entero al calor sí compromete bastante material. Si quedó turbia, cambió de color o huele raro, va a la basura. Ante la duda real, el material se reemplaza: sale más barato que un resultado que no vas a poder interpretar.',
        },
        {
          q: '¿Puedo congelar la solución ya reconstituida?',
          a: 'Se puede en algunos casos, pero cada ciclo de congelado y descongelado maltrata el péptido, así que solo tiene sentido si lo alícuotas en porciones de un solo uso y descongelas una a la vez. Congelar y descongelar el mismo vial varias veces es peor que dejarlo en refrigeración.',
        },
        {
          q: '¿Se pueden mezclar dos compuestos en la misma jeringa?',
          a: 'Como práctica de laboratorio no se recomienda: cada compuesto tiene su pH y su estabilidad, y al mezclarlos pierdes la posibilidad de saber a qué atribuir lo que observes. Mantenlos separados, con su propio registro. Si te interesa combinarlos en un protocolo, la lógica de stacks está en /aprende/protocolos.',
        },
        {
          q: '¿Cada cuándo reviso el vial?',
          a: 'Cada vez que lo saques. Míralo a contraluz: debe estar transparente, sin partículas, sin hilos y sin cambio de color respecto a como quedó el día que lo reconstituiste. Treinta segundos de revisión te ahorran semanas de datos inservibles.',
        },
        {
          q: '¿Vale la pena llevar bitácora si es un solo compuesto?',
          a: 'Sí, y es lo que separa un experimento de una anécdota. Anota lote, fecha de reconstitución, volumen usado, concentración resultante y observaciones con su fecha. Sin registro no vas a poder reproducir lo que salió bien ni descartar lo que salió mal.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Resultados y expectativas',
      items: [
        {
          q: '¿En cuánto tiempo se ve algo?',
          a: 'Depende por completo del compuesto y del modelo experimental, y la respuesta honesta es que en muchos casos la literatura reporta ventanas de semanas, no de días. Cualquiera que te prometa un resultado en 48 horas te está vendiendo, no informando.',
        },
        {
          q: 'No pasó nada, ¿el producto está mal?',
          a: 'Antes de culpar al material, revisa la cadena: cálculo de concentración, técnica de reconstitución, conservación, tiempo transcurrido y qué estabas midiendo exactamente. Si después de revisar eso sigues con dudas del material, pide el COA del lote y compáralo. Ahí sí, escríbenos.',
        },
        {
          q: '¿Puedo apurar el proceso subiendo la cantidad?',
          a: 'No es como funcionan los sistemas biológicos. Muchos de estos compuestos actúan sobre receptores que se saturan: pasado cierto punto, más material no da más efecto, solo más ruido y más probabilidad de efectos fuera de blanco. Más rápido no es una palanca que exista aquí.',
        },
        {
          q: 'Leí en un foro que a alguien le funcionó buenísimo, ¿le creo?',
          a: 'Con mucha cautela. Un testimonio no controla variables, no tiene grupo de comparación y no sabe si el material era lo que decía la etiqueta. Sirve como pista para ir a buscar la literatura, nunca como evidencia.',
        },
        {
          q: '¿Qué evidencia hay realmente detrás de estos compuestos?',
          a: 'Es desigual y hay que decirlo tal cual. Algunos tienen ensayos clínicos serios y son fármacos aprobados en otras jurisdicciones; otros tienen solo estudios en animales o in vitro; otros apenas preliminares. En las fichas de /catálogo y en las guías de /aprende decimos en qué nivel está cada uno, sin adornarlo.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Seguridad y sentido común',
      items: [
        {
          q: '¿Qué hago con las agujas usadas?',
          a: 'Van en un contenedor rígido de punzocortantes, nunca en la basura doméstica ni sueltas. No re-encapuches la aguja empujando el capuchón contra la punta con la otra mano: así es como la gente se pincha. Cuando el contenedor esté a tres cuartos, séllalo y llévalo a un punto de residuos punzocortantes.',
        },
        {
          q: 'Se me cayó un vial y se rompió, ¿cómo limpio?',
          a: 'Guantes, recoge el vidrio con pinzas o cartón rígido, nunca con la mano desnuda; limpia la superficie con alcohol y desecha el vidrio en contenedor rígido. Ventila el área. No intentes rescatar la solución derramada: ya no es estéril.',
        },
        {
          q: '¿Necesito guantes y cubrebocas para esto?',
          a: 'Guantes sí, siempre: protegen tu piel y protegen tu material de tus dedos. Cubrebocas es buena idea si vas a estar mucho tiempo con el vial abierto. Y lo más importante y más ignorado: lavarte las manos y limpiar la superficie de trabajo antes de empezar.',
        },
        {
          q: '¿Puedo guardar los viales junto con la comida?',
          a: 'Mejor no. Usa un contenedor cerrado, etiquetado y en una zona separada del refrigerador, para que nadie de la casa lo confunda con nada y para que no se contamine con humedad ni olores. Si hay niños en casa, que sea un lugar donde no lleguen.',
        },
        {
          q: '¿Cómo detecto a un proveedor al que no debo comprarle?',
          a: 'Cuatro señales: no te da COA por lote, promete curas o resultados terapéuticos, tiene precios muy por debajo del mercado sin explicación, y no te dice de dónde viene el material. Cualquiera de las cuatro es motivo suficiente para no comprarle.',
        },
        {
          q: '¿Me pueden decir cuánto usar en una persona?',
          a: 'No. Ni nosotros ni el chat del sitio ni el asesor van a dar pautas de administración en humanos o animales, porque estos productos son exclusivamente para investigación y no somos profesionales de la salud tratándote. Podemos ayudarte con química, manejo, conservación y cálculos de laboratorio; cualquier decisión clínica es de un médico.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'danger',
      title: 'Solo para investigación',
      body:
        'Los productos de Exygen Labs son reactivos de investigación (RUO). No son medicamentos, no están aprobados para consumo humano ni animal, y esta página describe únicamente manejo de material en laboratorio. Nada de lo aquí escrito es consejo médico.',
    },
    {
      type: 'cards',
      title: 'Siguientes pasos',
      intro: 'Cuando ya te sientas cómodo con lo básico, aquí sigue.',
      items: [
        {
          title: 'La calculadora',
          body: 'Miligramos, mililitros y unidades de jeringa, sin hacer la regla de tres a mano.',
          to: '/calculadora',
          cta: 'Abrir calculadora',
        },
        {
          title: 'FAQ completa',
          body: 'Lo operativo: pagos, descuentos, envíos, facturas, reposiciones y marco legal.',
          to: '/aprende/preguntas-frecuentes',
          cta: 'Ver la FAQ',
        },
        {
          title: 'Protocolos por objetivo',
          body: 'Qué se combina con qué y por qué, con el mecanismo de cada pieza del stack.',
          to: '/aprende/protocolos',
          cta: 'Ver protocolos',
        },
        {
          title: 'Tu cuenta',
          body: 'Pedidos con rastreo y el seguimiento de consumo que te avisa antes de que se acabe el vial.',
          to: '/cuenta',
          cta: 'Entrar a mi cuenta',
        },
      ],
    },
  ],
  related: [
    {
      to: '/aprende/preguntas-frecuentes',
      title: 'Preguntas frecuentes',
      desc: 'Pagos, descuentos por volumen, envíos FedEx, reposiciones y legal.',
    },
    {
      to: '/aprende/protocolos',
      title: 'Protocolos por objetivo',
      desc: 'Seis objetivos, sus combinaciones y el razonamiento detrás de cada una.',
    },
    {
      to: '/asesor',
      title: 'Asesor de protocolo',
      desc: 'Si no sabes por dónde empezar, empieza aquí.',
    },
  ],
};

export default page;
