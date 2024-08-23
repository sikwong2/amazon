import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'
import { Divider, Stack, Typography } from '@mui/material';
import {Grid} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Review } from '@/graphql/review/schema';
import {Rating} from '@mui/material';
import CustomButton from './Button';
import CustomDivider from './Divider';

const renderTime = (date: Date) => {
  const d = new Date(date);
  const dateString =
    `${d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  return dateString;
};

const renderDay = (date: Date) => {
  const d = new Date(date);
  const today = new Date();
  let dateString;
  dateString = `${d.toLocaleString(undefined, {month: 'short'})} ${d.getDate()}, ${d.getFullYear()}`;
  return dateString;
};

export default function ReviewListItem({ review, index}: {review: Review, index: number}) {
  console.log(review);
  const d = new Date(review.posted);
  const date = renderDay(d);

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
              Reviewed in the United States on {date}
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
          {review.images?.map((image: string)=>(
            <Box
              sx={{ maxWidth: '150px', maxHeight: '88px', width: 'auto', height: '88px' }}
              component="img"
              src={image}
            />
          ))}
        </Box>
      </Stack>
      <Typography color='rgb(94,95,95)' variant='subtitle2' mt='0.3rem'>
        X people found this helpful
      </Typography>
      <Stack direction='row' width='200px' mt='0.5rem' spacing='0.5rem'>
        <Box width='100%'>
          <CustomButton label='helpful' variant='outlined' pill sx={{minWidth: '50px', width:'100%'}}>
              Helpful
          </CustomButton>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 1 }} />
        <Box width='100%'>
          <CustomButton label='report' variant='text' pill sx={{minWidth: '50px', width:'100%'}}>
            Report
          </CustomButton>
        </Box>

      </Stack>

    </Box>

  )
}