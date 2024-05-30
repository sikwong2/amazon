import React from 'react';
import { Button } from '@mui/material';
import { LoginContext } from '@/context/Login';
import { useRouter } from 'next/router';

export default function Logo({ width = 200, height = 'auto', ...rest }) {
  const loginContext = React.useContext(LoginContext);
  const router = useRouter();
  return (
    <Button
      sx={{ p: 'unset' }}
      disabled={loginContext.accessToken.length > 0 ? false : true}
      onClick={() => {
        router.push('/');
      }}
    >
      <img
        src={'https://i.ibb.co/nkyzw2s/sammytheslug.png'}
        alt="Amazon Logo"
        width={width}
        height={height}
        {...rest}
      />
    </Button>
  );
}

export const defaultLogoWidth = 120;
