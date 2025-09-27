import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { LucideIcon } from "lucide-react";

interface ScreenTimeCardProps {
  appName: string;
  timeUsed: number;
  timeLimit: number;
  icon?: LucideIcon;
  category?: string;
}

export function ScreenTimeCard({ appName, timeUsed, timeLimit, icon: Icon, category }: ScreenTimeCardProps) {
  const percentage = Math.min((timeUsed / timeLimit) * 100, 100);
  const isOverLimit = timeUsed > timeLimit;
  const remainingTime = Math.max(timeLimit - timeUsed, 0);
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Card className="hover:shadow-soft transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-base font-semibold">{appName}</CardTitle>
              {category && (
                <Badge variant="secondary" className="text-xs mt-1">
                  {category}
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${isOverLimit ? 'text-destructive' : 'text-foreground'}`}>
              {formatTime(timeUsed)}
            </div>
            <div className="text-xs text-muted-foreground">
              of {formatTime(timeLimit)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <Progress 
            value={percentage} 
            className={`h-2 ${isOverLimit ? '[&>div]:bg-destructive' : '[&>div]:bg-primary'}`}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{isOverLimit ? 'Over limit' : `${formatTime(remainingTime)} remaining`}</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}