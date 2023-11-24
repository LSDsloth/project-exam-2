import "./App.css";
import { ThemeProvider, createTheme, colors } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import { MUINavbar } from "./components/navbar";
import { MUIHome } from "./components/home";
import { MUILogin } from "./components/login";
import { MUIRegister } from "./components/register";
import { MUIVenue } from "./components/venues";
import { MUICreateVenue } from "./components/createVenue";
import { lightBlue } from "@mui/material/colors";
import { Container } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: lightBlue,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MUINavbar />
        <Container>
          <Routes>
            <Route index element={<MUIHome />} />
            <Route path="/register" element={<MUIRegister />} />
            <Route path="/login" element={<MUILogin />} />
            <Route path="/venues" element={<MUIVenue />} />
            <Route path="/createVenue" element={<MUICreateVenue />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
