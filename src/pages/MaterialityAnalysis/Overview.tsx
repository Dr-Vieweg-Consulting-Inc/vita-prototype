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
  Grid2,
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
import { Matrix } from "./Matrix";
import { StatusPieChart } from "./StatusPieChart";

// const dummyEntities = [
//   { id: 1, name: "Company A" },
//   { id: 2, name: "Company B" },
//   { id: 3, name: "Company C" },
// ];

// const dummyReports = [
//   { entityId: 1, reportingYear: 2022, complianceScore: 85, status: "Approved" },
//   {
//     entityId: 1,
//     reportingYear: 2023,
//     complianceScore: 90,
//     status: "Pending Review",
//   },
//   { entityId: 2, reportingYear: 2022, complianceScore: 75, status: "Approved" },
// ];

// const dummyCompliance = [
//   { entityId: 1, score: 90 },
//   { entityId: 2, score: 75 },
//   { entityId: 3, score: 88 },
// ];

// const dummyMembers = [
//   { entityId: 1, id: 1, name: "Alice Johnson", role: "Admin" },
//   { entityId: 1, id: 2, name: "Bob Smith", role: "Reviewer" },
//   { entityId: 2, id: 3, name: "Charlie Brown", role: "Data Entry" },
// ];

// const entityReports = dummyReports.filter((report) => report.entityId === 0);

// interface Props {
//   data: any[];
//   //   setData: Dispatch<SetStateAction<any[]>>;
// }

interface Props {
  dataInsideOut: any[];
  dataOutsideIn: any[];
}

export function Overview({ dataInsideOut, dataOutsideIn }: Props) {
  return (
    <Box width="100%">
      <Grid container spacing={4} direction="column">
        <Grid
          container
          direction="row"
          spacing={3}
          sx={{ px: 2, mx: "auto", maxWidth: "100%", mt: 2 }}
        >
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Total Reports</Typography>
              <Typography variant="h4">{105}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Pending Reviews</Typography>
              <Typography variant="h4">{12}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Compliance %</Typography>
              <Typography variant="h4">{5 || 0}%</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Matrix dataInsideOut={dataInsideOut} dataOutsideIn={dataOutsideIn} />
        </Grid>

        <Grid item xs={12}>
          <StatusPieChart />
        </Grid>
      </Grid>
    </Box>
  );
}
