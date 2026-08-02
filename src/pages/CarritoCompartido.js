import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Loader2, ShoppingCart, Truck, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import api from '@/lib/api';
import { money } from '@/lib/hojaCotizacion';

/* EL CARRITO COMPARTIDO — la pantalla del CLIENTE.
   Encargo de Christián (2026-08-01): «Necesito que Mónica pueda compartir un carrito
   con sus clientes».

   ⛔ PÚBLICA Y SIN CUENTA. El cliente abre el enlace en su teléfono y ve lo que ella
   le armó. No se le pide sesión, ni correo, ni nada: pedirle una cuenta para ver una
   cotización es perder la venta en el primer paso.

   ⛔ ESTA PANTALLA NO CALCULA NI UN PESO. Todo —precios, descuento, envío y las
   cortesías— viene ya resuelto de `/carrito/{token}`, y el servidor lo vuelve a
   calcular al cobrar. Es la lección que costó dinero el 2026-07-27, cuando se podía
   comprar mandando precio $0.

   ⛔ Y AQUÍ NO HAY NINGÚN CÓDIGO DE OBSEQUIO QUE ENSEÑAR. El servidor no lo manda
   (ver `regalos.vista_publica`), así que aunque alguien quisiera pintarlo, no está.
   El cliente ve «Agua bacteriostática — Cortesía» y nada más. */
