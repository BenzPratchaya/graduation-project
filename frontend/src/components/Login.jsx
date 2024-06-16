import React, { useState, useEffect } from "react";
import { Button, CssBaseline, TextField, Link, Box, Grid, Typography } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "./css/Home.css";

function Login() {
  const [user, setUser] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("token", data.token);
          MySwal.fire({
            title: "เข้าสู่ระบบสำเร็จ",
            text: "You have successfully logged in.",
            icon: "success",
            confirmButtonText: "ยืนยัน",
          }).then(() => {
            setUser(data.user);
            window.location = "/home";
          });
        } else {
          MySwal.fire({
            title: "เข้าสู่ระบบล้มเหลว",
            text: "Email or Password is incorrect.",
            icon: "error",
            confirmButtonText: "ลองอีกครั้ง",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        MySwal.fire({
          title: "เข้าสู่ระบบล้มเหลว",
          text: "An error occurred during login.",
          icon: "error",
          confirmButtonText: "ลองอีกครั้ง",
        });
      });
  };

  return (
    <div className="Font" style={loginStyle}>
      <Link href="/home" style={linkStyle}>
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
        <Typography sx={{ fontFamily: "'Kanit', sans-serif" }}>กลับสู่หน้าแรก</Typography>
      </Link>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={3}
          className="border rounded-5"
          sx={{
            backgroundColor: "white",
            border: "3px solid",
            borderColor: "secondary.main",
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              my: 12,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ fontFamily: "'Kanit', sans-serif" }}>
              ลงชื่อเข้าใช้
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                name="email"
                label="อีเมล"
                InputProps={{
                  sx: {
                    borderRadius: 5,
                    fontFamily: "'Kanit', sans-serif",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontFamily: "'Kanit', sans-serif",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                name="password"
                label="รหัสผ่าน"
                autoComplete="new-password"
                InputProps={{
                  sx: {
                    borderRadius: 5,
                    fontFamily: "'Kanit', sans-serif",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontFamily: "'Kanit', sans-serif",
                  },
                }}
              />
              <Grid
                container
                sx={{
                  mt: 2,
                  mb: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  className="rounded-pill"
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "50%",
                    bgcolor: "#4761ff",
                    fontFamily: "'Kanit', sans-serif",
                    "&:hover": {
                      bgcolor: "#304ffe",
                    },
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2" sx={{ fontFamily: "'Kanit', sans-serif" }}>
                      ไม่มีบัญชีผู้ใช้?&nbsp;
                    </Typography>
                    <Link
                      href="/register"
                      variant="body2"
                      sx={{
                        color: "#4761ff",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontFamily: "'Kanit', sans-serif",
                        "&:hover": {
                          color: "#304ffe",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      ลงทะเบียน
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default Login;

const loginStyle = {
  backgroundImage: "url('http://localhost:3000/images/login-register.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const linkStyle = {
  position: "absolute",
  top: 10,
  left: 10,
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
};
