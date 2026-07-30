import React, { useEffect, useState } from 'react';
import { Bell, Package, CheckCircle2, TrendingUp, Award, Megaphone, AlarmClock, X, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import FichaPedido from '@/components/FichaPedido';
import FichaCliente from '@/components/FichaCliente';

// ⛔ EL AVISO TIENE QUE LLEVAR A ALGÚN LADO (Christián, 2026-07-30). La campanita
// decía «Entró Un Pedido EX-…» y ahí terminaba: para ver de qué se trataba había que
// ir a otra pestaña y buscar el número a mano. Ahora el propio aviso abre el pedido y
// a quien lo hizo.
//
// El número se saca de `order_number` cuando el aviso lo trae; los avisos que ya
// estaban guardados antes de este cambio no lo traen, así que se lee del texto. Sin
// ese respaldo, los avisos de hoy —los de las ventas de María— se quedarían mudos.
const numeroDePedido = (n) => n.order_number
  || (`${n.title || ''} ${n.body || ''}`.match(/EX-\d{6,}-\d+/) || [])[0]
  || null;

// Icono por tipo de notificación.
const ICONS = {
  order_delivered: Package,
  payment_confirmed: CheckCircle2,
  running_low: AlarmClock,
  new_sale: TrendingUp,
  level_up: Award,
  achievement: Award,
  announcement: Megaphone,
};

// Feed de notificaciones del usuario (cliente o distribuidor). Al montarse marca
// todo como leído y avisa al padre para apagar el globito de no-leídas.
const NotificationsFeed = ({ onSeen }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [pedidoAbierto, setPedidoAbierto] = useState(null);
  const [clienteAbierto, setClienteAbierto] = useState(null);
  // Sólo quien vende abre fichas; a un cliente el servidor le contestaría 403, así que
  // ni se le pinta el botón (la seguridad, como siempre, vive en el servidor).
  const puedeAbrirFichas = ['admin', 'distributor'].includes(user?.role);

  useEffect(() => {
    let alive = true;
    api.get('/me/notifications').then((r) => {
      if (!alive) return;
      setItems(r.data.notifications || []);
      setLoaded(true);
      api.post('/me/notifications/seen').then(() => {
        onSeen && onSeen();
        // Avisa al Header (y a quien escuche) para apagar el globito al instante.
        window.dispatchEvent(new CustomEvent('exygen:notifications-seen'));
      }).catch(() => {});
    }).catch(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = async (id) => {
    setItems((xs) => xs.filter((x) => x.id !== id));      // se va de inmediato
    try { await api.delete(`/me/notifications/${id}`); }
    catch { toast.error(t('news.deleteError')); }
    window.dispatchEvent(new CustomEvent('exygen:notifications-seen'));
  };

  const dismissAll = async () => {
    setItems([]);
    try { await api.delete('/me/notifications'); }
    catch { toast.error(t('news.deleteError')); }
    window.dispatchEvent(new CustomEvent('exygen:notifications-seen'));
  };

  const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString(language, { day: 'numeric', month: 'short', year: 'numeric' }) : '');

  if (loaded && items.length === 0) {
    return <Card className="p-10 text-center text-muted-foreground" data-testid="news-empty">{t('news.empty')}</Card>;
  }
  return (
    <div className="space-y-2" data-testid="news-feed">
      {items.length > 0 && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:bg-destructive hover:text-white" onClick={dismissAll} data-testid="news-clear-all">
            <Trash2 className="h-3.5 w-3.5 mr-1.5" /> {t('news.clearAll')}
          </Button>
        </div>
      )}
      {items.map((n) => {
        const Icon = ICONS[n.type] || Bell;
        const pedido = puedeAbrirFichas ? numeroDePedido(n) : null;
        const cliente = puedeAbrirFichas ? n.client_id : null;
        return (
          <Card key={n.id} className="p-4 flex gap-3">
            <Icon className="h-5 w-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium text-sm">{n.title}</div>
                <div className="text-[11px] text-muted-foreground whitespace-nowrap">{fmt(n.created_at)}</div>
              </div>
              {n.body && <div className="text-sm text-muted-foreground mt-0.5">{n.body}</div>}
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {pedido && (
                  <button type="button" onClick={() => setPedidoAbierto(pedido)} data-testid="news-open-order"
                    className="text-xs text-[hsl(var(--primary))] hover:underline">{t('news.openOrder')}</button>
                )}
                {cliente && (
                  <button type="button" onClick={() => setClienteAbierto(cliente)} data-testid="news-open-client"
                    className="text-xs text-[hsl(var(--primary))] hover:underline">{t('news.openClient')}</button>
                )}
                {n.link && !pedido && <a href={n.link} className="text-xs text-[hsl(var(--primary))] hover:underline">{t('news.view')}</a>}
              </div>
            </div>
            <button type="button" onClick={() => dismiss(n.id)} aria-label={t('news.delete')} title={t('news.delete')}
              className="shrink-0 rounded-md p-1 -m-1 text-muted-foreground hover:bg-destructive hover:text-white transition-colors" data-testid={`news-dismiss-${n.id}`}>
              <X className="h-4 w-4" />
            </button>
          </Card>
        );
      })}

      <FichaPedido orderNumber={pedidoAbierto} open={!!pedidoAbierto} admin={user?.role === 'admin'}
        onClose={() => setPedidoAbierto(null)} />
      <FichaCliente clientId={clienteAbierto} open={!!clienteAbierto}
        onClose={() => setClienteAbierto(null)} />
    </div>
  );
};

export default NotificationsFeed;
