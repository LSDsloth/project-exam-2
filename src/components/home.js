import { useEffect, useState } from "react";
import { venuesURL } from "./api/constants";
import { useApi } from "./api/api";
import { Box, Grid, Tooltip, Typography, Link, CircularProgress, TextField, Pagination, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const MUIHome = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 100;
  const offset = (currentPage - 1) * itemsPerPage;

  const { data, isLoading, isError, refetch } = useApi(venuesURL, offset, itemsPerPage);

  const [anchorEl, setAnchorEl] = useState(null);

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  const open = Boolean(anchorEl);

  // const [hoveredVenue, setHoveredVenue] = useState(null);

  // const handleMouseEnter = (venueId) => {
  //   setHoveredVenue(venueId);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredVenue(null);
  // };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const filteredVenues = data.filter((venue) => {
    return venue.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate offset based on current page
  const startIndex = offset;
  const endIndex = offset + 20;
  const venuesToDisplay = filteredVenues.slice(startIndex, endIndex);
  console.log(venuesToDisplay);

  return (
    <Stack spacing={1}>
      <Box className="searchBar-wrapper">
        <TextField size="small" label="Search for a venue" variant="outlined" fullWidth value={searchQuery} onChange={handleSearch} />
      </Box>
      <Grid container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={{ xs: 1, md: 2 }} sx={{ alignSelf: "center" }}>
        {filteredVenues.map((venue) => (
          <Grid id={`my-venue-${venue.id}`} item key={venue.id} xs={12} sm={6} md={4} lg={3}>
            <Stack className="venues-widget" sx={{ backgroundColor: " #f8f8f8", padding: "15px", borderRadius: "8px" }}>
              <Link component={RouterLink} to={`.././venues?${venue.id}`}>
                <Box sx={{ aspectRatio: "16 / 9", overflow: "hidden", position: "relative" }}>
                  <img src={venue.media} alt="event" />
                </Box>
              </Link>
              <Box>
                <Link sx={{ color: "inherit", textDecorationColor: "inherit" }} component={RouterLink} to={`.././venues?${venue.id}`}>
                  <Typography component="h3" variant="h6" className="event-name">
                    {venue.name}
                  </Typography>
                </Link>
                <Tooltip
                  title={
                    <>
                      <Typography variant="body2">Address: {venue.location.address}</Typography>
                      <Typography variant="body2">City: {venue.location.city}</Typography>
                      <Typography variant="body2">Country: {venue.location.country}</Typography>
                      <Typography variant="body2">Zip: {venue.location.zip}</Typography>
                    </>
                  }>
                  <Box
                    sx={{
                      color: "black",
                      display: "flex",
                      width: "fit-content",
                    }}>
                    {venue.location.city.trim() !== "" && venue.location.city !== "Unknown" && venue.location.country.trim() !== "" && venue.location.country !== "Unknown" ? (
                      <LocationOnIcon sx={{ fontSize: "1rem", color: "lightgrey" }} />
                    ) : (
                      <Typography variant="caption">Location not specified</Typography>
                    )}
                    <Typography sx={{ color: "secondary.main" }} variant="caption">
                      {venue.location.city.trim() === "" || venue.location.city.trim() === "Unknown" ? "" : venue.location.city + ", "}
                      {venue.location.country.trim() === "" || venue.location.country.trim() === "Unknown" ? "" : venue.location.country + ""}
                    </Typography>
                  </Box>
                </Tooltip>
                <Link sx={{ display: "block", textAlign: "center", marginTop: "2rem" }} component={RouterLink}></Link>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Pagination count={5} color="primary" page={currentPage} onChange={handlePageChange} />
    </Stack>
  );
};
