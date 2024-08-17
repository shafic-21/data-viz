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
import { organizeDataForChart } from "@/utils";
import { toast } from "sonner";

const chartConfig = {
  views: {
    label: "Value",
  },
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
};

export function CompareLineGraph({ nodes }) {
  const {
    activeData,
    toggleCompareMode,
    compareMode,
    compareData,
    removeCompareData,
  } = useChartDataStore();
  const { yearList } = useYearListStore();

  if (!activeData) return <p>No Data!</p>;

  const chartData = useMemo(() => {
    return organizeDataForChart(nodes, yearList);
  }, [nodes, activeData, compareMode]);

  const compareAssets = useMemo(() => {
    const data = compareData.map(({ code, color }) => {
      const node = nodes.find((n) => n.code === code);

      return {
        name: node.name,
        code,
        color,
        type: node.type,
      };
    });
    return data;
  }, [nodes, activeData, compareMode, compareData]);

  const handleCompareMode = () => {
    toggleCompareMode();
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-slate-700/40 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <div className="text-slate-200 flex gap-4 items-center">
            {compareAssets.map(({ name, code, color, type }) => (
              <div
                key={code}
                className="flex items-center px-2 gap-2 py-2 bg-slate-700 rounded-xl group cursor-pointer group"
              >
                {type == "region" ? (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ) : (
                  <Image
                    src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
                    alt=""
                    height={10}
                    width={10}
                    className="h-3 w-3"
                  />
                )}
                <span className="text-slate-300 text-sm">{name}</span>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    if (compareData.length > 1) {
                      removeCompareData(code);
                    } else {
                      toast("Chart need atleast one country / region", {
                        description: "Switch off compare mode",
                      });
                    }
                  }}
                  className=" hover:bg-red-700/10 p-0 h-6 w-6 text-slate-400"
                >
                  <X className="h-4 w-4 text-slate-400 group-hover:text-red-700" />
                </Button>
              </div>
              // <p>{name}</p>
            ))}
            {compareData.length < 5 && (
              <span className="text-xs font-normal flex gap-2 items-center text-slate-400">
                <Info className="h-3 w-3" />
                Click on a country / region bubble to add
              </span>
            )}
          </div>
          <CardDescription className="text-slate-500">
            Comparing values of selected regions over the years
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
            <span className="text-xs text-slate-500">Comparing</span>
            <span className="text-lg font-bold leading-none text-slate-200 sm:text-3xl">
              {compareData.length.toLocaleString()} of{" "}
              <span className="text-md text-slate-200">5</span>
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
                  className="w-[180px]"
                  labelFormatter={(value, props) => (
                    <p className="flex gap-2">
                      <span>{props[0].payload.year}</span>
                    </p>
                  )}
                />
              }
            />
            {compareData.map((v) => (
              <Line
                dataKey={v.code}
                type="monotone"
                name={v.name}
                stroke={v.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
