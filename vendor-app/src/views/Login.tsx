import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginContext } from '../context/Login'
import { useTranslation } from 'next-i18next';
import CustomTextField from '@/components/CustomTextfield';
import CustomButton from '@/components/Button';

export function Login() {
  const loginContext = React.useContext(LoginContext)
  const [user, setUser] = React.useState({email: '', password: ''});
  const { t } = useTranslation('common');

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
        }
      })
      .catch((e) => {
        alert(e)
      });
  };

  const LoginComponent = (
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
        <Box aria-label='form' width={500}
          component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}
        >
          <CustomTextField
            label={t("login.email") || 'email'}
            placeholder={t("login.emailaddress")!}
            required
            type="email"
            sx={{mt: 1, mb: 1}}
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <CustomTextField
            label={t("login.password") || 'password'}
            placeholder={t("login.password")!}
            required
            type="password"
            sx={{mt: 1}}
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
  
  if (loginContext.accessToken.length < 1) {
    return (
      LoginComponent
    )
  }
  else {
    return null
  }
}
