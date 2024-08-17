import React, { useState, useMemo, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import Image from "next/image";
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
import { useChartDataStore, useYearListStore } from "@/store";
import { Button } from "./ui/button";
import { Info, TrendingUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { organizeDataForChart, getComparisonData } from "@/utils";

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
  const { activeData, toggleCompareMode, compareMode, addCompareData } =
    useChartDataStore();

  if (!activeData) return <p>No Data!</p>;

  const chartData = useMemo(() => {
    return nodes.filter((node) => node.name === activeData);
  }, [nodes, activeData, compareMode]);

  const average = useMemo(() => {
    const sum = chartData.reduce((acc, curr) => acc + curr.value, 0);
    return chartData.length > 0 ? sum / chartData.length : 0;
  }, [chartData]);

  const { name, color, code, type } = chartData[0];

  const handleCompareMode = () => {
    toggleCompareMode();
    addCompareData({ code, color, name });
  };

  return (
    <Card className="bg-slate-800 border-slate-700 ">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-slate-700/40 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-slate-200 flex gap-6 items-center">
            <div className="flex gap-2">
              {type == "region" ? (
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ) : (
                <Image
                  src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
                  alt=""
                  height={20}
                  width={20}
                />
              )}
              <span> {name}</span>
            </div>
          </CardTitle>
          <CardDescription className="text-slate-500">
            Showing total value over the years
          </CardDescription>
        </div>
        <div className="flex items-center">
          <Button
            size="sm"
            className={cn(
              "text-xs flex gap-2  bg-transparent hover:bg-transparent",
              compareMode ? "text-green-500" : "text-slate-500"
            )}
            onClick={handleCompareMode}
          >
            Compare mode{" "}
            <p
              className={cn(
                "w-8 h-5 flex items-center rounded-full   border transition-all duration-300",
                compareMode
                  ? "justify-end border-green-700 bg-slate-700"
                  : "justify-start border-slate-700 bg-slate-700/50"
              )}
            >
              <div
                className={cn(
                  " h-4 w-4 rounded-full  transition-all duration-300",
                  compareMode
                    ? "bg-green-700"
                    : " bg-slate-900 text-slate-900/0"
                )}
              />
            </p>
          </Button>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t border-slate-700/40 px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-slate-500">Average Value</span>
            <span className="text-lg font-bold leading-none text-slate-200 sm:text-3xl">
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
            <CartesianGrid vertical={false} className="stroke-slate-600" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fill: "#94a3b8" }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="value"
                  labelFormatter={(value, props) => (
                    <p className="flex gap-2">
                      <span>{props[0].payload.name}</span>
                      <span>{props[0].payload.year}</span>
                    </p>
                  )}
                />
              }
            />
            <Line
              dataKey="value"
              type="monotone"
              stroke={chartData[0].color != "" ? chartData[0].color : "white"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
