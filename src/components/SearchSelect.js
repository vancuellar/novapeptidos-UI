import React from 'react';
import { Check } from 'lucide-react';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

/**
 * UN SOLO buscador para todos los desplegables largos del formulario: país de la
 * dirección, lada del teléfono y estado/provincia.
 *
 * Es una sola pieza a propósito (Christian, 2026-07-28): tres buscadores distintos
 * se sienten como tres formularios distintos, y además son tres mantenimientos.
 *
 * ⚠️ REGLA DE ORO (el header SIEMPRE visible): esto va sobre Popover, que NO es
 * modal y por tanto NO le pone el candado de scroll al <body>. Ese candado es lo
 * único que despega la barra superior. Si alguien le pone `modal`, vuelve el bug.
 */

// Sin acentos y en minúsculas: "mexico", "México" y "MEXICO" tienen que encontrar
// lo mismo, y quien teclea con prisa no pone acentos.
export const plano = (s) => (s || '').toString().toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

/**
 * ¿Este renglón responde a lo que se está tecleando?
 *
 * Cuando lo tecleado son PUROS DÍGITOS (o "+52"), se busca por código de marcación
 * y por PREFIJO, no por subcadena: teclear "1" tiene que sacar los países con lada
 * +1 —Estados Unidos y Canadá— y no los treinta que traen un 1 en medio. Con texto
 * se busca por subcadena en todos los nombres que conoce el renglón.
 */
export const coincide = (opcion, consulta) => {
  const q = plano(consulta);
  if (!q) return true;
  if (/^\+?[\d\s]+$/.test(q)) {
    const digitos = q.replace(/\D/g, '');
    if (digitos) return (opcion.code || '').startsWith(digitos);
  }
  return plano(opcion.search || opcion.label).includes(q);
};

/**
 * `options`: [{ value, label, prefix?, code?, search? }]
 *   value  = lo que se guarda ("MX", "Yucatán")
 *   prefix = adorno a la izquierda (la bandera)
 *   code   = código de marcación, para buscar por número
 *   search = todo el texto por el que se puede encontrar (los tres idiomas, el ISO…)
 * `pinned`: valores que van ARRIBA del todo, separados del resto por una línea.
 */
const SearchSelect = ({
  value, onChange, options, pinned = [], trigger, placeholder, emptyText,
  label, testid, ancho = 'w-[--radix-popover-trigger-width]',
}) => {
  const [open, setOpen] = React.useState(false);
  const [consulta, setConsulta] = React.useState('');
  const porValor = React.useMemo(
    () => Object.fromEntries(options.map((o) => [o.value, o])), [options],
  );
  const fijas = React.useMemo(
    () => pinned.map((v) => porValor[v]).filter(Boolean), [pinned, porValor],
  );
  const resto = React.useMemo(
    () => options.filter((o) => !pinned.includes(o.value)), [options, pinned],
  );
  // Cuántas opciones quedan tras filtrar. Se calcula aquí —y no se le pregunta a
  // cmdk— porque se necesita para anunciárselo a un lector de pantalla.
  const cuantas = React.useMemo(
    () => options.filter((o) => coincide(o, consulta)).length, [options, consulta],
  );

  // Al cerrar se limpia lo tecleado: si no, la próxima vez el desplegable abre
  // filtrado por una búsqueda de hace tres pantallas y parece que faltan países.
  const cambiarApertura = (v) => { setOpen(v); if (!v) setConsulta(''); };

  const renglon = (o) => (
    <CommandItem
      key={o.value}
      value={o.value}
      onSelect={() => { onChange(o.value); cambiarApertura(false); }}
      data-testid={testid && `${testid}-option-${o.value}`}
    >
      {o.prefix && <span aria-hidden="true">{o.prefix}</span>}
      <span className="flex-1 truncate">{o.label}</span>
      {o.code && <span className="text-xs text-muted-foreground font-mono-tech">+{o.code}</span>}
      {value === o.value && <Check className="h-4 w-4 text-[hsl(var(--primary))]" />}
    </CommandItem>
  );

  return (
    <Popover open={open} onOpenChange={cambiarApertura}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      {/* `collisionPadding` para que en un celular la lista no se salga de la
          pantalla ni tape el campo donde se escribe: el buscador va arriba del
          todo y la lista siempre debajo. */}
      <PopoverContent className={cn('p-0', ancho)} align="start" sideOffset={6} collisionPadding={12}>
        {/* El filtro se le pasa hecho a cmdk: el suyo es difuso y con "mx" sacaba
            una docena de países que traían una m y una x sueltas. */}
        <Command filter={(v, search) => (porValor[v] && coincide(porValor[v], search) ? 1 : 0)}>
          <CommandInput
            placeholder={placeholder}
            value={consulta}
            onValueChange={setConsulta}
            aria-label={label}
            data-testid={testid && `${testid}-search`}
          />
          {/* Para quien no ve la lista: cuántas opciones quedan tras teclear. */}
          <span className="sr-only" role="status" aria-live="polite">
            {cuantas} · {label}
          </span>
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {fijas.length > 0 && (
              <>
                {/* Los de siempre, a un toque. La línea desaparece sola en cuanto
                    se teclea algo: separar dos grupos que ya se filtraron no
                    ayuda a nadie. */}
                <CommandGroup>{fijas.map(renglon)}</CommandGroup>
                <CommandSeparator />
              </>
            )}
            <CommandGroup>{resto.map(renglon)}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchSelect;
