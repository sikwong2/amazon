// source: https://mui.com/material-ui/react-link/

import * as React from 'react';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@emotion/react';
import { linkThemes } from './Theme';

import { LinkProps } from 'next/link';

interface CustomLinkProps extends LinkProps{
  href: string,
  label: string,
  variant?: 'blue1' | 'blue2' | 'gray';
  children: React.ReactNode
}

export default function CustomLink({ href, label, variant='blue1', children, ...rest }: CustomLinkProps) {
  const theme = linkThemes[variant];
  return (
    <ThemeProvider theme={theme}>
      <Link 
        href={href} 
        aria-label={label}
        id={label}
        underline="hover"
        {...rest}
      >
        {children}
      </Link>
    </ThemeProvider>
  );
}