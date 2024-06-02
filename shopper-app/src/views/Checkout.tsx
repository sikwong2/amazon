import { CartContext } from '@/context/Cart';
import {
  Box,
  Grid,
  Container,
  List,
  ListItem,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useContext, useState } from 'react';
import CustomCard from '../components/Card';
import CustomButton from '@/components/Button';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { Product } from '@/graphql/product/schema';
import { CheckoutItem } from '@/components/CheckoutItem';
import CustomDivider from '@/components/Divider';
import Logo from '@/components/Logo';
import CustomLink from '@/components/Link';
import { LoginContext } from '@/context/Login';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import DeliveryDate from '../components/DeliveryDate'
import { StripeProduct } from '@/graphql/stripe/schema';
import LockButton from '../components/LockButton'

interface UserDetails {
  name: string;
  address: string;
}

const fetchUserDetails = async (shopperId: string): Promise<UserDetails | undefined> => {
  try {
    const query = {
      query: `query member{getMemberInfo(memberId: "${shopperId}") { name, address }}`,
    };
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('this is res');
    console.log(res);
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors[0].message);
      return undefined;
    }
    const { name, address } = json.data.getMemberInfo;
    console.log(name);
    return { name, address };
  } catch (error) {
    console.error('Error fetching member info:', error);
    return { name: 'name error', address: 'address error' };
  }
};

