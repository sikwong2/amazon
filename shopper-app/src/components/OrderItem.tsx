import { Avatar, ListItem, ListItemAvatar, ListItemText, Grid, Typography, Box } from "@mui/material";
import CustomLink from "./Link";
import { useRouter } from "next/router";

interface OrderItemProps {
  productId: string;
  name: string;
  image: string;
}

export function OrderItem({productId, name, image, ...rest  }: OrderItemProps){
  const router = useRouter();
  const handleProductRedirect = (id: string) => {
    router.push(`/product/${id}`)
  }

  // https://stackoverflow.com/questions/68567118/react-material-ui-typography-max-number-of-lines

  return (
    <Grid container key={productId} sx={{ padding: "14px 18px 6px 18px", position: "relative", alignItems: 'flex-start' }} {...rest}>
      <Grid item>
        <Box
          component="img"
          src={image}
          alt={name}
          aria-label={productId+'image'}
          sx={{ width: '100px', maxHeight: '90px', height: 'auto', objectFit: 'fill', display: 'inline-block', position: 'relative', cursor: 'pointer' }}
          onClick={() => handleProductRedirect(productId)}
        />
      </Grid>
      <Grid item sx={{ ml: '16px', mr: '16px', flex: 1 }}>
        <CustomLink href={`/product/${productId}`} label="productName" >
          <Typography 
            variant="body2" 
            sx={{ 
              wordWrap: 'break-word',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            {name}
          </Typography>
        </CustomLink>

      </Grid>
  </Grid>
  )
}
