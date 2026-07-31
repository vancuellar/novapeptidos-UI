import React, { useEffect, useState } from 'react';
import { Package, Truck, MapPin, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

/**
 * EL RASTREO, DENTRO DE NUESTRA PÁGINA.
 *
 * ⛔ ORDEN DE CHRISTIÁN (2026-07-31): «quiero que el cliente rastree su pedido DENTRO de
 * exygenlabs.com, sin mandarlo a la página de FedEx; quiero que vivan en nuestra página
 * el mayor tiempo posible».
 *
 * Su primera idea fue meter la página de FedEx en un marco (iframe). NO SE PUEDE, y no
 * es cuestión de programarlo mejor: las paqueterías lo prohíben desde SU servidor y el
 * navegador obedece. Comprobado con `curl -I` el 2026-07-31:
 *
 *     https://www.fedex.com/wtrk/track/?trknbr=...
 *         x-frame-options: SAMEORIGIN
 *         content-security-policy: frame-ancestors 'self'
 *     https://rastreo3.estafeta.com/...
 *         x-frame-options: SAMEORIGIN
 *
 * `frame-ancestors 'self'` quiere decir «sólo fedex.com puede enmarcarme»: dentro de
 * nuestro sitio ese marco sale EN BLANCO. Es PEOR que mandar al cliente a FedEx, porque
 * parece que nuestra página está rota.
 *
 * Lo que sí se puede es esto: el servidor le pide los eventos a la API de la paquetería
 * (ver `rastreo.py`) y aquí se pintan con la marca de la casa.
 *
 * Tres cosas que cuida este componente:
 *
 *   1. ⛔ NUNCA TUMBA LA FICHA DEL PEDIDO. Si el rastreo falla, este bloque simplemente
 *      no se pinta. El cliente ya pagó: tiene derecho a ver su pedido aunque FedEx tenga
 *      un mal día. Por eso el `catch` apaga el bloque en vez de enseñar un error.
 *
 *   2. ⛔ LA LIGA A LA PAQUETERÍA NO SE ESCONDE, PERO NO ES LA PROTAGONISTA. Va hasta
 *      abajo, chiquita. Quien la quiera la tiene; el resto se queda con nosotros.
 *
 *   3. ⛔ PRIMERO EL MÓVIL. La línea de tiempo es VERTICAL: casi todo el que abre esto
 *      lo abre desde el teléfono, con el correo recién llegado. En vertical cabe igual
 *      en un teléfono que en una pantalla grande, y no hay que inventar dos diseños.
 */

// Los cuatro pasos, en orden. Los mismos que manda el servidor (`rastreo.PASOS`): si
// aquí y allá dejaran de coincidir, la barra se pintaría en el paso equivocado.
const PASOS = ['recibido', 'transito', 'reparto', 'entregado'];
const ICONOS = { recibido: Package, transito: Truck, reparto: MapPin, entregado: CheckCircle2 };

// Para que la fecha se lea en el idioma en el que está el sitio.
const LOCALES = { 'es-MX': 'es-MX', 'en-US': 'en-US', 'pt-BR': 'pt-BR' };

const fechaLarga = (valor, idioma) => {
  if (!valor) return '';
  const d = new Date(valor);
  if (Number.isNaN(d.getTime())) return '';
  try {
    return d.toLocaleDateString(LOCALES[idioma] || 'es-MX',
      { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch { return d.toLocaleDateString(); }
};

/**
 * ⛔ LA ENTREGA ESTIMADA NO SIEMPRE ES UNA FECHA. El pedido de Aidee traía
 * `eta: "2 - 5 dias habiles"` —texto libre, capturado a mano— y tratarlo como fecha
 * dejaba en pantalla un «Llegada estimada:» seguido de NADA, que se ve roto.
 * Si parece fecha se formatea bonito; si no, se enseña tal cual lo escribieron.
 */
const fechaCorta = (valor, idioma) => {
  if (!valor) return '';
  const d = new Date(valor);
  if (Number.isNaN(d.getTime())) return String(valor);
  try {
    return d.toLocaleDateString(LOCALES[idioma] || 'es-MX',
      { weekday: 'long', day: 'numeric', month: 'long' });
  } catch { return d.toLocaleDateString(); }
};

const RastreoEnvio = ({ orderNumber }) => {
  const { t, language } = useLanguage();
  const [datos, setDatos] = useState(null);

  /**
   * ⛔ EL CARRIER REPORTA EN INGLÉS. FedEx manda «Picked up» y «Shipment information
   * sent to fedex» tal cual, y eso se veía en inglés en medio de una página en español
   * (comprobado en vivo con el pedido de Brenda el 2026-07-31).
   *
   * Como el servidor ya normaliza el código del evento (`picked_up`, `in_transit`…),
   * se prefiere NUESTRO texto en el idioma del sitio y sólo se cae al del carrier
   * cuando el código es uno que no conocemos. Traducir a ciegas la frase del carrier
   * sería inventar; traducir por CÓDIGO es exacto.
   */
  const textoDelEvento = (e) => {
    const clave = `tracking.event.${e.estado || ''}`;
    const nuestro = t(clave);
    // `t` devuelve la clave pelada cuando no la encuentra: así se sabe que no hay.
    return nuestro === clave ? (e.descripcion || '') : nuestro;
  };

  useEffect(() => {
    if (!orderNumber) return;
    let vivo = true;
    api.get(`/orders/${orderNumber}/rastreo`)
      .then((r) => { if (vivo) setDatos(r.data); })
      // Silencioso a propósito: ver el punto 1 de arriba. Un rastreo que no carga no
      // puede convertirse en un error rojo encima de la confirmación de compra.
      .catch(() => { if (vivo) setDatos(null); });
    return () => { vivo = false; };
  }, [orderNumber]);

  if (!datos) return null;

  const actual = Math.max(0, PASOS.indexOf(datos.paso || 'recibido'));
  const eventos = datos.eventos || [];

  return (
    <div className="mt-4 rounded-lg border border-border p-4 text-left" data-testid="rastreo-envio">
      <div className="flex items-center gap-2 font-heading font-semibold mb-1">
        <Truck className="h-4 w-4 text-[hsl(var(--primary))]" /> {t('tracking.title')}
      </div>

      {/* La guía y la paquetería, que es lo primero que busca quien abre esto. */}
      {datos.rastreo ? (
        <p className="text-xs text-muted-foreground mb-4" data-testid="rastreo-guia">
          {datos.paqueteria ? `${datos.paqueteria} · ` : ''}
          <span className="font-mono-tech">{datos.rastreo}</span>
        </p>
      ) : (
        <p className="text-xs text-muted-foreground mb-4">{t('tracking.preparing')}</p>
      )}

      {/* ⛔ EL AVISO DE PROBLEMA VA ARRIBA DE TODO. Si el paquete está retenido o de
          regreso, esconderlo abajo sólo hace que el cliente se entere más tarde y nos
          escriba más enojado. */}
      {datos.incidencia && (
        <div className="mb-4 flex items-start gap-2 rounded-md bg-[hsl(var(--warning))] border border-[hsl(var(--warning-border))] text-[hsl(var(--warning-foreground))] p-3 text-xs leading-relaxed" data-testid="rastreo-incidencia">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{t('tracking.issue')}</span>
        </div>
      )}

      {/* La línea de tiempo. Vertical: se lee igual en el teléfono que en el escritorio. */}
      <ol className="relative space-y-0" data-testid="rastreo-pasos">
        {PASOS.map((paso, i) => {
          const Icono = ICONOS[paso];
          const hecho = i <= actual;
          const esUltimo = i === PASOS.length - 1;
          return (
            <li key={paso} className="relative flex gap-3 pb-5 last:pb-0" data-testid={`rastreo-paso-${paso}`}
              data-hecho={hecho ? 'si' : 'no'}>
              {/* El hilo que une los pasos. No se pinta debajo del último. */}
              {!esUltimo && (
                <span aria-hidden="true"
                  className={`absolute left-[13px] top-7 bottom-0 w-px ${i < actual ? 'bg-[hsl(var(--primary))]' : 'bg-border'}`} />
              )}
              <span className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                hecho
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                  : 'border-border bg-[hsl(var(--background))] text-muted-foreground'}`}>
                <Icono className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className={`text-sm leading-tight ${hecho ? 'font-medium' : 'text-muted-foreground'}`}>
                  {t(`tracking.step.${paso}`)}
                </p>
                {/* La fecha del paso: la del evento más reciente que lo alcanzó. */}
                {i === actual && datos.entrega_estimada && !esUltimo && (
                  <p className="text-xs text-muted-foreground mt-0.5" data-testid="rastreo-eta">
                    {t('tracking.eta', { date: fechaCorta(datos.entrega_estimada, language) })}
                  </p>
                )}
                {esUltimo && datos.entregado_en && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {fechaLarga(datos.entregado_en, language)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* ⛔ SIN DETALLE, LA VERDAD — NO UN HUECO (Christián, 2026-07-31: «el rastreo
          también debe aplicar para Aidee»). Hay guías que no se compraron por ninguna
          plataforma —la de Aidee se compró a mano en el mostrador de FedEx— y de ésas
          nunca vamos a tener los eventos. Antes eso dejaba la caja a medias, como si
          algo se hubiera roto. Ahora se dice: la guía y la paquetería siguen ahí
          arriba, la liga sigue abajo, y en medio va el porqué. */}
      {eventos.length === 0 && datos.rastreo && (
        <div className="mt-4 pt-4 border-t border-border" data-testid="rastreo-sin-detalle">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t('tracking.noDetail')}
          </p>
        </div>
      )}

      {/* El historial que reportó la paquetería, del más nuevo al más viejo — que es el
          orden en que la gente lo lee cuando quiere saber «¿y ahora dónde está?». */}
      {eventos.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border" data-testid="rastreo-eventos">
          <p className="text-xs font-medium mb-2">{t('tracking.history')}</p>
          <ul className="space-y-2">
            {eventos.slice().reverse().map((e, i) => (
              <li key={`${e.fecha}-${i}`} className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 text-xs">
                <span className="text-foreground">
                  {textoDelEvento(e)}
                  {e.lugar ? <span className="text-muted-foreground"> · {e.lugar}</span> : null}
                </span>
                <span className="text-muted-foreground shrink-0 font-mono-tech">
                  {fechaLarga(e.fecha, language)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ⛔ ABAJO Y CHIQUITA, PERO AHÍ. Christián quiere que el cliente se quede en
          nuestra página, no que se sienta encerrado: quien prefiera ver el sitio de la
          paquetería tiene la liga. Sólo deja de ser lo primero que se ve. */}
      {datos.url_paqueteria && (
        <a href={datos.url_paqueteria} target="_blank" rel="noopener noreferrer"
          data-testid="rastreo-liga-paqueteria"
          className="mt-4 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-[hsl(var(--primary))]">
          {t('tracking.carrierSite')} <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
};

export default RastreoEnvio;
