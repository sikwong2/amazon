// source: https://mui.com/material-ui/react-grid/#responsive-values

import React, { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { List, ListItem, Typography } from '@mui/material';
import CustomCard from '@/components/Card';
import CustomPrice from '@/components/Price';
import CustomLink from '@/components/Link';
import CustomButton from '@/components/Button';
import CustomDropdown from '@/components/Dropdown';
import { useRouter } from 'next/router';
import CustomRating from '@/components/Rating';
import CustomDivider from '@/components/Divider';
import AmazonChoice from '@/components/AmazonChoice';
import ProductDisplay from '@/components/ProductDisplay';
import { CartContext } from '@/context/Cart';
import TopBar from '@/components/TopBar';
import { PageContext } from '@/context/Page';
import RandomDeliveryDate from '@/components/DeliveryDate';
import { LoginContext } from '@/context/Login';
import { BrowserHistoryContext } from '@/context/BrowserHistory';
import { BrowserHistoryEntry } from '@/graphql/member/schema';
import CustomRatingHistogram from '@/components/RatingHistogram';
import { RatingHistogram } from '@/graphql/review/schema';
import { Review } from '@/graphql/review/schema';
import ReviewDisplayItem from '@/components/ReviewDisplayItem';

interface Product {
  name: string;
  price: number;
  stock: number;
  rating: number;
  image: string[];
  description: string[];
  category: string[];
}

interface ProductProp {
  product: Product;
}




export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = {
    query: `query product{getByProductId(productId: "${context.query.productId}") {name, price, stock, rating, image, category, description}}`,
  };
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const json = await res.json();
  let return_product = {};
  if (json.errors) {
    console.error('Error retrieving product: ', json.errors);
  }
  const data = await json.data;
  if (!data || !data.getByProductId) {
    console.error('No product returned');
  } else {
    return_product = data.getByProductId;
  }
  
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
      product: return_product
    },
  };
};

// Returns hours and mins until midnight
function getTimeTillMidnight() {
  const currentTime = new Date();
  const hours = 24 - currentTime.getHours() - 1;
  const minutes = 60 - currentTime.getMinutes() - 1;

  return (
    <>
      {hours} hrs {minutes} mins
    </>
  );
}

// Displays product description in a bulleted list
function productDescription(description: string[]) {
  return (
    <>
      <List sx={{ listStyleType: 'disc', pl: 2, lineHeight: 1.4 }}>
        {description.map((des) => (
          <ListItem key={des} sx={{ display: 'list-item', p: 0, mb: 1 }}>
            {des}
          </ListItem>
        ))}
      </List>
    </>
  );
}

// adds product id to browser history backend
const addBrowserHistory = async (memberId: string, productId: string): Promise<BrowserHistoryEntry> => {
  try {
    const query = `
      mutation addBrowserHistory {
        addBrowserHistory(
          memberId: "${memberId}"
          productId: "${productId}"
        ) {
          product_id
          timestamp
        } 
      }
    `;
    const res = await fetch(
      `/api/graphql`, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors[0].message);
      throw new Error(json.errors[0].message);
    }
    return json.data.addBrowserHistory;
  } catch (e) {
    console.log(e)
    throw new Error('Error in fetching addBrowserHistory')
  }
}

const fetchRatings = async (productId: string): Promise<RatingHistogram> => {
  const queryratings = {
    query: `query getRatings{
      getRatings(productId: "${productId}") {
        total,
        average,
        oneStar,
        twoStar,
        threeStar,
        fourStar,
        fiveStar
      }
    }`
  };
  const res2 = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    body: JSON.stringify(queryratings),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const json2 = await res2.json();
  let return_ratings = {
    average: 0,
    total: 0,
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0
  };
  if (json2.errors) {
    console.error('Error retrieving ratings: ', json2.errors);
  }
  const data2 = await json2.data;
  
  if (!data2 || !data2.getRatings) {
    console.error('No ratings returned');
  } else {
    return_ratings = data2.getRatings;
  }
  return return_ratings;
}

const fetchReviews = async (productId: string): Promise<Review[]> => {
  const query = {
    query: `query getProductReviews{
      getProductReviews(productId: "${productId}") {
        content,
        id,
        images,
        name,
        posted,
        product_id,
        rating,
        shopper_id,
        title
      }
    }`
  };
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const json = await res.json();
  let reviews = [];
  if (json.errors) {
    console.error('Error retrieving reviews: ', json.errors);
  }
  const data = await json.data;
  
  if (!data || !data.getProductReviews) {
    console.error('No ratings returned');
  } else {
    reviews = data.getProductReviews;
  }
  return reviews;

}

