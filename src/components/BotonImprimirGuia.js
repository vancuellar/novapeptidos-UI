import React, { useEffect, useRef, useState } from 'react';
import { Printer, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { traerEtiqueta, imprimirEtiqueta, abrirEtiqueta } from '@/lib/etiquetaGuia';

/**
 * IMPRIMIR GUÍA — un botón, el papel en la impresora.
 *
 * ⛔ ORDEN DE CHRISTIÁN (2026-07-31): «quiero manejar TODO desde nuestra app». Este
 * botón vive en la ficha del pedido (que se abre desde ocho lugares) y en el panel de
 * pedidos del admin, así que el mismo componente sirve a los dos: cada quien le pasa
 * SU ruta, y el candado de rol lo aplica el servidor, no esta pantalla.
 *
 * Lo que hace, en orden, sin que quien despacha tenga que saber nada:
 *   1. le pide el PDF a nuestro servidor (con sesión, no con una liga);
 *   2. si la paquetería todavía no lo publica, dice «Generando…» y reintenta sola —
 *      el papel tarda unos segundos en aparecer después de comprar la guía;
 *   3. abre el diálogo de impresión;
 *   4. si el navegador no deja imprimir desde adentro, la abre en pestaña nueva para
 *      verla y guardarla. Nunca se queda alguien con el paquete y sin etiqueta.
 *
 * `ruta`: '/admin/orders/{numero}/etiqueta' o '/distributor/orders/{numero}/etiqueta'.
 */
const BotonImprimirGuia = ({ ruta, testid = 'imprimir-guia', className = '' }) => {
  const { t } = useLanguage();
  const [estado, setEstado] = useState('listo');   // listo | bajando | generando
  const [pdf, setPdf] = useState('');
  const vivo = useRef(true);
  const hoja = useRef('');

  // Al cerrar la ficha: nada de tocar estado de un componente que ya no existe, y la
  // hoja bajada se suelta. Vive en la memoria del navegador hasta que se revoca, así
  // que imprimir veinte pedidos seguidos sin esto deja veinte PDF colgados.
  useEffect(() => () => {
    vivo.current = false;
    if (hoja.current) URL.revokeObjectURL(hoja.current);
  }, []);

  const imprimir = async () => {
    setEstado('bajando');
    try {
      // La segunda vez ya no se vuelve a bajar: la misma hoja se manda otra vez a la
      // impresora. Es lo normal cuando la primera sale torcida o se acabó el papel.
      const url = pdf || await traerEtiqueta(ruta, {
        alEsperar: () => vivo.current && setEstado('generando'),
      });
      if (!vivo.current) { URL.revokeObjectURL(url); return; }
      hoja.current = url;
      setPdf(url);
      const seImprimio = await imprimirEtiqueta(url);
      if (!seImprimio) {
        abrirEtiqueta(url);
        toast.info(t('etiqueta.opened'));
      }
    } catch (e) {
      // Tres desenlaces distintos y tres avisos distintos. El que importa es
      // `manual`: ahí no hay papel nuestro y no lo va a haber, así que decirle
      // «generando, espera» sería mandarlo a picarle diez veces (Christián,
      // 2026-08-05). Se le dice qué pasó y dónde está su PDF.
      const estado = e.response?.data?.detail?.estado;
      if (estado === 'manual') toast.warning(t('etiqueta.manual'), { duration: 8000 });
      else if (e.response?.status === 409) toast.error(t('etiqueta.notReady'));
      else toast.error(t('etiqueta.error'));
    } finally {
      if (vivo.current) setEstado('listo');
    }
  };

  const trabajando = estado !== 'listo';

  return (
    <>
      <Button variant="outline" size="sm" className={className} onClick={imprimir}
        disabled={trabajando} data-testid={testid}>
        <Printer className="h-4 w-4 mr-1.5" />
        {estado === 'generando' ? t('etiqueta.generating') : t('etiqueta.print')}
      </Button>
      {/* Aparece sólo cuando la hoja ya está en el navegador: guardarla en el
          escritorio o mandarla por WhatsApp es otra necesidad real, y así no hay que
          volver a pedirla. */}
      {pdf && (
        <Button variant="ghost" size="sm" onClick={() => abrirEtiqueta(pdf)}
          data-testid={`${testid}-abrir`}>
          <ExternalLink className="h-4 w-4 mr-1.5" /> {t('etiqueta.open')}
        </Button>
      )}
    </>
  );
};

export default BotonImprimirGuia;
