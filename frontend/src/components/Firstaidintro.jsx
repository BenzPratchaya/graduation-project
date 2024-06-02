import React from "react";
import { Box } from "@mui/material";
import { Container } from "react-bootstrap";

function Firstaidintro() {
  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container>
          <p className="text-center fs-1">เบื้องต้น</p>
          <p className="text-center fs-5">
            การเรียนรู้การปฐมพยาบาลเบื้องต้นเป็นสิ่งสำคัญที่จะช่วยเพิ่มโอกาสในการรักษาชีวิตและลดความเสี่ยงของอุบัติเหตุหรือภัยทางการแพทย์ในสถานการณ์ฉุกเฉินให้มากที่สุดอย่างเป็นไปได้
            การสร้างความเข้าใจและความรู้ในเรื่องนี้จึงเป็นสิ่งสำคัญที่ผู้คนทุกคนควรมีการฝึกฝนอย่างสม่ำเสมอและต่อเนื่องโดยไม่มีข้อยับยั้งใดๆ
            ในการเรียนรู้และฝึกปฐมพยาบาลเบื้องต้นให้เป็นส่วนหนึ่งของการเตรียมความพร้อมในการเผชิญกับสถานการณ์
          </p>
        </Container>
      </Box>
    </div>
  );
}

export default Firstaidintro;
