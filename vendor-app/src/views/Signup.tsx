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
import Logo from '../components/Logo';
import CustomCard from '@/components/Card';
import CustomDivider from '@/components/Divider';
import { Link } from '@mui/material';
import { SignupContext } from '@/context/Signup';

export function SignUp() {
  const signupContext = React.useContext(SignupContext);
  const [user, setUser] = React.useState({name: '', email: '', password: '', reenter: ''});
  const [error, setError] = React.useState("");
  const [blankerror, setBlankError] = React.useState("");
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
      const e = t("signup.blank-error");
      setBlankError(e);
      return;
    } else if (u.password != u.reenter) {
      const e = t("signup.password-must-match");
      setError(e);
      return;
    } else {
      const query = {query: `mutation createaccount{ createaccount( input: {name: "${user.name}"  email: "${user.email}" password: "${user.password}" role: "vendor"} ) { role }}`}
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
            signupContext.setSignUp(false)
          }
        })
        .catch((e) => {
          alert(e)
        });
    }
  };

  const loginAccount = () => {
    signupContext.setSignUp(false)
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
        <Logo/>
        <CustomCard sx={{mt: 3, mb: 5}}>
          <Typography component="h1" variant="h5">
            {t("signup.title")}
          </Typography>
          <Box aria-label='form' width={400}
            component="form" onSubmit={onSubmit} noValidate sx={{mt: 3}}
          >
            {blankerror != '' &&
              <Typography color="red" sx={{ml: 0.1, mb: 2}}>
                ! {blankerror}
              </Typography>
            }
            <Typography component="h3" sx={{ml: 0.1}}>
              {t("signup.name")}
            </Typography>
            <CustomTextField
              label={t("signup.name") || 'name'}
              placeholder={t("signup.name")!}
              required
              type="name"
              name='Name'
              sx={{mt: 0.5, mb: 2}}
              autoFocus
            />
            <Typography component="h3" sx={{ml: 0.1}}>
              {t("signup.email")}
            </Typography>
            <CustomTextField
              label={t("signup.email") || 'email'}
              placeholder={t("signup.email")!}
              required
              type="email"
              name='Email'
              sx={{mt: 0.5, mb: 2}}
              autoFocus
            />
            <Typography component="h3" sx={{ml: 0.1}}>
              {t("signup.password")}
            </Typography>
            <CustomTextField
              label={t("signup.password") || 'password'}
              placeholder={t("signup.password")!}
              required
              type="password"
              name='Password'
              sx={{mt: 0.5, mb: 2}}
              autoFocus
            />
            <Typography component="h3" sx={{ml: 0.1}}>
              {t("signup.re-enter")}
            </Typography>
            <CustomTextField
              label={t("signup.re-enter") || 're-enter password'}
              required
              type="password"
              name='Re-enter password'
              sx={{mt: 0.5, mb: 0.5}}
              autoFocus
            />
            {error != '' &&
              <Typography color="red" sx={{ml: 0.1}}>
                ! {error}
              </Typography>
            }
            <CustomButton
              type="submit"
              label="continue"
              fullWidth
              variant="contained"
              color="primary"
              sx={{mt: 3, mb: 2}}
            >
              {t("signup.continue")}
            </CustomButton>
            <CustomDivider sx={{mt: 2, mb: 3}}/>
            <Typography>
              {t("signup.account-exists")} <Link onClick={loginAccount}> {t("signup.sign-in")} </Link>
            </Typography>
          </Box>
        </CustomCard>
      </Box>  
    </Container>
  )

}