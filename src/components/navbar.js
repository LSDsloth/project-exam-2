import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Avatar, Box, Button, Container, Divider, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

export const MUINavbar = () => {
  const isLoggedIn = useState(localStorage.getItem("isLoggedIn"));
  const profile = JSON.parse(localStorage.getItem("profile"));
  const avatarPicture = profile.avatar;

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
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
    window.location.reload();
    // const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken);
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
            <Box sx={{ display: "inline-block" }}>
              <Link component={RouterLink} to="/">
                <Button
                  disableRipple
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline",
                    },
                  }}
                  variant="text">
                  Home
                </Button>
              </Link>
              <Link component={RouterLink} to="/login">
                <Button
                  disableRipple
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline",
                    },
                  }}
                  variant="text">
                  Login
                </Button>
              </Link>
              <Link component={RouterLink} to="/register">
                <Button
                  disableRipple
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline",
                    },
                  }}
                  variant="text">
                  register
                </Button>
              </Link>
            </Box>
            <Box display="flex" sx={{ alignItems: "center" }}>
              <Box>
                <IconButton id="calendar-button" aria-label="calendar" aria-controls={open ? "calendar-menu-appbar" : undefined} aria-haspopup="true" onClick={(event) => handleMenuClick("calendar-menu-appbar", event)}>
                  <CalendarMonthIcon />
                </IconButton>
                <Menu
                  id="calendar-menu-appbar"
                  anchorEl={anchorEl["calendar-menu-appbar"]}
                  open={anchorEl["calendar-menu-appbar"]}
                  onClose={() => handleMenuClose("calendar-menu-appbar")}
                  MenuListProps={{
                    "aria-labelledby": "calendar-button",
                  }}>
                  <MenuItem disableRipple></MenuItem>
                </Menu>
              </Box>
              <Box>
                <IconButton id="avatar-button" aria-label="profile" disableRipple aria-controls={open ? "avatar-menu-appbar" : undefined} aria-haspopup="true" onClick={(event) => handleMenuClick("avatar-menu-appbar", event)}>
                  <Avatar sx={{ alignSelf: "center", aspectRatio: "1 / 1", width: "40px", height: "40px" }} alt="" src={avatarPicture} />
                </IconButton>
                {isLoggedIn && (
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
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
