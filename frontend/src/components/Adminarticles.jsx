import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminarticleAdd from "./Adminarticle_add";
import AdminarticleEdit from "./Adminarticle_edit";
import Adminsidebar from "./Adminsidebar";

function Adminarticles() {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(true);
  const [popupadd, setPopupAdd] = useState(false);
  const [popupedit, setPopupEdit] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
      });
  }, []);

  const deleteArticle = (id) => {
    const confirmDelete = window.confirm("ต้องการลบข้อมูลหรือไม่?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3001/article/delete/${id}`).then((response) => {
        setArticles(
          articles.filter((article) => {
            return article.id !== id;
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
            <Typography variant="h5">List of All Articles</Typography>
            <Button
              style={{
                background: "var(--blue1)",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={() => setPopupAdd(true)}
            >
              Create Article +
            </Button>
          </Paper>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="article table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Content</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Like</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell align="center">{article.id}</TableCell>
                    <TableCell align="center">{article.title}</TableCell>
                    <TableCell align="left">{article.content}</TableCell>
                    <TableCell align="center">
                      <img src={`http://localhost:3001/image/${article.image}`} style={{ width: "50%" }} alt="" />
                    </TableCell>
                    <TableCell align="center">{article.like_count}</TableCell>
                    <TableCell align="center">{formatDate(article.created_date)}</TableCell>
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
                          setSelectedArticleId(article.id);
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
                          deleteArticle(article.id);
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
          <AdminarticleAdd popupadd={popupadd} setPopupAdd={setPopupAdd} setArticles={setArticles} />
          <AdminarticleEdit
            popupedit={popupedit}
            setPopupEdit={setPopupEdit}
            articleId={selectedArticleId}
            setarticleId={setSelectedArticleId}
            setArticles={setArticles}
          />
        </Box>
      </Box>
    </>
  );
}

export default Adminarticles;
