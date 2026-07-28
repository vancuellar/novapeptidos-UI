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
    "short_description": "Péptido corto explorado en tejido bronquial.",
    "description": "Bronchogen es un péptido corto de la serie Khavinson explorado en modelos de epitelio bronquial y pulmonar; su literatura es limitada y mayormente de origen ruso. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Péptido corto explorado en tejido cardiaco.",
    "description": "Cardiogen es un péptido corto de la serie Khavinson explorado en modelos de miocardio y tejido cardiovascular; la evidencia disponible es limitada y preliminar. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Tripéptido explorado en cartílago y tejido conectivo.",
    "description": "Cartalax es un tripéptido de la serie Khavinson explorado en modelos de condrocitos, cartílago y tejido conectivo; su literatura publicada es limitada. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Péptido corto explorado en tejido nervioso.",
    "description": "Cortagen es un péptido corto de la serie Khavinson explorado en modelos de corteza cerebral y nervio periférico; la evidencia publicada es limitada. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Péptido corto explorado en respuesta inmune.",
    "description": "Crystagen es un péptido de la serie Khavinson explorado en modelos de regulación inmunitaria y función de linfocitos; su respaldo experimental es limitado. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Tripéptido corto explorado en tejido neuronal.",
    "description": "Pinealon es un tripéptido de la serie Khavinson explorado en modelos de neuronas, estrés oxidativo y regulación de la expresión génica; su evidencia es limitada. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1559,
        "stock": 40,
        "batch_number": "NP-PINE10-2601",
        "id": "91bf6c38-503a-414c-affc-4f86e96ccac7",
        "sku": "PINEALON-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
        "10": 2
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
    "short_description": "Complejo peptídico tímico explorado en inmunidad.",
    "description": "Thymalin es un complejo de péptidos obtenido de timo, explorado en modelos de maduración de linfocitos T y regulación inmunitaria; buena parte de su literatura es antigua. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/10514991/pexels-photo-10514991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/thymalin.pdf",
    "batch_number": "NP-THYM10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 10,
    "start_unit": "mg",
    "start_freq": "daily_cycle",
    "start_levels": {
      "inicial": 10,
      "tipica": 10,
      "avanzada": 10,
      "unit": "mg",
      "fuente": "Protocolo clínico de Khavinson (Instituto de Bioregulación y Gerontología, San Petersburgo): 10 mg al día durante 5 a 10 días seguidos, y el curso se repite cada 6 a 12 meses. ⚠️ CORRECCIÓN: antes lo habíamos bajado a 1-2 mg por analogía con los otros bioreguladores. Para Thymalin esa analogía era falsa — su protocolo publicado sí es de 10 mg.",
      "agua_ml": {
        "10": 2
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
    "short_description": "Péptido tímico estudiado en modulación inmunitaria.",
    "description": "Timosina alfa-1 es un péptido de 28 aminoácidos de origen tímico, investigado en modelos de receptores tipo Toll, maduración de células dendríticas y respuesta inmune celular. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-THYM10-2601",
        "id": "17c3f0ff-a6d0-45a1-b35c-d5e620780829",
        "sku": "THYMOSINALPHA1-10MG",
        "commission_cap": 0.25,
        "distributor_eligible": false
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
    "short_description": "Tripéptido de cobre estudiado en folículo y vasos.",
    "description": "AHK-Cu es un complejo de cobre investigado en modelos de angiogénesis, papila dérmica y folículo piloso, así como en estudios de matriz extracelular cutánea. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "100 mg",
        "price": 1379,
        "stock": 40,
        "batch_number": "NP-AHKC100-2601",
        "id": "e315152d-e416-444a-b3f8-52b3d7163fbe",
        "sku": "AHKCU-100MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Neurotoxina de laboratorio medida en unidades biológicas.",
    "description": "La toxina botulínica es una proteína neurotóxica estudiada por su bloqueo de la liberación de acetilcolina en la unión neuromuscular; se cuantifica en unidades biológicas, no en miligramos. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Tripéptido de cobre estudiado en piel y remodelación.",
    "description": "GHK-Cu es un complejo de cobre investigado en modelos de remodelación de matriz extracelular, piel y cabello. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "100 mg",
        "price": 1269,
        "stock": 40,
        "batch_number": "NP-GHK100-2601",
        "id": "b12e549d-4262-4bd8-91e6-e64a6e0a6f8a",
        "sku": "GHKCU-100MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Solución lipolítica con riboflavina, lecitina y bromelina.",
    "description": "Lemon Bottle es una solución que combina riboflavina, lecitina y bromelina, estudiada en modelos de adipocitos y de degradación de tejido graso. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Pentapéptido cosmético estudiado en síntesis de colágeno.",
    "description": "Matrixyl (palmitoil pentapéptido-4) es un péptido señal investigado en fibroblastos dérmicos por su efecto sobre la síntesis de colágeno y componentes de la matriz extracelular. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Octapéptido cosmético estudiado en el complejo SNARE.",
    "description": "SNAP-8 es un octapéptido derivado de SNAP-25 investigado en cosmética experimental por su interferencia con el complejo SNARE y la liberación de neurotransmisores en modelos in vitro. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "100 mg",
        "price": 2619,
        "stock": 40,
        "batch_number": "NP-SNAP100-2601",
        "id": "ad15b37a-da23-4135-b754-593de64b2582",
        "sku": "SNAP8-100MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Análogo de GHRH combinado con secretagogo selectivo.",
    "description": "Une CJC-1295 sin DAC, análogo de GHRH de vida media corta, con Ipamorelin; la combinación se estudia por la señalización complementaria de las vías GHRH y grelina. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Heptapéptido central de TB-500 estudiado en reparación.",
    "description": "Fragment 17-23 (Ac-LKKTETQ) es el heptapéptido central de la timosina beta-4 con el dominio de unión a actina, estudiado en migración celular y angiogénesis. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Secretagogo peptídico de hormona de crecimiento.",
    "description": "GHRP-2 es un hexapéptido investigado por su acción sobre el receptor de secretagogos de hormona de crecimiento y por la señalización del eje somatotrópico. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 829,
        "stock": 40,
        "batch_number": "NP-GHRP10-2601",
        "id": "8574b6e3-d5dd-4651-a6a1-8f251f3cd832",
        "sku": "GHRP2ACETATE-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "15 mg",
        "price": 1069,
        "stock": 40,
        "batch_number": "NP-GHRP15-2601",
        "id": "4541d16f-945b-4cf5-84e8-c3314c0415dc",
        "sku": "GHRP2ACETATE-15MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Secretagogo estudiado en GH y señalización de grelina.",
    "description": "GHRP-6 es un hexapéptido que actúa sobre el receptor de grelina, estudiado en modelos de liberación de hormona de crecimiento y de regulación del apetito. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 889,
        "stock": 40,
        "batch_number": "NP-GHRP10-2601",
        "id": "50ce374a-42c5-4f02-bb9d-a2a83c757567",
        "sku": "GHRP6ACETATE-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Hexapéptido secretagogo estudiado en GH y corazón.",
    "description": "Hexarelin es un hexapéptido sintético investigado por su acción sobre receptores de grelina y CD36, en modelos de liberación de hormona de crecimiento y de tejido cardiaco. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-HEXA5-2601",
        "id": "57b96b3d-d265-48e5-b52d-f2893b2e9e3d",
        "sku": "HEXARELINACETA-5MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Hormona de crecimiento recombinante, ampliamente estudiada.",
    "description": "HGH es hormona de crecimiento humana recombinante, investigada en modelos de señalización del receptor de GH, producción hepática de IGF-1 y metabolismo de proteínas y lípidos. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.2,
        "distributor_eligible": false
      },
      {
        "presentation": "36 IU",
        "price": 1548,
        "stock": 40,
        "batch_number": "NP-HGH36-2601",
        "id": "98e2710e-365c-4c00-9fd2-4bc4b1903784",
        "sku": "HGH-36IU",
        "commission_cap": 0.2,
        "distributor_eligible": false
      },
      {
        "presentation": "40 IU",
        "price": 3869,
        "stock": 40,
        "batch_number": "NP-HGH40-2601",
        "id": "24dd69be-8468-40a2-9030-36ca5bdda515",
        "sku": "HGH-40IU",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Fragmento C-terminal de GH estudiado en lipólisis.",
    "description": "Corresponde a la región 176-191 de la hormona de crecimiento, investigada en modelos de adipocitos y movilización de lípidos sin los efectos somatotrópicos de la molécula completa. Solo para uso en investigación (RUO).",
    "presentation": "1 mg – 15 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 509,
    "variants": [
      {
        "presentation": "1 mg",
        "price": 509,
        "stock": 40,
        "batch_number": "NP-HGHF1-2601",
        "id": "56adf073-14e0-41c2-bd43-d5d4d63a28d6",
        "sku": "HGHFRAGMENT176-1MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "2 mg",
        "price": 959,
        "stock": 40,
        "batch_number": "NP-HGHF2-2601",
        "id": "dc3eab59-665a-4991-ad71-154537f4c3a0",
        "sku": "HGHFRAGMENT176-2MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-HGHF5-2601",
        "id": "fdb66b4f-afd5-4964-ba3f-cf95036c33b2",
        "sku": "HGHFRAGMENT176-5MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 2359,
        "stock": 40,
        "batch_number": "NP-HGHF10-2601",
        "id": "681da265-e826-49f7-87b6-37da77343e0a",
        "sku": "HGHFRAGMENT176-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "12 mg",
        "price": 2709,
        "stock": 40,
        "batch_number": "NP-HGHF10-2601",
        "id": "a5df0b96-095e-4efa-a6db-144331024c6a",
        "sku": "HGHFRAGMENT176-12MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "15 mg",
        "price": 3409,
        "stock": 40,
        "batch_number": "NP-HGHF15-2601",
        "id": "27ef0698-42b0-4ba3-8b6e-6e2bb7217713",
        "sku": "HGHFRAGMENT176-15MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/hgh-fragment-176-191.pdf",
    "batch_number": "NP-HGHF1-2601",
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
    "short_description": "Análogo de IGF-1 de vida media prolongada.",
    "description": "IGF-1 LR3 es un análogo con baja afinidad por las proteínas de unión a IGF, estudiado en cultivos celulares por su señalización sostenida sobre el receptor de IGF-1. Solo para uso en investigación (RUO).",
    "presentation": "0.1 mg – 1 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 589,
    "variants": [
      {
        "presentation": "0.1 mg",
        "price": 589,
        "stock": 40,
        "batch_number": "NP-IGF101-2601",
        "id": "adc6f9d6-6c27-4485-a728-f1f758f362a1",
        "sku": "IGF1LR3-01MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "1 mg",
        "price": 1449,
        "stock": 40,
        "batch_number": "NP-IGF11-2601",
        "id": "1932037e-9657-4f4f-b832-4ed7a469ed04",
        "sku": "IGF1LR3-1MG",
        "commission_cap": 0.2,
        "distributor_eligible": false
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/igf-1-lr3.pdf",
    "batch_number": "NP-IGF101-2601",
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
    "short_description": "Secretagogo selectivo de GH, ampliamente estudiado.",
    "description": "Ipamorelin es un péptido de investigación estudiado por su señalización selectiva de hormona de crecimiento. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1069,
        "stock": 40,
        "batch_number": "NP-IPA5-2601",
        "id": "8b8e6aef-74ce-4cd0-addd-ea31b00c481d",
        "sku": "IPAMORELIN-5MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1089,
        "stock": 40,
        "batch_number": "NP-IPA10-2601",
        "id": "f88df19e-5dd5-4bd3-8e1e-348a1297b91d",
        "sku": "IPAMORELIN-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Variante de IGF-1 estudiada en reparación muscular.",
    "description": "MGF es una variante de splicing del IGF-1 asociada al estímulo mecánico, investigada en modelos de células satélite, regeneración de fibra muscular y respuesta al daño. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "MGF pegilado con mayor estabilidad en circulación.",
    "description": "PEG-MGF es la versión pegilada del factor mecano-crecimiento, con vida media más larga, estudiada en modelos de activación de células satélite y reparación de músculo esquelético. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Fragmento de GHRH (1-29), de investigación.",
    "description": "Sermorelina es un fragmento de GHRH investigado en modelos de secreción de hormona de crecimiento. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1089,
        "stock": 40,
        "batch_number": "NP-SERM5-2601",
        "id": "6bdf313c-912e-4ac7-9d6e-93fdc674f250",
        "sku": "SERMORELINA-5MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 2159,
        "stock": 40,
        "batch_number": "NP-SERM10-2601",
        "id": "eed66e42-37a5-48bf-b227-e65c551050df",
        "sku": "SERMORELINA-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Análogo de GHRH junto a secretagogo selectivo.",
    "description": "Combina tesamorelina, análogo estabilizado de GHRH, con ipamorelina; la mezcla se estudia por la señalización complementaria de los receptores de GHRH y de grelina en el eje somatotrópico. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Tetrapéptido estudiado en telómeros y ritmos circadianos.",
    "description": "Epithalon es un tetrapéptido investigado en modelos de actividad de telomerasa y regulación circadiana. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "50 mg",
        "price": 3359,
        "stock": 40,
        "batch_number": "NP-EPI50-2601",
        "id": "e4f485e9-5bf2-425f-8890-5d1cce61f04a",
        "sku": "EPITHALON-50MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Péptido senolítico explorado en células senescentes.",
    "description": "FOXO4 (FOXO4-DRI) es un péptido diseñado para interferir con la interacción FOXO4-p53, explorado en modelos de senescencia celular y depuración selectiva de células senescentes. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 5599,
        "stock": 40,
        "batch_number": "NP-FOXO10-2601",
        "id": "39be60d1-8886-4c73-b1b4-d9c093390e9b",
        "sku": "FOXO4-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Antioxidante tripeptídico, de investigación.",
    "description": "Glutatión es un tripéptido antioxidante investigado en modelos de estrés oxidativo. Solo para uso en investigación (RUO).",
    "presentation": "600 mg – 1500 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 579,
    "variants": [
      {
        "presentation": "600 mg",
        "price": 579,
        "stock": 40,
        "batch_number": "NP-GLUT600-2601",
        "id": "696c2182-2d39-4dde-9544-a34b50b64009",
        "sku": "GLUTATION-600MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "1500 mg",
        "price": 1499,
        "stock": 40,
        "batch_number": "NP-GLUT1500-2601",
        "id": "94c30fa2-5eff-4885-a799-8e8ebf9cd946",
        "sku": "GLUTATION-1500MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Péptido mitocondrial explorado en citoprotección celular.",
    "description": "Humanin es un péptido codificado en el ADN mitocondrial, investigado en modelos de estrés celular, apoptosis y neuroprotección, dentro del campo de los péptidos derivados de mitocondria. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "20 mg",
        "price": 4079,
        "stock": 40,
        "batch_number": "NP-HUMA20-2601",
        "id": "48ef8513-9c4e-4201-a6e2-4f87b3b3eb21",
        "sku": "HUMANIN-20MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Coenzima estudiada en metabolismo celular y longevidad. El vial de 500 mg rinde 5 semanas en esquema de mantenimiento.",
    "description": "NAD+ es una coenzima investigada en modelos de metabolismo energético y envejecimiento celular. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "500 mg",
        "price": 1249,
        "stock": 40,
        "batch_number": "NP-NAD500-2601",
        "id": "58c98a1f-e090-49f4-8067-0a75904d9ca7",
        "sku": "NAD-500MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "1000 mg",
        "price": 2279,
        "stock": 40,
        "batch_number": "NP-NAD1000-2601",
        "id": "4a028b3f-73d4-4f83-bebb-4543f0562039",
        "sku": "NAD-1000MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "start_freq": "3x_week",
    "start_levels": {
      "inicial": 30,
      "tipica": 50,
      "avanzada": 100,
      "unit": "mg",
      "freq": {
        "inicial": "daily",
        "tipica": "2x_week",
        "avanzada": "3x_week"
      },
      "agua_ml": {
        "100": 1,
        "500": 3,
        "1000": 5
      },
      "fase": {
        "inicial": "inicio",
        "tipica": "mantenimiento",
        "avanzada": "mantenimiento"
      },
      "fuente": "olympiapharmacy.com/blog/nad-dosage-chart-nad-dosage-per-day + peptidedosages.com (vial 500 mg) + extension.health NAD-500mg Patient Information"
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
    "short_description": "Péptido mitocondrial que se une a cardiolipina.",
    "description": "SS-31 (elamipretida) es un tetrapéptido con afinidad por la cardiolipina de la membrana mitocondrial interna, estudiado en modelos de función mitocondrial y estrés oxidativo. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "50 mg",
        "price": 4679,
        "stock": 40,
        "batch_number": "NP-SS3150-2601",
        "id": "6e0c7e19-f32d-474b-be5c-fb897273182f",
        "sku": "SS31-50MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Mezcla de péptidos estudiada en modelos neuronales.",
    "description": "Cerebrolysin es una mezcla de péptidos de bajo peso molecular de origen porcino, investigada en modelos de neuroprotección, plasticidad sináptica y daño cerebral isquémico. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
        "215": 8
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
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
    "short_description": "Péptido inductor de sueño delta, de investigación.",
    "description": "DSIP es un péptido investigado en modelos de regulación del sueño. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 949,
        "stock": 40,
        "batch_number": "NP-DSIP5-2601",
        "id": "bb8e9ee3-501c-4345-9fba-fe3e11b2f7d5",
        "sku": "DSIP-5MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1199,
        "stock": 40,
        "batch_number": "NP-DSIP10-2601",
        "id": "949505ed-8adb-440a-aa46-d6a3f12dbf55",
        "sku": "DSIP-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Hormona pineal estudiada en ritmos circadianos.",
    "description": "La melatonina es una indolamina producida por la glándula pineal, investigada en modelos de ritmo circadiano, receptores MT1 y MT2 y actividad antioxidante celular. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Neuropéptido hipotalámico estudiado en vigilia y apetito.",
    "description": "Orexina A es un neuropéptido hipotalámico que actúa sobre los receptores OX1R y OX2R, investigado en modelos de vigilia, ritmo sueño-vigilia y conducta alimentaria. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Neuropéptido con preferencia por el receptor OX2R.",
    "description": "Orexina B es la segunda forma del sistema orexinérgico, con preferencia por el receptor OX2R, estudiada en modelos de regulación del sueño, alerta y balance energético. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 3499,
        "stock": 40,
        "batch_number": "NP-OREX10-2601",
        "id": "5c16ed8b-0dca-4b7e-ba62-1478724aeca3",
        "sku": "OREXINB-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Análogo de spadina explorado en modelos de ánimo.",
    "description": "PE-22-28 es un análogo corto de spadina que bloquea el canal TREK-1, explorado en modelos animales de conducta tipo depresiva y de plasticidad neuronal. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Péptido derivado de p53 estudiado en células tumorales.",
    "description": "PNC-27 une una secuencia derivada de p53 a un dominio de penetración celular, investigado in vitro por su interacción con HDM-2 en membranas de líneas tumorales. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Péptido ansiolítico de investigación.",
    "description": "Selank es un péptido investigado en modelos de ansiedad y modulación inmune. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 829,
        "stock": 40,
        "batch_number": "NP-SLK10-2601",
        "id": "767a631b-3c6c-4f25-9a75-915860bef1ca",
        "sku": "SELANK-10MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Péptido nootrópico de investigación.",
    "description": "Semax es un péptido investigado en modelos de función cognitiva y neuroprotección. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 909,
        "stock": 40,
        "batch_number": "NP-SMX10-2601",
        "id": "95ce366e-56b3-4c8f-862f-9fc7176f3240",
        "sku": "SEMAX-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Corticotropina completa estudiada en el eje suprarrenal.",
    "description": "ACTH 1-39 es la secuencia completa de la hormona adrenocorticotrópica, investigada en modelos del eje hipotálamo-hipófisis-suprarrenal y en la esteroidogénesis de células adrenocorticales. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Derivado de Semax explorado en neuroplasticidad.",
    "description": "ADMAX (Adamax) es un análogo modificado de Semax, derivado de ACTH 4-10, explorado en modelos neuronales de expresión de BDNF y NGF. Su literatura es limitada. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 3469,
        "stock": 40,
        "batch_number": "NP-ADMA10-2601",
        "id": "00e3f5ac-c399-4bac-930d-85dec63a4fa7",
        "sku": "ADMAX-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Análogo de relaxina explorado en fibrosis.",
    "description": "B7-33 es un péptido monomérico derivado de la relaxina H2 que actúa sobre el receptor RXFP1, investigado en modelos preclínicos de fibrosis cardiaca, renal y pulmonar. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 2889,
        "stock": 40,
        "batch_number": "NP-B73310-2601",
        "id": "d28d8894-884a-45b1-8d4a-d67970068f5d",
        "sku": "B733-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Análogo de GHRH con DAC, acción prolongada.",
    "description": "CJC-1295 con DAC es un análogo de GHRH de acción prolongada investigado en modelos de señalización de GH. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.25,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1919,
        "stock": 40,
        "batch_number": "NP-CJCD5-2601",
        "id": "da9906d3-487d-49d3-b2ee-017e427c2f54",
        "sku": "CJC1295CONDAC-5MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cjc-1295-con-dac.pdf",
    "batch_number": "NP-CJCD2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 2,
      "tipica": 3,
      "avanzada": 4,
      "unit": "mg",
      "fuente": "Teichman SL et al., J Clin Endocrinol Metab 2006;91(3):799-805 (PMID 16352683): 30 a 60 mcg/kg subcutáneos, semanal o cada dos semanas. ⚠️ El ensayo dosificó POR PESO; los niveles de aquí son la conversión para ~70 kg.",
      "agua_ml": {
        "5": 1.25,
        "10": 2.5
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
    "short_description": "Análogo de GHRH sin DAC, de investigación.",
    "description": "CJC-1295 sin DAC es un análogo de GHRH investigado en modelos de señalización de hormona de crecimiento. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-CJCN5-2601",
        "id": "5ab62375-3a75-4e76-9296-722a63ad9eec",
        "sku": "CJC1295SINDAC-5MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1429,
        "stock": 40,
        "batch_number": "NP-CJCN10-2601",
        "id": "1d795150-41ef-4f8f-a099-5a456f56f1b4",
        "sku": "CJC1295SINDAC-10MG",
        "commission_cap": 0.25,
        "distributor_eligible": true
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
    "short_description": "Eritropoyetina estudiada en producción de glóbulos rojos.",
    "description": "La eritropoyetina es una glicoproteína investigada por su papel en la eritropoyesis y en modelos de hipoxia, progenitores eritroides y señalización del receptor de EPO. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Péptido de investigación del eje reproductivo.",
    "description": "Kisspeptina-10 es un péptido investigado en modelos de regulación del eje hipotálamo-hipófisis-gonadal. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1459,
        "stock": 40,
        "batch_number": "NP-KISS10-2601",
        "id": "655ba833-56e1-4ef5-9c9f-8e7c166b65b7",
        "sku": "KISSPEPTINA10-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Doble agonista GLP-1/glucagón, de investigación.",
    "description": "Mazdutida es un péptido doble agonista GLP-1/glucagón investigado en modelos metabólicos. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 2719,
        "stock": 40,
        "batch_number": "NP-MAZD10-2601",
        "id": "8aba4b0a-4097-4484-a92a-97ded13b8e45",
        "sku": "MAZDUTIDA-10MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/mazdutida.pdf",
    "batch_number": "NP-MAZD5-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 2,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 2,
      "tipica": 4.5,
      "avanzada": 6,
      "unit": "mg",
      "agua_ml": {
        "10": 1
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
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
    "short_description": "Análogo de alfa-MSH estudiado en pigmentación.",
    "description": "Melanotan I (afamelanotida) es un análogo de la hormona alfa-MSH investigado en modelos de melanocitos, receptor MC1R y regulación de la pigmentación cutánea. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Análogo de melanocortina para investigación de pigmentación.",
    "description": "Melanotan II es un análogo de melanocortina investigado en modelos de pigmentación. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Mezcla lipotrópica con vitamina B12 añadida.",
    "description": "MIC combina metionina, inositol y colina con vitamina B12, usada en estudios de metabolismo hepático de lípidos y de vías dependientes de grupos metilo. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Nonapéptido de investigación.",
    "description": "Oxitocina es un nonapéptido investigado en modelos de conducta social y señalización. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 829,
        "stock": 40,
        "batch_number": "NP-OXY5-2601",
        "id": "17bc65bf-139d-40c8-86a5-acdce12edd60",
        "sku": "OXITOCINA-5MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 859,
        "stock": 40,
        "batch_number": "NP-OXY10-2601",
        "id": "6f7eaffb-8997-4272-8178-04bc4efe13af",
        "sku": "OXITOCINA-10MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Péptido derivado de CNTF explorado en neurogénesis.",
    "description": "P21 es un péptido derivado del factor neurotrófico ciliar, explorado en modelos de neurogénesis del hipocampo y plasticidad sináptica; su literatura es todavía limitada. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Hormona de crecimiento recombinante de 191 aminoácidos.",
    "description": "Somatropina es hormona de crecimiento humana recombinante de secuencia completa de 191 aminoácidos, investigada en modelos de señalización del receptor de GH y de producción de IGF-1. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.25,
        "distributor_eligible": true
      },
      {
        "presentation": "12 IU",
        "price": 639,
        "stock": 40,
        "batch_number": "NP-SOMA12-2601",
        "id": "22d43665-3610-490a-bb73-6832b431619c",
        "sku": "SOMATROPINAHGH-12IU",
        "commission_cap": 0.5,
        "distributor_eligible": false
      },
      {
        "presentation": "15 IU",
        "price": 779,
        "stock": 40,
        "batch_number": "NP-SOMA15-2601",
        "id": "ee8711a9-06a2-4a85-be1e-a5294b8729d5",
        "sku": "SOMATROPINAHGH-15IU",
        "commission_cap": 0.5,
        "distributor_eligible": false
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
    "short_description": "Análogo estabilizado de GHRH, de investigación.",
    "description": "Tesamorelina es un análogo estabilizado de GHRH investigado en modelos metabólicos y de composición corporal. Solo para uso en investigación (RUO).",
    "presentation": "2 mg – 20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 749,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 749,
        "stock": 40,
        "batch_number": "NP-TESA2-2601",
        "id": "e4e46c55-b8da-4058-96e3-db76f99905d9",
        "sku": "TESAMORELINA-2MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1179,
        "stock": 40,
        "batch_number": "NP-TESA5-2601",
        "id": "517d579b-7afc-427e-ac06-53c88855fb90",
        "sku": "TESAMORELINA-5MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1929,
        "stock": 40,
        "batch_number": "NP-TESA10-2601",
        "id": "864667b7-3027-48f6-a393-d28f163e4fd6",
        "sku": "TESAMORELINA-10MG",
        "commission_cap": 0.25,
        "distributor_eligible": true
      },
      {
        "presentation": "20 mg",
        "price": 3829,
        "stock": 40,
        "batch_number": "NP-TESA20-2601",
        "id": "76a349e9-5e95-428d-8fd5-8fea9ee8cf01",
        "sku": "TESAMORELINA-20MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/tesamorelina.pdf",
    "batch_number": "NP-TESA2-2601",
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
    "short_description": "Neuropéptido estudiado en vasodilatación e inflamación.",
    "description": "El péptido intestinal vasoactivo es un neuropéptido de 28 aminoácidos investigado en modelos de vasodilatación, regulación inmunitaria y señalización de los receptores VPAC1 y VPAC2. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1569,
        "stock": 40,
        "batch_number": "NP-VIP10-2601",
        "id": "982833c9-b7e9-4504-b2cb-5be84ae9e3e8",
        "sku": "VIP-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Inhibidor de NNMT explorado en adipocitos.",
    "description": "5-amino-1MQ es un inhibidor de la nicotinamida N-metiltransferasa estudiado en líneas de adipocitos y en modelos preclínicos de metabolismo lipídico y regulación de NAD+. Solo para uso en investigación (RUO).",
    "presentation": "5 mg – 50 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 839,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 839,
        "stock": 40,
        "batch_number": "NP-5AMI5-2601",
        "id": "bd1ca7a4-03e0-4891-bbba-e60424162662",
        "sku": "5AMINO1MQ-5MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1259,
        "stock": 40,
        "batch_number": "NP-5AMI10-2601",
        "id": "4f6e26cf-a4e3-4cde-be7b-0a031514b7aa",
        "sku": "5AMINO1MQ-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "50 mg",
        "price": 2999,
        "stock": 40,
        "batch_number": "NP-5AMI50-2601",
        "id": "0b8dd26f-4148-4eb3-a90f-67bfee083209",
        "sku": "5AMINO1MQ-50MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/5-amino-1mq.pdf",
    "batch_number": "NP-5AMI5-2601",
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
    "short_description": "Activador de AMPK estudiado en metabolismo energético.",
    "description": "AICAR es un análogo de AMP investigado como activador de la vía AMPK en modelos de músculo esquelético, oxidación de glucosa y metabolismo mitocondrial. Solo para uso en investigación (RUO).",
    "presentation": "50 mg – 100 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1379,
    "variants": [
      {
        "presentation": "50 mg",
        "price": 1379,
        "stock": 40,
        "batch_number": "NP-AICA50-2601",
        "id": "2c286d5f-d9c6-4bf3-9a69-3dadada51d40",
        "sku": "AICAR-50MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "100 mg",
        "price": 1919,
        "stock": 40,
        "batch_number": "NP-AICA100-2601",
        "id": "392e8fbc-cb08-4a63-bed4-b3b59711de9d",
        "sku": "AICAR-100MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/aicar.pdf",
    "batch_number": "NP-AICA50-2601",
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
    "short_description": "Fragmento de HGH estudiado en metabolismo lipídico.",
    "description": "AOD-9604 es un fragmento modificado de la región 176-191 de la hormona de crecimiento, investigado en modelos de lipólisis y adipocitos sin la actividad somatotrópica clásica. Solo para uso en investigación (RUO).",
    "presentation": "2 mg – 10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 929,
    "variants": [
      {
        "presentation": "2 mg",
        "price": 929,
        "stock": 40,
        "batch_number": "NP-AOD92-2601",
        "id": "1ad4788e-50c0-409e-b3d7-ab16895edc40",
        "sku": "AOD9604-2MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 949,
        "stock": 40,
        "batch_number": "NP-AOD95-2601",
        "id": "9b73c607-b922-45fe-bc94-c7e9c5979048",
        "sku": "AOD9604-5MG",
        "commission_cap": 0.25,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1889,
        "stock": 40,
        "batch_number": "NP-AOD910-2601",
        "id": "ea123747-3255-47ab-8c5b-4e764d080dd4",
        "sku": "AOD9604-10MG",
        "commission_cap": 0.25,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/aod-9604.pdf",
    "batch_number": "NP-AOD92-2601",
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
    "short_description": "Análogo de amilina junto a agonista GLP-1.",
    "description": "Combina cagrilintida, análogo de amilina, con semaglutida, agonista del receptor GLP-1; se investiga la señalización conjunta de ambas vías en modelos de regulación metabólica. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Análogo de amilina, de investigación metabólica.",
    "description": "Cagrilintida es un análogo de amilina de acción prolongada investigado en modelos de saciedad y composición corporal. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1439,
        "stock": 40,
        "batch_number": "NP-CAGR5-2601",
        "id": "1e9b01d9-04f6-4a9d-9abd-41cd6e2da48a",
        "sku": "CAGRILINTIDA-5MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 2229,
        "stock": 40,
        "batch_number": "NP-CAGR10-2601",
        "id": "0a87407d-f81b-44d8-b5f1-c5a13fe06b87",
        "sku": "CAGRILINTIDA-10MG",
        "commission_cap": 0.25,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/cagrilintida.pdf",
    "batch_number": "NP-CAGR2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 0.2,
    "start_unit": "mg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 0.2,
      "tipica": 1.2,
      "avanzada": 2.7,
      "unit": "mg",
      "agua_ml": {
        "10": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
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
    "short_description": "Agonista GLP-1 de acción prolongada, ampliamente estudiado.",
    "description": "Dulaglutida es una proteína de fusión que une un análogo de GLP-1 a un fragmento Fc, investigada en modelos de señalización incretínica y regulación de glucosa. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Compuesto estudiado en transporte de ácidos grasos.",
    "description": "La L-carnitina es un compuesto que participa en el transporte de ácidos grasos hacia la mitocondria, investigado en modelos de oxidación lipídica y metabolismo energético celular. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "400 mg",
        "price": 879,
        "stock": 40,
        "batch_number": "NP-LCAR400-2601",
        "id": "83b887a0-7bdd-4fbd-96bc-cd920e268a18",
        "sku": "LCARNITINE-400MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "600 mg",
        "price": 959,
        "stock": 40,
        "batch_number": "NP-LCAR600-2601",
        "id": "79ad3e2c-ff01-42ba-ab42-0b6d4c9444d9",
        "sku": "LCARNITINE-600MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "1200 mg",
        "price": 1049,
        "stock": 40,
        "batch_number": "NP-LCAR1200-2601",
        "id": "e15cb83b-ccf8-4065-ae95-451375f2074b",
        "sku": "LCARNITINE-1200MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/l-carnitine.pdf",
    "batch_number": "NP-LCAR2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 50,
    "start_unit": "mg",
    "start_freq": "daily",
    "start_levels": {
      "inicial": 50,
      "tipica": 100,
      "avanzada": 200,
      "unit": "mg",
      "agua_ml": {
        "500": 5
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
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
    "short_description": "Solución lipotrópica estudiada en metabolismo de grasas.",
    "description": "LIPO-C es una formulación lipotrópica con metionina, inositol y colina, usada en estudios de metabolismo hepático de lípidos y de movilización de grasa en modelos experimentales. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Agonista del receptor GLP-1, ampliamente estudiado.",
    "description": "Liraglutida es un análogo acilado de GLP-1 con unión a albúmina, investigado en modelos de señalización incretínica, células beta pancreáticas y regulación del apetito. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 2399,
        "stock": 40,
        "batch_number": "NP-LIRA10-2601",
        "id": "23b7dd6b-35ca-4490-a0ad-031bf35eeb08",
        "sku": "LIRAGLUTIDA-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "30 mg",
        "price": 3959,
        "stock": 40,
        "batch_number": "NP-LIRA30-2601",
        "id": "2587dfe1-7cc1-4939-9edd-a3f6e83231e7",
        "sku": "LIRAGLUTIDA-30MG",
        "commission_cap": 0.25,
        "distributor_eligible": false
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
    "short_description": "Péptido mitocondrial de investigación metabólica.",
    "description": "MOTS-c es un péptido de origen mitocondrial investigado en modelos de metabolismo y homeostasis energética. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "15 mg",
        "price": 1059,
        "stock": 40,
        "batch_number": "NP-MOTS15-2601",
        "id": "9e336d64-8af3-4991-ac30-fafb9f736bf2",
        "sku": "MOTSC-15MG",
        "commission_cap": 0.25,
        "distributor_eligible": true
      },
      {
        "presentation": "20 mg",
        "price": 1099,
        "stock": 40,
        "batch_number": "NP-MOTS20-2601",
        "id": "f878af32-45f7-4b6b-82da-52b985ac90ed",
        "sku": "MOTSC-20MG",
        "commission_cap": 0.2,
        "distributor_eligible": false
      },
      {
        "presentation": "40 mg",
        "price": 2799,
        "stock": 40,
        "batch_number": "NP-MOTS40-2601",
        "id": "befcc9bf-0e3d-4a19-a5ca-9ec4512d1a16",
        "sku": "MOTSC-40MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Triple agonista GIP/GLP-1/glucagón, de investigación metabólica.",
    "description": "Retatrutida es un péptido de investigación estudiado como triple agonista de los receptores GIP, GLP-1 y glucagón en modelos de metabolismo y composición corporal. Solo para uso en investigación (RUO).",
    "presentation": "5 mg – 100 mg",
    "form": "Liofilizado",
    "purity": "99.1%",
    "price": 1189,
    "variants": [
      {
        "presentation": "5 mg",
        "price": 1189,
        "stock": 40,
        "batch_number": "NP-RETA5-2601",
        "id": "a01642f8-e679-4f22-a8d9-f182542f1df2",
        "sku": "RETATRUTIDA-5MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 2369,
        "stock": 40,
        "batch_number": "NP-RETA10-2601",
        "id": "3562d760-400f-43a3-aab3-7244a0e7c9e3",
        "sku": "RETATRUTIDA-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "15 mg",
        "price": 2639,
        "stock": 40,
        "batch_number": "NP-RETA15-2601",
        "id": "e08dbda4-8c2a-43ba-a5c7-d800bee95cb1",
        "sku": "RETATRUTIDA-15MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "20 mg",
        "price": 3119,
        "stock": 40,
        "batch_number": "NP-RETA20-2601",
        "id": "f4bedb15-ffc1-456d-9650-73cffcffdcd9",
        "sku": "RETATRUTIDA-20MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "30 mg",
        "price": 4189,
        "stock": 40,
        "batch_number": "NP-RETA30-2601",
        "id": "bd812705-201e-4aef-ade6-af23d6116b36",
        "sku": "RETATRUTIDA-30MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "40 mg",
        "price": 4309,
        "stock": 40,
        "batch_number": "NP-RETA40-2601",
        "id": "cc984cce-c589-4e80-861a-ba6b98e7ad3e",
        "sku": "RETATRUTIDA-40MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "60 mg",
        "price": 5429,
        "stock": 40,
        "batch_number": "NP-RETA60-2601",
        "id": "954a6dc4-dce9-4fdd-8581-e283ad37e6b5",
        "sku": "RETATRUTIDA-60MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "100 mg",
        "price": 7679,
        "stock": 40,
        "batch_number": "NP-RETA100-2601",
        "id": "ee5729da-dadf-4ff2-aa0b-7e8abdb072b4",
        "sku": "RETATRUTIDA-100MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/9259977/pexels-photo-9259977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/retatrutida.pdf",
    "batch_number": "NP-RETA5-2601",
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
    "short_description": "Combinación de agonistas incretínicos triple y dual.",
    "description": "Une retatrutida, agonista triple de GLP-1, GIP y glucagón, con tirzepatida, agonista dual GLP-1/GIP; se investiga la superposición de estas vías en modelos metabólicos. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Agonista GLP-1 para investigación metabólica.",
    "description": "Semaglutida es un péptido agonista del receptor GLP-1 investigado en modelos de metabolismo de la glucosa y el apetito. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-SEMA5-2601",
        "id": "3bc388e8-4498-4aeb-a3da-40fc915dcef3",
        "sku": "SEMAGLUTIDA-5MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1799,
        "stock": 40,
        "batch_number": "NP-SEMA10-2601",
        "id": "fa9def3b-7709-4b56-98f4-ffe83b0a58a9",
        "sku": "SEMAGLUTIDA-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "15 mg",
        "price": 1859,
        "stock": 40,
        "batch_number": "NP-SEMA15-2601",
        "id": "16deb2af-234b-4de8-a968-44aef1fdb929",
        "sku": "SEMAGLUTIDA-15MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "20 mg",
        "price": 2039,
        "stock": 40,
        "batch_number": "NP-SEMA20-2601",
        "id": "7fdfe542-f6f6-46c6-97f4-1bec48fdbdac",
        "sku": "SEMAGLUTIDA-20MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "30 mg",
        "price": 2119,
        "stock": 40,
        "batch_number": "NP-SEMA30-2601",
        "id": "641f267f-9618-418f-90cc-2b2aa9932d2f",
        "sku": "SEMAGLUTIDA-30MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "50 mg",
        "price": 2189,
        "stock": 40,
        "batch_number": "NP-SEMA50-2601",
        "id": "40e13576-9c1c-44bf-85bb-e6b9926bbbaf",
        "sku": "SEMAGLUTIDA-50MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Agonista de ERR explorado como mimético del ejercicio.",
    "description": "SLU-PP-332 es una molécula pequeña agonista de los receptores relacionados con estrógenos, explorada en modelos de metabolismo oxidativo y de respuesta muscular tipo ejercicio. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros: sus tablas traen errores de aritmética comprobados. ⚠️ Esta fuente lo reconstituye con agua bacteriostática MÁS DMSO, no solo agua.",
      "agua_ml": {
        "10": 2
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
    "short_description": "Agonista dual de GLP-1 y glucagón.",
    "description": "Survodutide es un péptido agonista dual de los receptores de GLP-1 y glucagón, investigado en modelos de gasto energético, metabolismo hepático y regulación del peso corporal. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Doble agonista GIP/GLP-1 para investigación.",
    "description": "Tirzepatida es un péptido doble agonista GIP/GLP-1 investigado en modelos de control glucémico y composición corporal. Solo para uso en investigación (RUO).",
    "presentation": "10 mg – 120 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2119,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 2119,
        "stock": 40,
        "batch_number": "NP-TIRZ10-2601",
        "id": "289d914f-67f2-472d-83c1-3809dc0ee225",
        "sku": "TIRZEPATIDA-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "20 mg",
        "price": 2189,
        "stock": 40,
        "batch_number": "NP-TIRZ20-2601",
        "id": "e7856e6b-dcee-4a94-8126-2528113cf4d5",
        "sku": "TIRZEPATIDA-20MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "30 mg",
        "price": 3069,
        "stock": 40,
        "batch_number": "NP-TIRZ30-2601",
        "id": "e5c68138-7652-4036-91c9-8c51f8c379f6",
        "sku": "TIRZEPATIDA-30MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "40 mg",
        "price": 3169,
        "stock": 40,
        "batch_number": "NP-TIRZ40-2601",
        "id": "c5e91908-e427-4af6-b631-b33ae4846c61",
        "sku": "TIRZEPATIDA-40MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "50 mg",
        "price": 3269,
        "stock": 40,
        "batch_number": "NP-TIRZ50-2601",
        "id": "e94e4156-f26e-40b8-aecc-a5cd1583a3a1",
        "sku": "TIRZEPATIDA-50MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "60 mg",
        "price": 3919,
        "stock": 40,
        "batch_number": "NP-TIRZ60-2601",
        "id": "0169ea33-313d-49c8-9681-866f55f854f7",
        "sku": "TIRZEPATIDA-60MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "100 mg",
        "price": 4079,
        "stock": 40,
        "batch_number": "NP-TIRZ100-2601",
        "id": "fcd44c95-cc87-439f-aa1c-daa14c7202cd",
        "sku": "TIRZEPATIDA-100MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "120 mg",
        "price": 4889,
        "stock": 40,
        "batch_number": "NP-TIRZ120-2601",
        "id": "0f8e3f1e-8bc1-413e-aeca-07b16352410a",
        "sku": "TIRZEPATIDA-120MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Péptido derivado de EPO explorado en nervio periférico.",
    "description": "ARA-290 (cibinetide) es un péptido derivado de la eritropoyetina que actúa sobre el receptor innato de reparación, estudiado en modelos de neuropatía e inflamación tisular. Solo para uso en investigación (RUO).",
    "presentation": "10 mg – 16 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1689,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1689,
        "stock": 40,
        "batch_number": "NP-ARA210-2601",
        "id": "17e9db60-aea1-43d4-b37e-7e0a78389f6c",
        "sku": "ARA290-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "16 mg",
        "price": 1739,
        "stock": 40,
        "batch_number": "NP-ARA216-2601",
        "id": "582df66d-c396-44e1-994a-adf34e693203",
        "sku": "ARA290-16MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/ara-290.pdf",
    "batch_number": "NP-ARA210-2601",
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
    "short_description": "Péptido estudiado en reparación de tejidos y mucosa gástrica.",
    "description": "BPC-157 es un péptido de investigación ampliamente estudiado por su rol en la reparación de tejidos, tendones e integridad gastrointestinal. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 839,
        "stock": 40,
        "batch_number": "NP-BPC5-2601",
        "id": "db5309f7-6dde-4c26-9384-016fb7e43792",
        "sku": "BPC157-5MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1109,
        "stock": 40,
        "batch_number": "NP-BPC10-2601",
        "id": "97721d83-199c-4fa6-84c4-b25ada733ca3",
        "sku": "BPC157-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "20 mg",
        "price": 1169,
        "stock": 40,
        "batch_number": "NP-BPC20-2601",
        "id": "d390e21b-2ac7-45e9-9520-ae0d8e807527",
        "sku": "BPC157-20MG",
        "commission_cap": 0.25,
        "distributor_eligible": false
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
    "short_description": "Combinación clásica estudiada en reparación de tejidos.",
    "description": "Combina BPC-157, péptido gástrico estable, con TB-500, fragmento de timosina beta-4; ambos se investigan en modelos de angiogénesis, migración celular y remodelación de tejido conectivo. Solo para uso en investigación (RUO).",
    "presentation": "20 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 2399,
    "variants": [
      {
        "presentation": "20 mg",
        "price": 2399,
        "stock": 40,
        "batch_number": "NP-BPC120-2601",
        "id": "457f70ba-93dc-4290-982d-0ed4e679fb41",
        "sku": "BPC15710MGTB50-20MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Combinación de BPC-157 y TB-500 en reparación tisular.",
    "description": "Presentación de menor gramaje de la combinación BPC-157 y TB-500, estudiada en modelos de cicatrización, angiogénesis y remodelación de tendón, músculo y mucosa intestinal. Solo para uso en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 1749,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 1749,
        "stock": 40,
        "batch_number": "NP-BPC110-2601",
        "id": "504f28a3-aad1-45eb-8c5b-5606f8ab0a58",
        "sku": "BPC1575MGTB500-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Glicoproteína estudiada como antagonista de miostatina.",
    "description": "La folistatina es una glicoproteína que une activinas y miostatina, investigada en modelos de músculo esquelético, señalización TGF-beta y regulación de la masa muscular. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Miostatina estudiada como regulador de masa muscular.",
    "description": "GDF-8, conocida como miostatina, es un factor de la familia TGF-beta investigado como regulador negativo del crecimiento muscular en modelos de miocitos y músculo esquelético. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Mezcla de reparación tisular con tripéptido de cobre.",
    "description": "GLOW combina BPC-157, GHK-Cu y TB-500; la mezcla se investiga por la superposición de vías de angiogénesis, migración celular y remodelación de matriz en piel y tejido conectivo. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Mezcla de cuatro péptidos de reparación y matriz.",
    "description": "KLOW combina BPC-157, GHK-Cu, TB-500 y KPV; se investiga por la suma de vías de reparación tisular, remodelación de matriz y modulación de la respuesta inflamatoria. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Tripéptido derivado de α-MSH, de investigación.",
    "description": "KPV es un tripéptido investigado en modelos de respuesta inflamatoria y mucosa. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1389,
        "stock": 40,
        "batch_number": "NP-KPV10-2601",
        "id": "a8512d3a-97fa-4100-913d-ea253780eff7",
        "sku": "KPV-10MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Péptido antimicrobiano humano de la familia catelicidina.",
    "description": "LL-37 es la única catelicidina humana, investigada en modelos de inmunidad innata, actividad antimicrobiana de amplio espectro, angiogénesis y cicatrización de heridas. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.4,
        "distributor_eligible": true
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
    "short_description": "Dominio de transducción explorado como vehículo intracelular.",
    "description": "PTD-1 es un péptido de penetración celular de la familia de dominios de transducción de proteínas, explorado como vehículo de entrega intracelular; su literatura pública es limitada. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Péptido que modula la vía Wnt en folículo.",
    "description": "PTD-DBM es un péptido diseñado para interrumpir la interacción CXXC5-Dishevelled y liberar la señalización Wnt, investigado en modelos murinos de folículo piloso y cicatrización. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Fracción de timosina beta-4 estudiada en movilidad celular.",
    "description": "TB-500 es investigado por su papel en la migración celular y recuperación tisular amplia. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 1319,
        "stock": 40,
        "batch_number": "NP-TB5-2601",
        "id": "0dd5eec2-2a0e-4384-b7d3-1c32f1d490cb",
        "sku": "TB500-5MG",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mg",
        "price": 1429,
        "stock": 40,
        "batch_number": "NP-TB10-2601",
        "id": "7ca299ad-2828-439e-92b7-0b77e280b6d4",
        "sku": "TB500-10MG",
        "commission_cap": 0.25,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/tb-500.pdf",
    "batch_number": "NP-TB2-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1,
    "start_unit": "mg",
    "start_freq": "2x_week",
    "start_levels": {
      "inicial": 1,
      "tipica": 2,
      "avanzada": 3,
      "unit": "mg",
      "agua_ml": {
        "10": 2
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
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
    "short_description": "GnRH sintética estudiada en el eje reproductivo.",
    "description": "Gonadorelina es la forma sintética de la hormona liberadora de gonadotropinas, investigada en modelos del eje hipotálamo-hipófisis-gónada y de liberación pulsátil de LH y FSH. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mg",
        "price": 889,
        "stock": 40,
        "batch_number": "NP-GONA5-2601",
        "id": "23040e1b-4339-4b30-b62b-f4d50db9805f",
        "sku": "GONADORELINACE-5MG",
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Gonadotropina que actúa sobre el receptor de LH.",
    "description": "La gonadotropina coriónica humana es una hormona glicoproteica investigada por su actividad sobre el receptor de LH en células de Leydig y en modelos de esteroidogénesis gonadal. Solo para uso en investigación (RUO).",
    "presentation": "2,000IU – 10,000IU",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 609,
    "variants": [
      {
        "presentation": "1,000 IU",
        "price": 629,
        "stock": 40,
        "batch_number": "NP-HCG2000-2601",
        "id": "2681f24c-6203-4813-80ad-9c7b88871311",
        "sku": "HCG-1000IU",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "2,000IU",
        "price": 609,
        "stock": 40,
        "batch_number": "NP-HCG2000-2601",
        "id": "799774c2-d701-4db3-98e9-1a9a4b250296",
        "sku": "HCG-2000IU",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "5,000IU",
        "price": 1509,
        "stock": 40,
        "batch_number": "NP-HCG5000-2601",
        "id": "5ad5ffaa-9242-49c5-b869-88baceae9785",
        "sku": "HCG-5000IU",
        "commission_cap": 0.4,
        "distributor_eligible": true
      },
      {
        "presentation": "10,000IU",
        "price": 2269,
        "stock": 40,
        "batch_number": "NP-HCG10000-2601",
        "id": "9477d32e-5227-4d2d-b5e5-6bc688adee92",
        "sku": "HCG-10000IU",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Gonadotropinas menopáusicas estudiadas en foliculogénesis.",
    "description": "HMG (menotropinas) es una preparación con actividad FSH y LH, investigada en modelos de foliculogénesis, esteroidogénesis ovárica y estimulación gonadal. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Análogo de melanocortina, de investigación.",
    "description": "PT-141 (Bremelanotida) es un péptido investigado en modelos de señalización de melanocortina. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.3,
        "distributor_eligible": true
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
    "short_description": "Agonista de GnRH estudiado en el eje gonadal.",
    "description": "Triptorelina es un análogo agonista de GnRH investigado en modelos del eje hipotálamo-hipófisis-gónada, donde la estimulación sostenida produce desensibilización de los receptores hipofisarios. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Diluyente estéril de laboratorio con conservador.",
    "description": "Insumo de laboratorio: agua estéril con alcohol bencílico como conservador, utilizada para reconstituir compuestos liofilizados en trabajo experimental. No es un péptido. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mL",
        "price": 239,
        "stock": 40,
        "batch_number": "NP-AGUA10-2601",
        "id": "38e8b549-c62f-474d-8810-ad8e6de08c12",
        "sku": "AGUABACTERIOST-10ML",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
    "short_description": "Solución de cianocobalamina para uso en laboratorio.",
    "description": "Solución de vitamina B12 (cianocobalamina) a 1 mg/mL, utilizada como reactivo y control en estudios de metabolismo de un carbono y en ensayos bioquímicos. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/b12.pdf",
    "batch_number": "NP-B121-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1000,
    "start_unit": "mcg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 1000,
      "tipica": 2500,
      "avanzada": 5000,
      "unit": "mcg",
      "agua_ml": {
        "10": 1
      },
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía; nuestras rayitas se recalculan, no se copian de su tabla)"
    },
    "featured": false,
    "is_new": false
  },
  {
    "id": "fallback-vitamina-b12",
    "name": "Vitamina B12",
    "slug": "vitamina-b12",
    "category": "suministros",
    "categories": [
      "suministros"
    ],
    "short_description": "Cianocobalamina usada como reactivo de laboratorio.",
    "description": "La vitamina B12 (cianocobalamina) es un cofactor esencial estudiado en el metabolismo de un carbono, la síntesis de mielina y ensayos bioquímicos de referencia. Solo para uso en investigación (RUO).",
    "presentation": "10 mg",
    "form": "Liofilizado",
    "purity": "99.0%",
    "price": 699,
    "variants": [
      {
        "presentation": "10 mg",
        "price": 699,
        "stock": 40,
        "batch_number": "NP-VITA10-2601",
        "id": "63699f2e-cd73-427e-93e0-3c5e9c4bd00d",
        "sku": "VITAMINAB12-10MG",
        "commission_cap": 0.35,
        "distributor_eligible": true
      }
    ],
    "tiers": [],
    "stock": 40,
    "image_url": "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "coa_url": "https://exygenlabs.com/coa/vitamina-b12.pdf",
    "batch_number": "NP-VITA10-2601",
    "storage": "Conservar a -20 °C, protegido de la luz. Reconstituido: 2–8 °C.",
    "start_dose": 1000,
    "start_unit": "mcg",
    "start_freq": "weekly",
    "start_levels": {
      "inicial": 1000,
      "tipica": 2500,
      "avanzada": 5000,
      "unit": "mcg",
      "fuente": "researchdosing.com — manual de dosificación del mercado (fuente de vendedor, sin bibliografía). Las rayitas las recalculamos nosotros."
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
    "short_description": "Disolvente de laboratorio para péptidos poco solubles.",
    "description": "Insumo de laboratorio: solución diluida de ácido acético utilizada como disolvente para reconstituir péptidos de baja solubilidad en agua. No es un péptido. Solo para uso en investigación (RUO).",
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
        "commission_cap": 0.35,
        "distributor_eligible": true
      },
      {
        "presentation": "5 mL",
        "price": 279,
        "stock": 40,
        "batch_number": "NP-CIDO5-2601",
        "id": "66f91f7f-5c40-4da9-98f2-3a5a49af7103",
        "sku": "ACIDOACETICO-5ML",
        "commission_cap": 0.3,
        "distributor_eligible": true
      },
      {
        "presentation": "10 mL",
        "price": 299,
        "stock": 40,
        "batch_number": "NP-CIDO10-2601",
        "id": "7aea7b2e-3d27-49f4-9d6a-54d4326e5496",
        "sku": "ACIDOACETICO-10ML",
        "commission_cap": 0.35,
        "distributor_eligible": true
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
