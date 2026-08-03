import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Plus, History, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import RespuestaIA from '@/components/RespuestaIA';
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

   Rediseño 2026-08-03 (pedido de Christián):
   · Chats múltiples: «Nuevo Chat» estrena sesión y «Chats Anteriores» (un
     desplegable arriba, que también cabe en teléfono) regresa a cualquiera.
     La lista viene de `GET /business/chats`, que ya filtra por usuario.
   · Aviso de memoria: `POST /business/chat` regresa `X-Contexto-Pct` y la
     lista trae `contexto_pct` y `aviso_pct`. Al llegar al umbral sale una
     franja discreta arriba del input; a 100 sube de tono. NUNCA bloquea.
   · Diseño mínimo: columna central angosta, el usuario en burbuja sutil, el
     asesor como texto plano, input en píldora. Sin gradientes ni tarjetas.
--------------------------------------------------------------------------- */

// Preguntas de arranque. Cada chip MANDA UN MENSAJE, exactamente como si se
// escribiera a mano: no hay una segunda ruta ni un atajo con más permisos.
const SUGERENCIAS_DIST = ['quote', 'earn', 'recommend', 'rules'];
const SUGERENCIAS_ADMIN = ['quote', 'margin', 'supplier', 'recommend'];

// La sesión se guarda para que la conversación sobreviva a un cambio de
// pestaña. Va por navegador, no por usuario: el servidor filtra por `user_id`
// de todas formas, así que si otra persona entra en la misma máquina no ve
// nada de la anterior — recibe una conversación vacía.
const LLAVE_SESION = 'exygen_chat_negocio';

const idNuevo = () => 'neg-' + Math.random().toString(36).slice(2) + Date.now();

const idDeSesion = () => {
  let id = localStorage.getItem(LLAVE_SESION);
  if (!id) {
    id = idNuevo();
    localStorage.setItem(LLAVE_SESION, id);
  }
  return id;
};

