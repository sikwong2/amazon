import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Typography, Popover, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CustomButton from './Button';
import { useRouter } from 'next/router';
import CustomDivider from './Divider';


export default function SignInButton() {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/login')
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'sign-in-popover' : undefined;

  const popoverContent = (
    <Box
      sx={{
        p: '14px 14px 7px 14px',
        fontSize: '11px',
        width: '450px', 
        height: '400px', 
        '& .MuiTypography-root': {
          fontSize: '11px',
        },
        justifyContent: 'center', 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center the button horizontally
          marginBottom: '15px'
        }}
      >
        <CustomButton
          label='Sign-In-Button'
          onClick={handleSignIn}
          sx={{
            width: '200px',
            height: '25px',
            padding: '12px',
          }}
        >
          Sign In
        </CustomButton>
      </Box>
      <CustomDivider/>
    </Box>
  );

  return (
    <Box sx={{ height: '60px', display: 'flex', alignItems: 'center' }}>
      <Button
        aria-describedby={id}
        onMouseEnter={handleOpen}
        onClick={handleOpen}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          p: '0px 9px 10px 9px',
          color: 'white',
          height: '100%',
          border: 'none',
          backgroundColor: 'inherit',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1, width: '100%', maxWidth: '20vh', pt: '10px' }}>
          <Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-end' }}>
            <Typography variant='body2' noWrap fontSize='0.85em' lineHeight='1' letterSpacing='0.035em'>
              {t("topbar.Hello") + ", " + t("topbar.Sign-in")}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-start', fontSize: '1em' }}>
            <Typography variant='body2' noWrap fontWeight='bold' lineHeight='1' letterSpacing='0.035em'>
              {t("topbar.Account")}
            </Typography>
            <ArrowDropDownIcon sx={{ height: '15px', width: '18px', color: '#a7acb2' }} />
          </Box>
        </Box>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            onMouseEnter: () => setAnchorEl(anchorEl),
            onMouseLeave: handleClose,
            sx: {
              position: 'absolute',
              zIndex:'100001',
            },
          }
        }}
      >
        {popoverContent}
      </Popover>
    </Box>
  );
}
