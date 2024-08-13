"use client";

import {
  generateDataNodesandLinks,
  getExcelData,
  childrenFormat,
} from "@/utils";
import { useCallback, useEffect, useState } from "react";

import BubbleChart from "../components/BubbleChart";

import { useFileStore, useYearListStore } from "@/store";

export default function Home() {
  const [data, setData] = useState(null);


  const { filePath } = useFileStore();
  const {updateYearList} = useYearListStore((state)=>state)

  console.log(filePath);

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
    <main className="p-8 flex flex-col relative isolate">
      <div className="w-full h-screen flex gap-12">
        {data ? (
          <BubbleChart data={data} />
        ) : (
          <div className="text-slate-400">Loading...</div>
        )}
      </div>
    </main>
  );
}
