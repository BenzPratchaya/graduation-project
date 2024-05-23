import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

export default function SignUp() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (
      !data.get("firstName") ||
      !data.get("lastName") ||
      !data.get("email") ||
      !data.get("password")
    ) {
      setSnackbarMessage("Please fill in all fields");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

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
          setSnackbarMessage("Register success");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => {
            window.location = "/login";
          }, 1000);
        } else {
          if (data.message === "Email already exists") {
            setSnackbarMessage(
              "Email already exists. Please use a different email."
            );
          } else if (data.message === "Invalid email format") {
            setSnackbarMessage("Invalid email format");
          } else {
            setSnackbarMessage("Register failed");
          }
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setSnackbarMessage("An error occurred");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div
      className="register"
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                    <Typography variant="body2">
                      มีบัญชีอยู่แล้ว?&nbsp;
                    </Typography>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
