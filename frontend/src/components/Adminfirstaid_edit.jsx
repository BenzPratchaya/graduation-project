import React, { useState, useEffect } from "react";
import axios from "axios";
import { CssBaseline, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Adminfirstaid_edit({ popupedit, setPopupEdit, firstaidId, setFirstaids }) {
  const MySwal = withReactContent(Swal);
  const [imagePreview, setImagePreview] = useState(null);
  const [firstaidtype, setFirstaidType] = useState([]);
  const [formData, setFormData] = useState({ id: "", name: "", detail: "", image: null, video: "", type_id: "0" });

  const fetchFirstaidData = async () => {
    if (firstaidId !== null) {
      const res = await fetch(`http://localhost:3001/firstaid/${firstaidId}`);
      const result = await res.json();
      setFormData({
        id: result.id,
        name: result.name,
        detail: result.detail,
        image: result.image,
        video: result.video,
        type_id: result.type_id,
      });
      setImagePreview(`http://localhost:3001/image/${result.image}`);
    }
  };

  useEffect(() => {
    fetchFirstaidData();
  }, [firstaidId]);

  useEffect(() => {
    fetch("http://localhost:3001/firstaidtype")
      .then((res) => res.json())
      .then((result) => {
        setFirstaidType(result);
      });
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPopupEdit(false); // Close the Dialog first

    MySwal.fire({
      title: "ต้องการแก้ไขข้อมูลหรือไม่?",
      text: "Do you want to edit this first aid entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "แก้ไขข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
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

          await axios.put(`http://localhost:3001/firstaid/update/${firstaidId}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // อัปเดตรายการ firstaids ใหม่
          const res = await axios.get("http://localhost:3001/firstaids");
          setFirstaids(res.data);

          MySwal.fire({
            title: "แก้ไขข้อมูลสำเร็จ!",
            text: "Firstaid updated successfully",
            icon: "success",
            confirmButtonText: "ยืนยัน",
          });
        } catch (error) {
          console.error("Error updating firstaid:", error);
          MySwal.fire({
            title: "แก้ไขข้อมูลไม่สำเร็จ!",
            text: "Failed to update firstaid",
            icon: "error",
            confirmButtonText: "ยืนยัน",
          });
          setPopupEdit(true); // Reopen the Dialog if update fails
        }
      } else {
        setPopupEdit(true); // Reopen the Dialog if the user cancels
      }
    });
  };

  const handleClose = () => {
    setPopupEdit(false);
    fetchFirstaidData(); // Reset form data and image preview when closing
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog open={popupedit} onClose={handleClose} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontFamily: "'Kanit', sans-serif" }}>Edit Firstaid</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Name</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
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
                    * เลือกประเภทการปฐมพยาบาล
                  </MenuItem>
                  {firstaidtype.map((type) => (
                    <MenuItem key={type.id} value={type.id} sx={{ fontFamily: "'Kanit', sans-serif" }}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Video</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Video"
                  fullWidth
                  value={formData.video}
                  onChange={handleInputChange}
                  name="video"
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
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Detail</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Detail"
                  fullWidth
                  multiline
                  value={formData.detail}
                  onChange={handleInputChange}
                  name="detail"
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
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Image</Typography>
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
                {imagePreview && (
                  <div>
                    <img
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        margin: "10px 0",
                      }}
                      src={imagePreview}
                      alt="Preview"
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
              onClick={handleClose}
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

export default Adminfirstaid_edit;
