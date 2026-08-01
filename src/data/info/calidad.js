const page = {
  slug: 'calidad',
  title: 'Calidad y trazabilidad',
  subtitle:
    'Qué se le hace a cada lote antes de que llegue a tu mesa de trabajo: identidad, pureza, condiciones de llenado y el registro de lote que amarra todo eso a tu pedido.',
  badge: 'Control de calidad',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'info',
      title: 'El resumen honesto',
      body:
        'Cada lote se analiza por HPLC para pureza y por espectrometría de masas para confirmar identidad. La pureza típica de nuestro catálogo es ≥99%. Cada lote queda registrado con su propio análisis, y después de tu compra te entregamos en digital el certificado del lote que te corresponde, sin que tengas que pedirlo.',
    },
    // El origen va ARRIBA de todo lo analítico, y a propósito. Certified dedica su
    // página de pruebas de laboratorio a repetir que su material es de Estados
    // Unidos, y quien compara las dos páginas se llevaba la impresión de que
    // nosotros lo escondíamos. Aquí se dice lo que sí es cierto y comprobable:
    // dónde se FABRICAN los péptidos (laboratorios de Estados Unidos, orden de
    // Christian 2026-07-28) y desde dónde se despachan. Nada de fábrica PROPIA,
    // domicilio en EUA, aprobación FDA ni certificaciones que no tenemos.
    // ⛔ Y nunca se menciona Asia, en ningún idioma — orden expresa de Christian.
    {
      type: 'prose',
      title: 'De dónde sale el material',
      paragraphs: [
        'Nuestros péptidos se fabrican en laboratorios de Estados Unidos. Es el punto de partida de todo lo que sigue en esta página: un control de calidad solo vale lo que vale el material que entra a control, y por eso decimos de dónde viene antes de contar qué se le hace.',
        'Ese abastecimiento estadounidense no nos exime de nada. Cada lote pasa igual por identidad por espectrometría de masas y pureza por HPLC, y ninguno entra a inventario por el mero hecho de su procedencia. El certificado que recibes es el de tu lote, no el del proveedor.',
        'Lo que no vas a leer aquí: que la planta o el laboratorio sean nuestros, que tengamos domicilio en Estados Unidos, ni que algo de esto esté aprobado por la FDA. No lo es y no lo decimos. Somos una operación mexicana que vende péptidos fabricados en laboratorios de Estados Unidos, los verifica y los despacha dentro de México.',
      ],
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
            'Se imprime la etiqueta con el compuesto, la presentación en mg y el aviso de uso exclusivo en investigación. El número de lote se asigna en ese momento y queda registrado en sistema, amarrado al pedido que se surta con ese material: esa es la llave con la que recuperamos el análisis completo de tu vial en particular.',
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
        ['Número de lote', 'El identificador del batch de producción.', 'El del lote que te tocó según tu compra.'],
        ['Pureza (HPLC)', 'Porcentaje del área del pico principal.', 'Típicamente ≥99% en nuestro catálogo.'],
        ['Masa observada vs. teórica', 'Confirmación de identidad por MS.', 'Diferencia mínima, dentro de la tolerancia del método.'],
        ['Aspecto', 'Inspección visual del liofilizado.', 'Polvo o torta blanca o casi blanca.'],
        ['Fecha de análisis', 'Cuándo se corrió la prueba.', 'Cercana a la fecha de producción del lote.'],
      ],
      note:
        'Si algún campo del análisis que recibes no coincide con lo que pediste —sobre todo el compuesto y la presentación— avísanos de inmediato: es justo el tipo de cosa que queremos detectar.',
    },
    {
      type: 'prose',
      title: 'Cómo accedes al certificado de tu lote',
      paragraphs: [
        'Nuestros clientes reciben acceso al certificado de análisis del lote específico que les corresponde según su compra. No es un documento genérico del compuesto: es el análisis del material que está en tu vial.',
        'Te lo entregamos en digital en cuanto tu pedido queda confirmado: no tienes que pedirlo ni identificar nada por tu cuenta. Los distribuidores reciben igual los certificados de los productos que manejan.',
        'Publicamos además un certificado de muestra abierto, para que cualquiera pueda ver el formato y el nivel de detalle antes de comprar. Y si necesitas otra copia del tuyo, escríbenos a hola@exygenlabs.com con tu número de pedido y te la mandamos.',
        'Si compraste el mismo compuesto en momentos distintos, revisa el certificado de cada pedido: pueden ser lotes diferentes, y cada lote tiene su propio análisis.',
      ],
    },
    {
      type: 'prose',
      title: 'Trazabilidad: qué significa en la práctica',
      paragraphs: [
        'Trazabilidad es poder responder, para un vial concreto que tienes en la mano, de qué lote de síntesis salió, cuándo se llenó, qué resultados analíticos dio ese lote y en qué pedido se despachó. No es un adjetivo de marketing: es una cadena de registros que se puede reconstruir hacia atrás.',
        'En nuestro caso, esa cadena se ancla en el número de lote que registramos al recibir el material y que queda amarrado a tu pedido. Con él vamos del análisis al inventario y del inventario a tu compra, y de tu compra de regreso al lote que te tocó. Por eso el certificado que te entregamos va ligado a tu pedido: es lo que hace que el documento corresponda a tu material y no a otro.',
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
          q: '¿Por qué no están todos los certificados publicados en abierto?',
          a: 'Porque el documento que te sirve es el de tu lote, no uno cualquiera. Publicar un archivo por producto sería cómodo pero engañoso: dejaría de corresponder al vial que tienes en cuanto entrara un lote nuevo. Por eso cada cliente ve, en su cuenta, el certificado del lote que compró, y dejamos uno de muestra abierto para que se pueda revisar el formato antes de comprar.',
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
          a: 'Por supuesto, y nos parece perfectamente razonable. Si el resultado de tu análisis independiente difiere de lo que reportamos para ese lote, compártenoslo con tu número de pedido: lo revisamos en serio y, si el material está fuera de especificación, lo reponemos o reembolsamos.',
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
