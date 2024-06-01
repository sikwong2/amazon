import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabsProps } from '@mui/material/Tabs';
import { TabProps } from '@mui/material/Tab';
import { styled, useMediaQuery, useTheme } from '@mui/material';

// from https://mui.com/material-ui/react-tabs/#introduction
// How to use:
  // import CustomTabPanel, CustomTabs, and CustomTab into tsx file
  // use a state value to change between CustomTabPanels
  // look at OrderHistory for more reference

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel({ children, value, index, ...rest }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...rest}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

export const CustomTabsStyled = styled(Tabs)(({ theme }) => ({
  fontWeight: 'bold',
  '& .MuiTabs-indicator': {
    backgroundColor: '#D77B21',
  },
  width: '100%',
}));

export const CustomTabs = (props: TabsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <CustomTabsStyled
      {...props}
      variant={isSmallScreen ? 'fullWidth' : 'standard'}
    />
  );
}

export const CustomTab = styled((props: TabProps) => <Tab disableRipple disableFocusRipple {...props} />)(({ theme }) => ({
  color: '#017185',
  textTransform: 'none',
  '&:hover': {
    color: '#D77B21',
    textDecoration: 'underline',
  },
  '&.Mui-selected': {
    color: '#0F1111',
    fontWeight: 'bold',
    textDecoration: 'none',
  }
}));

