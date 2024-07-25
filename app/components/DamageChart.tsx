"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", team1: 186, team2: 80 },
  { month: "February", team1: 305, team2: 200 },
  { month: "March", team1: 237, team2: 120 },
  { month: "April", team1: 73, team2: 190 },
  { month: "May", team1: 209, team2: 130 },
  { month: "June", team1: 214, team2: 140 },
];

const chartConfig = {
  team1: {
    label: "Team 1",
    color: "hsl(var(--chart-1))",
  },
  team2: {
    label: "Team 2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DamageChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="team1"
              type="monotone"
              stroke="var(--color-team1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="team2"
              type="monotone"
              stroke="var(--color-team2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
