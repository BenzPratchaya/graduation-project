import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import "./css/Article.css";
import { Link } from "react-router-dom";
import Articlepost from "./Articlepost.jsx";
import LikeButton from "./LikeButton.jsx";
import Commentbutton from "./Commentbutton.jsx";

function Articlecontent(props) {
  // const postList = props.contentList;
  const postList = props.articleslike;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(postList);
  const [selectedType, setSelectedType] = useState(""); // เพิ่ม state สำหรับเก็บประเภทบทความที่ถูกเลือก

  useEffect(() => {
    setSearchResult(postList);
  }, [postList]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // เมื่อมีการเลือกประเภทบทความใหม่ ให้เปลี่ยนค่า selectedType
  };

  // กรอง postList โดยใช้ selectedType เพื่อแสดงเฉพาะบทความที่มีประเภทที่เลือก หรือแสดงทั้งหมดถ้าไม่ได้เลือกประเภท
  const filteredResults =
    selectedType === ""
      ? postList
      : searchResult.filter((item) => item.type_id === parseInt(selectedType));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (!event.target.value) {
      setSearchResult(postList);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const result = postList.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  };

  return (
    <div className="w3-container">
      <hr />
      <Container>
        <Form
          className="d-flex w3-container w3-padding"
          onSubmit={handleSearchSubmit}
        >
          <Form.Select
            className="d-flex me-auto w3-padding"
            style={{ width: "30%" }}
            onChange={handleTypeChange} // เพิ่ม onChange เพื่อเรียกใช้ handleTypeChange เมื่อมีการเลือกประเภทใหม่
          >
            <option value="">เลือกประเภทบทความ</option>
            <option value="1">บทความเชิงวิชาการ</option>
            <option value="2">บทความแนะนำและเคล็ดลับ</option>
            <option value="3">บทความเกี่ยวกับโรคและการรักษา</option>
            <option value="4">บทความเกี่ยวกับโภชนาการ</option>
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
        <Row>
          <Col xs={12} sm={8}>
            <Row style={{ justifyContent: "center" }}>
              {filteredResults.length === 0 ? (
                <a>ไม่พบการค้นหา</a>
              ) : (
                filteredResults.map((article) => (
                  <Col xs={12} sm={6} key={article.id} data={article}>
                    {/* คอลัมการ์ด */}
                    <Card
                      style={{ width: "100%" }}
                      className="w3-card-4 w3-margin w3-white"
                    >
                      <Card.Img
                        variant="top"
                        src={article.image}
                        style={{ width: "100%", height: "20rem" }}
                      />
                      <Card.Body>
                        <Card.Title
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          {article.title}
                        </Card.Title>
                        <Card.Text
                          /*className="text-truncate"*/ style={{
                            height: "8rem",
                          }}
                        >
                          {article.content}
                        </Card.Text>
                        <Link
                          component={Link}
                          to={`/article/article${article.id}`}
                        >
                          <Button className="w3-button w3-padding-large w3-white w3-border">
                            Read More
                          </Button>
                        </Link>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <LikeButton
                            id={article.id}
                            article={article}
                            user={props.user}
                          />
                          <Commentbutton />
                        </div>
                      </Card.Body>
                    </Card>
                    <br />
                  </Col>
                ))
              )}
              {/* {props.visibleCards.length < props.contentList.length && (
                <Button
                  className="w3-button w3-padding-large w3-white w3-border"
                  style={{ width: "25%" }}
                  onClick={props.loadMoreCards}
                >
                  Load More
                </Button>
              )} */}
            </Row>
          </Col>

          {/* <!-- Introduction menu --> */}
          <Articlepost postList={postList} />
          {/* <!-- END Introduction Menu --> */}
        </Row>
      </Container>
    </div>
  );
}

export default Articlecontent;
