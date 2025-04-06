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

interface Props {
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
}

export function DataPoints({ data, setData }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [form, setForm] = useState<any | null>(null);

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

  if (form) return <UpdateForm form={form} onSubmit={handleSubmit} />;

  return (
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
                              <IconButton onClick={() => handleDelete(row.id)}>
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
  );
}
