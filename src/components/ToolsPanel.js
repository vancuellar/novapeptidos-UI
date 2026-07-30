import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ReconstitutionCalculator, { mgProducts } from '@/components/ReconstitutionCalculator';
import ProtocolTracker from '@/components/ProtocolTracker';
import HabitsQuiz from '@/components/HabitsQuiz';
import CotizadorDistribuidor from '@/components/CotizadorDistribuidor';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useDatosDelCotizador } from '@/lib/cotizador';
import { useLanguage } from '@/context/LanguageContext';

// "Mis Herramientas": la calculadora completa, el seguimiento de consumo y el
// cuestionario de hábitos. Vive aquí —y no dentro de Mi cuenta— porque el MISMO
// bloque se muestra en dos tableros: Mi cuenta (clientes) y Distribuidor. Si se
// duplicara, la próxima herramienta acabaría existiendo en uno y no en el otro.
//
// Las herramientas se desbloquean con la primera compra pagada. "Confirmado" es
// el momento en que se verifica el pago (tarjeta o SPEI), así que ese estado y
// los posteriores cuentan; "pendiente" y "cancelado" no.
export const PAID_STATUSES = ['confirmado', 'enviado', 'entregado'];

// El admin (Christian) y los distribuidores ven todas las herramientas sin
// necesidad de compra (orden de Christian 2026-07-22: full access al canal).
export const herramientasDesbloqueadas = (user, orders = []) =>
  orders.some((o) => PAID_STATUSES.includes(o.status))
  || !!user && (user.role === 'admin' || user.role === 'distributor');

// Péptidos que este usuario ya compró, para pre-cargar la calculadora.
// Solo los que el catálogo maneja en mg (los únicos que se reconstituyen).
//
// ⚠️ El nombre NO se compara por igualdad. El pedido guarda el nombre PLANO del
// backend, que trae la presentación pegada ("NAD+ 500 mg"), mientras el catálogo
// se llama "NAD+". Con igualdad exacta nunca coincidía: Paz Cambray tenía dos
// péptidos comprados y la calculadora le mostraba el catálogo entero, sin sus
// atajos (encontrado el 2026-07-26 viendo su cuenta con "Ver como").
//
// Se compara por prefijo y gana el nombre MÁS LARGO, porque si no un combo
// ("BPC-157 5mg + TB-500 5mg") se confundiría con "BPC-157".
const matchCatalogo = (nombreItem) => {
  const n = (nombreItem || '').toLowerCase().trim();
  if (!n) return null;
  const exacto = mgProducts.find((p) => p.name.toLowerCase() === n);
  if (exacto) return exacto;
  return mgProducts
    .filter((p) => n.startsWith(p.name.toLowerCase()))
    .sort((a, b) => b.name.length - a.name.length)[0] || null;
};

export const peptidosComprados = (orders = []) => {
  const seen = new Map();
  for (const o of orders.filter((x) => PAID_STATUSES.includes(x.status))) {
    for (const it of o.items || []) {
      const match = matchCatalogo(it.name);
      if (!match) continue;
      const mg = parseFloat(it.presentation) || (match.variants.length ? Math.min(...match.variants) : 0);
      const key = `${match.name}::${mg}`;
      if (!seen.has(key)) seen.set(key, { name: match.name, mg });
    }
  }
  return [...seen.values()];
};

// El COTIZADOR sólo existe en el panel del DISTRIBUIDOR: es su herramienta de
// venta, no la de un cliente. Vive en su propio componente —y no dentro de
// ToolsPanel— para que la petición de topes, que es una ruta de distribuidor, no
// salga JAMÁS desde la cuenta de un cliente (le contestaría 403 y ensuciaría la
// consola de todo el mundo).
//
// ⛔ Aquí no hay costos: el cotizador maneja precio público, el descuento que el
// distribuidor puede otorgar y los totales. El costo, el proveedor y el ROI son
// del admin y de nadie más.
const SeccionCotizador = ({ codigo }) => {
  const { t } = useLanguage();
  const { catalogo, tasaMaxima } = useDatosDelCotizador();
  return (
    <AccordionItem value="cotizador" className="border rounded-xl px-4">
      <AccordionTrigger className="font-heading font-semibold text-base hover:no-underline" data-testid="tool-cotizador-toggle">{t('cotizador.titulo')}</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-muted-foreground mb-4">{t('cotizador.subtitulo')}</p>
        <CotizadorDistribuidor catalogo={catalogo} tasaMaxima={tasaMaxima} codigo={codigo} conEncabezado={false} />
      </AccordionContent>
    </AccordionItem>
  );
};

const ToolsPanel = ({ unlocked, orders = [], cotizador = false, codigo = '' }) => {
  const { t } = useLanguage();
  const [protocols, setProtocols] = useState([]);

  const loadProtocols = useCallback(
    () => api.get('/me/protocols').then((r) => setProtocols(r.data)).catch(() => {}),
    [],
  );

  useEffect(() => { loadProtocols(); }, [loadProtocols]);

  const trackProtocol = async (payload) => {
    try {
      await api.post('/me/protocols', { ...payload, doses_per_week: 7, vials: 1 });
      await loadProtocols();
      toast.success(t('track.added'));
    } catch { toast.error(t('track.error')); }
  };

  if (!unlocked) {
    return (
      <Card className="p-10 text-center" data-testid="tools-locked">
        <Lock className="h-8 w-8 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="font-heading font-semibold text-lg mb-2">{t('account.tools.lockedTitle')}</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {orders.length === 0 ? t('account.tools.lockedNoOrders') : t('account.tools.lockedPending')}
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          <Link to="/calculadora"><Button variant="outline">{t('account.tools.publicCalc')}</Button></Link>
          <Link to="/catalogo"><Button>{t('account.exploreCatalog')}</Button></Link>
        </div>
      </Card>
    );
  }

  // Las herramientas viven MINIMIZADAS (pedido de Christián, 2026-07-30): solo
  // el título a la vista, y cada una se expande cuando el cliente la abre.
  return (
    <Accordion type="multiple" className="space-y-3">
      {cotizador && <SeccionCotizador codigo={codigo} />}
      <AccordionItem value="calc" className="border rounded-xl px-4">
        <AccordionTrigger className="font-heading font-semibold text-base hover:no-underline" data-testid="tool-calc-toggle">{t('calc.title')}</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground mb-4">{t('account.tools.calcHint')}</p>
          <ReconstitutionCalculator variant="full" purchased={peptidosComprados(orders)} onTrack={trackProtocol} syncUrl={false} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="track" className="border rounded-xl px-4">
        <AccordionTrigger className="font-heading font-semibold text-base hover:no-underline" data-testid="tool-track-toggle">{t('account.tools.trackTitle')}</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground mb-4">{t('account.tools.trackHint')}</p>
          <ProtocolTracker protocols={protocols} onChange={loadProtocols} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="habits" className="border rounded-xl px-4">
        <AccordionTrigger className="font-heading font-semibold text-base hover:no-underline" data-testid="tool-habits-toggle">{t('account.tools.habitsTitle')}</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground mb-4">{t('account.tools.habitsHint')}</p>
          <HabitsQuiz />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ToolsPanel;
