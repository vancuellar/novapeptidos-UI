import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

// ---------------------------------------------------------------------------
//  La tarjeta de un número ES el acceso directo a ese número (2026-07-30)
// ---------------------------------------------------------------------------
// Orden de Christián: "las tocas y te llevan". Los tres tableros enseñaban
// cifras muertas —Cobrado, Por Cobrar, Clientes, Mis Ventas— y para ver QUÉ hay
// detrás había que adivinar la pestaña y ponerle el filtro a mano. Ahora la
// tarjeta ENTERA es el botón y aterriza en la lista YA FILTRADA.
//
// Por qué está aquí y no copiada en cada página: son TRES tableros (admin,
// distribuidor y cliente) y el estado de toque tiene que sentirse idéntico en
// los tres. Copiado, en la tercera copia ya no coincide.
//
// Detalles que la hacen sentir de iPhone, y que no son adorno:
//  · Es un <button> de verdad cuando navega: teclado, foco y lector de pantalla
//    salen gratis, sin inventar role/tabIndex a mano.
//  · El chevron es la única pista de que ahí se puede tocar. Sin él, una
//    tarjeta que navega se ve igualita a una que no.
//  · El realce sólo se enciende donde HAY puntero (@media (hover:hover)): en el
//    celular un `hover` se queda PEGADO después de tocar, y la tarjeta se ve
//    encendida para siempre.
//  · `active:` da el hundido del toque, que es lo que confirma el tap en móvil
//    (donde no hay hover que confirme nada).
//  · Sin `onClick` se pinta EXACTAMENTE como antes: una tarjeta que no lleva a
//    ningún lado no debe fingir que sí.

// Las mismas clases de <Card>, escritas aquí porque el elemento cambia de <div>
// a <button> según navegue o no, y Card sólo sabe pintar <div>.
const TARJETA = 'rounded-xl border bg-card text-card-foreground shadow p-4';

// Área táctil cómoda (min-h ≈ 76px, muy por encima de los 44pt de Apple),
// elevación leve al pasar el puntero y hundido al tocar.
const INTERACTIVA = [
  'group w-full text-left cursor-pointer min-h-[76px]',
  'transition duration-200 ease-out motion-reduce:transition-none',
  '[@media(hover:hover)]:hover:-translate-y-0.5',
  '[@media(hover:hover)]:hover:shadow-md',
  '[@media(hover:hover)]:hover:border-[hsl(var(--primary))]/40',
  'active:translate-y-0 active:scale-[0.985] active:bg-[hsl(var(--muted))]/40',
  'motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
].join(' ');

const StatCard = ({
  icon: Icon,
  label,
  value,
  hint,
  onClick,
  valueClass = '',
  className = '',
  testid,
  ariaLabel,
}) => {
  const { t } = useLanguage();
  const navega = typeof onClick === 'function';
  const Elemento = navega ? 'button' : 'div';

  return (
    <Elemento
      {...(navega
        ? {
          type: 'button',
          onClick,
          // El nombre accesible dice las tres cosas: qué es, cuánto es y que
          // esto navega. Sin lo último, un lector de pantalla anuncia "botón
          // Cobrado" y no hay forma de saber a dónde va.
          'aria-label': `${label}: ${value} — ${t('dash.card.open')}`,
        }
        : {})}
      data-testid={testid}
      className={cn(TARJETA, navega && INTERACTIVA, className)}
    >
      {/* ⛔ EL CHEVRON VA EN EL RENGLÓN DE LA CIFRA, no en el del título. Puesto
          arriba le robaba ~22px al título y en un iPhone —donde la tarjeta mide
          unos 163px— "Ticket promedio" salía "Ticket prome…". Abajo no estorba
          (las cifras son cortas) y encima se lee como una fila de iOS: el dato a
          la izquierda, la flechita a la derecha. */}
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span className="truncate">{label}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className={cn('font-heading text-xl font-bold truncate', valueClass)}>{value}</div>
        {navega && (
          <ChevronRight
            aria-hidden="true"
            className="ml-auto h-4 w-4 shrink-0 opacity-40 transition duration-200 motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:opacity-70"
          />
        )}
      </div>
      {hint && <div className="text-[10px] text-muted-foreground mt-0.5">{hint}</div>}
    </Elemento>
  );
};

export default StatCard;
