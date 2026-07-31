import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Plus, Minus, Trash2, FileText, Share2, Printer, Sparkles, Mail, X, Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
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

// `conEncabezado` en false quita el título de arriba: lo usa "Mis Herramientas",
// donde el nombre de la sección ya lo pone el acordeón y repetirlo se lee como un
// error. El diseño no cambia; sólo se apaga la parte que estorba ahí.
export default function CotizadorDistribuidor({
  catalogo = [], tasaMaxima = 0.15, codigo = '', conEncabezado = true,
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
  const [folio, setFolio] = useState(nuevoFolio);
  const [correoAbierto, setCorreoAbierto] = useState(false);
  const [correo, setCorreo] = useState('');
  const [enviando, setEnviando] = useState(false);

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
      .slice(0, 6);
  }, [busqueda, catalogo]);

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

  // El descuento de cada renglón respeta su tope por producto; los insumos van sin descuento.
  const filas = renglones.map((x) => {
    const pct = Math.min(descuento, x.topePct, tasaMaxima);
    const unit = Math.round(x.precio * (1 - pct));
    return { ...x, pct, unit, importe: unit * x.qty, lista: x.precio * x.qty };
  });
  const subtotalLista = filas.reduce((s, f) => s + f.lista, 0);
  const total = filas.reduce((s, f) => s + f.importe, 0);
  const ahorro = subtotalLista - total;

  // El enlace de la cotización: el checkout con estos MISMOS renglones y SU
  // código. Es lo que convierte una cotización en una venta atribuida — sin el
  // ?ref=, el cliente compra y la comisión no es de nadie.
  const pedidoPayload = filas.map((f) => `${f.id}:${f.qty}`).join(',');
  const enlace = filas.length
    ? `${SITIO_URL}/checkout?pedido=${encodeURIComponent(pedidoPayload)}${codigo ? `&ref=${encodeURIComponent(codigo)}` : ''}`
    : (codigo ? `${CATALOGO_URL}?ref=${encodeURIComponent(codigo)}` : CATALOGO_URL);
  // En la hoja impresa la URL cruda (con sus ids) sería un ciempiés ilegible: se
  // pinta un texto corto y el enlace vivo queda en el href.
  const enlaceTexto = filas.length ? `${SITIO_URL.replace('https://', '')}/checkout` : enlace;

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
    docDinero: t('cotizador.docDinero'),
    precioLista: t('cotizador.precioLista'),
    docAhorro: t('cotizador.docAhorro'),
    docAhorroCaja: t('cotizador.docAhorroCaja'),
    total: t('cotizador.total'),
    docLeyenda: t('cotizador.docLeyenda'),
    docCatalogo: t('cotizador.docCatalogo'),
    docPagar: t('cotizador.docPagar'),
  }), [t]);

  const datosHoja = {
    folio, fecha: new Date(), cliente: nombreCliente,
    clienteCorreo: correoCliente, clienteTel: telCliente, clienteDir: dirCliente,
    codigo, enlace, enlaceTexto,
    idioma: language, filas, subtotalLista, ahorro, total,
  };

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
    [folio, nombreCliente, correoCliente, telCliente, dirCliente, codigo, enlace, language, JSON.stringify(filas), total, esOscuro, textos],
  );

  const abrirVistaPrevia = () => {
    setFolio(nuevoFolio());   // cada cotización que se genera es un documento nuevo
    setCorreoAbierto(false);
    // Si ya se capturó el correo del cliente, el campo de "Enviar Por Correo"
    // llega lleno — se puede corregir, pero no hay que teclearlo dos veces.
    setCorreo((c) => c || correoCliente.trim());
    setVistaPrevia(true);
  };

  // Compartir por WhatsApp SIN número fijo: wa.me sin destinatario abre la lista
  // de contactos y el distribuidor elige a quién se la manda. Con un número
  // pegado sólo serviría para mandársela a esa persona.
  const compartir = () => {
    const texto = [
      `*EXYGEN LABS* — ${t('cotizador.docTitulo')} ${folio}`,
      nombreCliente ? `${t('cotizador.docPara')} ${nombreCliente}` : '',
      '',
      ...filas.map((f) => `• ${f.qty} × ${f.nombre} — ${money(f.importe)}`),
      '',
      ahorro > 0 ? `${t('cotizador.docAhorro')} −${money(ahorro)}` : '',
      `*${t('cotizador.total')}: ${money(total)}*`,
      '',
      `${t('cotizador.waPagar')} ${enlace}`,
      codigo ? `${t('cotizador.docCodigo')} ${codigo}` : '',
      '',
      t('cotizador.docLeyenda'),
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
  };

  const imprimir = () => imprimirCotizacion(datosHoja, textos);

  // El correo lo MANDA EL SERVIDOR, y con SUS precios: aquí sólo viajan qué
  // productos, cuántos y cuánto descuento se pidió. Si esta pantalla estuviera
  // manipulada, el correo saldría con el precio real de todas formas.
  const enviarCorreo = async () => {
    const destino = correo.trim();
    if (!CORREO_RE.test(destino)) { toast.error(t('cotizador.correoInvalido')); return; }
    setEnviando(true);
    try {
      await api.post('/distributor/quote/email', {
        email: destino,
        client_name: nombreCliente.trim(),
        client_email: correoCliente.trim(),
        client_phone: telCliente.trim(),
        client_address: dirCliente.trim(),
        discount: descuento,
        language,
        folio,
        items: filas.map((f) => ({ product_id: f.id, quantity: f.qty })),
      });
      toast.success(t('cotizador.correoEnviado', { email: destino }));
      setCorreoAbierto(false);
      setCorreo('');
    } catch (e) {
      const codigoHttp = e?.response?.status;
      toast.error(codigoHttp === 429 ? t('cotizador.correoDemasiados') : t('cotizador.correoError'));
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
            <Card className="absolute z-20 mt-2 w-full overflow-hidden divide-y divide-border shadow-lg">
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
            <input type="range" min="0" max={Math.round(tasaMaxima * 100)} step="1"
              value={Math.round(descuento * 100)}
              onChange={(e) => setDescuento(Number(e.target.value) / 100)}
              className="w-full accent-primary" data-testid="cotizador-descuento" />
            <p className="text-xs text-muted-foreground mt-1">{t('cotizador.topeNota')}</p>
          </div>
          <div className="space-y-1.5 text-sm border-t border-border pt-3">
            <div className="flex justify-between text-muted-foreground">
              <span>{t('cotizador.precioLista')}</span><span className="tabular-nums">{money(subtotalLista)}</span>
            </div>
            {ahorro > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" />{t('cotizador.ahorro')}</span>
                <span className="tabular-nums">−{money(ahorro)}</span>
              </div>
            )}
            <div className="flex justify-between font-heading font-semibold text-base pt-1">
              <span>{t('cotizador.total')}</span><span className="tabular-nums">{money(total)}</span>
            </div>
          </div>
          {/* Datos del cliente: NINGUNO obligatorio. Los que existan se pintan
              en la hoja y viajan en el correo; los vacíos no dejan hueco. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <Input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)}
              placeholder={t('cotizador.nombreCliente')} data-testid="cotizador-cliente-nombre" />
            <Input type="email" inputMode="email" value={correoCliente}
              onChange={(e) => setCorreoCliente(e.target.value)}
              placeholder={t('cotizador.correoCliente')} data-testid="cotizador-cliente-correo" />
            <Input type="tel" inputMode="tel" value={telCliente}
              onChange={(e) => setTelCliente(e.target.value)}
              placeholder={t('cotizador.telCliente')} data-testid="cotizador-cliente-tel" />
            <Input value={dirCliente} onChange={(e) => setDirCliente(e.target.value)}
              placeholder={t('cotizador.dirCliente')} data-testid="cotizador-cliente-dir" />
          </div>
          <Button onClick={abrirVistaPrevia} className="w-full gap-2" data-testid="cotizador-generar">
            <FileText className="h-4 w-4" />{t('cotizador.generar')}
          </Button>
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
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{t('cotizador.correoNota')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
