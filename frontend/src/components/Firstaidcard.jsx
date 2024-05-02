import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FirstaidVideo from "./Firstaidvideos";

const Firstaidcard = ({ id, name, detail, image, videoUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const handleWatchVideo = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Col xs={12} sm={4}>
      <Card style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src={image}
          style={{ width: "100%", height: "20rem" }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text style={{ height: "10rem" }}>{detail}</Card.Text>
          <Button
            className="w3-button w3-padding-large w3-white w3-border me-2"
            onClick={handleWatchVideo}
          >
            ชมวิดีโอ
          </Button>
          <Link component={Link} to={`/firstaids/firstaid${id}`}>
          <Button
            className="w3-button w3-padding-large w3-white w3-border me-2">
            เรียนรู้เพิ่มเติม
          </Button>
          </Link>
        </Card.Body>
      </Card>
      <br />
      <FirstaidVideo
        isOpen={showModal}
        onClose={handleCloseModal}
        videoUrl={videoUrl}
      />
    </Col>
  );
};

export default Firstaidcard;
