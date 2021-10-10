import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from "@mui/lab";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#204ECF",
    },
    secondary: {
      main: "#03CC83",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Component {...pageProps} />
        <ToastContainer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default MyApp;
