import { CartContext } from '@/context/Cart'
import { Box, Grid, Container, List, ListItem, Typography, autocompleteClasses } from '@mui/material';
import { useContext, useState } from 'react'
import CustomCard from '../components/Card'
import CustomButton from '@/components/Button';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { Product } from '@/graphql/product/schema';
import { useRouter } from 'next/router';
import { CartItem } from '@/components/CartItem';
import CustomDivider from '@/components/Divider';
import Logo from '@/components/Logo';
import CustomLink from '@/components/Link';

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
      return [];
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

const deleteOrder = async (orderId: string): Promise<string> => {
  try {
    const query = { query: `mutation deleteOrder{ deleteOrder(orderId: "${orderId}") {orderId}}` };
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
    return json.data.deleteOrder.orderId;
  } catch (e) {
    console.log(e);
    throw new Error('Cart.tsx: deleteOrder');
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

export function Checkout() {
  const { cart } = useContext(CartContext);
  const { t } = useTranslation('common');
  const [subtotal, setSubtotal] = useState(0);
  const router = useRouter();
  const [cartItems, setCartItems]: any = useState([]);
  useEffect(() => {
    (async () => {
      let total = 0;
      const temp: any = []
      for (const productId of cart) {
        const product = await fetchProduct(productId);
        total += product.price;
        temp.push(
          <CartItem
            key={productId}
            productId={productId}
            name={product.name}
            image={product.image ? product.image[0] : undefined}
            price={product.price}
            rating={product?.rating}
          />
        )
      }
      setCartItems(temp);
      setSubtotal(Number(Number(total).toFixed(2)));
    })()
  }, [subtotal, cart])

  return (
    <Container 
    maxWidth='xl' 
    style={{ paddingLeft: '13px', paddingRight: '13px' }} >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop:15, 
        marginLeft:0,
        fontSize: 28,
        borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
        marginBottom: 16,
        fontWeight: 400,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 1))',
        height: '60px',
        width: '100%'}}>
        <Logo style={{ 
        width:'300px', 
        height:'62px', 
        marginLeft: '80px', }}
        transparent= "true" 
        />
        <div style={{
          marginLeft: '242px', marginRight: 'auto',
          marginBottom: 10,
        }}>
          Checkout (1 item)
        </div>
      </div> 
      <Container sx={{ display: 'flex',  flexDirection: 'row' }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
          <Grid container spacing={2}>
            <Grid item xs = {4}>
              <Typography 
              variant='h3' 
              component='h3' 
              gutterBottom 
              sx={{ fontSize: '18px', 
              fontWeight: '700',
              whiteSpace: 'pre',
              fontFamily: 'Amazon Ember' }}>
                1    Shipping address 
              </Typography>
            </Grid>
            <Grid item xs = {6}>
              <List sx={{ padding: 0, marginTop: 0.3}}>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                    name
                </ListItem>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                    address
                </ListItem>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                  Add delivery instructions *link*
                </ListItem>
              </List>
            </Grid>
          </Grid> 
          <CustomDivider sx={{marginTop: 1.5, marginBottom: 1.5}}></CustomDivider>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                variant='h3'
                component='h3'
                gutterBottom
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#0f1111',
                }}>
                2    Payment method
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <List sx={{ padding: 0, marginTop: 0.3 }}>
                <ListItem sx={{ padding: 0, margin: 0, fontWeight: 'bold' }}>
                  Paying with ****
                </ListItem>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                  Billing address: Same as shipping address
                </ListItem>
                <ListItem sx={{ padding: 0, margin: 0 }}>
                  Add delivery instructions *link*
                </ListItem>
              </List>
            </Grid>
          </Grid> 
          <CustomDivider sx={{ marginTop: 1.5, marginBottom: 1.5 }}></CustomDivider>
          <Typography
            variant='h3'
            component='h3'
            gutterBottom
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              whiteSpace: 'pre',
              marginBottom: 1.5,
              color: '#0f1111',
            }}>
            3    Review items and shipping
          </Typography>
          <CustomCard sx={{ display: 'block', minHeight: '100%' }}>
            <Typography variant='h4' component='h1' gutterBottom sx={{ marginLeft: '1em' }}>
              {t("cart.shopping-cart")}
            </Typography>
            <List>
              {cartItems}
            </List>
          </CustomCard>
          <CustomCard>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#0f1111',
            }}>
              {t("cart.subtotal") +
                `(${cart.length} ${cart.length == 1 ? t("cart.item") : t("cart.items")}): 
            $ ${subtotal}`}
              <CustomButton
                type='submit'
                label='checkout'
                variant='contained'
                color='primary'
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  router.push('/'); // CHANGE THIS TO REDIRECT TO CHECKOUT
                }}
              >
                {t("cart.proceed-to-checkout")}
              </CustomButton>
            </Box>
          </CustomCard>
        </Container>
        <Container maxWidth='sm' sx={{ flex: 1, justifyContent: 'center'}}> 
          <CustomCard type='rounded'
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='body1' sx={{ mt: 2, mb: 1, fontSize: '12px', textAlign: 'center'}}>
              <CustomButton
              label='Place Order'
              variant='contained'
              pill
              sx={{
                width: '240px',
                height: '33px', 
                fontSize: '13px',
                margin: 'auto'
              }}
              >
              Place your Order
              </CustomButton>
              </Typography>
            <Typography variant='body1' sx={{ mt: 1, mb: 1, fontSize: '12px', textAlign:'center', ml: '20px', mr: '20px' }}>
                By placing your order, you agree to Amazon's&nbsp;
                <CustomLink label='privacy-notice' variant='blue2' href='https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496'>
                  {t("signup.privacy-notice")}
                </CustomLink>
                &nbsp; and &nbsp; 
                <CustomLink label='conditions-of-use' variant='blue2' href='https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?nodeId=GLSBYFE9MGKKQXXM&ie=UTF8&ref_=ap_signin_notification_condition_of_use'>
                  {t("signup.conditions")}
                </CustomLink>
              </Typography>
              <CustomDivider sx = {{ margin:'auto', width:'235px'}}></CustomDivider>
              <Typography
              variant="h3"
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                textAlign: 'left',
                ml: '19px',
                mt: '12px',
                mb: '13px'
              }}>
                 Order Summary
              </Typography>
          </CustomCard>
        </Container>
      </Container>
    </Container>
  )
}