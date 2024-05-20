import { useContext, useEffect, useState } from 'react';
import { LoginProvider, LoginContext } from '../context/Login'
import { SignupProvider } from '@/context/Signup'
import { Home } from './Home'

export function App() {
  return (
    <LoginProvider>
      <SignupProvider>
        <Home/>
      </SignupProvider>
    </LoginProvider>
  )
}