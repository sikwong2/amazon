import CustomCard from "@/components/Card";
import CustomDivider from "@/components/Divider";
import { LoginContext } from "@/context/Login"
import { Container, List, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { Product } from "@/graphql/product/schema";
import { OrderItem } from "@/components/OrderItem";
import CustomButton from "@/components/Button";
import { useTranslation } from "next-i18next";
import TopBar from "@/components/TopBar";
import OrderCard from "@/components/OrderCard";

import type { OrdersInfo } from "@/graphql/orders/schema";

const fetchOrders = async (shopperId: string): Promise<OrdersInfo[]> => {
  try {
    const query = { query: `query orders{getOrders(shopperId: "${shopperId}") { products, orderId, vendorId, orderStatus }}` };
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors[0].message);
      throw new Error('OrderHistory.tsx: fetchOrders');
    }
    const orders: OrdersInfo[] = [];
    json.data.getOrders.forEach((order: any) => {
      orders.push(order);
    })
    console.log(orders);
    return orders;
  } catch (e) {
    console.log(e);
    return [];
  }
}


export function OrderHistory() {
  const { id } = useContext(LoginContext);
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState('pending');
  const { t } = useTranslation('common');

  useEffect(() => {
    (async () => {
      const shippedOrders: OrdersInfo[] = await fetchOrders(id);
      setOrders(shippedOrders);
    })()
  }, [])
  return (
    <>
      <TopBar />
      <Container maxWidth='lg'>
        <Typography variant='h4' component='h1' gutterBottom sx={{ color: 'black', mt: '16px' }}>
          {t("history.your-orders")}
        </Typography>
        { orders.length > 0 && orders.map((order) => {
          return (
            <OrderCard key={order.orderId} orderStatus={order.orderStatus} productIds={order.products} orderNumber={order.orderId}/>
          )
          }
        )}
      </Container>
    </>
  )
}