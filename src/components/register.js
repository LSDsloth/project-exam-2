import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { registerFormEventListener } from "./handlers/register";
// import { registerUser } from "./api/auth/register";
export const MUIRegister = () => {
  useEffect(() => {
    registerFormEventListener();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1">
        Register
      </Typography>
      <Box component="form" id="registerForm">
        <Box>
          <TextField pattern="^[\w]+$" autoFocus type="text" label="Name" name="name" />
          <Typography component="p" variant="caption"></Typography>
        </Box>
        <Box>
          <TextField type="email" name="email" label="Email" />
        </Box>
        <Box>
          <TextField type="password" name="password" label="Password" />
        </Box>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </>
  );
};
