import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ScreenTimeCard } from "@/components/ScreenTimeCard";
import { TimeChart } from "@/components/TimeChart";
import { QuickActions } from "@/components/QuickActions";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockScreen } from "@/components/LockScreen";
import { useToast } from "@/hooks/use-toast";
import { 
  Instagram, 
  Play, 
  Music, 
  Twitter, 
  Monitor, 
  Headphones,
  Activity,
  TrendingUp,
  Clock,
  Target,
  Users
} from "lucide-react";

export default function Dashboard() {
  const [showLockScreen, setShowLockScreen] = useState(false);
  const { toast } = useToast();

  // Mock data - in real app this would come from device APIs
  const mockApps = [
    { appName: "Instagram", timeUsed: 180, timeLimit: 120, icon: Instagram, category: "Social" },
    { appName: "YouTube", timeUsed: 95, timeLimit: 90, icon: Play, category: "Entertainment" },
    { appName: "TikTok", timeUsed: 75, timeLimit: 60, icon: Music, category: "Social" },
    { appName: "Twitter", timeUsed: 45, timeLimit: 60, icon: Twitter, category: "Social" },
    { appName: "Netflix", timeUsed: 120, timeLimit: 180, icon: Monitor, category: "Entertainment" },
    { appName: "Spotify", timeUsed: 90, timeLimit: 120, icon: Headphones, category: "Music" },
  ];

  const weeklyData = [
    { day: "Mon", screenTime: 6.5 },
    { day: "Tue", screenTime: 5.8 },
    { day: "Wed", screenTime: 7.2 },
    { day: "Thu", screenTime: 4.9 },
    { day: "Fri", screenTime: 8.1 },
    { day: "Sat", screenTime: 9.3 },
    { day: "Sun", screenTime: 6.7 },
  ];

  const categoryData = [
    { name: "Social", value: 4.2, color: "hsl(245, 75%, 55%)" },
    { name: "Entertainment", value: 2.8, color: "hsl(260, 75%, 60%)" },
    { name: "Music", value: 1.5, color: "hsl(160, 85%, 45%)" },
    { name: "Productivity", value: 0.8, color: "hsl(35, 90%, 55%)" },
  ];

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Call",
      description: "Emergency services would be contacted in a real implementation",
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Settings panel would open here",
    });
  };

  const handleDemoLockScreen = () => {
    setShowLockScreen(true);
    toast({
      title: "Demo Lock Screen",
      description: "Showing what users would see when time limits are exceeded",
    });
  };

  if (showLockScreen) {
    return (
      <LockScreen
        appName="Instagram"
        timeRemaining={3600} // 1 hour
        onEmergencyCall={handleEmergencyCall}
        onUnlock={() => setShowLockScreen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <DashboardHeader
          totalScreenTime={485} // 8h 5m
          dailyGoal={360} // 6h
          streakDays={12}
          onSettingsClick={handleSettingsClick}
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            title="Weekly Average"
            value="6.2h"
            change="+12%"
            trend="down"
            icon={TrendingUp}
            description="vs last week"
          />
          <StatsCard
            title="Most Used App"
            value="Instagram"
            change="3.2h today"
            trend="up"
            icon={Activity}
          />
          <StatsCard
            title="Focus Sessions"
            value="8"
            change="+3 today"
            trend="up"
            icon={Target}
            description="completed this week"
          />
          <StatsCard
            title="Screen-Free Time"
            value="4.8h"
            change="+1.2h"
            trend="up"
            icon={Clock}
            description="since last night"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions onDemoLockScreen={handleDemoLockScreen} />

        {/* Charts */}
        <TimeChart data={weeklyData} categoryData={categoryData} />

        {/* App Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">App Usage Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockApps.map((app, index) => (
                <ScreenTimeCard key={index} {...app} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Note */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Activity className="w-4 h-4 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-warning mb-2">Native Implementation Required</h3>
                <p className="text-sm text-muted-foreground">
                  This is a demo interface. For actual device locking, screen time tracking, and emergency calls, 
                  this app would need to be converted to a native mobile app using Capacitor or similar technology 
                  with platform-specific permissions and APIs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}