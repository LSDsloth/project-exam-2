import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";

export const MUILogin = () => {
  return (
    <Container>
      <Typography variant="h1" component="h1">
        Login
      </Typography>
      <Box component="form">
        <TextField autoFocus label="Email" name="email" />
        <TextField label="Password" />
        <Button variant="contained">Log in</Button>
      </Box>
    </Container>
  );
};
