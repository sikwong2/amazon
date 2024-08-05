import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/links.css"
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { LoginProvider } from "@/context/Login";
import { CartProvider } from "@/context/Cart";
import { PageProvider } from "@/context/Page";
import { SearchProvider } from '@/context/SearchContext';
import { BrowserHistoryProvider } from "@/context/BrowserHistory";

const theme = createTheme({
  typography: {
    fontFamily: ['Amazon Ember', 'Helvetica', 'sans-serif'].join(','),
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <SearchProvider>
          <PageProvider>
            <CartProvider>
              <BrowserHistoryProvider>
                <Component {...pageProps} />
              </BrowserHistoryProvider>
            </CartProvider>
          </PageProvider>
        </SearchProvider>
      </LoginProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
