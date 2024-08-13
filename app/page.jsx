"use client";

import {
  generateDataNodesandLinks,
  getExcelData,
  childrenFormat,
} from "@/utils";
import { useCallback, useEffect, useState } from "react";

import BubbleChart from "../components/BubbleChart";

import { useFileStore } from "@/store";

export default function Home() {
  const [data, setData] = useState(null);
  const [fieldName, setFieldName] = useState(null);

  const { filePath } = useFileStore();

  console.log(filePath);

  const fetchData = useCallback(async () => {
    const result = await generateDataNodesandLinks(filePath).then((res) => {
      const { data, fieldName } = res;
      setData(data);
      setFieldName(fieldName);
      // console.log(data);
    });
  }, [data, fieldName, filePath]);

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
