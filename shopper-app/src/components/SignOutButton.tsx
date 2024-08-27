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
        pageContext.setPage('account')
        router.push('/') 
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

  const popoverContentBoxLeft = (
    <div>
      <h1 style={{ fontSize: '17px', fontWeight: 'bold' }}> Your Lists </h1>
      <div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Shopping List  </a>
      </div>
      <div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Wish List </a>
      </div>
      <Divider sx={{ mt: '10px', borderWidth: '1px', mb: '10px'}}></Divider>
      <div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Create a List  </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Find a List or Registry </a>
      </div>
      <div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Your Saved Books </a>
      </div>
    </div>
  )

  const popoverContentBoxRight = (
    <div>
      <h1 style={{ fontSize: '17px', fontWeight: 'bold' }}>Your Account</h1>
      <div className="link-container">
        <a onClick={() => handleNavigation('account')} className='link-no-underline'> Account </a>
      </div>
      <div className="link-container">
        <a onClick={() => handleNavigation('orderHistory')} className='link-no-underline'> Orders </a>
      </div>

      <div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Keep Shopping For </a>
      </div>
      <div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Recommendations </a>
      </div>
      <div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Browsing History </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Recalls and Product Safety Alerts </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Watchlist </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Video Purchases & Rentals </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Kindle Unlimited </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Content Library </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Devices </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Subscribe & Save Items </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Memberships & Subscriptions </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Prime Membership </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Amazon Credit Cards </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'>  Music Library </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Start a Selling Account </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Register for a free buisness Account </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Customer Service </a>
      </div><div className="link-container">
        <a onClick={() => handleNavigation('comingSoon')} className='link-no-underline'> Switch Accounts </a>
      </div>
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
