import { countryList } from "@/constants";
import readXlsxFile from "read-excel-file";

export const getExcelData = async () => {
  try {
    const response = await fetch("/data/excel.xlsx");
    const blob = await response.blob();
    const rows = await readXlsxFile(blob);

    const [headers, ...dataRows] = rows;
    const years = dataRows[1].slice(1).map((year) => {
      return {
        id: String(year),
        value: Number(year),
        year: String(year),
        type: "year",
      };
    });

    console.log(dataRows,years)

   const actualData = years.flatMap((yr) => {
     const yearIndex = dataRows[1].indexOf(Number(yr.id));
     return dataRows
       .slice(2)
       .filter((row) => countryList.includes(row[0]))
       .map((row) => {
         return {
           id: `${yr.id}-${row[0]}`,
           value: Number(row[yearIndex]) || -1,
           year: yr.id,
           country: row[0],
           type: "data-point",
         };
       });
   });

      console.log(actualData)

    const nodes = [...years, ...actualData];

    const links = actualData.map((dataPoint) => {
      return {
        source: dataPoint.id,
        target: dataPoint.year,
      };
    });

    return {
      fieldName: String(headers[0]),
      data: {
        nodes,
        links,
      },
    };
  } catch (error) {
    console.error("Error reading the Excel file:", error);
    return [];
  }
};
