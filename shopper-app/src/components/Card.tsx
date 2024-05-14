import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardProps } from '@mui/material/Card';
import { ThemeProvider } from '@emotion/react';
import { cardTheme } from './Theme';

const CustomCard = ({children}: CardProps) => {
  return (
    <ThemeProvider theme = {cardTheme}>
    <Box sx={{ minWidth: 275 }}>
        <Card variant='outlined'>
        <React.Fragment>
          <CardContent>
            {children}
          </CardContent>
        </React.Fragment>
        </Card>
    </Box>
    </ThemeProvider>
  );
};

export default CustomCard;