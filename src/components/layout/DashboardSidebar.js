import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';

// Sidebar de navegación para los tableros (Mi cuenta, Distribuidor, Admin).
// En escritorio es un panel flotante que sigue el scroll (sticky) y se puede
// colapsar POR COMPLETO: colapsado solo queda el botón para reabrirlo. Las
// categorías (los `grupo`) también se colapsan una por una, y si el panel es
// más alto que la pantalla scrollea POR DENTRO — nunca se toca el overflow del
// body, que es lo que mata al header pegado.
// En móvil se vuelve la barra horizontal de siempre. El estado colapsado se
// comparte entre los tres tableros vía localStorage.

const STORAGE_KEY = 'exygen-dash-sidebar-collapsed';
const STORAGE_GRUPOS = 'exygen-dash-sidebar-grupos';

// Cambiar de pestaña abre ARRIBA. Sin esto te quedas a la altura a la que venías, y
// como cada pestaña mide distinto, entras a media tabla sin saber qué estás viendo.
//
// El `ScrollToTop` general de la app NO cubre este caso a propósito: sólo mira el
// `pathname` y estas pestañas viven en la query (`?tab=stock`). Y así debe seguir — en
// el catálogo la query también cambia al filtrar, y ahí brincar arriba estorba. Por eso
// el arreglo va aquí, en los tableros, y no allá.
//
// Se mueven los tres (`window`, `html`, `body`) por lo mismo que el otro: cuál scrollea
// depende del CSS, y ese CSS ya cambió una vez con la regla del header pegado.
export const alTope = () => {
  window.scrollTo({ top: 0, behavior: 'auto' });
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
};

const leerGrupos = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_GRUPOS) || '{}') || {}; }
  catch { return {}; }
};

const DashboardSidebar = ({ items }) => {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const activo = params.get('tab');
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });
  const [grupos, setGrupos] = useState(leerGrupos);

  const toggle = () => setCollapsed((c) => {
    try { localStorage.setItem(STORAGE_KEY, c ? '0' : '1'); } catch {}
    return !c;
  });

  const toggleGrupo = (nombre) => setGrupos((g) => {
    const sig = { ...g, [nombre]: !g[nombre] };
    try { localStorage.setItem(STORAGE_GRUPOS, JSON.stringify(sig)); } catch {}
    return sig;
  });

  // La lista plana se vuelve secciones: lo que va antes del primer `grupo` no
  // pertenece a ninguno y se enseña siempre.
  const secciones = useMemo(() => {
    const out = [{ grupo: null, hijos: [] }];
    for (const it of items) {
      if (it.grupo) out.push({ grupo: it.grupo, hijos: [] });
      else out[out.length - 1].hijos.push(it);
    }
    return out.filter((s) => s.grupo || s.hijos.length);
  }, [items]);

  const toggleLabel = t(collapsed ? 'dash.expand' : 'dash.collapse');

  return (
    <>
      {/* Móvil: barra horizontal arriba del contenido */}
      <TabsList className="lg:hidden h-auto w-full flex flex-row items-stretch justify-start gap-1 bg-transparent p-0 overflow-x-auto mb-4">
        {items.filter((i) => !i.grupo).map(({ value, icon: Icon, label }) => (
          <TabsTrigger key={value} value={value} onClick={alTope}
            className="justify-start gap-2 rounded-lg shrink-0">
            <Icon className="h-4 w-4" /> {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Escritorio: panel flotante, siempre visible al hacer scroll. Si no cabe en la
          pantalla, scrollea por dentro (max-h + overflow), no la página. */}
      <div className="hidden lg:block sticky top-28 self-start shrink-0" data-testid="dash-sidebar">
        <div className={`rounded-xl border border-border bg-card/85 backdrop-blur shadow-sm transition-all duration-200 max-h-[calc(100vh-8.5rem)] overflow-y-auto overscroll-contain ${collapsed ? 'p-1.5' : 'w-[230px] p-2.5'}`}>
          <button
            type="button"
            onClick={toggle}
            className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={toggleLabel}
            aria-label={toggleLabel}
            aria-expanded={!collapsed}
            data-testid="dash-sidebar-toggle"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
          {!collapsed && (
            <TabsList className="h-auto w-full flex flex-col items-stretch justify-start gap-1 bg-transparent p-0 mt-1">
              {secciones.map(({ grupo, hijos }, i) => {
                // Un grupo cerrado que contiene la pestaña activa se enseña abierto:
                // esconder dónde estás parado confunde más de lo que ordena.
                const cerrado = grupo && grupos[grupo]
                  && !hijos.some((h) => h.value === (activo || ''));
                return (
                  <React.Fragment key={grupo || 'libres'}>
                    {grupo && (
                      <button
                        type="button"
                        onClick={() => toggleGrupo(grupo)}
                        aria-expanded={!cerrado}
                        data-testid={`dash-grupo-${grupo}`}
                        className={`flex items-center gap-1 px-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors ${i ? 'pt-3' : 'pt-1'}`}
                      >
                        {cerrado ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        {grupo}
                      </button>
                    )}
                    {!cerrado && hijos.map(({ value, icon: Icon, label }) => (
                      <TabsTrigger key={value} value={value} onClick={alTope}
                        className="justify-start w-full gap-2.5 rounded-lg py-2">
                        <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
                      </TabsTrigger>
                    ))}
                  </React.Fragment>
                );
              })}
            </TabsList>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
