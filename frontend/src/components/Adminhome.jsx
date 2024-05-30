import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Toolbar, Typography, Paper, Button, TextField } from "@mui/material";
import Adminsidebar from "./Adminsidebar";
import Articlehome from "./Articlehome";

function Adminhome({}) {
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
      const notSearchedArticles = articles.filter((article) => searchedArticles.every((searchedArticle) => searchedArticle.id !== article.id));

      // จัดเรียง notSearchedArticles ตาม created_date ในลำดับจากล่าสุดไปเก่าสุด
      const sortedNotSearchedArticles = notSearchedArticles.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

      // รวมอาร์เรย์ที่ถูกค้นหาและไม่ได้ถูกค้นหาเข้าด้วยกัน
      const combinedArticles = [...searchedArticles, ...sortedNotSearchedArticles];

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
            <Paper elevation={1} className="d-flex justify-content-between" sx={{ p: 3, alignItems: "center" }}>
              <Typography variant="h5">Articles</Typography>

              <TextField
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                style={{ width: "70%" }}
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
            {/* -------------------- Articlehome ------------------------ */}
            <Articlehome articlelist={articlelist} />
            {/* -------------------- End Articlehome ------------------------ */}
          </Box>
        </Box>
      </>
    </div>
  );
}

export default Adminhome;
