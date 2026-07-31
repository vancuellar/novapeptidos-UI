import React, { useCallback, useEffect, useState } from 'react';
import { FileText, Download, Loader2, ShieldCheck, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

// ---------------------------------------------------------------------------
//  ACUERDO DE DISTRIBUIDOR — aceptación electrónica
// ---------------------------------------------------------------------------
//
// ⛔ NACE APAGADO. El servidor manda: mientras `ACUERDO_DISTRIBUIDOR_ACTIVO` no
// valga `true` en el .env del backend, `/acuerdo/distribuidor` contesta
// `requiere_aceptacion: false` y NADA de esto se pinta. Ni una pantalla, ni un
// aviso, ni un botón. La decisión de encender es de Christián, que es el
// abogado, y el texto v2 todavía trae [corchetes] sin resolver.
//
// EL IDIOMA. La interfaz habla los tres idiomas (es/en/pt), pero EL TEXTO LEGAL
// SE QUEDA EN ESPAÑOL y es el que rige: un contrato traducido por una máquina no
// es el mismo contrato, y la cláusula 20 somete el acuerdo a leyes mexicanas.
// En inglés y portugués se pinta una nota al pie diciéndolo, que es justo lo que
// hace válida la lectura en otro idioma sin crear una segunda versión.
//
// LA CASILLA NO VIENE MARCADA, NUNCA. Es el requisito del art. 93 Bis del Código
// de Comercio: el consentimiento tiene que ser un acto del usuario, no un
// descuido. Si alguien "mejora la conversión" premarcándola, se cae la prueba.

/** El estado del acuerdo para el usuario en sesión. `null` mientras carga. */
export function useAcuerdo(activo = true) {
  const [estado, setEstado] = useState(null);

  const recargar = useCallback(() => {
    if (!activo) return Promise.resolve(null);
    return api.get('/acuerdo/distribuidor')
      .then((r) => { setEstado(r.data); return r.data; })
      // Si la ruta no contesta, NO se inventa un bloqueo: el panel se comporta
      // como siempre. Un fallo de red no puede dejar a nadie sin trabajar.
      .catch(() => { setEstado({ requiere_aceptacion: false }); return null; });
  }, [activo]);

  useEffect(() => { recargar(); }, [recargar]);

  // `setEstado` sale para que al aceptar la pantalla se quite en el acto con la
  // respuesta del propio POST, sin un segundo viaje de red.
  return { estado, setEstado, recargar };
}

/**
 * El texto del acuerdo, desplazable. El HTML lo arma el servidor a partir del
 * markdown y viene escapado (no se puede inyectar nada desde el texto legal);
 * aquí sólo se le pone el estilo del sitio, que respeta claro y oscuro porque
 * hereda los colores del tema en vez de fijarlos.
 */
export const TextoDelAcuerdo = ({ html, alto = 'max-h-[46vh]' }) => (
  <div
    data-testid="acuerdo-texto"
    tabIndex={0}
    className={`${alto} overflow-y-auto overscroll-contain rounded-lg border border-border bg-[hsl(var(--muted))]/30 px-4 py-4 sm:px-5
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]
      [&>h1]:font-heading [&>h1]:text-base [&>h1]:font-bold [&>h1]:mb-3
      [&>h2]:font-heading [&>h2]:text-sm [&>h2]:font-semibold [&>h2]:mt-5 [&>h2]:mb-1.5
      [&>p]:text-[13px] [&>p]:leading-relaxed [&>p]:mb-2.5 [&>p]:text-muted-foreground
      [&_strong]:font-semibold [&_strong]:text-foreground
      [&_hr]:my-6 [&_hr]:border-border`}
    dangerouslySetInnerHTML={{ __html: html || '' }}
  />
);

/** Nota al pie que sólo sale en inglés y portugués: manda el español. */
export const NotaDeIdioma = () => {
  const { language, t } = useLanguage();
  if (language === 'es-MX') return null;
  return (
    <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1.5" data-testid="acuerdo-nota-idioma">
      <FileText className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
      {t('acuerdo.legalNote')}
    </p>
  );
};

/** El sello de versión y fecha. Es lo que se firma; se enseña siempre. */
export const SelloDeVersion = ({ estado }) => {
  const { t } = useLanguage();
  if (!estado) return null;
  return (
    <p className="text-[11px] font-mono-tech text-muted-foreground mt-2" data-testid="acuerdo-version">
      {t('acuerdo.versionLine', { version: estado.version, fecha: estado.fecha })}
    </p>
  );
};

/**
 * La casilla. Se recibe controlada desde fuera porque la pantalla de activación
 * la manda junto con la contraseña, en un solo envío.
 *
 * ⛔ `checked` LO PONE EL PADRE Y SIEMPRE ARRANCA EN false. No hay un
 * `defaultChecked` en ningún sitio de este archivo, a propósito.
 */
export const CasillaDeAceptacion = ({ checked, onChange, version, testid = 'acuerdo-casilla' }) => {
  const { t } = useLanguage();
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none mt-4 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        data-testid={testid}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border accent-[hsl(var(--primary))]"
      />
      <span className="leading-relaxed">{t('acuerdo.checkbox', { version })}</span>
    </label>
  );
};

