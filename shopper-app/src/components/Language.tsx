import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Radio, RadioGroup, FormControlLabel, ThemeProvider, Box, Typography } from '@mui/material';
import { US, CN } from 'country-flag-icons/react/3x2';
import CustomDivider from './Divider';
import { radioButtonTheme } from './Theme';
import CustomLink from './Link';

export default function LanguageButton() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [selectedLanguage, setSelectedLanguage] = React.useState(router.locale === 'en' ? 'en' : 'zh');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    router.push('/', '/', { locale: newLanguage });
    handleClose();
  }

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box 
      sx={{
        p: '0px 5px 0px 5px',
        height: '100%',
        width: '60px'
      }}
    >
      <Button 
        aria-describedby={id}
        variant="contained" 
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        aria-controls="radio-menu"
        // onMouseEnter={handleOpen}
        onClick={handleOpen}
        fullWidth
        sx={{
          backgroundColor: '#131921',
          height: '100%',
          p: '20px 0px 5px 0px',
          '&:hover': {
            backgroundColor: '#131921',
            border: '1px solid white',
          }
        }}
      >
        {selectedLanguage === 'en' ? 
          <US style={{ margin:'4px', height: '1.5em' }} title="United States" /> :
          <CN style={{ margin:'4px', height: '1.5em' }} title="China" />
        }
        {selectedLanguage}
        <ArrowDropDownIcon sx={{ height: '20px', width: '18px'}} />
      </Button>
      <Popover
        id="language-selection-menu"
        aria-label="language-selection-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // onMouseLeave={handleClose}
        // disableRestoreFocus
        sx={{
          // pointerEvents: 'none',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box 
          sx={{ 
            width: '240px',
            p: '14px 14px 7px 14px', 
            fontSize: '13px',
            '& .MuiTypography-root': {
              fontSize: '13px'
            }
          }}>
        <RadioGroup
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            aria-label="language-options"
          >
            <ThemeProvider theme={radioButtonTheme}>
              <FormControlLabel 
                value={'en'}
                control={<Radio />}
                label={'English - EN'}
                aria-label={'English'}
              />
              <CustomDivider />
              <FormControlLabel 
                value={'zh'}
                control={<Radio />}
                label={'中文 - ZH'}
                aria-label={'Chinese'}
              />
              <Box sx={{ pl: '31px' }}>
                <CustomLink href={'/'} label={'learn-more'}>Learn More</CustomLink>
              </Box>
              <CustomDivider sx={{mt: '11px', mb: '11px'}}/>
              <Typography>
                <US style={{ marginRight: 3, height: '0.8em' }} title="United States" /> You are shopping on Amazon.com
              </Typography>
              <Typography sx={{ m: '10px 0px 0px 25px', pb: '7px' }}>
                <CustomLink href='/' label='change-country'> Change country/region. </CustomLink>
              </Typography>
            </ThemeProvider>
          </RadioGroup>
        </Box>
      </Popover>
    </Box>
  );
}
