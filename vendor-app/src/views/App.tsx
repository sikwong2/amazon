import { useContext, useEffect, useState } from 'react';

import { Login } from '../views/Login'
import { Approval } from '../views/Approval'
import { LoginProvider, LoginContext } from '../context/Login'

export function App() {
  return (
    <LoginProvider>
      <Login />
      <Approval />
    </LoginProvider>
  )
}