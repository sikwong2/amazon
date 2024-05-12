import { createTheme} from '@mui/material/styles';


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
      contrastText: '#0F1111'
    },
    secondary: {
      main: '#FFA41C',
      light: '#FFA41C',
      dark: '#FA8900',
      contrastText: '#0F1111'
    },
    info: {
      main: '#EDFCFF'
    }
  },
})

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
              fontWeight: "bold",
              color: globalTheme.palette.primary.contrastText,
              boxSizing: "border-box",
              borderRadius: 8,
              border: "1px solid transparent",
              "&:hover": {
                color: globalTheme.palette.primary.contrastText,
                outline: `solid 1px rgba(250, 137, 0, 0.5)`
              },
              "&:active": {
                border: "solid 1px #017185",
                outline: "solid 3px #C9F3FA",
              }
            }
          }, 
          {
            props: {variant: "outlined"},
            style: {
              border: "solid 1px #888C8C",
              fontWeight: "normal",
              "&:hover": {
                backgroundColor: 'rgba(136, 140, 140, 0.1)',
                border: "solid 1px #888C8C",
                outline: "none"
              },
              "&:active": {
                fontWeight: "bold",
                backgroundColor: '#EDFCFF',
                outline: `solid 3px #017185`
              },
            }
          },
          {
            props: {variant: "outlined", color: "info"},
            style: {
              border: "solid 3px #017185",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: 'rgba(136, 140, 140, 0.1)',
                border: "solid 3px #017185",
                outline: "none"
              },
              "&:active": {
                fontWeight: "bold",
                backgroundColor: '#EDFCFF',
                border: `solid 3px #017185`,
                outline: "none"
              },
            }
          }
        ],
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
          disableFocusRipple: true,
          disableTouchRipple: true,
        }
      },
    },
  },
  globalTheme
);
