import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

interface OrderItemProps {
  productId: string;
  name: string;
  image: string;
}

export function OrderItem({ productId, name, image, ...rest }: OrderItemProps) {
  return (
    <ListItem key={productId} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <ListItemAvatar>
        <Avatar variant="square" src={image} sx={{ width: '150px', height: '150px' }} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        sx={{ maxWidth: 'calc(100% - 200px)', wordWrap: 'break-word', margin: '16px' }}
      />
    </ListItem>
  );
}
