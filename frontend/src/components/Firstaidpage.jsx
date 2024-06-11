import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Firstaiddata.css";
import Bannerpage from "./Bannerpage";
import Footer from "./Footer";
import Firstaidpost from "./Firstaidpost";
import Firstaid1 from "../firstaid/Firstaid1";
import Firstaid2 from "../firstaid/Firstaid2";
import Firstaid3 from "../firstaid/Firstaid3";
import Firstaid4 from "../firstaid/Firstaid4";
import Firstaid5 from "../firstaid/Firstaid5";
import Firstaid6 from "../firstaid/Firstaid6";
import Firstaid7 from "../firstaid/Firstaid7";
import Firstaid8 from "../firstaid/Firstaid8";
import Firstaid9 from "../firstaid/Firstaid9";
import Firstaid10 from "../firstaid/Firstaid10";
import Firstaid11 from "../firstaid/Firstaid11";

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

  const selectFirstaidComponent = (firstaidId) => {
    switch (firstaidId) {
      case "1":
        return <Firstaid1 />;
      case "2":
        return <Firstaid2 />;
      case "3":
        return <Firstaid3 />;
      case "4":
        return <Firstaid4 />;
      case "5":
        return <Firstaid5 />;
      case "6":
        return <Firstaid6 />;
      case "7":
        return <Firstaid7 />;
      case "8":
        return <Firstaid8 />;
      case "9":
        return <Firstaid9 />;
      case "10":
        return <Firstaid10 />;
      case "11":
        return <Firstaid11 />;
      default:
        return <div>อยู่ในการตรวจสอบข้อมูลเพิ่มเติม...</div>;
    }
  };

  return (
    <div className="Firstaid1">
      {/* <!-- Banner --> */}
      <div className="banner-container">
        <Bannerpage title="การปฐมพยาบาลเบื้องต้น" page="Firstaids" link="/firstaid"></Bannerpage>
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
            <div className="container container-sm">
              <hr />
              {/* Firstaid */}
              {selectFirstaidComponent(firstaidId)}
              {/* Firstaid */}
            </div>
            <br />
          </Col>

          {/* <!-- Introduction menu --> */}
          <Firstaidpost postList={firstaids} />
          {/* <!-- END Introduction Menu --> */}
        </Row>
      </Container>
      <Footer/>
    </div>
  );
};

export default Firstaidpage;
