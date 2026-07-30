import React, { useEffect, useRef, useState } from 'react';
import { Truck, Check, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { PAQUETERIAS, detectarPaqueteria } from '@/lib/paqueteria';

/**
 * PONER LA GUÍA DE UN PEDIDO — una sola hoja para toda la plataforma.
 *
 * ⛔ POR QUÉ (Christián, 2026-07-30). Capturar una guía vivía en dos formularios
 * distintos (uno en el Panel, otro en el del distribuidor) y sólo se llegaba a ellos
 * desde UNA lista cada uno. Si estabas viendo al cliente, o el pedido, o el aviso de la
 * campanita, no había forma: había que salir a buscar la lista correcta. Ahora este
 * mismo componente se abre desde todos esos lugares.
 *
 * Se siente como iOS a propósito: una hoja que sube desde abajo, el cursor ya puesto en
 * el número —que es lo único que la persona tiene en el portapapeles—, y la paquetería
 * ADIVINADA del propio número (ver `lib/paqueteria.js`), corregible con un toque.
 *
 * ⛔ EL CANDADO NO VIVE AQUÍ. Guarda por la ruta que le toca a quien mira: el admin por
 * la suya, el distribuidor por la suya, que ya exige que el pedido traiga SU código y
 * contesta 403 si no. No se inventó ninguna ruta nueva.
 *
 * `pedido`: { id?, order_number, carrier, tracking_number, tracking_url, eta? }.
 * El `id` sólo hace falta para el admin; el distribuidor guarda por número de pedido.
 */
const HojaDeGuia = ({ pedido, open, onClose, onGuardada, children }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const esAdmin = user?.role === 'admin';
  const campoNumero = useRef(null);

  const [numero, setNumero] = useState('');
  const [paqueteria, setPaqueteria] = useState('');
  const [liga, setLiga] = useState('');
  const [eta, setEta] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [listo, setListo] = useState(false);
  // Qué adivinamos y si estamos seguros. `tocada` se prende en cuanto la persona elige
  // a mano: a partir de ahí NO se le vuelve a mover la paquetería aunque siga tecleando.
  const [sugerencia, setSugerencia] = useState(null);
  const [tocada, setTocada] = useState(false);

  useEffect(() => {
    if (!open || !pedido) return;
    setNumero(pedido.tracking_number || '');
    setPaqueteria(pedido.carrier || '');
    setLiga(pedido.tracking_url || '');
    setEta(pedido.eta || '');
    setSugerencia(null);
    setTocada(!!pedido.carrier);
    setListo(false);
    // El cursor donde va a escribir: el número es lo único que trae en el portapapeles.
    const id = setTimeout(() => campoNumero.current?.focus(), 120);
    return () => clearTimeout(id);
  }, [open, pedido]);

  const alEscribirNumero = (valor) => {
    setNumero(valor);
    const d = detectarPaqueteria(valor);
    setSugerencia(d);
    // Sólo se pone sola mientras nadie la haya elegido a mano.
    if (d && !tocada) setPaqueteria(d.quien);
  };

  const guardar = async () => {
    if (!numero.trim()) { toast.error(t('guia.needNumber')); campoNumero.current?.focus(); return; }
    if (!paqueteria) { toast.error(t('guia.needCarrier')); return; }
    const cuerpo = {
      carrier: paqueteria,
      tracking_number: numero.trim(),
      tracking_url: liga.trim(),
      ...(esAdmin ? { eta: eta.trim() } : {}),
    };
    setGuardando(true);
    try {
      if (esAdmin) {
        if (!pedido.id) throw new Error('sin id');
        await api.put(`/admin/orders/${pedido.id}/shipping`, cuerpo);
      } else {
        await api.put(`/distributor/orders/${pedido.order_number}/shipping`, cuerpo);
      }
      // Confirmación sutil: la palomita se queda un momento antes de cerrar.
      setListo(true);
      toast.success(t('guia.saved'));
      onGuardada && onGuardada({ ...pedido, ...cuerpo });
      setTimeout(() => { setListo(false); onClose(); }, 650);
    } catch (e) {
      toast.error(e.response?.data?.detail || t('guia.error'));
    } finally { setGuardando(false); }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      {/* Hoja desde abajo, como en iOS. En pantalla grande se queda centrada y angosta;
          el desbordamiento vive DENTRO de la hoja, nunca en el body. */}
      <SheetContent side="bottom"
        className="rounded-t-2xl max-h-[90vh] overflow-y-auto sm:max-w-md sm:mx-auto"
        data-testid="hoja-de-guia">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-[hsl(var(--primary))]" /> {t('guia.title')}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-1">
          <div className="text-xs text-muted-foreground font-mono-tech">{pedido?.order_number}</div>

          {children}

          <div>
            <Label className="text-sm mb-1.5 block">{t('guia.number')}</Label>
            <Input ref={campoNumero} value={numero} inputMode="text" autoComplete="off"
              placeholder={t('guia.numberPlaceholder')} data-testid="guia-numero"
              onChange={(e) => alEscribirNumero(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') guardar(); }} />
            {/* Lo que adivinamos, dicho en voz baja. Si no estamos seguros se pide
                confirmar en vez de afirmar: una paquetería equivocada manda al cliente
                a rastrear su paquete al sitio de otra empresa. */}
            {sugerencia && !tocada && (
              <p className="text-[11px] mt-1 flex items-center gap-1 text-[hsl(var(--primary))]"
                data-testid="guia-detectada">
                <Sparkles className="h-3 w-3" />
                {sugerencia.seguro
                  ? t('guia.detected', { carrier: sugerencia.quien })
                  : t('guia.detectedMaybe', { carrier: sugerencia.quien })}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm mb-1.5 block">{t('guia.carrier')}</Label>
            <Select value={paqueteria} onValueChange={(v) => { setPaqueteria(v); setTocada(true); }}>
              <SelectTrigger data-testid="guia-paqueteria">
                <SelectValue placeholder={t('guia.carrierPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {PAQUETERIAS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm mb-1.5 block">{t('guia.url')}</Label>
            <Input value={liga} placeholder="https://…" data-testid="guia-liga" autoComplete="off"
              onChange={(e) => setLiga(e.target.value)} />
            <p className="text-[11px] text-muted-foreground mt-1">{t('guia.autoUrl')}</p>
          </div>

          {esAdmin && (
            <div>
              <Label className="text-sm mb-1.5 block">{t('guia.eta')}</Label>
              <Input value={eta} placeholder={t('guia.etaPlaceholder')} data-testid="guia-eta"
                onChange={(e) => setEta(e.target.value)} />
            </div>
          )}

          <p className="text-[11px] text-muted-foreground">{t('guia.mailNote')}</p>

          <div className="flex gap-2 pb-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>{t('common.cancel')}</Button>
            <Button className="flex-1" onClick={guardar} disabled={guardando || listo} data-testid="guia-guardar">
              {listo ? <><Check className="h-4 w-4 mr-1.5" /> {t('guia.done')}</> : t('guia.save')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HojaDeGuia;
