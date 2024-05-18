import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginContext } from '../context/Login'
import { useTranslation } from 'next-i18next';
import CustomTextField from '@/components/CustomTextfield';
import CustomButton from '@/components/Button';
import CustomDivider from '@/components/Divider';
import CustomCard from '@/components/Card';
import { Login } from './Login';
import { SignupContext } from '@/context/Signup';
import { SignUp } from './Signup';
import Logo from '../components/Logo';



export function Home() {
  const loginContext = React.useContext(LoginContext);
  const signupContext = React.useContext(SignupContext);

  if (signupContext.signup == true) {
    return (
      <SignUp/>
    )
  } else {
    if (loginContext.accessToken.length < 1) {
      return (
        <Login/>
      )
    }
    else {
      return (
        <div>
          <Logo/>
        </div>
      )
    }
  }
}