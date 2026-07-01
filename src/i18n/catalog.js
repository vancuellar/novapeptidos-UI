const categoryTranslations = {
  'recuperacion-tejidos': {
    'en-US': { name: 'Recovery and Tissue', description: 'Peptides studied in tissue, tendon, and gastric mucosa repair.' },
    'pt-BR': { name: 'Recuperacao e Tecidos', description: 'Peptideos estudados na reparacao de tecidos, tendoes e mucosa gastrica.' },
    'fr-CA': { name: 'Recuperation et tissus', description: 'Peptides etudies pour la reparation des tissus, des tendons et de la muqueuse gastrique.' },
  },
  'hormona-crecimiento': {
    'en-US': { name: 'Growth Hormone', description: 'Secretagogues and peptides related to GH signaling.' },
    'pt-BR': { name: 'Hormonio do Crescimento', description: 'Secretagogos e peptideos relacionados a sinalizacao de GH.' },
    'fr-CA': { name: 'Hormone de croissance', description: 'Secretagogues et peptides lies a la signalisation GH.' },
  },
  metabolicos: {
    'en-US': { name: 'Metabolic', description: 'Research peptides for metabolism and body composition.' },
    'pt-BR': { name: 'Metabolicos', description: 'Peptideos de pesquisa em metabolismo e composicao corporal.' },
    'fr-CA': { name: 'Metaboliques', description: 'Peptides de recherche sur le metabolisme et la composition corporelle.' },
  },
  longevidad: {
    'en-US': { name: 'Longevity', description: 'Peptides studied in cellular aging and mitochondrial function.' },
    'pt-BR': { name: 'Longevidade', description: 'Peptideos estudados no envelhecimento celular e na funcao mitocondrial.' },
    'fr-CA': { name: 'Longevite', description: 'Peptides etudies dans le vieillissement cellulaire et la fonction mitochondriale.' },
  },
  nootropicos: {
    'en-US': { name: 'Nootropics', description: 'Research peptides for cognitive function and stress.' },
    'pt-BR': { name: 'Nootropicos', description: 'Peptideos de pesquisa em funcao cognitiva e estresse.' },
    'fr-CA': { name: 'Nootropiques', description: 'Peptides de recherche sur la fonction cognitive et le stress.' },
  },
  bienestar: {
    'en-US': { name: 'Wellness', description: 'Research peptides for sleep, skin, and general wellness.' },
    'pt-BR': { name: 'Bem-estar', description: 'Peptideos de pesquisa em sono, pele e bem-estar geral.' },
    'fr-CA': { name: 'Bien-etre', description: 'Peptides de recherche sur le sommeil, la peau et le bien-etre general.' },
  },
  stacks: {
    'en-US': { name: 'Stacks / Combos', description: 'Peptide combinations for research protocols.' },
    'pt-BR': { name: 'Stacks / Combos', description: 'Combinacoes de peptideos para protocolos de pesquisa.' },
    'fr-CA': { name: 'Stacks / Combos', description: 'Combinaisons de peptides pour protocoles de recherche.' },
  },
  accesorios: {
    'en-US': { name: 'Accessories', description: 'Research supplies: bacteriostatic water, vials, and syringes.' },
    'pt-BR': { name: 'Acessorios', description: 'Insumos para pesquisa: agua bacteriostatica, frascos e seringas.' },
    'fr-CA': { name: 'Accessoires', description: 'Fournitures de recherche: eau bacteriostatique, fioles et seringues.' },
  },
};

