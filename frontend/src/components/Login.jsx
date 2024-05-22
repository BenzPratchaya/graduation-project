import React, { useState, useEffect } from "react";
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
import "./css/Login.css";

export default function Login() {
  const [user, setUser] = useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

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
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setSnackbarMessage("Login success");
          setUser(data.user);
          setTimeout(() => {
            window.location = "/home";
          }, 1000);
          console.log(user);
        } else {
          setSnackbarMessage("Email or password is incorrect.");
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
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                className="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  sx: {
                    borderRadius: 5,
                  },
                }}
              />
              <TextField
                className="password"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
                  Sign in
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">Not a member?&nbsp;</Typography>
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
                      Sign Up
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
