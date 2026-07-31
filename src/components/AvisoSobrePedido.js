import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * LA NOTA DE ENVÍO DESDE EUA — chiquita, debajo de CADA renglón sobre pedido.
 *
 * ⛔ Antes esto era un bloque grande arriba del carrito/checkout ("Tu pedido llega en
 * dos entregas") con el desglose de piezas y plazos duros. Christián lo quitó
 * (2026-07-30): asusta más de lo que informa, y el desglose de piezas es un dato de
 * OPERACIÓN (a Christián le sirve para saber qué mandar pedir), no algo que el cliente
 * necesite ver. Lo único que el cliente necesita saber es que ESE producto viene de
 * fuera y tarda un poco más — sin fechas, sin "dos entregas".
 *
 * Se usa en el carrito, el checkout, la confirmación y el correo del pedido, siempre
 * pegado al renglón del producto que corresponde. El aviso interno del admin (con
 * proveedor y desglose completo) es OTRO componente y no se toca aquí.
 */
const AvisoSobrePedido = ({ testid = 'aviso-sobre-pedido' }) => {
  const { t } = useLanguage();
  return (
    <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug" data-testid={testid}>
      {t('backorder.itemNote')}
    </p>
  );
};

export default AvisoSobrePedido;
