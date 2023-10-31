import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { registerFormEventListener } from "./handlers/register";

export const MUIRegister = () => {
  useEffect(() => {
    registerFormEventListener();
  }, []); // The empty dependency array ensures this effect runs after initial rendering.

  return (
    <Container>
      <Typography variant="h1" component="h1">
        Register
      </Typography>
      <Box component="form" id="registerForm">
        <TextField pattern="^[\w]+$" autoFocus type="text" label="Name" name="name" />
        <TextField label="Email" type="email" name="email" />
        <TextField type="password" name="password" label="Password" />
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
    </Container>
  );
};
