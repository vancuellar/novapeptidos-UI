import React, { useState, useRef, useEffect } from 'react';
import {
  X, ArrowUp, Sparkles, Boxes, CreditCard, Truck, MapPin, PackageSearch,
  Headphones, MessageCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { WHATSAPP_URL } from '@/lib/contact';

// El chat de IA vive en su propio servicio (Gemini), separado del backend principal.
const CHAT_API = 'https://chat.exygenlabs.com/api';

// Menú de arranque. Cada botón MANDA UN MENSAJE al chat (no hace llamadas
// extra: es exactamente lo mismo que si el visitante lo escribiera). El único
// que no habla con la IA es WhatsApp, que abre la conversación con el humano.
const OPTIONS = [
  { key: 'explore', Icon: Boxes, ask: 'chat.ask.explore' },
  { key: 'popular', Icon: Sparkles, ask: 'chat.ask.popular' },
  { key: 'prices', Icon: CreditCard, ask: 'chat.ask.prices' },
  { key: 'shipping', Icon: Truck, ask: 'chat.ask.shipping' },
  { key: 'local', Icon: MapPin, ask: 'chat.ask.local' },
  { key: 'track', Icon: PackageSearch, ask: 'chat.ask.track' },
  { key: 'contact', Icon: Headphones, ask: 'chat.ask.contact' },
  { key: 'whatsapp', Icon: MessageCircle, ask: null },
];

// Las píldoras de arriba son un atajo a tres de esas mismas opciones.
const CHIPS = ['explore', 'prices', 'whatsapp'];

// Degradado de marca del avatar y del botón flotante. --brand-glow ya viene
// con comas (225, 68%, 40%), así que sirve tal cual dentro de hsl().
const BRAND_GRADIENT = {
  backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-glow)))',
};

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
  // Arranca VACÍO: la bienvenida no es un mensaje, es un bloque de la interfaz
  // (burbuja + píldoras + cuadrícula). Así se traduce sola al cambiar idioma y
  // desaparece en cuanto la conversación empieza de verdad.
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const sessionId = useRef(getSessionId());

  // Se sigue la conversación hacia abajo, PERO no al abrir: si no, el menú de
  // bienvenida arrancaba a media altura y la burbuja del saludo quedaba cortada.
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const openWhatsApp = () => {
    if (!WHATSAPP_URL) return;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(t('whatsapp.prefill'))}`, '_blank', 'noopener,noreferrer');
  };

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

  const pick = (option) => {
    if (option.key === 'whatsapp') openWhatsApp();
    else send(t(option.ask));
  };

  const welcomeItems = t('chat.welcome.items');
  const start = messages.length === 0;

  return (
    <>
      {/* Launcher: destello de IA, no globo de chat. Así no se confunde con WhatsApp. */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          data-testid="ai-chat-open-button"
          style={BRAND_GRADIENT}
          className="hidden sm:flex fixed bottom-24 right-5 z-50 h-14 w-14 rounded-full text-white shadow-[var(--shadow-md)] items-center justify-center hover:scale-105 transition-transform"
          aria-label={t('chat.open')}
        >
          <Sparkles className="h-6 w-6" strokeWidth={2} />
        </button>
      )}

      {/* Panel. Va en z-[60], por encima del botón flotante de WhatsApp (z-50):
          en pantalla chica el panel ocupa todo y ese botón tapaba el de enviar. */}
      {open && (
        <div className="fixed bottom-0 right-0 sm:bottom-24 sm:right-5 z-[60] w-full sm:w-[400px] h-[100dvh] sm:h-[640px] sm:max-h-[80vh] bg-[hsl(var(--background))] text-foreground sm:rounded-2xl border border-border shadow-[var(--shadow-md)] flex flex-col overflow-hidden">

          {/* ---------------------------------------------------- encabezado */}
          <div className="px-3.5 py-3 border-b border-border bg-[hsl(var(--card))] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div style={BRAND_GRADIENT} className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center shadow-[var(--shadow-sm)]">
                <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-[15px] leading-tight truncate">{t('chat.title')}</div>
                <div className="text-[11px] text-muted-foreground leading-tight truncate">{t('chat.responds')}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {WHATSAPP_URL && (
                <button
                  onClick={openWhatsApp}
                  data-testid="ai-chat-whatsapp-button"
                  aria-label={t('chat.opt.whatsapp')}
                  title={t('chat.opt.whatsapp')}
                  className="h-9 w-9 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <svg viewBox="0 0 32 32" className="h-5 w-5" fill="#fff" aria-hidden="true">
                    <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.56 4.19 1.62 6.02L4 29l8.13-1.58a12.02 12.02 0 0 0 3.9.65h.01C22.68 28.07 28 22.67 28 16.03 28 9.4 22.68 3 16.04 3zm0 21.9h-.01c-1.2 0-2.38-.32-3.4-.93l-.24-.14-4.82.94.96-4.7-.16-.25a9.94 9.94 0 0 1-1.52-5.28c0-5.5 4.48-9.98 9.99-9.98 2.67 0 5.17 1.04 7.06 2.93a9.9 9.9 0 0 1 2.92 7.06c0 5.5-4.48 9.98-9.99 9.98zm5.48-7.48c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                data-testid="ai-chat-close-button"
                aria-label={t('chat.close')}
                title={t('chat.close')}
                className="h-9 w-9 rounded-full border border-border bg-[hsl(var(--secondary))] flex items-center justify-center hover:bg-[hsl(var(--muted))] transition-colors"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------ mensajes */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3" data-testid="ai-chat-messages">

            {start && (
              <>
                {/* Burbuja de bienvenida */}
                <div className="rounded-2xl rounded-bl-md bg-[hsl(var(--card))] border border-border shadow-[var(--shadow-sm)] px-4 py-3.5 text-sm leading-relaxed">
                  <p className="font-semibold">{t('chat.welcome.hi')}</p>
                  <p className="mt-2 text-muted-foreground">{t('chat.welcome.canHelp')}</p>
                  <ul className="mt-1.5 space-y-1">
                    {(Array.isArray(welcomeItems) ? welcomeItems : []).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--primary))]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2.5">{t('chat.welcome.how')}</p>
                </div>

                {/* Píldoras de respuesta rápida */}
                <div className="flex flex-wrap gap-2">
                  {CHIPS.map((key) => {
                    const option = OPTIONS.find((o) => o.key === key);
                    return (
                      <button
                        key={key}
                        onClick={() => pick(option)}
                        data-testid="ai-chat-quick-reply-button"
                        className="text-xs font-medium rounded-full px-3 py-1.5 border border-[hsl(var(--primary))] bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
                      >
                        {t(`chat.opt.${key}`)}
                      </button>
                    );
                  })}
                </div>

                {/* Cuadrícula de opciones */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {OPTIONS.map((opt) => {
                    const Icon = opt.Icon;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => pick(opt)}
                        data-testid="ai-chat-option-button"
                        className="flex items-center gap-2 rounded-xl bg-[hsl(var(--card))] border border-border shadow-[var(--shadow-sm)] px-3 py-3 text-left hover:border-[hsl(var(--primary))] hover:-translate-y-px transition-all"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-[hsl(var(--primary))]" strokeWidth={1.75} aria-hidden="true" />
                        <span className="text-[12.5px] font-semibold leading-tight">{t(`chat.opt.${opt.key}`)}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${m.role === 'user'
                  ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-br-md'
                  : 'bg-[hsl(var(--card))] border border-border shadow-[var(--shadow-sm)] rounded-bl-md'}`}>
                  {m.content || (loading && i === messages.length - 1 ? '…' : '')}
                </div>
              </div>
            ))}
          </div>

          {/* --------------------------------------------------------- envío */}
          <div className="p-3 border-t border-border bg-[hsl(var(--card))]">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={t('chat.placeholder')}
                rows={1}
                data-testid="ai-chat-input"
                className="flex-1 resize-none min-h-[44px] max-h-28 rounded-2xl border border-border bg-[hsl(var(--background))] px-4 py-3 text-sm placeholder:text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                data-testid="ai-chat-send-button"
                aria-label={t('chat.send')}
                title={t('chat.send')}
                style={BRAND_GRADIENT}
                className="h-11 w-11 shrink-0 rounded-full text-white flex items-center justify-center disabled:opacity-50 hover:scale-105 transition-transform"
              >
                <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">{t('chat.disclaimer')}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
