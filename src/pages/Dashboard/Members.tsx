import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Container,
  Grid2 as Grid,
  Paper,
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { retrieveMembers } from "../../api/member";
import { RetrieveMembersResponse, RootState } from "../../types";
import { useSelector } from "react-redux";

const dummyEntities = [
  { id: 1, name: "Company A" },
  { id: 2, name: "Company B" },
  { id: 3, name: "Company C" },
];

const dummyReports = [
  { entityId: 1, reportingYear: 2022, complianceScore: 85, status: "Approved" },
  {
    entityId: 1,
    reportingYear: 2023,
    complianceScore: 90,
    status: "Pending Review",
  },
  { entityId: 2, reportingYear: 2022, complianceScore: 75, status: "Approved" },
];

const dummyCompliance = [
  { entityId: 1, score: 90 },
  { entityId: 2, score: 75 },
  { entityId: 3, score: 88 },
];

const dummyMembers = [
  { entityId: 1, id: 1, name: "Alice Johnson", role: "Admin" },
  { entityId: 1, id: 2, name: "Bob Smith", role: "Reviewer" },
  { entityId: 2, id: 3, name: "Charlie Brown", role: "Data Entry" },
];

export function Members() {
  const [selectedEntity, setSelectedEntity] = useState<number>(
    dummyEntities[0].id
  );
  //   const [tabIndex, setTabIndex] = useState<number>(0);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteName, setInviteName] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  //   const handleEntityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setSelectedEntity(event.target.value as number);
  //   };

  //   const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
  //     setTabIndex(newIndex);
  //   };

  const entityId = useSelector((state: RootState) => state.user.entities[0].id);

  //   console.log("show logged: ", abc);

  const [tmp, setTmp] = useState<RetrieveMembersResponse["members"]>([]);

  useEffect(() => {
    retrieveMembers(entityId).then((data) => {
      //   console.log("show retrieved data: ", data);
      setTmp(data.members);
    });
  }, [entityId]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    memberId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(memberId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  //   const data = entityReports.map((report) => ({
  //     name: report.reportingYear,
  //     value: report.complianceScore,
  //   }));

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Company Members
      </Typography>
      <TextField
        label="Member Name"
        variant="outlined"
        value={inviteName}
        onChange={(e) => setInviteName(e.target.value)}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Member Email"
        variant="outlined"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" color="primary" startIcon={<PersonAddIcon />}>
        Invite
      </Button>

      <List sx={{ mt: 2 }}>
        {tmp.map((member) => (
          <ListItem
            key={member.id}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={(e) => handleMenuOpen(e, member.id)}
                sx={{ "&:focus": { outline: "none" } }}
              >
                <MoreVertIcon />
              </IconButton>
            }
            sx={{ display: "flex", alignItems: "center", width: "100%" }} // Ensure full width
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <Grid sx={{ flex: 3 }}>
                <ListItemText
                  primary={`${member.firstName}, ${member.lastName}`}
                  secondary={member.roles.join(", ")}
                />
              </Grid>
              <Grid sx={{ flex: 3 }}>
                <ListItemText secondary={member.email} />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Assign Role</MenuItem>
        <MenuItem onClick={handleMenuClose}>Suspend</MenuItem>
        <MenuItem onClick={handleMenuClose}>Remove</MenuItem>
      </Menu>
    </Box>
  );
}
