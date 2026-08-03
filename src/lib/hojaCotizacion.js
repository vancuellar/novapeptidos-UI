// LA HOJA de la cotización: un documento, no una tarjeta de la interfaz.
//
// ⛔ POR QUÉ ES UN STRING DE HTML Y NO JSX (Christián, 2026-07-30). La vista previa
// y la impresión tienen que ser LA MISMA hoja. Cuando el documento era JSX con
// clases de Tailwind, imprimir significaba esconder media pantalla con
// `visibility:hidden` y rezar: se colaba el resto de la página, los renglones se
// partían a la mitad y el resultado salía desacomodado. Aquí la hoja se arma UNA
// vez, con estilos propios y autosuficientes, y se usa en los dos lados:
//   · la vista previa la pinta tal cual (lo que ve es lo que sale);
//   · imprimir la manda a un IFRAME dedicado, un documento limpio donde no existe
//     el sitio — sin barras, sin menús, sin la calculadora de al lado.
//
// ⛔ REGLA DE ORO: aquí NUNCA entra el costo real, el proveedor ni el ROI. Esta
// hoja la ve el CLIENTE FINAL. Solo hay precio público, descuento y totales.

const LOGO = '/images/exygen-logo.png';

// Paleta calcada de los correos de Exygen (emails.py), para que la cotización
// impresa y el correo que la lleva se vean hermanos y no primos lejanos.
const CLARO = {
  ink: '#132763', body: '#3D4657', muted: '#8A93A8', line: '#E4E8F0',
  papel: '#FFFFFF', suave: '#FBFCFE', verde: '#0F7B5A', invertirLogo: '',
};
const OSCURO = {
  ink: '#F5F5F5', body: '#D6D6D6', muted: '#A3A3A3', line: '#2B2B2B',
  papel: '#111111', suave: '#0A0A0A', verde: '#5FD3A8',
  invertirLogo: 'filter:brightness(0) invert(1);',
};

const HEAD = "'Marcellus', Georgia, 'Times New Roman', serif";
const BODY = "'Manrope', 'Helvetica Neue', Arial, sans-serif";

