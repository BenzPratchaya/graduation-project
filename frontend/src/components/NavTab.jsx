import React, { useState, useEffect } from "react";
import "./css/NavTab.css";
import { Button, Container, Nav, Navbar, NavDropdown, Modal, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavTab() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ fname: "", lname: "" });
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/authen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setIsLoggedIn(true);
            fetchUserData(token);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserData = (token) => {
    fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
          setFormData({ fname: data.user.fname, lname: data.user.lname });
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = (event) => {
    setIsLoggedIn(false);
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = () => {
    MySwal.fire({
      title: "ต้องการแก้ไขข้อมูลหรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "แก้ไข",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const { fname, lname } = formData;
        const id = user.id;
        fetch(`http://localhost:3001/user/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ id, fname, lname }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              setUser((prevUser) => ({
                ...prevUser,
                fname: fname,
                lname: lname,
              }));
              setShowEditModal(false);
              MySwal.fire("แก้ไขข้อมูลสำเร็จ", "User updated successfully", "success");
              console.log("User updated successfully");
            } else {
              MySwal.fire("แก้ไขข้อมูลไม่สำเร็จ!", "Failed to update user", "error");
              console.error("Failed to update user");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="NavTab">
      {/* ---------------------------------- NAVBAR ---------------------------------- */}
      <Navbar expand="lg" className="bg-body-tertiary fixed-top shadow-sm">
        <Container fluid className="container-nav">
          <Navbar.Brand className="ms-5">
            <img
              src="http://localhost:3000/images/image__firstaid__logo.png"
              alt="Logo"
              style={{
                width: "50px",
                margin: "0px -5px 2px 0px",
              }}
            />
          </Navbar.Brand>
          <Navbar.Brand>ระบบรวบรวมข้อมูลการปฐมพยาบาลเบื้องต้น</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="/home" className="Nav-Link mx-4">
                หน้าแรก
              </Nav.Link>
              <Nav.Link href="/firstaid" className="Nav-Link mx-4">
                การปฐมพยาบาล
              </Nav.Link>
              <Nav.Link href="/article" className="Nav-Link mx-4">
                บทความเพื่อสุขภาพ
              </Nav.Link>
              {user.role_id === 2 && (
                <Nav.Link href="/admin" className="Nav-Link mx-4">
                  แอดมิน
                </Nav.Link>
              )}
            </Nav>
            <Navbar.Brand className="ms-5" style={{ fontSize: "16px" }}>
              {user.fname} {user.lname}
            </Navbar.Brand>
            {isLoggedIn ? (
              <NavDropdown title={<AccountCircleIcon style={{ fontSize: "2rem" }} />} id="navbarScrollingDropdown" className="Nav-Link me-auto mx-2 my-2 my-lg-0">
              <NavDropdown.Item onClick={handleEdit}>แก้ไขข้อมูลส่วนตัว</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>ออกจากระบบ</NavDropdown.Item>
            </NavDropdown>
            ) : (
              <Button href="/login" className="w3-button w3-padding-large w3-white w3-border me-auto mx-2 my-2 my-lg-0 Logout-Button">
                เข้าสู่ระบบ
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      {/* ---------------------------------- END NAVBAR ---------------------------------- */}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#f0f0f0", fontFamily: "'Kanit', sans-serif" }}>
          <Modal.Title>แก้ไขข้อมูลส่วนตัว</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f0f0f0", fontFamily: "'Kanit', sans-serif" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกชื่อ"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                style={{ fontFamily: "'Kanit', sans-serif" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกนามสกุล"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                style={{ fontFamily: "'Kanit', sans-serif" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f0f0f0", fontFamily: "'Kanit', sans-serif" }}>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            แก้ไข
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NavTab;
