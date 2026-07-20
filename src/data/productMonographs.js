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
};

export const monographFor = (slug) => monographs[slug] || null;
export default monographs;
