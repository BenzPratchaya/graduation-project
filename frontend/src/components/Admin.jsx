import React, { useState } from "react";
import { Box } from "@mui/material";
import Adminsidebar from "./Adminsidebar";

function Admin() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
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
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}></Box>
      </Box>
    </>
  );
}

export default Admin;
