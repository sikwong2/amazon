
import { PropsWithChildren, useState, createContext, SetStateAction } from "react";
import { Dispatch } from "react";
export const LoginContext = createContext({
  userName: '',
  setUserName: (userName: string) => {},
  accessToken: '',
  setAccessToken: (accessToken: string) => {},
  id: '',
  setId: (id: string) => {}
});

// interface ILoginContext {
//   userName: string,
//   setUserName: Dispatch<SetStateAction<string>>,
//   accessToken: string,
//   setAccessToken: Dispatch<SetStateAction<string>>,
//   id: string,
//   setId: Dispatch<SetStateAction<string>>,
// }

// export const LoginContext = createContext<ILoginContext>({
//   userName: '',
//   setUserName: () => {},
//   accessToken: '',
//   setAccessToken: () => {},
//   id: '',
//   setId: () => {},
// })

export const LoginProvider = ({ children }: PropsWithChildren<{}>) => {
  const [userName, setUserName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [id, setId] = useState('');
  return (
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, id, setId}}>
      {children}
    </LoginContext.Provider>
  );
};