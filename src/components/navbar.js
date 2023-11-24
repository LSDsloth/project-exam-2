import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { grey } from "@mui/material/colors";
import { Box, Button, Container, Divider, Link, Menu, MenuItem, TextField, Toolbar, Typography, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(72px - 1em)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  height: "39px",
  padding: theme.spacing(0, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// let isLoggedIn = localStorage.getItem("isLoggedIn");

export const MUINavbar = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

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
              <Box sx={{ backgroundColor: "grey.800", borderRadius: "5px", position: "relative" }}>
                <SearchIconWrapper>
                  <SearchOutlinedIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." />
              </Box>
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
                    <MenuItem>Profile</MenuItem>
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
