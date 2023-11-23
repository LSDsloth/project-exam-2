import { Box, CircularProgress, Typography } from "@mui/material";
import { useApi } from "./api/api";
import { venuesURL } from "./api/constants";
export function MUIVenue() {
  const unusableQueryString = document.location.search;
  const queryString = unusableQueryString.slice(1);
  const { data, isLoading, isError } = useApi(venuesURL);

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

  const venue = data.find((venue) => venue.id === queryString);
  console.log(venue);

  if (!venue) {
    return <Box>Product not found</Box>;
  }

  return (
    <>
      <Box>
        <Typography>{venue.name}</Typography>
      </Box>
    </>
  );
}
