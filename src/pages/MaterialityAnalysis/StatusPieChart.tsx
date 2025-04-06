import { Box, Paper, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { name: "Not Started", value: 10 },
  { name: "Assigned", value: 15 },
  { name: "In Progress", value: 20 },
  { name: "Under Review", value: 5 },
  { name: "Awaiting Approval", value: 7 },
  { name: "Approved", value: 13 },
  { name: "Rejected", value: 2 },
  { name: "Discontinued", value: 1 },
  { name: "On Hold", value: 4 },
  { name: "Clarification Needed", value: 3 },
  { name: "Archived", value: 6 },
  { name: "Deferred", value: 2 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8A2BE2",
  "#FF6347",
  "#FFD700",
  "#40E0D0",
  "#7B68EE",
  "#ADFF2F",
  "#DC143C",
  "#4682B4",
];

export const StatusPieChart = () => (
  <Paper sx={{ p: 2, overflowX: "auto" }}>
    {/* <Box> */}
    <Typography variant="h6" gutterBottom>
      Progress
    </Typography>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          cx="50%"
          cy="50%"
          outerRadius="100%"
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    {/* </Box> */}
  </Paper>
);
