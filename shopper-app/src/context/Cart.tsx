import Loading from '@/views/Loading';
import { PropsWithChildren, useState, createContext, Dispatch, SetStateAction, useEffect } from 'react';
import { LoginContext } from './Login';
import React from 'react';

interface ICart {
  [productId: string]: number
}

interface ICartContext {
  cart: ICart;
  setCart: Dispatch<SetStateAction<ICart>>;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<ICartContext>({
  cart: {},
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateProductQuantity: () => {}
})

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const isBrowser = typeof window !== 'undefined';
  const { id: userId } = React.useContext(LoginContext);
  // save different cart per user
  const cartKey = userId ? `cart_${userId}` : 'cart_guest';
  const [cart, setCart] = useState<ICart>({});
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => { // runs only client side during initial render
    if (isBrowser) {
      const sessionCart = sessionStorage.getItem(cartKey);
      setCart(sessionCart ? JSON.parse(sessionCart) : {});
      setIsRendered(true);
    }
  }, [cartKey]);

  useEffect(() => { // runs after initial render
    if (isRendered) {
      sessionStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, cartKey, isRendered]);
  
  // works if adding a new product or adding a duplicate
  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(oldCart => {
      const newQuantity = (oldCart[productId] || 0) + quantity;
      return { ...oldCart, [productId]: newQuantity };
    });
  }

  const removeFromCart = (productId: string) => {
    setCart(oldCart => {
      const newCart = { ...oldCart };
      delete newCart[productId];
      return newCart;
    });
  }

  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      setCart(oldCart => {
        return {...oldCart, [productId]: quantity}
      })
    } else {
      setCart(oldCart => {
        const newCart = { ...oldCart };
        delete newCart[productId];
        return newCart;
      });
    }
  }

  if (!isRendered) {
    return (
      <Loading/>
    )
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateProductQuantity }}>
      {children}
    </CartContext.Provider>
  )
}
