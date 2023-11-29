import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Box, Button, Container, Divider, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

export const MUINavbar = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const isLoggedIn = useState(localStorage.getItem("isLoggedIn"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isLoggedIn", false);
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
                <Typography variant="h6" noWrap sx={{ display: "inline-block" }}>
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
                    color: "grey.200",
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
                    color: "grey.200",
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
                    color: "grey.200",
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
            <Box display="flex">
              <Box>
                <IconButton onClick={handleMenu}>
                  <AccountCircleOutlinedIcon />
                </IconButton>
                {isLoggedIn && (
                  <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="profile">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link color="inherit" sx={{ textDecoration: "none" }} component={RouterLink} to="create-venue">
                      <MenuItem>Create a venue</MenuItem>
                    </Link>
                    <Divider />
                    <Box>
                      <MenuItem onClick={handleClick}>Logout</MenuItem>
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
