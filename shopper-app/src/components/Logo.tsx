import React from 'react';
import { Button } from '@mui/material';
import { LoginContext } from '@/context/Login';
import { useRouter } from 'next/router';
import { PageContext } from '@/context/Page';

export default function Logo({ width = 200, height = 'auto', ...rest }) {
  const pageContext = React.useContext(PageContext);
  const router = useRouter();

  return (
    <Button
      sx={{ p: 'unset' }}
      onClick={() => {
        pageContext.setPage('home');
        router.push('/');
      }}
      {...rest}
    >
      <img
        src={'https://i.ibb.co/nkyzw2s/sammytheslug.png'}
        alt="Amazon Logo"
        width={width}
        height={height}
      />
    </Button>
  );
}

export const defaultLogoWidth = 120;
