import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SearchSelect from '@/components/SearchSelect';
import { COUNTRIES, countryOptions, countryName, dialFor, flagEmoji } from '@/data/countries';
import { subdivisionsFor, matchSubdivision } from '@/data/subdivisions';
import { formatPhoneIntl, phoneDigits } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

// Los tres países de los que viene el 99% de los clientes van arriba del todo,
// separados del resto por una línea: a un toque, sin rodar 200 renglones.
const DE_SIEMPRE = ['MX', 'US', 'CA'];

/**
 * Texto por el que se puede encontrar un país. Van los tres idiomas del sitio MÁS
 * el inglés y el código ISO, porque el cliente no sabe —ni tiene por qué— en qué
 * idioma escribimos nosotros la lista: mucha gente teclea "Brazil".
 */
const buscablesDelPais = (iso) => [
  countryName(iso, 'es'), countryName(iso, 'en'), countryName(iso, 'pt'), iso,
].join(' ');

// Los ~200 países en la forma que entiende el buscador compartido.
const useOpcionesDePais = (language) => React.useMemo(() => countryOptions(language).map((o) => ({
  value: o.iso,
  label: o.name,
  prefix: o.flag,
  code: o.dial,
  search: `${o.name} ${buscablesDelPais(o.iso)}`,
})), [language]);

// El mismo botón para los tres desplegables: si se ven distintos, se sienten como
// tres formularios distintos.
const Disparador = React.forwardRef(({ children, className = '', ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={`flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
    <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
  </button>
));
Disparador.displayName = 'Disparador';

// Selector de país con bandera (estilo jadalegal.com). Valor = código ISO ("MX").
export const CountrySelect = ({ value, onChange, testid }) => {
  const { language, t } = useLanguage();
  const opciones = useOpcionesDePais(language);
  const iso = value || 'MX';
  return (
    <SearchSelect
      value={iso}
      onChange={onChange}
      options={opciones}
      pinned={DE_SIEMPRE}
      placeholder={t('country.searchPlaceholder')}
      emptyText={t('country.noMatches')}
      label={t('checkout.country')}
      testid={testid}
      trigger={(
        <Disparador className="mt-1.5 w-full" role="combobox" data-testid={testid}>
          <span className="truncate"><span className="mr-2">{flagEmoji(iso)}</span>{countryName(iso, language)}</span>
        </Disparador>
      )}
    />
  );
};

/**
 * Estado / provincia. Desplegable CON BUSCADOR cuando el país tiene división
 * oficial nuestra (México, EUA, Canadá, Brasil) y texto libre cuando no.
 *
 * Por qué no es texto siempre: "CDMX", "Cd. de México" y "DF" son la misma entidad
 * escrita de tres formas, y así no se puede ni agrupar ni imprimir una guía. Por
 * qué no es lista siempre: para los demás países no tenemos una buena, e inventar
 * una incompleta deja al cliente sin poder escribir su región.
 *
 * Y por qué se escribe además de rodarse: son 32 renglones en México y 51 en EUA;
 * teclear "Nue" y ver Nuevo León es un toque, rodar hasta la N son diez.
 */
export const StateField = ({ country, value, onChange, testid, placeholder }) => {
  const { t } = useLanguage();
  const lista = subdivisionsFor(country);
  const opciones = React.useMemo(
    () => (lista || []).map((s) => ({ value: s, label: s, search: s })), [lista],
  );
  if (!lista) {
    return <Input className="mt-1.5" value={value || ''} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} data-testid={testid} />;
  }
  // Lo que ya estaba escrito ("CDMX") se traduce a la opción de la lista; si no se
  // reconoce, el campo queda vacío a propósito para que elija — mejor eso que
  // mandarle a la paquetería algo que no existe.
  const elegido = lista.includes(value) ? value : matchSubdivision(country, value);
  return (
    <SearchSelect
      value={elegido}
      onChange={onChange}
      options={opciones}
      placeholder={t('checkout.stateSearchPlaceholder')}
      emptyText={t('checkout.stateNoMatches')}
      label={t('checkout.state')}
      testid={testid}
      trigger={(
        <Disparador className="mt-1.5 w-full" role="combobox" data-testid={testid}>
          <span className={`truncate ${elegido ? '' : 'text-muted-foreground'}`}>
            {elegido || t('checkout.statePlaceholder')}
          </span>
        </Disparador>
      )}
    />
  );
};

// Teléfono con lada: selector chico (bandera + +NN) + número.
// `value` = número nacional formateado; `country` = ISO del país de la lada.
export const PhoneField = ({ country, onCountryChange, value, onChange, testid }) => {
  const { language, t } = useLanguage();
  const opciones = useOpcionesDePais(language);
  const iso = country || 'MX';
  return (
    <div className="flex gap-2 mt-1.5">
      <SearchSelect
        value={iso}
        onChange={(c) => { onCountryChange(c); onChange(formatPhoneIntl(value, c)); }}
        options={opciones}
        pinned={DE_SIEMPRE}
        placeholder={t('country.searchPlaceholder')}
        emptyText={t('country.noMatches')}
        label={t('checkout.phone')}
        testid={`${testid}-dial`}
        // La lada es un botón angosto; si la lista copiara su ancho no cabría ni el
        // nombre de un país. Se acota a la pantalla para que en un celular no se salga.
        ancho="w-[min(20rem,calc(100vw-3rem))]"
        trigger={(
          <Disparador className="w-[110px] shrink-0" role="combobox" aria-label="Lada" data-testid={`${testid}-dial`}>
            <span className="truncate">{flagEmoji(iso)} +{dialFor(iso)}</span>
          </Disparador>
        )}
      />
      <Input type="tel" inputMode="numeric" autoComplete="tel-national" className="flex-1"
        placeholder={iso === 'MX' ? '(55) 1234-5678' : ''} value={value}
        onChange={(e) => onChange(formatPhoneIntl(e.target.value, iso))} data-testid={testid} />
    </div>
  );
};

// El teléfono viaja y se guarda como una sola cadena "+52 (55) 1234-5678".
export const composePhone = (iso, national) =>
  phoneDigits(national) ? `+${dialFor(iso)} ${national}`.trim() : '';

// Separa una cadena guardada en {country, national}. Sin prefijo => México.
export const parsePhone = (stored) => {
  const s = (stored || '').trim();
  const m = /^\+(\d{1,3})\s*(.*)$/.exec(s);
  if (!m) return { country: 'MX', national: formatPhoneIntl(s, 'MX') };
  // Busca el país cuya lada coincida (México y EUA/Canadá primero por orden de lista).
  const hit = COUNTRIES.find(([, dial]) => m[1] === dial);
  const iso = hit ? hit[0] : 'MX';
  return { country: iso, national: formatPhoneIntl(m[2], iso) };
};
