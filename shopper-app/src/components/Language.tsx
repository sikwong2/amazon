import React, { useState } from 'react';
import { Button, Popover, Radio, RadioGroup, FormControlLabel, ThemeProvider } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  buttonTheme: any;
  selectedValue: string; 
  onChange: (newValue: string) => void;
}

export default function LanguageButton({ options, buttonTheme, selectedValue, onChange }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); 
  };

  const open = Boolean(anchorEl);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const buttonWidth = buttonRef.current ? buttonRef.current.getBoundingClientRect().width : 0;

  return (
    <ThemeProvider theme={buttonTheme}>
      <div>
        <Button
          ref={buttonRef}
          aria-haspopup="true"
          aria-controls="radio-menu"
          aria-label={'change-language'}
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
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
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
