import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import ImageCarousel from '@/components/Carousel';
import type { Image } from '@/components/Carousel';
import CategoryCard from '@/components/CategoryCard';
import { Grid } from '@mui/material';
import CustomCard from '@/components/Card';
import CustomLink from '@/components/Link';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import MultiImageCarousel from '@/components/MultiCarousel';

import { Product } from '@/graphql/product/schema';
import { RedirectNonShopper } from './RedirectNonShopper';
import { LoginContext } from '@/context/Login';
import { BrowserHistoryContext } from '@/context/BrowserHistory';
import { BrowserHistoryEntry } from '@/graphql/member/schema';

const advertisements: Image[] = [
  {
    image: 'https://m.media-amazon.com/images/I/61JRTDaOgTL._SX3000_.jpg',
    id: '2f804cfb-c81a-43e2-9e78-9160332e46bd',
    description: 'Adidas ad',
    title: 'Adidas shoes'
  },
  {
    image: 'https://m.media-amazon.com/images/I/717a5OeZ6iL._SX3000_.jpg',
    id: '2f804cfb-c81a-43e2-9e78-9160332e46bd',
    description: 'Adidas Sea ad',
    title: 'Adidas women shoes'
  },
  {
    image: 'https://m.media-amazon.com/images/I/517HzrpIwAL._SX3000_.jpg',
    id: 'd0eeec78-99ef-4736-8256-c04043110873',
    description: 'Nike ad',
    title: 'Nike shoes'
  },
  {
    image: 'https://m.media-amazon.com/images/I/71UY8rxRxUL._SX3000_.jpg',
    id: 'd9b42b3d-aa46-4791-8470-c9417d1db025',
    description: 'Samsung Galaxy ad',
    title: 'Samsung'
  },
  {
    image: 'https://m.media-amazon.com/images/I/71cpVVPylML._SX3000_.jpg',
    id: 'c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94',
    description: 'Spalding basketball ad',
    title: 'Spalding'
  },
  {
    image: 'https://m.media-amazon.com/images/I/71BewpxvEZL._SX3000_.jpg',
    id: 'fcdfc6a7-3e50-4909-818c-379f75b4320a',
    description: 'Apple ad',
    title: 'Macbooks'
  },
  {
    image: 'https://m.media-amazon.com/images/I/61AHFjQsfDL._SX3000_.jpg',
    id: 'fcab207a-fd48-4e81-a15d-a754f49fcd15',
    description: 'Lamp ad',
    title: 'Lamps'
  },
]

const categories: string[] = [
  'furniture',
  'electronics',
  'sports',
  'apple',
  'shrek',
  'home',
  'shoes',
  'clothing',
  'adidas',
  'nike',
  'gaming',
  'couch',
  'storage', 
  'kitchen',
]

const getRandomCategory = () => {
  const randomElement = categories[Math.floor(Math.random() * categories.length)];
  return randomElement;
}

const fetchProducts = async (category: string): Promise<Product[]> => {
  try {
    const query = {
      query: `query getByCategory{
      getByCategory(category: "${category}", page: 1, size: 20, order: "name", sort: "DESC") {
        id
        price
        name
        image
        category
      }
    }`,
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
    return json.data.getByCategory;
  } catch (e) {
    console.log(e);
    throw new Error('Unable to fetch products');
  }
};

const fetchProduct = async (productId: string): Promise<Product> => {
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
      console.error(json.errors[0].message);
      throw new Error(json.errors[0].message);
    }
    return json.data.getByProductId;
  } catch (e) {
    console.log(e);
    throw new Error('');
  }
}

