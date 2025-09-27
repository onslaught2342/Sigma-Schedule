import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  description?: string;
}

export function StatsCard({ title, value, change, trend, icon: Icon, description }: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendBadge = () => {
    switch (trend) {
      case "up":
        return <Badge className="bg-success/10 text-success border-success/20">↗ {change}</Badge>;
      case "down":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">↘ {change}</Badge>;
      default:
        return <Badge variant="secondary">→ {change}</Badge>;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        <div className="flex items-center pt-2">
          {getTrendBadge()}
        </div>
      </CardContent>
    </Card>
  );
}