import { ListItem, ListItemAvatar, ListItemText, Avatar, Box, Typography, useTheme, useMediaQuery, FormControlLabel, Checkbox } from "@mui/material";
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

  const old = (
    <ListItem key={productId} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <ListItemAvatar>
        <Avatar variant='square' src={product.image[0]} sx={{ width: '150px', height: '150px' }} />
      </ListItemAvatar>
      <ListItemText
        primary={product.name}
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: '16px' }}>
              ${product.price}
            </Typography>
            <Typography>
              {product.rating}
            </Typography><StarIcon />
            <Typography>
              Qty: {quantity}
            </Typography>
          </Box>
        }
        sx={{ maxWidth: 'calc(100% - 200px)', wordWrap: 'break-word', margin: '16px' }}
      />
      <Grid>
        <CustomButton
          label={productId}
          color="primary"
          onClick={() => {
            handleDelete(productId);
          }}
        >
          <DeleteOutlineIcon />
        </CustomButton>
      </Grid>
    </ListItem>
  )

  const newer = (
    <>
      <Box {...rest} sx={{ display: 'flex', alignItems: 'center', width: '100%', py:1.5, pl:1.5 }}>
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
                <CustomDropdown 
                  label='Qty'
                  selectedValue={cart[productId].toString()}
                  setSelectedValue={handleSetProductQuantity}
                  values={Array.from({ length: Math.min(product.stock, 100)}, (_, i) => (i+1).toString())}
                />
              </Box>
              <Box aria-label='product-price' sx={{ width:'100px', textAlign:'right' }}>
                <Typography fontWeight='bold' fontSize='1.1em'>
                  ${product.price}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <CustomDivider/>
    </>
  )

  return (
    <>
    {newer}
    </>
  )
}