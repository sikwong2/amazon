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
import { useRouter } from 'next/router';

export function RedirectNonVendor() {
  const loginContext = useContext(LoginContext);
  const { t } = useTranslation('common');
  const router = useRouter();
  const handleClick = () => {
    loginContext.setUserName('');
    loginContext.setAccessToken('');
    loginContext.setId('');
    switch (loginContext.role) {
      case 'shopper':
        loginContext.setRole('');
        router.push('/');
        break;
      case 'admin':
        loginContext.setRole('');
        router.push('/admin');
        break;
      default:
        loginContext.setRole('');
        router.push('/');
    }
  }
  const RedirectNonVendorComponent = (
    <Container
      component="main"
      sx={{
        mb: '28px',
        pt: '14px',
        pb: '18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2.5 }}>
          <Logo width={100} height="auto" />
        </Container>
        <CustomCard>
          <Typography mt={2} component="h1" variant="h5" align="center">
            {t('vendor-app.vendors-only')}
          </Typography>
          <Box
            aria-label="form"
            width={500}
            sx={{ p: 5, display: 'flex', justifyContent: 'center' }}
          >
            <CustomButton label="shopper-app-button" onClick={handleClick}>
              {loginContext.role === 'shopper' ? t('vendor-app.return-shopper-app') : t('vendor-app.return-admin-app')}
            </CustomButton>
          </Box>
        </CustomCard>
      </Box>
    </Container>
  );

  return RedirectNonVendorComponent;
}
