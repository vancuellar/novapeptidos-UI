// Nombres y descripciones del catálogo en en-US.
//
// Se baja junto con los textos de ese idioma y sólo cuando hace falta: en
// español no se usa ni una línea de este archivo (el catálogo ya viene en
// español desde el backend). Ver ./loader.js.

const catalogo = {
  categories: {
    "perdida-peso": {
      "name": "Weight Loss / Metabolic",
      "description": "Research peptides for metabolism and body composition."
    },
    "recuperacion": {
      "name": "Recovery and Tissue",
      "description": "Peptides studied in tissue, tendon, and gastric mucosa repair."
    },
    "sexual-hormonal": {
      "name": "Sexual and Hormonal Health",
      "description": "Research peptides studied in libido and the hormonal axis."
    },
    "estetica": {
      "name": "Aesthetics and Skin",
      "description": "Research peptides studied in collagen, skin, and hair."
    },
    "bioreguladores": {
      "name": "Bioregulators",
      "description": "Short peptides studied as tissue-specific regulators."
    },
    "suministros": {
      "name": "Supplies",
      "description": "Research supplies: bacteriostatic water, vials, and syringes."
    },
    "otros": {
      "name": "Specialty",
      "description": "Specialty research compounds outside the main categories."
    },
    "recuperacion-tejidos": {
      "name": "Recovery and Tissue",
      "description": "Peptides studied in tissue, tendon, and gastric mucosa repair."
    },
    "hormona-crecimiento": {
      "name": "Growth Hormone",
      "description": "Secretagogues and peptides related to GH signaling."
    },
    "metabolicos": {
      "name": "Metabolic",
      "description": "Research peptides for metabolism and body composition."
    },
    "longevidad": {
      "name": "Longevity",
      "description": "Peptides studied in cellular aging and mitochondrial function."
    },
    "nootropicos": {
      "name": "Nootropics",
      "description": "Research peptides for cognitive function and stress."
    },
    "bienestar": {
      "name": "Wellness",
      "description": "Research peptides for sleep, skin, and general wellness."
    },
    "stacks": {
      "name": "Stacks / Combos",
      "description": "Peptide combinations for research protocols."
    },
    "accesorios": {
      "name": "Accessories",
      "description": "Research supplies: bacteriostatic water, vials, and syringes."
    }
  },
  products: {
    "bpc-157-5mg": {
      "short_description": "Peptide studied in tissue and gastric mucosa repair.",
      "description": "BPC-157 is a research peptide widely studied for its role in tissue, tendon, and gastrointestinal integrity repair. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    },
    "bpc-157-10mg": {
      "short_description": "Higher concentration for extended research protocols.",
      "description": "10 mg BPC-157 presentation for studies requiring more material. HPLC-verified purity. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    },
    "tb-500-5mg": {
      "short_description": "Thymosin beta-4 fragment studied in cell mobility.",
      "description": "TB-500 is researched for its role in cell migration and broad tissue recovery. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    },
    "ipamorelin-5mg": {
      "short_description": "Selective GH secretagogue, widely studied.",
      "description": "Ipamorelin is a research peptide studied for selective growth hormone signaling. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    },
    "semaglutida-5mg": {
      "name": "Semaglutide 5 mg",
      "short_description": "GLP-1 agonist for metabolic research.",
      "description": "Semaglutide is a GLP-1 receptor agonist peptide researched in glucose metabolism and appetite models. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    },
    "tirzepatida-10mg": {
      "name": "Tirzepatide 10 mg",
      "short_description": "Dual GIP/GLP-1 agonist for research.",
      "description": "Tirzepatide is a dual GIP/GLP-1 agonist peptide researched in glycemic control and body composition models. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    },
    "stack-recuperacion": {
      "name": "Recovery Stack: BPC-157 + TB-500",
      "short_description": "Research combo for tissue recovery.",
      "description": "BPC-157 and TB-500 combination in one kit for research protocols focused on tissue repair. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    },
    "stack-gh": {
      "short_description": "Research combo for GH signaling.",
      "description": "Ipamorelin and CJC-1295 no DAC combination for growth hormone signaling studies. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 C, protected from light. Reconstituted: 2-8 C."
    }
  },
};

export default catalogo;
