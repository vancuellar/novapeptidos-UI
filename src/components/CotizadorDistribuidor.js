import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Plus, Minus, Trash2, FileText, Share2, Printer, Sparkles,
} from 'lucide-react';
import { BrandMark } from '@/components/BrandLogo';
import { useLanguage } from '@/context/LanguageContext';

/* Cotizador del distribuidor — DISEÑO por F5 (2026-07-30).
   Genera una cotización presentable para el cliente final.

   ⛔ REGLA DE ORO: aquí NUNCA entra el costo real, el proveedor ni el ROI.
   Este componente solo conoce: precio público, el descuento que el
   distribuidor puede dar (su tasa efectiva compartida, topada por producto)
   y los totales. El costo es territorio EXCLUSIVO del admin.

   La lógica de datos (catálogo, topes por producto, tasa del distribuidor,
   compartir por WhatsApp/PDF) la cablea Codex — los puntos de enchufe están
   marcados con TODO(codex). */

const money = (n) => `$${(n || 0).toLocaleString('es-MX', { maximumFractionDigits: 0 })}`;

// A dónde manda el enlace de la cotización: el catálogo, con el código del
// distribuidor pegado. El sitio lo aplica solo al abrirlo (ver CartContext), así
// que la venta se le atribuye aunque el cliente no escriba nada.
const CATALOGO_URL = 'https://exygenlabs.com/catalogo';

