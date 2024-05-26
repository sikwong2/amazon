import { Login } from '../views/Login'
import { LoginProvider } from '../context/Login'
import { Approval } from '../views/Approval'

export function App() {
  return (
    <LoginProvider>
        <Login/>
        <Approval/>
    </LoginProvider>
  )
}