/** Aviso de que el texto todavía es borrador. Sólo se vería si alguien
    encendiera el interruptor antes de que Christián cierre los [corchetes]. */
const AvisoDeBorrador = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-start gap-2 rounded-lg border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] px-3 py-2 text-xs mb-3"
      data-testid="acuerdo-aviso-borrador">
      <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
      {t('acuerdo.draftWarning')}
    </div>
  );
};

/**
 * EL AVISO. Vive arriba del panel mientras no haya firmado y no se va solo.
 *
 * Es la otra mitad del BLOQUEO SUAVE: el distribuidor SÍ puede ver su panel —
 * sus ventas, sus clientes, lo que ya ganó—, pero se le dice con todas las
 * letras qué dejó de funcionar y por qué. Lo que ya ganó es suyo, haya firmado
 * o no; lo que se frena es lo que crea obligaciones NUEVAS.
 */
export const AvisoDeAcuerdoPendiente = ({ estado, onAbrir }) => {
  const { t } = useLanguage();
  if (!estado?.requiere_aceptacion) return null;
  return (
    <div className="mb-5 rounded-xl border border-[hsl(var(--warning-border))] bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] px-4 py-3 flex flex-wrap items-center gap-3"
      data-testid="acuerdo-aviso">
      <TriangleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{t('acuerdo.blockedTitle')}</p>
        <p className="text-xs mt-0.5">{t('acuerdo.blockedBody')}</p>
      </div>
      <Button size="sm" onClick={onAbrir} data-testid="acuerdo-abrir">{t('acuerdo.readAndAccept')}</Button>
    </div>
  );
};

/**
 * LA PANTALLA. Para los distribuidores que YA existían: al entrar a su panel
 * después del encendido, se abre sola encima de todo.
 *
 * ⛔ SE PUEDE CERRAR, A PROPÓSITO. Es un BLOQUEO SUAVE (Christián): ver su
 * panel, sus ventas y sus clientes no depende de firmar — sólo generar códigos,
 * cotizar y devengar comisión nueva. Cerrarla deja arriba el aviso, que no se
 * va hasta que firme. Lo que NO se puede es cerrarla y que se olvide: vuelve a
 * abrirse en cada visita.
 *
 * Por debajo el panel sigue cargado, así que al aceptar desaparece sin recargar.
 */
