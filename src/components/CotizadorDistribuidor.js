import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Plus, Minus, Trash2, FileText, Share2, Printer, Sparkles, Mail, X, Loader2,
  Gift, Link2, Copy, Truck,
} from 'lucide-react';
import { toast } from 'sonner';
import { StateField } from '@/components/CountryPhoneFields';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import api from '@/lib/api';
import {
  hojaCotizacionHTML, imprimirCotizacion, nuevoFolio, money,
} from '@/lib/hojaCotizacion';

/* Cotizador del distribuidor — genera una cotización presentable para el cliente
   final: se ve en pantalla, se imprime en una carta y se manda por correo.

   ⛔ REGLA DE ORO: aquí NUNCA entra el costo real, el proveedor ni el ROI.
   Este componente solo conoce: precio público, el descuento que el distribuidor
   puede dar (su tasa efectiva, topada por producto) y los totales. El costo es
   territorio EXCLUSIVO del admin.

   La HOJA (vista previa e impresión) vive en `@/lib/hojaCotizacion`: un solo
   documento para los dos usos, para que lo que se ve sea exactamente lo que sale
   en papel. El correo lo arma el SERVIDOR con sus propios precios — ver
   `/distributor/quote/email`: si esta pantalla mintiera, el correo no la sigue. */

// A dónde manda el enlace de la cotización (Christián, 2026-07-30): al CHECKOUT,
// con el carrito YA ARMADO — `?pedido=id:cantidad,...` — y el código del
// distribuidor pegado. El sitio hidrata el carrito contra el catálogo real y
// aplica el código solo (ver CartContext): el cliente aterriza a un paso de
// pagar y la venta se le atribuye aunque no escriba nada. Sin renglones (no
// debería pasar: la hoja se genera con productos) el enlace cae al catálogo.
const SITIO_URL = 'https://exygenlabs.com';
const CATALOGO_URL = `${SITIO_URL}/catalogo`;

const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* CUÁNTAS PRESENTACIONES ENSEÑA EL BUSCADOR (Christián, 2026-08-01).
   Eran SEIS, y la Retatrutida tiene siete presentaciones: la de 60 mg —viva en el
   catálogo, con 20 piezas— quedaba fuera de la lista y para Mónica sencillamente no
   existía. Ahora caben todas las de cualquier familia del catálogo y la lista se
   desplaza; el número es un freno contra una búsqueda de dos letras que traiga medio
   catálogo, no un límite de negocio. */
const MAX_SUGERENCIAS = 25;

// Piezas máximas de UN obsequio. Mismo número que `regalos.MAX_PIEZAS_OBSEQUIO` en
// el backend, que es quien manda: pedir 9 y que el servidor guarde 5 sería mentirle
// a la pantalla.
const MAX_PIEZAS_OBSEQUIO = 5;

