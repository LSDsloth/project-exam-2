import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link as LinkRouter } from "react-router-dom";

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
    <Box sx={{ margin: "0 auto", maxWidth: "500px" }}>
      <Typography variant="h4" component="h1">
        Login
      </Typography>

      <Stack component="form" id="loginForm" spacing={2} sx={{ marginY: "16px" }}>
        <Box>
          <TextField sx={{ width: "100%" }} autoFocus type="email" name="email" label="Email" />
        </Box>
        <Box>
          <TextField sx={{ width: "100%" }} type="password" name="password" label="Password" />
          <Link display="block" component={LinkRouter} to="../register">
            <Typography variant="caption">Don't have a user?</Typography>
          </Link>
        </Box>
        <Button type="submit" variant="contained">
          Log in
        </Button>
      </Stack>
    </Box>
  );
};
