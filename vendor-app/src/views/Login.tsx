import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginContext } from '../context/Login'
import { useTranslation } from 'next-i18next';
import CustomTextField from '@/components/CustomTextfield';
import CustomButton from '@/components/Button';
import Logo from '../components/Logo';
import CustomDivider from '@/components/Divider';
import CustomCard from '@/components/Card';
import { SignupContext } from '@/context/Signup';


export function Login() {
  const loginContext = React.useContext(LoginContext);
  const signupContext = React.useContext(SignupContext);
  const [user, setUser] = React.useState({ email: '', password: '' });
  const { t } = useTranslation('common');

  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const u = user;
    u.email = data.get('Email Address')!.toString();
    u.password = data.get('Password')!.toString();
    setUser(u);
    const query = { query: `query login{login(email: "${user.email}" password: "${user.password}") { name, accessToken }}` }
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
          alert(`${json.errors[0].message}`);
        } else {
          loginContext.setAccessToken(json.data.login.accessToken);
          loginContext.setUserName(json.data.login.name);
          loginContext.setRole(json.data.login.role);
        }
      })
      .catch((e) => {
        alert(e)
      });
  };

  const createAccount = () => {
    signupContext.setSignUp(true);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo />
        <CustomCard sx={{ mb: 1, mt: 3 }}>
          <Typography component="h1" variant="h5" align="center">
            {t("login.title")}
          </Typography>
          <Box aria-label='form' width={500}
            component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, mb: 1 }}
          >
            <CustomTextField
              label={t("login.email") as string}
              placeholder={t("login.emailaddress")!}
              required
              type="email"
              name='Email Address'
              sx={{ mt: 1, mb: 1 }}
              autoComplete="email"
              autoFocus
            />
            <CustomTextField
              label={t("login.password") as string}
              placeholder={t("login.password")!}
              required
              type="password"
              name='Password'
              sx={{ mt: 1 }}
              autoComplete="current-password"
            />
            <CustomButton
              type="submit"
              label="sign in"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("login.signin")}
            </CustomButton>
            <CustomDivider></CustomDivider>
          </Box>
        </CustomCard>
      </Box>
      <CustomDivider> {t("login.new-to-amazon")} </CustomDivider>
      <CustomButton label={t("login.create-account") as string} variant="text" disableElevation={false} onClick={createAccount} fullWidth sx={{ mt: 2 }}>
        {t("login.create-account")}
      </CustomButton>
    </Container>
  );

}
