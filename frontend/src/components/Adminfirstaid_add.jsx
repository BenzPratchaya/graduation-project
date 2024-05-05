import React, { useState, useEffect } from "react";
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

function Adminfirstaid_add({ popupadd, setPopupAdd, firstaids, setFirstaids }) {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [type_id, setType_Id] = useState("0");

  useEffect(() => {
    if (popupadd) {
      setType_Id("0");
    }
  }, [popupadd]);

  const addFirstaid = () => {
    fetch("http://localhost:3001/firstaid/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        detail: detail,
        image: image,
        video: video.replace("watch?v=", "embed/"),
        type_id: type_id,
      }),
    }).then(() => {
      // เมื่อเพิ่มข้อมูลเสร็จสมบูรณ์ ให้ดึงข้อมูล Firstaids ใหม่
      fetch("http://localhost:3001/firstaids")
        .then((res) => res.json())
        .then((result) => {
          setFirstaids(result);
        })
        .catch((error) => {
          console.error("Error fetching firstaids: ", error);
        });
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog
        open={popupadd}
        onClose={() => setPopupAdd(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Firstaid</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* คอลัมน์แรก */}
            <Grid item xs={6}>
              <Typography>Name</Typography>
              <TextField
                variant="outlined"
                placeholder="Name"
                fullWidth
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Detail</Typography>
              <TextField
                variant="outlined"
                placeholder="Detail"
                fullWidth
                onChange={(event) => {
                  setDetail(event.target.value);
                }}
              />
            </Grid>
            {/* คอลัมน์ที่สอง */}
            <Grid item xs={6}>
              <Typography>Image</Typography>
              <TextField
                variant="outlined"
                placeholder="Image"
                fullWidth
                onChange={(event) => {
                  setImage(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Video</Typography>
              <TextField
                variant="outlined"
                placeholder="Video"
                fullWidth
                onChange={(event) => {
                  setVideo(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Type</Typography>
              <Select
                variant="outlined"
                fullWidth
                value={type_id}
                onChange={(event) => {
                  setType_Id(event.target.value);
                }}
              >
                <MenuItem value="0" disabled>
                  * เลือกประเภทการปฐมพยาบาล
                </MenuItem>
                <MenuItem value="1">บาดแผลที่เกิดจากการแตกหรือฉีกขาด</MenuItem>
                <MenuItem value="2">บาดแผลที่เกิดจากการบีบหรือกระทบ</MenuItem>
                <MenuItem value="3">
                  บาดแผลที่เกิดจากการเผาไหม้หรือรอยไฟ
                </MenuItem>
                <MenuItem value="4">บาดแผลที่เกิดจากการไหลเลือด</MenuItem>
                <MenuItem value="5">บาดแผลที่เกิดจากการถูกสัตว์กัด</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopupAdd(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={addFirstaid} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Adminfirstaid_add;
