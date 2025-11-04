import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';
import type { ColorTheme } from '../lib/themes';
import { themes } from '../lib/themes';

interface CountdownTimerProps {
  selectedYear: number;
  onChristmas: (isChristmas: boolean) => void;
  theme: ColorTheme;
  onYearChange?: (year: number) => void;
  isMobile?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ selectedYear, onChristmas, theme, onYearChange, isMobile }: CountdownTimerProps) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [targetYear, setTargetYear] = useState(selectedYear);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();
      const christmasThisYear = new Date(currentYear, 11, 25);
      const christmasNextYear = new Date(currentYear + 1, 11, 25);
      
      let christmas: Date;
      
      if (selectedYear) {
        christmas = new Date(selectedYear, 11, 25);
        
        if (currentMonth === 11 && currentDay === 26 && selectedYear === currentYear) {
          const newYear = currentYear + 1;
          setTargetYear(newYear);
          if (onYearChange) {
            onYearChange(newYear);
          }
          christmas = new Date(newYear, 11, 25);
        }
      } else {
        if (now > christmasThisYear) {
          christmas = christmasNextYear;
          setTargetYear(currentYear + 1);
        } else {
          christmas = christmasThisYear;
          setTargetYear(currentYear);
        }
      }
      
      const difference = christmas.getTime() - now.getTime();

      if (difference <= 0) {
        onChristmas(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      onChristmas(false);

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedYear, onChristmas, onYearChange]);

  const themeColors = themes[theme];

  return (
    <div className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-2xl'}`}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold text-white drop-shadow-lg`}>
            Christmas {selectedYear || targetYear}
          </h2>
        </div>
        <p className={`text-white/90 flex items-center justify-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
          <Clock className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          {t('countdown.yearProgress')}
        </p>
      </div>

      <div className={`grid grid-cols-2 ${isMobile ? 'gap-2' : 'md:grid-cols-4 gap-4'}`}>
        {Object.entries(timeLeft).map(([key, value], index) => (
          <Card
            key={key}
            className={`${themeColors.card} backdrop-blur-md border-white/20 shadow-xl hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`${isMobile ? 'p-3' : 'p-6'} text-center`}>
              <div className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold mb-2 ${themeColors.text} drop-shadow-lg`}>
                {value.toString().padStart(2, '0')}
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} text-white/80 uppercase tracking-wider font-semibold`}>
                {t(`countdown.${key}`)}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <div className="mt-8 text-center animate-in fade-in zoom-in duration-1000">
          <h3 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            {t('countdown.christmas')}
          </h3>
          <p className="text-xl text-white/90">
            {t('app.footer')}
          </p>
        </div>
      )}
    </div>
  );
}