export default function Product({ product }: ProductProp) {
  const { t } = useTranslation('common');
  const [quantity, setQuantity] = useState(1)
  const {cart, setCart, addToCart } = useContext(CartContext);
  const pageContext = useContext(PageContext); 
  const router = useRouter();
  const { productId } = router.query;
  const { accessToken, id } = useContext(LoginContext);
  const { productHistory, addProductToHistory} = useContext(BrowserHistoryContext);
  const [ratings, setRatings] = useState({average: 0, total: 0, oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0});
  const [reviews, setReviews] = useState<Review[]>([]);
  // strict mode renders the useEffect component twice... T______T
  // https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7
  const initialized = React.useRef(false);

  React.useEffect(() => {
    const fetchBrowserHistory = async () => {
      try {
        if (accessToken === '') {
          const t = new Date();
          addProductToHistory({productId: productId as string, date: t});
        } else if (accessToken !== '') {
          await addBrowserHistory(id, productId as string);
        }
      } catch(e) {
        console.log(e);
      }
    };
    const fetchRatingHistogram = async () => {
      try {
        const ratings = await fetchRatings(productId as string);
        setRatings(ratings);
        console.log('hihihi');
        console.log(ratings);
      } catch(e) {
        console.log(e);
      }
    };
    const fetchReviewsEvent = async () => {
      try {
        const reviews = await fetchReviews(productId as string);
        setReviews(reviews);
        console.log('whaihesoihrgs');
        console.log(reviews);
      } catch(e) {
        console.log(e);
      }
    };

    if (!initialized.current) {
      initialized.current = true
      fetchBrowserHistory();
      fetchRatingHistogram();
      fetchReviewsEvent();
    }
  }, []);

  const handleSetValue = (value: string) => {
    setQuantity(parseInt(value));
  };

  const handleAddToCartClick = () => {
    addToCart(productId as string, quantity)
    pageContext.setPage('cart');
    router.push('/');
  };

  const handleBuyNowClick = () => {
    setCart({});
    addToCart(productId as string, quantity);
    if (accessToken){
      pageContext.setPage("checkout");
      router.push('/');
    }
    else {
      router.push('/login');
    }
  };

  // Returns red text if low stock, green text if in stock
  function getStock() {
    if (product.stock < 10) {
      return (
        <Typography sx={{ fontSize: '1.2rem', color: '#b12704', pt: 0.5, mb: 1.5 }}>
          {t('product.stock.only')} {product.stock} {t('product.stock.order-soon')}
        </Typography>
      );
    } else {
      return (
        <Typography sx={{ fontSize: '1.2rem', color: '#007600', pt: 0.5, mb: 1.5 }}>
          {t('product.stock.in-stock')}
        </Typography>
      );
    }
  }

  const MiddleContainer = (
    <Box aria-label="product-details">
      <Typography component="h1" variant="h1" sx={{ fontSize: '1.5em', lineHeight: 1.33 }}>
        {product.name}
      </Typography>
      <CustomLink href={`/product/${productId}`} label="visit-product-store">
        {t('product.visit-amazon')}
      </CustomLink>
      <CustomRating rating={product.rating} size="small" />
      <Box aria-label="amazons-choice">
        <AmazonChoice sx={{ mt: 1 }} />
        <Typography display="inline" sx={{ ml: 2 }}>
          in {product.category[0].charAt(0).toUpperCase() + product.category[0].slice(1)}
        </Typography>
      </Box>
      <CustomDivider sx={{ mt: 2, mb: 2, width: '98%' }} />
      <CustomPrice value={product.price} sx={{ mb: 1 }} />
      <CustomLink href="https://www.amazon.com/b?node=18726306011" label="free-returns">
        {t('product.free-returns')}
      </CustomLink>
      <CustomDivider sx={{ mt: 2, mb: 2, width: '98%' }} />
      <Box>
        <Typography fontWeight="bold">{t('product.about-item')}</Typography>
        {productDescription(product.description)}
      </Box>
    </Box>
  );

  const RightContainer = (
    <CustomCard type="pointy" sx={{ p: 2 }}>
      <CustomPrice value={product.price} sx={{ mb: 2 }} />
      <CustomLink href="https://www.amazon.com/b?node=18726306011" label="free-returns">
        {t('product.free-returns')}
      </CustomLink>
      <Box aria-label="delivery-date" sx={{ mt: 1.6, mb: 1.6 }}>
        <CustomLink
          href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GZXW7X6AKTHNUP6H"
          label="free-delivery"
        >
          {' '}
          {t('product.free-delivery')}{' '}
        </CustomLink>
        <Typography display="inline" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
          <RandomDeliveryDate offset={7} />
        </Typography>
      </Box>
      <Box aria-label="fastest-delivery" sx={{ mb: 1.5 }}>
        <Typography display="inline" sx={{ fontSize: '1rem', lineHeight: '1.3' }}>
          {t('product.fastest-delivery')}{' '}
        </Typography>
        <Typography
          display="inline"
          sx={{ fontSize: '1rem', lineHeight: '1.3', fontWeight: 'bold' }}
        >
          <RandomDeliveryDate offset={4} />.{' '}
        </Typography>
        <Typography display="inline" sx={{ fontSize: '1rem', lineHeight: '1.3' }}>
          {t('product.order-within')}{' '}
        </Typography>
        <Typography display="inline" sx={{ fontSize: '1rem', lineHeight: '1.3', color: '#007600' }}>
          {getTimeTillMidnight()}
        </Typography>
      </Box>
      {getStock()}
      <CustomDropdown
        label={t('product.quantity')}
        selectedValue={quantity.toString()} // default quantity
        setSelectedValue={handleSetValue}
        sx={{ mr: 3 }}
        values={Array.from({ length: Math.min(product.stock, 100) }, (_, i) => (i + 1).toString())}
      />
      <Box>
        <CustomButton
          label="add-to-cart"
          pill
          fullWidth
          onClick={handleAddToCartClick}
          sx={{ height: '30px', mt: 1, mb: 1 }}
        >
          {t('product.add-to-cart')}
        </CustomButton>
      </Box>
      <Box>
        <CustomButton
          label="buy-now"
          color="secondary"
          pill
          fullWidth
          onClick={handleBuyNowClick}
          sx={{ height: '30px' }}
        >
          {t('product.buy-now')}
        </CustomButton>
      </Box>
    </CustomCard>
  );
  
  // needs sign in context bc redirects to home if not signed in
  const createReviewEvent = () => {
    // pageContext.setPage(`/createreview/${productId as string}`);
    router.push(`/createreview/${productId as string}`);
  }

  const WriteAReview = (
    <Box width='100%'>
      <CustomDivider sx={{mb: '1rem', mt:'1rem'}}/>
        <Typography variant='h5' sx={{paddingBottom: '8px'}}>
          Review this product
        </Typography>
        <Typography sx={{paddingBottom: '16px'}}>
          Share your thoughts with other customers
        </Typography>
        <CustomButton variant="outlined" label='write a review' pill fullWidth onClick={createReviewEvent}>
          Write a customer review
        </CustomButton>
      <CustomDivider sx={{mb: '1rem', mt:'2rem'}}/>
    </Box>
  )

  const Ratings = (
    <Grid container>
      <Grid item sx={{mb: '1rem', mt: '1rem'}} sm={12}>
        <CustomRatingHistogram ratingHistogram={ratings} />
      </Grid>
      <Grid item sx={{mb: '1rem'}} sm={12}> 
        {WriteAReview}
      </Grid>
    </Grid>
  )

  const Reviews = (
    <Box maxWidth='100%' width='100%' sx={{mb: '1rem', mt: '1rem'}}>
      {ratings.total == 0 ? 
        <Typography>
          No customer reviews
        </Typography> :
        <Box width="100%">
          {reviews.map((review, index) => (
            <ReviewDisplayItem review={review} index={index}/>
          ))}
        </Box>
      }
    </Box>
  );

  return (
    <>
      <TopBar />
      <Box sx={{ flexGrow: 1, p: 2.2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4.5} sx={{ padding: '0px' }}>
            <ProductDisplay images={product.image} />
          </Grid>
          <Grid item xs={12} sm={5}>
            {MiddleContainer}
          </Grid>
          <Grid item xs={12} sm={2.5}>
            {RightContainer}
          </Grid>
        </Grid>
        <CustomDivider sx={{marginTop: '0.5rem', marginBottom: '0.5rem'}}/>
        
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3} >
            {Ratings}
          </Grid>
          <Grid item xs={12} sm={9}>
            {Reviews}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
