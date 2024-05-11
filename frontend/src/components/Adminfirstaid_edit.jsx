import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import {
  CssBaseline,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";

function Adminfirstaid_edit({
  popupedit,
  setPopupEdit,
  firstaids,
  setFirstaids,
}) {
  
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    image: null,
    video: "",
    type_id: "0",
  });

  useEffect(() => {
    if (popupedit) {
      setFormData({
        name: "",
        detail: "",
        image: null,
        video: "",
        type_id: "0",
      });
    }
  }, [popupedit]);

  // const editFirstaid = (id) => {
  //   const confirmEdit = window.confirm("ต้องการแก้ไขข้อมูลหรือไม่?");
  //   if (confirmEdit) {
  //     Axios.put(`http://localhost:3001/firstaid/update/${id}`).then(
  //       (response) => {
  //         setFirstaids(
  //           firstaids.filter((firstaid) => {
  //             return firstaid.id !== id;
  //           })
  //         );
  //       }
  //     );
  //     console.log("แก้ไขข้อมูล");
  //   } else {
  //     console.log("ยกเลิกการแก้ไข");
  //   }
  // };

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
      data.append("name", formData.name);
      data.append("detail", formData.detail);
      data.append("image", formData.image); // ใช้ formData.image ไม่ใช่ formData.file
      data.append("video", formData.video.replace("watch?v=", "embed/"));
      data.append("type_id", formData.type_id);

      await Axios.post("http://localhost:3001/firstaid/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // อัปเดตรายการ firstaids ใหม่
      Axios.get("http://localhost:3001/firstaids")
        .then((res) => {
          setFirstaids(res.data);
        })
        .catch((error) => {
          console.error("Error fetching firstaids: ", error);
        });

      alert("Firstaid created successfully");
      setPopupEdit(false);
    } catch (error) {
      console.error("Error creating firstaid:", error);
      alert("Failed to creating firstaid");
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog
        open={popupedit}
        onClose={() => setPopupEdit(false)}
        fullWidth
        maxWidth="md"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Firstaid</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography>Name</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </Grid>
              <Grid item xs={4}>
                <Typography>Type</Typography>
                <Select
                  variant="outlined"
                  fullWidth
                  value={formData.type_id}
                  onChange={(event) =>
                    setFormData({ ...formData, type_id: event.target.value })
                  }
                >
                  <MenuItem value="0" disabled>
                    * เลือกประเภทการปฐมพยาบาล
                  </MenuItem>
                  <MenuItem value="1">
                    บาดแผลที่เกิดจากการแตกหรือฉีกขาด
                  </MenuItem>
                  <MenuItem value="2">บาดแผลที่เกิดจากการบีบหรือกระทบ</MenuItem>
                  <MenuItem value="3">
                    บาดแผลที่เกิดจากการเผาไหม้หรือรอยไฟ
                  </MenuItem>
                  <MenuItem value="4">บาดแผลที่เกิดจากการไหลเลือด</MenuItem>
                  <MenuItem value="5">บาดแผลที่เกิดจากการถูกสัตว์กัด</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Typography>Video</Typography>
                <TextField
                  variant="outlined"
                  placeholder="Video"
                  fullWidth
                  value={formData.video}
                  onChange={handleInputChange}
                  name="video"
                />
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
