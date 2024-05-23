import React, { useState, useEffect } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./css/Login.css";

export default function Login() {
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
            title: "Error",
            text: "Email or Password is incorrect.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        MySwal.fire({
          title: "Error",
          text: "An error occurred during login.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div
      className="login"
      style={{
        backgroundImage:
          "url('http://localhost:3000/images/Gemini_Generated_Image_nvo12snvo12snvo1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
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
            <Typography component="h1" variant="h4">
              ลงชื่อเข้าใช้
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                name="email"
                label="อีเมล"
                autocomplete="off"
                InputProps={{
                  sx: {
                    borderRadius: 5,
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
                  },
                }}
              />

              <Grid container sx={{ mt: 2, mb: 2, justifyContent: "center" }}>
                <Button
                  className="rounded-pill"
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "50%",
                    bgcolor: "#4761ff",
                    "&:hover": { bgcolor: "#304ffe" },
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">ไม่มีบัญชีผู้ใช้?&nbsp;</Typography>
                    <Link
                      href="/register"
                      variant="body2"
                      sx={{
                        color: "#4761ff",
                        textDecoration: "none",
                        fontWeight: "bold",
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
