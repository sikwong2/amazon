import React, { useContext, useState } from 'react';
import CustomCard from "./Card";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useRouter } from 'next/router';
import CustomPrice from "./Price";
import CustomRating from './Rating';
import { CartContext } from '@/context/Cart';
import { PageContext } from '@/context/Page';
import CustomButton from './Button';
import { useTranslation } from "next-i18next";
import CustomLink from './Link';
import RandomDeliveryDate from './DeliveryDate';

export type Product = {
  image: string,
  id: string,
  title: string,
  price: number,
  rating?: number
}

export interface SearchResultCardProps {
  images: Product[],
  title: string
}

export default function SearchResultCard({ images, title }: SearchResultCardProps) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const [quantity, setQuantity] = useState(1)
  const pageContext = useContext(PageContext);
  const productId = images[0].id;

  const handleProductRedirect = () => {
    router.push(`/product/${productId}`);
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

  return (
    <CustomCard 
      elevation={0} 
      sx={{ 
        width: "auto", 
        height: 'auto', 
        maxHeight: '100%', 
        maxWidth: '300px', 
        display: 'flex', 
        mx: 'auto',
        flexDirection: 'column',
        flexGrow: 1,
        cursor: 'pointer'
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }} onClick={handleProductRedirect}>
        <Box
          component="img"
          src={images[0].image}
          sx={{ 
            width: '100%', 
            height: '200px',
            maxWidth: '300px',
            objectFit: 'contain'
          }}
        />
      </Box>
      <Box sx={{ padding: 1, textAlign: 'left' }}>
        <Typography variant='subtitle1' sx={{ mb: 1 }} onClick={handleProductRedirect}>
          {title.length > 29 ? `${title.slice(0, 28)}...` : title}
        </Typography>
        {images[0].rating !== undefined && (
          <Box sx={{ mb: 1 }}  onClick={handleProductRedirect}>
            <CustomRating rating={images[0].rating} size='small' />
          </Box>
        )}
        <CustomPrice value={images[0].price} onClick={handleProductRedirect} />
        <Box aria-label='delivery-date' sx={{mt:1.6, mb:1.6}} onClick={handleProductRedirect}>
            <CustomLink href='https://www.amazon.com/gp/help/customer/display.html?nodeId=GZXW7X6AKTHNUP6H' label='free-delivery'> {t("product.free-delivery")} </CustomLink>
            <Typography display='inline' sx={{ fontWeight:'bold', fontSize:'1rem' }}>
            <RandomDeliveryDate offset={7}/>
            </Typography>
        </Box>
        <Box aria-label='fastest-delivery' sx={{mb:1.5}} onClick={handleProductRedirect}>
            <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3' }}>{t("product.fastest-delivery")} </Typography>
            <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3', fontWeight:'bold' }}><RandomDeliveryDate offset={7}/>. </Typography>
            <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3' }}>{t("product.order-within")} </Typography>
            <Typography display='inline' sx={{ fontSize:'1rem', lineHeight:'1.3', color:'#007600' }}>{getTimeTillMidnight()}</Typography>
        </Box>
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
    </CustomCard>
  )
}
