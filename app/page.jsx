"use client";

import {
  generateDataNodesandLinks,
  getExcelData,
  childrenFormat,
} from "@/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

import BubbleChart from "../components/BubbleChart";

import { useChartDataStore, useFileStore, useYearListStore } from "@/store";
import { LineGraph } from "@/components/LineGraph";
import { CompareLineGraph } from "@/components/CompareLineGraph";
import { hexToRgb } from "@/utils";

export default function Home() {
  const [data, setData] = useState(null);

  const { filePath } = useFileStore();
  const { updateYearList, setActiveYear, activeYear } = useYearListStore(
    (state) => state
  );
  const { compareMode, activeData } = useChartDataStore();

  const fetchData = useCallback(async () => {
    const result = await generateDataNodesandLinks(filePath).then((res) => {
      const { data, years } = res;
      setData(data);
      updateYearList(years);
      setActiveYear(years[years.length - 1]);
    });
  }, [data, filePath]);

  useEffect(() => {
    fetchData();
  }, [filePath]);

  const activeDataValues = useMemo(() => {
    return data?.nodes.find(
      (node) => node.year == activeYear && node.name == activeData
    );
  }, [activeData, activeYear, data]);

  return (
    <main className="p-8 flex h-full flex-col relative isolate">
      <div className="w-full h-full flex flex-col justify-start gap-20">
        {data ? (
          <>
            {" "}
            <BubbleChart data={data} />
            <div className="relative">
              <div
                className="absolute -top-80 left-0 bg-slate-700/50 backdrop-blur-3xl z-10  p-4 rounded-lg flex flex-col border text-sm font-semibold text-slate-400 "
                style={{
                  borderColor: activeDataValues.color
                    ? `rgba(${hexToRgb(activeDataValues.color)}, 0.5)`
                    : "transparent",
                }}
              >
                <h3>
                  Country / Region ➡️{" "}
                  <span className="text-slate-200">
                    {activeDataValues.name}
                  </span>
                </h3>
                <p>
                  Value ➡️{" "}
                  <span className="text-slate-200">
                    {activeDataValues.value}
                  </span>
                </p>
                <p>
                  Year ➡️{" "}
                  <span className="text-slate-200">
                    {activeDataValues.year}
                  </span>
                </p>
              </div>
              {compareMode ? (
                <CompareLineGraph nodes={data?.nodes} />
              ) : (
                <LineGraph nodes={data?.nodes} />
              )}
            </div>
          </>
        ) : (
          <div className="text-slate-400">Loading...</div>
        )}
      </div>
      <div className="text-orange-600 w-fit mx-auto py-2 text-xs">
        Made by <a href="mailto:zziwafic@gmail.com" className="underline">Shafic Zziwa</a>
      </div>
    </main>
  );
}
