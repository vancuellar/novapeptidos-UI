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
    "bronchogen": {
      "short_description": "Studied for its effect on the tissue that lines the bronchi.",
      "description": "Bronchogen is a very short peptide: a chain of just a few amino acids, the pieces that proteins are built from. It has been studied mostly in the lab, looking at the tissue that lines the bronchi and the lungs. Much of that research comes from Russian groups who work with this family of short peptides. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cardiogen": {
      "short_description": "Studied for its effect on heart tissue.",
      "description": "Cardiogen is a very short peptide from the same Russian family as Bronchogen and Cortagen. Research has been done mostly in the lab and in animals, looking at heart muscle and blood vessels. It is one of the compounds that has been worked on mainly in the lab. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cartalax": {
      "short_description": "Studied for its effect on cartilage and connective tissue.",
      "description": "Cartalax is a peptide of just three amino acids, the smallest pieces proteins are built from. It has been studied in the lab with the cells that make cartilage and with the tissue that holds joints together. It belongs to the same Russian family of short peptides as Pinealon and Cortagen. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cortagen": {
      "short_description": "Studied for its effect on nerve tissue.",
      "description": "Cortagen is a very short peptide from the Russian family of bioregulators. It has been studied in the lab and in animals, looking at the brain cortex and the nerves in the rest of the body. It is one of the compounds worked on mainly in the lab. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "crystagen": {
      "short_description": "Studied for its effect on the body's defenses.",
      "description": "Crystagen is a short peptide from the Russian family of bioregulators. It has been studied in the lab with lymphocytes, the white blood cells in charge of defending the body. The published work has been done mostly in cell cultures. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "pinealon": {
      "short_description": "Studied for its effect on neurons and cell wear.",
      "description": "Pinealon is a three amino acid peptide from the Russian family of bioregulators. It has been studied in the lab and in animals, looking at neurons and the wear cells take when they work under stress. Researchers have also looked at how it influences which genes switch on inside the cell. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "thymalin": {
      "short_description": "Studied for its effect on the body's defenses.",
      "description": "Thymalin is a mix of peptides obtained from the thymus, the gland where the body's defense cells mature. It has been studied for its effect on those cells, in the lab and in animals, and there is also older work in people. It is one of the compounds with the longest history in this family. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "thymosin-alpha-1": {
      "short_description": "Studied for its role in the body's defenses.",
      "description": "Thymosin alpha-1 is a 28 amino acid peptide the body itself makes in the thymus, the gland where defense cells mature. It has been studied quite a bit: in the lab, in animals and in people. The research focuses on how it wakes up the cells that alert the body when something foreign shows up. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ahk-cu": {
      "short_description": "Studied for its effect on the hair follicle and the skin.",
      "description": "AHK-Cu is a small peptide bound to copper. It has been studied in the lab with the root of the hair and with the cells that form new blood vessels. It also appears in work on the structure that supports the skin from within. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "botulinum-toxin": {
      "short_description": "A lab protein measured in units, not in milligrams.",
      "description": "Botulinum toxin is a very well known and very well studied protein, in the lab, in animals and in people. Research focuses on how it slows down the signal that travels from nerve to muscle. It is measured in biological units, not milligrams: that is why the vial says IU and not mg. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ghk-cu": {
      "short_description": "Studied for its effect on skin and hair.",
      "description": "GHK-Cu is a three amino acid peptide bound to copper; the body makes it naturally and levels drop with age. It is one of the most studied compounds in the lab within experimental cosmetics. Research looks at how it acts on the structure that gives skin its firmness and on the hair follicle. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "lemon-bottle": {
      "short_description": "A solution of riboflavin, lecithin and bromelain, studied on fat cells.",
      "description": "Lemon Bottle is not a peptide: it is a solution that mixes three familiar ingredients, riboflavin (vitamin B2), lecithin and bromelain (an enzyme from pineapple). It has been studied in the lab with the cells that store fat. It comes ready in a 10 mL bottle, not as a powder. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "matrixyl": {
      "short_description": "Studied for its effect on the skin's collagen.",
      "description": "Matrixyl is a short peptide widely used in cosmetics; its technical name is palmitoyl pentapeptide-4. It has been studied in the lab with the skin cells that make collagen, which is what gives skin its firmness. It is one of the cosmetic peptides with the most published work. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "snap-8": {
      "short_description": "Cosmetic peptide studied on the nerve to muscle signal.",
      "description": "SNAP-8 is an eight amino acid peptide used in cosmetics. It has been studied in the lab for how it interferes with the mechanism that releases the signal from nerve to muscle. The published work has been done mostly in cell cultures. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cjc-1295-no-dac-5mg-ipamorelin-5mg": {
      "short_description": "Two growth hormone peptides in a single vial.",
      "description": "This vial holds two peptides together: CJC-1295 no DAC and Ipamorelin. Both are studied for their effect on growth hormone, but each pushes it along a different route, which is why they are researched as a pair. The work has been done mostly in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "fragment-17-23": {
      "short_description": "The core piece of TB-500, studied in repair.",
      "description": "Fragment 17-23 is the core piece of TB-500: seven amino acids, exactly the part that latches onto actin, a protein cells use to move. It has been studied in the lab for cell movement and the formation of new blood vessels. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ghrp-2-acetate": {
      "short_description": "Studied because it makes the body release growth hormone.",
      "description": "GHRP-2 is a short peptide of six amino acids. It is studied because it signals the body to release its own growth hormone, rather than supplying it from outside. There is work in the lab, in animals and in people. It is one of the veterans of its family. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ghrp-6-acetate": {
      "short_description": "Studied for growth hormone and for appetite.",
      "description": "GHRP-6 is a six amino acid peptide, a sibling of GHRP-2. It acts on the same switch ghrelin uses, the hormone that tells the brain it is hungry. That is why it is studied on two fronts: growth hormone release and appetite. There is work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "hexarelin-acetate": {
      "short_description": "Studied for growth hormone and for heart tissue.",
      "description": "Hexarelin is a six amino acid peptide made in the lab. It is studied for two things: the signal that releases growth hormone and its effect on heart tissue. There is work in the lab, in animals and some studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "hgh": {
      "short_description": "Human growth hormone, one of the most studied compounds there is.",
      "description": "HGH is human growth hormone, made in the lab but identical to the one the body produces. It is one of the compounds with the most published research: in the lab, in animals and in people, going back decades. It is studied for how it acts on growth and on the handling of proteins and fats. It is measured in units (IU), not milligrams. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "hgh-fragment-176-191": {
      "short_description": "A piece of growth hormone, studied on fat cells.",
      "description": "This compound is only a small piece of growth hormone: the 176-191 stretch of the whole molecule. It is studied because in the lab and in animals researchers have looked at its effect on the cells that store fat, without carrying over the other effects of the full hormone. The research has been done mostly outside humans. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "igf-1-lr3": {
      "short_description": "A long lasting version of a growth factor.",
      "description": "IGF-1 LR3 is a modified version of IGF-1, a growth factor the body makes in the liver. The change keeps it active longer, because the proteins that normally hold it back stick to it less. It has been studied mostly in cell cultures. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ipamorelin": {
      "short_description": "Studied because it asks for growth hormone without moving others.",
      "description": "Ipamorelin is a short peptide, well known within this group. It is studied because it gives the signal to release growth hormone quite cleanly: it barely moves the body's other hormones. The published work comes mostly from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "mgf": {
      "short_description": "Studied in muscle repair after effort.",
      "description": "MGF is a variant of IGF-1 that muscle produces when it is put under strain. It has been studied in the lab and in animals, looking at the cells that repair muscle fiber after damage. It is a compound worked on mainly outside humans. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "peg-mgf": {
      "short_description": "The same MGF, with a coating that makes it last longer.",
      "description": "PEG-MGF is MGF with an added coating (the PEG) that helps it hold up longer before breaking down. It is studied for the same thing as MGF: the cells that repair muscle fiber. The research has been done mostly in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "sermorelina": {
      "short_description": "Studied because it asks the body for its own growth hormone.",
      "description": "Sermorelin is the active piece of the natural signal the brain sends to release growth hormone. Being only that piece, it does not last long and its effect is brief. It is one of the most studied in its group: there is work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "tesamorelin-10-ipamorelin-5": {
      "short_description": "Tesamorelin and Ipamorelin together in one vial.",
      "description": "This vial holds two peptides together: tesamorelin and ipamorelin. Both are studied for their effect on growth hormone, and each pushes it along a different route, which is why they are researched as a pair. Each one on its own has its own literature; the combination has been studied less. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "epithalon": {
      "short_description": "Studied in cell aging and in the body's day and night clock.",
      "description": "Epithalon is a four amino acid peptide. It is studied for two things: the enzyme that looks after the tips of the chromosomes, which shorten with age, and the internal clock that marks day and night. There is work in the lab, in animals and some studies in people, mostly from Russian groups. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "foxo4": {
      "short_description": "Studied on the old cells the body no longer renews.",
      "description": "FOXO4-DRI is a peptide designed in the lab to slot between two proteins that work together inside the cell. It is studied in the field of senescent cells, cells that stopped dividing but are still there. All the published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "glutation": {
      "name": "Glutathione",
      "short_description": "An antioxidant the body makes itself, widely studied.",
      "description": "Glutathione is an antioxidant the body produces on its own; it is present in every cell. It is studied for its role when a cell works under strain and wears down. It is one of the compounds with the most accumulated research: in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "humanin": {
      "short_description": "Studied for how it protects the cell when it is under strain.",
      "description": "Humanin is a curious peptide: it does not come from the DNA in the nucleus but from that of the mitochondria, the tiny power plants inside every cell. It is studied for how it protects the cell when under strain, including neurons. There is a good amount of work in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "nad-plus": {
      "short_description": "Studied for its role in cell energy. The 500 mg vial lasts about 5 weeks.",
      "description": "NAD+ is a molecule every cell uses to produce energy; the amount drops with age. It is one of the most studied compounds in the field of cell aging: there is work in the lab, in animals and in people. It is not a peptide, it is a coenzyme. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ss-31": {
      "short_description": "Studied inside the cell's power plants.",
      "description": "SS-31 (also called elamipretide) is a four amino acid peptide that settles inside the mitochondria, the part of the cell that makes energy. It is studied for how that mitochondria behaves when it is worn down. There is work in the lab, in animals and also studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cerebrolysin": {
      "short_description": "A mix of peptides studied on brain cells.",
      "description": "Cerebrolysin is not a single peptide: it is a mix of small peptides obtained from pig tissue. It is studied in the field of neuron protection and how brain connections recover. It has decades of literature, mostly European and Asian, with work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "dsip": {
      "short_description": "Studied for its relationship with deep sleep.",
      "description": "DSIP owes its name to sleep: the initials stand for delta sleep inducing peptide, delta being the deepest phase of the night. It was discovered in the seventies and has been studied since then in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "melatonina": {
      "name": "Melatonin",
      "short_description": "The body clock hormone, one of the most studied there is.",
      "description": "Melatonin is the hormone the body makes when it gets dark and that marks bedtime; a tiny gland in the brain produces it. It is one of the compounds with the most published research: in the lab, in animals and in a great many people. It is also studied for its role as an antioxidant inside the cell. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "orexin-a": {
      "short_description": "Studied for its role in staying awake and in appetite.",
      "description": "Orexin A is a signal the brain makes that helps keep the body awake and alert. It also takes part in hunger. It is studied mostly in the lab and in animals, with some work in people, and it is a key piece for understanding the sleep and wake cycle. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "orexin-b": {
      "short_description": "The other orexin, studied in sleep and alertness.",
      "description": "Orexin B is the second of the two orexin signals the brain makes. It resembles orexin A but prefers one of the two switches where they act. It is studied in sleep, alertness and energy use, with work done mostly in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "pe-22-28": {
      "short_description": "Studied in mood and in brain connections.",
      "description": "PE-22-28 is a short version of spadin, a peptide the body itself produces. It acts on a gate in neurons called TREK-1. It has been studied in the lab and in animals, in the field of mood and of how new connections form in the brain. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "pnc-27": {
      "short_description": "Studied in the lab with tumor cell lines.",
      "description": "PNC-27 joins two parts: a piece of the p53 protein, the one that watches over the state of the cell, and a tail that lets it cross the membrane. It has been studied in the lab, in tumor cell cultures, looking at how it behaves once it reaches the membrane. All the published work has been done in cell cultures. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "selank": {
      "short_description": "Studied in anxiety and in the body's defenses.",
      "description": "Selank is a short peptide developed in Russia from a molecule the body already produces. It is studied on two fronts: anxiety and the response of the body's defenses. There is work in the lab, in animals and also studies in people, most of them published in Russian. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "semax": {
      "short_description": "Studied in memory and in protecting neurons.",
      "description": "Semax is a short peptide developed in Russia, derived from a hormone the body already produces. It is studied in memory, attention and the protection of neurons. It is one of the most worked on in its family: there are studies in the lab, in animals and in people, almost all published in Russian. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "acth-1-39": {
      "short_description": "The full hormone, studied on the adrenal glands.",
      "description": "ACTH 1-39 is the whole hormone the pituitary sends out to wake up the adrenal glands, the ones sitting on top of the kidneys. It is studied for that line of communication and for how those glands make their hormones. It is a well known molecule, with work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "admax": {
      "short_description": "A relative of Semax, studied on brain connections.",
      "description": "ADMAX is a modified version of Semax, so it comes from the same Russian family of short peptides. It has been studied in the lab with neurons, looking at two substances the brain uses to keep and build connections. It is one of the compounds worked on mainly in the lab. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "b7-33": {
      "short_description": "Studied in tissue that stiffens from internal scarring.",
      "description": "B7-33 is a simplified version of relaxin, a hormone the body produces. It is studied in fibrosis, which is when a tissue stiffens because it fills with internal scarring; it has been looked at in heart, kidney and lung. The published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cjc-1295-con-dac": {
      "short_description": "Long lasting version: it stays in circulation for days.",
      "description": "CJC-1295 with DAC asks the body to release its own growth hormone. The DAC add-on makes it grab onto a blood protein and hold up for several days instead of hours. There is work in the lab, in animals and studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cjc-1295-sin-dac": {
      "short_description": "Short version: it does its job and clears quickly.",
      "description": "CJC-1295 no DAC asks the body to release its own growth hormone, just like the DAC version, but without the add-on that makes it last for days: this one acts and clears in a short time. It is studied mostly in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "epo": {
      "short_description": "The hormone that orders red blood cells to be made.",
      "description": "Erythropoietin, or EPO, is the hormone the kidney sends out so the marrow makes red blood cells. It is studied for that order and for what happens when oxygen runs short. It is a very well known and heavily researched molecule: in the lab, in animals and in people. It is measured in units (IU). Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "kisspeptina-10": {
      "name": "Kisspeptin-10",
      "short_description": "Studied for its role in reproductive hormones.",
      "description": "Kisspeptin-10 is the signal the brain uses to start the chain of reproductive hormones. It is studied for exactly that: it is the piece that gets the system going. There is work in the lab, in animals and also studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "mazdutida": {
      "name": "Mazdutide",
      "short_description": "Studied in blood sugar handling and energy use.",
      "description": "Mazdutide is a peptide that mimics two signals the body already uses to say it has eaten and to move its reserves. It is studied in blood sugar handling and energy use. It has work in the lab, in animals and studies in people, mostly in China. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "melanotan-i": {
      "short_description": "Studied for its effect on skin pigment.",
      "description": "Melanotan I, also called afamelanotide, mimics a hormone the body produces that tells the skin to make pigment. It is studied precisely in the cells that make that pigment. There is work in the lab, in animals and also studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "melanotan-2": {
      "short_description": "Studied for its effect on skin pigment.",
      "description": "Melanotan II is a close relative of Melanotan I and also mimics the hormone that asks the skin to make pigment, though it touches more switches than that one. It is studied in pigment cells. There is work in the lab, in animals and studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "mic-lipo-c-b12": {
      "short_description": "A mix of methionine, inositol, choline and vitamin B12.",
      "description": "MIC is not a peptide: it is a mix of three well known substances, methionine, inositol and choline, with vitamin B12 added. It is studied in how the liver handles fats. The first three ingredients are found in everyday food. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "oxitocina": {
      "name": "Oxytocin",
      "short_description": "A very well known hormone, studied in bonding and trust.",
      "description": "Oxytocin is a small hormone of nine amino acids that the body itself makes. It is known for its role in bonding between people and in childbirth. It is studied in the lab, in animals and in people; it is one of the hormones with the most published literature. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "p21": {
      "short_description": "Studied in the formation of new neurons.",
      "description": "P21 comes from a factor the body uses to look after neurons. It is studied in the hippocampus, the area of the brain where new neurons form and memory is stored. The published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "somatropina-hgh-191aa": {
      "name": "Somatropin (HGH 191AA)",
      "short_description": "Full human growth hormone, 191 amino acids long.",
      "description": "Somatropin is human growth hormone with its complete 191 amino acid chain, made in the lab but identical to the body's own. It is one of the compounds with the most published research, in the lab, in animals and in people. It is measured in units (IU), not milligrams. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "tesamorelina": {
      "name": "Tesamorelin",
      "short_description": "Studied in abdominal fat and growth hormone.",
      "description": "Tesamorelin is a reinforced version of the natural signal that calls for growth hormone; the reinforcement helps it hold up longer before breaking down. It is studied in fat handling and body composition. There is work in the lab, in animals and studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "vip": {
      "short_description": "Studied in blood vessels and in inflammation.",
      "description": "VIP is a 28 amino acid peptide the body makes that helps blood vessels open up. It also takes part in the response of the body's defenses when there is inflammation. It is studied in the lab, in animals and in people; it is a well known molecule. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "5-amino-1mq": {
      "short_description": "Studied for its effect on the cells that store fat.",
      "description": "5-Amino-1MQ is a small molecule, not a peptide. It is studied because it slows down an enzyme that works inside the cells that store fat, and along the way it influences NAD+, which is what the cell uses to produce energy. The research has been done in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "aicar": {
      "short_description": "Studied in how muscle produces and spends energy.",
      "description": "AICAR is a small molecule, not a peptide. It is studied because it flips a switch the cell uses when it is short of energy, the same one exercise turns on. The work has been done in the lab and in animals, mostly in muscle. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "aod-9604": {
      "short_description": "A modified piece of growth hormone, looked at in fat cells.",
      "description": "AOD-9604 is a small piece of growth hormone that was modified in the lab. It is studied for its effect on the cells that store fat, without carrying over the other effects of the whole hormone. There is work in the lab, in animals and also studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cagri-sema-2-5mg-2-5mg": {
      "short_description": "Cagrilintide and semaglutide together in one vial.",
      "description": "This vial holds two peptides together: cagrilintide and semaglutide. Each one mimics a different signal the body uses to say it has eaten, which is why they are studied as a pair. Both, separately, have studies in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "cagrilintida": {
      "name": "Cagrilintide",
      "short_description": "Studied for the fullness signal it mimics.",
      "description": "Cagrilintide mimics amylin, a hormone the pancreas releases alongside insulin to signal that eating is done. It is built to last longer than the original. It is studied in fullness and body composition, with work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "dulaglutida": {
      "name": "Dulaglutide",
      "short_description": "Mimics the fullness signal and lasts a whole week.",
      "description": "Dulaglutide mimics GLP-1, the signal the gut sends the brain after eating. It is attached to a piece of antibody, which lets it hold up for a whole week. It is studied in blood sugar handling; it is one of the most researched compounds in its group, in people too. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "l-carnitine": {
      "short_description": "Carries fats to where the cell burns them.",
      "description": "L-carnitine is a well known substance the body makes and that is also found in meat. Its job is to carry fats to the mitochondria, the part of the cell where they are burned for energy. It has been studied a great deal, in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "lipo-c": {
      "short_description": "A ready to use solution of methionine, inositol and choline.",
      "description": "LIPO-C is not a peptide: it is a solution mixing methionine, inositol and choline, three substances found in everyday food. It is studied in how the liver handles fats. It comes ready in a 10 mL bottle, not as a powder. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "liraglutida": {
      "name": "Liraglutide",
      "short_description": "Mimics the fullness signal; studied for many years now.",
      "description": "Liraglutide mimics GLP-1, the signal the gut sends the brain once eating is done. It carries an attached fatty acid that makes it grab a blood protein and last close to a day. It is one of the most studied in its group: lab, animals and many people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "mots-c": {
      "short_description": "Studied for its role in the body's energy.",
      "description": "MOTS-c is an unusual peptide: it does not come from the DNA in the nucleus but from that of the mitochondria, the cell's power plants. It is studied for how the body manages that energy. There is a good amount of work in the lab and in animals, plus more recent studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "retatrutida": {
      "name": "Retatrutide",
      "short_description": "Mimics three of the body's signals at once; heavily studied today.",
      "description": "Retatrutide is a peptide that mimics three signals the body uses at the same time to say it has eaten and to move its reserves. It is one of the most actively researched compounds in metabolism right now, with studies in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "retatrutide-20mg-tirzepatide-40mg": {
      "short_description": "Retatrutide and tirzepatide together in one vial.",
      "description": "This vial holds two peptides together: retatrutide and tirzepatide. Both mimic signals the body uses to say it has eaten, except retatrutide covers three and tirzepatide two. Each one separately has studies in people; the combination in a single vial has been studied little. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "semaglutida": {
      "name": "Semaglutide",
      "short_description": "Mimics the signal that tells the brain eating is done.",
      "description": "Semaglutide mimics GLP-1, a signal the gut sends the brain once eating is done. It is built to last close to a week, instead of the minutes the original signal lasts. It is one of the most studied peptides there is: lab, animals and a great many people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "slu-pp-332": {
      "short_description": "Studied as something that mimics the effect of exercise.",
      "description": "SLU-PP-332 is a small molecule, not a peptide. It is studied because it turns on switches in muscle similar to the ones exercise activates, which is why it is called an exercise mimetic. The published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "survodutide": {
      "short_description": "Mimics two of the body's signals at once.",
      "description": "Survodutide is a peptide that mimics two signals the body uses: the one saying eating is done and the one that calls up energy reserves. It is studied in energy use, in the liver and in body composition, with work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "tirzepatida": {
      "name": "Tirzepatide",
      "short_description": "Mimics two fullness signals instead of one.",
      "description": "Tirzepatide mimics two signals the gut sends the brain after eating, not just one. It is built to last close to a week. It is studied in blood sugar handling and body composition; there are a great many studies in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ara-290": {
      "short_description": "Studied in small nerves and in inflammation.",
      "description": "ARA-290, also called cibinetide, is a small piece of erythropoietin with the red blood cell part removed: only the repair related part is left. It is studied in small nerves and in tissue inflammation, with work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "bpc-157": {
      "short_description": "Studied in tissue repair and in the stomach.",
      "description": "BPC-157 is a short peptide that comes from a protein in gastric juice. It is one of the most studied compounds in the whole catalog: there are hundreds of papers, mostly in animals, looking at tendons, muscle, gut and stomach. Research in people is far smaller. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "bpc-157-10mg-tb-500-10mg": {
      "short_description": "BPC-157 and TB-500 together, the classic repair pair.",
      "description": "This vial holds the two peptides most often studied together in tissue repair: BPC-157 and TB-500. Both appear in work on the formation of new blood vessels, cell movement and tissue remodeling. Most of that research is in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "bpc-157-5mg-tb-500-5mg": {
      "short_description": "The same BPC-157 and TB-500 pair, in a smaller size.",
      "description": "This is the smaller presentation of the classic pair: BPC-157 and TB-500 in a single vial. Both are studied in healing, formation of new blood vessels and remodeling of tendon, muscle and gut lining. Most of the published work is in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "follistatin": {
      "short_description": "Studied because it holds back the muscle's natural brake.",
      "description": "Follistatin is a protein the body makes that latches onto myostatin, the signal in charge of holding back muscle growth. That is why it is studied in skeletal muscle. There is a good amount of work in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "gdf-8": {
      "short_description": "This is myostatin, the natural brake on muscle growth.",
      "description": "GDF-8 is the technical name for myostatin, the signal the body itself uses to hold back muscle growth. It is studied for exactly that: to understand how the body sets that limit. The published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "glow-bpc-157-10mg-ghk-cu-50mg-tb-500-10mg": {
      "short_description": "Three repair and skin peptides in a single vial.",
      "description": "GLOW brings three peptides together in one vial: BPC-157, GHK-Cu and TB-500. All three appear in work on tissue repair, the formation of new blood vessels and the structure that supports the skin. Each has its own literature, almost all from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "klow-bpc-ghk-cu-tb-500-kpv": {
      "short_description": "Four repair peptides in a single vial.",
      "description": "KLOW brings four peptides together: BPC-157, GHK-Cu, TB-500 and KPV. The first three appear in work on tissue repair and on the structure that supports the skin; KPV is studied in the inflammatory response. Each has its own literature, almost all from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "kpv": {
      "short_description": "Studied in inflammation of the gut and the skin.",
      "description": "KPV is a peptide of just three amino acids: it is the tail end of a hormone the body already produces. It is studied in the inflammatory response, mostly in the gut and the skin. The published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ll-37": {
      "short_description": "The body's own natural defense against microbes.",
      "description": "LL-37 is the only peptide of its class that humans make: it is part of the first line of defense against microbes. It is studied in that natural defense, in the formation of new blood vessels and in wound closing. It is one of the most researched in its field, mostly in the lab. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ptd-1": {
      "short_description": "Studied as a vehicle for getting things inside the cell.",
      "description": "PTD-1 is studied not for what it does but for where it gets to: it belongs to a group of peptides able to cross the cell membrane, which is why they are researched as a vehicle for carrying other molecules inside. The published work is from the lab. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "ptd-dbm": {
      "short_description": "Studied in the hair follicle and in wound closing.",
      "description": "PTD-DBM is a peptide designed in the lab to release a signaling route the cell uses while regenerating. It has been studied in mice, looking at the hair follicle and at wound closing. All the published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "tb-500": {
      "short_description": "Studied in cell movement and in repair.",
      "description": "TB-500 is the active part of thymosin beta-4, a protein the body produces. It is studied because it has to do with how cells move while a tissue is repairing itself. It is one of the best known peptides in recovery, with work done mostly in the lab and in animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "gonadorelin-acetate": {
      "short_description": "The signal that gets reproductive hormones going.",
      "description": "Gonadorelin is the lab made version of the signal the brain sends to get reproductive hormones going. What is characteristic is that the body sends it in pulses rather than continuously, and that is itself studied. There is work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "hcg": {
      "short_description": "The pregnancy hormone, widely studied in the hormonal axis.",
      "description": "HCG is the hormone that appears during pregnancy and that home tests detect. It is studied because it acts on the same switch LH uses, the hormone that gives the order to make sex hormones. It is a very well known molecule, with work in the lab, in animals and in people. It is measured in units (IU). Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "hmg": {
      "short_description": "A mix of the two hormones that work on the ovaries.",
      "description": "HMG, also called menotropin, brings together the two hormones the body uses to put the ovaries and testicles to work. It is studied in follicle maturation and in the production of sex hormones. It is a preparation with decades of literature, in people too. It is measured in units (IU). Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "pt-141": {
      "short_description": "Studied in desire, working from the brain rather than the vessels.",
      "description": "PT-141, also called bremelanotide, is a relative of the Melanotans but is studied for something else: it acts in the brain, not in the blood vessels. That is the angle researched in sexual desire. There is work in the lab, in animals and also studies in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "triptorelin-acetate": {
      "short_description": "Studied in the reproductive hormone axis.",
      "description": "Triptorelin mimics the signal that gets reproductive hormones going, but continuously rather than in pulses. The curious part is that, by staying on, the pituitary eventually stops responding; that behavior is what gets studied. There is work in the lab, in animals and in people. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "agua-bacteriostatica": {
      "name": "Bacteriostatic Water",
      "short_description": "The water used to dissolve the powder in the vial.",
      "description": "This is not a peptide: it is a laboratory supply. It is sterile water with a preservative (benzyl alcohol) that keeps bacteria from growing, and it is used to dissolve compounds that come as a powder. It is what day to day lab work uses. Research use only (RUO).",
      "form": "Solution",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "b12": {
      "short_description": "A vitamin B12 solution for laboratory work.",
      "description": "This is vitamin B12 (cyanocobalamin) in solution, at 1 mg per milliliter. It is not a peptide: it is used as a reagent and as a reference in lab tests. It comes ready in a 10 mL bottle. Research use only (RUO).",
      "form": "Solution",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "acido-acetico": {
      "name": "Acetic Acid",
      "short_description": "A lab solvent for the powders that are harder to dissolve.",
      "description": "This is not a peptide: it is a laboratory supply. It is a diluted acetic acid solution, the same acid found in vinegar, used to dissolve powders that do not go into water easily. Research use only (RUO).",
      "form": "Solution",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    },
    "adipotida": {
      "name": "Adipotide",
      "short_description": "Studied on the blood vessels that feed fat tissue.",
      "description": "Adipotide is a two part peptide: one part seeks out the blood vessels in fat tissue and the other acts once it arrives. It is studied from that unusual angle: not fat itself, but the vessels that feed it. The published work is from the lab and from animals. Research use only (RUO).",
      "form": "Lyophilized",
      "storage": "Store at -20 °C, protected from light. Reconstituted: 2–8 °C."
    }
  },
};

export default catalogo;
