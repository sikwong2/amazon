import { CartContext } from '@/context/Cart'
import { Box, Checkbox, FormControlLabel, Grid, List, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next';
import CustomCard from '@/components/Card'
import CustomButton from '@/components/Button';
import { CartItem } from '@/components/CartItem';
import { PageContext } from '@/context/Page';
import CustomLink from '@/components/Link';
import CustomDivider from '@/components/Divider';
import TopBar from '@/components/TopBar';
import { LoginContext } from '@/context/Login';
import { useRouter } from 'next/router';

interface Product {
  name: string,
  price: number,
  stock: number,
  rating: number,
  image: string[],
}

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
  const router = useRouter();
  const { setPage } = useContext(PageContext);
  const { cart } = useContext(CartContext);
  const { accessToken } = useContext(LoginContext);
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
          total += (product.price * quantity);
          temp.push(
            <CartItem
              key={productId} 
              productId={productId}
              product={product}
              quantity={quantity}
            />
          )
        })
      )
      setCartItems(temp);
      setSubtotal(Number(Number(total).toFixed(2)));
    })()
  }, [cart])

  const subtotalText = (
    <Box aria-label='cart-subtotal'>
      <Typography display='inline' fontSize='1.1em'>
        {t("cart.subtotal")}
      </Typography>
      <Typography display='inline' fontSize='1.1em'>
        {` (${Object.keys(cart).length} ${Object.keys(cart).length == 1 ? t("cart.item") : t("cart.item-s")}): `}
      </Typography>
      <Typography display='inline' fontWeight='bold' fontSize='1.1em'>
        {`$${subtotal.toFixed(2)}`}
      </Typography>
    </Box>
  )

  const total = (
    <CustomCard type='pointy' sx={{ pt: 2.5, pb: 2, pl: 2.5, pr: 2.5 }}>
      <Box display='flex' alignItems='flex-start' sx={{mb:2.5}}>
        <CheckCircleIcon color='success' fontSize='small'/>
        <Box>
          <Typography display='inline' fontSize='0.75em' color='#008500' sx={{lineHeight:'1em'}}>
            {t('cart.qualify-for-free-shipping')}
          </Typography>
          <Typography display='inline' fontSize='0.75em' color='#565959' sx={{lineHeight:'1em'}}>
             {` ${t('cart.choose-option')}`}
          </Typography>
          <Box sx={{fontSize:'0.75em', lineHeight:'2em'}}>
            <CustomLink href={'/'} label='see-details'>
              {t('cart.see-details')}
            </CustomLink>
          </Box>
        </Box>
      </Box>
      {subtotalText}
      <FormControlLabel 
        control={<Checkbox color='default'/>} 
        label={t("cart.contains-gift") as string}
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
          if (accessToken) {
            setPage('checkout');
          } else {
            router.push('/login');
          }
        }}
        >
        {t("cart.proceed-to-checkout")}
      </CustomButton>
    </CustomCard>
  )

  const shoppingCart = (
    <CustomCard type='pointy' sx={{ display: 'block', minHeight: '100%', p:2.5 }}>
      <Typography component='h1' sx={{mb:2}}>
        {t("cart.shopping-cart")}
      </Typography>
      <Typography align='right'>
        {t("cart.price")}
      </Typography>
      <CustomDivider/>
      <List>
        {cartItems}
      </List>
      <Box sx={{textAlign:'right'}}>
        {subtotalText}
      </Box>
    </CustomCard>
  )

  return (
    <div style={{backgroundColor: '#EAEDED', minHeight: '100vh' }}>
      <TopBar/>
      <Box sx={{ p:2.2, maxWidth:'1500px', m:'auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={ true }  order={{ xs: 2, sm: 1}} sx={{ padding:'0px' }}>
            {shoppingCart}
          </Grid>
          <Grid item xs={12} sm={ 'auto' } order={{ xs: 1, sm: 2 }} style={{ width: isMobile ? '100%' : '316px' }}>
            {total}
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}