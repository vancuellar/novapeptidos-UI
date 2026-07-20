import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Lock, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { toast } from 'sonner';

// Biblioteca de certificados de análisis del cliente. El backend solo devuelve
// los COA de los productos que esta persona compró en pedidos ya pagados: el
// acceso se resuelve del lado del servidor, aquí nada más se listan.
const CoaLibrary = ({ locked = false }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState('');

  useEffect(() => {
    if (locked) { setLoading(false); return; }
    api.get('/me/coas')
      .then((r) => setRows(Array.isArray(r.data) ? r.data : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [locked]);

  const download = async (lot) => {
    setDownloading(lot);
    try {
      const res = await api.get(`/me/coa/${encodeURIComponent(lot)}`, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `COA-${lot}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error('No pudimos abrir ese certificado. Escríbenos y te lo mandamos.');
    } finally {
      setDownloading('');
    }
  };

  if (locked) {
    return (
      <Card className="p-6 text-center">
        <Lock className="h-8 w-8 mx-auto text-muted-foreground" />
        <h3 className="font-heading font-semibold mt-3">Tus certificados aparecen aquí</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          Cada cliente recibe el certificado de análisis del lote que le corresponde según su compra.
          En cuanto se confirme tu primer pedido, el COA de tus productos aparece en esta pestaña.
        </p>
        <Link to="/catalogo"><Button className="mt-4" size="sm">Ver catálogo</Button></Link>
      </Card>
    );
  }

  if (loading) {
    return <div className="flex items-center gap-2 text-sm text-muted-foreground p-4"><Loader2 className="h-4 w-4 animate-spin" /> Cargando certificados…</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Estos son los certificados de análisis de los lotes que corresponden a tus compras. Cada uno
        trae la identidad del compuesto, la pureza por HPLC y la fecha del análisis.
      </p>

      {rows.length === 0 ? (
        <Card className="p-6 text-center">
          <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
            Todavía no hay certificados publicados para los productos de tus pedidos. Escríbenos a
            hola@exygenlabs.com con tu número de lote y te lo mandamos directo.
          </p>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {rows.map((c) => (
            <Card key={c.lot} className="p-4 flex items-start gap-3" data-testid="coa-row">
              <span className="h-9 w-9 rounded-lg bg-[hsl(var(--accent))] flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-[hsl(var(--primary))]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm">{c.product_name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Lote <span className="font-mono-tech">{c.lot}</span>
                  {c.presentation ? ` · ${c.presentation}` : ''}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {c.purity ? `Pureza ${c.purity} · ` : ''}{c.method}
                  {c.analyzed_at ? ` · ${c.analyzed_at}` : ''}
                </div>
                <Button size="sm" variant="outline" className="mt-2.5" disabled={downloading === c.lot}
                  onClick={() => download(c.lot)} data-testid="coa-download">
                  {downloading === c.lot
                    ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Abriendo…</>
                    : <><Download className="h-3.5 w-3.5 mr-1.5" /> Descargar PDF</>}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground leading-relaxed">
        Verifica que el número de lote del certificado coincida con el impreso en tu vial. Si no
        coincide o tu lote no aparece, escríbenos: es justo el tipo de cosa que queremos detectar.
      </p>
    </div>
  );
};

export default CoaLibrary;