const fetchProduct = async (productId: any): Promise<Product> => {
  try {
    const query = {
      query: `query product{getByProductId(productId: "${productId}") {name, price, image, stock, rating}}`,
    };
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
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
};

const placeOrder = async (products: StripeProduct[]) => {
  console.log('placeOrder', products);
  try {
    const query = `
      query checkoutURL($products: [StripeProduct!]!) {
        getCheckoutURL(products: $products)
      }
    `;
    
    const variables = {
      products: products
    };
    const res = await fetch(
      `/api/graphql`, {
      method: 'POST',
      body: JSON.stringify({query, variables}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors[0].message);
      throw new Error(json.errors[0].message);
    }
    window.location.href = json.data.getCheckoutURL;
  } catch (e) {
    console.log(e);
  }
}

export function Checkout() {
  const { cart } = useContext(CartContext);
  const { id } = useContext(LoginContext);
  const { t } = useTranslation('common');
  const [memberName, setMemberName] = useState('');
  const [address, setAddress] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems]: any = useState([]);
  const [stripeProducts, setStripeProducts]: any = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = await fetchUserDetails(id);
        if (userDetails) {
          const { name, address } = userDetails;
          setMemberName(name);
          setAddress(address);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    (async () => {
      let total = 0;
      let items = 0;
      const temp: any = []
      const tempStripe: StripeProduct[] = [];
      await Promise.all(
        Object.entries(cart).map(async ([productId, quantity]) => {
          const product = await fetchProduct(productId);
          total += (product.price * quantity);
          temp.push(
            <CheckoutItem
              key={productId}
              productId={productId}
              product={product}
              quantity={quantity}
            />
          )
        })
      )

      Object.entries(cart).map(([productId, quantity]) => {
        const price = temp.find(p => p.key === productId).props.product.price;
        tempStripe.push({
          name: productId,
          price: price * 100,
          quantity: quantity
        });
      });

      setStripeProducts(tempStripe);
      setCartItems(temp);
      setSubtotal(Number(Number(total).toFixed(2)));
    })()
  }, [subtotal, cart])

  return (
    <Container maxWidth="xl" style={{ paddingLeft: '13px', paddingRight: '13px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          marginLeft: 0,
          fontSize: 28,
          borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
          marginBottom: 16,
          fontWeight: 400,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.04), rgba(255, 255, 255, 1))',
          height: '60px',
          width: '100%',
        }}
      >
        <Logo
          style={{
            width: '80px',
            marginLeft: '185px',
            flex: '1'
          }}
        />
        <div
          style={{
            flex: '3',
            marginLeft: '360px',
            marginBottom: 10,
          }}
        >
          {t("checkout.title")}
        </div>
        <div
        style={{
          flex: '1',
          marginRight: '100px'
        }}>
          <LockButton></LockButton>
        </div>
      </div>
      <Container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Container
          sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{
                  fontSize: '18px',
                  fontWeight: '700',
                  whiteSpace: 'pre',
                  fontFamily: 'Amazon Ember',
                }}
              >
                1 {'    '} {t("checkout.shipping-address")}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <List sx={{ padding: 0, marginTop: 0.3 }}>
                <ListItem sx={{ padding: 0, margin: 0 }}>{memberName}</ListItem>
                <ListItem sx={{ padding: 0, margin: 0 }}>{address}</ListItem>
              </List>
            </Grid>
          </Grid>
          <CustomDivider sx={{ marginTop: 1.5, marginBottom: 1.5 }}></CustomDivider>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  whiteSpace: 'pre',
                  color: '#0f1111',
                }}
              >
                2 {'    '} {t("checkout.payment-method")}
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <List sx={{ padding: 0, marginTop: 0.3 }}>
                <ListItem sx={{ padding: 0, margin: 0, fontWeight: 'bold' }}>
                  {t("checkout.credit-card")}
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <CustomDivider sx={{ marginTop: 1.5, marginBottom: 1.5 }}></CustomDivider>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              whiteSpace: 'pre',
              marginBottom: 1.5,
              color: '#0f1111',
            }}
          >
            3 {'    '} {t("checkout.review-items-and-shipping")}
          </Typography>
          <CustomCard sx={{ display: 'block', minHeight: '100%', width: '95%', marginLeft: '35px' }}>
            <div 
              style={{
                border: '3px dashed #ADD8E6',
                padding: '10px',
                margin: '20px',
                textAlign: 'left', 
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px', 
                fontWeight: '700',
              }}>
               {t("checkout.ad")}
            </div>
            <div
            style = {{
                margin: '20px',
                color: '#007600',
                fontWeight: '700'
            }}
            > 
               {t("checkout.arriving")} {' '}
              <DeliveryDate offset='7'> </DeliveryDate>
            </div>
            <List>
              {cartItems}
            </List>
          </CustomCard>
          <CustomCard sx={{marginTop: '20px', width: '95%', marginLeft: '35px'}}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: '#0f1111',
                flex: '1'
              }}
            >
              <div style={{ flex: '1' }}>
                <CustomButton
                  type="submit"
                  label="checkout"
                  variant="contained"
                  pill
                  color="primary"
                  sx={{ mt: 3, mb: 2, mr: 0.1, ml: 3, flex: '1', fontSize: '13px' }}
                  onClick={() => {
                    placeOrder(stripeProducts);
                  }}
                >
                 {t("checkout.place-order")} 
                </CustomButton>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', flex: '3'}}>
                <div style={{ flex: '1', textAlign: 'left', color: '#b12704', fontWeight: '700'}}>
                {t("checkout.order-total")} {`${subtotal}`} 
                </div> 
                <div style={{flex: '1'}}>
                  <Typography sx={{fontSize: '11px'}}> {t("checkout.footer-part-1")} {' '} 
                    <CustomLink
                      label="privacy-notice"
                      variant="blue2"
                      href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496"
                    >
                      {t("checkout.privacy-notice")}
                    </CustomLink>
                    {' '} {t("checkout.and")} {' '}
                    <CustomLink
                      label="privacy-notice"
                      variant="blue2"
                      href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM"
                    >
                      {t('signup.conditions')}
                    </CustomLink> 
                    {t("checkout.period")}
                  </Typography>
                </div>
              </div>
            </Box>
          </CustomCard>
          <CustomDivider sx={{ marginTop: 1.5 }}></CustomDivider>
          <CustomDivider></CustomDivider>
          <Typography sx={{marginTop: '20px', fontSize: '12px', color: 'text.secondary'}}>
            {t("checkout.footer-part-2")} {' '}
            <CustomLink
              label="privacy-notice"
              variant="blue2"
              href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_help_helpfooter_pri?nodeId=GWZRWJGNW45SAWPY&ie=UTF8&ref_=chk_help_helpfooter_pri"
            >
              {t("checkout.help-pages")} {' '}
            </CustomLink> 
            {t("checkout.and")}{' '}
            <CustomLink
              label="privacy-notice"
              variant="blue2"
              href="https://www.amazon.com/hz/contact-us/foresight/hubgateway"
            >
              {t("checkout.contact-us")} 
            </CustomLink> 
          </Typography>
          <Typography sx={{ marginTop: '5px', fontSize: '12px', color: 'text.secondary' }}>
            {t("checkout.footer-part-3")}
          </Typography>
          <Typography sx={{ marginTop: '10px', fontSize: '12px', color: 'text.secondary' }}>
            <CustomLink
              label="privacy-notice"
              variant="blue2"
              href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_help_statetaxfooter_pri?ie=UTF8&nodeId=202029100"
            >
              {t("checkout.important-info")}
            </CustomLink>  
          </Typography>
          <Typography sx={{ marginTop: '5px', fontSize: '12px', color: 'text.secondary' }}>
            {t("checkout.footer-part-4")}
            {' '}
            <CustomLink
              label="privacy-notice"
              variant="blue2"
              href="https://www.amazon.com/gp/help/customer/display.html/ref=chk_help_returnsfooter_pri?nodeId=GNW5VKFXMF72FFMR&ie=UTF8&ref_=chk_help_returnsfooter_pri"
            >
              {t("checkout.return-policy")}
            </CustomLink>  
          </Typography>
          <Typography sx={{ marginTop: '10px', marginBottom: '40px', fontSize: '12px', color: 'text.secondary' }}>
             {t("checkout.footer-part-5")}{' '}
            <CustomLink
              label="privacy-notice"
              variant="blue2"
              href="https://www.amazon.com/?tag=amazusnavi-20&hvadid=675149237887&hvpos=&hvnetw=g&hvrand=2498626952770057035&hvpone=&hvptwo=&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9031944&hvtargid=kwd-10573980&ref=pd_sl_7j18redljs_e&hydadcr=28883_14649097&gad_source=1"
            >
              {t("checkout.ucsc-amazon-homepage")} 
            </CustomLink>
          </Typography>
        </Container>
        <Container maxWidth="sm" sx={{ flex: 1, justifyContent: 'center' }}>
          <CustomCard type="rounded" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="body1"
              sx={{ mt: 2, mb: 1, fontSize: '12px', textAlign: 'center' }}
            >
              <CustomButton
                label="Place Order"
                variant="contained"
                pill
                sx={{
                  width: '240px',
                  height: '33px',
                  fontSize: '13px',
                  margin: 'auto',
                }}
                onClick={() => {
                  placeOrder(stripeProducts);
                }}
              >
                {t("checkout.place-order")}
              </CustomButton>
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, mb: 1, fontSize: '12px', textAlign: 'center', ml: '20px', mr: '20px' }}
            >
              {t("checkout.footer-part-1")} {' '} 
              <CustomLink
                label="privacy-notice"
                variant="blue2"
                href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496"
              >
                {t('signup.privacy-notice')}
              </CustomLink>
              &nbsp; {t("checkout.and")} &nbsp;
              <CustomLink
                label="conditions-of-use"
                variant="blue2"
                href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?nodeId=GLSBYFE9MGKKQXXM&ie=UTF8&ref_=ap_signin_notification_condition_of_use"
              >
                {t('signup.conditions')}
              </CustomLink>
            </Typography>
            <CustomDivider sx={{ margin: 'auto', width: '235px' }}></CustomDivider>
            <Typography
              variant="h3"
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                textAlign: 'left',
                ml: '19px',
                mt: '12px',
                mb: '13px',
              }}
            >
              {t("checkout.order-summary")}
            </Typography>

            <Table sx={{ border: 'none' }}>
              <TableBody>
                <TableRow sx={{ mb: '1px' }}>
                  <TableCell sx={{ border: 'none', paddingBottom: '1px', paddingTop: '1px' }}>
                   {t("checkout.items")} 
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 'none', paddingBottom: '1px', paddingTop: '1px' }}
                  >
                    {subtotal}
                  </TableCell>
                </TableRow>
                <TableRow sx={{ mb: '5px' }}>
                  <TableCell sx={{ border: 'none', paddingBottom: '1px', paddingTop: '1px' }}>
                   {t("checkout.shipping-handling")} 
                  </TableCell>
                  <TableCell align="right" sx={{ paddingBottom: '1px', paddingTop: '1px' }}>
                    $0.00
                  </TableCell>
                </TableRow>
                <TableRow sx={{ mb: '5px' }}>
                  <TableCell sx={{ border: 'none', paddingBottom: '1px', paddingTop: '1px' }}>
                    {t("checkout.before-tax")}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 'none', paddingBottom: '1px', paddingTop: '1px' }}
                  >
                    {subtotal}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none', paddingBottom: '1px', paddingTop: '1px' }}>
                   {t("checkout.estimated-tax-collected")} 
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ border: 'none', paddingBottom: '1px', paddingTop: '1px' }}
                  >
                    $0.00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <CustomDivider
              sx={{ margin: 'auto', width: '235px', marginBottom: '8px' }}
            ></CustomDivider>
            <Table sx={{ border: 'none', marginBottom: '12px' }}>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      border: 'none',
                      paddingBottom: '1px',
                      paddingTop: '1px',
                      color: 'rgb(177, 39, 4)',
                      fontSize: '18px',
                      fontWeight: '700',
                    }}
                  >
                   {t("checkout.order-total-2")} 
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      border: 'none',
                      paddingBottom: '1px',
                      paddingTop: '1px',
                      color: 'rgb(177, 39, 4)',
                      fontSize: '18px',
                      fontWeight: '700',
                    }}
                  >
                    ${subtotal}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CustomCard>
        </Container>
      </Container>
    </Container>
  );
}
