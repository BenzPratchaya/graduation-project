import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="Footer">
      {/* ------------------------------------ FOOTER ------------------------------------- */}
      <div class=" ">
        <footer class="text-center text-lg-start text-dark" style={{ backgroundColor: "#ECEFF1" }}>
          <section class="d-flex justify-content-between p-4 text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            <div class="me-5">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="https://www.facebook.com/BenzPratchaya" class="text-white me-4">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.instagram.com/benz_pratch/" class="text-white me-4">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://github.com/BenzPratchaya" class="text-white me-4">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </section>

          <section class="">
            <div class="container text-center text-md-start mt-5">
              <div class="row mt-3">
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h5 class="text-uppercase fw-bold">รวบรวมข้อมูลการปฐมพยาบาลเบื้องต้น</h5>
                  <hr class="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                  <p>เว็บไซต์สำหรับค้นหาข้อมูลการปฐมพยาบาลเพื่อนำไปใช้ในสถานการณ์ฉุกเฉิน.</p>
                </div>
                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h5 class="text-uppercase fw-bold">เกี่ยวกับเรา</h5>
                  <hr class="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                  <p>
                    <a href="/home" style={{ color: "#00000080" }}>
                      หน้าแรก
                    </a>
                  </p>
                  <p>
                    <a href="/firstaid" style={{ color: "#00000080" }}>
                      การปฐมพยาบาล
                    </a>
                  </p>
                  <p>
                    <a href="/article" style={{ color: "#00000080" }}>
                      บทความเพื่อสุขภาพ
                    </a>
                  </p>
                </div>

                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h5 class="text-uppercase fw-bold">Contact</h5>
                  <hr class="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} /> pratchaya.tanapibulphol@gmail.com
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone} /> + 64 145 3596
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div class="text-white text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            © 2024 Copyright :<a class="text-white" href="/home">Collects First Aid System</a>
          </div>
        </footer>
      </div>
      {/* ---------------------------------- END FOOTER ----------------------------------- */}
    </div>
  );
}

export default Footer;
