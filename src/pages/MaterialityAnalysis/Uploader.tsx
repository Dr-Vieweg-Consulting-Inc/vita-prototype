import React, { useState } from "react";
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
} from "@mui/material";
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

interface MaterialityRow {
  [key: string]: string | number;
  ESRS: string;
  Topic: string;
  Subtopic: string;
  "Sub-subtopic": string;
  "Impact Score": number;
  "Financial Risk": number;
  "Stakeholder Importance": number;
}

export const MaterialityUploader = () => {
  const [rows, setRows] = useState<MaterialityRow[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json<MaterialityRow>(sheet);
      setRows(json);
    };
    reader.readAsBinaryString(file);
  };

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...rows];
    updated[index][field] =
      field.includes("Score") ||
      field.includes("Risk") ||
      field.includes("Importance")
        ? parseFloat(value as string)
        : value;
    setRows(updated);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Materiality");
    XLSX.writeFile(workbook, "materiality_updated.xlsx");
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4">
          Materiality Analysis Upload & Visualization
        </Typography>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Excel File
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
            accept=".xlsx,.xls"
          />
        </Button>
        {rows.length > 0 && (
          <>
            <Button variant="outlined" onClick={handleDownload} sx={{ ml: 2 }}>
              Download Updated Excel
            </Button>

            <Paper sx={{ mt: 4, maxHeight: 400, overflow: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {Object.keys(rows[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.entries(row).map(([key, value]) => (
                        <TableCell key={key}>
                          <TextField
                            variant="standard"
                            fullWidth
                            value={value}
                            onChange={(e) =>
                              handleChange(idx, key, e.target.value)
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>

            <Typography variant="h6" sx={{ mt: 4 }}>
              Materiality Matrix (Financial Risk vs Stakeholder Importance)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="Financial Risk"
                  name="Financial Risk"
                  domain={[0, 10]}
                >
                  <Label
                    value="Financial Risk"
                    position="insideBottom"
                    offset={-5}
                  />
                </XAxis>
                <YAxis
                  type="number"
                  dataKey="Stakeholder Importance"
                  name="Stakeholder Importance"
                  domain={[0, 10]}
                >
                  <Label
                    value="Stakeholder Importance"
                    angle={-90}
                    position="insideLeft"
                    offset={-5}
                  />
                </YAxis>
                <ZAxis
                  type="number"
                  dataKey="Impact Score"
                  range={[100, 500]}
                  name="Impact Score"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Topics" data={rows} fill="#1976d2" />
              </ScatterChart>
            </ResponsiveContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

// export default MaterialityUpload;
