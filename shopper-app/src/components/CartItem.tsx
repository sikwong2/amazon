import { ListItem, ListItemAvatar, ListItemText, Avatar, Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import CustomButton from "./Button";
import { useContext } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartContext } from "@/context/Cart";
import StarIcon from '@mui/icons-material/Star';

interface CartItemProps {
  productId: string,
  name: string,
  image?: string,
  price: number,
  rating?: number,
  quantity: number
}
export function CartItem({ productId, name, image, price, rating, quantity, ...rest }: CartItemProps) {
  const { removeFromCart } = useContext(CartContext);

  const handleDelete = (productId: string) => {
    removeFromCart(productId);
  }

  return (
    <ListItem key={productId} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <ListItemAvatar>
        <Avatar variant='square' src={image} sx={{ width: '150px', height: '150px' }} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: '16px' }}>
              ${price}
            </Typography>
            <Typography>
              {rating}
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
}