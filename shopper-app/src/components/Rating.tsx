// source: https://mui.com/material-ui/react-rating/

import * as React from 'react';
import Box from '@mui/material/Box';
import Rating, { RatingProps } from '@mui/material/Rating';

interface CustomRatingProps extends RatingProps{
  rating: number
}

export default function CustomRating({ rating, ...rest }: CustomRatingProps) {

  return (
    <>
    <Box display="flex" alignItems="center">
      <span style={{fontSize:'0.9em', verticalAlign:'top', marginTop:3, marginRight:3}}>
        {rating}
      </span>
      <Rating 
        aria-label='rating' 
        name="read-only" 
        value={rating} 
        precision={0.1} 
        readOnly 
        {...rest}
        sx={{
          color:'#ffa41c',
        }}
        />
    </Box>
    </>
  );
}