export const money = (n) => `$${Math.round(Number(n) || 0).toLocaleString('es-MX')}`;

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Folio corto y legible: COT-AAMMDD-1234. No es un consecutivo del servidor (una
// cotización no es un pedido y no debe apartar número), pero le da al documento
// algo que el cliente puede citar por teléfono.
export const nuevoFolio = (d = new Date()) => {
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const n = String(Math.floor(1000 + Math.random() * 9000));
  return `COT-${yy}${mm}${dd}-${n}`;
};

const LOCALES = { es: 'es-MX', en: 'en-US', pt: 'pt-BR' };

export const fechaLarga = (fecha, idioma = 'es') => {
  try {
    return new Date(fecha).toLocaleDateString(LOCALES[idioma] || 'es-MX',
      { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return new Date(fecha).toLocaleDateString(); }
};

/* NOMBRE DEL ARCHIVO. Christián, 2026-08-01: la hoja se manda por WhatsApp y por
   correo, y llegaba con un nombre genérico que no dice de quién es.
   `Cotizacion-<cliente>-<AAAA-MM-DD>.pdf`, y si no hay nombre de cliente, el folio.

   ⛔ SIN ACENTOS NI ESPACIOS NI SIGNOS. WhatsApp y varios clientes de correo
   destrozan un archivo con acentos: «Cotización Ramírez.pdf» llega como
   «Cotizaci%C3%B3n%20Ram%C3%ADrez.pdf» o directamente sin extensión. Se normaliza a
   ASCII (NFD y fuera los diacríticos) y todo lo que no sea letra o número se vuelve
   guion. */
export function nombreDeArchivo({ cliente = '', folio = '', fecha = new Date() } = {}) {
  const limpio = String(cliente || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')   // á → a, ñ → n
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  const d = fecha instanceof Date ? fecha : new Date(fecha);
  const dia = Number.isNaN(d.getTime()) ? new Date() : d;
  const iso = `${dia.getFullYear()}-${String(dia.getMonth() + 1).padStart(2, '0')}-${String(dia.getDate()).padStart(2, '0')}`;
  // Sin cliente, el folio: es lo único que identifica esa hoja y se puede citar
  // por teléfono. El folio ya nace sin acentos ni espacios.
  const quien = limpio || String(folio || '').replace(/[^A-Za-z0-9-]+/g, '') || 'sin-nombre';
  return `Cotizacion-${quien}-${iso}`;
}

/* El CUERPO de la hoja. `datos`:
     folio, fecha (Date), cliente, clienteCorreo, clienteTel, clienteDir,
     codigo, distribuidor (el nombre de quien cotiza), idioma,
     enlaceCotizacion / enlaceCotizacionTexto — para volver a ABRIR la cotización,
     enlacePago / enlacePagoTexto           — el carrito de ESA cotización, listo,
     filas: [{nombre, qty, unit, importe, precio, pct}]
     regalos: [{nombre, cantidad, tipo}]   — las CORTESÍAS, sin su código
     subtotalLista, descuento, descuentoPct, envio, cobraEnvio, total
   Los datos del cliente son TODOS opcionales: los que existan se pintan bajo
   "Para", los que no, simplemente no aparecen.
   `textos` son las cadenas ya traducidas (la hoja no sabe de i18n).           */
export function hojaCotizacionHTML(datos, { tema = 'claro', origen = '' } = {}) {
  const c = tema === 'oscuro' ? OSCURO : CLARO;
  const t = datos.textos || {};
  const filas = datos.filas || [];
  const descuento = Number(datos.descuento) || 0;
  const conDescuento = descuento > 0;
  const regalos = datos.regalos || [];
  const envio = Number(datos.envio) || 0;

  const renglones = filas.map((f) => `
    <tr>
      <td class="cot-td cot-nom">
        ${esc(f.nombre)}
        ${f.pct > 0 ? `<span class="cot-antes">${esc(t.docAntes || '')} <s>${money(f.precio)}</s></span>` : ''}
      </td>
      <td class="cot-td cot-num">${Number(f.qty) || 0}</td>
      <td class="cot-td cot-num">${money(f.unit)}</td>
      <td class="cot-td cot-num cot-importe">${money(f.importe)}</td>
    </tr>`).join('');

  /* LAS CORTESÍAS, en la misma tabla y con el importe en $0.
     ⛔ El cliente ve el REGALO —«Agua bacteriostática — Cortesía»— y jamás el código
     que lo hizo posible (Christián, 2026-08-01). Aquí no hay dónde escribirlo: a esta
     función sólo le llega el nombre. */
  const cortesias = regalos.map((g) => `
    <tr>
      <td class="cot-td cot-nom">
        ${esc(g.nombre || '')}
        <span class="cot-antes cot-verde">${esc(t.docCortesia || '')}</span>
      </td>
      <td class="cot-td cot-num">${Number(g.cantidad) || 1}</td>
      <td class="cot-td cot-num">${money(0)}</td>
      <td class="cot-td cot-num cot-importe cot-verde">${money(0)}</td>
    </tr>`).join('');

  /* LOS DOS ENLACES DEL PIE (Christián, 2026-08-01). Antes había uno solo y era
     genérico —«Paga en línea: exygenlabs.com/checkout»—, así que el cliente aterrizaba
     en un checkout vacío y tenía que rearmar todo lo que ya había leído.

       1. VER LA COTIZACIÓN: la vuelve a abrir sin depender del PDF. Es útil justo
          cuando el PDF se pierde en la conversación de WhatsApp.
       2. PAGAR: el carrito de ESA cotización, con sus precios y sus cortesías.

     Los dos cuelgan del MISMO token del carrito compartido, y ninguno lleva el código
     del obsequio: el token es opaco y el servidor resuelve el regalo por dentro.

     Cada uno en su propio renglón para que en el PDF se puedan tocar por separado —
     dos enlaces pegados en una línea son un solo blanco de dedo en un teléfono. */
  const filaEnlace = (etiqueta, url, texto) => (url
    ? `<div class="cot-enlace"><b>${esc(etiqueta || '')}</b> <a href="${esc(url)}">${esc(texto || url)}</a></div>`
    : '');
  const enlaces = [
    filaEnlace(t.docVerCotizacion, datos.enlaceCotizacion, datos.enlaceCotizacionTexto),
    filaEnlace(t.docPagar, datos.enlacePago, datos.enlacePagoTexto),
  ].join('');

  /* EL BLOQUE DEL DINERO. Christián, 2026-08-01, textual: «después del precio de
     lista dice "ahorro", por favor cámbialo y mejor que diga "descuento X%" porque
     Mónica no entiende fácilmente». El porcentaje se calcula descuento ÷ lista y
     viene ya armado en `t.docDescuento`.

     ⛔ Y EL ENVÍO SUMA, NUNCA RESTA. Va debajo del descuento y antes del total, con
     la palabra «Gratis» cuando el pedido llega al mínimo de la casa. La política no
     se inventa aquí: sale de `/payments/config`, que es la que aplica la caja. */
  const dinero = [
    `<tr><td class="cot-dlabel">${esc(t.precioLista || '')}</td>
         <td class="cot-dval">${money(datos.subtotalLista)}</td></tr>`,
    conDescuento
      ? `<tr><td class="cot-dlabel">${esc(t.docDescuento || '')}</td>
             <td class="cot-dval cot-verde">&minus;${money(descuento)}</td></tr>`
      : '',
    datos.cobraEnvio
      ? `<tr><td class="cot-dlabel">${esc(t.docEnvio || '')}</td>
             <td class="cot-dval${envio > 0 || datos.envioPendiente ? '' : ' cot-verde'}">${
  /* ⛔ SIN DIRECCIÓN NO SE ENSEÑA COSTO DE ENVÍO (Christián, 2026-08-01): se
     calcula con la dirección al pagar. Con dirección, la política de siempre. */
  datos.envioPendiente ? esc(t.docEnvioPendiente || '')
    : envio > 0 ? money(envio) : esc(t.docEnvioGratis || '')}</td></tr>`
      : '',
    `<tr><td class="cot-dlabel cot-dtotal">${esc(t.total || '')}</td>
         <td class="cot-dval cot-dtotal">${money(datos.total)}</td></tr>`,
    /* El 5% de cripto se ANUNCIA, no se resta: una cotización no lleva método de
       pago, y descontar algo que el cliente todavía no eligió sería cotizar un
       total que la caja no va a cobrar. Se resta en el checkout, donde ya eligió.
       Va DEBAJO del total y en letra chica, para que no se confunda con el precio
       cotizado. (Christián, 2026-08-03) */
    t.docCripto
      ? `<tr><td class="cot-cripto" colspan="2">${esc(t.docCripto)}</td></tr>`
      : '',
  ].join('');

  return `
<style>
  .cot-hoja{background:${c.papel};color:${c.body};font-family:${BODY};
    font-size:13px;line-height:1.55;padding:34px 38px 30px;box-sizing:border-box;
    -webkit-font-smoothing:antialiased;}
  .cot-hoja *{box-sizing:border-box;}
  .cot-cab{width:100%;border-collapse:collapse;}
  .cot-cab td{vertical-align:top;padding:0;}
  .cot-logo{height:46px;width:auto;display:block;${c.invertirLogo}}
  .cot-doc{font-family:${HEAD};font-size:23px;letter-spacing:.06em;color:${c.ink};line-height:1.15;}
  .cot-meta{font-size:11px;color:${c.muted};letter-spacing:.04em;margin-top:3px;
    font-variant-numeric:tabular-nums;}
  .cot-regla{border-top:2px solid ${c.ink};margin:16px 0 0;}
  .cot-finita{border-top:1px solid ${c.line};margin:0;}
  .cot-partes{width:100%;border-collapse:collapse;margin-top:14px;}
  .cot-partes td{vertical-align:top;padding:0 12px 0 0;width:50%;}
  .cot-partes td+td{padding:0 0 0 12px;text-align:right;}
  .cot-etiqueta{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:${c.muted};}
  .cot-valor{font-size:14px;color:${c.ink};font-weight:600;margin-top:2px;}
  .cot-valor small{display:block;font-size:11px;font-weight:400;color:${c.muted};letter-spacing:.05em;}
  .cot-tabla{width:100%;border-collapse:collapse;margin-top:22px;}
  .cot-tabla th{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:${c.muted};
    font-weight:600;text-align:left;padding:0 0 7px;border-bottom:1px solid ${c.ink};}
  .cot-tabla th.cot-num{text-align:right;}
  .cot-td{padding:9px 0;border-bottom:1px solid ${c.line};vertical-align:top;font-size:13px;}
  .cot-nom{color:${c.ink};font-weight:500;padding-right:12px;}
  .cot-num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;
    padding-left:14px;color:${c.body};}
  .cot-importe{color:${c.ink};font-weight:600;}
  .cot-antes{display:block;font-size:11px;font-weight:400;color:${c.muted};margin-top:1px;}
  .cot-dineroCaja{width:100%;margin-top:18px;}
  .cot-dineroCaja td{vertical-align:top;}
  .cot-dinero{border-collapse:collapse;min-width:236px;margin-left:auto;}
  .cot-dlabel{padding:4px 22px 4px 0;color:${c.muted};font-size:12.5px;white-space:nowrap;}
  .cot-dval{padding:4px 0;text-align:right;color:${c.body};font-size:12.5px;
    font-variant-numeric:tabular-nums;white-space:nowrap;}
  .cot-verde{color:${c.verde};}
  .cot-cripto{font-size:11.5px;color:#B26A12;padding-top:7px;text-align:right;}
  .cot-dtotal{font-family:${HEAD};font-size:19px;color:${c.ink};padding-top:11px;
    border-top:1px solid ${c.line};}
  .cot-ahorro{margin-top:16px;border:1px dashed ${c.verde};border-radius:9px;
    padding:9px 14px;text-align:center;font-size:11.5px;letter-spacing:.09em;
    text-transform:uppercase;color:${c.verde};background:${c.suave};}
  .cot-pie{margin-top:26px;padding-top:12px;border-top:1px solid ${c.line};
    font-size:9.5px;line-height:1.6;color:${c.muted};}
  .cot-pie b{color:${c.body};font-weight:600;}
  .cot-pie a{color:${c.ink};text-decoration:underline;}
  /* Cada enlace en su propio renglón y con aire arriba: en un teléfono dos enlaces
     pegados en la misma línea son un solo blanco para el dedo. */
  .cot-enlace{margin-top:6px;line-height:1.7;word-break:break-word;}
  /* En un teléfono el encabezado a dos columnas se encima: el logo y la palabra
     "Cotización" se pisan y el folio se parte a la mitad. Ahí se apila. Y la
     columna del precio unitario se va: el importe ya lleva la cuenta hecha. */
  @media (max-width:520px){
    .cot-hoja{padding:22px 18px 20px;font-size:12.5px;}
    .cot-cab td{display:block;width:100% !important;text-align:left !important;}
    .cot-cab td+td{padding-top:14px;}
    .cot-doc{font-size:20px;}
    .cot-meta{white-space:nowrap;}
    .cot-logo{height:36px;}
    .cot-partes td,.cot-partes td+td{padding-left:0;padding-right:8px;}
    .cot-tabla th:nth-child(3),.cot-td:nth-child(3){display:none;}
    .cot-dinero{min-width:0;width:100%;}
  }
</style>
<div class="cot-hoja">
  <table class="cot-cab"><tr>
    <td><img class="cot-logo" src="${origen}${LOGO}" alt="Exygen Labs"></td>
    <td align="right">
      <div class="cot-doc">${esc(t.docTitulo || 'Cotización')}</div>
      <div class="cot-meta">${esc(t.docFolio || 'Folio')} ${esc(datos.folio || '')}</div>
      <div class="cot-meta">${esc(fechaLarga(datos.fecha || new Date(), datos.idioma))}</div>
    </td>
  </tr></table>
  <div class="cot-regla"></div>

  <table class="cot-partes"><tr>
    <td>
      <div class="cot-etiqueta">${esc(t.docPara || 'Para')}</div>
      <div class="cot-valor">${esc(datos.cliente || t.docSinNombre || '')}
        ${[datos.clienteCorreo, datos.clienteTel, datos.clienteDir]
    .filter((d) => (d || '').trim())
    .map((d) => `<small>${esc(d.trim())}</small>`).join('')}
      </div>
    </td>
    <td>
      <div class="cot-etiqueta">${esc(t.docDe || 'De')}</div>
      <div class="cot-valor">Exygen Labs
        ${datos.distribuidor ? `<small>${esc(datos.distribuidor)}</small>` : ''}
        ${datos.codigo ? `<small>${esc(t.docCodigo || 'Código')} ${esc(datos.codigo)}</small>` : ''}
      </div>
    </td>
  </tr></table>

  <table class="cot-tabla">
    <thead><tr>
      <th>${esc(t.colProducto || 'Producto')}</th>
      <th class="cot-num">${esc(t.colCant || 'Cant.')}</th>
      <th class="cot-num">${esc(t.colUnitario || 'Unitario')}</th>
      <th class="cot-num">${esc(t.colImporte || 'Importe')}</th>
    </tr></thead>
    <tbody>${renglones}${cortesias}</tbody>
  </table>

  <table class="cot-dineroCaja"><tr><td>
    <table class="cot-dinero">
      <tr><td class="cot-etiqueta" colspan="2" style="padding-bottom:6px;">${esc(t.docResumen || '')}</td></tr>
      ${dinero}
    </table>
  </td></tr></table>

  ${conDescuento ? `<div class="cot-ahorro">${esc(t.docDescuentoCaja || '')} ${money(descuento)}</div>` : ''}

  <div class="cot-pie">
    ${esc(t.docLeyenda || '')}
    ${enlaces}
  </div>
</div>`;
}

/* IMPRIMIR. Un iframe oculto con SU PROPIO documento: ahí no existe el sitio, así
   que no hay nada que esconder ni nada que se cuele. `@page` fija la carta y los
   márgenes, y `page-break-inside:avoid` impide que un renglón se parta entre dos
   hojas — que era justo lo que salía desacomodado. */
export function imprimirCotizacion(datos, textos) {
  const origen = window.location.origin + (process.env.PUBLIC_URL || '');
  const cuerpo = hojaCotizacionHTML({ ...datos, textos }, { tema: 'claro', origen });
  const marco = document.createElement('iframe');
  marco.setAttribute('aria-hidden', 'true');
  marco.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
  document.body.appendChild(marco);

  const doc = marco.contentDocument;
  doc.open();
  // ⛔ EL `<title>` ES EL NOMBRE DEL ARCHIVO. Todos los navegadores lo usan como
  // nombre por omisión al «Guardar como PDF», así que ésta es la única línea que
  // decide cómo se va a llamar la hoja que Mónica manda por WhatsApp. Antes iba el
  // folio solo (o el título de la página, que salía como «Cotización .pdf»): un
  // nombre que no dice de quién es y que se rompe por el acento.
  doc.write(`<!DOCTYPE html><html lang="${datos.idioma || 'es'}"><head>
<meta charset="utf-8">
<title>${esc(nombreDeArchivo({ cliente: datos.cliente, folio: datos.folio, fecha: datos.fecha }))}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Marcellus&display=swap">
<style>
  @page{size:letter;margin:14mm 13mm;}
  html,body{margin:0;padding:0;background:#fff;}
  .cot-hoja{padding:0 !important;max-width:100%;}
  table{page-break-inside:auto;}
  tr{page-break-inside:avoid;page-break-after:auto;}
  thead{display:table-header-group;}
  .cot-dineroCaja,.cot-ahorro,.cot-pie{page-break-inside:avoid;}
  @media print{ body{-webkit-print-color-adjust:exact;print-color-adjust:exact;} }
</style></head><body>${cuerpo}</body></html>`);
  doc.close();

  const lanzar = () => {
    try {
      marco.contentWindow.focus();
      marco.contentWindow.print();
    } finally {
      // No se quita de inmediato: Safari cancela el diálogo si el iframe muere antes.
      setTimeout(() => marco.remove(), 4000);
    }
  };

  // El logo tiene que estar pintado ANTES de imprimir o sale un hueco. Se espera a
  // la imagen, con un plazo máximo para que un logo que no carga no deje al
  // distribuidor esperando un diálogo que nunca abre.
  const img = doc.querySelector('.cot-logo');
  let disparado = false;
  const unaVez = () => { if (!disparado) { disparado = true; lanzar(); } };
  if (img && !img.complete) {
    img.addEventListener('load', unaVez, { once: true });
    img.addEventListener('error', unaVez, { once: true });
    setTimeout(unaVez, 2500);
  } else {
    setTimeout(unaVez, 120);
  }
}
