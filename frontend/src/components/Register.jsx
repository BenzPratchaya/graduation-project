import React from "react";
import { Button, CssBaseline, TextField, Link, Box, Grid, Typography } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function SignUp() {
  const MySwal = withReactContent(Swal);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("firstName") || !data.get("lastName") || !data.get("email") || !data.get("password")) {
      MySwal.fire({
        title: "ล้มเหลว",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    MySwal.fire({
      title: "ต้องการลงทะเบียนใช่หรือไม่?",
      text: "Do you want to submit the form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลงทะเบียน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const jsonData = {
          email: data.get("email"),
          password: data.get("password"),
          fname: data.get("firstName"),
          lname: data.get("lastName"),
        };

        fetch("http://localhost:3001/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "ok") {
              MySwal.fire({
                title: "ลงทะเบียนสำเร็จ",
                text: "You have successfully registered.",
                icon: "success",
                confirmButtonText: "ยืนยัน",
              }).then(() => {
                window.location = "/login";
              });
            } else {
              let message = "Register failed";
              if (data.message === "Email already exists") {
                message = "Email already exists. Please use a different email.";
              } else if (data.message === "Invalid email format") {
                message = "Invalid email format.";
              }
              MySwal.fire({
                title: "ลงทะเบียนล้มเหลว",
                text: message,
                icon: "error",
                confirmButtonText: "ยืนยัน",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            MySwal.fire({
              title: "Error",
              text: "An error occurred",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div
      className="register"
      style={{
        backgroundImage: "url('http://localhost:3000/images/Gemini_Generated_Image_nvo12snvo12snvo1.jpg')",
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
          xs={10}
          sm={8}
          md={6}
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
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              ลงทะเบียนผู้ใช้
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="ชื่อ"
                    autoFocus
                    InputProps={{
                      sx: {
                        borderRadius: 5,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="นามสกุล"
                    InputProps={{
                      sx: {
                        borderRadius: 5,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="อีเมล"
                    InputProps={{
                      sx: {
                        borderRadius: 5,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    type="password"
                    name="password"
                    label="รหัสผ่าน"
                    InputProps={{
                      sx: {
                        borderRadius: 5,
                      },
                    }}
                  />
                </Grid>
              </Grid>
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
                  ลงทะเบียน
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">มีบัญชีอยู่แล้ว?&nbsp;</Typography>
                    <Link
                      href="/login"
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
                      ลงชื่อเข้าใช้
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
