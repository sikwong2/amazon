import CustomCard from "./Card";
import CustomButton from "./Button";
import { List, useMediaQuery } from "@mui/material";
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
import { FormatOrderDate, FormatDeliveryDate } from "./DeliveryDate";
import { LoginContext } from "@/context/Login";
import { useRouter } from "next/router";
import { CustomTooltip } from "./Tooltip";
import { Fragment } from "react";
import { TypographyHover } from "./TypographyHover";
import { useTranslation } from "next-i18next";


interface OrderCardProps extends CardProps {
  orderStatus: string,
  productIds: string[],
  orderNumber: string,
  orderDate: string,
}

const SecondaryText = styled(Typography)({
  color: '#565959',
  fontSize: '12px',
  lineHeight: '16px'
});

const TertiaryText = styled(Typography)(({ theme }) => ({
  color: '#565959',
  fontSize: '14px',
  lineHeight: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '20px',
  },
}));


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
    throw new Error('fetchProduct Error');
  }
}

const fetchAddress = async (memberId: any): Promise<any> => {
  try {
    const query = { query: `query getAddress{getMemberInfo(memberId: "${memberId}") {address}}` };
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
    return json.data.getMemberInfo;
  } catch (e) {
    console.log(e);
    throw new Error('fetchAddress Error');
  }
}

export default function OrderCard({children, orderStatus = 'delivered', productIds, orderNumber, orderDate, ...rest}: OrderCardProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>('0');
  const {userName, id} = useContext(LoginContext);
  const [address, setAddress] = useState('');
  const { t } = useTranslation('common');

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
      const addy = await fetchAddress(id);
      const a = addy.address;
      setAddress(a);
    };

    fetchData();
  }, []);

  return (
    <CustomCard type="rounded" sx={{border: "1px #d5d9d9 solid", mb: '14px'}}>
      <Grid container bgcolor="#F0F2F2" sx={{padding: '14px 18px', fullWidth: 1, outline: '1px #d5d9d9 solid'}}>
        <Grid item sx={{mr: '2%', width: '23.448%', minHeight: '1px', overflow: 'visible', display: 'flex', flexDirection: 'column'}}>
          <SecondaryText align='left' variant="subtitle2" width="100%">
            {t("order.order-placed")}
          </SecondaryText>
          <TertiaryText align='left' variant='subtitle2' width="100%">
            <FormatOrderDate date={orderDate}/>
          </TertiaryText>
        </Grid>
        <Grid item sx={{mr: '2%', width: '14.948%', minHeight: '1px', overflow: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SecondaryText align='left' variant="subtitle2" width="100%">
          {t("order.total")}
          </SecondaryText>
          <TertiaryText align='left' variant='subtitle2' width="100%">
            {`$${totalPrice}`}
          </TertiaryText>
        </Grid>
        <Grid item sx={{ width: '17.448%', float: 'left', minHeight: '1px', overflow: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <SecondaryText align='left' variant="subtitle2" width="100%">
          {t("order.ship-to")}
          </SecondaryText>
          <CustomTooltip title={
            <Fragment>
              <Typography variant="subtitle2" fontWeight="bold" align="left">
                {userName}
              </Typography>
              <Typography variant="subtitle2" align="left">
                {address}
              </Typography>
            </Fragment>
            }
          >
          <TypographyHover align='left' variant='subtitle2' width="100%">
            {userName}
          </TypographyHover>
          </CustomTooltip>
        </Grid>
        <Grid item sx={{ width: '40%', minHeight: '1px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'right'}}>
          <SecondaryText align='right' variant="subtitle2" width="100%">
          {t("order.order-number")} {orderNumber}
          </SecondaryText>
        </Grid>
      </Grid>
      { (orderStatus == 'pending' || orderStatus == 'shipped' || orderStatus == 'confirmed') &&
      <Typography color="#368477" width="100%" variant="h6" sx={{padding: '14px 18px', mb: '-18px'}}>
        {t("order.arriving")} <FormatDeliveryDate date={orderDate} offset={14}/>
      </Typography>
      }
      {orderStatus == 'delivered' &&
      <Typography color="#368477" width="100%" variant="h6" sx={{padding: '14px 18px', mb: '-18px'}}>
        {t("order.delivered")} <FormatDeliveryDate date={orderDate} offset={7}/>
      </Typography>
      }
      <List>
        {products}
      </List>
    </CustomCard>
  )
}