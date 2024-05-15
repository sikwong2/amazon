// source: https://mui.com/base-ui/react-input/#hook

import * as React from 'react';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@emotion/react';

interface LinkProps {
  href: string,
  label: string,
  children: React.ReactNode
}

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

export default function CustomLink({ href, label, children }: LinkProps) {
  return (
    <Link 
      href={href} 
      aria-label={label}
      id={label}
      underline="hover"
    >
      {children}
    </Link>
  );
}