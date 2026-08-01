// ¿LAS CONVERSACIONES DE WHATSAPP VENDEN? El panel que cierra el círculo.
//
// ⛔ EL AGUJERO QUE TAPA (Christián, 2026-07-31). La semana del 25 al 31 de julio:
// $237 USD gastados, 110 conversaciones de WhatsApp a $39 MXN cada una, y CERO
// compras atribuidas por Meta. Las 3 ventas reales llegaron por otro lado. Nadie
// sabía si esas 110 conversaciones se volvieron ventas — y sin saberlo, subir o
// bajar el presupuesto es adivinar.
//
// POR QUÉ UN CÓDIGO. Una conversación de WhatsApp no tiene URL donde pegar un
// `utm`, no deja `fbclid` y no comparte cookie con el sitio: para Meta y para el
// píxel, esa venta nace de la nada. El cupón es lo ÚNICO que viaja con la persona
// desde el chat hasta el carrito.
//
// 🔒 El prefijo es de la CASA (`WA-`) y del anuncio. Nunca el nombre de quien lo
// reparte: los códigos dejaron de delatar al distribuidor el 2026-07-31.
import React, { useCallback, useEffect, useState } from 'react';
import { MessageCircle, Copy, Link2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api, { formatMXN } from '@/lib/api';

const copiar = (txt, que = 'Código') => {
  navigator.clipboard?.writeText(txt).then(
    () => toast.success(`${que} copiado`),
    () => toast.error('No se pudo copiar'));
};

const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

export default function WhatsApp() {
  const [d, setD] = useState(null);
  const [dias, setDias] = useState(7);
  const [campana, setCampana] = useState('');
  const [creando, setCreando] = useState(false);

  const cargar = useCallback(() => {
    api.get(`/admin/marketing/whatsapp?days=${dias}`)
      .then((r) => setD(r.data))
      .catch(() => toast.error('No se pudo cargar el panel de WhatsApp'));
  }, [dias]);

  useEffect(() => { cargar(); }, [cargar]);

  const crear = () => {
    if (!campana.trim()) { toast.error('Escribe de qué anuncio es el código'); return; }
    setCreando(true);
    api.post('/admin/marketing/whatsapp/codigos',
      { campana: campana.trim(), mes: MESES[new Date().getMonth()], discount_rate: 0.10 })
      .then((r) => {
        toast.success(`Listo: ${r.data.codigos[0]}`);
        copiar(r.data.mensaje, 'Mensaje para Mónica');
        setCampana('');
        cargar();
      })
      .catch((e) => toast.error(e?.response?.data?.detail || 'No se pudo crear el código'))
      .finally(() => setCreando(false));
  };

  if (!d) return <Card className="p-6 text-sm text-muted-foreground">Cargando…</Card>;

  return (
    <div className="space-y-4" data-testid="admin-whatsapp">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-heading font-semibold">WhatsApp</h3>
          <p className="text-xs text-muted-foreground">
            De la conversación a la venta. Es lo único que puede demostrar si el dinero
            de WhatsApp regresa.
          </p>
        </div>
        <div className="flex gap-2">
          {[7, 30, 90].map((n) => (
            <button key={n} onClick={() => setDias(n)} data-testid={`wa-dias-${n}`}
              className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${dias === n ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'border-border hover:bg-[hsl(var(--muted))]/40'}`}>
              Últimos {n} días
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Conversaciones</div>
          <div className="font-heading text-xl font-bold mt-1">{d.conversaciones}</div>
          <div className="text-[11px] text-muted-foreground mt-1">${d.costo_conversacion_usd} USD c/u</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Gasto</div>
          <div className="font-heading text-xl font-bold mt-1">${d.gasto_usd} USD</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Ventas con código</div>
          <div className="font-heading text-xl font-bold mt-1">{d.ventas}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Cobrado</div>
          <div className="font-heading text-xl font-bold mt-1">{formatMXN(d.cobrado_mxn)}</div>
        </Card>
      </div>

      {/* ⛔ LA TRAMPA MÁS CARA DE ESTE PANEL. Un 0% CON códigos repartidos dice
          «WhatsApp no vende: bájale». El mismo 0% SIN códigos repartidos no dice
          nada. Confundir las dos cosas cuesta el presupuesto, así que el panel se
          niega a enseñar el porcentaje hasta que haya con qué medir. */}
      {!d.medible ? (
        <Card className="p-5 border-[hsl(var(--warning-border))]" data-testid="wa-no-medible">
          <p className="text-sm">
            <strong>Todavía no se puede saber.</strong> Hay {d.conversaciones} conversaciones
            pagadas, pero ningún código repartido: no existe forma de que una de esas
            conversaciones demuestre que compró. Cero ventas aquí NO significa que WhatsApp
            no venda — significa que aún no se está midiendo. Crea el código de abajo y
            dáselo a Mónica.
          </p>
        </Card>
      ) : (
        <Card className="p-5" data-testid="wa-conversion">
          <div className="text-xs text-muted-foreground">De cada 100 conversaciones, cuántas compraron</div>
          <div className="font-heading text-2xl font-bold mt-1">{d.conversion}%</div>
          <p className="text-xs text-muted-foreground mt-1">
            Éste es el número con el que se decide si se sube o se baja el presupuesto
            de WhatsApp. Sólo cuenta lo que llegó con código: quien compró sin ponerlo
            no se puede atribuir, así que el número real es éste o un poco más.
          </p>
        </Card>
      )}

      {/* ---------------- crear el código ---------------- */}
      <Card className="p-5 space-y-3" data-testid="wa-crear">
        <div>
          <h4 className="font-heading font-semibold">Código para un anuncio</h4>
          <p className="text-xs text-muted-foreground">
            Uno por anuncio, reutilizable: Mónica pega el mismo en todos los chats de ese
            anuncio. Nombre corto («Reta», no «Retatrutida julio 2026»): el cliente lo
            teclea en el carrito y cada letra de más es una venta que se cae.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Input value={campana} onChange={(e) => setCampana(e.target.value)}
            placeholder="Reta" className="max-w-[220px]" data-testid="wa-campana" />
          <Button onClick={crear} disabled={creando} data-testid="wa-crear-btn">
            {creando ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
            <span className="ml-2">Crear código</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Nace con 10% de descuento y 30 días de vigencia.
        </p>
      </Card>

      {/* ---------------- lo que ha vendido cada anuncio ---------------- */}
      {d.campanas.length > 0 && (
        <Card className="p-5" data-testid="wa-campanas">
          <h4 className="font-heading font-semibold mb-3">Qué vendió cada anuncio</h4>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Anuncio</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Entregados</TableHead>
              <TableHead>Usados</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Cobrado</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {d.campanas.map((c) => (
                <TableRow key={c.campana}>
                  <TableCell className="text-sm font-medium">{c.campana}</TableCell>
                  <TableCell>
                    <button onClick={() => copiar(c.codigos[0])} className="text-xs underline underline-offset-2 inline-flex items-center gap-1">
                      {c.codigos[0]}{c.codigos.length > 1 && ` +${c.codigos.length - 1}`}
                      <Copy className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </TableCell>
                  <TableCell>{c.entregados}</TableCell>
                  <TableCell>{c.usados}</TableCell>
                  <TableCell>{c.pedidos}</TableCell>
                  <TableCell>{formatMXN(c.cobrado_mxn)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* ---------------- los enlaces para Meta ---------------- */}
      <Card className="p-5 space-y-3" data-testid="wa-enlaces">
        <div>
          <h4 className="font-heading font-semibold flex items-center gap-2">
            <Link2 className="h-4 w-4" aria-hidden="true" /> Enlaces para pegar en Meta
          </h4>
          <p className="text-xs text-muted-foreground">
            Mandan a la ficha de Retatrutida en vez de a la portada: se lleva el 58% de
            las vistas de producto, y desde la portada son dos toques más para llegar.
            Van etiquetados; sin etiqueta, la venta que produzcan cae en «sin etiquetar»
            para siempre. Los pega Christián en el Administrador de anuncios.
          </p>
        </div>
        <div className="space-y-2">
          {d.enlaces_retatrutida.map((e) => (
            <div key={e.para} className="text-xs">
              <div className="text-muted-foreground mb-1">{e.para}</div>
              <button onClick={() => copiar(e.url, 'Enlace')}
                className="w-full text-left font-mono break-all rounded-md border border-border px-2 py-1.5 hover:bg-[hsl(var(--muted))]/40">
                {e.url}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
