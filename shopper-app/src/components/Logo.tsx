import React from "react";
import { Button } from "@mui/material";
import { LoginContext } from "@/context/Login";
import { useRouter } from 'next/router';
import { PageContext } from "@/context/Page";

export default function Logo({width=200, height='auto', ...rest}) {
  const loginContext = React.useContext(LoginContext)
  const pageContext = React.useContext(PageContext);
  const router = useRouter();

  return (
    <Button
      sx={{ p:'unset' }}
      onClick={() => {
        pageContext.setPage('home');
        router.push('/');
      }}
      >
      <img
        src={'https://i.ibb.co/Z8Yq2Pp/buffsammy.png'}
        alt='Amazon Logo'
        width={width}
        height={height}
        {...rest}
      />
    </Button>
  )
}

export const defaultLogoWidth = 120;