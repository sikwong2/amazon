import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import Logo from '../components/Logo';
import CustomCard from '@/components/Card';
import CustomButton from '@/components/Button';
import { LoginContext } from '@/context/Login';
import { useRouter } from 'next/router';

export function RedirectNonShopper() {
  const loginContext = React.useContext(LoginContext);
  const { t } = useTranslation('common');
  // router to change pages
  const router = useRouter();
  const handleClick = () => {
    loginContext.setUserName('');
    loginContext.setAccessToken('');
    loginContext.setId('');
    switch (loginContext.role) {
      case 'vendor':
        loginContext.setRole('');
        router.push('https://www.ucsc-amazon.com/vendor');
        break;
      case 'admin':
        loginContext.setRole('');
        router.push('https://www.ucsc-amazon.com/admin');
        break;
      default:
        loginContext.setRole('');
        router.push('/');
    }
  }
  return (
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
            {t('shopper-app.shoppers-only')}
          </Typography>
          <Box
            aria-label="form"
            width={500}
            sx={{ p: 5, display: 'flex', justifyContent: 'center' }}
          >
            <CustomButton label="vendor-app-button" onClick={handleClick}>
              {loginContext.role === 'vendor' ? t('shopper-app.return-vendor-app') : t('shopper-app.return-admin-app')}
            </CustomButton>
          </Box>
        </CustomCard>
      </Box>
    </Container>
  )
}