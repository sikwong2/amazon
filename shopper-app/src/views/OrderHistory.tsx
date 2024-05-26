import CustomCard from "@/components/Card";
import CustomDivider from "@/components/Divider";
import { LoginContext } from "@/context/Login"
import { Container, List, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { Product } from "@/graphql/product/schema";
import { OrderItem } from "@/components/OrderItem";
import CustomButton from "@/components/Button";
import { useTranslation } from "next-i18next";
const fetchOrders = async (shopperId: string, status: string) => {
  try {
    const query = { query: `query orders{getOrdersByStatus(shopperId: "${shopperId}", status: "${status}") { productId, orderId }}` };
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
    const orders: any = {};
    for (const { orderId, productId } of json.data.getOrdersByStatus) {
      orders[orderId] = productId;
    }
    return orders;
  } catch (e) {
    console.log(e);
    return [];
  }
}

const fetchProduct = async (productId: any): Promise<Product> => {
  try {
    const query = { query: `query product{getByProductId(productId: "${productId}") {name, price, image, stock, rating}}` };
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
      throw new Error(json.errors[0].message);
    }
    return json.data.getByProductId;
  } catch (e) {
    console.log(e);
    throw new Error('');
  }
}

export function OrderHistory() {
  const { id } = useContext(LoginContext);
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState('pending');
  const { t } = useTranslation('common');
  useEffect(() => {
    (async () => {
      const shippedOrders = await fetchOrders(id, status);
      const temp: any = [];
      for (const [orderId, productId] of Object.entries(shippedOrders)) {
        const product = await fetchProduct(productId);
        temp.push(
          <OrderItem
            key={orderId}
            productId={String(productId)}
            name={product.name}
            image={product.image[0]}
          />
        )
      }
      setOrders(temp);
    })()
  }, [status])
  return (
    <Container maxWidth='md'>
      <CustomDivider>
        <Typography variant='h4' component='h1' gutterBottom sx={{ color: 'black' }}>
          {t("history.your-orders")}
        </Typography>
      </CustomDivider>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CustomButton
          label='pending'
          sx={{ margin: '1em' }}
          onClick={() => setStatus('pending')}
        >
          {t("history.pending")}
        </CustomButton>
        <CustomButton
          label='shipped'
          sx={{ margin: '1em' }}
          onClick={() => setStatus('shipped')}
        >
          {t("history.shipped")}
        </CustomButton>
        <CustomButton
          label='Completed'
          sx={{ margin: '1em' }}
          onClick={() => setStatus('completed')}
        >
          {t("history.completed")}
        </CustomButton>
      </Toolbar>
      {
        orders.length > 0 ?
          <CustomCard>
            <List>
              {orders}
            </List>
          </CustomCard> :
          <></>
      }
    </Container>
  )
}