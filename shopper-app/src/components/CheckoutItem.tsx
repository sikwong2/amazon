import { Box, Typography, useTheme, useMediaQuery, Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Grid } from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "@/context/Cart";
import CustomDivider from "./Divider";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import RandomDeliveryDate from "./DeliveryDate";
import CustomLink from "./Link";
import CustomDropdown from "./Dropdown";
import RadioButton from "./RadioButton"


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
  const [selectedValue, setSelectedValue] = useState('true');

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleDelete = (productId: string) => {
    removeFromCart(productId);
  }

  const handleProductClick = () => {
    router.push(`/product/${productId}`)
  }

  const handleSetProductQuantity = (value: string) => {
    updateProductQuantity(productId, parseInt(value));
  }

  // Returns red text if low stock, green text if in stock
  function getStock() {
    if (product.stock < 10) {
      return (
        <Typography sx={{ fontSize: '0.9rem', color: '#b12704', pt: 0.5 }}>
          {t("product.stock.only")} {product.stock} {t("product.stock.order-soon")}
        </Typography>
      )
    } else {
      return (
        <Typography sx={{ fontSize: '0.9rem', color: '#007600', pt: 0.5 }}>
          {t("product.stock.in-stock")}
        </Typography>
      )
    }
  }

  return (
    <>
      <Box {...rest} sx={{ display: 'flex', alignItems: 'center', width: '100%', pt: 2.5, pb: 1.5, pl: 1.5 }}>
        <Grid container>
          <Grid item xs={12} sm={'auto'} style={{ width: '200px' }}>
            <img
              src={product.image[0]}
              alt={product.image[0]}
              onClick={handleProductClick}
              loading='lazy'
              style={{ cursor: 'pointer', width: '100%', height: 'auto', maxWidth: !isMobile ? '300px' : 'none', maxHeight: !isMobile ? 'none' : '200px' }}
            />
          </Grid>
          <Grid item xs={12} sm={true} sx={{ mx: 1.5 }}>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}> 
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
                  }}>
                  {product.name}
                </Typography>
                <Box aria-label='product-price' sx={{ width: isMobile ? '30px' : '100px', textAlign: 'left', fontSize: '14px', color: '#b12704' }}>
                  <Typography fontWeight='bold' fontSize='1.1em'>
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                        pr: 0
                      },
                      '& .MuiFormControl-root': {
                        pr: 0
                      }
                    }}
                  />
                </Box>
              </Box> 
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start', flex:'1' }}>
                <Box sx={{ flex: 1, flexDirection: 'column', display: 'flex' }}>
                  <Typography
                    sx={{
                      lineHeight: '1.3em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      fontWeight: '700',
                      fontSize: '14px',
                      overflowWrap: 'break-word',
                    }}>
                    Choose your delivery option
                  </Typography>
                  <RadioGroup
                    name="deliveryOptionGroup"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <RadioButton  value="standard" checked={selectedValue === 'standard'} offset='2' onChange={handleChange} />
                    <RadioButton  value="express" checked={selectedValue === 'express'} offset='4' onChange={handleChange} />
                  </RadioGroup>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <CustomDivider />
    </>
  )
}
