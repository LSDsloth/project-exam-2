import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useApi } from "./api/api";
import { venuesURL } from "./api/constants";

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
      </Stack>
    </>
  );
}
