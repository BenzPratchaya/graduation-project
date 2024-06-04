import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import './css/Home.css'
import NavTab from "./NavTab";
import Articlecards from "./Articlecards.jsx";
import Articlehome from "./Articlehome.jsx";
import BannerHome from "./BannerHome.jsx";
import Footer from "./Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical, faNewspaper, faUser, faComments, faVideo, faBookMedical } from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    const storedArticleList = localStorage.getItem("articleList");
    if (storedArticleList) {
      setArticleList(JSON.parse(storedArticleList));
    }
  }, []);

  return (
    <div className="Font">
      <NavTab />
      <BannerHome title="ยินดีต้อนรับสู่เว็บไซต์การปฐมพยาบาลเบื้องต้น" page="" />
      <br />
      <section className="functional">
        <Container>
          <Row>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faBriefcaseMedical} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>ปฐมพยาบาลเบื้องต้น</h3>
              <p>การปฐมพยาบาลในกรณีเบื้องต้น เช่น การให้ CPR, การปฐมพยาบาลในสถานการณ์เฉพาะ</p>
            </Col>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faNewspaper} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>บทความสุขภาพ</h3>
              <p>บทความที่เกี่ยวกับสุขภาพทั่วไป เช่น การดูแลสุขภาพร่างกาย, การบำบัดอาการที่พบบ่อย ความดันโลหิตสูง, เบาหวาน เป็นต้น</p>
            </Col>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faUser} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>แอดมิน</h3>
              <p>เป็นพื้นที่ที่แสดงข้อมูลต่าง ๆ ของเว็บไซต์เพื่อให้ทีมงานสามารถอัพเดทข้อมูลต่าง ๆ ได้</p>
            </Col>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faComments} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>ถูกใจ แสดงความคิดเห็น</h3>
              <p>เป็นพื้นที่ที่ผู้ใช้งานสามารถแสดงความคิดเห็นหรือข้อเสนอแนะต่าง ๆ เกี่ยวกับเว็บไซต์</p>
            </Col>
          </Row>
        </Container>
        <br />
      </section>
      <section className="firstaid" style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <img src="http://localhost:3000/images/first-aid-1080x675.jpeg" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
            </Col>
            <Col xs={12} md={6} style={{ paddingLeft: "20px" }}>
              <h3>การปฐมพยาบาลเบื้องต้น</h3>
              <p>
                เป็นระบบที่ให้ผู้ใช้สามารถสืบค้นข้อมูลเกี่ยวกับวิธีการปฐมพยาบาลเบื้องต้นได้ เนื้อหาและข้อมูลของการปฐมพยาบาลเบื้องต้น
                เป็นข้อมูลซึ่งได้มาจากการสืบค้นและนำมาใช้อ้างอิงเพื่อการปฐมพยาบาลเบื้องต้น
              </p>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <FontAwesomeIcon icon={faVideo} style={{ height: "60px", marginBottom: "10px" }} />
                  <h3>ชมวิดีโอ</h3>
                  <p>วิดีโอการปฐมพยาบาลแต่ละหัวข้อให้เลือกดู</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <FontAwesomeIcon icon={faBookMedical} style={{ height: "60px", marginBottom: "10px" }} />
                  <h3>เรียนรู้เพิ่มเติม</h3>
                  <p>สามารถเรียนรู้ข้อมูลการปฐมพยาบาลเพิ่มเติม</p>
                </div>
              </div>
              <Button href="/firstaid" className="w3-button w3-padding-large w3-white w3-border" style={{ marginTop: "20px" }}>
                การปฐมพยาบาลเบื้องต้น
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <br />
      <Container>
        <h3>บทความเพื่อสุขภาพ</h3>
        <h1>อัพเดทตามสถานการณ์ปัจจุบัน</h1>
        <Button href="/article" className="w3-button w3-padding-large w3-white w3-border">
          บทความเพื่อสุขภาพ
        </Button>
        <br />
        <Articlehome articlelist={articlelist} />
        <Articlecards key={articles.id} cardList={articles} />
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
