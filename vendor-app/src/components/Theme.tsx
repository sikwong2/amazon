import { createTheme } from '@mui/material/styles';

// themed option
// https://codesandbox.io/p/sandbox/mui-button-variant-override-e18vg?file=%2Fdemo.js%3A31%2C27
// https://mui.com/material-ui/customization/default-theme/
// https://www.copycat.dev/blog/material-ui-button/

// in future can add additional color props if neccessary
// https://mui.com/material-ui/customization/palette/#custom-colors

export const globalTheme = createTheme({
  // https://mui.com/material-ui/customization/palette/
  palette: {
    primary: {
      main: '#FFD812',
      light: '#FFD812',
      dark: '#F7CA00',
      contrastText: '#0F1111',
    },
    secondary: {
      main: '#FFA41C',
      light: '#FFA41C',
      dark: '#FA8900',
      contrastText: '#0F1111',
    },
    info: {
      main: '#EDFCFF',
    },
  },
  typography: {
    fontFamily: ['Amazon Ember', 'Helvetica', 'sans-serif'].join(','),
  },
});

// https://mui.com/material-ui/customization/theme-components/
// Make sure to wrap a ThemeProvider around the button you want to have this theme applied
export const buttonTheme = createTheme(
  {
    components: {
      MuiButton: {
        variants: [
          {
            props: {},
            style: {
              fontFamily: ['sans-serif', 'Amazon Ember'],
              color: globalTheme.palette.primary.contrastText,
              boxSizing: 'border-box',
              borderRadius: 8,
              border: '1px solid transparent',
              '&:hover': {
                color: globalTheme.palette.primary.contrastText,
                outline: `solid 1px rgba(250, 137, 0, 0.5)`,
              },
              '&:active': {
                border: 'solid 1px #017185',
                outline: 'solid 3px #C9F3FA',
              },
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              fontFamily: ['sans-serif', 'Amazon Ember'],
              border: 'solid 1px #888C8C',
              fontWeight: 'normal',
              '&:hover': {
                backgroundColor: 'rgba(136, 140, 140, 0.1)',
                border: 'solid 1px #888C8C',
                outline: 'none',
              },
              '&:active': {
                fontWeight: 'bold',
                backgroundColor: '#EDFCFF',
                outline: `solid 3px #017185`,
              },
            },
          },
          {
            props: { variant: 'outlined', color: 'info' },
            style: {
              fontFamily: ['sans-serif', 'Amazon Ember'],
              border: 'solid 3px #017185',
              '&:hover': {
                backgroundColor: 'rgba(136, 140, 140, 0.1)',
                border: 'solid 3px #017185',
                outline: 'none',
              },
              '&:active': {
                fontWeight: 'bold',
                backgroundColor: '#EDFCFF',
                border: `solid 3px #017185`,
                outline: 'none',
              },
            },
          },
          {
            props: { variant: 'text' },
            style: {
              fontFamily: ['sans-serif', 'Amazon Ember'],
              border: 'solid 1px #888C8C',
              fontWeight: 'normal',
              '&:hover': {
                backgroundColor: 'rgba(136, 140, 140, 0.1)',
                border: 'solid 1px #888C8C',
                outline: 'none',
              },
              '&:active': {
                backgroundColor: '#EDFCFF',
                border: 'solid 1px #017185',
                outline: `solid 3px #C9F3FA`,
              },
            },
          },
        ],
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
          disableFocusRipple: true,
          disableTouchRipple: true,
        },
      },
    },
  },
  globalTheme,
);

export const cardTheme = createTheme(
  {
    components: {
      MuiCard: {
        variants: [
          {
            props: { variant: 'outlined' },
            style: {
              borderWidth: '1px',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              boxShadow: 'none',
              '&:hover': {
                boxShadow:
                  '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
              },
            },
          },
        ],
        defaultProps: {
          raised: false,
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            fontFamily: ['sans-serif', 'Amazon Ember'],
            padding: '0px',
            '&:last-child': {
              paddingBottom: '0px',
            },
          },
        },
      },
      MuiTypography: {
        variants: [
          {
            props: { component: 'h1' },
            style: {
              fontFamily: ['sans-serif', 'Amazon Ember'],
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.2,
              color: 'text.primary',
            },
          },
        ],
      },
    },
  },
  globalTheme,
);

export const dividerTheme = createTheme(globalTheme, {
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          width: '100%',
          color: 'rgba(0, 0, 0, 0.54)',
          fontFamily: 'Amazon Ember',
          fontSize: '8',
        },
      },
    },
  },
});

export const linkThemes = {
  blue1: createTheme({
    // most used one on most pages
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: ['sans-serif', 'Amazon Ember'],
            color: '#007185',
            '&:hover': {
              color: '#c7511f',
            },
          },
        },
      },
    },
  }),
  blue2: createTheme({
    // used in sign in page
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: ['sans-serif', 'Amazon Ember'],
            color: '#0066c0',
            '&:hover': {
              color: '#c45500',
            },
          },
        },
      },
    },
  }),
  gray: createTheme({
    // used in footer
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: ['sans-serif', 'Amazon Ember'],
            color: '#DDD',
          },
        },
      },
    },
  }),
};
