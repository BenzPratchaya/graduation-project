import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
} from "@mui/material";

function Adminfirstaidupdate() {
  const [firstaidById, setFirstaidById] = useState([]);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/firstaid/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setFirstaidById(result);
      });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setFirstaidById((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
    setFirstaidById((prevState) => ({
      ...prevState,
      detail: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
    setFirstaidById((prevState) => ({
      ...prevState,
      image: event.target.value,
    }));
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.value);
    setFirstaidById((prevState) => ({
      ...prevState,
      video: event.target.value,
    }));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 10 }}>
        <Typography variant="h6" gutterBottom>
          Edit Firstaid
        </Typography>
        <hr />
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                required
                value={firstaidById.name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="detail"
                variant="outlined"
                fullWidth
                required
                value={firstaidById.detail}
                onChange={handleDetailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="image"
                variant="outlined"
                fullWidth
                required
                value={firstaidById.image}
                onChange={handleImageChange}
              />
              {/* <input/> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="video"
                variant="outlined"
                fullWidth
                required
                value={firstaidById.video}
                onChange={handleVideoChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                component={Link}
                to="/admin/firstaids"
                variant="contained"
                fullWidth
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth>
                Edit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default Adminfirstaidupdate;
