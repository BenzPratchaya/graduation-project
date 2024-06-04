import React from "react";

function Firstaid10() {
  return (
    <div className="Firstaid1">
      <div className="container w3-padding" style={{ color: "#00000080" }}>
        <p className="header-title">การปฐมพยาบาลเมื่อสิ่งแปลกปลอมเข้าสู่ร่างกายผงฝุ่นเข้าตา</p>
        <p className="header-title">วิธีการปฐมพยาบาลเบื้องต้น</p>
        <ul>
          <li>
            <p>เปิดลูกตาเพื่อหาสิ่งแปลกปลอม</p>
          </li>
          <li>
            <p>ให้ล้างตาด้วยน้ำสะอาด</p>
          </li>
          <li>
            <p>ถ้าฝุ่น ผง ติดที่ตาขาว ใช้ปลายผ้าสะอาดหรือปลายไม้พันสำลีเขี่ยเศษผงออก</p>
          </li>
          <li>
            <p>ถ้าฝุ่น ผง ติดแน่นหรือติดตาดำให้ปิดตาด้วยผ้าสะอาด</p>
          </li>
          <li>
            <p>รีบนำส่งโรงพยาบาล</p>
          </li>
        </ul>
        <p className="header-title">ข้อห้ามเมื่อมีสิ่งแปลกปลอมเข้าสู่ร่างกายผงฝุ่นเข้าตา</p>
        <ul>
          <li>
            <p>ห้ามขยี้ตา เพราะจะทำให้ตาระคายเคืองเพิ่มมากขึ้น</p>
          </li>
          <li>
            <p>ห้ามใช้ของมีคมหรือไม้เขี่ยเศษผงที่เข้าตา</p>
          </li>
        </ul>
        <p className="header-title">เว็บไซต์อ้างอิง</p>
        <ul>
          <li>
            <p>นพ.สมประสงค์ เกียรติวัฒนชัย, โรงพยาบาลพริ้นซ์. สุวรรณภูมิ. การปฐมพยาบาลเบื้องต้น.</p>
            <a
              href="https://www.princsuvarnabhumi.com/articles/content-first-aid"
              target="_blank"
              style={{ color: "#00000080", textDecoration: "none" }}
            >
              จากเว็บไซต์: https://www.princsuvarnabhumi.com/articles/content-first-aid
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Firstaid10;
