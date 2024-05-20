import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardProps } from '@mui/material/Card';
import { ThemeProvider } from '@emotion/react';
import { cardTheme } from './Theme';

const CustomCard = ({ children, type = 'rounded', ...rest }: CardProps & { type?: string }) => { // Accepting title as a prop
  return (
    <ThemeProvider theme={cardTheme}>
      <Box sx={{ minWidth: 275 }}>
        <Card
          style={{
            borderRadius: type === 'pointy' ? '1px' : '8px',
          }}
          variant='outlined'
          {...rest}>
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
