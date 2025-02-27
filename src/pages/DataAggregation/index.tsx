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
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Entity Configuration
      </Typography>
      <Typography variant="h6">Add ESG Data</Typography>
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
      <TextField
        label="Category"
        fullWidth
        value={newEsgData.category}
        onChange={(e) =>
          setNewEsgData({ ...newEsgData, category: e.target.value })
        }
        margin="normal"
      />
      <TextField
        label="Value"
        fullWidth
        value={newEsgData.value}
        onChange={(e) =>
          setNewEsgData({ ...newEsgData, value: e.target.value })
        }
        margin="normal"
      />
      <TextField
        label="Unit"
        fullWidth
        value={newEsgData.unit}
        onChange={(e) => setNewEsgData({ ...newEsgData, unit: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Reporting Period"
        fullWidth
        value={newEsgData.reportingPeriod}
        onChange={(e) =>
          setNewEsgData({ ...newEsgData, reportingPeriod: e.target.value })
        }
        margin="normal"
      />

      <Typography variant="h6" sx={{ mt: 2 }}>
        Attach Proof File
      </Typography>
      <Input
        type="file"
        fullWidth
        onChange={(e) =>
          setNewEsgData({
            ...newEsgData,
            proofFile: e.target.files ? e.target.files[0] : null,
          })
        }
      />

      <TextField
        label="External Link"
        fullWidth
        value={newEsgData.externalLink}
        onChange={(e) =>
          setNewEsgData({ ...newEsgData, externalLink: e.target.value })
        }
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEsgData}
        sx={{ mt: 2 }}
      >
        Add ESG Data
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        ESG Data Records
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
              <TableCell>Proof File</TableCell>
              <TableCell>External Link</TableCell>
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
                <TableCell>
                  {data.proofFile ? data.proofFile.name : "None"}
                </TableCell>
                <TableCell>
                  {data.externalLink ? (
                    <a
                      href={data.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  ) : (
                    "None"
                  )}
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
