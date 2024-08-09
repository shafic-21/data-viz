import { countryList, regionList } from "@/constants";
import readXlsxFile from "read-excel-file";

export const generateDataNodesandLinks = async (filePath) => {
  const { data: rawData, fieldName } = await getExcelData(filePath);

  const years = rawData[0].slice(1);

  const regions = rawData.slice(55, 60).map((cells) => {
    let regionName = cells[0];
    let values = cells.slice(1).map((value, i) => {
      let year = years[i];
      return {
        id: `${regionName}`,
        value: value ?? -1,
        year,
      };
    });

    let rNodes = [{ id: regionName, value: regionName, year: null }, ...values];
    let rLists = rNodes.slice(1).map((item) => {
      return { source: item.id, target: rNodes[0].id };
    });

    return {
      id: regionName,
      name: regionName,
      region: regionName,
      type: "region",
      data: {
        nodes: rNodes, //specific region nodes
        links: rLists, //specific region links
      },
    };
  });

  const countries = rawData.slice(1, 54).map((cells) => {
    let countryName = cells[0];
    let values = cells.slice(1).map((value, i) => {
      let year = years[i];
      return {
        id: `${year}`,
        value: value ?? -1,
        year,
        type: "data-point",
      };
    });

    let cNodes = [
      { id: countryName, value: countryName, year: null, type: "country" },
      ...values,
    ];
    let cLists = cNodes.slice(1).map((item) => {
      return { source: item.id, target: cNodes[0].id };
    });

    const region =
      regionList.slice(1).filter((reg) => {
        console.log(reg);
        let ctries = reg.countries.map(({ name }) => name);
        return ctries.includes(countryName);
      })[0]?.name ?? "";

    return {
      id: countryName,
      name: countryName,
      region,
      type: "country",
      data: {
        nodes: cNodes, //specific region nodes
        links: cLists, //specific region links
      },
    };
  });

  const nodes = [...regions, ...countries];
  const links = countries.map((country) => {
    return {
      source: country.id,
      target: country.region,
    };
  });

  return {
    fieldName,
    data: {
      nodes,
      links,
    },
  };
};

export const childrenFormat = async (filePath) => {
  const { data: rawData, fieldName } = await getExcelData(filePath);

  const years = rawData[0].slice(1);

  const countries = rawData.slice(1, 54).map((cells) => {
    let countryName = cells[0];
    let values = cells.slice(1).map((value, i) => {
      let year = years[i];
      return {
        year,
        value: value ? value : -1,
      };
    });

    return {
      name: countryName,
      children: values,
    };
  });

  const regions = rawData.slice(55, 60).map((cells) => {
    let regionName = cells[0];

    let values = cells.slice(1).map((value, i) => {
      let year = years[i];
      return {
        year,
        value: value ? value : -1,
      };
    });

    return {
      name: regionName,
      // data: values,
      children: countries,
    };
  });

  // console.log(rawData);
  return {
    fieldName,
    data: { name: "root", children: regions },
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
