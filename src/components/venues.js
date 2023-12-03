import { Avatar, Box, Button, CircularProgress, Divider, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useApi } from "./api/api";
import { venuesURL } from "./api/constants";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";

export function MUIVenue() {
  const unusableQueryString = document.location.search;
  const queryString = unusableQueryString.slice(1);
  const { data, isLoading, isError } = useApi(`${venuesURL}/${queryString}`);
  console.log(data);
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  console.log(isLoggedIn);

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

  const createData = (dateFrom, dateTo) => {
    const formattedDateFrom = new Date(dateFrom).toLocaleString();
    const formattedDateTo = new Date(dateTo).toLocaleString();
    return { formattedDateFrom, formattedDateTo };
  };

  const rows = [];

  // Populate rows array with booking data
  if (venue && venue.bookings && venue.bookings.length > 0) {
    venue.bookings.forEach((booking) => {
      const newRow = createData(booking.dateFrom, booking.dateTo);
      rows.push(newRow);
    });
  }

  return (
    venue &&
    venue.owner && (
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ backgroundColor: "grey.100", padding: "20px" }}>
            <Box>
              <Box sx={{ width: "fit-content", margin: " 0 auto" }}>
                <Box sx={{ aspectRatio: "16 / 9", height: "500px", margin: "0 auto", overflow: "hidden", position: "relative", borderRadius: "5px" }}>
                  <img src={venue.media} alt={venue.name} />
                </Box>
                <Box marginY="1rem" sx={{ display: "flex", float: "right", alignSelf: "end", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                  <Box sx={{ position: "relative", justifyContent: "center", width: "fit-content" }}>
                    <Avatar sx={{ alignSelf: "center", aspectRatio: "1 / 1", width: "40px", height: "40px" }} alt="" src={venue.owner.avatar} />
                  </Box>
                  <Typography variant="caption" sx={{ fontSize: "1rem" }}>
                    {venue.owner.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ paddingTop: "10px" }}>
              <Typography component="h1" variant="h3" sx={{ display: "flex", justifyContent: "space-between" }}>
                {venue.name}
              </Typography>
              {venue.location.city.trim() !== "" && venue.location.city !== "Unknown" && venue.location.country.trim() !== "" && venue.location.country !== "Unknown" ? (
                <LocationOnIcon sx={{ fontSize: "1rem", color: "lightgrey" }} />
              ) : (
                <Typography variant="caption">Location not specified</Typography>
              )}
              <Typography variant="caption" sx={{ fontSize: "16px" }}>
                {venue.location.city.trim() === "" || venue.location.city.trim() === "Unknown" ? "" : venue.location.city + ", "}
                {venue.location.country.trim() === "" || venue.location.country.trim() === "Unknown" ? "" : venue.location.country + ""}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: "grey.100", padding: "20px", borderRadius: "5px" }}>
            <Box marginBottom={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight={500} component="h2">
                  Description
                </Typography>
                <Box sx={{ color: "secondary.main", display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                  <PersonAddIcon sx={{ fontSize: "16px" }} />
                  <Typography>Allows up to {venue.maxGuests} guests</Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
            <Typography>{venue.description}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ backgroundColor: "grey.100", padding: "20px", borderRadius: "5px" }}>
            <Box marginBottom={2}>
              <Typography variant="h5" fontWeight={500} component="h2">
                Bookings
              </Typography>
              <Divider />
            </Box>
            <Box>
              <TableContainer component={Paper} sx={{ maxHeight: "300px", overflow: "scroll", position: "relative" }}>
                <Table aria-label="bookings-table">
                  <TableHead>
                    <TableRow sx={{ position: "sticky", top: "0", backgroundColor: "white" }}>
                      <TableCell align="left">From</TableCell>
                      <TableCell align="left">To</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">{row.formattedDateFrom}</TableCell>
                        <TableCell align="left">{row.formattedDateTo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Grid>

        {isLoggedIn === "true" || isLoggedIn === true ? (
          <Link component={RouterLink} to={`/bookings?venueId=${venue.id}`} width="100%">
            <Button sx={{ width: "100%" }} variant="contained">
              Book now
            </Button>
          </Link>
        ) : (
          <Link component={RouterLink} to=".././login" width="100%">
            <Button sx={{ width: "100%" }} variant="contained">
              <LockOutlinedIcon /> Log in to book
            </Button>
          </Link>
        )}
      </Grid>
    )
  );
}
