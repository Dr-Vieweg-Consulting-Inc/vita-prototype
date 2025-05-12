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
  Collapse,
  Tabs,
  Tab,
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
  dataInsideOut: any[];
  setDataInsideOut: Dispatch<SetStateAction<any[]>>;
  dataOutsideIn: any[];
  setDataOutsideIn: Dispatch<SetStateAction<any[]>>;
}

const statusGlobalArr: string[] = [];

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3005"
    : "https://express-prototype.onrender.com";

export function DataPoints({
  dataInsideOut,
  setDataInsideOut,
  dataOutsideIn,
  setDataOutsideIn,
}: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const data = tabIndex === 0 ? dataInsideOut : dataOutsideIn;
  const setData = tabIndex === 0 ? setDataInsideOut : setDataOutsideIn;
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [form, setForm] = useState<any | null>(null);

  const handleSubmit = (form: any) => {
    if (form.id !== undefined && form.id !== null) {
      setData((prev) =>
        prev.map((item) => (item.id === form.id ? { ...item, ...form } : item))
      );

      console.log("show the submission!!!!!!!", form);

      const { ["Main Topic"]: a, ["Subtopic"]: b, ...essential } = form;

      console.log("updating this id: ", form.topic_id, form);

      fetch(`http://localhost:3005/api/materiality/score/${form.score_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          extent: 4.5,
          scope: 3.0,
          justification: "Updated after stakeholder review",
          is_significant: true,
          ...form,
        }),
      })
        // .then((res) => res.json())
        .then((data) => console.log("Success:", data))
        .catch((err) => console.error("Error:", err));
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

  let index: number = 0;
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Tabs value={tabIndex} onChange={(_, i) => setTabIndex(i)}>
          <Tab label="Inside-Out" />
          <Tab label="Outside-In" />
        </Tabs>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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
                      sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
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
                      {rows.map((row) => {
                        const i = index++;
                        let status: string;
                        if (statusGlobalArr.length < i + 1) {
                          status = getRandomStatus();
                          statusGlobalArr.push(status);
                        } else status = statusGlobalArr[i];
                        return (
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
                                    color: statusColors[status],
                                    fontWeight: "bold",
                                  }}
                                >
                                  {status}
                                </Typography>
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
                            <TableRow>
                              <TableCell colSpan={9}>
                                <Collapse
                                  in={expandedId === row.id}
                                  timeout={500}
                                >
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
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
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
