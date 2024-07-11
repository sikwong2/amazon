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
      // const params = new URLSearchParams(window.location.search);
      // const oauthName = params.get('name');
      // console.log(`this is oauthName: ${oauthName}`)
      // const oauthToken = params.get('access_token');
      // if (oauthName) {
      //   console.log('came in if');
      //   sessionStorage.setItem('userName', 'test name');
      //   sessionStorage.setItem('accessToken', 'this is access token');
      //   sessionStorage.setItem('role', `member`);
      //   sessionStorage.setItem('userId', `92846fcb-9c73-4fc6-b652-3443874118b8`);
      //   setIsRendered(true);
      // } else {
        if(isBrowser){
          setUserName(sessionStorage.getItem('userName') || '');
          setAccessToken(sessionStorage.getItem('accessToken') || '');
          setId(sessionStorage.getItem('userId') || '');
          setRole(sessionStorage.getItem('role') || '');
          setIsRendered(true); 
        }
      // }
      
    }
  }, []);

  useEffect(() => { // runs after initial render
    const params = new URLSearchParams(window.location.search);
    const oauthName = params.get('name');
    console.log(`this is oauthName: ${oauthName}`)
    const oauthToken = params.get('access_token');
    const sub = params.get('sub');
    if (oauthName) {
      console.log('came in if for rendered');
      sessionStorage.setItem('userName', oauthName);
      sessionStorage.setItem('accessToken', oauthToken!);
      sessionStorage.setItem('role', `shopper`);
      sessionStorage.setItem('userId', sub);
    } 
    else {
      console.log('came in else for rendered')
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
