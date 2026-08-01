// Catálogo de respaldo (offline) — generado desde la maestra + categories.py. RUO.
// Cada producto tiene 'variants' (presentaciones) con su precio; 'categories' lista todas sus categorías.
export const fallbackCategories = [
  {
    "name": "Pérdida de peso / Metabólicos",
    "slug": "perdida-peso",
    "icon": "Flame",
    "description": "Péptidos de investigación en metabolismo y composición corporal."
  },
  {
    "name": "Hormona de crecimiento",
    "slug": "hormona-crecimiento",
    "icon": "Activity",
    "description": "Secretagogos y péptidos de señalización de hormona de crecimiento."
  },
  {
    "name": "Recuperación y tejidos",
    "slug": "recuperacion",
    "icon": "HeartPulse",
    "description": "Péptidos estudiados en reparación de tejidos, tendones y mucosa."
  },
  {
    "name": "Longevidad y antiedad",
    "slug": "longevidad",
    "icon": "Hourglass",
    "description": "Péptidos estudiados en envejecimiento celular y función mitocondrial."
  },
  {
    "name": "Salud sexual y hormonal",
    "slug": "sexual-hormonal",
    "icon": "HeartHandshake",
    "description": "Péptidos de investigación en ejes reproductivo y hormonal."
  },
  {
    "name": "Nootrópicos y sueño",
    "slug": "nootropicos",
    "icon": "Brain",
    "description": "Péptidos de investigación en función cognitiva, estrés y sueño."
  },
  {
    "name": "Estética y piel",
    "slug": "estetica",
    "icon": "Sparkles",
    "description": "Péptidos de investigación en piel, cabello y estética."
  },
  {
    "name": "Bioreguladores",
    "slug": "bioreguladores",
    "icon": "ShieldPlus",
    "description": "Bioreguladores peptídicos cortos, de investigación."
  },
  {
    "name": "Stacks / Combos",
    "slug": "stacks",
    "icon": "Layers",
    "description": "Combinaciones de péptidos para protocolos de investigación."
  },
  {
    "name": "Otros / Especialidad",
    "slug": "otros",
    "icon": "Package",
    "description": "Compuestos de investigación de especialidad."
  },
  {
    "name": "Suministros",
    "slug": "suministros",
    "icon": "FlaskConical",
    "description": "Insumos para reconstitución y manejo en laboratorio."
  }
];

// Categorias que NO se le ensenan al cliente. Los productos siguen a la venta y se
// pueden buscar; solo no aparece el boton de la categoria. Hoy no hay ninguna
// escondida: 'suministros' se volvio a mostrar porque si no, el agua bacteriostatica,
// la B12, la Vitamina B12 y el acido acetico se quedaban sin categoria y no habia
// forma de llegar a ellos navegando. Christian, 2026-07-25.
export const HIDDEN_CATEGORIES = [];

// LA lista de categorias que ve el cliente, en el header, la portada y el catalogo.
// Se calcula al final del archivo (necesita fallbackProducts) y sale de AQUI, nunca
// del API: el API todavia devuelve slugs viejos (recuperacion-tejidos, metabolicos,
// bienestar, accesorios) que ningun producto usa, y esas categorias abrian vacias.
// Ademas se descarta cualquiera que se quede sin productos. Christian, 2026-07-25.

