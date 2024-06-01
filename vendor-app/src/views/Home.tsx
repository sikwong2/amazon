import React from 'react';
import { LoginContext } from '../context/Login';
import { Login } from './Login';
import { SignupContext } from '@/context/Signup';
import { SignUp } from './Signup';
import { Approval } from './Approval';

export function Home() {
  const loginContext = React.useContext(LoginContext);
  const signupContext = React.useContext(SignupContext);

  if (signupContext.signup == true) {
    return <SignUp />;
  } else {
    if (loginContext.accessToken.length < 1) {
      return <Login />;
    } else {
      return <Approval />;
    }
  }
}
