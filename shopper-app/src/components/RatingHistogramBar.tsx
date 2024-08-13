import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box'
import CustomRating from './Rating';
import { RatingHistogram } from '@/graphql/review/schema';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { LinearProgressProps, linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 3,
  outline: '0.02rem solid #BBBEBE',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#F0F2F2",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#ffa41c",
  },
}));

export default function CustomLinearProgress({value, ...rest}: LinearProgressProps) {
  return (
    <BorderLinearProgress variant="determinate" value={value} />
  );
}
