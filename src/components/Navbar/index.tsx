import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest, logout } from "../../actions";
import { RootState } from "../../types";

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginRequest({ email: "user97@example.com", password: "hello" }));
  }, [dispatch]);

  const userStatus = useSelector((state: RootState) => state.user.status);
  const userEntities = useSelector((state: RootState) => state.user.entities);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEntitySwitch = (entityId: number) => {
    console.log("Switching to entity:", entityId);
    // TODO: dispatch(setActiveEntity(entityId)) or similar
    setAnchorEl(null);
  };

  if (!userStatus) return null;

  return (
    <AppBar
      position="static"
      // color="primary"
      color="background"
      sx={{ width: "100%" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <img src="logos/full.png" alt="ESG Logo" style={{ height: "40px" }} />
          <Typography variant="h6">ESG Reporting Accelerator</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* <Button color="inherit" component={Link} to="/entity-config">
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
          </Button> */}

          <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
            <Avatar alt="User" src="/avatar.png" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
          >
            <MenuItem onClick={() => navigate("/dashboard")}>
              Dashboard
            </MenuItem>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>

            {userEntities.length > 1 && [
              <Divider key="divider" />,
              <Typography
                key="title"
                variant="caption"
                sx={{ pl: 2, pr: 2, pt: 1, fontWeight: 600 }}
              >
                Switch Company
              </Typography>,
              ...userEntities.map((entity) => (
                <MenuItem
                  key={entity.id}
                  onClick={() => handleEntitySwitch(entity.id)}
                >
                  <ListItemText primary={entity.name} />
                </MenuItem>
              )),
            ]}

            <Divider />
            <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
