import { CartContext } from '@/context/Cart'
import { Box, Checkbox, Container, FormControlLabel, Grid, List, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next';
import { Product } from '@/graphql/product/schema';
import CustomCard from '@/components/Card'
import CustomButton from '@/components/Button';
import { CartItem } from '@/components/CartItem';
import TopBar from '@/components/TopBar';
import { PageContext } from '@/context/Page';
import CustomLink from '@/components/Link';


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
      console.error(json.errors[0].message);
      throw new Error(json.errors[0].message);
    }
    return json.data.getByProductId;
  } catch (e) {
    console.log(e);
    throw new Error('');
  }
}

export function Cart() {
  const { setPage } = useContext(PageContext);
  const { cart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems]: any = useState([]);
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  
  useEffect(() => {
    (async () => {
      let total = 0;
      const temp: any = []
      await Promise.all(
        Object.entries(cart).map(async ([productId, quantity]) => {
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
              quantity={quantity}
            />
          )
        })
      )
      setCartItems(temp);
      setSubtotal(Number(Number(total).toFixed(2)));
    })()
  }, [cart])

  const old = (
    <Container maxWidth="md">
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              alignItems: 'center'
            }}>
              {t("cart.subtotal") +
            `(${Object.keys(cart).length} ${Object.keys(cart).length == 1 ? t("cart.item") : t("cart.items")}): 
            $ ${subtotal}`}
              <CustomButton
                type='submit'
                label='checkout'
                variant='contained'
                color='primary'
                sx={{ mt: 3, mb: 2 }}
                onClick={() =>{
                  setPage('checkout')
                }}
                >
                {t("cart.proceed-to-checkout")}
              </CustomButton>
            </Box>
          </CustomCard>
        </Container>
      </Container>
  )

  const total = (
    <CustomCard type='pointy' sx={{ pt: 2.5, pb: 2, pl: 2.5, pr: 2.5 }}>
      <Box display='flex' alignItems='flex-start' sx={{mb:2.5}}>
        <CheckCircleIcon color='success' fontSize='small'/>
        <Box>
          <Typography display='inline' fontSize='0.75em' color='#008500' sx={{lineHeight:'1em'}}>
            Part of your order qualifies for FREE Shipping. 
          </Typography>
          <Typography display='inline' fontSize='0.75em' color='#565959' sx={{lineHeight:'1em'}}>
             {' Choose this option at checkout.'}
          </Typography>
          <Box sx={{fontSize:'0.75em', lineHeight:'2em'}}>
            <CustomLink href={'/'} label='see-details'>
              See details
            </CustomLink>
          </Box>
        </Box>
      </Box>
      <Box aria-label='cart-subtotal'>
        <Typography display='inline' fontSize='1.1em'>
          {t("cart.subtotal")}
        </Typography>
        <Typography display='inline' fontSize='1.1em'>
          {` (${Object.keys(cart).length} ${Object.keys(cart).length == 1 ? t("cart.item") : t("cart.items")}): `}
        </Typography>
        <Typography display='inline' fontWeight='bold' fontSize='1.1em'>
          {`$${subtotal}`}
        </Typography>
      </Box>
      <FormControlLabel 
        control={<Checkbox color='default'/>} 
        label="This order contains a gift" 
        sx={{ 
          mt:-1,
          '& .MuiFormControlLabel-label': {
            fontSize: '0.9rem',
          }
        }}
      />
      <CustomButton
        label='go-to-checkout'
        variant='contained'
        color='primary'
        sx={{ mt: 0.5, mb:2, height:'2.5em' }}
        pill
        fullWidth
        onClick={() =>{
          setPage('checkout')
        }}
        >
        {t("cart.proceed-to-checkout")}
      </CustomButton>
    </CustomCard>
  )

  return (
    <div style={{backgroundColor: '#EAEDED', minHeight: '100vh' }}>
      <TopBar/>
      <Box sx={{ p:2.2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={ true }  order={{ xs: 2, sm: 1}} sx={{ padding:'0px' }}>
            left bottom
          </Grid>
          <Grid item xs={12} sm={ 'auto'} order={{ xs: 1, sm: 2 }} style={{width: isMobile ? '100%' : '300px'}}>
            {total}
          </Grid>
        </Grid>
      </Box>

      
    </div>
  )
}