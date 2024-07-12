// source: https://mui.com/material-ui/react-popover/

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

export default function LanguageButton({...rest}) {
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

  const handleClick = () => {
    // TODO: link to change language page
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const selectedLanguageButton = (
    <>
      {selectedLanguage === 'en' ? 
        <US style={{ margin:'4px', height: '1.5em' }} title="United States" /> :
        <CN style={{ margin:'4px', height: '1.5em' }} title="China" />
      }
      {selectedLanguage}
      <ArrowDropDownIcon sx={{ height: '20px', width: '18px'}} />
    </>
  )

  const languageSelector = (
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
          <CustomLink href={'/'} label={'learn-more'}>{t("language-button.learn-more")}</CustomLink>
        </Box>
        <CustomDivider sx={{mt: '11px', mb: '11px'}}/>
        <Typography>
          <US style={{ marginRight: 3, height: '0.8em' }} title="United States" /> {t("language-button.shopping-on-Amazon")}
        </Typography>
        <Typography sx={{ m: '10px 0px 0px 25px', pb: '7px' }}>
          <CustomLink href='/' label='change-country'> {t("language-button.change-country")} </CustomLink>
        </Typography>
      </ThemeProvider>
    </RadioGroup>
  )

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
        onMouseEnter={handleOpen}
        onClick={handleClick}
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
        {...rest}
      >
        {selectedLanguageButton}
      </Button>
      <Popover
        id="language-selection-menu"
        aria-label="language-selection-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{  // PaperProps is deprecated
          paper: {
            onMouseEnter: () => setAnchorEl(anchorEl),
            onMouseLeave: handleClose,
          }
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
          {languageSelector}
        </Box>
      </Popover>
    </Box>
  );
}
