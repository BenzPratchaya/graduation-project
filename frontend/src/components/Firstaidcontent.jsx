import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FirstaidVideo from "./Firstaidvideos";

const Firstaidcontent = (props) => {
  return (
    <Row>
      {props.filteredResults.map((card) => (
        <Firstaidcard key={card.id} card={card} />
      ))}
    </Row>
  );
};

const Firstaidcard = ({ card }) => {
  const [showModal, setShowModal] = useState(false);

  const handleWatchVideo = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Col xs={12} sm={4}>
      <Card style={{ width: "100%" }} className="w3-card-4 w3-margin w3-white">
        <Card.Img variant="top" src={`http://localhost:3001/image/${card.image}`} style={{ width: "100%", height: "20rem" }} />
        <Card.Body>
          <Card.Title>{card.name}</Card.Title>
          <Card.Text style={{ height: "10rem" }}>{card.detail}</Card.Text>
          <Button className="w3-button w3-padding-large w3-white w3-border me-2" onClick={handleWatchVideo}>
            ชมวิดีโอ
          </Button>
          <Link to={`/firstaid/${card.id}`}>
            <Button className="w3-button w3-padding-large w3-white w3-border me-2">เรียนรู้เพิ่มเติม</Button>
          </Link>
        </Card.Body>
      </Card>
      <br />
      <FirstaidVideo isOpen={showModal} onClose={handleCloseModal} videoUrl={card.video} />
    </Col>
  );
};

export default Firstaidcontent;
