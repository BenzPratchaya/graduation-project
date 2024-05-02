import React, { useState, useEffect } from "react";
import Axios from "axios";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";

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

function Adminusers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  const deleteUser = (id) => {
    const confirmDelete = window.confirm("ต้องการลบผู้ใช้หรือไม่?");
    if (confirmDelete) {
      Axios.delete(`http://localhost:3001/user/delete/${id}`).then(
        (response) => {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      );
      console.log("ลบข้อมูล");
    } else {
      console.log("ยกเลิกการลบ");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - 240px)`,
            ml: `240px`,
          }}
        >
          <Toolbar style={{ background: "white" }}>
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
            },
          }}
          variant="permanent"
          anchor="left"
        >
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
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Paper
            elevation={1}
            className="d-flex justify-content-between"
            sx={{ p: 3 }}
          >
            <Typography variant="h5">List of All Users</Typography>
          </Paper>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">FirstName</TableCell>
                  <TableCell align="left">LastName</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Password</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell align="left">{user.fname}</TableCell>
                    <TableCell align="left">{user.lname}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.password}</TableCell>
                    <TableCell align="left">{user.role_id}</TableCell>
                    <TableCell align="left">
                      <IconButton
                        sx={{
                          borderRadius: "10px",
                          backgroundColor: "#d72e3e",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#fd2e2e",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default Adminusers;
