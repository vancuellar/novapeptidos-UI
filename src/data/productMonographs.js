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
};

export const monographFor = (slug) => monographs[slug] || null;
export default monographs;
