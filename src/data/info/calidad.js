const page = {
  slug: 'calidad',
  title: 'Calidad y trazabilidad',
  subtitle:
    'Qué se le hace a cada lote antes de que llegue a tu mesa de trabajo: identidad, pureza, condiciones de llenado y el número de lote que amarra todo eso a tu vial.',
  badge: 'Control de calidad',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'info',
      title: 'El resumen honesto',
      body:
        'Cada lote se analiza por HPLC para pureza y por espectrometría de masas para confirmar identidad. La pureza típica de nuestro catálogo es ≥99%. Cada vial lleva impreso su número de lote y el análisis de ese lote está disponible a solicitud, escribiendo a hola@exygenlabs.com con el número que aparece en tu etiqueta.',
    },
    {
      type: 'prose',
      title: 'Por qué la pureza es la única cifra que importa de verdad',
      paragraphs: [
        'En un péptido de investigación, "pureza" significa qué proporción del material del vial es realmente el péptido que dice la etiqueta y no otra cosa. Ese "otra cosa" no es relleno inerte: son subproductos de la síntesis, cadenas truncadas a las que les falta un aminoácido, sales residuales del proceso y agua absorbida.',
        'Importa porque las impurezas no son neutras. Una cadena truncada tiene una masa parecida y a veces se comporta parecido, pero no es el mismo compuesto, y en un experimento se convierte en una variable que no controlas ni sabes que existe. Si dos lotes tienen purezas distintas, dos réplicas del mismo experimento pueden no dar lo mismo, y la explicación no está en tu protocolo sino en el vial.',
        'Por eso publicamos el dato y por eso lo verificamos lote por lote. Un proveedor que anuncia una pureza fija para todo su catálogo, sin números por lote, está anunciando una aspiración comercial, no un resultado analítico.',
      ],
    },
    {
      type: 'steps',
      title: 'Qué se le hace a cada lote',
      intro:
        'Ningún lote entra a inventario sin pasar por estos pasos. Si uno falla, el lote se rechaza completo: no se separa lo bueno de lo malo.',
      items: [
        {
          title: 'Identidad por espectrometría de masas',
          body:
            'Antes que la pureza se confirma la identidad: se mide la masa molecular del compuesto y se compara con la masa teórica de la secuencia. Si no coinciden dentro de la tolerancia del método, el material no es lo que debería y el lote se detiene ahí.',
        },
        {
          title: 'Pureza por HPLC en fase reversa',
          body:
            'La cromatografía líquida de alta resolución separa los componentes de la muestra y los cuantifica. El resultado es un cromatograma donde el péptido correcto es un pico principal y cada impureza es un pico menor. La pureza es el área del pico principal como porcentaje del área total.',
          note: 'Es el mismo principio con el que se controla la calidad de un principio activo farmacéutico.',
        },
        {
          title: 'Aspecto y llenado',
          body:
            'Se revisa que la torta de liofilizado tenga el aspecto esperado —blanca o casi blanca, uniforme, sin colapso ni signos de humedad— y que el llenado por vial esté dentro de la tolerancia declarada en miligramos.',
        },
        {
          title: 'Sellado e integridad',
          body:
            'Se verifica el sello del tapón y el engargolado de aluminio. Un vial que no cierre herméticamente deja entrar humedad, y la humedad es lo único que degrada de verdad un liofilizado bien guardado.',
        },
        {
          title: 'Etiquetado y asignación de lote',
          body:
            'Se imprime la etiqueta con el compuesto, la presentación en mg, el aviso de uso exclusivo en investigación y el número de lote. Ese número es la llave: con él recuperamos el análisis completo de tu vial en particular.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Cómo leer un análisis',
      intro:
        'Cuando pidas el análisis de tu lote vas a ver estos campos. Esto es lo que significa cada uno y qué deberías esperar.',
      columns: ['Campo', 'Qué significa', 'Qué esperar'],
      rows: [
        ['Compuesto y secuencia', 'El nombre y la cadena de aminoácidos analizada.', 'Debe coincidir exactamente con lo que compraste.'],
        ['Número de lote', 'El identificador del batch de producción.', 'El mismo que está impreso en tu vial.'],
        ['Pureza (HPLC)', 'Porcentaje del área del pico principal.', 'Típicamente ≥99% en nuestro catálogo.'],
        ['Masa observada vs. teórica', 'Confirmación de identidad por MS.', 'Diferencia mínima, dentro de la tolerancia del método.'],
        ['Aspecto', 'Inspección visual del liofilizado.', 'Polvo o torta blanca o casi blanca.'],
        ['Fecha de análisis', 'Cuándo se corrió la prueba.', 'Cercana a la fecha de producción del lote.'],
      ],
      note:
        'Si algún campo del análisis que recibes no coincide con tu vial —sobre todo el número de lote— avísanos de inmediato: es justo el tipo de cosa que queremos detectar.',
    },
    {
      type: 'list',
      title: 'Cómo pedir el análisis de tu lote',
      intro: 'Es directo y no tiene costo.',
      items: [
        'Busca el número de lote impreso en la etiqueta de tu vial.',
        'Escribe a hola@exygenlabs.com con ese número, o mándalo por WhatsApp. Una foto legible de la etiqueta también funciona.',
        'Te respondemos con el análisis correspondiente a ese lote, no con un documento genérico del compuesto.',
        'Si compraste varios viales del mismo compuesto en distintos momentos, verifica el lote de cada uno: pueden ser diferentes.',
      ],
    },
    {
      type: 'prose',
      title: 'Trazabilidad: qué significa en la práctica',
      paragraphs: [
        'Trazabilidad es poder responder, para un vial concreto que tienes en la mano, de qué lote de síntesis salió, cuándo se llenó, qué resultados analíticos dio ese lote y en qué pedido se despachó. No es un adjetivo de marketing: es una cadena de registros que se puede reconstruir hacia atrás.',
        'En nuestro caso, esa cadena se ancla en el número de lote impreso en tu etiqueta. Con él podemos ir del vial al análisis, y del análisis al inventario y al pedido. Por eso insistimos tanto en que la etiqueta sea legible y en que nos avises si llega borrosa o ilegible: un vial sin lote identificable pierde justamente lo que lo hace confiable.',
        'También significa que si alguna vez detectáramos un problema en un lote, sabríamos exactamente a qué pedidos avisar. Ese es el verdadero valor de la trazabilidad, y solo funciona si se construye antes de necesitarla.',
      ],
    },
    {
      type: 'list',
      title: 'Conservación: nuestra parte y la tuya',
      intro:
        'La calidad que verificamos en el laboratorio se sostiene o se pierde según cómo se guarde el material después. Esto es lo que aplica en cada tramo.',
      items: [
        'En nuestro inventario: los viales liofilizados se mantienen sellados, en frío y protegidos de la luz hasta el despacho.',
        'Durante el envío: el liofilizado tolera bien la temperatura ambiente durante los días de tránsito. No requiere hielo ni cadena de frío, y eso es una propiedad del formato, no un ahorro nuestro.',
        'Al recibirlo: guárdalo cuanto antes. Sellado y en refrigeración, un liofilizado se mantiene estable durante meses; en congelación, considerablemente más.',
        'Ya reconstituido: el reloj cambia por completo. En solución, la estabilidad se mide en semanas y siempre en refrigeración, protegido de la luz y sin ciclos repetidos de congelado y descongelado.',
        { text: 'Lo que más daña un vial no es el tiempo: es la humedad, el calor y abrirlo y cerrarlo muchas veces.', bad: false },
      ],
    },
    {
      type: 'table',
      title: 'Temperaturas y tiempos de conservación',
      intro:
        'Publicamos cifras concretas porque casi nadie en este mercado lo hace, y sin números "consérvese en frío" no significa nada. Son valores de referencia para material bien sellado y protegido de la luz.',
      columns: ['Estado del material', 'Temperatura', 'Tiempo de referencia'],
      rows: [
        ['Liofilizado sellado, uso inmediato', 'Ambiente, seco y oscuro', 'Semanas; no es para guardarlo así'],
        ['Liofilizado sellado, refrigerado', '2 a 8 °C', 'Meses'],
        ['Liofilizado sellado, congelado', '−20 °C', 'De varios meses a más de un año'],
        ['Liofilizado, congelación profunda', '−80 °C', 'El escenario más estable de todos'],
        ['Reconstituido en agua bacteriostática', '2 a 8 °C', 'Del orden de 28 días'],
        ['Reconstituido en agua estéril sin conservador', '2 a 8 °C', 'Días, y para un solo uso'],
      ],
      note:
        'Nunca congeles material ya reconstituido: cada ciclo de congelado y descongelado destruye una fracción apreciable del péptido. Señales de deterioro en el polvo: color amarillento o pardo, apelmazamiento o humedad visible.',
    },
    {
      type: 'prose',
      title: 'Lo que no afirmamos',
      paragraphs: [
        'Somos deliberadamente cuidadosos con el lenguaje, porque en este mercado abunda lo contrario. No decimos que nuestros productos sean grado farmacéutico: eso implica un marco regulatorio y de manufactura que corresponde a medicamentos, no a reactivos de investigación.',
        'No afirmamos que sean estériles ni aptos para uso en humanos o animales, porque no lo son ni se producen para eso. No hacemos ninguna afirmación clínica ni terapéutica sobre ningún compuesto del catálogo.',
        'Y tampoco prometemos que una pureza alta garantice un resultado experimental. La pureza dice qué hay en el vial; lo que ocurra en tu experimento depende de tu diseño, tu modelo y tu método. Vendemos material verificado, no conclusiones.',
      ],
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes de calidad',
      items: [
        {
          q: '¿Por qué el análisis se envía a solicitud y no está publicado?',
          a: 'Porque el documento útil es el de tu lote, no uno genérico. Publicar un solo archivo por producto sería cómodo pero engañoso: dejaría de corresponder al vial que tienes en cuanto entrara un lote nuevo. Pedirlo con tu número de lote toma un minuto y garantiza que lo que recibes es el análisis de tu material.',
        },
        {
          q: '¿Qué significa exactamente "≥99% de pureza"?',
          a: 'Que en el cromatograma de HPLC, el pico correspondiente al péptido representa 99% o más del área total detectada. El resto, menos del 1%, son impurezas del proceso. Hay una guía completa sobre esto en la sección de aprendizaje.',
        },
        {
          q: '¿Todos los productos tienen la misma pureza?',
          a: 'No, y desconfía de quien diga que sí. La pureza alcanzable depende de la longitud y la complejidad de la secuencia: un péptido corto es más fácil de sintetizar limpio que uno largo. Por eso el dato va por lote y por producto, no como una promesa única de catálogo.',
        },
        {
          q: '¿Puedo mandar a analizar el material por mi cuenta?',
          a: 'Por supuesto, y nos parece perfectamente razonable. Si el resultado de tu análisis independiente difiere de lo que reportamos para ese lote, compártenoslo con el número de lote: lo revisamos en serio y, si el material está fuera de especificación, lo reponemos o reembolsamos.',
        },
        {
          q: '¿Qué pasa si un lote no pasa el control?',
          a: 'No entra a inventario y no se vende. No se reetiqueta con una pureza menor ni se ofrece con descuento: se rechaza completo.',
        },
        {
          q: '¿Cuánto dura un vial sin abrir?',
          a: 'Un liofilizado sellado y bien guardado se mantiene estable durante un periodo largo, medido en meses o años según el compuesto y la temperatura de almacenamiento. La guía de conservación tiene el detalle por escenario.',
        },
        {
          q: '¿La cantidad en mg de la etiqueta es exacta?',
          a: 'Está dentro de la tolerancia de llenado declarada para esa presentación. Si tu trabajo requiere precisión gravimétrica mayor, lo correcto es pesar el contenido en tu propia balanza analítica antes de reconstituir.',
        },
      ],
    },
    {
      type: 'cards',
      title: 'Profundiza en el tema',
      intro: 'Estas guías explican con calma lo que aquí queda resumido:',
      items: [
        { to: '/aprende/que-significa-99-por-ciento', title: 'Qué significa 99% de pureza', body: 'Cómo se lee un cromatograma y por qué el número importa.', cta: 'Leer la guía' },
        { to: '/aprende/como-verificamos-cada-lote', title: 'Cómo verificamos cada lote', body: 'El control de calidad explicado paso a paso.', cta: 'Leer la guía' },
        { to: '/aprende/conservacion', title: 'Conservación y estabilidad', body: 'Temperaturas, tiempos y los errores que degradan el material.', cta: 'Leer la guía' },
        { to: '/compuestos', title: 'Fichas de compuestos', body: 'Ficha técnica de cada compuesto del catálogo.', cta: 'Ver fichas' },
      ],
    },
  ],
  related: [
    { to: '/info/envios', title: 'Envíos y entregas', desc: 'Cómo viaja el material y por qué no necesita cadena de frío.' },
    { to: '/info/devoluciones', title: 'Devoluciones e incidencias', desc: 'Qué hacer si un lote no corresponde a lo que se publicó.' },
  ],
};

export default page;
