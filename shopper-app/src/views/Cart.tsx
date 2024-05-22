import { OrderContext } from '@/context/Order'
import { Avatar, Box, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import { useContext, useState } from 'react'
import CustomCard from '../components/Card'
import CustomButton from '@/components/Button';
import { useTranslation } from 'next-i18next';
import { LoginContext } from '@/context/Login';
import { useEffect } from 'react';
import { Product } from '@/graphql/product/schema';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CustomDivider from '@/components/Divider';

const fetchOrders = async (shopperId: string) => {
  try {
    const query = { query: `query orders{getByShopperId(shopperId: "${shopperId}") { productId, orderId }}` };
    const res = await fetch('api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors[0].message);
      return [];
    }
    const orders:any = {};
    for (const {orderId, productId} of json.data.getByShopperId) {
      orders[orderId] = productId;
    }
    return orders;
  } catch (e) {
    console.log(e);
    return [];
  }
}

const deleteOrder = async (orderId: string): Promise<string> => {
  try {
    const query = {query: `mutation deleteOrder{ deleteOrder(orderId: "${orderId}") {orderId}}`};
    const res = await fetch('api/graphql', {
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
    return json.data.deleteOrder.orderId;
  } catch(e) {
    console.log(e);
    throw new Error('Cart.tsx: deleteOrder');
  }
}

const fetchProduct = async (productId: any): Promise<Product> => {
  try {
    const query = { query: `query product{getByProductId(productId: "${productId}") {name, price, image, stock}}` };
    const res = await fetch('api/graphql', {
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
export function Cart() {
  const {orders, setOrders} = useContext(OrderContext);
  const loginContext = useContext(LoginContext);
  const { t } = useTranslation('common');
  const [subtotal, setSubtotal] = useState(0);
  const [cart, setCart] = useState([]);
  console.log(loginContext);
  useEffect(() => {
    (async () => {
      // Remember to  change the id]
      console.log(loginContext);
      const newOrders = await fetchOrders(loginContext.id);
      // const newOrders = await fetchOrders('92846fcb-9c73-4fc6-b652-3443874118b8');
      setOrders([...Object.keys(newOrders)]);
      let total = 0;
      const temp: any = [];
      for (const [orderId, productId] of Object.entries(newOrders)) {
        const product = await fetchProduct(productId);
        total += product!.price;
        temp.push(
          <CustomDivider key={orderId}>
            <Paper elevation={0}  sx={{ marginBottom: '16px'}} >
              <ListItem sx={{display: 'flex', justifyContent: 'space-evenly', minWidth: '100%' }}>
                <ListItemAvatar>
                  <Avatar variant='square' src={`${product.image[0]}`} sx={{ width: '150px', height: '150px' }} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`$${product.price / 100}`}
                  sx={{ marginLeft: '16px' }}
                />
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  sx={{ marginLeft: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Grid item>
                    <CustomButton
                      color="primary"
                      onClick={async () => {
                        setOrders(orders.filter((order:string) => order !== orderId));
                        console.log(orderId, orders);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </CustomButton>
                  </Grid>
                </Grid>
              </ListItem>
            </Paper>
          </CustomDivider>
        )
      }
      setCart(temp);
      setSubtotal(total)
    })()
  }, [])
  return (
    <Container maxWidth="md">
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CustomCard sx={{ display: 'block', minHeight: '100%' }}>
          <Typography variant='h4' component='h1' gutterBottom sx={{ marginLeft: '1em' }}>
            Shopping Cart
          </Typography>
          <List>
            {cart}
          </List>
        </CustomCard>
        <CustomCard>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {`Subtotal 
          (${cart.length} ${cart.length == 1 ? "item" : "items"}): 
          $ ${subtotal / 100}`}
            <CustomButton
              type='submit'
              label='checkout'
              variant='contained'
              color='primary'
              sx={{ mt: 3, mb: 2 }}
            >
              {"Proceed to Checkout"}
            </CustomButton>
          </Box>
        </CustomCard>
      </Container>
    </Container>
  )
}