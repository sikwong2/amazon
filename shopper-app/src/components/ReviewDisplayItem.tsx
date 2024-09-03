import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'
import { Divider, Stack, Typography } from '@mui/material';
import {Grid} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Review } from '@/graphql/review/schema';
import {Rating} from '@mui/material';
import CustomButton from './Button';
import CustomDivider from './Divider';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { LoginContext } from '@/context/Login';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const renderDay = (date: Date) => {
  const d = new Date(date);
  const today = new Date();
  let dateString;
  dateString = `${d.toLocaleString(undefined, {month: 'short'})} ${d.getDate()}, ${d.getFullYear()}`;
  return dateString;
};

const fetchAddLike = async (reviewId: string, memberId: string): Promise <any> => {
  const query = {
    query: `mutation addLike {
      addLike(reviewId: "${reviewId}", memberId: "${memberId}")
    }`
  };
  fetch('/api/graphql', {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
    return res.json();
  })
}


export default function ReviewListItem({ review, index}: {review: Review, index: number}) {
  const { t } = useTranslation('common');
  const d = new Date(review.posted);
  const date = renderDay(d);
  const [clicked, setClicked] = React.useState(false);
  const {accessToken, id} = React.useContext(LoginContext);

  const handleOnClick = () => {
    setClicked(true);
    if (accessToken && id) {
      fetchAddLike(review.id, id);
    }
  }

  return (
    <Box width="100%" key={index+'-reviewitem'+review.id}>
      <Grid container alignItems="flex-start">
        <Grid item alignContent="left" xs={12}>
          <Stack direction='row' alignItems='center' spacing='0.5rem'>
            <Box >
              <Avatar />
            </Box>
            <Typography
              display="inline"
              align="left"
              flexGrow={1}
            >
              {review.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item sm={12}>
          <Stack direction='row' alignItems='center' spacing='0.5rem'>
            <Rating
              aria-label="rating"
              name="read-only"
              value={review.rating}
              precision={0.1}
              readOnly
              size='small'
              sx={{
                color: '#ffa41c',
              }}
            />
            <Typography fontWeight='900'>
              {review.title}
            </Typography>
          </Stack>
          <Typography color='rgb(94,95,95)' variant='subtitle2' flex={1}>
              {t('reviews.review-display.reviewed-in')} {date}
            </Typography>
        </Grid>
      </Grid>
      <Stack direction='column' mt='0.2rem' mb='0.2rem'>
        <Box>
          <Typography>
            {review.content}
          </Typography>
        </Box>
        <Box mt='0.5rem' mb='0.2rem'>
          {review.images?.map((image: string, id)=>(
            <Box
              sx={{ maxWidth: '150px', maxHeight: '88px', width: 'auto', height: '88px' }}
              component="img"
              src={image}
              key={'display-image'+id}
            />
          ))}
        </Box>
      </Stack>
      <Typography color='rgb(94,95,95)' variant='subtitle2' mt='0.3rem'>
        {review.total_likes} {t('reviews.review-display.helpful-subtitle')}
      </Typography>
      <Stack direction='row' width='100%' mt='0.5rem' spacing='0.5rem'>
        <Box width='100%'>
          {!clicked ?
            <CustomButton
              label='helpful'
              variant='outlined'
              pill
              sx={{maxWidth:'100px', width:'100%'}}
              onClick={(handleOnClick)}
            >
              {t('reviews.review-display.helpful-button')}
            </CustomButton>
            :
            <Stack direction='row'>
              <CheckCircleIcon fontSize='small' sx={{color: 'green', mr: '0.2rem'}}/>
              <Typography color="green" variant='subtitle2'>
                {t('reviews.review-display.thank-you')}
              </Typography>
            </Stack>

          }
        </Box>

      </Stack>

    </Box>

  )
}