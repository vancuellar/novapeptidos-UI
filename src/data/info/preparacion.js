// GUÍA DE PREPARACIÓN E INYECCIÓN — /info/preparacion
//
// Nace de un hueco real: teníamos calculadora de rayitas y cero guía de cómo
// preparar el vial, qué jeringa comprar y cuánto dura el material una vez
// reconstituido. La misma frase de almacenamiento ("-20 °C, reconstituido 2-8 °C")
// se repetía en los 98 productos.
//
// El contenido de jeringas, agujas y duraciones sale de la guía de preparación de
// researchdosing.com, contrastada con la práctica estándar de farmacia de
// compounding. Es información FÍSICA y de manejo — no es dosis ni pauta clínica,
// y por eso se puede publicar sin el candado de fuente que rige a las dosis.

const page = {
  slug: 'preparacion',
  title: 'Preparación e inyección',
  subtitle:
    'Cómo reconstituir un vial, qué jeringa comprar, cuánto dura el material una vez mezclado y los errores que echan a perder un péptido antes de usarlo.',
  badge: 'Guía de manejo',
  updated: '27 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'info',
      title: 'Lo que casi nadie te dice',
      body:
        'En una jeringa de 1 mL cada rayita impresa vale DOS unidades, no una. Por eso una dosis de 6 unidades no se puede medir bien ahí: no existe una raya en ese punto. Para dosis de menos de 10 unidades necesitas una jeringa de 0.3 mL o de 0.5 mL, donde cada rayita vale una unidad. Nuestra calculadora ya te lo avisa cuando pasa.',
    },
    {
      type: 'prose',
      title: 'Qué significa reconstituir',
      paragraphs: [
        'El vial llega liofilizado: el péptido viene como polvo o como una torta blanca pegada al fondo. Así es estable durante años, pero no se puede medir ni inyectar. Reconstituir es agregarle agua bacteriostática para convertirlo en un líquido del que sí puedes sacar una dosis exacta.',
        'La cantidad de agua NO cambia cuántos miligramos te aplicas. Cambia la concentración, y con ella cuántas rayitas equivale tu dosis. Más agua = más diluido = más rayitas para la misma cantidad de compuesto. Es el mismo material, medido con una regla distinta.',
        'Esa es exactamente la cuenta que hace nuestra calculadora: tú pones tu vial, tu agua y tu dosis, y ella te dice las rayitas.',
      ],
    },
    {
      type: 'steps',
      title: 'Cómo se reconstituye, paso a paso',
      intro:
        'Toma dos minutos. El error más caro es apurar el chorro de agua contra el polvo: el péptido se desnaturaliza y ya no sirve, aunque el líquido se vea perfecto.',
      items: [
        {
          title: 'Deja que el vial llegue a temperatura ambiente',
          body: 'Si viene del refrigerador o del congelador, espera. Reconstituir un vial helado favorece la condensación dentro del frasco.',
        },
        {
          title: 'Limpia los dos tapones de hule',
          body: 'El del péptido y el del agua bacteriostática, con una toallita de alcohol. Deja secar; no soples encima.',
        },
        {
          title: 'Carga el agua con una jeringa de reconstitución',
          body: 'Una de 3 mL con marcas de 0.1 mL, calibre 27 G. Con una jeringa de insulina también se puede, pero se necesitan varias pasadas y se pierde precisión.',
        },
        {
          title: 'Deja que el agua escurra por la PARED del vial',
          body: 'Inclina el vial y apunta la aguja a la pared de vidrio, no al polvo. El chorro directo sobre el liofilizado es la forma más común de arruinar un vial.',
        },
        {
          title: 'No agites. Gira.',
          body: 'Rueda el vial suavemente entre las palmas hasta que quede transparente. Agitar hace espuma, y la espuma es proteína desnaturalizada.',
        },
        {
          title: 'Etiqueta con la fecha',
          body: 'Escribe el día que lo reconstituiste. De ahí se cuentan los días de vida útil de la tabla de abajo.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Qué jeringa comprar',
      intro:
        'Los tres tamaños miden lo mismo: 30 unidades en una de 0.3, 0.5 o 1 mL son exactamente las mismas 30 unidades. Lo que cambia es cuánto vale cada rayita impresa, y de ahí sale toda la precisión.',
      columns: ['Jeringa', 'Cada rayita vale', 'Úsala para'],
      rows: [
        ['0.3 mL · 0.3 cc · 30 unidades', '1 unidad', 'Dosis de un solo dígito. La más precisa.'],
        ['0.5 mL · 0.5 cc · 50 unidades', '1 unidad', 'Dosis por debajo de 10 unidades.'],
        ['1 mL · 1 cc · 100 unidades', '2 unidades', 'Solo dosis de MÁS de 10 unidades.'],
        ['3 mL con marcas de 0.1 mL', '0.1 mL', 'Para reconstituir, no para dosificar.'],
        ['10 mL Luer Lock', '1 mL', 'Volúmenes grandes (Lemon Bottle). La aguja se compra aparte.'],
      ],
      note:
        'Calibre para dosificar: 29 a 31 G (número más alto = aguja más delgada). Para reconstituir: 27 G. Longitud subcutánea: 8 mm (5/16") o 12 mm (1/2"); 12 mm es lo más largo recomendable.',
    },
    {
      type: 'table',
      title: 'Cuánto dura',
      intro:
        'A partir del día que lo reconstituiste, o del día que llegó si sigue en polvo.',
      columns: ['Estado', 'Dónde', 'Cuánto dura'],
      rows: [
        ['Reconstituido', 'Refrigerador (2–8 °C)', '60 a 90 días'],
        ['Reconstituido — NAD+ y AOD-9604', 'Refrigerador (2–8 °C)', '30 a 45 días (duran menos)'],
        ['En polvo', 'Ambiente, seco y oscuro', '30 a 60 días'],
        ['En polvo', 'Refrigerador', 'Hasta 1 año'],
        ['En polvo', 'Congelador', '2 a 3 años'],
      ],
      note:
        'Excepción importante: el LIPO-C NO va al refrigerador — se gelifica. Se guarda entre 20 y 25 °C, lejos de la luz.',
    },
    {
      type: 'prose',
      title: 'Lo que de verdad degrada un péptido',
      paragraphs: [
        'Los ciclos de congelado y descongelado son, con diferencia, la forma más rápida de echar a perder el material. Si tienes varios viales, reconstituye solo el que vas a usar y deja los demás intactos: sacarlos y meterlos al congelador cada semana los destruye más rápido que dejarlos meses guardados.',
        'La humedad degrada incluso el polvo liofilizado, porque el vial absorbe agua del aire. Un recipiente opaco y bien cerrado con un par de bolsitas de sílica gel resuelve el problema por unos pesos.',
        'La luz también cuenta. Si no tienes un recipiente opaco, envolver los viales en papel aluminio funciona igual de bien.',
        'Y un detalle que casi nadie considera: no guardes los viales en la puerta del refrigerador. Cada vez que se abre, ahí es donde más se agita el contenido.',
      ],
    },
    {
      type: 'table',
      title: 'Qué necesitas tener a la mano',
      columns: ['Insumo', 'Para qué', 'Nota'],
      rows: [
        ['Agua bacteriostática', 'Reconstituir el vial', 'La vendemos. Trae alcohol bencílico, que es lo que permite pinchar el tapón varias veces.'],
        ['Toallitas con alcohol', 'Limpiar tapones y piel', 'Antes de cada pinchazo, sin excepción.'],
        ['Jeringas de insulina', 'Aplicar la dosis', 'Del tamaño que te indique la tabla de arriba.'],
        ['Jeringa de 3 mL, 27 G', 'Reconstituir', 'Opcional pero hace la mezcla mucho más limpia.'],
        ['Recipiente opaco y hermético', 'Guardar los viales', 'Con bolsitas de sílica gel adentro.'],
      ],
      note:
        'Caso especial: el AOD-9604 no se reconstituye con agua bacteriostática sino con ácido acético, que va aparte. Viene indicado en su ficha.',
    },
    {
      type: 'faq',
      title: 'Dudas que llegan siempre',
      items: [
        {
          q: '¿Puedo usar agua inyectable normal en vez de bacteriostática?',
          a: 'Para un solo uso sí, pero el agua estéril simple no trae conservador: en cuanto pinchas el tapón la segunda vez, ya no hay nada que impida que crezca algo dentro. La bacteriostática existe justo para viales de varias dosis.',
        },
        {
          q: 'Le puse más agua de la que decía la guía. ¿Eché a perder el vial?',
          a: 'No. Tienes el mismo compuesto, solo más diluido. Mete tu cantidad real de agua en la calculadora y te dice las rayitas nuevas. Lo único que cambia es cuánto jalas.',
        },
        {
          q: '¿Por qué mi dosis no cabe en la jeringa?',
          a: 'Porque con esa cantidad de agua el volumen a inyectar pasa del tope de tu jeringa. La salida es una jeringa más grande o repartir la dosis en dos aplicaciones. No le muevas al agua del vial que ya reconstituiste.',
        },
        {
          q: 'Se hizo espuma al mezclar. ¿Sirve?',
          a: 'La espuma es señal de que se agitó de más. Déjalo reposar en el refrigerador hasta que se asiente. Si el líquido queda turbio o con partículas después de reposar, ese vial ya no se usa.',
        },
        {
          q: '¿Cuántas dosis me rinde un vial?',
          a: 'Depende de tu dosis y de nada más: el agua no cambia esa cuenta. La calculadora te lo dice junto con las rayitas.',
        },
      ],
    },
    {
      type: 'cards',
      title: 'Sigue por aquí',
      items: [
        { to: '/calculadora', title: 'Calculadora de reconstitución', body: 'Tu vial, tu agua y tu dosis: cuántas rayitas jalar.', cta: 'Abrir calculadora' },
        { to: '/producto/agua-bacteriostatica', title: 'Agua bacteriostática', body: 'La que necesitas para reconstituir.', cta: 'Ver producto' },
        { to: '/aprende/conservacion', title: 'Conservación y estabilidad', body: 'Temperaturas, tiempos y errores que degradan el material.', cta: 'Leer la guía' },
        { to: '/info/calidad', title: 'Calidad y trazabilidad', body: 'Qué se le hace a cada lote antes de llegar a tu mesa.', cta: 'Ver el proceso' },
      ],
    },
  ],
  related: [
    { to: '/calculadora', title: 'Calculadora de reconstitución', desc: 'Convierte tu dosis en rayitas de jeringa.' },
    { to: '/info/envios', title: 'Envíos y entregas', desc: 'Cómo viaja el material y por qué no necesita cadena de frío.' },
  ],
};

export default page;
