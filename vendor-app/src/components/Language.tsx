import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Popover, Radio, RadioGroup, FormControlLabel, ThemeProvider } from '@mui/material';
import CustomButton from './Button';
import { buttonTheme } from './Theme';

export interface Option {
  value: string;
  label: string;
}

const LanguageButton = ({ ...rest }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale === 'en' ? 'en' : 'zh');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    router.push('/', '/', { locale: newLanguage });
    handlePopoverClose();
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const options: Option[] = [
    { value: 'en', label: 'English - EN' },
    { value: 'zh', label: 'Mandarin - ZH' },
  ];

  return (
    <ThemeProvider theme={buttonTheme}>
      <div>
        <CustomButton
          aria-haspopup="true"
          aria-controls="radio-menu"
          label={'change-language'}
          onClick={handlePopoverOpen}
          style={{ textTransform: 'uppercase' }}
          {...rest}
        >
          {selectedLanguage}
        </CustomButton>
        <Popover
          id="language-selection-menu"
          aria-label="language-selection-menu"
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
          <RadioGroup
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            aria-label="language-options"
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
                aria-label={option.label}
                style={{ marginLeft: '1px' }}
              />
            ))}
          </RadioGroup>
        </Popover>
      </div>
    </ThemeProvider>
  );
};

export default LanguageButton;
