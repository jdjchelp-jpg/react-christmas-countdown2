import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, Sparkles, Users, Zap, Trophy } from "lucide-react";

export default function ElfWorkshop() {
  const [toyCount, setToyCount] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoProduction, setAutoProduction] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (autoProduction > 0) {
      const interval = setInterval(() => {
        setToyCount((prev) => prev + autoProduction * multiplier);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoProduction, multiplier]);

  useEffect(() => {
    const progressValue = ((toyCount % 1000) / 1000) * 100;
    setProgress(progressValue);
  }, [toyCount]);

  const handleClick = () => {
    setToyCount((prev) => prev + clickPower * multiplier);
  };

  const buyUpgrade = (cost: number, type: "power" | "auto" | "multiplier") => {
    if (toyCount >= cost) {
      setToyCount((prev) => prev - cost);
      if (type === "power") {
        setClickPower((prev) => prev + 1);
      } else if (type === "auto") {
        setAutoProduction((prev) => prev + 1);
      } else {
        setMultiplier((prev) => prev + 0.5);
      }
    }
  };

  const getLevel = () => Math.floor(toyCount / 1000) + 1;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
          🎄 Elf Workshop 🎄
        </h2>
        <p className="text-white/80">Click to make toys and upgrade your workshop!</p>

        <div className="bg-gradient-to-br from-red-500/20 to-green-500/20 rounded-lg p-6 backdrop-blur-sm border border-white/20">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {toyCount.toLocaleString()}
          </div>
          <div className="text-white/80 mt-2 flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            Toys Produced - Level {getLevel()}
          </div>
          <div className="mt-3">
            <Progress value={progress} className="h-3 bg-white/10" />
            <div className="text-xs text-white/60 mt-1">
              {toyCount % 1000}/1000 to next level
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={handleClick}
            size="lg"
            className="bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600 text-white text-xl px-8 py-6 hover:scale-105 transition-all shadow-lg"
          >
            <Gift className="w-6 h-6 mr-2" />
            Make Toys!
          </Button>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Production Stats
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 rounded p-3">
            <div className="text-white/60">Click Power</div>
            <div className="text-white font-bold text-lg">{clickPower * multiplier}</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-white/60">Per Second</div>
            <div className="text-white font-bold text-lg">{autoProduction * multiplier}</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-white/60">Auto Elves</div>
            <div className="text-white font-bold text-lg">{autoProduction}</div>
          </div>
          <div className="bg-white/10 rounded p-3">
            <div className="text-white/60">Multiplier</div>
            <div className="text-white font-bold text-lg">{multiplier}x</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-lg p-4 space-y-3 border border-blue-400/20 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">Click Power</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Level {clickPower}</div>
              <div className="text-xs text-white/60">{clickPower * 10} toys</div>
            </div>
          </div>
          <Button
            onClick={() => buyUpgrade(clickPower * 10, "power")}
            disabled={toyCount < clickPower * 10}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 transition-all hover:scale-105"
          >
            Upgrade (+{multiplier}/click)
          </Button>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 rounded-lg p-4 space-y-3 border border-green-400/20 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Auto Elves</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Level {autoProduction}</div>
              <div className="text-xs text-white/60">{(autoProduction + 1) * 50} toys</div>
            </div>
          </div>
          <Button
            onClick={() => buyUpgrade((autoProduction + 1) * 50, "auto")}
            disabled={toyCount < (autoProduction + 1) * 50}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 transition-all hover:scale-105"
          >
            Hire Elf (+{multiplier}/sec)
          </Button>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-lg p-4 space-y-3 border border-purple-400/20 backdrop-blur-sm">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="font-semibold">Multiplier</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">{multiplier}x</div>
              <div className="text-xs text-white/60">{Math.floor(multiplier * 100)} toys</div>
            </div>
          </div>
          <Button
            onClick={() => buyUpgrade(Math.floor(multiplier * 100), "multiplier")}
            disabled={toyCount < Math.floor(multiplier * 100)}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 transition-all hover:scale-105"
          >
            Boost (+0.5x)
          </Button>
        </div>
      </div>

      {autoProduction > 0 && (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
          <div className="text-white/80 text-sm mb-2 flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 animate-bounce" />
            Auto-producing {autoProduction * multiplier} toys per second
            <Gift className="w-4 h-4 animate-bounce" style={{ animationDelay: "0.5s" }} />
          </div>
          <Progress value={((Date.now() / 1000) % 1) * 100} className="h-2 bg-white/10" />
        </div>
      )}
    </div>
  );
}
