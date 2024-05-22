import React, { useState, useEffect } from "react";
//import axios from "axios";
import { Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Firstaid.css";
//import Modal from "react-modal";
import NavTab from "./NavTab";
import Footer from "./Footer";
import Firstaidintro from "./Firstaidintro";
import Firstaidlist from "./Firstaidlist.jsx";
import Banner from "./Banner.jsx";

export default function Firstaid() {
  const [firstaids, setFirstaids] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedType, setSelectedType] = useState("All"); // เพิ่ม state สำหรับเก็บประเภทปฐมพยาบาลที่ถูกเลือก

  useEffect(() => {
    fetch("http://localhost:3001/firstaids")
      .then((res) => res.json())
      .then((result) => {
        setFirstaids(result);
        setSearchResult(result);
      });
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // เมื่อมีการเลือกประเภทปฐมพยาบาลใหม่ ให้เปลี่ยนค่า selectedType
  };

  // กรอง firstaids โดยใช้ selectedType เพื่อแสดงเฉพาะปฐมพยาบาลที่มีประเภทที่เลือก หรือแสดงทั้งหมดถ้าไม่ได้เลือกประเภท
  const filteredResults =
    selectedType === "All"
      ? searchResult.filter((item) => item)
      : searchResult.filter((item) => item.type_id === parseInt(selectedType));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (!event.target.value) {
      setSearchResult(firstaids);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const result = firstaids.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };

  return (
    <div className="Firstaid">
      <NavTab />
      <Banner title="การปฐมพยาบาลเบื้องต้น" page="Firstaids" />
      {/* ------------------------------------Hero ------------------------------------*/}
      <div>
        {/* ------------------------------------Introduction ------------------------------------*/}
        <Firstaidintro />
        {/* ------------------------------------End Introduction ------------------------------------*/}
        <br />

        <Container>
          <Form
            className="d-flex w3-container w3-padding mb-4"
            onSubmit={handleSearchSubmit}
          >
            <Form.Select
              className="d-flex me-auto w3-padding"
              aria-label="Default select example"
              style={{ width: "30%" }}
              onChange={handleTypeChange} // เพิ่ม onChange เพื่อเรียกใช้ handleTypeChange เมื่อมีการเลือกประเภทใหม่
            >
              <option value="All">เลือกประเภทการปฐมพยาบาล</option>
              <option value="1">บาดแผลที่เกิดจากการแตกหรือฉีกขาด</option>
              <option value="2">บาดแผลที่เกิดจากการบีบหรือกระทบ</option>
              <option value="3">บาดแผลที่เกิดจากการเผาไหม้หรือรอยไฟ</option>
              <option value="4">บาดแผลที่เกิดจากการไหลเลือด</option>
              <option value="5">บาดแผลที่เกิดจากการถูกสัตว์กัด</option>
            </Form.Select>

            <Form.Control
              type="text"
              placeholder="ค้นหา"
              className="d-flex me-2 w3-padding"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: "25%" }}
            />

            <Button variant="outline-success" type="submit">
              ค้นหา
            </Button>
          </Form>
          <Firstaidlist firstaids={firstaids} filteredResults={filteredResults} />
        </Container>
      </div>
      {/* ------------------------------------End Hero ------------------------------------*/}

      {/* ------------------------------------ FOOTER ------------------------------------- */}
      <Footer />
      {/* ---------------------------------- END FOOTER ----------------------------------- */}
    </div>
  );
}
