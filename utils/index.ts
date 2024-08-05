import { countryList } from "@/constants";
import { CountryData } from "@/types";

import readXlsxFile from "read-excel-file";

export const getExcelData = async (): Promise<CountryData[]> => {
  try {
    const response = await fetch("/data/excel.xlsx");
    const blob = await response.blob();
    const rows = await readXlsxFile(blob);

    const [headers, ...dataRows] = rows;
    const years = dataRows[1].slice(1).map((year) => Number(year));

    const transformedData: CountryData[] = dataRows
      .slice(2)
      .filter((row) => countryList.includes(row[0] as string))
      .map((row) => {
        const country = row[0] as string;
        const scores = years.map((year, index) => ({
          year,
          value:
            typeof row[index + 1] === "number" ? Number(row[index + 1]) : null,
        }));

        return {
          country,
          scores,
        };
      });

    return transformedData;
  } catch (error) {
    console.error("Error reading the Excel file:", error);
    return [];
  }
};
