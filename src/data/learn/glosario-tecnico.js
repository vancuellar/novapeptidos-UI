const page = {
  slug: 'glosario-tecnico',
  title: 'Vocabulario técnico: el idioma de un COA',
  subtitle: 'Los términos como aparecen en un certificado de análisis, en un artículo o en la etiqueta de un vial. Si buscas la versión sin jerga, empieza por el glosario simple.',
  badge: 'Referencia',
  updated: '19 de julio de 2026',
  sections: [
    {
      type: 'prose',
      paragraphs: [
        'Este glosario está escrito para quien ya se movió del "qué es esto" al "qué significa este número". Cada entrada explica el término y, cuando aplica, en qué parte del proceso lo vas a encontrar.',
      ],
    },
    {
      type: 'glossary',
      title: 'Química y estructura',
      items: [
        { term: 'Enlace peptídico', plain: 'La unión covalente entre el grupo carboxilo de un aminoácido y el grupo amino del siguiente, liberando una molécula de agua. Es lo que convierte aminoácidos sueltos en una cadena.', example: 'El enlace peptídico absorbe luz ultravioleta alrededor de 214–220 nm, y por eso los métodos de HPLC para péptidos detectan a esa longitud de onda.' },
        { term: 'Secuencia primaria', plain: 'El orden exacto de los aminoácidos en la cadena, escrito del extremo amino al extremo carboxilo. Define todo lo demás.', example: 'BPC-157 se describe como una secuencia de 15 aminoácidos derivada de una proteína del jugo gástrico.' },
        { term: 'Peso molecular (Da)', plain: 'La masa de una molécula en daltons. En péptidos de investigación suele ir de unos 500 Da a unos 5,000 Da.', example: 'Un péptido de 15 aminoácidos pesa típicamente entre 1,400 y 1,700 Da, según qué aminoácidos lo compongan.' },
        { term: 'Número CAS', plain: 'Identificador único que asigna el Chemical Abstracts Service a cada sustancia química. Sirve para no confundir compuestos que comparten nombre comercial.', example: 'Dos proveedores pueden llamar distinto al mismo compuesto, pero si el CAS coincide, es la misma molécula.' },
        { term: 'Contraión', plain: 'El ion que acompaña al péptido para que sea estable como sal sólida. Casi siempre acetato o trifluoroacetato (TFA).', example: 'Un vial de 10 mg de péptido con acetato como contraión contiene menos de 10 mg de péptido neto: parte del peso es la sal.' },
        { term: 'Amidación C-terminal', plain: 'Modificación química en el extremo final de la cadena que la protege de ser degradada por enzimas. Aparece en el nombre como "amidate" o "-NH2".', example: 'N-Acetyl Semax Amidate lleva dos modificaciones: acetilación en un extremo y amidación en el otro.' },
        { term: 'Análogo', plain: 'Molécula diseñada a partir de otra, con cambios deliberados en la secuencia para modificar su vida media, su afinidad o su estabilidad.', example: 'La semaglutida es un análogo del GLP-1 humano modificado para resistir la degradación enzimática.' },
      ],
    },
    {
      type: 'glossary',
      title: 'Análisis y control de calidad',
      items: [
        { term: 'RP-HPLC', plain: 'Cromatografía líquida de alta resolución en fase reversa. Separa los componentes de una muestra por su hidrofobicidad y es el método estándar para medir pureza de péptidos.', example: 'Una columna C18 de 250 × 4.6 mm con partícula de 5 µm y un gradiente agua/acetonitrilo es la configuración típica.' },
        { term: 'Pureza cromatográfica', plain: 'El porcentaje del área total de picos que corresponde al pico principal. Es lo que se reporta como "99%".', example: 'Pureza 99.2% significa que el pico del compuesto representa el 99.2% del área detectada, no que el vial tenga 99.2% de péptido en peso.' },
        { term: 'Contenido de péptido neto', plain: 'Cuánto del peso del polvo es realmente péptido, descontando sal, agua residual y contraión. Es un dato distinto de la pureza.', example: 'Un lote con 99% de pureza cromatográfica puede tener 80–85% de contenido neto de péptido.' },
        { term: 'Tiempo de retención', plain: 'Cuánto tarda un componente en salir de la columna. Es una huella característica en condiciones fijas.', example: 'Si el pico principal aparece a los 12.4 minutos en un lote y a los 9.1 en otro con el mismo método, algo cambió.' },
        { term: 'Resolución de picos', plain: 'Qué tan bien separados están dos picos vecinos. Si se encabalgan, la integración del área deja de ser confiable.', example: 'Una resolución menor a 1.5 entre el pico principal y una impureza hace que el porcentaje de pureza sea discutible.' },
        { term: 'LC-MS / espectrometría de masas', plain: 'Técnica que mide la masa de la molécula para confirmar que es la que dice ser. La pureza dice cuánto; la masa dice qué.', example: 'Un lote puede ser 99% puro de la molécula equivocada. Sin confirmación de identidad, la pureza sola no prueba nada.' },
        { term: 'COA (certificado de análisis)', plain: 'Documento que reporta los resultados analíticos de un lote específico: identidad, pureza, método y fecha.', example: 'Un COA sin número de lote no es un COA: es publicidad. Cada lote debe tener el suyo.' },
        { term: 'Lote', plain: 'La unidad de producción a la que corresponden los resultados analíticos. Todo lo que se fabricó junto comparte lote.', example: 'Si compras dos viales del mismo lote, el COA aplica a los dos. Si son lotes distintos, son dos COA distintos.' },
        { term: 'Impureza de deleción', plain: 'Cadena a la que le falta uno o más aminoácidos porque un paso de la síntesis no se completó. Es la impureza más común en síntesis en fase sólida.', example: 'En un péptido de 30 aminoácidos, un rendimiento de 99% por acoplamiento deja alrededor de 74% de cadena completa.' },
      ],
    },
    {
      type: 'glossary',
      title: 'Manejo y preparación',
      items: [
        { term: 'Liofilizado', plain: 'Secado por congelación al vacío. El agua pasa de hielo a vapor sin pasar por líquido, y queda un polvo estable que puede guardarse meses.', example: 'Un vial liofilizado a −20 °C se mantiene estable durante años; el mismo compuesto reconstituido dura semanas.' },
        { term: 'Reconstitución', plain: 'Devolver el polvo liofilizado a solución agregando un diluyente estéril.', example: 'Un vial de 10 mg con 2 mL de diluyente queda a 5 mg/mL, es decir 50 mcg por cada unidad de una jeringa U-100.' },
        { term: 'Agua bacteriostática', plain: 'Agua estéril con 0.9% de alcohol bencílico como conservador, lo que permite pinchar el vial varias veces sin que prolifere contaminación.', example: 'El agua estéril simple no lleva conservador: sirve para un solo uso, no para un vial multidosis.' },
        { term: 'Concentración', plain: 'Cuánto compuesto hay por unidad de volumen, normalmente en mg/mL o mcg/mL.', example: '5 mg en 2 mL da 2.5 mg/mL, o 2,500 mcg/mL.' },
        { term: 'Jeringa U-100', plain: 'Jeringa de insulina graduada en 100 unidades por mililitro. Una unidad equivale a 0.01 mL.', example: 'A una concentración de 2,500 mcg/mL, 10 unidades corresponden a 0.1 mL, es decir 250 mcg.' },
        { term: 'Vial multidosis', plain: 'Vial pensado para extraerse varias veces, con septo de goma que se resella al retirar la aguja.', example: 'Nunca se destapa: se desinfecta el septo con alcohol y se pincha a través de él.' },
        { term: 'Degradación', plain: 'Pérdida de integridad del compuesto por temperatura, luz, ciclos de congelación o contaminación.', example: 'Turbidez, color amarillento o partículas visibles en una solución que era transparente son señales de que el material ya no sirve.' },
      ],
    },
    {
      type: 'glossary',
      title: 'Farmacología y estudio',
      items: [
        { term: 'Receptor', plain: 'Proteína a la que se une el compuesto para desencadenar una respuesta en la célula. Determina qué hace y dónde.', example: 'Los agonistas de GLP-1 actúan sobre el receptor GLP-1R; los secretagogos de GH actúan sobre GHSR o sobre el receptor de GHRH.' },
        { term: 'Agonista', plain: 'Molécula que se une a un receptor y lo activa, imitando la señal natural.', example: 'La tirzepatida se describe como agonista dual: actúa sobre los receptores de GLP-1 y de GIP.' },
        { term: 'Vida media', plain: 'El tiempo que tarda la concentración en caer a la mitad. Determina cada cuánto tendría sentido repetir en un diseño experimental.', example: 'Compuestos con vida media de horas se estudian con frecuencias diarias; los de días, con frecuencia semanal.' },
        { term: 'Biodisponibilidad', plain: 'Qué fracción del compuesto llega intacta a la circulación por una vía determinada.', example: 'La mayoría de los péptidos tienen biodisponibilidad oral muy baja porque las proteasas digestivas los rompen antes.' },
        { term: 'Secretagogo', plain: 'Compuesto que estimula la secreción de una hormona propia en lugar de aportar la hormona directamente.', example: 'Ipamorelin no es hormona de crecimiento: promueve que la hipófisis libere la suya.' },
        { term: 'Sinergia', plain: 'Cuando dos compuestos combinados producen un efecto mayor que la suma de sus efectos por separado, normalmente por actuar en vías complementarias.', example: 'BPC-157 y TB-500 se estudian juntos porque uno se asocia a angiogénesis y el otro a migración celular.' },
        { term: 'In vitro / in vivo', plain: 'In vitro es en cultivo celular o en tubo; in vivo es en un organismo vivo. Un resultado in vitro no predice automáticamente el otro.', example: 'Muchos compuestos con datos in vitro prometedores no han mostrado el mismo efecto en modelos in vivo.' },
        { term: 'Preclínico', plain: 'Etapa de investigación anterior a los ensayos en humanos: modelos celulares y animales.', example: 'La mayoría de los péptidos de este catálogo tienen evidencia preclínica, no ensayos clínicos de fase III.' },
        { term: 'RUO', plain: 'Research Use Only. La etiqueta que indica que el material es exclusivamente para investigación: no para consumo humano ni animal, ni para diagnóstico o tratamiento.', example: 'Todo lo que vende Exygen Labs es RUO, sin excepción.' },
      ],
    },
    {
      type: 'cards',
      title: 'Sigue leyendo',
      items: [
        { to: '/aprende/terminos-sin-jerga', title: 'Términos sin jerga', body: 'Los mismos conceptos, explicados sin jerga y con ejemplos numéricos.', cta: 'Abrir' },
        { to: '/aprende/que-significa-99-por-ciento', title: 'Pureza por HPLC', body: 'Cómo se mide de verdad la pureza y qué preguntas hacerle a un proveedor.', cta: 'Abrir' },
        { to: '/aprende/como-verificamos-cada-lote', title: 'Control de calidad', body: 'El recorrido de un lote desde la síntesis hasta la liberación.', cta: 'Abrir' },
        { to: '/compuestos', title: 'Fichas de compuestos', body: 'Ficha de referencia de cada compuesto del catálogo.', cta: 'Abrir' },
      ],
    },
  ],
  related: [
    { to: '/aprende/reconstitucion-paso-a-paso', title: 'Cómo reconstituir', desc: 'El procedimiento completo, paso a paso y con tiempos.' },
    { to: '/calculadora', title: 'Calculadora de reconstitución', desc: 'Convierte mg, mL y unidades sin que tengas que hacer la cuenta.' },
  ],
};

export default page;
