import "./App.css";
import { ThemeProvider, createTheme, colors } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import { MUINavbar } from "./components/navbar";
import { MUIHome } from "./components/home";
import { MUILogin } from "./components/login";
import { MUIRegister } from "./components/register";
import { lightBlue } from "@mui/material/colors";

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
        <Routes>
          <Route index element={<MUIHome />} />
          <Route path="/register" element={<MUIRegister />} />
          <Route path="/login" element={<MUILogin />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
