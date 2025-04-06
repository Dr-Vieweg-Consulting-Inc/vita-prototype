import React, { useState } from "react";
// import * as XLSX from "xlsx";
import {
  Container,
  Typography,
  Stack,
  // Tabs,
} from "@mui/material";
import { Tabs } from "../../components";
import { DataPoints } from "./Details";
import { ImportExport } from "./ImportExport";
import { Overview } from "./Overview";

export const MaterialityUploader: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(0);

  const groupedData: Record<string, Record<string, any[]>> = {};
  data.forEach((row) => {
    const main = row["Main topic"] || "Uncategorized";
    const sub = row["Subtopic"] || "General";
    if (!groupedData[main]) groupedData[main] = {};
    if (!groupedData[main][sub]) groupedData[main][sub] = [];
    groupedData[main][sub].push(row);
  });

  function getTabComponent() {
    switch (tab) {
      case 0:
        return <Overview data={data} />;
      case 1:
        return <DataPoints data={data} setData={setData} />;
      case 2:
        return (
          <ImportExport
            data={data}
            setData={setData}
            onImportComplete={() => setTab(0)}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ESG Materiality Upload + Editor
      </Typography>

      <Tabs
        value={tab}
        onChange={(value) => setTab(value)}
        labels={["Overview", "Details", "Import / Export"]}
      />
      <Stack mt={2}>{getTabComponent()}</Stack>
    </Container>
  );
};
