import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';

interface CustomDropdownProps {
  label: string,
  values: string[]
}

export default function CustomDropdown({ label, values, ...rest}: CustomDropdownProps & SelectProps) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age} // + values[0]
          aria-label={label}
          // onChange={handleChange}
          {...rest}
        >
          {values.map(value => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}