const page = {
  slug: 'envios',
  title: 'Envíos y entregas',
  subtitle:
    'Cómo sale tu pedido de nuestro laboratorio, cuánto tarda en llegar, cómo se rastrea y qué hacer cuando algo no sale como debería.',
  badge: 'Logística',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'info',
      title: 'Lo esencial en cinco líneas',
      body:
        'Enviamos a toda la República Mexicana por paquetería aérea. Los pedidos pagados y confirmados antes de las 5:00 pm (hora del centro de México) salen ese mismo día hábil. La entrega tarda de 3 a 5 días hábiles. El número de guía te llega por correo en cuanto se genera. No hacemos envíos internacionales.',
    },
    {
      type: 'steps',
      title: 'Qué pasa desde que pagas hasta que timbran a tu puerta',
      intro:
        'Conocer el recorrido completo evita la mayor parte de las dudas. Cada paso cambia el estado de tu pedido, y ese estado lo puedes consultar cuando quieras desde Mi cuenta.',
      items: [
        {
          title: 'Recibimos tu pedido (estado: pendiente)',
          body:
            'En cuanto terminas el checkout se genera tu número de pedido con el formato EX-AAAAMMDD-1234 y te llega el correo de confirmación. Todavía no preparamos nada: falta verificar el pago.',
          note: 'Guarda ese número: es la referencia para cualquier aclaración.',
        },
        {
          title: 'Verificamos el pago (estado: confirmado)',
          body:
            'Con tarjeta la verificación es prácticamente inmediata. Con SPEI depende de tu banco: las transferencias suelen reflejarse en minutos en horario bancario, pero una transferencia hecha de noche, en fin de semana o en día festivo puede tardar hasta el siguiente día hábil en aparecer.',
          note: 'Si transferiste y no ves el cambio al siguiente día hábil, mándanos el comprobante.',
        },
        {
          title: 'Preparamos y empacamos',
          body:
            'Sacamos los viales de inventario, verificamos que la presentación en mg y el número de lote coincidan con lo que compraste, y los empacamos protegidos contra golpes. El polvo liofilizado es estable a temperatura ambiente durante el tránsito, así que no requiere hielo ni cadena de frío.',
        },
        {
          title: 'Generamos la guía (estado: enviado)',
          body:
            'Al cerrar el paquete se genera la guía de la paquetería y el sistema te manda un correo automático con el número y el enlace directo de rastreo. En ese momento el pedido pasa a "enviado".',
        },
        {
          title: 'En tránsito y entrega (estado: entregado)',
          body:
            'La paquetería recoge el mismo día y el paquete viaja por vía aérea al centro de distribución de tu zona. La entrega se hace en horario hábil y normalmente requiere que alguien reciba y firme.',
        },
      ],
    },
    {
      type: 'table',
      title: 'Tiempos de entrega por zona',
      intro:
        'Los días son hábiles (lunes a viernes) y se cuentan a partir de que el pedido sale, no de que lo pagaste. No incluyen días festivos oficiales.',
      columns: ['Zona', 'Entrega estimada', 'Notas'],
      rows: [
        ['Ciudad de México y área metropolitana', '2 a 3 días hábiles', 'La zona más rápida y predecible.'],
        ['Capitales y ciudades grandes', '3 a 4 días hábiles', 'Guadalajara, Monterrey, Puebla, Querétaro, Mérida y similares.'],
        ['Resto del país', '3 a 5 días hábiles', 'Ciudades medianas con cobertura regular de paquetería.'],
        ['Zonas extendidas o de difícil acceso', '5 a 7 días hábiles', 'Localidades rurales, sierra y algunas zonas de la península.'],
      ],
      note:
        'Son estimados de la paquetería, no garantías. Temporadas altas (Buen Fin, diciembre) y contingencias climáticas pueden alargarlos.',
    },
    {
      type: 'list',
      title: 'La hora de corte, explicada',
      intro:
        'Es la duda más frecuente y la respuesta corta es: lo que manda es la hora en que se confirma el pago, no la hora en que hiciste clic en comprar.',
      items: [
        'Pedido pagado y confirmado antes de las 5:00 pm (hora del centro de México), de lunes a viernes: sale ese mismo día.',
        'Pedido confirmado después de las 5:00 pm: sale el siguiente día hábil.',
        'Pedido confirmado en sábado, domingo o día festivo: sale el siguiente día hábil, normalmente el lunes.',
        { text: 'Un pedido pagado por SPEI a las 4:50 pm no necesariamente sale ese día: si el banco refleja la transferencia hasta las 6:00 pm, el corte ya pasó.', bad: true },
      ],
    },
    {
      type: 'prose',
      title: 'Paqueterías con las que trabajamos',
      paragraphs: [
        'Usamos servicio aéreo nacional. Según tu código postal y la cobertura del día elegimos entre FedEx, DHL, Estafeta, UPS, Paquete Express, Redpack o Correos de México. En la mayoría de los destinos el envío sale por FedEx.',
        'No puedes elegir la paquetería al momento de comprar: la asignamos buscando el tiempo de entrega más corto para tu zona. Si tienes una restricción real —por ejemplo, que en tu domicilio solo entra una paquetería— escríbenos antes de pagar y lo revisamos.',
        'Sea cual sea la paquetería, el correo con tu guía incluye el enlace de rastreo ya armado para ese transportista: no tienes que buscar el sitio ni copiar el número a mano.',
      ],
    },
    {
      type: 'list',
      title: 'Cómo rastrear tu paquete',
      items: [
        'Entra a Mi cuenta y abre el pedido: ahí aparece el número de guía y el enlace de rastreo en cuanto existe.',
        'También te llega por correo automáticamente al momento de generar la guía. Revisa la carpeta de no deseados si no lo ves.',
        'Puedes preguntarle al asistente del sitio por el estado de tu pedido con tu número EX-AAAAMMDD-1234, o estando dentro de tu cuenta.',
        'El rastreo tarda de 2 a 6 horas en mostrar movimientos después de generarse la guía. Que diga "sin información" recién creada es normal.',
      ],
    },
    {
      type: 'prose',
      title: 'Tu dirección: revísala dos veces',
      paragraphs: [
        'La causa número uno de entregas fallidas no es la paquetería, es una dirección incompleta. Verifica calle y número exterior e interior, colonia, código postal, ciudad y estado, y agrega referencias útiles (color de fachada, entre qué calles, nombre del edificio). Un teléfono correcto es igual de importante: es lo primero que usa el repartidor cuando no encuentra el domicilio.',
        'Si detectas un error, escríbenos de inmediato con tu número de pedido. Mientras el pedido no tenga guía generada podemos corregir la dirección sin costo. Una vez que el paquete ya salió, el cambio depende de lo que permita la paquetería y puede generar un cargo adicional o un retraso de varios días.',
        'No enviamos a apartados postales. Tampoco usamos ni recomendamos servicios de reenvío o casilleros internacionales: si el paquete sale de nuestro control por esa vía, no podemos responder por él.',
      ],
    },
    {
      type: 'list',
      title: 'Si nadie recibe el paquete',
      intro:
        'Las paqueterías en México suelen hacer hasta tres intentos de entrega en días consecutivos antes de retornar el envío.',
      items: [
        'Primer intento fallido: el repartidor deja aviso y reintenta al siguiente día hábil.',
        'Tras el segundo o tercer intento, muchas paqueterías dejan el paquete en su sucursal local para que lo recojas. El rastreo te dice cuál y hasta qué fecha.',
        'Si nadie lo recoge, el paquete se retorna a nuestro laboratorio. Te avisamos en cuanto lo recibimos de vuelta.',
        'Un reenvío después de un retorno por domicilio incorrecto o ausencia tiene costo, porque es una segunda guía. Te cotizamos antes de hacer nada.',
      ],
    },
    {
      type: 'prose',
      title: 'Costo del envío y empaque',
      paragraphs: [
        'El envío se cotiza por separado según tu zona y el peso del pedido; lo ves antes de confirmar la compra y aparece desglosado en el resumen. No lo escondemos dentro del precio de los productos.',
        'Empacamos con discreción: caja o sobre neutro, sin logotipos ni descripciones del contenido en el exterior. La documentación fiscal y de contenido va dentro, no impresa afuera.',
        'Los viales viajan con protección contra impacto. El péptido liofilizado tolera bien la temperatura ambiente durante los días de tránsito: es precisamente para eso que se liofiliza. Al recibirlo, guárdalo cuanto antes según las indicaciones de conservación.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Solo territorio nacional',
      body:
        'Enviamos únicamente dentro de México. No hacemos envíos internacionales ni aceptamos pedidos que vayan a reexportarse. Estos materiales son de uso exclusivo en investigación y su cruce de fronteras está sujeto a regulación aduanal que no gestionamos.',
    },
    {
      type: 'faq',
      title: 'Preguntas frecuentes de envíos',
      items: [
        {
          q: '¿Puedo pedir que lo entreguen en una fecha o un horario específico?',
          a: 'No podemos programar la entrega: la paquetería asigna las rutas por zona. Si necesitas control sobre el momento, la alternativa práctica es recogerlo en la sucursal de la paquetería en cuanto llegue a tu ciudad; el rastreo te indica cuándo está disponible.',
        },
        {
          q: 'El rastreo lleva dos días sin moverse, ¿está perdido?',
          a: 'Casi nunca. Los escaneos se registran al entrar y salir de cada centro de distribución, y entre uno y otro pueden pasar 24 o 48 horas sin actualizaciones, sobre todo en fin de semana. Si pasan más de tres días hábiles sin ningún movimiento nuevo, escríbenos con tu número de pedido y levantamos la investigación con la paquetería.',
        },
        {
          q: '¿Necesito estar yo para recibirlo?',
          a: 'No necesariamente tú, pero sí alguien mayor de edad que pueda recibir y firmar. Puede ser un familiar, un vecino o la recepción de tu edificio u oficina. Si sabes que no habrá nadie, considera poner una dirección laboral.',
        },
        {
          q: '¿Puedo cambiar la dirección después de comprar?',
          a: 'Sí, mientras no se haya generado la guía: escríbenos con tu número de pedido lo antes posible. Si el paquete ya está en tránsito, dependemos de lo que autorice la paquetería y puede haber costo o demora.',
        },
        {
          q: '¿Hacen envío el mismo día en la Ciudad de México?',
          a: 'Despachamos el mismo día si el pago se confirma antes de las 5:00 pm, pero la entrega sigue el estándar de la paquetería aérea: normalmente 2 o 3 días hábiles. No manejamos mensajería local exprés.',
        },
        {
          q: '¿El paquete dice qué contiene por fuera?',
          a: 'No. El empaque exterior es neutro, sin marca ni descripción del contenido. Por fuera solo va la información que la paquetería necesita para entregarlo.',
        },
        {
          q: '¿Puedo pedir factura?',
          a: 'Sí. Escríbenos a hola@exygenlabs.com con tu número de pedido y tus datos fiscales (RFC, razón social, régimen, uso de CFDI y código postal fiscal) y te la emitimos.',
        },
        {
          q: 'Llegó incompleto o dañado, ¿qué hago?',
          a: 'Escríbenos dentro de las primeras 48 horas con tu número de pedido y fotos claras del paquete cerrado, del empaque abierto y de los viales. Con eso podemos reponer o reembolsar. El detalle está en la página de devoluciones.',
        },
      ],
    },
  ],
  related: [
    { to: '/info/devoluciones', title: 'Devoluciones e incidencias', desc: 'Qué cubrimos, en cuánto tiempo reportar y qué evidencia necesitamos.' },
    { to: '/aprende/conservacion', title: 'Cómo conservar tus viales', desc: 'Qué hacer con el material apenas llega y cómo guardarlo bien.' },
  ],
};

export default page;
