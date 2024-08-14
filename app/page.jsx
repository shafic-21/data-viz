"use client";

import {
  generateDataNodesandLinks,
  getExcelData,
  childrenFormat,
} from "@/utils";
import { useCallback, useEffect, useState } from "react";

import BubbleChart from "../components/BubbleChart";

import { useChartDataStore, useFileStore, useYearListStore } from "@/store";
import { LineGraph } from "@/components/LineGraph";

export default function Home() {
  const [data, setData] = useState(null);

  const { filePath } = useFileStore();
  const { updateYearList } = useYearListStore((state) => state);

  const fetchData = useCallback(async () => {
    const result = await generateDataNodesandLinks(filePath).then((res) => {
      const { data, years } = res;
      setData(data);
      updateYearList(years);
    });
  }, [data, filePath]);

  useEffect(() => {
    fetchData();
  }, [filePath]);

  return (
    <main className="p-8 flex h-full flex-col relative isolate">
      <div className="w-full h-full flex flex-col gap-12">
        {data ? (
          <>
            {" "}
            {/* <BubbleChart data={data} /> */}
            <div className="flex-shrink-0">
              <LineGraph nodes={data?.nodes} />
            </div>
          </>
        ) : (
          <div className="text-slate-400">Loading...</div>
        )}
      </div>
    </main>
  );
}
