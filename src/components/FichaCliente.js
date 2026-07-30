import React, { useCallback, useEffect, useState } from 'react';
import { Phone, MapPin, Mail, Ban, UserCheck, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import api, { formatMXN } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import FichaPedido from '@/components/FichaPedido';
import HojaDeGuia from '@/components/HojaDeGuia';

/**
 * LA FICHA DE UN CLIENTE — la misma, se abra desde donde se abra.
 *
 * ⛔ POR QUÉ EXISTE (Christián, 2026-07-30). El nombre de un cliente salía en seis
 * listas distintas —Clientes y Pedidos del admin, la ficha del distribuidor, Mis
 * Clientes, Ventas y Envíos— y cada una enseñaba una cosa distinta; desde varias ni
 * siquiera se podía abrir nada. Ahora TODAS abren este mismo panel. Si mañana hay que
 * añadir un dato a la ficha, se añade una vez.
 *
 * ⛔ EL CANDADO NO VIVE AQUÍ. Quien decide qué se ve es `/clientes/{id}/ficha` en el
 * servidor: el admin recibe todo; el distribuidor recibe SÓLO a sus clientes, SÓLO sus
 * pedidos con él y sin puntos, cupones, notas ni de quién más es referido; un cliente
 * ajeno es 403 aunque teclee el id en la barra de direcciones. Esta pantalla se limita
 * a pintar lo que llegó — por eso pregunta `ficha.scope` en vez de mirar el rol.
 *
 * `clientId` es el id del usuario, o `invitado:<correo>` para quien compró sin cuenta
 * (el caso de Aidee): ésos también tienen ficha, con lo que dejaron en sus pedidos.
 */

const COLORES_DE_ESTADO = {
  pendiente: 'bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border border-[hsl(var(--warning-border))]',
  confirmado: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border border-border',
  enviado: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-border',
  entregado: 'bg-[hsl(var(--success))] text-[hsl(var(--primary-foreground))]',
  cancelado: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-border',
};

const FichaCliente = ({ clientId, open, onClose }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [ficha, setFicha] = useState(null);
  const [error, setError] = useState(null);
  // Un pedido abierto DESDE la ficha: el mismo modal de siempre (clic en el número).
  const [pedidoAbierto, setPedidoAbierto] = useState(null);
  // Y la guía se pone SIN salir del cliente: un toque en el camión de su renglón.
  const [guiaDe, setGuiaDe] = useState(null);

  // Cajas del admin. El distribuidor nunca las recibe del servidor, así que ni se pintan.
  const [cuponForm, setCuponForm] = useState({ pct: 10, days: 30, note: '' });
  const [regalo, setRegalo] = useState({ points: 500, note: '' });
  const [pctPersonal, setPctPersonal] = useState(0);
  const [nota, setNota] = useState('');

  const esAdmin = user?.role === 'admin';
  const fmtFecha = (iso) => (iso ? new Date(iso).toLocaleDateString(language) : '—');

  const cargar = useCallback(async () => {
    if (!clientId) return;
    try {
      const r = await api.get(`/clientes/${encodeURIComponent(clientId)}/ficha`);
      setFicha(r.data);
      setPctPersonal(Math.round((r.data.client?.personal_discount_rate || 0) * 100));
      setNota(r.data.note || '');
    } catch (e) {
      const s = e.response?.status;
      setError(s === 403 ? t('ficha.forbidden') : s === 404 ? t('ficha.notFound') : t('ficha.error'));
    }
  }, [clientId, t]);

  useEffect(() => {
    if (!open || !clientId) return;
    setFicha(null);
    setError(null);
    cargar();
  }, [open, clientId, cargar]);

  const cliente = ficha?.client;
  const esInvitado = !!cliente?.guest;
  const puedeAdministrar = esAdmin && ficha?.scope === 'admin' && !esInvitado;

  const mandarCupon = async () => {
    try {
      const r = await api.post(`/admin/customers/${cliente.id}/coupon`, {
        discount_rate: Math.max(5, Math.min(50, Number(cuponForm.pct) || 10)) / 100,
        expires_days: Math.max(1, Number(cuponForm.days) || 30),
        note: cuponForm.note,
      });
      toast.success(t('admin.ficha.couponSent', { code: r.data.code }));
      cargar();
    } catch (e) { toast.error(e.response?.data?.detail || t('ficha.error')); }
  };

  const regalarPuntos = async () => {
    try {
      const r = await api.post(`/admin/customers/${cliente.id}/gift-points`, {
        points: Math.max(1, Number(regalo.points) || 0), note: regalo.note,
      });
      toast.success(t('admin.ficha.pointsSent', { balance: r.data.points_balance }));
      cargar();
    } catch (e) { toast.error(e.response?.data?.detail || t('ficha.error')); }
  };

  const guardarDescuentoPersonal = async () => {
    try {
      await api.put(`/admin/customers/${cliente.id}/personal-discount`,
        { rate: Math.max(0, Math.min(50, Number(pctPersonal) || 0)) / 100 });
      toast.success(t('admin.ficha.personalDiscountBtn'));
      cargar();
    } catch (e) { toast.error(e.response?.data?.detail || t('ficha.error')); }
  };

  const guardarNota = async () => {
    try {
      await api.put(`/admin/clientes/${encodeURIComponent(cliente.id)}/nota`, { note: nota });
      toast.success(t('admin.ficha.notesSaved'));
    } catch (e) { toast.error(e.response?.data?.detail || t('ficha.error')); }
  };

  const totales = ficha?.totals || {};

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        {/* Ancho tope para que en 375 px quepa sin empujar la página: el desbordamiento
            vive DENTRO del panel, nunca en el body (ahí mataría el encabezado fijo). */}
        <DialogContent className="max-w-lg w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto"
          data-testid="ficha-cliente">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 flex-wrap text-left">
              <span className="min-w-0 break-words">{cliente?.name || t('ficha.title')}</span>
              {esInvitado && (
                <Badge variant="outline" className="text-[10px]" data-testid="ficha-cliente-invitado">
                  {t('distributor.client.guest')}
                </Badge>
              )}
              {cliente?.blocked && (
                <Badge variant="outline" className="text-[10px] text-destructive border-destructive">
                  <Ban className="h-3 w-3 mr-1" />{t('ficha.blocked')}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {error && <p className="text-sm text-destructive" data-testid="ficha-cliente-error">{error}</p>}
          {!ficha && !error && <Skeleton className="h-64 rounded-lg" />}

          {ficha && (
            <div className="space-y-4 text-sm">
              {/* ---------- contacto ---------- */}
              <div className="space-y-1">
                {cliente.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                    <a href={`mailto:${cliente.email}`} className="font-medium break-all hover:underline"
                      data-testid="ficha-cliente-email">{cliente.email}</a>
                  </div>
                )}
                {cliente.phones?.map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <a href={`tel:${p.replace(/\s/g, '')}`} className="font-mono-tech text-xs hover:underline">{p}</a>
                  </div>
                ))}
                {cliente.addresses?.map((a) => (
                  <div key={a} className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                    <span className="text-xs break-words">{a}</span>
                  </div>
                ))}
                {cliente.created_at && (
                  <div className="text-xs text-muted-foreground pt-1">
                    {t('admin.customer.since', { date: fmtFecha(cliente.created_at) })}
                  </div>
                )}
                {/* Sólo el admin sabe de quién es referido: al distribuidor no le toca
                    enterarse de con quién más trabaja la casa. */}
                {cliente.referred_by && (
                  <div className="flex items-center gap-2 text-xs pt-1" data-testid="ficha-cliente-referido">
                    <UserCheck className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{t('ficha.referredBy')}</span>
                    <span className="font-medium">{cliente.referred_by.name}</span>
                    {cliente.referred_by.code && (
                      <span className="font-mono-tech text-muted-foreground">{cliente.referred_by.code}</span>
                    )}
                  </div>
                )}
              </div>

              <Separator />

              {/* ---------- los números ---------- */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="rounded-lg border border-border p-2">
                  <div className="text-[11px] text-muted-foreground">{t('admin.ficha.paid')}</div>
                  <div className="font-semibold" data-testid="ficha-cliente-pagado">{formatMXN(totales.paid_total || 0)}</div>
                </div>
                <div className="rounded-lg border border-border p-2">
                  <div className="text-[11px] text-muted-foreground">{t('admin.stats.receivable')}</div>
                  <div className={`font-semibold${(totales.por_cobrar || 0) > 0 ? ' text-[hsl(var(--warning-foreground))]' : ''}`}
                    data-testid="ficha-cliente-por-cobrar">{formatMXN(totales.por_cobrar || 0)}</div>
                </div>
                <div className="rounded-lg border border-border p-2">
                  <div className="text-[11px] text-muted-foreground">{t('admin.ficha.paidOrders')}</div>
                  <div className="font-semibold">{totales.paid_count || 0}</div>
                </div>
                {ficha.scope === 'distributor' ? (
                  <div className="rounded-lg border border-border p-2">
                    <div className="text-[11px] text-muted-foreground">{t('ficha.myEarnings')}</div>
                    <div className="font-semibold text-[hsl(var(--primary))]" data-testid="ficha-cliente-mi-comision">
                      {formatMXN(totales.my_earnings || 0)}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-border p-2">
                    <div className="text-[11px] text-muted-foreground">{t('admin.ficha.points')}</div>
                    <div className="font-semibold">{cliente.points_balance || 0}</div>
                  </div>
                )}
              </div>

              {/* ---------- sus pedidos ---------- */}
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  {ficha.scope === 'distributor' ? t('ficha.ordersWithMe') : t('admin.customer.orders')}
                </div>
                {ficha.orders.length === 0 ? (
                  <div className="text-muted-foreground text-xs">{t('admin.customer.noOrders')}</div>
                ) : ficha.orders.map((o) => (
                  <div key={o.order_number} className="flex items-center justify-between gap-2 py-1.5 border-b border-border last:border-0">
                    <div className="min-w-0">
                      {/* El número abre el MISMO modal de detalle de pedido de siempre. */}
                      <button type="button" onClick={() => setPedidoAbierto(o.order_number)}
                        data-testid="ficha-cliente-abrir-pedido"
                        className="font-mono-tech text-xs underline decoration-dotted underline-offset-4 hover:text-[hsl(var(--primary))] transition">
                        {o.order_number}
                      </button>
                      <div className="text-[11px] text-muted-foreground">{fmtFecha(o.created_at)}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                      <Badge className={`${COLORES_DE_ESTADO[o.status]} text-[10px]`}>{t(`status.${o.status}`)}</Badge>
                      {o.pagado === false && (
                        <Badge variant="outline" className="text-[10px] text-[hsl(var(--warning-foreground))] border-[hsl(var(--warning-border))]">
                          {t('admin.pay.unpaid')}
                        </Badge>
                      )}
                      <span className="font-medium text-xs">{formatMXN(o.total)}</span>
                      {o.my_commission != null && (
                        <span className="font-medium text-xs text-[hsl(var(--primary))]">+{formatMXN(o.my_commission)}</span>
                      )}
                      {/* Poner la guía desde aquí mismo. Estando en el cliente, ir a
                          buscar el pedido a otra lista para teclear un número era el
                          camino largo a la única cosa que hay que hacer con él. */}
                      <button type="button" onClick={() => setGuiaDe(o)} title={t('guia.add')}
                        aria-label={t('guia.add')} data-testid="ficha-cliente-guia"
                        className="shrink-0 rounded-md p-1 -m-1 text-muted-foreground hover:text-[hsl(var(--primary))] transition">
                        <Truck className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ---------- de aquí abajo, SÓLO EL ADMIN ---------- */}
              {ficha.scope === 'admin' && ficha.coupons?.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{t('admin.ficha.coupons')}</div>
                  {ficha.coupons.map((cp) => (
                    <div key={cp.code} className="flex items-center justify-between gap-2 text-xs py-1 border-b border-border last:border-0">
                      <span className="font-mono-tech">{cp.code}</span>
                      <span>{Math.round(cp.discount_rate * 100)}%</span>
                      <Badge variant="outline" className="text-[10px]">
                        {cp.used ? t('admin.ficha.couponUsed') : (cp.active ? t('admin.ficha.couponActive') : t('admin.ficha.couponExpired'))}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {ficha.scope === 'admin' && (
                <>
                  <Separator />
                  <div className="rounded-xl border border-border p-3 space-y-2" data-testid="ficha-cliente-nota">
                    <div className="text-xs font-semibold">{t('admin.ficha.notes')}</div>
                    <Textarea rows={3} value={nota} onChange={(e) => setNota(e.target.value)}
                      data-testid="ficha-cliente-nota-texto" />
                    <Button size="sm" onClick={guardarNota} data-testid="ficha-cliente-nota-guardar">
                      {t('admin.ficha.saveNotes')}
                    </Button>
                  </div>
                </>
              )}

              {puedeAdministrar && (
                <>
                  <div className="rounded-xl border border-border p-3 space-y-2" data-testid="ficha-cliente-cupon">
                    <div className="text-xs font-semibold">{t('admin.ficha.sendCoupon')}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Input type="number" min="5" max="50" className="h-8 w-20" value={cuponForm.pct}
                        onChange={(e) => setCuponForm((f) => ({ ...f, pct: e.target.value }))} />
                      <span className="text-xs text-muted-foreground">% ·</span>
                      <Input type="number" min="1" className="h-8 w-20" value={cuponForm.days}
                        onChange={(e) => setCuponForm((f) => ({ ...f, days: e.target.value }))} />
                      <span className="text-xs text-muted-foreground">{t('admin.ficha.days')}</span>
                    </div>
                    <Input className="h-8" placeholder={t('admin.ficha.noteOptional')} value={cuponForm.note}
                      onChange={(e) => setCuponForm((f) => ({ ...f, note: e.target.value }))} />
                    <Button size="sm" onClick={mandarCupon} data-testid="ficha-cliente-cupon-enviar">
                      {t('admin.ficha.sendCouponBtn')}
                    </Button>
                  </div>

                  <div className="rounded-xl border border-border p-3 space-y-2" data-testid="ficha-cliente-descuento">
                    <div className="text-xs font-semibold">{t('admin.ficha.personalDiscount')}</div>
                    <p className="text-[11px] text-muted-foreground">{t('admin.ficha.personalDiscountHint')}</p>
                    <div className="flex items-center gap-2">
                      <Input type="number" min="0" max="50" className="h-8 w-20" value={pctPersonal}
                        onChange={(e) => setPctPersonal(e.target.value)} />
                      <span className="text-xs text-muted-foreground">%</span>
                      <Button size="sm" onClick={guardarDescuentoPersonal} data-testid="ficha-cliente-descuento-guardar">
                        {t('admin.ficha.personalDiscountBtn')}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-3 space-y-2" data-testid="ficha-cliente-puntos">
                    <div className="text-xs font-semibold">{t('admin.ficha.giftPoints')}</div>
                    <div className="flex items-center gap-2">
                      <Input type="number" min="1" className="h-8 w-28" value={regalo.points}
                        onChange={(e) => setRegalo((f) => ({ ...f, points: e.target.value }))} />
                      <Input className="h-8 flex-1" placeholder={t('admin.ficha.noteOptional')} value={regalo.note}
                        onChange={(e) => setRegalo((f) => ({ ...f, note: e.target.value }))} />
                    </div>
                    <Button size="sm" onClick={regalarPuntos} data-testid="ficha-cliente-puntos-regalar">
                      {t('admin.ficha.giftPointsBtn')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* El detalle del pedido, con la ruta que le toca a quien mira. */}
      <FichaPedido orderNumber={pedidoAbierto} open={!!pedidoAbierto} admin={esAdmin}
        onClose={() => setPedidoAbierto(null)} />
      <HojaDeGuia pedido={guiaDe} open={!!guiaDe} onClose={() => setGuiaDe(null)}
        onGuardada={cargar} />
    </>
  );
};

export default FichaCliente;
