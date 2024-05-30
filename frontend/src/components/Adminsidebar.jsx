import React from "react";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faUser,
  faNewspaper,
  faKitMedical,
  faCircleLeft,
  faUsersGear,
  faHouseChimney,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const menu = [
  {
    name: "Dashboard",
    icon: <FontAwesomeIcon icon={faChartSimple} />,
    path: "/admin/dashboard",
  },
  {
    name: "Manage Home",
    icon: <FontAwesomeIcon icon={faHouseChimney} />,
    path: "/admin/home",
  },
  {
    name: "Manage Users",
    icon: <FontAwesomeIcon icon={faUser} />,
    path: "/admin/users",
  },
  {
    name: "Manage Firstaids",
    icon: <FontAwesomeIcon icon={faKitMedical} />,
    path: "/admin/firstaids",
  },
  {
    name: "Manage Articles",
    icon: <FontAwesomeIcon icon={faNewspaper} />,
    path: "/admin/articles",
  },
  {
    name: "Back",
    icon: <FontAwesomeIcon icon={faCircleLeft} />,
    path: "/home",
  },
];

function Adminsidebar({ open, toggleDrawer }) {
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
            <FontAwesomeIcon icon={faBars} sx={{ width: "24", height: "24" }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{ color: "black" }}>
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
          <FontAwesomeIcon
            icon={faUsersGear}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "12px 5px -50px 5px",
              color: "white", // กำหนดสีให้กับ SVG
              width: "35",
              height: "35",
            }}
          />
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
            <Link to={item.path} key={item.name} style={{ textDecoration: "none", color: "white" }}>
              <ListItem disablePadding sx={{ display: "flex", alignItems: "center" }}>
                <ListItemButton>
                  <ListItemIcon style={{ minWidth: "30px", color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} primaryTypographyProps={{ style: { fontSize: "17px" } }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
}

export default Adminsidebar;
