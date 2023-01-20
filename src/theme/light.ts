import { createTheme } from "@mui/material"

const Theme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#F5F6FA"
    },
    background: {
      paper: "#FFFFFF",
      default: "#F5F6FA",
    },
    text: {
      primary: "#000000"
    }
  },
  typography: {
    button: {
      textTransform: "initial",
    },
  },
})

export default Theme
