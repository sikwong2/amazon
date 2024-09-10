import CustomButton from "./Button"
import {Card} from "@mui/material";
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
import { useEffect } from "react";
import { Account } from "@/views/Account";

const customButtonStyles: React.CSSProperties = {
  backgroundColor: 'inherit',
  color: 'inherit',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export default function SignOutButton(){
  const [isHovering, setIsHovering] = useState(false);
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
    { name: t('sign-out-button.right-side-arr.account'), onClick: 'account' },
    { name: t('sign-out-button.right-side-arr.orders'), onClick: 'orderHistory' },
    { name: t('sign-out-button.right-side-arr.keep-shopping-for'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.recommendations'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.browsing-history'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.recalls-product-safety-alerts'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.watchlist'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.video-purchases-rentals'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.kindle-unlimited'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.content-library'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.devices'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.subscribe-save-items'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.memberships-subscriptions'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.prime-membership'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.amazon-credit-cards'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.music-library'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.start-selling-account'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.register-free-business-account'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.customer-service'), onClick: 'comingSoon' },
    { name: t('sign-out-button.right-side-arr.switch-accounts'), onClick: 'comingSoon' },
  ];

  const leftSideListArrTop = [
    { name: t('sign-out-button.left-side-arr-top.shopping-list'), onClick: 'comingSoon' },
    { name: t('sign-out-button.left-side-arr-top.wish-list'), onClick: 'comingSoon' }
  ];

  const leftSideListArrBottom = [
    { name: t('sign-out-button.left-side-arr-bottom.create-a-list'), onClick: 'comingSoon' },
    { name: t('sign-out-button.left-side-arr-bottom.find-a-list-or-registry'), onClick: 'comingSoon' },
    { name: t('sign-out-button.left-side-arr-bottom.your-saved-books'), onClick: 'comingSoon' }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovering) {
      timer = setTimeout(() => {
        console.log('hover')
        setAnchorEl(document.getElementById('sign-out-button'));
      }, 300); // Adjust delay as necessary
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

  const popoverContentBoxLeft = (
    <div>
      <h1 style={{ fontSize: '17px', fontWeight: 'bold' }}> {t('sign-out-button.your-lists')} </h1>
      {makeList(leftSideListArrTop)} 
      <Divider sx={{ mt: '10px', borderWidth: '1px', mb: '10px'}}></Divider>
      {makeList(leftSideListArrBottom)} 
    </div>
  )

  const popoverContentBoxRight = (
    <div>
      <h1 style={{ fontSize: '17px', fontWeight: 'bold' }}>{t('sign-out-button.your-account')}</h1>
      {makeList(rightSideListArr)} 
      <div className="link-container">
        <a onClick={handleSignOut} className='link-no-underline'> {t('sign-out')} </a>
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
        height: '560px',
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
            <Typography color="text.secondary"> {t('sign-out-button.account-holder')} </Typography>
          </Box>
        </Card>     
     </Box>
     {popoverContentBox}
    </Box>
  );

  const usernameButton  = (
    <CustomButton
      style={customButtonStyles}
      label='sign-out-button'
      id = 'sign-out-button'
      variant='text'
      onClick={(e) => {
        console.log('clicked')
        handleNavigation('account')
      }}
      // onMouseEnter={handleOpen}
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
        <Box sx={{ height: '60px', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            handleClose(); // Close popover when mouse leaves
          }} 
        >
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
                // onMouseEnter: () => setAnchorEl(anchorEl),
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
