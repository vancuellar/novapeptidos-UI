import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES, countryOptions, dialFor, flagEmoji } from '@/data/countries';
import { formatPhoneIntl, phoneDigits } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

// Selector de país con bandera (estilo jadalegal.com). Valor = código ISO ("MX").
export const CountrySelect = ({ value, onChange, testid }) => {
  const { language } = useLanguage();
  const opts = React.useMemo(() => countryOptions(language), [language]);
  return (
    <Select value={value || 'MX'} onValueChange={onChange}>
      <SelectTrigger className="mt-1.5" data-testid={testid}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {opts.map((o) => (
          <SelectItem key={o.iso} value={o.iso}>
            <span className="mr-2">{o.flag}</span>{o.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Teléfono con lada: selector chico (bandera + +NN) + número.
// `value` = número nacional formateado; `country` = ISO del país de la lada.
export const PhoneField = ({ country, onCountryChange, value, onChange, testid }) => {
  const { language } = useLanguage();
  const opts = React.useMemo(() => countryOptions(language), [language]);
  const iso = country || 'MX';
  return (
    <div className="flex gap-2 mt-1.5">
      <Select value={iso} onValueChange={(c) => { onCountryChange(c); onChange(formatPhoneIntl(value, c)); }}>
        <SelectTrigger className="w-[110px] shrink-0" data-testid={`${testid}-dial`} aria-label="Lada">
          <span className="truncate">{flagEmoji(iso)} +{dialFor(iso)}</span>
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {opts.map((o) => (
            <SelectItem key={o.iso} value={o.iso}>
              <span className="mr-2">{o.flag}</span>+{o.dial} · {o.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
