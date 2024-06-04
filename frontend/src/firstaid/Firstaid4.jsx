import React from "react";

function Firstaid4() {
  return (
    <div className="Firstaid1">
      <div className="container w3-padding" style={{ color: "#00000080" }}>
        <p className="header-title">การปฐมพยาบาลบาดแผลกระดูกหัก</p>
        <p>
          &emsp;&emsp;กระดูกหัก คือ การที่กระดูกแยกออกจากกัน ก่อให้เกิดความเจ็บปวด บวม เคลื่อนไหวไม่ได้ หรือเคลื่อนไหวผิดปกติ เนื่องจากอุบัติเหตุ เช่น
          ถูกรถชน หกล้ม ตกจากที่สูง หรือกระดูกเป็นโรคไม่แข็งแรงอยู่แล้ว กระดูกเปราะเมื่อถูกแรงกระทบกระเทือนเพียงเล็กน้อยก็อาจหักได้
        </p>
        <p className="header-content">อุปกรณ์</p>
        <ul>
          <li>
            <p>แผ่นไม้หรือหนังสือหนา ๆ</p>
          </li>
          <li>
            <p>ผ้าพันยึด</p>
          </li>
        </ul>
        <p className="header-title">วิธีการปฐมพยาบาลเบื้องต้น</p>
        <ul>
          <li>
            <p>วางอวัยวะส่วนนั้นบนแผ่นไม้หรือหนังสือหนา ๆ</p>
          </li>
          <li>
            <p>ใช้ผ้าพันยึดไม้ให้เคลื่อนไหว</p>
          </li>
          <li>
            <p>ถ้าเป็นปลายแขนหรือมือใช้ผ้าคล้องคอ</p>
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
export default Firstaid4;
