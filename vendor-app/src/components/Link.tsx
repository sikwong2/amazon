// source: https://mui.com/base-ui/react-input/#hook

import * as React from 'react';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@emotion/react';
import { linkThemes } from './Theme';

interface CustomLinkProps{
  href?: string,
  label: string,
  variant?: 'blue1' | 'blue2' | 'gray';
  children: React.ReactNode
  onClick?: () => void; 
}

export default function CustomLink({ href, label, variant='blue1', children, onClick, ...rest }: CustomLinkProps) {
  const theme = linkThemes[variant];
  return (
    <ThemeProvider theme={theme}>
      <Link 
        href={href} 
        aria-label={label}
        id={label}
        underline="hover"
        onClick={onClick}
        {...rest}
      >
        {children}
      </Link>
    </ThemeProvider>
  );
}