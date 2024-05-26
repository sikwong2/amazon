// source: https://mui.com/material-ui/react-grid/#responsive-values

import React, { useState } from 'react';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CustomCard from '@/components/Card';
import { Typography } from '@mui/material';
import CustomPrice from '@/components/Price';
import CustomLink from '@/components/Link';
import CustomButton from '@/components/Button';
import CustomDropdown from '@/components/Dropdown';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface Product {
  name: string,
  price: number,
  stock: number,
  rating: number,
  image: String[],
  description: String[]
}

interface ProductProp {
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("productID: ", context.query.productId);
  const query = { query: `query product{getByProductId(productId: "${(context.query.productId)}") {name, price, stock, rating, image, description}}` };
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

// Returns red text if low stock, green text if in stock
function getStock(stock: number) {
  if (stock < 10) {
    return (
        <Typography>
          Only {stock} left in stock - order soon.
        </Typography>
    )
  } else {
    return (
      <Typography sx={{ fontSize:'1.2rem', color:'#007600', pt:0.5, mb:1.5 }}>
        In Stock
      </Typography>
    )
  }
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

  const handleSetValue = (value: string) => {
    setQuantity(parseInt(value));
  }
  
  const addToCart = () => {
    // add productId to cart context
    // product added to cart popup???
  }

  const buyNow = () => {
    // clear cart context
    // add productId to cart context 
    // go to checkout page
  }

  return (
    <>
      <p> {product.name} </p>
      <p> {product.stock} </p>
      <p> {product.price} </p>
      <p> {product.rating} </p>
      <p> {product.image} </p>
      <p> {product.description} </p>
      <Box sx={{ flexGrow: 1, p:2.2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4.5}>
            <Item>xs=4.5</Item>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Item>xs=5</Item>
          </Grid>
          <Grid item xs={12} sm={2.5}>
            <Item>xs=2.5</Item>
            <Box>
              <CustomCard type='pointy' sx={{ p:2}}>
                <CustomPrice value={product.price} sx={{ mb:2}}/>
                <CustomLink href='https://www.amazon.com/b?node=18726306011' label='free-returns'>FREE Returns</CustomLink>
                <Box sx={{mt:1.6, mb:1.6}}>
                  <CustomLink href='https://www.amazon.com/gp/help/customer/display.html?nodeId=GZXW7X6AKTHNUP6H' label='free-delivery'> FREE delivery </CustomLink>
                  <Typography display='inline' sx={{ fontWeight:'bold', fontSize:'1rem' }}>
                    {getRandomDeliveryDate(7)}
                  </Typography>
                </Box>
                <Box sx={{mb:1.5}}>
                  <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3' }}>Or fastest delivery </Typography>
                  <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3', fontWeight:'bold' }}>{getRandomDeliveryDate(4)}. </Typography>
                  <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3' }}>Order within </Typography>
                  <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3', color:'#007600' }}>{getTimeTillMidnight()}</Typography>
                </Box>
                {getStock(product.stock)}
                <CustomDropdown 
                  label='Quantity' 
                  selectedValue={quantity.toString()} // default quantity
                  setSelectedValue={handleSetValue}
                  sx={{ width:215 }}
                  values={Array.from({ length: Math.min(product.stock, 10)}, (_, i) => (i+1).toString())}
                />
                <Box>
                  <CustomButton 
                    label='add-to-cart' 
                    pill 
                    fullWidth 
                    onClick={addToCart}
                    sx={{height:'30px', mt: 1, mb:1}}
                  >
                    Add to Cart
                  </CustomButton>
                </Box>
                <Box>
                  <CustomButton 
                    label='buy-now' 
                    color='secondary' 
                    pill 
                    fullWidth
                    onClick={buyNow}
                    sx={{height:'30px'}}
                  >
                    Buy Now
                  </CustomButton>
                </Box>

              </CustomCard>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}