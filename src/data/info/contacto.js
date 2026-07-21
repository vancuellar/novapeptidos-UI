const WHATSAPP = 'https://wa.me/5219944946889';

const page = {
  slug: 'contacto',
  title: 'Contacto',
  subtitle:
    'Por dónde escribirnos según lo que necesites, en cuánto contestamos y qué información conviene tener a la mano para resolverlo en un solo mensaje.',
  badge: 'Estamos disponibles',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'cards',
      title: 'Elige el canal',
      intro: 'Todos llegan a las mismas personas. Lo que cambia es la velocidad y el tipo de asunto que resuelve mejor cada uno.',
      items: [
        {
          href: WHATSAPP,
          title: 'WhatsApp',
          body: 'El canal más rápido. Ideal para dudas antes de comprar, estado de un pedido o mandar fotos de una incidencia.',
          cta: 'Abrir WhatsApp',
        },
        {
          href: 'mailto:hola@exygenlabs.com',
          title: 'Correo — hola@exygenlabs.com',
          body: 'Para facturación, temas de mayoreo, análisis de lote y todo lo que convenga tener por escrito.',
          cta: 'Escribir correo',
        },
        {
          to: '/cuenta',
          title: 'Mi cuenta',
          body: 'Consulta el estado de tus pedidos, tu guía de rastreo y tu historial sin escribirle a nadie.',
          cta: 'Entrar a mi cuenta',
        },
        {
          to: '/asesor',
          title: 'Asesor de péptidos',
          body: 'Si tu duda es qué comprar y en qué cantidad, el asesor arma un plan completo en tres pasos.',
          cta: 'Armar mi plan',
        },
      ],
    },
    {
      type: 'table',
      title: 'Horarios y tiempos de respuesta',
      intro: 'Horario del centro de México. Fuera de estos horarios los mensajes se contestan al siguiente día hábil.',
      columns: ['Canal', 'Horario de atención', 'Respuesta típica'],
      rows: [
        ['WhatsApp', 'Lunes a viernes, 9:00 am – 6:00 pm', 'Menos de 2 horas hábiles'],
        ['Correo', 'Lunes a viernes, 9:00 am – 6:00 pm', 'Mismo día hábil, máximo 24 horas'],
        ['Incidencias de envío', 'Lunes a viernes', 'Prioridad: primeras 24 horas hábiles'],
        ['Mayoreo y distribución', 'Lunes a viernes', '1 a 2 días hábiles'],
      ],
      note:
        'Sábados, domingos y días festivos oficiales no hay atención. Un mensaje del sábado se atiende el lunes por la mañana.',
    },
    {
      type: 'list',
      title: 'Qué incluir en tu mensaje',
      intro:
        'No es burocracia: con estos datos resolvemos en un mensaje lo que de otro modo toma tres idas y vueltas.',
      items: [
        'Tu número de pedido, con formato EX-AAAAMMDD-1234, si tu duda es sobre una compra.',
        'El número de lote impreso en el vial, si preguntas por un análisis o por el material.',
        'Fotos claras y sin filtros, si reportas un daño o algo que no corresponde.',
        'El compuesto y la presentación en mg exactos de los que hablas: muchos productos tienen varias presentaciones.',
        'Tus datos fiscales completos (RFC, razón social, régimen, uso de CFDI y código postal), si pides factura.',
      ],
    },
    {
      type: 'prose',
      title: 'Mayoreo, distribución y volumen',
      paragraphs: [
        'Si compras para un laboratorio, una universidad o un proyecto con consumo recurrente, escríbenos a hola@exygenlabs.com con el asunto "Mayoreo". Cuéntanos qué compuestos, qué presentaciones y qué volumen mensual aproximado manejas.',
        'Tenemos un programa de distribuidores con código de referido y comisión configurable, además de descuentos automáticos por volumen que se aplican solos en el carrito, sin código. Si tu operación es recurrente, casi siempre hay una estructura mejor que comprar al menudeo.',
        'Para cotizaciones formales, órdenes de compra institucionales o requisitos de proveedor, indícalo en tu correo y te mandamos lo necesario.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Lo que no podemos responder',
      body:
        'No damos dosis, protocolos de administración, indicaciones médicas ni consejo clínico de ningún tipo, ni por WhatsApp ni por correo. Todos nuestros productos son de uso exclusivo en investigación y no son para consumo humano ni animal. Si tu pregunta es de salud, la respuesta correcta es un profesional médico, no nosotros.',
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes de contacto',
      items: [
        {
          q: 'Escribí y no me han contestado, ¿qué hago?',
          a: 'Revisa primero la carpeta de correo no deseado: nuestras respuestas salen de hola@exygenlabs.com y a veces caen ahí. Si escribiste fuera de horario, la respuesta llega el siguiente día hábil. Si ya pasaron más de 24 horas hábiles, insiste por WhatsApp con tu número de pedido; es el canal más rápido.',
        },
        {
          q: '¿Tienen tienda física para recoger?',
          a: 'No. Operamos solo en línea y despachamos por paquetería a todo el país. Si necesitas recibir en un domicilio distinto al tuyo, puedes poner una dirección laboral al comprar.',
        },
        {
          q: '¿Atienden por teléfono?',
          a: 'Preferimos WhatsApp, y no es por evasión: deja constancia escrita de lo acordado, permite mandar fotos y evita que se pierda el hilo de un caso entre llamadas. Para asuntos que de verdad requieran llamada, escríbenos y la coordinamos.',
        },
        {
          q: '¿Puedo pedir asesoría técnica sobre manejo del material?',
          a: 'Sí, en lo que toca al manejo de laboratorio: reconstitución, diluyentes, conservación, estabilidad y cálculos de concentración. Todo eso está además documentado en la sección de aprendizaje y en la calculadora.',
        },
        {
          q: '¿Hablan inglés?',
          a: 'Sí. Puedes escribirnos en español o en inglés; el sitio también está disponible en inglés y portugués.',
        },
      ],
    },
  ],
  related: [
    { to: '/info/envios', title: 'Envíos y entregas', desc: 'Antes de preguntar por tu paquete, revisa tiempos y rastreo.' },
    { to: '/aprende/preguntas-frecuentes', title: 'Preguntas frecuentes', desc: 'Las 47 dudas más comunes, ya respondidas.' },
  ],
};

export default page;
