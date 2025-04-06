import React, { SetStateAction, useState, Dispatch } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateForm } from "./Form";

const statuses = [
  "Approved",
  "In Progress",
  "Pending Review",
  "Rejected",
  "Not Started",
];
const statusColors: Record<string, string> = {
  Approved: "green",
  "In Progress": "blue",
  "Pending Review": "orange",
  Rejected: "red",
  "Not Started": "gray",
};

const getRandomStatus = () =>
  statuses[Math.floor(Math.random() * statuses.length)];

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
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(groupedData).map(([main, subtopics]) => (
                <React.Fragment key={main}>
                  <TableRow>
                    <TableCell
                      colSpan={9}
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
                          colSpan={9}
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
                            <TableCell>
                              <Typography
                                sx={{
                                  color: statusColors[getRandomStatus()],
                                  fontWeight: "bold",
                                }}
                              >
                                {getRandomStatus()}
                              </Typography>
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
                              <TableCell colSpan={9}>
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
                                        "status",
                                      ].includes(key)
                                    )
                                      return null;
                                    return (
                                      <div key={key}>
                                        <strong>{key}</strong>: {val ?? "-"}
                                      </div>
                                    );
                                  })}
                                  <div>
                                    <strong>Assigned To:</strong>{" "}
                                    {row.assignee || "Unassigned"}
                                  </div>
                                  <div>
                                    <strong>Approved By:</strong>{" "}
                                    {row.approvedBy || "Pending"}
                                  </div>
                                  <div>
                                    <strong>Notes:</strong>{" "}
                                    {row.notes || "None"}
                                  </div>
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
