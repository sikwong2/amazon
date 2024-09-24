
import React, { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Container, Dialog, DialogActions, Rating, Stack, TextField, Typography } from '@mui/material';
import { NewReview } from '@/graphql/review/schema';
import CustomTextField from '@/components/CustomTextfield';
import CustomButton from '@/components/Button';
import CustomDivider from '@/components/Divider';
import { TypographyHover } from '@/components/TypographyHover';
import { LoginContext } from "@/context/Login";
import TopBar from '@/components/TopBar';
import { AddImage } from '@/components/AddImage';
import CustomLink from '@/components/Link';

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
  const [images, setImages] = React.useState<string[]>([]);
  const {userName, id, accessToken} = React.useContext(LoginContext); 
  const [open, setOpen] = React.useState(false);
  const imgre = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
  const [image, setImage] = React.useState('');

  

  React.useEffect(() => {
    if (!userName || !id || !accessToken) {
      router.push('/login')
    } 
  }, [id, userName, router])


  const onSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const r = review;
    r.name = userName;
    r.title = data.get('Title')!.toString();
    r.rating = value as number;
    r.content = data.get('Content')!.toString();

    if (r.name == '' || r.content == '' || r.title == '') {
      alert(`Please fill in all fields`);
    } else {
      let query;

      if (images.length != 0) {
        query = {query: `mutation postReview{ postReview( 
          memberId: "${id}",
          productId: "${productId as string}",
          newReview: {content: "${r.content}",
          rating: ${r.rating},
          title: "${r.title}",
          name: "${r.name}",
          images: ${JSON.stringify(images)}}
          ) {
          id
        }}`}
      } else {
        query = {query: `mutation postReview{
          postReview(
            memberId: "${id}", 
            productId: "${productId as string}",
            newReview: {content: "${r.content}", rating: ${r.rating}, title: "${r.title}", name: "${r.name}"}
          ) {
          content
          id
          images
          name
          posted
          product_id
          shopper_id
          rating
          title
        }
        }`}
      }


      fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.errors) {
            alert(`${json.errors[0].message}`);
          } else {
            router.push(`/product/${productId as string}`);
          }
        });
    };
  };

  const onClear = () => {
    setValue(0);
  }

  // blue bar on top 
  // Edit name doesn't work, currently links to home, needs to link to edit name page
  const header = (
    <Box sx={{backgroundColor: 'rgb(233,250,255)'}} width="100%" flexGrow={1} height='4rem'>
      <Container maxWidth='md'>
        <Stack direction='row' spacing='1rem' alignItems='center' pt='0.7rem'>
          <Avatar/>
          <Typography>
            {userName}
          </Typography>
          <CustomLink href='/' label='editUserName'>
            {t('reviews.create-review.edit')}
          </CustomLink>
        </Stack>
      </Container>
    </Box>
  );

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
          <Typography mt='1.5rem' ml='0.5rem'
            sx={{
              wordWrap: 'break-word',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
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
          {t('reviews.create-review.overall-rating')}
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
          {t('reviews.create-review.clear')}
        </TypographyHover>
      </Stack>

    </Box>
  );

  const headline = (
    <Box mb='1rem' mt='1rem'>
      <Typography variant='h5' 
      >
        {t('reviews.create-review.headline')}
      </Typography>
      <CustomTextField
        label="title"
        placeholder={t('reviews.create-review.headline-placeholder') || ""}
        required
        type="title"
        name="Title"
        sx={{ mb: '0.5rem',  mt: '0.5rem'}}
        autoFocus
        width='98%'
      />
    </Box>
  );

  const content = (
    <Box mb='1rem' mt='1rem'>
    <Typography variant='h5'>
      {t('reviews.create-review.content')}
    </Typography>
    <CustomTextField
      label="content"
      placeholder={t('reviews.create-review.content-placeholder') || ""}
      required
      type="content"
      name="Content"
      height='10rem'
      multiline={true}
      rows={3}
      sx={{ mb: '0.5rem',  mt: '0.5rem'}}
      autoFocus
      width='98%'
    />
  </Box>
  );

  
  const name = (
    <Box mb='1rem' mt='1rem'>
    <Typography variant='h5'>
      {t('reviews.create-review.name')}
    </Typography>
    <CustomTextField
      label="name"
      placeholder={t('reviews.create-review.name-placeholder') || ""}
      required
      type="name"
      name="Name"
      multiline={false}
      sx={{ mb: '0.5rem',  mt: '0.5rem'}}
      autoFocus
      width='98%'
    />
  </Box>
  );

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddImage = (i: string) => {
    const allimages = images.concat([i]);
    setImages(allimages);
    setImage('');
    setOpen(false);
  }
  
  const handleRemoveImage = (id: number) => {
    const allimages = images.filter((_, i) => i !== id);
    setImages(allimages);
  }

  const handleImageInputChange = (event: any) => {
    setImage(event.target.value);
  }

  const handleCancel = () => {
    setImage('');
  }
  

  const dialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
    >
      <Box
        m="1rem"
      >
        <Typography variant='h5' mb='1rem'>
          {t('reviews.create-review.images')}
        </Typography>
        <CustomTextField
          id="image"
          name="image"
          inputProps={{ "data-testid": "image-input" }}
          placeholder={t('reviews.create-review.images-placeholder') || ""}
          value={image}
          onChange={handleImageInputChange}
          width='98%'
          autoFocus
        /> 
      </Box>
      {
      imgre.test(image) && 
        <Box display='flex' justifyContent='center'>
          <Box
            sx={{ gridColumn: 'span 2', maxWidth: '20rem', maxHeight: '20rem', width: 'auto', height: 'auto' }}
            component="img"
            src={image}
          />
        </Box>

      }
      <DialogActions>
        <CustomButton
          onClick={handleCancel}
          name="Clear"
          label='Clear'
        >
          {t('reviews.create-review.clear')}
        </CustomButton>
        <CustomButton
          disabled={imgre.test(image) ? false : true}
          onClick={() => handleAddImage(image)}
          aria-label="postImage"
          name="postImage"
          label="postImage"
        > 
          {t('reviews.create-review.post')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  )

  const imagesUpload = (
    <Box mb='1rem' mt='1rem'>
      <Typography variant='h5'>
        {t('reviews.create-review.images')}
      </Typography>
      <Typography variant='subtitle2' color='gray'>
        {t('reviews.create-review.images-subtitle')}
      </Typography>
      <Grid container spacing='0.5rem' sx={{ mb: '0.5rem',  mt: '0.5rem'}}>
        {images?.map((image, id) => (
          <Grid item xs='auto' display='flex' justifyContent='center' key={'grid'+id}>
            <Box
                sx={{ maxWidth: '100px', maxHeight: '100px', width: 'auto', height: 'auto', objectFit: 'contain' }}
                component="img"
                key={id}
                src={image}
                onClick={() => handleRemoveImage(id)}
            />
          </Grid>
        ))}
        <Grid item xs='auto' display='flex' justifyContent='center'>
          <AddImage onClick={handleOpen}/>
        </Grid>
      </Grid>

    </Box>
  );


  return(
    <>
    <TopBar/>
    {header}
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
            {t('reviews.create-review.create')}
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
            <CustomDivider sx={{mb: '1rem'}}/>
            {!userName && name}
            <Box display="flex" justifyContent='center'>
              <CustomButton
                type="submit"
                label="continue"
                variant="contained"
                color="primary"
                sx={{ height: '30px', width:'100%', fontSize: '12px' }}
              >
                {t('reviews.create-review.create')}
              </CustomButton>
            </Box>
            
          </Box>
        </Grid>
      </Grid>
      {dialog}
    </Container>
    </>
  )

}
