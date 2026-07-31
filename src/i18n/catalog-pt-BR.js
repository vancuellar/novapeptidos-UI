// Nombres y descripciones del catálogo en pt-BR.
//
// Se baja junto con los textos de ese idioma y sólo cuando hace falta: en
// español no se usa ni una línea de este archivo (el catálogo ya viene en
// español desde el backend). Ver ./loader.js.

const catalogo = {
  categories: {
    "perdida-peso": {
      "name": "Perda de peso / Metabolicos",
      "description": "Peptideos de pesquisa em metabolismo e composicao corporal."
    },
    "recuperacion": {
      "name": "Recuperacao e Tecidos",
      "description": "Peptideos estudados na reparacao de tecidos, tendoes e mucosa gastrica."
    },
    "sexual-hormonal": {
      "name": "Saude sexual e hormonal",
      "description": "Peptideos de pesquisa estudados em libido e no eixo hormonal."
    },
    "estetica": {
      "name": "Estetica e pele",
      "description": "Peptideos de pesquisa estudados em colageno, pele e cabelo."
    },
    "bioreguladores": {
      "name": "Bioreguladores",
      "description": "Peptideos curtos estudados como reguladores tecido-especificos."
    },
    "suministros": {
      "name": "Insumos",
      "description": "Insumos para pesquisa: agua bacteriostatica, frascos e seringas."
    },
    "otros": {
      "name": "Especialidade",
      "description": "Compostos de pesquisa de especialidade fora das categorias principais."
    },
    "recuperacion-tejidos": {
      "name": "Recuperacao e Tecidos",
      "description": "Peptideos estudados na reparacao de tecidos, tendoes e mucosa gastrica."
    },
    "hormona-crecimiento": {
      "name": "Hormonio do Crescimento",
      "description": "Secretagogos e peptideos relacionados a sinalizacao de GH."
    },
    "metabolicos": {
      "name": "Metabolicos",
      "description": "Peptideos de pesquisa em metabolismo e composicao corporal."
    },
    "longevidad": {
      "name": "Longevidade",
      "description": "Peptideos estudados no envelhecimento celular e na funcao mitocondrial."
    },
    "nootropicos": {
      "name": "Nootropicos",
      "description": "Peptideos de pesquisa em funcao cognitiva e estresse."
    },
    "bienestar": {
      "name": "Bem-estar",
      "description": "Peptideos de pesquisa em sono, pele e bem-estar geral."
    },
    "stacks": {
      "name": "Stacks / Combos",
      "description": "Combinacoes de peptideos para protocolos de pesquisa."
    },
    "accesorios": {
      "name": "Acessorios",
      "description": "Insumos para pesquisa: agua bacteriostatica, frascos e seringas."
    }
  },
  products: {
    "bronchogen": {
      "short_description": "Estudado pelo efeito no tecido que reveste os brônquios.",
      "description": "Bronchogen é um peptídeo muito curto: uma cadeia de poucos aminoácidos, as peças com que as proteínas são montadas. Foi estudado sobretudo em laboratório, observando o tecido que reveste os brônquios e o pulmão. Boa parte dessa pesquisa vem de grupos russos que trabalham com essa família de peptídeos curtos. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cardiogen": {
      "short_description": "Estudado pelo efeito no tecido do coração.",
      "description": "Cardiogen é um peptídeo muito curto, da mesma família russa de Bronchogen e Cortagen. A pesquisa foi feita sobretudo em laboratório e com animais, observando o músculo do coração e os vasos sanguíneos. É um dos compostos mais trabalhados em laboratório do que em outro lugar. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cartalax": {
      "short_description": "Estudado pelo efeito na cartilagem e no tecido conjuntivo.",
      "description": "Cartalax é um peptídeo de apenas três aminoácidos, as menores peças com que as proteínas são montadas. Foi estudado em laboratório com as células que produzem cartilagem e com o tecido que sustenta as articulações. Pertence à mesma família russa de peptídeos curtos que Pinealon e Cortagen. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cortagen": {
      "short_description": "Estudado pelo efeito no tecido dos nervos.",
      "description": "Cortagen é um peptídeo muito curto da família russa de biorreguladores. Foi estudado em laboratório e com animais, observando o córtex cerebral e os nervos do resto do corpo. É um dos que foram trabalhados principalmente em laboratório. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "crystagen": {
      "short_description": "Estudado pelo efeito nas defesas do corpo.",
      "description": "Crystagen é um peptídeo curto da família russa de biorreguladores. Foi estudado em laboratório com os linfócitos, que são os glóbulos brancos encarregados de defender o corpo. O trabalho publicado foi feito sobretudo em culturas de células. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "pinealon": {
      "short_description": "Estudado pelo efeito nos neurônios e no desgaste celular.",
      "description": "Pinealon é um peptídeo de três aminoácidos, da família russa de biorreguladores. Foi estudado em laboratório e com animais, observando os neurônios e o desgaste que as células sofrem quando trabalham sob estresse. Também se observou como influencia quais genes se ativam dentro da célula. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "thymalin": {
      "short_description": "Estudado pelo efeito nas defesas do corpo.",
      "description": "Thymalin é uma mistura de peptídeos obtida do timo, a glândula onde amadurecem as células de defesa do corpo. Foi estudado pelo efeito sobre essas células, em laboratório e com animais, e há também trabalhos antigos em pessoas. É um dos compostos com mais anos de história nessa família. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "thymosin-alpha-1": {
      "short_description": "Estudada pelo papel nas defesas do corpo.",
      "description": "A timosina alfa-1 é um peptídeo de 28 aminoácidos que o próprio corpo produz no timo, a glândula onde amadurecem as células de defesa. Foi bastante estudada: em laboratório, em animais e também em pessoas. A pesquisa se concentra em como ela desperta as células que avisam o organismo de que há algo estranho. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ahk-cu": {
      "short_description": "Estudado pelo efeito no folículo do cabelo e na pele.",
      "description": "AHK-Cu é um peptídeo pequeno ligado ao cobre. Foi estudado em laboratório com a raiz do cabelo e com as células que formam novos vasos sanguíneos. Também aparece em trabalhos sobre a estrutura que sustenta a pele por dentro. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "botulinum-toxin": {
      "short_description": "Proteína de laboratório medida em unidades, não em miligramas.",
      "description": "A toxina botulínica é uma proteína muito conhecida e muito estudada, em laboratório, em animais e em pessoas. A pesquisa se concentra em como ela freia o sinal que vai do nervo ao músculo. É medida em unidades biológicas, não em miligramas: por isso o frasco diz IU e não mg. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ghk-cu": {
      "short_description": "Estudado pelo efeito na pele e no cabelo.",
      "description": "GHK-Cu é um peptídeo de três aminoácidos ligado ao cobre; o corpo o produz naturalmente e ele diminui com a idade. É um dos mais estudados em laboratório dentro da cosmética experimental. A pesquisa observa como age sobre a estrutura que dá firmeza à pele e sobre o folículo capilar. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "lemon-bottle": {
      "short_description": "Solução com riboflavina, lecitina e bromelina, estudada na gordura.",
      "description": "Lemon Bottle não é um peptídeo: é uma solução que mistura três ingredientes conhecidos, riboflavina (vitamina B2), lecitina e bromelina (uma enzima do abacaxi). Foi estudada em laboratório com as células que guardam a gordura. Vem pronta em frasco de 10 mL, não em pó. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "matrixyl": {
      "short_description": "Estudado pelo efeito no colágeno da pele.",
      "description": "Matrixyl é um peptídeo curto muito usado em cosmética; seu nome técnico é palmitoil pentapeptídeo-4. Foi estudado em laboratório com as células da pele que fabricam colágeno, que é o que dá firmeza. É um dos peptídeos cosméticos com mais trabalho publicado. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "snap-8": {
      "short_description": "Peptídeo cosmético estudado no sinal do nervo para o músculo.",
      "description": "SNAP-8 é um peptídeo de oito aminoácidos usado em cosmética. Foi estudado em laboratório por como interfere no mecanismo que solta o sinal do nervo para o músculo. O trabalho publicado foi feito sobretudo em culturas de células. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cjc-1295-no-dac-5mg-ipamorelin-5mg": {
      "short_description": "Dois peptídeos de hormônio do crescimento no mesmo frasco.",
      "description": "Este frasco traz dois peptídeos juntos: CJC-1295 sem DAC e Ipamorelin. Os dois são estudados pelo efeito sobre o hormônio do crescimento, mas cada um o estimula por um caminho diferente, e por isso são pesquisados em dupla. O trabalho foi feito sobretudo em laboratório e com animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "fragment-17-23": {
      "short_description": "É o pedaço central do TB-500, estudado em reparação.",
      "description": "Fragment 17-23 é o pedacinho central do TB-500: sete aminoácidos, justamente a parte que se prende à actina, uma proteína que as células usam para se mover. Foi estudado em laboratório pelo movimento das células e pela formação de vasos novos. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ghrp-2-acetate": {
      "short_description": "Estudado porque faz o corpo liberar hormônio do crescimento.",
      "description": "GHRP-2 é um peptídeo curto, de seis aminoácidos. É estudado porque dá ao corpo o sinal de liberar o próprio hormônio do crescimento, em vez de fornecê-lo de fora. Há trabalho em laboratório, em animais e também em pessoas. É um dos mais veteranos da sua família. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ghrp-6-acetate": {
      "short_description": "Estudado no hormônio do crescimento e no apetite.",
      "description": "GHRP-6 é um peptídeo de seis aminoácidos, irmão do GHRP-2. Age sobre o mesmo interruptor que a grelina usa, o hormônio que avisa o cérebro de que há fome. Por isso é estudado em duas frentes: a liberação de hormônio do crescimento e o apetite. Há trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "hexarelin-acetate": {
      "short_description": "Estudado no hormônio do crescimento e no tecido do coração.",
      "description": "Hexarelin é um peptídeo de seis aminoácidos feito em laboratório. É estudado por duas coisas: o sinal que faz liberar hormônio do crescimento e seu efeito sobre o tecido do coração. Há trabalho em laboratório, em animais e alguns estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "hgh": {
      "short_description": "Hormônio do crescimento humano, um dos mais estudados que existem.",
      "description": "HGH é o hormônio do crescimento humano, feito em laboratório mas igual ao que o corpo produz. É um dos compostos com mais pesquisa publicada: em laboratório, em animais e em pessoas, há décadas. É estudado por como age sobre o crescimento, o manejo das proteínas e o das gorduras. É medido em unidades (IU), não em miligramas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "hgh-fragment-176-191": {
      "short_description": "É um pedaço do hormônio do crescimento, estudado na gordura.",
      "description": "Este composto é apenas um pedacinho do hormônio do crescimento: a parte 176-191 da molécula inteira. É estudado porque em laboratório e em animais observou-se seu efeito sobre as células que guardam a gordura, sem arrastar os demais efeitos do hormônio completo. A pesquisa foi feita sobretudo fora do ser humano. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "igf-1-lr3": {
      "short_description": "Versão de longa duração de um fator de crescimento.",
      "description": "IGF-1 LR3 é uma versão modificada do IGF-1, um fator de crescimento que o corpo fabrica no fígado. A mudança faz com que fique ativo por mais tempo, porque as proteínas que normalmente o freiam se prendem menos a ele. Foi estudado sobretudo em culturas de células. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ipamorelin": {
      "short_description": "Estudado porque pede hormônio do crescimento sem mexer com outros.",
      "description": "Ipamorelin é um peptídeo curto bem conhecido dentro desse grupo. É estudado porque dá o sinal de liberar hormônio do crescimento de forma bastante limpa: quase não mexe com os outros hormônios do corpo. O trabalho publicado vem sobretudo de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "mgf": {
      "short_description": "Estudado na reparação do músculo após o esforço.",
      "description": "MGF é uma variante do IGF-1 que o músculo produz quando é exigido. Foi estudado em laboratório e em animais, observando as células que reparam a fibra do músculo depois de um dano. É um composto trabalhado principalmente fora do ser humano. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "peg-mgf": {
      "short_description": "O mesmo MGF, com um revestimento que o faz durar mais.",
      "description": "PEG-MGF é o MGF com um revestimento adicional (o PEG) que faz com que resista mais tempo antes de se desfazer. É estudado pelo mesmo motivo que o MGF: as células que reparam a fibra do músculo. A pesquisa foi feita sobretudo em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "sermorelina": {
      "short_description": "Estudada porque pede ao corpo o próprio hormônio do crescimento.",
      "description": "Sermorelina é o pedaço ativo do sinal natural que o cérebro manda para liberar hormônio do crescimento. Por ser só esse pedaço, dura pouco e seu efeito é breve. É uma das mais estudadas do seu grupo: há trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "tesamorelin-10-ipamorelin-5": {
      "short_description": "Tesamorelina e Ipamorelina juntas no mesmo frasco.",
      "description": "Este frasco traz dois peptídeos juntos: tesamorelina e ipamorelina. Os dois são estudados pelo efeito sobre o hormônio do crescimento, e cada um o estimula por um caminho diferente; daí serem pesquisados em dupla. Cada um em separado tem sua própria literatura; a combinação foi menos estudada. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "epithalon": {
      "short_description": "Estudado no envelhecimento da célula e no relógio do sono.",
      "description": "Epithalon é um peptídeo de quatro aminoácidos. É estudado por duas coisas: a enzima que cuida das pontas dos cromossomos, que encurtam com a idade, e o relógio interno que marca o dia e a noite. Há trabalho em laboratório, em animais e também alguns estudos em pessoas, a maioria de grupos russos. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "foxo4": {
      "short_description": "Estudado nas células velhas que o corpo já não renova.",
      "description": "FOXO4-DRI é um peptídeo desenhado em laboratório para se colocar entre duas proteínas que trabalham juntas dentro da célula. É estudado no campo das células senescentes, células que pararam de se dividir mas continuam ali. Todo o trabalho publicado é de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "glutation": {
      "name": "Glutationa",
      "short_description": "Antioxidante que o próprio corpo fabrica, muito estudado.",
      "description": "A glutationa é um antioxidante que o corpo produz por conta própria; está em todas as células. É estudada pelo seu papel quando a célula trabalha sob tensão e se desgasta. É um dos compostos com mais pesquisa acumulada: em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "humanin": {
      "short_description": "Estudado por como protege a célula quando está sob tensão.",
      "description": "Humanin é um peptídeo curioso: não vem do DNA do núcleo, e sim do das mitocôndrias, que são as pequenas usinas de energia dentro de cada célula. É estudado por como protege a célula quando está sob tensão, inclusive os neurônios. Há bastante trabalho em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "nad-plus": {
      "short_description": "Estudado pelo papel na energia da célula. O frasco de 500 mg rende 5 semanas.",
      "description": "O NAD+ é uma molécula que todas as células usam para produzir energia; a quantidade vai diminuindo com a idade. É um dos compostos mais estudados no campo do envelhecimento celular: há trabalho em laboratório, em animais e em pessoas. Não é um peptídeo, é uma coenzima. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ss-31": {
      "short_description": "Estudado nas usinas de energia da célula.",
      "description": "SS-31 (também chamado elamipretida) é um peptídeo de quatro aminoácidos que se acomoda dentro da mitocôndria, a parte da célula que fabrica a energia. É estudado por como essa mitocôndria se comporta quando está desgastada. Há trabalho em laboratório, em animais e também estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cerebrolysin": {
      "name": "Cerebrolisina",
      "short_description": "Mistura de peptídeos estudada nas células do cérebro.",
      "description": "Cerebrolisina não é um único peptídeo: é uma mistura de peptídeos pequenos obtida de tecido suíno. É estudada no campo da proteção dos neurônios e de como as conexões do cérebro se recuperam. Tem décadas de literatura, sobretudo europeia e asiática, com trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "dsip": {
      "short_description": "Estudado pela sua relação com o sono profundo.",
      "description": "DSIP deve seu nome ao sono: a sigla significa peptídeo indutor do sono delta, que é a fase mais profunda da noite. Foi descoberto nos anos setenta e desde então foi estudado em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "melatonina": {
      "short_description": "Hormônio do relógio interno, um dos mais estudados que existem.",
      "description": "A melatonina é o hormônio que o corpo fabrica quando escurece e que marca a hora de dormir; é produzida por uma glândula pequenina no cérebro. É um dos compostos com mais pesquisa publicada: em laboratório, em animais e em muitíssimas pessoas. Também é estudada pelo papel de antioxidante dentro da célula. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "orexin-a": {
      "short_description": "Estudada pelo papel em ficar acordado e no apetite.",
      "description": "A orexina A é um sinal que o cérebro fabrica e que ajuda a manter o corpo acordado e alerta. Também participa da fome. É estudada sobretudo em laboratório e em animais, com alguns trabalhos em pessoas, e é uma peça-chave para entender o ciclo de sono e vigília. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "orexin-b": {
      "short_description": "A outra orexina, estudada no sono e no estado de alerta.",
      "description": "A orexina B é o segundo dos dois sinais orexinas que o cérebro fabrica. Parece-se com a orexina A, mas prefere um dos dois interruptores onde elas agem. É estudada no sono, no estado de alerta e no gasto de energia, com trabalho feito sobretudo em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "pe-22-28": {
      "short_description": "Estudado no humor e nas conexões do cérebro.",
      "description": "PE-22-28 é uma versão curta da spadina, um peptídeo que o próprio corpo produz. Age sobre uma comporta dos neurônios chamada TREK-1. Foi estudado em laboratório e em animais, no campo do humor e de como se formam novas conexões no cérebro. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "pnc-27": {
      "short_description": "Estudado em laboratório com linhagens de células tumorais.",
      "description": "PNC-27 junta duas partes: um pedaço da proteína p53, que é a que vigia o estado da célula, e uma cauda que lhe permite atravessar a membrana. Foi estudado em laboratório, em culturas de células tumorais, observando como se comporta ao chegar à membrana. Todo o trabalho publicado foi feito em culturas de células. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "selank": {
      "short_description": "Estudado na ansiedade e nas defesas do corpo.",
      "description": "Selank é um peptídeo curto desenvolvido na Rússia a partir de uma molécula que o corpo já produz. É estudado em duas frentes: a ansiedade e a resposta das defesas. Há trabalho em laboratório, em animais e também estudos em pessoas, a maioria publicados em russo. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "semax": {
      "short_description": "Estudado na memória e na proteção dos neurônios.",
      "description": "Semax é um peptídeo curto desenvolvido na Rússia, derivado de um hormônio que o corpo já produz. É estudado na memória, na atenção e na proteção dos neurônios. É um dos mais trabalhados da sua família: há estudos em laboratório, em animais e em pessoas, quase todos publicados em russo. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "acth-1-39": {
      "short_description": "Hormônio completo estudado nas glândulas suprarrenais.",
      "description": "ACTH 1-39 é o hormônio inteiro que a hipófise manda para despertar as glândulas suprarrenais, as que ficam em cima dos rins. É estudado por essa comunicação e por como essas glândulas fabricam seus hormônios. É uma molécula muito conhecida, com trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "admax": {
      "short_description": "Parente do Semax, estudado nas conexões do cérebro.",
      "description": "ADMAX é uma versão modificada do Semax, portanto vem da mesma família russa de peptídeos curtos. Foi estudado em laboratório com neurônios, observando duas substâncias que o cérebro usa para manter e formar conexões. É um dos que foram trabalhados principalmente em laboratório. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "b7-33": {
      "short_description": "Estudado no endurecimento de tecidos por cicatriz interna.",
      "description": "B7-33 é uma versão simplificada da relaxina, um hormônio que o corpo produz. É estudado na fibrose, que é quando um tecido endurece porque se enche de cicatriz por dentro; foi observado em coração, rim e pulmão. O trabalho publicado é de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cjc-1295-con-dac": {
      "short_description": "Versão de longa duração: fica dias em circulação.",
      "description": "CJC-1295 com DAC pede ao corpo que libere o próprio hormônio do crescimento. O acréscimo DAC faz com que se prenda a uma proteína do sangue e dure vários dias, em vez de horas. Há trabalho em laboratório, em animais e estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cjc-1295-sin-dac": {
      "short_description": "Versão curta: faz seu trabalho e vai embora rápido.",
      "description": "CJC-1295 sem DAC pede ao corpo que libere o próprio hormônio do crescimento, igual à versão com DAC, mas sem o acréscimo que a faz durar dias: esta age e vai embora em pouco tempo. É estudado sobretudo em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "epo": {
      "short_description": "Hormônio que ordena a fabricação de glóbulos vermelhos.",
      "description": "A eritropoetina, ou EPO, é o hormônio que o rim manda para que a medula fabrique glóbulos vermelhos. É estudada por essa ordem e pelo que acontece quando falta oxigênio. É uma molécula muito conhecida e muito pesquisada: em laboratório, em animais e em pessoas. É medida em unidades (IU). Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "kisspeptina-10": {
      "short_description": "Estudada pelo papel nos hormônios reprodutivos.",
      "description": "A kisspeptina-10 é o sinal com que o cérebro coloca em marcha a cadeia de hormônios reprodutivos. É estudada justamente por isso: é a peça que dá a partida no sistema. Há trabalho em laboratório, em animais e também estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "mazdutida": {
      "short_description": "Estudada no manejo do açúcar e no gasto de energia.",
      "description": "Mazdutida é um peptídeo que imita ao mesmo tempo dois sinais que o corpo já usa para avisar que comeu e para mover suas reservas. É estudada no manejo do açúcar no sangue e no gasto de energia. Tem trabalho em laboratório, em animais e estudos em pessoas, sobretudo na China. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "melanotan-i": {
      "short_description": "Estudado pelo efeito sobre o pigmento da pele.",
      "description": "Melanotan I, também chamado afamelanotida, imita um hormônio que o corpo produz e que indica à pele que fabrique pigmento. É estudado justamente nas células que fazem esse pigmento. Há trabalho em laboratório, em animais e também estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "melanotan-2": {
      "short_description": "Estudado pelo efeito sobre o pigmento da pele.",
      "description": "Melanotan II é parente próximo do Melanotan I e também imita o hormônio que pede à pele para fabricar pigmento, embora toque mais interruptores que aquele. É estudado nas células do pigmento. Há trabalho em laboratório, em animais e estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "mic-lipo-c-b12": {
      "short_description": "Mistura de metionina, inositol, colina e vitamina B12.",
      "description": "MIC não é um peptídeo: é uma mistura de três substâncias muito conhecidas, metionina, inositol e colina, às quais se acrescenta vitamina B12. É estudada no manejo das gorduras pelo fígado. Os três primeiros ingredientes estão na comida do dia a dia. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "oxitocina": {
      "name": "Ocitocina",
      "short_description": "Hormônio muito conhecido, estudado no vínculo e na confiança.",
      "description": "A ocitocina é um hormônio pequeno, de nove aminoácidos, que o próprio corpo fabrica. É conhecida pelo seu papel no vínculo entre as pessoas e no parto. É estudada em laboratório, em animais e em pessoas; é um dos hormônios com mais literatura publicada. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "p21": {
      "short_description": "Estudado na formação de novos neurônios.",
      "description": "P21 vem de um fator que o corpo usa para cuidar dos neurônios. É estudado no hipocampo, a área do cérebro onde se formam novos neurônios e se guarda a memória. O trabalho publicado é de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "somatropina-hgh-191aa": {
      "short_description": "Hormônio do crescimento humano completo, de 191 aminoácidos.",
      "description": "A somatropina é o hormônio do crescimento humano com sua cadeia completa de 191 aminoácidos, feito em laboratório mas idêntico ao do corpo. É um dos compostos com mais pesquisa publicada, em laboratório, em animais e em pessoas. É medido em unidades (IU), não em miligramas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "tesamorelina": {
      "short_description": "Estudada na gordura abdominal e no hormônio do crescimento.",
      "description": "Tesamorelina é uma versão reforçada do sinal natural que pede hormônio do crescimento; o reforço faz com que resista mais antes de se desfazer. É estudada no manejo das gorduras e na composição do corpo. Há trabalho em laboratório, em animais e estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "vip": {
      "short_description": "Estudado nos vasos sanguíneos e na inflamação.",
      "description": "VIP é um peptídeo de 28 aminoácidos que o corpo fabrica e que ajuda os vasos sanguíneos a se abrirem. Também participa da resposta das defesas quando há inflamação. É estudado em laboratório, em animais e em pessoas; é uma molécula bem conhecida. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "5-amino-1mq": {
      "short_description": "Estudado pelo efeito nas células que armazenam gordura.",
      "description": "5-Amino-1MQ é uma molécula pequena, não um peptídeo. É estudado porque freia uma enzima que trabalha dentro das células que armazenam gordura e, de passagem, influencia o NAD+, que é o que a célula usa para produzir energia. A pesquisa foi feita em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "aicar": {
      "short_description": "Estudado em como o músculo produz e gasta energia.",
      "description": "AICAR é uma molécula pequena, não um peptídeo. É estudado porque aciona um interruptor que a célula usa quando lhe falta energia, o mesmo que se ativa com o exercício. O trabalho foi feito em laboratório e em animais, sobretudo no músculo. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "aod-9604": {
      "short_description": "Pedaço modificado do hormônio do crescimento, visto na gordura.",
      "description": "AOD-9604 é um pedacinho do hormônio do crescimento ao qual se fez uma alteração em laboratório. É estudado pelo efeito sobre as células que guardam a gordura, sem arrastar os demais efeitos do hormônio inteiro. Há trabalho em laboratório, em animais e também estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cagri-sema-2-5mg-2-5mg": {
      "short_description": "Cagrilintida e semaglutida juntas no mesmo frasco.",
      "description": "Este frasco traz dois peptídeos juntos: cagrilintida e semaglutida. Cada um imita um sinal diferente dos que o corpo usa para avisar que já comeu, e por isso são estudados em dupla. Os dois separadamente têm estudos em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "cagrilintida": {
      "short_description": "Estudada pelo sinal de saciedade que imita.",
      "description": "Cagrilintida imita a amilina, um hormônio que o pâncreas libera junto com a insulina para avisar que já se comeu. Foi feita para durar mais que a original. É estudada na saciedade e na composição do corpo, com trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "dulaglutida": {
      "short_description": "Imita o sinal de saciedade e dura uma semana inteira.",
      "description": "Dulaglutida imita o GLP-1, o sinal que o intestino manda ao cérebro quando se comeu. Vai presa a um pedaço de anticorpo, e isso faz com que resista uma semana inteira. É estudada no manejo do açúcar no sangue; é um dos compostos mais pesquisados do seu grupo, também em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "l-carnitine": {
      "short_description": "Leva as gorduras até onde a célula as queima.",
      "description": "A L-carnitina é uma substância muito conhecida que o corpo fabrica e que também está na carne. Seu trabalho é levar as gorduras até a mitocôndria, a parte da célula onde são queimadas para dar energia. Foi muito estudada, em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "lipo-c": {
      "short_description": "Solução com metionina, inositol e colina, pronta para usar.",
      "description": "LIPO-C não é um peptídeo: é uma solução que mistura metionina, inositol e colina, três substâncias que estão na comida do dia a dia. É estudada no manejo das gorduras pelo fígado. Vem pronta em frasco de 10 mL, não em pó. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "liraglutida": {
      "short_description": "Imita o sinal de saciedade; é estudada há muitos anos.",
      "description": "Liraglutida imita o GLP-1, o sinal que o intestino manda ao cérebro quando já se comeu. Leva um ácido graxo preso que a faz se agarrar a uma proteína do sangue e durar perto de um dia. É uma das mais estudadas do seu grupo: laboratório, animais e muitas pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "mots-c": {
      "short_description": "Estudado pelo papel na energia do corpo.",
      "description": "MOTS-c é um peptídeo pouco comum: não vem do DNA do núcleo, e sim do das mitocôndrias, que são as usinas de energia da célula. É estudado por como o corpo administra essa energia. Há bastante trabalho em laboratório e em animais, e estudos mais recentes em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "retatrutida": {
      "short_description": "Imita três sinais do corpo ao mesmo tempo; muito estudada hoje.",
      "description": "Retatrutida é um peptídeo que imita ao mesmo tempo três sinais que o corpo usa para avisar que comeu e para mover suas reservas. É um dos compostos mais pesquisados atualmente no terreno do metabolismo, com estudos em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "retatrutide-20mg-tirzepatide-40mg": {
      "short_description": "Retatrutida e tirzepatida juntas no mesmo frasco.",
      "description": "Este frasco traz dois peptídeos juntos: retatrutida e tirzepatida. Os dois imitam sinais que o corpo usa para avisar que já comeu, só que a retatrutida cobre três e a tirzepatida dois. Cada um separadamente tem estudos em pessoas; a combinação no mesmo frasco foi pouco estudada. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "semaglutida": {
      "short_description": "Imita o sinal que avisa ao cérebro que já se comeu.",
      "description": "Semaglutida imita o GLP-1, um sinal que o intestino manda ao cérebro quando já se comeu. Foi feita para durar perto de uma semana, em vez dos minutos que dura o sinal original. É um dos peptídeos mais estudados que existem: laboratório, animais e muitíssimas pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "slu-pp-332": {
      "short_description": "Estudado como se imitasse o efeito do exercício.",
      "description": "SLU-PP-332 é uma molécula pequena, não um peptídeo. É estudado porque aciona no músculo interruptores parecidos com os que o exercício ativa, e por isso é chamado de mimético do exercício. Os trabalhos publicados são de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "survodutide": {
      "short_description": "Imita dois sinais do corpo ao mesmo tempo.",
      "description": "Survodutide é um peptídeo que imita dois sinais que o corpo usa: o que avisa que já comeu e o que manda buscar reservas de energia. É estudado no gasto de energia, no fígado e na composição do corpo, com trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "tirzepatida": {
      "short_description": "Imita dois sinais de saciedade em vez de um.",
      "description": "Tirzepatida imita dois sinais que o intestino manda ao cérebro depois de comer, não apenas um. Foi feita para durar perto de uma semana. É estudada no manejo do açúcar no sangue e na composição do corpo; há muitíssimos estudos em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ara-290": {
      "short_description": "Estudado nos nervos pequenos e na inflamação.",
      "description": "ARA-290, também chamado cibinetide, é um pedacinho da eritropoetina ao qual se retirou a parte que fabrica glóbulos vermelhos: sobra só a que se relaciona com a reparação. É estudado nos nervos pequenos e na inflamação dos tecidos, com trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "bpc-157": {
      "short_description": "Estudado na reparação de tecidos e do estômago.",
      "description": "BPC-157 é um peptídeo curto que vem de uma proteína do suco gástrico. É um dos mais estudados de todo o catálogo: há centenas de trabalhos, sobretudo em animais, observando tendões, músculo, intestino e estômago. A pesquisa em pessoas é bem menor. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "bpc-157-10mg-tb-500-10mg": {
      "short_description": "BPC-157 e TB-500 juntos, a dupla clássica de reparação.",
      "description": "Este frasco traz os dois peptídeos mais estudados juntos em reparação de tecidos: BPC-157 e TB-500. Os dois aparecem em trabalhos sobre formação de vasos novos, movimento das células e remodelação do tecido. A maior parte dessa pesquisa é em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "bpc-157-5mg-tb-500-5mg": {
      "short_description": "A mesma dupla BPC-157 e TB-500, em tamanho menor.",
      "description": "É a apresentação menor da dupla clássica: BPC-157 e TB-500 no mesmo frasco. Os dois são estudados em cicatrização, formação de vasos novos e remodelação de tendão, músculo e mucosa do intestino. A maior parte do trabalho publicado é em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "follistatin": {
      "name": "Folistatina",
      "short_description": "Estudada porque freia o freio natural do músculo.",
      "description": "A folistatina é uma proteína que o corpo fabrica e que se prende à miostatina, que é o sinal encarregado de frear o crescimento do músculo. Por isso é estudada no músculo esquelético. Há bastante trabalho em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "gdf-8": {
      "short_description": "É a miostatina, o freio natural do crescimento muscular.",
      "description": "GDF-8 é o nome técnico da miostatina, o sinal que o próprio corpo usa para frear o crescimento do músculo. É estudado justamente por isso: para entender como o organismo coloca esse limite. O trabalho publicado é de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg": {
      "short_description": "Três peptídeos de reparação e pele no mesmo frasco.",
      "description": "GLOW junta três peptídeos num só frasco: BPC-157, GHK-Cu e TB-500. Os três aparecem em trabalhos sobre reparação de tecido, formação de vasos novos e a estrutura que sustenta a pele. Cada um tem sua própria literatura, quase toda de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "klow-bpc-ghk-cu-tb-500-kpv": {
      "short_description": "Quatro peptídeos de reparação no mesmo frasco.",
      "description": "KLOW junta quatro peptídeos: BPC-157, GHK-Cu, TB-500 e KPV. Os três primeiros aparecem em trabalhos de reparação de tecido e da estrutura que sustenta a pele; o KPV é estudado na resposta inflamatória. Cada um tem sua própria literatura, quase toda de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "kpv": {
      "short_description": "Estudado na inflamação do intestino e da pele.",
      "description": "KPV é um peptídeo de apenas três aminoácidos: é o pedacinho final de um hormônio que o corpo já produz. É estudado na resposta inflamatória, sobretudo no intestino e na pele. O trabalho publicado é de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ll-37": {
      "short_description": "É a defesa natural do corpo contra micróbios.",
      "description": "LL-37 é o único peptídeo da sua classe que o ser humano fabrica: faz parte da primeira linha de defesa contra os micróbios. É estudado nessa defesa natural, na formação de vasos novos e no fechamento de feridas. É um dos mais pesquisados no seu campo, sobretudo em laboratório. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ptd-1": {
      "short_description": "Estudado como veículo para levar coisas dentro da célula.",
      "description": "PTD-1 não é estudado pelo que faz, e sim por onde chega: pertence a um grupo de peptídeos capazes de atravessar a membrana da célula, e por isso são pesquisados como veículo para levar outras moléculas para dentro. O trabalho publicado é de laboratório. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "ptd-dbm": {
      "short_description": "Estudado no folículo do cabelo e no fechamento de feridas.",
      "description": "PTD-DBM é um peptídeo desenhado em laboratório para liberar uma via de sinais que a célula usa quando está se regenerando. Foi estudado em camundongos, observando o folículo do cabelo e o fechamento de feridas. Todo o trabalho publicado é de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "tb-500": {
      "short_description": "Estudado no movimento das células e na reparação.",
      "description": "TB-500 é a parte ativa da timosina beta-4, uma proteína que o corpo produz. É estudado porque tem a ver com o modo como as células se movem quando um tecido está se reparando. É um dos peptídeos mais conhecidos em recuperação, com trabalho feito sobretudo em laboratório e em animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "gonadorelin-acetate": {
      "short_description": "É o sinal que coloca em marcha os hormônios reprodutivos.",
      "description": "A gonadorelina é a versão feita em laboratório do sinal que o cérebro manda para colocar em marcha os hormônios reprodutivos. O característico é que o corpo o envia em pulsos, não de forma contínua, e isso mesmo é estudado. Há trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "hcg": {
      "short_description": "Hormônio da gravidez, muito estudado no eixo hormonal.",
      "description": "A HCG é o hormônio que aparece durante a gravidez e que os testes caseiros detectam. É estudada porque age sobre o mesmo interruptor que o hormônio LH usa, o que dá a ordem de fabricar hormônios sexuais. É uma molécula muito conhecida, com trabalho em laboratório, em animais e em pessoas. É medida em unidades (IU). Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "hmg": {
      "short_description": "Mistura de dois hormônios que trabalham sobre os ovários.",
      "description": "HMG, também chamada menotropina, traz juntos os dois hormônios que o corpo usa para fazer trabalhar os ovários e os testículos. É estudada na maturação dos folículos e na produção de hormônios sexuais. É um preparado com décadas de literatura, também em pessoas. É medida em unidades (IU). Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "pt-141": {
      "short_description": "Estudado no desejo, a partir do cérebro e não dos vasos.",
      "description": "PT-141, também chamado bremelanotida, é parente dos Melanotan, mas é estudado por outra coisa: age no cérebro, não nos vasos sanguíneos. Esse é o ângulo pesquisado no desejo sexual. Há trabalho em laboratório, em animais e também estudos em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "triptorelin-acetate": {
      "short_description": "Estudada no eixo hormonal reprodutivo.",
      "description": "Triptorelina imita o sinal que coloca em marcha os hormônios reprodutivos, mas de forma contínua em vez de em pulsos. O curioso é que, ao ficar ligada, a hipófise acaba deixando de responder; esse comportamento é o que se estuda. Há trabalho em laboratório, em animais e em pessoas. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "agua-bacteriostatica": {
      "name": "Água bacteriostática",
      "short_description": "É a água com que se dissolve o pó do frasco.",
      "description": "Não é um peptídeo: é um insumo de laboratório. É água estéril com um conservante (álcool benzílico) que impede o crescimento de bactérias, e serve para dissolver os compostos que vêm em pó. É o que se usa no trabalho de laboratório do dia a dia. Uso exclusivo em pesquisa (RUO).",
      "form": "Solução",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "b12": {
      "short_description": "Solução de vitamina B12 para trabalho de laboratório.",
      "description": "É vitamina B12 (cianocobalamina) em solução, a 1 mg por mililitro. Não é um peptídeo: usa-se como reagente e como referência em testes de laboratório. Vem pronta em frasco de 10 mL. Uso exclusivo em pesquisa (RUO).",
      "form": "Solução",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "acido-acetico": {
      "short_description": "Solvente de laboratório para os pós mais difíceis.",
      "description": "Não é um peptídeo: é um insumo de laboratório. É uma solução diluída de ácido acético, o mesmo ácido do vinagre, usada para dissolver pós que não se dissolvem bem só com água. Uso exclusivo em pesquisa (RUO).",
      "form": "Solução",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    },
    "adipotida": {
      "short_description": "Estudada nos vasos que alimentam o tecido gorduroso.",
      "description": "Adipotida é um peptídeo de duas partes: uma que busca os vasos sanguíneos do tecido gorduroso e outra que age assim que chega lá. É estudada por esse ângulo pouco comum: não a gordura em si, mas os vasos que a alimentam. O trabalho publicado é de laboratório e de animais. Uso exclusivo em pesquisa (RUO).",
      "form": "Liofilizado",
      "storage": "Conservar a -20 °C, protegido da luz. Reconstituído: 2–8 °C."
    }
  },
};

export default catalogo;
