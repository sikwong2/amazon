import { Login } from '../views/Login'
import { LoginProvider } from '../context/Login'


export function App() {
  return (
      <LoginProvider>
        <Login/>
      </LoginProvider>
  )
}