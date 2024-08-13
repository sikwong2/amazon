import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'
import CustomRating from './Rating';
import { RatingHistogram } from '@/graphql/review/schema';
import { Typography } from '@mui/material';
import CustomLinearProgress from './RatingHistogramBar';

interface HistogramBarProps {
  star: number,
  value: number
}

const HistogramBar = ({star, value}: HistogramBarProps) => (
  <Box display="flex">
    <Typography>
      {star} star
    </Typography>
    <CustomLinearProgress value={value}/>
    <Typography>
      {value}%
    </Typography>
  </Box>
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
      <Box>
        <Typography variant='h2'>
          Customer reviews
        </Typography>
        <CustomRating rating={ratingHistogram.average}/>
        <Typography>
          {ratingHistogram.average} out of 5
        </Typography>
        <Typography>
          {ratingHistogram.total} global ratings
        </Typography>
        <HistogramBar star={5} value={fiveStarValue}/>
        <HistogramBar star={4} value={fourStarValue}/>
        <HistogramBar star={3} value={threeStarValue}/>
        <HistogramBar star={2} value={twoStarValue}/>
        <HistogramBar star={1} value={oneStarValue}/>
      </Box>
    </>
  )
}
