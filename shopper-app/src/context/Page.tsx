import { PropsWithChildren, useState, createContext } from "react";

export const PageContext = createContext({
  page: '',
  setPage: (page: string) => { }
});

export const PageProvider = ({ children }: PropsWithChildren<{}>) => {
  const [page, setPage] = useState('home');

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  )
}