import React from 'react';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface Product {
  name: string,
  price: number,
  stock: number,
  rating: number,
  image: String[],
  description: String[]
}

interface ProductProp {
  product: Product // update to Product defined in /api
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("productID: ", context.query.productId);
  const query = { query: `query product{getByProductId(productId: "${(context.query.productId)}") {name, price, stock, rating, image, description}}` };
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-type': 'application/json',
    },
  })
  const json = await res.json();
  let return_product = {};
  if (json.errors) {
    console.error("Error retrieving product: ", json.errors);
  }
  const data = await json.data;
  if (!data.getByProductId) {
    console.error("No product returned");
  } else {
    return_product = data.getByProductId;
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', [
        'common',
      ])),
      product: return_product
    },
  }
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Product({ product }: ProductProp) {
  const { t } = useTranslation('common');

  return (
    <>
      <p> {product.name} </p>
      <p> {product.stock} </p>
      <p> {product.price} </p>
      <p> {product.rating} </p>
      <p> {product.image} </p>
      <p> {product.description} </p>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>
            xs=8
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </>
  )
}