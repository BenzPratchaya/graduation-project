import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./css/Home.css";
import NavTab from "./NavTab";
import Articlecards from "./Articlecards.jsx";
import Articlehome from "./Articlehome.jsx";
import BannerHome from "./BannerHome.jsx";
import Footer from "./Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical, faNewspaper, faUser, faComments } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [articles, setArticles] = useState([]);
  const [articlelist, setArticleList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
      });
  }, []);

  // ดึงข้อมูลจาก localStorage เมื่อโหลดหน้าเว็บครั้งแรก
  useEffect(() => {
    const storedArticleList = localStorage.getItem("articleList");
    if (storedArticleList) {
      setArticleList(JSON.parse(storedArticleList));
    }
  }, []);

  return (
    <div className="Home">
      {/* NAVBAR */}
      <NavTab />
      {/* END NAVBAR */}
      <BannerHome title="ยินดีต้อนรับสู่เว็บไซต์การปฐมพยาบาลเบื้องต้น" page="" />
      <br />
      <section class="functional">
        <div class="container">
          <div class="row">
            <div class="col">
              <FontAwesomeIcon icon={faBriefcaseMedical} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>ปฐมพยาบาลเบื้องต้น</h3>
              <p>การปฐมพยาบาลในกรณีเบื้องต้น เช่น การให้ CPR, การปฐมพยาบาลในสถานการณ์เฉพาะ</p>
            </div>
            <div class="col">
              <FontAwesomeIcon icon={faNewspaper} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>บทความสุขภาพ</h3>
              <p>บทความที่เกี่ยวกับสุขภาพทั่วไป เช่น การดูแลสุขภาพร่างกาย, การบำบัดอาการที่พบบ่อย ความดันโลหิตสูง, เบาหวาน เป็นต้น</p>
            </div>
            <div class="col">
              <FontAwesomeIcon icon={faUser} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>แอดมิน</h3>
              <p>เป็นพื้นที่ที่แสดงข้อมูลต่างๆของเว็บไซต์เพื่อให้ทีมงานสามารถอัพเดทข้อมูลต่างๆได้</p>
            </div>
            <div class="col">
              <FontAwesomeIcon icon={faComments} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>ถูกใจ แสดงความคิดเห็น</h3>
              <p>เป็นพื้นที่ที่ผู้ใช้งานสามารถแสดงความคิดเห็นหรือข้อเสนอแนะต่างๆ เกี่ยวกับเว็บไซต์</p>
            </div>
          </div>
        </div>
        <br />
      </section>
      <section class="firstaid">
        <div class="container">
          <div class="row">
            <div class="firstaid-pic">
              <img src="http://localhost:3000/images/first-aid-1080x675.jpeg" alt="" />
            </div>
            <div class="firstaid-content">
              <h3>การปฐมพยาบาลเบื้องต้น</h3>
              <p>
                เป็นระบบที่ให้ผู้ใช้สามารถสืบค้นหาข้อมูลเกี่ยวกับวิธีกาปฐมพยาบาลเบื้องต้นได้ เนื้อหาและข้อมูลของการปฐมพยาบาลเบื้องต้น
                เป็นข้อมูลซึ่งได้มาจากการสืบค้นและนำมาใช้อ้างอิงเพื่อการปฐมพยาบาลเบื้องต้น
              </p>
              <br />
              <div class="mini-row">
                <div class="mini-col">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAeJJREFUaEPtmuFRwzAMhdVN6CawCUxSmASYhG4CTAJ5d81dIXEulp4dqZHv+IcdfX6S/Wr7IDtrh53xSgLfuuKpsFLhOxF5FZF7ZX9Gty8Rwd/LEMe5NCBD4ccLLCNoxhiAfh8Gep4bzAoMRT8YUZLHAPTTnNJWYKQxFPbYkNYP/wOzAn+KCOrXY4PKRzbwj0fSq5gmgloVTmBniqfCmdKVKVlbw2/D/vgtIqfK72j/ffOUhu2DA8JWBujWe7gb4FExODWYl1Z7uTtggAMWSrdIc5fAo9otwFcDzy1Gcyt67aI11vDSIsSs7xDAzPoOBcyo73DA1voOC3wNXrN/3wRwzdlZWGDtlhUSGFZUa0pCATNsZwhg5hm3a2BtnS65NrfAljoNBcyo0xDAzDp1Dez2iKfVz0Pt2ZS23+aLljZwbb8ELp1LZ0oPN+uMIx5tamr70VPa83UpJokOjNv/Ld91LCmPLRCvAP40aw3DQEBljw23/5PHLVZggLbywZZJhLJQeNIYwOPpYs3RiwWm1Nf0bGntttQi8KZjshRuGiRz8AS+zGamdMFpMbOty1illPbkoKzvUFYZD08OqguwJwfVBdiTg+oG7MVBdQXusnL2/Ah19noGrv1WAmtnLkq/3Sn8CzuQgj3fl0/lAAAAAElFTkSuQmCC"
                    alt=""
                  />
                  <h3>ชมวิดีโอ</h3>
                  <p>วิดีโอการปฐมพยาบาลแต่ละหัวข้อให้เลือกดู</p>
                </div>
                <div class="mini-col mini2">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAcxJREFUaEPtWt1RwzAMVjdhE2ATmASYBJiEMglsAtFdc4TUtfxZim018ksf6ij6fqzYPh1oZ+OwM7wUgK9d8VBYUPiGiB6I6JaI7gZww/cph/fp97kkH0RhDvhUErTTHAZ/Pwkyk5BMoxTwxyCKSlweT6AvzisBzBZ+ld400P+sMgOvVviLiHjtehmPU75vtYAvqftSWiQ2ZilVV7K5SZZOAWb2mMURhjlgOGBjFuD8JIXhgAF4WwZgQVorDCco8AXHC8ArRmEGrRWxjhcKh8LnJyTNLqv7EglLG1g6dxBPXRzwyeYzU5xy8WDHbKHwj/FeI5djACYi1WkJZnC6BgqFlRYf3tK7K1o5QWuWiGm8Laq0aYKxl/7PAOyYUNhgpxWWXjAAWzDWsLM1rNyDnD0OO6Z10QrASgZC4R6nJaVo0ONNFIYy6jDZ/DzcAQP0ygC8pKvmswTR3WFyKGyhsOYyvoPof6+ssfRILQ8weTWA3arL7EiAU00tYvMXTHvDByTA3E/JXXjr4VZlCTA3pHFjmqeh+iwxUG+th2rAc8vwyJ20SweqAXMwT6BNAM8MjtYgnqotpoA9Fa9krlKVdg9wDSAAX52kK0C7U/gXOfvIPeCd3OIAAAAASUVORK5CYII="
                    alt=""
                  />
                  <h3>เรียนรู้เพิ่มเติม</h3>
                  <p>สามารถเรียนรู้ข้อมูลการปฐมพยาบาลเพิ่มเติม</p>
                </div>
              </div>

              <a href="/firstaid" class="firstaid-btn">
                การปฐมพยาบาลเบื้องต้น
              </a>
            </div>
          </div>
        </div>
      </section>

      <br />
      <div class="container">
        <div class="content">
          <h3>บทความเพื่อสุขภาพ</h3>
          <h1>อัพเดทตามสถานการณ์ปัจจุบัน</h1>
          <Button href="/article" className="w3-button w3-padding-large w3-white w3-border me-2">
            บทความเพื่อสุขภาพ
          </Button>
        </div>
        <br />
        <Articlehome articlelist={articlelist} />
        <Articlecards key={articles.id} cardList={articles} />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
