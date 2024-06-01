import '../styles/globals.css';
import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { LoginProvider } from '@/context/Login';
import { CartProvider } from '@/context/Cart';
import { PageProvider } from '@/context/Page';
const theme = createTheme({
  typography: {
    fontFamily: ['Amazon Ember', 'Helvetica', 'sans-serif'].join(','),
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <PageProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </PageProvider>
      </LoginProvider>
    </ThemeProvider>
  );
};

export default appWithTranslation(App);
