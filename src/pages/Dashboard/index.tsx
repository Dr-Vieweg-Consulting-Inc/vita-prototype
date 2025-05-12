import React, { useState } from "react";
import {
  // AppBar,
  // Toolbar,
  Typography,
  // Select,
  // MenuItem,
  Container,
  // Grid,
  // Paper,
  // Button,
  // Box,
  // Tabs,
  // Tab,
  // TextField,
  // IconButton,
  // List,
  // ListItem,
  // ListItemText,
  // ListItemSecondaryAction,
  // Menu,
} from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Members } from "./Members";
import { Overview } from "./Overview";
import { Tabs } from "../../components";
import EntityConfig from "../EntityConfig";

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

const Dashboard: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<number>(
    dummyEntities[0].id
  );

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const [inviteName, setInviteName] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const handleEntityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedEntity(event.target.value as number);
  };

  // const handleTabChange = (newIndex: number) => {
  //   setTabIndex(newIndex);
  // };

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

  const entityReports = dummyReports.filter(
    (report) => report.entityId === selectedEntity
  );
  const complianceStatus = dummyCompliance.find(
    (comp) => comp.entityId === selectedEntity
  );
  const entityMembers = dummyMembers.filter(
    (member) => member.entityId === selectedEntity
  );
  const data = entityReports.map((report) => ({
    name: report.reportingYear,
    value: report.complianceScore,
  }));

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Top Bar */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ESG Reporting Accelerator
          </Typography>
          <Select
            value={selectedEntity}
            onChange={handleEntityChange}
            sx={{ color: "white", backgroundColor: "#333" }}
          >
            {dummyEntities.map((entity) => (
              <MenuItem key={entity.id} value={entity.id}>
                {entity.name}
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar> */}

      {/* Tabs */}
      {/* <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mt: 2 }}>
        <Tab
          label="Overview"
          sx={{
            "&.Mui-selected": { outline: "none" },
            "&:focus": { outline: "none" },
          }}
        />
        <Tab
          label="Members"
          sx={{
            "&.Mui-selected": { outline: "none" },
            "&:focus": { outline: "none" },
          }}
        />
      </Tabs> */}

      <Tabs
        value={tabIndex}
        onChange={(value) => setTabIndex(value)}
        labels={["Overview", "Entity", "Members"]}
      />

      {(() => {
        switch (tabIndex) {
          case 0:
            return <Overview />;
          case 1:
            return <EntityConfig />;
          case 2:
            return <Members />;
          default:
            return null;
        }
      })()}
    </Container>
  );
};

export default Dashboard;