// `conEncabezado` en false quita el título de arriba: lo usa "Mis Herramientas",
// donde el nombre de la sección ya lo pone el acordeón y repetirlo se lee como un
// error. El diseño no cambia; sólo se apaga la parte que estorba ahí.
export default function CotizadorDistribuidor({
  catalogo = [], tasaMaxima = 0.15, codigo = '', conEncabezado = true, nombreDistribuidor = '',
}) {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [busqueda, setBusqueda] = useState('');
  const [renglones, setRenglones] = useState([]); // {id, nombre, presentacion, precio, topePct, qty}
  const [descuento, setDescuento] = useState(Math.min(0.10, tasaMaxima));
  const [vistaPrevia, setVistaPrevia] = useState(false);
  // Los datos del cliente: TODOS opcionales (Christián, 2026-07-30). Los que se
  // tengan se pintan en la hoja y viajan al correo; los que no, no estorban.
  const [nombreCliente, setNombreCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [telCliente, setTelCliente] = useState('');
  const [dirCliente, setDirCliente] = useState('');
  // EL DOMICILIO POR CAMPOS (Christián, 2026-08-02): ciudad, estado y CP como en
  // el checkout. Con el CP el envío se cotiza de verdad; sin él, «se cotiza por
  // separado» como hasta hoy.
  const [ciudadCliente, setCiudadCliente] = useState('');
  const [estadoCliente, setEstadoCliente] = useState('');
  const [cpCliente, setCpCliente] = useState('');
  const cpValido = /^\d{5}$/.test(cpCliente.trim());
  // El costo REAL de la guía a ese CP (null = sin cotizar; usa el estimado).
  const [costoGuiaCp, setCostoGuiaCp] = useState(null);
  // Autollenado: los clientes ya registrados que ESTE usuario puede ver. Lo que trae
  // cada uno lo decide el servidor según su rol (ver /cotizador/clientes).
  const [clientes, setClientes] = useState([]);
  const [sugerenciasAbiertas, setSugerenciasAbiertas] = useState(false);
  const [folio, setFolio] = useState(nuevoFolio);
  const [correoAbierto, setCorreoAbierto] = useState(false);
  const [correo, setCorreo] = useState('');
  const [enviando, setEnviando] = useState(false);
  // Cómo le fue al correo, para que se QUEDE en pantalla. Ver `enviarCorreo`.
  const [resultadoCorreo, setResultadoCorreo] = useState(null); // {ok, texto}

  // OBSEQUIOS (Christián, 2026-08-01). Un producto de cortesía o el envío. Se apilan
  // con el descuento del código, y su CÓDIGO INTERNO no existe en esta pantalla: lo
  // genera y lo guarda el servidor al compartir el carrito, y no vuelve nunca.
  // [{tipo:'producto', product_id, nombre, cantidad} | {tipo:'envio'}]
  const [obsequios, setObsequios] = useState([]);
  const [buscaObsequio, setBuscaObsequio] = useState('');
  const [carrito, setCarrito] = useState(null);      // {url} del enlace ya creado
  const [compartiendoCarrito, setCompartiendoCarrito] = useState(false);

  // ⛔ LA POLÍTICA DE ENVÍO NO SE ESCRIBE AQUÍ: SE PIDE. Vive en el backend
  // (`envios.py` + `SHIPPING_FLAT` / `FREE_SHIPPING_FROM`) y viaja por
  // `/payments/config`, la MISMA ruta que ya usa el carrito del cliente. Copiada a
  // mano se desalinea en silencio, y una cotización que promete envío gratis donde
  // la caja cobra $250 es exactamente la mentira que ya costó dinero.
  //
  // Mientras la configuración no llega, `shipping_charged` es false y el renglón de
  // envío simplemente no se pinta: no se promete nada de más.
  const [envioCfg, setEnvioCfg] = useState({ shipping_charged: false });
  useEffect(() => {
    let vivo = true;
    api.get('/payments/config')
      .then((r) => { if (vivo && r.data?.free_shipping_from) setEnvioCfg(r.data); })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  // La tasa la trae el servidor DESPUÉS del primer pintado. Sin esto el control
  // se queda clavado en el 0% con el que arrancó, y el cotizador no descuenta
  // nada por más que se mueva la barra.
  useEffect(() => {
    setDescuento((d) => (d > tasaMaxima ? tasaMaxima
      : (d === 0 ? Math.min(0.10, tasaMaxima) : d)));
  }, [tasaMaxima]);

  const sugerencias = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (q.length < 2) return [];
    return catalogo
      .filter((p) => `${p.name} ${p.presentation || ''}`.toLowerCase().includes(q))
      .slice(0, MAX_SUGERENCIAS);
  }, [busqueda, catalogo]);

  // Los clientes registrados, para el autollenado. Se piden UNA vez al abrir.
  // Si la ruta falla (sesión vencida, red), se sigue sin autollenado: cotizar a mano
  // tiene que funcionar siempre — es lo que se hacía hasta hoy.
  useEffect(() => {
    let vivo = true;
    api.get('/cotizador/clientes')
      .then((r) => { if (vivo) setClientes(r.data?.clientes || []); })
      .catch(() => { if (vivo) setClientes([]); });
    return () => { vivo = false; };
  }, []);

  const sugerenciasClientes = useMemo(() => {
    const q = nombreCliente.trim().toLowerCase();
    if (q.length < 2) return [];
    // Se busca por nombre Y por correo: a veces uno se acuerda del correo y no del
    // apellido. El correo sólo existe aquí si el servidor lo mandó.
    const hay = clientes.filter((c) => `${c.name || ''} ${c.email || ''}`
      .toLowerCase().includes(q));
    // Si ya coincide exacto con el único resultado, la lista estorba.
    if (hay.length === 1 && (hay[0].name || '').toLowerCase() === q) return [];
    return hay.slice(0, 6);
  }, [nombreCliente, clientes]);

  // Rellena con lo que el servidor haya mandado de ese cliente. Los campos que no
  // vinieron se dejan EN BLANCO a propósito: no se inventa lo que no se puede ver.
  const elegirCliente = (c) => {
    setNombreCliente(c.name || '');
    setCorreoCliente(c.email || '');
    setTelCliente(c.phone || '');
    setDirCliente(c.address || '');
    setSugerenciasAbiertas(false);
  };

  const agregar = (p) => {
    setRenglones((r) => {
      const ya = r.find((x) => x.id === p.id);
      if (ya) return r.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x));
      return [...r, { id: p.id, nombre: p.name, presentacion: p.presentation, precio: p.price, topePct: p.discount_cap ?? tasaMaxima, qty: 1 }];
    });
    setBusqueda('');
  };
  const cambiarQty = (id, d) => setRenglones((r) => r
    .map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)));
  const quitar = (id) => setRenglones((r) => r.filter((x) => x.id !== id));

  // ------------------------------------------------------------- los obsequios
  // Volver a elegir el mismo producto SUMA una pieza en vez de no hacer nada: es lo
  // que la mano espera, y era lo único que se podía hacer antes de que hubiera
  // cantidad (Christián, 2026-08-01: «que se pueda poner 1, 2, 3…»).
  const agregarObsequio = (p) => {
    setObsequios((o) => (o.some((x) => x.product_id === p.id)
      ? o.map((x) => (x.product_id === p.id
        ? { ...x, cantidad: Math.min(MAX_PIEZAS_OBSEQUIO, (x.cantidad || 1) + 1) } : x))
      : [...o, { tipo: 'producto', product_id: p.id, nombre: p.name, cantidad: 1 }]));
    setBuscaObsequio('');
  };
  // La cantidad del obsequio: con flechitas y tecleando. Se acota entre 1 y el
  // máximo del servidor; lo que no es número se queda en 1 en vez de romper la fila.
  const cambiarCantidadObsequio = (pid, n) => setObsequios((o) => o.map((x) => (
    x.product_id === pid && x.tipo === 'producto'
      ? { ...x, cantidad: Math.max(1, Math.min(MAX_PIEZAS_OBSEQUIO, Math.round(Number(n)) || 1)) }
      : x)));
  const alternarEnvioDeCortesia = () => setObsequios((o) => (o.some((x) => x.tipo === 'envio')
    ? o.filter((x) => x.tipo !== 'envio') : [...o, { tipo: 'envio' }]));
  const quitarObsequio = (llave) => setObsequios(
    (o) => o.filter((x) => (x.tipo === 'envio' ? 'envio' : x.product_id) !== llave));

  /* EL DESCUENTO, CON BOTONES (Christián, 2026-08-01): «botones: 5%, 10%, 15%, 20%…
     más fácil para Mónica». Era una barra deslizante, que en un teléfono es una
     lotería: se arrastra el dedo y sale 13%.
     Los escalones son de 5 en 5 hasta SU tope, y si el tope no cae en un múltiplo de
     5 se agrega él mismo al final — el número que más le sirve es justamente el
     máximo que puede dar. El 0% va primero: cotizar sin descuento también es cotizar.
     Y queda el campo para teclear un número intermedio, porque quitarlo sería quitar
     algo que ya se podía hacer. */
  // EL CP SUGIERE CIUDAD Y ESTADO (mismo ayudante que el checkout). Lo tecleado
  // a mano no se pisa; lo que puso ESTA sugerencia sí se reemplaza al corregir
  // el CP — un CP equivocado no puede dejar pegada la ciudad del error.
  const sugeridoCp = useRef({ city: '', state: '' });
  useEffect(() => {
    if (!cpValido) return undefined;
    let vivo = true;
    const timer = setTimeout(() => {
      api.get(`/cp/${cpCliente.trim()}`).then((r) => {
        if (!vivo || !r.data?.found) return;
        // La sugerencia ANTERIOR se copia a una constante ANTES de tocar nada:
        // los updaters de React corren después, y comparar contra la referencia
        // viva ya corregida dejaba el estado del CP equivocado pegado.
        const previo = sugeridoCp.current;
        sugeridoCp.current = { city: r.data.city || '', state: r.data.state || '' };
        setCiudadCliente((c) => ((!c || c === previo.city) ? (r.data.city || '') : c));
        setEstadoCliente((s) => ((!s || s === previo.state) ? (r.data.state || '') : s));
      }).catch(() => {});
    }, 500);
    return () => { vivo = false; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpCliente, cpValido]);

  // Y CON EL CP SE COTIZA LA GUÍA REAL (Christián, 2026-08-02): la misma ruta
  // que usa la caja. Si la paquetería no contesta, manda el estimado de la casa
  // — que es el mismo respaldo con el que cobra el servidor.
  const huellaParaEnvio = JSON.stringify(renglones.map((x) => [x.id, x.qty]));
  useEffect(() => {
    setCostoGuiaCp(null);
    if (!cpValido || !renglones.length) return undefined;
    let vivo = true;
    const timer = setTimeout(() => {
      api.post('/shipping/quote', {
        postal_code: cpCliente.trim(), state: estadoCliente || '', city: ciudadCliente || '',
        items: renglones.map((x) => ({ product_id: x.id, name: x.nombre,
                                       price: x.precio, quantity: x.qty })),
      }).then((r) => {
        if (!vivo) return;
        const precios = (r.data?.options || []).map((o) => Number(o.price)).filter((p) => p > 0);
        setCostoGuiaCp(precios.length ? Math.min(...precios) : null);
      }).catch(() => { if (vivo) setCostoGuiaCp(null); });
    }, 700);
    return () => { vivo = false; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpCliente, cpValido, huellaParaEnvio]);

  const pasosDescuento = useMemo(() => {
    const max = Math.round((tasaMaxima || 0) * 100);
    const pasos = [0];
    for (let p = 5; p <= max; p += 5) pasos.push(p);
    if (max > 0 && !pasos.includes(max)) pasos.push(max);
    return pasos;
  }, [tasaMaxima]);

  const sugerenciasObsequio = useMemo(() => {
    const q = buscaObsequio.trim().toLowerCase();
    if (q.length < 2) return [];
    return catalogo
      .filter((p) => `${p.name} ${p.presentation || ''}`.toLowerCase().includes(q))
      .slice(0, MAX_SUGERENCIAS);
  }, [buscaObsequio, catalogo]);

  // ⛔ UN ENLACE VIEJO NO PUEDE SEGUIR EN PANTALLA CUANDO EL CARRITO YA CAMBIÓ. El
  // enlace guarda en el servidor lo que había al crearlo; si Mónica mueve un
  // producto, el descuento o un regalo y lo manda igual, su cliente abre otra cosa
  // distinta de la que ella está viendo. Se borra y ella vuelve a picar el botón.
  // Se comparan como texto (y en una variable con nombre, no dentro del arreglo de
  // dependencias) porque son arreglos de objetos: por referencia cambian en cada
  // pintado y el enlace se borraría solo mientras Mónica lo está copiando.
  const huellaRenglones = JSON.stringify(renglones);
  const huellaObsequios = JSON.stringify(obsequios);
  // Los datos del cliente también cuentan: desde el 2026-08-01 viajan DENTRO del
  // carrito guardado (es lo que prellena el checkout), así que un enlace hecho antes
  // de corregir el teléfono llevaría el teléfono viejo.
  useEffect(() => {
    setCarrito(null);
  }, [huellaRenglones, huellaObsequios, descuento, nombreCliente,
    correoCliente, telCliente, dirCliente, ciudadCliente, estadoCliente, cpCliente]);

  // SIN DESCUENTO PROPIO, MANDA LA PROMO DE LA CASA (Christián, 2026-08-01): al 0%
  // el cliente recibe los automáticos —10%, o 15% desde $35,000 de mercancía
  // descuentable— igual que si llegara solo al sitio. El servidor hace ESTA misma
  // cuenta al armar el enlace y al cobrar (`_armar_cotizacion` y `create_order`);
  // si esta pantalla la omitiera, la hoja y el WhatsApp dirían un total distinto
  // del que el cliente ve al abrir el carrito.
  const baseDescuentable = renglones.reduce(
    (s, x) => s + (x.topePct > 0 ? x.precio * x.qty : 0), 0);
  const promoCasa = baseDescuentable >= 35000 ? 0.15 : 0.10;
  const sinDescuentoPropio = descuento <= 0;
  // El descuento de cada renglón respeta su tope por producto; los insumos van sin
  // descuento. La promo de la casa no se recorta con el máximo del distribuidor.
  const filas = renglones.map((x) => {
    const pct = sinDescuentoPropio
      ? Math.min(promoCasa, x.topePct)
      : Math.min(descuento, x.topePct, tasaMaxima);
    const unit = Math.round(x.precio * (1 - pct));
    return { ...x, pct, unit, importe: unit * x.qty, lista: x.precio * x.qty };
  });
  const subtotalLista = filas.reduce((s, f) => s + f.lista, 0);
  const mercancia = filas.reduce((s, f) => s + f.importe, 0);
  const descuentoPesos = subtotalLista - mercancia;
  // ⛔ EL PORCENTAJE QUE PIDIÓ CHRISTIÁN: descuento ÷ precio de lista, no la barra.
  // La barra dice cuánto se PIDE; esto dice cuánto se dio de verdad, ya recortado
  // renglón por renglón por el tope de cada producto. Con insumos en el carrito los
  // dos números no coinciden, y el que el cliente puede comprobar con una división
  // es éste.
  const descuentoPct = subtotalLista > 0 ? Math.round((descuentoPesos / subtotalLista) * 100) : 0;

  /* EL ENVÍO. Los dos candados de la casa, EN ORDEN (Christián, 2026-07-31), con los
     números que manda el servidor: 1º la compra mínima —abajo de ella se paga la
     tarifa plana—; 2º el tope —la casa absorbe hasta su 5% y el cliente pone la
     diferencia—. Es la misma cuenta que ya hace `CartContext`, contra los mismos
     parámetros, para que la cotización y el carrito digan el mismo número.

     ⛔ Y EL ENVÍO SUMA AL TOTAL, NUNCA RESTA. */
  const cobraEnvio = envioCfg.shipping_charged === true && filas.length > 0;
  const envioDeCortesia = obsequios.some((o) => o.tipo === 'envio');
  // ⛔ SIN DIRECCIÓN NO SE COTIZA ENVÍO (Christián, 2026-08-01): si el
  // distribuidor no capturó la dirección del cliente, la cotización NO enseña
  // un costo de envío — se calcula con la dirección al pagar. El envío de
  // cortesía sí se enseña (es gratis con o sin dirección). El servidor hace la
  // misma cuenta en el carrito compartido (`_resolver_carrito`).
  // Con el CP (o al menos la calle) ya se cotiza; sin nada, por separado.
  const envioPendiente = cobraEnvio && !envioDeCortesia && !cpValido && !dirCliente.trim();
  const envio = (() => {
    if (!cobraEnvio || envioDeCortesia || envioPendiente) return 0;
    if (mercancia < (Number(envioCfg.free_shipping_from) || 0)) return Number(envioCfg.shipping_flat) || 0;
    const tope = Number(envioCfg.shipping_cap_rate) || 0;
    if (tope <= 0) return 0;                       // servidor sin tope: la regla de antes
    // Con CP cotizado manda la guía REAL; si no, el estimado de la casa. Es la
    // misma cuenta de la caja (piso de absorción: $250 o el 5%, lo mayor).
    const costo = (cpValido && costoGuiaCp) ? costoGuiaCp
      : Number(envioCfg.shipping_cost_estimate) || Number(envioCfg.shipping_flat) || 0;
    const piso = Number(envioCfg.shipping_absorb_floor) || 0;
    return Math.max(0, Math.round(costo - Math.max(piso, mercancia * tope)));
  })();
  const total = mercancia + envio;

  // Las cortesías tal como las ve el CLIENTE: nombre y cantidad. Su código no está
  // aquí porque no existe en el navegador — lo genera el servidor al compartir.
  const regalosVisibles = obsequios.map((o) => (o.tipo === 'envio'
    ? { tipo: 'envio', nombre: t('cotizador.obsequioEnvio'), cantidad: 1 }
    : { tipo: 'producto', nombre: o.nombre, cantidad: o.cantidad }));

  // El enlace de la cotización: el checkout con estos MISMOS renglones y SU
  // código. Es lo que convierte una cotización en una venta atribuida — sin el
  // ?ref=, el cliente compra y la comisión no es de nadie.
  const pedidoPayload = filas.map((f) => `${f.id}:${f.qty}`).join(',');

  /* LOS DOS ENLACES DE LA COTIZACIÓN (Christián, 2026-08-01).

       1. VER LA COTIZACIÓN — la vuelve a abrir sin depender del PDF, que es
          justo lo que se pierde en una conversación de WhatsApp.
       2. PAGAR — el carrito de ESA cotización, con sus precios y sus cortesías.

     Los dos cuelgan del MISMO token del carrito compartido, que se crea solo al
     generar la hoja. ⛔ El token es OPACO: no lleva precios ni el código del
     obsequio; el servidor resuelve todo por dentro al abrirlo y al cobrar.

     Sin token (el servidor no contestó, o el regalo no cabía) se cae al enlace de
     siempre: el checkout con `?pedido=`, que ya funcionaba. Una cotización sin
     enlace de pago sería peor que una con el enlace genérico. */
  const token = carrito?.token || '';
  // El FRAGMENTO con la llave de los datos del cliente. Va en los dos enlaces para
  // que el checkout llegue prellenado por cualquiera de los dos caminos. Si el
  // distribuidor no capturó correo, teléfono ni domicilio, el servidor no reparte
  // llave y esto queda vacío: un secreto que no abre nada no se manda.
  const fragmentoDatos = carrito?.clave ? `#d=${encodeURIComponent(carrito.clave)}` : '';
  const enlaceCotizacion = token ? `${SITIO_URL}/carrito/${token}${fragmentoDatos}` : '';
  const enlacePago = token
    ? `${SITIO_URL}/checkout?pedido=${encodeURIComponent(pedidoPayload)}&cart=${encodeURIComponent(token)}${codigo ? `&ref=${encodeURIComponent(codigo)}` : ''}${fragmentoDatos}`
    : (filas.length
      ? `${SITIO_URL}/checkout?pedido=${encodeURIComponent(pedidoPayload)}${codigo ? `&ref=${encodeURIComponent(codigo)}` : ''}`
      : (codigo ? `${CATALOGO_URL}?ref=${encodeURIComponent(codigo)}` : CATALOGO_URL));
  // En la hoja impresa la URL cruda (con sus ids) sería un ciempiés ilegible: se
  // pinta un texto corto y el enlace vivo queda en el href.
  const enlaceCotizacionTexto = t('cotizador.docVerCotizacionTexto');
  const enlacePagoTexto = t('cotizador.docPagarTexto');

  // Las cadenas que necesita la hoja, ya traducidas. La hoja no sabe de i18n a
  // propósito: es un documento, no una pantalla.
  const textos = useMemo(() => ({
    docTitulo: t('cotizador.docTitulo'),
    docFolio: t('cotizador.docFolio'),
    docPara: t('cotizador.docPara'),
    docDe: t('cotizador.docDe'),
    docSinNombre: t('cotizador.docSinNombre'),
    docCodigo: t('cotizador.docCodigo'),
    colProducto: t('cotizador.colProducto'),
    colCant: t('cotizador.colCant'),
    colUnitario: t('cotizador.colUnitario'),
    colImporte: t('cotizador.colImporte'),
    cadaUno: t('cotizador.cadaUno'),
    docAntes: t('cotizador.docAntes'),
    // ⛔ «El Dinero» fuera (Christián, 2026-08-01): «no aplica bien en español».
    docResumen: t('cotizador.docResumen'),
    docVerCotizacion: t('cotizador.docVerCotizacion'),
    precioLista: t('cotizador.precioLista'),
    // ⛔ «Descuento X%», no «Ahorro» (Christián, 2026-08-01). El porcentaje ya viene
    // sustituido: la hoja es un documento y no sabe de i18n ni de interpolaciones.
    docDescuento: t('cotizador.docDescuento', { pct: descuentoPct }),
    docDescuentoCaja: t('cotizador.docDescuentoCaja', { pct: `${descuentoPct}%` }),
    docEnvio: t('cotizador.docEnvio'),
    docEnvioGratis: t('cotizador.docEnvioGratis'),
    docEnvioPendiente: t('cotizador.envioPendiente'),
    docCortesia: t('cotizador.docCortesia'),
    total: t('cotizador.total'),
    docLeyenda: t('cotizador.docLeyenda'),
    docCatalogo: t('cotizador.docCatalogo'),
    docPagar: t('cotizador.docPagar'),
  }), [t, descuentoPct]);

  // El domicilio completo en una línea, para la hoja y el correo.
  const dirCompleta = [dirCliente, ciudadCliente, estadoCliente, cpCliente]
    .map((x) => (x || '').trim()).filter(Boolean).join(', ');
  const datosHoja = {
    folio, fecha: new Date(), cliente: nombreCliente,
    clienteCorreo: correoCliente, clienteTel: telCliente, clienteDir: dirCompleta,
    codigo, distribuidor: nombreDistribuidor,
    enlaceCotizacion, enlaceCotizacionTexto, enlacePago, enlacePagoTexto,
    idioma: language, filas, subtotalLista,
    descuento: descuentoPesos, descuentoPct,
    regalos: regalosVisibles, envio, cobraEnvio, envioPendiente, total,
  };

  // Mismo motivo que arriba: son arreglos de objetos, y por referencia la hoja se
  // volvería a armar en cada pintado.
  const huellaFilas = JSON.stringify(filas);
  const huellaRegalos = JSON.stringify(regalosVisibles);

  const esOscuro = theme === 'dark'
    || (theme === 'system' && window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  // La vista previa pinta LA MISMA hoja que se imprime (misma función), sólo que
  // con la paleta del tema activo. Lo que ve es lo que sale.
  const hojaEnPantalla = useMemo(
    () => hojaCotizacionHTML({ ...datosHoja, textos }, {
      tema: esOscuro ? 'oscuro' : 'claro',
      origen: process.env.PUBLIC_URL || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [folio, nombreCliente, correoCliente, telCliente, dirCompleta, codigo, enlaceCotizacion, enlacePago, language, huellaFilas, huellaRegalos, envio, cobraEnvio, envioPendiente, total, esOscuro, textos],
  );

  const abrirVistaPrevia = async () => {
    const nuevo = nuevoFolio();
    setFolio(nuevo);          // cada cotización que se genera es un documento nuevo
    setCorreoAbierto(false);
    setResultadoCorreo(null); // documento nuevo, resultado de correo en blanco
    // Si ya se capturó el correo del cliente, el campo de "Enviar Por Correo"
    // llega lleno — se puede corregir, pero no hay que teclearlo dos veces.
    setCorreo((c) => c || correoCliente.trim());
    setVistaPrevia(true);
    // ⛔ LOS DOS ENLACES DE LA HOJA NECESITAN UN CARRITO GUARDADO. Se crea AQUÍ, al
    // generar, para que el PDF salga con enlaces vivos sin que Mónica tenga que
    // acordarse de picar otro botón. Si el servidor no contesta —o el regalo no
    // cabe— la hoja sale igual con el enlace de siempre: una cotización sin enlace
    // sería peor que una con el genérico.
    // Se rehace SIEMPRE, no sólo si no había: cada "Generar" estrena folio, y un
    // carrito guardado con el folio anterior haría que el enlace abriera una hoja
    // con un número distinto del que el cliente tiene en el PDF.
    await compartirCarrito({ silencioso: true, folio: nuevo });
  };

  // Compartir por WhatsApp SIN número fijo: wa.me sin destinatario abre la lista
  // de contactos y el distribuidor elige a quién se la manda. Con un número
  // pegado sólo serviría para mandársela a esa persona.
  // El texto de WhatsApp dice EXACTAMENTE lo mismo que la hoja: el descuento en
  // porcentaje, el envío como un renglón que suma, y las cortesías por su nombre.
  // ⛔ Y NUNCA el código del obsequio: aquí no hay ninguno que escribir.
  const textoDeWhatsApp = () => [
    `*EXYGEN LABS* — ${t('cotizador.docTitulo')} ${folio}`,
    nombreCliente ? `${t('cotizador.docPara')} ${nombreCliente}` : '',
    // Quién se la manda, igual que en la hoja: el cliente sabe con quién trata.
    nombreDistribuidor ? `${t('cotizador.docDe')} ${nombreDistribuidor}` : '',
    '',
    ...filas.map((f) => `• ${f.qty} × ${f.nombre} — ${money(f.importe)}`),
    ...regalosVisibles.map((g) => `• ${g.cantidad} × ${g.nombre} — ${t('cotizador.docCortesia')}`),
    '',
    descuentoPesos > 0
      ? `${t('cotizador.docDescuento', { pct: descuentoPct })}: −${money(descuentoPesos)}` : '',
    cobraEnvio
      ? `${t('cotizador.docEnvio')}: ${envioPendiente ? t('cotizador.envioPendiente')
        : envio > 0 ? money(envio) : t('cotizador.docEnvioGratis')}` : '',
    `*${t('cotizador.total')}: ${money(total)}*`,
    '',
    // LOS DOS ENLACES, los mismos que van en el PDF: volver a ver la cotización y
    // pagar con el carrito ya armado. ⛔ Ninguno lleva el código del obsequio.
    enlaceCotizacion ? `${t('cotizador.waVerCotizacion')} ${enlaceCotizacion}` : '',
    `${t('cotizador.waPagar')} ${enlacePago}`,
    codigo ? `${t('cotizador.docCodigo')} ${codigo}` : '',
    '',
    t('cotizador.docLeyenda'),
  ].filter(Boolean).join('\n');

  const compartir = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(textoDeWhatsApp())}`,
      '_blank', 'noopener,noreferrer');
  };

  /* EL CARRITO COMPARTIBLE. «¿Me lo construyes súper rápido?» (Christián, 2026-08-01).
     Se le pide al servidor un enlace: él guarda QUÉ y CUÁNTOS, genera el código
     interno del obsequio, comprueba que el regalo no rompa el ROI y devuelve una URL.

     ⛔ Del navegador no viaja ni un peso: ni precios, ni el valor del regalo, ni el
     envío. Todo eso lo recalcula el servidor al abrir el enlace y otra vez al cobrar.
     Y el código del obsequio no vuelve en la respuesta — no hay dónde enseñarlo. */
  const compartirCarrito = async ({ silencioso = false, folio: folioNuevo } = {}) => {
    setCompartiendoCarrito(true);
    try {
      const r = await api.post('/distributor/cart/share', {
        client_name: nombreCliente.trim(),
        // ⛔ LOS DATOS DEL CLIENTE VIAJAN Y SE GUARDAN (Christián, 2026-08-01).
        // Antes se tecleaban, se pintaban en la hoja… y se tiraban: el cliente
        // llegaba al checkout con todo vacío y tenía que escribirlos otra vez,
        // justo en el paso donde se pierde la venta. El servidor los guarda y sólo
        // los devuelve a quien abre ESTE enlace, con la llave del fragmento.
        client_email: correoCliente.trim(),
        client_phone: telCliente.trim(),
        client_address: dirCliente.trim(),
        client_city: ciudadCliente.trim(),
        client_state: estadoCliente.trim(),
        client_zip: cpCliente.trim(),
        discount: descuento,
        language,
        folio: folioNuevo || folio,
        items: filas.map((f) => ({ product_id: f.id, quantity: f.qty })),
        gifts: obsequios.map((o) => (o.tipo === 'envio'
          ? { tipo: 'envio' }
          : { tipo: 'producto', product_id: o.product_id, cantidad: o.cantidad })),
      });
      // `prefill_key` es la SEGUNDA llave del enlace: la que abre los datos del
      // cliente para prellenarle el checkout. Sólo llega aquí, a la pantalla de
      // quien armó la cotización, y se pega al enlace como FRAGMENTO (`#d=…`) —
      // la parte de una dirección que el navegador nunca manda a ningún servidor.
      setCarrito({ url: r.data.url, token: r.data.token, clave: r.data.prefill_key || '' });
      if (!silencioso) toast.success(t('cotizador.carritoListo'));
      return true;
    } catch (e) {
      // El 409 es el ÚNICO "no" de todo esto, y es del lado de Mónica: el regalo se
      // pasa del margen que este pedido aguanta. Se le dice con los dos números para
      // que sepa qué mover, en vez de un "no se pudo" que no explica nada.
      //
      // ⚠️ Este aviso SÍ se enseña aunque la llamada sea automática: si el regalo no
      // cupo, ella tiene que enterarse antes de mandar la hoja — la cotización sale
      // sin esa cortesía y callárselo sería peor.
      const d = e?.response?.data?.detail;
      if (e?.response?.status === 409 && d?.error === 'regalo_sin_margen') {
        toast.error(t('cotizador.obsequioSinMargen', {
          entregado: money(d.entregado), permitido: money(d.permitido),
        }));
      } else if (!silencioso) {
        toast.error(t('cotizador.carritoError'));
      }
      return false;
    } finally {
      setCompartiendoCarrito(false);
    }
  };

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(carrito.url);
      toast.success(t('cotizador.carritoCopiado'));
    } catch { /* sin portapapeles (http, permisos): el enlace se ve y se puede marcar */ }
  };

  const imprimir = () => imprimirCotizacion(datosHoja, textos);

  // El correo lo MANDA EL SERVIDOR, y con SUS precios: aquí sólo viajan qué
  // productos, cuántos y cuánto descuento se pidió. Si esta pantalla estuviera
  // manipulada, el correo saldría con el precio real de todas formas.
  /* ⛔ EL CORREO NO PUEDE FINGIR (Christián, 2026-08-01): «Le di click a compartir
     por email pero NO recibí nada en mi email.»

     El botón sí llamaba al servidor y el servidor sí contestaba —con un 502 cuando el
     envío no salía—, pero lo único que se veía era un aviso rojo de dos segundos y
     medio que decía «intenta de nuevo». Encima de la vista previa, con la hoja
     ocupando la pantalla, ese aviso se va antes de que nadie lo lea: parece que no
     pasó nada. Y «intenta de nuevo» ni siquiera era cierto cuando el motivo era que
     el correo está APAGADO en el servidor — reintentar mil veces no lo va a encender.

     Ahora el resultado se QUEDA en pantalla hasta que ella lo cierre, dice el motivo
     real que manda el servidor, y cuando el correo no puede salir ofrece las dos
     salidas que sí funcionan: WhatsApp y el enlace del carrito. */
  const enviarCorreo = async () => {
    const destino = correo.trim();
    if (!CORREO_RE.test(destino)) {
      setResultadoCorreo({ ok: false, texto: t('cotizador.correoInvalido') });
      toast.error(t('cotizador.correoInvalido'));
      return;
    }
    setEnviando(true);
    setResultadoCorreo(null);
    try {
      await api.post('/distributor/quote/email', {
        email: destino,
        client_name: nombreCliente.trim(),
        client_email: correoCliente.trim(),
        client_phone: telCliente.trim(),
        // Al correo va el domicilio COMPLETO en una línea (es un documento).
        client_address: dirCompleta,
        discount: descuento,
        language,
        folio,
        items: filas.map((f) => ({ product_id: f.id, quantity: f.qty })),
      });
      setResultadoCorreo({ ok: true, texto: t('cotizador.correoEnviado', { email: destino }) });
      toast.success(t('cotizador.correoEnviado', { email: destino }));
      setCorreo('');
    } catch (e) {
      const codigoHttp = e?.response?.status;
      const motivo = e?.response?.data?.detail?.error;
      // Los tres «no» posibles, cada uno con su verdad. El de «apagado» es el que más
      // importa: no es un fallo pasajero y no se arregla insistiendo.
      const texto = motivo === 'correo_apagado' ? t('cotizador.correoApagado')
        : codigoHttp === 429 ? t('cotizador.correoDemasiados')
          : t('cotizador.correoError');
      setResultadoCorreo({ ok: false, texto });
      toast.error(texto);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-6" data-testid="cotizador-distribuidor">
      {/* Encabezado */}
      {conEncabezado && (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">
          <FileText className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg leading-tight">{t('cotizador.titulo')}</h3>
          <p className="text-sm text-muted-foreground">{t('cotizador.subtitulo')}</p>
        </div>
      </div>
      )}

      {/* Buscador con sugerencias */}
      <Card className="p-4">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
            placeholder={t('cotizador.buscar')} className="pl-9" data-testid="cotizador-buscar" />
          {sugerencias.length > 0 && (
            <Card className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto divide-y divide-border shadow-lg">
              {sugerencias.map((p) => (
                <button key={p.id} type="button" onClick={() => agregar(p)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent transition-colors text-left">
                  <span className="truncate">{p.name}</span>
                  <span className="text-muted-foreground shrink-0 ml-3">{money(p.price)}</span>
                </button>
              ))}
            </Card>
          )}
        </div>

        {/* Renglones.
            En un teléfono de 375 px al nombre le quedaban ~110 px entre los botones
            y el importe: "Retatrutida 10 mg" salía como "Ret…". En móvil el nombre
            se lleva su propio renglón (`basis-full`) y los controles bajan debajo;
            de sm en adelante es la misma fila de siempre. */}
        {filas.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">{t('cotizador.vacio')}</p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {filas.map((f) => (
              <div key={f.id} className="py-3 flex flex-wrap sm:flex-nowrap items-center gap-x-3 gap-y-1.5">
                <div className="basis-full sm:basis-auto sm:flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {money(f.unit)} {t('cotizador.cadaUno')}
                    {f.pct > 0 && (
                      <span className="ml-2 line-through opacity-60">{money(f.precio)}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => cambiarQty(f.id, -1)} aria-label="-"><Minus className="h-3.5 w-3.5" /></Button>
                  <span className="w-7 text-center text-sm tabular-nums">{f.qty}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => cambiarQty(f.id, 1)} aria-label="+"><Plus className="h-3.5 w-3.5" /></Button>
                </div>
                <span className="flex-1 sm:flex-none sm:w-20 text-right text-sm font-medium tabular-nums">{money(f.importe)}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => quitar(f.id)} aria-label={t('common.remove')}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Descuento + totales */}
      {filas.length > 0 && (
        <Card className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">{t('cotizador.descuento')}</label>
              <span className="text-sm font-semibold tabular-nums">{Math.round(descuento * 100)}%</span>
            </div>
            {/* LOS BOTONES PRIMERO. Un toque = un descuento redondo. */}
            <div className="flex flex-wrap gap-1.5" data-testid="cotizador-descuento-botones">
              {pasosDescuento.map((p) => (
                <Button key={p} type="button" size="sm"
                  variant={Math.round(descuento * 100) === p ? 'default' : 'outline'}
                  className="h-8 px-3 tabular-nums"
                  onClick={() => setDescuento(p / 100)}
                  data-testid={`cotizador-descuento-${p}`}>
                  {p}%
                </Button>
              ))}
            </div>
            {/* Y el número a mano, para un 13% si lo quiere. Se acota a su tope aquí
                mismo: el servidor lo volvería a recortar, pero enseñar 30% cuando se
                van a dar 25% es prometer de más. */}
            <div className="flex items-center gap-2 mt-2">
              <label className="text-xs text-muted-foreground" htmlFor="cot-descuento-otro">
                {t('cotizador.descuentoOtro')}
              </label>
              <Input id="cot-descuento-otro" type="number" inputMode="numeric"
                min="0" max={Math.round(tasaMaxima * 100)} step="1"
                value={Math.round(descuento * 100)}
                onChange={(e) => {
                  const n = Math.round(Number(e.target.value));
                  if (!Number.isFinite(n)) return;
                  setDescuento(Math.max(0, Math.min(Math.round(tasaMaxima * 100), n)) / 100);
                }}
                className="h-8 w-20 text-sm" data-testid="cotizador-descuento" />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t('cotizador.topeNota')}</p>
            {/* AL 0%, EL AVISO: el cliente recibe la promo de la casa de todos modos.
                Sin esta línea, Mónica cree que cotizó a precio de lista y el carrito
                que abre su cliente trae 10% — parecería un error del sistema. */}
            {sinDescuentoPropio && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1"
                data-testid="cotizador-promo-casa">
                {t('cotizador.promoCasa', { pct: Math.round(promoCasa * 100) })}
              </p>
            )}
          </div>
          {/* EL BLOQUE DEL DINERO, con las palabras que pidió Christián: «Descuento
              X%» en vez de «Ahorro», y el envío como un renglón que SUMA. */}
          <div className="space-y-1.5 text-sm border-t border-border pt-3" data-testid="cotizador-dinero">
            <div className="flex justify-between text-muted-foreground">
              <span>{t('cotizador.precioLista')}</span><span className="tabular-nums">{money(subtotalLista)}</span>
            </div>
            {descuentoPesos > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400"
                data-testid="cotizador-descuento-renglon">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />{t('cotizador.descuentoPct', { pct: descuentoPct })}
                </span>
                <span className="tabular-nums">−{money(descuentoPesos)}</span>
              </div>
            )}
            {regalosVisibles.filter((g) => g.tipo === 'producto').map((g) => (
              <div key={g.nombre} className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1 min-w-0">
                  <Gift className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{g.cantidad} × {g.nombre}</span>
                </span>
                <span className="tabular-nums shrink-0 ml-2">{t('cotizador.docCortesia')}</span>
              </div>
            ))}
            {cobraEnvio && (
              <div className="flex justify-between text-muted-foreground" data-testid="cotizador-envio-renglon">
                <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" />{t('cotizador.envio')}</span>
                {envioPendiente
                  ? <span className="text-xs" data-testid="cotizador-envio-pendiente">{t('cotizador.envioPendiente')}</span>
                  : envio > 0
                    ? <span className="tabular-nums">{money(envio)}</span>
                    : <span className="tabular-nums text-emerald-600 dark:text-emerald-400">{t('cotizador.envioGratis')}</span>}
              </div>
            )}
            <div className="flex justify-between font-heading font-semibold text-base pt-1">
              <span>{t('cotizador.total')}</span><span className="tabular-nums">{money(total)}</span>
            </div>
          </div>

          {/* OBSEQUIOS. «Necesito que Mónica pueda agregar regalos por ejemplo agua
              bac o envío» (Christián, 2026-08-01).
              ⛔ Aquí NO hay ningún código que enseñar ni que esconder: el código del
              obsequio lo genera el SERVIDOR al compartir el carrito y no vuelve. */}
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex items-center gap-1.5">
              <Gift className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{t('cotizador.obsequios')}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t('cotizador.obsequiosNota')}</p>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={buscaObsequio} onChange={(e) => setBuscaObsequio(e.target.value)}
                placeholder={t('cotizador.obsequioBuscar')} className="pl-9"
                data-testid="cotizador-obsequio-buscar" />
              {sugerenciasObsequio.length > 0 && (
                <Card className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto divide-y divide-border shadow-lg">
                  {sugerenciasObsequio.map((p) => (
                    <button key={p.id} type="button" onClick={() => agregarObsequio(p)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent transition-colors text-left"
                      data-testid={`cotizador-obsequio-op-${p.id}`}>
                      <span className="truncate">{p.name}</span>
                      <span className="text-muted-foreground shrink-0 ml-3">{money(p.price)}</span>
                    </button>
                  ))}
                </Card>
              )}
            </div>
            <Button type="button" variant={envioDeCortesia ? 'default' : 'outline'}
              size="sm" className="gap-2" onClick={alternarEnvioDeCortesia}
              data-testid="cotizador-obsequio-envio">
              <Truck className="h-3.5 w-3.5" />{t('cotizador.obsequioEnvio')}
            </Button>
            {obsequios.length > 0 && (
              <ul className="space-y-1" data-testid="cotizador-obsequios-lista">
                {obsequios.map((o) => {
                  const llave = o.tipo === 'envio' ? 'envio' : o.product_id;
                  const nombre = o.tipo === 'envio' ? t('cotizador.obsequioEnvio') : o.nombre;
                  return (
                    <li key={llave} className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-sm">
                      <span className="flex items-center gap-1.5 min-w-0 flex-1 text-emerald-600 dark:text-emerald-400">
                        <Gift className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{nombre}</span>
                      </span>
                      {/* LA CANTIDAD DEL REGALO: flechitas y también a mano. El envío
                          no la lleva — regalar dos veces la misma guía no existe. */}
                      {o.tipo === 'producto' && (
                        <span className="flex items-center gap-1 shrink-0">
                          <Button variant="outline" size="icon" className="h-7 w-7"
                            onClick={() => cambiarCantidadObsequio(o.product_id, (o.cantidad || 1) - 1)}
                            disabled={(o.cantidad || 1) <= 1}
                            aria-label="-" data-testid={`cotizador-obsequio-menos-${o.product_id}`}>
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <Input type="number" inputMode="numeric" min="1" max={MAX_PIEZAS_OBSEQUIO}
                            value={o.cantidad || 1}
                            onChange={(e) => cambiarCantidadObsequio(o.product_id, e.target.value)}
                            className="h-7 w-14 text-center text-sm tabular-nums px-1"
                            aria-label={t('cotizador.obsequioCantidad')}
                            data-testid={`cotizador-obsequio-cant-${o.product_id}`} />
                          <Button variant="outline" size="icon" className="h-7 w-7"
                            onClick={() => cambiarCantidadObsequio(o.product_id, (o.cantidad || 1) + 1)}
                            disabled={(o.cantidad || 1) >= MAX_PIEZAS_OBSEQUIO}
                            aria-label="+" data-testid={`cotizador-obsequio-mas-${o.product_id}`}>
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </span>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => quitarObsequio(llave)} aria-label={t('cotizador.obsequioQuitar')}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {/* Datos del cliente: NINGUNO obligatorio. Los que existan se pintan
              en la hoja y viajan en el correo; los vacíos no dejan hueco.

              AUTOLLENADO: al teclear el nombre se sugieren los clientes YA
              REGISTRADOS y al elegir uno se rellena lo que se tenga de él.
              ⛔ Lo que se rellena es lo que el SERVIDOR mandó, ni un campo más: a un
              distribuidor sin visibilidad completa no le llegan correo, teléfono ni
              domicilio, así que aquí no hay nada que pintar aunque se quisiera. El
              candado no está en esta pantalla — está en /cotizador/clientes. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div className="relative">
              <Input value={nombreCliente} autoComplete="off"
                onChange={(e) => { setNombreCliente(e.target.value); setSugerenciasAbiertas(true); }}
                onFocus={() => setSugerenciasAbiertas(true)}
                onBlur={() => setTimeout(() => setSugerenciasAbiertas(false), 150)}
                placeholder={t('cotizador.nombreCliente')} data-testid="cotizador-cliente-nombre" />
              {sugerenciasAbiertas && sugerenciasClientes.length > 0 && (
                <ul className="absolute z-20 left-0 right-0 mt-1 max-h-56 overflow-auto rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-lg"
                  data-testid="cotizador-sugerencias-cliente">
                  {sugerenciasClientes.map((c) => (
                    <li key={c.id}>
                      <button type="button" onMouseDown={() => elegirCliente(c)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-[hsl(var(--muted))]"
                        data-testid={`cotizador-sugerencia-${c.id}`}>
                        <span className="font-medium">{c.name}</span>
                        {c.email && <span className="text-muted-foreground"> · {c.email}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Input type="email" inputMode="email" value={correoCliente}
              onChange={(e) => setCorreoCliente(e.target.value)}
              placeholder={t('cotizador.correoCliente')} data-testid="cotizador-cliente-correo" />
            <Input type="tel" inputMode="tel" value={telCliente}
              onChange={(e) => setTelCliente(e.target.value)}
              placeholder={t('cotizador.telCliente')} data-testid="cotizador-cliente-tel" />
            <Input value={dirCliente} onChange={(e) => setDirCliente(e.target.value)}
              placeholder={t('cotizador.dirCliente')} data-testid="cotizador-cliente-dir" />
            {/* EL DOMICILIO POR CAMPOS, como en el checkout (Christián, 2026-08-02).
                El CP es el que importa: con él la cotización trae el envío real y
                el checkout del cliente llega con todo puesto. */}
            <div className="grid grid-cols-2 gap-2">
              <Input value={cpCliente} inputMode="numeric" maxLength={5}
                onChange={(e) => setCpCliente(e.target.value.replace(/\D/g, ''))}
                placeholder={t('checkout.postalCode')} data-testid="cotizador-cliente-cp" />
              <Input value={ciudadCliente} onChange={(e) => setCiudadCliente(e.target.value)}
                placeholder={t('checkout.city')} data-testid="cotizador-cliente-ciudad" />
            </div>
            <StateField country="MX" value={estadoCliente} onChange={setEstadoCliente}
              testid="cotizador-cliente-estado" />
          </div>
          <Button onClick={abrirVistaPrevia} className="w-full gap-2" data-testid="cotizador-generar">
            <FileText className="h-4 w-4" />{t('cotizador.generar')}
          </Button>

          {/* EL CARRITO COMPARTIBLE. Un enlace que el cliente abre en su teléfono,
              sin cuenta, con el carrito ya armado y la venta atribuida a ella. */}
          <div className="rounded-xl border border-border bg-muted/30 p-3 space-y-2">
            <Button variant="secondary" className="w-full gap-2" onClick={() => compartirCarrito()}
              disabled={compartiendoCarrito} data-testid="cotizador-compartir-carrito">
              {compartiendoCarrito ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
              {t('cotizador.compartirCarrito')}
            </Button>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {t('cotizador.compartirCarritoNota')}
            </p>
            {carrito?.url && (
              <div className="flex flex-col sm:flex-row gap-2" data-testid="cotizador-carrito-enlace">
                <Input readOnly value={carrito.url} className="sm:flex-1 text-xs"
                  onFocus={(e) => e.target.select()} />
                <Button variant="outline" className="gap-2 bg-card" onClick={copiarEnlace}>
                  <Copy className="h-4 w-4" />{t('cotizador.carritoCopiar')}
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Vista previa — el documento que ve el CLIENTE (sin costos, sin topes, sin nada interno).
          Es la MISMA hoja que se imprime, pintada con la paleta del tema activo. */}
      {vistaPrevia && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          onClick={() => setVistaPrevia(false)} data-testid="cotizador-preview">
          <div className="w-full sm:max-w-2xl my-auto" onClick={(e) => e.stopPropagation()}>

            <div className="flex items-center justify-between px-4 sm:px-0 pb-2 pt-3 sm:pt-0">
              <span className="text-xs uppercase tracking-widest text-white/70">{t('cotizador.vistaPrevia')}</span>
              <button type="button" onClick={() => setVistaPrevia(false)}
                className="text-white/70 hover:text-white transition-colors p-1" aria-label={t('common.close')}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* La hoja. Sombra de papel y esquinas suaves: se lee como un documento. */}
            <div className="rounded-t-xl sm:rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10 max-h-[70vh] overflow-y-auto bg-white dark:bg-[#111]"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: hojaEnPantalla }}
            />

            <div className="flex flex-col gap-2 p-4 sm:px-0 sm:pt-3 bg-card sm:bg-transparent rounded-b-xl sm:rounded-none">
              {/* EL ENLACE, A LA MANO DESPUÉS DE GENERARLO (Christián, 2026-08-01).
                  Al generar la cotización el carrito ya se creó, pero su enlace se
                  quedaba abajo, TAPADO por esta misma ventana: para volver a copiarlo
                  había que cerrar la vista previa y buscarlo. Aquí está, en el mismo
                  lugar donde se decide a quién mandársela. */}
              {carrito?.url && (
                <div className="flex flex-col sm:flex-row gap-2" data-testid="cotizador-carrito-enlace-preview">
                  <Input readOnly value={carrito.url} className="sm:flex-1 text-xs bg-card"
                    onFocus={(e) => e.target.select()} aria-label={t('cotizador.carritoCopiar')} />
                  <Button variant="outline" className="gap-2 bg-card" onClick={copiarEnlace}
                    data-testid="cotizador-carrito-copiar-preview">
                    <Copy className="h-4 w-4" />{t('cotizador.carritoCopiar')}
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Button className="flex-1 gap-2" onClick={compartir} data-testid="cotizador-whatsapp">
                  <Share2 className="h-4 w-4" /><span className="truncate">{t('cotizador.compartir')}</span>
                </Button>
                <Button variant="secondary" className="flex-1 gap-2" onClick={imprimir} data-testid="cotizador-imprimir">
                  <Printer className="h-4 w-4" /><span className="truncate">{t('cotizador.imprimir')}</span>
                </Button>
              </div>
              {!correoAbierto ? (
                <Button variant="outline" className="w-full gap-2 bg-card"
                  onClick={() => setCorreoAbierto(true)} data-testid="cotizador-correo-abrir">
                  <Mail className="h-4 w-4" />{t('cotizador.enviarCorreo')}
                </Button>
              ) : (
                <div className="rounded-xl border border-border bg-card p-3 space-y-2" data-testid="cotizador-correo-form">
                  <label className="text-xs text-muted-foreground" htmlFor="cot-correo">
                    {t('cotizador.correoPide')}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input id="cot-correo" type="email" inputMode="email" autoComplete="email"
                      value={correo} onChange={(e) => setCorreo(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !enviando) enviarCorreo(); }}
                      placeholder="cliente@correo.com" className="sm:flex-1"
                      data-testid="cotizador-correo-input" />
                    <Button onClick={enviarCorreo} disabled={enviando} className="gap-2"
                      data-testid="cotizador-correo-enviar">
                      {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                      {t('cotizador.enviar')}
                    </Button>
                  </div>
                  {/* ⛔ EL RESULTADO SE QUEDA EN PANTALLA. Un aviso de dos segundos
                      encima de la hoja no lo lee nadie, y creerse enviado lo que no
                      salió es peor que no tener el botón. */}
                  {resultadoCorreo && (
                    <div data-testid="cotizador-correo-resultado"
                      className={`rounded-lg border p-2.5 text-xs leading-relaxed ${resultadoCorreo.ok
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : 'border-destructive/40 bg-destructive/10 text-destructive'}`}>
                      <p>{resultadoCorreo.texto}</p>
                      {!resultadoCorreo.ok && (
                        <p className="mt-1 opacity-90">{t('cotizador.correoAlternativa')}</p>
                      )}
                    </div>
                  )}
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{t('cotizador.correoNota')}</p>
                  {/* Que no sea una sorpresa: el correo lo firma la atención de la
                      casa, no el distribuidor. Su nombre y su correo no viajan al
                      cliente — es la regla, y más vale que la lea aquí. */}
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{t('cotizador.correoPrivacidad')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
