import React from 'react';
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PageSelectorProps {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
}

export default function PageSelector({ currentPage, totalPages, onPageChange }: PageSelectorProps) {

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-evenly',
      mb: 3,
    }}>
      <Pagination page={currentPage} count={totalPages} variant="outlined" shape="rounded" onChange={handleChange}/>

    </Box>
  );
}
