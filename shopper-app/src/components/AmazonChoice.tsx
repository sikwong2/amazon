// source: https://stackoverflow.com/questions/51538336/material-ui-how-would-i-add-small-triangle-in-the-corner

import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#232F3E',
  color: '#FFFFFF',
  padding: theme.spacing(0.5, 1),
  borderRadius: '2px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    right: '-29px',
    top: '0',
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '0 20px 28px 10px',
    borderColor: '#232F3E transparent transparent #232F3E',
  },
}));

export default function AmazonChoice({ ...rest }) {
  return (
    <StyledContainer {...rest}>
      <Typography variant="body2" display="inline">
        {' '}
        Amazon&apos;s
      </Typography>
      <Typography variant="body2" display="inline" sx={{ color: '#FFA41C', ml: 0.5 }}>
        Choice
      </Typography>
    </StyledContainer>
  );
}
