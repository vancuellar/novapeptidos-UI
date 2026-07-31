import React, { useState } from 'react';
import { Truck, Loader2, Zap, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { toast } from 'sonner';

// Cotizar y comprar la guía de UN pedido, desde el Panel.
//
// ⛔ POR QUÉ EXISTE. El 30 de julio de 2026 mandar dos viales a Nuevo León costó casi
// $600 en el mostrador de la paquetería. Skydropx cotiza la misma caja por peso y
// código postal contra varias paqueterías; el problema era que no había dónde verlo
// ni con qué comprarla. Esto es ese "dónde".
//
// ⛔ DOBLE COTIZADOR (Christián, 2026-07-31). Se pregunta en Skydropx Y en
// enviosinternacionales.com y se contrata la más barata, venga de quien venga. Cada
// renglón dice de qué proveedor es, porque la guía se compra en la casa que la cotizó.
// Mientras el segundo no tenga llaves, esto se ve y funciona exactamente como antes.
//
// ⛔ ESTA PANTALLA ES INTERNA. Lo que se enseña aquí es lo que le cuesta A LA CASA y no
// lo ve ningún cliente. Lo que paga el cliente lo decide la política de cobro, aparte.

const pesos = (n) => `$${Number(n || 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const dias = (d) => (Number(d) > 0 ? `${d} día${Number(d) === 1 ? '' : 's'}` : 'sin plazo');

const CotizarEnvio = ({ order, onComprada }) => {
  const [cargando, setCargando] = useState(false);
  const [comprando, setComprando] = useState('');
  const [cot, setCot] = useState(null);

  const cotizar = async () => {
    setCargando(true);
    try {
      const r = await api.post(`/admin/orders/${order.id}/cotizar-envio`);
      setCot(r.data || null);
      if (r.data && !r.data.options?.length) toast.message(r.data.detail || 'Sin tarifas.');
    } catch (e) {
      toast.error(e?.response?.data?.detail || 'No se pudo cotizar.');
    } finally {
      setCargando(false);
    }
  };

  const comprar = async (opcion) => {
    // Cuesta dinero de verdad: se pregunta antes, con el precio a la vista.
    const ok = window.confirm(
      `Comprar la guía de ${opcion.carrier} ${opcion.service} por ${pesos(opcion.price)}.\n\n`
      + `Se cobra de tu cuenta de ${opcion.provider_name || 'Skydropx'}. ¿Seguimos?`);
    if (!ok) return;
    setComprando(opcion.id);
    try {
      const r = await api.post(`/admin/orders/${order.id}/guia`, { option_id: opcion.id });
      toast.success(`Guía comprada: ${r.data?.tracking_number || ''}`);
      setCot(null);
      if (onComprada) onComprada(r.data);
    } catch (e) {
      toast.error(e?.response?.data?.detail || 'La paquetería no dio la guía.');
    } finally {
      setComprando('');
    }
  };

  if (order?.tracking_number) return null;   // ya tiene guía: no hay nada que cotizar

  return (
    <div className="rounded-lg border border-[hsl(var(--border))] p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold flex items-center gap-1.5">
          <Truck className="h-4 w-4 text-[hsl(var(--primary))]" /> Precio Real Del Envío
        </span>
        <Button size="sm" variant="outline" onClick={cotizar} disabled={cargando}
          data-testid="admin-cotizar-envio">
          {cargando ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Cotizar'}
        </Button>
      </div>

      {!cot && (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Cotiza este pedido en Skydropx y en Envíos Internacionales por su peso y su
          código postal reales, y te deja contratar la más barata. Lo que se muestra es
          lo que le cuesta a la casa, no lo que paga el cliente.
        </p>
      )}

      {cot && cot.enabled === false && (
        <p className="text-xs text-destructive flex items-start gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          {cot.detail || 'Faltan las credenciales de Skydropx. Se pegan en Ajustes → Cobros.'}
        </p>
      )}

      {cot?.paquete && (
        <p className="text-[11px] text-muted-foreground">
          Caja {cot.paquete.caja} · {cot.paquete.largo_cm}×{cot.paquete.ancho_cm}×{cot.paquete.alto_cm} cm ·
          {' '}{cot.paquete.peso_kg} kg facturables
        </p>
      )}

      {cot?.remitente_completo === false && (
        <p className="text-xs text-destructive flex items-start gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
          Falta capturar el remitente en Ajustes → Envíos. Sin él no se puede comprar guía.
        </p>
      )}

      {/* La comparación entre proveedores: qué dio cada uno y cuánto se ahorra por
          haber preguntado en dos lados. Si sólo hay uno encendido se dice también,
          para que se vea que falta prender el otro y no parezca que ya se comparó. */}
      {cot?.proveedores?.length > 0 && (
        <div className="rounded-md bg-[hsl(var(--muted))]/40 p-2 space-y-1">
          {cot.proveedores.map((p) => (
            <div key={p.clave} className="flex items-center justify-between gap-2 text-[11px]">
              <span className={p.activo ? '' : 'text-muted-foreground'}>{p.nombre}</span>
              <span className="text-muted-foreground">
                {!p.activo && 'sin llaves'}
                {p.activo && p.mejor != null && `${p.tarifas} tarifas · desde ${pesos(p.mejor)}`}
                {p.activo && p.mejor == null && (p.detalle || 'sin tarifas')}
              </span>
            </div>
          ))}
          {cot.ahorro?.comparados > 1 && cot.ahorro.ahorro_mxn > 0 && (
            <div className="text-[11px] font-semibold text-[hsl(var(--primary))] pt-1">
              Se ahorran {pesos(cot.ahorro.ahorro_mxn)} por cotizar en los dos.
            </div>
          )}
        </div>
      )}

      {cot?.options?.map((o) => (
        <div key={o.id} className="flex items-center gap-2 text-xs border-t border-[hsl(var(--border))] pt-2">
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate">
              {o.carrier} <span className="text-muted-foreground">{o.service}</span>
            </div>
            <div className="text-muted-foreground">
              {dias(o.days)}
              {/* De qué proveedor sale esta tarifa: es con quien se compra la guía. */}
              {o.provider_name && ` · vía ${o.provider_name}`}
              {!o.para_el_cliente && ' · fuera de lo que se le prometió al cliente'}
            </div>
          </div>
          <div className="font-mono-tech font-semibold whitespace-nowrap">{pesos(o.price)}</div>
          <Button size="sm" variant={o.id === cot.options[0].id ? 'default' : 'outline'}
            className="h-7 text-[11px]" onClick={() => comprar(o)}
            disabled={!!comprando || cot.remitente_completo === false}
            data-testid={`admin-comprar-guia-${o.carrier}`}>
            {comprando === o.id
              ? <Loader2 className="h-3 w-3 animate-spin" />
              : <><Zap className="h-3 w-3 mr-1" /> Comprar</>}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CotizarEnvio;
