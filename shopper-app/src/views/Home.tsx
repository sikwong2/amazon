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
  try {
    const query = { query: `query product{getByCategory(category: "${category}") {name, price, image}}` };
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
    return json.data.getByCategory;
  } catch (e) {
    console.log(e);
    throw new Error('');
  }
}

// outer container of ads / cards once signed in
// carosoul component
// card of category component
export function Home() {
  const [images, setImages] = React.useState<Image[]>([]);

  React.useEffect(() => {
    (async () => {
      const products = await fetchProducts('sale');
      const imgs = products.map((product) => ({
        image: product.image[0],
        description: product.name,
        title: 'sale',
      }))
      setImages(imgs)
    })
  })

  return (
    <ImageCarousel images={images} height={500}/>
  )
}