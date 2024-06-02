import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Firstaiddata.css";
import Bannerpage from "./Bannerpage";
import Firstaidpost from "./Firstaidpost";

const Firstaidpage = ({ user }) => {
  const { firstaidId } = useParams();
  const [firstaid, setFirstaid] = useState(null);
  const [firstaids, setFirstaids] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/firstaids")
      .then((res) => res.json())
      .then((result) => {
        setFirstaids(result);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/firstaid/${firstaidId}`)
      .then((response) => setFirstaid(response.data))
      .catch((error) => console.error("Error fetching the firstaid:", error));
  }, [firstaidId]);

  if (!firstaid) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Firstaid1">
      {/* <!-- Banner --> */}
      <div className="banner-container">
        <Bannerpage title="การปฐมพยาบาลเบื้องต้น" page="Firstaids"></Bannerpage>
      </div>
      {/* <!-- END Banner --> */}
      <Container
        className="mt-5"
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col xs={12} sm={8}>
            <div
              className="w3-padding"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 className="fw-bold">{firstaid.name}</h1>
              <hr />
            </div>
            <div className="w3-padding" style={{ textAlign: "center" }}>
              <img
                src={`http://localhost:3001/image/${firstaid.image}`}
                alt="Norway"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
            <div className="w3-padding">
              <h2>{firstaid.detail}</h2>
            </div>

            <div className="container container-sm">
              <hr />
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
            </div>
            <br />
          </Col>

          {/* <!-- Introduction menu --> */}
          <Firstaidpost postList={firstaids} />
          {/* <!-- END Introduction Menu --> */}
        </Row>
      </Container>
    </div>
  );
};

export default Firstaidpage;
