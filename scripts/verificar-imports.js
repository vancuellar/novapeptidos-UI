#!/usr/bin/env node
/**
 * Candado contra el commit a medias: revisa que todo lo que un archivo importa
 * exista Y esté versionado.
 *
 * EL PROBLEMA (2026-07-31): con varias sesiones de Claude trabajando sobre el
 * mismo árbol, una hizo `git commit -a` y se llevó las ediciones en progreso de
 * otra. Las ediciones entraron al commit c691ae3; el archivo NUEVO que esas
 * ediciones importaban (`src/components/RastreoEnvio.js`) se quedó sin
 * versionar. Durante varios minutos main tuvo
 * `import RastreoEnvio from '@/components/RastreoEnvio'` apuntando a la nada:
 * cualquier `npm run build` o despliegue en esa ventana habría tronado.
 *
 * LA SOLUCIÓN: antes de cada commit se leen los archivos .js/.jsx que van en él
 * (la versión del índice, no la del disco), se sacan sus imports internos
 * (`@/…`, `./…`, `../…`) y se comprueba que el destino esté en el índice de git.
 * Existir en el disco NO basta: eso es justo lo que falló.
 *
 * Uso:
 *   node scripts/verificar-imports.js --staged   ← lo que corre el pre-commit
 *   node scripts/verificar-imports.js            ← revisa todo lo versionado
 *
 * Tarda décimas de segundo. Se puede saltar con `git commit --no-verify`.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SOLO_STAGED = process.argv.includes('--staged');

function git(args, opciones = {}) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opciones });
}

const RAIZ = git(['rev-parse', '--show-toplevel']).trim();

// El índice de git: incluye lo ya versionado Y lo que se acaba de `git add`.
// Es la lista contra la que se valida "¿este archivo va a existir en el commit?".
const INDICE = new Set(git(['ls-files', '-z'], { cwd: RAIZ }).split('\0').filter(Boolean));

const ARCHIVOS = (SOLO_STAGED
  ? git(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'], { cwd: RAIZ })
  : git(['ls-files', '-z'], { cwd: RAIZ })
).split('\0').filter((f) => /\.(js|jsx)$/.test(f));

if (ARCHIVOS.length === 0) process.exit(0);

// Extensiones que webpack/craco resuelve solo, más el index de carpeta.
const SUFIJOS = ['', '.js', '.jsx', '.ts', '.tsx', '.json', '.css',
  '/index.js', '/index.jsx', '/index.ts', '/index.tsx'];

// Los comentarios se vacían para que un `// import X from '@/viejo'` no cuente.
// Se conservan los saltos de línea para no mover los números de renglón.
function sinComentarios(texto) {
  return texto
    .replace(/\/\*[\s\S]*?\*\//g, (bloque) => bloque.replace(/[^\n]/g, ''))
    .replace(/^([ \t]*)\/\/.*$/gm, '$1');
}

// import … from 'x' / export … from 'x' / import 'x' / require('x') / import('x')
const PATRONES = [
  /(?:^|[\n;{}])\s*(?:import|export)\b[^;'"]*?\bfrom\s*['"]([^'"]+)['"]/g,
  /(?:^|[\n;{}])\s*import\s*['"]([^'"]+)['"]/g,
  /\b(?:require|import)\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
];

function importsDe(texto) {
  const limpio = sinComentarios(texto);
  const encontrados = [];
  for (const patron of PATRONES) {
    patron.lastIndex = 0;
    let m;
    while ((m = patron.exec(limpio)) !== null) {
      const especificador = m[1];
      if (!/^(@\/|\.\.?\/)/.test(especificador)) continue; // node_modules: ni caso
      encontrados.push({
        especificador,
        linea: limpio.slice(0, m.index + m[0].length).split('\n').length,
      });
    }
  }
  return encontrados;
}

function destino(archivo, especificador) {
  const rel = especificador.startsWith('@/')
    ? path.posix.join('src', especificador.slice(2))
    : path.posix.normalize(path.posix.join(path.posix.dirname(archivo), especificador));
  return rel.replace(/^\.\//, '');
}

const fallas = [];

for (const archivo of ARCHIVOS) {
  let contenido;
  try {
    // La versión del ÍNDICE, no la del disco: el commit se hace con esta.
    contenido = SOLO_STAGED
      ? git(['show', `:${archivo}`], { cwd: RAIZ })
      : fs.readFileSync(path.join(RAIZ, archivo), 'utf8');
  } catch {
    continue;
  }

  for (const { especificador, linea } of importsDe(contenido)) {
    const base = destino(archivo, especificador);
    const candidatos = SUFIJOS.map((s) => base + s);
    if (candidatos.some((c) => INDICE.has(c))) continue;

    const enDisco = candidatos.find((c) => {
      const abs = path.join(RAIZ, c);
      return fs.existsSync(abs) && fs.statSync(abs).isFile();
    });
    fallas.push({ archivo, linea, especificador, enDisco });
  }
}

if (fallas.length === 0) process.exit(0);

console.error('');
console.error('⛔ IMPORTS ROTOS — el commit se detuvo.');
console.error('');
for (const f of fallas) {
  console.error(`  ${f.archivo}:${f.linea}   →  ${f.especificador}`);
  if (f.enDisco) {
    console.error(`     ${f.enDisco} existe en el disco pero NO está en el commit.`);
    console.error(`     Arréglalo:  git add ${f.enDisco}`);
  } else {
    console.error('     El archivo destino no existe. ¿Se te olvidó crearlo, o está mal escrita la ruta?');
  }
  console.error('');
}
console.error('Este candado existe porque el 2026-07-31 un `git commit -a` se llevó ediciones');
console.error('de otra sesión y dejó fuera el archivo que importaban: main quedó sin compilar.');
console.error('Si de veras quieres commitear así:  git commit --no-verify');
console.error('');
process.exit(1);
