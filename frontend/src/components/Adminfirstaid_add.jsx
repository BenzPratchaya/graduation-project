import React, { useState, useEffect } from "react";
import axios from "axios";
import { CssBaseline, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Adminfirstaid_add({ popupadd, setPopupAdd, setFirstaids }) {
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    image: null,
    video: "",
    type_id: "0",
  });

  useEffect(() => {
    if (popupadd) {
      setFormData({
        name: "",
        detail: "",
        image: null,
        video: "",
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

    setPopupAdd(false); // Close the Dialog first

    MySwal.fire({
      title: "ต้องการสร้างข้อมูลใช่หรือไม่?",
      text: "Do you want to create this first aid entry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "สร้างข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = new FormData();
          data.append("name", formData.name);
          data.append("detail", formData.detail);
          data.append("image", formData.image); // ใช้ formData.image ไม่ใช่ formData.file
          data.append("video", formData.video.replace("watch?v=", "embed/"));
          data.append("type_id", formData.type_id);

          await axios.post("http://localhost:3001/firstaid/create", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          // อัปเดตรายการ firstaids ใหม่
          axios
            .get("http://localhost:3001/firstaids")
            .then((res) => {
              setFirstaids(res.data);
            })
            .catch((error) => {
              console.error("Error fetching firstaids: ", error);
            });

          MySwal.fire({
            title: "สร้างข้อมูลสำเร็จ!",
            text: "Firstaid created successfully",
            icon: "success",
            confirmButtonText: "ยืนยัน",
          });
        } catch (error) {
          console.error("Error creating firstaid:", error);
          MySwal.fire({
            title: "สร้างข้อมูลไม่สำเร็จ!",
            text: "Failed to create firstaid",
            icon: "error",
            confirmButtonText: "ยืนยัน",
          });
        }
      } else {
        setPopupAdd(true); // Reopen the Dialog if the user cancels
      }
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog open={popupadd} onClose={() => setPopupAdd(false)} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontFamily: "'Kanit', sans-serif" }}>Create Firstaid</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Name</Typography>
                <TextField variant="outlined" placeholder="Name" fullWidth value={formData.name} onChange={handleInputChange} name="name" />
              </Grid>
              <Grid item xs={4}>
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Type</Typography>
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
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Video</Typography>
                <TextField variant="outlined" placeholder="Video" fullWidth value={formData.video} onChange={handleInputChange} name="video" />
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
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>Image</Typography>
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
                fontFamily: "'Kanit', sans-serif",
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

export default Adminfirstaid_add;
