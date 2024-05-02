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
            ภาวะฉุกเฉิน คือ ภาวะที่ บุคคลที่ได้รับบาดเจ็บหรือมีอาการป่วยกะทันหัน
            ซึ่งมีภาวะคุกคามต่อชีวิต
            และหากไม่ได้รับการรักษาอย่างเร่งด่วนแล้วผู้ป่วยจะมีโอกาสเสียชีวิตได้สูง
            หรือทำให้การบาดเจ็บนั้นรุนแรงขึ้นหรือเกิดภาวะแทรกซ้อนขึ้นได้อย่างฉับไว
            และเมื่อมาถึงสถานพยาบาลแล้วผู้ป่วยฉุกเฉินวิกฤติจะต้องได้รับการตรวจรักษาภายใน
            0 – 4 นาที และหากท่านเจอกับภาวะฉุกเฉินเช่นนี้
            การปฏิบัติเมื่อเกิดภาวะฉุกเฉิน Emergency Response ควรทำอย่างไร
          </p>
        </Container>
      </Box>
    </div>
  );
}

export default Firstaidintro;
