import { Avatar, Box, Button, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, Link, Menu, MenuItem, Modal, Paper, Stack, Switch, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { SetVenueManager } from "./api/api";
import { updateAvatarURL } from "./api/constants";
import { updateAvatarFormEventListener } from "./handlers/updateAvatar";
import { useGetVenues } from "./api/api";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";

export const MUIProfile = () => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [isVenueManager, setIsVenueManager] = useState(profile.venueManager || false);
  const [isHovered, setIsHovered] = useState(false);
  const avatarPicture = profile.avatar;
  const { data } = useGetVenues(updateAvatarURL);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

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

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack>
        <Box id="profile-wrapper">
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpen}
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
          <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
        <Tabs value={value} onChange={handleChanges} aria-label="basic tabs example">
          <Tab label="Bookings" {...a11yProps(0)} />
          <Tab label="Your venues" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
        <Divider />
        <CustomTabPanel value={value} index={0}>
          Bookings
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container rowSpacing={{ xs: 2, md: 4 }} columnSpacing={{ xs: 1, md: 2 }}>
            {profile.venueManager === true ? (
              data.map((venue) => (
                <Grid item key={venue.id} xs={12} sm={6} md={4} lg={3}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography component="h5" key={venue.id}>
                      {venue.name}
                    </Typography>
                    <Box className="DIN-DRITT" position="relative">
                      <IconButton size="small" id="edit-venue-button" aria-label="profile" disableRipple aria-controls={open ? "edit-venue-menu" : undefined} aria-expanded={open ? "true" : undefined} onClick={handleMenu}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu id="edit-venue-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="#">
                          <MenuItem>Edit venue</MenuItem>
                        </Link>
                        <Link color="error" sx={{ textDecoration: "none" }} component={RouterLink} to="#">
                          <MenuItem>Delete venue</MenuItem>
                        </Link>
                        <Divider />
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
            ) : (
              <Box>
                <FormControl>
                  <FormControlLabel control={<Switch checked={isVenueManager} onClick={handleChange} />} label="Be a venue manager" />
                </FormControl>
              </Box>
            )}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Stack>
    </>
  );
};
