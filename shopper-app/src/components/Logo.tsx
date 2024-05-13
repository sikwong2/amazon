import React from "react";
import { Button } from "@mui/material";
import { LoginContext } from "@/context/Login";
import { useRouter } from 'next/router';
export function Logo() {
  const loginContext = React.useContext(LoginContext)
  const router = useRouter();
  return (
    <Button
      disabled={loginContext.accessToken.length > 0 ? false : true}
      onClick={() => {
        router.push('/');
      }}
      >
      <img
        src={'https://upload.wikimedia.org/wikipedia/commons/4/41/Amazon_PNG6.png'}
        alt='Amazon Logo'
        width={200}
        height={50}
      />
    </Button>
  )
}