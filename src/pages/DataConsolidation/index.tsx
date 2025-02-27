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
  const [newEsgData, setNewEsgData] = useState<Omit<ESGData, "id">>({
    entityId: 0,
    category: "",
    value: "",
    unit: "",
    reportingPeriod: "",
    proofFile: null,
    externalLink: "",
    standard: "",
    reviewed: false,
  });

  const handleAddEsgData = () => {
    if (
      !newEsgData.category ||
      !newEsgData.value ||
      newEsgData.entityId === 0 ||
      !newEsgData.reportingPeriod
    )
      return;
    setEsgData([...esgData, { id: esgData.length + 1, ...newEsgData }]);
    setNewEsgData({
      entityId: 0,
      category: "",
      value: "",
      unit: "",
      reportingPeriod: "",
      proofFile: null,
      externalLink: "",
      standard: "",
      reviewed: false,
    });
  };

  const handleReviewToggle = (id: number) => {
    setEsgData(
      esgData.map((data) =>
        data.id === id ? { ...data, reviewed: !data.reviewed } : data
      )
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Data Consolidation
      </Typography>
      <Typography variant="h6">Consolidate ESG Data</Typography>
      <Select
        fullWidth
        value={newEsgData.entityId}
        onChange={(e) =>
          setNewEsgData({ ...newEsgData, entityId: Number(e.target.value) })
        }
      >
        <MenuItem value={0} disabled>
          Select Entity
        </MenuItem>
        {entities.map((entity) => (
          <MenuItem key={entity.id} value={entity.id}>
            {entity.name}
          </MenuItem>
        ))}
      </Select>
      <Select
        fullWidth
        value={newEsgData.standard}
        onChange={(e) =>
          setNewEsgData({ ...newEsgData, standard: e.target.value })
        }
        margin="normal"
      >
        <MenuItem value="">Select Reporting Standard</MenuItem>
        <MenuItem value="CSRD">CSRD</MenuItem>
        <MenuItem value="ESRS">ESRS</MenuItem>
        <MenuItem value="ISSB">ISSB</MenuItem>
        <MenuItem value="SEC">SEC</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEsgData}
        sx={{ mt: 2 }}
      >
        Add ESG Data for Consolidation
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Consolidated ESG Data
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
              <TableCell>Reviewed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {esgData.map((data) => (
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
                <TableCell>
                  <Checkbox
                    checked={data.reviewed}
                    onChange={() => handleReviewToggle(data.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EntityConfig;
