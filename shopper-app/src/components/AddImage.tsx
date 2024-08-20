import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

export function AddImage({...rest}: BoxProps) {
  return(
    <Box
      sx={{border: '0.15rem dashed gray', cursor: 'pointer', borderRadius: '10px', mt:'0.5rem'}}
      width='100px' height='100px' 
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <AddIcon fontSize='large'/>
    </Box>
  )
}