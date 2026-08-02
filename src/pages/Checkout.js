import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Landmark, ShieldCheck, Package, UserRound, MapPin, ChevronDown, Bitcoin, Store, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { track, attribution } from '@/lib/track';
import api, { formatMXN, PAYMENT_METHODS } from '@/lib/api';
import { phoneValid } from '@/lib/utils';
import { PhoneField, StateField, composePhone, parsePhone } from '@/components/CountryPhoneFields';
import { ruoAcceptedAt } from '@/components/RuoGate';
import TrustWidget from '@/components/TrustWidget';
import AvisoSobrePedido from '@/components/AvisoSobrePedido';
import { desgloseSobrePedido } from '@/lib/sobrePedido';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const ICONS = { CreditCard, Landmark, Bitcoin, Store };

// Ya no hay utilidades de tarjeta: el numero se teclea en la pagina de Mercado
// Pago, no aqui. Se borraron con el formulario (Christian, 2026-07-26).

const Checkout = () => {
  const { items, hidratando, subtotal, discount, discountRate, discountSource, cappedItems, regla5Items, calcularEnvio, cobraEnvio, envioGratisDesde, envioGratisDeVerdadDesde, topeEnvio, distCode, clearCart, sharedCartToken, datosDelCliente, extraExpress, pisoAbsorcion, costoGuia } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();
  // El inventario REAL. El aviso de envío partido tiene que estar EN LA PANTALLA DE
  // PAGAR, no solo en el carrito: mucha gente llega al checkout desde el botón de la
  // ficha sin pasar por el carrito, y ahí se decide la compra.
  const [stockMap, setStockMap] = useState(null);
  useEffect(() => {
    api.get('/stock').then((r) => setStockMap(r.data || null)).catch(() => setStockMap(null));
  }, []);
  const sobrePedido = desgloseSobrePedido(items, stockMap);
  // Qué renglones van sobre pedido, para la nota chiquita debajo de CADA uno en el
  // resumen del pedido (ya no el bloque grande de "dos entregas").
  const sobrePedidoIds = new Set(sobrePedido.map((l) => l.product_id));
  const navigate = useNavigate();
  const [payment, setPayment] = useState('spei');
  // Cómo quiere que le mandemos el pedido cuando no sale completo: 'partido' (lo que
  // hay sale ya) o 'completo' (todo junto). Nace en 'partido' porque es lo que la casa
  // hacía hasta hoy y porque es lo que nunca deja mercancía pagada detenida.
  const [envioModo, setEnvioModo] = useState('partido');
  const [submitting, setSubmitting] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const savedPhone = parsePhone(user?.phone);
  const [phoneCountry, setPhoneCountry] = useState(savedPhone.country);
  const [form, setForm] = useState({
    full_name: user?.name || '', email: user?.email || '', phone: savedPhone.national,
    address: user?.shipping_address?.address || '', address_2: user?.shipping_address?.address_2 || '',
    city: user?.shipping_address?.city || '',
    state: user?.shipping_address?.state || '', postal_code: user?.shipping_address?.postal_code || '',
    country: 'MX',   // solo enviamos dentro de México
    notes: '',
  });
  // Si el formulario llegó lleno con lo de su última compra, se le dice — con una
  // línea, no con un diálogo que haya que cerrar para poder comprar.
  const [prefilled, setPrefilled] = useState(false);
  // Lo mismo, pero cuando los datos vienen de la COTIZACIÓN que le armó su
  // distribuidora (carrito compartido) en vez de su última compra.
  const [deLaCotizacion, setDeLaCotizacion] = useState(false);
  const [loyalty, setLoyalty] = useState({ eligible: false, balance: 0 });
  const [usePoints, setUsePoints] = useState(false);
  const [cryptoOn, setCryptoOn] = useState(false);
  const [cardOn, setCardOn] = useState(false);
  const [oxxoOn, setOxxoOn] = useState(false);
  // EL TIPO DE ENVÍO (Christián, 2026-08-02): el cliente ya no ve opciones de
  // paquetería con precios reales — la casa la elige. Aquí sólo vive si pidió
  // EXPRESS (1-2 días hábiles); todo lo demás lo decide el servidor.
  const [express, setExpress] = useState(false);
  // LA COTIZACIÓN REAL POR CP, sólo para que la pantalla diga el número exacto de
  // la REGLA V2: desde $2,500, si la guía express real cabe en max($250, 5% de la
  // compra), el express sale GRATIS TOTAL («¡Buenas noticias!»). Mientras no hay
  // CP o la paquetería no contesta, se usa el estimado de la casa — que es el
  // MISMO respaldo con el que cobra el servidor, así que nunca se promete de más.
  const [tarifasCp, setTarifasCp] = useState([]);

  // ⛔ EL PASO QUE NUNCA SE MEDÍA. El backend espera `checkout_start` (ver
  // EVENT_TYPES en server.py) y el frontend jamás lo mandaba: el embudo del Panel
  // decía 0 con compras hechas, y a Meta se le avisaba InitiateCheckout sólo de
  // rebote, atado a la visita. Sin este escalón no se puede saber si la gente se
  // cae ANTES o DESPUÉS de llegar al checkout — que es justo lo que hay que saber
  // con 2,700 clics y cero compras. (Christián, 2026-07-29)
  useEffect(() => { track('checkout_start'); }, []);

  // Cripto (BTCPay) solo aparece si el servidor lo tiene encendido.
  useEffect(() => {
    api.get('/payments/config').then((r) => {
      setCryptoOn(!!r.data?.crypto_enabled);
      setCardOn(!!r.data?.card_enabled);
      setOxxoOn(!!r.data?.oxxo_enabled);
    }).catch(() => {});
  }, []);
  // Con sesión iniciada, el formulario llega LLENO con lo de su última compra: no
  // le volvemos a pedir lo que ya nos dio (Christian, 2026-07-28). Los datos salen
  // de una ruta que solo responde al dueño de la sesión. Todo sigue siendo editable
  // — se prellena, no se congela — y por eso nunca se pisa lo que ya escribió: solo
  // se rellenan los campos que están vacíos. Sin sesión, esto ni se pregunta y la
  // compra como invitado queda igual que siempre.
  useEffect(() => {
    if (!user) return;
    api.get('/me/checkout').then((r) => {
      const d = r.data || {};
      const dir = d.shipping_address || {};
      const tel = parsePhone(d.phone);
      setForm((f) => ({
        ...f,
        full_name: f.full_name || d.full_name || '',
        email: f.email || d.email || '',
        phone: f.phone || tel.national,
        address_2: f.address_2 || dir.address_2 || '',
        city: f.city || dir.city || '',
        state: f.state || dir.state || '',
        postal_code: f.postal_code || dir.postal_code || '',
        // El país NO se prellena: el envío es solo a México y el pedido viaja
        // siempre con 'MX', aunque el perfil traiga otro país de antes.
        address: f.address || dir.address || '',
      }));
      if (!savedPhone.national && d.phone) setPhoneCountry(tel.country);
      setPrefilled(!!d.prefilled);
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ⛔ EL PRELLENADO DEL CARRITO COMPARTIDO (Christián, 2026-08-01), en sus palabras:
     «Cuando el cliente abre el link de la cotización, su nombre, email, teléfono,
     dirección, NADA se guardó. Necesito que corrijas esto si el distribuidor ya lo
     llenó por él.»

     Su distribuidora ya los tecleó al armar la cotización. Aquí llegan del contexto
     del carrito, que los pidió con la SEGUNDA LLAVE del enlace (ver CartContext:
     no salen por la ruta pública del carrito, así que probar tokens no los revela).

     Se rellena SÓLO lo que está vacío, igual que el prellenado de quien tiene
     sesión: nunca se pisa lo que el cliente ya escribió, y todo sigue editable —
     esto le ahorra teclear, no le impone nada. Si no vino nada, el checkout se
     comporta exactamente como antes. */
  useEffect(() => {
    if (!datosDelCliente) return;
    const d = datosDelCliente;
    const tel = parsePhone(d.phone);
    setForm((f) => ({
      ...f,
      full_name: f.full_name || d.full_name || '',
      email: f.email || d.email || '',
      phone: f.phone || tel.national,
      address: f.address || d.address || '',
    }));
    if (!savedPhone.national && d.phone) setPhoneCountry(tel.country);
    // Aviso PROPIO, no el de «tu última compra»: aquí los datos vienen de la
    // cotización que le armaron, y decirle otra cosa sería mentirle.
    if (d.full_name || d.email || d.phone || d.address) setDeLaCotizacion(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosDelCliente]);
  // La TARJETA solo aparece si Mercado Pago esta configurado. Antes salia siempre
  // — y por defecto — con un formulario que pedia el numero, lo validaba y lo
  // TIRABA: nadie cobraba y el cliente se iba creyendo que habia pagado.
  // OXXO viaja por la misma pasarela: mismo interruptor del servidor.
  const methods = PAYMENT_METHODS.filter(
    (m) => (m.id !== 'cripto' || cryptoOn) && (m.id !== 'tarjeta' || cardOn)
      && (m.id !== 'oxxo' || oxxoOn),
  );
  // Si el metodo elegido deja de estar disponible, cae al primero que si este.
  useEffect(() => {
    if (methods.length && !methods.some((m) => m.id === payment)) setPayment(methods[0].id);
  }, [methods, payment]);
  const sectionRefs = { 0: useRef(null), 1: useRef(null), 2: useRef(null) };

  // Puntos de lealtad: solo cuentas de cliente (el servidor decide quién participa).
  useEffect(() => {
    if (!user) return;
    api.get('/me/points')
      .then((res) => setLoyalty(res.data))
      .catch(() => {});
  }, [user]);

  // Registra el intento de compra mientras llena sus datos: si no cierra, queda
  // como 'pendiente' y la IA le da seguimiento (Christian, 2026-07-25). Se manda
  // con retraso para no pegarle al servidor en cada tecla.
  useEffect(() => {
    if (!items.length) return;
    const email = (form.email || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    const t = setTimeout(() => {
      api.post('/checkout/intento', {
        email,
        name: form.full_name || '',
        phone: form.phone || '',
        items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price, sku: i.sku || '' })),
        subtotal,
        total: subtotal - discount,
        session_id: localStorage.getItem('np_track_session') || '',
      }).catch(() => {});
    }, 2500);
    return () => clearTimeout(t);
  }, [form.email, form.full_name, form.phone, items, subtotal, discount]);

  // La cotización real, al escribir el CP (con retraso para no llamar por tecla).
  const cp = (form.postal_code || '').trim();
  useEffect(() => {
    if (cp.length < 5 || !items.length || !cobraEnvio) { setTarifasCp([]); return undefined; }
    let vivo = true;
    const timer = setTimeout(() => {
      api.post('/shipping/quote', {
        postal_code: cp, state: form.state || '', city: form.city || '',
        items: items.map((i) => ({ product_id: i.sku || i.product_id, name: i.name,
                                   price: i.price, quantity: i.quantity })),
      }).then((r) => { if (vivo) setTarifasCp(r.data?.options || []); })
        .catch(() => { if (vivo) setTarifasCp([]); });
    }, 700);
    return () => { vivo = false; clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cp, items, cobraEnvio]);

  const afterDiscount = subtotal - discount;
  const pointsApplied = usePoints && loyalty.eligible
    ? Math.min(loyalty.balance, Math.floor(afterDiscount)) : 0;
  // LA ESTRATEGIA DEL 2026-08-02 (Christián): el cliente ya no escoge paquetería —
  // escoge el TIPO. Estándar (3-5 días hábiles): $250 abajo de la mínima, incluido
  // desde $2,500. Express (1-2 días hábiles): +$150 SIEMPRE. La cuenta de aquí es
  // una PISTA con los números que manda el servidor (`calcularEnvio` ya trae el
  // piso de absorción); el monto final lo pone él al crear el pedido.
  // ⛔ SOBRE LO QUE DE VERDAD PAGA, PUNTOS INCLUIDOS. El servidor cobra el envío
  // sobre la mercancía que quedó después del descuento Y después de los puntos; el
  // carrito no sabe de puntos, así que aquí se vuelve a pedir la cuenta con la cifra
  // buena. Si no, un pedido que baja de la mínima al canjear puntos enseñaba envío
  // gratis mientras la caja lo cobraba. (2026-07-31)
  const pagaMercancia = afterDiscount - pointsApplied;
  const cumpleMinima = pagaMercancia >= envioGratisDesde;
  // El presupuesto de absorción de la casa: max($250, 5% de la compra).
  const presupuesto = cumpleMinima ? Math.max(pisoAbsorcion || 0, pagaMercancia * (topeEnvio || 0)) : 0;
  // El costo REAL por CP cuando ya se cotizó; el estimado de la casa mientras no.
  const conPrecio = tarifasCp.filter((o) => Number(o.price) > 0);
  const costoStd = conPrecio.length
    ? Math.min(...conPrecio.map((o) => Number(o.price))) : (costoGuia || 0);
  const rapidas = conPrecio.filter((o) => { const d = Number(o.days) || 0; return d > 0 && d <= 2; });
  const costoExp = rapidas.length
    ? Math.min(...rapidas.map((o) => Number(o.price))) : (costoGuia || 0) + extraExpress;
  const envioEstandar = cumpleMinima
    ? Math.max(0, Math.round(costoStd - presupuesto)) : calcularEnvio(pagaMercancia);
  const hayExpress = cobraEnvio && extraExpress > 0 && items.length > 0;
  // LA REGLA V2: desde la mínima el express se mide contra el presupuesto — si
  // cabe, GRATIS TOTAL (ni los $150). Abajo de la mínima: tarifa + $150.
  const envioExpressTotal = cumpleMinima
    ? Math.max(0, Math.round(costoExp - presupuesto)) : envioEstandar + extraExpress;
  const expressGratis = hayExpress && cumpleMinima && envioExpressTotal === 0;
  const envioACobrar = hayExpress && express ? envioExpressTotal : envioEstandar;
  // "Gratis" es un envío que SE GANÓ, no un envío que no se cobra: con el cobro
  // apagado el renglón dice "se cotiza por separado", que es otra cosa.
  const envioGratis = envioACobrar === 0 && cobraEnvio && items.length > 0;
  // El empujón, también sobre la cifra con puntos ya restados.
  const faltaAquiParaEnvioGratis = envioEstandar > 0 && envioGratisDeVerdadDesde > 0
    ? Math.max(0, envioGratisDeVerdadDesde - pagaMercancia) : 0;
  const total = pagaMercancia + envioACobrar;
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Quien llega del enlace de una cotización (?pedido=) entra con el carrito
  // vacío por un instante, mientras se hidrata contra el catálogo real. Ahí no se
  // le puede decir "tu carrito está vacío": se le enseña que se está armando.
  if (items.length === 0 && hidratando) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">{t('checkout.armandoCarrito')}</p></div>;
  }
  if (items.length === 0) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-muted-foreground">{t('checkout.empty')}</p><Button className="mt-4" onClick={() => navigate('/catalogo')}>{t('home.viewCatalog')}</Button></div>;
  }

  // Un aviso que se borra en 4 segundos, arriba de todo, no le sirve a quien está
  // abajo tocando el botón: hay que LLEVARLO al campo que falta. Nunca al revés —
  // mandar la pantalla al principio cuando el error está al final es exactamente
  // lo que hacía parecer muerto el botón de pagar (Christian, 2026-07-28).
  const llevarAlCampo = (testid) => {
    const el = document.querySelector(`[data-testid="${testid}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // El foco va después del desplazamiento y sin volver a mover la página: si se
    // enfoca primero, el navegador da su propio salto y se pelea con el nuestro.
    setTimeout(() => el.focus({ preventScroll: true }), 350);
  };

  const submit = async (e) => {
    e.preventDefault();
    const faltante = [
      ['full_name', 'checkout-name-input'], ['email', 'checkout-email-input'],
      ['phone', 'checkout-phone-input'], ['address', 'checkout-address-input'],
    ].find(([campo]) => !form[campo]);
    if (faltante) {
      toast.error(t('checkout.toast.required'));
      llevarAlCampo(faltante[1]);
      return;
    }
    if (!phoneValid(form.phone, phoneCountry)) {
      toast.error(t('checkout.toast.phone'));
      llevarAlCampo('checkout-phone-input');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({ product_id: i.sku || i.product_id, name: i.name, price: i.price, quantity: i.quantity, presentation: i.presentation, image_url: i.image_url })),
        customer: { ...form, phone: composePhone(phoneCountry, form.phone) },
        // Constancia de la aceptación 18+/RUO que dio en la puerta del sitio. Es lo
        // que antes se le volvía a pedir aquí con una casilla; el dato se conserva,
        // el estorbo no.
        terms_accepted_at: ruoAcceptedAt(),
        payment_method: payment,
        // Cómo pidió que se le mande cuando falta mercancía. Es una PREFERENCIA, no
        // dinero: no mueve un peso del total, por eso viaja tal cual. El servidor la
        // normaliza igual y la respeta al despachar (una guía o dos).
        // Si el pedido sale completo esto no cambia nada.
        shipping_preference: sobrePedido.length > 0 ? envioModo : 'partido',
        shipping: envioACobrar,
        // ⛔ Viaja el TIPO (estándar o express), NUNCA un monto. El servidor cobra
        // la política de la casa con sus números; lo que mande esta pantalla en
        // `shipping` lo ignora — creerle un precio al navegador ya costó dinero.
        shipping_express: hayExpress && express,
        discount,
        distributor_code: distCode || null,
        // ⛔ EL CARRITO COMPARTIDO: viaja el TOKEN y nada más. El servidor abre el
        // documento que guardó su distribuidora, revalida las cortesías contra el ROI
        // de ESTE pedido y sólo entonces las aplica. Ni el regalo ni su valor ni su
        // código pasan por aquí — no hay dónde escribirlos.
        shared_cart_token: sharedCartToken || null,
        points_to_use: pointsApplied,
        // De dónde salió este cliente (primer toque: utm/fbclid de su PRIMERA visita).
        // Va en el pedido para poder sacar el costo por cliente que SÍ compró: sin
        // esto, el gasto de Meta y las ventas no se pueden cruzar por campaña.
        attribution: attribution(),
        // Seguridad: los datos de la tarjeta NUNCA se envian ni se guardan en nuestro servidor.
      };
      const res = await api.post('/orders', payload);
      // ⛔ AQUÍ NO SE DISPARA `purchase`. Un pedido CREADO no es una venta: SPEI, cripto y
      // OXXO nacen pendientes y muchos no se pagan nunca. Disparándolo aquí, cada carrito
      // abandonado en la pasarela contaba como compra, el ROAS salía inflado y Meta
      // aprendía a buscar gente que no paga — que es peor que no medir.
      // El Purchase sale cuando el dinero está confirmado: en la página del pedido
      // (`/pedido/*` con paid=true) desde el navegador, y desde el servidor por la
      // Conversions API cuando el webhook confirma. Los dos llevan el MISMO
      // `purchase-<número>` y Meta los une en uno solo.
      //
      // Y aquí NO se manda ningún otro evento: el `checkout_start` ya salió al abrir esta
      // pantalla (arriba, al montar). Repetirlo le contaría a Meta DOS InitiateCheckout
      // por la misma persona — el embudo propio no se movería, porque cuenta sesiones
      // únicas, pero el de Meta sí. El pedido creado ya queda registrado donde importa:
      // en `db.orders`.
      clearCart();
      toast.success(t('checkout.toast.success'));
      // El servidor devuelve el enlace de la pasarela y ahí paga el cliente:
      // Mercado Pago para tarjeta, NOWPayments/BTCPay para cripto. De regreso lo
      // trae la URL de retorno a /pedido/... El pedido NO se da por pagado aquí:
      // eso solo pasa cuando la pasarela avisa por su webhook.
      const pasarela = res.data.card_checkout_url || res.data.crypto_checkout_url;
      if (pasarela) {
        window.location.href = pasarela;
        return;
      }
      navigate(`/pedido/${res.data.order_number}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || t('checkout.toast.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const contactDone = !!(form.full_name && form.email && form.phone);
  const shippingDone = contactDone && !!form.address;
  const stepActive = [true, contactDone, shippingDone];
  const steps = [{ i: UserRound, l: t('checkout.step1') }, { i: MapPin, l: t('checkout.step2') }, { i: CreditCard, l: t('checkout.step3') }];
  const goTo = (idx) => sectionRefs[idx].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const sectionHeader = (n, title, subtitle) => (
    <div className="flex items-start gap-3 mb-4">
      <span className="h-7 w-7 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/30 flex items-center justify-center text-sm font-bold shrink-0">{n}</span>
      <div>
        <h3 className="font-heading font-semibold leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-2">{t('checkout.title')}</h1>
      {!user && (
        <p className="text-sm text-muted-foreground mb-4" data-testid="checkout-login-hint">
          {t('checkout.haveAccount')} <Link to="/login" className="text-[hsl(var(--primary))] font-medium hover:underline">{t('checkout.loginLink')}</Link> · {t('checkout.guestOk')}
        </p>
      )}
      {deLaCotizacion ? (
        <p className="text-sm text-muted-foreground mb-4" data-testid="checkout-prefilled-cotizacion">
          {t('checkout.prefilledCotizacion')}
        </p>
      ) : prefilled && (
        <p className="text-sm text-muted-foreground mb-4" data-testid="checkout-prefilled-hint">
          {t('checkout.prefilled')}
        </p>
      )}
      <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-6 text-xs sm:text-sm" data-testid="checkout-stepper">
        {steps.map((s, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <div className={`h-px w-8 sm:w-14 transition-colors ${stepActive[idx] ? 'bg-[hsl(var(--primary))]' : 'bg-border'}`} />}
            <button type="button" onClick={() => goTo(idx)} className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${stepActive[idx] ? 'text-[hsl(var(--primary))]' : 'text-muted-foreground hover:text-foreground'}`} data-testid={`checkout-step-${idx + 1}`} data-active={stepActive[idx]}>
              <span className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${stepActive[idx] ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--secondary))] border border-border'}`}><s.i className="h-3 w-3" /></span>
              {s.l}
            </button>
          </React.Fragment>
        ))}
      </div>
      <form onSubmit={submit} className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-5 scroll-mt-36" ref={sectionRefs[0]} data-testid="checkout-section-contact">
            {sectionHeader(1, t('checkout.step1'), t('checkout.contactHint'))}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>{t('checkout.fullName')}</Label><Input className="mt-1.5" value={form.full_name} onChange={(e) => set('full_name', e.target.value)} data-testid="checkout-name-input" /></div>
              <div><Label>{t('checkout.email')}</Label><Input type="email" className="mt-1.5" value={form.email} onChange={(e) => set('email', e.target.value)} data-testid="checkout-email-input" /></div>
              <div><Label>{t('checkout.phone')}</Label><PhoneField country={phoneCountry} onCountryChange={setPhoneCountry} value={form.phone} onChange={(v) => set('phone', v)} testid="checkout-phone-input" /></div>
            </div>
          </Card>

          <Card className="p-5 scroll-mt-36" ref={sectionRefs[1]} data-testid="checkout-section-shipping">
            {sectionHeader(2, t('checkout.step2'), t('checkout.shippingHint'))}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>{t('checkout.address')}</Label><Input className="mt-1.5" value={form.address} onChange={(e) => set('address', e.target.value)} data-testid="checkout-address-input" /></div>
              {/* Interior / referencia. Metida en la primera línea, la paquetería la
                  imprime pegada al número y el repartidor no la lee. */}
              <div className="sm:col-span-2"><Label>{t('checkout.address2')}</Label><Input className="mt-1.5" value={form.address_2} onChange={(e) => set('address_2', e.target.value)} placeholder={t('checkout.address2Placeholder')} data-testid="checkout-address2-input" /></div>
              <div><Label>{t('checkout.city')}</Label><Input className="mt-1.5" value={form.city} onChange={(e) => set('city', e.target.value)} data-testid="checkout-city-input" /></div>
              {/* Lista cerrada donde la hay (MX/EUA/CA/BR) y texto libre donde no:
                  "CDMX", "Cd. de México" y "DF" son la misma entidad y así no se
                  puede ni agrupar ni imprimir una guía. */}
              <div><Label>{t('checkout.state')}</Label><StateField country={form.country} value={form.state} onChange={(v) => set('state', v)} testid="checkout-state-input" /></div>
              <div><Label>{t('checkout.postalCode')}</Label><Input className="mt-1.5" value={form.postal_code} onChange={(e) => set('postal_code', e.target.value)} data-testid="checkout-postal-code-input" /></div>
              {/* ⛔ SOLO SE ENVÍA A MÉXICO (Christian, 2026-07-28). Era un
                  desplegable de ~200 países: invitaba a elegir un destino al que
                  no llegamos, y el cliente solo se enteraba al final. Ahora es un
                  dato fijo, y el aviso está ARRIBA de la sección — nadie llena
                  seis campos para que luego le digan que no le llega. */}
              <div><Label>{t('checkout.country')}</Label>
                <div className="mt-1.5 flex h-10 items-center rounded-md border border-input bg-[hsl(var(--secondary))]/40 px-3 text-sm text-muted-foreground" data-testid="checkout-country-fixed">
                  <span className="mr-2">🇲🇽</span>{t('checkout.countryMexico')}
                </div>
              </div>
              <div className="sm:col-span-2"><Label>{t('checkout.notes')}</Label><Textarea className="mt-1.5" value={form.notes} onChange={(e) => set('notes', e.target.value)} data-testid="checkout-notes-input" /></div>
            </div>

            {/* EL TIPO DE ENVÍO (Christián, 2026-08-02). El cliente ya no ve
                paqueterías ni precios reales — eso lo resuelve la casa. Ve dos
                cosas: ESTÁNDAR (3-5 días hábiles, $250 o incluido según el
                importe) y EXPRESS (1-2 días hábiles, +$150 siempre). ⛔ Nunca se
                promete «1 día»: en México no existe. */}
            {hayExpress && (
              <div className="mt-5 rounded-xl border border-border bg-[hsl(var(--secondary))]/40 p-4" data-testid="checkout-shipping-options">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-4 w-4 text-[hsl(var(--primary))]" />
                  <span className="text-sm font-medium">{t('checkout.shipping.pick')}</span>
                </div>
                <RadioGroup value={express ? 'express' : 'estandar'}
                  onValueChange={(v) => setExpress(v === 'express')} className="space-y-2">
                  <Label htmlFor="envio-estandar"
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${!express ? 'border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--ring))] ring-offset-1' : 'border-border hover:bg-[hsl(var(--secondary))]'}`}
                    data-testid="checkout-envio-estandar">
                    <RadioGroupItem value="estandar" id="envio-estandar" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{t('checkout.shipping.standard')}</div>
                      <div className="text-xs text-muted-foreground">{t('checkout.shipping.standardDays')}</div>
                    </div>
                    <div className="text-sm font-medium shrink-0">
                      {envioEstandar > 0 ? formatMXN(envioEstandar)
                        : <span className="text-[hsl(var(--success))]">{t('checkout.shipping.included')}</span>}
                    </div>
                  </Label>
                  <Label htmlFor="envio-express"
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${express ? 'border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--ring))] ring-offset-1' : 'border-border hover:bg-[hsl(var(--secondary))]'}`}
                    data-testid="checkout-envio-express">
                    <RadioGroupItem value="express" id="envio-express" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{t('checkout.shipping.express')}</div>
                      <div className="text-xs text-muted-foreground">{t('checkout.shipping.expressDays')}</div>
                    </div>
                    <div className="text-sm font-medium shrink-0" data-testid="checkout-express-precio">
                      {expressGratis
                        ? <span className="text-[hsl(var(--success))]">{t('checkout.shipping.free')}</span>
                        : cumpleMinima
                          ? formatMXN(envioExpressTotal)
                          : `+${formatMXN(extraExpress)}`}
                    </div>
                  </Label>
                </RadioGroup>
                {/* «¡Buenas noticias!» (Christián, 2026-08-02): cuando el costo real
                    de la guía express cabe en el presupuesto de la casa (max $250 o
                    5% de la compra), el express sale gratis y SE DICE. */}
                {expressGratis && (
                  <p className="mt-2 text-xs text-[hsl(var(--success))] font-medium"
                    data-testid="checkout-express-gratis">
                    {t('checkout.shipping.expressGratis')}
                  </p>
                )}
                {/* ⛔ CON MERCANCÍA SOBRE PEDIDO EN EL CARRITO, SE DICE AQUÍ TAMBIÉN
                    (Christián, 2026-08-02): los plazos rápidos aplican a lo que hay
                    en bodega; lo sobre pedido tarda ~1 semana — como ya avisan el
                    catálogo, la ficha, el carrito y el bloque de envío partido. */}
                {sobrePedido.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground"
                    data-testid="checkout-envio-plazos-nota">
                    {t('checkout.shipping.soloDisponible')}
                  </p>
                )}
              </div>
            )}
          </Card>

          <Card className="p-5 scroll-mt-36" ref={sectionRefs[2]} data-testid="checkout-section-payment">
            {sectionHeader(3, t('checkout.step3'), t('checkout.paymentHint'))}
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3" data-testid="checkout-payment-method-radio">
              {methods.map((m) => {
                const Icon = ICONS[m.icon] || CreditCard;
                return (
                  <Label key={m.id} htmlFor={m.id} className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${payment === m.id ? 'border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--ring))] ring-offset-1' : 'border-border hover:bg-[hsl(var(--secondary))]'}`} data-testid={`checkout-payment-${m.id}`}>
                    <RadioGroupItem value={m.id} id={m.id} />
                    <div className="h-9 w-9 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center"><Icon className="h-4 w-4 text-[hsl(var(--primary))]" /></div>
                    <div><div className="font-medium text-sm">{t(`payment.${m.id}.label`)}</div><div className="text-xs text-muted-foreground">{t(`payment.${m.id}.desc`)}</div></div>
                  </Label>
                );
              })}
            </RadioGroup>

            {/* La tarjeta ya NO se teclea aquí: al confirmar mandamos al cliente a
                la página de Mercado Pago. Antes había un formulario que pedía el
                número, lo validaba con Luhn y lo TIRABA — nadie cobraba. Además,
                así los datos de la tarjeta nunca tocan nuestro servidor. */}
            {payment === 'tarjeta' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-card-note">
                {t('checkout.cardNote')}
              </div>
            )}

            {/* OXXO: el voucher lo genera Mercado Pago; el cliente lo paga en la
                tienda y el pedido se confirma cuando el webhook avisa. */}
            {payment === 'oxxo' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-oxxo-note">
                {t('checkout.oxxoNote')}
              </div>
            )}

            {payment === 'spei' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-spei-note">
                {t('checkout.speiNote')}
              </div>
            )}

            {payment === 'cripto' && (
              <div className="mt-4 rounded-xl border border-border bg-[hsl(var(--secondary))]/50 p-4 text-sm text-muted-foreground" data-testid="checkout-crypto-note">
                {t('checkout.cryptoNote')}
              </div>
            )}

            {/* ⛔ CÓMO QUIERE QUE LE MANDEMOS SU PEDIDO — LO ELIGE ÉL, NO NOSOTROS.
                (Christián, 2026-07-31.)

                Sólo aparece cuando de verdad hay algo que decidir: si el pedido sale
                completo de la bodega, esta pregunta no tiene sentido y no se pinta.
                Preguntar de más en la pantalla de pagar cuesta ventas.

                Hasta hoy la casa partía SIEMPRE sin preguntar: a quien tenía prisa le
                servía, y a quien no quería dos entregas le molestaba. Nadie le
                preguntó nunca. */}
            {sobrePedido.length > 0 && (
              <div className="mt-5 rounded-xl border border-border p-4" data-testid="checkout-envio-partido">
                <div className="text-sm font-medium">{t('shippingChoice.title')}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t('shippingChoice.hint')}</div>
                <RadioGroup value={envioModo} onValueChange={setEnvioModo} className="mt-3 space-y-2" data-testid="checkout-envio-partido-radio">
                  {['partido', 'completo'].map((modo) => (
                    <Label
                      key={modo}
                      htmlFor={`envio-${modo}`}
                      className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${envioModo === modo ? 'border-[hsl(var(--primary))] ring-2 ring-[hsl(var(--ring))] ring-offset-1' : 'border-border hover:bg-[hsl(var(--secondary))]'}`}
                      data-testid={`checkout-envio-${modo}`}
                    >
                      <RadioGroupItem value={modo} id={`envio-${modo}`} className="mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">{t(`shippingChoice.${modo}.label`)}</div>
                        <div className="text-xs text-muted-foreground">{t(`shippingChoice.${modo}.desc`)}</div>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* ⛔ AQUÍ HABÍA UNA CASILLA Y SE QUITÓ (Christian, 2026-07-28).
                Pedía otra vez lo MISMO que el visitante ya aceptó en la puerta de
                entrada del sitio (RuoGate: 18+ y RUO, antes de ver nada). Sin
                marcarla, "Realizar pedido" no hacía nada visible: solo un avisito
                que se borraba en 4 segundos, y la pantalla se iba hasta arriba,
                lejos de la casilla que faltaba. Tres veces seguidas se creyó que el
                botón estaba roto — en el último metro antes del dinero.
                Lo único que la casilla aportaba de verdad era la constancia, y esa
                no se perdió: viaja en el pedido como `terms_accepted_at`, con la
                fecha real en que aceptó la puerta. */}
            <p className="mt-5 text-xs text-muted-foreground leading-relaxed" data-testid="checkout-legal-note">
              <span>
                {t('checkout.legalNote')}{' '}
                <Link to="/info/privacidad" className="text-[hsl(var(--primary))] hover:underline">{t('auth.terms.privacy')}</Link> ·{' '}
                <Link to="/info/terminos" className="text-[hsl(var(--primary))] hover:underline">{t('auth.terms.service')}</Link> ·{' '}
                <Link to="/info/envios" className="text-[hsl(var(--primary))] hover:underline">{t('footer.shipping')}</Link> ·{' '}
                <Link to="/info/devoluciones" className="text-[hsl(var(--primary))] hover:underline">{t('footer.returns')}</Link>
              </span>
            </p>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-5 sticky top-32" data-testid="checkout-order-summary">
            <button type="button" onClick={() => setSummaryOpen((v) => !v)} className="w-full flex items-center justify-between mb-4" data-testid="checkout-summary-toggle">
              <h3 className="font-heading font-semibold">{t('common.items', { count: items.length })}</h3>
              <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--primary))] font-medium">{summaryOpen ? t('checkout.hideDetail') : t('checkout.viewDetail')} <ChevronDown className={`h-3.5 w-3.5 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} /></span>
            </button>
            {summaryOpen && (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((i) => (
                    <div key={i.product_id} className="flex gap-3 items-center text-sm">
                      <img src={i.image_url || null} alt={i.name} className="h-12 w-12 rounded-md object-cover border border-border" />
                      <div className="flex-1 min-w-0">
                        <div className="line-clamp-1">{i.name}</div>
                        <div className="text-xs text-muted-foreground">x{i.quantity}</div>
                        {sobrePedidoIds.has(i.product_id) && (
                          <AvisoSobrePedido testid="checkout-item-sobre-pedido" />
                        )}
                      </div>
                      <div>{formatMXN(i.price * i.quantity)}</div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </>
            )}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{t('common.subtotal')}</span><span>{formatMXN(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-[hsl(var(--success))]"><span>{discountSource === 'self' ? t('discount.lineSelf', { rate: Math.round(discountRate * 100) }) : discountSource === 'code' ? t('discount.lineCode', { code: distCode, rate: Math.round(discountRate * 100) }) : t('discount.line', { rate: Math.round(discountRate * 100) })}</span><span>− {formatMXN(discount)}</span></div>}
              {cappedItems.length > 0 && (
                <div className="rounded-lg border border-border bg-[hsl(var(--secondary))] px-3 py-2 text-[11px] leading-relaxed text-muted-foreground" data-testid="checkout-capped-notice">
                  <span className="font-medium text-foreground">{t('discount.cappedTitle')}</span>{' '}
                  {t('discount.cappedBody')}
                  <ul className="mt-1.5 space-y-0.5">
                    {cappedItems.map((i) => (
                      <li key={i.product_id} className="flex justify-between gap-2">
                        <span className="truncate">{i.name}</span>
                        <span className="shrink-0 font-mono-tech">{i.applied > 0 ? `−${Math.round(i.applied * 100)}%` : t('discount.cappedNone')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Regla de 5: el mismo aviso del carrito, aquí también. Quien llega al
                  checkout sin haberlo visto todavía está a tiempo de agregar piezas. */}
              {regla5Items.length > 0 && (
                <div className="rounded-lg border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/5 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground" data-testid="checkout-regla5-notice">
                  <span className="font-medium text-[hsl(var(--primary))]">{t('regla5.title', { min: regla5Items[0].minimo })}</span>{' '}
                  {t('regla5.body', { min: regla5Items[0].minimo })}
                  <ul className="mt-1.5 space-y-0.5">
                    {regla5Items.map((i) => (
                      <li key={i.product_id} className="flex justify-between gap-2">
                        <span className="truncate">{i.name}</span>
                        <span className="shrink-0 font-mono-tech">{i.quantity}/{i.minimo} · {t('regla5.missing', { faltan: i.faltan })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pointsApplied > 0 && <div className="flex justify-between text-[hsl(var(--success))]"><span>{t('loyalty.line')}</span><span>− {formatMXN(pointsApplied)}</span></div>}
              {/* El pedido ya NO cobra envío: se cotiza aparte (Christian, 2026-07-28).
                  El renglón se queda para que nadie crea que se le olvidó, pero sin
                  cargo. Si algún día se vuelve a cobrar, el servidor prende su
                  interruptor y este mismo renglón enseña el monto otra vez. */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('common.shipping')}</span>
                {/* Tres formas de pintar el mismo renglón, y las tres las decide el
                    servidor: cotizado (precio real), regalado (la casa lo absorbe)
                    o "se cotiza aparte" cuando el pedido no cobra envío. Hasta el
                    2026-07-31 el "gratis" sólo se pintaba con la cotización de
                    Skydropx encendida: por el camino de la tarifa plana, que es el
                    que se usa HOY, el envío ganado se enseñaba como "se cotiza
                    aparte" — o sea, el cliente no se enteraba de lo que se ganó. */}
                {envioGratis
                  ? <span className="text-[hsl(var(--success))]" data-testid="checkout-shipping-total">{t('checkout.shipping.free')}</span>
                  : envioACobrar > 0
                    ? <span data-testid="checkout-shipping-total">{formatMXN(envioACobrar)}</span>
                    : <span className="text-muted-foreground text-xs text-right" data-testid="checkout-shipping-total">{t('cart.shippingQuoted')}</span>}
              </div>
              {envioGratis && (
                <p className="text-xs text-[hsl(var(--success))]" data-testid="checkout-shipping-free-note">{t('checkout.shipping.freeNote')}</p>
              )}
              {faltaAquiParaEnvioGratis > 0 && (
                <p className="text-xs text-[hsl(var(--primary))]">{t('cart.freeShippingAt', { amount: formatMXN(faltaAquiParaEnvioGratis) })}</p>
              )}
            </div>
            {loyalty.eligible && loyalty.balance > 0 && (
              <label className="mt-4 flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3 cursor-pointer" data-testid="checkout-use-points">
                <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)}
                  className="h-4 w-4 mt-0.5 shrink-0 accent-[hsl(var(--primary))] cursor-pointer" />
                <span className="text-xs leading-relaxed">
                  <span className="font-medium">{t('loyalty.use', { points: loyalty.balance })}</span><br />
                  <span className="text-muted-foreground">{t('loyalty.useNote')}</span>
                </span>
              </label>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between font-heading font-bold text-lg"><span>{t('common.total')}</span><span>{formatMXN(total)}</span></div>
            <Button type="submit" className="w-full mt-5" size="lg" disabled={submitting} data-testid="checkout-place-order-button">
              {submitting ? t('common.loading') : (payment === 'tarjeta' ? t('checkout.payAmount', { amount: formatMXN(total) }) : t('checkout.placeOrder'))}
            </Button>
            {/* Los dos iconitos bajo el botón (Christián, 2026-08-02, última
                vuelta): Pago Seguro se queda y Pureza HPLC se cambia por el
                envío express — la pureza ya vive en los puntos del sello. */}
            <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> {t('checkout.securePayment')}</span>
              <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> {t('checkout.expressBadge')}</span>
            </div>

            {/* ⛔ DENTRO de la tarjeta pegajosa, no debajo (Christián, 2026-08-02:
                «I want the Tienda de Confianza static... under the Realizar Pedido
                button, I don't want it to move behind it floating»). Afuera, el
                resumen sticky se deslizaba y el widget se le quedaba atrás
                flotando; adentro viajan JUNTOS y el sello vive siempre pegado
                al botón de pagar. */}
            <TrustWidget className="mt-4" />
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
