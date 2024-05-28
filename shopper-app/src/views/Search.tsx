import { Login } from "./Login";
import { LoginProvider } from "@/context/Login";
import React, {useState} from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import Link from 'next/link';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
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

const fetchProducts = async (name: string): Promise<Product[]> => {
  try {
    const query = { query: `query getByName{
      getByName(name: "${name}", page: 1, size: 5, order: "price", sort: "DESC") {
        price
        name
        image
        category
      }
    }`};
    console.log(query);
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
}
export function Search() {
  const [ads, setAds] = React.useState<Image[]>([]);
  const { t } = useTranslation('common');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const adproducts = await fetchProducts('e');
        const ad = adproducts.map((product) => ({
          image: product.image[0],
          description: product.name,
          title: 'sale',
        }));
        setAds(ad);
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
          {t('home.easy-returns')}
        </Typography>
        <Typography sx={{ gridColumn: 'span 2', mb: 0.1}} align='left' variant='subtitle2'>
          {t('home.easy-returns-body')}
        </Typography>
        <CustomLink label="learn-more" href="/">
          <Typography variant='caption'>
            {t('home.learn-more')}
          </Typography> 
        </CustomLink>
      </Box>
    </CustomCard>
  )

  return (
    <React.Fragment>
      <Box aria-label="homeproducts" bgcolor="#E4E6E6" maxHeight='100%' margin={1}>
        <Box sx={{maxWidth: {md: '80%', sm: '100%'}}} alignItems='center' justifyContent="center" margin='auto'>
          <Grid container spacing={0} justifyContent="flex-start">
            <Grid item xs={12} sm={4} md={3}>
              <CategoryCard images={ads} title={t('home.pick-up')} />
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
