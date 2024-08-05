import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readExcelFile, ExcelRow } from "../../../data/utils";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExcelRow[] | { error: string }>
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "exp-2024-08-03_13_55_47.xlsx"
    );
    const data = readExcelFile(filePath);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).json({ error: "Failed to read Excel file" });
  }
}
