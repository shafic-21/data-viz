import { countryList, regionList } from "@/constants";
import readXlsxFile from "read-excel-file";

export const generateDataNodesandLinks = async (filePath) => {
  const { data: rawData, fieldName } = await getExcelData(filePath);
  let nodes = [];
  let links = [];

  const years = rawData[0].slice(1).map((cell) => Number(cell));

  const regions = rawData
    .filter((cells) => {
      let regionName = cells[0];

      let regions = regionList.map(({ name }) => name);
      return regions.includes(regionName);
    })
    .map((cells, regionIndex) => {
      let regionName = cells[0];
      let regionColor = regionList.filter((reg) => reg.name == regionName)[0]
        ?.color;
      let regionCode = regionList.filter((reg) => reg.name == regionName)[0]
        ?.code;
      if (regionName !== "Africa wide") {
        links.push({
          source: regionName,
          target: "Africa wide",
          type: "region-link",
        });
      }

      let values = cells.slice(1).map((value, i) => {
        let year = years[i];
        nodes.push({
          id: year + regionName,
          type: "region",
          name: regionName,
          value: value,
          year: year,
          code: regionCode,
          color: regionColor,
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

      let countryColor = regionList
        .slice(1)
        .filter((reg) => {
          let ctries = reg.countries.map((country) => {
            return country.name;
          });
          return ctries.includes(countryName);
        })[0]
        .countries.filter((c) => c.name == countryName)[0].color;

      links.push({
        source: countryName,
        target: countryRegion,
        type: "country-link",
      });

      let values = cells.slice(1).map((value, i) => {
        let year = years[i];
        nodes.push({
          id: year + countryName,
          type: "country",
          name: countryName,
          value: value,
          year,
          code: countryCode,
          color: countryColor,
        });
      });
    });

  return {
    fieldName,
    years,
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
      data: dataRows.slice(1, 80), //Here I slice the data to make sure i get the countries and regions only
    };
  } catch (error) {
    throw new Error("Error reading the Excel file:", error);
  }
}

function createSafePropertyName(name) {
  // If the name contains spaces or special characters, I wrap it in quotes
  if (/\s|[^a-zA-Z0-9_]/.test(name)) {
    return JSON.stringify(name);
  }
  return name;
}

export function organizeDataForChart(nodes, yearList) {
  // Create a set of unique country/region names
  const codeSet = new Set(nodes.map((node) => node.code));
  const codes = Array.from(codeSet);

  // Create the data structure
  const chartData = yearList.map((year) => {
    const yearData = { year };

    codes.forEach((code) => {
      const nodeForCode = nodes.find(
        (node) => node.year === year && node.code === code
      );
      yearData[code] = nodeForCode ? nodeForCode.value : null;
    });

    return yearData;
  });

  return chartData;
}

export function getComparisonData(data, compareArray) {
  return data.map((yearData) => {
    const filteredData = { year: yearData.year };
    compareArray.forEach((country) => {
      // Use bracket notation to access properties, which works with spaces in names
      const safeName = createSafePropertyName(country);
      filteredData[safeName] = yearData[safeName];
    });
    return filteredData;
  });
}
