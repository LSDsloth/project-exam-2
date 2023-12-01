import { Avatar, Box, Button, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, Link, Menu, MenuItem, Modal, Paper, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DeleteVenues, SetVenueManager } from "./api/api";
import { updateAvatarURL, venuesURL } from "./api/constants";
import { updateAvatarFormEventListener } from "./handlers/updateAvatar";
import { useGetVenues } from "./api/api";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const MUIProfile = () => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [isVenueManager, setIsVenueManager] = useState(profile.venueManager || false);
  const [isHovered, setIsHovered] = useState(false);
  const avatarPicture = profile.avatar;
  const { data } = useGetVenues(updateAvatarURL);

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
    console.log("Deleted " + venueId);
  };

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

  const [deleteVenueModalOpen, setDeleteVenueModalOpen] = useState(false);
  const handleOpen = () => setDeleteVenueModalOpen(true);
  const handleClose = () => setDeleteVenueModalOpen(false);

  console.log(profile);

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
      <Stack>
        <Box id="profile-wrapper">
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
        </Box>
        {/* Here is starts */}
        {/* <Box className="Just-to-test" sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <IconButton id="test-button" aria-controls={open ? "test-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu id="test-menu" anchorEl={anchorEl} open={open}>
              <MenuItem>
                <Typography component="h1" variant="h1">
                  Item nr1
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box>
            <IconButton id="test-button" aria-controls={open ? "test-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu id="test-menu" anchorEl={anchorEl} open={open}>
              <MenuItem>
                <Typography component="h1" variant="h1">
                  Item nr1
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box> */}
        {/* Here it ends */}

        <Grid className="CONTAINER" container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={{ xs: 1, md: 2 }}>
          {profile.venueManager === true ? (
            data.length === 0 ? (
              <Box gap={4} sx={{ display: "flex", flexDirection: "column", margin: "0 auto", marginY: "50px" }}>
                <Typography component="h2" variant="h4">
                  You have not posted any venues yet
                </Typography>
                <Button component={RouterLink} variant="contained" to="../create-venue">
                  Create your first venue
                </Button>
              </Box>
            ) : (
              data.map((venue) => (
                <Grid id={`my-venue-${venue.id}`} item key={venue.id} xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography component="h5">{venue.name}</Typography>
                    <Box className="DIN-DRITT" position="relative">
                      <IconButton size="small" aria-controls={open ? `edit-venue-menu-${venue.id}` : undefined} aria-haspopup="true" onClick={(event) => handleMenuClick(venue.id, event)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu id={`edit-venue-menu-${venue.id}`} anchorEl={anchorEl[venue.id]} open={Boolean(anchorEl[venue.id])} onClose={() => handleMenuClose(venue.id)}>
                        <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="#">
                          <MenuItem onClick={() => handleMenuClose(venue.id)}>Edit venue</MenuItem>
                        </Link>
                        <Box onClick={() => deleteVenue(venue.id)} sx={{ color: "error.main" }}>
                          <MenuItem>Delete venue</MenuItem>
                        </Box>
                      </Menu>
                    </Box>
                  </Box>
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
              ))
            )
          ) : (
            <Box>
              <FormControl>
                <FormControlLabel control={<Switch checked={isVenueManager} onClick={handleChange} />} label="Be a venue manager" />
              </FormControl>
            </Box>
          )}
        </Grid>
      </Stack>
    </>
  );
};
