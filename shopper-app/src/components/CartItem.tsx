import { Box, Typography, useTheme, useMediaQuery, FormControlLabel, Checkbox, Divider } from "@mui/material";
import { Grid } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "@/context/Cart";
import CustomDivider from "./Divider";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import RandomDeliveryDate from "./DeliveryDate";
import CustomLink from "./Link";
import CustomDropdown from "./Dropdown";

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

export function CartItem({ productId, product, quantity, ...rest }: CartItemProps) {
  const { removeFromCart, updateProductQuantity } = useContext(CartContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const router = useRouter();
  const { t } = useTranslation('common');

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
        <Typography sx={{ fontSize:'0.9rem', color:'#b12704', pt: 0.5}}>
          {t("product.stock.only")} {product.stock} {t("product.stock.order-soon")}
        </Typography>
      )
    } else {
      return (
        <Typography sx={{ fontSize:'0.9rem', color:'#007600', pt:0.5 }}>
          {t("product.stock.in-stock")}
        </Typography>
      )
    }
  }

  return (
    <>
      <Box {...rest} sx={{ display: 'flex', alignItems: 'center', width: '100%', pt:2.5, pb:1.5, pl:1.5 }}>
        <Grid container>
          <Grid item xs={12} sm={ 'auto' } style={{ width: '200px' }}>
            <img
              src={product.image[0]}
              alt={product.image[0]}
              onClick={handleProductClick}
              loading='lazy'
              style={{ cursor: 'pointer', width:'100%', height:'auto', maxWidth: !isMobile? '300px' : 'none', maxHeight: !isMobile ? 'none' : '200px' }}
            />
          </Grid>
          <Grid item xs={12} sm={ true } sx={{ mx:1.5 }}>
            <Box sx={{ display:'flex', width:'100%', alignItems:'flex-start' }}>
              <Box aria-label='product-info' sx={{ flex:1 }}>
                <Typography 
                  sx={{
                    fontSize:'1.1em',
                    lineHeight:'1.3em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                  {product.name}
                </Typography>
                {getStock()}
                <Box aria-label='delivery-date'>
                  <Typography display='inline' >
                    {`${t("product.free-delivery")} `} 
                  </Typography>
                  <Typography display='inline' sx={{ fontWeight:'bold' }}>
                    <RandomDeliveryDate offset={7}/>
                  </Typography>
                  <Typography display='inline' >
                    {` ${t('cart.available-at-checkout')}`} 
                  </Typography>
                </Box>
                <CustomLink href='https://www.amazon.com/b?node=18726306011' label='free-returns'>{t("product.free-returns")}</CustomLink>
                <Typography sx={{ color:'#168342' }}>
                {t("cart.items.climate")}
                </Typography>
                <FormControlLabel 
                  control={<Checkbox color='default'/>} 
                  label={t("cart.contains-gift")} 
                  sx={{ 
                    mt:-1,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.9rem',
                    }
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomDropdown 
                    label='Qty'
                    selectedValue={quantity.toString()}
                    setSelectedValue={handleSetProductQuantity}
                    values={Array.from({ length: Math.min(product.stock, 100)}, (_, i) => (i+1).toString())}
                    width='90px'
                    sx={{ 
                      pr:0,
                      overflow: 'visible',
                      mr:2.5,
                      '& .MuiSelect-select.MuiInputBase-input': {
                        pr:0
                      },
                      '& .MuiFormControl-root': {
                        pr:0
                      }
                    }}
                  />
                  <Divider orientation="vertical" flexItem sx={{ height:'20px', alignSelf: 'center', color:'#DDD'}} />
                  <Typography onClick={() => {handleDelete(productId)}} component="span" sx={{ mx: 1, cursor: 'pointer', color:'#007185' }}>
                  {t("cart.items.delete")}
                  </Typography>
                </Box>
              </Box>
              <Box aria-label='product-price' sx={{ width: isMobile? '30px' : '100px', textAlign:'right' }}>
                <Typography fontWeight='bold' fontSize='1.1em'>
                  ${product.price.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <CustomDivider/>
    </>
  )
}