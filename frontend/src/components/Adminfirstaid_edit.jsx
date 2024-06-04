import React, { useState, useEffect } from "react";
import axios from "axios";
import { CssBaseline, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, MenuItem, Select } from "@mui/material";

function Adminfirstaid_edit({ popupedit, setPopupEdit, firstaidId, setFirstaids }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    detail: "",
    image: null,
    video: "",
    type_id: "0",
  });

  useEffect(() => {
    if (firstaidId !== null) {
      fetch(`http://localhost:3001/firstaid/${firstaidId}`)
        .then((res) => res.json())
        .then((result) => {
          setFormData({
            id: result.id,
            name: result.name,
            detail: result.detail,
            image: result.image,
            video: result.video,
            type_id: result.type_id,
          });
        });
    }
  }, [firstaidId]);

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
      data.append("id", formData.id);
      data.append("name", formData.name);
      data.append("detail", formData.detail);
      if (formData.image) {
        data.append("image", formData.image);
      }
      data.append("video", formData.video.replace("watch?v=", "embed/"));
      data.append("type_id", formData.type_id);

      const confirmEdit = window.confirm("ต้องการแก้ไขข้อมูลหรือไม่?");
      if (confirmEdit) {
        await axios.put(`http://localhost:3001/firstaid/update/${firstaidId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        axios
          .get("http://localhost:3001/firstaids")
          .then((res) => {
            setFirstaids(res.data);
          })
          .catch((error) => {
            console.error("Error fetching firstaids: ", error);
          });

        alert("Firstaid updated successfully");
        setPopupEdit(false);
      }
    } catch (error) {
      console.error("Error updating firstaid:", error);
      alert("Failed to updating firstaid");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog open={popupedit} onClose={() => setPopupEdit(false)} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Firstaid</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>Name</Typography>
                <TextField variant="outlined" placeholder="Name" fullWidth value={formData.name} onChange={handleInputChange} name="name" />
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
                    * เลือกประเภทการปฐมพยาบาล
                  </MenuItem>
                  <MenuItem value="1">บาดแผล</MenuItem>
                  <MenuItem value="2">การบาดเจ็บจากสัตว์</MenuItem>
                  <MenuItem value="3">การบาดเจ็บที่จมูก</MenuItem>
                  <MenuItem value="4">ไฟหรือความร้อน</MenuItem>
                  <MenuItem value="5">การบาดเจ็บที่กระดูกและข้อ</MenuItem>
                  <MenuItem value="6">การบาดเจ็บที่กล้ามเนื้อ</MenuItem>
                  <MenuItem value="7">การบาดเจ็บที่ศีรษะ</MenuItem>
                  <MenuItem value="8">เหตุการณ์ฉุกเฉิน</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Typography>Video</Typography>
                <TextField variant="outlined" placeholder="Video" fullWidth value={formData.video} onChange={handleInputChange} name="video" />
              </Grid>
              <Grid item xs={6}>
                <Typography>Detail</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Detail"
                  fullWidth
                  multiline
                  value={formData.detail}
                  onChange={handleInputChange}
                  name="detail"
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

export default Adminfirstaid_edit;
