import React, { useEffect, useState } from 'react';
import { Bell, Package, CheckCircle2, TrendingUp, Award, Megaphone, AlarmClock, X, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/context/LanguageContext';

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
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={dismissAll} data-testid="news-clear-all">
            <Trash2 className="h-3.5 w-3.5 mr-1.5" /> {t('news.clearAll')}
          </Button>
        </div>
      )}
      {items.map((n) => {
        const Icon = ICONS[n.type] || Bell;
        return (
          <Card key={n.id} className="p-4 flex gap-3">
            <Icon className="h-5 w-5 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium text-sm">{n.title}</div>
                <div className="text-[11px] text-muted-foreground whitespace-nowrap">{fmt(n.created_at)}</div>
              </div>
              {n.body && <div className="text-sm text-muted-foreground mt-0.5">{n.body}</div>}
              {n.link && <a href={n.link} className="text-xs text-[hsl(var(--primary))] hover:underline mt-1 inline-block">{t('news.view')}</a>}
            </div>
            <button type="button" onClick={() => dismiss(n.id)} aria-label={t('news.delete')} title={t('news.delete')}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors" data-testid={`news-dismiss-${n.id}`}>
              <X className="h-4 w-4" />
            </button>
          </Card>
        );
      })}
    </div>
  );
};

export default NotificationsFeed;
