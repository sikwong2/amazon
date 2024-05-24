import CustomDivider from "./Divider";
import { Paper, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { Grid } from "@mui/material";
import CustomButton from "./Button";
import { useContext } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CartContext } from "@/context/Cart";

interface CartItemProps {
  productId: string,
  name: string,
  image: string,
  price: number
}
export function CartItem({ productId, name, image, price, ...rest }: CartItemProps) {
  const {cart, setCart} = useContext(CartContext);

  const handleDelete = (productId: string) => {
    const copy = cart.splice(0);
    console.log('cart before', copy);
    setCart(copy.filter((product) => product != productId));
    console.log('cart after', cart);
  }

  return (
    <CustomDivider key={productId}>
      <Paper elevation={0} sx={{ marginBottom: '16px' }} >
        <ListItem sx={{ display: 'flex', justifyContent: 'space-evenly', minWidth: '100%' }}>
          <ListItemAvatar>
            <Avatar variant='square' src={image} sx={{ width: '150px', height: '150px' }} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={`$${price / 100}`}
            sx={{ marginLeft: '16px' }}
          />
          <Grid
            container
            alignItems="center"
            spacing={1}
            sx={{ marginLeft: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Grid item>
              <CustomButton
                label={`${productId}`}
                color="primary"
                onClick={() => {
                  handleDelete(productId);
                }}
              >
                <DeleteOutlineIcon />
              </CustomButton>
            </Grid>
          </Grid>
        </ListItem>
      </Paper>
    </CustomDivider>
  )
}