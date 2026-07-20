const page = {
  slug: 'soporte',
  title: 'Centro de soporte',
  subtitle:
    'Los problemas que aparecen de verdad —pagos que no entran, correos que no llegan, accesos que fallan, paquetes que no se mueven— con la solución concreta de cada uno.',
  badge: 'Autoservicio',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'info',
      title: 'Antes de escribirnos',
      body:
        'La mayoría de los casos que recibimos se resuelven en esta página en menos de un minuto. Busca tu situación abajo. Si no está o la solución no funcionó, escríbenos con tu número de pedido y te atendemos directo.',
    },
    {
      type: 'cards',
      title: 'Atajos a lo que buscas',
      items: [
        { to: '/cuenta', title: 'Estado de mi pedido', body: 'Tus pedidos, su estado actual y la guía de rastreo cuando ya existe.', cta: 'Abrir Mi cuenta' },
        { to: '/info/envios', title: 'Tiempos y rastreo', body: 'Cuánto tarda, cómo se rastrea y qué pasa si nadie recibe.', cta: 'Ver envíos' },
        { to: '/info/devoluciones', title: 'Reportar una incidencia', body: 'Producto dañado, incompleto o equivocado: qué hacer y en cuánto tiempo.', cta: 'Ver devoluciones' },
        { to: '/aprende/preguntas-frecuentes', title: 'Preguntas frecuentes', body: 'El catálogo completo de dudas comunes, ya respondidas.', cta: 'Ver FAQ' },
      ],
    },
    {
      type: 'prose',
      title: 'Problemas con el pago',
      paragraphs: [
        'Aceptamos únicamente tarjeta (crédito o débito) y transferencia SPEI. No manejamos pagos contra entrega ni criptomonedas.',
        'Si tu tarjeta fue rechazada, el motivo casi nunca está de nuestro lado. Las causas más comunes son: el banco bloqueó el cargo por ser un comercio nuevo para ti, los datos de facturación no coinciden con los registrados en el banco, o la tarjeta no tiene habilitadas las compras en línea. La solución práctica es hablar con tu banco para autorizar el cargo y volver a intentar, o pagar por SPEI.',
        'Si pagaste por SPEI y tu pedido sigue en "pendiente", revisa el tiempo: las transferencias suelen reflejarse en minutos dentro del horario bancario, pero una hecha de noche, en fin de semana o en festivo puede tardar hasta el siguiente día hábil. Si ya pasó ese plazo, mándanos el comprobante con tu número de pedido y lo confirmamos a mano.',
      ],
    },
    {
      type: 'list',
      title: 'Nunca te vamos a pedir esto',
      intro:
        'Dicho claro, porque el fraude en este mercado existe y conviene que sepas reconocerlo:',
      items: [
        { text: 'No te pedimos el número completo de tu tarjeta, el CVV ni tu NIP por WhatsApp, correo ni llamada. Nunca, por ningún motivo.', bad: true },
        { text: 'No guardamos datos de tarjetas en nuestros servidores. Los campos del checkout no se envían a nuestra base.', bad: true },
        { text: 'No te pedimos transferir a cuentas personales. Cualquier dato bancario legítimo lo recibes al confirmar tu pedido en el sitio.', bad: true },
        { text: 'No te contactamos pidiendo un pago extra para "liberar" un paquete detenido. Si alguien lo hace, no somos nosotros.', bad: true },
      ],
    },
    {
      type: 'steps',
      title: 'No recibí el correo de confirmación',
      intro:
        'Nuestros correos salen desde hola@exygenlabs.com. Si no lo ves, sigue este orden.',
      items: [
        { title: 'Busca en no deseados', body: 'Es la causa del 90% de los casos. Busca "Exygen" en todo tu buzón, incluyendo spam, promociones y social.' },
        { title: 'Verifica que el correo esté bien escrito', body: 'Un typo al registrarte manda el mensaje a una dirección que no existe. Puedes revisar y corregir tu correo desde el perfil en Mi cuenta.' },
        { title: 'Marca como "no es spam"', body: 'Si lo encontraste en no deseados, márcalo. Así los siguientes —incluido el de tu guía de rastreo— llegan a la bandeja principal.' },
        { title: 'Pide el reenvío', body: 'Desde la pantalla de confirmación puedes solicitar que se reenvíe el enlace. Si aun así no llega, escríbenos y lo activamos manualmente.' },
      ],
    },
    {
      type: 'list',
      title: 'Problemas para entrar a tu cuenta',
      items: [
        'Olvidaste tu contraseña: usa "recuperar contraseña" en la pantalla de acceso. Llega un enlace válido por tiempo limitado; si expira, solicita otro.',
        'Dice que tu cuenta no está confirmada: busca el correo de confirmación (revisa no deseados) y abre el enlace. Tiene vigencia de 24 horas; si ya venció, pide que se reenvíe.',
        'Te invitaron como cliente o distribuidor y el enlace no funciona: las invitaciones vencen a los 7 días. Pídenos una nueva.',
        'El correo con el que compraste no es el mismo con el que te registraste: son cuentas distintas. Escríbenos y las unificamos.',
        'Tu contraseña no es aceptada al cambiarla: revisa que cumpla el mínimo de caracteres y que ambas casillas coincidan exactamente.',
      ],
    },
    {
      type: 'prose',
      title: 'Facturación (CFDI)',
      paragraphs: [
        'Emitimos factura electrónica CFDI 4.0. Pídela escribiendo a hola@exygenlabs.com con tu número de pedido y tus datos fiscales completos: RFC, razón social o nombre exactamente como aparece en tu constancia de situación fiscal, régimen fiscal, uso de CFDI y código postal del domicilio fiscal.',
        'La emitimos dentro de las 24 horas hábiles siguientes a que se confirma tu pago y a que recibimos tus datos completos. El dato que más suele fallar es la razón social: el SAT exige que coincida carácter por carácter con la constancia, así que lo más seguro es que nos adjuntes esa constancia en PDF.',
        'Si necesitas factura, pídela dentro del mes en curso de tu compra. Facturar un pedido de un mes ya cerrado se complica del lado fiscal y no siempre es posible.',
      ],
    },
    {
      type: 'prose',
      title: 'Descuentos que no se aplicaron',
      paragraphs: [
        'Hay dos tipos de descuento y no se acumulan: siempre se aplica el mayor de los dos, nunca la suma.',
        'El descuento por volumen es automático y no necesita código: se activa solo en el carrito al alcanzar el monto correspondiente. Si no lo ves, verifica el subtotal antes de envío, que es sobre lo que se calcula.',
        'El código de distribuidor se captura en el campo del carrito. Si marca error, revisa que esté completo y sin espacios de sobra. Si tu código es menor al descuento por volumen que ya alcanzaste, el sistema aplica el volumen porque te conviene más: no es un error, es la regla del mayor.',
      ],
    },
    {
      type: 'list',
      title: 'Problemas con el sitio',
      intro: 'Antes de reportar una falla, estos tres pasos resuelven casi todo:',
      items: [
        'Recarga forzando la actualización (Ctrl+Shift+R en Windows, Cmd+Shift+R en Mac). Suele ser una versión vieja guardada en el navegador.',
        'Prueba en una ventana privada o en otro navegador, para descartar extensiones y bloqueadores.',
        'Si el carrito se vació solo, revisa si tu navegador borra datos de sitio al cerrarse: el carrito vive en tu navegador hasta que finalizas la compra.',
        'Si algo sigue fallando, mándanos una captura de pantalla, qué navegador usas y qué estabas haciendo. Con eso lo reproducimos.',
      ],
    },
    {
      type: 'faq',
      title: 'Dudas sobre el material que recibiste',
      items: [
        {
          q: 'El vial se ve vacío, ¿me llegó sin producto?',
          a: 'Es la pregunta que más recibimos y casi siempre la respuesta es que sí trae producto. Diez miligramos de polvo liofilizado ocupan poquísimo volumen: suelen quedar como una película delgada, blanca y casi transparente, pegada al fondo o a la pared del vial. Míralo a contraluz e inclínalo despacio. Si de verdad no ves nada, mándanos una foto con buena luz.',
        },
        {
          q: 'No logro sacar el producto del vial.',
          a: 'El liofilizado no se saca en polvo: primero se reconstituye. Se agrega el diluyente por la pared del vial, sin chorro directo sobre la torta, y se deja disolver solo. Después ya se extrae en solución. La guía de reconstitución tiene el procedimiento completo y la calculadora te dice cuánto diluyente usar para la concentración que buscas.',
        },
        {
          q: '¿Qué volumen tiene el vial y cuánto líquido le cabe?',
          a: 'Nuestros viales son del formato estándar de laboratorio de 3 mL de capacidad total. Lo que importa para tu cálculo no es la capacidad del vial sino los miligramos de péptido que contiene, que es el dato de la etiqueta y el que usa la calculadora.',
        },
        {
          q: 'La torta se ve movida o pegada a la pared, ¿está dañado?',
          a: 'No. Durante el transporte es normal que el liofilizado se desprenda del fondo y quede pegado en otra parte del vial. Eso no afecta al material. Lo que sí es señal de problema es un color amarillento o pardo, apelmazamiento húmedo o gotas visibles: en ese caso, fotografíalo y escríbenos.',
        },
        {
          q: '¿Por qué mi pedido dice "pendiente" si ya pagué?',
          a: 'Con tarjeta, la verificación es casi inmediata y algo salió mal; escríbenos. Con SPEI, el pedido queda en pendiente hasta que el banco refleja la transferencia: en horario bancario suele ser cuestión de minutos, pero de noche, en fin de semana o en festivo puede pasar al siguiente día hábil. Mandarnos el comprobante lo resuelve al momento.',
        },
      ],
    },
    {
      type: 'table',
      title: 'A dónde va cada asunto',
      intro: 'Para que llegue a la persona correcta a la primera.',
      columns: ['Tu asunto', 'Mejor canal', 'Qué tener a la mano'],
      rows: [
        ['Estado de mi pedido', 'Mi cuenta, o WhatsApp', 'Número de pedido'],
        ['Producto dañado o incompleto', 'Correo con fotos', 'Número de pedido y 4 fotos'],
        ['Análisis de un lote', 'Correo', 'Número de lote del vial'],
        ['Facturación (CFDI)', 'Correo', 'Datos fiscales completos'],
        ['Mayoreo o distribución', 'Correo, asunto "Mayoreo"', 'Compuestos y volumen mensual'],
        ['Qué producto comprar', 'Asesor, o WhatsApp', 'Tu objetivo y presupuesto'],
        ['Falla del sitio', 'Correo', 'Captura y navegador'],
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Soporte técnico, no médico',
      body:
        'Ayudamos con pedidos, envíos, pagos, accesos, análisis de lote y manejo de material en laboratorio. No damos dosis, protocolos de administración ni consejo médico: todos los productos son de uso exclusivo en investigación y no son para consumo humano ni animal.',
    },
  ],
  related: [
    { to: '/info/contacto', title: 'Contacto', desc: 'Canales, horarios y tiempos de respuesta.' },
    { to: '/aprende/preguntas-frecuentes', title: 'Preguntas frecuentes', desc: 'El catálogo completo de dudas comunes.' },
  ],
};

export default page;
