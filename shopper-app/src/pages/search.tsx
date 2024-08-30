import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SearchResultCard from '@/components/SearchResultsCard';
import { Product } from '@/graphql/product/schema';
import TopBar from '@/components/TopBar';

const fetchProducts = async (name: string): Promise<Product[]> => {
  try {
    const query = {
      query: `query getByName {
        getByName(name: "${name}", page: 1, size: 100, order: "price", sort: "DESC") {
          id
          price
          name
          rating
          image
          category
        }
      }`,
    };

    const res = await fetch("http://localhost:3000/api/graphql", {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error(json.errors[0].message);
    }
    return json.data.getByName;
  } catch (e) {
    console.error('Fetch Products Error:', e);
    throw new Error('Unable to fetch products');
  }
};

interface SearchPageProps {
  products: Product[];
}

const SearchPage: React.FC<SearchPageProps> = ({ products }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { query } = router.query;

  return (
    <>
      <TopBar />
      <Box aria-label="search-results" margin={1}>
        <Box sx={{ maxWidth: { md: '80%', sm: '100%' }, margin: 'auto', padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {t('search.results-for')} {query}
          </Typography>
          <Grid container spacing={1} justifyContent="flex-start">
            {products.map((product) => (    
              <Grid item xs={12} sm={8} md={6} lg={3} key={product.id}>
                <SearchResultCard
                  images={[{ image: product.image[0], title: product.name, id: product.id, price: product.price, rating: product.rating
                   }]}
                  title={product.name}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, locale } = context;
  let products: Product[] = [];

  const searchQuery = Array.isArray(query.query) ? query.query[0] : query.query;

  if (searchQuery) {
    products = await fetchProducts(searchQuery);
  }

  return {
    props: {
      products,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default SearchPage;
