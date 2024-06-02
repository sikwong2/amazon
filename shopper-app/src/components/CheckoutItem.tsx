import { Box, Typography, useTheme, useMediaQuery, Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "@/context/Cart";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import CustomDropdown from "./Dropdown";
import RadioButton from "./RadioButton"
import React, { useEffect } from 'react';


interface CartItemProps {
  productId: string,
  product: Product,
  quantity: number
}

interface Product {
  name: string,
  price: number,
  stock: number,
  rating: number,
  image: string[],
}

export function CheckoutItem({ productId, product, quantity, ...rest }: CartItemProps) {
  const { removeFromCart, updateProductQuantity } = useContext(CartContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const router = useRouter();
  const { t } = useTranslation('common');
   
  const handleProductClick = () => {
    router.push(`/product/${productId}`)
  }

  const handleSetProductQuantity = (value: string) => {
    updateProductQuantity(productId, parseInt(value));
  }

   return (
    <>
      <Box {...rest} sx={{ display: 'flex', alignItems: 'center', width: '100%', pt: 2.5, pb: 1.5, pl: 1.5 }}>
        <Grid container>
          <Grid item xs={12} sm={'auto'} style={{ width: '100px' }}>
            <img
              src={product.image[0]}
              alt={product.image[0]}
              onClick={handleProductClick}
              loading='lazy'
              style={{ cursor: 'pointer', width: '100%', height: 'auto', maxWidth: !isMobile ? '300px' : 'none', maxHeight: !isMobile ? 'none' : '200px' }}
            />
          </Grid>
          <Grid item xs={12} sm={true} sx={{ mx: 1.5 }}>
            <Box sx={{ display: 'flex', width: '95%', alignItems: 'flex-start' }}> 
              <Box aria-label='product-info' sx={{ flex: 1 }}>
                <Typography
                  sx={{ 
                    lineHeight: '1.3em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    fontSize: '14px',
                    fontWeight: '700',
                    overflowWrap: 'break-word', 
                    fontFamily: 'Arial'
                  }}>
                  {product.name}
                </Typography>
                <Box aria-label='product-price' sx={{ width: isMobile ? '30px' : '100px', textAlign: 'left', fontSize: '14px', color: '#b12704' }}>
                  <Typography fontWeight='bold' fontSize='1.1em' sx={{fontFamily: 'Arial'}}>
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1px', marginTop: '4px'  }}>
                  <CustomDropdown
                    label='Qty'
                    selectedValue={quantity.toString()}
                    setSelectedValue={handleSetProductQuantity}
                    values={Array.from({ length: Math.min(product.stock, 100) }, (_, i) => (i + 1).toString())}
                    width='90px'
                    sx={{
                      pr: 0,
                      overflow: 'visible',
                      mr: 2.5,
                      '& .MuiSelect-select.MuiInputBase-input': {
                        pr: 0,
                        fontSize: '13px'
                      },
                      '& .MuiFormControl-root': {
                        pr: 0
                      }
                    }}
                  />
                </Box>
                <Typography sx={{fontSize:'11px'}} color="textSecondary">
                  {t("checkout.sold-by")} 
                </Typography>
              </Box>  
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
