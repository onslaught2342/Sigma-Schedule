import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Focus, 
  Timer, 
  Bell, 
  Shield, 
  Smartphone, 
  Coffee,
  Moon,
  Zap
} from "lucide-react";

interface QuickActionsProps {
  onDemoLockScreen: () => void;
}

export function QuickActions({ onDemoLockScreen }: QuickActionsProps) {
  const quickActions = [
    {
      id: 'demo-lock',
      title: 'Demo Lock Screen',
      description: 'See what happens when limits are exceeded',
      icon: Shield,
      variant: 'default' as const,
      className: 'bg-focus-gradient text-white border-0 shadow-focus hover:shadow-lg',
      action: onDemoLockScreen,
      premium: false
    },
    {
      id: 'focus-mode',
      title: 'Start Focus Session',
      description: 'Block distracting apps for 25 minutes',
      icon: Focus,
      variant: 'outline' as const,
      className: '',
      action: () => {},
      premium: false
    },
    {
      id: 'app-limits',
      title: 'Quick App Limits',
      description: 'Set time limits for specific apps',
      icon: Timer,
      variant: 'outline' as const,
      className: '',
      action: () => {},
      premium: false
    },
    {
      id: 'break-reminder',
      title: 'Break Reminder',
      description: 'Schedule regular break notifications',
      icon: Bell,
      variant: 'outline' as const,
      className: '',
      action: () => {},
      premium: false
    },
    {
      id: 'bedtime-mode',
      title: 'Bedtime Mode',
      description: 'Prepare your device for sleep',
      icon: Moon,
      variant: 'outline' as const,
      className: '',
      action: () => {},
      premium: true
    },
    {
      id: 'digital-detox',
      title: 'Digital Detox',
      description: 'Block all non-essential apps for 1 hour',
      icon: Coffee,
      variant: 'outline' as const,
      className: '',
      action: () => {},
      premium: true
    },
    {
      id: 'usage-insights',
      title: 'Usage Insights',
      description: 'Get AI-powered usage recommendations',
      icon: Zap,
      variant: 'outline' as const,
      className: '',
      action: () => {},
      premium: true
    },
    {
      id: 'device-sync',
      title: 'Sync All Devices',
      description: 'Sync settings across all your devices',
      icon: Smartphone,
      variant: 'outline' as const,
      className: '',
      action: () => {},
      premium: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <div key={action.id} className="relative">
              <Button 
                onClick={action.action}
                variant={action.variant}
                className={`w-full h-auto p-4 flex flex-col items-center gap-2 text-center ${action.className}`}
              >
                <action.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-70 mt-1">{action.description}</div>
                </div>
              </Button>
              {action.premium && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 text-xs px-1 py-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                >
                  Pro
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}