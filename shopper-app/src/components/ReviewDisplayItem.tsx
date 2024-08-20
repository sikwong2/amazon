import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'
import { Typography } from '@mui/material';
import {Grid} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Review } from '@/graphql/review/schema';

export default function ReviewListItem({ review, index}: {review: Review, index: number}) {
  return (
    <Box width="100%" key={index+'-reviewitem'+review.id}>
      <Grid container spacing={1}>
        <Grid item alignContent="left" sm={4}>
          <Avatar />
        </Grid>
        <Grid item alignContent="center" sm={4}>
          <Typography alignContent="left">
            {review.name}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography>
            {review.posted.toISOString()}
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Typography>
          {review.content}
        </Typography>
      </Box>
      <Box>
        {review.images?.map((image: string)=>(
          <Box
            sx={{ maxWidth: '150px', maxHeight: '200px', width: 'auto', height: 'auto' }}
            component="img"
            src={image}
          />
        ))}
      </Box>

    </Box>

  )
}