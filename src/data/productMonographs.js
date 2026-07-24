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

  // ===== Tanda 2 (2026-07-20) =====

  ipamorelin: {
    tagline: 'Pentapéptido secretagogo, agonista selectivo de GHSR',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Ipamorelin es un pentapéptido sintético de la familia de los secretagogos de hormona de crecimiento. Actúa como agonista del receptor de secretagogo de GH (GHSR-1a), el mismo receptor al que se une la grelina.',
          'Su rasgo distintivo frente a los secretagogos más antiguos —GHRP-2, GHRP-6, hexarelina— es la selectividad. En los modelos publicados, Ipamorelin estimula la vía de GH sin el efecto cruzado marcado sobre cortisol, prolactina y ACTH que caracteriza a la generación anterior. Esa limpieza de perfil es justamente lo que lo volvió una herramienta de referencia: permite estudiar el eje somatotrópico sin arrastrar variables endocrinas ajenas.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'Aparece en modelos de pulsatilidad de la hormona de crecimiento, señalización del receptor GHSR-1a, regulación del eje GH/IGF-1 y estudios de motilidad gastrointestinal, donde la señalización de grelina también participa.',
          'Se investiga con frecuencia junto a un análogo de GHRH como CJC-1295, porque ambos actúan por vías receptoras distintas y complementarias: uno amplifica el pulso y el otro aumenta su amplitud. Esa combinación es la base de los stacks del eje somatotrópico.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Polvo liofilizado en vial sellado. Al ser una cadena corta es razonablemente estable en seco, pero sensible a la humedad. Conservar en frío, seco y protegido de la luz.',
          'Reconstituir con diluyente estéril vertido por la pared del vial, sin agitar. Refrigerar la solución.',
        ],
      },
    ],
  },

  'cjc-1295-sin-dac': {
    tagline: 'Análogo de GHRH sin DAC (Modified GRF 1-29)',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'CJC-1295 sin DAC —también documentado como Modified GRF (1-29)— es un análogo sintético de los primeros 29 aminoácidos de la hormona liberadora de hormona de crecimiento, la fracción que concentra la actividad biológica de la molécula nativa. Incorpora cuatro sustituciones de aminoácidos que la protegen de la degradación por DPP-4 y aumentan su estabilidad frente al fragmento natural.',
          '"Sin DAC" significa que carece del Drug Affinity Complex, el enlazador que en la versión con DAC se une de forma covalente a la albúmina. Sin ese enlazador, la vida media es corta y la señal se parece mucho más a un pulso fisiológico que a una exposición sostenida.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'Se usa para estudiar la señalización del receptor de GHRH y su acoplamiento a la vía del AMP cíclico en la hipófisis anterior, así como la naturaleza pulsátil de la secreción de hormona de crecimiento. Precisamente por su vida media corta es la herramienta preferida cuando el diseño experimental requiere respetar el patrón de pulsos en lugar de aplanarlo.',
          'La comparación directa entre la versión con DAC y sin DAC es un experimento clásico en farmacología del eje somatotrópico: mismo receptor, misma señal, duración de exposición radicalmente distinta.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizado en vial sellado. Conservar en frío, seco y sin luz; es más sensible que un péptido corto por su longitud de cadena.',
          'Reconstituir con diluyente estéril de forma suave, sin vórtice. Mantener la solución refrigerada y protegida de ciclos de congelado y descongelado.',
        ],
      },
    ],
  },

  'ghk-cu': {
    tagline: 'Tripéptido de cobre (Gly-His-Lys)',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'GHK-Cu es el complejo formado por el tripéptido Gly-His-Lys y un ion de cobre (II). El péptido se aisló originalmente del plasma humano, donde su concentración desciende de manera marcada con la edad, y su altísima afinidad por el cobre es lo que define su comportamiento: no es un péptido que "lleve" cobre, sino un complejo cobre-péptido con actividad propia.',
          'Ese complejo es responsable del color azul-verdoso característico que aparece al reconstituirlo. Es normal y es, de hecho, la señal visual de que el complejo está formado.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'Es uno de los péptidos con más literatura en remodelado de matriz extracelular. Se investiga por su influencia sobre la expresión de colágeno y elastina, sobre metaloproteinasas de matriz y sus inhibidores, y sobre el equilibrio entre síntesis y degradación de tejido conectivo.',
          'Un segundo eje es el transcriptómico: hay trabajos que describen cambios amplios en perfiles de expresión génica en cultivos expuestos al complejo, lo que lo ha convertido en objeto de estudio en biología de la piel, angiogénesis, folículo piloso y modelos de senescencia. También se estudia su papel como transportador y modulador de la homeostasis del cobre, un metal esencial en varias metaloenzimas.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizado en vial sellado, de color azulado. Conservar en frío y protegido de la luz: los complejos de cobre son fotosensibles.',
          'Reconstituir con diluyente estéril de forma muy suave; el complejo cobre-péptido es sensible al estrés mecánico y a los cambios bruscos de pH. La solución se guarda refrigerada y al abrigo de la luz.',
        ],
      },
    ],
  },

  'pt-141': {
    tagline: 'Bremelanotida, agonista de receptores de melanocortina',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'PT-141, también documentado como bremelanotida, es un heptapéptido cíclico derivado de la Melanotan II, que a su vez deriva de la α-MSH. En su desarrollo se eliminó la parte de la estructura responsable de la actividad pigmentaria dominante, y lo que quedó fue una molécula con afinidad principalmente por los receptores de melanocortina MC3R y MC4R.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'El sistema de melanocortinas es uno de los ejes de señalización más ramificados del sistema nervioso central: participa en la regulación del apetito, el gasto energético, la respuesta inflamatoria, la pigmentación y circuitos de conducta. PT-141 se investiga como herramienta para diseccionar la contribución específica de MC3R y MC4R dentro de ese entramado.',
          'Aparece en modelos de señalización central de melanocortinas, estudios de receptores acoplados a proteína G, circuitos hipotalámicos y trabajos de farmacología comparada frente a otros agonistas de la familia. A diferencia de Melanotan II, su perfil de unión permite estudiar las vías centrales con menor interferencia del eje pigmentario.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizado en vial sellado. Por ser un péptido cíclico es relativamente estable en seco. Conservar en frío, seco y sin exposición a la luz.',
          'Reconstituir con diluyente estéril sin agitación vigorosa; refrigerar la solución.',
        ],
      },
    ],
  },

  'melanotan-2': {
    tagline: 'Análogo cíclico de α-MSH, agonista no selectivo de melanocortinas',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Melanotan II es un análogo sintético cíclico de la hormona estimulante de melanocitos alfa (α-MSH). La ciclación le da una estabilidad conformacional muy superior a la del péptido nativo, que se degrada en minutos, y le permite unirse a varios receptores de melanocortina a la vez: MC1R, MC3R, MC4R y MC5R.',
          'Esa falta de selectividad, que en desarrollo farmacéutico es un inconveniente, es justo lo que lo vuelve útil como herramienta de investigación: permite activar el sistema completo y observar la respuesta integrada.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'La vía MC1R es la más documentada: es el receptor de los melanocitos y el eje de la síntesis de eumelanina, por lo que la molécula aparece con frecuencia en estudios de pigmentación y biología del melanocito. Las vías MC3R y MC4R lo llevan al terreno de la regulación central del apetito y el balance energético, y MC5R al de las glándulas exocrinas.',
          'Se usa como comparador frente a agonistas más selectivos, como PT-141, para separar qué efectos corresponden a qué receptor.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizado en vial sellado; la estructura cíclica lo hace robusto en seco. Conservar en frío, seco y protegido de la luz.',
          'Reconstituir con diluyente estéril de forma suave y refrigerar la solución.',
        ],
      },
    ],
  },

  cagrilintida: {
    tagline: 'Análogo de amilina de acción prolongada',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Cagrilintida es un análogo sintético de la amilina, la hormona de 37 aminoácidos que las células beta pancreáticas cosecretan junto con la insulina. La amilina humana nativa es notoriamente difícil de trabajar porque tiende a formar fibrillas amiloides; el diseño de cagrilintida sustituye residuos clave para eliminar esa propensión y añade una acilación que prolonga su permanencia en circulación.',
          'El resultado es una molécula estable y de acción larga sobre un eje —el de la amilina— que durante años fue difícil de estudiar precisamente por la inestabilidad del péptido nativo.',
        ],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: [
          'La amilina actúa sobre receptores formados por el receptor de calcitonina asociado a proteínas modificadoras de la actividad del receptor (RAMP), y su señalización se estudia en el área postrema y el núcleo del tracto solitario, regiones del tronco encefálico implicadas en saciedad y vaciamiento gástrico.',
          'Cagrilintida aparece en modelos de señalización de saciedad, vaciado gástrico, biología de la célula beta y, muy señaladamente, en estudios de combinación con agonistas de GLP-1: la pregunta experimental es si dos vías de saciedad distintas producen un efecto aditivo o sinérgico.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizada en vial sellado. Los análogos de amilina son especialmente sensibles a la agregación, así que la protección frente a la humedad y el manejo suave importan más aquí que en un péptido común.',
          'Reconstituir con diluyente estéril dejándolo escurrir por la pared, sin vórtice ni agitación. Refrigerar y evitar ciclos de congelado y descongelado.',
        ],
      },
    ],
  },

  tesamorelina: {
    tagline: 'Análogo estabilizado de GHRH (1-44)',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Tesamorelina es un análogo sintético de la hormona liberadora de hormona de crecimiento humana en su forma completa de 44 aminoácidos, modificado con la adición de un grupo trans-3-hexenoil en el extremo N-terminal. Esa modificación es la clave: protege la molécula de la degradación por DPP-4 y le da una estabilidad muy superior a la del GHRH nativo, cuya vida media se mide en pocos minutos.',
          'Frente a los análogos de fragmento 1-29, Tesamorelina conserva la secuencia completa, lo que la vuelve el análogo más cercano a la molécula natural entre los disponibles para investigación.',
        ],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: [
          'Se investiga en señalización del receptor de GHRH en la hipófisis anterior, en regulación del eje GH/IGF-1 y, de forma destacada, en modelos de metabolismo del tejido adiposo visceral y de lípidos hepáticos, que es donde se concentra buena parte de su literatura.',
          'Al respetar la secuencia completa del GHRH, es la referencia obligada cuando se quiere comparar el comportamiento de los análogos de fragmento frente a la molécula íntegra.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizada en vial sellado. Su cadena es larga para un péptido de investigación, así que es más sensible que un tri o tetrapéptido: frío, seco y sin luz.',
          'Reconstituir con diluyente estéril de forma suave, sin agitación. Refrigerar la solución y no congelarla una vez reconstituida.',
        ],
      },
    ],
  },

  semax: {
    tagline: 'Heptapéptido nootrópico derivado de ACTH (4-10)',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Semax es un heptapéptido sintético desarrollado en Rusia a partir del fragmento 4-10 de la hormona adrenocorticotropa (ACTH), al que se le añadió el tripéptido Pro-Gly-Pro en el extremo C-terminal. Ese añadido es lo que lo distingue: aumenta de forma notable su resistencia a las peptidasas y, al mismo tiempo, elimina la actividad corticotropa del fragmento original. Dicho de otro modo, conserva la parte neuroactiva y deja fuera la hormonal.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'El eje más documentado es su influencia sobre los factores neurotróficos, en particular BDNF y NGF, y sobre la expresión de sus receptores. A partir de ahí se investiga en modelos de plasticidad sináptica, neuroprotección frente a estrés oxidativo e isquémico, y modulación de sistemas dopaminérgico y serotoninérgico.',
          'Aparece también en trabajos de expresión génica en tejido nervioso, donde se describen cambios amplios en perfiles transcripcionales, y en estudios de atención y memoria en modelos animales. Es, junto con Selank, el representante más estudiado de la escuela rusa de péptidos reguladores cortos aplicados al sistema nervioso central.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizado en vial sellado. Es una cadena corta y comparativamente estable en seco, pero higroscópica. Conservar en frío, seco y sin luz.',
          'Reconstituir con diluyente estéril de forma suave; refrigerar la solución.',
        ],
      },
    ],
  },

  selank: {
    tagline: 'Heptapéptido derivado de la tuftsina',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'Selank es un heptapéptido sintético construido sobre la tuftsina, un tetrapéptido inmunomodulador de origen natural, al que se le añadió —igual que en Semax— el tripéptido Pro-Gly-Pro para estabilizarlo frente a la degradación enzimática. Pertenece a la misma escuela rusa de péptidos reguladores cortos.',
        ],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: [
          'Su eje principal de investigación es el sistema GABAérgico: hay literatura que describe modulación de la expresión de subunidades del receptor GABA-A y cambios en la señalización inhibitoria, lo que lo ha situado en modelos de ansiedad experimental y respuesta al estrés.',
          'Un segundo eje, heredado de la tuftsina, es el inmunológico: se estudia su influencia sobre la expresión de interleucinas y sobre el eje neuroinmune, un terreno donde los límites entre señalización nerviosa e inmunitaria se cruzan. También aparece en trabajos sobre metabolismo de encefalinas y sobre equilibrio de neurotransmisores monoaminérgicos.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Liofilizado en vial sellado. Cadena corta, estable en seco, sensible a la humedad. Frío, seco y sin luz.',
          'Reconstituir con diluyente estéril de forma suave y refrigerar la solución.',
        ],
      },
    ],
  },

  'agua-bacteriostatica': {
    tagline: 'Diluyente con alcohol bencílico al 0.9%',
    sections: [
      {
        title: 'Qué es',
        paragraphs: [
          'El agua bacteriostática es agua estéril a la que se añade alcohol bencílico al 0.9% como conservador. No es un péptido ni un principio activo: es el diluyente con el que se reconstituye el material liofilizado en el banco de trabajo.',
          'La diferencia frente al agua estéril simple es justamente el conservador. El alcohol bencílico inhibe el crecimiento bacteriano, lo que permite hacer varias extracciones del mismo vial a lo largo de días o semanas sin que la solución se comprometa. El agua estéril sin conservador no ofrece esa protección y, en rigor, es material de un solo uso.',
        ],
      },
      {
        title: 'Cuándo se usa cada una',
        paragraphs: [
          'El agua bacteriostática es la opción por defecto cuando el protocolo contempla extracciones repetidas del mismo vial, que es el caso más común en trabajo experimental con péptidos liofilizados.',
          'El agua estéril sin conservador se reserva para trabajo analítico de un solo uso o para ensayos donde el alcohol bencílico podría interferir con la medición. Algunos compuestos tienen preferencias de diluyente propias: conviene revisar la ficha del compuesto antes de decidir.',
          'La cantidad de diluyente determina la concentración final de la solución, y esa es una decisión del diseño experimental. Nuestra calculadora de reconstitución hace la aritmética a partir de los miligramos del vial y de la concentración que busques.',
        ],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: [
          'Se suministra en vial sellado, listo para usar. Conservar a temperatura ambiente controlada, protegido de la luz, y no usar si la solución se ve turbia o con partículas.',
          'El tapón se limpia con alcohol antes de cada punción y se trabaja con jeringa estéril nueva. Un vial de diluyente contaminado compromete todos los péptidos que se reconstituyan con él.',
        ],
      },
    ],
  },

  // ===== Tanda 3: bioreguladores de Khavinson y péptidos inmunes =====

  bronchogen: {
    tagline: 'Bioregulador peptídico corto (Ala-Glu-Asp-Leu)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Bronchogen es un tetrapéptido sintético de secuencia Ala-Glu-Asp-Leu (AEDL), de la familia de bioreguladores peptídicos cortos desarrollada por la escuela de Vladimir Khavinson. Se concibió como análogo sintético de un extracto de tejido bronquial, siguiendo la misma lógica que dio origen a Epithalon a partir de la glándula pineal.',
        'La premisa de toda esa familia es la especificidad de tejido: cada bioregulador corto se asocia con el órgano del que derivó su extracto de origen. En el caso de Bronchogen, el tejido de referencia es el epitelio respiratorio.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'La hipótesis central de la escuela de Khavinson es que estos péptidos de dos a cuatro residuos pueden interactuar con regiones específicas del ADN y modular la expresión génica de forma tejido-selectiva. Conviene decirlo con claridad: es un modelo que sigue en discusión y que no ha tenido la misma verificación independiente que otros mecanismos peptídicos.',
        'Aparece en trabajos sobre epitelio respiratorio en cultivo, expresión génica tejido-específica y estudios comparativos dentro de la familia de bioreguladores cortos, donde el interés es justamente probar si la especificidad de tejido que se les atribuye se sostiene experimentalmente.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Tetrapéptido liofilizado, estable en seco pero higroscópico. Vial sellado, en frío, protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar la solución.' ] },
    ],
  },

  cardiogen: {
    tagline: 'Bioregulador peptídico corto (Ala-Glu-Asp-Arg)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Cardiogen es un tetrapéptido sintético de secuencia Ala-Glu-Asp-Arg (AEDR), perteneciente a la familia de bioreguladores peptídicos cortos de la escuela de Khavinson. Su tejido de referencia es el miocardio: se desarrolló como análogo sintético de un extracto de tejido cardiaco.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga bajo la misma hipótesis que el resto de la familia: interacción con secuencias específicas de ADN y modulación tejido-selectiva de la expresión génica. Como en todos los bioreguladores cortos, ese mecanismo sigue siendo materia de debate en la literatura independiente.',
        'Los trabajos publicados lo sitúan en modelos de cardiomiocitos en cultivo, senescencia celular en tejido cardiaco y estudios de expresión génica comparativa frente a otros bioreguladores de la serie.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Cadena corta, estable en seco, sensible a la humedad. Frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  cartalax: {
    tagline: 'Bioregulador peptídico corto (Ala-Glu-Asp-Gly), tejido cartilaginoso',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Cartalax es un tetrapéptido sintético de la familia de bioreguladores cortos de Khavinson, asociado al tejido cartilaginoso y conectivo. Comparte con Epithalon la secuencia AEDG, y la diferencia práctica entre ambos en la literatura de esta escuela está en el contexto de estudio y el tejido de referencia, no en la cadena.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Aparece en modelos de condrocitos en cultivo, síntesis de matriz extracelular cartilaginosa y senescencia de tejido conectivo. La hipótesis de trabajo es la misma de toda la serie: modulación de expresión génica con especificidad de tejido.',
        'Por compartir secuencia con Epithalon, es una pieza útil en estudios que buscan comprobar si la especificidad tisular que la escuela de Khavinson atribuye a estos péptidos es real o depende del contexto experimental.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar la solución.' ] },
    ],
  },

  cortagen: {
    tagline: 'Bioregulador peptídico corto (Ala-Glu-Asp-Pro)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Cortagen es un tetrapéptido sintético de secuencia Ala-Glu-Asp-Pro (AEDP), de la serie de bioreguladores cortos de Khavinson. Su tejido de referencia es la corteza cerebral, de donde procedía el extracto que le dio origen.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en modelos de tejido nervioso: regeneración de fibra nerviosa periférica en modelos animales, expresión génica en corteza y comportamiento comparado frente a otros bioreguladores de la misma serie.',
        'Como con el resto de la familia, el mecanismo propuesto —interacción directa con ADN y modulación tejido-selectiva— es una hipótesis de escuela que conviene tratar como tal.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  crystagen: {
    tagline: 'Bioregulador peptídico corto, referencia inmunitaria',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Crystagen es un tetrapéptido sintético de la familia de bioreguladores cortos de Khavinson, cuyo tejido de referencia es el sistema inmunitario. Junto con Thymalin, es el representante de la rama inmune dentro de esa serie.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Aparece en modelos de proliferación y diferenciación de linfocitos en cultivo, expresión de citocinas y estudios sobre el eje neuroinmune. La pregunta experimental habitual es si un péptido de cuatro residuos puede producir una respuesta inmunológica medible y reproducible.',
        'Se estudia con frecuencia junto a Thymalin y a Thymosin Alpha-1, que abordan el mismo terreno desde estructuras muy distintas: un tetrapéptido sintético, un extracto peptídico y un péptido de 28 residuos.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  pinealon: {
    tagline: 'Tripéptido bioregulador (Glu-Asp-Arg), referencia cerebral',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Pinealon es un tripéptido sintético de secuencia Glu-Asp-Arg (EDR), de la familia de bioreguladores cortos de Khavinson. Es uno de los más cortos de la serie —tres residuos— y su tejido de referencia es el cerebral.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'La literatura publicada lo sitúa en modelos de estrés oxidativo en neuronas, viabilidad celular bajo hipoxia y expresión de genes asociados a respuesta al estrés. También aparece en trabajos sobre ritmos circadianos, terreno que comparte con Epithalon por la referencia pineal.',
        'Su tamaño mínimo lo vuelve interesante por una razón metodológica: si un tripéptido produce una respuesta reproducible en cultivo, la pregunta de cómo lo hace se vuelve más aguda, no menos.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Las cadenas muy cortas son estables en seco pero especialmente higroscópicas: frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  thymalin: {
    tagline: 'Complejo peptídico de origen tímico',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Thymalin no es un péptido único sino un complejo de péptidos de bajo peso molecular obtenido del timo, la glándula donde maduran los linfocitos T. Es uno de los preparados originales de la escuela rusa de bioreguladores, anterior a los tetrapéptidos sintéticos que después la caracterizaron.',
        'Esa naturaleza de mezcla es importante para el diseño experimental: a diferencia de un péptido sintético de secuencia conocida, aquí se trabaja con una fracción, y la caracterización analítica es correspondientemente más compleja.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en modelos de maduración y diferenciación de linfocitos T, respuesta inmunitaria en modelos animales y, dentro de la literatura de esta escuela, en trabajos sobre involución tímica asociada a la edad.',
        'Suele compararse con Thymosin Alpha-1 y con Crystagen, que abordan el mismo eje inmunitario desde una molécula definida en lugar de una fracción.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Por tratarse de una fracción peptídica compleja, la protección frente a humedad y calor importa especialmente. Frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar la solución.' ] },
    ],
  },

  'thymosin-alpha-1': {
    tagline: 'Péptido tímico de 28 aminoácidos',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Thymosin Alpha-1 es un péptido de 28 aminoácidos, acetilado en su extremo N-terminal, identificado originalmente en la fracción 5 del extracto tímico. A diferencia de Thymalin, aquí sí se trata de una molécula única de secuencia conocida, lo que la vuelve mucho más manejable como herramienta experimental.',
        'No debe confundirse con la timosina beta-4, de la que deriva TB-500: comparten el nombre de familia por su origen tímico común, pero son moléculas distintas con mecanismos distintos.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su eje mejor documentado es la modulación de la inmunidad innata y adaptativa: se ha descrito su interacción con receptores tipo Toll, en particular TLR2 y TLR9, y su influencia sobre la maduración de células dendríticas y sobre la diferenciación de linfocitos T.',
        'Aparece en modelos de respuesta inmune celular, expresión de citocinas, biología de células dendríticas y estudios sobre inmunosenescencia. Es uno de los péptidos inmunomoduladores con más literatura preclínica independiente.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Su cadena de 28 residuos lo hace más sensible que un tetrapéptido: frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril sin agitación; refrigerar y evitar ciclos de congelado y descongelado.' ] },
    ],
  },

  kpv: {
    tagline: 'Tripéptido C-terminal de la α-MSH (Lys-Pro-Val)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'KPV es el tripéptido formado por lisina, prolina y valina, correspondiente al extremo C-terminal (residuos 11-13) de la hormona estimulante de melanocitos alfa. Es la fracción mínima de la α-MSH que conserva actividad antiinflamatoria en los modelos publicados.',
        'Su interés metodológico está justamente ahí: conserva la rama antiinflamatoria de la molécula madre sin arrastrar la actividad sobre los receptores de melanocortina responsables de la pigmentación y de los efectos centrales.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'El eje mejor documentado es la señalización NF-κB: la literatura describe inhibición de su translocación al núcleo y, con ella, reducción de la expresión de citocinas proinflamatorias en cultivo. También se ha estudiado su entrada a la célula por transportadores de péptidos como PepT1, muy expresado en epitelio intestinal.',
        'Aparece en modelos de inflamación intestinal, integridad de barrera epitelial, dermatología experimental y como componente de mezclas de reparación tisular, donde aporta la rama antiinflamatoria: es la "K" de KLOW.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; tripéptido estable en seco pero higroscópico. Frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  'll-37': {
    tagline: 'Péptido antimicrobiano humano de la familia catelicidina',
    sections: [
      { title: 'Qué es', paragraphs: [
        'LL-37 es un péptido de 37 aminoácidos, el único miembro humano de la familia de las catelicidinas. Se genera por escisión proteolítica de la proteína precursora hCAP-18 y debe su nombre a los dos residuos de leucina con los que empieza su secuencia.',
        'Estructuralmente es un péptido anfipático de hélice alfa: una cara de la hélice concentra los residuos hidrofóbicos y la otra los cargados positivamente. Esa asimetría es la clave de su comportamiento sobre membranas.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su mecanismo antimicrobiano se estudia como interacción directa con la membrana bacteriana: la carga positiva del péptido se asocia a los fosfolípidos aniónicos de la membrana procariota y la cara hidrofóbica se inserta, desestabilizándola. Es un mecanismo físico, no enzimático, lo que ha despertado interés en el contexto de resistencia a antibióticos.',
        'Más allá de eso, LL-37 se investiga como molécula de señalización inmunitaria: quimiotaxis de células inmunes, neutralización de lipopolisacárido, angiogénesis y cicatrización. Es uno de los péptidos de la inmunidad innata con literatura más amplia.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Los péptidos catiónicos largos tienden a adsorberse a superficies plásticas y de vidrio, algo que conviene tener presente al preparar diluciones. Frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave, sin vórtice. Refrigerar y evitar congelado y descongelado repetidos.' ] },
    ],
  },

  // ===== Tanda 4: eje somatotrópico (GH / IGF) =====

  'ghrp-2-acetate': {
    tagline: 'Secretagogo de GH de segunda generación',
    sections: [
      { title: 'Qué es', paragraphs: [
        'GHRP-2 es un hexapéptido sintético de la familia de los péptidos liberadores de hormona de crecimiento. Actúa como agonista del receptor GHSR-1a, el receptor de la grelina, por una vía distinta de la del receptor de GHRH.',
        'Pertenece a la generación anterior a Ipamorelin. Es más potente en la liberación de GH, pero menos selectivo: en los modelos publicados también eleva prolactina y cortisol, un efecto cruzado que Ipamorelin en buena medida evita.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Aparece en estudios de señalización del receptor GHSR-1a, comparación de potencia y selectividad entre secretagogos, y modelos de apetito y balance energético, donde la vía de la grelina participa de forma directa.',
        'Su falta de selectividad, que sería un defecto en desarrollo farmacéutico, lo vuelve útil como comparador: permite separar qué respuestas dependen exclusivamente del eje somatotrópico y cuáles arrastran otras ramas endocrinas.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Hexapéptido estable en seco; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar la solución.' ] },
    ],
  },

  'ghrp-6-acetate': {
    tagline: 'Secretagogo de GH con fuerte señal orexigénica',
    sections: [
      { title: 'Qué es', paragraphs: [
        'GHRP-6 es un hexapéptido sintético agonista del receptor GHSR-1a, cronológicamente el primero de la familia de secretagogos que se caracterizó a fondo. Comparte mecanismo con GHRP-2 pero difiere en perfil: su señal sobre el apetito es notablemente más marcada.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Precisamente por esa señal orexigénica es la herramienta de referencia en modelos de regulación del apetito mediada por grelina, además de en estudios de señalización GHSR-1a y de liberación pulsátil de hormona de crecimiento.',
        'La comparación GHRP-6 / GHRP-2 / Ipamorelin es un experimento clásico de la farmacología de secretagogos: mismo receptor, tres perfiles de selectividad distintos.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  'hexarelin-acetate': {
    tagline: 'Secretagogo hexapeptídico de alta potencia',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Hexarelina es un hexapéptido sintético derivado estructuralmente de GHRP-6, con una metilación en el residuo de triptófano que aumenta de forma importante su potencia y su resistencia a la degradación. Es el más potente de los secretagogos peptídicos clásicos.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Además del eje somatotrópico, tiene una línea de investigación propia en tejido cardiaco: se ha descrito su unión al receptor CD36, distinto del GHSR-1a, lo que abrió estudios sobre señalización cardiovascular independientes de la hormona de crecimiento.',
        'Otro tema recurrente en su literatura es la desensibilización del receptor con exposición sostenida, que lo convierte en una herramienta útil para estudiar internalización y resensibilización de GPCRs.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  sermorelina: {
    tagline: 'Análogo de GHRH (1-29), el fragmento activo',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Sermorelina corresponde a los primeros 29 aminoácidos de la hormona liberadora de hormona de crecimiento humana, el fragmento mínimo que conserva la actividad biológica de la molécula completa de 44 residuos. A diferencia de CJC-1295 sin DAC, no lleva sustituciones que la protejan de la DPP-4, así que su vida media es muy corta.',
        'Esa fragilidad es su valor experimental: es el análogo que más se parece, en cinética, al GHRH endógeno.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Se investiga en señalización del receptor de GHRH y su acoplamiento a la vía del AMP cíclico en somatotropos, y en el estudio del patrón pulsátil de secreción de GH, donde una molécula de acción larga aplanaría justamente el fenómeno que se quiere observar.',
        'Es la referencia natural frente a la que se comparan Modified GRF (1-29), CJC-1295 con DAC y Tesamorelina.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Al no llevar protección frente a peptidasas, es de las más sensibles del grupo: frío, seco y sin luz, y usar la solución pronto.',
        'Reconstituir con diluyente estéril de forma muy suave; refrigerar.' ] },
    ],
  },

  'cjc-1295-con-dac': {
    tagline: 'Análogo de GHRH con Drug Affinity Complex',
    sections: [
      { title: 'Qué es', paragraphs: [
        'CJC-1295 con DAC es el mismo análogo de GHRH (1-29) modificado, al que se le añade el Drug Affinity Complex: un grupo maleimida que forma un enlace covalente con la albúmina sérica. Ese enlace cambia por completo la cinética de la molécula: de una vida media de minutos se pasa a una exposición sostenida de días.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Es la herramienta para estudiar qué ocurre cuando la señal de GHRH deja de ser pulsátil y se vuelve continua: desensibilización del receptor, cambios en la amplitud de los pulsos de GH y comportamiento del eje GH/IGF-1 bajo estimulación sostenida.',
        'La comparación directa con la versión sin DAC —misma secuencia, mismo receptor, duración de exposición radicalmente distinta— es uno de los experimentos más limpios disponibles para separar los efectos de la señal de los efectos de su patrón temporal.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. El grupo maleimida es reactivo frente a tioles, así que conviene evitar diluyentes que los contengan. Frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar y usar en el plazo previsto.' ] },
    ],
  },

  'igf-1-lr3': {
    tagline: 'Variante de larga acción del factor de crecimiento insulínico tipo 1',
    sections: [
      { title: 'Qué es', paragraphs: [
        'IGF-1 LR3 es una variante recombinante del factor de crecimiento insulínico tipo 1 con dos modificaciones: una extensión de 13 aminoácidos en el extremo N-terminal y la sustitución del residuo 3 de ácido glutámico por arginina, de donde viene el nombre (Long R3).',
        'Esas modificaciones reducen drásticamente su afinidad por las proteínas de unión a IGF (IGFBP), que en condiciones normales secuestran la mayor parte del IGF-1 circulante. El resultado es una fracción libre mucho mayor y una vida media considerablemente más larga.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en señalización del receptor de IGF-1 y sus vías descendentes —PI3K/Akt y MAPK—, en proliferación y diferenciación celular, en hipertrofia de miotubos en cultivo y en biología del crecimiento.',
        'Su interés metodológico está en el sistema de IGFBP: al escapar de él, permite separar experimentalmente lo que depende del ligando de lo que depende de su secuestro por proteínas de unión.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Es una proteína pequeña más que un péptido corto: más sensible a la desnaturalización, al calor y a la agitación. Frío, seco y sin luz.',
        'Reconstituir con el diluyente indicado para la ficha, de forma muy suave y sin espuma. Refrigerar y evitar ciclos de congelado y descongelado, que son especialmente dañinos aquí.' ] },
    ],
  },

  mgf: {
    tagline: 'Factor mecano-crecimiento, variante de empalme de IGF-1',
    sections: [
      { title: 'Qué es', paragraphs: [
        'MGF (Mechano Growth Factor) es una variante de empalme alternativo del gen de IGF-1, también documentada como IGF-1Ec. Se expresa en músculo esquelético en respuesta a carga mecánica o daño, de ahí su nombre. El péptido de investigación corresponde a su péptido E, el fragmento C-terminal que distingue esta isoforma.',
        'Su vida media en solución es muy corta, lo que históricamente ha sido la principal dificultad de trabajar con él y la razón de que exista la versión pegilada.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en activación y proliferación de células satélite del músculo esquelético, respuesta a daño mecánico, y como pieza para entender cómo un mismo gen produce señales distintas según el contexto: IGF-1 sistémico frente a MGF local.',
        'Ese es su valor conceptual: ilustra que el empalme alternativo no es un detalle, sino un mecanismo de especialización funcional.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y usar la solución pronto: su estabilidad en medio acuoso es de las más cortas del catálogo.' ] },
    ],
  },

  'peg-mgf': {
    tagline: 'MGF pegilado, de vida media extendida',
    sections: [
      { title: 'Qué es', paragraphs: [
        'PEG-MGF es el péptido E de MGF conjugado con polietilenglicol. La pegilación —unir cadenas de PEG a una proteína o péptido— es una técnica estándar para aumentar el radio hidrodinámico de la molécula, reducir su depuración renal y protegerla de las peptidasas.',
        'El resultado es la misma señal biológica con una permanencia mucho mayor, que resuelve el principal obstáculo práctico del MGF sin modificar.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Comparte líneas de investigación con MGF —células satélite, respuesta a daño muscular, señalización local— pero permite diseños experimentales de ventana más larga que serían inviables con la molécula sin pegilar.',
        'La comparación entre MGF y PEG-MGF es además un caso de estudio útil sobre lo que la pegilación conserva y lo que altera: el impedimento estérico del PEG puede reducir la afinidad por el receptor aunque aumente la exposición total.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y sin espuma; refrigerar. Los conjugados de PEG son especialmente sensibles a la agitación mecánica.' ] },
    ],
  },

  'hgh-fragment-176-191': {
    tagline: 'Fragmento C-terminal lipolítico de la hormona de crecimiento',
    sections: [
      { title: 'Qué es', paragraphs: [
        'HGH Fragment 176-191 corresponde a los residuos 176 a 191 del extremo C-terminal de la hormona de crecimiento humana. Es la región que en los estudios de disección de la molécula se asoció con la actividad sobre el metabolismo lipídico, separada del resto de las funciones de la hormona completa.',
        'Ese es exactamente su valor experimental: es una hormona de 191 aminoácidos reducida a los 16 residuos de una sola de sus funciones, sin la señalización sobre el receptor de GH ni la inducción de IGF-1.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Aparece en modelos de lipólisis en adipocitos, oxidación de ácidos grasos y en estudios de relación estructura-función de la hormona de crecimiento, donde la pregunta es qué fracción de la molécula es responsable de cada rama de su actividad.',
        'Comparado con la hormona completa, permite comprobar si un efecto observado depende del receptor de GH o de un mecanismo distinto.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar la solución.' ] },
    ],
  },

  'fragment-17-23': {
    tagline: 'Fragmento peptídico corto de investigación',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Fragment 17-23 es un péptido corto correspondiente a la región 17-23 de su secuencia madre. Los fragmentos de este tipo se usan en investigación para acotar qué parte de una molécula grande es responsable de una actividad concreta: se sintetiza el tramo, se ensaya por separado y se compara con la molécula íntegra.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su uso típico es el mapeo de estructura-función: identificar el epítopo o el motivo mínimo que conserva la unión al receptor o la actividad medida. También se emplea como control negativo o de especificidad en ensayos donde se quiere descartar que la respuesta observada venga de una región distinta.',
        'Para el diseño experimental conviene verificar la secuencia exacta y el marco de numeración de referencia antes de compararlo con datos de la literatura, porque la numeración de fragmentos varía entre publicaciones.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Péptido corto: estable en seco, higroscópico. Frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  // ===== Tanda 5: metabólicos e incretinas =====

  liraglutida: {
    tagline: 'Análogo de GLP-1 de primera generación acilada',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Liraglutida es un análogo del péptido similar al glucagón tipo 1 con dos modificaciones sobre la secuencia nativa: la sustitución de lisina por arginina en posición 34 y la conjugación de una cadena de ácido palmítico a través de un espaciador de ácido glutámico. Esa acilación le da afinidad por la albúmina y multiplica su permanencia en circulación frente al GLP-1 endógeno, cuya vida media es de minutos.',
        'Es la generación anterior a Semaglutida: mismo receptor, misma estrategia de diseño, cadena grasa más corta y por tanto exposición menos prolongada.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Aparece en modelos de secreción de insulina dependiente de glucosa, supervivencia de células beta, motilidad gastrointestinal y señalización de saciedad en el sistema nervioso central.',
        'Su papel más útil hoy es de comparador: la serie Liraglutida → Semaglutida → Tirzepatida → Retatrutida permite estudiar cómo cambia la respuesta al ir alargando la exposición y sumando receptores.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave, sin vórtice: los análogos acilados de GLP-1 son propensos a formar agregados fibrilares. Refrigerar la solución.' ] },
    ],
  },

  dulaglutida: {
    tagline: 'Proteína de fusión GLP-1 con fragmento Fc',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Dulaglutida no es un péptido simple sino una proteína de fusión: dos análogos de GLP-1 modificados unidos por un enlazador a un fragmento Fc de inmunoglobulina G4 humana. La estrategia de extensión de vida media aquí no es la acilación sino el reciclaje mediado por el receptor Fc neonatal (FcRn), el mismo mecanismo que mantiene los anticuerpos en circulación durante semanas.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Su interés experimental está en comparar dos estrategias distintas de prolongación: unión a albúmina por acilación frente a fusión con Fc. Producen perfiles de exposición y de distribución tisular diferentes a partir de la misma señal receptora.',
        'Aparece en modelos de señalización del receptor de GLP-1, farmacocinética de proteínas de fusión y estudios de inmunogenicidad, un tema propio de las moléculas que incorporan dominios de anticuerpo.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Al ser una proteína de fusión de tamaño considerable, es más frágil que un péptido: sensible al calor, a la agitación y a la formación de espuma. Frío, seco y sin luz.',
        'Reconstituir con mucha suavidad, sin vórtice ni espuma. Refrigerar y no congelar la solución.' ] },
    ],
  },

  mazdutida: {
    tagline: 'Doble agonista GLP-1 / glucagón',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Mazdutida es un péptido sintético que actúa como agonista dual de los receptores de GLP-1 y de glucagón. Su esqueleto deriva de la oxintomodulina, un péptido intestinal natural que activa de forma nativa ambos receptores, modificado y acilado para darle estabilidad y acción prolongada.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'La combinación GLP-1 más glucagón es conceptualmente distinta de la combinación GLP-1 más GIP: la rama de glucagón añade gasto energético y metabolismo hepático, no sensibilidad del adipocito. Mazdutida es la herramienta para estudiar esa pareja concreta de forma aislada.',
        'Aparece en modelos de homeostasis energética, metabolismo hepático de lípidos y estudios comparativos frente a agonistas duales GLP-1/GIP como Tirzepatida y al triple agonista Retatrutida.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril dejándolo escurrir por la pared, sin agitación. Refrigerar.' ] },
    ],
  },

  survodutide: {
    tagline: 'Doble agonista GLP-1 / glucagón, de acción prolongada',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Survodutide es otro agonista dual de los receptores de GLP-1 y de glucagón, con una arquitectura de acilación diseñada para exposición prolongada. Comparte clase con Mazdutida pero difiere en secuencia y en el balance de potencia entre ambos receptores.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'El punto interesante de tener dos duales GLP-1/glucagón distintos en el catálogo es que permite estudiar el efecto del sesgo receptor: dos moléculas de la misma clase con proporciones de activación diferentes producen respuestas metabólicas que no son intercambiables.',
        'Aparece en modelos de metabolismo hepático de lípidos, gasto energético y farmacología comparada de agonistas multireceptor.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave, sin vórtice; refrigerar.' ] },
    ],
  },

  'aod-9604': {
    tagline: 'Fragmento 176-191 modificado de la hormona de crecimiento',
    sections: [
      { title: 'Qué es', paragraphs: [
        'AOD-9604 es una versión modificada del fragmento C-terminal 176-191 de la hormona de crecimiento humana, a la que se añadió un residuo de tirosina en el extremo N-terminal para mejorar su estabilidad. Como el fragmento del que deriva, carece de la región responsable de la señalización sobre el receptor de GH y de la inducción de IGF-1.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en modelos de metabolismo lipídico del adipocito: lipólisis, expresión de enzimas implicadas en la oxidación de ácidos grasos y comportamiento del tejido adiposo en cultivo.',
        'Su valor conceptual es el mismo que el del fragmento original, con mejor manejabilidad: permite preguntar si un efecto metabólico atribuido a la hormona de crecimiento necesita realmente su receptor.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  adipotide: {
    tagline: 'Péptido proapoptótico dirigido a vasculatura adiposa (FTPP)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Adipotide, también documentado como FTPP (Fat Targeted Proapoptotic Peptide), es un péptido quimérico de dos módulos: una secuencia de direccionamiento que reconoce la prohibitina, una proteína enriquecida en el endotelio de la vasculatura del tejido adiposo blanco, y un dominio proapoptótico que desestabiliza membranas mitocondriales.',
        'Es un diseño de "misil dirigido": el primer módulo decide dónde, el segundo qué ocurre al llegar. Ese esquema modular es lo que lo hace interesante más allá del tejido concreto al que apunta.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Aparece en modelos de biología vascular del tejido adiposo, apoptosis dirigida y, sobre todo, como caso de estudio de péptidos de direccionamiento: cómo se diseña una secuencia que reconoce un marcador de superficie específico y cómo se acopla a un efector.',
        'La literatura publicada sobre este tipo de moléculas presta especial atención a la selectividad: cuánto del efecto ocurre en el tejido diana y cuánto fuera de él.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar y manejar con técnica estéril.' ] },
    ],
  },

  '5-amino-1mq': {
    tagline: 'Inhibidor de molécula pequeña de NNMT',
    sections: [
      { title: 'Qué es', paragraphs: [
        '5-Amino-1MQ no es un péptido sino una molécula pequeña: un derivado de quinolinio que actúa como inhibidor selectivo de la nicotinamida N-metiltransferasa (NNMT), una enzima citosólica muy expresada en tejido adiposo e hígado.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'La NNMT metila la nicotinamida y la retira de la vía de rescate de NAD+. Inhibirla es, por tanto, una forma indirecta de estudiar la disponibilidad de NAD+ intracelular sin administrarlo: si al bloquear la enzima suben los niveles de NAD+ y cambia el fenotipo celular, la vía de rescate era limitante.',
        'Aparece en modelos de metabolismo del adipocito, homeostasis de NAD+, biología de sirtuinas y estudios sobre metilación como mecanismo de regulación metabólica. Es una herramienta complementaria a NAD+ y sus precursores, no un sustituto.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Se presenta en forma liofilizada o cristalina según el lote. Al ser una molécula pequeña y no un péptido, su comportamiento de solubilidad es distinto: conviene revisar la ficha del lote antes de elegir diluyente.',
        'Conservar sellado, en frío, seco y protegido de la luz.' ] },
    ],
  },

  '10-amino-1mq': {
    tagline: 'Análogo de la serie de inhibidores de NNMT',
    sections: [
      { title: 'Qué es', paragraphs: [
        '10-Amino-1MQ pertenece a la misma serie química de derivados de quinolinio estudiados como inhibidores de la nicotinamida N-metiltransferasa. Frente al 5-amino, la diferencia está en la posición del grupo amino sobre el anillo, lo que altera la geometría de unión al sitio activo de la enzima.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su uso principal es la relación estructura-actividad: comparar análogos que difieren en un solo sustituyente es la forma clásica de mapear qué contactos importan para la inhibición y cuáles no.',
        'Comparte con el 5-amino el terreno de estudio: metabolismo del adipocito, homeostasis de NAD+ y regulación por metilación.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Molécula pequeña liofilizada o cristalina; revisar la ficha del lote para el diluyente adecuado.',
        'Conservar sellado, en frío, seco y sin luz.' ] },
    ],
  },

  'mots-c': {
    tagline: 'Péptido mitocondrial de 16 aminoácidos',
    sections: [
      { title: 'Qué es', paragraphs: [
        'MOTS-c es un péptido de 16 aminoácidos codificado no en el ADN nuclear sino en el genoma mitocondrial, dentro del gen del ARN ribosómico 12S. Pertenece a la familia de los péptidos derivados de mitocondria (MDP), junto con la humanina, y su descubrimiento cambió una idea asentada: que la mitocondria solo aportaba proteínas de la cadena respiratoria.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su mecanismo mejor documentado es la activación de AMPK, el sensor energético central de la célula, y la interferencia con la vía del folato y el metabolismo de un carbono. Se ha descrito además su translocación al núcleo bajo estrés metabólico, donde se asocia a la regulación de genes de respuesta adaptativa.',
        'Eso lo convierte en el ejemplo mejor caracterizado de señalización retrógrada mitocondria-núcleo, además de aparecer en modelos de sensibilidad a la insulina, metabolismo del músculo esquelético y biología del envejecimiento.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar la solución.' ] },
    ],
  },

  'slu-pp-332': {
    tagline: 'Agonista de molécula pequeña de los receptores ERR',
    sections: [
      { title: 'Qué es', paragraphs: [
        'SLU-PP-332 no es un péptido sino una molécula pequeña sintética que actúa como agonista pan de los receptores relacionados con estrógenos (ERRα, ERRβ y ERRγ), una familia de receptores nucleares huérfanos —sin ligando endógeno conocido— con papel central en el control transcripcional del metabolismo oxidativo.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Los ERR regulan programas de biogénesis mitocondrial y de oxidación de ácidos grasos en músculo esquelético y corazón. Al ser receptores huérfanos, durante años solo se pudieron estudiar por manipulación genética; un agonista sintético permite hacerlo farmacológicamente y con control temporal.',
        'Aparece en modelos de biogénesis mitocondrial, metabolismo oxidativo del músculo, regulación transcripcional por receptores nucleares y estudios de resistencia y adaptación al ejercicio en modelos animales.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Molécula pequeña, no péptido: su solubilidad suele requerir un disolvente orgánico como DMSO antes de diluir en medio acuoso. Revisar la ficha del lote.',
        'Conservar sellado, en frío, seco y protegido de la luz.' ] },
    ],
  },

  // ===== Tanda 6: longevidad, mitocondria y neuro =====

  'ss-31': {
    tagline: 'Elamipretida, péptido dirigido a la cardiolipina mitocondrial',
    sections: [
      { title: 'Qué es', paragraphs: [
        'SS-31, también documentado como elamipretida, es un tetrapéptido aromático-catiónico de la serie Szeto-Schiller. Su rasgo definitorio es que se acumula selectivamente en la membrana mitocondrial interna, donde se asocia con la cardiolipina, un fosfolípido exclusivo de esa membrana y esencial para la organización de los complejos de la cadena respiratoria.',
        'La selectividad no depende del potencial de membrana, a diferencia de otros compuestos dirigidos a mitocondria: eso permite estudiarlo también en mitocondrias despolarizadas, que es justo el escenario de interés en disfunción mitocondrial.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'La hipótesis mecanística es que al unirse a la cardiolipina estabiliza las crestas mitocondriales y mejora el acoplamiento de la cadena de transporte de electrones, reduciendo la fuga de electrones y la generación de especies reactivas de oxígeno.',
        'Aparece en modelos de disfunción mitocondrial, daño por isquemia-reperfusión, biología del envejecimiento y estudios de bioenergética en músculo esquelético y cardiaco. Es uno de los péptidos mitocondriales con más literatura preclínica independiente.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar la solución.' ] },
    ],
  },

  humanin: {
    tagline: 'Péptido mitocondrial de 24 aminoácidos',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La humanina es un péptido de 24 aminoácidos codificado en el genoma mitocondrial, dentro del gen del ARN ribosómico 16S. Fue el primer péptido derivado de mitocondria que se describió, y su hallazgo abrió la categoría a la que después se sumó MOTS-c.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga como péptido citoprotector: la literatura describe interacción con proteínas de la familia Bax y modulación de vías de apoptosis, además de señalización a través de un receptor trimérico de superficie que incluye la subunidad gp130.',
        'Aparece en modelos de supervivencia neuronal, estrés oxidativo, sensibilidad a la insulina y biología del envejecimiento. Junto con MOTS-c, es la pieza clave para estudiar la mitocondria como órgano endocrino y no solo como central energética.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  foxo4: {
    tagline: 'FOXO4-DRI, péptido senolítico de interferencia',
    sections: [
      { title: 'Qué es', paragraphs: [
        'FOXO4-DRI es un péptido diseñado por retroinversión (D-retro-inverso): se sintetiza con aminoácidos D en orden invertido respecto de la secuencia natural, lo que produce una molécula con una disposición espacial de las cadenas laterales muy parecida a la original pero prácticamente inmune a las proteasas.',
        'Su diana es la interacción entre FOXO4 y p53, un contacto proteína-proteína que en células senescentes retiene a p53 en el núcleo y las mantiene vivas pese al daño acumulado.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Es una de las herramientas de referencia en el campo senolítico: la hipótesis es que al interrumpir el contacto FOXO4-p53, la célula senescente pierde su resistencia a la apoptosis y se elimina, mientras la célula sana no se ve afectada.',
        'Aparece en modelos de senescencia celular, eliminación selectiva de células senescentes en cultivo y estudios de envejecimiento tisular. Metodológicamente es además un buen ejemplo de cómo se diseña un inhibidor de interacción proteína-proteína.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Los péptidos retroinversos son notablemente estables frente a peptidasas, pero no frente a la humedad. Frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  glutation: {
    tagline: 'Tripéptido antioxidante (GSH)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'El glutatión es un tripéptido formado por glutamato, cisteína y glicina, con la particularidad de que el enlace entre los dos primeros es un enlace gamma —a través de la cadena lateral del glutamato, no de su carbono alfa—. Esa unión atípica lo protege de las peptidasas comunes y explica que exista en concentraciones milimolares dentro de la célula.',
        'Es el antioxidante no proteico más abundante del organismo y el eje del sistema redox celular.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su química gira en torno al grupo tiol de la cisteína: dos moléculas reducidas (GSH) se oxidan a un dímero (GSSG), y la proporción GSH/GSSG es la medida estándar del estado redox de una célula.',
        'Se investiga en estrés oxidativo, detoxificación de fase II mediada por glutatión S-transferasas, glutationilación de proteínas como mecanismo de señalización y modelos de envejecimiento y función mitocondrial.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Es sensible a la oxidación por aire: una vez en solución, el GSH pasa a GSSG con el tiempo, lo que altera justamente el parámetro que suele querer medirse.',
        'Conservar sellado, en frío, seco y sin luz. Preparar las soluciones lo más cerca posible del momento de uso.' ] },
    ],
  },

  aicar: {
    tagline: 'Activador de AMPK (ribonucleótido de aminoimidazol carboxamida)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'AICAR no es un péptido sino un análogo de nucleótido. Dentro de la célula se fosforila a ZMP, un compuesto que imita estructuralmente al AMP y que por esa razón activa la proteína cinasa activada por AMP (AMPK), el sensor que la célula usa para detectar caída de energía.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Es el activador farmacológico clásico de AMPK y aparece en prácticamente toda la literatura del campo: captación de glucosa independiente de insulina, oxidación de ácidos grasos, biogénesis mitocondrial y regulación de mTOR, que AMPK inhibe.',
        'Conviene tener presente una limitación metodológica bien documentada: ZMP no solo activa AMPK, también afecta a otras enzimas sensibles a AMP, así que los resultados con AICAR suelen requerir confirmación con un segundo abordaje.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Se presenta liofilizado o en polvo cristalino. Al ser un análogo de nucleótido, su solubilidad y estabilidad difieren de las de un péptido: revisar la ficha del lote.',
        'Conservar sellado, en frío, seco y protegido de la luz.' ] },
    ],
  },

  'pnc-27': {
    tagline: 'Péptido dirigido al complejo p53 / HDM-2',
    sections: [
      { title: 'Qué es', paragraphs: [
        'PNC-27 es un péptido quimérico de dos módulos: un segmento derivado del dominio de p53 que reconoce a HDM-2 (la versión humana de MDM2), y un dominio de penetración celular que le permite atravesar la membrana.',
        'La lógica del diseño es aprovechar que HDM-2 aparece expresado en la membrana de ciertas líneas celulares y no en otras, de modo que el reconocimiento sirva a la vez de mecanismo de selectividad.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en modelos de interacción p53-HDM2, permeabilización de membrana y selectividad de péptidos dirigidos. Es también un caso de estudio sobre diseño de péptidos penetrantes de célula (CPP) acoplados a un módulo de reconocimiento.',
        'La literatura sobre este péptido es más limitada y más discutida que la de otros compuestos del catálogo, algo que conviene tener presente al diseñar experimentos con él.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar y manejar con técnica estéril.' ] },
    ],
  },

  dsip: {
    tagline: 'Péptido delta inductor del sueño (nonapéptido)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'DSIP es un nonapéptido aislado originalmente de sangre de conejo durante experimentos de sueño inducido eléctricamente, de donde viene su nombre (Delta Sleep-Inducing Peptide). Es una de las moléculas más antiguas y a la vez menos comprendidas de la neuropeptidología: décadas después de su aislamiento, no se ha identificado un receptor propio.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en modelos de arquitectura del sueño —en particular la actividad de ondas delta—, ritmos circadianos, respuesta al estrés y regulación del eje hipotálamo-hipófisis-adrenal.',
        'Su interés metodológico es doble: por un lado, los efectos descritos en la literatura son variables entre estudios, lo que lo convierte en un buen ejercicio de lectura crítica; por otro, la ausencia de un receptor identificado es un problema abierto y legítimo de investigación.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  melatonina: {
    tagline: 'Indolamina reguladora del ciclo circadiano',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La melatonina no es un péptido sino una indolamina derivada del triptófano, sintetizada principalmente en la glándula pineal siguiendo un ritmo marcado por el núcleo supraquiasmático. Su producción sube con la oscuridad y cae con la luz, lo que la convierte en la señal química de la noche.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Actúa sobre los receptores MT1 y MT2, ambos acoplados a proteína G, y además tiene actividad antioxidante directa por su capacidad de ceder electrones, un mecanismo independiente de receptor.',
        'Aparece en modelos de ritmos circadianos, señalización pineal, función mitocondrial y estrés oxidativo. En el catálogo se relaciona conceptualmente con Epithalon y Pinealon, que comparten la referencia pineal desde otra química por completo.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Molécula pequeña, fotosensible: la protección frente a la luz aquí no es una formalidad, es parte del método.',
        'Conservar sellada, en frío, seca y en oscuridad. Revisar la ficha del lote para el diluyente adecuado; su solubilidad en agua es limitada.' ] },
    ],
  },

  'orexin-a': {
    tagline: 'Neuropéptido hipotalámico de 33 aminoácidos',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La orexina A (también llamada hipocretina-1) es un neuropéptido de 33 aminoácidos producido por un grupo reducido de neuronas del hipotálamo lateral. Tiene dos puentes disulfuro intramoleculares y el extremo N-terminal en forma de piroglutamato, rasgos que le dan una estructura muy definida y una estabilidad notable.',
        'Se une con afinidad similar a los dos receptores conocidos, OX1R y OX2R, a diferencia de la orexina B, que es marcadamente selectiva por OX2R.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'El sistema orexinérgico es el regulador central de la vigilia: su pérdida es la base de la narcolepsia con cataplejía. Se investiga en modelos de ciclo sueño-vigilia, estabilidad de los estados de arousal, regulación del apetito y sistemas de recompensa.',
        'La comparación orexina A frente a orexina B es el experimento estándar para separar la contribución de OX1R y OX2R dentro del sistema.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Los puentes disulfuro son sensibles a agentes reductores: evitar diluyentes que contengan tioles.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar y evitar congelado y descongelado repetidos.' ] },
    ],
  },

  'orexin-b': {
    tagline: 'Neuropéptido hipotalámico selectivo por OX2R',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La orexina B (hipocretina-2) es un neuropéptido de 28 aminoácidos que procede del mismo precursor que la orexina A, la prepro-orexina, escindido en un punto distinto. A diferencia de su hermana, es lineal —sin puentes disulfuro— y presenta afinidad claramente preferente por el receptor OX2R.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Esa selectividad es exactamente su utilidad: permite estudiar la rama OX2R del sistema orexinérgico de forma relativamente aislada, algo que con orexina A no es posible porque activa ambos receptores.',
        'Aparece en modelos de regulación de la vigilia, donde OX2R tiene un papel destacado, y en estudios de alimentación y respuesta al estrés. Su vida media en solución es más corta que la de la orexina A por carecer de la estabilización de los puentes disulfuro.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y usar la solución con prontitud; refrigerar.' ] },
    ],
  },

  // ===== Tanda 7: reparación tisular, estética y mezclas =====

  'ara-290': {
    tagline: 'Cibinetida, péptido derivado de EPO sin acción eritropoyética',
    sections: [
      { title: 'Qué es', paragraphs: [
        'ARA-290, también documentado como cibinetida, es un péptido de 11 aminoácidos que reproduce la región helicoidal B de la eritropoyetina. Es el ejemplo de manual de disección funcional: la EPO tiene dos actividades separables —la eritropoyética, que aumenta glóbulos rojos, y la citoprotectora tisular— y ARA-290 conserva solo la segunda.',
        'Actúa sobre el receptor innato de reparación tisular, un heterocomplejo formado por el receptor de EPO y el receptor beta común, distinto del homodímero que media la producción de eritrocitos.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Aparece en modelos de neuropatía de fibra pequeña, inflamación tisular, protección frente a isquemia y estudios de señalización del receptor innato de reparación.',
        'Su valor conceptual es que demuestra que una hormona puede tener ramas funcionales separables por diseño molecular: la misma proteína, dos receptores, dos efectos que se pueden desacoplar.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  'glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg': {
    tagline: 'Mezcla de tres péptidos: BPC-157, GHK-Cu y TB-500',
    sections: [
      { title: 'Qué es', paragraphs: [
        'GLOW es una formulación combinada de tres péptidos de investigación en un solo vial liofilizado: BPC-157, GHK-Cu y TB-500, con el péptido de cobre en la proporción dominante. Es la mezcla más difundida del mercado en su categoría y la base de la que deriva KLOW, que añade KPV como cuarto componente.' ] },
      { title: 'Por qué se combinan', paragraphs: [
        'Cada componente cubre una etapa distinta del mismo proceso: GHK-Cu se investiga en remodelado de matriz extracelular y expresión de colágeno; BPC-157 en angiogénesis y señalización de factores de crecimiento; TB-500 en dinámica de actina y migración celular.',
        'Esa complementariedad es lo que la vuelve útil para estudiar interacción entre vías en lugar de un eje aislado. La comparación GLOW frente a KLOW permite además aislar la contribución específica de la rama antiinflamatoria que aporta KPV.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'La presencia de GHK-Cu da a la mezcla el color azul-verdoso característico del complejo cobre-péptido al reconstituirse. Es normal.',
        'Vial sellado en frío y protegido de la luz. Reconstituir con diluyente estéril de forma muy suave, sin agitar: el complejo de cobre es sensible al estrés mecánico. Refrigerar.' ] },
    ],
  },

  'bpc-157-10mg-tb-500-10mg': {
    tagline: 'Mezcla BPC-157 + TB-500, 10 mg de cada uno',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Combinación en un solo vial de BPC-157 y TB-500, los dos péptidos con más literatura preclínica en reparación tisular, en proporción 1:1 de 10 mg cada uno.' ] },
      { title: 'Por qué se combinan', paragraphs: [
        'Actúan sobre etapas complementarias y no redundantes. BPC-157 se investiga en angiogénesis, regulación de VEGFR2 y señalización de la vía del óxido nítrico; TB-500 en secuestro de actina monomérica, reorganización del citoesqueleto y migración celular direccional.',
        'Dicho simple: uno se estudia por la irrigación del tejido nuevo, el otro por la capacidad de las células de desplazarse hasta donde hacen falta. Esa es la razón por la que la pareja aparece constantemente en la literatura de reparación y por la que existe como presentación combinada.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Vial liofilizado sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril vertido por la pared, sin agitación. Refrigerar la solución.' ] },
    ],
  },

  'bpc-157-5mg-tb-500-5mg': {
    tagline: 'Mezcla BPC-157 + TB-500, 5 mg de cada uno',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La misma combinación de BPC-157 y TB-500 en presentación de 5 mg de cada componente, para protocolos que requieren menos material total o series de ensayo más cortas.' ] },
      { title: 'Por qué se combinan', paragraphs: [
        'La lógica es idéntica a la de la presentación de 10 mg: dos péptidos que intervienen en fases distintas del mismo proceso de reparación —angiogénesis y señalización por un lado, migración celular y citoesqueleto por el otro—.',
        'La elección entre 5 y 10 mg es una decisión de diseño experimental: lo que cambia es el material disponible por vial, no la relación entre los componentes.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Vial liofilizado sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  'cjc-1295-no-dac-5mg-ipamorelin-5mg': {
    tagline: 'Mezcla del eje somatotrópico: Modified GRF (1-29) + Ipamorelin',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Combinación en un solo vial de CJC-1295 sin DAC (Modified GRF 1-29) e Ipamorelin, 5 mg de cada uno. Es la pareja clásica del eje somatotrópico en investigación.' ] },
      { title: 'Por qué se combinan', paragraphs: [
        'Cada uno actúa sobre un receptor distinto. CJC-1295 sin DAC es análogo de GHRH y actúa sobre el receptor de GHRH; Ipamorelin es agonista del GHSR-1a, el receptor de la grelina. Son dos vías independientes que convergen sobre la misma célula: el somatotropo hipofisario.',
        'Por eso la combinación es interesante experimentalmente: permite estudiar si la activación simultánea de ambas vías produce un efecto aditivo, sinérgico o simplemente redundante sobre el pulso de hormona de crecimiento. Ipamorelin aporta además la ventaja de su selectividad, que evita arrastrar cortisol y prolactina a la ecuación.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Vial liofilizado sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  'tesamorelin-10-ipamorelin-5': {
    tagline: 'Mezcla Tesamorelina 10 mg + Ipamorelin 5 mg',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Combinación de Tesamorelina —análogo estabilizado del GHRH completo de 44 aminoácidos— con Ipamorelin, el secretagogo selectivo de GHSR-1a.' ] },
      { title: 'Por qué se combinan', paragraphs: [
        'Es la misma lógica de dos vías convergentes que en la mezcla con CJC-1295, pero con la secuencia completa del GHRH en lugar de su fragmento 1-29. Eso permite comparar si la molécula íntegra y el fragmento se comportan igual cuando se los combina con la vía de la grelina.',
        'La literatura de Tesamorelina, además, tiene una rama propia en metabolismo de tejido adiposo visceral que el fragmento 1-29 no comparte de forma tan marcada.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Vial liofilizado sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar y no congelar la solución.' ] },
    ],
  },

  'retatrutide-20mg-tirzepatide-40mg': {
    tagline: 'Mezcla de un triple agonista y un agonista dual',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Presentación combinada de Retatrutida (triple agonista GIP/GLP-1/glucagón) y Tirzepatida (agonista dual GIP/GLP-1) en un solo vial.' ] },
      { title: 'Consideración experimental', paragraphs: [
        'Conviene decirlo con franqueza: combinar dos agonistas que comparten dos de sus tres receptores es, desde el punto de vista del diseño experimental, una situación difícil de interpretar. Los efectos sobre GLP-1 y GIP se suman de forma no trivial y la contribución de cada molécula no se puede separar a posteriori.',
        'Para estudiar la diferencia entre agonismo dual y triple, lo limpio metodológicamente es ensayar cada compuesto por separado y comparar. Esta presentación tiene sentido cuando el objetivo es la respuesta agregada, no la atribución de causa.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Vial liofilizado sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril dejándolo escurrir por la pared, sin agitación ni vórtice: ambos componentes son péptidos acilados y propensos a agregarse. Refrigerar.' ] },
    ],
  },

  'cagri-sema-2-5mg-2-5mg': {
    tagline: 'Mezcla Cagrilintida + Semaglutida, 2.5 mg de cada uno',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Combinación de un análogo de amilina (Cagrilintida) con un análogo de GLP-1 (Semaglutida) en el mismo vial, en proporción 1:1.' ] },
      { title: 'Por qué se combinan', paragraphs: [
        'A diferencia de la mezcla de dos incretinas, aquí los dos componentes actúan sobre sistemas de saciedad **distintos**: la amilina señaliza a través de receptores de calcitonina asociados a RAMP en el área postrema, y el GLP-1 sobre su propio receptor en núcleos hipotalámicos y del tronco encefálico.',
        'Esa independencia es lo que hace la combinación interesante: la pregunta experimental —si dos vías de saciedad separadas producen un efecto aditivo o sinérgico— sí se puede plantear con limpieza, porque los receptores no se solapan.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Vial liofilizado sellado. Los análogos de amilina son especialmente propensos a la agregación: manejar con cuidado.',
        'Reconstituir con diluyente estéril de forma muy suave, sin vórtice. Refrigerar y evitar congelado y descongelado.' ] },
    ],
  },

  'ahk-cu': {
    tagline: 'Tripéptido de cobre (Ala-His-Lys)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'AHK-Cu es el complejo de cobre del tripéptido Ala-His-Lys. Es el pariente cercano de GHK-Cu: difiere en un solo residuo —alanina en lugar de glicina en la primera posición— y conserva la histidina y la lisina responsables de la coordinación del metal.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Precisamente por esa diferencia mínima, su principal valor es comparativo: permite preguntar cuánto del comportamiento de GHK-Cu depende de la secuencia exacta y cuánto de la simple presencia del complejo de cobre.',
        'En la literatura aparece sobre todo en estudios de biología del folículo piloso, proliferación de células dérmicas y transporte de cobre. Como GHK-Cu, forma un complejo coloreado al reconstituirse.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado, de color azulado. Los complejos de cobre son fotosensibles: frío y oscuridad.',
        'Reconstituir con diluyente estéril de forma muy suave, evitando cambios bruscos de pH. Refrigerar y proteger de la luz.' ] },
    ],
  },

  matrixyl: {
    tagline: 'Palmitoil pentapéptido (péptido cosmético de matriz)',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Matrixyl es un pentapéptido —secuencia Lys-Thr-Thr-Lys-Ser— conjugado con ácido palmítico. La cadena grasa no está ahí para prolongar la vida media en circulación, como en los análogos de GLP-1, sino para aumentar la lipofilia del péptido y facilitar su paso a través de barreras lipídicas.',
        'La secuencia deriva de un fragmento del propéptido del colágeno tipo I, una región que en el organismo participa en la retroalimentación de la síntesis de matriz.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en modelos de fibroblasto dérmico en cultivo: expresión de colágeno tipo I y IV, fibronectina y otros componentes de la matriz extracelular.',
        'Es uno de los péptidos de matriz mejor caracterizados en la literatura de biología cutánea y aparece con frecuencia como comparador frente a GHK-Cu, que aborda el mismo terreno por una química distinta.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. La conjugación con palmitoilo cambia su perfil de solubilidad respecto de un péptido sin acilar: revisar la ficha del lote.',
        'Conservar en frío, seco y protegido de la luz; refrigerar la solución.' ] },
    ],
  },

  // ===== Tanda 8: hormonal, reproductivo y misceláneos =====

  'gonadorelin-acetate': {
    tagline: 'GnRH sintética, decapéptido hipotalámico',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Gonadorelina es la forma sintética de la hormona liberadora de gonadotropinas (GnRH), un decapéptido producido en el hipotálamo. Es idéntica a la molécula endógena, sin modificaciones de estabilización, por lo que su vida media es de pocos minutos.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Su rasgo más interesante es que la respuesta depende del patrón de administración, no solo de la dosis: la estimulación pulsátil del receptor de GnRH mantiene la secreción de LH y FSH, mientras que la estimulación continua la suprime por desensibilización del receptor. Es uno de los ejemplos más claros en toda la endocrinología de que el patrón temporal de una señal es en sí mismo información.',
        'Aparece en modelos de señalización del receptor de GnRH, regulación del eje hipotálamo-hipófisis-gonadal y estudios de desensibilización de GPCRs.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Al no llevar protección frente a peptidasas, es sensible: frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y usar la solución con prontitud; refrigerar.' ] },
    ],
  },

  'triptorelin-acetate': {
    tagline: 'Análogo de GnRH de acción prolongada',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Triptorelina es un análogo sintético de la GnRH en el que la glicina de la posición 6 se sustituye por D-triptófano. Ese cambio de un solo residuo, y de la quiralidad, la hace mucho más resistente a la degradación enzimática y aumenta notablemente su afinidad por el receptor.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Es la contraparte experimental de la gonadorelina: al ser de acción prolongada, produce estimulación sostenida del receptor de GnRH y por tanto su desensibilización, con el fenómeno característico de un pico inicial de gonadotropinas seguido de supresión.',
        'Comparar gonadorelina y triptorelina es el modo limpio de estudiar cómo la duración de ocupación del receptor determina el resultado biológico, y aparece en trabajos de regulación del eje reproductivo y de internalización de GPCRs.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  'kisspeptina-10': {
    tagline: 'Decapéptido regulador del eje reproductivo',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Kisspeptina-10 es el fragmento de 10 aminoácidos biológicamente activo de la kisspeptina, producto del gen KISS1. Actúa sobre el receptor KISS1R (antes GPR54), y su descubrimiento reorganizó la comprensión del eje reproductivo: resultó ser el regulador que está por encima de la GnRH.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Las neuronas de kisspeptina del hipotálamo son las que marcan el patrón pulsátil de liberación de GnRH, e integran señales metabólicas y de esteroides sexuales. Por eso la kisspeptina es el punto donde convergen el estado energético del organismo y la función reproductiva.',
        'Aparece en modelos de regulación del eje hipotálamo-hipófisis-gonadal, pubertad, retroalimentación por esteroides sexuales y en la conexión entre metabolismo y reproducción.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  oxitocina: {
    tagline: 'Nonapéptido con puente disulfuro',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La oxitocina es un nonapéptido cíclico con un puente disulfuro entre las cisteínas 1 y 6, sintetizado en el hipotálamo y liberado por la neurohipófisis. Tiene un lugar especial en la historia de la química: fue el primer péptido hormonal secuenciado y sintetizado, trabajo que le valió el Nobel a Vincent du Vigneaud en 1955.',
        'Se diferencia de la vasopresina en solo dos residuos, un parecido que explica su afinidad cruzada por los receptores de esa hormona.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Actúa sobre el receptor de oxitocina, acoplado a Gq y a la vía de la fosfolipasa C. Se investiga en dos terrenos bastante separados: el periférico clásico —contracción de músculo liso— y el central, donde participa en circuitos de vínculo social, reconocimiento y modulación del estrés.',
        'Aparece también en estudios de especificidad de receptor, precisamente por su reactividad cruzada con los receptores de vasopresina, que obliga a controles cuidadosos.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. El puente disulfuro es sensible a agentes reductores: evitar diluyentes con tioles.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar y evitar congelado y descongelado repetidos.' ] },
    ],
  },

  vip: {
    tagline: 'Péptido intestinal vasoactivo, 28 aminoácidos',
    sections: [
      { title: 'Qué es', paragraphs: [
        'VIP es un péptido de 28 aminoácidos de la superfamilia secretina-glucagón, la misma a la que pertenecen GHRH y GLP-1. Se aisló originalmente de intestino, de donde viene su nombre, pero se expresa también de forma amplia en el sistema nervioso central y periférico.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Actúa sobre los receptores VPAC1 y VPAC2, acoplados a Gs y a la vía del AMP cíclico. Sus líneas de investigación son notablemente diversas: relajación de músculo liso vascular y bronquial, secreción intestinal, inmunomodulación y neurotransmisión.',
        'Un capítulo aparte es su papel en el núcleo supraquiasmático, donde la señalización VIP es esencial para la sincronización entre las neuronas del reloj circadiano central. Es uno de los mecanismos mejor establecidos de acoplamiento entre osciladores celulares.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Cadena de 28 residuos, más sensible que un péptido corto: frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave, sin agitación; refrigerar.' ] },
    ],
  },

  p21: {
    tagline: 'Mimético peptídico de CNTF con actividad neurogénica',
    sections: [
      { title: 'Qué es', paragraphs: [
        'P21 es un péptido sintético derivado de una región activa del factor neurotrófico ciliar (CNTF). Se diseñó como mimético de bajo peso molecular de esa proteína, con la idea de conservar la señal neurogénica en una molécula mucho más pequeña y manejable. Existe también en versión adamantilada, modificación que aumenta su lipofilia.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Se investiga en modelos de neurogénesis en el hipocampo adulto, supervivencia y diferenciación neuronal, y expresión de factores neurotróficos como BDNF.',
        'Metodológicamente es un buen ejemplo de una estrategia recurrente en el campo: reducir una proteína grande a un péptido corto que conserve el motivo de unión al receptor, con las ventajas prácticas —síntesis, difusión, costo— que eso implica.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  'pe-22-28': {
    tagline: 'Péptido bloqueador del canal TREK-1',
    sections: [
      { title: 'Qué es', paragraphs: [
        'PE 22-28 es un péptido corto derivado de la espadina, un péptido natural que procede del propéptido de la sortilina. Su diana es TREK-1, un canal de potasio de dos dominios de poro (K2P) que contribuye a mantener el potencial de reposo de la membrana neuronal.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Los canales K2P son de los menos caracterizados farmacológicamente, en buena medida por la escasez de bloqueadores selectivos. Un péptido que actúa sobre TREK-1 con selectividad es, por eso, una herramienta valiosa más allá de cualquier aplicación concreta.',
        'Aparece en modelos de excitabilidad neuronal, electrofisiología de canales K2P y estudios sobre la relación entre TREK-1 y la regulación del estado de ánimo, que es la línea que originalmente motivó su desarrollo.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  dermorphin: {
    tagline: 'Heptapéptido opioide de origen anfibio con D-alanina',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La dermorfina es un heptapéptido aislado de la piel de ranas sudamericanas del género Phyllomedusa. Su rasgo más notable —y lo que la hizo famosa en bioquímica— es que contiene un residuo de D-alanina en posición 2.',
        'Ese detalle fue importante: los aminoácidos D eran considerados prácticamente ausentes en péptidos de animales, y la dermorfina demostró que existe maquinaria enzimática capaz de isomerizar residuos después de la traducción.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Es un agonista de muy alta afinidad y selectividad por el receptor opioide mu, lo que la convierte en herramienta de referencia en farmacología de receptores opioides.',
        'Además de eso, se estudia como caso de isomerización postraduccional: cómo se forma un residuo D en un organismo y qué gana la molécula con él, que en este caso es una resistencia notable a las peptidasas.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Su residuo D le da estabilidad frente a peptidasas, pero no frente a la humedad. Frío, seco y sin luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar. Manejar con los controles que correspondan a un agonista opioide de alta afinidad.' ] },
    ],
  },

  'ptd-dbm': {
    tagline: 'Péptido de penetración celular dirigido a la vía Wnt',
    sections: [
      { title: 'Qué es', paragraphs: [
        'PTD-DBM es un péptido quimérico: un dominio de transducción proteica (PTD), que le permite atravesar la membrana celular, unido a un módulo que interfiere con la unión entre Dishevelled y CXXC5, dos proteínas reguladoras de la vía de señalización Wnt/β-catenina.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'CXXC5 actúa como regulador negativo de la vía Wnt. Al bloquear su interacción con Dishevelled, el péptido libera la señalización Wnt, que participa en regeneración de tejidos y en el ciclo del folículo piloso.',
        'Aparece en modelos de biología del folículo, regeneración cutánea y estudios de la vía Wnt. Metodológicamente ilustra bien la estrategia de inhibir una interacción proteína-proteína específica en lugar de una enzima.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar y manejar con técnica estéril.' ] },
    ],
  },

  'ptd-1': {
    tagline: 'Dominio de transducción proteica',
    sections: [
      { title: 'Qué es', paragraphs: [
        'PTD-1 es un dominio de transducción proteica, es decir, una secuencia corta capaz de cruzar la membrana plasmática y de arrastrar consigo una carga unida a ella. Los PTD, también llamados péptidos penetrantes de célula, suelen ser secuencias ricas en aminoácidos básicos.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su interés es sobre todo como vehículo: la barrera práctica de muchas moléculas terapéuticas o experimentales no es la afinidad por su diana sino la incapacidad de llegar al citoplasma. Los PTD existen para resolver eso.',
        'Se investiga en mecanismos de internalización —endocitosis frente a translocación directa—, eficiencia de entrega de cargas de distinto tamaño y toxicidad de membrana asociada a péptidos catiónicos. Es el módulo que aparece en construcciones como PTD-DBM.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Los péptidos catiónicos se adsorben a superficies de plástico y vidrio; conviene tenerlo presente al preparar diluciones seriadas.',
        'Frío, seco y sin luz. Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  // ===== Tanda 9: músculo, miostatina, vitaminas y lipotrópicos =====

  follistatin: {
    tagline: 'Glicoproteína que secuestra miembros de la familia TGF-β',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La folistatina es una glicoproteína de unión que actúa como antagonista natural de varios miembros de la superfamilia TGF-β, entre ellos la activina A y la miostatina (GDF-8). No bloquea un receptor: secuestra al ligando antes de que llegue a él, un mecanismo de regulación distinto y bastante elegante.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Su papel mejor documentado es en músculo esquelético: al retirar miostatina de circulación, levanta el freno que esa proteína ejerce sobre el crecimiento muscular. Es la herramienta de referencia para estudiar la vía de la miostatina desde el lado del ligando.',
        'Aparece también en modelos de diferenciación de miotubos, señalización de activina y biología del folículo ovárico, donde la activina participa de forma central.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Es una glicoproteína, no un péptido corto: sensible a la desnaturalización por calor y agitación. Frío, seco y sin luz.',
        'Reconstituir con mucha suavidad, sin espuma ni vórtice. Refrigerar y evitar ciclos de congelado y descongelado.' ] },
    ],
  },

  'gdf-8': {
    tagline: 'Miostatina, factor de diferenciación de crecimiento 8',
    sections: [
      { title: 'Qué es', paragraphs: [
        'GDF-8, más conocida como miostatina, es un miembro de la superfamilia TGF-β que actúa como regulador negativo de la masa muscular. Se produce en el propio músculo y limita su crecimiento: es un freno fisiológico, no un promotor.',
        'Su historia es conocida por los fenotipos de "doble musculatura" en bovinos con mutaciones que la inactivan, que fueron la primera demostración clara de su función.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Señaliza a través de los receptores ActRIIB y ALK4/5, y de la vía Smad2/3. Se investiga en diferenciación y proliferación de mioblastos, atrofia muscular, y como control positivo o como diana en experimentos con folistatina y ACE-031.',
        'Metodológicamente es interesante porque el ligando y sus antagonistas están todos disponibles: se puede estudiar la vía desde ambos extremos.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Proteína dimérica: frágil frente a calor, agitación y congelado repetido.',
        'Reconstituir con suavidad y sin espuma; refrigerar.' ] },
    ],
  },

  'ace-031': {
    tagline: 'Receptor señuelo soluble de ActRIIB',
    sections: [
      { title: 'Qué es', paragraphs: [
        'ACE-031 es una proteína de fusión formada por el dominio extracelular del receptor de activina tipo IIB (ActRIIB) unido a un fragmento Fc de inmunoglobulina. Funciona como receptor señuelo: circula capturando los ligandos que normalmente activarían el receptor real en la superficie celular.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Comparte diana con la folistatina —la vía de la miostatina— pero por una estrategia distinta: un dominio de receptor soluble en lugar de una proteína de unión natural. Comparar ambos permite estudiar la especificidad: ActRIIB une varios ligandos además de miostatina, así que un señuelo basado en él es menos selectivo de lo que a veces se asume.',
        'Aparece en modelos de masa muscular, señalización de la superfamilia TGF-β y estudios de proteínas de fusión con Fc.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. Proteína de fusión grande: muy sensible a la agitación y al congelado repetido.',
        'Reconstituir con mucha suavidad, sin espuma. Refrigerar y no congelar la solución.' ] },
    ],
  },

  'l-carnitine': {
    tagline: 'Transportador de ácidos grasos de cadena larga',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La L-carnitina no es un péptido sino un compuesto de amonio cuaternario derivado de los aminoácidos lisina y metionina. Su función es de transporte: forma acilcarnitinas con los ácidos grasos de cadena larga, que es la única forma en que estos pueden atravesar la membrana mitocondrial interna.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Sin carnitina, la beta-oxidación no arranca: los ácidos grasos largos se quedan fuera de la matriz mitocondrial. Ese cuello de botella la vuelve una herramienta obligada en estudios de metabolismo lipídico.',
        'Aparece en modelos de oxidación de ácidos grasos, función mitocondrial, metabolismo del músculo esquelético y en los llamados perfiles de acilcarnitinas, que se usan como lectura indirecta del estado de la beta-oxidación.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Molécula pequeña, no péptido. Es muy higroscópica: absorbe humedad del aire con facilidad y eso afecta la pesada.',
        'Conservar bien sellada, en seco y protegida de la luz. Revisar la ficha del lote para el diluyente adecuado.' ] },
    ],
  },

  b12: {
    tagline: 'Cobalamina, cofactor con núcleo de cobalto',
    sections: [
      { title: 'Qué es', paragraphs: [
        'La vitamina B12 o cobalamina es una molécula compleja organizada alrededor de un anillo de corrina con un átomo de cobalto en el centro. Es el único compuesto biológico conocido que incorpora cobalto, y también el más grande y estructuralmente elaborado de las vitaminas.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Es cofactor de dos enzimas: la metionina sintasa, que conecta el ciclo del folato con el de la metionina y por tanto con la disponibilidad de grupos metilo para toda la célula, y la metilmalonil-CoA mutasa, del metabolismo de ácidos grasos de cadena impar.',
        'Aparece en modelos de metabolismo de un carbono, metilación de ADN, homocisteína y función neurológica. En el catálogo se relaciona con SAM-e y con el metabolismo de metilos que también toca la NNMT.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Es marcadamente fotosensible: la exposición a la luz la degrada, así que la protección lumínica es parte del método, no una precaución opcional. Su color rojo intenso es característico.',
        'Conservar sellada, en frío y en oscuridad total.' ] },
    ],
  },

  'vitamina-b12': {
    tagline: 'Cobalamina inyectable de laboratorio',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Presentación de vitamina B12 (cobalamina) para uso en laboratorio. Químicamente es la misma molécula descrita en la ficha de B12: anillo de corrina con cobalto central, cofactor de la metionina sintasa y de la metilmalonil-CoA mutasa.',
        'Las formas comerciales varían —cianocobalamina, hidroxocobalamina, metilcobalamina— y no son intercambiables sin más en un diseño experimental: difieren en el grupo unido al cobalto y en su conversión a las formas activas.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Metabolismo de un carbono, disponibilidad de grupos metilo, ciclo de la homocisteína y metabolismo mitocondrial de ácidos grasos de cadena impar.',
        'Conviene verificar en la ficha del lote qué forma de cobalamina contiene antes de comparar resultados con la literatura.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Fotosensible. Conservar sellada, en frío y en oscuridad.',
        'Manejar con material estéril; no usar si la solución presenta turbidez o partículas.' ] },
    ],
  },

  'lipo-c': {
    tagline: 'Fórmula lipotrópica combinada',
    sections: [
      { title: 'Qué es', paragraphs: [
        'LIPO-C es una fórmula combinada de compuestos lipotrópicos, es decir, sustancias implicadas en el manejo y el transporte de lípidos. Las formulaciones de esta familia suelen construirse alrededor de metionina, inositol y colina, a veces con carnitina y vitaminas del grupo B.',
        'No es un péptido ni una molécula única: es una mezcla, y eso condiciona por completo cómo se puede usar experimentalmente.' ] },
      { title: 'Consideración experimental', paragraphs: [
        'Trabajar con una mezcla significa que un efecto observado no se puede atribuir a un componente concreto sin ensayarlos por separado. Para un diseño que busque causa, lo correcto es partir la fórmula; para uno que evalúe la preparación tal cual, la mezcla es el objeto de estudio.',
        'Los componentes habituales tocan el metabolismo de un carbono (metionina, colina), la señalización de fosfoinosítidos (inositol) y el transporte mitocondrial de ácidos grasos (carnitina). Verificar la composición exacta en la ficha del lote.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Conservar sellado, en frío y protegido de la luz; varios de sus componentes son fotosensibles.',
        'No usar si la solución presenta turbidez, precipitado o cambio de color.' ] },
    ],
  },

  'mic-lipo-c-b12': {
    tagline: 'Fórmula lipotrópica con metionina, inositol, colina y B12',
    sections: [
      { title: 'Qué es', paragraphs: [
        'MIC es el acrónimo de metionina, inositol y colina, los tres componentes que definen esta familia de fórmulas lipotrópicas; esta presentación añade vitamina B12. Como toda mezcla, es un preparado y no una molécula única.' ] },
      { title: 'Qué hace cada componente', paragraphs: [
        'La metionina es donante de grupos metilo a través de la S-adenosilmetionina y participa en el metabolismo de un carbono. La colina es precursora de fosfatidilcolina, componente estructural de membranas y necesaria para el ensamblaje y la exportación hepática de lipoproteínas VLDL. El inositol participa en la señalización de fosfoinosítidos. La B12 es cofactor de la metionina sintasa, lo que la conecta directamente con el primero de la lista.',
        'Vistos juntos, los cuatro convergen en el metabolismo hepático de lípidos y en la disponibilidad de grupos metilo, que es la lógica de la fórmula.' ] },
      { title: 'Consideración experimental y manejo', paragraphs: [
        'Al ser una mezcla, los efectos no son atribuibles a un componente sin ensayarlos por separado. Verificar la composición exacta del lote.',
        'Conservar sellado, en frío y protegido de la luz (la B12 es fotosensible). No usar si hay turbidez o precipitado.' ] },
    ],
  },

  'acido-acetico': {
    tagline: 'Diluyente ácido para péptidos poco solubles',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Solución diluida de ácido acético, usada como diluyente alternativo cuando un péptido no se disuelve bien en agua bacteriostática o en agua estéril. No es un principio activo: es una herramienta de reconstitución.' ] },
      { title: 'Cuándo se usa', paragraphs: [
        'La solubilidad de un péptido depende de su carga neta, y esa carga depende del pH del medio. Los péptidos básicos —ricos en lisina, arginina o histidina— se disuelven mejor en medio ligeramente ácido, porque ahí ganan carga positiva y las moléculas se repelen entre sí en lugar de agregarse.',
        'El procedimiento habitual es disolver primero en el volumen mínimo de solución ácida y después llevar al volumen final con el diluyente acuoso que corresponda. Los péptidos ácidos, en cambio, suelen requerir lo contrario: medio ligeramente básico.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Conservar sellado, a temperatura ambiente controlada y protegido de la luz.',
        'Verificar la compatibilidad del diluyente con el compuesto y con el ensayo antes de usarlo: un cambio de pH puede afectar tanto la estabilidad del péptido como la lectura del experimento.' ] },
    ],
  },

  'b7-33': {
    tagline: 'Análogo monomérico de relaxina-2',
    sections: [
      { title: 'Qué es', paragraphs: [
        'B7-33 es un péptido sintético de cadena única derivado de la cadena B de la relaxina-2 humana. La relaxina nativa es una hormona de dos cadenas unidas por puentes disulfuro, difícil y cara de sintetizar; B7-33 reduce esa arquitectura a un solo tramo lineal que conserva actividad sobre el receptor RXFP1.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Su rasgo más interesante es el sesgo de señalización: en los estudios publicados activa preferentemente la vía de ERK1/2 sobre la del AMP cíclico, a diferencia de la relaxina completa. Eso lo convierte en una herramienta para separar qué efectos de la hormona dependen de cada rama.',
        'Aparece en modelos de fibrosis, remodelado de matriz extracelular —donde se describe inducción de MMP-2— y biología cardiovascular.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave; refrigerar.' ] },
    ],
  },

  // ===== Tanda 10: últimos compuestos de investigación =====

  'snap-8': {
    tagline: 'Octapéptido acetilado que interfiere con el complejo SNARE',
    sections: [
      { title: 'Qué es', paragraphs: [
        'SNAP-8 es un octapéptido acetilado, extensión de la secuencia del hexapéptido Argireline. Su diana es el complejo SNARE, la maquinaria proteica que acopla las vesículas sinápticas a la membrana para que liberen su contenido.',
        'La secuencia imita el extremo N-terminal de SNAP-25, una de las tres proteínas del complejo, y compite con ella por incorporarse al ensamblaje. Un complejo mal formado libera neurotransmisor con menos eficiencia.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Es el enfoque peptídico al mismo problema que aborda la toxina botulínica, pero por un camino distinto: la toxina corta enzimáticamente SNAP-25, mientras que SNAP-8 compite por el ensamblaje del complejo. Uno es irreversible y catalítico; el otro, competitivo y reversible.',
        'Aparece en modelos de exocitosis mediada por SNARE, biología de la unión neuromuscular y estudios de péptidos cosméticos de acción sobre la contracción.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  'acth-1-39': {
    tagline: 'Corticotropina completa, 39 aminoácidos',
    sections: [
      { title: 'Qué es', paragraphs: [
        'ACTH 1-39 es la hormona adrenocorticotropa completa, un péptido de 39 aminoácidos producido en la hipófisis anterior a partir del precursor proopiomelanocortina (POMC), el mismo del que derivan la α-MSH y las beta-endorfinas.',
        'Actúa sobre el receptor de melanocortina 2 (MC2R), que a diferencia de los otros receptores de la familia responde exclusivamente a ACTH y no a las MSH.' ] },
      { title: 'Qué se estudia con ella', paragraphs: [
        'Es la pieza terminal del eje hipotálamo-hipófisis-adrenal y la herramienta estándar para estimularlo en modelos experimentales: señalización de MC2R, esteroidogénesis en corteza adrenal y regulación por retroalimentación del eje completo.',
        'Su relación con el resto de la familia de melanocortinas es además didáctica: un mismo precursor da lugar a péptidos que activan receptores distintos con funciones que van de la pigmentación al metabolismo y al estrés. En el catálogo conecta con PT-141, Melanotan I y II, y KPV.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizada en vial sellado. Cadena de 39 residuos: más sensible que un péptido corto. Frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave, sin agitación; refrigerar y evitar congelado y descongelado repetidos.' ] },
    ],
  },

  admax: {
    tagline: 'Análogo lipofílico de Semax',
    sections: [
      { title: 'Qué es', paragraphs: [
        'ADMAX es un análogo de Semax al que se incorpora un grupo adamantano, una estructura de hidrocarburo en jaula muy rígida y marcadamente lipofílica. La adamantilación es un recurso conocido en química medicinal para aumentar la lipofilia de una molécula sin alterar sus grupos funcionales.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'La razón de ser de la modificación es el paso a través de barreras lipídicas: comparar ADMAX con Semax permite estudiar cuánto de la actividad observada depende de la secuencia y cuánto de la capacidad de la molécula para llegar a su sitio de acción.',
        'Comparte terreno de investigación con Semax —factores neurotróficos, plasticidad, neuroprotección— con el añadido del eje de biodisponibilidad, que es precisamente lo que la modificación pone sobre la mesa.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado. El grupo adamantano cambia el perfil de solubilidad respecto de Semax: revisar la ficha del lote antes de elegir diluyente.',
        'Conservar en frío, seco y protegido de la luz; refrigerar la solución.' ] },
    ],
  },

  'melanotan-i': {
    tagline: 'Afamelanotida, análogo lineal selectivo de MC1R',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Melanotan I, también documentado como afamelanotida, es un análogo lineal de 13 aminoácidos de la α-MSH, con dos sustituciones —norleucina en posición 4 y D-fenilalanina en posición 7— que lo hacen mucho más estable que el péptido nativo.',
        'A diferencia de Melanotan II, que es cíclico y activa varios receptores de melanocortina, este conserva la estructura lineal y una selectividad clara por MC1R.' ] },
      { title: 'Qué se estudia con él', paragraphs: [
        'Esa selectividad es su utilidad experimental: permite estudiar la vía MC1R —la del melanocito y la síntesis de eumelanina— sin arrastrar las respuestas centrales de MC3R y MC4R que sí produce Melanotan II.',
        'Aparece en modelos de biología del melanocito, melanogénesis y fotoprotección celular, y como comparador selectivo frente a los agonistas no selectivos de la familia.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Liofilizado en vial sellado; frío, seco y protegido de la luz.',
        'Reconstituir con diluyente estéril de forma suave y refrigerar.' ] },
    ],
  },

  cerebrolysin: {
    tagline: 'Hidrolizado peptídico de origen porcino',
    sections: [
      { title: 'Qué es', paragraphs: [
        'Cerebrolysin no es un péptido único sino un hidrolizado: una mezcla de péptidos de bajo peso molecular y aminoácidos libres obtenida por digestión enzimática controlada de tejido cerebral porcino. Como preparado, se parece más a Thymalin que a un péptido sintético de secuencia definida.',
        'Esa naturaleza de fracción condiciona por completo cómo puede usarse: no hay una secuencia que citar ni una masa molecular que verificar por espectrometría, sino un perfil de composición que varía dentro de las tolerancias del proceso.' ] },
      { title: 'Consideración experimental', paragraphs: [
        'Con una mezcla no se puede atribuir un efecto a un componente, y la reproducibilidad entre lotes depende de la consistencia del proceso de hidrólisis, no de una síntesis. Cualquier diseño experimental serio con este material tiene que tomar el lote como variable.',
        'En la literatura aparece en modelos de neuroprotección, plasticidad sináptica y actividad de tipo neurotrófico. Conviene señalar que su estatus regulatorio varía por país: en varios está clasificado como medicamento, no como reactivo.' ] },
      { title: 'Manejo en laboratorio', paragraphs: [
        'Conservar sellado, en frío y protegido de la luz. Al ser una fracción compleja de origen biológico, es especialmente sensible al calor.',
        'No usar si presenta turbidez, precipitado o cambio de color. Manejar con técnica estéril.' ] },
    ],
  },
  'retatrutida': {
    tagline: 'Triple agonista GIP, GLP-1 y glucagón',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Retatrutida (clave de desarrollo LY3437943) es un péptido sintético de cadena única, de 39 aminoácidos, construido sobre el esqueleto del polipéptido insulinotrópico dependiente de glucosa y modificado para activar tres receptores distintos: GIP, GLP-1 y glucagón. Incorpora un diácido graso unido mediante un espaciador, una acilación que promueve la unión reversible a albúmina y prolonga su permanencia en circulación. Pertenece a la clase de agonistas multireceptor de incretinas, la generación que sigue a los agonistas simples y duales, y fue desarrollada por Eli Lilly.'],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: ['Cada rama receptora abre una línea propia de investigación. La activación del receptor de GLP-1 se estudia en la señalización de saciedad del hipotálamo y el tronco encefálico, y en la secreción de insulina dependiente de glucosa. El receptor de GIP interesa por su papel en el manejo posprandial de lípidos y en la sensibilidad del tejido adiposo. El receptor de glucagón aporta una dimensión de gasto energético y de metabolismo hepático de lípidos que los análogos previos no tenían. Aparece en modelos de homeostasis energética, esteatosis hepática, adipogénesis y señalización de receptores acoplados a proteína G, y como referencia comparativa frente a agonistas simples y duales.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es la molécula con más respaldo humano del grupo todavía experimental. El ensayo fase 2 publicado en el New England Journal of Medicine en 2023, con 338 adultos seguidos 48 semanas, reportó reducciones medias de peso corporal de hasta 24.2 por ciento en las ramas de mayor exposición frente a 2.1 por ciento con placebo, y un fase 2a mostró descensos marcados de grasa hepática. Los programas fase 3 siguen en curso, de modo que no existen aún datos de desenlaces cardiovasculares ni de seguridad a largo plazo. Los eventos gastrointestinales y los aumentos de frecuencia cardiaca observados son limitaciones reales del perfil.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra liofilizada en vial sellado. En polvo, en frío, seco y al abrigo de la luz, el material se mantiene estable durante periodos prolongados. La reconstitución se hace con agua bacteriostática estéril, dejándola escurrir por la pared interna del vial y permitiendo que el polvo se disuelva solo, sin agitación ni vórtice, porque los péptidos acilados se agregan con facilidad bajo estrés mecánico. Ya en solución la ventana de estabilidad se acorta y el material se conserva refrigerado. Producto exclusivo para investigación.'],
      },
    ],
  },

  'semaglutida': {
    tagline: 'Análogo acilado de GLP-1 de acción semanal',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Semaglutida es un análogo sintético del péptido similar al glucagón tipo 1 humano, con alrededor de 94 por ciento de homología con la secuencia nativa. Tres cambios definen su diseño: la sustitución de alanina por ácido alfa-aminoisobutírico en la posición 8, que la protege de la degradación por la enzima DPP-4; una sustitución en la posición 34 que evita acilaciones indeseadas; y la unión de un diácido graso de dieciocho carbonos a la lisina 26 a través de un espaciador. Esa acilación le da afinidad alta y reversible por la albúmina y una vida media cercana a una semana.'],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: ['Actúa como agonista del receptor de GLP-1, un receptor acoplado a proteína G expresado en células beta pancreáticas, hipotálamo, área postrema, corazón y endotelio vascular. Su activación estimula la vía AMPc-PKA, potencia la secreción de insulina dependiente de glucosa, suprime la liberación de glucagón y enlentece el vaciamiento gástrico. En neurociencia se estudia su acción sobre núcleos del núcleo arcuato y del tronco encefálico implicados en saciedad. Otras líneas activas incluyen inflamación vascular, esteatohepatitis metabólica, función renal, neuroprotección en modelos de Alzheimer y Parkinson, y circuitos de recompensa y consumo de alcohol en roedores.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia humana metabólica es de las más sólidas que existen en péptidos: los programas SUSTAIN y STEP suman decenas de miles de participantes con resultados replicados en control glucémico y peso corporal, y el estudio SELECT mostró reducción de eventos cardiovasculares mayores en personas con obesidad sin diabetes. Las líneas neurológicas son mucho más frágiles: los ensayos fase 3 EVOKE y EVOKE plus, con 3808 participantes, no lograron frenar la progresión de la enfermedad de Alzheimer temprana pese a señales en biomarcadores. Los eventos gastrointestinales y la pérdida de masa magra son limitaciones bien documentadas.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se entrega liofilizada en vial sellado, formato que preserva la integridad de la cadena durante transporte y almacenamiento prolongado. Se conserva en frío, seco y protegida de la luz. La reconstitución se realiza con agua bacteriostática estéril, dirigiendo el chorro contra la pared interna del vial y sin agitar ni usar vórtice, ya que la agitación favorece la agregación de péptidos acilados. En solución la estabilidad se reduce de forma considerable y el vial debe mantenerse refrigerado. Producto exclusivo para investigación.'],
      },
    ],
  },

  'tirzepatida': {
    tagline: 'Agonista dual de receptores GIP y GLP-1',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Tirzepatida es un péptido sintético de 39 aminoácidos construido sobre la secuencia del polipéptido insulinotrópico dependiente de glucosa, no sobre la de GLP-1, y modificado hasta obtener actividad sobre ambos receptores. Contiene dos residuos de ácido alfa-aminoisobutírico que le confieren resistencia a la DPP-4 y estabilizan su hélice, y un diácido graso de veinte carbonos anclado a la lisina 20 mediante un enlazador, responsable de la unión a albúmina y de su vida media prolongada. Se describe como agonista desbalanceado, con mayor potencia relativa sobre el receptor de GIP.'],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: ['Es la herramienta de referencia para separar la contribución del eje GIP dentro de la farmacología de incretinas. Se investiga la señalización combinada de ambos receptores acoplados a proteína G, el reclutamiento diferencial de beta-arrestina y el patrón de internalización del receptor, que difiere del que produce un agonista puro de GLP-1. Las líneas experimentales incluyen sensibilidad a la insulina en tejido adiposo, lipólisis y flujo de ácidos grasos, secreción de insulina dependiente de glucosa, control hipotalámico del apetito, esteatohepatitis metabólica y modelos de apnea del sueño y de insuficiencia cardiaca con fracción de eyección preservada.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La base clínica es amplia y de buena calidad: los programas SURPASS en diabetes tipo 2 y SURMOUNT en obesidad incluyeron miles de participantes con comparadores activos, y reportaron reducciones de hemoglobina glucosilada y de peso corporal superiores a las de semaglutida en comparación directa. También hay datos positivos en apnea obstructiva del sueño y señales favorables en esteatohepatitis. Lo que aún falta es evidencia madura de desenlaces cardiovasculares duros, que sigue en desarrollo. Persisten preguntas abiertas sobre cuánto aporta realmente la rama GIP frente al componente GLP-1, y sobre la tolerancia gastrointestinal.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizada en vial sellado. El polvo es notablemente más estable que la solución: conservado en frío, seco y sin exposición a la luz, tolera almacenamiento prolongado. Para reconstituir se usa agua bacteriostática estéril, añadida lentamente por la pared del vial y sin agitación ni vórtice, dado que el diácido graso favorece la agregación bajo estrés mecánico. Una vez en solución conviene refrigerar, evitar ciclos repetidos de congelación y descongelación y respetar la ventana de estabilidad del lote.'],
      },
    ],
  },

  'cagrilintida': {
    tagline: 'Análogo de amilina de acción prolongada',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Cagrilintida, identificada en desarrollo como AM833, es un análogo sintético y acilado de la amilina humana, una hormona de 37 aminoácidos que las células beta pancreáticas cosecretan junto con la insulina. La amilina nativa es muy propensa a formar fibrillas amiloides, así que el diseño de cagrilintida parte de un esqueleto rediseñado, con sustituciones que suprimen esa tendencia a agregarse, y añade una cadena de ácido graso que permite unión a albúmina y una duración de acción de escala semanal. Es un péptido distinto en clase de los agonistas de incretinas.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Los receptores de amilina no son proteínas independientes: se forman por dimerización del receptor de calcitonina con proteínas modificadoras de la actividad del receptor, las RAMP, dando lugar a los subtipos AMY1R, AMY2R y AMY3R. Cagrilintida se comporta como agonista no selectivo de esos tres subtipos y también del receptor de calcitonina. La investigación se concentra en su acción sobre el área postrema y el núcleo hipotalámico, donde la señalización amilinérgica regula saciedad y volumen de ingesta, y en su interacción con la vía de leptina. Se estudia además en combinación con agonistas de GLP-1 para separar mecanismos convergentes de saciedad.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Hay evidencia humana real, aunque menos madura que la de los agonistas de incretinas. Un ensayo fase 2 de búsqueda de dosis mostró reducciones de peso corporal superiores a las de liraglutida en monoterapia a 26 semanas, y el desarrollo se ha volcado hacia la combinación con semaglutida, que en el programa fase 3 REDEFINE alcanzó reducciones cercanas al 20 por ciento. Un trabajo de 2025 con antagonistas selectivos en roedores atribuyó el efecto principalmente a receptores cerebrales AMY1 y AMY3. Falta seguimiento largo, datos de desenlaces duros y caracterización de su perfil en monoterapia.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra liofilizada en vial sellado, conservada en frío, seca y protegida de la luz. La reconstitución se hace con agua bacteriostática estéril vertida despacio por la pared interna del vial, sin agitación ni vórtice: al tratarse de un análogo de una hormona amiloidogénica, el estrés mecánico y las interfaces aire-líquido son especialmente desfavorables. La solución resultante debe mantenerse refrigerada, inspeccionarse en busca de turbidez y usarse dentro de la ventana de estabilidad indicada en el lote.'],
      },
    ],
  },

  'mazdutida': {
    tagline: 'Agonista dual GLP-1 y glucagón derivado de oxintomodulina',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Mazdutida, conocida también como IBI362, LY3305677 u OXM3, es un péptido sintético de acción prolongada derivado de la oxintomodulina, una hormona intestinal natural producto del procesamiento del proglucagón que activa de forma intrínseca tanto el receptor de GLP-1 como el de glucagón. Sobre ese esqueleto se añadieron sustituciones estabilizadoras y una cadena de ácido graso que prolonga la vida media hasta permitir administración semanal en los estudios. La molécula la originó Eli Lilly y su desarrollo en China corre a cargo de Innovent Biologics.'],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: ['El interés está en el balance entre dos vías. La rama GLP-1 se investiga por su efecto sobre saciedad hipotalámica, vaciamiento gástrico y secreción de insulina dependiente de glucosa. La rama del receptor de glucagón se estudia por su capacidad de elevar el gasto energético en reposo, activar la oxidación de ácidos grasos y la lipólisis, y actuar directamente sobre el hepatocito reduciendo el contenido graso hepático. Ese componente glucagónico es justamente lo que la distingue de los agonistas puros de GLP-1 y lo que la vuelve útil en modelos de enfermedad hepática esteatósica metabólica, gasto energético y termogénesis.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia humana existe y es de fase 3, pero está muy concentrada en población china. El programa GLORY reportó reducciones de peso corporal de alrededor de 14 por ciento a 48 semanas en obesidad, con descensos importantes de grasa hepática y de factores de riesgo cardiometabólico, y dos estudios fase 3 en diabetes tipo 2 se publicaron en 2025. En junio de 2025 obtuvo aprobación regulatoria en China para control de peso. Las limitaciones son claras: poca diversidad étnica en los ensayos, ausencia de datos de desenlaces cardiovasculares a largo plazo y el efecto conocido del agonismo de glucagón sobre frecuencia cardiaca.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Llega liofilizada en vial sellado; el polvo se conserva en frío, seco y protegido de la luz, condiciones en las que resiste almacenamiento prolongado. La reconstitución se realiza con agua bacteriostática estéril, dejándola resbalar por la pared interna del vial y sin agitar ni someter a vórtice, porque los péptidos acilados de esta familia agregan con facilidad. En solución la estabilidad cae de forma marcada, por lo que el vial reconstituido se mantiene refrigerado y se evita congelarlo y descongelarlo repetidamente.'],
      },
    ],
  },

  'survodutide': {
    tagline: 'Agonista dual de receptores de glucagón y GLP-1',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Survodutide, con clave de desarrollo BI 456906, es un péptido sintético derivado estructuralmente del glucagón y no de GLP-1, modificado hasta lograr agonismo potente sobre ambos receptores. Su diseño incorpora un diácido graso de dieciocho carbonos unido mediante un enlazador, lo que le confiere unión reversible a albúmina y una duración de acción compatible con administración semanal en investigación clínica. La desarrolla Boehringer Ingelheim junto con Zealand Pharma, y se distingue del resto de la familia por partir del esqueleto glucagónico.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La hipótesis central es que el brazo del receptor de glucagón, expresado sobre todo en el hepatocito, produce efectos que el agonismo de GLP-1 no reproduce: aumento del gasto energético, estímulo de la oxidación hepática de ácidos grasos y reducción directa del contenido de triglicéridos hepáticos. El brazo GLP-1 aporta el control de saciedad central y la secreción de insulina dependiente de glucosa. Se investiga en modelos de esteatohepatitis metabólica, fibrosis hepática, homeostasis energética y regulación de la presión arterial, y como herramienta para disecar cuánto pesa cada receptor en el fenotipo metabólico resultante.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia clínica es de fase 2 y bastante buena para ese nivel. En un ensayo de 295 participantes con esteatohepatitis metabólica, hasta 83 por ciento de los tratados alcanzó mejoría histológica frente a 18.2 por ciento con placebo a 48 semanas, y algo más de la mitad mostró mejoría en el estadio de fibrosis. También hay datos fase 2 de reducción de peso y de presión arterial. Lo que falta es lo decisivo: los ensayos fase 3 siguen en marcha, no hay datos de desenlaces a largo plazo y la tolerancia gastrointestinal y el aumento de frecuencia cardiaca limitan la escalada.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado en vial sellado, que debe conservarse en frío, seco y al abrigo de la luz. La reconstitución se efectúa con agua bacteriostática estéril añadida lentamente contra la pared interna del vial, sin agitación ni vórtice, ya que la acilación con diácido graso favorece la agregación bajo estrés mecánico o en interfaces aire-líquido. Una vez disuelto, el material se mantiene refrigerado, se protege de la luz y se emplea dentro de la ventana de estabilidad declarada para el lote.'],
      },
    ],
  },

  'liraglutida': {
    tagline: 'Análogo de GLP-1 acilado con palmitato',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Liraglutida es un análogo del GLP-1 humano con 97 por ciento de homología respecto a la secuencia nativa. Difiere en dos puntos: la lisina de la posición 34 se sustituye por arginina, y un ácido graso palmítico de dieciséis carbonos se ancla a la lisina 26 mediante un espaciador de ácido glutámico. Esa acilación promueve autoasociación en heptámeros en el sitio de depósito y unión reversible a albúmina, lo que retrasa la absorción y protege de la degradación por DPP-4. Su vida media es de aproximadamente trece horas, mucho más corta que la de los análogos semanales.'],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: ['Como agonista del receptor de GLP-1, activa la vía AMPc-PKA en célula beta pancreática y actúa sobre neuronas del núcleo arcuato y del área postrema implicadas en saciedad. Por su historia larga es uno de los análogos más usados como comparador de referencia en farmacología de incretinas. Las líneas de investigación incluyen función y masa de célula beta, vaciamiento gástrico, inflamación vascular y función endotelial, esteatosis hepática, función renal y neuroprotección en modelos de enfermedad de Parkinson y de lesión cerebral, donde su perfil farmacocinético diario facilita ciertos diseños experimentales frente a los análogos semanales.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es de los análogos con historia clínica más larga. El programa LEAD estableció su efecto glucémico, el programa SCALE su efecto sobre peso corporal, y el ensayo LEADER, con más de 9000 participantes, mostró reducción de eventos cardiovasculares mayores en diabetes tipo 2 con riesgo alto. Esa base es sólida y replicada. Su magnitud de efecto sobre el peso es claramente menor que la de semaglutida o tirzepatida en comparaciones directas. En neuroprotección la evidencia sigue siendo preliminar: hay ensayos pequeños en Parkinson con resultados mixtos y ningún desenlace confirmado.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra liofilizada en vial sellado y se conserva en frío, seca y protegida de la luz. La reconstitución se realiza con agua bacteriostática estéril vertida despacio por la pared interna del vial, dejando que el polvo se disuelva sin agitación ni vórtice, ya que la molécula tiende a autoasociarse y el estrés mecánico favorece la agregación irreversible. En solución la estabilidad se reduce, así que el material se mantiene refrigerado y se descarta si aparece turbidez o partículas.'],
      },
    ],
  },

  'dulaglutida': {
    tagline: 'Proteína de fusión GLP-1 unida a fragmento Fc',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Dulaglutida no es un péptido pequeño sino una proteína de fusión de alrededor de 60 kilodaltons, producida por tecnología recombinante. Consta de dos cadenas de un análogo de GLP-1 humano unidas covalentemente, mediante un enlazador peptídico corto, a un fragmento Fc modificado de inmunoglobulina G4. El análogo lleva sustituciones en las posiciones 8, 22 y 36 que lo hacen resistente a la degradación por DPP-4 y reducen su inmunogenicidad. El tamaño molecular y el reciclaje mediado por el receptor Fc neonatal explican su vida media cercana a cinco días.'],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: ['Actúa sobre el mismo receptor acoplado a proteína G que el resto de la familia, pero su tamaño cambia la biología de forma interesante para la investigación: penetra mal en el sistema nervioso central y su distribución tisular difiere de la de un péptido acilado pequeño. Por eso se usa para contrastar efectos periféricos frente a centrales dentro del eje GLP-1. Las líneas activas incluyen función de célula beta, secreción de insulina dependiente de glucosa, función renal y albuminuria, biología del receptor Fc neonatal aplicada al diseño de proteínas de acción prolongada, e inmunogenicidad de proteínas de fusión.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia humana es amplia y de alta calidad. El programa AWARD cubrió eficacia glucémica frente a múltiples comparadores activos, y el ensayo REWIND, con 9901 participantes seguidos una mediana de 5.4 años, mostró reducción del desenlace cardiovascular compuesto con una razón de riesgo de 0.88. REWIND es notable porque el 69 por ciento de los participantes no tenía enfermedad cardiovascular establecida, lo que lo acerca a prevención primaria. Su efecto sobre el peso corporal es modesto comparado con los agonistas más recientes, y no hay datos que respalden líneas neurológicas por su pobre acceso al cerebro.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Al tratarse de una proteína de fusión y no de un péptido corto, es más sensible al calor, a los ciclos de congelación y descongelación y a la agitación que un análogo liofilizado convencional. Se conserva sellada, en frío, seca y protegida de la luz. La reconstitución se hace con agua bacteriostática estéril añadida con suavidad por la pared del vial, sin agitar ni usar vórtice, porque la desnaturalización y la agregación del dominio Fc son riesgos reales. En solución se mantiene refrigerada.'],
      },
    ],
  },

  'aicar': {
    tagline: 'Nucleósido activador indirecto de AMPK',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['AICAR, o 5-aminoimidazol-4-carboxamida ribonucleósido, también llamado acadesina, no es un péptido sino un análogo nucleosídico de molécula pequeña. Es un intermediario natural de la vía de síntesis de novo de purinas. Al entrar a la célula por transportadores de nucleósidos es fosforilado por la adenosina cinasa a ZMP, un monofosfato que imita estructuralmente al AMP. Esa mímesis es todo el mecanismo: el ZMP acumulado engaña al sensor energético celular haciéndole leer un estado de déficit de energía que en realidad no existe.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El ZMP se une al dominio gamma de la proteína cinasa activada por AMP, la AMPK, y favorece su fosforilación en la treonina 172 por la cinasa hepática LKB1. La AMPK activada apaga vías anabólicas, inhibe la acetil-CoA carboxilasa y frena mTORC1, mientras enciende la captación de glucosa mediada por GLUT4, la oxidación de ácidos grasos y la biogénesis mitocondrial vía PGC-1 alfa. Se investiga como sonda farmacológica de esa vía, y en modelos de metabolismo del músculo esquelético, autofagia, inflamación, isquemia y reperfusión, y en oncología experimental por el efecto antiproliferativo de la activación sostenida de AMPK.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia mecanicista in vitro y en roedores es abundante y consistente; la traslación humana es débil. El trabajo de Narkar y colaboradores publicado en Cell en 2008, que reportó un aumento de aproximadamente 44 por ciento en la resistencia de ratones sedentarios vía el eje AMPK y PPAR delta, popularizó la etiqueta de mimético del ejercicio, pero esas cantidades en animales son enormes en términos de peso corporal. La biodisponibilidad oral es pobre y la vida media corta. La experiencia humana se limita casi por completo a infusiones intravenosas cortas en cirugía cardiaca, sin datos de rendimiento. AICAR tampoco es selectivo: el ZMP afecta otras enzimas sensibles a AMP.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta como polvo liofilizado en vial sellado. Al ser una molécula pequeña y no un péptido, tolera mejor el manejo que un análogo acilado, pero sigue siendo higroscópico y sensible a la humedad, así que el vial se conserva sellado, en frío, seco y protegido de la luz. La reconstitución se realiza con agua bacteriostática estéril; el polvo suele disolverse sin dificultad. La solución se mantiene refrigerada y se prepara cerca del momento de uso experimental.'],
      },
    ],
  },

  'foxo4': {
    tagline: 'Péptido senolítico dirigido al eje FOXO4-p53',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['El compuesto que circula en catálogos de investigación como FOXO4 es en realidad FOXO4-DRI, un péptido sintético diseñado a partir de la región del factor de transcripción FOXO4 que interactúa con p53, fusionada a una secuencia de penetración celular. Las siglas DRI significan D-retro-inverso: la secuencia se invierte y se sintetiza con aminoácidos de configuración D en lugar de la natural L. Esa arquitectura conserva la topología de las cadenas laterales necesaria para el reconocimiento, pero vuelve la molécula muy resistente a proteasas.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La hipótesis de trabajo es que la célula senescente sobrevive porque acumula FOXO4, que secuestra a p53 en cuerpos nucleares y le impide desencadenar apoptosis dependiente de la vía mitocondrial. FOXO4-DRI compite por esa interacción, libera p53 hacia la mitocondria y desencadena muerte celular de forma preferente en células senescentes, que dependen del secuestro para seguir vivas. Se estudia en biología de la senescencia, fenotipo secretor asociado a senescencia, envejecimiento replicativo de condrocitos y células endoteliales, senescencia inducida por quimioterapia, y en modelos de disfunción tisular asociada a la edad.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia es enteramente preclínica y hay que decirlo con claridad: no existen ensayos clínicos en humanos. El trabajo fundacional de Baar y colaboradores publicado en Cell en 2017 reportó mejoras en actividad física, densidad del pelaje y función renal en ratones envejecidos, y desde entonces se han sumado estudios en condrocitos humanos expandidos in vitro, células endoteliales y células de Leydig en ratones. La replicación independiente es limitada, la selectividad real por células senescentes se ha cuestionado en algunos sistemas, y no hay datos de seguridad ni farmacocinética humana. La literatura es interesante pero temprana.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra liofilizado en vial sellado. Su configuración D-retro-inverso lo hace mucho más estable frente a proteasas que un péptido convencional, pero eso no lo protege de la humedad ni del calor: el vial se conserva en frío, seco y protegido de la luz. La reconstitución se realiza con agua bacteriostática estéril vertida con suavidad por la pared interna, sin agitación ni vórtice. En solución se mantiene refrigerado, evitando ciclos repetidos de congelación y descongelación.'],
      },
    ],
  },

  'humanin': {
    tagline: 'Péptido derivado del genoma mitocondrial',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Humanina es un péptido de 24 aminoácidos codificado por un marco de lectura abierto corto dentro del gen MT-RNR2, que corresponde al ARN ribosomal 16S del genoma mitocondrial. Fue el primer miembro descrito de la familia de péptidos derivados de la mitocondria, a la que también pertenecen MOTS-c y los péptidos SHLP. Su descubrimiento en 2001 partió de una búsqueda de factores protectores en cerebro de pacientes con enfermedad de Alzheimer. Existen variantes sintéticas más potentes, como la humanina S14G, usadas ampliamente en investigación.'],
      },
      {
        title: 'Qué se estudia con ella',
        paragraphs: ['Actúa de forma extracelular sobre un complejo receptor trimérico formado por CNTFR alfa, WSX-1 y gp130, de la familia del receptor de interleucina 6, cuya activación dispara las vías JAK2 y STAT3, PI3K y Akt, y ERK1 y ERK2, además de inhibir JNK. También se le atribuyen acciones intracelulares por unión a proteínas proapoptóticas como Bax, BimEL e IGFBP-3. Las líneas de investigación incluyen apoptosis neuronal, estrés oxidativo, resistencia a la insulina, comunicación entre mitocondria y núcleo, y biología del envejecimiento, dado que sus niveles circulantes descienden con la edad en roedores y en humanos.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Casi toda la evidencia es preclínica: cultivos celulares y modelos animales. Los datos de neuroprotección frente a péptido beta amiloide y de mejora de sensibilidad a la insulina en roedores son consistentes entre laboratorios, y en humanos existen estudios observacionales que correlacionan niveles plasmáticos más altos con longevidad, incluidos trabajos en hijos de centenarios. Pero correlación no es causalidad y no hay ensayos clínicos de intervención con humanina o sus análogos. La vida media del péptido nativo es muy corta, y buena parte de los hallazgos proviene de análogos sintéticos más estables, lo que complica extrapolar al compuesto nativo.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se entrega liofilizada en vial sellado. En polvo y en frío es razonablemente estable, pero la humedad la degrada, así que conviene dejar que el vial alcance temperatura ambiente antes de abrirlo para evitar condensación. La reconstitución se hace con agua bacteriostática estéril añadida por la pared interna del vial, sin agitación ni vórtice. La secuencia tiene tendencia a agregarse en solución, por lo que el material reconstituido se conserva refrigerado, se inspecciona en busca de turbidez y se usa dentro de su ventana de estabilidad.'],
      },
    ],
  },

  'ipamorelin': {
    tagline: 'Secretagogo selectivo del receptor de grelina',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Ipamorelin es un pentapéptido sintético (Aib-His-D-2-Nal-D-Phe-Lys-NH2) desarrollado en la década de 1990 dentro de la familia de los secretagogos de hormona de crecimiento. No es un análogo de la somatropina ni de la GHRH: desciende estructuralmente de la línea de los GHRP, pero incorpora aminoácidos no naturales y una amidación en el extremo carboxilo que le dan mayor resistencia enzimática y una selectividad de receptor mucho más estrecha que la de sus predecesores hexarelina y GHRP-2. Se distribuye como polvo liofilizado de grado investigación, típicamente en viales sellados con acetato como contraión.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Ipamorelin es agonista del receptor de secretagogos de hormona de crecimiento tipo 1a (GHS-R1a), el mismo receptor de la grelina endógena. La unión activa señalización por proteína Gq/11 y fosfolipasa C, genera inositol trifosfato, moviliza calcio intracelular y desencadena la exocitosis de hormona de crecimiento en los somatotropos de la adenohipófisis; a nivel hipotalámico también se ha descrito atenuación del tono somatostatinérgico. Las líneas de investigación documentadas incluyen la arquitectura pulsátil del eje GH/IGF-1, motilidad gastrointestinal y vaciamiento gástrico, metabolismo óseo, modelos de caquexia y balance nitrogenado, y el uso del compuesto como herramienta farmacológica para aislar la biología del GHS-R1a.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['El grueso de la literatura es preclínico. El trabajo fundacional de Raun y colaboradores en 1998 documentó liberación de hormona de crecimiento en roedores y cerdos sin elevaciones significativas de ACTH, cortisol ni prolactina, y esa selectividad ha sido replicada de forma consistente en modelos animales. En humanos la evidencia es escasa: el compuesto llegó a estudios clínicos tempranos para íleo posoperatorio y el programa se descontinuó sin resultados de eficacia convincentes. No existen ensayos controlados publicados sobre composición corporal, recuperación o envejecimiento en personas; las afirmaciones en ese terreno son extrapolaciones, no hallazgos.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado en vial sellado al vacío. La reconstitución habitual en laboratorio se hace con agua bacteriostática dirigiendo el chorro contra la pared interna del vial, sin agitar ni invertir con fuerza, ya que la agitación mecánica degrada el péptido. El liofilizado se conserva estable durante meses a temperatura de congelación y protegido de la luz; una vez en solución debe mantenerse en refrigeración y su ventana de estabilidad se reduce a semanas. Deben evitarse los ciclos repetidos de congelación y descongelación.'],
      },
    ],
  },

  'sermorelina': {
    tagline: 'Fragmento activo de la GHRH humana',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La sermorelina es un péptido sintético de 29 aminoácidos amidado en su extremo carboxilo, correspondiente al fragmento 1-29 de la hormona liberadora de hormona de crecimiento humana (GHRH). Ese fragmento concentra prácticamente toda la actividad biológica de la molécula nativa de 44 aminoácidos, por lo que se le conoce también como GRF(1-29). Fue una de las primeras herramientas peptídicas del eje somatotropo en llegar al terreno clínico: se autorizó en Estados Unidos en 1990 como agente diagnóstico y más tarde bajo la marca Geref, retirada del mercado en 2008 por motivos comerciales, no de seguridad.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La sermorelina actúa sobre el receptor de GHRH (GHRH-R), un receptor acoplado a proteína G de clase B expresado en los somatotropos hipofisarios. Su activación eleva el AMP cíclico intracelular, activa la proteína cinasa A y estimula tanto la transcripción del gen de la hormona de crecimiento como la liberación de gránulos preformados. Por actuar corriente arriba de la hipófisis, conserva la retroalimentación fisiológica de la somatostatina y la IGF-1, lo que la vuelve una herramienta útil para estudiar la reserva hipofisaria, la pulsatilidad nocturna del eje GH/IGF-1 y la diferencia entre insuficiencia hipotalámica e hipofisaria en modelos experimentales.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es uno de los péptidos de esta categoría con mejor respaldo humano, aunque acotado. Existe literatura clínica sólida sobre su valor como prueba de estimulación de la reserva hipofisaria de hormona de crecimiento y datos de eficacia en deficiencia idiopática pediátrica que sustentaron su registro sanitario. Fuera de esos usos la evidencia se debilita rápido: no hay ensayos controlados de calidad que documenten efectos sobre composición corporal, sueño o rendimiento en adultos sanos. Además, su vida media plasmática es de pocos minutos y la respuesta depende de la integridad de la hipófisis, lo que limita la interpretación de estudios sin controles adecuados.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se maneja como polvo liofilizado en vial sellado, reconstituible con agua bacteriostática añadida lentamente por la pared del vial y sin agitación vigorosa. Es un péptido relativamente lábil: el material seco se mantiene estable en congelación y protegido de la luz, mientras que la solución reconstituida requiere refrigeración constante y tiene una vida útil corta. Conviene fraccionar en alícuotas para evitar ciclos de congelación y descongelación, y registrar la fecha de reconstitución en el vial.'],
      },
    ],
  },

  'tesamorelina': {
    tagline: 'Análogo estabilizado de GHRH con registro sanitario',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La tesamorelina es un análogo sintético de la hormona liberadora de hormona de crecimiento humana completa, de 44 aminoácidos, modificado en el extremo amino con un grupo trans-3-hexenoilo. Esa modificación bloquea el sitio preferente de corte de la dipeptidil peptidasa 4 y le confiere una estabilidad plasmática muy superior a la de la GHRH nativa y a la del fragmento 1-29. Es el único análogo de GHRH con aprobación regulatoria vigente en Estados Unidos, autorizado en 2010 bajo la marca Egrifta para la reducción de grasa abdominal excesiva en adultos con lipodistrofia asociada a VIH.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Su blanco es el receptor de GHRH en los somatotropos hipofisarios, con la consecuente señalización por AMP cíclico y proteína cinasa A, liberación pulsátil de hormona de crecimiento y elevación secundaria de IGF-1 hepática. La línea de investigación mejor definida es la del tejido adiposo visceral, que es especialmente sensible a la acción lipolítica de la hormona de crecimiento. A partir de ahí se han derivado estudios sobre esteatosis hepática y fibrosis en enfermedad hepática grasa asociada a VIH, perfil lipídico, sensibilidad a la insulina y, de forma más exploratoria, marcadores cognitivos en deterioro cognitivo leve.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es el compuesto de esta familia con la base humana más firme. Dos ensayos aleatorizados de fase 3 con más de ochocientos participantes documentaron reducciones del tejido adiposo visceral cercanas al quince por ciento a las veintiséis semanas, medidas por tomografía, con reducciones adicionales de grasa hepática en estudios posteriores. Los límites son reales y conviene nombrarlos: el efecto revierte al suspender la administración, eleva IGF-1 y puede deteriorar la tolerancia a la glucosa, y la evidencia se generó en una población clínica específica, por lo que no es extrapolable a personas sanas ni a otros contextos metabólicos.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizada en vial de vidrio, generalmente con manitol como agente formador de torta. Se reconstituye con agua bacteriostática vertida contra la pared del vial y se homogeniza por rotación suave, nunca agitando. El polvo seco es estable en congelación y protegido de la luz durante periodos prolongados; una vez reconstituida, la solución debe refrigerarse, mantenerse en oscuridad y usarse en un plazo corto. Se descarta cualquier vial con turbidez, partículas visibles o cambio de color.'],
      },
    ],
  },

  'hgh': {
    tagline: 'Hormona de crecimiento humana recombinante',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La hormona de crecimiento humana, denominada somatropina en su forma recombinante, es una proteína de cadena única de 191 aminoácidos y aproximadamente 22 kilodaltons, estabilizada por dos puentes disulfuro internos y plegada en un haz de cuatro hélices alfa. En el organismo la sintetizan y secretan de forma pulsátil los somatotropos de la adenohipófisis, bajo control opuesto de la GHRH y la somatostatina. El material de investigación se produce por tecnología de ADN recombinante en sistemas bacterianos o de células de mamífero, con secuencia idéntica a la humana nativa.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La somatropina actúa sobre el receptor de hormona de crecimiento, un receptor de citocinas de clase I que se dimeriza al unir el ligando y activa la cinasa JAK2 y los factores de transcripción STAT5a y STAT5b, además de las vías PI3K/AKT y MAPK. Buena parte de sus efectos anabólicos se ejercen de forma indirecta mediante la IGF-1 producida en hígado. Las líneas de investigación abarcan crecimiento longitudinal y placa de crecimiento, recambio proteico y balance nitrogenado, lipólisis del adipocito visceral, retención de sodio y agua, resistencia a la insulina inducida por hormona de crecimiento, y regeneración de tejidos conectivos.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia humana es amplia y de buena calidad en las indicaciones para las que existe registro sanitario: deficiencia de hormona de crecimiento en niños y adultos, síndrome de Turner, síndrome de Prader-Willi, insuficiencia renal crónica pediátrica y bajo peso para edad gestacional sin recuperación. Fuera de ese terreno el panorama cambia. En adultos sanos los estudios controlados muestran cambios modestos de composición corporal sin mejoras funcionales consistentes, acompañados de edema, artralgias, síndrome del túnel del carpo e intolerancia a la glucosa. La relación entre exposición prolongada y riesgo neoplásico sigue siendo un punto abierto en la literatura.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra liofilizada, con frecuencia acompañada de un diluyente propio; también existen presentaciones en solución. Al ser una proteína grande y de plegamiento complejo es más sensible que un péptido corto: la reconstitución con agua bacteriostática debe hacerse por la pared del vial, sin agitar, para no generar espuma ni agregados. Su potencia se expresa tanto en miligramos como, históricamente, en unidades internacionales referidas a un estándar de la Organización Mundial de la Salud. Conservar en refrigeración, protegida de la luz y sin congelar la solución.'],
      },
    ],
  },

  'somatropina-hgh-191aa': {
    tagline: 'Somatropina de secuencia completa 191 aminoácidos',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La designación 191AA identifica a la somatropina recombinante de secuencia completa, con exactamente los 191 aminoácidos de la hormona de crecimiento humana nativa y sin residuos añadidos. La distinción tiene origen histórico: las primeras somatropinas recombinantes producidas en Escherichia coli conservaban una metionina extra en el extremo amino, la llamada met-hGH de 192 aminoácidos, que resultaba más inmunogénica. Los sistemas de expresión modernos, con secreción al periplasma bacteriano o expresión en células de mamífero, permiten obtener la cadena de 191 residuos con el plegamiento y los puentes disulfuro correctos.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Además de la biología del receptor de hormona de crecimiento y de la cascada JAK2/STAT5 que comparte con cualquier somatropina, el material 191AA se emplea como referencia analítica. Interesa aquí la caracterización fisicoquímica: proporción entre la isoforma de 22 kilodaltons y la variante de empalme de 20 kilodaltons, presencia de formas desamidadas u oxidadas, dímeros y agregados de alto peso molecular, y perfil de impurezas de proceso derivadas de la célula huésped. Estas variables se estudian por cromatografía líquida de alta resolución, exclusión por tamaño, electroforesis capilar y espectrometría de masas, y son las que determinan la comparabilidad entre lotes.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Que la somatropina de 191 aminoácidos es farmacológicamente equivalente a la hormona endógena está bien establecido y es la base de décadas de uso clínico registrado. Lo que la literatura también documenta con claridad es que la identidad declarada no garantiza la calidad real del material: los análisis independientes de productos no registrados que circulan en el mercado han encontrado con frecuencia contenido proteico menor al declarado, agregación elevada y presencia de endotoxina. Para un laboratorio esto significa que la etiqueta 191AA es una afirmación de secuencia, no un certificado de pureza, y que sin certificado de análisis del lote la caracterización queda pendiente.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Vial liofilizado que suele contener excipientes estabilizantes como glicina o manitol y un amortiguador de fosfato. La reconstitución se hace con agua bacteriostática o con el diluyente provisto, dejando escurrir el líquido por la pared del vial y disolviendo por rotación lenta hasta obtener una solución limpia y sin partículas. Su potencia puede rotularse en miligramos o en unidades internacionales, según el estándar de referencia empleado. El liofilizado se guarda refrigerado o congelado y en oscuridad; la solución permanece en refrigeración, nunca congelada.'],
      },
    ],
  },

  'mgf': {
    tagline: 'Variante de empalme muscular de la IGF-1',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['El MGF, o factor de crecimiento mecánico, es el nombre común de la IGF-1Ec, una variante de empalme alternativo del gen de la IGF-1 humana. Un inserto de 49 pares de bases en el exón 5 produce un corrimiento del marco de lectura que genera un péptido E carboxiterminal distinto al de la isoforma IGF-1Ea predominante. El material que se comercializa para investigación corresponde a ese dominio E aislado, un péptido de 24 aminoácidos. También existe la versión pegilada, PEG-MGF, en la que se une polietilenglicol para prolongar su permanencia en circulación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La expresión de IGF-1Ec se induce en músculo esquelético tras estiramiento mecánico, daño o estimulación eléctrica, de donde proviene su nombre. El interés experimental está en que el péptido E parece actuar de manera independiente del receptor de IGF-1 clásico: activa células satélite quiescentes y promueve la proliferación de mioblastos sin empujarlos a diferenciarse, mientras que la IGF-1 madura hace lo contrario. De ahí el modelo de dos fases de la reparación muscular. Se ha explorado también en cardiomiocitos tras infarto experimental, en condrocitos de placa de crecimiento y en neurogénesis del hipocampo en ratones envejecidos.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia es enteramente preclínica y de laboratorio. Los datos de cultivo celular sobre activación de células satélite son reproducibles y el papel de la isoforma dentro de la fisiología del músculo está razonablemente bien descrito. Lo que no existe es un solo ensayo clínico publicado del péptido E administrado como compuesto en humanos. A esto se suma un problema farmacocinético serio: el péptido no pegilado tiene una vida media en suero de pocos minutos, lo que vuelve difícil trasladar los hallazgos in vitro a un modelo entero, y explica por qué la pegilación se propuso como alternativa. Los efectos sobre hipertrofia en personas no están demostrados.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado, habitualmente con manitol o acetato residual del proceso de purificación. Se reconstituye con agua bacteriostática aplicada lentamente sobre la pared del vial y se disuelve por rotación suave, evitando vórtice y espuma. Es un péptido sensible a proteasas y a la temperatura: el liofilizado se conserva en congelación y protegido de la luz, y la solución debe mantenerse refrigerada por periodos cortos. La forma pegilada es algo más estable en solución, pero aplican las mismas precauciones de manipulación.'],
      },
    ],
  },

  'follistatin': {
    tagline: 'Glicoproteína secuestradora de miostatina y activina',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La folistatina es una glicoproteína secretada, no un péptido corto, codificada por el gen FST y expresada en gónadas, hipófisis, hígado y músculo. El empalme alternativo del transcrito genera dos isoformas principales: la de 288 aminoácidos, con alta afinidad por la superficie celular a través de heparán sulfato, y la de 315 aminoácidos derivada del precursor FST344, que circula libremente en plasma y es la que suele ofrecerse como material de investigación bajo el nombre folistatina 344. Su estructura incluye tres dominios ricos en cisteína que forman la superficie de unión a sus ligandos.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La folistatina funciona como antagonista extracelular de varios ligandos de la superfamilia TGF-beta: se une con alta afinidad a la activina A, a la miostatina o GDF-8 y a la GDF-11, impidiendo que alcancen el receptor de activina tipo IIB. Al bloquear esa unión suprime la señalización SMAD2/SMAD3 que normalmente frena el crecimiento muscular. Las líneas de investigación incluyen hipertrofia y regeneración de músculo esquelético, distrofias musculares, caquexia asociada a cáncer y a enfermedad renal, fibrosis tisular, y por su acción sobre la activina también la regulación de FSH hipofisaria y la función reproductiva.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Los datos preclínicos son contundentes: los ratones que sobreexpresan folistatina alcanzan aumentos de masa muscular muy superiores a los del ratón sin miostatina, precisamente porque además neutralizan activina. En humanos la evidencia proviene casi por completo de terapia génica, no de proteína administrada: los ensayos de fase 1/2a con AAV1-FS344 inyectado en músculo de pacientes con distrofia de Becker y miositis por cuerpos de inclusión mostraron aumentos de volumen muscular y mejoras modestas en la caminata de seis minutos, en cohortes muy pequeñas y sin grupo control robusto. No hay ensayos de folistatina recombinante inyectada. Su vida media plasmática es de minutos.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se distribuye liofilizada, con frecuencia sobre un excipiente proteico o de azúcar que protege la torta durante el secado. Al ser una glicoproteína es más frágil que un péptido sintético: la reconstitución con agua bacteriostática debe hacerse muy lentamente por la pared del vial, sin agitar, para evitar desnaturalización y agregación. El material seco se conserva en congelación profunda y protegido de la luz; la solución se mantiene refrigerada por tiempo limitado y se recomienda fraccionar en alícuotas de un solo uso.'],
      },
    ],
  },

  'semax': {
    tagline: 'Heptapéptido neuroactivo derivado de la ACTH',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Semax es un heptapéptido sintético de secuencia Met-Glu-His-Phe-Pro-Gly-Pro, desarrollado en el Instituto de Genética Molecular de la Academia Rusa de Ciencias. Su fragmento activo corresponde a los residuos 4 a 7 de la hormona adrenocorticotropa, al que se añadió la cola tripeptídica Pro-Gly-Pro para conferirle resistencia a las peptidasas y prolongar su permanencia biológica. Esa modificación elimina la actividad corticotropa del fragmento original: Semax no estimula la corteza suprarrenal. Está registrado en Rusia como medicamento para indicaciones neurológicas y no cuenta con aprobación de agencias occidentales.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Semax no tiene un receptor propio identificado; su acción parece indirecta y multifactorial. La observación más reproducida es el aumento rápido de la expresión de BDNF y de su receptor TrkB en hipocampo y corteza frontal, con activación corriente abajo de las vías PI3K/AKT y MAPK. Se han descrito además modulación de los sistemas dopaminérgico y serotoninérgico, inhibición de la degradación de encefalinas, reducción de la expresión de genes proinflamatorios y de estrés oxidativo tras isquemia, y efectos sobre la melanocortina sin activación clásica de receptores MC. Las líneas principales son ictus isquémico, neuroprotección, atención y memoria.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Existe un cuerpo clínico real, pero geográficamente concentrado y metodológicamente limitado. Los estudios rusos en ictus isquémico agudo, incluido el trabajo de Gusev y colaboradores con más de cien pacientes, reportan elevación sostenida de BDNF plasmático y mejores puntajes de déficit neurológico frente a tratamiento estándar. El problema es que casi toda esa literatura se publicó en revistas rusas, con tamaños de muestra y estándares de cegamiento que no cumplirían los criterios de una fase 3 occidental, y sin replicación independiente fuera de la región. Para uso cognitivo en personas sanas no hay ensayos controlados de calidad. La evidencia debe considerarse preliminar.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado en vial sellado y es un péptido relativamente robusto en estado seco, estable durante meses en congelación y protegido de la luz. La reconstitución se realiza con agua bacteriostática dejando caer el líquido por la pared interna del vial y disolviendo por rotación lenta, sin agitación ni vórtice. Una vez en solución conviene refrigerarlo, mantenerlo en oscuridad y limitar el tiempo de uso a pocas semanas. Deben evitarse los ciclos de congelación y descongelación de la solución reconstituida.'],
      },
    ],
  },

  'selank': {
    tagline: 'Análogo estabilizado de tuftsina con perfil ansiolítico',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Selank es un heptapéptido sintético de secuencia Thr-Lys-Pro-Arg-Pro-Gly-Pro, diseñado en el Instituto de Genética Molecular de la Academia Rusa de Ciencias. Su núcleo corresponde a la tuftsina, un tetrapéptido endógeno inmunomodulador que se libera por proteólisis de la región Fc de la inmunoglobulina G, al que se añadió la cola Pro-Gly-Pro para resistir la degradación por peptidasas y prolongar su acción. Está registrado como medicamento en Rusia bajo el mismo nombre y no cuenta con autorización regulatoria en Norteamérica ni en la Unión Europea.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La investigación describe un mecanismo mixto y aún no del todo resuelto. Se ha reportado modulación alostérica positiva de la unión de GABA al receptor GABA-A, junto con cambios en la expresión de subunidades de ese receptor en cultivos neuronales. A ello se suman la inhibición de las enzimas que degradan encefalinas, con prolongación de la señalización opioide endógena, aumento de la expresión de BDNF en hipocampo, y modulación de serotonina, dopamina y noradrenalina. Su herencia de tuftsina explica además la línea inmunológica: efectos sobre interleucina 6, interferones y actividad de macrófagos. Las áreas estudiadas son ansiedad, neurastenia, atención y memoria.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Selank tiene más datos humanos que la mayoría de los péptidos nootrópicos: se han publicado ensayos con varios cientos de pacientes con trastorno de ansiedad generalizada y neurastenia, incluidos estudios comparativos frente a la benzodiacepina medazepam en los que la reducción de ansiedad fue similar pero sin sedación ni síndrome de abstinencia. Las limitaciones son las mismas que las de Semax y hay que decirlas con claridad: los estudios se realizaron casi exclusivamente en Rusia, con muestras pequeñas, criterios diagnósticos locales y publicación en revistas de difícil acceso, sin replicación independiente occidental. La evidencia es sugerente, no concluyente.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se maneja como polvo liofilizado en vial sellado. La reconstitución habitual se hace con agua bacteriostática vertida despacio contra la pared del vial, homogenizando por rotación suave y evitando espuma. El material seco es estable durante meses si se conserva congelado y al abrigo de la luz; en solución debe refrigerarse y utilizarse en un plazo acotado, ya que la cola Pro-Gly-Pro lo protege de proteasas pero no de la hidrólisis química. Fraccionar en alícuotas reduce el deterioro por manipulación repetida.'],
      },
    ],
  },

  'dsip': {
    tagline: 'Nonapéptido asociado al sueño de ondas lentas',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['El DSIP, o péptido inductor del sueño delta, es un nonapéptido de secuencia Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu y peso molecular cercano a 849 daltons. Fue aislado en 1977 por Schoenenberger y Monnier a partir de sangre venosa cerebral de conejos sometidos a estimulación eléctrica del tálamo intralaminar, un procedimiento que inducía sueño de ondas lentas. Su estructura no guarda parecido con ninguna de las familias peptídicas conocidas, y a casi cinco décadas de su descripción no se han identificado con certeza ni su gen precursor ni un receptor propio.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Al no conocerse un receptor específico, los mecanismos propuestos siguen siendo indirectos. La literatura describe modulación del eje hipotálamo-hipófisis-suprarrenal con atenuación de la respuesta de corticotropina al estrés, interacción con sistemas GABAérgicos y opioides, efectos sobre la liberación de hormona de crecimiento y de somatostatina, y actividad antioxidante en modelos de estrés oxidativo. Las líneas de investigación documentadas incluyen arquitectura del sueño medida por electroencefalografía, con foco en las fases de ondas lentas, respuesta al estrés y termorregulación, modelos de dolor crónico y síndrome de abstinencia, y protección celular frente a daño isquémico.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia es antigua, fragmentada y francamente inconsistente. Los estudios en animales muestran resultados que dependen de la especie: predominio de sueño delta en conejo, rata y ratón, pero efecto más marcado sobre sueño REM en gato. En humanos los pocos estudios doble ciego en insomnio crónico reportaron mejor eficiencia del sueño y menor latencia de conciliación, aunque otros trabajos no encontraron diferencias frente a placebo. Una revisión clásica en Journal of Neurochemistry describe al compuesto como un enigma sin resolver, precisamente por la ausencia de gen, receptor y ruta identificados. No hay ensayos modernos con metodología actual.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se distribuye liofilizado en vial sellado y se reconstituye con agua bacteriostática aplicada lentamente sobre la pared interna, disolviendo por rotación y sin agitación mecánica. Es un péptido pequeño y sin puentes disulfuro, razonablemente estable en estado seco bajo congelación y protegido de la luz, pero susceptible a hidrólisis y a proteasas en solución. La solución reconstituida debe conservarse en refrigeración por periodos cortos, en alícuotas, evitando ciclos repetidos de congelación y descongelación.'],
      },
    ],
  },

  'melatonina': {
    tagline: 'Indolamina pineal reguladora del ritmo circadiano',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La melatonina, químicamente N-acetil-5-metoxitriptamina, no es un péptido sino una indolamina de bajo peso molecular. Se sintetiza principalmente en la glándula pineal a partir de triptófano, que pasa a serotonina y luego es acetilada por la arilalquilamina N-acetiltransferasa y metilada por la acetilserotonina O-metiltransferasa. Su producción está bajo control del núcleo supraquiasmático del hipotálamo y sigue un patrón nocturno que la luz suprime de forma directa. También se produce en retina, tracto gastrointestinal y médula ósea. El material de investigación se obtiene por síntesis química, no por extracción.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La melatonina actúa sobre dos receptores acoplados a proteína G, MT1 y MT2, ambos expresados densamente en el núcleo supraquiasmático, donde MT1 atenúa la activación neuronal y MT2 media el desplazamiento de fase del reloj circadiano. Existe además un sitio de unión MT3 correspondiente a la quinona reductasa 2, y una actividad antioxidante directa independiente de receptor por captación de especies reactivas. Las líneas de investigación documentadas incluyen sincronización circadiana y curvas de respuesta de fase, latencia de conciliación del sueño, termorregulación nocturna, función inmunitaria, protección mitocondrial y modelos de neurodegeneración e isquemia.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia humana es abundante y desigual según la pregunta. Es sólida para el desplazamiento de fase circadiana: síndrome de fase de sueño retrasada, trastorno del ritmo no de 24 horas en personas ciegas y desfase por viajes transmeridianos, donde el efecto depende críticamente del momento de administración respecto al reloj interno. Para insomnio primario los metaanálisis muestran un efecto real pero pequeño, del orden de pocos minutos de reducción en la latencia de conciliación, muy inferior al de los hipnóticos convencionales. Las líneas antioxidante y oncológica siguen siendo mayoritariamente preclínicas, con estudios clínicos pequeños y heterogéneos.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['A diferencia de los péptidos de esta lista, la melatonina suele presentarse como polvo cristalino y no como liofilizado. Es poco soluble en agua, por lo que en laboratorio se disuelve primero en un vehículo como etanol o dimetilsulfóxido antes de diluir en solución acuosa; los viales liofilizados con excipientes solubilizantes se reconstituyen con agua bacteriostática. Es notablemente fotosensible y debe manejarse en vial ámbar o protegido de la luz. El polvo se conserva seco y congelado; las soluciones, refrigeradas y en oscuridad, por periodos cortos.'],
      },
    ],
  },

  'cerebrolysin': {
    tagline: 'Mezcla neuropeptídica de origen porcino',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Cerebrolysin no es una molécula única sino una preparación biológica compleja obtenida por degradación enzimática controlada de tejido cerebral porcino purificado y libre de lípidos. El producto final es una mezcla estandarizada de péptidos de bajo peso molecular, por debajo de diez kilodaltons, que representan alrededor del quince por ciento del contenido, junto con aminoácidos libres que constituyen el resto. Se comercializa en más de cincuenta países, sobre todo en Rusia, Europa del Este, China y varios países asiáticos, y no cuenta con aprobación de la agencia regulatoria estadounidense para ninguna indicación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El fundamento propuesto es que sus fracciones peptídicas imitan la actividad de factores neurotróficos endógenos como el factor de crecimiento nervioso, el BDNF, el factor neurotrófico ciliar y el GDNF, actuando sobre receptores de tirosina cinasa de la familia Trk. En modelos experimentales se han descrito reducción de la excitotoxicidad glutamatérgica, inhibición de calpaínas, modulación del procesamiento de la proteína precursora de amiloide, disminución de la microgliosis y aumento de la neurogénesis hipocampal. Las líneas clínicas investigadas son ictus isquémico agudo y neurorrehabilitación, demencia vascular, enfermedad de Alzheimer, traumatismo craneoencefálico y hemorragia subaracnoidea.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Aquí hay una discrepancia notable que conviene nombrar sin adornos. Existen numerosos ensayos aleatorizados positivos, en su mayoría financiados por el fabricante, pero las revisiones sistemáticas Cochrane a lo largo de tres décadas han concluido de forma reiterada que la evidencia es insuficiente. En ictus isquémico agudo, la actualización que reunió siete ensayos y cerca de mil ochocientos participantes no encontró beneficio sobre mortalidad ni dependencia, y sí un aumento estadísticamente significativo de eventos adversos graves no fatales. En demencia vascular los revisores describieron ganancias cognitivas posibles pero con estudios escasos, heterogéneos y de corta duración, sin recomendar su uso rutinario.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['A diferencia de los péptidos sintéticos, Cerebrolysin no se suministra liofilizado sino como solución acuosa estéril lista en ampolletas de vidrio, por lo que no requiere reconstitución con agua bacteriostática. Se conserva a temperatura ambiente controlada o en refrigeración según el fabricante, siempre protegido de la luz y sin congelar. Es incompatible con soluciones de aminoácidos balanceadas y con medios de pH alterado, por lo que no debe mezclarse con otras preparaciones en el mismo recipiente. Se descarta cualquier ampolleta con turbidez o partículas.'],
      },
    ],
  },

  'p21': {
    tagline: 'Tetrapéptido neurotrófico derivado del CNTF',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['P21, también designado P021 en la literatura original, es un compuesto peptidérgico sintético muy pequeño desarrollado en el laboratorio de Khalid Iqbal. Se obtuvo por mapeo de epítopos del factor neurotrófico ciliar: primero se identificó una región activa de once residuos, el llamado Peptide 6, correspondiente a los aminoácidos 146 a 156 del CNTF, y después esa región se redujo a un núcleo de cuatro aminoácidos al que se añadió un grupo adamantilo en el extremo carboxilo. La adamantilación aumenta la lipofilicidad y la estabilidad metabólica, y busca favorecer el paso por la barrera hematoencefálica.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El mecanismo descrito tiene dos brazos. Por un lado, P021 aumenta la expresión de BDNF, lo que activa la vía TrkB-PI3K-AKT y conduce a la fosforilación inhibitoria de la glucógeno sintasa cinasa 3 beta en la serina 9, una de las cinasas responsables de la hiperfosforilación de la proteína tau. Por otro, inhibe de forma competitiva la acción del factor inhibidor de leucemia sobre la vía STAT3, lo que libera el freno sobre la neurogénesis del giro dentado. Las líneas de investigación son enfermedad de Alzheimer y tauopatías, envejecimiento cognitivo, síndrome de Down y trastorno por deficiencia de CDKL5.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia es exclusivamente preclínica y debe presentarse como tal. Los estudios en el ratón triple transgénico 3xTg-AD, con administración prolongada en la dieta desde los tres meses de edad, reportan menor fosforilación de tau, preservación de espinas dendríticas, aumento de marcadores de neurogénesis hipocampal y mejor desempeño en pruebas cognitivas, con hallazgos concordantes en resonancia magnética de difusión. Sin embargo, no existe ningún ensayo publicado en humanos, ni siquiera de fase 1, y buena parte de los resultados proviene de un solo grupo de investigación con replicación externa muy limitada. Cualquier extrapolación clínica carece hoy de sustento.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado en vial sellado. La modificación con adamantano lo vuelve marcadamente lipofílico, por lo que la disolución directa en medio acuoso puede ser incompleta y en la práctica de laboratorio se emplea a menudo un codisolvente antes de diluir con agua bacteriostática. Debe homogenizarse por rotación suave, nunca agitando, y verificarse que la solución quede limpia. El liofilizado se conserva congelado y protegido de la luz; la solución, refrigerada, en alícuotas y por periodos cortos.'],
      },
    ],
  },

  'oxitocina': {
    tagline: 'Nonapéptido cíclico neurohipofisario',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La oxitocina es un nonapéptido cíclico cuya estructura se cierra por un puente disulfuro entre las cisteínas de las posiciones 1 y 6, con una cola tripeptídica amidada. Difiere de la vasopresina en solo dos aminoácidos, lo que explica la reactividad cruzada entre ambos sistemas. Se sintetiza en los núcleos paraventricular y supraóptico del hipotálamo como parte del precursor oxitocina-neurofisina I, viaja por transporte axonal y se libera desde la neurohipófisis. Su determinación de secuencia y síntesis química por Vincent du Vigneaud le valió el Premio Nobel de Química en 1955.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La oxitocina actúa sobre el receptor OXTR, acoplado principalmente a proteína Gq, que activa fosfolipasa C, genera inositol trifosfato y moviliza calcio intracelular, con contracción del músculo liso uterino y de las células mioepiteliales de la glándula mamaria. La densidad de receptores uterinos aumenta de manera marcada al final del embarazo. En paralelo existe una vía central: proyecciones oxitocinérgicas a amígdala, núcleo accumbens y corteza prefrontal sustentan la investigación en conducta social, apego, reconocimiento social, ansiedad y regulación del eje del estrés, tanto en roedores como en primates.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Conviene separar dos literaturas de calidad muy distinta. La evidencia obstétrica es sólida y de larga data: inducción y conducción del trabajo de parto y prevención de la hemorragia posparto están respaldadas por ensayos amplios y guías internacionales. La evidencia sobre conducta social es mucho más frágil. Los metaanálisis de oxitocina intranasal en trastornos del neurodesarrollo muestran efectos nulos o muy pequeños sobre reconocimiento de emociones y deterioro social, varios hallazgos iniciales sobre confianza y lectura de la mente no se han replicado, y el campo arrastra problemas reconocidos de muestras insuficientes, sesgo de publicación e incertidumbre sobre cuánto péptido llega realmente al cerebro por vía nasal.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se maneja como polvo liofilizado en vial sellado, aunque también existen presentaciones en solución acuosa amortiguada. La reconstitución se hace con agua bacteriostática vertida por la pared del vial, disolviendo por rotación suave para no comprometer el puente disulfuro que da forma al anillo. Es sensible al calor y a la agitación: el liofilizado se conserva congelado y protegido de la luz, y la solución requiere refrigeración constante, en alícuotas, con vida útil corta. Se evitan superficies de plástico no tratadas por adsorción del péptido.'],
      },
    ],
  },

  'hcg': {
    tagline: 'Gonadotropina placentaria agonista del receptor LH',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La gonadotropina coriónica humana es una glicoproteína heterodimérica producida por el sincitiotrofoblasto placentario. Consta de dos subunidades unidas de forma no covalente: una subunidad alfa de 92 aminoácidos, idéntica a la de LH, FSH y TSH, y una subunidad beta de 145 aminoácidos que le confiere especificidad y que comparte alrededor del ochenta por ciento de homología con la beta de LH. Su elevado contenido de carbohidratos, con cadenas terminadas en ácido siálico, explica su vida media plasmática notablemente más larga que la de la LH hipofisaria. Existen versiones extraídas de orina y recombinantes.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La hCG es agonista del receptor LHCGR, el mismo receptor de la hormona luteinizante, acoplado a proteína Gs y con señalización por AMP cíclico y proteína cinasa A. En el ovario sostiene el cuerpo lúteo y la producción de progesterona y desencadena la maduración final del ovocito; en el testículo estimula las células de Leydig y la esteroidogénesis. Las líneas de investigación documentadas incluyen inducción de ovulación en reproducción asistida, hipogonadismo hipogonadotrópico y preservación de la espermatogénesis, criptorquidia, biología del trofoblasto e implantación, y su papel como marcador tumoral en enfermedad trofoblástica y tumores germinales.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La base humana es amplia y de buena calidad en reproducción: su uso como desencadenante de la maduración ovocitaria y su papel en el mantenimiento de la esteroidogénesis testicular en varones con hipogonadismo secundario están bien documentados en ensayos y consensos clínicos. La evidencia es igualmente clara en el sentido contrario para otras aplicaciones: los ensayos controlados sobre pérdida de peso, realizados desde los años setenta, no encontraron diferencia alguna frente a placebo cuando se controló la restricción calórica, y las agencias regulatorias han emitido advertencias explícitas al respecto. Es un ejemplo útil de compuesto con indicaciones sólidas y usos populares sin sustento.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta como polvo liofilizado estéril en vial multidosis, cuya potencia se expresa en unidades internacionales referidas a un estándar de referencia y no en miligramos, dado que se trata de una glicoproteína cuya actividad depende de la glicosilación. Se reconstituye con agua bacteriostática dirigida a la pared del vial y se disuelve por rotación lenta, sin agitar. El liofilizado es estable a temperatura controlada; una vez reconstituida, la solución exige refrigeración, protección de la luz y un plazo de uso limitado.'],
      },
    ],
  },

  'hmg': {
    tagline: 'Menotropinas con actividad FSH y LH combinada',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La gonadotropina menopáusica humana, conocida genéricamente como menotropina, es una preparación de gonadotropinas purificada a partir de orina de mujeres posmenopáusicas, en quienes la ausencia de retroalimentación ovárica eleva de forma sostenida la excreción de FSH y LH. Contiene actividad de hormona folículo estimulante y de hormona luteinizante en proporción aproximadamente equivalente por unidades internacionales, junto con otras glicoproteínas urinarias residuales. En las preparaciones altamente purificadas actuales, buena parte de la actividad tipo LH proviene en realidad de gonadotropina coriónica, un punto documentado en los análisis de composición.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El componente FSH actúa sobre el receptor FSHR de las células de la granulosa, promoviendo el reclutamiento y el crecimiento folicular y la expresión de aromatasa; el componente con actividad LH actúa sobre el receptor LHCGR de las células de la teca, aportando el sustrato androgénico necesario para la síntesis de estradiol según el modelo clásico de dos células y dos gonadotropinas. Las líneas de investigación se concentran en estimulación ovárica controlada para fertilización in vitro, comparación entre preparaciones urinarias y recombinantes, calidad ovocitaria y embrionaria, receptividad endometrial, y estimulación en varones con hipogonadismo hipogonadotrópico junto con hCG.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es una de las preparaciones con historia clínica más larga, en uso desde los años sesenta, y cuenta con un cuerpo importante de ensayos aleatorizados y revisiones sistemáticas en reproducción asistida. Los metaanálisis que comparan menotropinas altamente purificadas con FSH recombinante muestran diferencias modestas y no siempre concordantes: algunos reportan tasas de nacido vivo ligeramente superiores con HMG, otros no encuentran diferencia significativa, y los protocolos, poblaciones y criterios de desenlace varían considerablemente entre estudios. La heterogeneidad de lotes propia de un producto de origen urinario es una limitación estructural reconocida frente a las preparaciones recombinantes.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra como polvo liofilizado en vial, con frecuencia acompañado de una ampolleta de diluyente. Su potencia se expresa en unidades internacionales de actividad FSH y LH frente a un estándar de referencia, no en unidades de masa, porque se trata de una mezcla de glicoproteínas. Se reconstituye con agua bacteriostática o con el diluyente provisto, dejando escurrir el líquido por la pared del vial y disolviendo por rotación sin agitar. El liofilizado se conserva refrigerado y protegido de la luz; la solución debe usarse en un plazo breve.'],
      },
    ],
  },

  'epo': {
    tagline: 'Glicoproteína reguladora de la eritropoyesis',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La eritropoyetina es una glicoproteína de 165 aminoácidos y peso molecular aproximado de treinta a treinta y cuatro kilodaltons, de la cual cerca del cuarenta por ciento corresponde a cadenas de carbohidratos con tres sitios de N-glicosilación y uno de O-glicosilación. La producen principalmente los fibroblastos intersticiales peritubulares del riñón en respuesta a hipoxia, mediante el factor inducible por hipoxia HIF-2 alfa, con una contribución menor del hígado. La versión recombinante humana se expresa en células de ovario de hámster chino, y las diferencias de glicosilación entre productos definen las distintas epoetinas y análogos hiperglicosilados.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La eritropoyetina se une al receptor EPOR en progenitores eritroides de médula ósea, provocando su homodimerización y la autofosforilación de la cinasa JAK2 preasociada. Desde ahí se activan tres cascadas interconectadas: JAK2/STAT5, PI3K/AKT y RAS/MAPK, que en conjunto sostienen la supervivencia, proliferación y diferenciación de los precursores eritroides e inhiben su apoptosis. Las líneas de investigación incluyen anemia de la enfermedad renal crónica y oncológica, biología del hierro y la hepcidina, y una rama no hematopoyética que explora receptores EPOR en tejido nervioso y cardiaco con estudios de neuroprotección en isquemia cerebral y encefalopatía neonatal.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia hematológica es muy sólida: la eritropoyetina recombinante transformó el tratamiento de la anemia renal y redujo drásticamente la dependencia transfusional, con décadas de ensayos que lo respaldan. Pero la literatura también documenta con claridad dónde está el límite. Los ensayos que buscaron normalizar la hemoglobina, entre ellos CHOIR, CREATE y TREAT, mostraron aumento de eventos cardiovasculares, trombosis y mortalidad frente a objetivos más conservadores, lo que obligó a modificar guías y etiquetas. En oncología se documentó menor supervivencia en algunos escenarios. La rama neuroprotectora sigue siendo mayoritariamente preclínica y con resultados clínicos inconsistentes.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Su potencia se expresa en unidades internacionales frente a un estándar de la Organización Mundial de la Salud, no en unidades de masa, porque la actividad biológica depende de manera crítica del patrón de glicosilación. Se suministra tanto liofilizada como en solución amortiguada con albúmina o polisorbato. Es una de las moléculas más frágiles de esta lista: no debe congelarse en solución ni agitarse, ya que ambos factores generan agregados y pérdida de actividad. Se conserva en refrigeración estricta, protegida de la luz, y se descarta si presenta turbidez.'],
      },
    ],
  },

  'vip': {
    tagline: 'Neuropéptido vasodilatador e inmunomodulador',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['El péptido intestinal vasoactivo es un neuropéptido de 28 aminoácidos perteneciente a la superfamilia de la secretina y el glucagón, emparentado estructuralmente con la PACAP y con la propia GHRH. Fue aislado originalmente de intestino porcino, de donde toma su nombre, aunque se expresa ampliamente en el sistema nervioso central y periférico, en neuronas entéricas, en fibras que inervan vía aérea y vasos pulmonares, y en linfocitos y mastocitos. Su forma sintética recibe la denominación común internacional de aviptadil.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El VIP actúa sobre dos receptores acoplados a proteína G, VPAC1 y VPAC2, y con menor afinidad sobre PAC1. La unión activa adenilato ciclasa, eleva el AMP cíclico y activa la proteína cinasa A, lo que produce relajación del músculo liso vascular y bronquial y, en la célula inmunitaria, estabilización del complejo IkB-NF-kB que impide la translocación nuclear de este último y frena la transcripción de genes proinflamatorios. Las líneas de investigación documentadas incluyen hipertensión arterial pulmonar, sarcoidosis, síndrome de dificultad respiratoria aguda, asma, enfermedad inflamatoria intestinal y protección de células beta pancreáticas.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia humana es escasa y en su mayor parte decepcionante, y conviene decirlo sin matices. En sarcoidosis solo existe un estudio abierto de fase 2 con veinte pacientes que reportó buena tolerancia, menor producción de TNF alfa y aumento de linfocitos T reguladores, sin grupo control. En hipertensión arterial pulmonar, los estudios con VIP inhalado arrojaron resultados hemodinámicos negativos que llevaron a replantear el programa. En síndrome de dificultad respiratoria aguda el aviptadil obtuvo designación de medicamento huérfano, pero los ensayos posteriores no produjeron resultados convincentes. A ello se suma una vida media plasmática de apenas uno a dos minutos, que es en sí misma un obstáculo mayor.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado en vial sellado, con frecuencia sobre un excipiente estabilizante por su marcada tendencia a adsorberse a superficies. La reconstitución se hace con agua bacteriostática vertida lentamente por la pared interna del vial y homogenizada por rotación suave, sin agitación ni vórtice. Es un péptido notablemente lábil frente a proteasas, oxidación y adsorción al plástico y al vidrio no siliconizado. El liofilizado se conserva congelado y protegido de la luz; la solución, refrigerada, en alícuotas de un solo uso y por periodos muy cortos.'],
      },
    ],
  },

  'epithalon': {
    tagline: 'Tetrapéptido pineal sintético AEDG',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Epithalon, también escrito epitalon, es un tetrapéptido sintético formado por alanina, ácido glutámico, ácido aspártico y glicina (Ala-Glu-Asp-Gly, AEDG). Fue diseñado en el Instituto de Bioregulación y Gerontología de San Petersburgo como versión corta y sintética de la epitalamina, un extracto polipeptídico de glándula pineal bovina. Pertenece a la familia de los llamados bioreguladores peptídicos cortos o péptidos de Khavinson: moléculas de dos a cuatro aminoácidos propuestas como señales reguladoras tejido-específicas. Se distribuye como polvo liofilizado de grado reactivo, con pureza declarada por HPLC, exclusivamente como material de investigación (RUO).'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La hipótesis central del grupo que lo desarrolló es que los péptidos muy cortos pueden entrar al núcleo, interactuar con secuencias de ADN y modular la transcripción de genes concretos. Sobre esa base, epithalon se ha estudiado en cultivos celulares por su posible efecto sobre la expresión de la subunidad catalítica de la telomerasa (hTERT) y la longitud de los telómeros en fibroblastos humanos, sobre la síntesis de melatonina y los ritmos circadianos en modelos animales, y sobre marcadores de senescencia, degeneración retiniana e incidencia tumoral en roedores envejecidos. También se usa como herramienta comparativa frente a otros bioreguladores cortos.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es imprescindible ser claro: la enorme mayoría de la literatura sobre epithalon procede de un solo grupo de investigación ruso y de revistas afines, con muy poca replicación internacional independiente. Existen algunos trabajos in vitro recientes de otros laboratorios que exploran su efecto sobre telomerasa, pero los datos de prolongación de vida en roedores y los reportes clínicos en humanos no han sido reproducidos por equipos externos, y varios estudios son abiertos, pequeños o metodológicamente débiles. No existe aprobación regulatoria en México, Estados Unidos ni la Unión Europea. Debe tratarse como un compuesto experimental de evidencia limitada y de una sola fuente.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta en viales de vidrio con polvo liofilizado sellados al vacío o bajo gas inerte. El material liofilizado es estable durante meses conservado en congelación y protegido de la luz y la humedad. La reconstitución se hace en condiciones asépticas con agua estéril o bacteriostática, dejando que el disolvente escurra por la pared del vial sin agitar con fuerza. Una vez reconstituido conviene mantenerlo en refrigeración, evitar ciclos repetidos de congelación y descongelación, y registrar la fecha de apertura. Material exclusivamente de laboratorio.'],
      },
    ],
  },

  'thymalin': {
    tagline: 'Extracto polipeptídico de timo bovino',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Thymalin es un complejo polipeptídico obtenido por extracción y fraccionamiento de timo de ternera, no una molécula única. Se trata de una mezcla de péptidos de bajo peso molecular desarrollada en la Unión Soviética en los años setenta y ochenta dentro de la misma escuela que produjo los bioreguladores peptídicos cortos. Su composición exacta varía entre lotes y fabricantes, lo que complica su caracterización analítica frente a un péptido sintético definido. De esa fracción se derivaron después péptidos sintéticos cortos como Vilon (Lys-Glu) y Crystagen. Se suministra liofilizado como material de investigación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Las líneas de investigación publicadas lo describen como inmunomodulador tímico: se ha estudiado su efecto sobre la diferenciación y maduración de linfocitos T, el equilibrio de subpoblaciones CD4 y CD8, la producción de citocinas de perfil Th1 y la respuesta inmune en modelos de involución tímica asociada a la edad. También aparece en trabajos sobre infecciones virales, sepsis, síndrome de dificultad respiratoria y recuperación inmunológica tras quimioterapia o radiación. En el marco teórico de sus autores, los péptidos del timo actuarían como señales de restauración funcional del tejido de origen, hipótesis que sigue siendo objeto de debate.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia es casi exclusivamente rusa y proviene del mismo entorno institucional que desarrolló el producto, publicada en buena parte en revistas locales o de bajo factor de impacto. No hay ensayos aleatorizados grandes, independientes y bien controlados en Occidente. A esto se suma un problema estructural: al ser un extracto y no una molécula definida, la reproducibilidad entre lotes es difícil de garantizar, razón por la cual las agencias regulatorias occidentales nunca lo han evaluado. Los reportes sobre infecciones respiratorias graves son de calidad metodológica limitada. Debe considerarse un material experimental con respaldo científico débil y poco replicado.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta como polvo liofilizado en viales sellados. Por tratarse de una mezcla proteica derivada de tejido animal, es sensible a la temperatura, la humedad y la luz; se conserva en refrigeración o congelación según indicación del proveedor. La reconstitución se realiza con técnica aséptica en disolvente estéril, sin agitación vigorosa para no desnaturalizar las fracciones proteicas. Una vez en solución, su estabilidad es corta y se recomienda refrigerar y evitar recongelar. Documentar lote y trazabilidad es especialmente importante en extractos biológicos.'],
      },
    ],
  },

  'pinealon': {
    tagline: 'Tripéptido corto EDR de estudio neuronal',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Pinealon es un tripéptido sintético con secuencia ácido glutámico, ácido aspártico y arginina (Glu-Asp-Arg, EDR). Forma parte de la serie de bioreguladores peptídicos cortos desarrollada por el grupo de Khavinson en San Petersburgo, en la que cada secuencia se asocia teóricamente a un tejido diana; en este caso, tejido nervioso y estructuras cerebrales. Su tamaño mínimo y su carga permitirían, según sus autores, atravesar membranas celulares y alcanzar el núcleo. Se comercializa como polvo liofilizado de grado reactivo para uso exclusivo en investigación, sin ninguna aprobación farmacéutica internacional.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Las publicaciones disponibles lo emplean en modelos de estrés oxidativo e hipoxia en cultivos neuronales, evaluando marcadores de apoptosis, especies reactivas de oxígeno y expresión de proteínas antioxidantes. También aparece en estudios de comportamiento en roedores sometidos a hipoxia prenatal o a privación de oxígeno, midiendo memoria y aprendizaje, y en trabajos de biología molecular que exploran la interacción directa de tripéptidos con secuencias específicas de ADN y con histonas. El marco conceptual es siempre el mismo: modulación epigenética y transcripcional tejido-específica, propuesta como explicación de una supuesta acción neuroprotectora.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Como en el resto de los bioreguladores de esta familia, la evidencia procede casi por completo de un único grupo ruso y de colaboradores cercanos, con escasa replicación internacional. Los estudios son mayoritariamente in vitro o en roedores, con tamaños de muestra pequeños y controles no siempre descritos con detalle. No existen ensayos clínicos aleatorizados publicados en revistas de alto impacto ni evaluación por agencias regulatorias occidentales. Los mecanismos moleculares propuestos, como la unión directa de un tripéptido a promotores génicos, siguen sin confirmación independiente robusta. Debe entenderse como una hipótesis de investigación, no como un efecto establecido.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se recibe liofilizado en viales de vidrio sellados. El polvo seco es razonablemente estable si se mantiene congelado, seco y protegido de la luz. La reconstitución se realiza con técnica aséptica usando agua estéril o bacteriostática, vertiendo lentamente sobre la pared del vial y girando con suavidad hasta disolución completa, sin agitar. La solución resultante se conserva refrigerada, protegida de la luz y con la fecha de reconstitución anotada; deben evitarse los ciclos de congelación y descongelación. Material de investigación únicamente.'],
      },
    ],
  },

  'bronchogen': {
    tagline: 'Tetrapéptido AEDL de investigación respiratoria',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Bronchogen es un tetrapéptido sintético con secuencia alanina, ácido glutámico, ácido aspártico y leucina (Ala-Glu-Asp-Leu, AEDL). Pertenece a la serie de bioreguladores peptídicos cortos del grupo de Khavinson y se presenta como el análogo sintético de fracciones peptídicas obtenidas de tejido bronquial y pulmonar animal. Dentro de la lógica de esa escuela, cada secuencia corta corresponde a un órgano diana, y a Bronchogen se le asigna el epitelio respiratorio. Se distribuye como polvo liofilizado de grado reactivo con pureza declarada por HPLC, únicamente como material de investigación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Los trabajos publicados lo utilizan en cultivos de células epiteliales bronquiales y de pulmón para evaluar proliferación, diferenciación, apoptosis y expresión de marcadores como surfactantes, mucinas o proteínas de unión celular. También aparece en modelos animales de daño pulmonar inducido, inflamación crónica de vías aéreas y envejecimiento del tejido respiratorio, midiendo histología e índices de regeneración epitelial. El mecanismo propuesto por sus autores es de nuevo la interacción del péptido con ADN y cromatina para modular selectivamente la expresión génica en el tejido correspondiente, hipótesis que no ha salido del marco teórico original.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La literatura sobre Bronchogen es escasa y casi toda proviene del mismo grupo ruso que lo desarrolló, sin replicación internacional relevante. Predominan los estudios in vitro con líneas y cultivos primarios, y algunos modelos animales; no existen ensayos clínicos controlados publicados en revistas de referencia. Buena parte del material que circula en internet sobre este compuesto es de origen comercial, no científico, y repite afirmaciones no verificadas. No cuenta con aprobación regulatoria en ningún mercado occidental. En términos prácticos, su base de evidencia es preliminar, de una sola fuente y claramente insuficiente para conclusiones firmes.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra liofilizado en viales sellados, forma en la que resulta estable durante periodos prolongados si se conserva congelado, seco y al abrigo de la luz. Para su uso en ensayos se reconstituye en condiciones asépticas con agua estéril o bacteriostática, dejando escurrir el disolvente por la pared del vial y homogeneizando por rotación suave. La solución debe mantenerse refrigerada, protegida de la luz y libre de ciclos de congelación y descongelación. Conviene alicuotar y etiquetar con lote y fecha para asegurar trazabilidad.'],
      },
    ],
  },

  'cardiogen': {
    tagline: 'Tetrapéptido AEDR de investigación cardiaca',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Cardiogen es un tetrapéptido sintético descrito con la secuencia alanina, ácido glutámico, ácido aspártico y arginina (Ala-Glu-Asp-Arg, AEDR). Forma parte del catálogo de bioreguladores peptídicos cortos desarrollado en el Instituto de Bioregulación y Gerontología de San Petersburgo, donde se propuso como análogo sintético de fracciones peptídicas aisladas de miocardio y vasos animales. Como el resto de la serie, es una molécula muy pequeña, hidrosoluble y sin actividad hormonal conocida. Se comercializa como polvo liofilizado de grado reactivo, con pureza declarada por HPLC, exclusivamente para uso en investigación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Las líneas de trabajo publicadas se centran en cultivos de cardiomiocitos, fibroblastos cardiacos y células endoteliales, midiendo proliferación, apoptosis y expresión de genes asociados a matriz extracelular, contractilidad o señalización de estrés. También se ha explorado en modelos animales de daño miocárdico y de envejecimiento cardiovascular, evaluando parámetros histológicos y funcionales. El mecanismo propuesto por sus desarrolladores es la unión del péptido a regiones específicas del ADN y la modulación tejido-específica de la transcripción, con la idea de restaurar patrones de expresión propios de tejido joven. Es una hipótesis, no un mecanismo confirmado.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Hay que decirlo sin rodeos: la evidencia sobre Cardiogen es escasa, preclínica y prácticamente monopolizada por un solo grupo de investigación ruso, con muy poca o nula replicación por laboratorios independientes. No existen ensayos clínicos aleatorizados y controlados publicados en revistas internacionales de referencia, ni evaluación por la FDA, la EMA o COFEPRIS. Gran parte de la información disponible en línea procede de vendedores y no de literatura revisada por pares. Cualquier afirmación sobre efectos cardiovasculares en humanos carece hoy de respaldo científico suficiente y debe tratarse como no demostrada.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta como polvo liofilizado en viales de vidrio sellados, estable durante meses en congelación, en seco y protegido de la luz. La reconstitución se realiza con técnica aséptica empleando agua estéril o bacteriostática, dejando caer el disolvente sobre la pared interna del vial y mezclando por rotación suave, nunca por agitación enérgica. La solución se conserva en refrigeración, protegida de la luz, evitando congelar y descongelar repetidamente. Se recomienda alicuotar, etiquetar con lote y fecha, y descartar según los procedimientos del laboratorio.'],
      },
    ],
  },

  'cartalax': {
    tagline: 'Tripéptido AED de investigación en cartílago',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Cartalax es un tripéptido sintético con secuencia alanina, ácido glutámico y ácido aspártico (Ala-Glu-Asp, AED). Pertenece a la serie de bioreguladores peptídicos cortos de la escuela de Khavinson y se presenta como el fragmento activo propuesto de extractos peptídicos de tejido cartilaginoso y conectivo. Es una molécula de masa muy baja, altamente polar y soluble en medio acuoso, sin relación estructural con factores de crecimiento ni con glicosaminoglicanos. Se distribuye en forma de polvo liofilizado de grado reactivo, con pureza declarada por HPLC, exclusivamente como material de investigación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Los estudios disponibles lo aplican a cultivos de condrocitos humanos y fibroblastos, midiendo tasas de proliferación, marcadores de senescencia y expresión de genes de matriz extracelular como COL2A1, agrecano y metaloproteinasas. También aparece en trabajos sobre modelos de envejecimiento tisular y reparación de tejido conectivo, y en ensayos de biología molecular que exploran la interacción de péptidos cortos con cromatina. La hipótesis de trabajo, común a toda la familia, es que la secuencia corta actúa como señal transcripcional selectiva del tejido de origen, favoreciendo la síntesis de componentes estructurales del cartílago.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La base de datos publicada es pequeña, preclínica y procede esencialmente del mismo grupo ruso, sin replicación independiente significativa fuera de ese entorno. Se limita a cultivos celulares y estudios de expresión génica; no hay ensayos clínicos controlados en humanos, ni datos comparativos frente a intervenciones establecidas para patología articular. Tampoco existe aprobación regulatoria en México, Estados Unidos o Europa. Mucho del contenido divulgativo sobre Cartalax es material de marketing que extrapola resultados in vitro a supuestos beneficios articulares, extrapolación que la literatura actual no sostiene.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se recibe liofilizado en viales sellados; en esa forma tolera bien el almacenamiento prolongado en congelación, seco y protegido de la luz. La reconstitución se efectúa con técnica aséptica usando agua estéril o bacteriostática, aplicada lentamente sobre la pared del vial y mezclada por rotación suave hasta disolución completa. La solución debe mantenerse refrigerada y protegida de la luz, con alícuotas para evitar aperturas repetidas y ciclos de congelación y descongelación. Registrar lote, fecha y condiciones de conservación es parte del manejo correcto.'],
      },
    ],
  },

  'cortagen': {
    tagline: 'Tetrapéptido AEDP de investigación neural',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Cortagen es un tetrapéptido sintético con secuencia alanina, ácido glutámico, ácido aspártico y prolina (Ala-Glu-Asp-Pro, AEDP). Fue desarrollado en San Petersburgo como análogo sintético de fracciones peptídicas obtenidas de corteza cerebral bovina, dentro del programa de bioreguladores peptídicos cortos. Al igual que sus compañeros de serie, es una molécula pequeña, hidrosoluble y de estructura simple, sin actividad de neurotransmisor ni afinidad conocida por receptores clásicos. Se comercializa como polvo liofilizado de grado reactivo, con pureza analítica declarada, únicamente como material de investigación y nunca para consumo humano.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Las publicaciones lo emplean en modelos de regeneración de nervio periférico en roedores, evaluando velocidad de conducción, recuperación funcional e histología del nervio lesionado, y en cultivos de tejido nervioso donde se miden proliferación, diferenciación y marcadores de estrés oxidativo. También figura en estudios de expresión génica y de interacción péptido-ADN destinados a sostener la hipótesis de regulación transcripcional tejido-específica. En el catálogo de la serie se le asocia a corteza cerebral y sistema nervioso, y a menudo se estudia en paralelo con Pinealon para comparar perfiles de actividad in vitro.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Hay que ser explícito: casi toda la literatura sobre Cortagen proviene del mismo grupo ruso que lo creó y de revistas de circulación limitada, con escasísima replicación internacional. Los estudios son preclínicos, de tamaño pequeño y con metodología no siempre descrita al nivel exigido por revistas de alto impacto. No hay ensayos clínicos aleatorizados y controlados en humanos publicados en la literatura internacional, ni evaluación regulatoria en Occidente. Los efectos neuroprotectores o regenerativos que se le atribuyen deben considerarse hipótesis de una sola fuente, no hallazgos consolidados por la comunidad científica.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado en viales de vidrio sellados, forma estable durante meses si se conserva congelado, seco y al abrigo de la luz. La reconstitución se realiza en condiciones asépticas con agua estéril o bacteriostática, dejando escurrir el disolvente por la pared del vial y homogeneizando por rotación suave. La solución se guarda refrigerada y protegida de la luz, evitando ciclos repetidos de congelación y descongelación. Alicuotar y etiquetar con lote y fecha de reconstitución facilita la trazabilidad del material.'],
      },
    ],
  },

  'crystagen': {
    tagline: 'Péptido corto de investigación inmunológica',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Crystagen es un péptido corto sintético de la serie de bioreguladores de Khavinson, descrito habitualmente como el tripéptido ácido glutámico, ácido aspártico y prolina (Glu-Asp-Pro, EDP), aunque las fuentes comerciales no siempre coinciden en la secuencia exacta, lo que ya es un dato relevante sobre la calidad de la información disponible. Se propuso como uno de los fragmentos activos derivados de extractos de timo del tipo de Thymalin, y se le asigna teóricamente el tejido linfoide. Se distribuye liofilizado como material de investigación, sin aprobación farmacéutica en ningún mercado.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Las líneas descritas se centran en modelos celulares de epitelio tímico y linfocitos, midiendo proliferación, diferenciación de subpoblaciones T y B, producción de citocinas y marcadores de activación inmunitaria. También se emplea en estudios de expresión génica que buscan sustentar la idea de que un péptido de tres residuos puede unirse a regiones promotoras y modular la transcripción de genes inmunitarios. En el marco conceptual del grupo desarrollador, Crystagen sería la versión definida y sintética de una actividad presente en extractos tímicos complejos, más fácil de estandarizar que el extracto original.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La evidencia es muy limitada y prácticamente toda de origen ruso, generada por el mismo entorno institucional, con nula replicación independiente relevante. No existen ensayos clínicos rigurosos de eficacia en humanos, ni revisiones sistemáticas favorables, ni evaluación por agencias regulatorias occidentales. A ello se suma la inconsistencia entre proveedores respecto a la secuencia y la composición, lo que dificulta comparar resultados entre lotes y estudios. En resumen, se trata de un compuesto experimental con respaldo científico débil, cuyos efectos inmunomoduladores atribuidos no pueden considerarse demostrados.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra como polvo liofilizado en viales sellados, estable en congelación mientras permanezca seco y protegido de la luz. Para su uso experimental se reconstituye con técnica aséptica en agua estéril o bacteriostática, vertiendo el disolvente lentamente por la pared del vial y mezclando por rotación, sin agitación vigorosa. La solución se conserva refrigerada y protegida de la luz, evitando congelaciones y descongelaciones sucesivas. Dada la variabilidad entre proveedores, conviene verificar el certificado de análisis y conservar la trazabilidad del lote.'],
      },
    ],
  },

  'kpv': {
    tagline: 'Tripéptido antiinflamatorio derivado de alfa-MSH',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['KPV es un tripéptido formado por lisina, prolina y valina, correspondiente al extremo C-terminal de la hormona estimulante de melanocitos alfa, concretamente al fragmento alfa-MSH(11-13). Es, por tanto, un fragmento natural de una hormona peptídica bien caracterizada, no una molécula de diseño arbitrario. A diferencia de la hormona completa, carece de la porción responsable de la activación pigmentaria intensa a través de receptores de melanocortina, y conserva en cambio la actividad antiinflamatoria descrita para el péptido madre. Se distribuye como polvo liofilizado de grado reactivo para investigación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El mecanismo más documentado es la inhibición de la vía NF-kappaB: KPV interfiere con la translocación nuclear del factor y reduce la transcripción de citocinas proinflamatorias como TNF-alfa, IL-6 e IL-1beta. También se han descrito efectos sobre moléculas de adhesión y sobre el tráfico de leucocitos. Las líneas de investigación incluyen modelos animales de colitis y enfermedad inflamatoria intestinal, donde se estudia su transporte por el transportador de péptidos PepT1 en epitelio intestinal, modelos de dermatitis y cicatrización, actividad antimicrobiana frente a Candida y Staphylococcus, y neuroinflamación tras traumatismo craneoencefálico experimental.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['KPV tiene una base preclínica más sólida y más internacional que los bioreguladores rusos: hay publicaciones en revistas revisadas por pares de grupos en Estados Unidos, Europa y Asia, con mecanismos moleculares razonablemente coherentes entre estudios. Dicho esto, la evidencia sigue siendo esencialmente in vitro y en animales. No existen ensayos clínicos aleatorizados de tamaño relevante en humanos, no está aprobado por ninguna agencia regulatoria como medicamento, y los datos de farmacocinética y seguridad a largo plazo son escasos. La traslación de los resultados en roedores a personas no está demostrada.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta liofilizado en viales sellados y es relativamente estable en esa forma si se conserva congelado, seco y protegido de la luz. Se reconstituye con técnica aséptica en agua estéril o bacteriostática, aplicando el disolvente sobre la pared del vial y mezclando por rotación suave hasta disolución. La solución se mantiene refrigerada, protegida de la luz, preferentemente en alícuotas para evitar ciclos de congelación y descongelación. Existen también presentaciones para uso tópico o en cultivo celular; conviene verificar el certificado de análisis del lote.'],
      },
    ],
  },

  'glutation': {
    tagline: 'Tripéptido antioxidante endógeno',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['El glutatión es un tripéptido endógeno formado por ácido glutámico, cisteína y glicina, con la particularidad de que el enlace entre glutamato y cisteína es de tipo gamma, lo que lo hace resistente a las peptidasas comunes. Es el antioxidante intracelular más abundante en células de mamífero y alcanza concentraciones milimolares en hígado. Existe en forma reducida (GSH) y oxidada como disulfuro (GSSG); la relación entre ambas define el estado redox celular. En el mercado de laboratorio se ofrece como polvo liofilizado de glutatión reducido o como solución para investigación.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Su función bioquímica está perfectamente establecida: es cofactor de las glutatión peroxidasas, sustrato de las glutatión S-transferasas y pieza central en la conjugación y eliminación de xenobióticos, metales y electrófilos. Se investiga en modelos de estrés oxidativo, hepatotoxicidad, resistencia a quimioterápicos, ferroptosis, en la que el agotamiento de glutatión es un evento clave, y neurodegeneración. En dermatología experimental se estudia su capacidad de inhibir la tirosinasa y desviar la síntesis de melanina de eumelanina hacia feomelanina, línea que originó su uso comercial como agente despigmentante.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Hay que distinguir dos planos. Como molécula biológica, el glutatión está respaldado por décadas de bioquímica sólida y consenso internacional. Como producto administrado, la situación es muy distinta: la biodisponibilidad oral es pobre, los estudios de aclarado cutáneo son pequeños, cortos y con resultados modestos o inconsistentes, y varias agencias sanitarias, incluida la FDA de Filipinas, han emitido advertencias formales contra el glutatión inyectable por reacciones adversas graves y falta de aprobación para esa indicación. No existe aprobación como despigmentante en México, Estados Unidos ni la Unión Europea.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['El glutatión reducido en polvo es higroscópico y se oxida con facilidad en contacto con aire, luz y pH alcalino, por lo que se conserva bien cerrado, en seco, refrigerado o congelado y protegido de la luz. Las soluciones deben prepararse frescas, en el momento de usarse, y no almacenarse largo tiempo, ya que el GSH pasa a GSSG. Conviene evitar contacto con metales de transición que aceleran la oxidación y verificar la pureza del lote antes de cada ensayo.'],
      },
    ],
  },

  'b12': {
    tagline: 'Cianocobalamina inyectable, vitamina B12',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La cianocobalamina es la forma sintética y más estable de la vitamina B12, un corrinoide de gran tamaño que contiene un átomo de cobalto central coordinado a un anillo de corrina y a un ligando ciano. No es un péptido: es una vitamina hidrosoluble de estructura organometálica, la más compleja conocida entre las vitaminas. En el organismo se convierte en las formas coenzimáticas activas, metilcobalamina y adenosilcobalamina. La presentación inyectable es una solución acuosa estéril de color rojo intenso, característico del cromóforo de cobalto, y marcadamente fotosensible.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La B12 es cofactor de dos enzimas humanas: la metionina sintasa, que remetila homocisteína a metionina, y la metilmalonil-CoA mutasa, del metabolismo de ácidos grasos de cadena impar y aminoácidos. De ahí que las líneas de investigación incluyan homocisteína y riesgo vascular, ácido metilmalónico como biomarcador de deficiencia, anemia megaloblástica, desmielinización y neuropatía periférica. También se estudia su absorción dependiente de factor intrínseco, la comparación entre cianocobalamina, hidroxocobalamina y metilcobalamina, y su uso como vehículo para dirigir moléculas hacia receptores de transcobalamina.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es, junto con el glutatión en su vertiente bioquímica, uno de los pocos compuestos de esta lista con evidencia clínica realmente robusta: la corrección de la deficiencia de B12 está establecida desde hace décadas, figura en farmacopeas y guías internacionales, y su perfil está bien caracterizado. Ahora bien, esa solidez aplica al tratamiento de la deficiencia demostrada. El uso popular de B12 inyectable como energizante, adelgazante o coadyuvante estético en personas sin deficiencia no está respaldado por ensayos controlados de calidad y no debe presentarse como beneficio comprobado.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['La solución inyectable se conserva a temperatura ambiente controlada o en refrigeración según el fabricante, siempre en su envase original y protegida de la luz, ya que la exposición lumínica degrada la molécula. No debe congelarse. Es incompatible con agentes reductores y oxidantes fuertes, y con ácido ascórbico, que acelera su descomposición en mezcla. Los viales multidosis requieren técnica aséptica en cada extracción y registro de la fecha de primera perforación. Descartar si aparece turbidez o pérdida del color rojo característico.'],
      },
    ],
  },

  'matrixyl': {
    tagline: 'Pentapéptido palmitoilado de investigación cosmética',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Matrixyl es el nombre comercial del palmitoil pentapéptido-4, es decir, la secuencia lisina, treonina, treonina, lisina, serina (KTTKS) unida a un ácido palmítico. El fragmento KTTKS procede del propéptido C-terminal del procolágeno tipo I humano, un péptido que se libera durante la maduración del colágeno y actúa como señal de retroalimentación. La palmitoilación aumenta la lipofilia y facilita el paso a través del estrato córneo. La variante Matrixyl 3000 no contiene KTTKS, sino una combinación de palmitoil tripéptido-1 y palmitoil tetrapéptido-7. Es un ingrediente de formulación tópica.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La hipótesis mecanística es que KTTKS actúa como señal de estímulo para fibroblastos dérmicos, promoviendo la síntesis de colágeno tipo I y III, fibronectina y glicosaminoglicanos, replicando la retroalimentación fisiológica del recambio de matriz extracelular. Los estudios en cultivos de fibroblastos miden expresión génica y producción proteica de estos componentes. En piel se han hecho ensayos de aplicación tópica con seguimiento fotográfico, perfilometría y evaluación clínica de rugosidad y profundidad de arrugas, así como estudios de penetración cutánea que comparan el péptido palmitoilado con el fragmento libre.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Existe al menos un ensayo doble ciego controlado con vehículo, de aproximadamente doce semanas, que mostró mejoras estadísticamente significativas pero clínicamente modestas en rugosidad y arrugas frente al vehículo. El problema principal es que la mayor parte de la investigación fue generada o financiada por el fabricante del ingrediente, con pocas replicaciones verdaderamente independientes, muestras pequeñas y desenlaces sensibles al efecto del propio vehículo hidratante. La evidencia es mejor que la de muchos ingredientes cosméticos, pero sigue siendo limitada. No compite en magnitud de efecto con retinoides tópicos bien estudiados.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se presenta como polvo o como solución concentrada en base glicólica o acuosa para incorporación en formulaciones. El material seco se conserva en envase cerrado, en frío, protegido de la luz y de la humedad. En formulación es sensible al pH extremo, a temperaturas altas durante el proceso y a la presencia de oxidantes, por lo que suele añadirse en la fase de enfriamiento. Las diluciones de trabajo se preparan con agua purificada y se conservan refrigeradas. Es un ingrediente de uso tópico, no un material inyectable.'],
      },
    ],
  },

  'lemon-bottle': {
    tagline: 'Solución lipolítica propietaria de origen coreano',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Lemon Bottle es una solución acuosa de formulación propietaria y origen coreano, presentada habitualmente en viales de diez mililitros. Según la información del fabricante, combina riboflavina (vitamina B2), que le da su color amarillo característico, lecitina o fosfatidilcolina, bromelina procedente de piña, y una mezcla de extractos vegetales como Centella asiatica, Salvia miltiorrhiza, manzanilla y Scutellaria baicalensis. No es un péptido ni un compuesto único: es una mezcla comercial cuyas proporciones exactas no se publican. Se distribuye como material cosmético o de investigación, no como medicamento aprobado.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El interés investigativo se dirige a sus componentes por separado más que al producto terminado. La fosfatidilcolina y el desoxicolato tienen literatura previa como agentes lipolíticos que actúan desestabilizando la membrana del adipocito y provocando lisis celular seguida de respuesta inflamatoria y reabsorción. La riboflavina se estudia como precursora de FAD y FMN, coenzimas implicadas en la beta-oxidación de ácidos grasos. La bromelina cuenta con literatura como enzima proteolítica con efecto antiedematoso. Aplicado al producto completo, el estudio se limita a observaciones clínicas no controladas y series fotográficas.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Hay que decirlo con toda claridad: Lemon Bottle es una mezcla propietaria sin literatura revisada por pares sobre el producto terminado. No existen ensayos clínicos aleatorizados, controlados ni publicados que evalúen su eficacia o su seguridad, y la composición cuantitativa no es pública, lo que impide siquiera extrapolar desde la evidencia de sus ingredientes aislados. No cuenta con aprobación de la FDA ni marcado CE como producto médico, y varias autoridades sanitarias han advertido sobre productos lipolíticos inyectables no autorizados. Todo lo que se afirma sobre él procede de material promocional, no de ciencia publicada.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se recibe como solución estéril lista para usar en viales sellados, de color amarillo, con etiquetado del fabricante. Se conserva a temperatura ambiente controlada o en refrigeración según indicación del envase, siempre protegida de la luz por la fotosensibilidad de la riboflavina, y sin congelar. Debe inspeccionarse antes de cada uso descartando turbidez, partículas o cambio de color. Los viales son de un solo uso y deben desecharse tras abrirse. Conviene conservar lote, fecha de caducidad y documentación de importación.'],
      },
    ],
  },

  'botulinum-toxin': {
    tagline: 'Neurotoxina bacteriana que escinde SNAP-25',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La toxina botulínica es una neurotoxina proteica producida por Clostridium botulinum. Existen varios serotipos, siendo A y B los de uso farmacéutico. La molécula activa es una proteína de unos ciento cincuenta kilodaltons con dos cadenas unidas por puente disulfuro: una cadena pesada que media la unión al terminal nervioso y la internalización, y una cadena ligera que es una metaloproteasa dependiente de zinc. En los preparados comerciales se asocia a proteínas accesorias no tóxicas que forman complejos de distinto tamaño. Es una de las sustancias biológicas más potentes conocidas.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El mecanismo está muy bien caracterizado: la cadena ligera del serotipo A escinde específicamente la proteína SNAP-25, mientras el serotipo B corta VAMP o sinaptobrevina; en ambos casos se impide el ensamblaje del complejo SNARE y con ello la liberación de acetilcolina en la unión neuromuscular. Por eso es una herramienta clásica en neurociencia para disecar la maquinaria de exocitosis. Las líneas de investigación abarcan transporte axonal retrógrado, recuperación de la placa motora, dolor neuropático, hiperhidrosis, espasticidad, distonías, vejiga neurógena y migraña crónica, además de aplicaciones estéticas.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Es de los compuestos mejor documentados de esta lista: cuenta con ensayos clínicos aleatorizados, aprobaciones regulatorias en múltiples indicaciones y farmacovigilancia extensa. Un punto crítico y frecuentemente malinterpretado es la potencia: se expresa en unidades biológicas definidas por el ensayo de letalidad del propio fabricante, de modo que las unidades no son intercambiables entre marcas ni existen factores de conversión oficialmente validados. Confundirlas es una fuente conocida de error. Además, es un agente de alta toxicidad sujeto a controles de bioseguridad y, en varios países, a normativa de agentes seleccionados.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Requiere personal capacitado e instalaciones adecuadas. Se presenta liofilizada o en polvo al vacío en viales sellados, conservada en refrigeración o congelación según el fabricante, con cadena de frío documentada. La reconstitución se hace con solución salina estéril sin conservador, introducida lentamente y sin agitación vigorosa, ya que la proteína se desnaturaliza por burbujeo o espuma. La solución reconstituida se mantiene refrigerada y tiene vida útil corta. Los derrames y residuos se inactivan con hipoclorito diluido y se descartan como residuo biológico peligroso.'],
      },
    ],
  },

  'dysport': {
    tagline: 'AbobotulinumtoxinA en unidades Speywood',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['Dysport es la marca comercial de la abobotulinumtoxinA, un preparado de toxina botulínica tipo A desarrollado por Ipsen y disponible en viales liofilizados de distintas potencias. Contiene el mismo principio activo neurotóxico que otros productos de tipo A, pero difiere en el proceso de purificación, en los excipientes, entre ellos albúmina humana y lactosa, y en el tamaño del complejo proteico asociado, menor que el de otros preparados. Estas diferencias de formulación se traducen en un perfil propio de difusión y de potencia declarada. Es un producto biológico de manejo especializado.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Comparte el mecanismo del serotipo A: escisión de la proteína SNAP-25 y bloqueo de la liberación de acetilcolina en la unión neuromuscular. La investigación específica sobre este preparado se centra en comparaciones de potencia, campo de difusión y duración de efecto frente a otras marcas, en estudios de conversión entre unidades, en su uso en espasticidad de adultos y niños, distonía cervical, blefaroespasmo, hiperhidrosis y aplicaciones estéticas. También se estudian la inmunogenicidad y la formación de anticuerpos neutralizantes, un fenómeno que varía según el contenido proteico total del preparado.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Cuenta con ensayos clínicos aleatorizados y aprobación regulatoria en múltiples países para varias indicaciones, por lo que su base de evidencia es sólida en comparación con la mayoría de los productos de esta lista. El punto que debe subrayarse es que su potencia se mide en unidades Speywood, propias del fabricante y definidas por su propio bioensayo: no son intercambiables con las unidades de ningún otro producto de toxina botulínica. Los factores de conversión que circulan en la literatura son aproximaciones discutidas y no aceptadas oficialmente. Es material de manejo exclusivamente profesional y especializado.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se conserva liofilizado en refrigeración, dentro de su envase original, protegido de la luz y con cadena de frío documentada; no debe congelarse salvo indicación expresa del fabricante. La reconstitución se realiza con solución salina estéril sin conservador, añadida despacio por la pared del vial y mezclada por rotación muy suave, evitando espuma que desnaturaliza la proteína. Una vez reconstituido su periodo de estabilidad es corto y requiere refrigeración. Residuos, viales y material contaminado se inactivan con hipoclorito diluido antes de su desecho.'],
      },
    ],
  },

  'humsc-celulas-madre-100-mil': {
    tagline: 'Células mesenquimales de cordón umbilical humano',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['HUMSC designa células madre mesenquimales derivadas de cordón umbilical humano, obtenidas habitualmente de la gelatina de Wharton, el tejido conectivo que rodea los vasos del cordón. No son células madre embrionarias ni hematopoyéticas: son células estromales multipotentes que, según los criterios de la Sociedad Internacional de Terapia Celular, deben adherirse al plástico, expresar CD73, CD90 y CD105, carecer de CD45, CD34 y HLA-DR, y diferenciarse a hueso, cartílago y grasa in vitro. Se suministran criopreservadas en suspensión, con un recuento celular declarado por vial y certificado de caracterización.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['El interés científico se ha desplazado de la idea original de reemplazo tisular hacia un modelo paracrino: estas células secretan factores de crecimiento, citocinas inmunomoduladoras y vesículas extracelulares que modifican el microambiente inflamatorio. Se investigan en modelos preclínicos de infarto de miocardio, lesión medular, artrosis, enfermedad injerto contra huésped, fibrosis pulmonar, cicatrización y enfermedades autoinmunes. Frente a las células de médula ósea o tejido adiposo, las de cordón muestran mayor capacidad proliferativa, menor inmunogenicidad y obtención no invasiva a partir de tejido normalmente desechado, lo que explica su popularidad como fuente experimental.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Debe quedar claro que se trata de terapia celular experimental. La literatura preclínica es amplia, pero los ensayos en humanos son mayoritariamente de fase I o I/II, con muestras pequeñas, seguimiento corto y desenlaces de seguridad más que de eficacia. Ninguna indicación cuenta con aprobación regulatoria amplia basada en ensayos de fase III concluyentes, y persisten preguntas abiertas sobre dosis, vía, supervivencia celular tras la infusión y estandarización entre laboratorios. La FDA y otras agencias han advertido reiteradamente contra clínicas que ofrecen estos productos como tratamientos probados. Aquí es material de investigación.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se reciben criopreservadas en crioviales o bolsas, en medio con crioprotector, generalmente DMSO, y deben mantenerse en nitrógeno líquido en fase vapor o a temperaturas ultrabajas sin interrupción de la cadena de frío. La descongelación es rápida, en baño a temperatura controlada, seguida de dilución gradual para retirar el crioprotector. Nunca deben recongelarse. Todo el manejo exige cabina de bioseguridad, técnica estéril y verificación de viabilidad, esterilidad y ausencia de micoplasma. Se conservan certificado de caracterización, trazabilidad del donante y documentación regulatoria.'],
      },
    ],
  },

  'dermorphin': {
    tagline: 'Heptapéptido opioide mu de origen anfibio',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['La dermorfina es un heptapéptido natural aislado originalmente de la piel de ranas sudamericanas del género Phyllomedusa, con secuencia Tyr-D-Ala-Phe-Gly-Tyr-Pro-Ser amidada en el extremo C-terminal. Su rasgo estructural más notable es la presencia de D-alanina en la segunda posición, una configuración inusual en péptidos animales que le confiere gran resistencia a la degradación por peptidasas. Se sintetiza químicamente para fines de investigación farmacológica. Es un opioide peptídico de alta potencia y no un péptido regulador o cosmético, distinción esencial para entender su manejo.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['La dermorfina es un agonista extraordinariamente selectivo del receptor opioide mu, con afinidad muy superior por este subtipo frente a delta y kappa, perfil que la convirtió en compuesto de referencia en farmacología de receptores opioides. Se emplea en ensayos de unión a receptor, en estudios de transducción de señal y desensibilización, y como plantilla estructural para diseñar análogos híbridos y ligandos bifuncionales. También se ha investigado su capacidad de atravesar la barrera hematoencefálica y sus efectos analgésicos en modelos animales, con potencia notablemente superior a la de la morfina en base molar.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['Su farmacología está bien establecida en la literatura revisada por pares, con estudios de unión y funcionalidad reproducidos por distintos laboratorios. Existen también reportes clínicos antiguos y limitados de administración intratecal. Lo que debe subrayarse es el contexto regulatorio y de riesgo: por ser un agonista mu de alta potencia, está sujeto a control estricto en muchas jurisdicciones, ha sido detectado como agente de dopaje en carreras de caballos y su manejo fuera de entornos regulados plantea riesgos serios de depresión respiratoria y dependencia. No tiene indicación terapéutica aprobada en México.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Se suministra como polvo liofilizado, forma en la que es estable durante periodos prolongados si se conserva congelado, seco y protegido de la luz. La reconstitución se realiza con técnica aséptica en agua estéril o en solución tampón adecuada al ensayo, evitando agitación fuerte. Las soluciones se conservan refrigeradas y alicuotadas para no repetir ciclos de congelación y descongelación. Por su potencia farmacológica requiere control de acceso, registro de inventario, uso de equipo de protección y descarte conforme a normativa de sustancias controladas.'],
      },
    ],
  },

  'admax': {
    tagline: 'Preparación propietaria sin definición estandarizada',
    sections: [
      {
        title: 'Qué es',
        paragraphs: ['ADMAX es una denominación comercial, no un compuesto químico con definición única, y esto debe advertirse desde el inicio. El nombre se ha usado al menos para dos cosas distintas: una mezcla propietaria de extractos vegetales adaptógenos, con raíces de Leuzea carthamoides, Rhodiola rosea y Eleutherococcus senticosus y frutos de Schisandra chinensis, y, en el mercado de péptidos, para un análogo sintético emparentado con Semax modificado con un grupo adamantano. Al no existir una composición pública y estandarizada, el contenido real depende por completo del proveedor.'],
      },
      {
        title: 'Qué se estudia con él',
        paragraphs: ['Los componentes de la versión vegetal se han estudiado por separado como adaptógenos: Rhodiola rosea y Eleutherococcus en fatiga y respuesta al estrés, Schisandra en función hepática y rendimiento, Leuzea por sus ecdisteroides. Sobre la mezcla completa existe únicamente un pequeño estudio publicado en pacientes con cáncer de ovario avanzado, que midió subpoblaciones linfocitarias e inmunoglobulinas tras quimioterapia. La versión peptídica, en cambio, se estudia en el marco de los análogos de fragmentos de ACTH con modificaciones que buscan aumentar la estabilidad metabólica y la permeabilidad a barreras biológicas.'],
      },
      {
        title: 'Qué dice la evidencia',
        paragraphs: ['La honestidad obliga a decirlo sin adornos: ADMAX es una preparación propietaria sin literatura revisada por pares que respalde el producto tal como se comercializa. La ambigüedad misma del nombre, que remite a materiales completamente distintos según la fuente, hace imposible atribuirle un cuerpo de evidencia coherente. El único estudio localizable sobre la mezcla vegetal es pequeño, antiguo y no replicado; la variante peptídica carece de publicaciones independientes en revistas indexadas. No existe aprobación regulatoria en ningún mercado. Debe tratarse como material experimental de composición no verificada científicamente.'],
      },
      {
        title: 'Manejo en laboratorio',
        paragraphs: ['Dado que la presentación varía según el proveedor, el primer paso es exigir y revisar el certificado de análisis y la ficha de datos de seguridad del lote concreto. Los materiales en polvo liofilizado se conservan cerrados, en frío, secos y protegidos de la luz; las preparaciones de extracto vegetal son sensibles a humedad y oxidación. Cualquier reconstitución debe hacerse con técnica aséptica en disolvente estéril compatible, conservando la solución refrigerada y etiquetada con lote y fecha. Sin caracterización documentada, no debe usarse en ensayos cuantitativos.'],
      },
    ],
  },

};

// Empareja la monografía con el producto. OJO: el slug del producto trae la
// presentación pegada (bpc-157-10-mg), así que probamos el slug tal cual y luego
// recortando la presentación del final. Sin esto, ninguna monografía se mostraba.
const stripPresentation = (slug) => (slug || '')
  .replace(/-\d+(?:[.,]\d+)?-?(?:mg|iu|ml|u|g)$/i, '')   // -10-mg, -2000iu, -5-ml
  .replace(/-\d+$/, '');                                  // sobrante numérico

export const monographFor = (slug) => {
  if (!slug) return null;
  if (monographs[slug]) return monographs[slug];
  const base = stripPresentation(slug);
  if (monographs[base]) return monographs[base];
  // último intento: el slug más largo que sea prefijo del producto
  const keys = Object.keys(monographs).filter((k) => slug.startsWith(k));
  if (!keys.length) return null;
  keys.sort((a, b) => b.length - a.length);
  return monographs[keys[0]];
};
export default monographs;
