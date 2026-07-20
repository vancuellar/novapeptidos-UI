// Monografías largas por producto, en un archivo aparte a propósito:
// `fallbackCatalog.js` lo genera un script del sistema de precios y se
// sobrescribe. Esto se mantiene a mano y se une por slug en ProductDetail.
//
// Reglas de contenido (RUO, no negociables): nada de dosis, nada de pautas de
// administración, ninguna afirmación clínica o terapéutica, ninguna sugerencia
// de uso en humanos o animales. Se describe qué es el compuesto, qué se
// investiga con él y cómo se maneja en el laboratorio.

const monographs = {
  retatrutida: {
    tagline: 'Triple agonista GIP / GLP-1 / glucagón',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Retatrutida es un péptido sintético de cadena única de la clase de los agonistas multireceptor de incretinas. Su rasgo distintivo es que actúa sobre tres receptores a la vez: el de GLP-1, el de GIP y el de glucagón. Esa arquitectura de tres frentes la separa de los agonistas simples y dobles que la precedieron, y es la razón del interés que ha despertado en investigación metabólica.',
          'La molécula incorpora modificaciones de acilación pensadas para prolongar su permanencia en circulación mediante unión reversible a albúmina, un recurso de diseño farmacocinético habitual en esta familia de péptidos.',
        ],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: [
          'Cada rama receptora modula circuitos distintos, y eso es justo lo que la vuelve útil como herramienta. La vía GLP-1 se estudia en señalización de saciedad a nivel hipotalámico y en secreción de insulina dependiente de glucosa. La vía GIP se investiga por su papel en el manejo de lípidos y la sensibilidad del tejido adiposo. La vía del glucagón aporta una dimensión de gasto energético y metabolismo hepático que los análogos anteriores no tenían.',
          'Aparece con frecuencia en modelos de homeostasis energética, señalización de receptores acoplados a proteína G, metabolismo hepático de lípidos, adipogénesis y estudios comparativos entre agonistas simples, duales y triples. Para grupos que trabajan en farmacología de incretinas funciona como referencia para separar la contribución de cada receptor.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Se suministra liofilizada, formato que preserva la integridad de la cadena durante el transporte y el almacenamiento. El vial sellado se conserva en frío, seco y al abrigo de la luz.',
          'La reconstitución se hace con un diluyente estéril adecuado, dejándolo escurrir por la pared interna del vial y permitiendo que el polvo se disuelva solo, sin agitación ni vórtice: los péptidos acilados son propensos a agregarse si se les somete a estrés mecánico. Ya en solución, la ventana de estabilidad se acorta mucho y el material se mantiene refrigerado.',
        ],
      },
    ],
  },

  'nad-plus': {
    tagline: 'Coenzima central del metabolismo energético',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'NAD+ (nicotinamida adenina dinucleótido) no es un péptido sino una coenzima de dinucleótido de piridina, presente en toda célula viva y central en la bioquímica del metabolismo energético. Está en catálogos de investigación por su doble papel: cofactor obligado de cientos de reacciones de óxido-reducción y sustrato consumible de una familia entera de enzimas de señalización.',
        ],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: [
          'Como transportador redox, el par NAD+/NADH acopla la glucólisis, el ciclo del ácido cítrico y la fosforilación oxidativa: sin él, la producción mitocondrial de ATP se detiene. Como sustrato, NAD+ lo consumen las sirtuinas (desacetilasas implicadas en regulación epigenética y respuesta al estrés metabólico), las PARP —enzimas de reparación de ADN— y CD38. Por eso su nivel intracelular no es estático: resulta del equilibrio entre síntesis de novo, vía de rescate desde nicotinamida y la demanda de las enzimas que lo consumen.',
          'Las líneas más activas son biología del envejecimiento celular, función mitocondrial, respuesta al daño de ADN, regulación circadiana mediada por sirtuinas, metabolismo hepático y modelos de senescencia. El descenso de NAD+ tisular con la edad documentado en varios modelos animales lo ha vuelto un eje del campo de la longevidad experimental.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Se entrega liofilizado. NAD+ es notablemente sensible a la hidrólisis y a condiciones alcalinas, así que la protección frente a la humedad importa más aquí que en un péptido común. Vial sellado, en frío y sin luz.',
          'La reconstitución se hace con diluyente estéril y sin agitación vigorosa. Las soluciones acuosas de NAD+ tienen vida útil más corta que la del polvo: conviene prepararlas cerca del momento de uso y mantenerlas refrigeradas.',
        ],
      },
    ],
  },

  'klow-bpc-ghk-cu-tb-500-kpv': {
    tagline: 'Mezcla de cuatro péptidos: GHK-Cu, BPC-157, TB-500 y KPV',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'KLOW es una formulación combinada de cuatro péptidos de investigación bien caracterizados, presentados juntos en un solo vial liofilizado: GHK-Cu, BPC-157, TB-500 y KPV. El acrónimo viene de las iniciales de sus componentes, y el péptido de cobre es el que domina la proporción.',
        ],
      },
      {
        title: 'Por qué se combinan',
        paragraphs: [
          'La lógica de la mezcla es que cada componente interviene en una etapa distinta del mismo proceso biológico, lo que la vuelve útil para estudiar interacciones entre vías en lugar de un solo eje aislado.',
          'GHK-Cu es un tripéptido con afinidad por el cobre que se investiga en remodelado de matriz extracelular, expresión de colágeno y modulación de genes asociados a reparación tisular. BPC-157 es un pentadecapéptido derivado de una secuencia gástrica, estudiado en angiogénesis y señalización de factores de crecimiento. TB-500 corresponde a la región activa de la timosina beta-4 y se investiga por su interacción con la actina, la migración celular y la organización del citoesqueleto. KPV es el tripéptido C-terminal de la α-MSH, estudiado como modulador de vías inflamatorias, incluida la señalización NF-κB.',
          'En conjunto se emplea en modelos de reparación tisular, dinámica inflamatoria, migración celular y estudios de sinergia peptídica, donde la pregunta es si el efecto combinado difiere de la suma de las partes.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'La presencia de GHK-Cu le da a la mezcla un color azul-verdoso característico al reconstituirse: es el complejo cobre-péptido y es normal, no es señal de contaminación.',
          'El vial liofilizado se conserva sellado, en frío y al abrigo de la luz. La reconstitución con diluyente estéril debe ser suave y sin agitar: tanto el complejo de cobre como las cadenas peptídicas son sensibles al estrés mecánico. La solución se guarda en refrigeración.',
        ],
      },
    ],
  },

  tirzepatida: {
    tagline: 'Agonista dual GIP / GLP-1',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Tirzepatida es un péptido sintético de 39 aminoácidos diseñado como agonista dual: activa el receptor del polipéptido insulinotrópico dependiente de glucosa (GIP) y el del péptido similar al glucagón tipo 1 (GLP-1). Su esqueleto deriva de la secuencia nativa de GIP, modificada para darle actividad cruzada sobre GLP-1, e incorpora una cadena de ácido graso unida por un enlazador que promueve la unión reversible a albúmina y alarga su permanencia en circulación.',
        ],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: [
          'El interés se concentra en el agonismo desequilibrado: la molécula no activa ambos receptores con la misma potencia ni recluta los mismos efectores intracelulares. Eso la convierte en una sonda valiosa para estudiar cómo la arquitectura de un ligando determina el reclutamiento diferencial de proteína G frente a β-arrestina, y cómo eso se traduce en internalización y resensibilización del receptor.',
          'Aparece en modelos de señalización de células beta pancreáticas, captación de glucosa dependiente de insulina, biología del adipocito, metabolismo lipídico hepático y circuitos hipotalámicos del apetito. Para quien compara la clase completa de incretinas, ocupa el peldaño intermedio entre los agonistas simples de GLP-1 y los triples agonistas más recientes.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Polvo liofilizado en vial sellado, el formato que maximiza la estabilidad frente a hidrólisis y agregación. Almacenar en frío, protegido de la luz y de la humedad ambiental.',
          'Reconstituir con diluyente estéril dejándolo escurrir por la pared interna del vial, sin vórtice: la agitación puede inducir agregación en péptidos acilados. Una vez reconstituido, refrigerar; su ventana de estabilidad es mucho menor que la del liofilizado.',
        ],
      },
    ],
  },

  semaglutida: {
    tagline: 'Análogo de GLP-1 de acción prolongada',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Semaglutida es un análogo peptídico del péptido similar al glucagón tipo 1 (GLP-1), la incretina que liberan las células L intestinales tras la ingesta. Parte de la secuencia del GLP-1 humano nativo con tres modificaciones: sustitución del residuo de alanina en posición 8 por ácido α-aminoisobutírico, que la protege de la degradación por DPP-4; intercambio de lisina por arginina en posición 34; y conjugación de una cadena de ácido graso a través de un espaciador, que le da alta afinidad por la albúmina sérica.',
          'Esas tres modificaciones la vuelven un caso de estudio clásico de ingeniería peptídica: cada cambio responde a un problema concreto de estabilidad o farmacocinética, y juntos convierten un péptido nativo de vida media de minutos en una molécula de acción prolongada.',
        ],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: [
          'El receptor de GLP-1 es un GPCR de clase B acoplado a Gs cuya activación eleva el AMP cíclico intracelular. Las áreas de investigación incluyen secreción de insulina dependiente de glucosa en islotes pancreáticos, supervivencia y proliferación de células beta, motilidad gastrointestinal, señalización de saciedad en núcleos hipotalámicos y del tronco encefálico, y más recientemente vías de neuroinflamación y expresión del receptor GLP-1 en tejidos extrapancreáticos.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Se suministra liofilizada; así es estable por periodos prolongados si se mantiene sellada, en frío, seca y sin exposición a la luz.',
          'Reconstituir con diluyente estéril, incorporándolo con suavidad y sin agitar, para evitar la formación de agregados fibrilares a la que son propensos los análogos de GLP-1 acilados. La solución reconstituida se conserva refrigerada.',
        ],
      },
    ],
  },

  'bpc-157': {
    tagline: 'Pentadecapéptido de origen gástrico',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'BPC-157 es un pentadecapéptido sintético de 15 aminoácidos cuya secuencia corresponde a un fragmento parcial de la proteína BPC (Body Protection Compound), identificada originalmente en jugo gástrico humano. A diferencia de muchos péptidos de investigación, presenta una estabilidad inusual en medios acuosos y ácidos —atribuida justamente a su origen gástrico—, lo que ha facilitado su uso experimental en modelos muy variados.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'El interés se concentra en su comportamiento en modelos de reparación tisular. La literatura preclínica lo asocia con la modulación de la vía del óxido nítrico, con la regulación al alza del receptor VEGFR2 y con procesos angiogénicos, es decir, formación de nueva microvasculatura. También se ha estudiado su interacción con la vía FAK-paxilina, relevante para adhesión y migración celular, y su influencia sobre factores de crecimiento locales.',
          'Un rasgo recurrente en la bibliografía es que sus efectos en modelos animales parecen sistémicos aunque la señal se origine localmente, lo que ha generado hipótesis sobre un eje de señalización entre el tracto gastrointestinal y otros tejidos. Es uno de los péptidos de investigación con mayor volumen de publicaciones preclínicas independientes de la última década.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Polvo liofilizado en vial sellado. Es comparativamente robusto frente a otros péptidos, pero las prácticas estándar siguen aplicando: frío, protección frente a humedad y luz, y manipulación con material estéril.',
          'Reconstituir con diluyente estéril vertido lentamente sobre la pared del vial, sin agitación mecánica. Refrigerar la solución y manejarla bajo técnica aséptica.',
        ],
      },
    ],
  },

  'tb-500': {
    tagline: 'Fragmento activo de la timosina beta-4',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'TB-500 es un péptido sintético que reproduce la región biológicamente activa de la timosina beta-4, una proteína de 43 aminoácidos ampliamente distribuida en tejidos y fluidos de mamíferos. Concretamente corresponde al dominio de unión a actina, la secuencia mínima responsable de la mayor parte de las actividades observadas con la proteína completa. Al ser un fragmento más corto, ofrece ventajas prácticas de síntesis, costo y difusión en tejido.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'El mecanismo central es su interacción con la G-actina. La timosina beta-4 es el principal secuestrador intracelular de actina monomérica en células de mamífero y, por lo tanto, regula el equilibrio dinámico entre actina libre y actina polimerizada en filamentos. Ese equilibrio gobierna la reorganización del citoesqueleto y, con ella, la motilidad celular, la extensión de lamelipodios, la migración direccional y el remodelado tisular.',
          'Sobre esa base se ha explorado su papel en angiogénesis, migración de células endoteliales y queratinocitos, modulación de la respuesta inflamatoria y modelos de formación de tejido cicatricial. Se investiga con frecuencia junto a BPC-157, porque ambos actúan en etapas complementarias del mismo proceso: esa es la base de las mezclas tipo KLOW.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Se presenta liofilizado. Vial sellado en frío, seco y protegido de la luz.',
          'Reconstituir con diluyente estéril añadido con suavidad por la pared del vial, evitando agitar o someterlo a vórtice. Mantener la solución refrigerada y manipularla con técnica estéril.',
        ],
      },
    ],
  },

  epithalon: {
    tagline: 'Tetrapéptido bioregulador (AEDG)',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Epithalon es un tetrapéptido sintético de secuencia Ala-Glu-Asp-Gly (AEDG), desarrollado dentro del programa soviético y después ruso de bioreguladores peptídicos dirigido por Vladimir Khavinson. Se concibió como análogo sintético de bajo peso molecular de la epitalamina, un extracto de glándula pineal, y es el más estudiado y difundido de toda la familia de bioreguladores cortos.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'El eje que ha impulsado su investigación es su relación propuesta con la telomerasa: en trabajos con cultivos de fibroblastos humanos se ha descrito un aumento de actividad de la transcriptasa inversa de telomerasa asociado a la exposición al péptido, con la hipótesis consiguiente sobre mantenimiento de la longitud telomérica y capacidad replicativa celular.',
          'Un segundo eje, característico de la escuela de Khavinson, es el modelo de regulación epigenética directa: la propuesta de que estos péptidos cortos interactúan con regiones específicas de ADN y modulan la expresión génica. Conviene decirlo con claridad: ese mecanismo sigue siendo objeto de debate y de verificación independiente. Un tercer eje se relaciona con la función pineal y los ritmos circadianos.',
          'Aparece en estudios de senescencia replicativa en cultivo, biología del telómero, modelos de envejecimiento en roedores, ritmos circadianos y trabajos sobre la familia completa de bioreguladores y su especificidad tisular.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Al ser un tetrapéptido corto y sin modificaciones, es relativamente estable liofilizado, aunque las cadenas cortas son sensibles a la humedad. Vial sellado, en frío, seco y protegido de la luz.',
          'Reconstituir con diluyente estéril incorporado con suavidad. Refrigerar la solución.',
        ],
      },
    ],
  },
};

export const monographFor = (slug) => monographs[slug] || null;
export default monographs;
