import "../styles/globals.css";
import "../styles/fonts.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Amazon Ember',
      'Helvetica',
      'sans-serif'
    ].join(','),
  }
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme} >
      <Component {...pageProps} />;
    </ThemeProvider>
  )
}

export default appWithTranslation(App)