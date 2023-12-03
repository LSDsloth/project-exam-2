import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Avatar, Box, Container, Divider, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

export const MUINavbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storedProfile = localStorage.getItem("profile");
  let avatarPicture = null;

  if (storedProfile) {
    const profile = JSON.parse(storedProfile);
    avatarPicture = profile.avatar;
  }

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

  const handleLogOut = (e) => {
    e.preventDefault();
    const profile = JSON.parse(storedProfile);
    alert("You are logged out from " + profile.name);
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("profile", "");
    window.location.href = "/";
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Container>
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box display="flex">
              <Link component={RouterLink} to="/" sx={{ display: "flex", gap: "5px", alignItems: "center", marginRight: "2rem", textDecoration: "none", color: "grey.200" }}>
                <Typography variant="h6" noWrap sx={{ display: "inline-block", color: "rgba(0, 0, 0, 0.87)" }}>
                  Holidaze
                </Typography>
                <WorkOutlineOutlinedIcon fontSize="small" color="secondary" />
              </Link>
            </Box>
            <Box display="flex" sx={{ alignItems: "center" }}>
              <Box>
                <IconButton id="avatar-button" aria-label="profile" disableRipple aria-controls={open ? "avatar-menu-appbar" : undefined} aria-haspopup="true" onClick={(event) => handleMenuClick("avatar-menu-appbar", event)}>
                  <Avatar sx={{ alignSelf: "center", aspectRatio: "1 / 1", width: "40px", height: "40px" }} alt="" src={avatarPicture} />
                </IconButton>
                {isLoggedIn === true || isLoggedIn === "true" ? (
                  <Menu
                    id="avatar-menu-appbar"
                    anchorEl={anchorEl["avatar-menu-appbar"]}
                    open={anchorEl["avatar-menu-appbar"]}
                    onClose={() => handleMenuClose("avatar-menu-appbar")}
                    MenuListProps={{
                      "aria-labelledby": "avatar-button",
                    }}>
                    <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="profile">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="create-venue">
                      <MenuItem>Create a venue</MenuItem>
                    </Link>
                    <Divider />
                    <Box>
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Box>
                  </Menu>
                ) : (
                  <Menu
                    id="avatar-menu-appbar"
                    anchorEl={anchorEl["avatar-menu-appbar"]}
                    open={anchorEl["avatar-menu-appbar"]}
                    onClose={() => handleMenuClose("avatar-menu-appbar")}
                    MenuListProps={{
                      "aria-labelledby": "avatar-button",
                    }}>
                    <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="login">
                      <MenuItem>Login</MenuItem>
                    </Link>
                    <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="register">
                      <MenuItem>Register</MenuItem>
                    </Link>
                  </Menu>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
