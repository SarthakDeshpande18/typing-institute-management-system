import {
  Dashboard,
  People,
  PersonAdd,
  Logout,
} from "@mui/icons-material";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton
          onClick={() => navigate("/dashboard")}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          onClick={() => navigate("/students")}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>

        <ListItemButton
          onClick={() => navigate("/students/create")}
        >
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary="Add Student" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;