export default function CarritoCompartido() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { hash } = useLocation();
  const { pedirDatosDelCliente } = useCart();
  const { t } = useLanguage();
  const [carrito, setCarrito] = useState(null);
  const [estado, setEstado] = useState('cargando');   // cargando | listo | vencido | error

  /* LOS DATOS QUE SU DISTRIBUIDORA YA CAPTURÓ POR ÉL (Christián, 2026-08-01). Se
     piden AQUÍ, en cuanto se abre el enlace, para que al apretar «Comprar Ahora» el
     checkout ya llegue lleno y no haya que teclear nombre, correo, teléfono y
     domicilio otra vez — que es justo donde se pierde la venta.

     ⛔ La llave va en el FRAGMENTO del enlace (`#d=…`), que el navegador no manda a
     ningún servidor. Sin ella no sale ni un dato: `/carrito/{token}` —la ruta
     pública— sigue devolviendo sólo productos y precios, así que probar tokens al
     azar no cosecha domicilios. Si falla, no se le dice nada al cliente: el checkout
     se comporta como siempre y él escribe sus datos. */
  const clave = (new URLSearchParams((hash || '').replace(/^#/, '')).get('d') || '').trim();
  useEffect(() => {
    if (clave && token) pedirDatosDelCliente(token, clave);
  }, [clave, token, pedirDatosDelCliente]);

  useEffect(() => {
    let vivo = true;
    api.get(`/carrito/${encodeURIComponent(token || '')}`)
      .then((r) => { if (vivo) { setCarrito(r.data); setEstado('listo'); } })
      .catch((e) => {
        if (!vivo) return;
        // El 410 es un carrito VENCIDO y merece otro mensaje que un 404: no es que el
        // enlace esté mal, es que se le pasó el tiempo y hay que pedir otro.
        setEstado(e?.response?.status === 410 ? 'vencido' : 'error');
      });
    return () => { vivo = false; };
  }, [token]);

  /* COMPRAR. Se manda al checkout con el carrito ya armado por el camino que ya
     existe (`?pedido=id:cantidad,…` y `?ref=`, que `CartContext` hidrata solo) más
     `?cart=<token>`, que es lo que hace que el SERVIDOR aplique las cortesías al
     cobrar. Del enlace no viaja ningún precio: los ids se retasan contra el catálogo
     real y el total lo pone la caja. */
  const comprar = () => {
    const pedido = (carrito.lines || []).map((l) => `${l.product_id}:${l.quantity}`).join(',');
    const params = new URLSearchParams({ pedido, cart: token });
    if (carrito.ref) params.set('ref', carrito.ref);
    // El fragmento viaja también: así el checkout funciona igual si el cliente
    // recarga esa dirección o la abre directo desde el enlace de «Pagar» que su
    // distribuidora le mandó por WhatsApp. Sigue sin salir del navegador.
    navigate(`/checkout?${params.toString()}${clave ? `#d=${encodeURIComponent(clave)}` : ''}`);
  };

  if (estado === 'cargando') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center" data-testid="carrito-cargando">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (estado !== 'listo') {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center" data-testid="carrito-no-disponible">
        <h1 className="font-heading text-2xl mb-2">{t('carritoCompartido.titulo')}</h1>
        <p className="text-muted-foreground mb-6">
          {t(estado === 'vencido' ? 'carritoCompartido.vencido' : 'carritoCompartido.noExiste')}
        </p>
        <Button onClick={() => navigate('/catalogo')}>{t('carritoCompartido.verCatalogo')}</Button>
      </div>
    );
  }

  const descuentoPct = Math.round((carrito.discount_rate || 0) * 100);
  const cortesias = carrito.gifts || [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-6" data-testid="carrito-compartido">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl leading-tight">
          {t('carritoCompartido.titulo')}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {carrito.client_name
            ? t('carritoCompartido.paraCliente', { nombre: carrito.client_name })
            : t('carritoCompartido.subtitulo')}
        </p>
      </div>

      <Card className="p-4 divide-y divide-border">
        {(carrito.lines || []).map((l) => (
          <div key={l.product_id} className="py-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">{l.name}</p>
              <p className="text-xs text-muted-foreground">
                {l.quantity} × {money(l.unit_price)}
                {l.list_price > l.unit_price && (
                  <span className="ml-2 line-through opacity-60">{money(l.list_price)}</span>
                )}
              </p>
            </div>
            <span className="text-sm font-medium tabular-nums shrink-0">{money(l.amount)}</span>
          </div>
        ))}

        {/* LAS CORTESÍAS. Su nombre y la palabra «Cortesía»; jamás un código. */}
        {cortesias.map((g, i) => (
          <div key={`${g.tipo}-${g.name}-${i}`}
            className="py-3 flex items-start justify-between gap-3 text-emerald-600 dark:text-emerald-400"
            data-testid="carrito-cortesia">
            <div className="min-w-0 flex items-center gap-1.5">
              {g.tipo === 'envio' ? <Truck className="h-4 w-4 shrink-0" /> : <Gift className="h-4 w-4 shrink-0" />}
              <p className="text-sm font-medium truncate">
                {g.tipo === 'envio' ? t('carritoCompartido.envioCortesia') : `${g.quantity} × ${g.name}`}
              </p>
            </div>
            <span className="text-sm font-medium shrink-0">{t('carritoCompartido.cortesia')}</span>
          </div>
        ))}
      </Card>

      {/* EL DINERO, con las mismas palabras que la hoja impresa: «Descuento X%» y el
          envío como un renglón que SUMA. */}
      <Card className="p-4 space-y-1.5 text-sm" data-testid="carrito-dinero">
        <div className="flex justify-between text-muted-foreground">
          <span>{t('cotizador.precioLista')}</span>
          <span className="tabular-nums">{money(carrito.list_total)}</span>
        </div>
        {carrito.discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />{t('cotizador.descuentoPct', { pct: descuentoPct })}
            </span>
            <span className="tabular-nums">−{money(carrito.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-muted-foreground">
          <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" />{t('cotizador.envio')}</span>
          {carrito.shipping > 0
            ? <span className="tabular-nums">{money(carrito.shipping)}</span>
            : <span className="tabular-nums text-emerald-600 dark:text-emerald-400">{t('cotizador.envioGratis')}</span>}
        </div>
        <div className="flex justify-between font-heading font-semibold text-base pt-2 border-t border-border">
          <span>{t('cotizador.total')}</span>
          <span className="tabular-nums">{money(carrito.total)}</span>
        </div>
      </Card>

      <Button className="w-full gap-2" size="lg" onClick={comprar} data-testid="carrito-comprar">
        <ShoppingCart className="h-4 w-4" />{t('carritoCompartido.comprar')}
      </Button>
      <p className="text-xs text-muted-foreground text-center">{t('carritoCompartido.nota')}</p>
    </div>
  );
}
