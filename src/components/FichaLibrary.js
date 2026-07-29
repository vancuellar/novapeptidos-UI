import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, Lock, Loader2, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { toast } from 'sonner';

// Fichas técnicas. El acceso lo resuelve el SERVIDOR y aquí nada más se listan:
// a un cliente le devuelve las de los productos que compró, y a un distribuidor
// el catálogo completo, porque vende todo y necesita la ficha antes de que
// exista el pedido. Las fichas NO tienen página pública ni índice navegable.
// `catalogoCompleto` solo cambia el texto — no da ni quita acceso.
const FichaLibrary = ({ locked = false, catalogoCompleto = false }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (locked) { setLoading(false); return; }
    api.get('/me/fichas')
      .then((r) => setRows(Array.isArray(r.data) ? r.data : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [locked]);

  const download = async (slug) => {
    setDownloading(slug);
    try {
      const res = await api.get(`/me/ficha/${encodeURIComponent(slug)}`, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `Ficha-Tecnica-${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error('No pudimos abrir esa ficha. Escríbenos y te la mandamos.');
    } finally {
      setDownloading('');
    }
  };

  const titulo = (slug) => (slug || '')
    .split('-')
    .map((w) => (w.length > 3 ? w.charAt(0).toUpperCase() + w.slice(1) : w.toUpperCase()))
    .join(' ');

  // Con el catálogo completo son ~75 tarjetas: sin buscador no se encuentra nada.
  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((f) => titulo(f.product_slug).toLowerCase().includes(q)
      || (f.product_slug || '').toLowerCase().includes(q));
  }, [rows, busqueda]);

  if (locked) {
    return (
      <Card className="p-6 text-center">
        <Lock className="h-8 w-8 mx-auto text-muted-foreground" />
        <h3 className="font-heading font-semibold mt-3">Tus fichas técnicas aparecen aquí</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          La ficha técnica de cada compuesto trae su identidad química completa: número CAS, fórmula,
          peso molecular, secuencia cuando aplica, y las fuentes de cada dato. No se publican en el
          sitio: se entregan con la compra.
        </p>
        <Link to="/catalogo"><Button className="mt-4" size="sm">Ver catálogo</Button></Link>
      </Card>
    );
  }

  if (loading) {
    return <div className="flex items-center gap-2 text-sm text-muted-foreground p-4"><Loader2 className="h-4 w-4 animate-spin" /> Cargando fichas…</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {catalogoCompleto
          ? <>Estas son las fichas técnicas de <b>todo el catálogo</b>, para que puedas mandárselas a
              tu cliente antes de que haga el pedido. Cada una trae la identidad química con la fuente
              de cada dato, la reconstitución calculada para nuestras presentaciones y cómo se maneja
              el material en laboratorio.</>
          : <>Estas son las fichas técnicas de los compuestos que compraste. Cada una trae la identidad
              química con la fuente de cada dato, y cómo se maneja el material en laboratorio.</>}
      </p>

      {rows.length > 8 && (
        <div className="relative max-w-sm">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar compuesto…" value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} data-testid="ficha-buscar" />
        </div>
      )}

      {rows.length === 0 ? (
        <Card className="p-6 text-center">
          <BookOpen className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Todavía no hay fichas disponibles para los productos de tus pedidos. Escríbenos a
            hola@exygenlabs.com y te las mandamos directo.
          </p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {visibles.map((f) => (
            <Card key={f.product_slug} className="p-4 flex items-start gap-3" data-testid="ficha-row">
              <span className="h-9 w-9 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center shrink-0">
                <BookOpen className="h-4 w-4 text-[hsl(var(--primary))]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm">{titulo(f.product_slug)}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Ficha técnica · PDF</div>
                <Button size="sm" variant="outline" className="mt-2.5" disabled={downloading === f.product_slug}
                  onClick={() => download(f.product_slug)} data-testid="ficha-download">
                  {downloading === f.product_slug
                    ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Abriendo…</>
                    : <><Download className="h-3.5 w-3.5 mr-1.5" /> Descargar PDF</>}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {rows.length > 0 && visibles.length === 0 && (
        <p className="text-sm text-muted-foreground py-2">
          Ningún compuesto se llama así. Prueba con parte del nombre.
        </p>
      )}

      <p className="text-xs text-muted-foreground leading-relaxed">
        {catalogoCompleto
          ? <>La ficha describe el compuesto y su manejo en laboratorio. Los valores analíticos de cada
              lote viven en su certificado de análisis, que viaja con la compra y es el único documento
              que puede acreditarlos.</>
          : <>La ficha describe el compuesto y su manejo en laboratorio. Los valores analíticos del lote
              que recibiste viven en su certificado de análisis, que es el único documento que puede
              acreditarlos.</>}
      </p>
    </div>
  );
};

export default FichaLibrary;
