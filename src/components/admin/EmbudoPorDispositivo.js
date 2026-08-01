// EL EMBUDO PARTIDO POR APARATO — teléfono / tableta / computadora.
//
// ⛔ POR QUÉ EXISTE (Christián, 2026-07-31). El 8.7% de visita→ficha de la semana
// pasada es un PROMEDIO de teléfonos y monitores revueltos, y lo que se cambió
// —adelgazar la portada móvil— sólo se ve en la mitad de teléfono. Sin este corte
// no hay forma honesta de decir si sirvió: el promedio puede subir porque mejoró
// el teléfono o porque esa semana entró más gente de escritorio.
//
// La otra pregunta que contesta: ¿la portada se está viendo a 375 px o a 1,400?
// Hasta hoy eso sólo se deducía de dónde se compran los anuncios, o sea que era
// adivinar.
//
// 🔒 Nada de esto es personal: no hay IP, ni User-Agent, ni huella del visitante.
// Sólo la categoría del aparato y el ancho, agregados.
import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ICONO = { telefono: Smartphone, tableta: Tablet, computadora: Monitor };
const NOMBRE = { telefono: 'Teléfono', tableta: 'Tableta', computadora: 'Computadora' };
const PASOS = {
  visit: 'Visitaron el sitio',
  product_view: 'Vieron un producto',
  add_to_cart: 'Agregaron al carrito',
  checkout_start: 'Empezaron el pago',
  purchase: 'Compraron',
};

export default function EmbudoPorDispositivo({ funnel }) {
  const filas = (funnel?.por_dispositivo || []).filter((f) => f.visitas > 0);
  const anchos = (funnel?.anchos || []).filter((a) => a.sesiones > 0);
  const sinDato = funnel?.sin_dispositivo || 0;
  const conDato = filas.reduce((s, f) => s + f.visitas, 0);

  // Todavía no hay ni una sesión con aparato: se dice por qué, en vez de pintar
  // un tablero vacío que parece un error.
  if (!filas.length) {
    return (
      <Card className="p-5" data-testid="embudo-dispositivo-vacio">
        <h4 className="font-heading font-semibold mb-1">Por dispositivo</h4>
        <p className="text-sm text-muted-foreground">
          Todavía no hay visitas con dispositivo medido. Se empezó a registrar el 31 de
          julio de 2026, así que este corte se llena solo conforme entre gente nueva.
          {sinDato > 0 && ` Las ${sinDato} sesiones de antes no lo traen y no se inventan.`}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-5" data-testid="embudo-dispositivo">
      <div>
        <h4 className="font-heading font-semibold">Por dispositivo</h4>
        <p className="text-xs text-muted-foreground">
          El mismo embudo, partido según con qué entraron. «Visita → ficha» es el número
          a comparar: sumando todo, la semana pasada fue 8.7%.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filas.map((f) => {
          const Icono = ICONO[f.dispositivo] || Monitor;
          const share = conDato ? Math.round((f.visitas / conDato) * 100) : 0;
          return (
            <Card key={f.dispositivo} className="p-4" data-testid={`dispositivo-${f.dispositivo}`}>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icono className="h-4 w-4" aria-hidden="true" />
                {NOMBRE[f.dispositivo] || f.dispositivo}
              </div>
              <div className="font-heading text-xl font-bold mt-1">
                {f.visitas} <span className="text-sm font-normal text-muted-foreground">visitas ({share}%)</span>
              </div>
              <div className="text-sm mt-2">
                Visita → ficha: <strong>{f.visita_a_ficha}%</strong>
              </div>
              <div className="text-xs text-muted-foreground">
                Visita → compra: {f.conversion}%
              </div>
            </Card>
          );
        })}
      </div>

      {/* Los pasos, aparato por aparato. Se enseña el número crudo al lado del
          porcentaje: 1 de 4 y 250 de 1,000 son el mismo 25% y no valen lo mismo. */}
      <div className="space-y-4">
        {filas.map((f) => (
          <div key={f.dispositivo}>
            <div className="text-sm font-medium mb-2">{NOMBRE[f.dispositivo] || f.dispositivo}</div>
            <div className="space-y-2">
              {f.embudo.map((p, i) => {
                const top = f.embudo[0]?.sesiones || 1;
                const prev = i > 0 ? f.embudo[i - 1].sesiones : null;
                const caida = prev && prev > 0 ? Math.round((1 - p.sesiones / prev) * 100) : null;
                return (
                  <div key={p.paso}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{PASOS[p.paso] || p.paso}</span>
                      <span className="text-muted-foreground">
                        {p.sesiones}
                        {caida !== null && caida > 0 && (
                          <span className="text-[hsl(var(--destructive))] ml-2">−{caida}%</span>
                        )}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
                      <div className="h-full rounded-full bg-[hsl(var(--primary))]"
                        style={{ width: `${Math.max(1, Math.round((p.sesiones / top) * 100))}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {anchos.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2">Ancho de pantalla</div>
          <div className="space-y-1">
            {anchos.map((a) => (
              <div key={a.rango} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{a.rango}</span>
                <span>{a.sesiones}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⛔ LA LÍNEA HONESTA. Mientras esto sea grande, el corte de arriba todavía
          no se puede comparar contra el 8.7% de la semana pasada: le falta la
          mayor parte de las sesiones. Decirlo es la diferencia entre un dato y
          una corazonada con gráfica. */}
      {sinDato > 0 && (
        <p className="text-xs text-muted-foreground border-t border-border pt-3" data-testid="dispositivo-sin-dato">
          {sinDato} {sinDato === 1 ? 'sesión' : 'sesiones'} sin dispositivo (son de antes
          del 31 de julio, cuando esto todavía no se medía). No se reparten entre los
          demás para no inventar el dato. Hasta que casi todas traigan dispositivo,
          este corte todavía no se puede comparar contra el 8.7% de la semana pasada.
        </p>
      )}
    </Card>
  );
}
