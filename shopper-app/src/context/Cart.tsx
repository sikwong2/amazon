import { PropsWithChildren, useState, createContext, Dispatch, SetStateAction } from "react";

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
  const [cart, setCart] = useState<ICart>({});
  
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

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateProductQuantity }}>
      {children}
    </CartContext.Provider>
  )
}