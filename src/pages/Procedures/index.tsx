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
} from "@mui/material";

interface Entity {
  id: number;
  name: string;
  type: string;
  industry: string;
  country: string;
  contact_email: string;
}

interface Procedure {
  id: number;
  entityId: number;
  name: string;
  description: string;
  category: string;
  status: string;
}

const EntityConfig: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [newEntity, setNewEntity] = useState<Omit<Entity, "id">>({
    name: "",
    type: "",
    industry: "",
    country: "",
    contact_email: "",
  });
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [newProcedure, setNewProcedure] = useState<Omit<Procedure, "id">>({
    entityId: 0,
    name: "",
    description: "",
    category: "",
    status: "Pending",
  });

  const handleAddEntity = () => {
    if (!newEntity.name || !newEntity.type || !newEntity.contact_email) return;
    setEntities([...entities, { id: entities.length + 1, ...newEntity }]);
    setNewEntity({
      name: "",
      type: "",
      industry: "",
      country: "",
      contact_email: "",
    });
  };

  const handleAddProcedure = () => {
    if (
      !newProcedure.name ||
      !newProcedure.description ||
      newProcedure.entityId === 0 ||
      !newProcedure.category
    )
      return;
    setProcedures([
      ...procedures,
      { id: procedures.length + 1, ...newProcedure },
    ]);
    setNewProcedure({
      entityId: 0,
      name: "",
      description: "",
      category: "",
      status: "Pending",
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Entity Configuration
      </Typography>
      <Typography variant="h6">Add New Entity</Typography>
      <TextField
        label="Name"
        fullWidth
        value={newEntity.name}
        onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Type"
        fullWidth
        value={newEntity.type}
        onChange={(e) => setNewEntity({ ...newEntity, type: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Industry"
        fullWidth
        value={newEntity.industry}
        onChange={(e) =>
          setNewEntity({ ...newEntity, industry: e.target.value })
        }
        margin="normal"
      />
      <TextField
        label="Country"
        fullWidth
        value={newEntity.country}
        onChange={(e) =>
          setNewEntity({ ...newEntity, country: e.target.value })
        }
        margin="normal"
      />
      <TextField
        label="Contact Email"
        fullWidth
        value={newEntity.contact_email}
        onChange={(e) =>
          setNewEntity({ ...newEntity, contact_email: e.target.value })
        }
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEntity}
        sx={{ mt: 2 }}
      >
        Add Entity
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Add Procedure
      </Typography>
      <Select
        fullWidth
        value={newProcedure.entityId}
        onChange={(e) =>
          setNewProcedure({ ...newProcedure, entityId: Number(e.target.value) })
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
        label="Procedure Name"
        fullWidth
        value={newProcedure.name}
        onChange={(e) =>
          setNewProcedure({ ...newProcedure, name: e.target.value })
        }
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        value={newProcedure.description}
        onChange={(e) =>
          setNewProcedure({ ...newProcedure, description: e.target.value })
        }
        margin="normal"
      />
      <Select
        fullWidth
        value={newProcedure.category}
        onChange={(e) =>
          setNewProcedure({ ...newProcedure, category: e.target.value })
        }
        margin="normal"
      >
        <MenuItem value="">Select Category</MenuItem>
        <MenuItem value="Positioning">
          Positioning (ESG Maturity Ambition)
        </MenuItem>
        <MenuItem value="Stakeholder Analysis">Stakeholder Analysis</MenuItem>
        <MenuItem value="Materiality Analysis">Materiality Analysis</MenuItem>
        <MenuItem value="ESG Target Setting">ESG Target Setting</MenuItem>
        <MenuItem value="Gap Analysis">Gap Analysis</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProcedure}
        sx={{ mt: 2 }}
      >
        Add Procedure
      </Button>
    </Container>
  );
};

export default EntityConfig;
