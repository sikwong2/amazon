import React, { useState } from 'react';
import { Button, Popover, Radio, RadioGroup, FormControlLabel, ThemeProvider } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  buttonTheme: any;
}

export default function RadioHoverButton({ options, buttonTheme }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const open = Boolean(anchorEl);

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  // Measure the button's width
  const buttonWidth = buttonRef.current ? buttonRef.current.getBoundingClientRect().width : 0;

  return (
    <ThemeProvider theme={buttonTheme}>
      <div>
        <Button
          ref={buttonRef}
          aria-haspopup="true"
          aria-controls="radio-menu"
          aria-label="Options"
          onClick={handlePopoverOpen}
        >
          Change Language
        </Button>
        <Popover
          id="radio-menu"
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        //   PaperProps={{ style: { minWidth: buttonWidth } }}
        >
          <RadioGroup value={selectedValue} onChange={handleOptionChange}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
                style={{ marginLeft: '1px' }}
              />
            ))}
          </RadioGroup>
        </Popover>
      </div>
    </ThemeProvider>
  );
}
