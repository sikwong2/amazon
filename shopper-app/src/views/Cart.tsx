import { CartContext } from '@/context/Cart';
import { Box, Container, List, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import CustomCard from '../components/Card';
import CustomButton from '@/components/Button';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { Product } from '@/graphql/product/schema';
import { useRouter } from 'next/router';
import { CartItem } from '@/components/CartItem';
import TopBar from '@/components/TopBar';
import { PageContext } from '@/context/Page';

const fetchProduct = async (productId: any): Promise<Product> => {
  try {
    const query = {
      query: `query product{getByProductId(productId: "${productId}") {name, price, image, stock, rating}}`,
    };
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
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
};
export function Cart() {
  const { setPage } = useContext(PageContext);
  const { cart } = useContext(CartContext);
  const { t } = useTranslation('common');
  const [subtotal, setSubtotal] = useState(0);
  const router = useRouter();
  const [cartItems, setCartItems]: any = useState([]);
  useEffect(() => {
    (async () => {
      let total = 0;
      const temp: any = [];
      for (const productId of cart) {
        const product = await fetchProduct(productId);
        total += product.price;
        temp.push(
          <CartItem
            key={productId}
            productId={productId}
            name={product.name}
            image={product.image ? product.image[0] : undefined}
            price={product.price}
            rating={product?.rating}
          />,
        );
      }
      setCartItems(temp);
      setSubtotal(Number(Number(total).toFixed(2)));
    })();
  }, [subtotal, cart]);
  return (
    <>
      <TopBar />
      <Container maxWidth="md">
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomCard sx={{ display: 'block', minHeight: '100%' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ marginLeft: '1em' }}>
              {t('cart.shopping-cart')}
            </Typography>
            <List>{cartItems}</List>
          </CustomCard>
          <CustomCard>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {t('cart.subtotal') +
                `(${cart.length} ${cart.length == 1 ? t('cart.item') : t('cart.items')}): 
            $ ${subtotal}`}
              <CustomButton
                type="submit"
                label="checkout"
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  setPage('checkout');
                }}
              >
                {t('cart.proceed-to-checkout')}
              </CustomButton>
            </Box>
          </CustomCard>
        </Container>
      </Container>
    </>
  );
}
