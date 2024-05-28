import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CategoryCard from '@/components/CategoryCard';
import { Product } from '@/graphql/product/schema';


const fetchProducts = async (name: string): Promise<Product[]> => {
    try {
        const query = { query: `query getByName{
            getByName(name: "${name}", page: 1, size: 5, order: "price", sort: "DESC") {
                price
                name
                image
                category
            }
        }` };
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
        return json.data.getByName;
    } catch (e) {
        console.log(e);
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
        <Box aria-label="search-results" bgcolor="#E4E6E6" maxHeight="100%" margin={1}>
            <Box sx={{ maxWidth: { md: '80%', sm: '100%' }}} alignItems="center" justifyContent="center" margin="auto">
                <Typography variant="h4" gutterBottom>
                    {t('search.resultsFor')} "{query}"
                </Typography>
                <Grid container spacing={2} justifyContent="flex-start">
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.name}>
                            <CategoryCard images={[{ image: product.image[0], description: product.name, title: product.name }]} title={product.name} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context.query;

    let products: Product[] = [];
    if (query) {
        products = await fetchProducts(query as string);
    }

    return {
        props: {
            products,
        },
    };
};

export default SearchPage;
