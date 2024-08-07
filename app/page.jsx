"use client";

import { generateDataNodesandLinks, getExcelData } from "@/utils";
import { useCallback, useEffect, useState } from "react";

import YearsDataBubble from "./components/YearsDataBubble";

export default function Home() {
  const [data, setData] = useState(null);
  const [fieldName, setFieldName] = useState(null);
  const [filePath, setFilePath] = useState("/data/2024.xlsx");

  const fetchData = useCallback(async () => {
    const result = await generateDataNodesandLinks(filePath).then(
      (res) => {
        const { data, fieldName } = res;
        setData(data);
        setFieldName(fieldName);
        console.log(data)
      }
    );
  }, [data, fieldName,filePath]);

  useEffect(() => {
    fetchData();
  }, [filePath]);

  return (
    <main className="h-screen w-screen p-8 flex flex-col relative isolate">
      <div className="fixed z-10 w-full  ">
        <div>
          <h1 className="text-slate-100 font-bold text-3xl pb-4">
            ReSAKSS data viz
          </h1>

          <h2 className="py-2  w-fit  mb-4 rounded-full text-sm font-semibold text-green-600">
            {fieldName && fieldName}
          </h2>
        </div>
      </div>

      <div id="canvas" className="w-full flex-grow">
        {data ? (
          <YearsDataBubble data={data} />
        ) : (
          <div className="text-slate-400">Loading...</div>
        )}
      </div>
    </main>
  );
}
