// src/components/MaterialityUploader.tsx
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
  TableContainer,
  Grid,
  IconButton,
  Stack,
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

// import * as XLSX from "xlsx";

// Parses the uploaded Excel file into nested structure
// import * as XLSX from "xlsx";

// import * as XLSX from "xlsx";

// Parses the Excel into a full nested JS object, including all keys and nulls
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

export const MaterialityUploader2 = () => {
  const [rows, setRows] = useState<MaterialityRow[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await parseMaterialityExcel(file);
      console.log("Parsed ESG Data:", parsed);
      // setNestedData(parsed); // set your state or pass it to a component
    } catch (err) {
      console.error("Failed to parse Excel:", err);
    }

    return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json<any>(sheet, {
        defval: "",
      });

      console.log("show json ----> ", json);

      let abc: any = {};

      for (let i = 2; i < json.length; i++) {
        const row = json[i];

        // console.log("pray: ", row.__EMPTY);

        abc;
      }

      // setRows(json);
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
      field.includes("Importance") ||
      field === "Total Score Inside-Out"
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
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
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

            <Paper
              sx={{
                mt: 4,
                maxHeight: 500,
                overflow: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {Object.keys(rows[0]).map((key) => (
                      <TableCell key={key} sx={{ minWidth: 150 }}>
                        {key}
                      </TableCell>
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
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <Paper sx={{ p: 1 }}>
                          <Typography variant="subtitle2">
                            <strong>{d["Main topic"]}</strong>
                          </Typography>
                          <div>Subtopic: {d["Subtopic"]}</div>
                          <div>Sub-subtopic: {d["Sub-subtopic"]}</div>
                          <div>Impact Score: {d["Impact Score"]}</div>
                          <div>Financial Risk: {d["Financial Risk"]}</div>
                          <div>
                            Stakeholder Importance:{" "}
                            {d["Stakeholder Importance"]}
                          </div>
                        </Paper>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Topics" data={rows} fill="#1976d2" />
              </ScatterChart>
            </ResponsiveContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

interface MaterialityRow {
  [key: string]: string | number | null;
  ESRS?: string;
  "Main topic"?: string;
  Subtopic?: string;
  "Sub-subtopic"?: string;
}

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

// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Button,
//   Box,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import {
//   ResponsiveContainer,
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ZAxis,
// } from "recharts";
// import { parseMaterialityExcel } from "./utils/parseMaterialityExcel"; // You should have this function ready
// import { flattenMateriality } from "./utils/flattenMateriality";

export const MaterialityUploader: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState<any | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const parsed = await parseMaterialityExcel(file);
    const flat = flattenMateriality(parsed);
    setData(flat.map((d, i) => ({ id: i + 1, ...d })));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.id !== undefined && form.id !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === form.id ? { ...item, ...form } : item))
      );
    }
    setForm(null);
  };

  const handleEdit = (item: any) => {
    setForm({ ...item });
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const groupedData: Record<string, Record<string, any[]>> = {};
  data.forEach((row) => {
    const main = row["Main topic"] || "Uncategorized";
    const sub = row["Subtopic"] || "General";
    if (!groupedData[main]) groupedData[main] = {};
    if (!groupedData[main][sub]) groupedData[main][sub] = [];
    groupedData[main][sub].push(row);
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ESG Materiality Upload + Editor
      </Typography>

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
        <TextField
          select
          label="Filter ESG Category"
          value={filterCategory ?? ""}
          onChange={(e) => setFilterCategory(e.target.value || null)}
          SelectProps={{ native: true }}
          sx={{ width: 200 }}
        >
          <option value="">All</option>
          <option value="E">Environment (E)</option>
          <option value="S">Social (S)</option>
          <option value="G">Governance (G)</option>
        </TextField>
        <Button
          variant="outlined"
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
      </Stack>

      {form && (
        <Paper sx={{ p: 2, my: 2 }}>
          <Typography variant="h6" gutterBottom>
            {form.id !== null ? "Edit ESG Topic" : "Add ESG Topic"}
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            {Object.keys(form).map((key) =>
              key !== "id" ? (
                <TextField
                  key={key}
                  name={key}
                  label={key}
                  fullWidth
                  margin="normal"
                  value={form[key] ?? ""}
                  onChange={handleChange}
                />
              ) : null
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Box>
        </Paper>
      )}

      <Grid container spacing={4} direction="column">
        <Grid item xs={12}>
          <Paper sx={{ p: 2, overflowX: "auto" }}>
            <Typography variant="h6" gutterBottom>
              Materiality Matrix
            </Typography>
            <Box sx={{ minWidth: 600 }}>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="Financial Risk"
                    name="Financial Risk"
                    label={{
                      value: "Financial Risk",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="Stakeholder Importance"
                    name="Stakeholder Importance"
                    label={{
                      value: "Stakeholder Importance",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <ZAxis
                    dataKey="Impact Score"
                    range={[60, 200]}
                    name="Impact Score"
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <Paper sx={{ p: 1 }}>
                            <Typography variant="subtitle2">
                              <strong>{d["Main topic"]}</strong>
                            </Typography>
                            {d["Subtopic"] && (
                              <div>Subtopic: {d["Subtopic"]}</div>
                            )}
                            {d["Sub-subtopic"] && (
                              <div>Sub-subtopic: {d["Sub-subtopic"]}</div>
                            )}
                            <div>Impact Score: {d["Impact Score"]}</div>
                            <div>Financial Risk: {d["Financial Risk"]}</div>
                            <div>
                              Stakeholder Importance:{" "}
                              {d["Stakeholder Importance"]}
                            </div>
                          </Paper>
                        );
                      }
                      return null;
                    }}
                  />
                  {["E", "S", "G"].map((prefix, idx) => (
                    <Scatter
                      key={prefix}
                      name={`Category ${prefix}`}
                      data={data.filter(
                        (d) =>
                          d.ESRS?.startsWith(prefix) &&
                          d["Impact Score"] != null &&
                          d["Financial Risk"] != null &&
                          d["Stakeholder Importance"] != null &&
                          (!filterCategory ||
                            d.ESRS?.startsWith(filterCategory))
                      )}
                      fill={["#1976d2", "#d32f2f", "#388e3c"][idx]}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Topic Details (Grouped)
            </Typography>
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ESRS</TableCell>
                    <TableCell>Main topic</TableCell>
                    <TableCell>Subtopic</TableCell>
                    <TableCell>Sub-subtopic</TableCell>
                    <TableCell>Impact Score</TableCell>
                    <TableCell>Financial Risk</TableCell>
                    <TableCell>Stakeholder Importance</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(groupedData).map(([main, subtopics]) => (
                    <React.Fragment key={main}>
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          sx={{
                            backgroundColor: "#f0f0f0",
                            fontWeight: "bold",
                          }}
                        >
                          {main}
                        </TableCell>
                      </TableRow>
                      {Object.entries(subtopics).map(([sub, rows]) => (
                        <React.Fragment key={sub}>
                          <TableRow>
                            <TableCell
                              colSpan={8}
                              sx={{ backgroundColor: "#fafafa", pl: 4 }}
                            >
                              {sub}
                            </TableCell>
                          </TableRow>
                          {rows.map((row) => (
                            <React.Fragment key={row.id}>
                              <TableRow>
                                <TableCell>{row["ESRS"]}</TableCell>
                                <TableCell>{row["Main topic"]}</TableCell>
                                <TableCell>{row["Subtopic"]}</TableCell>
                                <TableCell>{row["Sub-subtopic"]}</TableCell>
                                <TableCell>{row["Impact Score"]}</TableCell>
                                <TableCell>{row["Financial Risk"]}</TableCell>
                                <TableCell>
                                  {row["Stakeholder Importance"]}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton onClick={() => handleEdit(row)}>
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleDelete(row.id)}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      setExpandedId(
                                        expandedId === row.id ? null : row.id
                                      )
                                    }
                                  >
                                    {expandedId === row.id ? "▲" : "▼"}
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                              {expandedId === row.id && (
                                <TableRow>
                                  <TableCell colSpan={8}>
                                    <Box
                                      sx={{
                                        fontSize: 13,
                                        color: "text.secondary",
                                      }}
                                    >
                                      {Object.entries(row).map(([key, val]) => {
                                        if (
                                          [
                                            "id",
                                            "ESRS",
                                            "Main topic",
                                            "Subtopic",
                                            "Sub-subtopic",
                                            "Impact Score",
                                            "Financial Risk",
                                            "Stakeholder Importance",
                                          ].includes(key)
                                        )
                                          return null;
                                        return (
                                          <div key={key}>
                                            <strong>{key}</strong>: {val ?? "-"}
                                          </div>
                                        );
                                      })}
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )}
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
