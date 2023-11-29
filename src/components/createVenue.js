import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Input, InputLabel } from "@mui/material";
import { postVenueFormEventListener } from "./handlers/createVenue";
import { useEffect } from "react";
export const MUICreateVenue = () => {
  useEffect(() => {
    postVenueFormEventListener();
  }, []);

  return (
    <Box component="form" id="postVenueForm">
      <FormControl required>
        <FormLabel>Create a venue</FormLabel>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input id="name" name="name" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input id="description" name="description" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input id="price" name="price" type="number" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl required>
        <InputLabel htmlFor="maxGuests">Max guests</InputLabel>
        <Input id="maxGuests" type="number" name="maxGuests" aria-describedby="my-helper-text" min="1" max="100" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
      <Button type="submit">Submit</Button>
    </Box>
  );
};
