import { Avatar, Box, Button, Divider, FormControl, FormControlLabel, IconButton, Input, InputAdornment, Paper, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SetVenueManager } from "./api/api";
import { updateAvatarURL } from "./api/constants";
import { updateAvatarFormEventListener } from "./handlers/updateAvatar";
import EditIcon from "@mui/icons-material/Edit";

export const MUIProfile = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [isVenueManager, setIsVenueManager] = useState(profile.venueManager || false);
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    console.log("Updated isVenueManager:", isVenueManager);
  }, [isVenueManager]);

  const handleFormSubmit = () => {
    // Call updateAvatarFormEventListener when you want to attach the event listener
    updateAvatarFormEventListener();

    // Additional code you want to run when the form is submitted
    console.log("Form submit button clicked");
  };

  return (
    <>
      <Stack>
        <Box marginY={3} sx={{}}>
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpen}
            sx={{ margin: "0 auto", lineHeight: "100px", position: "relative", display: "flex", justifyContent: "center", width: "fit-content" }}>
            <Avatar sx={{ alignSelf: "center", aspectRatio: "1 / 1", width: "100px", height: "100px" }} alt="" src={profile.avatar === null ? console.log("error") : console.log("Not error")} />
            {/* Conditionally render EditIcon when hovered */}
            {isHovered && (
              <IconButton
                sx={{
                  width: "25px",
                  height: "25px",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "black,", // Adjust the background color as needed
                }}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
          {/* <Modal open={modalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"> */}
          <Paper elevation={2} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "16px", borderRadius: "10px" }}>
            <Box onClick={handleFormSubmit} component="form" id="updateAvatarForm">
              <Typography variant="h6" paddingBottom={2} sx={{ textAlign: "center" }}>
                Update avatar
              </Typography>
              {/* <InputLabel htmlFor="url">New avatar</InputLabel> */}
              <Input size="small" autoFocus id="avatar" type="url" name="avatar" aria-describedby="my-helper-text" startAdornment={<InputAdornment position="start">URL:</InputAdornment>} />
              <Button type="submit" color="primary">
                Update
              </Button>
            </Box>
          </Paper>
          {/* </Modal> */}
        </Box>
        <Divider />
      </Stack>
      {isLoggedIn === true ? (
        <Typography>You have to log in </Typography>
      ) : (
        <Box>
          <FormControl>
            <FormControlLabel control={<Switch checked={isVenueManager} onClick={handleChange} />} label="Be a venue manager" />
          </FormControl>
        </Box>
      )}
    </>
  );
};
