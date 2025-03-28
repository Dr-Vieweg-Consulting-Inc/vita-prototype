import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EntityConfig from "./pages/EntityConfig";
import Procedures from "./pages/Procedures";
import DataAggregation from "./pages/DataAggregation";
import DataConsolidation from "./pages/DataConsolidation";
import ReportingEngine from "./pages/ReportingEngine";
import Auditing from "./pages/Auditing";
import Publication from "./pages/Publication";
import AuthForms from "./pages/AuthForms";
import Dashboard from "./pages/Dashboard";
import MaterialityAnalysis, {
  MaterialityUploader,
} from "./pages/MaterialityAnalysis";
import { loginRequest } from "./actions";
import { RootState } from "./types";
import { Navbar } from "./components";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginRequest({ email: "user97@example.com", password: "hello" }));
  }, [dispatch]);

  const userStatus = useSelector((state: RootState) => state.user.status);

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  if (!userStatus) return null;

  return (
    <Router>
      {/* <AppBar position="static" color="primary" sx={{ width: "100vw" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="logos/full.png"
              alt="ESG Logo"
              style={{ height: "40px" }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ESG Reporting Accelerator
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button color="inherit" component={Link} to="/entity-config">
              Entity Config
            </Button>
            <Button color="inherit" component={Link} to="/procedures">
              Procedures
            </Button>
            <Button color="inherit" component={Link} to="/data-aggregation">
              Data Aggregation
            </Button>
            <Button color="inherit" component={Link} to="/data-consolidation">
              Data Consolidation
            </Button>
            <Button color="inherit" component={Link} to="/reporting-engine">
              Reporting
            </Button>
            <Button color="inherit" component={Link} to="/auditing">
              Auditing
            </Button>
            <Button color="inherit" component={Link} to="/publication">
              Publication
            </Button>

            <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
              <Avatar alt="User" src="/avatar.png" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  mt: 1.5,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
            >
              <MenuItem>Dashborad</MenuItem>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar> */}

      <Navbar />

      <Container sx={{ width: "100%" }}>
        <Routes>
          <Route path="/entity-config" element={<EntityConfig />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/data-aggregation" element={<DataAggregation />} />
          <Route path="/data-consolidation" element={<DataConsolidation />} />
          <Route path="/reporting-engine" element={<ReportingEngine />} />
          <Route path="/auditing" element={<Auditing />} />
          <Route path="/publication" element={<Publication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/materiality-analysis"
            element={<MaterialityAnalysis />}
          />

          <Route
            path="/materiality-analysis-uploader"
            element={<MaterialityUploader />}
          />

          <Route
            path="/"
            element={
              <Typography variant="h4">
                Welcome to ESG Reporting Accelerator Tool
              </Typography>
            }
          />
          <Route path="/auth" element={<AuthForms />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
