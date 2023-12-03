import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

import { Link as LinkRouter } from "react-router-dom";

import { loginFormEventListener } from "./handlers/login";

export const MUILogin = () => {
  useEffect(() => {
    loginFormEventListener();
  }, []);

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
