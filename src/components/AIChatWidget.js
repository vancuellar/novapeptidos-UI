import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';

// El chat de IA vive en su propio servicio (Gemini), separado del backend principal.
const CHAT_API = 'https://chat.exygenlabs.com/api';

const QUICK = [
  'chat.quick.order',
  'chat.quick.ruo',
  'chat.quick.goal',
  'chat.quick.coa',
];

const getSessionId = () => {
  let id = localStorage.getItem('np_chat_session');
  if (!id) {
    id = 'sess-' + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('np_chat_session', id);
  }
  return id;
};

const AIChatWidget = () => {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('chat.initial') },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Si el usuario cambia de idioma antes de escribir, el saludo se traduce.
  // Ya empezada la conversación no se toca, para no borrar lo que se dijo.
  useEffect(() => {
    setMessages((prev) => (prev.length === 1 && prev[0].role === 'assistant'
      ? [{ role: 'assistant', content: t('chat.initial') }]
      : prev));
  }, [language, t]);

  const send = async (text) => {
    const message = (text || input).trim();
    if (!message || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: message }, { role: 'assistant', content: '' }]);
    setLoading(true);

    try {
      // Con sesión iniciada mandamos el token: así el asistente puede consultar
      // el estatus y la guía de los pedidos del propio cliente.
      const token = localStorage.getItem('np_token');
      const res = await fetch(`${CHAT_API}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // El idioma va en cada mensaje: el asistente responde en el que el
        // usuario tenga elegido en el sitio, no siempre en español.
        body: JSON.stringify({ session_id: sessionId.current, message, language }),
      });
      if (!res.body) throw new Error('No stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch (e) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: t('chat.error') };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          data-testid="ai-chat-open-button"
          className="fixed bottom-24 right-5 z-50 h-14 w-14 rounded-full bg-[#25D366] text-[#0b3d1f] shadow-[var(--shadow-md)] flex items-center justify-center hover:scale-105 transition-transform"
          aria-label={t('chat.open')}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-24 sm:right-5 z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[600px] sm:max-h-[75vh] bg-card text-card-foreground sm:rounded-2xl border border-border shadow-[var(--shadow-md)] flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-[hsl(var(--secondary))] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#25D366] flex items-center justify-center"><FlaskConical className="h-4 w-4 text-[#0b3d1f]" /></div>
              <div>
                <div className="font-heading font-semibold text-sm leading-tight">{t('chat.title')}</div>
                <div className="text-[10px] text-muted-foreground">{t('chat.online')}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} data-testid="ai-chat-close-button"><X className="h-5 w-5" /></Button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="ai-chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${m.role === 'user' ? 'bg-[#25D366] text-[#0b3d1f] rounded-br-sm' : 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] rounded-bl-sm'}`}>
                  {m.content || (loading && i === messages.length - 1 ? '…' : '')}
                </div>
              </div>
            ))}
          </div>

          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK.map((key) => (
                <button key={key} onClick={() => send(t(key))} data-testid="ai-chat-quick-reply-button" className="text-xs border border-border rounded-full px-3 py-1.5 hover:bg-[hsl(var(--secondary))] transition-colors">{t(key)}</button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-border">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={t('chat.placeholder')}
                rows={1}
                className="resize-none min-h-[44px] max-h-28"
                data-testid="ai-chat-input"
              />
              <Button size="icon" onClick={() => send()} disabled={loading} data-testid="ai-chat-send-button" className="h-11 w-11 shrink-0"><Send className="h-4 w-4" /></Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">{t('chat.disclaimer')}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
