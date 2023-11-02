import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

import { loginFormEventListener } from "./handlers/login";

export const MUILogin = () => {
  useEffect(() => {
    loginFormEventListener();
  }, []);

  async function allListings(url, limit, offset) {
    try {
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?limit=20`, postData);
      console.log(response.url);
      const json = await response.json();

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  allListings();

  return (
    <Container>
      <Typography variant="h1" component="h1">
        Login
      </Typography>
      <Box component="form" id="loginForm">
        <TextField autoFocus type="email" name="email" label="Email" />
        <TextField type="password" name="password" label="Password" />
        <Button type="submit" variant="contained">
          Log in
        </Button>
      </Box>
    </Container>
  );
};
