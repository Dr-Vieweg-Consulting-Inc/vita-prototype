import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
} from "recharts";

// export * from "./Uploader";

import { MaterialityUploader } from "./Uploader";

export { MaterialityUploader };

const initialData = [
  {
    id: 1,
    esg_topic: "Climate Risk",
    impact_score: 8.5,
    financial_risk: 7.2,
    stakeholder_importance: 9.0,
  },
  {
    id: 2,
    esg_topic: "Labor Practices",
    impact_score: 7.0,
    financial_risk: 6.0,
    stakeholder_importance: 7.5,
  },
  {
    id: 3,
    esg_topic: "Data Privacy",
    impact_score: 6.5,
    financial_risk: 8.0,
    stakeholder_importance: 8.2,
  },
  {
    id: 4,
    esg_topic: "Water Usage",
    impact_score: 5.5,
    financial_risk: 4.5,
    stakeholder_importance: 6.8,
  },
];

const MaterialityAnalysis: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({
    id: null,
    esg_topic: "",
    impact_score: "",
    financial_risk: "",
    stakeholder_importance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.id !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === form.id
            ? {
                ...item,
                ...form,
                impact_score: parseFloat(form.impact_score),
                financial_risk: parseFloat(form.financial_risk),
                stakeholder_importance: parseFloat(form.stakeholder_importance),
              }
            : item
        )
      );
    } else {
      const newItem = {
        id: data.length + 1,
        esg_topic: form.esg_topic,
        impact_score: parseFloat(form.impact_score),
        financial_risk: parseFloat(form.financial_risk),
        stakeholder_importance: parseFloat(form.stakeholder_importance),
      };
      setData([...data, newItem]);
    }
    setForm({
      id: null,
      esg_topic: "",
      impact_score: "",
      financial_risk: "",
      stakeholder_importance: "",
    });
  };

  const handleEdit = (item: any) => {
    setForm({
      id: item.id,
      esg_topic: item.esg_topic,
      impact_score: item.impact_score.toString(),
      financial_risk: item.financial_risk.toString(),
      stakeholder_importance: item.stakeholder_importance.toString(),
    });
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Materiality Analysis
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Materiality Matrix
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="impact_score"
                  name="Impact Score"
                  label={{
                    value: "Impact Score",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="financial_risk"
                  name="Financial Risk"
                  label={{
                    value: "Financial Risk",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <ZAxis
                  dataKey="stakeholder_importance"
                  range={[60, 200]}
                  name="Stakeholder Importance"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Topics" data={data} fill="#1976d2" />
              </ScatterChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {form.id !== null ? "Edit ESG Topic" : "Add ESG Topic"}
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                name="esg_topic"
                label="ESG Topic"
                fullWidth
                margin="normal"
                value={form.esg_topic}
                onChange={handleChange}
              />
              <TextField
                name="impact_score"
                label="Impact Score"
                type="number"
                fullWidth
                margin="normal"
                value={form.impact_score}
                onChange={handleChange}
              />
              <TextField
                name="financial_risk"
                label="Financial Risk"
                type="number"
                fullWidth
                margin="normal"
                value={form.financial_risk}
                onChange={handleChange}
              />
              <TextField
                name="stakeholder_importance"
                label="Stakeholder Importance"
                type="number"
                fullWidth
                margin="normal"
                value={form.stakeholder_importance}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                {form.id !== null ? "Update" : "Add"}
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Topic Details
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ESG Topic</TableCell>
                    <TableCell>Impact</TableCell>
                    <TableCell>Financial Risk</TableCell>
                    <TableCell>Stakeholder Importance</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.esg_topic}</TableCell>
                      <TableCell>{row.impact_score}</TableCell>
                      <TableCell>{row.financial_risk}</TableCell>
                      <TableCell>{row.stakeholder_importance}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
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

export default MaterialityAnalysis;
