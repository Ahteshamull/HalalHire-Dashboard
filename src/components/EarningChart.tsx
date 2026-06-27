"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
import { useGetPaymentGrowthQuery } from "@/redux/api/dashboardApi";
import { useMemo } from "react";

export const description = "A linear area chart";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const chartConfig = {
  count: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EarningChart() {
  const { data: response, isLoading } = useGetPaymentGrowthQuery({ year: new Date().getFullYear() });

  const chartData = useMemo(() => {
    if (!response?.data?.monthlyStats) return [];
    
    return response.data.monthlyStats.map((stat: any) => ({
      month: monthNames[stat.month - 1] || `Month ${stat.month}`,
      count: stat.count,
    }));
  }, [response]);

  const yearlyGrowth = response?.data?.yearlyGrowth || 0;

  if (isLoading) {
    return (
      <Card className="flex h-full min-h-[300px] items-center justify-center dark:border-[#F4B057]">
        <div className="text-sm text-[#0D2357] dark:text-white">Loading chart data...</div>
      </Card>
    );
  }

  return (
    <Card className="h-full dark:border-[#F4B057]">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="text-base sm:text-lg">Earnings Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Showing total earning for the last 12 months
            </CardDescription>
          </div>
          <div className="flex w-full items-start gap-2 pr-5 text-sm sm:w-auto">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                <TrendingUp className="h-4 w-4" />
                Trending up by {yearlyGrowth}% this year
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full p-2 sm:p-4 md:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="count"
              type="linear"
              fill="var(--color-count)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
