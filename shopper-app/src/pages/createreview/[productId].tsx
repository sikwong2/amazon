
import React, { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container, Rating, Stack, Typography } from '@mui/material';
import { NewReview } from '@/graphql/review/schema';
import CustomTextField from '@/components/CustomTextfield';
import CustomButton from '@/components/Button';
import CustomDivider from '@/components/Divider';
import { TypographyHover } from '@/components/TypographyHover';
import { LoginContext } from "@/context/Login";
import TopBar from '@/components/TopBar';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = {
    query: `query product{getByProductId(productId: "${context.query.productId}") {name, price, stock, rating, image, category, description}}`,
  };
  const res = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const json = await res.json();
  let return_product = {};
  if (json.errors) {
    console.error('Error retrieving product: ', json.errors);
  }
  const data = await json.data;
  if (!data || !data.getByProductId) {
    console.error('No product returned');
  } else {
    return_product = data.getByProductId;
  }
  
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
      product: return_product
    },
  };
};


interface Product {
  name: string;
  price: number;
  stock: number;
  rating: number;
  image: string[];
  description: string[];
  category: string[];
}

interface CreateReviewProp {
  product: Product;
}

export default function CreateReviewPage({ product }: CreateReviewProp) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { productId } = router.query;
  const [value, setValue] = React.useState<number | null>(0);
  const [review, setReview] = React.useState<NewReview>({ name: '', title: '', rating: 0, content: ''});
  const [images, setImages] = React.useState([]);
  const {userName, id, accessToken} = React.useContext(LoginContext); 


  React.useEffect(() => {
    if (!userName || !id || !accessToken) {
      router.push('/login')
    } 
  }, [id, userName, router])


  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const r = review;
    r.name = data.get('Name')!.toString();
    r.title = data.get('Title')!.toString();
    r.rating = value as number;
    r.content = data.get('Content')!.toString();
    console.log(r);
  };

  const onClear = () => {
    setValue(0);
  }

  const productDisplay = (
    <Grid container mt="1rem" mb='1rem'>
      <Grid item lg={2} sm={3} xs={4}>
        <Box display="flex" justifyContent="center">
          <Box
              sx={{ maxWidth: '8rem', maxHeight: '8rem', width: 'auto', height: 'auto', objectFit: 'contain' }}
              component="img"
              src={product.image[0]}
          />
        </Box>
      </Grid>
      <Grid item lg={10} sm={9} xs={8}>
        <Box display="flex" justifyContent="flex-start" >
          <Typography mt='2rem'>
            {product.name}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );

  const ratingDisplay = (
    <Box mb='1rem' mt='1rem'>
      <Stack direction='row'>
        <Box flexGrow={1}>
          <Typography variant='h5'>
            Overall Rating
          </Typography>
          <Rating
            aria-label="rating"
            name="controlled"
            precision={1}
            value={value}
            size="large"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{
              color: '#ffa41c',
              mt: '0.5rem'
            }}
          />
        </Box>
        <TypographyHover onClick={onClear}>
          Clear
        </TypographyHover>
      </Stack>

    </Box>
  );

  const headline = (
    <Box mb='1rem' mt='1rem'>
      <Typography variant='h5'>
        Add a headline
      </Typography>
      <CustomTextField
        label="title"
        placeholder="What's most important to know?"
        required
        type="title"
        name="Title"
        sx={{ mb: '0.5rem',  mt: '0.5rem'}}
        autoFocus
      />
    </Box>
  );

  const content = (
    <Box mb='1rem' mt='1rem'>
    <Typography variant='h5'>
      Add a written review
    </Typography>
    <CustomTextField
      label="content"
      placeholder="What did you like or dislike? What did you use this product for?"
      required
      type="content"
      name="Content"
      height='10rem'
      multiline={true}
      rows={3}
      sx={{ mb: '0.5rem',  mt: '0.5rem'}}
      autoFocus
    />
  </Box>
  );

  const name = (
    <Box mb='1rem' mt='1rem'>
    <Typography variant='h5'>
      Add a preferred name
    </Typography>
    <CustomTextField
      label="name"
      placeholder="Fill out your name"
      required
      type="name"
      name="Name"
      multiline={false}
      sx={{ mb: '0.5rem',  mt: '0.5rem'}}
      autoFocus
    />
  </Box>
  );

  const imagesUpload = (
    <Box mb='1rem' mt='1rem'>
      <Typography variant='h5'>
        Add a photo
      </Typography>
      <Typography variant='subtitle2' color='gray'>
        Shoppers find images more helpful than text alone.
      </Typography>
    </Box>
  );


  return(
    <>
    <TopBar/>
    <Container
      component="main"
      sx={{
        mb: '28px',
        pt: '14px',
        pb: '18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Grid container display="flex" justifyContent="center">
        <Grid item lg={8} sm={12} xs={12}>
          <Typography variant="h4">
            Create Review
          </Typography>
          {productDisplay}
          <CustomDivider/>
          {ratingDisplay}
          <CustomDivider/>
          <Box aria-label="form" component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            {headline}
            <CustomDivider/>
            {content}
            <CustomDivider/>
            {imagesUpload}
            <CustomDivider/>
            {name}
            <CustomButton
              type="submit"
              label="continue"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ height: '30px', fontSize: '12px' }}
            >
              Create Review
            </CustomButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
    </>
  )

}
