import { ListItem, ListItemAvatar, ListItemText, Avatar, Box, Typography, useTheme, useMediaQuery, FormControlLabel, Checkbox, Divider } from "@mui/material";
import { Grid } from "@mui/material";
import CustomButton from "./Button";
import { useContext } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartContext } from "@/context/Cart";
import StarIcon from '@mui/icons-material/Star';
import CustomCard from "./Card";
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
  const { cart, removeFromCart, updateProductQuantity } = useContext(CartContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleDelete = (productId: string) => {
    console.log("cart: ", cart);
    removeFromCart(productId);
    console.log("afte: ", cart);
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
          <Grid item xs={4} sm={ 'auto' } style={{ width: isMobile ? '145px' : '200px' }}>
            <img
              src={product.image[0]}
              alt={product.image[0]}
              onClick={handleProductClick}
              loading='lazy'
              style={{ cursor: 'pointer', width:'100%', height:'fit-content', maxHeight:'200px' }}
            />
          </Grid>
          <Grid item xs={8} sm={ true } sx={{ mx:1.5, minWidth: isMobile ? 'auto' : '200px' }}>
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
                    {'FREE delivery '} 
                  </Typography>
                  <Typography display='inline' sx={{ fontWeight:'bold' }}>
                    <RandomDeliveryDate offset={7}/>
                  </Typography>
                  <Typography display='inline' >
                    {' available at checkout'} 
                  </Typography>
                </Box>
                <CustomLink href='https://www.amazon.com/b?node=18726306011' label='free-returns'>{t("product.free-returns")}</CustomLink>
                <Typography sx={{ color:'#168342' }}>
                  Climage Pledge Friendly
                </Typography>
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
                    Delete
                  </Typography>
                </Box>
              </Box>
              <Box aria-label='product-price' sx={{ width:'100px', textAlign:'right' }}>
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