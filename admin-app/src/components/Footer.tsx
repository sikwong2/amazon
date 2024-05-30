import React from 'react';
import { Button, styled } from '@mui/material';
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
        bgcolor="#222F3E"
        sx={{ fullWidth: 1 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Header> {t('footer.disclaimer')} </Header>
      </Box>
    </React.Fragment>
  );
}
