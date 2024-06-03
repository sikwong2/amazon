import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from './Logo';
import LanguageButton from './Language';
import CustomButton from './Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useTranslation } from 'next-i18next';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import { LoginContext } from '../context/Login';
import { useSearch } from '../context/SearchContext';
import { PageContext } from '@/context/Page';
import { CartContext } from '@/context/Cart';
import { MemberInfo } from '@/graphql/member/schema';
import { Grid } from '@mui/material';
import { log } from 'console';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon
import { Menu, MenuItem } from '@mui/material';


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(35,47,62)',
  width: '100%'
}));

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  overflow: 'hidden',
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: `calc(0.5em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFA41C',
  cursor: 'pointer',
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottomRightRadius: theme.shape.borderRadius,
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: 'black',
}));

const customButtonStyles: React.CSSProperties = {
  backgroundColor: 'rgba(35,47,62)',
  color: 'rgba(242,242,242)',
  textTransform: 'none',
};

export default function TopBar() {
  const { t } = useTranslation('common');
  const loginContext = React.useContext(LoginContext);
  const pageContext = React.useContext(PageContext);
  const cartContext = React.useContext(CartContext);
  const { searchValue, setSearchValue, handleSearch } = useSearch();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSignOut = () => {
    loginContext.setUserName('');
    loginContext.setAccessToken('');
    loginContext.setId('');
    loginContext.setRole('');
  }

  const handleOrders = () => {
    // set page context to order history
    pageContext.setPage('orderHistory');
    router.push('/');
  };

  const handleCart = () => {
    pageContext.setPage('cart');
    router.push('/');
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const fetchUserInfo = async (memberId: string): Promise<MemberInfo | undefined> => {
    try {
      const query = { query: `query getInfo{getInfo(memberId: "${memberId}") { name, address }}` };
      const res = await fetch('/api/graphql', {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
            'Content-Type': 'application/json',
        },
      });
      const json = await res.json();
      if (json.errors) {
        console.log(json.errors[0].message);
        throw new Error('Error fetching user info');
      }
      console.log(json.data);
      return json.data.getInfo;
      } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
      }
  };

  const fetchUserAddress = async () => {
    try {
      const response = await fetchUserInfo(loginContext.id);
      if (response) {
        setDeliveryAddress(response.address);
      } else {
        console.error('User info not found');
      }
    } catch (error) {
      console.error('Error fetching user address:', error);
    }
  };

  React.useEffect(() => {
    if (loginContext.accessToken.length > 0) {
      fetchUserAddress();
    } else {
      setDeliveryAddress('');
    }
  }, [loginContext.accessToken]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <Toolbar>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Logo width={80} />
              </Grid>
              <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', xl: 'block' } }}>
                  <CustomButton
                    style={customButtonStyles}
                    label='delivery-address'
                    variant='text'
                    onClick={loginContext.accessToken.length === 0 ? handleSignIn : undefined}
                    caps={false}
                    disabled={loginContext.accessToken.length > 0}
                  >
                    {loginContext.accessToken.length === 0 ? t("Deliver to Santa Cruz, CA 95060") : `${t("Deliver to")} ${deliveryAddress}`}
                  </CustomButton>
                </Grid>
              <Grid item xs={9} container justifyContent="flex-end" spacing={2}>
                <Grid item sm={5} sx={{ display: { xs: 'block', sm: 'inline' } }}>
                  <Search>
                    <SearchInput
                      placeholder={t("topbar.Search") as string}
                      inputProps={{ 'aria-label': 'search', value: searchValue, onChange: handleSearchInputChange, onKeyDown: handleKeyDown }}
                    />
                    <SearchIconWrapper aria-label='search-icon' onClick={handleSearch}>
                      <StyledSearchIcon />
                    </SearchIconWrapper>
                  </Search>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', xl: 'block' } }}>
                  <LanguageButton sx={{ ml: 2 }} variant='text' />
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', xl: 'block' } }}>
                {loginContext.accessToken.length === 0 && (
                  <CustomButton 
                  style={customButtonStyles} 
                  label='sign-in' 
                  variant='text' 
                  sx={{ ml: 2 }} 
                  onClick={handleSignIn} 
                  caps={false}>
                      {t("topbar.Sign-in")}
                  </CustomButton>
                )}
                {loginContext.accessToken.length > 0 && (
                  <CustomButton 
                  style={customButtonStyles} 
                  label='user' 
                  variant='text' 
                  sx={{ ml: 2 }} 
                  onClick={handleSignOut}
                  caps={false}
                  >
                      {t("topbar.Hello") + " " + loginContext.userName}
                  </CustomButton>
                )}
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', xl: 'block' } }}>
                  <CustomButton 
                    style={customButtonStyles} 
                    label='orders' 
                    variant='text' 
                    sx={{ ml: 2 }} 
                    onClick={handleOrders} 
                    caps={false}
                    >
                      {t("topbar.Orders")}
                  </CustomButton>
                </Grid>
                <Grid item sx={{ display: { xs: 'none', sm: 'none', md: 'none', xl: 'block' } }}>
                  <CustomButton 
                    style={customButtonStyles} 
                    label='cart' 
                    variant='text' 
                    sx={{ ml: 2 }} 
                    onClick={handleCart}
                  >
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <ShoppingCartIcon style={{ fontSize: 30 }} />
                  <div style={{
                    position: "absolute",
                    top: "36%",
                    left: "22%",
                    transform: "translate(-50%, -50%)",
                    color: '#FFA41C',
                    fontWeight: "bold",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {Object.keys(cartContext.cart).length}
                  </div>
                  <span style={{ marginLeft: 8 }}>{t("topbar.Cart")}</span>
                  </div>
                  </CustomButton>
                </Grid>
                <Grid item justifyContent='center' sx={{ display: { xs: 'block', sm: 'block', md: 'block', xl: 'none' } }}> 
                  <MenuIcon onClick={handleMenuOpen} aria-label='menu'/> 
                  <Menu
                    anchorEl={null}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    MenuListProps={{
                      sx: customButtonStyles
                    }}
                    PaperProps={{
                      style: {
                        marginTop: '40px',
                      },
                    }}
                  >
                    <MenuItem>
                      {loginContext.accessToken.length === 0 && (
                      <CustomButton 
                      style={customButtonStyles} 
                      label='sign-in' 
                      variant='text' 
                      sx={{ ml: 2 }} 
                      onClick={handleSignIn} 
                      caps={false}
                      fullWidth>
                          {t("topbar.Sign-in")}
                      </CustomButton>
                      )}
                      {loginContext.accessToken.length > 0 && (
                        <CustomButton 
                        style={customButtonStyles} 
                        label='user' 
                        variant='text' 
                        sx={{ ml: 2 }} 
                        onClick={handleSignOut}
                        caps={false}
                        fullWidth
                        >
                        {t("topbar.Hello") + " " + loginContext.userName}
                        </CustomButton>
                      )}
                    </MenuItem>
                    <MenuItem>
                      <LanguageButton sx={{ ml: 2 }} variant='text' fullWidth />
                    </MenuItem>
                    <MenuItem>
                      <CustomButton
                        style={customButtonStyles}
                        label='delivery-address'
                        variant='text'
                        onClick={loginContext.accessToken.length === 0 ? handleSignIn : undefined}
                        caps={false}
                        disabled={loginContext.accessToken.length > 0}
                        fullWidth
                      >
                        {loginContext.accessToken.length === 0 ? t("Deliver to Santa Cruz, CA 95060") : `${t("Deliver to")} ${deliveryAddress}`}
                      </CustomButton>
                    </MenuItem>
                    <MenuItem>
                      <CustomButton 
                          style={customButtonStyles} 
                          label='cart' 
                          variant='text' 
                          sx={{ ml: 2 }} 
                          onClick={handleCart}
                          fullWidth
                        >
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <ShoppingCartIcon style={{ fontSize: 30 }} />
                        <div style={{
                          position: "absolute",
                          top: "36%",
                          left: "22%",
                          transform: "translate(-50%, -50%)",
                          color: '#FFA41C',
                          fontWeight: "bold",
                          fontSize: 11,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          {Object.keys(cartContext.cart).length}
                        </div>
                        <span style={{ marginLeft: 8 }}>{t("topbar.Cart")}</span>
                        </div>
                      </CustomButton>
                    </MenuItem>
                    <MenuItem>
                      <CustomButton 
                        style={customButtonStyles} 
                        label='orders' 
                        variant='text' 
                        sx={{ ml: 2 }} 
                        onClick={handleOrders} 
                        caps={false}
                        fullWidth
                        >
                          {t("topbar.Orders")}
                      </CustomButton>
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </StyledAppBar>
      </Box>
    </React.Fragment>
  );
}
