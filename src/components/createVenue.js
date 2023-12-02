import { Box, Button, FormControl, FormHelperText, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { postVenueFormEventListener } from "./handlers/createVenue";
import { useEffect, useState } from "react";
export const MUICreateVenue = () => {
  const [name, setName] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("1");
  const [hasFormError, setHasFormError] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleMaxGuestsChange(e) {
    setMaxGuests(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  useEffect(() => {
    postVenueFormEventListener(setHasFormError);
  }, []);

  return (
    <Box component="form" id="postVenueForm">
      <Typography variant="h4" component="h1">
        Create a venue
      </Typography>
      <Stack spacing={3} marginY={5}>
        <FormControl required>
          <label htmlFor="name">
            Name
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField autoFocus onChange={handleNameChange} error={name.trim() === ""} helperText={name.trim() === "" ? "Cannot be blank" : ""} minLength="5" size="small" variant="outlined" id="name" name="name" aria-describedby="my-helper-text" />
        </FormControl>
        <FormControl required>
          <label required htmlFor="description">
            Description
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField
            onChange={handleDescriptionChange}
            error={description.trim() === ""}
            helperText={description.trim() === "" ? "Cannot be blank" : ""}
            multiline
            rows={4}
            size="small"
            id="description"
            name="description"
            type="text"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl>
          <label htmlFor="image">Image</label>
          <TextField size="small" id="image" type="url" name="media" startAdornment={<InputAdornment position="start">URL:</InputAdornment>} />
        </FormControl>
        <Stack direction="row">
          <FormControl required>
            <label htmlFor="price">
              Price
              <Typography color="error" component="span">
                *
              </Typography>
            </label>
            <TextField
              onChange={handlePriceChange}
              error={price.trim() <= 0 || price.trim() === ""}
              helperText={price.trim() <= 0 || price.trim() === "" ? "Must be at least 1 guest" : ""}
              size="small"
              defaultValue="1"
              id="price"
              name="price"
              type="number"
              aria-describedby="my-helper-text"
            />
          </FormControl>
          <FormControl required>
            <label htmlFor="maxGuests">
              Max guests
              <Typography color="error" component="span">
                *
              </Typography>
            </label>
            <TextField
              onChange={handleMaxGuestsChange}
              error={maxGuests.trim() <= 0 || maxGuests.trim() === ""}
              helperText={maxGuests.trim() < 0 || maxGuests.trim() === "" ? "Must be at least 1 guest" : ""}
              size="small"
              defaultValue="1"
              id="maxGuests"
              type="number"
              name="maxGuests"
              aria-describedby="my-helper-text"
              min="1"
              max="100"
            />
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
        <FormHelperText sx={{ color: "error.main", fontSize: "16px", display: hasFormError ? "block" : "none" }}>Form has error</FormHelperText>
      </Stack>
    </Box>
  );
};
