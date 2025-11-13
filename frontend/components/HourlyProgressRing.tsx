import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface HourlyProgressRingProps {
  size?: number;
  showLabel?: boolean;
}

export default function HourlyProgressRing({ size = 120, showLabel = true }: HourlyProgressRingProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const totalSeconds = minutes * 60 + seconds;
      const percentage = (totalSeconds / 3600) * 100;
      
      setProgress(percentage);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, []);

  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center gap-3">
      {showLabel && (
        <div className="text-white/80 text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Hourly Progress
        </div>
      )}
      
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#hourly-gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="hourly-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">
            {formattedTime}
          </div>
          <div className="text-xs text-white/60 mt-1">
            {Math.round(progress)}% of hour
          </div>
        </div>
      </div>

      <div className="text-xs text-white/60">
        {60 - currentTime.getMinutes()} min until next hour
      </div>
    </div>
  );
}
