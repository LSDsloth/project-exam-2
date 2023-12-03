import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { registerFormEventListener } from "./handlers/register";
import { Link as LinkRouter } from "react-router-dom";
export const MUIRegister = () => {
  useEffect(() => {
    registerFormEventListener();
  }, []);

  return (
    <Box sx={{ margin: "0 auto", maxWidth: "500px" }}>
      <Typography variant="h4" component="h1">
        Register
      </Typography>

      <Stack component="form" id="registerForm" spacing={2} sx={{ marginY: "16px" }}>
        <Box>
          <TextField sx={{ width: "100%" }} pattern="^[\w]+$" autoFocus type="text" label="Name" name="name" />
        </Box>
        <Box>
          <TextField sx={{ width: "100%" }} type="email" name="email" label="Email" />
        </Box>
        <Box>
          <TextField sx={{ width: "100%" }} type="password" name="password" label="Password" />
          <Link display="block" component={LinkRouter} to="../login">
            <Typography variant="caption">Already have a user?</Typography>
          </Link>
        </Box>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Stack>
    </Box>
  );
};
