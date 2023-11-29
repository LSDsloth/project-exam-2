import { useState } from "react";
import { venuesURL } from "./api/constants";
import { useApi } from "./api/api";
import { Box, Grid, Tooltip, Typography, Link, CircularProgress, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const MUIHome = () => {
  const { data, isLoading, isError } = useApi(`${venuesURL}?limit=20&sort=created`);
  // const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  console.log(data);
  // useEffect(() => {
  //   async function getVenues() {
  //     try {
  //       const postData = {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const response = await fetch(`${baseURL}/venues?limit=10`, postData);
  //       if (response.ok) {
  //         const json = await response.json();
  //         setVenues(json);
  //         console.log(json);
  //       } else {
  //         console.log(response);
  //         console.error("Failed to fetch data:", response.status, response.statusText);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getVenues();
  // }, []);

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

  const filteredVenues = data.filter((venue) => {
    return venue.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Box className="searchBar-wrapper">
        <TextField label="Search for a product" variant="outlined" fullWidth value={searchQuery} onChange={handleSearch} />
      </Box>
      <Grid container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={{ xs: 1, md: 2 }}>
        {filteredVenues.map((venue) => (
          <Grid item key={venue.id} xs={12} sm={6} md={4} lg={3}>
            <Typography component="h5" key={venue.id}>
              {venue.name}
            </Typography>
            <Box>
              <Link component={RouterLink} to={`./venues?${venue.id}`}>
                <Box sx={{ aspectRatio: "16 / 9", overflow: "hidden", position: "relative" }}>
                  <img
                    className="venueImage"
                    src={venue.media}
                    alt={venue.name}
                    onError={(e) => {
                      e.target.src = "../../images/placeholder.webp";
                    }}></img>
                </Box>
              </Link>
              <Tooltip title="Address: {}">
                <Box sx={{ width: "fit-content", color: "lightgrey", float: "right", display: "flex" }}>
                  <LocationOnIcon sx={{ fontSize: "1rem", color: "lightgrey" }} />
                  <Typography variant="caption">
                    {venue.location.city !== "Unknown" && venue.location.city + ", "} {venue.location.country !== "Unknown" && venue.location.country}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
