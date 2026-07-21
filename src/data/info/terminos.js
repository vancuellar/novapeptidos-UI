// Términos de servicio. BORRADOR SUSTANTIVO — Christian es abogado y debe
// revisarlo antes de darlo por definitivo (ver nota en el continuation).
const page = {
  slug: 'terminos',
  title: 'Términos de servicio',
  subtitle:
    'Las condiciones bajo las que Exygen Labs vende material de investigación y las obligaciones que asumen ambas partes al hacer una compra.',
  badge: 'Legal',
  updated: '20 de julio de 2026',
  sections: [
    {
      type: 'callout',
      tone: 'warn',
      title: 'Lo esencial antes de seguir',
      body:
        'Todo lo que vendemos es material para investigación (RUO). No es medicamento, no es suplemento y no está destinado a consumo humano ni animal. Para comprar debes ser mayor de edad y adquirirlo con fines de investigación. Al usar el sitio o comprar, aceptas estos términos.',
    },
    {
      type: 'prose',
      title: '1. Quiénes somos y qué alcance tienen estos términos',
      paragraphs: [
        'Exygen Labs ("nosotros") opera el sitio exygenlabs.com y comercializa péptidos y compuestos destinados exclusivamente a investigación científica. Estos términos regulan el acceso al sitio, la creación de una cuenta y la compra de cualquier producto del catálogo.',
        'Al navegar el sitio, crear una cuenta o realizar un pedido, manifiestas que leíste y aceptas estos términos y nuestro Aviso de Privacidad. Si no estás de acuerdo con alguna parte, no uses el sitio ni realices compras.',
        'Estos términos se complementan con nuestras políticas de envíos, devoluciones y calidad, que forman parte integral del acuerdo y están publicadas en este mismo sitio.',
      ],
    },
    {
      type: 'list',
      title: '2. Uso exclusivo en investigación (RUO)',
      intro:
        'Esta es la condición central de la relación comercial y no admite excepciones ni interpretaciones flexibles.',
      items: [
        'Todos los productos se venden con la calidad de "para uso exclusivo en investigación" (Research Use Only, RUO), destinados a trabajo de laboratorio y ensayos in vitro.',
        'Ningún producto del catálogo es un medicamento, un dispositivo médico, un alimento, un suplemento alimenticio ni un cosmético de uso final.',
        'Ningún producto está destinado ni autorizado para consumo humano o animal, ni para diagnóstico, tratamiento, cura, mitigación o prevención de enfermedad alguna.',
        'No proporcionamos, en ningún canal, dosis, pautas de administración, protocolos de uso en personas ni consejo médico. Nuestro soporte se limita al manejo del material en laboratorio.',
        { text: 'Queda prohibido revender, redistribuir o reetiquetar los productos como aptos para consumo humano, como medicamento o como suplemento.', bad: true },
        { text: 'Queda prohibido usar los productos en seres humanos o animales, así como facilitarlos a terceros para ese fin.', bad: true },
      ],
    },
    {
      type: 'prose',
      title: '3. Quién puede comprar',
      paragraphs: [
        'Para crear una cuenta o realizar un pedido debes ser mayor de 18 años y tener capacidad legal para contratar. Al comprar, declaras que adquieres el material con fines de investigación y que cuentas con la formación, las instalaciones y las condiciones adecuadas para manejarlo con seguridad.',
        'Declaras asimismo que el uso que darás a los productos cumple con la normativa aplicable en tu jurisdicción, incluidas las disposiciones sanitarias, de bioseguridad y de manejo de residuos que correspondan.',
        'Nos reservamos el derecho de rechazar, limitar o cancelar cualquier pedido cuando existan indicios razonables de que el material se destinará a un uso distinto del declarado, cuando la información proporcionada sea falsa o incompleta, o cuando la operación no pueda verificarse.',
      ],
    },
    {
      type: 'list',
      title: '4. Tu cuenta',
      items: [
        'Eres responsable de la veracidad de los datos que registres y de mantenerlos actualizados.',
        'Eres responsable de resguardar tus credenciales y de toda actividad realizada desde tu cuenta.',
        'Debes avisarnos de inmediato si detectas un acceso no autorizado.',
        'Podemos suspender o cancelar una cuenta que incumpla estos términos, que registre información falsa o que se use para actividades ilícitas.',
        'Una cuenta es personal e intransferible; no puede cederse ni compartirse.',
      ],
    },
    {
      type: 'prose',
      title: '5. Precios, disponibilidad y formación del contrato',
      paragraphs: [
        'Los precios se expresan en pesos mexicanos (MXN) e incluyen los impuestos aplicables, salvo indicación distinta. El costo de envío se cotiza por separado y se muestra antes de confirmar la compra.',
        'Los precios y la disponibilidad pueden cambiar sin previo aviso. El precio aplicable es el vigente al momento de confirmar el pedido. Si por un error evidente de sistema se publica un precio manifiestamente incorrecto, podremos cancelar el pedido y reembolsar el importe íntegro, informándote la razón.',
        'La confirmación del pedido no implica por sí sola la aceptación definitiva: el contrato se perfecciona cuando verificamos el pago y confirmamos el pedido. Si no podemos surtirlo, te lo informamos y reembolsamos.',
        'Los descuentos por volumen y los códigos de distribuidor no se acumulan entre sí: se aplica siempre el mayor de los dos.',
      ],
    },
    {
      type: 'list',
      title: '6. Pagos',
      items: [
        'Aceptamos tarjeta de crédito o débito y transferencia SPEI. No manejamos pago contra entrega.',
        'No almacenamos números de tarjeta en nuestros servidores: el cobro lo procesa el proveedor de pago correspondiente.',
        'Un pedido pagado por SPEI queda apartado cuando la transferencia se refleja; fuera de horario bancario esto puede ocurrir hasta el siguiente día hábil.',
        'Emitimos factura electrónica (CFDI) a solicitud, con los datos fiscales que nos proporciones dentro del mes de la compra.',
        { text: 'Nunca te pediremos datos completos de tarjeta, NIP ni contraseñas por WhatsApp, correo o llamada.', bad: false },
      ],
    },
    {
      type: 'prose',
      title: '7. Envíos, devoluciones y riesgo',
      paragraphs: [
        'Los tiempos, coberturas y condiciones de entrega se detallan en nuestra política de envíos. Los plazos son estimados de la paquetería y no constituyen una garantía de entrega en fecha determinada.',
        'Nuestra política de devoluciones detalla qué cubrimos, en qué plazos y con qué evidencia. En términos generales, y por la naturaleza del material, las ventas son finales, con excepciones definidas para daño en tránsito, producto equivocado, pedido incompleto y material fuera de especificación.',
        'Es tu responsabilidad proporcionar una dirección de entrega correcta y completa. Los costos derivados de una entrega fallida por datos incorrectos o ausencia reiterada pueden trasladarse al cliente.',
      ],
    },
    {
      type: 'prose',
      title: '8. Calidad, análisis y alcance de lo que garantizamos',
      paragraphs: [
        'Cada lote se analiza para verificar identidad y pureza, y el análisis correspondiente está disponible a solicitud con el número de lote impreso en el vial. Lo que garantizamos es que el material entregado corresponde al compuesto y a la especificación publicada para ese lote.',
        'No garantizamos ningún resultado experimental. La idoneidad del material para un diseño experimental concreto, así como la interpretación de los resultados, corresponden exclusivamente al investigador.',
        'Si un análisis independiente contradice nuestra especificación para un lote, compártenoslo con el número de lote: lo revisamos y, de confirmarse, reponemos o reembolsamos.',
      ],
    },
    {
      type: 'prose',
      title: '9. Limitación de responsabilidad',
      paragraphs: [
        'En la medida permitida por la legislación aplicable, nuestra responsabilidad frente a ti por cualquier reclamación relacionada con un producto se limita al importe efectivamente pagado por ese producto.',
        'No respondemos por daños derivados del uso indebido del material, de su empleo en humanos o animales, de su manejo o conservación inadecuados después de la entrega, ni del incumplimiento por tu parte de la normativa aplicable.',
        'Nada en estos términos excluye o limita la responsabilidad que no pueda excluirse conforme a la ley, incluidos los derechos que la legislación de protección al consumidor reconoce de manera irrenunciable.',
      ],
    },
    {
      type: 'list',
      title: '10. Propiedad intelectual y uso del sitio',
      items: [
        'La marca Exygen Labs, el logotipo, los textos, las fotografías, las guías y el diseño del sitio son de nuestra propiedad o los usamos con autorización.',
        'Puedes consultar y compartir el contenido para uso personal o académico, citando la fuente. No puedes reproducirlo con fines comerciales sin autorización escrita.',
        { text: 'No está permitido extraer datos de forma automatizada, replicar el catálogo, ni intentar vulnerar la seguridad del sitio o el acceso a cuentas ajenas.', bad: true },
      ],
    },
    {
      type: 'prose',
      title: '11. Modificaciones, ley aplicable y contacto',
      paragraphs: [
        'Podemos actualizar estos términos. La versión vigente es la publicada en esta página, con su fecha de última revisión. Los cambios sustanciales se anunciarán en el sitio. Las compras se rigen por los términos vigentes al momento de realizarlas.',
        'Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad de México, sin perjuicio de los derechos que la legislación de protección al consumidor reconozca al comprador, incluida la posibilidad de acudir a la Procuraduría Federal del Consumidor (PROFECO).',
        'Para cualquier aclaración sobre estos términos, escríbenos a hola@exygenlabs.com.',
      ],
    },
  ],
  related: [
    { to: '/info/privacidad', title: 'Aviso de privacidad', desc: 'Qué datos tratamos, para qué y cómo ejercer tus derechos ARCO.' },
    { to: '/info/devoluciones', title: 'Devoluciones e incidencias', desc: 'Qué cubrimos, plazos y evidencia necesaria.' },
  ],
};

export default page;
