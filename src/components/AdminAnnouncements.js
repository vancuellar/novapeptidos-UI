import React, { useEffect, useState, useCallback } from 'react';
import { Megaphone, Trash2, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

// Centro de noticias del admin: publica avisos a Todos / Clientes / Distribuidores,
// con opción de mandarlos también por correo. Lista y borra los enviados.
const AdminAnnouncements = () => {
  const { t, language } = useLanguage();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [byEmail, setByEmail] = useState(false);
  const [sending, setSending] = useState(false);

  const load = useCallback(() => {
    api.get('/admin/announcements').then((r) => setList(r.data || [])).catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  const send = async () => {
    if (!title.trim()) { toast.error(t('adminNews.needTitle')); return; }
    setSending(true);
    try {
      await api.post('/admin/announcements', { title: title.trim(), body: body.trim(), audience, email: byEmail });
      setTitle(''); setBody(''); setByEmail(false); load();
      toast.success(t('adminNews.sent'));
    } catch { toast.error(t('adminNews.error')); } finally { setSending(false); }
  };
  const remove = async (id) => {
    try { await api.delete(`/admin/announcements/${id}`); load(); toast.success(t('adminNews.deleted')); }
    catch { toast.error(t('adminNews.error')); }
  };
  const audLabel = (a) => t(`adminNews.aud.${a}`);
  const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString(language, { day: 'numeric', month: 'short', year: 'numeric' }) : '');

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading font-semibold flex items-center gap-2"><Megaphone className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('adminNews.title')}</h3>
        <p className="text-sm text-muted-foreground mt-1">{t('adminNews.hint')}</p>
      </div>
      <Card className="p-4 space-y-3" data-testid="admin-news-form">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('adminNews.titlePlaceholder')} maxLength={140} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={t('adminNews.bodyPlaceholder')} maxLength={4000} rows={3}
          className="w-full rounded-md border border-[hsl(var(--border))] bg-transparent px-3 py-2 text-sm" />
        <div className="flex flex-wrap items-center gap-3">
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger className="w-52 h-9" data-testid="admin-news-audience"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('adminNews.aud.all')}</SelectItem>
              <SelectItem value="clients">{t('adminNews.aud.clients')}</SelectItem>
              <SelectItem value="distributors">{t('adminNews.aud.distributors')}</SelectItem>
            </SelectContent>
          </Select>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={byEmail} onChange={(e) => setByEmail(e.target.checked)} /> {t('adminNews.alsoEmail')}
          </label>
          <Button onClick={send} disabled={sending} className="ml-auto" data-testid="admin-news-send"><Send className="h-4 w-4 mr-1.5" /> {t('adminNews.publish')}</Button>
        </div>
      </Card>
      <div className="space-y-2">
        {list.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">{t('adminNews.none')}</Card>
        ) : list.map((a) => (
          <Card key={a.id} className="p-4 flex gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{a.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(var(--muted))] text-muted-foreground">{audLabel(a.audience)}</span>
                <span className="text-[11px] text-muted-foreground">{fmt(a.created_at)}</span>
              </div>
              {a.body && <div className="text-sm text-muted-foreground mt-1">{a.body}</div>}
            </div>
            <Button variant="ghost" size="sm" onClick={() => remove(a.id)} className="text-[hsl(var(--destructive))] shrink-0" title={t('adminNews.delete')}><Trash2 className="h-4 w-4" /></Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
