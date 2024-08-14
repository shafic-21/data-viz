import React, { useState, useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useChartDataStore } from "@/store";

const chartConfig = {
  views: {
    label: "Value",
  },
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
};

export function LineGraph({ nodes }) {
  const { activeData } = useChartDataStore();
  if (!activeData) return <p>No Data!</p>;

  const chartData = nodes.filter((node) => node.name === activeData);

  const average = useMemo(() => {
    const sum = chartData.reduce((acc, curr) => acc + curr.value, 0);
    return chartData.length > 0 ? sum / chartData.length : 0;
  }, [chartData]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{activeData}</CardTitle>
          <CardDescription>Showing total value over time</CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Average Value</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {average.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
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
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="value"
                  labelFormatter={(value, props) => props[0].payload.year}
                />
              }
            />
            <Line
              dataKey="value"
              type="monotone"
              stroke={chartConfig.value.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
