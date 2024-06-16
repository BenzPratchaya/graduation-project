import React, { useState, useEffect } from "react";
import axios from "axios";
import { CssBaseline, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Adminarticle_edit({ popupedit, setPopupEdit, articleId, setArticles }) {
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    image: null,
    type_id: "0",
  });

  useEffect(() => {
    if (articleId !== null) {
      fetch(`http://localhost:3001/article/${articleId}`)
        .then((res) => res.json())
        .then((result) => {
          setFormData({
            id: result.id,
            title: result.title,
            content: result.content,
            image: result.image,
            type_id: result.type_id,
          });
        });
    }
  }, [articleId]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPopupEdit(false);

    MySwal.fire({
      title: "ต้องการแก้ไขข้อมูลหรือไม่?",
      text: "Do you want to edit this article entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "แก้ไขข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = new FormData();
          data.append("id", formData.id);
          data.append("title", formData.title);
          data.append("content", formData.content);
          if (formData.image) {
            data.append("image", formData.image);
          }
          data.append("type_id", formData.type_id);

          await axios.put(`http://localhost:3001/article/update/${articleId}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // Fetch updated articles
          const res = await axios.get("http://localhost:3001/articles");
          setArticles(res.data);

          MySwal.fire({
            title: "แก้ไขข้อมูลสำเร็จ!",
            text: "Article updated successfully",
            icon: "success",
            confirmButtonText: "ยืนยัน",
          });

          setPopupEdit(false);
        } catch (error) {
          console.error("Error updating article:", error);
          MySwal.fire({
            title: "แก้ไขข้อมูลไม่สำเร็จ!",
            text: "Failed to update article",
            icon: "error",
            confirmButtonText: "ยืนยัน",
          });
          setPopupEdit(true);
        }
      } else {
        setPopupEdit(true);
      }
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog open={popupedit} onClose={() => setPopupEdit(false)} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontFamily: "'Kanit', sans-serif" }}>Edit Article</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Title</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Title"
                  fullWidth
                  value={formData.title}
                  onChange={handleInputChange}
                  name="title"
                  InputProps={{
                    sx: {
                      borderRadius: 3,
                      fontFamily: "'Kanit', sans-serif",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "'Kanit', sans-serif",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Type</Typography>
                <Select
                  variant="outlined"
                  fullWidth
                  value={formData.type_id}
                  onChange={(event) => setFormData({ ...formData, type_id: event.target.value })}
                  sx={{
                    borderRadius: 3,
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  <MenuItem value="0" disabled sx={{ fontFamily: "'Kanit', sans-serif" }}>
                    * เลือกประเภทบทความ
                  </MenuItem>
                  <MenuItem value="1" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                    บทความเชิงวิชาการ
                  </MenuItem>
                  <MenuItem value="2" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                    บทความแนะนำและเคล็ดลับ
                  </MenuItem>
                  <MenuItem value="3" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                    บทความเกี่ยวกับโรคและการรักษา
                  </MenuItem>
                  <MenuItem value="4" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                    บทความเกี่ยวกับโภชนาการ
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography>Content</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Content"
                  fullWidth
                  multiline
                  value={formData.content}
                  onChange={handleInputChange}
                  name="content"
                  InputProps={{
                    sx: {
                      borderRadius: 3,
                      fontFamily: "'Kanit', sans-serif",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: "'Kanit', sans-serif",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Image</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "12px",
                    outlineColor: "#007bff",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                />
                {formData.image && (
                  <div>
                    <img
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        margin: "10px 0",
                      }}
                      src={`http://localhost:3001/image/${formData.image}`}
                      alt=""
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                background: "var(--blue1)",
                color: "white",
                fontFamily: "'Kanit', sans-serif",
              }}
              onClick={() => setPopupEdit(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                background: "var(--blue1)",
                color: "white",
                fontFamily: "'Kanit', sans-serif",
              }}
              onClick={handleSubmit}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default Adminarticle_edit;
