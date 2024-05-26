import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  TableContainer,
  Paper,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Adminsidebar from "./Adminsidebar";

function Adminhome({}) {
  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
  };

  const mainArticleStyle = {
    flex: "1 1 40%",
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const sideArticlesStyle = {
    flex: "1 1 35%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const topArticleStyle = {
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const bottomRowStyle = {
    display: "flex",
    gap: "20px",
  };

  const bottomArticleStyle = {
    flex: "1",
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxSizing: "border-box",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    display: "block",
  };

  const contentStyle = {
    padding: "20px",
  };

  const h2Style = {
    margin: "10px 0",
  };

  const h3Style = {
    margin: "10px 0",
  };

  const pStyle = {
    color: "gray",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [articlelist, setArticleList] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
      });
  }, []);

  // ดึงข้อมูลจาก localStorage เมื่อโหลดหน้าเว็บครั้งแรก
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    const storedArticleList = localStorage.getItem("articleList");

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }

    if (storedArticleList) {
      setArticleList(JSON.parse(storedArticleList));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/articlelistsearch", {
        params: { q: searchTerm },
      });
      const searchedArticles = response.data;

      // จัดเก็บค่าที่ไม่ได้ถูกค้นหาไว้ในอาร์เรย์เพิ่มเติม
      const notSearchedArticles = articles.filter((article) =>
        searchedArticles.every(
          (searchedArticle) => searchedArticle.id !== article.id
        )
      );

      // จัดเรียง notSearchedArticles ตาม created_date ในลำดับจากล่าสุดไปเก่าสุด
      const sortedNotSearchedArticles = notSearchedArticles.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );

      // รวมอาร์เรย์ที่ถูกค้นหาและไม่ได้ถูกค้นหาเข้าด้วยกัน
      const combinedArticles = [
        ...searchedArticles,
        ...sortedNotSearchedArticles,
      ];

      setArticleList(combinedArticles);
      localStorage.setItem("searchTerm", searchTerm);
      localStorage.setItem("articleList", JSON.stringify(combinedArticles));
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
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
              sx={{ p: 3, alignItems:"center"}}
            >
              <Typography variant="h5">Articles</Typography>
           
                <TextField
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  style={{width: "70%"}}
                />
                <Button
                  style={{
                    background: "var(--blue1)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={handleSearch}
                >
                  SetHome Article +
                </Button>
            
            </Paper>
            <br />
            <TableContainer>
              <div className="article-container">
                {articlelist && articlelist.length > 0 ? (
                  articlelist.map((article) => (
                    <div key={article.id} className="card">
                      <h3>{article.title}</h3>
                      <p>{article.content}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No articles found</p>
                )}
              </div>
              <div style={containerStyle}>
                {articlelist[0] && (
                  <div style={mainArticleStyle}>
                    <img
                      src={`http://localhost:3001/image/${articlelist[0].image}`}
                      alt="Main Article"
                      style={imageStyle}
                    />
                    <div style={contentStyle}>
                      <h2 style={h2Style}>{articlelist[0].title}</h2>
                      <p style={pStyle}>{articlelist[0].created_date}</p>
                    </div>
                  </div>
                )}
                <div style={sideArticlesStyle}>
                  {articlelist[1] && (
                    <div style={topArticleStyle}>
                      <img
                        src={`http://localhost:3001/image/${articlelist[1].image}`}
                        alt="Top Article"
                        style={imageStyle}
                      />
                      <h3 style={h3Style}>{articlelist[1].title}</h3>
                      <p style={pStyle}>{articlelist[1].created_date}</p>
                    </div>
                  )}
                  <div style={bottomRowStyle}>
                    {articlelist[2] && (
                      <div style={bottomArticleStyle}>
                        <img
                          src={`http://localhost:3001/image/${articlelist[2].image}`}
                          alt="Bottom Left Article"
                          style={imageStyle}
                        />
                        <h3 style={h3Style}>{articlelist[2].title}</h3>
                        <p style={pStyle}>{articlelist[2].created_date}</p>
                      </div>
                    )}
                    {articlelist[3] && (
                      <div style={bottomArticleStyle}>
                        <img
                          src={`http://localhost:3001/image/${articlelist[3].image}`}
                          alt="Bottom Right Article"
                          style={imageStyle}
                        />
                        <h3 style={h3Style}>{articlelist[3].title}</h3>
                        <p style={pStyle}>{articlelist[3].created_date}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TableContainer>
          </Box>
        </Box>
      </>
    </div>
  );
}

export default Adminhome;
