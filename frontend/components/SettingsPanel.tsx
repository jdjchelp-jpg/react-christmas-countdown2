import { Settings, Volume2, Snowflake, Palette, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ColorTheme } from '../lib/themes';
import NotificationSettings from './NotificationSettings';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snowIntensity: number;
  onSnowIntensityChange: (value: number) => void;
  musicVolume: number;
  onMusicVolumeChange: (value: number) => void;
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
  customMusicUrl: string;
  onCustomMusicUrlChange: (url: string) => void;
  notificationsEnabled: boolean;
  onNotificationsEnabledChange: (enabled: boolean) => void;
  customNotificationMessages: {
    oneWeek: string;
    threeDays: string;
    oneDay: string;
  };
  onCustomNotificationMessagesChange: (messages: { oneWeek: string; threeDays: string; oneDay: string }) => void;
}

export default function SettingsPanel({
  open,
  onOpenChange,
  snowIntensity,
  onSnowIntensityChange,
  musicVolume,
  onMusicVolumeChange,
  selectedTheme,
  onThemeChange,
  customMusicUrl,
  onCustomMusicUrlChange,
  notificationsEnabled,
  onNotificationsEnabledChange,
  customNotificationMessages,
  onCustomNotificationMessagesChange,
}: SettingsPanelProps) {
  const { t } = useTranslation();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-background/95 backdrop-blur-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t('settings.title')}
          </SheetTitle>
          <SheetDescription>
            {t('settings.description')}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <LanguageSelector />

          <div className="space-y-3">
            <Label className="flex items-center gap-2" htmlFor="theme-select">
              <Palette className="w-4 h-4" />
              {t('settings.colorTheme')}
            </Label>
            <Select value={selectedTheme} onValueChange={onThemeChange}>
              <SelectTrigger id="theme-select" aria-label={t('settings.colorTheme')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">{t('themes.classic')}</SelectItem>
                <SelectItem value="winter">{t('themes.winter')}</SelectItem>
                <SelectItem value="royal">{t('themes.royal')}</SelectItem>
                <SelectItem value="candy">{t('themes.candy')}</SelectItem>
                <SelectItem value="golden">{t('themes.golden')}</SelectItem>
                <SelectItem value="icy">{t('themes.icy')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2" htmlFor="snow-intensity">
              <Snowflake className="w-4 h-4" />
              {t('settings.snowIntensity')}
            </Label>
            <Slider
              id="snow-intensity"
              value={[snowIntensity]}
              onValueChange={(value) => onSnowIntensityChange(value[0])}
              max={100}
              step={10}
              className="w-full"
              aria-label={t('settings.snowIntensity')}
            />
            <div className="text-sm text-muted-foreground text-right">
              {snowIntensity}%
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2" htmlFor="music-volume">
              <Volume2 className="w-4 h-4" />
              {t('settings.musicVolume')}
            </Label>
            <Slider
              id="music-volume"
              value={[musicVolume]}
              onValueChange={(value) => onMusicVolumeChange(value[0])}
              max={100}
              step={10}
              className="w-full"
              aria-label={t('settings.musicVolume')}
            />
            <div className="text-sm text-muted-foreground text-right">
              {musicVolume}%
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2" htmlFor="custom-music">
              <Music className="w-4 h-4" />
              {t('settings.customMusic')}
            </Label>
            <input
              id="custom-music"
              type="url"
              value={customMusicUrl}
              onChange={(e) => onCustomMusicUrlChange(e.target.value)}
              placeholder={t('settings.customMusicPlaceholder')}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              aria-label={t('settings.customMusic')}
            />
            <p className="text-xs text-muted-foreground">
              {t('settings.customMusicHelp')}
            </p>
          </div>

          <NotificationSettings
            enabled={notificationsEnabled}
            onEnabledChange={onNotificationsEnabledChange}
            customMessages={customNotificationMessages}
            onCustomMessagesChange={onCustomNotificationMessagesChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
