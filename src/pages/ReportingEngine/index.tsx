import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducer";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ReportingEngine: React.FC = () => {
  const esgData = useSelector((state: RootState) => state.esgData);
  const entities = useSelector((state: RootState) => state.entities);

  const [selectedEntity, setSelectedEntity] = useState<number>(0);
  const [selectedStandard, setSelectedStandard] = useState<string>("");
  const [filteredReports, setFilteredReports] = useState(esgData);

  const handleGenerateReport = () => {
    const reports = esgData.filter(
      (data) =>
        (selectedEntity === 0 || data.entityId === selectedEntity) &&
        (selectedStandard === "" || data.standard === selectedStandard)
    );
    setFilteredReports(reports);
  };

  // Aggregate data for visualization
  const categoryCounts = esgData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + parseFloat(item.value);
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(categoryCounts).map((category) => ({
    name: category,
    value: categoryCounts[category],
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ffbb28"];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        ESG Reporting Dashboard
      </Typography>

      {/* Report Filters */}
      <Select
        fullWidth
        value={selectedEntity}
        onChange={(e) => setSelectedEntity(Number(e.target.value))}
      >
        <MenuItem value={0}>All Entities</MenuItem>
        {entities.map((entity) => (
          <MenuItem key={entity.id} value={entity.id}>
            {entity.name}
          </MenuItem>
        ))}
      </Select>

      <Select
        fullWidth
        value={selectedStandard}
        onChange={(e) => setSelectedStandard(e.target.value)}
        margin="normal"
      >
        <MenuItem value="">All Reporting Standards</MenuItem>
        <MenuItem value="CSRD">CSRD</MenuItem>
        <MenuItem value="ESRS">ESRS</MenuItem>
        <MenuItem value="ISSB">ISSB</MenuItem>
        <MenuItem value="SEC">SEC</MenuItem>
      </Select>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateReport}
        sx={{ mt: 2 }}
      >
        Generate Report
      </Button>

      {/* Data Visualization */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" align="center" sx={{ pt: 2 }}>
              ESG Data Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Typography variant="h6" align="center" sx={{ pt: 2 }}>
              ESG Category Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Report Table */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Generated Reports
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Reporting Period</TableCell>
              <TableCell>Standard</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  {entities.find((e) => e.id === data.entityId)?.name ||
                    "Unknown"}
                </TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.value}</TableCell>
                <TableCell>{data.unit}</TableCell>
                <TableCell>{data.reportingPeriod}</TableCell>
                <TableCell>{data.standard || "None"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReportingEngine;
