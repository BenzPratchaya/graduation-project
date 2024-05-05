import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MenuIcon from "@mui/icons-material/Menu";

const menu = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { name: "Manage Users", icon: <PersonIcon />, path: "/admin/users" },
  {
    name: "Manage Firstaids",
    icon: <LocalHospitalIcon />,
    path: "/admin/firstaids",
  },
  { name: "Manage Articles", icon: <ArticleIcon />, path: "/admin/articles" },
  { name: "Back", icon: <ArrowBackIcon />, path: "/home" },
];

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
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            background: `linear-gradient(rgb(84, 103, 225), rgb(71, 101, 236), rgb(73, 79, 243))`,
            display: "flex",
            transition: "transform 0.3s", // เพิ่ม transition ในการเปลี่ยนค่าการแสดงผล (transform) ของ sidebar
            transform: open ? "translateX(0)" : "translateX(-240px)", // เพิ่มการเปลี่ยนแปลงค่าการแสดงผล (transform) ของ sidebar
          },
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <Typography style={{ display: "flex" }}>
          <SupervisedUserCircleIcon
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "12px 5px -50px 5px",
              color: "white", // กำหนดสีให้กับ SVG
              width: "38",
              height: "38",
            }}
          ></SupervisedUserCircleIcon>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "12px 0px -50px 0px",
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Admin System
          </Typography>
        </Typography>
        <Toolbar />
        <Divider />
        <List>
          {menu.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem
                disablePadding
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ListItemButton>
                  <ListItemIcon style={{ minWidth: "30px", color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ style: { fontSize: "17px" } }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
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
