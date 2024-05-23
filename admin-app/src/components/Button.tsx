
import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { buttonTheme } from './Theme';

interface CustomButtonProps extends ButtonProps {
  label: string,
  pill?: boolean,
  caps?: boolean
}

export default function CustomButton({ label, pill=false, caps=false, color='primary', variant='contained', children, ...rest}: CustomButtonProps) {
  const buttonCasing = caps ? 'uppercase' : 'none';
  return(
    <ThemeProvider theme={buttonTheme}>
      <Button
        aria-label={label}
        id={label}
        name={label}
        color={color}
        variant={variant}
        style={{borderRadius: pill ? 9999 : 8, textTransform: buttonCasing}}
        {...rest}
      >
        {children}
      </Button>
    </ThemeProvider>
  )
}