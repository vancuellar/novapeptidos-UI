import React, { useEffect, useState } from 'react';
import { Truck, Loader2, Check, Server, AlertTriangle, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { toast } from 'sonner';

// Ajustes → Envíos: el remitente y las cajas.
//
// ⛔ EL REMITENTE NO PUEDE VIVIR EN EL CÓDIGO. Es el domicilio de un trabajador:
// escribirlo en el repositorio sería publicar los datos personales de una persona en
// GitHub. Se captura aquí y se guarda en la base. Si la dirección viene del `.env` del
// servidor, esa manda y este panel lo dice.
//
// Y sin remitente NO se compra ninguna guía, a propósito: una guía con una dirección
// inventada es una paquetería yendo a recoger a una casa que no existe.

const CAMPOS = [
  { k: 'name', label: 'Nombre De Quien Despacha', req: true, pista: 'La persona que entrega el paquete' },
  { k: 'company', label: 'Empresa', req: false, pista: '' },
  { k: 'address1', label: 'Calle Y Número', req: true, pista: '' },
  { k: 'address2', label: 'Interior O Referencia De Calle', req: false, pista: '' },
  { k: 'colonia', label: 'Colonia', req: true, pista: 'La API de Skydropx la exige' },
  { k: 'city', label: 'Ciudad O Municipio', req: true, pista: '' },
  { k: 'province', label: 'Estado', req: true, pista: '' },
  { k: 'zip', label: 'Código Postal', req: true, pista: 'De aquí sale el precio del envío' },
  { k: 'phone', label: 'Teléfono', req: true, pista: 'Diez dígitos, sin espacios' },
  { k: 'email', label: 'Correo', req: true, pista: 'A donde la paquetería avisa' },
  { k: 'reference', label: 'Referencia Para Recolección', req: false, pista: 'Portón, timbre, horario' },
];

const AjustesEnvio = () => {
  const [cfg, setCfg] = useState(null);
  const [borrador, setBorrador] = useState({});
  const [guardando, setGuardando] = useState(false);

  const cargar = () => api.get('/admin/envios/config')
    .then((r) => { setCfg(r.data); setBorrador(r.data?.remitente || {}); })
    .catch(() => setCfg({ error: true }));

  useEffect(() => { cargar(); }, []);

  const guardar = async () => {
    setGuardando(true);
    try {
      const r = await api.put('/admin/envios/remitente', borrador);
      setCfg((c) => ({ ...c, ...r.data }));
      toast.success(r.data?.remitente_completo
        ? 'Remitente guardado. Ya se pueden comprar guías.'
        : 'Guardado, pero todavía faltan datos obligatorios.');
    } catch (e) {
      toast.error(e?.response?.data?.detail || 'No se pudo guardar.');
    } finally {
      setGuardando(false);
    }
  };

  if (!cfg) {
    return <div className="flex items-center gap-2 text-sm text-muted-foreground p-4">
      <Loader2 className="h-4 w-4 animate-spin" /> Cargando…
    </div>;
  }

  const delServidor = cfg.remitente_origen === 'servidor';

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        De aquí sale la dirección que se imprime en cada guía y el punto desde donde la
        paquetería calcula el precio. Sin estos datos el sistema se niega a comprar guías,
        para que nadie pague una recolección en una dirección que no existe.
      </p>

      {!cfg.credenciales_puestas && (
        <Card className="p-4 border-[hsl(var(--warning))]">
          <p className="text-sm flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--warning-foreground))]" />
            <span>
              Faltan las llaves de Skydropx PRO. Se sacan de Skydropx PRO → Conexiones → API
              (son dos: Client ID y Client secret) y se pegan en <strong>Ajustes → Cobros</strong>.
              Sin ellas no se cotiza ni se compra nada.
            </span>
          </p>
        </Card>
      )}

      <Card className="p-5">
        <h3 className="font-heading font-semibold text-sm flex items-center gap-2 mb-1">
          <Truck className="h-4 w-4 text-[hsl(var(--primary))]" /> Remitente
          {cfg.remitente_completo && (
            <span className="text-xs inline-flex items-center gap-1 text-[hsl(var(--primary))] font-normal">
              <Check className="h-3 w-3" /> completo
            </span>
          )}
          {delServidor && (
            <span className="text-xs inline-flex items-center gap-1 text-muted-foreground font-normal">
              <Server className="h-3 w-3" /> viene del servidor
            </span>
          )}
        </h3>

        {delServidor ? (
          <p className="text-xs text-muted-foreground leading-relaxed mt-2">
            Esta dirección está puesta en el archivo de configuración del servidor y manda
            sobre el panel. Para editarla desde aquí, primero hay que quitarla de ahí.
          </p>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2 mt-4">
              {CAMPOS.map((c) => (
                <div key={c.k}>
                  <Label className="text-xs mb-1 block">
                    {c.label}{c.req && <span className="text-destructive"> *</span>}
                  </Label>
                  <Input value={borrador[c.k] || ''} data-testid={`remitente-${c.k}`}
                    onChange={(e) => setBorrador((b) => ({ ...b, [c.k]: e.target.value }))} />
                  {c.pista && <p className="text-[11px] text-muted-foreground mt-0.5">{c.pista}</p>}
                </div>
              ))}
            </div>
            <Button className="mt-4" onClick={guardar} disabled={guardando}
              data-testid="remitente-guardar">
              {guardando ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar Remitente'}
            </Button>
          </>
        )}
      </Card>

      <Card className="p-5">
        <h3 className="font-heading font-semibold text-sm flex items-center gap-2 mb-1">
          <Package className="h-4 w-4 text-[hsl(var(--primary))]" /> Cajas
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          La paquetería cobra por lo que MÁS pesa entre el peso real y el volumen
          (largo × ancho × alto ÷ 5000). Por eso se elige la caja más chica en la que quepa
          el pedido: dos viales en una caja grande se cotizan como si pesaran kilo y medio.
        </p>
        <div className="space-y-1.5">
          {(cfg.cajas || []).map((c) => (
            <div key={c.nombre} className="flex items-center gap-3 text-xs">
              <span className="font-medium w-20 capitalize">{c.nombre}</span>
              <span className="font-mono-tech">{c.largo_cm}×{c.ancho_cm}×{c.alto_cm} cm</span>
              <span className="text-muted-foreground">hasta {c.peso_max_kg} kg</span>
              <span className="text-muted-foreground ml-auto">
                cobra mínimo {c.peso_volumetrico_kg} kg por volumen
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AjustesEnvio;
