import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, ShieldCheck, Ban } from 'lucide-react';
import { BrandMark } from '@/components/BrandLogo';
import { useLanguage } from '@/context/LanguageContext';

// Aviso de uso exclusivo en investigación y de mayoría de edad, la primera vez
// que alguien entra al sitio. Es una puerta de verdad: no se puede cerrar ni
// esquivar, hay que aceptar para seguir. Se recuerda en el navegador, así que
// solo aparece una vez por dispositivo.
const STORAGE_KEY = 'exygen_ruo_ack';

const RuoGate = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);   // navegador sin almacenamiento: se muestra igual
    }
  }, []);

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
    setOpen(false);
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
        <BrandMark className="h-7 mx-auto mb-7" />

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

        <button onClick={accept} data-testid="ruo-gate-accept" className="btn-resend w-full mt-8">
          {t('ruo.gate.accept')}
        </button>

        <p className="text-[11px] text-muted-foreground leading-relaxed text-center mt-4">
          {t('ruo.gate.termsPre')}{' '}
          <Link to="/info/terminos" className="text-[hsl(var(--primary))] hover:underline">{t('auth.terms.service')}</Link>
          {' '}{t('auth.terms.and')}{' '}
          <Link to="/info/privacidad" className="text-[hsl(var(--primary))] hover:underline">{t('auth.terms.privacy')}</Link>.
        </p>

        <a href="https://www.google.com" className="block text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors mt-3" data-testid="ruo-gate-leave">
          {t('ruo.gate.leave')}
        </a>
      </div>
    </div>
  );
};

export default RuoGate;
