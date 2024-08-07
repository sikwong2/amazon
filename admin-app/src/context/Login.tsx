import Loading from '@/views/Loading';
import { PropsWithChildren, useState, createContext, useEffect } from 'react';

export const LoginContext = createContext({
  userName: '',
  setUserName: (userName: string) => {},
  accessToken: '',
  setAccessToken: (accessToken: string) => {},
  role: '',
  setRole: (role: string) => {},
  id: '',
  setId: (id: string) => {},
});

export const LoginProvider = ({ children }: PropsWithChildren<{}>) => {
  const isBrowser = typeof window !== 'undefined';
  const [userName, setUserName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [isRendered, setIsRendered] = useState(false);
  
  useEffect(() => { // runs only client side during initial render
    if (isBrowser) {
      setUserName(sessionStorage.getItem('userName') || '');
      setAccessToken(sessionStorage.getItem('accessToken') || '');
      setId(sessionStorage.getItem('userId') || '');
      setRole(sessionStorage.getItem('role') || '');
      setIsRendered(true);
    }
  }, []);

  useEffect(() => { // runs after initial render
    if (isRendered) {
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('userId', id);
    }
  }, [userName, accessToken, role, id, isRendered]);

  if (!isRendered) {
    return (
      <>
        <Loading/>
      </>
    )
  }
  
  return (
    <LoginContext.Provider
      value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}
    >
      {children}
    </LoginContext.Provider>
  );
};
