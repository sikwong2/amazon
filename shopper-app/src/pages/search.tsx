import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import SearchResultCard from '@/components/SearchResultsCard';
import { Product } from '@/graphql/product/schema';
import TopBar from '@/components/TopBar';
import PageSelector from '@/components/PageSelector';

const fetchProducts = async (name: string, page: number = 1, size: number = 3): Promise<{ products: Product[], totalProducts: number }> => {
  try {
    const query = {
      query: `query getByName {
        getByName(name: "${name}", page: ${page}, size: ${size}, order: "price", sort: "DESC") {
          products {
            id
            price
            name
            rating
            image
          }
          totalProducts
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
    return { products: json.data.getByName.products, totalProducts: json.data.getByName.totalProducts };
  } catch (e) {
    console.error('Fetch Products Error:', e);
    throw new Error('Unable to fetch products');
  }
};

interface SearchPageProps {
  products: Product[],
  totalPages: number,
}

const SearchPage: React.FC<SearchPageProps> = ({ products, totalPages }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { query } = router.query;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  React.useEffect(() => {
    if (router.query) {
      setCurrentPage(parseInt(router.query.page as string, 10) || 1);
    }
  }, [router.query.page]);

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
        <PageSelector currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, locale } = context;
  let products: Product[] = [];
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const size = 30;
  let totalPages = 1;

  const searchQuery = Array.isArray(query.query) ? query.query[0] : query.query;

  if (searchQuery) {
    const { products: fetchedProducts, totalProducts } = await fetchProducts(encodeURIComponent(searchQuery), page, size);
    products = fetchedProducts;
    totalPages = Math.ceil(totalProducts / size);
  }

  return {
    props: {
      products,
      totalPages,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default SearchPage;
