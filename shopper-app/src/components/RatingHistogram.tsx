import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'
import CustomRating from './Rating';
import { RatingHistogram } from '@/graphql/review/schema';
import { Typography } from '@mui/material';
import CustomLinearProgress from './RatingHistogramBar';
import {Grid} from '@mui/material';

interface HistogramBarProps {
  star: number,
  value: number
}

const HistogramBar = ({star, value}: HistogramBarProps) => (
  <Grid container rowSpacing='0.5rem' columnSpacing='0.5rem' alignItems='left' >
    <Grid item xs={2} alignContent='center'>
      <Typography>
        {star} star
      </Typography>
    </Grid>
    <Grid item xs={8} alignContent='center'>
      <CustomLinearProgress value={value}/>
    </Grid>
    <Grid item xs={2} alignContent='center'>
      <Typography textAlign='right'>
        {value}%
      </Typography>
    </Grid>
  </Grid>

  
)

interface RatingHistogramProps {
  ratingHistogram: RatingHistogram
}

function getValue(reviewNumber: number, total: number) {
  if (total == 0) {
    return 0;
  } else {
    return Math.round((reviewNumber / total) * 100);
  }
}

export default function CustomRatingHistogram({ratingHistogram}: RatingHistogramProps) {
  const fiveStarValue = getValue(ratingHistogram.fiveStar, ratingHistogram.total);
  const fourStarValue = getValue(ratingHistogram.fourStar, ratingHistogram.total);
  const threeStarValue = getValue(ratingHistogram.threeStar, ratingHistogram.total);
  const twoStarValue = getValue(ratingHistogram.twoStar, ratingHistogram.total);
  const oneStarValue = getValue(ratingHistogram.oneStar, ratingHistogram.total);


  return (
    <>
      <Box width='100%' minWidth='300px'>
        <Box display="flex" alignItems="left">
          <Typography variant='h5'>
            Customer reviews
          </Typography>
        </Box>
        <Box marginBottom='8px'>
          <CustomRating rating={ratingHistogram.average} key='ratinghistogram-ratings'/>
        </Box>
        <Box marginBottom='16px'>
          <Typography variant='subtitle2'>
            {ratingHistogram.total} global ratings
          </Typography>
        </Box>
        <Box>
          <HistogramBar star={5} value={fiveStarValue} key='histogrambar-fiveStar'/>
          <HistogramBar star={4} value={fourStarValue} key='histogrambar-fourStar'/>
          <HistogramBar star={3} value={threeStarValue} key='histogrambar-threeStar'/>
          <HistogramBar star={2} value={twoStarValue} key='histogrambar-twoStar'/>
          <HistogramBar star={1} value={oneStarValue} key='histogrambar-oneStar'/>
        </Box>
      
      </Box>
    </>
  )
}
