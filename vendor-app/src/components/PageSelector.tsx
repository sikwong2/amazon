import React from 'react';
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';

export default function PageSelector({ lastPage = true, ...rest }) {
  const [pageNum, setPageNum] = useState(1);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Button
        disabled={pageNum == 1}
        onClick={() => {
          setPageNum(pageNum - 1);
        }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <Typography aria-label="pageNum">{pageNum}</Typography>
      <Button
        disabled={lastPage}
        onClick={() => {
          setPageNum(pageNum + 1);
        }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
}
