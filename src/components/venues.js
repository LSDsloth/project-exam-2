import { Box, CircularProgress, Typography } from "@mui/material";
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
      <Box>
        <Typography>{venue.name}</Typography>
        {/* Add other venue details here */}
      </Box>
    </>
  );
}
