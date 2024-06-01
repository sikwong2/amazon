import { Login } from '../views/Login';
import { LoginProvider } from '../context/Login';
import { AdminPortal } from './AdminPortal';

export function App() {
  return (
    <LoginProvider>
      <Login />
      <AdminPortal />
    </LoginProvider>
  );
}
