// Índice de las guías de "Aprende". Cada archivo de `learn/` exporta una página
// con el esquema que renderiza `LearnPage`: secciones tipadas (prose, list,
// steps, table, faq, glossary, callout, cards) más `related`.

import empiezaAqui from '@/data/learn/empieza-aqui';
import queSonLosPeptidos from '@/data/learn/que-son-los-peptidos';
import glosarioSimple from '@/data/learn/glosario-simple';
import glosario from '@/data/learn/glosario';
import comoReconstituir from '@/data/learn/como-reconstituir';
import conservacion from '@/data/learn/conservacion';
import protocolos from '@/data/learn/protocolos';
import mitos from '@/data/learn/mitos';
import controlCalidad from '@/data/learn/control-calidad';
import purezaHplc from '@/data/learn/pureza-hplc';
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
