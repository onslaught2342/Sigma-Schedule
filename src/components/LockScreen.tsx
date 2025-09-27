import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, Clock, Unlock } from "lucide-react";

interface LockScreenProps {
  appName: string;
  timeRemaining: number; // in seconds
  onEmergencyCall: () => void;
  onUnlock?: () => void;
}

export function LockScreen({ appName, timeRemaining, onEmergencyCall, onUnlock }: LockScreenProps) {
  const [timeLeft, setTimeLeft] = useState(timeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((timeRemaining - timeLeft) / timeRemaining) * 100;

  return (
    <div className="min-h-screen bg-focus-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-glass-bg backdrop-blur-lg border-glass-border shadow-focus">
        <CardContent className="p-8 text-center space-y-6">
          {/* Lock Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>

          {/* App Locked Message */}
          <div className="space-y-2">
            <Badge variant="destructive" className="mb-2">
              Time Limit Exceeded
            </Badge>
            <h2 className="text-2xl font-bold text-white">
              {appName} is Locked
            </h2>
            <p className="text-white/80">
              You've exceeded your daily time limit for this app
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <Clock className="w-6 h-6 mb-1" />
                <div className="text-lg font-bold">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
            
            <p className="text-white/90 text-sm">
              Time until unlock
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={onEmergencyCall}
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency Call
            </Button>
            
            {onUnlock && (
              <Button
                onClick={onUnlock}
                variant="ghost"
                className="w-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <Unlock className="w-4 h-4 mr-2" />
                Override (Admin)
              </Button>
            )}
          </div>

          {/* Motivational Message */}
          <div className="pt-4 border-t border-white/20">
            <p className="text-white/70 text-sm">
              Take this time to focus on other activities. Your digital wellbeing matters! 🌟
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}