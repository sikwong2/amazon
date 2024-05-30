import { PropsWithChildren, useState, createContext, Dispatch, SetStateAction } from 'react';

interface ICartContext {
  cart: string[];
  setCart: Dispatch<SetStateAction<string[]>>;
}
export const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: (cart) => {},
});

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [cart, setCart] = useState<string[]>([]);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
