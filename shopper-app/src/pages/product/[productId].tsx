// source: https://mui.com/material-ui/react-grid/#responsive-values

import React, { useContext, useState } from 'react';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { List, ListItem, Typography } from '@mui/material';
import CustomCard from '@/components/Card';
import CustomPrice from '@/components/Price';
import CustomLink from '@/components/Link';
import CustomButton from '@/components/Button';
import CustomDropdown from '@/components/Dropdown';
import { useRouter } from 'next/router';
import CustomRating from '@/components/Rating';
import CustomDivider from '@/components/Divider';
import AmazonChoice from '@/components/AmazonChoice';
import ProductDisplay from '@/components/ProductDisplay';
import { CartContext } from '@/context/Cart';
import TopBar from '@/components/TopBar';
import { PageContext } from '@/context/Page';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/*
TODO:
 -x add to cart button
 -x buy now button
 -x translations
 -x fix quantity dropdown width
 -x add categories 
 - invalid product id breaks everything

*/


interface Product {
  name: string,
  price: number,
  stock: number,
  rating: number,
  image: string[],
  description: string[]
  category: string[]
}

interface ProductProp {
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = { query: `query product{getByProductId(productId: "${(context.query.productId)}") {name, price, stock, rating, image, category, description}}` };
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-type': 'application/json',
    },
  })
  const json = await res.json();
  let return_product = {};
  if (json.errors) {
    console.error("Error retrieving product: ", json.errors);
  }
  const data = await json.data;
  if (!data || !data.getByProductId) {
    console.error("No product returned");
  } else {
    return_product = data.getByProductId;
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', [
        'common',
      ])),
      product: return_product
    },
  }
}

// Returns date 7 days from today for delivery
function getRandomDeliveryDate(offset: number) {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + offset);
  return (
    <>
      {days[nextWeek.getDay()]}, {months[nextWeek.getMonth()]} {nextWeek.getDate()}
    </>
  )
}

// Returns hours and mins until midnight
function getTimeTillMidnight() {
  const currentTime = new Date();
  const hours = 24 - currentTime.getHours() - 1;
  const minutes = 60 - currentTime.getMinutes() - 1;

  return (
    <>
      {hours} hrs {minutes} mins
    </>
  )
}

// Displays product description in a bulleted list
function productDescription(description: string[]) {
  return (
    <>
      <List sx={{ listStyleType: 'disc', pl:2, lineHeight:1.4 }}>
        {description.map((des) => (
            <ListItem key={des} sx={{ display: 'list-item', p:0, mb:1 }}>
              {des}
            </ListItem>
        ))}
      </List>
    </>
  )
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '0px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: 'none',
  margin: '0px',
}));

export default function Product({ product }: ProductProp) {
  const { t } = useTranslation('common');
  const [quantity, setQuantity] = useState(1)
  const cartContext = useContext(CartContext);
  const pageContext = useContext(PageContext);
  const router = useRouter();
  const { productId } = router.query;

  const handleSetValue = (value: string) => {
    setQuantity(parseInt(value));
  }
  
  const handleAddToCartClick = () => {
    const cart = cartContext.cart;
    for (let i = 0; i < quantity; i++) {
      cart.push(productId as string)
      cartContext.setCart(cart);
    }
    pageContext.setPage('cart');
    router.push('/');
  }

  const handleBuyNowClick = () => {
    cartContext.setCart([productId as string]);
    // pageContext.setPage('checkout');
    router.push('/');
  }

  // Returns red text if low stock, green text if in stock
  function getStock() {
    if (product.stock < 10) {
      return (
          <Typography sx={{ fontSize:'1.2rem', color:'#b12704', pt: 0.5, mb: 1.5}}>
            {t("product.stock.only")} {product.stock} {t("product.stock.order-soon")}
          </Typography>
      )
    } else {
      return (
        <Typography sx={{ fontSize:'1.2rem', color:'#007600', pt:0.5, mb:1.5 }}>
          {t("product.stock.in-stock")}
        </Typography>
      )
    }
  }

  const MiddleContainer = (
    <Box aria-label='product-details'>
      <Typography component='h1' variant='h1' sx={{fontSize:'1.5em', lineHeight:1.33}}>
        {product.name}
      </Typography>
      <CustomLink href={`/product/${productId}`} label='visit-product-store'>{t("product.visit-amazon")}</CustomLink>
      <CustomRating rating={product.rating} size='small'/>
      <Box aria-label='amazons-choice'>
        <AmazonChoice sx={{mt:1}}/>
        <Typography display='inline' sx={{ml:2}}>
          in {product.category[0].charAt(0).toUpperCase() + product.category[0].slice(1)}
        </Typography>
      </Box>
      <CustomDivider sx={{mt:2, mb:2, width:'98%'}}/>
      <CustomPrice value={product.price} sx={{mb:1}}/>
      <CustomLink href='https://www.amazon.com/b?node=18726306011' label='free-returns'>{t("product.free-returns")}</CustomLink>
      <CustomDivider sx={{mt:2, mb:2, width:'98%'}}/>
      <Box>
        <Typography fontWeight='bold'>{t("product.about-item")}</Typography>
        {productDescription(product.description)}
      </Box>
    </Box>
  )

  const RightContainer = (
    <CustomCard type='pointy' sx={{ p:2 }}>
      <CustomPrice value={product.price} sx={{ mb:2 }}/>
      <CustomLink href='https://www.amazon.com/b?node=18726306011' label='free-returns'>{t("product.free-returns")}</CustomLink>
      <Box aria-label='delivery-date' sx={{mt:1.6, mb:1.6}}>
        <CustomLink href='https://www.amazon.com/gp/help/customer/display.html?nodeId=GZXW7X6AKTHNUP6H' label='free-delivery'> {t("product.free-delivery")} </CustomLink>
        <Typography display='inline' sx={{ fontWeight:'bold', fontSize:'1rem' }}>
          {getRandomDeliveryDate(7)}
        </Typography>
      </Box>
      <Box aria-label='fastest-delivery' sx={{mb:1.5}}>
        <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3' }}>{t("product.fastest-delivery")} </Typography>
        <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3', fontWeight:'bold' }}>{getRandomDeliveryDate(4)}. </Typography>
        <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3' }}>{t("product.order-within")} </Typography>
        <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3', color:'#007600' }}>{getTimeTillMidnight()}</Typography>
      </Box>
      {getStock()}
      <CustomDropdown 
        label={t("product.quantity")} 
        selectedValue={quantity.toString()} // default quantity
        setSelectedValue={handleSetValue}
        sx={{ mr:3 }}
        values={Array.from({ length: Math.min(product.stock, 100)}, (_, i) => (i+1).toString())}
      />
      <Box>
        <CustomButton 
          label='add-to-cart' 
          pill 
          fullWidth 
          onClick={handleAddToCartClick}
          sx={{height:'30px', mt: 1, mb:1}}
        >
          {t("product.add-to-cart")}
        </CustomButton>
      </Box>
      <Box>
        <CustomButton 
          label='buy-now' 
          color='secondary' 
          pill 
          fullWidth
          onClick={handleBuyNowClick}
          sx={{height:'30px'}}
        >
          {t("product.buy-now")}
        </CustomButton>
      </Box>
    </CustomCard>
  )

  return (
    <>
      <TopBar/>
      <Box sx={{ flexGrow: 1, p:2.2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4.5} sx={{padding:'0px'}}>
            <ProductDisplay images={product.image}/>
          </Grid>
          <Grid item xs={12} sm={5}>
            {MiddleContainer}
          </Grid>
          <Grid item xs={12} sm={2.5}>
            {RightContainer}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}