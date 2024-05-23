import React, { useState } from "react";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Adminsidebar from "./Adminsidebar";

function Admin() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? 240 : 0}px)`,
          ml: open ? `240px` : 0,
          transition: "width 0.3s", // เพิ่ม transition ในการเปลี่ยนความกว้างของ AppBar
        }}
      >
        <Toolbar style={{ background: "white" }}>
          <IconButton onClick={toggleDrawer} sx={{ color: "black" }}>
            <MenuIcon sx={{ width: "24", height: "24" }}></MenuIcon>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: "black" }}
          >
            Admin System
          </Typography>
        </Toolbar>
      </AppBar>
      <Adminsidebar open={open} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          ml: open ? "240px" : "0px",
          width: open ? `calc(100% - 240px)` : "100%",
          transition: "margin-left 0.3s, width 0.3s",
        }}
      >
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        ></Box>
      </Box>
    </>
  );
}

export default Admin;
