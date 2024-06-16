import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminfirstaidAdd from "./Adminfirstaid_add";
import AdminfirstaidEdit from "./Adminfirstaid_edit";
import Adminsidebar from "./Adminsidebar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Adminfirstaids() {
  const [firstaids, setFirstaids] = useState([]);
  const [open, setOpen] = useState(true);
  const [popupadd, setPopupAdd] = useState(false);
  const [popupedit, setPopupEdit] = useState(false);
  const [selectedFirstaidId, setSelectedFirstaidId] = useState(null);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetch("http://localhost:3001/firstaids")
      .then((res) => res.json())
      .then((result) => {
        setFirstaids(result);
      });
  }, []);

  const deleteFirstaid = (id) => {
    MySwal.fire({
      title: "ต้องการลบข้อมูลหรือไม่?",
      text: "Do you want to delete this first aid entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/firstaid/delete/${id}`);

          // อัปเดตรายการ firstaids ใหม่
          const res = await axios.get("http://localhost:3001/firstaids");
          setFirstaids(res.data);

          MySwal.fire({
            title: "ลบข้อมูลสำเร็จ!",
            text: "Firstaid deleted successfully",
            icon: "success",
            confirmButtonText: "ยืนยัน",
          });
        } catch (error) {
          console.error("Error deleting firstaid:", error);
          MySwal.fire({
            title: "ลบข้อมูลไม่สำเร็จ!",
            text: "Failed to delete firstaid",
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

  const changeUrlVideo = (url) => {
    const embedUrl = url;
    const imageUrl = embedUrl.replace(/www\.youtube\.com\/embed\//, "img.youtube.com/vi/") + "/maxresdefault.jpg";

    return imageUrl;
  };

  // สร้างฟังก์ชันสำหรับแปลงวันที่จากข้อความ ISO 8601 format เป็นวันที่ในรูปแบบที่เข้าใจง่าย
  const formatDate = (isoDateString) => {
    const dateObj = new Date(isoDateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return dateObj.toLocaleDateString("th-TH", options);
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
            <Typography variant="h5" sx={{ fontFamily: "'Kanit', sans-serif" }}>
              List of All Firstaids
            </Typography>
            <Button
              style={{
                background: "var(--blue1)",
                color: "white",
                fontWeight: "bold",
                fontFamily: "'Kanit', sans-serif"
              }}
              onClick={() => setPopupAdd(true)}
            >
              Create Firstaid +
            </Button>
          </Paper>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    ID
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    Detail
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    Video
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    Edit
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {firstaids.map((firstaid) => (
                  <TableRow key={firstaid.id}>
                    <TableCell align="center" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                      {firstaid.id}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                      {firstaid.name}
                    </TableCell>
                    <TableCell align="left" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                      {firstaid.detail}
                    </TableCell>
                    <TableCell align="center">
                      <img src={`http://localhost:3001/image/${firstaid.image}`} style={{ width: "50%" }} alt="" />
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                      {firstaid.video && (firstaid.video.startsWith("http://") || firstaid.video.startsWith("https://")) ? (
                        <a href={firstaid.video} target="_blank" rel="noopener noreferrer">
                          <img src={changeUrlVideo(firstaid.video)} alt="Video" style={{ width: "50%" }} />
                        </a>
                      ) : (
                        "ไม่มีวิดีโอ"
                      )}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                      {formatDate(firstaid.created_date)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        sx={{
                          borderRadius: "10px",
                          backgroundColor: "#e2b031",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#ba8705",
                            color: "black",
                          },
                        }}
                        onClick={() => {
                          setSelectedFirstaidId(firstaid.id);
                          setPopupEdit(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
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
                          deleteFirstaid(firstaid.id);
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
          <AdminfirstaidAdd popupadd={popupadd} setPopupAdd={setPopupAdd} setFirstaids={setFirstaids} />
          <AdminfirstaidEdit
            popupedit={popupedit}
            setPopupEdit={setPopupEdit}
            firstaidId={selectedFirstaidId}
            setFirstaidId={setSelectedFirstaidId}
            setFirstaids={setFirstaids}
          />
        </Box>
      </Box>
    </>
  );
}

export default Adminfirstaids;
