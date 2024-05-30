import React, { useState, useEffect } from "react";
import axios from "axios";
import { CssBaseline, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, MenuItem, Select } from "@mui/material";

function Adminarticle_add({ popupadd, setPopupAdd, setArticles }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    type_id: "0",
  });

  useEffect(() => {
    if (popupadd) {
      setFormData({
        title: "",
        content: "",
        image: null,
        type_id: "0",
      });
    }
  }, [popupadd]);

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

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("image", formData.image); // ใช้ formData.image ไม่ใช่ formData.file
      data.append("type_id", formData.type_id);

      await axios.post("http://localhost:3001/article/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // อัปเดตรายการ articles ใหม่
      axios
        .get("http://localhost:3001/articles")
        .then((res) => {
          setArticles(res.data);
        })
        .catch((error) => {
          console.error("Error fetching articles: ", error);
        });

      alert("Article created successfully");
      setPopupAdd(false);
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to creating article");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog open={popupadd} onClose={() => setPopupAdd(false)} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Article</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>Title</Typography>
                <TextField variant="outlined" placeholder="Title" fullWidth value={formData.title} onChange={handleInputChange} name="title" />
              </Grid>
              <Grid item xs={4}>
                <Typography>Type</Typography>
                <Select
                  variant="outlined"
                  fullWidth
                  value={formData.type_id}
                  onChange={(event) => setFormData({ ...formData, type_id: event.target.value })}
                >
                  <MenuItem value="0" disabled>
                    * เลือกประเภทบทความ
                  </MenuItem>
                  <MenuItem value="1">บทความเชิงวิชาการ</MenuItem>
                  <MenuItem value="2">บทความแนะนำและเคล็ดลับ</MenuItem>
                  <MenuItem value="3">บทความเกี่ยวกับโรคและการรักษา</MenuItem>
                  <MenuItem value="4">บทความเกี่ยวกับโภชนาการ</MenuItem>
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
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Image</Typography>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    fontSize: "16px",
                    color: "#333",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    padding: "12px",
                    outlineColor: "#007bff",
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
                      src={URL.createObjectURL(formData.image)}
                      alt="Selected"
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
              }}
              onClick={() => setPopupAdd(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                background: "var(--blue1)",
                color: "white",
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

export default Adminarticle_add;
