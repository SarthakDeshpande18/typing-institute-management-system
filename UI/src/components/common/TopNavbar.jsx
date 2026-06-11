import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

const TopNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Typing Institute Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;