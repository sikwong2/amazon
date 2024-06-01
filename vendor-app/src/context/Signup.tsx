import { PropsWithChildren, useState, createContext } from 'react';

export const SignupContext = createContext({
  signup: false,
  setSignUp: (signup: boolean) => {},
});

export const SignupProvider = ({ children }: PropsWithChildren<{}>) => {
  const [signup, setSignUp] = useState(false);
  return <SignupContext.Provider value={{ signup, setSignUp }}>{children}</SignupContext.Provider>;
};
