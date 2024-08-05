"use client";

import { CountryData } from "@/types";
import { getExcelData } from "@/utils";
import { useEffect, useState } from "react";
import BubbleChart from "./components/BubbleChart";


export default function Home() {
  const [countryData, setCountryData] = useState<CountryData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExcelData();
      setCountryData(data);
    };

    fetchData();
  }, []);

  if (countryData) {
    console.log(countryData)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Country Data</h1>
      {countryData ? (
        <ul>
         <BubbleChart data={countryData}/>
        </ul>
      ) : (
        <p>Loading country data...</p>
      )}
    </main>
  );
}
