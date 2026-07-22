const page = {
  slug: 'preguntas-frecuentes',
  title: 'Preguntas frecuentes',
  subtitle:
    'Todo lo operativo de Exygen Labs en un solo lugar: productos, pedidos, pagos, envíos, garantías y el marco legal bajo el que vendemos.',
  badge: 'FAQ',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      title: 'Cómo usar esta página',
      paragraphs: [
        'Aquí están las respuestas concretas a lo que la gente nos pregunta todos los días por correo y por WhatsApp. Está ordenada por bloques: primero los productos, luego el proceso de compra, después pagos, envíos, garantías y por último la parte legal.',
        'Todo lo que vendemos es material de investigación (RUO, research use only). No es medicamento, no está aprobado para consumo humano ni animal, y no damos indicaciones de dosificación en personas. Si buscas la parte científica y de manejo en laboratorio, esa vive en /aprende.',
        'Si no encuentras tu respuesta, escríbenos a hola@exygenlabs.com. El chat de IA del sitio también puede consultar el estatus de un pedido si le das tu número de orden.',
      ],
    },
    {
      type: 'faq',
      title: 'Sobre los productos',
      items: [
        {
          q: '¿Qué significa que sean productos RUO?',
          a: 'RUO viene de "research use only": material destinado exclusivamente a investigación de laboratorio. No es un medicamento, no tiene registro sanitario como tal, no está aprobado para uso en personas ni en animales, y no lo vendemos con ninguna promesa terapéutica. Al comprar, el cliente acepta que el destino del material es de investigación.',
        },
        {
          q: '¿En qué presentación llegan los péptidos?',
          a: 'Casi todo llega como polvo liofilizado en vial de vidrio sellado con tapón de goma y engargolado de aluminio. El liofilizado es el mismo péptido al que se le quitó el agua por sublimación, lo que le da una estabilidad muchísimo mayor que la de una solución. Algunos productos, como el agua bacteriostática, llegan en solución.',
        },
        {
          q: '¿Qué pureza manejan y cómo la comprueban?',
          a: 'El estándar de la casa es 99% o más por HPLC, con identidad confirmada por espectrometría de masas. Cada lote se analiza y esos dos datos (pureza cromatográfica y masa observada contra masa teórica) son la base del certificado de análisis del lote.',
        },
        {
          q: '¿Qué es un COA y cómo lo consigo?',
          a: 'El COA (certificate of analysis) es el reporte del laboratorio para ese lote específico: cromatograma de HPLC con el porcentaje de pureza, espectro de masas, apariencia, contenido de agua y número de lote. Nuestros clientes lo reciben en la pestaña Certificados de Mi cuenta, con el lote que les corresponde según su compra. Antes de comprar puedes revisar el certificado de muestra que publicamos, o escribirnos a hola@exygenlabs.com.',
        },
        {
          q: '¿El COA corresponde a mi vial o es genérico?',
          a: 'Corresponde al lote. Por eso te pedimos el número de lote de tu etiqueta: así te mandamos exactamente el análisis del material que recibiste, no un documento de muestra.',
        },
        {
          q: '¿Cuánto dura el producto y cómo se guarda?',
          a: 'El vial liofilizado cerrado se conserva en refrigeración de 2 a 8 grados, protegido de la luz, y aguanta bien por meses; para almacenamiento largo, congelador a menos 20 grados. Una vez reconstituido, la vida útil se acorta muchísimo: se maneja en refrigeración y en cuestión de semanas, no de meses. El detalle por compuesto está en /aprende.',
        },
        {
          q: '¿El polvo se ve muy poco, me dieron menos de lo que pagué?',
          a: 'No. Un vial de 5 mg de péptido es una cantidad diminuta de sólido, y después de la liofilización queda como una película o un anillo casi invisible pegado al fondo o a la pared del vial. El contenido se garantiza por peso y por el COA del lote, no por lo que se alcanza a ver.',
        },
        {
          q: '¿Venden agua bacteriostática, jeringas y material de laboratorio?',
          a: 'Sí, manejamos consumibles: agua bacteriostática, agua estéril para inyección, jeringas de insulina, toallitas con alcohol isopropílico y viales vacíos estériles. Puedes verlos en /catalogo y agregarlos al mismo pedido.',
        },
        {
          q: '¿Cómo sé qué compuesto corresponde a lo que quiero investigar?',
          a: 'Dos caminos. En /asesor contestas unas preguntas sobre el objetivo del protocolo y te armamos una recomendación con compuestos, razonamiento y presentaciones. Y en /aprende están las guías por mecanismo si prefieres leer primero y decidir tú.',
        },
        {
          q: '¿Manejan producto que no aparece en el catálogo?',
          a: 'A veces sí, por pedido especial, dependiendo del compuesto y del volumen. Escríbenos a hola@exygenlabs.com con el nombre exacto, la cantidad y la presentación que necesitas y te decimos si es viable, en cuánto tiempo y a qué precio.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Compras y pedidos',
      items: [
        {
          q: '¿Necesito crear cuenta para comprar?',
          a: 'Puedes comprar sin cuenta, pero te conviene tenerla. En /cuenta quedan guardados tus pedidos con su rastreo, la calculadora completa de reconstitución y el seguimiento de consumo que te avisa cuándo se te va a acabar un vial.',
        },
        {
          q: '¿Hay pedido mínimo?',
          a: 'No. Puedes comprar un solo vial. Lo que sí cambia con el monto son los descuentos automáticos por volumen, que empiezan en 20,000 pesos.',
        },
        {
          q: '¿Cómo sé que mi pedido se registró?',
          a: 'Al cerrar la compra recibes un correo de confirmación con tu número de pedido en formato EX-AAAAMMDD-1234, donde la parte central es la fecha. Ese número es tu referencia para todo: rastreo, aclaraciones, reposiciones y consultas al chat.',
        },
        {
          q: '¿Puedo modificar o cancelar un pedido ya hecho?',
          a: 'Sí, mientras no haya salido del almacén. Como surtimos el mismo día para los pedidos que entran antes de las 5 pm, la ventana es corta: escríbenos de inmediato a hola@exygenlabs.com con tu número EX en el asunto. Si la guía ya se generó y el paquete ya está con FedEx, ya no se puede detener.',
        },
        {
          q: '¿Puedo agregar algo a un pedido que ya pagué?',
          a: 'No se agrega al pedido existente; se hace un pedido nuevo. Si ambos entran el mismo día antes del corte de las 5 pm, normalmente los podemos consolidar en una sola caja y te ahorras el segundo envío. Avísanos por WhatsApp con los dos números EX.',
        },
        {
          q: '¿Dónde veo el estatus de mi pedido?',
          a: 'En /cuenta, en la sección de pedidos, con el estatus y el número de guía. También puedes preguntarle al chat de IA del sitio dándole tu número EX y él consulta el estatus en el momento.',
        },
        {
          q: '¿Emiten factura?',
          a: 'Sí. Mándanos tu constancia de situación fiscal y el uso de CFDI a hola@exygenlabs.com junto con tu número de pedido. Pídela dentro del mismo mes de la compra para no complicar la emisión.',
        },
        {
          q: '¿Puedo comprar a nombre de mi laboratorio o empresa?',
          a: 'Sí, y es lo normal en compras grandes. Pon los datos fiscales de la institución en la factura y la dirección de entrega donde efectivamente se reciba el paquete, con nombre de la persona que va a firmar.',
        },
        {
          q: '¿Qué pasa si un producto está agotado?',
          a: 'El catálogo marca la disponibilidad. Si algo se agota entre que lo pediste y que lo surtimos, te contactamos antes de mandar el paquete y decides: esperar el restock, cambiarlo por otro compuesto o que te devolvamos ese importe.',
        },
        {
          q: '¿Hay precios para volumen o para distribuidores?',
          a: 'Sí. Los descuentos por volumen son automáticos en el carrito. Aparte existe el programa de distribuidores, con su propio código de descuento y comisión por referidos. Si te interesa, escríbenos a hola@exygenlabs.com contándonos qué volumen mueves.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Pagos y descuentos',
      items: [
        {
          q: '¿Qué formas de pago aceptan?',
          a: 'Dos: tarjeta de crédito o débito, y transferencia bancaria SPEI. No manejamos pago en OXXO, ni contra entrega, ni PayPal.',
        },
        {
          q: '¿Cómo funciona el pago por SPEI?',
          a: 'Al elegir transferencia te damos los datos de la cuenta y una referencia ligada a tu número de pedido. Haces la transferencia desde tu banca en línea y nos mandas el comprobante. En cuanto se confirma el depósito, el pedido entra a surtido.',
        },
        {
          q: '¿La transferencia retrasa mi envío?',
          a: 'Puede retrasarlo. Los SPEI suelen acreditarse en minutos en horario bancario, pero lo que cuenta para el corte de las 5 pm es el pago confirmado, no el pedido creado. Si transfieres tarde o en fin de semana, el paquete sale el siguiente día hábil.',
        },
        {
          q: '¿Cuáles son los descuentos automáticos por volumen?',
          a: 'Tres niveles, aplicados solos en el carrito: 10% de lanzamiento en todo el catálogo, 15% a partir de 20,000 pesos y 20% a partir de 40,000 pesos. No hay que escribir ningún código, el carrito los calcula sobre el subtotal.',
        },
        {
          q: 'Tengo un código de distribuidor, ¿se suma al descuento automático?',
          a: 'No, nunca se acumulan. El sistema compara el porcentaje de tu código contra el descuento automático que te toca por monto y aplica el mayor de los dos. Un solo descuento, siempre el que más te conviene.',
        },
        {
          q: 'Ejemplo: mi código es de 15% y mi carrito es de 45,000 pesos, ¿qué me aplican?',
          a: 'El 20% por volumen, porque es mayor que el 15% de tu código. Si ese mismo carrito fuera de 8,000 pesos, te aplicaría el 15% de tu código, porque ahí el automático sería solo el 10% de lanzamiento.',
        },
        {
          q: '¿Los precios incluyen IVA y el envío?',
          a: 'Los precios se muestran en pesos mexicanos. El desglose final de impuestos y del costo de envío lo ves en el checkout antes de confirmar y pagar, ya con el descuento aplicado.',
        },
        {
          q: '¿Es seguro pagar con tarjeta en el sitio?',
          a: 'Sí. El cobro lo procesa una pasarela de pagos certificada; los datos de la tarjeta viajan cifrados directo al procesador y Exygen no almacena ni ve el número completo de tu tarjeta.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Envíos y entregas',
      items: [
        {
          q: '¿Con qué paquetería mandan y a dónde?',
          a: 'FedEx aéreo, a todo el territorio nacional. No hacemos envíos internacionales.',
        },
        {
          q: '¿Cuánto tarda en llegar?',
          a: 'De 3 a 5 días hábiles después de que el paquete sale. Si tu pedido entra pagado antes de las 5 pm, sale el mismo día; después de esa hora, sale el siguiente día hábil.',
        },
        {
          q: '¿Cómo rastreo mi paquete?',
          a: 'Te llega un correo con el número de guía de FedEx en cuanto se genera. Con ese número rastreas directo en FedEx, y el mismo estatus lo ves dentro de /cuenta en tu pedido.',
        },
        {
          q: '¿Los fines de semana y días festivos cuentan?',
          a: 'No. Tanto el corte de las 5 pm como los 3 a 5 días son en días hábiles. Un pedido pagado el sábado sale el lunes.',
        },
        {
          q: '¿Cómo viaja el material, necesita refrigeración?',
          a: 'El péptido liofilizado es estable a temperatura ambiente el tiempo que dura el tránsito, por eso se puede mandar por aéreo normal sin cadena de frío. Lo empacamos protegido de golpes y de luz. Al recibirlo, mételo al refrigerador.',
        },
        {
          q: '¿Qué hago si el rastreo no se mueve o el paquete no llegó?',
          a: 'Escríbenos con tu número EX y tu guía a hola@exygenlabs.com o por WhatsApp. Nosotros abrimos la aclaración con FedEx y te damos seguimiento hasta que se resuelva.',
        },
        {
          q: '¿Puedo mandarlo a una dirección distinta a la de facturación?',
          a: 'Sí. En el checkout la dirección de envío es independiente de los datos fiscales. Pon una dirección donde haya alguien para recibir y firmar en horario hábil.',
        },
        {
          q: '¿Qué pasa si nadie recibe el paquete?',
          a: 'FedEx reintenta la entrega. Si después de los intentos nadie recibe, el paquete regresa a nuestro almacén y el reenvío se cobra aparte, así que vale la pena estar pendiente del rastreo.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Seguridad y garantías',
      items: [
        {
          q: '¿Aceptan devoluciones?',
          a: 'No. Todas las ventas son finales. Es material sensible de laboratorio y, una vez que sale de nuestro control, no podemos garantizar cómo se conservó, así que no lo podemos regresar a inventario.',
        },
        {
          q: 'Entonces, ¿qué sí cubren?',
          a: 'Dos casos concretos: si el producto llega dañado (vial roto, tapón comprometido, empaque violado) o si el material no cumple con el COA de su lote, te lo reponemos. Sin costo y sin discusión, contra evidencia.',
        },
        {
          q: '¿Cómo reporto un producto dañado?',
          a: 'Mándanos dentro de las primeras 48 horas de entregada la guía un correo a hola@exygenlabs.com con tu número EX, fotos del vial y fotos de la caja como llegó, incluida la etiqueta de FedEx. Con eso levantamos la reposición.',
        },
        {
          q: '¿Y si sospecho que el material no corresponde al COA?',
          a: 'Escríbenos con el número de lote y con los resultados que obtuviste. Cotejamos contra la contramuestra del lote y, si el material efectivamente no cumple, lo reponemos. Preferimos perder un vial que un lote mal caracterizado circulando.',
        },
        {
          q: '¿Qué pasa si me equivoqué al pedir o ya no lo quiero?',
          a: 'Si el pedido no ha salido del almacén lo podemos cancelar o corregir. Ya despachado, la venta es final: el error de selección del cliente no entra en reposición. Por eso vale la pena revisar el carrito antes de pagar o preguntar en /asesor.',
        },
        {
          q: '¿Qué hacen con mis datos personales?',
          a: 'Los usamos para procesar tu pedido, facturarlo y darte seguimiento. No vendemos ni compartimos tu información con terceros ajenos a la operación; los datos de pago los maneja la pasarela, no nosotros.',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Legal y regulación',
      items: [
        {
          q: '¿Es legal comprar estos productos en México?',
          a: 'Sí, adquirir reactivos de investigación para uso en laboratorio es legal. Lo que no es legal ni está permitido es comercializarlos o usarlos como medicamento sin el registro sanitario correspondiente. Nosotros los vendemos y los etiquetamos exclusivamente como material RUO.',
        },
        {
          q: '¿Estos productos tienen registro COFEPRIS como medicamento?',
          a: 'No, y no pretenden tenerlo. Un registro sanitario aplica a medicamentos destinados a uso humano. Estos compuestos se venden como reactivos de investigación, categoría distinta, y por eso no llevan indicaciones, dosis ni prospecto.',
        },
        {
          q: '¿Me pueden decir qué dosis usar en una persona?',
          a: 'No, y nadie en Exygen lo hará por ningún canal. No damos pautas de administración en humanos ni en animales, ni consejo médico. Sí podemos explicar mecanismo, química, estabilidad, reconstitución y qué reporta la literatura. Cualquier decisión clínica es de un profesional de la salud.',
        },
        {
          q: '¿Necesito una licencia o ser institución para comprar?',
          a: 'No exigimos licencia para comprar, pero sí que declares que el material se destina a investigación y que eres mayor de edad. Si tu institución te pide documentación de proveedor, pídenos el COA y los datos fiscales y te los damos.',
        },
        {
          q: '¿Quién es responsable del uso que se le dé al material?',
          a: 'El comprador. Al confirmar el pedido aceptas los términos: el material es RUO y tú asumes la responsabilidad de su manejo, almacenamiento y destino. Exygen responde por identidad, pureza y entrega del material; no por el uso posterior.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: 'Recordatorio RUO',
      body:
        'Todo lo que vende Exygen Labs es material para investigación de laboratorio. No es medicamento, no está aprobado para consumo humano ni animal, y esta página no constituye consejo médico. Si tienes una duda de salud, consúltala con un profesional.',
    },
    {
      type: 'cards',
      title: 'A dónde ir después',
      intro: 'Si tu duda es más de fondo que de trámite, estas páginas la cubren mejor.',
      items: [
        {
          title: 'Las dudas de la primera vez',
          body:
            'Todo lo que nadie pregunta por pena: el polvo pegado en la tapa, el vial que se ve vacío, la jeringa, la conservación.',
          to: '/aprende/preguntas-principiantes',
          cta: 'Leer la guía',
        },
        {
          title: 'Envíos y tiempos',
          body: 'Cortes de horario, cobertura FedEx, rastreo y qué hacer si el paquete se atrasa.',
          to: '/info/envios',
          cta: 'Ver envíos',
        },
        {
          title: 'Devoluciones y reposiciones',
          body: 'La política completa: qué se repone, en qué plazo y qué evidencia necesitamos.',
          to: '/info/devoluciones',
          cta: 'Ver política',
        },
        {
          title: 'Marco legal y RUO',
          body: 'Qué significa research use only en México y cuáles son las obligaciones de cada parte.',
          to: '/aprende/legalidad',
          cta: 'Entender el marco',
        },
      ],
    },
  ],
  related: [
    {
      to: '/aprende/preguntas-principiantes',
      title: 'Lo que nadie te explica en tu primer pedido',
      desc: 'La guía sin pena para quien nunca ha manejado un vial liofilizado.',
    },
    {
      to: '/aprende/protocolos',
      title: 'Protocolos por objetivo',
      desc: 'Qué se combina con qué, y por qué la sinergia importa.',
    },
    {
      to: '/asesor',
      title: 'Asesor de protocolo',
      desc: 'Contesta unas preguntas y te armamos una recomendación con razonamiento.',
    },
  ],
};

export default page;
