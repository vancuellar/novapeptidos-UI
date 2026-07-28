// Cuánto cuesta tener UNA caja de cada producto que vendemos.
//
// Christian lo pidió el 28-jul y lo quiso aquí, en Inventario, que es donde tiene
// sentido: es la pregunta "¿cuánto tengo que poner para surtirme completo?".
//
// El número BAJA SOLO conforme va comprando: lo que ya tiene consigo se descuenta del
// inventario EN VIVO, cruzando por SKU (por nombre no cruza — el sitio dice
// "Retatrutida" y la maestra "Retatrutide", y cruzar así daba cero coincidencias, o sea
// el total completo como si no tuviera nada).
//
// Los costos vienen de la misma foto del Motor de Precios, detrás de sesión de admin:
// son costos de proveedor y no pueden salir al público.
import React, { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';

const pesos = (n) => `$${Math.round(Number(n) || 0).toLocaleString('es-MX')}`;
const dolares = (n) => `$${Math.round(Number(n) || 0).toLocaleString('en-US')}`;

export default function SurtirCatalogo() {
  const [sur, setSur] = useState(null);
  const [generado, setGenerado] = useState(null);

  useEffect(() => {
    api.get('/admin/motor-precios')
      .then((r) => { setSur(r.data?.surtido || null); setGenerado(r.data?.generado || null); })
      .catch(() => setSur(null));
  }, []);

  if (!sur || !sur.cajas) return null;

  return (
    <Card className="p-5 mb-4">
      <div className="flex items-center gap-2 mb-1">
        <Wallet className="h-4 w-4 text-[hsl(var(--primary))]" />
        <h3 className="font-heading font-semibold text-sm">Surtir el catálogo completo</h3>
      </div>
      <p className="text-[11px] text-muted-foreground mb-3">
        Una caja de cada producto que vendes, al costo más barato que conoces. Sin envío:
        a 28 de los 31 proveedores todavía no se les sabe.
      </p>
      <div className="flex flex-wrap items-end gap-x-8 gap-y-2">
        <div>
          <div className="font-heading text-2xl font-bold text-[hsl(var(--primary))]">
            {pesos(sur.total_mxn)}{' '}
            <span className="text-sm font-normal text-muted-foreground">MXN</span>
          </div>
          <div className="text-[11px] text-muted-foreground">≈ {dolares(sur.total_usd)} USD</div>
        </div>
        <div className="text-xs">
          <span className="font-medium">{sur.cajas} cajas</span>
          <span className="text-muted-foreground">
            {' '}— los {sur.a_la_venta} que vendes menos {sur.ya_los_tienes} que ya tienes
          </span>
        </div>
        {generado && (
          <span className="text-[11px] text-muted-foreground ml-auto">
            Datos del {generado}
          </span>
        )}
      </div>
      {sur.aviso && <p className="text-[11px] text-red-600 mt-2">{sur.aviso}</p>}
    </Card>
  );
}
