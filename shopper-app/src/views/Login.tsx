import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginContext } from '../context/Login'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import CustomTextField from '../components/CustomTextfield'
import CustomButton from '../components/Button';
import Logo from '../components/Logo';
import CustomCard from '@/components/Card';
import CustomDivider from '@/components/Divider';
import CustomLink from '@/components/Link';
import { defaultLogoWidth } from '../components/Logo';

export function Login() {
  const loginContext = React.useContext(LoginContext)
  const [user, setUser] = React.useState({ email: '', password: '' });
  const { t } = useTranslation('common');

  // router to change pages
  const router = useRouter();

  const createAccount = () => {
    router.push('/signup');
  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const u = user;
    u.email = data.get('Email Address')!.toString();
    u.password = data.get('Password')!.toString();
    setUser(u);
    const query = { query: `query login{login(email: "${user.email}" password: "${user.password}") { id, name, accessToken }}` }
    fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.errors) {
          alert(`${json.errors[0].message}`)
        } else {
          loginContext.setAccessToken(json.data.login.accessToken)
          loginContext.setUserName(json.data.login.name)
          loginContext.setId(json.data.login.id);
          router.push('/'); // sets path to home page
        }
      })
      .catch((e) => {
        alert(e)
      });
  };

  return (
    <Container component="main" 
      sx={{ mb:'28px', pt:'14px', pb:'18px', display: 'flex',
          flexDirection: 'column', alignItems: 'center'
      }}
    >
      <CssBaseline />
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb:2.5}}>
        <Logo width={defaultLogoWidth} height='auto'/>
      </Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CustomCard sx={{ borderRadius:'8px', width:348, p: '20px 26px', mb:2.5 }}>
          <Typography component="h1" variant="h5" sx={{ mb:'10px', pb:'4px' }}>
            {t("login.signin")}
          </Typography>
          <Box aria-label='form'
            component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}
            >
            <CustomTextField
              inputLabel={t("login.email") as string}
              label={t("login.email") as string}
              required
              type="email"
              name='Email Address'
              sx={{mb:2}}
              autoComplete="email"
              autoFocus
              />
            <CustomTextField
              inputLabel={t("login.password") as string}
              label={t("login.password") as string}
              required
              type="password"
              name='Password'
              sx={{mb: 3}}
              autoComplete="current-password"
            />
            <CustomButton
              type="submit"
              label="sign in"
              fullWidth
              variant="contained"
              color="primary"
              >
              {t("login.signin")}
            </CustomButton>
          </Box>
          <Box aria-label='link-to-agreement'>
            <Typography variant='body1' sx={{ mt:2, fontSize:'12px' }}>
              {t("login.agreement")}
              <CustomLink label='conditions-of-use' variant='blue2' href='https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?nodeId=GLSBYFE9MGKKQXXM&ie=UTF8&ref_=ap_signin_notification_condition_of_use'>
                {t("login.conditions")}
              </CustomLink>
              {t("login.and")}
              <CustomLink label='privacy-notice' variant='blue2' href='https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496'>
                {t("login.privacy-notice")}
              </CustomLink>
              .
            </Typography>
          </Box>
          <Box aria-label='link-to-vendor'>
            <CustomDivider sx={{mt: 2, mb: 2}}/>
            <Typography variant='body1' sx={{ mt:2, mb:.5, fontSize:'13px', fontWeight:'bold' }}>
              {t('buying-for-work')}
            </Typography>
            <Box sx={{ fontSize:'13px' }}>
              <CustomLink label="vendor-account" href="/vendor" variant='blue2' >
                {t('vendor-account')}
              </CustomLink>
            </Box>
          </Box>
        </CustomCard>
        <CustomDivider sx={{fontSize:'12px', mb:2}}>{t('login.new-to-amazon')}</CustomDivider>
        <CustomButton 
          label={t("login.create-account") as string} 
          variant="text" 
          disableElevation={false} 
          onClick={createAccount} 
          fullWidth 
          sx={{fontSize:'13px'}}
        >
          {t("login.create-account")}
        </CustomButton>
      </Box>
    </Container>
  )
}