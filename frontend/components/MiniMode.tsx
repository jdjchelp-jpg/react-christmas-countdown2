import { useState, useEffect } from 'react';
import { Calendar, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MiniModeProps {
  selectedYear: number;
  onToggle?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function MiniMode({ selectedYear, onToggle }: MiniModeProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const christmas = new Date(selectedYear || currentYear, 11, 25);
      const difference = christmas.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

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
  }, [selectedYear]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gradient-to-br from-red-500/90 to-green-500/90 backdrop-blur-lg rounded-lg shadow-2xl border border-white/20 overflow-hidden">
        {!isCollapsed ? (
          <div className="p-4 space-y-3 w-72">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm">Christmas {selectedYear}</span>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  onClick={() => setIsCollapsed(true)}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                {onToggle && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-white hover:bg-white/20"
                    onClick={onToggle}
                  >
                    <Maximize2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/20 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="text-xl font-bold text-white">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] text-white/80 uppercase">
                  Days
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="text-xl font-bold text-white">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/80 uppercase">
                  Hours
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="text-xl font-bold text-white">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/80 uppercase">
                  Min
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-2 text-center backdrop-blur-sm">
                <div className="text-xl font-bold text-white">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/80 uppercase">
                  Sec
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-white hover:bg-white/20 ml-auto"
              onClick={() => setIsCollapsed(false)}
            >
              <Maximize2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
