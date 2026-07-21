const page = {
  slug: 'devoluciones',
  title: 'Devoluciones e incidencias',
  subtitle:
    'Qué cubrimos cuando algo sale mal con tu pedido, cuánto tiempo tienes para reportarlo, qué evidencia necesitamos y por qué las ventas de material de investigación son finales.',
  badge: 'Políticas',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'warn',
      title: 'La regla general: las ventas son finales',
      body:
        'Por la naturaleza del producto no aceptamos devoluciones por arrepentimiento ni cambios de opinión. Sí respondemos, y sin discutir, cuando el error es nuestro o el paquete llegó dañado: en esos casos reponemos o reembolsamos.',
    },
    {
      type: 'prose',
      title: 'Por qué no hay devoluciones por arrepentimiento',
      paragraphs: [
        'No es una política comercial arbitraria: es una condición del tipo de material. Un vial de péptido liofilizado es un reactivo de investigación cuya integridad depende por completo de cómo se manejó desde que salió de nuestro control. Una vez que el paquete se entregó, no tenemos manera de verificar a qué temperatura estuvo, si el sello se comprometió, si el vial se abrió o si se reconstituyó.',
        'Reingresar a inventario material que estuvo fuera de nuestra custodia y revenderlo a otro cliente sería, sencillamente, deshonesto. Nadie que compre pureza verificada por HPLC quiere recibir un vial que ya viajó dos veces y estuvo un tiempo indeterminado en condiciones desconocidas.',
        'Por eso la trazabilidad se corta en la entrega, y por eso ponemos tanto cuidado en que elijas bien antes de comprar: el catálogo indica presentación en mg y pureza, la calculadora te ayuda a dimensionar cuánto necesitas y el asesor arma un plan con las cantidades del ciclo completo. Si tienes dudas antes de pagar, pregúntanos: ese es el momento.',
      ],
    },
    {
      type: 'list',
      title: 'Qué sí cubrimos',
      intro:
        'En estos casos la solución corre por nuestra cuenta, sin costo para ti y sin que tengas que devolver nada por paquetería en la mayoría de los casos.',
      items: [
        'Producto equivocado: recibiste un compuesto o una presentación en mg distinta de la que compraste.',
        'Pedido incompleto: falta uno o más viales respecto de lo que dice tu confirmación.',
        'Daño en tránsito: viales rotos, fisurados, con el tapón comprometido o con el sello violado.',
        'Vial visiblemente comprometido al abrir: sin la torta de liofilizado esperada, con humedad evidente o con material fuera de especificación.',
        'Etiqueta ilegible o sin número de lote, que impide la trazabilidad del material.',
        'Paquete extraviado por la paquetería, confirmado tras la investigación formal con el transportista.',
      ],
    },
    {
      type: 'list',
      title: 'Qué no cubrimos',
      intro: 'Para que no haya sorpresas, esto es lo que queda fuera:',
      items: [
        { text: 'Cambio de opinión, pedido duplicado por error del cliente o "ya no lo necesito".', bad: true },
        { text: 'Viales ya abiertos, reconstituidos o manipulados, salvo que el defecto fuera evidente al abrir y se haya reportado de inmediato.', bad: true },
        { text: 'Material mal conservado después de la entrega: dejado a temperatura ambiente por días, expuesto al sol o al calor.', bad: true },
        { text: 'Resultados experimentales que no cumplieron tus expectativas. Vendemos el compuesto con su pureza verificada, no un resultado.', bad: true },
        { text: 'Entregas fallidas por dirección incorrecta o incompleta, o por ausencia repetida en el domicilio.', bad: true },
        { text: 'Reportes hechos fuera del plazo de 48 horas desde la entrega registrada por la paquetería.', bad: true },
      ],
    },
    {
      type: 'table',
      title: 'Cuánto tiempo tienes para reportar',
      intro:
        'El plazo corre desde que la paquetería registra la entrega en el rastreo, no desde que tú abres la caja. El de daño es corto por una razón práctica: las reclamaciones ante las paqueterías tienen ventanas que se cierran, y si se nos pasan a nosotros, se nos cierra la puerta también.',
      columns: ['Situación', 'Plazo para reportar', 'Por qué ese plazo'],
      rows: [
        ['Daño en tránsito', '48 horas desde la entrega', 'Es la ventana de reclamación ante la paquetería.'],
        ['Producto equivocado o incompleto', '7 días naturales', 'El error es nuestro y se verifica contra tu pedido.'],
        ['Material fuera de especificación', 'Sin límite', 'Si el análisis del lote no corresponde, respondemos siempre.'],
        ['Paquete sin movimientos', 'Cuando pasen 3 días hábiles sin escaneo', 'Antes de eso suele ser tránsito normal.'],
      ],
      note: 'Revisa tu paquete el mismo día que llegue: es lo único que garantiza que ningún plazo se te venza.',
    },
    {
      type: 'steps',
      title: 'Cómo reportar una incidencia',
      intro:
        'Entre mejor sea la evidencia de la primera vez, más rápido se resuelve. Con el paquete bien documentado, la mayoría de los casos se cierra en menos de 24 horas hábiles.',
      items: [
        {
          title: 'No tires nada',
          body:
            'Conserva la caja exterior, el material de relleno, la guía pegada y los viales tal como llegaron, incluso los rotos. Es la evidencia que pide la paquetería y sin ella una reclamación por daño no procede.',
        },
        {
          title: 'Toma fotos antes de mover nada',
          body:
            'Necesitamos cuatro tomas: la caja cerrada con la etiqueta de la guía visible y legible; la caja abierta con el contenido en su posición; los viales sobre una superficie plana; y un acercamiento nítido al daño o a la etiqueta con el número de lote.',
          note: 'Con buena luz y sin filtros. Una foto borrosa nos hace pedirte otra y todo se retrasa un día.',
        },
        {
          title: 'Escríbenos dentro de las 48 horas',
          body:
            'Manda todo a hola@exygenlabs.com, o por WhatsApp si te resulta más rápido. Incluye tu número de pedido (formato EX-AAAAMMDD-1234), qué pasó en dos líneas y las fotos adjuntas.',
        },
        {
          title: 'Revisamos y te respondemos',
          body:
            'Contestamos en un máximo de 24 horas hábiles. Si el caso requiere reclamación ante la paquetería, la levantamos nosotros: tú no tienes que hablar con ellos ni llenar sus formatos.',
        },
        {
          title: 'Resolvemos',
          body:
            'Según el caso: reposición del material sin costo con envío pagado por nosotros, o reembolso al método de pago original. Tú eliges cuando ambas opciones son viables.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Tiempos de resolución',
      intro: 'Días hábiles, contados desde que recibimos tu reporte completo con evidencia.',
      columns: ['Situación', 'Resolución', 'Tiempo'],
      rows: [
        ['Producto equivocado o incompleto', 'Enviamos lo faltante o correcto', '1 a 2 días para despachar'],
        ['Daño visible en tránsito', 'Reposición o reembolso', '1 a 3 días una vez validadas las fotos'],
        ['Paquete extraviado', 'Reposición o reembolso al cerrar la investigación', 'Hasta 10 días hábiles'],
        ['Reembolso a tarjeta', 'Devolución al mismo plástico', '5 a 10 días hábiles según el banco'],
        ['Reembolso por SPEI', 'Transferencia a la cuenta que nos indiques', '1 a 3 días hábiles'],
      ],
      note:
        'El tiempo que tarda el banco en reflejar un reembolso no depende de nosotros: nuestra parte se ejecuta el mismo día que se aprueba el caso.',
    },
    {
      type: 'prose',
      title: 'Cancelaciones antes del envío',
      paragraphs: [
        'Si cambias de opinión y el pedido todavía no tiene guía generada, escríbenos: lo cancelamos y te reembolsamos completo, sin preguntas y sin penalización.',
        'Una vez que la guía existe, el pedido ya salió de nuestras manos y aplica la política de ventas finales. Por eso conviene avisar cuanto antes: entre el pago y la generación de la guía suele haber solo unas horas.',
        'Si necesitas modificar tu pedido (agregar un producto, cambiar una presentación), también se hace antes de la guía. Lo más práctico es escribirnos en lugar de cancelar y volver a comprar, porque así no pierdes el descuento por volumen si ya lo habías alcanzado.',
      ],
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes de devoluciones',
      items: [
        {
          q: 'Compré la presentación equivocada, ¿me la cambian?',
          a: 'Si el vial sigue sellado y nos escribes pronto, revisamos el caso: no está garantizado, pero tampoco lo negamos de entrada. Si el pedido todavía no sale, el cambio es sencillo. Ya entregado y con el vial sellado, evaluamos caso por caso; si ya se abrió, no es posible.',
        },
        {
          q: '¿Quién paga el envío de una reposición?',
          a: 'Nosotros, íntegro, cuando el error fue nuestro o hubo daño en tránsito. Nunca te cobramos por resolver algo que no causaste.',
        },
        {
          q: '¿Tengo que devolver el vial dañado?',
          a: 'Normalmente no: con las fotos basta. En casos donde la paquetería exige inspección física te mandamos una guía prepagada para que lo devuelvas sin costo. Nunca te pedimos pagar un envío de retorno.',
        },
        {
          q: '¿Cobran cargo por reposición o restocking?',
          a: 'No. No cobramos cargos por reposición ni por reingreso a inventario en ningún caso que cubramos.',
        },
        {
          q: 'Reporté al tercer día, ¿ya no hay nada que hacer?',
          a: 'Escríbenos de todos modos. El plazo de 48 horas es el compromiso que sí podemos garantizar porque es lo que nos permite la ventana de reclamación de la paquetería; fuera de él revisamos con lo que haya, aunque nuestro margen de maniobra se reduce mucho.',
        },
        {
          q: 'El análisis del lote no me convence, ¿puedo devolverlo?',
          a: 'Si tienes una duda técnica sobre un lote, escríbenos con el número de lote antes que nada: te compartimos el análisis correspondiente y lo revisamos contigo. Si el material efectivamente está fuera de la especificación que publicamos, lo reponemos o reembolsamos, sin importar el plazo.',
        },
        {
          q: 'Mandé a analizar el material por mi cuenta y no coincide, ¿qué hago?',
          a: 'Compártenos el reporte junto con el número de lote de tu vial. Lo revisamos en serio y lo contrastamos con nuestro análisis del mismo lote. Si tu resultado se confirma, reponemos o reembolsamos sin plazo de por medio, y revisamos el lote completo. Un análisis independiente es una señal que nos sirve, no una molestia.',
        },
        {
          q: 'El vial se ve casi vacío, ¿me faltó producto?',
          a: 'Casi siempre no. Unos pocos miligramos de polvo liofilizado ocupan muy poco volumen y suelen quedar como una película delgada, casi transparente, pegada al fondo o a la pared del vial. Con el vial en contraluz normalmente se alcanza a ver. Si de plano no ves nada de material, mándanos una foto con buena luz y lo revisamos.',
        },
        {
          q: '¿Puedo devolver algo que compré con descuento de distribuidor?',
          a: 'Aplican exactamente las mismas reglas. El reembolso se calcula sobre lo que pagaste efectivamente, ya con el descuento aplicado.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Antes de comprar, pregunta',
      body:
        'Si dudas entre dos presentaciones o no sabes cuánto material necesitas para tu protocolo, escríbenos por WhatsApp o usa el asesor: te arma un plan con las cantidades del ciclo completo. Resolver la duda antes de pagar es gratis; después, la política de ventas finales ya aplica.',
    },
  ],
  related: [
    { to: '/info/envios', title: 'Envíos y entregas', desc: 'Tiempos, rastreo, hora de corte y qué hacer si nadie recibe.' },
    { to: '/info/calidad', title: 'Calidad y trazabilidad', desc: 'Cómo verificamos cada lote y cómo pedir su análisis.' },
  ],
};

export default page;
