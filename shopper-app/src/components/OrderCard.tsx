import CustomCard from "./Card";
import CustomButton from "./Button";
import { List } from "@mui/material";
import { CardProps } from "@mui/material";
import {Typography} from "@mui/material";
import {Box} from "@mui/material";
import {Grid} from "@mui/material";
import { OrderItem } from "./OrderItem";
import { useContext, useEffect, useState } from "react"
import { Product } from "@/graphql/product/schema";
import { styled } from '@mui/material/styles';
import CustomLink from "./Link";
import RandomDeliveryDate from "./DeliveryDate";
import { LoginContext } from "@/context/Login";
import { useRouter } from "next/router";


interface OrderCardProps extends CardProps {
  orderStatus: string,
  productIds: string[],
  orderNumber: string,
}

const SecondaryText = styled(Typography)({
  color: '#565959',
  fontSize: '12px',
  lineHeight: '16px'
});

const TertiaryText = styled(Typography)({
  color: '#565959',
  fontSize: '14px',
  lineHeight: '20px'
});

const fetchProduct = async (productId: any): Promise<Product> => {
  try {
    const query = { query: `query product{getByProductId(productId: "${productId}") {name, price, image, stock, rating}}` };
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors[0].message);
      throw new Error(json.errors[0].message);
    }
    return json.data.getByProductId;
  } catch (e) {
    console.log(e);
    throw new Error('');
  }
}

export default function OrderCard({children, orderStatus = 'delivered', productIds, orderNumber, ...rest}: OrderCardProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>('0');
  const {userName} = useContext(LoginContext);

  useEffect(() => {
    const fetchData = async () => {
      const temp: any = [];
      let total: number = 0;
      for (let index = 0; index < productIds.length; index++) {
        const productId = productIds[index];
        const product = await fetchProduct(productId);
        total += product.price;
        temp.push(
          <OrderItem
            key={productId + index}
            productId={productId}
            name={product.name}
            image={product.image[0]}
          />
        );
      }
      setProducts(temp);
      setTotalPrice(total.toString());
    };
  
    fetchData();
  }, []);

  return (
    <CustomCard type="rounded" sx={{border: "1px #d5d9d9 solid", mb: '14px'}}>
      <Grid container bgcolor="#F0F2F2" sx={{padding: '14px 18px', fullWidth: 1, outline: '1px #d5d9d9 solid'}}>
        <Grid item sx={{mr: '2%', width: '23.448%', minHeight: '1px', overflow: 'visible', display: 'flex', flexDirection: 'column'}}>
          <SecondaryText align='left' variant="subtitle2" width="100%">
            ORDER PLACED
          </SecondaryText>
          <TertiaryText align='left' variant='subtitle2' width="100%">
            <RandomDeliveryDate offset={7}/>
          </TertiaryText>
        </Grid>
        <Grid item sx={{mr: '2%', width: '14.948%', minHeight: '1px', overflow: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SecondaryText align='left' variant="subtitle2" width="100%">
            TOTAL
          </SecondaryText>
          <TertiaryText align='left' variant='subtitle2' width="100%">
            {`$${totalPrice}`}
          </TertiaryText>
        </Grid>
        <Grid item sx={{ width: '27.448%', float: 'left', minHeight: '1px', overflow: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SecondaryText align='left' variant="subtitle2" width="100%">
            SHIP TO
          </SecondaryText>
          <TertiaryText align='left' variant='subtitle2' width="100%">
            {userName}
          </TertiaryText>
        </Grid>
        <Grid item sx={{ width: '30%', minHeight: '1px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'right'}}>
          <SecondaryText align='right' variant="subtitle2" width="100%">
            ORDER # {orderNumber}
          </SecondaryText>
        </Grid>
      </Grid>
      {orderStatus == 'pending' &&
      <SecondaryText>
        Pending
      </SecondaryText>
      }
      <List>
        {products}
      </List>
      <Box sx={{outline: '1px #d5d9d9 solid', padding: '14px 18px'}}>
        <Typography>
          Archive Order
        </Typography>
      </Box>
    </CustomCard>
  )
}