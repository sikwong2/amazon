// source: https://mui.com/material-ui/react-select/

import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { InputBase, ThemeProvider, styled } from '@mui/material';
import { dropdownTheme } from './Theme';

// leave this here or mystery padding appears
const BootstrapInput = styled(InputBase)(({ theme }) => ({}));

interface CustomDropdownProps extends BoxProps {
  label: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: any;
}

export default function CustomDropdown({
  label,
  values,
  selectedValue,
  setSelectedValue,
  ...rest
}: CustomDropdownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <ThemeProvider theme={dropdownTheme}>
      <Box {...rest}>
        <FormControl>
          <Select
            labelId={label}
            id={label}
            aria-label={label}
            defaultValue={values[0]}
            value={selectedValue}
            renderValue={() => `${label}: ${selectedValue}`}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {values.map((value) => (
              <MenuItem key={value} value={value} aria-label='option'>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
