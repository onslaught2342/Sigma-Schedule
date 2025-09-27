import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Shield, 
  Clock, 
  Smartphone, 
  Bell, 
  Focus, 
  Users, 
  HelpCircle,
  Trash2,
  Download,
  Upload
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Settings state
  const [settings, setSettings] = useState({
    appBlocking: true,
    breakReminders: true,
    focusMode: false,
    bedtimeMode: false,
    weekendMode: false,
    emergencyBypass: true,
    parentalControls: false,
    dailyGoal: [6], // hours
    breakInterval: [60], // minutes
    bedtime: "22:00",
    wakeTime: "07:00",
    focusDuration: [25], // minutes
    notifications: true,
    soundAlerts: true,
    vibration: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been updated`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Your settings and usage data have been exported to Downloads",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Data Import",
      description: "File picker would open to import settings",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-focus-gradient bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground">Customize your Sigma Schedule experience</p>
          </div>
        </div>

        {/* App Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              App Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">App Blocking</h3>
                <p className="text-sm text-muted-foreground">Lock apps when time limits are exceeded</p>
              </div>
              <Switch 
                checked={settings.appBlocking}
                onCheckedChange={(checked) => handleSettingChange('appBlocking', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Emergency Bypass</h3>
                <p className="text-sm text-muted-foreground">Allow emergency calls during lock screen</p>
              </div>
              <Switch 
                checked={settings.emergencyBypass}
                onCheckedChange={(checked) => handleSettingChange('emergencyBypass', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Parental Controls</h3>
                <p className="text-sm text-muted-foreground">Enhanced restrictions and monitoring</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Premium</Badge>
                <Switch 
                  checked={settings.parentalControls}
                  onCheckedChange={(checked) => handleSettingChange('parentalControls', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Time Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Daily Screen Time Goal</h3>
                  <p className="text-sm text-muted-foreground">{settings.dailyGoal[0]} hours per day</p>
                </div>
              </div>
              <Slider
                value={settings.dailyGoal}
                onValueChange={(value) => handleSettingChange('dailyGoal', value)}
                max={12}
                min={1}
                step={0.5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Break Reminder Interval</h3>
                  <p className="text-sm text-muted-foreground">Every {settings.breakInterval[0]} minutes</p>
                </div>
              </div>
              <Slider
                value={settings.breakInterval}
                onValueChange={(value) => handleSettingChange('breakInterval', value)}
                max={120}
                min={15}
                step={15}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Bedtime</label>
                <Select value={settings.bedtime} onValueChange={(value) => handleSettingChange('bedtime', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="21:30">9:30 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="22:30">10:30 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Wake Time</label>
                <Select value={settings.wakeTime} onValueChange={(value) => handleSettingChange('wakeTime', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="06:30">6:30 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="07:30">7:30 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Focus & Wellness */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Focus className="w-5 h-5" />
              Focus & Wellness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Focus Mode</h3>
                <p className="text-sm text-muted-foreground">Block distracting apps during work sessions</p>
              </div>
              <Switch 
                checked={settings.focusMode}
                onCheckedChange={(checked) => handleSettingChange('focusMode', checked)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">Focus Session Duration</h3>
                  <p className="text-sm text-muted-foreground">{settings.focusDuration[0]} minutes</p>
                </div>
              </div>
              <Slider
                value={settings.focusDuration}
                onValueChange={(value) => handleSettingChange('focusDuration', value)}
                max={90}
                min={15}
                step={5}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Bedtime Mode</h3>
                <p className="text-sm text-muted-foreground">Reduce blue light and limit apps before bed</p>
              </div>
              <Switch 
                checked={settings.bedtimeMode}
                onCheckedChange={(checked) => handleSettingChange('bedtimeMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Weekend Mode</h3>
                <p className="text-sm text-muted-foreground">Relaxed limits on weekends</p>
              </div>
              <Switch 
                checked={settings.weekendMode}
                onCheckedChange={(checked) => handleSettingChange('weekendMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">App alerts and reminders</p>
              </div>
              <Switch 
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Break Reminders</h3>
                <p className="text-sm text-muted-foreground">Gentle nudges to take breaks</p>
              </div>
              <Switch 
                checked={settings.breakReminders}
                onCheckedChange={(checked) => handleSettingChange('breakReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sound Alerts</h3>
                <p className="text-sm text-muted-foreground">Audio notifications</p>
              </div>
              <Switch 
                checked={settings.soundAlerts}
                onCheckedChange={(checked) => handleSettingChange('soundAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Vibration</h3>
                <p className="text-sm text-muted-foreground">Haptic feedback</p>
              </div>
              <Switch 
                checked={settings.vibration}
                onCheckedChange={(checked) => handleSettingChange('vibration', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">Choose your preferred appearance</p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button onClick={handleExportData} variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
              <Button onClick={handleImportData} variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import Data
              </Button>
              <Button onClick={handleResetSettings} variant="destructive" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Reset Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm">FAQ</Button>
            <Button variant="outline" size="sm">Contact</Button>
            <Button variant="outline" size="sm">Privacy</Button>
            <Button variant="outline" size="sm">About</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}