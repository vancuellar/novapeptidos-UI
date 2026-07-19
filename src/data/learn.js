// Índice de las guías de "Aprende". Cada archivo de `learn/` exporta una página
// con el esquema que renderiza `LearnPage`: secciones tipadas (prose, list,
// steps, table, faq, glossary, callout, cards) más `related`.

import empiezaAqui from '@/data/learn/empieza-aqui';
import queSonLosPeptidos from '@/data/learn/peptidos-explicados';
import glosarioSimple from '@/data/learn/terminos-sin-jerga';
import glosario from '@/data/learn/glosario-tecnico';
import comoReconstituir from '@/data/learn/reconstitucion-paso-a-paso';
import conservacion from '@/data/learn/conservacion';
import protocolos from '@/data/learn/protocolos';
import mitos from '@/data/learn/mitos';
import controlCalidad from '@/data/learn/como-verificamos-cada-lote';
import purezaHplc from '@/data/learn/que-significa-99-por-ciento';
import legalidad from '@/data/learn/legalidad';
import preguntasFrecuentes from '@/data/learn/preguntas-frecuentes';
import preguntasPrincipiantes from '@/data/learn/preguntas-principiantes';

const PAGES = [
  empiezaAqui,
  queSonLosPeptidos,
  glosarioSimple,
  glosario,
  comoReconstituir,
  conservacion,
  protocolos,
  mitos,
  controlCalidad,
  purezaHplc,
  legalidad,
  preguntasFrecuentes,
  preguntasPrincipiantes,
];

export const LEARN_PAGES = Object.fromEntries(PAGES.map((p) => [p.slug, p]));
export default LEARN_PAGES;
