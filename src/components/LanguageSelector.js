import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSelector = () => {
  const { language, languages, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden xl:inline text-xs text-muted-foreground">{t('controls.language')}</span>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="h-8 w-[104px] bg-card" aria-label={t('controls.language')} data-testid="language-selector">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {languages.map((item) => (
            <SelectItem key={item.code} value={item.code}>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true">{item.flag}</span>
                <span>{item.shortLabel}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
