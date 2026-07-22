import React, { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';

// Sidebar de navegación para los tableros (Mi cuenta, Distribuidor, Admin).
// En escritorio es un panel flotante que sigue el scroll (sticky) y se puede
// colapsar POR COMPLETO: colapsado solo queda el botón para reabrirlo.
// En móvil se vuelve la barra horizontal de siempre. El estado colapsado se
// comparte entre los tres tableros vía localStorage.

const STORAGE_KEY = 'exygen-dash-sidebar-collapsed';

const DashboardSidebar = ({ items }) => {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
  });

  const toggle = () => setCollapsed((c) => {
    try { localStorage.setItem(STORAGE_KEY, c ? '0' : '1'); } catch {}
    return !c;
  });

  const toggleLabel = t(collapsed ? 'dash.expand' : 'dash.collapse');

  return (
    <>
      {/* Móvil: barra horizontal arriba del contenido */}
      <TabsList className="lg:hidden h-auto w-full flex flex-row items-stretch justify-start gap-1 bg-transparent p-0 overflow-x-auto mb-4">
        {items.map(({ value, icon: Icon, label }) => (
          <TabsTrigger key={value} value={value} className="justify-start gap-2 rounded-lg shrink-0">
            <Icon className="h-4 w-4" /> {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Escritorio: panel flotante, siempre visible al hacer scroll */}
      <div className="hidden lg:block sticky top-28 self-start shrink-0" data-testid="dash-sidebar">
        <div className={`rounded-xl border border-border bg-card/85 backdrop-blur shadow-sm transition-all duration-200 ${collapsed ? 'p-1.5' : 'w-[210px] p-2'}`}>
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
              {items.map(({ value, icon: Icon, label }) => (
                <TabsTrigger key={value} value={value} className="justify-start w-full gap-2 rounded-lg">
                  <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
