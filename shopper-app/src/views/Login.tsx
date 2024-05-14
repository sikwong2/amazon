import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginContext } from '../context/Login'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import CustomTextField from '../components/CustomTextfield'
import CustomButton from '../components/Button';
import CustomCard from '@/components/Card';
import { Divider } from '@mui/material';
import CustomDivider from '../components/Divider'

export function Login() {
  const loginContext = React.useContext(LoginContext)
  const [user, setUser] = React.useState({email: '', password: ''});
  const { t } = useTranslation('common');

  // router to change pages
  const router = useRouter(); 

  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const u = user;
    u.email = data.get('Email Address')!.toString();
    u.password = data.get('Password')!.toString();
    setUser(u);
    // console.log(user);
    const query = {query: `query login{login(email: "${user.email}" password: "${user.password}") { name, accessToken }}`}
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
          router.push('/'); // sets path to home page
        }
      })
      .catch((e) => {
        alert(e)
      });
  };

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
        <CustomCard>
        <Typography component="h1">
          {t("login.title")}
        </Typography>
        <Box aria-label='form' width={500}
          component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}
        >
          <CustomTextField
            label={t("login.email") || 'email'}
            placeholder={t("login.emailaddress")!}
            required
            type="email"
            name='Email Address'
            sx={{mt: 1, mb: 1}}
            autoComplete="email"
            autoFocus
          />
          <CustomTextField
            label={t("login.password") || 'password'}
            placeholder={t("login.password")!}
            required
            type="password"
            name='Password'
            sx={{mt: 1}}
            autoComplete="current-password"
          />
          <CustomButton
            type="submit"
            label="sign in"
            fullWidth
            variant="contained"
            color="primary"
            sx={{mt: 3, mb: 2}}
          >
            {t("login.signin")}
          </CustomButton>
          <CustomDivider></CustomDivider>
        </Box>
        </CustomCard>
      </Box>
      <CustomDivider> New to Amazon?! </CustomDivider>
    </Container>
  );
}