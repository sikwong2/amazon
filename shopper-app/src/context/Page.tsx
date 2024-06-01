import { PropsWithChildren, useState, createContext, useEffect } from 'react';

export const PageContext = createContext({
  page: 'home',
  setPage: (page: string) => {},
});

export const PageProvider = ({ children }: PropsWithChildren<{}>) => {
  const isBrowser = typeof window !== 'undefined';
  const [page, setPage] = useState('home');
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => { // runs only client side during initial render
    if (isBrowser) {
      setPage(sessionStorage.getItem('page') || 'home');
      setIsRendered(true);
    }
  }, []);

  useEffect(() => { // runs after initial render
    if (isRendered) {
      sessionStorage.setItem('page', page);
    }
  }, [page, isRendered]);

  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>;
};
