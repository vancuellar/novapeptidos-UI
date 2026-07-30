import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// `activeTab` viene de la página (ella sabe cuál es la pestaña por omisión; la URL
// no la trae). Solo se usa para resaltar el encabezado de un grupo cerrado.
// Una entrada del menú. Casi todas son pestañas (`value`), pero una puede ser un
// ENLACE a otra página (`to`): es el caso de Difusión, que vive en el Panel de
// Administración y sólo le sale a quien tiene ese permiso. Se pinta igual que
// una pestaña para que el menú se lea parejo.
const Entrada = ({ item, className }) => {
  const navigate = useNavigate();
  const { icon: Icon, label, to, value } = item;
  if (to) {
    return (
      <button type="button" onClick={() => { navigate(to); alTope(); }}
        data-testid={`dash-link-${value}`}
        className={`inline-flex items-center whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors px-3 py-1.5 ${className}`}>
        <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
      </button>
    );
  }
  return (
    <TabsTrigger value={value} onClick={alTope} className={className}>
      <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
    </TabsTrigger>
  );
};

const DashboardSidebar = ({ items, activeTab }) => {
  const { t } = useLanguage();
  const activo = activeTab;
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
      {/* Móvil: barra horizontal arriba del contenido. Las mismas categorías que
          en escritorio, pero escritas al vuelo entre las pestañas: en el celular
          no hay sitio para encabezados con su propio renglón, y sin ellas trece
          entradas seguidas se leen como una lista de nada.
          El `overflow-x` es de ESTA barra, nunca del body (mata el header). */}
      <TabsList className="lg:hidden h-auto w-full flex flex-row items-stretch justify-start gap-1 bg-transparent p-0 overflow-x-auto mb-4" data-testid="dash-sidebar-movil">
        {secciones.map(({ grupo, hijos }) => (
          <React.Fragment key={grupo || 'libres'}>
            {grupo && (
              <span className="shrink-0 self-center ml-1.5 pl-3 border-l border-border text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {grupo}
              </span>
            )}
            {hijos.map((it) => (
              <Entrada key={it.value} item={it} className="justify-start gap-2 rounded-lg shrink-0" />
            ))}
          </React.Fragment>
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
                // Cerrado es cerrado, aunque adentro viva la pestaña activa (orden
                // expresa de Christián, 2026-07-29). Para no perder el "dónde estoy",
                // el encabezado del grupo cerrado que la contiene se pinta resaltado.
                const cerrado = grupo && !!grupos[grupo];
                const contieneActiva = grupo && hijos.some((h) => h.value === (activo || ''));
                return (
                  <React.Fragment key={grupo || 'libres'}>
                    {grupo && (
                      <button
                        type="button"
                        onClick={() => toggleGrupo(grupo)}
                        aria-expanded={!cerrado}
                        data-testid={`dash-grupo-${grupo}`}
                        className={`flex items-center gap-1 px-2 pb-1 text-[10px] font-medium uppercase tracking-wider transition-colors ${cerrado && contieneActiva ? 'text-[hsl(var(--primary))]' : 'text-muted-foreground/70'} hover:text-foreground ${i ? 'pt-3' : 'pt-1'}`}
                      >
                        {cerrado ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        {grupo}
                      </button>
                    )}
                    {!cerrado && hijos.map((it) => (
                      <Entrada key={it.value} item={it} className="justify-start w-full gap-2.5 rounded-lg py-2" />
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
