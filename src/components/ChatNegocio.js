import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowUp, Calculator, Percent, Target, Boxes, Coins, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { API } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

/* ---------------------------------------------------------------------------
   ASESOR DE NEGOCIO — el chat de IA de adentro del panel
   ---------------------------------------------------------------------------

   NO es el chat del sitio. Aquél (AIChatWidget) le habla a un visitante anónimo,
   vive en un globito flotante y pega contra `chat.exygenlabs.com`. Éste vive
   DENTRO de una pestaña del panel, sólo lo ven admin y distribuidores, y pega
   contra el backend normal con el token de la sesión.

   ⛔ REGLA DE ORO (Christián, 2026-07-30): costos, proveedores, márgenes y ROI
   son exclusivos del admin. EL CANDADO NO ESTÁ AQUÍ Y NO PUEDE ESTAR AQUÍ: este
   archivo se sirve entero en el navegador, así que cualquiera lo puede leer y
   modificar. Quien decide qué datos entran a la conversación es el SERVIDOR,
   según el rol del token (ver `chat_negocio.py` y `POST /business/chat`). Aquí
   sólo cambian las preguntas sugeridas — cosmética, no seguridad.
--------------------------------------------------------------------------- */

const BRAND_GRADIENT = {
  backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--brand-glow)))',
};

// Preguntas de arranque. Cada botón MANDA UN MENSAJE, exactamente como si se
// escribiera a mano: no hay una segunda ruta ni un atajo con más permisos.
const SUGERENCIAS_DIST = [
  { key: 'quote', Icon: Calculator },
  { key: 'earn', Icon: Percent },
  { key: 'recommend', Icon: Target },
  { key: 'rules', Icon: Boxes },
];

const SUGERENCIAS_ADMIN = [
  { key: 'quote', Icon: Calculator },
  { key: 'margin', Icon: Coins },
  { key: 'supplier', Icon: Truck },
  { key: 'recommend', Icon: Target },
];

// La sesión se guarda para que la conversación sobreviva a un cambio de pestaña.
// Va por navegador, no por usuario: el servidor filtra por `user_id` de todas
// formas, así que si otra persona entra en la misma máquina no ve nada de la
// anterior — recibe una conversación vacía.
const idDeSesion = () => {
  let id = localStorage.getItem('exygen_chat_negocio');
  if (!id) {
    id = 'neg-' + Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('exygen_chat_negocio', id);
  }
  return id;
};

export default function ChatNegocio() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(false);
  const scrollRef = useRef(null);
  const sesion = useRef(idDeSesion());

  const esAdmin = user?.role === 'admin';
  const sugerencias = esAdmin ? SUGERENCIAS_ADMIN : SUGERENCIAS_DIST;

  // La conversación de antes. Se pide con el token de la sesión y el servidor la
  // recorta a la de este usuario: pedir la de otro devuelve una lista vacía.
  useEffect(() => {
    let vivo = true;
    const token = localStorage.getItem('np_token');
    fetch(`${API}/business/history/${sesion.current}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((filas) => {
        if (vivo && Array.isArray(filas) && filas.length) {
          setMensajes(filas.map((m) => ({ role: m.role, content: m.content })));
        }
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);

  useEffect(() => {
    if (scrollRef.current && mensajes.length) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviar = async (crudo) => {
    const mensaje = (crudo || texto).trim();
    if (!mensaje || cargando) return;
    setTexto('');
    setMensajes((p) => [...p, { role: 'user', content: mensaje },
      { role: 'assistant', content: '' }]);
    setCargando(true);
    try {
      // Se usa `fetch` y no el `api` de axios porque la respuesta llega en
      // chorrito (streaming) y axios no lo entrega hasta que termina: la
      // respuesta se vería de golpe treinta segundos después.
      const token = localStorage.getItem('np_token');
      const res = await fetch(`${API}/business/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ session_id: sesion.current, message: mensaje, language }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const lector = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await lector.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMensajes((p) => {
          const copia = [...p];
          copia[copia.length - 1] = { role: 'assistant', content: acc };
          return copia;
        });
      }
    } catch (e) {
      setMensajes((p) => {
        const copia = [...p];
        copia[copia.length - 1] = { role: 'assistant', content: t('negocio.chat.error') };
        return copia;
      });
    } finally {
      setCargando(false);
    }
  };

  const vacio = mensajes.length === 0;

  return (
    <div data-testid="chat-negocio">
      <div className="flex items-center gap-2.5 mb-1">
        <div style={BRAND_GRADIENT} className="h-9 w-9 shrink-0 rounded-xl flex items-center justify-center shadow-[var(--shadow-sm)]">
          <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2} />
        </div>
        <h3 className="font-heading font-semibold">{t('negocio.chat.title')}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
        {esAdmin ? t('negocio.chat.subtitleAdmin') : t('negocio.chat.subtitleDist')}
      </p>

      <Card className="flex flex-col overflow-hidden h-[560px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          data-testid="chat-negocio-mensajes">
          {vacio && (
            <>
              <div className="rounded-2xl rounded-bl-md bg-[hsl(var(--card))] border border-border shadow-[var(--shadow-sm)] px-4 py-3.5 text-sm leading-relaxed">
                <p className="font-semibold">{t('negocio.chat.hi')}</p>
                <p className="mt-2 text-muted-foreground">
                  {esAdmin ? t('negocio.chat.helpAdmin') : t('negocio.chat.helpDist')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {sugerencias.map(({ key, Icon }) => (
                  <button key={key} type="button" onClick={() => enviar(t(`negocio.chat.ask.${key}`))}
                    data-testid="chat-negocio-sugerencia"
                    className="flex items-start gap-2 rounded-xl bg-[hsl(var(--card))] border border-border shadow-[var(--shadow-sm)] px-3 py-3 text-left hover:border-[hsl(var(--primary))] hover:-translate-y-px transition-all">
                    <Icon className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--primary))]" strokeWidth={1.75} aria-hidden="true" />
                    <span className="text-[12.5px] font-medium leading-tight">{t(`negocio.chat.ask.${key}`)}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {mensajes.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${m.role === 'user'
                ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-br-md'
                : 'bg-[hsl(var(--card))] border border-border shadow-[var(--shadow-sm)] rounded-bl-md'}`}>
                {m.content || (cargando && i === mensajes.length - 1 ? '…' : '')}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-border bg-[hsl(var(--card))]">
          <div className="flex items-end gap-2">
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }}
              placeholder={t('negocio.chat.placeholder')}
              rows={1}
              data-testid="chat-negocio-input"
              className="flex-1 resize-none min-h-[44px] max-h-28 rounded-2xl border border-border bg-[hsl(var(--background))] px-4 py-3 text-sm placeholder:text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
            />
            <button
              onClick={() => enviar()}
              disabled={cargando}
              data-testid="chat-negocio-enviar"
              aria-label={t('negocio.chat.send')}
              title={t('negocio.chat.send')}
              style={BRAND_GRADIENT}
              className="h-11 w-11 shrink-0 rounded-full text-white flex items-center justify-center disabled:opacity-50 hover:scale-105 transition-transform"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2.25} />
            </button>
          </div>
          {/* El aviso no es adorno: el asistente se equivoca, y el precio y la
              comisión que manda la caja son los del servidor, no los de aquí. */}
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            {t('negocio.chat.disclaimer')}
          </p>
        </div>
      </Card>
    </div>
  );
}
