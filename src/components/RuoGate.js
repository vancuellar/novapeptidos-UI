import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Ban, ExternalLink } from 'lucide-react';
import { BrandMark } from '@/components/BrandLogo';
import { useLanguage } from '@/context/LanguageContext';

// Aviso de uso exclusivo en investigación y de mayoría de edad, la primera vez
// que alguien entra al sitio. Es una puerta de verdad: no se puede cerrar ni
// esquivar, hay que aceptar para seguir. Se recuerda en el navegador, así que
// solo aparece una vez por dispositivo.
const STORAGE_KEY = 'exygen_ruo_ack';

// No se puede exigir aceptar algo que no se deja leer: en estas rutas el aviso
// NO se muestra, para que Terminos y Privacidad sean legibles aunque nadie haya
// aceptado todavia. Dentro del aviso se enlazan en pestana nueva.
const ALWAYS_READABLE = ['/info/terminos', '/info/privacidad'];
const BASE = process.env.PUBLIC_URL || '';

const RuoGate = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [accepted, setAccepted] = useState(true);   // se asume aceptado hasta comprobar
  const [checked, setChecked] = useState(false);    // la casilla: sin marcar no hay botón

  useEffect(() => {
    try {
      setAccepted(!!localStorage.getItem(STORAGE_KEY));
    } catch {
      setAccepted(false);   // navegador sin almacenamiento: se muestra igual
    }
  }, []);

  const open = !accepted && !ALWAYS_READABLE.includes(pathname);

  // Mientras la puerta está abierta se bloquea el scroll del fondo: si no, se
  // puede leer y navegar el sitio por detrás del aviso.
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, new Date().toISOString()); } catch { /* sin almacenamiento */ }
    setAccepted(true);
  };

  if (!open) return null;

  const points = [
    { icon: FlaskConical, text: t('ruo.gate.point1') },
    { icon: Ban, text: t('ruo.gate.point2') },
    { icon: ShieldCheck, text: t('ruo.gate.point3') },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-background/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ruo-gate-title"
      data-testid="ruo-gate"
    >
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-[var(--shadow-md)] p-7 sm:p-9">
        <BrandMark className="h-8 mx-auto mb-7" noMolecule />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-3 py-1 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--primary))]">
          {t('ruo.gate.badge')}
        </span>

        <h2 id="ruo-gate-title" className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mt-4">
          {t('ruo.gate.title')}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          {t('ruo.gate.intro')}
        </p>

        <ul className="mt-6 space-y-3">
          {points.map(({ icon: Icon, text }) => (
            <li key={text} className="flex gap-3 text-sm leading-relaxed">
              <Icon className="h-4 w-4 mt-0.5 shrink-0 text-[hsl(var(--primary))]" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        {/* Aceptar es un acto, no un clic de paso: la casilla deja constancia
            de que la persona afirmó los tres puntos. */}
        <label className="mt-7 flex items-start gap-3 cursor-pointer rounded-xl border border-border bg-secondary/40 p-4" data-testid="ruo-gate-checkbox">
          <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)}
            className="h-5 w-5 mt-0.5 shrink-0 accent-[hsl(var(--primary))] cursor-pointer" />
          <span className="text-sm leading-relaxed font-medium">{t('ruo.gate.checkbox')}</span>
        </label>

        <button onClick={accept} disabled={!checked} data-testid="ruo-gate-accept"
          className="btn-resend w-full mt-5 disabled:opacity-40 disabled:pointer-events-none">
          {t('ruo.gate.accept')}
        </button>

        {/* En pestana nueva: asi se pueden leer sin perder el aviso ni tener
            que aceptar a ciegas lo que todavia no se ha leido. */}
        <p className="text-[11px] text-muted-foreground leading-relaxed text-center mt-4">
          {t('ruo.gate.termsPre')}{' '}
          <a href={`${BASE}/info/terminos`} target="_blank" rel="noreferrer" data-testid="ruo-gate-terms"
            className="text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-0.5">
            {t('auth.terms.service')}<ExternalLink className="h-2.5 w-2.5" />
          </a>
          {' '}{t('auth.terms.and')}{' '}
          <a href={`${BASE}/info/privacidad`} target="_blank" rel="noreferrer" data-testid="ruo-gate-privacy"
            className="text-[hsl(var(--primary))] hover:underline inline-flex items-center gap-0.5">
            {t('auth.terms.privacy')}<ExternalLink className="h-2.5 w-2.5" />
          </a>.
        </p>

        <a href="https://www.google.com" className="block text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors mt-3" data-testid="ruo-gate-leave">
          {t('ruo.gate.leave')}
        </a>
      </div>
    </div>
  );
};

export default RuoGate;
