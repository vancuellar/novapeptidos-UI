const page = {
  slug: 'rastreo',
  title: 'Estado de mi pedido',
  subtitle:
    'Qué significa cada estado por el que pasa tu compra, dónde consultarlo, cómo rastrear tu guía y qué hacer cuando algo se queda quieto más de lo normal.',
  badge: 'Seguimiento',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'cards',
      title: 'Consulta tu pedido',
      intro: 'Tres formas de saber dónde va, sin esperar a que nadie te conteste.',
      items: [
        { to: '/cuenta', title: 'Desde Mi cuenta', body: 'La vía completa: todos tus pedidos, su estado, la guía y el historial.', cta: 'Entrar a mi cuenta' },
        { to: '/info/contacto', title: 'Preguntándole al asistente', body: 'El chat del sitio consulta tu pedido con tu número EX-AAAAMMDD-1234.', cta: 'Ver canales' },
        { href: 'mailto:hola@exygenlabs.com', title: 'Por correo', body: 'Escríbenos con tu número de pedido si prefieres que lo revisemos nosotros.', cta: 'Escribir correo' },
      ],
    },
    {
      type: 'prose',
      title: 'Tu número de pedido',
      paragraphs: [
        'Cada compra genera un identificador con el formato EX-AAAAMMDD-1234: las siglas de Exygen, la fecha en que se creó y cuatro dígitos únicos. Por ejemplo, EX-20260720-4831 corresponde a un pedido del 20 de julio de 2026.',
        'Lo recibes en pantalla al terminar el checkout y también por correo. Es la referencia para absolutamente todo: consultar el estado, reportar una incidencia, pedir factura o preguntarle al asistente del sitio.',
        'Si lo perdiste, no pasa nada: entra a Mi cuenta con el correo que usaste al comprar y ahí están todos tus pedidos con su número.',
      ],
    },
    {
      type: 'table',
      title: 'Qué significa cada estado',
      intro:
        'Tu pedido avanza por estos estados en orden. El que ves en Mi cuenta es siempre el actual.',
      columns: ['Estado', 'Qué está pasando', 'Qué te toca hacer'],
      rows: [
        ['Pendiente', 'Registramos tu pedido pero el pago aún no se verifica.', 'Si pagaste por SPEI, esperar la confirmación bancaria.'],
        ['Confirmado', 'El pago quedó verificado y el pedido entró a preparación.', 'Nada. Solo esperar la guía.'],
        ['Enviado', 'El paquete salió y ya tiene número de guía.', 'Rastrear con el enlace que te llegó por correo.'],
        ['Entregado', 'La paquetería registró la entrega.', 'Revisar el contenido el mismo día.'],
        ['Cancelado', 'El pedido se canceló y, si hubo cobro, se reembolsó.', 'Nada, salvo que no reconozcas la cancelación.'],
      ],
      note:
        'Con la calculadora completa y el seguimiento de consumo pasa lo mismo: se desbloquean cuando tu pedido llega a confirmado, enviado o entregado.',
    },
    {
      type: 'steps',
      title: 'Cómo rastrear tu envío',
      items: [
        {
          title: 'Espera el correo con la guía',
          body: 'En cuanto generamos la guía te llega un correo automático con el número y el enlace directo de rastreo, ya armado para la paquetería que corresponda.',
        },
        {
          title: 'O búscalo en Mi cuenta',
          body: 'Abre el pedido y ahí aparece el número de guía, copiable, y el enlace de rastreo. Es la misma información que el correo.',
        },
        {
          title: 'Dale unas horas al primer escaneo',
          body: 'Una guía recién creada tarda entre 2 y 6 horas en mostrar movimientos. Que diga "sin información" al principio es completamente normal.',
          note: 'No significa que el paquete no exista: significa que aún no lo escanean en el primer centro de distribución.',
        },
        {
          title: 'Sigue los movimientos',
          body: 'Verás escaneos al entrar y salir de cada centro de distribución. Entre uno y otro pueden pasar 24 o 48 horas sin novedades, sobre todo en fin de semana.',
        },
      ],
    },
    {
      type: 'list',
      title: 'Paqueterías que usamos y su rastreo',
      intro:
        'Asignamos la paquetería según la cobertura de tu código postal. El enlace que te mandamos ya apunta al rastreador correcto, así que no necesitas buscarlo.',
      items: [
        'FedEx, la más frecuente para envío aéreo nacional.',
        'DHL, en zonas donde tiene mejor tiempo de entrega.',
        'Estafeta, con amplia cobertura nacional.',
        'UPS, para ciertos destinos.',
        'Paquete Express y Redpack, fuertes en cobertura regional.',
        'Correos de México, para localidades donde las demás no llegan.',
      ],
    },
    {
      type: 'prose',
      title: 'Cuando el rastreo se queda quieto',
      paragraphs: [
        'Un paquete sin movimientos nuevos por 24 o 48 horas es normal, sobre todo si el periodo incluye un fin de semana o un día festivo. Los escaneos ocurren en puntos concretos de la ruta, no de forma continua, y entre dos centros de distribución lejanos puede haber un día entero de viaje sin registro.',
        'Empieza a ser anormal cuando pasan más de tres días hábiles sin ningún escaneo nuevo, o cuando el rastreo marca un intento de entrega fallido que no reconoces. En esos casos escríbenos con tu número de pedido: levantamos la investigación formal ante la paquetería nosotros, para que tú no tengas que lidiar con sus formatos ni sus tiempos.',
        'Si la investigación concluye que el paquete se extravió, reponemos el material o reembolsamos, a tu elección. El proceso ante la paquetería puede tomar hasta diez días hábiles, pero la resolución contigo no espera a que ellos terminen de pagarnos a nosotros.',
      ],
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes de seguimiento',
      items: [
        {
          q: 'Mi pedido lleva un día en "pendiente", ¿está mal?',
          a: 'Si pagaste con tarjeta, escríbenos: la verificación debería ser casi inmediata. Si pagaste por SPEI, revisa cuándo transferiste: fuera de horario bancario, en fin de semana o en festivo, la confirmación puede tardar hasta el siguiente día hábil. Mandarnos el comprobante acelera todo. Si pagaste con criptomoneda, la confirmación llega sola en cuanto la red acredita el pago.',
        },
        {
          q: 'Dice "enviado" pero el rastreo no muestra nada.',
          a: 'La guía ya existe pero la paquetería aún no hace el primer escaneo. Normalmente aparece en las siguientes 2 a 6 horas, y si se generó al final del día, hasta la mañana siguiente.',
        },
        {
          q: 'Dice "entregado" pero no recibí nada.',
          a: 'Primero pregunta a vecinos, recepción o portería: es lo más común. Revisa también si el rastreo indica que se dejó en una sucursal para recolección. Si nada de eso aplica, escríbenos el mismo día con tu número de pedido para reclamar ante la paquetería mientras la evidencia sigue fresca.',
        },
        {
          q: '¿Puedo ver el estado sin tener cuenta?',
          a: 'Necesitas la cuenta con la que compraste, porque ahí vive tu historial. Si compraste sin registrarte, escríbenos con tu número de pedido y el correo que usaste, y te lo consultamos nosotros.',
        },
        {
          q: '¿Cada cuánto se actualiza el estado?',
          a: 'En tiempo real. El estado cambia en el momento en que ocurre el evento: se verifica el pago, se genera la guía, se registra la entrega. No hay una actualización programada por lotes.',
        },
        {
          q: 'Compré varios productos, ¿llegan juntos?',
          a: 'Sí, normalmente todo va en un solo paquete con una sola guía. Si por disponibilidad tuviéramos que dividir el envío, te avisamos y recibes una guía por cada parte.',
        },
      ],
    },
  ],
  related: [
    { to: '/info/envios', title: 'Envíos y entregas', desc: 'Tiempos por zona, hora de corte y entregas fallidas.' },
    { to: '/info/devoluciones', title: 'Devoluciones e incidencias', desc: 'Si llegó dañado, incompleto o equivocado.' },
  ],
};

export default page;
