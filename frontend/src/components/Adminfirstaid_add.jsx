import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function Adminfirstaid_add({ popupadd, setPopupAdd, addFirstaid }) {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* โค้ดสำหรับ Popup */}
      <Dialog open={popupadd} onClose={() => setPopupAdd(false)}>
        <DialogTitle>Add Firstaid</DialogTitle>
        <DialogContent>
          {/* เพิ่มฟอร์มหรือเนื้อหาที่ต้องการใน popup นี้ */}
          <TextField
            label="Firstaid Name"
            variant="outlined"
            fullWidth
            // เพิ่ม props ที่ต้องการเพื่อรับข้อมูลจากผู้ใช้
          />
          {/* เพิ่มอื่น ๆ ตามต้องการ เช่น TextField, Select, Checkbox, หรือ TextArea */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopupAdd(false)}>Cancel</Button>
          <Button onClick={addFirstaid}>Save</Button>{" "}
          {/* ตัวอย่างการเพิ่มข้อมูล Firstaid */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Adminfirstaid_add;


