import { useContext } from 'react';
import { LoginContext } from '../context/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import Logo from '../components/Logo';
import CustomCard from '@/components/Card';
import CustomButton from '@/components/Button';
import Link from '@/components/Link';
import { display } from '@mui/system';

export function RedirectNonVendor() {
  const loginContext = useContext(LoginContext);
  const { t } = useTranslation('common');

  const RedirectNonVendorComponent = (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginBottom: 2,
          }}
        >
          <Logo />
        </Box>
        <CustomCard>
          <Typography mt={2} component="h1" variant="h5" align="center">
            {t('vendor-app.vendors-only')}
          </Typography>
          <Box
            aria-label="form"
            width={500}
            sx={{p: 5, display: 'flex', justifyContent: 'center' }}
          >
            <CustomButton label="shopper-app-button" href="/">
              {t('vendor-app.return-shopper-app')}
            </CustomButton>
          </Box>
        </CustomCard>
      </Box>
    </Container>
  );

  return RedirectNonVendorComponent;
}
