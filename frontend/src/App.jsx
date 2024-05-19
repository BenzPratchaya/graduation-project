import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login.jsx";
import Firstaid from "./components/Firstaid.jsx";
import Register from "./components/Register.jsx";
import Employee from "./components/Employee.jsx";
import Home from "./components/Home.jsx";
import Blog from "./components/Blog.jsx";
import Blog2 from "./components/Blog2.jsx";
import Blog3 from "./components/Blog3.jsx";
import Article from "./components/Article.jsx";
import Article1 from "./components/Article1.jsx";
import Article2 from "./components/Article2.jsx";
import Article3 from "./components/Article3.jsx";
import Article4 from "./components/Article4.jsx";
import Article5 from "./components/Article5.jsx";
import Article6 from "./components/Article6.jsx";
import NavTab from "./components/NavTab.jsx";
import Footer from "./components/Footer.jsx";
import Admin from "./components/Admin.jsx";
import Adminusers from "./components/Adminusers.jsx";
import Adminfirstaids from "./components/Adminfirstaids.jsx";
import Adminarticles from "./components/Adminarticles.jsx";
import Admindashboard from "./components/Admindashboard.jsx";
import Articlepage from "./components/Articlepage.jsx";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUserData(token);
  }, []);

  const fetchUserData = (token) => {
    fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/navtab" element={<NavTab />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/firstaid" element={<Firstaid />} />
        <Route path="/article" element={<Article user={user} />} />
        <Route path="/article/article1" element={<Article1 />} />
        <Route path="/article/article2" element={<Article2 />} />
        <Route path="/article/article3" element={<Article3 />} />
        <Route path="/article/article4" element={<Article4 />} />
        <Route path="/article/article5" element={<Article5 />} />
        <Route path="/article/article6" element={<Article6 />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<Admindashboard />} />
        <Route path="/admin/users" element={<Adminusers />} />
        <Route path="/admin/firstaids" element={<Adminfirstaids />} />
        <Route path="/admin/articles" element={<Adminarticles />} />
        <Route path="/article/:articleId" element={<Articlepage user={user}/>} />
       

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog3" element={<Blog3 />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;
