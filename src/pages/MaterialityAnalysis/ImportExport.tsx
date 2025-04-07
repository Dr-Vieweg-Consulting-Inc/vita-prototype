import React, { SetStateAction, useState, Dispatch } from "react";
import * as XLSX from "xlsx";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableContainer,
  Grid,
  IconButton,
  Stack,
  CircularProgress,
  styled,
  // Tabs,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { UpdateForm } from "./Form";
import { Tabs } from "../../components";

interface MaterialityRow {
  [key: string]: string | number | undefined;
  ESRS?: string;
  "Main topic"?: string;
  Subtopic?: string;
  "Sub-subtopic"?: string;
  "Impact Score"?: number;
  "Financial Risk"?: number;
  "Stakeholder Importance"?: number;
  [key: `Custom-${string}`]: any; // For additional custom columns
}

export const parseMaterialityExcel = async (file: File) => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const allRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Use row 1 (index 1) for actual column headers
        const headers: string[] = allRows[1].map((h: any) =>
          h !== undefined && h !== null ? String(h).trim() : ""
        );

        const contentRows = allRows.slice(2); // Data starts at row index 2

        // Column index helpers
        const getIndex = (label: string) =>
          headers.findIndex((h) => h === label);
        const idxMain = getIndex("Main topic");
        const idxSub = getIndex("Subtopic");
        const idxSubsub = getIndex("Sub-subtopic");

        const nested: Record<string, any> = {};

        for (const row of contentRows) {
          const main = String(row[idxMain] || "").trim();
          const sub = String(row[idxSub] || "")
            .replace(/\n/g, " ")
            .trim();
          const subsub = String(row[idxSubsub] || "")
            .replace(/\n/g, " ")
            .trim();

          if (!main || !sub) continue;

          const entry: Record<string, any> = {};
          headers.forEach((key, i) => {
            const rawVal = row[i];
            entry[key] =
              rawVal === undefined || rawVal === null || rawVal === ""
                ? null
                : rawVal;
          });

          if (!nested[main]) nested[main] = {};
          if (!nested[main][sub]) nested[main][sub] = {};

          const subsubKey =
            subsub && subsub.toLowerCase() !== "nan" ? subsub : "__self__";
          nested[main][sub][subsubKey] = entry;
        }

        resolve(nested);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
};

// Converts nested data to flat array of rows
export const flattenMateriality = (
  data: Record<string, any>
): MaterialityRow[] => {
  const result: MaterialityRow[] = [];

  for (const mainTopic in data) {
    const subtopics = data[mainTopic];
    for (const subtopic in subtopics) {
      const subsubtopics = subtopics[subtopic];
      for (const subsub in subsubtopics) {
        const entry = subsubtopics[subsub];
        result.push({
          "Main topic": mainTopic,
          Subtopic: subtopic,
          "Sub-subtopic": subsub === "__self__" ? null : subsub,
          ...entry,
        });
      }
    }
  }

  return result;
};

interface Props {
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
  //   setTab: Dispatch<SetStateAction<number>>;
  onImportComplete: () => void;
}

export function ImportExport({ data, setData, onImportComplete }: Props) {
  const [loading, setLoading] = useState(false);

  // Function to handle manual file uploads
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }
    const parsed = await parseMaterialityExcel(file);
    const flat = flattenMateriality(parsed);
    setData(flat.map((d, i) => ({ id: i + 1, ...d })));
    setLoading(false);
    onImportComplete();
  };

  // Function to load a test Excel file from public folder
  const loadTestFile = async () => {
    setLoading(true);
    try {
      // Fetch the Excel file from the public folder
      const response = await fetch("testFiles/scored.xlsx");
      if (!response.ok) {
        throw new Error(`Error loading test file: ${response.statusText}`);
      }
      const blob = await response.blob();

      // Parse the blob into a file object
      const file = new File([blob], "scored.xlsx", { type: blob.type });

      // Parse and set data
      const parsed = await parseMaterialityExcel(file);
      const flat = flattenMateriality(parsed);
      setData(flat.map((d, i) => ({ id: i + 1, ...d })));
      setLoading(false);
      onImportComplete();
    } catch (err) {
      console.error("Error loading test Excel file:", err);
      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
      <Button variant="contained" component="label">
        Upload Excel File
        <input
          type="file"
          hidden
          onChange={handleFileUpload}
          accept=".xlsx,.xls"
        />
      </Button>

      <Button
        variant="outlined"
        disabled={!data.length}
        onClick={() => {
          const exportData = data.map(({ id, ...rest }) => rest);
          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Materiality");
          XLSX.writeFile(workbook, "materiality_updated.xlsx");
        }}
      >
        Download Excel
      </Button>

      <Button variant="outlined" onClick={loadTestFile}>
        Load Test Excel
      </Button>

      {loading && <CircularProgress size={24} color="primary" sx={{ mt: 1 }} />}
    </Stack>
  );
}
