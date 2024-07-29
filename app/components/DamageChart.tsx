"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

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
import { transformDamageData } from "../utils/transformDamageData";

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

export function DamageChartComponent({ data }: { data: number[][] }) {
  console.log(data);
  const chartData = transformDamageData(data);
  console.log(chartData);
  return (
    <Card className="w-[600px] h-96">
      <CardHeader>
        <CardTitle>Team Damage</CardTitle>
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
              tickFormatter={(value) => value.toString().slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
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
    </Card>
  );
}
