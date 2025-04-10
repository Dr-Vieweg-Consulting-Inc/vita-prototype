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
  // setData: Dispatch<SetStateAction<any[]>>;
}

export function Matrix({ data }: Props) {
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  return (
    <Paper sx={{ p: 2, overflowX: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Materiality Matrix
      </Typography>

      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
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

      <Box sx={{ minWidth: 600 }}>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="Financial Risk"
              name="Financial Risk"
              domain={[0, 10]}
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
              domain={[0, 10]}
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
                      {d["Subtopic"] && <div>Subtopic: {d["Subtopic"]}</div>}
                      {d["Sub-subtopic"] && (
                        <div>Sub-subtopic: {d["Sub-subtopic"]}</div>
                      )}
                      <div>Impact Score: {d["Impact Score"]}</div>
                      <div>Financial Risk: {d["Financial Risk"]}</div>
                      <div>
                        Stakeholder Importance: {d["Stakeholder Importance"]}
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
                    (!filterCategory || d.ESRS?.startsWith(filterCategory))
                )}
                fill={["#1976d2", "#d32f2f", "#388e3c"][idx]}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
