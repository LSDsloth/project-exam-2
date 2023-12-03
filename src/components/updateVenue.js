import { Box, Button, CircularProgress, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useApi } from "./api/api";
import { venuesURL } from "./api/constants";
import { updateVenueFormEventListener } from "./handlers/updateVenue";

export const MUIUpdateVenue = () => {
  const [name, setName] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("1");
  const [hasFormError, setHasFormError] = useState(false);
  const venueId = window.location.search.slice(1);

  const { data, isLoading, isError } = useApi(`${venuesURL}/${venueId}`);

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

  const updateVenueFormRef = useRef(null);

  useEffect(() => {
    console.log("Inside useEffect in MUIUpdateVenue. VenueId:", venueId);
    if (venueId) {
      updateVenueFormEventListener(setHasFormError, venueId);
    }
  }, [venueId]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", position: "absolute", left: "50%", top: "50%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Stack spacing={3} marginY={5}>
      <Typography variant="h4" component="h1">
        Update {data?.name}
      </Typography>
      <Box component="form" id="updateVenueForm" ref={updateVenueFormRef}>
        <FormControl required>
          <label htmlFor="name">
            Name
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField
            placeholder="Name of venue"
            defaultValue={data?.name}
            autoFocus
            onChange={handleNameChange}
            error={name.trim() === ""}
            helperText={name.trim() === "" ? "Cannot be blank" : ""}
            minLength="5"
            size="small"
            variant="outlined"
            id="name"
            name="name"
          />
        </FormControl>
        <FormControl required>
          <label required htmlFor="description">
            Description
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField
            placeholder="Describe the place..."
            defaultValue={data?.description}
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
          <TextField defaultValue={data?.media} placeholder="www.example.com" size="small" id="media" type="url" name="media" />
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
              defaultValue={data?.price}
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
              defaultValue={data?.maxGuests}
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
          <TextField defaultValue={data?.location?.address || ""} size="small" id="address" type="text" name="address" />
        </FormControl>
        <FormControl>
          <label htmlFor="city">City</label>
          <TextField defaultValue={data?.location?.city || ""} size="small" id="city" type="text" name="city" />
        </FormControl>
        <FormControl>
          <label htmlFor="zip">Zip</label>
          <TextField defaultValue={data?.location?.zip || ""} size="small" id="maxGuests" type="number" name="zip" />
        </FormControl>
        <FormControl>
          <label htmlFor="country">Country</label>
          <TextField defaultValue={data?.location?.country || ""} size="small" id="country" type="text" name="country" />
        </FormControl>
        <Button variant="contained" type="submit">
          Update
        </Button>
        <FormHelperText sx={{ color: "error.main", fontSize: "16px", display: hasFormError ? "block" : "none" }}>Form has error</FormHelperText>
      </Box>
    </Stack>
  );
};
