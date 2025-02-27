import React, { useState } from "react";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fakeBackendData = [
  { year: 2020, emissions: 50 },
  { year: 2021, emissions: 45 },
  { year: 2022, emissions: 40 },
  { year: 2023, emissions: 38 },
  { year: 2024, emissions: 35 },
];

const Dashboard = () => {
  const [data, setData] = useState(fakeBackendData);

  const refreshData = () => {
    const newData = data.map((d) => ({
      ...d,
      emissions: d.emissions - Math.random() * 5,
    }));
    setData(newData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        ESG Reporting Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h6">Carbon Emissions Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={refreshData}
              style={{ marginTop: 16 }}
            >
              Refresh Data
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
