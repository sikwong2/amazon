import { PropsWithChildren, useState, createContext, useEffect } from 'react';


interface BrowserHistoryProduct {
  productId: string;
  date: Date;
}

interface BrowserHistoryContextProps {
  productHistory: BrowserHistoryProduct[];
  addProductToHistory: (product: BrowserHistoryProduct) => void;
}

export const BrowserHistoryContext = createContext<BrowserHistoryContextProps>({
  productHistory: [],
  addProductToHistory: (product: BrowserHistoryProduct) => {}
});

export const BrowserHistoryProvider = ({children}:  PropsWithChildren<{}>) => {
  const isBrowser = typeof window !== 'undefined';
  const [productHistory, setProductHistory] = useState<BrowserHistoryProduct[]>([]);

  useEffect(() => {
    if (isBrowser) {
      const storedHistory = sessionStorage.getItem('productHistory');
      setProductHistory(storedHistory ? JSON.parse(storedHistory) : []);
    }
  }, []);

  const addProductToHistory = (product: BrowserHistoryProduct) => {
    const productExists = productHistory.some(
      (historyItem) => historyItem.productId === product.productId
    );
  
    if (!productExists) {
      const updatedHistory: BrowserHistoryProduct[] = [...productHistory, product];
      setProductHistory(updatedHistory);
      sessionStorage.setItem('productHistory', JSON.stringify(updatedHistory));
    }
  }

  return (
    <BrowserHistoryContext.Provider value={{productHistory, addProductToHistory}}>
      {children}
    </BrowserHistoryContext.Provider>
  )
}