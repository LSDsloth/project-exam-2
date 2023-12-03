import { Avatar, Box, Button, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, Link, Menu, MenuItem, Modal, Paper, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DeleteVenues, SetVenueManager, useGetProfile } from "./api/api";
import { updateAvatarURL, venuesURL } from "./api/constants";
import { updateAvatarFormEventListener } from "./handlers/updateAvatar";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const MUIProfile = () => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [isVenueManager, setIsVenueManager] = useState(profile.venueManager || false);
  const [isHovered, setIsHovered] = useState(false);
  const avatarPicture = profile.avatar;
  const { venueData } = useGetProfile(updateAvatarURL, "venues");
  console.log(venueData);

  const { bookingData } = useGetProfile(updateAvatarURL, "bookings");

  // const [venueID, setVenueID] = useState("");

  const [anchorEl, setAnchorEl] = useState({});
  const open = Boolean(anchorEl);

  const handleMenuClick = (venueId, event) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [venueId]: event.currentTarget,
    }));
  };

  const handleMenuClose = (venueId) => {
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [venueId]: null,
    }));
  };

  const deleteVenue = (venueId) => {
    handleMenuClose(venueId); // Close the menu after deleting
    DeleteVenues(venuesURL, venueId);
  };

  // const deleteBooking = (bookingId) => {
  //   handleMenuClose(bookingId);
  //   DeleteVenues(bookingURL, bookingId);
  // };

  // const fullId = element.id;

  // setVenueID(dynamicPart);
  // console.log(dynamicPart);
  // DeleteVenues(venuesURL, venueID);

  // const handleMenu = (event, venueId) => {
  //   setAnchorEl((prevAnchorEl) => ({
  //     ...prevAnchorEl,
  //     [venueId]: event.currentTarget,
  //   }));
  //   seOpen((prevIsMenuOpen) => ({
  //     ...prevIsMenuOpen,
  //     [venueId]: true,
  //   }));
  // };

  // const handleMenuClose = (venueId) => {
  //   setAnchorEl((prevAnchorEl) => ({
  //     ...prevAnchorEl,
  //     [venueId]: null,
  //   }));
  //   seOpen((prevIsMenuOpen) => ({
  //     ...prevIsMenuOpen,
  //     [venueId]: false,
  //   }));
  // };

  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const handleAvatarOpen = () => setAvatarModalOpen(true);
  const handleAvatarClose = () => setAvatarModalOpen(false);

  // const [deleteVenueModalOpen, setDeleteVenueModalOpen] = useState(false);
  // const handleOpen = () => setDeleteVenueModalOpen(true);
  // const handleClose = () => setDeleteVenueModalOpen(false);

  console.log(`Venue manager is ${profile.venueManager} before I click the switch`);

  function handleChange(e) {
    const isChecked = e.target.checked;
    setIsVenueManager(isChecked);
    profile.venueManager = isChecked;
    const updatedProfile = JSON.stringify(profile);
    localStorage.setItem("profile", updatedProfile);
    SetVenueManager(updateAvatarURL, profile.venueManager);
    console.log(`Venue manager is updated to ${profile.venueManager}`);
    console.log(profile);
  }

  function handleThis() {
    updateAvatarFormEventListener();
  }

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // To Test

  return (
    <>
      <Stack spacing={5} sx={{ display: "flex" }}>
        <Box id="profile-wrapper">
          <Box marginY="1rem">
            <Box
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleAvatarOpen}
              sx={{ margin: "10px auto", lineHeight: "100px", position: "relative", display: "flex", justifyContent: "center", width: "fit-content" }}>
              <Avatar sx={{ alignSelf: "center", aspectRatio: "1 / 1", width: "100px", height: "100px" }} alt="" src={avatarPicture} />
              {/* Conditionally render EditIcon when hovered */}
              {isHovered && (
                <IconButton
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "white",
                  }}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>

            <Typography position="relative" textAlign="center" variant="h5">
              {profile.name}
            </Typography>
          </Box>
          <Modal open={avatarModalOpen} onClose={handleAvatarClose} aria-labelledby="avatar-modal-title" aria-describedby="avatar-modal-description">
            <Paper elevation={2} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "16px", borderRadius: "10px" }}>
              <Box onClick={handleThis} component="form" id="updateAvatarForm">
                <Typography variant="h6" paddingBottom={2} sx={{ textAlign: "center" }}>
                  Update avatar
                </Typography>
                {/* <InputLabel htmlFor="url">New avatar</InputLabel> */}
                <Input sx={{ marginRight: "16px" }} size="small" autoFocus id="avatar" type="url" name="avatar" startAdornment={<InputAdornment position="start">URL:</InputAdornment>} />
                <Button type="submit" color="primary">
                  Update
                </Button>
              </Box>
            </Paper>
          </Modal>
          <Divider />
        </Box>

        <Stack spacing={5}>
          <Stack id="venues-wrapper" spacing={1}>
            {profile.venueManager === true ? (
              venueData && venueData.length === 0 ? (
                <Box gap={4} sx={{ display: "flex", flexDirection: "column", margin: "0 auto", marginY: "50px" }}>
                  <Typography component="h2" variant="h4">
                    You have not posted any venues yet
                  </Typography>
                  <Button component={RouterLink} variant="contained" to="../create-venue">
                    Create your first venue
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography component="h2" variant="h4">
                    Venues
                  </Typography>
                  <Grid className="CONTAINER" container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={{ xs: 1, md: 2 }}>
                    {venueData.map((venue) => {
                      const formattedDate = new Date(venue.dateFrom).toLocaleString();
                      return (
                        <Grid id={`my-venue-${venue.id}`} item key={venue.id} xs={12} sm={6} md={4} lg={3}>
                          <Stack className="venues-widget" sx={{ backgroundColor: " #f8f8f8", padding: "15px", borderRadius: "8px" }}>
                            <Link component={RouterLink} to={`.././venues?${venue.id}`}>
                              <Box sx={{ aspectRatio: "16 / 9", overflow: "hidden", position: "relative" }}>
                                <img src={venue.media} alt="event" />
                              </Box>
                            </Link>
                            <Box>
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="caption">{formattedDate}</Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Box className="DIN-DRITT" position="relative">
                                    <IconButton size="small" aria-controls={open ? `edit-venue-menu-${venue.id}` : undefined} aria-haspopup="true" onClick={(event) => handleMenuClick(venue.id, event)}>
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu id={`edit-venue-menu-${venue.id}`} anchorEl={anchorEl[venue.id]} open={Boolean(anchorEl[venue.id])} onClose={() => handleMenuClose(venue.id)}>
                                      <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to={`../update-venue?${venue.id}`}>
                                        <MenuItem onClick={() => handleMenuClose(venue.id)}>Edit venue</MenuItem>
                                      </Link>
                                      <Box onClick={() => deleteVenue(venue.id)} sx={{ color: "error.main" }}>
                                        <MenuItem>Delete venue</MenuItem>
                                      </Box>
                                    </Menu>
                                  </Box>
                                </Box>
                              </Box>
                              <Typography component="h3" variant="h6" className="event-name">
                                {venue.name}
                              </Typography>
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
                                  <Typography variant="caption">
                                    {venue.location.city.trim() === "" || venue.location.city.trim() === "Unknown" ? "" : venue.location.city + ", "}
                                    {venue.location.country.trim() === "" || venue.location.country.trim() === "Unknown" ? "" : venue.location.country + ""}
                                  </Typography>
                                </Box>
                              </Tooltip>
                            </Box>
                          </Stack>
                        </Grid>
                      );
                    })}
                  </Grid>
                </>
              )
            ) : (
              <Box>
                <Typography component="p" variant="h6" maxWidth="700px">
                  You are not a venue manager. As a venue manager you can lend your venues for others to book events at them.{" "}
                </Typography>
                <FormControl>
                  <FormControlLabel control={<Switch checked={isVenueManager} onClick={handleChange} />} label="Be a venue manager" />
                </FormControl>
              </Box>
            )}
          </Stack>
          <Stack id="bookings-wrapper" spacing={1}>
            <Typography component="h2" variant="h4">
              Upcoming bookings
            </Typography>
            <Grid className="CONTAINER" container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={{ xs: 1, md: 2 }}>
              {bookingData && bookingData.length >= 1 ? (
                bookingData.map((booking) => {
                  const formattedDate = new Date(booking.dateFrom).toLocaleString();
                  return (
                    <Grid id={`my-booking-${booking.id}`} item key={booking.id} xs={12} sm={6} md={4} lg={3}>
                      <Stack className="upcoming-events-widget" sx={{ backgroundColor: " #f8f8f8", padding: "15px", borderRadius: "8px" }}>
                        <Box>
                          <Box sx={{ aspectRatio: "16 / 9", overflow: "hidden", position: "relative" }}>
                            <img src={booking.venue.media} alt="event" />
                          </Box>
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
                              <AccessTimeIcon sx={{ fontSize: "16px" }} />
                              <Typography variant="caption">{formattedDate}</Typography>
                            </Box>
                            <Typography component="h3" variant="h6" className="event-name">
                              {booking.venue.name}
                            </Typography>
                            <Tooltip
                              title={
                                <>
                                  <Typography variant="body2">Address: {booking.venue.location.address}</Typography>
                                  <Typography variant="body2">City: {booking.venue.location.city}</Typography>
                                  <Typography variant="body2">Country: {booking.venue.location.country}</Typography>
                                  <Typography variant="body2">Zip: {booking.venue.location.zip}</Typography>
                                </>
                              }>
                              <Box
                                sx={{
                                  color: "black",
                                  display: "flex",
                                  width: "fit-content",
                                }}>
                                {booking.venue.location.city.trim() !== "" && booking.venue.location.city !== "Unknown" && booking.venue.location.country.trim() !== "" && booking.venue.location.country !== "Unknown" ? (
                                  <LocationOnIcon sx={{ fontSize: "1rem", color: "lightgrey" }} />
                                ) : (
                                  <Typography variant="caption">Location not specified</Typography>
                                )}
                                <Typography variant="caption">
                                  {booking.venue.location.city.trim() === "" || booking.venue.location.city.trim() === "Unknown" ? "" : booking.venue.location.city + ", "}
                                  {booking.venue.location.country.trim() === "" || booking.venue.location.country.trim() === "Unknown" ? "" : booking.venue.location.country + ""}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Stack>
                    </Grid>
                  );
                })
              ) : (
                <Typography maxWidth="700px">You have no bookings. You can find venues to book at the home page where you can seaarch or scroll through hundreds of venues</Typography>
              )}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
