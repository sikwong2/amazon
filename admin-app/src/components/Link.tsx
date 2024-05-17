import * as React from 'react';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@emotion/react';

interface CustomLinkProps{
  href: string,
  label: string,
  children: React.ReactNode
}

export default function CustomLink({ href, label, children, ...rest }: CustomLinkProps) {
  return (
    <Link 
      href={href} 
      aria-label={label}
      id={label}
      underline="hover"
      {...rest}
    >
      {children}
    </Link>
  );
}