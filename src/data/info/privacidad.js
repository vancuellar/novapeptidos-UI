// Aviso de privacidad conforme a la LFPDPPP. BORRADOR SUSTANTIVO — Christian
// es abogado y debe revisarlo (falta definir domicilio del responsable y
// designar al encargado de datos personales). Ver nota en el continuation.
const page = {
  slug: 'privacidad',
  title: 'Aviso de privacidad',
  subtitle:
    'Qué datos personales tratamos, para qué los usamos, con quién los compartimos y cómo puedes ejercer tus derechos ARCO.',
  badge: 'Legal',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'info',
      title: 'El resumen honesto',
      body:
        'Pedimos los datos mínimos para venderte y entregarte un pedido. No vendemos ni rentamos tus datos a nadie. No guardamos números de tarjeta. Puedes pedirnos en cualquier momento que te digamos qué tenemos, que lo corrijamos o que lo borremos, escribiendo a hola@exygenlabs.com.',
    },
    {
      type: 'prose',
      title: '1. Responsable del tratamiento',
      paragraphs: [
        'Exygen Labs es responsable del tratamiento de tus datos personales, en términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad.',
        'Para cualquier asunto relacionado con tus datos personales, incluido el ejercicio de tus derechos ARCO, el canal de contacto es hola@exygenlabs.com.',
      ],
    },
    {
      type: 'table',
      title: '2. Qué datos tratamos y para qué',
      intro:
        'Solo recabamos lo necesario para cada finalidad. No pedimos datos que no usemos.',
      columns: ['Dato', 'Para qué lo usamos', 'Necesario'],
      rows: [
        ['Nombre completo', 'Identificarte, emitir tu pedido y la guía de envío.', 'Sí'],
        ['Correo electrónico', 'Confirmar tu cuenta, mandarte el pedido, la guía y avisos del servicio.', 'Sí'],
        ['Teléfono', 'Que la paquetería pueda contactarte durante la entrega.', 'Sí'],
        ['Dirección de envío', 'Entregarte el pedido.', 'Sí'],
        ['Datos fiscales (RFC, razón social, régimen, uso de CFDI)', 'Emitir tu factura, solo si la solicitas.', 'No'],
        ['Historial de pedidos', 'Darte soporte, seguimiento y acceso a los análisis de tus lotes.', 'Sí'],
        ['Preferencia de método de pago', 'Agilizar tu siguiente compra. Es solo la preferencia, no el instrumento.', 'No'],
        ['Datos de tu seguimiento de consumo y marcadores que registres', 'Alimentar tus herramientas privadas de cálculo y seguimiento.', 'No'],
      ],
      note:
        'Los datos marcados como no necesarios son opcionales: si no los proporcionas, el servicio funciona igual, solo pierdes esa función concreta.',
    },
    {
      type: 'list',
      title: '3. Finalidades',
      intro: 'Distinguimos entre lo que necesitamos para darte el servicio y lo que es opcional.',
      items: [
        'Finalidades primarias (necesarias): crear y administrar tu cuenta; procesar, cobrar, surtir y entregar tus pedidos; darte seguimiento y soporte; emitir comprobantes fiscales; atender incidencias y devoluciones; y cumplir obligaciones legales.',
        'Finalidades secundarias (opcionales): enviarte novedades, promociones y contenido educativo. Requieren tu consentimiento expreso y puedes retirarlo cuando quieras, sin que eso afecte tus compras ni tu cuenta.',
        'Puedes oponerte a las finalidades secundarias desde tu perfil o escribiéndonos a hola@exygenlabs.com.',
      ],
    },
    {
      type: 'prose',
      title: '4. Datos sensibles',
      paragraphs: [
        'Algunas herramientas privadas del sitio te permiten registrar información de análisis de laboratorio. Esa información puede considerarse dato personal sensible conforme a la LFPDPPP, y por eso recibe un tratamiento reforzado.',
        'Es siempre opcional: si no la capturas, el resto del servicio funciona igual. Cuando subes un archivo para extraer sus valores, el archivo no se conserva: solo se guardan los valores numéricos que tú confirmas, y el proceso de extracción está configurado para excluir nombre, dirección y CURP.',
        'Esta información se usa exclusivamente para mostrarte tu propia evolución dentro de tu cuenta. No se comparte con terceros, no se usa con fines comerciales y puedes borrarla en cualquier momento.',
      ],
    },
    {
      type: 'list',
      title: '5. Con quién compartimos datos',
      intro:
        'Compartimos lo estrictamente necesario, y solo con proveedores que nos permiten operar. Ninguno de ellos puede usar tus datos para fines propios.',
      items: [
        'Empresas de paquetería (FedEx, DHL, Estafeta y otras): nombre, dirección y teléfono, para poder entregarte.',
        'Proveedor de correo transaccional: tu correo y el contenido del mensaje, para hacerte llegar confirmaciones y guías.',
        'Procesadores de pago: gestionan el cobro directamente. Nosotros no recibimos ni almacenamos el número de tu tarjeta.',
        'Proveedor de infraestructura y base de datos, donde se aloja el sitio de forma cifrada en tránsito.',
        'Autoridades competentes, cuando exista un requerimiento fundado y motivado conforme a la ley.',
        { text: 'No vendemos, rentamos ni intercambiamos tus datos personales con terceros para fines publicitarios.', bad: false },
      ],
    },
    {
      type: 'steps',
      title: '6. Cómo ejercer tus derechos ARCO',
      intro:
        'Tienes derecho a Acceder a tus datos, Rectificarlos si son inexactos, Cancelarlos cuando ya no sean necesarios y Oponerte a un tratamiento concreto. También puedes revocar tu consentimiento.',
      items: [
        {
          title: 'Manda tu solicitud',
          body: 'Escríbenos a hola@exygenlabs.com indicando cuál de los derechos quieres ejercer y sobre qué datos.',
        },
        {
          title: 'Acredita tu identidad',
          body: 'Necesitamos tu nombre, un correo de contacto y una identificación oficial, para no entregarle tus datos a alguien más. Si actúas por medio de representante, hace falta el documento que lo acredite.',
        },
        {
          title: 'Sé específico',
          body: 'Describe con claridad qué datos quieres consultar, corregir, cancelar o a qué tratamiento te opones. Si es rectificación, adjunta el documento que soporte el cambio.',
        },
        {
          title: 'Respondemos en plazo',
          body: 'Te contestamos en un máximo de 20 días hábiles si la solicitud procede, y de proceder se hace efectiva dentro de los 15 días hábiles siguientes. Los plazos pueden ampliarse una vez, avisándote la razón.',
          note: 'El ejercicio de estos derechos es gratuito; solo podrían cobrarse gastos de envío o reproducción documental.',
        },
      ],
    },
    {
      type: 'prose',
      title: '7. Conservación de los datos',
      paragraphs: [
        'Conservamos tus datos mientras tu cuenta esté activa y, después, durante el tiempo necesario para cumplir obligaciones legales, contables y fiscales, o para atender responsabilidades derivadas de la relación comercial.',
        'La información fiscal se conserva por el plazo que exige la legislación aplicable. Cumplidos esos plazos, los datos se eliminan o se anonimizan.',
        'Si cancelas tu cuenta, bloqueamos tus datos y los conservamos solo mientras subsista alguna obligación legal, tras lo cual se suprimen.',
      ],
    },
    {
      type: 'list',
      title: '8. Seguridad',
      items: [
        'El sitio opera bajo HTTPS: la información viaja cifrada entre tu navegador y nuestros servidores.',
        'Las contraseñas se almacenan con funciones de derivación criptográfica; nadie en Exygen Labs puede leerlas.',
        'No almacenamos números de tarjeta, códigos de seguridad ni NIP en nuestros sistemas.',
        'El acceso a los datos de clientes está restringido al personal que lo necesita para operar.',
        'Ningún sistema es infalible: si ocurriera una vulneración que afecte de forma significativa tus datos, te lo informaremos conforme a la ley.',
      ],
    },
    {
      type: 'prose',
      title: '9. Cookies y almacenamiento local',
      paragraphs: [
        'Usamos el almacenamiento local de tu navegador para recordar tu sesión, tu carrito, tu idioma, tu preferencia de tema y que ya aceptaste el aviso de uso en investigación. Sin eso, tendrías que volver a configurarlo en cada visita.',
        'Puedes borrar ese almacenamiento desde la configuración de tu navegador. Si lo haces, se cerrará tu sesión y se vaciará tu carrito.',
      ],
    },
    {
      type: 'prose',
      title: '10. Cambios a este aviso y ante quién reclamar',
      paragraphs: [
        'Podemos actualizar este aviso por cambios legales o por modificaciones en nuestros procesos. La versión vigente es la publicada en esta página, con su fecha de última revisión; los cambios sustanciales se anunciarán en el sitio.',
        'Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la autoridad competente en materia de protección de datos personales en México.',
      ],
    },
  ],
  related: [
    { to: '/info/terminos', title: 'Términos de servicio', desc: 'Condiciones de venta, uso RUO y responsabilidades.' },
    { to: '/info/soporte', title: 'Centro de soporte', desc: 'Accesos, facturación y problemas con tu cuenta.' },
  ],
};

export default page;
