import React, { SetStateAction, useState, Dispatch } from "react";
import * as XLSX from "xlsx";
import { Button, Stack, CircularProgress } from "@mui/material";

export const parseMaterialityExcel = async (file: File) => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const binaryStr = e.target?.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const allRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const headers: string[] = allRows[1].map((h: any) =>
          h !== undefined && h !== null ? String(h).trim() : ""
        );

        const contentRows = allRows.slice(2);

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

export const flattenMateriality = (data: Record<string, any>) => {
  const result: any[] = [];
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
  dataInsideOut: any[];
  setDataInsideOut: Dispatch<SetStateAction<any[]>>;
  dataOutsideIn: any[];
  setDataOutsideIn: Dispatch<SetStateAction<any[]>>;
  onImportComplete: () => void;
}

export function ImportExport({
  dataInsideOut,
  setDataInsideOut,
  dataOutsideIn,
  setDataOutsideIn,
  onImportComplete,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetSetter: Dispatch<SetStateAction<any[]>>
  ) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }
    const parsed = await parseMaterialityExcel(file);
    const flat = flattenMateriality(parsed);
    targetSetter(flat.map((d, i) => ({ id: i + 1, ...d })));
    setLoading(false);
    onImportComplete();
  };

  const loadTestFiles = async () => {
    setLoading(true);
    try {
      const loadFile = async (
        url: string,
        setter: Dispatch<SetStateAction<any[]>>
      ) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error loading ${url}`);
        const blob = await response.blob();
        const file = new File([blob], url, { type: blob.type });
        const parsed = await parseMaterialityExcel(file);
        const flat = flattenMateriality(parsed);
        setter(flat.map((d, i) => ({ id: i + 1, ...d })));
      };

      await Promise.all([
        loadFile("testFiles/test1920ver2InOut.xlsx", setDataInsideOut),
        loadFile("testFiles/test1920ver2OutIn.xlsx", setDataOutsideIn),
      ]);

      onImportComplete();
    } catch (err) {
      console.error("Error loading test Excel files:", err);
    }
    setLoading(false);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
      <Button variant="contained" component="label">
        Upload Inside-Out
        <input
          type="file"
          hidden
          onChange={(e) => handleFileUpload(e, setDataInsideOut)}
          accept=".xlsx,.xls"
        />
      </Button>

      <Button variant="contained" component="label">
        Upload Outside-In
        <input
          type="file"
          hidden
          onChange={(e) => handleFileUpload(e, setDataOutsideIn)}
          accept=".xlsx,.xls"
        />
      </Button>

      <Button
        variant="outlined"
        disabled={!dataInsideOut.length}
        onClick={() => {
          const exportData = dataInsideOut.map(({ id, ...rest }) => rest);
          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Inside-Out");
          XLSX.writeFile(workbook, "inside_out.xlsx");
        }}
      >
        Download Inside-Out
      </Button>

      <Button
        variant="outlined"
        disabled={!dataOutsideIn.length}
        onClick={() => {
          const exportData = dataOutsideIn.map(({ id, ...rest }) => rest);
          const worksheet = XLSX.utils.json_to_sheet(exportData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Outside-In");
          XLSX.writeFile(workbook, "outside_in.xlsx");
        }}
      >
        Download Outside-In
      </Button>

      <Button variant="outlined" onClick={loadTestFiles}>
        Load Test Files
      </Button>

      {loading && <CircularProgress size={24} color="primary" sx={{ mt: 1 }} />}
    </Stack>
  );
}
