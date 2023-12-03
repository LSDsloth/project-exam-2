import { Box, Button, CircularProgress, Link, Stack, Typography } from "@mui/material";
import { useApi } from "./api/api";
import { venuesURL } from "./api/constants";
import { Link as RouterLink } from "react-router-dom";

export function MUIVenue() {
  const unusableQueryString = document.location.search;
  const queryString = unusableQueryString.slice(1);
  const { data, isLoading, isError } = useApi(`${venuesURL}/${queryString}`);
  // console.log(data);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error loading venue</div>;
  }

  const venue = data;

  if (!venue) {
    return <Box>Venue not found</Box>;
  }

  return (
    <>
      <Stack spacing={3} sx={{ maxWidth: "700px", margin: "0 auto" }}>
        <Typography component="h1" variant="h3">
          {venue.name}
        </Typography>
        <Box sx={{ width: "100%", aspectRatio: "16 /9", overflow: "hidden", position: "relative", margin: "0 auto" }}>
          <img src={venue.media} alt={venue.name} />
        </Box>
        <Box>
          <Typography>{venue.description}</Typography>
        </Box>
        <Link component={RouterLink} to={`/bookings?venueId=${venue.id}`} width="100%">
          <Button sx={{ width: "100%" }} variant="contained">
            Book now
          </Button>
        </Link>
      </Stack>
    </>
  );
}
