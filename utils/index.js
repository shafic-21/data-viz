import { countryList, regionList } from "@/constants";
import readXlsxFile from "read-excel-file";

export const generateDataNodesandLinks = async (filePath) => {
  const { data: rawData, fieldName } = await getExcelData(filePath);
  let nodes = [
    /*
    {
      id:string
      type:"region"|"country"|"data-point"
      name:""
      value:""
      parent:""|null
    }
    */
  ];

  let links = [];

  const years = rawData[0].slice(1);



  const regions = rawData
    .filter((cells) => {
      let regionName = cells[0];
      let regions = regionList.map(({ name }) => name);
      return regions.includes(regionName) && regionName != "Africa wide";
    })
    .map((cells, regionIndex) => {
      let regionName = cells[0];

      nodes.push({
        id: regionName,
        type: "region",
        name: regionName,
        value: null,
        parent: null,
        code: null,
      });

      let values = cells.slice(1).map((value, i) => {
        let year = years[i];
        nodes.push({
          id: year + regionName,
          type: "data-point",
          name: year,
          value: value,
          parent: regionName,
          code: null,
        });
      });
    });

  const countries = rawData
    .filter((cells) => {
      let countryName = cells[0];
      let ctries = countryList.map(({ name }) => name);
      return ctries.includes(countryName);
    })
    .map((cells) => {
      let countryName = cells[0];
      const countryRegion =
        regionList.slice(1).filter((reg) => {
          let ctries = reg.countries.map(({ name }) => name);
          return ctries.includes(countryName);
        })[0]?.name ?? "";

      let countryCode = regionList
        .slice(1)
        .filter((reg) => {
          let ctries = reg.countries.map((country) => {
            return country.name;
          });
          return ctries.includes(countryName);
        })[0]
        .countries.filter((c) => c.name == countryName)[0].code;

      nodes.push({
        id: countryName,
        type: "country",
        name: countryName,
        code: countryCode,
        value: null,
        parent: countryRegion,
      });
      links.push({
        source: countryName,
        target: countryRegion,
        type: "country-link",
      });

      let values = cells.slice(1).map((value, i) => {
        let year = years[i];

        links.push({
          source: year + countryName,
          target: countryName,
          type: "data-link",
        });

        nodes.push({
          id: year + countryName,
          type: "data-point",
          name: year,
          value: value,
          parent: countryName,
          code: null,
        });
      });
    });

  return {
    fieldName,
    data: {
      nodes,
      links,
    },
  };
};

//This is the function that extracts data from the excel file
async function getExcelData(filePath) {
  // "/data/2024.xlsx";
  try {
    const response = await fetch(filePath);
    const blob = await response.blob();
    const rows = await readXlsxFile(blob);

    const [headers, ...dataRows] = rows;

    return {
      fieldName: String(headers[0]), //I get the field name.
      data: dataRows.slice(1, 61), //Here I slice the data to make sure i get the countries and regions only
    };
  } catch (error) {
    throw new Error("Error reading the Excel file:", error);
  }
}
