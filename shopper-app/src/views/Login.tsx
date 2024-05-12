import React from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginContext } from '../context/Login'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {buttonTheme} from './Theme'
import { ThemeProvider } from '@mui/material';
import CustomButton from './Button';

export function Login() {
  const loginContext = React.useContext(LoginContext)
  const [user, setUser] = React.useState({email: '', password: ''});
  const { t } = useTranslation('common');

  // router to change pages
  const router = useRouter(); 

  const handleInputChange = (event: any) => {
    const {value, name} = event.target;
    const u = user;
    if (name == 'email') {
      u.email = value;
    } else {
      u.password = value;
    }
    setUser(u);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
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
        <Typography component="h1" variant="h5">
          {t("login.title")}
        </Typography>
        <Box aria-label='form'
          component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("login.email")}
            aria-label="Email"
            placeholder={t("login.emailaddress")!}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("login.password")}
            type="password"
            id="password"
            aria-label="Password"
            placeholder={t("login.password")!}
            autoComplete="current-password"
            onChange={handleInputChange}
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
        </Box>
      </Box>
    </Container>
  );
}