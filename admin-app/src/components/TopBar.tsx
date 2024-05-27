import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
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
import { LoginContext } from '../context/Login'
import { Typography } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'rgba(35,47,62)', 
}));

const Search = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginLeft: theme.spacing(20), 
    flexGrow: 2,
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
    textTransform: 'none'
};

export default function TopBar() {
    const { t } = useTranslation('common');
    const loginContext = React.useContext(LoginContext)
    const [searchValue, setSearchValue] = React.useState('');
    const router = useRouter(); 

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
      alert('Search Value: ' + searchValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
    };

    const handleSignIn = () => {
      router.push('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar position="static">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                      <Logo width={60} transparent='true' />
                      <Typography variant='h6' sx={{ ml: 2, color: 'rgba(242,242,242)' }}>
                        Admin Dashboard
                      </Typography>
                    </Box>
                    <LanguageButton sx={{ ml: 2 }} variant='text'/>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {loginContext.accessToken.length == 0 && (
                        <CustomButton style={customButtonStyles} label='sign-in' variant='text' sx={{ ml: 2 }} onClick={handleSignIn} caps={false}>
                            {t("Sign in")}
                        </CustomButton> 
                      )}
                      {loginContext.accessToken.length > 0 && (
                        <CustomButton style={customButtonStyles} label='user' variant='text' sx={{ ml: 2 }} caps={false}>
                        {t("Hello") + " " + loginContext.userName}
                        </CustomButton> 
                      )}
                    </Box>
                </Toolbar>
            </StyledAppBar>
        </Box>
    );
}