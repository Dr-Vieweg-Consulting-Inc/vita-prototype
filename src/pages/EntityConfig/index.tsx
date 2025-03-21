import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// Dummy Data
const availableStandards = [
  "ISSB",
  "CSRD",
  "CSDS",
  "GRI",
  "CDP",
  "SBTi",
  "ESRS",
  "TCFD",
  "SEC",
];

const dummyMembers = [
  { id: 1, name: "Alice Smith", role: "Admin" },
  { id: 2, name: "Bob Brown", role: "Reviewer" },
  { id: 3, name: "Chris Lee", role: "Data Entry" },
];

const EntityConfig: React.FC = () => {
  const [entity, setEntity] = useState({
    name: "",
    industry: "",
    country: "",
    deploymentMode: "cloud",
    esgStandards: [] as string[],
  });

  const [members, setMembers] = useState(dummyMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  // Handle Entity Input Change
  const handleChange = (
    e: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    setEntity({ ...entity, [e.target.name as string]: e.target.value });
  };

  // Handle ESG Standards Selection
  const handleStandardChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEntity({ ...entity, esgStandards: event.target.value as string[] });
  };

  // Invite Member
  const handleInvite = () => {
    if (inviteEmail) {
      setMembers([
        ...members,
        { id: members.length + 1, name: inviteEmail, role: "Pending Invite" },
      ]);
      setInviteOpen(false);
      setInviteEmail("");
    }
  };

  useEffect(() => {
    console.log("implementing....");
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Entity Configuration
      </Typography>

      <Grid container spacing={3}>
        {/* Entity Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6">General Information</Typography>
            <TextField
              label="Entity Name"
              fullWidth
              name="name"
              value={entity.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Industry"
              fullWidth
              name="industry"
              value={entity.industry}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Country"
              fullWidth
              name="country"
              value={entity.country}
              onChange={handleChange}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel
                id="deployment-mode-label"
                // shrink={Boolean(entity.deploymentMode)}
              >
                Deployment Mode
              </InputLabel>
              <Select
                labelId="deployment-mode-label"
                id="deployment-mode"
                name="deploymentMode"
                value={entity.deploymentMode}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Deployment Mode
                </MenuItem>
                <MenuItem value="cloud">Cloud</MenuItem>
                <MenuItem value="on-premise">On-Premise</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* ESG Standards */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6">Select ESG Standards</Typography>
            <FormControl fullWidth margin="normal">
              <Select
                multiple
                value={entity.esgStandards}
                onChange={handleStandardChange}
                renderValue={(selected) => (selected as string[]).join(", ")}
              >
                {availableStandards.map((standard) => (
                  <MenuItem key={standard} value={standard}>
                    <Checkbox
                      checked={entity.esgStandards.includes(standard)}
                    />
                    <ListItemText primary={standard} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Members Management */}
        <Grid item xs={12}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6">Members</Typography>
            <List>
              {members.map((member) => (
                <ListItem
                  key={member.id}
                  secondaryAction={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={member.name} secondary={member.role} />
                </ListItem>
              ))}
            </List>

            <Button
              startIcon={<PersonAddIcon />}
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setInviteOpen(true)}
            >
              Invite Member
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Save & Cancel Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>

      {/* Invite Member Modal */}
      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)}>
        <Box
          sx={{
            width: 400,
            padding: 3,
            margin: "auto",
            mt: 10,
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Invite Member</Typography>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setInviteOpen(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleInvite}>
              Send Invite
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default EntityConfig;
