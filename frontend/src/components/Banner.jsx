import React from "react";

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
        }}
      >
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
