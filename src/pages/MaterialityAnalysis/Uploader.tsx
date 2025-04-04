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
  CircularProgress,
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

export const MaterialityUploader: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const parsed = await parseMaterialityExcel(file);
    const flat = flattenMateriality(parsed);
    setData(flat.map((d, i) => ({ id: i + 1, ...d })));
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (form: any) => {
    if (form.id !== undefined && form.id !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === form.id ? { ...item, ...form } : item))
      );
    }
    setForm(null);
  };

  const handleEdit = (item: any) => {
    // const formSection = document.getElementById("form-section");
    // console.log("--- a ---");
    // if (formSection) {
    //   console.log("--- b ---");
    //   formSection.scrollIntoView({ behavior: "smooth" });
    // }
    setForm({ ...item });
  };

  // const formExistsLastRender = useRef<boolean>(false);

  // useEffect(() => {
  //   if (formExistsLastRender.current) return;
  //   if (!form)
  //     return () => {
  //       formExistsLastRender.current = false;
  //     };
  //   const formSection = document.getElementById("form-section");
  //   console.log("--- a ---");

  //   if (formSection) {
  //     console.log("--- b ---");

  //     formSection.scrollIntoView({ behavior: "smooth" });
  //   }

  //   return () => {
  //     formExistsLastRender.current = true;
  //   };
  // }, [form, formExistsLastRender]);

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

      <Stack direction="column" spacing={2} sx={{ my: 2 }}>
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
          {loading && (
            <CircularProgress size={24} color="primary" sx={{ mt: 1 }} />
          )}
        </Stack>
        <TextField
          select
          label="Filter ESG Category"
          value={filterCategory ?? "All"}
          onChange={(e) =>
            setFilterCategory(e.target.value === "All" ? null : e.target.value)
          }
          SelectProps={{ native: true }}
          sx={{ width: 200 }}
        >
          <option value="All">All</option>
          <option value="E">Environment (E)</option>
          <option value="S">Social (S)</option>
          <option value="G">Governance (G)</option>
        </TextField>
      </Stack>

      <UpdateForm form={form} onSubmit={handleSubmit} />

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
