import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'
import CustomRating from './Rating';
import { RatingHistogram } from '@/graphql/review/schema';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { LinearProgressProps, linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: 3,
  outline: '0.02rem solid #000000',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#FFFFFF",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#ffa41c",
  },
}));

export default function CustomLinearProgress({value, ...rest}: LinearProgressProps) {
  return (
    <BorderLinearProgress variant="determinate" value={value} {...rest}/>
  );
}
