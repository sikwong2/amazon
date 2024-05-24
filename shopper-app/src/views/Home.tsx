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

import { Product } from "@/graphql/product/schema";

const fetchProducts = async (category: string): Promise<Product[]> => {
  console.log(category)
  try {
    const query = { query: `query getMovies{
      getByCategory(category: "movie", page: 1, size: 5, order: "price", sort: "DESC") {
        price
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

  return (
    <React.Fragment>
      <ImageCarousel images={images} height={400}/>
      <div> Home </div>
    </React.Fragment>

  )
}