import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Avatar, Box, Button, Container, Divider, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

export const MUINavbar = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const isLoggedIn = useState(localStorage.getItem("isLoggedIn"));
  const profile = JSON.parse(localStorage.getItem("profile"));
  const avatarPicture = profile.avatar;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
                <WorkOutlineOutlinedIcon fontSize="small" color="primary" />
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
                <IconButton id="avatar-button" aria-label="profile" disableRipple aria-controls={open ? "basic-menu" : undefined} aria-expanded={open ? "true" : undefined} onClick={handleMenu}>
                  <Avatar sx={{ alignSelf: "center", aspectRatio: "1 / 1", width: "40px", height: "40px" }} alt="" src={avatarPicture} />
                </IconButton>
                {isLoggedIn && (
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
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
              <Box>
                <IconButton>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