// `conEncabezado` en false quita el título de arriba: lo usa "Mis Herramientas",
// donde el nombre de la sección ya lo pone el acordeón y repetirlo se lee como un
// error. El diseño no cambia; sólo se apaga la parte que estorba ahí.
export default function CotizadorDistribuidor({
  catalogo = [], tasaMaxima = 0.15, codigo = '', conEncabezado = true,
}) {
  const { t } = useLanguage();
  const [busqueda, setBusqueda] = useState('');
  const [renglones, setRenglones] = useState([]); // {id, nombre, presentacion, precio, topePct, qty}
  const [descuento, setDescuento] = useState(Math.min(0.10, tasaMaxima));
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [nombreCliente, setNombreCliente] = useState('');

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

  // El enlace del catálogo con SU código: es lo que convierte una cotización en
  // una venta atribuida. Sin él, el cliente compra y la comisión no es de nadie.
  const enlace = codigo
    ? `${CATALOGO_URL}?ref=${encodeURIComponent(codigo)}`
    : CATALOGO_URL;

  // Compartir por WhatsApp SIN número fijo: wa.me sin destinatario abre la lista
  // de contactos y el distribuidor elige a quién se la manda. Con un número
  // pegado sólo serviría para mandársela a esa persona.
  const compartir = () => {
    const texto = [
      `*EXYGEN LABS* — ${t('cotizador.docTitulo')}`,
      nombreCliente ? `${t('cotizador.docPara')} ${nombreCliente}` : '',
      '',
      ...filas.map((f) => `• ${f.qty} × ${f.nombre} — ${money(f.importe)}`),
      '',
      ahorro > 0 ? `${t('cotizador.docAhorro')} −${money(ahorro)}` : '',
      `*${t('cotizador.total')}: ${money(total)}*`,
      '',
      `${t('cotizador.waEnlace')} ${enlace}`,
      codigo ? `${t('cotizador.docCodigo')} ${codigo}` : '',
      '',
      t('cotizador.docLeyenda'),
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
  };

  // Imprimir SOLO la hoja de la cotización. La marca en el body es lo que enciende
  // la hoja de estilos de abajo — y de paso apaga el resumen imprimible de la
  // calculadora, que vive en la misma pantalla ("Mis Herramientas") y si no se
  // apaga sale pegado en la misma hoja.
  const imprimir = () => {
    const quitar = () => document.body.classList.remove('imprimiendo-cotizacion');
    document.body.classList.add('imprimiendo-cotizacion');
    window.addEventListener('afterprint', quitar, { once: true });
    window.print();
    setTimeout(quitar, 1500);   // red: no todos los navegadores avisan al terminar
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

        {/* Renglones */}
        {filas.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">{t('cotizador.vacio')}</p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {filas.map((f) => (
              <div key={f.id} className="py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
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
                <span className="w-20 text-right text-sm font-medium tabular-nums">{money(f.importe)}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => quitar(f.id)} aria-label={t('cotizador.quitar')}>
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
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <Input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)}
              placeholder={t('cotizador.nombreCliente')} className="sm:flex-1" />
            <Button onClick={() => setVistaPrevia(true)} className="gap-2" data-testid="cotizador-generar">
              <FileText className="h-4 w-4" />{t('cotizador.generar')}
            </Button>
          </div>
        </Card>
      )}

      {/* Vista previa — el documento que ve el CLIENTE (sin costos, sin topes, sin nada interno) */}
      {vistaPrevia && (
        <div className="cotizacion-capa fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-6" onClick={() => setVistaPrevia(false)}>
          <Card className="cotizacion-hoja w-full sm:max-w-md max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()} data-testid="cotizador-preview">
            <div id="cotizacion-imprimible" className="p-6 space-y-5">
              <div className="text-center space-y-1 border-b border-border pb-4">
                {/* El logo REAL del sitio: molécula + wordmark + "RESEARCH PEPTIDES". */}
                <BrandMark className="h-14 mx-auto" />
                <p className="text-sm font-medium pt-2">{t('cotizador.docTitulo')}</p>
                {nombreCliente && <p className="text-sm text-muted-foreground">{t('cotizador.docPara')} {nombreCliente}</p>}
                <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                {filas.map((f) => (
                  <div key={f.id} className="flex justify-between text-sm gap-3">
                    <span className="min-w-0 truncate">{f.qty} × {f.nombre}</span>
                    <span className="tabular-nums shrink-0">{money(f.importe)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-1 text-sm">
                {ahorro > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cotizador.docAhorro')}</span><span className="tabular-nums">−{money(ahorro)}</span>
                  </div>
                )}
                <div className="flex justify-between font-heading font-semibold text-lg">
                  <span>{t('cotizador.total')}</span><span className="tabular-nums">{money(total)}</span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                {t('cotizador.docLeyenda') /* RUO + vigencia de la cotización + código del distribuidor */}
                {codigo && <> · {t('cotizador.docCodigo')} <b>{codigo}</b></>}
              </p>
            </div>
            <div className="cotizacion-acciones flex gap-2 p-4 pt-0">
              <Button className="flex-1 gap-2" onClick={compartir} data-testid="cotizador-whatsapp"><Share2 className="h-4 w-4" />{t('cotizador.compartir')}</Button>
              <Button variant="outline" className="flex-1 gap-2" onClick={imprimir} data-testid="cotizador-imprimir"><Printer className="h-4 w-4" />{t('cotizador.imprimir')}</Button>
            </div>
          </Card>

          {/* Impresión: SOLO la hoja de la cotización. Se enciende con la marca
              que pone `imprimir()` en el body, para no pelearse con el resumen
              imprimible de la calculadora, que está en la misma pantalla. */}
          <style>{`
            @media print{
              body.imprimiendo-cotizacion *{visibility:hidden !important}
              body.imprimiendo-cotizacion #cotizacion-imprimible,
              body.imprimiendo-cotizacion #cotizacion-imprimible *{visibility:visible !important}
              body.imprimiendo-cotizacion #calc-print{display:none !important}
              body.imprimiendo-cotizacion .cotizacion-acciones{display:none !important}
              body.imprimiendo-cotizacion .cotizacion-capa{
                position:absolute !important;inset:auto !important;left:0;top:0;
                display:block !important;width:100%;padding:0 !important;background:none !important}
              body.imprimiendo-cotizacion .cotizacion-hoja{
                width:100% !important;max-width:none !important;max-height:none !important;
                overflow:visible !important;border:0 !important;box-shadow:none !important;
                border-radius:0 !important;background:#fff !important}
              body.imprimiendo-cotizacion #cotizacion-imprimible{color:#111 !important;padding:32px !important}
              /* En tema oscuro el logo va invertido a blanco: en papel sería invisible. */
              body.imprimiendo-cotizacion #cotizacion-imprimible img{filter:none !important}
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
