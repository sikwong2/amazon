import { LoginProvider } from '@/context/Login'
import { Login } from '@/views/Login'


// to create new page add a new file with page name under pages
// https://nextjs.org/learn-pages-router/basics/navigate-between-pages
export default function LoginPage() {
  return (
    <LoginProvider>
      <Login/>
    </LoginProvider>
  )
}