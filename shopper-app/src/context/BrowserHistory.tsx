import { PropsWithChildren, useState, createContext, useEffect } from 'react';


interface BrowserHistoryContextProps {
  productHistory: string[];
  addProductToHistory: (product: string) => void;
}

export const BrowserHistoryContext = createContext<BrowserHistoryContextProps>({
  productHistory: [],
  addProductToHistory: (product: string) => {}
});

export const BrowserHistoryProvider = ({children}:  PropsWithChildren<{}>) => {
  const isBrowser = typeof window !== 'undefined';
  const [productHistory, setProductHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isBrowser) {
      const storedHistory = sessionStorage.getItem('productHistory');
      setProductHistory(storedHistory ? JSON.parse(storedHistory) : []);
    }
  }, [isBrowser]);

  const addProductToHistory = (product: string) => {
    const updatedHistory = [...productHistory, product];
    setProductHistory(updatedHistory);
    if (isBrowser) {
      sessionStorage.setItem('productHistory', JSON.stringify(updatedHistory));
    }
  }

  return (
    <BrowserHistoryContext.Provider value={{productHistory, addProductToHistory}}>
      {children}
    </BrowserHistoryContext.Provider>
  )
}