const productTranslations = {
  'bpc-157-5mg': {
    'en-US': {
      short_description: 'Peptide studied in tissue and gastric mucosa repair.',
      description: 'BPC-157 is a research peptide widely studied for its role in tissue, tendon, and gastrointestinal integrity repair. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      short_description: 'Peptideo estudado na reparacao de tecidos e mucosa gastrica.',
      description: 'BPC-157 e um peptideo de pesquisa amplamente estudado por seu papel na reparacao de tecidos, tendoes e integridade gastrointestinal. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
  'bpc-157-10mg': {
    'en-US': {
      short_description: 'Higher concentration for extended research protocols.',
      description: '10 mg BPC-157 presentation for studies requiring more material. HPLC-verified purity. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      short_description: 'Maior concentracao para protocolos de pesquisa estendidos.',
      description: 'Apresentacao de 10 mg de BPC-157 para estudos que exigem mais material. Pureza verificada por HPLC. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
  'tb-500-5mg': {
    'en-US': {
      short_description: 'Thymosin beta-4 fragment studied in cell mobility.',
      description: 'TB-500 is researched for its role in cell migration and broad tissue recovery. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      short_description: 'Fragmento de timosina beta-4 estudado na mobilidade celular.',
      description: 'TB-500 e pesquisado por seu papel na migracao celular e recuperacao ampla de tecidos. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
  'ipamorelin-5mg': {
    'en-US': {
      short_description: 'Selective GH secretagogue, widely studied.',
      description: 'Ipamorelin is a research peptide studied for selective growth hormone signaling. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      short_description: 'Secretagogo seletivo de GH, amplamente estudado.',
      description: 'Ipamorelin e um peptideo de pesquisa estudado pela sinalizacao seletiva do hormonio do crescimento. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
  'semaglutida-5mg': {
    'en-US': {
      name: 'Semaglutide 5 mg',
      short_description: 'GLP-1 agonist for metabolic research.',
      description: 'Semaglutide is a GLP-1 receptor agonist peptide researched in glucose metabolism and appetite models. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      name: 'Semaglutida 5 mg',
      short_description: 'Agonista GLP-1 para pesquisa metabolica.',
      description: 'Semaglutida e um peptideo agonista do receptor GLP-1 pesquisado em modelos de metabolismo da glicose e apetite. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
  'tirzepatida-10mg': {
    'en-US': {
      name: 'Tirzepatide 10 mg',
      short_description: 'Dual GIP/GLP-1 agonist for research.',
      description: 'Tirzepatide is a dual GIP/GLP-1 agonist peptide researched in glycemic control and body composition models. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      name: 'Tirzepatida 10 mg',
      short_description: 'Duplo agonista GIP/GLP-1 para pesquisa.',
      description: 'Tirzepatida e um peptideo duplo agonista GIP/GLP-1 pesquisado em modelos de controle glicemico e composicao corporal. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
  'stack-recuperacion': {
    'en-US': {
      name: 'Recovery Stack: BPC-157 + TB-500',
      short_description: 'Research combo for tissue recovery.',
      description: 'BPC-157 and TB-500 combination in one kit for research protocols focused on tissue repair. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      name: 'Stack Recuperacao: BPC-157 + TB-500',
      short_description: 'Combo de pesquisa para recuperacao de tecidos.',
      description: 'Combinacao de BPC-157 e TB-500 em um unico kit para protocolos de pesquisa focados na reparacao de tecidos. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
  'stack-gh': {
    'en-US': {
      short_description: 'Research combo for GH signaling.',
      description: 'Ipamorelin and CJC-1295 no DAC combination for growth hormone signaling studies. Research use only (RUO).',
      form: 'Lyophilized',
      storage: 'Store at -20 C, protected from light. Reconstituted: 2-8 C.',
    },
    'pt-BR': {
      short_description: 'Combo de pesquisa para sinalizacao de GH.',
      description: 'Combinacao de Ipamorelin e CJC-1295 sem DAC para estudos de sinalizacao do hormonio do crescimento. Somente para uso em pesquisa (RUO).',
      form: 'Liofilizado',
      storage: 'Conservar a -20 C, protegido da luz. Reconstituido: 2-8 C.',
    },
  },
};

export const localizeCategory = (category, language) => ({
  ...category,
  ...(categoryTranslations[category.slug]?.[language] || {}),
});

export const localizeProduct = (product, language) => ({
  ...product,
  ...(productTranslations[product.slug]?.[language] || {}),
});

export const localizeCategories = (categories, language) => categories.map((category) => localizeCategory(category, language));
export const localizeProducts = (products, language) => products.map((product) => localizeProduct(product, language));
