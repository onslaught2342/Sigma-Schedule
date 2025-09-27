import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface TimeChartProps {
  data: Array<{
    day: string;
    screenTime: number;
  }>;
  categoryData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function TimeChart({ data, categoryData }: TimeChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Screen Time */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Screen Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis 
                dataKey="day" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Bar 
                dataKey="screenTime" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Usage by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="60%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-muted-foreground">{category.name}</span>
                  <span className="font-medium">{category.value}h</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}