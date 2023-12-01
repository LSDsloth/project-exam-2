import { Box, Button, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
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
      <Stack spacing={3} marginY={5}>
        <FormControl required>
          <label htmlFor="name">
            Name{" "}
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField minLength="5" size="small" variant="outlined" id="name" name="name" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl required>
          <label required htmlFor="description">
            Description{" "}
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField multiline rows={4} size="small" id="description" name="description" type="text" aria-describedby="my-helper-text" />
        </FormControl>
        <Stack direction="row">
          <FormControl required>
            <label htmlFor="price">
              Price{" "}
              <Typography color="error" component="span">
                *
              </Typography>
            </label>
            <TextField size="small" defaultValue="1" id="price" name="price" type="number" aria-describedby="my-helper-text" />
            <FormHelperText>Only numbers</FormHelperText>
          </FormControl>
          <FormControl required>
            <label htmlFor="maxGuests">
              Max guests{" "}
              <Typography color="error" component="span">
                *
              </Typography>
            </label>
            <TextField size="small" defaultValue="1" id="maxGuests" type="number" name="maxGuests" aria-describedby="my-helper-text" min="1" max="100" />
            <FormHelperText>Only numbers</FormHelperText>
          </FormControl>
        </Stack>
        <FormControl>
          <label htmlFor="address">Address</label>
          <TextField size="small" id="address" type="text" name="address" aria-describedby="my-helper-text" min="1" max="100" />
        </FormControl>
        <FormControl>
          <label htmlFor="city">City</label>
          <TextField size="small" id="city" type="text" name="city" aria-describedby="my-helper-text" min="1" max="100" />
        </FormControl>
        <FormControl>
          <label htmlFor="zip">Zip</label>
          <TextField size="small" id="maxGuests" type="number" name="zip" aria-describedby="my-helper-text" min="1" max="100" />
        </FormControl>
        <FormControl>
          <label htmlFor="country">Country</label>
          <TextField size="small" id="country" type="text" name="country" aria-describedby="my-helper-text" min="1" max="100" />
        </FormControl>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};
