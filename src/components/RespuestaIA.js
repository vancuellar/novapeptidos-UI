import React, { useMemo } from 'react';

/* ---------------------------------------------------------------------------
   RESPUESTA DE LA IA — el texto del asistente, ya formateado
   ---------------------------------------------------------------------------

   ⛔ EL PROBLEMA (Christián, 2026-07-31): «las respuestas de la AI no están
   limpias, dejan código, ejemplo `**NAD+ 500**`». El modelo contesta en
   Markdown y las dos burbujas de chat lo pintaban CRUDO, así que el cliente
   veía los asteriscos en pantalla. Se ve mal en el panel y PEOR en la tienda.

   Este componente lo pinta de verdad: negritas negritas, viñetas con su punto
   de marca, tablas legibles y títulos con la tipografía de la casa.

   POR QUÉ NO USAMOS `react-markdown` NI `marked`:
   · Peso. `react-markdown` + `remark` + `rehype` son ~14 dependencias nuevas y
     unos 120 KB para pintar negritas y viñetas. Aquí se resolvió igual que la
     hoja de cotización (`lib/hojaCotizacion.js`): a mano, con lo justo.
   · Seguridad. Este texto lo escribe un MODELO, y un modelo repite lo que le
     peguen en el mensaje. Las librerías de Markdown aceptan HTML crudo por
     omisión y hay que apagarlo (o pegarle un DOMPurify encima). Aquí NO EXISTE
     ese camino: no hay un solo `dangerouslySetInnerHTML` en el archivo. Todo
     sale como elementos de React, así que un `<script>` en la respuesta se
     pinta como texto y no puede ejecutarse. Es imposible inyectar por diseño.
   · Los enlaces se filtran a http/https/mailto y van con `rel="noopener"`: un
     `javascript:` en un enlace del modelo se pinta como texto plano.

   ⚠️ STREAMING. La respuesta llega en chorrito y a media palabra el texto dice
   `**NAD+` sin cerrar. Si esto se limitara a buscar pares, el usuario vería los
   dos asteriscos volando mientras escribe. Por eso una marca abierta al final
   se toma como abierta HASTA EL FINAL: se pinta en negrita y ya. Nunca aparece
   un asterisco suelto en pantalla, ni siquiera medio segundo.

   El servidor además limpia los restos (`texto_ia.py`). Cinturón y tirantes: si
   este renderizador fallara, el texto que llega ya viene presentable.
--------------------------------------------------------------------------- */

// Sólo estos esquemas. Un `javascript:...` no es un enlace: es texto.
const ENLACE_OK = /^(https?:\/\/|mailto:|\/)/i;

