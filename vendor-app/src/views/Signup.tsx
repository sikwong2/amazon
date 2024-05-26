import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import CustomTextField from '../components/CustomTextfield';
import CustomButton from '../components/Button';
import Logo, { defaultLogoWidth } from '../components/Logo';
import CustomCard from '@/components/Card';
import CustomDivider from '@/components/Divider';
import { SignupContext } from '@/context/Signup';
import CustomLink from '@/components/Link';

export function SignUp() {
  const signupContext = React.useContext(SignupContext);
  const [user, setUser] = React.useState({ name: '', email: '', password: '', reenter: '' });
  const [error, setError] = React.useState('');
  const [blankerror, setBlankError] = React.useState('');
  const { t } = useTranslation('common');

  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const u = user;
    u.email = data.get('Email')!.toString();
    u.password = data.get('Password')!.toString();
    u.reenter = data.get('Re-enter password')!.toString();
    u.name = data.get('Name')!.toString();
    setUser(u);
    setError('');
    setBlankError('');
    if (u.email == '' || u.password == '' || u.name == '') {
      const e = t('signup.blank-error');
      setBlankError(e);
      return;
    } else if (u.password != u.reenter) {
      const e = t('signup.password-must-match');
      setError(e);
      return;
    } else {
      const query = {
        query: `mutation createaccount{ createaccount( input: {name: "${user.name}"  email: "${user.email}" password: "${user.password}" role: "vendor"} ) { role }}`,
      };
      // NOTE: on the server, URL should be /api/graphql
      fetch('/vendor/api/graphql', {
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
            alert(`${json.errors[0].message}`);
          } else {
            signupContext.setSignUp(false);
          }
        });
    }
  };

  const loginAccount = () => {
    signupContext.setSignUp(false);
  };

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
        <CustomCard sx={{ borderRadius: '8px', width: 348, p: '14px 18px', mb: 3 }}>
          <Typography component="h1" variant="h5" sx={{ mb: '10px', pb: '4px' }}>
            {t('signup.title')}
          </Typography>
          <Box aria-label="form" component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            {blankerror != '' && (
              <Typography color="red" sx={{ ml: 0.1, mb: 2 }}>
                ! {blankerror}
              </Typography>
            )}
            <CustomTextField
              inputLabel={t('signup.name') as string}
              label={t('signup.name') as string}
              placeholder={t('signup.first-last')!}
              required
              type="name"
              name="Name"
              sx={{ mb: 1.8 }}
              autoFocus
            />
            <CustomTextField
              inputLabel={t('signup.email') as string}
              label={t('signup.email') as string}
              placeholder={t('signup.email')!}
              required
              type="email"
              name="Email"
              sx={{ mb: 1.8 }}
              autoFocus
            />
            <CustomTextField
              inputLabel={t('signup.password') as string}
              label={t('signup.password') as string}
              placeholder={t('signup.password-min')!}
              required
              type="password"
              name="Password"
              sx={{ mb: 2 }}
              autoFocus
            />
            <CustomTextField
              inputLabel={t('signup.re-enter') as string}
              label={t('signup.re-enter') as string}
              required
              type="password"
              name="Re-enter password"
              sx={{ mb: 2 }}
              autoFocus
            />
            {error != '' && (
              <Typography color="red" sx={{ ml: 0.1 }}>
                ! {error}
              </Typography>
            )}
            <CustomButton
              type="submit"
              label="continue"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ height: '30px', fontSize: '12px' }}
            >
              {t('signup.continue')}
            </CustomButton>
          </Box>
          <Box aria-label="link-to-agreement">
            <Typography variant="body1" sx={{ mt: 2, mb: 3, fontSize: '12px' }}>
              {t('signup.agreement')}
              <CustomLink
                label="conditions-of-use"
                variant="blue2"
                href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?nodeId=GLSBYFE9MGKKQXXM&ie=UTF8&ref_=ap_signin_notification_condition_of_use"
              >
                {t('signup.conditions')}
              </CustomLink>
              {t('signup.and')}
              <CustomLink
                label="privacy-notice"
                variant="blue2"
                href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496"
              >
                {t('signup.privacy-notice')}
              </CustomLink>
              .
            </Typography>
          </Box>
          <Box aria-label="link-to-shopper">
            <CustomDivider sx={{ mt: 2, mb: 2 }} />
            <Typography
              variant="body1"
              sx={{ mt: 2, mb: 0.5, fontSize: '13px', fontWeight: 'bold' }}
            >
              {t('buying-for-yourself')}
            </Typography>
            <Box sx={{ fontSize: '13px' }}>
              <CustomLink label="shopper-account" href="/" variant="blue2">
                {t('shopper-account')}
              </CustomLink>
            </Box>
          </Box>
          <Box>
            <CustomDivider sx={{ mt: 2, mb: 3 }} />
            <Typography sx={{ fontSize: '13px' }}>
              {t('signup.account-exists')}{' '}
              <CustomLink label="login" variant="blue2" href="/vendor">
                {' '}
                {t('signup.sign-in')}{' '}
              </CustomLink>
            </Typography>
          </Box>
        </CustomCard>
      </Box>
    </Container>
  );
}
