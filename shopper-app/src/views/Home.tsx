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

const advertisements: Image[] = [
  {
    image: 'https://www.adsoftheworld.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0VPQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--5f561cccbacc4de85a9899b83b437ace43713b41/thumbnail_219710',
    id: '2f804cfb-c81a-43e2-9e78-9160332e46bd',
    description: 'Adidas ad',
    title: 'Adidas shoes'
  },
  {
    image: 'https://fcdn.me/a59/10a/adidas-run-for-the-oceans-5-33863c5db68f48f9e180fc12aa.jpg?d=1',
    id: '2f804cfb-c81a-43e2-9e78-9160332e46bd',
    description: 'Adidas Sea ad',
    title: 'Adidas women shoes'
  },
  {
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e456a8103211209.5f47dea744a23.jpg',
    id: 'd0eeec78-99ef-4736-8256-c04043110873',
    description: 'Nike ad',
    title: 'Nike shoes'
  },
  {
    image: 'https://i.ytimg.com/vi/8ly_IRib75Q/maxresdefault.jpg',
    id: 'd9b42b3d-aa46-4791-8470-c9417d1db025',
    description: 'Samsung Galaxy ad',
    title: 'Samsung'
  },
  {
    image: 'https://i.ytimg.com/vi/YIjLnWmLhmk/maxresdefault.jpg',
    id: 'c85ddd6d-c3ef-4ba2-8951-a6f377c4fe94',
    description: 'Spalding basketball ad',
    title: 'Spalding'
  },
  {
    image: 'https://media.idownloadblog.com/wp-content/uploads/2016/10/macbook-air.png',
    id: 'fcdfc6a7-3e50-4909-818c-379f75b4320a',
    description: 'Apple ad',
    title: 'Macbooks'
  },
  {
    image: 'https://image.adsoftheworld.com/d50xigu5cjitc14142pboshuox6f',
    id: 'fcab207a-fd48-4e81-a15d-a754f49fcd15',
    description: 'Lamp ad',
    title: 'Lamps'
  },
]

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

// outer container of ads / cards once signed in
// carosoul component
// card of category component
export function Home() {
  const [ads, setAds] = React.useState<Image[]>(advertisements);
  const [category1, setCategory1] = React.useState<Image[]>([]);
  const [category2, setCategory2] = React.useState<Image[]>([]);
  const [category3, setCategory3] = React.useState<Image[]>([]);
  const { t } = useTranslation('common');
  const loginContext = React.useContext(LoginContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const category1products = await fetchProducts('furniture');
        const cat1 = category1products.map((product) => ({
          image: product.image[0],
          id: product.id,
          description: product.name,
          title: 'sale',
        }));
        setCategory1(cat1);
        const category2products = await fetchProducts('electronics');
        const cat2 = category2products.map((product) => ({
          image: product.image[0],
          id: product.id,
          description: product.name,
          title: 'sale',
        }));
        setCategory2(cat2);
        const products = await fetchProducts('sports');
        const cat3 = products.map((product) => ({
          image: product.image[0],
          id: product.id,
          description: product.name,
          title: 'sale',
        }));
        setCategory3(cat3);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const easyReturns = (
    <CustomCard
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

  if (loginContext.role !== 'shopper' && loginContext.accessToken !== '') {
    return <RedirectNonShopper />;
  }

  return (
    <React.Fragment>
      <TopBar />
      <Box aria-label="homeproducts" bgcolor="#E4E6E6" maxHeight="100%" sx={{ mb: 0 }}>
        <Box
          sx={{ maxWidth: { md: '80%', sm: '100%' } }}
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
            <ImageCarousel images={ads} height={isSmallScreen ? 300 : 400} />
          </Box>
          <Grid container spacing={0} justifyContent={isSmallScreen ? 'center' : 'flex-start'}>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CategoryCard images={category1} title={t('home.pick-up')} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CategoryCard images={category2} title={t('home.keep-shopping')} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CategoryCard images={category3} title={t('home.top-deal')} />
              </Box>
            </Grid>
            <Grid item xs={0} sm={0} md={3}>
              {easyReturns}
            </Grid>
          </Grid>
          <MultiImageCarousel images={category2} height={200} title={t('home.top-sellers-electronics')}/>
          <MultiImageCarousel images={category1} height={200} title={t('home.top-sellers-furniture')}/>
          <MultiImageCarousel images={category3} height={200} title={t('home.top-sellers-sports')}/>

        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
