import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Typography, Popover, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CustomButton from './Button';
import { useRouter } from 'next/router';
import CustomDivider from './Divider';
import {Divider} from '@mui/material';
import { PageContext } from '@/context/Page';
import { LoginContext } from '@/context/Login';
import { on } from 'events';

export default function SignInButton() {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const pageContext = React.useContext(PageContext);
  const loginContext = React.useContext(LoginContext);
  //pageContext.setPage() 

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

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'account':
        router.push('/account') 
        break;
      case 'orderHistory':
        pageContext.setPage('orderHistory')
        router.push('/');
        break;
      case 'comingSoon':
        pageContext.setPage('comingSoon')
        router.push('/')
        break;
      default:
        break;
    }
  };

  const makeList = (arr: any) => {
    return (
      <div>
        {arr.map((obj: any, index: any) => (
          <div key={index} className='link-container'>
            <a onClick={() => { handleNavigation(obj.onClick) }} className='link-no-underline'>
              {obj.name}
            </a>
          </div>
        ))}
      </div>
    );
  };

  const rightSideArray = [
    { name: 'Account', onClick: 'account' },
    { name: 'Orders', onClick: 'orderHistory' },
    { name: 'Recommendations', onClick: 'comingSoon' },
    { name: 'Browsing History', onClick: 'comingSoon' },
    { name: 'Watchlist', onClick: 'comingSoon' },
    { name: 'Video Purchases & Rentals', onClick: 'comingSoon' },
    { name: 'Kindle Unlimited', onClick: 'comingSoon' },
    { name: 'Content & Devices', onClick: 'comingSoon' },
    { name: 'Subscribe & Save Items', onClick: 'comingSoon' },
    { name: 'Memberships & Subscriptions', onClick: 'comingSoon' },
    { name: 'Prime Membership', onClick: 'comingSoon' },
    { name: 'Amazon Credit Cards', onClick: 'comingSoon' },
    { name: 'Music Library', onClick: 'comingSoon' },
    { name: 'Start a Selling Account', onClick: 'comingSoon' },
    { name: 'Register for a free Business Account', onClick: 'comingSoon' },
    { name: 'Customer Service', onClick: 'comingSoon' }
  ];

  const leftSideArray = [
    {name: 'Your Lists', onClick: 'comingSoon'},
    {name: 'Create a List', onClick: 'comingSoon'}, 
    {name: 'Find a List or Registry', onClick: 'comingSoon'}
  ]
  const open = Boolean(anchorEl);
  const id = open ? 'sign-in-popover' : undefined;

  const popoverContentBoxLeft = (
    <div>
    <h1 style={{ fontSize: '17px', fontWeight: 'bold' }} > Your Lists </h1>
    {makeList(leftSideArray)} 
    </div> 
  )

  const popoverContentBoxRight = (
    <div>
    <h1 style={{ fontSize: '17px', fontWeight: 'bold' }}> Your Account </h1>
     {makeList(rightSideArray)} 
    </div>
  )

  const popoverContentBox = (
    <Box
      sx={{
        display: 'flex',
        marginTop: 'px'
      }}
    >
      <Box sx={{ flex: 1, textAlign: 'left'}}>{popoverContentBoxLeft}</Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, height: '330px', mt: '10px', borderWidth: '1px' }} 
      />
      <Box sx={{ flex: 1, textAlign: 'left' }}>{popoverContentBoxRight}</Box>
    </Box>
  )

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
          justifyContent: 'center',
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
      {popoverContentBox}
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
