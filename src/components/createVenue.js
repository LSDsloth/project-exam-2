import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { postVenueFormEventListener } from "./handlers/createVenue";
import { useEffect } from "react";
export const MUICreateVenue = () => {
  useEffect(() => {
    postVenueFormEventListener();
  }, []);

  return (
    <Box component="form" id="postVenueForm">
      <Typography variant="h4" component="h1">
        Create a venue
      </Typography>
      <Stack>
        <FormControl required>
          <label htmlFor="name">Name</label>
          <TextField size="small" variant="outlined" id="name" name="name" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl required>
          <label htmlFor="description">Description</label>
          <TextField multiline rows={4} size="small" id="description" name="description" type="text" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl required>
          <label htmlFor="price">Price</label>
          <TextField size="small" defaultValue="1" id="price" name="price" type="number" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl required>
          <label htmlFor="maxGuests">Max guests</label>
          <TextField size="small" defaultValue="1" id="maxGuests" type="number" name="maxGuests" aria-describedby="my-helper-text" min="1" max="100" />
        </FormControl>
      </Stack>
      <Button variant="outlined" type="submit">
        Submit
      </Button>
    </Box>
  );
};