const PantallaDeAcuerdo = ({ estado, abierta, onCerrar, onAceptado }) => {
  const { t } = useLanguage();
  const [marcada, setMarcada] = useState(false);   // ⛔ nunca premarcada
  const [enviando, setEnviando] = useState(false);

  // Escape cierra: es lo que espera cualquiera de un diálogo, y aquí cerrar no
  // significa aceptar ni saltarse nada — el aviso de arriba se queda.
  useEffect(() => {
    if (!abierta) return undefined;
    const alTeclear = (e) => { if (e.key === 'Escape') onCerrar?.(); };
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [abierta, onCerrar]);

  if (!estado?.requiere_aceptacion || !abierta) return null;

  const aceptar = async () => {
    if (!marcada) { toast.error(t('acuerdo.mustCheck')); return; }
    setEnviando(true);
    try {
      const r = await api.post('/acuerdo/distribuidor/aceptar',
        { acepto: true, version: estado.version });
      toast.success(t('acuerdo.accepted'));
      onAceptado?.(r.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || t('acuerdo.error'));
    } finally { setEnviando(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6"
      role="dialog" aria-modal="true" aria-labelledby="acuerdo-titulo" data-testid="acuerdo-pantalla">
      <Card className="w-full max-w-2xl max-h-[92vh] flex flex-col p-5 sm:p-7 overflow-hidden">
        <div className="flex items-start gap-3 mb-1">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-[hsl(var(--primary))]/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-[hsl(var(--primary))]" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 id="acuerdo-titulo" className="font-heading text-lg font-bold">{t('acuerdo.title')}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {estado.version_anterior ? t('acuerdo.subtitleUpdated') : t('acuerdo.subtitle')}
            </p>
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
          {estado.borrador && <AvisoDeBorrador />}
          <TextoDelAcuerdo html={estado.html} alto="max-h-none" />
        </div>

        <div className="pt-1 shrink-0">
          <NotaDeIdioma />
          <CasillaDeAceptacion checked={marcada} onChange={setMarcada} version={estado.version} />
          <SelloDeVersion estado={estado} />
          <Button size="lg" className="w-full mt-4" onClick={aceptar}
            disabled={!marcada || enviando} data-testid="acuerdo-aceptar">
            {enviando ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t('acuerdo.accepting')}</>)
              : t('acuerdo.accept')}
          </Button>
          {/* Cerrar NO es aceptar: deja el aviso arriba y el panel a la vista. */}
          <Button variant="ghost" size="sm" className="w-full mt-2" onClick={onCerrar}
            disabled={enviando} data-testid="acuerdo-luego">
            {t('acuerdo.later')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

/**
 * El bloque para la pantalla de ACTIVACIÓN. Aquí no hay botón propio: la
 * casilla viaja con la contraseña en el mismo envío, porque activar la cuenta
 * y entrar al canal son el mismo acto.
 *
 * `mostrar` lo decide la pantalla, no el servidor: en la activación todavía NO
 * hay sesión —el usuario ni siquiera tiene contraseña— así que el backend no
 * puede saber que quien va a firmar es distribuidor. Eso lo sabe la invitación
 * (`/auth/invitation/{token}` trae el rol). El servidor lo vuelve a comprobar
 * al recibir la activación: la pantalla no es el candado.
 */
export const AcuerdoEnActivacion = ({ estado, mostrar, marcada, onChange }) => {
  const { t } = useLanguage();
  if (!mostrar || !estado?.activo) return null;
  return (
    <div className="rounded-xl border border-border p-4" data-testid="acuerdo-activacion">
      <div className="flex items-center gap-2 mb-2">
        <ShieldCheck className="h-4 w-4 text-[hsl(var(--primary))]" aria-hidden="true" />
        <span className="text-sm font-semibold">{t('acuerdo.title')}</span>
      </div>
      {estado.borrador && <AvisoDeBorrador />}
      <TextoDelAcuerdo html={estado.html} alto="max-h-[34vh]" />
      <NotaDeIdioma />
      <CasillaDeAceptacion checked={marcada} onChange={onChange} version={estado.version}
        testid="acuerdo-casilla-activacion" />
      <SelloDeVersion estado={estado} />
    </div>
  );
};

/**
 * "Descargar mi copia": el derecho del art. 93 Bis a conservar el texto que se
 * firmó. Baja un HTML autocontenido con el acuerdo íntegro y su acta (quién,
 * cuándo, desde qué IP, sobre qué huella). Se imprime a PDF con Ctrl+P.
 *
 * Se baja como blob y no con un <a href> porque la ruta exige el token de
 * sesión, y una etiqueta <a> no manda cabeceras.
 */
export const DescargarAcuerdo = ({ className = '' }) => {
  const { t } = useLanguage();
  const [bajando, setBajando] = useState(false);

  const bajar = async () => {
    setBajando(true);
    try {
      const res = await api.get('/acuerdo/distribuidor/copia', { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([res.data], { type: 'text/html' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Acuerdo-Distribuidor-Exygen.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error(t('acuerdo.downloadError'));
    } finally { setBajando(false); }
  };

  return (
    <Button variant="outline" onClick={bajar} disabled={bajando}
      className={className} data-testid="acuerdo-descargar">
      {bajando ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
      {t('acuerdo.download')}
    </Button>
  );
};

/**
 * La tarjeta de "Mi Cuenta / Perfil": qué versión aceptó, cuándo, y el botón
 * para bajar su copia. Sólo se pinta si el sistema está encendido y él es del
 * canal — apagado, la pestaña Perfil se ve exactamente igual que hoy.
 */
export const AcuerdoEnPerfil = ({ estado }) => {
  const { language, t } = useLanguage();
  if (!estado?.aplica) return null;
  const ace = estado.aceptacion;
  const fecha = ace?.accepted_at ? new Date(ace.accepted_at).toLocaleString(language) : null;

  return (
    <Card className="p-5" data-testid="acuerdo-perfil">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="h-4 w-4 text-[hsl(var(--primary))]" aria-hidden="true" />
        <h3 className="font-heading font-semibold text-sm">{t('acuerdo.title')}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-1">
        {estado.aceptado && fecha
          ? t('acuerdo.acceptedOn', { version: ace.version, fecha })
          : t('acuerdo.pending')}
      </p>
      <SelloDeVersion estado={estado} />
      <DescargarAcuerdo className="mt-4" />
    </Card>
  );
};

export default PantallaDeAcuerdo;
