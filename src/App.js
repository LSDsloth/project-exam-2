import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import { MUIHome } from "./components/home";
import { MUILogin } from "./components/login";
import { MUIRegister } from "./components/register";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route index element={<MUIHome />} />
          <Route path="/register" element={<MUIRegister />} />
          <Route path="/home" element={<MUILogin />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
