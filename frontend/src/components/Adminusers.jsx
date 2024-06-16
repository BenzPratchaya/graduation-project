import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Adminsidebar from "./Adminsidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Adminusers() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(true);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  const deleteUser = (id) => {
    MySwal.fire({
      title: "ต้องการลบข้อมูลหรือไม่?",
      text: "Do you want to delete this user entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/user/delete/${id}`);

          // อัปเดตรายการ users ใหม่
          const res = await axios.get("http://localhost:3001/users");
          setUsers(res.data);

          MySwal.fire({
            title: "ลบข้อมูลสำเร็จ!",
            text: "User deleted successfully",
            icon: "success",
            confirmButtonText: "ยืนยัน",
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          MySwal.fire({
            title: "ลบข้อมูลไม่สำเร็จ!",
            text: "Failed to delete user",
            icon: "error",
            confirmButtonText: "ยืนยัน",
          });
        }
      }
    });
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* -------------------- Adminsidebar ------------------------ */}
      <Adminsidebar open={open} toggleDrawer={toggleDrawer} />
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
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />
          <Paper elevation={1} className="d-flex justify-content-between" sx={{ p: 3 }}>
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
