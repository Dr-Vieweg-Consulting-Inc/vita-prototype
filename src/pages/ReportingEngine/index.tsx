import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Input,
  Checkbox,
} from "@mui/material";

interface Entity {
  id: number;
  name: string;
  type: string;
  industry: string;
  country: string;
  contact_email: string;
}

interface ESGData {
  id: number;
  entityId: number;
  category: string;
  value: string;
  unit: string;
  reportingPeriod: string;
  proofFile?: File | null;
  externalLink?: string;
  standard?: string;
  reviewed?: boolean;
}

const EntityConfig: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [esgData, setEsgData] = useState<ESGData[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<number>(0);
  const [selectedStandard, setSelectedStandard] = useState<string>("");
  const [filteredReports, setFilteredReports] = useState<ESGData[]>([]);

  const handleGenerateReport = () => {
    const reports = esgData.filter(
      (data) =>
        (selectedEntity === 0 || data.entityId === selectedEntity) &&
        (selectedStandard === "" || data.standard === selectedStandard)
    );
    setFilteredReports(reports);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reporting Engine
      </Typography>
      <Typography variant="h6">Generate ESG Reports</Typography>

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

export default EntityConfig;
