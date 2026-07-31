import React, { useEffect, useState } from 'react';
import { KeyRound, Loader2, Check, Server } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { toast } from 'sonner';

// Llaves de las pasarelas de pago, pegables desde aquí (incluso del teléfono).
//
// El backend NUNCA devuelve el valor: solo si está configurado, de dónde sale y
// los últimos 4 caracteres. Y el `.env` del servidor manda: si una llave viene de
// ahí, este panel la muestra como no editable. Ver secretos.py.
const ETIQUETAS = {
  MERCADOPAGO_ACCESS_TOKEN: { grupo: 'Mercado Pago', label: 'Access token de producción', pista: 'Empieza con APP_USR-' },
  MERCADOPAGO_WEBHOOK_SECRET: { grupo: 'Mercado Pago', label: 'Clave secreta del webhook', pista: 'La que da al registrar la URL del webhook' },
  NOWPAYMENTS_API_KEY: { grupo: 'NOWPayments', label: 'API key', pista: '' },
  NOWPAYMENTS_IPN_SECRET: { grupo: 'NOWPayments', label: 'Secreto IPN', pista: '' },
  BTCPAY_API_KEY: { grupo: 'BTCPay', label: 'API key', pista: '' },
  BTCPAY_WEBHOOK_SECRET: { grupo: 'BTCPay', label: 'Secreto del webhook', pista: '' },
  // Paquetería. No cobra: cotiza envíos y compra guías. Sin ellas el checkout
  // sigue funcionando igual, solo que sin cotización de envío.
  // Son DOS porque la API de Skydropx PRO usa OAuth2: se cambian por un token.
  SKYDROPX_CLIENT_ID: { grupo: 'Skydropx PRO (envíos)', label: 'Client ID', pista: 'Skydropx PRO → Conexiones → API' },
  SKYDROPX_CLIENT_SECRET: { grupo: 'Skydropx PRO (envíos)', label: 'Client secret', pista: 'La pareja del Client ID, en la misma pantalla' },
  // El segundo cotizador de envíos (revendedor de Skydropx). Con las dos llaves
  // puestas, cada despacho se cotiza en AMBOS y se contrata el más barato; sin
  // ellas, todo sigue solo con Skydropx. El backend ya las acepta (secretos.py);
  // esta etiqueta es lo que las hace aparecer en la pantalla.
  ENVIOSINT_CLIENT_ID: { grupo: 'Envíos Internacionales (envíos)', label: 'Client ID', pista: 'app.enviosinternacionales.com → Configuración → API ("Clave del Cliente")' },
  ENVIOSINT_CLIENT_SECRET: { grupo: 'Envíos Internacionales (envíos)', label: 'Client secret', pista: 'La "Clave Secreta del Cliente", en la misma pantalla' },
};

const GatewayCredentials = () => {
  const [filas, setFilas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [borrador, setBorrador] = useState({});
  const [guardando, setGuardando] = useState('');

  const cargar = () => api.get('/admin/credenciales')
    .then((r) => setFilas(Array.isArray(r.data) ? r.data : []))
    .catch(() => setFilas([]))
    .finally(() => setLoading(false));

  useEffect(() => { cargar(); }, []);

  const guardar = async (nombre) => {
    const valor = (borrador[nombre] || '').trim();
    if (!valor) return;
    setGuardando(nombre);
    try {
      const r = await api.put('/admin/credenciales', { nombre, valor });
      setFilas(r.data?.estado || filas);
      setBorrador((b) => ({ ...b, [nombre]: '' }));
      toast.success('Guardada. Ya quedó activa.');
    } catch (e) {
      toast.error(e?.response?.data?.detail || 'No se pudo guardar.');
    } finally {
      setGuardando('');
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2 text-sm text-muted-foreground p-4"><Loader2 className="h-4 w-4 animate-spin" /> Cargando…</div>;
  }

  const grupos = [...new Set(filas.map((f) => ETIQUETAS[f.nombre]?.grupo).filter(Boolean))];

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Aquí se pegan las llaves de las pasarelas de cobro. Una vez guardadas quedan cifradas y
        activas de inmediato, sin reiniciar nada. El panel nunca vuelve a mostrarlas completas:
        solo los últimos 4 caracteres, para que confirmes que pegaste la correcta.
      </p>

      {grupos.map((grupo) => (
        <Card key={grupo} className="p-5">
          <h3 className="font-heading font-semibold text-sm flex items-center gap-2 mb-4">
            <KeyRound className="h-4 w-4 text-[hsl(var(--primary))]" /> {grupo}
          </h3>
          <div className="space-y-4">
            {filas.filter((f) => ETIQUETAS[f.nombre]?.grupo === grupo).map((f) => {
              const meta = ETIQUETAS[f.nombre];
              return (
                <div key={f.nombre}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">{meta.label}</span>
                    {f.configurado && (
                      <span className="text-xs inline-flex items-center gap-1 text-[hsl(var(--primary))]">
                        <Check className="h-3 w-3" /> {f.pista}
                      </span>
                    )}
                    {f.origen === 'servidor' && (
                      <span className="text-xs inline-flex items-center gap-1 text-muted-foreground">
                        <Server className="h-3 w-3" /> viene del servidor
                      </span>
                    )}
                  </div>
                  {meta.pista && <p className="text-xs text-muted-foreground mt-0.5">{meta.pista}</p>}

                  {f.editable ? (
                    <div className="flex gap-2 mt-2">
                      <Input
                        type="password"
                        autoComplete="off"
                        spellCheck={false}
                        placeholder={f.configurado ? 'Pegar una nueva para reemplazarla' : 'Pegar aquí'}
                        value={borrador[f.nombre] || ''}
                        onChange={(e) => setBorrador((b) => ({ ...b, [f.nombre]: e.target.value }))}
                        data-testid={`cred-input-${f.nombre}`}
                      />
                      <Button size="sm" onClick={() => guardar(f.nombre)}
                        disabled={!((borrador[f.nombre] || '').trim()) || guardando === f.nombre}
                        data-testid={`cred-save-${f.nombre}`}>
                        {guardando === f.nombre
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : 'Guardar'}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Esta llave está puesta en el servidor y manda sobre el panel. Para editarla
                      desde aquí, primero hay que quitarla del archivo de configuración.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      <p className="text-xs text-muted-foreground leading-relaxed">
        Mercado Pago necesita las dos: sin el access token no cobra, y sin la clave del webhook
        cobra pero rechaza los avisos de pago en silencio, dejando los pedidos en «pendiente».
      </p>
    </div>
  );
};

export default GatewayCredentials;