// ------------------------------------------------------------------ en línea
//
// Negritas, cursivas, código corto y enlaces. Devuelve nodos de React, nunca
// HTML. El orden del regex importa: `**` antes que `*`.
//
// ⛔ El guion bajo NO cuenta como cursiva, a propósito. En este negocio se
// escribe `start_dose` y `session_id` mucho más seguido de lo que un modelo
// escribe _así_, y tomarlo por cursiva se come el guion y deja "startdose".
const MARCAS = /(\*\*)([\s\S]+?)\1|(\*)([^*\n]+?)\3|`([^`\n]+?)`|\[([^\]\n]+)\]\(([^)\s]+)\)/g;

function Enlace({ href, children }) {
  if (!ENLACE_OK.test(href)) return <>{children}</>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="underline underline-offset-2 text-[hsl(var(--primary))] hover:opacity-80 break-words">
      {children}
    </a>
  );
}

const Codigo = ({ children }) => (
  <code className="rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-[0.92em] font-mono">
    {children}
  </code>
);

/** Lo que quedó suelto al final del chorrito: se cierra solo. */
function colaAbierta(resto, clave) {
  const nodos = [];
  // `**negrita a medio escribir`
  const negrita = resto.match(/^([\s\S]*?)(\*\*|__)([\s\S]*)$/);
  if (negrita) {
    if (negrita[1]) nodos.push(negrita[1]);
    if (negrita[3]) nodos.push(<strong key={`${clave}-b`} className="font-semibold">{negrita[3]}</strong>);
    return nodos;
  }
  const codigo = resto.match(/^([\s\S]*?)`([^`]*)$/);
  if (codigo) {
    if (codigo[1]) nodos.push(codigo[1]);
    if (codigo[2]) nodos.push(<Codigo key={`${clave}-c`}>{codigo[2]}</Codigo>);
    return nodos;
  }
  const cursiva = resto.match(/^([\s\S]*?)\*([^*]*)$/);
  if (cursiva) {
    if (cursiva[1]) nodos.push(cursiva[1]);
    if (cursiva[2]) nodos.push(<em key={`${clave}-i`}>{cursiva[2]}</em>);
    return nodos;
  }
  if (resto) nodos.push(resto);
  return nodos;
}

export function enLinea(texto, clave = 'l') {
  if (!texto) return null;
  const nodos = [];
  let ultimo = 0;
  let n = 0;
  MARCAS.lastIndex = 0;
  let m;
  while ((m = MARCAS.exec(texto)) !== null) {
    if (m.index > ultimo) nodos.push(texto.slice(ultimo, m.index));
    const k = `${clave}-${n++}`;
    if (m[1]) nodos.push(<strong key={k} className="font-semibold">{m[2]}</strong>);
    else if (m[3]) nodos.push(<em key={k}>{m[4]}</em>);
    else if (m[5] !== undefined) nodos.push(<Codigo key={k}>{m[5]}</Codigo>);
    else if (m[6] !== undefined) nodos.push(<Enlace key={k} href={m[7]}>{m[6]}</Enlace>);
    ultimo = m.index + m[0].length;
  }
  // La cola: aquí es donde se cierra la marca que el chorrito dejó abierta.
  const resto = texto.slice(ultimo);
  if (resto) colaAbierta(resto, `${clave}-fin`).forEach((x, i) => nodos.push(
    typeof x === 'string' ? <React.Fragment key={`${clave}-t${i}`}>{x}</React.Fragment> : x));
  return nodos;
}

// -------------------------------------------------------------- por bloques
const VINETA = /^\s{0,6}([-*+•·])\s+(.*)$/;
const NUMERO = /^\s{0,6}(\d{1,2})[.)]\s+(.*)$/;
const TITULO = /^\s{0,3}(#{1,6})\s+(.*)$/;
const CITA = /^\s{0,3}>\s?(.*)$/;
const RAYA = /^\s{0,3}([-*_])\1{2,}\s*$/;
const CERCA = /^\s{0,3}```/;
const FILA = /^\s*\|(.+)\|\s*$/;
const SEPARADOR = /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/;

const celdas = (linea) => linea.replace(/^\s*\|/, '').replace(/\|\s*$/, '')
  .split('|').map((c) => c.trim());

const Punto = () => (
  <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]"
    aria-hidden="true" />
);

/** Parte el texto en bloques y los pinta. Un solo recorrido, sin librerías. */
function pintar(texto) {
  const lineas = String(texto).replace(/\r\n?/g, '\n').split('\n');
  const salida = [];
  let parrafo = [];
  let i = 0;

  const cerrarParrafo = () => {
    if (!parrafo.length) return;
    const contenido = parrafo.join('\n');
    salida.push(
      <p key={`p${salida.length}`} className="whitespace-pre-wrap">
        {enLinea(contenido, `p${salida.length}`)}
      </p>);
    parrafo = [];
  };

  while (i < lineas.length) {
    const linea = lineas[i];

    // Bloque de código: se pinta como bloque, no se ejecuta ni se interpreta.
    if (CERCA.test(linea)) {
      cerrarParrafo();
      const dentro = [];
      i += 1;
      while (i < lineas.length && !CERCA.test(lineas[i])) { dentro.push(lineas[i]); i += 1; }
      i += 1;
      if (dentro.length) {
        salida.push(
          <pre key={`c${salida.length}`}
            className="overflow-x-auto rounded-lg bg-[hsl(var(--muted))] px-3 py-2 text-[12px] leading-relaxed">
            <code>{dentro.join('\n')}</code>
          </pre>);
      }
      continue;
    }

    if (!linea.trim()) { cerrarParrafo(); i += 1; continue; }

    if (RAYA.test(linea)) {
      cerrarParrafo();
      salida.push(<hr key={`h${salida.length}`} className="border-border my-1" />);
      i += 1;
      continue;
    }

    // El título que apenas va llegando: las almohadillas solas no se enseñan.
    if (/^\s{0,3}#{1,6}\s*$/.test(linea)) { i += 1; continue; }

    const titulo = linea.match(TITULO);
    if (titulo) {
      cerrarParrafo();
      const nivel = titulo[1].length;
      const clases = nivel <= 2
        ? 'font-heading text-[15px] font-semibold mt-1'
        : 'font-semibold text-[13.5px] mt-1';
      salida.push(
        <div key={`t${salida.length}`} className={clases}>
          {enLinea(titulo[2], `t${salida.length}`)}
        </div>);
      i += 1;
      continue;
    }

    // Tabla: encabezado + renglón de guiones. Se desliza a lo ancho en móvil.
    if (FILA.test(linea) && i + 1 < lineas.length && SEPARADOR.test(lineas[i + 1])
        && lineas[i + 1].includes('|')) {
      cerrarParrafo();
      const encabezado = celdas(linea);
      i += 2;
      const cuerpo = [];
      while (i < lineas.length && FILA.test(lineas[i])) { cuerpo.push(celdas(lineas[i])); i += 1; }
      const k = salida.length;
      salida.push(
        <div key={`tb${k}`} className="overflow-x-auto -mx-1 px-1">
          <table className="w-full text-[12.5px] border-collapse">
            <thead>
              <tr>
                {encabezado.map((c, j) => (
                  <th key={j} className="border-b border-border px-2 py-1.5 text-left font-semibold whitespace-nowrap">
                    {enLinea(c, `th${k}-${j}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cuerpo.map((fila, f) => (
                <tr key={f}>
                  {fila.map((c, j) => (
                    <td key={j} className="border-b border-border/60 px-2 py-1.5 align-top">
                      {enLinea(c, `td${k}-${f}-${j}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>);
      continue;
    }

    // Viñetas. Ojo: `* algo` es viñeta, no cursiva a medio abrir.
    if (VINETA.test(linea)) {
      cerrarParrafo();
      const puntos = [];
      while (i < lineas.length && VINETA.test(lineas[i])) {
        puntos.push(lineas[i].match(VINETA)[2]);
        i += 1;
      }
      const k = salida.length;
      salida.push(
        <ul key={`u${k}`} className="space-y-1">
          {puntos.map((p, j) => (
            <li key={j} className="flex items-start gap-2">
              <Punto />
              <span className="min-w-0">{enLinea(p, `u${k}-${j}`)}</span>
            </li>
          ))}
        </ul>);
      continue;
    }

    if (NUMERO.test(linea)) {
      cerrarParrafo();
      const puntos = [];
      while (i < lineas.length && NUMERO.test(lineas[i])) {
        const m = lineas[i].match(NUMERO);
        puntos.push([m[1], m[2]]);
        i += 1;
      }
      const k = salida.length;
      salida.push(
        <ol key={`o${k}`} className="space-y-1">
          {puntos.map(([num, p], j) => (
            <li key={j} className="flex items-start gap-2">
              <span className="shrink-0 font-semibold text-[hsl(var(--primary))] tabular-nums">{num}.</span>
              <span className="min-w-0">{enLinea(p, `o${k}-${j}`)}</span>
            </li>
          ))}
        </ol>);
      continue;
    }

    if (CITA.test(linea)) {
      cerrarParrafo();
      const dentro = [];
      while (i < lineas.length && CITA.test(lineas[i])) {
        dentro.push(lineas[i].match(CITA)[1]);
        i += 1;
      }
      const k = salida.length;
      salida.push(
        <blockquote key={`q${k}`}
          className="border-l-2 border-[hsl(var(--primary))] pl-3 text-muted-foreground">
          {enLinea(dentro.join('\n'), `q${k}`)}
        </blockquote>);
      continue;
    }

    // Un renglón de tabla huérfano: o la tabla venía mal armada, o es el que
    // está llegando en este instante y todavía no tiene su pareja de guiones.
    // En los dos casos las tuberías se van: se lee como una fila, con puntos.
    if (/^\s*\|/.test(linea)) {
      if (SEPARADOR.test(linea)) { i += 1; continue; }
      const sueltas = celdas(linea).filter(Boolean);
      if (sueltas.length) parrafo.push(sueltas.join(' · '));
      i += 1;
      continue;
    }

    parrafo.push(linea);
    i += 1;
  }
  cerrarParrafo();
  return salida;
}

export default function RespuestaIA({ texto, className = '', testId = 'respuesta-ia' }) {
  const bloques = useMemo(() => pintar(texto || ''), [texto]);
  return (
    <div data-testid={testId} className={`space-y-2 leading-relaxed break-words ${className}`}>
      {bloques}
    </div>
  );
}
