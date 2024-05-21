import { PropsWithChildren, useState, createContext, Dispatch, SetStateAction } from "react";

// export const OrderContext = createContext({
//     orders: [],
//   setOrders: (orders: string[]) => {}
// });

interface IOrdersContext {
  orders: string[],
  setOrders: Dispatch<SetStateAction<string[]>>;
}
export const OrderContext = createContext<IOrdersContext>({
  orders: [],
  setOrders: () => {},
})

export const OrderProvider = ({ children }: PropsWithChildren<{}>) => {
  const [orders, setOrders] = useState<string[]>([]);

  return (
    <OrderContext.Provider value={{ orders, setOrders}}>
      {children}
    </OrderContext.Provider>
  )
}