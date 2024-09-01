import CustomButton from "./Button"
import {Card} from "@mui/material";
import CustomDivider from "./Divider";
import { PageContext } from "@/context/Page";
import { Divider } from "@mui/material";
import { Box } from "@mui/system"
import { Typography } from "@mui/material"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { LoginContext } from "@/context/Login"
import React from "react";
import { useTranslation } from 'next-i18next';
import { useState } from "react";
import { useRouter } from "next/router";
import { Popover } from "@mui/material";
import CustomCard from "./Card";
import { Avatar } from "@mui/material";

const customButtonStyles: React.CSSProperties = {
  backgroundColor: 'inherit',
  color: 'inherit',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export default function SignOutButton(){
  const loginContext = React.useContext(LoginContext);
	const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const pageContext = React.useContext(PageContext);
  const router = useRouter();

  const handleSignOut = () => {
    loginContext.setUserName('');
    loginContext.setAccessToken('');
    loginContext.setId('');
    loginContext.setRole('');
  } 

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

  const rightSideListArr = [
    { name: 'Account', onClick: 'account' },
    { name: 'Orders', onClick: 'orderHistory' },
    { name: 'Keep Shopping For', onClick: 'comingSoon' },
    { name: 'Recommendations', onClick: 'comingSoon' },
    { name: 'Browsing History', onClick: 'comingSoon' },
    { name: 'Recalls and Product Safety Alerts', onClick: 'comingSoon' },
    { name: 'Watchlist', onClick: 'comingSoon' },
    { name: 'Video Purchases & Rentals', onClick: 'comingSoon' },
    { name: 'Kindle Unlimited', onClick: 'comingSoon' },
    { name: 'Content Library', onClick: 'comingSoon' },
    { name: 'Devices', onClick: 'comingSoon' },
    { name: 'Subscribe & Save Items', onClick: 'comingSoon' },
    { name: 'Memberships & Subscriptions', onClick: 'comingSoon' },
    { name: 'Prime Membership', onClick: 'comingSoon' },
    { name: 'Amazon Credit Cards', onClick: 'comingSoon' },
    { name: 'Music Library', onClick: 'comingSoon' },
    { name: 'Start a Selling Account', onClick: 'comingSoon' },
    { name: 'Register for a free Business Account', onClick: 'comingSoon' },
    { name: 'Customer Service', onClick: 'comingSoon' },
    { name: 'Switch Accounts', onClick: 'comingSoon' },
  ];

  const leftSideListArrTop = [
    {name: 'Shopping List', onClick: 'comingSoon'},
    {name: 'Wish List', onClick: 'comingSoon'}
  ]

  const leftSideListArrBottom = [
    {name: 'Creat a List', onClick: 'comingSoon'},
    {name: 'Find a List or Registry', onClick: 'comingSoon'}, 
    {name: 'Your Saved Books', onClick: 'comingSoon'},
  ]

  const popoverContentBoxLeft = (
    <div>
      <h1 style={{ fontSize: '17px', fontWeight: 'bold' }}> Your Lists </h1>
      {makeList(leftSideListArrTop)} 
      <Divider sx={{ mt: '10px', borderWidth: '1px', mb: '10px'}}></Divider>
      {makeList(leftSideListArrBottom)} 
    </div>
  )

  const popoverContentBoxRight = (
    <div>
      <h1 style={{ fontSize: '17px', fontWeight: 'bold' }}>Your Account</h1>
      {makeList(rightSideListArr)} 
      <div className="link-container">
        <a onClick={handleSignOut} className='link-no-underline'> Sign Out </a>
      </div> 
    </div>
  )

  const popoverContentBox = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flex: 1, textAlign: 'left'}}>{popoverContentBoxLeft}</Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 2, height: '440px', borderWidth: '1px' }}
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
        height: '530px',
        '& .MuiTypography-root': {
          fontSize: '11px',
        },
      }}
    >
     <Box
       sx={{
         display: 'flex',
         justifyContent: 'flex-start',
         marginBottom: '15px'
       }}
     >
        <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '450px', backgroundColor: '#e1f2f5', height: '70px', boxShadow: 'none', borderRadius: '10px' }}>
          <Avatar 
            sx={{
              marginLeft: 2,
              width: 35,
              height: 35,
              marginRight: 2,
            }}
          />
          <Box> 
            <Typography> {loginContext.userName} </Typography>
            <Typography color="text.secondary"> Account holder </Typography>
          </Box>
        </Card>     
     </Box>
     {popoverContentBox}
    </Box>
  );

  

  const usernameButton  = (
    <CustomButton
      style={customButtonStyles}
      label='sign-out'
      variant='text'
      onMouseEnter={handleOpen}
      sx={{
        width: { xs: '100%', sm: 'auto' },
        p: '0px 9px 10px 9px',
        height: '60px',
        border: 'none',
        '&:hover': {
          backgroundColor: '#131921',
          outline: '1px solid white',
          borderRadius: '2px',
          border: 'none'
        },
      }}
      onClick={handleSignOut}
      caps={false}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1, width: '100%', maxWidth: '20vh', pt: '10px' }}>
        <Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-end', }}>
          <Typography variant='body2' noWrap fontSize='0.85em' lineHeight='1' letterSpacing='0.035em'>
            {t("topbar.Hello") + ", " + loginContext.userName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', height: '50%', width: 'auto', alignItems: 'flex-start', fontSize: '1em' }}>
          <Typography variant='body2' noWrap fontWeight='bold' lineHeight='1' letterSpacing='0.035em'>
            {t("topbar.Account")}
          </Typography>
          <ArrowDropDownIcon sx={{ height: '15px', width: '18px', color: '#a7acb2' }} />
        </Box>
      </Box>
    </CustomButton>
  )

      return (
        <Box sx={{ height: '60px', display: 'flex', alignItems: 'center' }}>
          {usernameButton}    
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
                  zIndex: '100001',
                },
              }
            }}
          >
            {popoverContent}
          </Popover>
        </Box>
      )
}
