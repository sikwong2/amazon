import React from 'react';
import { styled } from '@mui/material';
import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';

const Header = styled('span')(({ theme }) => ({
  lineHeight: '19px',
  verticalAlign: 'center',
  color: '#FFF',
  padding: '15px',
  textAlign: 'center',
}));

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <React.Fragment>
      <Box
        bgcolor="#232f3e"
        sx={{ fullWidth: 1,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '50px', 
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Header> {t('footer.disclaimer')} </Header>
      </Box>
    </React.Fragment>
  );
}