const fetchBrowserHistory = async (memberId: string): Promise<[BrowserHistoryEntry]> => {
  try {
    const query = {
      query: `
        query getBrowserHistory {
          getBrowserHistory(
            memberId: "${memberId}"
          ) {
            product_id
          }
        }
      `
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
      console.error(json.errors[0].message);
      throw new Error(json.errors[0].message);
    }
    return json.data.getBrowserHistory;
  } catch (e) {
    console.log(e);
    throw new Error('');
  }
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

// outer container of ads / cards once signed in
// carosoul component
// card of category component
export function Home() {
  const [ads, setAds] = React.useState<Image[]>(advertisements);
  const [categoriesData, setCategoriesData] = React.useState<{ [key: string]: Image[] }>({});
  const [browserHistoryImages, setBrowserHistoryImages] = React.useState<Image[]>([]);
  const { t } = useTranslation('common');
  const loginContext = React.useContext(LoginContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedScreen = useMediaQuery(theme.breakpoints.down('md'));
  // used to determine how many categories there are
  const numberOfCategories = 8;
  const {productHistory} = React.useContext(BrowserHistoryContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData: { [key: string]: Image[] } = {};
        for (let i = 0; i <= numberOfCategories; i++) {
          const category = getRandomCategory();
          const products = await fetchProducts(category);
          fetchedData[category] = products.map((product) => ({
            image: product.image[0],
            id: product.id,
            description: product.name,
            title: 'sale',
          }));
        }
        
        if (productHistory.length  >= 1 && loginContext.id == '') {
          const historyImages = await Promise.all(
            productHistory.slice(-4).map(async (browserhistory) => {
              const product = await fetchProduct(browserhistory.productId);
              return {
                image: product.image[0],
                id: browserhistory.productId,
                description: product.name,
                title: product.name,
              };
            })
          );
          setBrowserHistoryImages(historyImages);
        } else if (loginContext.id != '') {
          // sets logged out user's browser history to logged in user's
          if (productHistory.length > 0) {
            await Promise.all(
              productHistory.map(async (browserhistory) => {
                await addBrowserHistory(loginContext.id, browserhistory.productId);
              })
            );
          }
          // clears local storage
          sessionStorage.setItem('productHistory', JSON.stringify([]));

          // fetchs user's browserhistory 
          const historyEntries = await fetchBrowserHistory(loginContext.id);
          const historyImages = await Promise.all(
            historyEntries.map(async (entry) => {
              const product = await fetchProduct(entry.product_id);
              return {
                image: product.image[0],
                id: entry.product_id,
                description: product.name,
                title: product.name,
              };
            })
          );
          setBrowserHistoryImages(historyImages);
        }
        setCategoriesData(fetchedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, []);

  const easyReturns = (
    <CustomCard
      type='pointy'
      elevation={0}
      sx={{
        width: 'auto',
        height: 'auto',
        margin: 1,
        maxWidth: '300px',
        alignItems: 'start',
        justifyContent: 'center',
        display: (isSmallScreen || isMedScreen) ? 'none' : 'flex',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          columnGap: 0.5,
          rowGap: 0.5,
          gridTemplateColumns: 'repeat(2, 1fr)',
          flexGrow: 1,
          m: 2,
        }}
        alignItems="start"
        justifyContent="center"
      >
        <Typography sx={{ gridColumn: 'span 2', mb: 0.1 }} align="left" variant="subtitle1">
          {t('home.easy-returns')}
        </Typography>
        <Typography sx={{ gridColumn: 'span 2', mb: 0.1 }} align="left" variant="subtitle2">
          {t('home.easy-returns-body')}
        </Typography>
        <CustomLink label="learn-more" href="/">
          <Typography variant="caption">{t('home.learn-more')}</Typography>
        </CustomLink>
      </Box>
    </CustomCard>
  );


  const logoutGrid = (
    <Grid container spacing={0} justifyContent='center'>
      {(browserHistoryImages.length >= 1) && <Grid item xs={12} sm={4} md={3} key={'browserhistory'}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CategoryCard images={browserHistoryImages} title={t('home.browsing-history')}/>
        </Box>
      </Grid>}
      {Object.entries(categoriesData).slice(0,3).map(([category, images], index) => (
        <Grid item xs={12} sm={4} md={3} key={category}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CategoryCard images={images} title={t(`home.${category}`)} />
          </Box>
        </Grid>
      ))}
      <Grid item xs={0} sm={0} md={3}>
        {browserHistoryImages.length < 1 && easyReturns}
      </Grid>
    </Grid>
  );


  if (loginContext.role !== 'shopper' && loginContext.accessToken !== '') {
    return <RedirectNonShopper />;
  }

  return (
    <React.Fragment>
      <TopBar />
      
      <Box aria-label="homeproducts" bgcolor="#E4E6E6" maxHeight="100%" sx={{ mb: 0 }}>
        <Box
          sx={{ maxWidth: { md: '100%', sm: '100%' }, position: 'relative' }}
          alignItems="center"
          justifyContent="center"
          margin="auto"
        >
          <Box
            position="static"
            justifyContent="center"
            alignItems="center"
            bgcolor="#FFFFFF"
          >
            <ImageCarousel images={ads} height={isSmallScreen ? 300 : 600} mobile={isSmallScreen}/>
          </Box>
          {
            !isSmallScreen &&
            <React.Fragment>
              <Box
                sx={{
                  position: 'absolute',
                  top: '250px',
                  width: '100%',
                  zIndex: 2
                }}
                justifyItems='center'
              >
                {logoutGrid}
              </Box>
              <Box
                sx={{
                  background: 'linear-gradient(to bottom, transparent, #E4E6E6)',
                  position: 'absolute',
                  top: '400px',
                  zIndex: 1
                }}
                width="100%"
                height={200}
                />
              <Box bgcolor='#E4E6E6' width="100%" height={50}/>
            </React.Fragment>
          }


          {Object.entries(categoriesData).slice(3,numberOfCategories).map(([category, images]) => (
            <MultiImageCarousel
              key={category}
              images={images}
              height={200}
              title={t(`home.top-sellers-${category}`)}
            />
          ))}
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
