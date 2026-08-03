import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, Plus, History, Check, Search, Pencil, Archive } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
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

   Segunda tanda 2026-08-03 (también pedido de Christián):
   · El desplegable ahora es un Popover propio (el DropdownMenu de Radix se
     roba las teclas para su búsqueda-por-letra, y aquí adentro vive un input).
   · Buscador con retardo de 300 ms contra `GET /business/chats/buscar`, con
     su fragmento resaltado, más dos selectores chicos de Año y Mes para ir a
     lo viejo sin recordar palabras.
   · Renombrar (lapicito → PUT /nombre; vacío = título automático de vuelta) y
     Archivar (caja → POST /archivar, con confirmación).
   · Un chat archivado se abre en SOLO lectura: pinta su `md`, sin input, con
     una franja que lo dice y el botón de Nuevo Chat. Si aun así el backend
     recibe un mensaje para uno archivado, contesta 409 y aquí se enseña el
     detalle.
   · La lista va agrupada por fecha: Hoy, Ayer, Esta Semana, Semana Pasada,
     Este Mes, luego el nombre del mes (año en curso) y luego el año. Los
     nombres de mes salen de `toLocaleDateString` en el idioma del usuario.
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

// Primera letra en mayúscula: `toLocaleDateString` da «julio» y el encabezado
// del grupo se pinta «Julio», en el idioma que sea.
const capitalizar = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

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
  // El desplegable de chats y su buscador.
  const [listaAbierta, setListaAbierta] = useState(false);
  const [q, setQ] = useState('');
  const [anio, setAnio] = useState('');
  const [mes, setMes] = useState('');
  const [resultados, setResultados] = useState(null); // null = sin búsqueda activa
  const [tick, setTick] = useState(0); // re-dispara la búsqueda tras renombrar/archivar
  // Chat archivado abierto en modo lectura. Mientras esté puesto, la vista es
  // su `md` y no hay input: se cierra con Nuevo Chat o abriendo otro chat.
  const [lectura, setLectura] = useState(null); // { session_id, titulo, md }
  const scrollRef = useRef(null);

  const esAdmin = user?.role === 'admin';
  const sugerencias = esAdmin ? SUGERENCIAS_ADMIN : SUGERENCIAS_DIST;

  const encabezados = () => {
    const token = localStorage.getItem('np_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // La lista de chats del usuario (ya con los archivados marcados). El servidor
  // la recorta al dueño del token; de aquí también salen el umbral del aviso y
  // el % del chat abierto.
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
  }, [sesion]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (scrollRef.current && mensajes.length) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensajes]);

  // El buscador. Espera 300 ms desde la última tecla para no bombardear al
  // backend; con todo vacío apaga la búsqueda y vuelve la lista agrupada.
  const busquedaActiva = !!(q.trim() || anio || mes);
  useEffect(() => {
    if (!busquedaActiva) { setResultados(null); return undefined; }
    const timer = setTimeout(() => {
      const p = new URLSearchParams();
      if (q.trim()) p.set('q', q.trim());
      if (anio) p.set('anio', anio);
      if (mes) p.set('mes', mes);
      fetch(`${API}/business/chats/buscar?${p.toString()}`, { headers: encabezados() })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data && Array.isArray(data.chats)) setResultados(data.chats);
        })
        .catch(() => {});
    }, 300);
    return () => clearTimeout(timer);
  }, [q, anio, mes, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  const nuevoChat = () => {
    if (cargando) return;
    const id = idNuevo();
    localStorage.setItem(LLAVE_SESION, id);
    setLectura(null);
    setSesion(id);
    setContextoPct(0);
    setTexto('');
  };

  // Un chat archivado no vuelve a ser la sesión activa: se pinta su `md` tal
  // cual, encima de la conversación normal, sin tocar localStorage.
  const abrirArchivado = (chat) => {
    setListaAbierta(false);
    setLectura({ session_id: chat.session_id, titulo: chat.titulo || '', md: '' });
    fetch(`${API}/business/chats/${encodeURIComponent(chat.session_id)}/md`, { headers: encabezados() })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setLectura({
            session_id: chat.session_id,
            titulo: d.titulo || chat.titulo || '',
            md: d.md || '',
          });
        }
      })
      .catch(() => {});
  };

  const abrirChat = (chat) => {
    if (cargando) return;
    setListaAbierta(false);
    if (chat.archivado) { abrirArchivado(chat); return; }
    setLectura(null);
    if (chat.session_id === sesion) return;
    localStorage.setItem(LLAVE_SESION, chat.session_id);
    setSesion(chat.session_id);
    setContextoPct(Number.isFinite(chat.contexto_pct) ? chat.contexto_pct : 0);
    setTexto('');
  };

  // El lapicito. `prompt` y no un input incrustado: es un renglón de código en
  // vez de treinta, y aquí lo que importa es que el nombre llegue al backend.
  // Vacío = el backend regresa al título derivado del primer mensaje.
  const renombrar = (chat) => {
    const nuevo = window.prompt(t('negocio.chat.renombrarPregunta'), chat.titulo || '');
    if (nuevo === null) return;
    fetch(`${API}/business/chats/${encodeURIComponent(chat.session_id)}/nombre`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...encabezados() },
      body: JSON.stringify({ titulo: nuevo.trim() }),
    })
      .then(() => {
        cargarChats(sesion);
        if (busquedaActiva) setTick((n) => n + 1);
      })
      .catch(() => {});
  };

  const archivar = (chat) => {
    if (!window.confirm(t('negocio.chat.archivarConfirma'))) return;
    fetch(`${API}/business/chats/${encodeURIComponent(chat.session_id)}/archivar`, {
      method: 'POST',
      headers: encabezados(),
    })
      .then((r) => {
        if (!r.ok) return;
        cargarChats(sesion);
        if (busquedaActiva) setTick((n) => n + 1);
        // Si se archivó el chat que está abierto, pasa a modo lectura ahí mismo.
        if (chat.session_id === sesion && !lectura) {
          abrirArchivado({ ...chat, archivado: true });
        }
      })
      .catch(() => {});
  };

  const enviar = async (crudo) => {
    const mensaje = (crudo || texto).trim();
    if (!mensaje || cargando || lectura) return;
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
      // 409 = el chat está archivado (lo pudo archivar otra pestaña). Se enseña
      // el detalle del backend y se refresca la lista; no es un error de red.
      if (res.status === 409) {
        let detalle = '';
        try { detalle = (await res.json())?.detail || ''; } catch (e) { /* sin cuerpo */ }
        const aviso = detalle || t('negocio.chat.errorArchivado');
        setMensajes((p) => {
          const copia = [...p];
          copia[copia.length - 1] = { role: 'assistant', content: aviso };
          return copia;
        });
        cargarChats(sesion);
        return;
      }
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

  // A qué encabezado pertenece un chat según su última actividad. Las semanas
  // arrancan en lunes; los meses y años salen del calendario, no de "hace N
  // días", para que «Julio» sea julio y no una ventana movediza.
  const grupoDe = (iso, ahora) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(t('negocio.chat.grupo.esteMes'));
    const hoy0 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const dia0 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dias = Math.round((hoy0 - dia0) / 86400000);
    if (dias <= 0) return t('negocio.chat.grupo.hoy');
    if (dias === 1) return t('negocio.chat.grupo.ayer');
    const lunes = new Date(hoy0);
    lunes.setDate(hoy0.getDate() - ((hoy0.getDay() + 6) % 7));
    if (dia0 >= lunes) return t('negocio.chat.grupo.estaSemana');
    const lunesPasado = new Date(lunes);
    lunesPasado.setDate(lunes.getDate() - 7);
    if (dia0 >= lunesPasado) return t('negocio.chat.grupo.semanaPasada');
    if (d.getFullYear() === ahora.getFullYear()) {
      if (d.getMonth() === ahora.getMonth()) return t('negocio.chat.grupo.esteMes');
      return capitalizar(d.toLocaleDateString(language, { month: 'long' }));
    }
    return String(d.getFullYear());
  };

  // Lista agrupada: los vivos por fecha, los archivados en su cajón al final.
  const { grupos, archivados } = useMemo(() => {
    const ahora = new Date();
    const vivos = chats.filter((c) => !c.archivado)
      .slice()
      .sort((a, b) => new Date(b.last_at || 0) - new Date(a.last_at || 0));
    const gs = [];
    vivos.forEach((c) => {
      const g = grupoDe(c.last_at, ahora);
      if (!gs.length || gs[gs.length - 1].titulo !== g) gs.push({ titulo: g, chats: [] });
      gs[gs.length - 1].chats.push(c);
    });
    const arch = chats.filter((c) => c.archivado)
      .slice()
      .sort((a, b) => new Date(b.last_at || 0) - new Date(a.last_at || 0));
    return { grupos: gs, archivados: arch };
  }, [chats, language]); // eslint-disable-line react-hooks/exhaustive-deps

  // Los años del selector: los que aparecen en los chats, más el actual.
  const anios = useMemo(() => {
    const s = new Set([new Date().getFullYear()]);
    chats.forEach((c) => {
      const y = new Date(c.last_at || 0).getFullYear();
      if (y > 2000) s.add(y);
    });
    return [...s].sort((a, b) => b - a);
  }, [chats]);

  const nombreDeMes = (m) =>
    capitalizar(new Date(2026, m - 1, 1).toLocaleDateString(language, { month: 'long' }));

  // El fragmento del resultado con la coincidencia resaltada. Sin
  // dangerouslySetInnerHTML: se parte el texto y el pedazo va en un <mark>.
  const conResalte = (snippet, consulta) => {
    const txt = snippet || '';
    const busq = (consulta || '').trim();
    if (!busq) return txt;
    const idx = txt.toLowerCase().indexOf(busq.toLowerCase());
    if (idx === -1) return txt;
    return (
      <>
        {txt.slice(0, idx)}
        <mark className="rounded bg-[hsl(var(--primary))]/20 px-0.5 font-medium text-inherit">
          {txt.slice(idx, idx + busq.length)}
        </mark>
        {txt.slice(idx + busq.length)}
      </>
    );
  };

  // Un renglón de la lista (vivo o archivado): abre al picarlo, con su
  // lapicito para renombrar y su caja para archivar. En los archivados sólo
  // queda abrir: renombrar o re-archivar uno de solo lectura no tiene caso.
  const renglonChat = (c) => (
    <div key={c.session_id} className="group flex items-center gap-0.5 px-1.5">
      <button type="button" onClick={() => abrirChat(c)}
        data-testid="chat-negocio-chat-anterior"
        className="flex-1 min-w-0 flex items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-[hsl(var(--muted))] transition-colors">
        <span className="flex-1 min-w-0">
          <span className="flex items-center gap-1.5 min-w-0">
            {c.archivado && (
              <Archive className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <span className="block truncate text-sm">
              {c.titulo || t('negocio.chat.sinTitulo')}
            </span>
          </span>
          <span className="block text-[11px] text-muted-foreground">
            {fechaCorta(c.last_at)}
          </span>
        </span>
        {c.session_id === sesion && !lectura && !c.archivado && (
          <Check className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--primary))]" aria-hidden="true" />
        )}
      </button>
      {!c.archivado && (
        <>
          <button type="button" onClick={() => renombrar(c)}
            data-testid="chat-negocio-renombrar"
            aria-label={t('negocio.chat.renombrar')} title={t('negocio.chat.renombrar')}
            className="h-7 w-7 shrink-0 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))] transition-colors">
            <Pencil className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => archivar(c)}
            data-testid="chat-negocio-archivar"
            aria-label={t('negocio.chat.archivar')} title={t('negocio.chat.archivar')}
            className="h-7 w-7 shrink-0 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))] transition-colors">
            <Archive className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );

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
          {/* Popover en vez de panel lateral: cabe igual en teléfono y no le
              roba ancho a la columna del chat. Se refresca al abrirlo. */}
          <Popover open={listaAbierta}
            onOpenChange={(abierto) => { setListaAbierta(abierto); if (abierto) cargarChats(sesion); }}>
            <PopoverTrigger asChild>
              <button type="button" data-testid="chat-negocio-anteriores"
                aria-label={t('negocio.chat.anteriores')} title={t('negocio.chat.anteriores')}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[hsl(var(--primary))] transition-colors">
                <History className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                <span className="hidden sm:inline">{t('negocio.chat.anteriores')}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 overflow-hidden">
              {/* Buscador + Año y Mes, fijos arriba de la lista. */}
              <div className="p-2 border-b border-border space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                  <input value={q} onChange={(e) => setQ(e.target.value)}
                    data-testid="chat-negocio-buscar"
                    placeholder={t('negocio.chat.buscar')}
                    aria-label={t('negocio.chat.buscar')}
                    className="w-full rounded-full border border-border bg-transparent pl-8 pr-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]" />
                </div>
                <div className="flex gap-2">
                  <select value={anio} onChange={(e) => setAnio(e.target.value)}
                    data-testid="chat-negocio-filtro-anio"
                    aria-label={t('negocio.chat.anio')}
                    className="flex-1 min-w-0 rounded-full border border-border bg-transparent px-2.5 py-1 text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]">
                    <option value="">{t('negocio.chat.anio')}</option>
                    {anios.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <select value={mes} onChange={(e) => setMes(e.target.value)}
                    data-testid="chat-negocio-filtro-mes"
                    aria-label={t('negocio.chat.mes')}
                    className="flex-1 min-w-0 rounded-full border border-border bg-transparent px-2.5 py-1 text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ring))]">
                    <option value="">{t('negocio.chat.mes')}</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{nombreDeMes(m)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto py-1">
                {busquedaActiva ? (
                  /* -------- resultados de la búsqueda, con su fragmento -------- */
                  !resultados || resultados.length === 0 ? (
                    <div className="px-3 py-2.5 text-xs text-muted-foreground">
                      {t('negocio.chat.sinResultados')}
                    </div>
                  ) : (
                    resultados.map((c) => (
                      <button key={c.session_id} type="button" onClick={() => abrirChat(c)}
                        data-testid="chat-negocio-resultado"
                        className="w-full min-w-0 rounded-lg px-3 py-2 mx-0 text-left hover:bg-[hsl(var(--muted))] transition-colors">
                        <span className="flex items-center gap-1.5 min-w-0">
                          {c.archivado && (
                            <Archive className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                          )}
                          <span className="flex-1 truncate text-sm">
                            {c.titulo || t('negocio.chat.sinTitulo')}
                          </span>
                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {fechaCorta(c.last_at)}
                          </span>
                        </span>
                        {c.snippet && (
                          <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                            {conResalte(c.snippet, q)}
                          </span>
                        )}
                        {Number(c.coincidencias) > 1 && (
                          <span className="block text-[10px] text-muted-foreground">
                            {t('negocio.chat.coincidencias', { n: c.coincidencias })}
                          </span>
                        )}
                      </button>
                    ))
                  )
                ) : (
                  /* -------- la lista agrupada por fecha + los archivados -------- */
                  <>
                    {grupos.length === 0 && archivados.length === 0 && (
                      <div className="px-3 py-2.5 text-xs text-muted-foreground">
                        {t('negocio.chat.sinAnteriores')}
                      </div>
                    )}
                    {grupos.map((g) => (
                      <div key={g.titulo}>
                        <div className="px-3.5 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                          data-testid="chat-negocio-grupo">
                          {g.titulo}
                        </div>
                        {g.chats.map(renglonChat)}
                      </div>
                    ))}
                    {archivados.length > 0 && (
                      <div>
                        <div className="mt-1 border-t border-border px-3.5 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5"
                          data-testid="chat-negocio-grupo-archivados">
                          <Archive className="h-3 w-3" aria-hidden="true" />
                          {t('negocio.chat.archivados')}
                        </div>
                        {archivados.map(renglonChat)}
                      </div>
                    )}
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {lectura ? (
        /* ------------- chat archivado: solo lectura, sin input ------------- */
        <>
          <div data-testid="chat-negocio-franja-archivado"
            className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-border bg-[hsl(var(--muted))] px-3 py-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Archive className="h-3.5 w-3.5" aria-hidden="true" />
              {t('negocio.chat.archivadoBanner')}
            </span>
            <button type="button" onClick={nuevoChat}
              className="shrink-0 font-medium underline underline-offset-2 hover:no-underline">
              {t('negocio.chat.nuevo')}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-5 text-sm leading-relaxed"
            data-testid="chat-negocio-lectura">
            {lectura.titulo && (
              <h4 className="font-heading font-semibold mb-4">{lectura.titulo}</h4>
            )}
            {/* El `md` se PINTA con el mismo renderizador seguro del chat:
                nada de HTML crudo (ver RespuestaIA.js). */}
            {lectura.md ? <RespuestaIA texto={lectura.md} /> : '…'}
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
