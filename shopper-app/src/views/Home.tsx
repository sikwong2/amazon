import { Login } from "./Login";
import { LoginProvider } from "@/context/Login";
import React, {useState} from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import Link from 'next/link';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import LanguageButton from '@/components/Language';
import Logo from "@/components/Logo";
import { Toolbar } from "@mui/material";
import {Typography} from "@mui/material";
import {AppBar} from "@mui/material";
import {Box} from "@mui/material";
import CustomButton from "@/components/Button";
import ImageCarousel from "@/components/Carousel";
import type { Image } from "@/components/Carousel";
import CategoryCard from "@/components/CategoryCard";
import {Grid} from "@mui/material";
import CustomCard from "@/components/Card";
import CustomLink from "@/components/Link";

import { Product } from "@/graphql/product/schema";

const fetchProducts = async (category: string): Promise<Product[]> => {
  console.log(category)
  try {
    const query = { query: `query getMovies{
      getByCategory(category: "movie", page: 1, size: 5, order: "price", sort: "DESC") {
        price
        name
        image
        category
      }
    }`};
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await res.json();
    console.log('json:')
    console.log(json)
    if (json.errors) {
      console.log(json.errors[0].message);
      throw new Error(json.errors[0].message);
    }
    return json.data.getByCategory;
  } catch (e) {
    console.log(e);
    throw new Error('FETCH PRODUCTS BROKEN PLS FIX');
  }
}

// outer container of ads / cards once signed in
// carosoul component
// card of category component
export function Home() {
  const [images, setImages] = React.useState<Image[]>([]);

  React.useEffect(() => {
    console.log('use effecting');
    const fetchData = async () => {
      try {
        const products = await fetchProducts('movie');
        console.log('products', products);
        const imgs = products.map((product) => ({
          image: product.image[0],
          description: product.name,
          title: 'sale',
        }));
        console.log('imgs', imgs);
        setImages(imgs);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [])

  const easyReturns = (
    <CustomCard elevation={0} sx={{width:"auto", height: 'auto', margin: 1, maxWidth: '300px', alignItems: 'start', justifyContent: 'center', display: 'flex', flexGrow: 1}}>
                <Box
                  sx={{
                    display: 'grid',
                    columnGap: 0.5,
                    rowGap: 0.5,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    flexGrow: 1,
                    m: 2
                    }}
                  alignItems='start'
                  justifyContent='center'
                >
                  <Typography sx={{ gridColumn: 'span 2', mb: 0.1}} align='left' variant='subtitle1'>
                    Easy Returns
                  </Typography>
                  <Typography sx={{ gridColumn: 'span 2', mb: 0.1}} align='left' variant='subtitle2'>
                    Amazon has flexible return shipping on orders & gifts
                  </Typography>
                  <CustomLink label="learn-more" href="/">
                    <Typography variant='caption'>
                      Learn More
                    </Typography> 
                  </CustomLink>
                </Box>
              </CustomCard>
  )

  return (
    <React.Fragment>
      <Box aria-label="homeproducts" bgcolor="#E4E6E6" maxHeight='100%' margin={1}>
        <Box sx={{maxWidth: {md: '80%', sm: '100%'}}} alignItems='center' justifyContent="center" margin='auto'>
          <Box position='static' margin={1} justifyContent="center" alignItems="center" bgcolor="#FFFFFF">
            <ImageCarousel images={images} height={400}/>
          </Box>
          <Grid container spacing={0} justifyContent="flex-start">
            <Grid item xs={12} sm={4} md={3}>
              <CategoryCard images={images} title="Pick up where you left off" />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <CategoryCard images={images} title="Keep shopping for" />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <CategoryCard images={images} title="Top Deal" />
            </Grid>
            <Grid item xs={0} sm={0} md={3}>
              {easyReturns}
            </Grid>
          </Grid>
        </Box>

      </Box>

    </React.Fragment>

  )
}