export const fallbackProducts = [
  {
    "id": "fallback-bronchogen",
    "name": "Bronchogen",
    "slug": "bronchogen",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su efecto en el tejido de los bronquios.",
    "description": "Bronchogen es un péptido muy corto: una cadena de apenas unos cuantos aminoácidos, que son las piezas con las que se arman las proteínas. Se ha estudiado sobre todo en laboratorio, mirando el tejido que recubre los bronquios y el pulmón. Buena parte de esa investigación viene de grupos rusos que trabajan con esta familia de péptidos cortos. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1279,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1279,
        "stock": 40,
        "batch_number": "NP-BRON10-2601",
        "id": "d6a0a69f-7fa5-43b1-a884-d482ae9aa168",
        "sku": "BRONCHOGEN-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/bronchogen.pdf",
    "batch_number": "NP-BRON10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.5,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 0.5,
      "tipica": 1,
      "avanzada": 2,
      "unit": "mg",
      "agua_ml": {
        "10": 3
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cardiogen",
    "name": "Cardiogen",
    "slug": "cardiogen",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su efecto en el tejido del corazón.",
    "description": "Cardiogen es un péptido muy corto, de la misma familia rusa que Bronchogen y Cortagen. La investigación se ha hecho sobre todo en laboratorio y con animales, mirando el músculo del corazón y los vasos sanguíneos. Es de los compuestos que se han trabajado más en el laboratorio que en otro lado. Uso exclusivo en investigación (RUO).",
    "presentation": "20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2399,
    "variants": [
      {
        "presentation": "20 mg",
        "price": 2399,
        "stock": 40,
        "batch_number": "NP-CARD20-2601",
        "id": "7cf529d3-4fb6-4445-86f5-49afea7a1955",
        "sku": "CARDIOGEN-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cardiogen.pdf",
    "batch_number": "NP-CARD20-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 2,
      "tipica": 2,
      "avanzada": 2,
      "unit": "mg",
      "agua_ml": {
        "20": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla). Esta fuente reporta UNA sola dosis para este compuesto, no tres niveles."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cartalax",
    "name": "Cartalax",
    "slug": "cartalax",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su efecto en el cartílago y las articulaciones.",
    "description": "Cartalax es un péptido de apenas tres aminoácidos, las piezas más pequeñas con las que se arman las proteínas. Se ha estudiado en laboratorio con las células que fabrican el cartílago y con el tejido que une y sostiene las articulaciones. Pertenece a la misma familia rusa de péptidos cortos que Pinealon y Cortagen. Uso exclusivo en investigación (RUO).",
    "presentation": "20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2399,
    "variants": [
      {
        "presentation": "20 mg",
        "price": 2399,
        "stock": 40,
        "batch_number": "NP-CART20-2601",
        "id": "274b9816-9406-4e3a-99e3-a1fecba8c628",
        "sku": "CARTALAX-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cartalax.pdf",
    "batch_number": "NP-CART20-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1,
      "tipica": 1.5,
      "avanzada": 2,
      "unit": "mg",
      "agua_ml": {
        "20": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cortagen",
    "name": "Cortagen",
    "slug": "cortagen",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su efecto en el tejido de los nervios.",
    "description": "Cortagen es un péptido muy corto de la familia rusa de bioreguladores. Se ha estudiado en laboratorio y con animales, mirando la corteza del cerebro y los nervios del resto del cuerpo. Es de los que se han trabajado principalmente en el laboratorio. Uso exclusivo en investigación (RUO).",
    "presentation": "20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2399,
    "variants": [
      {
        "presentation": "20 mg",
        "price": 2399,
        "stock": 40,
        "batch_number": "NP-CORT20-2601",
        "id": "7db29b51-7709-40c6-a3b1-aef2e5dd271c",
        "sku": "CORTAGEN-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cortagen.pdf",
    "batch_number": "NP-CORT20-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "daily_cycle",
    "start_levels": {
      "inicial": 1,
      "tipica": 1.5,
      "avanzada": 2,
      "unit": "mg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de los otros bioreguladores de Khavinson que sí tienen protocolo publicado, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-crystagen",
    "name": "Crystagen",
    "slug": "crystagen",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su efecto en las defensas del cuerpo.",
    "description": "Crystagen es un péptido corto de la familia rusa de bioreguladores. Se ha estudiado en laboratorio con los linfocitos, que son los glóbulos blancos encargados de defender al cuerpo. El trabajo publicado se ha hecho sobre todo en cultivos de células. Uso exclusivo en investigación (RUO).",
    "presentation": "20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2399,
    "variants": [
      {
        "presentation": "20 mg",
        "price": 2399,
        "stock": 40,
        "batch_number": "NP-CRYS20-2601",
        "id": "f41b3962-f2ab-4a10-a74d-4818bc80f0bf",
        "sku": "CRYSTAGEN-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/crystagen.pdf",
    "batch_number": "NP-CRYS20-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1,
      "tipica": 1,
      "avanzada": 1,
      "unit": "mg",
      "agua_ml": {
        "20": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla). Esta fuente reporta UNA sola dosis para este compuesto, no tres niveles."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-pinealon",
    "name": "Pinealon",
    "slug": "pinealon",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su efecto en las neuronas y el desgaste celular.",
    "description": "Pinealon es un péptido de tres aminoácidos, de la familia rusa de bioreguladores. Se ha estudiado en laboratorio y con animales, mirando las neuronas y el desgaste que sufren las células cuando trabajan bajo estrés. También se ha visto cómo influye en qué genes se encienden dentro de la célula. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1019,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1019,
        "stock": 40,
        "batch_number": "NP-PINE5-2601",
        "id": "def5ccc9-137d-4c5e-b793-155faf15f180",
        "sku": "PINEALON-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1559,
        "stock": 40,
        "batch_number": "NP-PINE10-2601",
        "id": "91bf6c38-503a-414c-affc-4f86e96ccac7",
        "sku": "PINEALON-10MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 1879,
        "stock": 40,
        "batch_number": "NP-PINE20-2601",
        "id": "f1d8a11a-a544-4f8f-bb26-9c62ef776d67",
        "sku": "PINEALON-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/pinealon.pdf",
    "batch_number": "NP-PINE5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 2,
      "tipica": 3,
      "avanzada": 5,
      "unit": "mg",
      "agua_ml": {
        "5": 1,
        "10": 2,
        "20": 4
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-thymalin",
    "name": "Thymalin",
    "slug": "thymalin",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su efecto en las defensas del cuerpo.",
    "description": "Thymalin es una mezcla de péptidos que se obtiene del timo, la glándula donde maduran las células de defensa del cuerpo. Se ha estudiado por su efecto sobre esas células, en laboratorio y con animales, y hay también trabajos antiguos en personas. Es uno de los compuestos con más años de historia en esta familia. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1439,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-THYM10-2601",
        "id": "861adbea-4210-4aa0-8100-67638aa223f0",
        "sku": "THYMALIN-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/thymalin.pdf",
    "batch_number": "NP-THYM10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 5,
    "start_unit": "mg",
    "start_freq": "daily_cycle",
    "start_levels": {
      "inicial": 5,
      "tipica": 5,
      "avanzada": 5,
      "unit": "mg",
      "fuente": "⚠️ ORIENTATIVA. Ficha del fabricante registrado Samson-Med (https://samsonmed.ru/en/portfolio-items/thymalin/ — calidad B, ficha oficial de producto): 5 a 20 mg INTRAMUSCULARES al día, de 3 a 10 días, 30 a 100 mg por curso, disolviendo el vial en 1 a 2 mL de solución salina isotónica. CORRECCIÓN 2026-07-31: los tres niveles decían 10 mg con 2 mL de agua — el VIAL ENTERO en un solo pinchazo, y 200 rayitas, el doble de lo que cabe en una jeringa U-100. Era imposible de aplicar. Se baja al extremo inferior de la ficha (5 mg) y se reconstituye con 1 mL, que también está dentro del rango que indica el fabricante: quedan 10 mg/mL, la dosis son 50 rayitas (media jeringa) y el vial rinde 2 aplicaciones. A 5 mg al día durante 6 a 10 días el curso suma 30 a 50 mg, dentro de los 30 a 100 mg que pide la ficha. El protocolo de Khavinson que citábamos antes (10 mg/día) no se pudo verificar contra una fuente localizable.",
      "agua_ml": {
        "10": 1
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-thymosin-alpha-1",
    "name": "Thymosin Alpha-1",
    "slug": "thymosin-alpha-1",
    "category": "bioreguladores",
    "categories": [
      "bioreguladores"
    ],
    "short_description": "Se estudia por su papel en las defensas del cuerpo.",
    "description": "La timosina alfa-1 es un péptido de 28 aminoácidos que el propio cuerpo produce en el timo, la glándula donde maduran las células de defensa. Se ha estudiado bastante: en laboratorio, en animales y también en personas. La investigación se centra en cómo despierta a las células que avisan al organismo de que hay algo extraño. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1399,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1399,
        "stock": 40,
        "batch_number": "NP-THYM5-2601",
        "id": "473b201b-96e4-45c1-b35b-b096b39a1d2d",
        "sku": "THYMOSINALPHA1-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-THYM10-2601",
        "id": "17c3f0ff-a6d0-45a1-b35c-d5e620780829",
        "sku": "THYMOSINALPHA1-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/thymosin-alpha-1.pdf",
    "batch_number": "NP-THYM5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1.6,
    "start_unit": "mg",
    "start_freq": "2x_week",
    "start_levels": {
      "inicial": 1.6,
      "tipica": 1.6,
      "avanzada": 1.6,
      "unit": "mg",
      "agua_ml": {
        "5": 2,
        "10": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla). Esta fuente reporta UNA sola dosis para este compuesto, no tres niveles."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-ahk-cu",
    "name": "AHK-Cu",
    "slug": "ahk-cu",
    "category": "estetica",
    "categories": [
      "estetica"
    ],
    "short_description": "Se estudia por su efecto en el folículo del pelo y la piel.",
    "description": "AHK-Cu es un péptido pequeño unido a cobre. Se ha estudiado en laboratorio con la raíz del pelo y con las células que forman vasos sanguíneos nuevos. También aparece en trabajos sobre la estructura que sostiene la piel por dentro. Uso exclusivo en investigación (RUO).",
    "presentation": "50 mg – 100 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 889,
    "variants": [
      {
        "presentation": "50 mg",
        "price": 889,
        "stock": 40,
        "batch_number": "NP-AHKC50-2601",
        "id": "3e2d78c8-408f-4298-b3c8-02ade1ac012a",
        "sku": "AHKCU-50MG",
        "descuentable": true
      },
      {
        "presentation": "100 mg",
        "price": 1379,
        "stock": 40,
        "batch_number": "NP-AHKC100-2601",
        "id": "e315152d-e416-444a-b3f8-52b3d7163fbe",
        "sku": "AHKCU-100MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ahk-cu.pdf",
    "batch_number": "NP-AHKC50-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_levels": {
      "inicial": 1,
      "tipica": 1.5,
      "avanzada": 2,
      "unit": "mg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de GHK-Cu, el otro péptido de cobre del catálogo, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-botulinum-toxin",
    "name": "Botulinum toxin",
    "slug": "botulinum-toxin",
    "category": "estetica",
    "categories": [
      "estetica"
    ],
    "short_description": "Proteína de laboratorio que se mide en unidades, no en miligramos.",
    "description": "La toxina botulínica es una proteína muy conocida y muy estudiada, en laboratorio, en animales y en personas. La investigación se centra en cómo frena la señal que va del nervio al músculo. Se mide en unidades biológicas, no en miligramos: por eso el vial dice IU y no mg. Uso exclusivo en investigación (RUO).",
    "presentation": "100 IU",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1519,
    "variants": [
      {
        "presentation": "100 IU",
        "price": 1519,
        "stock": 40,
        "batch_number": "NP-BOTU100-2601",
        "id": "89080fe9-e7c2-471b-b61a-87f6f4f43642",
        "sku": "BOTULINUMTOXIN-100IU",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/botulinum-toxin.pdf",
    "batch_number": "NP-BOTU100-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-ghk-cu",
    "name": "GHK-Cu",
    "slug": "ghk-cu",
    "category": "estetica",
    "categories": [
      "estetica",
      "recuperacion"
    ],
    "short_description": "Se estudia por su efecto en la piel y en el cabello.",
    "description": "GHK-Cu es un péptido de tres aminoácidos unido a cobre; el cuerpo lo produce de forma natural y va bajando con la edad. Es de los más estudiados en laboratorio dentro de la cosmética experimental. La investigación mira cómo actúa sobre la estructura que da firmeza a la piel y sobre el folículo del cabello. Uso exclusivo en investigación (RUO).",
    "presentation": "50 mg – 100 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 659,
    "variants": [
      {
        "presentation": "50 mg",
        "price": 659,
        "stock": 40,
        "batch_number": "NP-GHK50-2601",
        "id": "ebe30e7e-1493-4658-85ad-27e5611c3285",
        "sku": "GHKCU-50MG",
        "descuentable": true
      },
      {
        "presentation": "100 mg",
        "price": 1269,
        "stock": 40,
        "batch_number": "NP-GHK100-2601",
        "id": "b12e549d-4262-4bd8-91e6-e64a6e0a6f8a",
        "sku": "GHKCU-100MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ghk-cu.pdf",
    "batch_number": "NP-GHK50-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1,
      "tipica": 1.5,
      "avanzada": 2,
      "unit": "mg",
      "agua_ml": {
        "50": 2.5,
        "100": 5
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": true,
    "is_new": false
  },
  {
    "id": "fallback-lemon-bottle",
    "name": "Lemon Bottle",
    "slug": "lemon-bottle",
    "category": "estetica",
    "categories": [
      "estetica"
    ],
    "short_description": "Solución con riboflavina, lecitina y bromelina, estudiada en grasa.",
    "description": "Lemon Bottle no es un péptido: es una solución que mezcla tres ingredientes conocidos, riboflavina (vitamina B2), lecitina y bromelina (una enzima de la piña). Se ha estudiado en laboratorio con las células que guardan la grasa. Viene lista en frasco de 10 mL, no en polvo. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mL",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 519,
    "variants": [
      {
        "presentation": "10 mL",
        "price": 519,
        "stock": 40,
        "batch_number": "NP-LEMO10-2601",
        "id": "43db6450-664f-434c-b0a8-03f7dd766fdf",
        "sku": "LEMONBOTTLE-10ML",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/lemon-bottle.pdf",
    "batch_number": "NP-LEMO10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-matrixyl",
    "name": "Matrixyl",
    "slug": "matrixyl",
    "category": "estetica",
    "categories": [
      "estetica"
    ],
    "short_description": "Se estudia por su efecto en el colágeno de la piel.",
    "description": "Matrixyl es un péptido corto muy usado en cosmética; su nombre técnico es palmitoil pentapéptido-4. Se ha estudiado en laboratorio con las células de la piel que fabrican colágeno, que es lo que le da firmeza. Es de los péptidos cosméticos con más trabajo publicado. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 899,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 899,
        "stock": 40,
        "batch_number": "NP-MATR10-2601",
        "id": "b9829cd6-ebe5-40ed-8646-ec895db6d434",
        "sku": "MATRIXYL-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/matrixyl.pdf",
    "batch_number": "NP-MATR10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-snap-8",
    "name": "SNAP-8",
    "slug": "snap-8",
    "category": "estetica",
    "categories": [
      "estetica"
    ],
    "short_description": "Péptido cosmético estudiado en la señal del nervio al músculo.",
    "description": "SNAP-8 es un péptido de ocho aminoácidos usado en cosmética. Se ha estudiado en laboratorio por cómo interfiere con el mecanismo que suelta la señal desde el nervio hacia el músculo. El trabajo publicado se ha hecho sobre todo en cultivos de células. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 100 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 839,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 839,
        "stock": 40,
        "batch_number": "NP-SNAP10-2601",
        "id": "09b829c3-1104-4e87-a5a9-fc04d50a087d",
        "sku": "SNAP8-10MG",
        "descuentable": true
      },
      {
        "presentation": "100 mg",
        "price": 2619,
        "stock": 40,
        "batch_number": "NP-SNAP100-2601",
        "id": "ad15b37a-da23-4135-b754-593de64b2582",
        "sku": "SNAP8-100MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/snap-8.pdf",
    "batch_number": "NP-SNAP10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cjc-1295-no-dac-5mg-ipamorelin-5mg",
    "name": "CJC-1295 no DAC 5mg + Ipamorelin 5mg",
    "slug": "cjc-1295-no-dac-5mg-ipamorelin-5mg",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento",
      "stacks"
    ],
    "short_description": "Dos péptidos de hormona de crecimiento en un mismo vial.",
    "description": "Este vial trae dos péptidos juntos: CJC-1295 sin DAC e Ipamorelin. Los dos se estudian por su efecto sobre la hormona de crecimiento, pero cada uno la empuja por un camino distinto, y por eso se investigan en pareja. El trabajo se ha hecho sobre todo en laboratorio y con animales. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1699,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1699,
        "stock": 40,
        "batch_number": "NP-CJC110-2601",
        "id": "801c9ec0-6131-4b13-94d0-5e2a26c19a08",
        "sku": "CJC1295NODAC5M-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cjc-1295-no-dac-5mg-ipamorelin-5mg.pdf",
    "batch_number": "NP-CJC110-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 240,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 240,
      "tipica": 400,
      "avanzada": 600,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 2.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-fragment-17-23",
    "name": "Fragment 17-23",
    "slug": "fragment-17-23",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Es el pedazo central del TB-500, estudiado en reparación.",
    "description": "Fragment 17-23 es el trocito central del TB-500: siete aminoácidos, justo la parte que se engancha a la actina, una proteína que las células usan para moverse. Se ha estudiado en laboratorio por el movimiento de las células y la formación de vasos nuevos. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1019,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1019,
        "stock": 40,
        "batch_number": "NP-FRAG10-2601",
        "id": "bb5c1ca9-4443-4acc-8b33-44fed9f66f06",
        "sku": "FRAGMENT1723-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/fragment-17-23.pdf",
    "batch_number": "NP-FRAG10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 250,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de HGH Fragment 176-191, del mismo origen, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-ghrp-2-acetate",
    "name": "GHRP-2 Acetate",
    "slug": "ghrp-2-acetate",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Se estudia porque hace que el cuerpo suelte hormona de crecimiento.",
    "description": "GHRP-2 es un péptido corto, de seis aminoácidos. Se estudia porque le da al cuerpo la señal de soltar su propia hormona de crecimiento, en lugar de aportarla desde fuera. Hay trabajo en laboratorio, en animales y también en personas. Es uno de los más veteranos de su familia. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 15 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 719,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 719,
        "stock": 40,
        "batch_number": "NP-GHRP5-2601",
        "id": "6f52dc4b-be86-47f0-8672-f98326894443",
        "sku": "GHRP2ACETATE-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 829,
        "stock": 40,
        "batch_number": "NP-GHRP10-2601",
        "id": "8574b6e3-d5dd-4651-a6a1-8f251f3cd832",
        "sku": "GHRP2ACETATE-10MG",
        "descuentable": true
      },
      {
        "presentation": "15 mg",
        "price": 1069,
        "stock": 40,
        "batch_number": "NP-GHRP15-2601",
        "id": "4541d16f-945b-4cf5-84e8-c3314c0415dc",
        "sku": "GHRP2ACETATE-15MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ghrp-2-acetate.pdf",
    "batch_number": "NP-GHRP5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 150,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 150,
      "tipica": 225,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "5": 1.5,
        "10": 3,
        "15": 4.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-ghrp-6-acetate",
    "name": "GHRP-6 Acetate",
    "slug": "ghrp-6-acetate",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Se estudia en hormona de crecimiento y en el apetito.",
    "description": "GHRP-6 es un péptido de seis aminoácidos, hermano del GHRP-2. Actúa sobre el mismo interruptor que usa la grelina, la hormona que avisa al cerebro que hay hambre. Por eso se estudia en dos frentes: la liberación de hormona de crecimiento y el apetito. Hay trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 719,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 719,
        "stock": 40,
        "batch_number": "NP-GHRP5-2601",
        "id": "50bd5ba7-950f-4072-94e0-11436dad33fa",
        "sku": "GHRP6ACETATE-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 889,
        "stock": 40,
        "batch_number": "NP-GHRP10-2601",
        "id": "50ce374a-42c5-4f02-bb9d-a2a83c757567",
        "sku": "GHRP6ACETATE-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ghrp-6-acetate.pdf",
    "batch_number": "NP-GHRP5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 300,
      "avanzada": 500,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "5": 1.5,
        "10": 3
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-hexarelin-acetate",
    "name": "Hexarelin Acetate",
    "slug": "hexarelin-acetate",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Se estudia en hormona de crecimiento y en tejido del corazón.",
    "description": "Hexarelin es un péptido de seis aminoácidos hecho en laboratorio. Se estudia por dos cosas: la señal que hace soltar hormona de crecimiento y su efecto sobre el tejido del corazón. Hay trabajo en laboratorio, en animales y algunos estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 779,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 779,
        "stock": 40,
        "batch_number": "NP-HEXA2-2601",
        "id": "099ad50d-fe25-4b3f-babf-c1711ebfc03f",
        "sku": "HEXARELINACETA-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-HEXA5-2601",
        "id": "57b96b3d-d265-48e5-b52d-f2893b2e9e3d",
        "sku": "HEXARELINACETA-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/hexarelin-acetate.pdf",
    "batch_number": "NP-HEXA2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 150,
      "avanzada": 200,
      "unit": "mcg",
      "fuente": "Estudio de dosis-respuesta en humanos: 1 a 2 mcg/kg subcutáneos; por arriba de 2 mcg/kg la hormona de crecimiento ya no sube y sí suben cortisol y prolactina. ⚠️ Dosificado POR PESO; aquí va la conversión para ~70-100 kg.",
      "agua_ml": {
        "2": 1,
        "5": 2.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-hgh",
    "name": "HGH",
    "slug": "hgh",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Hormona de crecimiento humana, de las más estudiadas que existen.",
    "description": "HGH es la hormona de crecimiento humana, hecha en laboratorio pero igual a la que produce el cuerpo. Es de los compuestos con más investigación publicada: en laboratorio, en animales y en personas, desde hace décadas. Se estudia por cómo actúa sobre el crecimiento, el manejo de las proteínas y el de las grasas. Se mide en unidades (IU), no en miligramos. Uso exclusivo en investigación (RUO).",
    "presentation": "24 IU – 40 IU",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1139,
    "variants": [
      {
        "presentation": "24 IU",
        "price": 1139,
        "stock": 40,
        "batch_number": "NP-HGH24-2601",
        "id": "a45bb2f4-1410-4f5b-912b-1d52f6b9e90c",
        "sku": "HGH-24IU",
        "descuentable": false
      },
      {
        "presentation": "36 IU",
        "price": 1548,
        "stock": 40,
        "batch_number": "NP-HGH36-2601",
        "id": "98e2710e-365c-4c00-9fd2-4bc4b1903784",
        "sku": "HGH-36IU",
        "descuentable": false
      },
      {
        "presentation": "40 IU",
        "price": 3869,
        "stock": 40,
        "batch_number": "NP-HGH40-2601",
        "id": "24dd69be-8468-40a2-9030-36ca5bdda515",
        "sku": "HGH-40IU",
        "descuentable": false
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/hgh.pdf",
    "batch_number": "NP-HGH24-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.3,
    "start_unit": "iu",
    "start_levels": {
      "inicial": 0.3,
      "tipica": 0.6,
      "avanzada": 0.9,
      "unit": "iu",
      "fuente": "Etiqueta aprobada de somatropina (Norditropin/FDA) para deficiencia de GH en adultos: 0.2 mg al día entre 23 y 60 años, 0.1 mg arriba de 60 y 0.3 mg en mujeres con estrógeno oral. Conversión usada: 1 mg = 3 UI. https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/021148s049lbl.pdf"
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-hgh-fragment-176-191",
    "name": "HGH Fragment 176-191",
    "slug": "hgh-fragment-176-191",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Es un pedazo de la hormona de crecimiento, estudiado en la grasa.",
    "description": "Este compuesto es sólo un trocito de la hormona de crecimiento: la parte 176-191 de la molécula entera. Se estudia porque en laboratorio y en animales se ha mirado su efecto sobre las células que guardan la grasa, sin arrastrar los demás efectos de la hormona completa. La investigación se ha hecho sobre todo fuera del ser humano. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 15 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 959,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 959,
        "stock": 40,
        "batch_number": "NP-HGHF2-2601",
        "id": "dc3eab59-665a-4991-ad71-154537f4c3a0",
        "sku": "HGHFRAGMENT176-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-HGHF5-2601",
        "id": "fdb66b4f-afd5-4964-ba3f-cf95036c33b2",
        "sku": "HGHFRAGMENT176-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 2359,
        "stock": 40,
        "batch_number": "NP-HGHF10-2601",
        "id": "681da265-e826-49f7-87b6-37da77343e0a",
        "sku": "HGHFRAGMENT176-10MG",
        "descuentable": true
      },
      {
        "presentation": "12 mg",
        "price": 2709,
        "stock": 40,
        "batch_number": "NP-HGHF10-2601",
        "id": "a5df0b96-095e-4efa-a6db-144331024c6a",
        "sku": "HGHFRAGMENT176-12MG",
        "descuentable": true
      },
      {
        "presentation": "15 mg",
        "price": 3409,
        "stock": 40,
        "batch_number": "NP-HGHF15-2601",
        "id": "27ef0698-42b0-4ba3-8b6e-6e2bb7217713",
        "sku": "HGHFRAGMENT176-15MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/hgh-fragment-176-191.pdf",
    "batch_number": "NP-HGHF2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 250,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "Ensayo Fase IIa en sobrepeso y obesidad, 250 a 1,000 mcg al día por vía subcutánea durante 12 semanas. ⚠️ Los ensayos humanos se hicieron sobre AOD-9604, el análogo modificado; el fragmento sin modificar no tiene ensayo propio. La cifra se hereda de ahí.",
      "agua_ml": {
        "1": 1,
        "2": 1,
        "5": 2.5,
        "10": 2.5,
        "12": 3,
        "15": 3
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-igf-1-lr3",
    "name": "IGF-1 LR3",
    "slug": "igf-1-lr3",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Versión de larga duración de un factor de crecimiento.",
    "description": "IGF-1 LR3 es una versión modificada del IGF-1, un factor de crecimiento que el cuerpo fabrica en el hígado. El cambio hace que dure más tiempo activo, porque se le pegan menos las proteínas que normalmente lo frenan. Se ha estudiado sobre todo en cultivos de células. Uso exclusivo en investigación (RUO).",
    "presentation": "1 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1449,
    "variants": [
      {
        "presentation": "1 mg",
        "price": 1449,
        "stock": 40,
        "batch_number": "NP-IGF11-2601",
        "id": "1932037e-9657-4f4f-b832-4ed7a469ed04",
        "sku": "IGF1LR3-1MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/igf-1-lr3.pdf",
    "batch_number": "NP-IGF11-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 33,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 33,
      "tipica": 50,
      "avanzada": 75,
      "unit": "mcg",
      "agua_ml": {
        "1": 1
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-ipamorelin",
    "name": "Ipamorelin",
    "slug": "ipamorelin",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Se estudia porque pide hormona de crecimiento sin tocar otras.",
    "description": "Ipamorelin es un péptido corto muy conocido dentro de este grupo. Se estudia porque da la señal de soltar hormona de crecimiento de forma bastante limpia: casi no mueve otras hormonas del cuerpo. El trabajo publicado viene sobre todo de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.3%",
    "price": 959,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 959,
        "stock": 40,
        "batch_number": "NP-IPA2-2601",
        "id": "b2bf9962-2eab-47cb-a1d2-d5e1bb243ef1",
        "sku": "IPAMORELIN-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1069,
        "stock": 40,
        "batch_number": "NP-IPA5-2601",
        "id": "8b8e6aef-74ce-4cd0-addd-ea31b00c481d",
        "sku": "IPAMORELIN-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1089,
        "stock": 40,
        "batch_number": "NP-IPA10-2601",
        "id": "f88df19e-5dd5-4bd3-8e1e-348a1297b91d",
        "sku": "IPAMORELIN-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ipamorelin.pdf",
    "batch_number": "NP-IPA2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "agua_ml": {
        "5": 1.5,
        "10": 2.5,
        "15": 3
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": true,
    "is_new": false
  },
  {
    "id": "fallback-mgf",
    "name": "MGF",
    "slug": "mgf",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Se estudia en la reparación del músculo tras el esfuerzo.",
    "description": "MGF es una variante del IGF-1 que el músculo produce cuando se le exige un esfuerzo. Se ha estudiado en laboratorio y en animales, mirando las células que reparan la fibra del músculo después de un daño. Es un compuesto que se ha trabajado principalmente fuera del ser humano. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1619,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 1619,
        "stock": 40,
        "batch_number": "NP-MGF2-2601",
        "id": "16d70b17-db13-4ed9-9ae1-631df819dc97",
        "sku": "MGF-2MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/mgf.pdf",
    "batch_number": "NP-MGF2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 200,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 200,
      "tipica": 300,
      "avanzada": 400,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de IGF-1 LR3, del que MGF es una variante de corte del mismo gen, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-peg-mgf",
    "name": "PEG-MGF",
    "slug": "peg-mgf",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "El mismo MGF, con un recubrimiento que lo hace durar más.",
    "description": "PEG-MGF es el MGF con un recubrimiento añadido (el PEG) que hace que aguante más tiempo antes de deshacerse. Se estudia por lo mismo que el MGF: las células que reparan la fibra del músculo. La investigación se ha hecho sobre todo en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1619,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 1619,
        "stock": 40,
        "batch_number": "NP-PEGM2-2601",
        "id": "96191c72-e753-404f-b33c-ca69c838903c",
        "sku": "PEGMGF-2MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/peg-mgf.pdf",
    "batch_number": "NP-PEGM2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 200,
    "start_unit": "mcg",
    "start_freq": "2x_week",
    "start_levels": {
      "inicial": 200,
      "tipica": 300,
      "avanzada": 400,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de MGF, con la frecuencia espaciada que justifica su pegilación, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-sermorelina",
    "name": "Sermorelina",
    "slug": "sermorelina",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Se estudia porque pide al cuerpo su propia hormona de crecimiento.",
    "description": "Sermorelina es el trozo activo de la señal natural que el cerebro manda para que se suelte hormona de crecimiento. Al ser sólo ese trozo, dura poco y su efecto es breve. Es de los más estudiados de su grupo: hay trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 609,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 609,
        "stock": 40,
        "batch_number": "NP-SERM2-2601",
        "id": "706d7fd6-ca0f-47df-96be-3b1da80d32ec",
        "sku": "SERMORELINA-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1089,
        "stock": 40,
        "batch_number": "NP-SERM5-2601",
        "id": "6bdf313c-912e-4ac7-9d6e-93fdc674f250",
        "sku": "SERMORELINA-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 2159,
        "stock": 40,
        "batch_number": "NP-SERM10-2601",
        "id": "eed66e42-37a5-48bf-b227-e65c551050df",
        "sku": "SERMORELINA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/sermorelina.pdf",
    "batch_number": "NP-SERM2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 200,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 200,
      "tipica": 300,
      "avanzada": 500,
      "unit": "mcg",
      "agua_ml": {
        "5": 2.5
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-tesamorelin-10-ipamorelin-5",
    "name": "Tesamorelin 10 + Ipamorelin 5",
    "slug": "tesamorelin-10-ipamorelin-5",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento",
      "stacks"
    ],
    "short_description": "Tesamorelina e Ipamorelina juntas en un mismo vial.",
    "description": "Este vial trae dos péptidos juntos: tesamorelina e ipamorelina. Los dos se estudian por su efecto sobre la hormona de crecimiento, y cada uno la empuja por un camino distinto; de ahí que se investiguen en pareja. Cada uno por separado tiene su propia literatura; la combinación se ha estudiado menos. Uso exclusivo en investigación (RUO).",
    "presentation": "15 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 4499,
    "variants": [
      {
        "presentation": "15 mg",
        "price": 4499,
        "stock": 40,
        "batch_number": "NP-TESA15-2601",
        "id": "0cfaa9cb-6015-492a-99b4-8f336287b0ed",
        "sku": "TESAMORELIN10I-15MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/tesamorelin-10-ipamorelin-5.pdf",
    "batch_number": "NP-TESA15-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1.15,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1.15,
      "tipica": 1.7,
      "avanzada": 2.3,
      "unit": "mg",
      "agua_ml": {
        "15": 3
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-epithalon",
    "name": "Epithalon",
    "slug": "epithalon",
    "category": "longevidad",
    "categories": [
      "longevidad"
    ],
    "short_description": "Se estudia en el envejecimiento de la célula y el reloj del sueño.",
    "description": "Epithalon es un péptido de cuatro aminoácidos. Se estudia por dos cosas: la enzima que cuida las puntas de los cromosomas —que se acortan con la edad— y el reloj interno que marca el día y la noche. Hay trabajo en laboratorio, en animales y también algunos estudios en personas, la mayoría de grupos rusos. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 50 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 949,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 949,
        "stock": 40,
        "batch_number": "NP-EPI10-2601",
        "id": "cc5d841a-54a7-4d8e-8f8a-269033c7ef05",
        "sku": "EPITHALON-10MG",
        "descuentable": true
      },
      {
        "presentation": "50 mg",
        "price": 3359,
        "stock": 40,
        "batch_number": "NP-EPI50-2601",
        "id": "e4f485e9-5bf2-425f-8890-5d1cce61f04a",
        "sku": "EPITHALON-50MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/epithalon.pdf",
    "batch_number": "NP-EPI10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 10,
    "start_unit": "mg",
    "start_freq": "daily_cycle",
    "start_levels": {
      "inicial": 10,
      "tipica": 10,
      "avanzada": 10,
      "unit": "mg",
      "agua_ml": {
        "10": 1
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla). Esta fuente reporta UNA sola dosis para este compuesto, no tres niveles."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-foxo4",
    "name": "FOXO4",
    "slug": "foxo4",
    "category": "longevidad",
    "categories": [
      "longevidad"
    ],
    "short_description": "Se estudia en las células viejas que el cuerpo ya no renueva.",
    "description": "FOXO4-DRI es un péptido diseñado en laboratorio para meterse entre dos proteínas que trabajan juntas dentro de la célula. Se estudia en el campo de las células senescentes, que son células que dejaron de dividirse pero siguen ahí. Todo el trabajo publicado es de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1439,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-FOXO2-2601",
        "id": "3b6fceed-222a-42da-ab79-33e948a211c0",
        "sku": "FOXO4-2MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 5599,
        "stock": 40,
        "batch_number": "NP-FOXO10-2601",
        "id": "39be60d1-8886-4c73-b1b4-d9c093390e9b",
        "sku": "FOXO4-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/foxo4.pdf",
    "batch_number": "NP-FOXO2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 250,
      "tipica": 375,
      "avanzada": 500,
      "unit": "mcg",
      "agua_ml": {
        "10": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-glutation",
    "name": "Glutatión",
    "slug": "glutation",
    "category": "longevidad",
    "categories": [
      "longevidad"
    ],
    "short_description": "Antioxidante que el propio cuerpo fabrica, muy estudiado.",
    "description": "El glutatión es un antioxidante que el cuerpo produce por su cuenta; está en todas las células. Se estudia por su papel cuando la célula trabaja bajo tensión y se desgasta. Es de los compuestos con más investigación acumulada: en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "600 mg – 1500 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 609,
    "variants": [
      {
        "presentation": "600 mg",
        "price": 609,
        "stock": 40,
        "batch_number": "NP-GLUT600-2601",
        "id": "696c2182-2d39-4dde-9544-a34b50b64009",
        "sku": "GLUTATION-600MG",
        "descuentable": true
      },
      {
        "presentation": "1500 mg",
        "price": 1499,
        "stock": 40,
        "batch_number": "NP-GLUT1500-2601",
        "id": "94c30fa2-5eff-4885-a799-8e8ebf9cd946",
        "sku": "GLUTATION-1500MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/glutation.pdf",
    "batch_number": "NP-GLUT600-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 100,
      "avanzada": 100,
      "unit": "mg",
      "agua_ml": {
        "600": 3,
        "1500": 7
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla). Esta fuente reporta UNA sola dosis para este compuesto, no tres niveles."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-humanin",
    "name": "Humanin",
    "slug": "humanin",
    "category": "longevidad",
    "categories": [
      "longevidad"
    ],
    "short_description": "Se estudia por cómo protege a la célula cuando está bajo tensión.",
    "description": "Humanin es un péptido curioso: no viene del ADN del núcleo, sino del de las mitocondrias, que son las pequeñas centrales de energía dentro de cada célula. Se estudia por cómo protege a la célula cuando está bajo tensión, incluidas las neuronas. Hay bastante trabajo en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 3959,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 3959,
        "stock": 40,
        "batch_number": "NP-HUMA10-2601",
        "id": "e54657a8-f41e-407e-a1c6-df56fbb25ca4",
        "sku": "HUMANIN-10MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 4079,
        "stock": 40,
        "batch_number": "NP-HUMA20-2601",
        "id": "48ef8513-9c4e-4201-a6e2-4f87b3b3eb21",
        "sku": "HUMANIN-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/humanin.pdf",
    "batch_number": "NP-HUMA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1,
      "tipica": 2,
      "avanzada": 4,
      "unit": "mg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de MOTS-c, el otro péptido mitocondrial del catálogo, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-nad-plus",
    "name": "NAD+",
    "slug": "nad-plus",
    "category": "longevidad",
    "categories": [
      "longevidad"
    ],
    "short_description": "Se estudia por su papel en la energía de la célula. El vial de 500 mg rinde 5 semanas.",
    "description": "El NAD+ es una molécula que todas las células usan para producir energía; la cantidad va bajando con la edad. Es de los compuestos más estudiados en el campo del envejecimiento celular: hay trabajo en laboratorio, en animales y en personas. No es un péptido, es una coenzima. Uso exclusivo en investigación (RUO).",
    "presentation": "100 mg – 1000 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 839,
    "variants": [
      {
        "presentation": "100 mg",
        "price": 839,
        "stock": 40,
        "batch_number": "NP-NAD100-2601",
        "id": "17253e95-6318-4827-bed2-1dbc536a51c1",
        "sku": "NAD-100MG",
        "descuentable": true
      },
      {
        "presentation": "500 mg",
        "price": 1249,
        "stock": 40,
        "batch_number": "NP-NAD500-2601",
        "id": "58c98a1f-e090-49f4-8067-0a75904d9ca7",
        "sku": "NAD-500MG",
        "descuentable": true
      },
      {
        "presentation": "1000 mg",
        "price": 2279,
        "stock": 40,
        "batch_number": "NP-NAD1000-2601",
        "id": "4a028b3f-73d4-4f83-bebb-4543f0562039",
        "sku": "NAD-1000MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/nad-plus.pdf",
    "batch_number": "NP-NAD100-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 50,
    "start_unit": "mg",
    "start_freq": "2x_week",
    "start_levels": {
      "inicial": 25,
      "tipica": 50,
      "avanzada": 50,
      "unit": "mg",
      "freq": {
        "inicial": "2x_week",
        "tipica": "2x_week",
        "avanzada": "3x_week"
      },
      "agua_ml": {
        "100": 1,
        "500": 5,
        "1000": 5
      },
      "fase": {
        "inicial": "inicio",
        "tipica": "mantenimiento",
        "avanzada": "mantenimiento"
      },
      "fuente": "⚠️ ORIENTATIVA. No existe pauta de NAD+ inyectable respaldada por ensayo clínico; no hay producto aprobado por la FDA y todo lo del mercado es de farmacia de compounding (off-label). Nivel típico = hoja de paciente de Extension Health para el vial de 500 mg (50 mg, 2 inyecciones/semana, 500 mg en 5 mL = 100 mg/mL). Nivel avanzado = tope IM de 150 mg/semana de Olympia Pharmacy (farmacia de compounding 503A). Nivel inicial = mitad del protocolo típico, arranque prudente nuestro. Todo a 100 mg/mL, que es la concentración que usan ambas fuentes: así 1 mg = 1 rayita en jeringa U-100. Revisado 2026-07-31."
    },
    "featured": true,
    "is_new": false
  },
  {
    "id": "fallback-ss-31",
    "name": "SS-31",
    "slug": "ss-31",
    "category": "longevidad",
    "categories": [
      "longevidad"
    ],
    "short_description": "Se estudia en las centrales de energía de la célula.",
    "description": "SS-31 (también llamado elamipretida) es un péptido de cuatro aminoácidos que se acomoda dentro de la mitocondria, la parte de la célula que fabrica la energía. Se estudia por cómo se porta esa mitocondria cuando está desgastada. Hay trabajo en laboratorio, en animales y también estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 50 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1099,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1099,
        "stock": 40,
        "batch_number": "NP-SS3110-2601",
        "id": "1e910b14-c23a-48b5-87e6-4658ba7d4548",
        "sku": "SS31-10MG",
        "descuentable": true
      },
      {
        "presentation": "50 mg",
        "price": 4679,
        "stock": 40,
        "batch_number": "NP-SS3150-2601",
        "id": "6e0c7e19-f32d-474b-be5c-fb897273182f",
        "sku": "SS31-50MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ss-31.pdf",
    "batch_number": "NP-SS3110-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1,
      "tipica": 2,
      "avanzada": 4,
      "unit": "mg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 1,
        "30": 2
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cerebrolysin",
    "name": "Cerebrolysin",
    "slug": "cerebrolysin",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Mezcla de péptidos estudiada en las células del cerebro.",
    "description": "Cerebrolysin no es un solo péptido: es una mezcla de péptidos pequeños obtenida de tejido de cerdo. Se estudia en el campo de la protección de las neuronas y de cómo se recuperan las conexiones del cerebro. Tiene décadas de literatura, sobre todo europea y asiática, con trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "60 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1799,
    "variants": [
      {
        "presentation": "60 mg",
        "price": 1799,
        "stock": 40,
        "batch_number": "NP-CERE60-2601",
        "id": "b3a51c80-bf4a-4817-aff8-b2549970489d",
        "sku": "CEREBROLYSIN-60MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cerebrolysin.pdf",
    "batch_number": "NP-CERE60-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 8,
    "start_unit": "mg",
    "start_levels": {
      "inicial": 8,
      "tipica": 16,
      "avanzada": 24,
      "unit": "mg",
      "agua_ml": {
        "60": 1
      },
      "fuente": "⚠️ ORIENTATIVA, y la dosis está pendiente de decisión. researchdosing.com — manual de dosificación del mercado (hoja de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla). CORRECCIÓN 2026-07-31: el agua estaba anotada para un vial de 215 mg que NO vendemos (nuestra única presentación es de 60 mg), así que ese dato investigado no lo leía nadie y la calculadora caía a su fórmula genérica. Se corrige a 1 mL para el vial de 60 mg: quedan 60 mg/mL y los tres niveles caen en 13, 27 y 40 rayitas. ⚠️ PENDIENTE: la monografía del fabricante (cerebrolysin.com, calidad B) describe una SOLUCIÓN de 215.2 mg/mL y dosis de 10 a 30 mL, o sea miles de miligramos; nuestro vial de 60 mg no corresponde a ese producto y los 8/16/24 mg no tienen fuente propia."
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-dsip",
    "name": "DSIP",
    "slug": "dsip",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Se estudia por su relación con el sueño profundo.",
    "description": "DSIP debe su nombre al sueño: las siglas quieren decir péptido inductor del sueño delta, que es la fase más profunda de la noche. Se descubrió en los años setenta y desde entonces se ha estudiado en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 519,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 519,
        "stock": 40,
        "batch_number": "NP-DSIP2-2601",
        "id": "2f65fb25-e630-4b39-88cb-ae6e8cc71117",
        "sku": "DSIP-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 949,
        "stock": 40,
        "batch_number": "NP-DSIP5-2601",
        "id": "bb8e9ee3-501c-4345-9fba-fe3e11b2f7d5",
        "sku": "DSIP-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1199,
        "stock": 40,
        "batch_number": "NP-DSIP10-2601",
        "id": "949505ed-8adb-440a-aa46-d6a3f12dbf55",
        "sku": "DSIP-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/dsip.pdf",
    "batch_number": "NP-DSIP2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "agua_ml": {
        "5": 2.5
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-melatonina",
    "name": "Melatonina",
    "slug": "melatonina",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Hormona del reloj interno, de las más estudiadas que hay.",
    "description": "La melatonina es la hormona que el cuerpo fabrica al oscurecer y que marca la hora de dormir; la produce una glándula pequeñita en el cerebro. Es de los compuestos con más investigación publicada: en laboratorio, en animales y en muchísimas personas. También se estudia por su papel como antioxidante dentro de la célula. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1159,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1159,
        "stock": 40,
        "batch_number": "NP-MELA10-2601",
        "id": "58c6b561-1b7b-47c8-8663-e14f0c08be17",
        "sku": "MELATONINA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/melatonina.pdf",
    "batch_number": "NP-MELA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 3,
    "start_unit": "mg",
    "start_levels": {
      "inicial": 3,
      "tipica": 5,
      "avanzada": 10,
      "unit": "mg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la dosis oral de melatonina, que sí está documentada, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-orexin-a",
    "name": "Orexin A",
    "slug": "orexin-a",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Se estudia por su papel en estar despierto y en el apetito.",
    "description": "La orexina A es una señal que fabrica el cerebro y que ayuda a mantener el cuerpo despierto y alerta. También participa en el hambre. Se estudia sobre todo en laboratorio y en animales, con algunos trabajos en personas, y es una pieza clave para entender el ciclo de sueño y vigilia. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 9359,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 9359,
        "stock": 40,
        "batch_number": "NP-OREX10-2601",
        "id": "662781a5-c3e9-4791-95e9-7f65594458f8",
        "sku": "OREXINA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/orexin-a.pdf",
    "batch_number": "NP-OREX10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado; sin equivalente publicado, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-orexin-b",
    "name": "Orexin B",
    "slug": "orexin-b",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "La otra orexina, estudiada en el sueño y la alerta.",
    "description": "La orexina B es la segunda de las dos señales orexinas que fabrica el cerebro. Se parece a la orexina A pero prefiere uno de los dos interruptores donde éstas actúan. Se estudia en el sueño, la alerta y el gasto de energía, con trabajo hecho sobre todo en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1839,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1839,
        "stock": 40,
        "batch_number": "NP-OREX5-2601",
        "id": "01fd87d3-af2d-475c-8378-a5e3bf72a4d2",
        "sku": "OREXINB-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 3499,
        "stock": 40,
        "batch_number": "NP-OREX10-2601",
        "id": "5c16ed8b-0dca-4b7e-ba62-1478724aeca3",
        "sku": "OREXINB-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/orexin-b.pdf",
    "batch_number": "NP-OREX5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado; sin equivalente publicado, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-pe-22-28",
    "name": "PE-22-28",
    "slug": "pe-22-28",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Se estudia en el ánimo y en las conexiones del cerebro.",
    "description": "PE-22-28 es una versión corta de la spadina, un péptido que el propio cuerpo produce. Actúa sobre una compuerta de las neuronas llamada TREK-1. Se ha estudiado en laboratorio y en animales, en el campo del ánimo y de cómo se forman conexiones nuevas en el cerebro. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1199,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1199,
        "stock": 40,
        "batch_number": "NP-PE2210-2601",
        "id": "09745c57-4a6c-4749-813e-cfbe6be283af",
        "sku": "PE2228-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/pe-22-28.pdf",
    "batch_number": "NP-PE2210-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 300,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 300,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de Semax y Selank, del mismo grupo neuro, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-pnc-27",
    "name": "PNC-27",
    "slug": "pnc-27",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Se estudia en laboratorio con líneas de células tumorales.",
    "description": "PNC-27 junta dos partes: un trozo de la proteína p53, que es la que vigila el estado de la célula, y una cola que le permite atravesar la membrana. Se ha estudiado en laboratorio, en cultivos de células tumorales, mirando cómo se comporta al llegar a la membrana. Todo el trabajo publicado se ha hecho en cultivos de células. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2159,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 2159,
        "stock": 40,
        "batch_number": "NP-PNC25-2601",
        "id": "d6939bd6-544e-4b5b-b5b9-1eba6395a8f3",
        "sku": "PNC27-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/pnc-27.pdf",
    "batch_number": "NP-PNC25-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 500,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 500,
      "tipica": 1000,
      "avanzada": 2000,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado; no hay nada más cercano, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-selank",
    "name": "Selank",
    "slug": "selank",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Se estudia en la ansiedad y en las defensas del cuerpo.",
    "description": "Selank es un péptido corto desarrollado en Rusia a partir de una molécula que el cuerpo ya produce. Se estudia en dos frentes: la ansiedad y la respuesta de las defensas. Hay trabajo en laboratorio, en animales y también estudios en personas, la mayoría publicados en ruso. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 719,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 719,
        "stock": 40,
        "batch_number": "NP-SLK5-2601",
        "id": "211469df-0397-4498-892d-6360dfc87788",
        "sku": "SELANK-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 829,
        "stock": 40,
        "batch_number": "NP-SLK10-2601",
        "id": "767a631b-3c6c-4f25-9a75-915860bef1ca",
        "sku": "SELANK-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/selank.pdf",
    "batch_number": "NP-SLK5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 250,
      "tipica": 300,
      "avanzada": 500,
      "unit": "mcg",
      "agua_ml": {
        "10": 2.5
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-semax",
    "name": "Semax",
    "slug": "semax",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Se estudia en la memoria y en la protección de las neuronas.",
    "description": "Semax es un péptido corto desarrollado en Rusia, derivado de una hormona que el cuerpo ya produce. Se estudia en la memoria, la atención y la protección de las neuronas. Es de los más trabajados de su familia: hay estudios en laboratorio, en animales y en personas, casi todos publicados en ruso. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 659,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 659,
        "stock": 40,
        "batch_number": "NP-SMX5-2601",
        "id": "87f77e62-1545-4bc3-9e43-41bd95d340a2",
        "sku": "SEMAX-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 909,
        "stock": 40,
        "batch_number": "NP-SMX10-2601",
        "id": "95ce366e-56b3-4c8f-862f-9fc7176f3240",
        "sku": "SEMAX-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/semax.pdf",
    "batch_number": "NP-SMX5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 300,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 300,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 3
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-acth-1-39",
    "name": "ACTH 1-39",
    "slug": "acth-1-39",
    "category": "otros",
    "categories": [
      "otros"
    ],
    "short_description": "Hormona completa que se estudia en las glándulas suprarrenales.",
    "description": "ACTH 1-39 es la hormona entera que la hipófisis manda para despertar a las glándulas suprarrenales, las que están encima de los riñones. Se estudia por esa comunicación y por cómo esas glándulas fabrican sus hormonas. Es una molécula muy conocida, con trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 879,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 879,
        "stock": 40,
        "batch_number": "NP-ACTH5-2601",
        "id": "f9b7b446-9009-41c8-a73d-2ebed37ba522",
        "sku": "ACTH139-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/acth-1-39.pdf",
    "batch_number": "NP-ACTH5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 250,
      "tipica": 250,
      "avanzada": 250,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la cosintropina (ACTH 1-24), que sí tiene dosis clínica de 250 mcg, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "as_needed"
  },
  {
    "id": "fallback-admax",
    "name": "ADMAX",
    "slug": "admax",
    "category": "otros",
    "categories": [
      "otros"
    ],
    "short_description": "Pariente del Semax, estudiado en las conexiones del cerebro.",
    "description": "ADMAX es una versión modificada del Semax, así que viene de la misma familia rusa de péptidos cortos. Se ha estudiado en laboratorio con neuronas, mirando dos sustancias que el cerebro usa para mantener y formar conexiones. Es de los que se han trabajado principalmente en laboratorio. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2309,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 2309,
        "stock": 40,
        "batch_number": "NP-ADMA5-2601",
        "id": "31b78f27-4ca4-4c73-ba18-9065f0c59f85",
        "sku": "ADMAX-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 3469,
        "stock": 40,
        "batch_number": "NP-ADMA10-2601",
        "id": "00e3f5ac-c399-4bac-930d-85dec63a4fa7",
        "sku": "ADMAX-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/admax.pdf",
    "batch_number": "NP-ADMA5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 300,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 300,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 3
      }
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-b7-33",
    "name": "B7-33",
    "slug": "b7-33",
    "category": "otros",
    "categories": [
      "otros"
    ],
    "short_description": "Se estudia en el endurecimiento de tejidos por cicatriz interna.",
    "description": "B7-33 es una versión simplificada de la relaxina, una hormona que el cuerpo produce. Se estudia en la fibrosis, que es cuando un tejido se endurece porque se llena de cicatriz por dentro; se ha mirado en corazón, riñón y pulmón. El trabajo publicado es de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 939,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 939,
        "stock": 40,
        "batch_number": "NP-B7332-2601",
        "id": "22716315-e599-4b50-aa8e-4ee383b8f056",
        "sku": "B733-2MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 2889,
        "stock": 40,
        "batch_number": "NP-B73310-2601",
        "id": "d28d8894-884a-45b1-8d4a-d67970068f5d",
        "sku": "B733-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/b7-33.pdf",
    "batch_number": "NP-B7332-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado para análogos de relaxina, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-cjc-1295-con-dac",
    "name": "CJC-1295 (con DAC)",
    "slug": "cjc-1295-con-dac",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Versión de larga duración: se queda días en circulación.",
    "description": "CJC-1295 con DAC pide al cuerpo que suelte su propia hormona de crecimiento. El añadido DAC hace que se agarre a una proteína de la sangre y aguante varios días, en vez de horas. Hay trabajo en laboratorio, en animales y estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 5 mg",
    "form": "Liofilizado",
    "purity": "99.1%",
    "price": 1079,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 1079,
        "stock": 40,
        "batch_number": "NP-CJCD2-2601",
        "id": "fcea43c2-0c8f-446e-9b5a-395bf7ab0944",
        "sku": "CJC1295CONDAC-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1919,
        "stock": 40,
        "batch_number": "NP-CJCD5-2601",
        "id": "da9906d3-487d-49d3-b2ee-017e427c2f54",
        "sku": "CJC1295CONDAC-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cjc-1295-con-dac.pdf",
    "batch_number": "NP-CJCD2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.5,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 0.5,
      "tipica": 1,
      "avanzada": 1.5,
      "unit": "mg",
      "fuente": "⚠️ ORIENTATIVA y deliberadamente CONSERVADORA. Teichman SL et al., J Clin Endocrinol Metab 2006;91(3):799-805 (PMID 16352683 — calidad A, ensayo aleatorizado en adultos sanos): 30 a 60 mcg/kg subcutáneos, semanal o cada dos semanas; 30 y 60 mcg/kg fueron los cohortes mejor tolerados. El ensayo dosificó POR PESO. CORRECCIÓN 2026-07-31: los niveles anteriores (2/3/4 mg) eran la conversión para ~70 kg, y 3 y 4 mg NO CABEN en el vial de 2 mg que vendemos — la calculadora pedía hasta el doble de lo que trae el vial entero. Como el cohorte más bajo del ensayo ya equivale a ~2.1 mg para 70 kg, cualquier escalera que quepa en ese vial queda por debajo del ensayo: 1.5 mg equivale a 30 mcg/kg para una persona de 50 kg. Se toma esa lectura conservadora (0.5 / 1 / 1.5 mg semanales) para que la dosis quepa siempre y el nivel avanzado no se lleve el vial entero. Quien quiera las cifras del ensayo necesita el vial de 5 mg y criterio médico.",
      "agua_ml": {
        "2": 1,
        "5": 1.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cjc-1295-sin-dac",
    "name": "CJC-1295 (sin DAC)",
    "slug": "cjc-1295-sin-dac",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Versión corta: hace su trabajo y se va rápido.",
    "description": "CJC-1295 sin DAC pide al cuerpo que suelte su propia hormona de crecimiento, igual que la versión con DAC, pero sin el añadido que la hace durar días: ésta actúa y se va en poco tiempo. Se estudia sobre todo en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.1%",
    "price": 609,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 609,
        "stock": 40,
        "batch_number": "NP-CJCN2-2601",
        "id": "2c72debf-df0d-4769-ade0-0c974ad0dee7",
        "sku": "CJC1295SINDAC-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-CJCN5-2601",
        "id": "5ab62375-3a75-4e76-9296-722a63ad9eec",
        "sku": "CJC1295SINDAC-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1429,
        "stock": 40,
        "batch_number": "NP-CJCN10-2601",
        "id": "1d795150-41ef-4f8f-a099-5a456f56f1b4",
        "sku": "CJC1295SINDAC-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cjc-1295-sin-dac.pdf",
    "batch_number": "NP-CJCN2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "5": 1.25,
        "10": 2.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-epo",
    "name": "EPO",
    "slug": "epo",
    "category": "otros",
    "categories": [
      "otros"
    ],
    "short_description": "Hormona que ordena fabricar glóbulos rojos.",
    "description": "La eritropoyetina, o EPO, es la hormona que el riñón manda para que la médula fabrique glóbulos rojos. Se estudia por esa orden y por lo que pasa cuando falta oxígeno. Es una molécula muy conocida y muy investigada: en laboratorio, en animales y en personas. Se mide en unidades (IU). Uso exclusivo en investigación (RUO).",
    "presentation": "3000 IU",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1029,
    "variants": [
      {
        "presentation": "3000 IU",
        "price": 1029,
        "stock": 40,
        "batch_number": "NP-EPO3000-2601",
        "id": "a913a3ba-6d22-4276-acb3-61be1b703e70",
        "sku": "EPO-3000IU",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/epo.pdf",
    "batch_number": "NP-EPO3000-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-kisspeptina-10",
    "name": "Kisspeptina-10",
    "slug": "kisspeptina-10",
    "category": "sexual-hormonal",
    "categories": [
      "sexual-hormonal"
    ],
    "short_description": "Se estudia por su papel en las hormonas reproductivas.",
    "description": "La kisspeptina-10 es la señal con la que el cerebro pone en marcha la cadena de hormonas reproductivas. Se estudia justamente por eso: es la pieza que arranca el sistema. Hay trabajo en laboratorio, en animales y también estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 749,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 749,
        "stock": 40,
        "batch_number": "NP-KISS5-2601",
        "id": "73cce571-2ac1-4026-9dc3-7a185b3cc7ea",
        "sku": "KISSPEPTINA10-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1459,
        "stock": 40,
        "batch_number": "NP-KISS10-2601",
        "id": "655ba833-56e1-4ef5-9c9f-8e7c166b65b7",
        "sku": "KISSPEPTINA10-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/kisspeptina-10.pdf",
    "batch_number": "NP-KISS5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 200,
    "start_unit": "mcg",
    "start_freq": "eod",
    "start_levels": {
      "inicial": 200,
      "tipica": 300,
      "avanzada": 500,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "5": 1.5,
        "10": 3
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-mazdutida",
    "name": "Mazdutida",
    "slug": "mazdutida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Se estudia en el manejo del azúcar y del gasto de energía.",
    "description": "Mazdutida es un péptido que imita a la vez dos señales que el cuerpo ya usa para avisar de que comió y para mover sus reservas. Se estudia en el manejo del azúcar en sangre y en el gasto de energía. Tiene trabajo en laboratorio, en animales y estudios en personas, sobre todo en China. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2039,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 2039,
        "stock": 40,
        "batch_number": "NP-MAZD5-2601",
        "id": "3a23bdc4-c55d-4940-827c-01cb3b0dd1b1",
        "sku": "MAZDUTIDA-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 2719,
        "stock": 40,
        "batch_number": "NP-MAZD10-2601",
        "id": "8aba4b0a-4097-4484-a92a-97ded13b8e45",
        "sku": "MAZDUTIDA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/mazdutida.pdf",
    "batch_number": "NP-MAZD5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1.5,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 1.5,
      "tipica": 3,
      "avanzada": 4.5,
      "unit": "mg",
      "agua_ml": {
        "5": 1,
        "10": 1
      },
      "fuente": "⚠️ ORIENTATIVA. Ensayo fase 2 humano de mazdutida (https://pmc.ncbi.nlm.nih.gov/articles/PMC10719339/ — calidad A): subcutánea SEMANAL con la titulación exacta 1.5 mg las semanas 1 a 4, 3 mg las semanas 5 a 8 y 4.5 mg de la semana 9 a la 24. Los tres niveles son esos tres escalones publicados, ni uno inventado. CORRECCIÓN 2026-07-31: antes decían 2 / 4.5 / 6 mg salidos de una hoja de vendedor (researchdosing.com), y los 6 mg NO CABEN en el vial de 5 mg que vendemos. ⚠️ Aun así, en el vial de 5 mg el nivel avanzado (4.5 mg) se lleva casi todo el vial en un solo pinchazo de 0.9 mL: para ese nivel conviene el vial de 10 mg, donde son 45 rayitas."
    },
    "featured": false,
    "is_new": true
  },
  {
    "id": "fallback-melanotan-i",
    "name": "Melanotan I",
    "slug": "melanotan-i",
    "category": "estetica",
    "categories": [
      "estetica",
      "sexual-hormonal"
    ],
    "short_description": "Se estudia por su efecto sobre el pigmento de la piel.",
    "description": "Melanotan I, también llamado afamelanotida, imita una hormona que el cuerpo produce y que le indica a la piel que fabrique pigmento. Se estudia justamente en las células que hacen ese pigmento. Hay trabajo en laboratorio, en animales y también estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 939,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 939,
        "stock": 40,
        "batch_number": "NP-MELA10-2601",
        "id": "95db77c5-be8e-4dc8-8a72-4ab8d2161f90",
        "sku": "MELANOTANI-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/melanotan-i.pdf",
    "batch_number": "NP-MELA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 250,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de Melanotan II, que sí tiene protocolo publicado, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-melanotan-2",
    "name": "Melanotan II",
    "slug": "melanotan-2",
    "category": "estetica",
    "categories": [
      "estetica",
      "sexual-hormonal"
    ],
    "short_description": "Se estudia por su efecto sobre el pigmento de la piel.",
    "description": "Melanotan II es pariente cercano del Melanotan I y también imita la hormona que le pide a la piel fabricar pigmento, aunque toca más interruptores que aquél. Se estudia en las células del pigmento. Hay trabajo en laboratorio, en animales y estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 709,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 709,
        "stock": 40,
        "batch_number": "NP-MT210-2601",
        "id": "3a2d63d3-e84a-4892-be29-2f776fdd8491",
        "sku": "MELANOTANII-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/melanotan-2.pdf",
    "batch_number": "NP-MT210-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 250,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "agua_ml": {
        "10": 2.5
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-mic-lipo-c-b12",
    "name": "MIC (Lipo-C + B12)",
    "slug": "mic-lipo-c-b12",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso",
      "stacks"
    ],
    "short_description": "Mezcla de metionina, inositol, colina y vitamina B12.",
    "description": "MIC no es un péptido: es una mezcla de tres sustancias muy conocidas —metionina, inositol y colina— a las que se añade vitamina B12. Se estudia en el manejo de las grasas por parte del hígado. Los tres primeros ingredientes están en la comida de todos los días. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1579,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1579,
        "stock": 40,
        "batch_number": "NP-MICL10-2601",
        "id": "391fa2fe-a5cf-413b-b16a-a14660de474a",
        "sku": "MICLIPOCB12-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/mic-lipo-c-b12.pdf",
    "batch_number": "NP-MICL10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 500,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 500,
      "tipica": 1000,
      "avanzada": 1500,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros."
    },
    "featured": false,
    "is_new": false,
    "start_freq": "3x_week"
  },
  {
    "id": "fallback-oxitocina",
    "name": "Oxitocina",
    "slug": "oxitocina",
    "category": "sexual-hormonal",
    "categories": [
      "sexual-hormonal"
    ],
    "short_description": "Hormona muy conocida, estudiada en el vínculo y la confianza.",
    "description": "La oxitocina es una hormona pequeña, de nueve aminoácidos, que el propio cuerpo fabrica. Se le conoce por su papel en el vínculo entre las personas y en el parto. Se estudia en laboratorio, en animales y en personas; es de las hormonas con más literatura publicada. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 779,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 779,
        "stock": 40,
        "batch_number": "NP-OXY2-2601",
        "id": "9f3357cc-0898-4cd8-a49e-5ff30b86369b",
        "sku": "OXITOCINA-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 829,
        "stock": 40,
        "batch_number": "NP-OXY5-2601",
        "id": "17bc65bf-139d-40c8-86a5-acdce12edd60",
        "sku": "OXITOCINA-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 859,
        "stock": 40,
        "batch_number": "NP-OXY10-2601",
        "id": "6f7eaffb-8997-4272-8178-04bc4efe13af",
        "sku": "OXITOCINA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/oxitocina.pdf",
    "batch_number": "NP-OXY2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 150,
      "avanzada": 200,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 2.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-p21",
    "name": "P21",
    "slug": "p21",
    "category": "nootropicos",
    "categories": [
      "nootropicos"
    ],
    "short_description": "Se estudia en la formación de neuronas nuevas.",
    "description": "P21 viene de un factor que el cuerpo usa para cuidar a las neuronas. Se estudia en el hipocampo, la zona del cerebro donde se forman neuronas nuevas y se guarda la memoria. El trabajo publicado es de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 4899,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 4899,
        "stock": 40,
        "batch_number": "NP-P215-2601",
        "id": "68d58d21-b0de-4389-810c-fb3881990691",
        "sku": "P21-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/p21.pdf",
    "batch_number": "NP-P215-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 300,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 300,
      "tipica": 500,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de Semax, el otro neuropéptido de la misma familia de uso, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-somatropina-hgh-191aa",
    "name": "Somatropina (HGH 191AA)",
    "slug": "somatropina-hgh-191aa",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Hormona de crecimiento humana completa, de 191 aminoácidos.",
    "description": "La somatropina es la hormona de crecimiento humana con su cadena completa de 191 aminoácidos, hecha en laboratorio pero idéntica a la del cuerpo. Es de los compuestos con más investigación publicada, en laboratorio, en animales y en personas. Se mide en unidades (IU), no en miligramos. Uso exclusivo en investigación (RUO).",
    "presentation": "10 IU – 15 IU",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 539,
    "variants": [
      {
        "presentation": "10 IU",
        "price": 539,
        "stock": 40,
        "batch_number": "NP-SOMA10-2601",
        "id": "508ca071-1eee-4b2a-a69e-7632160a2f18",
        "sku": "SOMATROPINAHGH-10IU",
        "descuentable": false
      },
      {
        "presentation": "12 IU",
        "price": 639,
        "stock": 40,
        "batch_number": "NP-SOMA12-2601",
        "id": "22d43665-3610-490a-bb73-6832b431619c",
        "sku": "SOMATROPINAHGH-12IU",
        "descuentable": false
      },
      {
        "presentation": "15 IU",
        "price": 779,
        "stock": 40,
        "batch_number": "NP-SOMA15-2601",
        "id": "ee8711a9-06a2-4a85-be1e-a5294b8729d5",
        "sku": "SOMATROPINAHGH-15IU",
        "descuentable": false
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/somatropina-hgh-191aa.pdf",
    "batch_number": "NP-SOMA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.3,
    "start_unit": "iu",
    "start_levels": {
      "inicial": 0.3,
      "tipica": 0.6,
      "avanzada": 0.9,
      "unit": "iu",
      "fuente": "Etiqueta aprobada de somatropina (Norditropin/FDA) para deficiencia de GH en adultos: 0.2 mg al día entre 23 y 60 años, 0.1 mg arriba de 60 y 0.3 mg en mujeres con estrógeno oral. Conversión usada: 1 mg = 3 UI. https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/021148s049lbl.pdf"
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-tesamorelina",
    "name": "Tesamorelina",
    "slug": "tesamorelina",
    "category": "hormona-crecimiento",
    "categories": [
      "hormona-crecimiento"
    ],
    "short_description": "Se estudia en la grasa del abdomen y la hormona de crecimiento.",
    "description": "Tesamorelina es una versión reforzada de la señal natural que pide hormona de crecimiento; el refuerzo la hace aguantar más antes de deshacerse. Se estudia en el manejo de las grasas y en la composición del cuerpo. Hay trabajo en laboratorio, en animales y estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1929,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1929,
        "stock": 40,
        "batch_number": "NP-TESA10-2601",
        "id": "864667b7-3027-48f6-a393-d28f163e4fd6",
        "sku": "TESAMORELINA-10MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 3829,
        "stock": 40,
        "batch_number": "NP-TESA20-2601",
        "id": "76a349e9-5e95-428d-8fd5-8fea9ee8cf01",
        "sku": "TESAMORELINA-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/tesamorelina.pdf",
    "batch_number": "NP-TESA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1,
      "tipica": 1.5,
      "avanzada": 2,
      "unit": "mg",
      "agua_ml": {
        "10": 3,
        "20": 3
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-vip",
    "name": "VIP",
    "slug": "vip",
    "category": "otros",
    "categories": [
      "otros"
    ],
    "short_description": "Se estudia en los vasos sanguíneos y en la inflamación.",
    "description": "VIP es un péptido de 28 aminoácidos que el cuerpo fabrica y que ayuda a que los vasos sanguíneos se abran. También participa en la respuesta de las defensas cuando hay inflamación. Se estudia en laboratorio, en animales y en personas; es una molécula bien conocida. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1499,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1499,
        "stock": 40,
        "batch_number": "NP-VIP5-2601",
        "id": "83a1728a-d9f9-45b9-a94a-fb2132a72db4",
        "sku": "VIP-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1569,
        "stock": 40,
        "batch_number": "NP-VIP10-2601",
        "id": "982833c9-b7e9-4504-b2cb-5be84ae9e3e8",
        "sku": "VIP-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/vip.pdf",
    "batch_number": "NP-VIP5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 150,
      "avanzada": 200,
      "unit": "mcg",
      "agua_ml": {
        "10": 2.5
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-5-amino-1mq",
    "name": "5-AMINO-1MQ",
    "slug": "5-amino-1mq",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Se estudia por su efecto en las células que almacenan grasa.",
    "description": "5-Amino-1MQ es una molécula pequeña, no un péptido. Se estudia porque frena una enzima que trabaja dentro de las células que almacenan grasa, y de paso influye en el NAD+, que es lo que la célula usa para producir energía. La investigación se ha hecho en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 50 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 949,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 949,
        "stock": 40,
        "batch_number": "NP-5AMI10-2601",
        "id": "e1a5f910-648a-4cc0-85ae-6f3911dfe05d",
        "sku": "5AMINO1MQ-10MG",
        "descuentable": true
      },
      {
        "presentation": "50 mg",
        "price": 2999,
        "stock": 40,
        "batch_number": "NP-5AMI50-2601",
        "id": "4f7de286-6f49-491d-ae36-059a5cd10db0",
        "sku": "5AMINO1MQ-50MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/5-amino-1mq.pdf",
    "batch_number": "NP-5AMI10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_levels": {
      "inicial": 1,
      "tipica": 2,
      "avanzada": 3,
      "unit": "mg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 2,
        "50": 2
      }
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-aicar",
    "name": "AICAR",
    "slug": "aicar",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Se estudia en cómo el músculo produce y gasta energía.",
    "description": "AICAR es una molécula pequeña, no un péptido. Se estudia porque enciende un interruptor que la célula usa cuando le falta energía, el mismo que se activa con el ejercicio. El trabajo se ha hecho en laboratorio y en animales, sobre todo en músculo. Uso exclusivo en investigación (RUO).",
    "presentation": "100 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1919,
    "variants": [
      {
        "presentation": "100 mg",
        "price": 1919,
        "stock": 40,
        "batch_number": "NP-AICA100-2601",
        "id": "392e8fbc-cb08-4a63-bed4-b3b59711de9d",
        "sku": "AICAR-100MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/aicar.pdf",
    "batch_number": "NP-AICA100-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 10,
    "start_unit": "mg",
    "start_levels": {
      "inicial": 10,
      "tipica": 25,
      "avanzada": 50,
      "unit": "mg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado; su identidad tampoco es única, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-aod-9604",
    "name": "AOD-9604",
    "slug": "aod-9604",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Trozo modificado de la hormona de crecimiento, visto en la grasa.",
    "description": "AOD-9604 es un pedacito de la hormona de crecimiento al que se le hizo un cambio en laboratorio. Se estudia por su efecto sobre las células que guardan la grasa, sin arrastrar los demás efectos de la hormona entera. Hay trabajo en laboratorio, en animales y también estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 949,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 949,
        "stock": 40,
        "batch_number": "NP-AOD95-2601",
        "id": "9b73c607-b922-45fe-bc94-c7e9c5979048",
        "sku": "AOD9604-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1889,
        "stock": 40,
        "batch_number": "NP-AOD910-2601",
        "id": "ea123747-3255-47ab-8c5b-4e764d080dd4",
        "sku": "AOD9604-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/aod-9604.pdf",
    "batch_number": "NP-AOD95-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 300,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 300,
      "tipica": 400,
      "avanzada": 500,
      "unit": "mcg",
      "agua_ml": {
        "5": 2.5
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cagri-sema-2-5mg-2-5mg",
    "name": "Cagri + Sema (2.5mg + 2.5mg)",
    "slug": "cagri-sema-2-5mg-2-5mg",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso",
      "stacks"
    ],
    "short_description": "Cagrilintida y semaglutida juntas en un mismo vial.",
    "description": "Este vial trae dos péptidos juntos: cagrilintida y semaglutida. Cada uno imita una señal distinta de las que el cuerpo usa para avisar que ya comió, y por eso se estudian en pareja. Los dos por separado tienen estudios en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 879,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 879,
        "stock": 40,
        "batch_number": "NP-CAGR5-2601",
        "id": "b49a28cd-4785-477f-a90b-1ede5ce790dc",
        "sku": "CAGRISEMA25MG2-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cagri-sema-2-5mg-2-5mg.pdf",
    "batch_number": "NP-CAGR5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.25,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 0.25,
      "tipica": 0.5,
      "avanzada": 1,
      "unit": "mg",
      "fuente": "Derivado de sus componentes, que sí tienen fuente propia en este mismo catálogo. No hay un ensayo de ESTA combinación exacta: se toma la dosis de cada compuesto por separado.",
      "agua_ml": {
        "5": 1
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-cagrilintida",
    "name": "Cagrilintida",
    "slug": "cagrilintida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Se estudia por la señal de saciedad que imita.",
    "description": "Cagrilintida imita a la amilina, una hormona que el páncreas suelta junto con la insulina para avisar de que ya se comió. Está hecha para durar más que la original. Se estudia en la saciedad y en la composición del cuerpo, con trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 879,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 879,
        "stock": 40,
        "batch_number": "NP-CAGR2-2601",
        "id": "877331cf-3284-4117-973a-7440936badd9",
        "sku": "CAGRILINTIDA-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-CAGR5-2601",
        "id": "1e9b01d9-04f6-4a9d-9abd-41cd6e2da48a",
        "sku": "CAGRILINTIDA-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 2229,
        "stock": 40,
        "batch_number": "NP-CAGR10-2601",
        "id": "0a87407d-f81b-44d8-b5f1-c5a13fe06b87",
        "sku": "CAGRILINTIDA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cagrilintida.pdf",
    "batch_number": "NP-CAGR2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.6,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 0.6,
      "tipica": 1.2,
      "avanzada": 1.8,
      "unit": "mg",
      "agua_ml": {
        "2": 1,
        "5": 1,
        "10": 2
      },
      "fuente": "⚠️ ORIENTATIVA. Registro del ensayo humano de cagrilintida (https://www.clinicaltrialsregister.eu/ctr-search/trial/2018-001945-14/results — calidad A, 26 semanas, subcutánea semanal): escalona 0.6 mg la semana 0, 1.2 mg la semana 2, 2.4 mg la semana 4 y 4.5 mg la semana 6. Los niveles inicial y típico son los dos primeros escalones publicados, exactos. CORRECCIÓN 2026-07-31: antes decían 0.2 / 1.2 / 2.7 mg salidos de una hoja de vendedor (researchdosing.com); los 2.7 mg NO CABEN en el vial de 2 mg y el arranque de 0.2 mg estaba tres veces por debajo del ensayo. El nivel avanzado se topa en 1.8 mg —dentro del rango que recorre el ensayo, pero por debajo del escalón de 2.4 mg— porque 2.4 mg ya no caben en el vial de 2 mg. Los escalones de 2.4 y 4.5 mg del ensayo exigen los viales de 5 o 10 mg y criterio médico."
    },
    "featured": false,
    "is_new": true
  },
  {
    "id": "fallback-dulaglutida",
    "name": "Dulaglutida",
    "slug": "dulaglutida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Imita la señal de saciedad y dura una semana entera.",
    "description": "Dulaglutida imita el GLP-1, la señal que el intestino manda al cerebro cuando se ha comido. Va pegada a un trozo de anticuerpo, y eso hace que aguante toda una semana. Se estudia en el manejo del azúcar en sangre; es de los compuestos más investigados de su grupo, también en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 4159,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 4159,
        "stock": 40,
        "batch_number": "NP-DULA10-2601",
        "id": "11daa5fa-ed8b-4393-9650-7eee681e952e",
        "sku": "DULAGLUTIDA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/dulaglutida.pdf",
    "batch_number": "NP-DULA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.75,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 0.75,
      "tipica": 1.5,
      "avanzada": 4.5,
      "unit": "mg",
      "fuente": "Etiqueta aprobada de Trulicity (dulaglutida) — FDA: 0.75 mg por semana; se sube a 1.5 mg tras 4 semanas y de 1.5 en 1.5 hasta un máximo de 4.5 mg. https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/125469s051lbl.pdf",
      "agua_ml": {
        "5": 1,
        "10": 2
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-l-carnitine",
    "name": "L-Carnitine",
    "slug": "l-carnitine",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Lleva las grasas hasta donde la célula las quema.",
    "description": "La L-carnitina es una sustancia muy conocida que el cuerpo fabrica y que también está en la carne. Su trabajo es llevar las grasas hasta la mitocondria, la parte de la célula donde se queman para dar energía. Se ha estudiado muchísimo, en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 1200 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 519,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 519,
        "stock": 40,
        "batch_number": "NP-LCAR2-2601",
        "id": "1b1fc934-0126-414b-abff-43996874076a",
        "sku": "LCARNITINE-2MG",
        "descuentable": true
      },
      {
        "presentation": "400 mg",
        "price": 879,
        "stock": 40,
        "batch_number": "NP-LCAR400-2601",
        "id": "83b887a0-7bdd-4fbd-96bc-cd920e268a18",
        "sku": "LCARNITINE-400MG",
        "descuentable": true
      },
      {
        "presentation": "600 mg",
        "price": 959,
        "stock": 40,
        "batch_number": "NP-LCAR600-2601",
        "id": "79ad3e2c-ff01-42ba-ab42-0b6d4c9444d9",
        "sku": "LCARNITINE-600MG",
        "descuentable": true
      },
      {
        "presentation": "1200 mg",
        "price": 1049,
        "stock": 40,
        "batch_number": "NP-LCAR1200-2601",
        "id": "e15cb83b-ccf8-4065-ae95-451375f2074b",
        "sku": "LCARNITINE-1200MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/l-carnitine.pdf",
    "batch_number": "NP-LCAR2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_freq": null,
    "start_levels": {
      "apagada": "APAGADA el 2026-07-31. Mostrábamos 50 / 100 / 200 mg diarios con el agua anotada para un vial de 500 mg que NO vendemos (nuestras presentaciones son 2, 400, 600 y 1200 mg). En el vial de 2 mg esos niveles pedían 25, 50 y 100 VECES lo que trae el vial entero: era el peor caso de todo el catálogo. La única fuente que teníamos era researchdosing.com, una hoja de vendedor sin bibliografía. La revisión con búsqueda web (2026-07-31) no localizó NINGUNA pauta humana intramuscular de L-carnitina: la etiqueta IM que existe es de un preparado de farmacia no aprobado y no publica dosis, y la presentación aprobada por la FDA es sólo intravenosa. Regla de la casa: sin fuente, no se muestra dosis. La calculadora sigue convirtiendo la dosis que el cliente escriba. ⚠️ Aparte: la presentación de 2 mg parece un error de catálogo — la L-carnitina se dosifica en cientos de miligramos y un vial de 2 mg no tiene uso plausible."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-lipo-c",
    "name": "LIPO-C",
    "slug": "lipo-c",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Solución con metionina, inositol y colina, lista para usar.",
    "description": "LIPO-C no es un péptido: es una solución que mezcla metionina, inositol y colina, tres sustancias que están en la comida de todos los días. Se estudia en el manejo de las grasas por parte del hígado. Viene lista en frasco de 10 mL, no en polvo. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mL",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 999,
    "variants": [
      {
        "presentation": "10 mL",
        "price": 999,
        "stock": 40,
        "batch_number": "NP-LIPO10-2601",
        "id": "7f531a25-6823-4f09-a240-f9a93ffe42b3",
        "sku": "LIPOC-10ML",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/lipo-c.pdf",
    "batch_number": "NP-LIPO10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 500,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 500,
      "tipica": 1000,
      "avanzada": 1500,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados."
    },
    "featured": false,
    "is_new": false,
    "start_freq": "3x_week"
  },
  {
    "id": "fallback-liraglutida",
    "name": "Liraglutida",
    "slug": "liraglutida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Imita la señal de saciedad; se estudia desde hace muchos años.",
    "description": "Liraglutida imita el GLP-1, la señal que el intestino manda al cerebro cuando ya se comió. Lleva un ácido graso pegado que la hace agarrarse a una proteína de la sangre y durar cerca de un día. Es de las más estudiadas de su grupo: laboratorio, animales y muchas personas. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 30 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1859,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1859,
        "stock": 40,
        "batch_number": "NP-LIRA5-2601",
        "id": "17627817-0556-4a5c-8eb0-c5aa090d512a",
        "sku": "LIRAGLUTIDA-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 2399,
        "stock": 40,
        "batch_number": "NP-LIRA10-2601",
        "id": "23b7dd6b-35ca-4490-a0ad-031bf35eeb08",
        "sku": "LIRAGLUTIDA-10MG",
        "descuentable": true
      },
      {
        "presentation": "30 mg",
        "price": 3959,
        "stock": 40,
        "batch_number": "NP-LIRA30-2601",
        "id": "2587dfe1-7cc1-4939-9edd-a3f6e83231e7",
        "sku": "LIRAGLUTIDA-30MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/liraglutida.pdf",
    "batch_number": "NP-LIRA5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.6,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 0.6,
      "tipica": 1.8,
      "avanzada": 3,
      "unit": "mg",
      "fuente": "Etiqueta aprobada de Saxenda (liraglutida) — DailyMed/FDA: 0.6 mg al día la primera semana y se sube 0.6 mg cada semana hasta 3 mg. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3946d389-0926-4f77-a708-0acb8153b143",
      "agua_ml": {
        "5": 1,
        "10": 2
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-mots-c",
    "name": "MOTS-c",
    "slug": "mots-c",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Se estudia por su papel en la energía del cuerpo.",
    "description": "MOTS-c es un péptido poco común: no viene del ADN del núcleo, sino del de las mitocondrias, que son las centrales de energía de la célula. Se estudia por cómo el cuerpo administra esa energía. Hay bastante trabajo en laboratorio y en animales, y estudios más recientes en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 40 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 769,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 769,
        "stock": 40,
        "batch_number": "NP-MOTS10-2601",
        "id": "de77919d-830a-4e45-abc2-0977f46b7d30",
        "sku": "MOTSC-10MG",
        "descuentable": true
      },
      {
        "presentation": "15 mg",
        "price": 1059,
        "stock": 40,
        "batch_number": "NP-MOTS15-2601",
        "id": "9e336d64-8af3-4991-ac30-fafb9f736bf2",
        "sku": "MOTSC-15MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 1099,
        "stock": 40,
        "batch_number": "NP-MOTS20-2601",
        "id": "f878af32-45f7-4b6b-82da-52b985ac90ed",
        "sku": "MOTSC-20MG",
        "descuentable": true
      },
      {
        "presentation": "40 mg",
        "price": 2309,
        "stock": 40,
        "batch_number": "NP-MOTS40-2601",
        "id": "befcc9bf-0e3d-4a19-a5ca-9ec4512d1a16",
        "sku": "MOTSC-40MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/mots-c.pdf",
    "batch_number": "NP-MOTS10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 3,
    "start_unit": "mg",
    "start_freq": "2x_week",
    "start_levels": {
      "inicial": 3,
      "tipica": 5,
      "avanzada": 5,
      "unit": "mg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 1.5,
        "20": 3,
        "40": 5
      }
    },
    "featured": false,
    "is_new": true
  },
  {
    "id": "fallback-retatrutida",
    "name": "Retatrutida",
    "slug": "retatrutida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Imita tres señales del cuerpo a la vez; muy estudiada hoy.",
    "description": "Retatrutida es un péptido que imita al mismo tiempo tres señales que el cuerpo usa para avisar que comió y para mover sus reservas. Es de los compuestos que más se están investigando ahora mismo en el terreno del metabolismo, con estudios en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 100 mg",
    "form": "Liofilizado",
    "purity": "99.1%",
    "price": 2489,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 2489,
        "stock": 40,
        "batch_number": "NP-RETA10-2601",
        "id": "3562d760-400f-43a3-aab3-7244a0e7c9e3",
        "sku": "RETATRUTIDA-10MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 3119,
        "stock": 40,
        "batch_number": "NP-RETA20-2601",
        "id": "f4bedb15-ffc1-456d-9650-73cffcffdcd9",
        "sku": "RETATRUTIDA-20MG",
        "descuentable": true
      },
      {
        "presentation": "30 mg",
        "price": 4299,
        "stock": 40,
        "batch_number": "NP-RETA30-2601",
        "id": "bd812705-201e-4aef-ade6-af23d6116b36",
        "sku": "RETATRUTIDA-30MG",
        "descuentable": true
      },
      {
        "presentation": "40 mg",
        "price": 4309,
        "stock": 40,
        "batch_number": "NP-RETA40-2601",
        "id": "cc984cce-c589-4e80-861a-ba6b98e7ad3e",
        "sku": "RETATRUTIDA-40MG",
        "descuentable": true
      },
      {
        "presentation": "60 mg",
        "price": 5429,
        "stock": 40,
        "batch_number": "NP-RETA60-2601",
        "id": "954a6dc4-dce9-4fdd-8581-e283ad37e6b5",
        "sku": "RETATRUTIDA-60MG",
        "descuentable": true
      },
      {
        "presentation": "100 mg",
        "price": 7679,
        "stock": 40,
        "batch_number": "NP-RETA100-2601",
        "id": "ee5729da-dadf-4ff2-aa0b-7e8abdb072b4",
        "sku": "RETATRUTIDA-100MG",
        "descuentable": true
      },
      {
        "presentation": "120 mg",
        "price": 7899,
        "stock": 0,
        "batch_number": "",
        "id": "dd7edd66-8bc2-48d7-af12-1e854685cab1",
        "sku": "RETATRUTIDA-120MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/retatrutida.pdf",
    "batch_number": "NP-RETA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 2,
      "tipica": 4,
      "avanzada": 8,
      "unit": "mg",
      "agua_ml": {
        "5": 0.5,
        "10": 1,
        "15": 1.5,
        "20": 2,
        "30": 3,
        "40": 4
      },
      "fuente": "Ensayo Fase 2 en obesidad (1, 4, 8 y 12 mg semanales): Jastreboff AM et al., N Engl J Med 2023;389(6):514-526 (PMID 37366315) · registro NCT04881760 en clinicaltrials.gov",
      "titulacion": [
        {
          "quien": "Ensayo Fase 2 (NEJM 2023 · NCT04881760)",
          "dice": "Los grupos que llegaron a 8 y 12 mg no empezaron ahí: arrancaron en 2 mg y subieron por escalones 2 → 4 → 8 → 12 mg, una vez por semana. El registro describe los escalones; no publica cuántas semanas se queda uno en cada uno."
        },
        {
          "quien": "researchdosing.com (manual compartido entre vendedores)",
          "dice": "Mínimo 4 semanas en cada dosis y subir de 2 en 2 mg.",
          "aviso": "No cita bibliografía, y sus tablas de unidades traen errores de aritmética comprobados. Es la costumbre del mercado, no evidencia."
        }
      ]
    },
    "featured": true,
    "is_new": true
  },
  {
    "id": "fallback-retatrutide-20mg-tirzepatide-40mg",
    "name": "Retatrutide 20mg + Tirzepatide 40mg",
    "slug": "retatrutide-20mg-tirzepatide-40mg",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso",
      "stacks"
    ],
    "short_description": "Retatrutida y tirzepatida juntas en un mismo vial.",
    "description": "Este vial trae dos péptidos juntos: retatrutida y tirzepatida. Los dos imitan señales que el cuerpo usa para avisar que ya comió, sólo que la retatrutida cubre tres y la tirzepatida dos. Cada uno por separado tiene estudios en personas; la combinación en un mismo vial se ha estudiado poco. Uso exclusivo en investigación (RUO).",
    "presentation": "60 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 3679,
    "variants": [
      {
        "presentation": "60 mg",
        "price": 3679,
        "stock": 40,
        "batch_number": "NP-RETA60-2601",
        "id": "7efbf57b-7f8d-43c7-a058-8e07b0c64de1",
        "sku": "RETATRUTIDE20M-60MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/retatrutide-20mg-tirzepatide-40mg.pdf",
    "batch_number": "NP-RETA60-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 2,
      "tipica": 4,
      "avanzada": 8,
      "unit": "mg",
      "fuente": "Derivado de sus componentes, que sí tienen fuente propia en este mismo catálogo. No hay un ensayo de ESTA combinación exacta: se toma la dosis de cada compuesto por separado.",
      "agua_ml": {
        "60": 3
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-semaglutida",
    "name": "Semaglutida",
    "slug": "semaglutida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Imita la señal que avisa al cerebro de que ya se comió.",
    "description": "Semaglutida imita el GLP-1, una señal que el intestino manda al cerebro cuando ya se comió. Está hecha para durar cerca de una semana, en vez de los minutos que dura la señal original. Es de los péptidos más estudiados que hay: laboratorio, animales y muchísimas personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 50 mg",
    "form": "Liofilizado",
    "purity": "99.1%",
    "price": 1079,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 1079,
        "stock": 40,
        "batch_number": "NP-SEMA2-2601",
        "id": "3d44f41f-e3d1-422f-a6a6-ee6984bfa635",
        "sku": "SEMAGLUTIDA-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-SEMA5-2601",
        "id": "3bc388e8-4498-4aeb-a3da-40fc915dcef3",
        "sku": "SEMAGLUTIDA-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1849,
        "stock": 40,
        "batch_number": "NP-SEMA10-2601",
        "id": "fa9def3b-7709-4b56-98f4-ffe83b0a58a9",
        "sku": "SEMAGLUTIDA-10MG",
        "descuentable": true
      },
      {
        "presentation": "15 mg",
        "price": 1859,
        "stock": 40,
        "batch_number": "NP-SEMA15-2601",
        "id": "16deb2af-234b-4de8-a968-44aef1fdb929",
        "sku": "SEMAGLUTIDA-15MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 2039,
        "stock": 40,
        "batch_number": "NP-SEMA20-2601",
        "id": "7fdfe542-f6f6-46c6-97f4-1bec48fdbdac",
        "sku": "SEMAGLUTIDA-20MG",
        "descuentable": true
      },
      {
        "presentation": "30 mg",
        "price": 2119,
        "stock": 40,
        "batch_number": "NP-SEMA30-2601",
        "id": "641f267f-9618-418f-90cc-2b2aa9932d2f",
        "sku": "SEMAGLUTIDA-30MG",
        "descuentable": true
      },
      {
        "presentation": "50 mg",
        "price": 2189,
        "stock": 40,
        "batch_number": "NP-SEMA50-2601",
        "id": "40e13576-9c1c-44bf-85bb-e6b9926bbbaf",
        "sku": "SEMAGLUTIDA-50MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/semaglutida.pdf",
    "batch_number": "NP-SEMA2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.25,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 0.25,
      "tipica": 0.5,
      "avanzada": 1,
      "unit": "mg",
      "agua_ml": {
        "5": 1,
        "10": 2
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": true,
    "is_new": false
  },
  {
    "id": "fallback-slu-pp-332",
    "name": "SLU-PP-332",
    "slug": "slu-pp-332",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Se estudia como si imitara el efecto del ejercicio.",
    "description": "SLU-PP-332 es una molécula pequeña, no un péptido. Se estudia porque enciende en el músculo unos interruptores parecidos a los que activa el ejercicio, y por eso se le llama mimético del ejercicio. Los trabajos publicados son de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1139,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1139,
        "stock": 40,
        "batch_number": "NP-SLUP5-2601",
        "id": "0d0c6a06-f74b-4c09-8aa2-5f06c0257343",
        "sku": "SLUPP332-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/slu-pp-332.pdf",
    "batch_number": "NP-SLUP5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1.25,
    "start_unit": "mg",
    "start_levels": {
      "inicial": 1.25,
      "tipica": 2,
      "avanzada": 2.5,
      "unit": "mg",
      "fuente": "⚠️ ORIENTATIVA. researchdosing.com — manual de dosificación del mercado (hoja de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados. ⚠️ Esta fuente lo reconstituye con agua bacteriostática MÁS DMSO, no solo agua. CORRECCIÓN 2026-07-31: el agua estaba anotada para un vial de 10 mg que NO vendemos (nuestra única presentación es de 5 mg), así que la calculadora nunca leía el dato investigado. Se corrige a 1 mL para el vial de 5 mg: quedan 5 mg/mL y los tres niveles caen en 25, 40 y 50 rayitas.",
      "agua_ml": {
        "5": 1
      }
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-survodutide",
    "name": "Survodutide",
    "slug": "survodutide",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Imita dos señales del cuerpo a la vez.",
    "description": "Survodutide es un péptido que imita dos señales que el cuerpo usa: la que avisa que ya comió y la que manda sacar reservas de energía. Se estudia en el gasto de energía, en el hígado y en la composición del cuerpo, con trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 4799,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 4799,
        "stock": 40,
        "batch_number": "NP-SURV10-2601",
        "id": "25142e73-bfa6-4e85-bf86-da5251bc8d06",
        "sku": "SURVODUTIDE-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/survodutide.pdf",
    "batch_number": "NP-SURV10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.8,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 0.8,
      "tipica": 1.6,
      "avanzada": 2.4,
      "unit": "mg",
      "agua_ml": {
        "10": 1.5
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-tirzepatida",
    "name": "Tirzepatida",
    "slug": "tirzepatida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Imita dos señales de saciedad en lugar de una.",
    "description": "Tirzepatida imita dos señales que el intestino manda al cerebro después de comer, no una sola. Está hecha para durar cerca de una semana. Se estudia en el manejo del azúcar en sangre y en la composición del cuerpo; hay muchísimos estudios en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg – 120 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2129,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 2129,
        "stock": 40,
        "batch_number": "NP-TIRZ10-2601",
        "id": "289d914f-67f2-472d-83c1-3809dc0ee225",
        "sku": "TIRZEPATIDA-10MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 2189,
        "stock": 40,
        "batch_number": "NP-TIRZ20-2601",
        "id": "e7856e6b-dcee-4a94-8126-2528113cf4d5",
        "sku": "TIRZEPATIDA-20MG",
        "descuentable": true
      },
      {
        "presentation": "30 mg",
        "price": 3089,
        "stock": 40,
        "batch_number": "NP-TIRZ30-2601",
        "id": "e5c68138-7652-4036-91c9-8c51f8c379f6",
        "sku": "TIRZEPATIDA-30MG",
        "descuentable": true
      },
      {
        "presentation": "40 mg",
        "price": 3169,
        "stock": 40,
        "batch_number": "NP-TIRZ40-2601",
        "id": "c5e91908-e427-4af6-b631-b33ae4846c61",
        "sku": "TIRZEPATIDA-40MG",
        "descuentable": true
      },
      {
        "presentation": "50 mg",
        "price": 3269,
        "stock": 40,
        "batch_number": "NP-TIRZ50-2601",
        "id": "e94e4156-f26e-40b8-aecc-a5cd1583a3a1",
        "sku": "TIRZEPATIDA-50MG",
        "descuentable": true
      },
      {
        "presentation": "60 mg",
        "price": 3919,
        "stock": 40,
        "batch_number": "NP-TIRZ60-2601",
        "id": "0169ea33-313d-49c8-9681-866f55f854f7",
        "sku": "TIRZEPATIDA-60MG",
        "descuentable": true
      },
      {
        "presentation": "100 mg",
        "price": 4079,
        "stock": 40,
        "batch_number": "NP-TIRZ100-2601",
        "id": "fcd44c95-cc87-439f-aa1c-daa14c7202cd",
        "sku": "TIRZEPATIDA-100MG",
        "descuentable": true
      },
      {
        "presentation": "120 mg",
        "price": 4889,
        "stock": 40,
        "batch_number": "NP-TIRZ120-2601",
        "id": "0f8e3f1e-8bc1-413e-aeca-07b16352410a",
        "sku": "TIRZEPATIDA-120MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/tirzepatida.pdf",
    "batch_number": "NP-TIRZ10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2.5,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 2.5,
      "tipica": 5,
      "avanzada": 10,
      "unit": "mg",
      "agua_ml": {
        "10": 0.5,
        "30": 1.5,
        "60": 3
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": true,
    "is_new": true
  },
  {
    "id": "fallback-ara-290",
    "name": "ARA-290",
    "slug": "ara-290",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Se estudia en los nervios pequeños y en la inflamación.",
    "description": "ARA-290, también llamado cibinetide, es un trocito de la eritropoyetina al que se le quitó la parte que fabrica glóbulos rojos: queda sólo la que se relaciona con la reparación. Se estudia en los nervios pequeños y en la inflamación de los tejidos, con trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "16 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1739,
    "variants": [
      {
        "presentation": "16 mg",
        "price": 1739,
        "stock": 40,
        "batch_number": "NP-ARA216-2601",
        "id": "582df66d-c396-44e1-994a-adf34e693203",
        "sku": "ARA290-16MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ara-290.pdf",
    "batch_number": "NP-ARA216-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 2,
      "tipica": 3,
      "avanzada": 4,
      "unit": "mg",
      "agua_ml": {
        "10": 1.5
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-bpc-157",
    "name": "BPC-157",
    "slug": "bpc-157",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Se estudia en la reparación de tejidos y del estómago.",
    "description": "BPC-157 es un péptido corto que viene de una proteína del jugo gástrico. Es de los más estudiados de todo el catálogo: hay cientos de trabajos, sobre todo en animales, mirando tendones, músculo, intestino y estómago. La investigación en personas es mucho menor. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 20 mg",
    "form": "Liofilizado",
    "purity": "99.4%",
    "price": 519,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 519,
        "stock": 40,
        "batch_number": "NP-BPC2-2601",
        "id": "9ba48165-7a02-473c-a089-6a9a09af5da1",
        "sku": "BPC157-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 839,
        "stock": 40,
        "batch_number": "NP-BPC5-2601",
        "id": "db5309f7-6dde-4c26-9384-016fb7e43792",
        "sku": "BPC157-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1109,
        "stock": 40,
        "batch_number": "NP-BPC10-2601",
        "id": "97721d83-199c-4fa6-84c4-b25ada733ca3",
        "sku": "BPC157-10MG",
        "descuentable": true
      },
      {
        "presentation": "20 mg",
        "price": 1429,
        "stock": 40,
        "batch_number": "NP-BPC20-2601",
        "id": "d390e21b-2ac7-45e9-9520-ae0d8e807527",
        "sku": "BPC157-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/bpc-157.pdf",
    "batch_number": "NP-BPC2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 250,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 250,
      "tipica": 500,
      "avanzada": 750,
      "unit": "mcg",
      "agua_ml": {
        "5": 1.5,
        "10": 2.5
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": true,
    "is_new": false
  },
  {
    "id": "fallback-bpc-157-10mg-tb-500-10mg",
    "name": "BPC-157 10mg + TB-500 10mg",
    "slug": "bpc-157-10mg-tb-500-10mg",
    "category": "recuperacion",
    "categories": [
      "recuperacion",
      "stacks"
    ],
    "short_description": "BPC-157 y TB-500 juntos, la pareja clásica de reparación.",
    "description": "Este vial trae los dos péptidos que más se estudian juntos en reparación de tejidos: BPC-157 y TB-500. Los dos aparecen en trabajos sobre formación de vasos nuevos, movimiento de las células y remodelado del tejido. La mayor parte de esa investigación es en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1759,
    "variants": [
      {
        "presentation": "20 mg",
        "price": 1759,
        "stock": 40,
        "batch_number": "NP-BPC120-2601",
        "id": "457f70ba-93dc-4290-982d-0ed4e679fb41",
        "sku": "BPC15710MGTB50-20MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/bpc-157-10mg-tb-500-10mg.pdf",
    "batch_number": "NP-BPC120-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 600,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 600,
      "tipica": 800,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "20": 2
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-bpc-157-5mg-tb-500-5mg",
    "name": "BPC-157 5mg + TB-500 5mg",
    "slug": "bpc-157-5mg-tb-500-5mg",
    "category": "recuperacion",
    "categories": [
      "recuperacion",
      "stacks"
    ],
    "short_description": "La misma pareja BPC-157 y TB-500, en tamaño menor.",
    "description": "Es la presentación más pequeña de la pareja clásica: BPC-157 y TB-500 en un mismo vial. Los dos se estudian en cicatrización, formación de vasos nuevos y remodelado de tendón, músculo y mucosa del intestino. La mayor parte del trabajo publicado es en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1669,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1669,
        "stock": 40,
        "batch_number": "NP-BPC110-2601",
        "id": "504f28a3-aad1-45eb-8c5b-5606f8ab0a58",
        "sku": "BPC1575MGTB500-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/bpc-157-5mg-tb-500-5mg.pdf",
    "batch_number": "NP-BPC110-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 600,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 600,
      "tipica": 800,
      "avanzada": 1000,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "10": 2
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-follistatin",
    "name": "Follistatin",
    "slug": "follistatin",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Se estudia porque frena al freno natural del músculo.",
    "description": "La folistatina es una proteína que el cuerpo fabrica y que se engancha a la miostatina, que es la señal encargada de frenar el crecimiento del músculo. Por eso se estudia en el músculo esquelético. Hay bastante trabajo en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "1 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 4019,
    "variants": [
      {
        "presentation": "1 mg",
        "price": 4019,
        "stock": 40,
        "batch_number": "NP-FOLL1-2601",
        "id": "8361b994-45e4-488a-8ff3-110b5e24a031",
        "sku": "FOLLISTATIN-1MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/follistatin.pdf",
    "batch_number": "NP-FOLL1-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado para inhibidores de miostatina, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-gdf-8",
    "name": "GDF-8",
    "slug": "gdf-8",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Es la miostatina, el freno natural del crecimiento muscular.",
    "description": "GDF-8 es el nombre técnico de la miostatina, la señal que el propio cuerpo usa para frenar el crecimiento del músculo. Se estudia justo por eso: para entender cómo el organismo pone ese límite. El trabajo publicado es de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "1 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2889,
    "variants": [
      {
        "presentation": "1 mg",
        "price": 2889,
        "stock": 40,
        "batch_number": "NP-GDF81-2601",
        "id": "a1fb6f1e-cd1f-4807-a4ab-72b9dfaa7615",
        "sku": "GDF8-1MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/gdf-8.pdf",
    "batch_number": "NP-GDF81-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de Follistatin, con la que comparte la vía de la miostatina, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg",
    "name": "GLOW (BPC-157 10mg + GHK-Cu 50mg + TB-500 10mg)",
    "slug": "glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg",
    "category": "recuperacion",
    "categories": [
      "recuperacion",
      "stacks"
    ],
    "short_description": "Tres péptidos de reparación y piel en un mismo vial.",
    "description": "GLOW junta tres péptidos en un solo vial: BPC-157, GHK-Cu y TB-500. Los tres aparecen en trabajos sobre reparación de tejido, formación de vasos nuevos y la estructura que sostiene la piel. Cada uno tiene su propia literatura, casi toda de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "70 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2229,
    "variants": [
      {
        "presentation": "70 mg",
        "price": 2229,
        "stock": 40,
        "batch_number": "NP-GLOW70-2601",
        "id": "e1059e7b-e38e-4fd2-89f9-c0a5e6b7a0f1",
        "sku": "GLOWBPC15710MG-70MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg.pdf",
    "batch_number": "NP-GLOW70-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1.4,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 1.4,
      "tipica": 2,
      "avanzada": 2.8,
      "unit": "mg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "70": 2.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-klow-bpc-ghk-cu-tb-500-kpv",
    "name": "KLOW (BPC + GHK-Cu + TB-500 + KPV)",
    "slug": "klow-bpc-ghk-cu-tb-500-kpv",
    "category": "recuperacion",
    "categories": [
      "recuperacion",
      "stacks"
    ],
    "short_description": "Cuatro péptidos de reparación en un mismo vial.",
    "description": "KLOW junta cuatro péptidos: BPC-157, GHK-Cu, TB-500 y KPV. Los tres primeros aparecen en trabajos de reparación de tejido y de la estructura que sostiene la piel; el KPV se estudia en la respuesta inflamatoria. Cada uno tiene su propia literatura, casi toda de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "80 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2869,
    "variants": [
      {
        "presentation": "80 mg",
        "price": 2869,
        "stock": 40,
        "batch_number": "NP-KLOW80-2601",
        "id": "b09d7657-085a-4777-9271-dc440496fce9",
        "sku": "KLOWBPCGHKCUTB-80MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/klow-bpc-ghk-cu-tb-500-kpv.pdf",
    "batch_number": "NP-KLOW80-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2.5,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 2.5,
      "tipica": 2.9,
      "avanzada": 3.2,
      "unit": "mg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "80": 2.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-kpv",
    "name": "KPV",
    "slug": "kpv",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Se estudia en la inflamación del intestino y de la piel.",
    "description": "KPV es un péptido de apenas tres aminoácidos: es el trocito final de una hormona que el cuerpo ya produce. Se estudia en la respuesta inflamatoria, sobre todo en el intestino y en la piel. El trabajo publicado es de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1319,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-KPV5-2601",
        "id": "91b44b60-1d92-46fe-bf55-2998498f9df6",
        "sku": "KPV-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1389,
        "stock": 40,
        "batch_number": "NP-KPV10-2601",
        "id": "a8512d3a-97fa-4100-913d-ea253780eff7",
        "sku": "KPV-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/kpv.pdf",
    "batch_number": "NP-KPV5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 200,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 200,
      "tipica": 400,
      "avanzada": 1000,
      "unit": "mcg",
      "agua_ml": {
        "10": 2.5
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-ll-37",
    "name": "LL-37",
    "slug": "ll-37",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Es la defensa natural del cuerpo contra microbios.",
    "description": "LL-37 es el único péptido de su clase que fabrica el ser humano: forma parte de la primera línea de defensa contra los microbios. Se estudia en esa defensa natural, en la formación de vasos nuevos y en el cierre de heridas. Es de los más investigados en su campo, sobre todo en laboratorio. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1629,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1629,
        "stock": 40,
        "batch_number": "NP-LL375-2601",
        "id": "36e337ce-8b7a-497b-aa01-7c5bc853e277",
        "sku": "LL37-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ll-37.pdf",
    "batch_number": "NP-LL375-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 50,
    "start_unit": "mcg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 50,
      "tipica": 200,
      "avanzada": 450,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados.",
      "agua_ml": {
        "5": 2.5
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-ptd-1",
    "name": "PTD-1",
    "slug": "ptd-1",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Se estudia como vehículo para meter cosas dentro de la célula.",
    "description": "PTD-1 no se estudia por lo que hace, sino por a dónde llega: pertenece a un grupo de péptidos capaces de atravesar la membrana de la célula, y por eso se investigan como vehículo para llevar otras moléculas adentro. El trabajo publicado es de laboratorio. Uso exclusivo en investigación (RUO).",
    "presentation": "5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 959,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 959,
        "stock": 40,
        "batch_number": "NP-PTD15-2601",
        "id": "d8253c6d-928d-4845-9dd1-c11f9f82ea87",
        "sku": "PTD1-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ptd-1.pdf",
    "batch_number": "NP-PTD15-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado; su identidad química tampoco está resuelta, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-ptd-dbm",
    "name": "PTD-DBM",
    "slug": "ptd-dbm",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Se estudia en el folículo del pelo y el cierre de heridas.",
    "description": "PTD-DBM es un péptido diseñado en laboratorio para soltar una vía de señales que la célula usa cuando se está regenerando. Se ha estudiado en ratones, mirando el folículo del pelo y el cierre de heridas. Todo el trabajo publicado es de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "1 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2259,
    "variants": [
      {
        "presentation": "1 mg",
        "price": 2259,
        "stock": 40,
        "batch_number": "NP-PTDD1-2601",
        "id": "81cc0bc4-a2f9-4a41-99f4-86ec46b7ed4a",
        "sku": "PTDDBM-1MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ptd-dbm.pdf",
    "batch_number": "NP-PTDD1-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 100,
    "start_unit": "mcg",
    "start_levels": {
      "inicial": 100,
      "tipica": 200,
      "avanzada": 300,
      "unit": "mcg",
      "fuente": "⚠️ DOSIS DERIVADA, no publicada. Para este compuesto no existe una pauta humana publicada: ni ensayo, ni ficha de farmacia, ni manual de dosificación. Lo que ves es una derivación a partir de la práctica de mercado; se usa en protocolos de folículo capilar, hecha por nosotros. Trátala como un punto de partida para conversar con un médico, no como un dato respaldado.",
      "derivada": true
    },
    "featured": false,
    "is_new": false,
    "start_freq": "daily"
  },
  {
    "id": "fallback-tb-500",
    "name": "TB-500",
    "slug": "tb-500",
    "category": "recuperacion",
    "categories": [
      "recuperacion"
    ],
    "short_description": "Se estudia en el movimiento de las células y la reparación.",
    "description": "TB-500 es la parte activa de la timosina beta-4, una proteína que el cuerpo produce. Se estudia porque tiene que ver con cómo se mueven las células cuando un tejido se está reparando. Es de los péptidos más conocidos en recuperación, con trabajo hecho sobre todo en laboratorio y en animales. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.1%",
    "price": 699,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 699,
        "stock": 40,
        "batch_number": "NP-TB2-2601",
        "id": "a8c10f43-ab4d-4c85-9f2a-7eeae9fb9fe6",
        "sku": "TB500-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-TB5-2601",
        "id": "0dd5eec2-2a0e-4384-b7d3-1c32f1d490cb",
        "sku": "TB500-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 1429,
        "stock": 40,
        "batch_number": "NP-TB10-2601",
        "id": "7ca299ad-2828-439e-92b7-0b77e280b6d4",
        "sku": "TB500-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/tb-500.pdf",
    "batch_number": "NP-TB2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.5,
    "start_unit": "mg",
    "start_freq": "2x_week",
    "start_levels": {
      "inicial": 0.5,
      "tipica": 1,
      "avanzada": 1.5,
      "unit": "mg",
      "agua_ml": {
        "2": 1,
        "5": 1.5,
        "10": 3
      },
      "fuente": "⚠️ ORIENTATIVA y CONSERVADORA: el mejor respaldo que existe es de nivel D (recopilación de protocolos de comunidad). La FDA (https://www.fda.gov/media/193349/download — calidad B) confirma la identidad Ac-LKKTETQ, CAS 885340-08-9, y deja constancia de que NO hay datos humanos de seguridad por ninguna vía. La pauta comunitaria (https://greypeptides.com/encyclopedia/tb-500/dosage/) habla de 2 a 2.5 mg subcutáneos 1 o 2 veces por semana durante 4 a 6 semanas de carga, y ella misma declara que ninguna prueba humana la validó. CORRECCIÓN 2026-07-31: el nivel avanzado decía 3 mg y NO CABE en el vial de 2 mg que vendemos. Se baja la escalera a 0.5 / 1 / 1.5 mg dos veces por semana: por semana suma 1, 2 y 3 mg, o sea el mismo orden de magnitud de la pauta comunitaria, pero cada pinchazo cabe en el vial más chico y el nivel avanzado no se lo lleva entero."
    },
    "featured": true,
    "is_new": false
  },
  {
    "id": "fallback-gonadorelin-acetate",
    "name": "Gonadorelin Acetate",
    "slug": "gonadorelin-acetate",
    "category": "sexual-hormonal",
    "categories": [
      "sexual-hormonal"
    ],
    "short_description": "Es la señal que pone en marcha las hormonas reproductivas.",
    "description": "La gonadorelina es la versión hecha en laboratorio de la señal que el cerebro manda para poner en marcha las hormonas reproductivas. Lo característico es que el cuerpo la manda a pulsos, no de forma continua, y eso mismo se estudia. Hay trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 5 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 659,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 659,
        "stock": 40,
        "batch_number": "NP-GONA2-2601",
        "id": "3731505f-b8e0-4105-bf2c-c30b9bf73c78",
        "sku": "GONADORELINACE-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 889,
        "stock": 40,
        "batch_number": "NP-GONA5-2601",
        "id": "23040e1b-4339-4b30-b62b-f4d50db9805f",
        "sku": "GONADORELINACE-5MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/gonadorelin-acetate.pdf",
    "batch_number": "NP-GONA2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 50,
    "start_unit": "mcg",
    "start_freq": "3x_week",
    "start_levels": {
      "inicial": 50,
      "tipica": 100,
      "avanzada": 250,
      "unit": "mcg",
      "fuente": "Protocolo de investigación publicado: 50 a 100 mcg subcutáneos, 2 a 3 veces por semana; hasta 100-250 mcg en hipogonadismo hipogonadotrópico. Fuente secundaria, no etiqueta.",
      "agua_ml": {
        "2": 2,
        "10": 2
      }
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-hcg",
    "name": "HCG",
    "slug": "hcg",
    "category": "sexual-hormonal",
    "categories": [
      "sexual-hormonal"
    ],
    "short_description": "Hormona del embarazo, muy estudiada en el eje hormonal.",
    "description": "La HCG es la hormona que aparece durante el embarazo y que detectan las pruebas caseras. Se estudia porque actúa sobre el mismo interruptor que usa la hormona LH, la que da la orden de fabricar hormonas sexuales. Es una molécula muy conocida, con trabajo en laboratorio, en animales y en personas. Se mide en unidades (IU). Uso exclusivo en investigación (RUO).",
    "presentation": "2,000IU – 10,000IU",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 629,
    "variants": [
      {
        "presentation": "1,000 IU",
        "price": 629,
        "stock": 40,
        "batch_number": "NP-HCG2000-2601",
        "id": "2681f24c-6203-4813-80ad-9c7b88871311",
        "sku": "HCG-1000IU",
        "descuentable": true
      },
      {
        "presentation": "2,000IU",
        "price": 639,
        "stock": 40,
        "batch_number": "NP-HCG2000-2601",
        "id": "799774c2-d701-4db3-98e9-1a9a4b250296",
        "sku": "HCG-2000IU",
        "descuentable": true
      },
      {
        "presentation": "5,000IU",
        "price": 1509,
        "stock": 40,
        "batch_number": "NP-HCG5000-2601",
        "id": "5ad5ffaa-9242-49c5-b869-88baceae9785",
        "sku": "HCG-5000IU",
        "descuentable": true
      },
      {
        "presentation": "10,000IU",
        "price": 2269,
        "stock": 40,
        "batch_number": "NP-HCG10000-2601",
        "id": "9477d32e-5227-4d2d-b5e5-6bc688adee92",
        "sku": "HCG-10000IU",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/hcg.pdf",
    "batch_number": "NP-HCG2000-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 500,
    "start_unit": "iu",
    "start_levels": {
      "inicial": 500,
      "tipica": 1000,
      "avanzada": 1500,
      "unit": "iu",
      "agua_ml": {
        "5000": 2
      },
      "fuente": "investigación propia de Codex (INVESTIGACION-DOSIS-PEPTIDOS.md) + researchdosing.com (manual de dosificación del mercado)"
    },
    "featured": false,
    "is_new": false,
    "start_freq": "3x_week"
  },
  {
    "id": "fallback-hmg",
    "name": "HMG",
    "slug": "hmg",
    "category": "sexual-hormonal",
    "categories": [
      "sexual-hormonal"
    ],
    "short_description": "Mezcla de dos hormonas que trabajan sobre los ovarios.",
    "description": "HMG, también llamada menotropina, trae juntas las dos hormonas que el cuerpo usa para hacer trabajar a los ovarios y a los testículos. Se estudia en la maduración de los folículos y en la producción de hormonas sexuales. Es un preparado con décadas de literatura, también en personas. Se mide en unidades (IU). Uso exclusivo en investigación (RUO).",
    "presentation": "75 IU",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1139,
    "variants": [
      {
        "presentation": "75 IU",
        "price": 1139,
        "stock": 40,
        "batch_number": "NP-HMG75-2601",
        "id": "aa391e71-680a-4ced-9103-c4c199b26111",
        "sku": "HMG-75IU",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/hmg.pdf",
    "batch_number": "NP-HMG75-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-pt-141",
    "name": "PT-141",
    "slug": "pt-141",
    "category": "sexual-hormonal",
    "categories": [
      "sexual-hormonal"
    ],
    "short_description": "Se estudia en el deseo, desde el cerebro y no desde el vaso.",
    "description": "PT-141, también llamado bremelanotida, es pariente de los Melanotan pero se estudia por otra cosa: actúa en el cerebro, no en los vasos sanguíneos. Ese es el ángulo que se investiga en el deseo sexual. Hay trabajo en laboratorio, en animales y también estudios en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 829,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 829,
        "stock": 40,
        "batch_number": "NP-PT10-2601",
        "id": "c2dfec75-f313-4f8b-aa37-8786a6259315",
        "sku": "PT141-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/pt-141.pdf",
    "batch_number": "NP-PT10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 500,
    "start_unit": "mcg",
    "start_freq": "as_needed",
    "start_levels": {
      "inicial": 500,
      "tipica": 2000,
      "avanzada": 2500,
      "unit": "mcg",
      "agua_ml": {
        "10": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-triptorelin-acetate",
    "name": "Triptorelin Acetate",
    "slug": "triptorelin-acetate",
    "category": "sexual-hormonal",
    "categories": [
      "sexual-hormonal"
    ],
    "short_description": "Se estudia en el eje hormonal reproductivo.",
    "description": "Triptorelina imita la señal que pone en marcha las hormonas reproductivas, pero de forma continua en lugar de a pulsos. Lo curioso es que, al mantenerse encendida, la hipófisis termina por dejar de responder; ese comportamiento es lo que se estudia. Hay trabajo en laboratorio, en animales y en personas. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 699,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 699,
        "stock": 40,
        "batch_number": "NP-TRIP2-2601",
        "id": "50b8ec4d-9ed9-4bd8-98bb-d9920a7fa57c",
        "sku": "TRIPTORELINACE-2MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/triptorelin-acetate.pdf",
    "batch_number": "NP-TRIP2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": {
      "inicial": 50,
      "tipica": 100,
      "avanzada": 200,
      "unit": "mcg",
      "orientativa": true
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-agua-bacteriostatica",
    "name": "Agua bacteriostática",
    "slug": "agua-bacteriostatica",
    "category": "suministros",
    "categories": [
      "suministros"
    ],
    "short_description": "Es el agua con la que se disuelve el polvo del vial.",
    "description": "No es un péptido: es un insumo de laboratorio. Es agua estéril con un conservador (alcohol bencílico) que impide que crezcan bacterias, y sirve para disolver los compuestos que vienen en polvo. Es lo que se usa en el trabajo de laboratorio del día a día. Uso exclusivo en investigación (RUO).",
    "presentation": "3 mL – 10 mL",
    "form": "Solución",
    "purity": "99.0%",
    "price": 179,
    "variants": [
      {
        "presentation": "3 mL",
        "price": 179,
        "stock": 40,
        "batch_number": "NP-AGUA3-2601",
        "id": "7f2299c4-4d43-4f6c-a0c8-3e3ebb85c01e",
        "sku": "AGUABACTERIOST-3ML",
        "descuentable": false
      },
      {
        "presentation": "10 mL",
        "price": 239,
        "stock": 40,
        "batch_number": "NP-AGUA10-2601",
        "id": "38e8b549-c62f-474d-8810-ad8e6de08c12",
        "sku": "AGUABACTERIOST-10ML",
        "descuentable": false
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/agua-bacteriostatica.pdf",
    "batch_number": "NP-AGUA3-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-b12",
    "name": "B12",
    "slug": "b12",
    "category": "suministros",
    "categories": [
      "suministros"
    ],
    "short_description": "Solución de vitamina B12 para trabajo de laboratorio.",
    "description": "Es vitamina B12 (cianocobalamina) en solución, a 1 mg por mililitro. No es un péptido: se usa como reactivo y como referencia en pruebas de laboratorio. Viene lista en frasco de 10 mL. Uso exclusivo en investigación (RUO).",
    "presentation": "1 mg",
    "form": "Solución",
    "purity": "99.0%",
    "price": 1159,
    "variants": [
      {
        "presentation": "1 mg/mL (10 mL)",
        "price": 1159,
        "stock": 40,
        "batch_number": "NP-B121-2601",
        "id": "bad4695a-96ca-4ed6-8215-c04f01f8df17",
        "sku": "B121MGML-1MGML10ML",
        "descuentable": false
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/b12.pdf",
    "batch_number": "NP-B121-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_freq": null,
    "start_levels": {
      "apagada": "APAGADA el 2026-07-31. Dos problemas a la vez. (1) El B12 NO SE RECONSTITUYE: ya viene en solución a 1 mg/mL en un frasco de 10 mL, así que una calculadora de agua bacteriostática no aplica. El agua que teníamos anotada era para una llave '10' que la calculadora ni siquiera leía, porque de la presentación '1 mg/mL (10 mL)' toma el número 1. (2) Con ese vial leído como 1 mg, los niveles de 2500 y 5000 mcg salían en 500 y 1000 rayitas — cinco y diez jeringas U-100 llenas, y más de lo que la calculadora creía que traía el frasco. La única fuente que teníamos era researchdosing.com, hoja de vendedor sin bibliografía, y la revisión con búsqueda web no localizó pauta citable. Regla de la casa: sin fuente, no se muestra dosis. ⚠️ PENDIENTE para Christián: la cianocobalamina inyectable SÍ tiene etiqueta oficial (FDA), así que aquí sí se podría encender una dosis con respaldo B — pero primero hay que resolver que el producto es solución y no polvo."
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-acido-acetico",
    "name": "Ácido acético",
    "slug": "acido-acetico",
    "category": "suministros",
    "categories": [
      "suministros"
    ],
    "short_description": "Disolvente de laboratorio para los polvos que cuestan más.",
    "description": "No es un péptido: es un insumo de laboratorio. Es una solución diluida de ácido acético —el mismo ácido del vinagre— que se usa para disolver polvos que no se van bien sólo con agua. Uso exclusivo en investigación (RUO).",
    "presentation": "3 mL – 10 mL",
    "form": "Solución",
    "purity": "99.0%",
    "price": 179,
    "variants": [
      {
        "presentation": "3 mL",
        "price": 179,
        "stock": 40,
        "batch_number": "NP-CIDO3-2601",
        "id": "10072460-3496-4cac-9fb7-d98a2460699a",
        "sku": "ACIDOACETICO-3ML",
        "descuentable": false
      },
      {
        "presentation": "5 mL",
        "price": 279,
        "stock": 40,
        "batch_number": "NP-CIDO5-2601",
        "id": "66f91f7f-5c40-4da9-98f2-3a5a49af7103",
        "sku": "ACIDOACETICO-5ML",
        "descuentable": false
      },
      {
        "presentation": "10 mL",
        "price": 299,
        "stock": 40,
        "batch_number": "NP-CIDO10-2601",
        "id": "7aea7b2e-3d27-49f4-9d6a-54d4326e5496",
        "sku": "ACIDOACETICO-10ML",
        "descuentable": false
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/acido-acetico.pdf",
    "batch_number": "NP-CIDO3-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": null,
    "start_unit": null,
    "start_levels": null,
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-adipotida",
    "name": "Adipotida",
    "slug": "adipotida",
    "category": "perdida-peso",
    "categories": [
      "perdida-peso"
    ],
    "short_description": "Se estudia en los vasos que alimentan el tejido graso.",
    "description": "Adipotida es un péptido de dos partes: una que busca los vasos sanguíneos del tejido graso y otra que actúa una vez que llegó ahí. Se estudia por ese ángulo poco común: no la grasa en sí, sino los vasos que la alimentan. El trabajo publicado es de laboratorio y de animales. Uso exclusivo en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1559,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 1559,
        "stock": 40,
        "batch_number": "NP-ADIP2-2601",
        "id": "1a3db90a-1274-4ec0-a0c8-183f27d3093e",
        "sku": "ADIPOTIDA-2MG",
        "descuentable": true
      },
      {
        "presentation": "5 mg",
        "price": 2879,
        "stock": 40,
        "batch_number": "NP-ADIP5-2601",
        "id": "0dd704b1-6159-4900-9986-fa4458be3543",
        "sku": "ADIPOTIDA-5MG",
        "descuentable": true
      },
      {
        "presentation": "10 mg",
        "price": 3089,
        "stock": 40,
        "batch_number": "NP-ADIP10-2601",
        "id": "a44c51d5-5770-4dee-872d-e3fe2b1028f0",
        "sku": "ADIPOTIDA-10MG",
        "descuentable": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/adipotida.pdf",
    "batch_number": "NP-ADIP2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "featured": false,
    "is_new": true
  }
];

export const getFallbackFeaturedProducts = () => fallbackProducts.filter((product) => product.featured).slice(0, 8);
// Busca por slug tolerando la presentacion pegada al final. El backend guarda
// un producto por presentacion ("bpc-157-10-mg") mientras que aqui viven
// agrupados ("bpc-157"): sin esta tolerancia, cualquier enlace del servidor, del
// chat o compartido caia en "Producto no encontrado" (Christian, 2026-07-25).
const stripPresentation = (slug) => (slug || '')
  .replace(/-\d+(?:[.,]\d+)?-?(?:mg|iu|ml|u|g)$/i, '')
  .replace(/-\d+$/, '');

export const getFallbackProductBySlug = (slug) => {
  if (!slug) return undefined;
  const exacto = fallbackProducts.find((product) => product.slug === slug);
  if (exacto) return exacto;
  const base = stripPresentation(slug);
  const porBase = fallbackProducts.find((product) => product.slug === base);
  if (porBase) return porBase;
  // ultimo intento: el slug mas largo que sea prefijo del pedido
  const candidatos = fallbackProducts
    .filter((product) => slug.startsWith(product.slug))
    .sort((a, b) => b.slug.length - a.slug.length);
  return candidatos[0];
};
export const getFallbackProductsByCategory = (category) => fallbackProducts.filter((product) => (product.categories || [product.category]).includes(category));

export const CATEGORY_COUNTS = (() => {
  const n = {};
  for (const p of fallbackProducts) {
    for (const c of (p.categories || [p.category])) {
      if (c) n[c] = (n[c] || 0) + 1;
    }
  }
  return n;
})();

export const VISIBLE_CATEGORIES = fallbackCategories.filter(
  (c) => (CATEGORY_COUNTS[c.slug] || 0) > 0 && !HIDDEN_CATEGORIES.includes(c.slug));
