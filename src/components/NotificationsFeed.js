import React, { useEffect, useState } from 'react';
import { Bell, Package, CheckCircle2, TrendingUp, Award, Megaphone, AlarmClock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import api from '@/lib/api';
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
      api.post('/me/notifications/seen').then(() => onSeen && onSeen()).catch(() => {});
    }).catch(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString(language, { day: 'numeric', month: 'short', year: 'numeric' }) : '');

  if (loaded && items.length === 0) {
    return <Card className="p-10 text-center text-muted-foreground" data-testid="news-empty">{t('news.empty')}</Card>;
  }
  return (
    <div className="space-y-2" data-testid="news-feed">
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
          </Card>
        );
      })}
    </div>
  );
};

export default NotificationsFeed;
