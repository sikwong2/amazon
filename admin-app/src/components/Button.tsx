
import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { buttonTheme } from './Theme';


export default function CustomButton({ label='', pill=false, color='primary', variant='contained', children, ...rest}: ButtonProps & {label?: string, pill?:boolean}) {
  return(
    <ThemeProvider theme={buttonTheme}>
      <Button
        aria-label={label}
        id={label}
        name={label}
        color={color}
        variant={variant}
        style={{borderRadius: pill ? 9999 : 8}}
        {...rest}
      >
        {children}
      </Button>
    </ThemeProvider>
  )
}