import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ECA123",
    },
    secondary: {
      main: "#0A1C31",
    },
    background: {
      default: "#F3F4F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2933",
      secondary: "#606F7B",
    },
    error: {
      main: "#FF5C5C",
    },
    warning: {
      main: "#FFC107",
    },
    info: {
      main: "#17C3B2",
    },
    success: {
      main: "#4BB543",
    },
  },
});

export default theme;
