import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const DollarSign = styled('span')(({ theme }) => ({
  lineHeight: '1.6',
  verticalAlign: 'top',
}));

const Dollars = styled('span')(({ theme }) => ({
  fontSize: '1em',
  lineHeight: '1',
}));

const Cents = styled('span')(({ theme }) => ({
  lineHeight: '1.6',
  verticalAlign: 'top',
}));

interface CustomPriceProps {
  value: number,
  fontSize?: string | number,
  smallFontSize?: string | number,
}

export default function CustomPrice ({ value, fontSize='2em', smallFontSize='1em' }: CustomPriceProps) {
  const dollars = Math.floor(value);
  const cents = (value % 1).toFixed(2).substring(2);

  return (
    <Box display='flex' alignItems='flex-start'>
      <DollarSign sx={{ fontSize:{smallFontSize} }}>$</DollarSign>
      <Dollars sx={{ fontSize:{fontSize} }}>{dollars}</Dollars>
      <Cents sx={{ fontSize:{smallFontSize} }}>{cents}</Cents>
    </Box>
  );
};
