import { LoginProvider } from '../context/Login'
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