export default function ChatNegocio() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [sesion, setSesion] = useState(idDeSesion);
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(false);
  // Chats anteriores del usuario y el medidor de memoria del chat abierto.
  const [chats, setChats] = useState([]);
  const [avisoPct, setAvisoPct] = useState(85); // lo manda el backend (aviso_pct)
  const [contextoPct, setContextoPct] = useState(0);
  const scrollRef = useRef(null);

  const esAdmin = user?.role === 'admin';
  const sugerencias = esAdmin ? SUGERENCIAS_ADMIN : SUGERENCIAS_DIST;

  const encabezados = () => {
    const token = localStorage.getItem('np_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // La lista de chats del usuario. El servidor la recorta al dueño del token;
  // de aquí también salen el umbral del aviso y el % del chat abierto.
  const cargarChats = (idActual) => {
    fetch(`${API}/business/chats`, { headers: encabezados() })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || !Array.isArray(data.chats)) return;
        setChats(data.chats);
        if (Number.isFinite(data.aviso_pct)) setAvisoPct(data.aviso_pct);
        const mio = data.chats.find((c) => c.session_id === (idActual || sesion));
        if (mio && Number.isFinite(mio.contexto_pct)) setContextoPct(mio.contexto_pct);
      })
      .catch(() => {});
  };

  useEffect(() => { cargarChats(sesion); /* al montar */ }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // La conversación del chat abierto. Se pide con el token de la sesión y el
  // servidor la recorta a la de este usuario: pedir la de otro devuelve vacío.
  useEffect(() => {
    let vivo = true;
    setMensajes([]);
    fetch(`${API}/business/history/${sesion}`, { headers: encabezados() })
      .then((r) => (r.ok ? r.json() : []))
      .then((filas) => {
        if (vivo && Array.isArray(filas) && filas.length) {
          setMensajes(filas.map((m) => ({ role: m.role, content: m.content })));
        }
      })
      .catch(() => {});
    return () => { vivo = false; };
  }, [sesion]);

  useEffect(() => {
    if (scrollRef.current && mensajes.length) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes]);

  const nuevoChat = () => {
    if (cargando) return;
    const id = idNuevo();
    localStorage.setItem(LLAVE_SESION, id);
    setSesion(id);
    setContextoPct(0);
    setTexto('');
  };

  const abrirChat = (chat) => {
    if (cargando || chat.session_id === sesion) return;
    localStorage.setItem(LLAVE_SESION, chat.session_id);
    setSesion(chat.session_id);
    setContextoPct(Number.isFinite(chat.contexto_pct) ? chat.contexto_pct : 0);
    setTexto('');
  };

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
      const res = await fetch(`${API}/business/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...encabezados() },
        body: JSON.stringify({ session_id: sesion, message: mensaje, language }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      // Cuánta memoria lleva usada este chat. Puede pasar de 100: ahí el
      // modelo ya está soltando los mensajes más viejos.
      const pct = parseInt(res.headers.get('X-Contexto-Pct') || '', 10);
      if (Number.isFinite(pct)) setContextoPct(pct);
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

  const fechaCorta = (iso) => {
    try {
      return new Date(iso).toLocaleDateString(language, { day: 'numeric', month: 'short' });
    } catch (e) { return ''; }
  };

  const vacio = mensajes.length === 0;
  const memoriaAlta = mensajes.length > 0 && contextoPct >= avisoPct;
  const memoriaLlena = contextoPct >= 100;

  return (
    <div data-testid="chat-negocio"
      className="mx-auto w-full max-w-3xl flex flex-col h-[calc(100dvh-240px)] min-h-[460px]">

      {/* Barra de arriba: título discreto, Nuevo Chat y Chats Anteriores. */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-border">
        <h3 className="font-heading font-semibold text-sm truncate">{t('negocio.chat.title')}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={nuevoChat} disabled={cargando}
            data-testid="chat-negocio-nuevo"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--primary))] transition-colors disabled:opacity-50">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            {t('negocio.chat.nuevo')}
          </button>
          {/* Desplegable en vez de panel lateral: cabe igual en teléfono y no
              le roba ancho a la columna del chat. Se refresca al abrirlo. */}
          <DropdownMenu onOpenChange={(abierto) => { if (abierto) cargarChats(sesion); }}>
            <DropdownMenuTrigger asChild>
              <button type="button" data-testid="chat-negocio-anteriores"
                aria-label={t('negocio.chat.anteriores')} title={t('negocio.chat.anteriores')}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--primary))] transition-colors">
                <History className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                <span className="hidden sm:inline">{t('negocio.chat.anteriores')}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 max-h-80 overflow-y-auto">
              {chats.length === 0 && (
                <div className="px-3 py-2.5 text-xs text-muted-foreground">
                  {t('negocio.chat.sinAnteriores')}
                </div>
              )}
              {chats.map((c) => (
                <DropdownMenuItem key={c.session_id} onSelect={() => abrirChat(c)}
                  data-testid="chat-negocio-chat-anterior"
                  className="flex items-center gap-2 cursor-pointer">
                  <span className="flex-1 min-w-0">
                    <span className="block truncate text-sm">
                      {c.titulo || t('negocio.chat.sinTitulo')}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">
                      {fechaCorta(c.last_at)}
                    </span>
                  </span>
                  {c.session_id === sesion && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--primary))]" aria-hidden="true" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* La conversación. El asesor escribe en texto plano sobre el fondo; el
          usuario en una burbuja sutil a la derecha. Nada de tarjetas. */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-5 space-y-5"
        data-testid="chat-negocio-mensajes">
        {vacio ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <p className="font-heading text-xl font-semibold">{t('negocio.chat.hi')}</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
              {esAdmin ? t('negocio.chat.helpAdmin') : t('negocio.chat.helpDist')}
            </p>
            {/* Chips de arranque: texto simple, desaparecen al primer mensaje. */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {sugerencias.map((key) => (
                <button key={key} type="button" onClick={() => enviar(t(`negocio.chat.ask.${key}`))}
                  data-testid="chat-negocio-sugerencia"
                  className="rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-[hsl(var(--primary))] transition-colors">
                  {t(`negocio.chat.ask.${key}`)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          mensajes.map((m, i) => (
            m.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[hsl(var(--muted))] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={i} className="text-sm leading-relaxed">
                {/* Lo del asesor se PINTA (negritas de verdad, viñetas de
                    verdad). Antes salía el Markdown crudo y el distribuidor
                    veía los asteriscos: `**NAD+ 500**`. Ver RespuestaIA.js. */}
                {m.content
                  ? <RespuestaIA texto={m.content} />
                  : (cargando && i === mensajes.length - 1 ? '…' : '')}
              </div>
            )
          ))
        )}
      </div>

      {/* Aviso de memoria: informa, nunca bloquea. El umbral (avisoPct) lo
          manda el backend; a 100 el asesor ya suelta los mensajes viejos. */}
      {memoriaAlta && (
        <div data-testid="chat-negocio-aviso-memoria"
          className={`mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border px-3 py-2 text-xs ${memoriaLlena
            ? 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300'
            : 'border-border bg-[hsl(var(--muted))] text-muted-foreground'}`}>
          <span className="flex-1 min-w-[12rem]">
            {t(memoriaLlena ? 'negocio.chat.memoriaLlena' : 'negocio.chat.memoriaAviso')}
          </span>
          <button type="button" onClick={nuevoChat}
            className="shrink-0 font-medium underline underline-offset-2 hover:no-underline">
            {t('negocio.chat.nuevo')}
          </button>
        </div>
      )}

      {/* Input en píldora, con el botón de enviar adentro. */}
      <div className="relative">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }}
          placeholder={t('negocio.chat.placeholder')}
          rows={1}
          data-testid="chat-negocio-input"
          className="w-full resize-none min-h-[52px] max-h-32 rounded-3xl border border-border bg-[hsl(var(--card))] pl-4 pr-14 py-3.5 text-sm placeholder:text-muted-foreground shadow-[var(--shadow-sm)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent"
        />
        <button
          onClick={() => enviar()}
          disabled={cargando || !texto.trim()}
          data-testid="chat-negocio-enviar"
          aria-label={t('negocio.chat.send')}
          title={t('negocio.chat.send')}
          className="absolute right-2.5 bottom-[13px] h-9 w-9 shrink-0 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] flex items-center justify-center disabled:opacity-40 transition-opacity"
        >
          <ArrowUp className="h-4.5 w-4.5" strokeWidth={2.25} />
        </button>
      </div>
      {/* El aviso no es adorno: el asesor se equivoca, y el precio y la
          comisión que manda la caja son los del servidor, no los de aquí. */}
      <p className="text-[10px] text-muted-foreground mt-2 text-center">
        {t('negocio.chat.disclaimer')}
      </p>
    </div>
  );
}
