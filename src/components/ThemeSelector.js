import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const ThemeLabel = ({ theme, label }) => {
  const Icon = THEME_ICONS[theme];
  return (
    <span className="inline-flex items-center gap-2">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </span>
  );
};

const ThemeSelector = () => {
  const { theme, themes, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden xl:inline text-xs text-muted-foreground">{t('controls.theme')}</span>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="h-8 w-[112px] bg-card" aria-label={t('controls.theme')} data-testid="theme-selector">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {themes.map((item) => (
            <SelectItem key={item} value={item}>
              <ThemeLabel theme={item} label={t(`theme.${item}`)} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
