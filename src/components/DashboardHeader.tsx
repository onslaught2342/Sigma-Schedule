import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, TrendingUp, Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  totalScreenTime: number; // in minutes
  dailyGoal: number; // in minutes
  streakDays: number;
  onSettingsClick: () => void;
}

export function DashboardHeader({ totalScreenTime, dailyGoal, streakDays, onSettingsClick }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const percentage = Math.min((totalScreenTime / dailyGoal) * 100, 100);
  const isOverLimit = totalScreenTime > dailyGoal;
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = () => {
    if (isOverLimit) return 'text-destructive';
    if (percentage > 80) return 'text-warning';
    return 'text-success';
  };

  const getStatusBadge = () => {
    if (isOverLimit) return <Badge variant="destructive">Over Limit</Badge>;
    if (percentage > 80) return <Badge className="bg-warning text-warning-foreground">Near Limit</Badge>;
    return <Badge className="bg-success text-success-foreground">On Track</Badge>;
  };

  return (
    <Card className="bg-focus-gradient text-white border-0 shadow-focus">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Sigma Schedule</h1>
            <p className="text-white/80">Master your time, maximize your potential</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/settings')}
              className="text-white hover:bg-white/20"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Screen Time */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className={`text-2xl font-bold ${getStatusColor()}`}>
              {formatTime(totalScreenTime)}
            </div>
            <p className="text-white/70 text-sm">Total Today</p>
            <div className="mt-2">
              {getStatusBadge()}
            </div>
          </div>

          {/* Daily Goal */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">
              {formatTime(dailyGoal)}
            </div>
            <p className="text-white/70 text-sm">Daily Goal</p>
            <div className="mt-2">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isOverLimit ? 'bg-destructive' : 'bg-white'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white">
              {streakDays}
            </div>
            <p className="text-white/70 text-sm">Day Streak</p>
            <div className="mt-2">
              <Badge variant="outline" className="border-white/30 text-white">
                🔥 On Fire
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}