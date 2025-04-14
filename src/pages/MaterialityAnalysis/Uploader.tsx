import React, { useState } from "react";
// import * as XLSX from "xlsx";
import {
  Container,
  Typography,
  // Stack,
  Fade,
  Box,
  // Tabs,Fade
} from "@mui/material";
import { Tabs } from "../../components";
import { DataPoints } from "./Details";
import { ImportExport } from "./ImportExport";
import { Overview } from "./Overview";

export const MaterialityUploader: React.FC = () => {
  const [dataInsideOut, setDataInsideOut] = useState<any[]>([]);

  const [dataOutsideIn, setDataOutsideIn] = useState<any[]>([]);

  const [tab, setTab] = useState<number>(0);

  // const groupedData: Record<string, Record<string, any[]>> = {};
  // data.forEach((row) => {
  //   const main = row["Main topic"] || "Uncategorized";
  //   const sub = row["Subtopic"] || "General";
  //   if (!groupedData[main]) groupedData[main] = {};
  //   if (!groupedData[main][sub]) groupedData[main][sub] = [];
  //   groupedData[main][sub].push(row);
  // });

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Materiality Analysis
      </Typography>

      <Tabs
        value={tab}
        onChange={(value) => setTab(value)}
        labels={["Overview", "Details", "Import / Export"]}
      />

      <Box sx={{ p: 3 }}>
        <Fade in={tab === 0} timeout={300}>
          <Container style={{ display: tab === 0 ? "block" : "none" }}>
            <Overview
              dataInsideOut={dataInsideOut}
              dataOutsideIn={dataOutsideIn}
            />
          </Container>
        </Fade>
        <Fade in={tab === 1} timeout={300}>
          <Container style={{ display: tab === 1 ? "block" : "none" }}>
            <DataPoints
              dataInsideOut={dataInsideOut}
              setDataInsideOut={setDataInsideOut}
              dataOutsideIn={dataOutsideIn}
              setDataOutsideIn={setDataOutsideIn}
            />
          </Container>
        </Fade>
        <Fade in={tab === 2} timeout={300}>
          <Container style={{ display: tab === 2 ? "block" : "none" }}>
            <ImportExport
              dataInsideOut={dataInsideOut}
              setDataInsideOut={setDataInsideOut}
              dataOutsideIn={dataOutsideIn}
              setDataOutsideIn={setDataOutsideIn}
              onImportComplete={() => setTab(0)}
            />
          </Container>
        </Fade>
      </Box>
    </Container>
  );
};
