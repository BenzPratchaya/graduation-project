import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

function Banner(props) {
  return (
    <div>
      <br />
      <section
        className="banner"
        style={{
          backgroundImage: 'url("http://localhost:3000/images/banner.jpg")',
          height: "400px",
          backgroundSize: "cover",
          backgroundPosition: "center 600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          <Link to="/article">
            <FontAwesomeIcon
              icon={faCircleLeft}
              style={{
                color: "rgba(0, 0, 0, 0.3)",
                padding: "10px",
                width: "40px",
                height: "40px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "rgba(0, 0, 0, 0.7)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "rgba(0, 0, 0, 0.3)";
              }}
            />
          </Link>
        </div>
        <div className="container">
          <div className="content">
            <h1 id="banner_Tx" style={{ textAlign: "center", fontSize: "48px", color: "black" }}>
              {props.title}
            </h1>
            <p style={{ textAlign: "center", fontSize: "24px", color: "black" }}>
              Home / Pages / <span>{props.page}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
