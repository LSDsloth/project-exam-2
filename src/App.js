import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import { MUINavbar } from "./components/navbar";
import { MUIHome } from "./components/home";
import { MUILogin } from "./components/login";
import { MUIRegister } from "./components/register";
import { MUIVenue } from "./components/venues";
import { MUICreateVenue } from "./components/createVenue";
import { MUIProfile } from "./components/profile";
import { amber } from "@mui/material/colors";
import { Container } from "@mui/material";
import { MUIFooter } from "./components/footer";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: amber,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <header>
          <MUINavbar />
        </header>
        <main>
          <Container sx={{ height: "100%", backgroundColor: "white", paddingY: "16px", borderRadius: "10px" }}>
            <Routes>
              <Route index element={<MUIHome />} />
              <Route path="/register" element={<MUIRegister />} />
              <Route path="/login" element={<MUILogin />} />
              <Route path="/venues" element={<MUIVenue />} />
              <Route path="/create-venue" element={<MUICreateVenue />} />
              <Route path="/profile" element={<MUIProfile />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <MUIFooter />
        </footer>
      </ThemeProvider>
    </>
  );
}

export default App;
