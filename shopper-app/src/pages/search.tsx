import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CategoryCard from '@/components/CategoryCard';
import { Product } from '@/graphql/product/schema';
import { SearchProvider } from '../context/SearchContext';
import TopBar from '@/components/TopBar';
import { IncomingMessage } from 'http';

const fetchProducts = async (name: string, req?: IncomingMessage): Promise<Product[]> => {
  try {
    const query = {
      query: `query getByName {
        getByName(name: "${name}", page: 1, size: 5, order: "price", sort: "DESC") {
          id
          price
          name
          image
          category
        }
      }`,
    };
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer
      ? `http://${req?.headers.host}`
      : '';

    const apiUrl = `${baseUrl}/api/graphql`;

    const res = await fetch(apiUrl, {
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
    <SearchProvider>
      <TopBar />
      <Box aria-label="search-results" bgcolor="#E4E6E6" maxHeight="100%" margin={1}>
        <Box sx={{ maxWidth: { md: '80%', sm: '100%' }}} alignItems="center" justifyContent="center" margin="auto">
          <Typography variant="h4" gutterBottom>
            {t('search.results-for')} "{query}"
          </Typography>
          <Grid container spacing={2} justifyContent="flex-start">
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.name}>
                <CategoryCard images={[{ image: product.image[0], description: product.name, title: product.name, id: product.id}]} title={product.name} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </SearchProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, locale } = context;
  let products: Product[] = [];

  const searchQuery = Array.isArray(query.query) ? query.query[0] : query.query;

  if (searchQuery) {
    products = await fetchProducts(searchQuery, context.req);
  }

  return {
    props: {
      products,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default SearchPage;
