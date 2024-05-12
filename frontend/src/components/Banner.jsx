import React from "react";
import "./css/BannerHome.css";

function Banner(props) {
  return (
    <div>
      <br />
      <section
        className="banner"
        style={{
          backgroundImage:
            'url("https://kauveryhospital.com/blog/wp-content/uploads/2023/05/Learn-How-to-Perform-First-Aid.jpg")',
            // `url("/images/Gemini_Generated_Image_nvo12snvo12snvo1.jpg")`,
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="content">
            <h1
              id="banner_Tx"
              style={{ textAlign: "center", fontSize: "48px" }}
            >
              {props.title}
            </h1>
            <p style={{ textAlign: "center", fontSize: "24px" }}>
              Home / Pages /{" "}
              <span style={{ color: "#818589" }}>{props.page}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
