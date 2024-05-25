import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
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
import MenuIcon from "@mui/icons-material/Menu";
import Adminsidebar from "./Adminsidebar";

function Adminusers() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(true);

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
      axios
        .delete(`http://localhost:3001/user/delete/${id}`)
        .then((response) => {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        });
      console.log("ลบข้อมูล");
    } else {
      console.log("ยกเลิกการลบ");
    }
  };

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
      {/* -------------------- Adminsidebar ------------------------ */}
      <Adminsidebar open={open} />
      {/* -------------------- End Adminsidebar ------------------------ */}
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
