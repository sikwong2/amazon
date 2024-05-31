import { Typography, styled } from "@mui/material";

// component that looks like link but used for no href stuff
export const TypographyHover = styled(Typography)(({ theme }) => ({
  color: '#017185',
  lineHeight: '20px',
  '&:hover': {
    color: '#D77B21',
    textDecoration: 'underline',
  },
  '&.Mui-selected': {
    color: '#0F1111',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '18px', // Adjust lineHeight for small screens if necessary
  },
}));